import React from 'react';

/**
 * 🌐 2D QUANTUM DATA CORE (LEFT HERO EMBLEM - ZERO SHADOW)
 * 
 * Biểu tượng Lõi Dữ Liệu & Công Nghệ AI 2D Thuần Khiết (Pure Crisp 2D Vector):
 * - Hoàn toàn KHÔNG bóng đổ (No Shadow / No Blur / No Halo).
 * - Lõi vi xử lý dữ liệu lượng tử 2D đa tầng (Concentric Precision Quantum Calibrator).
 * - Các vòng quỹ đạo kép quay ngược chiều nhau mang các hạt photon dữ liệu.
 * - Tâm điểm sao AI Singularity 4 cánh phát quang rực rỡ, tượng trưng cho "Một nền tảng Vững chắc".
 * - Tông màu Lam Ngọc Sapphire & Cyan sắc nét, trong suốt, nổi thuần túy trực tiếp trên nền web.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradient Lam Ngọc Bạch Kim cho các vòng đai */}
          <linearGradient id="quantum-ring-grad-2d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Gradient Tâm Lõi AI */}
          <radialGradient id="quantum-center-core-2d" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </radialGradient>
        </defs>

        <style>{`
          @keyframes core-float-smooth {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes core-spin-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes core-spin-ccw {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes star-shimmer {
            0%, 100% { transform: scale(1); opacity: 0.95; }
            50% { transform: scale(1.18); opacity: 1; }
          }
          .anim-core-mechanism { animation: core-float-smooth 6s ease-in-out infinite; }
          .anim-ring-cw { animation: core-spin-cw 20s linear infinite; transform-origin: 130px 130px; }
          .anim-ring-ccw { animation: core-spin-ccw 26s linear infinite; transform-origin: 130px 130px; }
          .anim-ai-star { animation: star-shimmer 3s ease-in-out infinite; transform-origin: 130px 130px; }
        `}</style>

        {/* 🌐 CỤM LÕI LƯỢNG TỬ 2D THUẦN VECTOR - KHÔNG SHADOW */}
        <g className="anim-core-mechanism">
          
          {/* VÒNG ĐAI QUỸ ĐẠO BÊN NGOÀI (XOAY THUẬN CHIỀU KIM ĐỒNG HỒ) */}
          <g className="anim-ring-cw">
            <ellipse
              cx="130"
              cy="130"
              rx="105"
              ry="42"
              stroke="#0284C7"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="40 15 20 15"
              opacity="0.65"
            />
            <ellipse
              cx="130"
              cy="130"
              rx="102"
              ry="40"
              stroke="url(#quantum-ring-grad-2d)"
              strokeWidth="1"
              fill="none"
              opacity="0.85"
            />
            <circle cx="235" cy="130" r="3.2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" />
            <circle cx="25" cy="130" r="2.8" fill="#6366F1" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>

          {/* VÒNG ĐAI QUỸ ĐẠO BÊN TRONG (XOAY NGƯỢC CHIỀU KIM ĐỒNG HỒ) */}
          <g className="anim-ring-ccw">
            <ellipse
              cx="130"
              cy="130"
              rx="44"
              ry="98"
              stroke="#38BDF8"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="30 15 15 15"
              opacity="0.55"
            />
            <circle cx="130" cy="32" r="3" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.8" />
            <circle cx="130" cy="228" r="2.8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>

          {/* VÒNG THƯỚC ĐO CHIA VẠCH KỸ THUẬT CHUẨN XÁC 2D (Precision Calibration Dial) */}
          <g transform="translate(130, 130)">
            <circle cx="0" cy="0" r="62" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 4" fill="none" opacity="0.65" />
            <circle cx="0" cy="0" r="54" stroke="url(#quantum-ring-grad-2d)" strokeWidth="1.6" fill="none" opacity="0.9" />
            <circle cx="0" cy="0" r="48" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="2 3" fill="none" opacity="0.6" />

            {/* 8 Điểm nút truyền dữ liệu (Data Bus Nodes) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.cos(rad) * 48;
              const y1 = Math.sin(rad) * 48;
              const x2 = Math.cos(rad) * 62;
              const y2 = Math.sin(rad) * 62;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38BDF8" strokeWidth="1.2" opacity="0.8" />
                  <circle cx={x2} cy={y2} r="1.8" fill="#0284C7" />
                </g>
              );
            })}
          </g>

          {/* 💎 LÕI LỤC GIÁC CÔNG NGHỆ 2D (2D HEXAGONAL QUANTUM PROCESSOR) */}
          <g transform="translate(130, 130)">
            {/* Lục giác ngoài cùng */}
            <polygon
              points="0,-36 31.18,-18 31.18,18 0,36 -31.18,18 -31.18,-18"
              fill="#F0F9FF"
              stroke="#0284C7"
              strokeWidth="2"
            />
            {/* Lục giác vát viền */}
            <polygon
              points="0,-32 27.71,-16 27.71,16 0,32 -27.71,16 -27.71,-16"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeDasharray="4 2"
              opacity="0.85"
            />

            {/* Đĩa tròn lõi lượng tử xanh lam */}
            <circle cx="0" cy="0" r="22" fill="url(#quantum-center-core-2d)" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="16" stroke="#BAE6FD" strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.85" />

            {/* 🌟 ĐIỂM SAO AI SINGULARITY 4 CÁNH RỰC SÁNG */}
            <g className="anim-ai-star">
              {/* Tia sáng ngang - dọc */}
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />

              {/* Ngôi sao 4 cánh */}
              <path
                d="M 0 -10 Q 0 0 10 0 Q 0 0 0 10 Q 0 0 -10 0 Q 0 0 0 -10 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <circle cx="0" cy="0" r="2.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
