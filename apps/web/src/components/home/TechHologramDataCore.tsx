import React from 'react';

/**
 * 🌐 MODERN KINETIC DATA MATRIX (AVG ONE 3D DIGITAL PLATFORM - LEFT SIDE)
 * 
 * Thiết kế phong cách đồ họa công nghệ hiện đại (Stripe & Linear Precision Style):
 * - Thoát ly hoàn toàn khỏi các khối hộp bệ thô cứng.
 * - Hệ thống khối thẻ 3D Isometric không gian đa tầng (Multi-Elevation Floating Tech Modules).
 * - Khối Tesseract Lượng Tử Trung Tâm (Quantum Core) với chuyển động bồng bềnh êm ái 60fps.
 * - Các đường liên kết vector thanh mảnh, tinh tế, hiện đại, tuyệt đối không rối mắt.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <style>{`
          @keyframes kinetic-float-core {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-9px); }
          }
          @keyframes kinetic-float-mod1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes kinetic-float-mod2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes kinetic-float-mod3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes kinetic-pulse-line {
            0%, 100% { stroke-dashoffset: 0; opacity: 0.45; }
            50% { stroke-dashoffset: -16; opacity: 0.85; }
          }
          .anim-core { animation: kinetic-float-core 4.5s ease-in-out infinite; }
          .anim-mod1 { animation: kinetic-float-mod1 3.8s ease-in-out infinite 0.2s; }
          .anim-mod2 { animation: kinetic-float-mod2 4.2s ease-in-out infinite 0.7s; }
          .anim-mod3 { animation: kinetic-float-mod3 3.6s ease-in-out infinite 0.4s; }
          .anim-pulse-line { animation: kinetic-pulse-line 3s linear infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* 1. HỆ THỐNG ĐƯỜNG LIÊN KẾT KHÔNG GIAN ISOMETRIC (ARCHITECTURAL GRID LINES) */}
        {/* ========================================================================= */}
        <g id="grid-connectors" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" className="opacity-55 dark:opacity-40">
          {/* Trục liên kết từ Module 1 lên Core */}
          <line x1="165" y1="210" x2="215" y2="175" strokeDasharray="4 4" className="anim-pulse-line" />
          {/* Trục liên kết từ Module 2 lên Core */}
          <line x1="355" y1="210" x2="305" y2="175" strokeDasharray="4 4" className="anim-pulse-line" />
          {/* Trục liên kết từ Module 3 đáy lên Core */}
          <line x1="260" y1="275" x2="260" y2="215" strokeDasharray="3 3" />
          {/* Vòng định vị không gian thanh mảnh */}
          <ellipse cx="260" cy="275" rx="140" ry="42" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 8" fill="none" opacity="0.35" />
        </g>

        {/* ========================================================================= */}
        {/* 2. CÁC KHỐI MODULE THẺ 3D ISOMETRIC LƠ LỬNG (FLOATING SMART TECH CARDS)    */}
        {/* ========================================================================= */}

        {/* MODULE 1: AN NINH & BẢO MẬT (CYBER SECURITY SHIELD) - BÊN TRÁI */}
        <g id="mod-shield" className="anim-mod1">
          <g transform="translate(145, 210)" className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110">
            {/* Khối thẻ 3D Isometric hiện đại vát mỏng thanh lịch */}
            {/* Mặt trên */}
            <polygon points="0,-16 26,-4 0,8 -26,-4" stroke="#0284C7" strokeWidth="1.6" className="fill-white/95 dark:fill-slate-900/95" />
            {/* Mặt trái */}
            <polygon points="-26,-4 0,8 0,18 -26,6" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-50/90 dark:fill-slate-950/90" />
            {/* Mặt phải */}
            <polygon points="0,8 26,-4 26,6 0,18" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/70 dark:fill-slate-800/70" />
            
            {/* Vòng viền trang trí nội khối */}
            <polygon points="0,-11 18,-2 0,6 -18,-2" stroke="#38BDF8" strokeWidth="0.9" fill="none" strokeDasharray="3 2" opacity="0.8" />
            
            {/* Icon Shield thanh thoát */}
            <g transform="translate(0, -4) scale(0.9)">
              <path
                d="M 0 -7 L 5.5 -4.5 L 5.5 0 C 5.5 4 3 7 0 8.5 C -3 7 -5.5 4 -5.5 0 L -5.5 -4.5 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-white dark:fill-slate-900"
              />
              <path d="M -1.8 0 L -0.5 1.5 L 2.5 -1.8" stroke="#38BDF8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>
        </g>

        {/* MODULE 2: ĐIỆN TOÁN ĐÁM MÂY (CLOUD COMPUTING) - BÊN PHẢI */}
        <g id="mod-cloud" className="anim-mod2">
          <g transform="translate(375, 210)" className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110">
            {/* Mặt trên */}
            <polygon points="0,-16 26,-4 0,8 -26,-4" stroke="#0284C7" strokeWidth="1.6" className="fill-white/95 dark:fill-slate-900/95" />
            {/* Mặt trái */}
            <polygon points="-26,-4 0,8 0,18 -26,6" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-50/90 dark:fill-slate-950/90" />
            {/* Mặt phải */}
            <polygon points="0,8 26,-4 26,6 0,18" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/70 dark:fill-slate-800/70" />
            
            <polygon points="0,-11 18,-2 0,6 -18,-2" stroke="#38BDF8" strokeWidth="0.9" fill="none" strokeDasharray="3 2" opacity="0.8" />

            {/* Icon Cloud */}
            <g transform="translate(0, -4) scale(0.9)">
              <path
                d="M -4.5 2.5 L 4.5 2.5 C 5.8 2.5 6.8 1.6 6.8 0.4 C 6.8 -0.8 5.8 -1.7 4.5 -1.7 C 4.3 -1.7 4.1 -1.7 3.9 -1.5 C 3.6 -3.2 1.8 -4.2 0 -4.2 C -1.6 -4.2 -2.9 -3.3 -3.4 -1.9 C -3.7 -2.1 -4.1 -2.1 -4.5 -2.1 C -6 -2.1 -7.2 -1 -7.2 0.5 C -7.2 1.8 -6 2.5 -4.5 2.5 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-white dark:fill-slate-900"
              />
            </g>
          </g>
        </g>

        {/* MODULE 3: LÕI PHÂN TÍCH & DỮ LIỆU SỐ (ANALYTICS & AI PROCESSOR) - PHÍA TRƯỚC */}
        <g id="mod-chip" className="anim-mod3">
          <g transform="translate(260, 275)" className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110">
            {/* Khối thẻ 3D Isometric nền tảng */}
            <polygon points="0,-18 30,-5 0,8 -30,-5" stroke="#0284C7" strokeWidth="1.8" className="fill-white/95 dark:fill-slate-900/95" />
            <polygon points="-30,-5 0,8 0,20 -30,7" stroke="#0284C7" strokeWidth="1.8" className="fill-sky-100/90 dark:fill-slate-950/90" />
            <polygon points="0,8 30,-5 30,7 0,20" stroke="#0284C7" strokeWidth="1.8" className="fill-sky-200/70 dark:fill-slate-800/70" />

            {/* Rãnh vi mạch công nghệ */}
            <polygon points="0,-12 20,-3 0,6 -20,-3" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.8" />
            
            {/* Icon Chip AI */}
            <g transform="translate(0, -5) scale(0.9)">
              <rect x="-4.5" y="-4.5" width="9" height="9" rx="1.5" stroke="#0284C7" strokeWidth="1.2" className="fill-sky-50 dark:fill-slate-900" />
              <rect x="-2" y="-2" width="4" height="4" rx="0.5" stroke="#38BDF8" strokeWidth="0.8" fill="none" />
              <line x1="-3" y1="-6" x2="-3" y2="-4.5" stroke="#0284C7" strokeWidth="0.9" />
              <line x1="0" y1="-6" x2="0" y2="-4.5" stroke="#0284C7" strokeWidth="0.9" />
              <line x1="3" y1="-6" x2="3" y2="-4.5" stroke="#0284C7" strokeWidth="0.9" />
              <line x1="-3" y1="4.5" x2="-3" y2="6" stroke="#0284C7" strokeWidth="0.9" />
              <line x1="0" y1="4.5" x2="0" y2="6" stroke="#0284C7" strokeWidth="0.9" />
              <line x1="3" y1="4.5" x2="3" y2="6" stroke="#0284C7" strokeWidth="0.9" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. KHỐI LẬP PHƯƠNG LƯỢNG TỬ ĐỈNH TRUNG TÂM (CENTRAL KINETIC QUANTUM TESSERACT) */}
        {/* ========================================================================= */}
        <g id="top-quantum-core" className="anim-core">
          {/* Tọa độ hoàn hảo: X=260, Y=125 - Cân đối tuyệt đối, không tràn mép */}
          <g transform="translate(260, 125)">
            
            {/* Vòng hào quang quỹ đạo số quay quanh tâm */}
            <ellipse cx="0" cy="0" rx="55" ry="22" stroke="#38BDF8" strokeWidth="1" strokeDasharray="8 6" fill="none" opacity="0.45" transform="rotate(-20)" />
            <ellipse cx="0" cy="0" rx="55" ry="22" stroke="#0284C7" strokeWidth="1" strokeDasharray="10 8" fill="none" opacity="0.45" transform="rotate(35)" />

            {/* KHỐI LẬP PHƯƠNG NGOÀI (Outer Precision Isometric Cube) */}
            {/* Mặt trên */}
            <polygon
              points="0,-44 42,-21 0,2 -42,-21"
              stroke="#0284C7"
              strokeWidth="2"
              className="fill-white/95 dark:fill-slate-900/95"
            />
            {/* Mặt trái */}
            <polygon
              points="-42,-21 0,2 0,44 -42,21"
              stroke="#0284C7"
              strokeWidth="2"
              className="fill-sky-50/90 dark:fill-slate-950/90"
            />
            {/* Mặt phải */}
            <polygon
              points="0,2 42,-21 42,21 0,44"
              stroke="#0284C7"
              strokeWidth="2"
              className="fill-sky-100/75 dark:fill-slate-800/75"
            />

            {/* Các đường vân kỹ thuật isometric bên trong mặt phẳng */}
            <line x1="0" y1="-21" x2="21" y2="-10" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="-21" x2="-21" y2="-10" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="21" x2="21" y2="10" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="21" x2="-21" y2="10" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />

            {/* KHỐI LẬP PHƯƠNG LỒNG NỘI TẠI (Inner Nested Tesseract Cube) */}
            <polygon
              points="0,-21 21,-10 0,1 -21,-10"
              stroke="#0284C7"
              strokeWidth="1.3"
              className="fill-sky-100/80 dark:fill-sky-900/80"
            />
            <polygon
              points="-21,-10 0,1 0,22 -21,11"
              stroke="#0284C7"
              strokeWidth="1.3"
              className="fill-sky-200/70 dark:fill-sky-950/70"
            />
            <polygon
              points="0,1 21,-10 21,11 0,22"
              stroke="#0284C7"
              strokeWidth="1.3"
              className="fill-sky-300/60 dark:fill-sky-800/60"
            />

            {/* Lõi tâm vi mạch số đồng tâm */}
            <circle cx="0" cy="1" r="8" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <circle cx="0" cy="1" r="4" stroke="#38BDF8" strokeWidth="1" className="fill-sky-50 dark:fill-sky-950" />
            <circle cx="0" cy="1" r="1.6" className="fill-[#0284C7]" />
          </g>
        </g>
      </svg>
    </div>
  );
};
