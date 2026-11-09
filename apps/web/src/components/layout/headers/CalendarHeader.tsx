import React from 'react';
import {
  Home, MessageSquare, MapPin, RefreshCw, ExternalLink, Sun, Moon, Calendar as CalendarIcon, FileSpreadsheet
} from 'lucide-react';
import { GOOGLE_SHEET_EDIT_URL } from '../../../services/googleSheetSync';

export type CalendarNavTab = 'talk' | 'work';

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
  onBack,
  onGoHome,
  calendarNavTab,
  onSelectCalendarTab,
  onRefreshSheet,
  isRefreshing = false,
  totalTalksCount,
  totalWorkTripsCount,
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

  const handleRefresh = () => {
    if (onRefreshSheet) {
      onRefreshSheet();
    } else {
      window.dispatchEvent(new CustomEvent('calendar_refresh_events'));
    }
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-b border-slate-200/80 dark:border-slate-800 select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ LỊCH ] + [ Các tab phân hệ độc lập ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ LỊCH ] */}
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6 lg:mr-8">
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            <button
              onClick={() => onSelectCalendarTab('talk')}
              className="h-9 sm:h-10 flex items-center gap-2 text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Phân hệ Lịch độc lập"
            >
              <CalendarIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5]" />
              <span>LỊCH</span>
            </button>
          </div>

          {/* BỘ ĐẦU MỤC TÁC NGHIỆP LỊCH: THIẾT KẾ DẠNG HỘP ĐỘC LẬP */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            {[
              {
                id: 'talk' as const,
                label: 'LỊCH TRAO ĐỔI',
                badgeText: 'Sheet Real-time',
                count: totalTalksCount,
                icon: MessageSquare
              },
              {
                id: 'work' as const,
                label: 'LỊCH CÔNG TÁC',
                badgeText: 'Thực địa',
                count: totalWorkTripsCount,
                icon: MapPin
              }
            ].map((tab) => {
              const isActive = calendarNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCalendarTab(tab.id)}
                  className={`h-8 sm:h-9 px-3 sm:px-4 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                      : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <IconComponent className="w-4 h-4 shrink-0 stroke-[2.2]" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
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
        </div>

        {/* Cụm phải: Đồng bộ Sheet + Mở Sheet Google + Đổi theme + Đăng nhập */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
          {/* Nút Đồng bộ Sheet Real-time */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-xl border border-sky-200 dark:border-sky-800 text-[#0284C7] dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs ${
              isRefreshing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            title="Đồng bộ lại dữ liệu trực tiếp từ sheet LỊCH TRAO ĐỔI"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Đồng Bộ Sheet</span>
          </button>

          {/* Nút Mở Google Sheet trực tiếp */}
          <a
            href={GOOGLE_SHEET_EDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
            title="Mở Google Sheet LỊCH TRAO ĐỔI trên trình duyệt"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden lg:inline">Google Sheet</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Nút Chuyển đổi Dark / Light Mode */}
          <button
            onClick={onToggleDarkMode}
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all cursor-pointer shadow-2xs"
            title={darkMode ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Nút Đăng nhập / Avatar */}
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
