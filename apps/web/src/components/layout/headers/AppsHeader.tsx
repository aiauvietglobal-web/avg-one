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
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Cụm trái: [ 🏠 ỨNG DỤNG ] - Căn chỉnh đồng trục 100% giữa Icon và Chữ */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 sm:gap-2.5 text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 active:scale-[0.98] transition-all cursor-pointer select-none group"
            title="Quay lại Trang chủ"
          >
            <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.5] text-[#F15A24] dark:text-orange-400 group-hover:scale-105 transition-transform shrink-0" />
            <span className="text-base sm:text-lg lg:text-xl font-black uppercase tracking-tight leading-none text-[#F15A24] dark:text-orange-400 select-none">
              ỨNG DỤNG
            </span>
          </button>
        </div>

        {/* Right: Đăng Nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};

