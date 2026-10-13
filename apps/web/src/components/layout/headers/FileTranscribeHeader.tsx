import React, { useState, useEffect } from 'react';
import {
  Home, UploadCloud, FileText, Settings,
  Sparkles, CheckCircle2, ChevronRight, Waves, Activity,
  SlidersHorizontal, CheckSquare, BarChart3, Download, Plus
} from 'lucide-react';

export type FileTranscribeNavTab = 'editor' | 'minutes' | 'analytics' | 'settings' | 'home' | 'library' | 'utilities' | 'upload';

export interface FileTranscribeHeaderProps {
  onBack: () => void;
  onGoHome?: () => void;
  activeNavTab?: FileTranscribeNavTab;
  onSelectNavTab?: (tab: FileTranscribeNavTab) => void;
  renderUserAuthButton: () => React.ReactNode;
  hasActiveFile?: boolean;
}

export const FileTranscribeHeader: React.FC<FileTranscribeHeaderProps> = ({
  onBack,
  onGoHome,
  activeNavTab = 'editor',
  onSelectNavTab,
  renderUserAuthButton,
  hasActiveFile = true
}) => {
  const [currentTab, setCurrentTab] = useState<FileTranscribeNavTab>(activeNavTab);

  useEffect(() => {
    setCurrentTab(activeNavTab);
  }, [activeNavTab]);

  useEffect(() => {
    const handleTabSync = (e: any) => {
      if (e.detail) setCurrentTab(e.detail);
    };
    window.addEventListener('file_transcribe_tab_sync', handleTabSync);
    return () => window.removeEventListener('file_transcribe_tab_sync', handleTabSync);
  }, []);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  const handleTabClick = (tab: FileTranscribeNavTab) => {
    setCurrentTab(tab);
    if (onSelectNavTab) onSelectNavTab(tab);
    window.dispatchEvent(new CustomEvent('file_transcribe_tab_change', { detail: tab }));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-b border-slate-200/80 dark:border-slate-800 select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ ] + [ Các tabs chế độ Studio ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ CHUYỂN ĐỔI VĂN BẢN ] */}
          <div className="flex items-center gap-2.5 shrink-0 mr-3 sm:mr-5 lg:mr-6">
            {/* Icon Trang chủ */}
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            {/* Tên phân hệ */}
            <button
              onClick={onBack}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Quay lại Kho ứng dụng"
            >
              <span>CHUYỂN ĐỔI VĂN BẢN</span>
            </button>
          </div>

          {/* BỘ TAB ĐIỀU HƯỚNG STUDIO TIÊN TIẾN ĐỒNG BỘ 100% CÁC PHÂN HỆ KHÁC */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'editor' as const, label: 'Studio Biên soạn', icon: Waves },
              { id: 'minutes' as const, label: 'Biên bản & Nhiệm vụ', icon: CheckSquare },
              { id: 'analytics' as const, label: 'Phân tích Diễn giả', icon: BarChart3 },
              { id: 'settings' as const, label: 'Cài đặt AI', icon: SlidersHorizontal },
            ].map((tab) => {
              const isActive =
                tab.id === 'editor'
                  ? (currentTab === 'editor' || currentTab === 'home' || currentTab === 'upload')
                  : tab.id === 'minutes'
                  ? (currentTab === 'minutes' || currentTab === 'library')
                  : (currentTab === tab.id);

              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#00A8E8] text-white shadow-xs font-black border border-[#00A8E8]'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white stroke-[2.5]' : 'text-slate-500 dark:text-slate-400 stroke-[2]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cụm phải: Thao tác nhanh (AI Copilot, Xuất bản) + Nút Đăng Nhập đồng bộ */}
        <div className="flex items-center gap-2 select-none shrink-0 whitespace-nowrap">

          {/* Nút Trợ lý AI Q&A */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('file_transcribe_toggle_ai_copilot'))}
            className="h-8 sm:h-8.5 px-3 rounded-xl text-xs font-bold bg-[#FAF5FF] hover:bg-purple-100/80 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-2xs flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Mở Trợ lý AI hỏi đáp trên nội dung ghi âm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 stroke-[2.2]" />
            <span className="hidden sm:inline">Trợ lý AI</span>
          </button>

          {/* Nút Xuất bản tài liệu */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('file_transcribe_open_export'))}
            className="h-8 sm:h-8.5 px-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs shadow-emerald-500/25 border border-emerald-600 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Xuất file Word, PDF, SRT hoặc Sao chép"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.4]" />
            <span className="hidden sm:inline">Xuất bản</span>
          </button>

          {/* Nút Đăng Nhập đồng bộ tiêu chuẩn AVG One */}
          <div className="ml-1 shrink-0">
            {renderUserAuthButton()}
          </div>
        </div>
      </div>
    </header>
  );
};
