import React from 'react';

/**
 * ⚙️ GRAND KINETIC GEAR ECOSYSTEM & AUTOMATION HUB (RIGHT HERO COMPONENT)
 * 
 * Thiết kế Đẳng cấp & Ấn tượng 2026 (Stripe & Linear Enterprise Ecosystem Visual):
 * - Điểm nhấn uy lực trung tâm: Cụm 3 Bánh răng Haute Horlogerie 3D bề thế, bóng bẩy với đường phản quang ánh sáng lướt qua.
 * - Vầng hào quang năng lượng thương hiệu (Brand Energy Halo): Giao thoa mềm mại giữa Xanh Coban sâu (#0284C7) và Cam Hổ Phách (#F15A24).
 * - Hệ thống Thẻ Kính Mờ Động học (Floating Glass Telemetry Cards):
 *   + Card 1: ⚡ Tự Động Hóa (100% SOP SOP Flow)
 *   + Card 2: 🔄 Đồng Bộ Tức Thì (Zero Latency)
 *   + Card 3: 👥 20 Nhân Sự Lõi (Hiệp Đồng Tác Chiến)
 * - Đường dẫn truyền hạt photon năng lượng (Energy Conduit Stream) kết nối cỗ máy và các vệ tinh dữ liệu.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng vi cơ khí 12 răng chuẩn kỹ thuật (Pitch R = 38, Outer R = 43, Root R = 33, Hole R = 17)
  const masterGearPath = 
    "M 33.00 0.00 L 32.78 3.79 L 42.28 7.84 L 40.54 14.37 L 30.29 13.10 " +
    "L 28.58 16.50 L 26.49 19.68 L 32.73 27.20 L 27.20 32.73 L 19.68 26.49 " +
    "L 16.50 28.58 L 13.10 30.29 L 14.37 40.54 L 7.84 42.28 L 3.79 32.78 " +
    "L 0.00 33.00 L -3.79 32.78 L -7.84 42.28 L -14.37 40.54 L -13.10 30.29 " +
    "L -16.50 28.58 L -19.68 26.49 L -27.20 32.73 L -32.73 27.20 L -26.49 19.68 " +
    "L -28.58 16.50 L -30.29 13.10 L -40.54 14.37 L -42.28 7.84 L -32.78 3.79 " +
    "L -33.00 0.00 L -32.78 -3.79 L -42.28 -7.84 L -40.54 -14.37 L -30.29 -13.10 " +
    "L -28.58 -16.50 L -26.49 -19.68 L -32.73 -27.20 L -27.20 -32.73 L -19.68 -26.49 " +
    "L -16.50 -28.58 L -13.10 -30.29 L -14.37 -40.54 L -7.84 -42.28 L -3.79 -32.78 " +
    "L -0.00 -33.00 L 3.79 -32.78 L 7.84 -42.28 L 14.37 -40.54 L 13.10 -30.29 " +
    "L 16.50 -28.58 L 19.68 -26.49 L 27.20 -32.73 L 32.73 -27.20 L 26.49 -19.68 " +
    "L 28.58 -16.50 L 30.29 -13.10 L 40.54 -14.37 L 42.28 -7.84 L 32.78 -3.79 Z " +
    "M 17 0 A 17 17 0 1 0 -17 0 A 17 17 0 1 0 17 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 450 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 VẦNG HÀO QUANG NĂNG LƯỢNG THƯƠNG HIỆU RỰC RỠ (BRAND ENERGY HALO) */}
          <radialGradient id="hub-ambient-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.16" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Gradient Bánh Răng Vàng Hổ Phách & Vàng Hồng Hoàng Gia (Top Master Gear) */}
          <linearGradient id="gear-royal-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Gradient Bánh Răng Lam Ngọc & Bạch Kim Cao Cấp (Bottom Precision Gears) */}
          <linearGradient id="gear-sapphire-titanium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#E0F2FE" />
            <stop offset="55%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Lớp dày 3D Extrusion đổ bóng sang trọng */}
          <linearGradient id="gear-depth-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.75" />
          </linearGradient>

          {/* Viền vát kim cương phản quang ánh sáng trắng rực rỡ */}
          <linearGradient id="gear-specular-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
          </linearGradient>

          {/* Chân kính Ruby đính tâm */}
          <radialGradient id="ruby-jewel-glow" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="40%" stopColor="#F43F5E" />
            <stop offset="80%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Gradient Thẻ Kính Mờ (Glassmorphic Card Background) */}
          <linearGradient id="glass-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.82" />
          </linearGradient>

          <linearGradient id="glass-card-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>

          {/* Bộ lọc bóng đổ cao cấp cho các thẻ và cỗ máy */}
          <filter id="hub-master-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.12" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.15" />
          </filter>

          <filter id="card-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
        </defs>

        <style>{`
          @keyframes kinetic-sculpture-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes card-hover-1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes card-hover-2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(4px); }
          }
          @keyframes pulse-energy-halo {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.06); opacity: 1; }
          }
          @keyframes beam-dash-flow {
            0% { stroke-dashoffset: 60; }
            100% { stroke-dashoffset: 0; }
          }
          .anim-sculpture { animation: kinetic-sculpture-float 6s ease-in-out infinite; }
          .anim-card-1 { animation: card-hover-1 5s ease-in-out infinite 0.3s; }
          .anim-card-2 { animation: card-hover-2 5.5s ease-in-out infinite 0.7s; }
          .anim-card-3 { animation: card-hover-1 4.8s ease-in-out infinite 1.1s; }
          .anim-halo-pulse { animation: pulse-energy-halo 4s ease-in-out infinite; transform-origin: 225px 150px; }
          .anim-energy-beam { stroke-dasharray: 6 4; animation: beam-dash-flow 2s linear infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: VẦNG HÀO QUANG NĂNG LƯỢNG RỰC RỠ TẠO CHIỀU SÂU BỨT PHÁ           */}
        {/* ========================================================================= */}
        <g id="energy-environment" transform="translate(225, 145)">
          {/* Hào quang trung tâm mở rộng toàn cụm */}
          <ellipse cx="0" cy="0" rx="160" ry="95" fill="url(#hub-ambient-glow)" className="anim-halo-pulse" />
          
          {/* Các vòng sóng vi lượng tử công nghệ cao */}
          <ellipse cx="0" cy="0" rx="130" ry="60" stroke="#0284C7" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="95" ry="42" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC ĐƯỜNG DẪN TRUYỀN NĂNG LƯỢNG PHOTON (ENERGY CONDUIT BEAMS)     */}
        {/* ========================================================================= */}
        <g id="conduit-streams">
          {/* Dẫn truyền tới Card 1 (Top-Left: 85, 55) */}
          <path
            d="M 185 105 C 150 90, 115 75, 85 55"
            stroke="#38BDF8"
            strokeWidth="1.4"
            fill="none"
            className="anim-energy-beam opacity-60"
          />
          <circle cx="85" cy="55" r="2.5" fill="#38BDF8" />

          {/* Dẫn truyền tới Card 2 (Bottom-Left: 80, 240) */}
          <path
            d="M 175 180 C 140 210, 110 225, 80 240"
            stroke="#0284C7"
            strokeWidth="1.4"
            fill="none"
            className="anim-energy-beam opacity-60"
          />
          <circle cx="80" cy="240" r="2.5" fill="#0284C7" />

          {/* Dẫn truyền tới Card 3 (Right: 375, 145) */}
          <path
            d="M 280 150 C 315 150, 345 145, 375 145"
            stroke="#F59E0B"
            strokeWidth="1.4"
            fill="none"
            className="anim-energy-beam opacity-60"
          />
          <circle cx="375" cy="145" r="2.5" fill="#F59E0B" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: CỖ MÁY 3 BÁNH RĂNG ĐỘNG LỰC HỌC TRUNG TÂM (GRAND KINETIC ENGINE)  */}
        {/* ========================================================================= */}
        <g className="anim-sculpture" filter="url(#hub-master-shadow)">
          
          {/* VÒNG ĐAI CON QUAY QUỸ ĐẠO BẠCH KIM BẢO VỆ CỖ MÁY */}
          <g transform="translate(225, 145) rotate(-16)">
            <ellipse
              cx="0"
              cy="0"
              rx="98"
              ry="38"
              stroke="#0284C7"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="45 15 25 15"
              opacity="0.45"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="96"
              ry="36"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.75"
            />
            <circle cx="98" cy="0" r="2.5" fill="#F59E0B" />
            <circle cx="-98" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG HỔ PHÁCH HOÀNG GIA (MASTER GEAR) */}
          {/* Tâm: (225, 105) - 12 răng - Xoay thuận (+360°) trong 15s       */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(225, 105)">
            <g>
              {/* Lớp dày 3D Extrusion 3px sắc sảo */}
              <g transform="translate(0, 3.2)">
                <path d={masterGearPath} fill="url(#gear-depth-bevel)" fillRule="evenodd" />
              </g>

              {/* Mặt Bánh Răng Vàng Hổ Phách sang trọng */}
              <path
                d={masterGearPath}
                fill="url(#gear-royal-amber)"
                stroke="#C2410C"
                strokeWidth="1"
                fillRule="evenodd"
              />

              {/* Gờ vát kim cương phản quang ánh sáng trắng viền ngoài */}
              <circle cx="0" cy="0" r="26" stroke="url(#gear-specular-sheen)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="24.5" stroke="#7C2D12" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              {/* 4 Nan hoa rãnh phay CNC tinh xảo */}
              <line x1="-17" y1="0" x2="-26" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="17" y1="0" x2="26" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-17" x2="0" y2="-26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="17" x2="0" y2="26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />

              {/* Trục xoay chân kính Ruby đỏ rực rỡ */}
              <circle cx="0" cy="0" r="7.5" fill="#451A03" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="0" cy="0" r="5" fill="url(#ruby-jewel-glow)" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.6" cy="-1.6" r="1.4" fill="#FFFFFF" opacity="0.95" />

              {/* Xoay 60fps mượt mà thuận chiều kim đồng hồ */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI TRÁI - LAM NGỌC TITAN (LEFT PRECISION GEAR) */}
          {/* Tâm: (171, 159) - 12 răng - Xoay ngược (-360°) 15s, pha -15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(171, 159)">
            <g>
              <g transform="translate(0, 3.2)">
                <path d={masterGearPath} fill="url(#gear-depth-bevel)" fillRule="evenodd" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-titanium)"
                stroke="#0369A1"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="26" stroke="url(#gear-specular-sheen)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="24.5" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-17" y1="0" x2="-26" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="17" y1="0" x2="26" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-17" x2="0" y2="-26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="17" x2="0" y2="26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />

              {/* Nắp trục Titan nung xanh Coban */}
              <circle cx="0" cy="0" r="7.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.6" cy="-1.6" r="1.4" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-15 0 0"
                to="-375 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI PHẢI - LAM NGỌC TITAN (RIGHT PRECISION GEAR)*/}
          {/* Tâm: (279, 159) - 12 răng - Xoay ngược (-360°) 15s, pha +15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(279, 159)">
            <g>
              <g transform="translate(0, 3.2)">
                <path d={masterGearPath} fill="url(#gear-depth-bevel)" fillRule="evenodd" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-titanium)"
                stroke="#0369A1"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="26" stroke="url(#gear-specular-sheen)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="24.5" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-17" y1="0" x2="-26" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="17" y1="0" x2="26" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-17" x2="0" y2="-26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="17" x2="0" y2="26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="7.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.6" cy="-1.6" r="1.4" fill="#FFFFFF" opacity="0.95" />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="15 0 0"
                to="-345 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 4: HỆ THỐNG THẺ KÍNH MỜ CÔNG NGHỆ CAO (FLOATING TELEMETRY CARDS)     */}
        {/* ========================================================================= */}
        <g id="telemetry-badges">
          
          {/* ⚡ CARD 1: TỰ ĐỘNG HÓA (TOP-LEFT: X=20, Y=35) */}
          <g className="anim-card-1" transform="translate(20, 35)" filter="url(#card-soft-shadow)">
            <rect
              x="0"
              y="0"
              width="132"
              height="44"
              rx="10"
              fill="url(#glass-card-bg)"
              stroke="url(#glass-card-border)"
              strokeWidth="1.2"
            />
            {/* Icon Huy hiệu phát sáng */}
            <rect x="8" y="9" width="26" height="26" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
            <path d="M21 15l-4 8h5l-1 6 5-8h-5l1-6z" fill="#16A34A" />
            {/* Nhãn & Giá trị */}
            <text x="40" y="21" fill="#0F172A" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Tự Động Hóa</text>
            <text x="40" y="34" fill="#16A34A" fontSize="9" fontWeight="600" fontFamily="sans-serif">● 100% SOP Flow</text>
          </g>

          {/* 👥 CARD 2: 20 NHÂN SỰ LÕI (BOTTOM-LEFT: X=20, Y=225) */}
          <g className="anim-card-2" transform="translate(20, 225)" filter="url(#card-soft-shadow)">
            <rect
              x="0"
              y="0"
              width="138"
              height="44"
              rx="10"
              fill="url(#glass-card-bg)"
              stroke="url(#glass-card-border)"
              strokeWidth="1.2"
            />
            <rect x="8" y="9" width="26" height="26" rx="6" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" />
            {/* Icon Người / Team */}
            <circle cx="21" cy="18" r="3.2" fill="#0284C7" />
            <path d="M15 29v-1a3 3 0 0 1 6 0v1" fill="#0284C7" />
            <circle cx="27" cy="19" r="2.2" fill="#38BDF8" />
            <path d="M26 29v-1a2 2 0 0 1 3 0v1" fill="#38BDF8" />
            <text x="40" y="21" fill="#0F172A" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">20 Nhân Sự Lõi</text>
            <text x="40" y="34" fill="#0284C7" fontSize="9" fontWeight="600" fontFamily="sans-serif">Hiệp Đồng Tác Chiến</text>
          </g>

          {/* 🚀 CARD 3: VẬN HÀNH TỐC ĐỘ (RIGHT: X=325, Y=125) */}
          <g className="anim-card-3" transform="translate(325, 125)" filter="url(#card-soft-shadow)">
            <rect
              x="0"
              y="0"
              width="118"
              height="44"
              rx="10"
              fill="url(#glass-card-bg)"
              stroke="url(#glass-card-border)"
              strokeWidth="1.2"
            />
            <rect x="8" y="9" width="26" height="26" rx="6" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />
            {/* Icon Gauge / Rocket */}
            <path d="M21 16a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 3v3l2 2" stroke="#EA580C" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <text x="40" y="21" fill="#0F172A" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Vận Hành Tức Thì</text>
            <text x="40" y="34" fill="#EA580C" fontSize="9" fontWeight="600" fontFamily="sans-serif">Tốc Độ & Giá Tối Ưu</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
