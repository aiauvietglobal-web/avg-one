import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Play, Pause, Square, Sparkles, Download, Copy,
  CheckCircle2, Star, Clock, User, Users, ShieldAlert,
  ArrowRight, FileText, Check, AlertCircle, RefreshCw, X, Volume2
} from 'lucide-react';
import {
  LiveTranscribeController,
  TranscriptItem,
  TranscribeStatus,
  normalizeAvgText
} from '../../services/liveTranscribeService';

interface LiveTranscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string;
  meetingTitle: string;
  meetingDate?: string;
  scope?: string;
  chairperson?: string;
  secretary?: string;
  attendees?: string;
  onSaveConclusion?: (conclusionText: string, docUrl?: string) => void;
}

const DEFAULT_SPEAKERS = [
  { code: 'DH', name: 'Ban Điều Hành (DH)', role: 'Chủ trì' },
  { code: '2.1', name: 'Thư ký 2.1', role: 'Thư ký' },
  { code: 'B5.1', name: 'Tài Chính B5.1', role: 'Thành viên' },
  { code: '5.1T', name: 'Kế toán 5.1T', role: 'Thành viên' },
  { code: '#K1', name: 'Cố vấn #K1', role: 'Cố vấn' },
  { code: '#K2T', name: 'Kỹ thuật #K2T', role: 'R&D' },
  { code: 'bà Bích', name: 'Bà Bích', role: 'Nhân sự' },
  { code: 'bà Trang', name: 'Bà Trang (AV)', role: 'Pháp nhân AV' }
];

