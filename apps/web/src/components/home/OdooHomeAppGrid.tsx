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

      {/* Synchronized container matching Header alignment (max-w-7xl px-4 sm:px-6) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 flex flex-col items-center justify-start md:justify-evenly h-full max-h-full gap-2 sm:gap-3 relative z-10 py-1 sm:py-1.5">
        
        {/* 🛸 VIETTEL AI-STYLE FLOATING TECH CONSTELLATION HERO */}
        <div className="w-full relative flex items-center justify-center shrink-0 mb-1 sm:mb-2 py-3 sm:py-5 px-2 overflow-visible min-h-[220px] sm:min-h-[260px]">
          
          {/* 🌐 SVG NEURAL CONSTELLATION RAYS CONNECTING FLOATING NODES */}
          <div className="absolute inset-0 w-full h-full pointer-events-none -z-0 hidden md:block overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1000 260" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="ray-cyan-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F15A24" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="ray-indigo-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#D97706" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Upper Arc Ray: Số Hóa -> Center -> Tốc Độ */}
              <path
                d="M 120,45 Q 500,0 880,45"
                stroke="url(#ray-cyan-orange)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-kinetic-data"
              />

              {/* Lower Arc Ray: Công Nghệ Hóa -> Center -> Chất Lượng */}
              <path
                d="M 130,215 Q 500,260 870,215"
                stroke="url(#ray-indigo-emerald)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-kinetic-data"
              />

              {/* Cross Connections */}
              <path
                d="M 120,45 Q 500,130 870,215"
                stroke="#0284C7"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <path
                d="M 130,215 Q 500,130 880,45"
                stroke="#F15A24"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* 🛰️ FLOATING NODE 1: SỐ HÓA (Top-Left Orbital) */}
          <div className="hidden md:flex absolute left-0 lg:left-4 top-2 z-20 group cursor-default items-center gap-2.5 animate-float-node-1">
            <div className="relative w-12 h-12 lg:w-13 lg:h-13 flex items-center justify-center shrink-0">
              <div className="absolute -inset-2.5 rounded-full border border-sky-400/40 dark:border-sky-500/30 animate-kinetic-ripple pointer-events-none" />
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-[#0284C7]/50 dark:border-sky-400/40 animate-kinetic-spin pointer-events-none" />
              <div className="w-full h-full rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-sky-200 dark:border-sky-700/80 shadow-md group-hover:shadow-sky-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Binary className="w-6 h-6 text-[#0284C7] dark:text-sky-400 drop-shadow-xs" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#0284C7] animate-ping" />
            </div>
            <div className="flex flex-col items-start px-2.5 py-1 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-sky-200 dark:border-sky-800 shadow-xs group-hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span className="text-[11px] lg:text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider whitespace-nowrap">
                  Số Hóa
                </span>
              </div>
              <span className="text-[9px] font-semibold text-sky-600 dark:text-sky-400 leading-none whitespace-nowrap">
                Real-time Data
              </span>
            </div>
          </div>

          {/* 🛰️ FLOATING NODE 2: CÔNG NGHỆ HÓA (Bottom-Left Orbital) */}
          <div className="hidden md:flex absolute left-2 lg:left-8 bottom-1 z-20 group cursor-default items-center gap-2.5 animate-float-node-2">
            <div className="relative w-12 h-12 lg:w-13 lg:h-13 flex items-center justify-center shrink-0">
              <div className="absolute -inset-2.5 rounded-full border border-indigo-400/40 dark:border-indigo-500/30 animate-kinetic-ripple pointer-events-none" style={{ animationDelay: '0.8s' }} />
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-indigo-500/50 dark:border-indigo-400/40 animate-kinetic-spin-rev pointer-events-none" />
              <div className="w-full h-full rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-indigo-200 dark:border-indigo-700/80 shadow-md group-hover:shadow-indigo-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400 drop-shadow-xs" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            </div>
            <div className="flex flex-col items-start px-2.5 py-1 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-indigo-200 dark:border-indigo-800 shadow-xs group-hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span className="text-[11px] lg:text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider whitespace-nowrap">
                  Công Nghệ Hóa
                </span>
              </div>
              <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 leading-none whitespace-nowrap">
                Tự Động Hóa AI
              </span>
            </div>
          </div>

          {/* 🎯 TRUNG TÂM: MAIN HEADLINE & SLOGAN BADGE & CENTER VALUE NODE */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto z-10">
            <div className="w-fit mx-auto space-y-2 sm:space-y-2.5 py-0.5 flex flex-col items-center text-center">
              
              {/* Main Headline (Gióng lề phẳng 3 dòng với khoảng cách tự nhiên giữa các từ) */}
              <div className="space-y-1 sm:space-y-1.5 w-fit flex flex-col items-start justify-start text-left">
                
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

              {/* Slogan Badge & Center Floating Node */}
              <div className="pt-1.5 text-center w-full flex flex-col items-center gap-2">
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

                {/* 🛰️ FLOATING NODE 5: GIÁ TỐI ƯU (Center Anchor Orb) */}
                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-amber-200 dark:border-amber-700/80 shadow-xs hover:shadow-amber-400/20 group cursor-default animate-float-node-5 transition-all duration-300">
                  <div className="relative w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Coins className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <div className="absolute -inset-1 rounded-full border border-amber-400/30 animate-kinetic-ripple pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-1.5 text-left">
                    <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wide">
                      Giá Tối Ưu
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      Tiết Kiệm Chi Phí
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 🛰️ FLOATING NODE 3: TỐC ĐỘ (Top-Right Orbital) */}
          <div className="hidden md:flex absolute right-0 lg:right-4 top-2 z-20 group cursor-default items-center gap-2.5 animate-float-node-3">
            <div className="flex flex-col items-end px-2.5 py-1 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-orange-200 dark:border-orange-800 shadow-xs group-hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] lg:text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider whitespace-nowrap">
                  Tốc Độ
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
              </div>
              <span className="text-[9px] font-semibold text-orange-600 dark:text-orange-400 leading-none whitespace-nowrap">
                Vận Hành Tức Thì
              </span>
            </div>
            <div className="relative w-12 h-12 lg:w-13 lg:h-13 flex items-center justify-center shrink-0">
              <div className="absolute -inset-2.5 rounded-full border border-orange-400/40 dark:border-orange-500/30 animate-kinetic-ripple pointer-events-none" style={{ animationDelay: '0.4s' }} />
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-[#F15A24]/50 dark:border-orange-400/40 animate-kinetic-spin pointer-events-none" />
              <div className="w-full h-full rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-orange-200 dark:border-orange-700/80 shadow-md group-hover:shadow-orange-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Zap className="w-6 h-6 text-[#F15A24] dark:text-orange-400 drop-shadow-xs" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F15A24] animate-ping" />
            </div>
          </div>

          {/* 🛰️ FLOATING NODE 4: CHẤT LƯỢNG (Bottom-Right Orbital) */}
          <div className="hidden md:flex absolute right-2 lg:right-8 bottom-1 z-20 group cursor-default items-center gap-2.5 animate-float-node-4">
            <div className="flex flex-col items-end px-2.5 py-1 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-xs group-hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] lg:text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider whitespace-nowrap">
                  Chất Lượng
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
              <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 leading-none whitespace-nowrap">
                Chuẩn Mực Tối Ưu
              </span>
            </div>
            <div className="relative w-12 h-12 lg:w-13 lg:h-13 flex items-center justify-center shrink-0">
              <div className="absolute -inset-2.5 rounded-full border border-emerald-400/40 dark:border-emerald-500/30 animate-kinetic-ripple pointer-events-none" style={{ animationDelay: '1.2s' }} />
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-emerald-500/50 dark:border-emerald-400/40 animate-kinetic-spin-rev pointer-events-none" />
              <div className="w-full h-full rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-200 dark:border-emerald-700/80 shadow-md group-hover:shadow-emerald-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400 drop-shadow-xs" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            </div>
          </div>

          {/* 📱 MOBILE / TABLET FLOATING CONSTELLATION ROW (< md screens) */}
          <div className="md:hidden flex flex-wrap items-center justify-center gap-2 mt-3 w-full">
            {STRATEGIC_PILLARS.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              const floatClasses = [
                'animate-float-node-1',
                'animate-float-node-2',
                'animate-float-node-3',
                'animate-float-node-4',
                'animate-float-node-5'
              ];
              return (
                <div
                  key={pillar.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border ${pillar.borderColor} shadow-xs ${floatClasses[idx % floatClasses.length]}`}
                >
                  <div className={`w-5 h-5 rounded-full ${pillar.bgColor} flex items-center justify-center shrink-0`}>
                    <PillarIcon className={`w-3 h-3 ${pillar.color}`} />
                  </div>
                  <span className="text-[10px] font-black text-slate-800 dark:text-white">
                    {pillar.label}
                  </span>
                </div>
              );
            })}
          </div>

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
