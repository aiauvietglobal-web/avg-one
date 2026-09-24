import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { AppModuleId } from '../AppLauncherModal';

export interface HeaderNavMenuProps {
  activeModule: AppModuleId;
  onSelectModule: (module: AppModuleId) => void;
  activeSubTitle?: string;
}

export const HeaderNavMenu: React.FC<HeaderNavMenuProps> = ({
  activeModule,
  onSelectModule,
  activeSubTitle = ''
}) => {
  // 1. Hệ thống dropdown state & ref
  const [systemTabState, setSystemTabState] = useState<'annual-plan' | 'executive-directive'>('annual-plan');
  const [isSystemDropdownOpen, setIsSystemDropdownOpen] = useState(false);
  const systemDropdownRef = useRef<HTMLDivElement>(null);

  // 2. Lịch dropdown state & ref
  const [calendarTabState, setCalendarTabState] = useState<'talk' | 'work'>(() => {
    try {
      const saved = localStorage.getItem('avg_calendar_active_subapp');
      if (saved && ['talk', 'work'].includes(saved)) {
        return saved as 'talk' | 'work';
      }
    } catch (e) {}
    return 'talk';
  });
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const calendarDropdownRef = useRef<HTMLDivElement>(null);

  // Sync calendarTabState when calendar sub-app changes from inside CalendarModule
  useEffect(() => {
    const handleSubAppChange = (e: any) => {
      if (e.detail && ['talk', 'work'].includes(e.detail)) {
        setCalendarTabState(e.detail as 'talk' | 'work');
      }
    };
    window.addEventListener('calendar_subapp_change', handleSubAppChange);
    return () => window.removeEventListener('calendar_subapp_change', handleSubAppChange);
  }, []);

  // 3. Đơn hàng dropdown state & ref
  const [ordersTabState, setOrdersTabState] = useState<'design' | 'research' | 'sample-h1' | 'legal'>('design');
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const ordersDropdownRef = useRef<HTMLDivElement>(null);

  // Đóng hộp khi chuyển phân hệ
  useEffect(() => {
    if (activeModule !== 'system' && activeModule !== 'admin') {
      setIsSystemDropdownOpen(false);
    }
    if (activeModule !== 'calendar') {
      setIsCalendarDropdownOpen(false);
    }
    if (activeModule !== 'orders' && activeModule !== 'wework') {
      setIsOrdersDropdownOpen(false);
    }
  }, [activeModule]);

  // Click outside listener for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (systemDropdownRef.current && !systemDropdownRef.current.contains(target)) {
        setIsSystemDropdownOpen(false);
      }
      if (calendarDropdownRef.current && !calendarDropdownRef.current.contains(target)) {
        setIsCalendarDropdownOpen(false);
      }
      if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(target)) {
        setIsOrdersDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleSystemModule = () => {
    setIsOrdersDropdownOpen(false);
    setIsCalendarDropdownOpen(false);
    setIsSystemDropdownOpen(prev => !prev);
  };

  const handleSelectSystemSubTab = (tab: 'annual-plan' | 'executive-directive') => {
    setSystemTabState(tab);
    setIsSystemDropdownOpen(false);
    onSelectModule('system');
    window.dispatchEvent(new CustomEvent('system_tab_change', { detail: tab }));
    const btn = document.getElementById(`btn-system-subtab-${tab}`);
    if (btn) btn.click();
  };

  const handleToggleCalendarModule = () => {
    setIsSystemDropdownOpen(false);
    setIsOrdersDropdownOpen(false);
    setIsCalendarDropdownOpen(prev => !prev);
    if (activeModule !== 'calendar') {
      handleSelectCalendarSubTab(calendarTabState || 'talk');
    }
  };

  const handleSelectCalendarSubTab = (tab: 'talk' | 'work') => {
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

  const handleToggleOrdersModule = () => {
    setIsSystemDropdownOpen(false);
    setIsCalendarDropdownOpen(false);
    setIsOrdersDropdownOpen(prev => !prev);
  };

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

  return (
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
                className={`relative px-2.5 sm:px-3 py-1.5 text-base sm:text-[17px] cursor-pointer select-none tracking-normal flex items-center gap-1 whitespace-nowrap shrink-0 ${
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
                  {isHighlighted && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                  )}
                </span>
                <ChevronDown
                  style={{ color: isHighlighted ? '#F15A24' : undefined }}
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isSystemDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                />
              </button>

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
                  {isHighlighted && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                  )}
                </span>
                <ChevronDown
                  style={{ color: isHighlighted ? '#F15A24' : undefined }}
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isCalendarDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                />
              </button>

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
                  {isHighlighted && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
                  )}
                </span>
                <ChevronDown
                  style={{ color: isHighlighted ? '#F15A24' : undefined }}
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isOrdersDropdownOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-[#F15A24]' : 'opacity-60 hover:opacity-100 hover:text-[#F15A24]'}`}
                />
              </button>

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
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[2px] bg-[#F15A24] rounded-full" />
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
