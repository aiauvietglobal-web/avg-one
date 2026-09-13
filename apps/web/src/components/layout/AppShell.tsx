import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutGrid, Plus, Bell, Sun, Moon, Zap, User, Users, ChevronDown, ChevronLeft, CheckCircle2, Home,
  FileText, Newspaper, Target, Layers, BarChart3, LogOut, Shield, MessageSquare, Clock, SlidersHorizontal, Sparkles, Wrench, ArrowLeft, Maximize2, Minimize2, Smartphone, RotateCw, Calendar, FolderKanban, Search, ClipboardCheck, Box
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
  const [calendarTabState, setCalendarTabState] = useState<'talk' | 'work' | 'problem' | 'event'>('talk');
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const calendarDropdownRef = useRef<HTMLDivElement>(null);

  // Đóng hộp Lịch khi chuyển qua phân hệ khác
  useEffect(() => {
    if (activeModule !== 'calendar') {
      setIsCalendarDropdownOpen(false);
    }
  }, [activeModule]);

  // Đóng hộp Lịch khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarDropdownRef.current && !calendarDropdownRef.current.contains(e.target as Node)) {
        setIsCalendarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Chọn đầu mục con Lịch: chuyển tab, đồng bộ dữ liệu và ĐÓNG hộp dropdown
  const handleSelectCalendarSubTab = (tab: 'talk' | 'work' | 'problem' | 'event') => {
    setCalendarTabState(tab);
    setIsCalendarDropdownOpen(false);
    try {
      localStorage.setItem('avg_calendar_active_subapp', tab);
    } catch (e) {}
    onSelectModule('calendar');
    window.dispatchEvent(new CustomEvent('calendar_subapp_change', { detail: tab }));
    setTimeout(() => {
      const btn = document.getElementById(`btn-calendar-subtab-${tab}`);
      if (btn) btn.click();
    }, 50);
  };

  // Click vào nút Lịch: mở/đóng danh sách đầu mục, KHÔNG tự động chuyển giao diện khi chưa ấn vào đầu mục
  const handleToggleCalendarModule = () => {
    setIsSystemDropdownOpen(false);
    setIsOrdersDropdownOpen(false);
    setIsCalendarDropdownOpen(prev => !prev);
  };

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
    setIsCalendarDropdownOpen(false);
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

  // Chọn đầu mục con Đơn hàng từ Header: chuyển đến phân hệ Đơn hàng để theo dõi tổng quan tiến độ
  const handleSelectOrdersSubTab = (tab: 'design' | 'research' | 'sample-h1' | 'legal') => {
    setOrdersTabState(tab);
    setIsOrdersDropdownOpen(false);
    onSelectModule('orders');
    window.dispatchEvent(new CustomEvent('orders_tab_change', { detail: tab }));
    setTimeout(() => {
      const btn = document.getElementById(`btn-orders-subtab-${tab}`);
      if (btn) btn.click();
    }, 50);
  };

  // Click vào nút Đơn hàng: mở/đóng danh sách đầu mục, KHÔNG tự động chuyển giao diện khi chưa ấn vào đầu mục
  const handleToggleOrdersModule = () => {
    setIsSystemDropdownOpen(false);
    setIsCalendarDropdownOpen(false);
    setIsOrdersDropdownOpen(prev => !prev);
  };

  // Lắng nghe sự kiện chuyển sang Không gian làm việc (Hộp Thiết kế) từ màn hình theo dõi tiến độ đơn hàng
  useEffect(() => {
    const handleOpenDesignWorkspace = () => {
      try {
        localStorage.setItem('avg_workflow_submodule', 'design');
      } catch (e) {}
      setActiveSubTitle('3.2 – THIẾT KẾ');
      onSelectModule('rd');
      window.dispatchEvent(new CustomEvent('workflow_submodule_select', { detail: 'design' }));
    };
    window.addEventListener('open_design_workspace', handleOpenDesignWorkspace);
    return () => window.removeEventListener('open_design_workspace', handleOpenDesignWorkspace);
  }, [onSelectModule]);

  const [workflowTabState, setWorkflowTabState] = useState<string>('design');
  const [speechTabState, setSpeechTabState] = useState<string>('direct');
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [activeSubTitle, setActiveSubTitle] = useState<string>(() => {
    try {
      if (activeModule === 'rd' || activeModule === 'workflow') {
        const saved = localStorage.getItem('avg_workflow_submodule');
        if (saved === 'design') return '3.2 – THIẾT KẾ';
        if (saved === 'research') return '3.1 – NGHIÊN CỨU';
      }
    } catch (e) {}
    return '';
  });

  useEffect(() => {
    if (activeModule === 'home') {
      setActiveSubTitle('');
      setIsArrowActive(false);
    } else if (activeModule === 'rd' || activeModule === 'workflow') {
      try {
        const saved = localStorage.getItem('avg_workflow_submodule');
        if (saved === 'design') {
          setActiveSubTitle('3.2 – THIẾT KẾ');
        } else if (saved === 'research') {
          setActiveSubTitle('3.1 – NGHIÊN CỨU');
        } else {
          setActiveSubTitle('');
        }
      } catch (e) {
        setActiveSubTitle('');
      }
    } else {
      setActiveSubTitle('');
      setIsArrowActive(false);
    }
  }, [activeModule]);

  useEffect(() => {
    const handleSubModuleChange = (e: any) => {
      if (activeModule !== 'home' && e.detail !== undefined) {
        setActiveSubTitle(e.detail);
      }
    };
    window.addEventListener('submodule_change', handleSubModuleChange);
    return () => {
      window.removeEventListener('submodule_change', handleSubModuleChange);
    };
  }, [activeModule]);

  // Tab đầu mục chính phân hệ Thiết kế (Đơn hàng, Phẩm, Tồn) & Thanh tìm kiếm nhanh
  const [designNavTab, setDesignNavTab] = useState<'orders' | 'products' | 'inventory'>('orders');
  const [designSearch, setDesignSearch] = useState('');
  const [designCounts, setDesignCounts] = useState({ orders: 3, products: 8, inventory: 8 });

  // Lắng nghe số lượng bản vẽ / đơn hàng đồng bộ từ submodule
  useEffect(() => {
    const handleCounts = (e: any) => {
      if (e.detail) {
        setDesignCounts(prev => ({ ...prev, ...e.detail }));
      }
    };
    window.addEventListener('design_counts_sync', handleCounts);
    return () => window.removeEventListener('design_counts_sync', handleCounts);
  }, []);

  // Lắng nghe sự kiện đồng bộ tab từ submodule
  useEffect(() => {
    const handleDesignTabSync = (e: any) => {
      if (e.detail && ['orders', 'products', 'inventory'].includes(e.detail)) {
        setDesignNavTab(e.detail);
      }
    };
    window.addEventListener('design_subtab_sync', handleDesignTabSync);
    return () => window.removeEventListener('design_subtab_sync', handleDesignTabSync);
  }, []);

  // Shortcut Ctrl + K để focus nhanh vào thanh tìm kiếm trên header
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        const searchInput = document.getElementById('design-quick-search-input');
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Kiểm tra nếu đang đứng ở phân hệ Thiết kế (R&D / Workflow)
  const isDesignModule = activeModule !== 'home' && (activeModule === 'rd' || activeModule === 'workflow' || activeModule === 'orders') && activeSubTitle.includes('THIẾT KẾ');

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

  const renderUserAuthButton = () => (
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
        /* Chưa đăng nhập: Hộp viền cam, chữ cam, bo tròn 3 góc tối đa */
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
  );

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
          {/* UNIFIED HEADER (Logo Chính Thức AVG One + Các phân hệ trên header + Đăng Nhập) */}
          <header className={`flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white transition-all shadow-xs dark:shadow-none ${activeModule === 'home' ? 'border-none' : 'border-b border-slate-200/80 dark:border-slate-800'}`}>
            <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Left: AVG One Official Logo & Sub-module Title & Các đầu mục tích hợp theo phân hệ */}
            <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 whitespace-nowrap">
              <img
                src={avgOfficialLogo}
                alt="AVG One Official Logo"
                className="h-7 sm:h-8 object-contain cursor-pointer pointer-events-auto shrink-0"
                onClick={() => {
                  setActiveSubTitle('');
                  onSelectModule('home');
                }}
                title="Trang chủ AVG One"
              />
              {activeSubTitle && activeModule !== 'home' && (
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
                  <span className="text-slate-300 dark:text-slate-600 font-normal">/</span>
                  <button
                    onClick={() => {
                      setActiveSubTitle('');
                      window.dispatchEvent(new CustomEvent('submodule_back'));
                    }}
                    className="text-xs sm:text-sm font-black text-[#F15A24] dark:text-orange-400 uppercase tracking-wide hover:underline cursor-pointer flex items-center gap-1 group whitespace-nowrap shrink-0"
                    title="Quay lại danh mục phân hệ"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5] text-[#F15A24] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                    <span className="whitespace-nowrap shrink-0">{activeSubTitle}</span>
                  </button>
                </div>
              )}

              {/* TÍCH HỢP ĐẦU MỤC PHÂN HỆ THIẾT KẾ: [ Đơn hàng 3 | Phẩm 8 | Tồn 8 ] + [ Tìm bản vẽ... ] */}
              {isDesignModule && (
                <>
                  <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 h-9 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0 select-none">
                    {[
                      { id: 'orders' as const, label: 'Đơn hàng', count: designCounts.orders, icon: ClipboardCheck },
                      { id: 'products' as const, label: 'Phẩm', count: designCounts.products, icon: Layers },
                      { id: 'inventory' as const, label: 'Tồn', count: designCounts.inventory, icon: Box },
                    ].map((tab) => {
                      const isActive = designNavTab === tab.id;
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setDesignNavTab(tab.id);
                            window.dispatchEvent(new CustomEvent('design_subtab_change', { detail: tab.id }));
                          }}
                          className={`h-7 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                            isActive
                              ? 'bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white shadow-xs font-black'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5 shrink-0" />
                          <span>{tab.label}</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                            isActive ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative hidden xl:flex items-center shrink-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      id="design-quick-search-input"
                      type="text"
                      value={designSearch}
                      onChange={(e) => {
                        setDesignSearch(e.target.value);
                        window.dispatchEvent(new CustomEvent('design_search_change', { detail: e.target.value }));
                      }}
                      placeholder="Tìm bản vẽ..."
                      className="w-32 sm:w-44 focus:w-52 pl-8.5 pr-12 h-9 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-white focus:bg-white dark:focus:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/30 focus:border-[#F15A24] shadow-2xs transition-all duration-200 shrink-0"
                    />
                    <kbd className="absolute right-2 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md pointer-events-none shadow-2xs">
                      Ctrl K
                    </kbd>
                  </div>
                </>
              )}

            </div>

              {/* Right: Phân hệ quản lý vận hành (chữ to hơn, nét mảnh thanh thoát, chỉ viết hoa chữ cái đầu tiên, đặt gần hộp Đăng Nhập) + Hộp Đăng Nhập */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 shrink-0 whitespace-nowrap">
                <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-3.5 shrink-0 whitespace-nowrap">
                  {[
                    { id: 'home' as AppModuleId, aliases: ['home'], label: 'Trang chủ' },
                    { id: 'system' as AppModuleId, aliases: ['system', 'admin'], label: 'Hệ thống' },
                    { id: 'inside' as AppModuleId, aliases: ['inside'], label: 'Bảng tin' },
                    { id: 'calendar' as AppModuleId, aliases: ['calendar'], label: 'Lịch' },
                    { id: 'orders' as AppModuleId, aliases: ['orders', 'wework', 'workflow', 'rd'], label: 'Đơn hàng' },
                  ].map((item) => {
                      const isActive = item.aliases.includes(activeModule);

                      if (item.id === 'system') {
                        const isHighlighted = isActive || isSystemDropdownOpen;
                        return (
                          <div
                            key={item.id}
                            ref={systemDropdownRef}
                            className="relative shrink-0 whitespace-nowrap"
                          >
                            <button
                              onClick={handleToggleSystemModule}
                              style={{ color: isHighlighted ? '#F15A24' : undefined }}
                              className={`relative px-2 sm:px-2.5 py-1 text-sm sm:text-[15px] cursor-pointer select-none tracking-normal flex items-center gap-0.5 whitespace-nowrap shrink-0 ${
                                isHighlighted
                                  ? 'font-bold text-[#F15A24] dark:text-[#F15A24]'
                                  : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#F15A24] dark:hover:text-[#F15A24]'
                              }`}
                            >
                              <span className="relative inline-block whitespace-nowrap">
                                <span
                                  style={{ color: isHighlighted ? '#F15A24' : undefined }}
                                  className="relative z-10 transition-colors duration-150 inline-block whitespace-nowrap"
                                >
                                  {item.label}
                                </span>
                                {/* Line ngắn dưới chân chữ (cố định khi active hoặc khi mở dropdown) */}
                                {isHighlighted && (
                                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-[2px] bg-[#F15A24] rounded-full" />
                                )}
                              </span>
                              <ChevronDown
                                style={{ color: isHighlighted ? '#F15A24' : undefined }}
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${isSystemDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                              />
                            </button>

                            {/* Dropdown Menu for Hệ thống */}
                            {isSystemDropdownOpen && (
                              <div className="absolute top-full left-2.5 sm:left-3 mt-1.5 w-52 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-xl p-1 z-50 animate-dropdown-slide">
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

                      if (item.id === 'calendar') {
                        const isHighlighted = isActive || isCalendarDropdownOpen;
                        return (
                          <div
                            key={item.id}
                            ref={calendarDropdownRef}
                            className="relative"
                          >
                            <button
                              onClick={handleToggleCalendarModule}
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
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${isCalendarDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                              />
                            </button>

                            {/* Dropdown Menu for Lịch */}
                            {isCalendarDropdownOpen && (
                              <div className="absolute top-full left-2.5 sm:left-3 mt-1.5 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-xl p-1 z-50 animate-dropdown-slide">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectCalendarSubTab('talk');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && calendarTabState === 'talk'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Lịch trao đổi</span>
                                  {isActive && calendarTabState === 'talk' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectCalendarSubTab('work');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && calendarTabState === 'work'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Lịch công tác</span>
                                  {isActive && calendarTabState === 'work' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectCalendarSubTab('problem');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && calendarTabState === 'problem'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Lịch tháo gỡ vướng mắc</span>
                                  {isActive && calendarTabState === 'problem' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectCalendarSubTab('event');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isActive && calendarTabState === 'event'
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Lịch sự kiện hệ thống</span>
                                  {isActive && calendarTabState === 'event' && (
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
                              <div className="absolute top-full left-2.5 sm:left-3 mt-1.5 w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-xl p-1 z-50 animate-dropdown-slide">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOrdersSubTab('design');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    (isActive && ordersTabState === 'design') || activeSubTitle.includes('THIẾT KẾ')
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Thiết kế</span>
                                  {((isActive && ordersTabState === 'design') || activeSubTitle.includes('THIẾT KẾ')) && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOrdersSubTab('research');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    (isActive && ordersTabState === 'research') || activeSubTitle.includes('NGHIÊN CỨU')
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                                      : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="text-slate-900 dark:text-white font-medium">Nghiên cứu</span>
                                  {((isActive && ordersTabState === 'research') || activeSubTitle.includes('NGHIÊN CỨU')) && (
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
                            setIsCalendarDropdownOpen(false);
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

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={onToggleDarkMode}
                    className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-center text-slate-600 dark:text-amber-400 transition-colors shadow-2xs cursor-pointer"
                    title={darkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>

                  {/* SSO Profile / Login Button */}
                  {renderUserAuthButton()}
                </div>

              </div>
            </header>

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
