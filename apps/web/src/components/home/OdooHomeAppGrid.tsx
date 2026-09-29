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
          


          {/* 1. NỀN TẢNG SỐ (TOP-LEFT) - THIẾT KẾ MỀM MẠI, UYỂN CHUYỂN PHONG CÁCH VIETTEL AI */}
          <div 
            className="hidden lg:flex absolute left-4 xl:left-12 top-3 xl:top-6 z-20 items-center gap-3.5 px-4 py-2.5 xl:px-5 xl:py-3 rounded-2xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border border-sky-200/50 dark:border-sky-900/40 shadow-[0_4px_20px_rgba(2,132,199,0.06)] hover:shadow-[0_8px_30px_rgba(2,132,199,0.15)] hover:border-sky-300 dark:hover:border-sky-500/50 hover:-translate-y-0.5 transition-all duration-300 group cursor-default select-none animate-entrance-left animate-float-node-1"
            style={{ animationDelay: '150ms' }}
          >
            {/* Soft Icon Badge */}
            <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/15 flex items-center justify-center shrink-0 border border-sky-300/30 dark:border-sky-700/40 group-hover:scale-105 transition-transform duration-300 shadow-xs">
              <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
                <defs>
                  <linearGradient id="grad-plat" x1="6" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                {/* Tầng 3 - Dưới cùng */}
                <path d="M 8 33 C 8 30 15 27.5 24 27.5 C 33 27.5 40 30 40 33 C 40 36 33 38.5 24 38.5 C 15 38.5 8 36 8 33 Z" stroke="url(#grad-plat)" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
                {/* Tầng 2 - Ở giữa */}
                <path d="M 8 24.5 C 8 21.5 15 19 24 19 C 33 19 40 21.5 40 24.5 C 40 27.5 33 30 24 30 C 15 30 8 27.5 8 24.5 Z" stroke="url(#grad-plat)" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
                {/* Tầng 1 - Mặt đỉnh hợp nhất */}
                <path d="M 8 16 C 8 13 15 10.5 24 10.5 C 33 10.5 40 13 40 16 C 40 19 33 21.5 24 21.5 C 15 21.5 8 19 8 16 Z" fill="url(#grad-plat)" fillOpacity="0.12" stroke="url(#grad-plat)" strokeWidth="2.2" strokeLinecap="round" />
                {/* Điểm sáng trung tâm */}
                <circle cx="24" cy="16" r="3" fill="#0284C7" className="animate-pulse" />
                <circle cx="24" cy="16" r="1.2" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-[10px] xl:text-[11px] font-semibold text-sky-600 dark:text-sky-400 tracking-wide">
                  Hạ tầng cốt lõi
                </span>
              </div>
              <span className="text-base xl:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                Nền tảng số
              </span>
              <span className="text-[11px] xl:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                Hệ thống quản trị hợp nhất
              </span>
            </div>
          </div>

          {/* 2. TỰ ĐỘNG HÓA (TOP-RIGHT) - KHÔNG HỘP, CHỈ CÒN CHỮ "TỰ ĐỘNG HÓA" & BÁNH RĂNG TO GẤP 5 LẦN */}
          <div 
            className="hidden lg:flex absolute right-4 xl:right-10 top-0 xl:top-1 z-20 items-center gap-3.5 xl:gap-5 animate-entrance-right animate-float-node-3 select-none cursor-default group"
            style={{ animationDelay: '300ms' }}
          >
            {/* Chỉ để chữ "Tự động hóa" */}
            <span className="text-xl sm:text-2xl xl:text-3xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight drop-shadow-2xs whitespace-nowrap group-hover:text-orange-500 transition-colors">
              Tự động hóa
            </span>

            {/* Biểu tượng 4 bánh răng chuyển động ăn khớp nhịp nhàng (kích thước nhỏ hơn vừa vặn) */}
            <div className="w-[145px] h-[116px] sm:w-[160px] sm:h-[128px] xl:w-[178px] xl:h-[142px] shrink-0 filter drop-shadow-[0_4px_16px_rgba(241,90,36,0.18)] dark:drop-shadow-[0_6px_20px_rgba(251,146,60,0.25)] group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="15 10 168 136" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                {/* 1. BÁNH RĂNG CAM (LỚN - TRÊN TRÁI - QUAY THUẬN CHIỀU KIM ĐỒNG HỒ 12s) */}
                <g transform="translate(60, 54)">
                  <g className="animate-gear-mesh-orange" style={{ transformOrigin: '0px 0px' }}>
                    <path d="M 26.00 0.00 A 26.0 26.0 0 0 1 25.83 2.99 L 34.83 6.08 A 35.4 35.4 0 0 1 33.21 12.15 L 23.86 10.33 A 26.0 26.0 0 0 1 22.52 13.00 A 26.0 26.0 0 0 1 20.87 15.50 L 27.13 22.68 A 35.4 35.4 0 0 1 22.68 27.13 L 15.50 20.87 A 26.0 26.0 0 0 1 13.00 22.52 A 26.0 26.0 0 0 1 10.33 23.86 L 12.15 33.21 A 35.4 35.4 0 0 1 6.08 34.83 L 2.99 25.83 A 26.0 26.0 0 0 1 0.00 26.00 A 26.0 26.0 0 0 1 -2.99 25.83 L -6.08 34.83 A 35.4 35.4 0 0 1 -12.15 33.21 L -10.33 23.86 A 26.0 26.0 0 0 1 -13.00 22.52 A 26.0 26.0 0 0 1 -15.50 20.87 L -22.68 27.13 A 35.4 35.4 0 0 1 -27.13 22.68 L -20.87 15.50 A 26.0 26.0 0 0 1 -22.52 13.00 A 26.0 26.0 0 0 1 -23.86 10.33 L -33.21 12.15 A 35.4 35.4 0 0 1 -34.83 6.08 L -25.83 2.99 A 26.0 26.0 0 0 1 -26.00 0.00 A 26.0 26.0 0 0 1 -25.83 -2.99 L -34.83 -6.08 A 35.4 35.4 0 0 1 -33.21 -12.15 L -23.86 -10.33 A 26.0 26.0 0 0 1 -22.52 -13.00 A 26.0 26.0 0 0 1 -20.87 -15.50 L -27.13 -22.68 A 35.4 35.4 0 0 1 -22.68 -27.13 L -15.50 -20.87 A 26.0 26.0 0 0 1 -13.00 -22.52 A 26.0 26.0 0 0 1 -10.33 -23.86 L -12.15 -33.21 A 35.4 35.4 0 0 1 -6.08 -34.83 L -2.99 -25.83 A 26.0 26.0 0 0 1 -0.00 -26.00 A 26.0 26.0 0 0 1 2.99 -25.83 L 6.08 -34.83 A 35.4 35.4 0 0 1 12.15 -33.21 L 10.33 -23.86 A 26.0 26.0 0 0 1 13.00 -22.52 A 26.0 26.0 0 0 1 15.50 -20.87 L 22.68 -27.13 A 35.4 35.4 0 0 1 27.13 -22.68 L 20.87 -15.50 A 26.0 26.0 0 0 1 22.52 -13.00 A 26.0 26.0 0 0 1 23.86 -10.33 L 33.21 -12.15 A 35.4 35.4 0 0 1 34.83 -6.08 L 25.83 -2.99 A 26.0 26.0 0 0 1 26.00 -0.00 Z M 16.50 0 A 16.5 16.5 0 1 0 -16.50 0 A 16.5 16.5 0 1 0 16.50 0 Z" fill="#F28C38" fillRule="evenodd" />
                    <circle cx="0" cy="0" r="20.5" stroke="#FDE5D2" strokeWidth="4.2" fill="none" opacity="0.95" />
                  </g>
                </g>

                {/* 2. BÁNH RĂNG XÁM (NHỎ - TRÊN GIỮA - KHỚP QUAY NGƯỢC CHIỀU 8s) */}
                <g transform="translate(111.4, 62)">
                  <g className="animate-gear-mesh-gray" style={{ transformOrigin: '0px 0px' }}>
                    <path d="M 11.93 10.05 A 15.6 15.6 0 0 1 10.03 11.95 L 14.33 20.44 A 25.0 25.0 0 0 1 8.43 23.49 L 3.98 15.08 A 15.6 15.6 0 0 1 1.33 15.54 A 15.6 15.6 0 0 1 -1.36 15.54 L -4.32 24.58 A 25.0 25.0 0 0 1 -10.65 22.57 L -7.85 13.48 A 15.6 15.6 0 0 1 -10.05 11.93 A 15.6 15.6 0 0 1 -11.95 10.03 L -20.44 14.33 A 25.0 25.0 0 0 1 -23.49 8.43 L -15.08 3.98 A 15.6 15.6 0 0 1 -15.54 1.33 A 15.6 15.6 0 0 1 -15.54 -1.36 L -24.58 -4.32 A 25.0 25.0 0 0 1 -22.57 -10.65 L -13.48 -7.85 A 15.6 15.6 0 0 1 -11.93 -10.05 A 15.6 15.6 0 0 1 -10.03 -11.95 L -14.33 -20.44 A 25.0 25.0 0 0 1 -8.43 -23.49 L -3.98 -15.08 A 15.6 15.6 0 0 1 -1.33 -15.54 A 15.6 15.6 0 0 1 1.36 -15.54 L 4.32 -24.58 A 25.0 25.0 0 0 1 10.65 -22.57 L 7.85 -13.48 A 15.6 15.6 0 0 1 10.05 -11.93 A 15.6 15.6 0 0 1 11.95 -10.03 L 20.44 -14.33 A 25.0 25.0 0 0 1 23.49 -8.43 L 15.08 -3.98 A 15.6 15.6 0 0 1 15.54 -1.33 A 15.6 15.6 0 0 1 15.54 1.36 L 24.58 4.32 A 25.0 25.0 0 0 1 22.57 10.65 L 13.48 7.85 A 15.6 15.6 0 0 1 11.93 10.05 Z M 7.50 0 A 7.5 7.5 0 1 0 -7.50 0 A 7.5 7.5 0 1 0 7.50 0 Z" fill="#CBD5E1" className="dark:fill-slate-300" fillRule="evenodd" />
                  </g>
                </g>

                {/* 3. BÁNH RĂNG XANH DƯƠNG (PHẢI - KHỚP QUAY THUẬN CHIỀU 12s) */}
                <g transform="translate(138, 103.2)">
                  <g className="animate-gear-mesh-blue" style={{ transformOrigin: '0px 0px' }}>
                    <path d="M 22.69 12.69 A 26.0 26.0 0 0 1 21.08 15.22 L 27.43 22.31 A 35.4 35.4 0 0 1 23.05 26.82 L 15.78 20.66 A 26.0 26.0 0 0 1 13.30 22.34 A 26.0 26.0 0 0 1 10.65 23.72 L 12.60 33.04 A 35.4 35.4 0 0 1 6.55 34.75 L 3.34 25.78 A 26.0 26.0 0 0 1 0.35 26.00 A 26.0 26.0 0 0 1 -2.64 25.87 L -5.61 34.91 A 35.4 35.4 0 0 1 -11.70 33.37 L -10.00 24.00 A 26.0 26.0 0 0 1 -12.69 22.69 A 26.0 26.0 0 0 1 -15.22 21.08 L -22.31 27.43 A 35.4 35.4 0 0 1 -26.82 23.05 L -20.66 15.78 A 26.0 26.0 0 0 1 -22.34 13.30 A 26.0 26.0 0 0 1 -23.72 10.65 L -33.04 12.60 A 35.4 35.4 0 0 1 -34.75 6.55 L -25.78 3.34 A 26.0 26.0 0 0 1 -26.00 0.35 A 26.0 26.0 0 0 1 -25.87 -2.64 L -34.91 -5.61 A 35.4 35.4 0 0 1 -33.37 -11.70 L -24.00 -10.00 A 26.0 26.0 0 0 1 -22.69 -12.69 A 26.0 26.0 0 0 1 -21.08 -15.22 L -27.43 -22.31 A 35.4 35.4 0 0 1 -23.05 -26.82 L -15.78 -20.66 A 26.0 26.0 0 0 1 -13.30 -22.34 A 26.0 26.0 0 0 1 -10.65 -23.72 L -12.60 -33.04 A 35.4 35.4 0 0 1 -6.55 -34.75 L -3.34 -25.78 A 26.0 26.0 0 0 1 -0.35 -26.00 A 26.0 26.0 0 0 1 2.64 -25.87 L 5.61 -34.91 A 35.4 35.4 0 0 1 11.70 -33.37 L 10.00 -24.00 A 26.0 26.0 0 0 1 12.69 -22.69 A 26.0 26.0 0 0 1 15.22 -21.08 L 22.31 -27.43 A 35.4 35.4 0 0 1 26.82 -23.05 L 20.66 -15.78 A 26.0 26.0 0 0 1 22.34 -13.30 A 26.0 26.0 0 0 1 23.72 -10.65 L 33.04 -12.60 A 35.4 35.4 0 0 1 34.75 -6.55 L 25.78 -3.34 A 26.0 26.0 0 0 1 26.00 -0.35 A 26.0 26.0 0 0 1 25.87 2.64 L 34.91 5.61 A 35.4 35.4 0 0 1 33.37 11.70 L 24.00 10.00 A 26.0 26.0 0 0 1 22.69 12.69 Z M 12.50 0 A 12.5 12.5 0 1 0 -12.50 0 A 12.5 12.5 0 1 0 12.50 0 Z" fill="#4B9CD3" fillRule="evenodd" />
                  </g>
                </g>

                {/* 4. BÁNH RĂNG XANH LÁ (DƯỚI GIỮA - KHỚP QUAY NGƯỢC CHIỀU 12s) */}
                <g transform="translate(89.3, 109.1)">
                  <g className="animate-gear-mesh-green" style={{ transformOrigin: '0px 0px' }}>
                    <path d="M 24.60 8.43 A 26.0 26.0 0 0 1 23.47 11.20 L 30.98 17.04 A 35.4 35.4 0 0 1 27.48 22.26 L 19.23 17.50 A 26.0 26.0 0 0 1 17.09 19.59 A 26.0 26.0 0 0 1 14.72 21.43 L 18.31 30.25 A 35.4 35.4 0 0 1 12.67 33.01 L 7.90 24.77 A 26.0 26.0 0 0 1 5.00 25.51 A 26.0 26.0 0 0 1 2.04 25.92 L 0.74 35.35 A 35.4 35.4 0 0 1 -5.54 34.92 L -5.54 25.40 A 26.0 26.0 0 0 1 -8.43 24.60 A 26.0 26.0 0 0 1 -11.20 23.47 L -17.04 30.98 A 35.4 35.4 0 0 1 -22.26 27.48 L -17.50 19.23 A 26.0 26.0 0 0 1 -19.59 17.09 A 26.0 26.0 0 0 1 -21.43 14.72 L -30.25 18.31 A 35.4 35.4 0 0 1 -33.01 12.67 L -24.77 7.90 A 26.0 26.0 0 0 1 -25.51 5.00 A 26.0 26.0 0 0 1 -25.92 2.04 L -35.35 0.74 A 35.4 35.4 0 0 1 -34.92 -5.54 L -25.40 -5.54 A 26.0 26.0 0 0 1 -24.60 -8.43 A 26.0 26.0 0 0 1 -23.47 -11.20 L -30.98 -17.04 A 35.4 35.4 0 0 1 -27.48 -22.26 L -19.23 -17.50 A 26.0 26.0 0 0 1 -17.09 -19.59 A 26.0 26.0 0 0 1 -14.72 -21.43 L -18.31 -30.25 A 35.4 35.4 0 0 1 -12.67 -33.01 L -7.90 -24.77 A 26.0 26.0 0 0 1 -5.00 -25.51 A 26.0 26.0 0 0 1 -2.04 -25.92 L -0.74 -35.35 A 35.4 35.4 0 0 1 5.54 -34.92 L 5.54 -25.40 A 26.0 26.0 0 0 1 8.43 -24.60 A 26.0 26.0 0 0 1 11.20 -23.47 L 17.04 -30.98 A 35.4 35.4 0 0 1 22.26 -27.48 L 17.50 -19.23 A 26.0 26.0 0 0 1 19.59 -17.09 A 26.0 26.0 0 0 1 21.43 -14.72 L 30.25 -18.31 A 35.4 35.4 0 0 1 33.01 -12.67 L 24.77 -7.90 A 26.0 26.0 0 0 1 25.51 -5.00 A 26.0 26.0 0 0 1 25.92 -2.04 L 35.35 -0.74 A 35.4 35.4 0 0 1 34.92 5.54 L 25.40 5.54 A 26.0 26.0 0 0 1 24.60 8.43 Z M 12.00 0 A 12.0 12.0 0 1 0 -12.00 0 A 12.0 12.0 0 1 0 12.00 0 Z" fill="#7CB342" fillRule="evenodd" />
                  </g>
                </g>

                {/* MŨI TÊN CHỈ HƯỚNG QUAY 1 (TRÊN BÁNH RĂNG XÁM) */}
                <g className="opacity-90">
                  <path d="M 98 22 C 108 14 126 14 136 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" className="text-slate-600 dark:text-slate-200" />
                  <path d="M 131 16 L 137 21.5 L 130 25 Z" fill="currentColor" className="text-slate-600 dark:text-slate-200" />
                </g>

                {/* MŨI TÊN CHỈ HƯỚNG QUAY 2 (GÓC DƯỚI BÁNH RĂNG XANH LÁ) */}
                <g className="opacity-90">
                  <path d="M 78 126 C 64 120 61 104 65 92" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" className="text-slate-600 dark:text-slate-200" />
                  <path d="M 60 97 L 65.5 91 L 70.5 96 Z" fill="currentColor" className="text-slate-600 dark:text-slate-200" />
                </g>
              </svg>
            </div>
          </div>

          {/* 3. SỐ HÓA (BOTTOM-LEFT) - THIẾT KẾ MỀM MẠI, UYỂN CHUYỂN PHONG CÁCH VIETTEL AI */}
          <div 
            className="hidden md:flex absolute left-4 xl:left-12 bottom-3 xl:bottom-6 z-20 items-center gap-3.5 px-4 py-2.5 xl:px-5 xl:py-3 rounded-2xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border border-sky-200/50 dark:border-sky-900/40 shadow-[0_4px_20px_rgba(2,132,199,0.06)] hover:shadow-[0_8px_30px_rgba(2,132,199,0.15)] hover:border-sky-300 dark:hover:border-sky-500/50 hover:-translate-y-0.5 transition-all duration-300 group cursor-default select-none animate-entrance-left animate-float-node-2"
            style={{ animationDelay: '450ms' }}
          >
            {/* Soft Icon Badge */}
            <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-sky-500/15 flex items-center justify-center shrink-0 border border-sky-300/30 dark:border-sky-700/40 group-hover:scale-105 transition-transform duration-300 shadow-xs">
              <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
                <defs>
                  <linearGradient id="grad-digit" x1="6" y1="14" x2="44" y2="34" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="50%" stopColor="#00A8E8" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                {/* Đường sóng uốn lượn mềm mại dạng Bezier */}
                <path
                  d="M 6 27 C 12 27 14 15 20 15 C 26 15 28 33 34 33 C 38 33 40 24 44 24"
                  stroke="url(#grad-digit)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Đường sóng phụ mờ */}
                <path
                  d="M 6 23 C 12 23 15 19 21 19 C 27 19 31 29 37 29 C 40 29 42 26 44 26"
                  stroke="url(#grad-digit)"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                  opacity="0.45"
                  strokeLinecap="round"
                />
                {/* Các điểm nút phát sáng lan tỏa */}
                <circle cx="20" cy="15" r="3.2" fill="#0284C7" className="animate-pulse" />
                <circle cx="20" cy="15" r="1.2" fill="#FFFFFF" />
                <circle cx="34" cy="33" r="2.8" fill="#00A8E8" />
                <circle cx="34" cy="33" r="1" fill="#FFFFFF" />
                <circle cx="44" cy="24" r="2.2" fill="#10B981" />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] xl:text-[11px] font-semibold text-sky-600 dark:text-sky-400 tracking-wide">
                  Dữ liệu thông suốt
                </span>
              </div>
              <span className="text-base xl:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                Số hóa
              </span>
              <span className="text-[11px] xl:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                Khai phá & xử lý dữ liệu tức thì
              </span>
            </div>
          </div>

          {/* 4. TƯƠNG TÁC (BOTTOM-RIGHT) - THIẾT KẾ MỀM MẠI, UYỂN CHUYỂN PHONG CÁCH VIETTEL AI */}
          <div 
            className="hidden md:flex absolute right-4 xl:right-12 bottom-3 xl:bottom-6 z-20 items-center gap-3.5 px-4 py-2.5 xl:px-5 xl:py-3 rounded-2xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border border-orange-200/50 dark:border-orange-900/40 shadow-[0_4px_20px_rgba(241,90,36,0.06)] hover:shadow-[0_8px_30px_rgba(241,90,36,0.15)] hover:border-orange-300 dark:hover:border-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 group cursor-default select-none animate-entrance-right animate-float-node-4"
            style={{ animationDelay: '550ms' }}
          >
            {/* Typography */}
            <div className="flex flex-col text-right">
              <div className="flex items-center justify-end gap-1.5 mb-0.5">
                <span className="text-[10px] xl:text-[11px] font-semibold text-orange-600 dark:text-orange-400 tracking-wide">
                  Giao tiếp đa chiều
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <span className="text-base xl:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                Tương tác
              </span>
              <span className="text-[11px] xl:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                Trợ lý AI & kết nối đa kênh
              </span>
            </div>

            {/* Soft Icon Badge */}
            <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/15 flex items-center justify-center shrink-0 border border-orange-300/30 dark:border-orange-700/40 group-hover:scale-105 transition-transform duration-300 shadow-xs">
              <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
                <defs>
                  <linearGradient id="grad-inter" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F15A24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                {/* Bong bóng hội thoại bo tròn mềm */}
                <path
                  d="M 11 22 C 11 15.5 16.5 11 23.5 11 C 30.5 11 36 15.5 36 22 C 36 25 34.5 28 32 30 C 31 32.5 33 35 34 36 C 31 36 28 34.5 26.5 33.5 C 25.5 33.8 24.5 34 23.5 34 C 16.5 34 11 28.5 11 22 Z"
                  stroke="url(#grad-inter)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="url(#grad-inter)"
                  fillOpacity="0.08"
                />
                {/* Sóng âm thanh hội thoại nhịp nhàng */}
                <line x1="23.5" y1="17" x2="23.5" y2="27" stroke="#F15A24" strokeWidth="2.2" strokeLinecap="round" className="animate-pulse" />
                <line x1="19.5" y1="19" x2="19.5" y2="25" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                <line x1="27.5" y1="19" x2="27.5" y2="25" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
                {/* Điểm sáng tương tác góc dưới */}
                <circle cx="36" cy="16" r="2.5" fill="#F59E0B" className="animate-ping" opacity="0.8" />
                <circle cx="36" cy="16" r="2" fill="#F59E0B" />
                <circle cx="36" cy="16" r="0.8" fill="#FFFFFF" />
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
