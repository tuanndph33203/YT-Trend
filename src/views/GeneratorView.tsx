import { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/ui/shared';
import { generateContentStrategy, checkGeminiConfig } from '../lib/api-service';
import { Sparkles, ArrowLeft, Loader2, PlaySquare, FileText, Anchor, Hash, PenTool, Image as ImageIcon, Flame, Users2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { mockOutlierVideos } from '../data/mockData';
import { getOutlierVideos } from '../lib/niche-finder';
import NicheVideoCard from '../components/NicheVideoCard';

export default function GeneratorView({ keyword, onBack, onNavigate }: { keyword: string; onBack: () => void; onNavigate: (v: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    checkGeminiConfig().then(configured => {
      setIsConfigured(configured);
      if (keyword && configured) {
        generate(keyword);
      }
    });
  }, [keyword]);


  const generate = async (kw: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateContentStrategy(kw);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi kết nối Gemini API. Hãy chắc chắn bạn đã cấu hình key.');
    } finally {
      setLoading(false);
    }
  };

  if (isConfigured === false) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </Button>
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto space-y-4">
             <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <AlertCircle className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-semibold">Chưa cấu hình Gemini API Key</h3>
             <p className="text-gray-500 text-sm">
               Để sử dụng AI tạo tiêu đề, kịch bản mở đầu và mô tả, vui lòng cung cấp API key trong cài đặt.
             </p>
             <Button onClick={() => onNavigate('settings')} className="mt-4">
               Xem hướng dẫn cấu hình
             </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="-ml-3 !px-3 shrink-0">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            AI Generator & Script
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Đang khai thác chiến lược viral cho: 
            <Badge variant="default" className="text-sm bg-gray-200 text-gray-900 ml-2 py-0.5">{keyword}</Badge>
          </p>
        </div>
        {!loading && result && (
          <Button variant="outline" onClick={() => generate(keyword)} className="gap-2">
            <Sparkles className="w-4 h-4" /> Tạo lại
          </Button>
        )}
      </div>

      {loading && (
        <Card className="py-24 flex flex-col items-center justify-center space-y-4 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-gray-600 font-medium">Đang phân tích hành vi người xem và viết kịch bản...</p>
        </Card>
      )}

      {error && !loading && (
        <Card className="bg-red-50 border-red-100 text-red-800 py-8">
          <p className="text-center font-medium">{error}</p>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => generate(keyword)} variant="outline" className="bg-white hover:bg-red-50 text-red-700 border-red-200">
              Thử Lại
            </Button>
          </div>
        </Card>
      )}

      {result && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           
           <Card className="border-l-4 border-l-indigo-500 shadow-sm">
             <div className="flex gap-4 items-start">
               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                 <PlaySquare className="w-5 h-5" />
               </div>
               <div className="w-full">
                 <h3 className="font-semibold text-lg text-gray-900 mb-4">10 Tiêu Đề Có CTR Cao Nhất</h3>
                 <ul className="space-y-3">
                   {result.titles?.map((t: string, i: number) => (
                     <li key={i} className="flex gap-3 items-start bg-gray-50/50 rounded-lg p-3 border border-gray-100 hover:border-indigo-200 hover:bg-white transition-colors cursor-copy relative group" onClick={() => navigator.clipboard.writeText(t)}>
                       <span className="font-mono text-sm text-indigo-400 mt-0.5 font-semibold">{(i+1).toString().padStart(2, '0')}</span>
                       <span className="text-gray-800 font-medium">{t}</span>
                       <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="shadow-sm">
               <div className="flex gap-4 items-start">
                 <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                   <Anchor className="w-5 h-5" />
                 </div>
                 <div className="w-full">
                   <h3 className="font-semibold text-lg text-gray-900 mb-4">Kịch Bản 15s Đầu (Hook)</h3>
                   <div className="space-y-4">
                     {result.hooks?.map((h: string, i: number) => (
                       <div key={i} className="pl-4 border-l-2 border-gray-100 relative pt-1 pb-1">
                         <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-rose-200"></div>
                         <p className="text-gray-700 italic border border-gray-100 rounded-r-lg p-3 bg-gray-50/30">"{h}"</p>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </Card>

             <Card className="shadow-sm">
               <div className="flex gap-4 items-start">
                 <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                   <FileText className="w-5 h-5" />
                 </div>
                 <div className="w-full">
                   <h3 className="font-semibold text-lg text-gray-900 mb-4">Dàn Ý Video (Outline)</h3>
                   <ol className="list-decimal list-outside ml-4 space-y-3 text-gray-700">
                     {result.outline?.map((o: string, i: number) => (
                       <li key={i} className="pl-2 marker:text-emerald-500 marker:font-semibold">{o}</li>
                     ))}
                   </ol>
                 </div>
               </div>
             </Card>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="shadow-sm">
                <div className="flex gap-3 mb-4">
                  <Hash className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-gray-900">Tags & Hashtags Tối Ưu SEO</h3>
                </div>
                
                <h4 className="text-xs uppercase font-semibold text-gray-500 mb-2">Video Tags ({result.tags?.length || 0})</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {result.tags?.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs border border-gray-200">{tag}</span>
                  ))}
                </div>

                <h4 className="text-xs uppercase font-semibold text-gray-500 mb-2">Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {result.hashtags?.map((tag: string, i: number) => (
                    <span key={i} className="text-indigo-600 text-sm font-semibold">{tag}</span>
                  ))}
                </div>
             </Card>

             <Card className="shadow-sm">
                <div className="flex gap-3 mb-4">
                  <PenTool className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-gray-900">Mẫu Mô Tả Video (Description)</h3>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {result.description}
                </div>
             </Card>
           </div>

           <Card className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white border-0 shadow-lg">
              <div className="flex gap-3 items-center mb-3 text-indigo-300">
                <ImageIcon className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-xs">Ý Tưởng Thumbnail Đột Phá</h3>
              </div>
              <p className="text-base leading-relaxed text-blue-50/90">{result.thumbnailIdea}</p>
           </Card>

           <div className="pt-8 mb-4 border-t border-gray-100">
             <div className="flex gap-3 mb-2 items-center">
               <Flame className="w-6 h-6 text-orange-500 fill-orange-500/20" />
               <h3 className="text-xl font-semibold text-gray-900">Video Đột Phá (Outliers) Cùng Ngách</h3>
             </div>
             <p className="text-sm text-gray-500 mb-6">Các video từ kênh nhỏ nhưng có lượt view vượt trội để tham khảo cấu trúc nội dung và phong cách thumbnail.</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getOutlierVideos(mockOutlierVideos, 'All').slice(0, 4).map(video => (
                  <NicheVideoCard key={video.id} video={video} />
                ))}
             </div>
           </div>

           {/* SaaS Pro - Connect Freelancers */}
           <div className="pt-8 mt-8 border-t border-gray-100">
             <Card className="bg-white border-dashed border-2 border-indigo-200">
               <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <Users2 className="w-5 h-5 text-indigo-600" />
                     <h3 className="font-semibold text-lg text-gray-900">Cần người thực hiện ý tưởng này?</h3>
                     <Badge variant="warning" className="bg-amber-100 text-amber-800 border-0 uppercase text-[10px]">SaaS Pro</Badge>
                   </div>
                   <p className="text-sm text-gray-600">Thuê Editor chuyên nghiệp hoặc Thumbnail Designer trên hệ sinh thái của TrendFinder / Upwork để triển khai ngay trước khi trend bão hoà.</p>
                 </div>
                 <Button className="shrink-0 gap-2 bg-indigo-600 hover:bg-indigo-700">
                   <Users2 className="w-4 h-4" /> Tìm Freelancer ngay (Từ 15$)
                 </Button>
               </div>
             </Card>
           </div>
        </div>
      )}
    </div>
  );
}
