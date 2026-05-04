import React from 'react';
import { Card, Badge } from './ui/shared';
import { OutlierVideo } from '../data/mockData';
import { PlayCircle, Users } from 'lucide-react';

interface NicheVideoCardProps {
  video: OutlierVideo;
  key?: string | number;
}

export default function NicheVideoCard({ video }: NicheVideoCardProps) {
  const ratio = (video.viewCount / Math.max(1, video.subscriberCount)).toFixed(1);

  return (
    <Card className="overflow-hidden p-0 border border-gray-200 hover:border-indigo-300 transition-colors group flex flex-col h-full">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="warning" className="shadow-sm font-bold border-0 bg-amber-400 text-amber-900 px-2 py-1 flex items-center gap-1 text-[11px]">
            Tăng trưởng: +{ratio} lần
          </Badge>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-3 flex-1 text-sm leading-tight">
          {video.title}
        </h3>
        
        <div className="space-y-2 mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span className="truncate pr-2">{video.channelName}</span>
            <span className="shrink-0">{new Date(video.publishedAt).toLocaleDateString('vi-VN')}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between border border-gray-100">
              <span className="text-[10px] uppercase text-gray-400 shrink-0 font-semibold"><Users className="w-3 h-3 inline mr-1 text-gray-400" />Subs</span>
              <span className="font-mono text-xs text-gray-700 font-semibold">{(video.subscriberCount / 1000).toFixed(1)}k</span>
            </div>
            <div className="bg-indigo-50/50 rounded-lg p-2 flex items-center justify-between border border-indigo-50">
              <span className="text-[10px] uppercase text-indigo-400 shrink-0 font-semibold"><PlayCircle className="w-3 h-3 inline mr-1 text-indigo-400" />Views</span>
              <span className="font-mono text-xs text-indigo-700 font-bold">{(video.viewCount / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
