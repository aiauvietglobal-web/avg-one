import React from 'react';

/**
 * ⚙️ 2D KINETIC GEAR ECOSYSTEM (RIGHT HERO EMBLEM)
 * 
 * Biểu tượng Cơ Khí Động Học 2D Thuần Khiết (Frameless 2D Kinetic Precision):
 * - Hoàn toàn không có khung hộp hay màn hình đen bao quanh.
 * - Cụm 3 Bánh răng Haute Horlogerie 2D kết nối ăn khớp cơ học mượt mà.
 * - Bánh răng Master Vàng Hổ Phách (Royal Amber) xoay thuận +360°.
 * - 2 Bánh răng Vệ Tinh Lam Ngọc Titan (Sapphire) xoay ngược -360°.
 * - Vòng đai quỹ đạo chất lỏng bạch kim với các hạt vi mạch quay quanh.
 * - Vầng hào quang ấm áp, nổi bật thanh lịch trên nền web sáng và tối.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng vi cơ khí 12 răng chuẩn kỹ thuật (Pitch R = 36, Outer R = 41, Root R = 31.5, Hole R = 16)
  const masterGearPath = 
    "M 31.50 0.00 L 31.29 3.62 L 39.82 7.38 L 38.18 13.52 L 28.91 12.51 " +
    "L 27.28 15.75 L 25.29 18.78 L 30.80 26.30 L 26.30 30.80 L 18.78 25.29 " +
    "L 15.75 27.28 L 12.51 28.91 L 13.52 38.18 L 7.38 39.82 L 3.62 31.29 " +
    "L 0.00 31.50 L -3.62 31.29 L -7.38 39.82 L -13.52 38.18 L -12.51 28.91 " +
    "L -15.75 27.28 L -18.78 25.29 L -26.30 30.80 L -30.80 26.30 L -25.29 18.78 " +
    "L -27.28 15.75 L -28.91 12.51 L -38.18 13.52 L -39.82 7.38 L -31.29 3.62 " +
    "L -31.50 0.00 L -31.29 -3.62 L -39.82 -7.38 L -38.18 -13.52 L -28.91 -12.51 " +
    "L -27.28 -15.75 L -25.29 -18.78 L -30.80 -26.30 L -26.30 -30.80 L -18.78 -25.29 " +
    "L -15.75 -27.28 L -12.51 -28.91 L -13.52 -38.18 L -7.38 -39.82 L -3.62 -31.29 " +
    "L -0.00 -31.50 L 3.62 -31.29 L 7.38 -39.82 L 13.52 -38.18 L 12.51 -28.91 " +
    "L 15.75 -27.28 L 18.78 -25.29 L 26.30 -30.80 L 30.80 -26.30 L 25.29 -18.78 " +
    "L 27.28 -15.75 L 28.91 -12.51 L 38.18 -13.52 L 39.82 -7.38 L 31.29 -3.62 Z " +
    "M 16 0 A 16 16 0 1 0 -16 0 A 16 16 0 1 0 16 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Vầng hào quang năng lượng ấm áp phía sau bánh răng */}
          <radialGradient id="gear-ambient-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Bánh răng Vàng Hổ Phách & Vàng Hoàng Gia */}
          <linearGradient id="gear-royal-amber-2d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="90%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Bánh răng Lam Ngọc & Bạch Kim */}
          <linearGradient id="gear-sapphire-2d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="90%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Viền vát kim cương phản quang ánh sáng trắng */}
          <linearGradient id="gear-specular-2d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
          </linearGradient>

          {/* Chân kính Ruby đính tâm */}
          <radialGradient id="ruby-jewel-2d" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="40%" stopColor="#F43F5E" />
            <stop offset="80%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Bóng đổ nhẹ nhàng giúp bánh răng nổi bật trên nền sáng */}
          <filter id="gear-floating-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.14" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#D97706" floodOpacity="0.2" />
          </filter>
        </defs>

        <style>{`
          @keyframes gear-float-smooth {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes gear-halo-pulse {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          .anim-gear-mechanism { animation: gear-float-smooth 6s ease-in-out infinite; }
          .anim-gear-halo { animation: gear-halo-pulse 5s ease-in-out infinite; transform-origin: 130px 130px; }
        `}</style>

        {/* 🌟 VẦNG HÀO QUANG ÁNH SÁNG NỀN */}
        <circle cx="130" cy="130" r="120" fill="url(#gear-ambient-glow)" className="anim-gear-halo" />

        {/* ⚙️ CỤM BÁNH RĂNG KINETIC 2D NỔI TRÊN NỀN */}
        <g className="anim-gear-mechanism" filter="url(#gear-floating-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO BẠCH KIM BẢO VỆ CỖ MÁY */}
          <g transform="translate(130, 130) rotate(-16)">
            <ellipse
              cx="0"
              cy="0"
              rx="105"
              ry="42"
              stroke="#0284C7"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="40 15 20 15"
              opacity="0.5"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="102"
              ry="40"
              stroke="#F59E0B"
              strokeWidth="0.8"
              fill="none"
              opacity="0.6"
            />
            <circle cx="105" cy="0" r="3" fill="#F59E0B" />
            <circle cx="-105" cy="0" r="3" fill="#38BDF8" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG HỔ PHÁCH HOÀNG GIA (MASTER GEAR) */}
          {/* Tâm: (130, 98) - 12 răng - Xoay thuận (+360°) trong 15s        */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(130, 98)">
            <g>
              {/* Bóng chân bánh răng */}
              <g transform="translate(0, 3)">
                <path d={masterGearPath} fill="#0F172A" fillRule="evenodd" opacity="0.12" />
              </g>

              {/* Thân bánh răng */}
              <path
                d={masterGearPath}
                fill="url(#gear-royal-amber-2d)"
                stroke="#D97706"
                strokeWidth="1.2"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-2d)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#7C2D12" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              {/* 4 Chấu kim loại định vị */}
              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              {/* Tâm đính chân kính Ruby */}
              <circle cx="0" cy="0" r="7" fill="#451A03" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="url(#ruby-jewel-2d)" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI TRÁI - LAM NGỌC TITAN (LEFT PRECISION GEAR)  */}
          {/* Tâm: (79, 150) - 12 răng - Xoay ngược (-360°) 15s, pha -15°    */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(79, 150)">
            <g>
              <g transform="translate(0, 3)">
                <path d={masterGearPath} fill="#0F172A" fillRule="evenodd" opacity="0.12" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-2d)"
                stroke="#0284C7"
                strokeWidth="1.2"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-2d)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="7" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-15 0 0"
                to="-375 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI PHẢI - LAM NGỌC TITAN (RIGHT PRECISION GEAR) */}
          {/* Tâm: (181, 150) - 12 răng - Xoay ngược (-360°) 15s, pha +15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(181, 150)">
            <g>
              <g transform="translate(0, 3)">
                <path d={masterGearPath} fill="#0F172A" fillRule="evenodd" opacity="0.12" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-2d)"
                stroke="#0284C7"
                strokeWidth="1.2"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-2d)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="7" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="15 0 0"
                to="-345 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
