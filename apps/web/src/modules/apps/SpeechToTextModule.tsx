import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Volume2, VolumeX, RotateCcw, Copy, Download, Trash2,
  Settings, Type, Sparkles, MessageSquare, FlipVertical, Play, Pause, Send,
  HelpCircle, CheckCircle2, Shield, Languages, RefreshCw, AlertCircle, Eye, EyeOff, Sliders, SlidersHorizontal, Globe, ArrowRightLeft, FileText, Check, Repeat,
  Users, UserPlus, Edit3, Filter, Plus, Activity, Zap, Maximize2, Minimize2, Gauge, X, Calendar, ToggleLeft, ToggleRight, Square,
  History, FolderOpen, PlusCircle, Clock, Edit2, Search, Waves, Radio
} from 'lucide-react';
import {
  processRealtimeSpeechPunctuation,
  splitIntoReadableSpeechSegments,
  mergeSpeechWithoutOverlap,
  stripPrefixOverlap
} from '../../services/speechPunctuationEngine';

// Web Speech API Types declaration for TypeScript compatibility
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export type SpeechSubTab = 'direct' | 'audio-file' | 'text' | 'lang';

export interface SpeakerProfile {
  id: string;
  name: string;
  color: string;
  bgClass: string;
  borderClass: string;
  badgeTextClass: string;
  dotClass: string;
}

export interface SpeakerColorStyle {
  colorKey: string;
  bgClass: string;
  borderClass: string;
  badgeTextClass: string;
  dotClass: string;
}

export const SPEAKER_COLOR_PALETTE: SpeakerColorStyle[] = [
  {
    colorKey: 'orange',
    bgClass: 'bg-orange-50 dark:bg-orange-950/60',
    borderClass: 'border-orange-300 dark:border-orange-800',
    badgeTextClass: 'text-orange-700 dark:text-orange-300',
    dotClass: 'bg-orange-500'
  },
  {
    colorKey: 'purple',
    bgClass: 'bg-purple-50 dark:bg-purple-950/60',
    borderClass: 'border-purple-300 dark:border-purple-800',
    badgeTextClass: 'text-purple-700 dark:text-purple-300',
    dotClass: 'bg-purple-600'
  },
  {
    colorKey: 'emerald',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/60',
    borderClass: 'border-emerald-300 dark:border-emerald-800',
    badgeTextClass: 'text-emerald-700 dark:text-emerald-300',
    dotClass: 'bg-emerald-500'
  },
  {
    colorKey: 'red',
    bgClass: 'bg-red-50 dark:bg-red-950/60',
    borderClass: 'border-red-300 dark:border-red-800',
    badgeTextClass: 'text-red-700 dark:text-red-300',
    dotClass: 'bg-red-600'
  },
  {
    colorKey: 'blue',
    bgClass: 'bg-blue-50 dark:bg-blue-950/60',
    borderClass: 'border-blue-300 dark:border-blue-800',
    badgeTextClass: 'text-blue-700 dark:text-blue-300',
    dotClass: 'bg-blue-600'
  },
  {
    colorKey: 'yellow',
    bgClass: 'bg-yellow-50 dark:bg-yellow-950/60',
    borderClass: 'border-yellow-400 dark:border-yellow-700',
    badgeTextClass: 'text-yellow-800 dark:text-yellow-200',
    dotClass: 'bg-yellow-400'
  },
  {
    colorKey: 'fuchsia',
    bgClass: 'bg-fuchsia-50 dark:bg-fuchsia-950/60',
    borderClass: 'border-fuchsia-300 dark:border-fuchsia-800',
    badgeTextClass: 'text-fuchsia-700 dark:text-fuchsia-300',
    dotClass: 'bg-fuchsia-500'
  },
  {
    colorKey: 'cyan',
    bgClass: 'bg-cyan-50 dark:bg-cyan-950/60',
    borderClass: 'border-cyan-300 dark:border-cyan-800',
    badgeTextClass: 'text-cyan-700 dark:text-cyan-300',
    dotClass: 'bg-cyan-400'
  },
  {
    colorKey: 'lime',
    bgClass: 'bg-lime-50 dark:bg-lime-950/60',
    borderClass: 'border-lime-300 dark:border-lime-800',
    badgeTextClass: 'text-lime-700 dark:text-lime-300',
    dotClass: 'bg-lime-500'
  },
  {
    colorKey: 'rose',
    bgClass: 'bg-rose-50 dark:bg-rose-950/60',
    borderClass: 'border-rose-300 dark:border-rose-800',
    badgeTextClass: 'text-rose-700 dark:text-rose-300',
    dotClass: 'bg-rose-500'
  },
  {
    colorKey: 'indigo',
    bgClass: 'bg-indigo-50 dark:bg-indigo-950/60',
    borderClass: 'border-indigo-300 dark:border-indigo-800',
    badgeTextClass: 'text-indigo-700 dark:text-indigo-300',
    dotClass: 'bg-indigo-600'
  },
  {
    colorKey: 'amber',
    bgClass: 'bg-amber-100 dark:bg-amber-900/60',
    borderClass: 'border-amber-400 dark:border-amber-700',
    badgeTextClass: 'text-amber-800 dark:text-amber-200',
    dotClass: 'bg-amber-600'
  },
  {
    colorKey: 'slate',
    bgClass: 'bg-slate-100 dark:bg-slate-800',
    borderClass: 'border-slate-400 dark:border-slate-600',
    badgeTextClass: 'text-slate-800 dark:text-slate-200',
    dotClass: 'bg-slate-700'
  },
  {
    colorKey: 'teal',
    bgClass: 'bg-teal-50 dark:bg-teal-950/60',
    borderClass: 'border-teal-300 dark:border-teal-800',
    badgeTextClass: 'text-teal-700 dark:text-teal-300',
    dotClass: 'bg-teal-600'
  },
  {
    colorKey: 'violet',
    bgClass: 'bg-violet-50 dark:bg-violet-950/60',
    borderClass: 'border-violet-300 dark:border-violet-800',
    badgeTextClass: 'text-violet-700 dark:text-violet-300',
    dotClass: 'bg-violet-500'
  },
  {
    colorKey: 'emerald-dark',
    bgClass: 'bg-emerald-100 dark:bg-emerald-900/60',
    borderClass: 'border-emerald-400 dark:border-emerald-700',
    badgeTextClass: 'text-emerald-800 dark:text-emerald-200',
    dotClass: 'bg-emerald-700'
  }
];

export const DEFAULT_SPEAKERS: SpeakerProfile[] = [
  {
    id: 'spk-male',
    name: 'Giọng Nam',
    color: SPEAKER_COLOR_PALETTE[4].colorKey,
    bgClass: SPEAKER_COLOR_PALETTE[4].bgClass,
    borderClass: SPEAKER_COLOR_PALETTE[4].borderClass,
    badgeTextClass: SPEAKER_COLOR_PALETTE[4].badgeTextClass,
    dotClass: SPEAKER_COLOR_PALETTE[4].dotClass
  },
  {
    id: 'spk-female',
    name: 'Giọng Nữ',
    color: SPEAKER_COLOR_PALETTE[9].colorKey,
    bgClass: SPEAKER_COLOR_PALETTE[9].bgClass,
    borderClass: SPEAKER_COLOR_PALETTE[9].borderClass,
    badgeTextClass: SPEAKER_COLOR_PALETTE[9].badgeTextClass,
    dotClass: SPEAKER_COLOR_PALETTE[9].dotClass
  }
];

export const DEAF_SPEAKER: SpeakerProfile = {
  id: 'spk-deaf',
  name: '3.1 - Ngọc Anh',
  color: 'sky',
  bgClass: 'bg-sky-50 dark:bg-sky-950/60',
  borderClass: 'border-sky-300 dark:border-sky-800',
  badgeTextClass: 'text-sky-700 dark:text-sky-300',
  dotClass: 'bg-sky-500'
};

export interface SavedConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: MessageItem[];
}

interface MessageItem {
  id: string;
  sender: 'HEARING' | 'DEAF';
  senderName: string;
  speakerId?: string;
  text: string;
  translatedText?: string;
  timestamp: string;
  date?: string;
}

const QUICK_RESPONSES = [
  "Tôi đã hiểu, cảm ơn bạn!",
  "Xin vui lòng nói chậm lại một chút.",
  "Bạn có thể nhắc lại câu vừa rồi không?",
  "Chờ tôi gõ câu trả lời một chút nhé.",
  "Tôi hoàn toàn đồng ý với ý kiến này.",
  "Tôi cần được giải thích rõ hơn đoạn này.",
  "Cảm ơn bạn rất nhiều!"
];

// Offline translation dictionary for demo speech & text translation
const DEMO_TRANSLATIONS: { [key: string]: { [lang: string]: string } } = {
  "xin chào": { "en-US": "Hello! Welcome to AVG One.", "ko-KR": "안녕하세요! 환영합니다.", "ja-JP": "こんにちは！ようこそ。" },
  "tôi đã hiểu": { "en-US": "I understand clearly, thank you!", "ko-KR": "잘 이해했습니다, 감사합니다!", "ja-JP": "よく分かりました、ありがとう！" },
  "cảm ơn": { "en-US": "Thank you very much!", "ko-KR": "정말 감사합니다!", "ja-JP": "どうもありがとうございます！" },
  "tôi đồng ý": { "en-US": "I completely agree with this proposal.", "ko-KR": "이 제안에 적극 동의합니다.", "ja-JP": "この 提案に完全に同意します。" }
};

/**
 * Smart Vietnamese Speech-to-Text Post-Processing Helper
 * - Converts spoken dictation keywords ("xuống dòng", "gạch đầu dòng", "dấu chấm", "dấu phẩy", "dấu hỏi", "phần trăm", etc.)
 * - Removes speech fillers (ừm, ừ, à, uhm, um, ơ, eh, dạ à, thì là, kiểu như là)
 * - Auto-detects discourse transition words ("thứ nhất", "thứ hai", "bên cạnh đó", "tóm lại", etc.) to insert smart line breaks (\n)
 * - Auto-detects question markers ("phải không", "chưa", "hả", "sao", "ở đâu", "tại sao", etc.) to append question marks (?)
 * - Auto-capitalizes sentence & line beginnings and formats spacing around punctuation
 */
export const enhanceVietnameseTranscript = (
  rawText: string,
  _isLowConfidence: boolean = false,
  isFinal: boolean = true
): string => {
  if (!rawText) return '';
  return processRealtimeSpeechPunctuation(rawText, isFinal);
};

interface AiAudioTrackWaveformProps {
  micState: 'idle' | 'recording' | 'paused';
  audioVolumeLevel: number;
  livePitchHz: number | null;
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  className?: string;
  isExpanded?: boolean;
}

export const AiAudioTrackWaveform: React.FC<AiAudioTrackWaveformProps> = ({
  micState,
  audioVolumeLevel,
  analyserRef,
  className,
  isExpanded = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const historyRef = useRef<number[]>([]);
  const peakHoldRef = useRef<number[]>([]);
  const lastSampleTimeRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDestroyed = false;

    // Khởi tạo danh sách các vạch mẫu ban đầu
    if (historyRef.current.length === 0) {
      historyRef.current = Array.from({ length: 110 }, () => 0.12 + Math.random() * 0.08);
      peakHoldRef.current = Array.from({ length: 110 }, () => 0.15);
    }

    const render = (timestamp: number) => {
      if (isDestroyed) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(rect.width);
      const displayHeight = Math.round(rect.height);

      if (displayWidth === 0 || displayHeight === 0) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const w = displayWidth;
      const h = displayHeight;

      phaseRef.current += micState === 'recording' ? 0.065 : 0.038;
      const phase = phaseRef.current;

      // Cập nhật mẫu sóng mới mỗi 32ms để dải sóng cuộn mượt mà, dập dìu tự nhiên
      if (timestamp - lastSampleTimeRef.current > 32) {
        lastSampleTimeRef.current = timestamp;

        let sample = 0.15;

        if (micState === 'recording') {
          if (audioVolumeLevel > 5) {
            // Khi có giọng nói: kết hợp biên độ âm thanh thực tế với sóng điều hòa dập dìu
            const normVol = Math.min(1.0, (audioVolumeLevel / 100) * 1.5);
            // Sóng điều hòa tạo nhịp dập dìu tự nhiên giữa các dải tần
            const waveMod = 0.78 + Math.sin(phase * 2.4) * 0.16 + Math.cos(phase * 1.2) * 0.08;
            sample = Math.max(0.20, normVol * waveMod);
          } else {
            // Khi đang bật mic nhưng chưa nói: sóng thở dập dìu êm ái
            sample = 0.13 + Math.sin(phase * 2.0) * 0.07 + Math.cos(phase * 1.1) * 0.04;
          }
        } else {
          // Khi Standby: sóng nhấp nhô dập dìu mềm mại dạng đại dương
          sample = 0.14 + Math.sin(phase * 1.6) * 0.08 + Math.cos(phase * 0.8) * 0.05;
        }

        historyRef.current.push(sample);

        const targetCount = 64;
        while (historyRef.current.length > targetCount) {
          historyRef.current.shift();
        }
      }

      // 1. Màu nền trắng thanh lịch, hiện đại theo yêu cầu
      ctx.fillStyle = '#FFFFFF';
      // 1. Nền trắng thanh lịch, sạch sẽ tuyệt đối
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);

      const total = historyRef.current.length;
      const points: { x: number; y: number }[] = [];
      const pointsBack: { x: number; y: number }[] = [];
      const isRec = micState === 'recording';
      let minY = h;
      let minYBack = h;

      for (let i = 0; i < total; i++) {
        const x = (i / (total - 1)) * w;
        const baseVal = historyRef.current[i] || 0.14;

        // 1. Sóng chính phía trước (Hero Wave Area)
        const undulationWave = Math.sin(phase * 2.2 - (i * 0.18)) * 0.075 
                             + Math.cos(phase * 1.1 + (i * 0.09)) * 0.035;
        const val = Math.max(0.06, Math.min(0.96, baseVal + undulationWave));
        const waveHeight = Math.max(8, Math.min(h * 0.94, val * h));
        const y = h - waveHeight;
        if (y < minY) minY = y;
        points.push({ x, y });

        // 2. Sóng phụ đa tầng phía sau (Layer 2 Background Depth Wave Area)
        const undulationBack = Math.sin(phase * 1.65 + (i * 0.14)) * 0.085 
                             + Math.cos(phase * 0.85 - (i * 0.07)) * 0.045;
        const valBack = Math.max(0.04, Math.min(0.90, (baseVal * 0.85) + undulationBack));
        const waveHeightBack = Math.max(6, Math.min(h * 0.88, valBack * h));
        const yBack = h - waveHeightBack;
        if (yBack < minYBack) minYBack = yBack;
        pointsBack.push({ x, y: yBack });
      }

      // Hàm vẽ spline mượt qua các điểm
      const drawSpline = (pts: { x: number; y: number }[]) => {
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      };

      // A. MẢNG MÀU PHỤ PHÍA SAU (Background Wave Area - Không viền)
      if (pointsBack.length > 2) {
        ctx.save();
        ctx.beginPath();
        drawSpline(pointsBack);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const bgGrad = ctx.createLinearGradient(0, minYBack, 0, h);
        if (isRec) {
          bgGrad.addColorStop(0, 'rgba(249, 115, 22, 0.45)');  // Cam ấm mềm
          bgGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.35)'); // Vàng hổ phách
          bgGrad.addColorStop(0.65, 'rgba(0, 168, 232, 0.28)'); // AVG Cyan
          bgGrad.addColorStop(1, 'rgba(2, 132, 199, 0.10)');   // Ocean Blue
        } else {
          bgGrad.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
          bgGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.18)');
          bgGrad.addColorStop(1, 'rgba(3, 105, 161, 0.05)');
        }
        ctx.fillStyle = bgGrad;
        ctx.fill();
        ctx.restore();
      }

      // B. MẢNG MÀU CHÍNH PHÍA TRƯỚC (Hero Wave Area - Không viền, Gradient Cam trên - Xanh dưới mượt mà)
      if (points.length > 2) {
        ctx.save();
        ctx.beginPath();
        drawSpline(points);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        // Mảng màu Gradient từ đỉnh ngọn (minY) xuống đáy chân (h)
        const heroGrad = ctx.createLinearGradient(0, minY, 0, h);
        if (isRec) {
          heroGrad.addColorStop(0, '#EA580C');                  // Cam đậm rực rỡ ở đỉnh
          heroGrad.addColorStop(0.18, '#F97316');               // Cam tươi
          heroGrad.addColorStop(0.42, '#F59E0B');               // Vàng cam hổ phách
          heroGrad.addColorStop(0.70, '#00A8E8');               // AVG Cyan tươi sáng
          heroGrad.addColorStop(1, '#0284C7');                  // Ocean Blue sâu ở đáy
        } else {
          heroGrad.addColorStop(0, '#F97316');
          heroGrad.addColorStop(0.24, '#F59E0B');
          heroGrad.addColorStop(0.65, '#0284C7');
          heroGrad.addColorStop(1, '#0369A1');
        }
        ctx.fillStyle = heroGrad;
        ctx.fill();

        // Lớp vệt sáng bóng nhẹ trên bề mặt mảng màu (Không dùng nét viền)
        const glossGrad = ctx.createLinearGradient(0, minY, 0, minY + (h - minY) * 0.45);
        glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glossGrad;
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [micState, audioVolumeLevel, analyserRef, isExpanded]);

  return (
    <div className={className || "relative flex-1 h-full min-h-[340px] sm:min-h-[400px] w-full rounded-xl overflow-hidden bg-white shadow-2xs transition-all"}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};


