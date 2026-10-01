import React from 'react';

/**
 * 🐐 ORGANIC BLACK ANIMAL SILHOUETTE (CHUẨN 100% THEO ẢNH MẪU STOCK VIDEO)
 * 
 * - Đúng chuẩn Silhouette trong ảnh mẫu (Silhouette of sheep/goat walking on green screen):
 *   + Dáng hình hữu cơ, tròn trịa, tự nhiên, thân mình đầy đặn, không có góc cạnh dị hình.
 *   + Đầu nhỏ thanh thoát với tai cụp mềm mại ra sau.
 *   + Cổ và lưng uốn lượn tự nhiên, mông tròn, đuôi cộc đáng yêu.
 *   + Bốn chân chuyển động bước đi (Walking gait) 4 nhịp mềm mại như quay bóng video thật.
 *   + Màu đen tuyền phẳng thuần túy (Pure 2D Black Silhouette), không shadow.
 *   + Di chuyển tản bộ đều đặn ngang qua đáy hộp, không bị đứng sững lệch vị trí cạnh chữ.
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
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Bóng đen phẳng thuần chất theo đúng mẫu stock video */}
          <linearGradient id="sheep-sil-near" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          {/* Lớp chân xa có sắc than sẫm hơn để phân biệt chân trước/sau khi sải bước */}
          <linearGradient id="sheep-sil-far" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        <style>{`
          /* Nhịp đi bộ tự nhiên của cơ thể (Body Walk Bob) */
          @keyframes sheep-walk-body {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-1px) rotate(-0.5deg); }
            50% { transform: translateY(0.5px) rotate(0.4deg); }
            75% { transform: translateY(-0.8px) rotate(-0.2deg); }
          }

          /* Chân trước gần (Front Near Leg) */
          @keyframes sheep-leg-fn {
            0% { transform: rotate(-18deg); }
            25% { transform: rotate(4deg); }
            50% { transform: rotate(18deg); }
            75% { transform: rotate(-4deg); }
            100% { transform: rotate(-18deg); }
          }

          /* Chân trước xa (Front Far Leg - ngược pha) */
          @keyframes sheep-leg-ff {
            0% { transform: rotate(18deg); }
            25% { transform: rotate(-4deg); }
            50% { transform: rotate(-18deg); }
            75% { transform: rotate(4deg); }
            100% { transform: rotate(18deg); }
          }

          /* Chân sau gần (Hind Near Leg) */
          @keyframes sheep-leg-bn {
            0% { transform: rotate(16deg); }
            25% { transform: rotate(-4deg); }
            50% { transform: rotate(-16deg); }
            75% { transform: rotate(6deg); }
            100% { transform: rotate(16deg); }
          }

          /* Chân sau xa (Hind Far Leg - ngược pha) */
          @keyframes sheep-leg-bf {
            0% { transform: rotate(-16deg); }
            25% { transform: rotate(6deg); }
            50% { transform: rotate(16deg); }
            75% { transform: rotate(-4deg); }
            100% { transform: rotate(-16deg); }
          }

          /* Đuôi nhỏ ve vẩy */
          @keyframes sheep-tail-wag {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(14deg); }
          }

          /* Đầu gật gù nhẹ theo bước chân */
          @keyframes sheep-head-nod {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(1.5deg); }
          }

          .anim-sheep-body { animation: sheep-walk-body 1.25s ease-in-out infinite; transform-origin: 48px 38px; }
          .anim-sheep-fn { animation: sheep-leg-fn 1.25s ease-in-out infinite; transform-origin: 66px 44px; }
          .anim-sheep-ff { animation: sheep-leg-ff 1.25s ease-in-out infinite; transform-origin: 64px 44px; }
          .anim-sheep-bn { animation: sheep-leg-bn 1.25s ease-in-out infinite; transform-origin: 28px 40px; }
          .anim-sheep-bf { animation: sheep-leg-bf 1.25s ease-in-out infinite; transform-origin: 29px 40px; }
          .anim-sheep-tail { animation: sheep-tail-wag 1.0s ease-in-out infinite; transform-origin: 17px 38px; }
          .anim-sheep-head { animation: sheep-head-nod 1.25s ease-in-out infinite; transform-origin: 74px 34px; }
        `}</style>

        {/* ======================================================================
            LỚP CHÂN XA (NẰM PHÍA SAU THÂN)
            ====================================================================== */}
        {/* 1. Chân trước xa */}
        <g className="anim-sheep-ff">
          <path
            d="M 64 44 C 65 48 64 54 62 58 L 65 64 L 61 64 L 59 58 C 61 53 62 48 61 44 Z"
            fill="url(#sheep-sil-far)"
          />
          {/* Móng guốc xa */}
          <path d="M 61 62.5 L 65 63.5 L 61 64 Z" fill="#000000" />
        </g>

        {/* 2. Chân sau xa */}
        <g className="anim-sheep-bf">
          <path
            d="M 31 38 C 29 44 26 49 25 53 L 31 62 L 28 64 L 22 54 C 23 49 27 43 28 38 Z"
            fill="url(#sheep-sil-far)"
          />
          {/* Móng guốc xa */}
          <path d="M 28 62.5 L 31 63.5 L 28 64 Z" fill="#000000" />
        </g>

        {/* ======================================================================
            LỚP THÂN MÌNH HỮU CƠ + ĐẦU + ĐUÔI (CHUẨN ẢNH MẪU STOCK VIDEO)
            ====================================================================== */}
        <g className="anim-sheep-body">
          {/* Đuôi cộc nhỏ vểnh nhẹ */}
          <g className="anim-sheep-tail">
            <path
              d="M 18 36 C 14 34 11 36 12 39 C 13 41 16 41 18 39 Z"
              fill="url(#sheep-sil-near)"
            />
          </g>

          {/* Khối thân mình mập mạp, tròn trịa, đường cong tự nhiên (Organic Torso) */}
          <path
            d="M 18 38 C 20 33 28 30 38 31 C 48 32 58 31 63 32 C 67 34 71 39 71 45 C 70 51 64 53 58 53 C 44 53 30 50 22 46 C 18 43 17 40 18 38 Z"
            fill="url(#sheep-sil-near)"
          />

          {/* Cổ liền ngực và đầu (Đầu gật gù nhẹ) */}
          <g className="anim-sheep-head">
            {/* Cổ dày dặn, mượt mà nối từ vai đến đầu */}
            <path
              d="M 60 32 C 64 28 68 25 74 24 C 77 24 79 26 81 29 L 75 42 C 71 44 67 43 64 36 Z"
              fill="url(#sheep-sil-near)"
            />

            {/* Đầu thuôn tròn tự nhiên, có sống mũi mềm (Không nhọn dị hợm) */}
            <path
              d="M 74 24 C 79 24 84 27 87 32 C 88 34 87 36 85 37 C 82 38 78 37 76 34 Z"
              fill="url(#sheep-sil-near)"
            />

            {/* Mõm tròn mềm mại */}
            <path
              d="M 85 32 C 88 33 88 36 85 37 C 82 38 80 37 81 35 Z"
              fill="url(#sheep-sil-near)"
            />

            {/* Tai mềm rủ chúc nhẹ ra sau gáy (Theo đúng ảnh mẫu) */}
            <path
              d="M 75 26 C 72 26 68 28 67 31 C 67 33 70 33 73 31 C 75 29 76 28 75 26 Z"
              fill="url(#sheep-sil-near)"
            />
          </g>
        </g>

        {/* ======================================================================
            LỚP CHÂN GẦN (NẰM PHÍA TRƯỚC THÂN)
            ====================================================================== */}
        {/* 3. Chân trước gần */}
        <g className="anim-sheep-fn">
          <path
            d="M 67 44 C 69 49 68 55 66 59 L 69 64 L 65 64 L 63 59 C 65 54 65 49 64 44 Z"
            fill="url(#sheep-sil-near)"
          />
          {/* Móng guốc trước */}
          <path d="M 65 62.5 L 69 63.5 L 65 64 Z" fill="#000000" />
        </g>

        {/* 4. Chân sau gần */}
        <g className="anim-sheep-bn">
          <path
            d="M 28 40 C 26 45 22 50 20 54 L 27 63 L 24 64 L 17 55 C 19 49 23 44 25 40 Z"
            fill="url(#sheep-sil-near)"
          />
          {/* Móng guốc sau */}
          <path d="M 24 62.5 L 27 63.5 L 24 64 Z" fill="#000000" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHUYỂN ĐỘNG TẢN BỘ THƯ THÁI BĂNG QUA ĐÁY HỘP LỚN (BẢO MẬT)
 * - Đi thong thả liên tục từ trái sang phải, không bị khựng lại một góc làm xấu bố cục.
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        /* Chuyển động tản bộ khoan thai lướt ngang đáy hộp */
        @keyframes sheep-continuous-stroll {
          0% {
            left: -65px;
            opacity: 0;
          }
          4% {
            opacity: 0.95;
          }
          93% {
            opacity: 0.95;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .anim-sheep-stroll-track {
          position: absolute;
          bottom: 2px;
          animation: sheep-continuous-stroll 8.5s linear infinite;
          will-change: left;
        }

        .group:hover .anim-sheep-stroll-track {
          /* Khi hover vào hộp: bước nhanh hơn */
          animation-duration: 5.2s;
        }
      `}</style>

      {/* Đường chân trời mờ nhẹ tinh tế dưới chân chú cừu/dê */}
      <div className="absolute bottom-2.5 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/40 to-transparent" />

      {/* Chú cừu/dê bóng đen thuần túy bước đi thong thả */}
      <div className="anim-sheep-stroll-track flex items-center">
        <SecurityGoat className="w-12 h-8.5 sm:w-13 sm:h-9 opacity-95 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
