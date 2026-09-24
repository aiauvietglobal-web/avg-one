import React, { useState, useEffect } from 'react';
import {
  Compass, Cpu, ArrowLeft, CheckCircle2, ArrowRight, Wrench, Flame, CheckSquare,
  Layers, FileText, AlertCircle, ShieldCheck, Plus, Search, Filter, Download,
  Eye, Code2, HardDrive, CheckSquare2, Sparkles, SlidersHorizontal, RefreshCw, X, FolderKanban,
  Clock, Package, Check, ChevronRight, Share2, ClipboardCheck, Lightbulb,
  FileCode, Box, ExternalLink, Play, Zap, Award, Activity, FileSpreadsheet,
  Database, Tag, AlertTriangle, ChevronDown, User, Calendar
} from 'lucide-react';

interface StepDetail {
  step: number;
  title: string;
  department: string;
  description: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
}

const SOP_13_STEPS: StepDetail[] = [
  { step: 1, title: 'Tiếp nhận Đề xuất R&D & Khảo sát', department: '3.1 - RDI', description: 'Ghi nhận nhu cầu nghiên cứu linh kiện & sản phẩm mới từ Ban Giám Đốc', status: 'COMPLETED' },
  { step: 2, title: 'Lập Kế hoạch Chi tiết & Mã Đơn DH-2026', department: '3.1 - RDI', description: 'Khởi tạo mã đơn hàng chuẩn hoá trên hệ thống AVG One', status: 'COMPLETED' },
  { step: 3, title: 'Thiết kế Sơ bộ & Phê duyệt Nguyên lý', department: '3.2 - THIẾT KẾ', description: 'Vẽ sơ đồ nguyên lý điện tử & phác thảo kiểu dáng công nghiệp 3D', status: 'IN_PROGRESS' },
  { step: 4, title: 'Thiết kế Chi tiết CAD & Bo mạch PCB', department: '3.2 - THIẾT KẾ', description: 'Xuất file Gerber mạch PCB và bản vẽ CAD lắp ráp', status: 'PENDING' },
  { step: 5, title: 'Mua sắm Linh kiện Mẫu & Đặt bo mạch', department: 'CUNG ỨNG', description: 'Đặt hàng linh kiện chip AI và gia công 10 bo mạch thử nghiệm', status: 'PENDING' },
  { step: 6, title: 'Hàn lắp Bo mạch Mẫu & Kiểm tra Phần cứng', department: '3.1 - RDI', description: 'Hàn linh kiện SMT thử nghiệm đo đạc điện áp nguồn', status: 'PENDING' },
  { step: 7, title: 'Lập trình Firmware & Tích hợp Hệ thống', department: '3.1 - RDI', description: 'Viết code điều khiển vi xử lý và truyền dữ liệu Cloud Supabase', status: 'PENDING' },
  { step: 8, title: 'Thử nghiệm Đo lường trong Phòng Lab', department: '3.1 - RDI', description: 'Chạy test 72 giờ liên tục kiểm tra độ ổn định nhiệt độ', status: 'PENDING' },
  { step: 9, title: 'Kiểm định An toàn & Đăng ký Pháp lý', department: '6 - PHÁP LÝ', description: 'Kiểm định hợp chuẩn chứng nhận tiêu chuẩn Việt Nam', status: 'PENDING' },
  { step: 10, title: 'Chế tạo Vỏ hộp Sản phẩm Hàng mẫu (Prototype)', department: '3.2 - THIẾT KẾ', description: 'In 3D hoàn thiện sản phẩm hoàn chỉnh', status: 'PENDING' },
  { step: 11, title: 'Thử nghiệm Thực địa tại Khách hàng', department: 'BAN ĐIỀU HÀNH', description: 'Lắp đặt chạy thử 14 ngày tại công trình thực tế', status: 'PENDING' },
  { step: 12, title: 'Nghiệm thu & Đóng gói Tài liệu Hướng dẫn', department: '3.1 - RDI', description: 'Xuất file SOP hoàn chỉnh và chuyển giao cho sản xuất', status: 'PENDING' },
  { step: 13, title: 'Bàn giao Sản xuất Hàng loạt & Lưu trữ', department: 'SẢN XUẤT', description: 'Nghiệm thu đóng mã đơn DH-2026 chính thức', status: 'PENDING' }
];

/* ========================================================================= */
/* 📋 CẤU TRÚC ĐƠN HÀNG VÀ 4 BƯỚC XỬ LÝ TIẾN TRÌNH CHUẨN HOÁ */
/* ========================================================================= */
interface OrderItem {
  code: string;
  name: string;
  project: string;
  priority: 'P1 - Khẩn Cấp' | 'P2 - Cao' | 'P3 - Tiêu Chuẩn';
  targetDate: string;
  totalSla: string;
  currentStep: number;
}

const ORDERS_LIST: OrderItem[] = [
  {
    code: 'DH-2026-RND-001',
    name: 'Mạch Cảm Biến AI Telemetry',
    project: 'Dự Án Quan Trắc Thông Minh AVG-IoT',
    priority: 'P1 - Khẩn Cấp',
    targetDate: '15/09/2026',
    totalSla: '168 Giờ',
    currentStep: 2
  },
  {
    code: 'DH-2026-RND-002',
    name: 'Bo Mạch Nhúng Smart Meter IoT',
    project: 'Dự Án Đồng Hồ Đo Điện Thông Minh AVG-Grid',
    priority: 'P2 - Cao',
    targetDate: '22/09/2026',
    totalSla: '144 Giờ',
    currentStep: 3
  },
  {
    code: 'DH-2026-RND-003',
    name: 'Vỏ Hộp Prototype Chống Nước IP67',
    project: 'Dự Án Vỏ Bảo Vệ Công Nghiệp Ngoài Trời',
    priority: 'P1 - Khẩn Cấp',
    targetDate: '18/09/2026',
    totalSla: '96 Giờ',
    currentStep: 1
  }
];

interface OrderDeliverable {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  author: string;
  status: 'APPROVED' | 'IN_REVIEW' | 'DRAFT';
}

interface ChecklistItem {
  id: string;
  text: string;
  standard: string;
  defaultChecked: boolean;
}

interface OrderProcessStep {
  step: number;
  code: string;
  name: string;
  dept: string;
  leadEngineer: string;
  avatar: string;
  desc: string;
  sla: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  checklists: ChecklistItem[];
  deliverables: OrderDeliverable[];
}

