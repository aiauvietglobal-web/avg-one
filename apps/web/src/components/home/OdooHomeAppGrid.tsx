import React from 'react';
import {
  Boxes, Users, Calendar, FolderKanban, ShieldCheck, Newspaper, BarChart3, Clock, Scale, Sparkles, CheckCircle2, Wallet, Lightbulb, LayoutGrid,
  Compass, Eye, Layers, Shield, Box, Activity, Workflow, Target, Lock, ArrowUpRight, Cpu,
  Binary, Zap, Rocket, Award, Gem, Coins, CircleDollarSign, Gauge, Database, TrendingDown
} from 'lucide-react';
import { AppModuleId } from '../layout/AppLauncherModal';

// 5 TRỤ CỘT CHIẾN LƯỢC: SỐ HÓA - CÔNG NGHỆ HÓA - TỐC ĐỘ - CHẤT LƯỢNG - GIÁ
export const STRATEGIC_PILLARS = [
  {
    id: 'digital',
    label: 'Số Hóa',
    subLabel: '100% Real-time Data',
    icon: Binary,
    color: 'text-[#0284C7] dark:text-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950/70',
    borderColor: 'border-sky-200 dark:border-sky-800/80',
    glowHover: 'hover:border-[#0284C7] hover:shadow-sky-400/20'
  },
  {
    id: 'technology',
    label: 'Công Nghệ Hóa',
    subLabel: 'Tự Động Hóa AI',
    icon: Cpu,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/70',
    borderColor: 'border-indigo-200 dark:border-indigo-800/80',
    glowHover: 'hover:border-indigo-500 hover:shadow-indigo-400/20'
  },
  {
    id: 'speed',
    label: 'Tốc Độ',
    subLabel: 'Vận Hành Tức Thì',
    icon: Zap,
    color: 'text-[#F15A24] dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/70',
    borderColor: 'border-orange-200 dark:border-orange-800/80',
    glowHover: 'hover:border-[#F15A24] hover:shadow-orange-400/20'
  },
  {
    id: 'quality',
    label: 'Chất Lượng',
    subLabel: 'Chuẩn Mực Tối Ưu',
    icon: Award,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/70',
    borderColor: 'border-emerald-200 dark:border-emerald-800/80',
    glowHover: 'hover:border-emerald-500 hover:shadow-emerald-400/20'
  },
  {
    id: 'value',
    label: 'Giá Tối Ưu',
    subLabel: 'Tiết Kiệm Chi Phí',
    icon: Coins,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/70',
    borderColor: 'border-amber-200 dark:border-amber-800/80',
    glowHover: 'hover:border-amber-500 hover:shadow-amber-400/20'
  }
];

export const HOME_APP_MODULES = [
  {
    id: 'apps' as AppModuleId,
    name: 'Ứng Dụng',
    icon: Cpu,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-sky-50 dark:bg-sky-950/80 border-sky-200 dark:border-sky-800 shadow-2xs'
  },
  {
    id: 'hr' as AppModuleId,
    name: 'Nhân Sự',
    icon: Users,
    iconColor: 'text-blue-600 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 shadow-2xs'
  },
  {
    id: 'legal' as AppModuleId,
    name: 'Pháp Lý',
    icon: Scale,
    iconColor: 'text-indigo-600 dark:text-indigo-300',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800 shadow-2xs'
  },
  {
    id: 'finance' as AppModuleId,
    name: 'Tài Chính',
    icon: Coins,
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 shadow-2xs'
  },
  {
    id: 'rd' as AppModuleId,
    name: 'Nghiên Cứu & Sáng Tạo',
    icon: Sparkles,
    iconColor: 'text-[#F15A24] dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-950/80 border-orange-200 dark:border-orange-800 shadow-2xs'
  }
];

interface OdooHomeAppGridProps {
  onSelectModule: (moduleId: AppModuleId) => void;
}

