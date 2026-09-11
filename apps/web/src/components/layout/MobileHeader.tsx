import React, { useState } from 'react';
import { LayoutGrid, Search, Smartphone, Monitor, ChevronLeft, User, Shield, LogOut, X, RotateCw } from 'lucide-react';
import avgOfficialLogo from '../../assets/avg-one-official-logo.png';
import { AppModuleId, APP_MODULES } from './AppLauncherModal';
import { UserProfile } from '../auth/LoginModal';

interface MobileHeaderProps {
  activeModule: AppModuleId;
  onSelectModule: (module: AppModuleId) => void;
  onOpenLauncher: () => void;
  onOpenLoginModal: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  isMobileMode: boolean;
  onToggleMobileMode: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  activeModule,
  onSelectModule,
  onOpenLauncher,
  onOpenLoginModal,
  currentUser,
  onLogout,
  isMobileMode,
  onToggleMobileMode,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const currentApp = APP_MODULES.find((m) => m.id === activeModule) || APP_MODULES[0];

  return (
    <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs select-none">
      <div className="px-3 h-12 flex items-center justify-between gap-2">
        {/* Left Section: Apps Launcher + Logo / Back Button */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <button
            onClick={onOpenLauncher}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#F15A24] dark:text-orange-400 transition active:scale-95 cursor-pointer"
            title="Tất cả Ứng dụng"
          >
            <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
          </button>

          {activeModule !== 'home' ? (
            <button
              onClick={() => onSelectModule('home')}
              className="flex items-center gap-1 font-bold text-slate-800 dark:text-white text-sm hover:text-[#F15A24] transition truncate cursor-pointer"
              title="Về Trang chủ"
            >
              <ChevronLeft className="w-4 h-4 text-[#F15A24] flex-shrink-0" />
              <span className="truncate uppercase font-black tracking-wide text-xs sm:text-sm">
                {currentApp.name}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onSelectModule('home')}
              className="flex items-center gap-1.5 cursor-pointer"
              title="Trang chủ AVG One"
            >
              <img
                src={avgOfficialLogo}
                alt="AVG One Logo"
                className="h-5 sm:h-6 object-contain"
              />
            </button>
          )}
        </div>

        {/* Center: Search Field (Expandable on Mobile) */}
        {showSearch ? (
          <div className="flex-1 flex items-center gap-1 animate-in fade-in duration-200">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm ứng dụng, dữ liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
              />
            </div>
            <button
              onClick={() => setShowSearch(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Search Trigger (Ẩn ở Trang chủ) */}
            {activeModule !== 'home' && (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Tìm kiếm"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Reset / Reload Latest Build Icon-Only Button (Ẩn ở Trang chủ) */}
            {activeModule !== 'home' && (
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.reload();
                  }
                }}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer active:scale-90"
                title="Tải lại / Cập nhật bản build mới nhất (Reset)"
              >
                <RotateCw className="w-4 h-4 text-[#F15A24] dark:text-orange-400 hover:rotate-180 transition-transform duration-300" />
              </button>
            )}

            {/* Toggle Mobile/Desktop View */}
            <button
              onClick={onToggleMobileMode}
              className={`p-2 rounded-lg transition cursor-pointer ${
                isMobileMode
                  ? 'text-[#F15A24] bg-orange-50 dark:bg-orange-950/60'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isMobileMode ? 'Đang bật Giao diện Mobile (Click để về Desktop)' : 'Chuyển sang Giao diện Mobile'}
            >
              {isMobileMode ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            </button>

            {/* SSO / Profile Avatar */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-7 h-7 rounded-full bg-[#F15A24] hover:bg-[#d94e1f] text-white font-black text-xs flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition"
                  title={currentUser.name}
                >
                  {currentUser.name.charAt(0)}
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="px-3.5 py-1.5 bg-[#F15A24] hover:bg-[#d94e1f] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer border border-[#F15A24]"
                >
                  Đăng Nhập
                </button>
              )}

              {showUserMenu && currentUser && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50 text-slate-800 dark:text-slate-100">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <div className="font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
                    <div className="mt-1 text-[10px] font-bold text-[#F15A24] bg-orange-50 dark:bg-orange-950/60 px-1.5 py-0.5 rounded inline-block">
                      {currentUser.role}
                    </div>
                  </div>
                  <div className="py-1 text-xs space-y-0.5">
                    <button
                      onClick={() => {
                        onSelectModule('admin');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#714B67]" /> Quản trị IT
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
