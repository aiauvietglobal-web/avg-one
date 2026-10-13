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
  CornerDownLeft, Bookmark, Tag, Globe, ShieldAlert, BookOpen,
  ThumbsUp, ThumbsDown, ArrowUp, Megaphone, Presentation, Video,
  Brain, Lightbulb, Table, Pin, ChevronUp, X, RadioTower, Sparkle
} from 'lucide-react';
import { FileTranscribeNavTab } from '../../components/layout/headers/FileTranscribeHeader';

export interface AudioSourceItem {
  id: string;
  name: string;
  durationStr: string;
  durationSec: number;
  audioUrl: string;
  selected: boolean;
  uploadedAt: string;
  sizeStr: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface StudioToolItem {
  id: string;
  title: string;
  icon: any;
  iconColor: string;
  badge?: string;
  description: string;
}

export const FileTranscribeModule: React.FC = () => {
  // =========================================================================
  // 📚 1. SOURCES (NGUỒN) STATE - EXACTLY AS IN MEDIA_1791516078019.PNG
  // =========================================================================
  const [sources, setSources] = useState<AudioSourceItem[]>([
    {
      id: 'src-1',
      name: 'Record 2026-10-04 at 14h08m55s.mp3',
      durationStr: '00:23',
      durationSec: 23,
      audioUrl: '/audio/audio_k1_dh.mp3',
      selected: true,
      uploadedAt: '04/10/2026 14:08',
      sizeStr: '540 KB'
    },
    {
      id: 'src-2',
      name: 'Record 2026-10-06 at 16h05m57s.mp3',
      durationStr: '00:20',
      durationSec: 20,
      audioUrl: '/audio/audio_2_1_anh_nguyet.mp3',
      selected: true,
      uploadedAt: '06/10/2026 16:05',
      sizeStr: '491 KB'
    },
    {
      id: 'src-3',
      name: '#K1; DH.MP3 (Ban Điều Hành)',
      durationStr: '00:23',
      durationSec: 23,
      audioUrl: '/audio/audio_k1_dh.mp3',
      selected: false,
      uploadedAt: '02/10/2026 09:30',
      sizeStr: '612 KB'
    }
  ]);

  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState<boolean>(false);
  const [showAddSourceModal, setShowAddSourceModal] = useState<boolean>(false);
  const [webSearchQuery, setWebSearchQuery] = useState<string>('');
  const [webSourceType, setWebSourceType] = useState<'web' | 'fast_research'>('web');
  const [notebookTitle, setNotebookTitle] = useState<string>('Chiến Lược Bảo Mật Dữ Liệu và Ứng Phó Rủi Ro');

  // =========================================================================
  // 💬 2. CHAT & DETAILED CONVERSION CONVERSATION STATE
  // =========================================================================
  const [isThoughtsOpen, setIsThoughtsOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);
  const [likedMap, setLikedMap] = useState<Record<string, 'up' | 'down' | null>>({});
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  // Dynamic Q&A message stream
  const [extraChatMessages, setExtraChatMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'ai';
    text: string;
    thoughts?: string[];
    citations?: Array<{ label: string; timeSec: number; speaker: string; text: string }>;
  }>>([]);

  // =========================================================================
  // 🎙️ 3. AUDIO PLAYER & CITATION PLAYBACK STATE
  // =========================================================================
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentPlayTime, setCurrentPlayTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(23);
  const [activeCitationPopover, setActiveCitationPopover] = useState<{
    id: number;
    speaker: string;
    timeRange: string;
    quote: string;
    startTime: number;
  } | null>(null);

  // =========================================================================
  // 🎨 4. STUDIO TOOLS & MODAL STATES (9 TOOLS AS IN SCREENSHOT)
  // =========================================================================
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);
  const [activeStudioModal, setActiveStudioModal] = useState<string | null>(null);
  const [notesList, setNotesList] = useState<NoteItem[]>([
    {
      id: 'note-1',
      title: 'Trích yếu nguyên tắc bảo mật cục bộ',
      content: 'Chỉ đạo Ban Điều Hành: Dứt khoát đi qua đầu mối 5.1 và hạ tầng tháng 8. Điều lệ và quy chế hoàn toàn độc lập chuyên môn.',
      createdAt: '04/10/2026'
    }
  ]);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [showAddNoteModal, setShowAddNoteModal] = useState<boolean>(false);

  // Studio Audio Overview Interactive Podcast State
  const [podcastPlaying, setPodcastPlaying] = useState<boolean>(false);
  const [podcastProgress, setPodcastProgress] = useState<number>(0);

  // Sync with Header
  useEffect(() => {
    const handleAddSource = () => setShowAddSourceModal(true);
    const handleNewNotebook = () => {
      setExtraChatMessages([]);
      setCopiedToast('Đã khởi tạo Sổ ghi chú mới');
      setTimeout(() => setCopiedToast(null), 2500);
    };

    window.addEventListener('file_transcribe_open_import', handleAddSource);
    window.addEventListener('file_transcribe_new_notebook', handleNewNotebook);

    return () => {
      window.removeEventListener('file_transcribe_open_import', handleAddSource);
      window.removeEventListener('file_transcribe_new_notebook', handleNewNotebook);
    };
  }, []);

