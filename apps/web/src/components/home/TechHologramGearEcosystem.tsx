import React from 'react';

/**
 * ⚙️ HIGH-TECH MECHANICAL GEAR EMBLEM (AVG ONE AUTOMATION ENGINE - RIGHT SIDE)
 * 
 * Thiết kế biểu tượng nguyên khối cao cấp (Refined Monolithic Tech Emblem):
 * - Thoát ly hoàn toàn khỏi các chi tiết vụn vặt và hộp con rời rạc.
 * - Cụm 3 Bánh răng cơ học nghệ thuật (Cam & Xanh dương) xoay ăn khớp mượt mà 60fps.
 * - Khung đa giác hình học không gian (Isometric Hex-Prism Frame) đối xứng hoàn mỹ với bên trái ("Một đích đến Tươi sáng!").
 * - Chuyển động bồng bềnh êm ái 60fps chuẩn đồ họa công nghệ quốc tế.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng 8 răng chuẩn kỹ thuật (Pitch R = 35, Outer R = 43, Inner R = 27, Hole R = 14)
  const gearPath = 
    "M 27.00 0.00 A 27 27 0 0 1 25.41 9.14 L 38.62 18.91 A 43 43 0 0 1 33.56 26.88 L 19.09 19.09 " +
    "A 27 27 0 0 1 11.49 24.43 L 13.92 40.67 A 43 43 0 0 1 4.72 42.74 L 0.00 27.00 " +
    "A 27 27 0 0 1 -9.14 25.41 L -18.91 38.62 A 43 43 0 0 1 -26.88 33.56 L -19.09 19.09 " +
    "A 27 27 0 0 1 -24.43 11.49 L -40.67 13.92 A 43 43 0 0 1 -42.74 4.72 L -27.00 0.00 " +
    "A 27 27 0 0 1 -25.41 -9.14 L -38.62 -18.91 A 43 43 0 0 1 -33.56 -26.88 L -19.09 -19.09 " +
    "A 27 27 0 0 1 -11.49 -24.43 L -13.92 -40.67 A 43 43 0 0 1 -4.72 -42.74 L -0.00 -27.00 " +
    "A 27 27 0 0 1 9.14 -25.41 L 18.91 -38.62 A 43 43 0 0 1 26.88 -33.56 L 19.09 -19.09 " +
    "A 27 27 0 0 1 24.43 -11.49 L 40.67 -13.92 A 43 43 0 0 1 42.74 -4.72 L 27.00 -0.00 Z " +
    "M 14 0 A 14 14 0 1 0 -14 0 A 14 14 0 1 0 14 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 400 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <style>{`
          @keyframes emblem-float-right {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          .anim-emblem-right { animation: emblem-float-right 5s ease-in-out infinite 0.5s; }
        `}</style>

        {/* ========================================================================= */}
        {/* KHỐI BIỂU TƯỢNG NGUYÊN KHỐI BỒNG BỀNH (KINETIC FLOATING MONOLITH)          */}
        {/* ========================================================================= */}
        <g className="anim-emblem-right">
          
          {/* 1. KHUNG ĐA GIÁC CÔNG NGHỆ 3D (ISOMETRIC HEXAGONAL WIREFRAME ENCLOSURE) */}
          <g id="hex-frame-gear" stroke="#F15A24" strokeLinecap="round" strokeLinejoin="round">
            {/* Vòng đa giác lục giác ngoài cùng - Nét đôi công nghệ */}
            <polygon
              points="200,35 320,105 320,235 200,305 80,235 80,105"
              strokeWidth="1.6"
              strokeDasharray="6 4"
              className="opacity-45 dark:opacity-30"
              fill="none"
            />
            <polygon
              points="200,48 308,111 308,229 200,292 92,229 92,111"
              strokeWidth="1.2"
              className="opacity-70 dark:opacity-50 fill-white/80 dark:fill-slate-950/80"
            />

            {/* Các trục định vị kỹ thuật 6 hướng (Precision Axis Guidelines) */}
            <line x1="200" y1="48" x2="200" y2="90" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="200" y1="292" x2="200" y2="245" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="92" y1="111" x2="140" y2="138" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="308" y1="111" x2="260" y2="138" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="92" y1="229" x2="140" y2="202" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="308" y1="229" x2="260" y2="202" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />

            {/* Điểm nút tọa độ 6 góc (Corner Precision Node Markers) */}
            <circle cx="200" cy="48" r="3" stroke="#F15A24" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="308" cy="111" r="3" stroke="#F15A24" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="308" cy="229" r="3" stroke="#F15A24" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="200" cy="292" r="3" stroke="#F15A24" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="92" cy="229" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="92" cy="111" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
          </g>

          {/* 2. CÁC VÒNG ĐỊNH VỊ CƠ KHÍ XOAY (MECHANICAL ALIGNMENT RINGS) */}
          <g id="mechanical-rings" transform="translate(200, 170)">
            <ellipse
              cx="0"
              cy="0"
              rx="85"
              ry="32"
              stroke="#F15A24"
              strokeWidth="1.2"
              strokeDasharray="8 6"
              fill="none"
              opacity="0.55"
              transform="rotate(-25)"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="85"
              ry="32"
              stroke="#0284C7"
              strokeWidth="1.2"
              strokeDasharray="10 8"
              fill="none"
              opacity="0.55"
              transform="rotate(35)"
            />
            {/* Điểm định vị động cơ */}
            <circle cx="-72" cy="28" r="2.5" fill="#0284C7" />
            <circle cx="70" cy="-28" r="2.5" fill="#F15A24" />
          </g>

          {/* 3. CỤM 3 BÁNH RĂNG CƠ HỌC ĐỈNH CAO (PRECISION 3-GEAR CLUSTER) */}
          <g id="precision-gears-core">
            
            {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR) - MÀU CAM THƯƠNG HIỆU */}
            <g transform="translate(200, 122)">
              <g>
                <path
                  d={gearPath}
                  stroke="#F15A24"
                  strokeWidth="2.2"
                  className="fill-white dark:fill-slate-900"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="21" stroke="#F15A24" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
                <line x1="-14" y1="0" x2="-21" y2="0" stroke="#F15A24" strokeWidth="1.2" />
                <line x1="14" y1="0" x2="21" y2="0" stroke="#F15A24" strokeWidth="1.2" />
                <line x1="0" y1="-14" x2="0" y2="-21" stroke="#F15A24" strokeWidth="1.2" />
                <line x1="0" y1="14" x2="0" y2="21" stroke="#F15A24" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="6.5" stroke="#F15A24" strokeWidth="1.4" className="fill-orange-50 dark:fill-orange-950" />
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
            <g transform="translate(148, 172)">
              <g>
                <path
                  d={gearPath}
                  stroke="#0284C7"
                  strokeWidth="2.2"
                  className="fill-white dark:fill-slate-900"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="21" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
                <line x1="-14" y1="0" x2="-21" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="14" y1="0" x2="21" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="-14" x2="0" y2="-21" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="14" x2="0" y2="21" stroke="#0284C7" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="6.5" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-sky-950" />
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
            <g transform="translate(252, 172)">
              <g>
                <path
                  d={gearPath}
                  stroke="#0284C7"
                  strokeWidth="2.2"
                  className="fill-white dark:fill-slate-900"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="21" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
                <line x1="-14" y1="0" x2="-21" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="14" y1="0" x2="21" y2="0" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="-14" x2="0" y2="-21" stroke="#0284C7" strokeWidth="1.2" />
                <line x1="0" y1="14" x2="0" y2="21" stroke="#0284C7" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="6.5" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-sky-950" />
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

          {/* 4. HUY HIỆU VẬN HÀNH DƯỚI ĐÁY (CLEAN MECHANICAL BASE BADGE) */}
          <g id="bottom-gear-badge" transform="translate(200, 275)">
            <ellipse cx="0" cy="0" rx="36" ry="12" stroke="#F15A24" strokeWidth="1.2" strokeDasharray="4 2" fill="none" opacity="0.6" />
            <line x1="-36" y1="0" x2="-48" y2="0" stroke="#F15A24" strokeWidth="1.2" />
            <line x1="36" y1="0" x2="48" y2="0" stroke="#F15A24" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
};
