import React from 'react';
import {
  Home, FileText, Clock, DollarSign, CreditCard, BarChart3, Plus, Sun, Moon
} from 'lucide-react';

export type FinanceNavTab = 'all' | 'pending' | 'expense' | 'equipment' | 'budget';

export interface FinanceHeaderProps {
  onBack: () => void;
  onGoHome?: () => void;
  financeNavTab: FinanceNavTab;
  onSelectFinanceTab: (tab: FinanceNavTab) => void;
  requestsCount?: number;
  pendingCount?: number;
  onCreateRequest?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const FinanceHeader: React.FC<FinanceHeaderProps> = ({
  onBack,
  onGoHome,
  financeNavTab,
  onSelectFinanceTab,
  requestsCount = 5,
  pendingCount = 2,
  onCreateRequest,
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

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ ] + [ Các đầu mục nghiệp vụ ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ TÀI CHÍNH ] - Đồng bộ chuẩn khoảng cách 10px (gap-2.5) */}
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6 lg:mr-8">
            {/* Icon Trang chủ: Bấm để quay về Trang chủ AVG One */}
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            {/* Tên phân hệ: Chữ to hơn, màu cam, căn thẳng hàng 100% */}
            <button
              onClick={onBack}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Quay lại Trang chủ"
            >
              TÀI CHÍNH
            </button>
          </div>

          {/* BỘ ĐẦU MỤC QUẢN LÝ TÀI CHÍNH & PHÊ DUYỆT: THIẾT KẾ DẠNG CÁC HỘP HIỆN ĐẠI */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'all' as const, label: 'Tất cả đề xuất', count: requestsCount, icon: FileText },
              { id: 'pending' as const, label: 'Chờ duyệt', count: pendingCount, icon: Clock },
              { id: 'expense' as const, label: 'Tạm ứng & Chi', icon: DollarSign },
              { id: 'equipment' as const, label: 'Trang thiết bị', icon: CreditCard },
              { id: 'budget' as const, label: 'Ngân sách', icon: BarChart3 },
            ].map((tab) => {
              const isActive = financeNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectFinanceTab(tab.id)}
                  className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                      : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <IconComponent className="w-4 h-4 shrink-0 stroke-[2.2]" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200/90 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Nút Tạo đề xuất nhanh ngay trên Header */}
          {onCreateRequest && (
            <button
              onClick={onCreateRequest}
              className="hidden lg:flex h-8 sm:h-8.5 px-3 sm:px-3.5 ml-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-[13px] items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
              title="Tạo đề xuất chi tiêu & phê duyệt mới"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.4] shrink-0" />
              <span>+ Tạo đề xuất</span>
            </button>
          )}
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