export const LiveTranscribeModal: React.FC<LiveTranscribeModalProps> = ({
  isOpen,
  onClose,
  meetingId,
  meetingTitle,
  meetingDate,
  scope,
  chairperson,
  secretary,
  attendees,
  onSaveConclusion
}) => {
  const [controller] = useState<LiveTranscribeController>(() => new LiveTranscribeController());
  const [status, setStatus] = useState<TranscribeStatus>('idle');
  const [interimText, setInterimText] = useState<string>('');
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<string>(secretary || '2.1');
  const [activeRole, setActiveRole] = useState<string>('Thư ký');
  const [customSpeakerInput, setCustomSpeakerInput] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [conclusionSummary, setConclusionSummary] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'transcript' | 'conclusion'>('transcript');

  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // Bind controller listeners
  useEffect(() => {
    controller.onStatusChange = (newStatus) => setStatus(newStatus);
    controller.onInterim = (text) => setInterimText(text);
    controller.onFinal = (entry) => {
      setTranscripts((prev) => [...prev, entry]);
    };
    controller.onAudioLevel = (level) => setAudioLevel(level);
    controller.onError = (msg) => setErrorMessage(msg);

    return () => {
      controller.stop();
    };
  }, [controller]);

  // Handle Elapsed Timer
  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Auto-scroll when new transcript arrives
  useEffect(() => {
    if (scrollBottomRef.current && activeTab === 'transcript') {
      scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, interimText, activeTab]);

  if (!isOpen) return null;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setErrorMessage(null);
    controller.start(meetingId, activeSpeaker, activeRole);
  };

  const handlePauseRecording = () => {
    controller.pause();
  };

  const handleResumeRecording = () => {
    controller.resume();
  };

  const handleStopRecording = () => {
    controller.stop();
  };

  const handleSpeakerChange = (code: string, role: string) => {
    setActiveSpeaker(code);
    setActiveRole(role);
    controller.setSpeaker(code, role);
  };

  const handleAddCustomSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSpeakerInput.trim()) return;
    const spk = customSpeakerInput.trim();
    setActiveSpeaker(spk);
    setActiveRole('Thành viên');
    controller.setSpeaker(spk, 'Thành viên');
    setCustomSpeakerInput('');
  };

  const toggleFlagItem = (id: string) => {
    setTranscripts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFlagged: !item.isFlagged } : item))
    );
  };

  const handleGenerateConclusion = () => {
    const flaggedPoints = transcripts.filter((t) => t.isFlagged);
    const allText = transcripts.map((t) => `[${t.timestamp}] ${t.speaker}: ${t.text}`).join('\n');

    const formattedVbkl = `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
----------------------------------
VĂN BẢN KẾT LUẬN CUỘC HỌP (VBKL)
HỆ THỐNG QUẢN TRỊ AVG ONE

1. THÔNG TIN CHUNG:
- Cuộc họp: ${meetingTitle}
- Ngày thực hiện: ${meetingDate || new Date().toLocaleDateString('vi-VN')}
- Phạm vi: ${scope || 'Toàn hệ thống'}
- Chủ trì: ${chairperson || 'Ban Điều Hành'}
- Thư ký: ${secretary || activeSpeaker}
- Thành phần: ${attendees || 'Các thành viên AVG One'}

2. NỘI DUNG VÀ KẾT LUẬN TRỌNG ĐIỂM:
${
  flaggedPoints.length > 0
    ? flaggedPoints.map((p, idx) => `${idx + 1}. [Chỉ đạo từ ${p.speaker}]: ${p.text}`).join('\n')
    : transcripts.slice(0, 10).map((p, idx) => `${idx + 1}. [${p.speaker}]: ${p.text}`).join('\n')
}

3. PHÂN CÔNG THỰC HIỆN (ACTION ITEMS):
- Cập nhật hồ sơ và gửi báo cáo cho cấp quản lý.
- Bộ phận thư ký lưu trữ dữ liệu vào hệ thống AVG One.

----------------------------------
Biên bản được xuất tự động bởi Phân hệ Thư Ký Số Trực Tiếp AVG One lúc ${new Date().toLocaleTimeString('vi-VN')}.`;

    setConclusionSummary(formattedVbkl);
    setActiveTab('conclusion');
  };

  const handleCopyTranscript = () => {
    const textToCopy =
      activeTab === 'conclusion'
        ? conclusionSummary
        : transcripts.map((t) => `[${t.timestamp}] ${t.speaker} (${t.speakerRole || 'TV'}): ${t.text}`).join('\n');

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadTranscript = () => {
    const content =
      activeTab === 'conclusion'
        ? conclusionSummary
        : transcripts.map((t) => `[${t.timestamp}] ${t.speaker}: ${t.text}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BienBan_${meetingId}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F15A24]/10 dark:bg-[#F15A24]/20 text-[#F15A24] flex items-center justify-center font-bold text-xl shadow-inner">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded font-semibold bg-orange-100 dark:bg-orange-950 text-[#F15A24]">
                  {scope || 'HỘI NGHỊ / TRAO ĐỔI'}
                </span>
                <h2 className="text-lg font-bold truncate max-w-[450px]" title={meetingTitle}>
                  {meetingTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                <span>📅 {meetingDate || 'Hôm nay'}</span>
                <span>👤 Thư ký: <strong>{secretary || activeSpeaker}</strong></span>
                <span>⚡ Phân hệ Trợ lý Trực tiếp AVG One</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Audio & Controls Ribbon */}
        <div className="px-6 py-3 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  status === 'recording'
                    ? 'bg-red-500 animate-ping'
                    : status === 'paused'
                    ? 'bg-amber-400'
                    : 'bg-slate-500'
                }`}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                {status === 'recording'
                  ? 'ĐANG GHI ÂM TRỰC TIẾP'
                  : status === 'paused'
                  ? 'TẠM DỪNG'
                  : 'SẴN SÀNG'}
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            {/* Waveform Sound Visualizer */}
            <div className="flex items-center gap-1 h-6 px-2 bg-slate-850 rounded-lg border border-slate-700/50">
              <Volume2 className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {[30, 60, 90, 45, 75, 100, 50, 80, 65, 40, 85, 30].map((h, i) => {
                const barHeight = status === 'recording' ? Math.max(15, (audioLevel / 100) * h) : 15;
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      status === 'recording' ? 'bg-[#F15A24]' : 'bg-slate-600'
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {status === 'idle' ? (
              <button
                onClick={handleStartRecording}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F15A24] hover:bg-[#d94e1b] text-white font-medium text-sm shadow-lg shadow-orange-950/40 transition-all transform active:scale-95"
              >
                <Mic className="w-4 h-4 animate-bounce" />
                <span>Bắt Đầu Chuyển Đổi</span>
              </button>
            ) : (
              <>
                {status === 'recording' ? (
                  <button
                    onClick={handlePauseRecording}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Tạm Dừng</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResumeRecording}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Tiếp Tục</span>
                  </button>
                )}

                <button
                  onClick={handleStopRecording}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Kết Thúc</span>
                </button>
              </>
            )}

            <div className="h-5 w-px bg-slate-700 mx-1" />

            <button
              onClick={handleGenerateConclusion}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-colors"
              title="Tự động bóc tách các ý quan trọng thành Văn bản kết luận"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Trích Xuất VBKL</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="px-6 py-2 bg-red-50 dark:bg-red-950/50 border-b border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="underline font-semibold">Đóng</button>
          </div>
        )}

        {/* Speaker Selector Bar */}
        <div className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#F15A24]" /> Người đang nói:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {DEFAULT_SPEAKERS.map((spk) => {
              const isCurrent = activeSpeaker === spk.code;
              return (
                <button
                  key={spk.code}
                  onClick={() => handleSpeakerChange(spk.code, spk.role)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#F15A24] text-white shadow-sm ring-2 ring-orange-400/30 font-semibold'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-650'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                  <span>{spk.name}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleAddCustomSpeaker} className="flex items-center gap-1 shrink-0">
            <input
              type="text"
              placeholder="+ Thêm tên..."
              value={customSpeakerInput}
              onChange={(e) => setCustomSpeakerInput(e.target.value)}
              className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#F15A24] w-28"
            />
          </form>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs Selector */}
          <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('transcript')}
                className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'transcript'
                    ? 'border-[#F15A24] text-[#F15A24]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Hội Thoại Trực Tiếp ({transcripts.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('conclusion')}
                className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'conclusion'
                    ? 'border-[#F15A24] text-[#F15A24]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Biên Bản Kết Luận (VBKL)</span>
              </button>
            </div>

            {/* Global Utility Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTranscript}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>

              <button
                onClick={handleDownloadTranscript}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải .txt</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Live Transcript View */}
          {activeTab === 'transcript' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
              {transcripts.length === 0 && !interimText && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                    <Mic className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Chưa có âm thanh được ghi nhận
                  </h3>
                  <p className="text-xs max-w-sm mt-1 text-slate-500">
                    Nhấn nút <strong>"Bắt Đầu Chuyển Đổi"</strong> và nói vào microphone. Hệ thống sẽ tự động chuyển đổi giọng nói thành văn bản tức thì theo từng người phát biểu.
                  </p>
                  <div className="mt-4 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-xs text-orange-800 dark:text-orange-300 text-left max-w-md">
                    <p className="font-semibold mb-1">💡 Tự động nắn chỉnh từ khóa AVG One:</p>
                    <p className="text-[11px] opacity-90">
                      Hệ thống tự động hiểu các thuật ngữ đặc thù: <em>B5.1, 5.1T, #K2T, 2.1, DH, AV, AVG One, VBKL, Lệnh sản xuất, Đăng ký SHTT...</em>
                    </p>
                  </div>
                </div>
              )}

              {/* List of Finalized Transcript Items */}
              {transcripts.map((item) => (
                <div
                  key={item.id}
                  className={`group relative p-4 rounded-xl border transition-all ${
                    item.isFlagged
                      ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80 shadow-sm'
                      : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/70 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/60 text-[#F15A24] dark:text-orange-300 font-bold text-xs flex items-center justify-center">
                        {item.speaker.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {item.speaker}
                      </span>
                      {item.speakerRole && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                          {item.speakerRole}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-mono ml-2">
                        {item.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFlagItem(item.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          item.isFlagged
                            ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/60'
                            : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title="Đánh dấu ý quan trọng / Kết luận chỉ đạo"
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFlagged ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed pl-9">
                    {item.text}
                  </p>
                </div>
              ))}

              {/* Interim Real-time Dynamic Result (Typing Effect) */}
              {interimText && (
                <div className="p-4 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-dashed border-[#F15A24]/40 animate-pulse">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-[#F15A24] text-white font-bold text-xs flex items-center justify-center animate-spin">
                      ⏳
                    </div>
                    <span className="text-xs font-bold text-[#F15A24]">
                      {activeSpeaker} (Đang phát biểu...)
                    </span>
                  </div>
                  <p className="text-sm italic text-slate-600 dark:text-slate-300 pl-9">
                    {interimText}
                  </p>
                </div>
              )}

              <div ref={scrollBottomRef} />
            </div>
          )}

          {/* Tab 2: Conclusion (VBKL) View */}
          {activeTab === 'conclusion' && (
            <div className="flex-1 p-6 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-950/40 overflow-y-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Văn Bản Kết Luận Cuộc Họp (VBKL Sơ Bộ)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tự động bóc tách từ các ý phát biểu có gắn dấu sao ⭐ và chỉ đạo trọng tâm của cuộc họp.
                  </p>
                </div>

                {onSaveConclusion && (
                  <button
                    onClick={() => onSaveConclusion(conclusionSummary)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lưu Vào Hồ Sơ Cuộc Họp</span>
                  </button>
                )}
              </div>

              <textarea
                value={conclusionSummary}
                onChange={(e) => setConclusionSummary(e.target.value)}
                placeholder="Nội dung kết luận cuộc họp sẽ hiển thị ở đây sau khi bấm 'Trích Xuất VBKL'..."
                className="flex-1 w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#F15A24] min-h-[300px]"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>Độ trễ nhận diện: <strong className="text-emerald-500">&lt; 250ms</strong></span>
            <span>•</span>
            <span>Mô hình: <strong className="text-slate-700 dark:text-slate-300">Streaming vi-VN + AVG Lexicon</strong></span>
          </div>

          <div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
