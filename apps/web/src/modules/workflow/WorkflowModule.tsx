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
const DesignSubModuleView: React.FC<{ onBack: () => void }> = () => {
  // 3 đầu mục chính của phân hệ Thiết kế: Kho đầu vào (orders), Kho thành phẩm (products), Kho lưu chuyển (inventory)
  const [currentMainTab, setCurrentMainTab] = useState<'orders' | 'products' | 'inventory'>('orders');
  const [_searchQuery, setSearchQuery] = useState('');

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

  // Đồng bộ số lượng 0 lên Header
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('design_counts_sync', {
      detail: { orders: 0, products: 0, inventory: 0 }
    }));
  }, []);

  const tabLabels: Record<'orders' | 'products' | 'inventory', string> = {
    orders: 'Kho đầu vào',
    products: 'Kho thành phẩm',
    inventory: 'Kho lưu chuyển'
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col items-center justify-center p-6 bg-slate-50/40 dark:bg-slate-950/40 select-none">
      <div className="flex flex-col items-center justify-center max-w-md text-center p-8 sm:p-10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xs shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/50 text-[#F15A24] flex items-center justify-center mb-4 shadow-inner">
          <Package className="w-8 h-8 stroke-[1.8]" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] dark:text-orange-400 text-xs font-black uppercase tracking-wider mb-2">
          <span>3.2 – THIẾT KẾ</span>
          <span className="opacity-40">•</span>
          <span>{tabLabels[currentMainTab]}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mb-2">
          Khu vực đã được làm sạch
        </h3>
        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
          Đã xóa toàn bộ nội dung cũ. Sẵn sàng để xây dựng lại giao diện và luồng xử lý mới theo yêu cầu của bạn.
        </p>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 🔬 2. GIAO DIỆN LÀM VIỆC CHUYÊN NGHIỆP PHÂN HỆ CON: 3.1 - NGHIÊN CỨU (RDI) */
/* ========================================================================= */
const ResearchSubModuleView: React.FC<{ onBack: () => void }> = () => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'4steps' | '13sop'>('4steps');

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

  const tabLabels: Record<'4steps' | '13sop', string> = {
    '4steps': 'Quy Trình 4 Bước Đơn Hàng',
    '13sop': 'Chi Tiết Luồng 13 Bước SOP'
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col items-center justify-center p-6 bg-slate-50/40 dark:bg-slate-950/40 select-none">
      <div className="flex flex-col items-center justify-center max-w-md text-center p-8 sm:p-10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xs shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-inner">
          <Cpu className="w-8 h-8 stroke-[1.8]" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
          <span>3.1 – NGHIÊN CỨU</span>
          <span className="opacity-40">•</span>
          <span>{tabLabels[activeWorkflowTab]}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mb-2">
          Khu vực đã được làm sạch
        </h3>
        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
          Đã xóa toàn bộ nội dung cũ. Sẵn sàng để xây dựng lại giao diện và luồng xử lý mới theo yêu cầu của bạn.
        </p>
      </div>
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
