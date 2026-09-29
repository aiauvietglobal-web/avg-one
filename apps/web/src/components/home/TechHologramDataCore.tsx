import React from 'react';

/**
 * 🌐 TECH LINE DATA CORE (AVG ONE PRECISION ISOMETRIC LINE ART - LEFT SIDE)
 * 
 * Thiết kế phong cách Line Art trơn công nghệ cao (Clean Precision Vector Line Art):
 * - BỎ TOÀN BỘ SHADOW, GLOW MỜ NHÒE, CHÙM SÁNG ĐỤC.
 * - Chỉ sử dụng ĐƯỜNG NÉT LINE TRƠN (Sharp Outline / Isometric 3D Wireframe).
 * - Nổi khối tinh tế trên lớp nền lưới hiện có nhờ các nét vẽ phân cấp và mảng che nền sạch sẽ.
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
        {/* 1. BỆ ĐÀI CÔNG NGHỆ 3D (3D PRECISION HUD LINE PLATFORM)                    */}
        {/* ========================================================================= */}
        <g id="data-line-pedestal">
          
          {/* Vòng elip ngoài cùng viền đứt đoạn nét mảnh */}
          <ellipse
            cx="260"
            cy="275"
            rx="215"
            ry="66"
            stroke="#0284C7"
            strokeWidth="1.2"
            strokeDasharray="8 6 3 6"
            className="opacity-60 dark:opacity-40"
          />

          {/* Vòng elip thứ hai với vạch chia công nghệ (HUD ticks ring) */}
          <ellipse
            cx="260"
            cy="275"
            rx="185"
            ry="55"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            className="opacity-70 dark:opacity-50"
          />

          {/* Vành đai elip chính nét trơn sắc sảo */}
          <ellipse
            cx="260"
            cy="275"
            rx="155"
            ry="46"
            stroke="#0284C7"
            strokeWidth="2"
            className="opacity-85 dark:opacity-80"
          />

          {/* Vòng đai phụ song song tạo độ nổi (Double line) */}
          <ellipse
            cx="260"
            cy="275"
            rx="150"
            ry="44"
            stroke="#38BDF8"
            strokeWidth="1"
            className="opacity-70 dark:opacity-60"
          />

          {/* Vòng elip tầng trong nét đứt kỹ thuật */}
          <ellipse
            cx="260"
            cy="275"
            rx="125"
            ry="36"
            stroke="#0284C7"
            strokeWidth="1.4"
            strokeDasharray="40 10 20 10"
            className="opacity-75 dark:opacity-60"
          />

          <ellipse
            cx="260"
            cy="275"
            rx="95"
            ry="27"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="opacity-80 dark:opacity-75"
          />

          {/* Đĩa lõi trung tâm (Clean flat plate) che nền lưới */}
          <ellipse
            cx="260"
            cy="275"
            rx="70"
            ry="20"
            stroke="#0284C7"
            strokeWidth="1.6"
            className="fill-white/80 dark:fill-slate-950/80"
          />

          {/* Lõi tâm đồng tâm sắc nét */}
          <ellipse
            cx="260"
            cy="275"
            rx="46"
            ry="13"
            stroke="#0284C7"
            strokeWidth="1.8"
            className="fill-white dark:fill-slate-900"
          />
          <ellipse
            cx="260"
            cy="275"
            rx="22"
            ry="6"
            stroke="#38BDF8"
            strokeWidth="1.4"
            className="fill-sky-50 dark:fill-sky-950"
          />
          <circle cx="260" cy="275" r="2.5" className="fill-[#0284C7]" />

          {/* Các vạch nan hoa chỉ hướng công nghệ (Clean Radial Ticks) */}
          <g stroke="#0284C7" strokeWidth="1.2" className="opacity-60 dark:opacity-40">
            <line x1="165" y1="275" x2="190" y2="275" />
            <line x1="330" y1="275" x2="355" y2="275" />
            <line x1="260" y1="240" x2="260" y2="249" />
            <line x1="260" y1="301" x2="260" y2="310" />
            <line x1="195" y1="252" x2="210" y2="258" />
            <line x1="310" y1="292" x2="325" y2="298" />
            <line x1="310" y1="258" x2="325" y2="252" />
            <line x1="195" y1="298" x2="210" y2="292" />
          </g>

          {/* Các đường line thẳng đứng mảnh dẫn hướng (Precision Guide Lines - Thay thế chùm sáng mờ) */}
          <g stroke="#0284C7" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 dark:opacity-35">
            <line x1="230" y1="275" x2="215" y2="175" />
            <line x1="260" y1="269" x2="260" y2="140" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="6 3" className="opacity-65" />
            <line x1="290" y1="275" x2="305" y2="175" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 2. ĐƯỜNG MẠCH ĐIỆN TỬ VÀ 6 NODE VỆ TINH (CLEAN OUTLINE PODS)               */}
        {/* ========================================================================= */}
        <g id="data-line-circuit-network">
          
          {/* --- CÁC ĐƯỜNG LINE MẠCH ĐIỆN TỬ TRƠN SẮC NÉT --- */}
          <g stroke="#0284C7" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 dark:opacity-70">
            {/* Mạch 1: Ra Node Top-Left (Cloud) */}
            <path d="M 195 245 L 165 215 L 135 215" strokeDasharray="5 3" />
            {/* Mạch 2: Ra Node Far-Left (Shield) */}
            <path d="M 140 265 L 95 265 L 50 252" />
            {/* Mạch 3: Ra Node Bottom-Left (CPU) */}
            <path d="M 185 298 L 140 325 L 95 325" />

            {/* Mạch 4: Ra Node Top-Right (Global IoT) */}
            <path d="M 325 245 L 355 215 L 385 215" strokeDasharray="5 3" />
            {/* Mạch 5: Ra Node Far-Right (Analytics) */}
            <path d="M 380 265 L 425 265 L 470 252" />
            {/* Mạch 6: Ra Node Bottom-Right (Rocket) */}
            <path d="M 335 298 L 380 325 L 425 325" />
          </g>

          {/* Điểm hàn mạch dạng vòng tròn rỗng sắc nét (Eyelet pads) */}
          <g stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900">
            <circle cx="195" cy="245" r="2.5" />
            <circle cx="140" cy="265" r="2.5" />
            <circle cx="185" cy="298" r="2.5" />
            <circle cx="325" cy="245" r="2.5" />
            <circle cx="380" cy="265" r="2.5" />
            <circle cx="335" cy="298" r="2.5" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 1: TOP-LEFT - ĐIỆN TOÁN ĐÁM MÂY (Line Outline)           */}
          {/* ------------------------------------------------------------- */}
          <g id="node-cloud" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="135" cy="225" rx="20" ry="6.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="135" cy="225" rx="14" ry="4.5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(135, 202)">
              <circle cx="0" cy="0" r="14" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Cloud Icon Line */}
              <path
                d="M -5 3 L 5 3 C 6.5 3 7.5 2 7.5 0.5 C 7.5 -1 6.5 -2 5 -2 C 4.8 -2 4.5 -2 4.3 -1.8 C 4 -3.8 2 -5 0 -5 C -1.8 -5 -3.3 -4 -3.8 -2.3 C -4.2 -2.5 -4.6 -2.5 -5 -2.5 C -6.7 -2.5 -8 -1.2 -8 0.5 C -8 2 -6.7 3 -5 3 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-sky-50 dark:fill-sky-950"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 2: FAR-LEFT - AN NINH MẠNG & KHIÊN BẢO MẬT (Line Outline)*/}
          {/* ------------------------------------------------------------- */}
          <g id="node-shield" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="50" cy="264" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="50" cy="264" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(50, 238)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Shield Icon Line */}
              <path
                d="M 0 -8 L 6 -5 L 6 0 C 6 4.5 3.5 8 0 9.5 C -3.5 8 -6 4.5 -6 0 L -6 -5 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-sky-50 dark:fill-sky-950"
              />
              <path d="M -2 0 L -0.5 1.8 L 3 -2" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 3: BOTTOM-LEFT - VI XỬ LÝ TRÍ TUỆ NHÂN TẠO (Line Outline)*/}
          {/* ------------------------------------------------------------- */}
          <g id="node-cpu" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="95" cy="340" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="95" cy="340" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(95, 314)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* CPU Chip Line */}
              <rect x="-6" y="-6" width="12" height="12" rx="2" stroke="#0284C7" strokeWidth="1.3" className="fill-sky-50 dark:fill-sky-950" />
              <rect x="-3" y="-3" width="6" height="6" rx="1" stroke="#38BDF8" strokeWidth="1" fill="none" />
              {/* Chip Pins */}
              <line x1="-4" y1="-8" x2="-4" y2="-6" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="0" y1="-8" x2="0" y2="-6" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="4" y1="-8" x2="4" y2="-6" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="-4" y1="6" x2="-4" y2="8" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="0" y1="6" x2="0" y2="8" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="4" y1="6" x2="4" y2="8" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="-8" y1="-4" x2="-6" y2="-4" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="-8" y1="0" x2="-6" y2="0" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="-8" y1="4" x2="-6" y2="4" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="6" y1="-4" x2="8" y2="-4" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="6" y1="0" x2="8" y2="0" stroke="#0284C7" strokeWidth="1.1" />
              <line x1="6" y1="4" x2="8" y2="4" stroke="#0284C7" strokeWidth="1.1" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 4: TOP-RIGHT - MẠNG LƯỚI TOÀN CẦU (Line Outline)         */}
          {/* ------------------------------------------------------------- */}
          <g id="node-globe" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="385" cy="225" rx="20" ry="6.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="385" cy="225" rx="14" ry="4.5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(385, 202)">
              <circle cx="0" cy="0" r="14" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Globe Icon Line */}
              <circle cx="0" cy="0" r="7" stroke="#0284C7" strokeWidth="1.2" fill="none" />
              <ellipse cx="0" cy="0" rx="3.5" ry="7" stroke="#38BDF8" strokeWidth="1" fill="none" />
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#0284C7" strokeWidth="1" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 5: FAR-RIGHT - PHÂN TÍCH DỮ LIỆU (Line Outline)          */}
          {/* ------------------------------------------------------------- */}
          <g id="node-analytics" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="470" cy="264" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="470" cy="264" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(470, 238)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Chart Bars Line */}
              <rect x="-6" y="-1" width="2.5" height="7" rx="0.5" stroke="#0284C7" strokeWidth="1" className="fill-sky-50 dark:fill-sky-950" />
              <rect x="-1.5" y="-5" width="2.5" height="11" rx="0.5" stroke="#0284C7" strokeWidth="1" className="fill-sky-100 dark:fill-sky-900" />
              <rect x="3" y="-8" width="2.5" height="14" rx="0.5" stroke="#0284C7" strokeWidth="1" className="fill-sky-200 dark:fill-sky-800" />
              {/* Trend Arrow */}
              <path d="M -7 -2 L -1 -6 L 4 -10 L 7 -10 L 7 -7" stroke="#38BDF8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 6: BOTTOM-RIGHT - TĂNG TỐC SỐ HÓA (Line Outline)         */}
          {/* ------------------------------------------------------------- */}
          <g id="node-rocket" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="425" cy="340" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="425" cy="340" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(425, 314)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Rocket Body Line */}
              <path
                d="M 5 -6 C 5 -6 4 1 0 4 C -1 5 -3 5 -4 5 L -5 4 C -5 3 -5 1 -4 0 C -1 -4 6 -5 6 -5 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-sky-50 dark:fill-sky-950"
              />
              <path d="M -3 3 L -6 4 L -4 1" stroke="#38BDF8" strokeWidth="1" fill="none" />
              <path d="M 3 -3 L 4 -6 L 1 -4" stroke="#38BDF8" strokeWidth="1" fill="none" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. LÕI LẬP PHƯƠNG LƯỢNG TỬ LINE 3D (PRECISION ISOMETRIC WIREFRAME TESSERACT) */}
        {/* ========================================================================= */}
        <g id="line-tesseract-core">
          
          {/* Vòng tròn quỹ đạo bao quanh bằng nét đứt mảnh (Blueprint Boundary) */}
          <circle cx="260" cy="120" r="95" stroke="#0284C7" strokeWidth="1" strokeDasharray="4 6" className="opacity-40 dark:opacity-25" />

          {/* VÒNG QUỸ ĐẠO NGUYÊN TỬ 1 (Atomic Orbit Ring 1 - Line nét đứt) */}
          <g transform="translate(260, 120)">
            <ellipse
              cx="0"
              cy="0"
              rx="64"
              ry="26"
              stroke="#0284C7"
              strokeWidth="1.4"
              strokeDasharray="14 6"
              fill="none"
              className="opacity-70 dark:opacity-50"
              transform="rotate(-28)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-28 0 0"
                to="332 0 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </ellipse>
            <g transform="rotate(-28)">
              <circle cx="64" cy="0" r="3" stroke="#0284C7" strokeWidth="1.2" className="fill-white dark:fill-slate-900">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>

          {/* VÒNG QUỸ ĐẠO NGUYÊN TỬ 2 (Atomic Orbit Ring 2) */}
          <g transform="translate(260, 120)">
            <ellipse
              cx="0"
              cy="0"
              rx="64"
              ry="26"
              stroke="#38BDF8"
              strokeWidth="1.4"
              strokeDasharray="16 6"
              fill="none"
              className="opacity-70 dark:opacity-50"
              transform="rotate(42)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="42 0 0"
                to="-318 0 0"
                dur="14s"
                repeatCount="indefinite"
              />
            </ellipse>
            <g transform="rotate(42)">
              <circle cx="-64" cy="0" r="3" stroke="#38BDF8" strokeWidth="1.2" className="fill-white dark:fill-slate-900">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="-360 0 0"
                  dur="14s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>

          {/* KHỐI LẬP PHƯƠNG WIREFRAME 3D ISOMETRIC (Precision Isometric Wireframe Cube) */}
          <g transform="translate(260, 120)">
            
            {/* Khối che nền trắng nhẹ để khối nổi bật trơn tru trên nền lưới (Nổi khối không shadow) */}
            <g>
              {/* Mặt trên (Top Face) */}
              <polygon
                points="0,-48 42,-24 0,0 -42,-24"
                stroke="#0284C7"
                strokeWidth="2.2"
                className="fill-white/95 dark:fill-slate-900/95"
              />
              {/* Mặt trái (Left Face) */}
              <polygon
                points="-42,-24 0,0 0,48 -42,24"
                stroke="#0284C7"
                strokeWidth="2.2"
                className="fill-sky-50/90 dark:fill-slate-950/90"
              />
              {/* Mặt phải (Right Face) */}
              <polygon
                points="0,0 42,-24 42,24 0,48"
                stroke="#0284C7"
                strokeWidth="2.2"
                className="fill-sky-100/70 dark:fill-slate-800/70"
              />

              {/* Các đường line vân kỹ thuật bên trong mặt phẳng (Isometric Blueprint Lines) */}
              <line x1="0" y1="-24" x2="21" y2="-12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="-24" x2="-21" y2="-12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="24" x2="21" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="24" x2="-21" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* KHỐI LẬP PHƯƠNG LỒNG NỘI TẠI (Inner Nested Tesseract Cube Line) */}
              <polygon
                points="0,-24 21,-12 0,0 -21,-12"
                stroke="#0284C7"
                strokeWidth="1.4"
                className="fill-sky-100/60 dark:fill-sky-900/60"
              />
              <polygon
                points="-21,-12 0,0 0,24 -21,12"
                stroke="#0284C7"
                strokeWidth="1.4"
                className="fill-sky-200/50 dark:fill-sky-950/50"
              />
              <polygon
                points="0,0 21,-12 21,12 0,24"
                stroke="#0284C7"
                strokeWidth="1.4"
                className="fill-sky-300/40 dark:fill-sky-800/40"
              />

              {/* Lõi tâm vòng tròn Line kép đồng tâm */}
              <circle cx="0" cy="0" r="9" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              <circle cx="0" cy="0" r="4.5" stroke="#38BDF8" strokeWidth="1.2" className="fill-sky-100 dark:fill-sky-900" />
              <circle cx="0" cy="0" r="1.8" className="fill-[#0284C7]" />

              {/* Chuyển động lơ lửng bồng bềnh nhẹ */}
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,-4; 0,4; 0,-4"
                dur="4s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
