import { useState } from 'react';
import { Card, Button, Badge, Input } from '../components/ui/shared';
import { User, Mail, Shield, Save, Database, Clock, CheckCircle2 } from 'lucide-react';

export default function AuthSettingsView() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Quản lý Tài Khoản & Database</h2>
        <p className="text-sm text-gray-500 mt-1">Cấu hình hồ sơ người dùng (MongoDB) và cài đặt Cron Jobs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-5">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-gray-100 pb-3">
              <User className="w-5 h-5 text-indigo-500" />
              Hồ sơ (MongoDB User Document)
            </h3>
            
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="space-y-1.5">
                <label className="font-medium text-gray-700">Tên hiển thị</label>
                <Input defaultValue="Creator 101" className="bg-gray-50/50" />
              </div>
              
              <div className="space-y-1.5">
                <label className="font-medium text-gray-700">Email đăng nhập</label>
                <div className="flex gap-2">
                  <Input readOnly value="creator@example.com" className="bg-gray-100 text-gray-500 border-gray-200" />
                  <Badge variant="success" className="shrink-0 flex items-center">
                    <Shield className="w-3 h-3 mr-1" /> Đã xác thực
                  </Badge>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-gray-700">Niche Mặc định</label>
                <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Gaming</option>
                  <option>Lifestyle</option>
                </select>
                <p className="text-xs text-gray-500">Hệ thống sẽ tập trung quét Trend dựa trên niche này.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
               <Button onClick={handleSave} disabled={loading} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
                 {loading ? "Đang lưu..." : success ? <><CheckCircle2 className="w-4 h-4"/> Đã lưu</> : <><Save className="w-4 h-4"/> Lưu thay đổi</>}
               </Button>
            </div>
          </Card>

          {/* Database System Cache */}
          <Card className="space-y-4">
             <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-gray-100 pb-3">
              <Database className="w-5 h-5 text-emerald-500" />
              Hệ thống Cache & Cron Job
            </h3>
            <p className="text-sm text-gray-600">
              Công cụ đang sử dụng hệ sinh thái <strong>MonggoDB</strong> để lưu Cache tìm kiếm Youtube, giảm việc gọi API liên tục.
              Cron Job trên Vercel tự động Update mỗi ngày vào lúc 00:00.
            </p>

            <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono text-emerald-400 space-y-2 relative overflow-hidden">
               <div className="absolute top-2 right-3 text-gray-600">Server Logs (Mock)</div>
               <p>[13:45:00] <span className="text-gray-300">CRON: Vercel trigger /api/cron/update-trends</span></p>
               <p>[13:45:01] <span className="text-gray-300">MONGODB: Updating caching for 12,504 keywords...</span></p>
               <p>[13:45:24] <span className="text-blue-400">SUCCESS: Trends updated and cached to MonggoDB cluster0.</span></p>
            </div>
          </Card>
        </div>

        {/* Subscription Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-b from-indigo-50 to-white border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-4">Gói Đăng Ký (Stripe)</h3>
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">Gói hiện tại</div>
              <Badge className="bg-indigo-600 text-white border-0 shadow-sm">SaaS Pro</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm text-sm">
                <div className="text-gray-500 mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Gia hạn tiếp theo</div>
                <div className="font-medium text-gray-900">02 Tháng 06, 2026</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm text-sm">
                <div className="text-gray-500 mb-1">Phương thức</div>
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-[8px] font-bold italic">VISA</div>
                  •••• 4242
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6 border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50">
              Quản lý qua Cổng Stripe
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
}
