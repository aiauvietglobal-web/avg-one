import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  UploadCloud, FileAudio, FileText, Music, Play, Pause, RotateCcw,
  Volume2, VolumeX, Copy, Download, Trash2, Search, Check, Sparkles,
  Settings, Sliders, ChevronRight, Edit3, User, Clock, CheckCircle2,
  AlertCircle, ArrowRight, Share2, FastForward, Rewind, Eye,
  FolderOpen, Plus, PlusCircle, MessageSquare, Send, RefreshCw, Activity, ShieldCheck, Zap, Layers,
  ListFilter, ExternalLink, Printer, FileDown, SlidersHorizontal,
  Wand2, Mic, Volume1, Cpu, Database, Link2, Radio, FileSpreadsheet,
  ArrowLeft, FileCode, CheckSquare, LayoutDashboard, RadioTower, Disc, Square, Waves, Maximize2
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
  category?: string;
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
    category: 'Giao ban BĐH',
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
    category: 'Phỏng vấn nhân sự',
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
    category: 'Pháp chế & Hợp đồng',
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

// 🎛️ REALTIME CYBER DAW AUDIO SPECTRUM & OSCILLOSCOPE CANVAS (ĐỒNG BỘ 100% VỚI SPEECH-TO-TEXT)
interface CyberAudioStudioCanvasProps {
  isRecording: boolean;
  recordingSeconds: number;
  className?: string;
}

const CyberAudioStudioCanvas: React.FC<CyberAudioStudioCanvasProps> = ({ isRecording, className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background Cyber space
      ctx.fillStyle = '#070B16';
      ctx.fillRect(0, 0, w, h);

      // Grid Lines (-0dB, -6dB, -12dB, -24dB, -48dB)
      ctx.save();
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);

      const dBLevels = [
        { label: '0 dB', y: 0.12 },
        { label: '-6 dB', y: 0.28 },
        { label: '-12 dB', y: 0.46 },
        { label: '-24 dB', y: 0.66 },
        { label: '-48 dB', y: 0.86 },
      ];

      ctx.font = '8px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';

      dBLevels.forEach(item => {
        const lineY = Math.round(h * item.y);
        ctx.beginPath();
        ctx.moveTo(10, lineY);
        ctx.lineTo(w - 10, lineY);
        ctx.stroke();
        ctx.fillText(item.label, w - 28, lineY - 2);
      });
      ctx.restore();

      // Render LED Ma Trận Tần Số (Audio Spectrum Vertical Bar Matrix)
      const numBars = 36;
      const barWidth = Math.max(3, Math.floor((w - 24) / numBars - 2));
      const barSpacing = Math.floor((w - 24 - numBars * barWidth) / (numBars - 1));
      const totalSegments = 24;
      const bottomPadding = 18;
      const topPadding = 20;
      const availableH = h - bottomPadding - topPadding;
      const segmentHeight = Math.max(2, Math.floor(availableH / totalSegments - 1.5));
      const segmentGap = 1.5;

      phase += 0.08;

      for (let i = 0; i < numBars; i++) {
        const rawNorm = isRecording
          ? Math.max(0.12, Math.sin(phase + i * 0.25) * 0.45 + Math.cos(phase * 1.5 + i * 0.15) * 0.45 + 0.1)
          : Math.max(0.04, Math.sin(phase * 0.4 + i * 0.3) * 0.14 + 0.08 + (i > 10 && i < 24 ? Math.sin(i * 0.4) * 0.18 : 0));

        const barX = Math.round(12 + i * (barWidth + barSpacing));
        const activeSegs = Math.round(rawNorm * totalSegments);

        for (let s = 0; s < totalSegments; s++) {
          const segY = Math.round(h - bottomPadding - (s + 1) * (segmentHeight + segmentGap));
          const segRatio = s / totalSegments;

          if (s < activeSegs) {
            if (segRatio > 0.82) {
              ctx.fillStyle = '#EF4444'; // Red peak
            } else if (segRatio > 0.60) {
              ctx.fillStyle = '#F59E0B'; // Amber
            } else if (segRatio > 0.30) {
              ctx.fillStyle = '#00E5FF'; // Cyan Neon
            } else {
              ctx.fillStyle = '#0284C7'; // Cyber Blue
            }
          } else {
            ctx.fillStyle = 'rgba(30, 41, 59, 0.25)';
          }

          ctx.fillRect(barX, segY, barWidth, segmentHeight);
        }
      }

      // Laser Waveform Trace Center Beam
      ctx.save();
      ctx.strokeStyle = isRecording ? '#00F0FF' : 'rgba(0, 229, 255, 0.40)';
      ctx.lineWidth = isRecording ? 2 : 1.5;
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = isRecording ? 8 : 3;
      ctx.beginPath();
      const midY = h * 0.52;
      ctx.moveTo(12, midY);

      for (let x = 12; x < w - 12; x += 3) {
        const pulse = isRecording
          ? Math.sin(phase * 5 + x * 0.05) * 16 * Math.cos(phase * 2 + x * 0.02)
          : Math.sin(phase * 2 + x * 0.05) * 3;
        ctx.lineTo(x, midY + pulse);
      }
      ctx.stroke();
      ctx.restore();

      // Frequency markings legend
      ctx.save();
      ctx.font = '8px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.textAlign = 'center';
      const freqMarkers = ['60Hz', '250Hz', '1kHz', '4kHz', '16kHz'];
      freqMarkers.forEach((lbl, idx) => {
        const markerX = 14 + (idx / (freqMarkers.length - 1)) * (w - 28);
        ctx.fillText(lbl, markerX, h - 4);
      });
      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isRecording]);

  return (
    <div className={className || "relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-2xl overflow-hidden bg-[#070B16] border border-slate-800 shadow-inner"}>
      <canvas ref={canvasRef} width={340} height={420} className="w-full h-full block" />
    </div>
  );
};


