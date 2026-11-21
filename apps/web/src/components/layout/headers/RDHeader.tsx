import React, { useState, useEffect } from 'react';
import { Home, Sun, Moon, Layers, ClipboardCheck } from 'lucide-react';

export type RDNavTab = 'overview' | 'research' | 'design' | 'orders';

export interface RDHeaderProps {
  activeSubTitle?: string;
  onBack: () => void;
  onGoHome?: () => void;
  rdNavTab?: RDNavTab;
  onSelectRDTab?: (tab: RDNavTab) => void;
  ordersCount?: number;
  onCreateProject?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const RDHeader: React.FC<RDHeaderProps> = ({
  activeSubTitle = '',
  onBack,
  onGoHome,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  const [researchTab, setResearchTab] = useState<'4steps' | '13sop'>('4steps');

  useEffect(() => {
    const handleResearchTabSync = (e: any) => {
      if (e.detail && (e.detail === '4steps' || e.detail === '13sop')) {
        setResearchTab(e.detail);
      }
    };
    window.addEventListener('research_workflow_tab_sync', handleResearchTabSync);
    return () => window.removeEventListener('research_workflow_tab_sync', handleResearchTabSync);
  }, []);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  const isResearchView = activeSubTitle.includes('3.1') || activeSubTitle.includes('NGHIÊN CỨU');

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ ] + [ Các tab đầu mục nghiệp vụ ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ Tên phân hệ ] */}
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6 lg:mr-8">
            {/* Icon Trang chủ: Bấm để quay về Trang chủ AVG One */}
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            {/* Tên phân hệ: Chữ cam đậm chuẩn phong cách AVG One */}
            <button
              onClick={onBack}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title={isResearchView ? "Quay lại Trung tâm Nghiên cứu & Sáng tạo" : "Quay lại Trang chủ AVG One"}
            >
              {isResearchView ? '3.1 – NGHIÊN CỨU' : 'NGHIÊN CỨU & SÁNG TẠO'}
            </button>
          </div>

          {/* CỤM TABS ĐIỀU HƯỚNG THEO NGỮ CẢNH: CHỈ HIỂN THỊ KHI VÀO GIAO DIỆN CON */}
          {isResearchView && (
            /* TRƯỜNG HỢP 1: ĐANG Ở GIAO DIỆN ĐỘC LẬP 3.1 - NGHIÊN CỨU */
            <div className="flex items-center gap-1 sm:gap-1.5 select-none shrink-0 whitespace-nowrap">
              {/* Tab 1: Quy Trình 4 Bước Đơn Hàng */}
              <button
                onClick={() => {
                  setResearchTab('4steps');
                  window.dispatchEvent(new CustomEvent('research_workflow_tab_change', { detail: '4steps' }));
                }}
                className={`group h-8.5 sm:h-9 px-3.5 sm:px-4 rounded-full text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-colors duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 border-none ${
                  researchTab === '4steps'
                    ? 'bg-[#EEEEEE] dark:bg-slate-800 font-bold text-[#1F1F1F] dark:text-white shadow-none'
                    : 'bg-transparent hover:bg-[#EEEEEE] dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200 hover:text-[#1F1F1F] dark:hover:text-white'
                }`}
              >
                <ClipboardCheck className={`w-4 h-4 shrink-0 transition-colors ${
                  researchTab === '4steps'
                    ? 'text-emerald-600 dark:text-emerald-400 stroke-[2.2]'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-[#1F1F1F] dark:group-hover:text-white stroke-[1.8]'
                }`} />
                <span>Quy Trình 4 Bước Đơn Hàng</span>
              </button>

              {/* Tab 2: Chi Tiết Luồng 13 Bước SOP */}
              <button
                onClick={() => {
                  setResearchTab('13sop');
                  window.dispatchEvent(new CustomEvent('research_workflow_tab_change', { detail: '13sop' }));
                }}
                className={`group h-8.5 sm:h-9 px-3.5 sm:px-4 rounded-full text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-colors duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 border-none ${
                  researchTab === '13sop'
                    ? 'bg-[#EEEEEE] dark:bg-slate-800 font-bold text-[#1F1F1F] dark:text-white shadow-none'
                    : 'bg-transparent hover:bg-[#EEEEEE] dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200 hover:text-[#1F1F1F] dark:hover:text-white'
                }`}
              >
                <Layers className={`w-4 h-4 shrink-0 transition-colors ${
                  researchTab === '13sop'
                    ? 'text-emerald-600 dark:text-emerald-400 stroke-[2.2]'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-[#1F1F1F] dark:group-hover:text-white stroke-[1.8]'
                }`} />
                <span>Chi Tiết Luồng 13 Bước SOP</span>
              </button>
            </div>
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
