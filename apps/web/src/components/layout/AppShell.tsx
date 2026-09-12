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
  const [systemTabState, setSystemTabState] = useState<'annual-plan' | 'executive-directive'>('annual-plan');
  const [isSystemDropdownOpen, setIsSystemDropdownOpen] = useState(false);
  const systemDropdownRef = useRef<HTMLDivElement>(null);

  // Đóng hộp khi chuyển qua phân hệ khác
  useEffect(() => {
    if (activeModule !== 'system' && activeModule !== 'admin') {
      setIsSystemDropdownOpen(false);
    }
  }, [activeModule]);

  // Đóng hộp khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (systemDropdownRef.current && !systemDropdownRef.current.contains(e.target as Node)) {
        setIsSystemDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Chọn đầu mục con: chuyển tab, đồng bộ dữ liệu và ĐÓNG hộp dropdown
  const handleSelectSystemSubTab = (tab: 'annual-plan' | 'executive-directive') => {
    setSystemTabState(tab);
    setIsSystemDropdownOpen(false);
    onSelectModule('system');
    window.dispatchEvent(new CustomEvent('system_tab_change', { detail: tab }));
    const btn = document.getElementById(`btn-system-subtab-${tab}`);
    if (btn) btn.click();
  };

  // Click vào nút Hệ thống: mở/đóng danh sách đầu mục, KHÔNG tự động chuyển giao diện khi chưa ấn vào đầu mục
  const handleToggleSystemModule = () => {
    setIsOrdersDropdownOpen(false);
    setIsSystemDropdownOpen(prev => !prev);
  };

  // Đơn hàng dropdown state & ref
  const [ordersTabState, setOrdersTabState] = useState<'design' | 'research' | 'sample-h1' | 'legal'>('design');
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const ordersDropdownRef = useRef<HTMLDivElement>(null);

  // Đóng hộp Đơn hàng khi chuyển qua phân hệ khác
  useEffect(() => {
    if (activeModule !== 'orders' && activeModule !== 'wework') {
      setIsOrdersDropdownOpen(false);
    }
  }, [activeModule]);

  // Đóng hộp Đơn hàng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(e.target as Node)) {
        setIsOrdersDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Chọn đầu mục con Đơn hàng: chuyển tab, đồng bộ dữ liệu và ĐÓNG hộp dropdown
  const handleSelectOrdersSubTab = (tab: 'design' | 'research' | 'sample-h1' | 'legal') => {
    setOrdersTabState(tab);
    setIsOrdersDropdownOpen(false);
    onSelectModule('orders');
    window.dispatchEvent(new CustomEvent('orders_tab_change', { detail: tab }));
    const btn = document.getElementById(`btn-orders-subtab-${tab}`);
    if (btn) btn.click();
  };

  // Click vào nút Đơn hàng: mở/đóng danh sách đầu mục, KHÔNG tự động chuyển giao diện khi chưa ấn vào đầu mục
  const handleToggleOrdersModule = () => {
    setIsSystemDropdownOpen(false);
    setIsOrdersDropdownOpen(prev => !prev);
  };

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
          {['home', 'system', 'admin', 'inside', 'calendar', 'orders', 'wework'].includes(activeModule) ? (
            /* UNIFIED HEADER (Logo Chính Thức AVG One + Các phân hệ trên header + Đăng Nhập) */
            <header className={`flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none ${activeModule === 'home' ? 'border-none' : 'border-b border-slate-200/80 dark:border-slate-800'}`}>
              <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-6">
                
                {/* Left: AVG One Official Logo (Hiển thị tĩnh, không hiệu ứng hover/zoom, không tính năng click) */}
                <div className="flex items-center gap-3 select-none">
                  <img
                    src={avgOfficialLogo}
                    alt="AVG One Official Logo"
                    className="h-7 sm:h-8 object-contain pointer-events-none"
                  />
                </div>

                {/* Right: Phân hệ quản lý vận hành (chữ to hơn, nét mảnh thanh thoát, chỉ viết hoa chữ cái đầu tiên, đặt gần hộp Đăng Nhập) + Hộp Đăng Nhập */}
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                  <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-6">
                    {[
                      { id: 'home' as AppModuleId, aliases: ['home'], label: 'Trang chủ' },
                      { id: 'system' as AppModuleId, aliases: ['system', 'admin'], label: 'Hệ thống' },
                      { id: 'inside' as AppModuleId, aliases: ['inside'], label: 'Bảng tin' },
                      { id: 'calendar' as AppModuleId, aliases: ['calendar'], label: 'Lịch' },
                      { id: 'orders' as AppModuleId, aliases: ['orders', 'wework'], label: 'Đơn hàng' },
                    ].map((item) => {
                      const isActive = item.aliases.includes(activeModule);

                      if (item.id === 'system') {
                        const isHighlighted = isActive || isSystemDropdownOpen;
                        return (
                          <div
                            key={item.id}
                            ref={systemDropdownRef}
                            className="relative"
                          >
                            <button
                              onClick={handleToggleSystemModule}
                              style={{ color: isHighlighted ? '#F15A24' : undefined }}
                              className={`relative px-2.5 sm:px-3 py-1.5 text-base sm:text-[17px] cursor-pointer select-none tracking-normal flex items-center gap-1 ${
                                isHighlighted
                                  ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                                  : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                              }`}
                            >
                              <span className="relative inline-block">
                                <span
                                  style={{ color: isHighlighted ? '#F15A24' : undefined }}
                                  className="relative z-10 transition-colors duration-150 inline-block"
                                >
                                  {item.label}
                                </span>
                                {/* Line ngắn dưới chân chữ (cố định khi active hoặc khi mở dropdown) */}
                                {isHighlighted && (
                                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                                )}
                              </span>
                              <ChevronDown
                                style={{ color: isHighlighted ? '#F15A24' : undefined }}
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${isSystemDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                              />
                            </button>

                            {/* Dropdown Menu for Hệ thống */}
                            {isSystemDropdownOpen && (
                              <div className="absolute top-full left-2.5 sm:left-3 mt-1.5 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg p-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSystemSubTab('annual-plan');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && systemTabState === 'annual-plan'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Kế hoạch năm</span>
                                  {isActive && systemTabState === 'annual-plan' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSystemSubTab('executive-directive');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && systemTabState === 'executive-directive'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Thông điệp điều hành</span>
                                  {isActive && systemTabState === 'executive-directive' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (item.id === 'orders') {
                        const isHighlighted = isActive || isOrdersDropdownOpen;
                        return (
                          <div
                            key={item.id}
                            ref={ordersDropdownRef}
                            className="relative"
                          >
                            <button
                              onClick={handleToggleOrdersModule}
                              style={{ color: isHighlighted ? '#F15A24' : undefined }}
                              className={`relative px-2.5 sm:px-3 py-1.5 text-base sm:text-[17px] cursor-pointer select-none tracking-normal flex items-center gap-1 ${
                                isHighlighted
                                  ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                                  : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                              }`}
                            >
                              <span className="relative inline-block">
                                <span
                                  style={{ color: isHighlighted ? '#F15A24' : undefined }}
                                  className="relative z-10 transition-colors duration-150 inline-block"
                                >
                                  {item.label}
                                </span>
                                {/* Line ngắn dưới chân chữ (cố định khi active hoặc khi mở dropdown) */}
                                {isHighlighted && (
                                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                                )}
                              </span>
                              <ChevronDown
                                style={{ color: isHighlighted ? '#F15A24' : undefined }}
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${isOrdersDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                              />
                            </button>

                            {/* Dropdown Menu for Đơn hàng */}
                            {isOrdersDropdownOpen && (
                              <div className="absolute top-full left-2.5 sm:left-3 mt-1.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg p-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOrdersSubTab('design');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && ordersTabState === 'design'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Thiết kế</span>
                                  {isActive && ordersTabState === 'design' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOrdersSubTab('research');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && ordersTabState === 'research'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Nghiên cứu</span>
                                  {isActive && ordersTabState === 'research' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOrdersSubTab('sample-h1');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && ordersTabState === 'sample-h1'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Mẫu H1</span>
                                  {isActive && ordersTabState === 'sample-h1' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOrdersSubTab('legal');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && ordersTabState === 'legal'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Pháp lý</span>
                                  {isActive && ordersTabState === 'legal' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setIsSystemDropdownOpen(false);
                            setIsOrdersDropdownOpen(false);
                            onSelectModule(item.id);
                          }}
                          style={{ color: isActive ? '#F15A24' : undefined }}
                          className={`relative px-2.5 sm:px-3 py-1.5 text-base sm:text-[17px] cursor-pointer select-none tracking-normal ${
                            isActive
                              ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                              : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                          }`}
                        >
                          <span className="relative inline-block">
                            <span
                              style={{ color: isActive ? '#F15A24' : undefined }}
                              className="relative z-10 transition-colors duration-150 inline-block"
                            >
                              {item.label}
                            </span>
                            {/* Line ngắn dưới chân chữ (cố định khi active) */}
                            {isActive && (
                              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* SSO Profile / Login Button */}
                  <div className="relative">
                    {currentUser ? (
                      /* Đã đăng nhập: Chỉ hiển thị Avatar hình tròn */
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F15A24] hover:bg-[#d94e1f] text-white font-black text-xs sm:text-sm flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer focus:outline-none"
                        title={`${currentUser.name} (${currentUser.role})`}
                      >
                        {currentUser.name.charAt(0)}
                      </button>
                    ) : (
                      /* Chưa đăng nhập: Hộp viền cam, chữ cam, bo tròn 3 góc tối đa (trừ góc dưới cùng bên trái bỏ bo góc), hộp nhỏ gọn hơn */
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="btn-speech-bubble px-4 sm:px-5 py-1 sm:py-1.5 bg-transparent hover:bg-orange-50 dark:hover:bg-orange-950/40 active:scale-95 text-[#F15A24] dark:text-[#F15A24] font-bold text-sm sm:text-[15px] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-[#F15A24] select-none flex items-center justify-center"
                        style={{
                          borderTopLeftRadius: '9999px',
                          borderTopRightRadius: '9999px',
                          borderBottomRightRadius: '9999px',
                          borderBottomLeftRadius: '0px'
                        }}
                        title="Đăng nhập tài khoản AVG One"
                      >
                        <span className="font-bold text-[#F15A24] tracking-wide">
                          Đăng Nhập
                        </span>
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

                {/* Right Stack: SSO Avatar back to Home */}
                <div className="flex items-center gap-2 flex-shrink-0 text-xs sm:text-sm">
                  <div
                    onClick={() => onSelectModule('home')}
                    className="w-8 h-8 rounded-full bg-[#D97706] text-white font-black text-xs flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 transition-transform"
                    title="Về Trang Chủ"
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
