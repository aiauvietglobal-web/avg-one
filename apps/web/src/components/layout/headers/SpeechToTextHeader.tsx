import React from 'react';
import {
  ChevronLeft, Mic, MessageSquare, Clock, SlidersHorizontal, Zap, Sun, Moon, Radio
} from 'lucide-react';

export type SpeechNavTab = 'chat' | 'history' | 'settings' | 'templates';

export interface SpeechToTextHeaderProps {
  onBack: () => void;
  speechNavTab?: SpeechNavTab;
  onSelectSpeechTab?: (tab: SpeechNavTab) => void;
  isRecording?: boolean;
  onToggleRecording?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const SpeechToTextHeader: React.FC<SpeechToTextHeaderProps> = ({
  onBack,
  speechNavTab = 'chat',
  onSelectSpeechTab,
  isRecording = false,
  onToggleRecording,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  const handleTabClick = (tab: SpeechNavTab) => {
    if (onSelectSpeechTab) onSelectSpeechTab(tab);
    window.dispatchEvent(new CustomEvent('speech_tab_change', { detail: tab }));
  };

  const handleRecordClick = () => {
    if (onToggleRecording) onToggleRecording();
    window.dispatchEvent(new CustomEvent('speech_toggle_recording'));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ < CHUYỂN ĐỔI TRỰC TIẾP ] + [ Tabs đầu mục nghiệp vụ ] + [ Nút Ghi Âm ] */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0 whitespace-nowrap">
          {/* Nút quay lại kèm tiêu đề dạng Pill cao cấp: < CHUYỂN ĐỔI TRỰC TIẾP */}
          <button
            onClick={onBack}
            className="h-9 px-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/90 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60 font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer shrink-0"
            title="Quay lại Kho ứng dụng"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.8] text-[#F15A24] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="whitespace-nowrap font-black">CHUYỂN ĐỔI TRỰC TIẾP</span>
          </button>

          {/* BỘ ĐẦU MỤC QUẢN LÝ RIÊNG BIỆT CỦA CHUYỂN ĐỔI TRỰC TIẾP */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
            {[
              { id: 'chat' as const, label: 'Hội thoại trực tiếp', icon: MessageSquare },
              { id: 'history' as const, label: 'Lịch sử', icon: Clock },
              { id: 'settings' as const, label: 'Tùy chỉnh âm', icon: SlidersHorizontal },
              { id: 'templates' as const, label: 'Phản hồi nhanh', icon: Zap },
            ].map((tab) => {
              const isActive = speechNavTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`h-7 px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Trạng thái hệ thống & Nút Ghi âm nhanh */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse text-emerald-500" />
            <span>Trực tuyến</span>
          </div>

          <button
            onClick={handleRecordClick}
            className={`hidden md:flex h-9 px-3.5 rounded-xl font-black text-xs items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            title={isRecording ? "Dừng ghi âm" : "Bắt đầu chuyển giọng nói"}
          >
            <Mic className="w-3.5 h-3.5 shrink-0" />
            <span>{isRecording ? "Dừng ghi âm" : "Bắt đầu nói"}</span>
          </button>
        </div>

        {/* Right: Dark Mode Toggle + Đăng Nhập */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-center text-slate-600 dark:text-amber-400 transition-colors shadow-2xs cursor-pointer"
              title={darkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
