import React from 'react';

/**
 * ⚙️ 2D KINETIC GEAR ECOSYSTEM (RIGHT HERO EMBLEM - ZERO SHADOW)
 * 
 * Biểu tượng Cơ Khí Động Học 2D Thuần Khiết (Pure Crisp 2D Vector):
 * - Hoàn toàn KHÔNG bóng đổ (No Shadow / No Blur / No Halo).
 * - Cụm 3 Bánh răng Haute Horlogerie 2D kết nối ăn khớp cơ học mượt mà.
 * - Bánh răng Master Vàng Hổ Phách (Royal Amber) xoay thuận +360°.
 * - 2 Bánh răng Vệ Tinh Lam Ngọc Titan (Sapphire) xoay ngược -360°.
 * - Vòng đai quỹ đạo chất lỏng bạch kim với các hạt vi mạch quay quanh.
 * - Đường nét sắc bén, trong suốt, nổi thuần túy trực tiếp trên nền web.
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
        </defs>

        <style>{`
          @keyframes gear-float-smooth {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          .anim-gear-mechanism { animation: gear-float-smooth 6s ease-in-out infinite; }
        `}</style>

        {/* ⚙️ CỤM BÁNH RĂNG KINETIC 2D THUẦN VECTOR - KHÔNG SHADOW */}
        <g className="anim-gear-mechanism">
          
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
              opacity="0.6"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="102"
              ry="40"
              stroke="#F59E0B"
              strokeWidth="0.8"
              fill="none"
              opacity="0.75"
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
