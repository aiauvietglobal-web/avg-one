import React from 'react';

/**
 * 🌐 ULTRA-MODERN QUANTUM DATA CORE (LEFT HERO EMBLEM)
 * 
 * Phong cách Thiết kế Công nghệ Cao cấp 2026 (Modern High-End Luxury Tech):
 * - Tương phản cực cao trên nền sáng (High Contrast Navy & Titanium Chrome, không nhợt nhạt, không chói mắt).
 * - Khối Lập Phương Lượng Tử 3D Titan & Kính Tinh Thể (Precision Diamond-Cut Monolith) lơ lửng không trọng lực.
 * - Hệ vòng đai kim loại chất lỏng (Liquid Platinum Gyroscopic Ring) lượn quanh mượt mà, sang trọng.
 * - Lõi năng lượng AI sắc nét tỏa sáng nhịp thở nhẹ.
 * - Loại bỏ hoàn toàn bệ đài rối rắm, chùm sáng mờ nhạt và dây nhợ vụn vặt; đồng bộ hoàn hảo với cỗ máy bánh răng bên phải.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 380 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 HỆ GRADIENT KIM LOẠI TITAN & COBALT SANG TRỌNG (HIGH CONTRAST) */}
          
          {/* Mặt Trên Lập Phương: Kính Tinh Thể Bạch Kim (Brushed Specular Platinum Face) */}
          <linearGradient id="monolith-face-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F1F5F9" />
            <stop offset="65%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Mặt Trái Lập Phương: Titan Khói Sâu (Smoked Deep Titanium Face) */}
          <linearGradient id="monolith-face-left" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="45%" stopColor="#1E293B" />
            <stop offset="80%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Mặt Phải Lập Phương: Xanh Coban Titan Sâu (Deep Cobalt Titanium Face) */}
          <linearGradient id="monolith-face-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#0369A1" />
            <stop offset="85%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>

          {/* Vòng Đai Quỹ Đạo Kim Loại Chất Lỏng (Liquid Metal Ribbon) */}
          <linearGradient id="liquid-orbit-ribbon" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#BAE6FD" />
            <stop offset="55%" stopColor="#0284C7" />
            <stop offset="85%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Cạnh Sống Vát Kim Cương Phản Quang Sắc Lẹm (Diamond Chamfer Ridge) */}
          <linearGradient id="diamond-edge-bright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>

          {/* Đĩa Phản Chiếu Kính Mờ Đáy (Frosted Reflection Base) */}
          <radialGradient id="frosted-glass-disc-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="85%" stopColor="#0284C7" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Bóng đổ vật lý mềm mại cho khối 3D */}
          <filter id="soft-depth-shadow-left" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.16" />
          </filter>

          <filter id="core-subtle-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.25" />
          </filter>
        </defs>

        <style>{`
          @keyframes monolith-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(0.4deg); }
          }
          @keyframes ambient-pulse-left {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.04); opacity: 1; }
          }
          @keyframes ai-pulse-core {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          .anim-monolith-sculpture { animation: monolith-float 6s ease-in-out infinite; }
          .anim-ambient-pulse-left { animation: ambient-pulse-left 4s ease-in-out infinite; transform-origin: 190px 255px; }
          .anim-ai-pulse { animation: ai-pulse-core 3.5s ease-in-out infinite; transform-origin: 0 0; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG ĐÁY: ĐĨA KÍNH MỜ PHẢN CHIẾU SANG TRỌNG (MINIMALIST LUXURY REFLECTION) */}
        {/* ========================================================================= */}
        <g id="luxury-pedestal-left" transform="translate(190, 255)">
          {/* Đĩa phản chiếu êm ái dưới chân */}
          <ellipse cx="0" cy="0" rx="100" ry="24" fill="url(#frosted-glass-disc-left)" className="anim-ambient-pulse-left" />
          
          {/* Vành định vị chân trời thanh mảnh */}
          <ellipse cx="0" cy="0" rx="88" ry="20" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="60" ry="14" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />

          {/* Các hạt vi tinh thể định vị trên quỹ đạo */}
          <circle cx="-88" cy="0" r="2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="88" cy="0" r="2" fill="#0284C7" opacity="0.7" />
        </g>

        {/* ========================================================================= */}
        {/* KHỐI CHÍNH: KHỐI LẬP PHƯƠNG LƯỢNG TỬ TITAN 3D (QUANTUM MONOLITH SCULPTURE) */}
        {/* ========================================================================= */}
        <g className="anim-monolith-sculpture" filter="url(#soft-depth-shadow-left)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 1: NGHIÊNG TRỤC TRÁI -26° */}
          <g transform="translate(190, 140) rotate(-26)">
            <ellipse
              cx="0"
              cy="0"
              rx="96"
              ry="34"
              stroke="url(#liquid-orbit-ribbon)"
              strokeWidth="2.2"
              fill="none"
              strokeDasharray="55 20 30 20"
              opacity="0.85"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="94"
              ry="32.5"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.9"
            />
            <circle cx="96" cy="0" r="2.8" fill="#FFFFFF" />
          </g>

          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 2: NGHIÊNG TRỤC PHẢI +36° */}
          <g transform="translate(190, 140) rotate(36)">
            <ellipse
              cx="0"
              cy="0"
              rx="96"
              ry="34"
              stroke="#0284C7"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="45 25 25 25"
              opacity="0.5"
            />
            <circle cx="-96" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* KHỐI LẬP PHƯƠNG TITAN NGUYÊN KHỐI (ISOMETRIC TITANIUM MONOLITH) */}
          <g transform="translate(190, 140)" filter="url(#core-subtle-glow)">
            
            {/* MẶT TRÊN: BỀ MẶT BẠCH KIM SÁNG BÓNG (Top Brushed Specular Face) */}
            <polygon
              points="0,-58 50,-29 0,0 -50,-29"
              fill="url(#monolith-face-top)"
              stroke="#CBD5E1"
              strokeWidth="1.4"
            />
            {/* Cạnh vát kim cương mặt trên */}
            <polygon
              points="0,-54 46,-27 0,0 -46,-27"
              fill="none"
              stroke="url(#diamond-edge-bright)"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* MẶT TRÁI: TITAN KHÓI SÂU (Left Smoked Deep Titanium Face) */}
            <polygon
              points="-50,-29 0,0 0,58 -50,29"
              fill="url(#monolith-face-left)"
              stroke="#475569"
              strokeWidth="1.4"
            />
            {/* Các đường phay laser vi mô */}
            <line x1="-38" y1="-20" x2="-6" y2="-2" stroke="#64748B" strokeWidth="1" strokeDasharray="5 3" opacity="0.6" />
            <line x1="-38" y1="-2" x2="-6" y2="16" stroke="#64748B" strokeWidth="1" strokeDasharray="5 3" opacity="0.6" />
            <line x1="-38" y1="16" x2="-6" y2="34" stroke="#64748B" strokeWidth="1" strokeDasharray="5 3" opacity="0.6" />

            {/* MẶT PHẢI: TITAN XANH COBAN SÂU (Right Deep Cobalt Face) */}
            <polygon
              points="0,0 50,-29 50,29 0,58"
              fill="url(#monolith-face-right)"
              stroke="#0369A1"
              strokeWidth="1.4"
            />
            {/* Phản xạ ánh kim cobalt trên mặt phải */}
            <line x1="6" y1="-2" x2="38" y2="-20" stroke="#38BDF8" strokeWidth="1" strokeDasharray="5 3" opacity="0.75" />
            <line x1="6" y1="16" x2="38" y2="-2" stroke="#38BDF8" strokeWidth="1" strokeDasharray="5 3" opacity="0.75" />
            <line x1="6" y1="34" x2="38" y2="16" stroke="#38BDF8" strokeWidth="1" strokeDasharray="5 3" opacity="0.75" />

            {/* CẠNH SỐNG TRUNG TÂM PHẢN CHIẾU VỆT SÁNG BẠCH KIM (Center Ridge Specular) */}
            <line x1="0" y1="0" x2="0" y2="58" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-50" y1="-29" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="0" y1="0" x2="50" y2="-29" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />

            {/* LÕI NĂNG LƯỢNG TRÍ TUỆ NHÂN TẠO AI (CENTRAL NEURAL AI CORE) */}
            <g id="monolith-ai-core" className="anim-ai-pulse" transform="translate(0, 0)">
              <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="url(#liquid-orbit-ribbon)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="-2.5" cy="-2.5" r="2.5" fill="#FFFFFF" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
