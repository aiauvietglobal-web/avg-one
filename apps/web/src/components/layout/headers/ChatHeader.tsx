import React, { useState, useEffect } from 'react';
import {
  Home, MessageSquare, Users, User, Plus
} from 'lucide-react';

export type ChatFilterTab = 'all' | 'groups' | 'direct';

export interface ChatHeaderProps {
  onGoHome?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onGoHome,
  renderUserAuthButton
}) => {
  const [activeTab, setActiveTab] = useState<ChatFilterTab>('all');

  useEffect(() => {
    const handleTabSync = (e: any) => {
      if (e.detail && ['all', 'groups', 'direct'].includes(e.detail)) {
        setActiveTab(e.detail as ChatFilterTab);
      }
    };
    window.addEventListener('chat_filter_tab_sync', handleTabSync);
    return () => window.removeEventListener('chat_filter_tab_sync', handleTabSync);
  }, []);

  const handleSelectTab = (tab: ChatFilterTab) => {
    setActiveTab(tab);
    window.dispatchEvent(new CustomEvent('chat_filter_tab_change', { detail: tab }));
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-b border-slate-200/80 dark:border-slate-800 select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
        {/* Cụm trái: [ Icon Trang chủ + Tên phân hệ CHAT NỘI BỘ ] + [ Các hộp viên thuốc lọc hội thoại ] */}
        <div className="flex items-center select-none shrink-0 whitespace-nowrap">
          <div className="flex items-center gap-2.5 shrink-0 mr-4 sm:mr-6">
            <button
              onClick={handleGoHome}
              className="h-9 sm:h-10 flex items-center justify-center text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Về Trang chủ AVG One"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5" />
            </button>

            <button
              onClick={() => handleSelectTab('all')}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Phân hệ Chat Nội Bộ"
            >
              <span>CHAT NỘI BỘ</span>
            </button>
          </div>

          {/* CÁC TAB LỌC HỘI THOẠI & TẠO NHÓM (HỘP VIÊN THUỐC ĐỒNG BỘ) */}
          <div className="flex items-center gap-2 pl-3 sm:pl-5 border-l border-slate-200 dark:border-slate-700/80 shrink-0">
            <button
              type="button"
              onClick={() => handleSelectTab('all')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeTab === 'all'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tất cả</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab('groups')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeTab === 'groups'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Nhóm Cụm & Đầu mối</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab('direct')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeTab === 'direct'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Cá nhân (1-1)</span>
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('chat_open_create_group'))}
              title="Tạo nhóm trao đổi mới"
              className="h-9 px-4 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#1F1F1F] dark:text-white text-[13px] font-semibold transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 select-none"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Tạo nhóm chat</span>
            </button>
          </div>
        </div>

        {/* Cụm phải: Đăng nhập / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
          {renderUserAuthButton()}
        </div>
      </div>
    </header>
  );
};
