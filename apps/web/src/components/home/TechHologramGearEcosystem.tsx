import React from 'react';

/**
 * ⚙️ MODERN KINETIC GEAR ECOSYSTEM (AVG ONE 3D AUTOMATION PLATFORM - RIGHT SIDE)
 * 
 * Thiết kế phong cách đồ họa công nghệ hiện đại (Stripe & Linear Precision Style):
 * - Thoát ly hoàn toàn khỏi các khối hộp bệ thô cứng.
 * - Hệ thống khối thẻ 3D Isometric không gian đa tầng (Multi-Elevation Floating Tech Modules).
 * - Cụm 3 Bánh răng cơ học (Cam & Xanh dương) xoay mượt mà 60fps ăn khớp chuẩn xác.
 * - Các đường liên kết vector thanh mảnh, tinh tế, hiện đại, đối xứng hoàn hảo với bên trái.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng 8 răng chuẩn kỹ thuật (Pitch R = 38, Outer R = 46, Inner R = 30, Hole R = 15)
  const gearPath = 
    "M 30.00 0.00 A 30 30 0 0 1 28.23 10.16 L 41.31 20.24 A 46 46 0 0 1 35.90 28.76 L 21.21 21.21 " +
    "A 30 30 0 0 1 12.77 27.14 L 14.90 43.52 A 46 46 0 0 1 5.05 45.72 L 0.00 30.00 " +
    "A 30 30 0 0 1 -10.16 28.23 L -20.24 41.31 A 46 46 0 0 1 -28.76 35.90 L -21.21 21.21 " +
    "A 30 30 0 0 1 -27.14 12.77 L -43.52 14.90 A 46 46 0 0 1 -45.72 5.05 L -30.00 0.00 " +
    "A 30 30 0 0 1 -28.23 -10.16 L -41.31 -20.24 A 46 46 0 0 1 -35.90 -28.76 L -21.21 -21.21 " +
    "A 30 30 0 0 1 -12.77 -27.14 L -14.90 -43.52 A 46 46 0 0 1 -5.05 -45.72 L -0.00 -30.00 " +
    "A 30 30 0 0 1 10.16 -28.23 L 20.24 -41.31 A 46 46 0 0 1 28.76 -35.90 L 21.21 -21.21 " +
    "A 30 30 0 0 1 27.14 -12.77 L 43.52 -14.90 A 46 46 0 0 1 45.72 -5.05 L 30.00 -0.00 Z " +
    "M 15 0 A 15 15 0 1 0 -15 0 A 15 15 0 1 0 15 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <style>{`
          @keyframes kinetic-float-gear {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes kinetic-float-gear-mod1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes kinetic-float-gear-mod2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes kinetic-float-gear-mod3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes kinetic-pulse-gear-line {
            0%, 100% { stroke-dashoffset: 0; opacity: 0.45; }
            50% { stroke-dashoffset: -16; opacity: 0.85; }
          }
          .anim-gear-core { animation: kinetic-float-gear 4.5s ease-in-out infinite; }
          .anim-gear-mod1 { animation: kinetic-float-gear-mod1 3.8s ease-in-out infinite 0.3s; }
          .anim-gear-mod2 { animation: kinetic-float-gear-mod2 4.2s ease-in-out infinite 0.6s; }
          .anim-gear-mod3 { animation: kinetic-float-gear-mod3 3.6s ease-in-out infinite 0.2s; }
          .anim-pulse-gear { animation: kinetic-pulse-gear-line 3s linear infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* 1. HỆ THỐNG ĐƯỜNG LIÊN KẾT KHÔNG GIAN ISOMETRIC (ARCHITECTURAL GRID LINES) */}
        {/* ========================================================================= */}
        <g id="grid-gear-connectors" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" className="opacity-55 dark:opacity-40">
          {/* Trục liên kết từ Module 1 lên Gear trái */}
          <line x1="165" y1="210" x2="203.5" y2="185" strokeDasharray="4 4" className="anim-pulse-gear" />
          {/* Trục liên kết từ Module 2 lên Gear phải */}
          <line x1="355" y1="210" x2="316.5" y2="185" stroke="#F15A24" strokeDasharray="4 4" className="anim-pulse-gear" />
          {/* Trục liên kết từ Module 3 đáy lên Gear đỉnh */}
          <line x1="260" y1="275" x2="260" y2="195" stroke="#F15A24" strokeWidth="1.4" strokeDasharray="3 3" />
          {/* Vòng định vị không gian thanh mảnh */}
          <ellipse cx="260" cy="275" rx="140" ry="42" stroke="#F15A24" strokeWidth="1" strokeDasharray="6 8" fill="none" opacity="0.35" />
        </g>

        {/* ========================================================================= */}
        {/* 2. CÁC KHỐI MODULE THẺ 3D ISOMETRIC LƠ LỬNG (FLOATING SMART TECH CARDS)    */}
        {/* ========================================================================= */}

        {/* MODULE 1: BẢO MẬT TÀI CHÍNH (LOCK $) - BÊN TRÁI */}
        <g id="mod-lock" className="anim-gear-mod1">
          <g transform="translate(145, 210)" className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110">
            <polygon points="0,-16 26,-4 0,8 -26,-4" stroke="#0284C7" strokeWidth="1.6" className="fill-white/95 dark:fill-slate-900/95" />
            <polygon points="-26,-4 0,8 0,18 -26,6" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-50/90 dark:fill-slate-950/90" />
            <polygon points="0,8 26,-4 26,6 0,18" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/70 dark:fill-slate-800/70" />
            
            <polygon points="0,-11 18,-2 0,6 -18,-2" stroke="#38BDF8" strokeWidth="0.9" fill="none" strokeDasharray="3 2" opacity="0.8" />
            
            {/* Icon Lock $ */}
            <g transform="translate(0, -4) scale(0.9)">
              <path d="M -3 -1 L -3 -5 A 3 3 0 0 1 3 -5 L 3 -1" stroke="#0284C7" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <rect x="-4.5" y="-1" width="9" height="7" rx="1.2" stroke="#0284C7" strokeWidth="1.2" className="fill-white dark:fill-slate-900" />
              <text x="0" y="4.2" fill="#F15A24" fontSize="6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
            </g>
          </g>
        </g>

        {/* MODULE 2: ĐỘI NGŨ NHÂN SỰ & KHÁCH HÀNG (TEAM USERS) - BÊN PHẢI */}
        <g id="mod-users" className="anim-gear-mod2">
          <g transform="translate(375, 210)" className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110">
            <polygon points="0,-16 26,-4 0,8 -26,-4" stroke="#F15A24" strokeWidth="1.6" className="fill-white/95 dark:fill-slate-900/95" />
            <polygon points="-26,-4 0,8 0,18 -26,6" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-50/90 dark:fill-slate-950/90" />
            <polygon points="0,8 26,-4 26,6 0,18" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-100/70 dark:fill-slate-800/70" />
            
            <polygon points="0,-11 18,-2 0,6 -18,-2" stroke="#FB923C" strokeWidth="0.9" fill="none" strokeDasharray="3 2" opacity="0.8" />

            {/* Icon 3 Users */}
            <g transform="translate(0, -4) scale(0.9)">
              <circle cx="-4.5" cy="-2.5" r="1.8" stroke="#F15A24" strokeWidth="1" fill="none" />
              <path d="M -7 4 C -7 1.8 -5.2 0.8 -4.5 0.8 C -3.8 0.8 -2 1.8 -2 4" stroke="#F15A24" strokeWidth="1" fill="none" />
              <circle cx="4.5" cy="-2.5" r="1.8" stroke="#F15A24" strokeWidth="1" fill="none" />
              <path d="M 2 4 C 2 1.8 3.8 0.8 4.5 0.8 C 5.2 0.8 7 1.8 7 4" stroke="#F15A24" strokeWidth="1" fill="none" />
              <circle cx="0" cy="-3.5" r="2.4" stroke="#0284C7" strokeWidth="1.1" className="fill-white dark:fill-slate-900" />
              <path d="M -3.8 4.5 C -3.8 2 -2 0.6 0 0.6 C 2 0.6 3.8 2 3.8 4.5" stroke="#0284C7" strokeWidth="1.2" fill="none" />
            </g>
          </g>
        </g>

        {/* MODULE 3: TỰ ĐỘNG HÓA VẬN HÀNH (AUTOMATION ENGINE) - PHÍA TRƯỚC */}
        <g id="mod-gears-mini" className="anim-gear-mod3">
          <g transform="translate(260, 275)" className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110">
            <polygon points="0,-18 30,-5 0,8 -30,-5" stroke="#F15A24" strokeWidth="1.8" className="fill-white/95 dark:fill-slate-900/95" />
            <polygon points="-30,-5 0,8 0,20 -30,7" stroke="#F15A24" strokeWidth="1.8" className="fill-orange-100/90 dark:fill-slate-950/90" />
            <polygon points="0,8 30,-5 30,7 0,20" stroke="#0284C7" strokeWidth="1.8" className="fill-sky-100/70 dark:fill-slate-800/70" />

            <polygon points="0,-12 20,-3 0,6 -20,-3" stroke="#F15A24" strokeWidth="1" fill="none" opacity="0.8" />
            
            {/* Icon 2 Bánh răng mini */}
            <g transform="translate(0, -5) scale(0.9)">
              <circle cx="-3" cy="-3" r="4.2" stroke="#0284C7" strokeWidth="1.1" strokeDasharray="2.5 1.5" className="fill-white dark:fill-slate-900" />
              <circle cx="-3" cy="-3" r="1.3" className="fill-[#0284C7]" />
              <circle cx="3.5" cy="2.5" r="3.8" stroke="#F15A24" strokeWidth="1.1" strokeDasharray="2.5 1.5" className="fill-white dark:fill-slate-900" />
              <circle cx="3.5" cy="2.5" r="1.3" className="fill-[#F15A24]" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. CỤM 3 BÁNH RĂNG CƠ HỌC ĐỈNH CAO CHUYỂN ĐỘNG MƯỢT MÀ 60FPS               */}
        {/* ========================================================================= */}
        <g id="top-precision-gears" className="anim-gear-core">
          {/* Tọa độ hoàn hảo: X=260, Y=125 - Đồng bộ hoàn hảo với khối Tesseract bên trái! */}
          <g transform="translate(0, 0)">
            
            {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR) - MÀU CAM THƯƠNG HIỆU */}
            <g transform="translate(260, 82)">
              <g>
                <path
                  d={gearPath}
                  stroke="#F15A24"
                  strokeWidth="2.2"
                  className="fill-white dark:fill-slate-900"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="23" stroke="#F15A24" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
                <line x1="-15" y1="0" x2="-23" y2="0" stroke="#F15A24" strokeWidth="1.2" />
                <line x1="15" y1="0" x2="23" y2="0" stroke="#F15A24" strokeWidth="1.2" />
                <line x1="0" y1="-15" x2="0" y2="-23" stroke="#F15A24" strokeWidth="1.2" />
                <line x1="0" y1="15" x2="0" y2="23" stroke="#F15A24" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="7" stroke="#F15A24" strokeWidth="1.4" className="fill-orange-50 dark:fill-orange-950" />
                <circle cx="0" cy="0" r="2.5" className="fill-[#F15A24]" />

                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="12.6 0 0"
                  to="372.6 0 0"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </g>
            </g>

            {/* BÁNH RĂNG 2: DƯỚI BÊN TRÁI (BOTTOM-LEFT GEAR) - MÀU XANH DƯƠNG */}
            <g transform="translate(203.5, 132.8)">
              <g>
                <path
                  d={gearPath}
                  stroke="#0284C7"
                  strokeWidth="2.2"
                  className="fill-white dark:fill-slate-900"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="23" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
                <line x1="-15" y1="0" x2="-23" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="15" y1="0" x2="23" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="-15" x2="0" y2="-23" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="15" x2="0" y2="23" stroke="#0284C7" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="7" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-sky-950" />
                <circle cx="0" cy="0" r="2.5" className="fill-[#0284C7]" />

                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="-3.8 0 0"
                  to="-363.8 0 0"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </g>
            </g>

            {/* BÁNH RĂNG 3: DƯỚI BÊN PHẢI (BOTTOM-RIGHT GEAR) - MÀU XANH DƯƠNG */}
            <g transform="translate(316.5, 132.8)">
              <g>
                <path
                  d={gearPath}
                  stroke="#0284C7"
                  strokeWidth="2.2"
                  className="fill-white dark:fill-slate-900"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="23" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
                <line x1="-15" y1="0" x2="-23" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="15" y1="0" x2="23" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="-15" x2="0" y2="-23" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="15" x2="0" y2="23" stroke="#0284C7" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="7" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-sky-950" />
                <circle cx="0" cy="0" r="2.5" className="fill-[#0284C7]" />

                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="29.0 0 0"
                  to="-331.0 0 0"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
