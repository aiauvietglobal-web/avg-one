import React from 'react';

/**
 * ⚙️ KINETIC GEAR ECOSYSTEM - SEAMLESS AMBIENT BLEND (RIGHT HERO COMPONENT)
 * 
 * Thiết kế Hòa Trộn Tự Nhiên & Kết Nối Liền Mạch Với Nền (Seamless Ambient Integration):
 * - Xóa bỏ hoàn toàn thanh tiêu đề, traffic lights, khung viền chữ nhật và các dải đen che chắn.
 * - Cụm 3 Bánh răng vi cơ khí 12 răng 3D Haute Horlogerie lơ lửng tự do, xoay 60fps mượt mà.
 * - Vầng hào quang quang học mềm mại chuyển sắc giữa Lam ngọc (#0284C7) và Cam Hổ phách (#F59E0B) tan biến vào nền lưới pastel.
 * - Các đường liên kết tọa độ và vòng quỹ đạo mở rộng, nối liền với hệ thống lưới của trang web.
 * - Chỉ số trạng thái dạng pill kính mờ tinh tế đồng bộ 100% với bên trái.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng vi cơ khí 12 răng chuẩn kỹ thuật (Pitch R = 34, Outer R = 39, Root R = 29.5, Hole R = 15)
  const masterGearPath = 
    "M 29.50 0.00 L 29.30 3.39 L 37.30 6.92 L 35.76 12.67 L 27.08 11.72 " +
    "L 25.55 14.76 L 23.68 17.50 L 28.84 24.64 L 24.64 28.84 L 17.50 23.68 " +
    "L 14.76 25.55 L 11.72 27.08 L 12.67 35.76 L 6.92 37.30 L 3.39 29.30 " +
    "L 0.00 29.50 L -3.39 29.30 L -6.92 37.30 L -12.67 35.76 L -11.72 27.08 " +
    "L -14.76 25.55 L -17.50 23.68 L -24.64 28.84 L -28.84 24.64 L -23.68 17.50 " +
    "L -25.55 14.76 L -27.08 11.72 L -35.76 12.67 L -37.30 6.92 L -29.30 3.39 " +
    "L -29.50 0.00 L -29.30 -3.39 L -37.30 -6.92 L -35.76 -12.67 L -27.08 -11.72 " +
    "L -25.55 -14.76 L -23.68 -17.50 L -28.84 -24.64 L -24.64 -28.84 L -17.50 -23.68 " +
    "L -14.76 -25.55 L -11.72 -27.08 L -12.67 -35.76 L -6.92 -37.30 L -3.39 -29.30 " +
    "L -0.00 -29.50 L 3.39 -29.30 L 6.92 -37.30 L 12.67 -35.76 L 11.72 -27.08 " +
    "L 14.76 -25.55 L 17.50 -23.68 L 24.64 -28.84 L 28.84 -24.64 L 23.68 -17.50 " +
    "L 25.55 -14.76 L 27.08 -11.72 L 35.76 -12.67 L 37.30 -6.92 L 29.30 -3.39 Z " +
    "M 15 0 A 15 15 0 1 0 -15 0 A 15 15 0 1 0 15 0 Z";

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-auto group/gear-stream ${className}`}>
      
      {/* 1. VẦNG HÀO QUANG QUANG HỌC KẾT NỐI VÀO NỀN (AMBIENT BACKGROUND HALO) */}
      <div className="absolute inset-0 -m-8 pointer-events-none -z-10 flex items-center justify-center">
        {/* Lớp hào quang Vàng Hổ Phách & Lam Ngọc hòa tan vào lưới caro */}
        <div 
          className="w-full h-full rounded-full blur-3xl opacity-45 dark:opacity-35 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.28) 0%, rgba(2, 132, 199, 0.2) 45%, transparent 75%)',
            animationDuration: '6s'
          }}
        />
        <div 
          className="absolute w-3/4 h-3/4 rounded-full blur-2xl opacity-25"
          style={{
            background: 'radial-gradient(circle at 40% 60%, rgba(56, 189, 248, 0.3) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* 2. CÁC TIA TỌA ĐỘ VÀ VÒNG QUỸ ĐẠO KẾT NỐI VỚI LƯỚI NỀN (CONNECTIVE GRID GUIDES) */}
      <svg
        viewBox="0 0 420 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradients hòa tan đường gióng vào lưới nền */}
          <linearGradient id="gear-connect-fade-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Bánh răng Vàng Hổ Phách Hoàng Gia */}
          <linearGradient id="gear-amber-blend" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="90%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Bánh răng Lam Ngọc & Bạch Kim */}
          <linearGradient id="gear-sapphire-blend" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E0F2FE" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Viền kim cương phản quang ánh sáng trắng */}
          <linearGradient id="gear-edge-blend" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
          </linearGradient>

          {/* Chân kính Ruby đính tâm */}
          <radialGradient id="ruby-pivot-blend" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="40%" stopColor="#F43F5E" />
            <stop offset="80%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Bóng đổ quang học tự nhiên hòa vào không gian */}
          <filter id="gear-natural-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.14" />
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.2" />
          </filter>
        </defs>

        <style>{`
          @keyframes gear-float-natural {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          .anim-gears-natural { animation: gear-float-natural 6s ease-in-out infinite; }
        `}</style>

        {/* 2.1 CÁC ĐƯỜNG GIÓNG HÒA VÀO LƯỚI NỀN TRANG WEB */}
        <g opacity="0.5" className="dark:opacity-40">
          <line x1="10" y1="150" x2="410" y2="150" stroke="url(#gear-connect-fade-h)" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="60" y1="210" x2="360" y2="210" stroke="url(#gear-connect-fade-h)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
          <line x1="60" y1="90" x2="360" y2="90" stroke="url(#gear-connect-fade-h)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

          {/* Vòng đai quỹ đạo năng lượng mềm mại */}
          <ellipse
            cx="210"
            cy="150"
            rx="175"
            ry="78"
            stroke="#0284C7"
            strokeWidth="1.2"
            strokeDasharray="40 15 20 15"
            opacity="0.35"
            transform="rotate(12, 210, 150)"
          />
          <circle cx="50" cy="120" r="2.2" fill="#F59E0B" />
          <circle cx="370" cy="180" r="2.2" fill="#38BDF8" />
        </g>

        {/* 2.2 CỤM 3 BÁNH RĂNG VI CƠ KHÍ LƠ LỬNG TỰ NHIÊN (KINETIC ENGINE) */}
        <g className="anim-gears-natural" filter="url(#gear-natural-shadow)">
          
          {/* Vòng đai bảo vệ ôm quanh bộ máy */}
          <ellipse
            cx="210"
            cy="145"
            rx="92"
            ry="36"
            stroke="#0284C7"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="35 12 18 12"
            opacity="0.45"
            transform="rotate(-15, 210, 145)"
          />

          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG HỔ PHÁCH HOÀNG GIA (210, 110) */}
          <g transform="translate(210, 110)">
            <g>
              <g transform="translate(0, 3)">
                <path d={masterGearPath} fill="#0F172A" fillRule="evenodd" opacity="0.25" />
              </g>
              <path d={masterGearPath} fill="url(#gear-amber-blend)" stroke="#D97706" strokeWidth="0.9" fillRule="evenodd" />
              <circle cx="0" cy="0" r="23" stroke="url(#gear-edge-blend)" strokeWidth="1" fill="none" />
              <circle cx="0" cy="0" r="21.5" stroke="#B45309" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />
              
              <line x1="-15" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="15" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-15" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="15" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="6.5" fill="#451A03" stroke="#F59E0B" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.5" fill="url(#ruby-pivot-blend)" stroke="#FFFFFF" strokeWidth="0.7" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity="0.95" />

              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
            </g>
          </g>

          {/* BÁNH RĂNG 2: DƯỚI TRÁI - LAM NGỌC & BẠCH KIM (162, 158) */}
          <g transform="translate(162, 158)">
            <g>
              <g transform="translate(0, 3)">
                <path d={masterGearPath} fill="#0F172A" fillRule="evenodd" opacity="0.25" />
              </g>
              <path d={masterGearPath} fill="url(#gear-sapphire-blend)" stroke="#0284C7" strokeWidth="0.9" fillRule="evenodd" />
              <circle cx="0" cy="0" r="23" stroke="url(#gear-edge-blend)" strokeWidth="1" fill="none" />
              <circle cx="0" cy="0" r="21.5" stroke="#0369A1" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

              <line x1="-15" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="15" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-15" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="15" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="6.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.7" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity="0.95" />

              <animateTransform attributeName="transform" type="rotate" from="-15 0 0" to="-375 0 0" dur="15s" repeatCount="indefinite" />
            </g>
          </g>

          {/* BÁNH RĂNG 3: DƯỚI PHẢI - LAM NGỌC & BẠCH KIM (258, 158) */}
          <g transform="translate(258, 158)">
            <g>
              <g transform="translate(0, 3)">
                <path d={masterGearPath} fill="#0F172A" fillRule="evenodd" opacity="0.25" />
              </g>
              <path d={masterGearPath} fill="url(#gear-sapphire-blend)" stroke="#0284C7" strokeWidth="0.9" fillRule="evenodd" />
              <circle cx="0" cy="0" r="23" stroke="url(#gear-edge-blend)" strokeWidth="1" fill="none" />
              <circle cx="0" cy="0" r="21.5" stroke="#0369A1" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

              <line x1="-15" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="15" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-15" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="15" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="6.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.7" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity="0.95" />

              <animateTransform attributeName="transform" type="rotate" from="15 0 0" to="-345 0 0" dur="15s" repeatCount="indefinite" />
            </g>
          </g>
        </g>
      </svg>

      {/* 3. CHỈ SỐ NHẸ NHÀNG KHÔNG KHUNG VIỀN (SUBTLE FLOATING HUD ACCENT) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none whitespace-nowrap">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-amber-200/60 dark:border-amber-800/50 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-800 dark:text-amber-300 tracking-tight">Vận Hành & Tự Động Hóa</span>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">• 20 Nhân sự lõi</span>
        </div>
      </div>

    </div>
  );
};
