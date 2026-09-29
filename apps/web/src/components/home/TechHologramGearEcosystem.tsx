import React from 'react';

/**
 * ⚙️ TECH LINE GEAR CUBES (AVG ONE ISOMETRIC GEOMETRIC LINE ART - RIGHT SIDE)
 * 
 * Phương án hình hộp, hình khối 3D dạng line kết hợp Bánh răng (Clean Isometric Line Cubes):
 * - Bỏ toàn bộ các vòng elip và line thừa gây rối mắt.
 * - Cụm 3 Bánh răng cơ học (Cam & Xanh dương) xoay mượt mà 60fps ăn khớp chuẩn xác.
 * - Bệ đế khối hộp không gian 3D (Isometric Tech Podium) nâng đỡ vững chắc đồng bộ với bên trái.
 * - 4 Khối hộp vệ tinh (Satellite Tech Cubes) dạng line sắc nét mang các biểu tượng vận hành cốt lõi.
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
        {/* ========================================================================= */}
        {/* 1. BỆ ĐẾ HÌNH HỘP 3D ISOMETRIC (CLEAN ISOMETRIC PODIUM SLAB - KHÔNG RỐI)    */}
        {/* ========================================================================= */}
        <g id="isometric-gear-slab">
          {/* Mặt đáy bên trái khối bệ */}
          <polygon
            points="140,290 260,340 260,355 140,305"
            stroke="#0284C7"
            strokeWidth="1.8"
            className="fill-sky-100/80 dark:fill-slate-950/80"
          />
          {/* Mặt đáy bên phải khối bệ */}
          <polygon
            points="260,340 380,290 380,305 260,355"
            stroke="#F15A24"
            strokeWidth="1.8"
            className="fill-orange-100/60 dark:fill-slate-900/60"
          />
          {/* Mặt trên bệ đài hình hộp (Top Face of Isometric Slab) */}
          <polygon
            points="260,240 380,290 260,340 140,290"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-white/95 dark:fill-slate-900/95"
          />

          {/* Đường viền khung trang trí dạng line bên trong mặt bệ (Inner Inset Frame) */}
          <polygon
            points="260,252 360,290 260,328 160,290"
            stroke="#F15A24"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-75"
          />

          {/* Đường line thẳng dứt khoát dẫn từ bệ lên cụm bánh răng */}
          <line x1="260" y1="285" x2="260" y2="210" stroke="#F15A24" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />
        </g>

        {/* ========================================================================= */}
        {/* 2. CÁC ĐƯỜNG LINE KẾT NỐI TỐI GIẢN TỚI 4 KHỐI HỘP VỆ TINH                 */}
        {/* ========================================================================= */}
        <g id="cube-connectors" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" className="opacity-75 dark:opacity-60">
          {/* Nối Box 1 (Top-Left) */}
          <polyline points="145,135 180,150 205,160" strokeDasharray="4 3" />
          {/* Nối Box 2 (Bottom-Left) */}
          <polyline points="120,245 155,270 175,278" />
          {/* Nối Box 3 (Top-Right) */}
          <polyline points="375,135 340,150 315,160" stroke="#F15A24" strokeDasharray="4 3" />
          {/* Nối Box 4 (Bottom-Right) */}
          <polyline points="400,245 365,270 345,278" stroke="#F15A24" />
        </g>

        {/* ========================================================================= */}
        {/* 3. BỐN KHỐI HỘP VỆ TINH 3D DẠNG LINE (4 SATELLITE ISOMETRIC CUBES)        */}
        {/* ========================================================================= */}

        {/* ------------------------------------------------------------- */}
        {/* BOX 1: TOP-LEFT - MINI GEARS (Khối hộp 3D dạng Line)          */}
        {/* ------------------------------------------------------------- */}
        <g id="box-gears" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(125, 115)">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-100 dark:fill-slate-800" />
            {/* Icon 3 Bánh răng mini dạng Line */}
            <g transform="translate(0, -8) scale(0.85)">
              <circle cx="-3" cy="-3" r="4.5" stroke="#0284C7" strokeWidth="1.1" strokeDasharray="2.5 1.5" className="fill-white dark:fill-slate-900" />
              <circle cx="-3" cy="-3" r="1.5" className="fill-[#0284C7]" />
              <circle cx="4" cy="3" r="4" stroke="#F15A24" strokeWidth="1.1" strokeDasharray="2.5 1.5" className="fill-white dark:fill-slate-900" />
              <circle cx="4" cy="3" r="1.5" className="fill-[#F15A24]" />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* BOX 2: BOTTOM-LEFT - SECURITY LOCK (Khối hộp 3D dạng Line)    */}
        {/* ------------------------------------------------------------- */}
        <g id="box-lock" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(95, 230)">
            <polygon points="0,-22 24,-10 0,2 -24,-10" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <polygon points="-24,-10 0,2 0,26 -24,14" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 24,-10 24,14 0,26" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100 dark:fill-slate-800" />
            {/* Icon Lock $ dạng Line */}
            <g transform="translate(0, -10) scale(0.9)">
              <path d="M -3 -2 L -3 -6 A 3.5 3.5 0 0 1 3 -6 L 3 -2" stroke="#0284C7" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <rect x="-5" y="-2" width="10" height="8" rx="1.5" stroke="#0284C7" strokeWidth="1.3" className="fill-white dark:fill-slate-900" />
              <text x="0" y="4" fill="#F15A24" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* BOX 3: TOP-RIGHT - MEGAPHONE (Khối hộp 3D dạng Line)          */}
        {/* ------------------------------------------------------------- */}
        <g id="box-megaphone" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(395, 115)">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#F15A24" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#F15A24" strokeWidth="1.5" className="fill-orange-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#F15A24" strokeWidth="1.5" className="fill-orange-100 dark:fill-slate-800" />
            {/* Icon Megaphone dạng Line */}
            <g transform="translate(0, -8) scale(0.85)">
              <path d="M 4 -4 L -2 -2 L -5 -2 L -5 2 L -2 2 L 4 5 Z" stroke="#F15A24" strokeWidth="1.2" className="fill-white dark:fill-slate-900" />
              <path d="M 6 -2 A 3 3 0 0 1 6 3" stroke="#F15A24" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* BOX 4: BOTTOM-RIGHT - TEAM USERS (Khối hộp 3D dạng Line)      */}
        {/* ------------------------------------------------------------- */}
        <g id="box-users" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(425, 230)">
            <polygon points="0,-22 24,-10 0,2 -24,-10" stroke="#F15A24" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <polygon points="-24,-10 0,2 0,26 -24,14" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-50 dark:fill-slate-950" />
            <polygon points="0,2 24,-10 24,14 0,26" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-100 dark:fill-slate-800" />
            {/* Icon 3 Users dạng Line */}
            <g transform="translate(0, -10) scale(0.9)">
              <circle cx="-5" cy="-3" r="2" stroke="#F15A24" strokeWidth="1" fill="none" />
              <path d="M -8 4 C -8 1.5 -6 0.5 -5 0.5 C -4 0.5 -2 1.5 -2 4" stroke="#F15A24" strokeWidth="1" fill="none" />
              <circle cx="5" cy="-3" r="2" stroke="#F15A24" strokeWidth="1" fill="none" />
              <path d="M 2 4 C 2 1.5 4 0.5 5 0.5 C 6 0.5 8 1.5 8 4" stroke="#F15A24" strokeWidth="1" fill="none" />
              <circle cx="0" cy="-4" r="2.8" stroke="#0284C7" strokeWidth="1.2" className="fill-white dark:fill-slate-900" />
              <path d="M -4.5 5 C -4.5 1.8 -2.5 0.2 0 0.2 C 2.5 0.2 4.5 1.8 4.5 5" stroke="#0284C7" strokeWidth="1.3" fill="none" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 4. CỤM 3 BÁNH RĂNG LINE TRƠN ĂN KHỚP (PRECISION 3-GEAR CLUSTER)           */}
        {/* ========================================================================= */}
        <g id="line-floating-gears">
          
          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR) - MÀU CAM THƯƠNG HIỆU       */}
          {/* Tâm: (260, 92) - Quay thuận chiều kim đồng hồ (+360°) trong 12s*/}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(260, 92)">
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

          {/* ----------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI BÊN TRÁI (BOTTOM-LEFT GEAR) - MÀU XANH DƯƠNG     */}
          {/* Tâm: (203.5, 142.8) - Ăn khớp chuẩn Bánh 1 - Quay ngược chiều 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(203.5, 142.8)">
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

          {/* ----------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI BÊN PHẢI (BOTTOM-RIGHT GEAR) - MÀU XANH DƯƠNG    */}
          {/* Tâm: (316.5, 142.8) - Ăn khớp chuẩn Bánh 1 - Quay ngược chiều 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(316.5, 142.8)">
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
      </svg>
    </div>
  );
};
