import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Play, Pause, RotateCcw, Volume2, VolumeX, Copy, Download,
  Trash2, Search, Check, Sparkles, Settings, SlidersHorizontal,
  ChevronRight, Edit3, User, Clock, CheckCircle2, AlertCircle,
  ArrowRight, Share2, FastForward, Rewind, Eye, FolderOpen,
  Plus, MessageSquare, Send, RefreshCw, Activity, ShieldCheck,
  Zap, Layers, ListFilter, ExternalLink, Printer, FileDown,
  Wand2, Mic, Cpu, Database, Waves, Maximize2, Minimize2,
  FileAudio, FileText, CheckSquare, BarChart3, Users, Star,
  HelpCircle, ChevronDown, Radio, Square, FileSpreadsheet,
  CornerDownLeft, Bookmark, Tag
} from 'lucide-react';
import { processRealtimeSpeechPunctuation } from '../../services/speechPunctuationEngine';
import { transcribeAudioWithGemini } from '../../services/geminiAudioTranscribe';
import { FileTranscribeNavTab } from '../../components/layout/headers/FileTranscribeHeader';

export interface AudioSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  speakerId: string;
  speakerName: string;
  speakerColor: string;
  speakerRole: string;
  text: string;
  confidence: number;
  highlighted?: boolean;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  deadline: string;
  priority: 'Cao' | 'Trung bình' | 'Tiêu chuẩn';
  completed: boolean;
}

export interface TranscribedFile {
  id: string;
  name: string;
  sizeStr: string;
  duration: number; // in seconds
  format: string;
  uploadedAt: string;
  modelUsed: string;
  category?: string;
  audioUrl?: string;
  segments: AudioSegment[];
  summary: {
    executive: string;
    keyDecisions: string[];
    actionItems: ActionItem[];
  };
}

const SPEAKER_PALETTES: Record<string, { bg: string; border: string; text: string; badge: string; dot: string; waveColor: string }> = {
  'spk-1': {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-700 dark:text-sky-300',
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
    dot: 'bg-[#0284C7]',
    waveColor: '#0284C7'
  },
  'spk-2': {
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
    dot: 'bg-[#F15A24]',
    waveColor: '#F15A24'
  },
  'spk-3': {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    dot: 'bg-emerald-600',
    waveColor: '#059669'
  },
  'spk-4': {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
    dot: 'bg-purple-600',
    waveColor: '#9333ea'
  },
  'spk-5': {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    dot: 'bg-rose-600',
    waveColor: '#e11d48'
  }
};

