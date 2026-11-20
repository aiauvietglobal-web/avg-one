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

  // 2. Đơn hàng dropdown state & ref
  const [ordersTabState, setOrdersTabState] = useState<'design' | 'research' | 'sample-h1' | 'legal'>('design');
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const ordersDropdownRef = useRef<HTMLDivElement>(null);

  // 3. Mục đang được ấn trực tiếp (chỉ khi ấn vào mới hiện dạng hộp)
  const [clickedItem, setClickedItem] = useState<AppModuleId | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Đóng hộp khi chuyển phân hệ
  useEffect(() => {
    if (activeModule !== 'system' && activeModule !== 'admin') {
      setIsSystemDropdownOpen(false);
    }
    if (activeModule !== 'orders' && activeModule !== 'wework') {
      setIsOrdersDropdownOpen(false);
    }
  }, [activeModule]);

  // Click outside listener for all dropdowns & active pill
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (systemDropdownRef.current && !systemDropdownRef.current.contains(target)) {
        setIsSystemDropdownOpen(false);
      }
      if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(target)) {
        setIsOrdersDropdownOpen(false);
      }
      if (navRef.current && !navRef.current.contains(target)) {
        setClickedItem(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleSystemModule = () => {
    setIsOrdersDropdownOpen(false);
    setIsSystemDropdownOpen(prev => {
      const next = !prev;
      setClickedItem(next ? 'system' : null);
      return next;
    });
  };

  const handleSelectSystemSubTab = (tab: 'annual-plan' | 'executive-directive') => {
    setSystemTabState(tab);
    setIsSystemDropdownOpen(false);
    setClickedItem('system');
    onSelectModule('system');
    window.dispatchEvent(new CustomEvent('system_tab_change', { detail: tab }));
    const btn = document.getElementById(`btn-system-subtab-${tab}`);
    if (btn) btn.click();
  };

  const handleToggleOrdersModule = () => {
    setIsSystemDropdownOpen(false);
    setIsOrdersDropdownOpen(prev => {
      const next = !prev;
      setClickedItem(next ? 'orders' : null);
      return next;
    });
  };

  const handleSelectOrdersSubTab = (tab: 'design' | 'research' | 'sample-h1' | 'legal') => {
    setOrdersTabState(tab);
    setIsOrdersDropdownOpen(false);
    setClickedItem('orders');
    onSelectModule('orders');
    window.dispatchEvent(new CustomEvent('orders_tab_change', { detail: tab }));
    setTimeout(() => {
      const btn = document.getElementById(`btn-orders-subtab-${tab}`);
      if (btn) btn.click();
    }, 50);
  };

  return (
    <nav ref={navRef} className="relative hidden md:flex items-center gap-1 sm:gap-2 lg:gap-3.5 shrink-0 whitespace-nowrap">
      {[
        { id: 'home' as AppModuleId, aliases: ['home'], label: 'Trang chủ' },
        { id: 'system' as AppModuleId, aliases: ['system', 'admin'], label: 'Hệ thống' },
        { id: 'inside' as AppModuleId, aliases: ['inside'], label: 'Bảng tin' },
        { id: 'orders' as AppModuleId, aliases: ['orders', 'wework', 'workflow', 'rd'], label: 'Đơn hàng' },
      ].map((item) => {
        const isActive = item.aliases.includes(activeModule);
        const isBoxShown =
          item.id === 'system'
            ? isSystemDropdownOpen || clickedItem === 'system'
            : item.id === 'orders'
              ? isOrdersDropdownOpen || clickedItem === 'orders'
              : clickedItem === item.id;

        if (item.id === 'system') {
          return (
            <div
              key={item.id}
              ref={systemDropdownRef}
              className="shrink-0 whitespace-nowrap"
            >
              <button
                onClick={handleToggleSystemModule}
                className={`relative h-9 px-4 rounded-full text-sm sm:text-[15px] cursor-pointer select-none tracking-normal flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                  isBoxShown
                    ? 'bg-[#EEEEEE] dark:bg-slate-800 font-semibold text-[#1F1F1F] dark:text-white'
                    : 'bg-transparent font-medium text-slate-700 dark:text-slate-200'
                }`}
              >
                <span className="inline-block whitespace-nowrap">
                  {item.label}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isSystemDropdownOpen ? 'rotate-180' : ''} ${isBoxShown ? 'text-slate-600 dark:text-slate-300' : 'opacity-60'}`}
                />
              </button>

              {isSystemDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-5 w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-lg p-2 z-50 space-y-1 animate-dropdown-slide">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectSystemSubTab('annual-plan');
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isActive && systemTabState === 'annual-plan'
                        ? 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-[#F3F4F6] dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isActive && systemTabState === 'executive-directive'
                        ? 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-[#F3F4F6] dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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



        if (item.id === 'orders') {
          return (
            <div
              key={item.id}
              ref={ordersDropdownRef}
              className="shrink-0 whitespace-nowrap"
            >
              <button
                onClick={handleToggleOrdersModule}
                className={`relative h-9 px-4 rounded-full text-sm sm:text-[15px] cursor-pointer select-none tracking-normal flex items-center gap-1 transition-colors ${
                  isBoxShown
                    ? 'bg-[#EEEEEE] dark:bg-slate-800 font-semibold text-[#1F1F1F] dark:text-white'
                    : 'bg-transparent font-medium text-slate-700 dark:text-slate-200'
                }`}
              >
                <span className="inline-block">
                  {item.label}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isOrdersDropdownOpen ? 'rotate-180' : ''} ${isBoxShown ? 'text-slate-600 dark:text-slate-300' : 'opacity-60'}`}
                />
              </button>

              {isOrdersDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-5 w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-lg p-2 z-50 space-y-1 animate-dropdown-slide">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectOrdersSubTab('design');
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      (isActive && ordersTabState === 'design') || activeSubTitle.includes('THIẾT KẾ')
                        ? 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-[#F3F4F6] dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      (isActive && ordersTabState === 'research') || activeSubTitle.includes('NGHIÊN CỨU')
                        ? 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-[#F3F4F6] dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isActive && ordersTabState === 'legal'
                        ? 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-800 dark:text-slate-200 font-medium hover:bg-[#F3F4F6] dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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
              setIsOrdersDropdownOpen(false);
              setClickedItem(item.id);
              onSelectModule(item.id);
            }}
            className={`relative h-9 px-4 rounded-full text-sm sm:text-[15px] cursor-pointer select-none tracking-normal flex items-center justify-center transition-colors ${
              isBoxShown
                ? 'bg-[#EEEEEE] dark:bg-slate-800 font-semibold text-[#1F1F1F] dark:text-white'
                : 'bg-transparent font-medium text-slate-700 dark:text-slate-200'
            }`}
          >
            <span className="inline-block">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
