import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

// Fail gracefully in UI if not found
export const isGeminiConfigured = !!apiKey;

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export async function generateContentStrategy(keyword: string) {
  if (!isGeminiConfigured) {
    throw new Error("Gemini API key is not configured.");
  }

  const prompt = `You are an expert YouTube strategist. Given the emerging keyword: "${keyword}", generate a comprehensive content strategy for creators.
  
Return the result in strictly valid JSON format with the following structure:
- titles: an array of 10 highly clickable, high-CTR YouTube titles.
- hooks: an array of 5 engaging viewer hooks (the first 15 seconds script) to retain audience.
- outline: an array of 4-6 main bullet points for the video structure.
- tags: an array of 10-15 SEO tags.
- hashtags: an array of 3-5 hashtags.
- description: a short YouTube video description (2 paragraphs) including a call to action.
- thumbnailIdea: a detailed description of a compelling thumbnail concept (visuals, text, layout).`;

  try {
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
        return JSON.parse(text);
    }
    return null;
  } catch (err: any) {
    console.error("Failed to generate strategy:", err);
    throw err;
  }
}
