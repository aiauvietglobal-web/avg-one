import React from 'react';

/**
 * ⚙️ TECH LINE GEAR ECOSYSTEM (AVG ONE PRECISION LINE ART - RIGHT SIDE)
 * 
 * Thiết kế phong cách Line Art trơn công nghệ cao (Clean Precision Vector Line Art):
 * - BỎ TOÀN BỘ SHADOW, GLOW MỜ NHÒE, CHÙM SÁNG ĐỤC.
 * - Chỉ sử dụng ĐƯỜNG NÉT LINE TRƠN (Sharp Outline / Blueprint / Wireframe).
 * - Nổi khối tinh tế trên lớp nền lưới hiện có nhờ các nét vẽ phân cấp và mảng che nền sạch sẽ.
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
        {/* 1. BỆ ĐÀI CÔNG NGHỆ 3D (3D PRECISION HUD LINE PLATFORM)                    */}
        {/* ========================================================================= */}
        <g id="line-pedestal">
          
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
            stroke="#F15A24"
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
            stroke="#F15A24"
            strokeWidth="1.8"
            className="fill-white dark:fill-slate-900"
          />
          <ellipse
            cx="260"
            cy="275"
            rx="22"
            ry="6"
            stroke="#0284C7"
            strokeWidth="1.4"
            className="fill-sky-50 dark:fill-sky-950"
          />
          <circle cx="260" cy="275" r="2.5" className="fill-[#F15A24]" />

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
            <line x1="260" y1="269" x2="260" y2="140" stroke="#F15A24" strokeWidth="1.2" strokeDasharray="6 3" className="opacity-65" />
            <line x1="290" y1="275" x2="305" y2="175" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 2. ĐƯỜNG MẠCH ĐIỆN TỬ VÀ 6 NODE VỆ TINH (CLEAN OUTLINE PODS)               */}
        {/* ========================================================================= */}
        <g id="line-circuit-network">
          
          {/* --- CÁC ĐƯỜNG LINE MẠCH ĐIỆN TỬ TRƠN SẮC NÉT --- */}
          <g stroke="#0284C7" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 dark:opacity-70">
            {/* Mạch 1: Ra Node Top-Left (Ổ khóa) */}
            <path d="M 195 245 L 165 215 L 135 215" strokeDasharray="5 3" />
            {/* Mạch 2: Ra Node Far-Left (Bóng đèn) */}
            <path d="M 140 265 L 95 265 L 50 252" />
            {/* Mạch 3: Ra Node Bottom-Left (Bánh răng mini) */}
            <path d="M 185 298 L 140 325 L 95 325" />

            {/* Mạch 4: Ra Node Top-Right (Loa phát thanh) */}
            <path d="M 325 245 L 355 215 L 385 215" strokeDasharray="5 3" />
            {/* Mạch 5: Ra Node Far-Right (Nhóm người) */}
            <path d="M 380 265 L 425 265 L 470 252" />
            {/* Mạch 6: Ra Node Bottom-Right (Não bộ AI) */}
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
          {/* NODE 1: TOP-LEFT - Ổ KHÓA TÀI CHÍNH $ (Line Outline)          */}
          {/* ------------------------------------------------------------- */}
          <g id="node-lock" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Đĩa chân đế nét đôi trơn */}
            <ellipse cx="135" cy="225" rx="20" ry="6.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="135" cy="225" rx="14" ry="4.5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            {/* Hộp icon tròn Line trơn */}
            <g transform="translate(135, 202)">
              <circle cx="0" cy="0" r="14" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Shackle */}
              <path d="M -4 -1 L -4 -6 A 4 4 0 0 1 4 -6 L 4 -1" stroke="#0284C7" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {/* Body */}
              <rect x="-6" y="-1" width="12" height="9" rx="1.5" stroke="#0284C7" strokeWidth="1.2" className="fill-sky-50 dark:fill-sky-950" />
              {/* Ký hiệu $ */}
              <text x="0" y="5.8" fill="#F15A24" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 2: FAR-LEFT - BÓNG ĐÈN SÁNG (Line Outline)               */}
          {/* ------------------------------------------------------------- */}
          <g id="node-bulb" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="50" cy="264" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="50" cy="264" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(50, 238)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Bulb shape outline */}
              <path
                d="M -5 3 C -7 1 -8 -2 -8 -5 C -8 -9.5 -4.5 -13 0 -13 C 4.5 -13 8 -9.5 8 -5 C 8 -2 7 1 5 3 L 4 6 L -4 6 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-sky-50/80 dark:fill-sky-950/80"
              />
              <line x1="-3" y1="8" x2="3" y2="8" stroke="#F15A24" strokeWidth="1.4" strokeLinecap="round" />
              {/* Tia sáng line trơn */}
              <line x1="0" y1="-16" x2="0" y2="-18" stroke="#F15A24" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-11" y1="-11" x2="-13" y2="-13" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="11" y1="-11" x2="13" y2="-13" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 3: BOTTOM-LEFT - 3 BÁNH RĂNG MINI (Line Outline)         */}
          {/* ------------------------------------------------------------- */}
          <g id="node-mini-gears" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="95" cy="340" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="95" cy="340" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(95, 314)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Gear 1 */}
              <circle cx="-3" cy="-3" r="5" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 1.5" className="fill-sky-50 dark:fill-sky-950" />
              <circle cx="-3" cy="-3" r="1.8" className="fill-[#0284C7]" />
              {/* Gear 2 */}
              <circle cx="4" cy="3" r="4.2" stroke="#F15A24" strokeWidth="1.2" strokeDasharray="2.5 1.5" className="fill-orange-50 dark:fill-orange-950" />
              <circle cx="4" cy="3" r="1.5" className="fill-[#F15A24]" />
              {/* Gear 3 */}
              <circle cx="4" cy="-5" r="3.2" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 1" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 4: TOP-RIGHT - CÁI LOA MEGAPHONE (Line Outline)          */}
          {/* ------------------------------------------------------------- */}
          <g id="node-megaphone" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="385" cy="225" rx="20" ry="6.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="385" cy="225" rx="14" ry="4.5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(385, 202)">
              <circle cx="0" cy="0" r="14" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Thân loa line */}
              <path d="M 4 -5 L -2 -2 L -5 -2 L -5 3 L -2 3 L 4 6 Z" stroke="#0284C7" strokeWidth="1.3" className="fill-sky-50 dark:fill-sky-950" />
              <path d="M -3 3 L -3 7 L -1 7 L -1 3" stroke="#F15A24" strokeWidth="1.2" />
              {/* Sóng âm thanh */}
              <path d="M 6 -3 A 4 4 0 0 1 6 4" stroke="#F15A24" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M 9 -5 A 7 7 0 0 1 9 6" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 5: FAR-RIGHT - NHÓM NGƯỜI (Line Outline)                 */}
          {/* ------------------------------------------------------------- */}
          <g id="node-users" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="470" cy="264" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="470" cy="264" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(470, 238)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Người phụ trái */}
              <circle cx="-5.5" cy="-3.5" r="2.2" stroke="#38BDF8" strokeWidth="1" fill="none" />
              <path d="M -9 5 C -9 2.5 -7 1 -5.5 1 C -4 1 -2 2.5 -2 5" stroke="#38BDF8" strokeWidth="1" fill="none" />
              {/* Người phụ phải */}
              <circle cx="5.5" cy="-3.5" r="2.2" stroke="#38BDF8" strokeWidth="1" fill="none" />
              <path d="M 2 5 C 2 2.5 4 1 5.5 1 C 7 1 9 2.5 9 5" stroke="#38BDF8" strokeWidth="1" fill="none" />
              {/* Người chính giữa */}
              <circle cx="0" cy="-4.5" r="3" stroke="#F15A24" strokeWidth="1.3" className="fill-white dark:fill-slate-900" />
              <path d="M -5 6 C -5 2.5 -2.5 0.5 0 0.5 C 2.5 0.5 5 2.5 5 6" stroke="#0284C7" strokeWidth="1.4" fill="none" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 6: BOTTOM-RIGHT - BỘ NÃO SỐ AI (Line Outline)            */}
          {/* ------------------------------------------------------------- */}
          <g id="node-brain" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="425" cy="340" rx="22" ry="7.5" stroke="#0284C7" strokeWidth="1.2" className="fill-white/90 dark:fill-slate-900/90" />
            <ellipse cx="425" cy="340" rx="16" ry="5" stroke="#38BDF8" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />
            <g transform="translate(425, 314)">
              <circle cx="0" cy="0" r="15" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Bán cầu não trái line */}
              <path
                d="M -1 -7 C -4 -7 -7 -5 -7 -2 C -7 -0.5 -6 0.5 -5 1 C -6 2 -7 3.5 -7 5 C -7 7.5 -4.5 8 -1 8"
                stroke="#0284C7"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M -1 -3 C -3 -3 -4 -1.5 -4 0 C -4 1.5 -3 3 -1 3" stroke="#38BDF8" strokeWidth="1.1" fill="none" />
              {/* Bán cầu não phải line */}
              <path
                d="M 1 -7 C 4 -7 7 -5 7 -2 C 7 -0.5 6 0.5 5 1 C 6 2 7 3.5 7 5 C 7 7.5 4.5 8 1 8"
                stroke="#F15A24"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 1 -3 C 3 -3 4 -1.5 4 0 C 4 1.5 3 3 1 3" stroke="#F15A24" strokeWidth="1.1" fill="none" />
              {/* Trục giữa nơ-ron */}
              <line x1="0" y1="-7" x2="0" y2="8" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. CỤM 3 BÁNH RĂNG LINE TRƠN ĂN KHỚP (PRECISION BLUEPRINT 3-GEAR CLUSTER) */}
        {/* ========================================================================= */}
        <g id="line-floating-gears">
          
          {/* Vòng tròn quỹ đạo bao quanh bằng nét đứt mảnh (Blueprint Boundary) */}
          <circle cx="260" cy="120" r="95" stroke="#0284C7" strokeWidth="1" strokeDasharray="4 6" className="opacity-40 dark:opacity-25" />

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR) - MÀU CAM THƯƠNG HIỆU       */}
          {/* Tâm: (260, 84) - Quay thuận chiều kim đồng hồ (+360°) trong 12s*/}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(260, 84)">
            <g>
              {/* Bánh răng viền Line nổi trơn (Nền trắng/slate đệm nhẹ để nổi khối trên nền lưới) */}
              <path
                d={gearPath}
                stroke="#F15A24"
                strokeWidth="2.2"
                className="fill-white dark:fill-slate-900"
                fillRule="evenodd"
              />
              {/* Vòng chia kỹ thuật (Pitch Circle Line) */}
              <circle cx="0" cy="0" r="23" stroke="#F15A24" strokeWidth="1" strokeDasharray="3 3" className="opacity-70" />
              {/* Vành trục và nan hoa 4 hướng dạng Line */}
              <line x1="-15" y1="0" x2="-23" y2="0" stroke="#F15A24" strokeWidth="1.2" />
              <line x1="15" y1="0" x2="23" y2="0" stroke="#F15A24" strokeWidth="1.2" />
              <line x1="0" y1="-15" x2="0" y2="-23" stroke="#F15A24" strokeWidth="1.2" />
              <line x1="0" y1="15" x2="0" y2="23" stroke="#F15A24" strokeWidth="1.2" />
              {/* Trục trung tâm */}
              <circle cx="0" cy="0" r="7" stroke="#F15A24" strokeWidth="1.4" className="fill-orange-50 dark:fill-orange-950" />
              <circle cx="0" cy="0" r="2.5" className="fill-[#F15A24]" />

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

          {/* ----------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI BÊN TRÁI (BOTTOM-LEFT GEAR) - MÀU XANH DƯƠNG     */}
          {/* Tâm: (203.5, 134.8) - Ăn khớp chuẩn Bánh 1 - Quay ngược chiều 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(203.5, 134.8)">
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
          {/* Tâm: (316.5, 134.8) - Ăn khớp chuẩn Bánh 1 - Quay ngược chiều 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(316.5, 134.8)">
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
