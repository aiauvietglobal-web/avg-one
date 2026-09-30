import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

/**
 * 🌐 1000R CURVED OLED VIDEO STREAM DISPLAY (LEFT HERO COMPONENT)
 * 
 * Thay thế màn hình bên trái bằng video "0_Reality_Against_720x1280.mp4":
 * - Thiết kế chuẩn Màn hình cong 1000R đồng bộ 100% với màn hình cỗ máy bánh răng bên phải.
 * - Khung vỏ kim loại Titan cao cấp với viền Neon Cyan phát quang và kính cong phản xạ quang học.
 * - Video HD phát tự động mượt mà (AutoPlay, Loop, Muted, PlaysInline) với tỷ lệ phủ tràn màn hình tối ưu.
 * - Hệ thống HUD Telemetry cao cấp: Header Status, Footer Data Stream và 3 Thẻ Kính Mờ Telemetry.
 * - Nút điều khiển âm lượng / phát dừng thông minh khi rê chuột vào màn hình.
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

  return (
    <div className={`relative select-none ${className}`}>
      {/* KHUNG MÀN HÌNH CONG 1000R (CHASSIS DISPLAY) */}
      <div 
        className="relative w-full aspect-[440/280] rounded-[22px] p-[3px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-[0_12px_36px_rgba(15,23,42,0.28),0_2px_10px_rgba(2,132,199,0.3)] transition-all duration-500 overflow-hidden"
      >
        {/* Viền Neon Cyan phát quang dọc mép màn hình cong */}
        <div className="absolute inset-0 rounded-[22px] border border-sky-400/60 shadow-[inset_0_0_12px_rgba(56,189,248,0.4)] pointer-events-none z-30" />

        {/* MẶT MÀN HÌNH OLED CHỨA VIDEO */}
        <div className="relative w-full h-full rounded-[19px] bg-slate-950 overflow-hidden group/screen">
          
          {/* 🎬 VIDEO PHÁT TỰ ĐỘNG CHÍNH */}
          <video
            ref={videoRef}
            src="/videos/0_Reality_Against_720x1280.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.05] transition-transform duration-700 group-hover/screen:scale-[1.02]"
          />

          {/* Lớp phủ chuyển sắc nhẹ ở 2 biên trên/dưới giúp đọc thông số HUD rõ nét */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-transparent to-slate-950/80 pointer-events-none z-10" />

          {/* Lưới tọa độ phối cảnh uốn cong mờ ảo trên mặt video (Curved Cyber Grid) */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none z-10"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Vệt phản quang mặt kính cong (Cylindrical Glass Sheen Sweep) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-sky-400/[0.12] pointer-events-none z-20" />

          {/* ========================================================================= */}
          {/* HEADER BAR HUD MÀN HÌNH CONG                                              */}
          {/* ========================================================================= */}
          <div className="absolute top-2.5 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none font-mono text-[8px] sm:text-[9px] font-bold text-sky-400 tracking-wider">
            <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-sky-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>1000R CURVED OLED // AI VISION STREAM</span>
            </div>
            <div className="bg-slate-950/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-sky-400/30 text-sky-300">
              120HZ • HDR1000
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FOOTER BAR HUD MÀN HÌNH CONG                                              */}
          {/* ========================================================================= */}
          <div className="absolute bottom-2 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none font-mono text-[7.5px] sm:text-[8.5px] font-semibold text-sky-300/80 tracking-wider">
            <span className="bg-slate-950/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-sky-400/20">
              AVG-ONE WORKSPACE OS // 0_REALITY
            </span>
            <span className="bg-slate-950/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-sky-400/20 text-emerald-400">
              STATUS: STREAMING [ + ]
            </span>
          </div>

          {/* ========================================================================= */}
          {/* 3 THẺ KÍNH MỜ TELEMETRY NỔI NHẸ TRÊN MÀN HÌNH                            */}
          {/* ========================================================================= */}
          
          {/* 🧠 CARD 1: TRÍ TUỆ NHÂN TẠO AI (TOP-RIGHT) */}
          <div className="absolute top-8 right-2.5 z-20 hidden xs:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-sky-300/80 shadow-[0_4px_12px_rgba(15,23,42,0.18)]">
            <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0">
              <span className="text-[10px]">🧠</span>
            </div>
            <div className="text-left leading-tight">
              <div className="text-[9.5px] font-bold text-slate-900 dark:text-white">Trí Tuệ Nhân Tạo AI</div>
              <div className="text-[8px] font-semibold text-emerald-600">● Xử Lý SOP Tức Thì</div>
            </div>
          </div>

          {/* 📊 CARD 2: 100% SỐ HÓA (BOTTOM-RIGHT) */}
          <div className="absolute bottom-7 right-2.5 z-20 hidden xs:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-sky-300/80 shadow-[0_4px_12px_rgba(15,23,42,0.18)]">
            <div className="w-5 h-5 rounded-md bg-sky-50 border border-sky-300 flex items-center justify-center text-sky-600 shrink-0">
              <span className="text-[10px]">📊</span>
            </div>
            <div className="text-left leading-tight">
              <div className="text-[9.5px] font-bold text-slate-900 dark:text-white">100% Số Hóa</div>
              <div className="text-[8px] font-semibold text-sky-600">Dữ Liệu Thời Gian Thực</div>
            </div>
          </div>

          {/* 🛡️ CARD 3: BẢO MẬT ĐA TẦNG (LEFT) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2.5 z-20 hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-indigo-300/80 shadow-[0_4px_12px_rgba(15,23,42,0.18)]">
            <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-300 flex items-center justify-center text-indigo-600 shrink-0">
              <span className="text-[10px]">🛡️</span>
            </div>
            <div className="text-left leading-tight">
              <div className="text-[9.5px] font-bold text-slate-900 dark:text-white">Bảo Mật Đa Tầng</div>
              <div className="text-[8px] font-semibold text-indigo-600">Chuẩn Mực Tối Ưu</div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* NÚT ĐIỀU KHIỂN VIDEO (HIỆN KHI RÊ CHUỘT / HOVER)                          */}
          {/* ========================================================================= */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-sky-400/40 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 z-30">
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
      </div>
    </div>
  );
};
