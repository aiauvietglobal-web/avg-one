import React, { useState, useMemo } from 'react';
import {
  Scale, Sparkles, Plus, CheckCircle2, AlertTriangle, ShieldCheck,
  FileText, Award, Building2, Calendar, Clock, ArrowRight, X,
  MessageSquare, Send, Download, ExternalLink, BookmarkCheck, FileCheck2,
  Search
} from 'lucide-react';

export interface LegalOrder {
  id: string;
  code: string;
  title: string;
  category: 'PATENT' | 'INDUSTRIAL_DESIGN' | 'TRADEMARK' | 'CERTIFICATION';
  categoryLabel: string;
  stage: 'PRIOR_ART' | 'FORMAL_EXAM' | 'TESTING_QUATEST' | 'CONTENT_EXAM' | 'GRANTED';
  stageLabel: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  filingNumber: string;
  agency: string;
  leadLegal: {
    name: string;
    avatar: string;
    role: string;
  };
  progress: number;
  dueDate: string;
  legalValidity?: string;
  description: string;
  documents: { id: string; name: string; date: string; type: string }[];
  tasks: { id: string; text: string; done: boolean }[];
  comments: { id: string; author: string; avatar: string; time: string; text: string }[];
}

const INITIAL_LEGAL_ORDERS: LegalOrder[] = [
  {
    id: 'leg-1',
    code: 'PL-2026-051',
    title: 'Đăng ký Bằng độc quyền Kiểu dáng công nghiệp Cụm Bộ Điều Khiển AVG Controller X1',
    category: 'INDUSTRIAL_DESIGN',
    categoryLabel: 'Kiểu Dáng Công Nghiệp',
    stage: 'CONTENT_EXAM',
    stageLabel: 'Thẩm Định Nội Dung Chuyên Sâu',
    priority: 'HIGH',
    filingNumber: 'Đơn số 3-2026-00421',
    agency: 'Cục Sở hữu Trí tuệ Việt Nam (NOIP)',
    leadLegal: {
      name: 'Luật sư Lê Anh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Chuyên viên Sở Hữu Trí Tuệ'
    },
    progress: 70,
    dueDate: '25/03/2026',
    legalValidity: 'Bảo hộ 05 năm (Gia hạn tối đa 15 năm)',
    description: 'Hồ sơ gồm 07 góc chụp hình chiếu chuẩn hóa, bản mô tả chi tiết các đường gân tản nhiệt và kiểu dáng viền vát cạnh công nghệ cao.',
    documents: [
      { id: 'd1', name: 'To_khai_Dang_ky_Kieu_dang_AVG_X1.pdf', date: '15/01/2026', type: 'PDF' },
      { id: 'd2', name: 'Quyet_dinh_Chap_nhan_Don_Hop_le.pdf', date: '20/02/2026', type: 'PDF Scan' }
    ],
    tasks: [
      { id: 't1', text: 'Tra cứu sơ bộ tình trạng kỹ thuật kiểu dáng đối chứng', done: true },
      { id: 't2', text: 'Nộp tờ khai và nhận Quyết định chấp nhận đơn hợp lệ', done: true },
      { id: 't3', text: 'Công bố trên Công báo Sở hữu công nghiệp Tập A', done: true },
      { id: 't4', text: 'Nhận thông báo cấp Văn bằng bảo hộ chính thức', done: false }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Nguyễn Văn Quản Lý',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        time: 'Hôm nay 08:45',
        text: 'Cục SHTT đã kết thúc giai đoạn công bố, hiện đang trong vòng thẩm định nội dung. Tiến độ đang rất tốt.'
      }
    ]
  },
  {
    id: 'leg-2',
    code: 'PL-2026-052',
    title: 'Kiểm định Chất lượng An toàn Điện & Tương thích Điện từ EMC tại QUATEST 3',
    category: 'CERTIFICATION',
    categoryLabel: 'Chứng Nhận Hợp Quy / Quatest',
    stage: 'TESTING_QUATEST',
    stageLabel: 'Thử Nghiệm Phòng Lab QUATEST',
    priority: 'URGENT',
    filingNumber: 'HĐ Thử nghiệm QT3-2026/89',
    agency: 'Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3',
    leadLegal: {
      name: 'Vũ Thị Minh Hạnh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Chuyên viên Pháp chế Tiêu chuẩn'
    },
    progress: 50,
    dueDate: '19/03/2026',
    legalValidity: 'Chứng nhận hợp quy chuẩn QCVN 118:2018',
    description: 'Thử nghiệm phát xạ nhiễu dẫn, nhiễu bức xạ và độ miễn nhiễm tĩnh điện ESD 8kV phục vụ cấp tem hợp quy CR trước khi lưu thông ra thị trường.',
    documents: [
      { id: 'd1', name: 'Bien_ban_Ban_giao_Mau_thu_QT3.pdf', date: '01/03/2026', type: 'PDF Scan' }
    ],
    tasks: [
      { id: 't1', text: 'Gửi 03 sản phẩm mẫu H1 niêm phong sang QUATEST 3', done: true },
      { id: 't2', text: 'Thực hiện phép đo điện trở cách điện và điện áp đánh thủng', done: true },
      { id: 't3', text: 'Nhận Phiếu kết quả thử nghiệm chính thức (Test Report)', done: false }
    ],
    comments: []
  },
  {
    id: 'leg-3',
    code: 'PL-2026-053',
    title: 'Đăng ký Bằng Sáng Chế Độc Quyền: Phương pháp Lọc Nhiễu Kỹ Thuật Số thích ứng',
    category: 'PATENT',
    categoryLabel: 'Bằng Sáng Chế / Giải Pháp',
    stage: 'FORMAL_EXAM',
    stageLabel: 'Thẩm Định Hình Thức',
    priority: 'HIGH',
    filingNumber: 'Đơn số 1-2026-00195',
    agency: 'Cục Sở hữu Trí tuệ Việt Nam (NOIP)',
    leadLegal: {
      name: 'Luật sư Lê Anh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Chuyên viên Sở Hữu Trí Tuệ'
    },
    progress: 35,
    dueDate: '10/04/2026',
    legalValidity: 'Bảo hộ 20 năm toàn cầu',
    description: 'Bảo hộ giải thuật toán học độc quyền ứng dụng trên dòng chip công nghiệp của Tập đoàn Âu Việt, ngăn ngừa sao chép mã nguồn lõi.',
    documents: [
      { id: 'd1', name: 'Ban_Mo_ta_Sang_che_Va_Yeu_cau_Bao_ho.pdf', date: '25/02/2026', type: 'PDF' }
    ],
    tasks: [
      { id: 't1', text: 'Soạn thảo bản mô tả kỹ thuật và 15 điểm yêu cầu bảo hộ độc lập', done: true },
      { id: 't2', text: 'Nộp phí đăng ký tại Cục SHTT', done: true },
      { id: 't3', text: 'Phản hồi ý kiến thẩm định viên hình thức', done: false }
    ],
    comments: []
  },
  {
    id: 'leg-4',
    code: 'PL-2026-054',
    title: 'Đã Cấp Văn Bằng: Nhãn Hiệu Thương Hiệu "AVG ONE" Nhóm 09 Thiết Bị Tự Động Hóa',
    category: 'TRADEMARK',
    categoryLabel: 'Nhãn Hiệu Độc Quyền',
    stage: 'GRANTED',
    stageLabel: 'Đã Cấp Văn Bằng Bảo Hộ',
    priority: 'NORMAL',
    filingNumber: 'Giấy chứng nhận số 428912',
    agency: 'Bộ Khoa học và Công nghệ',
    leadLegal: {
      name: 'Vũ Thị Minh Hạnh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Chuyên viên Pháp chế Tiêu chuẩn'
    },
    progress: 100,
    dueDate: '05/03/2026',
    legalValidity: 'Hiệu lực đến năm 2036 (Gia hạn vô hạn)',
    description: 'Bảo hộ logo, cụm chữ AVG One và bộ nhận diện thương hiệu trên lãnh thổ Việt Nam và đăng ký mở rộng Madrid Protocol quốc tế.',
    documents: [
      { id: 'd1', name: 'Giay_Chung_Nhan_Dang_Ky_Nhan_Hieu_428912.pdf', date: '05/03/2026', type: 'Văn bằng Gốc' }
    ],
    tasks: [
      { id: 't1', text: 'Hoàn tất thủ tục thẩm định nội dung nhãn hiệu', done: true },
      { id: 't2', text: 'Đóng phí cấp văn bằng bảo hộ', done: true },
      { id: 't3', text: 'Lưu trữ hồ sơ gốc vào tủ lưu trữ pháp lý Tập đoàn', done: true }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Ban Giám Đốc',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        time: '05/03 16:00',
        text: 'Chúc mừng Ban Pháp chế đã hoàn thành xuất sắc việc bảo hộ nhãn hiệu AVG One sớm hơn dự kiến 2 tháng!'
      }
    ]
  }
];

