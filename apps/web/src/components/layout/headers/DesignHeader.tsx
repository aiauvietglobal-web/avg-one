import React from 'react';
import {
  Home, ClipboardCheck, Layers, Box, Search, Sun, Moon
} from 'lucide-react';

export interface DesignHeaderProps {
  activeSubTitle?: string;
  onBack: () => void;
  onGoHome?: () => void;
  designNavTab: 'orders' | 'products' | 'inventory';
  onSelectDesignTab: (tab: 'orders' | 'products' | 'inventory') => void;
  designSearch: string;
  onDesignSearchChange: (val: string) => void;
  designCounts: { orders: number; products: number; inventory: number };
  darkMode: boolean;
  onToggleDarkMode: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const DesignHeader: React.FC<DesignHeaderProps> = ({
  activeSubTitle = '3.2 – THIẾT KẾ',
  onBack,
  onGoHome,
  designNavTab,
  onSelectDesignTab,
  designSearch,
  onDesignSearchChange,
  designCounts,
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
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ ] + [ Các đầu mục nghiệp vụ ] + [ 🔍 Tìm bản vẽ ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ 3.2 – THIẾT KẾ ] - Đồng bộ chuẩn khoảng cách 10px (gap-2.5) */}
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
              title="Quay lại danh mục phân hệ"
            >
              {activeSubTitle || '3.2 – THIẾT KẾ'}
            </button>
          </div>

          {/* BỘ ĐẦU MỤC QUẢN LÝ THIẾT KẾ: THIẾT KẾ DẠNG CÁC HỘP HIỆN ĐẠI */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap mr-3 sm:mr-4">
            {[
              { id: 'orders' as const, label: 'Kho đầu vào', count: designCounts.orders, icon: ClipboardCheck },
              { id: 'products' as const, label: 'Kho thành phẩm', count: designCounts.products, icon: Layers },
              { id: 'inventory' as const, label: 'Kho lưu chuyển', count: designCounts.inventory, icon: Box },
            ].map((tab) => {
              const isActive = designNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectDesignTab(tab.id)}
                  className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                      : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <IconComponent className="w-4 h-4 shrink-0 stroke-[2.2]" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-200/90 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Thanh tìm kiếm nhanh tích hợp chuẩn chiều cao h-8 sm:h-8.5 */}
          <div className="relative flex items-center shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="design-quick-search-input"
              type="text"
              value={designSearch}
              onChange={(e) => onDesignSearchChange(e.target.value)}
              placeholder="Tìm bản vẽ..."
              className="w-36 sm:w-48 focus:w-60 pl-8.5 pr-12 h-8 sm:h-8.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-white focus:bg-white dark:focus:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/30 focus:border-[#F15A24] shadow-2xs transition-all duration-200 shrink-0"
            />
            <kbd className="absolute right-2 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md pointer-events-none shadow-2xs">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right: Dark Mode Toggle + Hộp Đăng Nhập / Profile Avatar */}
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
