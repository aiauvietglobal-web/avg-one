import React from 'react';
import {
  Home, ChevronLeft, LayoutGrid, Sparkles, Clock, Sun, Moon
} from 'lucide-react';
import { AppModuleId } from '../AppLauncherModal';

export type AppsOverviewTab = 'all' | 'ready' | 'upcoming';

export interface AppsHeaderProps {
  activeSubTitle?: string;
  onBack: () => void;
  onGoHome?: () => void;
  onSelectModule?: (module: AppModuleId) => void;
  appsNavTab?: string;
  onSelectAppsTab?: (tab: any) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const AppsHeader: React.FC<AppsHeaderProps> = ({
  onBack,
  onGoHome,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  const [activeTab, setActiveTab] = React.useState<AppsOverviewTab>('all');

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  const handleTabClick = (tab: AppsOverviewTab) => {
    setActiveTab(tab);
    window.dispatchEvent(new CustomEvent('apps_filter_tab', { detail: tab }));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ 🏠 Trang chủ ] + [ ỨNG DỤNG (chỉ để chữ) ] + [ Tabs đầu mục ] */}
        <div className="flex items-center gap-2 sm:gap-2.5 select-none shrink-0 whitespace-nowrap">
          {/* Icon Trang chủ: Bấm để quay về Trang chủ AVG One */}
          <button
            onClick={handleGoHome}
            className="w-8 h-8 sm:w-9 sm:h-9 -ml-1 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24] hover:bg-orange-50/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer shrink-0"
            title="Về Trang chủ AVG One"
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Tên phân hệ: Bỏ hộp chỉ để chữ (bấm quay lại Trang chủ) */}
          <button
            onClick={onBack}
            className="text-sm sm:text-[15px] font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-wide cursor-pointer transition-colors shrink-0 select-none py-1"
            title="Quay lại Trang chủ"
          >
            ỨNG DỤNG
          </button>

          {/* BỘ ĐẦU MỤC QUẢN LÝ KHO ỨNG DỤNG (Tất cả, Đã sẵn sàng, Sắp phát hành) */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
            {[
              { id: 'all' as const, label: 'Tất cả ứng dụng', count: 4, icon: LayoutGrid },
              { id: 'ready' as const, label: 'Đã sẵn sàng', count: 2, icon: Sparkles },
              { id: 'upcoming' as const, label: 'Sắp phát hành', count: 2, icon: Clock },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`h-7 px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Dark Mode Toggle + Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-center text-slate-600 dark:text-amber-400 transition-colors shadow-2xs cursor-pointer"
              title={darkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
