import React from 'react';
import {
  ChevronLeft, ClipboardCheck, Layers, Box, Search, Sun, Moon
} from 'lucide-react';

export interface DesignHeaderProps {
  activeSubTitle?: string;
  onBack: () => void;
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
  designNavTab,
  onSelectDesignTab,
  designSearch,
  onDesignSearchChange,
  designCounts,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-xs select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Cụm trái: [ < 3.2 – THIẾT KẾ ] + [ 📋 Đơn hàng 3 | 📚 Phẩm 8 | 📦 Tồn 8 ] + [ 🔍 Tìm bản vẽ... Ctrl K ] */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {/* Nút quay lại kèm tiêu đề dạng Pill cao cấp: < 3.2 – THIẾT KẾ */}
          <button
            onClick={onBack}
            className="h-9 px-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/90 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60 font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer shrink-0"
            title="Quay lại danh mục phân hệ"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.8] text-[#F15A24] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="whitespace-nowrap font-black">{activeSubTitle || '3.2 – THIẾT KẾ'}</span>
          </button>

          {/* BỘ 3 ĐẦU MỤC CHÍNH DẠNG CAPSULE PILL ĐỒNG BỘ NGUYÊN BẢN (Đơn hàng, Phẩm, Tồn) */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
            {[
              { id: 'orders' as const, label: 'Đơn hàng', count: designCounts.orders, icon: ClipboardCheck },
              { id: 'products' as const, label: 'Phẩm', count: designCounts.products, icon: Layers },
              { id: 'inventory' as const, label: 'Tồn', count: designCounts.inventory, icon: Box },
            ].map((tab) => {
              const isActive = designNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectDesignTab(tab.id)}
                  className={`h-7 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Thanh tìm kiếm nhanh tích hợp chuẩn chiều cao h-9 */}
          <div className="relative flex items-center shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="design-quick-search-input"
              type="text"
              value={designSearch}
              onChange={(e) => onDesignSearchChange(e.target.value)}
              placeholder="Tìm bản vẽ..."
              className="w-36 sm:w-48 focus:w-60 pl-8.5 pr-12 h-9 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-white focus:bg-white dark:focus:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/30 focus:border-[#F15A24] shadow-2xs transition-all duration-200 shrink-0"
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
