import React, { useState, useEffect } from 'react';
import { DesignOrdersView } from './DesignOrdersView';
import { ResearchOrdersView } from './ResearchOrdersView';
import { LegalOrdersView } from './LegalOrdersView';

export type OrdersSubTab = 'design' | 'research' | 'legal';

interface WeworkModuleProps {
  initialSubTab?: OrdersSubTab;
}

export const WeworkModule: React.FC<WeworkModuleProps> = ({ initialSubTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<OrdersSubTab>(initialSubTab || 'design');

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Lắng nghe sự kiện chọn đầu mục con từ Header dropdown (Thiết kế, Nghiên cứu, Pháp lý)
  useEffect(() => {
    const handleOrdersTabChange = (e: any) => {
      if (e.detail) {
        if (e.detail === 'design' || e.detail === '3.2 - THIẾT KẾ') {
          setActiveSubTab('design');
        } else if (e.detail === 'research' || e.detail === 'sample-h1' || e.detail === '3.1 - RDI') {
          setActiveSubTab('research');
        } else if (e.detail === 'legal' || e.detail === '6 - PHÁP LÝ') {
          setActiveSubTab('legal');
        }
      }
    };
    window.addEventListener('orders_tab_change', handleOrdersTabChange);
    return () => window.removeEventListener('orders_tab_change', handleOrdersTabChange);
  }, []);

  return (
    <div className="orders-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* Hidden DOM trigger buttons for AppShell Header sync */}
      <div className="hidden">
        <button id="btn-orders-subtab-design" onClick={() => setActiveSubTab('design')} />
        <button id="btn-orders-subtab-research" onClick={() => setActiveSubTab('research')} />
        <button id="btn-orders-subtab-sample-h1" onClick={() => setActiveSubTab('research')} />
        <button id="btn-orders-subtab-legal" onClick={() => setActiveSubTab('legal')} />
      </div>

      {/* Main Scrollable Content Container */}
      <div className="w-full h-full flex-1 overflow-y-auto relative z-10 pr-1 space-y-4">
        {/* Render standalone independent views based on Header selection */}
        {activeSubTab === 'design' && <DesignOrdersView />}
        {activeSubTab === 'research' && <ResearchOrdersView />}
        {activeSubTab === 'legal' && <LegalOrdersView />}
      </div>
    </div>
  );
};
