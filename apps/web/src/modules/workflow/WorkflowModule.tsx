import React, { useState } from 'react';
import {
  Compass, Cpu, ArrowLeft, CheckCircle2, ArrowRight, Wrench, Flame, CheckSquare,
  Layers, FileText, AlertCircle, ShieldCheck, Plus, Search, Filter, Download,
  Eye, Code2, HardDrive, CheckSquare2, Sparkles, SlidersHorizontal, RefreshCw, X, FolderKanban,
  Clock, Package, Check, ChevronRight, Share2, ClipboardCheck, Lightbulb,
  FileCode, Box, ExternalLink, Play, Zap, Award, Activity, FileSpreadsheet
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
    name: 'CẦN LÀM (TO DO)',
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
    name: 'ĐANG XỬ LÝ (IN PROGRESS)',
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
    name: 'KIỂM THỬ & ĐÁNH GIÁ (REVIEW & TEST)',
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
    name: 'HOÀN THÀNH (DONE)',
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

  // Helper icon tài liệu
  const renderFileIcon = (type: string) => {
    if (type.includes('Altium') || type.includes('Gerber')) return <Layers className="w-4 h-4 text-[#F15A24]" />;
    if (type.includes('3D') || type.includes('STEP')) return <Box className="w-4 h-4 text-cyan-500" />;
    if (type.includes('Firmware') || type.includes('Hex') || type.includes('Code')) return <FileCode className="w-4 h-4 text-blue-500" />;
    if (type.includes('Excel') || type.includes('PO')) return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
    return <FileText className="w-4 h-4 text-amber-500" />;
  };

  return (
    /* MASTER ORDER EXECUTION HUB - UNIFIED INDUSTRIAL WORKSPACE */
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. ZONE ĐIỀU HÀNH ĐƠN HÀNG & SLA PIPELINE */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50/70 via-white to-orange-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Order selector and metadata */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-[#F15A24] to-amber-500 text-white rounded-xl shadow-xs shrink-0">
            <Package className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Đơn Hàng R&D Active
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                {currentOrder.priority}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {currentOrder.project}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedOrderCode}
                onChange={(e) => {
                  setSelectedOrderCode(e.target.value);
                  const found = ORDERS_LIST.find(o => o.code === e.target.value);
                  if (found) setActiveOrderStep(found.currentStep);
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 font-black text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F15A24]/30 cursor-pointer shadow-2xs"
              >
                {ORDERS_LIST.map(o => (
                  <option key={o.code} value={o.code}>
                    {o.code}: {o.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right: Progress bar, SLA, and actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Progress Bar */}
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 px-3.5 py-2 rounded-xl min-w-[180px] space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-black">
              <span className="text-slate-400 uppercase tracking-wider">Tiến Độ Xử Lý</span>
              <span className="text-[#F15A24]">{overallProgressPercent}% ({completedStepsCount}/4)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F15A24] via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
          </div>

          {/* SLA Badge */}
          <div className="bg-white dark:bg-slate-800/80 border border-orange-200/80 dark:border-orange-800/60 px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs">
            <Clock className="w-4 h-4 text-[#F15A24] shrink-0" />
            <div>
              <div className="text-[9px] text-slate-400 font-extrabold uppercase leading-none">SLA Bước {activeOrderStep}</div>
              <div className="font-black text-slate-900 dark:text-white mt-0.5">
                {currentOrderStep.sla} <span className="text-slate-400 font-normal">/ Hạn {currentOrder.targetDate}</span>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <button
            onClick={() => alert(`Đã xuất báo cáo tiến độ chuẩn hóa cho mã đơn ${selectedOrderCode}`)}
            className="px-3 py-2 bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition shadow-2xs hover:bg-slate-800"
          >
            <FileText className="w-3.5 h-3.5" /> Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* 2. ZONE TIẾN TRÌNH 4 BƯỚC LIÊN KẾT (CONNECTED STEPPER TRACK) */}
      <div className="p-3 sm:p-4 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {orderSteps.map((s) => {
            const isActive = activeOrderStep === s.step;
            const isDone = s.status === 'COMPLETED';
            const isInProgress = s.status === 'IN_PROGRESS';

            const stepCheckedCount = s.checklists.filter(c => checkedMap[c.id]).length;
            const stepTotalCount = s.checklists.length;

            return (
              <button
                key={s.step}
                onClick={() => setActiveOrderStep(s.step)}
                className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between gap-2.5 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-[#F15A24] ring-2 ring-[#F15A24]/30 shadow-xs scale-[1.01]'
                    : isDone
                      ? 'bg-emerald-50/40 dark:bg-slate-900/90 border-emerald-300/80 dark:border-emerald-900/60 hover:border-emerald-400'
                      : isInProgress
                        ? 'bg-white dark:bg-slate-900 border-orange-300 dark:border-orange-800/80'
                        : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Header of Step Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[11px] shadow-2xs ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isActive
                          ? 'bg-[#F15A24] text-white ring-2 ring-[#F15A24]/30'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      isActive ? 'text-[#F15A24]' : isDone ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'
                    }`}>
                      {s.code}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60">
                      Hoàn Thành
                    </span>
                  ) : isInProgress ? (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-orange-100 dark:bg-orange-950/70 text-[#F15A24] border border-orange-300/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-pulse" /> Đang Xử Lý
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-slate-100 dark:bg-slate-800 text-slate-400">
                      Chờ Tiếp Nhận
                    </span>
                  )}
                </div>

                {/* Step Title & Department */}
                <div>
                  <h4 className={`text-xs font-black line-clamp-1 leading-tight ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {s.name}
                  </h4>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5 truncate">
                    {s.dept}
                  </div>
                </div>

                {/* Footer of Step Card */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-bold truncate max-w-[100px]">
                    {s.leadEngineer}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded font-extrabold text-[9px] ${
                    stepCheckedCount === stepTotalCount
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {stepCheckedCount}/{stepTotalCount} Tiêu Chuẩn
                  </span>
                </div>

                {/* Active Highlight Bar */}
                {isActive && (
                  <div className="w-full h-1 bg-gradient-to-r from-[#F15A24] to-amber-500 absolute bottom-0 left-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ZONE KHÔNG GIAN LÀM VIỆC CHI TIẾT CỦA BƯỚC (STEP WORKSPACE & DELIVERABLES DOCK) */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Step Header & Toggle Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F15A24] to-amber-500 text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
              {currentOrderStep.step}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black text-[#F15A24] uppercase tracking-wider">
                  {currentOrderStep.code} • {currentOrderStep.dept}
                </span>
                <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  Chủ trì: {currentOrderStep.leadEngineer}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {currentOrderStep.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => handleToggleOrderStep(currentOrderStep.step)}
            className={`px-4 py-2 font-black text-xs rounded-xl transition flex items-center gap-2 shadow-xs cursor-pointer ${
              currentOrderStep.status === 'COMPLETED'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-500/20'
                : 'bg-[#F15A24] text-white hover:bg-orange-600 ring-2 ring-orange-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{currentOrderStep.status === 'COMPLETED' ? 'Đã Hoàn Thành Bước Này (Mở Lại)' : 'Xác Nhận Hoàn Thành Bước Xử Lý'}</span>
          </button>
        </div>

        {/* Technical Objective Callout */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <div className="text-[10px] font-extrabold text-slate-400 uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F15A24]" />
            <span>Mục Tiêu Kỹ Thuật SOP Bước {currentOrderStep.step}:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
            {currentOrderStep.desc}
          </p>
        </div>

        {/* BỐ CỤC 2 CỘT: CHECKLIST KIỂM ĐỊNH (58%) VS HỒ SƠ CAD/PCB (42%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* CỘT 1: DANH MỤC CHECKLIST BẮT BUỘC (7/12) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#F15A24]" />
                <span>Tiêu Chuẩn Kiểm Định (Verification Checklist):</span>
              </h4>
              <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300">
                {currentStepCheckedCount}/{currentStepTotalCount} Đạt ({currentStepPercent}%)
              </span>
            </div>

            {/* Checklist Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStepPercent === 100 ? 'bg-emerald-500' : 'bg-[#F15A24]'
                }`}
                style={{ width: `${currentStepPercent}%` }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-2">
              {currentOrderStep.checklists.map((chk) => {
                const isChecked = !!checkedMap[chk.id];
                return (
                  <div
                    key={chk.id}
                    onClick={() => handleToggleCheckItem(chk.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        className={`w-4.5 h-4.5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-slate-300 dark:border-slate-600 hover:border-[#F15A24]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                      <div className="space-y-0.5">
                        <span className={`text-xs font-bold leading-tight block ${
                          isChecked
                            ? 'text-slate-900 dark:text-slate-100 line-through decoration-emerald-500/50'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {chk.text}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-semibold">
                          Tiêu chuẩn: {chk.standard}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 ${
                      isChecked
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60'
                        : 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60'
                    }`}>
                      {isChecked ? 'Đã duyệt' : 'Cần xử lý'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CỘT 2: TÀI LIỆU & HỒ SƠ KỸ THUẬT ĐÍNH KÈM (5/12) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>Hồ Sơ Kỹ Thuật Bước {currentOrderStep.step}:</span>
              </h4>
              <button
                onClick={() => alert(`Đính kèm thêm file mới vào Bước ${currentOrderStep.step} (${selectedOrderCode})`)}
                className="text-[10px] font-black text-[#0088CC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 stroke-[3]" /> Đính Kèm File
              </button>
            </div>

            {/* Deliverables list */}
            <div className="space-y-2">
              {currentOrderStep.deliverables.map((file) => (
                <div
                  key={file.id}
                  className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2.5 shadow-2xs hover:bg-slate-100/70 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 shrink-0">
                      {renderFileIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 flex-wrap font-medium">
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => alert(`Xem trước tài liệu: ${file.name}`)}
                      className="p-1.5 bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-600 transition cursor-pointer"
                      title="Xem nhanh"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert(`Tải xuống tài liệu: ${file.name}`)}
                      className="p-1.5 bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 text-[#F15A24] rounded-lg border border-orange-200 dark:border-orange-800/60 transition cursor-pointer"
                      title="Tải về máy"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              disabled={activeOrderStep <= 1}
              onClick={() => setActiveOrderStep(activeOrderStep - 1)}
              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-bold disabled:opacity-40 cursor-pointer transition"
            >
              ← Bước Trước
            </button>
            <span className="font-bold text-slate-400 px-2 whitespace-nowrap">
              Bước {activeOrderStep} / 4
            </span>
            <button
              disabled={activeOrderStep >= 4}
              onClick={() => setActiveOrderStep(activeOrderStep + 1)}
              className="px-3.5 py-1.5 bg-[#F15A24] hover:bg-orange-600 text-white rounded-lg font-bold disabled:opacity-40 cursor-pointer transition shadow-xs"
            >
              Bước Tiếp Theo →
            </button>
          </div>

          <button
            onClick={() => alert(`Đã đồng bộ dữ liệu tiến độ 4 bước của đơn hàng ${selectedOrderCode} vào hệ thống AVG One.`)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition"
          >
            <RefreshCw className="w-3 h-3" /> Đồng Bộ Realtime
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
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'4steps' | '13sop'>('4steps');
  const [steps, setSteps] = useState<StepDetail[]>(SOP_13_STEPS);
  const [activeStep, setActiveStep] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [designFiles, setDesignFiles] = useState([
    { id: 'DSG-001', name: 'Sơ đồ Nguyên lý Altium PCB AI Sensor v3.2', author: 'Lê Văn Thiết Kế (Senior CAD)', date: '03/09/2026', type: 'Altium Gerber', status: 'APPROVED', size: '24.8 MB' },
    { id: 'DSG-002', name: 'Bản vẽ Lắp ráp SolidWorks 3D Vỏ Hộp AVG-X', author: 'Hoàng Quốc Việt (3D Specialist)', date: '02/09/2026', type: 'SolidWorks STEP', status: 'IN_PROGRESS', size: '158.4 MB' },
    { id: 'DSG-003', name: 'File Gerber Bo mạch 4 Lớp Xuất Nhà Máy', author: 'Trần Kỹ Thuật (PCB Layout)', date: '01/09/2026', type: 'Gerber Zip', status: 'APPROVED', size: '8.2 MB' },
    { id: 'DSG-004', name: 'Mẫu Thư viện Linh kiện SMT Chipset AI', author: 'Lê Văn Thiết Kế (Senior CAD)', date: '28/08/2026', type: 'BOM List Excel', status: 'APPROVED', size: '2.1 MB' }
  ]);

  const currentStepInfo = steps.find(s => s.step === activeStep) || steps[2];

  const handleToggleStep = (stepNum: number) => {
    setSteps(steps.map(s => {
      if (s.step === stepNum) {
        const nextStatus = s.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleAddNewDesign = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = {
      id: `DSG-00${designFiles.length + 1}`,
      name: 'Bản vẽ Thiết kế CAD 3D Vỏ Hộp Cảm Biến Thế Hệ Mới',
      author: 'Lê Văn Thiết Kế (Senior CAD)',
      date: 'Hôm nay',
      type: 'SolidWorks STEP',
      status: 'APPROVED',
      size: '42.5 MB'
    };
    setDesignFiles([newDoc, ...designFiles]);
    setShowAddModal(false);
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto bg-slate-50/60 dark:bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* 1. TOP EXECUTIVE COMMAND BAR (TITLE + TAB SWITCHER INTEGRATED) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-[#F15A24] to-amber-500 text-white rounded-xl shadow-xs shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>Hệ Thống AVG One</span>
              <span>/</span>
              <span>Quy Trình Kỹ Thuật</span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <span>PHÂN HỆ 3.2 – THIẾT KẾ KỸ THUẬT & CAD/PCB</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Hệ thống sẵn sàng" />
            </h1>
          </div>
        </div>

        {/* Tab Switcher Integrated Directly in Header */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 w-full md:w-auto">
          <button
            onClick={() => setActiveWorkflowTab('4steps')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeWorkflowTab === '4steps'
                ? 'bg-[#F15A24] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Quy Trình 4 Bước Đơn Hàng</span>
          </button>

          <button
            onClick={() => setActiveWorkflowTab('13sop')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeWorkflowTab === '13sop'
                ? 'bg-[#0088CC] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Chi Tiết Luồng 13 Bước SOP</span>
          </button>
        </div>
      </div>

      {/* 2. COMPACT KPI DASHBOARD STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-sky-300 dark:hover:border-sky-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tổng File CAD/PCB</span>
            <div className="p-1.5 bg-sky-50 dark:bg-sky-950/60 text-[#0077B6] rounded-lg">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">24 Bản vẽ</div>
          <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Đã chuẩn hóa Altium
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-cyan-300 dark:hover:border-cyan-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mẫu In 3D Prototype</span>
            <div className="p-1.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 rounded-lg">
              <Box className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-600 tracking-tight">8 Vỏ hộp</div>
          <div className="text-[10px] text-cyan-600 font-extrabold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Chuẩn chống nước IP67
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-emerald-300 dark:hover:border-emerald-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tiêu Chuẩn SOP Kỹ Thuật</span>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-lg">
              <ClipboardCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">95.8%</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1">
            <span>Bước 3, 4, 10 Đạt Duyệt</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-orange-300 dark:hover:border-orange-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Đơn Hàng Active</span>
            <div className="p-1.5 bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] rounded-lg">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#F15A24] tracking-tight">3 Đơn hàng</div>
          <div className="text-[10px] text-orange-600 font-extrabold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Mã DH-2026-RND-001 (Active)
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDER: 4 BƯỚC XỬ LÝ ĐƠN HÀNG VS 13 BƯỚC SOP */}
      {activeWorkflowTab === '4steps' ? (
        <Order4StepFlowView themeColor="#F15A24" defaultStep={2} />
      ) : (
        /* MAIN TWO-COLUMN WORKSPACE FOR 13 SOP STEPS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: 13-Steps SOP Tracker */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 max-h-[720px] overflow-y-auto">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Luồng 13 Bước SOP (Ưu Tiên 3.2):
              </h2>
              <span className="px-2.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/60 text-[#0077B6] dark:text-cyan-300 text-[10px] font-black rounded-md">
                3.2 - THIẾT KẾ
              </span>
            </div>

            {steps.map((s) => {
              const isDesignStep = s.department === '3.2 - THIẾT KẾ';
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    activeStep === s.step
                      ? 'bg-cyan-50 dark:bg-cyan-950/80 border-[#0088CC] text-slate-900 dark:text-white shadow-xs font-black'
                      : isDesignStep
                        ? 'bg-sky-50/60 dark:bg-slate-800/80 border-cyan-200 dark:border-slate-700 text-slate-900 dark:text-white font-extrabold'
                        : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-70 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shadow-xs flex-shrink-0 ${
                      s.status === 'COMPLETED' ? 'bg-emerald-600 text-white' :
                      s.step === activeStep ? 'bg-[#0088CC] text-white' :
                      isDesignStep ? 'bg-[#0077B6] text-white' :
                      'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {s.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs line-clamp-1">{s.title}</div>
                      <div className={`text-[10px] font-bold ${isDesignStep ? 'text-[#0077B6] dark:text-cyan-400' : 'text-slate-400'}`}>
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

          {/* Right: Detailed Workspaces & Technical Design Tables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Step Runner Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#0088CC] text-white font-black text-sm rounded-xl shadow-xs">
                    Bước {currentStepInfo.step}
                  </span>
                  <div>
                    <span className="text-xs font-black text-[#0077B6] dark:text-cyan-400 uppercase tracking-wider block">
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
                      : 'bg-[#0088CC] text-white hover:bg-[#0077B6]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{currentStepInfo.status === 'COMPLETED' ? 'Đã Hoàn Thành' : 'Đánh Dấu Hoàn Thành Step này'}</span>
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase">Mô tả Chi tiết Quy trình Thiết Kế:</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                  {currentStepInfo.description}
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Danh Mục Checklist Bắt Buộc (Thiết Kế SOP Standard):</h3>
                {[
                  'Đã hoàn tất bản vẽ Sơ đồ nguyên lý & phác thảo 3D kiểu dáng công nghiệp',
                  'Đã xuất file Gerber PCB và tài liệu đính kèm (Google Drive / CAD / Gerber)',
                  'Đã được Trưởng phòng 3.2 duyệt xác nhận chất lượng kỹ thuật'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <CheckSquare className="w-4 h-4 text-[#0088CC] flex-shrink-0" />
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
                  className="px-4 py-2 bg-[#0088CC] hover:bg-[#0077B6] text-white rounded-xl font-bold disabled:opacity-40 cursor-pointer"
                >
                  Bước Tiếp Theo →
                </button>
              </div>
            </div>

            {/* DỊCH VỤ TRẠM THIẾT KẾ CAD / PCB GERBER TABLE */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#0077B6]" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Quản Lý File Gerber & Bản Vẽ Lắp Ráp CAD 3D
                  </h3>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm file CAD..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0088CC]"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Mã File</th>
                      <th className="py-2.5 px-3">Tên Bản Vẽ Thiết Kế CAD / PCB</th>
                      <th className="py-2.5 px-3">Kỹ Sư Phụ Trách</th>
                      <th className="py-2.5 px-3">Loại File</th>
                      <th className="py-2.5 px-3 text-center">Trạng Thái</th>
                      <th className="py-2.5 px-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-200">
                    {designFiles
                      .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((file) => (
                        <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3 px-3 font-mono font-black text-[#0077B6]">{file.id}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 dark:text-slate-100">{file.name}</div>
                            <div className="text-[10px] text-slate-400">Dung lượng: {file.size} • Cập nhật: {file.date}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-bold">{file.author}</td>
                          <td className="py-3 px-3 font-bold text-cyan-600">{file.type}</td>
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              file.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' :
                              'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                            }`}>
                              {file.status === 'APPROVED' ? 'Đã Phê Duyệt' : 'Đang Thiết Kế'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedFile(file)}
                                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition cursor-pointer"
                                title="Xem chi tiết bản vẽ"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => alert(`Đang tải xuống file ${file.name}...`)}
                                className="p-1.5 bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 text-[#0077B6] rounded-lg transition cursor-pointer"
                                title="Tải về file Gerber"
                              >
                                <Download className="w-3.5 h-3.5" />
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
                  <option value="Altium Gerber">Altium PCB Gerber (.Zip)</option>
                  <option value="SolidWorks STEP">SolidWorks 3D (.STEP)</option>
                  <option value="BOM List Excel">Danh Mục BOM Linh Kiện (.XLSX)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Kỹ sư phụ trách</label>
                <input
                  type="text"
                  defaultValue="Lê Văn Thiết Kế (Senior CAD)"
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
                  className="px-4 py-2 bg-[#0088CC] hover:bg-[#0077B6] text-white rounded-xl cursor-pointer font-extrabold"
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
      {/* 1. TOP EXECUTIVE COMMAND BAR (TITLE + TAB SWITCHER INTEGRATED) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-600 to-teal-500 text-white rounded-xl shadow-xs shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>Hệ Thống AVG One</span>
              <span>/</span>
              <span>Nghiên Cứu & Phát Triển</span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <span>PHÂN HỆ 3.1 – NGHIÊN CỨU & PHÁT TRIỂN (RDI)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Hệ thống sẵn sàng" />
            </h1>
          </div>
        </div>

        {/* Tab Switcher Integrated Directly in Header */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 w-full md:w-auto">
          <button
            onClick={() => setActiveWorkflowTab('4steps')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
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
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
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

      {/* 2. COMPACT KPI DASHBOARD STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-emerald-300 dark:hover:border-emerald-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã Đơn Hàng DH-2026</span>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-lg">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">18 Mã Đơn</div>
          <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Chuẩn hóa hệ thống RDI
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-cyan-300 dark:hover:border-cyan-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Firmware C++ Flasher</span>
            <div className="p-1.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 rounded-lg">
              <FileCode className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-600 tracking-tight">v2.4 Active</div>
          <div className="text-[10px] text-cyan-600 font-extrabold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Driver AI Sensor Telemetry
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-emerald-300 dark:hover:border-emerald-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Test Phòng Lab 72h</span>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-lg">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">100% Đạt</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold flex items-center gap-1">
            <span>Ổn định nhiệt 42°C buồng kín</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5 hover:border-sky-300 dark:hover:border-sky-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Supabase Realtime</span>
            <div className="p-1.5 bg-sky-50 dark:bg-sky-950/60 text-[#00A8E8] rounded-lg">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">Đã Kết Nối</div>
          <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Baudrate 115200 Synced
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
    return () => {
      window.removeEventListener('submodule_back', handleSubModuleBack);
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

      {/* Synchronized container matching Header alignment (max-w-7xl px-4 sm:px-6) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex flex-col items-center justify-center gap-10 sm:gap-14 lg:gap-16 relative z-10 py-8 sm:py-14">
        
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
              <span>TRUNG TÂM NGHIÊN CỨU & PHÁT TRIỂN</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline justify-center gap-2">
            <span>Nghiên Cứu &</span>
            <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
              <span className="relative z-10">Phát Triển</span>
              <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
              </svg>
            </span>
          </h2>
        </div>

        {/* 📦 BỘ CÁC HỘP THẺ TRUY CẬP PHÂN HỆ CON (BỐ CỤC 2 HÀNG 2 CỘT CHUẨN ĐỒNG BỘ 32PX) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto w-full pb-2">
          
          {/* HỘP 1: 3.2 - THIẾT KẾ */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedSubModule('design')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedSubModule('design'); }}
            style={{ borderRadius: '32px' }}
            className="group flex flex-col items-center justify-center py-6 sm:py-7 px-4 min-h-[160px] bg-gradient-to-br from-sky-50/90 via-blue-50/70 to-cyan-50/80 dark:from-slate-900 dark:via-sky-950/50 dark:to-blue-950/70 rounded-[32px] border-2 border-sky-200 dark:border-sky-800/80 hover:border-[#0077B6] dark:hover:border-sky-400 hover:from-sky-100/90 hover:via-blue-100/70 hover:to-cyan-100/90 dark:hover:from-sky-900/60 dark:hover:to-blue-900/60 hover:-translate-y-0.5 transition-all duration-200 text-center relative overflow-hidden shadow-xs hover:shadow-md hover:shadow-sky-500/20 cursor-pointer select-none"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-sky-200/90 dark:border-sky-700/80 flex items-center justify-center text-[#0077B6] dark:text-sky-300 mb-3 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
              <Compass className="w-6.5 h-6.5 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#0077B6] dark:group-hover:text-sky-300 transition-colors whitespace-normal leading-tight w-full px-0.5">
              3.2 – THIẾT KẾ
            </h3>
          </div>

          {/* HỘP 2: 3.1 - NGHIÊN CỨU */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedSubModule('research')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedSubModule('research'); }}
            style={{ borderRadius: '32px' }}
            className="group flex flex-col items-center justify-center py-6 sm:py-7 px-4 min-h-[160px] bg-gradient-to-br from-sky-50/90 via-blue-50/70 to-cyan-50/80 dark:from-slate-900 dark:via-sky-950/50 dark:to-blue-950/70 rounded-[32px] border-2 border-sky-200 dark:border-sky-800/80 hover:border-[#0077B6] dark:hover:border-sky-400 hover:from-sky-100/90 hover:via-blue-100/70 hover:to-cyan-100/90 dark:hover:from-sky-900/60 dark:hover:to-blue-900/60 hover:-translate-y-0.5 transition-all duration-200 text-center relative overflow-hidden shadow-xs hover:shadow-md hover:shadow-sky-500/20 cursor-pointer select-none"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-sky-200/90 dark:border-sky-700/80 flex items-center justify-center text-[#0077B6] dark:text-sky-300 mb-3 group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
              <Cpu className="w-6.5 h-6.5 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#0077B6] dark:group-hover:text-sky-300 transition-colors whitespace-normal leading-tight w-full px-0.5">
              3.1 – NGHIÊN CỨU
            </h3>
          </div>

          {/* 2 THẺ PLACEHOLDER DỰ PHÒNG CHUẨN */}
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`rd-placeholder-${idx}`}
              style={{ borderRadius: '32px' }}
              className="flex flex-col items-center justify-center py-6 sm:py-7 px-4 min-h-[160px] bg-slate-50/70 dark:bg-slate-900/30 rounded-[32px] border-2 border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-3 bg-white/80 dark:bg-slate-800/40 shrink-0">
                <Sparkles className="w-5 h-5 text-slate-400 dark:text-slate-500 opacity-60" />
              </div>
              <h3 className="text-xs sm:text-sm font-normal text-slate-300/50 dark:text-slate-600/50 whitespace-normal leading-tight w-full px-0.5 opacity-50">
                + Sắp phát hành
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
