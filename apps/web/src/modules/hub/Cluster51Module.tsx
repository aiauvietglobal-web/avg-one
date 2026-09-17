import React, { useState } from 'react';
import {
  Inbox, Rocket, Home, Lightbulb, Sparkles, Search, Filter, Plus,
  CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck, Activity,
  Boxes, AlertCircle, Check, Eye, Download, Send, RefreshCw, ChevronRight,
  Package, Users, BarChart3, Layers
} from 'lucide-react';

interface Cluster51ModuleProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Cluster51Module: React.FC<Cluster51ModuleProps> = ({
  activeTab,
  onSelectTab
}) => {
  // Mặc định là 'home' (Trang chủ Cụm 5.1) nếu tab rỗng hoặc không thuộc danh sách
  const currentKey = ['home', 'pilot51b', 'acceptance51t'].includes(activeTab) ? activeTab : 'home';

  const handleBoxSelect = (boxId: string) => {
    onSelectTab(boxId);
    window.dispatchEvent(new CustomEvent('hub_tab_change', {
      detail: { module: 'cluster51', tab: boxId }
    }));
  };

  // Toast thông báo tương tác nhanh
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  /* ========================================================================= */
  /* 📦 1. DỮ LIỆU ĐỘC LẬP CHO ĐẦU MỐI 5.1B ĐẦU VÀO                            */
  /* ========================================================================= */
  const [orders51B, setOrders51B] = useState([
    {
      id: 'DH-2026-B51-001',
      title: 'Thí điểm Mạch Cảm Biến AI Telemetry',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'TRỌNG ĐIỂM',
      lead: 'Bà Bích',
      status: 'Đang Khảo Sát',
      date: '16/08/2026',
      sla: '24 Giờ'
    },
    {
      id: 'DH-2026-B51-002',
      title: 'Đơn hàng Đề xuất Thử nghiệm Bo mạch Smart Meter',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'KHẨN CẤP',
      lead: 'Tài chính 5.1',
      status: 'Chờ Duyệt Cấp',
      date: '15/08/2026',
      sla: '48 Giờ'
    },
    {
      id: 'DH-2026-B51-003',
      title: 'Hồ sơ Thí điểm Cảm biến Áp suất Khí nén IoT',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'TIÊU CHUẨN',
      lead: 'KS. Minh Hải',
      status: 'Đã Tiếp Nhận',
      date: '14/08/2026',
      sla: '72 Giờ'
    },
    {
      id: 'DH-2026-B51-004',
      title: 'Biên bản Kết luận (VBKL) Thử nghiệm Hệ thống Cảnh báo Sớm',
      step: 'Bước 13: VBKL',
      priority: 'HOÀN TẤT',
      lead: 'Bà Bích',
      status: 'Đã Ký Duyệt',
      date: '12/08/2026',
      sla: 'Đã Đóng'
    }
  ]);

  /* ========================================================================= */
  /* 🚀 2. DỮ LIỆU ĐỘC LẬP CHO ĐẦU MỐI 5.1T ĐẦU RA                            */
  /* ========================================================================= */
  const [orders51T, setOrders51T] = useState([
    {
      id: 'DH-2026-51T-088',
      title: 'Vận chuyển Lô 50 Bộ Thiết Bị AVG-Grid sang Nhà máy',
      step: 'Bước 11: Đóng Gói',
      priority: 'KHẨN CẤP',
      lead: '5.1T Điều Phối',
      status: 'Đang Giao Vận',
      date: '16/08/2026',
      sla: '12 Giờ'
    },
    {
      id: 'DH-2026-51T-089',
      title: 'Đóng thùng & Niêm phong Kiểm chuẩn Lô Bo Mạch Nguồn',
      step: 'Bước 11: Đóng Gói',
      priority: 'TRỌNG ĐIỂM',
      lead: 'Tổ Đóng Gói',
      status: 'Đang Niêm Phong',
      date: '15/08/2026',
      sla: '24 Giờ'
    },
    {
      id: 'DH-2026-51T-090',
      title: 'Xuất xưởng Đợt 2 Modul Truyền Tin LoRa Cụm #K',
      step: 'Bước 11: Đóng Gói',
      priority: 'TIÊU CHUẨN',
      lead: 'Kho Xuất',
      status: 'Đã Bàn Giao Kho',
      date: '14/08/2026',
      sla: '36 Giờ'
    },
    {
      id: 'DH-2026-51T-091',
      title: 'Nghiệm thu Thực địa & Bàn giao Trạm Đo Năng Lượng',
      step: 'Bước 12: Nghiệm Thu',
      priority: 'TIỂU DỰ ÁN',
      lead: 'Kỹ sư Thực địa',
      status: 'Hoàn Tất 100%',
      date: '13/08/2026',
      sla: 'Hoàn Thành'
    }
  ]);

  /* ========================================================================= */
  /* 📦 CẤU HÌNH THẺ HỘP TRUY CẬP CỤM 5.1                                      */
  /* ========================================================================= */
  const BOXES_CONFIG = [
    {
      id: 'pilot51b',
      icon: Inbox,
      code: '5.1B',
      name: '5.1B ĐẦU VÀO',
      subTitle: 'Thí Điểm & Tiếp Nhận Đơn Hàng',
      tag: 'BƯỚC 1 • BƯỚC 13',
      badge: `${orders51B.length} Đơn Hàng`,
      bannerTitle: 'ĐẦU MỐI 5.1B ĐẦU VÀO (Thí Điểm & Tiếp Nhận Đơn Hàng)',
      bannerDesc: 'Đầu mối chịu trách nhiệm tiếp nhận nhu cầu, khảo sát sơ bộ, lập hồ sơ thí điểm (Bước 1) và nghiệm thu tổng kết VBKL (Bước 13).',
      leader: 'Bà Bích (Phụ trách B5.1)',
      role: 'Chủ trì Bước 1 & Bước 13 trong chuỗi SOP'
    },
    {
      id: 'acceptance51t',
      icon: Rocket,
      code: '5.1T',
      name: '5.1T ĐẦU RA',
      subTitle: 'Triển Khai & Nghiệm Thu Bàn Giao',
      tag: 'BƯỚC 11 • BƯỚC 12',
      badge: `${orders51T.length} Đơn Hàng`,
      bannerTitle: 'ĐẦU MỐI 5.1T ĐẦU RA (Triển Khai & Nghiệm Thu Bàn Giao)',
      bannerDesc: 'Đầu mối chịu trách nhiệm tổ chức đóng gói, xuất kho giao vận (Bước 11) và nghiệm thu thực địa tại công trình (Bước 12).',
      leader: 'Kỹ sư Trưởng 5.1T',
      role: 'Chủ trì Bước 11 & Bước 12 trong chuỗi SOP'
    }
  ];

  const currentBox = BOXES_CONFIG.find(b => b.id === currentKey) || BOXES_CONFIG[0];

  return (
    <div className={`w-full h-full flex-1 min-h-0 ${currentKey === 'home' ? 'bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden flex flex-col items-center justify-center' : 'overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4'}`}>

      {/* Toast thông báo nhanh */}
      {toastMsg && (
        <div className="fixed top-18 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-xs sm:text-sm font-bold shadow-2xl border border-sky-400/40 backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 dark:text-sky-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🏠 NẾU ĐANG Ở TRANG CHỦ CỤM 5.1 (currentKey === 'home')                   */}
      {/* ========================================================================= */}
      {currentKey === 'home' ? (
        <>
          {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

          {/* 🎨 AMBIENT GLOW ORBS */}
          <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
          <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
          <div className="absolute bottom-10 left-1/3 w-[550px] h-[300px] bg-gradient-to-tr from-sky-400/10 via-amber-400/10 to-orange-400/15 dark:from-sky-600/10 dark:to-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

          {/* Synchronized container matching Header alignment */}
          <div className="w-full px-3 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 sm:gap-14 lg:gap-16 relative z-10 py-8 sm:py-14">
            
            {/* Header Title Section */}
            <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                {/* SVG Clockwise Border Tracing Effect */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="cluster51-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                    stroke="url(#cluster51-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>

                <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-transparent text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  <Lightbulb className="w-4 h-4 text-[#00A8E8]" />
                  <span>TRUNG TÂM TIẾP NHẬN & BÀN GIAO CỤM 5.1</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline justify-center gap-2">
                <span>Tiếp Nhận &</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">Bàn Giao</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* 📦 BỘ CÁC HỘP THẺ TRUY CẬP CỤM 5.1 (BỐ CỤC 4 CỘT CHUẨN ĐỒNG BỘ 100% RDI & CỤM #K) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[1100px] mx-auto w-full pb-2">
              {BOXES_CONFIG.map((box) => {
                const IconComponent = box.icon;
                return (
                  <div
                    key={`home-box-${box.id}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleBoxSelect(box.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBoxSelect(box.id); }}
                    style={{ borderRadius: '26px' }}
                    className="group flex flex-col items-center justify-between py-3.5 sm:py-4 px-3 min-h-[110px] sm:min-h-[120px] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none animate-entrance-up"
                  >
                    {/* Hairline top glow on hover */}
                    <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Unified Blue Icon Badge */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
                      <IconComponent className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
                    </div>

                    {/* Tiêu đề & Subtitle */}
                    <div className="flex flex-col items-center w-full">
                      <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                        {box.name}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 whitespace-nowrap">
                        {box.subTitle}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* 2 THẺ PLACEHOLDER DỰ PHÒNG CHUẨN (ĐỒNG BỘ 100% PHÂN HỆ RDI) */}
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={`cluster51-placeholder-${idx}`}
                  style={{ borderRadius: '26px' }}
                  className="flex flex-col items-center justify-between py-3.5 sm:py-4 px-3 min-h-[110px] sm:min-h-[120px] bg-slate-50/60 dark:bg-slate-900/30 rounded-[26px] border border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none animate-entrance-up"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-1 bg-white/80 dark:bg-slate-800/40 shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 dark:text-slate-500 opacity-60" />
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-400/80 dark:text-slate-500 whitespace-nowrap leading-tight">
                      + Sắp phát hành
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* 📁 NẾU ĐANG Ở TRONG GIAO DIỆN CỦA TỪNG ĐẦU MỐI (currentKey !== 'home')    */
        /* ========================================================================= */
        <div className="space-y-4 animate-fade-in">
          {/* Thanh Chọn Đầu Mối & Nút Quay Lại Trang Chủ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => handleBoxSelect('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-[#0284C7] hover:text-white dark:bg-slate-800 dark:hover:bg-sky-500 text-slate-700 dark:text-slate-200 text-xs font-black transition-all cursor-pointer shadow-2xs"
              >
                <Home className="w-3.5 h-3.5" />
                <span>⬅️ Về Trang Chủ Cụm 5.1</span>
              </button>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">
                Nhấp vào đầu mối khác để chuyển không gian nghiệp vụ độc lập
              </span>
            </div>

            {/* Quick Switch Pills between 5.1B and 5.1T */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 max-w-lg">
              {BOXES_CONFIG.map((box) => {
                const isActive = currentKey === box.id;
                const IconComponent = box.icon;

                return (
                  <div
                    key={box.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleBoxSelect(box.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBoxSelect(box.id); }}
                    style={{ borderRadius: '18px' }}
                    className={`flex items-center gap-3 p-2.5 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#0284C7]/10 dark:bg-sky-950/50 border-[#0284C7] dark:border-sky-500 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-[#0284C7] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-black truncate ${
                        isActive ? 'text-[#0284C7] dark:text-sky-300' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {box.name}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {box.tag}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Banner Định Danh Đầu Mối Độc Lập */}
          <div className={`p-4 sm:p-6 rounded-2xl border shadow-sm ${
            currentKey === 'pilot51b'
              ? 'bg-gradient-to-r from-blue-900/90 via-slate-900 to-indigo-950 text-white border-blue-500/30'
              : 'bg-gradient-to-r from-orange-950/90 via-slate-900 to-amber-950 text-white border-orange-500/30'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  currentKey === 'pilot51b' ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300' : 'bg-orange-500/20 border border-orange-400/40 text-orange-300'
                }`}>
                  {currentKey === 'pilot51b' ? <Inbox className="w-7 h-7" /> : <Rocket className="w-7 h-7" />}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                      {currentBox.bannerTitle}
                    </h1>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      currentKey === 'pilot51b' ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40' : 'bg-orange-500/30 text-orange-200 border border-orange-400/40'
                    }`}>
                      {currentBox.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {currentBox.bannerDesc}
                  </p>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-white/10 text-center">
                  <div className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase">Cán bộ chủ trì</div>
                  <div className="text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5">
                    {currentBox.leader}
                  </div>
                </div>
                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-white/10 text-center">
                  <div className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase">Đơn hàng hiện hành</div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    {currentBox.badge}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Chỉ số KPI Tác nghiệp */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {currentKey === 'pilot51b' ? 'Đề xuất Mới Chờ Thẩm Định' : 'Đơn Chờ Đóng Gói Xuất Kho'}
              </div>
              <div className="text-xl font-black text-[#0284C7] dark:text-sky-400 mt-1">
                {currentKey === 'pilot51b' ? '4 Hồ Sơ' : '3 Lô Hàng'}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {currentKey === 'pilot51b' ? 'Đang Chạy Thử Nghiệm' : 'Đang Kiểm Thử Thực Địa'}
              </div>
              <div className="text-xl font-black text-amber-500 mt-1">
                {currentKey === 'pilot51b' ? '6 Dự Án' : '4 Công Trình'}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {currentKey === 'pilot51b' ? 'Biên Bản VBKL Đã Ký' : 'Nghiệm Thu Hoàn Tất'}
              </div>
              <div className="text-xl font-black text-emerald-500 mt-1">
                {currentKey === 'pilot51b' ? '18 Văn Bản' : '22 Đơn'}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Tỷ Lệ Tiến Độ SLA</div>
              <div className="text-xl font-black text-purple-500 mt-1">98.5%</div>
            </div>
          </div>

          {/* Danh sách Đơn hàng và Nhiệm vụ trực thuộc */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#F15A24]" />
                {currentKey === 'pilot51b' ? 'Danh Mục Đơn Hàng Thí Điểm Đầu Vào (5.1B)' : 'Danh Mục Đơn Hàng Giao Vận & Nghiệm Thu Đầu Ras (5.1T)'}
              </h2>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`⚡ ĐÃ ĐỒNG BỘ: Kết nối máy chủ dữ liệu Cụm 5.1 thành công!`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-500" />
                  <span>Đồng Bộ Google Sheet</span>
                </button>
              </div>
            </div>

            {/* Bảng dữ liệu Đơn hàng tác nghiệp */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-black">
                    <th className="py-2.5 px-3">Mã Đơn</th>
                    <th className="py-2.5 px-3">Tên Dự Án / Nội Dung</th>
                    <th className="py-2.5 px-3">Bước Quy Trình</th>
                    <th className="py-2.5 px-3">Mức Độ</th>
                    <th className="py-2.5 px-3">Người Phụ Trách</th>
                    <th className="py-2.5 px-3">Trạng Thái</th>
                    <th className="py-2.5 px-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold">
                  {currentKey === 'pilot51b' ? (
                    orders51B.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-[#0284C7] font-mono">{order.id}</td>
                        <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200 font-bold">{order.title}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                            {order.step}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            order.priority === 'TRỌNG ĐIỂM' ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' :
                            order.priority === 'KHẨN CẤP' ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400' :
                            order.priority === 'HOÀN TẤT' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' :
                            'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          }`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold">{order.lead}</td>
                        <td className="py-2.5 px-3">
                          <span className={`font-bold ${
                            order.status.includes('Đã') || order.status.includes('Ký') ? 'text-emerald-500' : 'text-amber-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => showToast(`⚡ ĐÃ PHÊ DUYỆT 1-CLICK: Đơn ${order.id} đã được xác nhận tiếp nhận!`)}
                            className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 text-[#0284C7] dark:text-sky-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                          >
                            Chi Tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    orders51T.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-orange-600 font-mono">{order.id}</td>
                        <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200 font-bold">{order.title}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 font-bold border border-orange-200 dark:border-orange-800">
                            {order.step}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            order.priority === 'TIỂU DỰ ÁN' ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400' :
                            order.priority === 'KHẨN CẤP' ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400' :
                            order.priority === 'TRỌNG ĐIỂM' ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' :
                            'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          }`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold">{order.lead}</td>
                        <td className="py-2.5 px-3">
                          <span className={`font-bold ${
                            order.status.includes('Hoàn Tất') || order.status.includes('Đã') ? 'text-emerald-500' : 'text-amber-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => showToast(`🚀 ĐÃ BÀN GIAO: Đơn ${order.id} đã cập nhật tiến độ giao vận & nghiệm thu!`)}
                            className="px-2.5 py-1 bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 dark:hover:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                          >
                            Giao Vận
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
