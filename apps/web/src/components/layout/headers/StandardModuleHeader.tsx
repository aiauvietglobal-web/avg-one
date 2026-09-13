import React from 'react';
import { ChevronLeft } from 'lucide-react';
import avgOfficialLogo from '../../../assets/avg-one-official-logo.png';
import { AppModuleId } from '../AppLauncherModal';
import { HeaderNavMenu } from './HeaderNavMenu';

export interface StandardModuleHeaderProps {
  activeModule: AppModuleId;
  activeSubTitle?: string;
  onBack: () => void;
  onSelectModule: (module: AppModuleId) => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const StandardModuleHeader: React.FC<StandardModuleHeaderProps> = ({
  activeModule,
  activeSubTitle,
  onBack,
  onSelectModule,
  renderUserAuthButton
}) => {
  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-xs dark:shadow-none select-none">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Phân hệ con hoặc Logo AVG One */}
        <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {activeSubTitle ? (
            <button
              onClick={onBack}
              className="group text-xs sm:text-sm font-black text-[#F15A24] dark:text-orange-400 uppercase tracking-wide cursor-pointer flex items-center hover:text-orange-600 dark:hover:text-orange-300 transition-colors select-none shrink-0 py-1"
              title="Quay lại danh mục phân hệ"
            >
              <span className="inline-flex items-center overflow-hidden transition-all duration-200 ease-out w-0 opacity-0 -translate-x-1 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-1 group-active:w-4 group-active:opacity-100 group-active:translate-x-0 group-active:mr-1 group-focus-visible:w-4 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:mr-1 shrink-0">
                <ChevronLeft className="w-4 h-4 stroke-[2.8] text-[#F15A24] dark:text-orange-400 shrink-0" />
              </span>
              <span className="whitespace-nowrap font-black">{activeSubTitle}</span>
            </button>
          ) : (
            <img
              src={avgOfficialLogo}
              alt="AVG One Official Logo"
              className="h-7 sm:h-8 object-contain cursor-pointer pointer-events-auto shrink-0"
              onClick={() => onSelectModule('home')}
              title="Trang chủ AVG One"
            />
          )}
        </div>

        {/* Right: Menu phân hệ + Nút Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 shrink-0 whitespace-nowrap">
          <HeaderNavMenu
            activeModule={activeModule}
            onSelectModule={onSelectModule}
            activeSubTitle={activeSubTitle}
          />
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
