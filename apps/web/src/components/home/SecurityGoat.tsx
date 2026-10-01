import React from 'react';

/**
 * 🐐 2D ANIMATED BLACK SECURITY GOAT (CHÚ DÊ ĐEN CÔNG NGHỆ 2D CHẠY TRONG HỘP BẢO MẬT LỚN)
 * 
 * - Đúng yêu cầu:
 *   + Chú dê màu đen (Black goat: đen tuyền obsidian, viền charcoal sắc nét 2D).
 *   + Cặp sừng cong đặc trưng (Curved Obsidian Horns) với các khía đốt tinh xảo.
 *   + Râu cằm dê đen (Goatee beard) bay trong gió.
 *   + 4 chân cơ bắp chạy phi nước đại luân phiên sinh động.
 *   + Mắt công nghệ cyan phát sáng thông minh.
 *   + Di chuyển chạy ngang qua toàn bộ hộp lớn (hộp Bảo Mật).
 *   + Biểu tượng icon của hộp giữ nguyên (ShieldCheck).
 */

interface SecurityGoatProps {
  className?: string;
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = ''
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 72 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradient Sừng Dê Đen Kim Loại (Obsidian Black) */}
          <linearGradient id="goat-black-horn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          {/* Gradient Sừng Dê Sau */}
          <linearGradient id="goat-black-horn-back-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Gradient Thân Dê Đen Tuyền Thể Thao (Deep Obsidian Black) */}
          <linearGradient id="goat-black-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="45%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Gradient Chân Xa (Tông xám than phân biệt độ sâu 2D) */}
          <linearGradient id="goat-black-leg-far-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Khiên bảo mật Cyan mờ phía sau */}
          <linearGradient id="goat-black-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <style>{`
          /* Nhịp chạy nhấp nhô của toàn bộ thân chú dê */
          @keyframes goat-body-gallop {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-2.5px) rotate(-1.5deg); }
            50% { transform: translateY(1px) rotate(1deg); }
            75% { transform: translateY(-1.5px) rotate(-0.5deg); }
          }

          /* Chân trước gần (Front Near Leg) */
          @keyframes goat-front-near-leg {
            0% { transform: rotate(-32deg); }
            35% { transform: rotate(26deg); }
            70% { transform: rotate(-10deg); }
            100% { transform: rotate(-32deg); }
          }

          /* Chân trước xa (Front Far Leg - ngược pha) */
          @keyframes goat-front-far-leg {
            0% { transform: rotate(25deg); }
            35% { transform: rotate(-26deg); }
            70% { transform: rotate(12deg); }
            100% { transform: rotate(25deg); }
          }

          /* Chân sau gần (Back Near Leg) */
          @keyframes goat-back-near-leg {
            0% { transform: rotate(32deg); }
            35% { transform: rotate(-24deg); }
            70% { transform: rotate(8deg); }
            100% { transform: rotate(32deg); }
          }

          /* Chân sau xa (Back Far Leg - ngược pha) */
          @keyframes goat-back-far-leg {
            0% { transform: rotate(-24deg); }
            35% { transform: rotate(30deg); }
            70% { transform: rotate(-10deg); }
            100% { transform: rotate(-24deg); }
          }

          /* Đuôi ve vẩy */
          @keyframes goat-tail-wag {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(22deg); }
          }

          /* Râu cằm nhấp nhô trong gió */
          @keyframes goat-beard-flutter {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-18deg); }
          }

          /* Vệt bụi tốc độ bay về sau */
          @keyframes dust-stream-1 {
            0% { transform: translateX(0px); opacity: 0.8; }
            100% { transform: translateX(-16px); opacity: 0; }
          }
          @keyframes dust-stream-2 {
            0% { transform: translateX(0px); opacity: 0.8; }
            100% { transform: translateX(-22px); opacity: 0; }
          }

          .anim-goat-body { animation: goat-body-gallop 0.42s ease-in-out infinite; transform-origin: 32px 28px; }
          .anim-front-near { animation: goat-front-near-leg 0.42s ease-in-out infinite; transform-origin: 43px 29px; }
          .anim-front-far { animation: goat-front-far-leg 0.42s ease-in-out infinite; transform-origin: 44px 28px; }
          .anim-back-near { animation: goat-back-near-leg 0.42s ease-in-out infinite; transform-origin: 25px 28px; }
          .anim-back-far { animation: goat-back-far-leg 0.42s ease-in-out infinite; transform-origin: 26px 27px; }
          .anim-goat-tail { animation: goat-tail-wag 0.3s ease-in-out infinite; transform-origin: 19px 23px; }
          .anim-goat-beard { animation: goat-beard-flutter 0.35s ease-in-out infinite; transform-origin: 52px 24px; }
          .anim-dust-1 { animation: dust-stream-1 0.42s linear infinite; }
          .anim-dust-2 { animation: dust-stream-2 0.35s linear infinite; }
        `}</style>

        {/* 🛡️ BIỂU TƯỢNG KHIÊN BẢO MẬT NỀN (SECURITY SHIELD BACKDROP) */}
        <g opacity="0.35" transform="translate(36, 26)">
          <path
            d="M 0 -18 L 15 -12 C 15 4 8 16 0 20 C -8 16 -15 4 -15 -12 Z"
            fill="url(#goat-black-shield-grad)"
            stroke="#0284C7"
            strokeWidth="1.1"
            strokeDasharray="4 2"
          />
        </g>

        {/* 💨 VỆT TỐC ĐỘ DƯỚI CHÂN CHÚ DÊ */}
        <g opacity="0.6">
          <line x1="22" y1="46" x2="10" y2="46" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" className="anim-dust-1" />
          <line x1="28" y1="48" x2="14" y2="48" stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" className="anim-dust-2" />
          <circle cx="16" cy="45" r="1" fill="#64748B" className="anim-dust-1" />
          <circle cx="12" cy="47" r="1.1" fill="#0284C7" className="anim-dust-2" />
        </g>

        {/* 🐐 CHÚ DÊ ĐEN 2D ĐANG CHẠY PHI NƯỚC ĐẠI */}
        <g>
          {/* CHÂN XA (LỚP NẰM SAU THÂN - MÀU XÁM THAN ĐẬM) */}
          {/* 1. Chân trước xa */}
          <g className="anim-front-far">
            <path
              d="M 44 28 L 47 37 L 43 43 L 45 44 L 48 37 L 46 28 Z"
              fill="url(#goat-black-leg-far-grad)"
              stroke="#1E293B"
              strokeWidth="0.5"
            />
            {/* Móng guốc xa */}
            <path d="M 42.5 42.5 L 45 44 L 43 44.5 Z" fill="#000000" />
          </g>

          {/* 2. Chân sau xa */}
          <g className="anim-back-far">
            <path
              d="M 26 27 L 22 34 L 28 41 L 26 43 L 20 34 L 24 27 Z"
              fill="url(#goat-black-leg-far-grad)"
              stroke="#1E293B"
              strokeWidth="0.5"
            />
            {/* Móng guốc xa */}
            <path d="M 26 41.5 L 28 42.5 L 25.5 43.5 Z" fill="#000000" />
          </g>

          {/* SỪNG SAU (NẰM SAU ĐẦU - ĐEN OBSIDIAN) */}
          <path
            d="M 45 14 C 41 6 32 3 24 6 C 29 8 36 10 42 16 Z"
            fill="url(#goat-black-horn-back-grad)"
            stroke="#1E293B"
            strokeWidth="0.6"
          />

          {/* THÂN THỂ + ĐẦU + CỔ (NHẤP NHÔ THEO NHỊP CHẠY) */}
          <g className="anim-goat-body">
            
            {/* Đuôi ve vẩy */}
            <g className="anim-goat-tail">
              <path
                d="M 20 23 C 15 20 14 16 16 15 C 18 16 19 19 21 22 Z"
                fill="#0F172A"
                stroke="#334155"
                strokeWidth="0.7"
              />
            </g>

            {/* Khối thân chú dê đen (Thon gọn, cơ bắp, dũng mãnh) */}
            <path
              d="M 21 23 C 24 21 34 21 42 24 L 44 29 C 38 33 26 33 21 29 Z"
              fill="url(#goat-black-body-grad)"
              stroke="#334155"
              strokeWidth="0.9"
            />

            {/* Cơ ngực & cổ vươn cao về phía trước */}
            <path
              d="M 38 23 L 44 16 L 49 18 L 45 28 Z"
              fill="url(#goat-black-body-grad)"
            />

            {/* Đầu chú dê đen */}
            <path
              d="M 43 17 L 47 13 L 53 17 L 55 21 L 51 24 L 44 22 Z"
              fill="url(#goat-black-body-grad)"
              stroke="#334155"
              strokeWidth="0.8"
            />

            {/* Mõm & Mũi */}
            <path d="M 53 17 L 55 20 L 53 21 Z" fill="#000000" />
            
            {/* Râu cằm dê đen đặc trưng (Goatee Beard) tung bay */}
            <g className="anim-goat-beard">
              <path
                d="M 52 23 C 53 26 56 29 55 31 C 52 29 50 26 51 24 Z"
                fill="#090D16"
                stroke="#475569"
                strokeWidth="0.7"
              />
            </g>

            {/* Tai dê nhọn vểnh */}
            <path
              d="M 44 16 C 41 15 39 17 38 19 C 41 18 43 17 44 16 Z"
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="0.6"
            />

            {/* Mắt công nghệ sáng thông minh (Cyan glow) */}
            <circle cx="48" cy="17" r="1.4" fill="#38BDF8" />
            <circle cx="48.4" cy="16.8" r="0.6" fill="#FFFFFF" />

            {/* SỪNG TRƯỚC (ĐEN OBSIDIAN - CONG VÚT UY NGHI) */}
            <path
              d="M 46 14 C 43 5 33 2 25 5 C 31 7 38 9 44 16 Z"
              fill="url(#goat-black-horn-grad)"
              stroke="#475569"
              strokeWidth="0.8"
            />
            {/* Khía đốt kim loại trên sừng dê */}
            <line x1="38" y1="11" x2="39" y2="13" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="33" y1="8" x2="34" y2="10" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="28" y1="6" x2="29" y2="8" stroke="#94A3B8" strokeWidth="0.8" />
          </g>

          {/* CHÂN GẦN (LỚP NẰM TRƯỚC THÂN - ĐEN TUYỀN) */}
          {/* 3. Chân trước gần */}
          <g className="anim-front-near">
            <path
              d="M 43 29 L 45 37 L 50 43 L 48 44.5 L 43 38 L 41 29 Z"
              fill="url(#goat-black-body-grad)"
              stroke="#334155"
              strokeWidth="0.8"
            />
            {/* Móng guốc trước */}
            <path d="M 48 43 L 50.5 44.5 L 48 45 Z" fill="#000000" />
          </g>

          {/* 4. Chân sau gần (Bắp đùi cơ bắp phi nước đại) */}
          <g className="anim-back-near">
            <path
              d="M 25 28 C 22 30 19 33 20 37 L 14 43 L 16 44.5 L 22 38 L 24 33 L 27 28 Z"
              fill="url(#goat-black-body-grad)"
              stroke="#334155"
              strokeWidth="0.8"
            />
            {/* Móng guốc sau */}
            <path d="M 13.5 42.5 L 15.5 44.5 L 13 44.5 Z" fill="#000000" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER WRAPPER: DI CHUYỂN CHẠY NGANG TRONG HỘP LỚN (BẢO MẬT)
 * Chạy từ mép trái qua mép phải của hộp theo chu kỳ mượt mà.
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes goat-runner-traverse {
          0% {
            left: -68px;
            opacity: 0;
          }
          4% {
            opacity: 0.95;
          }
          92% {
            opacity: 0.95;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .anim-box-runner-track {
          position: absolute;
          bottom: 2px;
          animation: goat-runner-traverse 4.4s linear infinite;
          will-change: left;
        }

        .group:hover .anim-box-runner-track {
          animation-duration: 2.8s;
        }
      `}</style>

      {/* Đường chạy laser bảo mật tinh tế ở đáy hộp */}
      <div className="absolute bottom-2.5 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/40 to-transparent" />

      {/* Chú dê đen di chuyển chạy qua hộp lớn */}
      <div className="anim-box-runner-track flex items-center">
        <SecurityGoat className="w-13 h-9.5 sm:w-14 sm:h-10 opacity-90 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
