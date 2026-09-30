import React from 'react';

/**
 * 🌐 OPTICAL CRYSTAL QUANTUM DATA CORE (LEFT HERO EMBLEM)
 * 
 * Phong cách Pha lê Quang học & Tinh tế Đỉnh cao (Ultra-Refined Optical Crystal):
 * - Khối Lập phương Đa diện Pha lê Kính mờ (Translucent Layered Crystal Prism).
 * - Bảng màu trong trẻo, thanh nhã đồng bộ: Kính Bạch Kim (Top Face), Lam Ngọc Khói Sâu (Left Face) & Lam Ngọc Sáng (Right Face).
 * - Lõi Lượng tử Vi mô (Quantum Singularity): Điểm sao phát quang 4 cánh tinh xảo, loại bỏ hoàn toàn mắt thần tối đen nặng nề.
 * - Khối Tesseract đa tầng lồng ghép bên trong với các vi mạch laser thanh mảnh.
 * - Loại bỏ hoàn toàn đĩa tròn đứt nét rời rạc dưới chân; thay bằng bóng đổ mờ quang học nhẹ nhàng, gắn kết tự nhiên.
 * - Hệ 2 vòng đai con quay 3D kim loại chất lỏng uốn lượn mềm mại, sang trọng.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 380 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ GRADIENT TINH TẾ, TRONG TRẺO & SANG TRỌNG 🌟 */}
          
          {/* Mặt Trên: Kính Pha Lê Bạch Kim Trong Suốt (Frosted Crystal Top Face) */}
          <linearGradient id="crystal-face-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F0F9FF" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* Mặt Trái: Lam Ngọc Khói Sâu Trong Trẻo (Smoky Sapphire Left Face) */}
          <linearGradient id="crystal-face-left" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="45%" stopColor="#075985" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Mặt Phải: Lam Ngọc Sáng Bóng (Vibrant Sky Blue Right Face) */}
          <linearGradient id="crystal-face-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#0369A1" />
            <stop offset="85%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>

          {/* Vòng Đai Quỹ Đạo Kim Loại Chất Lỏng (Liquid Platinum Ribbon) */}
          <linearGradient id="crystal-liquid-ribbon" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#BAE6FD" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Vành vát kim cương phản quang ánh sáng trắng (Gleam Edge) */}
          <linearGradient id="crystal-gleam-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
          </linearGradient>

          {/* Đĩa phản chiếu ánh sáng êm dịu nâng đỡ khối */}
          <radialGradient id="crystal-ground-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.06" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Bộ lọc bóng đổ mềm mại */}
          <filter id="crystal-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.10" />
          </filter>
        </defs>

        <style>{`
          @keyframes crystal-prism-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(0.3deg); }
          }
          @keyframes crystal-ambient-breathe {
            0%, 100% { opacity: 0.75; transform: scale(1); }
            50% { opacity: 0.95; transform: scale(1.04); }
          }
          @keyframes star-singularity-pulse {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.15); opacity: 1; }
          }
          .anim-crystal-float { animation: crystal-prism-float 6s ease-in-out infinite; }
          .anim-ambient-breathe-left { animation: crystal-ambient-breathe 4s ease-in-out infinite; transform-origin: 190px 195px; }
          .anim-star-pulse { animation: star-singularity-pulse 3s ease-in-out infinite; transform-origin: 0 0; }
        `}</style>

        {/* ========================================================================= */}
        {/* VÙNG NÂNG ĐỠ QUANG HỌC DƯỚI CHÂN (GROUNDING AMBIENT OCCLUSION)            */}
        {/* ========================================================================= */}
        <g id="grounding-ambient-left" transform="translate(190, 195)">
          <ellipse cx="0" cy="0" rx="84" ry="16" fill="url(#crystal-ground-ambient)" className="anim-ambient-breathe-left" />
          
          {/* Vạch đo lường vi lượng tử tinh tế */}
          <ellipse cx="0" cy="0" rx="72" ry="13" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="48" ry="8.5" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.25" />
          <circle cx="-72" cy="0" r="1.5" fill="#FFFFFF" opacity="0.7" />
          <circle cx="72" cy="0" r="1.5" fill="#0284C7" opacity="0.7" />
        </g>

        {/* ========================================================================= */}
        {/* KHỐI CHÍNH: KHỐI LẬP PHƯƠNG PHA LÊ QUANG HỌC (OPTICAL CRYSTAL PRISM)      */}
        {/* ========================================================================= */}
        <g className="anim-crystal-float" filter="url(#crystal-soft-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 1: NGHIÊNG TRỤC TRÁI -24° */}
          <g transform="translate(190, 122) rotate(-24)">
            <ellipse
              cx="0"
              cy="0"
              rx="92"
              ry="33"
              stroke="url(#crystal-liquid-ribbon)"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="45 15 25 15"
              opacity="0.7"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="90"
              ry="31.5"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              fill="none"
              opacity="0.8"
            />
            <circle cx="92" cy="0" r="2.2" fill="#FFFFFF" />
          </g>

          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 2: NGHIÊNG TRỤC PHẢI +32° */}
          <g transform="translate(190, 122) rotate(32)">
            <ellipse
              cx="0"
              cy="0"
              rx="92"
              ry="33"
              stroke="#0284C7"
              strokeWidth="1"
              fill="none"
              strokeDasharray="35 20 20 20"
              opacity="0.4"
            />
            <circle cx="-92" cy="0" r="2" fill="#38BDF8" />
          </g>

          {/* KHỐI LẬP PHƯƠNG PHA LÊ QUANG HỌC (ISOMETRIC CRYSTAL MONOLITH) */}
          <g transform="translate(190, 122)">
            
            {/* MẶT TRÊN: BỀ MẶT KÍNH PHA LÊ BẠCH KIM (Top Frosted Glass Face) */}
            <polygon
              points="0,-52 46,-26 0,0 -46,-26"
              fill="url(#crystal-face-top)"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            {/* Viền vát kim cương mặt trên phản chiếu ánh sáng */}
            <polygon
              points="0,-48 42,-24 0,0 -42,-24"
              fill="none"
              stroke="url(#crystal-gleam-edge)"
              strokeWidth="0.8"
              opacity="0.9"
            />

            {/* MẶT TRÁI: LAM NGỌC KHÓI SÂU (Left Smoky Sapphire Face) */}
            <polygon
              points="-46,-26 0,0 0,52 -46,26"
              fill="url(#crystal-face-left)"
              stroke="#0369A1"
              strokeWidth="1"
            />
            {/* Vi mạch laser thanh mảnh */}
            <line x1="-34" y1="-17" x2="-6" y2="-2" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2.5" opacity="0.7" />
            <line x1="-34" y1="-2" x2="-6" y2="13" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2.5" opacity="0.7" />
            <line x1="-34" y1="13" x2="-6" y2="28" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 2.5" opacity="0.7" />

            {/* MẶT PHẢI: LAM NGỌC SÁNG BÓNG (Right Vibrant Sapphire Face) */}
            <polygon
              points="0,0 46,-26 46,26 0,52"
              fill="url(#crystal-face-right)"
              stroke="#0284C7"
              strokeWidth="1"
            />
            {/* Phản xạ ánh sáng vi mô trên mặt phải */}
            <line x1="6" y1="-2" x2="34" y2="-17" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="4 2.5" opacity="0.75" />
            <line x1="6" y1="13" x2="34" y2="-2" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="4 2.5" opacity="0.75" />
            <line x1="6" y1="28" x2="34" y2="13" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="4 2.5" opacity="0.75" />

            {/* CẠNH SỐNG TRUNG TÂM PHẢN QUANG SẮC LẸM (Center Ridge Specular) */}
            <line x1="0" y1="0" x2="0" y2="52" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="-46" y1="-26" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0" y1="0" x2="46" y2="-26" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

            {/* KHỐI TESSERACT LỒNG GHÉP BÊN TRONG (INNER CRYSTAL TESSERACT) */}
            <g transform="scale(0.55)">
              <polygon
                points="0,-48 42,-24 0,0 -42,-24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeDasharray="4 2.5"
                opacity="0.85"
              />
              <polygon
                points="-42,-24 0,0 0,48 -42,24"
                fill="none"
                stroke="#BAE6FD"
                strokeWidth="1"
                opacity="0.75"
              />
              <polygon
                points="0,0 42,-24 42,24 0,48"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1"
                opacity="0.75"
              />
            </g>

            {/* LÕI LƯỢNG TỬ ĐIỂM SAO AI PHÁT QUANG (QUANTUM SINGULARITY MICRO-STAR) */}
            <g id="ai-singularity-star" className="anim-star-pulse" transform="translate(0, 0)">
              {/* Vòng hào quang nhỏ trong suốt */}
              <circle cx="0" cy="0" r="10" fill="#0C4A6E" stroke="url(#crystal-liquid-ribbon)" strokeWidth="1.2" opacity="0.9" />
              <circle cx="0" cy="0" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
              
              {/* Điểm sao phát quang 4 cánh siêu tinh tế */}
              <line x1="-4" y1="0" x2="4" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
