import React from 'react';
import avgOfficialLogo from '../../../assets/avg-one-official-logo.png';
import { AppModuleId } from '../AppLauncherModal';
import { HeaderNavMenu } from './HeaderNavMenu';

export interface HomeHeaderProps {
  onSelectModule: (module: AppModuleId) => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onSelectModule,
  renderUserAuthButton
}) => {
  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-11 sm:h-12 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: AVG One Official Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          <img
            src={avgOfficialLogo}
            alt="AVG One Official Logo"
            className="h-6.5 sm:h-7.5 object-contain cursor-pointer pointer-events-auto shrink-0"
            onClick={() => onSelectModule('home')}
            title="Trang chủ AVG One"
          />
        </div>

        {/* Right: Phân hệ quản lý vận hành + Nút Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 shrink-0 whitespace-nowrap">
          <HeaderNavMenu
            activeModule="home"
            onSelectModule={onSelectModule}
          />
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
