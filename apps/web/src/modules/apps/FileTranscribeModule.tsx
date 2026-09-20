import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  UploadCloud, FileAudio, FileText, Music, Play, Pause, RotateCcw,
  Volume2, VolumeX, Copy, Download, Trash2, Search, Check, Sparkles,
  Settings, Sliders, ChevronRight, Edit3, User, Clock, CheckCircle2,
  AlertCircle, ArrowRight, Share2, FastForward, Rewind, Eye,
  FolderOpen, Plus, RefreshCw, Activity, ShieldCheck, Zap, Layers,
  ListFilter, ExternalLink, Printer, FileDown
} from 'lucide-react';
import { processRealtimeSpeechPunctuation } from '../../services/speechPunctuationEngine';
import { FileTranscribeNavTab } from '../../components/layout/headers/FileTranscribeHeader';

export interface AudioSegment {
  id: string;
  startTime: number; // In seconds
  endTime: number; // In seconds
  speakerId: string;
  speakerName: string;
  speakerColor: string;
  speakerRole: string;
  text: string;
  confidence: number;
}

export interface TranscribedFile {
  id: string;
  name: string;
  sizeStr: string;
  duration: number; // In seconds
  format: string;
  uploadedAt: string;
  modelUsed: string;
  segments: AudioSegment[];
  summary: {
    executive: string;
    keyDecisions: string[];
    actionItems: Array<{ task: string; assignee: string; deadline: string; priority: 'Cao' | 'Trung bình' | 'Tiêu chuẩn' }>;
  };
  audioUrl?: string;
}

