// API wrapper for real API calls and Rate Limit handling
export async function fetchTrendingVideos(regionCode = 'US', maxResults = 10) {
  const res = await fetch(`/api/youtube/trending?regionCode=${regionCode}&maxResults=${maxResults}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch trending videos");
  }
  return res.json();
}

export async function fetchKeywordSuggestions(query: string) {
  const res = await fetch(`/api/youtube/suggest?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch suggestions");
  }
  const data = await res.json();
  // YouTube suggest format: [ "query", ["sugg1", "sugg2", ...] ]
  return data[1] || [];
}

export async function fetchYouTubeSearch(query: string, maxResults = 5) {
  const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch search results");
  }
  return res.json();
}

export async function getChannelStats(channelIds: string[]) {
  if (!channelIds.length) return [];
  const idString = channelIds.join(',');
  const res = await fetch(`/api/youtube/channels?id=${idString}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch channel stats");
  }
  return res.json();
}

export async function checkGeminiConfig() {
  const res = await fetch("/api/config");
  const data = await res.json();
  return data.geminiConfigured;
}

export async function generateContentStrategy(keyword: string) {
  const res = await fetch(`/api/gemini/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ keyword })
  });
  
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to generate strategy");
  }
  return res.json();
}
