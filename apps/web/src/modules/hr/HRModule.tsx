import React, { useState } from 'react';
import {
  Users, UserPlus, Search, Filter, Mail, Phone, Building2, Shield, Briefcase,
  LayoutGrid, List, Network, Plus, X, Calendar, CheckCircle2, ChevronRight,
  Clock, MapPin, Award, ExternalLink, Sparkles, DollarSign, Coins, FileText,
  Key, ShieldCheck, Lock, CheckSquare, Layers, FolderKanban, Server, Scale, Wallet, FlaskConical, Boxes, Newspaper
} from 'lucide-react';

export interface EmployeeProfile {
  id: string;
  code: string;
  name: string;
  role: string;
  department: 'Quản trị C-Suite' | '3.1 - RDI' | '3.2 - THIẾT KẾ' | '6 - PHÁP LÝ' | 'Nhân sự & Văn hóa';
  email: string;
  phone: string;
  avatar: string;
  status: 'CHÍNH THỨC' | 'THỬ VIỆC' | 'TẠM NGHỈ';
  tags: string[];
  joinDate: string;
  manager: string;
  assignedModule?: string;
  baseSalary?: string;
  workHoursMonth?: number;
}

const INITIAL_EMPLOYEES: EmployeeProfile[] = [
  {
    id: 'emp-1',
    code: 'AVG-EMP-001',
    name: 'Nguyễn Văn Quản Lý',
    role: 'Chief Executive Officer (CEO)',
    department: 'Quản trị C-Suite',
    email: 'admin.ceo@auvietglobal.com',
    phone: '0988 123 456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    status: 'CHÍNH THỨC',
    tags: ['C-Suite', 'Lãnh đạo', 'Chủ chốt'],
    joinDate: '15/01/2020',
    manager: 'Hội đồng Quản trị',
    assignedModule: 'Hệ Thống & Ứng Dụng',
    baseSalary: '45,000,000 VNĐ',
    workHoursMonth: 176
  },
  {
    id: 'emp-2',
    code: 'AVG-EMP-002',
    name: 'Lê Văn Nhân Viên',
    role: 'Trưởng nhóm R&D / Firmware Lead',
    department: '3.1 - RDI',
    email: 'nhanvien.le@auvietglobal.com',
    phone: '0912 345 678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    status: 'CHÍNH THỨC',
    tags: ['RDI', 'AI Sensor', 'Core Tech'],
    joinDate: '10/03/2021',
    manager: 'Nguyễn Văn Quản Lý',
    assignedModule: 'Đơn Hàng & Nghiên Cứu R&D',
    baseSalary: '28,000,000 VNĐ',
    workHoursMonth: 180
  },
  {
    id: 'emp-3',
    code: 'AVG-EMP-003',
    name: 'Phạm Minh Tuấn',
    role: 'Chuyên viên Thiết kế Kiểu dáng CAD 3D',
    department: '3.2 - THIẾT KẾ',
    email: 'tuan.pham@auvietglobal.com',
    phone: '0903 888 999',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
    status: 'CHÍNH THỨC',
    tags: ['3D CAD', 'SolidWorks', 'In 3D'],
    joinDate: '01/06/2022',
    manager: 'Lê Văn Nhân Viên',
    assignedModule: 'Lịch & Bản vẽ Thiết kế',
    baseSalary: '22,000,000 VNĐ',
    workHoursMonth: 176
  },
  {
    id: 'emp-4',
    code: 'AVG-EMP-004',
    name: 'Vũ Quốc Huy',
    role: 'Cố vấn Pháp lý & Sở hữu Trí tuệ',
    department: '6 - PHÁP LÝ',
    email: 'huy.vu@auvietglobal.com',
    phone: '0934 555 666',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    status: 'CHÍNH THỨC',
    tags: ['Pháp lý', 'Bản quyền SHTT', 'Hợp đồng'],
    joinDate: '12/11/2021',
    manager: 'Nguyễn Văn Quản Lý',
    assignedModule: 'Pháp Lý & Hợp đồng',
    baseSalary: '25,000,000 VNĐ',
    workHoursMonth: 168
  },
  {
    id: 'emp-5',
    code: 'AVG-EMP-005',
    name: 'Trần Thị Mai',
    role: 'Trưởng phòng Nhân sự & Văn hóa AVG',
    department: 'Nhân sự & Văn hóa',
    email: 'mai.tran@auvietglobal.com',
    phone: '0977 111 222',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    status: 'CHÍNH THỨC',
    tags: ['HRM', 'Văn hóa AVG', 'Tuyển dụng'],
    joinDate: '05/04/2021',
    manager: 'Nguyễn Văn Quản Lý',
    assignedModule: 'Nhân Sự & Bảng Tin Inside',
    baseSalary: '24,000,000 VNĐ',
    workHoursMonth: 176
  },
  {
    id: 'emp-6',
    code: 'AVG-EMP-006',
    name: 'Hoàng Đức Anh',
    role: 'Kỹ sư Lập trình Bo mạch Nhúng',
    department: '3.1 - RDI',
    email: 'anh.hoang@auvietglobal.com',
    phone: '0966 444 333',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    status: 'THỬ VIỆC',
    tags: ['Embedded', 'IoT', 'Hardware'],
    joinDate: '01/08/2026',
    manager: 'Lê Văn Nhân Viên',
    assignedModule: 'Thủ tục Kiểm thử Bo mạch',
    baseSalary: '16,000,000 VNĐ',
    workHoursMonth: 160
  }
];

