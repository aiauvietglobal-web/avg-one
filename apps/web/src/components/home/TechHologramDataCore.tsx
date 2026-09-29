import React from 'react';

/**
 * 🌐 LIQUID METAL QUANTUM GYROSCOPE (APPLE & LINEAR MINIMALIST LUXURY - LEFT SIDE)
 * 
 * Phong cách Kim loại chất lỏng & Titan cao cấp (Liquid Metal / Brushed Titanium Precision):
 * - Khối Lập phương Titan nguyên khối (Diamond-Cut Titanium Monolith) lơ lửng không trọng lực.
 * - Hệ 3 Vòng đai Kim loại chất lỏng (Liquid Chrome Gyroscopic Rings) xoay 3D mềm mại, uyển chuyển.
 * - Các mặt cắt phản chiếu ánh kim bạch kim & titan (Platinum & Cobalt Specular Highlights).
 * - Chuyển động động học êm ái 60fps chuẩn nghệ thuật cơ khí xa xỉ (Kinetic Luxury Sculpture).
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 420 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 🌟 METALLIC LUXURY GRADIENTS (BẠCH KIM, TITAN & COBALT CHROME) */}
          
          {/* Gradient Bề mặt Titan Bạch Kim (Liquid Platinum Specular) */}
          <linearGradient id="liquid-platinum" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="45%" stopColor="#94A3B8" />
            <stop offset="65%" stopColor="#F8FAFC" />
            <stop offset="85%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Gradient Mặt phẳng Tối Titan (Smoked Titanium) */}
          <linearGradient id="smoked-titanium" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Gradient Mặt phẳng Sáng Titan (Brushed Bright Titanium) */}
          <linearGradient id="brushed-bright-titanium" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F1F5F9" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Gradient Cobalt Kim Loại Xanh Dương (Cobalt Chrome Ribbon) */}
          <linearGradient id="cobalt-chrome-liquid" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="25%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Gradient Vòng đai Kim loại chất lỏng 2 */}
          <linearGradient id="liquid-metal-ring-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0284C7" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#0C4A6E" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.95" />
          </linearGradient>

          {/* Gradient Vệt sáng cạnh kim cương (Diamond Bevel Gleam) */}
          <linearGradient id="diamond-edge-gleam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes liquid-sculpture-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(0.4deg); }
          }
          @keyframes gyro-ring-1 {
            0% { transform: rotate(0deg) rotateX(65deg); }
            100% { transform: rotate(360deg) rotateX(65deg); }
          }
          @keyframes gyro-ring-2 {
            0% { transform: rotate(45deg) rotateY(65deg); }
            100% { transform: rotate(405deg) rotateY(65deg); }
          }
          @keyframes core-diamond-breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .anim-sculpture-left { animation: liquid-sculpture-float 6s ease-in-out infinite; }
          .anim-core-diamond { animation: core-diamond-breathe 4s ease-in-out infinite; transform-origin: 210px 175px; }
        `}</style>

        {/* ========================================================================= */}
        {/* TÁC PHẨM ĐIÊU KHẮC ĐỘNG HỌC KIM LOẠI CHẤT LỎNG (KINETIC SCULPTURE)       */}
        {/* ========================================================================= */}
        <g className="anim-sculpture-left">
          
          {/* 1. VÒNG ĐỊNH VỊ KHÔNG GIAN BẠCH KIM THANH MẢNH (PLATINUM HORIZON RING) */}
          <g id="horizon-rings" transform="translate(210, 175)">
            <ellipse
              cx="0"
              cy="0"
              rx="135"
              ry="45"
              stroke="url(#liquid-platinum)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
              className="opacity-40 dark:opacity-30"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="115"
              ry="38"
              stroke="url(#cobalt-chrome-liquid)"
              strokeWidth="0.8"
              className="opacity-30 dark:opacity-20"
            />
            {/* Các hạt vi tinh thể kim loại trên quỹ đạo */}
            <circle cx="-135" cy="0" r="2" fill="#FFFFFF" />
            <circle cx="135" cy="0" r="2" fill="#0284C7" />
            <circle cx="0" cy="-45" r="1.5" fill="#38BDF8" />
            <circle cx="0" cy="45" r="1.5" fill="#94A3B8" />
          </g>

          {/* 2. HỆ VÒNG ĐAI KIM LOẠI CHẤT LỎNG CON QUAY 3D (LIQUID GYROSCOPIC RINGS) */}
          <g id="gyroscopic-rings" transform="translate(210, 175)">
            
            {/* VÒNG ĐAI 1: UỐN LƯỢN NGHIÊNG TRỤC TRÁI (Liquid Ribbon 1) */}
            <g transform="rotate(-30)">
              <ellipse
                cx="0"
                cy="0"
                rx="98"
                ry="36"
                stroke="url(#liquid-platinum)"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                className="opacity-85 dark:opacity-75"
              />
              {/* Gờ vát phản quang ánh sáng của vòng đai 1 */}
              <ellipse
                cx="0"
                cy="0"
                rx="96"
                ry="34.5"
                stroke="url(#diamond-edge-gleam)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="60 30 40 30"
              />
            </g>

            {/* VÒNG ĐAI 2: UỐN LƯỢN GIAO THOA TRỤC PHẢI (Liquid Ribbon 2) */}
            <g transform="rotate(40)">
              <ellipse
                cx="0"
                cy="0"
                rx="98"
                ry="36"
                stroke="url(#cobalt-chrome-liquid)"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                className="opacity-90 dark:opacity-80"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="96"
                ry="34.5"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                strokeDasharray="50 40 30 40"
                fill="none"
                opacity="0.85"
              />
            </g>
          </g>

          {/* 3. KHỐI LẬP PHƯƠNG TITAN NGUYÊN KHỐI TRUNG TÂM (UNIBODY TITANIUM MONOLITH) */}
          <g id="titanium-core-cube" className="anim-core-diamond" transform="translate(210, 175)">
            
            {/* MẶT TRÊN: BỀ MẶT TITAN SÁNG BÓNG (Top Brushed Specular Face) */}
            <polygon
              points="0,-64 54,-32 0,0 -54,-32"
              fill="url(#brushed-bright-titanium)"
              stroke="#CBD5E1"
              strokeWidth="1.6"
            />
            {/* Cạnh vát kim cương mặt trên (Diamond Chamfer) */}
            <polygon
              points="0,-60 50,-30 0,0 -50,-30"
              fill="none"
              stroke="url(#diamond-edge-gleam)"
              strokeWidth="1"
              opacity="0.85"
            />

            {/* MẶT TRÁI: TITAN CHẢI XƯỚC TRUNG GIAN (Left Brushed Titanium Face) */}
            <polygon
              points="-54,-32 0,0 0,64 -54,32"
              fill="url(#smoked-titanium)"
              stroke="#64748B"
              strokeWidth="1.6"
            />
            {/* Đường phay rãnh laser vi mô (Precision Micro-groove Lines) */}
            <line x1="-42" y1="-22" x2="-6" y2="-2" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.65" />
            <line x1="-42" y1="-2" x2="-6" y2="18" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.65" />
            <line x1="-42" y1="18" x2="-6" y2="38" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.65" />

            {/* MẶT PHẢI: TITAN COBALT KHỐI TỐI SÂU (Right Cobalt Shadow Face) */}
            <polygon
              points="0,0 54,-32 54,32 0,64"
              fill="url(#smoked-titanium)"
              stroke="#475569"
              strokeWidth="1.6"
            />
            {/* Phản xạ ánh kim cobalt trên mặt phải */}
            <polygon
              points="4,3 50,-26 50,28 4,57"
              fill="url(#cobalt-chrome-liquid)"
              fillOpacity="0.18"
              stroke="none"
            />
            <line x1="6" y1="-2" x2="42" y2="-22" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.75" />
            <line x1="6" y1="18" x2="42" y2="-2" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.75" />
            <line x1="6" y1="38" x2="42" y2="18" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.75" />

            {/* CẠNH SỐNG TRUNG TÂM PHẢN CHIẾU VỆT SÁNG BẠCH KIM (Platinum Center Ridge) */}
            <line x1="0" y1="0" x2="0" y2="64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-54" y1="-32" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="0" x2="54" y2="-32" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

            {/* LÕI NĂNG LƯỢNG SỐ TRUNG TÂM: MẮT THẦN TITAN KHẮC LASER (Precision Laser Core) */}
            <g transform="translate(0, 0)">
              {/* Đĩa tròn lõi titan chìm */}
              <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="url(#liquid-platinum)" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="9" fill="url(#cobalt-chrome-liquid)" stroke="#FFFFFF" strokeWidth="0.9" />
              {/* Điểm phản xạ ánh sáng đỉnh cao */}
              <circle cx="-3" cy="-3" r="2.2" fill="#FFFFFF" />
            </g>
          </g>

          {/* 4. CHÂN ĐẾ TREO TỪ TRƯỜNG TINH TẾ (MAGNETIC LEVITATION PEDESTAL) */}
          <g id="mag-base" transform="translate(210, 275)">
            {/* Đĩa titan nằm phẳng với rãnh phay CNC */}
            <ellipse cx="0" cy="0" rx="60" ry="18" stroke="url(#liquid-platinum)" strokeWidth="1.6" className="fill-white/80 dark:fill-slate-900/80" />
            <ellipse cx="0" cy="0" rx="42" ry="12" stroke="url(#cobalt-chrome-liquid)" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.7" />
            <ellipse cx="0" cy="0" rx="20" ry="6" stroke="#FFFFFF" strokeWidth="1.2" className="fill-sky-50 dark:fill-slate-950" />
            {/* Tia liên kết từ trường nâng đỡ êm ái */}
            <line x1="0" y1="0" x2="0" y2="-35" stroke="url(#diamond-edge-gleam)" strokeWidth="1.6" strokeDasharray="3 2" />
          </g>
        </g>
      </svg>
    </div>
  );
};
