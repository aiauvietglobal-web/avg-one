import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

/**
 * 🌐 1000R CURVED OLED VIDEO STREAM DISPLAY (LEFT HERO COMPONENT)
 * 
 * Màn hình cong 1000R bên trái phát video "0_Reality_Against_720x1280.mp4":
 * - Hình học cong 1000R đối xứng 100% với màn hình bánh răng bên phải (viewBox 0 0 440 280).
 * - Khung vỏ kim loại Titan cao cấp với viền Neon Cyan phát quang và kính cong quang học.
 * - Video HD phát tự động mượt mà (AutoPlay, Loop, Muted, PlaysInline).
 * - Tuyệt đối không chứa chữ trong hộp (Zero text boxes / badges) theo yêu cầu người dùng.
 * - Nút điều khiển âm lượng / phát dừng tinh tế xuất hiện khi rê chuột.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Khung màn hình cong 1000R chuẩn xác (Đồng bộ 100% với màn hình bánh răng bên phải)
  const curvedScreenOutline = 
    "M 26 22 Q 220 38 414 22 A 16 16 0 0 1 426 38 L 426 242 A 16 16 0 0 1 414 258 Q 220 274 26 258 A 16 16 0 0 1 14 242 L 14 38 A 16 16 0 0 1 26 22 Z";

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Clip path mặt màn hình cong 1000R cho video */}
          <clipPath id="curved-video-screen-clip">
            <path d={curvedScreenOutline} />
          </clipPath>

          {/* Khung viền kim loại màn hình cong (Titanium Curved Chassis Bezel) */}
          <linearGradient id="curved-video-chassis-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="75%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Viền phát quang Neon Cyan chạy quanh mép màn hình cong */}
          <linearGradient id="curved-video-neon-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Vệt phản quang ánh sáng cong uốn lượn qua mặt kính */}
          <linearGradient id="curved-video-glass-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.02" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.16" />
          </linearGradient>

          {/* Bộ lọc bóng đổ màn hình cong nổi bật khỏi nền web */}
          <filter id="curved-video-monitor-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.22" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.25" />
          </filter>
        </defs>

        <style>{`
          @keyframes curved-sheen-sweep-left {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .anim-curved-sheen-left { animation: curved-sheen-sweep-left 5s ease-in-out infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: MẶT MÀN HÌNH CONG CHỨA VIDEO VÀ ĐƯỢC CLIP CHUẨN XÁC                */}
        {/* ========================================================================= */}
        <g id="curved-video-display-chassis" filter="url(#curved-video-monitor-shadow)">
          
          {/* Nền OLED đen sâu thẳm */}
          <path
            d={curvedScreenOutline}
            fill="#020813"
          />

          {/* Video phát trong khung hình cong */}
          <g clipPath="url(#curved-video-screen-clip)">
            <foreignObject x="0" y="0" width="440" height="280">
              <div className="w-full h-full relative overflow-hidden group/video flex items-center justify-center bg-slate-950">
                <video
                  ref={videoRef}
                  src="/videos/0_Reality_Against_720x1280.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.05]"
                />

                {/* Nút điều khiển âm thanh & phát dừng khi rê chuột */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-400/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 z-30">
                  <button
                    onClick={togglePlay}
                    className="p-1 rounded-full hover:bg-sky-500/20 text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                  <div className="w-[1px] h-3 bg-white/20" />
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded-full hover:bg-sky-500/20 text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                </div>
              </div>
            </foreignObject>
          </g>

          {/* Lưới tọa độ không gian mạng uốn cong 1000R đồng điệu với bên phải */}
          <g opacity="0.18" pointerEvents="none">
            <path d="M 20 80 Q 220 96 420 80" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
            <path d="M 16 145 Q 220 161 424 145" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 6" fill="none" />
            <path d="M 20 210 Q 220 226 420 210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />

            <line x1="220" y1="38" x2="220" y2="274" stroke="#38BDF8" strokeWidth="0.9" />
            <line x1="155" y1="34" x2="148" y2="268" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="95" y1="30" x2="82" y2="263" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="45" y1="26" x2="28" y2="256" stroke="#38BDF8" strokeWidth="0.8" />

            <line x1="285" y1="34" x2="292" y2="268" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="345" y1="30" x2="358" y2="263" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="395" y1="26" x2="412" y2="256" stroke="#38BDF8" strokeWidth="0.8" />
          </g>

          {/* Thân viền kim loại màn hình cong (Bezel) */}
          <path
            d={curvedScreenOutline}
            stroke="url(#curved-video-chassis-bezel)"
            strokeWidth="3.5"
            fill="none"
            pointerEvents="none"
          />

          {/* Viền Neon Cyan phát quang mép màn hình cong */}
          <path
            d={curvedScreenOutline}
            stroke="url(#curved-video-neon-rim)"
            strokeWidth="1.2"
            fill="none"
            pointerEvents="none"
          />

          {/* Vệt phản quang ánh sáng kính cong */}
          <path
            d={curvedScreenOutline}
            fill="url(#curved-video-glass-sheen)"
            className="anim-curved-sheen-left pointer-events-none"
          />
        </g>
      </svg>
    </div>
  );
};
