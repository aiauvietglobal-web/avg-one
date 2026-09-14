import React from 'react';
import {
  ChevronLeft, LayoutGrid, Mic, BarChart3, Sun, Moon
} from 'lucide-react';
import { AppModuleId } from '../AppLauncherModal';

export type AppsNavTab = 'overview' | 'speech-to-text' | 'dashboard';

export interface AppsHeaderProps {
  activeSubTitle: string;
  onBack: () => void;
  onSelectModule: (module: AppModuleId) => void;
  appsNavTab?: AppsNavTab;
  onSelectAppsTab?: (tab: AppsNavTab) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const AppsHeader: React.FC<AppsHeaderProps> = ({
  activeSubTitle,
  onBack,
  onSelectModule,
  appsNavTab = 'overview',
  onSelectAppsTab,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  const currentTab = activeSubTitle === 'CHUYỂN ĐỔI TRỰC TIẾP' 
    ? 'speech-to-text' 
    : activeSubTitle === 'BÁO CÁO QUẢN TRỊ' 
    ? 'dashboard' 
    : appsNavTab;

  const handleTabClick = (tab: AppsNavTab) => {
    if (tab === 'overview') {
      window.dispatchEvent(new CustomEvent('submodule_back'));
      if (onSelectAppsTab) onSelectAppsTab('overview');
    } else if (tab === 'speech-to-text') {
      window.dispatchEvent(new CustomEvent('open_sub_app', { detail: 'speech-to-text' }));
      if (onSelectAppsTab) onSelectAppsTab('speech-to-text');
    } else if (tab === 'dashboard') {
      window.dispatchEvent(new CustomEvent('open_sub_app', { detail: 'dashboard' }));
      if (onSelectAppsTab) onSelectAppsTab('dashboard');
    }
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ < ỨNG DỤNG / APP CON ] + [ Tabs đầu mục ] */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {/* Nút quay lại kèm tiêu đề dạng Pill cao cấp */}
          <button
            onClick={onBack}
            className="h-9 px-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/90 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60 font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer shrink-0"
            title={activeSubTitle ? "Quay lại Kho ứng dụng" : "Quay lại Trang chủ"}
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.8] text-[#F15A24] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="whitespace-nowrap font-black">{activeSubTitle || 'ỨNG DỤNG'}</span>
          </button>

          {/* BỘ ĐẦU MỤC QUẢN LÝ PHÂN HỆ ỨNG DỤNG (Kho ứng dụng, Chuyển đổi trực tiếp, Báo cáo quản trị) */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
            {[
              { id: 'overview' as const, label: 'Kho ứng dụng', icon: LayoutGrid },
              { id: 'speech-to-text' as const, label: 'Chuyển đổi trực tiếp', icon: Mic },
              { id: 'dashboard' as const, label: 'Báo cáo quản trị', icon: BarChart3 },
            ].map((tab) => {
              const isActive = currentTab === tab.id;
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
