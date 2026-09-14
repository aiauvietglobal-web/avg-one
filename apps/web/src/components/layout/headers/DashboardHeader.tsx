import React from 'react';
import {
  ChevronLeft, BarChart3, TrendingUp, Layers, ShieldCheck, Download, Sun, Moon
} from 'lucide-react';

export type DashboardNavTab = 'overview' | 'rnd' | 'departments' | 'infrastructure';

export interface DashboardHeaderProps {
  onBack: () => void;
  dashboardNavTab?: DashboardNavTab;
  onSelectDashboardTab?: (tab: DashboardNavTab) => void;
  onExportReport?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBack,
  dashboardNavTab = 'overview',
  onSelectDashboardTab,
  onExportReport,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  const handleTabClick = (tab: DashboardNavTab) => {
    if (onSelectDashboardTab) onSelectDashboardTab(tab);
    window.dispatchEvent(new CustomEvent('dashboard_tab_change', { detail: tab }));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ < BÁO CÁO QUẢN TRỊ ] + [ Tabs nghiệp vụ ] + [ Xuất báo cáo ] */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {/* Nút quay lại kèm tiêu đề dạng Pill cao cấp */}
          <button
            onClick={onBack}
            className="h-9 px-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/90 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60 font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer shrink-0"
            title="Quay lại Kho ứng dụng"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.8] text-[#F15A24] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="whitespace-nowrap font-black">BÁO CÁO QUẢN TRỊ</span>
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
