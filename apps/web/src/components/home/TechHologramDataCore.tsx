import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Activity } from 'lucide-react';

/**
 * 🌐 ENTERPRISE PRO SUITE: AI NEURAL STREAM (LEFT HERO MODULE)
 * 
 * Thiết kế Chuẩn Mực Doanh Nghiệp Cao Cấp (Apple Pro / Linear Enterprise Standard):
 * - Khung Kính Mờ Tràn Viền Tối Giản (Frameless Glassmorphic Pro Viewport).
 * - Thanh tiêu đề cửa sổ hệ điều hành chuyên nghiệp: Traffic light dots, Module ID, Live Status.
 * - Video HD "0_Reality_Against_720x1280.mp4" hiển thị sắc nét với tỷ lệ cân đối hoàn hảo.
 * - Thông tin phụ đề chuẩn Enterprise: Trí Tuệ Nhân Tạo AI • Dữ Liệu Thời Gian Thực.
 * - Điều khiển âm thanh / phát dừng tinh tế, không làm rối mắt.
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
      {/* KHUNG CỬA SỔ ENTERPRISE PRO VIEWPORT */}
      <div className="relative w-full aspect-[16/10.5] max-h-[235px] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.15),0_0_0_1px_rgba(255,255,255,0.8)_inset] overflow-hidden flex flex-col group/viewport transition-all duration-300">
        
        {/* ========================================================================= */}
        {/* THANH TIÊU ĐỀ HỆ ĐIỀU HÀNH CHUYÊN NGHIỆP (PRO WINDOW HEADER)             */}
        {/* ========================================================================= */}
        <div className="h-7.5 px-3 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 z-20">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 dark:bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 dark:bg-emerald-500/60" />
            <span className="ml-2 font-mono text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              AVG-ONE // AI.CORE
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[8.5px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              LIVE NEURAL
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MÀN HÌNH CHÍNH PHÁT VIDEO CHUYÊN NGHIỆP                                   */}
        {/* ========================================================================= */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
          
          {/* Video Stream */}
          <video
            ref={videoRef}
            src="/videos/0_Reality_Against_720x1280.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.04]"
          />

          {/* Lớp phủ chuyển sắc mềm mại ở đáy để hiển thị nhãn phụ đề thanh lịch */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20 pointer-events-none z-10" />

          {/* ========================================================================= */}
          {/* THÔNG TIN CHUYÊN NGHIỆP Ở ĐÁY CỬA SỔ (ENTERPRISE FOOTER OVERLAY)          */}
          {/* ========================================================================= */}
          <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between z-20 pointer-events-none">
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-white text-[11px] font-bold tracking-tight">
                <Sparkles size={12} className="text-sky-400" />
                <span>Trí Tuệ Nhân Tạo AI</span>
              </div>
              <div className="text-[9px] font-medium text-slate-300 dark:text-slate-400">
                Tự động hóa SOP & Xử lý thời gian thực
              </div>
            </div>

            {/* Micro Latency Metric */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[8.5px] font-mono text-sky-300">
              <Activity size={10} className="text-emerald-400" />
              <span>100% REAL-TIME</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* NÚT ĐIỀU KHIỂN VIDEO (HIỂN THỊ KHI HOVER)                                 */}
          {/* ========================================================================= */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 p-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 opacity-0 group-hover/viewport:opacity-100 transition-opacity duration-200 z-30">
            <button
              onClick={togglePlay}
              className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
            >
              {isPlaying ? <Pause size={11} /> : <Play size={11} />}
            </button>
            <div className="w-[1px] h-2.5 bg-white/20" />
            <button
              onClick={toggleMute}
              className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX size={11} /> : <Volume2 size={11} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
