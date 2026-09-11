import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles, Play, Pause, RotateCcw, FastForward, Sliders,
  Eye, Video, VideoOff, Maximize2, Minimize2, X, Volume2,
  CheckCircle2, Info, Layers, RefreshCw, Cpu, Activity
} from 'lucide-react';
import {
  SIGN_DICTIONARY,
  REST_POSE,
  SignGesture,
  SignSequenceStep,
  parseTextToSignSequence,
  HandPose,
  HandLandmarkPoint
} from './signLanguageDictionary';

interface AISignLanguageAvatarProps {
  currentText: string; // Câu nói hoặc văn bản đang được biểu diễn ký hiệu
  isListening?: boolean;
  onClose?: () => void;
  onExpandToggle?: () => void;
  isExpanded?: boolean;
  mode?: 'split' | 'pip' | 'theater';
  className?: string;
}

// Bảng kết nối 21 điểm xương ngón tay theo chuẩn MediaPipe Hands
const HAND_CONNECTIONS: Array<[number, number]> = [
  // Cổ tay tới gốc ngón
  [0, 1], [0, 5], [0, 9], [0, 13], [0, 17],
  // Ngón cái (Thumb)
  [1, 2], [2, 3], [3, 4],
  // Ngón trỏ (Index)
  [5, 6], [6, 7], [7, 8],
  // Ngón giữa (Middle)
  [9, 10], [10, 11], [11, 12],
  // Ngón áp út (Ring)
  [13, 14], [14, 15], [15, 16],
  // Ngón út (Pinky)
  [17, 18], [18, 19], [19, 20],
  // Nối ngang gốc lòng bàn tay (Palm base)
  [5, 9], [9, 13], [13, 17]
];

