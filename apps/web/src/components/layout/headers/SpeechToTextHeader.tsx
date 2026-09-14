import React from 'react';
import { Home } from 'lucide-react';

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
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.dispatchEvent(new CustomEvent('go_home'));
    }
  };

  const handleTabClick = (tab: SpeechNavTab) => {
    if (onSelectSpeechTab) onSelectSpeechTab(tab);
    window.dispatchEvent(new CustomEvent('speech_tab_change', { detail: tab }));
  };

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white/95 dark:bg-[#2C1D29]/95 backdrop-blur-md text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none border-none select-none">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
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
              const isActive = speechNavTab === tab.id || (tab.id === 'storage' && speechNavTab === 'history') || (tab.id === 'utilities' && speechNavTab === 'templates');
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
