import React, { useState } from 'react';
import {
  Server, Wrench, Activity, SlidersHorizontal, Workflow, Target,
  CheckCircle2, FileText, ShieldCheck, Key, Database, AlertTriangle,
  Zap, Globe, GitBranch, BarChart3, Award, Building2, BadgeCheck,
  FolderKanban, Layers, Hash, Sparkles, Download, Clock, UserCheck,
  Check, ArrowRight, ShieldAlert, Cpu, Package, Inbox, Rocket, RefreshCw,
  ExternalLink, Search, Filter, AlertCircle, FileSpreadsheet, Lock,
  Boxes, Users, Plus
} from 'lucide-react';
import { AppModuleId } from '../../components/layout/AppLauncherModal';
import { ClusterKModule } from './ClusterKModule';

interface HubDetailModuleProps {
  activeModule: AppModuleId;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const HubDetailModule: React.FC<HubDetailModuleProps> = ({
  activeModule,
  activeTab,
  onSelectTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  /* ========================================================================= */
  /* 📍 1. PHÂN HỆ CỤM 5.1 (2 GIAO DIỆN / ĐẦU MỐI ĐỘC LẬP: 5.1B & 5.1T) */
  /* ========================================================================= */
  if (activeModule === 'cluster51') {
    const is51B = activeTab === 'pilot51b' || !activeTab;
    
    return (
      <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4">
        
        {/* Banner Định Danh Đầu Mối Độc Lập */}
        <div className={`p-4 sm:p-6 rounded-2xl border shadow-sm ${
          is51B
            ? 'bg-gradient-to-r from-blue-900/90 via-slate-900 to-indigo-950 text-white border-blue-500/30'
            : 'bg-gradient-to-r from-orange-950/90 via-slate-900 to-amber-950 text-white border-orange-500/30'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                is51B ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300' : 'bg-orange-500/20 border border-orange-400/40 text-orange-300'
              }`}>
                {is51B ? <Inbox className="w-7 h-7" /> : <Rocket className="w-7 h-7" />}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    {is51B ? 'ĐẦU MỐI 5.1B ĐẦU VÀO' : 'ĐẦU MỐI 5.1T ĐẦU RA'}
                  </h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    is51B ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40' : 'bg-orange-500/30 text-orange-200 border border-orange-400/40'
                  }`}>
                    {is51B ? 'Thí Điểm & Tiếp Nhận Đơn Hàng' : 'Triển Khai & Nghiệm Thu Bàn Giao'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {is51B
                    ? 'Đầu mối chịu trách nhiệm tiếp nhận nhu cầu, khảo sát sơ bộ, lập hồ sơ thí điểm (Bước 1) và nghiệm thu tổng kết VBKL (Bước 13).'
                    : 'Đầu mối chịu trách nhiệm tổ chức đóng gói, xuất kho giao vận (Bước 11) và nghiệm thu thực địa tại công trình (Bước 12).'}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase">Cán bộ chủ trì</div>
                <div className="text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5">
                  {is51B ? 'Bà Bích (Phụ trách B5.1)' : 'Kỹ sư Trưởng 5.1T'}
                </div>
              </div>
              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase">Đơn hàng hiện hành</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">
                  {is51B ? '14 Đơn' : '9 Đơn'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Chỉ số KPI Tác nghiệp */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {is51B ? 'Đề xuất Mới Chờ Thẩm Định' : 'Đơn Chờ Đóng Gói Xuất Kho'}
            </div>
            <div className="text-xl font-black text-[#0284C7] dark:text-sky-400 mt-1">
              {is51B ? '4 Hồ Sơ' : '3 Lô Hàng'}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {is51B ? 'Đang Chạy Thử Nghiệm' : 'Đang Kiểm Thử Thực Địa'}
            </div>
            <div className="text-xl font-black text-amber-500 mt-1">
              {is51B ? '6 Dự Án' : '4 Công Trình'}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {is51B ? 'Biên Bản VBKL Đã Ký' : 'Nghiệm Thu Hoàn Tất'}
            </div>
            <div className="text-xl font-black text-emerald-500 mt-1">
              {is51B ? '18 Văn Bản' : '22 Đơn'}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Tỷ Lệ Tiến Độ SLA</div>
            <div className="text-xl font-black text-purple-500 mt-1">98.5%</div>
          </div>
        </div>

        {/* Danh sách Đơn hàng và Nhiệm vụ trực thuộc */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#F15A24]" />
              {is51B ? 'Danh Mục Đơn Hàng Thí Điểm Đầu Vào (5.1B)' : 'Danh Mục Đơn Hàng Giao Vận & Nghiệm Thu Đầu Ra (5.1T)'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Đồng bộ tự động 24/7 với Google Sheet & Supabase</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-black">
                  <th className="py-2.5 px-3">Mã Đơn</th>
                  <th className="py-2.5 px-3">Tên Dự Án / Nội Dung</th>
                  <th className="py-2.5 px-3">Bước Quy Trình</th>
                  <th className="py-2.5 px-3">Mức Độ</th>
                  <th className="py-2.5 px-3">Người Phụ Trách</th>
                  <th className="py-2.5 px-3">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold">
                {is51B ? (
                  <>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#0284C7]">DH-2026-B51-001</td>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Thí điểm Mạch Cảm Biến AI Telemetry</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">Bước 1: Tiếp Nhận</span></td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-black">🔥 TRỌNG ĐIỂM</span></td>
                      <td className="py-2.5 px-3">Bà Bích</td>
                      <td className="py-2.5 px-3"><span className="text-amber-500 font-bold">Đang Khảo Sát</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#0284C7]">DH-2026-B51-002</td>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Đơn hàng Đề xuất Thử nghiệm Bo mạch Smart Meter</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">Bước 1: Tiếp Nhận</span></td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-[10px] font-black">⚡ KHẨN CẤP</span></td>
                      <td className="py-2.5 px-3">Tài chính 5.1</td>
                      <td className="py-2.5 px-3"><span className="text-sky-500 font-bold">Chờ Duyệt Cấp</span></td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-orange-600">DH-2026-51T-088</td>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Vận chuyển Lô 50 Bộ Thiết Bị AVG-Grid sang Nhà máy</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 font-bold border border-orange-200 dark:border-orange-800">Bước 11: Đóng Gói</span></td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-[10px] font-black">⚡ KHẨN CẤP</span></td>
                      <td className="py-2.5 px-3">5.1T Điều Phối</td>
                      <td className="py-2.5 px-3"><span className="text-amber-500 font-bold">Đang Giao Vận</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-orange-600">DH-2026-51T-091</td>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">Nghiệm thu Thực địa & Bàn giao Trạm Đo Năng Lượng</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">Bước 12: Nghiệm Thu</span></td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-[10px] font-black">💎 TIỂU DỰ ÁN</span></td>
                      <td className="py-2.5 px-3">Kỹ sư Thực địa</td>
                      <td className="py-2.5 px-3"><span className="text-emerald-500 font-bold">Hoàn Tất 100%</span></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }

  /* ========================================================================= */
  /* 💠 2. PHÂN HỆ CỤM #K (5 HỘP ĐỘC LẬP & GIAO DIỆN NGHIỆP VỤ ĐỘC LẬP 100%) */
  /* ========================================================================= */
  if (activeModule === 'clusterK') {
    return (
      <ClusterKModule
        activeTab={activeTab}
        onSelectTab={onSelectTab}
      />
    );
  }

  /* ========================================================================= */
  /* ⚙️ 3. PHÂN HỆ HẠ TẦNG 2.2 */
  /* ========================================================================= */
  if (activeModule === 'infra22') {
    return (
      <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4">
        <div className="p-4 sm:p-6 rounded-2xl border shadow-sm bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 text-white border-cyan-500/30">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
              <Server className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black">HẠ TẦNG CỨNG & MÁY MÓC THIẾT BỊ 2.2</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Quản lý máy móc thiết bị R&D, trạm làm việc kỹ thuật cao và phòng máy chủ 24/7 phục vụ liên thông các đầu mối khác.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Máy Móc R&D Sẵn Sàng</div>
            <div className="text-xl font-black text-cyan-600 dark:text-cyan-400 mt-1">12 Thiết Bị</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Trạm 20 Users IT</div>
            <div className="text-xl font-black text-emerald-500 mt-1">20/20 Hoạt Động</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Tỷ Lệ Uptime Server</div>
            <div className="text-xl font-black text-[#0284C7] mt-1">99.98%</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Lịch Bảo Trì Kế Tiếp</div>
            <div className="text-xl font-black text-amber-500 mt-1">28/09/2026</div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 🛡️ 4. PHÂN HỆ BẢO MẬT */
  /* ========================================================================= */
  if (activeModule === 'security') {
    return (
      <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4">
        <div className="p-4 sm:p-6 rounded-2xl border shadow-sm bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white border-rose-500/30">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black">TRUNG TÂM AN NINH & BẢO MẬT HỆ THỐNG</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Giám sát mã hóa dữ liệu 24/7, ma trận phân quyền 20 tài khoản, kiểm vết audit trail và sao lưu dữ liệu tức thì.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Cấp Độ An Ninh</div>
            <div className="text-xl font-black text-emerald-500 mt-1">Chuẩn ISO 27001</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Tài Khoản Phân Quyền</div>
            <div className="text-xl font-black text-[#0284C7] mt-1">20 Tài Khoản</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Mã Hóa Dữ Liệu</div>
            <div className="text-xl font-black text-purple-500 mt-1">AES-256 / TLS 1.3</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Bản Sao Lưu Gần Nhất</div>
            <div className="text-xl font-black text-rose-500 mt-1">10 Phút Trước</div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* ⚡ 5. PHÂN HỆ THÔNG (THÔNG TẮC NGHẼN & THƯƠNG NGOẠI) */
  /* ========================================================================= */
  if (activeModule === 'traffic8') {
    return (
      <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4">
        <div className="p-4 sm:p-6 rounded-2xl border shadow-sm bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 text-white border-amber-500/30">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black">ĐẦU MỐI 8: THÔNG TẮC NGHẼN & THƯƠNG NGOẠI</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Chủ trì tháo gỡ điểm nghẽn tác nghiệp trong chuỗi 13 SOP và mở rộng giao thoa thương mại, kết nối từ trong ra ngoài.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Điểm Nghẽn Đã Giải Tỏa</div>
            <div className="text-xl font-black text-emerald-500 mt-1">100% (24/24)</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Đối Tác Thương Ngoại</div>
            <div className="text-xl font-black text-amber-500 mt-1">8 Đối Tác</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Kênh Cung Ứng Linh Kiện</div>
            <div className="text-xl font-black text-[#0284C7] mt-1">Liên Thông Toàn Cầu</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 font-bold">Tốc Độ Phản Hồi</div>
            <div className="text-xl font-black text-purple-500 mt-1">&lt; 2 Giờ</div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 🏆 6. PHÂN HỆ HỒ SƠ NĂNG LỰC */
  /* ========================================================================= */
  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 p-3 sm:p-5 space-y-4">
      <div className="p-4 sm:p-6 rounded-2xl border shadow-sm bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white border-teal-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black">HỒ SƠ NĂNG LỰC TỔNG THỂ TẬP ĐOÀN AVG ONE</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Bức tranh tổng thể năng lực nghiên cứu R&D, sản xuất thực nghiệm, chuỗi giá trị 13 bước và danh mục bằng độc quyền SHTT.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 font-bold">Bằng Sáng Chế & Kiểu Dáng</div>
          <div className="text-xl font-black text-teal-600 dark:text-teal-400 mt-1">26 Hồ Sơ SHTT</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 font-bold">Dự Án Đã Chuyển Giao</div>
          <div className="text-xl font-black text-emerald-500 mt-1">15+ Công Trình</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 font-bold">Chứng Nhận Chất Lượng</div>
          <div className="text-xl font-black text-[#0284C7] mt-1">ISO 9001 / CE</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 font-bold">Đội Ngũ Kỹ Sư Chuyên Gia</div>
          <div className="text-xl font-black text-amber-500 mt-1">20 Nhân Sự Lõi</div>
        </div>
      </div>
    </div>
  );
};
