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
import {
  HomeHeader, AppsHeader, DesignHeader, StandardModuleHeader,
  HRHeader, LegalHeader, FinanceHeader, RDHeader,
  SpeechToTextHeader, DashboardHeader, HubDetailHeader,
  HRNavTab, LegalNavTab, FinanceNavTab, RDNavTab, AppsNavTab,
  SpeechNavTab, DashboardNavTab
} from './headers';

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
  const [hrNavTab, setHrNavTab] = useState<HRNavTab>('employees');
  const [legalNavTab, setLegalNavTab] = useState<LegalNavTab>('all');
  const [financeNavTab, setFinanceNavTab] = useState<FinanceNavTab>('all');
  const [rdNavTab, setRdNavTab] = useState<RDNavTab>('overview');
  const [appsNavTab, setAppsNavTab] = useState<AppsNavTab>('overview');
  const [speechNavTab, setSpeechNavTab] = useState<SpeechNavTab>('chat');
  const [dashboardNavTab, setDashboardNavTab] = useState<DashboardNavTab>('overview');
  const [speechIsRecording, setSpeechIsRecording] = useState<boolean>(false);
  const [hubDetailTab, setHubDetailTab] = useState<string>('home');

  // Khởi tạo tab mặc định tương ứng khi chuyển sang 1 trong 6 phân hệ mới
  useEffect(() => {
    if (activeModule === 'cluster51') setHubDetailTab('home');
    else if (activeModule === 'clusterK') setHubDetailTab('home');
    else if (activeModule === 'infra22') setHubDetailTab('equipment');
    else if (activeModule === 'security') setHubDetailTab('monitoring');
    else if (activeModule === 'traffic8') setHubDetailTab('bottlenecks');
    else if (activeModule === 'profile9') setHubDetailTab('overview');
  }, [activeModule]);

  // Lắng nghe trạng thái thu âm từ phân hệ Chuyển đổi trực tiếp
  useEffect(() => {
    const handleSpeechRec = (e: any) => {
      if (e.detail?.isRecording !== undefined) {
        setSpeechIsRecording(e.detail.isRecording);
      }
    };
    window.addEventListener('speech_recording_status', handleSpeechRec);
    return () => window.removeEventListener('speech_recording_status', handleSpeechRec);
  }, []);

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

  // Lắng nghe sự kiện quay về Trang chủ từ Header phân hệ con
  useEffect(() => {
    const handleGoHome = () => {
      setActiveSubTitle('');
      onSelectModule('home');
    };
    window.addEventListener('go_home', handleGoHome);
    return () => window.removeEventListener('go_home', handleGoHome);
  }, [onSelectModule]);

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

  // Lắng nghe sự kiện đồng bộ tab từ SpeechToTextModule
  useEffect(() => {
    const handleSpeechTabSync = (e: any) => {
      if (e.detail) {
        setSpeechNavTab(e.detail);
      }
    };
    window.addEventListener('speech_tab_sync', handleSpeechTabSync);
    return () => window.removeEventListener('speech_tab_sync', handleSpeechTabSync);
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
  const isDesignModule = activeModule !== 'home' && (activeModule === 'rd' || activeModule === 'workflow') && activeSubTitle.includes('THIẾT KẾ');

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
          {/* HỆ THỐNG HEADER ĐỘC LẬP TÁCH BIỆT CHO TỪNG PHÂN HỆ */}
          {activeModule === 'home' || activeModule === 'system' || activeModule === 'admin' || activeModule === 'inside' || activeModule === 'calendar' || activeModule === 'orders' ? (
            /* 1. HEADER CÁC PHÂN HỆ QUẢN TRỊ VẬN HÀNH (TRANG CHỦ, HỆ THỐNG, BẢNG TIN, LỊCH, ĐƠN HÀNG): GIỮ NGUYÊN 100% BỐ CỤC */
            <StandardModuleHeader
              activeModule={activeModule}
              activeSubTitle={activeSubTitle}
              onSelectModule={onSelectModule}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : isDesignModule ? (
            /* 2. HEADER PHÂN HỆ THIẾT KẾ: TABS ĐƠN HÀNG/PHẨM/TỒN, QUICK SEARCH, PILL BACK */
            <DesignHeader
              activeSubTitle={activeSubTitle}
              onBack={() => {
                setActiveSubTitle('');
                window.dispatchEvent(new CustomEvent('submodule_back'));
              }}
              onGoHome={() => {
                setActiveSubTitle('');
                onSelectModule('home');
              }}
              designNavTab={designNavTab}
              onSelectDesignTab={(tab) => {
                setDesignNavTab(tab);
                window.dispatchEvent(new CustomEvent('design_subtab_change', { detail: tab }));
              }}
              designSearch={designSearch}
              onDesignSearchChange={(val) => {
                setDesignSearch(val);
                window.dispatchEvent(new CustomEvent('design_search_change', { detail: val }));
              }}
              designCounts={designCounts}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : activeModule === 'apps' ? (
            activeSubTitle === 'CHUYỂN ĐỔI TRỰC TIẾP' ? (
              /* 3A. HEADER ĐỘC LẬP CHO PHÂN HỆ CHUYỂN ĐỔI TRỰC TIẾP */
              <SpeechToTextHeader
                onBack={() => {
                  setActiveSubTitle('');
                  window.dispatchEvent(new CustomEvent('submodule_back'));
                }}
                onGoHome={() => {
                  setActiveSubTitle('');
                  onSelectModule('home');
                }}
                speechNavTab={speechNavTab}
                onSelectSpeechTab={(tab) => {
                  setSpeechNavTab(tab);
                  window.dispatchEvent(new CustomEvent('speech_tab_change', { detail: tab }));
                }}
                isRecording={speechIsRecording}
                onToggleRecording={() => {
                  window.dispatchEvent(new CustomEvent('speech_toggle_recording'));
                }}
                darkMode={darkMode}
                onToggleDarkMode={onToggleDarkMode}
                renderUserAuthButton={renderUserAuthButton}
              />
            ) : activeSubTitle === 'BÁO CÁO QUẢN TRỊ' ? (
              /* 3B. HEADER ĐỘC LẬP CHO PHÂN HỆ BÁO CÁO QUẢN TRỊ */
              <DashboardHeader
                onBack={() => {
                  setActiveSubTitle('');
                  window.dispatchEvent(new CustomEvent('submodule_back'));
                }}
                onGoHome={() => {
                  setActiveSubTitle('');
                  onSelectModule('home');
                }}
                dashboardNavTab={dashboardNavTab}
                onSelectDashboardTab={(tab) => {
                  setDashboardNavTab(tab);
                  window.dispatchEvent(new CustomEvent('dashboard_tab_change', { detail: tab }));
                }}
                onExportReport={() => {
                  window.dispatchEvent(new CustomEvent('dashboard_export_report'));
                }}
                darkMode={darkMode}
                onToggleDarkMode={onToggleDarkMode}
                renderUserAuthButton={renderUserAuthButton}
              />
            ) : (
              /* 3C. HEADER KHO ỨNG DỤNG TỔNG QUAN: TẤT CẢ / ĐÃ SẴN SÀNG / SẮP PHÁT HÀNH */
              <AppsHeader
                activeSubTitle={activeSubTitle}
                onBack={() => onSelectModule('home')}
                onGoHome={() => {
                  setActiveSubTitle('');
                  onSelectModule('home');
                }}
                onSelectModule={onSelectModule}
                appsNavTab={appsNavTab}
                onSelectAppsTab={(tab) => {
                  setAppsNavTab(tab);
                  window.dispatchEvent(new CustomEvent('apps_nav_tab_change', { detail: tab }));
                }}
                darkMode={darkMode}
                onToggleDarkMode={onToggleDarkMode}
                renderUserAuthButton={renderUserAuthButton}
              />
            )
          ) : activeModule === 'hr' || activeModule === 'goal' ? (
            /* 4. HEADER PHÂN HỆ NHÂN SỰ: 🏠 NHÂN SỰ + TABS QUẢN LÝ + THÊM NHÂN SỰ */
            <HRHeader
              onBack={() => onSelectModule('home')}
              onGoHome={() => onSelectModule('home')}
              hrNavTab={hrNavTab}
              onSelectHRTab={(tab) => {
                setHrNavTab(tab);
                window.dispatchEvent(new CustomEvent('hr_tab_change', { detail: tab }));
              }}
              onAddEmployee={() => {
                window.dispatchEvent(new CustomEvent('hr_add_employee'));
              }}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : activeModule === 'legal' ? (
            /* 5. HEADER PHÂN HỆ PHÁP LÝ & SHTT: 🏠 PHÁP LÝ + TABS HỒ SƠ SHTT + TẠO HỒ SƠ */
            <LegalHeader
              onBack={() => onSelectModule('home')}
              onGoHome={() => onSelectModule('home')}
              legalNavTab={legalNavTab}
              onSelectLegalTab={(tab) => {
                setLegalNavTab(tab);
                window.dispatchEvent(new CustomEvent('legal_tab_change', { detail: tab }));
              }}
              onCreateOrder={() => {
                window.dispatchEvent(new CustomEvent('legal_create_order'));
              }}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : activeModule === 'finance' || activeModule === 'request' ? (
            /* 6. HEADER PHÂN HỆ TÀI CHÍNH & PHÊ DUYỆT: 🏠 TÀI CHÍNH + TABS ĐỀ XUẤT + TẠO ĐỀ XUẤT */
            <FinanceHeader
              onBack={() => onSelectModule('home')}
              onGoHome={() => onSelectModule('home')}
              financeNavTab={financeNavTab}
              onSelectFinanceTab={(tab) => {
                setFinanceNavTab(tab);
                window.dispatchEvent(new CustomEvent('finance_tab_change', { detail: tab }));
              }}
              onCreateRequest={() => {
                window.dispatchEvent(new CustomEvent('finance_create_request'));
              }}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : activeModule === 'rd' || activeModule === 'workflow' ? (
            /* 7. HEADER PHÂN HỆ RDI: 🏠 RDI */
            <RDHeader
              onBack={() => onSelectModule('home')}
              onGoHome={() => onSelectModule('home')}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : ['infra22', 'cluster51', 'security', 'traffic8', 'profile9', 'clusterK'].includes(activeModule) ? (
            /* 7B. HEADER 6 PHÂN HỆ HẠ TẦNG & ĐẦU MỐI: [ 🏠 TÊN PHÂN HỆ ] + BOX TABS + ACTIONS */
            <HubDetailHeader
              activeModule={activeModule}
              activeTab={hubDetailTab}
              onSelectTab={(tab) => {
                setHubDetailTab(tab);
                window.dispatchEvent(new CustomEvent('hub_tab_change', { detail: { module: activeModule, tab } }));
              }}
              onGoHome={() => onSelectModule('home')}
              onActionClick={() => {
                window.dispatchEvent(new CustomEvent('hub_action_click', { detail: { module: activeModule, tab: hubDetailTab } }));
              }}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              renderUserAuthButton={renderUserAuthButton}
            />
          ) : (
            /* 8. HEADER CÁC PHÂN HỆ VẬN HÀNH KHÁC (HỆ THỐNG, BẢNG TIN, LỊCH, ĐƠN HÀNG) */
            <StandardModuleHeader
              activeModule={activeModule}
              activeSubTitle={activeSubTitle}
              onSelectModule={onSelectModule}
              renderUserAuthButton={renderUserAuthButton}
            />
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
