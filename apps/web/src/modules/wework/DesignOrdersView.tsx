import React, { useState, useMemo } from 'react';
import {
  Palette, Sparkles, Plus, Clock, CheckCircle2, AlertCircle,
  Eye, Download, Layers, Box, Cpu, FileImage, User, Calendar,
  ArrowRight, X, MessageSquare, Send, CheckSquare, ShieldCheck, Tag,
  Search, ExternalLink, Filter, ChevronDown
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
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<DesignOrder | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString('vi-VN'));
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
      const matchStage = activeStageFilter === 'ALL' ||
        (activeStageFilter === '3D' && (o.stage === 'MODELING_3D' || o.stage === 'CONCEPT')) ||
        (activeStageFilter === 'CMF' && (o.stage === 'APPROVAL_RENDER' || o.stage === 'CMF_COLOR')) ||
        (activeStageFilter === 'COMPLETED' && (o.stage === 'RELEASE_CAD' || o.progress === 100)) ||
        o.stage === activeStageFilter;
      const matchCategory = filterCategory === 'ALL' || o.category === filterCategory;
      const matchPriority = filterPriority === 'ALL' || o.priority === filterPriority;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        o.title.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q) ||
        o.designer.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q);
      return matchStage && matchCategory && matchPriority && matchQuery;
    });
  }, [orders, activeStageFilter, filterCategory, filterPriority, searchQuery]);

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
        name: formDesigner || 'Trần Minh Trí',
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
      description: formDesc.trim() || 'Dự án nghiên cứu tạo mẫu kiểu dáng công nghiệp theo chỉ đạo AVG One.',
      tasks: [
        { id: `t-${Date.now()}-1`, text: 'Khảo sát đề bài thiết kế', done: true },
        { id: `t-${Date.now()}-2`, text: 'Lên phương án layout 3D', done: false }
      ],
      comments: [
        {
          id: `c-${Date.now()}-1`,
          author: 'Ban Giám Đốc (CEO)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          time: 'Vừa xong',
          text: `Đã phê duyệt khởi tạo đơn hàng thiết kế ${formCode}. Yêu cầu hoàn thành đúng tiến độ!`
        }
      ]
    };

    setOrders([newOrder, ...orders]);
    setFormTitle('');
    setFormDesc('');
    const nextCode = `TK-2026-${Math.floor(350 + Math.random() * 50)}`;
    setFormCode(nextCode);
    setDispatchToast(`✨ Đã khởi tạo thành công đơn hàng thiết kế: ${newOrder.code} - "${newOrder.title}"!`);
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
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* 🔮 Header & Live Sync Banner - Đồng Bộ Thiết Kế & Animation Chuẩn AVG One */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-5 sm:p-6 shadow-xs relative overflow-hidden space-y-5">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F15A24]/10 dark:bg-[#F15A24]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Title & Brand Context Hierarchy */}
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-black text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
              <span>AVG WEWORK · QUY TRÌNH 13 BƯỚC · HỘP 3.2</span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>TIẾN ĐỘ ĐƠN HÀNG THIẾT KẾ</span>
                <span className="text-sm sm:text-base font-bold text-slate-400 dark:text-slate-500 font-mono">(HỘP 3.2)</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-2xl mt-0.5">
                Theo dõi phân kỳ thực hiện, thời hạn bàn giao (SLA) và kiểm duyệt kỹ thuật mô hình 3D/CAD & mẫu CMF.
              </p>
            </div>
          </div>

          {/* Action Toolbar on Right */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Sync</span>
            </div>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open_design_workspace'));
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#0077B6] via-[#0284C7] to-[#00A8E8] hover:from-[#005f92] hover:to-[#0284C7] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              title="Mở Không gian làm việc chi tiết nghiệp vụ Hộp 3.2 – Thiết Kế"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Không Gian Nghiệp Vụ (3.2)</span>
            </button>
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
              title="Kho Lưu Trữ Drive Thiết Kế"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Kho Drive</span>
            </a>
          </div>
        </div>

        {/* 📊 Executive Pipeline & Metrics Grid - Bố cục Chuẩn Khoa Học Công Nghiệp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 pt-1 relative z-10">
          {/* Card 1: Tổng Đơn Hàng (Portfolio Master Card) */}
          <div
            onClick={() => setActiveStageFilter('ALL')}
            className={`rounded-2xl p-4 transition-all duration-200 cursor-pointer text-left relative overflow-hidden group ${
              activeStageFilter === 'ALL'
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-md ring-2 ring-[#0284C7]/50'
                : 'bg-slate-900/90 dark:bg-slate-800 hover:bg-slate-900 text-white shadow-2xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Tổng Danh Mục
              </span>
              <Layers className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-white">{stats.total}</span>
              <span className="text-xs font-bold text-slate-400">Đơn thiết kế</span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold">Toàn bộ phân kỳ</span>
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-black">100% Khối lượng</span>
            </div>
          </div>

          {/* Card 2: Bước 1 - Dựng 3D / CAD */}
          <div
            onClick={() => setActiveStageFilter(activeStageFilter === '3D' ? 'ALL' : '3D')}
            className={`bg-white dark:bg-slate-800/90 rounded-2xl p-4 border transition-all duration-200 cursor-pointer text-left group hover:-translate-y-0.5 ${
              activeStageFilter === '3D'
                ? 'border-[#0284C7] ring-2 ring-[#0284C7]/40 shadow-md bg-sky-50/40 dark:bg-sky-950/20'
                : 'border-slate-200/90 dark:border-slate-700/80 hover:border-sky-300 shadow-2xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-sky-100 dark:bg-sky-950/60 text-[#0284C7]">
                  BƯỚC 1
                </span>
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-700 dark:text-slate-200">
                  Dựng 3D / CAD
                </span>
              </div>
              <Cpu className="w-4 h-4 text-[#0284C7] group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-[#0284C7] dark:text-sky-300">{stats.in3D}</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                ({Math.round((stats.in3D / (stats.total || 1)) * 100)}%)
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0284C7] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((stats.in3D / (stats.total || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Concept & Tạo hình 3D</span>
                <span className="font-bold text-[#0284C7]">{stats.in3D} đơn</span>
              </div>
            </div>
          </div>

          {/* Card 3: Bước 2 - Duyệt Mẫu CMF */}
          <div
            onClick={() => setActiveStageFilter(activeStageFilter === 'CMF' ? 'ALL' : 'CMF')}
            className={`bg-white dark:bg-slate-800/90 rounded-2xl p-4 border transition-all duration-200 cursor-pointer text-left group hover:-translate-y-0.5 ${
              activeStageFilter === 'CMF'
                ? 'border-purple-500 ring-2 ring-purple-500/40 shadow-md bg-purple-50/40 dark:bg-purple-950/20'
                : 'border-slate-200/90 dark:border-slate-700/80 hover:border-purple-300 shadow-2xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  BƯỚC 2
                </span>
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-700 dark:text-slate-200">
                  Duyệt Mẫu CMF
                </span>
              </div>
              <Palette className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-300">{stats.inReview}</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                ({Math.round((stats.inReview / (stats.total || 1)) * 100)}%)
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((stats.inReview / (stats.total || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Màu sắc & Render vật liệu</span>
                <span className="font-bold text-purple-600">{stats.inReview} đơn</span>
              </div>
            </div>
          </div>

          {/* Card 4: Bước 3 - Đã Bàn Giao CAD */}
          <div
            onClick={() => setActiveStageFilter(activeStageFilter === 'COMPLETED' ? 'ALL' : 'COMPLETED')}
            className={`bg-white dark:bg-slate-800/90 rounded-2xl p-4 border transition-all duration-200 cursor-pointer text-left group hover:-translate-y-0.5 ${
              activeStageFilter === 'COMPLETED'
                ? 'border-emerald-500 ring-2 ring-emerald-500/40 shadow-md bg-emerald-50/40 dark:bg-emerald-950/20'
                : 'border-slate-200/90 dark:border-slate-700/80 hover:border-emerald-300 shadow-2xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  HOÀN THÀNH
                </span>
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-700 dark:text-slate-200">
                  Đã Bàn Giao CAD
                </span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-300">{stats.completed}</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                ({Math.round((stats.completed / (stats.total || 1)) * 100)}%)
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((stats.completed / (stats.total || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Nghiệm thu sẵn sàng SX</span>
                <span className="font-bold text-emerald-600">{stats.completed} đơn</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 Dispatcher Form Card - Hộp Khởi Tạo Đơn Hàng Thiết Kế (Khi nào ấn mới mở ra) */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all duration-300">
        {/* Clickable Header Bar */}
        <div
          onClick={() => setIsCreateOpen(!isCreateOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsCreateOpen(!isCreateOpen); }}
          className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-colors duration-200 select-none ${
            isCreateOpen
              ? 'border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'
              : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isCreateOpen 
                ? 'bg-[#F15A24] text-white shadow-xs' 
                : 'bg-orange-50 dark:bg-orange-950/50 text-[#F15A24] border border-orange-200/60 dark:border-orange-800/60'
            }`}>
              {isCreateOpen ? <Send className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  Khởi Tạo Đơn Hàng Thiết Kế & Bản Vẽ Mới
                </h3>
                <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isCreateOpen
                    ? 'bg-orange-100 text-[#F15A24] dark:bg-orange-950/60 dark:text-orange-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {isCreateOpen ? 'Đang mở' : 'Nhấn để mở'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Quyền hạn: Thiết Kế & R&D (3.2 / Design Lead)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5 shadow-2xs pointer-events-none"
            >
              <span>{isCreateOpen ? 'Thu gọn' : 'Mở form khởi tạo'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCreateOpen ? 'rotate-180 text-[#F15A24]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Collapsible Form Body */}
        {isCreateOpen && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {dispatchToast && (
              <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-[#F15A24] dark:text-orange-300 text-xs font-bold flex items-center justify-between">
                <span>{dispatchToast}</span>
                <button onClick={() => setDispatchToast(null)} className="text-xs font-black cursor-pointer">✕</button>
              </div>
            )}

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mã Đơn Hàng
                  </label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Designer Phụ Trách
                  </label>
                  <input
                    type="text"
                    value={formDesigner}
                    onChange={(e) => setFormDesigner(e.target.value)}
                    placeholder="VD: Trần Minh Trí..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phân Loại Thiết Kế
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
                  >
                    <option value="3D_MODEL">Kiểu dáng 3D Công nghiệp</option>
                    <option value="PACKAGING_CMF">Bao bì & CMF</option>
                    <option value="MOLD_DESIGN">Khuôn mẫu nhựa</option>
                    <option value="BRAND_IDENTITY">Catalog & HDSD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mức Độ Ưu Tiên
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
                  >
                    <option value="URGENT">🟠 Khẩn Cấp (High)</option>
                    <option value="HIGH">🟡 Ưu Tiên Cao (Medium)</option>
                    <option value="NORMAL">🟢 Bình Thường (Normal)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tiêu Đề Thiết Kế / Tóm Tắt Yêu Cầu
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Nhập tiêu đề hoặc tóm tắt yêu cầu thiết kế kiểu dáng..."
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Yêu Cầu Kỹ Thuật Chi Tiết & Quy Cách 3D / CMF
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Nhập chi tiết yêu cầu vật liệu, kích thước, định dạng file STEP/CAD, tone màu Pantone..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Đóng lại
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F15A24] hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 cursor-pointer transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Khởi Tạo Đơn Hàng Thiết Kế</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 🔍 Search & Filters Bar - Đồng Bộ Bố Cục Thông Điệp Điều Hành */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung, mã đơn, designer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 shadow-xs font-medium"
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
            <option value="CONCEPT">1. Ý Tưởng & Moodboard</option>
            <option value="MODELING_3D">2. Dựng Hình 3D & CAD</option>
            <option value="CMF_COLOR">3. Phối Màu & CMF</option>
            <option value="APPROVAL_RENDER">4. Duyệt Mẫu Render</option>
            <option value="RELEASE_CAD">5. Bàn Giao Bản Vẽ</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-xs cursor-pointer"
          >
            <option value="ALL">Tất cả mức ưu tiên</option>
            <option value="URGENT">Khẩn cấp</option>
            <option value="HIGH">Ưu tiên cao</option>
            <option value="NORMAL">Bình thường</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-xs cursor-pointer"
          >
            <option value="ALL">Tất cả phân loại</option>
            <option value="3D_MODEL">Kiểu dáng 3D</option>
            <option value="PACKAGING_CMF">Bao bì & CMF</option>
            <option value="MOLD_DESIGN">Khuôn mẫu nhựa</option>
            <option value="BRAND_IDENTITY">Catalog & HDSD</option>
          </select>
        </div>
      </div>

      {/* 📋 Section Title: Danh Sách Đơn Hàng Thiết Kế */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Danh Sách Đơn Hàng Thiết Kế</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {filteredOrders.length} / {orders.length}
          </span>
        </h3>
      </div>

      {/* 🎨 DANH SÁCH THẺ DỰ ÁN THIẾT KẾ (MỞ RỘNG TOÀN DIỆN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="group bg-white/95 dark:bg-slate-900/95 rounded-[22px] border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-lg transition-all duration-200 hover:border-[#F15A24]/40 flex flex-col justify-between space-y-4"
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
                  className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
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
    </div>
  );
};
