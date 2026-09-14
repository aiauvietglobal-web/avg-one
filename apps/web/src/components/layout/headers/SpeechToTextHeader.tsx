import React, { useState, useEffect, useRef } from 'react';
import { Home, ChevronDown, Filter, Users, SlidersHorizontal, MessageSquare, FolderOpen, Settings, Pin, Sparkles, ChevronRight } from 'lucide-react';

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
  // Dropdown Tiện ích & Bộ lọc
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);
  const utilitiesDropdownRef = useRef<HTMLDivElement>(null);

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

  // Filter state synchronized from SpeechToTextModule
  const [filterSpeakerId, setFilterSpeakerId] = useState<string>('all');
  const [speakers, setSpeakers] = useState<Array<{ id: string; name: string; color?: string }>>([]);
  const [filterCounts, setFilterCounts] = useState<{
    all: number;
    deaf: number;
    bySpeaker: Record<string, number>;
  }>({ all: 0, deaf: 0, bySpeaker: {} });
  const [showChatFilterBar, setShowChatFilterBar] = useState<boolean>(false);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (utilitiesDropdownRef.current && !utilitiesDropdownRef.current.contains(target)) {
        setIsUtilitiesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen to filter state sync from SpeechToTextModule
  useEffect(() => {
    const handleFilterSync = (e: any) => {
      if (e.detail) {
        if (e.detail.filterSpeakerId !== undefined) setFilterSpeakerId(e.detail.filterSpeakerId);
        if (e.detail.speakers !== undefined) setSpeakers(e.detail.speakers);
        if (e.detail.counts !== undefined) setFilterCounts(e.detail.counts);
        if (e.detail.showSpeakerFilterBar !== undefined) setShowChatFilterBar(e.detail.showSpeakerFilterBar);
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
    if (tab === 'utilities') {
      setIsUtilitiesOpen(prev => !prev);
      return;
    }
    setIsUtilitiesOpen(false);
    if (onSelectSpeechTab) onSelectSpeechTab(tab);
    window.dispatchEvent(new CustomEvent('speech_tab_change', { detail: tab }));
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

          {/* BỘ ĐẦU MỤC QUẢN LÝ RIÊNG BIỆT: THIẾT KẾ DẠNG CÁC HỘP HIỆN ĐẠI */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'storage' as const, label: 'Lưu trữ', icon: FolderOpen },
              { id: 'utilities' as const, label: 'Tiện ích', icon: SlidersHorizontal },
              { id: 'settings' as const, label: 'Cài đặt', icon: Settings },
            ].map((tab) => {
              const isFilterActive = tab.id === 'utilities' && filterSpeakerId !== 'all';
              const isActive =
                tab.id === 'utilities'
                  ? (isUtilitiesOpen || currentTab === 'utilities' || currentTab === 'templates')
                  : tab.id === 'storage'
                  ? (currentTab === 'storage' || currentTab === 'history')
                  : (currentTab === 'settings');
              const IconComponent = tab.icon;

              if (tab.id === 'utilities') {
                return (
                  <div
                    key={tab.id}
                    ref={utilitiesDropdownRef}
                    className="relative shrink-0 whitespace-nowrap"
                  >
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                          : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white stroke-[2.5]' : 'text-slate-500 dark:text-slate-400 stroke-[2]'}`} />
                      <span className="flex items-center gap-1">
                        {tab.label}
                        {isFilterActive && (
                          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#00A8E8]'} inline-block animate-pulse ml-0.5`} title="Đang kích hoạt bộ lọc hội thoại" />
                        )}
                      </span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isUtilitiesOpen ? 'rotate-180' : ''
                        } ${isActive ? 'text-white' : 'text-slate-400'}`}
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

                          {/* Tôi (Khiếm thính) */}
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
                              <span>👤 Tôi (Khiếm thính)</span>
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
                );
              }

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
                </button>
              );
            })}
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
