import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageSquare, Search, Paperclip, Pin, Users, User,
  FileText, Image as ImageIcon, Reply, Trash2,
  PanelRightClose, PanelRightOpen, Bell, Video, Smile,
  UserPlus, CheckCheck, Cloud, Contact, Calendar, CheckSquare,
  ChevronDown, ChevronRight, Link2, ThumbsUp, CornerUpRight,
  MoreHorizontal, Check, AtSign, FolderOpen, Phone
} from 'lucide-react';

export interface ChatMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  hub: string;
  avatarBg: string;
  isOnline: boolean;
  email?: string;
  phone?: string;
}

export interface ChatReaction {
  emoji: string;
  count: number;
  reactedByMe: boolean;
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: 'file' | 'image' | 'order' | 'schedule' | 'contact' | 'task';
  size?: string;
  url?: string;
  code?: string;
  subText?: string;
  assignee?: string;
  dueDate?: string;
  completed?: boolean;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  senderRole: string;
  senderHub: string;
  senderAvatarBg: string;
  content: string;
  timestamp: string;
  dateStr: string;
  isMe?: boolean;
  isPinned?: boolean;
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  attachments?: ChatAttachment[];
  reactions?: ChatReaction[];
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'direct' | 'cloud';
  category: 'executive' | 'cluster51' | 'clusterK' | 'rd_legal' | 'direct';
  hubCode: string;
  tagColor: string;
  description: string;
  avatarBg: string;
  initials: string;
  isPinned?: boolean;
  isMuted?: boolean;
  unreadCount: number;
  memberIds: string[];
  directPartnerId?: string;
}

export const AVG_CHAT_STAFF: ChatMember[] = [
  {
    id: 'staff-trang',
    name: 'Bà Trang (#K2B)',
    initials: 'BT',
    role: 'Thư Ký Tổng & Điều Phối #K2B',
    hub: 'CỤM #K',
    avatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
    isOnline: true,
    email: 'trang.k2b@auvietglobal.com',
    phone: '0901 888 222'
  },
  {
    id: 'staff-trinh',
    name: 'Ông Trịnh',
    initials: 'OT',
    role: 'Ban Điều Hành Tập Đoàn',
    hub: 'ĐIỀU HÀNH',
    avatarBg: 'linear-gradient(135deg, #0068FF, #0052CC)',
    isOnline: true,
    email: 'trinh.dh@auvietglobal.com',
    phone: '0901 666 888'
  },
  {
    id: 'staff-kien',
    name: 'Kiên (Điều Hành)',
    initials: 'K',
    role: 'Điều Hành & Thư Ký Tổng Kết',
    hub: 'ĐIỀU HÀNH',
    avatarBg: 'linear-gradient(135deg, #00A8E8, #0284C7)',
    isOnline: true,
    email: 'kien.dh@auvietglobal.com',
    phone: '0902 345 678'
  },
  {
    id: 'staff-huy',
    name: 'Ông Vũ Quốc Huy',
    initials: 'QH',
    role: 'Cố Vấn Pháp Lý & Sản Xuất 2.1',
    hub: '6 - PHÁP LÝ',
    avatarBg: 'linear-gradient(135deg, #f97316, #ea580c)',
    isOnline: true,
    email: 'huy.vq@auvietglobal.com',
    phone: '0945 678 901'
  },
  {
    id: 'staff-thanh',
    name: 'Ông Thành',
    initials: 'TH',
    role: 'Hội Đồng Con Người & Nhân Sự',
    hub: 'NHÂN SỰ',
    avatarBg: 'linear-gradient(135deg, #10b981, #059669)',
    isOnline: true,
    email: 'thanh.hd@auvietglobal.com',
    phone: '0918 222 333'
  },
  {
    id: 'staff-tam',
    name: 'Lê Trần Thiện Tâm',
    initials: 'TT',
    role: 'Chuyên Viên Đầu Mối 5.1T',
    hub: '5.1T',
    avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    isOnline: true,
    email: 'cambridgeorg.209@gmail.com',
    phone: '0354 126 398'
  },
  {
    id: 'staff-han',
    name: 'Đinh Hoàng Ngọc Hân',
    initials: 'NH',
    role: 'Thư Ký & Đầu Mối 5.1B / 2.2',
    hub: '5.1B',
    avatarBg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    isOnline: true,
    email: 'trolitct@gmail.com',
    phone: '0869 413 365'
  },
  {
    id: 'staff-nguyet',
    name: 'Nguyệt (Thư Ký CĐT)',
    initials: 'NG',
    role: 'Thư Ký Chủ Đầu Tư & Tổng Hợp',
    hub: 'CĐT',
    avatarBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    isOnline: true,
    email: 'nguyet.cdt@auvietglobal.com',
    phone: '0978 555 111'
  },
  {
    id: 'staff-tuan',
    name: 'Phạm Minh Tuấn',
    initials: 'MT',
    role: 'Chuyên Viên Thiết Kế CAD 3D',
    hub: '3.2 - THIẾT KẾ',
    avatarBg: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    isOnline: false,
    email: 'tuan.pm@auvietglobal.com',
    phone: '0934 567 890'
  },
  {
    id: 'staff-nam',
    name: 'Bùi Hoàng Nam',
    initials: 'HN',
    role: 'Kỹ Sư Kiểm Định QC & RDI',
    hub: '3.1 - RDI',
    avatarBg: 'linear-gradient(135deg, #64748b, #475569)',
    isOnline: true,
    email: 'nam.bh@auvietglobal.com',
    phone: '0956 789 012'
  },
  {
    id: 'staff-thuytrang',
    name: 'Đỗ Thùy Trang',
    initials: 'ĐT',
    role: 'Trợ Lý Điều Phối RDI Center',
    hub: '3.1 - RDI',
    avatarBg: 'linear-gradient(135deg, #a855f7, #9333ea)',
    isOnline: false,
    email: 'trang.dt@auvietglobal.com',
    phone: '0967 890 123'
  }
];