export const LegalOrdersView: React.FC = () => {
  const [orders, setOrders] = useState<LegalOrder[]>(INITIAL_LEGAL_ORDERS);
  const [activeStageFilter, setActiveStageFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<LegalOrder | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  // New Legal Order Form state
  const [formCode, setFormCode] = useState(`PL-2026-${Math.floor(55 + Math.random() * 40)}`);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<LegalOrder['category']>('INDUSTRIAL_DESIGN');
  const [formFilingNum, setFormFilingNum] = useState('');
  const [formAgency, setFormAgency] = useState('Cục Sở hữu Trí tuệ Việt Nam (NOIP)');
  const [formLead, setFormLead] = useState('Luật sư Lê Anh Tuấn');
  const [formDueDate, setFormDueDate] = useState('30/03/2026');
  const [formDesc, setFormDesc] = useState('');

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: orders.length,
      inExam: orders.filter(o => o.stage === 'CONTENT_EXAM' || o.stage === 'FORMAL_EXAM').length,
      testingQuatest: orders.filter(o => o.stage === 'TESTING_QUATEST').length,
      granted: orders.filter(o => o.stage === 'GRANTED' || o.progress === 100).length
    };
  }, [orders]);

  const STAGE_TABS = [
    { id: 'ALL', label: 'Tất Cả Hồ Sơ' },
    { id: 'PRIOR_ART', label: '1. Tra Cứu SHTT' },
    { id: 'FORMAL_EXAM', label: '2. Thẩm Định Hình Thức' },
    { id: 'TESTING_QUATEST', label: '3. Kiểm Định QUATEST' },
    { id: 'CONTENT_EXAM', label: '4. Thẩm Định Nội Dung' },
    { id: 'GRANTED', label: '5. Đã Cấp Văn Bằng' }
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStage = activeStageFilter === 'ALL' || o.stage === activeStageFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        o.title.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q) ||
        o.filingNumber.toLowerCase().includes(q) ||
        o.agency.toLowerCase().includes(q) ||
        o.leadLegal.name.toLowerCase().includes(q);
      return matchStage && matchQuery;
    });
  }, [orders, activeStageFilter, searchQuery]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const catLabels: Record<LegalOrder['category'], string> = {
      'INDUSTRIAL_DESIGN': 'Kiểu Dáng Công Nghiệp',
      'PATENT': 'Bằng Sáng Chế / Giải Pháp',
      'TRADEMARK': 'Nhãn Hiệu Độc Quyền',
      'CERTIFICATION': 'Chứng Nhận Hợp Quy / Quatest'
    };

    const newOrder: LegalOrder = {
      id: `leg-${Date.now()}`,
      code: formCode,
      title: formTitle.trim(),
      category: formCategory,
      categoryLabel: catLabels[formCategory],
      stage: 'PRIOR_ART',
      stageLabel: 'Tra Cứu & Thẩm Định Sơ Bộ',
      priority: 'HIGH',
      filingNumber: formFilingNum.trim() || 'Đang chuẩn bị nộp',
      agency: formAgency,
      leadLegal: {
        name: formLead,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'Pháp chế Sở Hữu Trí Tuệ'
      },
      progress: 10,
      dueDate: formDueDate,
      legalValidity: 'Theo quy định hiện hành',
      description: formDesc.trim(),
      documents: [
        { id: `doc-${Date.now()}`, name: 'Ban_Thao_Ho_So_Phap_Ly.pdf', date: 'Hôm nay', type: 'PDF' }
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, text: 'Rà soát tính pháp lý và không trùng lặp', done: true },
        { id: `t-${Date.now()}-2`, text: 'Nộp hồ sơ chính thức tại Cơ quan tiếp nhận', done: false }
      ],
      comments: []
    };

    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    setFormTitle('');
    setFormDesc('');
    setFormFilingNum('');
    setFormCode(`PL-2026-${Math.floor(70 + Math.random() * 30)}`);
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
                  <linearGradient id="legal-banner-border" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#0284C7" />
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
                  stroke="url(#legal-banner-border)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-transparent text-[11px] font-black text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>AVG LEGAL & COMPLIANCE • PHÁP LÝ & SHTT (6.0)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2">
                <span>QUẢN LÝ ĐƠN HÀNG</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-[#F15A24]">
                  <span className="relative z-10">PHÁP LÝ</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-purple-500 opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-[#F15A24] hover:opacity-90 text-white font-extrabold rounded-xl shadow-sm hover:shadow-md transition transform active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> Nộp Hồ Sơ Pháp Lý
              </button>
            </div>
          </div>

          {/* Cột phải: 4 Thẻ KPI Tinh Gọn */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 xl:border-l xl:border-slate-200 dark:xl:border-slate-800 xl:pl-5">
            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Tổng hồ sơ</div>
                <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">{stats.total}</div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-[#0284C7] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Cục SHTT</div>
                <div className="text-lg font-black text-sky-600 dark:text-sky-400 leading-tight">{stats.inExam}</div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#F15A24] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">QUATEST / CR</div>
                <div className="text-lg font-black text-orange-600 dark:text-orange-400 leading-tight">{stats.testingQuatest}</div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Đã cấp bằng</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">{stats.granted}</div>
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
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600'
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
              placeholder="Tìm mã, số đơn, văn bằng..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 font-medium"
            />
          </div>
        </div>
      </div>

      {/* ⚖️ DANH SÁCH THẺ HỒ SƠ PHÁP LÝ (MỞ RỘNG TOÀN DIỆN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3.5">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="group bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs hover:shadow-md transition-all duration-200 hover:border-purple-500/40 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-3">
              {/* Header: Code, Category, Filing number badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 font-mono font-black text-xs border border-purple-200 dark:border-purple-800">
                    {order.code}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {order.categoryLabel}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                  {order.filingNumber}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  onClick={() => setSelectedOrder(order)}
                  className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition cursor-pointer leading-snug"
                >
                  {order.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {order.description}
                </p>
              </div>

              {/* Legal Details Box */}
              <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-purple-600" /> Cơ Quan Xử Lý:
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate block">
                    {order.agency}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#F15A24]" /> Thời Hạn Hiệu Lực:
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate block">
                    {order.legalValidity || 'Theo luật định'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-black">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    {order.stageLabel}
                  </span>
                  <span className="text-purple-600">{order.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-[#F15A24] rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>

              {/* Documents attached badge list */}
              {order.documents && order.documents.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto text-[10px]">
                  <span className="text-slate-400 font-bold whitespace-nowrap">Hồ sơ đính kèm:</span>
                  {order.documents.map(doc => (
                    <span key={doc.id} className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-mono font-medium truncate max-w-[200px]">
                      📄 {doc.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer: Legal Specialist, Next Deadline, and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={order.leadLegal.avatar}
                  alt={order.leadLegal.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-purple-600"
                />
                <div>
                  <span className="font-black text-slate-800 dark:text-slate-200 block text-[11px] leading-tight">
                    {order.leadLegal.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    {order.leadLegal.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">Hạn Xử Lý Tiếp Theo</span>
                  <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-600" />
                    {order.dueDate}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white transition cursor-pointer shadow-2xs"
                  title="Xem hồ sơ pháp lý chi tiết"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ⚖️ DRAWER CHI TIẾT HỒ SƠ PHÁP LÝ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header Drawer */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-purple-600 text-white font-mono font-black text-xs shadow-xs">
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

              {/* Legal Metadata Box */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Thông Tin Đăng Ký Pháp Lý & Thẩm Quyền
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block">Số Đơn / Số Văn Bằng:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.filingNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Cơ Quan Tiếp Nhận:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.agency}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Thời Hạn Bảo Hộ:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.legalValidity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Luật Sư / Phụ Trách:</span>
                    <span className="font-extrabold text-purple-600">{selectedOrder.leadLegal.name}</span>
                  </div>
                </div>
              </div>

              {/* Checklist Tiến Độ Pháp Lý */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Các Bước Thủ Tục Pháp Lý ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <span className="text-xs font-extrabold text-purple-600">{selectedOrder.progress}%</span>
                </div>
                <div className="space-y-2">
                  {selectedOrder.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500/40 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {}}
                        className="rounded text-purple-600 focus:ring-purple-600 w-4 h-4"
                      />
                      <span className={`text-xs font-bold ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Đính Kèm Văn Bản Pháp Lý */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-purple-600" />
                  Văn Bản & Quyết Định Scan Đính Kèm ({selectedOrder.documents.length})
                </h4>
                <div className="space-y-2">
                  {selectedOrder.documents.map(doc => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">{doc.name}</span>
                          <span className="text-[10px] text-slate-400">Ngày lưu: {doc.date} • Định dạng: {doc.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Tải xuống tài liệu: ${doc.name}`)}
                        className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white transition cursor-pointer"
                        title="Tải văn bản"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trao đổi phản hồi pháp chế */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  Nhật Ký Làm Việc & Ý Kiến Pháp Chế ({selectedOrder.comments.length})
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
                    placeholder="Ghi chú công văn, thời hạn phản hồi cơ quan nhà nước..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="flex-1 p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📝 MODAL TẠO HỒ SƠ PHÁP LÝ MỚI */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-purple-600" />
                Nộp Hồ Sơ Pháp Lý / Sở Hữu Trí Tuệ Mới (6.0)
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
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mã Hồ Sơ Pháp Lý</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-black text-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Loại Thủ Tục Pháp Lý</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="INDUSTRIAL_DESIGN">Kiểu Dáng Công Nghiệp</option>
                    <option value="PATENT">Bằng Sáng Chế / Giải Pháp</option>
                    <option value="TRADEMARK">Nhãn Hiệu Độc Quyền</option>
                    <option value="CERTIFICATION">Chứng Nhận Hợp Quy / Quatest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên Hồ Sơ / Đơn Đăng Ký</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đăng ký Bằng độc quyền Kiểu dáng công nghiệp..."
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Số Đơn / Số Hợp Đồng</label>
                  <input
                    type="text"
                    placeholder="VD: Đơn số 3-2026-00421"
                    value={formFilingNum}
                    onChange={e => setFormFilingNum(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Cơ Quan Tiếp Nhận</label>
                  <input
                    type="text"
                    value={formAgency}
                    onChange={e => setFormAgency(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Chuyên Viên Phụ Trách</label>
                  <select
                    value={formLead}
                    onChange={e => setFormLead(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="Luật sư Lê Anh Tuấn">Luật sư Lê Anh Tuấn (SHTT)</option>
                    <option value="Vũ Thị Minh Hạnh">Vũ Thị Minh Hạnh (Pháp chế Tiêu chuẩn)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hạn Xử Lý Tiếp Theo</label>
                  <input
                    type="text"
                    value={formDueDate}
                    onChange={e => setFormDueDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mô Tả Yêu Cầu Pháp Lý</label>
                <textarea
                  rows={3}
                  placeholder="Ghi chú nội dung yêu cầu bảo hộ, tình trạng hồ sơ giấy tờ hiện tại..."
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
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-md cursor-pointer transition"
                >
                  Lưu & Khởi Tạo Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
