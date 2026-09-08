import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock, Hourglass, FileText, Users, User, PenTool, MapPin,
  MessageSquare, ChevronUp, ChevronDown, Trash2, Plus, Calendar as CalendarIcon,
  Search, RefreshCw, BarChart3, CheckCircle2, AlertCircle, XCircle, LayoutGrid, Table, FileSpreadsheet, Home,
  Upload, Paperclip, Image as ImageIcon, File, Download, Eye, ExternalLink,
  Sparkles, Flame, Compass, ArrowRight, ArrowLeft, ShieldCheck, CheckSquare, Building2, Car, Plane, AlertTriangle
} from 'lucide-react';
import {
  DiscussionEvent, EventAttachment, GOOGLE_SHEET_EDIT_URL, fetchDiscussionEventsFromGoogleSheet,
  syncDiscussionEventToGoogleSheet, getGoogleSheetWebhookUrl, setGoogleSheetWebhookUrl,
  updateLocalDiscussionEvent, moveToTrashDiscussionEvent, getDeletedDiscussionEvents,
  restoreDiscussionEventFromTrash, purgeDiscussionEventPermanently, emptyTrashDiscussionEvents,
  DeletedDiscussionEvent
} from '../../services/googleSheetSync';

const getRealTimeDateDefaults = () => {
  const now = new Date();
  const curDay = String(now.getDate()).padStart(2, '0');
  const curMonth = String(now.getMonth() + 1).padStart(2, '0');
  const curYear = String(now.getFullYear());
  const dayNames = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
  const curDayName = dayNames[now.getDay()];
  return {
    day: curDay,
    month: curMonth,
    year: curYear,
    dayName: curDayName,
    dateStr: `${curDay}/${curMonth}/${curYear}`,
    monthYearStr: `${curMonth}/${curYear}`
  };
};

const initialRealTimeDefaults = getRealTimeDateDefaults();

const INITIAL_EVENTS: DiscussionEvent[] = [
  {
    id: 'evt-1',
    stt: 1,
    scope: 'P1',
    dayOfWeek: 'THỨ BA',
    date: '18/08/2026',
    plannedStartTime: '18:00',
    plannedEndTime: '19:00',
    actualStartTime: '18:05',
    actualEndTime: '19:10',
    title: 'Họp Giao Ban R&D Firmware Sensor AI & Tiến Độ Mạch Nhúng AVG-X',
    legalEntity: 'DH',
    attendees: '1. Các đầu mối AVG: 1.T; 1.C; 1; 6; #; #K2B; #K1\n2. AV: Bà Trang; Ông Trịnh',
    secretary: '#K2B',
    status: 'Sắp tới',
    notes: 'Rà soát thông số linh kiện cảm biến và tiến độ nộp hồ sơ đăng ký bản quyền.',
    conclusionDocUrl: 'https://docs.google.com/document/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M'
  },
  {
    id: 'evt-2',
    stt: 2,
    scope: 'P2',
    dayOfWeek: 'THỨ TƯ',
    date: '19/08/2026',
    plannedStartTime: '09:00',
    plannedEndTime: '10:30',
    actualStartTime: '09:00',
    actualEndTime: '10:30',
    title: 'Rà Soát Đăng Ký Bản Quyền Nhãn Hiệu & Hợp Đồng Pháp Lý 2026',
    legalEntity: 'AV',
    attendees: 'Ban Pháp lý (6); Cố vấn Vũ Quốc Huy; Giám đốc Sản xuất',
    secretary: 'Pháp lý 6',
    status: 'Đã hoàn thành',
    notes: 'Đã hoàn thiện hồ sơ đăng ký Bảo hộ nhãn hiệu phần mềm AVG One.',
    conclusionDocUrl: 'https://docs.google.com/document/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M'
  },
  {
    id: 'evt-3',
    stt: 3,
    scope: 'Toàn Hệ Thống',
    dayOfWeek: 'THỨ TƯ',
    date: '19/08/2026',
    plannedStartTime: '14:30',
    plannedEndTime: '16:00',
    actualStartTime: '',
    actualEndTime: '',
    title: 'Họp Tháo Gỡ Vướng Mắc Hải Quan & Đóng Bo Mạch Lô 2',
    legalEntity: 'DH',
    attendees: 'Kế toán trưởng; Phòng Tài chính; Trưởng nhà máy Âu Việt',
    secretary: 'Tài chính 5.1',
    status: 'Hoãn',
    notes: 'Hoãn sang tuần tới do chưa có đủ thông quan linh kiện.',
    conclusionDocUrl: 'https://docs.google.com/document/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M'
  },
  {
    id: 'evt-4',
    stt: 4,
    scope: 'P1',
    dayOfWeek: 'CHỦ NHẬT',
    date: '30/08/2026',
    plannedStartTime: '08:30',
    plannedEndTime: '10:30',
    actualStartTime: '08:30',
    actualEndTime: '10:30',
    title: 'Việc trọng điểm T9 AV: chưa phải chủ tài sản mà mang đi bán',
    legalEntity: 'AVG',
    attendees: '1. Các đầu mối AVG: 1.T; 1.C; 1; 6; #; #K2B; #K1\n2. AV: Bà Trang; Ông Trịnh',
    secretary: '#K2B',
    status: 'Sắp tới',
    notes: 'Không có ghi chú thêm.',
    conclusionDocUrl: 'https://docs.google.com/document/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M'
  },
  {
    id: 'evt-5',
    stt: 5,
    scope: 'P1',
    dayOfWeek: initialRealTimeDefaults.dayName,
    date: initialRealTimeDefaults.dateStr,
    plannedStartTime: '09:00',
    plannedEndTime: '11:00',
    actualStartTime: '09:00',
    actualEndTime: '11:00',
    title: 'Họp Đánh Giá Chỉ Số Vận Hành Nền Tảng AVG One & Đơn Hàng Mới',
    legalEntity: 'DH',
    attendees: 'Ban Điều Hành; C-Suite; IT Admin; Nhà máy Âu Việt',
    secretary: '2.1',
    status: 'Sắp tới',
    notes: 'Chuẩn bị dữ liệu báo cáo 24/7 và tiến độ công việc trong ngày.',
    conclusionDocUrl: 'https://docs.google.com/document/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M'
  }
];

export type CalendarSubAppId = 'talk' | 'work' | 'problem' | 'event';

export interface CalendarSubAppCard {
  id: CalendarSubAppId;
  code: string;
  title: string;
  headerTitle: string;
  icon: React.ElementType;
  isAvailable: boolean;
  badge: string;
  description: string;
  liveStats: string;
  gradientBg: string;
  iconBg: string;
  iconColor: string;
}

export const CALENDAR_SUB_APPS: CalendarSubAppCard[] = [
  {
    id: 'talk',
    code: 'CAL-01',
    title: 'LỊCH TRAO ĐỔI',
    headerTitle: 'LỊCH TRAO ĐỔI',
    icon: MessageSquare,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG',
    description: 'Quản lý lịch họp giao ban, rà soát tiến độ, biên bản ghi nhớ & đồng bộ Google Sheets real-time.',
    liveStats: '3 Cuộc họp hôm nay | Real-time Sync',
    gradientBg: 'from-sky-500/10 via-cyan-500/5 to-transparent border-sky-200/90 dark:border-sky-800/60 hover:border-sky-500/50',
    iconBg: 'bg-[#00A8E8]/10 text-[#00A8E8]',
    iconColor: 'text-[#00A8E8]'
  },
  {
    id: 'work',
    code: 'CAL-02',
    title: 'LỊCH CÔNG TÁC',
    headerTitle: 'LỊCH CÔNG TÁC',
    icon: MapPin,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG',
    description: 'Theo dõi lịch trình đi công tác, khảo sát thực địa nhà máy, xe đưa đón & công tác phí cán bộ.',
    liveStats: '2 Lịch công tác tuần này | Nhà máy SX Âu Việt',
    gradientBg: 'from-orange-500/10 via-amber-500/5 to-transparent border-orange-200/90 dark:border-orange-800/60 hover:border-orange-500/50',
    iconBg: 'bg-[#F15A24]/10 text-[#F15A24]',
    iconColor: 'text-[#F15A24]'
  },
  {
    id: 'problem',
    code: 'CAL-03',
    title: 'LỊCH THÁO GỠ VƯỚNG MẮC',
    headerTitle: 'LỊCH THÁO GỠ VƯỚNG MẮC',
    icon: AlertCircle,
    isAvailable: true,
    badge: 'ĐÃ SẴN SÀNG',
    description: 'Lịch làm việc trọng điểm tháo gỡ điểm nghẽn thủ tục hải quan, đăng ký bản quyền & tiến độ dự án.',
    liveStats: '1 Vấn đề ưu tiên cao | Ban Điều Hành',
    gradientBg: 'from-rose-500/10 via-pink-500/5 to-transparent border-rose-200/90 dark:border-rose-800/60 hover:border-rose-500/50',
    iconBg: 'bg-rose-500/10 text-rose-500',
    iconColor: 'text-rose-500'
  },
  {
    id: 'event',
    code: 'CAL-04',
    title: 'LỊCH SỰ KIỆN HỆ THỐNG',
    headerTitle: 'LỊCH SỰ KIỆN HỆ THỐNG',
    icon: Sparkles,
    isAvailable: false,
    badge: 'SẮP PHÁT HÀNH',
    description: 'Lịch sự kiện toàn tập đoàn, lễ tổng kết, đào tạo nội bộ & hội nghị chiến lược năm 2026.',
    liveStats: 'Sự kiện Quý 3/2026 | Tập Đoàn AVG',
    gradientBg: 'from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-200/90 dark:border-emerald-800/60 hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    iconColor: 'text-emerald-500'
  }
];

export interface WorkTripEvent {
  id: string;
  code: string;
  title: string;
  department: string;
  personnel: string;
  destination: string;
  startDate: string;
  endDate: string;
  vehicle: string;
  status: 'Đang công tác' | 'Sắp tới' | 'Hoàn thành';
  notes: string;
}

export const INITIAL_WORK_TRIPS: WorkTripEvent[] = [
  {
    id: 'trip-1',
    code: 'CT-2026-001',
    title: 'Khảo Sát Thực Địa & Nghiệm Thu Lắp Đặt Dây Chuyền Nhà Máy Âu Việt',
    department: 'Nhà Máy SX Âu Việt & Ban Điều Hành',
    personnel: 'Lê Hoàng Nam (Kỹ sư trưởng), Trần Thị Thu Thảo (HR Lead)',
    destination: 'KCN Âu Việt - Hưng Yên',
    startDate: '05/09/2026',
    endDate: '07/09/2026',
    vehicle: 'Xe 7 chỗ 30A-8888 (Tài xế Nguyễn Văn A)',
    status: 'Đang công tác',
    notes: 'Rà soát quy trình nghiệm thu bo mạch SMT và kiểm tra an toàn lao động.'
  },
  {
    id: 'trip-2',
    code: 'CT-2026-002',
    title: 'Làm Việc Với Chi Cục Hải Quan & Kiểm Định Hợp Chuẩn Linh Kiện Chip AI',
    department: 'Ban Pháp Lý & Cung Ứng',
    personnel: 'Cố vấn Vũ Quốc Huy, Trưởng phòng Pháp lý (6)',
    destination: 'Cảng Hải Phòng & Chi Cục Hải Quan KCN',
    startDate: '10/09/2026',
    endDate: '11/09/2026',
    vehicle: 'Xe 4 chỗ 30F-9999',
    status: 'Sắp tới',
    notes: 'Nộp bổ sung hồ sơ chứng nhận CO/CQ cho lô linh kiện cảm biến AVG-X.'
  },
  {
    id: 'trip-3',
    code: 'CT-2026-003',
    title: 'Thử Nghiệm Thực Địa Trạm Thu Phát Cảm Biến AI Tại Dự Án Khách Hàng',
    department: '3.1 - RDI Firmware Team',
    personnel: 'Nguyễn Văn Quản Lý (CEO), Kỹ sư Nguyễn Văn C',
    destination: 'Dự án Công trình Đô thị Thông minh - Đà Nẵng',
    startDate: '15/09/2026',
    endDate: '18/09/2026',
    vehicle: 'Vé máy bay VN214 (Chuyến bay 08:30)',
    status: 'Sắp tới',
    notes: 'Chạy thử nghiệm 72 giờ đo đạc tín hiệu truyền dữ liệu Cloud Supabase.'
  }
];

