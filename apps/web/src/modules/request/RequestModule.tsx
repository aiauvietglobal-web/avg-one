import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  DollarSign,
  Calendar,
  User,
  ShieldCheck,
  Building2,
  CreditCard,
  Briefcase,
  AlertCircle,
  Filter,
  Check,
  X
} from 'lucide-react';

interface RequestItem {
  id: string;
  title: string;
  type: 'LEAVE' | 'EXPENSE' | 'EQUIPMENT' | 'OTHER';
  description: string;
  amount?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applicantName: string;
  applicantAvatar?: string;
  approverName?: string;
  createdAt: string;
}

const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'req-1',
    title: 'Đề xuất Tạm ứng Ngân sách Mua Linh kiện Chip AI Sensor Q3',
    type: 'EXPENSE',
    description: 'Thanh toán linh kiện thử nghiệm bo mạch mẫu 50 cảm biến',
    amount: 15000000,
    status: 'PENDING',
    applicantName: 'Lê Văn Nhân Viên',
    applicantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '27/08/2026 08:30'
  },
  {
    id: 'req-2',
    title: 'Đề xuất Cấp phát Máy in 3D Mẫu Vỏ Hộp AVG-X',
    type: 'EQUIPMENT',
    description: 'Trang bị máy in 3D tốc độ cao phục vụ thử nghiệm thiết kế phòng 3.2',
    amount: 28000000,
    status: 'APPROVED',
    applicantName: 'Phạm Minh Tuấn',
    approverName: 'Nguyễn Văn Quản Lý (CEO)',
    applicantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    createdAt: '25/08/2026 14:20'
  },
  {
    id: 'req-3',
    title: 'Đề xuất Nghỉ phép Năm (2 Ngày: 01/09 - 02/09)',
    type: 'LEAVE',
    description: 'Nghỉ phép cá nhân theo quy định công ty',
    status: 'APPROVED',
    applicantName: 'Trần Thị Trưởng Phòng',
    approverName: 'Nguyễn Văn Quản Lý (CEO)',
    applicantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: '24/08/2026 09:15'
  }
];

