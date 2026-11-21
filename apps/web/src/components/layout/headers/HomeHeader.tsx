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
    <header className="short-centered-header fixed top-0 left-0 right-0 z-40 bg-transparent pointer-events-none select-none">
      <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-7 h-14 sm:h-16 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white rounded-b-2xl border-x border-b border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center justify-between gap-4 sm:gap-6 pointer-events-auto">
        {/* Left: AVG One Official Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          <img
            src={avgOfficialLogo}
            alt="AVG One Official Logo"
            className="h-7 sm:h-8 object-contain cursor-pointer pointer-events-auto shrink-0"
            onClick={() => onSelectModule('home')}
            title="Trang chủ AVG One"
          />
        </div>

        {/* Center: Menu phân hệ căn chính giữa khoảng trống giữa Logo và Đăng nhập */}
        <div className="hidden md:flex flex-1 items-center justify-center shrink-0 whitespace-nowrap">
          <HeaderNavMenu
            activeModule="home"
            onSelectModule={onSelectModule}
          />
        </div>

        {/* Right: Nút Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
