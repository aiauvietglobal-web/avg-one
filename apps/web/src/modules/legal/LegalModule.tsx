import React, { useState, useEffect, useMemo } from 'react';
import {
  Scale, Sparkles, Plus, CheckCircle2, AlertTriangle, ShieldCheck,
  FileText, Award, Building2, Calendar, Clock, ArrowRight, X,
  MessageSquare, Send, Download, ExternalLink, BookmarkCheck, FileCheck2,
  Search, Filter, ChevronDown, User, Check
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
    dueDate: 'Hoàn tất',
    legalValidity: 'Hiệu lực 10 năm (Đến 2036)',
    description: 'Bảo hộ độc quyền biểu trưng logo, tên nhãn hiệu và bộ nhận diện thương hiệu số AVG ONE trên lãnh thổ Việt Nam và khối ASEAN.',
    documents: [
      { id: 'd1', name: 'Van_bang_Bao_ho_Nhan_hieu_428912.pdf', date: '10/01/2026', type: 'Văn bằng Gốc' }
    ],
    tasks: [
      { id: 't1', text: 'Nộp đơn đăng ký nhãn hiệu', done: true },
      { id: 't2', text: 'Thẩm định hình thức hợp lệ', done: true },
      { id: 't3', text: 'Thẩm định nội dung đạt chuẩn', done: true },
      { id: 't4', text: 'Nhận Văn bằng bảo hộ có dấu đỏ', done: true }
    ],
    comments: []
  },
  {
    id: 'leg-5',
    code: 'PL-2026-055',
    title: 'Rà Soát & Thẩm Định Hợp Đồng Chuyển Giao Công Nghệ Cảm Biến AI với Đối Tác Nhật Bản',
    category: 'TRADEMARK',
    categoryLabel: 'Hợp Đồng Pháp Lý',
    stage: 'PRIOR_ART',
    stageLabel: 'Tra Cứu & Đàm Phán Điều Khoản',
    priority: 'HIGH',
    filingNumber: 'HĐ-AVG-JP-2026/08',
    agency: 'Hội đồng Cố vấn Pháp lý Quốc tế',
    leadLegal: {
      name: 'Luật sư Lê Anh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Chuyên viên Sở Hữu Trí Tuệ'
    },
    progress: 25,
    dueDate: '30/03/2026',
    legalValidity: 'Thỏa thuận NDA & Cấp phép bản quyền (Licensing)',
    description: 'Thẩm định các điều khoản bảo mật thông tin mã nguồn, điều khoản trọng tài thương mại quốc tế SIAC Singapore và phân chia lợi nhuận quyền sở hữu trí tuệ.',
    documents: [
      { id: 'd1', name: 'Draft_Technology_Transfer_Agreement_v2.docx', date: '04/03/2026', type: 'Bản Thảo' }
    ],
    tasks: [
      { id: 't1', text: 'Rà soát điều khoản bồi thường thiệt hại và NDA', done: true },
      { id: 't2', text: 'Họp đàm phán trực tuyến với Luật sư đại diện đối tác', done: false }
    ],
    comments: []
  },
  {
    id: 'leg-6',
    code: 'PL-2026-056',
    title: 'Thẩm Định Đơn Đăng Ký Kiểu Dáng Công Nghiệp Cảm Biến Không Dây AVG Mesh-Node',
    category: 'INDUSTRIAL_DESIGN',
    categoryLabel: 'Kiểu Dáng Công Nghiệp',
    stage: 'FORMAL_EXAM',
    stageLabel: 'Thẩm Định Hình Thức',
    priority: 'NORMAL',
    filingNumber: 'Đơn số 3-2026-00512',
    agency: 'Cục Sở hữu Trí tuệ Việt Nam (NOIP)',
    leadLegal: {
      name: 'Vũ Thị Minh Hạnh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Chuyên viên Pháp chế Tiêu chuẩn'
    },
    progress: 40,
    dueDate: '15/04/2026',
    legalValidity: 'Đang thụ lý hồ sơ',
    description: 'Hồ sơ thiết kế vỏ cảm biến siêu nhỏ gọn chống nước chuẩn IP67 phục vụ giám sát môi trường thông minh.',
    documents: [
      { id: 'd1', name: 'Bo_anh_chup_7_chieu_Mesh_Node.pdf', date: '02/03/2026', type: 'Bản vẽ CAD' }
    ],
    tasks: [
      { id: 't1', text: 'Hoàn thiện bộ ảnh chụp 7 hình chiếu chuẩn NOIP', done: true },
      { id: 't2', text: 'Nộp lệ phí thẩm định hình thức', done: true }
    ],
    comments: []
  }
];

