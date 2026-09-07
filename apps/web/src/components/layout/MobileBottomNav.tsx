import React from 'react';
import { Home, Briefcase, Calendar, Layers, User } from 'lucide-react';
import { AppModuleId } from './AppLauncherModal';

interface MobileBottomNavProps {
  activeModule: AppModuleId;
  onSelectModule: (module: AppModuleId) => void;
  onOpenLauncher: () => void;
  onOpenLoginModal: () => void;
  isLoggedIn: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModule,
  onSelectModule,
  onOpenLauncher,
  onOpenLoginModal,
  isLoggedIn,
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: Home,
      onClick: () => onSelectModule('home'),
      isActive: activeModule === 'home' || activeModule === 'apps',
    },
    {
      id: 'wework',
      label: 'Công việc',
      icon: Briefcase,
      onClick: () => onSelectModule('wework'),
      isActive: activeModule === 'wework' || activeModule === 'orders',
    },
    {
      id: 'calendar',
      label: 'Lịch làm',
      icon: Calendar,
      onClick: () => onSelectModule('calendar'),
      isActive: activeModule === 'calendar',
    },
    {
      id: 'system',
      label: 'Hệ thống',
      icon: Layers,
      onClick: () => onSelectModule('system') || onSelectModule('admin'),
      isActive: activeModule === 'system' || activeModule === 'admin',
    },
    {
      id: 'profile',
      label: 'Tài khoản',
      icon: User,
      onClick: onOpenLoginModal,
      isActive: false,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 h-14 flex items-center justify-around px-1 select-none shadow-lg transition-transform duration-200">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.isActive;
        return (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-all duration-150 active:scale-90 cursor-pointer ${
              active
                ? 'text-[#F15A24] dark:text-orange-400 font-black'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-orange-50 dark:bg-orange-950/60' : ''}`}>
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${active ? 'scale-110 text-[#F15A24]' : ''}`} />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight leading-none">
              {item.label}
            </span>

            {/* Active Pill Indicator */}
            {active && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-[#F15A24] rounded-full animate-in fade-in zoom-in duration-200" />
            )}
          </button>
        );
      })}
    </div>
  );
};
