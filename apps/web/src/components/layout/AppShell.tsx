import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutGrid, Search, Plus, Bell, Sun, Moon, Zap, User, Users, ChevronDown, ChevronLeft, CheckCircle2, Home,
  FileText, Newspaper, Target, Layers, BarChart3, LogOut, Shield, MessageSquare, Clock, SlidersHorizontal, Sparkles, Wrench, ArrowLeft, Maximize2, Minimize2
} from 'lucide-react';
import { AppLauncherModal, AppModuleId, APP_MODULES } from './AppLauncherModal';
import { LoginModal, UserProfile } from '../auth/LoginModal';
import avgOfficialLogo from '../../assets/avg-one-official-logo.png';

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
  const [showLauncher, setShowLauncher] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Keyboard Shortcuts: F11 or (Ctrl+Shift+F) or (Alt+F) for Fullscreen, Ctrl+K for Search
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

      // Shortcut Ctrl + K for search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.getElementById('odoo-universal-search');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentApp = APP_MODULES.find(m => m.id === activeModule) || APP_MODULES[0];

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col font-sans antialiased bg-white dark:bg-slate-950 text-[#333333] dark:text-slate-100 transition-colors duration-200">
      
      {/* HEADER RENDERING: HOME HEADER VS SUB-MODULE ODOO HEADER */}
      {activeModule === 'home' ? (
        /* HOME PAGE HEADER (Logo Chính Thức AVG One + Search + SSO - Không Đường Phân Cách) */
        <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-[#2C1D29] text-slate-800 dark:text-white border-none transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 sm:h-13 flex items-center justify-between gap-4">
            
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
                  className="h-6 sm:h-7 object-contain group-hover:scale-105 transition-transform"
                />
              </button>
            </div>

            {/* Center: Odoo Universal Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="odoo-universal-search"
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 focus:bg-white transition shadow-xs placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Right: Fullscreen Toggle Button + SSO Profile Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center"
                title={isFullscreen ? "Thoát toàn màn hình (F11 / Alt+F)" : "Mở rộng toàn màn hình (F11 / Alt+F)"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#F15A24]" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <div className="relative">
                {currentUser ? (
                  /* Đã đăng nhập: Chỉ hiển thị Avatar hình tròn (Bỏ hộp đen & bỏ chữ) */
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F15A24] hover:bg-[#d94e1f] text-white font-black text-xs sm:text-sm flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer focus:outline-none"
                    title={`${currentUser.name} (${currentUser.role})`}
                  >
                    {currentUser.name.charAt(0)}
                  </button>
                ) : (
                  /* Chưa đăng nhập: Hộp màu cam, Chữ Đăng nhập, BỎ MŨI TÊN theo chỉ định */
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-3.5 py-1.5 bg-[#F15A24] hover:bg-[#d94e1f] active:scale-95 text-white font-extrabold text-[11px] rounded-lg transition shadow-sm border border-[#F15A24] cursor-pointer"
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
        /* SUB-MODULE TOPBAR HEADER (MỞ RỘNG HEADER, THU NHỎ GỌN TÍNH NĂNG CHUYÊN NGHIỆP) */
        <header className="flex-shrink-0 sticky top-0 z-40 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-xs">
          <div className="w-full px-4 sm:px-6 h-11 sm:h-12 flex items-center justify-between gap-4 text-xs sm:text-sm font-medium">
            
            {/* Left Stack: 9-Dots App Switcher + TÊN PHÂN HỆ "LỊCH" TO RỰC RỠ + ĐẦU MỤC FONT TO */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 mr-2 h-full">
              <button
                onClick={() => setShowLauncher(true)}
                className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-[#F15A24] dark:text-orange-400 transition flex items-center justify-center flex-shrink-0 cursor-pointer"
                title="Mở danh mục Tất cả Ứng dụng AVG One"
              >
                <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* TÊN PHÂN HỆ HÀNG ĐẦU (KHI Ở PHÂN HỆ CON, TÊN PHÂN HỆ CON THAY THẾ HOÀN TOÀN VÀ XEM NHƯ 1 PHÂN HỆ LỚN ĐỘC LẬP) */}
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
                title={isArrowActive ? (activeSubTitle ? "Ấn lần nữa để quay lại danh mục Phân Hệ Con" : "Ấn lần nữa để thoát ra Trang Chủ") : "Ấn để hiện mũi tên quay về"}
              >
                {isArrowActive && (
                  <ChevronLeft className="w-5 h-5 stroke-[2.5] text-[#F15A24] dark:text-orange-400" />
                )}
                <span>
                  {activeSubTitle || (currentApp.name === 'Lịch' ? 'LỊCH' : currentApp.name)}
                </span>
              </button>

              {/* VÁCH NGĂN CHỈ HIỆN KHI CÓ ĐẦU MỤC THÀNH PHẦN */}
              {(activeModule === 'system' || activeModule === 'admin') && (
                <div className="h-4 sm:h-4.5 w-0.5 bg-slate-300 dark:bg-slate-700 flex-shrink-0" />
              )}

              {/* ĐẦU MỤC CHO PHÂN HỆ HỆ THỐNG (KẾ HOẠCH NĂM, THÔNG ĐIỆP ĐIỀU HÀNH & QUẢN TRỊ IT) */}
              {(activeModule === 'system' || activeModule === 'admin') && (
                <AnimatedHeaderTabs
                  activeId={systemTabState}
                  tabs={[
                    {
                      id: 'annual-plan',
                      label: 'Kế hoạch năm',
                      domId: 'btn-appshell-system-annual-plan',
                      onClick: () => {
                        setSystemTabState('annual-plan');
                        const btn = document.getElementById('btn-system-subtab-annual-plan');
                        if (btn) btn.click();
                      }
                    },
                    {
                      id: 'executive-message',
                      label: 'Thông điệp điều hành',
                      domId: 'btn-appshell-system-executive-message',
                      onClick: () => {
                        setSystemTabState('executive-message');
                        const btn = document.getElementById('btn-system-subtab-executive-message');
                        if (btn) btn.click();
                      }
                    },
                    {
                      id: 'it-admin',
                      label: 'Quản trị IT',
                      domId: 'btn-appshell-system-it-admin',
                      onClick: () => {
                        setSystemTabState('it-admin');
                        const btn = document.getElementById('btn-system-subtab-it-admin');
                        if (btn) btn.click();
                      }
                    }
                  ]}
                />
              )}

              {/* GỘP CÁC ĐẦU MỤC VỚI HIỆU ỨNG LINE DƯỚI CHÂN CẠNH HEADER & CHUYỂN ĐỘNG TRƯỢT */}
              {activeModule === 'hr' && (
                <AnimatedHeaderTabs
                  activeId={hrTabState}
                  tabs={[
                    {
                      id: 'employees',
                      label: 'Nhân sự & sơ đồ',
                      domId: 'btn-appshell-hr-employees',
                      onClick: () => {
                        setHrTabState('employees');
                        const btn = document.getElementById('btn-hr-subtab-employees');
                        if (btn) btn.click();
                      }
                    },
                    {
                      id: 'attendance',
                      label: 'Chấm công & ca làm',
                      domId: 'btn-appshell-hr-attendance',
                      onClick: () => {
                        setHrTabState('attendance');
                        const btn = document.getElementById('btn-hr-subtab-attendance');
                        if (btn) btn.click();
                      }
                    },
                    {
                      id: 'payroll',
                      label: 'Lương & thu nhập',
                      domId: 'btn-appshell-hr-payroll',
                      onClick: () => {
                        setHrTabState('payroll');
                        const btn = document.getElementById('btn-hr-subtab-payroll');
                        if (btn) btn.click();
                      }
                    },
                    {
                      id: 'ownership',
                      label: 'Phân quyền & đầu mối',
                      domId: 'btn-appshell-hr-ownership',
                      onClick: () => {
                        setHrTabState('ownership');
                        const btn = document.getElementById('btn-hr-subtab-ownership');
                        if (btn) btn.click();
                      }
                    },
                    {
                      id: 'documents',
                      label: 'Hồ sơ & lưu trữ',
                      domId: 'btn-appshell-hr-documents',
                      onClick: () => {
                        setHrTabState('documents');
                        const btn = document.getElementById('btn-hr-subtab-documents');
                        if (btn) btn.click();
                      }
                    }
                  ]}
                />
              )}

              {/* ĐẦU MỤC CHO PHÂN HỆ LỊCH (Đã gỡ bỏ theo chỉ định) */}


            </div>

            {/* Right Stack: FULLSCREEN TOGGLE + PROFILE AVATAR ONLY */}
            <div className="flex items-center gap-2 flex-shrink-0 text-xs sm:text-sm">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center"
                title={isFullscreen ? "Thoát toàn màn hình (F11 / Alt+F)" : "Mở rộng toàn màn hình (F11 / Alt+F)"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#F15A24]" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Avatar circle with letter 'D' */}
              <div
                onClick={() => onSelectModule('home')}
                className="w-7 h-7 rounded-full bg-[#D97706] text-white font-black text-xs flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 transition-transform"
                title="Tài khoản Nhân sự AVG"
              >
                D
              </div>

            </div>

          </div>
        </header>
      )}

      {/* Main Content Viewport - Locked 100% height flex container for all modules */}
      <main className="flex-1 w-full min-h-0 h-full overflow-hidden flex flex-col">
        {children}
      </main>

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
