import React, { useState, useEffect } from 'react';
import {
  Home, LayoutGrid, Table, Plus
} from 'lucide-react';

export type CalendarNavTab = 'talk' | 'work';
export type CalendarViewMode = 'day' | 'month' | 'table';

export interface CalendarHeaderProps {
  onBack?: () => void;
  onGoHome?: () => void;
  calendarNavTab: CalendarNavTab;
  onSelectCalendarTab: (tab: CalendarNavTab) => void;
  onRefreshSheet?: () => void;
  isRefreshing?: boolean;
  totalTalksCount?: number;
  totalWorkTripsCount?: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  onGoHome,
  onSelectCalendarTab,
  renderUserAuthButton
}) => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day');

  useEffect(() => {
    const handleViewModeSync = (e: any) => {
      if (e.detail && ['day', 'month', 'table'].includes(e.detail)) {
        setViewMode(e.detail as CalendarViewMode);
      }
    };
    window.addEventListener('calendar_viewmode_sync', handleViewModeSync);
    return () => window.removeEventListener('calendar_viewmode_sync', handleViewModeSync);
  }, []);

  const handleChangeViewMode = (mode: CalendarViewMode) => {
    setViewMode(mode);
    window.dispatchEvent(new CustomEvent('calendar_viewmode_change', { detail: mode }));
  };

  const handleToggleDM = () => {
    const nextMode: CalendarViewMode = viewMode === 'day' ? 'month' : 'day';
    setViewMode(nextMode);
    window.dispatchEvent(new CustomEvent('calendar_viewmode_toggle_dm', { detail: nextMode }));
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-b border-slate-200/80 dark:border-slate-800 select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ LỊCH ] + [ Chế độ xem Thẻ / Lưới + D/M ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ LỊCH ] */}
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6">
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            <button
              onClick={() => onSelectCalendarTab('talk')}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Phân hệ Lịch"
            >
              <span>LỊCH</span>
            </button>
          </div>

          {/* CHẾ ĐỘ XEM (THẺ / LƯỚI + D/M) TRÊN THANH HEADER PHÂN HỆ LỊCH (PHONG CÁCH PILL XÁM NHẠT TỐI GIẢN) */}
          <div className="flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-5 border-l border-slate-200 dark:border-slate-700/80 shrink-0">
            <button
              type="button"
              onClick={() => handleChangeViewMode('day')}
              className={`h-8.5 sm:h-9 px-4 rounded-full text-xs sm:text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer ${
                viewMode === 'day' || viewMode === 'month'
                  ? 'bg-[#EBECEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                  : 'bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-medium'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Thẻ</span>
            </button>

            <button
              type="button"
              onClick={() => handleChangeViewMode('table')}
              className={`h-8.5 sm:h-9 px-4 rounded-full text-xs sm:text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#EBECEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                  : 'bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-medium'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Lưới</span>
            </button>

            {/* Nút D/M Toggle Pill */}
            <button
              type="button"
              onClick={handleToggleDM}
              title={viewMode === 'day' ? 'Chế độ D: Đang xem theo ngày - Click để chuyển sang Chế độ M (Tháng)' : 'Chế độ M: Đang xem theo tháng - Click để chuyển sang Chế độ D (Ngày)'}
              className="h-8.5 sm:h-9 px-3.5 rounded-full bg-[#EBECEE] hover:bg-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-[13px] font-semibold flex items-center justify-center cursor-pointer transition select-none"
            >
              <span>{viewMode === 'day' ? 'Chế độ D' : 'Chế độ M'}</span>
            </button>

            {/* Nút Cập nhật lịch ngay trên thanh Header */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('calendar_open_add_modal'))}
              title="Cập nhật lịch trao đổi mới"
              className="h-8.5 sm:h-9 px-4 rounded-full bg-[#EBECEE] hover:bg-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-[13px] font-semibold transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Cập nhật lịch</span>
            </button>
          </div>
        </div>

        {/* Cụm phải: Đăng nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