// 🌟 3 CUỘC HỌP AVG MẪU ĐƯỢC CHUẨN HÓA DỮ LIỆU
const STUDIO_SAMPLE_FILES: TranscribedFile[] = [
  {
    id: 'sample-1',
    name: 'Giao_ban_dieu_hanh_Sensor_AI_Tuan38.mp3',
    sizeStr: '14.2 MB',
    duration: 185, // 3m 05s
    format: 'MP3 Stereo • 44.1kHz • Studio HD',
    uploadedAt: 'Hôm nay lúc 09:15',
    modelUsed: 'Google Gemini 2.5 Flash Speech & AVG Neural ASR',
    category: 'Giao ban BĐH',
    summary: {
      executive: 'Cuộc họp rà soát tiến độ tích hợp vi mạch cảm biến quang học thế hệ mới AVG-X. Ban Lãnh Đạo đã thống nhất chỉ đạo phòng 3.1 RDI hoàn thiện firmware phiên bản RC2 trước thứ Năm để nộp hồ sơ bảo hộ sáng chế sở hữu trí tuệ.',
      keyDecisions: [
        'Duyệt đề xuất kinh phí bổ sung linh kiện bán dẫn đo lường từ đối tác Đài Loan.',
        'Ấn định hạn nộp tài liệu hồ sơ đăng ký bản quyền sáng chế phần mềm nhúng trước ngày 30/09/2026.',
        'Phòng Pháp chế cử 01 nhân sự túc trực cùng phòng 3.1 RDI hoàn tất mô tả kỹ thuật sáng chế.'
      ],
      actionItems: [
        { id: 'act-1', task: 'Hoàn thiện bản build Firmware RC2 cho vi mạch cảm biến AI', assignee: 'Lê Văn Nhân Viên (3.1 RDI)', deadline: '24/09/2026', priority: 'Cao', completed: false },
        { id: 'act-2', task: 'Ký biên bản nghiệm thu kỹ thuật đợt 1 với phòng Thiết Kế 3.2', assignee: 'Trần Thị Trưởng Phòng (HR/Thư ký)', deadline: '26/09/2026', priority: 'Trung bình', completed: false },
        { id: 'act-3', task: 'Trình Giám đốc phê duyệt hồ sơ bảo hộ sở hữu trí tuệ', assignee: 'Phòng 6 Pháp Lý AVG', deadline: '29/09/2026', priority: 'Cao', completed: true }
      ]
    },
    segments: [
      {
        id: 'seg-1',
        startTime: 0,
        endTime: 24,
        speakerId: 'spk-1',
        speakerName: 'Nguyễn Văn Quản Lý',
        speakerColor: 'spk-1',
        speakerRole: 'Tổng Giám Đốc (CEO)',
        text: 'Chào các đồng chí! Hôm nay chúng ta tập trung đánh giá tiến độ vi mạch cảm biến thông minh AVG-X. Tuần vừa rồi phòng 3.1 RDI đã thử nghiệm tín hiệu truyền thông qua giao thức Modbus và Bluetooth Low Energy kết quả thế nào?',
        confidence: 0.99
      },
      {
        id: 'seg-2',
        startTime: 25,
        endTime: 62,
        speakerId: 'spk-2',
        speakerName: 'Lê Văn Nhân Viên',
        speakerColor: 'spk-2',
        speakerRole: 'Kỹ sư trưởng R&D 3.1',
        text: 'Báo cáo anh và ban lãnh đạo: Chúng em đã đo kiểm thực tế trên 50 bo mạch mẫu. Tỷ lệ suy hao tín hiệu giảm xuống dưới 0.2%, độ trễ phản hồi chỉ còn 12ms, hoàn toàn đạt chuẩn công nghiệp đề ra ban đầu. Tuy nhiên có một vướng mắc nhỏ ở phần tương thích với vỏ hộp nhôm do phòng 3.2 thiết kế.',
        confidence: 0.97
      },
      {
        id: 'seg-3',
        startTime: 63,
        endTime: 104,
        speakerId: 'spk-1',
        speakerName: 'Nguyễn Văn Quản Lý',
        speakerColor: 'spk-1',
        speakerRole: 'Tổng Giám Đốc (CEO)',
        text: 'Phần vỏ hộp phòng 3.2 cần lưu ý chừa khe ăng-ten để sóng không bị chắn. Tôi duyệt bổ sung ngân sách linh kiện đo lường đợt này. Quan trọng nhất là hồ sơ đăng ký bản quyền sáng chế độc quyền phải nộp trước ngày 30 tháng 9 để tránh rủi ro tranh chấp sở hữu trí tuệ.',
        confidence: 0.98,
        highlighted: true
      },
      {
        id: 'seg-4',
        startTime: 105,
        endTime: 148,
        speakerId: 'spk-3',
        speakerName: 'Trần Thị Trưởng Phòng',
        speakerColor: 'spk-3',
        speakerRole: 'Thư ký Điều hành & HR',
        text: 'Em đã ghi nhận đầy đủ chỉ đạo của anh. Em sẽ phối hợp cùng phòng Pháp chế để hoàn thiện tờ trình mô tả kỹ thuật sáng chế. Biên bản họp hôm nay em sẽ gửi lên hệ thống AVG One trước 16 giờ chiều nay để các phòng ban cùng theo dõi.',
        confidence: 0.98
      },
      {
        id: 'seg-5',
        startTime: 149,
        endTime: 185,
        speakerId: 'spk-1',
        speakerName: 'Nguyễn Văn Quản Lý',
        speakerColor: 'spk-1',
        speakerRole: 'Tổng Giám Đốc (CEO)',
        text: 'Rất tốt! Tinh thần chung là bảo đảm tiến độ, tốc độ nhưng chất lượng phải là số một. Cuộc họp kết thúc tại đây, các bộ phận bắt tay vào triển khai ngay.',
        confidence: 0.99
      }
    ]
  },
  {
    id: 'sample-2',
    name: 'Phong_van_chuyen_gia_AI_Engine.m4a',
    sizeStr: '9.8 MB',
    duration: 142, // 2m 22s
    format: 'M4A • AAC 48kHz • Studio Vocal',
    uploadedAt: 'Hôm qua lúc 15:30',
    modelUsed: 'Google Gemini 2.5 Flash Speech & AVG Neural ASR',
    category: 'Phỏng vấn kỹ thuật',
    summary: {
      executive: 'Phỏng vấn chuyên sâu ứng viên Senior AI Speech Engineer cho bài toán nhận dạng giọng nói tiếng Việt đa phương ngữ và tối ưu mô hình trên máy chủ cục bộ AVG Edge.',
      keyDecisions: [
        'Đánh giá ứng viên đáp ứng tốt kinh nghiệm về CTC decoder và mô hình ngôn ngữ n-gram tích hợp.',
        'Đề xuất offer mức đãi ngộ bậc 4 cùng phụ cấp dự án trọng điểm.'
      ],
      actionItems: [
        { id: 'act-21', task: 'Soạn thảo thư mời nhận việc (Offer Letter) kèm chế độ ESOP', assignee: 'Phòng Nhân sự HR', deadline: '25/09/2026', priority: 'Cao', completed: false },
        { id: 'act-22', task: 'Chuẩn bị trang thiết bị máy trạm GPU cho nhân sự mới', assignee: 'Phòng IT Admin', deadline: '28/09/2026', priority: 'Trung bình', completed: true }
      ]
    },
    segments: [
      {
        id: 's2-seg-1',
        startTime: 0,
        endTime: 35,
        speakerId: 'spk-1',
        speakerName: 'Nguyễn Văn Quản Lý',
        speakerColor: 'spk-1',
        speakerRole: 'Tổng Giám Đốc (CEO)',
        text: 'Chào bạn! Trong lộ trình công nghệ của AVG One, chúng tôi đặt mục tiêu xử lý tiếng Việt thời gian thực với độ trễ dưới 200ms ngay tại máy trạm On-Premises. Bạn đánh giá thế nào về bài toán nén mô hình Whisper và n-gram decoder?',
        confidence: 0.98
      },
      {
        id: 's2-seg-2',
        startTime: 36,
        endTime: 85,
        speakerId: 'spk-4',
        speakerName: 'Phạm Minh Kỹ Sư',
        speakerColor: 'spk-4',
        speakerRole: 'Ứng viên Senior AI',
        text: 'Em đã có 4 năm tối ưu hóa mô hình Transformer sang định dạng ONNX Runtime và TensorRT trên card Nvidia. Với tiếng Việt, việc kết hợp bộ quy tắc dấu câu tự động với mô hình ngôn ngữ ngữ âm giúp giảm đáng kể lỗi từ đồng âm khác nghĩa.',
        confidence: 0.96
      },
      {
        id: 's2-seg-3',
        startTime: 86,
        endTime: 142,
        speakerId: 'spk-2',
        speakerName: 'Lê Văn Nhân Viên',
        speakerColor: 'spk-2',
        speakerRole: 'Kỹ sư trưởng R&D 3.1',
        text: 'Rất ấn tượng với phần trả lời của bạn. Chúng tôi sẽ chuyển hồ sơ sang bộ phận Nhân sự để gửi offer trong tuần này. Cảm ơn bạn đã tham gia buổi trao đổi!',
        confidence: 0.99
      }
    ]
  },
  {
    id: 'sample-3',
    name: 'Dam_phan_hop_dong_cung_ung_linh_kien.wav',
    sizeStr: '28.4 MB',
    duration: 165,
    format: 'WAV Linear PCM • 48kHz / 24-bit',
    uploadedAt: '18/09/2026',
    modelUsed: 'Google Gemini 2.5 Flash Speech & AVG Neural ASR',
    category: 'Đàm phán Pháp lý',
    summary: {
      executive: 'Rà soát các điều khoản thương mại và bảo hộ sở hữu trí tuệ hợp đồng cung cấp linh kiện quang học bán dẫn năm 2026-2027.',
      keyDecisions: [
        'Đối tác cam kết giữ nguyên đơn giá cố định trong vòng 12 tháng.',
        'Mọi bản quyền thiết kế vi mạch phát triển trên bo mạch thuộc sở hữu độc quyền của AVG.'
      ],
      actionItems: [
        { id: 'act-31', task: 'Phòng Pháp chế hoàn tất phụ lục cam kết bảo mật NDA', assignee: 'Phòng 6 Pháp Lý', deadline: '25/09/2026', priority: 'Cao', completed: false }
      ]
    },
    segments: [
      {
        id: 's3-seg-1',
        startTime: 0,
        endTime: 45,
        speakerId: 'spk-3',
        speakerName: 'Trần Thị Trưởng Phòng',
        speakerColor: 'spk-3',
        speakerRole: 'Pháp Lý & Hợp Đồng',
        text: 'Kính thưa các bên, điều khoản 8.3 về cam kết thời gian giao hàng bù trừ nếu xảy ra đứt gãy chuỗi cung ứng cần được làm rõ mức phạt 0.5% mỗi tuần trễ hạn.',
        confidence: 0.97
      },
      {
        id: 's3-seg-2',
        startTime: 46,
        endTime: 110,
        speakerId: 'spk-5',
        speakerName: 'Đại Diện Nhà Cung Ứng',
        speakerColor: 'spk-5',
        speakerRole: 'Giám đốc Kinh doanh Đối tác',
        text: 'Chúng tôi hoàn toàn nhất trí với phương án của AVG One. Chúng tôi cam kết duy trì kho tồn đệm tối thiểu 2000 linh kiện tại kho vệ tinh Bắc Ninh để sẵn sàng ứng cứu tiến độ.',
        confidence: 0.98
      },
      {
        id: 's3-seg-3',
        startTime: 111,
        endTime: 165,
        speakerId: 'spk-1',
        speakerName: 'Nguyễn Văn Quản Lý',
        speakerColor: 'spk-1',
        speakerRole: 'Tổng Giám Đốc (CEO)',
        text: 'Thống nhất như vậy. Hai bên tiến hành ký tắt biên bản ghi nhớ và hoàn tất ký hợp đồng chính thức vào sáng thứ Sáu tuần này.',
        confidence: 0.99
      }
    ]
  }
];