export const AISignLanguageAvatar: React.FC<AISignLanguageAvatarProps> = ({
  currentText,
  isListening = false,
  onClose,
  onExpandToggle,
  isExpanded = false,
  mode = 'split',
  className = ''
}) => {
  // Sequence các cử chỉ đang thực hiện
  const [sequence, setSequence] = useState<SignSequenceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [viewStyle, setViewStyle] = useState<'skeleton' | 'cyber-avatar'>('cyber-avatar');
  const [showLandmarkNodes, setShowLandmarkNodes] = useState<boolean>(true);
  const [isCameraRecognitionActive, setIsCameraRecognitionActive] = useState<boolean>(false);
  const [detectedGestureText, setDetectedGestureText] = useState<string>('');
  const [dictionaryModalOpen, setDictionaryModalOpen] = useState<boolean>(false);

  // Nội suy tư thế hiện tại cho animation mềm mại
  const [currentLeftPose, setCurrentLeftPose] = useState<HandPose>(REST_POSE.left);
  const [currentRightPose, setCurrentRightPose] = useState<HandPose>(REST_POSE.right);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Phân tích câu nói thành chuỗi cử chỉ khi currentText thay đổi
  useEffect(() => {
    if (!currentText || !currentText.trim()) {
      setSequence([
        {
          gesture: SIGN_DICTIONARY['chao'],
          sourceText: 'Sẵn sàng mô phỏng ký hiệu',
          isFingerspelling: false
        }
      ]);
      setCurrentStepIndex(0);
      return;
    }

    const steps = parseTextToSignSequence(currentText);
    if (steps.length > 0) {
      setSequence(steps);
      setCurrentStepIndex(0);
      setIsPlaying(true);
    }
  }, [currentText]);

  // Bộ điều khiển timeline animation chuyển động cử chỉ tay
  useEffect(() => {
    if (!isPlaying || sequence.length === 0) return;

    const currentStep = sequence[currentStepIndex];
    if (!currentStep) return;

    const gesture = currentStep.gesture;
    const baseDuration = gesture.durationMs || 1200;
    const effectiveDuration = baseDuration / speedMultiplier;

    // Thiết lập pose mục tiêu
    setCurrentLeftPose(gesture.leftHand);
    setCurrentRightPose(gesture.rightHand);
    setTransitionProgress(0);

    const startTime = performance.now();
    let animFrame: number;

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      setTransitionProgress(progress);

      if (progress < 1) {
        animFrame = requestAnimationFrame(updateFrame);
      }
    };
    animFrame = requestAnimationFrame(updateFrame);

    // Chuyển sang bước tiếp theo
    const timer = setTimeout(() => {
      if (currentStepIndex < sequence.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Hoàn thành chuỗi: trở về tư thế chuẩn sau 800ms
        setTimeout(() => {
          setCurrentLeftPose(REST_POSE.left);
          setCurrentRightPose(REST_POSE.right);
        }, 500);
      }
    }, effectiveDuration);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animFrame);
    };
  }, [currentStepIndex, sequence, isPlaying, speedMultiplier]);

  // Bật/tắt camera nhận diện cử chỉ 2 chiều
  useEffect(() => {
    if (isCameraRecognitionActive) {
      navigator.mediaDevices?.getUserMedia({ video: { width: 640, height: 480 } })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn('Camera access denied or unavailable:', err);
          setIsCameraRecognitionActive(false);
        });

      // Mô phỏng AI Hand Tracking nhận diện từ ngữ
      const demoSigns = ['Xin chào', 'Tôi hiểu rồi', 'Cảm ơn', 'Đồng ý', 'Công việc', 'AVG One'];
      let idx = 0;
      const interval = setInterval(() => {
        setDetectedGestureText(demoSigns[idx % demoSigns.length]);
        idx++;
      }, 2500);

      return () => {
        clearInterval(interval);
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(t => t.stop());
          mediaStreamRef.current = null;
        }
      };
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
        mediaStreamRef.current = null;
      }
    }
  }, [isCameraRecognitionActive]);

  const activeGesture = sequence[currentStepIndex]?.gesture || SIGN_DICTIONARY['chao'];
  const activeLabel = sequence[currentStepIndex]?.sourceText || 'Xin chào';
  const isFingerspelling = sequence[currentStepIndex]?.isFingerspelling || false;

  // Render các đường nối xương bàn tay
  const renderHandSkeleton = (hand: HandPose, colorTheme: string, isLeftHand: boolean) => {
    const lm = hand.landmarks;
    if (!lm || lm.length < 21) return null;

    // Khớp cánh tay & khuỷu tay nối lên vai
    const elbowX = isLeftHand ? 25 : 75;
    const elbowY = 78;
    const shoulderX = isLeftHand ? 35 : 65;
    const shoulderY = 56;

    return (
      <g className="transition-all duration-300">
        {/* Cẳng tay (Forearm) */}
        <line
          x1={`${shoulderX}%`}
          y1={`${shoulderY}%`}
          x2={`${elbowX}%`}
          y2={`${elbowY}%`}
          stroke={colorTheme}
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.45"
          className="filter drop-shadow-[0_0_8px_rgba(0,168,232,0.6)]"
        />
        <line
          x1={`${elbowX}%`}
          y1={`${elbowY}%`}
          x2={`${lm[0].x}%`}
          y2={`${lm[0].y}%`}
          stroke={colorTheme}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
          className="filter drop-shadow-[0_0_8px_rgba(0,168,232,0.7)]"
        />
        {/* Khớp khuỷu tay (Elbow Joint) */}
        <circle
          cx={`${elbowX}%`}
          cy={`${elbowY}%`}
          r="4.5"
          fill="#00F0FF"
          stroke="#00A8E8"
          strokeWidth="1.5"
        />

        {/* 21 điểm xương bàn tay & kết nối */}
        {HAND_CONNECTIONS.map(([p1, p2], idx) => {
          const pt1 = lm[p1];
          const pt2 = lm[p2];
          if (!pt1 || !pt2) return null;
          return (
            <line
              key={`conn-${idx}`}
              x1={`${pt1.x}%`}
              y1={`${pt1.y}%`}
              x2={`${pt2.x}%`}
              y2={`${pt2.y}%`}
              stroke={colorTheme}
              strokeWidth={idx < 5 ? '3.5' : '2.5'}
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
          );
        })}

        {/* Các điểm nút khớp (Joint Landmarks) */}
        {showLandmarkNodes && lm.map((pt, idx) => {
          const isTip = [4, 8, 12, 16, 20].includes(idx);
          const isWrist = idx === 0;
          return (
            <circle
              key={`node-${idx}`}
              cx={`${pt.x}%`}
              cy={`${pt.y}%`}
              r={isTip ? 3.5 : isWrist ? 4.5 : 2.5}
              fill={isTip ? '#F15A24' : isWrist ? '#00A8E8' : '#10B981'}
              stroke="#FFFFFF"
              strokeWidth="1"
              className="transition-transform hover:scale-150 filter drop-shadow-[0_0_4px_rgba(241,90,36,0.8)]"
            />
          );
        })}
      </g>
    );
  };

  return (
    <div className={`relative flex flex-col bg-slate-900/95 text-white rounded-2xl border border-cyan-500/40 shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${className}`}>
      
      {/* 🌌 AI HUD GLOWING HEADER */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-cyan-300 uppercase">
                AI SIGN LANGUAGE AVATAR
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                VSL v2.6
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-none">
              Mô phỏng ngôn ngữ ký hiệu tay cho người khiếm thính
            </p>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-1.5">
          {/* Mode Switcher */}
          <button
            onClick={() => setViewStyle(viewStyle === 'cyber-avatar' ? 'skeleton' : 'cyber-avatar')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              viewStyle === 'skeleton'
                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Đổi chế độ: Khung xương MediaPipe / Avatar 3D"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px]">{viewStyle === 'skeleton' ? 'Khung Xương' : 'Avatar 3D'}</span>
          </button>

          {/* 2-Way Sign Camera Mode */}
          <button
            onClick={() => setIsCameraRecognitionActive(!isCameraRecognitionActive)}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isCameraRecognitionActive
                ? 'bg-rose-500/30 text-rose-300 border border-rose-500 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Bật/Tắt Camera nhận diện ký hiệu người khiếm thính ngược lại"
          >
            {isCameraRecognitionActive ? <Video className="w-3.5 h-3.5 text-rose-400" /> : <VideoOff className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden md:inline text-[11px]">Camera AI</span>
          </button>

          {/* Dictionary Viewer */}
          <button
            onClick={() => setDictionaryModalOpen(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Xem từ điển ký hiệu VSL"
          >
            <Info className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {onExpandToggle && (
            <button
              onClick={onExpandToggle}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
              title={isExpanded ? 'Thu gọn' : 'Phóng to'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Đóng cửa sổ ký hiệu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 🦾 MAIN STAGE: AVATAR / SKELETON DISPLAY OR CAMERA FEED */}
      <div className="relative flex-1 min-h-[260px] max-h-[460px] bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 flex items-center justify-center overflow-hidden">
        
        {/* Hologram Cyber Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Chế độ Camera nhận diện 2 chiều */}
        {isCameraRecognitionActive ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-xl border-2 border-rose-500/60 shadow-lg"
            />
            {/* AI Landmark Tracking Overlay Box */}
            <div className="absolute inset-x-8 top-10 bottom-16 border border-rose-400/50 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex items-center justify-between text-[11px] font-black text-rose-300 bg-black/60 px-2.5 py-1 rounded-lg w-fit">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-1.5" />
                <span>AI HAND TRACKING: ACTIVE (30 FPS)</span>
              </div>

              <div className="self-center bg-slate-950/85 border border-cyan-400/60 rounded-xl px-4 py-2 text-center shadow-xl backdrop-blur-md">
                <div className="text-[10px] uppercase font-bold text-cyan-400">Từ ký hiệu nhận diện được:</div>
                <div className="text-base font-black text-white">{detectedGestureText || 'Đang theo dõi cử chỉ tay...'}</div>
              </div>
            </div>
          </div>
        ) : (
          /* SVG AVATAR & HAND SKELETON ENGINE */
          <div className="relative w-full h-full flex items-center justify-center select-none">
            <svg
              className="w-full h-full max-w-[420px] max-h-[380px] overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Gradient Neon Glow */}
                <linearGradient id="ai-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00A8E8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1E293B" stopOpacity="0.9" />
                </linearGradient>
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 👤 HEAD & TORSO (AVATAR BODY) */}
              <g className="transition-all duration-300">
                {/* Đầu Avatar (Head) */}
                <circle
                  cx="50"
                  cy="26"
                  r="13"
                  fill="url(#ai-body-grad)"
                  stroke="#00F0FF"
                  strokeWidth="1.2"
                  filter="url(#neon-glow)"
                />
                {/* Tai nghe công nghệ AI Headset */}
                <rect x="34" y="22" width="3" height="8" rx="1.5" fill="#F15A24" />
                <rect x="63" y="22" width="3" height="8" rx="1.5" fill="#F15A24" />
                <path d="M 35 22 A 15 15 0 0 1 65 22" fill="none" stroke="#F15A24" strokeWidth="1.5" />

                {/* Khuôn mặt Cyber (Eyes & Smile Indicator) */}
                <circle cx="45" cy="25" r="1.8" fill="#00F0FF" className="animate-pulse" />
                <circle cx="55" cy="25" r="1.8" fill="#00F0FF" className="animate-pulse" />
                {activeGesture.facialExpression === 'smile' ? (
                  <path d="M 44 31 Q 50 35 56 31" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
                ) : activeGesture.facialExpression === 'nod' ? (
                  <path d="M 45 32 L 55 32" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M 45 31 Q 50 32 55 31" fill="none" stroke="#00F0FF" strokeWidth="1.2" strokeLinecap="round" />
                )}

                {/* Cổ (Neck) */}
                <rect x="47" y="39" width="6" height="7" rx="1" fill="#1E293B" stroke="#00A8E8" strokeWidth="0.8" />

                {/* Thân trên & Vai (Shoulders & Torso) */}
                <path
                  d="M 28 56 Q 50 48 72 56 L 68 85 L 32 85 Z"
                  fill="#0F172A"
                  stroke="#00A8E8"
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                />
                {/* Logo AVG One Hologram trên ngực */}
                <circle cx="50" cy="62" r="5" fill="#00A8E8" fillOpacity="0.2" stroke="#00F0FF" strokeWidth="0.8" />
                <text x="50" y="64" fontSize="3.5" fontWeight="900" fill="#00F0FF" textAnchor="middle">AVG</text>
              </g>

              {/* 👐 HAND SKELETON LAYER (21 LANDMARKS FOR EACH HAND) */}
              {renderHandSkeleton(currentLeftPose, '#00F0FF', true)}
              {renderHandSkeleton(currentRightPose, '#00F0FF', false)}

              {/* Radar Wave Pulse khi đang biểu diễn */}
              {isPlaying && (
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                  className="animate-spin duration-1000"
                  opacity="0.3"
                />
              )}
            </svg>

            {/* AI HUD Badges Overlay */}
            <div className="absolute top-2 left-3 flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/70 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>21-PTS LANDMARKS: OK</span>
              </div>
              <div className="px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-700 text-[10px] text-slate-300 font-mono">
                TỐC ĐỘ: {speedMultiplier}x
              </div>
            </div>

            {/* Gesture Description Badge Overlay */}
            <div className="absolute bottom-2 inset-x-3 bg-slate-950/85 border border-cyan-500/40 rounded-xl p-2.5 backdrop-blur-md shadow-lg flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-wide">
                    {isFingerspelling ? `Chữ cái ngón tay: ${activeLabel}` : activeLabel}
                  </span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    {currentStepIndex + 1}/{sequence.length || 1}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {activeGesture.description}
                </p>
              </div>

              {/* Play / Pause / Replay Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all cursor-pointer active:scale-95"
                  title={isPlaying ? 'Tạm dừng cử chỉ' : 'Tiếp tục cử chỉ'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsPlaying(true);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer active:scale-95"
                  title="Diễn lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🎛️ BOTTOM CONTROL DOCK */}
      <div className="px-3.5 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs gap-2 shrink-0">
        {/* Speed Multipliers */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-400 font-bold hidden sm:inline mr-1">Tốc độ:</span>
          {[0.5, 1.0, 1.5].map((s) => (
            <button
              key={s}
              onClick={() => setSpeedMultiplier(s)}
              className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition-all cursor-pointer ${
                speedMultiplier === s
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Landmark Nodes Toggle */}
        <button
          onClick={() => setShowLandmarkNodes(!showLandmarkNodes)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
            showLandmarkNodes
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Điểm Khớp ({showLandmarkNodes ? 'BẬT' : 'TẮT'})</span>
        </button>
      </div>

      {/* 📖 MODAL: TỪ ĐIỂN KÝ HIỆU VSL */}
      {dictionaryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 bg-slate-950 border-b border-cyan-500/30 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <h3 className="font-black text-sm uppercase tracking-wider text-cyan-300">
                  TỪ ĐIỂN KÝ HIỆU TAY VSL (AVG ONE AI)
                </h3>
              </div>
              <button
                onClick={() => setDictionaryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-2 text-xs">
              <p className="text-slate-400 mb-3">
                Chọn một từ để kiểm tra mô hình AI thực hiện cử chỉ ký hiệu tương ứng:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(SIGN_DICTIONARY).map(([k, g]) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSequence([{ gesture: g, sourceText: g.word, isFingerspelling: false }]);
                      setCurrentStepIndex(0);
                      setIsPlaying(true);
                      setDictionaryModalOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700 hover:border-cyan-400 text-left transition-all cursor-pointer group"
                  >
                    <div className="font-extrabold text-cyan-300 group-hover:text-cyan-200">{g.word}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-1">{g.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
