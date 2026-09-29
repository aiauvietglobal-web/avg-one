import React from 'react';

/**
 * ⚙️ STUDIO 3D HOLOGRAM GEAR ECOSYSTEM (RIGHT SIDE)
 * 
 * Thiết kế chuẩn xác 100% theo tác phẩm tham chiếu:
 * - Cụm 3 Bánh răng Neon Cyan 3D phát sáng lơ lửng, ăn khớp cơ học hoàn hảo, xoay 60fps mượt mà.
 * - Bệ đài elip 3D công nghệ cao đa tầng (Multi-tier Hologram Pedestal).
 * - Lõi ánh sáng quang học bùng nổ từ tâm (Optical Core Flare: Trắng rực rỡ + Tia cam hổ phách).
 * - Chùm sáng nón quang học (Optical Beam) chiếu thẳng đứng từ tâm bệ đài lên nâng đỡ 3 bánh răng.
 * - Hệ thống 6 Node vệ tinh phát sáng tròn trịa (Đĩa sáng elip neon + Icon công nghệ cao: Lock, Lightbulb, Mini-Gears, Megaphone, Users, AI Brain).
 * - Đường mạch điện tử PCB Cyber Traces nối các node về bệ đài trung tâm.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng 8 răng chuẩn kỹ thuật (Pitch R = 36, Outer R = 44, Root R = 28, Hole R = 14)
  const gearPath = 
    "M 28.00 0.00 L 27.58 4.81 L 42.62 10.94 L 37.87 22.40 L 22.91 16.10 " +
    "L 19.80 19.80 L 16.10 22.91 L 22.40 37.87 L 10.94 42.62 L 4.81 27.58 " +
    "L 0.00 28.00 L -4.81 27.58 L -10.94 42.62 L -22.40 37.87 L -16.10 22.91 " +
    "L -19.80 19.80 L -22.91 16.10 L -37.87 22.40 L -42.62 10.94 L -27.58 4.81 " +
    "L -28.00 0.00 L -27.58 -4.81 L -42.62 -10.94 L -37.87 -22.40 L -22.91 -16.10 " +
    "L -19.80 -19.80 L -16.10 -22.91 L -22.40 -37.87 L -10.94 -42.62 L -4.81 -27.58 " +
    "L -0.00 -28.00 L 4.81 -27.58 L 10.94 -42.62 L 22.40 -37.87 L 16.10 -22.91 " +
    "L 19.80 -19.80 L 22.91 -16.10 L 37.87 -22.40 L 42.62 -10.94 L 27.58 -4.81 Z " +
    "M 14 0 A 14 14 0 1 0 -14 0 A 14 14 0 1 0 14 0 Z";

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 440 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ THỐNG GRADIENTS CHUẨN OPTICAL STUDIO 🌟 */}
          
          {/* Gradient Bánh Răng Neon Cyan (Electric Cyan & Aqua Luminescence) */}
          <linearGradient id="gear-neon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="25%" stopColor="#38BDF8" />
            <stop offset="65%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Gradient Viền Bánh Răng (Glowing Edge Bevel) */}
          <linearGradient id="gear-edge-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.6" />
          </linearGradient>

          {/* Gradient Chùm Sáng Nón Quang Học Chiếu Đứng (Vertical Optical Light Cone) */}
          <linearGradient id="optical-beam-gradient" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="20%" stopColor="#00F0FF" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="85%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </linearGradient>

          {/* Radial Gradient Tâm Bùng Nổ Ánh Sáng (Optical Core Flare Burst) */}
          <radialGradient id="core-flare-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#F97316" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </radialGradient>

          {/* Radial Gradient Hào Quang Đĩa Node Vệ Tinh (Satellite Pad Halo) */}
          <radialGradient id="satellite-pad-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#0369A1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Tia sáng Hổ phách quang học ngang (Horizontal Lens Flare Streaks) */}
          <linearGradient id="amber-flare-streak" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
            <stop offset="30%" stopColor="#FB923C" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>

          {/* Bộ lọc Neon Glow tinh tế (Sắc sảo, không làm đục nền) */}
          <filter id="neon-cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="gear-intense-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          @keyframes studio-gear-levitate {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes optical-flare-pulse {
            0%, 100% { opacity: 0.9; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.08); }
          }
          @keyframes radar-ring-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes light-beam-shimmer {
            0%, 100% { opacity: 0.75; }
            50% { opacity: 0.95; }
          }
          .anim-gear-group { animation: studio-gear-levitate 5s ease-in-out infinite; }
          .anim-flare-pulse { animation: optical-flare-pulse 3s ease-in-out infinite; transform-origin: 220px 272px; }
          .anim-beam-shimmer { animation: light-beam-shimmer 4s ease-in-out infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: BỆ ĐÀI CÔNG NGHỆ ELIP 3D ĐA TẦNG (MULTI-TIER 3D PEDESTAL)         */}
        {/* ========================================================================= */}
        <g id="pedestal-base">
          
          {/* 1.1 Vành đai ngoài cùng (Outer Base Perimeter Track) */}
          <ellipse
            cx="220"
            cy="272"
            rx="185"
            ry="54"
            stroke="#0284C7"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-45 dark:opacity-35"
          />
          <ellipse
            cx="220"
            cy="272"
            rx="172"
            ry="50"
            stroke="#38BDF8"
            strokeWidth="0.8"
            className="opacity-35 dark:opacity-25"
          />

          {/* Vạch nan hoa HUD công nghệ ngoại vi (Perimeter Tick Marks) */}
          {[-70, -50, -30, -10, 10, 30, 50, 70].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 220 + 172 * Math.sin(rad);
            const y1 = 272 + 50 * Math.cos(rad);
            const x2 = 220 + 185 * Math.sin(rad);
            const y2 = 272 + 54 * Math.cos(rad);
            return (
              <line
                key={`base-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#38BDF8"
                strokeWidth="1.2"
                className="opacity-55"
              />
            );
          })}

          {/* 1.2 Vành đai Radar công nghệ HUD (Rotating Tech Radar Track) */}
          <g transform="translate(220, 272)">
            {/* Vòng quay Radar */}
            <ellipse
              cx="0"
              cy="0"
              rx="140"
              ry="40"
              stroke="#00F0FF"
              strokeWidth="1.5"
              strokeDasharray="18 10 36 10 6 8"
              fill="none"
              className="opacity-65"
            />
            {/* Các hạt photon định vị trên quỹ đạo */}
            <circle cx="-140" cy="0" r="2.2" fill="#00F0FF" filter="url(#neon-cyan-glow)" />
            <circle cx="140" cy="0" r="2.2" fill="#00F0FF" filter="url(#neon-cyan-glow)" />
            <circle cx="0" cy="-40" r="1.8" fill="#FFFFFF" />
            <circle cx="0" cy="40" r="1.8" fill="#FFFFFF" />
          </g>

          {/* 1.3 Vành đài phát sáng chính (Main Radiant Neon Cyan Ring) */}
          <g transform="translate(220, 272)">
            {/* Vành sáng hào quang */}
            <ellipse
              cx="0"
              cy="0"
              rx="106"
              ry="30"
              stroke="#00F0FF"
              strokeWidth="2.8"
              fill="none"
              filter="url(#neon-cyan-glow)"
              className="opacity-95"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="103"
              ry="29"
              stroke="#FFFFFF"
              strokeWidth="1"
              fill="none"
              strokeDasharray="60 20 40 20"
              className="opacity-90"
            />
          </g>

          {/* 1.4 Vành nan hoa phân đoạn bên trong (Segmented Cyber Ring) */}
          <g transform="translate(220, 272)">
            <ellipse
              cx="0"
              cy="0"
              rx="74"
              ry="21"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray="14 8 24 8"
              fill="none"
              className="opacity-80"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="52"
              ry="15"
              stroke="#00F0FF"
              strokeWidth="1.6"
              strokeDasharray="8 6"
              fill="none"
              className="opacity-75"
            />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: 6 NODE VỆ TINH PHÁT SÁNG & ĐƯỜNG MẠCH PCB CYBER TRACES           */}
        {/* ========================================================================= */}
        <g id="satellite-ecosystem">
          
          {/* --- ĐƯỜNG MẠCH PCB NỐI TỪ BỆ ĐÀI ĐẾN CÁC NODE --- */}
          {/* Nhánh 1: Tới Node Bóng Đèn (Top-Left: 58, 205) */}
          <path
            d="M 145 258 L 95 240 L 58 220 L 58 205"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="95" cy="240" r="1.8" fill="#00F0FF" />

          {/* Nhánh 2: Tới Node Khóa Bảo Mật (Mid-Left: 122, 160) */}
          <path
            d="M 165 245 L 122 220 L 122 172"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="122" cy="220" r="1.8" fill="#00F0FF" />

          {/* Nhánh 3: Tới Node Mini-Gears (Bottom-Left: 68, 280) */}
          <path
            d="M 115 272 L 88 280 L 68 280"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="88" cy="280" r="1.8" fill="#00F0FF" />

          {/* Nhánh 4: Tới Node Loa Megaphone (Mid-Right: 318, 160) */}
          <path
            d="M 275 245 L 318 220 L 318 172"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="318" cy="220" r="1.8" fill="#00F0FF" />

          {/* Nhánh 5: Tới Node Nhóm Users (Top-Right: 382, 205) */}
          <path
            d="M 295 258 L 345 240 L 382 220 L 382 205"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="345" cy="240" r="1.8" fill="#00F0FF" />

          {/* Nhánh 6: Tới Node Não AI (Bottom-Right: 372, 280) */}
          <path
            d="M 325 272 L 352 280 L 372 280"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="352" cy="280" r="1.8" fill="#00F0FF" />

          {/* --- 6 NODE VỆ TINH PHÁT SÁNG (GỒM ĐĨA SÁNG ELIP + ICON NEON CYAN) --- */}

          {/* 💡 NODE 1: BÓNG ĐÈN SÁNG TẠO (TOP-LEFT: 58, 205) */}
          <g id="satellite-lightbulb" transform="translate(58, 205)">
            {/* Đĩa sáng elip dưới chân */}
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Icon Bóng đèn phát sáng */}
            <g transform="translate(-10, -22) scale(0.85)">
              <path
                d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.2V16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.8c1.79-1.04 3-2.98 3-5.2a6 6 0 0 0-6-6z"
                fill="#00F0FF"
                filter="url(#neon-cyan-glow)"
              />
              <path d="M10 20h4M9 17h6" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </g>

          {/* 🔒 NODE 2: KHÓA BẢO MẬT & TÀI CHÍNH (MID-LEFT: 122, 160) */}
          <g id="satellite-lock" transform="translate(122, 160)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Icon Khóa & Đô la $ */}
            <g transform="translate(-9, -22) scale(0.8)">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#00F0FF" filter="url(#neon-cyan-glow)" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Dấu đô la $ sắc nét */}
              <text x="12" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">$</text>
            </g>
          </g>

          {/* ⚙️ NODE 3: MINI 3-GEARS VẬN HÀNH (BOTTOM-LEFT: 68, 280) */}
          <g id="satellite-gears" transform="translate(68, 280)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Icon 3 Bánh răng nhỏ */}
            <g transform="translate(-10, -20) scale(0.75)">
              <circle cx="12" cy="7" r="4.5" fill="#00F0FF" filter="url(#neon-cyan-glow)" />
              <circle cx="7" cy="15" r="4" fill="#38BDF8" />
              <circle cx="17" cy="15" r="4" fill="#38BDF8" />
              <circle cx="12" cy="7" r="2" fill="#FFFFFF" />
              <circle cx="7" cy="15" r="1.6" fill="#FFFFFF" />
              <circle cx="17" cy="15" r="1.6" fill="#FFFFFF" />
            </g>
          </g>

          {/* 📢 NODE 4: LOA TRUYỀN THÔNG MEGAPHONE (MID-RIGHT: 318, 160) */}
          <g id="satellite-megaphone" transform="translate(318, 160)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Icon Megaphone */}
            <g transform="translate(-10, -22) scale(0.85)">
              <path
                d="M3 11v-1a2 2 0 0 1 2-2h2l6-4v14l-6-4H5a2 2 0 0 1-2-2v-1"
                fill="#00F0FF"
                filter="url(#neon-cyan-glow)"
              />
              <path d="M16 8a4 4 0 0 1 0 8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M19 6a7 7 0 0 1 0 12" stroke="#00F0FF" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </g>

          {/* 👥 NODE 5: NHÓM NHÂN SỰ & CRM (TOP-RIGHT: 382, 205) */}
          <g id="satellite-users" transform="translate(382, 205)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Icon 3 Người cộng tác */}
            <g transform="translate(-12, -22) scale(0.8)">
              {/* Người trung tâm */}
              <circle cx="12" cy="7" r="3.2" fill="#FFFFFF" />
              <path d="M7 18v-2a3 3 0 0 1 6 0v2" fill="#00F0FF" filter="url(#neon-cyan-glow)" />
              {/* Người trái & phải */}
              <circle cx="5" cy="9" r="2.4" fill="#BAE6FD" />
              <path d="M1 18v-1.5a2.5 2.5 0 0 1 4-2" stroke="#00F0FF" strokeWidth="1.2" fill="none" />
              <circle cx="19" cy="9" r="2.4" fill="#BAE6FD" />
              <path d="M19 14.5a2.5 2.5 0 0 1 4 2V18" stroke="#00F0FF" strokeWidth="1.2" fill="none" />
            </g>
          </g>

          {/* 🧠 NODE 6: NÃO BỘ AI & TRÍ TUỆ NHÂN TẠO (BOTTOM-RIGHT: 372, 280) */}
          <g id="satellite-ai-brain" transform="translate(372, 280)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Icon AI Brain Neural Core */}
            <g transform="translate(-10, -22) scale(0.85)">
              <path
                d="M12 4c-1.5 0-2.8.8-3.4 2A3.8 3.8 0 0 0 4 9.5c0 1.2.6 2.3 1.5 3A4 4 0 0 0 5 16.5c0 1.9 1.6 3.5 3.5 3.5h7c1.9 0 3.5-1.6 3.5-3.5 0-1.5-.9-2.8-2.2-3.3.9-.7 1.5-1.8 1.5-3.2A3.8 3.8 0 0 0 14.4 6c-.6-1.2-1.9-2-3.4-2z"
                fill="#00F0FF"
                filter="url(#neon-cyan-glow)"
              />
              <path d="M12 7v10M9 10h6M8 14h8" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: CHÙM SÁNG NÓN QUANG HỌC & LÕI BÙNG NỔ ÁNH SÁNG TỪ TÂM             */}
        {/* ========================================================================= */}
        <g id="optical-light-cone">
          
          {/* 3.1 Chùm sáng hình nón chiếu thẳng đứng từ tâm bệ đài lên 3 bánh răng */}
          <polygon
            points="198,272 242,272 295,140 145,140"
            fill="url(#optical-beam-gradient)"
            className="anim-beam-shimmer"
          />

          {/* Các tia laser quang học thẳng đứng chiếu rọi */}
          <line x1="220" y1="272" x2="220" y2="120" stroke="#FFFFFF" strokeWidth="1.8" className="opacity-80" />
          <line x1="205" y1="272" x2="175" y2="150" stroke="#00F0FF" strokeWidth="1.2" className="opacity-60" />
          <line x1="235" y1="272" x2="265" y2="150" stroke="#00F0FF" strokeWidth="1.2" className="opacity-60" />
          <line x1="212" y1="272" x2="195" y2="135" stroke="#BAE6FD" strokeWidth="0.8" className="opacity-70" />
          <line x1="228" y1="272" x2="245" y2="135" stroke="#BAE6FD" strokeWidth="0.8" className="opacity-70" />

          {/* 3.2 LÕI BÙNG NỔ ÁNH SÁNG QUANG HỌC TẠI TÂM (OPTICAL CORE FLARE) */}
          <g id="optical-core-burst" className="anim-flare-pulse" transform="translate(220, 272)">
            {/* Vầng hào quang bung tỏa tròn */}
            <ellipse cx="0" cy="0" rx="36" ry="12" fill="url(#core-flare-hot)" />
            
            {/* Vệt sáng Lens Flare ngang kéo dài (Đặc trưng Optical Flare) */}
            <ellipse cx="0" cy="0" rx="90" ry="2" fill="url(#amber-flare-streak)" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="55" ry="3.5" fill="url(#amber-flare-streak)" opacity="0.95" />

            {/* Tia sáng sao 4 cánh (Cross Flare Rays) */}
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-18" y1="-6" x2="18" y2="6" stroke="#FBBF24" strokeWidth="1.2" />
            <line x1="-18" y1="6" x2="18" y2="-6" stroke="#FBBF24" strokeWidth="1.2" />

            {/* Điểm trắng trung tâm cực sáng */}
            <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" filter="url(#neon-cyan-glow)" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 4: CỤM 3 BÁNH RĂNG NEON CYAN 3D ĐỈNH CAO (STUDIO 3-GEAR HOLOGRAM)     */}
        {/* ========================================================================= */}
        <g id="gear-cluster-hologram" className="anim-gear-group">
          
          {/* ----------------------------------------------------------------- */}
          {/* BÁNH RĂNG 1: TRÊN ĐỈNH (TOP GEAR)                                 */}
          {/* Tâm: (220, 115) - Xoay thuận chiều kim đồng hồ (+360°) trong 12s  */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(220, 115)">
            <g>
              {/* Thân bánh răng Neon Cyan phát sáng rực rỡ */}
              <path
                d={gearPath}
                fill="url(#gear-neon-cyan)"
                stroke="url(#gear-edge-glow)"
                strokeWidth="1.8"
                filter="url(#gear-intense-glow)"
                fillRule="evenodd"
              />

              {/* Vành gờ phản quang ánh kim cương sáng bóng */}
              <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.85" />
              <circle cx="0" cy="0" r="20" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="4 2" fill="none" opacity="0.7" />

              {/* 4 Nan hoa rãnh kỹ thuật kết nối tâm */}
              <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

              {/* Trục xoay trung tâm với viền phát sáng */}
              <circle cx="0" cy="0" r="7" fill="#0369A1" stroke="#00F0FF" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

              {/* Chuyển động xoay mượt mà 60fps thuận chiều kim đồng hồ */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ----------------------------------------------------------------- */}
          {/* BÁNH RĂNG 2: DƯỚI TRÁI (BOTTOM-LEFT GEAR)                         */}
          {/* Tâm: (169, 166) - Ăn khớp chuẩn Bánh 1 - Xoay ngược (-360°) 12s   */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(169, 166)">
            <g>
              <path
                d={gearPath}
                fill="url(#gear-neon-cyan)"
                stroke="url(#gear-edge-glow)"
                strokeWidth="1.8"
                filter="url(#gear-intense-glow)"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.85" />
              <circle cx="0" cy="0" r="20" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="4 2" fill="none" opacity="0.7" />

              <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

              <circle cx="0" cy="0" r="7" fill="#0369A1" stroke="#00F0FF" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

              {/* Chuyển động xoay mượt mà 60fps ngược chiều kim đồng hồ, pha -22.5° */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-22.5 0 0"
                to="-382.5 0 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          {/* ----------------------------------------------------------------- */}
          {/* BÁNH RĂNG 3: DƯỚI PHẢI (BOTTOM-RIGHT GEAR)                        */}
          {/* Tâm: (271, 166) - Ăn khớp chuẩn Bánh 1 - Xoay ngược (-360°) 12s   */}
          {/* ----------------------------------------------------------------- */}
          <g transform="translate(271, 166)">
            <g>
              <path
                d={gearPath}
                fill="url(#gear-neon-cyan)"
                stroke="url(#gear-edge-glow)"
                strokeWidth="1.8"
                filter="url(#gear-intense-glow)"
                fillRule="evenodd"
              />

              <circle cx="0" cy="0" r="22" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.85" />
              <circle cx="0" cy="0" r="20" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="4 2" fill="none" opacity="0.7" />

              <line x1="-14" y1="0" x2="-22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="14" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="-14" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
              <line x1="0" y1="14" x2="0" y2="22" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

              <circle cx="0" cy="0" r="7" fill="#0369A1" stroke="#00F0FF" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

              {/* Chuyển động xoay mượt mà 60fps ngược chiều kim đồng hồ, pha +22.5° */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="22.5 0 0"
                to="-337.5 0 0"
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