const ORDER_4_STEPS: OrderProcessStep[] = [
  {
    step: 1,
    code: 'BƯỚC 1',
    name: 'Khảo Sát & Lập Hồ Sơ (SRS)',
    dept: '3.1 - RDI / BAN GIÁM ĐỐC',
    leadEngineer: 'TS. Hoàng Quốc Việt',
    avatar: 'HV',
    desc: 'Ghi nhận đề xuất đơn hàng R&D mới, khảo sát tính khả thi kỹ thuật, lập danh mục yêu cầu kỹ thuật (SRS) & cấp Mã Đơn DH-2026 chuẩn hóa.',
    sla: '24 Giờ',
    status: 'COMPLETED',
    checklists: [
      { id: 'c1-1', text: 'Khởi tạo Mã Đơn Hàng DH-2026 chuẩn hóa trên hệ thống AVG One', standard: 'Quy chuẩn mã đơn ISO-2026', defaultChecked: true },
      { id: 'c1-2', text: 'Phê duyệt tài liệu SRS đặc tả thông số kỹ thuật và linh kiện R&D', standard: 'Tiêu chuẩn RDI AVG', defaultChecked: true },
      { id: 'c1-3', text: 'Phân công kỹ sư chủ trì CAD/PCB và chốt hạn mức SLA 4 giai đoạn', standard: 'Phê duyệt Ban Giám Đốc', defaultChecked: true }
    ],
    deliverables: [
      { id: 'DEL-101', name: 'Đặc Tả Yêu Cầu Kỹ Thuật Dự Án (SRS-2026-AI.pdf)', type: 'Tài liệu SRS', size: '3.8 MB', date: '01/09/2026', author: 'TS. Hoàng Quốc Việt', status: 'APPROVED' },
      { id: 'DEL-102', name: 'Quyết Định Phê Duyệt Cấp Mã Đơn & Ngân Sách (Decision_RND.pdf)', type: 'Quyết định BGĐ', size: '1.4 MB', date: '02/09/2026', author: 'Ban Giám Đốc', status: 'APPROVED' }
    ]
  },
  {
    step: 2,
    code: 'BƯỚC 2',
    name: 'Thiết Kế Sơ Đồ CAD/PCB & 3D',
    dept: '3.2 - THIẾT KẾ & 3.1 - RDI',
    leadEngineer: 'KS. Lê Văn Thiết Kế',
    avatar: 'LT',
    desc: 'Triển khai vẽ sơ đồ nguyên lý Altium PCB, xuất file Gerber 4 lớp chuẩn IPC, dựng mô hình 3D SolidWorks vỏ hộp và viết code Firmware C++ Sensor Driver.',
    sla: '48 Giờ',
    status: 'IN_PROGRESS',
    checklists: [
      { id: 'c2-1', text: 'Đã vẽ xong sơ đồ nguyên lý mạch & file Gerber PCB 4 lớp chuẩn IPC-2221', standard: 'Altium Designer v24.2', defaultChecked: true },
      { id: 'c2-2', text: 'Đã dựng xong bản vẽ 3D SolidWorks vỏ hộp mẫu đạt chuẩn chống nước IP67', standard: 'SolidWorks 3D STEP', defaultChecked: true },
      { id: 'c2-3', text: 'Đã lập trình xong Firmware C++ AI Sensor Driver v2.4 và test Flasher', standard: 'Firmware Embedded C++', defaultChecked: false }
    ],
    deliverables: [
      { id: 'DEL-201', name: 'Sơ Đồ Nguyên Lý Mạch Altium (Schematic_v3.2.SchDoc)', type: 'Altium Schematic', size: '24.8 MB', date: '03/09/2026', author: 'KS. Lê Văn Thiết Kế', status: 'APPROVED' },
      { id: 'DEL-202', name: 'Bộ File Gerber Bo Mạch 4 Lớp Xuất Nhà Máy (Gerber_PCB_4L.zip)', type: 'Gerber IPC Zip', size: '8.2 MB', date: '03/09/2026', author: 'Trần Kỹ Thuật (PCB)', status: 'APPROVED' },
      { id: 'DEL-203', name: 'Bản Vẽ 3D SolidWorks Vỏ Hộp Lắp Ráp (AVG_Box_IP67.STEP)', type: 'SolidWorks STEP', size: '42.5 MB', date: '04/09/2026', author: 'Hoàng Quốc Việt (3D)', status: 'IN_REVIEW' },
      { id: 'DEL-204', name: 'Mã Nguồn Firmware C++ AI Sensor Driver (Driver_v2.4.hex)', type: 'Hex/Firmware C++', size: '3.6 MB', date: 'Hôm nay', author: 'Hoàng Đức Anh (Dev)', status: 'DRAFT' }
    ]
  },
  {
    step: 3,
    code: 'BƯỚC 3',
    name: 'Chế Tạo Mẫu 3D & Đo Kiểm Lab',
    dept: 'PHÒNG LAB 72H & TRẠM PROTOTYPE',
    leadEngineer: 'KTV. Trần Đo Lường',
    avatar: 'TĐ',
    desc: 'In 3D SLA Resin vỏ hộp mẫu, hàn mạch SMT thử nghiệm, đo đạc điện áp nguồn 3.3V/5V và test nhiệt 42°C liên tục 72 giờ trong phòng Lab.',
    sla: '72 Giờ',
    status: 'PENDING',
    checklists: [
      { id: 'c3-1', text: 'Vỏ hộp in 3D đạt chuẩn chống nước IP67 và độ bền va đập công nghiệp', standard: 'Test ngâm nước IP67', defaultChecked: false },
      { id: 'c3-2', text: 'Bo mạch SMT hàn thử nghiệm đo điện áp ổn định 99.9% nguồn 3.3V', standard: 'Đo dao động nguồn OSC', defaultChecked: false },
      { id: 'c3-3', text: 'Hoàn tất test thử nghiệm liên tục 72h trong phòng Lab không phát sinh lỗi', standard: 'Buồng nhiệt 42°C liên tục', defaultChecked: false }
    ],
    deliverables: [
      { id: 'DEL-301', name: 'Biên Bản Thử Nghiệm Đo Lường Phòng Lab 72 Giờ (Report_Lab_72h.pdf)', type: 'Lab Test Report', size: '5.2 MB', date: 'Chờ thực hiện', author: 'KTV. Trần Đo Lường', status: 'DRAFT' },
      { id: 'DEL-302', name: 'Nhật Ký Đo Nhiệt Độ & Ổn Định Tín Hiệu (Thermal_Log.csv)', type: 'CSV Sensor Data', size: '11.4 MB', date: 'Chờ thực hiện', author: 'Phòng Kiểm Định Lab', status: 'DRAFT' }
    ]
  },
  {
    step: 4,
    code: 'BƯỚC 4',
    name: 'Nghiệm Thu SOP & Bàn Giao',
    dept: 'BAN ĐIỀU HÀNH & SẢN XUẤT',
    leadEngineer: 'GĐ. Nguyễn Điều Hành',
    avatar: 'NĐ',
    desc: 'Chạy thử nghiệm 14 ngày tại công trình thực tế, đóng gói bộ tài liệu SOP hướng dẫn và chính thức nghiệm thu đóng mã đơn DH-2026 chuyển giao Sản Xuất.',
    sla: '24 Giờ',
    status: 'PENDING',
    checklists: [
      { id: 'c4-1', text: 'Đã nghiệm thu thử nghiệm thực địa 14 ngày tại công trình khách hàng', standard: 'Biên bản thử nghiệm Pilot', defaultChecked: false },
      { id: 'c4-2', text: 'Đã đóng gói đầy đủ bộ file Gerber, CAD 3D, Code & SOP sản xuất', standard: 'Gói SOP tiêu chuẩn', defaultChecked: false },
      { id: 'c4-3', text: 'Chính thức đóng mã đơn DH-2026 và ký biên bản chuyển giao Sản Xuất', standard: 'Nghiệm thu đóng đơn hàng', defaultChecked: false }
    ],
    deliverables: [
      { id: 'DEL-401', name: 'Bộ Tài Liệu SOP Hướng Dẫn Vận Hành & Lắp Ráp (SOP_AVG_2026.pdf)', type: 'SOP Chuẩn Hóa', size: '14.6 MB', date: 'Dự kiến 15/09', author: 'Ban Điều Hành', status: 'DRAFT' },
      { id: 'DEL-402', name: 'Biên Bản Nghiệm Thu Bàn Giao Khách Hàng (Signoff_Doc.pdf)', type: 'Biên bản nghiệm thu', size: '2.1 MB', date: 'Dự kiến 15/09', author: 'Khách hàng nghiệm thu', status: 'DRAFT' }
    ]
  }
];

