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

            {/* Biểu tượng 4 bánh răng ăn khớp chuẩn xác: Cam (to điểm nhấn), Xám, Đen, Xanh dương */}
            <div className="w-[145px] h-[117px] sm:w-[160px] sm:h-[129px] xl:w-[178px] xl:h-[144px] shrink-0 filter drop-shadow-[0_4px_16px_rgba(241,90,36,0.18)] dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="8 10 186 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                {/* 1. BÁNH RĂNG MÀU CAM (LỚN NHẤT - TRÊN TRÁI - TẠO ĐIỂM NHẤN NỔI BẬT - QUAY THUẬN CHIỀU 16s) */}
                <g>
                  <path d="M 94.40 56.00 A 36.4 36.4 0 0 1 94.31 58.50 L 103.30 62.72 A 45.8 45.8 0 0 1 102.43 67.13 L 92.51 67.59 A 36.4 36.4 0 0 1 91.63 69.93 A 36.4 36.4 0 0 1 90.59 72.21 L 97.28 79.55 A 45.8 45.8 0 0 1 94.79 83.28 L 85.45 79.91 A 36.4 36.4 0 0 1 83.74 81.74 A 36.4 36.4 0 0 1 81.91 83.45 L 85.28 92.79 A 45.8 45.8 0 0 1 81.55 95.28 L 74.21 88.59 A 36.4 36.4 0 0 1 71.93 89.63 A 36.4 36.4 0 0 1 69.59 90.51 L 69.13 100.43 A 45.8 45.8 0 0 1 64.72 101.30 L 60.50 92.31 A 36.4 36.4 0 0 1 58.00 92.40 A 36.4 36.4 0 0 1 55.50 92.31 L 51.28 101.30 A 45.8 45.8 0 0 1 46.87 100.43 L 46.41 90.51 A 36.4 36.4 0 0 1 44.07 89.63 A 36.4 36.4 0 0 1 41.79 88.59 L 34.45 95.28 A 45.8 45.8 0 0 1 30.72 92.79 L 34.09 83.45 A 36.4 36.4 0 0 1 32.26 81.74 A 36.4 36.4 0 0 1 30.55 79.91 L 21.21 83.28 A 45.8 45.8 0 0 1 18.72 79.55 L 25.41 72.21 A 36.4 36.4 0 0 1 24.37 69.93 A 36.4 36.4 0 0 1 23.49 67.59 L 13.57 67.13 A 45.8 45.8 0 0 1 12.70 62.72 L 21.69 58.50 A 36.4 36.4 0 0 1 21.60 56.00 A 36.4 36.4 0 0 1 21.69 53.50 L 12.70 49.28 A 45.8 45.8 0 0 1 13.57 44.87 L 23.49 44.41 A 36.4 36.4 0 0 1 24.37 42.07 A 36.4 36.4 0 0 1 25.41 39.79 L 18.72 32.45 A 45.8 45.8 0 0 1 21.21 28.72 L 30.55 32.09 A 36.4 36.4 0 0 1 32.26 30.26 A 36.4 36.4 0 0 1 34.09 28.55 L 30.72 19.21 A 45.8 45.8 0 0 1 34.45 16.72 L 41.79 23.41 A 36.4 36.4 0 0 1 44.07 22.37 A 36.4 36.4 0 0 1 46.41 21.49 L 46.87 11.57 A 45.8 45.8 0 0 1 51.28 10.70 L 55.50 19.69 A 36.4 36.4 0 0 1 58.00 19.60 A 36.4 36.4 0 0 1 60.50 19.69 L 64.72 10.70 A 45.8 45.8 0 0 1 69.13 11.57 L 69.59 21.49 A 36.4 36.4 0 0 1 71.93 22.37 A 36.4 36.4 0 0 1 74.21 23.41 L 81.55 16.72 A 45.8 45.8 0 0 1 85.28 19.21 L 81.91 28.55 A 36.4 36.4 0 0 1 83.74 30.26 A 36.4 36.4 0 0 1 85.45 32.09 L 94.79 28.72 A 45.8 45.8 0 0 1 97.28 32.45 L 90.59 39.79 A 36.4 36.4 0 0 1 91.63 42.07 A 36.4 36.4 0 0 1 92.51 44.41 L 102.43 44.87 A 45.8 45.8 0 0 1 103.30 49.28 L 94.31 53.50 A 36.4 36.4 0 0 1 94.40 56.00 Z M 76.00 56.00 A 18.0 18.0 0 1 0 40.00 56.00 A 18.0 18.0 0 1 0 76.00 56.00 Z" fill="#F15A24" stroke="#EA580C" strokeWidth="0.7" fillRule="evenodd" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 58 56"
                    to="360 58 56"
                    dur="16s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* 2. BÁNH RĂNG MÀU XÁM (NHỎ NHẤT TRÊN PHẢI - ĂN KHỚP HOÀN HẢO VỚI BÁNH RĂNG CAM - QUAY NGƯỢC CHIỀU 8s) */}
                <g>
                  <path d="M 133.27 44.15 A 15.6 15.6 0 0 1 132.54 46.16 L 139.27 53.42 A 25.0 25.0 0 0 1 136.22 57.26 L 127.63 52.33 A 15.6 15.6 0 0 1 125.83 53.49 A 15.6 15.6 0 0 1 123.89 54.40 L 123.52 64.29 A 25.0 25.0 0 0 1 118.65 64.85 L 116.07 55.29 A 15.6 15.6 0 0 1 113.97 54.85 A 15.6 15.6 0 0 1 111.96 54.12 L 104.70 60.85 A 25.0 25.0 0 0 1 100.86 57.80 L 105.79 49.21 A 15.6 15.6 0 0 1 104.63 47.41 A 15.6 15.6 0 0 1 103.72 45.47 L 93.83 45.10 A 25.0 25.0 0 0 1 93.27 40.23 L 102.83 37.65 A 15.6 15.6 0 0 1 103.27 35.55 A 15.6 15.6 0 0 1 104.00 33.54 L 97.27 26.28 A 25.0 25.0 0 0 1 100.32 22.44 L 108.91 27.37 A 15.6 15.6 0 0 1 110.71 26.21 A 15.6 15.6 0 0 1 112.65 25.30 L 113.02 15.41 A 25.0 25.0 0 0 1 117.89 14.85 L 120.47 24.41 A 15.6 15.6 0 0 1 122.57 24.85 A 15.6 15.6 0 0 1 124.58 25.58 L 131.84 18.85 A 25.0 25.0 0 0 1 135.68 21.90 L 130.75 30.49 A 15.6 15.6 0 0 1 131.91 32.29 A 15.6 15.6 0 0 1 132.82 34.23 L 142.71 34.60 A 25.0 25.0 0 0 1 143.27 39.47 L 133.71 42.05 A 15.6 15.6 0 0 1 133.27 44.15 Z M 126.27 39.85 A 8.0 8.0 0 1 0 110.27 39.85 A 8.0 8.0 0 1 0 126.27 39.85 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="0.6" className="dark:fill-slate-300 dark:stroke-slate-400" fillRule="evenodd" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 118.27 39.85"
                    to="-360 118.27 39.85"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* 3. BÁNH RĂNG MÀU ĐEN (DƯỚI GIỮA - ĂN KHỚP HOÀN HẢO VỚI BÁNH RĂNG CAM - QUAY NGƯỢC CHIỀU 12s) */}
                <g>
                  <path d="M 116.57 129.28 A 26.0 26.0 0 0 1 115.65 131.47 L 122.36 138.78 A 35.4 35.4 0 0 1 119.69 142.56 L 110.56 138.66 A 26.0 26.0 0 0 1 108.81 140.27 A 26.0 26.0 0 0 1 106.91 141.71 L 109.07 151.39 A 35.4 35.4 0 0 1 104.87 153.33 L 98.91 145.39 A 26.0 26.0 0 0 1 96.58 145.90 A 26.0 26.0 0 0 1 94.22 146.20 L 91.25 155.67 A 35.4 35.4 0 0 1 86.64 155.24 L 85.45 145.39 A 26.0 26.0 0 0 1 83.18 144.67 A 26.0 26.0 0 0 1 80.99 143.75 L 73.68 150.46 A 35.4 35.4 0 0 1 69.90 147.79 L 73.80 138.66 A 26.0 26.0 0 0 1 72.19 136.91 A 26.0 26.0 0 0 1 70.75 135.01 L 61.07 137.17 A 35.4 35.4 0 0 1 59.13 132.97 L 67.07 127.01 A 26.0 26.0 0 0 1 66.56 124.68 A 26.0 26.0 0 0 1 66.26 122.32 L 56.79 119.35 A 35.4 35.4 0 0 1 57.22 114.74 L 67.07 113.55 A 26.0 26.0 0 0 1 67.79 111.28 A 26.0 26.0 0 0 1 68.71 109.09 L 62.00 101.78 A 35.4 35.4 0 0 1 64.67 98.00 L 73.80 101.90 A 26.0 26.0 0 0 1 75.55 100.29 A 26.0 26.0 0 0 1 77.45 98.85 L 75.29 89.17 A 35.4 35.4 0 0 1 79.49 87.23 L 85.45 95.17 A 26.0 26.0 0 0 1 87.78 94.66 A 26.0 26.0 0 0 1 90.14 94.36 L 93.11 84.89 A 35.4 35.4 0 0 1 97.72 85.32 L 98.91 95.17 A 26.0 26.0 0 0 1 101.18 95.89 A 26.0 26.0 0 0 1 103.37 96.81 L 110.68 90.10 A 35.4 35.4 0 0 1 114.46 92.77 L 110.56 101.90 A 26.0 26.0 0 0 1 112.17 103.65 A 26.0 26.0 0 0 1 113.61 105.55 L 123.29 103.39 A 35.4 35.4 0 0 1 125.23 107.59 L 117.29 113.55 A 26.0 26.0 0 0 1 117.80 115.88 A 26.0 26.0 0 0 1 118.10 118.24 L 127.57 121.21 A 35.4 35.4 0 0 1 127.14 125.82 L 117.29 127.01 A 26.0 26.0 0 0 1 116.57 129.28 Z M 106.18 120.28 A 14.0 14.0 0 1 0 78.18 120.28 A 14.0 14.0 0 1 0 106.18 120.28 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="0.6" className="dark:fill-slate-900 dark:stroke-slate-600" fillRule="evenodd" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 92.18 120.28"
                    to="-360 92.18 120.28"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* 4. BÁNH RĂNG MÀU XANH DƯƠNG (PHẢI - ĂN KHỚP CHUẨN XÁC VỚI BÁNH RĂNG ĐEN - QUAY THUẬN CHIỀU 12s) */}
                <g>
                  <path d="M 179.11 109.69 A 26.0 26.0 0 0 1 178.78 112.05 L 187.16 117.36 A 35.4 35.4 0 0 1 185.56 121.71 L 175.74 120.31 A 26.0 26.0 0 0 1 174.45 122.32 A 26.0 26.0 0 0 1 172.99 124.20 L 177.59 132.99 A 35.4 35.4 0 0 1 174.03 135.95 L 166.22 129.83 A 26.0 26.0 0 0 1 164.11 130.92 A 26.0 26.0 0 0 1 161.90 131.82 L 161.48 141.73 A 35.4 35.4 0 0 1 156.92 142.52 L 153.22 133.31 A 26.0 26.0 0 0 1 150.84 133.20 A 26.0 26.0 0 0 1 148.48 132.87 L 143.17 141.25 A 35.4 35.4 0 0 1 138.82 139.65 L 140.22 129.83 A 26.0 26.0 0 0 1 138.21 128.54 A 26.0 26.0 0 0 1 136.33 127.08 L 127.54 131.68 A 35.4 35.4 0 0 1 124.58 128.12 L 130.70 120.31 A 26.0 26.0 0 0 1 129.61 118.20 A 26.0 26.0 0 0 1 128.71 115.99 L 118.80 115.57 A 35.4 35.4 0 0 1 118.01 111.01 L 127.22 107.31 A 26.0 26.0 0 0 1 127.33 104.93 A 26.0 26.0 0 0 1 127.66 102.57 L 119.28 97.26 A 35.4 35.4 0 0 1 120.88 92.91 L 130.70 94.31 A 26.0 26.0 0 0 1 131.99 92.30 A 26.0 26.0 0 0 1 133.45 90.42 L 128.85 81.63 A 35.4 35.4 0 0 1 132.41 78.67 L 140.22 84.79 A 26.0 26.0 0 0 1 142.33 83.70 A 26.0 26.0 0 0 1 144.54 82.80 L 144.96 72.89 A 35.4 35.4 0 0 1 149.52 72.10 L 153.22 81.31 A 26.0 26.0 0 0 1 155.60 81.42 A 26.0 26.0 0 0 1 157.96 81.75 L 163.27 73.37 A 35.4 35.4 0 0 1 167.62 74.97 L 166.22 84.79 A 26.0 26.0 0 0 1 168.23 86.08 A 26.0 26.0 0 0 1 170.11 87.54 L 178.90 82.94 A 35.4 35.4 0 0 1 181.86 86.50 L 175.74 94.31 A 26.0 26.0 0 0 1 176.83 96.42 A 26.0 26.0 0 0 1 177.73 98.63 L 187.64 99.05 A 35.4 35.4 0 0 1 188.43 103.61 L 179.22 107.31 A 26.0 26.0 0 0 1 179.11 109.69 Z M 167.22 107.31 A 14.0 14.0 0 1 0 139.22 107.31 A 14.0 14.0 0 1 0 167.22 107.31 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="0.6" className="dark:fill-sky-500 dark:stroke-sky-400" fillRule="evenodd" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 153.22 107.31"
                    to="360 153.22 107.31"
                    dur="12s"
                    repeatCount="indefinite"
                  />
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
