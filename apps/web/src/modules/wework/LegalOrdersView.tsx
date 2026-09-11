import React, { useState, useMemo } from 'react';
import {
  Scale, Sparkles, Plus, CheckCircle2, AlertTriangle, ShieldCheck,
  FileText, Award, Building2, Calendar, Clock, ArrowRight, X,
  MessageSquare, Send, Download, ExternalLink, BookmarkCheck, FileCheck2,
  Search, LayoutList, LayoutGrid
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
    stageLabel: 'Thẩm Định Nội Dung',
    priority: 'HIGH',
    filingNumber: 'Đơn số 3-2026-00421',
    agency: 'Cục Sở hữu Trí tuệ Việt Nam (NOIP)',
    leadLegal: {
      name: 'Luật sư Lê Anh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Chuyên viên SHTT'
    },
    progress: 70,
    dueDate: '25/03/2026',
    legalValidity: 'Bảo hộ 05 năm (Gia hạn 15 năm)',
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
    categoryLabel: 'Hợp Quy / Quatest',
    stage: 'TESTING_QUATEST',
    stageLabel: 'Đo Kiểm QUATEST 3',
    priority: 'URGENT',
    filingNumber: 'HĐ Thử nghiệm QT3-2026/89',
    agency: 'Trung tâm Kỹ thuật Tiêu chuẩn Đo lường 3',
    leadLegal: {
      name: 'Vũ Thị Minh Hạnh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Pháp chế Tiêu chuẩn'
    },
    progress: 50,
    dueDate: '19/03/2026',
    legalValidity: 'Chứng nhận chuẩn QCVN 118:2018',
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
    categoryLabel: 'Bằng Sáng Chế',
    stage: 'FORMAL_EXAM',
    stageLabel: 'Thẩm Định Hình Thức',
    priority: 'HIGH',
    filingNumber: 'Đơn số 1-2026-00195',
    agency: 'Cục Sở hữu Trí tuệ Việt Nam (NOIP)',
    leadLegal: {
      name: 'Luật sư Lê Anh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Chuyên viên SHTT'
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
    stageLabel: 'Đã Cấp Văn Bằng',
    priority: 'NORMAL',
    filingNumber: 'Văn bằng số 428912',
    agency: 'Bộ Khoa học và Công nghệ',
    leadLegal: {
      name: 'Vũ Thị Minh Hạnh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Pháp chế Tiêu chuẩn'
    },
    progress: 100,
    dueDate: '05/03/2026',
    legalValidity: 'Hiệu lực đến năm 2036',
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
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
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

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStage = activeStageFilter === 'ALL' || o.stage === activeStageFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        o.code.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.leadLegal.name.toLowerCase().includes(q) ||
        o.filingNumber.toLowerCase().includes(q) ||
        o.categoryLabel.toLowerCase().includes(q);
      return matchStage && matchSearch;
    });
  }, [orders, activeStageFilter, searchQuery]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const catLabels: Record<LegalOrder['category'], string> = {
      'INDUSTRIAL_DESIGN': 'Kiểu Dáng Công Nghiệp',
      'PATENT': 'Bằng Sáng Chế',
      'TRADEMARK': 'Nhãn Hiệu Độc Quyền',
      'CERTIFICATION': 'Hợp Quy / Quatest'
    };

    const newOrder: LegalOrder = {
      id: `leg-${Date.now()}`,
      code: formCode,
      title: formTitle.trim(),
      category: formCategory,
      categoryLabel: catLabels[formCategory],
      stage: 'PRIOR_ART',
      stageLabel: 'Tra Cứu SHTT',
      priority: 'HIGH',
      filingNumber: formFilingNum.trim() || 'Đang chuẩn bị nộp',
      agency: formAgency,
      leadLegal: {
        name: formLead,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'Pháp chế SHTT'
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
    <div className="space-y-4">
      {/* 🚀 SCIENTIFIC EXECUTIVE HEADER (TÍCH HỢP GỌN GÀNG: TIÊU ĐỀ + 4 KPI CHIPS + NÚT TẠO) */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Module Title & Slogan */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                HỒ SƠ PHÁP LÝ & SHTT
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 text-[10px] font-black uppercase">
                6.0 - PHÁP LÝ
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Độc quyền kiểu dáng • Bằng sáng chế • Kiểm định QUATEST 3 • Chứng nhận hợp quy CR
            </p>
          </div>
        </div>

        {/* Center: 4 Compact KPI Metrics */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase">Tổng hồ sơ:</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">{stats.total}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60">
            <span className="text-[10px] font-black text-sky-700 dark:text-sky-400 uppercase">Cục SHTT:</span>
            <span className="text-sm font-black text-sky-700 dark:text-sky-300">{stats.inExam}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60">
            <span className="text-[10px] font-black text-[#F15A24] uppercase">QUATEST:</span>
            <span className="text-sm font-black text-[#F15A24]">{stats.testingQuatest}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase">Đã cấp bằng:</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">{stats.granted}</span>
          </div>
        </div>

        {/* Right: Action Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-[#F15A24] hover:opacity-90 text-white font-extrabold rounded-xl shadow-xs transition transform active:scale-95 text-xs whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Nộp Hồ Sơ Pháp Lý Mới
        </button>
      </div>

      {/* 🧭 WORKFLOW STEPPER & SCIENTIFIC CONTROL TOOLBAR */}
      <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stage Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'Tất Cả Hồ Sơ' },
            { id: 'PRIOR_ART', label: '1. Tra Cứu SHTT' },
            { id: 'FORMAL_EXAM', label: '2. Thẩm Định Hình Thức' },
            { id: 'TESTING_QUATEST', label: '3. Đo Kiểm QUATEST' },
            { id: 'CONTENT_EXAM', label: '4. Thẩm Định Nội Dung' },
            { id: 'GRANTED', label: '5. Đã Cấp Văn Bằng' }
          ].map(stage => (
            <button
              key={stage.id}
              onClick={() => setActiveStageFilter(stage.id)}
              className={`px-3 py-1 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer ${
                activeStageFilter === stage.id
                  ? 'bg-purple-600 text-white shadow-2xs'
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
              placeholder="Tìm số đơn, văn bằng, luật sư..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Xem Bảng Dữ Liệu Pháp Lý (Khoa học)"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Xem Dạng Thẻ Tinh Gọn"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 📊 CHẾ ĐỘ 1: BẢNG DỮ LIỆU PHÁP LÝ (SCIENTIFIC LEGAL TABLE - ƯU TIÊN MẶC ĐỊNH) */}
      {viewMode === 'table' ? (
        <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[10px]">
                  <th className="p-3.5">Mã Hồ Sơ</th>
                  <th className="p-3.5">Tên Thủ Tục & Cơ Quan Tiếp Nhận</th>
                  <th className="p-3.5">Số Đơn / Văn Bằng</th>
                  <th className="p-3.5">Giai Đoạn Thẩm Định</th>
                  <th className="p-3.5">Pháp Chế Phụ Trách</th>
                  <th className="p-3.5 text-center">Tiến Độ</th>
                  <th className="p-3.5">Hạn Tiếp Theo</th>
                  <th className="p-3.5 text-right">Văn Bản</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      Không tìm thấy hồ sơ pháp lý phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-purple-50/40 dark:hover:bg-slate-800/50 transition cursor-pointer group"
                    >
                      {/* Mã hồ sơ */}
                      <td className="p-3.5 font-mono font-black text-purple-600 dark:text-purple-400 whitespace-nowrap">
                        {order.code}
                      </td>

                      {/* Tên & Cơ quan */}
                      <td className="p-3.5 max-w-xs md:max-w-md">
                        <div className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition leading-snug">
                          {order.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-600 dark:text-slate-300">
                            {order.agency}
                          </span>
                          <span>• {order.legalValidity}</span>
                        </div>
                      </td>

                      {/* Số đơn */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {order.filingNumber}
                        </span>
                      </td>

                      {/* Giai đoạn */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          order.stage === 'GRANTED'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : order.stage === 'CONTENT_EXAM'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                            : order.stage === 'TESTING_QUATEST'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400'
                            : 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {order.stageLabel}
                        </span>
                      </td>

                      {/* Pháp chế phụ trách */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.leadLegal.avatar}
                            alt=""
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                              {order.leadLegal.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block leading-none">
                              {order.leadLegal.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tiến độ */}
                      <td className="p-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-[#F15A24] rounded-full"
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
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white font-extrabold text-[11px] text-slate-700 dark:text-slate-200 transition cursor-pointer"
                        >
                          Hồ Sơ
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
              className="bg-white/95 dark:bg-slate-900/95 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs hover:shadow-md transition hover:border-purple-500/40 cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Header: Code & Stage */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-600 font-mono font-black text-xs border border-purple-200 dark:border-purple-800">
                    {order.code}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {order.stageLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-black text-sm text-slate-900 dark:text-slate-100 hover:text-purple-600 transition line-clamp-2 leading-snug">
                  {order.title}
                </h3>

                {/* Legal Info Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Số Đơn:</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-200 truncate">{order.filingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Cơ Quan:</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 truncate max-w-[170px]">{order.agency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Thời Hạn:</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 truncate">{order.legalValidity}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-black">
                    <span className="text-slate-400">Tiến Độ Thẩm Định</span>
                    <span className="text-purple-600">{order.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-[#F15A24] rounded-full"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer card */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <img src={order.leadLegal.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">{order.leadLegal.name}</span>
                </div>
                <span className="font-bold text-slate-500">{order.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⚖️ DRAWER CHI TIẾT HỒ SƠ PHÁP LÝ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800">
            {/* Header Drawer */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-mono font-black text-xs">
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

              {/* Legal Metadata Box */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Thông Tin Hồ Sơ & Thẩm Quyền
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Số Đơn / Văn Bằng:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.filingNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Cơ Quan Tiếp Nhận:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.agency}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Thời Hạn Bảo Hộ:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedOrder.legalValidity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Luật Sư Phụ Trách:</span>
                    <span className="font-extrabold text-purple-600">{selectedOrder.leadLegal.name}</span>
                  </div>
                </div>
              </div>

              {/* Checklist Tiến Độ Pháp Lý */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Các Bước Thủ Tục Pháp Lý ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <span className="text-xs font-extrabold text-purple-600">{selectedOrder.progress}%</span>
                </div>
                <div className="space-y-1.5">
                  {selectedOrder.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500/40 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {}}
                        className="rounded text-purple-600 focus:ring-purple-600 w-3.5 h-3.5"
                      />
                      <span className={`text-xs font-bold ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Đính Kèm */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
                  Văn Bản Scan Đính Kèm ({selectedOrder.documents.length})
                </h4>
                <div className="space-y-1.5">
                  {selectedOrder.documents.map(doc => (
                    <div
                      key={doc.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-purple-600" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">{doc.name}</span>
                          <span className="text-[10px] text-slate-400">Ngày lưu: {doc.date}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Tải xuống tài liệu: ${doc.name}`)}
                        className="p-1 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white transition cursor-pointer"
                        title="Tải văn bản"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trao đổi phản hồi pháp chế */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                  Ý Kiến Pháp Chế & Cơ Quan Thụ Lý ({selectedOrder.comments.length})
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
                    placeholder="Ghi chú thời hạn, công văn phản hồi..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="flex-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Gửi
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
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-600" />
                Nộp Hồ Sơ Pháp Lý / Sở Hữu Trí Tuệ Mới (6.0)
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
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mã Hồ Sơ Pháp Lý</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-black text-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Loại Thủ Tục</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="INDUSTRIAL_DESIGN">Kiểu Dáng Công Nghiệp</option>
                    <option value="PATENT">Bằng Sáng Chế</option>
                    <option value="TRADEMARK">Nhãn Hiệu Độc Quyền</option>
                    <option value="CERTIFICATION">Hợp Quy / Quatest</option>
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
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Số Đơn / Số Văn Bằng</label>
                  <input
                    type="text"
                    placeholder="VD: Đơn số 3-2026-00421"
                    value={formFilingNum}
                    onChange={e => setFormFilingNum(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Cơ Quan Tiếp Nhận</label>
                  <input
                    type="text"
                    value={formAgency}
                    onChange={e => setFormAgency(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Chuyên Viên Phụ Trách</label>
                  <select
                    value={formLead}
                    onChange={e => setFormLead(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="Luật sư Lê Anh Tuấn">Luật sư Lê Anh Tuấn (SHTT)</option>
                    <option value="Vũ Thị Minh Hạnh">Vũ Thị Minh Hạnh (Pháp chế Tiêu chuẩn)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hạn Tiếp Theo</label>
                  <input
                    type="text"
                    value={formDueDate}
                    onChange={e => setFormDueDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Ghi Chú Yêu Cầu Pháp Lý</label>
                <textarea
                  rows={2}
                  placeholder="Ghi chú nội dung yêu cầu bảo hộ, tình trạng hồ sơ..."
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
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs cursor-pointer transition"
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
