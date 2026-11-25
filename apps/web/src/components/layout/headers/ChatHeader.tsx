import React, { useState, useEffect } from 'react';
import {
  Home, MessageSquare, Contact, CheckSquare, Cloud
} from 'lucide-react';

export type ChatMainView = 'messages' | 'contacts' | 'tasks' | 'cloud';

export interface ChatHeaderProps {
  onGoHome?: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onGoHome,
  renderUserAuthButton
}) => {
  const [activeView, setActiveView] = useState<ChatMainView>('messages');
  const [unreadCount, setUnreadCount] = useState<number>(3);

  useEffect(() => {
    const handleViewSync = (e: any) => {
      if (e.detail && ['messages', 'contacts', 'tasks', 'cloud'].includes(e.detail)) {
        setActiveView(e.detail as ChatMainView);
      }
    };
    const handleUnreadSync = (e: any) => {
      if (typeof e.detail === 'number') {
        setUnreadCount(e.detail);
      }
    };
    window.addEventListener('chat_main_view_sync', handleViewSync);
    window.addEventListener('chat_unread_count_sync', handleUnreadSync);
    return () => {
      window.removeEventListener('chat_main_view_sync', handleViewSync);
      window.removeEventListener('chat_unread_count_sync', handleUnreadSync);
    };
  }, []);

  const handleSelectView = (view: ChatMainView) => {
    setActiveView(view);
    window.dispatchEvent(new CustomEvent('chat_main_view_change', { detail: view }));
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
        {/* Cụm trái: [ 🏠 CHAT ] + [ Tin nhắn | Danh bạ | Giao việc | Cloud của tôi ] */}
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
              onClick={() => handleSelectView('messages')}
              className="h-9 sm:h-10 flex items-center text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight cursor-pointer transition-colors shrink-0 select-none leading-none"
              title="Phân hệ Chat Nội Bộ"
            >
              <span>CHAT</span>
            </button>
          </div>

          {/* 4 MỤC CHÍNH CHUẨN ZALO DẠNG HỘP VIÊN THUỐC TỐI GIẢN */}
          <div className="flex items-center gap-2 pl-3 sm:pl-5 border-l border-slate-200 dark:border-slate-700/80 shrink-0">
            <button
              type="button"
              onClick={() => handleSelectView('messages')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeView === 'messages'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 stroke-[1.9]" />
              <span>Tin nhắn</span>
              {unreadCount > 0 && (
                <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#E53935] text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSelectView('contacts')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeView === 'contacts'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <Contact className="w-3.5 h-3.5 stroke-[1.9]" />
              <span>Danh bạ</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectView('tasks')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeView === 'tasks'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 stroke-[1.9]" />
              <span>Giao việc</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectView('cloud')}
              className={`h-9 px-4 rounded-full text-[13px] transition flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                activeView === 'cloud'
                  ? 'bg-[#E4E6EB] dark:bg-slate-700 text-[#1F1F1F] dark:text-white font-bold'
                  : 'bg-[#F1F2F4] hover:bg-[#E4E6EB] dark:bg-slate-800/80 dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 font-semibold'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 stroke-[1.9]" />
              <span>Cloud của tôi</span>
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
