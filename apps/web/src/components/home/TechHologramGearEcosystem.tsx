import React from 'react';

/**
 * ⚙️ 1000R CURVED OLED DISPLAY: KINETIC GEAR ECOSYSTEM (RIGHT HERO COMPONENT)
 * 
 * Thiết kế Màn Hình Cong Công Nghệ Cao 1000R (Ultra-wide Curved Cockpit HUD Display):
 * - Khung màn hình cong vật lý (Curved OLED Bezel) với độ cong 1000R ôm trọn góc nhìn về phía trung tâm.
 * - Mặt kính cong phản chiếu quang học (Cylindrical Glass Caustics & Reflection Arcs).
 * - Lưới hiển thị không gian mạng uốn lượn theo độ cong hình trụ (Curved Perspective Cyber Grid).
 * - Buồng máy cơ học chiều sâu: Cụm 3 Bánh răng Haute Horlogerie 3D vận hành rực sáng bên trong màn hình cong.
 * - Các thanh trạng thái hiển thị chuẩn màn hình chuyên dụng: 1000R CURVED DISPLAY • 120Hz OLED HDR.
 * - 3 Thẻ Kính Mờ Telemetry uốn nhẹ theo độ cong của màn hình.
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

  // Khung màn hình cong 1000R chuẩn xác (Hình trụ uốn cong đều)
  const curvedScreenOutline = 
    "M 26 22 Q 220 38 414 22 A 16 16 0 0 1 426 38 L 426 242 A 16 16 0 0 1 414 258 Q 220 274 26 258 A 16 16 0 0 1 14 242 L 14 38 A 16 16 0 0 1 26 22 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ THỐNG GRADIENT MÀN HÌNH CONG 1000R CHUYÊN DỤNG 🌟 */}
          
          {/* Mặt nền OLED cong: Tối sâu thẳm ở trung tâm, chuyển sắc cobalt ở hai biên */}
          <radialGradient id="curved-oled-surface" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#08203E" />
            <stop offset="45%" stopColor="#051326" />
            <stop offset="80%" stopColor="#020813" />
            <stop offset="100%" stopColor="#010408" />
          </radialGradient>

          {/* Vầng sáng năng lượng rực rỡ bên trong màn hình cong */}
          <radialGradient id="curved-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Khung viền kim loại màn hình cong (Titanium Curved Chassis Bezel) */}
          <linearGradient id="curved-chassis-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="75%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Viền phát quang Neon Cyan chạy quanh mép màn hình cong */}
          <linearGradient id="curved-neon-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Vệt phản quang ánh sáng cong uốn lượn qua mặt kính (Cylindrical Glass Sheen) */}
          <linearGradient id="curved-glass-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.02" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.16" />
          </linearGradient>

          {/* Bánh răng Vàng Hổ Phách & Vàng Hồng Hoàng Gia */}
          <linearGradient id="gear-royal-amber-curved" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Bánh răng Lam Ngọc & Bạch Kim */}
          <linearGradient id="gear-sapphire-titanium-curved" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#E0F2FE" />
            <stop offset="55%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Viền vát kim cương phản quang ánh sáng trắng */}
          <linearGradient id="gear-specular-edge-curved" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
          </linearGradient>

          {/* Chân kính Ruby đính tâm */}
          <radialGradient id="ruby-jewel-curved" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="40%" stopColor="#F43F5E" />
            <stop offset="80%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Thẻ Kính Mờ Telemetry */}
          <linearGradient id="curved-badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.88" />
          </linearGradient>

          <linearGradient id="curved-badge-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
          </linearGradient>

          {/* Bộ lọc bóng đổ màn hình cong nổi bật khỏi nền web */}
          <filter id="curved-monitor-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.22" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.25" />
          </filter>

          <filter id="curved-gear-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.65" />
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#38BDF8" floodOpacity="0.35" />
          </filter>

          <filter id="curved-badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.14" />
          </filter>
        </defs>

        <style>{`
          @keyframes curved-gear-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes curved-energy-pulse {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.08); opacity: 1; }
          }
          @keyframes beam-dash-flow-curved {
            0% { stroke-dashoffset: 40; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes curved-sheen-sweep {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .anim-curved-gears { animation: curved-gear-float 6s ease-in-out infinite; }
          .anim-curved-energy { animation: curved-energy-pulse 4s ease-in-out infinite; transform-origin: 220px 145px; }
          .anim-curved-stream { stroke-dasharray: 5 3; animation: beam-dash-flow-curved 1.5s linear infinite; }
          .anim-curved-sheen { animation: curved-sheen-sweep 5s ease-in-out infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: KHUNG VỎ & MẶT HIỂN THỊ MÀN HÌNH CONG 1000R (CURVED OLED MONITOR)   */}
        {/* ========================================================================= */}
        <g id="curved-display-chassis" filter="url(#curved-monitor-shadow)">
          
          {/* 1.1 Thân Vỏ Màn Hình Cong (Chassis Rim) */}
          <path
            d={curvedScreenOutline}
            fill="url(#curved-oled-surface)"
            stroke="url(#curved-chassis-bezel)"
            strokeWidth="3.5"
          />

          {/* 1.2 Viền Neon Cyan phát quang dọc mép màn hình cong (Neon Curved Accent Rim) */}
          <path
            d={curvedScreenOutline}
            stroke="url(#curved-neon-rim)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* 1.3 Lưới Phối Cảnh Uốn Cong 1000R Theo Mặt Trụ (Cylindrical Cyber Grid) */}
          <g opacity="0.22">
            {/* Các đường lưới ngang uốn cong đều theo độ cong 1000R */}
            <path d="M 20 80 Q 220 96 420 80" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
            <path d="M 16 145 Q 220 161 424 145" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 6" fill="none" />
            <path d="M 20 210 Q 220 226 420 210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />

            {/* Các đường lưới dọc nghiêng theo góc phối cảnh hình trụ */}
            <line x1="220" y1="38" x2="220" y2="274" stroke="#38BDF8" strokeWidth="0.9" />
            <line x1="155" y1="34" x2="148" y2="268" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="95" y1="30" x2="82" y2="263" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="45" y1="26" x2="28" y2="256" stroke="#38BDF8" strokeWidth="0.8" />

            <line x1="285" y1="34" x2="292" y2="268" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="345" y1="30" x2="358" y2="263" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="395" y1="26" x2="412" y2="256" stroke="#38BDF8" strokeWidth="0.8" />
          </g>

          {/* 1.4 Vầng hào quang năng lượng từ tâm màn hình cong */}
          <g transform="translate(220, 145)">
            <ellipse cx="0" cy="0" rx="145" ry="85" fill="url(#curved-core-glow)" className="anim-curved-energy" />
          </g>

          {/* 1.5 Thanh Thông Tin HUD Trên Màn Hình Cong (Header & Footer Status Bars) */}
          <g fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1" opacity="0.75">
            {/* Header Status */}
            <circle cx="28" cy="38" r="2" fill="#22C55E" />
            <text x="36" y="41">1000R CURVED OLED // KINETIC ENGINE</text>
            <text x="325" y="41" textAnchor="end">120HZ • HDR1000</text>

            {/* Footer Status */}
            <text x="28" y="250">AVG-ONE WORKSPACE OS</text>
            <text x="412" y="250" textAnchor="end">STATUS: SYNCHRONIZED [ + ]</text>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC ĐƯỜNG DẪN TRUYỀN NĂNG LƯỢNG UỐN CONG THEO MẶT KÍNH           */}
        {/* ========================================================================= */}
        <g id="curved-conduit-streams">
          {/* Nhánh dẫn tới Card 1 (Top-Left) */}
          <path
            d="M 180 110 C 140 95, 100 80, 70 65"
            stroke="#38BDF8"
            strokeWidth="1.4"
            fill="none"
            className="anim-curved-stream opacity-70"
          />
          <circle cx="70" cy="65" r="2" fill="#38BDF8" />

          {/* Nhánh dẫn tới Card 2 (Bottom-Left) */}
          <path
            d="M 170 175 C 130 205, 95 218, 65 228"
            stroke="#0284C7"
            strokeWidth="1.4"
            fill="none"
            className="anim-curved-stream opacity-70"
          />
          <circle cx="65" cy="228" r="2" fill="#0284C7" />

          {/* Nhánh dẫn tới Card 3 (Right) */}
          <path
            d="M 270 145 C 310 145, 335 140, 360 140"
            stroke="#F59E0B"
            strokeWidth="1.4"
            fill="none"
            className="anim-curved-stream opacity-70"
          />
          <circle cx="360" cy="140" r="2" fill="#F59E0B" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: CỖ MÁY 3 BÁNH RĂNG VI CƠ KHÍ XOAY TRONG KHÔNG GIAN MÀN HÌNH CONG  */}
        {/* ========================================================================= */}
        <g className="anim-curved-gears" filter="url(#curved-gear-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO BẠCH KIM BẢO VỆ CỖ MÁY */}
          <g transform="translate(220, 145) rotate(-16)">
            <ellipse
              cx="0"
              cy="0"
              rx="95"
              ry="37"
              stroke="#0284C7"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="40 15 20 15"
              opacity="0.6"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="93"
              ry="35.5"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.85"
            />
            <circle cx="95" cy="0" r="2.5" fill="#F59E0B" />
            <circle cx="-95" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH - VÀNG HỔ PHÁCH HOÀNG GIA (MASTER GEAR) */}
          {/* Tâm: (220, 106) - 12 răng - Xoay thuận (+360°) trong 15s       */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(220, 106)">
            <g>
              <g transform="translate(0, 3.5)">
                <path d={masterGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-royal-amber-curved)"
                stroke="#F59E0B"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-edge-curved)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="23" stroke="#7C2D12" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6" />

              <line x1="-16" y1="0" x2="-24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="16" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="-16" x2="0" y2="-24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
              <line x1="0" y1="16" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />

              <circle cx="0" cy="0" r="7" fill="#451A03" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.8" fill="url(#ruby-jewel-curved)" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="-1.5" cy="-1.5" r="1.3" fill="#FFFFFF" opacity="0.95" />

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
          {/* Tâm: (169, 158) - 12 răng - Xoay ngược (-360°) 15s, pha -15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(169, 158)">
            <g>
              <g transform="translate(0, 3.5)">
                <path d={masterGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-titanium-curved)"
                stroke="#0284C7"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-edge-curved)" strokeWidth="1.2" fill="none" />
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
                from="-15 0 0"
                to="-375 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI PHẢI - LAM NGỌC TITAN (RIGHT PRECISION GEAR)*/}
          {/* Tâm: (271, 158) - 12 răng - Xoay ngược (-360°) 15s, pha +15°   */}
          {/* ------------------------------------------------------------- */}
          <g transform="translate(271, 158)">
            <g>
              <g transform="translate(0, 3.5)">
                <path d={masterGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
              </g>

              <path
                d={masterGearPath}
                fill="url(#gear-sapphire-titanium-curved)"
                stroke="#0284C7"
                strokeWidth="1"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="24.5" stroke="url(#gear-specular-edge-curved)" strokeWidth="1.2" fill="none" />
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
        {/* TẦNG 4: VỆT PHẢN QUANG MẶT KÍNH CONG (CYLINDRICAL GLASS SHEEN SWEEP)       */}
        {/* ========================================================================= */}
        <path
          d={curvedScreenOutline}
          fill="url(#curved-glass-sheen)"
          className="anim-curved-sheen pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* TẦNG 5: HỆ THỐNG THẺ KÍNH MỜ TELEMETRY TRÊN MÀN HÌNH CONG                 */}
        {/* ========================================================================= */}
        <g id="curved-telemetry-cards">
          
          {/* ⚡ CARD 1: TỰ ĐỘNG HÓA (TOP-LEFT: X=24, Y=48) */}
          <g transform="translate(24, 48)" filter="url(#curved-badge-shadow)">
            <rect
              x="0"
              y="0"
              width="122"
              height="38"
              rx="8"
              fill="url(#curved-badge-bg)"
              stroke="url(#curved-badge-border)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="0.8" />
            <path d="M18 13l-3 7h4l-1 5 4-7h-4l1-5z" fill="#16A34A" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Tự Động Hóa</text>
            <text x="34" y="30" fill="#16A34A" fontSize="8" fontWeight="600" fontFamily="sans-serif">● 100% SOP Flow</text>
          </g>

          {/* 👥 CARD 2: 20 NHÂN SỰ LÕI (BOTTOM-LEFT: X=24, Y=208) */}
          <g transform="translate(24, 208)" filter="url(#curved-badge-shadow)">
            <rect
              x="0"
              y="0"
              width="128"
              height="38"
              rx="8"
              fill="url(#curved-badge-bg)"
              stroke="url(#curved-badge-border)"
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

          {/* 🚀 CARD 3: VẬN HÀNH TỐC ĐỘ (RIGHT: X=310, Y=126) */}
          <g transform="translate(310, 126)" filter="url(#curved-badge-shadow)">
            <rect
              x="0"
              y="0"
              width="114"
              height="38"
              rx="8"
              fill="url(#curved-badge-bg)"
              stroke="url(#curved-badge-border)"
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
