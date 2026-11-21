import React from 'react';
import { Sun, Moon } from 'lucide-react';
import avgOfficialLogo from '../../../assets/avg-one-official-logo.png';
import { AppModuleId } from '../AppLauncherModal';
import { HeaderNavMenu } from './HeaderNavMenu';

export interface HomeHeaderProps {
  onSelectModule: (module: AppModuleId) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onSelectModule,
  darkMode = false,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  return (
    <header className="fixed top-3.5 sm:top-4 md:top-5 inset-x-0 z-40 flex items-center justify-center pointer-events-none select-none px-3 sm:px-6">
      <div className="w-full max-w-[1040px] h-13 sm:h-14 px-3.5 sm:px-5 md:px-6 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white rounded-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] border border-slate-200/90 dark:border-slate-800/90 flex items-center justify-between gap-3 sm:gap-6 pointer-events-auto transition-all">
        {/* Left: AVG One Official Logo */}
        <div className="flex items-center gap-2 select-none shrink-0 whitespace-nowrap pl-1">
          <img
            src={avgOfficialLogo}
            alt="AVG One Official Logo"
            className="h-6.5 sm:h-7.5 object-contain cursor-pointer pointer-events-auto shrink-0 hover:opacity-85 transition-opacity"
            onClick={() => onSelectModule('home')}
            title="Trang chủ AVG One"
          />
        </div>

        {/* Center: Menu phân hệ viên thuốc căn giữa */}
        <div className="hidden md:flex flex-1 items-center justify-center shrink-0 whitespace-nowrap">
          <HeaderNavMenu
            activeModule="home"
            onSelectModule={onSelectModule}
          />
        </div>

        {/* Right: Dark Mode Toggle + Nút Đăng Nhập */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 whitespace-nowrap pr-0.5">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="w-8.5 h-8.5 rounded-full bg-transparent hover:bg-[#EEEEEE] dark:hover:bg-slate-800 text-slate-600 dark:text-amber-400 flex items-center justify-center transition-colors cursor-pointer select-none"
              title={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            >
              {darkMode ? <Sun className="w-4 h-4 stroke-[2]" /> : <Moon className="w-4 h-4 stroke-[2]" />}
            </button>
          )}
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
