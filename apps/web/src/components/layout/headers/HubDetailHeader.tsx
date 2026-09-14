import React from 'react';
import {
  Home, Moon, Sun, Plus, Server, Wrench, Activity, SlidersHorizontal,
  Workflow, Target, CheckCircle2, FileText, ShieldCheck, Key, Database,
  AlertTriangle, Zap, Globe, GitBranch, BarChart3, Award, Building2,
  BadgeCheck, FolderKanban, Layers, Hash, Sparkles, Download, Inbox, Rocket,
  Package, Cpu
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
    actionLabel: '+ Đơn Thí Điểm 5.1B',
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
      { id: 'kien', label: 'Kiến', icon: Building2 },
      { id: 'hash', label: '#', icon: Hash },
      { id: 'k2t', label: '#K2T', icon: Cpu },
      { id: 'k2b', label: '#K2B', icon: Package },
      { id: 'k1', label: '#K1', icon: Award }
    ],
    actionLabel: '+ Giao Việc Cụm #K',
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

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 shadow-2xs z-30 shrink-0 transition-colors duration-200">
      <div className="w-full px-3 sm:px-5 lg:px-6 h-14 sm:h-15 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LEFT & CENTER NAVIGATION: [ 🏠 TÊN PHÂN HỆ ] + Modern Box Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-x-auto no-scrollbar py-1">
          
          {/* Module Identity Button: [ 🏠 TÊN PHÂN HỆ ] in Brand Orange */}
          <button
            onClick={onGoHome}
            title="Nhấn để quay về Trang Chủ"
            className="flex items-center gap-1.5 sm:gap-2 px-1 py-1 rounded-xl text-left shrink-0 mr-2 sm:mr-4 lg:mr-6 transition-all group hover:opacity-90 active:scale-95 cursor-pointer"
          >
            <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#F15A24] dark:text-orange-400 stroke-[2.4] -translate-y-0.5 group-hover:scale-110 transition-transform" />
            <span className="text-base sm:text-lg lg:text-xl font-black text-[#F15A24] dark:text-orange-400 uppercase tracking-tight whitespace-nowrap">
              {config.title}
            </span>
          </button>

          {/* Module Tab Box Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {config.tabs.map((tab) => {
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

        </div>

        {/* RIGHT ACTIONS: + Action Button + Dark Mode Toggle + User Profile */}
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

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" /> : <Moon className="w-4 h-4 text-slate-600 stroke-[2.2]" />}
          </button>

          {/* User Account Button */}
          {renderUserAuthButton()}
        </div>

      </div>
    </header>
  );
};
