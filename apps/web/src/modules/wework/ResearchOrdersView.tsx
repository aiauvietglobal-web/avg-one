import React, { useState, useMemo } from 'react';
import {
  Cpu, Sparkles, Plus, CheckCircle2, AlertTriangle, Activity,
  Layers, FlaskConical, Gauge, FileCode, User, Calendar,
  ArrowRight, X, MessageSquare, Send, CheckSquare, ShieldCheck,
  Zap, Microchip, Thermometer, BatteryCharging, FileSpreadsheet,
  Search, ExternalLink, Filter, Flame
} from 'lucide-react';

export interface ResearchOrder {
  id: string;
  code: string;
  title: string;
  category: 'FIRMWARE_AI' | 'HARDWARE_PCB' | 'SAMPLE_H1' | 'STRESS_TEST';
  categoryLabel: string;
  stage: 'FEASIBILITY' | 'PCB_SCHEMATIC' | 'SAMPLE_H1' | 'LAB_TEST' | 'GOLDEN_RELEASE';
  stageLabel: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  h1Version: string;
  leadEngineer: {
    name: string;
    avatar: string;
    role: string;
  };
  progress: number;
  dueDate: string;
  metrics: {
    operatingVoltage?: string;
    tempRange?: string;
    accuracy?: string;
    passRate?: string;
  };
  description: string;
  labLogs: { time: string; note: string; status: 'PASS' | 'WARN' | 'INFO' }[];
  tasks: { id: string; text: string; done: boolean }[];
  comments: { id: string; author: string; avatar: string; time: string; text: string }[];
}

