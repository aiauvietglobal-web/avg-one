import React from 'react';

/**
 * ⚙️ HAUTE HORLOGERIE KINETIC GEAR ECOSYSTEM (RIGHT HERO EMBLEM)
 * 
 * Phong cách Cơ khí Xa xỉ & Tinh tế Đỉnh cao (Ultra-Refined Swiss Precision):
 * - Bộ 3 Bánh răng vi cơ khí 12 răng mảnh dẻ (Fine-Pitch Skeletonized Chronograph Gears).
 * - Bảng màu tinh tế, thanh nhã: Vàng Champagne / Hổ Phách Nhẹ (Top Gear) & Bạch Kim / Lam Ngọc (Bottom Gears).
 * - Cấu trúc lộ cơ tinh xảo (Skeletonized Wheels) với nan hoa khí động học, vòng chia độ micro-chronometer và chân kính Ruby.
 * - Loại bỏ hoàn toàn đĩa tròn đứt nét rời rạc dưới chân; thay bằng bóng đổ mờ quang học nhẹ nhàng, gắn kết tự nhiên.
 * - Chuyển động xoay ăn khớp 60fps mượt mà, lơ lửng êm ái trong không gian.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng vi cơ khí 12 răng chuẩn kỹ thuật (Pitch R = 36, Outer R = 40.5, Root R = 31.5, Hole R = 16)
  const fineGearPath = 
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
        viewBox="0 0 380 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ GRADIENT TINH TẾ, TRONG TRẺO & SANG TRỌNG 🌟 */}
          
          {/* Gradient Bánh Răng Vàng Champagne / Hổ Phách Nhẹ (Top Gear) */}
          <linearGradient id="fine-amber-champagne" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Gradient Bánh Răng Lam Ngọc / Bạch Kim Trong Trẻo (Bottom Gears) */}
          <linearGradient id="fine-sapphire-platinum" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E0F2FE" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Vát cạnh 3D siêu mỏng nhẹ (Subtle 3D Rim) */}
          <linearGradient id="fine-bevel-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.65" />
          </linearGradient>

          {/* Vành vát kim cương phản quang ánh sáng trắng (Gleam Edge) */}
          <linearGradient id="fine-gleam-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
          </linearGradient>

          {/* Chân kính Ruby siêu nhỏ tinh xảo */}
          <radialGradient id="fine-ruby-pivot" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="40%" stopColor="#F43F5E" />
            <stop offset="80%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          {/* Đĩa phản chiếu ánh sáng êm dịu nâng đỡ khối (Tự nhiên, không tách rời) */}
          <radialGradient id="fine-ground-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.06" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Bộ lọc bóng đổ mềm mại, có chiều sâu quang học */}
          <filter id="fine-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.10" />
          </filter>
        </defs>

        <style>{`
          @keyframes fine-horlogerie-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes fine-ambient-breathe {
            0%, 100% { opacity: 0.75; transform: scale(1); }
            50% { opacity: 0.95; transform: scale(1.04); }
          }
          .anim-gear-float { animation: fine-horlogerie-float 6s ease-in-out infinite; }
          .anim-ambient-breathe { animation: fine-ambient-breathe 4s ease-in-out infinite; transform-origin: 190px 195px; }
        `}</style>

        {/* ========================================================================= */}
        {/* VÙNG NÂNG ĐỠ QUANG HỌC DƯỚI CHÂN (GROUNDING AMBIENT OCCLUSION)            */}
        {/* ========================================================================= */}
        <g id="grounding-ambient" transform="translate(190, 195)">
          {/* Vùng phản chiếu êm ái sát đáy bánh răng */}
          <ellipse cx="0" cy="0" rx="84" ry="16" fill="url(#fine-ground-ambient)" className="anim-ambient-breathe" />
          
          {/* Vạch đo lường vi cơ khí tinh tế (Micro Aerospace Scale) */}
          <ellipse cx="0" cy="0" rx="72" ry="13" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="48" ry="8.5" stroke="#F59E0B" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.25" />
          <circle cx="-72" cy="0" r="1.5" fill="#0284C7" opacity="0.6" />
          <circle cx="72" cy="0" r="1.5" fill="#F59E0B" opacity="0.6" />
        </g>

        {/* ========================================================================= */}
        {/* KHỐI CHÍNH: CỖ MÁY 3 BÁNH RĂNG VI CƠ KHÍ THỤY SĨ (HAUTE HORLOGERIE TRIAD) */}
        {/* ========================================================================= */}
        <g className="anim-gear-float" filter="url(#fine-soft-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO BẠCH KIM THANH THOÁT ÔM LẤY BỘ MÁY */}
          <g transform="translate(190, 122) rotate(-18)">
            <ellipse
              cx="0"
              cy="0"
              rx="90"
              ry="34"
              stroke="#0284C7"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="40 12 20 12"
              opacity="0.35"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="88"
              ry="32.5"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              fill="none"
              opacity="0.6"
            />
            <circle cx="90" cy="0" r="2" fill="#38BDF8" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG CHAMPAGNE / HỔ PHÁCH TINH TẾ     */}
          {/* Tâm: (190, 88) - 12 răng - Xoay thuận chiều (+360°) trong 16s  */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(190, 88)">
            <g>
              {/* Lớp dày 3D siêu nhẹ 2.5px */}
              <g transform="translate(0, 2.5)">
                <path d={fineGearPath} fill="url(#fine-bevel-shadow)" fillRule="evenodd" />
              </g>

              {/* Mặt Bánh Răng Vàng Champagne bóng bẩy */}
              <path
                d={fineGearPath}
                fill="url(#fine-amber-champagne)"
                stroke="#D97706"
                strokeWidth="0.8"
                fillRule="evenodd"
              />

              {/* Gờ vát kim cương phản quang ánh sáng trắng viền mặt trên */}
              <circle cx="0" cy="0" r="24" stroke="url(#fine-gleam-edge)" strokeWidth="0.9" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#B45309" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

              {/* 4 Nan hoa khí động học phay rỗng (Skeletonized Cutouts) */}
              <line x1="-15" y1="0" x2="-23" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="15" y1="0" x2="23" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="-15" x2="0" y2="-23" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="15" x2="0" y2="23" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

              {/* Trục xoay chân kính Ruby đỏ xa xỉ */}
              <circle cx="0" cy="0" r="6.5" fill="#451A03" stroke="#F59E0B" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.5" fill="url(#fine-ruby-pivot)" stroke="#FFFFFF" strokeWidth="0.6" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity="0.95" />

              {/* Xoay 60fps mượt mà thuận chiều kim đồng hồ */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="16s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI TRÁI - LAM NGỌC & BẠCH KIM TRONG TRẺO        */}
          {/* Tâm: (139, 139) - 12 răng - Xoay ngược chiều (-360°) 16s, -15° */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(139, 139)">
            <g>
              <g transform="translate(0, 2.5)">
                <path d={fineGearPath} fill="url(#fine-bevel-shadow)" fillRule="evenodd" />
              </g>

              <path
                d={fineGearPath}
                fill="url(#fine-sapphire-platinum)"
                stroke="#0284C7"
                strokeWidth="0.8"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24" stroke="url(#fine-gleam-edge)" strokeWidth="0.9" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#0369A1" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

              <line x1="-15" y1="0" x2="-23" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="15" y1="0" x2="23" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="-15" x2="0" y2="-23" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="15" x2="0" y2="23" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

              {/* Nắp trục Titan nung xanh Coban */}
              <circle cx="0" cy="0" r="6.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.6" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-15 0 0"
                to="-375 0 0"
                dur="16s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI PHẢI - LAM NGỌC & BẠCH KIM TRONG TRẺO       */}
          {/* Tâm: (241, 139) - 12 răng - Xoay ngược chiều (-360°) 16s, +15° */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(241, 139)">
            <g>
              <g transform="translate(0, 2.5)">
                <path d={fineGearPath} fill="url(#fine-bevel-shadow)" fillRule="evenodd" />
              </g>

              <path
                d={fineGearPath}
                fill="url(#fine-sapphire-platinum)"
                stroke="#0284C7"
                strokeWidth="0.8"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24" stroke="url(#fine-gleam-edge)" strokeWidth="0.9" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#0369A1" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

              <line x1="-15" y1="0" x2="-23" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="15" y1="0" x2="23" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="-15" x2="0" y2="-23" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="15" x2="0" y2="23" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

              <circle cx="0" cy="0" r="6.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.6" />
              <circle cx="-1.4" cy="-1.4" r="1.2" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="15 0 0"
                to="-345 0 0"
                dur="16s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
