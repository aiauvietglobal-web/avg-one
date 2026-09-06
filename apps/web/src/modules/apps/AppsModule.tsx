import React, { useState, useEffect } from 'react';
import {
  Mic, BarChart3, QrCode, FileText, LayoutGrid, Sparkles
} from 'lucide-react';
import { SpeechToTextModule } from './SpeechToTextModule';
import { DashboardModule } from '../dashboard/DashboardModule';

export type SubAppId = 'speech-to-text' | 'dashboard' | 'qr-code' | 'docs-template';

interface SubAppCard {
  id: SubAppId;
  code: string;
  title: string;
  headerTitle: string; // Tên ngắn hiển thị trên thanh Header chính (VD: CHUYỂN ĐỔI)
  icon: React.ElementType;
  isAvailable: boolean;
  badge?: string;
}

const SUB_APPS_GRID: SubAppCard[] = [
  {
    id: 'speech-to-text',
    code: 'APP-01',
    title: 'CHUYỂN ĐỔI TRỰC TIẾP',
    headerTitle: 'CHUYỂN ĐỔI TRỰC TIẾP',
    icon: Mic,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG'
  },
  {
    id: 'dashboard',
    code: 'APP-02',
    title: 'BÁO CÁO QUẢN TRỊ',
    headerTitle: 'BÁO CÁO QUẢN TRỊ',
    icon: BarChart3,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG'
  },
  {
    id: 'qr-code',
    code: 'APP-03',
    title: 'TRÌNH TẠO MÃ QR',
    headerTitle: 'TRÌNH TẠO MÃ QR',
    icon: QrCode,
    isAvailable: false,
    badge: 'SẮP PHÁT HÀNH'
  },
  {
    id: 'docs-template',
    code: 'APP-04',
    title: 'MẪU VĂN BẢN',
    headerTitle: 'MẪU VĂN BẢN',
    icon: FileText,
    isAvailable: false,
    badge: 'SẮP PHÁT HÀNH'
  }
];