export const OdooHomeAppGrid: React.FC<OdooHomeAppGridProps> = ({ onSelectModule }) => {
  return (
    <div className="w-full h-full flex-1 min-h-0 bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-y-auto md:overflow-hidden flex flex-col items-center justify-start md:justify-center p-2 sm:p-3 select-none">
      
      {/* 🌐 ULTRA-CLEAN GRID LINES PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-60 dark:opacity-30 pointer-events-none -z-0" />

      {/* 🎨 RADIANT AMBIENT COLOR MESHES (MẢNG MÀU CHUYỂN SẮC RỰC RỠ, CHUYỂN ĐỘNG RÕ NÉT) */}
      <div className="absolute top-2 left-4 sm:left-16 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-tr from-sky-400/20 via-[#0284C7]/15 to-transparent rounded-full blur-[85px] pointer-events-none -z-0 animate-kinetic-glow" />
      <div className="absolute top-2 right-4 sm:right-16 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-bl from-amber-400/18 via-[#F15A24]/18 to-transparent rounded-full blur-[85px] pointer-events-none -z-0 animate-kinetic-glow" />
      <div className="absolute bottom-4 left-1/3 w-[400px] sm:w-[560px] h-[260px] bg-gradient-to-t from-sky-300/12 via-emerald-300/10 to-transparent rounded-full blur-[90px] pointer-events-none -z-0" />

      {/* 📐 FLOATING COLOR PLANES (MẢNG MÀU HÌNH HỌC VÁT GÓC ĐA CHIỀU) */}
      <div className="absolute top-10 left-6 sm:left-14 w-44 sm:w-64 h-24 sm:h-36 rounded-3xl bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-transparent backdrop-blur-xs border border-sky-300/50 dark:border-sky-600/40 shadow-lg shadow-sky-500/10 pointer-events-none -z-0 animate-kinetic-float-1 -rotate-6 hidden md:block" />
      <div className="absolute top-12 right-6 sm:right-14 w-44 sm:w-64 h-24 sm:h-36 rounded-3xl bg-gradient-to-bl from-orange-400/20 via-[#F15A24]/10 to-transparent backdrop-blur-xs border border-orange-300/50 dark:border-orange-600/40 shadow-lg shadow-orange-500/10 pointer-events-none -z-0 animate-kinetic-float-2 rotate-6 hidden md:block" />

      {/* Synchronized container matching Header alignment (max-w-7xl px-4 sm:px-6) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 flex flex-col items-center justify-start md:justify-evenly h-full max-h-full gap-2 sm:gap-3 relative z-10 py-1 sm:py-1.5">
        
        {/* 🚀 MODERN KINETIC HERO ROW */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-6 lg:gap-8 shrink-0 mb-1 sm:mb-2 relative">
          
          {/* 🔷 KHỐI TRÁI: DATA CUBE (SỐ HÓA & CÔNG NGHỆ) */}
          <div className="hidden sm:flex flex-col items-center shrink-0 animate-kinetic-float-1 relative group cursor-default">
            <div className="absolute -inset-3 rounded-full border border-sky-400/40 dark:border-sky-500/30 animate-kinetic-ripple pointer-events-none" />
            <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#0284C7]/50 dark:border-sky-400/40 animate-kinetic-spin pointer-events-none" />

            {/* 3D Isometric Data Cube with Binary & Circuit Lines */}
            <svg width="100" height="105" viewBox="0 0 100 105" fill="none" className="drop-shadow-md overflow-visible">
              <polygon points="50,14 88,34 50,54 12,34" fill="#0284C7" fillOpacity="0.22" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
              <polygon points="12,34 50,54 50,92 12,72" fill="#0369A1" fillOpacity="0.3" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
              <polygon points="50,54 88,34 88,72 50,92" fill="#38BDF8" fillOpacity="0.18" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
              
              <line x1="50" y1="14" x2="50" y2="54" stroke="#00A8E8" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="12" y1="72" x2="50" y2="54" stroke="#00A8E8" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="88" y1="72" x2="50" y2="54" stroke="#00A8E8" strokeWidth="1.5" strokeDasharray="4 3" />

              <circle cx="50" cy="14" r="3" fill="#0284C7" />
              <circle cx="88" cy="34" r="3" fill="#0284C7" />
              <circle cx="12" cy="34" r="3" fill="#0284C7" />
              <circle cx="50" cy="92" r="3.5" fill="#0284C7" />
              
              <circle cx="50" cy="54" r="5" fill="#00A8E8" className="animate-ping" style={{ transformOrigin: '50px 54px' }} />
              <circle cx="50" cy="54" r="4" fill="#00A8E8" />
              <circle cx="50" cy="54" r="2" fill="#FFFFFF" />
            </svg>

            {/* Frosted Glass Badge with Binary Icon */}
            <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-sky-300 dark:border-sky-700 shadow-sm text-sky-800 dark:text-sky-300">
              <Binary className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">Số Hóa</span>
            </div>
          </div>

          {/* 🎯 TRUNG TÂM: MAIN HEADLINE & SLOGAN BADGE */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto z-10">
            <div className="w-fit mx-auto space-y-2.5 sm:space-y-3 py-0.5 flex flex-col items-start">
              
              {/* Main Headline (Gióng lề trái phẳng 3 dòng với khoảng cách tự nhiên giữa các từ) */}
              <div className="space-y-1.5 sm:space-y-2 w-fit flex flex-col items-start justify-start text-left">
                
                {/* Hàng 1: Một nền tảng Vững chắc! */}
                <div className="animate-hero-row-1 text-[1.35rem] xs:text-[1.6rem] sm:text-[1.95rem] lg:text-[2.35rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-3.5 flex-nowrap whitespace-nowrap justify-start">
                  <span>Một nền tảng</span>
                  <span className="relative inline-block px-1">
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #0077B6 0%, #00A8E8 50%, #48CAE4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                      }}
                      className="relative z-10 font-black animate-hero-accent-1"
                    >
                      Vững chắc!
                    </span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#0284C7] opacity-60 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,0 200,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-1" />
                    </svg>
                  </span>
                </div>

                {/* Hàng 2: Một định hướng Rõ ràng! */}
                <div className="animate-hero-row-2 text-[1.35rem] xs:text-[1.6rem] sm:text-[1.95rem] lg:text-[2.35rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-3.5 flex-nowrap whitespace-nowrap justify-start">
                  <span>Một định hướng</span>
                  <span className="relative inline-block px-1">
                    <span className="relative z-10 font-black hero-gradient-ro-rang animate-hero-accent-2">
                      Rõ ràng!
                    </span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#231F20] dark:text-slate-400 opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,18 200,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-2" />
                    </svg>
                  </span>
                </div>

                {/* Hàng 3: Một đích đến Tươi sáng! */}
                <div className="animate-hero-row-3 text-[1.35rem] xs:text-[1.6rem] sm:text-[1.95rem] lg:text-[2.35rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-3.5 flex-nowrap whitespace-nowrap justify-start">
                  <span>Một đích đến</span>
                  <span className="relative inline-block px-1">
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #E63946 0%, #F15A24 45%, #FF9F1C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                      }}
                      className="relative z-10 font-black animate-hero-accent-3"
                    >
                      Tươi sáng!
                    </span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-60 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                    </svg>
                  </span>
                </div>

              </div>

              {/* Slogan Badge & 5 Strategic Value Pillars */}
              <div className="pt-2 sm:pt-2.5 text-left w-full flex flex-col items-start gap-2.5">
                <div className="relative inline-block p-0.5 rounded-full transition-all duration-300 max-w-full">
                  {/* SVG Clockwise Border Tracing Effect */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-full" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                      rx="20"
                      ry="20"
                      fill="none"
                      stroke="url(#slogan-border-gradient)"
                      strokeWidth="1.5"
                      className="animate-slogan-box-border"
                    />
                  </svg>

                  <p className="animate-hero-slogan relative z-10 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-transparent text-[11px] xs:text-xs sm:text-[13px] font-extrabold text-slate-700 dark:text-slate-200 tracking-wide whitespace-nowrap">
                    <span>One Platform</span>
                    <span className="animate-hero-dot-1 w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span>One Direction</span>
                    <span className="animate-hero-dot-2 w-1.5 h-1.5 rounded-full bg-[#231F20] dark:bg-slate-400 shrink-0" />
                    <span>One Destination</span>
                  </p>
                </div>

                {/* 💎 5 TRỤ CỘT CHIẾN LƯỢC: SỐ HÓA • CÔNG NGHỆ HÓA • TỐC ĐỘ • CHẤT LƯỢNG • GIÁ */}
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2 w-full pt-0.5">
                  {STRATEGIC_PILLARS.map((pillar) => {
                    const PillarIcon = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border ${pillar.borderColor} ${pillar.glowHover} shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
                      >
                        <div className={`w-6 h-6 rounded-lg ${pillar.bgColor} flex items-center justify-center shrink-0 border ${pillar.borderColor} group-hover:scale-110 transition-transform`}>
                          <PillarIcon className={`w-3.5 h-3.5 ${pillar.color}`} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <div className="text-[11px] font-black leading-tight text-slate-800 dark:text-white">
                            {pillar.label}
                          </div>
                          <div className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 leading-none truncate hidden lg:block">
                            {pillar.subLabel}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>

          {/* 🔶 KHỐI PHẢI: FACETED PRISM CRYSTAL (TỐC ĐỘ & CHẤT LƯỢNG & GIÁ TRỊ) */}
          <div className="hidden sm:flex flex-col items-center shrink-0 animate-kinetic-float-2 relative group cursor-default">
            {/* Pulsing Radar Aura */}
            <div className="absolute -inset-3 rounded-full border border-orange-400/40 dark:border-orange-500/30 animate-kinetic-ripple pointer-events-none" style={{ animationDelay: '1s' }} />
            
            {/* Rotating Technical Gyroscope Ring (Counter-clockwise) */}
            <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#F15A24]/50 dark:border-orange-400/40 animate-kinetic-spin-rev pointer-events-none" />

            {/* Faceted Hexagonal Crystal SVG with Vibrant Lines & Optical Laser Sweep */}
            <div className="relative overflow-visible">
              <svg width="100" height="105" viewBox="0 0 100 105" fill="none" className="drop-shadow-md overflow-visible">
                <polygon points="50,10 88,32 88,76 50,96 12,76 12,32" fill="#F15A24" fillOpacity="0.2" stroke="#F15A24" strokeWidth="2" strokeLinejoin="round" />
                
                <line x1="50" y1="10" x2="50" y2="54" stroke="#FFA000" strokeWidth="1.5" />
                <line x1="88" y1="32" x2="50" y2="54" stroke="#FFA000" strokeWidth="1.5" />
                <line x1="88" y1="76" x2="50" y2="54" stroke="#FFA000" strokeWidth="1.5" />
                <line x1="50" y1="96" x2="50" y2="54" stroke="#FFA000" strokeWidth="1.5" />
                <line x1="12" y1="76" x2="50" y2="54" stroke="#FFA000" strokeWidth="1.5" />
                <line x1="12" y1="32" x2="50" y2="54" stroke="#FFA000" strokeWidth="1.5" />

                <circle cx="50" cy="10" r="3" fill="#F15A24" />
                <circle cx="88" cy="32" r="3" fill="#F15A24" />
                <circle cx="88" cy="76" r="3" fill="#F15A24" />
                <circle cx="50" cy="96" r="3.5" fill="#F15A24" />
                <circle cx="12" cy="76" r="3" fill="#F15A24" />
                <circle cx="12" cy="32" r="3" fill="#F15A24" />

                <circle cx="50" cy="54" r="5" fill="#FF7043" className="animate-ping" style={{ transformOrigin: '50px 54px' }} />
                <circle cx="50" cy="54" r="4" fill="#FFA000" />
                <circle cx="50" cy="54" r="2" fill="#FFFFFF" />
              </svg>

              {/* Laser Light Beam Sweeping Across the Crystal */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-xs animate-kinetic-laser" />
              </div>
            </div>

            {/* Frosted Glass Badge with Zap & Award Icon */}
            <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-orange-300 dark:border-orange-700 shadow-sm text-orange-800 dark:text-orange-300">
              <Zap className="w-3.5 h-3.5 text-[#F15A24] shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">Tốc Độ</span>
            </div>
          </div>

        </div>

        {/* ⚡ KINETIC DATA BEAM CIRCUIT CONNECTING LEFT & RIGHT */}
        <div className="w-full max-w-4xl h-3 pointer-events-none relative -my-1 hidden sm:block">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 12">
            <defs>
              <linearGradient id="kinetic-beam-stream" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F15A24" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 10,6 Q 200,12 390,6"
              fill="none"
              stroke="url(#kinetic-beam-stream)"
              strokeWidth="2"
              className="animate-kinetic-data"
            />
          </svg>
        </div>

        {/* Centered Odoo App Grid (Kiểu dáng hộp bo tròn 28px y hệt bản Desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 w-full shrink-0 mt-2 sm:mt-4">
          {HOME_APP_MODULES.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectModule(app.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectModule(app.id); }}
                style={{ borderRadius: '28px' }}
                className="group flex flex-col items-center justify-center py-3 sm:py-3.5 px-2.5 min-h-[102px] sm:min-h-[112px] bg-gradient-to-b from-[#BAE6FD] via-[#E2F2FE]/70 to-white dark:from-sky-950/60 dark:via-slate-900/80 dark:to-slate-950 rounded-[28px] border-2 border-[#7DD3FC] dark:border-sky-800/80 hover:border-[#0284C7] dark:hover:border-sky-400 hover:from-[#A5DBFE] hover:via-[#D6EEFE] hover:to-white dark:hover:from-sky-900/60 dark:hover:to-blue-900/60 hover:-translate-y-0.5 transition-all duration-200 text-center relative overflow-hidden shadow-xs hover:shadow-md hover:shadow-sky-400/25 cursor-pointer select-none"
              >
                {/* App Colorful Icon */}
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${app.bgColor} border flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shrink-0`}>
                  <Icon className={`w-5 h-5 ${app.iconColor}`} />
                </div>
                
                {/* App Title */}
                <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-normal leading-tight w-full px-0.5">
                  {app.name}
                </h3>
              </div>
            );
          })}

          {/* Placeholder Slots for Future Expansion (5 vị trí tương lai tạo thành 2 hàng x 5 cột trọn vẹn) */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={`placeholder-${idx}`}
              style={{ borderRadius: '28px' }}
              className={`flex flex-col items-center justify-center py-3 sm:py-3.5 px-2.5 min-h-[102px] sm:min-h-[112px] bg-slate-50/70 dark:bg-slate-900/30 rounded-[28px] border-2 border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none ${idx >= 3 ? 'hidden sm:flex' : ''}`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-1.5 bg-white/80 dark:bg-slate-800/40 shrink-0">
                <Sparkles className="w-4 h-4 text-slate-400 dark:text-slate-500 opacity-60" />
              </div>
              <h3 className="text-xs font-normal text-slate-300/50 dark:text-slate-600/50 whitespace-normal leading-tight w-full px-0.5 opacity-50">
                + Sắp ra mắt
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
