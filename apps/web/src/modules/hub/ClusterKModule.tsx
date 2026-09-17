import React, { useState } from 'react';
import {
  Building2, Hash, Cpu, Package, Award, Activity, Clock, ShieldCheck,
  CheckCircle2, FolderKanban, Check, AlertCircle, FileText, Download,
  ExternalLink, Sparkles, Filter, Search, Plus, Radio, Zap, Sliders,
  RefreshCw, Layers, ArrowRight, Eye, FileCheck, Coins, BookOpen, Send,
  Home, ChevronRight, Workflow, Target, BarChart3, Users, CheckCircle,
  HelpCircle, ArrowUpRight
} from 'lucide-react';

interface ClusterKModuleProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const ClusterKModule: React.FC<ClusterKModuleProps> = ({
  activeTab,
  onSelectTab
}) => {
  // Mặc định là 'home' (Trang chủ Cụm #K) nếu tab rỗng hoặc không thuộc danh sách
  const currentKey = ['home', 'kien', 'hash', 'k2t', 'k2b', 'k1'].includes(activeTab) ? activeTab : 'home';

  const handleBoxSelect = (boxId: string) => {
    onSelectTab(boxId);
    window.dispatchEvent(new CustomEvent('hub_tab_change', {
      detail: { module: 'clusterK', tab: boxId }
    }));
  };

  // Toast thông báo tương tác nội bộ
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Sub-tabs nội bộ cho từng giao diện độc lập
  const [kienSubTab, setKienSubTab] = useState<'proposals' | 'budget'>('proposals');
  const [hashSubTab, setHashSubTab] = useState<'qa_logs' | 'surveys'>('qa_logs');
  const [k2tSubTab, setK2tSubTab] = useState<'pcb_firmware' | 'lab_telemetry'>('pcb_firmware');
  const [k2bSubTab, setK2bSubTab] = useState<'kanban' | 'shipping'>('kanban');
  const [k1SubTab, setK1SubTab] = useState<'advisory' | 'standards'>('advisory');

  /* ========================================================================= */
  /* 📦 1. DỮ LIỆU ĐỘC LẬP CHO HỘP KIẾN (Chủ Trương & Duyệt Ngân Sách) */
  /* ========================================================================= */
  const [proposals, setProposals] = useState([
    {
      id: 'TT-2026-K01',
      title: 'Mua sắm linh kiện bo mẫu vi mạch Telemetry RF',
      creator: 'Kỹ sư Trưởng #K2T',
      amount: '185.000.000 ₫',
      category: 'R&D Vi Mạch',
      priority: 'KHẨN CẤP (P1)',
      status: 'PENDING',
      date: '15/08/2026'
    },
    {
      id: 'TT-2026-K02',
      title: 'Kinh phí đo kiểm khảo sát thực địa trạm đo năng lượng',
      creator: 'Phụ trách Kỹ Thuật #',
      amount: '45.000.000 ₫',
      category: 'Khảo Sát Thực Địa',
      priority: 'TRỌNG ĐIỂM',
      status: 'PENDING',
      date: '14/08/2026'
    },
    {
      id: 'TT-2026-K03',
      title: 'Dự toán bao bì đóng thùng xốp định hình 500 chiếc',
      creator: 'Điều phối #K2B',
      amount: '68.000.000 ₫',
      category: 'Đóng Gói Bàn Giao',
      priority: 'TIÊU CHUẨN',
      status: 'PENDING',
      date: '13/08/2026'
    },
    {
      id: 'TT-2026-K00',
      title: 'Dự toán khuôn mẫu 3D vỏ hộp nhôm Anodized',
      creator: 'Phòng Thiết Kế 3.2',
      amount: '120.000.000 ₫',
      category: 'Thiết Kế 3D',
      priority: 'TRỌNG ĐIỂM',
      status: 'APPROVED',
      date: '10/08/2026'
    }
  ]);

  const handleApproveProposal = (id: string, title: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
    showToast(`⚡ ĐÃ KÝ DUYỆT ĐIỆN TỬ 1-CLICK: Tờ trình ${id} (${title}) đã được Trưởng ban Kiến phê duyệt ngân sách!`);
  };

  /* ========================================================================= */
  /* 🔬 2. DỮ LIỆU ĐỘC LẬP CHO HỘP # (Khảo Sát & Đo Đạc QA/QC) */
  /* ========================================================================= */
  const [qaRecords] = useState([
    {
      id: 'QC-2026-H101',
      device: 'Bo Mạch Thu Phát Telemetry v3.2 (Lô 50 bo)',
      freq: '433 / 915 MHz',
      loss: '-0.8 dB (Chuẩn < -1.5 dB)',
      tester: 'Kỹ sư Đo Lường #',
      status: 'PASS',
      note: 'Tín hiệu ổn định 99.8%, đủ điều kiện xuất xưởng'
    },
    {
      id: 'QC-2026-H102',
      device: 'Bộ Lọc Nhiễu Sóng RF Công Nghiệp (Lô 30 chiếc)',
      freq: '2.4 GHz ISM Band',
      loss: '< -40 dBc (Nhiễu hài)',
      tester: 'Trưởng nhóm QA/QC',
      status: 'PASS',
      note: 'Triệt nhiễu nguồn xung đạt chuẩn EN 55032'
    },
    {
      id: 'QC-2026-H103',
      device: 'Mạch Nguồn Cách Ly DC-DC 24V/5V Chống Sét',
      freq: 'Dao động ±0.5%',
      loss: 'Nhiệt độ đầy tải 42°C',
      tester: 'Kỹ thuật viên Kiểm Chuẩn',
      status: 'TESTING',
      note: 'Đang chạy thử nghiệm liên tục 72 giờ tại phòng Lab'
    },
    {
      id: 'QC-2026-H104',
      device: 'Cụm Cảm Biến Áp Suất & Lưu Lượng Khí Nén',
      freq: 'Độ nhạy 0.05 bar',
      loss: 'Sai số < 0.1% FS',
      tester: 'Kỹ sư QA Thực địa',
      status: 'PASS',
      note: 'Đã niêm phong tem kiểm định chống nước IP67'
    }
  ]);

  /* ========================================================================= */
  /* 💻 3. DỮ LIỆU ĐỘC LẬP CHO HỘP #K2T (Kỹ Thuật R&D & Thực Nghiệm Vi Mạch) */
  /* ========================================================================= */
  const [pcbBoards, setPcbBoards] = useState([
    {
      id: 'PCB-K2T-01',
      name: 'Bo Điều Khiển Trung Tâm MCU-K2T',
      mcu: 'STM32H743VIT6 (480 MHz ARM Cortex-M7)',
      firmware: 'v2.4.1 (Mesh Protocol)',
      status: 'STABLE',
      lastFlash: '15/08/2026 10:30'
    },
    {
      id: 'PCB-K2T-02',
      name: 'Bo Thu Phát RF Telemetry LoRa Range',
      mcu: 'Semtech SX1262 + Cortex-M4',
      firmware: 'v1.8.0 (Low-Power Sync)',
      status: 'TESTING',
      lastFlash: '14/08/2026 16:45'
    },
    {
      id: 'PCB-K2T-03',
      name: 'Module Quản Lý Nguồn BMS Pin LiFePO4',
      mcu: 'TI BQ76952 Smart Monitor',
      firmware: 'v1.1.2 (Active Balancing)',
      status: 'STABLE',
      lastFlash: '12/08/2026 09:15'
    },
    {
      id: 'PCB-K2T-04',
      name: 'Cụm Cảm Biến Môi Trường IoT Multi-Sensor',
      mcu: 'ESP32-S3 Dual-Core (Wi-Fi/BLE)',
      firmware: 'v2.0.4-rc (Fix Memory Leak)',
      status: 'DEBUG',
      lastFlash: '15/08/2026 14:10'
    }
  ]);

  const handleFlashFirmware = (boardId: string, name: string) => {
    setPcbBoards(prev => prev.map(b => b.id === boardId ? { ...b, status: 'STABLE', lastFlash: 'Vừa xong' } : b));
    showToast(`⚡ ĐÃ NẠP ROM FIRMWARE THÀNH CÔNG: Bo mạch ${name} đã cập nhật bản build mới nhất.`);
  };

  /* ========================================================================= */
  /* 📦 4. DỮ LIỆU ĐỘC LẬP CHO HỘP #K2B (Điều Hành Tác Nghiệp Dự Án & SLA) */
  /* ========================================================================= */
  const [kanbanTasks] = useState({
    todo: [
      { id: 'T1', title: 'Lên lịch đóng gói 50 bộ vỏ nhôm CNC anodized', sla: 'Hôm nay', priority: 'P1' },
      { id: 'T2', title: 'Chuẩn bị tem niêm phong QR code lô số 14', sla: 'Ngày mai', priority: 'P2' },
      { id: 'T3', title: 'Liên hệ xe vận chuyển nội bộ nhận bàn giao vỏ hộp', sla: '18/08', priority: 'P3' }
    ],
    inProgress: [
      { id: 'T4', title: 'Tổng hợp nhật ký tác nghiệp dự án Trạm Đo Năng Lượng', owner: 'Điều phối viên #K2B', progress: '75%' },
      { id: 'T5', title: 'Kiểm đếm số lượng phụ kiện ốc vít & gioăng chống nước', owner: 'Tổ kho #K2B', progress: '90%' },
      { id: 'T6', title: 'Đóng gói quy chuẩn thùng gỗ 50 bộ Telemetry', owner: 'Tổ đóng gói', progress: '60%' }
    ],
    done: [
      { id: 'T7', title: 'Nghiệm thu bàn giao lô 100 vi mạch nguồn cho 5.1T', code: 'BB-2026-BG01', date: '14/08' },
      { id: 'T8', title: 'Hoàn tất dán tem kiểm định QA/QC cho 30 bộ lọc nhiễu', code: 'BB-2026-BG02', date: '13/08' },
      { id: 'T9', title: 'Cập nhật tiến độ thực thi liên thông lên AVG One', code: 'SYS-SYNC', date: '12/08' }
    ]
  });

  /* ========================================================================= */
  /* 🔰 5. DỮ LIỆU ĐỘC LẬP CHO HỘP #K1 (Cố Vấn & Kiểm Chuẩn Công Nghệ) */
  /* ========================================================================= */
  const [advisoryMemos] = useState([
    {
      id: 'CV-2026-01',
      title: 'Tư vấn phương án giảm suy hao sóng RF trên vỏ hợp kim nhôm',
      expert: 'Trưởng ban Cụm #K1',
      solution: 'Đề xuất mở cửa sổ phi kim composite 25x40mm tại vị trí ăng-ten ngầm, mạ sơn chống nhiễu mặt trong.',
      level: 'KHUYẾN NGHỊ CAO',
      status: 'ĐÃ ÁP DỤNG'
    },
    {
      id: 'CV-2026-02',
      title: 'Phản biện sơ đồ tản nhiệt thụ động cho vi mạch STM32H7 trong môi trường kín',
      expert: 'Chuyên gia Nhiệt Lab #K1',
      solution: 'Gia tăng diện tích pad đồng tản nhiệt đáy bo 2.5mm, bổ sung đệm silicone dẫn nhiệt 6W/mK nối vỏ nhôm.',
      level: 'TRỌNG YẾU',
      status: 'ĐÃ PHÊ DUYỆT'
    },
    {
      id: 'CV-2026-03',
      title: 'Rà soát hồ sơ tuân thủ tiêu chuẩn an toàn điện IEC 62368-1',
      expert: 'Tổ Kiểm Chuẩn Quốc Tế #K1',
      solution: 'Bổ sung cầu chì tự phục hồi PPTC 2A và varistor MOV 275V tại đầu vào AC-DC bảo vệ sốc điện.',
      level: 'TIÊU CHUẨN',
      status: 'ĐẠT CHUẨN'
    },
    {
      id: 'CV-2026-04',
      title: 'Tư vấn cách trình bày văn bản kỹ thuật & hợp đồng hợp tác công nghệ',
      expert: 'Hội đồng Cố Vấn #K1',
      solution: 'Thống nhất chuẩn biểu mẫu hồ sơ song ngữ Việt - Anh, chuẩn hóa điều khoản bảo mật mã nguồn firmware.',
      level: 'HÀNH CHÍNH',
      status: 'HOÀN THÀNH'
    }
  ]);

  /* ========================================================================= */
  /* 📦 CẤU HÌNH THẺ 5 HỘP ĐỘC LẬP CỦA CỤM #K */
  /* ========================================================================= */
  const BOXES_CONFIG = [
    {
      id: 'kien',
      icon: Building2,
      code: 'KIẾN',
      name: 'HỘP KIẾN',
      subTitle: 'Chủ Trương & Ngân Sách',
      tag: 'BƯỚC 2 • BƯỚC 7',
      badge: `${proposals.filter(p => p.status === 'PENDING').length} Chờ Duyệt`,
      badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
      bannerTitle: 'ĐẦU MỐI KIẾN (Điều Hành Chủ Trương & Duyệt Ngân Sách)',
      bannerDesc: 'Đánh giá tính khả thi, phân bổ đầu mối chủ trì và cấp hạn mức ngân sách thực thi; chốt mẫu chi phí sản xuất.',
      leader: 'Trưởng ban Kiến',
      role: 'Chủ trì Bước 2 & Bước 7 trong chuỗi 13 SOP',
      gradient: 'from-amber-900/90 via-slate-900 to-yellow-950 border-amber-500/30'
    },
    {
      id: 'hash',
      icon: Hash,
      code: '# (HASH)',
      name: 'HỘP # (HASH)',
      subTitle: 'Khảo Sát & Đo Đạc QA/QC',
      tag: 'BƯỚC 3 • BƯỚC 10',
      badge: `${qaRecords.length} Lô QA/QC`,
      badgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
      bannerTitle: 'ĐẦU MỐI # (Khảo Sát Kỹ Thuật & Đo Đạc QA/QC)',
      bannerDesc: 'Khảo sát lập thông số kỹ thuật thực địa (Bước 3) và đo đạc kiểm định QA/QC chất lượng nghiêm ngặt trước khi xuất xưởng (Bước 10).',
      leader: 'Phụ trách Kỹ Thuật #',
      role: 'Chủ trì Bước 3 & Bước 10 trong chuỗi 13 SOP',
      gradient: 'from-purple-900/90 via-slate-900 to-indigo-950 border-purple-500/30'
    },
    {
      id: 'k2t',
      icon: Cpu,
      code: '#K2T',
      name: 'HỘP #K2T',
      subTitle: 'Vi Mạch R&D & Firmware',
      tag: 'LAB • THỰC ĐỊA',
      badge: `${pcbBoards.length} Bo Mạch`,
      badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
      bannerTitle: 'ĐẦU MỐI #K2T (Kỹ Thuật R&D & Thực Nghiệm Vi Mạch)',
      bannerDesc: 'Trực tiếp nghiên cứu thiết kế vi mạch phần cứng, lập trình firmware vi xử lý, thử nghiệm phòng Lab và đo đạc ổn định thực địa.',
      leader: 'Kỹ sư Trưởng #K2T',
      role: 'Nghiên cứu nguyên lý vi mạch, firmware & Lab',
      gradient: 'from-cyan-900/90 via-slate-900 to-blue-950 border-cyan-500/30'
    },
    {
      id: 'k2b',
      icon: Package,
      code: '#K2B',
      name: 'HỘP #K2B',
      subTitle: 'Tác Nghiệp & Đóng Gói',
      tag: 'ĐIỀU PHỐI • SLA',
      badge: '9 Tiểu Dự Án',
      badgeColor: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800',
      bannerTitle: 'ĐẦU MỐI #K2B (Điều Hành Tác Nghiệp Dự Án)',
      bannerDesc: 'Điều phối thực thi các tiểu dự án thuộc Cụm #K, bám sát tiến độ cam kết SLA, đóng gói quy chuẩn và liên thông bàn giao cho 5.1T.',
      leader: 'Điều phối viên #K2B',
      role: 'Điều phối tiến độ, nhật ký & đóng gói bàn giao',
      gradient: 'from-violet-900/90 via-slate-900 to-purple-950 border-violet-500/30'
    },
    {
      id: 'k1',
      icon: Award,
      code: '#K1',
      name: 'HỘP #K1',
      subTitle: 'Cố Vấn & Kiểm Chuẩn',
      tag: 'HỢP CHUẨN • PHẢN BIỆN',
      badge: `${advisoryMemos.length} Hồ Sơ`,
      badgeColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
      bannerTitle: 'ĐẦU MỐI #K1 (Cố Vấn & Kiểm Chuẩn Công Nghệ)',
      bannerDesc: 'Cố vấn chuyên sâu về giải pháp công nghệ, rà soát tính hợp chuẩn, tối ưu hóa kiến trúc bo mạch & kiểu dáng công nghiệp.',
      leader: 'Trưởng ban Cụm #K1',
      role: 'Cố vấn kỹ thuật chuyên sâu & rà soát tiêu chuẩn',
      gradient: 'from-indigo-900/90 via-slate-900 to-slate-950 border-indigo-500/30'
    }
  ];

  const currentBox = BOXES_CONFIG.find(b => b.id === currentKey) || BOXES_CONFIG[0];

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4">

      {/* Toast thông báo nhanh */}
      {toastMsg && (
        <div className="fixed top-18 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-xs sm:text-sm font-bold shadow-2xl border border-sky-400/40 backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 dark:text-sky-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🏠 NẾU ĐANG Ở TRANG CHỦ CỤM #K (currentKey === 'home')                     */}
      {/* ========================================================================= */}
      {currentKey === 'home' ? (
        <div className="space-y-5 animate-fade-in">
          {/* 📦 BỘ 5 HỘP ĐỘC LẬP PHÂN HỆ CỤM #K */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
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
                    className="group flex flex-col justify-between p-4 min-h-[190px] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 relative overflow-hidden cursor-pointer select-none text-left"
                  >
                    {/* Hairline top glow on hover */}
                    <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Row: Icon Badge + Counter Badge */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center text-[#0284C7] dark:text-sky-400 group-hover:scale-110 shadow-2xs transition-transform shrink-0">
                        <IconComponent className="w-5.5 h-5.5 stroke-[2.2]" />
                      </div>
                      <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full border ${box.badgeColor}`}>
                        {box.badge}
                      </span>
                    </div>

                    {/* Middle: Title, Subtitle, Description */}
                    <div className="space-y-1 my-1">
                      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors leading-tight">
                        {box.name}
                      </h3>
                      <div className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        {box.tag}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
                        {box.subTitle}
                      </p>
                    </div>

                    {/* Bottom: Leader + Enter Action */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate max-w-[100px]">
                        {box.leader}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-black text-[#0284C7] dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
                        Vào Hộp <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>


          {/* NHẬT KÝ HOẠT ĐỘNG LIÊN THÔNG TOÀN CỤM #K */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                  NHẬT KÝ ĐIỀU HÀNH THỜI GIAN THỰC (REALTIME CỤM #K)
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Đang trực tuyến 24/7
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">Trưởng ban Kiến</span>
                  <span className="text-slate-500">vừa ký duyệt 1-click Tờ trình dự toán linh kiện TT-2026-K00 (120 tr ₫)</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">10 phút trước</span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">Kỹ sư Trưởng #K2T</span>
                  <span className="text-slate-500">đã nạp thành công bản build Firmware v2.4.1 lên 50 bo mạch Telemetry</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">25 phút trước</span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">Kỹ thuật #</span>
                  <span className="text-slate-500">hoàn tất đo kiểm định QA/QC lô 50 thiết bị, đạt chuẩn suy hao -0.8 dB</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">1 giờ trước</span>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">Điều phối #K2B</span>
                  <span className="text-slate-500">ký bàn giao biên bản đóng gói BB-2026-BG01 cho đầu mối 5.1T</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">2 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 📁 NẾU ĐANG Ở TRONG GIAO DIỆN CỦA TỪNG HỘP (currentKey !== 'home')          */
        /* ========================================================================= */
        <div className="space-y-4 animate-fade-in">
          {/* Thanh Chọn Hộp & Nút Quay Lại Trang Chủ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => handleBoxSelect('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-[#0284C7] hover:text-white dark:bg-slate-800 dark:hover:bg-sky-500 text-slate-700 dark:text-slate-200 text-xs font-black transition-all cursor-pointer shadow-2xs"
              >
                <Home className="w-3.5 h-3.5" />
                <span>⬅️ Về Trang Chủ Cụm #K</span>
              </button>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">
                Nhấp vào hộp khác để chuyển không gian nghiệp vụ độc lập
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 w-full">
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
                    style={{ borderRadius: '26px' }}
                    className={`group flex flex-col items-center justify-between py-3 sm:py-3.5 px-2.5 min-h-[110px] sm:min-h-[120px] backdrop-blur-xl rounded-[26px] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none ${
                      isActive
                        ? 'border-2 border-[#0284C7] dark:border-sky-400 ring-2 ring-sky-400/30 shadow-lg shadow-sky-500/15 bg-gradient-to-b from-sky-200/80 via-sky-100/50 to-white dark:from-sky-900/80 dark:via-slate-900 dark:to-slate-900 -translate-y-1'
                        : 'border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1'
                    }`}
                  >
                    {/* Hairline top glow */}
                    <div className={`absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                    {/* Micro badge top-right */}
                    <div className="absolute top-2 right-2.5">
                      <span className={`text-[8.5px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-md border ${box.badgeColor}`}>
                        {box.badge}
                      </span>
                    </div>

                    {/* Unified Blue Icon Badge */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-all duration-300 shrink-0 shadow-2xs ${
                      isActive
                        ? 'bg-[#0284C7] text-white shadow-xs shadow-sky-500/40 border border-sky-300 dark:border-sky-400'
                        : 'bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 text-[#0284C7] dark:text-sky-400'
                    }`}>
                      <IconComponent className={`w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2] group-hover:scale-105 transition-transform ${isActive ? 'text-white' : 'text-[#0284C7] dark:text-sky-400'}`} />
                    </div>

                    {/* Tiêu đề & Micro Tag */}
                    <div className="flex flex-col items-center w-full space-y-0.5 mt-0.5">
                      <h3 className={`text-xs sm:text-[12.5px] font-black tracking-tight leading-tight whitespace-nowrap transition-colors ${
                        isActive ? 'text-[#0284C7] dark:text-sky-300 font-black' : 'text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7]'
                      }`}>
                        {box.name}
                      </h3>
                      <span className={`text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                        isActive ? 'text-sky-700 dark:text-sky-300' : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-600'
                      }`}>
                        {box.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BANNER ĐỊNH DANH HỘP HIỆN TẠI */}
          <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm bg-gradient-to-r ${currentBox.gradient} text-white transition-all duration-300`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-white/10 border border-white/20">
                  <currentBox.icon className="w-6.5 h-6.5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-lg sm:text-xl font-black tracking-tight">
                      {currentBox.bannerTitle}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/20 text-white border border-white/30">
                      {currentBox.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                    {currentBox.bannerDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center">
                  <div className="text-[9.5px] text-slate-300 font-bold uppercase">Cán bộ chủ trì</div>
                  <div className="text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5">{currentBox.leader}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center">
                  <div className="text-[9.5px] text-slate-300 font-bold uppercase">Vai trò 13 SOP</div>
                  <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">{currentBox.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* GIAO DIỆN 1: HỘP KIẾN */}
          {currentKey === 'kien' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 uppercase">
                    <Coins className="w-4 h-4" /> Hạn Mức Ngân Sách Cấp Cụm #K
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">2.450.000.000 ₫</div>
                  <p className="text-xs text-slate-500 mt-1">Đã giải ngân 65% theo đúng tiến độ kế hoạch</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <FileCheck className="w-4 h-4" /> Tờ Trình Chờ Ký Duyệt
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                    {proposals.filter(p => p.status === 'PENDING').length} Tờ Trình
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Chờ Trưởng ban Kiến duyệt ngân sách 1-click</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <ShieldCheck className="w-4 h-4" /> Tỷ Lệ Giải Ngân SLA
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">98.5% Đạt</div>
                  <p className="text-xs text-slate-500 mt-1">Tuân thủ hạn mức thẩm định Bước 2 & Bước 7</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setKienSubTab('proposals')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        kienSubTab === 'proposals'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📋 Tờ Trình Ngân Sách Chờ Ký Duyệt ({proposals.filter(p => p.status === 'PENDING').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setKienSubTab('budget')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        kienSubTab === 'budget'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      💰 Phân Bổ Định Mức Tài Chính 13 SOP
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('✨ Đã mở biểu mẫu lập Tờ Trình Đề Xuất Ngân Sách mới!')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Tạo Tờ Trình Ngân Sách
                  </button>
                </div>

                {kienSubTab === 'proposals' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Mã Tờ Trình</th>
                          <th className="py-2.5 px-3">Hạng Mục Đề Xuất</th>
                          <th className="py-2.5 px-3">Người Đề Xuất</th>
                          <th className="py-2.5 px-3">Dự Toán Ngân Sách</th>
                          <th className="py-2.5 px-3">Ưu Tiên</th>
                          <th className="py-2.5 px-3">Trạng Thái</th>
                          <th className="py-2.5 px-3 text-right">Thao Tác Duyệt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {proposals.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-3 font-mono font-black text-amber-600 dark:text-amber-400">{item.id}</td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-800 dark:text-slate-200">{item.title}</div>
                              <div className="text-[10px] text-slate-400">{item.category} • Ngày {item.date}</div>
                            </td>
                            <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">{item.creator}</td>
                            <td className="py-3 px-3 font-black text-slate-900 dark:text-white text-[13px]">{item.amount}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                item.priority.includes('KHẨN CẤP')
                                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              }`}>
                                {item.priority}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              {item.status === 'APPROVED' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                                  <CheckCircle2 className="w-3 h-3" /> ĐÃ DUYỆT (1-Click)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse">
                                  <Clock className="w-3 h-3" /> CHỜ PHÊ DUYỆT
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              {item.status === 'PENDING' ? (
                                <button
                                  type="button"
                                  onClick={() => handleApproveProposal(item.id, item.title)}
                                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs hover:shadow-amber-500/30 transition-all cursor-pointer"
                                >
                                  ⚡ Ký Duyệt 1-Click
                                </button>
                              ) : (
                                <span className="text-[11px] font-bold text-slate-400">Đã chốt ngân sách</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Đầu Mối #K2T (R&D Vi Mạch)</div>
                      <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">1.100.000.000 ₫</div>
                      <div className="text-[10px] text-emerald-600 mt-1">Hạn mức chiếm 45% tổng Cụm #K</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Đầu Mối #K2B (Tác Nghiệp & Đóng Gói)</div>
                      <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">620.000.000 ₫</div>
                      <div className="text-[10px] text-emerald-600 mt-1">Hạn mức chiếm 25% tổng Cụm #K</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Đầu Mối # (Khảo Sát & QA/QC)</div>
                      <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">480.000.000 ₫</div>
                      <div className="text-[10px] text-emerald-600 mt-1">Hạn mức chiếm 20% tổng Cụm #K</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Đầu Mối #K1 (Cố Vấn & Kiểm Chuẩn)</div>
                      <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">250.000.000 ₫</div>
                      <div className="text-[10px] text-emerald-600 mt-1">Hạn mức chiếm 10% tổng Cụm #K</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GIAO DIỆN 2: HỘP # */}
          {currentKey === 'hash' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-600 dark:text-purple-400 uppercase">
                    <FileText className="w-4 h-4" /> Phiếu Khảo Sát Hiện Trường
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">8 Phiếu Hoàn Tất</div>
                  <p className="text-xs text-slate-500 mt-1">Lập thông số kỹ thuật thực địa chuẩn Bước 3</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <ShieldCheck className="w-4 h-4" /> Tỷ Lệ QA/QC Xuất Xưởng
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">100% ĐẠT CHUẨN</div>
                  <p className="text-xs text-slate-500 mt-1">Kiểm soát sóng RF & suy hao tín hiệu Bước 10</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <Radio className="w-4 h-4" /> Lô Bo Mạch Đang Đo Kiểm
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">4 Lô Thiết Bị</div>
                  <p className="text-xs text-slate-500 mt-1">Máy đo phổ tần số và buồng đo sóng hoạt động 24/7</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setHashSubTab('qa_logs')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        hashSubTab === 'qa_logs'
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      🔬 Biên Bản Kiểm Định QA/QC Lô Hàng ({qaRecords.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setHashSubTab('surveys')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        hashSubTab === 'surveys'
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📝 Nhật Ký Khảo Sát Hiện Trường (Bước 3)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('📋 Đã lập phiếu đo kiểm định QA/QC mẫu mới cho lô thiết bị!')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Tạo Biên Bản Đo QA/QC
                  </button>
                </div>

                {hashSubTab === 'qa_logs' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Mã Biên Bản</th>
                          <th className="py-2.5 px-3">Lô Thiết Bị Đo Kiểm</th>
                          <th className="py-2.5 px-3">Dải Tần Số / Điện Áp</th>
                          <th className="py-2.5 px-3">Độ Suy Hao / Sai Số</th>
                          <th className="py-2.5 px-3">Kỹ Sư Đo</th>
                          <th className="py-2.5 px-3">Kết Luận QA/QC</th>
                          <th className="py-2.5 px-3 text-right">Xuất Báo Cáo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {qaRecords.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-3 font-mono font-black text-purple-600 dark:text-purple-400">{item.id}</td>
                            <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">
                              {item.device}
                              <div className="text-[10px] font-normal text-slate-400 mt-0.5">{item.note}</div>
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">{item.freq}</td>
                            <td className="py-3 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{item.loss}</td>
                            <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{item.tester}</td>
                            <td className="py-3 px-3">
                              {item.status === 'PASS' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                                  <Check className="w-3 h-3" /> PASS 100%
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 animate-pulse">
                                  <Clock className="w-3 h-3" /> ĐANG ĐO (85%)
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => showToast(`📄 Đã xuất biên bản kiểm định kỹ thuật ${item.id} thành công!`)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 font-bold text-xs transition-colors"
                              >
                                <Download className="w-3 h-3" /> PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-100">Khảo sát trạm quan trắc năng lượng thực địa (KCN Tiên Sơn)</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">ĐÃ NGHIỆM THU BƯỚC 3</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Thông số: Nhiệt độ môi trường 38°C, độ ẩm 82%, khoảng cách thu phát trạm gốc 4.2 km không vật cản.</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-100">Khảo sát lắp đặt cụm cảm biến áp suất đường ống nhà máy</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">ĐÃ NGHIỆM THU BƯỚC 3</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Thông số: Áp suất định mức 10 bar, ren nối G1/2, tiêu chuẩn chống cháy nổ Zone 2.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GIAO DIỆN 3: HỘP #K2T */}
          {currentKey === 'k2t' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase">
                    <Cpu className="w-4 h-4" /> Dự Án Bo Mạch R&D
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">6 Thiết Kế PCB</div>
                  <p className="text-xs text-slate-500 mt-1">Mạch in nhiều lớp, trở kháng kiểm soát vi dải</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <Zap className="w-4 h-4" /> Bản Build Firmware Lab
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">v2.4.1 (Stable)</div>
                  <p className="text-xs text-slate-500 mt-1">Hỗ trợ giao thức truyền thông đa điểm Mesh RF</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <Activity className="w-4 h-4" /> Trạm Đo Kiểm 24/7
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">12/12 Trạm Online</div>
                  <p className="text-xs text-slate-500 mt-1">Giám sát dòng áp, nhiệt độ vi mạch phòng Lab</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setK2tSubTab('pcb_firmware')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        k2tSubTab === 'pcb_firmware'
                          ? 'bg-cyan-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      💻 Danh Mục Vi Mạch & Quản Lý Firmware ({pcbBoards.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setK2tSubTab('lab_telemetry')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        k2tSubTab === 'lab_telemetry'
                          ? 'bg-cyan-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📊 Giám Sát Trạm Đo Kiểm Phòng Lab 24/7
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('🔬 Đã mở cửa sổ khởi tạo Thiết Kế Bo Mạch Vi Xử Lý mới!')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Thêm Bo Mạch / Firmware
                  </button>
                </div>

                {k2tSubTab === 'pcb_firmware' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Mã Thiết Kế</th>
                          <th className="py-2.5 px-3">Tên Bo Mạch R&D</th>
                          <th className="py-2.5 px-3">Dòng Vi Xử Lý (MCU)</th>
                          <th className="py-2.5 px-3">Phiên Bản Firmware</th>
                          <th className="py-2.5 px-3">Trạng Thái ROM</th>
                          <th className="py-2.5 px-3 text-right">Thao Tác Nạp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {pcbBoards.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-3 font-mono font-black text-cyan-600 dark:text-cyan-400">{item.id}</td>
                            <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">
                              {item.name}
                              <div className="text-[10px] text-slate-400 font-normal">Nạp gần nhất: {item.lastFlash}</div>
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300 font-semibold">{item.mcu}</td>
                            <td className="py-3 px-3 font-mono font-bold text-[#0284C7] dark:text-sky-300">{item.firmware}</td>
                            <td className="py-3 px-3">
                              {item.status === 'STABLE' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                                  <CheckCircle2 className="w-3 h-3" /> ĐÃ NẠP STABLE
                                </span>
                              ) : item.status === 'TESTING' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 animate-pulse">
                                  <Clock className="w-3 h-3" /> ĐANG TEST LAB
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300">
                                  <AlertCircle className="w-3 h-3" /> DEBUG LỖI
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleFlashFirmware(item.id, item.name)}
                                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs shadow-xs transition-all cursor-pointer"
                              >
                                ⚡ Nạp Lại ROM
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Trạm Test Xung Nhịp RF #1</div>
                      <div className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-1">480.05 MHz</div>
                      <div className="text-[10px] text-emerald-600 mt-1">Sai số dao động &lt; 0.001%</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Trạm Test Nhiệt Độ 85°C</div>
                      <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">42.3°C Ổn Định</div>
                      <div className="text-[10px] text-slate-400 mt-1">Không hiện tượng sụt áp</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Trạm Test Tiêu Thụ Điện BMS</div>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">14.2 mA</div>
                      <div className="text-[10px] text-emerald-600 mt-1">Chế độ ngủ chỉ 8.5 µA</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Trạm Nạp Firmware Batch</div>
                      <div className="text-xl font-black text-[#0284C7] mt-1">50 Bo / Giờ</div>
                      <div className="text-[10px] text-slate-400 mt-1">Tự động verify mã checksum</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GIAO DIỆN 4: HỘP #K2B */}
          {currentKey === 'k2b' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-violet-600 dark:text-violet-400 uppercase">
                    <FolderKanban className="w-4 h-4" /> Tiểu Dự Án Đang Điều Phối
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">9 Dự Án Thực Thi</div>
                  <p className="text-xs text-slate-500 mt-1">Bám sát chỉ đạo điều hành C-Suite & ban giám đốc</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <Clock className="w-4 h-4" /> Tỷ Lệ Cam Kết Đúng SLA
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">96.8% Đúng Hạn</div>
                  <p className="text-xs text-slate-500 mt-1">Đảm bảo liên thông chuỗi 13 SOP không đứt gãy</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <Package className="w-4 h-4" /> Lô Đã Đóng Gói Hoàn Tất
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">14 Lô Hàng</div>
                  <p className="text-xs text-slate-500 mt-1">Đã niêm phong tem QR code sẵn sàng xuất xưởng</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setK2bSubTab('kanban')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        k2bSubTab === 'kanban'
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      🗂️ Bảng Điều Phối Tác Nghiệp Kanban SLA
                    </button>
                    <button
                      type="button"
                      onClick={() => setK2bSubTab('shipping')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        k2bSubTab === 'shipping'
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📦 Đóng Gói & Bàn Giao Kỹ Thuật (Cho 5.1T)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('✨ Đã mở giao diện tạo Việc Điều Phối Tác Nghiệp mới!')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-black shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Giao Việc Tác Nghiệp
                  </button>
                </div>

                {k2bSubTab === 'kanban' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <div className="text-xs font-black text-slate-700 dark:text-slate-300 mb-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                          CẦN LÀM (TODO)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-black">
                          {kanbanTasks.todo.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {kanbanTasks.todo.map(t => (
                          <div key={t.id} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-2xs hover:border-violet-300 transition-colors">
                            <div className="font-bold text-slate-800 dark:text-slate-200">{t.title}</div>
                            <div className="flex items-center justify-between mt-2 text-[10px]">
                              <span className="text-slate-400">Hạn: {t.sla}</span>
                              <span className="px-1.5 py-0.5 rounded font-black bg-rose-50 text-rose-600 border border-rose-200">{t.priority}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-sky-50/50 dark:bg-sky-950/30 p-3 rounded-xl border border-sky-200/60 dark:border-sky-800/60">
                      <div className="text-xs font-black text-[#0284C7] dark:text-sky-400 mb-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-ping" />
                          ĐANG XỬ LÝ (IN PROGRESS)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[10px] font-black">
                          {kanbanTasks.inProgress.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {kanbanTasks.inProgress.map(t => (
                          <div key={t.id} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-sky-200 dark:border-sky-800/60 text-xs shadow-2xs">
                            <div className="font-bold text-slate-800 dark:text-slate-200">{t.title}</div>
                            <div className="flex items-center justify-between mt-2 text-[10px]">
                              <span className="text-slate-400">{t.owner}</span>
                              <span className="font-black text-[#0284C7]">{t.progress}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
                      <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          HOÀN TẤT BÀN GIAO (DONE)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[10px] font-black">
                          {kanbanTasks.done.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {kanbanTasks.done.map(t => (
                          <div key={t.id} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 text-xs shadow-2xs">
                            <div className="font-bold text-slate-800 dark:text-slate-200">{t.title}</div>
                            <div className="flex items-center justify-between mt-2 text-[10px]">
                              <span className="font-mono text-emerald-600 font-bold">{t.code}</span>
                              <span className="text-slate-400">Ngày {t.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100">Lô BB-2026-BG01: 100 Bộ Bo Mạch Nguồn Vi Xử Lý</span>
                        <div className="text-xs text-slate-500 mt-0.5">Bàn giao cho: 5.1T (Đầu ra - Triển khai thực địa) • Người nhận: Phụ trách Triển Khai</div>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                        ĐÃ KÝ BIÊN BẢN GIAO NHẬN
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100">Lô BB-2026-BG02: 30 Bộ Lọc Nhiễu Sóng RF Công Nghiệp</span>
                        <div className="text-xs text-slate-500 mt-0.5">Bàn giao cho: 5.1T • Đã dán tem niêm phong QA/QC chống tháo mở</div>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                        ĐÃ KÝ BIÊN BẢN GIAO NHẬN
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GIAO DIỆN 5: HỘP #K1 */}
          {currentKey === 'k1' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase">
                    <BookOpen className="w-4 h-4" /> Hồ Sơ Cố Vấn Chuyên Sâu
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">7 Hồ Sơ Thẩm Định</div>
                  <p className="text-xs text-slate-500 mt-1">Phản biện công nghệ & tối ưu hóa giải pháp</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <ShieldCheck className="w-4 h-4" /> Tiêu Chuẩn Hợp Chuẩn
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">ISO/IEC & RoHS</div>
                  <p className="text-xs text-slate-500 mt-1">Kiểm định an toàn điện và tương thích điện từ EMC</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <Sparkles className="w-4 h-4" /> Khuyến Nghị Tối Ưu Đã Áp Dụng
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">11 Cải Tiến</div>
                  <p className="text-xs text-slate-500 mt-1">Giúp tăng 35% độ bền vi mạch trong môi trường nhiệt</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setK1SubTab('advisory')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        k1SubTab === 'advisory'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📑 Hồ Sơ Cố Vấn & Phản Biện Kỹ Thuật ({advisoryMemos.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setK1SubTab('standards')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                        k1SubTab === 'standards'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      🛡️ Thư Viện Tiêu Chuẩn Công Nghệ & Rủi Ro
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('💡 Đã mở phiếu đề xuất ý kiến cố vấn công nghệ mới!')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Thêm Biên Bản Cố Vấn
                  </button>
                </div>

                {k1SubTab === 'advisory' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Mã Hồ Sơ</th>
                          <th className="py-2.5 px-3">Chủ Đề Cố Vấn Kỹ Thuật</th>
                          <th className="py-2.5 px-3">Chuyên Gia Cố Vấn</th>
                          <th className="py-2.5 px-3">Giải Pháp Đề Xuất</th>
                          <th className="py-2.5 px-3">Mức Độ</th>
                          <th className="py-2.5 px-3 text-right">Chi Tiết</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {advisoryMemos.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-3 font-mono font-black text-indigo-600 dark:text-indigo-400">{item.id}</td>
                            <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{item.title}</td>
                            <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{item.expert}</td>
                            <td className="py-3 px-3 text-slate-700 dark:text-slate-300 max-w-xs">{item.solution}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                item.level.includes('CAO') || item.level.includes('TRỌNG YẾU')
                                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                              }`}>
                                {item.level}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => showToast(`🔍 Mở toàn văn hồ sơ cố vấn ${item.id}: ${item.title}`)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold text-xs transition-colors"
                              >
                                <Eye className="w-3 h-3" /> Xem
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Tiêu Chuẩn IEC 62368-1</div>
                      <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">ĐÃ HỢP CHUẨN</div>
                      <div className="text-[10px] text-slate-400 mt-1">An toàn thiết bị âm thanh/hình ảnh & IT</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Tiêu Chuẩn RoHS 2011/65/EU</div>
                      <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">ĐÃ HỢP CHUẨN</div>
                      <div className="text-[10px] text-slate-400 mt-1">Hạn chế chất độc hại chì & thủy ngân</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Tiêu Chuẩn Tương Thích EMC</div>
                      <div className="text-base font-black text-indigo-600 dark:text-indigo-400 mt-1">ĐANG KIỂM TRA</div>
                      <div className="text-[10px] text-slate-400 mt-1">Phòng Lab kiểm tra mức độ phát xạ sóng</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                      <div className="text-xs font-bold text-slate-500">Tiêu Chuẩn Quản Lý ISO 9001</div>
                      <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">DUY TRÌ 100%</div>
                      <div className="text-[10px] text-slate-400 mt-1">Đầy đủ chữ ký số & audit trail liên thông</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
