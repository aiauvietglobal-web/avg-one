import React from 'react';

/**
 * 🌐 TECH LINE PLATFORM CUBES (AVG ONE ISOMETRIC GEOMETRIC LINE ART - LEFT SIDE)
 * 
 * Phương án hình hộp, hình khối 3D dạng line (Clean Isometric 3D Boxes):
 * - Bỏ toàn bộ các vòng elip và line thừa gây rối mắt.
 * - Khối hộp lập phương trung tâm 3D (Modular Central Cube) vững chãi.
 * - Bệ đế khối hộp không gian 3D (Isometric Tech Podium) nâng đỡ vững chắc ("Một nền tảng Vững chắc!").
 * - 4 Khối hộp vệ tinh (Satellite Tech Cubes) dạng line sắc nét mang các biểu tượng số cốt lõi.
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
        {/* ========================================================================= */}
        {/* 1. BỆ ĐẾ HÌNH HỘP 3D ISOMETRIC (CLEAN ISOMETRIC PODIUM SLAB - KHÔNG RỐI)    */}
        {/* ========================================================================= */}
        <g id="isometric-base-slab">
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
            stroke="#0284C7"
            strokeWidth="1.8"
            className="fill-sky-200/60 dark:fill-slate-900/60"
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
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-75"
          />

          {/* Đường line thẳng dứt khoát dẫn từ bệ lên khối hộp trung tâm */}
          <line x1="260" y1="285" x2="260" y2="255" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />
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
          <polyline points="375,135 340,150 315,160" strokeDasharray="4 3" />
          {/* Nối Box 4 (Bottom-Right) */}
          <polyline points="400,245 365,270 345,278" />
        </g>

        {/* ========================================================================= */}
        {/* 3. BỐN KHỐI HỘP VỆ TINH 3D DẠNG LINE (4 SATELLITE ISOMETRIC CUBES)        */}
        {/* ========================================================================= */}

        {/* ------------------------------------------------------------- */}
        {/* BOX 1: TOP-LEFT - CLOUD DATA (Khối hộp 3D dạng Line)         */}
        {/* ------------------------------------------------------------- */}
        <g id="box-cloud" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          {/* Khối hộp 3D Isometric */}
          <g transform="translate(125, 115)">
            {/* Mặt trên */}
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            {/* Mặt trái */}
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-50 dark:fill-slate-950" />
            {/* Mặt phải */}
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-100 dark:fill-slate-800" />
            {/* Icon Cloud dạng Line trên đỉnh */}
            <g transform="translate(0, -8) scale(0.85)">
              <path
                d="M -5 2 L 5 2 C 6.5 2 7.5 1 7.5 -0.5 C 7.5 -2 6.5 -3 5 -3 C 4.8 -3 4.5 -3 4.3 -2.8 C 4 -4.8 2 -6 0 -6 C -1.8 -6 -3.3 -5 -3.8 -3.3 C -4.2 -3.5 -4.6 -3.5 -5 -3.5 C -6.7 -3.5 -8 -2.2 -8 -0.5 C -8 1 -6.7 2 -5 2 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-white dark:fill-slate-900"
              />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* BOX 2: BOTTOM-LEFT - SECURITY SHIELD (Khối hộp 3D dạng Line)  */}
        {/* ------------------------------------------------------------- */}
        <g id="box-shield" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(95, 230)">
            <polygon points="0,-22 24,-10 0,2 -24,-10" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <polygon points="-24,-10 0,2 0,26 -24,14" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 24,-10 24,14 0,26" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100 dark:fill-slate-800" />
            {/* Icon Shield dạng Line */}
            <g transform="translate(0, -10) scale(0.9)">
              <path
                d="M 0 -8 L 6 -5 L 6 0 C 6 4.5 3.5 8 0 9.5 C -3.5 8 -6 4.5 -6 0 L -6 -5 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-white dark:fill-slate-900"
              />
              <path d="M -2 0 L -0.5 1.8 L 3 -2" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* BOX 3: TOP-RIGHT - GLOBAL NETWORK (Khối hộp 3D dạng Line)     */}
        {/* ------------------------------------------------------------- */}
        <g id="box-globe" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(395, 115)">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-100 dark:fill-slate-800" />
            {/* Icon Globe dạng Line */}
            <g transform="translate(0, -8) scale(0.85)">
              <circle cx="0" cy="0" r="6.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white dark:fill-slate-900" />
              <ellipse cx="0" cy="0" rx="3" ry="6.5" stroke="#38BDF8" strokeWidth="0.9" fill="none" />
              <line x1="-6.5" y1="0" x2="6.5" y2="0" stroke="#38BDF8" strokeWidth="0.9" />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* BOX 4: BOTTOM-RIGHT - DATA ANALYTICS (Khối hộp 3D dạng Line)  */}
        {/* ------------------------------------------------------------- */}
        <g id="box-analytics" className="transition-transform duration-300 hover:scale-105 cursor-pointer pointer-events-auto">
          <g transform="translate(425, 230)">
            <polygon points="0,-22 24,-10 0,2 -24,-10" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            <polygon points="-24,-10 0,2 0,26 -24,14" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 24,-10 24,14 0,26" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100 dark:fill-slate-800" />
            {/* Icon Chart dạng Line */}
            <g transform="translate(0, -10) scale(0.9)">
              <rect x="-6" y="-1" width="2.5" height="7" rx="0.5" stroke="#0284C7" strokeWidth="1.1" className="fill-white dark:fill-slate-900" />
              <rect x="-1.5" y="-5" width="2.5" height="11" rx="0.5" stroke="#0284C7" strokeWidth="1.1" className="fill-sky-100 dark:fill-sky-900" />
              <rect x="3" y="-8" width="2.5" height="14" rx="0.5" stroke="#0284C7" strokeWidth="1.1" className="fill-sky-200 dark:fill-sky-800" />
              <path d="M -7 -2 L -1 -6 L 4 -9" stroke="#38BDF8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 4. KHỐI HỘP LẬP PHƯƠNG TRUNG TÂM (CENTRAL MODULAR ISOMETRIC 3D CUBE)      */}
        {/* ========================================================================= */}
        <g id="central-platform-cube">
          <g transform="translate(260, 160)">
            
            {/* MẶT TRÊN KHỐI HỘP CHÍNH (Top Face) */}
            <polygon
              points="0,-52 50,-26 0,0 -50,-26"
              stroke="#0284C7"
              strokeWidth="2.4"
              className="fill-white/95 dark:fill-slate-900/95"
            />
            {/* MẶT TRÁI KHỐI HỘP CHÍNH (Left Face) */}
            <polygon
              points="-50,-26 0,0 0,52 -50,26"
              stroke="#0284C7"
              strokeWidth="2.4"
              className="fill-sky-50/95 dark:fill-slate-950/95"
            />
            {/* MẶT PHẢI KHỐI HỘP CHÍNH (Right Face) */}
            <polygon
              points="0,0 50,-26 50,26 0,52"
              stroke="#0284C7"
              strokeWidth="2.4"
              className="fill-sky-100/80 dark:fill-slate-800/80"
            />

            {/* Các đường vân line kỹ thuật tinh giản trên mặt hộp */}
            <line x1="0" y1="-26" x2="25" y2="-13" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="0" y1="-26" x2="-25" y2="-13" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="0" y1="26" x2="25" y2="13" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="0" y1="26" x2="-25" y2="13" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4 3" />

            {/* KHỐI HỘP LỒNG BÊN TRONG (Inner Nested Cube dạng Line) */}
            <polygon
              points="0,-26 25,-13 0,0 -25,-13"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="fill-sky-100/70 dark:fill-sky-900/70"
            />
            <polygon
              points="-25,-13 0,0 0,26 -25,13"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="fill-sky-200/60 dark:fill-sky-950/60"
            />
            <polygon
              points="0,0 25,-13 25,13 0,26"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="fill-sky-300/50 dark:fill-sky-800/50"
            />

            {/* Lõi tâm vòng tròn Line kép đồng tâm */}
            <circle cx="0" cy="0" r="10" stroke="#0284C7" strokeWidth="1.8" className="fill-white dark:fill-slate-900" />
            <circle cx="0" cy="0" r="5" stroke="#38BDF8" strokeWidth="1.4" className="fill-sky-50 dark:fill-sky-950" />
            <circle cx="0" cy="0" r="2" className="fill-[#0284C7]" />

            {/* Chuyển động lơ lửng bồng bềnh êm ái */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,-4; 0,4; 0,-4"
              dur="4s"
              repeatCount="indefinite"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