const INITIAL_ROOMS: ChatRoom[] = [
  {
    id: 'room-cloud',
    name: 'Cloud của tôi',
    type: 'cloud',
    category: 'executive',
    hubCode: 'Lưu trữ cá nhân',
    tagColor: '#0068FF',
    description: 'Lưu trữ và đồng bộ nhanh tài liệu, biên bản VBKL, hình ảnh và ghi chú cá nhân.',
    avatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
    initials: '☁️',
    isPinned: true,
    unreadCount: 0,
    memberIds: ['staff-trang']
  },
  {
    id: 'room-executive',
    name: 'Ban Điều Hành & Các Đầu Mối AVG',
    type: 'group',
    category: 'executive',
    hubCode: 'Điều hành',
    tagColor: '#F15A24',
    description: 'Kênh điều hành chung, tổng kết công việc thường ngày lúc 16:00 và ban hành VBKL.',
    avatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
    initials: 'ĐH',
    isPinned: true,
    unreadCount: 2,
    memberIds: AVG_CHAT_STAFF.map((s) => s.id)
  },
  {
    id: 'room-cluster-51',
    name: 'Cụm 5.1 – Đầu Vào 5.1B & Đầu Ra 5.1T',
    type: 'group',
    category: 'cluster51',
    hubCode: 'Cụm 5.1',
    tagColor: '#0068FF',
    description: 'Phối hợp tiếp nhận yêu cầu đầu vào (5.1B) và kiểm soát bàn giao đầu ra (5.1T).',
    avatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
    initials: '5.1',
    isPinned: true,
    unreadCount: 1,
    memberIds: ['staff-trang', 'staff-kien', 'staff-tam', 'staff-han', 'staff-trinh']
  },
  {
    id: 'room-cluster-k',
    name: 'Cụm #K – 5 Đầu Mối Thực Thi (#K2B)',
    type: 'group',
    category: 'clusterK',
    hubCode: 'Cụm #K',
    tagColor: '#0284C7',
    description: 'Nhóm tác nghiệp trực tiếp của 5 đầu mối Cụm #K và văn phòng Bà Trang.',
    avatarBg: 'linear-gradient(135deg, #0369a1, #0284C7)',
    initials: '#K',
    isPinned: false,
    unreadCount: 0,
    memberIds: ['staff-trang', 'staff-trinh', 'staff-kien', 'staff-nguyet', 'staff-han']
  },
  {
    id: 'room-rdi-31',
    name: '3.1 & 3.2 – Nghiên Cứu R&D & Thiết Kế',
    type: 'group',
    category: 'rd_legal',
    hubCode: 'R&D • 3.1/3.2',
    tagColor: '#7C3AED',
    description: 'Trao đổi hồ sơ kỹ thuật, bản vẽ CAD 3D, mẫu H1 và thử nghiệm bo mạch.',
    avatarBg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    initials: 'RD',
    isPinned: false,
    unreadCount: 0,
    memberIds: ['staff-tuan', 'staff-nam', 'staff-thuytrang', 'staff-kien', 'staff-huy']
  },
  {
    id: 'room-legal-6',
    name: '6 – Pháp Lý, Hợp Đồng & SHTT',
    type: 'group',
    category: 'rd_legal',
    hubCode: '6 - Pháp lý',
    tagColor: '#059669',
    description: 'Rà soát hồ sơ pháp lý dự án, đăng ký nhãn hiệu/SHTT và hợp đồng gia công.',
    avatarBg: 'linear-gradient(135deg, #059669, #10b981)',
    initials: 'PL',
    isPinned: false,
    unreadCount: 0,
    memberIds: ['staff-huy', 'staff-trang', 'staff-trinh', 'staff-thanh']
  },
  {
    id: 'dm-staff-trang',
    name: 'Bà Trang (#K2B)',
    type: 'direct',
    category: 'direct',
    hubCode: 'Cụm #K',
    tagColor: '#F15A24',
    description: 'Thư Ký Tổng & Điều Phối #K2B',
    avatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
    initials: 'BT',
    unreadCount: 0,
    memberIds: ['staff-trang'],
    directPartnerId: 'staff-trang'
  },
  {
    id: 'dm-staff-kien',
    name: 'Kiên (Điều Hành)',
    type: 'direct',
    category: 'direct',
    hubCode: 'Điều hành',
    tagColor: '#0068FF',
    description: 'Điều Hành & Thư Ký Tổng Kết',
    avatarBg: 'linear-gradient(135deg, #00A8E8, #0284C7)',
    initials: 'K',
    unreadCount: 0,
    memberIds: ['staff-kien'],
    directPartnerId: 'staff-kien'
  },
  {
    id: 'dm-staff-huy',
    name: 'Ông Vũ Quốc Huy',
    type: 'direct',
    category: 'direct',
    hubCode: '6 - Pháp lý',
    tagColor: '#059669',
    description: 'Cố Vấn Pháp Lý & Sản Xuất',
    avatarBg: 'linear-gradient(135deg, #f97316, #ea580c)',
    initials: 'QH',
    unreadCount: 0,
    memberIds: ['staff-huy'],
    directPartnerId: 'staff-huy'
  },
  {
    id: 'dm-staff-han',
    name: 'Đinh Hoàng Ngọc Hân',
    type: 'direct',
    category: 'direct',
    hubCode: '5.1B',
    tagColor: '#EC4899',
    description: 'Thư Ký & Đầu Mối 5.1B / 2.2',
    avatarBg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    initials: 'NH',
    unreadCount: 0,
    memberIds: ['staff-han'],
    directPartnerId: 'staff-han'
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'room-cloud': [
    {
      id: 'msg-cloud-1',
      roomId: 'room-cloud',
      senderId: 'me',
      senderName: 'Cloud của tôi',
      senderInitials: '☁️',
      senderRole: 'Lưu trữ cá nhân',
      senderHub: 'CLOUD',
      senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      content: 'Ghi chú cá nhân: Rà soát tiến độ 66 cuộc trao đổi trên Sheet LỊCH TRAO ĐỔI 24/7 và tổng hợp báo cáo tuần.',
      timestamp: '08:30',
      dateStr: '25/11/2026',
      isMe: true,
      isPinned: true,
      attachments: [
        {
          id: 'att-cloud-doc',
          name: 'Bao_Cao_Tien_Do_Cum5_T11_2026.xlsx',
          type: 'file',
          size: '845 KB'
        }
      ]
    }
  ],
  'room-executive': [
    {
      id: 'msg-1',
      roomId: 'room-executive',
      senderId: 'staff-trang',
      senderName: 'Bà Trang (#K2B)',
      senderInitials: 'BT',
      senderRole: 'Thư Ký Tổng',
      senderHub: 'CỤM #K',
      senderAvatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
      content: 'Đề nghị các đầu mối AVG chuẩn bị đầy đủ số liệu để 16:00 chiều nay họp Tổng kết công việc thường ngày tại P1 (Ông Huy tham gia online).',
      timestamp: '14:15',
      dateStr: '25/11/2026',
      isPinned: true,
      attachments: [
        {
          id: 'att-sch-66',
          name: 'Lịch #66: Tổng kết công việc thường ngày (16:00 – 17:00)',
          type: 'schedule',
          code: 'CAL-66',
          subText: 'Thứ 4, 25/11/2026 • Phạm vi: P1 • Điều hành: Kiên'
        }
      ],
      reactions: [
        { emoji: '✅', count: 6, reactedByMe: true },
        { emoji: '👍', count: 4, reactedByMe: false }
      ]
    },
    {
      id: 'msg-2',
      roomId: 'room-executive',
      senderId: 'staff-huy',
      senderName: 'Ông Vũ Quốc Huy',
      senderInitials: 'QH',
      senderRole: 'Cố Vấn Pháp Lý',
      senderHub: '6 - PHÁP LÝ',
      senderAvatarBg: 'linear-gradient(135deg, #f97316, #ea580c)',
      content: 'Tôi đã nhận lịch. Hồ sơ pháp lý hợp đồng gia công và biên bản đối tác Trà của anh Tuấn đã rà soát xong, chiều nay tôi báo cáo trực tuyến lúc 16:00.',
      timestamp: '14:28',
      dateStr: '25/11/2026',
      reactions: [{ emoji: '👍', count: 3, reactedByMe: false }]
    },
    {
      id: 'msg-3',
      roomId: 'room-executive',
      senderId: 'staff-kien',
      senderName: 'Kiên (Điều Hành)',
      senderInitials: 'K',
      senderRole: 'Điều Hành',
      senderHub: 'ĐIỀU HÀNH',
      senderAvatarBg: 'linear-gradient(135deg, #00A8E8, #0284C7)',
      content: 'Đã cập nhật biên bản VBKL các cuộc họp ngày 20/11 – 23/11 lên Sheet 24/7. Các đầu mối Cụm 5 và 5.1B hoàn thành đối chiếu trước 15:45 nhé.',
      timestamp: '14:45',
      dateStr: '25/11/2026',
      attachments: [
        {
          id: 'att-task-1',
          name: 'Hoàn thiện báo cáo tổng kết ngày 25/11 trước 15:45',
          type: 'task',
          assignee: 'Các đầu mối AVG & Cụm 5',
          dueDate: '15:45 • 25/11/2026',
          completed: false
        }
      ],
      reactions: [{ emoji: '❤️', count: 5, reactedByMe: true }]
    },
    {
      id: 'msg-4',
      roomId: 'room-executive',
      senderId: 'me',
      senderName: 'Ban Điều Hành AVG',
      senderInitials: 'AVG',
      senderRole: 'Điều Hành Hệ Thống',
      senderHub: 'AVG ONE',
      senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      content: 'Đã đồng bộ toàn bộ 66 lịch trao đổi và hồ sơ VBKL lên hệ thống AVG ONE. Hẹn các đầu mối đúng 16:00 tại P1.',
      timestamp: '15:05',
      dateStr: '25/11/2026',
      isMe: true,
      reactions: [{ emoji: '👍', count: 4, reactedByMe: false }]
    }
  ],
  'room-cluster-51': [
    {
      id: 'msg-51-1',
      roomId: 'room-cluster-51',
      senderId: 'staff-han',
      senderName: 'Đinh Hoàng Ngọc Hân',
      senderInitials: 'NH',
      senderRole: 'Đầu Mối 5.1B',
      senderHub: '5.1B',
      senderAvatarBg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      content: 'Đầu vào 5.1B vừa tiếp nhận phiếu yêu cầu thiết kế mẫu bao bì và bo mạch lô mới, đã bàn giao thông số sang bước R&D.',
      timestamp: '10:20',
      dateStr: '25/11/2026',
      attachments: [
        {
          id: 'att-ord-1',
          name: 'Đơn hàng #DH-2026-108: Thiết kế & Chế tạo Mẫu H1',
          type: 'order',
          code: 'DH-2026-108',
          subText: 'Đầu mối: 5.1B ➔ 3.1 RDI • Trạng thái: Đang thực hiện'
        }
      ],
      reactions: [{ emoji: '✅', count: 3, reactedByMe: true }]
    },
    {
      id: 'msg-51-2',
      roomId: 'room-cluster-51',
      senderId: 'staff-tam',
      senderName: 'Lê Trần Thiện Tâm',
      senderInitials: 'TT',
      senderRole: 'Đầu Mối 5.1T',
      senderHub: '5.1T',
      senderAvatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
      content: '5.1T đã đối chiếu xong checklist đầu ra, sẵn sàng nghiệm thu bàn giao trong chiều nay.',
      timestamp: '11:05',
      dateStr: '25/11/2026',
      isPinned: true
    }
  ],
  'room-cluster-k': [
    {
      id: 'msg-k-1',
      roomId: 'room-cluster-k',
      senderId: 'staff-trang',
      senderName: 'Bà Trang (#K2B)',
      senderInitials: 'BT',
      senderRole: 'Thư Ký Tổng',
      senderHub: 'CỤM #K',
      senderAvatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
      content: 'Các đầu mối Cụm #K lưu ý đồng bộ báo cáo hoạt động gia công và tài liệu họp Hội đồng công việc trước 15:30.',
      timestamp: '09:30',
      dateStr: '25/11/2026',
      isPinned: true
    }
  ],
  'dm-staff-trang': [
    {
      id: 'msg-dm-1',
      roomId: 'dm-staff-trang',
      senderId: 'staff-trang',
      senderName: 'Bà Trang (#K2B)',
      senderInitials: 'BT',
      senderRole: 'Thư Ký Tổng',
      senderHub: 'CỤM #K',
      senderAvatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
      content: 'Chào bạn, nhớ kiểm tra lại danh sách thành phần tham dự cuộc họp Tổng kết công việc thường ngày 16:00 chiều nay nhé.',
      timestamp: '13:50',
      dateStr: '25/11/2026'
    }
  ]
};

const QUICK_EMOJIS = ['👍', '❤️', '🔥', '✅', '🎉', '🤝', '🙏', '👏', '⭐', '📌', '🚀', '💡'];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Tất cả phân loại', dot: '#64748B' },
  { id: 'executive', label: 'Điều hành & Cloud', dot: '#F15A24' },
  { id: 'cluster51', label: 'Cụm 5.1 (5.1B & 5.1T)', dot: '#0068FF' },
  { id: 'clusterK', label: 'Cụm #K (#K2B)', dot: '#0284C7' },
  { id: 'rd_legal', label: 'R&D & Pháp lý', dot: '#7C3AED' },
  { id: 'direct', label: 'Trò chuyện cá nhân', dot: '#10B981' }
];

