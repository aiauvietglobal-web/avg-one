import React from 'react';
import {
  Boxes, Users, Calendar, FolderKanban, ShieldCheck, Newspaper, BarChart3, Clock, Scale, Sparkles, CheckCircle2, Wallet, Lightbulb, LayoutGrid,
  Compass, Eye, Layers, Shield, Box, Activity, Workflow, Target, Lock, ArrowUpRight, Cpu
} from 'lucide-react';
import { AppModuleId } from '../layout/AppLauncherModal';

export const HOME_APP_MODULES = [
  {
    id: 'apps' as AppModuleId,
    name: 'Ứng Dụng',
    icon: LayoutGrid,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-slate-800/90 border-sky-200 dark:border-sky-700/80 shadow-2xs'
  },
  {
    id: 'hr' as AppModuleId,
    name: 'Nhân Sự',
    icon: Users,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-slate-800/90 border-sky-200 dark:border-sky-700/80 shadow-2xs'
  },
  {
    id: 'legal' as AppModuleId,
    name: 'Pháp Lý',
    icon: Scale,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-slate-800/90 border-sky-200 dark:border-sky-700/80 shadow-2xs'
  },
  {
    id: 'finance' as AppModuleId,
    name: 'Tài Chính',
    icon: Wallet,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-slate-800/90 border-sky-200 dark:border-sky-700/80 shadow-2xs'
  },
  {
    id: 'rd' as AppModuleId,
    name: 'Nghiên Cứu & Sáng Tạo',
    icon: Lightbulb,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-slate-800/90 border-sky-200 dark:border-sky-700/80 shadow-2xs'
  }
];

interface OdooHomeAppGridProps {
  onSelectModule: (moduleId: AppModuleId) => void;
}

