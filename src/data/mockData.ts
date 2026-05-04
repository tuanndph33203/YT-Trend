import { calculateOpportunityScore, classifyKeyword } from '../lib/scoring';

export interface TrendDataPoint {
  date: string;
  searchVolume: number;
}

export type KeywordClassification = 'Easy Viral' | 'Evergreen' | 'Short-term Trend' | 'Niche Low Comp' | 'Avoid';
export type SearchIntent = 'Informational' | 'Transactional' | 'Navigational' | 'Entertainment';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type RpmPotential = 'Low' | 'Medium' | 'High';
export type VideoLength = 'Short (<5m)' | 'Medium (5-10m)' | 'Long (>10m)';

export interface KeywordData {
  id: string;
  keyword: string;
  searchVolume: number;
  competition: number; // 0-100
  trendScore: number; // 0-100
  opportunityScore: number; // 0-100
  
  trend: 'up' | 'down' | 'flat';
  category: string;
  cpc: number;
  rpmPotential: RpmPotential;
  
  newVideos30Days: number;
  avgViewsTop10: number;
  viewsToSubRatio: number; // >1 is good
  difficulty: Difficulty;
  targetCountries: string[];
  language: string;
  searchIntent: SearchIntent;
  classification: KeywordClassification;
  videoLengthSuggestion: VideoLength;
  
  trendData: TrendDataPoint[];
}

const generateTrendData = (base: number, trendObj: 'up' | 'down' | 'flat'): TrendDataPoint[] => {
  const data: TrendDataPoint[] = [];
  let current = base;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    const noise = (Math.random() - 0.5) * (base * 0.1);
    if (trendObj === 'up') current += (base * 0.03);
    if (trendObj === 'down') current -= (base * 0.02);
    
    current = Math.max(10, current);
    
    data.push({
      date: date.toISOString().split('T')[0],
      searchVolume: Math.round(current + noise)
    });
  }
  return data;
};

const createKeyword = (
  keyword: string, category: string, searchVolume: number, competition: number, trendScore: number, 
  cpc: number, newVideos: number, avgViews: number, viewsToSubRatio: number, rpm: RpmPotential,
  difficulty: Difficulty, intent: SearchIntent, length: VideoLength, countries: string[], isDown: boolean = false
): KeywordData => {
  const trend = isDown ? 'down' : trendScore > 60 ? 'up' : 'flat';
  const oppScore = calculateOpportunityScore(searchVolume, competition, trendScore, viewsToSubRatio, rpm);
  
  return {
    id: Math.random().toString(36).substring(7),
    keyword,
    category,
    searchVolume,
    competition,
    trendScore,
    opportunityScore: oppScore,
    trend,
    cpc,
    rpmPotential: rpm,
    newVideos30Days: newVideos,
    avgViewsTop10: avgViews,
    viewsToSubRatio,
    difficulty,
    targetCountries: countries,
    language: 'English',
    searchIntent: intent,
    classification: classifyKeyword(oppScore, competition, trendScore),
    videoLengthSuggestion: length,
    trendData: generateTrendData(searchVolume * 0.8, trend)
  };
};

export const categories = ["Technology", "Finance", "Gaming", "Lifestyle", "Education", "Health"];

export const mockKeywords: KeywordData[] = [
  createKeyword('ai tools for video editing 2026', 'Technology', 125000, 35, 95, 4.5, 42, 85000, 3.2, 'High', 'Medium', 'Informational', 'Medium (5-10m)', ['US', 'UK', 'CA']),
  createKeyword('how to repair macbook screen m3', 'Technology', 45000, 20, 45, 6.2, 5, 25000, 1.5, 'High', 'Hard', 'Informational', 'Long (>10m)', ['US', 'EU']),
  createKeyword('best budget index funds', 'Finance', 210000, 85, 50, 12.0, 120, 150000, 0.8, 'High', 'Medium', 'Transactional', 'Medium (5-10m)', ['US']),
  createKeyword('football news transfer rumors', 'Lifestyle', 550000, 95, 80, 1.2, 300, 500000, 0.5, 'Low', 'Easy', 'Entertainment', 'Short (<5m)', ['UK', 'EU', 'Global']),
  createKeyword('shadow work prompts for healing', 'Health', 38000, 15, 88, 2.1, 12, 18000, 4.5, 'Medium', 'Easy', 'Informational', 'Medium (5-10m)', ['US', 'CA', 'AU']),
  createKeyword('indie game devlog rust', 'Gaming', 18000, 25, 75, 1.8, 8, 12000, 5.2, 'Medium', 'Hard', 'Entertainment', 'Long (>10m)', ['US', 'UK', 'Global']),
  createKeyword('gta 6 map leak analysis', 'Gaming', 850000, 98, 99, 0.8, 450, 1200000, 0.2, 'Low', 'Easy', 'Entertainment', 'Medium (5-10m)', ['Global']),
  createKeyword('chatgpt 5 prompt engineering', 'Technology', 350000, 65, 90, 8.5, 85, 200000, 2.1, 'High', 'Medium', 'Informational', 'Medium (5-10m)', ['US', 'IN', 'Global']),
  createKeyword('day trading for beginners crypto', 'Finance', 150000, 88, 60, 15.5, 210, 80000, 0.6, 'High', 'Hard', 'Informational', 'Long (>10m)', ['US', 'UK', 'AE']),
  createKeyword('home automation assistant setup', 'Technology', 55000, 30, 65, 3.4, 25, 35000, 1.8, 'Medium', 'Medium', 'Informational', 'Long (>10m)', ['US', 'AU']),
  createKeyword('making perfect espresso at home', 'Lifestyle', 95000, 75, 40, 1.5, 60, 110000, 0.9, 'Medium', 'Medium', 'Informational', 'Medium (5-10m)', ['US', 'IT', 'AU']),
  createKeyword('smma outreach templates 2026', 'Finance', 42000, 40, 85, 18.0, 35, 45000, 2.5, 'High', 'Medium', 'Transactional', 'Short (<5m)', ['US', 'UK']),
  createKeyword('local llm on macbook m5', 'Technology', 85000, 35, 92, 5.6, 22, 65000, 3.8, 'High', 'Hard', 'Informational', 'Medium (5-10m)', ['US', 'Global']),
  createKeyword('notion adhd life os', 'Lifestyle', 110000, 55, 65, 2.8, 45, 95000, 1.2, 'Medium', 'Medium', 'Informational', 'Long (>10m)', ['US', 'UK']),
  createKeyword('learn rust in 10 minutes', 'Education', 78000, 60, 55, 4.2, 38, 55000, 1.1, 'Medium', 'Hard', 'Informational', 'Medium (5-10m)', ['Global'])
];
