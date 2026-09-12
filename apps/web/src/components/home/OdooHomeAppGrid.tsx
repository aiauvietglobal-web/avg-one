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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:3rem_3rem] opacity-45 dark:opacity-20 pointer-events-none -z-0" />

      {/* 🎨 ANGLED FACETED GEOMETRIC PLANES (MẢNG VÁT ĐA GIÁC ĐẶC TRƯNG VIETTEL AI) */}
      <div className="absolute -top-16 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-sky-400/18 via-[#0284C7]/12 to-transparent [clip-path:polygon(0_0,100%_0,60%_100%,0_75%)] pointer-events-none -z-0" />
      <div className="absolute -top-16 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-orange-400/18 via-[#F15A24]/12 to-transparent [clip-path:polygon(40%_0,100%_0,100%_80%,0_100%)] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[700px] h-[320px] bg-gradient-to-t from-sky-300/12 via-emerald-300/8 to-transparent rounded-full blur-[110px] pointer-events-none -z-0" />

      {/* Synchronized widescreen container (Tận dụng toàn diện màn hình rộng) */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 xl:px-12 flex flex-col items-center justify-start md:justify-evenly h-full max-h-full gap-2 sm:gap-4 relative z-10 py-1.5 sm:py-2.5">
        
        {/* 🛸 VIETTEL AI-STYLE VECTOR LINE-ART & GEOMETRIC ANIMATED HERO (TÁI HIỆN CHUẨN XÁC NÉT LINE & ICON) */}
        <div className="w-full relative flex items-center justify-center shrink-0 mb-1 sm:mb-2 py-6 sm:py-10 px-2 overflow-visible min-h-[300px] sm:min-h-[340px] xl:min-h-[380px]">
          
          {/* 🪐 1. LARGE CONCENTRIC ORBITAL RINGS WITH SATELLITE SPHERES (TOP-RIGHT CORNER) */}
          <div className="hidden md:block absolute -top-14 -right-10 xl:-right-16 w-72 h-72 xl:w-96 xl:h-96 pointer-events-none overflow-visible z-0">
            <svg className="w-full h-full" viewBox="0 0 360 360" fill="none">
              {/* Inner Concentric Orbit */}
              <circle cx="340" cy="20" r="160" stroke="#F15A24" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="8 8" />
              {/* Middle Concentric Orbit */}
              <circle cx="340" cy="20" r="240" stroke="#F15A24" strokeOpacity="0.4" strokeWidth="2.5" />
              {/* Outer Sweeping Orbit */}
              <circle cx="340" cy="20" r="320" stroke="#0284C7" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="10 5" />
              
              {/* Solid Circular Satellite Balls on Tracks */}
              <circle cx="180" cy="20" r="8" fill="#F15A24" />
              <circle cx="180" cy="20" r="3.5" fill="#FFFFFF" />

              <circle cx="260" cy="190" r="7" fill="#0284C7" />
              <circle cx="260" cy="190" r="3" fill="#FFFFFF" />

              <circle cx="100" cy="20" r="6" fill="#F15A24" />
              <circle cx="100" cy="20" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* 💎 2. 3D HEXAGONAL NEURAL LATTICE MOLECULE (TOP-LEFT - Y HỆT VIETTEL AI) */}
          <div className="hidden lg:flex absolute left-4 xl:left-14 top-3 xl:top-6 z-20 items-center gap-3.5 animate-float-node-1 cursor-default group">
            <div className="relative w-24 h-24 xl:w-28 xl:h-28 flex items-center justify-center shrink-0">
              <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" className="overflow-visible drop-shadow-md">
                {/* Central Solid Hexagon */}
                <polygon
                  points="60,26 94,46 94,86 60,106 26,86 26,46"
                  fill="#0284C7"
                  fillOpacity="0.16"
                  stroke="#0284C7"
                  strokeWidth="2"
                />
                
                {/* 6 Perimeter Line Segments */}
                <line x1="60" y1="12" x2="104" y2="37" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                <line x1="104" y1="37" x2="104" y2="87" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                <line x1="104" y1="87" x2="60" y2="112" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                <line x1="60" y1="112" x2="16" y2="87" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                <line x1="16" y1="87" x2="16" y2="37" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                <line x1="16" y1="37" x2="60" y2="12" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                
                {/* Center 3D Isometric Axes */}
                <line x1="60" y1="12" x2="60" y2="62" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="104" y1="87" x2="60" y2="62" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="16" y1="87" x2="60" y2="62" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="60" cy="62" r="5" fill="#0284C7" />

                {/* 6 Circular White Node Balls on Vertices */}
                <circle cx="60" cy="12" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
                <circle cx="104" cy="37" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
                <circle cx="104" cy="87" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
                <circle cx="60" cy="112" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
                <circle cx="16" cy="87" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
                <circle cx="16" cy="37" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 tracking-wider">
                AVG ONE // AI
              </span>
              <span className="text-sm xl:text-base font-extrabold text-slate-800 dark:text-white leading-tight">
                Kiến tạo Nền tảng Số
              </span>
            </div>
          </div>

          {/* 🎙️ 3. RADAR VOICE ORB WITH FANNING DOTTED ARCS + CHECKLIST CARD (TOP-RIGHT) */}
          <div className="hidden lg:flex absolute right-16 xl:right-32 top-3 xl:top-6 z-20 items-center gap-4 animate-float-node-3 cursor-default group">
            {/* Voice Orb with Fanning Dotted Sound Radar Waves */}
            <div className="relative flex items-center justify-center shrink-0">
              {/* Circular Mic / Energy Core */}
              <div className="w-13 h-13 xl:w-15 xl:h-15 rounded-full bg-gradient-to-tr from-[#F15A24] via-[#FB923C] to-[#FF7043] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform z-10">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>

              {/* Fanning Dotted Radar Waves (Tỏa ra bên phải y hệt Viettel AI) */}
              <div className="absolute left-full ml-1 w-10 h-16 flex items-center justify-start pointer-events-none">
                <svg width="40" height="64" viewBox="0 0 40 64" fill="none">
                  <path d="M 4,8 A 28,28 0 0 1 4,56" stroke="#F15A24" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" className="animate-pulse" />
                  <path d="M 16,16 A 20,20 0 0 1 16,48" stroke="#F15A24" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" style={{ animationDelay: '0.3s' }} />
                  <path d="M 28,24 A 12,12 0 0 1 28,40" stroke="#F15A24" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" style={{ animationDelay: '0.6s' }} />
                </svg>
              </div>
            </div>

            {/* Outlined Checklist Line Card (Y hệt Viettel AI) */}
            <div className="w-14 h-19 xl:w-16 xl:h-21 rounded-2xl border-2 border-slate-700/80 dark:border-white/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex flex-col justify-center gap-2.5 px-3 shadow-xs group-hover:border-[#F15A24] transition-colors ml-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F15A24] shrink-0" />
                <div className="h-1 flex-1 rounded-full bg-slate-700/70 dark:bg-white/70" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shrink-0" />
                <div className="h-1 flex-1 rounded-full bg-slate-700/70 dark:bg-white/70" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div className="h-1 flex-1 rounded-full bg-slate-700/70 dark:bg-white/70" />
              </div>
            </div>
          </div>

          {/* 📈 4. DATA CONSTELLATION ZIGZAG LINE GRAPH WITH WHITE NODES (BOTTOM-LEFT - Y HỆT VIETTEL AI) */}
          <div className="hidden md:flex absolute left-6 xl:left-20 bottom-3 xl:bottom-6 z-20 items-end gap-3 animate-float-node-2 cursor-default group">
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="overflow-visible drop-shadow-sm">
              {/* Zigzag Connection Stroke */}
              <polyline
                points="12,70 65,22 125,52 188,12"
                fill="none"
                stroke="#0284C7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="12,70 65,22 125,52 188,12"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-kinetic-data"
              />

              {/* 4 Circular Junction Node Balls (White center, Bold colored ring) */}
              <circle cx="12" cy="70" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
              <circle cx="65" cy="22" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
              <circle cx="125" cy="52" r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
              <circle cx="188" cy="12" r="7.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="188" cy="12" r="3.5" fill="#FFFFFF" className="animate-ping" style={{ transformOrigin: '188px 12px' }} />
            </svg>
          </div>

          {/* 💬 5. TRUE GEOMETRIC SPEECH BUBBLE & EQUALIZER SOUNDWAVE BARS (BOTTOM-RIGHT - Y HỆT VIETTEL AI) */}
          <div className="hidden md:flex absolute right-6 xl:right-20 bottom-3 xl:bottom-6 z-20 items-end gap-5 animate-float-node-4 cursor-default group">
            {/* Overlapping Dialogue Bubbles with Tail */}
            <div className="relative w-20 h-18 xl:w-22 xl:h-20 flex items-center justify-center">
              {/* Back Filled Bubble with Tail */}
              <svg width="60" height="52" viewBox="0 0 60 52" fill="none" className="absolute top-0 left-0">
                <path
                  d="M 6,4 L 54,4 A 6,6 0 0 1 60,10 L 60,38 A 6,6 0 0 1 54,44 L 22,44 L 10,52 L 12,44 L 6,44 A 6,6 0 0 1 0,38 L 0,10 A 6,6 0 0 1 6,4 Z"
                  fill="#F15A24"
                  fillOpacity="0.2"
                />
              </svg>

              {/* Front Outlined Bubble with Tail (2.5px crisp stroke) */}
              <svg width="66" height="58" viewBox="0 0 66 58" fill="none" className="absolute bottom-0 right-0">
                <path
                  d="M 8,4 L 58,4 A 6,6 0 0 1 64,10 L 64,42 A 6,6 0 0 1 58,48 L 26,48 L 14,58 L 16,48 L 8,48 A 6,6 0 0 1 2,42 L 2,10 A 6,6 0 0 1 8,4 Z"
                  stroke="#1E293B"
                  strokeWidth="2.5"
                  className="dark:stroke-white"
                  fill="none"
                />
                <circle cx="33" cy="26" r="3" fill="#F15A24" className="animate-ping" style={{ transformOrigin: '33px 26px' }} />
                <circle cx="33" cy="26" r="2.5" fill="#F15A24" />
              </svg>
            </div>

            {/* Vibrating Equalizer Soundwave Bars (Góc dưới bên phải) */}
            <div className="flex items-end gap-1.5 pb-1">
              <div className="w-2 bg-[#F15A24] rounded-full animate-soundwave-1" />
              <div className="w-2 bg-[#0284C7] rounded-full animate-soundwave-2" />
              <div className="w-2 bg-[#F15A24] rounded-full animate-soundwave-3" />
              <div className="w-2 bg-emerald-500 rounded-full animate-soundwave-4" />
            </div>
          </div>

          {/* 🎯 TRUNG TÂM: MAIN HEADLINE & SLOGAN BADGE & DOWN NAVIGATION */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto z-10">
            <div className="w-fit mx-auto space-y-2.5 sm:space-y-3 py-0.5 flex flex-col items-center text-center">
              
              {/* Main Headline (Gióng lề phẳng 3 dòng với khoảng cách tự nhiên giữa các từ) */}
              <div className="space-y-1 sm:space-y-1.5 w-fit flex flex-col items-start justify-start text-left">
                
                {/* Hàng 1: Một nền tảng Vững chắc! */}
                <div className="animate-hero-row-1 text-[1.45rem] xs:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.65rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
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
                <div className="animate-hero-row-2 text-[1.45rem] xs:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.65rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
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
                <div className="animate-hero-row-3 text-[1.45rem] xs:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.65rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
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

              {/* Slogan Badge & Down Navigation (Y hệt Viettel AI) */}
              <div className="pt-2 text-center w-full flex flex-col items-center gap-3">
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

                  <p className="animate-hero-slogan relative z-10 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-transparent text-[11px] xs:text-xs sm:text-[13px] font-extrabold text-slate-700 dark:text-slate-200 tracking-wide whitespace-nowrap">
                    <span className="font-mono text-slate-400 opacity-60">⟨</span>
                    <span>One Platform</span>
                    <span className="animate-hero-dot-1 w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span>One Direction</span>
                    <span className="animate-hero-dot-2 w-1.5 h-1.5 rounded-full bg-[#231F20] dark:bg-slate-400 shrink-0" />
                    <span>One Destination</span>
                    <span className="font-mono text-slate-400 opacity-60">⟩</span>
                  </p>
                </div>

                {/* 🧭 6. CIRCULAR DOWN ARROW BUTTON (Y HỆT VIETTEL AI) */}
                <div className="flex items-center gap-3 mt-0.5">
                  <div className="w-7 h-7 rounded-full border-2 border-slate-400 dark:border-slate-500 hover:border-[#F15A24] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#F15A24] transition-all cursor-pointer animate-bounce shadow-2xs">
                    <span className="text-xs font-black leading-none -mt-0.5">↓</span>
                  </div>
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
