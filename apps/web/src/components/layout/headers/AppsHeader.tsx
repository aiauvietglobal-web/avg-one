import React from 'react';
import { Home } from 'lucide-react';
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
  renderUserAuthButton
}) => {
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ 🏠 Trang chủ ] + [ ỨNG DỤNG ] - Căn thẳng hàng 100% tuyệt đối */}
        <button
          onClick={handleGoHome}
          className="group flex items-center gap-2 sm:gap-2.5 h-9 sm:h-10 px-1 -ml-1 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer select-none shrink-0"
          title="Về Trang chủ AVG One"
        >
          <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#F15A24] dark:text-orange-400 stroke-[2.4] shrink-0 -translate-y-0.5 group-hover:scale-105 transition-transform" />
          <span className="text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 uppercase tracking-tight leading-none transition-colors">
            ỨNG DỤNG
          </span>
        </button>

        {/* Right: Đăng Nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};