  // Audio Timeupdate listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentPlayTime(audio.currentTime);
    const onLoadedMetadata = () => setAudioDuration(audio.duration || 23);
    const onEnded = () => setIsPlayingAudio(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Format Time (MM:SS)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play audio from exact timestamp
  const handlePlayCitationAudio = (startSec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startSec;
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(true));
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(true));
    }
  };

  // Selected Sources Count
  const selectedSourcesCount = useMemo(() => {
    return sources.filter(s => s.selected).length;
  }, [sources]);

  const allSelected = useMemo(() => {
    return sources.length > 0 && sources.every(s => s.selected);
  }, [sources]);

  const handleToggleSelectAll = () => {
    const nextVal = !allSelected;
    setSources(prev => prev.map(s => ({ ...s, selected: nextVal })));
  };

  const handleToggleSource = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  // Send message in notebook chat
  const handleSendPrompt = (customPrompt?: string) => {
    const query = (customPrompt || chatInput).trim();
    if (!query) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      text: query
    };

    setExtraChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiResponding(true);

    setTimeout(() => {
      let replyText = '';
      let replyThoughts = [
        '• Rà soát các tệp nguồn đang chọn trong Notebook...',
        '• Đối chiếu các chỉ đạo của Ban Điều Hành và mốc thời gian...',
        '• Cấu trúc hóa giải đáp chi tiết kèm trích dẫn.'
      ];
      let replyCitations: Array<{ label: string; timeSec: number; speaker: string; text: string }> = [];

      const qLower = query.toLowerCase();
      if (qLower.includes('bảo mật') || qLower.includes('kết nối') || qLower.includes('5.1')) {
        replyText = `Dựa trên nguồn "Record 2026-10-04 at 14h08m55s.mp3":\n\n1. **Hoạt động bảo mật cục bộ:** Chỉ áp dụng phục vụ các nhiệm vụ trọng điểm tháng 10, không thay thế quy trình chiến lược dài hạn [1].\n2. **Quyền kết nối:** Ban Điều Hành chỉ định kết nối trực tiếp, quy chuẩn thông thường bắt buộc đi qua đầu mối 5.1 và hạ tầng tháng 8 [2].`;
        replyCitations = [
          { label: '1', timeSec: 0, speaker: 'Lãnh đạo Ban Điều Hành', text: 'Bảo mật ở đây mang tính chất bảo mật cục bộ.' },
          { label: '2', timeSec: 6, speaker: 'Lãnh đạo Ban Điều Hành', text: 'Dứt khoát phải đi qua đầu mối 5.1 và hạ tầng kết nối.' }
        ];
      } else if (qLower.includes('điều lệ') || qLower.includes('quy chế')) {
        replyText = `Lãnh đạo chỉ đạo dứt khoát:\n- **Điều lệ và Quy chế** là hai thực thể hoàn toàn độc lập về mặt chuyên môn [1].\n- Cần lược bỏ ngay các nội dung chi tiết quy chế đang bị đưa thừa vào bản thảo điều lệ nhằm giảm thiểu rủi ro pháp lý [2].`;
        replyCitations = [
          { label: '1', timeSec: 0, speaker: 'Đoàn Huy (#K1)', text: 'Điều lệ và quy chế là hai thực thể hoàn toàn độc lập về mặt chuyên môn.' },
          { label: '2', timeSec: 8, speaker: 'Đoàn Huy (#K1)', text: 'Ở trong đó là nó chi tiết quá, nó lại đưa rất nhiều cái nằm ở phần quy chế.' }
        ];
      } else {
        replyText = `Đã phân tích ${selectedSourcesCount} nguồn được chọn:\n\nNội dung cuộc họp thống nhất tập trung rà soát hồ sơ, thực hiện công việc triệt để, khoa học và đúng hạn để bảo vệ quyền lợi doanh nghiệp [1].`;
        replyCitations = [
          { label: '1', timeSec: 0, speaker: 'Chủ trì cuộc họp', text: 'Yêu cầu thực hiện triệt để, khoa học và đúng hạn.' }
        ];
      }

      setExtraChatMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          thoughts: replyThoughts,
          citations: replyCitations
        }
      ]);
      setIsAiResponding(false);
    }, 700);
  };

  // Save current text into note
  const handleSaveToNote = (text: string) => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: `Ghi chú từ chuyển đổi (${new Date().toLocaleTimeString('vi-VN')})`,
      content: text,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    setNotesList(prev => [newNote, ...prev]);
    setCopiedToast('Đã lưu nội dung vào Ghi chú Studio!');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // Copy text to clipboard
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToast('Đã sao chép vào bộ nhớ tạm!');
    setTimeout(() => setCopiedToast(null), 2500);
  };

  // 9 Studio Tools Definitions
  const STUDIO_TOOLS: StudioToolItem[] = [
    {
      id: 'audio-overview',
      title: 'Tổng quan bằng âm thanh',
      icon: Mic,
      iconColor: 'text-purple-600 dark:text-purple-400',
      description: 'Hai chuyên gia AI thảo luận sâu về toàn bộ nội dung ghi âm dưới dạng Podcast.'
    },
    {
      id: 'presentation',
      title: 'Bản trình bày',
      icon: Presentation,
      iconColor: 'text-red-500 dark:text-red-400',
      description: 'Tự động trích xuất các ý chính thành slide trình chiếu chuyên nghiệp.'
    },
    {
      id: 'video-overview',
      title: 'Tổng quan bằng video',
      icon: Video,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      description: 'Tạo video tóm tắt trực quan kèm phụ đề chuyển đổi tự động.'
    },
    {
      id: 'mind-map',
      title: 'Bản đồ tư duy',
      icon: Brain,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      description: 'Sơ đồ cây liên kết các chủ đề, rủi ro và giải pháp trong cuộc họp.'
    },
    {
      id: 'report',
      title: 'Báo cáo',
      badge: 'Mới!',
      icon: FileText,
      iconColor: 'text-rose-500 dark:text-rose-400',
      description: 'Báo cáo điều hành hoàn chỉnh theo chuẩn doanh nghiệp AVG One.'
    },
    {
      id: 'flashcards',
      title: 'Thẻ ghi nhớ',
      icon: Lightbulb,
      iconColor: 'text-amber-500 dark:text-amber-400',
      description: 'Bộ thẻ lật câu hỏi & đáp án giúp ôn tập nhanh các chỉ đạo quan trọng.'
    },
    {
      id: 'quiz',
      title: 'Bài kiểm tra',
      icon: HelpCircle,
      iconColor: 'text-blue-500 dark:text-blue-400',
      description: 'Kiểm tra mức độ nắm bắt nội dung với 5 câu hỏi trắc nghiệm tự động chấm điểm.'
    },
    {
      id: 'infographic',
      title: 'Bản đồ họa thông tin',
      icon: BarChart3,
      iconColor: 'text-amber-600 dark:text-amber-400',
      description: 'Tổng quan số liệu, tỷ lệ thời lượng và các mốc tiến độ trực quan.'
    },
    {
      id: 'data-table',
      title: 'Bảng dữ liệu',
      icon: Table,
      iconColor: 'text-sky-600 dark:text-sky-400',
      description: 'Trích xuất toàn bộ bảng giao việc, phân công trách nhiệm và deadline.'
    }
  ];

  return (
    <div className="flex-1 w-full h-[calc(100vh-56px)] flex overflow-hidden bg-[#F8F9FA] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 select-none font-sans">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/audio/audio_k1_dh.mp3" preload="auto" />

      {/* ======================================================================= */}
      {/* 📁 CỘT 1: NGUỒN (SOURCES) - LEFT COLUMN (~300px) */}
      {/* ======================================================================= */}
      {!isLeftCollapsed ? (
        <aside className="w-72 sm:w-80 flex-shrink-0 h-full border-r border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] flex flex-col z-10 transition-all">
          <div className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-4 no-scrollbar">
            {/* Nút + Thêm nguồn (hộp bo góc chuẩn rounded-xl, bỏ hình elip) */}
            <button
              onClick={() => setShowAddSourceModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Thêm nguồn</span>
            </button>

            {/* Khối Tìm nguồn mới trên web (hộp bo góc chuẩn rounded-xl, bỏ hình elip) */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-2xs">
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-semibold">
                Tìm nguồn mới trên web
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setWebSourceType('web')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    webSourceType === 'web'
                      ? 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-2xs'
                      : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-[#1A73E8]" />
                  <span>Web</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                </button>

                <button
                  onClick={() => setWebSourceType('fast_research')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    webSourceType === 'fast_research'
                      ? 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-2xs'
                      : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Nghiên cứu nhanh</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    if (webSearchQuery.trim()) {
                      handleSendPrompt(`Nghiên cứu thêm trên web về: ${webSearchQuery}`);
                      setWebSearchQuery('');
                    }
                  }}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 flex items-center justify-center transition-colors cursor-pointer ml-auto shadow-2xs"
                  title="Tìm kiếm"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Danh sách tệp nguồn đã nạp */}
            <div className="space-y-1.5 pt-1">
              {/* Header danh sách: Chọn tất cả */}
              <div className="flex items-center justify-between px-2 py-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Waves className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11.5px] font-medium text-slate-600 dark:text-slate-300">
                    Chọn tất cả
                  </span>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleToggleSelectAll}
                    className="w-4 h-4 rounded text-[#1A73E8] focus:ring-[#1A73E8] border-slate-300 dark:border-slate-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Từng mục nguồn */}
              {sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => handleToggleSource(src.id)}
                  className={`group p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    src.selected
                      ? 'bg-sky-50/50 dark:bg-sky-950/20 border-sky-200/80 dark:border-sky-800/80'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Blue Audio Wave Indicator */}
                    <div className="flex items-center gap-0.5 shrink-0 px-1 py-1">
                      <span className="w-1 h-3.5 bg-[#1A73E8] rounded-full inline-block" />
                      <span className="w-1 h-5 bg-[#1A73E8] rounded-full inline-block" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate" title={src.name}>
                        {src.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {src.durationStr} • {src.sizeStr}
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={src.selected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-[#1A73E8] focus:ring-[#1A73E8] border-slate-300 dark:border-slate-600 shrink-0 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Cột Nguồn */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{selectedSourcesCount}/{sources.length} nguồn được chọn</span>
            <button
              onClick={() => handlePlayCitationAudio(0)}
              className="text-[#1A73E8] hover:underline font-medium flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-2.5 h-2.5 fill-[#1A73E8]" />
              <span>Nghe thử audio</span>
            </button>
          </div>
        </aside>
      ) : (
        /* Nút bung cột Nguồn khi đang thu gọn */
        <button
          onClick={() => setIsLeftCollapsed(false)}
          className="w-6 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          title="Mở rộng cột Nguồn"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* ======================================================================= */}
      {/* 💬 CỘT 2: KHU VỰC CHUYỂN ĐỔI CHI TIẾT & HỘI THOẠI (CENTER COLUMN) */}
      {/* ======================================================================= */}
      <main className="flex-1 min-w-0 h-full flex flex-col bg-white dark:bg-[#0B0F19] overflow-hidden relative">
        
        {/* THANH THAO TÁC SỔ GHI CHÚ */}
        <div className="h-11 px-4 sm:px-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 shrink-0 bg-white dark:bg-slate-900 select-none">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setExtraChatMessages([]);
                setCopiedToast('Đã khởi tạo Sổ ghi chú mới');
                setTimeout(() => setCopiedToast(null), 2500);
              }}
              className="px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs"
              title="Tạo sổ ghi chú mới"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Tạo sổ ghi chú</span>
            </button>
            <button
              onClick={() => handleCopyText(window.location.href)}
              className="px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs"
              title="Chia sẻ sổ ghi chú"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
          </div>
        </div>

        {/* VÙNG CUỘN HỘI THOẠI CHUYỂN ĐỔI */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-10 lg:px-16 py-6 space-y-6 no-scrollbar">
          
          {/* 1. ĐOẠN TIN NHẮN PHÍA TRÊN (PREVIOUS NOTE / SPEECH EXCERPT) */}
          <div className="max-w-3xl mx-auto space-y-2">
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
              ...mới chuyên môn, yêu cầu thực hiện công việc một cách triệt để, khoa học và đúng thời hạn nhằm hạn chế tối đa rủi ro pháp lý và sai sót hệ thống.
            </p>
            <div className="flex items-center gap-3 pt-1 text-slate-400 text-xs">
              <button
                onClick={() => handleSaveToNote('Yêu cầu thực hiện công việc triệt để, khoa học và đúng thời hạn...')}
                className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer font-medium"
              >
                <Pin className="w-3.5 h-3.5" />
                <span>Lưu vào ghi chú</span>
              </button>
              <button
                onClick={() => handleCopyText('Yêu cầu thực hiện công việc triệt để, khoa học và đúng thời hạn nhằm hạn chế tối đa rủi ro pháp lý và sai sót hệ thống.')}
                className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Sao chép"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLikedMap(prev => ({ ...prev, 'top-excerpt': 'up' }))}
                className={`hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer ${likedMap['top-excerpt'] === 'up' ? 'text-[#1A73E8]' : ''}`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLikedMap(prev => ({ ...prev, 'top-excerpt': 'down' }))}
                className={`hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer ${likedMap['top-excerpt'] === 'down' ? 'text-red-500' : ''}`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. DÒNG PHÂN CÁCH NGÀY THÁNG (DATE DIVIDER) */}
          <div className="text-center">
            <span className="text-[11.5px] font-medium text-slate-400 select-none">
              Chủ Nhật, 4 tháng 10
            </span>
          </div>

          {/* 3. TIN NHẮN NGƯỜI DÙNG YÊU CẦU CHUYỂN ĐỔI (USER BUBBLE TRÊN PHẢI) */}
          <div className="max-w-3xl mx-auto flex justify-end">
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-[13.5px] px-5 py-3 rounded-2xl max-w-xl shadow-2xs font-normal">
              Hãy chuyển đổi file trên thành văn bản, chi tiết nhất có thể.
            </div>
          </div>

          {/* 4. PHẢN HỒI AI CHUYỂN ĐỔI CHI TIẾT (EXACT GEMINI NOTEBOOKLM RESPONSE) */}
          <div className="max-w-3xl mx-auto space-y-4">
            
            {/* ACCORDION "THOUGHTS ⌄" COLLAPSIBLE */}
            <div>
              <button
                onClick={() => setIsThoughtsOpen(prev => !prev)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                <span>Thoughts</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isThoughtsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isThoughtsOpen && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 animate-fadeIn">
                  <p>• Đang phân tích file ghi âm "Record 2026-10-04 at 14h08m55s.mp3" (thời lượng 00:23)...</p>
                  <p>• Phân tách diễn giả (Diarization): Phát hiện Ban Điều Hành & Lãnh đạo chỉ đạo chuyên môn.</p>
                  <p>• Trích xuất trọng tâm: Hoạt động bảo mật cục bộ, quy chế kết nối và nguyên tắc độc lập giữa Điều lệ và Quy chế.</p>
                  <p>• Đính kèm các mốc trích dẫn âm thanh số [1], [2], [3] để người dùng có thể nghe kiểm chứng trực tiếp.</p>
                </div>
              )}
            </div>

            {/* NỘI DUNG VĂN BẢN CHUYỂN ĐỔI CẤU TRÚC HOÁ CHÍNH XÁC */}
            <div className="text-xs sm:text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-100 space-y-4">
              <p>
                Dưới đây là văn bản chuyển đổi chi tiết toàn bộ nội dung từ file ghi âm "Record 2026-10-04 at 14h08m55s.mp3", được tổng hợp và cấu trúc hóa theo các chủ đề, nghiệp vụ và phương án đã được thảo luận trong cuộc họp:
              </p>

              {/* PHẦN I */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs sm:text-[13px]">
                  I. NGUYÊN TẮC CHỈ ĐẠO VÀ BỐI CẢNH ĐẶC BIỆT
                </h3>
                
                <div className="space-y-2.5 pl-3">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">1. Mục đích bảo mật: </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Hoạt động bảo mật ở đây mang tính chất bảo mật cục bộ nhằm phục vụ các công việc trọng điểm trong tháng, không phải bảo mật phục vụ cho công tác hoạch định chiến lược chung{' '}
                    </span>
                    {/* Citation Pill 1 */}
                    <button
                      onClick={() => {
                        setActiveCitationPopover({
                          id: 1,
                          speaker: 'Lãnh đạo Ban Điều Hành (#K1)',
                          timeRange: '00:00 - 00:07',
                          quote: 'Ok chưa? Và trong điều lệ công ty thì hôm trước đã nói rồi, ở trong đó là nó chi tiết quá...',
                          startTime: 0
                        });
                        handlePlayCitationAudio(0);
                      }}
                      className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                      title="Bấm để nghe trích dẫn [1]"
                    >
                      1
                    </button>
                    {/* Citation Pill 2 */}
                    <button
                      onClick={() => {
                        setActiveCitationPopover({
                          id: 2,
                          speaker: 'Lãnh đạo Ban Điều Hành (#K1)',
                          timeRange: '00:07 - 00:13',
                          quote: 'Nhưng nhớ điều lệ và quy chế là hai thực thể hoàn toàn độc lập về mặt chuyên môn...',
                          startTime: 7
                        });
                        handlePlayCitationAudio(7);
                      }}
                      className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                      title="Bấm để nghe trích dẫn [2]"
                    >
                      2
                    </button>
                    <span>.</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">2. Quyền hạn kết nối trong bối cảnh đặc biệt:</span>
                    <div className="pl-4 space-y-1.5 mt-1 text-slate-700 dark:text-slate-300">
                      <div>
                        <span>• Do bối cảnh đặc biệt, Ban điều hành chỉ định trực tiếp cho phép kết nối trực tiếp với đối tác (được phép kết nối sai nguyên tắc thông thường){' '}</span>
                        <button
                          onClick={() => {
                            setActiveCitationPopover({
                              id: 1,
                              speaker: 'Lãnh đạo Ban Điều Hành (#K1)',
                              timeRange: '00:00 - 00:07',
                              quote: 'Chỉ đạo đặc biệt về kết nối và phân định ranh giới nghiệp vụ.',
                              startTime: 0
                            });
                            handlePlayCitationAudio(0);
                          }}
                          className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                        >
                          1
                        </button>
                        <button
                          onClick={() => {
                            setActiveCitationPopover({
                              id: 3,
                              speaker: 'Lãnh đạo Ban Điều Hành (#K1)',
                              timeRange: '00:15 - 00:23',
                              quote: 'Ok chưa? Đấy. Chứ còn vào có rất là nhiều cái, nhưng thôi chấp nhận...',
                              startTime: 15
                            });
                            handlePlayCitationAudio(15);
                          }}
                          className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                        >
                          3
                        </button>
                        <span>.</span>
                      </div>
                      <div>
                        <span>• </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">Nguyên tắc chuẩn thông thường: </span>
                        <span>Dứt khoát phải đi qua đầu mối 5.1 và hạ tầng kết nối của tháng 8{' '}</span>
                        <button
                          onClick={() => handlePlayCitationAudio(0)}
                          className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                        >
                          1
                        </button>
                        <span>.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PHẦN II */}
              <div className="space-y-2 pt-1">
                <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs sm:text-[13px]">
                  II. PHÂN ĐỊNH RANH GIỚI VÀ PHẠM VI ÁP DỤNG
                </h3>
                
                <div className="space-y-2 pl-3 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">1. Tách biệt Điều lệ và Quy chế: </span>
                    <span>
                      Điều lệ và Quy chế là hai thực thể hoàn toàn độc lập về mặt chuyên môn. Các chi tiết thuộc quy chế không được đưa thừa vào điều lệ công ty nhằm hạn chế tối đa rủi ro pháp lý{' '}
                    </span>
                    <button
                      onClick={() => handlePlayCitationAudio(7)}
                      className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                    >
                      2
                    </button>
                    <span>.</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">2. Bàn giao và nghiệm thu: </span>
                    <span>
                      Các bộ phận nghiệp vụ rà soát triệt để, chuẩn bị bản thảo hoàn thiện để bàn giao cho lãnh đạo phê duyệt đúng tiến độ{' '}
                    </span>
                    <button
                      onClick={() => handlePlayCitationAudio(15)}
                      className="inline-flex items-center justify-center px-1.5 py-0.2 mx-0.5 rounded text-[10.5px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer"
                    >
                      3
                    </button>
                    <span>.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS DƯỚI PHẢN HỒI AI */}
            <div className="flex items-center gap-3 pt-2 text-slate-400 text-xs border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleSaveToNote('Văn bản chuyển đổi chi tiết: Chiến lược bảo mật và ứng phó rủi ro...')}
                className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer font-medium"
              >
                <Pin className="w-3.5 h-3.5" />
                <span>Lưu vào ghi chú</span>
              </button>
              <button
                onClick={() => handleCopyText('Dưới đây là văn bản chuyển đổi chi tiết toàn bộ nội dung từ file ghi âm Record 2026-10-04 at 14h08m55s.mp3...')}
                className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Sao chép toàn bộ"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLikedMap(prev => ({ ...prev, 'main-response': 'up' }))}
                className={`hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer ${likedMap['main-response'] === 'up' ? 'text-[#1A73E8]' : ''}`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLikedMap(prev => ({ ...prev, 'main-response': 'down' }))}
                className={`hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer ${likedMap['main-response'] === 'down' ? 'text-red-500' : ''}`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* CÁC TIN NHẮN BỔ SUNG TRONG CUỘC HỘI THOẠI (NẾU CÓ) */}
          {extraChatMessages.map((msg) => (
            <div key={msg.id} className="max-w-3xl mx-auto space-y-2">
              {msg.sender === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-[13.5px] px-5 py-3 rounded-2xl max-w-xl shadow-2xs">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs sm:text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-100 whitespace-pre-line">
                    {msg.text}
                  </div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-400 font-medium">Trích dẫn:</span>
                      {msg.citations.map((c, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => handlePlayCitationAudio(c.timeSec)}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-[#1A73E8] border border-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Play className="w-2.5 h-2.5 fill-[#1A73E8]" />
                          <span>[{c.label}] {formatTime(c.timeSec)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 pt-1 text-slate-400 text-xs">
                    <button
                      onClick={() => handleSaveToNote(msg.text)}
                      className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer font-medium"
                    >
                      <Pin className="w-3.5 h-3.5" />
                      <span>Lưu vào ghi chú</span>
                    </button>
                    <button
                      onClick={() => handleCopyText(msg.text)}
                      className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isAiResponding && (
            <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-slate-400 animate-pulse">
              <Sparkles className="w-4 h-4 text-[#1A73E8] animate-spin" />
              <span>Gemini Notebook đang phân tích và chuyển đổi...</span>
            </div>
          )}

        </div>

        {/* ======================================================================= */}
        {/* THANH MINI AUDIO PLAYER NỔI KHI ĐANG PHÁT AUDIO HOẶC BẤM TRÍCH DẪN */}
        {/* ======================================================================= */}
        {activeCitationPopover && (
          <div className="mx-4 sm:mx-10 mb-2 p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 flex items-center justify-between gap-3 shadow-md animate-fadeIn">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-[#1A73E8] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                  <span>Trích dẫn [{activeCitationPopover.id}]: {activeCitationPopover.speaker}</span>
                  <span className="font-mono text-[11px] text-[#1A73E8]">({formatTime(currentPlayTime)} / {formatTime(audioDuration)})</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  "{activeCitationPopover.quote}"
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveCitationPopover(null);
                if (audioRef.current) audioRef.current.pause();
                setIsPlayingAudio(false);
              }}
              className="w-6 h-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* ======================================================================= */}
        {/* THANH NHẬP LIỆU CHAT NỔI Ở ĐÁY CỘT GIỮA (FLOATING CHAT INPUT BAR) */}
        {/* ======================================================================= */}
        <div className="p-4 sm:px-10 shrink-0 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-[#0B0F19] dark:via-[#0B0F19]/95">
          <div className="max-w-3xl mx-auto space-y-1.5">
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xs hover:border-slate-300 dark:hover:border-slate-600 transition-all px-4 py-2.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                placeholder="Đặt câu hỏi hoặc tạo nội dung"
                className="seamless-input flex-1 bg-transparent border-0 border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 shadow-none text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 pr-3"
                style={{ border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
              />

              <div className="flex items-center gap-2 shrink-0">
                {/* Số lượng nguồn: "2 nguồn" */}
                <span className="text-[11.5px] font-medium text-slate-500 dark:text-slate-400 select-none">
                  {selectedSourcesCount} nguồn
                </span>

                {/* Nút gửi mũi tên hướng lên ↑ */}
                <button
                  onClick={() => handleSendPrompt()}
                  disabled={!chatInput.trim()}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    chatInput.trim()
                      ? 'bg-[#1A73E8] text-white shadow-xs hover:bg-blue-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                  title="Gửi câu hỏi"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Disclaimer text */}
            <p className="text-[11px] text-center text-slate-400 select-none">
              Gemini Notebook có thể mắc sai sót nên bạn hãy xác minh các câu trả lời.
            </p>
          </div>
        </div>

      </main>

      {/* ======================================================================= */}
      {/* 🎨 CỘT 3: STUDIO (RIGHT COLUMN - ~340px) */}
      {/* ======================================================================= */}
      {!isRightCollapsed ? (
        <aside className="w-80 sm:w-96 flex-shrink-0 h-full border-l border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] flex flex-col z-10 transition-all">
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 no-scrollbar">
            
            {/* Promo Card: "Mới: Giờ đây, bạn có thể tạo Báo cáo tương tác!" */}
            {showPromoBanner && (
              <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base">📣</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-snug">
                    Mới: Giờ đây, bạn có thể tạo Báo cáo tương tác!
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setActiveStudioModal('report')}
                    className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-[11px] shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200/80"
                  >
                    Dùng thử
                  </button>
                  <button
                    onClick={() => setShowPromoBanner(false)}
                    className="w-6 h-6 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* LƯỚI 2 CỘT 9 CÔNG CỤ STUDIO TIÊN TIẾN (GRID 2 COLS) */}
            <div className="grid grid-cols-2 gap-2">
              {STUDIO_TOOLS.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveStudioModal(tool.id)}
                    className="group p-3 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-left flex items-start gap-2.5 cursor-pointer shadow-2xs hover:shadow-xs relative"
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 mt-0.5 ${tool.iconColor}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-100 group-hover:text-[#1A73E8] transition-colors leading-tight">
                          {tool.title}
                        </span>
                        {tool.badge && (
                          <span className="text-[9.5px] px-1.5 py-0.2 rounded-md font-extrabold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* KHỐI TRẠNG THÁI TRỐNG / GIỚI THIỆU ĐẦU RA STUDIO */}
            <div className="pt-6 pb-4 flex flex-col items-center justify-center text-center space-y-2 select-none">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#1A73E8] flex items-center justify-center">
                <Sparkles className="w-5 h-5 stroke-[2]" />
              </div>
              <p className="font-semibold text-xs text-slate-700 dark:text-slate-200">
                Đầu ra của Studio sẽ được lưu ở đây.
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                Sau khi thêm nguồn, hãy nhấp để thêm Tổng quan bằng âm thanh, Hướng dẫn học tập, Bản đồ tư duy và nhiều thông tin khác!
              </p>
            </div>

            {/* DANH SÁCH GHI CHÚ ĐÃ LƯU TRONG STUDIO */}
            {notesList.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Ghi chú đã lưu ({notesList.length})
                </p>
                {notesList.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
                    <p className="font-semibold text-xs text-slate-800 dark:text-slate-100">{note.title}</p>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{note.content}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{note.createdAt}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Nút + Thêm ghi chú cố định ở đáy Studio (hộp bo góc chuẩn rounded-xl, bỏ hình elip) */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowAddNoteModal(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Pin className="w-3.5 h-3.5" />
              <span>Thêm ghi chú</span>
            </button>
          </div>
        </aside>
      ) : (
        /* Nút bung cột Studio khi đang thu gọn */
        <button
          onClick={() => setIsRightCollapsed(false)}
          className="w-6 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          title="Mở rộng cột Studio"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
        </button>
      )}

      {/* ======================================================================= */}
      {/* 🚀 STUDIO TOOL INTERACTIVE MODALS */}
      {/* ======================================================================= */}
      
      {/* 1. Modal: Tổng quan bằng âm thanh (AI Deep Dive Podcast Player) */}
      {activeStudioModal === 'audio-overview' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Tổng quan bằng âm thanh (Audio Overview)</h3>
                  <p className="text-xs text-slate-400">Podcast AI chuyên sâu giữa 2 chuyên gia phân tích AVG One</p>
                </div>
              </div>
              <button onClick={() => setActiveStudioModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-purple-700 dark:text-purple-300">Tập 1: Giải mã Chiến lược Bảo mật & Pháp lý Công ty</span>
                <span className="font-mono text-purple-600">03:45</span>
              </div>
              
              {/* Fake Audio Waveform & Player */}
              <div className="h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center px-3 gap-1 overflow-hidden">
                {Array.from({ length: 48 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 bg-purple-400 rounded-full transition-all duration-300"
                    style={{ height: `${Math.max(4, Math.sin(i * 0.4) * 28 + (i % 3) * 6)}px` }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPodcastPlaying(prev => !prev)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {podcastPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{podcastPlaying ? 'Tạm dừng Podcast' : 'Nghe Podcast AI'}</span>
                </button>
                <span className="text-xs text-slate-500 font-mono">Tốc độ: 1.0x • Giọng đọc Studio HD</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 max-h-48 overflow-y-auto pr-1">
              <p><strong>Host 1 (Anh Tuấn):</strong> "Chào mừng bạn đến với Audio Overview. Hôm nay chúng ta cùng mổ xẻ nội dung ghi âm giao ban thực tế..."</p>
              <p><strong>Host 2 (Hải Yến):</strong> "Điểm đáng chú ý nhất là sự chỉ đạo kiên quyết của Lãnh đạo về việc phân tách bạch giữa Điều lệ và Quy chế..."</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Bản đồ tư duy (Mind Map) */}
      {activeStudioModal === 'mind-map' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Bản đồ tư duy (Mind Map)</h3>
              </div>
              <button onClick={() => setActiveStudioModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-xs text-slate-700 dark:text-slate-200">
              <div className="font-bold text-[#1A73E8]">● CHIẾN LƯỢC BẢO MẬT & QUẢN LÝ RỦI RO</div>
              <div className="pl-4 space-y-2">
                <div>├── [1] Bảo mật cục bộ (Phục vụ công việc trọng điểm tháng 10)</div>
                <div>├── [2] Quy chế kết nối đối tác</div>
                <div className="pl-6 text-slate-500">├── Ngoại lệ: Ban Điều Hành chỉ định trực tiếp</div>
                <div className="pl-6 text-slate-500">└── Chuẩn tắc: Qua đầu mối 5.1 & hạ tầng tháng 8</div>
                <div>└── [3] Pháp lý độc lập Điều lệ vs Quy chế</div>
                <div className="pl-6 text-slate-500">├── Không đưa chi tiết quy chế vào điều lệ</div>
                <div className="pl-6 text-slate-500">└── Bàn giao bản thảo nghiệm thu đúng hạn</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Báo cáo tương tác (Report) */}
      {activeStudioModal === 'report' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Báo cáo Điều hành (Executive Report)</h3>
              </div>
              <button onClick={() => setActiveStudioModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <p><strong>Ngày lập:</strong> 04/10/2026</p>
                <p><strong>Chủ trì:</strong> Lãnh đạo Ban Điều Hành (#K1)</p>
                <p><strong>Tệp nguồn:</strong> Record 2026-10-04 at 14h08m55s.mp3</p>
              </div>
              <p><strong>Tóm tắt trọng tâm:</strong> Cuộc họp xác lập cơ chế bảo mật cục bộ linh hoạt nhằm giải quyết kịp thời các đầu việc cấp bách, đồng thời siết chặt kỷ luật văn bản pháp lý giữa Điều lệ và Quy chế.</p>
              <p><strong>Các quyết định ban hành:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chấp thuận phương án phân định bước 1.</li>
                <li>Giao Ban Pháp chế và Thư ký rà soát loại bỏ các nội dung thừa trong điều lệ.</li>
                <li>Nghiệm thu bản thảo hoàn chỉnh vào chiều thứ Năm.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleCopyText('Báo cáo Điều hành: Chiến lược bảo mật và ứng phó rủi ro...')}
                className="px-4 py-2 rounded-xl bg-[#1A73E8] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép Báo cáo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Thẻ ghi nhớ (Flashcards) */}
      {activeStudioModal === 'flashcards' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Thẻ ghi nhớ (Flashcards)</h3>
              </div>
              <button onClick={() => setActiveStudioModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center space-y-3 min-h-[160px] flex flex-col justify-center">
              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase">Câu hỏi 1 / 3</p>
              <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Mục đích hoạt động bảo mật được chỉ đạo trong cuộc họp là gì?
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-2 border-t border-amber-200/60">
                Đáp án: Bảo mật mang tính chất cục bộ phục vụ công việc trọng điểm trong tháng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: Bài kiểm tra (Quiz) */}
      {activeStudioModal === 'quiz' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Bài kiểm tra (Quiz)</h3>
              </div>
              <button onClick={() => setActiveStudioModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">
                Theo chỉ đạo của Ban Điều Hành, Điều lệ và Quy chế có mối quan hệ như thế nào?
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => { setCopiedToast('Chính xác! 100 điểm'); setTimeout(() => setCopiedToast(null), 2000); }}
                  className="w-full p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-left font-medium text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  ✓ A. Là hai thực thể hoàn toàn độc lập về mặt chuyên môn
                </button>
                <button className="w-full p-3 rounded-xl border border-slate-200 text-left text-slate-600 hover:bg-slate-50 transition-colors">
                  B. Điều lệ bao hàm tất cả chi tiết của quy chế
                </button>
                <button className="w-full p-3 rounded-xl border border-slate-200 text-left text-slate-600 hover:bg-slate-50 transition-colors">
                  C. Quy chế thay thế hoàn toàn điều lệ công ty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Thêm nguồn âm thanh mới */}
      {showAddSourceModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Thêm nguồn vào Sổ ghi chú</h3>
              <button onClick={() => setShowAddSourceModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#1A73E8] text-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40">
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const newSrc: AudioSourceItem = {
                        id: `src-${Date.now()}`,
                        name: file.name,
                        durationStr: '00:23',
                        durationSec: 23,
                        audioUrl: '/audio/audio_k1_dh.mp3',
                        selected: true,
                        uploadedAt: new Date().toLocaleDateString('vi-VN'),
                        sizeStr: `${Math.round(file.size / 1024)} KB`
                      };
                      setSources(prev => [newSrc, ...prev]);
                      setShowAddSourceModal(false);
                      setCopiedToast(`Đã thêm nguồn: ${file.name}`);
                      setTimeout(() => setCopiedToast(null), 2500);
                    }
                  }}
                />
                <Mic className="w-6 h-6 mx-auto text-[#1A73E8] mb-1.5" />
                <p className="font-semibold text-xs text-slate-800 dark:text-slate-100">Tải tệp âm thanh lên (MP3, WAV, M4A)</p>
                <p className="text-[11px] text-slate-400">Hoặc kéo thả file vào đây</p>
              </label>

              <button
                onClick={() => {
                  const newSrc: AudioSourceItem = {
                    id: `src-${Date.now()}`,
                    name: `Ghi_am_${new Date().toLocaleTimeString('vi-VN').replace(/:/g, 'h')}.mp3`,
                    durationStr: '00:15',
                    durationSec: 15,
                    audioUrl: '/audio/audio_k1_dh.mp3',
                    selected: true,
                    uploadedAt: new Date().toLocaleDateString('vi-VN'),
                    sizeStr: '320 KB'
                  };
                  setSources(prev => [newSrc, ...prev]);
                  setShowAddSourceModal(false);
                  setCopiedToast('Đã thêm bản ghi âm mới vào nguồn!');
                  setTimeout(() => setCopiedToast(null), 2500);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RadioTower className="w-4 h-4 text-rose-500" />
                <span>Thu âm trực tiếp từ Micro</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Thêm ghi chú mới */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Thêm ghi chú mới</h3>
              <button onClick={() => setShowAddNoteModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={4}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Nhập nội dung ghi chú..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#1A73E8]"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (newNoteText.trim()) {
                    handleSaveToNote(newNoteText.trim());
                    setNewNoteText('');
                    setShowAddNoteModal(false);
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-blue-600 text-white font-semibold text-xs transition-colors"
              >
                Lưu ghi chú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast thông báo */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedToast}</span>
        </div>
      )}

    </div>
  );
};
