import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageSquare, Search, Paperclip, Users,
  Image as ImageIcon, Smile, UserPlus, Cloud, Contact,
  CheckSquare, ChevronDown, ThumbsUp, Home,
  Phone, Video, PanelRight, MoreHorizontal, X
} from 'lucide-react';

export interface ChatMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  hub: string;
  avatarColor: string;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  senderAvatarColor: string;
  content: string;
  timestamp: string;
  isMe?: boolean;
  fileName?: string;
  fileSize?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'direct' | 'cloud';
  avatarColor: string;
  initials: string;
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
    hub: 'Cụm #K',
    avatarColor: '#E65100',
    isOnline: true
  },
  {
    id: 'staff-trinh',
    name: 'Ông Trịnh',
    initials: 'OT',
    role: 'Ban Điều Hành Tập Đoàn',
    hub: 'Điều hành',
    avatarColor: '#0068FF',
    isOnline: true
  },
  {
    id: 'staff-kien',
    name: 'Kiên (Điều Hành)',
    initials: 'K',
    role: 'Điều Hành & Thư Ký Tổng Kết',
    hub: 'Điều hành',
    avatarColor: '#0288D1',
    isOnline: true
  },
  {
    id: 'staff-huy',
    name: 'Ông Vũ Quốc Huy',
    initials: 'QH',
    role: 'Cố Vấn Pháp Lý & Sản Xuất',
    hub: 'Pháp lý',
    avatarColor: '#F57C00',
    isOnline: true
  },
  {
    id: 'staff-thanh',
    name: 'Ông Thành',
    initials: 'TH',
    role: 'Hội Đồng Con Người',
    hub: 'Nhân sự',
    avatarColor: '#2E7D32',
    isOnline: true
  },
  {
    id: 'staff-tam',
    name: 'Lê Trần Thiện Tâm',
    initials: 'TT',
    role: 'Chuyên Viên Đầu Mối 5.1T',
    hub: 'Cụm 5.1',
    avatarColor: '#D84315',
    isOnline: true
  },
  {
    id: 'staff-han',
    name: 'Đinh Hoàng Ngọc Hân',
    initials: 'NH',
    role: 'Thư Ký & Đầu Mối 5.1B',
    hub: 'Cụm 5.1',
    avatarColor: '#AD1457',
    isOnline: true
  },
  {
    id: 'staff-nguyet',
    name: 'Nguyệt (Thư Ký CĐT)',
    initials: 'NG',
    role: 'Thư Ký Chủ Đầu Tư',
    hub: 'CĐT',
    avatarColor: '#6A1B9A',
    isOnline: true
  },
  {
    id: 'staff-tuan',
    name: 'Phạm Minh Tuấn',
    initials: 'MT',
    role: 'Chuyên Viên Thiết Kế CAD 3D',
    hub: 'Thiết kế 3.2',
    avatarColor: '#00838F',
    isOnline: false
  },
  {
    id: 'staff-nam',
    name: 'Bùi Hoàng Nam',
    initials: 'HN',
    role: 'Kỹ Sư Kiểm Định QC & RDI',
    hub: 'R&D 3.1',
    avatarColor: '#455A64',
    isOnline: true
  }
];

