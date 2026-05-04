import { mockContentGaps } from '../data/mockData';
import { Card, Badge, Button } from '../components/ui/shared';
import { Layers, AlertTriangle, TrendingUp, Search } from 'lucide-react';

export default function ContentGapView({ onNavigate }: { onNavigate: (v: string, kw?: string) => void }) {
  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
          Phân tích Content Gap <Layers className="w-5 h-5 text-indigo-500" />
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          So sánh giữa "Lượng tìm kiếm" cao và "Chất lượng video hiện có" thấp. Nơi đây chứa những cơ hội vàng để video của bạn dễ dàng leo Top.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContentGaps.map(gap => (
          <Card key={gap.id} className="border-t-4 border-t-indigo-500 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="mb-3">
              <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Cơ hội vàng</div>
              <h3 className="text-lg font-bold text-gray-900">{gap.keyword}</h3>
            </div>
            
            <div className="space-y-3 mt-auto mb-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><Search className="w-4 h-4" /> Search Volume</span>
                <span className="font-semibold text-gray-900">{(gap.searchVolume / 1000).toFixed(0)}k/tháng</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Lý do Gap</span>
                <Badge variant="warning">{gap.gapReason}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Gap Score</span>
                <span className="font-bold text-emerald-600 text-lg">{gap.gapScore}/100</span>
              </div>
            </div>

            <Button onClick={() => onNavigate('generator', gap.keyword)} className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border-0">
              Khai thác Keyword Này
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
