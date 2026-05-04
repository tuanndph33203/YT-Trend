import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.use(express.json());

// MongoDB Schema
const CacheSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }
}, { timestamps: true });

const CacheModel = mongoose.model("Cache", CacheSchema);

// Connect MongoDB
async function connectDB() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB for caching");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  } else {
    console.warn("MONGODB_URI not provided. Caching will be in-memory only (not recommended for production).");
  }
}
connectDB();

// Soft cache helper
const memCache = new Map();

async function getCache(key: string) {
  if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) {
    const doc = await CacheModel.findOne({ key, expiresAt: { $gt: new Date() } });
    return doc ? doc.data : null;
  }
  const item = memCache.get(key);
  if (item && item.expiresAt > Date.now()) {
    return item.data;
  }
  return null;
}

async function setCache(key: string, data: any, ttlSeconds: number = 3600) {
  if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    await CacheModel.findOneAndUpdate(
      { key },
      { data, expiresAt },
      { upsert: true, new: true }
    );
  } else {
    memCache.set(key, { data, expiresAt: Date.now() + ttlSeconds * 1000 });
  }
}

// API Routes
app.get("/api/youtube/trending", async (req, res) => {
  try {
    const { regionCode = 'US', maxResults = 10 } = req.query;
    const cacheKey = `yt_trending_${regionCode}_${maxResults}`;
    
    let result = await getCache(cacheKey);
    if (!result) {
      if (!process.env.YOUTUBE_API_KEY) {
        throw new Error("YOUTUBE_API_KEY is missing");
      }
      
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${process.env.YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.statusText}`);
      }
      result = await response.json();
      await setCache(cacheKey, result, 3600 * 24); // Cache for 24h
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/youtube/suggest", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query" });
    const cacheKey = `yt_suggest_${q}`;
    let result = await getCache(cacheKey);
    if (!result) {
      const url = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${encodeURIComponent(String(q))}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      result = await response.json();
      await setCache(cacheKey, result, 3600 * 24);
    }
    res.json(result);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get("/api/youtube/search", async (req, res) => {
  try {
    const { q, maxResults = 5 } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query parameter 'q'" });
    const cacheKey = `yt_search_${q}_${maxResults}`;
    
    let result = await getCache(cacheKey);
    if (!result) {
      if (!process.env.YOUTUBE_API_KEY) throw new Error("YOUTUBE_API_KEY is missing");
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(String(q))}&maxResults=${maxResults}&key=${process.env.YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`YouTube API Error: ${response.statusText}`);
      result = await response.json();
      await setCache(cacheKey, result, 3600 * 24);
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/youtube/channels", async (req, res) => {
  try {
    const { id } = req.query; // comma separated channel ids
    if (!id) return res.status(400).json({ error: "Missing query parameter 'id'" });
    const cacheKey = `yt_channels_${id}`;
    
    let result = await getCache(cacheKey);
    if (!result) {
      if (!process.env.YOUTUBE_API_KEY) throw new Error("YOUTUBE_API_KEY is missing");
      const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`YouTube API Error: ${response.statusText}`);
      result = await response.json();
      await setCache(cacheKey, result, 3600 * 24);
    }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/config", (req, res) => {
  res.json({ geminiConfigured: !!process.env.GEMINI_API_KEY });
});

app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).json({ error: "Missing keyword" });
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: "Gemini API key is not configured." });
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are an expert YouTube strategist. Given the emerging keyword: "${keyword}", generate a comprehensive content strategy for creators.
    Return the result in strictly valid JSON format with the following structure:
    - titles: an array of 10 highly clickable, high-CTR YouTube titles.
    - hooks: an array of 5 engaging viewer hooks (the first 15 seconds script) to retain audience.
    - outline: an array of 4-6 main bullet points for the video structure.
    - tags: an array of 10-15 SEO tags.
    - hashtags: an array of 3-5 hashtags.
    - description: a short YouTube video description (2 paragraphs) including a call to action.
    - thumbnailIdea: a detailed description of a compelling thumbnail concept (visuals, text, layout).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: { type: Type.ARRAY, items: { type: Type.STRING } },
            hooks: { type: Type.ARRAY, items: { type: Type.STRING } },
            outline: { type: Type.ARRAY, items: { type: Type.STRING } },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
            thumbnailIdea: { type: Type.STRING },
          },
          required: ["titles", "hooks", "outline", "tags", "hashtags", "description", "thumbnailIdea"]
        }
      }
    });

    const text = response.text;
    if (text) {
        res.json(JSON.parse(text));
    } else {
      res.status(500).json({ error: "No text returned from Gemini." });
    }
  } catch (err: any) {
    console.error("Failed to generate strategy:", err);
    res.status(500).json({ error: err.message });
  }
});


// Vite middleware for development & Static files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