/* ========================================================================= */
/* 🚀 COMPONENT CHUẨN HOÁ: TIẾN TRÌNH XỬ LÝ ĐƠN HÀNG 4 BƯỚC (CONNECTED PIPELINE) */
/* ========================================================================= */
const Order4StepFlowView: React.FC<{ themeColor: string; defaultStep?: number; subModuleName?: string }> = ({
  themeColor = '#F15A24',
  defaultStep = 2,
  subModuleName = '3.2 - THIẾT KẾ'
}) => {
  const [orderSteps, setOrderSteps] = useState<OrderProcessStep[]>(ORDER_4_STEPS);
  const [activeOrderStep, setActiveOrderStep] = useState<number>(defaultStep);
  const [selectedOrderCode, setSelectedOrderCode] = useState('DH-2026-RND-001');
  const [isSyncing, setIsSyncing] = useState(false);

  // Quản lý trạng thái các mục checklist (interactive state)
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    ORDER_4_STEPS.forEach(step => {
      step.checklists.forEach(chk => {
        initial[chk.id] = chk.defaultChecked;
      });
    });
    return initial;
  });

  // Tìm đơn hàng đang chọn
  const currentOrder = ORDERS_LIST.find(o => o.code === selectedOrderCode) || ORDERS_LIST[0];
  const currentOrderStep = orderSteps.find(s => s.step === activeOrderStep) || orderSteps[1];

  // Tính toán tiến độ tổng thể của quy trình 4 bước
  const completedStepsCount = orderSteps.filter(s => s.status === 'COMPLETED').length;
  const overallProgressPercent = Math.round((completedStepsCount / orderSteps.length) * 100);

  // Tính toán checklist của bước hiện tại
  const currentStepCheckedCount = currentOrderStep.checklists.filter(c => checkedMap[c.id]).length;
  const currentStepTotalCount = currentOrderStep.checklists.length;
  const currentStepPercent = Math.round((currentStepCheckedCount / currentStepTotalCount) * 100);

  // Xử lý chuyển đổi trạng thái hoàn thành bước
  const handleToggleOrderStep = (stepNum: number) => {
    setOrderSteps(orderSteps.map(s => {
      if (s.step === stepNum) {
        const nextStatus = s.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // Xử lý click checkbox từng mục checklist
  const handleToggleCheckItem = (id: string) => {
    setCheckedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Xử lý nút đồng bộ realtime
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  // Helper icon tài liệu chuyên nghiệp theo phân loại kỹ thuật
  const renderFileIcon = (type: string) => {
    if (type.includes('Altium') || type.includes('Gerber')) return <Layers className="w-4 h-4 text-[#F15A24]" />;
    if (type.includes('3D') || type.includes('STEP')) return <Box className="w-4 h-4 text-[#0088CC]" />;
    if (type.includes('Firmware') || type.includes('Hex') || type.includes('Code')) return <FileCode className="w-4 h-4 text-indigo-500" />;
    if (type.includes('Excel') || type.includes('CSV') || type.includes('BOM')) return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
    return <FileText className="w-4 h-4 text-rose-500" />;
  };

  return (
    /* MASTER ORDER WORKSPACE - KHOA HỌC, ĐỒNG BỘ & TRỰC QUAN */
    <div className="space-y-4">
      
      {/* ========================================================================= */}
      {/* 1. BẢNG ĐIỀU HÀNH ĐƠN HÀNG KỸ THUẬT SỐ (ENGINEERING ORDER COCKPIT) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* VÙNG 1: LỰA CHỌN ĐƠN HÀNG VÀ THÔNG TIN DỰ ÁN */}
          <div className="flex items-center gap-3.5 w-full lg:w-auto">
            <div className="p-3 bg-gradient-to-br from-[#F15A24] to-amber-500 text-white rounded-xl shadow-xs shrink-0 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Đơn Hàng R&D
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/50 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  {currentOrder.priority}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {currentOrder.project}
                </span>
              </div>

              <div className="relative inline-block w-full sm:w-auto">
                <select
                  value={selectedOrderCode}
                  onChange={(e) => {
                    setSelectedOrderCode(e.target.value);
                    const found = ORDERS_LIST.find(o => o.code === e.target.value);
                    if (found) setActiveOrderStep(found.currentStep);
                  }}
                  className="w-full sm:w-auto min-w-[280px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 pr-8 text-xs sm:text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A24]/30 cursor-pointer shadow-2xs transition appearance-none"
                >
                  {ORDERS_LIST.map(o => (
                    <option key={o.code} value={o.code}>
                      {o.code}: {o.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* VÙNG 2: GIÁM SÁT SLA & TIẾN ĐỘ TỔNG QUAN & HÀNH ĐỘNG */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end flex-wrap border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800">
            
            {/* SLA Telemetry Card */}
            <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#F15A24] shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Hạn Chót Đơn Hàng</div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {currentOrder.targetDate} <span className="text-slate-400 font-bold">({currentOrderStep.sla})</span>
                </div>
              </div>
            </div>

            {/* Overall Progress Widget */}
            <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
              <div className="text-left">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Tiến Độ Quy Trình</div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {overallProgressPercent}% <span className="text-slate-400 font-bold">({completedStepsCount}/4 bước)</span>
                </div>
              </div>
              <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-gradient-to-r from-[#F15A24] to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Export Report Action */}
            <button
              onClick={() => alert(`Đã xuất báo cáo tiến độ chuẩn hóa cho mã đơn ${selectedOrderCode}`)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-black rounded-xl flex items-center gap-2 transition cursor-pointer shadow-2xs shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Xuất Báo Cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DÒNG CHẢY TIẾN TRÌNH 4 GIAI ĐOẠN (CONNECTED ENGINEERING PIPELINE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {orderSteps.map((s, idx) => {
          const isActive = activeOrderStep === s.step;
          const isDone = s.status === 'COMPLETED';
          const isInProgress = s.status === 'IN_PROGRESS';
          const stepCheckedCount = s.checklists.filter(c => checkedMap[c.id]).length;
          const stepTotalCount = s.checklists.length;

          return (
            <button
              key={s.step}
              onClick={() => setActiveOrderStep(s.step)}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden group ${
                isActive
                  ? 'bg-white dark:bg-slate-900 border-[#F15A24] ring-2 ring-[#F15A24]/25 shadow-md'
                  : isDone
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80 hover:border-emerald-400'
                    : isInProgress
                      ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-800/80 hover:border-amber-400'
                      : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Top Accent Stripe */}
              <div className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                isActive
                  ? 'bg-[#F15A24]'
                  : isDone
                    ? 'bg-emerald-500'
                    : isInProgress
                      ? 'bg-amber-500'
                      : 'bg-slate-200 dark:bg-slate-700'
              }`} />

              {/* Row 1: Step Number Circle + Status Pill */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs transition ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : isActive
                        ? 'bg-[#F15A24] text-white shadow-2xs'
                        : isInProgress
                          ? 'bg-amber-500 text-white shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.step}
                  </span>
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider">
                    GIAI ĐOẠN 0{s.step}
                  </span>
                </div>

                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isDone
                    ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/70 dark:text-emerald-300'
                    : isInProgress
                      ? 'text-orange-700 bg-orange-100 dark:bg-orange-950/70 dark:text-orange-300'
                      : 'text-slate-500 bg-slate-100 dark:bg-slate-800'
                }`}>
                  {isDone ? (
                    <>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      <span>Hoàn thành</span>
                    </>
                  ) : isInProgress ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-ping" />
                      <span>Đang xử lý</span>
                    </>
                  ) : (
                    <span>Chờ nhận</span>
                  )}
                </span>
              </div>

              {/* Row 2: Step Name and Responsible Engineer */}
              <div className="space-y-1">
                <div className={`text-xs sm:text-sm font-black line-clamp-1 leading-snug ${
                  isActive ? 'text-[#F15A24]' : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {s.name}
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                  <span>{s.leadEngineer}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-400 text-[10px]">{s.dept}</span>
                </div>
              </div>

              {/* Row 3: SLA & Checklist Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400">
                <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> SLA: {s.sla}
                </span>
                <span className={`font-black ${
                  stepCheckedCount === stepTotalCount ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'
                }`}>
                  {stepCheckedCount}/{stepTotalCount} Tiêu chuẩn
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. KHÔNG GIAN LÀM VIỆC CHUYÊN SÂU CỦA BƯỚC ĐANG CHỌN (ACTIVE WORKSPACE) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-5">
        
        {/* Step Header & Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 bg-[#F15A24] text-white font-mono font-black text-xs rounded-lg shadow-2xs">
                BƯỚC 0{currentOrderStep.step}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {currentOrderStep.name}
              </h3>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Chủ trì: <strong className="text-slate-900 dark:text-slate-100">{currentOrderStep.leadEngineer}</strong> ({currentOrderStep.dept})
              </span>
            </div>
          </div>

          {/* Toggle Step Completion Button */}
          <button
            onClick={() => handleToggleOrderStep(currentOrderStep.step)}
            className={`px-4 py-2.5 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer shadow-2xs shrink-0 ${
              currentOrderStep.status === 'COMPLETED'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-[#F15A24] hover:bg-orange-600 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{currentOrderStep.status === 'COMPLETED' ? 'Đã Hoàn Thành (Bấm để mở lại)' : `Xác Nhận Hoàn Thành Bước ${currentOrderStep.step} →`}</span>
          </button>
        </div>

        {/* Phase Objective Callout Banner */}
        <div className="p-3.5 bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-l-[#F15A24] border border-orange-200/60 dark:border-orange-900/40 rounded-xl space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#F15A24]" />
            <span className="text-[11px] font-black text-[#F15A24] uppercase tracking-wider">
              Mục Tiêu & Đặc Tả Kỹ Thuật Giai Đoạn {currentOrderStep.step}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-6">
            {currentOrderStep.desc}
          </p>
        </div>

        {/* 2 COLUMNS: CHECKLIST (60%) & DELIVERABLES (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* CỘT 1: TIÊU CHUẨN KIỂM ĐỊNH (CHECKLIST) */}
          <div className="lg:col-span-7 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-[#F15A24]" />
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Tiêu Chuẩn Kiểm Định (Checklist)
                </h4>
              </div>
              <span className="text-xs font-black text-[#F15A24]">
                {currentStepCheckedCount}/{currentStepTotalCount} Đạt ({currentStepPercent}%)
              </span>
            </div>

            {/* Checklist progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStepPercent === 100 ? 'bg-emerald-500' : 'bg-[#F15A24]'
                }`}
                style={{ width: `${currentStepPercent}%` }}
              />
            </div>

            {/* Checklist items list */}
            <div className="space-y-2 pt-1">
              {currentOrderStep.checklists.map((chk) => {
                const isChecked = !!checkedMap[chk.id];
                return (
                  <div
                    key={chk.id}
                    onClick={() => handleToggleCheckItem(chk.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-900/60'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-orange-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition ${
                          isChecked
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-black leading-snug ${
                          isChecked ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'
                        }`}>
                          {chk.text}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <span className="font-mono bg-slate-100 dark:bg-slate-700/80 px-1.5 py-0.2 rounded text-[9px]">
                            {chk.standard}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                      isChecked
                        ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {isChecked ? '✓ Đạt Chuẩn' : '⏳ Cần Xử Lý'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CỘT 2: TÀI LIỆU & HỒ SƠ KỸ THUẬT BÀN GIAO */}
          <div className="lg:col-span-5 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0088CC]" />
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Hồ Sơ Kỹ Thuật Bước {currentOrderStep.step}
                </h4>
              </div>
              <button
                onClick={() => alert(`Đính kèm thêm file mới vào Bước ${currentOrderStep.step} (${selectedOrderCode})`)}
                className="text-[11px] font-black text-[#0088CC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> Đính Kèm File
              </button>
            </div>

            {/* File deliverables list */}
            <div className="space-y-2 pt-1">
              {currentOrderStep.deliverables.map((file) => (
                <div
                  key={file.id}
                  className="p-2.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2.5 hover:border-slate-300 dark:hover:border-slate-600 transition shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200/80 dark:border-slate-600 shrink-0">
                      {renderFileIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 dark:text-slate-100 truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5 font-bold">
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-black">{file.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => alert(`Xem trước tài liệu: ${file.name}`)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition cursor-pointer"
                      title="Xem nhanh"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert(`Tải xuống tài liệu: ${file.name}`)}
                      className="p-1.5 text-[#F15A24] hover:bg-orange-50 dark:hover:bg-orange-950/60 rounded-lg transition cursor-pointer"
                      title="Tải về"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              disabled={activeOrderStep <= 1}
              onClick={() => setActiveOrderStep(activeOrderStep - 1)}
              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-black disabled:opacity-40 cursor-pointer transition text-slate-700 dark:text-slate-200"
            >
              ← Bước Trước
            </button>

            {/* Direct Step Jump Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {[1, 2, 3, 4].map((stepNum) => (
                <button
                  key={stepNum}
                  onClick={() => setActiveOrderStep(stepNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center ${
                    activeOrderStep === stepNum
                      ? 'bg-[#F15A24] text-white shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {stepNum}
                </button>
              ))}
            </div>

            <button
              disabled={activeOrderStep >= 4}
              onClick={() => setActiveOrderStep(activeOrderStep + 1)}
              className="px-3.5 py-1.5 bg-[#F15A24] hover:bg-orange-600 text-white rounded-xl font-black disabled:opacity-40 cursor-pointer transition shadow-2xs"
            >
              Bước Tiếp Theo →
            </button>
          </div>

          <button
            onClick={handleTriggerSync}
            className="px-3 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#F15A24] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Đồng Bộ Realtime AVG One</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 🎨 1. GIAO DIỆN LÀM VIỆC CHUYÊN NGHIỆP PHÂN HỆ CON: 3.2 - THIẾT KẾ */
/* ========================================================================= */
const DesignSubModuleView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // 3 đầu mục chính của phân hệ Thiết kế: Đơn hàng, Phẩm, Tồn
  const [currentMainTab, setCurrentMainTab] = useState<'orders' | 'products' | 'inventory'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lọc theo phân loại
  const [productCategory, setProductCategory] = useState<string>('ALL');
  const [inventoryCategory, setInventoryCategory] = useState<string>('ALL');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Đồng bộ tab từ Header Topbar
  useEffect(() => {
    const handleSubTabChange = (e: any) => {
      if (e.detail && ['orders', 'products', 'inventory'].includes(e.detail)) {
        setCurrentMainTab(e.detail);
      }
    };
    window.addEventListener('design_subtab_change', handleSubTabChange);
    return () => window.removeEventListener('design_subtab_change', handleSubTabChange);
  }, []);

  // Lắng nghe thanh tìm kiếm nhanh từ Header Topbar (Ctrl + K)
  useEffect(() => {
    const handleSearchChange = (e: any) => {
      if (typeof e.detail === 'string') {
        setSearchQuery(e.detail);
      }
    };
    window.addEventListener('design_search_change', handleSearchChange);
    return () => window.removeEventListener('design_search_change', handleSearchChange);
  }, []);

  // Chuyển tab từ giao diện nội bộ và đồng bộ lên Header
  const handleSwitchTab = (tab: 'orders' | 'products' | 'inventory') => {
    setCurrentMainTab(tab);
    window.dispatchEvent(new CustomEvent('design_subtab_sync', { detail: tab }));
  };

  // 1. Dữ liệu Đơn hàng Thiết kế
  const [designOrders, setDesignOrders] = useState([
    {
      id: 'des-1',
      code: 'TK-2026-301',
      title: 'Thiết kế kiểu dáng vỏ nhôm Anodized cho Bộ điều khiển AVG Controller X1',
      category: '3D Công nghiệp',
      stage: 'Duyệt Render 4K',
      priority: 'P1 - Khẩn Cấp',
      designer: 'KS. Trần Minh Trí',
      dueDate: '18/09/2026',
      progress: 85,
      specs: 'Nhôm 6061 phay CNC, Anodized Space Gray, Tiêu chuẩn IP67'
    },
    {
      id: 'des-2',
      code: 'TK-2026-302',
      title: 'Hồ sơ thiết kế khuôn ép nhựa nắp đậy quang học cho Cụm Sensor Laser',
      category: 'Khuôn ép nhựa',
      stage: 'Phay mẫu thử',
      priority: 'P2 - Cao',
      designer: 'KS. Lê Văn Thiết Kế',
      dueDate: '24/09/2026',
      progress: 60,
      specs: 'Nhựa PC chống cháy UL94-V0, Độ truyền quang 92%'
    },
    {
      id: 'des-3',
      code: 'TK-2026-303',
      title: 'Thiết kế bao bì hộp sản phẩm CMF cao cấp cho Dòng Cảm biến Smart Sensor AVG',
      category: 'Bao bì & CMF',
      stage: 'In Market Thử',
      priority: 'P3 - Tiêu Chuẩn',
      designer: 'Phạm Đồ Họa',
      dueDate: '30/09/2026',
      progress: 40,
      specs: 'Mã màu Pantone #F15A24, Ép kim logo AVG One'
    }
  ]);

  // 2. Dữ liệu Phẩm (Bản vẽ CAD, Gerber, PCB, BOM List)
  const [designFiles, setDesignFiles] = useState([
    { id: 'DSG-CAD-301', name: 'Bản vẽ Khung Vỏ Nhôm Anodized AVG Controller X1', author: 'KS. Hoàng Quốc Việt (3D Lead)', date: '12/09/2026', type: 'SolidWorks STEP', category: '3D_MODEL', status: 'APPROVED', size: '158.4 MB', desc: 'Mô hình 3D SolidWorks lắp ráp vỏ hộp nhôm phay CNC tiêu chuẩn IP67' },
    { id: 'DSG-PCB-201', name: 'Sơ đồ Nguyên lý Mạch Bo Chính Telemetry AI v3.2', author: 'KS. Lê Văn Thiết Kế (Senior CAD)', date: '03/09/2026', type: 'Altium Schematic', category: 'PCB', status: 'APPROVED', size: '24.8 MB', desc: 'Schematic mạch 4 lớp tích hợp MCU ESP32-S3 và mạch lọc chống sét lan truyền' },
    { id: 'DSG-GBR-105', name: 'File Gerber Bo Mạch 4 Lớp Xuất Nhà Máy Gia Công', author: 'Trần Kỹ Thuật (PCB Layout)', date: '08/09/2026', type: 'Gerber Zip', category: 'GERBER', status: 'APPROVED', size: '12.6 MB', desc: 'Bộ file Gerber chuẩn RS-274X, độ dày đồng 1oz mạ vàng ENIG sẵn sàng sản xuất' },
    { id: 'DSG-BOM-004', name: 'BOM List Linh Kiện SMT & IC Chipset AI Toàn Diện', author: 'KS. Lê Văn Thiết Kế (Senior CAD)', date: '28/08/2026', type: 'BOM List Excel', category: 'BOM', status: 'APPROVED', size: '2.4 MB', desc: 'Danh mục BOM 84 linh kiện SMT đóng gói 0603/0402 kèm mã DigiKey và Mouser' },
    { id: 'DSG-CAD-302', name: 'Thiết Kế Khuôn Ép Nhựa Nắp Đậy Quang Học Laser', author: 'KS. Nguyễn Văn Cơ Khí', date: '05/09/2026', type: 'SolidWorks STEP', category: '3D_MODEL', status: 'IN_PROGRESS', size: '86.2 MB', desc: 'Khuôn mẫu nhựa PC quang học truyền sáng 92% cho ống kính cảm biến khoảng cách' },
    { id: 'DSG-PCB-202', name: 'Layout Mạch Vi Điều Khiển ESP32-S3 + LoRa RF', author: 'KS. Lê Văn Thiết Kế (Senior CAD)', date: '01/09/2026', type: 'Altium PCB', category: 'PCB', status: 'APPROVED', size: '31.5 MB', desc: 'Bản vẽ layout mạch RF phối hợp trở kháng anten 50 Ohm chống nhiễu bức xạ' },
    { id: 'DSG-CMF-401', name: 'Bản Thiết Kế CMF Màu Sắc & Tem Nhãn Vỏ Hộp AVG-X', author: 'Phạm Đồ Họa (CMF Specialist)', date: '10/09/2026', type: 'Vector CMF', category: 'CMF', status: 'APPROVED', size: '18.2 MB', desc: 'Hồ sơ mã màu CMF chuẩn quốc tế, tiêu chuẩn sơn tĩnh điện và vị trí dán tem mác' },
    { id: 'DSG-DOC-501', name: 'Hồ Sơ Đặc Tả Kỹ Thuật Dung Sai Cơ Khí & Tiêu Chuẩn IP', author: 'KS. Hoàng Quốc Việt (3D Lead)', date: '02/09/2026', type: 'Tài Liệu SOP', category: 'DOC', status: 'APPROVED', size: '5.8 MB', desc: 'Tài liệu hướng dẫn lắp ráp, lực siết ốc bu-lông và quy trình kiểm tra độ kín nước IP67' }
  ]);

  // 3. Dữ liệu Tồn (Kho Mẫu R&D & Linh Kiện Thiết Kế)
  const [inventoryItems, setInventoryItems] = useState([
    { id: 'TON-3D-01', name: 'Vỏ hộp In 3D Mẫu Nhựa Resin Chịu Nhiệt AVG-X', category: 'PROTOTYPE', qty: 14, unit: 'Chiếc', minQty: 5, location: 'Tủ R&D - Kệ A1-02', status: 'IN_STOCK', note: 'Mẫu in máy SLA độ phân giải 50 micron để thử khớp mạch' },
    { id: 'TON-CNC-02', name: 'Vỏ Nhôm Phay CNC Anodized Space Gray (Sample)', category: 'PROTOTYPE', qty: 4, unit: 'Bộ', minQty: 2, location: 'Bàn Lab 01 - Hộp Test', status: 'IN_STOCK', note: 'Vỏ nhôm nguyên khối phay CNC gắn ron chống nước IP67' },
    { id: 'TON-PCB-03', name: 'Bo Mạch Trắng 4 Lớp Mạ ENIG Chưa Hàn (Blank Board)', category: 'PCB', qty: 38, unit: 'Bo mạch', minQty: 10, location: 'Tủ Chống Ẩm B2', status: 'IN_STOCK', note: 'Bo mạch test đặt xưởng gia công phục vụ hàn linh kiện mẫu' },
    { id: 'TON-MCU-04', name: 'Vi Điều Khiển AI ESP32-S3-WROOM-1 (N16R8)', category: 'CHIPSET', qty: 26, unit: 'Con', minQty: 15, location: 'Khay SMT Tủ C1-03', status: 'IN_STOCK', note: 'Chip vi xử lý AI Dual-Core 240MHz, Flash 16MB PSRAM 8MB' },
    { id: 'TON-RF-05', name: 'Mô-đun Viễn Thông LoRa SX1262 433/868/915MHz', category: 'SENSOR', qty: 18, unit: 'Module', minQty: 5, location: 'Khay SMT Tủ C1-05', status: 'IN_STOCK', note: 'Module truyền sóng tầm xa LoRa 22dBm có thạch anh TCXO chống trôi tần' },
    { id: 'TON-SNS-06', name: 'Cảm Biến Khí NDIR Đo Nồng Độ CO2 SCD40', category: 'SENSOR', qty: 3, unit: 'Cảm biến', minQty: 5, location: 'Ngăn Test Lab C3', status: 'LOW_STOCK', note: 'Cần bổ sung thêm 10 cảm biến cho đợt thử nghiệm quý 4' },
    { id: 'TON-JIG-07', name: 'Bộ Đồ Gá Kim Pogo Pin Nạp Firmware & Test Mạch', category: 'JIG', qty: 2, unit: 'Bộ đồ gá', minQty: 1, location: 'Bàn Lập Trình Lab 03', status: 'IN_USE', note: 'Đồ gá nạp code tự động không cần hàn header kết nối' },
    { id: 'TON-CAB-08', name: 'Dây Cáp FPC Mềm 24-Pin Bước 0.5mm Nối Màn Hình', category: 'ACCESSORY', qty: 45, unit: 'Sợi', minQty: 10, location: 'Hộp Phụ Kiện Kệ B3', status: 'IN_STOCK', note: 'Cáp kết nối tín hiệu SPI/I2C từ bo chính sang cụm hiển thị' }
  ]);

  const handleAddNewDesign = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = {
      id: `DSG-CAD-00${designFiles.length + 1}`,
      name: 'Bản vẽ Thiết kế CAD 3D Vỏ Hộp Cảm Biến Thế Hệ Mới',
      author: 'KS. Lê Văn Thiết Kế (Senior CAD)',
      date: 'Hôm nay',
      type: 'SolidWorks STEP',
      category: '3D_MODEL',
      status: 'APPROVED',
      size: '42.5 MB',
      desc: 'Bản vẽ xuất xưởng cập nhật mới nhất theo yêu cầu đơn hàng'
    };
    setDesignFiles([newDoc, ...designFiles]);
    setShowAddModal(false);
    showToast('✨ Đã khởi tạo thành công bản vẽ mới vào Danh mục Phẩm!');
  };

  const handleUpdateStock = (itemId: string, delta: number) => {
    setInventoryItems(items => items.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(0, item.qty + delta);
        const newStatus = newQty === 0 ? 'OUT_OF_STOCK' : newQty <= item.minQty ? 'LOW_STOCK' : 'IN_STOCK';
        return { ...item, qty: newQty, status: newStatus };
      }
      return item;
    }));
  };

  // Lọc dữ liệu theo search query và category
  const filteredOrders = designOrders.filter(o =>
    o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = designFiles.filter(f => {
    const matchCat = productCategory === 'ALL' || f.category === productCategory;
    const matchSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredInventory = inventoryItems.filter(item => {
    const matchCat = inventoryCategory === 'ALL' || item.category === inventoryCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('design_counts_sync', {
      detail: { orders: designOrders.length, products: designFiles.length, inventory: inventoryItems.length }
    }));
  }, [designOrders.length, designFiles.length, inventoryItems.length]);

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      
      {/* TOAST THÔNG BÁO TÁC VỤ */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 bg-[#2C1D29] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#F15A24]/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#F15A24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 🔮 1. TOP EXECUTIVE HERO BANNER - ĐỒNG BỘ THIẾT KẾ & HIỆU ỨNG CHUYỂN ĐỘNG CHUẨN AVG ONE */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
        {/* 🎨 Ambient Glow Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F15A24]/10 dark:bg-[#F15A24]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Animated Slogan Box Badge & Dynamic Title with Brush Stroke */}
          <div className="space-y-2 text-left">
            {/* Animated Slogan Badge - Hộp vuông bo góc rounded-xl với viền gradient chạy vòng quanh */}
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="design-32-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                  stroke="url(#design-32-slogan-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Package className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>AVG PACKAGING & PRODUCT DESIGN SYSTEM</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                  <span className="relative z-10">THIẾT KẾ</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
                <span className="text-[#231F20] dark:text-white font-extrabold">
                  Bao Bì Sản Phẩm
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Operational Telemetry & System Standards */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs flex items-center gap-3 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Tiêu Chuẩn RDI</span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">ISO-2026 / TIÊU CHUẨN BAO BÌ</span>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs flex items-center gap-3 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] flex items-center justify-center font-black text-xs shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Trạng Thái Hệ Thống</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">Vận Hành Chuẩn Hóa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🎯 TAB 1: ĐƠN HÀNG (4 BƯỚC ĐƠN HÀNG & 13 BƯỚC SOP KỸ THUẬT) */}
      {/* ========================================================================= */}
      {currentMainTab === 'orders' && (
        <div className="space-y-6">
          <Order4StepFlowView themeColor="#F15A24" defaultStep={2} />

          {/* DANH SÁCH ĐƠN HÀNG THIẾT KẾ ĐANG CHẠY */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#F15A24]" />
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Danh Sách Đơn Hàng Thiết Kế Đang Thực Hiện
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Hiển thị {filteredOrders.length} đơn hàng
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Mã Đơn</th>
                    <th className="py-2.5 px-3">Tên Yêu Cầu Thiết Kế</th>
                    <th className="py-2.5 px-3">Kỹ Sư Phụ Trách</th>
                    <th className="py-2.5 px-3">Phân Loại</th>
                    <th className="py-2.5 px-3">Ưu Tiên</th>
                    <th className="py-2.5 px-3">Hạn Chót</th>
                    <th className="py-2.5 px-3 text-center">Tiến Độ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 font-mono font-black text-[#F15A24]">{order.code}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{order.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{order.specs}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-bold">{order.designer}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                          {order.category}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          order.priority.includes('P1') ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' :
                          order.priority.includes('P2') ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                          'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400'
                        }`}>
                          {order.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500">{order.dueDate}</td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#F15A24] rounded-full transition-all"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="font-mono font-black text-[11px] text-[#F15A24]">{order.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📦 TAB 2: PHẨM (BẢN VẼ CAD 3D, MẠCH PCB ALTIUM, GERBER, BOM LIST) */}
      {/* ========================================================================= */}
      {currentMainTab === 'products' && (
        <div className="space-y-5">
          {/* Header Bar: Title + Action Create */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F15A24]" />
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Danh Mục Phẩm & Bản Vẽ Kỹ Thuật (CAD 3D / PCB / BOM)
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Kho lưu trữ chính thức các bản vẽ lắp ráp 3D SolidWorks, sơ đồ nguyên lý Altium, file Gerber và BOM linh kiện đã phê duyệt.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-[#F15A24] hover:bg-[#d94a18] text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Bản Vẽ / Phẩm Mới</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'Tất Cả', count: designFiles.length },
              { id: '3D_MODEL', label: 'Bản Vẽ 3D SolidWorks', count: designFiles.filter(f => f.category === '3D_MODEL').length },
              { id: 'PCB', label: 'Mạch Altium PCB', count: designFiles.filter(f => f.category === 'PCB').length },
              { id: 'GERBER', label: 'File Gerber Mạch', count: designFiles.filter(f => f.category === 'GERBER').length },
              { id: 'BOM', label: 'BOM List Linh Kiện', count: designFiles.filter(f => f.category === 'BOM').length },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setProductCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  productCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Table Phẩm */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-400 font-extrabold uppercase text-[10px]">
                    <th className="py-3 px-4">Mã Phẩm / File</th>
                    <th className="py-3 px-4">Tên Bản Vẽ Kỹ Thuật</th>
                    <th className="py-3 px-4">Định Dạng</th>
                    <th className="py-3 px-4">Kỹ Sư Phụ Trách</th>
                    <th className="py-3 px-4">Dung Lượng</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-200">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-black text-[#0077B6]">{file.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{file.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{file.desc}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-[#0077B6] font-extrabold text-[11px]">
                          {file.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-bold">{file.author}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{file.size}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          file.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        }`}>
                          {file.status === 'APPROVED' ? 'Đã Phê Duyệt' : 'Đang Thiết Kế'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedFile(file)}
                            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition cursor-pointer"
                            title="Xem chi tiết bản vẽ"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => showToast(`📥 Đang tải xuống file ${file.name} (${file.size})...`)}
                            className="p-1.5 bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 text-[#F15A24] rounded-lg transition cursor-pointer"
                            title="Tải về file kỹ thuật"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📦 TAB 3: TỒN (KHO TỒN MẪU R&D & LINH KIỆN THIẾT KẾ) */}
      {/* ========================================================================= */}
      {currentMainTab === 'inventory' && (
        <div className="space-y-5">
          {/* Header Bar: Title + KPI Metrics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Box className="w-5 h-5 text-[#F15A24]" />
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Kho Tồn Mẫu R&D & Linh Kiện Thiết Kế
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Kiểm kê linh kiện mẫu, mẫu in 3D prototype vỏ hộp, bo mạch blank PCB và đồ gá thử nghiệm phòng Thiết kế.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-black rounded-xl">
                  ● Sẵn sàng thử nghiệm
                </span>
              </div>
            </div>

            {/* Inventory KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng Chủng Loại</span>
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {inventoryItems.length} Loại Mẫu
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng Số Lượng Tồn</span>
                <div className="text-base sm:text-lg font-black text-[#F15A24] mt-0.5">
                  {inventoryItems.reduce((acc, it) => acc + it.qty, 0)} Đơn Vị
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cảnh Báo Tồn Thấp</span>
                <div className="text-base sm:text-lg font-black text-amber-600 mt-0.5">
                  {inventoryItems.filter(it => it.status === 'LOW_STOCK').length} Mục Cần Mua
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Vị Trí Lưu Trữ</span>
                <div className="text-base sm:text-lg font-black text-[#0077B6] mt-0.5">
                  Phòng R&D Lab 03
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills for Inventory */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'Tất Cả Mẫu & Linh Kiện', count: inventoryItems.length },
              { id: 'PROTOTYPE', label: 'Mẫu In 3D & Vỏ Nhôm', count: inventoryItems.filter(i => i.category === 'PROTOTYPE').length },
              { id: 'PCB', label: 'Bo Mạch Blank PCB', count: inventoryItems.filter(i => i.category === 'PCB').length },
              { id: 'CHIPSET', label: 'Chipset & Vi Xử Lý', count: inventoryItems.filter(i => i.category === 'CHIPSET').length },
              { id: 'SENSOR', label: 'Cảm Biến & LoRa RF', count: inventoryItems.filter(i => i.category === 'SENSOR').length },
              { id: 'JIG', label: 'Đồ Gá Nạp Code', count: inventoryItems.filter(i => i.category === 'JIG').length },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setInventoryCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  inventoryCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Table Tồn Kho */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-400 font-extrabold uppercase text-[10px]">
                    <th className="py-3 px-4">Mã Tồn</th>
                    <th className="py-3 px-4">Tên Mẫu / Linh Kiện R&D</th>
                    <th className="py-3 px-4">Vị Trí Kệ / Khay</th>
                    <th className="py-3 px-4 text-center">Số Lượng Tồn</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-black text-[#F15A24]">{item.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.note}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px] inline-flex items-center gap-1">
                          📍 {item.location}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateStock(item.id, -1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-black flex items-center justify-center cursor-pointer transition active:scale-95"
                            title="Giảm 1"
                          >
                            -
                          </button>
                          <span className="font-mono font-black text-sm text-slate-900 dark:text-white min-w-10">
                            {item.qty} {item.unit}
                          </span>
                          <button
                            onClick={() => handleUpdateStock(item.id, 1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-black flex items-center justify-center cursor-pointer transition active:scale-95"
                            title="Tăng 1"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          item.status === 'IN_STOCK' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' :
                          item.status === 'LOW_STOCK' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                          item.status === 'IN_USE' ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400' :
                          'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                        }`}>
                          {item.status === 'IN_STOCK' ? 'Sẵn Sàng' :
                           item.status === 'LOW_STOCK' ? 'Sắp Hết (Min ' + item.minQty + ')' :
                           item.status === 'IN_USE' ? 'Đang Sử Dụng' : 'Hết Hàng'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            handleUpdateStock(item.id, -1);
                            showToast(`🧪 Đã xuất 1 ${item.unit} ${item.name} cho phòng thử nghiệm!`);
                          }}
                          disabled={item.qty <= 0}
                          className="px-3 py-1.5 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-[#0077B6] rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-40"
                        >
                          Xuất Dùng Test
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XEM CHI TIẾT BẢN VẼ / PHẨM */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F15A24]" />
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase">
                  Thông Số Chi Tiết Bản Vẽ Kỹ Thuật
                </h3>
              </div>
              <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tên Phẩm / Bản Vẽ</span>
                <div className="text-sm font-black text-slate-900 dark:text-white">{selectedFile.name}</div>
                <div className="text-xs text-slate-500">{selectedFile.desc}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Mã Hồ Sơ</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">{selectedFile.id}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Định Dạng File</span>
                  <div className="font-bold text-[#0077B6] mt-0.5">{selectedFile.type}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Kỹ Sư Phụ Trách</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedFile.author}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Dung Lượng / Ngày</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedFile.size} • {selectedFile.date}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`📥 Đang tải xuống file ${selectedFile.name}...`);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 bg-[#F15A24] hover:bg-[#d94a18] text-white rounded-xl font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Xuống Bản Vẽ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TẠO BẢN VẼ MỚI */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase">
                Tạo Bản Vẽ CAD / Gerber Mới
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewDesign} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Tên bản vẽ thiết kế</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Sơ đồ nguyên lý Mạch Cảm Biến AI v3..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0088CC]"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Loại định dạng file</label>
                <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0088CC]">
                  <option value="SolidWorks STEP">SolidWorks 3D (.STEP)</option>
                  <option value="Altium Schematic">Altium PCB Gerber (.Zip / .SchDoc)</option>
                  <option value="BOM List Excel">Danh Mục BOM Linh Kiện (.XLSX)</option>
                  <option value="Vector CMF">Hồ Sơ Thiết Kế Bao Bì CMF (.PDF)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Kỹ sư phụ trách</label>
                <input
                  type="text"
                  defaultValue="KS. Lê Văn Thiết Kế (Senior CAD)"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F15A24] hover:bg-[#d94a18] text-white rounded-xl cursor-pointer font-extrabold"
                >
                  Khởi Tạo Bản Vẽ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* 🔬 2. GIAO DIỆN LÀM VIỆC CHUYÊN NGHIỆP PHÂN HỆ CON: 3.1 - NGHIÊN CỨU (RDI) */
/* ========================================================================= */
const ResearchSubModuleView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'4steps' | '13sop'>('4steps');
  const [steps, setSteps] = useState<StepDetail[]>(SOP_13_STEPS);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Lắng nghe đổi tab từ Header Topbar
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && (e.detail === '4steps' || e.detail === '13sop')) {
        setActiveWorkflowTab(e.detail);
      }
    };
    window.addEventListener('research_workflow_tab_change', handleTabChange);
    return () => window.removeEventListener('research_workflow_tab_change', handleTabChange);
  }, []);

  // Đồng bộ tab ra ngoài Header Topbar
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('research_workflow_tab_sync', { detail: activeWorkflowTab }));
  }, [activeWorkflowTab]);

  const [researchProjects, setResearchProjects] = useState([
    { id: 'DH-2026-RND-001', title: 'Nghiên cứu Mô-đun AI Sensor Cảnh báo Nhiệt', lead: 'Hoàng Đức Anh (Embedded Dev)', firmware: 'v2.4 C++', labTest: '100% Đạt 72h', status: 'IN_PROGRESS' },
    { id: 'DH-2026-RND-002', title: 'Thiết kế Mạch Nhúng Đo Áp Nguồn SMT 3.3V', lead: 'Lê Văn Nhân Viên (R&D Lead)', firmware: 'v1.8 C++', labTest: 'Đã hoàn tất', status: 'COMPLETED' },
    { id: 'DH-2026-RND-003', title: 'Truyền Tín Hiệu Realtime Cloud Supabase', lead: 'Trần Công Nghệ (IoT Specialist)', firmware: 'v3.0 Cloud', labTest: 'Đang test Lab', status: 'IN_PROGRESS' }
  ]);

  const currentStepInfo = steps.find(s => s.step === activeStep) || steps[0];

  const handleToggleStep = (stepNum: number) => {
    setSteps(steps.map(s => {
      if (s.step === stepNum) {
        const nextStatus = s.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleAddNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj = {
      id: `DH-2026-RND-00${researchProjects.length + 1}`,
      title: 'Đề xuất Đơn hàng Nghiên cứu Mạch Cảm biến Mới',
      lead: 'Hoàng Đức Anh (Embedded Dev)',
      firmware: 'v1.0 Initial C++',
      labTest: 'Chờ test 72h',
      status: 'IN_PROGRESS'
    };
    setResearchProjects([newProj, ...researchProjects]);
    setShowAddModal(false);
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* 🔮 1. TOP EXECUTIVE HERO BANNER - ĐỒNG BỘ THIẾT KẾ & HIỆU ỨNG CHUYỂN ĐỘNG CHUẨN AVG ONE */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
        {/* 🎨 Ambient Glow Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#0284C7]/10 dark:bg-[#0284C7]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#10B981]/10 dark:bg-[#10B981]/15 rounded-full blur-[100px] pointer-events-none -z-0 animate-pulse duration-1000" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Animated Slogan Box Badge & Dynamic Title with Brush Stroke */}
          <div className="space-y-2 text-left">
            {/* Top Navigation Row: Back to Landing & Switch to 3.2 */}
            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={onBack}
                className="h-7.5 px-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Quay lại Trung tâm Nghiên cứu & Sáng tạo"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại Trang chủ Phân hệ</span>
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('workflow_submodule_select', { detail: 'design' }));
                }}
                className="h-7.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-[#0284C7] hover:text-white text-[#0284C7] dark:text-sky-300 text-xs font-extrabold border border-sky-200/80 dark:border-sky-800/80 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Chuyển sang 3.2 – THIẾT KẾ"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Sang 3.2 – Thiết Kế</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>

            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="research-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="35%" stopColor="#00A8E8" />
                    <stop offset="70%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
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
                  stroke="url(#research-slogan-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Cpu className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>AVG R&D & EMBEDDED FIRMWARE SYSTEM</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>HỆ THỐNG AVG ONE</span>
                <span>/</span>
                <span className="text-emerald-600 font-black">3.1 – NGHIÊN CỨU & PHÁT TRIỂN</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>PHÂN HỆ 3.1 –</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                  <span className="relative z-10">NGHIÊN CỨU & PHÁT TRIỂN (RDI)</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-emerald-500 opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Tab Switcher Integrated Directly in Header */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 w-full md:w-auto relative z-10 shadow-2xs">
            <button
              onClick={() => setActiveWorkflowTab('4steps')}
              className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeWorkflowTab === '4steps'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Quy Trình 4 Bước Đơn Hàng</span>
            </button>

            <button
              onClick={() => setActiveWorkflowTab('13sop')}
              className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeWorkflowTab === '13sop'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Chi Tiết Luồng 13 Bước SOP</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. COMPACT KPI METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl px-3.5 py-2.5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mã Đơn R&D</span>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>18 Mã Đơn</span>
              <span className="text-[10px] text-emerald-600 font-bold">(RDI Chuẩn)</span>
            </div>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-lg shrink-0">
            <Package className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl px-3.5 py-2.5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Firmware C++</span>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span>v2.4 Active</span>
              <span className="text-[10px] text-cyan-600 font-bold">(Driver AI)</span>
            </div>
          </div>
          <div className="p-2 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 rounded-lg shrink-0">
            <FileCode className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl px-3.5 py-2.5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Test Phòng Lab 72h</span>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span className="text-emerald-600">100% Đạt</span>
              <span className="text-[10px] text-slate-400 font-bold">(42°C kín)</span>
            </div>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-lg shrink-0">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl px-3.5 py-2.5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Supabase Realtime</span>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              <span className="text-emerald-600">Đã Kết Nối</span>
              <span className="text-[10px] text-slate-400 font-bold">(115200)</span>
            </div>
          </div>
          <div className="p-2 bg-sky-50 dark:bg-sky-950/60 text-[#00A8E8] rounded-lg shrink-0">
            <Activity className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDER: 4 BƯỚC XỬ LÝ ĐƠN HÀNG VS 13 BƯỚC SOP */}
      {activeWorkflowTab === '4steps' ? (
        <Order4StepFlowView themeColor="#059669" defaultStep={1} />
      ) : (
        /* MAIN TWO-COLUMN WORKSPACE FOR 13 SOP STEPS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: 13-Steps SOP Tracker */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 max-h-[720px] overflow-y-auto">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Luồng 13 Bước SOP (Ưu Tiên 3.1):
              </h2>
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 text-[10px] font-black rounded-md">
                3.1 - RDI
              </span>
            </div>

            {steps.map((s) => {
              const isResearchStep = s.department === '3.1 - RDI';
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    activeStep === s.step
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-slate-900 dark:text-white shadow-xs font-black'
                      : isResearchStep
                        ? 'bg-emerald-50/60 dark:bg-slate-800/80 border-emerald-200 dark:border-slate-700 text-slate-900 dark:text-white font-extrabold'
                        : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-70 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shadow-xs flex-shrink-0 ${
                      s.status === 'COMPLETED' ? 'bg-emerald-600 text-white' :
                      s.step === activeStep ? 'bg-emerald-600 text-white' :
                      isResearchStep ? 'bg-emerald-600 text-white' :
                      'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {s.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs line-clamp-1">{s.title}</div>
                      <div className={`text-[10px] font-bold ${isResearchStep ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                        {s.department}
                      </div>
                    </div>
                  </div>

                  {s.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Workspaces & R&D Projects Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Step Runner Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-emerald-600 text-white font-black text-sm rounded-xl shadow-xs">
                    Bước {currentStepInfo.step}
                  </span>
                  <div>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      {currentStepInfo.department}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                      {currentStepInfo.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleStep(currentStepInfo.step)}
                  className={`px-4 py-2 font-bold text-xs rounded-xl transition flex items-center gap-2 shadow cursor-pointer ${
                    currentStepInfo.status === 'COMPLETED'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{currentStepInfo.status === 'COMPLETED' ? 'Đã Hoàn Thành' : 'Đánh Dấu Hoàn Thành Step này'}</span>
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase">Mô tả Chi tiết Quy trình Nghiên Cứu (RDI):</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                  {currentStepInfo.description}
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Danh Mục Checklist Bắt Buộc (RDI SOP Standard):</h3>
                {[
                  'Đã cập nhật mã đơn hàng DH-2026 và khảo sát đề xuất R&D',
                  'Đã lập trình Firmware C++ và test tín hiệu vi xử lý',
                  'Đã qua kiểm thử đo đạc điện áp và nghiệm thu phòng Lab 72h'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <button
                  disabled={activeStep <= 1}
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl font-bold disabled:opacity-40 cursor-pointer"
                >
                  ← Bước Trước
                </button>
                <span className="font-bold text-slate-400">Bước {activeStep} trên 13</span>
                <button
                  disabled={activeStep >= 13}
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold disabled:opacity-40 cursor-pointer"
                >
                  Bước Tiếp Theo →
                </button>
              </div>
            </div>

            {/* DỰ ÁN NGHIÊN CỨU R&D & MÃ ĐƠN HÀNG TABLE */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Quản Lý Đơn Hàng R&D & Phiên Bản Firmware
                  </h3>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm đơn hàng R&D..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Mã Đơn DH-2026</th>
                      <th className="py-2.5 px-3">Tên Dự Án Nghiên Cứu R&D</th>
                      <th className="py-2.5 px-3">Trưởng Nhóm RDI</th>
                      <th className="py-2.5 px-3">Firmware Code</th>
                      <th className="py-2.5 px-3 text-center">Test Lab 72h</th>
                      <th className="py-2.5 px-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-200">
                    {researchProjects
                      .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((proj) => (
                        <tr key={proj.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3 px-3 font-mono font-black text-emerald-600">{proj.id}</td>
                          <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">{proj.title}</td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-bold">{proj.lead}</td>
                          <td className="py-3 px-3 font-bold text-cyan-600">{proj.firmware}</td>
                          <td className="py-3 px-3 text-center font-bold text-emerald-600">{proj.labTest}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => alert(`Đang kích hoạt Flasher 1-Click cho ${proj.id}...`)}
                              className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 rounded-lg text-[11px] font-black transition cursor-pointer"
                            >
                              Run Flasher
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÊM ĐỀ XUẤT R&D MỚI */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase">
                Thêm Đề Xuất R&D & Cấp Mã Đơn DH-2026
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewProject} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Tên dự án đề xuất R&D</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nghiên cứu bo mạch AI Sensor thế hệ mới..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Kỹ sư phụ trách chính (RDI Lead)</label>
                <input
                  type="text"
                  defaultValue="Hoàng Đức Anh (Embedded Dev)"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer font-extrabold"
                >
                  Cấp Mã DH-2026
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* 🌟 COMPONENT CHÍNH: MÀN HÌNH TỔNG QUAN CHỈ HIỂN THỊ 2 HỘP LỰA CHỌN PHÂN HỆ CON */
/* ========================================================================= */
export const WorkflowModule: React.FC = () => {
  // Mặc định luôn là null để hiển thị Trang chủ phân hệ (Landing view với 2 hộp 3.1 & 3.2)
  const [selectedSubModule, setSelectedSubModule] = useState<'design' | 'research' | null>(null);

  // Đồng bộ tên phân hệ con lên thanh Header Topbar
  React.useEffect(() => {
    if (selectedSubModule === 'design') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '3.2 – THIẾT KẾ' }));
    } else if (selectedSubModule === 'research') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '3.1 – NGHIÊN CỨU' }));
    } else {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    }
  }, [selectedSubModule]);

  // Lắng nghe sự kiện quay lại từ Header Topbar
  React.useEffect(() => {
    const handleSubModuleBack = () => {
      setSelectedSubModule(null);
    };
    window.addEventListener('submodule_back', handleSubModuleBack);
    window.addEventListener('go_home_rdi', handleSubModuleBack);
    return () => {
      window.removeEventListener('submodule_back', handleSubModuleBack);
      window.removeEventListener('go_home_rdi', handleSubModuleBack);
    };
  }, []);

  // Lắng nghe sự kiện chọn phân hệ con từ Header Topbar (Thiết kế / Nghiên cứu / SOP)
  React.useEffect(() => {
    const handleSelectSub = (e: any) => {
      if (e.detail === 'design' || e.detail === 'research') {
        setSelectedSubModule(e.detail);
      } else if (e.detail === 'overview' || e.detail === 'sop') {
        setSelectedSubModule(null);
      }
    };
    window.addEventListener('workflow_submodule_select', handleSelectSub);
    window.addEventListener('orders_tab_change', handleSelectSub);
    window.addEventListener('rd_tab_change', handleSelectSub);
    return () => {
      window.removeEventListener('workflow_submodule_select', handleSelectSub);
      window.removeEventListener('orders_tab_change', handleSelectSub);
      window.removeEventListener('rd_tab_change', handleSelectSub);
    };
  }, []);

  if (selectedSubModule === 'design') {
    return <DesignSubModuleView onBack={() => setSelectedSubModule(null)} />;
  }

  if (selectedSubModule === 'research') {
    return <ResearchSubModuleView onBack={() => setSelectedSubModule(null)} />;
  }

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Hidden trigger buttons for external sync if needed */}
      <button id="btn-workflow-subtab-design" className="hidden" onClick={() => setSelectedSubModule('design')} />
      <button id="btn-workflow-subtab-research" className="hidden" onClick={() => setSelectedSubModule('research')} />

      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute bottom-10 left-1/3 w-[550px] h-[300px] bg-gradient-to-tr from-sky-400/10 via-amber-400/10 to-orange-400/15 dark:from-sky-600/10 dark:to-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* Synchronized container matching Header alignment (w-full px-3 sm:px-6 lg:px-8) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 sm:gap-14 lg:gap-16 relative z-10 py-8 sm:py-14">
        
        {/* Header Title Section */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
            {/* SVG Clockwise Border Tracing Effect */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="rd-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                stroke="url(#rd-slogan-border-gradient)"
                strokeWidth="1.5"
                className="animate-slogan-box-border"
              />
            </svg>

            <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-transparent text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
              <Lightbulb className="w-4 h-4 text-[#00A8E8]" />
              <span>TRUNG TÂM NGHIÊN CỨU & SÁNG TẠO</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline justify-center gap-2">
            <span>Nghiên Cứu &</span>
            <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
              <span className="relative z-10">Sáng Tạo</span>
              <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
              </svg>
            </span>
          </h2>
        </div>

        {/* 📦 BỘ CÁC HỘP THẺ TRUY CẬP PHÂN HỆ CON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[560px] sm:max-w-[600px] mx-auto w-full pb-2">
          
          {/* HỘP 1: 3.1 - NGHIÊN CỨU */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedSubModule('research')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedSubModule('research'); }}
            style={{ borderRadius: '26px' }}
            className="group flex flex-col items-center justify-between py-3.5 sm:py-4 px-3 min-h-[110px] sm:min-h-[120px] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none animate-entrance-up"
          >
            {/* Hairline top glow on hover */}
            <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Unified Blue Icon Badge */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
              <Cpu className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
            </div>

            {/* Tiêu đề */}
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                3.1 – NGHIÊN CỨU
              </h3>
            </div>
          </div>

          {/* HỘP 2: 3.2 - THIẾT KẾ */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedSubModule('design')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedSubModule('design'); }}
            style={{ borderRadius: '26px' }}
            className="group flex flex-col items-center justify-between py-3.5 sm:py-4 px-3 min-h-[110px] sm:min-h-[120px] bg-gradient-to-b from-sky-100/80 via-sky-50/40 to-white/95 dark:from-sky-950/70 dark:via-slate-900/80 dark:to-slate-900/95 hover:from-sky-200/70 hover:via-sky-100/50 hover:to-white dark:hover:from-sky-900/70 dark:hover:via-slate-900 dark:hover:to-slate-900 backdrop-blur-xl rounded-[26px] border border-sky-200/80 dark:border-sky-800/60 hover:border-[#0284C7] dark:hover:border-sky-400 shadow-[0_2px_14px_-2px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:shadow-xl hover:shadow-sky-500/15 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 text-center relative overflow-hidden cursor-pointer select-none animate-entrance-up"
          >
            {/* Hairline top glow on hover */}
            <div className="absolute top-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Unified Blue Icon Badge */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-sky-50/90 to-blue-50/50 dark:from-sky-950/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-800/70 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:border-sky-400 dark:group-hover:border-sky-500 shadow-2xs group-hover:shadow-xs group-hover:shadow-sky-400/30 transition-all duration-300 shrink-0">
              <Compass className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#0284C7] dark:text-sky-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
            </div>

            {/* Tiêu đề */}
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] dark:group-hover:text-sky-300 transition-colors whitespace-nowrap leading-tight tracking-tight">
                3.2 – THIẾT KẾ
              </h3>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
