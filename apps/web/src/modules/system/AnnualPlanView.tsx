import React, { useState, useMemo } from 'react';
import {
  Target, TrendingUp, Layers, FileText, Users, CheckCircle2, Activity,
  AlertTriangle, DollarSign, Briefcase, BookOpen, ShoppingBag, Factory,
  Sparkles, Cpu, UserCheck, Award, Wrench, Search, ChevronDown, ChevronUp,
  Clock, CheckCircle
} from 'lucide-react';

interface TaskGroupItem {
  id: number;
  title: string;
  category: string;
  pillBg: string;
  statusText: string;
  statusColor: string;
  boxTheme: string;
  deadline?: string;
  leads?: string[];
  icon: React.ReactNode;
  summary: string;
  details: string[];
  keyNotes?: string;
}

const TASK_GROUPS: TaskGroupItem[] = [
  {
    id: 1,
    title: 'Giải phóng hàng tồn (Nhóm 1) & Tiêu hủy quy định',
    category: 'Xử lý tồn kho',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Rất Bức Thiết',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: '28/02/2026',
    leads: ['Bà Trang (Thương mại)'],
    icon: <AlertTriangle className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Giải phóng hàng tồn kho thông qua thương mại chính, nếu không được thì tiến hành tiêu hủy.',
    details: [
      'Giải phóng tồn kho trước 28/02/2026 qua thương mại chính (bà Trang chủ trì).',
      'Xử lý Nguyên liệu (Bán thành phẩm, Đơn Nguyên và Đa nguyên) & Vật tư sản xuất.',
      'Rà soát hàng thành phẩm lưu kho & Máy móc trang thiết bị cũ tồn đọng.',
      'Trường hợp không thương mại được thì phải tiêu hủy theo đúng quy định.'
    ],
    keyNotes: 'Hạn chót xử lý dứt điểm trước ngày 28/02/2026.'
  },
  {
    id: 2,
    title: 'Thiết lập cấu trúc chi Âu Việt (Nhóm 2) & Mở rộng Tập đoàn',
    category: 'Tài chính & Pháp nhân',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Ưu Tiên Hàng Đầu',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: '15/01/2026',
    leads: ['Bà Chiều', 'Ban Pháp nhân'],
    icon: <DollarSign className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Chuẩn hóa cấu trúc chi để giảm tải cho nghiệp vụ và người chịu trách nhiệm pháp nhân cũ.',
    details: [
      'Hoàn thành cấu trúc chi giảm tải cho bà Chiều & pháp nhân cũ (15/01/2026).',
      'Thiết lập cấu trúc chi rõ ràng, minh bạch cho Âu Việt và mở rộng toàn Tập đoàn.',
      'Tháo gỡ và giảm tải áp lực nghiệp vụ các khoản Chi thường xuyên bắt buộc.'
    ],
    keyNotes: 'Hoàn thành cơ bản cấu trúc chi trước ngày 15/01/2026.'
  },
  {
    id: 3,
    title: 'Quản trị 07 đối tác lớn Âu Việt (Nhóm 3) & Đồng hành bền vững',
    category: 'Đối ngoại & Đối tác',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Đang Mở Rộng',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Tháng 01 & 02/2026',
    leads: ['Bà Trang', 'Bà Bích', 'Bà Mây'],
    icon: <Briefcase className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Thấu hiểu kế hoạch thương mại 7 đối tác lớn để phục vụ và duy trì hợp tác bền vững.',
    details: [
      'Thống kê dữ liệu kỹ thuật 07 đối tác lớn (Deadline: Hết tháng 01/2026).',
      'Rà soát hoàn thiện thông tin pháp lý (Deadline: Trước và trong tháng 02/2026).',
      'Chủ thể bà Trang phụ trách đối ngoại; chuyển tiếp thông tin qua bà Bích & bà Mây.',
      'Định hình rõ thông tin dữ liệu hàng hóa & dữ liệu tài chính tiền tệ.'
    ]
  },
  {
    id: 4,
    title: 'Ban hành Nội quy Quy chế Công ty (Nhóm 4) & Quản trị Nguồn Chi/Thu',
    category: 'Quản trị Quy chế',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Trọng Tâm Quý 2',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Hết Quý 2/2026',
    leads: ['Ban Pháp lý & Quản trị'],
    icon: <BookOpen className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Tổng hợp từ các Nhóm I, II, III, IV để ban hành bộ quy chế chung, nghiệp vụ và nhân sự.',
    details: [
      'Ban hành Quy chế chung toàn Tập đoàn & Quy chế nghiệp vụ chi tiết.',
      'Xây dựng Quy chế quản trị nhân sự tập trung vào quản trị nguồn Chi/Thu.',
      'Thực hiện từng bước, hoàn thiện và ban hành trước Hết Quý 2/2026.'
    ],
    keyNotes: 'Thời hạn ban hành hoàn chỉnh: Hết Quý 2 năm 2026.'
  },
  {
    id: 5,
    title: 'Đột phá Thương mại Enzyme (Nhóm 5) & Bán thành phẩm',
    category: 'Phát triển Kinh doanh',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Mục Tiêu Lõi',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Liên tục 2026',
    leads: ['Ban Thương mại'],
    icon: <ShoppingBag className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Phát triển thương mại Enzyme xanh và Bán thành phẩm mà không gây áp lực cho nhà máy.',
    details: [
      'Phát triển thương mại Enzyme sản phẩm xanh & bán bán thành phẩm.',
      'Giữ lõi vận hành: Không gia tăng áp lực sản xuất lên nhà máy Âu Việt.',
      'Mở rộng bán Enzyme cho các đối tác sản xuất tiềm năng tại Việt Nam.'
    ]
  },
  {
    id: 6,
    title: 'Hoàn thiện Cấu trúc Sản xuất 3 Kho (Nhóm 6)',
    category: 'Sản xuất & Vận hành',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Quản Lý 3 Kho',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Nhà máy Âu Việt'],
    icon: <Factory className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Tổng hợp các nhóm nghiệp vụ và neo cấu trúc sản xuất vào 3 kho cốt lõi.',
    details: [
      'Chuẩn hóa Kho đầu vào, Kho thương phẩm và Kho lưu chuyển nhà máy.',
      'Neo cấu trúc sản xuất từ tổng hợp kết quả các nhóm nghiệp vụ.',
      'Áp dụng nguyên tắc nhà máy mới khi Âu Việt giải quyết xong các vấn đề bức thiết.'
    ]
  },
  {
    id: 7,
    title: 'Nghiên cứu & Phát triển RDI Enzyme (Nhóm 7)',
    category: 'Công nghệ & R&D',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Đột Phá R&D',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Phòng RDI'],
    icon: <Sparkles className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Làm chủ công nghệ nguyên liệu Enzyme, tổ hợp dung môi pH và dung sai biến nhiệt.',
    details: [
      'Làm chủ dung môi pH & dung sai biến nhiệt trong sản xuất RDI.',
      'Thúc đẩy sản phẩm H1, H2 giải phóng hàng tồn và tạo ra HPHT.',
      'Đồng bộ dung sai biến nhiệt sản xuất, chú trọng đặc biệt vào Enzyme.'
    ]
  },
  {
    id: 8,
    title: 'Liên kết Hệ thống Quản trị (Nhóm 8) & AVG Dẫn dắt',
    category: 'Hệ thống Quản trị',
    pillBg: 'bg-[#0284C7]',
    statusText: 'AVG Dẫn Đắt',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['AVG', 'Tạm thời DH/AVG'],
    icon: <Cpu className="w-4 h-4 text-[#0284C7]" />,
    summary: 'AVG đóng vai trò chủ thể dẫn dắt, liên kết hệ thống để phục vụ 7 nhóm nhiệm vụ trước.',
    details: [
      'AVG dẫn dắt thực hiện liên kết toàn hệ thống quản trị.',
      'Tạm thời DH/AVG chịu trách nhiệm trực tiếp điều hành liên kết hệ thống.',
      'Thực hiện liên kết nghiệp vụ phục vụ 07 nhóm nhiệm vụ trọng tâm.'
    ]
  },
  {
    id: 9,
    title: 'Phát triển Nhân sự Đầu mối (Nhóm 9) & Thu nhập +8%',
    category: 'Phát triển Nhân sự',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Cam Kết +8% Thu Nhập',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: '2026 - 2027',
    leads: ['Ban Nhân sự & Điều hành'],
    icon: <UserCheck className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Tập trung phát triển năng lực đầu mối, không tăng người, tăng 8% thu nhập cơ sở.',
    details: [
      'Phát triển năng lực đầu mối nhân sự, duy trì thu nhập cơ sở tăng 8%.',
      'Cam kết KHÔNG TĂNG THÊM NGƯỜI trong năm tài chính 2026.',
      'Duy trì và nâng cấp gói đầu tư Sức khỏe tinh thần giai đoạn 2026 - 2027.'
    ]
  },
  {
    id: 10,
    title: 'Hoàn thiện Hồ sơ Năng lực Tập đoàn (Nhóm 10)',
    category: 'Thương hiệu & Năng lực',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Hoàn Thiện Hồ Sơ',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Ban Truyền thông & Thương hiệu'],
    icon: <Award className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Tổng hợp từ lõi nghiệp vụ 9 nhóm trước để ban hành Hồ sơ năng lực Tập đoàn.',
    details: [
      'Hoàn thiện Hồ sơ năng lực Tập đoàn từ lõi 9 nhóm nghiệp vụ.',
      'Tổng hợp, đưa vào quy chế, hoàn thiện và ban hành chính thức.',
      'Khẳng định vị thế và năng lực cạnh tranh toàn diện của Tập đoàn.'
    ]
  },
  {
    id: 11,
    title: 'Đầu tư Công cụ Số gia tăng năng suất (Nhóm 11)',
    category: 'Công nghệ & Công cụ',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Đầu Tư Công Cụ Số',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Ban Công nghệ IT'],
    icon: <Wrench className="w-4 h-4 text-[#0284C7]" />,
    summary: 'Đầu tư trọng điểm vào công cụ số (Công cụ Kết, Công cụ Nối, Công cụ Kết Nối Web/Showroom).',
    details: [
      'Đầu tư trọng điểm Công cụ Kết (Nội bộ) & Công cụ Nối (Thông ra ngoài).',
      'Đầu tư Công cụ Kết Nối (Hệ thống Web & Showroom trưng bày số).',
      'Định hướng tổng kết mốc Doanh thu 250 Tỷ VNĐ và định hướng 2027.'
    ]
  }
];