export const FileTranscribeModule: React.FC = () => {
  // Navigation tab state: 'home' | 'library' | 'utilities' | 'settings' | 'upload' | 'editor'
  const [activeTab, setActiveTab] = useState<FileTranscribeNavTab>('home');
  
  // Current working file
  const [currentFile, setCurrentFile] = useState<TranscribedFile>(SAMPLE_FILES[0]);
  const [savedLibrary, setSavedLibrary] = useState<TranscribedFile[]>(SAMPLE_FILES);

  // Live Microphone Recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const recordingTimerRef = useRef<any>(null);

  // Upload & processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('neural-v2');
  const [enableDiarization, setEnableDiarization] = useState<boolean>(true);
  const [enablePunctuation, setEnablePunctuation] = useState<boolean>(true);

  const processingTimerRef = useRef<any>(null);
  const isPausedRef = useRef<boolean>(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Audio Playback & Waveform State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SAMPLE_FILES[0].duration);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  
  // Editor view modes: 'dialogue' | 'document' | 'summary'
  const [editorViewMode, setEditorViewMode] = useState<'dialogue' | 'document' | 'summary'>('dialogue');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [deafTextInput, setDeafTextInput] = useState<string>('');

  // Speaker Renaming Modal State
  const [renamingSpeakerId, setRenamingSpeakerId] = useState<string | null>(null);
  const [newSpeakerName, setNewSpeakerName] = useState<string>('');

  // Settings view sub-tab
  const [settingsSubTab, setSettingsSubTab] = useState<'vocab' | 'params' | 'export' | 'logs'>('vocab');

  // Waveform canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
      if (e.detail && ['home', 'upload', 'editor', 'library', 'utilities', 'settings'].includes(e.detail)) {
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

  // Handle Microphone Recording Timer Simulation
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  // Audio Playback simulation
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

    const numBars = 95;
    const barWidth = width / numBars - 2;
    const progressPercent = duration > 0 ? currentTime / duration : 0;
    const activeBarIndex = Math.floor(progressPercent * numBars);

    for (let i = 0; i < numBars; i++) {
      const seed = Math.sin((i + 1) * 12.9898 + (currentFile.name.length * 7)) * 43758.5453;
      const normalizedHeight = (Math.abs(seed) % 0.8) + 0.2;
      const barHeight = Math.max(8, normalizedHeight * (height - 12));
      const x = i * (barWidth + 2);
      const y = (height - barHeight) / 2;

      if (i < activeBarIndex) {
        ctx.fillStyle = '#0284C7';
      } else if (i === activeBarIndex) {
        ctx.fillStyle = '#F15A24';
      } else {
        ctx.fillStyle = '#cbd5e1';
      }

      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(2, barWidth), barHeight, 2);
      ctx.fill();
    }
  }, [currentTime, duration, currentFile]);

  // Handle local audio file upload
  const handleFileSelect = (file: File) => {
    startTranscriptionProcess(file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`, file.type || 'Audio file');
  };

  // Finish Recording & Process Live Audio
  const handleStopRecordingAndProcess = () => {
    setIsRecording(false);
    const recName = `Ghi_am_truc_tiep_${new Date().toLocaleTimeString('vi-VN').replace(/:/g, '-')}.wav`;
    startTranscriptionProcess(recName, '4.5 MB', 'Microphone 16kHz PCM');
  };

  // Start conversion pipeline simulation
  const startTranscriptionProcess = (fileName: string, sizeStr: string, formatStr: string) => {
    if (processingTimerRef.current) clearInterval(processingTimerRef.current);

    setIsProcessing(true);
    setIsPaused(false);
    isPausedRef.current = false;
    setProcessingProgress(5);
    setProcessingStage('Đang đọc tệp âm thanh và nạp vào bộ đệm AudioContext...');

    const stages = [
      { p: 15, msg: 'Đang đọc tệp âm thanh & nạp vào bộ đệm AudioContext...' },
      { p: 35, msg: 'Đang trích xuất sóng âm & phân tích phổ tần số (FFT 16kHz)...' },
      { p: 60, msg: 'Đang chạy mô hình AVG Neural ASR: Chuyển đổi giọng nói thành ngữ âm...' },
      { p: 80, msg: 'Đang phân đoạn người nói (Speaker Diarization) & lọc tạp âm...' },
      { p: 95, msg: 'Đang chuẩn hóa dấu câu hành chính & chuyển đổi thuật ngữ công sở...' },
      { p: 100, msg: 'Hoàn tất biên dịch! Đang xuất bản sang Trình biên soạn...' }
    ];

    processingTimerRef.current = setInterval(() => {
      if (isPausedRef.current) return;

      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(processingTimerRef.current);
          setTimeout(() => {
            const newFile: TranscribedFile = {
              id: `file-${Date.now()}`,
              name: fileName,
              sizeStr: sizeStr,
              duration: 215,
              format: formatStr,
              uploadedAt: 'Vừa xong',
              modelUsed: selectedModel === 'neural-v2' ? 'AVG Neural ASR v2.4 (Khuyên dùng)' : selectedModel === 'whisper-v3' ? 'Whisper Large v3 Enterprise' : 'Gemini 2.5 Flash Audio',
              category: 'Giao ban BĐH',
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
                }
              ]
            };

            setCurrentFile(newFile);
            setDuration(newFile.duration);
            setCurrentTime(0);
            setIsProcessing(false);
            setIsPaused(false);
            setSavedLibrary(prev => [newFile, ...prev]);
            setActiveTab('editor');
          }, 300);
          return 100;
        }

        const nextP = prev + 5;
        const matched = stages.slice().reverse().find(st => nextP >= st.p);
        if (matched) {
          setProcessingStage(matched.msg);
        }
        return nextP;
      });
    }, 250);
  };

  const handleStartConversion = () => {
    if (isPaused) {
      setIsPaused(false);
      setCopiedToast('▶️ Đã tiếp tục chuyển đổi');
      setTimeout(() => setCopiedToast(null), 2000);
      return;
    }
    const currentName = currentFile?.name || 'Giao_ban_dieu_hanh.mp3';
    const currentSize = currentFile?.sizeStr || '14.2 MB';
    const currentFmt = currentFile?.format || 'MP3 (Stereo)';
    startTranscriptionProcess(currentName, currentSize, currentFmt);
  };

  const handlePauseConversion = () => {
    setIsPaused(true);
    setCopiedToast('⏸️ Đã tạm dừng chuyển đổi');
    setTimeout(() => setCopiedToast(null), 2000);
  };

  const handleStopConversion = () => {
    if (processingTimerRef.current) clearInterval(processingTimerRef.current);
    setIsProcessing(false);
    setIsPaused(false);
    setProcessingProgress(0);
    setProcessingStage('Đã dừng xử lý tệp');
    setCopiedToast('⏹️ Đã hủy tiến trình chuyển đổi');
    setTimeout(() => setCopiedToast(null), 2000);
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

  // Delete file from library
  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedLibrary(prev => prev.filter(f => f.id !== id));
    setCopiedToast('Đã xóa tệp khỏi thư viện lưu trữ');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Copy full transcript text to clipboard
  const handleCopyFullText = () => {
    const fullText = currentFile.segments.map(s => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] ${s.speakerName}:\n${s.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedToast('Đã sao chép toàn bộ văn bản vào bộ nhớ tạm!');
    setTimeout(() => setCopiedToast(null), 3000);
  };

  // Export TXT file
  const handleExportTxt = (fileToExport = currentFile) => {
    const header = `TẬP ĐOÀN AVG ONE - BIÊN BẢN CHUYỂN ĐỔI GHI ÂM\n` +
      `Tệp nguồn: ${fileToExport.name}\n` +
      `Thời lượng: ${formatTime(fileToExport.duration)}\n` +
      `Ngày xử lý: ${fileToExport.uploadedAt}\n` +
      `Mô hình AI: ${fileToExport.modelUsed}\n` +
      `======================================================================\n\n`;
    const body = fileToExport.segments.map(s => `[${formatTime(s.startTime)} - ${formatTime(s.endTime)}] ${s.speakerName} (${s.speakerRole}):\n${s.text}\n`).join('\n');
    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileToExport.name.replace(/\.[^/.]+$/, "")}_VanBan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export SRT Subtitle file
  const handleExportSrt = (fileToExport = currentFile) => {
    const toSrtTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      const ms = Math.floor((seconds % 1) * 1000);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
    };

    let srtContent = '';
    fileToExport.segments.forEach((s, idx) => {
      srtContent += `${idx + 1}\n`;
      srtContent += `${toSrtTime(s.startTime)} --> ${toSrtTime(s.endTime)}\n`;
      srtContent += `<font color="#F15A24">${s.speakerName}:</font> ${s.text}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileToExport.name.replace(/\.[^/.]+$/, "")}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered segments for search query in editor
  const displayedSegments = useMemo(() => {
    if (!searchQuery.trim()) return currentFile.segments;
    const q = searchQuery.toLowerCase();
    return currentFile.segments.filter(s => s.text.toLowerCase().includes(q) || s.speakerName.toLowerCase().includes(q));
  }, [currentFile, searchQuery]);

  // Filtered files in Kho phẩm (Library)
  const filteredLibrary = useMemo(() => {
    return savedLibrary.filter(f => {
      const matchesCategory = selectedCategory === 'Tất cả' || f.category === selectedCategory;
      const matchesQuery = !searchQuery.trim() || f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.summary.executive.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [savedLibrary, selectedCategory, searchQuery]);

  // Determine currently active segment for karaoke playhead highlight
  const activeSegmentId = useMemo(() => {
    const active = currentFile.segments.find(s => currentTime >= s.startTime && currentTime <= s.endTime);
    return active ? active.id : null;
  }, [currentFile, currentTime]);

  return (
    <div className="w-full h-full flex-1 min-h-0 bg-slate-50 dark:bg-[#070B16] text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden relative font-sans select-none">
      
      {/* 🌐 HIGH-TECH CYBER GRID PATTERN BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-35 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-30 -left-30 w-[600px] h-[600px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute -top-30 -right-30 w-[600px] h-[600px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🏠 MỞ RỘNG TOÀN MÀN HÌNH (FULL-BLEED 100% WIDTH) - TRANG CHỦ & CONVERSION WORKSPACE */}
      {/* ========================================================================= */}
      {(activeTab === 'home' || activeTab === 'upload') && (
        <div className="w-full h-full flex-1 min-h-0 overflow-hidden px-3 sm:px-6 lg:px-8 py-3 relative z-10 flex flex-col justify-between">
          
          {/* WORKSPACE CONTENT AREA (MATCHING DIRECT SPEECH-TO-TEXT LAYOUT 100%) */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
              
              {/* ========================================================================= */}
              {/* 📌 CỘT BÊN TRÁI (LEFT PANEL): HỘP NẠP TỆP GHI ÂM (UPLOAD & PROGRESS PANEL) */}
              {/* ========================================================================= */}
              <div className="hidden lg:flex lg:col-span-3 xl:col-span-2 flex-col h-full overflow-hidden text-xs shrink-0">
                <div className="bg-white/95 dark:bg-slate-900/95 rounded-xl p-3 sm:p-3.5 border border-slate-200/90 dark:border-slate-800 shadow-xs relative overflow-hidden backdrop-blur-md transition-all flex-1 h-full flex flex-col justify-between space-y-2.5">
                  
                  {/* Ambient Glow */}
                  <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#0284C7]/15 dark:bg-[#0284C7]/25 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-black text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
                      <UploadCloud className="w-4 h-4 text-[#0284C7]" />
                      <span>Nạp Tệp Ghi Âm</span>
                    </div>
                    {isProcessing ? (
                      isPaused ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>TẠM DỪNG</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-[#0284C7] dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-ping" />
                          <span>ĐANG DỊCH</span>
                        </span>
                      )
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>SẴN SÀNG</span>
                      </span>
                    )}
                  </div>

                  {/* Drag & Drop Upload Zone Area */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 min-h-[160px] sm:min-h-[180px] rounded-xl border-2 border-dashed border-sky-300 dark:border-sky-800/80 bg-slate-50/80 dark:bg-slate-950/60 hover:border-[#F15A24] dark:hover:border-[#F15A24] hover:bg-sky-50/50 dark:hover:bg-slate-900/80 transition-all cursor-pointer p-3 flex flex-col items-center justify-center text-center space-y-2 group relative overflow-hidden"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      accept="audio/*,video/*"
                      className="hidden"
                    />

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284C7]/20 to-[#F15A24]/20 text-[#0284C7] dark:text-sky-400 flex items-center justify-center border border-sky-300/40 dark:border-sky-700/50 group-hover:scale-110 transition-transform shadow-sm">
                      <FileAudio className="w-6 h-6 text-[#0284C7] dark:text-[#38BDF8]" />
                    </div>

                    <div className="space-y-0.5">
                      <p className="font-extrabold text-xs text-slate-800 dark:text-slate-100 group-hover:text-[#0284C7] transition-colors">
                        Kéo & thả tệp vào đây
                      </p>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                        Hoặc bấm để tải từ máy tính
                      </p>
                    </div>

                    <div className="px-3 py-1 rounded-xl bg-[#0284C7] hover:bg-[#00A8E8] text-white text-[11px] font-black shadow-2xs flex items-center gap-1.5 transition cursor-pointer uppercase tracking-wider">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>CHỌN TỆP ÂM THANH</span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60 text-[9.5px] text-slate-400 font-mono space-y-0.5 w-full">
                      <div>MP3, M4A, WAV, AAC, FLAC</div>
                      <div>MP4, WebM (Max 2GB)</div>
                    </div>
                  </div>

                  {/* Currently Selected File Info Box */}
                  {currentFile && (
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 space-y-1 shrink-0">
                      <div className="flex items-center justify-between text-[10.5px] font-bold">
                        <span className="text-slate-500 dark:text-slate-400">Tệp hiện tại:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[9.5px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60">
                          {currentFile.format.split(' ')[0]}
                        </span>
                      </div>
                      <div className="font-extrabold text-xs text-slate-800 dark:text-slate-200 truncate" title={currentFile.name}>
                        {currentFile.name}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Thời lượng: {formatTime(currentFile.duration)}</span>
                        <span>{currentFile.sizeStr}</span>
                      </div>
                    </div>
                  )}

                  {/* CONTROL BUTTONS: START / PAUSE / RESUME / STOP */}
                  <div className="shrink-0 space-y-2">
                    {!isProcessing ? (
                      <button
                        type="button"
                        onClick={handleStartConversion}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#F15A24] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                      >
                        <Zap className="w-4 h-4 fill-current text-amber-300" />
                        <span>BẮT ĐẦU CHUYỂN ĐỔI</span>
                      </button>
                    ) : !isPaused ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={handlePauseConversion}
                          className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>TẠM DỪNG</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleStopConversion}
                          className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>DỪNG</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={handleStartConversion}
                          className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>TIẾP TỤC</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleStopConversion}
                          className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>DỪNG</span>
                        </button>
                      </div>
                    )}

                    {/* CONVERSION PROGRESS STATUS BOX */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Activity className={`w-3.5 h-3.5 ${isProcessing && !isPaused ? 'text-[#F15A24] animate-spin' : 'text-slate-400'}`} />
                          <span>Tiến độ chuyển đổi</span>
                        </span>
                        <span className="font-black text-[#F15A24] text-xs">
                          {processingProgress}%
                        </span>
                      </div>

                      {/* Progress Bar Track */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isPaused
                              ? 'bg-amber-500'
                              : 'bg-gradient-to-r from-[#0284C7] via-sky-400 to-[#F15A24]'
                          }`}
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>

                      {/* Stage description */}
                      <div className="text-[10px] font-medium text-slate-600 dark:text-slate-300 leading-snug truncate">
                        {isProcessing ? (
                          isPaused ? (
                            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                              <Pause className="w-3 h-3" /> Đã tạm dừng tiến trình...
                            </span>
                          ) : (
                            <span>{processingStage}</span>
                          )
                        ) : (
                          <span className="text-slate-400 italic">Sẵn sàng chuyển đổi tệp</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Footer Info */}
                  <div className="p-1.5 rounded-lg bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 text-[10px] shrink-0 flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Trạng thái Engine:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      16kHz Mono Ready
                    </span>
                  </div>

                </div>
              </div>

              {/* ========================================================================= */}
              {/* 📌 CỘT BÊN GIỮA (CENTER MAIN HERO PANEL): HỘI THOẠI & TRÒ CHUYỆN         */}
              {/* ========================================================================= */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-3 h-full overflow-hidden">
                
                {/* HERO CARD 1: MAIN DIALOGUE & TRANSCRIPT FEED */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-3 sm:p-4 flex-1 min-h-0 flex flex-col justify-between overflow-hidden relative transition-all">
                  
                  {/* Speaker Filter Badges Bar & Top Header Actions */}
                  <div className="flex flex-col gap-2 mb-2 shrink-0 relative z-10">
                    <div className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-sky-50/90 via-white/80 to-blue-50/70 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-850 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                      {/* Left: Title Badge */}
                      <div className="flex items-center gap-2 px-3.5 py-1 rounded-xl bg-[#0284C7] dark:bg-[#0284C7] border border-[#0284C7] dark:border-sky-500 shrink-0 h-8.5">
                        <h2 className="text-sm sm:text-base font-black uppercase tracking-wider !text-white text-white shrink-0 leading-none select-none">
                          Chuyển Đổi Sang Văn Bản
                        </h2>
                        <div className="flex items-center gap-1 h-5 px-1.5 py-0.5 rounded-full bg-white/20 border border-white/30 shrink-0 ml-0.5" title="Sóng âm thoại">
                          <span className="w-1 rounded-full bg-white animate-wave-bar-1" />
                          <span className="w-1 rounded-full bg-white animate-wave-bar-2" />
                          <span className="w-1 rounded-full bg-white animate-wave-bar-3" />
                          <span className="w-1 rounded-full bg-white animate-wave-bar-4" />
                        </div>
                      </div>

                      {/* Right: Header Toolbar Actions */}
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto h-8.5">
                        <button
                          type="button"
                          onClick={handleCopyFullText}
                          className="h-8 px-3 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                          title="Sao chép toàn bộ văn bản"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Sao chép</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleExportTxt()}
                          className="h-8 px-3 rounded-xl font-bold text-xs bg-[#0284C7] hover:bg-[#00A8E8] text-white flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                          title="Xuất file văn bản TXT"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Xuất TXT</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab('editor')}
                          className="h-8 px-3 rounded-xl font-extrabold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 text-slate-700 dark:text-slate-200 hover:text-[#0284C7] border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                          title="Mở rộng trình biên soạn toàn màn hình"
                        >
                          <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span className="hidden sm:inline">Mở rộng</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recessed Live Conversation Transcript Feed Cavity */}
                  <div className="space-y-3 flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                    
                    {/* Transcript Message Feed Bubbles */}
                    {currentFile && currentFile.segments && currentFile.segments.length > 0 ? (
                      <div className="space-y-3">
                        {currentFile.segments.map((seg, idx) => (
                          <div key={seg.id || idx} className="flex flex-col items-start w-full">
                            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white w-full shadow-xs space-y-2 hover:border-[#0284C7]/50 transition-all">
                              <div className="flex items-center justify-between text-xs font-bold pb-1.5 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-[#F15A24] dark:text-orange-400 font-black flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-[#F15A24]" />
                                  <span>{seg.speakerName} ({seg.speakerRole})</span>
                                </span>
                                <span className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                                  {formatTime(seg.startTime)} - {formatTime(seg.endTime)}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                                {seg.text}
                              </p>

                              {/* Segment Actions Footer Toolbar */}
                              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800/60">
                                <button
                                  type="button"
                                  onClick={() => handleJumpToSegment(seg)}
                                  className="flex items-center gap-1 text-[#0284C7] hover:text-[#00A8E8] font-bold cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Phát đoạn thoại</span>
                                </button>

                                <div className="flex items-center gap-3 text-slate-400">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(seg.text);
                                      setCopiedToast('Đã sao chép đoạn thoại này!');
                                      setTimeout(() => setCopiedToast(null), 2000);
                                    }}
                                    className="hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 font-medium cursor-pointer"
                                    title="Sao chép đoạn này"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Sao chép</span>
                                  </button>
                                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60">
                                    {Math.round((seg.confidence || 0.98) * 100)}% Accurate
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Dropzone Drop Area if empty */
                      <div
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-sky-300 dark:border-sky-800 bg-white/60 dark:bg-slate-900/60 hover:border-[#F15A24] transition-all cursor-pointer space-y-3"
                      >
                        <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} accept="audio/*,video/*" className="hidden" />
                        <div className="w-14 h-14 rounded-2xl bg-[#00A8E8]/10 text-[#00A8E8] flex items-center justify-center border border-[#00A8E8]/20">
                          <UploadCloud className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Kéo & thả file ghi âm vào đây hoặc chọn từ máy tính</p>
                          <p className="text-xs text-slate-400 mt-1">Hỗ trợ MP3, M4A, WAV, AAC, FLAC, OGG, MP4, WebM (Tối đa 2GB)</p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* HERO CARD 2: QUICK CHAT / RESPONSE INPUT BOX */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 space-y-2.5 shrink-0 shadow-md">
                  <div className="flex items-center justify-between text-xs">
                    <h2 className="font-extrabold text-[#00A8E8] dark:text-[#38BDF8] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#00A8E8]" />
                      <span>Ghi Chú & Biên Soạn Văn Bản</span>
                    </h2>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-[#00A8E8]" />
                        <span>Tự động đọc</span>
                      </label>
                      <button onClick={() => setActiveTab('editor')} className="p-1 text-slate-400 hover:text-slate-700">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full">
                    <textarea
                      value={deafTextInput}
                      onChange={(e) => setDeafTextInput(e.target.value)}
                      placeholder="Nhập ghi chú hoặc nội dung phản hồi văn bản tại đây..."
                      rows={2}
                      className="w-full pt-3 pb-3 pl-3.5 pr-14 bg-slate-50 dark:bg-slate-950 rounded-lg text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8E8] resize-none transition-all"
                    />

                    <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1 z-10">
                      <button
                        onClick={() => {
                          if (deafTextInput.trim()) {
                            setCopiedToast(`💬 Đã gửi: "${deafTextInput}"`);
                            setTimeout(() => setCopiedToast(null), 2500);
                            setDeafTextInput('');
                          }
                        }}
                        disabled={!deafTextInput.trim()}
                        className={`p-1.5 transition-all cursor-pointer ${
                          deafTextInput.trim() ? 'text-[#00A8E8] hover:scale-110' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                        }`}
                        title="Gửi phản hồi"
                      >
                        <Send className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* ========================================================================= */}
              {/* 📌 CỘT BÊN PHẢI (RIGHT PANEL): CẤU HÌNH & TÍNH NĂNG CHUYỂN ĐỔI SANG VĂN BẢN  */}
              {/* ========================================================================= */}
              <div className="hidden lg:flex lg:col-span-2 xl:col-span-2 flex-col h-full overflow-hidden text-xs shrink-0">
                <div className="bg-white/95 dark:bg-slate-900/95 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-xs flex-1 flex flex-col space-y-3 overflow-y-auto no-scrollbar backdrop-blur-md">
                  
                  {/* BLOCK 1: AI ASR MODEL CONFIGURATION */}
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-[#0284C7] dark:text-[#38BDF8]">
                        <Cpu className="w-4 h-4 text-[#0284C7]" />
                        <span>Mô Hình AI ASR</span>
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-[#0284C7] dark:text-sky-300 font-bold border border-sky-200/60 dark:border-sky-800/60">
                        v2.4
                      </span>
                    </h3>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Mô hình nhận dạng:</label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#0284C7] focus:outline-none cursor-pointer"
                      >
                        <option value="neural-v2">AVG Neural ASR v2.4 (Chuẩn)</option>
                        <option value="whisper-v3">Whisper Large v3 Enterprise</option>
                        <option value="gemini-flash">Gemini 2.5 Flash Audio</option>
                      </select>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>Phân tách người nói</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={enableDiarization}
                          onChange={(e) => setEnableDiarization(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-[#0284C7] cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <span className="flex items-center gap-1.5">
                          <Wand2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Chuẩn hóa dấu câu AI</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={enablePunctuation}
                          onChange={(e) => setEnablePunctuation(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-[#0284C7] cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* BLOCK 2: 1-CLICK AVG SAMPLE AUDIO FILES */}
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-[#F15A24]">
                        <Music className="w-4 h-4 text-[#F15A24]" />
                        <span>Mẫu Ghi Âm Demo</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">1-Click</span>
                    </h3>

                    <div className="space-y-1.5">
                      {SAMPLE_FILES.map((sample, idx) => (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => handleLoadSample(sample)}
                          className={`w-full p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1 shadow-2xs ${
                            currentFile.id === sample.id
                              ? 'bg-sky-50 dark:bg-sky-950/70 border-sky-300 dark:border-sky-700 text-[#0284C7]'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-sky-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-[11px] truncate flex-1" title={sample.name}>
                              {idx + 1}. {sample.name.split('.')[0]}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                              {formatTime(sample.duration)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>{sample.category}</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Nạp tệp &rarr;</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BLOCK 3: ADVANCED AUDIO UTILITIES */}
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Công Cụ Xử Lý Âm Thanh</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('utilities');
                          setCopiedToast('Mở trình Tách âm thanh Video MP4');
                          setTimeout(() => setCopiedToast(null), 2500);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-orange-50 dark:hover:bg-orange-950/40 border border-slate-200 dark:border-slate-700 hover:border-orange-300 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all text-left flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-orange-100 dark:bg-orange-900/60 text-[#F15A24]">
                            <FileCode className="w-3.5 h-3.5" />
                          </span>
                          <span>Tách Audio Video MP4</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCopiedToast('Lọc khử 75% nhiễu hội trường');
                          setTimeout(() => setCopiedToast(null), 2500);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200 dark:border-slate-700 hover:border-sky-300 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all text-left flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-sky-100 dark:bg-sky-900/60 text-[#0284C7]">
                            <Waves className="w-3.5 h-3.5" />
                          </span>
                          <span>Lọc 75% Nhiễu Phòng</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCopiedToast('Kích hoạt nhận diện Giọng 3 Miền');
                          setTimeout(() => setCopiedToast(null), 2500);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700 hover:border-purple-300 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all text-left flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-600">
                            <RadioTower className="w-3.5 h-3.5" />
                          </span>
                          <span>Tăng Cường Giọng Miền</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* BLOCK 4: DIRECT EXPORT & TELEMETRY METRICS */}
                  <div className="space-y-2 pt-1 mt-auto">
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleExportTxt()}
                        className="px-2.5 py-2 rounded-xl bg-[#0284C7] hover:bg-[#00A8E8] text-white text-[11px] font-black shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Xuất TXT</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExportSrt()}
                        className="px-2.5 py-2 rounded-xl bg-[#F15A24] hover:bg-amber-600 text-white text-[11px] font-black shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Xuất SRT</span>
                      </button>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[10px] space-y-1">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          Bảo mật:
                        </span>
                        <span className="font-extrabold text-slate-700 dark:text-slate-200">AES-256 Encrypted</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          Độ chính xác:
                        </span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400">98.6% WER</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

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

      {/* ========================================================================= */}
      {/* 📁 MỞ RỘNG TOÀN MÀN HÌNH (FULL-BLEED) - ĐẦU MỤC KHO PHẨM */}
      {/* ========================================================================= */}
      {activeTab === 'library' && (
        <div className="w-full h-full flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10 flex flex-col">
          
          {/* Top Metric / KPI Summary Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 shrink-0 w-full">
            <div className="bg-white/95 dark:bg-[#0B1120]/95 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0284C7] shrink-0">
                <FolderOpen className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng Tệp Ghi Âm</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">{savedLibrary.length} tệp</div>
              </div>
            </div>

            <div className="bg-white/95 dark:bg-[#0B1120]/95 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950/80 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-[#F15A24] shrink-0">
                <Clock className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng Thời Lượng</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {formatTime(savedLibrary.reduce((acc, curr) => acc + curr.duration, 0))}
                </div>
              </div>
            </div>

            <div className="bg-white/95 dark:bg-[#0B1120]/95 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Độ Chính Xác AI</div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">98.6% WER</div>
              </div>
            </div>

            <div className="bg-white/95 dark:bg-[#0B1120]/95 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 shrink-0">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lưu Trữ An Toàn</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">AES-256</div>
              </div>
            </div>
          </div>

          {/* Filter & Action Toolbar */}
          <div className="bg-white/95 dark:bg-[#0B1120]/95 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 w-full">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm tệp theo tên hoặc nội dung tóm tắt..."
                  className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0284C7] w-64 sm:w-80"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {['Tất cả', 'Giao ban BĐH', 'Pháp chế & Hợp đồng', 'Phỏng vấn nhân sự'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#0284C7] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F15A24] to-amber-500 hover:opacity-90 text-white text-xs font-black shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 transition shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Chuyển đổi tệp mới</span>
            </button>
          </div>

          {/* Documents Grid Feed (Full Width Grid) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {filteredLibrary.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-[#0B1120] rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="text-sm font-black text-slate-700 dark:text-slate-300">Không tìm thấy tệp ghi âm nào khớp với tìm kiếm</div>
                <p className="text-xs text-slate-400">Thử thay đổi từ khóa hoặc bộ lọc danh mục phía trên.</p>
              </div>
            ) : (
              filteredLibrary.map((file) => (
                <div
                  key={file.id}
                  onClick={() => {
                    setCurrentFile(file);
                    setDuration(file.duration);
                    setCurrentTime(0);
                    setIsPlaying(false);
                    setActiveTab('editor');
                  }}
                  className="bg-white/95 dark:bg-[#0B1120]/95 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md hover:border-[#0284C7] dark:hover:border-sky-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-950 dark:to-slate-800 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-110 transition-transform">
                        <FileAudio className="w-5 h-5" />
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {file.category && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-50 text-[#0284C7] dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60">
                            {file.category}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {formatTime(file.duration)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#0284C7] transition" title={file.name}>
                        {file.name}
                      </h3>
                      <div className="text-[10.5px] text-slate-400 font-medium mt-0.5 flex items-center gap-2">
                        <span>{file.uploadedAt}</span>
                        <span>•</span>
                        <span>{file.sizeStr}</span>
                      </div>
                    </div>

                    <p className="text-[11.5px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      {file.summary.executive}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[10.5px] font-extrabold text-slate-400">
                      {file.segments.length} lượt thoại
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleExportTxt(file); }}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
                        title="Tải văn bản (.txt)"
                      >
                        <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleExportSrt(file); }}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
                        title="Tải phụ đề (.srt)"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteFile(file.id, e)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 text-slate-400 transition"
                        title="Xóa tệp khỏi kho"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <span className="px-3 py-1 rounded-xl bg-[#0284C7] text-white text-xs font-black shadow-xs flex items-center gap-1 group-hover:bg-[#F15A24] transition">
                        <span>Mở</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛠️ MỞ RỘNG TOÀN MÀN HÌNH - TIỆN ÍCH */}
      {/* ========================================================================= */}
      {activeTab === 'utilities' && (
        <div className="w-full h-full flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10 flex flex-col">
          
          <div className="bg-gradient-to-r from-sky-500/10 via-orange-500/10 to-transparent p-5 sm:p-6 rounded-3xl border border-sky-200/80 dark:border-sky-800/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 w-full">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-sky-200 dark:border-sky-800 text-xs font-black text-[#0284C7] dark:text-sky-400">
                <Wand2 className="w-3.5 h-3.5 text-[#F15A24]" />
                <span>AVG AI AUDIO UTILITIES STUDIO SUITE</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Bộ Tiện Ích Xử Lý Âm Thanh Chuyên Sâu
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                Trích xuất âm thanh từ video MP4/WebM, lọc khử nhiễu phòng họp hội trường và nhận diện chính xác tiếng địa phương 3 miền.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#0B1120]/95 border border-slate-200 dark:border-slate-800 space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F15A24] flex items-center justify-center font-bold text-xl">
                📹
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Tách Âm Thanh từ Video</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Tự động tách đoạn thoại từ các tệp quay video MP4, WebM, MOV với chất lượng âm thanh 320kbps.
              </p>
              <button onClick={() => setActiveTab('home')} className="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-black text-xs cursor-pointer">
                Nạp Video Tách Audio
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#0B1120]/95 border border-slate-200 dark:border-slate-800 space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center font-bold text-xl">
                🔊
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Khử Tiếng Ồn Hội Trường</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Bộ lọc FFT 75% tự động triệt tiêu tiếng vang hội trường, tiếng gõ bàn phím và tiếng quạt gió.
              </p>
              <button onClick={() => setActiveTab('home')} className="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-black text-xs cursor-pointer">
                Lọc Âm Thanh Nhiễu
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#0B1120]/95 border border-slate-200 dark:border-slate-800 space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                🎙️
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Nhận Diện Giọng Vùng Miền</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Tối ưu hóa mô hình ASR cho các giọng thổ ngữ đặc thù miền Bắc, miền Trung (Nghệ An, Hà Tĩnh) và miền Nam.
              </p>
              <button onClick={() => setActiveTab('home')} className="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-black text-xs cursor-pointer">
                Thử Giọng Miền
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎵 TRÌNH BIÊN SOẠN KARAOKE AUDIO WORKSPACE ('editor') */}
      {/* ========================================================================= */}
      {activeTab === 'editor' && (
        <div className="w-full h-full flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
          
          <div className="bg-white/95 dark:bg-[#0B1120]/95 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 shrink-0 shadow-2xs space-y-2.5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('library')}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer transition shrink-0 flex items-center gap-1 text-xs font-bold"
                  title="Quay lại Kho phẩm"
                >
                  <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
                  <span className="hidden sm:inline">Kho phẩm</span>
                </button>

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

            <div className="relative bg-slate-100/90 dark:bg-slate-800/80 rounded-xl p-2 border border-slate-200/80 dark:border-slate-700/80">
              <canvas
                ref={canvasRef}
                width={1000}
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
                <span className="text-slate-400">Nhấp vào sóng âm để tua nhanh phát đúng đoạn phát biểu</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
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

              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
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
                >
                  <Copy className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Sao chép</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleExportTxt()}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Xuất TXT</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleExportSrt()}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Xuất SRT</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 w-full">
            {editorViewMode === 'dialogue' && (
              <div className="space-y-3">
                {displayedSegments.length === 0 ? (
                  <div className="p-8 text-center text-xs font-semibold text-slate-400 bg-white dark:bg-[#0B1120] rounded-2xl border border-slate-200 dark:border-slate-800">
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
                            : 'bg-white/95 dark:bg-[#0B1120]/95 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
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

                          <button
                            type="button"
                            onClick={() => handleJumpToSegment(seg)}
                            className={`px-2 py-0.5 rounded-lg text-[10.5px] font-mono font-black flex items-center gap-1 transition cursor-pointer ${
                              isCurrentPlaying
                                ? 'bg-[#F15A24] text-white shadow-xs animate-pulse'
                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>{formatTime(seg.startTime)} - {formatTime(seg.endTime)}</span>
                          </button>
                        </div>

                        <div className="pt-2.5">
                          {editingSegmentId === seg.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                rows={3}
                                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-sky-400 text-xs sm:text-sm font-medium focus:outline-none"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingSegmentId(null)}
                                  className="px-3 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
                                >
                                  Hủy
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveSegmentText(seg.id)}
                                  className="px-3 py-1 rounded-lg bg-[#0284C7] text-white text-xs font-black shadow-xs"
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

            {editorViewMode === 'document' && (
              <div className="bg-white/95 dark:bg-[#0B1120]/95 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6 w-full">
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
                  {currentFile.segments.map((seg) => (
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
              </div>
            )}

            {editorViewMode === 'summary' && (
              <div className="space-y-4 w-full">
                <div className="bg-white/95 dark:bg-[#0B1120]/95 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0284C7]">
                    <Sparkles className="w-4 h-4 text-[#F15A24]" />
                    <span>Tóm Tắt Điều Hành Cuộc Họp (Executive Summary)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {currentFile.summary.executive}
                  </p>
                </div>

                <div className="bg-white/95 dark:bg-[#0B1120]/95 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
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

                <div className="bg-white/95 dark:bg-[#0B1120]/95 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
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

          {renamingSpeakerId && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-sm bg-white dark:bg-[#0B1120] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
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
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                  <div className="text-[10px] text-slate-400">Tên mới sẽ tự động cập nhật cho toàn bộ các đoạn phát biểu của người này trong tệp.</div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setRenamingSpeakerId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleRenameSpeaker}
                    className="px-4 py-1.5 rounded-lg bg-[#F15A24] text-white text-xs font-black shadow-xs"
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
      {/* ⚙️ MỞ RỘNG TOÀN MÀN HÌNH - CÀI ĐẶT */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="w-full h-full flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10 flex flex-col">
          
          <div className="bg-gradient-to-r from-sky-500/10 via-orange-500/10 to-transparent p-5 sm:p-6 rounded-3xl border border-sky-200/80 dark:border-sky-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Cấu Hình Mô Hình & Tùy Chỉnh Thuật Toán ASR
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Quản lý từ điển từ mượn công sở, thông số bộ lọc âm thanh và quy chuẩn xuất báo cáo tự động của Tập đoàn AVG.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCopiedToast('Đã lưu cấu hình hệ thống thành công!');
                setTimeout(() => setCopiedToast(null), 3000);
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#F15A24] to-amber-500 hover:opacity-90 text-white font-black text-xs shadow-xs cursor-pointer active:scale-95 transition shrink-0"
            >
              Lưu cấu hình hệ thống
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 w-full">
            
            <div className="lg:col-span-3 bg-white/95 dark:bg-[#0B1120]/95 p-3 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-1">
              {[
                { id: 'vocab' as const, label: 'Từ điển Chuyên ngành', desc: 'Custom Vocabulary Boosting', icon: Database },
                { id: 'params' as const, label: 'Thông số Thuật toán', desc: 'Acoustic & Model Tuning', icon: Cpu },
                { id: 'export' as const, label: 'Quy chuẩn Webhook', desc: 'Cloud Integration & Export', icon: Link2 },
                { id: 'logs' as const, label: 'Nhật ký Hệ thống', desc: 'API Audit Logs & Activity', icon: Activity },
              ].map((item) => {
                const isActive = settingsSubTab === item.id;
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSettingsSubTab(item.id)}
                    className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-[#0284C7] text-white shadow-xs font-black'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate">{item.label}</div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-9 bg-white/95 dark:bg-[#0B1120]/95 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6">
              
              {settingsSubTab === 'vocab' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Database className="w-4.5 h-4.5 text-[#0284C7]" />
                      <span>Từ Điển Chuyên Ngành & Thuật Ngữ Viết Tắt AVG (Vocabulary Boosting)</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Các thuật ngữ bên dưới sẽ được AI ưu tiên gán trọng số nhận diện cao nhất khi người phát biểu nói nhanh hoặc nói chêm tiếng Anh.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                      Danh mục từ khóa ưu tiên (Phân cách bằng dấu phẩy):
                    </label>
                    <textarea
                      defaultValue="PO, VAT, OKR, KPI, Firmware, Sensor, Modbus, BLE, SHTT, Bản quyền, Nghiệm thu, LC, B/L, RC2, CAD, CNC, PCB, RDI, AVG One, CTC Decoder, Quantization, Edge AI"
                      rows={5}
                      className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400">Gợi ý từ khóa mẫu theo phòng ban:</span>
                    <div className="flex flex-wrap gap-2">
                      {['R&D & Kỹ thuật vi mạch', 'Tài chính - Kế toán & Ngân hàng', 'Pháp lý & Sở hữu trí tuệ', 'Quản trị Ban Điều Hành'].map((chip) => (
                        <span key={chip} className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0284C7] dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-800 cursor-pointer hover:bg-sky-100">
                          + {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {settingsSubTab === 'params' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Cpu className="w-4.5 h-4.5 text-[#F15A24]" />
                      <span>Thông Số Thuật Toán & Xử Lý Âm Thanh</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Tinh chỉnh ngưỡng nhạy lọc nhiễu, phân tách người nói và quy tắc chấm dấu câu tự động.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-800 dark:text-slate-200">Độ nhạy khử ồn môi trường (Noise Suppression)</span>
                        <span className="text-[#0284C7]">75% (Khuyên dùng)</span>
                      </div>
                      <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-[#0284C7] cursor-pointer" />
                      <div className="text-[10.5px] text-slate-400">Tự động lọc tiếng gió quạt, bàn phím và tiếng vọng phòng hội trường.</div>
                    </div>

                    <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-800 dark:text-slate-200">Độ nhạy phân biệt giọng người nói (Speaker Diarization)</span>
                        <span className="text-[#F15A24]">85% High Precision</span>
                      </div>
                      <input type="range" min="0" max="100" defaultValue="85" className="w-full accent-[#F15A24] cursor-pointer" />
                      <div className="text-[10.5px] text-slate-400">Phân biệt chính xác giữa các giọng nói có âm sắc tương đồng trong cùng một cuộc họp.</div>
                    </div>

                    <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-800 dark:text-slate-200">Số lượng người phát biểu tối đa dự kiến</span>
                        <span className="text-emerald-600">Tối đa 6 người</span>
                      </div>
                      <select className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold">
                        <option>2 người (Phỏng vấn 1-on-1)</option>
                        <option selected>4-6 người (Giao ban phòng ban)</option>
                        <option>10+ người (Hội thảo / Họp cổ đông)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {settingsSubTab === 'export' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Link2 className="w-4.5 h-4.5 text-emerald-600" />
                      <span>Quy Chuẩn Webhook & Tự Động Hóa Đồng Bộ Cloud</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Tự động gửi biên bản sau khi chuyển đổi thành công lên Google Sheets, Microsoft Teams hoặc Email ban quản trị.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300">Webhook URL nhận dữ liệu tự động:</label>
                      <input
                        type="url"
                        defaultValue="https://one.auvietglobal.com/api/v1/transcribe/webhook-receiver"
                        className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300">Định dạng file xuất mặc định:</label>
                      <div className="flex items-center gap-3">
                        {['TXT Text', 'SRT Subtitle', 'DOCX Word', 'JSON Raw'].map((fmt, i) => (
                          <label key={fmt} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                            <input type="checkbox" defaultChecked={i < 2} className="rounded text-[#0284C7]" />
                            <span>{fmt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {settingsSubTab === 'logs' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Activity className="w-4.5 h-4.5 text-purple-600" />
                      <span>Nhật Ký Chuyển Đổi & Lịch Sử API</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Theo dõi tiến trình xử lý, thời gian biên dịch và dung lượng tệp ghi âm gần đây.
                    </p>
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    {[
                      { time: '09:15:22', status: 'SUCCESS 200', file: 'Giao_ban_dieu_hanh_Sensor_AI_Tuan38.mp3', duration: '3m05s', model: 'AVG Neural ASR v2.4' },
                      { time: '15:30:10', status: 'SUCCESS 200', file: 'Phong_van_chuyen_gia_AI_Engine.m4a', duration: '2m22s', model: 'AVG Neural ASR v2.4' },
                      { time: '10:45:00', status: 'SUCCESS 200', file: 'Hop_tham_dinh_phap_ly_hop_dong_quoc_te.wav', duration: '2m40s', model: 'Whisper Large v3' },
                    ].map((log, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{log.time}</span>
                          <span className="px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">{log.status}</span>
                          <span className="text-slate-800 dark:text-slate-200 font-bold">{log.file}</span>
                        </div>
                        <div className="text-slate-400">
                          <span>{log.duration}</span> • <span>{log.model}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
