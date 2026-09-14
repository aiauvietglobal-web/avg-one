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
        {/* Cụm trái: [ 🏠 Trang chủ ] + [ ỨNG DỤNG (chữ to hơn, icon màu cam) ] */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {/* Icon Trang chủ màu cam AVG One */}
          <button
            onClick={handleGoHome}
            className="w-9 h-9 sm:w-10 sm:h-10 -ml-1 rounded-xl flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Về Trang chủ AVG One"
          >
            <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4]" />
          </button>

          {/* Tên phân hệ: Chữ to hơn, màu cam */}
          <button
            onClick={onBack}
            className="text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none py-1"
            title="Quay lại Trang chủ"
          >
            ỨNG DỤNG
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

