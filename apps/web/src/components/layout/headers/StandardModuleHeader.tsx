import React from 'react';
import avgOfficialLogo from '../../../assets/avg-one-official-logo.png';
import { AppModuleId } from '../AppLauncherModal';
import { HeaderNavMenu } from './HeaderNavMenu';

export interface StandardModuleHeaderProps {
  activeModule: AppModuleId;
  activeSubTitle?: string;
  onSelectModule: (module: AppModuleId) => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const StandardModuleHeader: React.FC<StandardModuleHeaderProps> = ({
  activeModule,
  activeSubTitle,
  onSelectModule,
  renderUserAuthButton
}) => {
  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Logo AVG One chính thức */}
        <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          <img
            src={avgOfficialLogo}
            alt="AVG One Official Logo"
            className="h-7 sm:h-8 object-contain cursor-pointer pointer-events-auto shrink-0"
            onClick={() => onSelectModule('home')}
            title="Trang chủ AVG One"
          />
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
