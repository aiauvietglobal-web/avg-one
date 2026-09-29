import React from 'react';

/**
 * 🛸 TECH HOLOGRAM GEAR ECOSYSTEM (AVG ONE 3D SCI-FI PLATFORM - RIGHT SIDE)
 * 
 * Nâng cấp bố cục biểu tượng theo thiết kế Hologram Công nghệ 3D:
 * 1. Bệ đài công nghệ không gian elip 3D (Hologram Pedestal with concentric luminous rings & HUD ticks)
 * 2. Tâm bệ đài: Lõi phản ứng quang học (Optical Core Reactor & Light Beams) chiếu sáng lên cụm trung tâm
 * 3. Trung tâm: Cụm 3 Bánh răng Neon Cyan phát sáng lơ lửng, ăn khớp cơ học hoàn hảo và xoay động mượt mà
 * 4. Bao quanh: 6 Node vệ tinh kết nối bằng đường mạch điện tử (Circuit traces & glowing pod nodes):
 *    - Node 1 (Top-Left): Ổ khóa tài chính $ (Bảo mật / Dòng tiền)
 *    - Node 2 (Far-Left): Bóng đèn phát sáng (Ý tưởng / Đổi mới)
 *    - Node 3 (Bottom-Left): Cụm bánh răng mini (Vận hành / Tự động hóa)
 *    - Node 4 (Top-Right): Cái loa Megaphone (Marketing / Truyền thông)
 *    - Node 5 (Far-Right): Nhóm người 3 người (Khách hàng / Nhân sự / Đội ngũ)
 *    - Node 6 (Bottom-Right): Bộ não số AI (Trí tuệ nhân tạo / Dữ liệu thông minh)
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
        <defs>
          {/* 🌟 NEON GLOW FILTERS */}
          <filter id="holo-gear-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="blur1" />
            <feGaussianBlur stdDeviation="9" result="blur2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0.85 0 0 0.9   0 0 1 0 1   0 0 0 0.85 0"
              in="blur1"
              result="glow1"
            />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="glow1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="holo-core-flare" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="flareBlur" />
            <feMerge>
              <feMergeNode in="flareBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="holo-node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="podBlur" />
            <feMerge>
              <feMergeNode in="podBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="holo-beam-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          {/* 🎨 GRADIENTS */}
          {/* Gradient cho 3 bánh răng Neon Cyan */}
          <linearGradient id="holo-gear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="30%" stopColor="#22D3EE" />
            <stop offset="65%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Gradient viền bánh răng */}
          <linearGradient id="holo-gear-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Gradient chùm sáng dọc (Light Core Beam) từ bệ chiếu lên bánh răng */}
          <linearGradient id="holo-beam-grad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="15%" stopColor="#F97316" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#00F0FF" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#0284C7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>

          {/* Gradient bệ đài trung tâm */}
          <radialGradient id="holo-pedestal-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FDBA74" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FB923C" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Gradient bệ node vệ tinh */}
          <radialGradient id="holo-node-base" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#00E5FF" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Gradient vành đai bệ đài */}
          <linearGradient id="holo-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* ========================================================================= */}
        {/* 1. BỆ ĐÀI CÔNG NGHỆ 3D (3D HOLOGRAPHIC PEDESTAL WITH PERSPECTIVE RINGS)    */}
        {/* ========================================================================= */}
        <g id="hologram-pedestal" className="opacity-95 dark:opacity-100">
          
          {/* Vầng sáng nền khuếch tán dưới đáy bệ */}
          <ellipse cx="260" cy="275" rx="220" ry="70" fill="url(#holo-pedestal-core)" opacity="0.3" />

          {/* Vòng elip ngoài cùng viền đứt đoạn (Outer dashed radar orbit) */}
          <ellipse
            cx="260"
            cy="275"
            rx="215"
            ry="66"
            stroke="#00E5FF"
            strokeWidth="1.4"
            strokeDasharray="8 6 3 6"
            strokeOpacity="0.6"
          />

          {/* Vòng elip thứ hai với vạch chia công nghệ (HUD ticks ring) */}
          <ellipse
            cx="260"
            cy="275"
            rx="185"
            ry="55"
            stroke="#0284C7"
            strokeWidth="2.2"
            strokeDasharray="2 7"
            strokeOpacity="0.75"
          />

          {/* Vành đai elip phát sáng chính (Primary luminous HUD track) */}
          <ellipse
            cx="260"
            cy="275"
            rx="155"
            ry="46"
            stroke="url(#holo-ring-grad)"
            strokeWidth="2.8"
            filter="url(#holo-core-flare)"
            strokeOpacity="0.95"
          />

          {/* Vòng elip tầng trong với các cung sáng phân đoạn */}
          <ellipse
            cx="260"
            cy="275"
            rx="125"
            ry="36"
            stroke="#00E5FF"
            strokeWidth="1.6"
            strokeDasharray="45 15 30 10"
            strokeOpacity="0.8"
          />

          <ellipse
            cx="260"
            cy="275"
            rx="95"
            ry="27"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeOpacity="0.9"
          />

          {/* Vòng đĩa lõi năng lượng (Inner reactor plate) */}
          <ellipse
            cx="260"
            cy="275"
            rx="70"
            ry="20"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="#0284C7"
            fillOpacity="0.3"
          />

          {/* Lõi năng lượng trung tâm phát sáng cực mạnh (Core Reactor) */}
          <ellipse
            cx="260"
            cy="275"
            rx="46"
            ry="13"
            fill="url(#holo-pedestal-core)"
            filter="url(#holo-core-flare)"
          />
          <ellipse
            cx="260"
            cy="275"
            rx="22"
            ry="6"
            fill="#FFFFFF"
            filter="url(#holo-core-flare)"
          />

          {/* Các vạch nan hoa tỏa từ tâm (Radial HUD Ticks) */}
          <g stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.6">
            <line x1="165" y1="275" x2="190" y2="275" />
            <line x1="330" y1="275" x2="355" y2="275" />
            <line x1="260" y1="240" x2="260" y2="249" />
            <line x1="260" y1="301" x2="260" y2="310" />
            <line x1="195" y1="252" x2="210" y2="258" />
            <line x1="310" y1="292" x2="325" y2="298" />
            <line x1="310" y1="258" x2="325" y2="252" />
            <line x1="195" y1="298" x2="210" y2="292" />
          </g>

          {/* CHÙM SÁNG QUANG HỌC RỌI LÊN CỤM BÁNH RĂNG (VERTICAL OPTICAL CORE BEAM) */}
          <path
            d="M 225 275 L 180 125 L 340 125 L 295 275 Z"
            fill="url(#holo-beam-grad)"
            filter="url(#holo-beam-glow)"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          {/* Các tia sáng thẳng đứng mỏng (Vertical Laser Beams) */}
          <g stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.65">
            <line x1="240" y1="275" x2="230" y2="110" strokeDasharray="30 8" />
            <line x1="260" y1="275" x2="260" y2="80" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.9" />
            <line x1="280" y1="275" x2="290" y2="110" strokeDasharray="30 8" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 2. ĐƯỜNG MẠCH ĐIỆN TỬ VÀ 6 NODE VỆ TINH (CIRCUIT TRACES & SATELLITE PODS) */}
        {/* ========================================================================= */}
        <g id="hologram-circuit-network">
          
          {/* --- CÁC ĐƯỜNG MẠCH ĐIỆN TỬ NỐI TỪ BỆ ĐÀI RA 6 NODE --- */}
          <g stroke="#00E5FF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            {/* Mạch 1: Ra Node Top-Left (Ổ khóa) */}
            <path d="M 195 245 L 165 215 L 135 215" strokeDasharray="4 2" />
            {/* Mạch 2: Ra Node Far-Left (Bóng đèn) */}
            <path d="M 140 265 L 95 265 L 50 252" />
            {/* Mạch 3: Ra Node Bottom-Left (Bánh răng mini) */}
            <path d="M 185 298 L 140 325 L 95 325" />

            {/* Mạch 4: Ra Node Top-Right (Loa phát thanh) */}
            <path d="M 325 245 L 355 215 L 385 215" strokeDasharray="4 2" />
            {/* Mạch 5: Ra Node Far-Right (Nhóm người) */}
            <path d="M 380 265 L 425 265 L 470 252" />
            {/* Mạch 6: Ra Node Bottom-Right (Não bộ AI) */}
            <path d="M 335 298 L 380 325 L 425 325" />
          </g>

          {/* Các điểm nút hàn mạch điện phát sáng (Junction glowing pads) */}
          <g fill="#00E5FF" filter="url(#holo-node-glow)">
            <circle cx="195" cy="245" r="2.5" />
            <circle cx="140" cy="265" r="2.5" />
            <circle cx="185" cy="298" r="2.5" />
            <circle cx="325" cy="245" r="2.5" />
            <circle cx="380" cy="265" r="2.5" />
            <circle cx="335" cy="298" r="2.5" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 1: TOP-LEFT - Ổ KHÓA TÀI CHÍNH $ (Bảo mật / Dòng tiền) */}
          {/* ------------------------------------------------------------- */}
          <g id="node-lock" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Bệ đĩa phát sáng */}
            <ellipse cx="135" cy="225" rx="24" ry="8" fill="url(#holo-node-base)" />
            <ellipse cx="135" cy="225" rx="18" ry="6" stroke="#00E5FF" strokeWidth="1.2" fill="none" filter="url(#holo-node-glow)" />
            {/* Hộp phát sáng & Icon Ổ khóa $ */}
            <g transform="translate(135, 202)">
              <circle cx="0" cy="0" r="14" fill="#0284C7" fillOpacity="0.45" stroke="#00E5FF" strokeWidth="1.5" filter="url(#holo-node-glow)" />
              {/* Shackle */}
              <path d="M -4 -1 L -4 -6 A 4 4 0 0 1 4 -6 L 4 -1" stroke="#FFFFFF" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {/* Body */}
              <rect x="-6" y="-1" width="12" height="9" rx="1.5" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="0.8" />
              {/* Ký hiệu $ */}
              <text x="0" y="5.5" fill="#0F172A" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 2: FAR-LEFT - BÓNG ĐÈN SÁNG (Ý tưởng / Đổi mới sáng tạo)  */}
          {/* ------------------------------------------------------------- */}
          <g id="node-bulb" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Bệ đĩa phát sáng */}
            <ellipse cx="50" cy="264" rx="26" ry="9" fill="url(#holo-node-base)" />
            <ellipse cx="50" cy="264" rx="20" ry="7" stroke="#00E5FF" strokeWidth="1.4" fill="none" filter="url(#holo-node-glow)" />
            {/* Icon Bóng đèn */}
            <g transform="translate(50, 238)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.45" stroke="#00E5FF" strokeWidth="1.5" filter="url(#holo-node-glow)" />
              {/* Bulb shape */}
              <path
                d="M -5 3 C -7 1 -8 -2 -8 -5 C -8 -9.5 -4.5 -13 0 -13 C 4.5 -13 8 -9.5 8 -5 C 8 -2 7 1 5 3 L 4 6 L -4 6 Z"
                fill="#FFFFFF"
                stroke="#00E5FF"
                strokeWidth="1"
              />
              <line x1="-3" y1="8" x2="3" y2="8" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" />
              {/* Tia sáng phát quang */}
              <line x1="0" y1="-16" x2="0" y2="-18" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-11" y1="-11" x2="-13" y2="-13" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="11" y1="-11" x2="13" y2="-13" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 3: BOTTOM-LEFT - 3 BÁNH RĂNG MINI (Vận hành / Tự động hóa) */}
          {/* ------------------------------------------------------------- */}
          <g id="node-mini-gears" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Bệ đĩa phát sáng */}
            <ellipse cx="95" cy="340" rx="26" ry="9" fill="url(#holo-node-base)" />
            <ellipse cx="95" cy="340" rx="20" ry="7" stroke="#00E5FF" strokeWidth="1.4" fill="none" filter="url(#holo-node-glow)" />
            {/* Icon 3 Bánh răng mini */}
            <g transform="translate(95, 314)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.45" stroke="#00E5FF" strokeWidth="1.5" filter="url(#holo-node-glow)" />
              {/* Gear 1 */}
              <circle cx="-3" cy="-3" r="5" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="3 1.5" />
              <circle cx="-3" cy="-3" r="1.8" fill="#0F172A" />
              {/* Gear 2 */}
              <circle cx="4" cy="3" r="4.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2.5 1.5" />
              <circle cx="4" cy="3" r="1.5" fill="#0F172A" />
              {/* Gear 3 */}
              <circle cx="4" cy="-5" r="3.2" fill="#7DD3FC" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="2 1" />
              <circle cx="4" cy="-5" r="1" fill="#0F172A" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 4: TOP-RIGHT - CÁI LOA MEGAPHONE (Marketing / Truyền thông)*/}
          {/* ------------------------------------------------------------- */}
          <g id="node-megaphone" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Bệ đĩa phát sáng */}
            <ellipse cx="385" cy="225" rx="24" ry="8" fill="url(#holo-node-base)" />
            <ellipse cx="385" cy="225" rx="18" ry="6" stroke="#00E5FF" strokeWidth="1.2" fill="none" filter="url(#holo-node-glow)" />
            {/* Icon Megaphone */}
            <g transform="translate(385, 202)">
              <circle cx="0" cy="0" r="14" fill="#0284C7" fillOpacity="0.45" stroke="#00E5FF" strokeWidth="1.5" filter="url(#holo-node-glow)" />
              {/* Thân loa */}
              <path d="M 4 -5 L -2 -2 L -5 -2 L -5 3 L -2 3 L 4 6 Z" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="0.8" />
              <path d="M -3 3 L -3 7 L -1 7 L -1 3" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.6" />
              {/* Sóng âm thanh */}
              <path d="M 6 -3 A 4 4 0 0 1 6 4" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M 9 -5 A 7 7 0 0 1 9 6" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 5: FAR-RIGHT - NHÓM NGƯỜI (Khách hàng / Đội ngũ / Nhân sự) */}
          {/* ------------------------------------------------------------- */}
          <g id="node-users" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Bệ đĩa phát sáng */}
            <ellipse cx="470" cy="264" rx="26" ry="9" fill="url(#holo-node-base)" />
            <ellipse cx="470" cy="264" rx="20" ry="7" stroke="#00E5FF" strokeWidth="1.4" fill="none" filter="url(#holo-node-glow)" />
            {/* Icon 3 Người */}
            <g transform="translate(470, 238)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.45" stroke="#00E5FF" strokeWidth="1.5" filter="url(#holo-node-glow)" />
              {/* Người phụ trái */}
              <circle cx="-5.5" cy="-3.5" r="2.3" fill="#7DD3FC" />
              <path d="M -9 5 C -9 2.5 -7 1 -5.5 1 C -4 1 -2 2.5 -2 5 Z" fill="#7DD3FC" />
              {/* Người phụ phải */}
              <circle cx="5.5" cy="-3.5" r="2.3" fill="#7DD3FC" />
              <path d="M 2 5 C 2 2.5 4 1 5.5 1 C 7 1 9 2.5 9 5 Z" fill="#7DD3FC" />
              {/* Người chính giữa */}
              <circle cx="0" cy="-4.5" r="3.2" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="0.8" />
              <path d="M -5 6 C -5 2.5 -2.5 0.5 0 0.5 C 2.5 0.5 5 2.5 5 6 Z" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 6: BOTTOM-RIGHT - BỘ NÃO SỐ AI (Trí tuệ nhân tạo / Data) */}
          {/* ------------------------------------------------------------- */}
          <g id="node-brain" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            {/* Bệ đĩa phát sáng */}
            <ellipse cx="425" cy="340" rx="26" ry="9" fill="url(#holo-node-base)" />
            <ellipse cx="425" cy="340" rx="20" ry="7" stroke="#00E5FF" strokeWidth="1.4" fill="none" filter="url(#holo-node-glow)" />
            {/* Icon Não bộ AI */}
            <g transform="translate(425, 314)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.45" stroke="#00E5FF" strokeWidth="1.5" filter="url(#holo-node-glow)" />
              {/* Bán cầu não trái */}
              <path
                d="M -1 -7 C -4 -7 -7 -5 -7 -2 C -7 -0.5 -6 0.5 -5 1 C -6 2 -7 3.5 -7 5 C -7 7.5 -4.5 8 -1 8"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M -1 -3 C -3 -3 -4 -1.5 -4 0 C -4 1.5 -3 3 -1 3" stroke="#00E5FF" strokeWidth="1" fill="none" />
              {/* Bán cầu não phải */}
              <path
                d="M 1 -7 C 4 -7 7 -5 7 -2 C 7 -0.5 6 0.5 5 1 C 6 2 7 3.5 7 5 C 7 7.5 4.5 8 1 8"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 1 -3 C 3 -3 4 -1.5 4 0 C 4 1.5 3 3 1 3" stroke="#00E5FF" strokeWidth="1" fill="none" />
              {/* Trục giữa nơ-ron */}
              <line x1="0" y1="-7" x2="0" y2="8" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. CỤM 3 BÁNH RĂNG NEON CYAN PHÁT SÁNG ĂN KHỚP (FLOATING 3-GEAR CLUSTER) */}
        {/* ========================================================================= */}
        <g id="hologram-floating-gears" className="filter drop-shadow-[0_0_24px_rgba(0,229,255,0.7)]">
          
          {/* Vầng hào quang bảo vệ quanh cụm bánh răng */}
          <circle cx="260" cy="120" r="95" fill="#00E5FF" opacity="0.08" filter="url(#holo-core-flare)" />

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR)                             */}
          {/* Tâm: (260, 84) - Quay thuận chiều kim đồng hồ (+360°) trong 12s*/}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(260, 84)">
            <g>
              <path
                d={gearPath}
                fill="url(#holo-gear-gradient)"
                stroke="url(#holo-gear-stroke)"
                strokeWidth="1.6"
                filter="url(#holo-gear-glow)"
                fillRule="evenodd"
              />
              {/* Vòng đai trang trí công nghệ bên trong */}
              <circle cx="0" cy="0" r="21" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
              {/* Trục trung tâm */}
              <circle cx="0" cy="0" r="7" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.2" />

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
          {/* BÁNH RĂNG 2: DƯỚI BÊN TRÁI (BOTTOM-LEFT GEAR)                     */}
          {/* Tâm: (203.5, 134.8) - Ăn khớp chuẩn Bánh 1 - Quay ngược chiều 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(203.5, 134.8)">
            <g>
              <path
                d={gearPath}
                fill="url(#holo-gear-gradient)"
                stroke="url(#holo-gear-stroke)"
                strokeWidth="1.6"
                filter="url(#holo-gear-glow)"
                fillRule="evenodd"
              />
              {/* Vòng đai trang trí công nghệ bên trong */}
              <circle cx="0" cy="0" r="21" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
              {/* Trục trung tâm */}
              <circle cx="0" cy="0" r="7" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.2" />

              {/* Chuyển động xoay mượt mà 60fps ngược chiều kim đồng hồ */}
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
          {/* BÁNH RĂNG 3: DƯỚI BÊN PHẢI (BOTTOM-RIGHT GEAR)                    */}
          {/* Tâm: (316.5, 134.8) - Ăn khớp chuẩn Bánh 1 - Quay ngược chiều 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(316.5, 134.8)">
            <g>
              <path
                d={gearPath}
                fill="url(#holo-gear-gradient)"
                stroke="url(#holo-gear-stroke)"
                strokeWidth="1.6"
                filter="url(#holo-gear-glow)"
                fillRule="evenodd"
              />
              {/* Vòng đai trang trí công nghệ bên trong */}
              <circle cx="0" cy="0" r="21" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
              {/* Trục trung tâm */}
              <circle cx="0" cy="0" r="7" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.2" />

              {/* Chuyển động xoay mượt mà 60fps ngược chiều kim đồng hồ */}
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
