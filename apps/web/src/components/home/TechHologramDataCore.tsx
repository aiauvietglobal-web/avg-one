import React from 'react';

/**
 * 🌐 1000R CURVED OLED DISPLAY: QUANTUM DATA CORE (LEFT HERO COMPONENT)
 * 
 * Thiết kế Màn Hình Cong Công Nghệ Cao 1000R Đồng Bộ Hoàn Hảo Với Màn Hình Phải:
 * - Khung màn hình cong vật lý (Curved OLED Bezel) với độ cong 1000R đối xứng.
 * - Mặt kính cong phản chiếu quang học (Cylindrical Glass Caustics & Reflection Arcs).
 * - Lưới hiển thị không gian mạng uốn lượn theo độ cong hình trụ (Curved Perspective Cyber Grid).
 * - Buồng lượng tử chiều sâu: Khối Lập Phương Lượng Tử Pha Lê 3D (Grand Crystal Monolith) lơ lửng,
 *   phát quang lõi AI Tesseract đa chiều và vòng quỹ đạo kim loại chất lỏng.
 * - Tối giản, thanh lịch, đồng bộ 100% tỷ lệ với Cụm Bánh Răng bên phải.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  // Khung màn hình cong 1000R chuẩn xác (Hình trụ uốn cong đều, đồng bộ màn hình phải)
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
          
          {/* Mặt nền OLED cong */}
          <radialGradient id="curved-oled-surface-left" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#08203E" />
            <stop offset="45%" stopColor="#051326" />
            <stop offset="80%" stopColor="#020813" />
            <stop offset="100%" stopColor="#010408" />
          </radialGradient>

          {/* Vầng sáng năng lượng rực rỡ bên trong màn hình cong */}
          <radialGradient id="curved-core-glow-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Khung viền kim loại màn hình cong */}
          <linearGradient id="curved-chassis-bezel-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="75%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Viền phát quang Neon Cyan chạy quanh mép màn hình cong */}
          <linearGradient id="curved-neon-rim-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Vệt phản quang ánh sáng cong uốn lượn qua mặt kính */}
          <linearGradient id="curved-glass-sheen-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.02" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.16" />
          </linearGradient>

          {/* Mặt Trên Lập Phương: Kính Tinh Thể Bạch Kim */}
          <linearGradient id="monolith-face-top-curved" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F0F9FF" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* Mặt Trái Lập Phương: Lam Ngọc Khói Sâu */}
          <linearGradient id="monolith-face-left-curved" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="40%" stopColor="#075985" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Mặt Phải Lập Phương: Lam Ngọc Sáng Bóng */}
          <linearGradient id="monolith-face-right-curved" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#0369A1" />
            <stop offset="85%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>

          {/* Vòng Đai Quỹ Đạo Kim Loại Chất Lỏng */}
          <linearGradient id="liquid-ribbon-curved" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#BAE6FD" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Cạnh Sống Vát Kim Cương Phản Quang Sắc Lẹm */}
          <linearGradient id="monolith-gleam-edge-curved" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
          </linearGradient>

          {/* Bộ lọc bóng đổ màn hình cong */}
          <filter id="curved-monitor-shadow-left" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.22" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.25" />
          </filter>

          <filter id="curved-monolith-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.65" />
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#38BDF8" floodOpacity="0.35" />
          </filter>
        </defs>

        <style>{`
          @keyframes curved-monolith-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(0.3deg); }
          }
          @keyframes curved-energy-pulse-left {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.08); opacity: 1; }
          }
          @keyframes star-pulse-curved {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.15); opacity: 1; }
          }
          @keyframes curved-sheen-sweep-left {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .anim-curved-monolith { animation: curved-monolith-float 6s ease-in-out infinite; }
          .anim-curved-energy-left { animation: curved-energy-pulse-left 4s ease-in-out infinite; transform-origin: 220px 145px; }
          .anim-star-curved { animation: star-pulse-curved 3s ease-in-out infinite; transform-origin: 0 0; }
          .anim-curved-sheen-left { animation: curved-sheen-sweep-left 5s ease-in-out infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: KHUNG VỎ & MẶT HIỂN THỊ MÀN HÌNH CONG 1000R (CURVED OLED MONITOR)   */}
        {/* ========================================================================= */}
        <g id="curved-display-chassis-left" filter="url(#curved-monitor-shadow-left)">
          
          {/* 1.1 Thân Vỏ Màn Hình Cong (Chassis Rim) */}
          <path
            d={curvedScreenOutline}
            fill="url(#curved-oled-surface-left)"
            stroke="url(#curved-chassis-bezel-left)"
            strokeWidth="3.5"
          />

          {/* 1.2 Viền Neon Cyan phát quang dọc mép màn hình cong */}
          <path
            d={curvedScreenOutline}
            stroke="url(#curved-neon-rim-left)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* 1.3 Lưới Phối Cảnh Uốn Cong 1000R Theo Mặt Trụ */}
          <g opacity="0.22">
            <path d="M 20 80 Q 220 96 420 80" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
            <path d="M 16 145 Q 220 161 424 145" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 6" fill="none" />
            <path d="M 20 210 Q 220 226 420 210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />

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
            <ellipse cx="0" cy="0" rx="145" ry="85" fill="url(#curved-core-glow-left)" className="anim-curved-energy-left" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CỤM LÕI LƯỢNG TỬ PHA LÊ 3D TRUNG TÂM (SCALE 1.16X TƯƠNG ĐỒNG BÊN PHẢI) */}
        {/* ========================================================================= */}
        <g transform="translate(220, 145) scale(1.16) translate(-220, -145)">
          <g className="anim-curved-monolith" filter="url(#curved-monolith-shadow)">
            
            {/* VÒNG ĐAI QUỸ ĐẠO BẠCH KIM BẢO VỆ LÕI */}
            <g transform="translate(220, 145) rotate(16)">
              <ellipse
                cx="0"
                cy="0"
                rx="102"
                ry="38"
                stroke="url(#liquid-ribbon-curved)"
                strokeWidth="1.6"
                fill="none"
              />
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
              <circle cx="98" cy="0" r="2.5" fill="#38BDF8" />
            </g>

            {/* KHỐI LẬP PHƯƠNG PHA LÊ BỀ THẾ */}
            <g transform="translate(220, 145)">
              
              {/* MẶT TRÊN: BỀ MẶT KÍNH PHA LÊ BẠCH KIM */}
              <polygon
                points="0,-54 48,-27 0,0 -48,-27"
                fill="url(#monolith-face-top-curved)"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              {/* Viền vát kim cương mặt trên */}
              <polygon
                points="0,-50 44,-25 0,0 -44,-25"
                fill="none"
                stroke="url(#monolith-gleam-edge-curved)"
                strokeWidth="1"
                opacity="0.95"
              />

              {/* MẶT TRÁI: LAM NGỌC KHÓI SÂU */}
              <polygon
                points="-48,-27 0,0 0,54 -48,27"
                fill="url(#monolith-face-left-curved)"
                stroke="#0369A1"
                strokeWidth="1.2"
              />
              <line x1="-36" y1="-18" x2="-8" y2="-2" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />
              <line x1="-36" y1="-2" x2="-8" y2="14" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />
              <line x1="-36" y1="14" x2="-8" y2="30" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />

              {/* MẶT PHẢI: LAM NGỌC SÁNG BÓNG */}
              <polygon
                points="0,0 48,-27 48,27 0,54"
                fill="url(#monolith-face-right-curved)"
                stroke="#0284C7"
                strokeWidth="1.2"
              />
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
              <g id="ai-singularity-star-curved" className="anim-star-curved" transform="translate(0, 0)">
                <circle cx="0" cy="0" r="11" fill="#0C4A6E" stroke="url(#liquid-ribbon-curved)" strokeWidth="1.4" opacity="0.9" />
                <circle cx="0" cy="0" r="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.9" />
                
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
              </g>
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: VỆT PHẢN QUANG MẶT KÍNH CONG (CYLINDRICAL GLASS SHEEN SWEEP)       */}
        {/* ========================================================================= */}
        <path
          d={curvedScreenOutline}
          fill="url(#curved-glass-sheen-left)"
          className="anim-curved-sheen-left pointer-events-none"
        />
      </svg>
    </div>
  );
};
