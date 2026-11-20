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
    <header className="short-centered-header fixed top-0 left-0 right-0 z-40 bg-transparent pointer-events-none select-none">
      <div className="max-w-5xl w-full mx-auto px-5 sm:px-7 h-14 sm:h-16 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white rounded-b-2xl shadow-xs flex items-center justify-between gap-4 sm:gap-6 pointer-events-auto">
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
