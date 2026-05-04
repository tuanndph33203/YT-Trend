import { Card, Badge, Button } from '../components/ui/shared';
import { Database, Search, Youtube, Code, Shield, Key, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export default function IntegrationDocView() {
  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Tài liệu API & Kiến trúc SaaS</h2>
        <p className="text-sm text-gray-500 mt-1">
          Hướng dẫn chi tiết cách chạy dự án, tích hợp API thật và lộ trình nâng cấp thành SaaS bán subscription.
        </p>
      </div>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-gray-100 pb-2">
          <Code className="w-5 h-5 text-indigo-500" />
          1. Kiến trúc hệ thống
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Dự án được xây dựng theo kiến trúc <strong>Jamstack</strong> kết hợp với Next.js (hoặc Vite + Express).
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
          <li><strong>Frontend:</strong> React + TypeScript + Tailwind CSS cho UI/UX mượt mà.</li>
          <li><strong>Routing:</strong> Next.js App Router (khuyến nghị cho SEO và Server Actions) hoặc React Router (Vite).</li>
          <li><strong>AI Engine:</strong> Tích hợp Google Gemini (@google/genai) để tạo Title, Hooks, Outline.</li>
          <li><strong>Data Fetching:</strong> Gọi trực tiếp các route API backend để tránh lộ API Key.</li>
        </ul>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-gray-100 pb-2">
          <Database className="w-5 h-5 text-emerald-500" />
          2. Hướng dẫn tích hợp API thật
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500" /> YouTube Data API v3
            </h4>
            <p className="text-xs text-gray-600 mt-2">Dùng để lấy volume, độ cạnh tranh và phân tích top 10 video.</p>
            <div className="mt-3 text-[11px] font-mono bg-gray-900 text-gray-300 p-2 rounded-lg">
              GET /youtube/v3/search?part=snippet&q={'{khóa}'}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" /> Google Trends (Unofficial)
            </h4>
            <p className="text-xs text-gray-600 mt-2">Dùng npm <code>google-trends-api</code> tại backend để lấy Trend Score và Data Chart.</p>
            <div className="mt-3 text-[11px] font-mono bg-gray-900 text-gray-300 p-2 rounded-lg">
              googleTrends.interestOverTime(...)
            </div>
          </div>
        </div>

        <div className="bg-amber-50 text-amber-900 p-3 rounded-lg text-sm border border-amber-100 flex gap-3 items-start">
          <Shield className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            <strong>Lưu ý quan trọng (ToS):</strong> Scraping YouTube Autocomplete cần dùng backoff/rate limit hợp lý hoặc sử dụng thư viện như <code>youtube-suggest-scraper</code>. Để lấy search volume chính xác hơn, có thể tích hợp <a href="https://serpapi.com/" className="underline">SerpAPI</a> hoặc API trả phí khác.
          </p>
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-gray-100 pb-2">
          <Key className="w-5 h-5 text-gray-700" />
          3. Hướng dẫn cài đặt & Chạy Local
        </h3>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Bước 1: Cấu hình biến môi trường</p>
          <div className="bg-gray-900 text-gray-300 text-sm font-mono p-3 rounded-lg overflow-x-auto">
            <p>GEMINI_API_KEY="AIzaSy..."</p>
            <p className="text-gray-500"># Thêm nếu tự build backend:</p>
            <p>YOUTUBE_API_KEY="AIzaSy..."</p>
          </div>
          
          <p className="text-sm font-medium mt-4">Bước 2: Chạy dự án</p>
          <div className="bg-gray-900 text-gray-300 text-sm font-mono p-3 rounded-lg overflow-x-auto">
            <p>npm install</p>
            <p>npm run dev</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-4 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-900 border-b border-indigo-100 pb-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          4. Lộ trình nâng cấp thành SaaS
        </h3>
        
        <p className="text-sm text-gray-700">
          Sản phẩm hiện tại đã đủ tính năng cốt lõi (Core Utility) để cung cấp giá trị cho YouTuber. Để thương mại hóa, bạn cần:
        </p>

        <ul className="space-y-3">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Auth & Users (Clerk / Firebase / Supabase)</h4>
              <p className="text-xs text-gray-600 mt-0.5">Cho phép user đăng ký, lưu lại các keyword đang track, thiết lập niche mặc định cho tài khoản.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Thanh toán (Stripe / LemonSqueezy)</h4>
              <p className="text-xs text-gray-600 mt-0.5">Tạo gói Freemium (5 lượt tìm kiếm/ngày) và gói Pro ($15/tháng) không giới hạn tìm kiếm, mở khóa Opportunity Score và AI Sinh kịch bản.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Database & Cron Jobs (PostgreSQL + Vercel Cron)</h4>
              <p className="text-xs text-gray-600 mt-0.5">Tạo base dữ liệu chung lưu cache kết quả API để giảm chi phí gọi YouTube API nhiều lần. Chạy Cron job để cập nhật Trending score cho các keyword phổ biến.</p>
            </div>
          </li>
        </ul>
      </Card>

    </div>
  );
}
