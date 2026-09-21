import React, { useState, useEffect } from 'react';
import {
  Home, UploadCloud, FileText, FolderOpen, Settings,
  Sparkles, CheckCircle2, ChevronRight, Music, Activity, SlidersHorizontal
} from 'lucide-react';

export type FileTranscribeNavTab = 'library' | 'utilities' | 'settings' | 'upload' | 'editor';

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
  activeNavTab = 'library',
  onSelectNavTab,
  renderUserAuthButton,
  hasActiveFile = false
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
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ ] + [ Các đầu mục nghiệp vụ ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ CHUYỂN ĐỔI VĂN BẢN ] */}
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6 lg:mr-8">
            {/* Icon Trang chủ: Bấm để quay về Trang chủ AVG One */}
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            {/* Tên phân hệ: Chữ màu cam, chuẩn kiểu AVG One */}
            <button
              onClick={onBack}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Quay lại Kho ứng dụng"
            >
              CHUYỂN ĐỔI VĂN BẢN
            </button>
          </div>

          {/* BỘ ĐẦU MỤC QUẢN LÝ CHUYỂN ĐỔI FILE GHI ÂM: THIẾT KẾ DẠNG HỘP HIỆN ĐẠI */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'library' as const, label: 'Kho phẩm', icon: FolderOpen, badge: hasActiveFile ? 'Đang mở' : undefined },
              { id: 'utilities' as const, label: 'Tiện ích', icon: SlidersHorizontal },
              { id: 'settings' as const, label: 'Cài đặt', icon: Settings },
            ].map((tab) => {
              const isActive =
                tab.id === 'library'
                  ? (currentTab === 'library' || currentTab === 'editor')
                  : tab.id === 'utilities'
                  ? (currentTab === 'utilities' || currentTab === 'upload')
                  : (currentTab === 'settings');
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

        {/* Cụm phải: Nút Đăng nhập / Tài khoản */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/80 text-[11px] font-bold text-[#0284C7] dark:text-sky-300">
            <Activity className="w-3.5 h-3.5 text-[#0284C7] animate-pulse" />
            <span>AVG Neural ASR v2.4</span>
          </div>
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