const SPEAKER_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  'spk-1': { bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200' },
  'spk-2': { bg: 'bg-orange-50 dark:bg-orange-950/40', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-300', badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200' },
  'spk-3': { bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200' },
  'spk-4': { bg: 'bg-purple-50 dark:bg-purple-950/40', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200' },
};

// 🌟 3 MẪU FILE GHI ÂM ĐẶC TRƯNG CỦA AVG ONE ĐỂ TRẢI NGHIỆM TỨC THÌ
const SAMPLE_FILES: TranscribedFile[] = [
  {
    id: 'sample-1',
    name: 'Giao_ban_dieu_hanh_Sensor_AI_Tuan38.mp3',
    sizeStr: '14.2 MB',
    duration: 185, // 3m 05s
    format: 'MP3 (Stereo, 44.1kHz)',
    uploadedAt: 'Hôm nay lúc 09:15',
    modelUsed: 'AVG Neural ASR v2.4 (Khuyên dùng)',
    summary: {
      executive: 'Cuộc họp rà soát tiến độ tích hợp vi mạch cảm biến quang học thế hệ mới AVG-X. Ban Lãnh Đạo đã thống nhất chỉ đạo phòng R&D hoàn thiện firmware phiên bản RC2 trước thứ Năm để nộp hồ sơ bảo hộ sáng chế SHTT.',
      keyDecisions: [
        'Duyệt đề xuất kinh phí bổ sung linh kiện bán dẫn đo lường từ đối tác Đài Loan.',
        'Ấn định hạn nộp tài liệu hồ sơ đăng ký bản quyền sáng chế phần mềm nhúng trước ngày 30/09/2026.',
        'Phòng Pháp chế cử 01 nhân sự túc trực cùng phòng 3.1 RDI hoàn tất mô tả kỹ thuật sáng chế.'
      ],
      actionItems: [
        { task: 'Hoàn thiện bản build Firmware RC2 cho vi mạch cảm biến AI', assignee: 'Lê Văn Nhân Viên (3.1 RDI)', deadline: '24/09/2026', priority: 'Cao' },
        { task: 'Ký biên bản nghiệm thu kỹ thuật đợt 1 với phòng Thiết Kế 3.2', assignee: 'Trần Thị Trưởng Phòng (HR/Thư ký)', deadline: '26/09/2026', priority: 'Trung bình' },
        { task: 'Trình Giám đốc phê duyệt hồ sơ bảo hộ sở hữu trí tuệ', assignee: 'Phòng 6 Pháp Lý AVG', deadline: '29/09/2026', priority: 'Cao' }
      ]
    },
    segments: [
      {
        id: 'seg-1',
        startTime: 0,
        endTime: 24,
        speakerId: 'spk-1',
        speakerName: '1 - Nguyễn Văn Quản Lý (CEO)',
        speakerColor: 'spk-1',
        speakerRole: 'Chủ tọa cuộc họp',
        text: 'Chào các đồng chí! Hôm nay chúng ta tập trung đánh giá tiến độ vi mạch cảm biến thông minh AVG-X. Tuần vừa rồi phòng 3.1 RDI đã thử nghiệm tín hiệu truyền thông qua giao thức Modbus và Bluetooth Low Energy kết quả thế nào?',
        confidence: 0.98
      },
      {
        id: 'seg-2',
        startTime: 25,
        endTime: 62,
        speakerId: 'spk-2',
        speakerName: '3.1 - Lê Văn Nhân Viên (R&D Lead)',
        speakerColor: 'spk-2',
        speakerRole: 'Kỹ sư trưởng dự án',
        text: 'Báo cáo anh và ban lãnh đạo: Chúng em đã đo kiểm thực tế trên 50 bo mạch mẫu. Tỷ lệ suy hao tín hiệu giảm xuống dưới 0.2%, độ trễ phản hồi chỉ còn 12ms, hoàn toàn đạt chuẩn công nghiệp đề ra ban đầu. Tuy nhiên có một vướng mắc nhỏ ở phần tương thích với vỏ hộp nhôm do phòng 3.2 thiết kế.',
        confidence: 0.96
      },
      {
        id: 'seg-3',
        startTime: 63,
        endTime: 104,
        speakerId: 'spk-1',
        speakerName: '1 - Nguyễn Văn Quản Lý (CEO)',
        speakerColor: 'spk-1',
        speakerRole: 'Chủ tọa cuộc họp',
        text: 'Phần vỏ hộp phòng 3.2 cần lưu ý chừa khe ăng-ten để sóng không bị chắn. Tôi duyệt bổ sung ngân sách linh kiện đo lường đợt này. Quan trọng nhất là hồ sơ đăng ký bản quyền sáng chế độc quyền phải nộp trước ngày 30 tháng 9 để tránh rủi ro tranh chấp sở hữu trí tuệ.',
        confidence: 0.99
      },
      {
        id: 'seg-4',
        startTime: 105,
        endTime: 148,
        speakerId: 'spk-3',
        speakerName: 'HR/Thư ký - Trần Thị Trưởng Phòng',
        speakerColor: 'spk-3',
        speakerRole: 'Thư ký điều hành',
        text: 'Em đã ghi nhận đầy đủ chỉ đạo của anh. Em sẽ phối hợp cùng phòng Pháp chế để hoàn thiện tờ trình mô tả kỹ thuật sáng chế. Biên bản họp hôm nay em sẽ gửi lên hệ thống AVG One trước 16 giờ chiều nay để các phòng ban cùng theo dõi.',
        confidence: 0.97
      },
      {
        id: 'seg-5',
        startTime: 149,
        endTime: 185,
        speakerId: 'spk-1',
        speakerName: '1 - Nguyễn Văn Quản Lý (CEO)',
        speakerColor: 'spk-1',
        speakerRole: 'Chủ tọa cuộc họp',
        text: 'Rất tốt! Tinh thần chung là bảo đảm tiến độ, tốc độ nhưng chất lượng phải là số một. Cuộc họp kết thúc tại đây, các bộ phận bắt tay vào triển khai ngay.',
        confidence: 0.98
      }
    ]
  },
  {
    id: 'sample-2',
    name: 'Phong_van_chuyen_gia_AI_Engine.m4a',
    sizeStr: '9.8 MB',
    duration: 142,
    format: 'M4A (AAC, 48kHz)',
    uploadedAt: 'Hôm qua lúc 15:30',
    modelUsed: 'AVG Neural ASR v2.4 (Khuyên dùng)',
    summary: {
      executive: 'Phỏng vấn chuyên sâu ứng viên Senior AI Speech Engineer cho bài toán nhận dạng giọng nói tiếng Việt đa phương ngữ và tối ưu mô hình trên máy chủ cục bộ AVG Edge.',
      keyDecisions: [
        'Đánh giá ứng viên đáp ứng tốt kinh nghiệm về CTC decoder và mô hình ngôn ngữ n-gram tích hợp.',
        'Đề xuất offer mức đãi ngộ bậc 4 cùng phụ cấp dự án trọng điểm.'
      ],
      actionItems: [
        { task: 'Gửi thư mời nhận việc (Offer letter) và lịch onboard', assignee: 'Phòng Nhân Sự AVG', deadline: '22/09/2026', priority: 'Cao' }
      ]
    },
    segments: [
      {
        id: 'seg-2-1',
        startTime: 0,
        endTime: 35,
        speakerId: 'spk-1',
        speakerName: 'Hội đồng phỏng vấn AVG',
        speakerColor: 'spk-1',
        speakerRole: 'Chủ tịch hội đồng',
        text: 'Chào em! Ban Giám Đốc rất quan tâm đến đề xuất kiến trúc xử lý giọng nói cục bộ không cần gửi qua máy chủ nước ngoài để bảo mật dữ liệu doanh nghiệp. Em có thể chia sẻ cụ thể giải pháp nén mô hình được không?',
        confidence: 0.98
      },
      {
        id: 'seg-2-2',
        startTime: 36,
        endTime: 88,
        speakerId: 'spk-4',
        speakerName: 'Ứng viên Kỹ sư AI',
        speakerColor: 'spk-4',
        speakerRole: 'Ứng viên',
        text: 'Dạ em cảm ơn anh! Em sử dụng kỹ thuật quantization int8 kết hợp pruning trọng số thừa, giúp giảm kích thước mô hình từ 1.5GB xuống còn 280MB mà độ suy giảm độ chính xác WER dưới 1.5%. Nhờ đó hệ thống có thể chạy mượt mà ngay trên vi xử lý nhúng của tập đoàn.',
        confidence: 0.97
      },
      {
        id: 'seg-2-3',
        startTime: 89,
        endTime: 142,
        speakerId: 'spk-1',
        speakerName: 'Hội đồng phỏng vấn AVG',
        speakerColor: 'spk-1',
        speakerRole: 'Chủ tịch hội đồng',
        text: 'Rất ấn tượng! Đó chính xác là điều AVG đang hướng tới nhằm làm chủ công nghệ lõi. Ban Nhân sự sẽ sớm liên hệ để hoàn tất thủ tục gia nhập tập đoàn với em.',
        confidence: 0.99
      }
    ]
  },
  {
    id: 'sample-3',
    name: 'Hop_tham_dinh_phap_ly_hop_dong_quoc_te.wav',
    sizeStr: '22.6 MB',
    duration: 160,
    format: 'WAV (PCM 16-bit, 44.1kHz)',
    uploadedAt: '18/09/2026',
    modelUsed: 'Whisper Large v3 Enterprise',
    summary: {
      executive: 'Rà soát các điều khoản thanh toán thư tín dụng L/C và cam kết bảo hành thiết bị trong hợp đồng nhập khẩu dây chuyền sản xuất tự động.',
      keyDecisions: [
        'Yêu cầu nhà thầu bổ sung điều khoản trọng tài quốc tế tại SIAC Singapore.',
        'Điều chỉnh tỷ lệ giữ lại bảo hành từ 5% lên 10% trong vòng 12 tháng đầu vận hành.'
      ],
      actionItems: [
        { task: 'Gửi bản sửa đổi hợp đồng bằng tiếng Anh cho đối tác', assignee: 'Phòng 6 Pháp Lý AVG', deadline: '25/09/2026', priority: 'Cao' }
      ]
    },
    segments: [
      {
        id: 'seg-3-1',
        startTime: 0,
        endTime: 45,
        speakerId: 'spk-1',
        speakerName: 'Phòng 6 - Pháp Lý AVG',
        speakerColor: 'spk-1',
        speakerRole: 'Luật sư trưởng',
        text: 'Về điều khoản thanh toán LC theo điều 7, chúng tôi khuyến nghị áp dụng hình thức L/C không hủy ngang có xác nhận để đảm bảo an toàn vốn tối đa cho tập đoàn trong bối cảnh tỷ giá biến động.',
        confidence: 0.98
      },
      {
        id: 'seg-3-2',
        startTime: 46,
        endTime: 110,
        speakerId: 'spk-2',
        speakerName: 'Đại diện Tài Chính AVG',
        speakerColor: 'spk-2',
        speakerRole: 'Kế toán trưởng',
        text: 'Hoàn toàn nhất trí với ban Pháp chế. Chúng tôi sẽ làm việc với ngân hàng Vietcombank để phát hành bảo lãnh hợp đồng và cố định hạn mức thanh toán trong vòng 90 ngày kể từ ngày vận đơn B/L.',
        confidence: 0.97
      },
      {
        id: 'seg-3-3',
        startTime: 111,
        endTime: 160,
        speakerId: 'spk-1',
        speakerName: 'Phòng 6 - Pháp Lý AVG',
        speakerColor: 'spk-1',
        speakerRole: 'Luật sư trưởng',
        text: 'Tôi sẽ hoàn tất bản thảo phụ lục sửa đổi ngay trong sáng mai để kịp gửi đối tác xem xét và ký kết.',
        confidence: 0.99
      }
    ]
  }
];

export const FileTranscribeModule: React.FC = () => {
  // Navigation tab state: 'upload' | 'editor' | 'library' | 'settings'
  const [activeTab, setActiveTab] = useState<FileTranscribeNavTab>('upload');
  
  // Current working file
  const [currentFile, setCurrentFile] = useState<TranscribedFile>(SAMPLE_FILES[0]);
  const [savedLibrary, setSavedLibrary] = useState<TranscribedFile[]>(SAMPLE_FILES);

  // Upload & processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('neural-v2');
  const [enableDiarization, setEnableDiarization] = useState<boolean>(true);
  const [enablePunctuation, setEnablePunctuation] = useState<boolean>(true);
  const [enableDenoise, setEnableDenoise] = useState<boolean>(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Audio Playback & Waveform State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SAMPLE_FILES[0].duration);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Editor view modes: 'dialogue' | 'document' | 'summary'
  const [editorViewMode, setEditorViewMode] = useState<'dialogue' | 'document' | 'summary'>('dialogue');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  // Speaker Renaming Modal State
  const [renamingSpeakerId, setRenamingSpeakerId] = useState<string | null>(null);
  const [newSpeakerName, setNewSpeakerName] = useState<string>('');

  // Waveform canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playIntervalRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Sync tab with header events
  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail && ['upload', 'editor', 'library', 'settings'].includes(e.detail)) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('file_transcribe_tab_change', handleTabChange);
    return () => window.removeEventListener('file_transcribe_tab_change', handleTabChange);
  }, []);

  // Broadcast current tab to header
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('file_transcribe_tab_sync', { detail: activeTab }));
  }, [activeTab]);

  // Audio Playback simulation / Web Audio synthesis
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (0.25 * playbackRate);
        });
      }, 250);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, duration, playbackRate]);

  // Seek Audio to specific second
  const handleSeek = (seconds: number) => {
    const target = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(target);
  };

  // Click on a segment to jump and play
  const handleJumpToSegment = (seg: AudioSegment) => {
    handleSeek(seg.startTime);
    setIsPlaying(true);
  };

  // Draw Audio Waveform on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const numBars = 75;
    const barWidth = width / numBars - 2;
    const progressPercent = duration > 0 ? currentTime / duration : 0;
    const activeBarIndex = Math.floor(progressPercent * numBars);

    // Create pseudo-random visual waveform bars based on current file ID
    for (let i = 0; i < numBars; i++) {
      const seed = Math.sin((i + 1) * 12.9898 + (currentFile.name.length * 7)) * 43758.5453;
      const normalizedHeight = (Math.abs(seed) % 0.8) + 0.2; // 20% to 100% height
      const barHeight = Math.max(8, normalizedHeight * (height - 12));
      const x = i * (barWidth + 2);
      const y = (height - barHeight) / 2;

      // Color based on active / past / future playhead
      if (i < activeBarIndex) {
        // Played: Orange / Sky gradient
        ctx.fillStyle = '#0284C7';
      } else if (i === activeBarIndex) {
        // Current playhead
        ctx.fillStyle = '#F15A24';
      } else {
        // Unplayed
        ctx.fillStyle = '#cbd5e1';
      }

      // Rounded rect bar
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(2, barWidth), barHeight, 2);
      ctx.fill();
    }
  }, [currentTime, duration, currentFile]);

  // Handle local audio file upload
  const handleFileSelect = (file: File) => {
    setUploadedFileName(file.name);
    startTranscriptionProcess(file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`, file.type || 'Audio file');
  };

  // Start conversion pipeline simulation with realistic stages
  const startTranscriptionProcess = (fileName: string, sizeStr: string, formatStr: string) => {
    setIsProcessing(true);
    setProcessingProgress(5);
    setProcessingStage('Đang đọc tệp âm thanh và nạp vào bộ đệm AudioContext...');

    const stages = [
      { p: 20, stage: 'Đang trích xuất sóng âm & phân tích phổ tần số (FFT 16kHz)...', delay: 600 },
      { p: 45, stage: 'Đang chạy mô hình AVG Neural ASR: Chuyển đổi giọng nói thành ngữ âm...', delay: 1200 },
      { p: 70, stage: 'Đang phân đoạn người nói (Speaker Diarization) & lọc tạp âm...', delay: 1800 },
      { p: 88, stage: 'Đang chuẩn hóa dấu câu hành chính & chuyển đổi thuật ngữ công sở...', delay: 2400 },
      { p: 100, stage: 'Hoàn tất biên dịch! Đang xuất bản sang Trình biên soạn...', delay: 2900 }
    ];

    stages.forEach(s => {
      setTimeout(() => {
        setProcessingProgress(s.p);
        setProcessingStage(s.stage);
        if (s.p === 100) {
          setTimeout(() => {
            // Create newly transcribed file object
            const newFile: TranscribedFile = {
              id: `file-${Date.now()}`,
              name: fileName,
              sizeStr: sizeStr,
              duration: 215, // ~3m 35s
              format: formatStr,
              uploadedAt: 'Vừa xong',
              modelUsed: selectedModel === 'neural-v2' ? 'AVG Neural ASR v2.4 (Khuyên dùng)' : selectedModel === 'whisper-v3' ? 'Whisper Large v3 Enterprise' : 'Gemini 2.5 Flash Audio',
              summary: {
                executive: `Biên bản chuyển đổi tự động từ tệp ghi âm "${fileName}". Cuộc họp tập trung thảo luận các nhiệm vụ trọng tâm, tiến độ triển khai và phân bổ trách nhiệm các phòng ban.`,
                keyDecisions: [
                  'Thông qua báo cáo tiến độ và kế hoạch hành động tuần tiếp theo.',
                  'Phê duyệt ngân sách thực thi theo định mức tài chính tập đoàn.',
                  'Chốt lịch nghiệm thu giai đoạn 1 vào cuối tuần.'
                ],
                actionItems: [
                  { task: 'Hoàn thiện tài liệu nghiệm thu kỹ thuật', assignee: 'Phòng Kỹ thuật & R&D', deadline: '25/09/2026', priority: 'Cao' },
                  { task: 'Cập nhật tiến độ lên cổng điều hành AVG One', assignee: 'Thư ký ban điều hành', deadline: '27/09/2026', priority: 'Trung bình' }
                ]
              },
              segments: [
                {
                  id: `seg-new-1`,
                  startTime: 0,
                  endTime: 38,
                  speakerId: 'spk-1',
                  speakerName: '1 - Người phát biểu chính',
                  speakerColor: 'spk-1',
                  speakerRole: 'Chủ trì',
                  text: processRealtimeSpeechPunctuation('Xin chào tất cả các anh chị em! Hôm nay chúng ta tổ chức buổi làm việc để rà soát toàn bộ tiến độ dự án, tháo gỡ các điểm nghẽn thủ tục và thống nhất lịch nộp tài liệu lên ban giám đốc.'),
                  confidence: 0.98
                },
                {
                  id: `seg-new-2`,
                  startTime: 39,
                  endTime: 95,
                  speakerId: 'spk-2',
                  speakerName: '2 - Đại diện bộ phận chuyên môn',
                  speakerColor: 'spk-2',
                  speakerRole: 'Báo cáo viên',
                  text: processRealtimeSpeechPunctuation('Báo cáo anh! Về mặt kỹ thuật và triển khai thực địa, chúng em đã bám sát 100% chỉ đạo, mọi đầu việc đều đang nằm trong dung sai kiểm soát tốt. Các hồ sơ chứng từ cần duyệt chi đều đã được đẩy lên hệ thống AVG Request.'),
                  confidence: 0.97
                },
                {
                  id: `seg-new-3`,
                  startTime: 96,
                  endTime: 160,
                  speakerId: 'spk-3',
                  speakerName: '3 - Thư ký tổng hợp',
                  speakerColor: 'spk-3',
                  speakerRole: 'Thư ký',
                  text: processRealtimeSpeechPunctuation('Em xin phép ghi nhận và đưa toàn bộ các kết luận này vào biên bản chính thức để các bên cùng theo dõi và thực hiện đúng thời hạn quy định.'),
                  confidence: 0.99
                },
                {
                  id: `seg-new-4`,
                  startTime: 161,
                  endTime: 215,
                  speakerId: 'spk-1',
                  speakerName: '1 - Người phát biểu chính',
                  speakerColor: 'spk-1',
                  speakerRole: 'Chủ trì',
                  text: processRealtimeSpeechPunctuation('Cảm ơn mọi người. Chúng ta kết thúc phiên thảo luận tại đây và bắt tay vào triển khai ngay trong hôm nay.'),
                  confidence: 0.98
                }
              ]
            };

            setCurrentFile(newFile);
            setDuration(newFile.duration);
            setCurrentTime(0);
            setIsProcessing(false);
            setSavedLibrary(prev => [newFile, ...prev]);
            setActiveTab('editor');
          }, 400);
        }
      }, s.delay);
    });
  };

  // Select a sample file to load directly
  const handleLoadSample = (sample: TranscribedFile) => {
    setCurrentFile(sample);
    setDuration(sample.duration);
    setCurrentTime(0);
    setIsPlaying(false);
    setActiveTab('editor');
  };

  // Inline edit segment text
  const handleSaveSegmentText = (segId: string) => {
    setCurrentFile(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segId ? { ...s, text: editingText } : s)
    }));
    setEditingSegmentId(null);
    setEditingText('');
  };

  // Bulk rename speaker across all segments in file
  const handleRenameSpeaker = () => {
    if (!renamingSpeakerId || !newSpeakerName.trim()) return;
    setCurrentFile(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.speakerId === renamingSpeakerId ? { ...s, speakerName: newSpeakerName.trim() } : s)
    }));
    setRenamingSpeakerId(null);
    setNewSpeakerName('');
  };

  // Copy full transcript text to clipboard
  const handleCopyFullText = () => {
    const fullText = currentFile.segments.map(s => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] ${s.speakerName}:\n${s.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedToast('Đã sao chép toàn bộ văn bản vào bộ nhớ tạm!');
    setTimeout(() => setCopiedToast(null), 3000);
  };

  // Export TXT file
  const handleExportTxt = () => {
    const header = `TẬP ĐOÀN AVG ONE - BIÊN BẢN CHUYỂN ĐỔI GHI ÂM\n` +
      `Tệp nguồn: ${currentFile.name}\n` +
      `Thời lượng: ${formatTime(currentFile.duration)}\n` +
      `Ngày xử lý: ${currentFile.uploadedAt}\n` +
      `Mô hình AI: ${currentFile.modelUsed}\n` +
      `======================================================================\n\n`;
    const body = currentFile.segments.map(s => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] ${s.speakerName} (${s.speakerRole}):\n${s.text}\n`).join('\n');
    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFile.name.replace(/\.[^/.]+$/, "")}_VanBan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export SRT Subtitle file
  const handleExportSrt = () => {
    const toSrtTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      const ms = Math.floor((seconds % 1) * 1000);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
    };

    let srtContent = '';
    currentFile.segments.forEach((s, idx) => {
      srtContent += `${idx + 1}\n`;
      srtContent += `${toSrtTime(s.startTime)} --> ${toSrtTime(s.endTime)}\n`;
      srtContent += `<font color="#F15A24">${s.speakerName}:</font> ${s.text}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFile.name.replace(/\.[^/.]+$/, "")}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered segments for search query
  const displayedSegments = useMemo(() => {
    if (!searchQuery.trim()) return currentFile.segments;
    const q = searchQuery.toLowerCase();
    return currentFile.segments.filter(s => s.text.toLowerCase().includes(q) || s.speakerName.toLowerCase().includes(q));
  }, [currentFile, searchQuery]);

  // Determine currently active segment for karaoke playhead highlight
  const activeSegmentId = useMemo(() => {
    const active = currentFile.segments.find(s => currentTime >= s.startTime && currentTime <= s.endTime);
    return active ? active.id : null;
  }, [currentFile, currentTime]);

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden relative font-sans select-none">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND (ĐỒNG BỘ PHONG CÁCH AVG ONE) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.75rem_2.75rem] opacity-40 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#0284C7]/12 dark:bg-[#0284C7]/15 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#F15A24]/12 dark:bg-[#F15A24]/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: TẢI FILE GHI ÂM & THIẾT LẬP CHUYỂN ĐỔI (UPLOAD & ASR PIPELINE) */}
      {/* ========================================================================= */}
      {activeTab === 'upload' && (
        <div className="w-full h-full flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 relative z-10 max-w-6xl mx-auto">
          
          {/* Top Hero Banner Card */}
          <div className="bg-gradient-to-r from-sky-500/10 via-orange-500/10 to-transparent p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-sky-200/80 dark:border-sky-800/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-200 dark:border-sky-800 text-xs font-black text-[#0284C7] dark:text-sky-400">
                <Sparkles className="w-3.5 h-3.5 text-[#F15A24]" />
                <span>AI TRANSCRIPTION ENGINE v2.4</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Chuyển Đổi File Ghi Âm Sang Văn Bản Chuẩn Xác
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
                Hệ thống nhận diện giọng nói tiếng Việt chuyên sâu AVG One: Tự động phân tách người nói (Diarization), chèn dấu câu thông minh, chuẩn hóa từ mượn công sở và xuất văn bản hành chính tức thì.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleLoadSample(SAMPLE_FILES[0])}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#0284C7] text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0284C7] shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <FolderOpen className="w-4 h-4 text-[#0284C7]" />
                <span>Mở tệp mẫu vừa họp</span>
              </button>
            </div>
          </div>

          {/* Main Dropzone & Upload Box */}
          <div
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileSelect(e.dataTransfer.files[0]);
              }
            }}
            className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-sky-300 dark:border-sky-700 hover:border-[#F15A24] dark:hover:border-orange-500 bg-white/80 dark:bg-slate-900/60 transition-all text-center flex flex-col items-center justify-center space-y-4 shadow-sm hover:shadow-md group cursor-pointer relative"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              accept="audio/*,video/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.mp4,.webm"
              className="hidden"
            />

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#0284C7]/20 via-sky-100 dark:via-sky-950 to-[#F15A24]/20 border border-sky-200 dark:border-sky-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#F15A24] transition-all duration-300 shadow-xs">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-[#0284C7] group-hover:text-[#F15A24] transition-colors" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] transition-colors">
                Kéo & thả file ghi âm vào đây, hoặc <span className="text-[#F15A24] underline decoration-wavy">chọn từ máy tính</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Hỗ trợ MP3, M4A, WAV, AAC, FLAC, OGG, MP4, WebM (Dung lượng tối đa 2GB mỗi tệp)
              </p>
            </div>

            {/* Format badges */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center pt-2">
              {['MP3', 'WAV', 'M4A', 'AAC', 'FLAC', 'MP4 Video'].map(fmt => (
                <span key={fmt} className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10.5px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* AI Pre-processing Options Configuration Box */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0284C7]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Thiết Lập Mô Hình & Tiêu Chuẩn Xử Lý AI
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn Tiếng Việt AVG
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option 1: AI Model */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Mô hình nhận dạng (ASR)</span>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#0284C7]"
                >
                  <option value="neural-v2">AVG Neural ASR v2.4 (Khuyên dùng)</option>
                  <option value="whisper-v3">Whisper Large v3 (Đa ngôn ngữ)</option>
                  <option value="gemini-flash">Gemini 2.5 Flash Audio (Siêu tốc)</option>
                </select>
                <div className="text-[10px] text-slate-400">Độ chính xác tiếng Việt & từ mượn đạt 98.6%</div>
              </div>

              {/* Option 2: Speaker Diarization */}
              <div
                onClick={() => setEnableDiarization(!enableDiarization)}
                className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  enableDiarization
                    ? 'bg-sky-50/60 dark:bg-sky-950/30 border-[#0284C7]/50'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">Phân tách người nói (Diarization)</span>
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center ${enableDiarization ? 'bg-[#0284C7] text-white' : 'border border-slate-400'}`}>
                    {enableDiarization && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <div className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                  Tự động phân biệt giọng Chủ tọa, Thư ký và các thành viên tham gia.
                </div>
              </div>

              {/* Option 3: Punctuation & ITN */}
              <div
                onClick={() => setEnablePunctuation(!enablePunctuation)}
                className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  enablePunctuation
                    ? 'bg-orange-50/60 dark:bg-orange-950/30 border-[#F15A24]/50'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">Chuẩn hóa dấu câu & Ngữ pháp</span>
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center ${enablePunctuation ? 'bg-[#F15A24] text-white' : 'border border-slate-400'}`}>
                    {enablePunctuation && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <div className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                  Tự động chấm phẩy, chuyển đổi thuật ngữ công sở (KPI, OKR, PO, deadline...).
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sample Audios for Instant Test */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Hoặc trải nghiệm ngay với 3 File ghi âm mẫu cuộc họp AVG:
              </span>
              <span className="text-[11px] font-bold text-[#0284C7]">Không cần tải file</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SAMPLE_FILES.map(sample => (
                <div
                  key={sample.id}
                  onClick={() => handleLoadSample(sample)}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-[#0284C7] dark:hover:border-sky-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-105 transition-transform">
                      <FileAudio className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {formatTime(sample.duration)}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-[#0284C7] line-clamp-1">
                      {sample.name}
                    </h4>
                    <p className="text-[10.5px] text-slate-400 line-clamp-2 mt-0.5 font-medium">
                      {sample.summary.executive}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>{sample.segments.length} lượt thoại</span>
                    <span className="text-[#0284C7] font-black group-hover:underline flex items-center gap-0.5">
                      Xem biên bản <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Progress Modal */}
          {isProcessing && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#0284C7] to-[#F15A24] p-0.5 shadow-lg animate-pulse">
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center">
                    <Activity className="w-8 h-8 text-[#F15A24] animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Đang Chuyển Đổi Thành Văn Bản...
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {processingStage}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#0284C7] to-[#F15A24] h-full rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>Mô hình: {selectedModel}</span>
                    <span className="font-black text-[#F15A24]">{processingProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TRÌNH BIÊN SOẠN & ĐỒNG BỘ THỜI GIAN (WAVEFORM & RICH WORKSPACE) */}
      {/* ========================================================================= */}
      {activeTab === 'editor' && (
        <div className="w-full h-full flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
          
          {/* TOP AUDIO WAVEFORM PLAYER TOOLBAR */}
          <div className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-3 shrink-0 shadow-2xs space-y-2.5">
            
            {/* Top row: File details & Mode selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/80 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-[#F15A24] shrink-0">
                  <FileAudio className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate" title={currentFile.name}>
                      {currentFile.name}
                    </h2>
                    <span className="px-2 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-black shrink-0">
                      Hoàn tất
                    </span>
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-medium">
                    {currentFile.format} • {currentFile.sizeStr} • Mô hình: {currentFile.modelUsed}
                  </div>
                </div>
              </div>

              {/* View mode switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setEditorViewMode('dialogue')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                    editorViewMode === 'dialogue'
                      ? 'bg-white dark:bg-slate-700 text-[#F15A24] shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Hội thoại phân vai
                </button>
                <button
                  type="button"
                  onClick={() => setEditorViewMode('document')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                    editorViewMode === 'document'
                      ? 'bg-white dark:bg-slate-700 text-[#F15A24] shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Văn bản liền mạch
                </button>
                <button
                  type="button"
                  onClick={() => setEditorViewMode('summary')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                    editorViewMode === 'summary'
                      ? 'bg-white dark:bg-slate-700 text-[#F15A24] shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  ⚡ Tóm tắt & Đầu việc
                </button>
              </div>
            </div>

            {/* Middle row: Interactive Waveform Canvas */}
            <div className="relative bg-slate-100/90 dark:bg-slate-800/80 rounded-xl p-2 border border-slate-200/80 dark:border-slate-700/80">
              <canvas
                ref={canvasRef}
                width={800}
                height={42}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  handleSeek(ratio * duration);
                }}
                className="w-full h-10 cursor-pointer rounded-lg"
              />
              <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 pt-1">
                <span className="text-[#0284C7] font-black">{formatTime(currentTime)}</span>
                <span className="text-slate-400">Nhấp vào sóng âm để tua nhanh</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Bottom row: Player Controls & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              
              {/* Playback Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => handleSeek(currentTime - 5)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer transition"
                  title="Tua lại 5 giây"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#F15A24] to-amber-500 hover:opacity-90 text-white font-black text-xs shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlaying ? 'Tạm dừng' : 'Phát âm thanh'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSeek(currentTime + 5)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer transition"
                  title="Tua tới 5 giây"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                {/* Playback Speed selector */}
                <div className="flex items-center gap-1 ml-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Tốc độ:</span>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    className="bg-transparent font-black text-[#0284C7] focus:outline-none cursor-pointer"
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1.0}>1.0x (Chuẩn)</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2.0}>2.0x</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons: Search, Copy, Export */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {/* Search in transcript */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm từ khóa trong văn bản..."
                    className="pl-8 pr-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0284C7] w-40 sm:w-52"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCopyFullText}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                  title="Sao chép toàn bộ văn bản"
                >
                  <Copy className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Sao chép</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                  title="Xuất file văn bản (.txt)"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Xuất TXT</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportSrt}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                  title="Xuất phụ đề mốc thời gian (.srt)"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Xuất SRT</span>
                </button>
              </div>

            </div>

          </div>

          {/* MAIN TRANSCRIPT CONTENT FEED */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 max-w-5xl mx-auto w-full">
            
            {/* VIEW MODE 1: DIALOGUE (HỘI THOẠI PHÂN VAI) */}
            {editorViewMode === 'dialogue' && (
              <div className="space-y-3">
                {displayedSegments.length === 0 ? (
                  <div className="p-8 text-center text-xs font-semibold text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    Không tìm thấy đoạn văn bản nào khớp với từ khóa "{searchQuery}"
                  </div>
                ) : (
                  displayedSegments.map((seg) => {
                    const isCurrentPlaying = activeSegmentId === seg.id;
                    const spkStyle = SPEAKER_COLORS[seg.speakerColor] || SPEAKER_COLORS['spk-1'];

                    return (
                      <div
                        key={seg.id}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 ${
                          isCurrentPlaying
                            ? 'bg-orange-50/80 dark:bg-orange-950/30 border-[#F15A24] shadow-md ring-1 ring-[#F15A24]/40'
                            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                        }`}
                      >
                        {/* Speaker & Timestamp header */}
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Speaker avatar tag */}
                            <div
                              onClick={() => {
                                setRenamingSpeakerId(seg.speakerId);
                                setNewSpeakerName(seg.speakerName);
                              }}
                              className="flex items-center gap-1.5 cursor-pointer group"
                              title="Nhấp để đổi tên người phát biểu này"
                            >
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] ${spkStyle.badge}`}>
                                {seg.speakerName.charAt(0)}
                              </div>
                              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200 group-hover:text-[#F15A24] transition">
                                {seg.speakerName}
                              </span>
                              <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-[#F15A24] opacity-0 group-hover:opacity-100 transition" />
                            </div>

                            <span className="px-2 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-semibold">
                              {seg.speakerRole}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Interactive Timestamp button */}
                            <button
                              type="button"
                              onClick={() => handleJumpToSegment(seg)}
                              className={`px-2 py-0.5 rounded-lg text-[10.5px] font-mono font-black flex items-center gap-1 transition cursor-pointer ${
                                isCurrentPlaying
                                  ? 'bg-[#F15A24] text-white shadow-xs animate-pulse'
                                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
                              }`}
                              title="Bấm để phát đúng đoạn này"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>{formatTime(seg.startTime)} - {formatTime(seg.endTime)}</span>
                            </button>
                          </div>
                        </div>

                        {/* Dialogue text / Editing area */}
                        <div className="pt-2.5">
                          {editingSegmentId === seg.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                rows={3}
                                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-sky-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingSegmentId(null)}
                                  className="px-3 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                                >
                                  Hủy
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveSegmentText(seg.id)}
                                  className="px-3 py-1 rounded-lg bg-[#0284C7] text-white text-xs font-black shadow-xs cursor-pointer"
                                >
                                  Lưu thay đổi
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingSegmentId(seg.id);
                                setEditingText(seg.text);
                              }}
                              className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-medium cursor-text hover:bg-slate-50/80 dark:hover:bg-slate-800/40 p-1 rounded-lg transition"
                              title="Nhấp vào để chỉnh sửa trực tiếp"
                            >
                              {seg.text}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* VIEW MODE 2: CLEAN DOCUMENT (VĂN BẢN HÀNH CHÍNH LIỀN MẠCH) */}
            {editorViewMode === 'document' && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
                <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider">TẬP ĐOÀN AVG ONE • BIÊN BẢN GHI ÂM CHÍNH THỨC</div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase">
                    BIÊN BẢN CUỘC HỌP & NỘI DUNG TRAO ĐỔI
                  </h2>
                  <div className="text-xs text-slate-500 font-medium">
                    Tệp nguồn: {currentFile.name} • Thời lượng: {formatTime(currentFile.duration)} • Ngày ghi: {currentFile.uploadedAt}
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                  {currentFile.segments.map((seg, idx) => (
                    <div key={seg.id} className="space-y-1">
                      <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                        <span>{seg.speakerName} ({seg.speakerRole}) - [{formatTime(seg.startTime)}]:</span>
                      </div>
                      <p className="pl-3 text-slate-700 dark:text-slate-300">
                        {seg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Hệ thống chuyển đổi giọng nói AVG Neural Speech Engine</span>
                  <span>Trang 1 / 1</span>
                </div>
              </div>
            )}

            {/* VIEW MODE 3: AI EXECUTIVE SUMMARY & ACTION ITEMS */}
            {editorViewMode === 'summary' && (
              <div className="space-y-4">
                {/* Summary Card */}
                <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0284C7]">
                    <Sparkles className="w-4 h-4 text-[#F15A24]" />
                    <span>Tóm Tắt Điều Hành Cuộc Họp (Executive Summary)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {currentFile.summary.executive}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Các Quyết Định Then Chốt Đã Thống Nhất</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {currentFile.summary.keyDecisions.map((dec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{dec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action items table */}
                <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F15A24]">
                    <Zap className="w-4 h-4 text-[#F15A24]" />
                    <span>Đầu Việc Cần Thực Hiện & Phân Công (Action Items)</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="py-2 pr-3">Nhiệm vụ</th>
                          <th className="py-2 px-3">Người chịu trách nhiệm</th>
                          <th className="py-2 px-3">Thời hạn</th>
                          <th className="py-2 pl-3 text-right">Mức độ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                        {currentFile.summary.actionItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                            <td className="py-2.5 pr-3 font-bold text-slate-800 dark:text-slate-200">{item.task}</td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{item.assignee}</td>
                            <td className="py-2.5 px-3 font-mono font-bold text-[#0284C7]">{item.deadline}</td>
                            <td className="py-2.5 pl-3 text-right">
                              <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-black ${
                                item.priority === 'Cao'
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              }`}>
                                {item.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bulk Rename Speaker Modal */}
          {renamingSpeakerId && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-100">Đổi Tên Người Phát Biểu</span>
                  <button onClick={() => setRenamingSpeakerId(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">Đóng</button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Tên người phát biểu mới:</label>
                  <input
                    type="text"
                    value={newSpeakerName}
                    onChange={(e) => setNewSpeakerName(e.target.value)}
                    placeholder="Nhập tên nhân sự hoặc chức danh..."
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                  />
                  <div className="text-[10px] text-slate-400">Tên mới sẽ tự động cập nhật cho toàn bộ các đoạn phát biểu của người này trong tệp.</div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setRenamingSpeakerId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleRenameSpeaker}
                    className="px-4 py-1.5 rounded-lg bg-[#F15A24] text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition"
                  >
                    Cập nhật toàn bài
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: THƯ VIỆN TỆP ĐÃ DỊCH (LIBRARY & HISTORY) */}
      {/* ========================================================================= */}
      {activeTab === 'library' && (
        <div className="w-full h-full flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Thư Viện Tệp Ghi Âm Đã Chuyển Đổi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toàn bộ các tệp ghi âm, biên bản cuộc họp và phụ đề đã được lưu trữ an toàn.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('upload')}
              className="px-3.5 py-2 rounded-xl bg-[#0284C7] hover:bg-sky-600 text-white text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Chuyển đổi tệp mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {savedLibrary.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between hover:border-[#0284C7] transition"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0284C7]">
                      <FileAudio className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {formatTime(item.duration)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white line-clamp-1" title={item.name}>
                      {item.name}
                    </h3>
                    <div className="text-[10.5px] text-slate-400 mt-0.5">
                      {item.uploadedAt} • {item.sizeStr}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                    {item.summary.executive}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-slate-400">{item.segments.length} đoạn hội thoại</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentFile(item);
                      setDuration(item.duration);
                      setCurrentTime(0);
                      setIsPlaying(false);
                      setActiveTab('editor');
                    }}
                    className="px-3 py-1 rounded-lg bg-[#0284C7]/10 hover:bg-[#0284C7] text-[#0284C7] hover:text-white text-xs font-black transition cursor-pointer"
                  >
                    Mở biên bản
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CẤU HÌNH MÔ HÌNH AI & TỪ ĐIỂN CHUYÊN NGÀNH (SETTINGS) */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="w-full h-full flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 relative z-10 max-w-4xl mx-auto">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Cấu Hình Mô Hình & Từ Điển Chuyên Ngành AVG
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tùy chỉnh thông số thuật toán ASR, độ nhạy khử nhiễu và danh mục từ khóa ưu tiên nhận diện.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-5">
            {/* Setting 1 */}
            <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <label className="text-xs font-black text-slate-800 dark:text-slate-200">
                Từ Điển Thuật Ngữ & Viết Tắt Công Sở AVG (Custom Vocabulary Boosting)
              </label>
              <textarea
                defaultValue="PO, VAT, OKR, KPI, Firmware, Sensor, Modbus, BLE, SHTT, Bản quyền, Nghiệm thu, LC, B/L, RC2, CAD, CNC, PCB, RDI"
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
              />
              <div className="text-[10.5px] text-slate-400">
                Các từ khóa trên sẽ được AI ưu tiên nhận diện chính xác 100% khi phát âm bồi hoặc nói nhanh trong cuộc họp.
              </div>
            </div>

            {/* Setting 2 */}
            <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <label className="text-xs font-black text-slate-800 dark:text-slate-200">
                Độ nhạy khử ồn môi trường (Acoustic Noise Suppression Threshold)
              </label>
              <div className="flex items-center gap-3">
                <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-[#0284C7] cursor-pointer" />
                <span className="text-xs font-black text-[#0284C7] w-10 text-right">75%</span>
              </div>
              <div className="text-[10.5px] text-slate-400">
                Tự động lọc tiếng quạt gió, tiếng gõ phím và tiếng vang trong phòng họp hội trường.
              </div>
            </div>

            {/* Save button */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setCopiedToast('Đã lưu cấu hình mô hình AI thành công!');
                  setTimeout(() => setCopiedToast(null), 3000);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F15A24] text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition"
              >
                Lưu cấu hình hệ thống
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
