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
  headerTitle: string; // Tên ngắn hiển thị trên thanh Header chính
  icon: React.ElementType;
  isAvailable: boolean;
  badge?: string;
  iconColor?: string;
  bgColor?: string;
}

const SUB_APPS_GRID: SubAppCard[] = [
  {
    id: 'speech-to-text',
    code: 'APP-01',
    title: 'CHUYỂN ĐỔI TRỰC TIẾP',
    headerTitle: 'CHUYỂN ĐỔI TRỰC TIẾP',
    icon: Mic,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG',
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-sky-50 dark:bg-sky-950/80 border-sky-200 dark:border-sky-800 shadow-2xs'
  },
  {
    id: 'dashboard',
    code: 'APP-02',
    title: 'BÁO CÁO QUẢN TRỊ',
    headerTitle: 'BÁO CÁO QUẢN TRỊ',
    icon: BarChart3,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG',
    iconColor: 'text-[#F15A24] dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-950/80 border-orange-200 dark:border-orange-800 shadow-2xs'
  },
  {
    id: 'qr-code',
    code: 'APP-03',
    title: 'TRÌNH TẠO MÃ QR',
    headerTitle: 'TRÌNH TẠO MÃ QR',
    icon: QrCode,
    isAvailable: false,
    badge: 'SẮP PHÁT HÀNH',
    iconColor: 'text-slate-400 dark:text-slate-500',
    bgColor: 'bg-white/80 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700'
  },
  {
    id: 'docs-template',
    code: 'APP-04',
    title: 'MẪU VĂN BẢN',
    headerTitle: 'MẪU VĂN BẢN',
    icon: FileText,
    isAvailable: false,
    badge: 'SẮP PHÁT HÀNH',
    iconColor: 'text-slate-400 dark:text-slate-500',
    bgColor: 'bg-white/80 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700'
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

  // Listen for back click and direct app selection from AppShell header
  useEffect(() => {
    const handleSubBack = () => {
      setActiveApp(null);
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    };
    const handleOpenSubApp = (e: any) => {
      if (e.detail && ['speech-to-text', 'dashboard', 'qr-code', 'docs-template'].includes(e.detail)) {
        setActiveApp(e.detail);
      }
    };

    window.addEventListener('submodule_back', handleSubBack);
    window.addEventListener('open_sub_app', handleOpenSubApp);
    return () => {
      window.removeEventListener('submodule_back', handleSubBack);
      window.removeEventListener('open_sub_app', handleOpenSubApp);
      // Clean up header title on unmount
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    };
  }, []);

  return (
    <div className={`w-full h-full flex-1 min-h-0 ${activeApp !== null ? 'overflow-hidden flex flex-col' : 'bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden flex flex-col items-center justify-center min-h-full'}`}>
      
      {/* ========================================================================= */}
      {/* CASE 1: TRANG CHỦ PHÂN HỆ ỨNG DỰNG (ĐỒNG BỘ PHONG CÁCH GRID HỘP VỚI TRANG CHỦ) */}
      {/* ========================================================================= */}
      {activeApp === null ? (
        <>
          {/* 🌐 ULTRA-CLEAN GRID LINES & FACETED ANGLED POLYGON PLANES (PHONG CÁCH TRANG CHỦ) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.75rem_2.75rem] opacity-50 dark:opacity-25 pointer-events-none -z-0" />

          {/* 🎨 ANGLED FACETED GEOMETRIC PLANES (MẢNG VÁT ĐA GIÁC CHUYỂN ĐỘNG NGHỆ THUẬT) */}
          <div className="absolute -top-16 -left-20 w-[540px] h-[540px] xl:w-[680px] xl:h-[680px] bg-gradient-to-br from-sky-400/20 via-[#0284C7]/12 to-transparent [clip-path:polygon(0_0,100%_0,65%_100%,0_80%)] pointer-events-none -z-0 animate-facet-left transition-all" />
          <div className="absolute -top-8 -left-12 w-[380px] h-[380px] xl:w-[480px] xl:h-[480px] bg-gradient-to-br from-sky-300/15 via-transparent to-transparent [clip-path:polygon(0_0,85%_0,50%_100%,0_70%)] pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '6s' }} />

          <div className="absolute -top-16 -right-20 w-[580px] h-[580px] xl:w-[720px] xl:h-[720px] bg-gradient-to-bl from-orange-400/20 via-[#F15A24]/12 to-transparent [clip-path:polygon(35%_0,100%_0,100%_80%,0_100%)] pointer-events-none -z-0 animate-facet-right transition-all" />
          <div className="absolute -top-8 -right-12 w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] bg-gradient-to-bl from-orange-300/15 via-transparent to-transparent [clip-path:polygon(45%_0,100%_0,100%_65%,0_90%)] pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '7s' }} />

          <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-sky-300/10 via-emerald-300/8 to-transparent rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '8s' }} />

          {/* 🪐 VÒNG QUỸ ĐẠO VỆ TINH CHUYỂN ĐỘNG (TOP-RIGHT CORNER) */}
          <div className="hidden md:block absolute -top-10 -right-8 xl:-right-14 w-64 h-64 xl:w-84 xl:h-84 pointer-events-none overflow-visible z-0 animate-entrance-right" style={{ animationDelay: '200ms' }}>
            <svg className="w-full h-full" viewBox="0 0 320 320" fill="none">
              <circle cx="300" cy="20" r="140" stroke="#F15A24" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="300" cy="20" r="210" stroke="#F15A24" strokeOpacity="0.35" strokeWidth="2" />
              <circle cx="300" cy="20" r="280" stroke="#0284C7" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="8 4" />
              <g className="animate-orbit-satellite-2">
                <circle cx="160" cy="20" r="7" fill="#F15A24" />
                <circle cx="160" cy="20" r="3" fill="#FFFFFF" />
                <circle cx="160" cy="20" r="12" stroke="#F15A24" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
              </g>
              <g className="animate-orbit-satellite-1">
                <circle cx="90" cy="20" r="6" fill="#0284C7" />
                <circle cx="90" cy="20" r="2.5" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          {/* Synchronized container matching Header alignment */}
          <div className="w-full max-w-[1232px] mx-auto px-3 sm:px-6 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 relative z-10 py-6 sm:py-10">
            
            {/* Header Title Section */}
            <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
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

            {/* 📦 BỘ CÁC HỘP THẺ TRUY CẬP ỨNG DỤNG CON (ĐỒNG BỘ 100% MÀU SẮC, GRADIENT & CHUYỂN ĐỘNG TRANG CHỦ) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-[1232px] mx-auto pb-2">
              {SUB_APPS_GRID.map((app, idx) => {
                const Icon = app.icon;
                if (app.isAvailable) {
                  return (
                    <div
                      key={app.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveApp(app.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveApp(app.id); }}
                      style={{ borderRadius: '26px', animationDelay: `${idx * 100}ms` }}
                      className="group flex flex-col items-center justify-between py-3 sm:py-3.5 px-3 min-h-[106px] sm:min-h-[116px] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none animate-entrance-up"
                    >
                      {/* Hairline top glow on hover */}
                      <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Unified Blue Icon Badge */}
                      <div className="w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
                        <Icon className="w-5.5 h-5.5 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
                      </div>

                      {/* App Title */}
                      <div className="flex flex-col items-center w-full">
                        <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                          {app.title}
                        </h3>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={app.id}
                      style={{ borderRadius: '26px', animationDelay: `${idx * 100}ms` }}
                      onClick={() => alert(`Ứng dụng "${app.title}" sắp được phát hành trong phiên bản đợt tiếp theo!`)}
                      className="flex flex-col items-center justify-between py-3 sm:py-3.5 px-3 min-h-[106px] sm:min-h-[116px] bg-slate-50/60 dark:bg-slate-900/30 rounded-[26px] border border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none animate-entrance-up"
                    >
                      {/* Icon Hộp xám */}
                      <div className="w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-1 bg-white/80 dark:bg-slate-800/40 shrink-0">
                        <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 opacity-60" />
                      </div>

                      {/* Tiêu đề */}
                      <div className="flex flex-col items-center w-full space-y-0.5">
                        <h3 className="text-xs sm:text-[13px] font-bold text-slate-400/80 dark:text-slate-500 whitespace-nowrap leading-tight">
                          {app.title}
                        </h3>
                        <span className="text-[9px] sm:text-[9.5px] font-semibold text-slate-400/60 uppercase tracking-wider">
                          {app.badge}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}

              {/* 4 Thẻ Placeholder Sắp phát hành dự phòng đồng bộ 100% chuẩn Trang chủ */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`sub-placeholder-${idx}`}
                  style={{ borderRadius: '26px', animationDelay: `${(idx + 4) * 100}ms` }}
                  className="flex flex-col items-center justify-between py-3 sm:py-3.5 px-3 min-h-[106px] sm:min-h-[116px] bg-slate-50/60 dark:bg-slate-900/30 rounded-[26px] border border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none animate-entrance-up"
                >
                  <div className="w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-1 bg-white/80 dark:bg-slate-800/40 shrink-0">
                    <Sparkles className="w-5 h-5 text-slate-400 dark:text-slate-500 opacity-60" />
                  </div>
                  <div className="flex flex-col items-center w-full space-y-0.5">
                    <h3 className="text-xs sm:text-[13px] font-normal text-slate-300/60 dark:text-slate-600/60 whitespace-nowrap leading-tight">
                      + Sắp phát hành
                    </h3>
                    <span className="text-[9px] text-slate-400/40 uppercase tracking-wider">AVG ECOSYSTEM</span>
                  </div>
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
