import React from 'react';

/**
 * 🌐 TECH HOLOGRAM DATA CORE (AVG ONE 3D SCI-FI QUANTUM PLATFORM - LEFT SIDE)
 * 
 * Biểu tượng công nghệ không gian bên trái:
 * 1. Bệ đài công nghệ không gian elip 3D đối xứng hoàn hảo với bệ đài bên phải
 * 2. Tâm bệ đài: Lõi phản ứng lượng tử (Quantum Core Flare) chiếu chùm tia sáng quang học lên trung tâm
 * 3. Trung tâm: Khối lập phương lượng tử 3D (Quantum Tech Cube & AI Neural Core) phát sáng lơ lửng, chuyển động xoay không gian 3D
 * 4. Bao quanh: 6 Node vệ tinh công nghệ cao kết nối bằng đường mạch điện tử:
 *    - Node 1 (Top-Left): Điện toán đám mây (Cloud Data Architecture)
 *    - Node 2 (Far-Left): An ninh mạng & Khiên bảo mật (Cyber Security Shield)
 *    - Node 3 (Bottom-Left): Vi xử lý trí tuệ nhân tạo (AI Microchip Processor)
 *    - Node 4 (Top-Right): Kết nối mạng lưới toàn cầu (Global IoT Network)
 *    - Node 5 (Far-Right): Phân tích dữ liệu thông minh (Smart Data Analytics)
 *    - Node 6 (Bottom-Right): Động cơ bứt phá số hóa (Digital Acceleration Velocity)
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
        <defs>
          {/* 🌟 NEON GLOW FILTERS */}
          <filter id="data-core-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0.8 0 0 0.9   0 0 1 0 1   0 0 0 0.85 0"
              in="blur1"
              result="glow1"
            />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="glow1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="data-core-flare" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="flareBlur" />
            <feMerge>
              <feMergeNode in="flareBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="data-node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="podBlur" />
            <feMerge>
              <feMergeNode in="podBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="data-beam-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>

          {/* 🎨 GRADIENTS */}
          <linearGradient id="quantum-cube-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="quantum-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Gradient chùm tia sáng thẳng đứng chiếu lên Quantum Core */}
          <linearGradient id="data-beam-grad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="15%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#0284C7" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#00F0FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </linearGradient>

          {/* Gradient bệ đài trung tâm */}
          <radialGradient id="data-pedestal-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#0284C7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
          </radialGradient>

          {/* Gradient bệ node vệ tinh */}
          <radialGradient id="data-node-base" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#0369A1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#075985" stopOpacity="0" />
          </radialGradient>

          {/* Gradient vành đai bệ đài */}
          <linearGradient id="data-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ========================================================================= */}
        {/* 1. BỆ ĐÀI CÔNG NGHỆ 3D (3D HOLOGRAPHIC PEDESTAL WITH PERSPECTIVE RINGS)    */}
        {/* ========================================================================= */}
        <g id="data-hologram-pedestal" className="opacity-95 dark:opacity-100">
          
          {/* Vầng sáng nền khuếch tán dưới đáy bệ */}
          <ellipse cx="260" cy="275" rx="220" ry="70" fill="url(#data-pedestal-core)" opacity="0.3" />

          {/* Vòng elip ngoài cùng viền đứt đoạn (Outer dashed radar orbit) */}
          <ellipse
            cx="260"
            cy="275"
            rx="215"
            ry="66"
            stroke="#0284C7"
            strokeWidth="1.2"
            strokeDasharray="8 6 3 6"
            strokeOpacity="0.5"
          />

          {/* Vòng elip thứ hai với vạch chia công nghệ (HUD ticks ring) */}
          <ellipse
            cx="260"
            cy="275"
            rx="185"
            ry="55"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeDasharray="2 7"
            strokeOpacity="0.7"
          />

          {/* Vành đai elip phát sáng chính (Primary luminous HUD track) */}
          <ellipse
            cx="260"
            cy="275"
            rx="155"
            ry="46"
            stroke="url(#data-ring-grad)"
            strokeWidth="2.8"
            filter="url(#data-core-flare)"
            strokeOpacity="0.9"
          />

          {/* Vòng elip tầng trong với các cung sáng phân đoạn */}
          <ellipse
            cx="260"
            cy="275"
            rx="125"
            ry="36"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeDasharray="45 15 30 10"
            strokeOpacity="0.8"
          />

          <ellipse
            cx="260"
            cy="275"
            rx="95"
            ry="27"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeDasharray="6 4"
            strokeOpacity="0.85"
          />

          {/* Vòng đĩa lõi năng lượng (Inner reactor plate) */}
          <ellipse
            cx="260"
            cy="275"
            rx="70"
            ry="20"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="#0369A1"
            fillOpacity="0.25"
          />

          {/* Lõi năng lượng trung tâm phát sáng cực mạnh (Core Reactor) */}
          <ellipse
            cx="260"
            cy="275"
            rx="46"
            ry="13"
            fill="url(#data-pedestal-core)"
            filter="url(#data-core-flare)"
          />
          <ellipse
            cx="260"
            cy="275"
            rx="22"
            ry="6"
            fill="#FFFFFF"
            filter="url(#data-core-flare)"
          />

          {/* Các vạch nan hoa tỏa từ tâm (Radial HUD Ticks) */}
          <g stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.55">
            <line x1="165" y1="275" x2="190" y2="275" />
            <line x1="330" y1="275" x2="355" y2="275" />
            <line x1="260" y1="240" x2="260" y2="249" />
            <line x1="260" y1="301" x2="260" y2="310" />
            <line x1="195" y1="252" x2="210" y2="258" />
            <line x1="310" y1="292" x2="325" y2="298" />
            <line x1="310" y1="258" x2="325" y2="252" />
            <line x1="195" y1="298" x2="210" y2="292" />
          </g>

          {/* CHÙM SÁNG QUANG HỌC RỌI LÊN CỤM LÕI CÔNG NGHỆ (VERTICAL OPTICAL CORE BEAM) */}
          <path
            d="M 225 275 L 180 125 L 340 125 L 295 275 Z"
            fill="url(#data-beam-grad)"
            filter="url(#data-beam-glow)"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          {/* Các tia sáng thẳng đứng mỏng (Vertical Laser Beams) */}
          <g stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.6">
            <line x1="240" y1="275" x2="230" y2="110" strokeDasharray="30 8" />
            <line x1="260" y1="275" x2="260" y2="80" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.9" />
            <line x1="280" y1="275" x2="290" y2="110" strokeDasharray="30 8" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 2. ĐƯỜNG MẠCH ĐIỆN TỬ VÀ 6 NODE VỆ TINH (CIRCUIT TRACES & SATELLITE PODS) */}
        {/* ========================================================================= */}
        <g id="data-circuit-network">
          
          {/* --- CÁC ĐƯỜNG MẠCH ĐIỆN TỬ NỐI TỪ BỆ ĐÀI RA 6 NODE --- */}
          <g stroke="#38BDF8" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
            {/* Mạch 1: Ra Node Top-Left (Cloud) */}
            <path d="M 195 245 L 165 215 L 135 215" strokeDasharray="4 2" />
            {/* Mạch 2: Ra Node Far-Left (Shield) */}
            <path d="M 140 265 L 95 265 L 50 252" />
            {/* Mạch 3: Ra Node Bottom-Left (CPU) */}
            <path d="M 185 298 L 140 325 L 95 325" />

            {/* Mạch 4: Ra Node Top-Right (Global IoT) */}
            <path d="M 325 245 L 355 215 L 385 215" strokeDasharray="4 2" />
            {/* Mạch 5: Ra Node Far-Right (Analytics) */}
            <path d="M 380 265 L 425 265 L 470 252" />
            {/* Mạch 6: Ra Node Bottom-Right (Rocket) */}
            <path d="M 335 298 L 380 325 L 425 325" />
          </g>

          {/* Các điểm nút hàn mạch điện phát sáng */}
          <g fill="#00F0FF" filter="url(#data-node-glow)">
            <circle cx="195" cy="245" r="2.5" />
            <circle cx="140" cy="265" r="2.5" />
            <circle cx="185" cy="298" r="2.5" />
            <circle cx="325" cy="245" r="2.5" />
            <circle cx="380" cy="265" r="2.5" />
            <circle cx="335" cy="298" r="2.5" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 1: TOP-LEFT - ĐIỆN TOÁN ĐÁM MÂY (Cloud Architecture)     */}
          {/* ------------------------------------------------------------- */}
          <g id="node-cloud" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="135" cy="225" rx="24" ry="8" fill="url(#data-node-base)" />
            <ellipse cx="135" cy="225" rx="18" ry="6" stroke="#38BDF8" strokeWidth="1.2" fill="none" filter="url(#data-node-glow)" />
            <g transform="translate(135, 202)">
              <circle cx="0" cy="0" r="14" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.5" filter="url(#data-node-glow)" />
              {/* Cloud Icon */}
              <path
                d="M -5 3 L 5 3 C 6.5 3 7.5 2 7.5 0.5 C 7.5 -1 6.5 -2 5 -2 C 4.8 -2 4.5 -2 4.3 -1.8 C 4 -3.8 2 -5 0 -5 C -1.8 -5 -3.3 -4 -3.8 -2.3 C -4.2 -2.5 -4.6 -2.5 -5 -2.5 C -6.7 -2.5 -8 -1.2 -8 0.5 C -8 2 -6.7 3 -5 3 Z"
                fill="#FFFFFF"
                stroke="#38BDF8"
                strokeWidth="0.8"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 2: FAR-LEFT - AN NINH MẠNG & KHIÊN BẢO MẬT (Cyber Shield)*/}
          {/* ------------------------------------------------------------- */}
          <g id="node-shield" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="50" cy="264" rx="26" ry="9" fill="url(#data-node-base)" />
            <ellipse cx="50" cy="264" rx="20" ry="7" stroke="#38BDF8" strokeWidth="1.4" fill="none" filter="url(#data-node-glow)" />
            <g transform="translate(50, 238)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.5" filter="url(#data-node-glow)" />
              {/* Shield Icon */}
              <path
                d="M 0 -8 L 6 -5 L 6 0 C 6 4.5 3.5 8 0 9.5 C -3.5 8 -6 4.5 -6 0 L -6 -5 Z"
                fill="#FFFFFF"
                stroke="#00F0FF"
                strokeWidth="0.8"
              />
              <path d="M -2 0 L -0.5 1.8 L 3 -2" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 3: BOTTOM-LEFT - VI XỬ LÝ TRÍ TUỆ NHÂN TẠO (AI Microchip) */}
          {/* ------------------------------------------------------------- */}
          <g id="node-cpu" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="95" cy="340" rx="26" ry="9" fill="url(#data-node-base)" />
            <ellipse cx="95" cy="340" rx="20" ry="7" stroke="#38BDF8" strokeWidth="1.4" fill="none" filter="url(#data-node-glow)" />
            <g transform="translate(95, 314)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.5" filter="url(#data-node-glow)" />
              {/* CPU Chip */}
              <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="0.8" />
              <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#0284C7" />
              {/* Chip Pins */}
              <line x1="-4" y1="-8" x2="-4" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="0" y1="-8" x2="0" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="4" y1="-8" x2="4" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="-4" y1="6" x2="-4" y2="8" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="0" y1="6" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="4" y1="6" x2="4" y2="8" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="-8" y1="-4" x2="-6" y2="-4" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="-8" y1="0" x2="-6" y2="0" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="-8" y1="4" x2="-6" y2="4" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="6" y1="-4" x2="8" y2="-4" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="6" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="6" y1="4" x2="8" y2="4" stroke="#FFFFFF" strokeWidth="1" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 4: TOP-RIGHT - MẠNG LƯỚI TOÀN CẦU (Global IoT Network)   */}
          {/* ------------------------------------------------------------- */}
          <g id="node-globe" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="385" cy="225" rx="24" ry="8" fill="url(#data-node-base)" />
            <ellipse cx="385" cy="225" rx="18" ry="6" stroke="#38BDF8" strokeWidth="1.2" fill="none" filter="url(#data-node-glow)" />
            <g transform="translate(385, 202)">
              <circle cx="0" cy="0" r="14" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.5" filter="url(#data-node-glow)" />
              {/* Globe Icon */}
              <circle cx="0" cy="0" r="7" stroke="#FFFFFF" strokeWidth="1" fill="none" />
              <ellipse cx="0" cy="0" rx="3.5" ry="7" stroke="#38BDF8" strokeWidth="0.8" fill="none" />
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#38BDF8" strokeWidth="0.8" />
              <line x1="-5.5" y1="-3.5" x2="5.5" y2="-3.5" stroke="#00F0FF" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <line x1="-5.5" y1="3.5" x2="5.5" y2="3.5" stroke="#00F0FF" strokeWidth="0.6" strokeDasharray="1.5 1" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 5: FAR-RIGHT - PHÂN TÍCH DỮ LIỆU (Smart Data Analytics)  */}
          {/* ------------------------------------------------------------- */}
          <g id="node-analytics" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="470" cy="264" rx="26" ry="9" fill="url(#data-node-base)" />
            <ellipse cx="470" cy="264" rx="20" ry="7" stroke="#38BDF8" strokeWidth="1.4" fill="none" filter="url(#data-node-glow)" />
            <g transform="translate(470, 238)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.5" filter="url(#data-node-glow)" />
              {/* Chart Bars */}
              <rect x="-6" y="-1" width="2.5" height="7" rx="0.5" fill="#38BDF8" />
              <rect x="-1.5" y="-5" width="2.5" height="11" rx="0.5" fill="#00F0FF" />
              <rect x="3" y="-8" width="2.5" height="14" rx="0.5" fill="#FFFFFF" />
              {/* Trend Arrow */}
              <path d="M -7 -2 L -1 -6 L 4 -10 L 7 -10 L 7 -7" stroke="#38BDF8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* NODE 6: BOTTOM-RIGHT - TĂNG TỐC SỐ HÓA (Digital Velocity)     */}
          {/* ------------------------------------------------------------- */}
          <g id="node-rocket" className="transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
            <ellipse cx="425" cy="340" rx="26" ry="9" fill="url(#data-node-base)" />
            <ellipse cx="425" cy="340" rx="20" ry="7" stroke="#38BDF8" strokeWidth="1.4" fill="none" filter="url(#data-node-glow)" />
            <g transform="translate(425, 314)">
              <circle cx="0" cy="0" r="15" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.5" filter="url(#data-node-glow)" />
              {/* Rocket Body */}
              <path
                d="M 5 -6 C 5 -6 4 1 0 4 C -1 5 -3 5 -4 5 L -5 4 C -5 3 -5 1 -4 0 C -1 -4 6 -5 6 -5 Z"
                fill="#FFFFFF"
                stroke="#00F0FF"
                strokeWidth="0.8"
              />
              {/* Fin */}
              <path d="M -3 3 L -6 4 L -4 1 Z" fill="#38BDF8" />
              <path d="M 3 -3 L 4 -6 L 1 -4 Z" fill="#38BDF8" />
              {/* Exhaust flame */}
              <path d="M -4.5 4.5 L -7 7 L -4.5 6 Z" fill="#0284C7" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. LÕI CÔNG NGHỆ LƯỢNG TỬ 3D (3D QUANTUM TECH TESSERACT & ATOMIC ORBITS)  */}
        {/* ========================================================================= */}
        <g id="quantum-tesseract-core" className="filter drop-shadow-[0_0_26px_rgba(56,189,248,0.7)]">
          
          {/* Vầng hào quang lượng tử bao quanh */}
          <circle cx="260" cy="120" r="95" fill="#38BDF8" opacity="0.08" filter="url(#data-core-flare)" />

          {/* VÒNG QUỸ ĐẠO NGUYÊN TỬ 1 (Atomic Orbit Ring 1 - Xoay 16s) */}
          <g transform="translate(260, 120)">
            <ellipse
              cx="0"
              cy="0"
              rx="64"
              ry="26"
              stroke="#00F0FF"
              strokeWidth="1.5"
              strokeDasharray="16 8 4 8"
              fill="none"
              opacity="0.8"
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
            {/* Hạt electron lượng tử chạy trên quỹ đạo */}
            <g transform="rotate(-28)">
              <circle cx="64" cy="0" r="3.2" fill="#FFFFFF" filter="url(#data-node-glow)">
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

          {/* VÒNG QUỸ ĐẠO NGUYÊN TỬ 2 (Atomic Orbit Ring 2 - Xoay ngược 14s) */}
          <g transform="translate(260, 120)">
            <ellipse
              cx="0"
              cy="0"
              rx="64"
              ry="26"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="20 6"
              fill="none"
              opacity="0.8"
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
            {/* Hạt electron thứ hai */}
            <g transform="rotate(42)">
              <circle cx="-64" cy="0" r="3" fill="#00F0FF" filter="url(#data-node-glow)">
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

          {/* KHỐI LẬP PHƯƠNG LƯỢNG TỬ 3D ISOMETRIC (Isometric 3D Quantum Cube) */}
          <g transform="translate(260, 120)">
            
            {/* KHỐI NGOÀI (Outer Wireframe Cube) */}
            <g className="transition-transform duration-700">
              {/* Mặt trên (Top Face) */}
              <polygon
                points="0,-48 42,-24 0,0 -42,-24"
                fill="url(#quantum-cube-grad)"
                fillOpacity="0.35"
                stroke="url(#quantum-stroke-grad)"
                strokeWidth="1.8"
                filter="url(#data-core-glow)"
              />
              {/* Mặt trái (Left Face) */}
              <polygon
                points="-42,-24 0,0 0,48 -42,24"
                fill="#0284C7"
                fillOpacity="0.25"
                stroke="url(#quantum-stroke-grad)"
                strokeWidth="1.8"
                filter="url(#data-core-glow)"
              />
              {/* Mặt phải (Right Face) */}
              <polygon
                points="0,0 42,-24 42,24 0,48"
                fill="#0369A1"
                fillOpacity="0.45"
                stroke="url(#quantum-stroke-grad)"
                strokeWidth="1.8"
                filter="url(#data-core-glow)"
              />

              {/* Các đường vân dữ liệu bên trong mặt phẳng */}
              <line x1="0" y1="-24" x2="21" y2="-12" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
              <line x1="0" y1="-24" x2="-21" y2="-12" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
              <line x1="0" y1="24" x2="21" y2="12" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
              <line x1="0" y1="24" x2="-21" y2="12" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />

              {/* KHỐI LẬP PHƯƠNG NỘI TẠI (Inner Nested Quantum Tesseract Core) */}
              <polygon
                points="0,-24 21,-12 0,0 -21,-12"
                fill="#00F0FF"
                fillOpacity="0.5"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              <polygon
                points="-21,-12 0,0 0,24 -21,12"
                fill="#38BDF8"
                fillOpacity="0.4"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              <polygon
                points="0,0 21,-12 21,12 0,24"
                fill="#0284C7"
                fillOpacity="0.6"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />

              {/* LÕI NĂNG LƯỢNG TRUNG TÂM PHÁT QUANG SIÊU SÁNG (Hyper-Glow Core Sphere) */}
              <circle cx="0" cy="0" r="10" fill="#FFFFFF" filter="url(#data-core-flare)" />
              <circle cx="0" cy="0" r="5" fill="#00F0FF" />

              {/* Hiệu ứng nhấp nháy lơ lửng bồng bềnh */}
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
