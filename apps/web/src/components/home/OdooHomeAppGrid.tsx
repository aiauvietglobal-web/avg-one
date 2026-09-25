import React from 'react';
import {
  Boxes, Users, Calendar, FolderKanban, ShieldCheck, Newspaper, BarChart3, Clock, Scale, Sparkles, CheckCircle2, Wallet, Lightbulb, LayoutGrid,
  Compass, Eye, Layers, Shield, Box, Activity, Workflow, Target, Lock, ArrowUpRight, Cpu,
  Binary, Zap, Rocket, Award, Gem, Coins, CircleDollarSign, Gauge, Database, TrendingDown, Server
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

export const CORE_APP_MODULES = [
  {
    id: 'apps' as AppModuleId,
    name: 'Ứng Dụng',
    tag: 'Hệ Sinh Thái',
    icon: Cpu,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'hr' as AppModuleId,
    name: 'Nhân Sự',
    tag: '20 Nhân Sự Lõi',
    icon: Users,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'legal' as AppModuleId,
    name: 'Pháp Lý',
    tag: 'Bản Quyền & SHTT',
    icon: Scale,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'finance' as AppModuleId,
    name: 'Tài Chính',
    tag: 'Duyệt Chi & Ngân Sách',
    icon: Coins,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'rd' as AppModuleId,
    name: 'Nghiên Cứu & Sáng Tạo',
    tag: '13 Bước SOP R&D',
    icon: Sparkles,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'profile9' as AppModuleId,
    name: 'Hồ Sơ Năng Lực',
    tag: 'Tổng Thể Doanh Nghiệp',
    icon: Award,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  }
];

export const EXPANDED_APP_MODULES = [
  {
    id: 'infra22' as AppModuleId,
    name: 'Hạ Tầng 2.2',
    tag: 'Máy Móc & Thiết Bị',
    icon: Server,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'security' as AppModuleId,
    name: 'Bảo Mật',
    tag: 'ISO 27001 • Audit',
    icon: ShieldCheck,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'traffic8' as AppModuleId,
    name: 'Thông',
    tag: 'Gỡ Nghẽn & Thương Mại',
    icon: Zap,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'cluster51' as AppModuleId,
    name: 'Cụm 5.1',
    tag: '5.1B Vào • 5.1T Ra',
    icon: Workflow,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  },
  {
    id: 'clusterK' as AppModuleId,
    name: 'Cụm #K',
    tag: '5 Đầu Mối Thực Thi',
    icon: Layers,
    iconColor: 'text-[#0284C7] dark:text-sky-300',
    bgColor: 'bg-white/95 dark:bg-sky-950/80 border-sky-200/90 dark:border-sky-800/80 shadow-2xs'
  }
];

export const HOME_APP_MODULES = [...CORE_APP_MODULES, ...EXPANDED_APP_MODULES];

interface OdooHomeAppGridProps {
  onSelectModule: (moduleId: AppModuleId) => void;
}

export const OdooHomeAppGrid: React.FC<OdooHomeAppGridProps> = ({ onSelectModule }) => {
  return (
    <div className="w-full h-full flex-1 min-h-0 bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-y-auto md:overflow-hidden flex flex-col items-center justify-start md:justify-center p-2 sm:p-3 select-none">
      
      {/* 🌐 ULTRA-CLEAN GRID LINES & FACETED ANGLED POLYGON PLANES (PHONG CÁCH MẢNG HÌNH HỌC VIETTEL AI) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.75rem_2.75rem] opacity-50 dark:opacity-25 pointer-events-none -z-0" />

      {/* 🎨 ANGLED FACETED GEOMETRIC PLANES (MẢNG VÁT ĐA GIÁC CHUYỂN ĐỘNG NGHỆ THUẬT VIETTEL AI) */}
      {/* Khối màu xanh bên trái chuyển động thở & trôi bồng bềnh */}
      <div className="absolute -top-16 -left-20 w-[540px] h-[540px] xl:w-[680px] xl:h-[680px] bg-gradient-to-br from-sky-400/20 via-[#0284C7]/12 to-transparent [clip-path:polygon(0_0,100%_0,65%_100%,0_80%)] pointer-events-none -z-0 animate-facet-left transition-all" />
      <div className="absolute -top-8 -left-12 w-[380px] h-[380px] xl:w-[480px] xl:h-[480px] bg-gradient-to-br from-sky-300/15 via-transparent to-transparent [clip-path:polygon(0_0,85%_0,50%_100%,0_70%)] pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Khối màu cam bên phải chuyển động thở & trôi bồng bềnh */}
      <div className="absolute -top-16 -right-20 w-[580px] h-[580px] xl:w-[720px] xl:h-[720px] bg-gradient-to-bl from-orange-400/20 via-[#F15A24]/12 to-transparent [clip-path:polygon(35%_0,100%_0,100%_80%,0_100%)] pointer-events-none -z-0 animate-facet-right transition-all" />
      <div className="absolute -top-8 -right-12 w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] bg-gradient-to-bl from-orange-300/15 via-transparent to-transparent [clip-path:polygon(45%_0,100%_0,100%_65%,0_90%)] pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '7s' }} />

      {/* Vùng phát sáng êm dịu ở chân trang */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-sky-300/10 via-emerald-300/8 to-transparent rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Synchronized widescreen container (Giữ nguyên vị trí rộng cho 4 hộp Hero & vòng quỹ đạo) */}
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


          {/* 1. NỀN TẢNG SỐ (TOP-LEFT) - LỚN HƠN, TỐI GIẢN CHỮ */}
          <div className="hidden lg:flex absolute left-3 xl:left-12 top-2 xl:top-5 z-20 items-center gap-3.5 xl:gap-4.5 animate-entrance-left animate-float-node-1 cursor-default group transition-all duration-300 select-none" style={{ animationDelay: '150ms' }}>
            {/* Multi-Tier 3D Isometric Bedrock Architecture Icon */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible filter drop-shadow-[0_4px_16px_rgba(2,132,199,0.22)] dark:drop-shadow-[0_4px_20px_rgba(56,189,248,0.28)]">
                {/* Layer 1: Base Platform Slab */}
                <polygon
                  points="50,82 86,64 50,46 14,64"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-sky-400 opacity-40"
                />
                <polyline
                  points="14,64 14,68 50,86 86,68 86,64"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="1.6"
                  className="dark:stroke-sky-400 opacity-25"
                />

                {/* Layer 2: Middle Platform Slab */}
                <polygon
                  points="50,66 84,49 50,32 16,49"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-sky-400 opacity-75"
                />
                <polyline
                  points="16,49 16,53 50,70 84,53 84,49"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="1.6"
                  className="dark:stroke-sky-400 opacity-30"
                />

                {/* Layer 3: Top Cyber Core Platform */}
                <polygon
                  points="50,50 82,34 50,18 18,34"
                  fill="none"
                  stroke="#00A8E8"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-sky-300"
                />

                {/* Vertical Central Data Axis Conduit */}
                <line
                  x1="50"
                  y1="82"
                  x2="50"
                  y2="18"
                  stroke="#0284C7"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  className="dark:stroke-sky-400 opacity-70 animate-kinetic-data"
                />
                {/* Corner Connecting Pillars */}
                <line x1="18" y1="62" x2="18" y2="34" stroke="#0284C7" strokeWidth="1.4" strokeDasharray="3 3" className="dark:stroke-sky-400 opacity-35" />
                <line x1="82" y1="62" x2="82" y2="34" stroke="#0284C7" strokeWidth="1.4" strokeDasharray="3 3" className="dark:stroke-sky-400 opacity-35" />

                {/* Apex AI Core Diamond Star */}
                <path
                  d="M 50,6 Q 50,18 38,18 Q 50,18 50,30 Q 50,18 62,18 Q 50,18 50,6 Z"
                  fill="none"
                  stroke="#00A8E8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-sky-200"
                />
                {/* Luminous Central Node */}
                <circle cx="50" cy="18" r="4.2" fill="#00A8E8" className="dark:fill-sky-300 animate-pulse" />
                <circle cx="50" cy="18" r="1.8" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Typography: Tối giản - Chỉ để chữ tiêu đề chính */}
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg xl:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight select-none">
                Nền tảng số
              </span>
            </div>
          </div>

          {/* 2. TỰ ĐỘNG HÓA (TOP-RIGHT) - CÁC BÁNH RĂNG LIÊN KẾT QUAY TRÒN ĐỒNG TỐC ĐỘ */}
          <div className="hidden lg:flex absolute right-4 xl:right-16 top-2 xl:top-5 z-20 items-center gap-3.5 xl:gap-4.5 animate-entrance-right animate-float-node-3 cursor-default group transition-all duration-300 select-none" style={{ animationDelay: '300ms' }}>
            {/* Typography: Tối giản - Chỉ để chữ tiêu đề chính */}
            <div className="flex flex-col text-right">
              <span className="text-base sm:text-lg xl:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight select-none whitespace-nowrap">
                Tự động hóa
              </span>
            </div>

            {/* Interlocking Rotating Gears Assembly Icon */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible filter drop-shadow-[0_4px_16px_rgba(241,90,36,0.22)] dark:drop-shadow-[0_4px_20px_rgba(251,146,60,0.28)]">
                {/* Gear 1: Bánh răng chính (12 răng, quay thuận kim đồng hồ) */}
                <g className="animate-gear-1">
                  <path
                    d="M 63.6,44.0 L 69.9,45.6 L 69.9,50.4 L 63.6,52.0 L 62.7,55.3 L 67.4,59.9 L 65.0,64.0 L 58.7,62.3 L 56.3,64.7 L 58.0,71.0 L 53.9,73.4 L 49.3,68.7 L 46.0,69.6 L 44.4,75.9 L 39.6,75.9 L 38.0,69.6 L 34.7,68.7 L 30.1,73.4 L 26.0,71.0 L 27.7,64.7 L 25.3,62.3 L 19.0,64.0 L 16.6,59.9 L 21.3,55.3 L 20.4,52.0 L 14.1,50.4 L 14.1,45.6 L 20.4,44.0 L 21.3,40.7 L 16.6,36.1 L 19.0,32.0 L 25.3,33.7 L 27.7,31.3 L 26.0,25.0 L 30.1,22.6 L 34.7,27.3 L 38.0,26.4 L 39.6,20.1 L 44.4,20.1 L 46.0,26.4 L 49.3,27.3 L 53.9,22.6 L 58.0,25.0 L 56.3,31.3 L 58.7,33.7 L 65.0,32.0 L 67.4,36.1 L 62.7,40.7 Z"
                    fill="none"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-orange-400"
                  />
                  <circle cx="42" cy="48" r="12" fill="none" stroke="#F15A24" strokeWidth="1.8" className="dark:stroke-orange-400 opacity-60" />
                  <line x1="42" y1="26" x2="42" y2="70" stroke="#F15A24" strokeWidth="1.8" strokeLinecap="round" className="dark:stroke-orange-400 opacity-60" />
                  <line x1="20" y1="48" x2="64" y2="48" stroke="#F15A24" strokeWidth="1.8" strokeLinecap="round" className="dark:stroke-orange-400 opacity-60" />
                  <circle cx="42" cy="48" r="6" fill="none" stroke="#F15A24" strokeWidth="2" className="dark:stroke-orange-400" />
                  <circle cx="42" cy="48" r="3" fill="#F15A24" className="dark:fill-orange-400" />
                  <circle cx="42" cy="48" r="1.2" fill="#FFFFFF" />
                </g>

                {/* Gear 2: Bánh răng phụ dưới (8 răng, quay ngược kim đồng hồ, khớp răng liên kết) */}
                <g className="animate-gear-2">
                  <path
                    d="M 90.9,69.5 L 95.4,72.7 L 93.6,76.9 L 88.2,76.0 L 86.0,78.2 L 86.9,83.6 L 82.7,85.4 L 79.5,80.9 L 76.5,80.9 L 73.3,85.4 L 69.1,83.6 L 70.0,78.2 L 67.8,76.0 L 62.4,76.9 L 60.6,72.7 L 65.1,69.5 L 65.1,66.5 L 60.6,63.3 L 62.4,59.1 L 67.8,60.0 L 70.0,57.8 L 69.1,52.4 L 73.3,50.6 L 76.5,55.1 L 79.5,55.1 L 82.7,50.6 L 86.9,52.4 L 86.0,57.8 L 88.2,60.0 L 93.6,59.1 L 95.4,63.3 L 90.9,66.5 Z"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-orange-400"
                  />
                  <circle cx="78" cy="68" r="8" fill="none" stroke="#F97316" strokeWidth="1.6" className="dark:stroke-orange-400 opacity-60" />
                  <line x1="78" y1="52" x2="78" y2="84" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" className="dark:stroke-orange-400 opacity-60" />
                  <line x1="62" y1="68" x2="94" y2="68" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" className="dark:stroke-orange-400 opacity-60" />
                  <circle cx="78" cy="68" r="4.5" fill="none" stroke="#F97316" strokeWidth="1.8" className="dark:stroke-orange-400" />
                  <circle cx="78" cy="68" r="2.2" fill="#F97316" className="dark:fill-orange-400" />
                  <circle cx="78" cy="68" r="0.9" fill="#FFFFFF" />
                </g>

                {/* Gear 3: Bánh răng phụ trên (7 răng, quay ngược kim đồng hồ, khớp răng trên) */}
                <g className="animate-gear-3">
                  <path
                    d="M 84.9,26.3 L 88.4,29.2 L 86.6,32.8 L 82.2,31.9 L 80.1,33.6 L 80.1,38.1 L 76.1,39.0 L 74.1,35.0 L 71.5,34.4 L 68.0,37.1 L 64.8,34.6 L 66.7,30.5 L 65.5,28.1 L 61.1,27.0 L 61.1,23.0 L 65.5,21.9 L 66.7,19.5 L 64.8,15.4 L 68.0,12.9 L 71.5,15.6 L 74.1,15.0 L 76.1,11.0 L 80.1,11.9 L 80.1,16.4 L 82.2,18.1 L 86.6,17.2 L 88.4,20.8 L 84.9,23.7 Z"
                    fill="none"
                    stroke="#FB923C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-orange-300"
                  />
                  <circle cx="75" cy="25" r="5.5" fill="none" stroke="#FB923C" strokeWidth="1.4" className="dark:stroke-orange-300 opacity-60" />
                  <circle cx="75" cy="25" r="2.5" fill="#FB923C" className="dark:fill-orange-300" />
                  <circle cx="75" cy="25" r="1" fill="#FFFFFF" />
                </g>

                {/* Điểm phát sáng liên kết khớp nối động */}
                <circle cx="61" cy="58" r="1.8" fill="#F15A24" className="animate-ping opacity-75" />
                <circle cx="58" cy="35" r="1.6" fill="#FB923C" className="animate-ping opacity-75" style={{ animationDelay: '500ms' }} />
              </svg>
            </div>
          </div>

          {/* 3. SỐ HÓA (BOTTOM-LEFT) - LỚN HƠN, TỐI GIẢN CHỮ */}
          <div className="hidden md:flex absolute left-4 xl:left-14 bottom-2 xl:bottom-6 z-20 items-center gap-3.5 xl:gap-4.5 animate-entrance-left animate-float-node-2 cursor-default group transition-all duration-300 select-none" style={{ animationDelay: '450ms' }}>
            {/* Digital Transformation Waveform & Constellation Matrix Icon */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible filter drop-shadow-[0_4px_16px_rgba(2,132,199,0.22)] dark:drop-shadow-[0_4px_20px_rgba(56,189,248,0.28)]">
                {/* Trục sóng số hóa chuyển đổi dữ liệu thời gian thực */}
                <path
                  d="M 6,60 L 26,60 L 36,24 L 52,76 L 68,38 L 82,54 L 94,54"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-sky-400"
                />
                {/* Nhánh bus dữ liệu số hóa liên kết ma trận */}
                <path d="M 36,24 L 56,12 L 88,12" fill="none" stroke="#00A8E8" strokeWidth="1.8" strokeDasharray="4 4" className="dark:stroke-sky-400 opacity-60 animate-kinetic-data" />
                <path d="M 26,60 L 26,84 L 64,84" fill="none" stroke="#00A8E8" strokeWidth="1.8" strokeDasharray="4 4" className="dark:stroke-sky-400 opacity-60 animate-kinetic-data" />
                <line x1="52" y1="76" x2="80" y2="76" stroke="#0284C7" strokeWidth="1.6" strokeDasharray="3 3" className="dark:stroke-sky-400 opacity-40" />
                <line x1="68" y1="38" x2="68" y2="12" stroke="#0284C7" strokeWidth="1.4" strokeDasharray="3 3" className="dark:stroke-sky-400 opacity-40" />

                {/* Các nút giao ma trận số hóa */}
                <circle cx="26" cy="60" r="3" fill="#0284C7" className="dark:fill-sky-400" />
                <circle cx="52" cy="76" r="3.2" fill="#0284C7" className="dark:fill-sky-400" />
                <circle cx="68" cy="38" r="3" fill="#0284C7" className="dark:fill-sky-400" />
                <circle cx="82" cy="54" r="3" fill="#0284C7" className="dark:fill-sky-400" />
                <circle cx="94" cy="54" r="3.2" fill="#0284C7" className="dark:fill-sky-400" />
                <circle cx="56" cy="12" r="2.8" fill="#00A8E8" className="dark:fill-sky-300" />
                <circle cx="88" cy="12" r="3" fill="#00A8E8" className="dark:fill-sky-300" />
                <circle cx="64" cy="84" r="2.8" fill="#00A8E8" className="dark:fill-sky-300" />

                {/* Nút đỉnh nhận diện tức thì */}
                <circle cx="36" cy="24" r="4.8" fill="#00A8E8" className="dark:fill-sky-300 animate-pulse" />
                <circle cx="36" cy="24" r="2" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Typography: Tối giản - Chỉ để chữ tiêu đề chính */}
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg xl:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight select-none">
                Số hóa
              </span>
            </div>
          </div>

          {/* 4. TƯƠNG TÁC (BOTTOM-RIGHT) - LỚN HƠN, TỐI GIẢN CHỮ */}
          <div className="hidden md:flex absolute right-4 xl:right-16 bottom-2 xl:bottom-6 z-20 items-center gap-3.5 xl:gap-4.5 animate-entrance-right animate-float-node-4 cursor-default group transition-all duration-300 select-none" style={{ animationDelay: '550ms' }}>
            {/* Typography: Tối giản - Chỉ để chữ tiêu đề chính */}
            <div className="flex flex-col text-right">
              <span className="text-base sm:text-lg xl:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight select-none whitespace-nowrap">
                Tương tác
              </span>
            </div>

            {/* Multi-Channel Interactive Dialogue Convergence Icon */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible filter drop-shadow-[0_4px_16px_rgba(241,90,36,0.22)] dark:drop-shadow-[0_4px_20px_rgba(251,146,60,0.28)]">
                {/* Vòng cung hội thoại kênh A (Luồng giọng nói / Voice stream) */}
                <path
                  d="M 40,20 C 20,20 12,32 12,46 C 12,60 22,70 34,70 C 37,76 33,80 30,82 C 40,80 46,74 48,68"
                  fill="none"
                  stroke="#F15A24"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  className="dark:stroke-orange-400"
                />
                {/* Vòng cung hội thoại kênh B (Luồng tin nhắn / Chat stream) */}
                <path
                  d="M 60,18 C 80,18 88,30 88,44 C 88,58 78,68 66,68 C 63,74 67,78 70,80 C 60,78 54,72 52,66"
                  fill="none"
                  stroke="#F15A24"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  className="dark:stroke-orange-400"
                />

                {/* Cầu nối âm tần tương tác trung tâm (Acoustic Harmonic Waves) */}
                <line x1="44" y1="36" x2="44" y2="52" stroke="#F15A24" strokeWidth="2.4" strokeLinecap="round" className="dark:stroke-orange-300 animate-pulse" />
                <line x1="50" y1="28" x2="50" y2="60" stroke="#F15A24" strokeWidth="2.6" strokeLinecap="round" className="dark:stroke-orange-400" />
                <line x1="56" y1="36" x2="56" y2="52" stroke="#F15A24" strokeWidth="2.4" strokeLinecap="round" className="dark:stroke-orange-300 animate-pulse" />

                {/* Vòng sóng tương tác lan tỏa */}
                <circle cx="50" cy="44" r="18" fill="none" stroke="#FB923C" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-45 dark:stroke-orange-300" />

                {/* Hạt nhân tương tác giao thoa */}
                <circle cx="50" cy="44" r="4.2" fill="#F15A24" className="dark:fill-orange-400 animate-pulse" />
                <circle cx="50" cy="44" r="1.8" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* 🎯 TRUNG TÂM: MAIN HEADLINE & SLOGAN BADGE & DOWN NAVIGATION */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto z-10 animate-entrance-up" style={{ animationDelay: '100ms' }}>
            <div className="w-fit max-w-[95vw] sm:max-w-none mx-auto px-4 xs:px-6 sm:px-8 py-2 sm:py-3 flex flex-col items-center text-center relative space-y-2 sm:space-y-2.5 transition-all duration-300">
              
              {/* 🎨 ÁNH SÁNG GRADIENT XANH - CAM (Hiệu ứng thở ẩn hiện êm ái - 100% không hình hộp) */}
              {/* Lớp màu xanh - cam chuyển tiếp rõ nét, thở ẩn hiện mềm mại với animate-halo-breathe */}
              <div className="absolute -inset-x-16 -inset-y-10 sm:-inset-x-28 sm:-inset-y-14 pointer-events-none -z-10 blur-3xl animate-halo-breathe">
                <div 
                  className="w-full h-full opacity-90 dark:opacity-65"
                  style={{
                    background: 'linear-gradient(90deg, rgba(2, 132, 199, 0.45) 0%, rgba(56, 189, 248, 0.3) 35%, rgba(251, 146, 60, 0.3) 65%, rgba(241, 90, 36, 0.45) 100%)',
                    maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 78%)'
                  }}
                />
              </div>

              {/* Lớp làm mờ lưới cực nhẹ ngay sau chữ - tan biến hình elip, giữ chữ sắc nét liên tục */}
              <div className="absolute -inset-x-8 -inset-y-6 sm:-inset-x-16 sm:-inset-y-8 rounded-full pointer-events-none -z-10 blur-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.85)_0%,transparent_75%)]" />

              {/* Main Headline (Gióng lề phẳng 3 dòng với khoảng cách tự nhiên giữa các từ) */}
              <div className="space-y-1 sm:space-y-1.5 w-fit flex flex-col items-start justify-start text-left">
                
                {/* Hàng 1: Một nền tảng Vững chắc! */}
                <div className="animate-hero-row-1 text-[1.4rem] xs:text-[1.7rem] sm:text-[2.05rem] lg:text-[2.5rem] font-extrabold text-[#231F20] dark:text-white tracking-tight leading-tight flex items-baseline gap-2.5 sm:gap-4 flex-nowrap whitespace-nowrap justify-start">
                  <span>Một nền tảng</span>
                  <span className="relative inline-block px-1">
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #0077B6 0%, #00A8E8 50%, #38BDF8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                      }}
                      className="relative z-10 font-black animate-hero-accent-1"
                    >
                      Vững chắc!
                    </span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#0284C7] opacity-70 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
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
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#231F20] dark:text-slate-400 opacity-60 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
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
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-70 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
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

                  <p className="animate-hero-slogan relative z-10 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-transparent text-[11px] xs:text-xs sm:text-[13px] font-extrabold text-slate-700 dark:text-slate-200 tracking-wide whitespace-nowrap">
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

        {/* Centered Odoo App Grid (Hàng 1: 6 Hộp Phân Hệ Doanh Nghiệp & Nghiệp Vụ Cốt Lõi) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full max-w-[1232px] mx-auto shrink-0 mt-1 sm:mt-2">
          {CORE_APP_MODULES.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectModule(app.id)}
                className="group flex flex-col items-center justify-between py-3 sm:py-3.5 px-2 min-h-[102px] sm:min-h-[112px] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none animate-entrance-up"
              >
                {/* Hairline top glow on hover */}
                <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* App Unified Blue Icon Badge */}
                <div className="w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-0.5 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
                  <Icon className="w-5.5 h-5.5 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
                </div>
                
                {/* App Title */}
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                    {app.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Odoo App Grid (Hàng 2: 5 Hộp Phân Hệ Hạ Tầng & Cụm Tác Nghiệp - Căn Giữa Cùng Kích Thước) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-[1232px] mx-auto shrink-0 mt-1 sm:mt-1.5">
          {EXPANDED_APP_MODULES.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectModule(app.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectModule(app.id); }}
                style={{ borderRadius: '26px', animationDelay: `${(idx + 7) * 70 + 100}ms` }}
                className="group flex flex-col items-center justify-between py-3 sm:py-3.5 px-2 min-h-[102px] sm:min-h-[112px] w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc((100%-80px)/6)] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none animate-entrance-up shrink-0"
              >
                {/* Hairline top glow on hover */}
                <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* App Unified Blue Icon Badge */}
                <div className="w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-800 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-0.5 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
                  <Icon className="w-5.5 h-5.5 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
                </div>
                
                {/* App Title */}
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                    {app.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
