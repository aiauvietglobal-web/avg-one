import React, { useState, useEffect } from 'react';
import {
  Home, UploadCloud, FileText, Settings,
  Sparkles, CheckCircle2, ChevronRight, Waves, Activity,
  SlidersHorizontal, CheckSquare, BarChart3, Download, Plus,
  Mic, MessageSquare, ShieldCheck, Zap
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
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none gap-2"
              title="Quay lại Kho ứng dụng"
            >
              <span>CHUYỂN ĐỔI VĂN BẢN</span>
              <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800 tracking-wider">
                STUDIO PRO
              </span>
            </button>
          </div>

          {/* BỘ TAB ĐIỀU HƯỚNG STUDIO TIÊN TIẾN */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'editor' as const, label: 'Studio Biên soạn', icon: Waves, badge: 'HD Audio' },
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
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                      : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white stroke-[2.5]' : 'text-slate-500 dark:text-slate-400 stroke-[2]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9.5px] px-1.5 py-0.2 rounded-md font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-[#0284C7]/15 text-[#0284C7] dark:text-sky-400'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cụm phải: Thao tác nhanh (Nạp tệp / Thu âm, AI Copilot, Xuất bản) */}
        <div className="flex items-center gap-2 select-none shrink-0 whitespace-nowrap">
          {/* Nút Nạp tệp / Thu âm mới */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('file_transcribe_open_import'))}
            className="h-8 sm:h-8.5 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-[#0284C7] dark:text-sky-400 border border-sky-200 dark:border-sky-800/80 shadow-2xs flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Nạp tệp âm thanh hoặc thu âm mới"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden md:inline">Nạp tệp / Thu âm</span>
            <span className="md:hidden">Nạp tệp</span>
          </button>

          {/* Nút Trợ lý AI Q&A */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('file_transcribe_toggle_ai_copilot'))}
            className="h-8 sm:h-8.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 shadow-2xs flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Mở Trợ lý AI hỏi đáp trên nội dung ghi âm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 stroke-[2.2]" />
            <span className="hidden sm:inline">Trợ lý AI</span>
          </button>

          {/* Nút Xuất bản tài liệu */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('file_transcribe_open_export'))}
            className="h-8 sm:h-8.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-2xs shadow-emerald-500/25 border border-emerald-500/40 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Xuất file Word, PDF, SRT hoặc Sao chép"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.4]" />
            <span className="hidden sm:inline">Xuất bản</span>
          </button>
        </div>
      </div>
    </header>
  );
};
