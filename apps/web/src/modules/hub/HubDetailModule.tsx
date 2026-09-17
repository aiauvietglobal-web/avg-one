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
import { Cluster51Module } from './Cluster51Module';

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
  /* 📍 1. PHÂN HỆ CỤM 5.1 (TRANG CHỦ ĐỘC LẬP & 2 ĐẦU MỐI: 5.1B & 5.1T)        */
  /* ========================================================================= */
  if (activeModule === 'cluster51') {
    return (
      <Cluster51Module
        activeTab={activeTab}
        onSelectTab={onSelectTab}
      />
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