export const CalendarModule: React.FC = () => {
  const [events, setEvents] = useState<DiscussionEvent[]>(INITIAL_EVENTS);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Sub-App state: null = Landing Home Grid | 'talk' = Lịch trao đổi | 'work' = Lịch công tác | 'problem' = Lịch tháo gỡ vướng mắc | 'event' = Lịch sự kiện
  const [activeSubApp, setActiveSubApp] = useState<CalendarSubAppId | null>(null);

  // Sync Header Title with AppShell when activeSubApp changes
  useEffect(() => {
    if (activeSubApp === 'talk') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'LỊCH TRAO ĐỔI' }));
    } else if (activeSubApp === 'work') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'LỊCH CÔNG TÁC' }));
    } else if (activeSubApp === 'problem') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'LỊCH THÁO GỠ VƯỚNG MẮC' }));
    } else if (activeSubApp === 'event') {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: 'LỊCH SỰ KIỆN HỆ THỐNG' }));
    } else {
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    }
  }, [activeSubApp]);

  // Listen for back click from AppShell header
  useEffect(() => {
    const handleSubBack = () => {
      setActiveSubApp(null);
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    };
    window.addEventListener('submodule_back', handleSubBack);
    return () => {
      window.removeEventListener('submodule_back', handleSubBack);
      window.dispatchEvent(new CustomEvent('submodule_change', { detail: '' }));
    };
  }, []);

  // Real-time Vietnam Clock state (GMT+7)
  const [vnNow, setVnNow] = useState<Date>(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setVnNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedVnClock = useMemo(() => {
    return vnNow.toLocaleTimeString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, [vnNow]);

  const formattedVnDate = useMemo(() => {
    return vnNow.toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, [vnNow]);

  const realTimeStr = useMemo(() => {
    const d = String(vnNow.getDate()).padStart(2, '0');
    const m = String(vnNow.getMonth() + 1).padStart(2, '0');
    const y = String(vnNow.getFullYear());
    return {
      day: d,
      month: m,
      year: y,
      dateStr: `${d}/${m}/${y}`,
      monthYearStr: `${m}/${y}`
    };
  }, [vnNow]);

  // View Modes: 'day' (Thẻ / Timeline View) | 'month' (Lưới / Month Matrix) | 'table' (Bảng Bảng Tính)
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'table'>('day');
  
  // Selected Date, Year & Month Filters (Defaulting to real-time current date)
  const [currentDateStr, setCurrentDateStr] = useState<string>(() => realTimeStr.dateStr);
  const [selectedYear, setSelectedYear] = useState<string>(() => realTimeStr.year);
  const [selectedMonthOnly, setSelectedMonthOnly] = useState<string>(() => realTimeStr.month);
  const [selectedDayOnly, setSelectedDayOnly] = useState<string>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>(() => realTimeStr.monthYearStr);
  const [showAllDates, setShowAllDates] = useState<boolean>(false);
  
  // Accordion Toggle
  const [showStatsAccordion, setShowStatsAccordion] = useState<boolean>(false);
  
  // Universal Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScope, setSelectedScope] = useState<string>('ALL');
  const [selectedLegalEntity, setSelectedLegalEntity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Executive note state for Column 4
  const [promoNote, setPromoNote] = useState<string>('Ghi chú điều hành: Rà soát tiến độ nộp tài liệu T9 trước 17:00.');

  // Document & File Attachment Upload States
  const [activeAttachmentEvent, setActiveAttachmentEvent] = useState<DiscussionEvent | null>(null);
  const [previewImageModal, setPreviewImageModal] = useState<{ url: string; name: string } | null>(null);
  const [newDocUrl, setNewDocUrl] = useState<string>('');
  const [newDocName, setNewDocName] = useState<string>('');

  // Handle Local File & Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetEvent: DiscussionEvent) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: EventAttachment[] = [...(targetEvent.attachments || [])];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const isImg = file.type.startsWith('image/');
        const sizeStr = file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

        newAttachments.push({
          id: 'att-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          name: file.name,
          type: isImg ? 'image' : 'file',
          url: url,
          size: sizeStr,
          uploadedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        });

        processedCount++;
        if (processedCount === files.length) {
          const updatedEvent = { ...targetEvent, attachments: newAttachments };
          const updatedEvents = events.map(ev => ev.id === targetEvent.id ? updatedEvent : ev);
          setEvents(updatedEvents);
          updateLocalDiscussionEvent(updatedEvent);
          if (activeAttachmentEvent && activeAttachmentEvent.id === targetEvent.id) {
            setActiveAttachmentEvent(updatedEvent);
          }
          setToastMessage(`📎 Đã tải lên ${files.length} tệp tài liệu / hình ảnh thành công!`);
          setTimeout(() => setToastMessage(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Remove File Attachment
  const handleRemoveAttachment = (targetEvent: DiscussionEvent, attachmentId: string) => {
    const updatedAttachments = (targetEvent.attachments || []).filter(a => a.id !== attachmentId);
    const updatedEvent = { ...targetEvent, attachments: updatedAttachments };
    const updatedEvents = events.map(ev => ev.id === targetEvent.id ? updatedEvent : ev);
    setEvents(updatedEvents);
    updateLocalDiscussionEvent(updatedEvent);
    if (activeAttachmentEvent && activeAttachmentEvent.id === targetEvent.id) {
      setActiveAttachmentEvent(updatedEvent);
    }
    setToastMessage('🗑️ Đã xoá tệp đính kèm.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Add URL Document
  const handleAddUrlDocument = (e: React.FormEvent, targetEvent: DiscussionEvent) => {
    e.preventDefault();
    if (!newDocUrl.trim()) return;
    const url = newDocUrl.trim();
    const name = newDocName.trim() || 'Tài liệu liên kết ↗';

    const newAttachments: EventAttachment[] = [
      ...(targetEvent.attachments || []),
      {
        id: 'att-' + Date.now(),
        name: name,
        type: 'url',
        url: url,
        uploadedAt: new Date().toLocaleDateString('vi-VN')
      }
    ];

    const updatedEvent = { ...targetEvent, attachments: newAttachments, conclusionDocUrl: url };
    const updatedEvents = events.map(ev => ev.id === targetEvent.id ? updatedEvent : ev);
    setEvents(updatedEvents);
    updateLocalDiscussionEvent(updatedEvent);
    if (activeAttachmentEvent && activeAttachmentEvent.id === targetEvent.id) {
      setActiveAttachmentEvent(updatedEvent);
    }
    setNewDocUrl('');
    setNewDocName('');
    setToastMessage('🔗 Đã thêm liên kết tài liệu trao đổi thành công!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleJumpToCurrentDay = () => {
    const now = vnNow;
    const curDay = String(now.getDate()).padStart(2, '0');
    const curMonth = String(now.getMonth() + 1).padStart(2, '0');
    const curYear = String(now.getFullYear());
    const dateStr = `${curDay}/${curMonth}/${curYear}`;

    setSelectedYear(curYear);
    setSelectedMonthOnly(curMonth);
    setCurrentDateStr(dateStr);
    setViewMode('day');
    setToastMessage(`🗓️ Đã chuyển về Ngày hiện tại (${dateStr})!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleJumpToCurrentMonth = () => {
    const now = vnNow;
    const curMonth = String(now.getMonth() + 1).padStart(2, '0');
    const curYear = String(now.getFullYear());

    setSelectedYear(curYear);
    setSelectedMonthOnly(curMonth);
    setViewMode('month');
    setToastMessage(`🗓️ Đã chuyển về Chế độ xem Tháng (${curMonth}/${curYear})!`);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  // Modals & Drawers
  const [selectedEventDetail, setSelectedEventDetail] = useState<DiscussionEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Edit Event Modal
  const [editingEvent, setEditingEvent] = useState<DiscussionEvent | null>(null);

  // Trash Drawer & Webhook Modal
  const [showTrashModal, setShowTrashModal] = useState<boolean>(false);
  const [deletedEvents, setDeletedEvents] = useState<DeletedDiscussionEvent[]>([]);
  const [showWebhookModal, setShowWebhookModal] = useState<boolean>(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState<string>('');

  // Form states for new event
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(() => realTimeStr.dateStr);
  const [newDayOfWeek, setNewDayOfWeek] = useState(() => realTimeStr.dayName);
  const [newPlannedStart, setNewPlannedStart] = useState('08:30');
  const [newPlannedEnd, setNewPlannedEnd] = useState('10:30');
  const [newScope, setNewScope] = useState('P1');
  const [newLegalEntity, setNewLegalEntity] = useState('AVG');
  const [newAttendees, setNewAttendees] = useState('1. Các đầu mối AVG: 1.T; 1.C; 1; 6; #; #K2B; #K1\n2. AV: Bà Trang; Ông Trịnh');
  const [newSecretary, setNewSecretary] = useState('#K2B');
  const [newNotes, setNewNotes] = useState('Không có ghi chú thêm.');

  useEffect(() => {
    handleRefreshLiveEvents();
    setDeletedEvents(getDeletedDiscussionEvents());
    setWebhookUrlInput(getGoogleSheetWebhookUrl());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefreshLiveEvents = async () => {
    setLoading(true);
    try {
      const fetched = await fetchDiscussionEventsFromGoogleSheet();
      if (fetched && fetched.length > 0) {
        setEvents(fetched);
      }
    } catch (e) {
      console.warn('Fallback to local event list');
    } finally {
      setLoading(false);
    }
  };

  // Date Navigation Helpers
  const parseVnDate = (str: string): Date => {
    const parts = str.split('/');
    if (parts.length !== 3) return new Date();
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return new Date();
    return new Date(y, m - 1, d);
  };

  const formatVnDateStr = (date: Date): string => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handlePrevDay = () => {
    const current = parseVnDate(currentDateStr);
    current.setDate(current.getDate() - 1);
    setCurrentDateStr(formatVnDateStr(current));
  };

  const handleNextDay = () => {
    const current = parseVnDate(currentDateStr);
    current.setDate(current.getDate() + 1);
    setCurrentDateStr(formatVnDateStr(current));
  };

  const handleToday = () => {
    setCurrentDateStr(formattedVnDate || '30/08/2026');
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvt: DiscussionEvent = {
      id: `evt-${Date.now()}`,
      stt: events.length + 1,
      scope: newScope,
      dayOfWeek: newDayOfWeek,
      date: newDate,
      plannedStartTime: newPlannedStart,
      plannedEndTime: newPlannedEnd,
      actualStartTime: '',
      actualEndTime: '',
      title: newTitle.trim(),
      legalEntity: newLegalEntity,
      attendees: newAttendees,
      secretary: newSecretary,
      status: 'Sắp tới',
      notes: newNotes,
      conclusionDocUrl: GOOGLE_SHEET_EDIT_URL
    };

    const updated = [newEvt, ...events];
    setEvents(updated);
    setShowAddModal(false);
    setNewTitle('');
    setNewNotes('');

    showToast('📢 Đã ban hành & đồng bộ cuộc họp mới!');

    try {
      await syncDiscussionEventToGoogleSheet(newEvt, 'add');
    } catch (e) {
      console.error('Error syncing to sheet:', e);
    }
  };

  // Handle Edit Submit
  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title.trim()) return;

    const updatedEvents = events.map(ev => ev.id === editingEvent.id ? editingEvent : ev);
    setEvents(updatedEvents);
    if (selectedEventDetail && selectedEventDetail.id === editingEvent.id) {
      setSelectedEventDetail(editingEvent);
    }
    setEditingEvent(null);
    showToast('💾 Đã lưu thay đổi thông tin cuộc họp!');

    try {
      await syncDiscussionEventToGoogleSheet(editingEvent, 'update');
    } catch (e) {
      console.error('Error syncing edit:', e);
    }
  };

  // Quick 1-Touch Status Update
  const handleQuickStatusUpdate = async (evt: DiscussionEvent, newStatus: string) => {
    const currentHHMM = formattedVnClock.substring(0, 5);
    const updated: DiscussionEvent = { ...evt, status: newStatus };

    if (newStatus === 'Đang diễn ra' && !updated.actualStartTime) {
      updated.actualStartTime = currentHHMM;
    }
    if (newStatus === 'Đã diễn ra' && !updated.actualEndTime) {
      updated.actualEndTime = currentHHMM;
      if (!updated.actualStartTime) updated.actualStartTime = updated.plannedStartTime || currentHHMM;
    }

    const updatedEvents = events.map(ev => ev.id === evt.id ? updated : ev);
    setEvents(updatedEvents);
    if (selectedEventDetail && selectedEventDetail.id === evt.id) {
      setSelectedEventDetail(updated);
    }
    showToast(`⚡ Đã chuyển trạng thái sang "${newStatus}"!`);

    try {
      await syncDiscussionEventToGoogleSheet(updated, 'update');
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  // Move event to Trash
  const handleMoveToTrash = (evt: DiscussionEvent) => {
    const updatedTrash = moveToTrashDiscussionEvent(evt);
    setDeletedEvents(updatedTrash);
    setEvents(events.filter(e => e.id !== evt.id));
    if (selectedEventDetail && selectedEventDetail.id === evt.id) {
      setSelectedEventDetail(null);
    }
    showToast('🗑️ Đã chuyển cuộc họp vào thùng rác!');
  };

  // Restore from Trash
  const handleRestoreFromTrash = (eventId: string) => {
    const restored = restoreDiscussionEventFromTrash(eventId);
    if (restored) {
      setEvents([restored, ...events]);
      setDeletedEvents(getDeletedDiscussionEvents());
      showToast('🔄 Đã khôi phục cuộc họp từ thùng rác!');
    }
  };

  // Purge permanently from Trash
  const handlePurgeFromTrash = (eventId: string) => {
    const updatedTrash = purgeDiscussionEventPermanently(eventId);
    setDeletedEvents(updatedTrash);
    showToast('❌ Đã xóa vĩnh viễn cuộc họp!');
  };

  // Save Webhook Settings
  const handleSaveWebhook = () => {
    setGoogleSheetWebhookUrl(webhookUrlInput);
    setShowWebhookModal(false);
    showToast('🔗 Đã lưu Webhook URL Google Apps Script thành công!');
  };

  const calculateDurationMinutesStr = (start?: string, end?: string): string => {
    if (!start || !end) return "60";
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    if (isNaN(sH) || isNaN(sM) || isNaN(eH) || isNaN(eM)) return `${start} - ${end}`;
    
    let diffMinutes = (eH * 60 + eM) - (sH * 60 + sM);
    if (diffMinutes <= 0) diffMinutes += 24 * 60;
    return `${diffMinutes}`;
  };

  // Dynamic Real-time Vietnam Time Status Engine
  // Dynamic Real-time Vietnam Time Status Engine
  const getStatusInfo = (evt: DiscussionEvent | string, now: Date = vnNow) => {
    if (typeof evt === 'string') {
      const s = evt.toLowerCase().trim();
      if (s.includes('hoàn thành') || s.includes('đã diễn ra')) {
        return {
          code: 'COMPLETED',
          label: 'Đã diễn ra',
          dotColor: 'bg-red-500',
          pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#DC2626] text-white border border-red-400/60 shadow-[0_0_10px_rgba(220,38,38,0.35)]',
          borderLeft: 'border-l-4 border-l-red-500'
        };
      }
      if (s.includes('hoãn') || s.includes('hủy')) {
        return {
          code: 'CANCELLED',
          label: evt || 'Hoãn / Hủy',
          dotColor: 'bg-slate-500',
          pillBg: 'bg-slate-800 text-slate-300 border border-slate-600',
          borderLeft: 'border-l-4 border-l-slate-500'
        };
      }
      if (s.includes('đang')) {
        return {
          code: 'ONGOING',
          label: 'Đang diễn ra',
          dotColor: 'bg-emerald-400 animate-pulse',
          pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#10B981] text-white border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.35)]',
          borderLeft: 'border-l-4 border-l-emerald-500'
        };
      }
      return {
        code: 'UPCOMING',
        label: 'Sắp tới',
        dotColor: 'bg-amber-400',
        pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#F59E0B] text-white border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.35)]',
        borderLeft: 'border-l-4 border-l-amber-500'
      };
    }

    const rawStatus = (evt.status || '').toLowerCase().trim();

    if (rawStatus.includes('hoãn') || rawStatus.includes('hủy') || rawStatus === 'cancelled') {
      return {
        code: 'CANCELLED',
        label: evt.status || 'Hoãn / Hủy',
        dotColor: 'bg-slate-500',
        pillBg: 'bg-slate-800 text-slate-300 border border-slate-600',
        borderLeft: 'border-l-4 border-l-slate-500'
      };
    }

    if (rawStatus.includes('đã hoàn thành') || rawStatus.includes('đã diễn ra')) {
      return {
        code: 'COMPLETED',
        label: 'Đã diễn ra',
        dotColor: 'bg-red-500',
        pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#DC2626] text-white border border-red-400/60 shadow-[0_0_10px_rgba(220,38,38,0.35)]',
        borderLeft: 'border-l-4 border-l-red-500'
      };
    }

    if (rawStatus.includes('đang')) {
      return {
        code: 'ONGOING',
        label: 'Đang diễn ra',
        dotColor: 'bg-emerald-400 animate-pulse',
        pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#10B981] text-white border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.35)]',
        borderLeft: 'border-l-4 border-l-emerald-500'
      };
    }

    if (!evt.date || !evt.plannedStartTime || !evt.plannedEndTime) {
      return {
        code: 'UPCOMING',
        label: 'Sắp tới',
        dotColor: 'bg-amber-400',
        pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#F59E0B] text-white border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.35)]',
        borderLeft: 'border-l-4 border-l-amber-500'
      };
    }

    try {
      const [d, m, y] = evt.date.split('/').map(Number);
      const [startH, startM] = evt.plannedStartTime.split(':').map(Number);
      const [endH, endM] = evt.plannedEndTime.split(':').map(Number);

      const evtStart = new Date(y, m - 1, d, startH, startM, 0);
      const evtEnd = new Date(y, m - 1, d, endH, endM, 0);

      if (now > evtEnd) {
        return {
          code: 'COMPLETED',
          label: 'Đã diễn ra',
          dotColor: 'bg-red-500',
          pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#DC2626] text-white border border-red-400/60 shadow-[0_0_10px_rgba(220,38,38,0.35)]',
          borderLeft: 'border-l-4 border-l-red-500'
        };
      }

      if (now >= evtStart && now <= evtEnd) {
        return {
          code: 'ONGOING',
          label: 'Đang diễn ra',
          dotColor: 'bg-emerald-400 animate-pulse',
          pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#10B981] text-white border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.35)]',
          borderLeft: 'border-l-4 border-l-emerald-500'
        };
      }

      return {
        code: 'UPCOMING',
        label: 'Sắp tới',
        dotColor: 'bg-amber-400',
        pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#F59E0B] text-white border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.35)]',
        borderLeft: 'border-l-4 border-l-amber-500'
      };
    } catch (e) {
      return {
        code: 'UPCOMING',
        label: 'Sắp tới',
        dotColor: 'bg-amber-400',
        pillBg: 'bg-gradient-to-r from-[#0077B6] to-[#F59E0B] text-white border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.35)]',
        borderLeft: 'border-l-4 border-l-amber-500'
      };
    }
  };

  // Universal Filter Engine
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || (
        evt.title.toLowerCase().includes(q) ||
        (evt.notes || '').toLowerCase().includes(q) ||
        (evt.attendees || '').toLowerCase().includes(q) ||
        (evt.secretary || '').toLowerCase().includes(q) ||
        (evt.date || '').toLowerCase().includes(q) ||
        (evt.scope || '').toLowerCase().includes(q) ||
        (evt.legalEntity || '').toLowerCase().includes(q)
      );

      const parts = (evt.date || '').split('/');
      const dayStr = parts.length === 3 ? parts[0] : '';
      const monthStr = parts.length === 3 ? parts[1] : '';
      const yearStr = parts.length === 3 ? parts[2] : '';

      const matchesYear = selectedYear === 'ALL' || yearStr === selectedYear;
      const matchesMonth = selectedMonthOnly === 'ALL' || monthStr === selectedMonthOnly;
      const matchesDay = selectedDayOnly === 'ALL' || dayStr === selectedDayOnly;
      const matchesScope = selectedScope === 'ALL' || evt.scope === selectedScope;
      const matchesLegalEntity = selectedLegalEntity === 'ALL' || evt.legalEntity === selectedLegalEntity;

      let matchesStatus = true;
      const stInfo = getStatusInfo(evt, vnNow);
      if (selectedStatus === 'GREEN') {
        matchesStatus = stInfo.code === 'COMPLETED';
      } else if (selectedStatus === 'YELLOW') {
        matchesStatus = stInfo.code === 'ONGOING' || stInfo.code === 'UPCOMING';
      } else if (selectedStatus === 'RED') {
        matchesStatus = stInfo.code === 'CANCELLED';
      }

      return matchesQuery && matchesYear && matchesMonth && matchesDay && matchesScope && matchesLegalEntity && matchesStatus;
    });
  }, [events, searchQuery, selectedYear, selectedMonthOnly, selectedDayOnly, selectedScope, selectedLegalEntity, selectedStatus, vnNow]);

  // Real-time KPI Metrics Calculation
  const kpiStats = useMemo(() => {
    let ongoing = 0;
    let upcoming = 0;
    let completed = 0;

    events.forEach(e => {
      const info = getStatusInfo(e, vnNow);
      if (info.code === 'COMPLETED') completed++;
      else if (info.code === 'ONGOING') ongoing++;
      else if (info.code === 'UPCOMING') upcoming++;
    });

    return { ongoing, upcoming, completed, total: events.length };
  }, [events, vnNow]);

  // Calendar Month Matrix Grid Generator for 08/2026
  const monthDaysGrid = useMemo(() => {
    const days = [];
    const paddingCells = 5;
    for (let i = 0; i < paddingCells; i++) {
      days.push({ dayNum: null, dateStr: null, isCurrentMonth: false });
    }
    for (let d = 1; d <= 31; d++) {
      const dStr = `${String(d).padStart(2, '0')}/08/2026`;
      days.push({ dayNum: d, dateStr: dStr, isCurrentMonth: true });
    }
    return days;
  }, []);

  // Map events by date
  const eventsByDateMap = useMemo(() => {
    const map: Record<string, DiscussionEvent[]> = {};
    filteredEvents.forEach(e => {
      if (e.date) {
        if (!map[e.date]) map[e.date] = [];
        map[e.date].push(e);
      }
    });
    return map;
  }, [filteredEvents]);

  // Smart Display Events for Day View
  const displayDayEvents = useMemo(() => {
    if (searchQuery.trim() !== '' || showAllDates) {
      return filteredEvents;
    }
    return filteredEvents.filter(e => e.date === currentDateStr);
  }, [filteredEvents, searchQuery, showAllDates, currentDateStr]);

  // Helper for Status Priority Sorting: ONGOING (1) -> UPCOMING (2) -> COMPLETED (3) -> CANCELLED (4)
  const getStatusPriority = (evt: DiscussionEvent, now: Date = vnNow): number => {
    const info = getStatusInfo(evt, now);
    if (info.code === 'ONGOING') return 1;
    if (info.code === 'UPCOMING') return 2;
    if (info.code === 'COMPLETED') return 3;
    if (info.code === 'CANCELLED') return 4;
    return 5;
  };

  // Group active events by Date & prioritize ONGOING + UPCOMING at top of feed
  const groupedEventsByDate = useMemo(() => {
    const eventsToGroup = viewMode === 'day' ? displayDayEvents : filteredEvents;
    const map: Record<string, DiscussionEvent[]> = {};

    eventsToGroup.forEach(evt => {
      const dStr = evt.date || '30/08/2026';
      if (!map[dStr]) {
        map[dStr] = [];
      }
      map[dStr].push(evt);
    });

    // 1. Sort events inside each date group: ONGOING (1) -> UPCOMING (2) -> COMPLETED (3) -> CANCELLED (4)
    Object.keys(map).forEach(dateStr => {
      map[dateStr].sort((a, b) => {
        const prioA = getStatusPriority(a, vnNow);
        const prioB = getStatusPriority(b, vnNow);
        if (prioA !== prioB) return prioA - prioB;
        return (a.plannedStartTime || '').localeCompare(b.plannedStartTime || '');
      });
    });

    // 2. Sort Date Groups by highest status priority in each group (Pushing ONGOING & UPCOMING groups to top)
    const sortedDateKeys = Object.keys(map).sort((dateA, dateB) => {
      const minPrioA = Math.min(...map[dateA].map(e => getStatusPriority(e, vnNow)));
      const minPrioB = Math.min(...map[dateB].map(e => getStatusPriority(e, vnNow)));
      
      if (minPrioA !== minPrioB) return minPrioA - minPrioB;

      // Secondary sort for same status priority: Date order
      const dA = parseVnDate(dateA).getTime();
      const dB = parseVnDate(dateB).getTime();
      return dA - dB;
    });

    return sortedDateKeys.map(dateStr => ({
      dateStr,
      events: map[dateStr]
    }));
  }, [viewMode, displayDayEvents, filteredEvents, vnNow]);

  // Render Hidden DOM trigger buttons for AppShell header tabs integration
  const hiddenTriggers = (
    <>
      <button id="btn-calendar-subtab-talk" className="hidden" onClick={() => setActiveSubApp('talk')} />
      <button id="btn-calendar-subtab-work" className="hidden" onClick={() => setActiveSubApp('work')} />
      <button id="btn-calendar-subtab-problem" className="hidden" onClick={() => setActiveSubApp('problem')} />
      <button id="btn-calendar-subtab-event" className="hidden" onClick={() => setActiveSubApp('event')} />
    </>
  );

  // ==============================================================================================
  // 🎯 CASE 1: TRANG CHỦ PHÂN HỆ LỊCH (LANDING GRID HOME VIEW)
  // ==============================================================================================
  // ==============================================================================================
  // 🎯 CASE 1: TRANG CHỦ PHÂN HỆ LỊCH (LANDING GRID HOME VIEW CHUẨN AVG ONE)
  // ==============================================================================================
  if (activeSubApp === null) {
    return (
      <div className="w-full h-full flex-1 min-h-0 bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 relative overflow-hidden flex flex-col items-center justify-center">
        {hiddenTriggers}
        
        {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER (PHONG CÁCH LƯỚI KHÔNG CHẤM BI) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

        {/* 🎨 VIBRANT MULTI-ORB AMBIENT GLOWS */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
        <div className="absolute bottom-10 left-1/3 w-[550px] h-[300px] bg-gradient-to-tr from-sky-400/10 via-amber-400/10 to-orange-400/15 dark:from-sky-600/10 dark:to-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-0" />

        {/* Synchronized container matching Header alignment (max-w-7xl px-4 sm:px-6) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex flex-col items-center justify-center gap-10 sm:gap-14 lg:gap-16 relative z-10 py-8 sm:py-14 my-auto">
          
          {/* Header Title Section */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              {/* SVG Clockwise Border Tracing Effect */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="calendar-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                  stroke="url(#calendar-slogan-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>

              <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-transparent text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <CalendarIcon className="w-4 h-4 text-[#00A8E8]" />
                <span>HỆ THỐNG QUẢN LÝ LỊCH & ĐIỀU HÀNH TẬP TRUNG</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline justify-center gap-2">
              <span>Phân Hệ</span>
              <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                <span className="relative z-10">Lịch</span>
                <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                </svg>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Hệ thống quản lý lịch trao đổi, lịch công tác tác nghiệp & điều hành doanh nghiệp tập trung
            </p>
          </div>

          {/* 📦 BỘ CÁC HỘP THẺ TRUY CẬP PHÂN HỆ LỊCH (BỐ CỤC 2 HÀNG x 2 CỘT, BO GÓC 32PX) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto w-full pb-2">
            {CALENDAR_SUB_APPS.map((app) => {
              const Icon = app.icon;
              if (app.isAvailable) {
                return (
                  <div
                    key={app.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveSubApp(app.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveSubApp(app.id); }}
                    style={{ borderRadius: '32px' }}
                    className="group flex flex-col items-center justify-center py-5 sm:py-6 px-4 min-h-[150px] bg-white dark:bg-slate-900 rounded-[32px] border-2 border-orange-200/90 dark:border-orange-900/50 hover:border-[#F15A24] hover:-translate-y-0.5 transition-all duration-200 text-center relative overflow-hidden shadow-2xs hover:shadow-md cursor-pointer select-none"
                  >
                    {/* Icon Hộp Vuông Bo Tròn Chuẩn Màu Cam AVG */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-[#F15A24] dark:text-orange-400 mb-3 group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                    </div>

                    {/* Tiêu đề */}
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#F15A24] transition-colors whitespace-normal leading-tight w-full px-0.5">
                      {app.title}
                    </h3>
                  </div>
                );
              } else {
                return (
                  <div
                    key={app.id}
                    style={{ borderRadius: '32px' }}
                    onClick={() => setToastMessage(`🚀 "${app.title}" sắp được phát hành trong phiên bản đợt tiếp theo!`)}
                    className="flex flex-col items-center justify-center py-5 sm:py-6 px-4 min-h-[150px] bg-slate-50/70 dark:bg-slate-900/30 rounded-[32px] border-2 border-dashed border-slate-300/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-center relative overflow-hidden transition-all duration-200 cursor-default select-none"
                  >
                    {/* Icon Hộp xám */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-3 bg-white/80 dark:bg-slate-800/40 shrink-0">
                      <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-slate-400 opacity-60" />
                    </div>

                    {/* Tiêu đề */}
                    <h3 className="text-xs sm:text-sm font-normal text-slate-400 dark:text-slate-500 whitespace-normal leading-tight w-full px-0.5 opacity-60">
                      {app.title}
                    </h3>
                  </div>
                );
              }
            })}
          </div>

        </div>
      </div>
    );
  }

  // ==============================================================================================
  // 🎯 CASE 2: LỊCH CÔNG TÁC VIEW (ACTIVE SUB APP === 'work')
  // ==============================================================================================
  if (activeSubApp === 'work') {
    return (
      <div className="calendar-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
        {hiddenTriggers}
        
        {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

        {/* LỊCH CÔNG TÁC CONTENT */}
        <div className="w-full h-full flex flex-col space-y-3.5 relative z-10 overflow-hidden">
          
          {/* Header Bar with Back Button */}
          <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSubApp(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-600 dark:text-slate-300 hover:text-[#F15A24] transition flex items-center gap-1.5 text-xs font-extrabold cursor-pointer"
                title="Quay lại Trang Chủ Phân Hệ Lịch"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Trang Chủ Lịch</span>
              </button>
              <div className="h-5 w-0.5 bg-slate-200 dark:bg-slate-800" />
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F15A24]" />
                  <span>LỊCH CÔNG TÁC TÁC NGHIỆP</span>
                </h2>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Quản lý lịch công tác cán bộ, địa điểm thực địa, xe đưa đón & công tác phí tập đoàn
                </p>
              </div>
            </div>

            <button
              onClick={() => setToastMessage('📌 Đã mở biểu mẫu Thêm Lịch Công Tác Mới!')}
              className="py-2 px-3.5 bg-[#F15A24] hover:bg-[#d94e1f] text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Thêm Lịch Công Tác</span>
            </button>
          </div>

          {/* List of Business Trips */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {INITIAL_WORK_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 hover:border-[#F15A24]/40 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/60 text-[#F15A24] text-xs font-black">
                      {trip.code}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400">{trip.department}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold inline-flex items-center gap-1 w-fit ${
                    trip.status === 'Đang công tác' 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800' 
                      : 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {trip.status}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {trip.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span><b>Địa điểm:</b> {trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span><b>Thời gian:</b> {trip.startDate} - {trip.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span><b>Phương tiện:</b> {trip.vehicle}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">Cán bộ đi:</span> {trip.personnel}
                  <div className="mt-1"><span className="font-extrabold text-slate-700 dark:text-slate-200">Ghi chú:</span> {trip.notes}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // ==============================================================================================
  // 🎯 CASE 3: LỊCH TRAO ĐỔI VIEW (ACTIVE SUB APP === 'talk' OR DEFAULT SUB-APP VIEW)
  // ==============================================================================================
  return (
    <div className="calendar-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      {hiddenTriggers}
      
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

      {/* 🎯 4 EQUAL COLUMNS GRID SYSTEM (25% PANEL | 50% TRAO ĐỔI & CÁC HỘP NỘI DUNG) */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-3.5 overflow-hidden relative z-10">
        <aside className="lg:col-span-1 w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 space-y-3.5 text-slate-800 dark:text-slate-200 scrollbar-thin overflow-y-auto shadow-sm hover:border-[#F15A24]/40 transition-all">
          
          {/* 🎯 HỘP 1: NÚT THÊM MỚI & TÌM KIẾM NHANH */}
          <div className="space-y-2.5">
            {/* Primary Action Button - Primary Orange #F15A24 Gradient */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#F15A24] via-[#FF7043] to-[#F15A24] hover:from-[#d94e1f] hover:to-[#f15a24] text-white font-black text-xs sm:text-sm rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#F15A24]/30 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Thêm Lịch Họp Mới</span>
            </button>

            {/* Universal Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nội dung, thư ký, tham dự..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/40 focus:border-[#00A8E8] font-medium transition shadow-2xs"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold cursor-pointer">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 📅 HỘP 2: BỘ LỌC THỜI GIAN & HIỂN THỊ */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 rounded-md p-3 space-y-3">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                Bộ Lọc & Hiển Thị
              </span>
              <button
                type="button"
                onClick={handleJumpToCurrentDay}
                title="Trở về Ngày Tháng Hiện Tại (Múi giờ Việt Nam ICT UTC+7)"
                className="p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#00A8E8] text-slate-600 dark:text-slate-300 hover:text-[#00A8E8] rounded-md flex items-center justify-center cursor-pointer transition shadow-2xs group"
              >
                <Home className="w-3.5 h-3.5 stroke-[1.75] group-hover:scale-110 transition-transform text-[#00A8E8] dark:text-[#00A8E8]" />
              </button>
            </div>

            {/* Năm, Tháng & Ngày Dropdowns */}
            <div className="grid grid-cols-3 gap-1.5">
              {/* Năm Dropdown */}
              <div className="relative flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-xs text-slate-800 dark:text-slate-100 font-bold shadow-2xs hover:border-[#00A8E8]/60 transition">
                <div className="flex items-center gap-1 min-w-0">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#00A8E8] dark:text-[#00A8E8] flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-bold text-[11px] truncate">
                    {selectedYear === 'ALL' ? 'Tất cả' : `Năm ${selectedYear}`}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0 ml-0.5" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                >
                  <option value="2026" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Năm 2026</option>
                  <option value="2025" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Năm 2025</option>
                  <option value="2024" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Năm 2024</option>
                  <option value="ALL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tất cả năm</option>
                </select>
              </div>

              {/* Tháng Dropdown */}
              <div className="relative flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-xs text-slate-800 dark:text-slate-100 font-bold shadow-2xs hover:border-[#00A8E8]/60 transition">
                <div className="flex items-center gap-1 min-w-0">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#00A8E8] dark:text-[#00A8E8] flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-bold text-[11px] truncate">
                    {selectedMonthOnly === 'ALL' ? 'Tất cả' : `Tháng ${selectedMonthOnly}`}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0 ml-0.5" />
                <select
                  value={selectedMonthOnly}
                  onChange={(e) => setSelectedMonthOnly(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                >
                  <option value="01" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 01</option>
                  <option value="02" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 02</option>
                  <option value="03" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 03</option>
                  <option value="04" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 04</option>
                  <option value="05" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 05</option>
                  <option value="06" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 06</option>
                  <option value="07" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 07</option>
                  <option value="08" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 08</option>
                  <option value="09" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 09</option>
                  <option value="10" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 10</option>
                  <option value="11" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 11</option>
                  <option value="12" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tháng 12</option>
                  <option value="ALL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tất cả tháng</option>
                </select>
              </div>

              {/* Ngày Dropdown */}
              <div className="relative flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-xs text-slate-800 dark:text-slate-100 font-bold shadow-2xs hover:border-[#00A8E8]/60 transition">
                <div className="flex items-center gap-1 min-w-0">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#00A8E8] dark:text-[#00A8E8] flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-bold text-[11px] truncate">
                    {selectedDayOnly === 'ALL' ? 'Tất cả' : `Ngày ${selectedDayOnly}`}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0 ml-0.5" />
                <select
                  value={selectedDayOnly}
                  onChange={(e) => {
                    const newDay = e.target.value;
                    setSelectedDayOnly(newDay);
                    if (newDay !== 'ALL') {
                      const curParts = currentDateStr.split('/');
                      const m = curParts[1] || selectedMonthOnly || realTimeStr.month;
                      const y = curParts[2] || selectedYear || realTimeStr.year;
                      setCurrentDateStr(`${newDay}/${m === 'ALL' ? realTimeStr.month : m}/${y === 'ALL' ? realTimeStr.year : y}`);
                      setViewMode('day');
                    }
                  }}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                >
                  <option value="ALL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tất cả ngày</option>
                  {Array.from({ length: 31 }, (_, i) => {
                    const dStr = String(i + 1).padStart(2, '0');
                    return (
                      <option key={dStr} value={dStr} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        Ngày {dStr}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Segmented View Mode Switcher + D/M Badge */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-slate-200/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-md p-1">
                <button
                  onClick={() => setViewMode('day')}
                  className={`flex-1 py-1 rounded-md text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    viewMode === 'day' || viewMode === 'month'
                      ? 'bg-gradient-to-r from-[#00A8E8] to-[#0088CC] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#00A8E8]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> Thẻ
                </button>

                <button
                  onClick={() => setViewMode('table')}
                  className={`flex-1 py-1 rounded-md text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-gradient-to-r from-[#00A8E8] to-[#0088CC] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#00A8E8]'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" /> Lưới
                </button>
              </div>

              {/* Nút D/M Toggle Badge */}
              <button
                type="button"
                onClick={() => {
                  if (viewMode === 'day') {
                    setViewMode('month');
                    showToast(`🗓️ Chế độ M: Hiển thị tổng số ${filteredEvents.length} cuộc trao đổi trong Tháng ${selectedMonthOnly}/${selectedYear}`);
                  } else {
                    setViewMode('day');
                    showToast(`🗓️ Chế độ D: Hiển thị ${displayDayEvents.length} cuộc trao đổi trong Ngày ${currentDateStr}`);
                  }
                }}
                title={viewMode === 'day' ? `Chế độ D: Đang xem theo ngày - Click để chuyển sang Chế độ M (Tháng)` : `Chế độ M: Đang xem theo tháng - Click để chuyển sang Chế độ D (Ngày)`}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#00A8E8] rounded-md flex items-center justify-center cursor-pointer transition shadow-2xs group"
              >
                <span className="text-xs font-black bg-gradient-to-r from-[#00A8E8] to-[#0088CC] text-white px-2 py-0.5 rounded-md transition-transform group-hover:scale-105 select-none">
                  {viewMode === 'day' ? 'D' : 'M'}
                </span>
              </button>
            </div>
          </div>

          {/* ⚡ HỘP 3: TIỆN ÍCH DỮ LIỆU & ĐỒNG BỘ */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 rounded-md p-3 space-y-2">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase px-0.5">
              Tiện Ích & Đồng Bộ
            </span>

            <div className="grid grid-cols-3 gap-1.5">
              {/* Google Sheet 24/7 */}
              <a
                href={GOOGLE_SHEET_EDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-md transition flex flex-col sm:flex-row items-center justify-center gap-1 font-bold text-[11px] shadow-2xs cursor-pointer"
                title="Mở Google Sheet Trực Tiếp 24/7"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="truncate">Sheet 24/7</span>
              </a>

              {/* Sync Live Button */}
              <button
                onClick={handleRefreshLiveEvents}
                disabled={loading}
                className="py-2 px-1 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 rounded-md transition flex flex-col sm:flex-row items-center justify-center gap-1 font-bold text-[11px] shadow-2xs cursor-pointer disabled:opacity-50"
                title="Đồng bộ dữ liệu thời gian thực"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 ${loading ? 'animate-spin' : ''}`} />
                <span className="truncate">Đồng bộ</span>
              </button>

              {/* Trash Modal Button */}
              <button
                onClick={() => setShowTrashModal(true)}
                className="py-2 px-1 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition flex flex-col sm:flex-row items-center justify-center gap-1 font-bold text-[11px] shadow-2xs relative cursor-pointer"
                title="Xem Thùng Rác Đã Xóa"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <span className="truncate">Thùng Rác</span>
                {deletedEvents.length > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-rose-600 text-white text-[9px] rounded-md font-black shadow-xs">
                    {deletedEvents.length}
                  </span>
                )}
              </button>
            </div>
          </div>

        </aside>

        {/* ========================================================================= */}
        {/* 🏢 PHẦN 2 + 3 (COL 2 & 3 - 50% WIDTH): NỘI DUNG TRAO ĐỔI & HỌP CÔNG VIỆC */}
        {/* ========================================================================= */}
        <main className="lg:col-span-2 w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-[28px] p-3.5 sm:p-4 space-y-3.5 flex flex-col overflow-hidden shadow-sm relative hover:border-[#F15A24]/30 transition-all">
          
          {/* 🔮 TOP BANNER EXECUTIVE DASHBOARD WITH SLOGAN PILL BADGE & BRUSH STROKE */}
          <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-[22px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Title & Capsule Subtitle Pill Box */}
              <div className="space-y-2 text-left">
                {/* Animated Slogan Badge - Hộp vuông bo góc rounded-xl */}
                <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="calendar-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                      stroke="url(#calendar-slogan-border-gradient)"
                      strokeWidth="1.5"
                      className="animate-slogan-box-border"
                    />
                  </svg>

                  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#F15A24]" />
                    <span>AVG CALENDAR & EXECUTIVE MEETINGS</span>
                  </div>
                </div>

                {/* Title with Brush Stroke Underline */}
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                  <span>Lịch</span>
                  <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                    <span className="relative z-10">Trao Đổi</span>
                    <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                    </svg>
                  </span>
                  <span>Công Việc</span>
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Quản lý và theo dõi các cuộc trao đổi công việc một cách hiệu quả theo thời gian thực.
                </p>
              </div>

              {/* Right 3 Metric KPI Stat Cards */}
              <div className="flex items-center gap-2.5 self-start md:self-center">
                
                {/* Box 1: Đang diễn ra */}
                <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl py-2 px-3.5 min-w-[85px] text-center shadow-xs">
                  <div className="text-xl font-black mb-0.5 text-emerald-600 dark:text-emerald-400">
                    {kpiStats.ongoing}
                  </div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-xs bg-emerald-500 animate-pulse"></span> ĐANG DIỄN RA
                  </div>
                </div>

                {/* Box 2: Sắp tới */}
                <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl py-2 px-3.5 min-w-[85px] text-center shadow-xs">
                  <div className="text-xl font-black mb-0.5 text-amber-600 dark:text-amber-400">
                    {kpiStats.upcoming}
                  </div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-xs bg-amber-500"></span> SẮP TỚI
                  </div>
                </div>

                {/* Box 3: Đã diễn ra */}
                <div className="bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl py-2 px-3.5 min-w-[85px] text-center shadow-xs">
                  <div className="text-xl font-black mb-0.5 text-slate-700 dark:text-slate-300">
                    {kpiStats.completed}
                  </div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-xs bg-slate-400"></span> ĐÃ DIỄN RA
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 📊 COLLAPSIBLE STATS ACCORDION BAR ("THỐNG KÊ DỮ LIỆU TRAO ĐỔI") */}
          <div className="flex-shrink-0 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => setShowStatsAccordion(!showStatsAccordion)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#F15A24]/10 border border-[#F15A24]/30 flex items-center justify-center text-[#F15A24]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-100">THỐNG KÊ DỮ LIỆU TRAO ĐỔI</span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#F15A24] transition-transform ${showStatsAccordion ? 'rotate-180' : ''}`} />
            </button>

            {showStatsAccordion && (
              <div className="p-3 border-t border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 grid grid-cols-3 gap-2.5 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400 font-extrabold text-[10px]">Tổng số cuộc trao đổi</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white">{kpiStats.total}</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400 font-extrabold text-[10px]">Tỷ lệ hoàn thành thực tế</div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {kpiStats.total > 0 ? Math.round((kpiStats.completed / kpiStats.total) * 100) : 0}%
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400 font-extrabold text-[10px]">Đang diễn ra & Sắp diễn ra</div>
                  <div className="text-lg font-black text-amber-600 dark:text-amber-400">{kpiStats.ongoing + kpiStats.upcoming}</div>
                </div>
              </div>
            )}
          </div>

          {/* 📜 MEETING CONTENT CARDS FEED (KHU VỰC TRUỘT CÁC HỘP NỘI DUNG TRAO ĐỔI - THANH CUỘN DỊCH SÁT MÉP PHẢI) */}
          <div className="flex-1 overflow-y-auto space-y-3 -mr-3 pr-3 pb-3 scrollbar-thin relative z-10">

            {/* ========================================================================= */}
            {/* 🌟 VIEW MODE 1 & 2: CARD FEED FOR DAY (D) OR MONTH (M) */}
            {/* ========================================================================= */}
            {(viewMode === 'day' || viewMode === 'month') && (
              <div className="space-y-3">

                {groupedEventsByDate.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs font-semibold bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div>
                      {viewMode === 'day'
                        ? `Không có cuộc trao đổi nào diễn ra trong ngày ${currentDateStr}.`
                        : `Không có cuộc trao đổi nào diễn ra trong tháng ${selectedMonthOnly}/${selectedYear}.`}
                    </div>
                    {viewMode === 'day' && (
                      <button
                        onClick={() => setShowAllDates(true)}
                        className="px-3.5 py-1.5 bg-[#F15A24]/10 text-[#F15A24] font-extrabold rounded-xl text-xs hover:bg-[#F15A24]/20 transition cursor-pointer"
                      >
                        Xem tất cả ngày ({filteredEvents.length} lịch)
                      </button>
                    )}
                  </div>
                ) : (
                  groupedEventsByDate.map(group => {
                    const firstEvt = group.events[0];
                    const [dayNum, monthNum] = group.dateStr.split('/');
                    const stInfo = getStatusInfo(firstEvt, vnNow);

                    return (
                      <div key={group.dateStr} className="date-group-item flex flex-col relative mb-5 pb-1 last:mb-2">
                        
                        {/* TIÊU ĐỀ NGÀY SẮC NÉT - PHẲNG, KHÔNG DÙNG HỘP BAO BỌC */}
                        <div className="flex items-center justify-between pt-2 pb-2 border-b border-slate-200 dark:border-slate-800 my-1.5 px-0.5">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-xs bg-[#00A8E8]" />
                            <h2 className="text-base font-black uppercase text-slate-900 dark:text-white tracking-wide">
                              {firstEvt.dayOfWeek || 'CHỦ NHẬT'}, NGÀY {dayNum}/{monthNum}/{selectedYear}
                            </h2>
                          </div>
                          <span className="text-xs font-extrabold text-[#0284C7] dark:text-sky-300">
                            {group.events.length} cuộc trao đổi
                          </span>
                        </div>

                        {/* CỘT CÁC THẺ NỘI DUNG TRAO ĐỔI NẰM BÊN DƯỚI */}
                        <div className="w-full flex flex-col gap-3 mt-1">
                          {group.events.map((evt) => {
                            const evtStInfo = getStatusInfo(evt, vnNow);
                            const durationMinutes = calculateDurationMinutesStr(evt.plannedStartTime, evt.plannedEndTime);
                            const isCompleted = evtStInfo.code === 'COMPLETED' || evt.status === 'Đã diễn ra' || evt.status === 'Đã hoàn thành';
                            const isOngoing = evtStInfo.code === 'ONGOING' || evt.status === 'Đang diễn ra';
                            const isCancelled = evtStInfo.code === 'CANCELLED' || evt.status === 'Hoãn' || evt.status === 'Hủy';

                            const borderLeftClass = isOngoing
                              ? 'border-l-[5px] border-l-emerald-500'
                              : isCompleted
                                ? 'border-l-[5px] border-l-[#00A8E8]'
                                : isCancelled
                                  ? 'border-l-[5px] border-l-slate-400'
                                  : 'border-l-[5px] border-l-amber-500';

                            const badgeClass = isOngoing
                              ? 'bg-emerald-600 text-white'
                              : isCompleted
                                ? 'bg-[#00A8E8] text-white'
                                : isCancelled
                                  ? 'bg-slate-600 text-white'
                                  : 'bg-amber-500 text-white';

                            const headerBgClass = isOngoing
                              ? 'bg-emerald-500/15 dark:bg-emerald-950/50 border-b border-emerald-500/30 dark:border-emerald-800'
                              : isCompleted
                                ? 'bg-sky-500/15 dark:bg-sky-950/50 border-b border-sky-500/30 dark:border-sky-800'
                                : isCancelled
                                  ? 'bg-slate-500/15 dark:bg-slate-900/60 border-b border-slate-500/30 dark:border-slate-800'
                                  : 'bg-amber-500/15 dark:bg-amber-950/50 border-b border-amber-500/30 dark:border-amber-800';

                            const headerLabelClass = isOngoing
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : isCompleted
                                ? 'text-[#0284C7] dark:text-[#38BDF8]'
                                : isCancelled
                                  ? 'text-slate-600 dark:text-slate-400'
                                  : 'text-amber-700 dark:text-amber-400';

                            return (
                               <div key={evt.id} className={`w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 ${borderLeftClass} overflow-hidden transition-all hover:shadow-md relative group/card shadow-2xs space-y-0`}>
                                 
                                 {/* HÀNG 1: THỜI GIAN VÀ TRẠNG THÁI (THANH HEADER NỀN XANH/CAM/XÁM THEO TRẠNG THÁI) */}
                                 <div className={`px-4 py-2.5 ${headerBgClass} flex items-baseline justify-between`}>
                                   <div className="flex items-baseline gap-2">
                                     <span className={`${headerLabelClass} font-black text-xs sm:text-sm uppercase flex-shrink-0 tracking-wide`}>DỰ KIẾN:</span>
                                     <span className={`text-base sm:text-lg font-black ${headerLabelClass}`}>{evt.plannedStartTime || '10:30'} – {evt.plannedEndTime || '11:30'}</span>
                                     <span className={`${headerLabelClass} opacity-80 font-bold text-xs sm:text-sm ml-0.5`}>({durationMinutes} phút)</span>
                                   </div>

                                   <span className={`px-2.5 py-1 rounded-xl font-bold text-xs ${badgeClass} shadow-2xs inline-flex items-center gap-1.5`}>
                                     <span className={isOngoing ? "w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" : "w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"} />
                                     <span>{evtStInfo.label}</span>
                                   </span>
                                 </div>

                                 {/* BODY WRAPPER */}
                                 <div className="p-4 space-y-3">

                                   {/* HÀNG 2: NỘI DUNG / CHỦ ĐỀ CUỘC HỌP */}
                                   <div className="space-y-1">
                                     <div className={`${headerLabelClass} font-bold text-xs`}>Nội dung:</div>
                                     <div className="w-full p-3 sm:p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-700/60 hover:border-[#0284C7]/40 transition shadow-2xs">
                                       <h3
                                         className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-[#0284C7] transition whitespace-pre-line"
                                         onClick={() => setSelectedEventDetail(evt)}
                                       >
                                         {evt.title}
                                       </h3>
                                     </div>
                                   </div>

                                   {/* HÀNG 3A: THÀNH PHẦN */}
                                   <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                                     <span className={`${headerLabelClass} font-bold text-xs flex-shrink-0 pt-0.5`}>Thành phần:</span>
                                     <span className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                                       {evt.attendees || 'AV; AVG'}
                                     </span>
                                   </div>

                                   {/* HÀNG 3B: THÔNG TIN ĐIỀU HÀNH, THƯ KÝ, PHẠM VI (CĂN CHỈNH GỌN GÀNG CÂN ĐỐI) */}
                                   <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                     <div className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1.5 text-xs">
                                       <span className={`${headerLabelClass} font-bold`}>Điều hành:</span>
                                       <strong className="font-black text-slate-900 dark:text-white">{evt.legalEntity || 'DH'}</strong>
                                     </div>

                                     <div className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1.5 text-xs">
                                       <span className={`${headerLabelClass} font-bold`}>Thư ký:</span>
                                       <strong className="font-black text-slate-900 dark:text-white">{evt.secretary || '2.1'}</strong>
                                     </div>

                                     <div className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1.5 text-xs">
                                       <span className={`${headerLabelClass} font-bold`}>Phạm vi:</span>
                                       <strong className="font-black text-slate-900 dark:text-white">{evt.scope || 'P1'}</strong>
                                     </div>
                                   </div>

                                   {/* HÀNG 4: TÀI LIỆU ĐÍNH KÈM (NẾU CÓ) */}
                                   {((evt.attachments && evt.attachments.length > 0) || evt.conclusionDocUrl) && (
                                     <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                                       <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 font-extrabold text-[10px] uppercase tracking-wider">
                                         <div className="flex items-center gap-1.5">
                                           <Paperclip className="w-3.5 h-3.5" />
                                           <span>TÀI LIỆU TRAO ĐỔI & ẢNH ({evt.attachments?.length || (evt.conclusionDocUrl ? 1 : 0)})</span>
                                         </div>
                                         <button
                                           type="button"
                                           onClick={() => setActiveAttachmentEvent(evt)}
                                           className="text-[10px] text-[#F15A24] hover:underline font-bold cursor-pointer"
                                         >
                                           + Quản lý file / Upload
                                         </button>
                                       </div>

                                       <div className="flex items-center gap-2 flex-wrap">
                                         {evt.conclusionDocUrl && !evt.attachments?.some(a => a.url === evt.conclusionDocUrl) && (
                                           <a
                                             href={evt.conclusionDocUrl}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 hover:border-[#F15A24] transition shadow-2xs"
                                           >
                                             <FileText className="w-3.5 h-3.5 text-slate-400" />
                                             <span className="truncate max-w-[160px]">Link Tài Liệu ↗</span>
                                           </a>
                                         )}

                                         {evt.attachments?.map((att) => (
                                           <div key={att.id} className="relative group/att">
                                             {att.type === 'image' ? (
                                               <div
                                                 onClick={() => setPreviewImageModal({ url: att.url, name: att.name })}
                                                 className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#F15A24] rounded-xl cursor-pointer transition shadow-2xs"
                                                 title="Click để xem ảnh phóng to"
                                               >
                                                 <img src={att.url} alt={att.name} className="w-5 h-5 object-cover rounded border border-slate-200 dark:border-slate-700" />
                                                 <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">{att.name}</span>
                                                 <Eye className="w-3 h-3 text-slate-400" />
                                               </div>
                                             ) : att.type === 'url' ? (
                                               <a
                                                 href={att.url}
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-[#F15A24] transition shadow-2xs"
                                               >
                                                 <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                                 <span className="truncate max-w-[140px]">{att.name}</span>
                                               </a>
                                             ) : (
                                               <a
                                                 href={att.url}
                                                 download={att.name}
                                                 className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-[#F15A24] transition shadow-2xs"
                                                 title={`Tải xuống ${att.name}`}
                                               >
                                                 <File className="w-3.5 h-3.5 text-slate-400" />
                                                 <span className="truncate max-w-[130px]">{att.name}</span>
                                                 {att.size && <span className="text-[9px] text-slate-400">({att.size})</span>}
                                                 <Download className="w-3 h-3 text-slate-400" />
                                               </a>
                                             )}
                                           </div>
                                         ))}
                                       </div>
                                     </div>
                                   )}

                                   {/* HÀNG 5: GHI CHÚ & NÚT THAO TÁC (CHÂN THẺ SẠCH SẼ) */}
                                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-2.5 border-t border-slate-100 dark:border-slate-800">
                                     <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                       <span className={`${headerLabelClass} font-bold text-xs flex-shrink-0`}>Ghi chú:</span>
                                       <span className="text-xs font-medium italic text-slate-600 dark:text-slate-400 truncate">
                                         {evt.notes || 'Không có ghi chú thêm.'}
                                       </span>
                                     </div>

                                     <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                                       <button
                                         type="button"
                                         onClick={() => setActiveAttachmentEvent(evt)}
                                         className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#0284C7] hover:text-[#0284C7] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                                         title="Tải lên và Quản lý Tài liệu trao đổi (Ảnh & File)"
                                       >
                                         <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                                         <span>Tài liệu trao đổi</span>
                                         {evt.attachments && evt.attachments.length > 0 && (
                                           <span className="px-1.5 py-0.2 bg-[#0284C7] text-white text-[9px] rounded-md font-bold ml-0.5">
                                             {evt.attachments.length}
                                           </span>
                                         )}
                                       </button>

                                       <button
                                         type="button"
                                         onClick={() => handleMoveToTrash(evt)}
                                         className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition cursor-pointer shadow-2xs"
                                         title="Xóa cuộc họp"
                                       >
                                         <Trash2 className="w-3.5 h-3.5" />
                                       </button>
                                     </div>
                                   </div>

                                 </div>

                               </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}

              </div>
            )}

            {/* ========================================================================= */}
            {/* 🌟 VIEW MODE 3: MONTH MATRIX GRID (HIỂN THỊ KHI CLICK NÚT LƯỚI) */}
            {/* ========================================================================= */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3.5 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0077B6]"></span>
                    <span>CHẾ ĐỘ M: LỊCH TRAO ĐỔI THÁNG {selectedMonthOnly} / {selectedYear}</span>
                  </h2>
                  <span className="px-3 py-1 bg-[#003854] dark:bg-[#003854] text-[#00E5FF] dark:text-[#00E5FF] font-black rounded-md text-[11px] border border-cyan-300/50 shadow-inner">
                    TỔNG {filteredEvents.length} CUỘC TRAO ĐỔI TRONG THÁNG
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
                  <div>THỨ 2</div>
                  <div>THỨ 3</div>
                  <div>THỨ 4</div>
                  <div>THỨ 5</div>
                  <div>THỨ 6</div>
                  <div className="text-[#0077B6]">THỨ 7</div>
                  <div className="text-rose-500">CHỦ NHẬT</div>
                </div>

                <div className="grid grid-cols-7 gap-1 min-h-[380px]">
                  {monthDaysGrid.map((cell, idx) => {
                    if (!cell.isCurrentMonth) {
                      return (
                        <div key={idx} className="bg-slate-50/40 dark:bg-slate-900/20 rounded-md p-1 min-h-[75px] opacity-20 border border-transparent" />
                      );
                    }

                    const dayEvts = eventsByDateMap[cell.dateStr!] || [];
                    const isToday = cell.dateStr === '30/08/2026';
                    const isSelected = cell.dateStr === currentDateStr;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setCurrentDateStr(cell.dateStr!);
                          setViewMode('day');
                        }}
                        className={`rounded-md p-1.5 min-h-[80px] border transition-all cursor-pointer flex flex-col justify-between ${
                          isToday
                            ? 'bg-sky-50/60 dark:bg-sky-950/40 border-[#0077B6]'
                            : isSelected
                              ? 'bg-slate-100 dark:bg-slate-800/80 border-slate-400'
                              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-400 hover:bg-slate-50/80'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className={`w-5 h-5 rounded-md font-black text-[10px] flex items-center justify-center ${
                            isToday
                              ? 'bg-rose-500 text-white'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}>
                            {cell.dayNum}
                          </span>

                          {dayEvts.length > 0 && (
                            <span className="text-[8px] font-bold text-slate-400">
                              {dayEvts.length} lịch
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5 mt-1 flex-1 flex flex-col justify-start">
                          {dayEvts.slice(0, 3).map(evt => {
                            return (
                              <div
                                key={evt.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEventDetail(evt);
                                }}
                                className="px-1 py-0.5 rounded bg-slate-100/90 dark:bg-slate-800 text-[9px] text-slate-800 dark:text-slate-200 truncate border border-slate-200/60 dark:border-slate-700/60 font-medium"
                                title={evt.title}
                              >
                                {evt.title}
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* 🌟 VIEW MODE 3: FULL SPREADSHEET TABLE VIEW */}
            {/* ========================================================================= */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                        <th className="p-2.5 text-center w-10">STT</th>
                        <th className="p-2.5">Phạm Vi</th>
                        <th className="p-2.5">Thứ & Ngày</th>
                        <th className="p-2.5">Giờ Dự Kiến</th>
                        <th className="p-2.5">Nội Dung / Chủ Đề Cuộc Họp</th>
                        <th className="p-2.5">Pháp Nhân</th>
                        <th className="p-2.5">Thành Phần Tham Dự</th>
                        <th className="p-2.5">Thư Ký</th>
                        <th className="p-2.5">Trạng Thái Thực Tế (VN GMT+7)</th>
                        <th className="p-2.5 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {filteredEvents.map((evt, idx) => {
                        const stInfo = getStatusInfo(evt, vnNow);
                        return (
                          <tr key={evt.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-2.5 text-center font-bold text-slate-500">{evt.stt || idx + 1}</td>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">{evt.scope || 'P1'}</td>
                            <td className="p-2.5 whitespace-nowrap">
                              <span className="font-bold text-slate-900 dark:text-white">{evt.dayOfWeek}</span>
                              <div className="text-[10px] text-slate-500">{evt.date}</div>
                            </td>
                            <td className="p-2.5 whitespace-nowrap font-medium">
                              {evt.plannedStartTime} - {evt.plannedEndTime}
                            </td>
                            <td className="p-2.5 font-bold text-slate-800 dark:text-slate-100 max-w-xs">
                              {evt.title}
                            </td>
                            <td className="p-2.5 font-extrabold text-slate-700 dark:text-slate-300">{evt.legalEntity || 'DH'}</td>
                            <td className="p-2.5 max-w-xs text-slate-600 dark:text-slate-300">{evt.attendees}</td>
                            <td className="p-2.5 text-slate-600 dark:text-slate-300">{evt.secretary}</td>
                            <td className="p-2.5 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${stInfo.pillBg}`}>
                                {stInfo.label}
                              </span>
                            </td>
                            <td className="p-2.5 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => setEditingEvent({ ...evt })}
                                  className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 font-bold text-[10px] hover:bg-slate-200 rounded"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() => handleMoveToTrash(evt)}
                                  className="px-1.5 py-0.5 bg-rose-50 text-rose-700 font-bold text-[10px] hover:bg-rose-100 rounded"
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </main>

        {/* ========================================================================= */}
        {/* 📢 PHẦN 4 (COL 4 - 25% WIDTH): GHI CHÚ & BẢNG TIN 24/7 (THIẾT KẾ MÀU TRẮNG SÁNG MODERN LIGHT) */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 📢 PHẦN 4 (COL 4 - 25% WIDTH): GHI CHÚ & BẢNG TIN 24/7 */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-1 w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 text-slate-800 dark:text-slate-200 scrollbar-thin flex flex-col justify-between overflow-y-auto shadow-sm hover:border-[#F15A24]/40 transition-all space-y-3">
          
          {/* Header Section */}
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2 flex-shrink-0">
            <div className="text-[#F15A24] font-black text-xs uppercase tracking-wider flex items-center gap-2">
              <span>GHI CHÚ & BẢNG TIN 24/7</span>
            </div>
            <span className="px-2.5 py-0.5 bg-[#F15A24]/10 text-[#F15A24] text-[10px] font-extrabold rounded-xl border border-[#F15A24]/30">
              PHẦN 4
            </span>
          </div>

          {/* CARD 1: GHI CHÚ NHANH ĐIỀU HÀNH */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 p-3 rounded-2xl space-y-2 shadow-xs my-1 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Ghi Chú Nhanh Công Việc</span>
              <span className="text-slate-400 text-[9px] font-bold">Tự động lưu</span>
            </div>

            <textarea
              rows={4}
              value={promoNote}
              onChange={(e) => setPromoNote(e.target.value)}
              placeholder="Nhập ghi chú điều hành, việc cần xử lý gấp..."
              className="w-full h-full min-h-[75px] p-2.5 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#F15A24]/40 focus:border-[#F15A24] shadow-xs transition"
            />
          </div>

          {/* CARD 2: ĐẦU MỐI LIÊN HỆ THƯ KÝ & IT */}
          <div className="bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 p-3 rounded-2xl space-y-1.5 shadow-xs flex-shrink-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#F15A24]">
              Đầu Mối Hỗ Trợ Họp
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-1">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Thư ký tổng:</span>
                <strong className="font-extrabold text-slate-900 dark:text-white">#K2B (Bà Trang)</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-1">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Điều hành:</span>
                <strong className="font-extrabold text-slate-900 dark:text-white">Ông Trịnh / Kiên</strong>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Hotline IT 24/7:</span>
                <strong className="font-black text-[#F15A24] text-xs">1900-AVG-ONE</strong>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* MODAL: XEM CHI TIẾT CUỘC HỌP */}
      {selectedEventDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-lg space-y-3">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${getStatusInfo(selectedEventDetail, vnNow).pillBg} inline-flex items-center gap-1.5`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span>{getStatusInfo(selectedEventDetail, vnNow).label}</span>
              </span>
              <button onClick={() => setSelectedEventDetail(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-2 rounded-lg font-semibold">
                <div>
                  <span>Bắt đầu từ: <strong className="font-extrabold text-slate-900 dark:text-white">{selectedEventDetail.plannedStartTime || '08:30'}</strong></span>
                  <span className="mx-2 text-slate-300">|</span>
                  <span>Thời lượng: <strong className="font-extrabold text-slate-900 dark:text-white">{calculateDurationMinutesStr(selectedEventDetail.plannedStartTime, selectedEventDetail.plannedEndTime)} phút</strong></span>
                </div>
              </div>

              <div className="pt-0.5 space-y-0.5">
                <span className="text-slate-500 font-bold block">Nội dung / Chủ đề:</span>
                <span className="text-sm font-black text-slate-900 dark:text-white leading-snug">{selectedEventDetail.title}</span>
              </div>

              <div className="flex items-center gap-3 pt-0.5">
                <span>Phạm vi: <strong className="font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{selectedEventDetail.scope || 'P1'}</strong></span>
                <span className="text-slate-300">|</span>
                <span>Pháp nhân: <strong className="font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{selectedEventDetail.legalEntity || 'DH'}</strong></span>
                {selectedEventDetail.secretary && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span>Thư ký: <strong className="font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{selectedEventDetail.secretary}</strong></span>
                  </>
                )}
              </div>

              <div className="pt-0.5 space-y-0.5">
                <span className="text-slate-500 font-bold block">Thành phần:</span>
                <div className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line pl-0.5">{selectedEventDetail.attendees || 'AV; AVG'}</div>
              </div>

              <div className="pt-0.5">
                <span className="text-slate-500 font-bold block mb-0.5">Ghi chú:</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{selectedEventDetail.notes || 'Không có ghi chú thêm.'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingEvent({ ...selectedEventDetail });
                    setSelectedEventDetail(null);
                  }}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold text-xs rounded-lg"
                >
                  ✏️ Chỉnh sửa
                </button>
                <button
                  onClick={() => handleMoveToTrash(selectedEventDetail)}
                  className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs rounded-lg"
                >
                  🗑️ Xóa
                </button>
              </div>

              {selectedEventDetail.conclusionDocUrl && (
                <a
                  href={selectedEventDetail.conclusionDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#0077B6] text-white font-bold text-xs rounded-lg flex items-center gap-1"
                >
                  Mở Văn Bản Kết Luận ↗
                </a>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL: THÊM LỊCH TRAO ĐỔI MỚI */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-lg space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Thêm Lịch Trao Đổi Cuộc Họp Mới
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NỘI DUNG / CHỦ ĐỀ CUỘC HỌP (*)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Việc trọng điểm T9 AV: chưa phải chủ tài sản mà mang đi bán..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/40 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Thứ trong tuần</label>
                  <select
                    value={newDayOfWeek}
                    onChange={(e) => setNewDayOfWeek(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  >
                    <option value="THỨ HAI">THỨ HAI</option>
                    <option value="THỨ BA">THỨ BA</option>
                    <option value="THỨ TƯ">THỨ TƯ</option>
                    <option value="THỨ NĂM">THỨ NĂM</option>
                    <option value="THỨ SÁU">THỨ SÁU</option>
                    <option value="THỨ BẢY">THỨ BẢY</option>
                    <option value="CHỦ NHẬT">CHỦ NHẬT</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ngày (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pháp nhân</label>
                  <select
                    value={newLegalEntity}
                    onChange={(e) => setNewLegalEntity(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  >
                    <option value="AVG">AVG</option>
                    <option value="DH">DH (Âu Việt Global)</option>
                    <option value="AV">AV (Âu Việt)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ bắt đầu dự kiến</label>
                  <input
                    type="text"
                    value={newPlannedStart}
                    onChange={(e) => setNewPlannedStart(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ kết thúc dự kiến</label>
                  <input
                    type="text"
                    value={newPlannedEnd}
                    onChange={(e) => setNewPlannedEnd(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Thành phần tham dự</label>
                <textarea
                  rows={2}
                  value={newAttendees}
                  onChange={(e) => setNewAttendees(e.target.value)}
                  placeholder="Ví dụ: 1. Các đầu mối AVG...\n2. AV: Bà Trang..."
                  className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ghi chú cuộc họp</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Nội dung tóm tắt hoặc chuẩn bị tài liệu..."
                  className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#F15A24] hover:bg-[#ea580c] text-white font-bold rounded-lg"
                >
                  📢 Ban Hành & Đồng Bộ Sheet
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL: CHỈNH SỬA CUỘC HỌP */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Chỉnh Sửa Thông Tin Cuộc Họp
              </h3>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-3 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NỘI DUNG / CHỦ ĐỀ CUỘC HỌP (*)
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/40 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Thứ trong tuần</label>
                  <input
                    type="text"
                    value={editingEvent.dayOfWeek || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, dayOfWeek: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ngày (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pháp nhân</label>
                  <select
                    value={editingEvent.legalEntity || 'DH'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, legalEntity: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  >
                    <option value="AVG">AVG</option>
                    <option value="DH">DH (Âu Việt Global)</option>
                    <option value="AV">AV (Âu Việt)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ bắt đầu dự kiến</label>
                  <input
                    type="text"
                    value={editingEvent.plannedStartTime || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, plannedStartTime: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ kết thúc dự kiến</label>
                  <input
                    type="text"
                    value={editingEvent.plannedEndTime || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, plannedEndTime: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ thực tế bắt đầu</label>
                  <input
                    type="text"
                    placeholder="HH:mm (Ví dụ: 08:35)"
                    value={editingEvent.actualStartTime || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, actualStartTime: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Giờ thực tế kết thúc</label>
                  <input
                    type="text"
                    placeholder="HH:mm (Ví dụ: 10:25)"
                    value={editingEvent.actualEndTime || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, actualEndTime: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phạm vi họp</label>
                  <select
                    value={editingEvent.scope || 'P1'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, scope: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  >
                    <option value="P1">Phạm vi P1</option>
                    <option value="P2">Phạm vi P2</option>
                    <option value="Toàn Hệ Thống">Toàn Hệ Thống</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Thư ký họp</label>
                  <input
                    type="text"
                    value={editingEvent.secretary || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, secretary: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Thành phần tham dự</label>
                <textarea
                  rows={2}
                  value={editingEvent.attendees || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, attendees: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Link Văn bản kết luận (Google Doc/Drive URL)</label>
                <input
                  type="text"
                  placeholder="https://docs.google.com/..."
                  value={editingEvent.conclusionDocUrl || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, conclusionDocUrl: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ghi chú cuộc họp</label>
                <textarea
                  rows={2}
                  value={editingEvent.notes || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, notes: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0077B6] hover:bg-[#005B85] text-white font-bold rounded-lg"
                >
                  💾 Lưu & Cập Nhật Google Sheet
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL: THÙNG RÁC (TRASH MANAGEMENT) */}
      {showTrashModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-xl space-y-4 max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🗑️ Thùng Rác Cuộc Họp</span>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full text-xs font-black">
                  {deletedEvents.length}
                </span>
              </h3>
              <button onClick={() => setShowTrashModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
              {deletedEvents.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-medium">Thùng rác trống. Chưa có cuộc họp nào bị xóa.</div>
              ) : (
                deletedEvents.map((evt) => (
                  <div key={evt.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{evt.title}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span>Ngày họp: {evt.date}</span>
                        <span>•</span>
                        <span>Đã xóa: {evt.deletedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleRestoreFromTrash(evt.id)}
                        className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-lg text-[11px]"
                      >
                        🔄 Khôi phục
                      </button>
                      <button
                        onClick={() => handlePurgeFromTrash(evt.id)}
                        className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg text-[11px]"
                      >
                        ❌ Xóa hẳn
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {deletedEvents.length > 0 && (
                <button
                  onClick={() => {
                    emptyTrashDiscussionEvents();
                    setDeletedEvents([]);
                    showToast('🧹 Đã dọn sạch thùng rác!');
                  }}
                  className="text-rose-600 hover:text-rose-800 font-bold text-xs"
                >
                  Dọn sạch thùng rác
                </button>
              )}
              <button
                onClick={() => setShowTrashModal(false)}
                className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-lg text-xs ml-auto"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: CAI DAT WEBHOOK GOOGLE SHEET 24/7 */}
      {showWebhookModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-lg space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>⚙️ Cấu Hình Google Apps Script Webhook 24/7</span>
              </h3>
              <button onClick={() => setShowWebhookModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Dán đường dẫn Webhook URL từ Google Apps Script (Deploy as Web App với quyền <em>Anyone</em>) để kích hoạt đồng bộ 2 chiều tức thì về file Google Sheet.
              </p>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Google Apps Script Webhook URL:
                </label>
                <input
                  type="text"
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="p-3 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 rounded-xl space-y-1 text-[11px] text-sky-900 dark:text-sky-200">
                <div className="font-bold">📌 File Google Sheet đang kết nối:</div>
                <a href={GOOGLE_SHEET_EDIT_URL} target="_blank" rel="noopener noreferrer" className="underline text-[#0077B6] font-bold block truncate">
                  {GOOGLE_SHEET_EDIT_URL}
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowWebhookModal(false)}
                className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveWebhook}
                className="px-4 py-1.5 bg-[#0077B6] hover:bg-[#005B85] text-white font-bold rounded-lg"
              >
                💾 Lưu Cấu Hình
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: UPLOAD & QUẢN LÝ TÀI LIỆU TRAO ĐỔI (FILE & ẢNH) */}
      {activeAttachmentEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-xl text-slate-900 dark:text-white space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0077B6] dark:text-sky-400 flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wide">
                    Tài Liệu Trao Đổi & Tệp Đính Kèm
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-sm">
                    {activeAttachmentEvent.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveAttachmentEvent(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center text-sm font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* DRAG & DROP FILE UPLOAD AREA */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase text-[#0077B6] dark:text-sky-400 tracking-wider">
                1. Tải lên tệp từ máy tính (Hình ảnh PNG/JPG, File PDF, Word, Excel, ZIP...)
              </label>
              
              <input
                type="file"
                id="active-event-file-input"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
                onChange={(e) => handleFileUpload(e, activeAttachmentEvent)}
                className="hidden"
              />

              <label
                htmlFor="active-event-file-input"
                className="w-full border-2 border-dashed border-sky-300 dark:border-sky-700 hover:border-[#0077B6] dark:hover:border-sky-500 bg-sky-50/50 hover:bg-sky-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0077B6] dark:text-sky-400 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-[#0077B6] dark:text-sky-400" />
                </div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                  Nhấp vào đây hoặc kéo thả file để chọn <span className="text-[#0077B6] dark:text-sky-400">Ảnh & File Tài liệu</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Hỗ trợ hình ảnh (PNG, JPG, WebP), tài liệu PDF, DOCX, XLSX, TXT, ZIP...
                </div>
              </label>
            </div>

            {/* OR ADD DIRECT URL LINK */}
            <form onSubmit={(e) => handleAddUrlDocument(e, activeAttachmentEvent)} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-extrabold uppercase text-[#0077B6] dark:text-sky-400 tracking-wider">
                2. Thêm Liên kết Tài liệu (Google Docs, Drive link, Web URL)
              </label>

              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="Dán đường link tài liệu: https://docs.google.com/..."
                  value={newDocUrl}
                  onChange={(e) => setNewDocUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
                <input
                  type="text"
                  placeholder="Tên tài liệu (tùy chọn)"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-1/3 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#0077B6] hover:bg-[#005B85] text-white font-extrabold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer flex-shrink-0 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm Link
                </button>
              </div>
            </form>

            {/* UPLOADED ATTACHMENTS LIST & PREVIEW GALLERY */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#0077B6] dark:text-sky-400 uppercase tracking-wider">
                <span>Danh Sách File & Ảnh Đã Tải Lên ({activeAttachmentEvent.attachments?.length || 0})</span>
              </div>

              {(!activeAttachmentEvent.attachments || activeAttachmentEvent.attachments.length === 0) ? (
                <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-medium">
                  Chưa có file tài liệu hoặc hình ảnh nào được tải lên cho cuộc họp này.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                  {activeAttachmentEvent.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 flex items-center justify-between gap-2 hover:border-sky-400 dark:hover:border-sky-500 transition group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {att.type === 'image' ? (
                          <div
                            onClick={() => setPreviewImageModal({ url: att.url, name: att.name })}
                            className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 cursor-pointer relative group/img"
                          >
                            <img src={att.url} alt={att.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-white">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0077B6] dark:text-sky-400 flex-shrink-0">
                            {att.type === 'url' ? <ExternalLink className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title={att.name}>
                            {att.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            {att.size && <span>{att.size}</span>}
                            {att.uploadedAt && <span>• {att.uploadedAt}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {att.type === 'image' && (
                          <button
                            type="button"
                            onClick={() => setPreviewImageModal({ url: att.url, name: att.name })}
                            className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-[#0077B6] text-slate-600 dark:text-slate-300 hover:text-white transition cursor-pointer"
                            title="Xem ảnh phóng to"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {att.type === 'url' ? (
                          <a
                            href={att.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-[#0077B6] text-slate-600 dark:text-slate-300 hover:text-white transition"
                            title="Mở đường link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <a
                            href={att.url}
                            download={att.name}
                            className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-[#0077B6] text-slate-600 dark:text-slate-300 hover:text-white transition"
                            title="Tải xuống tệp"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(activeAttachmentEvent, att.id)}
                          className="p-1 rounded bg-rose-100 dark:bg-rose-950/80 hover:bg-rose-600 text-rose-700 dark:text-rose-300 hover:text-white transition cursor-pointer"
                          title="Xóa tệp"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setActiveAttachmentEvent(null)}
                className="px-4 py-2 bg-[#0077B6] hover:bg-[#005B85] text-white font-extrabold text-xs rounded-lg transition shadow-md cursor-pointer"
              >
                Hoàn Tất & Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: LIGHTBOX XEM ẢNH TO */}
      {previewImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center gap-3">
            <div className="flex items-center justify-between w-full text-white text-xs font-bold px-2">
              <span className="truncate max-w-md">{previewImageModal.name}</span>
              <div className="flex items-center gap-3">
                <a
                  href={previewImageModal.url}
                  download={previewImageModal.name}
                  className="px-3 py-1 bg-[#0077B6] hover:bg-[#005B85] text-white rounded-md text-xs font-bold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Tải về
                </a>
                <button
                  onClick={() => setPreviewImageModal(null)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-bold cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>
            </div>
            <img
              src={previewImageModal.url}
              alt={previewImageModal.name}
              className="max-w-full max-h-[80vh] object-contain rounded-xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
