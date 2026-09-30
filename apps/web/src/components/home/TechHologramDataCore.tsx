import React from 'react';

/**
 * 🌐 DIMENSIONAL PORTAL: QUANTUM DATA CORE (LEFT HERO COMPONENT)
 * 
 * Hiệu ứng Chiều Sâu 3D "Đục Thủng Lớp Nền" (Sunken 3D Quantum Vacuum Chamber / Dimensional Portal):
 * - Mặt nền phẳng của trang web được "đục thủng" bằng một giếng công nghệ bo góc 3D sâu hun hút (Sunken Perspective Chamber).
 * - Cạnh vát 3D (Recessed Inner Bevel) với đổ bóng đa tầng tạo cảm giác khoét sâu vào không gian phần cứng lượng tử.
 * - Đáy giếng là khoang công nghệ vũ trụ sâu thẳm (Deep Obsidian Navy #061325) với lưới phối cảnh 3D và vầng hào quang lam ngọc bừng sáng.
 * - Bên trong buồng lượng tử: Khối Lập Phương Lượng Tử Pha Lê 3D (Grand Crystal Monolith) lơ lửng, phát quang điểm sao AI 4 cánh rực sáng.
 * - Lớp kính tinh thể bảo vệ bên trên với vệt quét ánh sáng quang học (Diagonal Glass Gleam) và các ký hiệu vi cơ khí góc [ + ].
 * - 3 Thẻ Kính Mờ Telemetry tích hợp vi mạch nổi nhẹ trên miệng giếng.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
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
          <radialGradient id="portal-cavity-floor-left" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="45%" stopColor="#06152B" />
            <stop offset="85%" stopColor="#030B17" />
            <stop offset="100%" stopColor="#01050A" />
          </radialGradient>

          {/* Vầng hào quang nội tại bừng sáng từ tâm đáy giếng */}
          <radialGradient id="portal-core-burst-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Cạnh vát bóng đổ trên (Top Recessed Shadow Wall) */}
          <linearGradient id="portal-top-bevel-left" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </linearGradient>

          {/* Cạnh vát phản quang dưới (Bottom Recessed Specular Wall) */}
          <linearGradient id="portal-bottom-bevel-left" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </linearGradient>

          {/* Viền ngoài miệng giếng trên mặt nền phẳng */}
          <linearGradient id="portal-outer-lip-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#E2E8F0" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Vệt quét ánh sáng mặt kính bảo vệ */}
          <linearGradient id="portal-glass-gleam-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>

          {/* Mặt Trên Lập Phương: Kính Tinh Thể Bạch Kim */}
          <linearGradient id="monolith-face-top-portal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F0F9FF" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* Mặt Trái Lập Phương: Lam Ngọc Khói Sâu */}
          <linearGradient id="monolith-face-left-portal" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="40%" stopColor="#075985" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Mặt Phải Lập Phương: Lam Ngọc Sáng Bóng */}
          <linearGradient id="monolith-face-right-portal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#0369A1" />
            <stop offset="85%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>

          {/* Vòng Đai Quỹ Đạo Kim Loại Chất Lỏng */}
          <linearGradient id="liquid-ribbon-portal" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#BAE6FD" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Cạnh Sống Vát Kim Cương Phản Quang Sắc Lẹm */}
          <linearGradient id="monolith-gleam-edge-portal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
          </linearGradient>

          {/* Gradient Thẻ Kính Mờ */}
          <linearGradient id="glass-badge-bg-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.88" />
          </linearGradient>

          <linearGradient id="glass-badge-border-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
          </linearGradient>

          {/* Bộ lọc bóng đổ chiều sâu khoang giếng */}
          <filter id="portal-inner-shadow-left" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.25" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0284C7" floodOpacity="0.2" />
          </filter>

          <filter id="monolith-cluster-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.3" />
          </filter>

          <filter id="badge-depth-shadow-left" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
          </filter>
        </defs>

        <style>{`
          @keyframes portal-monolith-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(0.3deg); }
          }
          @keyframes portal-energy-pulse-left {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.08); opacity: 1; }
          }
          @keyframes star-pulse-portal {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.15); opacity: 1; }
          }
          @keyframes beam-dash-flow-left-portal {
            0% { stroke-dashoffset: 40; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes glass-sheen-sweep-left {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .anim-portal-monolith { animation: portal-monolith-float 6s ease-in-out infinite; }
          .anim-portal-energy-left { animation: portal-energy-pulse-left 4s ease-in-out infinite; transform-origin: 220px 140px; }
          .anim-star-portal { animation: star-pulse-portal 3s ease-in-out infinite; transform-origin: 0 0; }
          .anim-portal-stream-left { stroke-dasharray: 5 3; animation: beam-dash-flow-left-portal 1.5s linear infinite; }
          .anim-sheen-left { animation: glass-sheen-sweep-left 5s ease-in-out infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: "ĐỤC THỦNG LỚP NỀN" - GIẾNG CÔNG NGHỆ 3D SÂU HUN HÚT (SUNKEN WELL) */}
        {/* ========================================================================= */}
        <g id="sunken-dimensional-portal-left">
          
          {/* 1.1 Khối Đáy Giếng Sâu */}
          <rect
            x="14"
            y="14"
            width="412"
            height="252"
            rx="20"
            fill="url(#portal-cavity-floor-left)"
            filter="url(#portal-inner-shadow-left)"
          />

          {/* 1.2 Lưới Phối Cảnh Chiều Sâu 3D ở Đáy Giếng */}
          <g opacity="0.22">
            <line x1="60" y1="20" x2="40" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="120" y1="20" x2="110" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="180" y1="20" x2="180" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="240" y1="20" x2="240" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="300" y1="20" x2="310" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="360" y1="20" x2="380" y2="260" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="20" y1="70" x2="420" y2="70" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="20" y1="140" x2="420" y2="140" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="20" y1="210" x2="420" y2="210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
          </g>

          {/* 1.3 Vầng hào quang năng lượng từ tâm đáy giếng chiếu rọi */}
          <g transform="translate(220, 140)">
            <ellipse cx="0" cy="0" rx="140" ry="85" fill="url(#portal-core-burst-left)" className="anim-portal-energy-left" />
          </g>

          {/* 1.4 Thành Vát 3D Khoét Sâu */}
          <rect x="14" y="14" width="412" height="40" rx="20" fill="url(#portal-top-bevel-left)" />
          <rect x="14" y="226" width="412" height="40" rx="20" fill="url(#portal-bottom-bevel-left)" />

          {/* 1.5 Vành Miệng Giếng Vát Kim Cương Ngoài Cùng */}
          <rect
            x="14"
            y="14"
            width="412"
            height="252"
            rx="20"
            stroke="url(#portal-outer-lip-left)"
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
            <line x1="28" y1="24" x2="28" y2="34" />
            <line x1="23" y1="29" x2="33" y2="29" />
            <text x="38" y="32" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">CHAMBER_01 // QUANTUM_DATA</text>

            <line x1="412" y1="246" x2="412" y2="256" />
            <line x1="407" y1="251" x2="417" y2="251" />
            <text x="305" y="254" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace" letterSpacing="1">STATUS: AI CORE READY</text>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC ĐƯỜNG DẪN TRUYỀN NĂNG LƯỢNG NỘI TẠI DƯỚI ĐÁY GIẾNG           */}
        {/* ========================================================================= */}
        <g id="portal-conduit-streams-left">
          <path
            d="M 260 100 C 300 85, 335 70, 365 52"
            stroke="#38BDF8"
            strokeWidth="1.4"
            fill="none"
            className="anim-portal-stream-left opacity-70"
          />
          <circle cx="365" cy="52" r="2" fill="#38BDF8" />

          <path
            d="M 270 170 C 310 200, 340 215, 370 228"
            stroke="#0284C7"
            strokeWidth="1.4"
            fill="none"
            className="anim-portal-stream-left opacity-70"
          />
          <circle cx="370" cy="228" r="2" fill="#0284C7" />

          <path
            d="M 170 140 C 130 140, 105 135, 75 135"
            stroke="#6366F1"
            strokeWidth="1.4"
            fill="none"
            className="anim-portal-stream-left opacity-70"
          />
          <circle cx="75" cy="135" r="2" fill="#6366F1" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: KHỐI LẬP PHƯƠNG LƯỢNG TỬ TITAN 3D LƠ LỬNG TRONG BUỒNG SÂU        */}
        {/* ========================================================================= */}
        <g className="anim-portal-monolith" filter="url(#monolith-cluster-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 1: NGHIÊNG TRỤC TRÁI -24° */}
          <g transform="translate(220, 140) rotate(-24)">
            <ellipse
              cx="0"
              cy="0"
              rx="98"
              ry="36"
              stroke="url(#liquid-ribbon-portal)"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="45 15 25 15"
              opacity="0.8"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="96"
              ry="34.5"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.85"
            />
            <circle cx="98" cy="0" r="2.8" fill="#FFFFFF" />
            <circle cx="-98" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 2: NGHIÊNG TRỤC PHẢI +32° */}
          <g transform="translate(220, 140) rotate(32)">
            <ellipse
              cx="0"
              cy="0"
              rx="98"
              ry="36"
              stroke="#0284C7"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="35 20 20 20"
              opacity="0.5"
            />
            <circle cx="-98" cy="0" r="2.5" fill="#6366F1" />
          </g>

          {/* KHỐI LẬP PHƯƠNG PHA LÊ BỀ THẾ */}
          <g transform="translate(220, 140)">
            
            {/* MẶT TRÊN: BỀ MẶT KÍNH PHA LÊ BẠCH KIM */}
            <polygon
              points="0,-54 48,-27 0,0 -48,-27"
              fill="url(#monolith-face-top-portal)"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Viền vát kim cương mặt trên */}
            <polygon
              points="0,-50 44,-25 0,0 -44,-25"
              fill="none"
              stroke="url(#monolith-gleam-edge-portal)"
              strokeWidth="1"
              opacity="0.95"
            />

            {/* MẶT TRÁI: LAM NGỌC KHÓI SÂU */}
            <polygon
              points="-48,-27 0,0 0,54 -48,27"
              fill="url(#monolith-face-left-portal)"
              stroke="#0369A1"
              strokeWidth="1.2"
            />
            {/* Vi mạch laser thanh mảnh */}
            <line x1="-36" y1="-18" x2="-8" y2="-2" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />
            <line x1="-36" y1="-2" x2="-8" y2="14" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />
            <line x1="-36" y1="14" x2="-8" y2="30" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />

            {/* MẶT PHẢI: LAM NGỌC SÁNG BÓNG */}
            <polygon
              points="0,0 48,-27 48,27 0,54"
              fill="url(#monolith-face-right-portal)"
              stroke="#0284C7"
              strokeWidth="1.2"
            />
            {/* Phản xạ ánh sáng vi mô trên mặt phải */}
            <line x1="8" y1="-2" x2="36" y2="-18" stroke="#BAE6FD" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.85" />
            <line x1="8" y1="14" x2="36" y2="-2" stroke="#BAE6FD" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.85" />
            <line x1="8" y1="30" x2="36" y2="14" stroke="#BAE6FD" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.85" />

            {/* CẠNH SỐNG TRUNG TÂM PHẢN QUANG SẮC LẸM */}
            <line x1="0" y1="0" x2="0" y2="54" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-48" y1="-27" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="0" y1="0" x2="48" y2="-27" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />

            {/* KHỐI TESSERACT LỒNG GHÉP BÊN TRONG */}
            <g transform="scale(0.55)">
              <polygon
                points="0,-50 44,-25 0,0 -44,-25"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeDasharray="5 3"
                opacity="0.9"
              />
              <polygon
                points="-44,-25 0,0 0,50 -44,25"
                fill="none"
                stroke="#BAE6FD"
                strokeWidth="1.2"
                opacity="0.8"
              />
              <polygon
                points="0,0 44,-25 44,25 0,50"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.2"
                opacity="0.8"
              />
            </g>

            {/* LÕI LƯỢNG TỬ ĐIỂM SAO AI PHÁT QUANG */}
            <g id="ai-singularity-star-portal" className="anim-star-portal" transform="translate(0, 0)">
              <circle cx="0" cy="0" r="11" fill="#0C4A6E" stroke="url(#liquid-ribbon-portal)" strokeWidth="1.4" opacity="0.9" />
              <circle cx="0" cy="0" r="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.9" />
              
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
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
          fill="url(#portal-glass-gleam-left)"
          className="anim-sheen-left pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* TẦNG 5: HỆ THỐNG THẺ KÍNH MỜ TELEMETRY NỔI NHẸ TRÊN MIỆNG GIẾNG (CARDS)   */}
        {/* ========================================================================= */}
        <g id="portal-telemetry-cards-left">
          
          {/* 🧠 CARD 1: TRÍ TUỆ NHÂN TẠO AI (TOP-RIGHT: X=275, Y=24) */}
          <g transform="translate(275, 24)" filter="url(#badge-depth-shadow-left)">
            <rect
              x="0"
              y="0"
              width="142"
              height="38"
              rx="8"
              fill="url(#glass-badge-bg-left)"
              stroke="url(#glass-badge-border-left)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="0.8" />
            <path d="M18 14a2.5 2.5 0 0 0-2.5 2.5c0 1 .5 1.8 1.3 2.2v1.2a.8.8 0 0 0 .8.8h.8a.8.8 0 0 0 .8-.8V18.7c.8-.4 1.3-1.2 1.3-2.2a2.5 2.5 0 0 0-2.5-2.5z" fill="#16A34A" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Trí Tuệ Nhân Tạo AI</text>
            <text x="34" y="30" fill="#16A34A" fontSize="8" fontWeight="600" fontFamily="sans-serif">● Xử Lý SOP Tức Thì</text>
          </g>

          {/* 📊 CARD 2: 100% SỐ HÓA (BOTTOM-RIGHT: X=275, Y=218) */}
          <g transform="translate(275, 218)" filter="url(#badge-depth-shadow-left)">
            <rect
              x="0"
              y="0"
              width="142"
              height="38"
              rx="8"
              fill="url(#glass-badge-bg-left)"
              stroke="url(#glass-badge-border-left)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="0.8" />
            <line x1="14" y1="24" x2="14" y2="18" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="18" y1="24" x2="18" y2="14" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="22" y1="24" x2="22" y2="16" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">100% Số Hóa</text>
            <text x="34" y="30" fill="#0284C7" fontSize="8" fontWeight="600" fontFamily="sans-serif">Dữ Liệu Thời Gian Thực</text>
          </g>

          {/* 🛡️ CARD 3: BẢO MẬT ĐA TẦNG (LEFT: X=18, Y=121) */}
          <g transform="translate(18, 121)" filter="url(#badge-depth-shadow-left)">
            <rect
              x="0"
              y="0"
              width="126"
              height="38"
              rx="8"
              fill="url(#glass-badge-bg-left)"
              stroke="url(#glass-badge-border-left)"
              strokeWidth="1"
            />
            <rect x="7" y="8" width="22" height="22" rx="5" fill="#EEF2FF" stroke="#A5B4FC" strokeWidth="0.8" />
            <path d="M18 13s4.5-2 4.5-5.5V9.5l-4.5-2-4.5 2V7.5c0 3.5 4.5 5.5 4.5 5.5z" fill="#4F46E5" />
            <text x="34" y="19" fill="#0F172A" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Bảo Mật Đa Tầng</text>
            <text x="34" y="30" fill="#4F46E5" fontSize="8" fontWeight="600" fontFamily="sans-serif">Chuẩn Mực Tối Ưu</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
