import React from 'react';

/**
 * 🌐 HIGH-TECH QUANTUM PLATFORM EMBLEM (AVG ONE DIGITAL CORE - LEFT SIDE)
 * 
 * Thiết kế biểu tượng nguyên khối cao cấp (Refined Monolithic Tech Emblem):
 * - Thoát ly hoàn toàn khỏi các chi tiết vụn vặt và hộp con rời rạc.
 * - Khối Tesseract Lập Phương Lượng Tử 3D tinh xảo kết hợp vòng quỹ đạo số.
 * - Khung đa giác hình học không gian (Isometric Hex-Prism Frame) vững chãi ("Một nền tảng Vững chắc!").
 * - Chuyển động bồng bềnh êm ái 60fps chuẩn đồ họa công nghệ quốc tế.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 400 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <style>{`
          @keyframes emblem-float-left {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes core-pulse-left {
            0%, 100% { transform: scale(1); opacity: 0.95; }
            50% { transform: scale(1.02); opacity: 1; }
          }
          @keyframes orbit-spin-left {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .anim-emblem-left { animation: emblem-float-left 5s ease-in-out infinite; }
          .anim-core-pulse-left { animation: core-pulse-left 3.5s ease-in-out infinite; transform-origin: 200px 170px; }
        `}</style>

        {/* ========================================================================= */}
        {/* KHỐI BIỂU TƯỢNG NGUYÊN KHỐI BỒNG BỀNH (KINETIC FLOATING MONOLITH)          */}
        {/* ========================================================================= */}
        <g className="anim-emblem-left">
          
          {/* 1. KHUNG ĐA GIÁC CÔNG NGHỆ 3D (ISOMETRIC HEXAGONAL WIREFRAME ENCLOSURE) */}
          <g id="hex-frame" stroke="#0284C7" strokeLinecap="round" strokeLinejoin="round">
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
            <line x1="200" y1="48" x2="200" y2="100" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="200" y1="292" x2="200" y2="240" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="92" y1="111" x2="140" y2="138" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="308" y1="111" x2="260" y2="138" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="92" y1="229" x2="140" y2="202" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />
            <line x1="308" y1="229" x2="260" y2="202" strokeWidth="1" strokeDasharray="3 3" className="opacity-50" />

            {/* Điểm nút tọa độ 6 góc (Corner Precision Node Markers) */}
            <circle cx="200" cy="48" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="308" cy="111" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="308" cy="229" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="200" cy="292" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="92" cy="229" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <circle cx="92" cy="111" r="3" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
          </g>

          {/* 2. CÁC VÒNG QUỸ ĐẠO NGUYÊN TỬ SỐ XOAY 3D (QUANTUM ATOMIC ORBITS) */}
          <g id="quantum-orbits" transform="translate(200, 170)">
            <ellipse
              cx="0"
              cy="0"
              rx="85"
              ry="32"
              stroke="#38BDF8"
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
            {/* Hạt electron số chuyển động trên quỹ đạo */}
            <circle cx="-72" cy="28" r="2.5" fill="#0284C7" />
            <circle cx="70" cy="-28" r="2.5" fill="#38BDF8" />
          </g>

          {/* 3. KHỐI LẬP PHƯƠNG LƯỢNG TỬ TRUNG TÂM (CENTRAL ISOMETRIC TESSERACT CUBE) */}
          <g id="tesseract-cube" className="anim-core-pulse-left" transform="translate(200, 170)">
            
            {/* MẶT TRÊN (Top Face - Sáng nhất) */}
            <polygon
              points="0,-56 50,-28 0,0 -50,-28"
              stroke="#0284C7"
              strokeWidth="2.2"
              className="fill-white/95 dark:fill-slate-900/95"
            />
            {/* MẶT TRÁI (Left Face - Trung gian) */}
            <polygon
              points="-50,-28 0,0 0,56 -50,28"
              stroke="#0284C7"
              strokeWidth="2.2"
              className="fill-sky-50/90 dark:fill-slate-950/90"
            />
            {/* MẶT PHẢI (Right Face - Tối hơn tạo khối) */}
            <polygon
              points="0,0 50,-28 50,28 0,56"
              stroke="#0284C7"
              strokeWidth="2.2"
              className="fill-sky-100/75 dark:fill-slate-800/75"
            />

            {/* Các đường vân kỹ thuật isometric bên trong mặt phẳng */}
            <line x1="0" y1="-28" x2="25" y2="-14" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="-28" x2="-25" y2="-14" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="28" x2="25" y2="14" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="28" x2="-25" y2="14" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* KHỐI LẬP PHƯƠNG CON LỒNG BÊN TRONG (Inner Nested Tesseract Cube) */}
            <polygon
              points="0,-28 25,-14 0,0 -25,-14"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="fill-sky-100/80 dark:fill-sky-900/80"
            />
            <polygon
              points="-25,-14 0,0 0,28 -25,14"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="fill-sky-200/70 dark:fill-sky-950/70"
            />
            <polygon
              points="0,0 25,-14 25,14 0,28"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="fill-sky-300/60 dark:fill-sky-800/60"
            />

            {/* Lõi tâm vi mạch số đồng tâm sắc nét */}
            <circle cx="0" cy="0" r="10" stroke="#0284C7" strokeWidth="1.8" className="fill-white dark:fill-slate-900" />
            <circle cx="0" cy="0" r="5" stroke="#38BDF8" strokeWidth="1.2" className="fill-sky-50 dark:fill-sky-950" />
            <circle cx="0" cy="0" r="2" className="fill-[#0284C7]" />
          </g>

          {/* 4. HUY HIỆU NỀN TẢNG SỐ DƯỚI ĐÁY (CLEAN ARCHITECTURAL BADGE) */}
          <g id="bottom-badge" transform="translate(200, 275)">
            <ellipse cx="0" cy="0" rx="36" ry="12" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="4 2" fill="none" opacity="0.6" />
            <line x1="-36" y1="0" x2="-48" y2="0" stroke="#0284C7" strokeWidth="1.2" />
            <line x1="36" y1="0" x2="48" y2="0" stroke="#0284C7" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
};
