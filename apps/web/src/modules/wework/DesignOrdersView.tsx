import React, { useState, useMemo } from 'react';
import {
  Palette, Sparkles, Plus, Clock, CheckCircle2, AlertCircle,
  Eye, Download, Layers, Box, Cpu, FileImage, User, Calendar,
  ArrowRight, X, MessageSquare, Send, CheckSquare, ShieldCheck, Tag,
  Search, LayoutList, LayoutGrid, FileText, ChevronRight, SlidersHorizontal
} from 'lucide-react';

export interface DesignOrder {
  id: string;
  code: string;
  title: string;
  category: '3D_MODEL' | 'PACKAGING_CMF' | 'MOLD_DESIGN' | 'BRAND_IDENTITY';
  categoryLabel: string;
  stage: 'CONCEPT' | 'MODELING_3D' | 'CMF_COLOR' | 'APPROVAL_RENDER' | 'RELEASE_CAD';
  stageLabel: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  software: string[];
  designer: {
    name: string;
    avatar: string;
    role: string;
  };
  progress: number;
  dueDate: string;
  specs: {
    dimensions?: string;
    material?: string;
    colorCode?: string;
    fileFormat?: string;
  };
  description: string;
  tasks: { id: string; text: string; done: boolean }[];
  comments: { id: string; author: string; avatar: string; time: string; text: string }[];
}