export const AnnualPlanView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);

  const filteredTaskGroups = useMemo(() => {
    return TASK_GROUPS.filter(group => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || (
        group.title.toLowerCase().includes(q) ||
        group.summary.toLowerCase().includes(q) ||
        group.category.toLowerCase().includes(q) ||
        group.details.some(d => d.toLowerCase().includes(q)) ||
        (group.leads || []).some(l => l.toLowerCase().includes(q))
      );

      let matchesCategory = true;
      if (selectedFilter !== 'ALL') {
        matchesCategory = group.category === selectedFilter;
      }

      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedFilter]);

  const categories = useMemo(() => {
    const cats = new Set(TASK_GROUPS.map(g => g.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* 🔮 HERO BANNER HỆ THỐNG: KẾ HOẠCH NĂM 2026 - AVG ONE EXECUTIVE STYLE */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left: Title & Animated Slogan Box Badge */}
          <div className="space-y-2 text-left flex-shrink-0 lg:max-w-xs">
            {/* Animated Slogan Badge - Hộp vuông bo góc rounded-xl */}
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="system-annual-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                  stroke="url(#system-annual-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>AVG SYSTEM & ANNUAL STRATEGY 2026</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>KẾ HOẠCH</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">NĂM 2026</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Quick Navigation 11 Task Groups Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-5">
            {TASK_GROUPS.map((g) => (
              <div
                key={g.id}
                onClick={() => {
                  const el = document.getElementById(`task-group-${g.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-100/80 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all duration-150 shadow-2xs hover:border-sky-400"
                title={g.title}
              >
                <span className="w-5 h-5 rounded-md bg-[#0284C7] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 shadow-2xs">
                  {g.id}
                </span>
                <span className="truncate text-[11px]">{g.title.split(' (Nhóm')[0]}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 📌 SECTION 1: HIỂN THỊ BẢNG TRUY CẬP NHANH 11 NHÓM NHIỆM VỤ 2026 */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>📋 DANH MỤC 11 NHÓM NHIỆM VỤ CHI TIẾT</span>
              <span className="px-2.5 py-0.5 bg-[#00A8E8]/10 text-[#00A8E8] rounded-md text-xs font-extrabold border border-[#00A8E8]/30">
                {filteredTaskGroups.length} / 11 Nhóm
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nhấp vào từng nhóm nhiệm vụ để xem chi tiết chi tiết nội dung, deadline và đầu mối chịu trách nhiệm.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm nhiệm vụ, deadline, nhân sự..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/40 font-medium"
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
            >
              <option value="ALL">Tất cả lĩnh vực</option>
              {categories.filter(c => c !== 'ALL').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 🌟 11 TASK GROUPS CARDS GRID SYSTEM (DESIGNED AS INDIVIDUAL STYLED BOXES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredTaskGroups.map((group) => {
            return (
              <div
                key={group.id}
                id={`task-group-${group.id}`}
                className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md space-y-3.5 flex flex-col justify-between scroll-mt-6 ${group.boxTheme}`}
              >
                {/* Top Row: Pill Badge on Left & Status Indicator on Right */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 text-white text-[11px] font-black rounded-lg uppercase tracking-wide shadow-xs ${group.pillBg}`}>
                    NHÓM {group.id} / 2026
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-extrabold">
                    {group.icon}
                    <span className={group.statusColor}>
                      {group.statusText}
                    </span>
                  </div>
                </div>

                {/* Card Title */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                    {group.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {group.summary}
                  </p>
                </div>

                {/* Bulleted List of Key Tasks / Directions */}
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4 font-medium leading-relaxed flex-1">
                  {group.details.map((detail, idx) => (
                    <li key={idx} className="marker:text-slate-400">
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Footer Metadata: Deadline & Leads */}
                <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] gap-2 flex-wrap">
                  {group.deadline && (
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#00A8E8]" />
                      <span>Hạn: <strong className="text-[#00A8E8] dark:text-[#00E5FF] font-extrabold">{group.deadline}</strong></span>
                    </div>
                  )}

                  {group.leads && group.leads.length > 0 && (
                    <div className="text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[200px]">
                      Đầu mối: <strong className="text-slate-800 dark:text-slate-200 font-bold">{group.leads.join(', ')}</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
