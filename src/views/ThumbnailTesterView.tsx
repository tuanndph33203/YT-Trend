import { useState } from 'react';
import { Card, Button, Badge } from '../components/ui/shared';
import { Image as ImageIcon, Upload, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ThumbnailTesterView() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
          Thumbnail A/B Testing <ImageIcon className="w-5 h-5 text-purple-500" />
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Mô phỏng tỷ lệ Click (CTR) trước khi đăng. AI sẽ so sánh thumbnail của bạn với Top 3 đối thủ để chấm điểm nổi bật.
        </p>
      </div>

      {!uploaded && (
        <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center py-24 hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleUpload}>
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Upload Thumbnail của bạn</h3>
          <p className="text-gray-500 text-sm mt-1">Kéo thả hoặc click để tải lên</p>
        </Card>
      )}

      {analyzing && (
        <Card className="py-24 flex flex-col items-center shadow-sm">
          <Eye className="w-10 h-10 text-purple-500 animate-pulse mb-4" />
          <p className="text-gray-700 font-medium">AI đang quét và so sánh với Top 3 đối thủ hiện tại...</p>
        </Card>
      )}

      {results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=640&q=80" alt="Your Thumbnail" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 px-3 py-1 rounded text-sm font-bold shadow-sm">Thumbnail Của Bạn</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-black text-purple-600">82<span className="text-2xl text-purple-400">/100</span></div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Khá Nổi Bật!</h3>
                    <p className="text-sm text-gray-600">Dự kiến CTR ~ 8.5% - 11%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-500">Độ tương phản màu</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full w-[90%]"></div></div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-500">Trigger Words</span>
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-amber-500 h-1.5 rounded-full w-[60%]"></div></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <p className="text-sm text-gray-700 font-medium">💡 Gợi ý cải thiện:</p>
                  <ul className="list-disc pl-4 mt-2 text-sm text-gray-600 space-y-1">
                    <li>Chữ "AI" nên đổ bóng vàng (Drop shadow) thay vì trắng để cắt ngang background tối.</li>
                    <li>Thêm mũi tên màu đỏ chỉ vào logo để tạo sự chú ý tập trung.</li>
                    <li>Khuôn mặt hụt một chút sáng (Brightness +15%).</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={() => { setUploaded(false); setResults(false); }}>Thử Ảnh Khác</Button>
          </div>
        </div>
      )}
    </div>
  );
}
