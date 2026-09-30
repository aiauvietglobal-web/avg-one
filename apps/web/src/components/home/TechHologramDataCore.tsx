import React from 'react';

/**
 * 🌐 GRAND QUANTUM DATA CORE & AI NEURAL HUB (LEFT HERO COMPONENT)
 * 
 * Thiết kế Đẳng cấp & Ấn tượng 2026 (Stripe & Linear Enterprise Ecosystem Visual):
 * - Điểm nhấn uy lực trung tâm: Khối Lập Phương Lượng Tử Pha Lê 3D (Grand Crystal Monolith) bề thế, lộng lẫy và tỏa sáng.
 * - Vầng hào quang năng lượng thương hiệu (Brand Energy Halo): Giao thoa mềm mại giữa Xanh Coban sâu (#0284C7) và Lam Ngọc (#38BDF8).
 * - Hệ thống Thẻ Kính Mờ Động học (Floating Glass Telemetry Cards):
 *   + Card 1: 🧠 Trí Tuệ Nhân Tạo AI (Xử Lý SOP Tức Thì)
 *   + Card 2: 📊 100% Số Hóa (Dữ Liệu Thời Gian Thực)
 *   + Card 3: 🛡️ Bảo Mật Đa Tầng (Chuẩn Mực Tối Ưu)
 * - Đường dẫn truyền hạt photon năng lượng kết nối lõi lượng tử và các vệ tinh dữ liệu.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 450 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 VẦNG HÀO QUANG NĂNG LƯỢNG THƯƠNG HIỆU RỰC RỠ */}
          <radialGradient id="data-ambient-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#0284C7" stopOpacity="0.16" />
            <stop offset="65%" stopColor="#6366F1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Mặt Trên Lập Phương: Kính Tinh Thể Bạch Kim (Top Crystal Specular Face) */}
          <linearGradient id="monolith-face-top-grand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F0F9FF" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* Mặt Trái Lập Phương: Lam Ngọc Khói Sâu (Left Smoky Sapphire Face) */}
          <linearGradient id="monolith-face-left-grand" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="40%" stopColor="#075985" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Mặt Phải Lập Phương: Lam Ngọc Sáng Bóng (Right Vibrant Sapphire Face) */}
          <linearGradient id="monolith-face-right-grand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#0369A1" />
            <stop offset="85%" stopColor="#0C4A6E" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>

          {/* Vòng Đai Quỹ Đạo Kim Loại Chất Lỏng */}
          <linearGradient id="liquid-ribbon-grand" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#BAE6FD" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Cạnh Sống Vát Kim Cương Phản Quang Sắc Lẹm */}
          <linearGradient id="monolith-gleam-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
          </linearGradient>

          {/* Gradient Thẻ Kính Mờ */}
          <linearGradient id="glass-card-bg-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.82" />
          </linearGradient>

          <linearGradient id="glass-card-border-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>

          {/* Bộ lọc bóng đổ cao cấp */}
          <filter id="data-master-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.12" />
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.15" />
          </filter>

          <filter id="card-soft-shadow-left" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
        </defs>

        <style>{`
          @keyframes monolith-sculpture-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-7px) rotate(0.4deg); }
          }
          @keyframes card-hover-left-1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes card-hover-left-2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(4px); }
          }
          @keyframes pulse-energy-halo-left {
            0%, 100% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.06); opacity: 1; }
          }
          @keyframes star-singularity-pulse-grand {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.18); opacity: 1; }
          }
          @keyframes beam-dash-flow-left {
            0% { stroke-dashoffset: 60; }
            100% { stroke-dashoffset: 0; }
          }
          .anim-monolith-grand { animation: monolith-sculpture-float 6s ease-in-out infinite; }
          .anim-card-left-1 { animation: card-hover-left-1 5s ease-in-out infinite 0.4s; }
          .anim-card-left-2 { animation: card-hover-left-2 5.5s ease-in-out infinite 0.8s; }
          .anim-card-left-3 { animation: card-hover-left-1 4.8s ease-in-out infinite 1.2s; }
          .anim-halo-pulse-left { animation: pulse-energy-halo-left 4s ease-in-out infinite; transform-origin: 225px 150px; }
          .anim-star-pulse-grand { animation: star-singularity-pulse-grand 3s ease-in-out infinite; transform-origin: 0 0; }
          .anim-energy-beam-left { stroke-dasharray: 6 4; animation: beam-dash-flow-left 2s linear infinite; }
        `}</style>

        {/* ========================================================================= */}
        {/* TẦNG 1: VẦNG HÀO QUANG NĂNG LƯỢNG RỰC RỠ TẠO CHIỀU SÂU BỨT PHÁ           */}
        {/* ========================================================================= */}
        <g id="data-energy-environment" transform="translate(225, 145)">
          <ellipse cx="0" cy="0" rx="160" ry="95" fill="url(#data-ambient-glow)" className="anim-halo-pulse-left" />
          
          <ellipse cx="0" cy="0" rx="130" ry="60" stroke="#0284C7" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="95" ry="42" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC ĐƯỜNG DẪN TRUYỀN NĂNG LƯỢNG PHOTON (ENERGY CONDUIT BEAMS)     */}
        {/* ========================================================================= */}
        <g id="conduit-streams-left">
          {/* Dẫn truyền tới Card 1 (Top-Right: 365, 55) */}
          <path
            d="M 265 105 C 300 90, 335 75, 365 55"
            stroke="#38BDF8"
            strokeWidth="1.4"
            fill="none"
            className="anim-energy-beam-left opacity-60"
          />
          <circle cx="365" cy="55" r="2.5" fill="#38BDF8" />

          {/* Dẫn truyền tới Card 2 (Bottom-Right: 360, 240) */}
          <path
            d="M 275 180 C 310 210, 335 225, 360 240"
            stroke="#0284C7"
            strokeWidth="1.4"
            fill="none"
            className="anim-energy-beam-left opacity-60"
          />
          <circle cx="360" cy="240" r="2.5" fill="#0284C7" />

          {/* Dẫn truyền tới Card 3 (Left: 75, 145) */}
          <path
            d="M 170 150 C 135 150, 105 145, 75 145"
            stroke="#6366F1"
            strokeWidth="1.4"
            fill="none"
            className="anim-energy-beam-left opacity-60"
          />
          <circle cx="75" cy="145" r="2.5" fill="#6366F1" />
        </g>

        {/* ========================================================================= */}
        {/* KHỐI CHÍNH: KHỐI LẬP PHƯƠNG LƯỢNG TỬ TITAN 3D (GRAND QUANTUM MONOLITH)    */}
        {/* ========================================================================= */}
        <g className="anim-monolith-grand" filter="url(#data-master-shadow)">
          
          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 1: NGHIÊNG TRỤC TRÁI -24° */}
          <g transform="translate(225, 145) rotate(-24)">
            <ellipse
              cx="0"
              cy="0"
              rx="105"
              ry="38"
              stroke="url(#liquid-ribbon-grand)"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="45 15 25 15"
              opacity="0.75"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="103"
              ry="36.5"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.8"
            />
            <circle cx="105" cy="0" r="2.8" fill="#FFFFFF" />
            <circle cx="-105" cy="0" r="2.5" fill="#38BDF8" />
          </g>

          {/* VÒNG ĐAI QUỸ ĐẠO KIM LOẠI CHẤT LỎNG 2: NGHIÊNG TRỤC PHẢI +32° */}
          <g transform="translate(225, 145) rotate(32)">
            <ellipse
              cx="0"
              cy="0"
              rx="105"
              ry="38"
              stroke="#0284C7"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="35 20 20 20"
              opacity="0.45"
            />
            <circle cx="-105" cy="0" r="2.5" fill="#6366F1" />
          </g>

          {/* KHỐI LẬP PHƯƠNG PHA LÊ BỀ THẾ (ISOMETRIC CRYSTAL MONOLITH) */}
          <g transform="translate(225, 145)">
            
            {/* MẶT TRÊN: BỀ MẶT KÍNH PHA LÊ BẠCH KIM (Top Frosted Glass Face) */}
            <polygon
              points="0,-60 54,-30 0,0 -54,-30"
              fill="url(#monolith-face-top-grand)"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Viền vát kim cương mặt trên phản chiếu ánh sáng */}
            <polygon
              points="0,-56 50,-28 0,0 -50,-28"
              fill="none"
              stroke="url(#monolith-gleam-edge)"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* MẶT TRÁI: LAM NGỌC KHÓI SÂU (Left Smoky Sapphire Face) */}
            <polygon
              points="-54,-30 0,0 0,60 -54,30"
              fill="url(#monolith-face-left-grand)"
              stroke="#0369A1"
              strokeWidth="1.2"
            />
            {/* Vi mạch laser thanh mảnh */}
            <line x1="-40" y1="-20" x2="-8" y2="-2" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.75" />
            <line x1="-40" y1="-2" x2="-8" y2="16" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.75" />
            <line x1="-40" y1="16" x2="-8" y2="34" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.75" />

            {/* MẶT PHẢI: LAM NGỌC SÁNG BÓNG (Right Vibrant Sapphire Face) */}
            <polygon
              points="0,0 54,-30 54,30 0,60"
              fill="url(#monolith-face-right-grand)"
              stroke="#0284C7"
              strokeWidth="1.2"
            />
            {/* Phản xạ ánh sáng vi mô trên mặt phải */}
            <line x1="8" y1="-2" x2="40" y2="-20" stroke="#BAE6FD" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />
            <line x1="8" y1="16" x2="40" y2="-2" stroke="#BAE6FD" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />
            <line x1="8" y1="34" x2="40" y2="16" stroke="#BAE6FD" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.8" />

            {/* CẠNH SỐNG TRUNG TÂM PHẢN QUANG SẮC LẸM (Center Ridge Specular) */}
            <line x1="0" y1="0" x2="0" y2="60" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-54" y1="-30" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="0" y1="0" x2="54" y2="-30" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />

            {/* KHỐI TESSERACT LỒNG GHÉP BÊN TRONG (INNER CRYSTAL TESSERACT) */}
            <g transform="scale(0.55)">
              <polygon
                points="0,-56 50,-28 0,0 -50,-28"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeDasharray="5 3"
                opacity="0.85"
              />
              <polygon
                points="-50,-28 0,0 0,56 -50,28"
                fill="none"
                stroke="#BAE6FD"
                strokeWidth="1.2"
                opacity="0.75"
              />
              <polygon
                points="0,0 50,-28 50,28 0,56"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.2"
                opacity="0.75"
              />
            </g>

            {/* LÕI LƯỢNG TỬ ĐIỂM SAO AI PHÁT QUANG (QUANTUM SINGULARITY MICRO-STAR) */}
            <g id="ai-singularity-star-grand" className="anim-star-pulse-grand" transform="translate(0, 0)">
              <circle cx="0" cy="0" r="12" fill="#0C4A6E" stroke="url(#liquid-ribbon-grand)" strokeWidth="1.4" opacity="0.9" />
              <circle cx="0" cy="0" r="7.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.9" />
              
              {/* Điểm sao phát quang 4 cánh siêu tinh tế */}
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 4: HỆ THỐNG THẺ KÍNH MỜ CÔNG NGHỆ CAO (FLOATING TELEMETRY CARDS)     */}
        {/* ========================================================================= */}
        <g id="telemetry-badges-left">
          
          {/* 🧠 CARD 1: TRÍ TUỆ NHÂN TẠO AI (TOP-RIGHT: X=295, Y=35) */}
          <g className="anim-card-left-1" transform="translate(295, 35)" filter="url(#card-soft-shadow-left)">
            <rect
              x="0"
              y="0"
              width="142"
              height="44"
              rx="10"
              fill="url(#glass-card-bg-left)"
              stroke="url(#glass-card-border-left)"
              strokeWidth="1.2"
            />
            <rect x="8" y="9" width="26" height="26" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
            {/* Icon Brain / AI */}
            <path d="M21 16a3 3 0 0 0-3 3c0 1.1.6 2.1 1.5 2.6v1.4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V21.6c.9-.5 1.5-1.5 1.5-2.6a3 3 0 0 0-3-3z" fill="#16A34A" />
            <text x="40" y="21" fill="#0F172A" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Trí Tuệ Nhân Tạo AI</text>
            <text x="40" y="34" fill="#16A34A" fontSize="9" fontWeight="600" fontFamily="sans-serif">● Xử Lý SOP Tức Thì</text>
          </g>

          {/* 📊 CARD 2: 100% SỐ HÓA (BOTTOM-RIGHT: X=295, Y=225) */}
          <g className="anim-card-left-2" transform="translate(295, 225)" filter="url(#card-soft-shadow-left)">
            <rect
              x="0"
              y="0"
              width="142"
              height="44"
              rx="10"
              fill="url(#glass-card-bg-left)"
              stroke="url(#glass-card-border-left)"
              strokeWidth="1.2"
            />
            <rect x="8" y="9" width="26" height="26" rx="6" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" />
            {/* Icon Database / Chart */}
            <line x1="16" y1="28" x2="16" y2="21" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="28" x2="21" y2="16" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="26" y1="28" x2="26" y2="18" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <text x="40" y="21" fill="#0F172A" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">100% Số Hóa</text>
            <text x="40" y="34" fill="#0284C7" fontSize="9" fontWeight="600" fontFamily="sans-serif">Dữ Liệu Thời Gian Thực</text>
          </g>

          {/* 🛡️ CARD 3: BẢO MẬT ĐA TẦNG (LEFT: X=10, Y=125) */}
          <g className="anim-card-left-3" transform="translate(10, 125)" filter="url(#card-soft-shadow-left)">
            <rect
              x="0"
              y="0"
              width="132"
              height="44"
              rx="10"
              fill="url(#glass-card-bg-left)"
              stroke="url(#glass-card-border-left)"
              strokeWidth="1.2"
            />
            <rect x="8" y="9" width="26" height="26" rx="6" fill="#EEF2FF" stroke="#A5B4FC" strokeWidth="1" />
            {/* Icon Shield */}
            <path d="M21 15s5-2.5 5-6.5V11l-5-2-5 2v2.5c0 4 5 6.5 5 6.5z" fill="#4F46E5" />
            <text x="40" y="21" fill="#0F172A" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Bảo Mật Đa Tầng</text>
            <text x="40" y="34" fill="#4F46E5" fontSize="9" fontWeight="600" fontFamily="sans-serif">Chuẩn Mực Tối Ưu</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
