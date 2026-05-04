import { useState } from 'react';
import { Card, Button, Badge } from '../components/ui/shared';
import { CreditCard, CheckCircle2, Zap, Star } from 'lucide-react';

export default function PricingView() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Nâng cấp lên <span className="text-indigo-600">SaaS Pro</span>
        </h2>
        <p className="text-gray-500">
          Mở khóa toàn bộ quyền năng của AI để quét hàng triệu từ khoá, tìm ra "Opportunity Score" chính xác tuyệt đối.
        </p>
        
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Thanh toán hàng tháng</span>
          <button 
            onClick={() => setBillingCycle(b => b === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6 bg-indigo-100 rounded-full relative transition-colors focus:outline-none"
          >
            <div className={`w-4 h-4 bg-indigo-600 rounded-full absolute top-1 transition-transform ${billingCycle === 'yearly' ? 'left-7' : 'left-1'}`}></div>
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
            Thanh toán hàng năm <Badge variant="success" className="ml-1 text-[10px] bg-emerald-100 text-emerald-700">-20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Freemium Tier */}
        <Card className="p-8 border-2 border-transparent">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Freemium</h3>
            <p className="text-gray-500 text-sm h-10">Phù hợp cho Creator mới bắt đầu xây kênh.</p>
            <div className="my-4">
              <span className="text-4xl font-black text-gray-900">$0</span>
              <span className="text-gray-500">/tháng</span>
            </div>
            <Button variant="outline" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50">Gói Hiện Tại</Button>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" />
              <span><strong>5 lượt tìm kiếm</strong> từ khoá mỗi ngày</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" />
              <span>Xem Volume & Độ cạnh tranh cơ bản</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" />
              <span>Lưu được tối đa 1 dự án theo dõi</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400 opacity-60">
              <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0"></div>
              <span>Không có Opportunity Score</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400 opacity-60">
              <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0"></div>
              <span>Không có AI Sinh Kịch Bản & Title</span>
            </li>
          </ul>
        </Card>

        {/* Pro Tier */}
        <Card className="p-8 border-2 border-indigo-500 relative shadow-xl shadow-indigo-100">
          <div className="absolute top-0 right-8 -translate-y-1/2">
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 py-1.5 px-3 uppercase tracking-wider text-[10px] font-bold shadow-sm">
              <Star className="w-3 h-3 inline mr-1" /> Phổ biến nhất
            </Badge>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">SaaS Pro</h3>
            <p className="text-gray-500 text-sm h-10">Công cụ tối thượng để thống trị YouTube Niche.</p>
            <div className="my-4 flex items-end gap-2">
              <span className="text-4xl font-black text-gray-900">
                ${billingCycle === 'yearly' ? '12' : '15'}
              </span>
              <span className="text-gray-500 mb-1">/tháng</span>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 font-semibold gap-2">
              <CreditCard className="w-4 h-4" /> Nâng cấp qua Stripe
            </Button>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <span><strong>Không giới hạn</strong> tìm kiếm & lọc từ khoá</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>Mở khoá <strong>Opportunity Score</strong> & thuật toán độc quyền</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <span><strong>AI Sinh Kịch Bản</strong>, Title & Dàn ý Viral</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>Thumbnail A/B Testing & Phân tích đối thủ</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>Hệ thống <strong>Track trending 24/7</strong> (Cảnh báo sớm)</span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500" />
          Powered by Stripe & MonggoDB
        </p>
      </div>
    </div>
  );
}
