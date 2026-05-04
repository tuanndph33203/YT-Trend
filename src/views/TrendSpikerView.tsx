import { mockTrendAlerts } from '../data/mockData';
import { Card, Badge, Button } from '../components/ui/shared';
import { BellRing, TrendingUp, Users, Clock, PlayCircle } from 'lucide-react';

export default function TrendSpikerView() {
  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
          Hệ thống Cảnh báo Sớm <BellRing className="w-5 h-5 text-rose-500 animate-pulse" />
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Nhận diện các video có tốc độ tăng view đột biến (View Velocity) từ các kênh nhỏ gọn, giúp bạn nắm bắt lợi thế người đi đầu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTrendAlerts.map(alert => (
          <Card key={alert.id} className={`transition-all hover:border-rose-200 ${!alert.isRead ? 'border-rose-100 bg-rose-50/20' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <Badge variant={alert.isRead ? 'default' : 'danger'} className="text-xs">
                {alert.niche}
              </Badge>
              <div className="flex items-center text-xs text-gray-500 gap-1">
                <Clock className="w-3 h-3" /> {alert.timestamp}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-4 leading-snug">
              "{alert.videoTitle}"
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-2.5 flex justify-between items-center text-sm border border-gray-100">
                <span className="text-gray-500 flex items-center gap-1.5 text-xs"><Users className="w-4 h-4" /> Kênh</span>
                <span className="font-medium text-gray-900">{alert.channelName} <span className="text-gray-400 font-normal">({(alert.subs/1000).toFixed(1)}k)</span></span>
              </div>
              <div className="bg-rose-50/50 rounded-lg p-2.5 flex justify-between items-center text-sm border border-rose-100/50">
                <span className="text-rose-600 flex items-center gap-1.5 text-xs font-semibold"><TrendingUp className="w-4 h-4" /> Vận tốc</span>
                <span className="font-bold text-rose-600">{(alert.viewVelocity/1000).toFixed(1)}k <span className="text-xs font-normal">view/giờ</span></span>
              </div>
            </div>
            
            <Button className="w-full mt-4 gap-2" variant={alert.isRead ? 'outline' : 'default'}>
              <PlayCircle className="w-4 h-4" /> Xem chi tiết
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
