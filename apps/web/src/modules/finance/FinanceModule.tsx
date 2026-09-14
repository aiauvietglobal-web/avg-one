import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText, Plus, CheckCircle2, XCircle, Clock, Search,
  DollarSign, Calendar, User, ShieldCheck, Building2,
  CreditCard, Briefcase, AlertCircle, Filter, Check, X,
  TrendingUp, Wallet, ArrowUpRight, BarChart3
} from 'lucide-react';

export interface RequestItem {
  id: string;
  code: string;
  title: string;
  type: 'EXPENSE' | 'EQUIPMENT' | 'LEAVE' | 'OTHER';
  typeLabel: string;
  description: string;
  amount?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applicantName: string;
  applicantRole: string;
  department: string;
  approverName?: string;
  createdAt: string;
}

const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'req-1',
    code: 'TC-2026-081',
    title: 'Đề xuất Tạm ứng Ngân sách Mua Linh kiện Chip AI Sensor Q3',
    type: 'EXPENSE',
    typeLabel: 'Tạm Ứng Kinh Phí',
    description: 'Thanh toán linh kiện thử nghiệm bo mạch mẫu 50 cảm biến AI Telemetry phục vụ đơn hàng R&D.',
    amount: 15000000,
    status: 'PENDING',
    applicantName: 'Lê Văn Nhân Viên',
    applicantRole: 'Trưởng nhóm R&D / Firmware Lead',
    department: '3.1 - RDI',
    createdAt: '27/08/2026 08:30'
  },
  {
    id: 'req-2',
    code: 'TC-2026-082',
    title: 'Đề xuất Cấp phát Máy in 3D Mẫu Vỏ Hộp AVG-X1 Tốc Độ Cao',
    type: 'EQUIPMENT',
    typeLabel: 'Trang Thiết Bị',
    description: 'Trang bị máy in 3D công nghiệp phục vụ thử nghiệm thiết kế phòng 3.2 Kiểu dáng.',
    amount: 28000000,
    status: 'APPROVED',
    applicantName: 'Phạm Minh Tuấn',
    applicantRole: 'Chuyên viên Thiết kế CAD 3D',
    department: '3.2 - THIẾT KẾ',
    approverName: 'Nguyễn Văn Quản Lý (CEO)',
    createdAt: '25/08/2026 14:20'
  },
  {
    id: 'req-3',
    code: 'TC-2026-083',
    title: 'Đề xuất Quyết toán Lệ phí Nộp Đơn Đăng ký Kiểu dáng NOIP',
    type: 'EXPENSE',
    typeLabel: 'Thanh Toán Chi Phí',
    description: 'Nộp lệ phí đăng ký bảo hộ quyền tác giả và công báo sở hữu công nghiệp NOIP đợt 1/2026.',
    amount: 4500000,
    status: 'APPROVED',
    applicantName: 'Vũ Quốc Huy',
    applicantRole: 'Cố vấn Pháp lý & SHTT',
    department: '6 - PHÁP LÝ',
    approverName: 'Hội đồng Quản trị',
    createdAt: '22/08/2026 10:15'
  },
  {
    id: 'req-4',
    code: 'TC-2026-084',
    title: 'Đề xuất Thuê Máy chủ GPU Cloud Đào tạo Mô hình Nhận Dạng Giọng Nói',
    type: 'EQUIPMENT',
    typeLabel: 'Dịch Vụ Hạ Tầng',
    description: 'Gia hạn gói dịch vụ Cloud Run và GPU H100 trong 03 tháng phục vụ phân hệ Chuyển đổi trực tiếp.',
    amount: 32000000,
    status: 'PENDING',
    applicantName: 'Hoàng Đức Anh',
    applicantRole: 'Kỹ sư Phần cứng AI',
    department: '3.1 - RDI',
    createdAt: '28/08/2026 16:45'
  },
  {
    id: 'req-5',
    code: 'TC-2026-085',
    title: 'Đề xuất Chi phí Tham quan Triển lãm Tự động hóa Quốc tế VIMF 2026',
    type: 'EXPENSE',
    typeLabel: 'Công Tác & Khảo Sát',
    description: 'Đăng ký vé tham dự và chi phí lưu trú cho 04 nhân sự R&D tham gia báo cáo chuyên đề.',
    amount: 18000000,
    status: 'REJECTED',
    applicantName: 'Trần Thị Mai',
    applicantRole: 'Trưởng phòng Nhân sự',
    department: 'Nhân sự & Văn hóa',
    approverName: 'Nguyễn Văn Quản Lý (CEO)',
    createdAt: '20/08/2026 09:00'
  }
];