const INITIAL_DESIGN_ORDERS: DesignOrder[] = [
  {
    id: 'des-1',
    code: 'TK-2026-301',
    title: 'Thiết kế kiểu dáng vỏ nhôm Anodized cho Bộ điều khiển AVG Controller X1',
    category: '3D_MODEL',
    categoryLabel: 'Kiểu dáng 3D Công nghiệp',
    stage: 'APPROVAL_RENDER',
    stageLabel: 'Duyệt Render 4K',
    priority: 'URGENT',
    software: ['SolidWorks 2026', 'KeyShot 11', 'Blender'],
    designer: {
      name: 'Trần Minh Trí',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      role: 'Chuyên viên 3D Senior'
    },
    progress: 85,
    dueDate: '18/03/2026',
    specs: {
      dimensions: '240 x 160 x 45 mm',
      material: 'Hợp kim nhôm 6061 phay CNC',
      colorCode: 'Space Gray & Cam AVG #F15A24',
      fileFormat: 'STEP, SLDPRT, OBJ, DWG'
    },
    description: 'Thiết kế tối ưu khí động học và giải nhiệt thụ động cho khối vi xử lý, tích hợp khe cắm DIN-rail tủ điện chuẩn công nghiệp.',
    tasks: [
      { id: 't1', text: 'Khảo sát layout linh kiện bo mạch PCB từ RDI', done: true },
      { id: 't2', text: 'Dựng khung vỏ 3D và bố trí cổng giao tiếp I/O', done: true },
      { id: 't3', text: 'Render phối cảnh 3D góc nhìn thực tế xưởng', done: true },
      { id: 't4', text: 'Xuất bản vẽ 2D dung sai gửi nhà máy CNC', done: false }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Nguyễn Văn Quản Lý',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        time: 'Hôm nay 09:30',
        text: 'Mẫu render ánh sáng rất tốt! Vui lòng bo cong thêm 1mm ở gờ tản nhiệt trên để giảm cảm giác cấn khi lắp đặt.'
      }
    ]
  },
  {
    id: 'des-2',
    code: 'TK-2026-302',
    title: 'Thiết kế bao bì hộp sản phẩm CMF cao cấp cho Dòng Cảm biến Smart Sensor AVG',
    category: 'PACKAGING_CMF',
    categoryLabel: 'Bao bì & CMF',
    stage: 'CMF_COLOR',
    stageLabel: 'Phối màu & CMF',
    priority: 'HIGH',
    software: ['Adobe Illustrator', 'Photoshop 2026', 'Esko'],
    designer: {
      name: 'Lê Thảo Vy',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Packaging Designer'
    },
    progress: 65,
    dueDate: '22/03/2026',
    specs: {
      dimensions: '180 x 120 x 60 mm',
      material: 'Carton sóng định lượng 350gsm, cán mờ',
      colorCode: 'Pantone Cool Gray 11C + Pantone 1505C',
      fileFormat: 'AI, PDF Print Ready, 3D Dieline'
    },
    description: 'Hộp nắp gài nam châm chống sốc đạt chuẩn drop test 1.2m, in offset 4 màu phủ UV định hình logo AVG One.',
    tasks: [
      { id: 't1', text: 'Tạo khuôn bế Dieline theo khay xốp EVA', done: true },
      { id: 't2', text: 'Thiết kế market đồ họa mặt trước và tem phụ tiếng Việt', done: true },
      { id: 't3', text: 'In proof mẫu màu ký duyệt với nhà in', done: false }
    ],
    comments: []
  },
  {
    id: 'des-3',
    code: 'TK-2026-303',
    title: 'Hồ sơ thiết kế khuôn ép nhựa nắp đậy quang học cho Cụm Sensor Laser',
    category: 'MOLD_DESIGN',
    categoryLabel: 'Khuôn mẫu nhựa',
    stage: 'RELEASE_CAD',
    stageLabel: 'Bàn giao Bản vẽ CAD',
    priority: 'HIGH',
    software: ['Creo Parametric', 'Moldex3D', 'AutoCAD'],
    designer: {
      name: 'Vũ Hải Đăng',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Mold Design Engineer'
    },
    progress: 100,
    dueDate: '14/03/2026',
    specs: {
      dimensions: 'Khối khuôn 2 cavity 400 x 300 x 280 mm',
      material: 'Thép NAK80 tôi cao tần, nhựa PC Bayer',
      colorCode: 'Nhựa trong suốt độ truyền quang 92%',
      fileFormat: 'STP, IGS, 2D PDF Bàn giao'
    },
    description: 'Đã hoàn tất phân tích dòng chảy nhựa (Mold Flow), tối ưu góc rút khuôn và hệ thống đẩy chốt tự động.',
    tasks: [
      { id: 't1', text: 'Mô phỏng dòng chảy và co ngót vật liệu', done: true },
      { id: 't2', text: 'Thiết kế hệ thống đường nước làm mát khuôn', done: true },
      { id: 't3', text: 'Nghiệm thu bản vẽ kỹ thuật và ký bàn giao xưởng khuôn', done: true }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Đặng Tuấn Anh (Xưởng Cơ khí)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        time: 'Hôm qua 15:45',
        text: 'Xưởng đã tiếp nhận bộ file STEP và bản vẽ 2D. Dự kiến lên máy phay CNC từ thứ Hai tuần tới.'
      }
    ]
  },
  {
    id: 'des-4',
    code: 'TK-2026-304',
    title: 'Bộ Catalog Kỹ thuật & Nhận diện Series Sản phẩm Tự Động Hóa 2026',
    category: 'BRAND_IDENTITY',
    categoryLabel: 'Catalog & HDSD',
    stage: 'CONCEPT',
    stageLabel: 'Ý tưởng & Concept',
    priority: 'NORMAL',
    software: ['Adobe InDesign', 'Figma', 'Illustrator'],
    designer: {
      name: 'Nguyễn Bích Ngọc',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      role: 'Brand Specialist'
    },
    progress: 30,
    dueDate: '30/03/2026',
    specs: {
      dimensions: 'Khổ A4 ngang (297 x 210 mm), 48 trang',
      material: 'Giấy Couche 250gsm bìa, 150gsm ruột',
      colorCode: 'Nhận diện AVG One 2026',
      fileFormat: 'INDD, PDF E-Catalog tương tác'
    },
    description: 'Biên soạn hướng dẫn lắp đặt sơ đồ đấu nối và thông số kỹ thuật chuẩn hóa phục vụ thị trường trong nước và xuất khẩu.',
    tasks: [
      { id: 't1', text: 'Thu thập bảng thông số kỹ thuật từ Bộ phận 3.1 RDI', done: true },
      { id: 't2', text: 'Chụp ảnh macro chi tiết mạch và hoàn thiện layout trang đôi', done: false },
      { id: 't3', text: 'Soát lỗi chính tả thuật ngữ kỹ thuật và dịch tiếng Anh', done: false }
    ],
    comments: []
  }
];

