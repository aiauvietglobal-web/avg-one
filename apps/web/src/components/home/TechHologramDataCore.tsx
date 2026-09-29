import React from 'react';

/**
 * 🌐 STUDIO 3D HOLOGRAM QUANTUM DATA CORE (LEFT SIDE)
 * 
 * Thiết kế đối xứng hoàn mỹ 100% với Bánh Răng bên phải theo phong cách Studio Optical Hologram:
 * - Khối Lập Phương Lượng Tử 3D Neon Cyan (Holographic Quantum Hypercube) kết hợp Lõi Năng Lượng AI lơ lửng.
 * - Hệ 2 Vòng Đai Con Quay Quỹ Đạo 3D (Gyroscopic Orbital Rings) xoay 3D mềm mại với hạt photon chuyển động.
 * - Bệ đài elip 3D công nghệ cao đa tầng (Multi-tier Hologram Pedestal) đồng bộ tuyệt đối với bên phải.
 * - Lõi ánh sáng quang học bùng nổ từ tâm (Optical Core Flare: Trắng rực rỡ + Tia cam hổ phách).
 * - Chùm sáng nón quang học (Optical Beam) chiếu thẳng đứng nâng đỡ Khối Lập Phương.
 * - Hệ thống 6 Node vệ tinh dữ liệu phát sáng tròn trịa (Cloud, Shield Security, Database, Server Cluster, Data Analytics, Quantum Chip).
 * - Đường mạch điện tử PCB Cyber Traces nối các node về bệ đài trung tâm.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
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

          {/* Gradient Bề Mặt Lập Phương Neon Cyan (Holographic Glass Facet) */}
          <linearGradient id="cube-face-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#E0F2FE" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="cube-face-left" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#0369A1" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#0EA5E9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="cube-face-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.9" />
          </linearGradient>

          {/* Gradient Chùm Sáng Nón Quang Học Chiếu Đứng */}
          <linearGradient id="core-beam-gradient" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="20%" stopColor="#00F0FF" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="85%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </linearGradient>

          {/* Radial Gradient Tâm Bùng Nổ Ánh Sáng (Optical Core Flare Burst) */}
          <radialGradient id="core-flare-hot-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#F97316" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </radialGradient>

          {/* Radial Gradient Hào Quang Đĩa Node Vệ Tinh */}
          <radialGradient id="satellite-pad-glow-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#0369A1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Tia sáng Hổ phách quang học ngang */}
          <linearGradient id="amber-flare-streak-left" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
            <stop offset="30%" stopColor="#FB923C" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>

          {/* Bộ lọc Neon Glow */}
          <filter id="neon-cyan-glow-left" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cube-intense-glow" x="-40%" y="-40%" width="180%" height="180%">
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
          @keyframes studio-cube-levitate {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-7px) rotate(0.5deg); }
          }
          @keyframes optical-flare-pulse-left {
            0%, 100% { opacity: 0.9; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.08); }
          }
          @keyframes light-beam-shimmer-left {
            0%, 100% { opacity: 0.75; }
            50% { opacity: 0.95; }
          }
          @keyframes inner-core-breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.12); }
          }
          .anim-cube-group { animation: studio-cube-levitate 5s ease-in-out infinite; }
          .anim-flare-pulse-left { animation: optical-flare-pulse-left 3s ease-in-out infinite; transform-origin: 220px 272px; }
          .anim-beam-shimmer-left { animation: light-beam-shimmer-left 4s ease-in-out infinite; }
          .anim-inner-core { animation: inner-core-breathe 3.5s ease-in-out infinite; transform-origin: 0 0; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: BỆ ĐÀI CÔNG NGHỆ ELIP 3D ĐA TẦNG (MULTI-TIER 3D PEDESTAL)         */}
        {/* ========================================================================= */}
        <g id="pedestal-base-left">
          
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

          {/* Vạch nan hoa HUD công nghệ ngoại vi */}
          {[-70, -50, -30, -10, 10, 30, 50, 70].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 220 + 172 * Math.sin(rad);
            const y1 = 272 + 50 * Math.cos(rad);
            const x2 = 220 + 185 * Math.sin(rad);
            const y2 = 272 + 54 * Math.cos(rad);
            return (
              <line
                key={`base-tick-left-${i}`}
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

          {/* 1.2 Vành đai Radar công nghệ HUD */}
          <g transform="translate(220, 272)">
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
            <circle cx="-140" cy="0" r="2.2" fill="#00F0FF" filter="url(#neon-cyan-glow-left)" />
            <circle cx="140" cy="0" r="2.2" fill="#00F0FF" filter="url(#neon-cyan-glow-left)" />
            <circle cx="0" cy="-40" r="1.8" fill="#FFFFFF" />
            <circle cx="0" cy="40" r="1.8" fill="#FFFFFF" />
          </g>

          {/* 1.3 Vành đài phát sáng chính (Main Radiant Neon Cyan Ring) */}
          <g transform="translate(220, 272)">
            <ellipse
              cx="0"
              cy="0"
              rx="106"
              ry="30"
              stroke="#00F0FF"
              strokeWidth="2.8"
              fill="none"
              filter="url(#neon-cyan-glow-left)"
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

          {/* 1.4 Vành nan hoa phân đoạn bên trong */}
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
        <g id="satellite-ecosystem-left">
          
          {/* --- ĐƯỜNG MẠCH PCB NỐI TỪ BỆ ĐÀI ĐẾN CÁC NODE --- */}
          {/* Nhánh 1: Tới Node Cloud (Top-Left: 58, 205) */}
          <path
            d="M 145 258 L 95 240 L 58 220 L 58 205"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="95" cy="240" r="1.8" fill="#00F0FF" />

          {/* Nhánh 2: Tới Node Shield Security (Mid-Left: 122, 160) */}
          <path
            d="M 165 245 L 122 220 L 122 172"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="122" cy="220" r="1.8" fill="#00F0FF" />

          {/* Nhánh 3: Tới Node Database (Bottom-Left: 68, 280) */}
          <path
            d="M 115 272 L 88 280 L 68 280"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="88" cy="280" r="1.8" fill="#00F0FF" />

          {/* Nhánh 4: Tới Node Server Cluster (Mid-Right: 318, 160) */}
          <path
            d="M 275 245 L 318 220 L 318 172"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="318" cy="220" r="1.8" fill="#00F0FF" />

          {/* Nhánh 5: Tới Node Analytics Chart (Top-Right: 382, 205) */}
          <path
            d="M 295 258 L 345 240 L 382 220 L 382 205"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="345" cy="240" r="1.8" fill="#00F0FF" />

          {/* Nhánh 6: Tới Node Quantum Chip (Bottom-Right: 372, 280) */}
          <path
            d="M 325 272 L 352 280 L 372 280"
            stroke="#00F0FF"
            strokeWidth="1.4"
            fill="none"
            className="opacity-75"
          />
          <circle cx="352" cy="280" r="1.8" fill="#00F0FF" />

          {/* --- 6 NODE VỆ TINH PHÁT SÁNG --- */}

          {/* ☁️ NODE 1: ĐÁM MÂY DỮ LIỆU CLOUD (TOP-LEFT: 58, 205) */}
          <g id="sat-cloud" transform="translate(58, 205)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow-left)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow-left)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            <g transform="translate(-10, -22) scale(0.85)">
              <path
                d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                fill="#00F0FF"
                filter="url(#neon-cyan-glow-left)"
              />
              <path d="M12 12v4M10 14l2-2 2 2" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* 🛡️ NODE 2: LÁ CHẮN AN NINH & BẢO MẬT (MID-LEFT: 122, 160) */}
          <g id="sat-shield" transform="translate(122, 160)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow-left)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow-left)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            <g transform="translate(-9, -22) scale(0.8)">
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                fill="#00F0FF"
                filter="url(#neon-cyan-glow-left)"
              />
              <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* 🗄️ NODE 3: CƠ SỞ DỮ LIỆU DATABASE (BOTTOM-LEFT: 68, 280) */}
          <g id="sat-database" transform="translate(68, 280)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow-left)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow-left)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            <g transform="translate(-10, -21) scale(0.8)">
              <ellipse cx="12" cy="5" rx="9" ry="3" fill="#00F0FF" filter="url(#neon-cyan-glow-left)" />
              <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <ellipse cx="12" cy="5" rx="4" ry="1.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* 🖥️ NODE 4: CỤM MÁY CHỦ SERVER (MID-RIGHT: 318, 160) */}
          <g id="sat-server" transform="translate(318, 160)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow-left)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow-left)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            <g transform="translate(-10, -22) scale(0.8)">
              <rect x="2" y="2" width="20" height="8" rx="2" fill="#00F0FF" filter="url(#neon-cyan-glow-left)" />
              <rect x="2" y="14" width="20" height="8" rx="2" fill="#00F0FF" filter="url(#neon-cyan-glow-left)" />
              <line x1="6" y1="6" x2="6.01" y2="6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="18" x2="6.01" y2="18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="10" y1="6" x2="18" y2="6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="10" y1="18" x2="18" y2="18" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>

          {/* 📊 NODE 5: PHÂN TÍCH DỮ LIỆU ANALYTICS (TOP-RIGHT: 382, 205) */}
          <g id="sat-analytics" transform="translate(382, 205)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow-left)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow-left)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            <g transform="translate(-10, -22) scale(0.85)">
              <line x1="18" y1="20" x2="18" y2="10" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-cyan-glow-left)" />
              <line x1="12" y1="20" x2="12" y2="4" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-cyan-glow-left)" />
              <line x1="6" y1="20" x2="6" y2="14" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-cyan-glow-left)" />
              <path d="M4 11l6-5 4 4 6-6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>

          {/* ⚛️ NODE 6: VI XỬ LÝ LƯỢNG TỬ AI (BOTTOM-RIGHT: 372, 280) */}
          <g id="sat-quantum-chip" transform="translate(372, 280)">
            <ellipse cx="0" cy="5" rx="19" ry="6.5" fill="url(#satellite-pad-glow-left)" />
            <ellipse cx="0" cy="5" rx="15" ry="5" stroke="#00F0FF" strokeWidth="1.4" fill="none" filter="url(#neon-cyan-glow-left)" />
            <ellipse cx="0" cy="5" rx="7" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            <g transform="translate(-10, -21) scale(0.85)">
              <rect x="4" y="4" width="16" height="16" rx="2" fill="#00F0FF" filter="url(#neon-cyan-glow-left)" />
              <rect x="8" y="8" width="8" height="8" rx="1" fill="#FFFFFF" />
              <line x1="9" y1="1" x2="9" y2="4" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="15" y1="1" x2="15" y2="4" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="9" y1="20" x2="9" y2="23" stroke="#FFFFFF" strokeWidth="1.4" />
              <line x1="15" y1="20" x2="15" y2="23" stroke="#FFFFFF" strokeWidth="1.4" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: CHÙM SÁNG NÓN QUANG HỌC & LÕI BÙNG NỔ ÁNH SÁNG TỪ TÂM             */}
        {/* ========================================================================= */}
        <g id="optical-light-cone-left">
          
          {/* Chùm sáng hình nón chiếu thẳng đứng từ tâm bệ đài lên khối lập phương */}
          <polygon
            points="198,272 242,272 295,140 145,140"
            fill="url(#core-beam-gradient)"
            className="anim-beam-shimmer-left"
          />

          {/* Các tia laser quang học thẳng đứng chiếu rọi */}
          <line x1="220" y1="272" x2="220" y2="120" stroke="#FFFFFF" strokeWidth="1.8" className="opacity-80" />
          <line x1="205" y1="272" x2="175" y2="150" stroke="#00F0FF" strokeWidth="1.2" className="opacity-60" />
          <line x1="235" y1="272" x2="265" y2="150" stroke="#00F0FF" strokeWidth="1.2" className="opacity-60" />
          <line x1="212" y1="272" x2="195" y2="135" stroke="#BAE6FD" strokeWidth="0.8" className="opacity-70" />
          <line x1="228" y1="272" x2="245" y2="135" stroke="#BAE6FD" strokeWidth="0.8" className="opacity-70" />

          {/* LÕI BÙNG NỔ ÁNH SÁNG QUANG HỌC TẠI TÂM (OPTICAL CORE FLARE) */}
          <g id="optical-core-burst-left" className="anim-flare-pulse-left" transform="translate(220, 272)">
            <ellipse cx="0" cy="0" rx="36" ry="12" fill="url(#core-flare-hot-left)" />
            <ellipse cx="0" cy="0" rx="90" ry="2" fill="url(#amber-flare-streak-left)" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="55" ry="3.5" fill="url(#amber-flare-streak-left)" opacity="0.95" />

            <line x1="-30" y1="0" x2="30" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-18" y1="-6" x2="18" y2="6" stroke="#FBBF24" strokeWidth="1.2" />
            <line x1="-18" y1="6" x2="18" y2="-6" stroke="#FBBF24" strokeWidth="1.2" />

            <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" filter="url(#neon-cyan-glow-left)" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 4: KHỐI LẬP PHƯƠNG LƯỢNG TỬ NEON CYAN 3D & LÕI AI (STUDIO DATA CORE) */}
        {/* ========================================================================= */}
        <g id="quantum-core-hologram" className="anim-cube-group">
          
          {/* 4.1 HỆ THỐNG VÒNG ĐAI CON QUAY QUỸ ĐẠO 3D (GYROSCOPIC ORBITAL RINGS) */}
          <g id="gyro-orbital-rings" transform="translate(220, 142)">
            {/* Vòng đai 1: Nghiêng trục trái -30° */}
            <g transform="rotate(-28)">
              <ellipse
                cx="0"
                cy="0"
                rx="85"
                ry="30"
                stroke="#00F0FF"
                strokeWidth="1.8"
                fill="none"
                strokeDasharray="50 15 25 15"
                filter="url(#neon-cyan-glow-left)"
                className="opacity-80"
              />
              <circle cx="85" cy="0" r="2.2" fill="#FFFFFF" />
            </g>

            {/* Vòng đai 2: Nghiêng trục phải +35° */}
            <g transform="rotate(35)">
              <ellipse
                cx="0"
                cy="0"
                rx="85"
                ry="30"
                stroke="#38BDF8"
                strokeWidth="1.6"
                fill="none"
                strokeDasharray="40 20 30 20"
                className="opacity-75"
              />
              <circle cx="-85" cy="0" r="2.2" fill="#00F0FF" />
            </g>
          </g>

          {/* 4.2 KHỐI LẬP PHƯƠNG LƯỢNG TỬ 3D NGUYÊN KHỐI PHÁT QUANG (ISOMETRIC QUANTUM CUBE) */}
          <g id="hypercube-faces" transform="translate(220, 142)">
            
            {/* MẶT TRÊN (TOP FACE) */}
            <polygon
              points="0,-52 46,-26 0,0 -46,-26"
              fill="url(#cube-face-top)"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              filter="url(#cube-intense-glow)"
            />
            {/* Viền kim cương lấp lánh mặt trên */}
            <polygon
              points="0,-48 42,-24 0,0 -42,-24"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1"
              strokeDasharray="8 4"
              opacity="0.9"
            />

            {/* MẶT TRÁI (LEFT FACE) */}
            <polygon
              points="-46,-26 0,0 0,52 -46,26"
              fill="url(#cube-face-left)"
              stroke="#00F0FF"
              strokeWidth="1.8"
              filter="url(#cube-intense-glow)"
            />
            {/* Đường mạch ma trận dữ liệu trên mặt trái */}
            <line x1="-36" y1="-18" x2="-6" y2="-2" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />
            <line x1="-36" y1="-2" x2="-6" y2="14" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />
            <line x1="-36" y1="14" x2="-6" y2="30" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />

            {/* MẶT PHẢI (RIGHT FACE) */}
            <polygon
              points="0,0 46,-26 46,26 0,52"
              fill="url(#cube-face-right)"
              stroke="#00F0FF"
              strokeWidth="1.8"
              filter="url(#cube-intense-glow)"
            />
            {/* Đường mạch ma trận dữ liệu trên mặt phải */}
            <line x1="6" y1="-2" x2="36" y2="-18" stroke="#38BDF8" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />
            <line x1="6" y1="14" x2="36" y2="-2" stroke="#38BDF8" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />
            <line x1="6" y1="30" x2="36" y2="14" stroke="#38BDF8" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />

            {/* CẠNH SỐNG TRUNG TÂM PHẢN QUANG SẮC NÉT (Center Specular Ridge) */}
            <line x1="0" y1="0" x2="0" y2="52" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="-46" y1="-26" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="0" x2="46" y2="-26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

            {/* 4.3 KHỐI LẬP PHƯƠNG CON LỒNG BÊN TRONG (INNER FLOATING QUANTUM TESSERACT) */}
            <g transform="scale(0.55)">
              <polygon
                points="0,-48 42,-24 0,0 -42,-24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeDasharray="6 3"
              />
              <polygon
                points="-42,-24 0,0 0,48 -42,24"
                fill="none"
                stroke="#BAE6FD"
                strokeWidth="1.4"
              />
              <polygon
                points="0,0 42,-24 42,24 0,48"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1.4"
              />
            </g>

            {/* 4.4 LÕI NĂNG LƯỢNG TRÍ TUỆ NHÂN TẠO AI (CENTRAL NEURAL CORE SPHERE) */}
            <g id="ai-neural-core" className="anim-inner-core">
              <circle cx="0" cy="0" r="12" fill="#0C4A6E" stroke="#00F0FF" strokeWidth="1.8" filter="url(#neon-cyan-glow-left)" />
              <circle cx="0" cy="0" r="7" fill="#00F0FF" />
              <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
