import { Card, Button } from '../components/ui/shared';
import { FolderTree, Clock, Activity, ArrowRight, TrendingDown } from 'lucide-react';
import { mockProjects } from '../data/mockData';

export default function NicheTrackerView() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
            Niche Tracker <FolderTree className="w-5 h-5 text-emerald-500" />
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý danh mục từ khoá, dự án và theo dõi vòng đời trend để biết khi nào một ngách sắp bão hoà.
          </p>
        </div>
        <Button className="gap-2">Thêm Dự án</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map(project => (
          <Card key={project.id} className="space-y-4 hover:border-emerald-200 transition-colors">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${project.status === 'Hot' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                {project.status === 'Hot' ? '🔥 Đang Hot' : '❄️ Hạ nhiệt'}
              </span>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Từ khoá đang theo dõi</p>
              <div className="flex flex-wrap gap-2">
                {project.keywords.map(kw => (
                  <span key={kw} className="bg-gray-100 text-gray-700 px-2 py-1 flex items-center gap-1.5 rounded text-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-600 font-semibold uppercase flex items-center gap-1">
                  <Activity className="w-4 h-4" /> Dự báo bão hoà
                </p>
                <p className="text-emerald-900 font-medium text-sm mt-1">
                  Trend sẽ duy trì sức nóng trong khoảng
                </p>
              </div>
              <div className="text-3xl font-bold text-emerald-600">{project.daysUntilSaturation} <span className="text-base font-normal text-emerald-500">ngày</span></div>
            </div>
            
            <Button variant="ghost" className="w-full text-gray-500 hover:text-gray-900">
              Mở Dự Án <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
