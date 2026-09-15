import React from 'react';
import {
  BarChart3, Newspaper, Calendar, FolderKanban, Users, Scale, LayoutGrid,
  X, Home, Server, Workflow, ShieldCheck, Zap, Award, Layers, Cpu, Coins, Sparkles
} from 'lucide-react';

export type AppModuleId =
  | 'home'
  | 'system'
  | 'inside'
  | 'calendar'
  | 'orders'
  | 'hr'
  | 'legal'
  | 'finance'
  | 'rd'
  | 'apps'
  | 'infra22'
  | 'cluster51'
  | 'security'
  | 'traffic8'
  | 'profile9'
  | 'clusterK'
  // Legacy aliases
  | 'wework'
  | 'request'
  | 'goal'
  | 'workflow'
  | 'dashboard'
  | 'admin';

interface AppLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: AppModuleId;
  onSelectModule: (module: AppModuleId) => void;
}

export interface AppModuleItem {
  id: AppModuleId;
  name: string;
  tag: string;
  icon: React.ElementType;
}

export const APP_MODULES: AppModuleItem[] = [
  {
    id: 'apps',
    name: 'Ứng Dụng',
    tag: 'Hệ Sinh Thái',
    icon: Cpu,
  },
  {
    id: 'hr',
    name: 'Nhân Sự',
    tag: '20 Nhân Sự Lõi',
    icon: Users,
  },
  {
    id: 'legal',
    name: 'Pháp Lý',
    tag: 'Bản Quyền & SHTT',
    icon: Scale,
  },
  {
    id: 'finance',
    name: 'Tài Chính',
    tag: 'Duyệt Chi & Ngân Sách',
    icon: Coins,
  },
  {
    id: 'rd',
    name: 'Nghiên Cứu & Sáng Tạo',
    tag: '13 Bước SOP R&D',
    icon: Sparkles,
  },
  {
    id: 'profile9',
    name: 'Hồ Sơ Năng Lực',
    tag: 'Tổng Thể Doanh Nghiệp',
    icon: Award,
  },
  {
    id: 'infra22',
    name: 'Hạ Tầng 2.2',
    tag: 'Máy Móc & Thiết Bị',
    icon: Server,
  },
  {
    id: 'security',
    name: 'Bảo Mật',
    tag: 'ISO 27001 • Audit',
    icon: ShieldCheck,
  },
  {
    id: 'traffic8',
    name: 'Thông',
    tag: 'Gỡ Nghẽn & Thương Mại',
    icon: Zap,
  },
  {
    id: 'cluster51',
    name: 'Cụm 5.1',
    tag: '5.1B Vào • 5.1T Ra',
    icon: Workflow,
  },
  {
    id: 'clusterK',
    name: 'Cụm #K',
    tag: '5 Đầu Mối Thực Thi',
    icon: Layers,
  },
  {
    id: 'system',
    name: 'Hệ Thống',
    tag: 'Kế Hoạch & Điều Hành',
    icon: BarChart3,
  },
  {
    id: 'inside',
    name: 'Bảng Tin Nội Bộ',
    tag: 'Truyền Thông AVG',
    icon: Newspaper,
  },
  {
    id: 'calendar',
    name: 'Lịch',
    tag: 'Lịch Họp & Tác Nghiệp',
    icon: Calendar,
  },
  {
    id: 'orders',
    name: 'Đơn Hàng',
    tag: 'Quản Lý Đơn Hàng',
    icon: FolderKanban,
  }
];

export const AppLauncherModal: React.FC<AppLauncherModalProps> = ({
  isOpen,
  onClose,
  activeModule,
  onSelectModule
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start justify-center sm:pt-16 bg-slate-950/60 backdrop-blur-xs p-2 sm:p-4 transition-opacity">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-5xl max-h-[85vh] sm:max-h-none overflow-y-auto shadow-2xl space-y-4 sm:space-y-6 animate-scale-up relative overflow-hidden">
        {/* Top Multi-color Rainbow Gradient Bar */}
        <div className="h-1.5 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] bg-gradient-to-r from-[#0284C7] via-[#00A8E8] via-amber-500 to-[#F15A24] -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-2" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
          <div>
            <h2 className="text-base sm:text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-[#0284C7] to-[#F15A24] dark:from-white dark:via-[#38BDF8] dark:to-[#FF7043] bg-clip-text text-transparent">
              QUẢN LÝ PHÂN HỆ AVG One
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectModule('home');
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-sky-50 via-blue-50 to-sky-100 hover:from-sky-100 hover:to-blue-100 dark:from-sky-950/60 dark:to-blue-950/40 text-[#0077B6] dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 font-extrabold text-xs sm:text-sm transition shadow-xs cursor-pointer hover:scale-105"
              title="Quay về Trang Chủ Tổng"
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Trang Chủ</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
              title="Đóng"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Modules Grid - Đồng bộ 100% thiết kế phong cách mảng kính Gradient xanh AVG One */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
          {APP_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isModuleActive = (modId: AppModuleId) => {
              if (activeModule === modId) return true;
              if (modId === 'system' && activeModule === 'admin') return true;
              if (modId === 'orders' && (activeModule === 'wework' || activeModule === 'dashboard')) return true;
              if (modId === 'hr' && activeModule === 'goal') return true;
              if (modId === 'finance' && activeModule === 'request') return true;
              if (modId === 'rd' && activeModule === 'workflow') return true;
              return false;
            };
            const isActive = isModuleActive(mod.id);

            return (
              <div
                key={mod.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectModule(mod.id);
                  onClose();
                }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onSelectModule(mod.id); onClose(); } }}
                style={{ borderRadius: '24px' }}
                className={`group flex flex-col items-center justify-between py-3 sm:py-3.5 px-2 min-h-[104px] sm:min-h-[114px] backdrop-blur-xl rounded-[24px] border transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none ${
                  isActive
                    ? 'border-[#0284C7] ring-2 ring-[#0284C7]/30 bg-gradient-to-b from-sky-200/80 via-sky-100/50 to-white dark:from-sky-900/70 dark:via-sky-950/60 dark:to-slate-900 shadow-md shadow-sky-500/20'
                    : 'border-sky-200/80 dark:border-sky-800/60 bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1 active:scale-[0.98]'
                }`}
              >
                {/* Hairline top glow on hover */}
                <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* App Unified Blue Icon Badge */}
                <div className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
                </div>

                {/* App Title & Micro Tag */}
                <div className="flex flex-col items-center w-full space-y-0.5">
                  <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                    {mod.name}
                  </h3>
                  <span className="text-[9px] sm:text-[9.5px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors uppercase tracking-wider whitespace-nowrap">
                    {mod.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
