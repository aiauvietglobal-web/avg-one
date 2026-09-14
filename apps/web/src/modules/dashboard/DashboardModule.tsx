import React from 'react';
import { BarChart3, Users, LayoutGrid, FileText, CheckCircle2, TrendingUp, ShieldCheck, PieChart, Layers } from 'lucide-react';

export const DashboardModule: React.FC = () => {
  return (
    <div className="dashboard-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* MAIN CONTAINER CONTENT */}
      <div className="w-full h-full flex flex-col space-y-3.5 relative z-10 overflow-hidden">

        {/* 🔮 TOP BANNER EXECUTIVE DASHBOARD WITH SLOGAN BOX BADGE & BRUSH STROKE */}
        <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Slogan Badge Box */}
            <div className="space-y-2 text-left">
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="dash-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                    stroke="url(#dash-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>
                <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  <BarChart3 className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>AVG EXECUTIVE DASHBOARD</span>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                  <span>BÁO CÁO</span>
                  <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                    <span className="relative z-10">QUẢN TRỊ HỢP NHẤT</span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                    </svg>
                  </span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Tổng quan vận hành, tiến độ đơn hàng R&D & ngân sách Tập đoàn
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Vận hành 20 Users • Realtime Sync</span>
            </div>

          </div>
        </div>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đơn hàng / Đơn việc</span>
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <LayoutGrid className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">12 Đơn hàng</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 80% Đảm bảo tiến độ R&D
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đề xuất chờ duyệt</span>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">3 Đề xuất</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Thời gian duyệt trung bình 1.2 giờ
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nhân sự Active</span>
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">20 / 20 Nhân sự</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 mt-1">
                  ● 100% Hoạt động đợt 1
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến độ OKRs Q3</span>
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <PieChart className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">75% Hoàn thành</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Đúng lộ trình chiến lược
                </div>
              </div>
            </div>
          </div>

          {/* Main Analytics Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Department Performance */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" /> Tỷ Lệ Hoàn Thành Theo Phòng Ban (R&D / Thiết Kế / Pháp Lý)
                </h3>
                <span className="text-xs text-slate-400">Cập nhật tháng 8/2026</span>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Phòng 3.1 - RDI (Nghiên cứu & Phát triển Mô-đun AI Sensor)</span>
                    <span className="text-blue-600 font-extrabold">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-md overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-md" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Phòng 3.2 - THIẾT KẾ (Kiểu dáng 3D & Vỏ hộp AVG-X)</span>
                    <span className="text-purple-600 font-extrabold">70%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-md overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-md" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Phòng 6 - PHÁP LÝ (Bảo hộ Thương hiệu & Đăng ký SHTT)</span>
                    <span className="text-amber-600 font-extrabold">60%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-md overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-md" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: System Status */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base border-b border-slate-100 dark:border-slate-800 pb-3">
                Trạng Thái Hạ Tầng 20 Users
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-emerald-800 dark:text-emerald-300">PostgreSQL Database</div>
                    <div className="text-emerald-600 dark:text-emerald-400 text-[11px]">Connected • Cloud Supabase</div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-md bg-emerald-500 animate-pulse" />
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-blue-800 dark:text-blue-300">File Storage (Cloudflare R2)</div>
                    <div className="text-blue-600 dark:text-blue-400 text-[11px]">0$ Egress Fee • Ready</div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-md bg-blue-500 animate-pulse" />
                </div>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-purple-800 dark:text-purple-300">Daily Backup Engine</div>
                    <div className="text-purple-600 dark:text-purple-400 text-[11px]">Auto Daily Dump Enabled</div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-md bg-purple-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