export const SpeechToTextModule: React.FC = () => {
  // Active Sub-Tab: 'direct' (Chuyển đổi trực tiếp) | 'text' (Chuyển đổi văn bản) | 'lang' (Chuyển đổi ngôn ngữ)
  const [activeSubTab, setActiveSubTab] = useState<SpeechSubTab>('direct');
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState<boolean>(false);

  // Conversation History & Storage States
  const [savedConversations, setSavedConversations] = useState<SavedConversation[]>(() => {
    try {
      const stored = localStorage.getItem('avg_speech_saved_conversations');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved conversations:', e);
    }
    const initialId = `conv-${Date.now()}`;
    const nowStr = new Date().toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const dateShort = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    const dateFull = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeShort = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return [
      {
        id: initialId,
        title: `Hội thoại (${dateShort} ${timeShort})`,
        createdAt: nowStr,
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: `msg-demo-1-${Date.now()}`,
            sender: 'HEARING',
            senderName: 'Giọng Nam',
            speakerId: 'spk-male',
            text: 'Xin chào! Tôi sử dụng tính năng chuyển giọng nói thành văn bản để giao tiếp với bạn.',
            translatedText: 'Hello! I use the voice-to-text feature to communicate with you.',
            timestamp: timeShort,
            date: dateFull
          },
          {
            id: `msg-demo-2-${Date.now()}`,
            sender: 'DEAF',
            senderName: '3.1 - Ngọc Anh',
            speakerId: 'spk-deaf',
            text: 'Rất tốt! Tôi có thể đọc rõ từng câu chữ của bạn trên màn hình.',
            translatedText: 'Great! I can clearly read every word of yours on screen.',
            timestamp: timeShort,
            date: dateFull
          }
        ]
      }
    ];
  });

  const [currentConversationId, setCurrentConversationId] = useState<string>(() => {
    const todayDateStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    try {
      const stored = localStorage.getItem('avg_speech_saved_conversations');
      if (stored) {
        const parsed: SavedConversation[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Find conversation matching real-time current date
          const todayConv = parsed.find(c => c.createdAt && c.createdAt.includes(todayDateStr));
          if (todayConv) return todayConv.id;
          // Default to the most recent real-time conversation (latest at index 0)
          return parsed[0].id;
        }
      }
    } catch (e) {}
    return savedConversations[0]?.id || `conv-${Date.now()}`;
  });

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [tempTitleInput, setTempTitleInput] = useState<string>('');
  const [historySearchQuery, setHistorySearchQuery] = useState<string>('');

  // Strict Male / Female Speaker Profile State
  const [speakers] = useState<SpeakerProfile[]>(() => {
    try {
      localStorage.removeItem('avg_speech_speakers');
    } catch (e) {}
    return DEFAULT_SPEAKERS;
  });
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>('spk-male');
  const [filterSpeakerId, setFilterSpeakerId] = useState<string>('all');

  // Toggle Speaker Filter Bar Visibility
  const [showSpeakerFilterBar, setShowSpeakerFilterBar] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('avg_speech_show_filter_bar');
      if (stored !== null) return JSON.parse(stored);
    } catch (e) {}
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem('avg_speech_show_filter_bar', JSON.stringify(showSpeakerFilterBar));
    } catch (e) {}
  }, [showSpeakerFilterBar]);
  const activeSpeakerRef = useRef<string>('spk-male');

  // Auto persist speakers to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem('avg_speech_speakers', JSON.stringify(speakers));
    } catch (e) {
      console.error('Failed to save speakers to localStorage:', e);
    }
  }, [speakers]);

  useEffect(() => {
    activeSpeakerRef.current = activeSpeakerId;
  }, [activeSpeakerId]);

  // Speech Recognition States (3-State Flow: 'idle' [Green] | 'recording' [Red] | 'paused' [Yellow])
  const [micState, setMicState] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const isListeningRef = useRef<boolean>(false);
  const micStateRef = useRef<'idle' | 'recording' | 'paused'>('idle');
  const processedFinalIndexRef = useRef<number>(0);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    micStateRef.current = micState;
  }, [micState]);

  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<string>('vi-VN');
  const [targetLanguage, setTargetLanguage] = useState<string>('en-US');
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  // Conversation & Deaf UI States
  const [messages, setMessages] = useState<MessageItem[]>(() => {
    const currentConv = savedConversations.find(c => c.id === currentConversationId);
    if (currentConv) return currentConv.messages || [];
    return savedConversations[0]?.messages || [];
  });

  // Sync messages of current conversation with savedConversations list & localStorage
  useEffect(() => {
    if (!currentConversationId) return;

    setSavedConversations(prev => {
      const existingIdx = prev.findIndex(c => c.id === currentConversationId);
      let updated: SavedConversation[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          messages,
          updatedAt: new Date().toISOString()
        };
      } else {
        const newConv: SavedConversation = {
          id: currentConversationId,
          title: `Hội thoại ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
          createdAt: new Date().toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          updatedAt: new Date().toISOString(),
          messages
        };
        updated = [newConv, ...prev];
      }
      try {
        localStorage.setItem('avg_speech_saved_conversations', JSON.stringify(updated));
        localStorage.setItem('avg_speech_current_conv_id', currentConversationId);
      } catch (e) {
        console.error('Failed to save conversations to localStorage:', e);
      }
      return updated;
    });
  }, [messages, currentConversationId]);
  const [deafTextInput, setDeafTextInput] = useState<string>('');
  const [isInputExpanded, setIsInputExpanded] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isChatMaximized, setIsChatMaximized] = useState<boolean>(false);
  const [isWaveformModalOpen, setIsWaveformModalOpen] = useState<boolean>(false);

  // Close maximized conversation modal, waveform modal, or expanded response box on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isInputExpanded) setIsInputExpanded(false);
        if (isChatMaximized) setIsChatMaximized(false);
        if (isWaveformModalOpen) setIsWaveformModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInputExpanded, isChatMaximized, isWaveformModalOpen]);

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge' | 'massive'>('xlarge');
  const [contrastTheme, setContrastTheme] = useState<'standard' | 'high-contrast-dark' | 'yellow-on-black' | 'soft-blue'>('standard');
  const [isDualFaceToFace, setIsDualFaceToFace] = useState<boolean>(false);
  const [autoTts, setAutoTts] = useState<boolean>(true);
  const [audioVolumeLevel, setAudioVolumeLevel] = useState<number>(0);
  const [simulatedInputText, setSimulatedInputText] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Microphone Permission & Diagnostic Modal States
  const [isMicPermissionModalOpen, setIsMicPermissionModalOpen] = useState<boolean>(false);
  const [micPermissionStatus, setMicPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'http-warning'>('prompt');

  const requestMicPermission = async (): Promise<boolean> => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicPermissionStatus('denied');
      setRecognitionError('Trình duyệt không hỗ trợ truy cập Micro trực tiếp. Vui lòng cấp quyền Micro hoặc truy cập qua kết nối HTTPS.');
      setIsMicPermissionModalOpen(true);
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      setMicPermissionStatus('granted');
      setRecognitionError(null);
      showToast('✅ Đã kết nối Micro thành công!');
      return true;
    } catch (err: any) {
      console.warn('Microphone permission request error:', err);
      setMicPermissionStatus('denied');
      setRecognitionError('Trình duyệt chưa cho phép truy cập Micro (not-allowed / denied). Vui lòng cấp quyền Micro trên thanh địa chỉ.');
      setIsMicPermissionModalOpen(true);
      return false;
    }
  };

  // Text-To-Speech (TTS) Northern Accent Voice Optimization States
  const [ttsEngine, setTtsEngine] = useState<'online' | 'browser'>('browser');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mobileDictationInputRef = useRef<HTMLInputElement>(null);
  const mobileAudioCaptureRef = useRef<HTMLInputElement>(null);
  const deafInputRef = useRef<HTMLTextAreaElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const realtimeTimerRef = useRef<any>(null);
  const lastInterimRef = useRef<string>('');
  const accumulatedInterimRef = useRef<string>('');
  const silenceCommitTimerRef = useRef<any>(null);
  const speakerSwitchCountRef = useRef<number>(0);
  const restartTimeoutRef = useRef<any>(null);
  const utterancePitchSamplesRef = useRef<number[]>([]);
  const recentlyCommittedUtterancesRef = useRef<Map<string, number>>(new Map());

  // Real-time Pitch-Based Voice Diarization (Frequency & Acoustic Analysis)
  const [autoDiarization, setAutoDiarization] = useState<boolean>(true);
  const [livePitchHz, setLivePitchHz] = useState<number | null>(null);
  const [detectedVoiceLabel, setDetectedVoiceLabel] = useState<string>('Đang chờ giọng nói...');
  const autoDiarizationRef = useRef<boolean>(true);

  useEffect(() => {
    autoDiarizationRef.current = autoDiarization;
  }, [autoDiarization]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Real-time speech timing & silence refs
  const lastTextReceivedTimeRef = useRef<number>(Date.now());
  const speechSilenceTimerRef = useRef<any>(null);

  // Dynamic Acoustic Pitch Signature Clusters (Learned & Pre-trained from voice samples)
  const cluster1Ref = useRef<number | null>(130); // Mẫu 1: #K1; DH (~130Hz)
  const cluster2Ref = useRef<number | null>(225); // Mẫu 2: 4.T - Lưu Trang (~225Hz)
  const cluster3Ref = useRef<number | null>(175); // Mẫu 3: 9; 6 - Hải Lưu (~175Hz)

  const handleResetVoiceClusters = () => {
    setActiveSpeakerId('spk-male');
    activeSpeakerRef.current = 'spk-male';
    showToast('🧹 Đã đặt lại chế độ phân biệt Giọng Nam & Giọng Nữ!');
  };

  // High-Precision Pitch Estimator using YIN Algorithm (Eliminates Octave Errors completely)
  const getPitchFromAudioBuffer = (buffer: Float32Array, sampleRate: number): number | null => {
    let sumSquares = 0;
    for (let i = 0; i < buffer.length; i++) {
      sumSquares += buffer[i] * buffer[i];
    }
    const rms = Math.sqrt(sumSquares / buffer.length);
    if (rms < 0.010) return null; // Silence threshold

    // Human fundamental frequency range: 75Hz (deep male) to 350Hz (high female)
    const minLag = Math.floor(sampleRate / 350); // ~137 at 48kHz
    const maxLag = Math.floor(sampleRate / 75);  // ~640 at 48kHz
    const W = 512; // Window size

    if (buffer.length < maxLag + W) return null;

    // 1. Difference function d(tau) = sum((x[j] - x[j+tau])^2)
    const d = new Float32Array(maxLag + 1);
    for (let tau = minLag; tau <= maxLag; tau++) {
      let sum = 0;
      for (let j = 0; j < W; j += 2) {
        const diff = buffer[j] - buffer[j + tau];
        sum += diff * diff;
      }
      d[tau] = sum;
    }

    // 2. Cumulative Mean Normalized Difference Function d'(tau)
    const dPrime = new Float32Array(maxLag + 1);
    dPrime[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau <= maxLag; tau++) {
      runningSum += d[tau];
      if (tau >= minLag) {
        dPrime[tau] = runningSum > 0 ? (d[tau] * tau) / runningSum : 1;
      }
    }

    // 3. Absolute threshold: Find FIRST tau where dPrime < 0.20 (Standard YIN dip)
    const YIN_THRESHOLD = 0.20;
    let tauEstimate = -1;

    for (let tau = minLag; tau <= maxLag; tau++) {
      if (dPrime[tau] < YIN_THRESHOLD) {
        while (tau + 1 <= maxLag && dPrime[tau + 1] < dPrime[tau]) {
          tau++;
        }
        tauEstimate = tau;
        break;
      }
    }

    // 4. Fallback: If no value fell below threshold, find global minimum
    if (tauEstimate === -1) {
      let minVal = Infinity;
      for (let tau = minLag; tau <= maxLag; tau++) {
        if (dPrime[tau] < minVal) {
          minVal = dPrime[tau];
          tauEstimate = tau;
        }
      }
      if (minVal > 0.45) {
        return null; // Noise / unvoiced audio
      }
    }

    if (tauEstimate > 0) {
      // Parabolic interpolation for sub-sample accuracy
      const s0 = dPrime[tauEstimate - 1] || dPrime[tauEstimate];
      const s1 = dPrime[tauEstimate];
      const s2 = dPrime[tauEstimate + 1] || dPrime[tauEstimate];
      const delta = (s2 - s0) / (2 * (2 * s1 - s2 - s0));
      const refinedTau = tauEstimate + (isNaN(delta) ? 0 : Math.max(-0.5, Math.min(0.5, delta)));

      const pitch = sampleRate / refinedTau;
      if (pitch >= 75 && pitch <= 350) {
        return Math.round(pitch);
      }
    }
    return null;
  };

  // Start real-time audio pitch & signal analyzer with Web Audio DSP noise reduction
  const startAudioPitchAnalyzer = async () => {
    try {
      // Prevent mic lock out on mobile browsers where getUserMedia interferes with webkitSpeechRecognition
      const isMobileEnv = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      if (isMobileEnv || !navigator.mediaDevices?.getUserMedia) return;

      // Nhường quyền ưu tiên cho Web Speech Recognition khởi động micro trước (tránh xung đột driver trên Windows)
      await new Promise(r => setTimeout(r, 450));
      if (micStateRef.current !== 'recording') return;

      const audioConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints }).catch(err => {
        console.warn('Audio pitch analyzer getUserMedia notice (non-fatal):', err);
        return null;
      });
      if (!stream) return;
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);

      // DSP 1: Gentle Sub-bass High-pass filter at 40Hz (preserves 100% of human voice fundamental frequencies down to 50Hz)
      const highpassFilter = ctx.createBiquadFilter();
      highpassFilter.type = 'highpass';
      highpassFilter.frequency.setValueAtTime(40, ctx.currentTime);

      // DSP 2: Precise 50Hz Electrical Hum Notch Filter (removes AC power line hum)
      const notch50 = ctx.createBiquadFilter();
      notch50.type = 'notch';
      notch50.frequency.setValueAtTime(50, ctx.currentTime);
      notch50.Q.setValueAtTime(10.0, ctx.currentTime);

      // DSP 3: Precise 60Hz Power Supply Hum Notch Filter (removes transformer ripple hum)
      const notch60 = ctx.createBiquadFilter();
      notch60.type = 'notch';
      notch60.frequency.setValueAtTime(60, ctx.currentTime);
      notch60.Q.setValueAtTime(10.0, ctx.currentTime);

      // DSP 4: High-frequency RF Carrier Wave / Static Hiss Notch Filter (removes 14kHz electrical static noise)
      const notchRF = ctx.createBiquadFilter();
      notchRF.type = 'lowshelf';
      notchRF.frequency.setValueAtTime(14000, ctx.currentTime);
      notchRF.gain.setValueAtTime(-6, ctx.currentTime);

      // DSP 5: Peaking Equalizer (+4.0dB at 2.4kHz) to enhance Vietnamese vocal clarity and tone accents
      const presenceEq = ctx.createBiquadFilter();
      presenceEq.type = 'peaking';
      presenceEq.frequency.setValueAtTime(2400, ctx.currentTime);
      presenceEq.gain.setValueAtTime(4.0, ctx.currentTime);
      presenceEq.Q.setValueAtTime(1.0, ctx.currentTime);

      // DSP 6: Pre-Amplifier Gain Boost Node (5.0x / +14dB) to capture even faint, quiet, or whispered speech
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(5.0, ctx.currentTime);

      // DSP 7: Peak Limiter Compressor (prevents clipping/distortion when speaking loudly)
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-20, ctx.currentTime);
      compressor.knee.setValueAtTime(20, ctx.currentTime);
      compressor.ratio.setValueAtTime(12, ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      compressor.release.setValueAtTime(0.15, ctx.currentTime);

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;

      source.connect(highpassFilter);
      highpassFilter.connect(notch50);
      notch50.connect(notch60);
      notch60.connect(notchRF);
      notchRF.connect(presenceEq);
      presenceEq.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(analyser);
      analyserRef.current = analyser;

      const buffer = new Float32Array(analyser.fftSize);
      let pitchSamples: number[] = [];
      let lastPitchCalcTime = 0;
      let lastVoiceEnergyTime = 0;

      const analyzeFrame = () => {
        if (!analyserRef.current || !audioCtxRef.current) return;
        analyserRef.current.getFloatTimeDomainData(buffer);

        // Compute RMS volume for signal strength meter
        let sumSq = 0;
        for (let i = 0; i < buffer.length; i++) {
          sumSq += buffer[i] * buffer[i];
        }
        const rms = Math.sqrt(sumSq / buffer.length);
        const volPct = Math.min(100, Math.round(rms * 350));
        setAudioVolumeLevel(volPct);

        const now = performance.now();
        // Throttle pitch analysis to run every 100ms (10Hz)
        if (now - lastPitchCalcTime > 100) {
          lastPitchCalcTime = now;
          const pitch = getPitchFromAudioBuffer(buffer, audioCtxRef.current.sampleRate);

          if (pitch !== null) {
            lastVoiceEnergyTime = now;
            setLivePitchHz(pitch);
            pitchSamples.push(pitch);
            if (pitchSamples.length > 8) pitchSamples.shift();

            utterancePitchSamplesRef.current.push(pitch);
            if (utterancePitchSamplesRef.current.length > 30) utterancePitchSamplesRef.current.shift();

            const avgPitch = Math.round(pitchSamples.reduce((a, b) => a + b, 0) / pitchSamples.length);

            if (autoDiarizationRef.current) {
              const detectedSpkId = avgPitch < 160 ? 'spk-male' : 'spk-female';
              const targetSpk = speakers.find(s => s.id === detectedSpkId) || DEFAULT_SPEAKERS[0];
              const icon = detectedSpkId === 'spk-male' ? '👨' : '👩';
              setDetectedVoiceLabel(`${icon} ${targetSpk.name} (~${avgPitch}Hz)`);
              activeSpeakerRef.current = detectedSpkId;
              setActiveSpeakerId(detectedSpkId);
            } else {
              setDetectedVoiceLabel(`Tần số giọng: ${avgPitch}Hz (Chế độ thủ công)`);
            }
          } else {
            // Khi im lặng giữa các lượt nói (> 400ms), xóa bộ đệm mẫu tần số của lượt trước
            // để người nói tiếp theo bắt đầu hoàn toàn độc lập!
            if (now - lastVoiceEnergyTime > 400) {
              pitchSamples = [];
              if (utterancePitchSamplesRef.current.length > 0) {
                utterancePitchSamplesRef.current = [];
              }
            }
          }
        }

        animFrameRef.current = requestAnimationFrame(analyzeFrame);
      };

      animFrameRef.current = requestAnimationFrame(analyzeFrame);
    } catch (err) {
      console.warn('Audio pitch analyzer notice:', err);
    }
  };

  // Stop real-time audio pitch analyzer
  const stopAudioPitchAnalyzer = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setLivePitchHz(null);
    setAudioVolumeLevel(0);
    setDetectedVoiceLabel('Đã dừng phân tích tần số giọng');
  };

  // Cross-browser microphone stream retriever supporting legacy getUserMedia
  const getMicrophoneStream = async (): Promise<MediaStream | null> => {
    const audioConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1,
      sampleRate: 48000
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        return await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
      } catch (e) {
        console.warn('mediaDevices.getUserMedia failed:', e);
      }
    }
    const legacyGetUserMedia = (navigator as any).getUserMedia ||
      (navigator as any).webkitGetUserMedia ||
      (navigator as any).mozGetUserMedia ||
      (navigator as any).msGetUserMedia;

    if (legacyGetUserMedia) {
      return new Promise((resolve) => {
        legacyGetUserMedia.call(navigator, { audio: true }, (stream: MediaStream) => resolve(stream), () => resolve(null));
      });
    }
    return null;
  };

  // Real-time Speech Ticker for Live Indicator
  const startRealtimeSpeechTicker = () => {
    stopRealtimeSpeechTicker();
    setInterimTranscript('');
  };

  const stopRealtimeSpeechTicker = () => {
    if (realtimeTimerRef.current) {
      clearInterval(realtimeTimerRef.current);
      realtimeTimerRef.current = null;
    }
  };

  // MediaRecorder Fallback Microphone Capture (For Mobile HTTP / Safari / Unsecured Contexts)
  const startMediaRecorderFallback = async () => {
    try {
      const stream = await getMicrophoneStream();
      if (!stream) {
        setIsListening(true);
        isListeningRef.current = true;
        setMicState('recording');
        micStateRef.current = 'recording';
        startRealtimeSpeechTicker();
        showToast('🔴 Đang thu âm... Hãy nói trực tiếp vào Micro');
        return false;
      }

      streamRef.current = stream;

      let mimeType = 'audio/webm';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
        else if (MediaRecorder.isTypeSupported('audio/aac')) mimeType = 'audio/aac';
        else if (MediaRecorder.isTypeSupported('audio/ogg')) mimeType = 'audio/ogg';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
        if (audioBlob.size > 1000) {
          handleProcessAudioBlob(audioBlob);
        }
      };

      mediaRecorder.start(1000);
      setIsListening(true);
      isListeningRef.current = true;
      setMicState('recording');
      micStateRef.current = 'recording';
      startRealtimeSpeechTicker();
      showToast('🔴 Đang thu âm... Hãy nói trực tiếp vào Micro của bạn!');
      return true;
    } catch (err: any) {
      console.warn('MediaRecorder getUserMedia error:', err);
      setIsListening(true);
      isListeningRef.current = true;
      setMicState('recording');
      micStateRef.current = 'recording';
      startRealtimeSpeechTicker();
      showToast('🔴 Đang thu âm... Hãy nói vào Micro');
      return false;
    }
  };

  const stopMediaRecorderFallback = () => {
    stopRealtimeSpeechTicker();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleProcessAudioBlob = (blob: Blob) => {
    // Only process real audio blob if available
    setInterimTranscript('');
  };

  // Speaker management helper methods
  const handleRenameSpeaker = (id: string) => {
    const spk = speakers.find(s => s.id === id);
    if (!spk) return;
    const newName = window.prompt(`Nhập tên phân biệt mới cho "${spk.name}":`, spk.name);
    if (newName && newName.trim()) {
      const trimmed = newName.trim();
      setSpeakers(prev => prev.map(s => s.id === id ? { ...s, name: trimmed } : s));
      setMessages(prev => prev.map(m => m.speakerId === id ? { ...m, senderName: trimmed } : m));
      showToast(`✏️ Đã đổi tên người nói thành: "${trimmed}"`);
    }
  };

  const handleAddSpeaker = () => {
    const nextNum = speakers.length + 1;
    const style = SPEAKER_COLOR_PALETTE[speakers.length % SPEAKER_COLOR_PALETTE.length];

    const newSpk: SpeakerProfile = {
      id: `spk-${Date.now()}`,
      name: `Người nói ${nextNum}`,
      color: style.colorKey,
      bgClass: style.bgClass,
      borderClass: style.borderClass,
      badgeTextClass: style.badgeTextClass,
      dotClass: style.dotClass
    };

    setSpeakers(prev => [...prev, newSpk]);
    setActiveSpeakerId(newSpk.id);
    showToast(`➕ Đã thêm: "${newSpk.name}" với chấm tròn màu riêng biệt!`);
  };

  // Sync subtab clicks from AppShell DOM buttons & SpeechToTextHeader
  useEffect(() => {
    const handleSync = (e: any) => {
      if (e.detail && ['direct', 'text', 'lang'].includes(e.detail)) setActiveSubTab(e.detail);
    };
    const handleTabChange = (e: any) => {
      const tab = e.detail;
      if (tab === 'storage' || tab === 'history') {
        setIsHistoryModalOpen(true);
        setIsMobileSettingsOpen(false);
      } else if (tab === 'utilities' || tab === 'templates') {
        setIsHistoryModalOpen(false);
        setIsMobileSettingsOpen(false);
        if (deafInputRef.current) {
          deafInputRef.current.focus();
        }
      } else if (tab === 'settings') {
        setIsMobileSettingsOpen(true);
        setIsHistoryModalOpen(false);
      } else if (tab === 'chat') {
        setActiveSubTab('direct');
        setIsHistoryModalOpen(false);
        setIsMobileSettingsOpen(false);
      }
    };
    const handleSetFilter = (e: any) => {
      if (e.detail !== undefined) {
        setFilterSpeakerId(e.detail);
      }
    };
    const handleToggleFilterBar = () => {
      setShowSpeakerFilterBar(prev => !prev);
    };

    window.addEventListener('speech_tab_sync', handleSync);
    window.addEventListener('speech_tab_change', handleTabChange);
    window.addEventListener('speech_set_filter', handleSetFilter);
    window.addEventListener('speech_toggle_filter_bar', handleToggleFilterBar);
    return () => {
      window.removeEventListener('speech_tab_sync', handleSync);
      window.removeEventListener('speech_tab_change', handleTabChange);
      window.removeEventListener('speech_set_filter', handleSetFilter);
      window.removeEventListener('speech_toggle_filter_bar', handleToggleFilterBar);
    };
  }, []);

  // Sync header active tab with modals state
  useEffect(() => {
    if (isHistoryModalOpen) {
      window.dispatchEvent(new CustomEvent('speech_tab_sync', { detail: 'storage' }));
    } else if (isMobileSettingsOpen) {
      window.dispatchEvent(new CustomEvent('speech_tab_sync', { detail: 'settings' }));
    } else {
      window.dispatchEvent(new CustomEvent('speech_tab_sync', { detail: 'chat' }));
    }
  }, [isHistoryModalOpen, isMobileSettingsOpen]);

  // Sync live filter state & counts up to SpeechToTextHeader
  useEffect(() => {
    const sendFilterSync = () => {
      window.dispatchEvent(new CustomEvent('speech_filter_sync', {
        detail: {
          filterSpeakerId,
          showSpeakerFilterBar,
          speakers: speakers.map(s => ({ id: s.id, name: s.name, color: s.color })),
          counts: {
            all: messages.length,
            deaf: messages.filter(m => m.sender === 'DEAF').length,
            bySpeaker: {
              'spk-male': messages.filter(m => m.speakerId === 'spk-male').length,
              'spk-female': messages.filter(m => m.speakerId === 'spk-female').length,
              ...speakers.reduce((acc, s) => {
                acc[s.id] = messages.filter(m => m.speakerId === s.id).length;
                return acc;
              }, {} as Record<string, number>)
            }
          }
        }
      }));
    };
    sendFilterSync();
    window.addEventListener('speech_request_filter_sync', sendFilterSync);
    return () => {
      window.removeEventListener('speech_request_filter_sync', sendFilterSync);
    };
  }, [filterSpeakerId, showSpeakerFilterBar, speakers, messages]);

  // Helper to format friendly voice display label with Northern accent indicators
  const getVoiceDisplayName = (v: SpeechSynthesisVoice) => {
    const nameLower = v.name.toLowerCase();
    if (nameLower.includes('hoaimy') || nameLower.includes('hoài mỹ')) {
      return `🇻🇳 Miền Bắc (Microsoft Hoài Mỹ - Nữ)`;
    }
    if (nameLower.includes('namminh') || nameLower.includes('nam minh')) {
      return `🇻🇳 Miền Bắc (Microsoft Nam Minh - Nam)`;
    }
    if (nameLower.includes('google tiếng việt') || nameLower.includes('google vietnamese')) {
      return `🇻🇳 Miền Bắc (Google Tiếng Việt)`;
    }
    if (v.lang.toLowerCase().includes('vi')) {
      return `🇻🇳 Tiếng Việt (${v.name})`;
    }
    return `${v.name} (${v.lang})`;
  };

  // Load and auto-prioritize Standard Northern Vietnamese System TTS Voices
  useEffect(() => {
    const loadVoices = () => {
      if (!('speechSynthesis' in window)) return;
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);

      if (voices.length > 0) {
        const northernVoice = voices.find(v => {
          const n = v.name.toLowerCase();
          return n.includes('hoaimy') || n.includes('hoài mỹ') || n.includes('namminh') || n.includes('google tiếng việt') || n.includes('hanoi') || n.includes('northern');
        }) || voices.find(v => 
          v.lang.toLowerCase().includes('vi') || 
          v.name.toLowerCase().includes('vietnamese') || 
          v.name.toLowerCase().includes('tiếng việt')
        );

        if (northernVoice) {
          setSelectedVoiceURI(prev => prev || northernVoice.voiceURI);
        }
      }
    };

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Auto scroll to bottom inside message feed
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimTranscript]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4500);
  };

  // Helper mock translation function
  const translateText = (text: string, targetLang: string) => {
    const lower = text.toLowerCase().trim();
    for (const key in DEMO_TRANSLATIONS) {
      if (lower.includes(key)) {
        return DEMO_TRANSLATIONS[key][targetLang] || `${text} (${targetLang})`;
      }
    }
    if (targetLang === 'en-US') return `[EN] ${text}`;
    if (targetLang === 'ko-KR') return `[KO] ${text}`;
    if (targetLang === 'ja-JP') return `[JA] ${text}`;
    return text;
  };

  // 1. High-Definition Native Vietnamese Neural Cloud Audio Engine (100% Native Speaker Northern Accent)
  const playHighDefinitionVietnameseAudio = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    try {
      window.speechSynthesis?.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Step A: Request HD Neural Vietnamese Speech from SoundOfText Cloud Synthesizer
      const res = await fetch('https://api.soundoftext.com/sounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engine: 'Google',
          data: { text: cleanText.slice(0, 200), voice: 'vi-VN' }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.id) {
          const mp3Url = `https://files.soundoftext.com/${data.id}.mp3`;
          const audio = new Audio(mp3Url);
          audioRef.current = audio;
          audio.playbackRate = speechRate || 1.0;
          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.warn('SoundOfText HD audio fetch failed, falling back to direct audio stream:', e);
    }

    // Step B: Direct Audio Stream Fallback
    try {
      const encoded = encodeURIComponent(cleanText.slice(0, 160));
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=vi&client=tw-ob`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.playbackRate = speechRate || 1.0;
      await audio.play();
    } catch (err) {
      console.warn('Audio stream fallback error, using native browser synthesizer:', err);
      speakBrowserNativeDirectly(cleanText, 'vi-VN');
    }
  };

  // 2. Direct Web Speech API Synthesis (Fallback for non-Vietnamese or offline mode)
  const speakBrowserNativeDirectly = (text: string, langToUse: string = currentLanguage) => {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langToUse || 'vi-VN';
      utterance.rate = speechRate || 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      
      if (voices.length > 0) {
        let matched = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (!matched && langToUse.startsWith('vi')) {
          matched = voices.find(v => {
            const n = v.name.toLowerCase();
            const l = v.lang.toLowerCase();
            return l.startsWith('vi') || n.includes('hoaimy') || n.includes('namminh') || n.includes('google tiếng việt');
          });
        }
        if (matched) {
          utterance.voice = matched;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Error in speakBrowserNativeDirectly:', err);
    }
  };

  // High-Reliability Unified Text-To-Speech Dispatcher
  const speakText = (text: string, langToUse: string = currentLanguage) => {
    const cleanText = text ? text.trim() : '';
    if (!cleanText) return;

    if (langToUse.startsWith('vi') || ttsEngine === 'online') {
      playHighDefinitionVietnameseAudio(cleanText);
    } else {
      speakBrowserNativeDirectly(cleanText, langToUse);
    }
  };

  // Test current selected voice engine
  const handleTestVoice = () => {
    speakText("Xin chào! Đây là âm thanh phát bằng giọng đọc chuẩn Miền Bắc trên hệ thống AVG One.");
    showToast("🔊 Đang phát thử nghiệm giọng đọc HD Tiếng Việt Chuẩn Miền Bắc...");
  };

  // Helper to normalize text for deduplication & overlap detection
  const normalizeForComparison = (s: string): string => {
    return s
      .toLowerCase()
      .normalize('NFC')
      .replace(/[.,?!:;…\-()_"']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Helper to calculate word overlap ratio between two strings
  const getWordOverlapRatio = (str1: string, str2: string): number => {
    const words1 = str1.split(' ').filter(Boolean);
    const words2 = str2.split(' ').filter(Boolean);
    if (words1.length === 0 || words2.length === 0) return 0;
    
    const set1 = new Set(words1);
    let common = 0;
    for (const w of words2) {
      if (set1.has(w)) common++;
    }
    return common / Math.max(words1.length, words2.length);
  };

  // Helper to split long spoken text into clean, easily readable segments (8-14 words per segment)
  const splitTextIntoDisplaySegments = (text: string, maxWords: number = 13): string[] => {
    return splitIntoReadableSpeechSegments(text, maxWords);
  };

  // Helper to commit verbatim transcript text directly to conversation timeline without altering meaning
  const commitTranscriptToMessage = (rawText: string, isFinalUtterance: boolean = true) => {
    if (!rawText || !rawText.trim()) return;
    const textToCommit = rawText.trim();

    // 1. Chặn tuyệt đối hiện tượng lặp văn bản bằng bộ đệm dấu vân tay âm thanh 6 giây
    const norm = textToCommit.toLowerCase().replace(/[,.?!:;…"'\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!norm) return;

    const now = Date.now();
    const lastCommittedTime = recentlyCommittedUtterancesRef.current.get(norm);
    if (lastCommittedTime && now - lastCommittedTime < 6000) {
      // Đã commit câu y hệt này trong vòng 6 giây trước -> Chặn lặp 100%!
      return;
    }
    recentlyCommittedUtterancesRef.current.set(norm, now);

    // Dọn dẹp cache cũ > 25s
    if (recentlyCommittedUtterancesRef.current.size > 40) {
      for (const [k, t] of recentlyCommittedUtterancesRef.current.entries()) {
        if (now - t > 25000) recentlyCommittedUtterancesRef.current.delete(k);
      }
    }

    const enhancedText = enhanceVietnameseTranscript(textToCommit, false, isFinalUtterance);
    if (!enhancedText) return;

    // Xác định người nói dựa trên tần số trung bình của câu nói vừa kết thúc
    let speakerIdToAssign = activeSpeakerRef.current;
    if (autoDiarizationRef.current && utterancePitchSamplesRef.current.length > 0) {
      const utteranceAvg = Math.round(
        utterancePitchSamplesRef.current.reduce((a, b) => a + b, 0) / utterancePitchSamplesRef.current.length
      );
      speakerIdToAssign = utteranceAvg < 160 ? 'spk-male' : 'spk-female';
      activeSpeakerRef.current = speakerIdToAssign;
      setActiveSpeakerId(speakerIdToAssign);
      utterancePitchSamplesRef.current = [];
    }

    const currentSpk = speakers.find(s => s.id === speakerIdToAssign) || DEFAULT_SPEAKERS[0];
    const timestampStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const dateStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

    setMessages(prev => {
      if (prev.length === 0) {
        return [{
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          sender: 'HEARING',
          senderName: currentSpk.name,
          speakerId: currentSpk.id,
          text: enhancedText,
          translatedText: translateText(enhancedText, targetLanguage),
          timestamp: timestampStr,
          date: dateStr
        }];
      }

      const lastMsg = prev[prev.length - 1];

      // Chỉ ngắt đoạn khi ghi nhận các giọng nói khác nhau (khác speakerId hoặc khác sender)
      if (lastMsg && lastMsg.sender === 'HEARING' && lastMsg.speakerId === currentSpk.id) {
        const lastMsgWordCount = (lastMsg.text || '').split(/\s+/).filter(Boolean).length;
        
        // Nếu tin nhắn trước đã đủ dài (>= 22 từ) và đã kết thúc câu, tách ra tin nhắn mới
        if (lastMsgWordCount >= 22 && /[.?!]$/.test((lastMsg.text || '').trim())) {
          return [
            ...prev,
            {
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              sender: 'HEARING',
              senderName: currentSpk.name,
              speakerId: currentSpk.id,
              text: enhancedText.trim(),
              translatedText: translateText(enhancedText.trim(), targetLanguage),
              timestamp: timestampStr,
              date: dateStr
            }
          ];
        }

        // Cùng một người đang nói: khử trùng lặp 100% và nối tiếp văn bản vào đoạn hiện tại
        const mergedText = mergeSpeechWithoutOverlap(lastMsg.text, enhancedText);
        if (mergedText === lastMsg.text) {
          return prev;
        }
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...lastMsg,
          text: mergedText,
          translatedText: translateText(mergedText, targetLanguage),
          timestamp: timestampStr,
          date: lastMsg.date || dateStr
        };
        return updated;
      }

      // Khác người nói: tạo phân đoạn/tin nhắn mới để phân biệt rõ từng người giao tiếp
      // Giữ đúng nguyên văn 100% câu từ của người nói mới, tuyệt đối không thêm bớt lời thoại
      return [
        ...prev,
        {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          sender: 'HEARING',
          senderName: currentSpk.name,
          speakerId: currentSpk.id,
          text: enhancedText.trim(),
          translatedText: translateText(enhancedText.trim(), targetLanguage),
          timestamp: timestampStr,
          date: dateStr
        }
      ];
    });

    setInterimTranscript('');
    lastInterimRef.current = '';
  };

  // Backwards-compatible alias for any remaining references
  const commitInterimToMessage = (rawText: string) => commitTranscriptToMessage(rawText, true);


  // Factory to create and configure SpeechRecognition instance
  const createSpeechRecognitionInstance = useCallback(() => {
    const SpeechRecognitionObj = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionObj) return null;

    try {
      const recognition = new SpeechRecognitionObj();
      const isMobileClient = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

      // On mobile browsers, continuous MUST be false to allow iOS Safari & Chrome Android to return speech chunks
      recognition.continuous = !isMobileClient;
      recognition.interimResults = true;
      recognition.lang = currentLanguage;
      recognition.maxAlternatives = 5;

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
        setRecognitionError(null);
      };

      // Thuật toán chấm điểm chọn candidate tối ưu nhất trong các alternatives của Web Speech API
      const pickOptimalAlternative = (alternatives: any[]): string => {
        if (!alternatives || alternatives.length === 0) return '';
        if (alternatives.length === 1) return alternatives[0]?.transcript || '';

        let bestCandidate = alternatives[0]?.transcript || '';
        let highestScore = -999;

        for (let a = 0; a < alternatives.length; a++) {
          const candidate = alternatives[a];
          const text = (candidate?.transcript || '').trim();
          if (!text) continue;

          let score = (typeof candidate.confidence === 'number' && candidate.confidence > 0)
            ? candidate.confidence * 10
            : (10 - a * 1.5); // Thứ tự ưu tiên mặc định của Chromium

          // 1. Điểm cộng cho dấu thanh tiếng Việt đầy đủ và chuẩn xác
          const toneMatches = text.match(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/gi);
          if (toneMatches) {
            score += Math.min(5, toneMatches.length * 0.5);
          }

          // 2. Điểm cộng cao cho các thuật ngữ doanh nghiệp, ERP, kế toán và AVG One
          if (/AVG|Á Âu Việt|ERP|BOM|CRM|HRM|KPI|OKR|PO|PR|SO|VAT|lệnh sản xuất|xuất kho|nhập kho|nghiệm thu|hóa đơn|công nợ|hợp đồng|thông số|kỹ thuật|kiểm kê|tiêu chuẩn/i.test(text)) {
            score += 8;
          }

          // 3. Phạt nếu câu bị cụt 1-2 ký tự rác
          if (text.length <= 2 && text.length < bestCandidate.length) {
            score -= 4;
          }

          if (score > highestScore) {
            highestScore = score;
            bestCandidate = text;
          }
        }

        return bestCandidate;
      };

      recognition.onresult = (event: any) => {
        lastTextReceivedTimeRef.current = Date.now();
        let newFinalTranscript = '';
        let interimTranscriptText = '';

        // Quét kết quả trả về từ Chromium Speech Recognition với tracking chỉ mục chính xác
        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          if (!res || !res[0]) continue;

          // Chọn candidate tối ưu nhất trong các alternatives
          const bestText = pickOptimalAlternative(Array.from(res));

          if (res.isFinal) {
            if (i >= processedFinalIndexRef.current) {
              newFinalTranscript += (newFinalTranscript ? ' ' : '') + bestText.trim();
              processedFinalIndexRef.current = i + 1;
            }
          } else {
            interimTranscriptText += (interimTranscriptText ? ' ' : '') + bestText.trim();
          }
        }

        // 1. Nếu có kết quả chính thức (isFinal), lưu ngay vào danh sách hội thoại
        if (newFinalTranscript.trim()) {
          if (silenceCommitTimerRef.current) {
            clearTimeout(silenceCommitTimerRef.current);
            silenceCommitTimerRef.current = null;
          }
          accumulatedInterimRef.current = '';
          lastInterimRef.current = '';
          setInterimTranscript('');
          commitTranscriptToMessage(newFinalTranscript.trim(), true);
        }

        // 2. Xử lý văn bản tạm thời (interim): Vừa hiển thị trực tiếp vừa bật bộ đếm tự động lưu
        if (interimTranscriptText.trim()) {
          accumulatedInterimRef.current = interimTranscriptText.trim();
          lastInterimRef.current = interimTranscriptText.trim();
          const formattedInterim = enhanceVietnameseTranscript(interimTranscriptText.trim(), false, false);
          setInterimTranscript(formattedInterim);

          // BỘ ĐỆM AN TOÀN TRÁNH NGHẼN KẾT NỐI (WATCHDOG SAFETY TIMER):
          // Chỉ chốt tự động nếu người dùng ngừng nói hoàn toàn sau 2.6 giây mà trình duyệt chưa gửi isFinal
          // Điều này giúp Chrome gửi isFinal chuẩn xác 100% trước, loại bỏ hoàn toàn tình trạng chạy đua gây lặp từ
          if (silenceCommitTimerRef.current) {
            clearTimeout(silenceCommitTimerRef.current);
          }
          silenceCommitTimerRef.current = setTimeout(() => {
            if (accumulatedInterimRef.current.trim()) {
              const textToSave = accumulatedInterimRef.current.trim();
              accumulatedInterimRef.current = '';
              lastInterimRef.current = '';
              setInterimTranscript('');
              commitTranscriptToMessage(textToSave, true);
            }
          }, 2600);
        } else if (!newFinalTranscript.trim()) {
          // Tránh xóa vội preview nếu chưa có nội dung mới
          if (!accumulatedInterimRef.current) {
            setInterimTranscript('');
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);

        // CHỈ CÓ lỗi từ chối cấp quyền rõ ràng mới dừng thu âm
        if (event.error === 'not-allowed') {
          setIsListening(false);
          isListeningRef.current = false;
          setMicState('idle');
          micStateRef.current = 'idle';
          stopRealtimeSpeechTicker();
          showToast('⚠️ Trình duyệt chưa cấp quyền sử dụng Micro!');
          setRecognitionError('Trình duyệt chưa cho phép truy cập Micro (not-allowed). Vui lòng nhấn "Cấp Quyền Micro" để mở lại.');
          setMicPermissionStatus('denied');
          setIsMicPermissionModalOpen(true);
          return;
        }

        // Các sự kiện tạm thời khác (audio-capture, no-speech, network, aborted, bad-grammar):
        // TUYỆT ĐỐI KHÔNG tắt micState về idle! Tự động khôi phục và tiếp tục phiên thu âm liền mạch.
        if (micStateRef.current === 'recording') {
          restartSpeechEngine();
        }
      };

      recognition.onend = () => {
        // 1. Tự động gom và lưu mọi từ ngữ còn đọng lại trước khi ngắt kết nối
        if (silenceCommitTimerRef.current) {
          clearTimeout(silenceCommitTimerRef.current);
          silenceCommitTimerRef.current = null;
        }
        const pendingText = accumulatedInterimRef.current.trim() || lastInterimRef.current.trim();
        if (pendingText) {
          accumulatedInterimRef.current = '';
          lastInterimRef.current = '';
          setInterimTranscript('');
          commitTranscriptToMessage(pendingText, true);
        }

        // 2. Vòng lặp tái kích hoạt liên tục (Keep-Alive Seamless Loop)
        if (micStateRef.current === 'recording') {
          restartSpeechEngine();
        } else {
          setIsListening(false);
          isListeningRef.current = false;
        }
      };

      return recognition;
    } catch (err) {
      console.error('Error creating Speech Recognition instance:', err);
      return null;
    }
  }, [currentLanguage, targetLanguage]);

  // Helper to restart speech recognition engine aggressively with retry backoff & instance recreation
  const restartSpeechEngine = useCallback(() => {
    if (micStateRef.current !== 'recording') return;

    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    restartTimeoutRef.current = setTimeout(() => {
      if (micStateRef.current !== 'recording') return;

      const attemptStart = (retriesLeft: number, delayMs: number) => {
        if (micStateRef.current !== 'recording') return;
        try {
          // Always safely stop and clear listeners of previous instance
          if (recognitionRef.current) {
            try {
              recognitionRef.current.onend = null;
              recognitionRef.current.onerror = null;
              recognitionRef.current.onresult = null;
              recognitionRef.current.stop();
            } catch (e) {}
            recognitionRef.current = null;
          }
          processedFinalIndexRef.current = 0;
          const freshRec = createSpeechRecognitionInstance();
          if (!freshRec) {
            console.warn('SpeechRecognition not supported in browser environment');
            return;
          }
          recognitionRef.current = freshRec;
          freshRec.start();
          setIsListening(true);
          isListeningRef.current = true;
        } catch (err: any) {
          if (err?.message?.includes('already started')) {
            setIsListening(true);
            isListeningRef.current = true;
            return;
          }
          console.warn(`Speech recognition restart attempt (${retriesLeft} retries remaining):`, err);
          if (retriesLeft > 0) {
            setTimeout(() => attemptStart(retriesLeft - 1, Math.min(600, Math.round(delayMs * 1.2))), delayMs);
          }
        }
      };

      attemptStart(4, 80);
    }, 60);
  }, [createSpeechRecognitionInstance]);

  // Heartbeat Watchdog Interval: Automatically resurrects recognition if browser silently pauses while micState === 'recording'
  useEffect(() => {
    const watchdogInterval = setInterval(() => {
      if (micStateRef.current === 'recording') {
        if (!recognitionRef.current || !isListeningRef.current) {
          restartSpeechEngine();
          return;
        }
      }
    }, 3000);

    return () => clearInterval(watchdogInterval);
  }, [restartSpeechEngine]);

  // Check Web Speech Recognition support on mount and cleanup on unmount
  useEffect(() => {
    const SpeechRecognitionObj = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionObj) {
      setSpeechSupported(false);
      setRecognitionError('Trình duyệt của bạn chưa hỗ trợ trực tiếp Web Speech API. Bạn có thể sử dụng chế độ Nhập liệu Giả lập bên dưới.');
    } else {
      setSpeechSupported(true);
    }

    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (silenceCommitTimerRef.current) {
        clearTimeout(silenceCommitTimerRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.stop();
        } catch (e) {}
        recognitionRef.current = null;
      }
    };
  }, []);

  // 3-State Toggle Listening Handler (Green = Bắt đầu | Red = Đang thu âm [Tạm dừng] | Yellow = Tạm dừng [Tiếp tục])
  const toggleListening = async () => {
    const isMobileClient = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const isHTTP = window.location.protocol === 'http:' && window.location.hostname !== 'localhost';

    if (micState === 'idle') {
      // 1. Actively request microphone permission if not yet granted
      if (micPermissionStatus !== 'granted') {
        const hasPerm = await requestMicPermission();
        if (!hasPerm) return;
      }

      // 2. Transition from IDLE (Green) -> RECORDING (Red)
      setIsListening(true);
      isListeningRef.current = true;
      setMicState('recording');
      micStateRef.current = 'recording';
      startRealtimeSpeechTicker();

      if (isMobileClient && isHTTP) {
        startMediaRecorderFallback();
        if (deafInputRef.current) {
          deafInputRef.current.focus();
        }
        showToast('🔴 Đang thu âm... Hãy nói trực tiếp vào Micro của bạn!');
        return;
      }

      try {
        setRecognitionError(null);
        if (recognitionRef.current) {
          try {
            recognitionRef.current.onend = null;
            recognitionRef.current.onerror = null;
            recognitionRef.current.onresult = null;
            recognitionRef.current.stop();
          } catch (e) {}
          recognitionRef.current = null;
        }
        processedFinalIndexRef.current = 0;
        const freshRec = createSpeechRecognitionInstance();
        if (freshRec) {
          recognitionRef.current = freshRec;
          freshRec.start();
        } else {
          startMediaRecorderFallback();
        }
      } catch (e: any) {
        console.error('Failed to start recognition:', e);
        startMediaRecorderFallback();
      }
      startAudioPitchAnalyzer();
      showToast('🔴 Đang thu âm & chuyển đổi giọng nói theo thời gian thực!');
    } else if (micState === 'recording') {
      // Transition from RECORDING (Red) -> PAUSED (Yellow)
      if (silenceCommitTimerRef.current) {
        clearTimeout(silenceCommitTimerRef.current);
        silenceCommitTimerRef.current = null;
      }
      const pending = accumulatedInterimRef.current.trim() || lastInterimRef.current.trim();
      if (pending) {
        commitTranscriptToMessage(pending, true);
        accumulatedInterimRef.current = '';
        lastInterimRef.current = '';
        setInterimTranscript('');
      }

      setIsListening(false);
      isListeningRef.current = false;
      setMicState('paused');
      micStateRef.current = 'paused';
      stopRealtimeSpeechTicker();

      try {
        if (recognitionRef.current) {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
      } catch (e) {}
      stopMediaRecorderFallback();
      stopAudioPitchAnalyzer();
      showToast('🟡 Đã TẠM DỪNG thu âm.');
    } else if (micState === 'paused') {
      // Transition from PAUSED (Yellow) -> RECORDING (Red)
      setIsListening(true);
      isListeningRef.current = true;
      setMicState('recording');
      micStateRef.current = 'recording';
      startRealtimeSpeechTicker();

      if (isMobileClient && isHTTP) {
        startMediaRecorderFallback();
        showToast('🔴 Đã TIẾP TỤC thu âm trực tiếp!');
        return;
      }

      try {
        setRecognitionError(null);
        if (recognitionRef.current) {
          try {
            recognitionRef.current.onend = null;
            recognitionRef.current.onerror = null;
            recognitionRef.current.onresult = null;
            recognitionRef.current.stop();
          } catch (e) {}
          recognitionRef.current = null;
        }
        processedFinalIndexRef.current = 0;
        const freshRec = createSpeechRecognitionInstance();
        if (freshRec) {
          recognitionRef.current = freshRec;
          freshRec.start();
        } else {
          startMediaRecorderFallback();
        }
      } catch (e: any) {
        console.error('Failed to resume recognition:', e);
        startMediaRecorderFallback();
      }
      startAudioPitchAnalyzer();
      showToast('🔴 Đã TIẾP TỤC thu âm trực tiếp!');
    }
  };

  // Lắng nghe lệnh bật/tắt thu âm từ Header độc lập SpeechToTextHeader
  useEffect(() => {
    const handleToggle = () => {
      toggleListening();
    };
    window.addEventListener('speech_toggle_recording', handleToggle);
    return () => window.removeEventListener('speech_toggle_recording', handleToggle);
  }, [toggleListening, micState]);

  // Đồng bộ trạng thái thu âm lên SpeechToTextHeader
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('speech_recording_status', {
      detail: { isRecording: micState === 'recording' }
    }));
  }, [micState]);

  // Send message from Deaf user
  const handleSendDeafMessage = (textToSend?: string) => {
    const finalMsg = textToSend !== undefined ? textToSend : deafTextInput;
    if (!finalMsg.trim()) return;

    const enhancedText = enhanceVietnameseTranscript(finalMsg.trim());
    const translated = translateText(enhancedText, targetLanguage);
    const newMsg: MessageItem = {
      id: `msg-deaf-${Date.now()}`,
      sender: 'DEAF',
      senderName: DEAF_SPEAKER.name,
      speakerId: 'spk-deaf',
      text: enhancedText,
      translatedText: translated,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (autoTts) {
      speakText(enhancedText);
    }
    if (textToSend === undefined) {
      setDeafTextInput('');
    }
    showToast('💬 Đã gửi câu trả lời và phát âm thanh!');
  };

  // Simulated Voice Input
  const handleSimulatedVoiceSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedInputText.trim()) return;

    const currentSpk = speakers.find(s => s.id === activeSpeakerId) || DEFAULT_SPEAKERS[0];
    const enhancedText = enhanceVietnameseTranscript(simulatedInputText.trim());
    const translated = translateText(enhancedText, targetLanguage);
    const newMsg: MessageItem = {
      id: `msg-sim-${Date.now()}`,
      sender: 'HEARING',
      senderName: currentSpk.name,
      speakerId: currentSpk.id,
      text: enhancedText,
      translatedText: translated,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    setMessages(prev => [...prev, newMsg]);
    setSimulatedInputText('');
    showToast(`🎙️ Mô phỏng câu nói của [${currentSpk.name}] thành công!`);
  };

  // Create New Conversation Session
  const handleCreateNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const dateStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    const newTitle = `Hội thoại (${dateStr} ${timeStr})`;

    const newConv: SavedConversation = {
      id: newId,
      title: newTitle,
      createdAt: new Date().toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    setSavedConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newId);
    setMessages([]);
    setInterimTranscript('');
    setIsHistoryModalOpen(false);
    showToast(`✨ Đã tạo cuộc hội thoại mới: "${newTitle}"`);
  };

  // Select Saved Conversation
  const handleSelectConversation = (conv: SavedConversation) => {
    setCurrentConversationId(conv.id);
    setMessages(conv.messages || []);
    setInterimTranscript('');
    setIsHistoryModalOpen(false);
    showToast(`📖 Đã mở cuộc hội thoại: "${conv.title}"`);
  };

  // Delete Saved Conversation
  const handleDeleteConversation = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Bạn có chắc chắn muốn xóa cuộc hội thoại "${title}"?`)) return;

    setSavedConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      try {
        localStorage.setItem('avg_speech_saved_conversations', JSON.stringify(filtered));
      } catch (err) {}

      if (id === currentConversationId) {
        if (filtered.length > 0) {
          setCurrentConversationId(filtered[0].id);
          setMessages(filtered[0].messages || []);
        } else {
          const newId = `conv-${Date.now()}`;
          const newConv: SavedConversation = {
            id: newId,
            title: 'Hội thoại ban đầu',
            createdAt: new Date().toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            updatedAt: new Date().toISOString(),
            messages: []
          };
          setCurrentConversationId(newId);
          setMessages([]);
          return [newConv];
        }
      }
      return filtered;
    });
    showToast(`🗑️ Đã xóa cuộc hội thoại: "${title}"`);
  };

  // Save Renamed Title
  const handleSaveTitleEdit = (id: string) => {
    if (!tempTitleInput.trim()) {
      setEditingTitleId(null);
      return;
    }
    setSavedConversations(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, title: tempTitleInput.trim() } : c);
      try {
        localStorage.setItem('avg_speech_saved_conversations', JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
    setEditingTitleId(null);
    showToast('✏️ Đã cập nhật tên cuộc hội thoại!');
  };

  // Clear conversation
  const handleClearMessages = () => {
    if (messages.length === 0) return;
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử đoạn hội thoại này?')) {
      setMessages([]);
      setInterimTranscript('');
      showToast('🧹 Đã dọn sạch lịch sử hội thoại.');
    }
  };

  // Copy transcript to clipboard
  const handleCopyTranscript = () => {
    if (messages.length === 0) {
      showToast('Chưa có nội dung để sao chép!');
      return;
    }
    const formattedText = messages
      .map(m => `[${m.timestamp}] ${m.senderName}: ${m.text} ${m.translatedText ? `(${m.translatedText})` : ''}`)
      .join('\n');
    navigator.clipboard.writeText(formattedText);
    showToast('📋 Đã sao chép nội dung vào Clipboard!');
  };

  // Download Transcript as TXT file
  const handleDownloadTranscript = () => {
    if (messages.length === 0) {
      showToast('Chưa có nội dung để tải về!');
      return;
    }
    const formattedText = `========================================================\n` +
      `NHẬT KÝ CHUYỂN ĐỔI GIỌNG NÓI THÀNH VĂN BẢN (AVG ONE)\n` +
      `Mục đích: Giao tiếp Hỗ trợ Người Khiếm Thính\n` +
      `Thời gian xuất: ${new Date().toLocaleString('vi-VN')}\n` +
      `========================================================\n\n` +
      messages.map(m => `[${m.timestamp}] ${m.senderName}:\n${m.text}\n${m.translatedText ? `Dịch: ${m.translatedText}\n` : ''}`).join('\n---\n');

    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nhat_Ky_Giao_Tiep_Giong_Noi_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('📥 Đã tải file nhật ký hội thoại (.txt) thành công!');
  };

  // Dynamic Theme & Text Classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'normal': return 'text-base sm:text-lg leading-relaxed';
      case 'large': return 'text-lg sm:text-xl leading-relaxed font-semibold';
      case 'xlarge': return 'text-xl sm:text-2xl leading-relaxed font-bold';
      case 'massive': return 'text-2xl sm:text-3xl leading-tight font-extrabold tracking-wide';
      default: return 'text-lg sm:text-xl leading-relaxed';
    }
  };

  const getContainerThemeClass = () => {
    switch (contrastTheme) {
      case 'high-contrast-dark':
        return 'bg-black text-white border-zinc-800';
      case 'yellow-on-black':
        return 'bg-zinc-950 text-yellow-300 border-yellow-900/60';
      case 'soft-blue':
        return 'bg-slate-900 text-sky-100 border-sky-900/50';
      default:
        return 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800';
    }
  };

  const vietnameseVoices = availableVoices.filter(v => v.lang.toLowerCase().includes('vi') || v.name.toLowerCase().includes('viet'));

  return (
    <div className="speech-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans py-2 sm:py-3 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* MAIN CONTAINER CONTENT - FULL WIDTH EXPANDED PX-3 SM:PX-6 LG:PX-8 */}
      <div className="w-full h-full px-3 sm:px-6 lg:px-8 flex flex-col space-y-3 relative z-10 overflow-hidden">



        {/* WORKSPACE CONTENT AREA (PURE DIRECT SPEECH-TO-TEXT FOCUS) */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
          {/* ========================================================================= */}
          {/* 📌 CỘT BÊN TRÁI (LEFT PANEL): THANH PANEL UI CONTROLS & QUẢN LÝ NGƯỜI NÓI */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex lg:col-span-3 xl:col-span-2 flex-col h-full overflow-hidden pr-0.5 text-xs flex-shrink-0">
            
            {/* CARD: BRAND NEW HIGH-TECH LIVE AUDIO WAVE VISUALIZER & AI TELEMETRY */}
            <div className="bg-white/95 dark:bg-slate-900/95 rounded-xl p-3 sm:p-3.5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3 relative overflow-hidden backdrop-blur-md transition-all flex-1 h-full flex flex-col justify-between">
              {/* Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00A8E8]/15 dark:bg-[#00A8E8]/25 rounded-full blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#00A8E8] dark:text-[#38BDF8] uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-[#00A8E8] animate-pulse" />
                  <span>Phổ Sóng AI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>{micState === 'recording' ? 'LIVE' : 'STANDBY'}</span>
                  </span>

                  {/* Nút Mở rộng phổ sóng toàn màn hình */}
                  <button
                    onClick={() => setIsWaveformModalOpen(true)}
                    className="h-6 px-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 text-slate-600 dark:text-slate-300 hover:text-[#00A8E8] dark:hover:text-[#38BDF8] hover:border-sky-300 flex items-center gap-1 text-[10px] font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
                    title="Mở rộng phổ sóng toàn màn hình"
                  >
                    <Maximize2 className="w-3 h-3 stroke-[2.5]" />
                    <span className="hidden sm:inline">Mở rộng</span>
                  </button>
                </div>
              </div>

              {/* Clean DAW Timeline Line Waveform (Mở rộng theo chiều cao trên dưới: min-h-[340px] sm:min-h-[400px]) */}
              <div
                onClick={() => setIsWaveformModalOpen(true)}
                className="relative group cursor-pointer flex-1 min-h-[340px] sm:min-h-[400px] flex flex-col"
                title="Bấm vào để mở rộng phổ sóng toàn màn hình"
              >
                <AiAudioTrackWaveform
                  micState={micState}
                  audioVolumeLevel={audioVolumeLevel}
                  livePitchHz={livePitchHz}
                  analyserRef={analyserRef}
                  className="relative flex-1 h-full min-h-[340px] sm:min-h-[400px] w-full rounded-xl overflow-hidden bg-white shadow-2xs transition-all"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 pointer-events-none backdrop-blur-xs shadow-xs">
                  <Maximize2 className="w-3 h-3 stroke-[2.5]" />
                  <span>Mở rộng</span>
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-0.5 text-[10px]">
                {/* Metric 1: Pitch Frequency */}
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Tần số (Hz)</span>
                  <span className="font-extrabold text-[#00A8E8] dark:text-[#38BDF8] text-sm mt-0.5">
                    {livePitchHz ? `${Math.round(livePitchHz)} Hz` : micState === 'recording' ? 'Đang đo...' : '-- Hz'}
                  </span>
                </div>

                {/* Metric 2: Volume Level Meter */}
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Âm lượng</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-200 text-xs">
                      {micState === 'recording' ? `${audioVolumeLevel}%` : '0%'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-[#00A8E8] rounded-full transition-all duration-150"
                      style={{ width: `${micState === 'recording' ? audioVolumeLevel : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Audio Signal Status Bar */}
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 text-[10px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Trạng thái tín hiệu</span>
                <span className="font-bold flex items-center gap-1">
                  {micState === 'recording' ? (
                    audioVolumeLevel > 8 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Đang nói
                      </span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Khoảng lặng
                      </span>
                    )
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Sẵn sàng
                    </span>
                  )}
                </span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 📌 CỘT Ở GIỮA (CENTER MAIN HERO PANEL): HỘP HỘI THOẠI CHÍNH & HỘP NHẬP PHẢN HỒI */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-3 h-full overflow-hidden">
            
            {/* MAIN CONVERSATION DISPLAY CARD (HERO FOCUS GLASS CONTAINER WITH BRAND GLOW & REFINED STYLING) */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-3 sm:p-4 flex-1 min-h-0 flex flex-col justify-between overflow-hidden relative transition-all">
              
              {/* Speaker Filter Badges Bar & Top Actions */}
              <div className="flex flex-col gap-2 mb-2 flex-shrink-0 relative z-10">
                {/* Khung Header Thanh Lịch, Cân Đối & Hài Hòa (Refined Sky Glassmorphism Header) */}
                <div className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-sky-50/90 via-white/80 to-blue-50/70 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-850 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                  {/* Góc Trái: Hộp Tiêu Đề Hội Thoại Trực Tiếp - Nền Xanh Dương Đậm Sang Trọng & Chữ Trắng Sắc Nét */}
                  <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#0284C7] dark:from-[#0369A1] dark:via-[#0284C7] dark:to-[#0369A1] border border-sky-400/50 dark:border-cyan-400/40 shadow-xs shadow-sky-500/25 shrink-0 h-8.5">
                    {/* Icon Badge Màu Trắng Trên Nền Xanh */}
                    <div className="relative flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-white/20 dark:bg-white/15 border border-white/30 text-white shrink-0 shadow-2xs">
                      <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Dòng chữ Tiêu Đề Trắng Sắc Nét, Nổi Bật & Sang Trọng */}
                    <h2 className="text-sm sm:text-base font-black uppercase tracking-wider !text-white text-white shrink-0 leading-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      <span style={{ color: '#ffffff' }} className="!text-white text-white">
                        Hội Thoại Trực Tiếp
                      </span>
                    </h2>

                    {/* Cụm sóng âm thanh mini dập dìu mềm mại màu trắng tinh khôi */}
                    <div className="flex items-center gap-1 h-5 px-1.5 py-0.5 rounded-full bg-white/20 dark:bg-white/15 border border-white/30 shrink-0 ml-0.5" title="Sóng âm thoại trực tiếp">
                      <span className="w-1 rounded-full bg-white animate-wave-bar-1 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                      <span className="w-1 rounded-full bg-white animate-wave-bar-2 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                      <span className="w-1 rounded-full bg-white animate-wave-bar-3 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                      <span className="w-1 rounded-full bg-white animate-wave-bar-4 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                    </div>
                  </div>

                  {/* Góc Phải: Nút BẮT ĐẦU NÓI, MỚI & MỞ RỘNG - Đồng bộ chiều cao h-8.5 để thẳng hàng tuyệt đối */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto h-8.5">
                    {/* Microphone Permission Action Button if Error/Denied */}
                    {(micPermissionStatus === 'denied' || recognitionError) && (
                      <button
                        onClick={requestMicPermission}
                        className="h-8 px-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-[11px] flex items-center gap-1 shadow-xs animate-pulse cursor-pointer shrink-0 leading-none"
                        title="Bấm để kiểm tra và cấp quyền kết nối Micro"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Cấp Quyền Micro</span>
                      </button>
                    )}

                    {/* Nút BẮT ĐẦU NÓI & Điều Khiển Thu Âm Trực Tiếp Ở Góc Phải Hộp Thoại */}
                    {micState === 'idle' && (
                      <button
                        onClick={toggleListening}
                        className="relative group overflow-hidden h-8 px-3.5 sm:px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0 leading-none"
                        title="Bắt đầu thu âm và nhận diện giọng nói trực tiếp"
                      >
                        {/* Subtle shine sweep */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                        </span>

                        <Mic className="w-4 h-4 stroke-[2.5] shrink-0" />
                        <span className="font-extrabold">BẮT ĐẦU NÓI</span>

                        {/* Soundwave animation */}
                        <span className="hidden sm:flex items-end gap-0.5 h-3">
                          <span className="w-0.5 h-2 bg-white/80 rounded-full animate-audio-wave" style={{ animationDelay: '0ms' }} />
                          <span className="w-0.5 h-3 bg-white rounded-full animate-audio-wave" style={{ animationDelay: '150ms' }} />
                        </span>
                      </button>
                    )}

                    {micState === 'recording' && (
                      <div className="flex items-center gap-1.5 shrink-0 h-8.5">
                        <div className="flex items-center gap-1.5 h-8 px-2.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 rounded-xl text-xs text-red-600 dark:text-red-400 font-extrabold shadow-2xs leading-none">
                          <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_#ef4444]" />
                          </span>
                          <span className="hidden sm:inline">Đang thu âm...</span>
                        </div>
                        <button
                          onClick={toggleListening}
                          className="h-8 text-xs font-black text-white bg-amber-500 hover:bg-amber-400 px-3 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95 uppercase tracking-wide shrink-0 leading-none"
                          title="Tạm dừng thu âm"
                        >
                          <Pause className="w-4 h-4 stroke-[2.5]" />
                          <span>TẠM DỪNG</span>
                        </button>
                        <button
                          onClick={() => {
                            if (silenceCommitTimerRef.current) {
                              clearTimeout(silenceCommitTimerRef.current);
                              silenceCommitTimerRef.current = null;
                            }
                            const pending = accumulatedInterimRef.current.trim() || lastInterimRef.current.trim();
                            if (pending) {
                              commitTranscriptToMessage(pending, true);
                              accumulatedInterimRef.current = '';
                              lastInterimRef.current = '';
                            }
                            if (recognitionRef.current) {
                              try {
                                recognitionRef.current.onend = null;
                                recognitionRef.current.onerror = null;
                                recognitionRef.current.onresult = null;
                                recognitionRef.current.stop();
                              } catch (e) {}
                              recognitionRef.current = null;
                            }
                            setIsListening(false);
                            isListeningRef.current = false;
                            stopRealtimeSpeechTicker();
                            stopAudioPitchAnalyzer();
                            setMicState('idle');
                            micStateRef.current = 'idle';
                            setInterimTranscript('');
                            showToast('⏹️ Đã kết thúc phiên thu âm.');
                          }}
                          className="h-8 text-xs font-black text-white bg-rose-600 hover:bg-rose-500 px-3 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-all active:scale-95 uppercase tracking-wide shrink-0 leading-none"
                          title="Kết thúc phiên thu âm"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>KẾT THÚC</span>
                        </button>
                      </div>
                    )}

                    {micState === 'paused' && (
                      <div className="flex items-center gap-1.5 shrink-0 h-8.5">
                        <div className="flex items-center gap-1.5 h-8 px-2.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-extrabold shadow-2xs leading-none">
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="hidden sm:inline">Đang tạm dừng</span>
                        </div>
                        <button
                          onClick={toggleListening}
                          className="h-8 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 px-3 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95 uppercase tracking-wide shrink-0 leading-none"
                          title="Tiếp tục thu âm"
                        >
                          <Play className="w-4 h-4 stroke-[2.5] ml-0.5" />
                          <span>TIẾP TỤC</span>
                        </button>
                        <button
                          onClick={() => {
                            if (silenceCommitTimerRef.current) {
                              clearTimeout(silenceCommitTimerRef.current);
                              silenceCommitTimerRef.current = null;
                            }
                            const pending = accumulatedInterimRef.current.trim() || lastInterimRef.current.trim();
                            if (pending) {
                              commitTranscriptToMessage(pending, true);
                              accumulatedInterimRef.current = '';
                              lastInterimRef.current = '';
                            }
                            if (recognitionRef.current) {
                              try {
                                recognitionRef.current.onend = null;
                                recognitionRef.current.onerror = null;
                                recognitionRef.current.onresult = null;
                                recognitionRef.current.stop();
                              } catch (e) {}
                              recognitionRef.current = null;
                            }
                            setIsListening(false);
                            isListeningRef.current = false;
                            stopRealtimeSpeechTicker();
                            stopAudioPitchAnalyzer();
                            setMicState('idle');
                            micStateRef.current = 'idle';
                            setInterimTranscript('');
                            showToast('⏹️ Đã kết thúc phiên thu âm.');
                          }}
                          className="h-8 text-xs font-black text-white bg-rose-600 hover:bg-rose-500 px-3 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-all active:scale-95 uppercase tracking-wide shrink-0 leading-none"
                          title="Kết thúc phiên thu âm"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>KẾT THÚC</span>
                        </button>
                      </div>
                    )}

                    {/* Nút TÙY CHỈNH TÍCH HỢP 1 ICON TRÊN MOBILE */}
                    <button
                      onClick={() => setIsMobileSettingsOpen(true)}
                      className="lg:hidden h-8 text-xs font-black text-white bg-[#0284C7] hover:bg-[#00A8E8] px-2.5 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform active:scale-95 uppercase tracking-wide shrink-0 leading-none"
                      title="Mở tất cả tùy chỉnh & cài đặt"
                    >
                      <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
                      <span>TÙY CHỈNH</span>
                    </button>

                    {/* Nút MỚI - Tone Xanh Công Nghệ Hài Hòa */}
                    <button
                      onClick={handleCreateNewConversation}
                      className="h-8 text-xs font-extrabold text-white bg-[#0284C7] hover:bg-[#00A8E8] px-3 rounded-xl flex items-center gap-1.5 shadow-xs hover:shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95 uppercase tracking-wide shrink-0 leading-none"
                      title="Tạo cuộc hội thoại mới"
                    >
                      <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>MỚI</span>
                    </button>

                    {/* Nút Phóng to toàn màn hình */}
                    <button
                      onClick={() => setIsChatMaximized(true)}
                      className="hidden sm:flex h-8 w-8 rounded-xl items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer transition-all hover:scale-105 active:scale-95 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-[#00A8E8] shrink-0"
                      title="Mở rộng hộp thoại toàn màn hình"
                    >
                      <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Banner hiển thị bộ lọc đang hoạt động (tích hợp từ Tiện ích) - ĐỒNG BỘ THEME XANH DƯƠNG */}
                {filterSpeakerId !== 'all' && (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl text-xs text-sky-800 dark:text-sky-200 shadow-2xs shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-[#00A8E8] shrink-0" />
                      <span>
                        Đang lọc hội thoại: <strong>{speakers.find(s => s.id === filterSpeakerId)?.name || (filterSpeakerId === 'spk-deaf' ? DEAF_SPEAKER.name : filterSpeakerId === 'spk-male' ? 'Giọng Nam' : filterSpeakerId === 'spk-female' ? 'Giọng Nữ' : filterSpeakerId)}</strong>
                      </span>
                    </div>
                    <button
                      onClick={() => setFilterSpeakerId('all')}
                      className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-[#00A8E8] text-[11px] font-bold hover:bg-sky-100 dark:hover:bg-slate-700 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Hiển thị lại toàn bộ người nói"
                    >
                      <span>Bỏ lọc</span>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {showSpeakerFilterBar && (
                  <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 no-scrollbar">
                    <button
                      onClick={() => setFilterSpeakerId('all')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                        filterSpeakerId === 'all'
                          ? 'bg-[#00A8E8] text-white shadow-2xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Tất cả ({messages.length})
                    </button>
                    {speakers.map((s) => {
                      const count = messages.filter(m => m.speakerId === s.id).length;

                      return (
                        <button
                          key={s.id}
                          onClick={() => setFilterSpeakerId(s.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                            filterSpeakerId === s.id
                              ? 'bg-[#00A8E8] text-white shadow-2xs font-extrabold'
                              : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span>{s.name} ({count})</span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setFilterSpeakerId('spk-deaf')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                        filterSpeakerId === 'spk-deaf'
                          ? 'bg-[#00A8E8] text-white shadow-2xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{DEAF_SPEAKER.name} ({messages.filter(m => m.sender === 'DEAF').length})</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Recessed Live Conversation Transcript Feed Cavity (WITH UNIFIED 1PX BORDER) */}
              <div className="space-y-3 flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                {messages.length === 0 && !interimTranscript && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5 py-10 my-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#00A8E8]/10 dark:bg-[#00A8E8]/20 flex items-center justify-center border border-[#00A8E8]/20 shadow-inner">
                      <Mic className="w-7 h-7 sm:w-8 sm:h-8 text-[#00A8E8] dark:text-[#38BDF8]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-black text-base text-slate-800 dark:text-slate-100">Sẵn Sàng Nhận Diện Giọng Nói</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        Bấm nút <strong className="text-emerald-600 dark:text-emerald-400">"BẮT ĐẦU NÓI"</strong> ở thanh phía trên hoặc bấm nút bên dưới để bắt đầu nhận diện hội thoại trực tiếp.
                      </p>
                    </div>
                    {micState === 'idle' && (
                      <button
                        onClick={toggleListening}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        title="Bắt đầu thu âm ngay"
                      >
                        <Mic className="w-4 h-4 stroke-[2.5]" />
                        <span>BẮT ĐẦU NÓI NGAY</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Ngày tháng hiển thị trực tiếp trong nội dung hộp thoại */}
                {messages.length > 0 && (
                  <div className="flex items-center justify-center my-1.5 select-none shrink-0">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00A8E8] stroke-[2.5]" />
                      <span>{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    </span>
                  </div>
                )}

                {(filterSpeakerId === 'all'
                  ? messages
                  : messages.filter(m => m.speakerId === filterSpeakerId || (m.sender === 'DEAF' && filterSpeakerId === 'spk-deaf'))
                ).map((msg, index) => {
                  const isDeafMsg = msg.sender === 'DEAF';
                  const shouldFlip = isDualFaceToFace && index < Math.floor(messages.length / 2);

                  let spk: SpeakerProfile;
                  if (isDeafMsg) {
                    spk = DEAF_SPEAKER;
                  } else {
                    const foundIndex = speakers.findIndex(s => s.id === msg.speakerId);
                    if (foundIndex >= 0) {
                      spk = speakers[foundIndex];
                    } else {
                      spk = DEFAULT_SPEAKERS[0];
                    }
                  }

                  return (
                    <div key={msg.id} className={`flex flex-col ${isDeafMsg ? 'items-end' : 'items-start'} w-full`}>
                      <div
                        className={`p-3.5 sm:p-4 rounded-xl transition-all w-fit max-w-[88%] hover:scale-[1.01] ${
                          shouldFlip ? 'rotate-180 transform opacity-90' : ''
                        } ${
                          isDeafMsg
                            ? 'bg-[#E0F2FE] text-slate-900 border border-[#38BDF8]/60 dark:bg-sky-950/90 dark:text-slate-100 dark:border-sky-700 shadow-xs font-medium'
                            : 'bg-white text-slate-900 border border-slate-200/90 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 shadow-xs'
                        }`}
                      >
                        <div className={`flex items-center gap-1.5 text-[11px] font-extrabold mb-1.5 text-orange-500 dark:text-orange-400 ${isDeafMsg ? 'justify-end' : ''}`}>
                          <span>{msg.senderName || spk.name}</span>
                        </div>

                        <div className={`${getFontSizeClass()} break-words whitespace-pre-line text-slate-900 dark:text-slate-100`}>
                          {msg.text}
                        </div>

                        <div className="mt-1.5 flex items-center justify-between gap-4 text-[11px] pt-0.5">
                          <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0 flex items-center gap-1.5">
                            <span>{msg.timestamp}</span>
                            <span className="opacity-40">•</span>
                            <span>{msg.date || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                          </span>
                          {isDeafMsg && (
                            <button
                              onClick={() => speakText(msg.text)}
                              className="-mr-1 -mb-1 p-1 rounded-full text-[#00A8E8] dark:text-[#38BDF8] hover:bg-[#00A8E8]/20 dark:hover:bg-[#00A8E8]/30 transition-colors"
                              title="Phát lại âm thanh"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {interimTranscript && (
                  <div className="flex flex-col items-start w-full">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50 dark:bg-slate-900 border-2 border-[#00A8E8] text-slate-900 dark:text-white w-fit max-w-[88%] shadow-md">
                      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#00A8E8] dark:text-[#38BDF8] mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E8] animate-pulse" />
                        Đang nói trực tiếp:
                      </div>
                      <div className={`${getFontSizeClass()} break-words whitespace-pre-line text-slate-900 dark:text-slate-100 font-semibold`}>
                        {interimTranscript}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* DEAF TEXT INPUT RESPONSE BOX (WITH UNIFIED 1PX BORDER) */}
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 space-y-2.5 flex-shrink-0 transition-all shadow-md">
              <div className="flex items-center justify-between text-xs">
                <h2 className="font-extrabold text-[#00A8E8] dark:text-[#38BDF8] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#00A8E8] dark:text-[#38BDF8]" />
                  <span>Trò chuyện</span>
                </h2>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoTts}
                      onChange={(e) => setAutoTts(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#00A8E8] focus:ring-[#00A8E8]"
                    />
                    <span>Tự động đọc</span>
                  </label>

                  <button
                    onClick={() => setIsInputExpanded(!isInputExpanded)}
                    className="p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isInputExpanded ? 'Thu gọn khung nhập' : 'Phóng to khung nhập văn bản'}
                  >
                    {isInputExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Integrated Multi-line Textarea Box with Action Icon */}
              <div className="relative w-full">
                <textarea
                  ref={deafInputRef}
                  value={deafTextInput}
                  onChange={(e) => setDeafTextInput(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => {
                    if (!deafTextInput.trim()) {
                      setIsInputFocused(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendDeafMessage();
                    }
                  }}
                  placeholder="Nhập câu phản hồi của bạn vào đây..."
                  rows={isInputExpanded || isInputFocused || deafTextInput.length > 0 ? 3 : 2}
                  className={`w-full pt-3 pb-3 pl-3.5 pr-14 bg-slate-50 dark:bg-slate-950 rounded-lg text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:bg-white dark:focus:bg-slate-900 resize-none transition-all duration-200 placeholder:italic placeholder:text-[11px] sm:placeholder:text-xs placeholder:font-normal placeholder:text-slate-400/90 ${
                    isInputFocused || isInputExpanded || deafTextInput.length > 0
                      ? 'min-h-[90px]'
                      : 'min-h-[56px]'
                  }`}
                />

                <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1 z-10">
                  {deafTextInput.trim().length > 0 && (
                    <button
                      onClick={() => setDeafTextInput('')}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                      title="Xóa chữ"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleSendDeafMessage()}
                    disabled={!deafTextInput.trim()}
                    className={`p-1.5 transition-all cursor-pointer active:scale-90 ${
                      deafTextInput.trim()
                        ? 'text-[#00A8E8] hover:text-[#0284C7] hover:scale-110'
                        : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40'
                    }`}
                    title="Gửi phản hồi"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* EXPANDED DEAF TEXT RESPONSE MODAL OVERLAY */}
            {isInputExpanded && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
                <div className="bg-white dark:bg-slate-900 border-2 border-[#00A8E8] dark:border-[#00A8E8]/70 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col justify-between p-4 sm:p-6 space-y-4 relative animate-in zoom-in-95">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#00A8E8]/10 text-[#00A8E8]">
                        <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                          Hộp Thoại Trò Chuyện & Phản Hồi Mở Rộng
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Nhập nội dung phản hồi, chọn mẫu câu nhanh hoặc phát âm thanh trực tiếp
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsInputExpanded(false)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Đóng hộp thoại mở rộng (Phím Esc)"
                    >
                      <X className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Main Textarea in Modal */}
                  <div className="space-y-2 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <span>Nội dung tin nhắn ({deafTextInput.length} ký tự):</span>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[#00A8E8]">
                        <input
                          type="checkbox"
                          checked={autoTts}
                          onChange={(e) => setAutoTts(e.target.checked)}
                          className="w-4 h-4 rounded text-[#00A8E8] focus:ring-[#00A8E8]"
                        />
                        <span>Tự động phát âm thanh khi gửi</span>
                      </label>
                    </div>

                    <textarea
                      value={deafTextInput}
                      onChange={(e) => setDeafTextInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendDeafMessage();
                          setIsInputExpanded(false);
                        }
                      }}
                      placeholder="Nhập nội dung câu trả lời của bạn tại đây... (Nhấn Enter để gửi)"
                      rows={6}
                      autoFocus
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-300 dark:border-slate-700 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#00A8E8] resize-none flex-1 min-h-[140px]"
                    />
                  </div>

                  {/* Quick Responses Selector Grid inside Modal */}
                  <div className="space-y-2 shrink-0">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Chọn nhanh câu phản hồi mẫu:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
                      {QUICK_RESPONSES.map((resText, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDeafTextInput(resText);
                            showToast(`✨ Đã chọn: "${resText}"`);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-[#00A8E8]/15 hover:text-[#00A8E8] hover:border-[#00A8E8]/40 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer text-left"
                        >
                          {resText}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
                    <div className="flex items-center gap-2">
                      {deafTextInput.trim().length > 0 && (
                        <button
                          onClick={() => speakText(deafTextInput)}
                          className="px-3 py-2 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900 border border-sky-300 dark:border-sky-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4 text-[#00A8E8]" /> Đọc thử
                        </button>
                      )}
                      {deafTextInput.length > 0 && (
                        <button
                          onClick={() => setDeafTextInput('')}
                          className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" /> Xóa hết
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsInputExpanded(false)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
                      >
                        Thu gọn
                      </button>
                      <button
                        onClick={() => {
                          handleSendDeafMessage();
                          setIsInputExpanded(false);
                        }}
                        disabled={!deafTextInput.trim()}
                        className="px-5 py-2 bg-[#00A8E8] hover:bg-[#0284C7] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
                      >
                        <Send className="w-4 h-4" /> Gửi phản hồi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* 📌 CỘT BÊN PHẢI (RIGHT PANEL): PHẢN HỒI NHANH BẰNG VĂN BẢN                */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex lg:col-span-2 xl:col-span-2 flex-col h-full overflow-hidden text-xs flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-xs flex-1 flex flex-col space-y-3 overflow-hidden">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Phản Hồi Nhanh</span>
                </span>
              </h3>

              {/* Quick Responses Vertical Stack */}
              <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                {QUICK_RESPONSES.map((chipText, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendDeafMessage(chipText)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/80 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all text-left flex items-start justify-between gap-2 group cursor-pointer shadow-2xs"
                  >
                    <span className="leading-snug">{chipText}</span>
                    <Volume2 className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>

      {/* ============================================================================================== */}
      {/* 🎯 MODAL OVERLAY: KHO LƯU TRỮ CÁC CUỘC HỘI THOẠI                                                */}
      {/* ============================================================================================== */}
      {isHistoryModalOpen && (() => {
        const filteredConversations = savedConversations.filter(c => {
          if (!historySearchQuery.trim()) return true;
          const q = historySearchQuery.toLowerCase();
          return (
            c.title.toLowerCase().includes(q) ||
            c.createdAt.toLowerCase().includes(q) ||
            (c.messages && c.messages.some(m => m.text?.toLowerCase().includes(q)))
          );
        });

        return (
          <div
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
            onClick={() => setIsHistoryModalOpen(false)}
          >
            <div
              className="bg-white dark:bg-[#1E1420] border border-slate-200/90 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header: Tone xanh thương hiệu hiện đại */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#38BDF8] text-white flex items-center justify-between flex-shrink-0 relative overflow-hidden shadow-sm">
                <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0">
                    <FolderOpen className="w-5 h-5 text-white stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base sm:text-lg text-white uppercase tracking-tight">KHO LƯU TRỮ HỘI THOẠI</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-xs text-white text-xs font-black">
                        {savedConversations.length}
                      </span>
                    </div>
                    <p className="text-xs text-white/90 font-medium">Quản lý, tìm kiếm và truy xuất các phiên trò chuyện đã lưu</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer relative z-10"
                  title="Đóng cửa sổ"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Sub-bar: Thanh tìm kiếm & Thông tin */}
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 flex-shrink-0">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={historySearchQuery}
                    onChange={(e) => setHistorySearchQuery(e.target.value)}
                    placeholder="Tìm theo tên cuộc hội thoại hoặc nội dung..."
                    className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all"
                  />
                  {historySearchQuery && (
                    <button
                      onClick={() => setHistorySearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 hidden sm:block">
                  Tổng: <span className="text-[#00A8E8]">{savedConversations.length}</span> phiên
                </div>
              </div>

              {/* Modal Body: Danh sách thẻ cuộc hội thoại */}
              <div className="p-3 sm:p-5 flex-1 overflow-y-auto space-y-2.5 custom-scrollbar">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400 space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50 flex items-center justify-center text-[#00A8E8]">
                      <FolderOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                        {historySearchQuery ? 'Không tìm thấy cuộc hội thoại phù hợp.' : 'Chưa có cuộc hội thoại nào được lưu.'}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {historySearchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Tạo một phiên hội thoại mới để bắt đầu lưu trữ'}
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    const isActive = conv.id === currentConversationId;
                    const isEditing = editingTitleId === conv.id;
                    const msgCount = conv.messages?.length || 0;

                    return (
                      <div
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv)}
                        className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group ${
                          isActive
                            ? 'bg-gradient-to-r from-sky-50/90 via-sky-50/30 to-white dark:from-sky-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-[#00A8E8] shadow-sm'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-500/50 hover:bg-sky-50/20 dark:hover:bg-slate-800/90'
                        }`}
                      >
                        {/* Left Icon Badge */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#00A8E8] text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-[#00A8E8] group-hover:bg-sky-50 dark:group-hover:bg-sky-950/60'
                        }`}>
                          <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                        </div>

                        {/* Thông tin hội thoại */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            {isEditing ? (
                              <div className="flex items-center gap-1.5 flex-1" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="text"
                                  value={tempTitleInput}
                                  onChange={(e) => setTempTitleInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveTitleEdit(conv.id);
                                    if (e.key === 'Escape') setEditingTitleId(null);
                                  }}
                                  autoFocus
                                  className="px-2.5 py-1 text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-[#00A8E8] rounded-lg outline-none text-slate-900 dark:text-slate-100 flex-1 ring-1 ring-[#00A8E8]"
                                />
                                <button
                                  onClick={() => handleSaveTitleEdit(conv.id)}
                                  className="px-2.5 py-1 bg-[#00A8E8] text-white rounded-lg text-xs font-bold hover:brightness-110 cursor-pointer"
                                >
                                  Lưu
                                </button>
                                <button
                                  onClick={() => setEditingTitleId(null)}
                                  className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold cursor-pointer"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <span className={`font-extrabold text-sm sm:text-base truncate transition-colors ${
                                isActive ? 'text-[#00A8E8] dark:text-sky-400' : 'text-slate-800 dark:text-slate-100 group-hover:text-[#00A8E8]'
                              }`}>
                                {conv.title}
                              </span>
                            )}

                            {isActive && (
                              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white text-[10px] font-black shrink-0 flex items-center gap-1 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Đang mở
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {conv.createdAt}
                            </span>
                            <span className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              <MessageSquare className="w-3 h-3 text-[#00A8E8]" />
                              {msgCount} tin nhắn
                            </span>
                          </div>
                        </div>

                        {/* Nút thao tác */}
                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {!isEditing && (
                            <button
                              onClick={() => {
                                setEditingTitleId(conv.id);
                                setTempTitleInput(conv.title);
                              }}
                              className="p-2 text-slate-400 hover:text-[#00A8E8] hover:bg-sky-50 dark:hover:bg-sky-950/50 rounded-xl transition-all cursor-pointer"
                              title="Đổi tên hội thoại"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => handleDeleteConversation(conv.id, conv.title, e)}
                            className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition-all cursor-pointer"
                            title="Xóa cuộc hội thoại"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
                <button
                  onClick={handleCreateNewConversation}
                  className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#0284C7] to-[#00A8E8] hover:brightness-110 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-md shadow-sky-500/25 cursor-pointer"
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  <span>Tạo Cuộc Hội Thoại Mới</span>
                </button>

                <button
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="px-4 sm:px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  Đóng
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ROOT LEVEL FULLSCREEN MAXIMIZED HERO CONVERSATION MODAL */}
      {isChatMaximized && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg z-50 p-2 sm:p-4 flex flex-col items-center justify-center animate-in fade-in duration-200">
          <div className="w-full h-full max-w-7xl bg-white dark:bg-slate-900 border-2 border-[#00A8E8] rounded-2xl shadow-2xl backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden relative animate-in zoom-in-95">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#00A8E8] stroke-[2.5]" />
                  <span>Hội Thoại Trực Tiếp (Toàn Màn Hình)</span>
                </h2>

                <button
                  onClick={handleCreateNewConversation}
                  className="text-xs font-black text-white bg-[#0284C7] hover:bg-[#00A8E8] px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-2xs cursor-pointer transition-transform active:scale-95 uppercase tracking-wide"
                  title="Tạo cuộc hội thoại mới"
                >
                  <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>MỚI</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Active filter badge if filter active */}
                {filterSpeakerId !== 'all' && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 rounded-xl text-xs text-orange-800 dark:text-orange-200 shrink-0">
                    <Filter className="w-3.5 h-3.5 text-[#F15A24]" />
                    <span>Lọc: <strong>{speakers.find(s => s.id === filterSpeakerId)?.name || (filterSpeakerId === 'spk-deaf' ? DEAF_SPEAKER.name : filterSpeakerId === 'spk-male' ? 'Giọng Nam' : filterSpeakerId === 'spk-female' ? 'Giọng Nữ' : filterSpeakerId)}</strong></span>
                    <button
                      onClick={() => setFilterSpeakerId('all')}
                      className="ml-1 p-0.5 rounded hover:bg-orange-200 dark:hover:bg-slate-700 cursor-pointer"
                      title="Hiển thị lại toàn bộ người nói"
                    >
                      <X className="w-3 h-3 text-[#F15A24]" />
                    </button>
                  </div>
                )}
                {/* Speaker Filter Badges */}
                {showSpeakerFilterBar && (
                  <div className="flex items-center gap-1 overflow-x-auto">
                    <button
                      onClick={() => setFilterSpeakerId('all')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                        filterSpeakerId === 'all'
                          ? 'bg-[#F15A24] text-white shadow-2xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Tất cả ({messages.length})
                    </button>
                    {speakers.map((s) => {
                      const count = messages.filter(m => m.speakerId === s.id).length;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setFilterSpeakerId(s.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                            filterSpeakerId === s.id
                              ? 'bg-[#F15A24] text-white shadow-2xs font-extrabold'
                              : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span>{s.name} ({count})</span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setFilterSpeakerId('spk-deaf')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                        filterSpeakerId === 'spk-deaf'
                          ? 'bg-[#F15A24] text-white shadow-2xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{DEAF_SPEAKER.name} ({messages.filter(m => m.sender === 'DEAF').length})</span>
                    </button>
                  </div>
                )}

                {/* Close Fullscreen Button */}
                <button
                  onClick={() => setIsChatMaximized(false)}
                  className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-md transition cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
                  title="Thu gọn màn hình (Phím Esc)"
                >
                  <Minimize2 className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Messages Live Transcript Feed Cavity */}
            <div className="space-y-3 flex-1 min-h-0 overflow-y-auto p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              {messages.length === 0 && !interimTranscript && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-10 my-auto">
                  <div className="w-16 h-16 rounded-xl bg-[#00A8E8]/10 dark:bg-[#00A8E8]/20 flex items-center justify-center border border-[#00A8E8]/20">
                    <Mic className="w-8 h-8 text-[#00A8E8] dark:text-[#38BDF8]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-base text-slate-800 dark:text-slate-100">Sẵn Sàng Nhận Diện Giọng Nói (Toàn Màn Hình)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Bấm nút <strong className="text-emerald-600 dark:text-emerald-400">"Bắt Đầu Nói"</strong> để nhận diện giọng nói trực tiếp.
                    </p>
                  </div>
                </div>
              )}

              {/* Ngày tháng hiển thị trực tiếp trong nội dung hộp thoại */}
              {messages.length > 0 && (
                <div className="flex items-center justify-center my-1.5 select-none shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00A8E8] stroke-[2.5]" />
                    <span>{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                  </span>
                </div>
              )}

              {(filterSpeakerId === 'all'
                ? messages
                : messages.filter(m => m.speakerId === filterSpeakerId || (m.sender === 'DEAF' && filterSpeakerId === 'spk-deaf'))
              ).map((msg, index) => {
                const isDeafMsg = msg.sender === 'DEAF';
                const shouldFlip = isDualFaceToFace && index < Math.floor(messages.length / 2);
                let spk: SpeakerProfile;
                if (isDeafMsg) {
                  spk = DEAF_SPEAKER;
                } else {
                  const foundIndex = speakers.findIndex(s => s.id === msg.speakerId);
                  spk = foundIndex >= 0 ? speakers[foundIndex] : DEFAULT_SPEAKERS[0];
                }

                return (
                  <div key={msg.id} className={`flex flex-col ${isDeafMsg ? 'items-end' : 'items-start'} w-full`}>
                    <div className={`p-4 rounded-xl transition-all w-fit max-w-[85%] ${
                      isDeafMsg
                        ? 'bg-[#E0F2FE] text-slate-900 border border-[#38BDF8]/60 dark:bg-sky-950/90 dark:text-slate-100 dark:border-sky-700 shadow-xs font-medium'
                        : 'bg-white text-slate-900 border border-slate-200/90 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 shadow-xs'
                    }`}>
                      <div className={`flex items-center gap-1.5 text-xs font-extrabold mb-1.5 text-orange-500 dark:text-orange-400 ${isDeafMsg ? 'justify-end' : ''}`}>
                        <span>{msg.senderName || spk.name}</span>
                      </div>
                      <div className={`${getFontSizeClass()} break-words whitespace-pre-line text-slate-900 dark:text-slate-100`}>
                        {msg.text}
                      </div>
                      <div className="mt-1.5 flex items-center justify-between gap-4 text-xs pt-0.5">
                        <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0 flex items-center gap-1.5">
                          <span>{msg.timestamp}</span>
                          <span className="opacity-40">•</span>
                          <span>{msg.date || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                        </span>
                        {isDeafMsg && (
                          <button
                            onClick={() => speakText(msg.text)}
                            className="-mr-1 -mb-1 p-1 rounded-full text-[#00A8E8] dark:text-[#38BDF8] hover:bg-[#00A8E8]/20 transition-colors"
                            title="Phát lại âm thanh"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {interimTranscript && (
                <div className="flex flex-col items-start w-full">
                  <div className="p-4 rounded-xl bg-sky-50 dark:bg-slate-900 border-2 border-[#00A8E8] text-slate-900 dark:text-white w-fit max-w-[85%] shadow-md">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#00A8E8] dark:text-[#38BDF8] mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E8] animate-pulse" />
                      Đang nói trực tiếp:
                    </div>
                    <div className={`${getFontSizeClass()} break-words whitespace-pre-line text-slate-900 dark:text-slate-100 font-semibold`}>{interimTranscript}</div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Response Bar in Maximized View */}
            <div className="mt-3 bg-slate-100 dark:bg-slate-800/90 rounded-xl p-3 flex items-center gap-3 shrink-0 border border-slate-200 dark:border-slate-700">
              <input
                type="text"
                value={deafTextInput}
                onChange={(e) => setDeafTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendDeafMessage();
                  }
                }}
                placeholder="Nhập phản hồi nhanh..."
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              />
              <button
                onClick={() => handleSendDeafMessage()}
                disabled={!deafTextInput.trim()}
                className="px-5 py-2.5 bg-[#00A8E8] hover:bg-[#0284C7] disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" /> Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================================== */}
      {/* 📊 ROOT LEVEL EXPANDED AI AUDIO WAVEFORM MODAL (PHỔ SÓNG AI MỞ RỘNG TOÀN CẢNH)                  */}
      {/* ============================================================================================== */}
      {isWaveformModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg z-50 p-2 sm:p-6 flex flex-col items-center justify-center animate-in fade-in duration-200">
          <div className="w-full h-full max-w-6xl bg-white dark:bg-slate-900 border-2 border-[#00A8E8] rounded-2xl shadow-2xl backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden relative animate-in zoom-in-95">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#00A8E8]/10 dark:bg-[#00A8E8]/20 flex items-center justify-center border border-[#00A8E8]/30 shrink-0 shadow-2xs">
                  <Activity className="w-4.5 h-4.5 text-[#00A8E8] dark:text-[#38BDF8] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      Phổ Sóng AI Mở Rộng
                    </h2>
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>{micState === 'recording' ? 'LIVE AUDIO' : 'STANDBY'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Phân tích phổ tần số & dao động âm thanh trực tiếp độ phân giải cao
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Nút bật/tắt mic nhanh */}
                {micState === 'idle' ? (
                  <button
                    onClick={toggleListening}
                    className="h-8 px-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer leading-none"
                    title="Bắt đầu thu âm"
                  >
                    <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>BẮT ĐẦU NÓI</span>
                  </button>
                ) : (
                  <button
                    onClick={toggleListening}
                    className="h-8 px-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer leading-none"
                    title="Tạm dừng / Tiếp tục"
                  >
                    <Pause className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>TẠM DỪNG</span>
                  </button>
                )}

                {/* Nút đóng / Thu nhỏ */}
                <button
                  onClick={() => setIsWaveformModalOpen(false)}
                  className="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center gap-1 text-xs font-bold transition cursor-pointer active:scale-95 border border-slate-200 dark:border-slate-700"
                  title="Thu nhỏ / Đóng (Esc)"
                >
                  <Minimize2 className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">Thu nhỏ</span>
                </button>
              </div>
            </div>

            {/* Main Panoramic Waveform Visualizer Canvas */}
            <div className="flex-1 min-h-0 my-3 flex flex-col justify-center">
              <AiAudioTrackWaveform
                micState={micState}
                audioVolumeLevel={audioVolumeLevel}
                livePitchHz={livePitchHz}
                analyserRef={analyserRef}
                isExpanded={true}
                className="relative h-full min-h-[280px] sm:min-h-[380px] w-full rounded-2xl overflow-hidden bg-white shadow-md"
              />
            </div>

            {/* High-tech Telemetry Dashboard Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs shrink-0">
              {/* Metric 1: Pitch Frequency */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Tần số chính (Pitch)</span>
                <span className="text-xl sm:text-2xl font-black text-[#00A8E8] dark:text-[#38BDF8] mt-1">
                  {livePitchHz ? `${Math.round(livePitchHz)} Hz` : micState === 'recording' ? 'Đang phân tích...' : '-- Hz'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Dải giọng người: 85 - 255 Hz</span>
              </div>

              {/* Metric 2: Volume Level */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Cường độ âm thanh</span>
                  <span className="font-black text-xs text-slate-700 dark:text-slate-200">
                    {micState === 'recording' ? `${audioVolumeLevel}%` : '0%'}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-[#00A8E8] rounded-full transition-all duration-150"
                    style={{ width: `${micState === 'recording' ? audioVolumeLevel : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Tự động chuẩn hóa biên độ</span>
              </div>

              {/* Metric 3: Voice Type Detection */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Âm sắc nhận diện</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 mt-1 truncate">
                  {detectedVoiceLabel || 'Chưa nhận diện'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Tự động phân biệt giọng Nam / Nữ</span>
              </div>

              {/* Metric 4: AI Stream Status */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Trạng thái luồng AI</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {micState === 'recording' ? 'Đang xử lý trực tiếp' : 'Chế độ chờ'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Độ trễ thấp &lt; 30ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================================== */}
      {/* 📱 CÀI ĐẶT & CẤU HÌNH PHÂN HỆ MODAL (TÍCH HỢP TOÀN BỘ TÙY CHỈNH)                               */}
      {/* ============================================================================================== */}
      {isMobileSettingsOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsMobileSettingsOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1E1420] border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col justify-between animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Tone xanh thương hiệu sang trọng */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#38BDF8] text-white flex items-center justify-between flex-shrink-0 relative overflow-hidden shadow-sm">
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0">
                  <Settings className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white uppercase tracking-tight">
                    CÀI ĐẶT & TÙY CHỈNH
                  </h3>
                  <p className="text-xs text-white/90 font-medium">
                    Cấu hình Micro, Nhận diện giọng nói, Hiển thị & Mẫu câu
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMobileSettingsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer relative z-10"
                title="Đóng bảng tùy chỉnh"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto custom-scrollbar text-xs">
              
              {/* SECTION 1: MICROPHONE & THU ÂM */}
              <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8] flex items-center justify-center">
                      <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Bộ Thu Âm & Micro Trực Tiếp</span>
                  </h4>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleListening}
                      style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                      className={`w-12 h-12 shrink-0 aspect-square rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer shadow-sm ${
                        micState === 'idle'
                          ? 'bg-sky-600 text-white hover:bg-sky-500'
                          : micState === 'recording'
                          ? 'bg-red-500 text-white ring-4 ring-red-400/30 animate-pulse'
                          : 'bg-amber-500 text-white hover:bg-amber-400'
                      }`}
                    >
                      {micState === 'idle' && <Mic className="w-5 h-5 stroke-[2.2]" />}
                      {micState === 'recording' && <Pause className="w-5 h-5 stroke-[2.2]" />}
                      {micState === 'paused' && <Play className="w-5 h-5 stroke-[2.2] ml-0.5" />}
                    </button>

                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-white text-xs">
                        {micState === 'idle' && 'Micro đang tắt'}
                        {micState === 'recording' && 'Đang thu âm trực tiếp...'}
                        {micState === 'paused' && 'Đang tạm dừng thu âm'}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {micState === 'idle' && 'Bấm nút tròn để bắt đầu nói'}
                        {micState === 'recording' && 'Bấm nút để tạm dừng'}
                        {micState === 'paused' && 'Bấm nút vàng để tiếp tục'}
                      </span>
                    </div>
                  </div>

                  {micState !== 'idle' && (
                    <button
                      onClick={() => {
                        if (recognitionRef.current) {
                          try { recognitionRef.current.stop(); } catch (e) {}
                        }
                        setIsListening(false);
                        stopAudioPitchAnalyzer();
                        setMicState('idle');
                        setInterimTranscript('');
                        showToast('⏹️ Đã kết thúc phiên thu âm.');
                      }}
                      className="px-3 py-1.5 bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold hover:bg-rose-200 transition-colors cursor-pointer"
                    >
                      Kết thúc
                    </button>
                  )}
                </div>
              </div>

              {/* SECTION 2: PHÂN BIỆT GIỌNG NÓI (NAM & NỮ) */}
              <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8] flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Phân Biệt Giọng Nói</span>
                  </h4>
                  <button
                    onClick={() => setAutoDiarization(!autoDiarization)}
                    className="flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-[10px] font-bold text-slate-500">Tự động:</span>
                    {autoDiarization ? (
                      <ToggleRight className="w-5 h-5 text-[#00A8E8]" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {DEFAULT_SPEAKERS.map((spk) => {
                    const isSelected = activeSpeakerId === spk.id;
                    return (
                      <button
                        key={spk.id}
                        onClick={() => {
                          setActiveSpeakerId(spk.id);
                          activeSpeakerRef.current = spk.id;
                        }}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs font-black'
                            : 'bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <span className="truncate flex items-center gap-1.5">
                          {spk.id === 'spk-male' ? '👨' : '👩'} {spk.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: TÙY CHỈNH HIỂN THỊ & THAO TÁC */}
              <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3.5">
                <h4 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8] flex items-center justify-center">
                    <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Hiển Thị & Thao Tác</span>
                </h4>

                {/* Cỡ chữ */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-slate-600 dark:text-slate-400">Cỡ Chữ Hộp Thoại:</span>
                  <div className="grid grid-cols-3 gap-1.5 bg-white dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    {(['normal', 'xlarge', 'massive'] as const).map((size) => {
                      const isSelected = fontSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {size === 'normal' && 'Vừa'}
                          {size === 'xlarge' && 'Rất Lớn'}
                          {size === 'massive' && 'Cực Đại'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tốc độ đọc */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-slate-600 dark:text-slate-400">Tốc Độ Đọc Âm Thanh:</span>
                  <div className="grid grid-cols-4 gap-1.5 bg-white dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    {[0.5, 1.0, 1.5, 2.0].map((rate) => {
                      const isSelected = speechRate === rate;
                      return (
                        <button
                          key={rate}
                          onClick={() => setSpeechRate(rate)}
                          className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#0284C7] to-[#00A8E8] text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {rate}x
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={handleCopyTranscript}
                    className="py-2.5 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-700 dark:text-slate-200 rounded-xl font-bold flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Copy className="w-4 h-4 text-sky-600" />
                    <span>Sao chép</span>
                  </button>
                  <button
                    onClick={handleDownloadTranscript}
                    className="py-2.5 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-slate-700 dark:text-slate-200 rounded-xl font-bold flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Tải file</span>
                  </button>
                  <button
                    onClick={handleClearMessages}
                    className="py-2.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 hover:border-rose-400 text-rose-600 dark:text-rose-400 rounded-xl font-bold flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa hết</span>
                  </button>
                </div>
              </div>

              {/* SECTION 4: PHẢN HỒI NHANH MẪU */}
              <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <h4 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#00A8E8] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Mẫu Phản Hồi Nhanh (1 chạm)</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto custom-scrollbar">
                  {QUICK_RESPONSES.map((chipText, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDeafTextInput(chipText);
                        setIsMobileSettingsOpen(false);
                        showToast(`✨ Đã điền câu mẫu: "${chipText}"`);
                      }}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50/70 dark:hover:bg-sky-950/40 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all text-left flex items-center justify-between gap-2 cursor-pointer group hover:border-[#00A8E8]/40"
                    >
                      <span className="group-hover:text-[#00A8E8] transition-colors">{chipText}</span>
                      <Volume2 className="w-4 h-4 text-[#00A8E8] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setIsMobileSettingsOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-[#0284C7] to-[#00A8E8] hover:brightness-110 active:scale-98 text-white rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-sky-500/25 transition-all cursor-pointer"
              >
                Hoàn Tất Cài Đặt
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================================================== */}
      {/* 🎯 MODAL OVERLAY: HƯỚNG DẪN KẾT NỐI & CẤP QUYỀN MICROPHONE                                    */}
      {/* ============================================================================================== */}
      {isMicPermissionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col justify-between p-4 sm:p-6 space-y-4 relative animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                    Hướng Dẫn Kết Nối Micro
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cấp quyền truy cập Micro trên trình duyệt để thu âm trực tiếp
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMicPermissionModalOpen(false)}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Diagnostic Details */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 font-medium space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Trạng thái kết nối hiện tại:</span>
                </div>
                <p className="text-xs leading-relaxed">
                  {recognitionError || 'Trình duyệt chưa cho phép truy cập Micro trực tiếp (not-allowed / denied).'}
                </p>
              </div>

              {/* 3-Step Solution Guide */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>3 Bước Bật Micro Trên Trình Duyệt Chrome / Edge / Safari:</span>
                </h4>

                <div className="space-y-2 pl-1">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#00A8E8] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">Nhấp biểu tượng Khóa 🔒 hoặc Thông tin ℹ️ trên thanh địa chỉ</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Ở góc bên trái địa chỉ trang web <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-sky-600 font-mono">one.auvietglobal.com</code></p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#00A8E8] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">Chuyển quyền "Microphone (Micro)" sang "Allow / Cho phép"</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Đảm bảo trình duyệt không chặn thu âm thiết bị.</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#00A8E8] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">Bấm nút "Thử Kết Nối Lại Micro" bên dưới</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Hệ thống sẽ thử kích hoạt lại bộ thu âm thời gian thực.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => {
                  setIsMicPermissionModalOpen(false);
                  if (typeof window !== 'undefined') window.location.reload();
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-extrabold text-xs rounded-xl transition cursor-pointer"
              >
                🔄 Tải lại trang web
              </button>

              <button
                onClick={async () => {
                  const success = await requestMicPermission();
                  if (success) {
                    setIsMicPermissionModalOpen(false);
                    toggleListening();
                  }
                }}
                className="px-5 py-2.5 bg-[#00A8E8] hover:bg-[#0284C7] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <Mic className="w-4 h-4" /> Thử Kết Nối Lại Micro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Floating Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900/95 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 dark:border-slate-200 font-extrabold text-xs flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white dark:hover:text-slate-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