export const RequestModule: React.FC = () => {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Create Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<RequestItem['type']>('EXPENSE');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const kpiStats = useMemo(() => {
    let pending = 0;
    let approved = 0;
    let rejected = 0;
    requests.forEach(r => {
      if (r.status === 'PENDING') pending++;
      else if (r.status === 'APPROVED') approved++;
      else if (r.status === 'REJECTED') rejected++;
    });
    return { pending, approved, rejected, total: requests.length };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchType = selectedType === 'ALL' || r.type === selectedType;
      const matchSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [requests, selectedType, searchQuery]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? {
      ...r,
      status: 'APPROVED',
      approverName: 'Nguyễn Văn Quản Lý (CEO)'
    } : r));
    showToast('✅ Đã phê duyệt đề xuất 1-Chạm thành công!');
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => r.id === id ? {
      ...r,
      status: 'REJECTED',
      approverName: 'Nguyễn Văn Quản Lý (CEO)'
    } : r));
    showToast('❌ Đã từ chối đề xuất.');
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newReq: RequestItem = {
      id: `req-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      description: newDesc.trim(),
      amount: newAmount ? parseFloat(newAmount) : undefined,
      status: 'PENDING',
      applicantName: 'Lê Văn Nhân Viên',
      applicantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      createdAt: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    setRequests([newReq, ...requests]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewAmount('');
    showToast('🚀 Đã khởi tạo đề xuất mới thành công!');
  };

  return (
    <div className="request-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-bold animate-bounce flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN CONTAINER CONTENT */}
      <div className="w-full h-full flex flex-col space-y-3.5 relative z-10 overflow-hidden">
        
        {/* 🔮 TOP BANNER EXECUTIVE DASHBOARD WITH SLOGAN BOX BADGE & BRUSH STROKE */}
        <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Slogan Badge Box */}
            <div className="space-y-2 text-left">
              {/* Animated Slogan Badge - Hộp vuông bo góc rounded-xl */}
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="finance-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                    rx="12"
                    ry="12"
                    fill="none"
                    stroke="url(#finance-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>

                <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide">
                  <CreditCard className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>AVG FINANCE & APPROVALS MODULE</span>
                </div>
              </div>

              {/* Title with Brush Stroke Underline */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>Phân Hệ</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">Tài Chính</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
                <span>& Phê Duyệt Đề Xuất</span>
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Tạo và xử lý trực tuyến các đề xuất tạm ứng kinh phí, mua sắm trang thiết bị, nghỉ phép — Tối ưu thời gian duyệt dưới 2 giờ.
              </p>
            </div>

            {/* Right Action & 3 Metric KPI Cards */}
            <div className="flex items-center gap-3 self-start md:self-center flex-wrap sm:flex-nowrap">
              
              {/* KPI 1: Chờ phê duyệt */}
              <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl py-2 px-3.5 min-w-[90px] text-center shadow-xs">
                <div className="text-xl font-black mb-0.5 text-amber-600 dark:text-amber-400">
                  {kpiStats.pending}
                </div>
                <div className="text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-xs bg-amber-500 animate-pulse"></span> CHỜ DUYỆT
                </div>
              </div>

              {/* KPI 2: Đã phê duyệt */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl py-2 px-3.5 min-w-[90px] text-center shadow-xs">
                <div className="text-xl font-black mb-0.5 text-emerald-600 dark:text-emerald-400">
                  {kpiStats.approved}
                </div>
                <div className="text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-xs bg-emerald-500"></span> ĐÃ DUYỆT
                </div>
              </div>

              {/* KPI 3: Đã từ chối */}
              <div className="bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl py-2 px-3.5 min-w-[90px] text-center shadow-xs">
                <div className="text-xl font-black mb-0.5 text-slate-700 dark:text-slate-300">
                  {kpiStats.rejected}
                </div>
                <div className="text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-xs bg-slate-400"></span> ĐÃ TỪ CHỐI
                </div>
              </div>

              {/* Action Button - Primary Orange #F15A24 */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="py-3 px-4 bg-gradient-to-r from-[#F15A24] via-[#FF7043] to-[#F15A24] hover:from-[#d94e1f] hover:to-[#f15a24] text-white font-black text-xs sm:text-sm rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#F15A24]/30 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tạo Đề Xuất Mới</span>
              </button>

            </div>

          </div>
        </div>

        {/* 🎛️ FILTER TABS & UNIVERSAL SEARCH BAR */}
        <div className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Segmented Filter Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-0.5">
            {[
              { id: 'ALL', label: 'Tất cả Đề xuất' },
              { id: 'EXPENSE', label: 'Tạm ứng & Thanh toán' },
              { id: 'EQUIPMENT', label: 'Thiết bị & Tài sản' },
              { id: 'LEAVE', label: 'Nghỉ phép' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3.5 py-1.5 text-xs font-black rounded-xl whitespace-nowrap transition cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-gradient-to-r from-[#00A8E8] to-[#0088CC] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#00A8E8]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Universal Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 stroke-[1.75]" />
            <input
              type="text"
              placeholder="Tìm tên đề xuất, người tạo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/40 focus:border-[#00A8E8] font-medium shadow-2xs transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer">
                ✕
              </button>
            )}
          </div>

        </div>

        {/* 📜 REQUEST CARDS STREAMLINED LIST */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin relative z-10">
          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-slate-500 text-xs font-semibold">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <div>Không tìm thấy đề xuất nào phù hợp với bộ lọc hiện tại.</div>
            </div>
          ) : (
            filteredRequests.map((req) => {
              const isApproved = req.status === 'APPROVED';
              const isPending = req.status === 'PENDING';

              const borderLeftClass = isApproved
                ? 'border-l-[5px] border-l-emerald-500'
                : isPending
                  ? 'border-l-[5px] border-l-amber-500'
                  : 'border-l-[5px] border-l-rose-500';

              const typeBadgeClass = req.type === 'EXPENSE'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : req.type === 'EQUIPMENT'
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0284C7] dark:text-sky-300 border-sky-200 dark:border-sky-800'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';

              return (
                <div
                  key={req.id}
                  className={`w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 ${borderLeftClass} shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4`}
                >
                  {/* Left Info Section */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <img
                      src={req.applicantAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                      alt={req.applicantName}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-2xs flex-shrink-0"
                    />
                    
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${typeBadgeClass}`}>
                          {req.type === 'EXPENSE' ? 'Tạm ứng' : req.type === 'EQUIPMENT' ? 'Thiết bị' : 'Nghỉ phép'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {req.createdAt}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-[#1F2937] dark:text-white leading-snug tracking-tight">
                        {req.title}
                      </h3>

                      {/* Clean Inline Metadata Line - Zero Box Clutter */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                        <div>
                          <span className="text-slate-500">Người đề xuất:</span> <strong className="font-black text-slate-900 dark:text-white">{req.applicantName}</strong>
                        </div>

                        <span className="text-slate-300 dark:text-slate-700">•</span>

                        <div className="truncate max-w-md">
                          <span className="text-slate-500">Lý do:</span> <span className="text-slate-700 dark:text-slate-300 italic">{req.description}</span>
                        </div>
                      </div>

                      {req.amount && (
                        <div className="pt-1 flex items-center gap-1.5 text-xs font-black text-[#0284C7] dark:text-sky-400">
                          <DollarSign className="w-4 h-4 text-[#00A8E8]" />
                          <span>Số tiền đề xuất: <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400">{req.amount.toLocaleString('vi-VN')} VNĐ</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Status & 1-Click Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 flex-shrink-0">
                    {req.status === 'PENDING' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-2xs hover:shadow transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Duyệt Ngay (1-Click)
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-2xs hover:shadow transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" /> Từ Chối
                        </button>
                      </div>
                    ) : req.status === 'APPROVED' ? (
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1.5 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã Phê Duyệt
                        </span>
                        {req.approverName && (
                          <div className="text-[10px] text-slate-400 font-semibold mt-1">Duyệt bởi: {req.approverName}</div>
                        )}
                      </div>
                    ) : (
                      <span className="px-3 py-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-extrabold text-xs border border-rose-200 dark:border-rose-800 inline-flex items-center gap-1.5 shadow-2xs">
                        <XCircle className="w-3.5 h-3.5" /> Đã Từ Chối
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* 📝 MODAL: TẠO ĐỀ XUẤT PHÊ DUYỆT MỚI */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F15A24]" />
                <span>Tạo Đề Xuất Phê Duyệt Mới</span>
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Loại đề xuất</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                >
                  <option value="EXPENSE">Tạm ứng & Thanh toán Kinh phí</option>
                  <option value="EQUIPMENT">Cấp phát Máy móc & Thiết bị</option>
                  <option value="LEAVE">Xin Nghỉ phép</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tiêu đề đề xuất</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tiêu đề đề xuất..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                />
              </div>

              {newType === 'EXPENSE' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Số tiền tạm ứng (VNĐ)</label>
                  <input
                    type="number"
                    placeholder="VD: 15000000"
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Lý do & Giải trình chi tiết</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả lý do đề xuất..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00A8E8] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black bg-gradient-to-r from-[#F15A24] to-[#FF7043] hover:from-[#d94e1f] hover:to-[#f15a24] text-white rounded-xl shadow-md transition cursor-pointer"
                >
                  Gửi Đề Xuất
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
