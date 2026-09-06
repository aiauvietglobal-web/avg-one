import React, { useState } from 'react';
import {
  Shield, Users, Server, Database, HardDrive, Download, RefreshCw, CheckCircle2,
  Clock, Activity
} from 'lucide-react';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  status: 'ACTIVE' | 'INACTIVE';
  department: string;
  lastActive: string;
}

const DEMO_USERS: SystemUser[] = [
  { id: 'usr-1', name: 'Nguyễn Văn Quản Lý (CEO)', email: 'admin.ceo@auvietglobal.com', role: 'ADMIN', status: 'ACTIVE', department: 'Ban Giám Đốc', lastActive: '5 phút trước' },
  { id: 'usr-2', name: 'Trần Thị Trưởng Phòng (HR)', email: 'manager.hr@auvietglobal.com', role: 'MANAGER', status: 'ACTIVE', department: 'P. Hành Chính Nhân Sự', lastActive: '20 phút trước' },
  { id: 'usr-3', name: 'Lê Văn Nhân Viên (R&D)', email: 'staff.dev@auvietglobal.com', role: 'STAFF', status: 'ACTIVE', department: '3.1 - RDI', lastActive: '1 giờ trước' },
  { id: 'usr-4', name: 'Phạm Minh Tuấn (Thiết kế)', email: 'tuan.pm@auvietglobal.com', role: 'STAFF', status: 'ACTIVE', department: '3.2 - THIẾT KẾ', lastActive: 'Hôm qua' },
  { id: 'usr-5', name: 'Vũ Quốc Huy (Pháp lý)', email: 'huy.vq@auvietglobal.com', role: 'STAFF', status: 'ACTIVE', department: '6 - PHÁP LÝ', lastActive: '2 ngày trước' }
];

export const ITSystemView: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(DEMO_USERS);
  const [activeItTab, setActiveItTab] = useState<'users' | 'health' | 'backup' | 'audit'>('users');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u));
  };

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setBackupMessage(null);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupMessage(`✅ Đã xuất bản sao lưu Database Postgres (.sql) dung lượng 4.2MB thành công vào lúc ${new Date().toLocaleTimeString('vi-VN')}!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" /> AVG IT Admin & System Portal
          </div>
          <h1 className="text-2xl font-bold">Trung Tâm Quản Trị & Bảo Trì IT</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Công cụ số hóa dành cho bộ phận IT: Quản lý 20 tài khoản nhân sự, theo dõi sức khỏe hạ tầng, backup dữ liệu 1-click & kiểm vết audit.
          </p>
        </div>
        <div className="bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-xl text-xs font-bold text-blue-300 flex items-center gap-2 self-start md:self-auto">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Uptime 99.99% • 20 Users Ready</span>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {[
          { id: 'users', label: 'Quản lý 20 Users', icon: Users },
          { id: 'health', label: 'Sức khỏe Hạ tầng', icon: Server },
          { id: 'backup', label: 'Sao lưu & Phục hồi', icon: Database },
          { id: 'audit', label: 'Nhật ký Audit Logs', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveItTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
                activeItTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content: Users Management */}
      {activeItTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Danh Sách 20 Tài Khoản Nhân Sự</h3>
              <p className="text-xs text-slate-500">Phân quyền vai trò (ADMIN, MANAGER, STAFF) và trạng thái truy cập hệ thống.</p>
            </div>
            <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5 cursor-pointer">
              + Thêm Nhân Sự Mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">Họ & Tên</th>
                  <th className="p-3">Email Doanh Nghiệp</th>
                  <th className="p-3">Phòng Ban</th>
                  <th className="p-3">Phân Quyền</th>
                  <th className="p-3">Đăng Nhập Cuối</th>
                  <th className="p-3">Trạng Thái</th>
                  <th className="p-3 text-right rounded-r-xl">Thao Tác IT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-100">{u.name}</td>
                    <td className="p-3 text-slate-500">{u.email}</td>
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{u.department}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                        u.role === 'MANAGER' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{u.lastActive}</td>
                    <td className="p-3">
                      {u.status === 'ACTIVE' ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">● Hoạt động</span>
                      ) : (
                        <span className="text-rose-500 font-bold flex items-center gap-1">● Đã khóa</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                          u.status === 'ACTIVE'
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'Khóa TK' : 'Mở khóa'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: System Health */}
      {activeItTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" /> Máy Chủ & API Latency
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Node.js API Server</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Healthy (24ms)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400 font-medium">PostgreSQL Database</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Connected (Cloud Supabase)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Cloudflare WAF / CDN</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Active (SSL 1.3)</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-purple-600" /> Dung Lượng Lưu Trữ Dữ Liệu
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Database Storage (Postgres 500MB Free Tier)</span>
                  <span className="text-blue-600 font-extrabold">24MB / 500MB (5%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Cloudflare R2 Storage (10GB Free File Uploads)</span>
                  <span className="text-purple-600 font-extrabold">420MB / 10GB (4%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '4%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Backup */}
      {activeItTab === 'backup' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Quản Lý Sao Lưu Dữ Liệu (Backup & Restore)</h3>
              <p className="text-xs text-slate-500">Tự động backup định kỳ lúc 02:00 sáng hàng ngày hoặc kích hoạt sao lưu 1-click tức thì.</p>
            </div>
            <button
              onClick={handleTriggerBackup}
              disabled={isBackingUp}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isBackingUp ? 'animate-spin' : ''}`} />
              {isBackingUp ? 'Đang xuất bản sao lưu...' : 'Sao Lưu Tức Thì (1-Click Backup)'}
            </button>
          </div>

          {backupMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              {backupMessage}
            </div>
          )}

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider">Lịch sử các bản sao lưu gần nhất</h4>
            {[
              { filename: 'avg_one_backup_2026-08-27_0200.sql', size: '4.2 MB', date: '27/08/2026 02:00' },
              { filename: 'avg_one_backup_2026-08-26_0200.sql', size: '4.1 MB', date: '26/08/2026 02:00' },
              { filename: 'avg_one_backup_2026-08-25_0200.sql', size: '3.9 MB', date: '25/08/2026 02:00' }
            ].map((b, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{b.filename}</span>
                  <span className="text-slate-400">({b.size})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{b.date}</span>
                  <button className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-100 transition cursor-pointer">
                    <Download className="w-3.5 h-3.5 text-blue-500" /> Tải về
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Audit Logs */}
      {activeItTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base border-b border-slate-100 dark:border-slate-800 pb-3">
            Nhật Ký Thao Tác Hệ Thống (Audit Trail)
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { user: 'Nguyễn Văn Quản Lý', action: 'Phê duyệt Đề xuất tạm ứng kinh phí R&D', ip: '14.232.xxx.xxx', time: '10:05 - Hôm nay' },
              { user: 'Trần Thị Trưởng Phòng', action: 'Tạo bài viết mới trên AVG Inside', ip: '113.161.xxx.xxx', time: '09:20 - Hôm nay' },
              { user: 'Lê Văn Nhân Viên', action: 'Cập nhật trạng thái Đơn hàng DH-2026-801 sang IN_PROGRESS', ip: '27.72.xxx.xxx', time: '08:45 - Hôm nay' }
            ].map((log, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">{log.user}:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{log.action}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>IP: {log.ip}</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
