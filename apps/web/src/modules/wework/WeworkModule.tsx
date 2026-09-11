import React, { useState } from 'react';
import {
  FolderKanban, Plus, Search, Filter, LayoutGrid, List, Clock, UserCheck,
  Paperclip, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink, Calendar, Trash2,
  X, CheckSquare, MessageSquare, Send, FileCode, Share2, Tag, ChevronRight, Lightbulb, Sparkles
} from 'lucide-react';

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
}

interface OrderTask {
  id: string;
  orderCode: string;
  title: string;
  description: string;
  orderStatus: 'TRỌNG ĐIỂM' | 'KHẨN CẤP' | 'THƯỜNG XUYÊN' | 'TỒN' | 'TIỂU DỰ ÁN';
  department: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assigneeName: string;
  assigneeAvatar?: string;
  dueDate: string;
  attachmentUrl?: string;
  attachmentName?: string;
  subtasks?: SubTask[];
  comments?: CommentItem[];
}

const INITIAL_ORDERS: OrderTask[] = [
  {
    id: 'ord-1',
    orderCode: 'DH-2026-801',
    title: 'Đơn hàng Nghiên cứu & Phát triển Mô đun AI Sensor',
    description: 'Nghiên cứu ứng dụng chip đo lường công nghiệp mới cho hệ thống AVG One, lập trình thuật toán nhận diện lỗi mạch trên dây chuyền tự động.',
    orderStatus: 'TRỌNG ĐIỂM',
    department: '3.1 - RDI',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    assigneeName: 'Lê Văn Nhân Viên',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    dueDate: '30/08/2026',
    attachmentUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    attachmentName: 'Bang_Danh_Gia_Chip_Sensor_v2.xlsx',
    subtasks: [
      { id: 'st-1', title: 'Khảo sát linh kiện đo lường từ đối tác Nhật Bản', completed: true },
      { id: 'st-2', title: 'Lập trình Firmware đo kiểm trên bo mạch thử nghiệm', completed: true },
      { id: 'st-3', title: 'Chạy thử nghiệm độ chính xác tại Xưởng R&D AVG', completed: false },
      { id: 'st-4', title: 'Nộp báo cáo thử nghiệm lên Hội đồng Kỹ thuật', completed: false }
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Nguyễn Văn Quản Lý',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        time: '10:30 Hôm qua',
        content: 'Đã phê duyệt ngân sách mua 5 mẫu chip cảm biến thử nghiệm. Lê Văn Nhân Viên tiến hành nhận vật tư nhé!'
      }
    ]
  },
  {
    id: 'ord-2',
    orderCode: 'DH-2026-802',
    title: 'Đơn hàng Thiết kế Kiểu dáng Công nghiệp Vỏ Hộp AVG-X',
    description: 'Thiết kế bản vẽ CAD 3D và xuất file mẫu in 3D cho vỏ hộp bộ thu phát tín hiệu chống nước chuẩn IP67.',
    orderStatus: 'KHẨN CẤP',
    department: '3.2 - THIẾT KẾ',
    status: 'TODO',
    priority: 'HIGH',
    assigneeName: 'Phạm Minh Tuấn',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    dueDate: '05/09/2026',
    attachmentUrl: 'https://drive.google.com/file/d/1XyZ987654321_design_spec.pdf',
    attachmentName: 'Ban_Ve_CAD_3D_Vo_Hop_AVG.step',
    subtasks: [
      { id: 'st-21', title: 'Dựng khung 3D trên phần mềm SolidWorks', completed: false },
      { id: 'st-22', title: 'Xuất file STL in mẫu thử 3D', completed: false }
    ],
    comments: []
  },
  {
    id: 'ord-3',
    orderCode: 'DH-2026-803',
    title: 'Đơn hàng Rà soát Đăng ký Bản quyền Thương hiệu AVG One',
    description: 'Đăng ký sở hữu trí tuệ, nhãn hiệu thương mại và bảo hộ phần mềm quản trị doanh nghiệp tại Cục SHTT Việt Nam.',
    orderStatus: 'TRỌNG ĐIỂM',
    department: '6 - PHÁP LÝ',
    status: 'REVIEW',
    priority: 'MEDIUM',
    assigneeName: 'Vũ Quốc Huy',
    dueDate: '15/09/2026',
    attachmentUrl: 'https://docs.google.com/document/d/1LegalDoc_AVG_One_2026',
    attachmentName: 'Ho_So_Dang_Ky_Ban_Quyen_AVG.pdf',
    subtasks: [
      { id: 'st-31', title: 'Hoàn thiện hồ sơ pháp lý pháp nhân AVG', completed: true },
      { id: 'st-32', title: 'Nộp lệ phí đăng ký tại Cục SHTT', completed: true }
    ],
    comments: []
  },
  {
    id: 'ord-4',
    orderCode: 'DH-2026-804',
    title: 'Đơn hàng Kiểm kê Bo mạch Tồn kho Quý 2/2026',
    description: 'Xử lý thanh lý, phân loại kiểm định chất lượng các bo mạch và linh kiện điện tử tồn kho từ năm 2025.',
    orderStatus: 'TỒN',
    department: '3.1 - RDI',
    status: 'DONE',
    priority: 'LOW',
    assigneeName: 'Lê Văn Nhân Viên',
    dueDate: '20/08/2026',
    subtasks: [
      { id: 'st-41', title: 'Kiểm đếm kho vật tư R&D', completed: true },
      { id: 'st-42', title: 'Lập biên bản phân loại linh kiện hỏng', completed: true }
    ],
    comments: []
  }
];

