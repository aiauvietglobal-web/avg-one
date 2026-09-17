import React, { useState } from 'react';
import {
  Inbox, Rocket, Home, Lightbulb, Sparkles, Search, Filter, Plus,
  CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck, Activity,
  Boxes, AlertCircle, Check, Eye, Download, Send, RefreshCw, ChevronRight,
  Package, Users, BarChart3, Layers, Truck, FileCheck, MapPin, QrCode,
  ClipboardCheck, Printer, X, SlidersHorizontal, ArrowUpRight, Coins
} from 'lucide-react';

interface Cluster51ModuleProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Cluster51Module: React.FC<Cluster51ModuleProps> = ({
  activeTab,
  onSelectTab
}) => {
  // Mặc định là 'home' nếu tab rỗng hoặc không thuộc danh sách
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

  // Sub-tabs nội bộ cho 5.1B & 5.1T
  const [subTab51B, setSubTab51B] = useState<'requests' | 'vbkl' | 'market'>('requests');
  const [subTab51T, setSubTab51T] = useState<'dispatch' | 'acceptance' | 'qr_logs'>('dispatch');

  // Search state
  const [search51B, setSearch51B] = useState('');
  const [search51T, setSearch51T] = useState('');

  // Modals
  const [showAddPilotModal, setShowAddPilotModal] = useState(false);
  const [showAddDispatchModal, setShowAddDispatchModal] = useState(false);
  const [viewDocModal, setViewDocModal] = useState<{ title: string; code: string; type: string; content: string } | null>(null);

  // Form states
  const [newPilotTitle, setNewPilotTitle] = useState('');
  const [newPilotClient, setNewPilotClient] = useState('');
  const [newPilotPriority, setNewPilotPriority] = useState('TRỌNG ĐIỂM');
  const [newPilotBudget, setNewPilotBudget] = useState('150.000.000 ₫');

  const [newDispatchLot, setNewDispatchLot] = useState('');
  const [newDispatchProduct, setNewDispatchProduct] = useState('');
  const [newDispatchQuantity, setNewDispatchQuantity] = useState('50 Bộ');
  const [newDispatchCarrier, setNewDispatchCarrier] = useState('AVG Logistics Nội Bộ');

  /* ========================================================================= */
  /* 📦 1. DỮ LIỆU ĐỘC LẬP CHO ĐẦU MỐI 5.1B ĐẦU VÀO (Bước 1 & Bước 13)         */
  /* ========================================================================= */
  // 1.1 Danh sách Đề xuất & Hồ sơ Thí điểm Tiếp nhận (Bước 1)
  const [pilotRequests, setPilotRequests] = useState([
    {
      id: 'DH-2026-B51-001',
      title: 'Thí điểm Mạch Cảm Biến AI Telemetry',
      client: 'Tổng Công Ty Điện Lực Miền Bắc (EVN NPC)',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'TRỌNG ĐIỂM',
      lead: 'Bà Bích',
      budget: '185.000.000 ₫',
      status: 'Đang Khảo Sát',
      date: '16/08/2026',
      sla: 'Còn 18 Giờ',
      srsDoc: 'SRS-AI-TELEM-v1.2.pdf'
    },
    {
      id: 'DH-2026-B51-002',
      title: 'Đơn hàng Đề xuất Thử nghiệm Bo mạch Smart Meter',
      client: 'Công Ty CP Giải Pháp Đo Kiểm Thông Minh',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'KHẨN CẤP',
      lead: 'Tài chính 5.1',
      budget: '95.000.000 ₫',
      status: 'Chờ Duyệt Cấp',
      date: '15/08/2026',
      sla: 'Còn 6 Giờ',
      srsDoc: 'SRS-SM-METER-v2.0.pdf'
    },
    {
      id: 'DH-2026-B51-003',
      title: 'Hồ sơ Thí điểm Cảm biến Áp suất Khí nén IoT',
      client: 'Nhà Máy Chế Tạo Cơ Khí Chính Xác Nam Hà Nội',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'TIÊU CHUẨN',
      lead: 'KS. Minh Hải',
      budget: '60.000.000 ₫',
      status: 'Đã Tiếp Nhận',
      date: '14/08/2026',
      sla: 'Đạt Chuẩn',
      srsDoc: 'SRS-PRESS-IOT-v1.0.pdf'
    },
    {
      id: 'DH-2026-B51-005',
      title: 'Đề xuất Thí điểm Trạm Cảnh Báo Ngập Nước Đô Thị',
      client: 'Sở Xây Dựng & Quản Lý Đô Thị',
      step: 'Bước 1: Tiếp Nhận',
      priority: 'TRỌNG ĐIỂM',
      lead: 'Bà Bích',
      budget: '220.000.000 ₫',
      status: 'Mới Tiếp Nhận',
      date: '17/08/2026',
      sla: 'Còn 23 Giờ',
      srsDoc: 'SRS-FLOOD-URBAN-v1.1.pdf'
    }
  ]);

  // 1.2 Danh sách Biên Bản Kết Luận Nghiệm Thu (Bước 13 VBKL)
  const [vbklRecords, setVbklRecords] = useState([
    {
      id: 'VBKL-2026-001',
      orderId: 'DH-2026-B51-004',
      projectName: 'Thử nghiệm Hệ thống Cảnh báo Sớm Trạm Biến Áp',
      evaluation: 'Đạt 99.8% chỉ tiêu kỹ thuật. Đủ điều kiện chuyển đổi thương mại loạt.',
      signee: 'Bà Bích (Phụ trách B5.1)',
      signStatus: 'ĐÃ KÝ DUYỆT SỐ',
      closeDate: '12/08/2026',
      nextStage: 'Sản xuất loạt Cụm 5.1T',
      fileSize: '4.2 MB'
    },
    {
      id: 'VBKL-2026-002',
      orderId: 'DH-2026-B51-006',
      projectName: 'Thí điểm Cụm Cảm Biến Rung Động Động Cơ Tuabin',
      evaluation: 'Hoàn tất 720 giờ chạy thực địa liên tục, sai số dao động < 0.2%.',
      signee: 'Bà Bích (Phụ trách B5.1)',
      signStatus: 'CHỜ KÝ DUYỆT',
      closeDate: '17/08/2026',
      nextStage: 'Ký kết HĐ Thương Mại',
      fileSize: '3.8 MB'
    },
    {
      id: 'VBKL-2026-003',
      orderId: 'DH-2026-B51-007',
      projectName: 'Đo kiểm Hệ Thống Giám Sát Điện Áp Cao Thế Tự Phục Hồi',
      evaluation: 'Đạt chuẩn bảo vệ xung sét EN 61000-4-5, chuyển giao Cụm #K hoàn thiện.',
      signee: 'Hội đồng Thẩm định 5.1',
      signStatus: 'ĐÃ KÝ DUYỆT SỐ',
      closeDate: '10/08/2026',
      nextStage: 'Đã Đóng Hồ Sơ',
      fileSize: '5.6 MB'
    }
  ]);

  const handleApprovePilot = (id: string, title: string) => {
    setPilotRequests(prev => prev.map(p => p.id === id ? { ...p, status: 'ĐÃ TIẾP NHẬN' } : p));
    showToast(`⚡ ĐÃ DUYỆT 1-CLICK: Hồ sơ ${id} (${title}) đã được thẩm định & cấp mã đơn chính thức!`);
  };

  const handleSignVbkl = (id: string, name: string) => {
    setVbklRecords(prev => prev.map(v => v.id === id ? { ...v, signStatus: 'ĐÃ KÝ DUYỆT SỐ' } : v));
    showToast(`✍️ ĐÃ KÝ DUYỆT ĐIỆN TỬ: Biên bản kết luận ${id} (${name}) đã đóng dấu số và hoàn tất Bước 13!`);
  };

  const handleAddPilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPilotTitle.trim()) return;
    const newId = `DH-2026-B51-0${pilotRequests.length + 10}`;
    const newReq = {
      id: newId,
      title: newPilotTitle.trim(),
      client: newPilotClient.trim() || 'Đối Tác Thử Nghiệm AVG',
      step: 'Bước 1: Tiếp Nhận',
      priority: newPilotPriority,
      lead: 'Bà Bích',
      budget: newPilotBudget || '100.000.000 ₫',
      status: 'Mới Tiếp Nhận',
      date: 'Hôm nay',
      sla: 'Còn 24 Giờ',
      srsDoc: `SRS-${newId}.pdf`
    };
    setPilotRequests([newReq, ...pilotRequests]);
    setShowAddPilotModal(false);
    setNewPilotTitle('');
    setNewPilotClient('');
    showToast(`✨ ĐÃ TIẾP NHẬN ĐƠN MỚI: Hồ sơ thí điểm ${newId} đã được khởi tạo thành công!`);
  };

  /* ========================================================================= */
  /* 🚀 2. DỮ LIỆU ĐỘC LẬP CHO ĐẦU MỐI 5.1T ĐẦU RA (Bước 11 & Bước 12)         */
  /* ========================================================================= */
  // 2.1 Danh sách Đóng Gói Xuất Kho & Giao Vận (Bước 11)
  const [dispatchLots, setDispatchLots] = useState([
    {
      id: 'LOT-2026-51T-088',
      orderCode: 'DH-2026-51T-088',
      productName: 'Lô 50 Bộ Thiết Bị AVG-Grid Smart Gateway',
      quantity: '50 Thiết bị (10 Thùng)',
      specStandard: 'Đóng thùng xốp định hình IP67, Kẹp chì niêm phong #AVG-9921',
      carrier: 'AVG Logistics Nội Bộ',
      driver: 'Nguyễn Văn Nam (0982.***.112)',
      dest: 'Nhà máy Sản xuất Thiết bị Điện Phía Bắc',
      status: 'Đang Giao Vận',
      dispatchDate: '16/08/2026',
      eta: '17:00 Hôm nay'
    },
    {
      id: 'LOT-2026-51T-089',
      orderCode: 'DH-2026-51T-089',
      productName: 'Bo Mạch Nguồn Cách Ly DC-DC 24V Chống Sét',
      quantity: '100 Bo mạch (04 Hộp)',
      specStandard: 'Túi chống tĩnh điện ESD, dán tem kiểm định QA/QC Cụm #',
      carrier: 'Viettel Post Express',
      driver: 'Vận chuyển Bưu chính VT-8829',
      dest: 'Trạm Thí Nghiệm & Kiểm Định Điện Lực',
      status: 'Chờ Xuất Kho',
      dispatchDate: '17/08/2026',
      eta: 'Sáng mai'
    },
    {
      id: 'LOT-2026-51T-090',
      orderCode: 'DH-2026-51T-090',
      productName: 'Modul Truyền Tin LoRa Khoảng Cách Xa Cụm #K',
      quantity: '30 Chiếc (02 Kiện)',
      specStandard: 'Hộp nhôm Anodized, kèm Ăng-ten và Cáp cấp nguồn công nghiệp',
      carrier: 'Xe Chuyên Dụng AVG',
      driver: 'Trần Đình Trọng (0912.***.889)',
      dest: 'Khu Công Nghệ Cao Hòa Lạc',
      status: 'Đã Bàn Giao Kho',
      dispatchDate: '14/08/2026',
      eta: 'Đã Nhận Hàng'
    }
  ]);

  // 2.2 Danh sách Nghiệm Thu Thực Địa & Bàn Giao Hiện Trường (Bước 12)
  const [acceptanceRecords, setAcceptanceRecords] = useState([
    {
      id: 'BBBG-2026-091',
      projectName: 'Nghiệm thu Thực địa & Bàn giao Trạm Đo Năng Lượng 110kV',
      location: 'Trạm Biến Áp 110kV KCN Yên Phong, Bắc Ninh',
      clientRep: 'Ông Phạm Văn Cường (Trưởng ban Kỹ thuật Trạm)',
      leadEngineer: 'KS. Hoàng Thực Địa (5.1T)',
      checklists: [
        { name: 'Kiểm tra đấu nối nguồn 24VDC & tiếp địa an toàn', passed: true },
        { name: 'Đo kiểm cường độ sóng RF LoRa / 4G LTE đạt -75 dBm', passed: true },
        { name: 'Test đồng bộ dữ liệu Telemetry 100 gói không mất gói', passed: true },
        { name: 'Ký biên bản nghiệm thu kỹ thuật và bàn giao chìa khóa tủ máy', passed: true }
      ],
      status: 'Hoàn Tất 100%',
      signStatus: 'ĐÃ KÝ BIÊN BẢN',
      date: '13/08/2026'
    },
    {
      id: 'BBBG-2026-092',
      projectName: 'Triển khai Lắp đặt & Bàn giao Hệ Thống Giám Sát Dòng Rò',
      location: 'Tòa nhà Trung tâm Điều hành Điện Lực Hà Nội',
      clientRep: 'Bà Đặng Mai Trang (Quản lý Tòa nhà)',
      leadEngineer: 'KS. Lê Văn Kỹ Thuật (5.1T)',
      checklists: [
        { name: 'Đấu nối 16 đầu dò cảm biến dòng rò tủ phân phối', passed: true },
        { name: 'Kiểm tra còi báo động và đèn LED hiển thị trạng thái', passed: true },
        { name: 'Chạy thử nghiệm liên tục 48 giờ không báo ảo', passed: false },
        { name: 'Bàn giao tài liệu hướng dẫn vận hành song ngữ', passed: true }
      ],
      status: 'Đang Kiểm Thử',
      signStatus: 'CHỜ NGHIỆM THU',
      date: '17/08/2026'
    }
  ]);

  const handleDispatchLot = (id: string, name: string) => {
    setDispatchLots(prev => prev.map(l => l.id === id ? { ...l, status: 'Đang Giao Vận' } : l));
    showToast(`🚚 ĐÃ PHÁT LỆNH GIAO VẬN: Lô hàng ${id} (${name}) đã được niêm phong và xuất kho!`);
  };

  const handleSignAcceptance = (id: string, name: string) => {
    setAcceptanceRecords(prev => prev.map(a => a.id === id ? { ...a, status: 'Hoàn Tất 100%', signStatus: 'ĐÃ KÝ BIÊN BẢN' } : a));
    showToast(`✍️ ĐÃ KÝ BIÊN BẢN BÀN GIAO: Công trình ${id} (${name}) đã được nghiệm thu hoàn tất Bước 12!`);
  };

  const handleAddDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDispatchProduct.trim()) return;
    const newLotId = `LOT-2026-51T-0${dispatchLots.length + 95}`;
    const newLot = {
      id: newLotId,
      orderCode: `DH-2026-51T-0${dispatchLots.length + 95}`,
      productName: newDispatchProduct.trim(),
      quantity: newDispatchQuantity || '30 Thiết bị',
      specStandard: 'Đóng thùng tiêu chuẩn AVG, dán tem QR niêm phong',
      carrier: newDispatchCarrier,
      driver: 'Đội xe giao vận AVG Logistics',
      dest: newDispatchLot.trim() || 'Công trình Khách hàng',
      status: 'Chờ Xuất Kho',
      dispatchDate: 'Hôm nay',
      eta: 'Trong ngày'
    };
    setDispatchLots([newLot, ...dispatchLots]);
    setShowAddDispatchModal(false);
    setNewDispatchProduct('');
    setNewDispatchLot('');
    showToast(`✨ ĐÃ TẠO LỆNH XUẤT KHO: Lô hàng ${newLotId} đã vào hàng đợi đóng gói giao vận!`);
  };

  /* ========================================================================= */
  /* 📦 CẤU HÌNH THẺ HỘP TRUY CẬP CỤM 5.1 (Chuẩn kích thước rounded-[26px])     */
  /* ========================================================================= */
  const BOXES_CONFIG = [
    {
      id: 'pilot51b',
      icon: Inbox,
      code: '5.1B',
      name: '5.1B ĐẦU VÀO',
      subTitle: 'Thí Điểm & Tiếp Nhận Đơn Hàng',
      tag: 'BƯỚC 1 • BƯỚC 13',
      badge: `${pilotRequests.length} Đơn Hàng`,
      badgeColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800',
      bannerTitle: 'ĐẦU MỐI 5.1B ĐẦU VÀO (Thí Điểm & Tiếp Nhận Đơn Hàng)',
      bannerDesc: 'Đầu mối chịu trách nhiệm tiếp nhận nhu cầu từ khách hàng/đối tác, khảo sát sơ bộ tính khả thi, lập hồ sơ thí điểm (Bước 1) và nghiệm thu tổng kết ký VBKL đóng đơn (Bước 13).',
      leader: 'Bà Bích (Phụ trách B5.1)',
      role: 'Chủ trì Bước 1 & Bước 13 trong chuỗi 13 SOP',
      gradient: 'from-blue-900/90 via-slate-900 to-indigo-950 border-blue-500/30'
    },
    {
      id: 'acceptance51t',
      icon: Rocket,
      code: '5.1T',
      name: '5.1T ĐẦU RA',
      subTitle: 'Triển Khai & Nghiệm Thu Bàn Giao',
      tag: 'BƯỚC 11 • BƯỚC 12',
      badge: `${dispatchLots.length} Lô Hàng`,
      badgeColor: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800',
      bannerTitle: 'ĐẦU MỐI 5.1T ĐẦU RA (Triển Khai & Nghiệm Thu Bàn Giao)',
      bannerDesc: 'Đầu mối chịu trách nhiệm kiểm đếm, đóng gói quy chuẩn chống sốc, xuất kho giao vận (Bước 11) và trực tiếp triển khai nghiệm thu thực địa bàn giao tại công trình (Bước 12).',
      leader: 'Kỹ sư Trưởng 5.1T',
      role: 'Chủ trì Bước 11 & Bước 12 trong chuỗi 13 SOP',
      gradient: 'from-orange-950/90 via-slate-900 to-amber-950 border-orange-500/30'
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

            {/* Quick Switch Cards between 5.1B and 5.1T (Đồng bộ thẻ bo góc 26px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
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
                    className={`flex items-center justify-between p-3.5 transition-all cursor-pointer border ${
                      isActive
                        ? 'border-2 border-[#0284C7] dark:border-sky-400 ring-2 ring-sky-400/30 shadow-lg shadow-sky-500/15 bg-gradient-to-b from-sky-100 via-white to-white dark:from-sky-950/80 dark:via-slate-900 dark:to-slate-900'
                        : 'border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] bg-white dark:bg-slate-900 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                        isActive
                          ? 'bg-[#0284C7] text-white shadow-xs shadow-sky-500/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className={`text-xs sm:text-sm font-black tracking-tight ${
                          isActive ? 'text-[#0284C7] dark:text-sky-300' : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {box.name}
                        </div>
                        <div className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500">
                          {box.tag}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full border shrink-0 ${box.badgeColor}`}>
                      {box.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Banner Định Danh Đầu Mối Độc Lập */}
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

          {/* ========================================================================= */}
          {/* 🌟 1. GIAO DIỆN ĐỘC LẬP: ĐẦU MỐI 5.1B ĐẦU VÀO (Bước 1 & Bước 13)         */}
          {/* ========================================================================= */}
          {currentKey === 'pilot51b' && (
            <div className="space-y-4 animate-fade-in">
              {/* 3 KPI Cards Chuyên Biệt cho 5.1B */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <Inbox className="w-4 h-4" /> Đề Xuất Chờ Thẩm Định (B1)
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                    {pilotRequests.filter(p => p.status.includes('Mới') || p.status.includes('Chờ') || p.status.includes('Khảo')).length} Hồ Sơ
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Khảo sát yêu cầu kỹ thuật & cấp mã ĐH</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-500 uppercase">
                    <Activity className="w-4 h-4" /> Đang Thí Điểm Thực Địa
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">6 Dự Án</div>
                  <p className="text-xs text-slate-500 mt-1">Chạy thử nghiệm liên động các cụm</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <FileCheck className="w-4 h-4" /> Biên Bản VBKL Hoàn Tất (B13)
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                    {vbklRecords.length} Văn Bản
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Đã tổng kết đóng hồ sơ chuyển giao</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-600 dark:text-purple-400 uppercase">
                    <Clock className="w-4 h-4" /> SLA Tiếp Nhận Phản Hồi
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">99.2%</div>
                  <p className="text-xs text-slate-500 mt-1">Chuẩn thời gian cam kết &lt; 24 giờ</p>
                </div>
              </div>

              {/* Không gian nghiệp vụ & Bảng tác nghiệp 5.1B */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSubTab51B('requests')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        subTab51B === 'requests'
                          ? 'bg-[#0284C7] text-white shadow-xs shadow-sky-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📥 Hồ Sơ Thí Điểm Tiếp Nhận (Bước 1) ({pilotRequests.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubTab51B('vbkl')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        subTab51B === 'vbkl'
                          ? 'bg-[#0284C7] text-white shadow-xs shadow-sky-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📑 Biên Bản Kết Luận Nghiệm Thu (Bước 13 VBKL) ({vbklRecords.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubTab51B('market')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        subTab51B === 'market'
                          ? 'bg-[#0284C7] text-white shadow-xs shadow-sky-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📊 Đánh Giá Thị Trường & Khảo Sát
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {subTab51B === 'requests' && (
                      <button
                        type="button"
                        onClick={() => setShowAddPilotModal(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F15A24] hover:bg-orange-600 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Thêm Đề Xuất Thí Điểm</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* SubTab 1: Danh sách Đề xuất thí điểm Bước 1 */}
                {subTab51B === 'requests' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="relative flex-1 min-w-[240px] max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Tìm mã đơn, tên đề xuất, khách hàng..."
                          value={search51B}
                          onChange={(e) => setSearch51B(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0284C7]"
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-bold">
                        Đồng bộ tự động hệ thống quản lý yêu cầu khách hàng AVG
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10.5px] font-black">
                            <th className="py-2.5 px-3">Mã Đơn</th>
                            <th className="py-2.5 px-3">Tên Dự Án / Hồ Sơ Thí Điểm</th>
                            <th className="py-2.5 px-3">Khách Hàng / Đơn Vị Đề Xuất</th>
                            <th className="py-2.5 px-3">Dự Toán</th>
                            <th className="py-2.5 px-3">Mức Độ</th>
                            <th className="py-2.5 px-3">Cán Bộ</th>
                            <th className="py-2.5 px-3">Trạng Thái</th>
                            <th className="py-2.5 px-3 text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold">
                          {pilotRequests
                            .filter(p => p.title.toLowerCase().includes(search51B.toLowerCase()) || p.id.toLowerCase().includes(search51B.toLowerCase()) || p.client.toLowerCase().includes(search51B.toLowerCase()))
                            .map((req) => (
                              <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="py-3 px-3 font-mono font-bold text-[#0284C7]">{req.id}</td>
                                <td className="py-3 px-3 text-slate-900 dark:text-slate-100 font-bold">
                                  <div>{req.title}</div>
                                  <span className="text-[10px] text-slate-400 font-normal">Tài liệu: {req.srsDoc}</span>
                                </td>
                                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{req.client}</td>
                                <td className="py-3 px-3 font-mono font-bold text-slate-700 dark:text-slate-200">{req.budget}</td>
                                <td className="py-3 px-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                    req.priority === 'KHẨN CẤP' ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' :
                                    req.priority === 'TRỌNG ĐIỂM' ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400' :
                                    'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                                  }`}>
                                    {req.priority}
                                  </span>
                                </td>
                                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{req.lead}</td>
                                <td className="py-3 px-3">
                                  <span className={`font-bold ${
                                    req.status === 'ĐÃ TIẾP NHẬN' ? 'text-emerald-500' :
                                    req.status === 'Mới Tiếp Nhận' ? 'text-sky-500' : 'text-amber-500'
                                  }`}>
                                    {req.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                                  {req.status !== 'ĐÃ TIẾP NHẬN' ? (
                                    <button
                                      onClick={() => handleApprovePilot(req.id, req.title)}
                                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black transition cursor-pointer shadow-2xs"
                                    >
                                      ✓ Duyệt 1-Click
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => setViewDocModal({
                                        title: req.title,
                                        code: req.id,
                                        type: 'Hồ Sơ SRS Thí Điểm',
                                        content: `HỒ SƠ ĐẶC TẢ THÍ ĐIỂM KỸ THUẬT BƯỚC 1\nMã đơn: ${req.id}\nĐơn vị đề xuất: ${req.client}\nHạn mức dự toán: ${req.budget}\nCán bộ thẩm định: ${req.lead}\nTrạng thái: Đã thẩm định và chuyển tiếp chuỗi 13 SOP liên thông.`
                                      })}
                                      className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-[#0284C7] dark:text-sky-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                                    >
                                      Xem SRS
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 2: Danh sách Biên bản kết luận Bước 13 (VBKL) */}
                {subTab51B === 'vbkl' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-[#0284C7]" />
                        <span><strong>Quy trình Bước 13 (VBKL):</strong> Tổng kết toàn trình sau khi chạy thử nghiệm thực tế, lập văn bản kết luận đánh giá mức độ ổn định để đóng đơn hoặc thương mại hoá.</span>
                      </div>
                      <span className="font-bold text-[#0284C7] shrink-0">Bà Bích chủ trì ký số</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10.5px] font-black">
                            <th className="py-2.5 px-3">Số VBKL</th>
                            <th className="py-2.5 px-3">Mã Đơn Gốc</th>
                            <th className="py-2.5 px-3">Tên Dự Án Đóng Đơn</th>
                            <th className="py-2.5 px-3">Kết Quả Đánh Giá</th>
                            <th className="py-2.5 px-3">Hướng Xử Lý Tiếp Theo</th>
                            <th className="py-2.5 px-3">Ký Duyệt Số</th>
                            <th className="py-2.5 px-3 text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold">
                          {vbklRecords.map((vbkl) => (
                            <tr key={vbkl.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">{vbkl.id}</td>
                              <td className="py-3 px-3 font-mono text-slate-500">{vbkl.orderId}</td>
                              <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">{vbkl.projectName}</td>
                              <td className="py-3 px-3 text-slate-700 dark:text-slate-300 max-w-xs">{vbkl.evaluation}</td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                                  {vbkl.nextStage}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                  vbkl.signStatus === 'ĐÃ KÝ DUYỆT SỐ'
                                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                                }`}>
                                  {vbkl.signStatus}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                                {vbkl.signStatus !== 'ĐÃ KÝ DUYỆT SỐ' ? (
                                  <button
                                    onClick={() => handleSignVbkl(vbkl.id, vbkl.projectName)}
                                    className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-black transition cursor-pointer shadow-2xs"
                                  >
                                    ✍️ Ký Số 1-Click
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setViewDocModal({
                                      title: vbkl.projectName,
                                      code: vbkl.id,
                                      type: 'Văn Bản Kết Luận (VBKL)',
                                      content: `VĂN BẢN KẾT LUẬN NGHIỆM THU TỔNG KẾT TOÀN TRÌNH\nSố văn bản: ${vbkl.id}\nMã đơn hàng gốc: ${vbkl.orderId}\nDự án: ${vbkl.projectName}\nNgười ký: ${vbkl.signee}\nNgày đóng văn bản: ${vbkl.closeDate}\nĐánh giá chất lượng: ${vbkl.evaluation}\nKết luận: Đạt chuẩn 100% SOP kỹ thuật AVG One, chính thức phê chuẩn sang giai đoạn ${vbkl.nextStage}.`
                                    })}
                                    className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-600 dark:text-purple-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                                  >
                                    Xem VBKL
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 3: Đánh Giá Thị Trường & Khảo Sát */}
                {subTab51B === 'market' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                      <div className="text-xs font-black uppercase text-[#0284C7] flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4" /> Nhu Cầu Cảm Biến AI IoT
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                        Ghi nhận 12 đề xuất mới trong tháng về giải pháp cảm biến giám sát thông minh trạm biến áp và nhà máy nhiệt điện.
                      </p>
                      <div className="text-[11px] font-bold text-slate-400">Tăng trưởng nhu cầu: +45% YoY</div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                      <div className="text-xs font-black uppercase text-amber-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Khảo Sát Hợp Chuẩn IEC
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                        100% đơn hàng đề xuất được sàng lọc tiêu chuẩn IEC 62368-1 và độ bền IP67 trước khi chuyển tiếp Cụm #K thiết kế.
                      </p>
                      <div className="text-[11px] font-bold text-slate-400">Đạt chuẩn thẩm định: 100%</div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                      <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Coins className="w-4 h-4" /> Phân Bổ Ngân Sách Khảo Sát
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                        Tổng ngân sách thẩm định đề xuất thí điểm quý 3 đạt 1.25 tỷ VNĐ, giải ngân đúng tiến độ 92%.
                      </p>
                      <div className="text-[11px] font-bold text-slate-400">Nguồn vốn: Ban Giám Đốc phê chuẩn</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 🌟 2. GIAO DIỆN ĐỘC LẬP: ĐẦU MỐI 5.1T ĐẦU RA (Bước 11 & Bước 12)         */}
          {/* ========================================================================= */}
          {currentKey === 'acceptance51t' && (
            <div className="space-y-4 animate-fade-in">
              {/* 4 KPI Cards Chuyên Biệt cho 5.1T */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-orange-600 dark:text-orange-400 uppercase">
                    <Package className="w-4 h-4" /> Lô Hàng Chờ Đóng Gói (B11)
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                    {dispatchLots.filter(l => l.status.includes('Chờ')).length} Lô Hàng
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Đóng thùng định hình & tem niêm phong</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] dark:text-sky-400 uppercase">
                    <Truck className="w-4 h-4" /> Đang Trên Lộ Trình Giao Vận
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                    {dispatchLots.filter(l => l.status === 'Đang Giao Vận').length} Chuyến Hàng
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Theo dõi vị trí GPS & thời gian ETA</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    <CheckCircle2 className="w-4 h-4" /> Nghiệm Thu Bàn Giao (B12)
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">
                    {acceptanceRecords.length} Công Trình
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Ký biên bản hiện trường có dấu số</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-600 dark:text-purple-400 uppercase">
                    <ShieldCheck className="w-4 h-4" /> Tỷ Lệ SLA Đúng Hạn
                  </div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-2">98.8%</div>
                  <p className="text-xs text-slate-500 mt-1">Cam kết đúng hẹn theo hợp đồng</p>
                </div>
              </div>

              {/* Không gian nghiệp vụ & Bảng tác nghiệp 5.1T */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSubTab51T('dispatch')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        subTab51T === 'dispatch'
                          ? 'bg-orange-600 text-white shadow-xs shadow-orange-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      📦 Đóng Gói & Xuất Kho Giao Vận (Bước 11) ({dispatchLots.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubTab51T('acceptance')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        subTab51T === 'acceptance'
                          ? 'bg-orange-600 text-white shadow-xs shadow-orange-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      🏗️ Nghiệm Thu Thực Địa Công Trình (Bước 12) ({acceptanceRecords.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubTab51T('qr_logs')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        subTab51T === 'qr_logs'
                          ? 'bg-orange-600 text-white shadow-xs shadow-orange-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      🏷️ Quản Lý Tem QR Niêm Phong & Lộ Trình
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {subTab51T === 'dispatch' && (
                      <button
                        type="button"
                        onClick={() => setShowAddDispatchModal(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Lập Lệnh Xuất Kho</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* SubTab 1: Danh sách Đóng gói & Xuất kho Bước 11 */}
                {subTab51T === 'dispatch' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="relative flex-1 min-w-[240px] max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Tìm mã lô hàng, sản phẩm, nơi đến..."
                          value={search51T}
                          onChange={(e) => setSearch51T(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-bold">
                        Đồng bộ dữ liệu kho vận 5.1T với Cụm #K2B và Nhà máy
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10.5px] font-black">
                            <th className="py-2.5 px-3">Mã Lô Hàng</th>
                            <th className="py-2.5 px-3">Tên Sản Phẩm / Lô Xuất</th>
                            <th className="py-2.5 px-3">Số Lượng</th>
                            <th className="py-2.5 px-3">Quy Chuẩn Đóng Thùng</th>
                            <th className="py-2.5 px-3">Đơn Vị Vận Chuyển</th>
                            <th className="py-2.5 px-3">Điểm Đến</th>
                            <th className="py-2.5 px-3">Trạng Thái</th>
                            <th className="py-2.5 px-3 text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold">
                          {dispatchLots
                            .filter(l => l.productName.toLowerCase().includes(search51T.toLowerCase()) || l.id.toLowerCase().includes(search51T.toLowerCase()) || l.dest.toLowerCase().includes(search51T.toLowerCase()))
                            .map((lot) => (
                              <tr key={lot.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="py-3 px-3 font-mono font-bold text-orange-600">{lot.id}</td>
                                <td className="py-3 px-3 text-slate-900 dark:text-slate-100 font-bold">
                                  <div>{lot.productName}</div>
                                  <span className="text-[10px] text-slate-400 font-normal">Mã đơn: {lot.orderCode}</span>
                                </td>
                                <td className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300">{lot.quantity}</td>
                                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs">{lot.specStandard}</td>
                                <td className="py-3 px-3">
                                  <div className="font-bold text-slate-800 dark:text-slate-200">{lot.carrier}</div>
                                  <div className="text-[10px] text-slate-400">{lot.driver}</div>
                                </td>
                                <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{lot.dest}</td>
                                <td className="py-3 px-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                    lot.status === 'Đang Giao Vận' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' :
                                    lot.status === 'Chờ Xuất Kho' ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' :
                                    'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                                  }`}>
                                    {lot.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                                  {lot.status === 'Chờ Xuất Kho' ? (
                                    <button
                                      onClick={() => handleDispatchLot(lot.id, lot.productName)}
                                      className="px-2.5 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-[11px] font-black transition cursor-pointer shadow-2xs"
                                    >
                                      🚚 Xuất Kho 1-Click
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => setViewDocModal({
                                        title: lot.productName,
                                        code: lot.id,
                                        type: 'Phiếu Giao Vận Xuất Kho',
                                        content: `PHIẾU XUẤT KHO GIAO VẬN BƯỚC 11\nMã lô hàng: ${lot.id}\nSản phẩm: ${lot.productName}\nSố lượng: ${lot.quantity}\nTiêu chuẩn đóng gói: ${lot.specStandard}\nĐơn vị vận chuyển: ${lot.carrier} - ${lot.driver}\nĐiểm giao: ${lot.dest}\nThời gian xuất: ${lot.dispatchDate} (Dự kiến đến: ${lot.eta})\nTrạng thái: Đã niêm phong tem kiểm chuẩn và đang trên lộ trình.`
                                      })}
                                      className="px-2.5 py-1 bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 text-orange-600 dark:text-orange-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                                    >
                                      Xem Phiếu
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 2: Nghiệm thu thực địa Bước 12 (BBBG) */}
                {subTab51T === 'acceptance' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-orange-600" />
                        <span><strong>Quy trình Bước 12 (Nghiệm thu Thực địa):</strong> Kỹ sư 5.1T có mặt tại công trình thực tế, thực hiện đo kiểm liên động và cùng đại diện khách hàng ký Biên Bản Bàn Giao Kỹ Thuật (BBBG).</span>
                      </div>
                      <span className="font-bold text-orange-600 shrink-0">KS. Trưởng 5.1T chủ trì</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {acceptanceRecords.map((acc) => (
                        <div key={acc.id} className="bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="px-2 py-0.5 rounded-md font-mono text-[10.5px] font-black bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                                {acc.id}
                              </span>
                              <h3 className="text-sm font-black text-slate-900 dark:text-white mt-1">
                                {acc.projectName}
                              </h3>
                              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {acc.location}
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              acc.status === 'Hoàn Tất 100%'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                            }`}>
                              {acc.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-200/60 dark:border-slate-700/60">
                            <div>
                              <span className="text-[10.5px] text-slate-400 uppercase font-bold block">Đại diện khách hàng</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{acc.clientRep}</span>
                            </div>
                            <div>
                              <span className="text-[10.5px] text-slate-400 uppercase font-bold block">Kỹ sư phụ trách</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{acc.leadEngineer}</span>
                            </div>
                          </div>

                          {/* Checklist kiểm tra hiện trường */}
                          <div className="space-y-1.5">
                            <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 block">Checklist Tiêu Chuẩn Hiện Trường:</span>
                            {acc.checklists.map((chk, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ${
                                  chk.passed ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                                }`}>
                                  {chk.passed ? <Check className="w-3 h-3 stroke-[3]" /> : '...'}
                                </div>
                                <span>{chk.name}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-xs text-slate-400">Ngày: {acc.date}</span>
                            {acc.signStatus !== 'ĐÃ KÝ BIÊN BẢN' ? (
                              <button
                                onClick={() => handleSignAcceptance(acc.id, acc.projectName)}
                                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
                              >
                                ✍️ Ký BBBG Hiện Trường 1-Click
                              </button>
                            ) : (
                              <button
                                onClick={() => setViewDocModal({
                                  title: acc.projectName,
                                  code: acc.id,
                                  type: 'Biên Bản Nghiệm Thu Bàn Giao (BBBG)',
                                  content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nBIÊN BẢN BÀN GIAO & NGHIỆM THU HIỆN TRƯỜNG\nSố: ${acc.id}\nCông trình: ${acc.projectName}\nĐịa điểm: ${acc.location}\nĐại diện khách hàng: ${acc.clientRep}\nĐại diện AVG One: ${acc.leadEngineer}\n\nNỘI DUNG NGHIỆM THU:\n- Đã đo kiểm thông số kỹ thuật thực địa đạt chuẩn 100%.\n- Đã bàn giao tài liệu kỹ thuật, hướng dẫn sử dụng và chứng thư bảo hành.\n- Hai bên nhất trí ký tên nghiệm thu và đưa công trình vào vận hành chính thức.`
                                })}
                                className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-300 rounded-xl text-xs font-black transition cursor-pointer"
                              >
                                📄 In Biên Bản BBBG
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubTab 3: Tem QR & Lộ Trình */}
                {subTab51T === 'qr_logs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-600">
                        <QrCode className="w-4 h-4" /> Tem QR Định Danh & Niêm Phong Kẹp Chì
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                        Mỗi thiết bị khi đóng gói tại Bước 11 được gán một mã QR định danh duy nhất (UID-2026), cho phép quét bằng camera điện thoại để kiểm tra nguồn gốc lô hàng, firmware và biên bản kiểm định QA/QC Cụm #.
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">AVG-QR-SECURE-2026</span>
                        <span className="text-emerald-500 font-bold">✓ Kích Hoạt 100%</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-black uppercase text-[#0284C7]">
                        <Truck className="w-4 h-4" /> Hệ Thống Đội Xe Giao Vận AVG Logistics
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                        Kết nối trực tiếp 5 xe vận chuyển chuyên dụng có thùng bảo ôn chống sốc, đảm bảo an toàn tuyệt đối cho các thiết bị điện tử tinh xảo và trạm đo năng lượng trước khi bàn giao hiện trường.
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">Đội xe AVG Logistics</span>
                        <span className="text-sky-500 font-bold">5/5 Xe Sẵn Sàng</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 📄 MODAL XEM CHI TIẾT TÀI LIỆU / BIÊN BẢN                                 */}
      {/* ========================================================================= */}
      {viewDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] dark:text-sky-400 block">
                  {viewDocModal.type}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {viewDocModal.title}
                </h3>
              </div>
              <button
                onClick={() => setViewDocModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto">
              {viewDocModal.content}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Mã số: {viewDocModal.code}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    showToast(`📥 ĐÃ TẢI XUỐNG: ${viewDocModal.code}.pdf đã lưu vào thư mục tải về!`);
                    setViewDocModal(null);
                  }}
                  className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-sky-600 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Bản PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ➕ MODAL THÊM ĐỀ XUẤT THÍ ĐIỂM (5.1B)                                    */}
      {/* ========================================================================= */}
      {showAddPilotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-[#0284C7] tracking-wider block">5.1B Đầu Vào • Bước 1</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  Thêm Đề Xuất Thí Điểm Mới
                </h3>
              </div>
              <button onClick={() => setShowAddPilotModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPilotSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Tên dự án / Nội dung đề xuất</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Thí điểm Bộ Cảm Biến Áp Suất Thủy Lực..."
                  value={newPilotTitle}
                  onChange={(e) => setNewPilotTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#0284C7]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Khách hàng / Đơn vị đề xuất</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Công Ty Cơ Điện Lạnh Hà Nội..."
                  value={newPilotClient}
                  onChange={(e) => setNewPilotClient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Mức độ ưu tiên</label>
                  <select
                    value={newPilotPriority}
                    onChange={(e) => setNewPilotPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#0284C7]"
                  >
                    <option value="TRỌNG ĐIỂM">🔥 TRỌNG ĐIỂM</option>
                    <option value="KHẨN CẤP">⚡ KHẨN CẤP</option>
                    <option value="TIÊU CHUẨN">TIÊU CHUẨN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Dự toán thí điểm</label>
                  <input
                    type="text"
                    value={newPilotBudget}
                    onChange={(e) => setNewPilotBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPilotModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0284C7] hover:bg-sky-600 text-white rounded-xl font-black cursor-pointer shadow-xs"
                >
                  Xác Nhận Tiếp Nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ➕ MODAL TẠO LỆNH XUẤT KHO GIAO VẬN (5.1T)                                */}
      {/* ========================================================================= */}
      {showAddDispatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider block">5.1T Đầu Ra • Bước 11</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  Tạo Lệnh Đóng Gói Xuất Kho Mới
                </h3>
              </div>
              <button onClick={() => setShowAddDispatchModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDispatchSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Tên sản phẩm / Lô thiết bị xuất xưởng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lô 40 Bộ Cảm Biến AI Smart Grid..."
                  value={newDispatchProduct}
                  onChange={(e) => setNewDispatchProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Địa điểm công trình nhận hàng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Trạm Biến Áp 220kV Đông Anh..."
                  value={newDispatchLot}
                  onChange={(e) => setNewDispatchLot(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Số lượng đóng thùng</label>
                  <input
                    type="text"
                    value={newDispatchQuantity}
                    onChange={(e) => setNewDispatchQuantity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Đơn vị vận chuyển</label>
                  <select
                    value={newDispatchCarrier}
                    onChange={(e) => setNewDispatchCarrier(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-orange-500"
                  >
                    <option value="AVG Logistics Nội Bộ">AVG Logistics Nội Bộ</option>
                    <option value="Viettel Post Express">Viettel Post Express</option>
                    <option value="Xe Chuyên Dụng AVG">Xe Chuyên Dụng AVG</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDispatchModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-black cursor-pointer shadow-xs"
                >
                  Lập Lệnh Xuất Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