const INITIAL_RESEARCH_ORDERS: ResearchOrder[] = [
  {
    id: 'res-1',
    code: 'NC-2026-101',
    title: 'Nghiên cứu & Chế tạo Sản Mẫu H1: Cảm biến AI Quang học nhận diện dị vật',
    category: 'SAMPLE_H1',
    categoryLabel: 'Chế tạo Mẫu H1',
    stage: 'SAMPLE_H1',
    stageLabel: 'Chế tạo Sản Mẫu H1',
    priority: 'URGENT',
    h1Version: 'Prototype H1-v2.1',
    leadEngineer: {
      name: 'TS. Hoàng Đăng Khoa',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'R&D Lead Engineer'
    },
    progress: 75,
    dueDate: '20/03/2026',
    metrics: {
      operatingVoltage: '12V - 24V DC / 180mA',
      tempRange: '-10°C đến +65°C',
      accuracy: 'Sai số < 0.05mm',
      passRate: '98.5% Pass'
    },
    description: 'Thử nghiệm thuật toán nhận diện dị vật tốc độ cao trên dây chuyền 120 sản phẩm/phút, tích hợp vi điều khiển ARM Cortex-M7 và cảm biến CMOS độ phân giải cao.',
    labLogs: [
      { time: '11/03 14:00', note: 'Đo xung nhịp dao động thạch anh và nguồn cấp sạch nhiễu: Đạt yêu cầu.', status: 'PASS' },
      { time: '10/03 16:30', note: 'Thử nghiệm quét phôi mẫu ở tốc độ 100 sp/phút: Phát hiện lỗi chính xác 99/100 mẫu.', status: 'PASS' },
      { time: '09/03 10:15', note: 'Nhiệt độ cụm vi xử lý đạt 58°C sau 8 giờ chạy liên tục: Đề xuất thêm pad giải nhiệt.', status: 'WARN' }
    ],
    tasks: [
      { id: 't1', text: 'Hàn lắp ráp bo mạch mẫu H1 tại phòng Lab sạch', done: true },
      { id: 't2', text: 'Nạp firmware hiệu chuẩn cảm biến ánh sáng', done: true },
      { id: 't3', text: 'Thử nghiệm liên tục 72 giờ không tắt nguồn', done: false },
      { id: 't4', text: 'Lập báo cáo đánh giá thông số gửi Hội đồng R&D', done: false }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Nguyễn Văn Quản Lý',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        time: 'Hôm nay 10:15',
        text: 'Cần chú trọng biên bản kiểm tra độ ổn định nhiệt độ khi đặt trong vỏ nhôm hộp kín.'
      }
    ]
  },
  {
    id: 'res-2',
    code: 'NC-2026-102',
    title: 'Phát triển Thuật toán AI Lọc nhiễu Tần số cao và Giải thuật Bù nhiệt độ',
    category: 'FIRMWARE_AI',
    categoryLabel: 'Thuật toán & Firmware',
    stage: 'LAB_TEST',
    stageLabel: 'Đo Kiểm & Stress Test',
    priority: 'HIGH',
    h1Version: 'FW-v3.0.4 Beta',
    leadEngineer: {
      name: 'Vũ Đức Mạnh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      role: 'Firmware & AI Specialist'
    },
    progress: 90,
    dueDate: '16/03/2026',
    metrics: {
      operatingVoltage: '3.3V Logic Level',
      tempRange: '-20°C đến +85°C',
      accuracy: 'Độ trễ < 1.2ms',
      passRate: '99.8% Pass'
    },
    description: 'Nâng cấp bộ lọc Kalman thích ứng và thuật toán bù nhiệt số hóa, triệt tiêu độ trôi điểm 0 (Zero Drift) khi môi trường sản xuất dao động nhiệt độ lớn.',
    labLogs: [
      { time: '11/03 11:20', note: 'Kiểm tra độ trôi Zero Drift trong buồng nhiệt từ -10°C lên +70°C: Dao động < 0.02%.', status: 'PASS' },
      { time: '08/03 15:40', note: 'Đo lường thời gian đáp ứng tín hiệu ngắt phần cứng: 1.15ms đạt chuẩn.', status: 'PASS' }
    ],
    tasks: [
      { id: 't1', text: 'Tối ưu hóa thư viện tính toán số thực DSP', done: true },
      { id: 't2', text: 'Đo kiểm xung kích thích trong lồng Faraday', done: true },
      { id: 't3', text: 'Đóng gói bản release firmware chính thức kèm checksum SHA-256', done: false }
    ],
    comments: []
  },
  {
    id: 'res-3',
    code: 'NC-2026-103',
    title: 'Thiết kế Bo Mạch Mẫu PCB 4 Lớp Giảm Nhiễu Điện Từ EMC/EMI',
    category: 'HARDWARE_PCB',
    categoryLabel: 'Phần cứng & Bo mạch',
    stage: 'PCB_SCHEMATIC',
    stageLabel: 'Sơ Đồ Nguyên Lý & Layout',
    priority: 'HIGH',
    h1Version: 'PCB Rev 3.2',
    leadEngineer: {
      name: 'Phạm Thị Mỹ Linh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      role: 'Hardware Engineer'
    },
    progress: 55,
    dueDate: '28/03/2026',
    metrics: {
      operatingVoltage: '24V DC Industrial',
      tempRange: 'Chuẩn công nghiệp Class B',
      accuracy: 'Chống sét lan truyền 2kV',
      passRate: 'Chờ test Quatest'
    },
    description: 'Quy hoạch đường tín hiệu vi sai trở kháng 90 Ohm, lớp tiếp địa ground plane độc lập ngăn nhiễu biến tần và động cơ công suất lớn.',
    labLogs: [
      { time: '10/03 09:00', note: 'Hoàn tất mô phỏng trường điện từ EMI bằng phần mềm Altium: Đạt quy chuẩn IPC-2221.', status: 'INFO' }
    ],
    tasks: [
      { id: 't1', text: 'Chọn lọc linh kiện thụ động đạt chuẩn AEC-Q200', done: true },
      { id: 't2', text: 'Gửi file Gerber cho nhà máy gia công mạch mạ vàng ENIG', done: true },
      { id: 't3', text: 'Hàn thử nghiệm bo mạch mẫu đợt 1', done: false }
    ],
    comments: []
  },
  {
    id: 'res-4',
    code: 'NC-2026-104',
    title: 'Nghiệm Thu Mẫu Chuẩn Vàng (Golden Sample) & Đóng Gói Hồ Sơ Chuyển Giao',
    category: 'SAMPLE_H1',
    categoryLabel: 'Golden Sample',
    stage: 'GOLDEN_RELEASE',
    stageLabel: 'Bàn Giao & Nghiệm Thu',
    priority: 'NORMAL',
    h1Version: 'Golden Sample v1.0',
    leadEngineer: {
      name: 'TS. Hoàng Đăng Khoa',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'R&D Lead Engineer'
    },
    progress: 100,
    dueDate: '12/03/2026',
    metrics: {
      operatingVoltage: 'Đạt chuẩn 100%',
      tempRange: 'Kiểm định hoàn tất',
      accuracy: 'Sai số tối ưu < 0.01%',
      passRate: '100% Passed'
    },
    description: 'Đã hoàn thành thử nghiệm 500 giờ không lỗi, ký biên bản nghiệm thu kỹ thuật và bàn giao bộ tài liệu chế tạo cho Khối Sản Xuất.',
    labLogs: [
      { time: '12/03 08:30', note: 'Ký biên bản nghiệm thu Golden Sample đạt chuẩn đưa vào dây chuyền sản xuất.', status: 'PASS' }
    ],
    tasks: [
      { id: 't1', text: 'Thực hiện stress test 500 giờ nhiệt ẩm chu kỳ', done: true },
      { id: 't2', text: 'Ký duyệt danh mục linh kiện chuẩn (BOM Master)', done: true },
      { id: 't3', text: 'Bàn giao Golden Sample lưu kho kỹ thuật an toàn', done: true }
    ],
    comments: []
  }
];