export const WeworkModule: React.FC = () => {
  const [orders, setOrders] = useState<OrderTask[]>(INITIAL_ORDERS);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Lắng nghe sự kiện chọn đầu mục con từ thanh Header (Thiết kế, Nghiên cứu, Pháp lý)
  React.useEffect(() => {
    const handleOrdersTabChange = (e: any) => {
      if (e.detail) {
        if (e.detail === 'design' || e.detail === '3.2 - THIẾT KẾ') {
          setSelectedDept('3.2 - THIẾT KẾ');
        } else if (e.detail === 'research' || e.detail === 'sample-h1' || e.detail === '3.1 - RDI') {
          setSelectedDept('3.1 - RDI');
        } else if (e.detail === 'legal' || e.detail === '6 - PHÁP LÝ') {
          setSelectedDept('6 - PHÁP LÝ');
        } else if (e.detail === 'all') {
          setSelectedDept('ALL');
        }
      }
    };
    window.addEventListener('orders_tab_change', handleOrdersTabChange);
    return () => window.removeEventListener('orders_tab_change', handleOrdersTabChange);
  }, []);
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderTask | null>(null);

  // New Comment Input State
  const [commentText, setCommentText] = useState('');

  // Create Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCode, setNewCode] = useState(`DH-2026-${Math.floor(805 + Math.random() * 95)}`);
  const [newDept, setNewDept] = useState('3.1 - RDI');
  const [newOrderStatus, setNewOrderStatus] = useState<OrderTask['orderStatus']>('TRỌNG ĐIỂM');
  const [newPriority, setNewPriority] = useState<OrderTask['priority']>('HIGH');
  const [newAssignee, setNewAssignee] = useState('Lê Văn Nhân Viên');

  const filteredOrders = orders.filter(o => {
    const matchDept = selectedDept === 'ALL' || o.department === selectedDept;
    const matchSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        o.orderCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newOrder: OrderTask = {
      id: `ord-${Date.now()}`,
      orderCode: newCode,
      title: newTitle,
      description: newDesc,
      orderStatus: newOrderStatus,
      department: newDept,
      status: 'TODO',
      priority: newPriority,
      assigneeName: newAssignee,
      dueDate: new Date(Date.now() + 7 * 86400000).toLocaleDateString('vi-VN'),
      subtasks: [
        { id: `st-${Date.now()}-1`, title: 'Khảo sát yêu cầu đơn hàng', completed: false },
        { id: `st-${Date.now()}-2`, title: 'Thực hiện phân công nhiệm vụ', completed: false }
      ],
      comments: []
    };

    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleUpdateStatus = (id: string, newStatus: OrderTask['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleToggleSubtask = (orderId: string, subtaskId: string) => {
    setOrders(orders.map(o => {
      if (o.id !== orderId) return o;
      const updatedSubtasks = (o.subtasks || []).map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );
      return { ...o, subtasks: updatedSubtasks };
    }));

    if (selectedOrder && selectedOrder.id === orderId) {
      const updatedSubtasks = (selectedOrder.subtasks || []).map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );
      setSelectedOrder({ ...selectedOrder, subtasks: updatedSubtasks });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedOrder) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: 'Nguyễn Văn Quản Lý',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      time: 'Vừa xong',
      content: commentText.trim()
    };

    const updatedComments = [...(selectedOrder.comments || []), newComment];
    
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, comments: updatedComments } : o));
    setSelectedOrder({ ...selectedOrder, comments: updatedComments });
    setCommentText('');
  };

  const KANBAN_COLUMNS: { id: OrderTask['status']; label: string; color: string; bg: string }[] = [
    { id: 'TODO', label: 'CẦN LÀM (TODO)', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { id: 'IN_PROGRESS', label: 'ĐANG THỰC HIỆN', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { id: 'REVIEW', label: 'ĐANG DUYỆT (REVIEW)', color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
    { id: 'DONE', label: 'HOÀN THÀNH', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' }
  ];

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden p-3 sm:p-5 lg:p-6 space-y-6">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* Full Screen Expanded Main Container */}
      <div className="w-full max-w-full relative z-10 space-y-6">
        
        {/* Top Banner & Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          
          <div className="flex flex-col items-start space-y-2 text-left">
            {/* Animated Slogan Box Badge - Square-rounded rounded-xl */}
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="order-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                  stroke="url(#order-slogan-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>

              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <FolderKanban className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>AVG WEWORK & ORDER MANAGEMENT</span>
              </div>
            </div>

            {/* Title with Brush Stroke Underline */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
              <span>Quản Lý</span>
              <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                <span className="relative z-10">Đơn Hàng R&D</span>
                <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                </svg>
              </span>
              <span>& Tiến Độ Phòng Ban</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Chuẩn hóa quản lý mã đơn hàng (<code className="font-mono font-bold text-[#F15A24]">DH-2026-xxx</code>), điều phối nhân sự phòng R&D (3.1), Thiết kế (3.2) & Pháp lý (6).
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition transform active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Tạo Đơn Hàng Mới
          </button>
        </div>

        {/* Hidden DOM trigger buttons for AppShell sync */}
        <div className="hidden">
          <button id="btn-orders-subtab-design" onClick={() => setSelectedDept('3.2 - THIẾT KẾ')} />
          <button id="btn-orders-subtab-research" onClick={() => setSelectedDept('3.1 - RDI')} />
          <button id="btn-orders-subtab-sample-h1" onClick={() => setSelectedDept('3.1 - RDI')} />
          <button id="btn-orders-subtab-legal" onClick={() => setSelectedDept('6 - PHÁP LÝ')} />
        </div>

        {/* Main View: Kanban Board */}
        {viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {KANBAN_COLUMNS.map((col) => {
              const columnOrders = filteredOrders.filter(o => o.status === col.id);
              return (
                <div
                  key={col.id}
                  className="bg-slate-100/70 dark:bg-slate-900/60 rounded-[24px] p-3.5 border border-slate-200/80 dark:border-slate-800 flex flex-col h-full min-h-[520px]"
                >
                  {/* Column Header */}
                  <div className={`p-3 rounded-xl border font-black text-xs flex items-center justify-between mb-3 shadow-2xs ${col.bg}`}>
                    <span className={col.color}>{col.label}</span>
                    <span className="w-5 h-5 rounded-md bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] font-black shadow-xs">
                      {columnOrders.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {columnOrders.map((ord) => {
                      const completedSubtasksCount = (ord.subtasks || []).filter(st => st.completed).length;
                      const totalSubtasks = (ord.subtasks || []).length;
                      return (
                        <div
                          key={ord.id}
                          onClick={() => setSelectedOrder(ord)}
                          style={{ borderRadius: '24px' }}
                          className="bg-white dark:bg-slate-800/90 rounded-[24px] p-4 border-2 border-dashed border-slate-200/90 dark:border-slate-700/80 hover:border-[#F15A24] dark:hover:border-[#F15A24] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group relative"
                        >
                          {/* Top badges */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-xs text-[#F15A24] dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-lg border border-orange-200 dark:border-orange-800">
                              {ord.orderCode}
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                              ord.orderStatus === 'TRỌNG ĐIỂM' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                              ord.orderStatus === 'KHẨN CẤP' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                              'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {ord.orderStatus}
                            </span>
                          </div>

                          {/* Title & Desc */}
                          <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm group-hover:text-[#F15A24] transition-colors line-clamp-2">
                            {ord.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                            {ord.description}
                          </p>

                          {/* Progress checklist indicator */}
                          {totalSubtasks > 0 && (
                            <div className="mt-3 flex items-center gap-2">
                              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-[#F15A24] to-amber-500 h-full rounded-full transition-all duration-300"
                                  style={{ width: `${(completedSubtasksCount / totalSubtasks) * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-extrabold text-slate-500">
                                {completedSubtasksCount}/{totalSubtasks}
                              </span>
                            </div>
                          )}

                          {/* Footer Info */}
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                              {ord.assigneeAvatar ? (
                                <img src={ord.assigneeAvatar} alt={ord.assigneeName} className="w-5 h-5 rounded-full object-cover ring-1 ring-orange-300" />
                              ) : (
                                <UserCheck className="w-4 h-4 text-[#F15A24]" />
                              )}
                              <span className="font-bold text-[11px] truncate max-w-[100px]">{ord.assigneeName}</span>
                            </div>

                            <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{ord.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Table */
          <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Mã Đơn Hàng</th>
                  <th className="p-3">Tên Đơn Hàng R&D</th>
                  <th className="p-3">Phòng Ban</th>
                  <th className="p-3">Phụ Trách</th>
                  <th className="p-3">Hạn Chót</th>
                  <th className="p-3">Trạng Thái</th>
                  <th className="p-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredOrders.map(o => (
                  <tr key={o.id} onClick={() => setSelectedOrder(o)} className="hover:bg-orange-50/50 dark:hover:bg-slate-800/40 transition cursor-pointer">
                    <td className="p-3 font-black text-[#F15A24] dark:text-orange-400">{o.orderCode}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{o.title}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-semibold">{o.department}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-bold">{o.assigneeName}</td>
                    <td className="p-3 text-slate-500 font-semibold">{o.dueDate}</td>
                    <td className="p-3">
                      <span className="font-extrabold text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-[#F15A24]">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL DRAWER MODAL (Chi Tiết Đơn Hàng R&D) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slide-left">
            {/* Header Drawer */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="font-black text-sm px-3 py-1 bg-orange-50 dark:bg-orange-950 text-[#F15A24] dark:text-orange-300 rounded-lg border border-orange-300 dark:border-orange-800">
                  {selectedOrder.orderCode}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {selectedOrder.department}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Drawer */}
            <div className="p-6 space-y-6 flex-1">
              {/* Order Title & Status Transition */}
              <div className="space-y-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
                  {selectedOrder.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {selectedOrder.description}
                </p>

                {/* Status Switch Buttons */}
                <div className="pt-2">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase mb-1.5">Chuyển Trạng Thái Đơn Hàng:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {KANBAN_COLUMNS.map(col => (
                      <button
                        key={col.id}
                        onClick={() => handleUpdateStatus(selectedOrder.id, col.id)}
                        className={`py-1.5 px-2 text-[10px] font-extrabold rounded-lg border transition text-center cursor-pointer ${
                          selectedOrder.status === col.id
                            ? 'bg-[#F15A24] text-white border-[#F15A24] shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {col.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignee & Dates Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Người Phụ Trách</span>
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
                    {selectedOrder.assigneeAvatar && (
                      <img src={selectedOrder.assigneeAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                    )}
                    <span>{selectedOrder.assigneeName}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Hạn Chót Hoàn Thành</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
                    <Calendar className="w-4 h-4 text-[#F15A24]" />
                    <span>{selectedOrder.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Attachment File Section */}
              {selectedOrder.attachmentUrl && (
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="w-4 h-4 text-[#F15A24]" /> Tài Liệu Đính Kèm (CAD / PDF / Sheet)
                  </h3>
                  <a
                    href={selectedOrder.attachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-xs font-bold text-[#F15A24] dark:text-orange-300 hover:bg-orange-100 transition group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{selectedOrder.attachmentName || selectedOrder.attachmentUrl}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </a>
                </div>
              )}

              {/* Subtasks Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-[#F15A24]" /> Tiến Độ Các Hạng Mục Nhiệm Vụ
                </h3>
                <div className="space-y-2">
                  {(selectedOrder.subtasks || []).map(st => (
                    <label
                      key={st.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer text-xs font-bold"
                    >
                      <input
                        type="checkbox"
                        checked={st.completed}
                        onChange={() => handleToggleSubtask(selectedOrder.id, st.id)}
                        className="w-4 h-4 rounded text-[#F15A24] focus:ring-orange-400 accent-[#F15A24]"
                      />
                      <span className={st.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}>
                        {st.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discussion & Comments */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#F15A24]" /> Trao Đổi Nội Bộ Theo Đơn Hàng
                </h3>

                {/* Comments List */}
                <div className="space-y-3">
                  {(selectedOrder.comments || []).map(c => (
                    <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={c.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span className="font-black text-slate-900 dark:text-slate-100">{c.author}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">{c.time}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium pl-7 leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Viết bình luận trao đổi..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium text-slate-800 dark:text-slate-100"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F15A24] hover:bg-[#d94e1f] text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-[#F15A24]" />
              Tạo Đơn Hàng R&D Mới
            </h2>
            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs font-bold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Mã đơn hàng</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-black text-[#F15A24]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Đầu mục</label>
                  <select
                    value={newDept}
                    onChange={e => setNewDept(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-extrabold"
                  >
                    <option value="3.2 - THIẾT KẾ">Thiết kế (3.2)</option>
                    <option value="3.1 - RDI">Nghiên cứu (3.1)</option>
                    <option value="6 - PHÁP LÝ">Pháp lý (6)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Tên đơn hàng R&D</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên đơn hàng..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Mô tả nhiệm vụ</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả chi tiết công việc..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F15A24] hover:bg-[#d94e1f] text-white rounded-xl font-black shadow-xs transition cursor-pointer"
                >
                  Tạo Đơn Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