export const OdooHomeAppGrid: React.FC<OdooHomeAppGridProps> = ({ onSelectModule }) => {
  return (
    <div className="w-full h-full flex-1 min-h-0 bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-y-auto md:overflow-hidden flex flex-col items-center justify-start md:justify-center p-2 sm:p-3 select-none">
      
      {/* 🌐 ULTRA-CLEAN GRID LINES PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-70 dark:opacity-30 pointer-events-none -z-0" />

      {/* 🎨 DYNAMIC AMBIENT COLOR MESHES (MẢNG MÀU QUANG HỌC CHUYỂN ĐỘNG ÊM ÁI) */}
      <div className="absolute top-6 left-8 sm:left-20 w-[420px] sm:w-[520px] h-[420px] sm:h-[520px] bg-gradient-to-tr from-sky-400/10 via-blue-500/5 to-transparent rounded-full blur-[110px] pointer-events-none -z-0 animate-mesh-1" />
      <div className="absolute top-4 right-8 sm:right-20 w-[420px] sm:w-[520px] h-[420px] sm:h-[520px] bg-gradient-to-bl from-orange-400/10 via-[#F15A24]/5 to-transparent rounded-full blur-[110px] pointer-events-none -z-0 animate-mesh-2" />
      <div className="absolute bottom-6 left-1/3 w-[450px] sm:w-[600px] h-[280px] bg-gradient-to-t from-sky-300/5 via-amber-200/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-0" />

      {/* 📐 FLOATING ARCHITECTURAL WIREFRAMES & LINE ART (HÌNH KHỐI TINH TẾ & ICON NÉT HIỆN ĐẠI) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        
        {/* Left Subtle Wireframe Cube & Shield Badge (Biểu trưng Vững chắc & Bền bỉ) */}
        <div className="absolute top-20 left-12 lg:left-24 animate-subtle-cube opacity-75 hidden xl:block">
          <div className="relative">
            {/* Concentric Calibration Ring */}
            <div className="absolute -inset-6 rounded-full border border-dashed border-sky-400/30 dark:border-sky-500/20 animate-rotate-slow" />
            
            {/* Minimalist 3D Isometric Wireframe */}
            <svg width="90" height="96" viewBox="0 0 90 96" fill="none" className="overflow-visible">
              <polygon points="45,12 77,30 45,48 13,30" fill="#0284C7" fillOpacity="0.04" stroke="#0284C7" strokeWidth="1" strokeLinejoin="round" />
              <polygon points="13,30 45,48 45,84 13,66" fill="#0284C7" fillOpacity="0.08" stroke="#0284C7" strokeWidth="1" strokeLinejoin="round" />
              <polygon points="45,48 77,30 77,66 45,84" fill="#0284C7" fillOpacity="0.03" stroke="#0284C7" strokeWidth="1" strokeLinejoin="round" />
              {/* Inner Transparent Structural Lines */}
              <line x1="45" y1="12" x2="45" y2="48" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="13" y1="66" x2="45" y2="48" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="77" y1="66" x2="45" y2="48" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
              {/* Center Core Dot */}
              <circle cx="45" cy="48" r="2.5" fill="#0284C7" />
            </svg>

            {/* Floating Glass Icon Bead */}
            <div className="absolute -bottom-4 -right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-200/80 dark:border-sky-800/80 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#0284C7]" />
              <span className="text-[9px] font-bold text-sky-700 dark:text-sky-300 tracking-wider">SOLID</span>
            </div>
          </div>
        </div>

        {/* Right Subtle Faceted Prism & Compass Badge (Biểu trưng Rõ ràng & Minh bạch) */}
        <div className="absolute top-18 right-12 lg:right-24 animate-subtle-prism opacity-75 hidden xl:block">
          <div className="relative">
            {/* Concentric Calibration Ring */}
            <div className="absolute -inset-6 rounded-full border border-dashed border-orange-400/30 dark:border-orange-500/20 animate-rotate-slow-rev" />

            {/* Minimalist Faceted Hexagon Crystal */}
            <svg width="90" height="96" viewBox="0 0 90 96" fill="none" className="overflow-visible">
              <polygon points="45,8 77,26 77,64 45,82 13,64 13,26" fill="#F15A24" fillOpacity="0.04" stroke="#F15A24" strokeWidth="1" strokeLinejoin="round" />
              {/* Internal Refraction Ray Lines */}
              <line x1="45" y1="8" x2="45" y2="45" stroke="#F15A24" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="77" y1="26" x2="45" y2="45" stroke="#F15A24" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="77" y1="64" x2="45" y2="45" stroke="#F15A24" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="45" y1="82" x2="45" y2="45" stroke="#F15A24" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="13" y1="64" x2="45" y2="45" stroke="#F15A24" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="13" y1="26" x2="45" y2="45" stroke="#F15A24" strokeWidth="0.8" strokeOpacity="0.5" />
              {/* Center Core Dot */}
              <circle cx="45" cy="45" r="2.5" fill="#F15A24" />
            </svg>

            {/* Optical Clarity Laser Light Sweep */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#F15A24]/40 to-transparent animate-clarity-sweep" />
            </div>

            {/* Floating Glass Icon Bead */}
            <div className="absolute -bottom-4 -left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-orange-200/80 dark:border-orange-800/80 shadow-xs">
              <Compass className="w-3 h-3 text-[#F15A24]" />
              <span className="text-[9px] font-bold text-orange-700 dark:text-orange-300 tracking-wider">CLARITY</span>
            </div>
          </div>
        </div>

        {/* Minimalist Horizon Beam Wave */}
        <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="horizon-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F15A24" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M 80,100 Q 50% 30, calc(100% - 80) 100"
            fill="none"
            stroke="url(#horizon-beam-grad)"
            strokeWidth="1"
            className="animate-light-beam"
          />
        </svg>
      </div>

      {/* Synchronized container matching Header alignment (max-w-7xl px-4 sm:px-6) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 flex flex-col items-center justify-start md:justify-evenly h-full max-h-full gap-2.5 sm:gap-4 relative z-10 py-2 sm:py-2">
        
        {/* Modern Minimalist Hero Section (Căn lề trái gióng thẳng hàng 3 dòng theo media_1788692283298.png) */}
        <div className="flex flex-col items-center max-w-3xl mx-auto shrink-0 mb-3 sm:mb-5 w-full">
          
          <div className="w-fit mx-auto space-y-3 sm:space-y-4 py-1 flex flex-col items-start">
            
            {/* Main Headline (Gióng lề trái phẳng 3 dòng với khoảng cách tự nhiên giữa các từ) */}
            <div className="space-y-2 sm:space-y-2.5 w-fit flex flex-col items-start justify-start text-left">
              
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

            {/* Slogan Badge (Căn lề trái vừa vặn, cân đối) */}
            <div className="pt-2.5 sm:pt-3 text-left w-full flex flex-col items-start gap-2.5">
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

              {/* 💎 Minimalist Values Ribbon (Dải giá trị tinh tế, thanh thoát) */}
              <div className="inline-flex items-center gap-3 sm:gap-4 px-3.5 py-1 rounded-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs text-[11px] font-bold text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5 text-[#0284C7]">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Vững chắc</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <Box className="w-3.5 h-3.5 stroke-[2.2] text-slate-500" />
                  <span>Bền bỉ</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="inline-flex items-center gap-1.5 text-[#F15A24]">
                  <Compass className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Rõ ràng</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Minh bạch</span>
                </span>
              </div>

            </div>

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