const INITIAL_ROOMS: ChatRoom[] = [
  {
    id: 'room-executive',
    name: 'Ban Điều Hành & Các Đầu Mối AVG',
    type: 'group',
    avatarColor: '#0068FF',
    initials: 'AVG',
    unreadCount: 0,
    memberIds: AVG_CHAT_STAFF.map((s) => s.id)
  },
  {
    id: 'room-cluster-51',
    name: 'Cụm 5.1 (5.1B & 5.1T)',
    type: 'group',
    avatarColor: '#0288D1',
    initials: '5.1',
    unreadCount: 2,
    memberIds: ['staff-trang', 'staff-kien', 'staff-tam', 'staff-han', 'staff-trinh']
  },
  {
    id: 'room-cluster-k',
    name: 'Cụm #K – Đầu Mối Thực Thi',
    type: 'group',
    avatarColor: '#E65100',
    initials: '#K',
    unreadCount: 0,
    memberIds: ['staff-trang', 'staff-trinh', 'staff-kien', 'staff-nguyet', 'staff-han']
  },
  {
    id: 'room-cloud',
    name: 'Cloud của tôi',
    type: 'cloud',
    avatarColor: '#0068FF',
    initials: '☁️',
    unreadCount: 0,
    memberIds: ['staff-trang']
  },
  {
    id: 'dm-staff-trang',
    name: 'Bà Trang (#K2B)',
    type: 'direct',
    avatarColor: '#E65100',
    initials: 'BT',
    unreadCount: 1,
    memberIds: ['staff-trang'],
    directPartnerId: 'staff-trang'
  },
  {
    id: 'dm-staff-kien',
    name: 'Kiên (Điều Hành)',
    type: 'direct',
    avatarColor: '#0288D1',
    initials: 'K',
    unreadCount: 0,
    memberIds: ['staff-kien'],
    directPartnerId: 'staff-kien'
  },
  {
    id: 'dm-staff-huy',
    name: 'Ông Vũ Quốc Huy',
    type: 'direct',
    avatarColor: '#F57C00',
    initials: 'QH',
    unreadCount: 0,
    memberIds: ['staff-huy'],
    directPartnerId: 'staff-huy'
  },
  {
    id: 'dm-staff-han',
    name: 'Đinh Hoàng Ngọc Hân',
    type: 'direct',
    avatarColor: '#AD1457',
    initials: 'NH',
    unreadCount: 0,
    memberIds: ['staff-han'],
    directPartnerId: 'staff-han'
  },
  {
    id: 'room-rdi-31',
    name: 'Nhóm R&D 3.1 & Thiết Kế 3.2',
    type: 'group',
    avatarColor: '#6A1B9A',
    initials: 'RD',
    unreadCount: 0,
    memberIds: ['staff-tuan', 'staff-nam', 'staff-kien', 'staff-huy']
  },
  {
    id: 'room-legal-6',
    name: 'Pháp Lý & Hợp Đồng (Đầu mối 6)',
    type: 'group',
    avatarColor: '#2E7D32',
    initials: 'PL',
    unreadCount: 0,
    memberIds: ['staff-huy', 'staff-trang', 'staff-trinh', 'staff-thanh']
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'room-executive': [
    {
      id: 'm1',
      roomId: 'room-executive',
      senderId: 'staff-trang',
      senderName: 'Bà Trang (#K2B)',
      senderInitials: 'BT',
      senderAvatarColor: '#E65100',
      content: 'Đề nghị các đầu mối AVG chuẩn bị số liệu để 16:00 chiều nay họp Tổng kết công việc thường ngày tại P1 (Ông Huy tham gia online).',
      timestamp: '14:15'
    },
    {
      id: 'm2',
      roomId: 'room-executive',
      senderId: 'staff-huy',
      senderName: 'Ông Vũ Quốc Huy',
      senderInitials: 'QH',
      senderAvatarColor: '#F57C00',
      content: 'Tôi đã nhận lịch. Hồ sơ pháp lý hợp đồng gia công và biên bản đối tác Trà của anh Tuấn đã rà soát xong, chiều nay tôi báo cáo trực tuyến lúc 16:00.',
      timestamp: '14:28'
    },
    {
      id: 'm3',
      roomId: 'room-executive',
      senderId: 'staff-kien',
      senderName: 'Kiên (Điều Hành)',
      senderInitials: 'K',
      senderAvatarColor: '#0288D1',
      content: 'Em gửi trước tệp tổng hợp biên bản VBKL tuần này để các đầu mối theo dõi.',
      timestamp: '14:45',
      fileName: 'Tong_Hop_VBKL_Thang11_2026.pdf',
      fileSize: '1.4 MB'
    },
    {
      id: 'm4',
      roomId: 'room-executive',
      senderId: 'me',
      senderName: 'Bạn',
      senderInitials: 'AVG',
      senderAvatarColor: '#0068FF',
      content: 'Đã nhận thông tin. Hẹn các đầu mối đúng 16:00 chiều nay tại P1.',
      timestamp: '15:05',
      isMe: true
    }
  ],
  'room-cluster-51': [
    {
      id: 'm51-1',
      roomId: 'room-cluster-51',
      senderId: 'staff-han',
      senderName: 'Đinh Hoàng Ngọc Hân',
      senderInitials: 'NH',
      senderAvatarColor: '#AD1457',
      content: 'Đầu vào 5.1B vừa tiếp nhận hồ sơ mẫu bao bì và bo mạch lô mới, đã chuyển thông số sang bộ phận R&D.',
      timestamp: '10:20'
    },
    {
      id: 'm51-2',
      roomId: 'room-cluster-51',
      senderId: 'staff-tam',
      senderName: 'Lê Trần Thiện Tâm',
      senderInitials: 'TT',
      senderAvatarColor: '#D84315',
      content: '5.1T đã đối chiếu xong danh mục đầu ra, sẵn sàng nghiệm thu bàn giao trong chiều nay.',
      timestamp: '11:05'
    }
  ],
  'dm-staff-trang': [
    {
      id: 'mdm-1',
      roomId: 'dm-staff-trang',
      senderId: 'staff-trang',
      senderName: 'Bà Trang (#K2B)',
      senderInitials: 'BT',
      senderAvatarColor: '#E65100',
      content: 'Nhớ kiểm tra lại danh sách thành phần tham dự cuộc họp Tổng kết công việc thường ngày 16:00 chiều nay nhé.',
      timestamp: '13:50'
    }
  ],
  'room-cloud': [
    {
      id: 'mcloud-1',
      roomId: 'room-cloud',
      senderId: 'me',
      senderName: 'Cloud của tôi',
      senderInitials: '☁️',
      senderAvatarColor: '#0068FF',
      content: 'Ghi chú: Rà soát tiến độ 66 cuộc trao đổi trên Sheet LỊCH TRAO ĐỔI 24/7.',
      timestamp: '08:30',
      isMe: true
    }
  ]
};

const STORAGE_ROOMS_KEY = 'avg_zalo_clean_rooms_v1';
const STORAGE_MSGS_KEY = 'avg_zalo_clean_msgs_v1';

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

  const [activeNav, setActiveNav] = useState<'messages' | 'contacts'>('messages');
  const [activeRoomId, setActiveRoomId] = useState<string>('room-executive');
  const [tabFilter, setTabFilter] = useState<'all' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [showInfoSidebar, setShowInfoSidebar] = useState<boolean>(false);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>(['staff-trang', 'staff-kien']);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeRoomId, messagesByRoom[activeRoomId]?.length]);

  const activeRoom = useMemo(
    () => rooms.find((r) => r.id === activeRoomId) || rooms[0],
    [rooms, activeRoomId]
  );

  const currentMessages = useMemo(
    () => messagesByRoom[activeRoom.id] || [],
    [messagesByRoom, activeRoom.id]
  );

  const totalUnread = useMemo(
    () => rooms.reduce((acc, r) => acc + (r.unreadCount || 0), 0),
    [rooms]
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (tabFilter === 'unread' && r.unreadCount === 0) return false;
      if (searchQuery.trim()) {
        return r.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [rooms, tabFilter, searchQuery]);

  const roomMembers = useMemo(
    () => AVG_CHAT_STAFF.filter((s) => activeRoom.memberIds.includes(s.id)),
    [activeRoom]
  );

  const handleSelectRoom = (id: string) => {
    setActiveRoomId(id);
    setActiveNav('messages');
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, unreadCount: 0 } : r)));
  };

  const handleOpenDirect = (member: ChatMember) => {
    const found = rooms.find((r) => r.type === 'direct' && r.directPartnerId === member.id);
    if (found) {
      handleSelectRoom(found.id);
      return;
    }
    const newRoom: ChatRoom = {
      id: `dm-${member.id}`,
      name: member.name,
      type: 'direct',
      avatarColor: member.avatarColor,
      initials: member.initials,
      unreadCount: 0,
      memberIds: [member.id],
      directPartnerId: member.id
    };
    setRooms((prev) => [newRoom, ...prev]);
    handleSelectRoom(newRoom.id);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      roomId: activeRoom.id,
      senderId: 'me',
      senderName: 'Bạn',
      senderInitials: 'AVG',
      senderAvatarColor: '#0068FF',
      content: inputText.trim(),
      timestamp: timeStr,
      isMe: true
    };
    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), msg]
    }));
    setInputText('');
  };

  const handleSendLike = () => {
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      roomId: activeRoom.id,
      senderId: 'me',
      senderName: 'Bạn',
      senderInitials: 'AVG',
      senderAvatarColor: '#0068FF',
      content: '👍',
      timestamp: timeStr,
      isMe: true
    };
    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), msg]
    }));
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const timeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const sizeStr =
      f.size < 1024 * 1024
        ? `${(f.size / 1024).toFixed(1)} KB`
        : `${(f.size / (1024 * 1024)).toFixed(1)} MB`;
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      roomId: activeRoom.id,
      senderId: 'me',
      senderName: 'Bạn',
      senderInitials: 'AVG',
      senderAvatarColor: '#0068FF',
      content: '',
      fileName: f.name,
      fileSize: sizeStr,
      timestamp: timeStr,
      isMe: true
    };
    setMessagesByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), msg]
    }));
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
    const newR: ChatRoom = {
      id: `room-${Date.now()}`,
      name: newGroupName.trim(),
      type: 'group',
      avatarColor: '#0068FF',
      initials,
      unreadCount: 0,
      memberIds: selectedMembers.length > 0 ? selectedMembers : ['staff-trang']
    };
    setRooms((prev) => [newR, ...prev]);
    handleSelectRoom(newR.id);
    setShowCreateGroup(false);
    setNewGroupName('');
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex bg-white text-[#081C36] font-sans overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 1. THANH XANH DỌC BÊN TRÁI CHUẨN ZALO (64px, #0068FF, TỐI GIẢN) */}
      {/* ========================================================================= */}
      <nav className="w-16 shrink-0 h-full bg-[#0068FF] flex flex-col items-center justify-between py-3 text-white">
        <div className="flex flex-col items-center gap-2 w-full">
          {/* Avatar người dùng trên cùng */}
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full bg-[#0052CC] border-2 border-white/80 flex items-center justify-center font-bold text-sm">
              AVG
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#2ECC71] border-2 border-[#0068FF]" />
          </div>

          {/* Tin nhắn */}
          <button
            type="button"
            onClick={() => setActiveNav('messages')}
            title="Tin nhắn"
            className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition cursor-pointer ${
              activeNav === 'messages' ? 'bg-[#0052CC]' : 'hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-6 h-6 stroke-[1.8]" />
            {totalUnread > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#DA251D] text-white text-[10px] font-bold flex items-center justify-center">
                {totalUnread}
              </span>
            )}
          </button>

          {/* Danh bạ */}
          <button
            type="button"
            onClick={() => setActiveNav('contacts')}
            title="Danh bạ"
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition cursor-pointer ${
              activeNav === 'contacts' ? 'bg-[#0052CC]' : 'hover:bg-white/10'
            }`}
          >
            <Contact className="w-6 h-6 stroke-[1.8]" />
          </button>

          {/* Cloud của tôi */}
          <button
            type="button"
            onClick={() => handleSelectRoom('room-cloud')}
            title="Cloud của tôi"
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition cursor-pointer ${
              activeRoom.id === 'room-cloud' && activeNav === 'messages'
                ? 'bg-[#0052CC]'
                : 'hover:bg-white/10'
            }`}
          >
            <Cloud className="w-6 h-6 stroke-[1.8]" />
          </button>
        </div>

        {/* Nút Về Trang chủ AVG One ở dưới cùng thanh Zalo */}
        <div className="flex flex-col items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('go_home'))}
            title="Về Trang chủ AVG One"
            className="w-12 h-12 rounded-xl hover:bg-white/15 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer"
          >
            <Home className="w-5 h-5 stroke-[2]" />
            <span className="text-[9px] font-semibold">Trang chủ</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. CỘT DANH SÁCH HỘI THOẠI CHUẨN ZALO (340px, TRẮNG PHẲNG, KHÔNG RỐI) */}
      {/* ========================================================================= */}
      <aside className="w-[340px] shrink-0 h-full bg-white border-r border-[#D6DBE1] flex flex-col overflow-hidden">
        {/* Ô tìm kiếm + 2 nút Thêm bạn / Tạo nhóm */}
        <div className="h-16 px-4 flex items-center gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7589A3] stroke-[1.75] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm"
              className="w-full h-8 pl-9 pr-7 text-[13px] bg-[#EAEDF0] text-[#081C36] placeholder-[#7589A3] rounded-md focus:bg-white focus:ring-1 focus:ring-[#0068FF] focus:outline-none transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7589A3] hover:text-[#081C36] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveNav(activeNav === 'contacts' ? 'messages' : 'contacts')}
            title="Danh bạ nhân sự"
            className="w-8 h-8 rounded hover:bg-[#EAEDF0] text-[#081C36] flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <UserPlus className="w-4.5 h-4.5 stroke-[1.6]" />
          </button>

          <button
            type="button"
            onClick={() => setShowCreateGroup(true)}
            title="Tạo nhóm chat"
            className="w-8 h-8 rounded hover:bg-[#EAEDF0] text-[#081C36] flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <Users className="w-4.5 h-4.5 stroke-[1.6]" />
          </button>
        </div>

        {activeNav === 'messages' ? (
          <>
            {/* Thanh tab: Tất cả | Chưa đọc */}
            <div className="px-4 border-b border-[#D6DBE1] flex items-center justify-between text-[13px] shrink-0">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setTabFilter('all')}
                  className={`pb-2 border-b-2 transition cursor-pointer ${
                    tabFilter === 'all'
                      ? 'text-[#0068FF] border-[#0068FF] font-semibold'
                      : 'text-[#7589A3] border-transparent hover:text-[#081C36]'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setTabFilter('unread')}
                  className={`pb-2 border-b-2 transition cursor-pointer ${
                    tabFilter === 'unread'
                      ? 'text-[#0068FF] border-[#0068FF] font-semibold'
                      : 'text-[#7589A3] border-transparent hover:text-[#081C36]'
                  }`}
                >
                  Chưa đọc
                </button>
              </div>

              <div className="pb-2 flex items-center gap-1 text-[#7589A3] text-xs">
                <span>Phân loại</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Danh sách cuộc trò chuyện sạch sẽ, thoáng mắt đúng chuẩn Zalo */}
            <div className="flex-1 overflow-y-auto">
              {filteredRooms.map((room) => {
                const isSelected = room.id === activeRoom.id;
                const msgs = messagesByRoom[room.id] || [];
                const lastMsg = msgs[msgs.length - 1];

                return (
                  <div
                    key={room.id}
                    onClick={() => handleSelectRoom(room.id)}
                    className={`h-[72px] px-4 flex items-center gap-3 cursor-pointer transition ${
                      isSelected ? 'bg-[#E5EFFF]' : 'hover:bg-[#F3F5F6]'
                    }`}
                  >
                    {/* Avatar tròn 48px */}
                    <div
                      style={{ backgroundColor: room.avatarColor }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                    >
                      {room.initials}
                    </div>

                    {/* Tên + Tin nhắn cuối */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[15px] truncate ${
                            room.unreadCount > 0
                              ? 'font-semibold text-[#081C36]'
                              : 'font-normal text-[#081C36]'
                          }`}
                        >
                          {room.name}
                        </span>
                        <span className="text-[12px] text-[#7589A3] shrink-0">
                          {lastMsg ? lastMsg.timestamp : ''}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-1">
                        <p
                          className={`text-[13px] truncate ${
                            room.unreadCount > 0
                              ? 'font-medium text-[#081C36]'
                              : 'text-[#7589A3]'
                          }`}
                        >
                          {lastMsg
                            ? `${lastMsg.isMe ? 'Bạn: ' : ''}${
                                lastMsg.content || `[Tệp] ${lastMsg.fileName || ''}`
                              }`
                            : 'Chưa có tin nhắn'}
                        </p>

                        {room.unreadCount > 0 && (
                          <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#C81D25] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Danh bạ nhân sự */
          <div className="flex-1 overflow-y-auto border-t border-[#D6DBE1]">
            <div className="px-4 py-2.5 bg-[#F3F5F6] text-xs font-semibold text-[#7589A3]">
              Danh bạ Nhân sự AVG ({AVG_CHAT_STAFF.length})
            </div>
            {AVG_CHAT_STAFF.map((member) => (
              <div
                key={member.id}
                onClick={() => handleOpenDirect(member)}
                className="h-16 px-4 flex items-center gap-3 hover:bg-[#F3F5F6] cursor-pointer transition"
              >
                <div
                  style={{ backgroundColor: member.avatarColor }}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0"
                >
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14.5px] text-[#081C36] truncate">{member.name}</div>
                  <div className="text-[12px] text-[#7589A3] truncate">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 3. KHUNG CHAT CHÍNH CHUẨN ZALO (RỘNG THOÁNG, NỀN #EBECF0, BONG BÓNG ĐƠN GIẢN) */}
      {/* ========================================================================= */}
      <main className="flex-1 min-w-0 h-full flex flex-col bg-[#EBECF0] overflow-hidden">
        {/* Header phòng chat (68px, nền trắng) */}
        <header className="h-[68px] px-5 bg-white border-b border-[#D6DBE1] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              style={{ backgroundColor: activeRoom.avatarColor }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
            >
              {activeRoom.initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-[17px] font-semibold text-[#081C36] truncate">
                {activeRoom.name}
              </h2>
              <div className="text-[12.5px] text-[#7589A3] flex items-center gap-1.5 mt-0.5">
                {activeRoom.type === 'group' ? (
                  <span>{activeRoom.memberIds.length} thành viên</span>
                ) : activeRoom.type === 'cloud' ? (
                  <span>Lưu trữ và đồng bộ dữ liệu giữa các thiết bị</span>
                ) : (
                  <span>Vừa truy cập</span>
                )}
              </div>
            </div>
          </div>

          {/* 4 Icon góc phải Header chuẩn Zalo */}
          <div className="flex items-center gap-1 text-[#081C36]">
            <button
              type="button"
              onClick={() => setShowCreateGroup(true)}
              className="w-9 h-9 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
              title="Thêm thành viên"
            >
              <UserPlus className="w-5 h-5 stroke-[1.6]" />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
              title="Cuộc gọi thoại"
            >
              <Phone className="w-5 h-5 stroke-[1.6]" />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
              title="Cuộc gọi video"
            >
              <Video className="w-5 h-5 stroke-[1.6]" />
            </button>
            <button
              type="button"
              onClick={() => setShowInfoSidebar((prev) => !prev)}
              className={`w-9 h-9 rounded flex items-center justify-center transition cursor-pointer ${
                showInfoSidebar ? 'bg-[#E5EFFF] text-[#0068FF]' : 'hover:bg-[#EAEDF0]'
              }`}
              title="Thông tin hội thoại"
            >
              <PanelRight className="w-5 h-5 stroke-[1.6]" />
            </button>
          </div>
        </header>

        {/* Vùng nội dung tin nhắn */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          <div className="flex justify-center my-2">
            <span className="px-3 py-0.5 rounded-full bg-black/15 text-white text-[11.5px]">
              Hôm nay
            </span>
          </div>

          {currentMessages.map((msg, idx) => {
            const isMe = Boolean(msg.isMe);
            const prev = idx > 0 ? currentMessages[idx - 1] : null;
            const sameSender = Boolean(prev && prev.senderId === msg.senderId);

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  isMe ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar người gửi bên trái */}
                {!isMe && (
                  <div className="w-10 shrink-0">
                    {!sameSender && (
                      <div
                        style={{ backgroundColor: msg.senderAvatarColor }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                      >
                        {msg.senderInitials}
                      </div>
                    )}
                  </div>
                )}

                {/* Hộp bong bóng tin nhắn tối giản chuẩn Zalo */}
                <div
                  className={`max-w-[65%] px-3.5 py-2.5 rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.08)] ${
                    isMe ? 'bg-[#E5EFFF] text-[#081C36]' : 'bg-white text-[#081C36]'
                  }`}
                >
                  {!isMe && !sameSender && activeRoom.type === 'group' && (
                    <div className="text-[12px] text-[#7589A3] mb-1">{msg.senderName}</div>
                  )}

                  {msg.content && (
                    <div className="text-[14.5px] leading-snug whitespace-pre-line break-words">
                      {msg.content}
                    </div>
                  )}

                  {msg.fileName && (
                    <div className="mt-1.5 p-2.5 rounded bg-black/[0.04] flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded bg-[#0068FF] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        FILE
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-medium truncate">{msg.fileName}</div>
                        <div className="text-[11.5px] text-[#7589A3]">{msg.fileSize}</div>
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-[#7589A3] mt-1">{msg.timestamp}</div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Khung nhập tin nhắn 2 tầng chuẩn Zalo */}
        <div className="bg-white border-t border-[#D6DBE1] shrink-0">
          {/* Tầng 1: Thanh công cụ icon mảnh */}
          <div className="h-10 px-4 border-b border-[#E5E7EB] flex items-center gap-2 text-[#081C36]">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleUploadFile}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Gửi hình ảnh"
              className="w-8 h-8 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
            >
              <ImageIcon className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Đính kèm File"
              className="w-8 h-8 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
            >
              <Paperclip className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('contacts')}
              title="Gửi Danh thiếp"
              className="w-8 h-8 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
            >
              <Contact className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              type="button"
              title="Giao việc"
              className="w-8 h-8 rounded hover:bg-[#EAEDF0] flex items-center justify-center transition cursor-pointer"
            >
              <CheckSquare className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Tầng 2: Ô nhập chữ */}
          <form onSubmit={handleSend} className="h-14 px-4 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Nhập @, tin nhắn tới ${activeRoom.name}`}
              className="flex-1 h-full text-[14.5px] text-[#081C36] placeholder-[#7589A3] bg-transparent focus:outline-none"
            />

            <button
              type="button"
              className="w-8 h-8 rounded hover:bg-[#EAEDF0] text-[#7589A3] flex items-center justify-center cursor-pointer"
              title="Biểu cảm"
            >
              <Smile className="w-5 h-5 stroke-[1.6]" />
            </button>

            {inputText.trim() ? (
              <button
                type="submit"
                className="text-[14px] font-semibold text-[#0068FF] hover:text-[#0052CC] px-2 cursor-pointer"
              >
                GỬI
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendLike}
                className="w-8 h-8 rounded hover:bg-[#EAEDF0] text-[#0068FF] flex items-center justify-center cursor-pointer"
                title="Gửi nhanh 👍"
              >
                <ThumbsUp className="w-5 h-5 stroke-[1.6]" />
              </button>
            )}
          </form>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. CỘT THÔNG TIN HỘI THOẠI (CHỈ MỞ KHI BẤM NÚT GÓC PHẢI NHƯ ZALO) */}
      {/* ========================================================================= */}
      {showInfoSidebar && (
        <aside className="w-[340px] shrink-0 h-full bg-white border-l border-[#D6DBE1] flex flex-col overflow-y-auto">
          <div className="h-[68px] border-b border-[#D6DBE1] flex items-center justify-center shrink-0">
            <h3 className="text-[16px] font-semibold text-[#081C36]">Thông tin hội thoại</h3>
          </div>

          <div className="p-5 border-b-[6px] border-[#EBECF0] flex flex-col items-center text-center">
            <div
              style={{ backgroundColor: activeRoom.avatarColor }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-base mb-2.5"
            >
              {activeRoom.initials}
            </div>
            <div className="text-[16px] font-semibold text-[#081C36]">{activeRoom.name}</div>
          </div>

          <div className="p-4">
            <div className="text-[14px] font-semibold text-[#081C36] mb-3">
              Thành viên ({roomMembers.length})
            </div>
            <div className="space-y-2">
              {roomMembers.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleOpenDirect(m)}
                  className="p-2 rounded hover:bg-[#F3F5F6] flex items-center gap-3 cursor-pointer"
                >
                  <div
                    style={{ backgroundColor: m.avatarColor }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                  >
                    {m.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] text-[#081C36] truncate">{m.name}</div>
                    <div className="text-[11.5px] text-[#7589A3] truncate">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* MODAL TẠO NHÓM */}
      {showCreateGroup && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 w-full max-w-md space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#D6DBE1] pb-3">
              <h3 className="text-[16px] font-semibold text-[#081C36]">Tạo nhóm</h3>
              <button
                type="button"
                onClick={() => setShowCreateGroup(false)}
                className="text-[#7589A3] hover:text-[#081C36] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="space-y-4 text-[13.5px]">
              <input
                type="text"
                required
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Nhập tên nhóm..."
                className="w-full h-10 px-3 rounded border border-[#D6DBE1] focus:outline-none focus:border-[#0068FF]"
              />
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {AVG_CHAT_STAFF.map((m) => {
                  const checked = selectedMembers.includes(m.id);
                  return (
                    <label
                      key={m.id}
                      className="flex items-center gap-2.5 p-1.5 rounded hover:bg-[#F3F5F6] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setSelectedMembers((prev) =>
                            checked ? prev.filter((id) => id !== m.id) : [...prev, m.id]
                          )
                        }
                      />
                      <span>{m.name}</span>
                    </label>
                  );
                })}
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#D6DBE1]">
                <button
                  type="button"
                  onClick={() => setShowCreateGroup(false)}
                  className="h-9 px-4 rounded bg-[#EAEDF0] text-[#081C36] font-medium cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded bg-[#0068FF] text-white font-medium cursor-pointer"
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