const STORAGE_ROOMS_KEY = 'avg_internal_chat_rooms_v3';
const STORAGE_MSGS_KEY = 'avg_internal_chat_messages_v3';

export const ChatModule: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ROOMS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ROOMS;
  });

  const [messagesByRoom, setMessagesByRoom] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MSGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MESSAGES;
  });

  // Main View synced with ChatHeader ('messages' | 'contacts' | 'tasks' | 'cloud')
  const [mainView, setMainView] = useState<'messages' | 'contacts' | 'tasks'>('messages');
  const [activeRoomId, setActiveRoomId] = useState<string>('room-executive');

  // Minimalist Zalo Sidebar Filter: 'all' | 'unread' + single 'Phân loại' popover
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);
  const [roomContextMenuId, setRoomContextMenuId] = useState<string | null>(null);

  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [msgSearch, setMsgSearch] = useState<string>('');
  const [showMsgSearch, setShowMsgSearch] = useState<boolean>(false);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(true);

  // Collapsible sections in Zalo Right Sidebar
  const [openRightSections, setOpenRightSections] = useState<{
    members: boolean;
    files: boolean;
    links: boolean;
  }>({
    members: true,
    files: true,
    links: true
  });

  // Compose & Popover states
  const [inputText, setInputText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<ChatAttachment[]>([]);
  const [activePopover, setActivePopover] = useState<'none' | 'emoji' | 'task' | 'schedule' | 'mention'>('none');

  // Quick Task Assignment form inside popover
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskAssignee, setTaskAssignee] = useState<string>('Bà Trang (#K2B)');
  const [taskDue, setTaskDue] = useState<string>('17:00 • Hôm nay');

  // Forward Message Modal
  const [forwardMsg, setForwardMsg] = useState<ChatMessage | null>(null);

  // Create group modal state
  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupHubCode, setNewGroupHubCode] = useState<string>('Cụm 5.1');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(['staff-trang', 'staff-kien']);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ROOMS_KEY, JSON.stringify(rooms));
    } catch (e) {}
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MSGS_KEY, JSON.stringify(messagesByRoom));
    } catch (e) {}
  }, [messagesByRoom]);

  const totalUnreadCount = useMemo(
    () => rooms.reduce((sum, r) => sum + (r.unreadCount || 0), 0),
    [rooms]
  );

  // Sync unread count to ChatHeader
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chat_unread_count_sync', { detail: totalUnreadCount }));
  }, [totalUnreadCount]);

  // Listen to ChatHeader navigation
  useEffect(() => {
    const handleMainViewChange = (e: any) => {
      const v = e.detail;
      if (v === 'cloud') {
        setMainView('messages');
        handleSelectRoom('room-cloud');
        window.dispatchEvent(new CustomEvent('chat_main_view_sync', { detail: 'cloud' }));
      } else if (v === 'contacts' || v === 'tasks' || v === 'messages') {
        setMainView(v);
        window.dispatchEvent(new CustomEvent('chat_main_view_sync', { detail: v }));
      }
    };
    const handleOpenCreateGroup = () => setShowCreateGroupModal(true);

    window.addEventListener('chat_main_view_change', handleMainViewChange);
    window.addEventListener('chat_open_create_group', handleOpenCreateGroup);
    return () => {
      window.removeEventListener('chat_main_view_change', handleMainViewChange);
      window.removeEventListener('chat_open_create_group', handleOpenCreateGroup);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeRoomId, messagesByRoom[activeRoomId]?.length]);

  const activeRoom = useMemo(
    () => rooms.find((r) => r.id === activeRoomId) || rooms[0],
    [rooms, activeRoomId]
  );

  const currentRoomMessages = useMemo(() => {
    const list = messagesByRoom[activeRoom.id] || [];
    if (!msgSearch.trim()) return list;
    const q = msgSearch.toLowerCase();
    return list.filter(
      (m) =>
        m.content.toLowerCase().includes(q) ||
        m.senderName.toLowerCase().includes(q)
    );
  }, [messagesByRoom, activeRoom.id, msgSearch]);

  const pinnedMessages = useMemo(
    () => (messagesByRoom[activeRoom.id] || []).filter((m) => m.isPinned),
    [messagesByRoom, activeRoom.id]
  );

  const sharedAttachments = useMemo(() => {
    const list: ChatAttachment[] = [];
    (messagesByRoom[activeRoom.id] || []).forEach((m) => {
      if (m.attachments && m.attachments.length > 0) {
        list.push(...m.attachments);
      }
    });
    return list;
  }, [messagesByRoom, activeRoom.id]);

  // All tasks across all rooms for the 'Giao việc' tab
  const allAssignedTasks = useMemo(() => {
    const list: Array<{ roomId: string; roomName: string; msgId: string; att: ChatAttachment }> = [];
    Object.keys(messagesByRoom).forEach((rId) => {
      const rName = rooms.find((r) => r.id === rId)?.name || 'Phòng chat';
      (messagesByRoom[rId] || []).forEach((m) => {
        (m.attachments || []).forEach((a) => {
          if (a.type === 'task' || a.type === 'order') {
            list.push({ roomId: rId, roomName: rName, msgId: m.id, att: a });
          }
        });
      });
    });
    return list;
  }, [messagesByRoom, rooms]);

  const roomMembers = useMemo(() => {
    return AVG_CHAT_STAFF.filter((s) => activeRoom.memberIds.includes(s.id));
  }, [activeRoom]);

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((r) => {
        if (unreadOnly && r.unreadCount === 0) return false;
        if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
        if (sidebarSearch.trim()) {
          const q = sidebarSearch.toLowerCase();
          return (
            r.name.toLowerCase().includes(q) ||
            r.hubCode.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
  }, [rooms, unreadOnly, categoryFilter, sidebarSearch]);

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setMainView('messages');
    setReplyingTo(null);
    setActivePopover('none');
    setRoomContextMenuId(null);
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
    window.dispatchEvent(
      new CustomEvent('chat_main_view_sync', {
        detail: roomId === 'room-cloud' ? 'cloud' : 'messages'
      })
    );
  };

  const handleTogglePinRoom = (roomId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, isPinned: !r.isPinned } : r))
    );
    setRoomContextMenuId(null);
    showToast('Đã cập nhật ghim hội thoại');
  };

  const handleMarkUnreadRoom = (roomId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, unreadCount: r.unreadCount > 0 ? 0 : 1 } : r
      )
    );
    setRoomContextMenuId(null);
  };

  const handleStartDirectChat = (member: ChatMember) => {
    const existing = rooms.find(
      (r) => r.type === 'direct' && r.directPartnerId === member.id
    );
    if (existing) {
      handleSelectRoom(existing.id);
      return;
    }
    const newDm: ChatRoom = {
      id: `dm-${member.id}`,
      name: member.name,
      type: 'direct',
      category: 'direct',
      hubCode: member.hub,
      tagColor: '#10B981',
      description: member.role,
      avatarBg: member.avatarBg,
      initials: member.initials,
      unreadCount: 0,
      memberIds: [member.id],
      directPartnerId: member.id
    };
    setRooms((prev) => [newDm, ...prev]);
    handleSelectRoom(newDm.id);
  };

  const handleSendQuickLike = () => {
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const likeMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: activeRoom.id,
      senderId: 'me',
      senderName: 'Ban Điều Hành AVG',
      senderInitials: 'AVG',
      senderRole: 'Điều Hành Hệ Thống',
      senderHub: 'AVG ONE',
      senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      content: '👍',
      timestamp: timeStr,
      dateStr: '25/11/2026',
      isMe: true,
      reactions: []
    };
    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), likeMsg]
    }));
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && pendingAttachments.length === 0) return;

    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: activeRoom.id,
      senderId: 'me',
      senderName: 'Ban Điều Hành AVG',
      senderInitials: 'AVG',
      senderRole: 'Điều Hành Hệ Thống',
      senderHub: 'AVG ONE',
      senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      content: inputText.trim(),
      timestamp: timeStr,
      dateStr: '25/11/2026',
      isMe: true,
      replyTo: replyingTo
        ? {
            id: replyingTo.id,
            senderName: replyingTo.senderName,
            content: replyingTo.content
          }
        : undefined,
      attachments: pendingAttachments.length > 0 ? [...pendingAttachments] : undefined,
      reactions: []
    };

    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), newMsg]
    }));

    setInputText('');
    setReplyingTo(null);
    setPendingAttachments([]);
    setActivePopover('none');
  };

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const newMsg: ChatMessage = {
      id: `msg-task-${Date.now()}`,
      roomId: activeRoom.id,
      senderId: 'me',
      senderName: 'Ban Điều Hành AVG',
      senderInitials: 'AVG',
      senderRole: 'Điều Hành Hệ Thống',
      senderHub: 'AVG ONE',
      senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      content: `📌 Giao việc mới cho @${taskAssignee}`,
      timestamp: timeStr,
      dateStr: '25/11/2026',
      isMe: true,
      attachments: [
        {
          id: `task-${Date.now()}`,
          name: taskTitle.trim(),
          type: 'task',
          assignee: taskAssignee,
          dueDate: taskDue,
          completed: false
        }
      ]
    };
    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), newMsg]
    }));
    setTaskTitle('');
    setActivePopover('none');
    showToast('Đã giao việc vào hội thoại');
  };

  const handleToggleTaskDone = (rId: string, msgId: string, attId: string) => {
    setMessagesByRoom((prev) => {
      const list = prev[rId] || [];
      return {
        ...prev,
        [rId]: list.map((m) => {
          if (m.id !== msgId) return m;
          return {
            ...m,
            attachments: (m.attachments || []).map((a) =>
              a.id === attId ? { ...a, completed: !a.completed } : a
            )
          };
        })
      };
    });
    showToast('Đã cập nhật trạng thái công việc');
  };

  const handleForwardToRoom = (targetRoomId: string) => {
    if (!forwardMsg) return;
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const fwd: ChatMessage = {
      id: `msg-fwd-${Date.now()}`,
      roomId: targetRoomId,
      senderId: 'me',
      senderName: 'Ban Điều Hành AVG',
      senderInitials: 'AVG',
      senderRole: 'Điều Hành Hệ Thống',
      senderHub: 'AVG ONE',
      senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      content: forwardMsg.content,
      timestamp: timeStr,
      dateStr: '25/11/2026',
      isMe: true,
      attachments: forwardMsg.attachments
    };
    setMessagesByRoom((prev) => ({
      ...prev,
      [targetRoomId]: [...(prev[targetRoomId] || []), fwd]
    }));
    const targetName = rooms.find((r) => r.id === targetRoomId)?.name || '';
    setForwardMsg(null);
    showToast(`Đã chuyển tiếp tin nhắn tới ${targetName}`);
  };

  const handleTogglePinMessage = (msgId: string) => {
    setMessagesByRoom((prev) => {
      const list = prev[activeRoom.id] || [];
      return {
        ...prev,
        [activeRoom.id]: list.map((m) =>
          m.id === msgId ? { ...m, isPinned: !m.isPinned } : m
        )
      };
    });
  };

  const handleToggleReaction = (msgId: string, emoji: string) => {
    setMessagesByRoom((prev) => {
      const list = prev[activeRoom.id] || [];
      return {
        ...prev,
        [activeRoom.id]: list.map((m) => {
          if (m.id !== msgId) return m;
          const existing = m.reactions || [];
          const found = existing.find((r) => r.emoji === emoji);
          let nextReactions: ChatReaction[];
          if (found) {
            if (found.reactedByMe) {
              nextReactions = existing
                .map((r) =>
                  r.emoji === emoji
                    ? { ...r, count: r.count - 1, reactedByMe: false }
                    : r
                )
                .filter((r) => r.count > 0);
            } else {
              nextReactions = existing.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, reactedByMe: true }
                  : r
              );
            }
          } else {
            nextReactions = [...existing, { emoji, count: 1, reactedByMe: true }];
          }
          return { ...m, reactions: nextReactions };
        })
      };
    });
  };

  const handleDeleteMessage = (msgId: string) => {
    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: (prev[activeRoom.id] || []).filter((m) => m.id !== msgId)
    }));
    showToast('Đã thu hồi tin nhắn');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const added: ChatAttachment[] = Array.from(files).map((f) => ({
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: f.name,
      type: f.type.startsWith('image/') ? 'image' : 'file',
      size:
        f.size < 1024 * 1024
          ? `${(f.size / 1024).toFixed(1)} KB`
          : `${(f.size / (1024 * 1024)).toFixed(1)} MB`
    }));
    setPendingAttachments((prev) => [...prev, ...added]);
    e.target.value = '';
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const words = newGroupName.trim().split(/\s+/);
    const initials =
      words.length >= 2
        ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
        : newGroupName.trim().slice(0, 2).toUpperCase();

    const newRoom: ChatRoom = {
      id: `room-${Date.now()}`,
      name: newGroupName.trim(),
      type: 'group',
      category: 'cluster51',
      hubCode: newGroupHubCode,
      tagColor: '#0068FF',
      description: `Nhóm phối hợp ${newGroupHubCode}`,
      avatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
      initials,
      isPinned: true,
      unreadCount: 0,
      memberIds: selectedMemberIds.length > 0 ? selectedMemberIds : ['staff-trang']
    };

    setRooms((prev) => [newRoom, ...prev]);
    setMessagesByRoom((prev) => ({
      ...prev,
      [newRoom.id]: [
        {
          id: `msg-init-${Date.now()}`,
          roomId: newRoom.id,
          senderId: 'me',
          senderName: 'Ban Điều Hành AVG',
          senderInitials: 'AVG',
          senderRole: 'Điều Hành Hệ Thống',
          senderHub: newGroupHubCode,
          senderAvatarBg: 'linear-gradient(135deg, #0068FF, #00A8E8)',
          content: `Đã khởi tạo nhóm "${newRoom.name}" (${newGroupHubCode}).`,
          timestamp: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          dateStr: '25/11/2026',
          isMe: true
        }
      ]
    }));
    handleSelectRoom(newRoom.id);
    setShowCreateGroupModal(false);
    setNewGroupName('');
    showToast(`Đã tạo nhóm "${newRoom.name}"`);
  };

  const activeCategoryObj =
    CATEGORY_FILTERS.find((c) => c.id === categoryFilter) || CATEGORY_FILTERS[0];

  return (
    <div
      onClick={() => {
        if (showCategoryMenu) setShowCategoryMenu(false);
        if (roomContextMenuId) setRoomContextMenuId(null);
      }}
      className="w-full h-full flex-1 min-h-0 overflow-hidden bg-white dark:bg-slate-950 text-[#081C36] dark:text-slate-100 font-sans flex relative select-none"
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#F15A24] text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CỘT 1 (TRÁI - 330px): DANH SÁCH HỘI THOẠI / DANH BẠ / GIAO VIỆC TỐI GIẢN */}
      {/* ========================================================================= */}
      <aside className="w-80 sm:w-[336px] shrink-0 h-full bg-white dark:bg-slate-900 border-r border-[#E5E7EB] dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Thanh Tìm kiếm & 2 nút Icon mảnh chuẩn Zalo */}
        <div className="h-14 px-3.5 flex items-center gap-1.5 shrink-0">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#7589A3] stroke-[1.75] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full h-8 pl-8.5 pr-7 text-xs bg-[#EBEDF0] dark:bg-slate-800 text-[#081C36] dark:text-white placeholder-[#7589A3] rounded-full border border-transparent focus:bg-white focus:border-[#0068FF] focus:outline-none transition"
            />
            {sidebarSearch && (
              <button
                onClick={() => setSidebarSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMainView(mainView === 'contacts' ? 'messages' : 'contacts')}
            title="Danh bạ nhân sự"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer shrink-0 ${
              mainView === 'contacts'
                ? 'bg-[#E5EFFF] text-[#0068FF]'
                : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            type="button"
            onClick={() => setShowCreateGroupModal(true)}
            title="Tạo nhóm chat mới"
            className="w-8 h-8 rounded-full hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <Users className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {/* NỘI DUNG CỘT TRÁI THEO TAB: TIN NHẮN | DANH BẠ | GIAO VIỆC */}
        {mainView === 'messages' ? (
          <>
            {/* Thanh lọc Zalo tối giản: [ Tất cả | Chưa đọc ] bên trái + [ Phân loại ⌄ ] bên phải */}
            <div className="px-3.5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between text-xs shrink-0 relative">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setUnreadOnly(false)}
                  className={`pb-2 font-semibold border-b-2 transition cursor-pointer ${
                    !unreadOnly
                      ? 'text-[#0068FF] border-[#0068FF]'
                      : 'text-[#7589A3] border-transparent hover:text-[#081C36] dark:hover:text-white'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setUnreadOnly(true)}
                  className={`pb-2 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1 ${
                    unreadOnly
                      ? 'text-[#0068FF] border-[#0068FF]'
                      : 'text-[#7589A3] border-transparent hover:text-[#081C36] dark:hover:text-white'
                  }`}
                >
                  <span>Chưa đọc</span>
                  {totalUnreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#C81D25] text-white text-[10px] font-bold flex items-center justify-center">
                      {totalUnreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Nút dropdown Phân loại tối giản đúng kiểu Zalo */}
              <div className="pb-1.5 relative" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setShowCategoryMenu((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 transition cursor-pointer ${
                    categoryFilter !== 'all'
                      ? 'bg-[#E5EFFF] text-[#0068FF] font-semibold'
                      : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#7589A3]'
                  }`}
                >
                  {categoryFilter !== 'all' && (
                    <span
                      style={{ backgroundColor: activeCategoryObj.dot }}
                      className="w-2 h-2 rounded-full"
                    />
                  )}
                  <span>
                    {categoryFilter === 'all' ? 'Phân loại' : activeCategoryObj.label}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.75]" />
                </button>

                {showCategoryMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-30">
                    {CATEGORY_FILTERS.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategoryFilter(cat.id);
                          setShowCategoryMenu(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#F3F5F6] dark:hover:bg-slate-700 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            style={{ backgroundColor: cat.dot }}
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                          />
                          <span
                            className={
                              categoryFilter === cat.id
                                ? 'font-bold text-[#0068FF]'
                                : 'text-[#081C36] dark:text-slate-200'
                            }
                          >
                            {cat.label}
                          </span>
                        </div>
                        {categoryFilter === cat.id && (
                          <Check className="w-3.5 h-3.5 text-[#0068FF]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Danh sách Hội thoại Zalo tối giản, thoáng mắt */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {filteredRooms.length === 0 ? (
                <div className="py-14 text-center text-xs text-[#7589A3] px-4">
                  Không có hội thoại nào phù hợp.
                </div>
              ) : (
                filteredRooms.map((room) => {
                  const isSelected = room.id === activeRoom.id;
                  const roomMsgs = messagesByRoom[room.id] || [];
                  const lastMsg = roomMsgs[roomMsgs.length - 1];
                  const partner =
                    room.type === 'direct'
                      ? AVG_CHAT_STAFF.find((s) => s.id === room.directPartnerId)
                      : null;

                  return (
                    <div
                      key={room.id}
                      onClick={() => handleSelectRoom(room.id)}
                      className={`group relative px-3.5 py-2.5 flex items-center gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'bg-[#E5EFFF] dark:bg-sky-950/50'
                          : 'hover:bg-[#F3F5F6] dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {/* Avatar tròn 46px sạch sẽ (không đè số lộn xộn) */}
                      <div className="relative shrink-0">
                        <div
                          style={{ background: room.avatarBg }}
                          className="w-11.5 h-11.5 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-2xs"
                        >
                          {room.initials}
                        </div>
                        {room.type === 'direct' && partner?.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                        )}
                      </div>

                      {/* 2 Dòng thông tin tinh gọn chuẩn Zalo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span
                            className={`text-[13.5px] truncate ${
                              room.unreadCount > 0
                                ? 'font-bold text-[#081C36] dark:text-white'
                                : 'font-medium text-[#081C36] dark:text-slate-100'
                            }`}
                          >
                            {room.name}
                          </span>

                          {/* Thời gian hoặc nút ... khi hover */}
                          <div className="flex items-center gap-1 shrink-0">
                            {room.isPinned && (
                              <Pin className="w-3 h-3 text-[#7589A3] rotate-45 group-hover:hidden" />
                            )}
                            <span className="text-[11px] text-[#7589A3] group-hover:hidden">
                              {lastMsg ? lastMsg.timestamp : ''}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRoomContextMenuId(
                                  roomContextMenuId === room.id ? null : room.id
                                );
                              }}
                              className="hidden group-hover:flex w-6 h-6 rounded-full hover:bg-black/10 items-center justify-center text-[#7589A3]"
                              title="Tùy chọn hội thoại"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {/* Chấm màu phân loại nhỏ gọn tinh tế kiểu thẻ Phân loại Zalo */}
                            <span
                              style={{ backgroundColor: room.tagColor }}
                              className="w-2 h-2 rounded-full shrink-0"
                              title={room.hubCode}
                            />
                            <p
                              className={`text-[12.5px] truncate ${
                                room.unreadCount > 0
                                  ? 'font-semibold text-[#081C36] dark:text-white'
                                  : 'text-[#7589A3] dark:text-slate-400'
                              }`}
                            >
                              {lastMsg
                                ? `${lastMsg.isMe ? 'Bạn: ' : ''}${
                                    lastMsg.content || '[Tệp đính kèm]'
                                  }`
                                : room.description}
                            </p>
                          </div>

                          {room.unreadCount > 0 && (
                            <span className="min-w-[17px] h-[17px] px-1 rounded-full bg-[#C81D25] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {room.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Menu ngữ cảnh nhanh khi bấm ... */}
                      {roomContextMenuId === room.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-3 top-10 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-30 text-xs"
                        >
                          <button
                            type="button"
                            onClick={(e) => handleTogglePinRoom(room.id, e)}
                            className="w-full px-3 py-1.5 text-left hover:bg-[#F3F5F6] dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
                          >
                            <Pin className="w-3.5 h-3.5 text-[#7589A3]" />
                            <span>{room.isPinned ? 'Bỏ ghim hội thoại' : 'Ghim hội thoại'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleMarkUnreadRoom(room.id, e)}
                            className="w-full px-3 py-1.5 text-left hover:bg-[#F3F5F6] dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#7589A3]" />
                            <span>
                              {room.unreadCount > 0 ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc'}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : mainView === 'contacts' ? (
          /* CHẾ ĐỘ DANH BẠ NHÂN SỰ & NHÓM CỤM */
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="px-3.5 py-2 bg-[#F4F5F7] dark:bg-slate-800/70 text-[11px] font-bold text-[#7589A3]">
              Nhân sự trực tuyến ({AVG_CHAT_STAFF.filter((s) => s.isOnline).length}/
              {AVG_CHAT_STAFF.length})
            </div>
            {AVG_CHAT_STAFF.filter((m) =>
              sidebarSearch.trim()
                ? m.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                  m.hub.toLowerCase().includes(sidebarSearch.toLowerCase())
                : true
            ).map((member) => (
              <div
                key={member.id}
                onClick={() => handleStartDirectChat(member)}
                className="px-3.5 py-2.5 flex items-center justify-between gap-2.5 hover:bg-[#F3F5F6] dark:hover:bg-slate-800 cursor-pointer transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div
                      style={{ background: member.avatarBg }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    >
                      {member.initials}
                    </div>
                    {member.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-[#081C36] dark:text-white truncate">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-[#7589A3] truncate">{member.role}</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBEDF0] dark:bg-slate-700 text-[10px] font-semibold text-[#081C36] dark:text-slate-200 shrink-0">
                  {member.hub}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* CHẾ ĐỘ DANH SÁCH GIAO VIỆC (ZALO TO-DO) */
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-bold text-[#081C36] dark:text-white">
                Việc đã giao ({allAssignedTasks.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  setMainView('messages');
                  setActivePopover('task');
                }}
                className="text-xs font-semibold text-[#0068FF] hover:underline cursor-pointer"
              >
                + Giao việc mới
              </button>
            </div>
            {allAssignedTasks.map(({ roomId, roomName, msgId, att }) => (
              <div
                key={att.id}
                onClick={() => handleSelectRoom(roomId)}
                className="p-3 rounded-xl bg-[#F4F5F7] dark:bg-slate-800 hover:bg-[#E5EFFF] transition cursor-pointer space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      att.completed ? 'line-through text-[#7589A3]' : 'text-[#081C36] dark:text-white'
                    }`}
                  >
                    {att.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTaskDone(roomId, msgId, att.id);
                    }}
                    className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer ${
                      att.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-400 bg-white'
                    }`}
                  >
                    {att.completed && <Check className="w-3 h-3" />}
                  </button>
                </div>
                <div className="text-[11px] text-[#7589A3]">
                  {att.assignee ? `Người nhận: ${att.assignee}` : att.subText}
                </div>
                <div className="text-[10px] text-[#0068FF] font-medium">{roomName}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* CỘT 2 (GIỮA): KHUNG TRÒ CHUYỆN ZALO TỐI GIẢN, SẮC NÉT (#EEF0F5) */}
      {/* ========================================================================= */}
      <main className="flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-[#EEF0F5] dark:bg-slate-950">
        {/* Header phòng chat tối giản (Cao 60px, icon nét mảnh 1.75px) */}
        <div className="h-15 px-4 bg-white dark:bg-slate-900 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div
              style={{ background: activeRoom.avatarBg }}
              className="w-10.5 h-10.5 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
            >
              {activeRoom.initials}
            </div>

            <div className="min-w-0">
              <h2 className="text-[15px] font-bold text-[#081C36] dark:text-white truncate">
                {activeRoom.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#7589A3]">
                {activeRoom.type === 'group' ? (
                  <button
                    type="button"
                    onClick={() => setShowRightPanel(true)}
                    className="inline-flex items-center gap-1 hover:text-[#0068FF] cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>{activeRoom.memberIds.length} thành viên</span>
                  </button>
                ) : activeRoom.type === 'cloud' ? (
                  <span>Lưu trữ và đồng bộ giữa các thiết bị</span>
                ) : (
                  <span className="text-emerald-600 font-medium">Vừa truy cập</span>
                )}
                <span>•</span>
                <span style={{ color: activeRoom.tagColor }} className="font-medium">
                  {activeRoom.hubCode}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Nút Icon mảnh bên phải Header chuẩn Zalo */}
          <div className="flex items-center gap-1 shrink-0">
            {showMsgSearch && (
              <div className="relative w-48 sm:w-56 mr-1">
                <Search className="w-3.5 h-3.5 text-[#7589A3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={msgSearch}
                  onChange={(e) => setMsgSearch(e.target.value)}
                  placeholder="Tìm tin nhắn..."
                  autoFocus
                  className="w-full h-8 pl-8 pr-7 text-xs bg-[#EBEDF0] dark:bg-slate-800 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0068FF]"
                />
                {msgSearch && (
                  <button
                    onClick={() => setMsgSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowCreateGroupModal(true)}
              title="Thêm thành viên vào nhóm"
              className="w-8.5 h-8.5 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
            >
              <UserPlus className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowMsgSearch((prev) => !prev);
                if (showMsgSearch) setMsgSearch('');
              }}
              title="Tìm kiếm tin nhắn"
              className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition cursor-pointer ${
                showMsgSearch
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300'
              }`}
            >
              <Search className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => showToast(`Đang gọi Video với ${activeRoom.name}...`)}
              title="Cuộc gọi video"
              className="w-8.5 h-8.5 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
            >
              <Video className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => setShowRightPanel((prev) => !prev)}
              title="Thông tin hội thoại"
              className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition cursor-pointer ${
                showRightPanel
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300'
              }`}
            >
              {showRightPanel ? (
                <PanelRightClose className="w-4.5 h-4.5 stroke-[1.75]" />
              ) : (
                <PanelRightOpen className="w-4.5 h-4.5 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>

        {/* Thanh Tin Nhắn Ghim 1 dòng tối giản của Zalo */}
        {pinnedMessages.length > 0 && (
          <div className="px-4 py-1.5 bg-white dark:bg-slate-900 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0 text-xs">
              <MessageSquare className="w-3.5 h-3.5 text-[#0068FF] shrink-0 stroke-[2]" />
              <span className="text-[#081C36] dark:text-slate-200 truncate">
                <strong className="font-semibold">
                  {pinnedMessages[pinnedMessages.length - 1].senderName}:
                </strong>{' '}
                {pinnedMessages[pinnedMessages.length - 1].content}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                handleTogglePinMessage(pinnedMessages[pinnedMessages.length - 1].id)
              }
              className="text-[11px] text-[#7589A3] hover:text-[#081C36] shrink-0 cursor-pointer"
            >
              Bỏ ghim
            </button>
          </div>
        )}

        {/* Luồng tin nhắn Zalo (Gộp nhóm tin nhắn liên tiếp cùng người gửi, thanh công cụ nổi bên cạnh bong bóng) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin">
          <div className="flex justify-center my-2">
            <span className="px-3 py-0.5 rounded-full bg-black/15 dark:bg-slate-800 text-white text-[11px]">
              25/11/2026
            </span>
          </div>

          {currentRoomMessages.map((msg, idx) => {
            const isMe = Boolean(msg.isMe);
            const prevMsg = idx > 0 ? currentRoomMessages[idx - 1] : null;
            const isSameSenderAsPrev = Boolean(prevMsg && prevMsg.senderId === msg.senderId);
            const isLastMe = isMe && idx === currentRoomMessages.length - 1;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 group ${
                  isMe ? 'flex-row-reverse' : 'flex-row'
                } ${isSameSenderAsPrev ? 'mt-1' : 'mt-3'}`}
              >
                {/* Avatar bên trái (Ẩn nếu cùng người gửi liên tiếp như Zalo) */}
                {!isMe && (
                  <div className="w-9 shrink-0">
                    {!isSameSenderAsPrev && (
                      <div
                        style={{ background: msg.senderAvatarBg }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-2xs"
                      >
                        {msg.senderInitials}
                      </div>
                    )}
                  </div>
                )}

                {/* Khối bong bóng + Thanh thao tác nổi ngang bên cạnh (không làm giãn chiều dọc!) */}
                <div
                  className={`max-w-[75%] sm:max-w-[64%] flex flex-col ${
                    isMe ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`relative flex items-center gap-2 ${
                      isMe ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Bong bóng tin nhắn Zalo */}
                    <div
                      className={`relative px-3.5 py-2.5 rounded-[12px] text-[13.5px] leading-snug shadow-[0_1px_1.5px_rgba(0,0,0,0.07)] ${
                        isMe
                          ? 'bg-[#E5EFFF] dark:bg-sky-900/80 text-[#081C36] dark:text-white'
                          : 'bg-white dark:bg-slate-800 text-[#081C36] dark:text-slate-100'
                      }`}
                    >
                      {/* Tên người gửi tối giản (chỉ hiện ở tin đầu tiên của cụm) */}
                      {!isMe && !isSameSenderAsPrev && activeRoom.type === 'group' && (
                        <div className="text-[11.5px] font-medium text-[#7589A3] mb-1">
                          {msg.senderName}
                        </div>
                      )}

                      {/* Trích dẫn trả lời */}
                      {msg.replyTo && (
                        <div className="mb-1.5 pl-2.5 pr-2 py-1 rounded bg-black/5 dark:bg-slate-900/60 border-l-2 border-l-[#0068FF] text-xs">
                          <div className="font-semibold text-[#081C36] dark:text-white">
                            {msg.replyTo.senderName}
                          </div>
                          <div className="truncate text-[#7589A3]">{msg.replyTo.content}</div>
                        </div>
                      )}

                      {/* Văn bản */}
                      {msg.content && (
                        <div className="whitespace-pre-line break-words">{msg.content}</div>
                      )}

                      {/* Thẻ Đính kèm / Thẻ Giao việc (To-Do) tương tác trực tiếp */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {msg.attachments.map((att) =>
                            att.type === 'task' ? (
                              <div
                                key={att.id}
                                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#D3E5FF] dark:border-slate-700 space-y-1.5 min-w-[230px]"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-bold uppercase text-[#0068FF] flex items-center gap-1">
                                    <CheckSquare className="w-3 h-3" />
                                    <span>Giao việc nhanh</span>
                                  </span>
                                  <span className="text-[10px] text-[#7589A3]">{att.dueDate}</span>
                                </div>
                                <div
                                  className={`text-xs font-bold ${
                                    att.completed
                                      ? 'line-through text-[#7589A3]'
                                      : 'text-[#081C36] dark:text-white'
                                  }`}
                                >
                                  {att.name}
                                </div>
                                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                                  <span className="text-[#7589A3]">
                                    Giao cho: <strong>{att.assignee}</strong>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleToggleTaskDone(activeRoom.id, msg.id, att.id)
                                    }
                                    className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold transition cursor-pointer ${
                                      att.completed
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-[#0068FF] text-white hover:bg-[#0052CC]'
                                    }`}
                                  >
                                    {att.completed ? '✓ Đã xong' : 'Hoàn thành'}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                key={att.id}
                                className="p-2 rounded-lg bg-black/[0.04] dark:bg-slate-900/70 flex items-center gap-2.5"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#0068FF] text-white flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4 stroke-[1.75]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-semibold text-[#081C36] dark:text-white truncate">
                                    {att.name}
                                  </div>
                                  <div className="text-[10.5px] text-[#7589A3] truncate">
                                    {att.subText || att.size || 'Tài liệu nội bộ'}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* Giờ gửi nhỏ gọn */}
                      <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#7589A3]">
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Thanh công cụ nổi BÊN CẠNH bong bóng khi hover (Chuẩn Zalo, không chiếm dòng!) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded-full shadow-xs border border-slate-200/80 dark:border-slate-700 shrink-0">
                      <button
                        type="button"
                        onClick={() => setReplyingTo(msg)}
                        className="p-1 text-[#7589A3] hover:text-[#0068FF] cursor-pointer"
                        title="Trả lời"
                      >
                        <Reply className="w-3.5 h-3.5 stroke-[1.75]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setForwardMsg(msg)}
                        className="p-1 text-[#7589A3] hover:text-[#0068FF] cursor-pointer"
                        title="Chuyển tiếp"
                      >
                        <CornerUpRight className="w-3.5 h-3.5 stroke-[1.75]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePinMessage(msg.id)}
                        className="p-1 text-[#7589A3] hover:text-[#F15A24] cursor-pointer"
                        title={msg.isPinned ? 'Bỏ ghim' : 'Ghim'}
                      >
                        <Pin className="w-3.5 h-3.5 stroke-[1.75]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleReaction(msg.id, '👍')}
                        className="p-1 text-[#7589A3] hover:text-[#0068FF] cursor-pointer"
                        title="Thả thích 👍"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 stroke-[1.75]" />
                      </button>
                      {isMe && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 text-[#7589A3] hover:text-rose-600 cursor-pointer"
                          title="Thu hồi"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.75]" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Huy hiệu Biểu cảm nhỏ gọn ôm sát góc dưới bong bóng */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center gap-1 -mt-1.5 z-10 px-1">
                      {msg.reactions.map((r) => (
                        <button
                          key={r.emoji}
                          type="button"
                          onClick={() => handleToggleReaction(msg.id, r.emoji)}
                          className="px-1.5 py-0.2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs text-[11px] inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>{r.emoji}</span>
                          {r.count > 1 && (
                            <span className="text-[10px] text-[#7589A3] font-semibold">
                              {r.count}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {isLastMe && (
                    <div className="mt-1 text-[10px] text-[#7589A3] flex items-center gap-1">
                      <CheckCheck className="w-3 h-3 text-[#0068FF]" />
                      <span>Đã xem</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* ========================================================================= */}
        {/* KHUNG SOẠN THẢO 2 TẦNG TỐI GIẢN CHUẨN ZALO (ICON NÉT MẢNH 1.75PX) */}
        {/* ========================================================================= */}
        <div className="bg-white dark:bg-slate-900 border-t border-[#E5E7EB] dark:border-slate-800 shrink-0 relative">
          {/* Popover 1: Bảng chọn Emoji nhanh */}
          {activePopover === 'emoji' && (
            <div className="absolute bottom-24 left-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2.5 z-30 flex items-center gap-1.5 flex-wrap max-w-xs">
              {QUICK_EMOJIS.map((emo) => (
                <button
                  key={emo}
                  type="button"
                  onClick={() => {
                    setInputText((prev) => prev + emo);
                    setActivePopover('none');
                    inputRef.current?.focus();
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-base flex items-center justify-center cursor-pointer"
                >
                  {emo}
                </button>
              ))}
            </div>
          )}

          {/* Popover 2: Nhắc người dùng @Mention */}
          {activePopover === 'mention' && (
            <div className="absolute bottom-24 left-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-30 w-56 max-h-48 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-bold text-[#7589A3] uppercase">
                Nhắc tên thành viên (@)
              </div>
              <button
                type="button"
                onClick={() => {
                  setInputText((prev) => `${prev}@All `);
                  setActivePopover('none');
                  inputRef.current?.focus();
                }}
                className="w-full px-3 py-1.5 text-left text-xs font-semibold text-[#0068FF] hover:bg-[#F3F5F6] cursor-pointer"
              >
                @All (Tất cả thành viên)
              </button>
              {roomMembers.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setInputText((prev) => `${prev}@${m.name} `);
                    setActivePopover('none');
                    inputRef.current?.focus();
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#F3F5F6] dark:hover:bg-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{m.name}</span>
                  <span className="text-[10px] text-[#7589A3]">{m.hub}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popover 3: Form Giao Việc Nhanh (Zalo To-Do) */}
          {activePopover === 'task' && (
            <form
              onSubmit={handleAssignTask}
              className="px-4 py-3 bg-[#F4F5F7] dark:bg-slate-800 border-b border-[#E5E7EB] dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs"
            >
              <CheckSquare className="w-4 h-4 text-[#0068FF] shrink-0" />
              <input
                type="text"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Nhập nội dung công việc cần giao..."
                autoFocus
                className="flex-1 min-w-[200px] h-8 px-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0068FF]"
              />
              <select
                value={taskAssignee}
                onChange={(e) => setTaskAssignee(e.target.value)}
                className="h-8 px-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                <option value="Các đầu mối AVG">Các đầu mối AVG</option>
                {AVG_CHAT_STAFF.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="h-8 px-3.5 rounded-full bg-[#0068FF] text-white font-semibold cursor-pointer"
              >
                Giao việc
              </button>
              <button
                type="button"
                onClick={() => setActivePopover('none')}
                className="text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
              >
                ✕
              </button>
            </form>
          )}

          {/* Tầng 1: Thanh Icon Mảnh Tối Giản Chuẩn Zalo */}
          <div className="h-9.5 px-3 border-b border-[#F1F2F4] dark:border-slate-800 flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />

            <button
              type="button"
              onClick={() =>
                setActivePopover((prev) => (prev === 'emoji' ? 'none' : 'emoji'))
              }
              title="Biểu cảm"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
                activePopover === 'emoji'
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300'
              }`}
            >
              <Smile className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Gửi hình ảnh"
              className="w-8 h-8 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
            >
              <ImageIcon className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Đính kèm File"
              className="w-8 h-8 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
            >
              <Paperclip className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() =>
                setActivePopover((prev) => (prev === 'mention' ? 'none' : 'mention'))
              }
              title="Nhắc tên @Mention"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
                activePopover === 'mention'
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300'
              }`}
            >
              <AtSign className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <button
              type="button"
              onClick={() =>
                setActivePopover((prev) => (prev === 'task' ? 'none' : 'task'))
              }
              title="Giao việc (Zalo To-Do)"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
                activePopover === 'task'
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#4B5563] dark:text-slate-300'
              }`}
            >
              <CheckSquare className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>
          </div>

          {/* Hiển thị trích dẫn trả lời hoặc tệp đính kèm */}
          {(replyingTo || pendingAttachments.length > 0) && (
            <div className="px-3.5 pt-2 flex flex-wrap items-center gap-2">
              {replyingTo && (
                <div className="px-3 py-1 rounded-lg bg-[#F4F5F7] dark:bg-slate-800 border-l-2 border-l-[#0068FF] text-xs flex items-center gap-2">
                  <span className="truncate max-w-[300px]">
                    Trả lời <strong>{replyingTo.senderName}</strong>: {replyingTo.content}
                  </span>
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}

              {pendingAttachments.map((att) => (
                <div
                  key={att.id}
                  className="px-3 py-1 rounded-full bg-[#E5EFFF] text-[#0068FF] text-xs font-medium flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{att.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setPendingAttachments((prev) => prev.filter((a) => a.id !== att.id))
                    }
                    className="hover:text-rose-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tầng 2: Ô nhập tin nhắn sạch sẽ & nút GỬI / 👍 */}
          <form
            onSubmit={handleSendMessage}
            className="px-3.5 py-2 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => {
                const val = e.target.value;
                setInputText(val);
                if (val.endsWith('@')) {
                  setActivePopover('mention');
                }
              }}
              placeholder={`Nhập @, tin nhắn tới ${activeRoom.name}...`}
              className="flex-1 h-9 px-1 text-[13.5px] bg-transparent text-[#081C36] dark:text-white placeholder-[#7589A3] focus:outline-none"
            />

            {inputText.trim() || pendingAttachments.length > 0 ? (
              <button
                type="submit"
                className="text-[13px] font-bold text-[#0068FF] hover:text-[#0052CC] px-3 py-1 rounded-lg hover:bg-[#E5EFFF] transition cursor-pointer shrink-0"
              >
                GỬI
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendQuickLike}
                title="Gửi nhanh 👍"
                className="w-8.5 h-8.5 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#0068FF] flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <ThumbsUp className="w-4.5 h-4.5 stroke-[1.75]" />
              </button>
            )}
          </form>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* CỘT 3 (PHẢI - 300px): THÔNG TIN HỘI THOẠI TỐI GIẢN CHUẨN ZALO */}
      {/* ========================================================================= */}
      {showRightPanel && (
        <aside className="hidden xl:flex w-[300px] shrink-0 h-full bg-white dark:bg-slate-900 border-l border-[#E5E7EB] dark:border-slate-800 flex-col overflow-y-auto scrollbar-thin">
          <div className="h-15 px-4 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-center shrink-0">
            <h3 className="text-[14.5px] font-bold text-[#081C36] dark:text-white">
              Thông tin hội thoại
            </h3>
          </div>

          {/* Avatar + Tên + 3 nút tròn tối giản */}
          <div className="p-4 border-b-[6px] border-[#F4F5F7] dark:border-slate-950 flex flex-col items-center text-center">
            <div
              style={{ background: activeRoom.avatarBg }}
              className="w-13 h-13 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
            >
              {activeRoom.initials}
            </div>
            <h4 className="text-sm font-bold text-[#081C36] dark:text-white leading-snug px-2">
              {activeRoom.name}
            </h4>

            <div className="grid grid-cols-3 gap-2 w-full mt-4">
              <button
                type="button"
                onClick={() => handleTogglePinRoom(activeRoom.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    activeRoom.isPinned
                      ? 'bg-[#E5EFFF] text-[#0068FF]'
                      : 'bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF]'
                  }`}
                >
                  <Pin className="w-3.5 h-3.5 stroke-[1.75]" />
                </div>
                <span className="text-[10.5px] text-[#7589A3]">
                  {activeRoom.isPinned ? 'Bỏ ghim' : 'Ghim hội thoại'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowCreateGroupModal(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF] flex items-center justify-center transition">
                  <UserPlus className="w-3.5 h-3.5 stroke-[1.75]" />
                </div>
                <span className="text-[10.5px] text-[#7589A3]">Thêm thành viên</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePopover('task')}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF] flex items-center justify-center transition">
                  <CheckSquare className="w-3.5 h-3.5 stroke-[1.75]" />
                </div>
                <span className="text-[10.5px] text-[#7589A3]">Giao việc</span>
              </button>
            </div>
          </div>

          {/* Mục 1: Thành viên */}
          <div className="border-b-[6px] border-[#F4F5F7] dark:border-slate-950">
            <button
              type="button"
              onClick={() =>
                setOpenRightSections((p) => ({ ...p, members: !p.members }))
              }
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-[#081C36] dark:text-white hover:bg-slate-50 cursor-pointer"
            >
              <span>Thành viên ({roomMembers.length})</span>
              {openRightSections.members ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.members && (
              <div className="px-3 pb-2.5 space-y-0.5 max-h-48 overflow-y-auto scrollbar-thin">
                {roomMembers.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleStartDirectChat(m)}
                    className="p-1.5 rounded-lg hover:bg-[#F3F5F6] dark:hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        style={{ background: m.avatarBg }}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                      >
                        {m.initials}
                      </div>
                      <span className="text-xs text-[#081C36] dark:text-slate-200 truncate">
                        {m.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7589A3] shrink-0">{m.hub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mục 2: File & Công việc đã chia sẻ */}
          <div className="border-b-[6px] border-[#F4F5F7] dark:border-slate-950">
            <button
              type="button"
              onClick={() => setOpenRightSections((p) => ({ ...p, files: !p.files }))}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-[#081C36] dark:text-white hover:bg-slate-50 cursor-pointer"
            >
              <span>File & Công việc ({sharedAttachments.length})</span>
              {openRightSections.files ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.files && (
              <div className="px-3.5 pb-3 space-y-1.5">
                {sharedAttachments.length === 0 ? (
                  <div className="text-xs text-[#7589A3] py-2 text-center">
                    Chưa có File được chia sẻ
                  </div>
                ) : (
                  sharedAttachments.map((att) => (
                    <div
                      key={att.id}
                      className="p-2 rounded-lg bg-[#F4F5F7] dark:bg-slate-800 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#0068FF] shrink-0 stroke-[1.75]" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-[#081C36] dark:text-white truncate">
                          {att.name}
                        </div>
                        <div className="text-[10px] text-[#7589A3] truncate">
                          {att.assignee || att.size || 'Tài liệu nội bộ'}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Mục 3: Link hệ thống */}
          <div>
            <button
              type="button"
              onClick={() => setOpenRightSections((p) => ({ ...p, links: !p.links }))}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-[#081C36] dark:text-white hover:bg-slate-50 cursor-pointer"
            >
              <span>Link đã chia sẻ</span>
              {openRightSections.links ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.links && (
              <div className="px-3.5 pb-3">
                <a
                  href="https://docs.google.com/spreadsheets/d/1Convert/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#F4F5F7] dark:bg-slate-800 flex items-center gap-2 hover:text-[#0068FF] text-xs"
                >
                  <Link2 className="w-4 h-4 text-[#0068FF] shrink-0" />
                  <span className="truncate font-medium">Sheet Lịch Trao Đổi 24/7</span>
                </a>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* MODAL CHUYỂN TIẾP TIN NHẮN (ZALO FORWARD) */}
      {forwardMsg && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 w-full max-w-sm space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-[#081C36] dark:text-white">
                Chuyển tiếp tin nhắn
              </h3>
              <button
                type="button"
                onClick={() => setForwardMsg(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F4F5F7] dark:bg-slate-800 text-xs text-[#7589A3] truncate">
              "{forwardMsg.content || '[Tệp đính kèm]'}"
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {rooms
                .filter((r) => r.id !== activeRoom.id)
                .map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleForwardToRoom(r.id)}
                    className="w-full p-2 rounded-lg hover:bg-[#E5EFFF] flex items-center justify-between text-xs cursor-pointer"
                  >
                    <span className="font-medium text-[#081C36] dark:text-white truncate">
                      {r.name}
                    </span>
                    <span className="text-[#0068FF] font-semibold">Gửi</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL TẠO NHÓM CHAT MỚI */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 w-full max-w-md space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-[#081C36] dark:text-white">
                Tạo nhóm mới
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateGroupModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3 text-xs">
              <input
                type="text"
                required
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Nhập tên nhóm..."
                className="w-full h-9 px-3.5 rounded-full bg-[#F4F5F7] dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0068FF]"
              />

              <div className="space-y-1.5">
                <div className="font-semibold text-[#7589A3]">
                  Chọn thành viên ({selectedMemberIds.length})
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {AVG_CHAT_STAFF.map((member) => {
                    const checked = selectedMemberIds.includes(member.id);
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() =>
                          setSelectedMemberIds((prev) =>
                            checked
                              ? prev.filter((id) => id !== member.id)
                              : [...prev, member.id]
                          )
                        }
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition cursor-pointer ${
                          checked
                            ? 'bg-[#0068FF] text-white'
                            : 'bg-[#EBEDF0] dark:bg-slate-800 text-[#081C36] dark:text-slate-300'
                        }`}
                      >
                        {member.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="h-8.5 px-4 rounded-full bg-[#EBEDF0] text-[#081C36] font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-full bg-[#0068FF] text-white font-semibold cursor-pointer"
                >
                  Tạo nhóm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
