import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  ChevronDown,
  Filter,
  Users,
  SlidersHorizontal,
  MessageSquare,
  FolderOpen,
  Settings,
  Pin,
  Sparkles,
  ChevronRight,
  Clock,
  PlusCircle,
  Download,
  Copy,
  Trash2,
  Mic,
  Type,
  Volume2,
  Sliders
} from 'lucide-react';

export type SpeechNavTab = 'storage' | 'utilities' | 'settings' | 'chat' | 'history' | 'templates';

export interface SpeechToTextHeaderProps {
  onBack: () => void;
  onGoHome?: () => void;
  speechNavTab?: SpeechNavTab;
  onSelectSpeechTab?: (tab: SpeechNavTab) => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const SpeechToTextHeader: React.FC<SpeechToTextHeaderProps> = ({
  onBack,
  onGoHome,
  speechNavTab = 'chat',
  onSelectSpeechTab,
  renderUserAuthButton
}) => {
  // Dropdown states cho cả 3 đầu mục: Lưu trữ, Tiện ích, Cài đặt
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const utilitiesDropdownRef = useRef<HTMLDivElement>(null);
  const storageDropdownRef = useRef<HTMLDivElement>(null);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  // Đồng bộ tab hiện tại
  const [currentTab, setCurrentTab] = useState<SpeechNavTab>(speechNavTab);

  useEffect(() => {
    setCurrentTab(speechNavTab);
  }, [speechNavTab]);

  useEffect(() => {
    const handleTabSync = (e: any) => {
      if (e.detail) setCurrentTab(e.detail);
    };
    window.addEventListener('speech_tab_sync', handleTabSync);
    return () => window.removeEventListener('speech_tab_sync', handleTabSync);
  }, []);

  // Filter & sync state synchronized from SpeechToTextModule
  const [filterSpeakerId, setFilterSpeakerId] = useState<string>('all');
  const [speakers, setSpeakers] = useState<Array<{ id: string; name: string; color?: string }>>([]);
  const [filterCounts, setFilterCounts] = useState<{
    all: number;
    deaf: number;
    bySpeaker: Record<string, number>;
  }>({ all: 0, deaf: 0, bySpeaker: {} });
  const [showChatFilterBar, setShowChatFilterBar] = useState<boolean>(false);

  // Synced states for storage & settings popovers
  const [savedConversationsCount, setSavedConversationsCount] = useState<number>(0);
  const [micState, setMicState] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge' | 'massive'>('xlarge');
  const [autoTts, setAutoTts] = useState<boolean>(true);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (utilitiesDropdownRef.current && !utilitiesDropdownRef.current.contains(target)) {
        setIsUtilitiesOpen(false);
      }
      if (storageDropdownRef.current && !storageDropdownRef.current.contains(target)) {
        setIsStorageOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen to state sync from SpeechToTextModule
  useEffect(() => {
    const handleFilterSync = (e: any) => {
      if (e.detail) {
        if (e.detail.filterSpeakerId !== undefined) setFilterSpeakerId(e.detail.filterSpeakerId);
        if (e.detail.speakers !== undefined) setSpeakers(e.detail.speakers);
        if (e.detail.counts !== undefined) setFilterCounts(e.detail.counts);
        if (e.detail.showSpeakerFilterBar !== undefined) setShowChatFilterBar(e.detail.showSpeakerFilterBar);
        if (e.detail.savedConversationsCount !== undefined) setSavedConversationsCount(e.detail.savedConversationsCount);
        if (e.detail.micState !== undefined) setMicState(e.detail.micState);
        if (e.detail.fontSize !== undefined) setFontSize(e.detail.fontSize);
        if (e.detail.autoTts !== undefined) setAutoTts(e.detail.autoTts);
      }
    };
    window.addEventListener('speech_filter_sync', handleFilterSync);
    window.dispatchEvent(new CustomEvent('speech_request_filter_sync'));
    return () => window.removeEventListener('speech_filter_sync', handleFilterSync);
  }, []);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  const handleTabClick = (tab: SpeechNavTab) => {
    if (tab === 'storage') {
      setIsStorageOpen(prev => !prev);
      setIsUtilitiesOpen(false);
      setIsSettingsOpen(false);
      return;
    }
    if (tab === 'utilities') {
      setIsUtilitiesOpen(prev => !prev);
      setIsStorageOpen(false);
      setIsSettingsOpen(false);
      return;
    }
    if (tab === 'settings') {
      setIsSettingsOpen(prev => !prev);
      setIsStorageOpen(false);
      setIsUtilitiesOpen(false);
      return;
    }
    setIsStorageOpen(false);
    setIsUtilitiesOpen(false);
    setIsSettingsOpen(false);
    if (onSelectSpeechTab) onSelectSpeechTab(tab);
    window.dispatchEvent(new CustomEvent('speech_tab_change', { detail: tab }));
  };

  const handleStorageAction = (action: string) => {
    setIsStorageOpen(false);
    window.dispatchEvent(new CustomEvent('speech_storage_action', { detail: action }));
  };

  const handleSettingsAction = (detail: any) => {
    if (detail === 'open_settings') {
      setIsSettingsOpen(false);
    }
    window.dispatchEvent(new CustomEvent('speech_settings_action', { detail }));
  };

  const handleSelectFilter = (spkId: string) => {
    setFilterSpeakerId(spkId);
    window.dispatchEvent(new CustomEvent('speech_set_filter', { detail: spkId }));
    setIsUtilitiesOpen(false);
  };

  const handleToggleChatFilterBar = () => {
    window.dispatchEvent(new CustomEvent('speech_toggle_filter_bar'));
  };

  const handleOpenTemplates = () => {
    setIsUtilitiesOpen(false);
    if (onSelectSpeechTab) onSelectSpeechTab('templates');
    window.dispatchEvent(new CustomEvent('speech_tab_change', { detail: 'templates' }));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-visible">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ ] + [ Các đầu mục nghiệp vụ ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          {/* Khối định danh phân hệ: [ 🏠 Trang chủ ] + [ CHUYỂN ĐỔI TRỰC TIẾP ] - Đồng bộ chuẩn khoảng cách 10px (gap-2.5) */}
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6 lg:mr-8">
            {/* Icon Trang chủ: Bấm để quay về Trang chủ AVG One */}
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            {/* Tên phân hệ: Bỏ hộp chỉ để chữ (chữ to hơn, màu cam, căn thẳng hàng 100%) */}
            <button
              onClick={onBack}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Quay lại Kho ứng dụng"
            >
              CHUYỂN ĐỔI TRỰC TIẾP
            </button>
          </div>

          {/* BỘ ĐẦU MỤC QUẢN LÝ RIÊNG BIỆT: THIẾT KẾ DẠNG CÁC HỘP HIỆN ĐẠI CÙNG DROPDOWN MŨI TÊN */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            
            {/* 1. LƯU TRỮ (STORAGE) DROPDOWN */}
            <div ref={storageDropdownRef} className="relative shrink-0 whitespace-nowrap">
              <button
                onClick={() => handleTabClick('storage')}
                className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isStorageOpen || currentTab === 'storage' || currentTab === 'history'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                    : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                }`}
              >
                <FolderOpen className={`w-3.5 h-3.5 shrink-0 ${isStorageOpen || currentTab === 'storage' || currentTab === 'history' ? 'text-white stroke-[2.5]' : 'text-slate-500 dark:text-slate-400 stroke-[2]'}`} />
                <span>Lưu trữ</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isStorageOpen ? 'rotate-180' : ''
                  } ${isStorageOpen || currentTab === 'storage' || currentTab === 'history' ? 'text-white' : 'text-slate-400'}`}
                />
              </button>

              {/* DROPDOWN MENU KHO LƯU TRỮ VÀ LỊCH SỬ - NỀN TRẮNG ĐẶC (SOLID WHITE) CHỐNG XUYÊN THẤU */}
              {isStorageOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-80 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl p-3 z-50 animate-dropdown-slide ring-1 ring-black/5">
                  {/* Header của Lưu trữ Popover: Đồng bộ chuẩn Gradient Xanh */}
                  <div className="p-3.5 bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#38BDF8] text-white rounded-2xl flex items-center justify-between mb-2.5 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-2.5 relative z-10">
                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0">
                        <FolderOpen className="w-4 h-4 text-white stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-wider text-white">LƯU TRỮ & LỊCH SỬ</h4>
                        <p className="text-[10px] text-white/90 font-medium">Quản lý phiên ghi âm & bản ghi thoại</p>
                      </div>
                    </div>
                    <span className="relative z-10 text-[10px] font-black text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/20 shadow-2xs">
                      {savedConversationsCount} phiên
                    </span>
                  </div>

                  {/* Danh sách các tác vụ lưu trữ nhanh */}
                  <div className="space-y-1.5">
                    {/* Xem toàn bộ lịch sử */}
                    <button
                      onClick={() => handleStorageAction('open_history')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8] flex items-center justify-center shrink-0">
                          <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Xem toàn bộ lịch sử</div>
                          <div className="text-[10px] text-slate-400">Tìm kiếm & xem lại các phiên đã lưu</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>

                    {/* Tạo phiên hội thoại mới */}
                    <button
                      onClick={() => handleStorageAction('new_conversation')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <PlusCircle className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Tạo phiên hội thoại mới</div>
                          <div className="text-[10px] text-slate-400">Lưu phiên cũ & mở trang hội thoại mới</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>

                    {/* Xuất file văn bản TXT */}
                    <button
                      onClick={() => handleStorageAction('download_transcript')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Download className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Xuất file văn bản (.TXT)</div>
                          <div className="text-[10px] text-slate-400">Tải biên bản phiên thoại về máy tính</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>

                    {/* Sao chép toàn bộ nội dung */}
                    <button
                      onClick={() => handleStorageAction('copy_transcript')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Sao chép nội dung</div>
                          <div className="text-[10px] text-slate-400">Copy toàn bộ văn bản vào clipboard</div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Footer của Lưu trữ: Trạng thái tự động lưu & Nút dọn sạch */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Tự động lưu vào máy</span>
                    </div>
                    <button
                      onClick={() => handleStorageAction('clear_messages')}
                      className="text-[10px] font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
                      title="Dọn sạch tin nhắn hiện tại"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Dọn màn hình</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. TIỆN ÍCH (UTILITIES) DROPDOWN */}
            <div ref={utilitiesDropdownRef} className="relative shrink-0 whitespace-nowrap">
              <button
                onClick={() => handleTabClick('utilities')}
                className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isUtilitiesOpen || currentTab === 'utilities' || currentTab === 'templates'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                    : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                }`}
              >
                <SlidersHorizontal className={`w-3.5 h-3.5 shrink-0 ${isUtilitiesOpen || currentTab === 'utilities' || currentTab === 'templates' ? 'text-white stroke-[2.5]' : 'text-slate-500 dark:text-slate-400 stroke-[2]'}`} />
                <span className="flex items-center gap-1">
                  Tiện ích
                  {filterSpeakerId !== 'all' && (
                    <span className={`w-2 h-2 rounded-full ${isUtilitiesOpen || currentTab === 'utilities' || currentTab === 'templates' ? 'bg-white' : 'bg-[#00A8E8]'} inline-block animate-pulse ml-0.5`} title="Đang kích hoạt bộ lọc hội thoại" />
                  )}
                </span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isUtilitiesOpen ? 'rotate-180' : ''
                  } ${isUtilitiesOpen || currentTab === 'utilities' || currentTab === 'templates' ? 'text-white' : 'text-slate-400'}`}
                />
              </button>

              {/* DROPDOWN MENU TÍCH HỢP BỘ LỌC VÀ TIỆN ÍCH - NỀN TRẮNG ĐẶC (SOLID WHITE) CHỐNG XUYÊN THẤU */}
              {isUtilitiesOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-80 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl p-3 z-50 animate-dropdown-slide ring-1 ring-black/5">
                  {/* Header của Tiện ích Popover: Đồng bộ Gradient Xanh */}
                  <div className="p-3.5 bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#38BDF8] text-white rounded-2xl flex items-center justify-between mb-2.5 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-2.5 relative z-10">
                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0">
                        <SlidersHorizontal className="w-4 h-4 text-white stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-wider text-white">BỘ LỌC & TIỆN ÍCH</h4>
                        <p className="text-[10px] text-white/90 font-medium">Lọc người nói & công cụ bổ trợ</p>
                      </div>
                    </div>
                    {filterSpeakerId !== 'all' && (
                      <button
                        onClick={() => handleSelectFilter('all')}
                        className="relative z-10 text-[10px] font-bold text-[#0284C7] bg-white hover:bg-white/90 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer shadow-2xs"
                      >
                        Đặt lại
                      </button>
                    )}
                  </div>

                  {/* Danh sách các tùy chọn lọc người nói */}
                  <div className="space-y-1.5">
                    {/* Tất cả */}
                    <button
                      onClick={() => handleSelectFilter('all')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                        filterSpeakerId === 'all'
                          ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white font-black shadow-xs'
                          : 'bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Users className={`w-4 h-4 shrink-0 ${filterSpeakerId === 'all' ? 'text-white' : 'text-slate-400'}`} />
                        <span>Tất cả người nói</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        filterSpeakerId === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {filterCounts.all}
                      </span>
                    </button>

                    {/* Giọng Nam */}
                    <button
                      onClick={() => handleSelectFilter('spk-male')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                        filterSpeakerId === 'spk-male'
                          ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white font-black shadow-xs'
                          : 'bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-sky-300/60 dark:ring-sky-800 shrink-0" />
                        <span>👨 Giọng Nam</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        filterSpeakerId === 'spk-male' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {filterCounts.bySpeaker?.['spk-male'] ?? 0}
                      </span>
                    </button>

                    {/* Giọng Nữ */}
                    <button
                      onClick={() => handleSelectFilter('spk-female')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                        filterSpeakerId === 'spk-female'
                          ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white font-black shadow-xs'
                          : 'bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-pink-300/60 dark:ring-pink-800 shrink-0" />
                        <span>👩 Giọng Nữ</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        filterSpeakerId === 'spk-female' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {filterCounts.bySpeaker?.['spk-female'] ?? 0}
                      </span>
                    </button>

                    {/* Tôi */}
                    <button
                      onClick={() => handleSelectFilter('spk-deaf')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                        filterSpeakerId === 'spk-deaf'
                          ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white font-black shadow-xs'
                          : 'bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-600 ring-2 ring-sky-300/60 dark:ring-sky-800 shrink-0" />
                        <span>👤 Tôi</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        filterSpeakerId === 'spk-deaf' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {filterCounts.deaf}
                      </span>
                    </button>

                    {/* Người nói tùy chỉnh thêm */}
                    {speakers.filter(s => s.id !== 'spk-male' && s.id !== 'spk-female').map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectFilter(s.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          filterSpeakerId === s.id
                            ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white font-black shadow-xs'
                            : 'bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-100 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-300 dark:ring-slate-700 shrink-0"
                            style={{ backgroundColor: s.color || '#10B981' }}
                          />
                          <span>{s.name}</span>
                        </div>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          filterSpeakerId === s.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {filterCounts.bySpeaker?.[s.id] ?? 0}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Tiện ích mở rộng & Công cụ hỗ trợ */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="px-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Công Cụ Bổ Trợ
                    </div>

                    {/* Ghim thanh lọc trên khung chat */}
                    <button
                      onClick={handleToggleChatFilterBar}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <Pin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Ghim thanh lọc ở khung chat</span>
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full transition-all ${
                        showChatFilterBar
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {showChatFilterBar ? 'BẬT' : 'TẮT'}
                      </span>
                    </button>

                    {/* Mẫu phản hồi nhanh */}
                    <button
                      onClick={handleOpenTemplates}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-50 hover:bg-sky-50 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors font-medium group border border-slate-100 dark:border-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                        <span className="group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Mẫu phản hồi nhanh</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. CÀI ĐẶT (SETTINGS) DROPDOWN */}
            <div ref={settingsDropdownRef} className="relative shrink-0 whitespace-nowrap">
              <button
                onClick={() => handleTabClick('settings')}
                className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isSettingsOpen || currentTab === 'settings'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                    : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                }`}
              >
                <Settings className={`w-3.5 h-3.5 shrink-0 ${isSettingsOpen || currentTab === 'settings' ? 'text-white stroke-[2.5]' : 'text-slate-500 dark:text-slate-400 stroke-[2]'}`} />
                <span>Cài đặt</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isSettingsOpen ? 'rotate-180' : ''
                  } ${isSettingsOpen || currentTab === 'settings' ? 'text-white' : 'text-slate-400'}`}
                />
              </button>

              {/* DROPDOWN MENU CÀI ĐẶT HỆ THỐNG - NỀN TRẮNG ĐẶC (SOLID WHITE) CHỐNG XUYÊN THẤU */}
              {isSettingsOpen && (
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2.5 w-84 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl p-3 z-50 animate-dropdown-slide ring-1 ring-black/5">
                  {/* Header của Cài đặt Popover: Đồng bộ Gradient Xanh */}
                  <div className="p-3.5 bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#38BDF8] text-white rounded-2xl flex items-center justify-between mb-2.5 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-2.5 relative z-10">
                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0">
                        <Settings className="w-4 h-4 text-white stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-wider text-white">CÀI ĐẶT HỆ THỐNG</h4>
                        <p className="text-[10px] text-white/90 font-medium">Micro, giọng đọc & cỡ chữ hiển thị</p>
                      </div>
                    </div>
                    <span className="relative z-10 text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/20 shadow-2xs">
                      Chuẩn
                    </span>
                  </div>

                  {/* Các tùy chỉnh cài đặt nhanh */}
                  <div className="space-y-2">
                    {/* Micro & Thu âm trực tiếp */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          micState === 'recording'
                            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-500 animate-pulse'
                            : 'bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8]'
                        }`}>
                          <Mic className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Microphone thu âm</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {micState === 'recording' ? '🔴 Đang thu âm trực tiếp...' : micState === 'paused' ? '⏸️ Tạm dừng' : '⚪ Đang tắt mic'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingsAction('toggle_mic')}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                          micState === 'recording'
                            ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
                            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                        }`}
                      >
                        {micState === 'recording' ? 'Dừng mic' : 'Bật mic'}
                      </button>
                    </div>

                    {/* Cỡ chữ hiển thị */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
                          <Type className="w-3.5 h-3.5 text-slate-400" />
                          <span>Cỡ chữ văn bản</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">
                          {fontSize === 'normal' ? 'Nhỏ' : fontSize === 'large' ? 'Vừa' : fontSize === 'xlarge' ? 'Lớn' : 'Rất lớn'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 pt-0.5">
                        {(
                          [
                            { id: 'normal', label: 'Nhỏ' },
                            { id: 'large', label: 'Vừa' },
                            { id: 'xlarge', label: 'Lớn' },
                            { id: 'massive', label: 'Đại' },
                          ] as const
                        ).map(sizeOpt => (
                          <button
                            key={sizeOpt.id}
                            onClick={() => handleSettingsAction({ action: 'set_font_size', size: sizeOpt.id })}
                            className={`py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center ${
                              fontSize === sizeOpt.id
                                ? 'bg-[#00A8E8] text-white shadow-xs font-black'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                          >
                            {sizeOpt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tự động phát âm thanh (TTS) */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8] flex items-center justify-center shrink-0">
                          <Volume2 className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Phát âm thanh AI (TTS)</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Tự động đọc giọng phản hồi</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingsAction('toggle_auto_tts')}
                        className={`px-3 py-1 rounded-full text-[10px] font-black cursor-pointer transition-all ${
                          autoTts
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {autoTts ? 'BẬT' : 'TẮT'}
                      </button>
                    </div>

                    {/* Mở toàn bộ tùy chỉnh chi tiết */}
                    <div className="pt-1">
                      <button
                        onClick={() => handleSettingsAction('open_settings')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs bg-slate-100 hover:bg-sky-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700 group font-bold"
                      >
                        <div className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-sky-500" />
                          <span>Mở bảng tùy chỉnh chi tiết đầy đủ</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right: Đăng Nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
