import { useState, useMemo } from 'react';
import { Card, Badge, Button } from '../components/ui/shared';
import { mockKeywords, categories, KeywordClassification, Difficulty, RpmPotential } from '../data/mockData';
import { Download, Search, Filter, Sparkles, AlertCircle, MonitorPlay } from 'lucide-react';
import { downloadCSV } from '../lib/utils';

export default function KeywordDiscoveryView({ onSelectKeyword }: { onSelectKeyword: (kw: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<KeywordClassification | 'All'>('All');
  const [selectedDiff, setSelectedDiff] = useState<Difficulty | 'All'>('All');
  const [selectedRpm, setSelectedRpm] = useState<RpmPotential | 'All'>('All');
  
  const filteredData = useMemo(() => {
    return mockKeywords.filter(kw => {
      const matchSearch = kw.keyword.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'All' || kw.category === selectedCategory;
      const matchClass = selectedClass === 'All' || kw.classification === selectedClass;
      const matchDiff = selectedDiff === 'All' || kw.difficulty === selectedDiff;
      const matchRpm = selectedRpm === 'All' || kw.rpmPotential === selectedRpm;
      return matchSearch && matchCat && matchClass && matchDiff && matchRpm;
    }).sort((a,b) => b.opportunityScore - a.opportunityScore);
  }, [searchTerm, selectedCategory, selectedClass, selectedDiff, selectedRpm]);

  const handleExport = () => {
    downloadCSV(filteredData.map(kw => ({
      Keyword: kw.keyword,
      Volume: kw.searchVolume,
      Competition: kw.competition,
      OpportunityScore: kw.opportunityScore,
      Trend: kw.trend,
      Category: kw.category,
      CPC: kw.cpc,
      Classification: kw.classification,
      SearchIntent: kw.searchIntent,
      Difficulty: kw.difficulty,
      RPM: kw.rpmPotential,
      TargetCountries: kw.targetCountries.join('; '),
      VideoLength: kw.videoLengthSuggestion
    })), 'yt_trendseeker_analyze.csv');
  };

  const FiltersRow = () => (
    <div className="flex flex-wrap items-center gap-3">
      <select 
        value={selectedCategory} 
        onChange={e => setSelectedCategory(e.target.value)}
        className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <option value="All">Tất cả Niche</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select 
        value={selectedClass} 
        onChange={e => setSelectedClass(e.target.value as any)}
        className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <option value="All">Tất cả Phân loại</option>
        <option value="Easy Viral">Easy Viral</option>
        <option value="Evergreen">Evergreen</option>
        <option value="Short-term Trend">Short-term Trend</option>
        <option value="Niche Low Comp">Niche Low Comp</option>
      </select>
      
      <select 
        value={selectedDiff} 
        onChange={e => setSelectedDiff(e.target.value as any)}
        className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <option value="All">Tất cả Độ khó</option>
        <option value="Easy">Dễ làm</option>
        <option value="Medium">Trung bình</option>
        <option value="Hard">Khó làm</option>
      </select>

      <select 
        value={selectedRpm} 
        onChange={e => setSelectedRpm(e.target.value as any)}
        className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <option value="All">Tất cả RPM</option>
        <option value="High">RPM Cao</option>
        <option value="Medium">RPM Trung bình</option>
        <option value="Low">RPM Thấp</option>
      </select>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Từ khoá đã lưu (Analyze)</h2>
          <p className="text-sm text-gray-500">Lọc và đánh giá các từ khoá đã theo dõi.</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-2 shrink-0">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <Card className="!p-4 space-y-4">
        <div className="relative w-full border-b border-gray-100 pb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm theo từ khoá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0 text-base border-0 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <FiltersRow />
        </div>
      </Card>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs">
                <th className="px-6 py-4 font-medium">Keyword / Phân loại</th>
                <th className="px-6 py-4 font-medium">Volume & Comp</th>
                <th className="px-6 py-4 font-medium">RPM / Target</th>
                <th className="px-6 py-4 font-medium">Video Data (Top 10)</th>
                <th className="px-6 py-4 font-medium text-center">Opp Score</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    Không tìm thấy từ khoá nào.
                  </td>
                </tr>
              ) : (
                filteredData.map(kw => (
                  <tr key={kw.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{kw.keyword}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant={kw.classification === 'Easy Viral' ? 'success' : kw.classification === 'Avoid' ? 'danger' : 'default'} className="!py-0">
                          {kw.classification}
                        </Badge>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">{kw.searchIntent}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="font-mono text-gray-900">{(kw.searchVolume / 1000).toFixed(1)}k <span className="text-gray-400 text-xs font-sans font-normal">/mo</span></div>
                      <div className="flex items-center gap-2 mt-1">
                         <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full ${kw.competition < 40 ? 'bg-emerald-500' : kw.competition > 70 ? 'bg-red-500' : 'bg-yellow-500'}`}
                             style={{ width: kw.competition + '%' }}
                           />
                         </div>
                         <span className="text-xs text-gray-500">{kw.competition}/100</span>
                       </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-gray-900 flex items-center gap-1"><span className="font-semibold">${kw.cpc.toFixed(2)}</span> ({kw.rpmPotential})</div>
                      <div className="text-xs text-gray-500 mt-1">{kw.targetCountries.join(', ')}</div>
                    </td>

                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1.5 text-gray-600">
                         <MonitorPlay className="w-3.5 h-3.5 text-gray-400" />
                         <span>{(kw.avgViewsTop10 / 1000).toFixed(0)}k avg views</span>
                       </div>
                       <div className="text-xs text-gray-500 mt-1">
                         {kw.newVideos30Days} videos (30d) • Tỉ lệ: <span className={kw.viewsToSubRatio > 1 ? 'text-emerald-600 font-medium' : ''}>{kw.viewsToSubRatio}x</span>
                       </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                         <span className={`text-xl font-semibold ${kw.opportunityScore >= 80 ? 'text-emerald-600' : kw.opportunityScore <= 40 ? 'text-red-500' : 'text-yellow-600'}`}>
                           {kw.opportunityScore}
                         </span>
                         <Badge variant={kw.trend === 'up' ? 'success' : 'default'} className="!text-[9px] !px-1.5 !py-0 mt-0.5">
                            TREND {kw.trendScore}
                         </Badge>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="secondary" onClick={() => onSelectKeyword(kw.keyword)} className="gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Outline
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
