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
  Plus,
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

export interface HeaderConversationItem {
  id: string;
  title: string;
  createdAt: string;
  messageCount: number;
  lastMessage?: string;
}

const getInitialSavedConversations = (): HeaderConversationItem[] => {
  try {
    const stored = localStorage.getItem('avg_speech_saved_conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map((c: any) => ({
          id: c.id,
          title: c.title || 'Cuộc trao đổi',
          createdAt: c.createdAt || '',
          messageCount: Array.isArray(c.messages) ? c.messages.length : 0,
          lastMessage: Array.isArray(c.messages) && c.messages.length > 0 ? c.messages[c.messages.length - 1].text : '',
        }));
      }
    }
  } catch (e) {}
  return [];
};

const getInitialCurrentConvId = (): string => {
  try {
    return localStorage.getItem('avg_speech_current_conv_id') || '';
  } catch (e) {
    return '';
  }
};

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
  const [savedConversationsList, setSavedConversationsList] = useState<HeaderConversationItem[]>(getInitialSavedConversations);
  const [currentConvId, setCurrentConvId] = useState<string>(getInitialCurrentConvId);
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
        if (e.detail.savedConversations !== undefined) setSavedConversationsList(e.detail.savedConversations);
        if (e.detail.currentConversationId !== undefined) setCurrentConvId(e.detail.currentConversationId);
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

  const handleSelectConversation = (id: string) => {
    setIsStorageOpen(false);
    setCurrentConvId(id);
    window.dispatchEvent(new CustomEvent('speech_select_conversation', { detail: { id } }));
  };

  const handleDeleteConversation = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('speech_delete_conversation', { detail: { id, title } }));
    setSavedConversationsList(prev => prev.filter(c => c.id !== id));
  };

  const handleTabClick = (tab: SpeechNavTab) => {
    if (tab === 'storage') {
      setIsStorageOpen(prev => {
        const next = !prev;
        if (next) {
          setSavedConversationsList(getInitialSavedConversations());
          setCurrentConvId(getInitialCurrentConvId());
          window.dispatchEvent(new CustomEvent('speech_request_filter_sync'));
        }
        return next;
      });
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

              {/* DROPDOWN MENU HIỆN TRỰC TIẾP LỊCH SỬ CÁC CUỘC TRAO ĐỔI - NỀN TRẮNG ĐẶC (SOLID WHITE) */}
              {isStorageOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-88 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2.5 z-50 animate-dropdown-slide overflow-hidden">
                  {/* Header phân cấp dải màu nổi bật, BỎ subtitle 'Quản lý phiên ghi âm & bản ghi thoại' theo yêu cầu */}
                  <div className="-mx-2.5 -mt-2.5 px-3.5 py-2.5 mb-2 bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                      <h4 className="font-black text-xs uppercase tracking-wider text-white">LỊCH SỬ TRAO ĐỔI</h4>
                    </div>
                    <button
                      onClick={() => handleStorageAction('new_conversation')}
                      className="text-[11px] font-bold text-[#0284C7] bg-white hover:bg-sky-50 px-2 py-0.5 rounded-md shadow-2xs cursor-pointer transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
                      title="Tạo cuộc trao đổi mới"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>Phiên mới</span>
                    </button>
                  </div>

                  {/* HIỆN TRỰC TIẾP LỊCH SỬ CÁC CUỘC TRAO ĐỔI (Bỏ hoàn toàn danh sách các nút tác vụ cũ) */}
                  <div className="max-h-72 sm:max-h-80 overflow-y-auto space-y-1 pr-0.5 custom-scrollbar">
                    {savedConversationsList.length === 0 ? (
                      <div className="py-7 text-center text-slate-400 dark:text-slate-500">
                        <MessageSquare className="w-7 h-7 mx-auto mb-1.5 opacity-40 text-[#0284C7]" />
                        <p className="text-xs font-medium">Chưa có cuộc trao đổi nào được lưu</p>
                        <button
                          onClick={() => handleStorageAction('new_conversation')}
                          className="mt-2 text-xs font-bold text-[#0284C7] dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Bắt đầu cuộc trao đổi mới</span>
                        </button>
                      </div>
                    ) : (
                      savedConversationsList.map((conv) => {
                        const isActive = conv.id === currentConvId;
                        return (
                          <div
                            key={conv.id}
                            onClick={() => handleSelectConversation(conv.id)}
                            className={`w-full group text-left px-2.5 py-2 rounded-lg cursor-pointer transition-all flex items-center justify-between border ${
                              isActive
                                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800 shadow-2xs'
                                : 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/70 border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0 flex-1">
                              <MessageSquare
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isActive
                                    ? 'text-[#0284C7] stroke-[2.5]'
                                    : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                                }`}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`text-xs truncate block font-bold ${
                                      isActive
                                        ? 'text-[#0284C7] dark:text-sky-400'
                                        : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'
                                    }`}
                                  >
                                    {conv.title || 'Cuộc trao đổi'}
                                  </span>
                                  {isActive && (
                                    <span className="text-[9px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/80 px-1.5 py-0.2 rounded shrink-0">
                                      Đang mở
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-slate-400 dark:text-slate-500">
                                  <span>{conv.createdAt || 'Gần đây'}</span>
                                  <span>•</span>
                                  <span>{conv.messageCount} câu thoại</span>
                                </div>
                              </div>
                            </div>

                            {/* Nút xóa nhanh cuộc trao đổi */}
                            <button
                              onClick={(e) => handleDeleteConversation(conv.id, conv.title, e)}
                              className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all shrink-0 ml-1"
                              title="Xóa cuộc trao đổi này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer đơn giản, khoa học */}
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-1 text-[11px] text-slate-400">
                    <span>
                      Tổng: <strong className="text-slate-700 dark:text-slate-200">{savedConversationsList.length}</strong> cuộc trao đổi
                    </span>
                    <button
                      onClick={() => handleStorageAction('open_history')}
                      className="text-[#0284C7] dark:text-sky-400 hover:underline font-semibold cursor-pointer"
                    >
                      Mở cửa sổ chi tiết
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
                <div className="absolute top-full left-0 mt-2 w-76 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2.5 z-50 animate-dropdown-slide overflow-hidden">
                  {/* Header phân cấp với màu sắc nổi bật, đồng bộ thanh lịch */}
                  <div className="-mx-2.5 -mt-2.5 px-3.5 py-2.5 mb-2 bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                      <h4 className="font-black text-xs uppercase tracking-wider text-white">BỘ LỌC & TIỆN ÍCH</h4>
                    </div>
                    {filterSpeakerId !== 'all' ? (
                      <button
                        onClick={() => handleSelectFilter('all')}
                        className="text-[10.5px] font-bold text-sky-900 bg-white hover:bg-sky-50 px-2 py-0.5 rounded-md shadow-2xs cursor-pointer transition-colors"
                      >
                        Đặt lại
                      </button>
                    ) : (
                      <span className="text-[10.5px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-md border border-white/20 shadow-2xs">
                        Tất cả
                      </span>
                    )}
                  </div>

                  {/* Danh sách các tùy chọn lọc người nói - Đơn giản, khoa học */}
                  <div className="space-y-0.5">
                    {/* Tất cả */}
                    <button
                      onClick={() => handleSelectFilter('all')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        filterSpeakerId === 'all'
                          ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className={`w-4 h-4 ${filterSpeakerId === 'all' ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`} />
                        <span>Tất cả người nói</span>
                      </div>
                      <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-semibold ${
                        filterSpeakerId === 'all'
                          ? 'bg-slate-200/90 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                          : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                      }`}>
                        {filterCounts.all}
                      </span>
                    </button>

                    {/* Giọng Nam */}
                    <button
                      onClick={() => handleSelectFilter('spk-male')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        filterSpeakerId === 'spk-male'
                          ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👨</span>
                        <span>Giọng Nam</span>
                      </div>
                      <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-semibold ${
                        filterSpeakerId === 'spk-male'
                          ? 'bg-slate-200/90 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                          : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                      }`}>
                        {filterCounts.bySpeaker?.['spk-male'] ?? 0}
                      </span>
                    </button>

                    {/* Giọng Nữ */}
                    <button
                      onClick={() => handleSelectFilter('spk-female')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        filterSpeakerId === 'spk-female'
                          ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👩</span>
                        <span>Giọng Nữ</span>
                      </div>
                      <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-semibold ${
                        filterSpeakerId === 'spk-female'
                          ? 'bg-slate-200/90 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                          : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                      }`}>
                        {filterCounts.bySpeaker?.['spk-female'] ?? 0}
                      </span>
                    </button>

                    {/* Tôi */}
                    <button
                      onClick={() => handleSelectFilter('spk-deaf')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        filterSpeakerId === 'spk-deaf'
                          ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <span>Tôi</span>
                      </div>
                      <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-semibold ${
                        filterSpeakerId === 'spk-deaf'
                          ? 'bg-slate-200/90 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                          : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                      }`}>
                        {filterCounts.deaf}
                      </span>
                    </button>

                    {/* Người nói tùy chỉnh thêm */}
                    {speakers.filter(s => s.id !== 'spk-male' && s.id !== 'spk-female').map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectFilter(s.id)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          filterSpeakerId === s.id
                            ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 font-normal'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: s.color || '#10B981' }}
                          />
                          <span>{s.name}</span>
                        </div>
                        <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-semibold ${
                          filterSpeakerId === s.id
                            ? 'bg-slate-200/90 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                            : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                        }`}>
                          {filterCounts.bySpeaker?.[s.id] ?? 0}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Tiện ích mở rộng & Công cụ hỗ trợ */}
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
                    <div className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Công Cụ Bổ Trợ
                    </div>

                    {/* Ghim thanh lọc trên khung chat */}
                    <button
                      onClick={handleToggleChatFilterBar}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Pin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-800 dark:text-slate-100">Ghim thanh lọc ở khung chat</span>
                      </div>
                      <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                        showChatFilterBar
                          ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {showChatFilterBar ? 'BẬT' : 'TẮT'}
                      </span>
                    </button>

                    {/* Mẫu phản hồi nhanh */}
                    <button
                      onClick={handleOpenTemplates}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                        <span className="font-medium text-slate-800 dark:text-slate-100">Mẫu phản hồi nhanh</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-76 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2.5 z-50 animate-dropdown-slide overflow-hidden">
                  {/* Header phân cấp với màu sắc nổi bật, đồng bộ thanh lịch */}
                  <div className="-mx-2.5 -mt-2.5 px-3.5 py-2.5 mb-2 bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                      <h4 className="font-black text-xs uppercase tracking-wider text-white">CÀI ĐẶT HỆ THỐNG</h4>
                    </div>
                    <span className="text-[10.5px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-md border border-white/20 shadow-2xs">
                      Chuẩn
                    </span>
                  </div>

                  {/* Các tùy chỉnh cài đặt - Bố cục khoa học, thanh lịch */}
                  <div className="space-y-1.5">
                    {/* Micro & Thu âm trực tiếp */}
                    <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <Mic className={`w-4 h-4 ${micState === 'recording' ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                        <div>
                          <div className="text-xs font-medium text-slate-800 dark:text-slate-100">Microphone thu âm</div>
                          <div className="text-[10.5px] text-slate-400">
                            {micState === 'recording' ? '🔴 Đang chuyển đổi ...' : micState === 'paused' ? '⏸️ Tạm dừng' : '⚪ Đang tắt mic'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingsAction('toggle_mic')}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all border ${
                          micState === 'recording'
                            ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {micState === 'recording' ? 'Dừng mic' : 'Bật mic'}
                      </button>
                    </div>

                    {/* Cỡ chữ hiển thị - Segmented control khoa học */}
                    <div className="px-2 py-1.5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-medium">
                          <Type className="w-4 h-4 text-slate-400" />
                          <span>Cỡ chữ văn bản</span>
                        </div>
                        <span className="text-[10.5px] text-slate-400">
                          {fontSize === 'normal' ? 'Nhỏ' : fontSize === 'large' ? 'Vừa' : fontSize === 'xlarge' ? 'Lớn' : 'Rất lớn'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">
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
                            className={`py-1 rounded-md text-[11px] transition-all cursor-pointer text-center font-medium ${
                              fontSize === sizeOpt.id
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {sizeOpt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tự động phát âm thanh (TTS) */}
                    <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-slate-400" />
                        <div>
                          <div className="text-xs font-medium text-slate-800 dark:text-slate-100">Phát âm thanh AI (TTS)</div>
                          <div className="text-[10.5px] text-slate-400">Tự động đọc giọng phản hồi</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingsAction('toggle_auto_tts')}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer transition-all border ${
                          autoTts
                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200/80 dark:border-sky-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {autoTts ? 'BẬT' : 'TẮT'}
                      </button>
                    </div>

                    {/* Mở toàn bộ tùy chỉnh chi tiết */}
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => handleSettingsAction('open_settings')}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                          <span className="font-medium text-slate-800 dark:text-slate-100">Mở bảng tùy chỉnh chi tiết</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
