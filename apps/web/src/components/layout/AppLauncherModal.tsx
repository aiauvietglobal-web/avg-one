import React from 'react';
import {
  BarChart3, Newspaper, Calendar, FolderKanban, Users, Scale, Wallet, Lightbulb, LayoutGrid,
  X, Home
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

export const APP_MODULES = [
  {
    id: 'apps' as AppModuleId,
    name: 'Ứng Dụng',
    icon: LayoutGrid,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'system' as AppModuleId,
    name: 'Hệ Thống',
    icon: BarChart3,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'inside' as AppModuleId,
    name: 'Bảng Tin Nội Bộ',
    icon: Newspaper,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'calendar' as AppModuleId,
    name: 'Lịch',
    icon: Calendar,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'orders' as AppModuleId,
    name: 'Đơn Hàng',
    icon: FolderKanban,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'hr' as AppModuleId,
    name: 'Nhân Sự',
    icon: Users,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'legal' as AppModuleId,
    name: 'Pháp Lý',
    icon: Scale,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'finance' as AppModuleId,
    name: 'Tài Chính',
    icon: Wallet,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
  },
  {
    id: 'rd' as AppModuleId,
    name: 'Nghiên Cứu & Phát Triển',
    icon: Lightbulb,
    iconColor: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800/80'
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-4xl max-h-[85vh] sm:max-h-none overflow-y-auto shadow-2xl space-y-4 sm:space-y-6 animate-scale-up relative overflow-hidden">
        {/* Top Multi-color Rainbow Gradient Bar */}
        <div className="h-1.5 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] bg-gradient-to-r from-[#0284C7] via-[#00A8E8] via-amber-500 to-[#F15A24] -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-2" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
          <div>
            <h2
              style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #0284C7 50%, #F15A24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
              className="text-base sm:text-xl font-black tracking-tight dark:hidden"
            >
              QUẢN LÝ PHÂN HỆ AVG One
            </h2>
            <h2
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 50%, #FF7043 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
              className="text-base sm:text-xl font-black tracking-tight hidden dark:inline-block"
            >
              QUẢN LÝ PHÂN HỆ AVG One
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectModule('home');
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 hover:from-orange-100 hover:to-amber-100 dark:from-orange-950/60 dark:to-amber-950/40 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800 font-extrabold text-xs sm:text-sm transition shadow-xs cursor-pointer hover:scale-105"
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

        {/* Modules Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2.5 sm:gap-4">
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
              <button
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  onClose();
                }}
                style={{ borderRadius: '28px' }}
                className={`flex flex-col items-center justify-center py-3.5 sm:py-5 px-2.5 sm:px-3 min-h-[102px] sm:min-h-[125px] border-2 border-dashed transition-all duration-200 text-center group cursor-pointer relative overflow-hidden select-none ${
                  isActive
                    ? 'border-[#F15A24] bg-gradient-to-br from-orange-50/90 via-amber-50/60 to-orange-100/70 dark:from-orange-950/70 dark:to-amber-950/50 shadow-md ring-2 ring-[#F15A24]/20'
                    : 'border-slate-300/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#F15A24] hover:bg-gradient-to-br hover:from-white hover:via-orange-50/30 hover:to-amber-50/20 dark:hover:from-slate-900 dark:hover:to-orange-950/30 hover:-translate-y-0.5 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl ${mod.bgColor} border flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform shrink-0 shadow-2xs`}>
                  <Icon className={`w-5 h-5 sm:w-6.5 sm:h-6.5 ${mod.iconColor}`} />
                </div>
                <h3 className={`font-extrabold text-xs sm:text-sm leading-tight transition-colors px-1 w-full text-center ${
                  isActive ? 'text-[#F15A24] dark:text-orange-400 font-black' : 'text-slate-800 dark:text-slate-100 group-hover:text-[#F15A24]'
                }`}>
                  {mod.name}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
