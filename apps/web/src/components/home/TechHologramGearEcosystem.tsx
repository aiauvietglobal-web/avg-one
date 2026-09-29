import React from 'react';

/**
 * ⚙️ TECH 3D MONOLITHIC GEAR ENGINE (AVG ONE INTEGRATED ISOMETRIC ARCHITECTURE - RIGHT SIDE)
 * 
 * Bố cục khối hộp cơ khí 3D nguyên khối có chiều sâu thực thụ (True 3D Monolithic Depth):
 * - Toàn bộ cấu trúc tích hợp thành một Cỗ Máy Cơ Khí Công Nghệ 3D gắn kết (Cohesive Tech Engine).
 * - Cụm 3 bánh răng cơ học (Cam & Xanh dương) cắm trực tiếp vào các ổ trục của Bệ máy 3D vững chãi.
 * - Hai khối module cánh (Side Control Blocks) mở rộng không gian 3 chiều đối xứng hoàn hảo với bên trái.
 * - Trọng tâm Y chuẩn xác (70 -> 298), căn giữa hoàn hảo với Slogan AVG One, không bao giờ bị cắt mép.
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
        {/* 1. KHỐI BỆ MÁY CƠ KHÍ 3D (INTEGRATED ISOMETRIC ENGINE SLAB)                 */}
        {/* ========================================================================= */}
        <g id="engine-monolith">
          {/* Mặt trái bệ máy */}
          <polygon
            points="170,215 260,258 260,298 170,255"
            stroke="#0284C7"
            strokeWidth="2"
            className="fill-sky-100/90 dark:fill-slate-950/95"
          />
          {/* Mặt phải bệ máy */}
          <polygon
            points="260,258 350,215 350,255 260,298"
            stroke="#F15A24"
            strokeWidth="2"
            className="fill-orange-100/80 dark:fill-slate-800/90"
          />
          {/* Mặt trên bệ máy (Top Face) */}
          <polygon
            points="260,172 350,215 260,258 170,215"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-white/95 dark:fill-slate-900/95"
          />

          {/* Đường gân cấu trúc âm bản trên mặt bệ (Recessed Isometric Inset) */}
          <polygon
            points="260,186 332,215 260,244 188,215"
            stroke="#F15A24"
            strokeWidth="1.2"
            strokeDasharray="5 3"
            fill="none"
            className="opacity-75"
          />

          {/* Ổ trục đỡ trung tâm (Center Shaft Bushing) */}
          <ellipse cx="260" cy="215" rx="14" ry="6" stroke="#F15A24" strokeWidth="1.5" className="fill-orange-50 dark:fill-slate-950" />
          <circle cx="260" cy="215" r="2.5" className="fill-[#F15A24]" />

          {/* 2 Ổ trục đỡ hai bánh răng dưới (Left & Right Gear Mounting Hubs) */}
          <ellipse cx="203.5" cy="198" rx="10" ry="4.5" stroke="#0284C7" strokeWidth="1.3" className="fill-sky-50 dark:fill-slate-950" />
          <ellipse cx="316.5" cy="198" rx="10" ry="4.5" stroke="#0284C7" strokeWidth="1.3" className="fill-sky-50 dark:fill-slate-950" />
        </g>

        {/* ========================================================================= */}
        {/* 2. HAI KHỐI MODULE CÁNH 3D (INTEGRATED SIDE MODULE BLOCKS)                */}
        {/* ========================================================================= */}
        
        {/* KHỐI CÁNH TRÁI: BẢO MẬT TÀI CHÍNH (LOCK $) */}
        <g id="left-wing-lock" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
          <polygon points="170,230 140,245 140,255 170,240" stroke="#0284C7" strokeWidth="1.2" className="fill-sky-100/60 dark:fill-slate-900/60" />
          
          <g transform="translate(130, 225)">
            <polygon points="0,-18 22,-7 0,4 -22,-7" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <polygon points="-22,-7 0,4 0,26 -22,15" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/90 dark:fill-slate-950" />
            <polygon points="0,4 22,-7 22,15 0,26" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-200/80 dark:fill-slate-800" />
            {/* Icon Lock $ */}
            <g transform="translate(0, -7) scale(0.9)">
              <path d="M -3 -2 L -3 -6 A 3.5 3.5 0 0 1 3 -6 L 3 -2" stroke="#0284C7" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <rect x="-5" y="-2" width="10" height="8" rx="1.5" stroke="#0284C7" strokeWidth="1.3" className="fill-white dark:fill-slate-900" />
              <text x="0" y="4.2" fill="#F15A24" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
            </g>
          </g>
        </g>

        {/* KHỐI CÁNH PHẢI: ĐỘI NGŨ NHÂN SỰ & KHÁCH HÀNG (TEAM USERS) */}
        <g id="right-wing-users" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
          <polygon points="350,230 380,245 380,255 350,240" stroke="#F15A24" strokeWidth="1.2" className="fill-orange-100/60 dark:fill-slate-900/60" />
          
          <g transform="translate(390, 225)">
            <polygon points="0,-18 22,-7 0,4 -22,-7" stroke="#F15A24" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <polygon points="-22,-7 0,4 0,26 -22,15" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-100/90 dark:fill-slate-950" />
            <polygon points="0,4 22,-7 22,15 0,26" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-200/80 dark:fill-slate-800" />
            {/* Icon 3 Users */}
            <g transform="translate(0, -7) scale(0.9)">
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
        {/* 3. TRỤ TRUYỀN ĐỘNG CƠ KHÍ NỐI THẲNG LÊN BÁNH RĂNG (DRIVE SHAFTS)           */}
        {/* ========================================================================= */}
        <g id="engine-drive-shafts" stroke="#0284C7" strokeWidth="1.6" className="opacity-80">
          {/* Trục trái nối thẳng từ ổ trục bệ lên tâm bánh răng trái */}
          <line x1="203.5" y1="198" x2="203.5" y2="150.8" />
          {/* Trục phải nối thẳng từ ổ trục bệ lên tâm bánh răng phải */}
          <line x1="316.5" y1="198" x2="316.5" y2="150.8" stroke="#F15A24" />
          {/* Trụ truyền động chính giữa lên bánh răng cam đỉnh */}
          <line x1="260" y1="215" x2="260" y2="100" stroke="#F15A24" strokeWidth="1.8" strokeDasharray="5 3" />
        </g>

        {/* ========================================================================= */}
        {/* 4. CỤM 3 BÁNH RĂNG CƠ HỌC ĐỈNH CAO (INTEGRATED PRECISION 3-GEAR DRIVE)    */}
        {/* ========================================================================= */}
        <g id="top-precision-gears">
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR) - MÀU CAM THƯƠNG HIỆU */}
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

          {/* BÁNH RĂNG 2: DƯỚI BÊN TRÁI (BOTTOM-LEFT GEAR) - MÀU XANH DƯƠNG */}
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

          {/* BÁNH RĂNG 3: DƯỚI BÊN PHẢI (BOTTOM-RIGHT GEAR) - MÀU XANH DƯƠNG */}
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
