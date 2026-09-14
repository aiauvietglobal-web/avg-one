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
        {/* Cụm trái: [ 🏠 Trang chủ ] + [ ỨNG DỤNG (chỉ để chữ) ] */}
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
        </div>

        {/* Right: Đăng Nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};

