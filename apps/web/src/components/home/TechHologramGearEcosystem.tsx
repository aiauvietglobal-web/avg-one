import React from 'react';

/**
 * ⚙️ TECH 3D ARCHITECTURAL GEAR COMPOSITION (AVG ONE 3D DEPTH ISOMETRIC - RIGHT SIDE)
 * 
 * Bố cục phân tầng không gian 3D có chiều sâu cơ khí (Layered 3D Depth Mechanical Composition):
 * - Tầng 1 (Đế máy cơ khí - Mechanical Engine Base Slab): Bệ khối 3D dày dặn, vững chãi đồng bộ với bên trái.
 * - Tầng 2 (Các khối Module truyền động - Transmission Service Blocks): 3 khối hộp chức năng (Lock, Megaphone, Users) gối lên bệ.
 * - Tầng 3 (Hệ 3 Bánh Răng Cơ Học Ăn Khớp - Precision 3-Gear Drive): Cụm bánh răng Cam & Xanh dương gắn trên các trục truyền động đứng.
 * - Chiều sâu phối cảnh 3D sắc nét nhờ phân cấp sáng/tối 3 mặt phẳng và nét line phân lớp (Không dùng shadow mờ).
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
        {/* TẦNG 1: BỆ ĐẾ MÁY KHỐI HỘP 3D DÀY DẶN (THICK MECHANICAL BASE SLAB)          */}
        {/* ========================================================================= */}
        <g id="gear-foundation-slab">
          {/* Mặt đáy trước-trái của bệ máy */}
          <polygon
            points="140,265 260,325 260,350 140,290"
            stroke="#0284C7"
            strokeWidth="1.8"
            className="fill-sky-100/90 dark:fill-slate-900/95"
          />
          {/* Mặt đáy trước-phải của bệ máy */}
          <polygon
            points="260,325 380,265 380,290 260,350"
            stroke="#F15A24"
            strokeWidth="1.8"
            className="fill-orange-100/80 dark:fill-slate-800/90"
          />
          {/* Mặt trên bệ máy (Top Face of Mechanical Slab) */}
          <polygon
            points="260,205 380,265 260,325 140,265"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-white/95 dark:fill-slate-950/95"
          />

          {/* Đường gân cấu trúc bên trong mặt bệ (Structural Grid Inset) */}
          <polygon
            points="260,218 362,265 260,312 158,265"
            stroke="#F15A24"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-70"
          />

          {/* Khe rãnh lắp ghép trục máy trung tâm (Center Gear Drive Basin) */}
          <polygon
            points="260,240 310,265 260,290 210,265"
            stroke="#F15A24"
            strokeWidth="1.4"
            className="fill-orange-50/80 dark:fill-slate-900"
          />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC KHỐI MODULE TRUYỀN ĐỘNG GẮN VÀO BỆ (TRANSMISSION SERVICE BLOCKS)*/}
        {/* ========================================================================= */}
        <g id="gear-modular-blocks">
          
          {/* ------------------------------------------------------------- */}
          {/* MODULE 1 (TRÁI): BẢO MẬT & KIỂM SOÁT TÀI CHÍNH (LOCK $)       */}
          {/* ------------------------------------------------------------- */}
          <g id="block-lock" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
            <g transform="translate(180, 240)">
              {/* Mặt trên */}
              <polygon points="0,-22 26,-9 0,4 -26,-9" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Mặt trái */}
              <polygon points="-26,-9 0,4 0,30 -26,17" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/90 dark:fill-slate-950" />
              {/* Mặt phải */}
              <polygon points="0,4 26,-9 26,17 0,30" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-200/80 dark:fill-slate-800" />
              {/* Icon Lock $ dạng Line */}
              <g transform="translate(0, -9) scale(0.95)">
                <path d="M -3 -2 L -3 -6 A 3.5 3.5 0 0 1 3 -6 L 3 -2" stroke="#0284C7" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <rect x="-5" y="-2" width="10" height="8" rx="1.5" stroke="#0284C7" strokeWidth="1.3" className="fill-white dark:fill-slate-900" />
                <text x="0" y="4.2" fill="#F15A24" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
              </g>
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* MODULE 2 (PHẢI): ĐỘI NGŨ NHÂN SỰ & KHÁCH HÀNG (TEAM USERS)    */}
          {/* ------------------------------------------------------------- */}
          <g id="block-users" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
            <g transform="translate(340, 240)">
              {/* Mặt trên */}
              <polygon points="0,-22 26,-9 0,4 -26,-9" stroke="#F15A24" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Mặt trái */}
              <polygon points="-26,-9 0,4 0,30 -26,17" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-100/90 dark:fill-slate-950" />
              {/* Mặt phải */}
              <polygon points="0,4 26,-9 26,17 0,30" stroke="#F15A24" strokeWidth="1.6" className="fill-orange-200/80 dark:fill-slate-800" />
              {/* Icon 3 Users Line */}
              <g transform="translate(0, -9) scale(0.95)">
                <circle cx="-5" cy="-3" r="2" stroke="#F15A24" strokeWidth="1" fill="none" />
                <path d="M -8 4 C -8 1.5 -6 0.5 -5 0.5 C -4 0.5 -2 1.5 -2 4" stroke="#F15A24" strokeWidth="1" fill="none" />
                <circle cx="5" cy="-3" r="2" stroke="#F15A24" strokeWidth="1" fill="none" />
                <path d="M 2 4 C 2 1.5 4 0.5 5 0.5 C 6 0.5 8 1.5 8 4" stroke="#F15A24" strokeWidth="1" fill="none" />
                <circle cx="0" cy="-4" r="2.8" stroke="#0284C7" strokeWidth="1.2" className="fill-white dark:fill-slate-900" />
                <path d="M -4.5 5 C -4.5 1.8 -2.5 0.2 0 0.2 C 2.5 0.2 4.5 1.8 4.5 5" stroke="#0284C7" strokeWidth="1.3" fill="none" />
              </g>
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* MODULE 3 (TRƯỚC): TRUYỀN THÔNG & KẾT NỐI (MEGAPHONE)         */}
          {/* ------------------------------------------------------------- */}
          <g id="block-megaphone" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
            <g transform="translate(260, 280)">
              <polygon points="0,-18 22,-7 0,4 -22,-7" stroke="#F15A24" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
              <polygon points="-22,-7 0,4 0,24 -22,13" stroke="#F15A24" strokeWidth="1.5" className="fill-orange-100/90 dark:fill-slate-950" />
              <polygon points="0,4 22,-7 22,13 0,24" stroke="#F15A24" strokeWidth="1.5" className="fill-orange-200/80 dark:fill-slate-800" />
              {/* Icon Megaphone Line */}
              <g transform="translate(0, -7) scale(0.9)">
                <path d="M 4 -4 L -2 -2 L -5 -2 L -5 2 L -2 2 L 4 5 Z" stroke="#F15A24" strokeWidth="1.2" className="fill-white dark:fill-slate-900" />
                <path d="M 6 -2 A 3 3 0 0 1 6 3" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </g>
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TRỤ TRUYỀN ĐỘNG CƠ KHÍ ĐỨNG (MECHANICAL DRIVE TRANSMISSION SHAFTS)        */}
        {/* ========================================================================= */}
        <g id="gear-drive-shafts" stroke="#0284C7" strokeWidth="1.5" className="opacity-75 dark:opacity-60">
          {/* Trục cắm thẳng từ bệ máy lên tâm bánh răng trái */}
          <line x1="203.5" y1="230" x2="203.5" y2="175" strokeDasharray="4 3" />
          {/* Trục cắm thẳng từ bệ máy lên tâm bánh răng phải */}
          <line x1="316.5" y1="230" x2="316.5" y2="175" stroke="#F15A24" strokeDasharray="4 3" />
          {/* Trục tâm nâng đỡ bánh răng cam đỉnh */}
          <line x1="260" y1="240" x2="260" y2="140" stroke="#F15A24" strokeWidth="1.6" strokeDasharray="6 3" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: CỤM 3 BÁNH RĂNG CƠ HỌC ĂN KHỚP (PRECISION 3-GEAR DRIVE CLUSTER)    */}
        {/* ========================================================================= */}
        <g id="layer-3-gear-cluster">
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

        {/* 2 Khối hộp vệ tinh nhỏ cân bằng không gian ở tầng cao (Upper Satellite Pods) */}
        <g id="upper-satellites-gear" transform="translate(0, -5)">
          {/* Vệ tinh trên-trái: Mini Gears */}
          <g transform="translate(140, 100) scale(0.75)" className="opacity-85">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#0284C7" strokeWidth="1.4" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-100 dark:fill-slate-800" />
            <line x1="20" y1="2" x2="65" y2="20" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" />
          </g>

          {/* Vệ tinh trên-phải: Rocket Engine / Velocity */}
          <g transform="translate(380, 100) scale(0.75)" className="opacity-85">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#F15A24" strokeWidth="1.4" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#F15A24" strokeWidth="1.4" className="fill-orange-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#F15A24" strokeWidth="1.4" className="fill-orange-100 dark:fill-slate-800" />
            <line x1="-20" y1="2" x2="-65" y2="20" stroke="#F15A24" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" />
          </g>
        </g>
      </svg>
    </div>
  );
};
