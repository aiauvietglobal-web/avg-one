import React from 'react';
import {
  Home, ChevronLeft, BarChart3, TrendingUp, Layers, ShieldCheck, Download, Sun, Moon
} from 'lucide-react';

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
  onExportReport,
  darkMode,
  onToggleDarkMode,
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
        {/* Cụm trái: [ 🏠 Trang chủ ] + [ BÁO CÁO QUẢN TRỊ ] + [ Tabs nghiệp vụ ] + [ Xuất báo cáo ] */}
        <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
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
            className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
            title="Quay lại Kho ứng dụng"
          >
            BÁO CÁO QUẢN TRỊ
          </button>

          {/* BỘ ĐẦU MỤC QUẢN LÝ RIÊNG BIỆT CỦA BÁO CÁO QUẢN TRỊ */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
            {[
              { id: 'overview' as const, label: 'Tổng quan C-Suite', icon: BarChart3 },
              { id: 'rnd' as const, label: 'Tiến độ R&D', icon: TrendingUp },
              { id: 'departments' as const, label: 'Phòng ban', icon: Layers },
              { id: 'infrastructure' as const, label: 'Hạ tầng 20 Users', icon: ShieldCheck },
            ].map((tab) => {
              const isActive = dashboardNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`h-7 px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Nút Xuất báo cáo nhanh */}
          <button
            onClick={() => {
              if (onExportReport) onExportReport();
              window.dispatchEvent(new CustomEvent('dashboard_export'));
            }}
            className="hidden md:flex h-9 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0"
            title="Xuất file báo cáo PDF / Excel"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Xuất báo cáo</span>
          </button>
        </div>

        {/* Right: Dark Mode Toggle + Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-center text-slate-600 dark:text-amber-400 transition-colors shadow-2xs cursor-pointer"
              title={darkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
