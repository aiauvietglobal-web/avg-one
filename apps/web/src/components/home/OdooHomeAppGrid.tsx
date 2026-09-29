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

          {/* 2. TỰ ĐỘNG HÓA (TOP-RIGHT) - CÁCH ĐIỆU CAO CẤP & BỘ BÁNH RĂNG 3D ĂN KHỚP CHUẨN XÁC */}
          <div 
            className="hidden lg:flex absolute right-2 xl:right-6 top-0 xl:top-1 z-20 items-center gap-4 xl:gap-6 animate-entrance-right animate-float-node-3 select-none cursor-default group"
            style={{ animationDelay: '300ms' }}
          >
            {/* Khối chữ TỰ ĐỘNG HÓA cách điệu sang trọng, tinh tế */}
            <div className="flex flex-col items-end text-right">
              {/* Badge micro-tag phát sáng */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-1 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/15 to-orange-500/10 dark:from-orange-500/20 dark:via-amber-500/25 dark:to-orange-500/20 border border-orange-500/30 dark:border-orange-500/40 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-pulse" />
                <span className="text-[10px] xl:text-[11px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
                  Vận hành thông minh
                </span>
              </div>

              {/* Chữ TỰ ĐỘNG HÓA cách điệu với Gradient kim loại và đổ bóng 3D */}
              <span className="text-xl sm:text-2xl xl:text-3xl font-black uppercase tracking-tight leading-none bg-gradient-to-r from-slate-900 via-orange-600 to-amber-600 dark:from-slate-100 dark:via-orange-400 dark:to-amber-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(241,90,36,0.2)] group-hover:scale-[1.02] transition-transform duration-300">
                Tự động hóa
              </span>

              {/* Phụ đề bổ trợ ý nghĩa */}
              <span className="text-[11px] xl:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-normal mt-1">
                Chuẩn hóa quy trình liên cụm
              </span>
            </div>

            {/* Sân khấu bánh răng 3D (3D Isometric Perspective + Multi-stop Shaders) */}
            <div 
              className="w-[150px] h-[122px] sm:w-[166px] sm:h-[135px] xl:w-[186px] xl:h-[150px] shrink-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                perspective: '1000px',
                transform: 'rotateX(8deg) rotateY(-6deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <svg viewBox="8 10 190 152" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                <defs>
                  {/* 3D Drop Shadow */}
                  <filter id="gear3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="2.5" dy="4" stdDeviation="3.5" floodColor="#090D16" floodOpacity="0.35" />
                  </filter>

                  {/* 3D Gradients */}
                  {/* 1. Cam 3D Gradient */}
                  <linearGradient id="grad-gear-orange-3d" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
                    <stop offset="0%" stopColor="#FFA666" />
                    <stop offset="35%" stopColor="#F15A24" />
                    <stop offset="75%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#9A3412" />
                  </linearGradient>

                  {/* 2. Xám 3D Metallic Gradient */}
                  <linearGradient id="grad-gear-gray-3d" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="40%" stopColor="#CBD5E1" />
                    <stop offset="80%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  {/* 3. Đen 3D Obsidian/Carbon Gradient */}
                  <linearGradient id="grad-gear-black-3d" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="30%" stopColor="#1E293B" />
                    <stop offset="75%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  {/* 4. Xanh dương 3D Sapphire Gradient */}
                  <linearGradient id="grad-gear-blue-3d" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
                    <stop offset="0%" stopColor="#7DD3FC" />
                    <stop offset="35%" stopColor="#0284C7" />
                    <stop offset="75%" stopColor="#0369A1" />
                    <stop offset="100%" stopColor="#0C4A6E" />
                  </linearGradient>

                  {/* Metallic Hub Gradient */}
                  <radialGradient id="grad-gear-hub" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                    <stop offset="60%" stopColor="#CBD5E1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0F172A" stopOpacity="0.45" />
                  </radialGradient>
                </defs>

                {/* 1. BÁNH RĂNG MÀU CAM (LỚN NHẤT - TRÊN TRÁI - TẠO ĐIỂM NHẤN 3D NỔI BẬT - QUAY THUẬN CHIỀU 16s) */}
                <g filter="url(#gear3d-shadow)">
                  <path d="M 94.40 56.00 A 36.4 36.4 0 0 1 94.31 58.50 L 103.30 62.72 A 45.8 45.8 0 0 1 102.43 67.13 L 92.51 67.59 A 36.4 36.4 0 0 1 91.63 69.93 A 36.4 36.4 0 0 1 90.59 72.21 L 97.28 79.55 A 45.8 45.8 0 0 1 94.79 83.28 L 85.45 79.91 A 36.4 36.4 0 0 1 83.74 81.74 A 36.4 36.4 0 0 1 81.91 83.45 L 85.28 92.79 A 45.8 45.8 0 0 1 81.55 95.28 L 74.21 88.59 A 36.4 36.4 0 0 1 71.93 89.63 A 36.4 36.4 0 0 1 69.59 90.51 L 69.13 100.43 A 45.8 45.8 0 0 1 64.72 101.30 L 60.50 92.31 A 36.4 36.4 0 0 1 58.00 92.40 A 36.4 36.4 0 0 1 55.50 92.31 L 51.28 101.30 A 45.8 45.8 0 0 1 46.87 100.43 L 46.41 90.51 A 36.4 36.4 0 0 1 44.07 89.63 A 36.4 36.4 0 0 1 41.79 88.59 L 34.45 95.28 A 45.8 45.8 0 0 1 30.72 92.79 L 34.09 83.45 A 36.4 36.4 0 0 1 32.26 81.74 A 36.4 36.4 0 0 1 30.55 79.91 L 21.21 83.28 A 45.8 45.8 0 0 1 18.72 79.55 L 25.41 72.21 A 36.4 36.4 0 0 1 24.37 69.93 A 36.4 36.4 0 0 1 23.49 67.59 L 13.57 67.13 A 45.8 45.8 0 0 1 12.70 62.72 L 21.69 58.50 A 36.4 36.4 0 0 1 21.60 56.00 A 36.4 36.4 0 0 1 21.69 53.50 L 12.70 49.28 A 45.8 45.8 0 0 1 13.57 44.87 L 23.49 44.41 A 36.4 36.4 0 0 1 24.37 42.07 A 36.4 36.4 0 0 1 25.41 39.79 L 18.72 32.45 A 45.8 45.8 0 0 1 21.21 28.72 L 30.55 32.09 A 36.4 36.4 0 0 1 32.26 30.26 A 36.4 36.4 0 0 1 34.09 28.55 L 30.72 19.21 A 45.8 45.8 0 0 1 34.45 16.72 L 41.79 23.41 A 36.4 36.4 0 0 1 44.07 22.37 A 36.4 36.4 0 0 1 46.41 21.49 L 46.87 11.57 A 45.8 45.8 0 0 1 51.28 10.70 L 55.50 19.69 A 36.4 36.4 0 0 1 58.00 19.60 A 36.4 36.4 0 0 1 60.50 19.69 L 64.72 10.70 A 45.8 45.8 0 0 1 69.13 11.57 L 69.59 21.49 A 36.4 36.4 0 0 1 71.93 22.37 A 36.4 36.4 0 0 1 74.21 23.41 L 81.55 16.72 A 45.8 45.8 0 0 1 85.28 19.21 L 81.91 28.55 A 36.4 36.4 0 0 1 83.74 30.26 A 36.4 36.4 0 0 1 85.45 32.09 L 94.79 28.72 A 45.8 45.8 0 0 1 97.28 32.45 L 90.59 39.79 A 36.4 36.4 0 0 1 91.63 42.07 A 36.4 36.4 0 0 1 92.51 44.41 L 102.43 44.87 A 45.8 45.8 0 0 1 103.30 49.28 L 94.31 53.50 A 36.4 36.4 0 0 1 94.40 56.00 Z M 76.00 56.00 A 18.0 18.0 0 1 0 40.00 56.00 A 18.0 18.0 0 1 0 76.00 56.00 Z" fill="url(#grad-gear-orange-3d)" stroke="#FDBA74" strokeWidth="0.75" strokeOpacity="0.6" fillRule="evenodd" />
                  <circle cx="58" cy="56" r="30.0" stroke="#FFEDD5" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" fill="none" />
                  <circle cx="58" cy="56" r="21.5" stroke="#9A3412" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                  <circle cx="58" cy="56" r="18.0" fill="url(#grad-gear-hub)" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 58 56"
                    to="360 58 56"
                    dur="16s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* 2. BÁNH RĂNG MÀU XÁM (NHỎ NHẤT TRÊN PHẢI - NỚI KHOẢNG CÁCH ĂN KHỚP 3D - QUAY NGƯỢC CHIỀU 8s) */}
                <g filter="url(#gear3d-shadow)">
                  <path d="M 135.59 43.53 A 15.6 15.6 0 0 1 134.86 45.54 L 141.59 52.80 A 25.0 25.0 0 0 1 138.54 56.64 L 129.95 51.71 A 15.6 15.6 0 0 1 128.15 52.87 A 15.6 15.6 0 0 1 126.21 53.78 L 125.84 63.67 A 25.0 25.0 0 0 1 120.97 64.23 L 118.39 54.67 A 15.6 15.6 0 0 1 116.29 54.23 A 15.6 15.6 0 0 1 114.28 53.50 L 107.02 60.23 A 25.0 25.0 0 0 1 103.18 57.18 L 108.11 48.59 A 15.6 15.6 0 0 1 106.95 46.79 A 15.6 15.6 0 0 1 106.04 44.85 L 96.15 44.48 A 25.0 25.0 0 0 1 95.59 39.61 L 105.15 37.03 A 15.6 15.6 0 0 1 105.59 34.93 A 15.6 15.6 0 0 1 106.32 32.92 L 99.59 25.66 A 25.0 25.0 0 0 1 102.64 21.82 L 111.23 26.75 A 15.6 15.6 0 0 1 113.03 25.59 A 15.6 15.6 0 0 1 114.97 24.68 L 115.34 14.79 A 25.0 25.0 0 0 1 120.21 14.23 L 122.79 23.79 A 15.6 15.6 0 0 1 124.89 24.23 A 15.6 15.6 0 0 1 126.90 24.96 L 134.16 18.23 A 25.0 25.0 0 0 1 138.00 21.28 L 133.07 29.87 A 15.6 15.6 0 0 1 134.23 31.67 A 15.6 15.6 0 0 1 135.14 33.61 L 145.03 33.98 A 25.0 25.0 0 0 1 145.59 38.85 L 136.03 41.43 A 15.6 15.6 0 0 1 135.59 43.53 Z M 128.59 39.23 A 8.0 8.0 0 1 0 112.59 39.23 A 8.0 8.0 0 1 0 128.59 39.23 Z" fill="url(#grad-gear-gray-3d)" stroke="#FFFFFF" strokeWidth="0.65" strokeOpacity="0.7" fillRule="evenodd" />
                  <circle cx="120.59" cy="39.23" r="14.1" stroke="#F8FAFC" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
                  <circle cx="120.59" cy="39.23" r="10.5" stroke="#475569" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                  <circle cx="120.59" cy="39.23" r="8.0" fill="url(#grad-gear-hub)" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 120.59 39.23"
                    to="-360 120.59 39.23"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* 3. BÁNH RĂNG MÀU ĐEN (DƯỚI GIỮA - OBSIDIAN 3D ĂN KHỚP HOÀN HẢO - QUAY NGƯỢC CHIỀU 12s) */}
                <g filter="url(#gear3d-shadow)">
                  <path d="M 119.16 127.18 A 26.0 26.0 0 0 1 118.52 129.50 L 126.15 135.88 A 35.4 35.4 0 0 1 123.94 140.00 L 114.47 137.64 A 26.0 26.0 0 0 1 112.92 139.51 A 26.0 26.0 0 0 1 111.20 141.16 L 114.61 150.45 A 35.4 35.4 0 0 1 110.65 152.99 L 103.88 145.79 A 26.0 26.0 0 0 1 101.55 146.61 A 26.0 26.0 0 0 1 99.18 147.21 L 97.43 157.06 A 35.4 35.4 0 0 1 92.79 157.25 L 90.39 147.66 A 26.0 26.0 0 0 1 88.08 147.25 A 26.0 26.0 0 0 1 85.83 146.61 L 79.52 154.26 A 35.4 35.4 0 0 1 75.31 152.05 L 78.47 142.66 A 26.0 26.0 0 0 1 76.60 141.11 A 26.0 26.0 0 0 1 74.95 139.39 L 65.66 142.80 A 35.4 35.4 0 0 1 63.12 138.84 L 70.32 132.07 A 26.0 26.0 0 0 1 69.50 129.74 A 26.0 26.0 0 0 1 68.90 127.37 L 59.05 125.62 A 35.4 35.4 0 0 1 58.86 120.98 L 68.45 118.58 A 26.0 26.0 0 0 1 68.86 116.27 A 26.0 26.0 0 0 1 69.50 114.02 L 61.85 107.71 A 35.4 35.4 0 0 1 64.06 103.50 L 73.45 106.66 A 26.0 26.0 0 0 1 75.00 104.79 A 26.0 26.0 0 0 1 76.72 103.14 L 73.31 93.85 A 35.4 35.4 0 0 1 77.27 91.31 L 84.04 98.51 A 26.0 26.0 0 0 1 86.37 97.69 A 26.0 26.0 0 0 1 88.74 97.09 L 90.49 87.24 A 35.4 35.4 0 0 1 95.13 87.05 L 97.53 96.64 A 26.0 26.0 0 0 1 99.84 97.05 A 26.0 26.0 0 0 1 102.09 97.69 L 108.40 90.04 A 35.4 35.4 0 0 1 112.61 92.25 L 109.45 101.64 A 26.0 26.0 0 0 1 111.32 103.19 A 26.0 26.0 0 0 1 112.97 104.91 L 122.26 101.50 A 35.4 35.4 0 0 1 124.80 105.46 L 117.60 112.23 A 26.0 26.0 0 0 1 118.42 114.56 A 26.0 26.0 0 0 1 119.02 116.93 L 128.87 118.68 A 35.4 35.4 0 0 1 129.06 123.32 L 119.47 125.72 A 26.0 26.0 0 0 1 119.16 127.18 Z M 107.49 122.75 A 14.0 14.0 0 1 0 79.49 122.75 A 14.0 14.0 0 1 0 107.49 122.75 Z" fill="url(#grad-gear-black-3d)" stroke="#64748B" strokeWidth="0.7" strokeOpacity="0.6" fillRule="evenodd" />
                  <circle cx="93.49" cy="122.75" r="22.5" stroke="#94A3B8" strokeWidth="0.9" strokeOpacity="0.35" strokeDasharray="2 3" fill="none" />
                  <circle cx="93.49" cy="122.75" r="17.0" stroke="#020617" strokeWidth="1.2" strokeOpacity="0.8" fill="none" />
                  <circle cx="93.49" cy="122.75" r="14.0" fill="url(#grad-gear-hub)" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 93.49 122.75"
                    to="-360 93.49 122.75"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </g>

                {/* 4. BÁNH RĂNG MÀU XANH DƯƠNG (PHẢI - SAPPHIRE 3D ĂN KHỚP CHUẨN XÁC - QUAY THUẬN CHIỀU 12s) */}
                <g filter="url(#gear3d-shadow)">
                  <path d="M 183.04 112.56 A 26.0 26.0 0 0 1 182.26 114.81 L 189.47 121.63 A 35.4 35.4 0 0 1 187.06 125.59 L 177.69 122.33 A 26.0 26.0 0 0 1 176.04 124.06 A 26.0 26.0 0 0 1 174.25 125.62 L 177.07 135.13 A 35.4 35.4 0 0 1 173.01 137.36 L 166.52 129.85 A 26.0 26.0 0 0 1 164.24 130.52 A 26.0 26.0 0 0 1 161.90 130.98 L 159.59 140.63 A 35.4 35.4 0 0 1 154.96 140.52 L 153.10 130.78 A 26.0 26.0 0 0 1 150.78 130.21 A 26.0 26.0 0 0 1 148.53 129.44 L 141.71 136.65 A 35.4 35.4 0 0 1 137.75 134.24 L 141.01 124.87 A 26.0 26.0 0 0 1 139.28 123.22 A 26.0 26.0 0 0 1 137.72 121.43 L 128.21 124.25 A 35.4 35.4 0 0 1 125.98 120.19 L 133.49 113.70 A 26.0 26.0 0 0 1 132.82 111.42 A 26.0 26.0 0 0 1 132.36 109.08 L 122.71 106.77 A 35.4 35.4 0 0 1 122.82 102.14 L 132.56 100.28 A 26.0 26.0 0 0 1 133.13 97.96 A 26.0 26.0 0 0 1 133.90 95.71 L 126.69 88.89 A 35.4 35.4 0 0 1 129.10 84.93 L 138.47 88.19 A 26.0 26.0 0 0 1 140.12 86.46 A 26.0 26.0 0 0 1 141.91 84.90 L 139.09 75.39 A 35.4 35.4 0 0 1 143.15 73.16 L 149.64 80.67 A 26.0 26.0 0 0 1 151.92 80.00 A 26.0 26.0 0 0 1 154.26 79.54 L 156.57 69.89 A 35.4 35.4 0 0 1 161.20 70.00 L 163.06 79.74 A 26.0 26.0 0 0 1 165.38 80.31 A 26.0 26.0 0 0 1 167.63 81.08 L 174.45 73.87 A 35.4 35.4 0 0 1 178.41 76.28 L 175.15 85.65 A 26.0 26.0 0 0 1 176.88 87.30 A 26.0 26.0 0 0 1 178.44 89.09 L 187.95 86.27 A 35.4 35.4 0 0 1 190.18 90.33 L 182.67 96.82 A 26.0 26.0 0 0 1 183.34 99.10 A 26.0 26.0 0 0 1 183.80 101.44 L 193.45 103.75 A 35.4 35.4 0 0 1 193.34 108.38 L 183.60 110.24 A 26.0 26.0 0 0 1 183.04 112.56 Z M 171.27 109.19 A 14.0 14.0 0 1 0 143.27 109.19 A 14.0 14.0 0 1 0 171.27 109.19 Z" fill="url(#grad-gear-blue-3d)" stroke="#BAE6FD" strokeWidth="0.7" strokeOpacity="0.6" fillRule="evenodd" />
                  <circle cx="157.27" cy="109.19" r="22.5" stroke="#E0F2FE" strokeWidth="0.9" strokeOpacity="0.4" strokeDasharray="3 3" fill="none" />
                  <circle cx="157.27" cy="109.19" r="17.0" stroke="#075985" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                  <circle cx="157.27" cy="109.19" r="14.0" fill="url(#grad-gear-hub)" />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 157.27 109.19"
                    to="360 157.27 109.19"
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