export const FinanceModule: React.FC = () => {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const [selectedReqId, setSelectedReqId] = useState<string>('req-1');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'expense' | 'equipment' | 'budget'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<RequestItem['type']>('EXPENSE');
  const [newAmount, setNewAmount] = useState<number>(10000000);
  const [newDept, setNewDept] = useState('3.1 - RDI');
  const [newDesc, setNewDesc] = useState('');

  // Lắng nghe sự kiện từ FinanceHeader
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && ['all', 'pending', 'expense', 'equipment', 'budget'].includes(e.detail)) {
        setActiveTab(e.detail);
      }
    };
    const handleOpenCreate = () => {
      setShowCreateModal(true);
    };

    window.addEventListener('finance_tab_change', handleTabChange);
    window.addEventListener('finance_create_request', handleOpenCreate);
    return () => {
      window.removeEventListener('finance_tab_change', handleTabChange);
      window.removeEventListener('finance_create_request', handleOpenCreate);
    };
  }, []);

  const selectedRequest = useMemo(() => {
    return requests.find(r => r.id === selectedReqId) || requests[0];
  }, [requests, selectedReqId]);

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      let matchTab = true;
      if (activeTab === 'pending') matchTab = r.status === 'PENDING';
      else if (activeTab === 'expense') matchTab = r.type === 'EXPENSE';
      else if (activeTab === 'equipment') matchTab = r.type === 'EQUIPMENT';

      const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [requests, activeTab, searchQuery]);

  const stats = useMemo(() => {
    const pending = requests.filter(r => r.status === 'PENDING');
    const approved = requests.filter(r => r.status === 'APPROVED');
    const totalDisbursed = approved.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const totalPendingAmount = pending.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    return {
      total: requests.length,
      pendingCount: pending.length,
      approvedCount: approved.length,
      totalDisbursed,
      totalPendingAmount
    };
  }, [requests]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const typeLabels: Record<RequestItem['type'], string> = {
      EXPENSE: 'Tạm Ứng Kinh Phí',
      EQUIPMENT: 'Trang Thiết Bị',
      LEAVE: 'Nghỉ Phép',
      OTHER: 'Đề Xuất Khác'
    };

    const newReq: RequestItem = {
      id: `req-${Date.now()}`,
      code: `TC-2026-0${requests.length + 81}`,
      title: newTitle,
      type: newType,
      typeLabel: typeLabels[newType],
      description: newDesc || 'Đề xuất mới trên hệ thống Tài chính AVG One.',
      amount: newAmount,
      status: 'PENDING',
      applicantName: 'Nguyễn Văn Quản Lý',
      applicantRole: 'Lãnh đạo phê duyệt',
      department: newDept,
      createdAt: new Date().toLocaleDateString('vi-VN') + ' 09:00'
    };

    setRequests([newReq, ...requests]);
    setSelectedReqId(newReq.id);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleApprove = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'APPROVED', approverName: 'Ban Lãnh Đạo AVG' } : r));
  };

  const handleReject = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'REJECTED', approverName: 'Ban Lãnh Đạo AVG' } : r));
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans py-2 sm:py-3 relative flex flex-col justify-between overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none -z-0" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/10 dark:bg-[#F15A24]/15 rounded-full blur-[130px] pointer-events-none -z-0" />

      {/* Main Container synchronized with max-w-7xl mx-auto px-3 sm:px-6 */}
      <div className="max-w-7xl mx-auto w-full h-full px-3 sm:px-6 flex flex-col space-y-3 relative z-10 overflow-hidden">
        
        {/* Compact KPI Row */}
        <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {(stats.totalDisbursed / 1000000).toFixed(1)}M
              </div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đã giải ngân (VNĐ)</div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 leading-tight">
                {stats.pendingCount}
              </div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Chờ phê duyệt</div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 leading-tight">
                {stats.approvedCount}
              </div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đã phê duyệt</div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] dark:text-orange-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-[#F15A24] leading-tight">
                {(stats.totalPendingAmount / 1000000).toFixed(1)}M
              </div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Kinh phí đề xuất chờ duyệt</div>
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
              placeholder="Tìm kiếm theo mã phiếu, nội dung chi tiêu, người đề xuất..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Tổng cộng: <span className="text-[#F15A24]">{filteredRequests.length}</span> đề xuất
          </div>
        </div>

        {/* 2-Column Full-Height Workspace */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
          
          {/* Left Requests List (5 Cols) */}
          <div className="lg:col-span-5 h-full overflow-y-auto space-y-2.5 pr-1">
            {filteredRequests.map((req) => {
              const isSelected = req.id === selectedReqId;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-[#F15A24] shadow-md ring-1 ring-[#F15A24]/30'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                      {req.typeLabel}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : req.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
                      {req.status === 'APPROVED' ? 'Đã duyệt' : req.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug line-clamp-2 mb-2">
                    {req.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{req.code}</span>
                    <span className="font-black text-[#F15A24] text-xs">
                      {req.amount ? `${req.amount.toLocaleString('vi-VN')} đ` : 'Phi tài chính'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detail Inspector (7 Cols) */}
          <div className="lg:col-span-7 h-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-y-auto shadow-xs">
            {selectedRequest && (
              <div className="space-y-4">
                {/* Header detail */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-black text-[#F15A24]">{selectedRequest.code}</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{selectedRequest.createdAt}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {selectedRequest.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {selectedRequest.description}
                  </p>
                </div>

                {/* Amount Highlight Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Số tiền đề xuất thanh toán</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {selectedRequest.amount ? `${selectedRequest.amount.toLocaleString('vi-VN')} VNĐ` : '0 VNĐ'}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold text-lg">
                    ₫
                  </div>
                </div>

                {/* Metadata badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400">Người lập đề xuất</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedRequest.applicantName}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400">Phòng ban đề nghị</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedRequest.department}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400">Trạng thái phê duyệt</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                      {selectedRequest.approverName ? `Duyệt bởi ${selectedRequest.approverName}` : 'Chờ xem xét'}
                    </div>
                  </div>
                </div>

                {/* Phê duyệt / Từ chối actions */}
                {selectedRequest.status === 'PENDING' && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Thẩm quyền phê duyệt: Ban Giám Đốc / Kế Toán Trưởng
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReject(selectedRequest.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleApprove(selectedRequest.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        Phê duyệt ngay
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modal Tạo đề xuất mới */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                Tạo Đề Xuất Chi Tiêu & Phê Duyệt Mới
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tiêu đề đề xuất *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Đề xuất Tạm ứng Ngân sách Mua Linh kiện..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phân loại đề xuất</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                  >
                    <option value="EXPENSE">Tạm Ứng Kinh Phí</option>
                    <option value="EQUIPMENT">Trang Thiết Bị / Máy Móc</option>
                    <option value="LEAVE">Nghỉ Phép / Chế Độ</option>
                    <option value="OTHER">Đề Xuất Khác</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Số tiền (VNĐ)</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phòng ban đề nghị</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
                >
                  <option value="3.1 - RDI">3.1 - RDI (Nghiên cứu & Sáng tạo)</option>
                  <option value="3.2 - THIẾT KẾ">3.2 - Thiết Kế (CAD & Bo mạch)</option>
                  <option value="6 - PHÁP LÝ">6 - Pháp Lý & SHTT</option>
                  <option value="Nhân sự & Văn hóa">Nhân sự & Văn hóa</option>
                  <option value="Quản trị C-Suite">Quản trị C-Suite</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Chi tiết mục đích chi tiêu</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ghi rõ lý do tạm ứng/thanh toán, đính kèm số lượng linh kiện..."
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-xs hover:shadow-md cursor-pointer"
                >
                  Gửi Đề Xuất Phê Duyệt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
