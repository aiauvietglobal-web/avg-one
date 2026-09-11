import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutGrid, Plus, Bell, Sun, Moon, Zap, User, Users, ChevronDown, ChevronLeft, CheckCircle2, Home,
  FileText, Newspaper, Target, Layers, BarChart3, LogOut, Shield, MessageSquare, Clock, SlidersHorizontal, Sparkles, Wrench, ArrowLeft, Maximize2, Minimize2, Smartphone, RotateCw, Calendar, FolderKanban
} from 'lucide-react';
import { AppLauncherModal, AppModuleId, APP_MODULES } from './AppLauncherModal';
import { LoginModal, UserProfile } from '../auth/LoginModal';
import avgOfficialLogo from '../../assets/avg-one-official-logo.png';
import { useIsMobile } from './useIsMobile';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';

interface AppShellProps {
  activeModule: AppModuleId;
  onSelectModule: (module: AppModuleId) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  children: React.ReactNode;
}

interface TabItem {
  id: string;
  label: string;
  domId?: string;
  onClick: () => void;
}

const AnimatedHeaderTabs: React.FC<{
  tabs: TabItem[];
  activeId: string;
}> = ({ tabs, activeId }) => {
  return (
    <div className="relative flex items-center h-full gap-3 sm:gap-4 text-xs sm:text-sm font-medium flex-shrink-0 ml-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <div key={tab.id} className="relative h-full flex items-center">
            <button
              id={tab.domId}
              data-tab-id={tab.id}
              onClick={tab.onClick}
              className={`h-full flex items-center text-xs sm:text-sm transition-colors duration-200 select-none whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#00A8E8] dark:text-[#00A8E8] font-black'
                  : 'text-slate-600 dark:text-slate-300 font-bold hover:text-[#00A8E8] dark:hover:text-[#00A8E8]'
              }`}
            >
              {tab.label}
            </button>

            {/* Line mỏng 2px xuất hiện mở rộng nhẹ nhàng thu ngắn hơn nữa dưới chân từng đầu mục khi được chọn */}
            <span
              className={`absolute bottom-0 left-5 right-5 h-[2px] bg-[#00A8E8] rounded-full transform origin-center transition-transform duration-300 ease-out pointer-events-none ${
                isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export const AppShell: React.FC<AppShellProps> = ({
  activeModule,
  onSelectModule,
  darkMode,
  onToggleDarkMode,
  children
}) => {
  const { isMobile, toggleMobileMode } = useIsMobile();
  const [showLauncher, setShowLauncher] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('avg_logged_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [hrTabState, setHrTabState] = useState<string>('employees');
  const [calendarTabState, setCalendarTabState] = useState<string>('talk');
  const [systemTabState, setSystemTabState] = useState<string>('annual-plan');
  const [workflowTabState, setWorkflowTabState] = useState<string>('design');
  const [speechTabState, setSpeechTabState] = useState<string>('direct');
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [activeSubTitle, setActiveSubTitle] = useState<string>('');

  useEffect(() => {
    setActiveSubTitle('');
    setIsArrowActive(false);
  }, [activeModule]);

  useEffect(() => {
    const handleSubModuleChange = (e: any) => {
      if (e.detail !== undefined) {
        setActiveSubTitle(e.detail);
      }
    };
    window.addEventListener('submodule_change', handleSubModuleChange);
    return () => {
      window.removeEventListener('submodule_change', handleSubModuleChange);
    };
  }, []);

  const handleAppTitleClick = () => {
    if (isArrowActive) {
      setIsArrowActive(false);
      onSelectModule('home');
    } else {
      setIsArrowActive(true);
    }
  };

  // Real-time ticking Vietnam Clock (Asia/Ho_Chi_Minh - ICT UTC+7)
  const [vietnamTimeStr, setVietnamTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const tStr = timeFormatter.format(now);
      const dStr = dateFormatter.format(now);
      setVietnamTimeStr(`${tStr} (${dStr})`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fullscreen mode state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sync isFullscreen state with native document.fullscreenElement
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn("Fullscreen mode error:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Keyboard Shortcuts: F11 or (Ctrl+Shift+F) or (Alt+F) for Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Fullscreen Shortcut
      if (
        e.key === 'F11' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') ||
        (e.altKey && e.key.toLowerCase() === 'f')
      ) {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentApp = APP_MODULES.find(m => m.id === activeModule) || APP_MODULES[0];

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col font-sans antialiased bg-white dark:bg-slate-950 text-[#333333] dark:text-slate-100 transition-colors duration-200">
      
      {/* MOBILE HEADER VS DESKTOP HEADERS */}
      {isMobile ? (
        /* GIAO DIỆN MOBILE CHUẨN NATIVE (Mở rộng 100% linh hoạt, thực tế, dễ dàng sử dụng) */
        <div className="w-full h-full flex flex-col relative overflow-hidden bg-white dark:bg-slate-950">
          <MobileHeader
            activeModule={activeModule}
            onSelectModule={onSelectModule}
            onOpenLauncher={() => setShowLauncher(true)}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            currentUser={currentUser}
            onLogout={() => {
              localStorage.removeItem('avg_logged_user');
              setCurrentUser(null);
            }}
            isMobileMode={isMobile}
            onToggleMobileMode={toggleMobileMode}
          />

          {/* Main Content Viewport for Mobile */}
          <main className="flex-1 w-full min-h-0 h-full overflow-y-auto flex flex-col pb-16 relative">
            {children}
          </main>

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav
            activeModule={activeModule}
            onSelectModule={onSelectModule}
            onOpenLauncher={() => setShowLauncher(true)}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            isLoggedIn={!!currentUser}
          />
        </div>
      ) : (
        /* GIAO DIỆN DESKTOP TOÀN MÀN HÌNH */
        <div className="w-full h-full flex flex-col overflow-hidden bg-white dark:bg-slate-950">
          {activeModule === 'home' ? (
            /* HOME PAGE HEADER (Logo Chính Thức AVG One + SSO - Không Đường Phân Cách) */
            <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white border-none transition-all shadow-xs dark:shadow-none">
              <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-6">
                
                {/* Left: AVG One Official Logo */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectModule('home')}
                    className="flex items-center gap-3 hover:opacity-90 transition text-left group"
                    title="Trang Chủ Tất Cả Ứng Dụng AVG One"
                  >
                    <img
                      src={avgOfficialLogo}
                      alt="AVG One Official Logo"
                      className="h-7 sm:h-8 object-contain group-hover:scale-105 transition-transform"
                    />
                  </button>
                </div>

                {/* Center: Phân hệ quản lý vận hành (HỆ THỐNG, BẢNG TIN, LỊCH, ĐƠN HÀNG) */}
                <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-3">
                  {[
                    { id: 'system' as AppModuleId, label: 'Hệ Thống', icon: BarChart3 },
                    { id: 'inside' as AppModuleId, label: 'Bảng Tin', icon: Newspaper },
                    { id: 'calendar' as AppModuleId, label: 'Lịch', icon: Calendar },
                    { id: 'orders' as AppModuleId, label: 'Đơn Hàng', icon: FolderKanban },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectModule(item.id)}
                        className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24] hover:bg-orange-50/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer group"
                      >
                        <Icon className="w-4 h-4 text-[#F15A24] group-hover:scale-110 transition-transform" />
                        <span className="tracking-wide uppercase">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Right: SSO Profile / Login Button */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="relative">
                    {currentUser ? (
                      /* Đã đăng nhập: Chỉ hiển thị Avatar hình tròn (Bỏ hộp đen & bỏ chữ) */
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F15A24] hover:bg-[#d94e1f] text-white font-black text-xs sm:text-sm flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer focus:outline-none"
                        title={`${currentUser.name} (${currentUser.role})`}
                      >
                        {currentUser.name.charAt(0)}
                      </button>
                    ) : (
                      /* Chưa đăng nhập: Hộp màu cam, Chữ Đăng nhập, BỎ MŨI TÊN theo chỉ định */
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="px-4 py-2 bg-[#F15A24] hover:bg-[#d94e1f] active:scale-95 text-white font-extrabold text-xs sm:text-[13px] rounded-xl transition shadow-sm border border-[#F15A24] cursor-pointer"
                        title="Đăng nhập tài khoản AVG One"
                      >
                        <span>Đăng nhập</span>
                      </button>
                    )}

                    {showUserMenu && currentUser && (
                      <div className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50 text-slate-800 dark:text-slate-100">
                        <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 text-xs">
                          <div className="font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium truncate">{currentUser.email}</div>
                          <div className="mt-1.5 text-[10px] font-bold text-[#F15A24] bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-md inline-block">
                            {currentUser.role}
                          </div>
                        </div>
                        <div className="py-1 text-xs space-y-0.5">
                          <button
                            onClick={() => { onSelectModule('admin'); setShowUserMenu(false); }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                          >
                            <Shield className="w-3.5 h-3.5 text-[#714B67]" /> Cài đặt IT Admin
                          </button>
                          <button
                            onClick={() => {
                              localStorage.removeItem('avg_logged_user');
                              setCurrentUser(null);
                              setShowUserMenu(false);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" /> Đăng xuất tài khoản
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </header>
          ) : (
            /* SUB-MODULE TOPBAR HEADER */
            <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-xs">
              <div className="w-full px-4 sm:px-8 h-12 sm:h-14 flex items-center justify-between gap-4 text-xs sm:text-sm font-medium">
                
                {/* Left Stack */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 mr-2 h-full">
                  <button
                    onClick={() => setShowLauncher(true)}
                    className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-[#F15A24] dark:text-orange-400 transition flex items-center justify-center flex-shrink-0 cursor-pointer"
                    title="Mở danh mục Tất cả Ứng dụng AVG One"
                  >
                    <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => {
                      if (activeSubTitle) {
                        if (isArrowActive) {
                          setIsArrowActive(false);
                          setActiveSubTitle('');
                          window.dispatchEvent(new CustomEvent('submodule_back'));
                        } else {
                          setIsArrowActive(true);
                        }
                      } else {
                        handleAppTitleClick();
                      }
                    }}
                    className="font-black text-slate-900 dark:text-white text-base sm:text-lg tracking-wide uppercase hover:text-[#F15A24] transition flex items-center gap-1.5 flex-shrink-0 mr-0.5 group cursor-pointer"
                  >
                    {isArrowActive && (
                      <ChevronLeft className="w-5 h-5 stroke-[2.5] text-[#F15A24] dark:text-orange-400" />
                    )}
                    <span>
                      {activeSubTitle || (currentApp.name === 'Lịch' ? 'LỊCH' : currentApp.name)}
                    </span>
                  </button>
                </div>

                {/* Center: Operation Modules Quick Switch (HỆ THỐNG, BẢNG TIN, LỊCH, ĐƠN HÀNG) */}
                <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                  {[
                    { id: 'system' as AppModuleId, label: 'Hệ Thống', icon: BarChart3 },
                    { id: 'inside' as AppModuleId, label: 'Bảng Tin', icon: Newspaper },
                    { id: 'calendar' as AppModuleId, label: 'Lịch', icon: Calendar },
                    { id: 'orders' as AppModuleId, label: 'Đơn Hàng', icon: FolderKanban },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectModule(item.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'text-[#F15A24] bg-orange-50 dark:bg-orange-950/60 shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-[#F15A24] dark:hover:text-[#F15A24] hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F15A24]' : 'text-slate-400 group-hover:text-[#F15A24]'}`} />
                        <span className="tracking-wide uppercase text-[11px] sm:text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Right Stack */}
                <div className="flex items-center gap-2 flex-shrink-0 text-xs sm:text-sm">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') window.location.reload();
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center active:scale-90"
                    title="Tải lại / Cập nhật bản build mới nhất (Reset)"
                  >
                    <RotateCw className="w-4 h-4 text-[#F15A24] hover:rotate-180 transition-transform duration-300" />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#F15A24]" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  <div
                    onClick={() => onSelectModule('home')}
                    className="w-7 h-7 rounded-full bg-[#D97706] text-white font-black text-xs flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 transition-transform"
                  >
                    D
                  </div>
                </div>

              </div>
            </header>
          )}

          {/* Main Content Viewport for Desktop */}
          <main className="flex-1 w-full min-h-0 h-full overflow-hidden flex flex-col relative">
            {children}
          </main>
        </div>
      )}

      {/* Odoo Fullscreen App Switcher Modal */}
      <AppLauncherModal
        isOpen={showLauncher}
        onClose={() => setShowLauncher(false)}
        activeModule={activeModule}
        onSelectModule={onSelectModule}
      />

      {/* Login Account Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('avg_logged_user', JSON.stringify(user));
        }}
      />
    </div>
  );
};
