import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * 🌐 AI NEURAL VISION STREAM - SEAMLESS AMBIENT BLEND (LEFT HERO COMPONENT)
 * 
 * Thiết kế Hòa Trộn Tự Nhiên & Kết Nối Liền Mạch Với Nền (Seamless Ambient Integration):
 * - Xóa bỏ hoàn toàn thanh tiêu đề, traffic lights, khung viền chữ nhật và các dải đen che chắn.
 * - Sử dụng mặt nạ quang học Radial Gradient Mask để biên video tan biến mượt mà 100% vào nền lưới pastel của trang web.
 * - Các luồng sóng vi nơ-ron và tia sáng kết nối trực tiếp với hệ tọa độ lưới nền.
 * - Điểm sáng AI nổi bật lơ lửng trong không gian mở, tạo cảm giác công nghệ thở cùng trang web.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-auto group/ai-stream ${className}`}>
      
      {/* 1. VẦNG HÀO QUANG QUANG HỌC KẾT NỐI VÀO NỀN (AMBIENT BACKGROUND HALO) */}
      <div className="absolute inset-0 -m-8 pointer-events-none -z-10 flex items-center justify-center">
        {/* Lớp hào quang Lam Ngọc hòa tan vào lưới caro */}
        <div 
          className="w-full h-full rounded-full blur-3xl opacity-45 dark:opacity-35 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.35) 0%, rgba(2, 132, 199, 0.18) 45%, transparent 75%)',
            animationDuration: '6s'
          }}
        />
        {/* Điểm nhấn ấm áp hòa hợp với màu cam slogan */}
        <div 
          className="absolute w-3/4 h-3/4 rounded-full blur-2xl opacity-20"
          style={{
            background: 'radial-gradient(circle at 60% 40%, rgba(251, 146, 60, 0.25) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* 2. CÁC TIA TỌA ĐỘ VÀ VÒNG QUỸ ĐẠO KẾT NỐI VỚI LƯỚI NỀN (CONNECTIVE GRID GUIDES) */}
      <svg
        viewBox="0 0 420 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible opacity-50 dark:opacity-40"
      >
        <defs>
          <linearGradient id="connect-fade-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0284C7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="connect-fade-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Các đường gióng ngang ăn khớp với lưới nền trang web */}
        <line x1="10" y1="150" x2="410" y2="150" stroke="url(#connect-fade-h)" strokeWidth="1" strokeDasharray="6 4" />
        <line x1="60" y1="210" x2="360" y2="210" stroke="url(#connect-fade-h)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        <line x1="60" y1="90" x2="360" y2="90" stroke="url(#connect-fade-h)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

        {/* Vòng đai quỹ đạo năng lượng mềm mại lượn quanh video */}
        <ellipse
          cx="210"
          cy="150"
          rx="175"
          ry="78"
          stroke="#0284C7"
          strokeWidth="1.2"
          strokeDasharray="40 15 20 15"
          opacity="0.35"
          transform="rotate(-12, 210, 150)"
        />
        <circle cx="50" cy="180" r="2.2" fill="#38BDF8" />
        <circle cx="370" cy="120" r="2.2" fill="#F97316" />
      </svg>

      {/* 3. MÀN HÌNH VIDEO HÒA TAN VÀO NỀN (RADIAL MASKED VIDEO STREAM) */}
      <div 
        className="relative w-full aspect-[4/3] max-w-[380px] overflow-hidden flex items-center justify-center"
        style={{
          maskImage: 'radial-gradient(ellipse 76% 72% at 50% 50%, black 30%, rgba(0,0,0,0.85) 50%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse 76% 72% at 50% 50%, black 30%, rgba(0,0,0,0.85) 50%, transparent 82%)'
        }}
      >
        <video
          ref={videoRef}
          src="/videos/0_Reality_Against_720x1280.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.08] transition-transform duration-700 group-hover/ai-stream:scale-[1.04]"
        />

        {/* Lớp lọc ánh sáng xanh hòa sắc với web */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-color"
          style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, transparent 60%)' }}
        />
      </div>

      {/* 4. CHỈ SỐ NHẸ NHÀNG KHÔNG KHUNG VIỀN (SUBTLE FLOATING HUD ACCENT) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none whitespace-nowrap">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-200/60 dark:border-sky-800/50 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-800 dark:text-sky-300 tracking-tight">Trí Tuệ Nhân Tạo AI</span>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">• 100% Real-time</span>
        </div>

        {/* Nút bật/tắt tiếng ẩn nhẹ nhàng khi hover */}
        <button
          onClick={toggleMute}
          className="p-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-200/60 dark:border-sky-800/50 text-slate-600 dark:text-slate-300 hover:text-sky-600 opacity-0 group-hover/ai-stream:opacity-100 transition-opacity pointer-events-auto cursor-pointer"
          title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
        >
          {isMuted ? <VolumeX size={11} /> : <Volume2 size={11} />}
        </button>
      </div>

    </div>
  );
};