export const FileTranscribeModule: React.FC = () => {
  // 📁 Current Active File State
  const [currentFile, setCurrentFile] = useState<TranscribedFile>(STUDIO_SAMPLE_FILES[0]);
  const [activeTab, setActiveTab] = useState<FileTranscribeNavTab>('editor');

  // 🎵 Audio Playback & Waveform Engine State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(STUDIO_SAMPLE_FILES[0].duration);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loopSegment, setLoopSegment] = useState<boolean>(false);
  const [aiVoiceEnhance, setAiVoiceEnhance] = useState<boolean>(true);

  // 🔍 Search & Filter in Transcript
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpeakerFilter, setSelectedSpeakerFilter] = useState<string>('all');

  // 🤖 AI Insights Drawer State (Tab 1: Q&A, Tab 2: Diễn giả, Tab 3: Biên bản, Tab 4: Cài đặt)
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(true);
  const [aiDrawerTab, setAiDrawerTab] = useState<'copilot' | 'analytics' | 'minutes' | 'glossary'>('copilot');

  // 💬 Copilot Chat State
  const [copilotMessages, setCopilotMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp?: number; timeLabel?: string }>>([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ lý AI AVG Copilot. Tôi đã đọc hiểu toàn bộ bản ghi âm "' + currentFile.name + '". Bạn có thể hỏi tôi bất kỳ câu hỏi nào về nội dung cuộc họp, các quyết định quan trọng hoặc giao việc.',
    }
  ]);
  const [copilotInput, setCopilotInput] = useState<string>('');
  const [isCopilotTyping, setIsCopilotTyping] = useState<boolean>(false);

  // 🛠️ Enterprise Glossary State
  const [glossary, setGlossary] = useState<Array<{ term: string; definition: string; count: number }>>([
    { term: 'AVG-X', definition: 'Dòng vi mạch cảm biến quang học độc quyền của AVG', count: 4 },
    { term: 'Modbus / BLE', definition: 'Giao thức truyền thông công nghiệp & Bluetooth Low Energy', count: 3 },
    { term: '3.1 RDI', definition: 'Phân hệ Nghiên cứu, Phát triển & Đổi mới sáng tạo', count: 5 },
    { term: 'SHTT', definition: 'Sở hữu trí tuệ & Đăng ký bảo hộ sáng chế độc quyền', count: 3 },
    { term: 'Firmware RC2', definition: 'Bản phân phối phần mềm nhúng chuẩn phát hành đợt 2', count: 2 },
  ]);

  // ✏️ In-line Editing & Speaker Rename Modal
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [renamingSpeaker, setRenamingSpeaker] = useState<{ id: string; name: string; role: string } | null>(null);

  // 📥 Modern Studio Import & Recorder Modal
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importModalTab, setImportModalTab] = useState<'upload' | 'record' | 'demo' | 'text'>('upload');
  const [isRecordingMic, setIsRecordingMic] = useState<boolean>(false);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const recordTimerRef = useRef<any>(null);

  // 📤 Export Dialog
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  // 📊 Dynamic Canvas Waveform Reference
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);

  // 🔄 Sync Header Events
  useEffect(() => {
    const handleHeaderTab = (e: any) => {
      if (e.detail) {
        if (e.detail === 'minutes') {
          setActiveTab('editor');
          setIsAiDrawerOpen(true);
          setAiDrawerTab('minutes');
        } else if (e.detail === 'analytics') {
          setActiveTab('editor');
          setIsAiDrawerOpen(true);
          setAiDrawerTab('analytics');
        } else if (e.detail === 'settings') {
          setActiveTab('editor');
          setIsAiDrawerOpen(true);
          setAiDrawerTab('glossary');
        } else {
          setActiveTab(e.detail);
        }
      }
    };
    const handleOpenImport = () => setShowImportModal(true);
    const handleOpenExport = () => setShowExportModal(true);
    const handleToggleCopilot = () => {
      setIsAiDrawerOpen(prev => !prev);
      setAiDrawerTab('copilot');
    };

    window.addEventListener('file_transcribe_tab_change', handleHeaderTab);
    window.addEventListener('file_transcribe_open_import', handleOpenImport);
    window.addEventListener('file_transcribe_open_export', handleOpenExport);
    window.addEventListener('file_transcribe_toggle_ai_copilot', handleToggleCopilot);

    return () => {
      window.removeEventListener('file_transcribe_tab_change', handleHeaderTab);
      window.removeEventListener('file_transcribe_open_import', handleOpenImport);
      window.removeEventListener('file_transcribe_open_export', handleOpenExport);
      window.removeEventListener('file_transcribe_toggle_ai_copilot', handleToggleCopilot);
    };
  }, []);

  // Update Header Nav Tab sync
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('file_transcribe_tab_sync', { detail: activeTab }));
  }, [activeTab]);

  // Audio Playback Simulation Timer (if no real audio source file loaded)
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && (!audioRef.current || !audioRef.current.src || isNaN(audioRef.current.duration))) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(duration, prev + (0.15 * playbackRate));
        });
      }, 150);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration, playbackRate]);

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
      }
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [isPlaying]);

  // Handle Seek
  const handleSeek = (newSecs: number) => {
    const clamped = Math.max(0, Math.min(duration, newSecs));
    setCurrentTime(clamped);
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.currentTime = clamped;
    }
  };

  // Keyboard Shortcuts (Space to play/pause, Left/Right 5s)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSeek(currentTime - 5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSeek(currentTime + 5);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, currentTime, duration]);

  // 🎨 High-Precision Waveform Drawing Canvas
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const totalBars = 140;
    const barWidth = width / totalBars;
    const progressRatio = duration > 0 ? currentTime / duration : 0;
    const currentBarIndex = Math.floor(progressRatio * totalBars);

    // Pre-calculate seeded bar heights based on file id
    const seed = currentFile.id.length * 7;
    for (let i = 0; i < totalBars; i++) {
      const barRatio = i / totalBars;
      const barTime = barRatio * duration;
      
      // Find which speaker segment this bar belongs to
      const seg = currentFile.segments.find(s => barTime >= s.startTime && barTime <= s.endTime);
      const speakerPalette = seg ? (SPEAKER_PALETTES[seg.speakerColor] || SPEAKER_PALETTES['spk-1']) : null;

      // Realistic pseudo-random speech amplitude formula (sine waves + noise)
      const sinVal = Math.sin((i + seed) * 0.28) * 0.35 + Math.cos((i * 1.5 + seed) * 0.5) * 0.25;
      const noise = (Math.sin((i * 13 + seed) * 0.8) + 1) * 0.2;
      const amp = Math.min(0.95, Math.max(0.12, 0.5 + sinVal * 0.4 + noise * 0.2));
      const barHeight = Math.max(4, amp * (height - 18));
      const x = i * barWidth;
      const y = (height - barHeight) / 2;

      // Draw bar
      const isPlayed = i <= currentBarIndex;
      if (isPlayed) {
        ctx.fillStyle = speakerPalette ? speakerPalette.waveColor : '#0284C7';
      } else {
        ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#334155' : '#cbd5e1';
      }

      // Rounded bar
      const r = Math.min(2, barWidth / 3);
      ctx.beginPath();
      ctx.roundRect(x + 1, y, Math.max(1.5, barWidth - 1.8), barHeight, [r, r, r, r]);
      ctx.fill();
    }

    // Draw Playhead line with glowing dot
    const playheadX = progressRatio * width;
    ctx.strokeStyle = '#F15A24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.stroke();

    // Playhead glowing cap
    ctx.fillStyle = '#F15A24';
    ctx.beginPath();
    ctx.arc(playheadX, 5, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(playheadX, 5, 2, 0, Math.PI * 2);
    ctx.fill();
  }, [currentTime, duration, currentFile]);

  // Click on Waveform to seek
  const handleWaveformClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    handleSeek(ratio * duration);
  };

  // Format Seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Find currently active segment
  const activeSegment = useMemo(() => {
    return currentFile.segments.find(s => currentTime >= s.startTime && currentTime <= s.endTime);
  }, [currentFile, currentTime]);

  // Filtered Segments by Search and Speaker Filter
  const filteredSegments = useMemo(() => {
    return currentFile.segments.filter(seg => {
      const matchSpeaker = selectedSpeakerFilter === 'all' || seg.speakerId === selectedSpeakerFilter;
      const matchSearch = !searchQuery.trim() || seg.text.toLowerCase().includes(searchQuery.toLowerCase()) || seg.speakerName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSpeaker && matchSearch;
    });
  }, [currentFile, selectedSpeakerFilter, searchQuery]);

  // Diarization & Speaker Talk-time Analytics
  const speakerStats = useMemo(() => {
    const map: Record<string, { id: string; name: string; role: string; color: string; totalSecs: number; wordsCount: number }> = {};
    currentFile.segments.forEach(seg => {
      if (!map[seg.speakerId]) {
        map[seg.speakerId] = {
          id: seg.speakerId,
          name: seg.speakerName,
          role: seg.speakerRole,
          color: seg.speakerColor,
          totalSecs: 0,
          wordsCount: 0
        };
      }
      map[seg.speakerId].totalSecs += Math.max(1, seg.endTime - seg.startTime);
      map[seg.speakerId].wordsCount += seg.text.trim().split(/\s+/).length;
    });
    const totalTime = currentFile.duration || 1;
    return Object.values(map).map(s => ({
      ...s,
      percent: Math.min(100, Math.round((s.totalSecs / totalTime) * 100)),
      wpm: Math.round((s.wordsCount / (s.totalSecs / 60 || 1)))
    }));
  }, [currentFile]);

  // Handle Ask AI Copilot
  const handleSendCopilot = (questionText?: string) => {
    const q = (questionText || copilotInput).trim();
    if (!q) return;
    setCopilotMessages(prev => [...prev, { sender: 'user', text: q }]);
    setCopilotInput('');
    setIsCopilotTyping(true);

    setTimeout(() => {
      let reply = '';
      let ts: number | undefined;
      let timeLabel: string | undefined;

      const lower = q.toLowerCase();
      if (lower.includes('hạn') || lower.includes('30') || lower.includes('bản quyền') || lower.includes('sáng chế')) {
        reply = 'Tổng Giám Đốc Nguyễn Văn Quản Lý đã chỉ đạo hồ sơ đăng ký bản quyền sáng chế độc quyền phải nộp trước ngày 30 tháng 9 để tránh rủi ro tranh chấp sở hữu trí tuệ.';
        ts = 63;
        timeLabel = '01:03';
      } else if (lower.includes('ngân sách') || lower.includes('kinh phí') || lower.includes('tiền')) {
        reply = 'Chủ tọa cuộc họp đã duyệt bổ sung ngân sách mua sắm linh kiện bán dẫn đo lường từ đối tác Đài Loan theo đề xuất của nhóm R&D.';
        ts = 80;
        timeLabel = '01:20';
      } else if (lower.includes('firmware') || lower.includes('tiến độ') || lower.includes('rdi') || lower.includes('vi mạch')) {
        reply = 'Kỹ sư trưởng Lê Văn Nhân Viên báo cáo đã đo kiểm 50 bo mạch mẫu: độ suy hao dưới 0.2%, độ trễ phản hồi chỉ còn 12ms. Cần chừa khe ăng-ten ở vỏ nhôm 3.2 để sóng không bị chắn.';
        ts = 25;
        timeLabel = '00:25';
      } else if (lower.includes('thư ký') || lower.includes('biên bản') || lower.includes('16 giờ')) {
        reply = 'Thư ký Trần Thị Trưởng Phòng cam kết hoàn tất tờ trình mô tả kỹ thuật sáng chế và tải biên bản họp lên AVG One trước 16:00 chiều nay.';
        ts = 105;
        timeLabel = '01:45';
      } else {
        reply = `Theo bản ghi âm "${currentFile.name}": Cuộc họp đã thống nhất các mục tiêu trọng tâm, phân công rõ người phụ trách từng hạng mục và ấn định các mốc nghiệm thu kỹ thuật.`;
        ts = 0;
        timeLabel = '00:00';
      }

      setCopilotMessages(prev => [...prev, { sender: 'ai', text: reply, timestamp: ts, timeLabel }]);
      setIsCopilotTyping(false);
    }, 600);
  };

  // Toggle Highlight/Bookmark Segment
  const toggleHighlightSegment = (segId: string) => {
    setCurrentFile(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segId ? { ...s, highlighted: !s.highlighted } : s)
    }));
  };

  // Save Inline Segment Text Edit
  const handleSaveSegmentEdit = (segId: string) => {
    setCurrentFile(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segId ? { ...s, text: editingText } : s)
    }));
    setEditingSegmentId(null);
    setCopiedToast('Đã lưu chỉnh sửa văn bản');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Rename Speaker Globally
  const handleSaveRenameSpeaker = () => {
    if (!renamingSpeaker) return;
    setCurrentFile(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.speakerId === renamingSpeaker.id ? { ...s, speakerName: renamingSpeaker.name, speakerRole: renamingSpeaker.role } : s)
    }));
    setRenamingSpeaker(null);
    setCopiedToast('Đã cập nhật danh tính diễn giả toàn bộ biên bản');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Copy Full Transcript to Clipboard
  const handleCopyTranscript = () => {
    const fullText = currentFile.segments.map(s => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] ${s.speakerName} (${s.speakerRole}):\n${s.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedToast('Đã sao chép toàn bộ văn bản vào clipboard!');
    setTimeout(() => setCopiedToast(null), 3000);
  };

  // Export File (Word, PDF, SRT, TXT)
  const handleExportDownload = (type: 'docx' | 'pdf' | 'srt' | 'txt') => {
    let content = '';
    let filename = `${currentFile.name.replace(/\.[^/.]+$/, "")}_AVG_Transcript`;

    if (type === 'srt') {
      filename += '.srt';
      content = currentFile.segments.map((s, idx) => {
        const startH = Math.floor(s.startTime / 3600).toString().padStart(2, '0');
        const startM = Math.floor((s.startTime % 3600) / 60).toString().padStart(2, '0');
        const startS = Math.floor(s.startTime % 60).toString().padStart(2, '0');
        const endH = Math.floor(s.endTime / 3600).toString().padStart(2, '0');
        const endM = Math.floor((s.endTime % 3600) / 60).toString().padStart(2, '0');
        const endS = Math.floor(s.endTime % 60).toString().padStart(2, '0');
        return `${idx + 1}\n${startH}:${startM}:${startS},000 --> ${endH}:${endM}:${endS},000\n${s.speakerName}: ${s.text}\n`;
      }).join('\n');
    } else if (type === 'docx') {
      filename += '.doc';
      content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Biên Bản Họp AVG One</title></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 24px;">
          <h1 style="color: #F15A24; text-transform: uppercase;">BIÊN BẢN HỌP ĐIỀU HÀNH - HỆ THỐNG AVG ONE</h1>
          <p><strong>Tệp ghi âm:</strong> ${currentFile.name}</p>
          <p><strong>Thời lượng:</strong> ${formatTime(currentFile.duration)} | <strong>Mô hình AI:</strong> ${currentFile.modelUsed}</p>
          <hr/>
          <h2>I. TÓM TẮT ĐIỀU HÀNH</h2>
          <p>${currentFile.summary.executive}</p>
          <h2>II. CÁC QUYẾT ĐỊNH TRỌNG YẾU</h2>
          <ul>${currentFile.summary.keyDecisions.map(d => `<li>${d}</li>`).join('')}</ul>
          <h2>III. CHI TIẾT NỘI DUNG VĂN BẢN</h2>
          ${currentFile.segments.map(s => `
            <div style="margin-bottom: 16px;">
              <strong style="color: #0284C7;">[${formatTime(s.startTime)}] ${s.speakerName} (${s.speakerRole}):</strong>
              <p style="margin: 4px 0;">${s.text}</p>
            </div>
          `).join('')}
        </body>
        </html>
      `;
    } else {
      filename += '.txt';
      content = `BIÊN BẢN GHI ÂM AVG ONE: ${currentFile.name}\n${currentFile.summary.executive}\n\n` +
        currentFile.segments.map(s => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] ${s.speakerName} (${s.speakerRole}):\n${s.text}`).join('\n\n');
    }

    const blob = new Blob([content], { type: type === 'docx' ? 'application/msword;charset=utf-8' : 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedToast(`Đã xuất tệp ${filename} thành công!`);
    setShowExportModal(false);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  // Switch to Sample File
  const handleSelectSample = (sample: TranscribedFile) => {
    setCurrentFile(sample);
    setDuration(sample.duration);
    setCurrentTime(0);
    setIsPlaying(false);
    setShowImportModal(false);
    setCopilotMessages([
      {
        sender: 'ai',
        text: `Đã mở tệp "${sample.name}". Tôi đã sẵn sàng hỗ trợ giải đáp mọi thông tin trong cuộc họp này.`
      }
    ]);
    setCopiedToast(`Đã nạp tệp: ${sample.name}`);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Handle Real File Upload
  const handleRealFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    const newFile: TranscribedFile = {
      id: `uploaded-${Date.now()}`,
      name: file.name,
      sizeStr: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      duration: 180,
      format: file.type || 'Audio Media',
      uploadedAt: 'Vừa xong',
      modelUsed: 'Google Gemini 2.5 Flash Speech & AVG Neural ASR',
      audioUrl: url,
      summary: {
        executive: `Biên bản ghi âm tệp "${file.name}" được nạp vào Studio lúc ${new Date().toLocaleTimeString('vi-VN')}. Hệ thống AI đang tự động phân tích và tạo mục lục thông minh.`,
        keyDecisions: [
          'Đã tiếp nhận tệp âm thanh vào hệ sinh thái điều hành AVG One.',
          'Kích hoạt bộ lọc khử nhiễu tự động và chuẩn hóa thuật ngữ chuyên ngành.'
        ],
        actionItems: [
          { id: 'act-upload-1', task: `Kiểm tra và xác nhận nội dung biên bản ${file.name}`, assignee: 'Người dùng hiện tại', deadline: 'Hôm nay', priority: 'Cao', completed: false }
        ]
      },
      segments: [
        {
          id: `seg-up-1`,
          startTime: 0,
          endTime: 30,
          speakerId: 'spk-1',
          speakerName: 'Người phát biểu 1',
          speakerColor: 'spk-1',
          speakerRole: 'Chủ trì',
          text: `Hệ thống AVG Studio đã tải thành công tệp âm thanh "${file.name}". Nhấn nút phát để lắng nghe sóng âm thanh và dùng Trợ lý AI Copilot để khai thác nội dung.`,
          confidence: 0.99
        }
      ]
    };
    setCurrentFile(newFile);
    setDuration(180);
    setCurrentTime(0);
    setIsPlaying(false);
    setShowImportModal(false);
    setCopiedToast(`Đã tải lên tệp ${file.name}`);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden relative font-sans select-none">
      
      {/* 🎵 Hidden HTML5 Audio Element for real media files */}
      <audio
        ref={audioRef}
        src={currentFile.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current && !isNaN(audioRef.current.currentTime)) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setDuration(Math.round(audioRef.current.duration));
          }
        }}
      />

      {/* 🌐 Studio Tech Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-30 pointer-events-none -z-0" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* 🍞 Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl font-bold text-xs flex items-center gap-2 border border-slate-700/50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎛️ STUDIO SUB-TOOLBAR: TÊN TỆP • ĐỊNH DẠNG • NÚT THAO TÁC NHANH */}
      {/* ========================================================================= */}
      <div className="flex-shrink-0 h-11 px-4 sm:px-6 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs gap-3 z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#0284C7]/15 text-[#0284C7] dark:text-sky-400 flex items-center justify-center shrink-0">
            <FileAudio className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-slate-800 dark:text-slate-100 truncate max-w-[280px] sm:max-w-[420px]" title={currentFile.name}>
            {currentFile.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
            {currentFile.format}
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
            <Sparkles className="w-3 h-3" />
            <span>AI Speech Engine</span>
          </span>
        </div>

        {/* Quick Toolbar Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Change File button */}
          <button
            onClick={() => setShowImportModal(true)}
            className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0284C7] hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Đổi sang cuộc họp khác"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đổi tệp</span>
          </button>

          {/* Toggle AI Insights Drawer button */}
          <button
            onClick={() => setIsAiDrawerOpen(prev => !prev)}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAiDrawerOpen
                ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Mở/Đóng Bảng thông tin AI Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Bảng AI</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌊 DYNAMIC AUDIO WAVEFORM TIMELINE (TRÌNH PHÁT SÓNG ÂM TƯƠNG TÁC CAO CẤP) */}
      {/* ========================================================================= */}
      <div className="flex-shrink-0 bg-white/95 dark:bg-[#0F172A]/95 border-b border-slate-200/90 dark:border-slate-800 px-4 sm:px-6 py-2.5 z-20 shadow-xs relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          
          {/* Waveform Canvas & Time Markers */}
          <div ref={waveformContainerRef} className="relative w-full h-16 sm:h-20 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden cursor-pointer group">
            {/* Interactive Canvas */}
            <canvas
              ref={waveformCanvasRef}
              width={1200}
              height={80}
              onClick={handleWaveformClick}
              className="w-full h-full block"
              title="Bấm vào bất kỳ đâu trên sóng để tua nhanh âm thanh"
            />

            {/* Time Stamp Floating Pills */}
            <div className="absolute bottom-1 left-2 text-[9.5px] font-mono font-bold text-slate-400 dark:text-slate-500 pointer-events-none select-none">
              00:00
            </div>
            <div className="absolute bottom-1 right-2 text-[9.5px] font-mono font-bold text-slate-400 dark:text-slate-500 pointer-events-none select-none">
              {formatTime(duration)}
            </div>

            {/* Current Active Speaker floating tag */}
            {activeSegment && (
              <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200 shadow-2xs pointer-events-none flex items-center gap-1.5 animate-fadeIn">
                <span className={`w-2 h-2 rounded-full ${SPEAKER_PALETTES[activeSegment.speakerColor]?.dot || 'bg-sky-500'}`} />
                <span>{activeSegment.speakerName}</span>
                <span className="text-slate-400 font-mono">({formatTime(currentTime)})</span>
              </div>
            )}
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center justify-between gap-3 text-xs">
            {/* Left: Playback buttons & Current Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play / Pause button (Big Orange Pill) */}
              <button
                onClick={togglePlay}
                className="h-8 sm:h-9 px-3.5 rounded-xl bg-gradient-to-r from-[#F15A24] to-[#ff7e42] hover:opacity-95 text-white font-extrabold flex items-center gap-1.5 shadow-xs shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? "Tạm dừng (Space)" : "Phát audio (Space)"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white stroke-[2]" />
                    <span className="hidden sm:inline">Tạm dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white stroke-[2] ml-0.5" />
                    <span className="hidden sm:inline">Phát audio</span>
                  </>
                )}
              </button>

              {/* Jump -5s */}
              <button
                onClick={() => handleSeek(currentTime - 5)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Lùi 5 giây (Mũi tên trái)"
              >
                <Rewind className="w-4 h-4" />
              </button>

              {/* Jump +5s */}
              <button
                onClick={() => handleSeek(currentTime + 5)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Tiến 5 giây (Mũi tên phải)"
              >
                <FastForward className="w-4 h-4" />
              </button>

              {/* Current Time Display */}
              <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm pl-1">
                <span className="text-[#0284C7] dark:text-sky-400">{formatTime(currentTime)}</span>
                <span className="text-slate-400 dark:text-slate-600 mx-1">/</span>
                <span className="text-slate-500 dark:text-slate-400">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right: Speed, Loop, Volume, AI Clarity */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Speed Selector */}
              <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-[11px] font-bold">
                {[0.75, 1.0, 1.25, 1.5, 2.0].map(speed => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackRate(speed);
                      if (audioRef.current) audioRef.current.playbackRate = speed;
                    }}
                    className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      playbackRate === speed
                        ? 'bg-white dark:bg-slate-900 text-[#0284C7] dark:text-sky-400 shadow-2xs font-black'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* AI Voice Clarity toggle */}
              <button
                onClick={() => setAiVoiceEnhance(prev => !prev)}
                className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                  aiVoiceEnhance
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0284C7] dark:text-sky-300 border-sky-200 dark:border-sky-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent'
                }`}
                title="Tự động lọc tạp âm và tăng cường độ rõ của giọng nói"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-sky-400" />
                <span>AI Voice Clarity</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📖 MAIN WORKSPACE: SMART TRANSCRIPT CANVAS (LEFT) + AI INSIGHTS DRAWER (RIGHT) */}
      {/* ========================================================================= */}
      <div className="flex-1 min-h-0 flex overflow-hidden relative">
        
        {/* ======================================================================= */}
        {/* 📄 SMART DOCUMENT TRANSCRIPT CANVAS */}
        {/* ======================================================================= */}
        <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-slate-50/50 dark:bg-[#070B16]/50">
          
          {/* Document Header Bar (Search & Filter) */}
          <div className="flex-shrink-0 h-12 px-4 sm:px-8 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs">
            {/* Search in transcript */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm nội dung lời nói, từ khóa trong biên bản..."
                className="w-full h-8 pl-8 pr-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0284C7] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter by Speaker */}
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-semibold">Diễn giả:</span>
              <select
                value={selectedSpeakerFilter}
                onChange={(e) => setSelectedSpeakerFilter(e.target.value)}
                className="h-8 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0284C7] cursor-pointer"
              >
                <option value="all">Tất cả người nói ({speakerStats.length})</option>
                {speakerStats.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                ))}
              </select>

              {/* Copy Transcript Button */}
              <button
                onClick={handleCopyTranscript}
                className="h-8 px-2.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Sao chép toàn bộ biên bản"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Sao chép</span>
              </button>
            </div>
          </div>

          {/* Transcript Scroll Area (Document style) */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-6 space-y-4 no-scrollbar">
            <div className="max-w-4xl mx-auto space-y-4">
              
              {filteredSegments.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-600 dark:text-slate-300 text-sm">Không tìm thấy đoạn hội thoại nào phù hợp</p>
                  <p className="text-xs text-slate-400">Thử tìm kiếm với từ khóa khác hoặc bỏ lọc người nói.</p>
                </div>
              ) : (
                filteredSegments.map((segment) => {
                  const palette = SPEAKER_PALETTES[segment.speakerColor] || SPEAKER_PALETTES['spk-1'];
                  const isCurrentActive = currentTime >= segment.startTime && currentTime <= segment.endTime;
                  const isEditing = editingSegmentId === segment.id;

                  // Split words for Karaoke word-level highlighting
                  const words = segment.text.split(' ');
                  const segDuration = Math.max(1, segment.endTime - segment.startTime);
                  const activeWordIndex = isCurrentActive
                    ? Math.floor(((currentTime - segment.startTime) / segDuration) * words.length)
                    : -1;

                  return (
                    <div
                      key={segment.id}
                      className={`group rounded-2xl p-4 sm:p-5 transition-all duration-200 border relative ${
                        isCurrentActive
                          ? 'bg-white dark:bg-slate-900 border-[#0284C7] dark:border-sky-500 shadow-md ring-1 ring-sky-400/30'
                          : segment.highlighted
                          ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-xs'
                          : 'bg-white/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      {/* Top Turn Header: Speaker Avatar, Name, Timestamp, Actions */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Speaker Initial Avatar */}
                          <div className={`w-7 h-7 rounded-lg ${palette.bg} ${palette.text} border ${palette.border} flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`}>
                            {segment.speakerName.charAt(0)}
                          </div>

                          {/* Speaker Name (Click to rename globally) */}
                          <button
                            onClick={() => setRenamingSpeaker({ id: segment.speakerId, name: segment.speakerName, role: segment.speakerRole })}
                            className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100 hover:text-[#0284C7] dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 cursor-pointer truncate"
                            title="Bấm để đổi tên diễn giả toàn bộ biên bản"
                          >
                            <span>{segment.speakerName}</span>
                            <Edit3 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>

                          {/* Speaker Role Badge */}
                          <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md ${palette.badge} shrink-0`}>
                            {segment.speakerRole}
                          </span>
                        </div>

                        {/* Right: Timestamp Pill & Hover Segment Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Bookmark / Highlight Button */}
                          <button
                            onClick={() => toggleHighlightSegment(segment.id)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                              segment.highlighted
                                ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/50'
                                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            title={segment.highlighted ? "Bỏ đánh dấu quan trọng" : "Đánh dấu đoạn này là quan trọng"}
                          >
                            <Star className={`w-3.5 h-3.5 ${segment.highlighted ? 'fill-amber-500' : ''}`} />
                          </button>

                          {/* Jump to audio timestamp */}
                          <button
                            onClick={() => handleSeek(segment.startTime)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              isCurrentActive
                                ? 'bg-[#0284C7] text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                            title="Nghe đoạn thoại này"
                          >
                            <Play className={`w-2.5 h-2.5 ${isCurrentActive ? 'fill-white' : 'fill-slate-600 dark:fill-slate-300'}`} />
                            <span>{formatTime(segment.startTime)} - {formatTime(segment.endTime)}</span>
                          </button>
                        </div>
                      </div>

                      {/* Turn Body: In-line editable or Karaoke word-by-word rendered */}
                      {isEditing ? (
                        <div className="space-y-2 mt-2">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            rows={3}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-[#0284C7] text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40 leading-relaxed font-sans"
                            autoFocus
                          />
                          <div className="flex items-center justify-end gap-2 text-xs">
                            <button
                              onClick={() => setEditingSegmentId(null)}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => handleSaveSegmentEdit(segment.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#0284C7] hover:bg-sky-600 text-white font-bold flex items-center gap-1 shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Lưu văn bản</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onDoubleClick={() => {
                            setEditingSegmentId(segment.id);
                            setEditingText(segment.text);
                          }}
                          className="text-xs sm:text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-200 font-normal pl-9 cursor-text"
                          title="Click đúp để chỉnh sửa trực tiếp đoạn văn bản này"
                        >
                          {words.map((word, wIdx) => {
                            const isWordActive = isCurrentActive && wIdx === activeWordIndex;
                            const isSearchMatch = searchQuery.trim() && word.toLowerCase().includes(searchQuery.toLowerCase());

                            return (
                              <span
                                key={wIdx}
                                className={`inline-block mr-1 px-0.5 rounded transition-all duration-75 ${
                                  isWordActive
                                    ? 'bg-[#0284C7] text-white font-bold scale-105 shadow-2xs'
                                    : isSearchMatch
                                    ? 'bg-amber-300 dark:bg-amber-700 text-slate-900 dark:text-white font-bold'
                                    : ''
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 🤖 COLLAPSIBLE AI INSIGHTS & COPILOT DRAWER (RIGHT PANEL) */}
        {/* ======================================================================= */}
        {isAiDrawerOpen && (
          <aside className="w-80 sm:w-96 flex-shrink-0 h-full border-l border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md flex flex-col z-10 shadow-lg transition-all animate-slideInRight">
            
            {/* Drawer Tabs: Copilot Q&A / Diễn giả / Biên bản / Thuật ngữ */}
            <div className="flex-shrink-0 border-b border-slate-200/80 dark:border-slate-800 p-2 flex items-center justify-between gap-1 bg-slate-50/80 dark:bg-slate-900/80">
              <div className="grid grid-cols-4 w-full gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setAiDrawerTab('copilot')}
                  className={`py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                    aiDrawerTab === 'copilot'
                      ? 'bg-purple-600 text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trợ lý AI</span>
                </button>

                <button
                  onClick={() => setAiDrawerTab('analytics')}
                  className={`py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                    aiDrawerTab === 'analytics'
                      ? 'bg-[#0284C7] text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Diễn giả</span>
                </button>

                <button
                  onClick={() => setAiDrawerTab('minutes')}
                  className={`py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                    aiDrawerTab === 'minutes'
                      ? 'bg-emerald-600 text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Nhiệm vụ</span>
                </button>

                <button
                  onClick={() => setAiDrawerTab('glossary')}
                  className={`py-1.5 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                    aiDrawerTab === 'glossary'
                      ? 'bg-orange-600 text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Thuật ngữ</span>
                </button>
              </div>

              {/* Close Drawer Button */}
              <button
                onClick={() => setIsAiDrawerOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 ml-1 cursor-pointer"
                title="Thu gọn bảng AI"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body Container */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 no-scrollbar">
              
              {/* ================================================================= */}
              {/* TAB 1: 🤖 AVG COPILOT (AI Q&A WITH RECORDING) */}
              {/* ================================================================= */}
              {aiDrawerTab === 'copilot' && (
                <div className="h-full flex flex-col justify-between space-y-3">
                  {/* Messages Stream */}
                  <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
                    {copilotMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                      >
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[90%] shadow-2xs ${
                            msg.sender === 'user'
                              ? 'bg-purple-600 text-white rounded-tr-none font-medium'
                              : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/80'
                          }`}
                        >
                          {msg.text}

                          {/* Clickable timestamp citation */}
                          {msg.timestamp !== undefined && msg.timeLabel && (
                            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Trích dẫn audio:</span>
                              <button
                                onClick={() => handleSeek(msg.timestamp!)}
                                className="px-2 py-0.5 rounded-md bg-[#0284C7] hover:bg-sky-600 text-white font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                              >
                                <Play className="w-2.5 h-2.5 fill-white" />
                                <span>{msg.timeLabel}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isCopilotTyping && (
                      <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs w-32 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                        <span>AI đang đọc...</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Prompts Suggestions */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 shrink-0">
                    <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Gợi ý câu hỏi:</p>
                    <div className="flex flex-wrap gap-1">
                      {[
                        'Hạn chót nộp hồ sơ sáng chế?',
                        'Sếp duyệt ngân sách gì?',
                        'Kết quả đo kiểm vi mạch?'
                      ].map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendCopilot(prompt)}
                          className="text-[10.5px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-700 dark:hover:text-purple-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors text-left truncate max-w-full cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Form */}
                  <div className="relative shrink-0">
                    <input
                      type="text"
                      value={copilotInput}
                      onChange={(e) => setCopilotInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendCopilot()}
                      placeholder="Hỏi bất kỳ điều gì về cuộc họp..."
                      className="w-full h-10 pl-3 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-purple-200 dark:border-purple-900/60 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      onClick={() => handleSendCopilot()}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Gửi câu hỏi"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 2: 📊 SPEAKER ANALYTICS (THỜI LƯỢNG & TỐC ĐỘ PHÁT BIỂU) */}
              {/* ================================================================= */}
              {aiDrawerTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#0284C7] dark:text-sky-300">
                      <span>Tổng quan Diễn giả</span>
                      <span>{speakerStats.length} Người tham gia</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Tự động phân tách giọng nói (Diarization) & nhận diện mẫu phát biểu.
                    </p>
                  </div>

                  {/* Talk-time Breakdown Progress Bars */}
                  <div className="space-y-3">
                    <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                      Tỷ lệ thời lượng phát biểu
                    </p>
                    {speakerStats.map((spk) => {
                      const pal = SPEAKER_PALETTES[spk.color] || SPEAKER_PALETTES['spk-1'];
                      return (
                        <div key={spk.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${pal.dot}`} />
                              <span className="font-black text-slate-800 dark:text-slate-100">{spk.name}</span>
                            </div>
                            <span className="font-extrabold font-mono text-[#0284C7] dark:text-sky-400">{spk.percent}%</span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="h-full transition-all duration-500 rounded-full"
                              style={{ width: `${spk.percent}%`, backgroundColor: pal.waveColor }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400">
                            <span>Thời lượng: {formatTime(spk.totalSecs)}</span>
                            <span>Tốc độ: {spk.wpm} từ/phút (WPM)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 3: 📋 BIÊN BẢN HỌP & ACTION ITEMS (CHECKLIST GIAO VIỆC) */}
              {/* ================================================================= */}
              {aiDrawerTab === 'minutes' && (
                <div className="space-y-4">
                  {/* Executive Summary Card */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tóm tắt Điều hành (Executive)</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                      {currentFile.summary.executive}
                    </p>
                  </div>

                  {/* Key Decisions */}
                  <div className="space-y-2">
                    <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                      Quyết định then chốt
                    </p>
                    <div className="space-y-1.5">
                      {currentFile.summary.keyDecisions.map((dec, dIdx) => (
                        <div key={dIdx} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0 stroke-[3]" />
                          <span className="text-slate-700 dark:text-slate-200 leading-snug">{dec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items with Checkboxes */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                        Nhiệm vụ & Người phụ trách
                      </p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                        {currentFile.summary.actionItems.filter(a => a.completed).length}/{currentFile.summary.actionItems.length} Xong
                      </span>
                    </div>

                    <div className="space-y-2">
                      {currentFile.summary.actionItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border transition-all ${
                            item.completed
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 opacity-70'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => {
                                setCurrentFile(prev => ({
                                  ...prev,
                                  summary: {
                                    ...prev.summary,
                                    actionItems: prev.summary.actionItems.map(a => a.id === item.id ? { ...a, completed: !a.completed } : a)
                                  }
                                }));
                              }}
                              className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className={`text-xs font-bold leading-snug ${item.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                                {item.task}
                              </p>
                              <div className="flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-400">
                                <span>Phụ trách: <strong>{item.assignee}</strong></span>
                                <span className={`px-1.5 py-0.2 rounded font-extrabold ${item.priority === 'Cao' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-slate-100 text-slate-600'}`}>
                                  {item.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 4: 🛠️ ENTERPRISE GLOSSARY (TỪ ĐIỂN THUẬT NGỮ AVG) */}
              {/* ================================================================= */}
              {aiDrawerTab === 'glossary' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#F15A24] dark:text-orange-400">
                      <span>Từ điển Thuật ngữ AVG One</span>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Đảm bảo các từ viết tắt kỹ thuật, ký hiệu linh kiện không bị nhận diện sai ngữ âm.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {glossary.map((item, gIdx) => (
                      <div key={gIdx} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-[#0284C7] dark:text-sky-400">{item.term}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                            Xuất hiện {item.count} lần
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                          {item.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 📥 MODERN STUDIO IMPORT & RECORDER MODAL */}
      {/* ========================================================================= */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-black text-[#0284C7] dark:text-sky-400 uppercase tracking-tight">
                <FileAudio className="w-5 h-5 text-[#F15A24]" />
                <span>Nạp Tệp Ghi Âm & Phòng Thu Studio</span>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Nav Tabs */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 gap-2 text-xs font-bold pt-2">
              {[
                { id: 'demo' as const, label: '3 Cuộc họp AVG mẫu', icon: Star },
                { id: 'upload' as const, label: 'Tải tệp âm thanh / video', icon: FileAudio },
                { id: 'record' as const, label: 'Thu âm Studio trực tiếp', icon: Mic },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setImportModalTab(tab.id)}
                  className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                    importModalTab === tab.id
                      ? 'border-[#0284C7] text-[#0284C7] dark:text-sky-400 font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* TAB 1: 3 CUỘC HỌP MẪU TRẢI NGHIỆM TỨC THÌ */}
              {importModalTab === 'demo' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Chọn nhanh một trong các phiên họp thực tế của AVG One để trải nghiệm tức thì toàn bộ tính năng Studio, sóng âm thanh và Trợ lý AI:
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {STUDIO_SAMPLE_FILES.map((sample) => {
                      const isSelected = currentFile.id === sample.id;
                      return (
                        <div
                          key={sample.id}
                          onClick={() => handleSelectSample(sample)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-sky-50/80 dark:bg-sky-950/60 border-[#0284C7] shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/15 text-[#0284C7] dark:text-sky-400 flex items-center justify-center font-black shrink-0">
                              <FileAudio className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <p className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                                {sample.name}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                <span>{formatTime(sample.duration)}</span>
                                <span>•</span>
                                <span>{sample.sizeStr}</span>
                                <span>•</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{sample.category}</span>
                              </div>
                            </div>
                          </div>

                          <button className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all shrink-0 ${
                            isSelected
                              ? 'bg-[#0284C7] text-white shadow-xs'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-[#0284C7] hover:text-white'
                          }`}>
                            {isSelected ? 'Đang mở' : 'Mở tệp này'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: TẢI TỆP TỪ MÁY TÍNH */}
              {importModalTab === 'upload' && (
                <div className="space-y-4">
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.[0]) handleRealFileUpload(e.dataTransfer.files[0]);
                    }}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-sky-300 dark:border-sky-800 bg-sky-50/50 dark:bg-slate-950 hover:bg-sky-50 dark:hover:bg-slate-900 transition-all cursor-pointer text-center space-y-3"
                  >
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={(e) => e.target.files?.[0] && handleRealFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#00A8E8] text-white flex items-center justify-center shadow-lg shadow-sky-500/25">
                      <FileAudio className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-black text-sm text-slate-800 dark:text-slate-100">
                        Kéo thả tệp âm thanh hoặc bấm để chọn tệp
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Hỗ trợ MP3, WAV, M4A, AAC, FLAC, OGG, MP4, WebM (Dung lượng lên đến 500 MB)
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* TAB 3: THU ÂM TRỰC TIẾP TỪ MICRO STUDIO */}
              {importModalTab === 'record' && (
                <div className="text-center py-6 space-y-4">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all ${
                    isRecordingMic
                      ? 'bg-red-500 text-white shadow-xl shadow-red-500/40 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Mic className="w-9 h-9 stroke-[2.2]" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-mono text-2xl font-black text-slate-800 dark:text-slate-100">
                      {formatTime(recordSeconds)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isRecordingMic ? 'Đang thu âm chất lượng cao...' : 'Bấm nút dưới để bắt đầu thu âm từ micro'}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    {!isRecordingMic ? (
                      <button
                        onClick={() => {
                          setIsRecordingMic(true);
                          setRecordSeconds(0);
                          recordTimerRef.current = setInterval(() => {
                            setRecordSeconds(p => p + 1);
                          }, 1000);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer"
                      >
                        <Mic className="w-4 h-4" />
                        <span>Bắt đầu thu âm</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsRecordingMic(false);
                          if (recordTimerRef.current) clearInterval(recordTimerRef.current);
                          setCopiedToast('Đã dừng và nạp bản thu âm vào Studio!');
                          setShowImportModal(false);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                      >
                        <Square className="w-4 h-4 fill-white" />
                        <span>Dừng & Nạp vào Studio</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📤 EXPORT STUDIO MODAL */}
      {/* ========================================================================= */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm text-[#0284C7] dark:text-sky-400 uppercase">
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Xuất Bản Biên Bản & Báo Cáo</span>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-3">
              {[
                { type: 'docx' as const, title: 'Tài liệu Microsoft Word (.docx)', desc: 'Đầy đủ tóm tắt điều hành, quyết định & hội thoại chuẩn công văn AVG', icon: FileText, color: 'text-blue-600' },
                { type: 'pdf' as const, title: 'Báo cáo Biên bản PDF (.pdf)', desc: 'Định dạng in ấn trang trọng kèm biểu đồ và phân công việc', icon: Printer, color: 'text-red-600' },
                { type: 'srt' as const, title: 'Phụ đề Video SubRip (.srt)', desc: 'Tệp phụ đề có timestamp từng câu chính xác để ghép video', icon: Layers, color: 'text-purple-600' },
                { type: 'txt' as const, title: 'Văn bản thuần túy (.txt)', desc: 'Văn bản dạng Text nhẹ nhàng, dễ dàng gửi qua tin nhắn', icon: FileDown, color: 'text-slate-600' },
              ].map(opt => (
                <button
                  key={opt.type}
                  onClick={() => handleExportDownload(opt.type)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#0284C7] hover:bg-sky-50/50 dark:hover:bg-slate-800/80 transition-all text-left flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <opt.icon className={`w-5 h-5 ${opt.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] transition-colors">
                      {opt.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 👤 SPEAKER GLOBAL RENAME MODAL */}
      {/* ========================================================================= */}
      {renamingSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-800 dark:text-slate-100">
              <User className="w-4 h-4 text-[#0284C7]" />
              <span>Đổi danh tính Diễn giả toàn bộ</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-400">Họ và tên diễn giả:</label>
                <input
                  type="text"
                  value={renamingSpeaker.name}
                  onChange={(e) => setRenamingSpeaker({ ...renamingSpeaker, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-400">Chức vụ / Vai trò:</label>
                <input
                  type="text"
                  value={renamingSpeaker.role}
                  onChange={(e) => setRenamingSpeaker({ ...renamingSpeaker, role: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRenamingSpeaker(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveRenameSpeaker}
                className="px-4 py-1.5 rounded-lg bg-[#0284C7] hover:bg-sky-600 text-white font-black text-xs shadow-xs"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
