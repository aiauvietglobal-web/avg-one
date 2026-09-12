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
      
      {/* 🌐 ULTRA-CLEAN GRID LINES & FACETED ANGLED POLYGON PLANES (PHONG CÁCH MẢNG HÌNH HỌC VIETTEL AI) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.75rem_2.75rem] opacity-50 dark:opacity-25 pointer-events-none -z-0" />

      {/* 🎨 ANGLED FACETED GEOMETRIC PLANES (MẢNG VÁT ĐA GIÁC ĐẶC TRƯNG VIETTEL AI) */}
      <div className="absolute -top-12 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-sky-400/15 via-[#0284C7]/10 to-transparent [clip-path:polygon(0_0,100%_0,65%_100%,0_80%)] pointer-events-none -z-0" />
      <div className="absolute -top-12 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-orange-400/15 via-[#F15A24]/10 to-transparent [clip-path:polygon(35%_0,100%_0,100%_80%,0_100%)] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-sky-300/10 via-emerald-300/8 to-transparent rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Synchronized widescreen container (Tận dụng toàn diện màn hình rộng) */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-10 flex flex-col items-center justify-start md:justify-evenly h-full max-h-full gap-2 sm:gap-3.5 relative z-10 py-1 sm:py-2">
        
        {/* 🛸 VIETTEL AI-STYLE VECTOR LINE-ART & GEOMETRIC ANIMATED HERO */}
        <div className="w-full relative flex items-center justify-center shrink-0 mb-1 sm:mb-2 py-4 sm:py-7 px-2 overflow-visible min-h-[250px] sm:min-h-[290px] xl:min-h-[330px]">
          
          {/* 🪐 1. LARGE CONCENTRIC ORBITAL RINGS WITH LIVE REVOLVING SATELLITES (TOP-RIGHT CORNER) */}
          <div className="hidden md:block absolute -top-10 -right-8 xl:-right-14 w-64 h-64 xl:w-84 xl:h-84 pointer-events-none overflow-visible z-0 animate-entrance-right" style={{ animationDelay: '200ms' }}>
            <svg className="w-full h-full" viewBox="0 0 320 320" fill="none">
              {/* Inner Concentric Orbit (r=140) */}
              <circle cx="300" cy="20" r="140" stroke="#F15A24" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="6 6" />
              {/* Middle Concentric Orbit (r=210) */}
              <circle cx="300" cy="20" r="210" stroke="#F15A24" strokeOpacity="0.35" strokeWidth="2" />
              {/* Outer Sweeping Orbit (r=280) */}
              <circle cx="300" cy="20" r="280" stroke="#0284C7" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="8 4" />
              
              {/* 🛰️ Revolving Satellites on Orbit 1 (Counter-Clockwise) */}
              <g className="animate-orbit-satellite-2">
                <circle cx="160" cy="20" r="7" fill="#F15A24" />
                <circle cx="160" cy="20" r="3" fill="#FFFFFF" />
                <circle cx="160" cy="20" r="12" stroke="#F15A24" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
              </g>

              {/* 🛰️ Revolving Satellites on Orbit 2 (Clockwise) */}
              <g className="animate-orbit-satellite-1">
                <circle cx="90" cy="20" r="6" fill="#0284C7" />
                <circle cx="90" cy="20" r="2.5" fill="#FFFFFF" />
                <circle cx="510" cy="20" r="5" fill="#F15A24" />
                <circle cx="510" cy="20" r="2" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          {/* 📐 MINIMALIST HAIRLINE INTERCONNECT (SỢI QUANG KẾT NỐI TỐI GIẢN BAUHAUS) */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1200 320">
            <defs>
              <linearGradient id="hairline-laser-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.45" />
                <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Sợi quang 1: AI Node -> Tiêu đề "Một nền tảng Vững chắc!" */}
            <path
              d="M 285,46 C 360,46 410,68 490,72"
              fill="none"
              stroke="url(#hairline-laser-fade)"
              strokeWidth="1.25"
              strokeDasharray="4 6"
              className="animate-bauhaus-pulse"
            />
            <circle cx="285" cy="46" r="2" fill="#0284C7">
              <animateMotion
                path="M 285,46 C 360,46 410,68 490,72"
                dur="4.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Sợi quang 2: AI Node -> Đồ thị số hóa bên dưới */}
            <path
              d="M 115,70 L 115,180 L 135,242"
              fill="none"
              stroke="#0284C7"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="3 5"
              className="animate-bauhaus-pulse"
            />
            <circle cx="115" cy="70" r="1.5" fill="#38BDF8">
              <animateMotion
                path="M 115,70 L 115,180 L 135,242"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* 📐 2. FLAT MODERNIST TECH AI NODE (TOP-LEFT - STRIPE & VERCEL STYLE) */}
          <div className="hidden lg:flex absolute left-2 xl:left-8 top-2 xl:top-5 z-20 items-center animate-entrance-left animate-float-node-1 cursor-default group transition-all duration-300" style={{ animationDelay: '150ms' }}>
            {/* Pure Bauhaus Glass Card */}
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-2xs hover:border-sky-400/80 dark:hover:border-sky-500/80 hover:shadow-md transition-all duration-300">
              
              {/* Flat Bauhaus Hexagonal Isometric Prism Graphic */}
              <div className="relative w-12 h-12 xl:w-14 xl:h-14 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" className="overflow-visible">
                  {/* Subtle Bauhaus Facet Tints (Thuần sắc độ phẳng kỷ hà) */}
                  {/* Top Face */}
                  <polygon
                    points="32,8 52.8,20 32,32 11.2,20"
                    fill="#0284C7"
                    className="fill-sky-500/10 dark:fill-sky-400/15"
                  />
                  {/* Left Face */}
                  <polygon
                    points="11.2,20 32,32 32,56 11.2,44"
                    fill="#0284C7"
                    className="fill-sky-600/15 dark:fill-sky-400/25"
                  />
                  {/* Right Face */}
                  <polygon
                    points="32,32 52.8,20 52.8,44 32,56"
                    fill="#0284C7"
                    className="fill-sky-700/20 dark:fill-sky-400/35"
                  />

                  {/* Nested Bauhaus Inverted Equilateral Triangle (Hairline Accent) */}
                  <polygon
                    points="52.8,20 32,56 11.2,20"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    className="opacity-60"
                  />

                  {/* Outer Hexagon Contour (Hairline 1.25px Precision Line) */}
                  <polygon
                    points="32,8 52.8,20 52.8,44 32,56 11.2,44 11.2,20"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-sky-400"
                  />

                  {/* 3 Isometric Bauhaus Axis Lines */}
                  <line x1="32" y1="32" x2="32" y2="8" stroke="#0284C7" strokeWidth="1.25" className="dark:stroke-sky-400" />
                  <line x1="32" y1="32" x2="52.8" y2="44" stroke="#0284C7" strokeWidth="1.25" className="dark:stroke-sky-400" />
                  <line x1="32" y1="32" x2="11.2" y2="44" stroke="#0284C7" strokeWidth="1.25" className="dark:stroke-sky-400" />

                  {/* Center Minimalist Micro Singularity & Breathing Pulse */}
                  <circle cx="32" cy="32" r="6.5" stroke="#0284C7" strokeWidth="0.85" fill="none" className="animate-ping opacity-30 dark:stroke-sky-400" style={{ animationDuration: '3.6s' }} />
                  <circle cx="32" cy="32" r="2.75" fill="#0284C7" className="animate-bauhaus-core dark:fill-sky-400" />
                  <circle cx="32" cy="32" r="1" fill="#FFFFFF" />

                  {/* 6 Minimalist Hairline Vertex Nodes (1.75px Clean Accent) */}
                  <circle cx="32" cy="8" r="1.75" fill="#0284C7" className="dark:fill-sky-400" />
                  <circle cx="52.8" cy="20" r="1.75" fill="#0284C7" className="dark:fill-sky-400" />
                  <circle cx="52.8" cy="44" r="1.75" fill="#0284C7" className="dark:fill-sky-400" />
                  <circle cx="32" cy="56" r="1.75" fill="#0284C7" className="dark:fill-sky-400" />
                  <circle cx="11.2" cy="44" r="1.75" fill="#0284C7" className="dark:fill-sky-400" />
                  <circle cx="11.2" cy="20" r="1.75" fill="#0284C7" className="dark:fill-sky-400" />
                </svg>
              </div>

              {/* Minimalist Modern Typography */}
              <div className="flex flex-col text-left pr-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] xl:text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 tracking-wider">
                    AVG ONE // AI
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                </div>
                <span className="text-xs xl:text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Kiến tạo Nền tảng Số
                </span>
                <span className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-0.5">
                  Công nghệ hóa vững chắc
                </span>
              </div>
            </div>
          </div>

          {/* ⚡ 3. MINIMALIST AUTOMATION & TASK INDICATOR (TOP-RIGHT - STRIPE & VERCEL STYLE) */}
          <div className="hidden lg:flex absolute right-14 xl:right-28 top-2 xl:top-6 z-20 items-center gap-3 animate-entrance-right animate-float-node-3 cursor-default group transition-all duration-300" style={{ animationDelay: '300ms' }}>
            {/* Minimalist Glass Card */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-2xs hover:border-orange-400/80 transition-all duration-300">
              {/* Minimalist Pulse Orb with Zap */}
              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/60 flex items-center justify-center text-[#F15A24] shrink-0">
                <Zap className="w-4 h-4 fill-[#F15A24]/20 animate-pulse" />
              </div>

              {/* 3 Minimalist Task Bars */}
              <div className="flex flex-col gap-1.5 w-16">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                  <div className="h-1 flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <div className="h-1 flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="h-1 flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>

              {/* Minimalist Micro Label */}
              <div className="flex flex-col text-left pl-1 border-l border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 tracking-wider">
                  FLOW // AUTO
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight whitespace-nowrap">
                  Tự động hóa
                </span>
              </div>
            </div>
          </div>

          {/* 📈 4. DATA CONSTELLATION ZIGZAG LINE GRAPH (BOTTOM-LEFT - FLAT MODERNIST) */}
          <div className="hidden md:flex absolute left-4 xl:left-12 bottom-2 xl:bottom-5 z-20 items-center gap-3 animate-entrance-left animate-float-node-2 cursor-default group transition-all duration-300" style={{ animationDelay: '450ms' }}>
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-2xs hover:border-sky-400/80 transition-all duration-300">
              <svg width="120" height="42" viewBox="0 0 140 50" fill="none" className="overflow-visible">
                {/* Hairline Zigzag Line */}
                <polyline
                  points="8,42 45,14 88,32 132,8"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-sky-400"
                />
                <polyline
                  points="8,42 45,14 88,32 132,8"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="animate-kinetic-data"
                />

                {/* 4 Minimalist Hairline Vertex Nodes */}
                <circle cx="8" cy="42" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" className="dark:stroke-sky-400" />
                <circle cx="45" cy="14" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" className="dark:stroke-sky-400" />
                <circle cx="88" cy="32" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" className="dark:stroke-sky-400" />
                <circle cx="132" cy="8" r="3.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1" className="dark:fill-sky-400" />
                <circle cx="132" cy="8" r="1.5" fill="#FFFFFF" className="animate-ping" style={{ transformOrigin: '132px 8px' }} />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 tracking-wider">
                  REAL-TIME
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Số Hóa Toàn Diện
                </span>
                <span className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Chuẩn xác tức thì
                </span>
              </div>
            </div>
          </div>

          {/* 💬 5. MINIMALIST SOUNDWAVE & MULTI-CHANNEL (BOTTOM-RIGHT - FLAT MODERNIST) */}
          <div className="hidden md:flex absolute right-4 xl:right-14 bottom-2 xl:bottom-5 z-20 items-center gap-3 animate-entrance-right animate-float-node-4 cursor-default group transition-all duration-300" style={{ animationDelay: '550ms' }}>
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-2xs hover:border-orange-400/80 transition-all duration-300">
              {/* Minimalist 5-Bar Soundwave */}
              <div className="flex items-end gap-1 h-5 px-1">
                <div className="w-1 bg-[#F15A24] rounded-full animate-soundwave-1" />
                <div className="w-1 bg-[#0284C7] rounded-full animate-soundwave-2" />
                <div className="w-1 bg-sky-400 rounded-full animate-soundwave-3" />
                <div className="w-1 bg-emerald-500 rounded-full animate-soundwave-4" />
                <div className="w-1 bg-amber-400 rounded-full animate-soundwave-2" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 tracking-wider">
                  VOICE // CHAT
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Tương Tác Đa Kênh
                </span>
                <span className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Thông suốt mọi lúc
                </span>
              </div>
            </div>
          </div>

          {/* 🎯 TRUNG TÂM: MAIN HEADLINE & SLOGAN BADGE & DOWN NAVIGATION */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto z-10 animate-entrance-up" style={{ animationDelay: '100ms' }}>
            <div className="w-fit mx-auto space-y-2 sm:space-y-2.5 py-0.5 flex flex-col items-center text-center">
              
              {/* Main Headline (Gióng lề phẳng 3 dòng với khoảng cách tự nhiên giữa các từ) */}
              <div className="space-y-1 sm:space-y-1.5 w-fit flex flex-col items-start justify-start text-left">
                
                {/* Hàng 1: Một nền tảng Vững chắc! */}
                <div className="animate-hero-row-1 text-[1.4rem] xs:text-[1.7rem] sm:text-[2.05rem] lg:text-[2.5rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
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
                <div className="animate-hero-row-2 text-[1.4rem] xs:text-[1.7rem] sm:text-[2.05rem] lg:text-[2.5rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
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
                <div className="animate-hero-row-3 text-[1.4rem] xs:text-[1.7rem] sm:text-[2.05rem] lg:text-[2.5rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
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

              {/* Slogan Badge & Down Indicator */}
              <div className="pt-2 text-center w-full flex flex-col items-center gap-2.5">
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

                  <p className="animate-hero-slogan relative z-10 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-transparent text-[11px] xs:text-xs sm:text-[13px] font-extrabold text-slate-700 dark:text-slate-200 tracking-wide whitespace-nowrap">
                    <span className="font-mono text-slate-400 opacity-60">⟨</span>
                    <span>One Platform</span>
                    <span className="animate-hero-dot-1 w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span>One Direction</span>
                    <span className="animate-hero-dot-2 w-1.5 h-1.5 rounded-full bg-[#231F20] dark:bg-slate-400 shrink-0" />
                    <span>One Destination</span>
                    <span className="font-mono text-slate-400 opacity-60">⟩</span>
                  </p>
                </div>
              </div>

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
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border ${pillar.borderColor} shadow-xs ${floatClasses[idx % floatClasses.length]}`}
                >
                  <div className={`w-5 h-5 rounded-full ${pillar.bgColor} flex items-center justify-center shrink-0`}>
                    <PillarIcon className={`w-3.5 h-3.5 ${pillar.color}`} />
                  </div>
                  <span className="text-[11px] font-black text-slate-800 dark:text-white">
                    {pillar.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Centered Odoo App Grid (Kiểu dáng hộp bo tròn 28px y hệt bản Desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 xl:gap-5 w-full shrink-0 mt-1 sm:mt-2">
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
