import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageSquare, Search, Send, Paperclip, Pin, Users, User, Plus, X,
  CheckCheck, FileText, Image as ImageIcon, Hash, Reply, Trash2,
  PanelRightClose, PanelRightOpen, Sparkles, Bell, ShieldCheck, Layers,
  Workflow, Scale, Cpu, Server, Zap
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
  type: 'file' | 'image' | 'order' | 'schedule';
  size?: string;
  url?: string;
  code?: string;
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
  type: 'group' | 'direct';
  hubCode: string;
  description: string;
  avatarBg: string;
  initials: string;
  isPinned?: boolean;
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
    avatarBg: 'linear-gradient(135deg, #0284C7, #0369a1)',
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
    id: 'room-executive',
    name: 'Ban Điều Hành & Các Đầu Mối AVG',
    type: 'group',
    hubCode: 'ĐIỀU HÀNH 24/7',
    description: 'Kênh điều hành chung, tổng kết công việc thường ngày lúc 16:00 và ban hành VBKL toàn hệ thống.',
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
    hubCode: 'CỤM 5.1',
    description: 'Phối hợp tiếp nhận yêu cầu đầu vào (5.1B), kiểm soát bàn giao đầu ra (5.1T) và tiến độ 13 bước.',
    avatarBg: 'linear-gradient(135deg, #0284C7, #00A8E8)',
    initials: '5.1',
    isPinned: true,
    unreadCount: 1,
    memberIds: ['staff-trang', 'staff-kien', 'staff-tam', 'staff-han', 'staff-trinh']
  },
  {
    id: 'room-cluster-k',
    name: 'Cụm #K – 5 Đầu Mối Thực Thi (#K2B)',
    type: 'group',
    hubCode: 'CỤM #K',
    description: 'Nhóm tác nghiệp trực tiếp của 5 đầu mối Cụm #K, văn phòng làm việc Bà Trang và thư ký tổng.',
    avatarBg: 'linear-gradient(135deg, #0369a1, #0284C7)',
    initials: '#K',
    isPinned: true,
    unreadCount: 0,
    memberIds: ['staff-trang', 'staff-trinh', 'staff-kien', 'staff-nguyet', 'staff-han']
  },
  {
    id: 'room-rdi-31',
    name: '3.1 & 3.2 – Nghiên Cứu R&D & Thiết Kế',
    type: 'group',
    hubCode: 'R&D • 3.1/3.2',
    description: 'Trao đổi hồ sơ kỹ thuật, bản vẽ CAD 3D, mẫu H1 và thử nghiệm bo mạch cảm biến.',
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
    hubCode: '6 - PHÁP LÝ',
    description: 'Rà soát hồ sơ pháp lý dự án, đăng ký nhãn hiệu/SHTT và hợp đồng gia công đối tác.',
    avatarBg: 'linear-gradient(135deg, #059669, #10b981)',
    initials: 'PL',
    isPinned: false,
    unreadCount: 0,
    memberIds: ['staff-huy', 'staff-trang', 'staff-trinh', 'staff-thanh']
  },
  {
    id: 'room-infra-22',
    name: '2.2 & 8 – Hạ Tầng Máy Móc & Gỡ Nghẽn',
    type: 'group',
    hubCode: 'HẠ TẦNG 2.2',
    description: 'Giám sát thiết bị nhà máy, bảo mật hệ thống ISO 27001 và xử lý điểm nghẽn vận hành.',
    avatarBg: 'linear-gradient(135deg, #ea580c, #f97316)',
    initials: '2.2',
    isPinned: false,
    unreadCount: 0,
    memberIds: ['staff-han', 'staff-nam', 'staff-kien', 'staff-trinh']
  },
  // Direct 1-1 rooms
  {
    id: 'dm-staff-trang',
    name: 'Bà Trang (#K2B)',
    type: 'direct',
    hubCode: 'CỤM #K',
    description: 'Trao đổi trực tiếp 1-1 với Bà Trang – Thư Ký Tổng & Điều Phối #K2B',
    avatarBg: 'linear-gradient(135deg, #F15A24, #d9460f)',
    initials: 'BT',
    unreadCount: 1,
    memberIds: ['staff-trang'],
    directPartnerId: 'staff-trang'
  },
  {
    id: 'dm-staff-kien',
    name: 'Kiên (Điều Hành)',
    type: 'direct',
    hubCode: 'ĐIỀU HÀNH',
    description: 'Trao đổi trực tiếp 1-1 với Kiên – Điều Hành & Thư Ký Tổng Kết',
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
    hubCode: '6 - PHÁP LÝ',
    description: 'Trao đổi trực tiếp 1-1 với Ông Vũ Quốc Huy – Cố Vấn Pháp Lý & Sản Xuất',
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
    hubCode: '5.1B',
    description: 'Trao đổi trực tiếp 1-1 với Đinh Hoàng Ngọc Hân – Thư Ký & Đầu Mối 5.1B',
    avatarBg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    initials: 'NH',
    unreadCount: 0,
    memberIds: ['staff-han'],
    directPartnerId: 'staff-han'
  },
  {
    id: 'dm-staff-tam',
    name: 'Lê Trần Thiện Tâm',
    type: 'direct',
    hubCode: '5.1T',
    description: 'Trao đổi trực tiếp 1-1 với Lê Trần Thiện Tâm – Chuyên Viên Đầu Mối 5.1T',
    avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    initials: 'TT',
    unreadCount: 0,
    memberIds: ['staff-tam'],
    directPartnerId: 'staff-tam'
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
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
          code: 'CAL-66'
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
      content: 'Đã cập nhật biên bản VBKL các cuộc họp ngày 20/11 – 23/11 lên Sheet 24/7. Các đầu mối Cụm 5 và 5.1B kiểm tra lại tiến độ đơn hàng trước 15:45 nhé.',
      timestamp: '14:45',
      dateStr: '25/11/2026',
      attachments: [
        {
          id: 'att-doc-1',
          name: 'Tong_Hop_VBKL_Thang11_2026.pdf',
          type: 'file',
          size: '1.4 MB'
        }
      ],
      reactions: [{ emoji: '🔥', count: 5, reactedByMe: true }]
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
          code: 'DH-2026-108'
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

const QUICK_ORDER_TAGS = [
  { code: 'DH-2026-108', name: 'Đơn hàng #DH-2026-108: Thiết kế & Chế tạo Mẫu H1' },
  { code: 'DH-2026-112', name: 'Đơn hàng #DH-2026-112: Gia công Lô Cảm Biến AVG-X' },
  { code: 'DH-2026-115', name: 'Đơn hàng #DH-2026-115: Hồ sơ SHTT & Hợp chuẩn' }
];

const QUICK_SCHEDULE_TAGS = [
  { code: 'CAL-66', name: 'Lịch #66 (25/11 - 16:00): Tổng kết công việc thường ngày' },
  { code: 'CAL-63', name: 'Lịch #63 (21/11 - 14:30): Trao đổi cụm 5' },
  { code: 'CAL-61', name: 'Lịch #61 (20/11 - 11:00): Trao đổi hợp tác về hoạt động gia công' }
];

const STORAGE_ROOMS_KEY = 'avg_internal_chat_rooms_v1';
const STORAGE_MSGS_KEY = 'avg_internal_chat_messages_v1';

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

  const [activeRoomId, setActiveRoomId] = useState<string>('room-executive');
  const [filterTab, setFilterTab] = useState<'all' | 'groups' | 'direct'>('all');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [msgSearch, setMsgSearch] = useState<string>('');
  const [showMsgSearch, setShowMsgSearch] = useState<boolean>(false);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(true);

  // Compose state
  const [inputText, setInputText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<ChatAttachment[]>([]);
  const [showTagPicker, setShowTagPicker] = useState<'none' | 'order' | 'schedule'>('none');

  // Create group modal state
  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupHubCode, setNewGroupHubCode] = useState<string>('CỤM 5.1');
  const [newGroupDesc, setNewGroupDesc] = useState<string>('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(['staff-trang', 'staff-kien']);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Persist rooms & messages
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

  // Listen to header events
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && ['all', 'groups', 'direct'].includes(e.detail)) {
        setFilterTab(e.detail);
      }
    };
    const handleOpenCreateGroup = () => {
      setShowCreateGroupModal(true);
    };
    window.addEventListener('chat_filter_tab_change', handleTabChange);
    window.addEventListener('chat_open_create_group', handleOpenCreateGroup);
    return () => {
      window.removeEventListener('chat_filter_tab_change', handleTabChange);
      window.removeEventListener('chat_open_create_group', handleOpenCreateGroup);
    };
  }, []);

  // Sync active filterTab back to ChatHeader
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chat_filter_tab_sync', { detail: filterTab }));
  }, [filterTab]);

  // Scroll to bottom when active room or messages change
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

  const roomMembers = useMemo(() => {
    return AVG_CHAT_STAFF.filter((s) => activeRoom.memberIds.includes(s.id));
  }, [activeRoom]);

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((r) => {
        if (filterTab === 'groups' && r.type !== 'group') return false;
        if (filterTab === 'direct' && r.type !== 'direct') return false;
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
  }, [rooms, filterTab, sidebarSearch]);

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setReplyingTo(null);
    setShowTagPicker('none');
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
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
      hubCode: member.hub,
      description: `Trao đổi trực tiếp 1-1 với ${member.name} – ${member.role}`,
      avatarBg: member.avatarBg,
      initials: member.initials,
      unreadCount: 0,
      memberIds: [member.id],
      directPartnerId: member.id
    };
    setRooms((prev) => [newDm, ...prev]);
    setActiveRoomId(newDm.id);
    showToast(`Đã mở hội thoại trực tiếp với ${member.name}`);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && pendingAttachments.length === 0) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', {
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
      senderAvatarBg: 'linear-gradient(135deg, #F15A24, #ff7043)',
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
    setShowTagPicker('none');
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
    showToast('Đã cập nhật trạng thái ghim tin nhắn');
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
      hubCode: newGroupHubCode,
      description:
        newGroupDesc.trim() ||
        `Nhóm phối hợp tác nghiệp ${newGroupHubCode} (${selectedMemberIds.length} thành viên)`,
      avatarBg: 'linear-gradient(135deg, #0284C7, #F15A24)',
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
          senderAvatarBg: 'linear-gradient(135deg, #F15A24, #ff7043)',
          content: `Đã khởi tạo nhóm trao đổi "${newRoom.name}" thuộc đầu mối ${newGroupHubCode}.`,
          timestamp: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          dateStr: '25/11/2026',
          isMe: true,
          isPinned: true
        }
      ]
    }));
    setActiveRoomId(newRoom.id);
    setShowCreateGroupModal(false);
    setNewGroupName('');
    setNewGroupDesc('');
    showToast(`Đã tạo nhóm chat "${newRoom.name}" thành công!`);
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-2.5 sm:p-3.5 relative flex flex-col">
      {/* 🌐 GRID LINES PATTERN BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-40 pointer-events-none -z-0" />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#F15A24] text-white px-4 py-2.5 rounded-full shadow-xl border border-[#D9460F] text-xs font-bold flex items-center gap-2">
          <Bell className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* BỐ CỤC 3 CỘT CHUẨN ENTERPRISE CHAT */}
      <div className="w-full h-full flex-1 min-h-0 flex gap-3 relative z-10 overflow-hidden">
        {/* ========================================================================= */}
        {/* CỘT 1 (TRÁI): DANH SÁCH KÊNH CỤM / ĐẦU MỐI & CHAT CÁ NHÂN 1-1 */}
        {/* ========================================================================= */}
        <aside className="w-72 sm:w-80 lg:w-[330px] shrink-0 h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xs">
          {/* Ô tìm kiếm & Bộ lọc nhanh dạng hộp viên thuốc */}
          <div className="p-3 border-b border-slate-200/80 dark:border-slate-800 space-y-2.5 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="Tìm cụm đầu mối, nhân sự..."
                className="w-full h-8.5 pl-9 pr-8 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#F15A24] font-medium transition"
              />
              {sidebarSearch && (
                <button
                  onClick={() => setSidebarSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Cụm nút lọc viên thuốc */}
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: `Tất cả (${rooms.length})` },
                { id: 'groups', label: `Nhóm Cụm (${rooms.filter((r) => r.type === 'group').length})` },
                { id: 'direct', label: `Cá nhân (${rooms.filter((r) => r.type === 'direct').length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterTab(tab.id as any)}
                  className={`flex-1 py-1 px-2.5 rounded-full text-[11px] transition cursor-pointer select-none whitespace-nowrap ${
                    filterTab === tab.id
                      ? 'bg-[#F15A24] text-white font-bold shadow-2xs'
                      : 'bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Danh sách Phòng Chat / Hội thoại */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 scrollbar-thin">
            {filteredRooms.map((room) => {
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
                  className={`p-3 flex items-start gap-2.5 cursor-pointer transition select-none ${
                    isSelected
                      ? 'bg-orange-50/90 dark:bg-orange-950/30 border-l-4 border-l-[#F15A24]'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      style={{ background: room.avatarBg }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs shadow-2xs"
                    >
                      {room.initials}
                    </div>
                    {room.type === 'direct' && partner && (
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                          partner.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      />
                    )}
                  </div>

                  {/* Nội dung tóm tắt */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs truncate ${
                          isSelected || room.unreadCount > 0
                            ? 'font-black text-slate-900 dark:text-white'
                            : 'font-bold text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {room.name}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                        {lastMsg ? lastMsg.timestamp : '24/7'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-2 py-0.2 rounded-full bg-[#EEEEEE] dark:bg-slate-800 text-[9.5px] font-extrabold text-slate-600 dark:text-slate-300">
                        {room.hubCode}
                      </span>
                      {room.isPinned && (
                        <Pin className="w-3 h-3 text-[#F15A24] rotate-45 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {lastMsg
                          ? `${lastMsg.isMe ? 'Bạn: ' : `${lastMsg.senderName.split(' ')[0]}: `}${lastMsg.content || '[Đính kèm tài liệu]'}`
                          : room.description}
                      </p>
                      {room.unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#F15A24] text-white text-[10px] font-black shrink-0">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Danh bạ nhanh Nhân sự trực tuyến dưới chân cột trái */}
          <div className="p-2.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 shrink-0">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Nhân sự trực tuyến ({AVG_CHAT_STAFF.filter((s) => s.isOnline).length}/{AVG_CHAT_STAFF.length})
              </span>
              <button
                type="button"
                onClick={() => setShowCreateGroupModal(true)}
                className="text-[10px] font-extrabold text-[#F15A24] hover:underline cursor-pointer"
              >
                + Nhóm mới
              </button>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {AVG_CHAT_STAFF.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleStartDirectChat(member)}
                  title={`${member.name} (${member.hub}) - Click để chat 1-1`}
                  className="relative shrink-0 group cursor-pointer"
                >
                  <div
                    style={{ background: member.avatarBg }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] shadow-2xs group-hover:scale-105 transition-transform"
                  >
                    {member.initials}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white dark:border-slate-900 ${
                      member.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* CỘT 2 (GIỮA): KHUNG HỘI THOẠI TRỰC TUYẾN THỜI GIAN THỰC */}
        {/* ========================================================================= */}
        <main className="flex-1 min-w-0 h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xs">
          {/* Header Phòng Chat */}
          <div className="px-4 py-2.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 min-w-0">
              <div
                style={{ background: activeRoom.avatarBg }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs shadow-2xs shrink-0"
              >
                {activeRoom.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                    {activeRoom.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-[#F15A24] border border-orange-200/70 dark:border-orange-800 text-[10px] font-extrabold">
                    {activeRoom.hubCode}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {activeRoom.type === 'group'
                    ? `${activeRoom.memberIds.length} thành viên đầu mối • Đồng bộ trực tuyến 24/7`
                    : activeRoom.description}
                </p>
              </div>
            </div>

            {/* Cụm nút tiện ích góc phải Header phòng chat */}
            <div className="flex items-center gap-1.5 shrink-0">
              {showMsgSearch && (
                <div className="relative w-44 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={msgSearch}
                    onChange={(e) => setMsgSearch(e.target.value)}
                    placeholder="Tìm trong hội thoại..."
                    autoFocus
                    className="w-full h-8 pl-8 pr-7 text-xs bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#F15A24]"
                  />
                  {msgSearch && (
                    <button
                      onClick={() => setMsgSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowMsgSearch((prev) => !prev);
                  if (showMsgSearch) setMsgSearch('');
                }}
                title="Tìm kiếm tin nhắn trong hội thoại"
                className={`h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  showMsgSearch
                    ? 'bg-[#F15A24] text-white'
                    : 'bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tìm tin</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRightPanel((prev) => !prev)}
                title={showRightPanel ? 'Ẩn cột thông tin đầu mối' : 'Hiện cột thông tin đầu mối'}
                className="h-8 px-3 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {showRightPanel ? (
                  <PanelRightClose className="w-3.5 h-3.5" />
                ) : (
                  <PanelRightOpen className="w-3.5 h-3.5" />
                )}
                <span className="hidden md:inline">Thông tin</span>
              </button>
            </div>
          </div>

          {/* Thanh Ghim Tin Nhắn Quan Trọng (Nếu có) */}
          {pinnedMessages.length > 0 && (
            <div className="px-4 py-2 bg-orange-50/80 dark:bg-orange-950/30 border-b border-orange-200/70 dark:border-orange-900/50 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F15A24] text-white text-[10px] font-extrabold inline-flex items-center gap-1 shrink-0">
                  <Pin className="w-3 h-3" />
                  <span>TIN GHIM ({pinnedMessages.length})</span>
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  <strong>{pinnedMessages[pinnedMessages.length - 1].senderName}:</strong>{' '}
                  {pinnedMessages[pinnedMessages.length - 1].content}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleTogglePinMessage(pinnedMessages[pinnedMessages.length - 1].id)
                }
                className="text-[11px] font-bold text-slate-400 hover:text-rose-600 shrink-0 cursor-pointer"
              >
                Bỏ ghim
              </button>
            </div>
          )}

          {/* Danh sách Tin nhắn trong phòng */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin bg-slate-50/40 dark:bg-slate-950/40">
            <div className="flex justify-center">
              <span className="px-3.5 py-1 rounded-full bg-[#EEEEEE] dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                Hôm nay, 25/11/2026
              </span>
            </div>

            {currentRoomMessages.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs font-semibold">
                Chưa có tin nhắn nào trong hội thoại này. Hãy gửi tin nhắn đầu tiên!
              </div>
            ) : (
              currentRoomMessages.map((msg) => {
                const isMe = Boolean(msg.isMe);
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 group ${
                      isMe ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar người gửi */}
                    <div
                      style={{ background: msg.senderAvatarBg }}
                      className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-white font-black text-[11px] shrink-0 shadow-2xs mt-0.5"
                    >
                      {msg.senderInitials}
                    </div>

                    {/* Khối nội dung tin nhắn */}
                    <div
                      className={`max-w-[78%] sm:max-w-[70%] flex flex-col ${
                        isMe ? 'items-end' : 'items-start'
                      }`}
                    >
                      {/* Tên người gửi + Đầu mối + Giờ */}
                      <div
                        className={`flex items-center gap-1.5 mb-1 px-1 ${
                          isMe ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          {msg.senderName}
                        </span>
                        <span className="px-2 py-0.2 rounded-full bg-[#EEEEEE] dark:bg-slate-800 text-[9.5px] font-bold text-slate-600 dark:text-slate-300">
                          {msg.senderHub}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {msg.timestamp}
                        </span>
                        {msg.isPinned && (
                          <Pin className="w-3 h-3 text-[#F15A24] rotate-45" />
                        )}
                      </div>

                      {/* Hộp bóng thoại */}
                      <div
                        className={`relative px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                          isMe
                            ? 'bg-[#F15A24] text-white rounded-tr-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-xs'
                        }`}
                      >
                        {/* Trích dẫn tin nhắn trả lời */}
                        {msg.replyTo && (
                          <div
                            className={`mb-2 px-2.5 py-1.5 rounded-xl text-[11px] border-l-2 ${
                              isMe
                                ? 'bg-white/15 border-l-white text-white/95'
                                : 'bg-slate-100 dark:bg-slate-900/70 border-l-[#F15A24] text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <div className="font-extrabold">{msg.replyTo.senderName}</div>
                            <div className="truncate opacity-90">{msg.replyTo.content}</div>
                          </div>
                        )}

                        {/* Văn bản tin nhắn */}
                        {msg.content && (
                          <div className="whitespace-pre-line font-medium">{msg.content}</div>
                        )}

                        {/* Danh sách tệp / thẻ Đơn hàng / Lịch trao đổi đính kèm */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1.5">
                            {msg.attachments.map((att) => (
                              <div
                                key={att.id}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
                                  isMe
                                    ? 'bg-white/20 text-white'
                                    : att.type === 'order'
                                      ? 'bg-sky-50 dark:bg-sky-950/50 text-[#0284C7] border border-sky-200/70'
                                      : att.type === 'schedule'
                                        ? 'bg-orange-50 dark:bg-orange-950/50 text-[#F15A24] border border-orange-200/70'
                                        : 'bg-[#EEEEEE] dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{att.name}</span>
                                {att.size && (
                                  <span className="text-[10px] opacity-75 shrink-0">
                                    ({att.size})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hàng biểu cảm (Reactions) & Thanh công cụ nhanh khi hover */}
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {msg.reactions &&
                          msg.reactions.map((r) => (
                            <button
                              key={r.emoji}
                              type="button"
                              onClick={() => handleToggleReaction(msg.id, r.emoji)}
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition cursor-pointer ${
                                r.reactedByMe
                                  ? 'bg-orange-100 dark:bg-orange-950/70 text-[#F15A24] border border-orange-300'
                                  : 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span>{r.emoji}</span>
                              <span>{r.count}</span>
                            </button>
                          ))}

                        {/* Cụm thao tác nhanh hiện khi di chuột */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          {['👍', '❤️', '🔥', '✅'].map((emo) => (
                            <button
                              key={emo}
                              type="button"
                              onClick={() => handleToggleReaction(msg.id, emo)}
                              className="w-6 h-6 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-xs flex items-center justify-center cursor-pointer"
                              title={`Thả biểu cảm ${emo}`}
                            >
                              {emo}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setReplyingTo(msg)}
                            className="px-2 py-0.5 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 inline-flex items-center gap-1 cursor-pointer"
                            title="Trả lời tin nhắn"
                          >
                            <Reply className="w-3 h-3" />
                            <span>Trả lời</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTogglePinMessage(msg.id)}
                            className="px-2 py-0.5 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 inline-flex items-center gap-1 cursor-pointer"
                            title={msg.isPinned ? 'Bỏ ghim' : 'Ghim tin nhắn'}
                          >
                            <Pin className="w-3 h-3" />
                            <span>{msg.isPinned ? 'Bỏ ghim' : 'Ghim'}</span>
                          </button>
                          {isMe && (
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1 rounded-full bg-[#EEEEEE] hover:bg-rose-100 text-slate-500 hover:text-rose-600 cursor-pointer"
                              title="Thu hồi tin nhắn"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Khu vực Soạn thảo & Đính kèm (Hộp viên thuốc đồng bộ) */}
          <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shrink-0">
            {/* Hộp chọn gắn thẻ Đơn hàng hoặc Lịch trao đổi */}
            {showTagPicker !== 'none' && (
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
                  <span>
                    {showTagPicker === 'order'
                      ? 'CHỌN ĐƠN HÀNG ĐỂ GẮN THẺ VÀO HỘI THOẠI'
                      : 'CHỌN LỊCH TRAO ĐỔI ĐỂ GẮN THẺ VÀO HỘI THOẠI'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowTagPicker('none')}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(showTagPicker === 'order' ? QUICK_ORDER_TAGS : QUICK_SCHEDULE_TAGS).map(
                    (item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setPendingAttachments((prev) => [
                            ...prev,
                            {
                              id: `tag-${Date.now()}-${item.code}`,
                              name: item.name,
                              type: showTagPicker === 'order' ? 'order' : 'schedule',
                              code: item.code
                            }
                          ]);
                          setShowTagPicker('none');
                        }}
                        className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#F15A24] text-xs font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer"
                      >
                        {item.name}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Thanh hiển thị tin đang trả lời hoặc tệp đính kèm chờ gửi */}
            {(replyingTo || pendingAttachments.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 px-2">
                {replyingTo && (
                  <div className="px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-200 text-xs flex items-center gap-2">
                    <Reply className="w-3.5 h-3.5 text-[#F15A24]" />
                    <span className="truncate max-w-[260px]">
                      Trả lời <strong>{replyingTo.senderName}</strong>: {replyingTo.content}
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="text-slate-400 hover:text-rose-600 font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {pendingAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="px-3 py-1 rounded-full bg-[#EEEEEE] dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span className="truncate max-w-[220px]">{att.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAttachments((prev) => prev.filter((a) => a.id !== att.id))
                      }
                      className="text-slate-400 hover:text-rose-600 font-bold cursor-pointer ml-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Cụm nút công cụ đính kèm nhanh dạng hộp viên thuốc */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                <span>Đính kèm tệp / Ảnh</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowTagPicker((prev) => (prev === 'order' ? 'none' : 'order'))
                }
                className={`px-3 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  showTagPicker === 'order'
                    ? 'bg-[#0284C7] text-white'
                    : 'bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Gắn thẻ Đơn hàng (#DH)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowTagPicker((prev) => (prev === 'schedule' ? 'none' : 'schedule'))
                }
                className={`px-3 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  showTagPicker === 'schedule'
                    ? 'bg-[#F15A24] text-white'
                    : 'bg-[#EEEEEE] hover:bg-[#E4E6EB] dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gắn thẻ Lịch trao đổi</span>
              </button>
            </div>

            {/* Ô nhập tin nhắn viên thuốc & Nút Gửi */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Nhập nội dung trao đổi tới ${activeRoom.name}...`}
                className="flex-1 h-10 px-4 text-xs sm:text-[13px] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#F15A24] font-medium transition"
              />
              <button
                type="submit"
                className="h-10 px-5 rounded-full bg-[#F15A24] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-[13px] inline-flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer shrink-0 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </button>
            </form>
          </div>
        </main>

        {/* ========================================================================= */}
        {/* CỘT 3 (PHẢI): THÔNG TIN ĐẦU MỐI, THÀNH VIÊN & TÀI LIỆU ĐÃ CHIA SẺ */}
        {/* ========================================================================= */}
        {showRightPanel && (
          <aside className="hidden xl:flex w-76 shrink-0 h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl p-3.5 flex-col justify-between overflow-y-auto scrollbar-thin shadow-xs space-y-3">
            <div className="space-y-3.5">
              {/* Tóm tắt Đầu mối / Phòng họp */}
              <div className="text-center pb-3 border-b border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div
                  style={{ background: activeRoom.avatarBg }}
                  className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white font-black text-base shadow-sm"
                >
                  {activeRoom.initials}
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                  {activeRoom.name}
                </h3>
                <span className="inline-block px-3 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-[#F15A24] text-[10px] font-extrabold border border-orange-200/60">
                  {activeRoom.hubCode}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  {activeRoom.description}
                </p>
              </div>

              {/* Thành viên tham gia */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Thành viên ({roomMembers.length})
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {roomMembers.filter((m) => m.isOnline).length} trực tuyến
                  </span>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5 scrollbar-thin">
                  {roomMembers.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleStartDirectChat(m)}
                      title="Click để nhắn tin riêng 1-1"
                      className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-orange-50/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative shrink-0">
                          <div
                            style={{ background: m.avatarBg }}
                            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                          >
                            {m.initials}
                          </div>
                          <span
                            className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white dark:border-slate-900 ${
                              m.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                            {m.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {m.role}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#EEEEEE] dark:bg-slate-700 text-[9px] font-extrabold text-slate-600 dark:text-slate-300 shrink-0">
                        {m.hub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tài liệu, Đơn hàng & Lịch đã chia sẻ */}
              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Tài liệu & Thẻ đính kèm ({sharedAttachments.length})
                </div>
                {sharedAttachments.length === 0 ? (
                  <div className="text-[11px] text-slate-400 italic">
                    Chưa có tệp hoặc thẻ đính kèm nào.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {sharedAttachments.map((att) => (
                      <div
                        key={att.id}
                        className="px-3 py-1.5 rounded-full bg-[#EEEEEE] dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#F15A24] shrink-0" />
                        <span className="truncate">{att.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Hộp Đầu mối Hỗ trợ Trực tuyến */}
            <div className="bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 p-3 rounded-2xl space-y-1.5 text-[11px] shrink-0">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#F15A24]">
                Đầu Mối Điều Phối Chat 24/7
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Thư ký tổng:</span>
                <strong className="font-extrabold text-slate-900 dark:text-white">
                  #K2B (Bà Trang)
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Điều hành:</span>
                <strong className="font-extrabold text-slate-900 dark:text-white">
                  Ông Trịnh / Kiên
                </strong>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* MODAL: TẠO NHÓM CHAT CỤM / ĐẦU MỐI MỚI */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase">
                Tạo Nhóm Chat Nội Bộ Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateGroupModal(false)}
                className="w-7 h-7 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] flex items-center justify-center text-slate-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Tên nhóm trao đổi *
                </label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="VD: Tổ Công Tác Dự Án Trà – Cụm 5"
                  className="w-full h-9 px-3.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#F15A24]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Cụm / Đầu mối phụ trách
                </label>
                <select
                  value={newGroupHubCode}
                  onChange={(e) => setNewGroupHubCode(e.target.value)}
                  className="w-full h-9 px-3.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#F15A24]"
                >
                  <option value="ĐIỀU HÀNH 24/7">ĐIỀU HÀNH 24/7</option>
                  <option value="CỤM 5.1">CỤM 5.1 (5.1B & 5.1T)</option>
                  <option value="CỤM #K">CỤM #K (5 Đầu Mối Thực Thi)</option>
                  <option value="R&D • 3.1/3.2">R&D • 3.1 Nghiên cứu & 3.2 Thiết kế</option>
                  <option value="6 - PHÁP LÝ">6 - PHÁP LÝ & SHTT</option>
                  <option value="HẠ TẦNG 2.2">HẠ TẦNG 2.2 & BẢO MẬT</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Mô tả mục tiêu nhóm
                </label>
                <input
                  type="text"
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="Nhập mô tả ngắn gọn..."
                  className="w-full h-9 px-3.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#F15A24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Chọn thành viên tham gia ({selectedMemberIds.length})
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
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
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                          checked
                            ? 'bg-[#F15A24] text-white'
                            : 'bg-[#EEEEEE] dark:bg-slate-800 text-slate-700 dark:text-slate-300'
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
                  className="h-9 px-4 rounded-full bg-[#EEEEEE] hover:bg-[#E4E6EB] text-slate-700 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-full bg-[#F15A24] hover:bg-[#D9460F] text-white font-bold cursor-pointer"
                >
                  Tạo nhóm ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
