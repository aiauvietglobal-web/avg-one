import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageSquare, Search, Send, Paperclip, Pin, Users, User, Plus,
  FileText, Image as ImageIcon, Hash, Reply, Trash2,
  PanelRightClose, PanelRightOpen, Bell, Phone, Video, Smile,
  UserPlus, CheckCheck, Cloud, Contact, Calendar, CheckSquare,
  ChevronDown, ChevronRight, Link2, BellOff, Star, MoreHorizontal, ThumbsUp
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
  type: 'file' | 'image' | 'order' | 'schedule' | 'contact';
  size?: string;
  url?: string;
  code?: string;
  subText?: string;
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
    name: 'Cloud của tôi (Lưu trữ cá nhân)',
    type: 'cloud',
    hubCode: 'CLOUD 24/7',
    tagColor: '#0068FF',
    description: 'Lưu trữ và đồng bộ nhanh tài liệu, biên bản VBKL, hình ảnh và ghi chú cá nhân giữa các thiết bị.',
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
    hubCode: 'ĐIỀU HÀNH 24/7',
    tagColor: '#F15A24',
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
    tagColor: '#0068FF',
    description: 'Phối hợp tiếp nhận yêu cầu đầu vào (5.1B), kiểm soát bàn giao đầu ra (5.1T) và tiến độ 13 bước.',
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
    hubCode: 'CỤM #K',
    tagColor: '#0284C7',
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
    tagColor: '#7C3AED',
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
    tagColor: '#059669',
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
    tagColor: '#EA580C',
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
    tagColor: '#F15A24',
    description: 'Thư Ký Tổng & Điều Phối #K2B',
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
    hubCode: '6 - PHÁP LÝ',
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
    hubCode: '5.1B',
    tagColor: '#EC4899',
    description: 'Thư Ký & Đầu Mối 5.1B / 2.2',
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
    tagColor: '#D97706',
    description: 'Chuyên Viên Đầu Mối 5.1T',
    avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    initials: 'TT',
    unreadCount: 0,
    memberIds: ['staff-tam'],
    directPartnerId: 'staff-tam'
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

const QUICK_ORDER_TAGS = [
  {
    code: 'DH-2026-108',
    name: 'Đơn hàng #DH-2026-108: Thiết kế & Chế tạo Mẫu H1',
    subText: 'Đầu mối: 5.1B ➔ 3.1 RDI • Trạng thái: Trọng điểm'
  },
  {
    code: 'DH-2026-112',
    name: 'Đơn hàng #DH-2026-112: Gia công Lô Cảm Biến AVG-X',
    subText: 'Đầu mối: Cụm #K ➔ 2.1 Sản xuất • Trạng thái: Đang chạy'
  },
  {
    code: 'DH-2026-115',
    name: 'Đơn hàng #DH-2026-115: Hồ sơ SHTT & Hợp chuẩn',
    subText: 'Đầu mối: 6 - Pháp lý • Trạng thái: Chờ duyệt'
  }
];

const QUICK_SCHEDULE_TAGS = [
  {
    code: 'CAL-66',
    name: 'Lịch #66 (25/11 - 16:00): Tổng kết công việc thường ngày',
    subText: 'Phạm vi: P1 • Điều hành: Kiên • Thư ký: Kiên'
  },
  {
    code: 'CAL-63',
    name: 'Lịch #63 (21/11 - 14:30): Trao đổi cụm 5',
    subText: 'Phạm vi: P1 • Thành phần: Cụm 5 • Thư ký: 5.2B'
  },
  {
    code: 'CAL-61',
    name: 'Lịch #61 (20/11 - 11:00): Trao đổi hợp tác về hoạt động gia công',
    subText: 'Phạm vi: P1 • Điều hành: Bà Trang TM AVG'
  }
];

