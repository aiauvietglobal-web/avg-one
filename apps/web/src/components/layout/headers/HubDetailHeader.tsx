import React from 'react';
import {
  Home, Plus, Server, Wrench, Activity, SlidersHorizontal,
  Workflow, Target, CheckCircle2, FileText, ShieldCheck, Key, Database,
  AlertTriangle, Zap, Globe, GitBranch, BarChart3, Award, Building2,
  BadgeCheck, FolderKanban, Layers, Hash, Sparkles, Download, Inbox, Rocket,
  Package, Cpu, ClipboardCheck, Box, Search
} from 'lucide-react';
import { AppModuleId } from '../AppLauncherModal';

export interface HubTabConfig {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface HubModuleMeta {
  title: string;
  tabs: HubTabConfig[];
  actionLabel: string;
  actionIcon: React.ElementType;
  onAction?: () => void;
}

export const HUB_MODULE_CONFIGS: Record<string, HubModuleMeta> = {
  infra22: {
    title: 'HẠ TẦNG 2.2',
    tabs: [
      { id: 'equipment', label: 'Máy Móc Thiết Bị', icon: Wrench },
      { id: 'health', label: 'Sức Khỏe Hạ Tầng', icon: Activity },
      { id: 'maintenance', label: 'Bảo Trì Kỹ Thuật', icon: SlidersHorizontal },
      { id: 'inventory', label: 'Cấp Phát Thiết Bị', icon: Server }
    ],
    actionLabel: '+ Đề Xuất Thiết Bị',
    actionIcon: Plus
  },
  cluster51: {
    title: 'CỤM 5.1',
    tabs: [
      { id: 'pilot51b', label: '5.1B ĐẦU VÀO', icon: Inbox },
      { id: 'acceptance51t', label: '5.1T ĐẦU RA', icon: Rocket }
    ],
    actionLabel: '',
    actionIcon: Plus
  },
  security: {
    title: 'BẢO MẬT',
    tabs: [
      { id: 'monitoring', label: 'Giám Sát An Ninh', icon: ShieldCheck },
      { id: 'rbac', label: 'Phân Quyền & Audit', icon: Key },
      { id: 'backup', label: 'Sao Lưu 1-Click', icon: Database },
      { id: 'threats', label: 'Cảnh Báo Rủi Ro', icon: AlertTriangle }
    ],
    actionLabel: '+ Quét Bảo Mật',
    actionIcon: ShieldCheck
  },
  traffic8: {
    title: 'THÔNG',
    tabs: [
      { id: 'bottlenecks', label: 'Xử Lý Điểm Nghẽn', icon: Zap },
      { id: 'external', label: 'Kết Nối Thương Ngoại', icon: Globe },
      { id: 'flows', label: 'Luồng Tác Nghiệp', icon: GitBranch },
      { id: 'reports', label: 'Báo Cáo Tắc Nghẽn', icon: BarChart3 }
    ],
    actionLabel: '+ Báo Điểm Nghẽn',
    actionIcon: Plus
  },
  profile9: {
    title: 'HỒ SƠ NĂNG LỰC',
    tabs: [
      { id: 'overview', label: 'Bức Tranh Tổng Thể', icon: Building2 },
      { id: 'rd_capacity', label: 'Năng Lực R&D & SX', icon: Award },
      { id: 'ip_certs', label: 'Chứng Nhận SHTT', icon: BadgeCheck },
      { id: 'key_projects', label: 'Dự Án Tiêu Biểu', icon: FolderKanban }
    ],
    actionLabel: '+ Xuất Profile PDF',
    actionIcon: Download
  },
  clusterK: {
    title: 'CỤM #K',
    tabs: [
      { id: 'home', label: 'Trang Chủ #K', icon: Home },
      { id: 'kien', label: 'Kiến', icon: Building2 },
      { id: 'hash', label: '#', icon: Hash },
      { id: 'k2t', label: '#K2T', icon: Cpu },
      { id: 'k2b', label: '#K2B', icon: Package },
      { id: 'k1', label: '#K1', icon: Award }
    ],
    actionLabel: '',
    actionIcon: Plus
  }
};

interface HubDetailHeaderProps {
  activeModule: AppModuleId;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onGoHome: () => void;
  onActionClick?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  renderUserAuthButton: () => React.ReactNode;
}

export const HubDetailHeader: React.FC<HubDetailHeaderProps> = ({
  activeModule,
  activeTab,
  onSelectTab,
  onGoHome,
  onActionClick,
  darkMode,
  onToggleDarkMode,
  renderUserAuthButton
}) => {
  const config = HUB_MODULE_CONFIGS[activeModule] || {
    title: 'PHÂN HỆ',
    tabs: [],
    actionLabel: '+ Thao Tác',
    actionIcon: Plus
  };

  const ActionIcon = config.actionIcon;

  // Tiêu đề động hiển thị theo không gian nghiệp vụ đang chọn (ví dụ: 5.1B ĐẦU VÀO khi ở tab 5.1B)
  const displayTitle = React.useMemo(() => {
    if (activeModule === 'cluster51') {
      if (activeTab === 'pilot51b') return '5.1B ĐẦU VÀO';
      if (activeTab === 'acceptance51t') return '5.1T ĐẦU RA';
      return 'CỤM 5.1';
    }
    if (activeModule === 'clusterK') {
      if (activeTab === 'kien') return 'KIẾN';
      if (activeTab === 'hash') return '# (HASH)';
      if (activeTab === 'k2t') return '#K2T';
      if (activeTab === 'k2b') return '#K2B';
      if (activeTab === 'k1') return '#K1';
      return 'CỤM #K';
    }
    return config.title;
  }, [activeModule, activeTab, config.title]);

  // Sub-tabs nội bộ & Search cho Cụm 5.1 và Cụm #K (3 Kho + Thanh tìm kiếm)
  const isWarehouseCluster = ['cluster51', 'clusterK'].includes(activeModule);
  const [warehouseSubTab, setWarehouseSubTab] = React.useState<'orders' | 'products' | 'inventory'>('orders');
  const [quickSearch, setQuickSearch] = React.useState('');
  const [cluster51Counts, setCluster51Counts] = React.useState({
    orders: 4,
    products: 3,
    inventory: 6,
  });
  const [clusterKCounts, setClusterKCounts] = React.useState({
    orders: 3,
    products: 4,
    inventory: 6,
  });

  React.useEffect(() => {
    const handleSync51 = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.subTab) setWarehouseSubTab(customEvent.detail.subTab);
        if (customEvent.detail.counts) setCluster51Counts(customEvent.detail.counts);
      }
    };
    const handleSyncK = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.subTab) setWarehouseSubTab(customEvent.detail.subTab);
        if (customEvent.detail.counts) setClusterKCounts(customEvent.detail.counts);
      }
    };
    window.addEventListener('cluster51_state_sync', handleSync51);
    window.addEventListener('clusterK_state_sync', handleSyncK);
    return () => {
      window.removeEventListener('cluster51_state_sync', handleSync51);
      window.removeEventListener('clusterK_state_sync', handleSyncK);
    };
  }, []);

  // Khi chuyển module hoặc tab, reset thanh tìm kiếm
  React.useEffect(() => {
    setQuickSearch('');
  }, [activeModule, activeTab]);

  const handleSelectWarehouseTab = (tabId: 'orders' | 'products' | 'inventory') => {
    setWarehouseSubTab(tabId);
    if (activeModule === 'cluster51') {
      window.dispatchEvent(new CustomEvent('cluster51_subtab_change', { detail: tabId }));
    } else if (activeModule === 'clusterK') {
      window.dispatchEvent(new CustomEvent('clusterK_subtab_change', { detail: tabId }));
    }
  };

  const handleQuickSearchChange = (val: string) => {
    setQuickSearch(val);
    if (activeModule === 'cluster51') {
      window.dispatchEvent(new CustomEvent('cluster51_search', { detail: val }));
    } else if (activeModule === 'clusterK') {
      window.dispatchEvent(new CustomEvent('clusterK_search', { detail: val }));
    }
  };

  const currentCounts = activeModule === 'clusterK' ? clusterKCounts : cluster51Counts;

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 shadow-2xs z-30 shrink-0 transition-colors duration-200">
      <div className="w-full px-3 sm:px-5 lg:px-6 h-14 sm:h-15 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LEFT & CENTER NAVIGATION: [ 🏠 TÊN PHÂN HỆ ] + Modern Box Tabs / 3 Kho & Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-x-auto no-scrollbar py-1">
          
          {/* Module Identity: [ 🏠 ] + [ TÊN PHÂN HỆ / ĐẦU MỐI ĐANG CHỌN ] in Brand Orange */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 mr-2 sm:mr-4 lg:mr-6">
            <button
              onClick={onGoHome}
              title="Về Trang chủ AVG One"
              className="p-1 text-[#F15A24] dark:text-orange-400 hover:opacity-80 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4] -translate-y-0.5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => {
                if (['cluster51', 'clusterK'].includes(activeModule)) {
                  onSelectTab('home');
                } else {
                  onGoHome();
                }
              }}
              title={['cluster51', 'clusterK'].includes(activeModule) ? `Về Trang Chủ ${config.title}` : "Nhấn để quay về Trang Chủ"}
              className="text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 uppercase tracking-tight whitespace-nowrap cursor-pointer transition-colors leading-none"
            >
              {displayTitle}
            </button>
          </div>

          {/* Module Tab Box Buttons / 3 Kho & Search Bar */}
          {activeTab !== 'home' && (
            isWarehouseCluster ? (
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* BỘ 3 KHO: Kho đầu vào, Kho thành phẩm, Kho lưu chuyển */}
                <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 whitespace-nowrap mr-2 sm:mr-4">
                  {[
                    { id: 'orders' as const, label: 'Kho đầu vào', count: currentCounts.orders, icon: ClipboardCheck },
                    { id: 'products' as const, label: 'Kho thành phẩm', count: currentCounts.products, icon: Layers },
                    { id: 'inventory' as const, label: 'Kho lưu chuyển', count: currentCounts.inventory, icon: Box },
                  ].map((tab) => {
                    const isActive = warehouseSubTab === tab.id;
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleSelectWarehouseTab(tab.id)}
                        className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] cursor-pointer select-none tracking-normal transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                            : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.2]" />
                        <span>{tab.label}</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                          isActive ? 'bg-white/25 text-white' : 'bg-slate-200/90 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Thanh tìm kiếm nhanh: Dạng hộp chữ nhật bo tròn 2 đầu (rounded-2xl) & dài hơn */}
                <div className="relative flex items-center flex-1 max-w-[580px] min-w-[200px] mr-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    id="cluster-quick-search-input"
                    type="text"
                    value={quickSearch}
                    onChange={(e) => handleQuickSearchChange(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-4 h-8 sm:h-8.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-white focus:bg-white dark:focus:bg-slate-900 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/30 focus:border-[#F15A24] shadow-2xs transition-all duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {config.tabs.filter(tab => tab.id !== 'home').map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onSelectTab(tab.id)}
                      className={`h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs shadow-sky-500/25 border border-sky-400/40 font-black'
                          : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80 shadow-2xs font-bold hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )
          )}

        </div>

        {/* RIGHT ACTIONS: + Action Button + Dark Mode Toggle (hidden for cluster51) + User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {config.actionLabel && (
            <button
              onClick={onActionClick}
              className="h-8 sm:h-8.5 px-2.5 sm:px-3.5 rounded-xl bg-[#F15A24] hover:bg-[#D94E1B] active:scale-95 text-white font-extrabold text-xs sm:text-[13px] flex items-center gap-1.5 shadow-xs shadow-orange-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <ActionIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
              <span className="hidden md:inline">{config.actionLabel}</span>
            </button>
          )}



          {/* User Account Button */}
          {renderUserAuthButton()}
        </div>

      </div>
    </header>
  );
};