export const AppsModule: React.FC = () => {
  // null = Landing Home View (hiển thị bộ các hộp ứng dụng con)
  const [activeApp, setActiveApp] = useState<SubAppId | null>(null);

  // Sync Header Title with AppShell when activeApp changes
  useEffect(() => {
    if (activeApp === 'speech-to-text') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'CHUYỂN ĐỔI TRỰC TIẾP' }));
    } else if (activeApp === 'dashboard') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'BÁO CÁO QUẢN TRỊ' }));
    } else if (activeApp === 'qr-code') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'TRÌNH TẠO MÃ QR' }));
    } else if (activeApp === 'docs-template') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'MẪU VĂN BẢN' }));
    } else {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    }
  }, [activeApp]);

  // Listen for back click from AppShell header
  useEffect(() => {
    const handleSubBack = () => {
      setActiveApp(null);
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    };
    window.addEventListener('submodule_back', handleSubBack);
    return () => {
      window.removeEventListener('submodule_back', handleSubBack);
      // Clean up header title on unmount
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    };
  }, []);

  return (
    <div className={`w-full h-full flex-1 min-h-0 ${activeApp !== null ? 'p-1 sm:p-2 space-y-0 overflow-hidden flex flex-col' : 'bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden flex flex-col items-center justify-center min-h-full'}`}>
      
      {/* ========================================================================= */}
      {/* CASE 1: TRANG CHỦ PHÂN HỆ ỨNG DỰNG (ĐỒNG BỘ PHONG CÁCH GRID HỘP VỚI TRANG CHỦ) */}
      {/* ========================================================================= */}
      {activeApp === null ? (
        <>
          {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

          {/* 🎨 AMBIENT GLOW ORBS */}
          <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
          <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
          <div className="absolute bottom-10 left-1/3 w-[550px] h-[300px] bg-gradient-to-tr from-sky-400/10 via-amber-400/10 to-orange-400/15 dark:from-sky-600/10 dark:to-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

          {/* Synchronized container matching Header alignment (max-w-7xl px-4 sm:px-6) */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex flex-col items-center justify-center gap-10 sm:gap-14 lg:gap-16 relative z-10 py-8 sm:py-14">
            
            {/* Header Title Section */}
            <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                {/* SVG Clockwise Border Tracing Effect */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="apps-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="35%" stopColor="#00A8E8" />
                      <stop offset="70%" stopColor="#FF7043" />
                      <stop offset="100%" stopColor="#F15A24" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="8"
                    ry="8"
                    fill="none"
                    stroke="url(#apps-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>

                <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-transparent text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  <LayoutGrid className="w-4 h-4 text-[#00A8E8]" />
                  <span>KHO ỨNG DỤNG & CÔNG CỤ MỞ RỘNG</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline justify-center gap-2">
                <span>Phân Hệ</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">Ứng Dụng</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* 📦 BỘ CÁC HỘP THẺ TRUY CẬP ỨNG DỤNG CON (ĐỒNG BỘ NÉT ĐỨT CAM & GREY BO GÓC 32PX) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full pb-2">
              {SUB_APPS_GRID.map((app) => {
                const Icon = app.icon;
                if (app.isAvailable) {
                  return (
                    <div
                      key={app.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveApp(app.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveApp(app.id); }}
                      style={{ borderRadius: '32px' }}
                      className="group flex flex-col items-center justify-center py-5 sm:py-6 px-3 min-h-[150px] bg-white dark:bg-slate-900 rounded-[32px] border-2 border-dashed border-[#F15A24]/40 dark:border-[#F15A24]/30 hover:border-[#F15A24] hover:-translate-y-0.5 transition-all duration-200 text-center relative overflow-hidden shadow-2xs hover:shadow-md cursor-pointer select-none"
                    >
                      {/* Badge Trạng thái */}
                      {app.badge && (
                        <span className="absolute top-3.5 right-3.5 text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 tracking-wider">
                          {app.badge}
                        </span>
                      )}

                      {/* Icon Hộp Vuông Bo Tròn Chuẩn Màu Cam AVG */}
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-[#F15A24] dark:text-orange-400 mb-3 group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                      </div>

                      {/* Tiêu đề */}
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#F15A24] transition-colors whitespace-normal leading-tight w-full px-0.5">
                        {app.title}
                      </h3>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={app.id}
                      style={{ borderRadius: '32px' }}
                      onClick={() => alert(`Ứng dụng "${app.title}" sắp được phát hành trong phiên bản đợt tiếp theo!`)}
                      className="flex flex-col items-center justify-center py-5 sm:py-6 px-3 min-h-[150px] bg-slate-50/70 dark:bg-slate-900/30 rounded-[32px] border-2 border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none"
                    >
                      {/* Badge Trạng thái */}
                      <span className="absolute top-3.5 right-3.5 text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 tracking-wider">
                        SẮP PHÁT HÀNH
                      </span>

                      {/* Icon Hộp xám */}
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-3 bg-white/80 dark:bg-slate-800/40 shrink-0">
                        <Icon className="w-6 h-6 text-slate-400 dark:text-slate-500 opacity-60" />
                      </div>

                      {/* Tiêu đề */}
                      <h3 className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 whitespace-normal leading-tight w-full px-0.5">
                        {app.title}
                      </h3>
                    </div>
                  );
                }
              })}

              {/* 4 Thẻ Placeholder Sắp phát hành dự phòng đồng bộ 100% */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`sub-placeholder-${idx}`}
                  style={{ borderRadius: '32px' }}
                  className="flex flex-col items-center justify-center py-5 sm:py-6 px-3 min-h-[150px] bg-slate-50/70 dark:bg-slate-900/30 rounded-[32px] border-2 border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none"
                >
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-3 bg-white/80 dark:bg-slate-800/40 shrink-0">
                    <Sparkles className="w-5 h-5 text-slate-400 dark:text-slate-500 opacity-60" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-normal text-slate-300/50 dark:text-slate-600/50 whitespace-normal leading-tight w-full px-0.5 opacity-50">
                    + Sắp phát hành
                  </h3>
                </div>
              ))}
            </div>

          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* CASE 2: GIAO DIỆN PHÂN HỆ CON TRỰC TIẾP (TỐI GIẢN - GỌN GÀNG - TRỌN VẸN) */
        /* ========================================================================= */
        <div className="w-full h-full max-w-full">
          {activeApp === 'speech-to-text' && <SpeechToTextModule />}
          {activeApp === 'dashboard' && <DashboardModule />}
        </div>
      )}

    </div>
  );
};
