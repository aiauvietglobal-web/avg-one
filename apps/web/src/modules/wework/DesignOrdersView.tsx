import React, { useState, useMemo } from 'react';
import {
  Palette, Sparkles, Plus, Clock, CheckCircle2, AlertCircle,
  Eye, Download, Layers, Box, Cpu, FileImage, User, Calendar,
  ArrowRight, X, MessageSquare, Send, CheckSquare, ShieldCheck, Tag,
  Search
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
  previewImage?: string;
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
    previewImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
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
    stageLabel: 'Phối màu & Chất liệu CMF',
    priority: 'HIGH',
    software: ['Adobe Illustrator', 'Photoshop 2026', 'Esko'],
    designer: {
      name: 'Lê Thảo Vy',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Packaging Designer'
    },
    progress: 65,
    dueDate: '22/03/2026',
    previewImage: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
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
    stageLabel: 'Xuất bản vẽ Bàn giao',
    priority: 'HIGH',
    software: ['Creo Parametric', 'Moldex3D', 'AutoCAD'],
    designer: {
      name: 'Vũ Hải Đăng',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Mold Design Engineer'
    },
    progress: 100,
    dueDate: '14/03/2026',
    previewImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    specs: {
      dimensions: 'Khối khuôn 2 cavity 400 x 300 x 280 mm',
      material: 'Thép NAK80 tôi cao tần, nhựa PC Bayer quang học',
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
    stageLabel: 'Lên Concept & Bố cục',
    priority: 'NORMAL',
    software: ['Adobe InDesign', 'Figma', 'Illustrator'],
    designer: {
      name: 'Nguyễn Bích Ngọc',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      role: 'Brand Specialist'
    },
    progress: 30,
    dueDate: '30/03/2026',
    previewImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
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

  const STAGE_TABS = [
    { id: 'ALL', label: 'Tất Cả Giai Đoạn' },
    { id: 'CONCEPT', label: '1. Ý Tưởng & Moodboard' },
    { id: 'MODELING_3D', label: '2. Dựng Hình 3D & CAD' },
    { id: 'CMF_COLOR', label: '3. Phối Màu & CMF' },
    { id: 'APPROVAL_RENDER', label: '4. Duyệt Mẫu Render' },
    { id: 'RELEASE_CAD', label: '5. Bàn Giao Bản Vẽ' }
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStage = activeStageFilter === 'ALL' || o.stage === activeStageFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        o.title.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q) ||
        o.designer.name.toLowerCase().includes(q);
      return matchStage && matchQuery;
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
      stageLabel: 'Lên Concept & Bố cục',
      priority: formPriority,
      software: ['SolidWorks 2026', 'KeyShot 11'],
      designer: {
        name: formDesigner,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        role: 'Designer R&D'
      },
      progress: 10,
      dueDate: formDueDate,
      previewImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
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
    <div className="space-y-3.5 w-full">
      {/* 🌟 HERO COMPACT CARD: TIÊU ĐỀ + 4 CHỈ SỐ KPI + NÚT TẠO ĐƠN */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden space-y-3.5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          {/* Cột trái: Badge, Title & Button */}
          <div className="space-y-3">
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="design-banner-border" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="50%" stopColor="#8B5CF6" />
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
                  stroke="url(#design-banner-border)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-transparent text-[11px] font-black text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Palette className="w-3.5 h-3.5 text-[#F15A24]" />
                <span>AVG DESIGN HUB • THIẾT KẾ R&D (3.2)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2">
                <span>QUẢN LÝ ĐƠN HÀNG</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">THIẾT KẾ</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-xl shadow-sm hover:shadow-md transition transform active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> Tạo Đơn Hàng Mới
              </button>
            </div>
          </div>

          {/* Cột phải: 4 Thẻ KPI Tinh Gọn (Mini Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 xl:border-l xl:border-slate-200 dark:xl:border-slate-800 xl:pl-5">
            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#F15A24] shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Tổng đơn</div>
                <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">{stats.total}</div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-[#0284C7] shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Dựng 3D/CAD</div>
                <div className="text-lg font-black text-sky-600 dark:text-sky-400 leading-tight">{stats.in3D}</div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                <FileImage className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Duyệt CMF</div>
                <div className="text-lg font-black text-purple-600 dark:text-purple-400 leading-tight">{stats.inReview}</div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Bàn giao</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">{stats.completed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh Tích Hợp: Giai Đoạn (Pipeline Tabs) + Tìm Kiếm Nhanh */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {STAGE_TABS.map(stage => {
              const count = stage.id === 'ALL' ? orders.length : orders.filter(o => o.stage === stage.id).length;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageFilter(stage.id)}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    activeStageFilter === stage.id
                      ? 'bg-[#F15A24] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#F15A24]'
                  }`}
                >
                  <span>{stage.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    activeStageFilter === stage.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-60 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã, tên thiết kế..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F15A24] font-medium"
            />
          </div>
        </div>
      </div>

      {/* 🎨 DANH SÁCH THẺ DỰ ÁN THIẾT KẾ (MỞ RỘNG TOÀN DIỆN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3.5">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="group bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs hover:shadow-md transition-all duration-200 hover:border-[#F15A24]/40 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-3">
              {/* Header card: Code, Category, Priority */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] font-mono font-black text-xs border border-orange-200 dark:border-orange-800">
                    {order.code}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {order.categoryLabel}
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  order.priority === 'URGENT'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                }`}>
                  {order.priority === 'URGENT' ? 'Khẩn cấp' : 'Ưu tiên cao'}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  onClick={() => setSelectedOrder(order)}
                  className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-[#F15A24] transition cursor-pointer leading-snug"
                >
                  {order.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {order.description}
                </p>
              </div>

              {/* Visual Preview (Thumbnail Mockup) */}
              {order.previewImage && (
                <div
                  onClick={() => setSelectedOrder(order)}
                  className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <img
                    src={order.previewImage}
                    alt={order.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {order.software.map(sw => (
                        <span key={sw} className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#F15A24]" /> Xem bản mẫu
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-black">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F15A24]" />
                    {order.stageLabel}
                  </span>
                  <span className="text-[#F15A24]">{order.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-[#F15A24] rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>

              {/* Specs pill tags */}
              <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">Quy Cách:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 truncate block">{order.specs.dimensions || 'Tiêu chuẩn'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">Định Dạng File:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 truncate block">{order.specs.fileFormat || 'STEP / CAD'}</span>
                </div>
              </div>
            </div>

            {/* Footer card: Designer, DueDate, and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={order.designer.avatar}
                  alt={order.designer.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#F15A24]"
                />
                <div>
                  <span className="font-black text-slate-800 dark:text-slate-200 block text-[11px] leading-tight">
                    {order.designer.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    {order.designer.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">Hạn Bàn Giao</span>
                  <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#F15A24]" />
                    {order.dueDate}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 rounded-xl bg-orange-50 hover:bg-[#F15A24] text-[#F15A24] hover:text-white transition cursor-pointer shadow-2xs"
                  title="Xem hồ sơ thiết kế"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 DRAWER CHI TIẾT ĐƠN THIẾT KẾ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header Drawer */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-[#F15A24] text-white font-mono font-black text-xs shadow-xs">
                  {selectedOrder.code}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedOrder.categoryLabel}
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

              {/* Large Image Preview */}
              {selectedOrder.previewImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={selectedOrder.previewImage}
                    alt={selectedOrder.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Specs Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Thông Số & Bản Vẽ Kỹ Thuật
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block">Kích Thước:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Vật Liệu Khuyên Dùng:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Mã Màu / Hoàn Thiện:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.colorCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Định Dạng Bàn Giao:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.specs.fileFormat}</span>
                  </div>
                </div>
              </div>

              {/* Checklist công việc thiết kế */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Các Bước Thực Hiện ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <span className="text-xs font-extrabold text-[#F15A24]">{selectedOrder.progress}%</span>
                </div>
                <div className="space-y-2">
                  {selectedOrder.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#F15A24]/40 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {}}
                        className="rounded text-[#F15A24] focus:ring-[#F15A24] w-4 h-4"
                      />
                      <span className={`text-xs font-bold ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trao đổi phản hồi duyệt mẫu */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#F15A24]" />
                  Trao Đổi Duyệt Mẫu & Sửa Đổi ({selectedOrder.comments.length})
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
                    placeholder="Gửi ý kiến duyệt màu, điều chỉnh kết cấu 3D..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="flex-1 p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi
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
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#F15A24]" />
                Tạo Đơn Hàng Thiết Kế R&D Mới
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mã Đơn Thiết Kế</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-black text-[#F15A24]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Loại Thiết Kế</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
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
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nhà Thiết Kế Phụ Trách</label>
                  <select
                    value={formDesigner}
                    onChange={e => setFormDesigner(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="Trần Minh Trí">Trần Minh Trí (3D Senior)</option>
                    <option value="Lê Thảo Vy">Lê Thảo Vy (Packaging)</option>
                    <option value="Vũ Hải Đăng">Vũ Hải Đăng (Mold Engineer)</option>
                    <option value="Nguyễn Bích Ngọc">Nguyễn Bích Ngọc (Brand)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hạn Bàn Giao Mẫu</label>
                  <input
                    type="text"
                    value={formDueDate}
                    onChange={e => setFormDueDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mô Tả Yêu Cầu Thiết Kế</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả phong cách thiết kế, kích thước sơ bộ, tiêu chuẩn kháng nước/kháng bụi..."
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-extrabold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-xl shadow-md cursor-pointer transition"
                >
                  Lưu & Khởi Tạo Thiết Kế
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
