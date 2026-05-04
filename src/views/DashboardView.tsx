import { useMemo } from 'react';
import { Card, Badge, Button } from '../components/ui/shared';
import { TrendDataPoint, mockKeywords } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, Search, Activity, Target } from 'lucide-react';

export default function DashboardView({ onNavigate }: { onNavigate: (view: string, keyword?: string) => void }) {
  
  // Aggregate mock trends for overall visual
  const globalTrend = useMemo(() => {
    if (mockKeywords.length === 0) return [];
    
    const aggregated: Record<string, number> = {};
    mockKeywords.forEach(kw => {
      kw.trendData.forEach(p => {
        if (!aggregated[p.date]) aggregated[p.date] = 0;
        aggregated[p.date] += p.searchVolume;
      });
    });

    return Object.keys(aggregated).sort().map(d => ({
      date: d,
      searchVolume: aggregated[d]
    }));
  }, []);

  const totalVolume = mockKeywords.reduce((a, b) => a + b.searchVolume, 0);
  const avgCompetition = mockKeywords.reduce((a, b) => a + b.competition, 0) / mockKeywords.length;
  const topOps = [...mockKeywords].sort((a,b) => b.opportunityScore - a.opportunityScore).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">Tổng quan thị trường từ khoá kênh của bạn đang theo dõi.</p>
        </div>
        <Button onClick={() => onNavigate('search')} className="gap-2">
          <Search className="w-4 h-4" />
          Tìm từ khoá mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" /> Đang theo dõi
          </div>
          <div className="text-3xl font-light text-gray-900">{mockKeywords.length}</div>
        </Card>
        
        <Card className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> Tổng Volume
          </div>
          <div className="text-3xl font-light text-gray-900">
            {(totalVolume / 1000).toFixed(1)}k <span className="text-sm text-gray-400 font-normal">/th</span>
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Target className="w-4 h-4 text-yellow-500" /> Độ cạnh tranh TB
          </div>
          <div className="text-3xl font-light text-gray-900">
            {avgCompetition.toFixed(0)} <span className="text-sm text-gray-400 font-normal">/ 100</span>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 border-indigo-100 bg-indigo-50/30">
          <div className="text-sm font-medium text-indigo-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Tiềm năng nhất
          </div>
          <div className="mt-1">
            <div className="text-base font-medium text-gray-900 truncate">
               {topOps[0]?.keyword || 'N/A'}
            </div>
            <div className="text-sm text-gray-500 mt-1 hover:underline cursor-pointer" onClick={() => topOps[0] && onNavigate('generator', topOps[0].keyword)}>
              Chi tiết →
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium">Xu hướng tổng thể</h3>
          <p className="text-sm text-gray-500">Biểu đồ gộp volume tìm kiếm của toàn bộ keyword đang theo dõi trong 30 ngày.</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={globalTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{fontSize: 12}} tickFormatter={(val) => val.split('-').slice(1).join('/')} stroke="#e5e7eb" tickLine={false} axisLine={false} />
                <YAxis tick={{fontSize: 12}} stroke="#e5e7eb" tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 600, color: '#374151' }}
                />
                <Area type="monotone" dataKey="searchVolume" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-medium">Top 3 Đột Phá</h3>
             <Button variant="ghost" size="sm" onClick={() => onNavigate('discovery')} className="text-indigo-600 hover:text-indigo-700">Xem tất cả</Button>
          </div>
          <p className="text-sm text-gray-500 -mt-2">Các từ khoá có Opportunity Score cao nhất.</p>
          
          <div className="space-y-4 mt-6">
            {topOps.map((kw, idx) => (
              <div key={kw.id} className="flex items-start justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors cursor-pointer" onClick={() => onNavigate('generator', kw.keyword)}>
                <div className="space-y-1 overflow-hidden pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-gray-400">0{idx + 1}</span>
                    <span className="font-medium text-gray-900 truncate" title={kw.keyword}>{kw.keyword}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pl-6">
                    <Badge variant={kw.trend === 'up' ? 'success' : 'default'} className="!py-0">
                      {kw.trend.toUpperCase()}
                    </Badge>
                    <span>{kw.searchVolume.toLocaleString()} vol</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                   <div className="text-xl font-light text-emerald-600">{kw.opportunityScore}</div>
                   <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Điểm</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
