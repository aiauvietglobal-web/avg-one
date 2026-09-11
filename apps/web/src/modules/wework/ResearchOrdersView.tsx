import React, { useState, useMemo } from 'react';
import {
  Cpu, Sparkles, Plus, CheckCircle2, AlertTriangle, Activity,
  Layers, FlaskConical, Gauge, FileCode, User, Calendar,
  ArrowRight, X, MessageSquare, Send, CheckSquare, ShieldCheck,
  Zap, Microchip, Thermometer, BatteryCharging, Search, LayoutList, LayoutGrid
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
    stageLabel: 'Chế tạo Mẫu H1',
    priority: 'URGENT',
    h1Version: 'Proto H1-v2.1',
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
    h1Version: 'FW-v3.0.4',
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
    stageLabel: 'Thiết Kế Mạch PCB',
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
      tempRange: 'Chuẩn Class B',
      accuracy: 'Chống sét 2kV',
      passRate: 'Chờ test'
    },
    description: 'Quy hoạch đường tín hiệu vi sai trở kháng 90 Ohm, lớp tiếp địa ground plane độc lập ngăn nhiễu biến tần và động cơ công suất lớn.',
    labLogs: [
      { time: '10/03 09:00', note: 'Hoàn tất mô phỏng trường điện từ EMI bằng Altium: Đạt chuẩn IPC-2221.', status: 'INFO' }
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
    title: 'Nghiệm Thu Mẫu Chuẩn Vàng (Golden Sample) & Bàn Giao Sản Xuất',
    category: 'SAMPLE_H1',
    categoryLabel: 'Golden Sample',
    stage: 'GOLDEN_RELEASE',
    stageLabel: 'Golden Sample Bàn Giao',
    priority: 'NORMAL',
    h1Version: 'Golden v1.0',
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
      accuracy: 'Sai số < 0.01%',
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
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedOrder, setSelectedOrder] = useState<ResearchOrder | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLogNote, setNewLogNote] = useState('');
  const [commentInput, setCommentInput] = useState('');

  // Form state for creating new research order
  const [formCode, setFormCode] = useState(`NC-2026-${Math.floor(105 + Math.random() * 50)}`);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ResearchOrder['category']>('SAMPLE_H1');
  const [formVersion, setFormVersion] = useState('Proto H1-v1.0');
  const [formLead, setFormLead] = useState('TS. Hoàng Đăng Khoa');
  const [formDueDate, setFormDueDate] = useState('25/03/2026');
  const [formDesc, setFormDesc] = useState('');

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: orders.length,
      sampleH1: orders.filter(o => o.stage === 'SAMPLE_H1' || o.category === 'SAMPLE_H1').length,
      labTesting: orders.filter(o => o.stage === 'LAB_TEST' || o.stage === 'PCB_SCHEMATIC').length,
      goldenReleased: orders.filter(o => o.stage === 'GOLDEN_RELEASE' || o.progress === 100).length
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStage = activeStageFilter === 'ALL' || o.stage === activeStageFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        o.code.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.leadEngineer.name.toLowerCase().includes(q) ||
        o.h1Version.toLowerCase().includes(q) ||
        o.categoryLabel.toLowerCase().includes(q);
      return matchStage && matchSearch;
    });
  }, [orders, activeStageFilter, searchQuery]);

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
        name: formLead,
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
      description: formDesc.trim(),
      labLogs: [
        { time: 'Vừa tạo', note: 'Khởi tạo đề tài nghiên cứu và lập danh mục linh kiện BOM.', status: 'INFO' }
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, text: 'Khảo sát linh kiện bán dẫn và vi xử lý', done: true },
        { id: `t-${Date.now()}-2`, text: 'Thiết kế nguyên lý bo mạch H1', done: false }
      ],
      comments: []
    };

    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    setFormTitle('');
    setFormDesc('');
    setFormCode(`NC-2026-${Math.floor(150 + Math.random() * 50)}`);
  };

  const handleAddLabLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogNote.trim() || !selectedOrder) return;

    const nowStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) + ' ' +
                   new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

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
    <div className="space-y-4">
      {/* 🚀 SCIENTIFIC EXECUTIVE HEADER (TÍCH HỢP GỌN GÀNG: TIÊU ĐỀ + 4 KPI CHIPS + NÚT TẠO) */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Module Title & Slogan */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#0284C7] shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                ĐƠN HÀNG NGHIÊN CỨU
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-[#0284C7]/10 text-[#0284C7] text-[10px] font-black uppercase">
                3.1 - RDI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Thực nghiệm bo mạch vi xử lý • Mẫu thử H1 • Đo kiểm buồng nhiệt • Golden Sample
            </p>
          </div>
        </div>

        {/* Center: 4 Compact KPI Metrics */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase">Đề tài:</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">{stats.total}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60">
            <span className="text-[10px] font-black text-[#F15A24] uppercase">Mẫu H1:</span>
            <span className="text-sm font-black text-[#F15A24]">{stats.sampleH1}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase">Đo kiểm Pass:</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">98.6%</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
            <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase">Golden Sample:</span>
            <span className="text-sm font-black text-purple-700 dark:text-purple-300">{stats.goldenReleased}</span>
          </div>
        </div>

        {/* Right: Action Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl shadow-xs transition transform active:scale-95 text-xs whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Tạo Đề Tài Nghiên Cứu
        </button>
      </div>

      {/* 🧭 WORKFLOW STEPPER & SCIENTIFIC CONTROL TOOLBAR */}
      <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stage Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'Tất Cả Đề Tài' },
            { id: 'FEASIBILITY', label: '1. Nghiên Cứu Khả Thi' },
            { id: 'PCB_SCHEMATIC', label: '2. Thiết Kế Mạch PCB' },
            { id: 'SAMPLE_H1', label: '3. Chế Tạo Mẫu H1' },
            { id: 'LAB_TEST', label: '4. Đo Kiểm Lab Test' },
            { id: 'GOLDEN_RELEASE', label: '5. Golden Sample' }
          ].map(stage => (
            <button
              key={stage.id}
              onClick={() => setActiveStageFilter(stage.id)}
              className={`px-3 py-1 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer ${
                activeStageFilter === stage.id
                  ? 'bg-[#0284C7] text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã NC, vi xử lý, kỹ sư..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0284C7] font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-[#0284C7] dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Xem Bảng Dữ Liệu Kỹ Thuật (Khoa học)"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-white dark:bg-slate-700 text-[#0284C7] dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Xem Dạng Thẻ Tinh Gọn"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 📊 CHẾ ĐỘ 1: BẢNG DỮ LIỆU KỸ THUẬT R&D (SCIENTIFIC TECHNICAL TABLE - ƯU TIÊN MẶC ĐỊNH) */}
      {viewMode === 'table' ? (
        <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[10px]">
                  <th className="p-3.5">Mã Đề Tài</th>
                  <th className="p-3.5">Tên Đề Tài & Thông Số Kỹ Thuật</th>
                  <th className="p-3.5">Phiên Bản Mẫu</th>
                  <th className="p-3.5">Giai Đoạn R&D</th>
                  <th className="p-3.5">R&D Lead</th>
                  <th className="p-3.5 text-center">Tiến Độ</th>
                  <th className="p-3.5">Đo Kiểm</th>
                  <th className="p-3.5 text-right">Nhật Ký</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      Không tìm thấy đề tài nghiên cứu phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-sky-50/40 dark:hover:bg-slate-800/50 transition cursor-pointer group"
                    >
                      {/* Mã đề tài */}
                      <td className="p-3.5 font-mono font-black text-[#0284C7] dark:text-sky-400 whitespace-nowrap">
                        {order.code}
                      </td>

                      {/* Tên đề tài & Thông số */}
                      <td className="p-3.5 max-w-xs md:max-w-md">
                        <div className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#0284C7] transition leading-snug">
                          {order.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-600 dark:text-slate-300">
                            {order.metrics.operatingVoltage}
                          </span>
                          <span>{order.metrics.tempRange}</span>
                        </div>
                      </td>

                      {/* Phiên bản H1 */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] font-black text-[11px] border border-orange-200 dark:border-orange-800">
                          {order.h1Version}
                        </span>
                      </td>

                      {/* Giai đoạn */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          order.stage === 'GOLDEN_RELEASE'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                            : order.stage === 'LAB_TEST'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : order.stage === 'SAMPLE_H1'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400'
                            : 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {order.stageLabel}
                        </span>
                      </td>

                      {/* R&D Lead */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.leadEngineer.avatar}
                            alt=""
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                              {order.leadEngineer.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block leading-none">
                              {order.leadEngineer.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tiến độ */}
                      <td className="p-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-[#0284C7] rounded-full"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 w-7 text-right">
                            {order.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Kết quả đo kiểm */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs">
                          {order.metrics.passRate}
                        </span>
                      </td>

                      {/* Thao tác */}
                      <td className="p-3.5 whitespace-nowrap text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0284C7] hover:text-white font-extrabold text-[11px] text-slate-700 dark:text-slate-200 transition cursor-pointer"
                        >
                          Lab Log
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* 🎴 CHẾ ĐỘ 2: THẺ KỸ THUẬT TINH GỌN (COMPACT CARDS) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs hover:shadow-md transition hover:border-[#0284C7]/40 cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Header: Code & Version */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/50 text-[#0284C7] font-mono font-black text-xs border border-sky-200 dark:border-sky-800">
                    {order.code}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-[#F15A24]">
                    {order.h1Version}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-black text-sm text-slate-900 dark:text-slate-100 hover:text-[#0284C7] transition line-clamp-2 leading-snug">
                  {order.title}
                </h3>

                {/* Metrics Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Nguồn Cấp:</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 truncate">{order.metrics.operatingVoltage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Nhiệt Độ:</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 truncate">{order.metrics.tempRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Đo Kiểm Pass:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{order.metrics.passRate}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-black">
                    <span className="text-slate-400">{order.stageLabel}</span>
                    <span className="text-[#0284C7]">{order.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-[#0284C7] rounded-full"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer card */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <img src={order.leadEngineer.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">{order.leadEngineer.name}</span>
                </div>
                <span className="font-bold text-slate-500">{order.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔬 DRAWER CHI TIẾT ĐƠN NGHIÊN CỨU & NHẬT KÝ LAB */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header Drawer */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#0284C7] text-white font-mono font-black text-xs">
                  {selectedOrder.code}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedOrder.categoryLabel}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-orange-100 text-[#F15A24] font-black text-[10px]">
                  {selectedOrder.h1Version}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Drawer */}
            <div className="p-5 space-y-5 flex-1">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {selectedOrder.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {selectedOrder.description}
                </p>
              </div>

              {/* Hardware Test Indicators Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Chỉ Số Đo Nghiệm Mẫu H1
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Nguồn Cung Cấp:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.metrics.operatingVoltage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Dải Nhiệt Độ:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.metrics.tempRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Sai Số / Độ Trễ:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.metrics.accuracy}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Tỷ Lệ Đo Kiểm:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{selectedOrder.metrics.passRate}</span>
                  </div>
                </div>
              </div>

              {/* Checklist Tiến Độ Nghiên Cứu */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Các Bước Nghiệm Thu Đề Tài ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <span className="text-xs font-extrabold text-[#0284C7]">{selectedOrder.progress}%</span>
                </div>
                <div className="space-y-1.5">
                  {selectedOrder.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0284C7]/40 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {}}
                        className="rounded text-[#0284C7] focus:ring-[#0284C7] w-3.5 h-3.5"
                      />
                      <span className={`text-xs font-bold ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Logs Section */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-[#0284C7]" />
                  Nhật Ký Đo Kiểm Phòng Lab (Lab Logs)
                </h4>

                <form onSubmit={handleAddLabLog} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ghi log đo điện áp, nhiệt độ, sai số..."
                    value={newLogNote}
                    onChange={e => setNewLogNote(e.target.value)}
                    className="flex-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    + Ghi Log
                  </button>
                </form>

                <div className="space-y-1.5">
                  {selectedOrder.labLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                          log.status === 'PASS' ? 'bg-emerald-500' : log.status === 'WARN' ? 'bg-amber-500' : 'bg-[#0284C7]'
                        }`} />
                        <div>
                          <span className="text-slate-400 font-mono text-[10px] block">{log.time}</span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{log.note}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        log.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trao đổi chuyên gia R&D */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
                  Ý Kiến Kỹ Thuật Hội Đồng R&D ({selectedOrder.comments.length})
                </h4>

                <div className="space-y-2">
                  {selectedOrder.comments.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                          <img src={c.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                          <span>{c.author}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pl-6">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Gửi ý kiến phân tích bo mạch, thuật toán..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="flex-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📝 MODAL TẠO ĐƠN NGHIÊN CỨU MỚI */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0284C7]" />
                Khởi Tạo Đơn Nghiên Cứu & Phát Triển (3.1)
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mã Đơn Nghiên Cứu</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-black text-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mục Tiêu RDI</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="SAMPLE_H1">Chế tạo Mẫu H1</option>
                    <option value="FIRMWARE_AI">Thuật toán & Firmware</option>
                    <option value="HARDWARE_PCB">Phần cứng & Bo mạch</option>
                    <option value="STRESS_TEST">Đo Kiểm & Thử Nghiệm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên Đề Tài / Đơn Nghiên Cứu</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nghiên cứu cảm biến AI nhận diện dị vật tốc độ cao..."
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phiên Bản Mẫu</label>
                  <input
                    type="text"
                    placeholder="VD: Proto H1-v1.0"
                    value={formVersion}
                    onChange={e => setFormVersion(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-[#F15A24]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Chủ Nhiệm Đề Tài</label>
                  <select
                    value={formLead}
                    onChange={e => setFormLead(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="TS. Hoàng Đăng Khoa">TS. Hoàng Đăng Khoa (R&D Lead)</option>
                    <option value="Vũ Đức Mạnh">Vũ Đức Mạnh (Firmware & AI)</option>
                    <option value="Phạm Thị Mỹ Linh">Phạm Thị Mỹ Linh (Hardware PCB)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mô Tả Mục Tiêu Kỹ Thuật</label>
                <textarea
                  rows={2}
                  placeholder="Yêu cầu nguồn nuôi, dải nhiệt độ, chuẩn giao tiếp..."
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold rounded-xl shadow-xs cursor-pointer transition"
                >
                  Lưu & Khởi Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