export const ResearchOrdersView: React.FC = () => {
  const [orders, setOrders] = useState<ResearchOrder[]>(INITIAL_RESEARCH_ORDERS);
  const [activeStageFilter, setActiveStageFilter] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterVersion, setFilterVersion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<ResearchOrder | null>(null);
  const [newLogNote, setNewLogNote] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString('vi-VN'));
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  // Form state for creating new research order
  const [formCode, setFormCode] = useState(`NC-2026-${Math.floor(105 + Math.random() * 50)}`);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ResearchOrder['category']>('SAMPLE_H1');
  const [formVersion, setFormVersion] = useState('Prototype H1-v1.0');
  const [formLead, setFormLead] = useState('TS. Hoàng Đăng Khoa');
  const [formDueDate, setFormDueDate] = useState('25/03/2026');
  const [formDesc, setFormDesc] = useState('');

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: orders.length,
      sampleH1: orders.filter(o => o.stage === 'SAMPLE_H1' || o.category === 'SAMPLE_H1').length,
      inTesting: orders.filter(o => o.stage === 'LAB_TEST' || o.stage === 'PCB_SCHEMATIC' || o.stage === 'SAMPLE_H1').length,
      goldenReleased: orders.filter(o => o.stage === 'GOLDEN_RELEASE' || o.progress === 100).length
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStage = activeStageFilter === 'ALL' || o.stage === activeStageFilter;
      const matchCategory = filterCategory === 'ALL' || o.category === filterCategory;
      const matchVersion = filterVersion === 'ALL' || o.h1Version.includes(filterVersion);
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        o.title.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q) ||
        o.h1Version.toLowerCase().includes(q) ||
        o.leadEngineer.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q);
      return matchStage && matchCategory && matchVersion && matchQuery;
    });
  }, [orders, activeStageFilter, filterCategory, filterVersion, searchQuery]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const catLabels: Record<ResearchOrder['category'], string> = {
      'SAMPLE_H1': 'Chế tạo Mẫu H1',
      'FIRMWARE_AI': 'Thuật toán & Firmware',
      'HARDWARE_PCB': 'Phần cứng & Bo mạch',
      'STRESS_TEST': 'Đo Kiểm & Thử Nghiệm'
    };

    const newOrder: ResearchOrder = {
      id: `res-${Date.now()}`,
      code: formCode,
      title: formTitle.trim(),
      category: formCategory,
      categoryLabel: catLabels[formCategory],
      stage: 'FEASIBILITY',
      stageLabel: 'Nghiên cứu Khả thi',
      priority: 'HIGH',
      h1Version: formVersion.trim() || 'H1-v1.0',
      leadEngineer: {
        name: formLead || 'TS. Hoàng Đăng Khoa',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'R&D Lead'
      },
      progress: 15,
      dueDate: formDueDate,
      metrics: {
        operatingVoltage: 'Theo quy chuẩn mạch',
        tempRange: '-10°C đến +65°C',
        accuracy: 'Đang kiểm nghiệm',
        passRate: 'Đang đo kiểm'
      },
      description: formDesc.trim() || 'Đề tài nghiên cứu ứng dụng công nghệ lõi và thử nghiệm linh kiện H1 AVG.',
      labLogs: [
        { time: 'Vừa tạo', note: 'Khởi tạo đề tài nghiên cứu và lập danh mục linh kiện BOM.', status: 'INFO' }
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, text: 'Khảo sát linh kiện bán dẫn và vi xử lý', done: true },
        { id: `t-${Date.now()}-2`, text: 'Thiết kế nguyên lý bo mạch H1', done: false }
      ],
      comments: [
        {
          id: `c-${Date.now()}-1`,
          author: 'Ban Giám Đốc (CEO)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          time: 'Vừa xong',
          text: `Đã phê duyệt khởi tạo đề tài nghiên cứu ${formCode}. Yêu cầu tập trung kiểm thử mẫu H1 đúng quy chuẩn!`
        }
      ]
    };

    setOrders([newOrder, ...orders]);
    setFormTitle('');
    setFormDesc('');
    const nextCode = `NC-2026-${Math.floor(150 + Math.random() * 50)}`;
    setFormCode(nextCode);
    setDispatchToast(`✨ Đã khởi tạo thành công đề tài nghiên cứu: ${newOrder.code} - "${newOrder.title}"!`);
  };

  const handleAddLabLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogNote.trim() || !selectedOrder) return;

    const now = new Date();
    const nowStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} Hôm nay`;

    const newEntry = {
      time: nowStr,
      note: newLogNote.trim(),
      status: 'PASS' as const
    };

    const updated = {
      ...selectedOrder,
      labLogs: [newEntry, ...selectedOrder.labLogs]
    };
    setSelectedOrder(updated);
    setOrders(orders.map(o => o.id === selectedOrder.id ? updated : o));
    setNewLogNote('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedOrder) return;

    const newC = {
      id: `c-${Date.now()}`,
      author: 'Nguyễn Văn Quản Lý',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      time: 'Vừa xong',
      text: commentInput.trim()
    };

    const updated = {
      ...selectedOrder,
      comments: [...selectedOrder.comments, newC]
    };
    setSelectedOrder(updated);
    setOrders(orders.map(o => o.id === selectedOrder.id ? updated : o));
    setCommentInput('');
  };

  const handleToggleTask = (taskId: string) => {
    if (!selectedOrder) return;
    const updatedTasks = selectedOrder.tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    const doneCount = updatedTasks.filter(t => t.done).length;
    const newProgress = Math.round((doneCount / updatedTasks.length) * 100);

    const updated = {
      ...selectedOrder,
      tasks: updatedTasks,
      progress: newProgress
    };
    setSelectedOrder(updated);
    setOrders(orders.map(o => o.id === selectedOrder.id ? updated : o));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* 🔮 Header & Live Sync Banner - Đồng Bộ Thiết Kế & Animation Chuẩn AVG One */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-5 sm:p-6 shadow-xs relative overflow-hidden space-y-5">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F15A24]/10 dark:bg-[#F15A24]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title & Animated Slogan Box Badge */}
          <div className="space-y-2 text-left">
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="research-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                  stroke="url(#research-slogan-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Cpu className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>AVG R&D LAB & H1 HARDWARE 3.1</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>QUẢN LÝ</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">ĐƠN HÀNG NGHIÊN CỨU (3.1)</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#0284C7] hover:bg-sky-600 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm hover:shadow-md hover:shadow-sky-500/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở Nhật Ký Lab Gốc</span>
            </a>
          </div>
        </div>

        {/* Stats Counter Cards - Các hộp sáng màu có nhịp đập & animation hover */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1 relative z-10">
          <div className="bg-sky-50/70 hover:bg-sky-50 dark:bg-sky-950/30 dark:hover:bg-sky-950/50 border border-sky-200/80 dark:border-sky-800/60 rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span>Tổng Đề Tài R&D</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-900 dark:text-sky-100 mt-1">{stats.total}</div>
          </div>
          <div className="bg-orange-50/70 hover:bg-orange-50 dark:bg-orange-950/30 dark:hover:bg-orange-950/50 border border-orange-200/80 dark:border-orange-800/60 rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-500/10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#F15A24] animate-pulse" />
              <span>Thử Nghiệm H1</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#F15A24] dark:text-orange-300 mt-1">{stats.inTesting}</div>
          </div>
          <div className="bg-emerald-50/70 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Đo Kiểm Pass</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-100 mt-1">98.6%</div>
          </div>
          <div className="bg-purple-50/70 hover:bg-purple-50 dark:bg-purple-950/30 dark:hover:bg-purple-950/50 border border-purple-200/80 dark:border-purple-800/60 rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-500/10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>Golden Sample</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-900 dark:text-purple-100 mt-1">{stats.goldenReleased}</div>
          </div>
        </div>
      </div>

      {/* 🚀 Dispatcher Form Card - Khởi Tạo Đề Tài Mới */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-[#0284C7]" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Khởi Tạo Đề Tài Nghiên Cứu & Chế Tạo Mẫu H1 Mới
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Quyền hạn: Ban R&D & Phòng Lab (3.1 / Lead)</span>
        </div>

        {dispatchToast && (
          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-[#0284C7] dark:text-sky-300 text-xs font-bold flex items-center justify-between">
            <span>{dispatchToast}</span>
            <button onClick={() => setDispatchToast(null)} className="text-xs font-black cursor-pointer">✕</button>
          </div>
        )}

        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mã Đề Tài
              </label>
              <input
                type="text"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kỹ Sư Phụ Trách
              </label>
              <input
                type="text"
                value={formLead}
                onChange={(e) => setFormLead(e.target.value)}
                placeholder="VD: TS. Hoàng Đăng Khoa..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Lĩnh Vực R&D
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 font-bold"
              >
                <option value="SAMPLE_H1">Chế tạo Mẫu H1</option>
                <option value="FIRMWARE_AI">Thuật toán & Firmware AI</option>
                <option value="HARDWARE_PCB">Phần cứng & Bo mạch</option>
                <option value="STRESS_TEST">Đo Kiểm & Thử Nghiệm</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phiên Bản Mẫu H1
              </label>
              <input
                type="text"
                value={formVersion}
                onChange={(e) => setFormVersion(e.target.value)}
                placeholder="VD: Prototype H1-v1.0"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tiêu Đề Đề Tài / Mục Tiêu Nghiên Cứu
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Nhập tiêu đề hoặc mục tiêu nghiên cứu, chế tạo bo mạch..."
              required
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Thông Số Kỹ Thuật Chi Tiết & Quy Trình Thử Nghiệm Lab
            </label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Nhập chi tiết yêu cầu điện áp, dải nhiệt độ, sai số, phương pháp kiểm tra đo kiểm phòng Lab..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 font-medium"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0284C7] hover:bg-sky-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 cursor-pointer transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Khởi Tạo Đề Tài Nghiên Cứu</span>
            </button>
          </div>
        </form>
      </div>

      {/* 🔍 Search & Filters Bar - Đồng Bộ Bố Cục Thông Điệp Điều Hành */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm mã, đề tài, mẫu H1, kỹ sư..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40 shadow-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>

          <select
            value={activeStageFilter}
            onChange={(e) => setActiveStageFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-xs cursor-pointer"
          >
            <option value="ALL">Tất cả giai đoạn</option>
            <option value="FEASIBILITY">1. Nghiên Cứu Khả Thi</option>
            <option value="PCB_SCHEMATIC">2. Thiết Kế Bo Mạch PCB</option>
            <option value="SAMPLE_H1">3. Chế Tạo Mẫu H1</option>
            <option value="LAB_TEST">4. Đo Kiểm Lab Test</option>
            <option value="GOLDEN_RELEASE">5. Golden Sample</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-xs cursor-pointer"
          >
            <option value="ALL">Tất cả lĩnh vực</option>
            <option value="SAMPLE_H1">Chế tạo Mẫu H1</option>
            <option value="FIRMWARE_AI">Thuật toán & AI</option>
            <option value="HARDWARE_PCB">Bo mạch & Phần cứng</option>
            <option value="STRESS_TEST">Đo kiểm & Stress Test</option>
          </select>

          <select
            value={filterVersion}
            onChange={(e) => setFilterVersion(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-xs cursor-pointer"
          >
            <option value="ALL">Tất cả mẫu H1</option>
            <option value="H1">Hệ Mẫu H1</option>
            <option value="Golden">Golden Sample</option>
            <option value="Beta">Bản thử nghiệm Beta</option>
          </select>
        </div>
      </div>

      {/* 📋 Section Title: Danh Sách Đề Tài Nghiên Cứu */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Danh Sách Đề Tài Nghiên Cứu R&D</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {filteredOrders.length} / {orders.length}
          </span>
        </h3>
      </div>

      {/* 🔬 DANH SÁCH THẺ ĐƠN HÀNG NGHIÊN CỨU (MỞ RỘNG TOÀN DIỆN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="group bg-white/95 dark:bg-slate-900/95 rounded-[22px] border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-lg transition-all duration-200 hover:border-[#0284C7]/40 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header card: Code, Category, H1 Version badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-[#0284C7] font-mono font-black text-xs border border-sky-200 dark:border-sky-800">
                    {order.code}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {order.categoryLabel}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#F15A24] font-black text-[10px] border border-orange-200 dark:border-orange-800 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {order.h1Version}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  onClick={() => setSelectedOrder(order)}
                  className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-[#0284C7] transition cursor-pointer leading-snug"
                >
                  {order.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {order.description}
                </p>
              </div>

              {/* Hardware / Lab Metrics Display Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] flex items-center gap-0.5">
                    <BatteryCharging className="w-3 h-3 text-[#0284C7]" /> Nguồn Cấp
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate block text-[11px]">
                    {order.metrics.operatingVoltage || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] flex items-center gap-0.5">
                    <Thermometer className="w-3 h-3 text-rose-500" /> Nhiệt Độ
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate block text-[11px]">
                    {order.metrics.tempRange || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] flex items-center gap-0.5">
                    <Activity className="w-3 h-3 text-purple-500" /> Độ Chính Xác
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate block text-[11px]">
                    {order.metrics.accuracy || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] flex items-center gap-0.5">
                    <Gauge className="w-3 h-3 text-emerald-500" /> Tỷ Lệ Đạt
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 truncate block text-[11px]">
                    {order.metrics.passRate || 'Pass'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-black">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#0284C7]" />
                    {order.stageLabel}
                  </span>
                  <span className="text-[#0284C7]">{order.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-[#0284C7] rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>

              {/* Recent Lab Log Snippet */}
              {order.labLogs && order.labLogs.length > 0 && (
                <div className="p-2.5 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 text-[11px] flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0284C7] mt-1 shrink-0" />
                  <div className="flex-1 truncate">
                    <span className="text-slate-400 font-bold mr-1.5">{order.labLogs[0].time}:</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{order.labLogs[0].note}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer: Lead Engineer, Due Date, and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={order.leadEngineer.avatar}
                  alt={order.leadEngineer.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#0284C7]"
                />
                <div>
                  <span className="font-black text-slate-800 dark:text-slate-200 block text-[11px] leading-tight">
                    {order.leadEngineer.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    {order.leadEngineer.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">Hạn Bàn Giao H1</span>
                  <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0284C7]" />
                    {order.dueDate}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 rounded-xl bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white transition cursor-pointer shadow-2xs"
                  title="Xem nhật ký đo kiểm Lab"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔬 DRAWER CHI TIẾT ĐƠN NGHIÊN CỨU & NHẬT KÝ LAB */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header Drawer */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-[#0284C7] text-white font-mono font-black text-xs shadow-xs">
                  {selectedOrder.code}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedOrder.categoryLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F15A24] font-black text-[10px]">
                  {selectedOrder.h1Version}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Drawer */}
            <div className="p-6 space-y-6 flex-1">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
                  {selectedOrder.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {selectedOrder.description}
                </p>
              </div>

              {/* Hardware Test Indicators Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Bộ Chỉ Số Thử Nghiệm Mẫu H1
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block">Nguồn Cung Cấp & Công Suất:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.metrics.operatingVoltage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Dải Nhiệt Độ Chịu Tải:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.metrics.tempRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Sai Số & Độ Trễ:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.metrics.accuracy}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Tỷ Lệ Vượt Qua Stress Test:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{selectedOrder.metrics.passRate}</span>
                  </div>
                </div>
              </div>

              {/* Checklist Tiến Độ Nghiên Cứu */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Các Bước Nghiệm Thu Đề Tài ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <span className="text-xs font-extrabold text-[#0284C7]">{selectedOrder.progress}%</span>
                </div>
                <div className="space-y-2">
                  {selectedOrder.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0284C7]/40 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {}}
                        className="rounded text-[#0284C7] focus:ring-[#0284C7] w-4 h-4"
                      />
                      <span className={`text-xs font-bold ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Logs Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#0284C7]" />
                  Nhật Ký Thử Nghiệm Phòng Lab (Lab Logs)
                </h4>

                <form onSubmit={handleAddLabLog} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ghi log đo điện áp, nhiệt độ, phát hiện lỗi mạch..."
                    value={newLogNote}
                    onChange={e => setNewLogNote(e.target.value)}
                    className="flex-1 p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    + Ghi Log
                  </button>
                </form>

                <div className="space-y-2">
                  {selectedOrder.labLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          log.status === 'PASS' ? 'bg-emerald-500' : log.status === 'WARN' ? 'bg-amber-500' : 'bg-[#0284C7]'
                        }`} />
                        <div>
                          <span className="text-slate-400 font-mono text-[10px] block">{log.time}</span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{log.note}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        log.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trao đổi chuyên gia R&D */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0284C7]" />
                  Thảo Luận Kỹ Thuật Hội Đồng R&D ({selectedOrder.comments.length})
                </h4>

                <div className="space-y-3">
                  {selectedOrder.comments.map(c => (
                    <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-200">
                          <img src={c.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span>{c.author}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pl-7">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Gửi ý kiến phân tích bo mạch, góp ý giải thuật..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="flex-1 p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
