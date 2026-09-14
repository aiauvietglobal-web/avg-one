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
      <div className="w-full px-3 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
        {/* Cụm trái: [Icon Trang Chủ] + [Tên phân hệ CHUYỂN ĐỔI TRỰC TIẾP (to hơn, căn lề trái)] + [Cụm đầu mục điều hướng căn trái (giữ khoảng cách)] */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 min-w-0">
          {/* Tên phân hệ + Icon Trang chủ */}
          <div className="flex items-center gap-2 select-none shrink-0 whitespace-nowrap">
            {activeSubTitle ? (
              <>
                {/* 3. Icon trang chủ bên trái tên phân hệ */}
                <button
                  onClick={() => onSelectModule('home')}
                  className="w-8 h-8 rounded-lg text-slate-500 hover:text-[#F15A24] dark:text-slate-400 dark:hover:text-orange-400 hover:bg-orange-50/80 dark:hover:bg-orange-950/40 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                  title="Về Trang chủ AVG One"
                >
                  <Home className="w-4 h-4 stroke-[2.2]" />
                </button>

                {/* 2. Chữ phân hệ: CHUYỂN ĐỔI TRỰC TIẾP CHO TO HƠN, CĂN LỀ TRÁI */}
                <button
                  onClick={onBack}
                  className="h-8 group text-sm sm:text-base font-black text-[#F15A24] dark:text-orange-400 uppercase tracking-wide cursor-pointer flex items-center hover:text-orange-600 dark:hover:text-orange-300 transition-colors select-none shrink-0"
                  title="Quay lại danh mục ứng dụng"
                >
                  <span className="inline-flex items-center overflow-hidden transition-all duration-200 ease-out w-0 opacity-0 -translate-x-1 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-1 group-active:w-4 group-active:opacity-100 group-active:translate-x-0 group-active:mr-1 group-focus-visible:w-4 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:mr-1 shrink-0">
                    <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.8] text-[#F15A24] dark:text-orange-400 shrink-0" />
                  </span>
                  <span className="whitespace-nowrap font-black leading-none">{activeSubTitle}</span>
                </button>
              </>
            ) : (
              <img
                src={avgOfficialLogo}
                alt="AVG One Official Logo"
                className="h-7 object-contain cursor-pointer pointer-events-auto shrink-0"
                onClick={() => onSelectModule('home')}
                title="Trang chủ AVG One"
              />
            )}
          </div>

          {/* 4. Cụm đầu mục căn trái theo tên phân hệ (cần giữ khoảng cách) */}
          <div className="flex items-center pl-2 sm:pl-4 shrink-0">
            <HeaderNavMenu
              activeModule="apps"
              onSelectModule={onSelectModule}
              activeSubTitle={activeSubTitle}
            />
          </div>
        </div>

        {/* Right: Nút Đăng Nhập */}
        <div className="flex items-center shrink-0 whitespace-nowrap">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
