import { useState } from 'react';
import DashboardView from './views/DashboardView';
import KeywordDiscoveryView from './views/KeywordDiscoveryView';
import GeneratorView from './views/GeneratorView';
import IntegrationDocView from './views/IntegrationDocView';
import SearchView from './views/SearchView';
import { cn } from './lib/utils';
import { LayoutDashboard, Compass, Sparkles, BookOpen, Menu, X, Flame, Search } from 'lucide-react';

type View = 'dashboard' | 'search' | 'discovery' | 'generator' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('search');
  const [activeKeyword, setActiveKeyword] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (view: View, focusKeyword?: string) => {
    setCurrentView(view);
    if (focusKeyword) setActiveKeyword(focusKeyword);
    setMobileMenuOpen(false);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => navigate(view)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
          isActive 
            ? "bg-gray-900 text-white" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-gray-300" : "text-gray-400")} />
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 flex flex-col z-50 transition-transform lg:translate-x-0 lg:static",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg tracking-tight">
            <Flame className="w-6 h-6 fill-indigo-600" />
            YT TrendSeeker
          </div>
        </div>
        
        <div className="p-4 flex-1 space-y-1">
          <NavItem view="search" icon={Search} label="Mở rộng từ khoá" />
          <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem view="discovery" icon={Compass} label="Từ khoá đã lưu" />
          <NavItem view="generator" icon={Sparkles} label="AI Khai thác" />
          
          <div className="pt-6 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Hệ Thống</p>
          </div>
          <NavItem view="settings" icon={BookOpen} label="Tài liệu API & SaaS" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="p-2 -ml-2 text-gray-500 rounded-lg hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-gray-400 lg:hidden">Menu</div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span className="text-xs font-medium text-gray-500">System Online</span>
             </div>
          </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
             {currentView === 'search' && <SearchView onAnalyze={(kw) => navigate('generator', kw)} />}
             {currentView === 'dashboard' && <DashboardView onNavigate={navigate} />}
             {currentView === 'discovery' && <KeywordDiscoveryView onSelectKeyword={(kw) => navigate('generator', kw)} />}
             {currentView === 'generator' && (
               <GeneratorView 
                 keyword={activeKeyword || "ai tools"} 
                 onBack={() => navigate('discovery')} 
                 onNavigate={navigate}
               />
             )}
             {currentView === 'settings' && <IntegrationDocView />}
          </div>
        </div>
      </main>

    </div>
  );
}

