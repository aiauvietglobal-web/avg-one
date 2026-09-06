import React from 'react';
import { Plus, Download, Upload, Filter, LayoutGrid, List, Calendar as CalendarIcon, BarChart2, ChevronRight, SlidersHorizontal, Home } from 'lucide-react';

interface OdooControlPanelProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
  viewMode?: 'kanban' | 'list' | 'calendar' | 'pivot';
  onViewModeChange?: (mode: 'kanban' | 'list' | 'calendar' | 'pivot') => void;
  onCreateNew?: () => void;
  onExport?: () => void;
  onFilterClick?: () => void;
  onHomeClick?: () => void;
}

export const OdooControlPanel: React.FC<OdooControlPanelProps> = ({
  title,
  subtitle,
  breadcrumb = ['Platform AVG One'],
  viewMode = 'kanban',
  onViewModeChange,
  onCreateNew,
  onExport,
  onFilterClick,
  onHomeClick
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 sm:py-4 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Left: Action Buttons + Breadcrumb & Title */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Home Button */}
          {onHomeClick && (
            <button
              onClick={onHomeClick}
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#714B67] hover:text-white text-slate-700 dark:text-slate-200 font-bold rounded text-xs border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5 shadow-xs"
              title="Về Màn hình Trang Chủ Tất cả Ứng dụng"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>
          )}

          {/* Action Buttons (Odoo Purple Style) */}
          <div className="flex items-center gap-2">
            {onCreateNew && (
              <button
                onClick={onCreateNew}
                className="px-3.5 py-1.5 bg-[#714B67] hover:bg-[#5a3a52] text-white font-bold rounded text-xs shadow-xs transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Mới</span>
              </button>
            )}
            {onExport && (
              <button
                onClick={onExport}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded text-xs border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Xuất dữ liệu</span>
              </button>
            )}
          </div>

          <div className="h-5 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

          {/* Odoo Breadcrumbs & Title */}
          <div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
            <h1 className="text-base font-extrabold text-[#333333] dark:text-slate-100 tracking-tight flex items-center gap-2">
              {title}
              {subtitle && (
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  ({subtitle})
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Right: Filters & Odoo View Switcher Icons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Quick Filter button */}
          <button
            onClick={onFilterClick}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs border border-slate-300 dark:border-slate-700 font-medium transition flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#714B67] dark:text-purple-400" />
            <span>Bộ lọc & Nhóm theo</span>
          </button>

          {/* Odoo View Switcher Buttons */}
          {onViewModeChange && (
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => onViewModeChange('kanban')}
                className={`p-1.5 rounded text-xs transition ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-slate-700 text-[#714B67] dark:text-purple-300 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Xem dạng Thẻ (Kanban View)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded text-xs transition ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-[#714B67] dark:text-purple-300 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Xem dạng Danh sách (List View)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('calendar')}
                className={`p-1.5 rounded text-xs transition ${
                  viewMode === 'calendar'
                    ? 'bg-white dark:bg-slate-700 text-[#714B67] dark:text-purple-300 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Xem dạng Lịch (Calendar View)"
              >
                <CalendarIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('pivot')}
                className={`p-1.5 rounded text-xs transition ${
                  viewMode === 'pivot'
                    ? 'bg-white dark:bg-slate-700 text-[#714B67] dark:text-purple-300 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Xem dạng Biểu đồ (Pivot Chart View)"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
