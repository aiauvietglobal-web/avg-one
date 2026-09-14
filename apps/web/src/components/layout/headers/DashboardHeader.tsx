import React from 'react';
import { Home } from 'lucide-react';

export type DashboardNavTab = 'overview' | 'rnd' | 'departments' | 'infrastructure';

export interface DashboardHeaderProps {
  onBack: () => void;
  onGoHome?: () => void;
  dashboardNavTab?: DashboardNavTab;
  onSelectDashboardTab?: (tab: DashboardNavTab) => void;
  onExportReport?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBack,
  onGoHome,
  dashboardNavTab = 'overview',
  onSelectDashboardTab,
  renderUserAuthButton
}) => {
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  const handleTabClick = (tab: DashboardNavTab) => {
    if (onSelectDashboardTab) onSelectDashboardTab(tab);
    window.dispatchEvent(new CustomEvent('dashboard_tab_change', { detail: tab }));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ 🏠 Trang chủ ] + [ BÁO CÁO QUẢN TRỊ ] + [ Tabs đầu mục: Bỏ hộp chỉ để chữ ] */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 select-none shrink-0 whitespace-nowrap">
          {/* Icon Trang chủ: Bấm để quay về Trang chủ AVG One */}
          <button
            onClick={handleGoHome}
            className="w-9 h-9 sm:w-10 sm:h-10 -ml-1 rounded-xl flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Về Trang chủ AVG One"
          >
            <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
          </button>

          {/* Tên phân hệ: Bỏ hộp chỉ để chữ (chữ to hơn, màu cam, căn thẳng hàng 100%) */}
          <button
            onClick={onBack}
            className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none mr-1 sm:mr-2"
            title="Quay lại Kho ứng dụng"
          >
            BÁO CÁO QUẢN TRỊ
          </button>

          {/* BỘ ĐẦU MỤC QUẢN LÝ RIÊNG BIỆT: BỎ HỘP CHỈ ĐỂ CHỮ */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'overview' as const, label: 'Tổng quan C-Suite' },
              { id: 'rnd' as const, label: 'Tiến độ R&D' },
              { id: 'departments' as const, label: 'Phòng ban' },
              { id: 'infrastructure' as const, label: 'Hạ tầng 20 Users' },
            ].map((tab) => {
              const isActive = dashboardNavTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-2 sm:px-2.5 py-1.5 text-sm sm:text-[15px] cursor-pointer select-none tracking-normal transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                      : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                  }`}
                >
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10">{tab.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Đăng Nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
