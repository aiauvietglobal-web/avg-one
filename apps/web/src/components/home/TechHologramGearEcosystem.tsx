import React from 'react';

/**
 * ⚙️ DIMENSIONAL PORTAL: KINETIC GEAR ECOSYSTEM (RIGHT HERO COMPONENT)
 * 
 * Hiệu ứng Chiều Sâu 3D "Đục Thủng Lớp Nền" (Sunken 3D Engine Chamber / Dimensional Portal):
 * - Mặt nền phẳng của trang web được "đục thủng" bằng một giếng công nghệ bo góc 3D sâu hun hút (Sunken Perspective Chamber).
 * - Cạnh vát 3D (Recessed Inner Bevel) với đổ bóng đa tầng tạo cảm giác khoét sâu vào không gian phần cứng bên dưới.
 * - Đáy giếng là khoang công nghệ vũ trụ sâu thẳm (Deep Obsidian Navy #061325) với lưới phối cảnh 3D và vầng hào quang bừng sáng.
 * - Bên trong buồng máy: Cụm 3 Bánh răng vi cơ khí 12 răng 3D Haute Horlogerie xoay ăn khớp 60fps mượt mà, đính chân kính Ruby rực sáng.
 * - Lớp kính tinh thể bảo vệ bên trên với vệt quét ánh sáng quang học (Diagonal Glass Gleam) và các ký hiệu vi cơ khí góc [ + ].
 * - 3 Thẻ Kính Mờ Telemetry tích hợp vi mạch nổi nhẹ trên miệng giếng.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng vi cơ khí 12 răng chuẩn kỹ thuật (Pitch R = 36, Outer R = 41, Root R = 31.5, Hole R = 16)
  const masterGearPath = 
    "M 31.50 0.00 L 31.29 3.62 L 39.82 7.38 L 38.18 13.52 L 28.91 12.51 " +
    "L 27.28 15.75 L 25.29 18.78 L 30.80 26.30 L 26.30 30.80 L 18.78 25.29 " +
    "L 15.75 27.28 L 12.51 28.91 L 13.52 38.18 L 7.38 39.82 L 3.62 31.29 " +
    "L 0.00 31.50 L -3.62 31.29 L -7.38 39.82 L -13.52 38.18 L -12.51 28.91 " +
    "L -15.75 27.28 L -18.78 25.29 L -26.30 30.80 L -30.80 26.30 L -25.29 18.78 " +
    "L -27.28 15.75 L -28.91 12.51 L -38.18 13.52 L -39.82 7.38 L -31.29 3.62 " +
    "L -31.50 0.00 L -31.29 -3.62 L -39.82 -7.38 L -38.18 -13.52 L -28.91 -12.51 " +
    "L -27.28 -15.75 L -25.29 -18.78 L -30.80 -26.30 L -26.30 -30.80 L -18.78 -25.29 " +
    "L -15.75 -27.28 L -12.51 -28.91 L -13.52 -38.18 L -7.38 -39.82 L -3.62 -31.29 " +
    "L -0.00 -31.50 L 3.62 -31.29 L 7.38 -39.82 L 13.52 -38.18 L 12.51 -28.91 " +
    "L 15.75 -27.28 L 18.78 -25.29 L 26.30 -30.80 L 30.80 -26.30 L 25.29 -18.78 " +
    "L 27.28 -15.75 L 28.91 -12.51 L 38.18 -13.52 L 39.82 -7.38 L 31.29 -3.62 Z " +
    "M 16 0 A 16 16 0 1 0 -16 0 A 16 16 0 1 0 16 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ THỐNG GRADIENTS CHIỀU SÂU "ĐỤC THỦNG NỀN" (SUNKEN 3D CAVITY) 🌟 */}
          
          {/* Đáy giếng sâu: Không gian Obsidian Navy sâu thẳm */}
          <radialGradient id="portal-cavity-floor" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="45%" stopColor="#06152B" />
            <stop offset="85%" stopColor="#030B17" />
            <stop offset="100%" stopColor="#01050A" />
          </radialGradient>

          {/* Vầng hào quang nội tại bừng sáng từ tâm đáy giếng */}
          <radialGradient id="portal-core-burst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Cạnh vát bóng đổ trên (Top Recessed Shadow Wall) - Tạo chiều sâu khoét lõm */}
          <linearGradient id="portal-top-bevel" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </linearGradient>

          {/* Cạnh vát phản quang dưới (Bottom Recessed Specular Wall) */}
          <linearGradient id="portal-bottom-bevel" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </linearGradient>

          {/* Viền ngoài miệng giếng trên mặt nền phẳng (Outer Bezel Lip) */}
          <linearGradient id="portal-outer-lip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#E2E8F0" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Vệt quét ánh sáng mặt kính bảo vệ (Diagonal Glass Gleam) */}
          <linearGradient id="portal-glass-gleam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>

          {/* Gradient Bánh Răng Vàng Hổ Phách & Vàng Hồng Hoàng Gia */}
          <linearGradient id="gear-royal-amber-portal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Gradient Bánh Răng Lam Ngọc & Bạch Kim Cao Cấp */}
          <linearGradient id="gear-sapphire-titanium-portal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#E0F2FE" />
            <stop offset="55%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Vát kim cương phản quang ánh sáng trắng rực rỡ */}
          <linearGradient id="gear-specular-edge-portal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
          </linearGradient>

          {/* Chân kính Ruby đính tâm */}
          <radialGradient id="ruby-jewel-glow-portal" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="40%" stopColor="#F43F5E" />
            <stop offset="80%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Gradient Thẻ Kính Mờ Telemetry */}
          <linearGradient id="glass-badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.88" />
          </linearGradient>

          <linearGradient id="glass-badge-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
          </linearGradient>

          {/* Bộ lọc bóng đổ chiều sâu khoang giếng */}
          <filter id="portal-inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.25" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0284C7" floodOpacity="0.2" />
          </filter>

          <filter id="gear-cluster-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.3" />
          </filter>

          <filter id="badge-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
          </filter>
        </defs>

        <style>{`
          @keyframes portal-gear-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes portal-energy-pulse {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.08); opacity: 1; }
          }
          @keyframes beam-dash-flow-portal {
            0% { stroke-dashoffset: 40; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes glass-sheen-sweep {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .anim-portal-gears { animation: portal-gear-float 6s ease-in-out infinite; }
          .anim-portal-energy { animation: portal-energy-pulse 4s ease-in-out infinite; transform-origin: 220px 140px; }
          .anim-portal-stream { stroke-dasharray: 5 3; animation: beam-dash-flow-portal 1.5s linear infinite; }
          .anim-sheen { animation: glass-sheen-sweep 5s ease-in-out infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: "ĐỤC THỦNG LỚP NỀN" - GIẾNG CÔNG NGHỆ 3D SÂU HUN HÚT (SUNKEN WELL) */}
        {/* ========================================================================= */}
        <g id="sunken-dimensional-portal">
          
          {/* 1.1 Khối Đáy Giếng Sâu (Chamber Floor) */}
          <rect
            x="14"
            y="14"
            width="412"
            height="252"
            rx="20"
            fill="url(#portal-cavity-floor)"
            filter="url(#portal-inner-shadow)"
          />

          {/* 1.2 Lưới Phối Cảnh Chiều Sâu 3D ở Đáy Giếng (Perspective Grid in Depth) */}
          <g opacity="0.22">
            {/* Các đường lưới dọc hội tụ nhẹ */}
            <line x1="60" y1="20" x2="40" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="120" y1="20" x2="110" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="180" y1="20" x2="180" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="240" y1="20" x2="240" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="300" y1="20" x2="310" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="360" y1="20" x2="380" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            {/* Các đường lưới ngang */}
            <line x1="20" y1="70" x2="420" y2="70" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="20" y1="140" x2="420" y2="140" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="20" y1="210" x2="420" y2="210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
          </g>

          {/* 1.3 Vầng hào quang năng lượng từ tâm đáy giếng chiếu rọi */}
          <g transform="translate(220, 140)">
            <ellipse cx="0" cy="0" rx="140" ry="85" fill="url(#portal-core-burst)" className="anim-portal-energy" />
          </g>

          {/* 1.4 Thành Vát 3D Khoét Sâu (Recessed Bevel Walls - Tạo cảm giác khoét thủng) */}
          {/* Vách trên đổ bóng sâu */}
          <rect x="14" y="14" width="412" height="40" rx="20" fill="url(#portal-top-bevel)" />
          {/* Vách dưới phản quang viền miệng */}
          <rect x="14" y="226" width="412" height="40" rx="20" fill="url(#portal-bottom-bevel)" />

          {/* 1.5 Vành Miệng Giếng Vát Kim Cương Ngoài Cùng (Outer Beveled Frame Lip) */}
          <rect
            x="14"
            y="14"
            width="412"
            height="252"
            rx="20"
            stroke="url(#portal-outer-lip)"
            strokeWidth="1.6"
            fill="none"
          />
          <rect
            x="16"
            y="16"
            width="408"
            height="248"
            rx="18"
            stroke="#0284C7"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            opacity="0.35"
            fill="none"
          />

          {/* Ký hiệu vi cơ khí đo đạc 4 góc miệng giếng [ + ] */}
          <g stroke="#38BDF8" strokeWidth="1.2" opacity="0.65">
            {/* Top-Left */}
            <line x1="28" y1="24" x2="28" y2="34" />
            <line x1="23" y1="29" x2="33" y2="29" />
            <text x="38" y="32" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">CHAMBER_02 // KINETIC_OPS</text>

            {/* Bottom-Right */}
            <line x1="412" y1="246" x2="412" y2="256" />
            <line x1="407" y1="251" x2="417" y2="251" />
            <text x="305" y="254" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">STATUS: 60FPS LIVE</text>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC ĐƯỜNG DẪN TRUYỀN NĂNG LƯỢNG NỘI TẠI DƯỚI ĐÁY GIẾNG           */}
        {/* ========================================================================= */}
        <g id="portal-conduit-streams">
          {/* Nhánh dẫn tới Card 1 (Top-Left) */}
          <path
            d="M 180 100 C 140 85, 100 70, 70 52"
            stroke="#38BDF8"
            strokeWidth="1.4"
            fill="none"
            className="anim-portal-stream opacity-70"
          />
          <circle cx="70" cy="52" r="2" fill="#38BDF8" />

          {/* Nhánh dẫn tới Card 2 (Bottom-Left) */}
          <path
            d="M 170 170 C 130 200, 95 215, 65 228"
            stroke="#0284C7"
            strokeWidth="1.4"
            fill="none"
            className="anim-portal-stream opacity-70"
          />
          <circle cx="65" cy="228" r="2" fill="#0284C7" />

          {/* Nhánh dẫn tới Card 3 (Right) */}
          <path
            d="M 270 140 C 310 140, 335 135, 360 135"
            stroke="#F59E0B"
            strokeWidth="1.4"
            fill="none"
            className="anim-portal-stream opacity-70"
          />
          <circle cx="360" cy="135" r="2" fill="#F59E0B" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: CỖ MÁY 3 BÁNH RĂNG VI CƠ KHÍ XOAY TRONG BUỒNG SÂU (CHAMBER ACTOR) */}
        {/* ========================================================================= */}
        <g className="anim-portal-gears" filter="url(#gear-cluster-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO BẠCH KIM BẢO VỆ CỖ MÁY TRONG BUỒNG */}
          <g transform="translate(220, 140) rotate(-16)">
            <ellipse
              cx="0"
              cy="0"
              rx="92"
              ry="36"
              stroke="#0284C7"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="40 15 20 15"
              opacity="0.6"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="90"
              ry="34.5"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.85"
            />
            <circle cx="92" cy="0" r="2.5" fill="#F59E0B" />
            <circle cx="-92" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG HỔ PHÁCH HOÀNG GIA (MASTER GEAR) */}
          {/* Tâm: (220, 102) - 12 răng - Xoay thuận (+360°) trong 15s       */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(220, 102)">
            <g>
              {/* Lớp dày 3D Extrusion sắc nét */}
              <g transform="translate(0, 3.5)">
                <path d={masterGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
              </g>

              {/* Mặt Bánh Răng Vàng Hổ Phách rực rỡ */}
              <path
                d={masterGearPath}
                fill="url(#gear-royal-amber-portal)"
                stroke="#F59E0B"
                strokeWidth="1"
                fillRule="evenodd"
              />

              {/* Gờ vát kim cương phản quang ánh sáng trắng viền ngoài */}
              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-edge-portal)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#7C2D12" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              {/* 4 Nan hoa rãnh phay CNC tinh xảo */}
              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              {/* Trục xoay chân kính Ruby đỏ rực rỡ */}
              <circle cx="0" cy="0" r="7" fill="#451A03" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="url(#ruby-jewel-glow-portal)" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

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
          {/* Tâm: (169, 153) - 12 răng - Xoay ngược (-360°) 15s, pha -15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(169, 153)">
            <g>
              <g transform="translate(0, 3.5)">
                <path d={masterGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-titanium-portal)"
                stroke="#0284C7"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-edge-portal)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              {/* Nắp trục Titan nung xanh Coban */}
              <circle cx="0" cy="0" r="7" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

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
          {/* Tâm: (271, 153) - 12 răng - Xoay ngược (-360°) 15s, pha +15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(271, 153)">
            <g>
              <g transform="translate(0, 3.5)">
                <path d={masterGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-titanium-portal)"
                stroke="#0284C7"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-edge-portal)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="7" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

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
        {/* TẦNG 4: MẶT KÍNH TINH THỂ PHẢN QUANG (CRYSTAL COVER GLASS SHEEN)          */}
        {/* ========================================================================= */}
        <rect
          x="14"
          y="14"
          width="412"
          height="252"
          rx="20"
          fill="url(#portal-glass-gleam)"
          className="anim-sheen pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* TẦNG 5: HỆ THỐNG THẺ KÍNH MỜ TELEMETRY NỔI NHẸ TRÊN MIỆNG GIẾNG (CARDS)   */}
        {/* ========================================================================= */}
        <g id="portal-telemetry-cards">
          
          {/* ⚡ CARD 1: TỰ ĐỘNG HÓA (TOP-LEFT: X=24, Y=24) */}
          <g transform="translate(24, 24)" filter="url(#badge-depth-shadow)">
            <rect
              x="0"
              y="0"
              width="122"
              height="38"
              rx="8"
              fill="url(#glass-badge-bg)"
              stroke="url(#glass-badge-border)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="0.8" />
            <path d="M18 13l-3 7h4l-1 5 4-7h-4l1-5z" fill="#16A34A" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Tự Động Hóa</text>
            <text x="34" y="30" fill="#16A34A" fontSize="8" fontWeight="600" fontFamily="sans-serif">● 100% SOP Flow</text>
          </g>

          {/* 👥 CARD 2: 20 NHÂN SỰ LÕI (BOTTOM-LEFT: X=24, Y=218) */}
          <g transform="translate(24, 218)" filter="url(#badge-depth-shadow)">
            <rect
              x="0"
              y="0"
              width="128"
              height="38"
              rx="8"
              fill="url(#glass-badge-bg)"
              stroke="url(#glass-badge-border)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="0.8" />
            <circle cx="18" cy="16" r="2.8" fill="#0284C7" />
            <path d="M13 25v-1a2.5 2.5 0 0 1 5 0v1" fill="#0284C7" />
            <circle cx="23" cy="17" r="1.8" fill="#38BDF8" />
            <path d="M22 25v-1a1.8 1.8 0 0 1 2.5 0v1" fill="#38BDF8" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">20 Nhân Sự Lõi</text>
            <text x="34" y="30" fill="#0284C7" fontSize="8" fontWeight="600" fontFamily="sans-serif">Hiệp Đồng Tác Chiến</text>
          </g>

          {/* 🚀 CARD 3: VẬN HÀNH TỐC ĐỘ (RIGHT: X=310, Y=121) */}
          <g transform="translate(310, 121)" filter="url(#badge-depth-shadow)">
            <rect
              x="0"
              y="0"
              width="114"
              height="38"
              rx="8"
              fill="url(#glass-badge-bg)"
              stroke="url(#glass-badge-border)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
            <path d="M18 14a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2.5v2.5l1.8 1.8" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Vận Hành Tức Thì</text>
            <text x="34" y="30" fill="#EA580C" fontSize="8" fontWeight="600" fontFamily="sans-serif">Tốc Độ & Giá Tối Ưu</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
