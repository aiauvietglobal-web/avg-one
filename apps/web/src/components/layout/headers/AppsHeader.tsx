import React from 'react';
import { ChevronLeft, Home } from 'lucide-react';
import avgOfficialLogo from '../../../assets/avg-one-official-logo.png';
import { AppModuleId } from '../AppLauncherModal';
import { HeaderNavMenu } from './HeaderNavMenu';

export interface AppsHeaderProps {
  activeSubTitle: string;
  onBack: () => void;
  onSelectModule: (module: AppModuleId) => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const AppsHeader: React.FC<AppsHeaderProps> = ({
  activeSubTitle,
  onBack,
  onSelectModule,
  renderUserAuthButton
}) => {
  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-xs dark:shadow-none select-none">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Cụm trái: [Icon trở về trang chủ] + [TÊN PHÂN HỆ CĂN TRÁI, CHO TO HƠN] + [Vạch phân cách thứ bậc] + [Cụm đầu mục căn trái] */}
        <div className="flex items-center gap-2.5 sm:gap-4 select-none shrink-0 whitespace-nowrap min-w-0">
          {/* 1. Icon trở về trang chủ */}
          <button
            onClick={() => onSelectModule('home')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#F15A24] dark:hover:text-orange-400 hover:bg-orange-50/80 dark:hover:bg-orange-950/40 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer shrink-0"
            title="Trở về Trang chủ AVG One"
          >
            <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2] group-hover:scale-110 transition-transform text-slate-600 dark:text-slate-300 group-hover:text-[#F15A24] dark:group-hover:text-orange-400" />
          </button>

          {/* 2. TÊN PHÂN HỆ CĂN LỀ TRÁI, CHO TO HƠN (kèm hiệu ứng mũi tên back khi hover/ấn) */}
          {activeSubTitle ? (
            <button
              onClick={onBack}
              className="group text-base sm:text-lg lg:text-[19px] font-black text-[#F15A24] dark:text-orange-400 uppercase tracking-tight cursor-pointer flex items-center hover:text-orange-600 dark:hover:text-orange-300 transition-colors select-none shrink-0 py-1"
              title="Quay lại danh mục ứng dụng"
            >
              <span className="inline-flex items-center overflow-hidden transition-all duration-200 ease-out w-0 opacity-0 -translate-x-1 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-1 group-active:w-5 group-active:opacity-100 group-active:translate-x-0 group-active:mr-1 group-focus-visible:w-5 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:mr-1 shrink-0">
                <ChevronLeft className="w-5 h-5 stroke-[2.8] text-[#F15A24] dark:text-orange-400 shrink-0" />
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

          {/* 3. Vạch phân cách & Khoảng cách phân cấp thứ bậc đối với Tên phân hệ */}
          <div className="h-5 sm:h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 sm:mx-2 shrink-0" />

          {/* 4. Cụm đầu mục căn trái */}
          <HeaderNavMenu
            activeModule="apps"
            onSelectModule={onSelectModule}
            activeSubTitle={activeSubTitle}
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
