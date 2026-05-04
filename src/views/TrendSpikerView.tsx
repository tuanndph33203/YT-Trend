import { useState, useEffect } from 'react';
import { Card, Badge, Button } from '../components/ui/shared';
import { BellRing, TrendingUp, Users, Clock, PlayCircle, Loader2 } from 'lucide-react';
import { fetchTrendingVideos } from '../lib/api-service';

export default function TrendSpikerView() {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrendingVideos('US', 12)
      .then(data => {
        if (data.items) {
          const formatted = data.items.map((item: any) => ({
            id: item.id,
            niche: 'Global Trend',
            videoTitle: item.snippet.title,
            channelName: item.snippet.channelTitle,
            subs: 0, // Would need an extra API call per channel, mock for now
            viewVelocity: Math.floor(parseInt(item.statistics.viewCount) / 24), // Rough estimate
            timestamp: new Date(item.snippet.publishedAt).toLocaleDateString(),
            isRead: false
          }));
          setTrends(formatted);
        } else {
          setError('Không có dữ liệu trả về.');
        }
      })
      .catch(err => {
        setError(err.message || 'Lỗi khi lấy dữ liệu Trending.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
          Hệ thống Cảnh báo Sớm (Real API) <BellRing className="w-5 h-5 text-rose-500 animate-pulse" />
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Nhận diện các video đang dẫn đầu mục Thịnh Hành từ YouTube API (Đã áp dụng Cache).
        </p>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      ) : loading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map(alert => (
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
                {alert.videoTitle}
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-2.5 flex justify-between items-center text-sm border border-gray-100">
                  <span className="text-gray-500 flex items-center gap-1.5 text-xs"><Users className="w-4 h-4" /> Kênh</span>
                  <span className="font-medium text-gray-900 truncate max-w-[120px]">{alert.channelName}</span>
                </div>
                <div className="bg-rose-50/50 rounded-lg p-2.5 flex justify-between items-center text-sm border border-rose-100/50">
                  <span className="text-rose-600 flex items-center gap-1.5 text-xs font-semibold"><TrendingUp className="w-4 h-4" /> Vận tốc</span>
                  <span className="font-bold text-rose-600">{(alert.viewVelocity/1000).toFixed(1)}k <span className="text-xs font-normal">view/ngày</span></span>
                </div>
              </div>
              
              <a href={`https://youtube.com/watch?v=${alert.id}`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-4 gap-2" variant={alert.isRead ? 'outline' : 'default'}>
                  <PlayCircle className="w-4 h-4" /> Xem video
                </Button>
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
