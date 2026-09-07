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
    id: 'system' as AppModuleId,
    name: 'Hệ Thống',
    icon: BarChart3,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'inside' as AppModuleId,
    name: 'Bảng Tin Nội Bộ',
    icon: Newspaper,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'calendar' as AppModuleId,
    name: 'Lịch',
    icon: Calendar,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'orders' as AppModuleId,
    name: 'Đơn Hàng',
    icon: FolderKanban,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'hr' as AppModuleId,
    name: 'Nhân Sự',
    icon: Users,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'legal' as AppModuleId,
    name: 'Pháp Lý',
    icon: Scale,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'finance' as AppModuleId,
    name: 'Tài Chính',
    icon: Wallet,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'rd' as AppModuleId,
    name: 'Nghiên Cứu & Phát Triển',
    icon: Lightbulb,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
  },
  {
    id: 'apps' as AppModuleId,
    name: 'Ứng Dụng',
    icon: LayoutGrid,
    iconColor: 'text-[#F15A24]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-4xl max-h-[85vh] sm:max-h-none overflow-y-auto shadow-2xl space-y-4 sm:space-y-6 animate-scale-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
          <div>
            <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              QUẢN LÝ PHÂN HỆ AVG One
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectModule('home');
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 text-[#F15A24] dark:text-orange-400 border border-orange-200/80 dark:border-orange-800 font-extrabold text-xs sm:text-sm transition shadow-xs cursor-pointer hover:scale-105"
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
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2.5 sm:gap-5">
          {APP_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all text-center group cursor-pointer ${
                  isActive
                    ? 'border-[#F15A24] bg-orange-50/40 dark:bg-orange-950/40 shadow-xs'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#F15A24]/60 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <div className={`w-11 h-11 sm:w-18 sm:h-18 rounded-xl sm:rounded-2xl ${mod.bgColor} border flex items-center justify-center mb-1.5 sm:mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                  <Icon className={`w-5 h-5 sm:w-9 sm:h-9 ${mod.iconColor}`} />
                </div>
                <h3 className="font-extrabold text-xs sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-[#F15A24] transition-colors leading-tight">
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