export const DesignOrdersView: React.FC = () => {
  const [orders, setOrders] = useState<DesignOrder[]>(INITIAL_DESIGN_ORDERS);
  const [activeStageFilter, setActiveStageFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedOrder, setSelectedOrder] = useState<DesignOrder | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  // New Order Form state
  const [formCode, setFormCode] = useState(`TK-2026-${Math.floor(305 + Math.random() * 50)}`);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<DesignOrder['category']>('3D_MODEL');
  const [formPriority, setFormPriority] = useState<DesignOrder['priority']>('HIGH');
  const [formDesigner, setFormDesigner] = useState('Trần Minh Trí');
  const [formDueDate, setFormDueDate] = useState('25/03/2026');
  const [formDesc, setFormDesc] = useState('');

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: orders.length,
      in3D: orders.filter(o => o.stage === 'MODELING_3D' || o.stage === 'CONCEPT').length,
      inReview: orders.filter(o => o.stage === 'APPROVAL_RENDER' || o.stage === 'CMF_COLOR').length,
      completed: orders.filter(o => o.stage === 'RELEASE_CAD' || o.progress === 100).length
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStage = activeStageFilter === 'ALL' || o.stage === activeStageFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        o.code.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.designer.name.toLowerCase().includes(q) ||
        o.categoryLabel.toLowerCase().includes(q);
      return matchStage && matchSearch;
    });
  }, [orders, activeStageFilter, searchQuery]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const catLabels: Record<DesignOrder['category'], string> = {
      '3D_MODEL': 'Kiểu dáng 3D Công nghiệp',
      'PACKAGING_CMF': 'Bao bì & CMF',
      'MOLD_DESIGN': 'Khuôn mẫu nhựa',
      'BRAND_IDENTITY': 'Catalog & HDSD'
    };

    const newOrder: DesignOrder = {
      id: `des-${Date.now()}`,
      code: formCode,
      title: formTitle.trim(),
      category: formCategory,
      categoryLabel: catLabels[formCategory],
      stage: 'CONCEPT',
      stageLabel: 'Ý tưởng & Concept',
      priority: formPriority,
      software: ['SolidWorks 2026', 'KeyShot 11'],
      designer: {
        name: formDesigner,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        role: 'Designer R&D'
      },
      progress: 10,
      dueDate: formDueDate,
      specs: {
        dimensions: 'Theo tiêu chuẩn sản phẩm AVG',
        material: 'Vật liệu quy định',
        colorCode: 'Cam AVG #F15A24 / Xám',
        fileFormat: 'STEP, SLDPRT, PDF'
      },
      description: formDesc.trim(),
      tasks: [
        { id: `t-${Date.now()}-1`, text: 'Khảo sát đề bài thiết kế', done: true },
        { id: `t-${Date.now()}-2`, text: 'Lên phương án layout 3D', done: false }
      ],
      comments: []
    };

    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    setFormTitle('');
    setFormDesc('');
    setFormCode(`TK-2026-${Math.floor(350 + Math.random() * 50)}`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedOrder) return;

    const newC = {
      id: `c-${Date.now()}`,
      author: 'Nguyễn Văn Quản Lý',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
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
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#F15A24] shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                ĐƠN HÀNG THIẾT KẾ
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-[#F15A24]/10 text-[#F15A24] text-[10px] font-black uppercase">
                3.2 - THIẾT KẾ
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Kiểu dáng 3D • Kết cấu CAD • Bao bì CMF • Bản vẽ khuôn mẫu sản xuất
            </p>
          </div>
        </div>

        {/* Center: 4 Compact KPI Metrics (Dạng Chip Đo Lường Khoa Học) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase">Tổng đơn:</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">{stats.total}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60">
            <span className="text-[10px] font-black text-sky-700 dark:text-sky-400 uppercase">Dựng 3D:</span>
            <span className="text-sm font-black text-sky-700 dark:text-sky-300">{stats.in3D}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
            <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase">Duyệt CMF:</span>
            <span className="text-sm font-black text-purple-700 dark:text-purple-300">{stats.inReview}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase">Bàn giao:</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">{stats.completed}</span>
          </div>
        </div>

        {/* Right: Action Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-xl shadow-xs transition transform active:scale-95 text-xs whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Tạo Đơn Thiết Kế Mới
        </button>
      </div>

      {/* 🧭 WORKFLOW STEPPER & SCIENTIFIC CONTROL TOOLBAR */}
      <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stage Filter Chips (Chuỗi quy trình 5 bước liền mạch) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'Tất Cả' },
            { id: 'CONCEPT', label: '1. Ý Tưởng & Moodboard' },
            { id: 'MODELING_3D', label: '2. Dựng Hình 3D' },
            { id: 'CMF_COLOR', label: '3. Phối Màu CMF' },
            { id: 'APPROVAL_RENDER', label: '4. Duyệt Render' },
            { id: 'RELEASE_CAD', label: '5. Bàn Giao CAD' }
          ].map(stage => (
            <button
              key={stage.id}
              onClick={() => setActiveStageFilter(stage.id)}
              className={`px-3 py-1 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer ${
                activeStageFilter === stage.id
                  ? 'bg-[#F15A24] text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* Search & View Switcher (Table / Cards) */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã TK, tên đơn, designer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F15A24] font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-[#F15A24] dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Xem Bảng Kỹ Thuật (Khoa học nhất)"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-white dark:bg-slate-700 text-[#F15A24] dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Xem Dạng Thẻ Tinh Gọn"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 📊 CHẾ ĐỘ 1: BẢNG DỮ LIỆU KỸ THUẬT (SCIENTIFIC TECHNICAL TABLE - ƯU TIÊN MẶC ĐỊNH) */}
      {viewMode === 'table' ? (
        <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[10px]">
                  <th className="p-3.5">Mã Bản Vẽ</th>
                  <th className="p-3.5">Tên Đơn Hàng & Quy Cách Kỹ Thuật</th>
                  <th className="p-3.5">Phân Loại</th>
                  <th className="p-3.5">Giai Đoạn Quy Trình</th>
                  <th className="p-3.5">Designer</th>
                  <th className="p-3.5 text-center">Tiến Độ</th>
                  <th className="p-3.5">Hạn Chót</th>
                  <th className="p-3.5 text-right">Hồ Sơ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      Không tìm thấy đơn hàng thiết kế phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-orange-50/40 dark:hover:bg-slate-800/50 transition cursor-pointer group"
                    >
                      {/* Mã đơn */}
                      <td className="p-3.5 font-mono font-black text-[#F15A24] dark:text-orange-400 whitespace-nowrap">
                        {order.code}
                      </td>

                      {/* Tiêu đề & Thông số */}
                      <td className="p-3.5 max-w-xs md:max-w-md">
                        <div className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#F15A24] transition leading-snug">
                          {order.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                            {order.specs.dimensions}
                          </span>
                          <span className="truncate">{order.specs.material}</span>
                        </div>
                      </td>

                      {/* Phân loại & Tool */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block text-xs">
                          {order.categoryLabel}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {order.software.slice(0, 2).join(', ')}
                        </span>
                      </td>

                      {/* Giai đoạn */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          order.stage === 'RELEASE_CAD'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : order.stage === 'APPROVAL_RENDER'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                            : order.stage === 'CMF_COLOR'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400'
                            : 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {order.stageLabel}
                        </span>
                      </td>

                      {/* Designer */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.designer.avatar}
                            alt=""
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                              {order.designer.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block leading-none">
                              {order.designer.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tiến độ */}
                      <td className="p-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-[#F15A24] rounded-full"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 w-7 text-right">
                            {order.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Hạn chót */}
                      <td className="p-3.5 whitespace-nowrap font-bold text-slate-600 dark:text-slate-300 text-xs">
                        {order.dueDate}
                      </td>

                      {/* Thao tác */}
                      <td className="p-3.5 whitespace-nowrap text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#F15A24] hover:text-white font-extrabold text-[11px] text-slate-700 dark:text-slate-200 transition cursor-pointer"
                        >
                          Chi Tiết
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
        /* 🎴 CHẾ ĐỘ 2: THẺ KỸ THUẬT TINH GỌN (COMPACT ENGINEERING CARDS) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs hover:shadow-md transition hover:border-[#F15A24]/40 cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Header card: Code & Stage */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/50 text-[#F15A24] font-mono font-black text-xs border border-orange-200 dark:border-orange-800">
                    {order.code}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {order.stageLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-black text-sm text-slate-900 dark:text-slate-100 hover:text-[#F15A24] transition line-clamp-2 leading-snug">
                  {order.title}
                </h3>

                {/* Tech Specs Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Quy Cách:</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{order.specs.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Vật Liệu:</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{order.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">File Xuất:</span>
                    <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-200">{order.specs.fileFormat}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-black">
                    <span className="text-slate-400">Tiến Độ Bản Vẽ</span>
                    <span className="text-[#F15A24]">{order.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-[#F15A24] rounded-full"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer card */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <img src={order.designer.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">{order.designer.name}</span>
                </div>
                <span className="font-bold text-slate-500">{order.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔍 DRAWER CHI TIẾT ĐƠN THIẾT KẾ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header Drawer */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#F15A24] text-white font-mono font-black text-xs">
                  {selectedOrder.code}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedOrder.categoryLabel}
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

              {/* Specs Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Bản Vẽ & Thông Số Kỹ Thuật
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Kích Thước:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Vật Liệu:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Mã Màu / CMF:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.colorCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Định Dạng Bàn Giao:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.fileFormat}</span>
                  </div>
                </div>
              </div>

              {/* Checklist công việc thiết kế */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Các Bước Thực Hiện ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <span className="text-xs font-extrabold text-[#F15A24]">{selectedOrder.progress}%</span>
                </div>
                <div className="space-y-1.5">
                  {selectedOrder.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#F15A24]/40 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {}}
                        className="rounded text-[#F15A24] focus:ring-[#F15A24] w-3.5 h-3.5"
                      />
                      <span className={`text-xs font-bold ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trao đổi phản hồi duyệt mẫu */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#F15A24]" />
                  Phản Hồi Duyệt Mẫu ({selectedOrder.comments.length})
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
                    placeholder="Gửi ý kiến duyệt màu, điều chỉnh kết cấu..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="flex-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📝 MODAL TẠO ĐƠN THIẾT KẾ MỚI */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#F15A24]" />
                Tạo Đơn Hàng Thiết Kế R&D Mới (3.2)
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
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mã Đơn Thiết Kế</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-black text-[#F15A24]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Loại Thiết Kế</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="3D_MODEL">Kiểu dáng 3D Công nghiệp</option>
                    <option value="PACKAGING_CMF">Bao bì & CMF</option>
                    <option value="MOLD_DESIGN">Khuôn mẫu nhựa</option>
                    <option value="BRAND_IDENTITY">Catalog & HDSD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên Đơn Hàng Thiết Kế</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thiết kế kiểu dáng vỏ nhôm Anodized cho..."
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nhà Thiết Kế Phụ Trách</label>
                  <select
                    value={formDesigner}
                    onChange={e => setFormDesigner(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="Trần Minh Trí">Trần Minh Trí (3D Senior)</option>
                    <option value="Lê Thảo Vy">Lê Thảo Vy (Packaging)</option>
                    <option value="Vũ Hải Đăng">Vũ Hải Đăng (Mold Engineer)</option>
                    <option value="Nguyễn Bích Ngọc">Nguyễn Bích Ngọc (Brand)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hạn Bàn Giao</label>
                  <input
                    type="text"
                    value={formDueDate}
                    onChange={e => setFormDueDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mô Tả Yêu Cầu Kỹ Thuật</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả phong cách, kích thước, tiêu chuẩn kháng nước..."
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
                  className="px-4 py-2 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-xl shadow-xs cursor-pointer transition"
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
