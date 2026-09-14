import React, { useState, useEffect, useRef } from 'react';
import { Home, ChevronDown, Filter, Users, SlidersHorizontal, MessageSquare } from 'lucide-react';

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

          {/* BỘ ĐẦU MỤC QUẢN LÝ RIÊNG BIỆT: BỎ HỘP CHỈ ĐỂ CHỮ */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 select-none shrink-0 whitespace-nowrap">
            {[
              { id: 'storage' as const, label: 'Lưu trữ' },
              { id: 'utilities' as const, label: 'Tiện ích' },
              { id: 'settings' as const, label: 'Cài đặt' },
            ].map((tab) => {
              const isFilterActive = tab.id === 'utilities' && filterSpeakerId !== 'all';
              const isActive = isUtilitiesOpen || isFilterActive || speechNavTab === tab.id || (tab.id === 'storage' && speechNavTab === 'history') || (tab.id === 'utilities' && speechNavTab === 'templates');

              if (tab.id === 'utilities') {
                return (
                  <div
                    key={tab.id}
                    ref={utilitiesDropdownRef}
                    className="relative shrink-0 whitespace-nowrap"
                  >
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className={`relative px-2 sm:px-2.5 py-1.5 text-sm sm:text-[15px] cursor-pointer select-none tracking-normal transition-colors duration-150 whitespace-nowrap shrink-0 flex items-center gap-1 ${
                        isActive
                          ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                          : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                      }`}
                    >
                      <span className="relative inline-block whitespace-nowrap">
                        <span className="relative z-10 flex items-center gap-1">
                          {tab.label}
                          {isFilterActive && (
                            <span className="w-2 h-2 rounded-full bg-[#F15A24] inline-block animate-pulse" title="Đang kích hoạt bộ lọc hội thoại" />
                          )}
                        </span>
                        {isActive && (
                          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                        )}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isUtilitiesOpen ? 'rotate-180' : ''
                        } ${isActive ? 'text-[#F15A24]' : 'opacity-60'}`}
                      />
                    </button>

                    {/* DROPDOWN MENU TÍCH HỢP BỘ LỌC VÀ TIỆN ÍCH */}
                    {isUtilitiesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white/98 dark:bg-[#1F1420]/98 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2.5 z-50 animate-dropdown-slide">
                        {/* Header của Popover */}
                        <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <Filter className="w-3.5 h-3.5 text-[#F15A24]" />
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                              Bộ lọc hội thoại
                            </span>
                          </div>
                          {filterSpeakerId !== 'all' && (
                            <button
                              onClick={() => handleSelectFilter('all')}
                              className="text-[11px] font-bold text-[#F15A24] hover:underline cursor-pointer transition-colors"
                            >
                              Đặt lại
                            </button>
                          )}
                        </div>

                        {/* Danh sách các tùy chọn lọc người nói */}
                        <div className="space-y-1">
                          {/* Tất cả */}
                          <button
                            onClick={() => handleSelectFilter('all')}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                              filterSpeakerId === 'all'
                                ? 'bg-orange-500 text-white font-bold shadow-xs'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 shrink-0 opacity-80" />
                              <span>Tất cả người nói</span>
                            </div>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                              filterSpeakerId === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                              {filterCounts.all}
                            </span>
                          </button>

                          {/* Giọng Nam */}
                          <button
                            onClick={() => handleSelectFilter('spk-male')}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                              filterSpeakerId === 'spk-male'
                                ? 'bg-orange-500 text-white font-bold shadow-xs'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-sky-300/60 dark:ring-sky-800 shrink-0" />
                              <span>Giọng Nam</span>
                            </div>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                              filterSpeakerId === 'spk-male' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                              {filterCounts.bySpeaker?.['spk-male'] ?? 0}
                            </span>
                          </button>

                          {/* Giọng Nữ */}
                          <button
                            onClick={() => handleSelectFilter('spk-female')}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                              filterSpeakerId === 'spk-female'
                                ? 'bg-orange-500 text-white font-bold shadow-xs'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-pink-300/60 dark:ring-pink-800 shrink-0" />
                              <span>Giọng Nữ</span>
                            </div>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                              filterSpeakerId === 'spk-female' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                              {filterCounts.bySpeaker?.['spk-female'] ?? 0}
                            </span>
                          </button>

                          {/* Tôi (Khiếm thính) */}
                          <button
                            onClick={() => handleSelectFilter('spk-deaf')}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                              filterSpeakerId === 'spk-deaf'
                                ? 'bg-orange-500 text-white font-bold shadow-xs'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#F15A24] ring-2 ring-orange-300/60 dark:ring-orange-800 shrink-0" />
                              <span>Tôi (Khiếm thính)</span>
                            </div>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                              filterSpeakerId === 'spk-deaf' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                              {filterCounts.deaf}
                            </span>
                          </button>

                          {/* Người nói tùy chỉnh thêm */}
                          {speakers.filter(s => s.id !== 'spk-male' && s.id !== 'spk-female').map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleSelectFilter(s.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                                filterSpeakerId === s.id
                                  ? 'bg-orange-500 text-white font-bold shadow-xs'
                                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-300 dark:ring-slate-700 shrink-0"
                                  style={{ backgroundColor: s.color || '#10B981' }}
                                />
                                <span>{s.name}</span>
                              </div>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                                filterSpeakerId === s.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              }`}>
                                {filterCounts.bySpeaker?.[s.id] ?? 0}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Tiện ích mở rộng */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                          {/* Ghim thanh lọc trên khung chat */}
                          <button
                            onClick={handleToggleChatFilterBar}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                          >
                            <span className="flex items-center gap-1.5 font-medium">
                              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                              <span>Ghim thanh lọc ở khung chat</span>
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              showChatFilterBar
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                            }`}>
                              {showChatFilterBar ? 'BẬT' : 'TẮT'}
                            </span>
                          </button>

                          {/* Phản hồi nhanh */}
                          <button
                            onClick={handleOpenTemplates}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            <span>Mẫu phản hồi nhanh</span>
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
                  className={`relative px-2 sm:px-2.5 py-1.5 text-sm sm:text-[15px] cursor-pointer select-none tracking-normal transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                      : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                  }`}
                >
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10">{tab.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                    )}
                  </span>
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
