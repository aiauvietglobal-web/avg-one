import React, { useState, useEffect } from 'react';
import { AnnualPlanView } from './AnnualPlanView';
import { ExecutiveDirectiveView } from './ExecutiveDirectiveView';
import { ITSystemView } from './ITSystemView';

export type SystemSubTab = 'annual-plan' | 'executive-directive' | 'it-system';

interface SystemModuleProps {
  activeTab?: SystemSubTab;
}

export const SystemModule: React.FC<SystemModuleProps> = ({ activeTab }) => {
  const [activeMainTab, setActiveMainTab] = useState<SystemSubTab>(activeTab || 'annual-plan');

  useEffect(() => {
    if (activeTab) {
      setActiveMainTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && (e.detail === 'annual-plan' || e.detail === 'executive-directive' || e.detail === 'it-system')) {
        setActiveMainTab(e.detail);
      }
    };
    window.addEventListener('system_tab_change', handleTabChange);
    return () => window.removeEventListener('system_tab_change', handleTabChange);
  }, []);

  return (
    <div className="system-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* Hidden DOM trigger buttons for AppShell AnimatedHeaderTabs sync */}
      <div className="hidden">
        <button
          id="btn-system-subtab-annual-plan"
          onClick={() => setActiveMainTab('annual-plan')}
        />
        <button
          id="btn-system-subtab-executive-directive"
          onClick={() => setActiveMainTab('executive-directive')}
        />
        <button
          id="btn-system-subtab-it-system"
          onClick={() => setActiveMainTab('it-system')}
        />
      </div>

      {/* Main Scrollable Content Wrapper */}
      <div className="w-full h-full flex-1 overflow-y-auto relative z-10 pr-1 space-y-4">
        {/* Render standalone management views based on Header selection */}
        {activeMainTab === 'annual-plan' && <AnnualPlanView />}
        {activeMainTab === 'executive-directive' && <ExecutiveDirectiveView />}
        {activeMainTab === 'it-system' && <ITSystemView />}
      </div>
    </div>
  );
};