const STORAGE_ROOMS_KEY = 'avg_internal_chat_rooms_v2';
const STORAGE_MSGS_KEY = 'avg_internal_chat_messages_v2';

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

  // Zalo Left Rail Main View: 'messages' | 'contacts'
  const [railNav, setRailNav] = useState<'messages' | 'contacts'>('messages');
  const [activeRoomId, setActiveRoomId] = useState<string>('room-executive');

  // Zalo Sidebar Filter Tabs: 'all' | 'unread' + Category dropdown ('all' | 'groups' | 'direct')
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [filterTab, setFilterTab] = useState<'all' | 'groups' | 'direct'>('all');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [msgSearch, setMsgSearch] = useState<string>('');
  const [showMsgSearch, setShowMsgSearch] = useState<boolean>(false);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(true);

  // Collapsible sections in Zalo Right Sidebar
  const [openRightSections, setOpenRightSections] = useState<{
    members: boolean;
    board: boolean;
    files: boolean;
    links: boolean;
  }>({
    members: true,
    board: true,
    files: true,
    links: true
  });

  // Compose state
  const [inputText, setInputText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<ChatAttachment[]>([]);
  const [showTagPicker, setShowTagPicker] = useState<'none' | 'order' | 'schedule' | 'contact' | 'emoji'>('none');

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
        setRailNav('messages');
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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chat_filter_tab_sync', { detail: filterTab }));
  }, [filterTab]);

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

  const totalUnreadCount = useMemo(
    () => rooms.reduce((sum, r) => sum + (r.unreadCount || 0), 0),
    [rooms]
  );

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((r) => {
        if (unreadOnly && r.unreadCount === 0) return false;
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
  }, [rooms, unreadOnly, filterTab, sidebarSearch]);

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setRailNav('messages');
    setReplyingTo(null);
    setShowTagPicker('none');
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
  };

  const handleTogglePinRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, isPinned: !r.isPinned } : r))
    );
    showToast('Đã cập nhật ghim hội thoại');
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
      tagColor: '#0068FF',
      description: member.role,
      avatarBg: member.avatarBg,
      initials: member.initials,
      unreadCount: 0,
      memberIds: [member.id],
      directPartnerId: member.id
    };
    setRooms((prev) => [newDm, ...prev]);
    setActiveRoomId(newDm.id);
    setRailNav('messages');
    showToast(`Đã mở trò chuyện với ${member.name}`);
  };

  const handleSendQuickLike = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', {
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
    showToast('Đã cập nhật tin nhắn ghim trên đầu phòng');
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
      tagColor: '#0068FF',
      description:
        newGroupDesc.trim() ||
        `Nhóm phối hợp tác nghiệp ${newGroupHubCode} (${selectedMemberIds.length} thành viên)`,
      avatarBg: 'linear-gradient(135deg, #0068FF, #F15A24)',
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
    showToast(`Đã tạo nhóm "${newRoom.name}" thành công!`);
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-hidden bg-white dark:bg-slate-950 text-[#081C36] dark:text-slate-100 font-sans flex relative select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#F15A24] text-white px-4 py-2.5 rounded-full shadow-xl border border-[#D9460F] text-xs font-bold flex items-center gap-2">
          <Bell className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. THANH ĐIỀU HƯỚNG DỌC BÊN TRÁI CHUẨN ZALO PC (ZALO BLUE #0068FF RAIL) */}
      {/* ========================================================================= */}
      <nav className="w-16 shrink-0 h-full bg-[#0068FF] dark:bg-slate-900 border-r border-[#0052CC] dark:border-slate-800 flex flex-col items-center justify-between py-3 text-white z-20">
        {/* Cụm trên: Avatar người dùng + Các tab chính (Tin nhắn, Danh bạ, Cloud của tôi) */}
        <div className="flex flex-col items-center gap-2 w-full">
          {/* Avatar đại diện có chấm xanh Online */}
          <button
            type="button"
            onClick={() => handleSelectRoom('room-executive')}
            title="Ban Điều Hành AVG One (Đang trực tuyến)"
            className="relative mb-2 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F15A24] to-amber-500 border-2 border-white/90 flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
              AVG
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0068FF]" />
          </button>

          {/* Nút 1: Tin nhắn (Messages) */}
          <button
            type="button"
            onClick={() => setRailNav('messages')}
            title="Tin nhắn"
            className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition cursor-pointer ${
              railNav === 'messages'
                ? 'bg-[#0052CC] dark:bg-slate-800 text-white shadow-inner'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <MessageSquare className="w-6 h-6 stroke-[2]" />
            {totalUnreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E53935] text-white text-[10px] font-black flex items-center justify-center border border-[#0068FF]">
                {totalUnreadCount}
              </span>
            )}
          </button>

          {/* Nút 2: Danh bạ Nhân sự & Cụm đầu mối (Contacts Directory) */}
          <button
            type="button"
            onClick={() => setRailNav('contacts')}
            title="Danh bạ Nhân sự & Cụm Đầu Mối"
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition cursor-pointer ${
              railNav === 'contacts'
                ? 'bg-[#0052CC] dark:bg-slate-800 text-white shadow-inner'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Contact className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Nút 3: Cloud của tôi (Zalo My Cloud) */}
          <button
            type="button"
            onClick={() => handleSelectRoom('room-cloud')}
            title="Cloud của tôi (Lưu trữ tài liệu cá nhân)"
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition cursor-pointer ${
              activeRoom.id === 'room-cloud' && railNav === 'messages'
                ? 'bg-[#0052CC] dark:bg-slate-800 text-white shadow-inner'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Cloud className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Cụm dưới: Tạo nhóm nhanh */}
        <div className="flex flex-col items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => setShowCreateGroupModal(true)}
            title="Tạo nhóm chat Cụm / Đầu mối mới"
            className="w-11 h-11 rounded-xl text-white/85 hover:bg-white/15 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <UserPlus className="w-5.5 h-5.5" />
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. CỘT DANH SÁCH HỘI THOẠI / DANH BẠ CHUẨN ZALO (PHẲNG, SẮC NÉT, FULL-HEIGHT) */}
      {/* ========================================================================= */}
      <aside className="w-80 sm:w-[340px] shrink-0 h-full bg-white dark:bg-slate-900 border-r border-[#E5E7EB] dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Thanh tìm kiếm & 2 nút Tạo Nhóm / Danh bạ chuẩn Zalo */}
        <div className="h-16 px-3.5 flex items-center gap-2 border-b border-[#E5E7EB] dark:border-slate-800 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7589A3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Tìm kiếm nhóm cụm, nhân sự..."
              className="w-full h-8.5 pl-9 pr-7 text-xs bg-[#EBEDF0] dark:bg-slate-800 text-[#081C36] dark:text-white placeholder-[#7589A3] rounded-full border border-transparent focus:bg-white focus:border-[#0068FF] focus:outline-none font-medium transition"
            />
            {sidebarSearch && (
              <button
                onClick={() => setSidebarSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setRailNav(railNav === 'contacts' ? 'messages' : 'contacts')}
            title="Danh bạ nhân sự AVG"
            className="w-8 h-8 rounded-full hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowCreateGroupModal(true)}
            title="Tạo nhóm chat mới"
            className="w-8 h-8 rounded-full hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <Users className="w-4 h-4" />
          </button>
        </div>

        {/* Thanh Tab Lọc chuẩn Zalo: [ Tất cả | Chưa đọc ] + [ Phân loại ] */}
        {railNav === 'messages' ? (
          <>
            <div className="px-3.5 pt-1.5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setUnreadOnly(false)}
                  className={`pb-2 font-bold border-b-2 transition cursor-pointer ${
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
                  className={`pb-2 font-bold border-b-2 transition cursor-pointer flex items-center gap-1 ${
                    unreadOnly
                      ? 'text-[#0068FF] border-[#0068FF]'
                      : 'text-[#7589A3] border-transparent hover:text-[#081C36] dark:hover:text-white'
                  }`}
                >
                  <span>Chưa đọc</span>
                  {totalUnreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black">
                      {totalUnreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Bộ lọc Phân loại viên thuốc góc phải */}
              <div className="pb-1.5 flex items-center gap-1">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'groups', label: 'Nhóm Cụm' },
                  { id: 'direct', label: 'Cá nhân' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilterTab(cat.id as any)}
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition cursor-pointer ${
                      filterTab === cat.id
                        ? 'bg-[#E5EFFF] text-[#0068FF] font-bold'
                        : 'text-[#7589A3] hover:bg-[#EBEDF0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Danh sách Hội thoại Zalo */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#F1F2F4] dark:divide-slate-800/60 scrollbar-thin">
              {filteredRooms.length === 0 ? (
                <div className="py-14 text-center text-xs text-[#7589A3] font-medium px-4">
                  Không tìm thấy cuộc trò chuyện nào phù hợp.
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
                      className={`px-3.5 py-3 flex items-center gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'bg-[#E5EFFF] dark:bg-sky-950/50'
                          : 'hover:bg-[#F3F5F6] dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {/* Avatar tròn lớn 48px chuẩn Zalo */}
                      <div className="relative shrink-0">
                        <div
                          style={{ background: room.avatarBg }}
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm shadow-2xs"
                        >
                          {room.initials}
                        </div>
                        {room.type === 'direct' && partner && (
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                              partner.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                        )}
                        {room.type === 'group' && (
                          <span className="absolute -bottom-0.5 -right-0.5 px-1.5 py-0.2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[9px] font-black text-[#0068FF] shadow-2xs">
                            {room.memberIds.length}
                          </span>
                        )}
                      </div>

                      {/* Nội dung dòng Hội thoại */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {room.type === 'group' && (
                              <Users className="w-3.5 h-3.5 text-[#7589A3] shrink-0" />
                            )}
                            <span
                              className={`text-[13.5px] truncate ${
                                room.unreadCount > 0 || isSelected
                                  ? 'font-bold text-[#081C36] dark:text-white'
                                  : 'font-semibold text-[#081C36] dark:text-slate-200'
                              }`}
                            >
                              {room.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {room.isPinned && (
                              <Pin className="w-3 h-3 text-[#7589A3] rotate-45" />
                            )}
                            <span className="text-[11px] text-[#7589A3]">
                              {lastMsg ? lastMsg.timestamp : 'Hôm nay'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              style={{ color: room.tagColor }}
                              className="text-[10px] font-extrabold shrink-0"
                            >
                              [{room.hubCode}]
                            </span>
                            <p
                              className={`text-xs truncate ${
                                room.unreadCount > 0
                                  ? 'font-bold text-[#081C36] dark:text-white'
                                  : 'text-[#7589A3] dark:text-slate-400'
                              }`}
                            >
                              {lastMsg
                                ? `${lastMsg.isMe ? 'Bạn: ' : `${lastMsg.senderName.split(' ')[0]}: `}${
                                    lastMsg.content || '[Đính kèm tài liệu]'
                                  }`
                                : room.description}
                            </p>
                          </div>

                          {room.unreadCount > 0 && (
                            <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#C81D25] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {room.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          /* CHẾ ĐỘ DANH BẠ NHÂN SỰ & NHÓM ĐẦU MỐI */
          <div className="flex-1 overflow-y-auto divide-y divide-[#F1F2F4] dark:divide-slate-800 scrollbar-thin">
            <div className="px-3.5 py-2 bg-[#F3F5F6] dark:bg-slate-800/70 text-[11px] font-extrabold text-[#7589A3] uppercase tracking-wider">
              Danh bạ Nhân sự & Đầu mối ({AVG_CHAT_STAFF.length})
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
                className="px-3.5 py-2.5 flex items-center justify-between gap-2.5 hover:bg-[#E5EFFF] dark:hover:bg-slate-800 cursor-pointer transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div
                      style={{ background: member.avatarBg }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    >
                      {member.initials}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                        member.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#081C36] dark:text-white truncate">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-[#7589A3] truncate">
                      {member.role}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBEDF0] dark:bg-slate-700 text-[10px] font-extrabold text-[#081C36] dark:text-slate-200 shrink-0">
                  {member.hub}
                </span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 3. KHUNG CHAT TRUNG TÂM CHUẨN ZALO (NỀN XÁM XANH #EEF0F5 + BONG BÓNG ZALO) */}
      {/* ========================================================================= */}
      <main className="flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-[#EEF0F5] dark:bg-slate-950">
        {/* Header Phòng Chat chuẩn Zalo (Cao 64px, nền trắng) */}
        <div className="h-16 px-4 bg-white dark:bg-slate-900 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div
                style={{ background: activeRoom.avatarBg }}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm shadow-2xs"
              >
                {activeRoom.initials}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] sm:text-base font-bold text-[#081C36] dark:text-white truncate">
                  {activeRoom.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#7589A3] mt-0.5">
                {activeRoom.type === 'group' ? (
                  <span className="inline-flex items-center gap-1 hover:text-[#0068FF] cursor-pointer">
                    <User className="w-3.5 h-3.5" />
                    <span>{activeRoom.memberIds.length} thành viên</span>
                  </span>
                ) : (
                  <span className="text-emerald-600 font-semibold">● Đang hoạt động</span>
                )}
                <span>|</span>
                <span
                  style={{ color: activeRoom.tagColor }}
                  className="font-bold text-[11px]"
                >
                  {activeRoom.hubCode}
                </span>
              </div>
            </div>
          </div>

          {/* Cụm icon góc phải Header chuẩn Zalo */}
          <div className="flex items-center gap-1 shrink-0">
            {showMsgSearch && (
              <div className="relative w-48 sm:w-60 mr-1">
                <Search className="w-3.5 h-3.5 text-[#7589A3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={msgSearch}
                  onChange={(e) => setMsgSearch(e.target.value)}
                  placeholder="Tìm tin nhắn trong phòng..."
                  autoFocus
                  className="w-full h-8 pl-8 pr-7 text-xs bg-[#EBEDF0] dark:bg-slate-800 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0068FF]"
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
              onClick={() => setShowCreateGroupModal(true)}
              title="Thêm thành viên / Tạo nhóm"
              className="w-9 h-9 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
            >
              <UserPlus className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowMsgSearch((prev) => !prev);
                if (showMsgSearch) setMsgSearch('');
              }}
              title="Tìm kiếm tin nhắn"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                showMsgSearch
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200'
              }`}
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() => showToast(`Đang kết nối cuộc gọi Video với ${activeRoom.name}...`)}
              title="Cuộc gọi video"
              className="w-9 h-9 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200 flex items-center justify-center transition cursor-pointer"
            >
              <Video className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() => setShowRightPanel((prev) => !prev)}
              title="Thông tin hội thoại"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                showRightPanel
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-200'
              }`}
            >
              {showRightPanel ? (
                <PanelRightClose className="w-4.5 h-4.5" />
              ) : (
                <PanelRightOpen className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </div>

        {/* Thanh Tin Nhắn Đã Ghim Chuẩn Zalo (Nền trắng nằm sát dưới Header) */}
        {pinnedMessages.length > 0 && (
          <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#E5EFFF] text-[#0068FF] flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#0068FF]">
                  Tin nhắn đã ghim ({pinnedMessages.length})
                </div>
                <div className="text-xs text-[#081C36] dark:text-slate-200 truncate">
                  <strong>{pinnedMessages[pinnedMessages.length - 1].senderName}:</strong>{' '}
                  {pinnedMessages[pinnedMessages.length - 1].content}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                handleTogglePinMessage(pinnedMessages[pinnedMessages.length - 1].id)
              }
              className="px-2.5 py-1 rounded-full bg-[#EBEDF0] hover:bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold text-[#081C36] dark:text-slate-300 shrink-0 cursor-pointer"
            >
              Bỏ ghim
            </button>
          </div>
        )}

        {/* Vùng hiển thị tin nhắn Zalo (Canvas #EEF0F5) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
          {/* Nhãn ngày tháng kiểu Zalo */}
          <div className="flex justify-center my-1">
            <span className="px-3.5 py-0.5 rounded-full bg-[#B6BEC9]/80 dark:bg-slate-800 text-white text-[11px] font-semibold">
              Hôm nay, 25/11/2026
            </span>
          </div>

          {currentRoomMessages.length === 0 ? (
            <div className="py-16 text-center text-[#7589A3] text-xs font-semibold">
              Chưa có tin nhắn nào. Hãy gửi lời chào hoặc tài liệu trao đổi!
            </div>
          ) : (
            currentRoomMessages.map((msg, idx) => {
              const isMe = Boolean(msg.isMe);
              const isLastMe = isMe && idx === currentRoomMessages.length - 1;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 group ${
                    isMe ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar người gửi (Chỉ hiển thị bên trái cho người khác như Zalo) */}
                  {!isMe && (
                    <div
                      style={{ background: msg.senderAvatarBg }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs mt-0.5"
                    >
                      {msg.senderInitials}
                    </div>
                  )}

                  {/* Hộp bong bóng tin nhắn chuẩn Zalo */}
                  <div
                    className={`max-w-[75%] sm:max-w-[65%] flex flex-col ${
                      isMe ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`relative px-3.5 py-2.5 rounded-xl text-[13.5px] leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.08)] ${
                        isMe
                          ? 'bg-[#E5EFFF] dark:bg-sky-900/80 text-[#081C36] dark:text-white border border-[#C7E0FF] dark:border-sky-700'
                          : 'bg-white dark:bg-slate-800 text-[#081C36] dark:text-slate-100 border border-black/5 dark:border-slate-700'
                      }`}
                    >
                      {/* Tên người gửi + Đầu mối nằm bên trong đầu bong bóng (chuẩn nhóm Zalo) */}
                      {!isMe && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-bold text-[#7589A3] dark:text-slate-300">
                            {msg.senderName}
                          </span>
                          <span className="px-1.5 py-0.1 rounded bg-[#F3F5F6] dark:bg-slate-700 text-[9.5px] font-extrabold text-[#0068FF] dark:text-sky-300">
                            {msg.senderHub}
                          </span>
                        </div>
                      )}

                      {/* Khối trích dẫn tin nhắn trả lời (Thanh dọc xanh #0068FF chuẩn Zalo) */}
                      {msg.replyTo && (
                        <div className="mb-2 pl-2.5 pr-2 py-1 rounded bg-black/5 dark:bg-slate-900/60 border-l-[3px] border-l-[#0068FF] text-xs">
                          <div className="font-bold text-[#081C36] dark:text-white">
                            {msg.replyTo.senderName}
                          </div>
                          <div className="truncate text-[#7589A3] dark:text-slate-300">
                            {msg.replyTo.content}
                          </div>
                        </div>
                      )}

                      {/* Nội dung chữ */}
                      {msg.content && (
                        <div className="whitespace-pre-line break-words">{msg.content}</div>
                      )}

                      {/* Thẻ Đính kèm Tệp / Đơn hàng / Lịch họp */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {msg.attachments.map((att) => (
                            <div
                              key={att.id}
                              className="p-2.5 rounded-xl bg-[#F3F5F6] dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5"
                            >
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white font-black text-xs ${
                                  att.type === 'order'
                                    ? 'bg-[#0068FF]'
                                    : att.type === 'schedule'
                                      ? 'bg-[#F15A24]'
                                      : 'bg-emerald-600'
                                }`}
                              >
                                <FileText className="w-4.5 h-4.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-[#081C36] dark:text-white truncate">
                                  {att.name}
                                </div>
                                <div className="text-[11px] text-[#7589A3] truncate">
                                  {att.subText || att.size || 'Tài liệu nội bộ AVG ONE'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Thời gian gửi nằm gọn góc dưới bên trong bong bóng chuẩn Zalo */}
                      <div className="mt-1 flex items-center justify-end gap-1.5 text-[10.5px] text-[#7589A3]">
                        {msg.isPinned && (
                          <Pin className="w-3 h-3 text-[#F15A24] rotate-45" />
                        )}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Huy hiệu Biểu cảm (Reactions) & Thanh thao tác nhanh Zalo */}
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {msg.reactions &&
                        msg.reactions.map((r) => (
                          <button
                            key={r.emoji}
                            type="button"
                            onClick={() => handleToggleReaction(msg.id, r.emoji)}
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs transition cursor-pointer ${
                              r.reactedByMe
                                ? 'bg-white text-[#0068FF] border border-[#0068FF]/40'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200'
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span>{r.count}</span>
                          </button>
                        ))}

                      {/* Thanh công cụ hiện khi hover vào tin nhắn */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-xs border border-slate-200 dark:border-slate-700">
                        {['👍', '❤️', '🔥', '✅'].map((emo) => (
                          <button
                            key={emo}
                            type="button"
                            onClick={() => handleToggleReaction(msg.id, emo)}
                            className="w-5.5 h-5.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center justify-center cursor-pointer"
                            title={`Thả biểu cảm ${emo}`}
                          >
                            {emo}
                          </button>
                        ))}
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => setReplyingTo(msg)}
                          className="p-1 text-[#7589A3] hover:text-[#0068FF] cursor-pointer"
                          title="Trả lời"
                        >
                          <Reply className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTogglePinMessage(msg.id)}
                          className="p-1 text-[#7589A3] hover:text-[#F15A24] cursor-pointer"
                          title={msg.isPinned ? 'Bỏ ghim' : 'Ghim tin nhắn'}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        {isMe && (
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 text-[#7589A3] hover:text-rose-600 cursor-pointer"
                            title="Thu hồi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Nhãn "Đã nhận / Đã xem" dưới tin nhắn cuối cùng giống Zalo */}
                    {isLastMe && (
                      <div className="mt-0.5 px-2 py-0.2 rounded-full bg-[#B6BEC9]/70 text-white text-[10px] font-semibold inline-flex items-center gap-1">
                        <CheckCheck className="w-3 h-3" />
                        <span>Đã xem</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ========================================================================= */}
        {/* KHUNG SOẠN THẢO 2 TẦNG CHUẨN ZALO PC (THANH ICON TRÊN + Ô NHẬP DƯỚI) */}
        {/* ========================================================================= */}
        <div className="bg-white dark:bg-slate-900 border-t border-[#E5E7EB] dark:border-slate-800 shrink-0">
          {/* Hộp chọn nhanh Đơn hàng / Lịch trao đổi / Danh thiếp */}
          {showTagPicker !== 'none' && (
            <div className="px-4 py-2.5 bg-[#F3F5F6] dark:bg-slate-800 border-b border-[#E5E7EB] dark:border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-[#7589A3]">
                <span>
                  {showTagPicker === 'order'
                    ? 'CHỌN ĐƠN HÀNG (#DH) ĐỂ GỬI VÀO PHÒNG CHAT'
                    : showTagPicker === 'schedule'
                      ? 'CHỌN LỊCH TRAO ĐỔI ĐỂ NHẮC HẸN VÀO PHÒNG CHAT'
                      : 'CHỌN DANH THIẾP NHÂN SỰ ĐỂ CHIA SẺ'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowTagPicker('none')}
                  className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {showTagPicker === 'contact'
                  ? AVG_CHAT_STAFF.slice(0, 6).map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setPendingAttachments((prev) => [
                            ...prev,
                            {
                              id: `card-${Date.now()}-${st.id}`,
                              name: `Danh thiếp: ${st.name} (${st.hub})`,
                              type: 'contact',
                              subText: `${st.role} • SĐT: ${st.phone || '0901 888 222'}`
                            }
                          ]);
                          setShowTagPicker('none');
                        }}
                        className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#0068FF] text-xs font-semibold text-[#081C36] dark:text-slate-200 transition cursor-pointer"
                      >
                        {st.name} ({st.hub})
                      </button>
                    ))
                  : (showTagPicker === 'order' ? QUICK_ORDER_TAGS : QUICK_SCHEDULE_TAGS).map(
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
                                code: item.code,
                                subText: item.subText
                              }
                            ]);
                            setShowTagPicker('none');
                          }}
                          className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#0068FF] text-xs font-semibold text-[#081C36] dark:text-slate-200 transition cursor-pointer"
                        >
                          {item.name}
                        </button>
                      )
                    )}
              </div>
            </div>
          )}

          {/* Tầng 1: Thanh công cụ Icon chuẩn Zalo (Hình ảnh, Đính kèm File, Danh thiếp, Nhắc hẹn Lịch, Giao việc Đơn hàng) */}
          <div className="h-10 px-3 border-b border-[#F1F2F4] dark:border-slate-800 flex items-center gap-1 overflow-x-auto no-scrollbar">
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
              title="Gửi Hình ảnh"
              className="p-2 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-300 transition cursor-pointer"
            >
              <ImageIcon className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Đính kèm File tài liệu"
              className="p-2 rounded-lg hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-300 transition cursor-pointer"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setShowTagPicker((prev) => (prev === 'contact' ? 'none' : 'contact'))
              }
              title="Gửi Danh thiếp nhân sự"
              className={`p-2 rounded-lg transition cursor-pointer ${
                showTagPicker === 'contact'
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-300'
              }`}
            >
              <Contact className="w-4.5 h-4.5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setShowTagPicker((prev) => (prev === 'schedule' ? 'none' : 'schedule'))
              }
              title="Đính kèm Lịch trao đổi / Nhắc hẹn"
              className={`p-2 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                showTagPicker === 'schedule'
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-300'
              }`}
            >
              <Calendar className="w-4.5 h-4.5" />
              <span className="hidden sm:inline text-[11px]">Lịch họp</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setShowTagPicker((prev) => (prev === 'order' ? 'none' : 'order'))
              }
              title="Giao việc / Gắn thẻ Đơn hàng (#DH)"
              className={`p-2 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                showTagPicker === 'order'
                  ? 'bg-[#E5EFFF] text-[#0068FF]'
                  : 'hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#081C36] dark:text-slate-300'
              }`}
            >
              <CheckSquare className="w-4.5 h-4.5" />
              <span className="hidden sm:inline text-[11px]">Giao việc / #DH</span>
            </button>
          </div>

          {/* Hiển thị tin nhắn đang trả lời hoặc tệp chờ gửi */}
          {(replyingTo || pendingAttachments.length > 0) && (
            <div className="px-3.5 pt-2 flex flex-wrap items-center gap-2">
              {replyingTo && (
                <div className="px-3 py-1 rounded-lg bg-[#F3F5F6] dark:bg-slate-800 border-l-[3px] border-l-[#0068FF] text-xs flex items-center gap-2">
                  <Reply className="w-3.5 h-3.5 text-[#0068FF]" />
                  <span className="truncate max-w-[280px]">
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
                  className="px-3 py-1 rounded-full bg-[#E5EFFF] text-[#0068FF] text-xs font-bold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[220px]">{att.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setPendingAttachments((prev) => prev.filter((a) => a.id !== att.id))
                    }
                    className="hover:text-rose-600 font-bold cursor-pointer ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tầng 2: Ô nhập tin nhắn & Nút GỬI / 👍 chuẩn Zalo */}
          <form
            onSubmit={handleSendMessage}
            className="px-3.5 py-2.5 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Nhập @, tin nhắn tới ${activeRoom.name}...`}
              className="flex-1 h-9 px-2 text-[13.5px] bg-transparent text-[#081C36] dark:text-white placeholder-[#7589A3] focus:outline-none"
            />

            {inputText.trim() || pendingAttachments.length > 0 ? (
              <button
                type="submit"
                className="h-8.5 px-4 rounded-full bg-[#0068FF] hover:bg-[#0052CC] text-white font-bold text-xs uppercase tracking-wide transition cursor-pointer shrink-0"
              >
                GỬI
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendQuickLike}
                title="Gửi nhanh 👍"
                className="w-9 h-9 rounded-full hover:bg-[#EBEDF0] dark:hover:bg-slate-800 text-[#0068FF] flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. CỘT THÔNG TIN HỘI THOẠI BÊN PHẢI CHUẨN ZALO PC (CÁC KHỐI THU GỌN) */}
      {/* ========================================================================= */}
      {showRightPanel && (
        <aside className="hidden xl:flex w-[320px] shrink-0 h-full bg-white dark:bg-slate-900 border-l border-[#E5E7EB] dark:border-slate-800 flex-col overflow-y-auto scrollbar-thin">
          {/* Header cột phải */}
          <div className="h-16 px-4 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-center shrink-0">
            <h3 className="text-[15px] font-bold text-[#081C36] dark:text-white">
              Thông tin hội thoại
            </h3>
          </div>

          {/* Khối Avatar + Tên + 4 nút tròn nhanh chuẩn Zalo */}
          <div className="p-4 border-b-[6px] border-[#EEF0F5] dark:border-slate-950 flex flex-col items-center text-center">
            <div
              style={{ background: activeRoom.avatarBg }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-base shadow-xs mb-2"
            >
              {activeRoom.initials}
            </div>
            <h4 className="text-sm font-bold text-[#081C36] dark:text-white leading-snug px-2">
              {activeRoom.name}
            </h4>
            <span
              style={{ color: activeRoom.tagColor }}
              className="text-[11px] font-extrabold mt-0.5"
            >
              {activeRoom.hubCode}
            </span>

            {/* 4 Nút tròn thao tác nhanh bên dưới tên phòng giống hệt Zalo */}
            <div className="grid grid-cols-4 gap-2 w-full mt-4">
              <button
                type="button"
                onClick={() => showToast('Đã cập nhật cài đặt thông báo')}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF] flex items-center justify-center transition">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] text-[#7589A3] leading-tight">
                  Tắt thông báo
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTogglePinRoom(activeRoom.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`w-8.5 h-8.5 rounded-full flex items-center justify-center transition ${
                    activeRoom.isPinned
                      ? 'bg-[#E5EFFF] text-[#0068FF]'
                      : 'bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF]'
                  }`}
                >
                  <Pin className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] text-[#7589A3] leading-tight">
                  {activeRoom.isPinned ? 'Đã ghim' : 'Ghim hội thoại'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowCreateGroupModal(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF] flex items-center justify-center transition">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] text-[#7589A3] leading-tight">
                  Thêm thành viên
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowMsgSearch(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-[#EBEDF0] dark:bg-slate-800 group-hover:bg-[#E5EFFF] group-hover:text-[#0068FF] flex items-center justify-center transition">
                  <Search className="w-4 h-4" />
                </div>
                <span className="text-[10.5px] text-[#7589A3] leading-tight">
                  Tìm tin nhắn
                </span>
              </button>
            </div>
          </div>

          {/* KHỐI 1: Thành viên nhóm */}
          <div className="border-b-[6px] border-[#EEF0F5] dark:border-slate-950">
            <button
              type="button"
              onClick={() =>
                setOpenRightSections((p) => ({ ...p, members: !p.members }))
              }
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#081C36] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
            >
              <span>Thành viên ({roomMembers.length})</span>
              {openRightSections.members ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.members && (
              <div className="px-3 pb-3 space-y-1 max-h-52 overflow-y-auto scrollbar-thin">
                {roomMembers.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleStartDirectChat(m)}
                    title="Click để nhắn tin riêng 1-1"
                    className="p-1.5 rounded-lg hover:bg-[#F3F5F6] dark:hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
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
                        <div className="text-xs font-semibold text-[#081C36] dark:text-slate-100 truncate">
                          {m.name}
                        </div>
                        <div className="text-[10px] text-[#7589A3] truncate">
                          {m.role}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#EBEDF0] dark:bg-slate-800 text-[9px] font-bold text-[#081C36] dark:text-slate-300 shrink-0">
                      {m.hub}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KHỐI 2: Bảng tin nhóm (Ghi chú, ghim, nhắc hẹn) */}
          <div className="border-b-[6px] border-[#EEF0F5] dark:border-slate-950">
            <button
              type="button"
              onClick={() =>
                setOpenRightSections((p) => ({ ...p, board: !p.board }))
              }
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#081C36] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
            >
              <span>Bảng tin nhóm</span>
              {openRightSections.board ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.board && (
              <div className="px-4 pb-3 space-y-2 text-xs text-[#081C36] dark:text-slate-200">
                <div
                  onClick={() => setShowTagPicker('schedule')}
                  className="flex items-center gap-2.5 py-1.5 hover:text-[#0068FF] cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#F15A24]" />
                  <span>Danh sách nhắc hẹn & Lịch họp</span>
                </div>
                <div
                  onClick={() => setShowTagPicker('order')}
                  className="flex items-center gap-2.5 py-1.5 hover:text-[#0068FF] cursor-pointer"
                >
                  <CheckSquare className="w-4 h-4 text-[#0068FF]" />
                  <span>Ghi chú, ghim, giao việc (#DH)</span>
                </div>
              </div>
            )}
          </div>

          {/* KHỐI 3: File, Đơn hàng & Lịch đã chia sẻ */}
          <div className="border-b-[6px] border-[#EEF0F5] dark:border-slate-950">
            <button
              type="button"
              onClick={() =>
                setOpenRightSections((p) => ({ ...p, files: !p.files }))
              }
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#081C36] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
            >
              <span>File & Thẻ công việc ({sharedAttachments.length})</span>
              {openRightSections.files ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.files && (
              <div className="px-4 pb-3 space-y-2">
                {sharedAttachments.length === 0 ? (
                  <div className="text-xs text-[#7589A3] py-2 text-center">
                    Chưa có File nào được chia sẻ
                  </div>
                ) : (
                  sharedAttachments.map((att) => (
                    <div
                      key={att.id}
                      className="p-2 rounded-lg bg-[#F3F5F6] dark:bg-slate-800 flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded bg-[#0068FF]/10 text-[#0068FF] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[#081C36] dark:text-white truncate">
                          {att.name}
                        </div>
                        <div className="text-[10px] text-[#7589A3] truncate">
                          {att.subText || att.size || 'Đã đồng bộ 24/7'}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* KHỐI 4: Link nội bộ */}
          <div>
            <button
              type="button"
              onClick={() =>
                setOpenRightSections((p) => ({ ...p, links: !p.links }))
              }
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#081C36] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
            >
              <span>Link hệ thống</span>
              {openRightSections.links ? (
                <ChevronDown className="w-4 h-4 text-[#7589A3]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#7589A3]" />
              )}
            </button>
            {openRightSections.links && (
              <div className="px-4 pb-4 space-y-2 text-xs">
                <a
                  href="https://docs.google.com/spreadsheets/d/1Convert/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#F3F5F6] dark:bg-slate-800 flex items-center gap-2.5 hover:text-[#0068FF]"
                >
                  <Link2 className="w-4 h-4 text-[#0068FF] shrink-0" />
                  <div className="truncate">
                    <div className="font-semibold truncate">Google Sheet Lịch Trao Đổi 24/7</div>
                    <div className="text-[10px] text-[#7589A3]">docs.google.com</div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* MODAL: TẠO NHÓM CHAT MỚI CHUẨN ZALO */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-[#081C36] dark:text-white">
                Tạo nhóm mới
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateGroupModal(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#081C36] dark:text-slate-300 block">
                  Tên nhóm *
                </label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Nhập tên nhóm..."
                  className="w-full h-9 px-3.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-[#0068FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#081C36] dark:text-slate-300 block">
                  Phân loại Cụm / Đầu mối
                </label>
                <select
                  value={newGroupHubCode}
                  onChange={(e) => setNewGroupHubCode(e.target.value)}
                  className="w-full h-9 px-3.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-[#0068FF]"
                >
                  <option value="ĐIỀU HÀNH 24/7">ĐIỀU HÀNH 24/7</option>
                  <option value="CỤM 5.1">CỤM 5.1 (5.1B & 5.1T)</option>
                  <option value="CỤM #K">CỤM #K (5 Đầu Mối Thực Thi)</option>
                  <option value="R&D • 3.1/3.2">R&D • 3.1 Nghiên cứu & 3.2 Thiết kế</option>
                  <option value="6 - PHÁP LÝ">6 - PHÁP LÝ & SHTT</option>
                  <option value="HẠ TẦNG 2.2">HẠ TẦNG 2.2 & BẢO MẬT</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#081C36] dark:text-slate-300 block">
                  Chọn thành viên vào nhóm ({selectedMemberIds.length})
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
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

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="h-9 px-4 rounded-full bg-[#EBEDF0] hover:bg-slate-200 text-[#081C36] font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-full bg-[#0068FF] hover:bg-[#0052CC] text-white font-bold cursor-pointer"
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