export const LegalModule: React.FC = () => {
  const [orders, setOrders] = useState<LegalOrder[]>(INITIAL_LEGAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('leg-1');
  const [activeTab, setActiveTab] = useState<'all' | 'design' | 'patent' | 'trademark' | 'certification'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for new legal order
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LegalOrder['category']>('INDUSTRIAL_DESIGN');
  const [newAgency, setNewAgency] = useState('Cục Sở hữu Trí tuệ Việt Nam (NOIP)');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Lắng nghe sự kiện từ Header (chuyển tab hoặc mở modal tạo mới)
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && ['all', 'design', 'patent', 'trademark', 'certification'].includes(e.detail)) {
        setActiveTab(e.detail);
      }
    };
    const handleOpenCreate = () => {
      setShowCreateModal(true);
    };

    window.addEventListener('legal_tab_change', handleTabChange);
    window.addEventListener('legal_create_order', handleOpenCreate);
    return () => {
      window.removeEventListener('legal_tab_change', handleTabChange);
      window.removeEventListener('legal_create_order', handleOpenCreate);
    };
  }, []);

  const selectedOrder = useMemo(() => {
    return orders.find(o => o.id === selectedOrderId) || orders[0];
  }, [orders, selectedOrderId]);

  // Bộ lọc danh sách theo Tab từ Header và Search query
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      let matchTab = true;
      if (activeTab === 'design') matchTab = o.category === 'INDUSTRIAL_DESIGN';
      else if (activeTab === 'patent') matchTab = o.category === 'PATENT';
      else if (activeTab === 'trademark') matchTab = o.category === 'TRADEMARK';
      else if (activeTab === 'certification') matchTab = o.category === 'CERTIFICATION';

      const matchSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.filingNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, searchQuery]);

  // Metrics thống kê
  const stats = useMemo(() => {
    return {
      total: orders.length,
      granted: orders.filter(o => o.stage === 'GRANTED').length,
      examining: orders.filter(o => o.stage === 'CONTENT_EXAM' || o.stage === 'FORMAL_EXAM' || o.stage === 'TESTING_QUATEST').length,
      urgent: orders.filter(o => o.priority === 'URGENT').length
    };
  }, [orders]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const catLabels: Record<LegalOrder['category'], string> = {
      INDUSTRIAL_DESIGN: 'Kiểu Dáng Công Nghiệp',
      PATENT: 'Bằng Sáng Chế / Giải Pháp',
      TRADEMARK: 'Nhãn Hiệu Độc Quyền',
      CERTIFICATION: 'Chứng Nhận Hợp Quy / Quatest'
    };

    const newOrder: LegalOrder = {
      id: `leg-${Date.now()}`,
      code: `PL-2026-0${orders.length + 51}`,
      title: newTitle,
      category: newCategory,
      categoryLabel: catLabels[newCategory],
      stage: 'PRIOR_ART',
      stageLabel: 'Tra Cứu & Nộp Hồ Sơ',
      priority: 'NORMAL',
      filingNumber: `Đơn số ${Math.floor(1000 + Math.random() * 9000)}/2026`,
      agency: newAgency,
      leadLegal: {
        name: 'Luật sư Lê Anh Tuấn',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'Chuyên viên Sở Hữu Trí Tuệ'
      },
      progress: 10,
      dueDate: newDueDate || '30/04/2026',
      legalValidity: 'Đang tiến hành thủ tục',
      description: newDesc || 'Hồ sơ pháp lý mới tạo trên hệ thống AVG One.',
      documents: [],
      tasks: [
        { id: 't1', text: 'Hoàn thiện hồ sơ & kiểm tra tài liệu đối chứng', done: false },
        { id: 't2', text: 'Nộp đơn lên cơ quan thẩm quyền', done: false }
      ],
      comments: []
    };

    setOrders([newOrder, ...orders]);
    setSelectedOrderId(newOrder.id);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const toggleTask = (taskId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== selectedOrder.id) return o;
      const updatedTasks = o.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      const doneCount = updatedTasks.filter(t => t.done).length;
      const newProgress = Math.round((doneCount / updatedTasks.length) * 100);
      return { ...o, tasks: updatedTasks, progress: newProgress };
    }));
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans py-2 sm:py-3 relative flex flex-col justify-between overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none -z-0" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/10 dark:bg-[#F15A24]/15 rounded-full blur-[130px] pointer-events-none -z-0" />

      {/* Main Container synchronized with max-w-7xl mx-auto px-3 sm:px-6 */}
      <div className="max-w-7xl mx-auto w-full h-full px-3 sm:px-6 flex flex-col space-y-3 relative z-10 overflow-hidden">
        
        {/* Compact KPI Row - Tối ưu diện tích màn hình tối đa */}
        <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">{stats.total}</div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Tổng hồ sơ SHTT</div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">{stats.granted}</div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đã cấp văn bằng</div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400 leading-tight">{stats.examining}</div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đang thẩm định</div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] dark:text-orange-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-[#F15A24] leading-tight">{stats.urgent}</div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Hồ sơ ưu tiên cao</div>
            </div>
          </div>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="flex-shrink-0 flex items-center justify-between gap-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm hồ sơ theo mã, tên sáng chế, số đơn NOIP..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Hiển thị: <span className="text-[#F15A24]">{filteredOrders.length}</span> hồ sơ
          </div>
        </div>

        {/* 2-Column Full-Height Workspace - Tối ưu toàn bộ không gian làm việc */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
          
          {/* Left List (5 Cols) */}
          <div className="lg:col-span-5 h-full overflow-y-auto space-y-2.5 pr-1">
            {filteredOrders.map((order) => {
              const isSelected = order.id === selectedOrderId;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-[#F15A24] shadow-md ring-1 ring-[#F15A24]/30'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                      {order.categoryLabel}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.stage === 'GRANTED'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
                      {order.stageLabel}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug line-clamp-2 mb-2">
                    {order.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{order.code}</span>
                    <span>Hạn: <strong className="text-slate-700 dark:text-slate-300">{order.dueDate}</strong></span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        order.progress === 100
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-indigo-500 to-[#F15A24]'
                      }`}
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Inspector (7 Cols) */}
          <div className="lg:col-span-7 h-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-y-auto shadow-xs">
            {selectedOrder && (
              <div className="space-y-4">
                {/* Header detail */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-black text-[#F15A24]">{selectedOrder.code}</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{selectedOrder.filingNumber}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {selectedOrder.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {selectedOrder.description}
                  </p>
                </div>

                {/* Metadata badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400">Cơ quan thẩm quyền</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedOrder.agency}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400">Thời hạn bảo hộ</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedOrder.legalValidity || 'Theo luật định'}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400">Luật sư phụ trách</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedOrder.leadLegal.name}</div>
                  </div>
                </div>

                {/* Checklist tiến độ */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Các Bước Thủ Tục Pháp Lý ({selectedOrder.tasks.filter(t => t.done).length}/{selectedOrder.tasks.length})
                  </h4>
                  <div className="space-y-1.5">
                    {selectedOrder.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                          task.done
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={task.done ? 'line-through opacity-80' : ''}>{task.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tài liệu đính kèm */}
                {selectedOrder.documents.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      Văn Bản & Tài Liệu Pháp Lý ({selectedOrder.documents.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedOrder.documents.map((doc) => (
                        <div key={doc.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
                          <div className="truncate pr-2">
                            <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{doc.name}</div>
                            <div className="text-[10px] text-slate-400">{doc.type} • {doc.date}</div>
                          </div>
                          <Download className="w-4 h-4 text-slate-400 hover:text-[#F15A24] cursor-pointer shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modal Tạo hồ sơ pháp lý mới */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#F15A24]" />
                Tạo Hồ Sơ Pháp Lý & SHTT Mới
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tên hồ sơ / Sáng chế / Nhãn hiệu *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Đăng ký Bằng độc quyền Kiểu dáng công nghiệp..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phân loại SHTT</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                  >
                    <option value="INDUSTRIAL_DESIGN">Kiểu Dáng Công Nghiệp</option>
                    <option value="PATENT">Bằng Sáng Chế</option>
                    <option value="TRADEMARK">Nhãn Hiệu Độc Quyền</option>
                    <option value="CERTIFICATION">Chứng Nhận Hợp Quy</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Thời hạn dự kiến</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cơ quan thụ lý</label>
                <input
                  type="text"
                  value={newAgency}
                  onChange={(e) => setNewAgency(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mô tả tóm tắt nội dung bảo hộ</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mô tả các đặc điểm kỹ thuật hoặc hình chiếu kiểu dáng..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F15A24] to-[#f97316] text-white font-bold shadow-xs hover:shadow-md cursor-pointer"
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
