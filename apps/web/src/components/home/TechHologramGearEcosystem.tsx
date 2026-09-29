import React from 'react';

/**
 * ⚙️ LUXURY KINETIC CHRONOGRAPH & TITANIUM GEAR EMBLEM (APPLE & LINEAR MINIMALIST LUXURY - RIGHT SIDE)
 * 
 * Phong cách Cơ khí xa xỉ & Kim loại chất lỏng (Haute Horlogerie & Liquid Metal Titanium Precision):
 * - Bánh răng đỉnh: Vàng Hổ Phách & Vàng Hồng Titan phay xước (Rose Gold & Amber Titanium).
 * - Hai bánh răng dưới: Bạch Kim & Titan Khói Xanh Coban (Liquid Platinum & Smoked Cobalt Titanium).
 * - Trục xoay đính chân kính hồng ngọc và lõi titan nung sắc nét.
 * - Hệ vòng đai Kim loại chất lỏng (Liquid Metal Orbital Ring) uốn lượn mềm mại đối xứng với bên trái.
 * - Chuyển động xoay cơ học mượt mà 60fps chuẩn nghệ thuật cơ khí Thụy Sĩ.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng 8 răng chuẩn kỹ thuật (Pitch R = 36, Outer R = 44, Inner R = 28, Hole R = 14)
  const gearPath = 
    "M 28.00 0.00 A 28 28 0 0 1 26.35 9.48 L 39.52 19.34 A 44 44 0 0 1 34.34 27.52 L 19.80 19.80 " +
    "A 28 28 0 0 1 11.92 25.33 L 14.24 41.62 A 44 44 0 0 1 4.83 43.73 L 0.00 28.00 " +
    "A 28 28 0 0 1 -9.48 26.35 L -19.34 39.52 A 44 44 0 0 1 -27.52 34.34 L -19.80 19.80 " +
    "A 28 28 0 0 1 -25.33 11.92 L -41.62 14.24 A 44 44 0 0 1 -43.73 4.83 L -28.00 0.00 " +
    "A 28 28 0 0 1 -26.35 -9.48 L -39.52 -19.34 A 44 44 0 0 1 -34.34 -27.52 L -19.80 -19.80 " +
    "A 28 28 0 0 1 -11.92 -25.33 L -14.24 -41.62 A 44 44 0 0 1 -4.83 -43.73 L -0.00 -28.00 " +
    "A 28 28 0 0 1 9.48 -26.35 L 19.34 -39.52 A 44 44 0 0 1 27.52 -34.34 L 19.80 -19.80 " +
    "A 28 28 0 0 1 25.33 -11.92 L 41.62 -14.24 A 44 44 0 0 1 43.73 -4.83 L 28.00 -0.00 Z " +
    "M 14 0 A 14 14 0 1 0 -14 0 A 14 14 0 1 0 14 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 420 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 METALLIC LUXURY GRADIENTS (VÀNG HỒNG, HỔ PHÁCH, BẠCH KIM & TITAN) */}
          
          {/* Gradient Bánh Răng Vàng Hồng Titan (Rose Gold & Amber Titanium) */}
          <linearGradient id="rose-gold-titanium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="25%" stopColor="#FED7AA" />
            <stop offset="45%" stopColor="#FB923C" />
            <stop offset="65%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* Gradient Mặt phẳng Tối Vàng Đồng (Smoked Copper Bronze) */}
          <linearGradient id="smoked-bronze" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#431407" />
            <stop offset="40%" stopColor="#7C2D12" />
            <stop offset="70%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Gradient Bánh Răng Bạch Kim & Xanh Coban (Platinum Chrome Gear) */}
          <linearGradient id="platinum-chrome-gear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Gradient Mặt phẳng Tối Titan Khói (Smoked Titanium Gear) */}
          <linearGradient id="smoked-titanium-gear" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="40%" stopColor="#1E293B" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Gradient Vòng đai Kim loại chất lỏng Vàng Hồng */}
          <linearGradient id="liquid-rose-ribbon" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="25%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>

          {/* Gradient Vệt sáng cạnh kim cương vàng (Amber Bevel Gleam) */}
          <linearGradient id="amber-edge-gleam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradient Chân kính Ruby (Haute Horlogerie Ruby Jewel) */}
          <radialGradient id="ruby-jewel" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="35%" stopColor="#E11D48" />
            <stop offset="70%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
        </defs>

        <style>{`
          @keyframes liquid-gear-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-0.4deg); }
          }
          .anim-sculpture-right { animation: liquid-gear-float 6s ease-in-out infinite 0.5s; }
        `}</style>

        {/* ========================================================================= */}
        {/* TÁC PHẨM ĐIÊU KHẮC ĐỘNG HỌC CƠ KHÍ XA XỈ (KINETIC CHRONOGRAPH SCULPTURE)  */}
        {/* ========================================================================= */}
        <g className="anim-sculpture-right">
          
          {/* 1. VÒNG ĐỊNH VỊ KHÔNG GIAN BẠCH KIM THANH MẢNH (PLATINUM HORIZON RING) */}
          <g id="gear-horizon-rings" transform="translate(210, 175)">
            <ellipse
              cx="0"
              cy="0"
              rx="135"
              ry="45"
              stroke="url(#rose-gold-titanium)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
              className="opacity-40 dark:opacity-30"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="115"
              ry="38"
              stroke="url(#liquid-rose-ribbon)"
              strokeWidth="0.8"
              className="opacity-30 dark:opacity-20"
            />
            {/* Các hạt vi tinh thể kim loại trên quỹ đạo */}
            <circle cx="-135" cy="0" r="2" fill="#0284C7" />
            <circle cx="135" cy="0" r="2" fill="#F97316" />
            <circle cx="0" cy="-45" r="1.5" fill="#FED7AA" />
            <circle cx="0" cy="45" r="1.5" fill="#94A3B8" />
          </g>

          {/* 2. HỆ VÒNG ĐAI KIM LOẠI CHẤT LỎNG CON QUAY 3D (LIQUID GYROSCOPIC RINGS) */}
          <g id="gear-gyroscopic-rings" transform="translate(210, 175)">
            
            {/* VÒNG ĐAI 1: UỐN LƯỢN NGHIÊNG TRỤC TRÁI (Liquid Ribbon 1) */}
            <g transform="rotate(-30)">
              <ellipse
                cx="0"
                cy="0"
                rx="98"
                ry="36"
                stroke="url(#rose-gold-titanium)"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                className="opacity-85 dark:opacity-75"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="96"
                ry="34.5"
                stroke="url(#amber-edge-gleam)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="60 30 40 30"
              />
            </g>

            {/* VÒNG ĐAI 2: UỐN LƯỢN GIAO THOA TRỤC PHẢI (Liquid Ribbon 2) */}
            <g transform="rotate(40)">
              <ellipse
                cx="0"
                cy="0"
                rx="98"
                ry="36"
                stroke="url(#liquid-rose-ribbon)"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                className="opacity-90 dark:opacity-80"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="96"
                ry="34.5"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                strokeDasharray="50 40 30 40"
                fill="none"
                opacity="0.85"
              />
            </g>
          </g>

          {/* 3. BỘ MÁY BÁNH RĂNG CƠ HỌC XA XỈ ĐỈNH CAO (HAUTE HORLOGERIE 3-GEAR CHRONOGRAPH) */}
          <g id="chronograph-movement">
            
            {/* ------------------------------------------------------------- */}
            {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG HỒNG & HỔ PHÁCH TITAN           */}
            {/* Tâm: (210, 120) - Xoay thuận chiều kim đồng hồ (+360°) trong 12s*/}
            {/* ------------------------------------------------------------- */}
            <g transform="translate(210, 120)">
              <g>
                {/* Thân bánh răng mạ Vàng Hồng kim loại */}
                <path
                  d={gearPath}
                  fill="url(#rose-gold-titanium)"
                  stroke="#EA580C"
                  strokeWidth="1.2"
                  className="filter drop-shadow-[0_2px_8px_rgba(234,88,12,0.25)]"
                  fillRule="evenodd"
                />
                {/* Vành gờ vát kim cương phản quang ánh sáng */}
                <circle cx="0" cy="0" r="22" stroke="url(#amber-edge-gleam)" strokeWidth="1.2" fill="none" />
                <circle cx="0" cy="0" r="21" stroke="#9A3412" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.65" />
                
                {/* 4 Nan hoa rãnh phay CNC dạng cánh turbine */}
                <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFF7ED" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="14" y1="0" x2="22" y2="0" stroke="#FFF7ED" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFF7ED" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="14" x2="0" y2="22" stroke="#FFF7ED" strokeWidth="1.6" strokeLinecap="round" />
                
                {/* Trục xoay đính Chân Kính Ruby đỏ xa xỉ (Haute Horlogerie Ruby Jewel) */}
                <circle cx="0" cy="0" r="7.5" fill="#431407" stroke="#EA580C" strokeWidth="1" />
                <circle cx="0" cy="0" r="5.5" fill="url(#ruby-jewel)" stroke="#FFFFFF" strokeWidth="0.8" />
                <circle cx="-1.8" cy="-1.8" r="1.5" fill="#FFFFFF" opacity="0.9" />

                {/* Chuyển động xoay mượt mà 60fps thuận chiều kim đồng hồ */}
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

            {/* ------------------------------------------------------------- */}
            {/* BÁNH RĂNG 2: DƯỚI TRÁI - BẠCH KIM & TITAN COBALT              */}
            {/* Tâm: (156.5, 170.8) - Ăn khớp chuẩn Bánh 1 - Xoay ngược 12s   */}
            {/* ------------------------------------------------------------- */}
            <g transform="translate(156.5, 170.8)">
              <g>
                <path
                  d={gearPath}
                  fill="url(#platinum-chrome-gear)"
                  stroke="#0284C7"
                  strokeWidth="1.2"
                  className="filter drop-shadow-[0_2px_8px_rgba(2,132,199,0.2)]"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.9" />
                <circle cx="0" cy="0" r="21" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.65" />
                
                <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />

                {/* Trục xoay nung titan xanh coban */}
                <circle cx="0" cy="0" r="7.5" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />
                <circle cx="0" cy="0" r="5.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="0.8" />
                <circle cx="-1.8" cy="-1.8" r="1.5" fill="#FFFFFF" opacity="0.9" />

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

            {/* ------------------------------------------------------------- */}
            {/* BÁNH RĂNG 3: DƯỚI PHẢI - BẠCH KIM & TITAN COBALT             */}
            {/* Tâm: (263.5, 170.8) - Ăn khớp chuẩn Bánh 1 - Xoay ngược 12s   */}
            {/* ------------------------------------------------------------- */}
            <g transform="translate(263.5, 170.8)">
              <g>
                <path
                  d={gearPath}
                  fill="url(#platinum-chrome-gear)"
                  stroke="#0284C7"
                  strokeWidth="1.2"
                  className="filter drop-shadow-[0_2px_8px_rgba(2,132,199,0.2)]"
                  fillRule="evenodd"
                />
                <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.9" />
                <circle cx="0" cy="0" r="21" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.65" />
                
                <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />

                <circle cx="0" cy="0" r="7.5" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />
                <circle cx="0" cy="0" r="5.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="0.8" />
                <circle cx="-1.8" cy="-1.8" r="1.5" fill="#FFFFFF" opacity="0.9" />

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

          {/* 4. CHÂN ĐẾ TREO TỪ TRƯỜNG TINH TẾ (MAGNETIC LEVITATION PEDESTAL) */}
          <g id="gear-mag-base" transform="translate(210, 275)">
            <ellipse cx="0" cy="0" rx="60" ry="18" stroke="url(#rose-gold-titanium)" strokeWidth="1.6" className="fill-white/80 dark:fill-slate-900/80" />
            <ellipse cx="0" cy="0" rx="42" ry="12" stroke="url(#liquid-rose-ribbon)" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.7" />
            <ellipse cx="0" cy="0" rx="20" ry="6" stroke="#FFFFFF" strokeWidth="1.2" className="fill-orange-50 dark:fill-slate-950" />
            <line x1="0" y1="0" x2="0" y2="-35" stroke="url(#amber-edge-gleam)" strokeWidth="1.6" strokeDasharray="3 2" />
          </g>
        </g>
      </svg>
    </div>
  );
};
