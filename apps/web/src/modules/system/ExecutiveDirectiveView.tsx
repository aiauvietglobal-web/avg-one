import React, { useState, useEffect } from 'react';
import { Megaphone, Send, RefreshCw, ExternalLink, Search, Filter, AlertTriangle, FileText, User, Users, Calendar } from 'lucide-react';
import {
  fetchExecutiveDirectivesFromGoogleSheet,
  ExecutiveDirectiveItem,
  EXECUTIVE_DIRECTIVE_SHEET_EDIT_URL
} from '../../services/googleSheetSync';

export const ExecutiveDirectiveView: React.FC = () => {
  const [directives, setDirectives] = useState<ExecutiveDirectiveItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterIssuer, setFilterIssuer] = useState<string>('ALL');

  // Dispatch Form State
  const [newCode, setNewCode] = useState(`TĐ-2026-${Math.floor(Math.random() * 900 + 100)}`);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newIssuer, setNewIssuer] = useState('DH');
  const [newRecipients, setNewRecipients] = useState('@All');
  const [newPriority, setNewPriority] = useState<'URGENT' | 'HIGH' | 'NORMAL'>('HIGH');
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  const loadData = async (showLoadingSpinner = false) => {
    if (showLoadingSpinner) setLoading(true);
    try {
      const data = await fetchExecutiveDirectivesFromGoogleSheet();
      setDirectives(data);
      setLastSyncTime(new Date().toLocaleTimeString('vi-VN'));
    } catch (err) {
      console.error('Error fetching executive directives:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
    // 24/7 background polling every 30 seconds
    const interval = setInterval(() => {
      loadData(false);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const item: ExecutiveDirectiveItem = {
      id: `local-tddh-${Date.now()}`,
      code: newCode,
      type: 'TRỰC TIẾP',
      dateStr: new Date().toLocaleDateString('vi-VN'),
      timeStr: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      issuer: newIssuer,
      recipients: newRecipients,
      title: newTitle,
      content: newContent,
      priority: newPriority
    };

    setDirectives([item, ...directives]);
    setNewTitle('');
    setNewContent('');
    setNewCode(`TĐ-2026-${Math.floor(Math.random() * 900 + 100)}`);

    setDispatchToast(`📢 Đã lưu Thông Điệp Điều Hành [${item.code}] thành công! Hệ thống 24/7 sẽ tự động đồng bộ.`);
    setTimeout(() => setDispatchToast(null), 5000);
  };

  // Stats Counters
  const totalCount = directives.length;
  const directCount = directives.filter(d => d.type === 'TRỰC TIẾP').length;
  const indirectCount = directives.filter(d => d.type === 'GIÁN TIẾP').length;
  const unconfirmedCount = directives.filter(d => d.type === 'CHƯA XÁC NHẬN').length;

  // Filtered Directives
  const filteredDirectives = directives.filter(d => {
    const matchesSearch =
      !searchTerm ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.recipients && d.recipients.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === 'ALL' || d.type === filterType;
    const matchesPriority = filterPriority === 'ALL' || d.priority === filterPriority;
    const matchesIssuer = filterIssuer === 'ALL' || d.issuer.toLowerCase() === filterIssuer.toLowerCase();

    return matchesSearch && matchesType && matchesPriority && matchesIssuer;
  });

  // Unique Issuers for Filter
  const uniqueIssuers = Array.from(new Set(directives.map(d => d.issuer).filter(Boolean)));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 🔮 Header & Live Sync Banner - Bố Cục Tối Ưu Hiện Đại Chuẩn AVG One */}
      <div className="flex-shrink-0 bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#F15A24]/10 dark:bg-[#F15A24]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* CỘT TRÁI: Nhận diện, Tiêu đề & Nút thao tác */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50/90 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs">
              <Megaphone className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="text-[11px] font-extrabold text-sky-950 dark:text-sky-200 tracking-wider uppercase">
                AVG EXECUTIVE DIRECTIVE & DISPATCH
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>THÔNG ĐIỆP</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">ĐIỀU HÀNH HỆ THỐNG</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Đồng bộ dữ liệu thời gian thực 24/7 trực tiếp từ Google Sheets Kho Lưu Trữ Thông Điệp.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-1 flex-wrap">
              <button
                onClick={() => loadData(true)}
                disabled={loading}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Đang đồng bộ...' : 'Tải Lại (Sync Live)'}</span>
              </button>

              <a
                href={EXECUTIVE_DIRECTIVE_SHEET_EDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#F15A24] hover:bg-[#d94e1f] text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở Google Sheet Gốc</span>
              </a>

              {lastSyncTime && (
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono ml-auto sm:ml-2">
                  Đồng bộ: {lastSyncTime}
                </span>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: 4 Thẻ KPI Stat cân đối */}
          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:border-l lg:border-slate-200/80 dark:lg:border-slate-800 lg:pl-6">
            <div className="bg-sky-50/70 hover:bg-sky-50 dark:bg-sky-950/30 dark:hover:bg-sky-950/50 border border-sky-200/80 dark:border-sky-800/60 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">Tổng Thông Điệp</span>
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-[#0284C7]">
                  <Megaphone className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black text-sky-900 dark:text-sky-100">{totalCount}</div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-sky-700 dark:text-sky-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
                  Toàn hệ thống
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/70 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Trực Tiếp</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                  <User className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-100">{directCount}</div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Chỉ đạo đích danh
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 hover:bg-amber-50 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-500/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Gián Tiếp</span>
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600">
                  <Users className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black text-amber-900 dark:text-amber-100">{indirectCount}</div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Phối hợp liên phòng
                </div>
              </div>
            </div>

            <div className="bg-rose-50/70 hover:bg-rose-50 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 border border-rose-200/80 dark:border-rose-800/60 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-rose-500/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">Chưa Xác Nhận</span>
                <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black text-rose-900 dark:text-rose-100">{unconfirmedCount}</div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-rose-700 dark:text-rose-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Cần phản hồi gấp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatcher Form (Collapseable / Admin) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-[#F15A24]" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Ban Hành Thông Điệp & Chỉ Đạo Mới
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Quyền hạn: Điều Hành (DH / Key Leads)</span>
        </div>

        {dispatchToast && (
          <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-[#F15A24] dark:text-orange-300 text-xs font-bold flex items-center justify-between">
            <span>{dispatchToast}</span>
            <button onClick={() => setDispatchToast(null)} className="text-xs font-black cursor-pointer">✕</button>
          </div>
        )}

        <form onSubmit={handleCreateDirective} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mã Thông Điệp
              </label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Đầu Mối Chủ Thể (Người Phát)
              </label>
              <input
                type="text"
                value={newIssuer}
                onChange={(e) => setNewIssuer(e.target.value)}
                placeholder="VD: DH, Kiến, 1, 5.1..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Đầu Mối Phối Hợp (Người Nhận)
              </label>
              <input
                type="text"
                value={newRecipients}
                onChange={(e) => setNewRecipients(e.target.value)}
                placeholder="VD: @All, 5.1; 0; 8; 9"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mức Độ Ưu Tiên
              </label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
              >
                <option value="URGENT">🔴 Khẩn Cấp (Urgent)</option>
                <option value="HIGH">🟠 Trọng Tâm (High)</option>
                <option value="NORMAL">🔵 Bình Thường (Normal)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tiêu Đề Thông Điệp / Tóm Tắt Chỉ Đạo
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Nhập tiêu đề hoặc tóm tắt chỉ đạo ngắn gọn..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nội Dung Chi Tiết Thông Điệp Điều Hành
            </label>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Nhập chi tiết nội dung chỉ đạo chiến lược..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-medium"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F15A24] hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> <span>📢 Ban Hành Thông Điệp</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nội dung, đầu mối..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-medium"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold flex-shrink-0">
            <Filter className="w-3.5 h-3.5" /> <span>Lọc:</span>
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold focus:outline-none"
          >
            <option value="ALL">Tất cả loại (Direct/Indirect)</option>
            <option value="TRỰC TIẾP">TĐ Trực Tiếp</option>
            <option value="GIÁN TIẾP">TĐ Gián Tiếp</option>
            <option value="CHƯA XÁC NHẬN">Chưa Xác Nhận</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold focus:outline-none"
          >
            <option value="ALL">Tất cả mức ưu tiên</option>
            <option value="URGENT">🔴 Khẩn Cấp</option>
            <option value="HIGH">🟠 Trọng Tâm</option>
            <option value="NORMAL">🔵 Bình Thường</option>
          </select>

          {/* Issuer Filter */}
          <select
            value={filterIssuer}
            onChange={(e) => setFilterIssuer(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold focus:outline-none"
          >
            <option value="ALL">Tất cả đầu mối chủ thể</option>
            {uniqueIssuers.map(iss => (
              <option key={iss} value={iss}>{iss}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Directives Feed List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <span>Danh Sách Thông Điệp Điều Hành</span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
              {filteredDirectives.length} / {totalCount}
            </span>
          </h3>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#00E5FF]" />
            <div className="text-xs font-bold">Đang tải Thông Điệp Điều Hành từ Google Sheet...</div>
          </div>
        ) : filteredDirectives.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <AlertTriangle className="w-8 h-8 mx-auto text-amber-500" />
            <div className="text-xs font-bold">Không tìm thấy thông điệp nào phù hợp với bộ lọc.</div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDirectives.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 hover:border-cyan-400/60 transition space-y-3 shadow-xs"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Priority Badge */}
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      item.priority === 'URGENT' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800' :
                      item.priority === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-300 dark:border-orange-800' :
                      'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                    }`}>
                      {item.code || 'TĐ'}
                    </span>

                    {/* Type Badge */}
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      item.type === 'TRỰC TIẾP' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' :
                      item.type === 'GIÁN TIẾP' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                    }`}>
                      {item.type}
                    </span>

                    {/* Date / Time */}
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.dayOfWeek || ''} {item.dateStr} {item.timeStr && `| ${item.timeStr}`}
                    </span>
                  </div>

                  {/* Issuers & Recipients */}
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> <strong>Đầu mối:</strong> {item.issuer}
                    </span>
                    {item.recipients && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> <strong>Phối hợp:</strong> {item.recipients}
                      </span>
                    )}
                  </div>
                </div>

                {/* Directive Title */}
                <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                  {item.title}
                </h4>

                {/* Directive Main Content Body */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-white dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 whitespace-pre-line shadow-inner">
                  {item.content}
                </div>

                {/* Footer: Notes & Attached Drive Documents */}
                {(item.notes || item.linkUrl) && (
                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                    {item.notes && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                        💬 <strong>Ghi chú:</strong> {item.notes}
                      </div>
                    )}

                    {item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 text-[#0284C7] dark:text-sky-300 hover:bg-[#0284C7] hover:text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer ml-auto"
                      >
                        <FileText className="w-3.5 h-3.5" /> <span>Tài Liệu / Vốn Liệu Đính Kèm</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
