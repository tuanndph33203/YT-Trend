import { OutlierVideo } from '../data/mockData';

export function getOutlierVideos(videos: OutlierVideo[], niche?: string): OutlierVideo[] {
  let filtered = videos;
  if (niche && niche !== 'All') {
    filtered = videos.filter(v => v.niche === niche);
  }
  
  return filtered
    // Lọc kênh < 50k subs và lượt view vượt xa số subs (lớn hơn 5 lần)
    .filter(v => v.subscriberCount < 50000 && v.viewCount > (v.subscriberCount * 5))
    .sort((a, b) => {
      // Sắp xếp theo tỷ lệ tăng trưởng (view / subs) giảm dần
      const ratioA = a.viewCount / Math.max(1, a.subscriberCount);
      const ratioB = b.viewCount / Math.max(1, b.subscriberCount);
      return ratioB - ratioA;
    });
}
