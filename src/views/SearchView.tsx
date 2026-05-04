import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui/shared';
import { Search, Sparkles, Plus, Loader2, ArrowRight } from 'lucide-react';
import { calculateOpportunityScore, classifyKeyword } from '../lib/scoring';

interface ExpandedKeyword {
  keyword: string;
  source: 'YouTube Autocomplete' | 'Google Trends' | 'Related' | 'Questions' | 'Long-tail';
  volume: number;
  competition: number;
  trend: number;
}

export default function SearchView({ onAnalyze }: { onAnalyze: (kw: string) => void }) {
  const [seed, setSeed] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ExpandedKeyword[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed.trim()) return;
    
    setIsSearching(true);
    setResults([]);

    // Simulate API calls to YouTube Autocomplete, Trends, etc.
    setTimeout(() => {
      const mockResults: ExpandedKeyword[] = [
        { keyword: `best ${seed} 2026`, source: 'YouTube Autocomplete', volume: 150000, competition: 65, trend: 85 },
        { keyword: `how to use ${seed}`, source: 'Questions', volume: 85000, competition: 40, trend: 60 },
        { keyword: `${seed} tutorial for beginners`, source: 'Long-tail', volume: 120000, competition: 55, trend: 75 },
        { keyword: `${seed} alternatives`, source: 'Related', volume: 45000, competition: 30, trend: 90 },
        { keyword: `why ${seed} is failing`, source: 'Google Trends', volume: 65000, competition: 25, trend: 95 },
        { keyword: `${seed} review honest`, source: 'YouTube Autocomplete', volume: 90000, competition: 70, trend: 50 },
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Keyword Expansion Engine</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Nhập một từ khoá gốc (seed keyword), hệ thống sẽ quét YouTube Autocomplete, Google Trends và các câu hỏi phổ biến để tìm ngách dễ viral.
          </p>
        </div>

        <Card className="p-2 shadow-lg">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="VD: AI tools, football news, repair MacBook..."
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-lg placeholder:text-gray-400"
                autoFocus
              />
            </div>
            <Button type="submit" disabled={isSearching || !seed.trim()} size="lg" className="px-8 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600">
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Phân tích"}
            </Button>
          </form>
        </Card>
      </div>

      {results.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xl font-semibold text-gray-900">Kết quả mở rộng cho "{seed}"</h3>
             <span className="text-sm text-gray-500">Tìm thấy {results.length} ý tưởng tiềm năng</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((kw, i) => {
              // Calculate real-time opportunity score for preview
              const oppScore = calculateOpportunityScore(kw.volume, kw.competition, kw.trend, 2, 'Medium');
              const classif = classifyKeyword(oppScore, kw.competition, kw.trend);
              
              return (
                <Card key={i} className="hover:border-indigo-200 transition-colors group cursor-pointer" onClick={() => onAnalyze(kw.keyword)}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{kw.keyword}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default" className="text-[10px] uppercase bg-gray-100 text-gray-600">{kw.source}</Badge>
                        <Badge variant={classif === 'Easy Viral' ? 'success' : classif === 'Avoid' ? 'danger' : 'warning'} className="text-[10px]">
                           {classif}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-2xl font-light ${oppScore > 80 ? 'text-emerald-500' : 'text-gray-900'}`}>{oppScore}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">Điểm Cơ Hội</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100/60">
                    <div>
                      <div className="text-[11px] text-gray-500 uppercase font-medium">Tìm kiếm</div>
                      <div className="font-mono text-sm text-gray-900">{(kw.volume / 1000).toFixed(1)}k/th</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 uppercase font-medium">Cạnh tranh</div>
                      <div className="font-mono text-sm text-gray-900">{kw.competition}/100</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 uppercase font-medium">Trending</div>
                      <div className="font-mono text-sm text-green-600">+{kw.trend}%</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Phân tích sâu & Gợi ý kịch bản <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
