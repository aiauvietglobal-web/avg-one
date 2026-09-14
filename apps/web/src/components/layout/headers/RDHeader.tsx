import React from 'react';
import {
  ChevronLeft, Compass, Cpu, Box, ClipboardCheck, Plus, Sun, Moon
} from 'lucide-react';

export type RDNavTab = 'overview' | 'research' | 'design' | 'orders';

export interface RDHeaderProps {
  onBack: () => void;
  rdNavTab: RDNavTab;
  onSelectRDTab: (tab: RDNavTab) => void;
  ordersCount?: number;
  onCreateProject?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const RDHeader: React.FC<RDHeaderProps> = ({
  onBack,
  rdNavTab,
  onSelectRDTab,
  ordersCount = 3,
  onCreateProject,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ < R&D ] + [ Tabs đầu mục ] + [ + Dự án R&D ] */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {/* Nút quay lại kèm tiêu đề dạng Pill cao cấp: < R&D */}
          <button
            onClick={onBack}
            className="h-9 px-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/90 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60 font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer shrink-0"
            title="Quay lại Trang chủ"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.8] text-[#F15A24] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="whitespace-nowrap font-black">R&D</span>
          </button>

          {/* BỘ ĐẦU MỤC QUẢN LÝ R&D (13 SOP, 3.1 Nghiên cứu, 3.2 Thiết kế, Đơn hàng R&D) */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
            {[
              { id: 'overview' as const, label: '13 Bước SOP', icon: Compass },
              { id: 'research' as const, label: '3.1 – Nghiên cứu', icon: Cpu },
              { id: 'design' as const, label: '3.2 – Thiết kế', icon: Box },
              { id: 'orders' as const, label: 'Đơn hàng R&D', count: ordersCount, icon: ClipboardCheck },
            ].map((tab) => {
              const isActive = rdNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectRDTab(tab.id)}
                  className={`h-7 px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Nút Khởi tạo dự án R&D nhanh ngay trên Header */}
          <button
            onClick={onCreateProject}
            className="hidden md:flex h-9 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0"
            title="Khởi tạo dự án R&D mới"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>+ Dự án R&D</span>
          </button>
        </div>

        {/* Right: Dark Mode Toggle + Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-center text-slate-600 dark:text-amber-400 transition-colors shadow-2xs cursor-pointer"
            title={darkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