export const HRModule: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeProfile[]>(INITIAL_EMPLOYEES);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'org'>('kanban');
  
  // HR Sub-Tabs Management
  const [activeSubTab, setActiveSubTab] = useState<'employees' | 'attendance' | 'payroll' | 'ownership' | 'documents'>('employees');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<EmployeeProfile | null>(null);

  // New Employee Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState<EmployeeProfile['department']>('3.1 - RDI');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const departmentsList = [
    { id: 'ALL', name: 'Tất cả', count: employees.length },
    { id: 'Quản trị C-Suite', name: 'Quản trị C-Suite', count: employees.filter(e => e.department === 'Quản trị C-Suite').length },
    { id: '3.1 - RDI', name: '3.1 - RDI', count: employees.filter(e => e.department === '3.1 - RDI').length },
    { id: '3.2 - THIẾT KẾ', name: '3.2 - Thiết Kế', count: employees.filter(e => e.department === '3.2 - THIẾT KẾ').length },
    { id: '6 - PHÁP LÝ', name: '6 - Pháp Lý', count: employees.filter(e => e.department === '6 - PHÁP LÝ').length },
    { id: 'Nhân sự & Văn hóa', name: 'Nhân sự & Văn hóa', count: employees.filter(e => e.department === 'Nhân sự & Văn hóa').length }
  ];

  const filteredEmployees = employees.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newEmp: EmployeeProfile = {
      id: `emp-${Date.now()}`,
      code: `AVG-EMP-00${employees.length + 1}`,
      name: newName,
      role: newRole || 'Chuyên viên Nhân sự',
      department: newDept,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@auvietglobal.com`,
      phone: newPhone || '0900 000 000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300',
      status: 'CHÍNH THỨC',
      tags: ['Chủ chốt', 'New'],
      joinDate: new Date().toLocaleDateString('vi-VN'),
      manager: 'Nguyễn Văn Quản Lý',
      assignedModule: 'Chưa phân công',
      baseSalary: '18,000,000 VNĐ',
      workHoursMonth: 176
    };

    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
    setNewName('');
    setNewRole('');
    setNewEmail('');
    setNewPhone('');
  };

  return (
    <div className="hr-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* Hidden button targets for Header Sub-tab Integration */}
      <div className="hidden">
        <button id="btn-hr-subtab-employees" onClick={() => setActiveSubTab('employees')} />
        <button id="btn-hr-subtab-attendance" onClick={() => setActiveSubTab('attendance')} />
        <button id="btn-hr-subtab-payroll" onClick={() => setActiveSubTab('payroll')} />
        <button id="btn-hr-subtab-ownership" onClick={() => setActiveSubTab('ownership')} />
        <button id="btn-hr-subtab-documents" onClick={() => setActiveSubTab('documents')} />
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <div className="w-full h-full flex flex-col space-y-3 relative z-10 overflow-hidden">

        {/* 🔮 TOP BANNER EXECUTIVE DASHBOARD WITH SLOGAN BOX BADGE & BRUSH STROKE */}
        <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Slogan Badge Box */}
            <div className="space-y-2 text-left">
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="hr-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                    stroke="url(#hr-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>
                <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  <Users className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>AVG HR & CORE TALENT MODULE</span>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                  <span>QUẢN TRỊ</span>
                  <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                    <span className="relative z-10">NHÂN SỰ & VĂN HÓA</span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                    </svg>
                  </span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Hồ sơ nhân sự, bảng lương, sở hữu cổ phần & hợp đồng Tập đoàn
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#F15A24] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Thêm Nhân Sự Mới
            </button>

          </div>
        </div>

        {/* Sub-Header Row 2: THANH TÌM KIẾM NHANH (Universal Quick Search & Scope Filter Bar) */}
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl flex items-center justify-between gap-4 shadow-2xs">
        
        {/* Left: Universal Quick Search Bar */}
        <div className="flex-1 max-w-3xl relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Tìm kiếm nhanh nhân sự, mã nhân viên, phòng ban, ca làm, hợp đồng... (Ctrl + K)"
              className="w-full pl-10 pr-20 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-300/80 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 font-medium transition shadow-2xs"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
              Ctrl K
            </span>
          </div>

          {/* Quick Scope Filter Badges */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-[#F15A24] transition">
              Tất cả
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-[#F15A24] transition">
              Chính thức
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-[#F15A24] transition">
              Thử việc
            </span>
          </div>
        </div>

        {/* Right: Add Employee Action & View Switches */}
        <div className="flex items-center gap-2">
          {/* Quick View Switches */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-900 text-[#F15A24] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              title="Xem Dạng Thẻ Kanban"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-[#F15A24] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              title="Xem Dạng Danh Sách Bảng"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('org')}
              className={`p-1.5 rounded-md transition ${viewMode === 'org' ? 'bg-white dark:bg-slate-900 text-[#F15A24] font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              title="Xem Sơ Đồ Cây Tổ Chức"
            >
              <Network className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-[#F15A24] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Thêm Nhân Sự</span>
          </button>
        </div>

      </div>

      {/* Main Workspace Area (Expanded Full-Width Edge-to-Edge) */}
      <div className="w-full px-4 sm:px-8 py-6 flex-1">
        
        {/* TAB 1: NHÂN VIÊN (KANBAN / LIST / ORG CHART) */}
        {activeSubTab === 'employees' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* LEFT SIDEBAR FILTER (Phòng Ban Odoo Style) */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs h-fit space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#714B67]" /> Phòng Ban
                </h2>
                <span className="text-[10px] font-semibold text-slate-400">20 Core</span>
              </div>

              <div className="space-y-1">
                {departmentsList.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition ${
                      selectedDept === dept.id
                        ? 'bg-purple-50 dark:bg-purple-950/60 text-[#714B67] dark:text-purple-300 font-semibold shadow-2xs border border-purple-200 dark:border-purple-800'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{dept.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                      {dept.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT WORKSPACE AREA */}
            <div className="md:col-span-3 space-y-4">
              
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#714B67]" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">Danh Sách Nhân Sự ({filteredEmployees.length})</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm họ tên, email..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                    />
                  </div>

                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setViewMode('kanban')}
                      className={`p-1.5 rounded-lg text-xs transition ${
                        viewMode === 'kanban' ? 'bg-white dark:bg-slate-700 text-[#714B67] shadow-xs font-semibold' : 'text-slate-500'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg text-xs transition ${
                        viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-[#714B67] shadow-xs font-semibold' : 'text-slate-500'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('org')}
                      className={`p-1.5 rounded-lg text-xs transition ${
                        viewMode === 'org' ? 'bg-white dark:bg-slate-700 text-[#714B67] shadow-xs font-semibold' : 'text-slate-500'
                      }`}
                    >
                      <Network className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'kanban' ? (
                /* KANBAN CARDS GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEmployees.map(emp => (
                    <div
                      key={emp.id}
                      onClick={() => setSelectedEmp(emp)}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-[#714B67]/40 transition-all cursor-pointer overflow-hidden flex flex-col group"
                    >
                      <div className="p-4 flex items-start gap-3.5 flex-1">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-16 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0 group-hover:scale-105 transition-transform"
                        />

                        <div className="space-y-1 min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#714B67] transition-colors truncate">
                            {emp.name}
                          </h3>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                            {emp.role}
                          </p>

                          <div className="pt-1 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5 truncate">
                              <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span className="truncate">{emp.email}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span>{emp.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-medium text-slate-500">
                        <span>{emp.department}</span>
                        <span className="text-[#714B67] dark:text-purple-300 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Hồ sơ <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : viewMode === 'list' ? (
                /* LIST TABLE VIEW */
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3">Mã NV</th>
                        <th className="p-3">Họ & Tên Nhân Viên</th>
                        <th className="p-3">Chức Danh / Vị Trí</th>
                        <th className="p-3">Phòng Ban</th>
                        <th className="p-3">Phân Hệ Tiếp Quản</th>
                        <th className="p-3">Số Điện Thoại</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {filteredEmployees.map(emp => (
                        <tr
                          key={emp.id}
                          onClick={() => setSelectedEmp(emp)}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition cursor-pointer"
                        >
                          <td className="p-3 font-semibold text-[#714B67] dark:text-purple-300">{emp.code}</td>
                          <td className="p-3 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <img src={emp.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                            <span>{emp.name}</span>
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-300">{emp.role}</td>
                          <td className="p-3 text-slate-600 dark:text-slate-300">{emp.department}</td>
                          <td className="p-3 text-purple-700 dark:text-purple-300 font-semibold">{emp.assignedModule}</td>
                          <td className="p-3 text-slate-500">{emp.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* ORG CHART HIERARCHY VIEW */
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8 text-center">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Sơ Đồ Tổ Chức Nhân Sự AVG</h2>
                  
                  <div className="flex justify-center">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-800 rounded-2xl w-64 shadow-xs text-center space-y-1">
                      <img src={INITIAL_EMPLOYEES[0].avatar} alt="" className="w-12 h-12 rounded-full object-cover mx-auto ring-2 ring-purple-400" />
                      <h3 className="font-semibold text-xs text-[#714B67] dark:text-purple-300">{INITIAL_EMPLOYEES[0].name}</h3>
                      <p className="text-[10px] text-slate-500 font-medium">{INITIAL_EMPLOYEES[0].role}</p>
                    </div>
                  </div>

                  <div className="w-px h-8 bg-slate-300 mx-auto" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {INITIAL_EMPLOYEES.slice(1, 4).map(e => (
                      <div key={e.id} className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xs text-center space-y-1">
                        <img src={e.avatar} alt="" className="w-10 h-10 rounded-full object-cover mx-auto" />
                        <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">{e.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{e.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CHẤM CÔNG & CA LÀM */}
        {activeSubTab === 'attendance' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" /> Bảng Chấm Công & Ca Làm Việc Tháng 08/2026
                </h2>
                <p className="text-xs text-slate-500 mt-1">Theo dõi thời gian vắng mặt, OT giờ làm và số công chuẩn của 20 Nhân sự Chủ chốt.</p>
              </div>
              <button className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl hover:bg-slate-200">
                Xuất Báo Cáo Chấm Công (.XLSX)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Mã NV</th>
                    <th className="p-3">Nhân Sự</th>
                    <th className="p-3">Phòng Ban</th>
                    <th className="p-3">Tổng Giờ Làm</th>
                    <th className="p-3">Giờ OT Tăng Cường</th>
                    <th className="p-3">Số Ngày Công</th>
                    <th className="p-3">Trạng Thái Chấm Công</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {employees.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-[#714B67]">{e.code}</td>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{e.name}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{e.department}</td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{e.workHoursMonth || 176} giờ</td>
                      <td className="p-3 font-semibold text-amber-600">12 giờ OT</td>
                      <td className="p-3 font-bold text-emerald-600">22.0 ngày</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ĐẠT CHUẨN
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LƯƠNG & THU NHẬP */}
        {activeSubTab === 'payroll' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-600" /> Bảng Lương & Hạn Mức Tạm Ứng Ngân Sách
                </h2>
                <p className="text-xs text-slate-500 mt-1">Truy xuất bảo mật mức lương đóng BHXH, phụ cấp trách nhiệm đầu mối và hạn mức tạm ứng.</p>
              </div>
              <button className="px-3.5 py-1.5 bg-[#714B67] text-white font-semibold text-xs rounded-xl shadow-xs">
                + Tính Lương Tháng 8
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold uppercase text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Mã NV</th>
                    <th className="p-3">Nhân Sự Chủ Chốt</th>
                    <th className="p-3">Chức Danh</th>
                    <th className="p-3">Lương Cơ Bản</th>
                    <th className="p-3">Phụ Cấp Đầu Mối</th>
                    <th className="p-3">Hạn Mức Tạm Ứng Dòng</th>
                    <th className="p-3 text-right">Thực Nhận ESTIMATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {employees.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-[#714B67]">{e.code}</td>
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{e.name}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{e.role}</td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{e.baseSalary || '20,000,000 VNĐ'}</td>
                      <td className="p-3 font-semibold text-emerald-600">+3,000,000 VNĐ</td>
                      <td className="p-3 font-semibold text-purple-700 dark:text-purple-300">50,000,000 VNĐ</td>
                      <td className="p-3 text-right font-black text-slate-900 dark:text-white">
                        {e.baseSalary || '23,000,000 VNĐ'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PHÂN QUYỀN & ĐẦU MỐI TIẾP QUẢN PHÂN HỆ (20 CORE MATRIX) */}
        {activeSubTab === 'ownership' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" /> Ma Trận Phân Quyền & Đầu Mối Nhân Sự Tiếp Quản 9 Phân Hệ
              </h2>
              <p className="text-xs text-slate-500 mt-1">Định hướng phân công 20 Nhân sự Chủ chốt AVG chịu trách nhiệm vận hành, truy xuất & bảo mật từng phân hệ.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { module: 'HỆ THỐNG', icon: Server, lead: 'Nguyễn Văn Quản Lý (CEO)', role: 'Toàn quyền Administrator (Root)' },
                { module: 'ĐƠN HÀNG', icon: FolderKanban, lead: 'Lê Văn Nhân Viên (R&D Lead)', role: 'Điều phối Tiến độ & Mã đơn DH-2026' },
                { module: 'LỊCH', icon: Calendar, lead: 'Phạm Minh Tuấn (Thiết kế Lead)', role: 'Quản lý Lịch Công tác & Thiết kế CAD' },
                { module: 'PHÁP LÝ', icon: Scale, lead: 'Vũ Quốc Huy (Legal Lead)', role: 'Quản lý Hợp đồng & Bảo hộ SHTT' },
                { module: 'NHÂN SỰ', icon: Users, lead: 'Trần Thị Mai (HR Manager)', role: 'Quản lý Chấm công, Lương & Hồ sơ 20 Core' },
                { module: 'NGHIÊN CỨU R&D', icon: FlaskConical, lead: 'Hoàng Đức Anh (Embedded Dev)', role: 'Phụ trách Luồng SOP 13 Bước R&D' },
                { module: 'BẢNG TIN', icon: Newspaper, lead: 'Trần Thị Mai (HR Manager)', role: 'Biên tập Mạng Truyền thông Nội bộ' },
                { module: 'TÀI CHÍNH', icon: Wallet, lead: 'Phạm Thanh Hà (Trưởng Kế Toán)', role: 'Phê duyệt Tạm ứng Ngân sách 1-Click' },
                { module: 'ỨNG DỤNG', icon: Boxes, lead: 'Nguyễn Văn Quản Lý (CEO)', role: 'Quản trị Hub Dashboard Executive' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-[#714B67] dark:text-purple-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">{item.module}</h3>
                    </div>

                    <div className="pt-1 text-xs space-y-1">
                      <div className="font-bold text-[#714B67] dark:text-purple-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đầu mối: {item.lead}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        Quyền hạn: {item.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: HỒ SƠ & LƯU TRỮ HỢP ĐỒNG */}
        {activeSubTab === 'documents' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" /> Kho Hồ Sơ, Hợp Đồng Lao Động & Cam Kết Bảo Mật NDA
                </h2>
                <p className="text-xs text-slate-500 mt-1">Lưu trữ hồ sơ điện tử đã được mã hóa của 20 Nhân sự Chủ chốt AVG.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map(e => (
                <div key={e.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <FileText className="w-4 h-4 text-[#714B67]" />
                    <span className="truncate">Hop_Dong_LD_{e.code}.pdf</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Chủ thể: {e.name} ({e.role})</p>
                  <div className="pt-2 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-600 font-semibold">ĐÃ KÝ ĐIỆN TỬ</span>
                    <a href="#view" onClick={e => e.preventDefault()} className="text-[#714B67] dark:text-purple-300 font-semibold hover:underline">Tải về (.PDF)</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      </div>

      {/* EMPLOYEE PROFILE DETAIL DRAWER */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl overflow-y-auto flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slide-left">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
              <span className="text-xs font-semibold text-slate-400">Hồ sơ Nhân sự AVG</span>
              <button onClick={() => setSelectedEmp(null)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              <div className="text-center space-y-3">
                <img src={selectedEmp.avatar} alt="" className="w-24 h-28 rounded-2xl object-cover mx-auto border-2 border-purple-300 shadow-md" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedEmp.name}</h2>
                  <p className="text-xs font-medium text-[#714B67] dark:text-purple-300">{selectedEmp.role}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Mã Nhân viên</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedEmp.code}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Phân Hệ Tiếp Quản</span>
                  <span className="font-semibold text-purple-700 dark:text-purple-300">{selectedEmp.assignedModule}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Phòng Ban</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedEmp.department}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Email Công Việc</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedEmp.email}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 font-medium">Số Điện Thoại</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedEmp.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Thêm Nhân Sự Chủ Chốt Mới</h2>
            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Họ và Tên</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ tên nhân sự..."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Chức danh / Vị trí</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Kỹ sư R&D Firmware..."
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Phòng Ban</label>
                  <select
                    value={newDept}
                    onChange={e => setNewDept(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                  >
                    <option value="3.1 - RDI">3.1 - RDI</option>
                    <option value="3.2 - THIẾT KẾ">3.2 - THIẾT KẾ</option>
                    <option value="6 - PHÁP LÝ">6 - PHÁP LÝ</option>
                    <option value="Nhân sự & Văn hóa">Nhân sự & Văn hóa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Số Điện Thoại</label>
                  <input
                    type="text"
                    placeholder="09xx xxx xxx"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-500">
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2 bg-[#714B67] text-white font-semibold rounded-xl shadow-xs">
                  Thêm Nhân Sự
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
