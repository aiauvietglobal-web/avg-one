import React from 'react';

/**
 * ⚙️ ULTRA-MODERN PRECISION KINETIC ENGINE (RIGHT HERO EMBLEM)
 * 
 * Phong cách Thiết kế Công nghệ Cao cấp 2026 (Modern High-End Luxury Tech):
 * - Tương phản cực cao trên nền sáng (High Contrast Navy & Titanium Chrome, không nhợt nhạt, không chói mắt).
 * - Cụm 3 Bánh răng 3D dày dặn (Extruded 3D Depth) có mặt vát kim cương, phay xước CNC sắc lẹm.
 * - Xoay ăn khớp cơ học 60fps mượt mà theo chuẩn Haute Horlogerie Thụy Sĩ.
 * - Trục xoay đính chân kính Ruby & Nắp titan phay xước bóng bẩy.
 * - Loại bỏ hoàn toàn bệ đài rối rắm, chùm sáng mờ nhạt và dây nhợ vụn vặt; thay bằng đế phản chiếu kính mờ sang trọng.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng 8 răng chuẩn kỹ thuật (Pitch R = 36, Outer R = 45, Root R = 28, Hole R = 14)
  const gearFacePath = 
    "M 28.00 0.00 L 27.58 4.81 L 43.62 11.20 L 38.76 22.93 L 22.91 16.10 " +
    "L 19.80 19.80 L 16.10 22.91 L 22.93 38.76 L 11.20 43.62 L 4.81 27.58 " +
    "L 0.00 28.00 L -4.81 27.58 L -11.20 43.62 L -22.93 38.76 L -16.10 22.91 " +
    "L -19.80 19.80 L -22.91 16.10 L -38.76 22.93 L -43.62 11.20 L -27.58 4.81 " +
    "L -28.00 0.00 L -27.58 -4.81 L -43.62 -11.20 L -38.76 -22.93 L -22.91 -16.10 " +
    "L -19.80 -19.80 L -16.10 -22.91 L -22.93 -38.76 L -11.20 -43.62 L -4.81 -27.58 " +
    "L -0.00 -28.00 L 4.81 -27.58 L 11.20 -43.62 L 22.93 -38.76 L 16.10 -22.91 " +
    "L 19.80 -19.80 L 22.91 -16.10 L 38.76 -22.93 L 43.62 -11.20 L 27.58 -4.81 Z " +
    "M 14 0 A 14 14 0 1 0 -14 0 A 14 14 0 1 0 14 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 380 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ GRADIENT KIM LOẠI TITAN & COBALT SANG TRỌNG (HIGH CONTRAST) */}
          
          {/* Mặt Bánh Răng Vàng Cam Titan Đỉnh (Rose Gold & Amber Titanium) */}
          <linearGradient id="gear-amber-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="25%" stopColor="#FDBA74" />
            <stop offset="60%" stopColor="#F15A24" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Mặt Bánh Răng Xanh Coban Titan Sâu (Deep Cobalt Titanium) */}
          <linearGradient id="gear-cobalt-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#BAE6FD" />
            <stop offset="55%" stopColor="#0284C7" />
            <stop offset="85%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </linearGradient>

          {/* Mặt Cạnh Dày 3D Bánh Răng (3D Extrusion Shadow Rim) */}
          <linearGradient id="gear-3d-bevel-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0A0F1D" />
          </linearGradient>

          {/* Vành Vát Kim Cương Phản Quang Sắc Lẹm (Diamond Chamfer) */}
          <linearGradient id="gear-specular-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
          </linearGradient>

          {/* Nắp Trục Chân Kính Ruby (Ruby Jewel) */}
          <radialGradient id="ruby-core" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="35%" stopColor="#E11D48" />
            <stop offset="75%" stopColor="#9F1239" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Đĩa Phản Chiếu Kính Mờ Đáy (Frosted Reflection Base) */}
          <radialGradient id="frosted-glass-disc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="85%" stopColor="#0284C7" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Bóng đổ vật lý mềm mại cho khối 3D */}
          <filter id="soft-depth-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.16" />
          </filter>

          <filter id="gear-subtle-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.25" />
          </filter>
        </defs>

        <style>{`
          @keyframes engine-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes ambient-pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.04); opacity: 1; }
          }
          .anim-engine-sculpture { animation: engine-float 6s ease-in-out infinite; }
          .anim-ambient-pulse { animation: ambient-pulse 4s ease-in-out infinite; transform-origin: 190px 255px; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG ĐÁY: ĐĨA KÍNH MỜ PHẢN CHIẾU SANG TRỌNG (MINIMALIST LUXURY REFLECTION) */}
        {/* ========================================================================= */}
        <g id="luxury-pedestal" transform="translate(190, 255)">
          {/* Đĩa phản chiếu êm ái dưới chân */}
          <ellipse cx="0" cy="0" rx="100" ry="24" fill="url(#frosted-glass-disc)" className="anim-ambient-pulse" />
          
          {/* Vành định vị chân trời thanh mảnh */}
          <ellipse cx="0" cy="0" rx="88" ry="20" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="60" ry="14" stroke="#F15A24" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />

          {/* Các hạt vi tinh thể định vị trên quỹ đạo */}
          <circle cx="-88" cy="0" r="2" fill="#0284C7" opacity="0.7" />
          <circle cx="88" cy="0" r="2" fill="#F15A24" opacity="0.7" />
        </g>

        {/* ========================================================================= */}
        {/* KHỐI CHÍNH: CỖ MÁY 3 BÁNH RĂNG ĐỘNG HỌC 3D (KINETIC CHRONO SCULPTURE)     */}
        {/* ========================================================================= */}
        <g className="anim-engine-sculpture" filter="url(#soft-depth-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO BẠCH KIM UỐN LƯỢN XUNG QUANH (ORBITAL STABILITY RING) */}
          <g transform="translate(190, 140) rotate(-22)">
            <ellipse
              cx="0"
              cy="0"
              rx="92"
              ry="32"
              stroke="#0284C7"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="45 15 25 15"
              opacity="0.45"
            />
            <circle cx="92" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG CAM TITAN & KIM CƯƠNG           */}
          {/* Tâm: (190, 95) - Xoay thuận chiều kim đồng hồ (+360°) trong 14s*/}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(190, 95)">
            <g>
              {/* Lớp dày 3D Extrusion đổ bóng vật lý */}
              <g transform="translate(0, 5)">
                <path d={gearFacePath} fill="url(#gear-3d-bevel-shadow)" fillRule="evenodd" />
              </g>

              {/* Mặt Bánh Răng Vàng Cam Titan bóng bẩy */}
              <path
                d={gearFacePath}
                fill="url(#gear-amber-gold)"
                stroke="#C2410C"
                strokeWidth="1.2"
                fillRule="evenodd"
                filter="url(#gear-subtle-glow)"
              />

              {/* Gờ vát kim cương mặt trên phản chiếu ánh sáng trắng */}
              <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.8" />
              <circle cx="0" cy="0" r="21" stroke="#7C2D12" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.7" />

              {/* 4 Nan hoa rãnh phay CNC */}
              <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />

              {/* Trục xoay chân kính Ruby đỏ xa xỉ */}
              <circle cx="0" cy="0" r="8" fill="#431407" stroke="#EA580C" strokeWidth="1" />
              <circle cx="0" cy="0" r="5.5" fill="url(#ruby-core)" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.8" cy="-1.8" r="1.5" fill="#FFFFFF" opacity="0.9" />

              {/* Xoay 60fps mượt mà thuận chiều kim đồng hồ */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI TRÁI - TITAN XANH COBAN SÂU                  */}
          {/* Tâm: (138, 147) - Xoay ngược chiều kim đồng hồ (-360°) trong 14s*/}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(138, 147)">
            <g>
              <g transform="translate(0, 5)">
                <path d={gearFacePath} fill="url(#gear-3d-bevel-shadow)" fillRule="evenodd" />
              </g>

              <path
                d={gearFacePath}
                fill="url(#gear-cobalt-chrome)"
                stroke="#0369A1"
                strokeWidth="1.2"
                fillRule="evenodd"
                filter="url(#gear-subtle-glow)"
              />

              <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.85" />
              <circle cx="0" cy="0" r="21" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.65" />

              <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />

              {/* Nắp trục Titan nung xanh Coban */}
              <circle cx="0" cy="0" r="8" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />
              <circle cx="0" cy="0" r="5.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="0.8" />
              <circle cx="-1.8" cy="-1.8" r="1.5" fill="#FFFFFF" opacity="0.9" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-22.5 0 0"
                to="-382.5 0 0"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI PHẢI - TITAN XANH COBAN SÂU                 */}
          {/* Tâm: (242, 147) - Xoay ngược chiều kim đồng hồ (-360°) trong 14s*/}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(242, 147)">
            <g>
              <g transform="translate(0, 5)">
                <path d={gearFacePath} fill="url(#gear-3d-bevel-shadow)" fillRule="evenodd" />
              </g>

              <path
                d={gearFacePath}
                fill="url(#gear-cobalt-chrome)"
                stroke="#0369A1"
                strokeWidth="1.2"
                fillRule="evenodd"
                filter="url(#gear-subtle-glow)"
              />

              <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.85" />
              <circle cx="0" cy="0" r="21" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.65" />

              <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />

              <circle cx="0" cy="0" r="8" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />
              <circle cx="0" cy="0" r="5.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="0.8" />
              <circle cx="-1.8" cy="-1.8" r="1.5" fill="#FFFFFF" opacity="0.9" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="22.5 0 0"
                to="-337.5 0 0"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
