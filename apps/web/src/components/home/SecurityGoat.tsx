import React from 'react';

/**
 * 🐐 2D ANIMATED BLACK GOAT SILHOUETTE (BÓNG ĐEN CHUYỂN ĐỘNG CHÂN THỰC)
 * 
 * - Đúng chuẩn phong cách Silhouette (Bóng đen thuần túy như video stock green screen):
 *   + Dáng silhouette liền khối, đường cong sinh học tự nhiên, cơ bắp mềm mại.
 *   + Cặp sừng dê cong vuốt đặc trưng qua gáy.
 *   + Mõm dê thuôn dài, râu cằm buông rủ, đuôi cộc vểnh.
 *   + Khớp khuỷu chân sau gập góc, móng guốc chẵn rõ nét.
 * - Đầy đủ 3 pha chuyển động sống động:
 *   1. ĐI BỘ (Walking): Bước đi tuần tra khoan thai, 4 chân luân phiên nhịp nhàng.
 *   2. NGỒI NGHỈ (Sitting): Gập 4 chân ngồi xếp uy nghiêm giữa sàn, thở êm ái, vểnh tai, vẫy đuôi.
 *   3. CHẠY (Running): Đứng dậy phi nước đại thần tốc, sải chân dài lướt qua hộp.
 */

interface SecurityGoatProps {
  className?: string;
  pose?: 'walk' | 'sit' | 'run' | 'auto';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  pose = 'walk'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 100 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Màu bóng đen tuyền Obsidian chính xác theo phong cách Silhouette */}
          <linearGradient id="goat-sil-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="40%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#050811" />
          </linearGradient>

          {/* Lớp bóng chân xa (Tối hơn nhẹ để phân biệt 2 lớp chân khi sải bước) */}
          <linearGradient id="goat-sil-far" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        <style>{`
          /* =========================================================
             1. ĐI BỘ (WALK CYCLE - 1.2s NHỊP ĐỘ CHÂN THẬT)
             ========================================================= */
          @keyframes sil-walk-torso {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-1.2px) rotate(-0.5deg); }
            50% { transform: translateY(0.4px) rotate(0.5deg); }
            75% { transform: translateY(-0.8px) rotate(-0.3deg); }
          }
          @keyframes sil-walk-fn {
            0% { transform: rotate(-22deg); }
            25% { transform: rotate(4deg); }
            50% { transform: rotate(20deg); }
            75% { transform: rotate(-6deg); }
            100% { transform: rotate(-22deg); }
          }
          @keyframes sil-walk-ff {
            0% { transform: rotate(20deg); }
            25% { transform: rotate(-6deg); }
            50% { transform: rotate(-22deg); }
            75% { transform: rotate(4deg); }
            100% { transform: rotate(20deg); }
          }
          @keyframes sil-walk-bn {
            0% { transform: rotate(18deg); }
            25% { transform: rotate(-4deg); }
            50% { transform: rotate(-18deg); }
            75% { transform: rotate(6deg); }
            100% { transform: rotate(18deg); }
          }
          @keyframes sil-walk-bf {
            0% { transform: rotate(-18deg); }
            25% { transform: rotate(6deg); }
            50% { transform: rotate(18deg); }
            75% { transform: rotate(-4deg); }
            100% { transform: rotate(-18deg); }
          }
          @keyframes sil-walk-tail {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(16deg); }
          }
          @keyframes sil-walk-beard {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(8deg); }
          }

          /* =========================================================
             2. NGỒI NGHỈ (SIT CYCLE - THỞ & VỂNH TAI & VẪY ĐUÔI)
             ========================================================= */
          @keyframes sil-sit-breathe {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-1px) scale(1.01); }
          }
          @keyframes sil-sit-ear {
            0%, 78%, 100% { transform: rotate(0deg); }
            82% { transform: rotate(-14deg); }
            88% { transform: rotate(10deg); }
            92% { transform: rotate(-6deg); }
          }
          @keyframes sil-sit-tail {
            0%, 75%, 100% { transform: rotate(0deg); }
            80% { transform: rotate(24deg); }
            85% { transform: rotate(-12deg); }
            90% { transform: rotate(18deg); }
          }

          /* =========================================================
             3. CHẠY PHI NƯỚC ĐẠI (GALLOP CYCLE - 0.42s NHỊP NHANH)
             ========================================================= */
          @keyframes sil-run-torso {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            25% { transform: translateY(-3.5px) rotate(-3deg); }
            50% { transform: translateY(1.5px) rotate(1.5deg); }
            75% { transform: translateY(-2px) rotate(-1deg); }
          }
          @keyframes sil-run-fn {
            0% { transform: rotate(-35deg); }
            35% { transform: rotate(28deg); }
            70% { transform: rotate(-12deg); }
            100% { transform: rotate(-35deg); }
          }
          @keyframes sil-run-ff {
            0% { transform: rotate(28deg); }
            35% { transform: rotate(-30deg); }
            70% { transform: rotate(14deg); }
            100% { transform: rotate(28deg); }
          }
          @keyframes sil-run-bn {
            0% { transform: rotate(34deg); }
            35% { transform: rotate(-26deg); }
            70% { transform: rotate(10deg); }
            100% { transform: rotate(34deg); }
          }
          @keyframes sil-run-bf {
            0% { transform: rotate(-26deg); }
            35% { transform: rotate(32deg); }
            70% { transform: rotate(-12deg); }
            100% { transform: rotate(-26deg); }
          }
          @keyframes sil-run-beard {
            0%, 100% { transform: rotate(-4deg); }
            50% { transform: rotate(-22deg); }
          }
          @keyframes sil-run-tail {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(24deg); }
          }
          @keyframes sil-run-dust {
            0% { transform: translateX(0px); opacity: 0.7; }
            100% { transform: translateX(-24px); opacity: 0; }
          }

          /* Bindings */
          .anim-sw-torso { animation: sil-walk-torso 1.2s ease-in-out infinite; transform-origin: 46px 36px; }
          .anim-sw-fn { animation: sil-walk-fn 1.2s ease-in-out infinite; transform-origin: 58px 38px; }
          .anim-sw-ff { animation: sil-walk-ff 1.2s ease-in-out infinite; transform-origin: 56px 37px; }
          .anim-sw-bn { animation: sil-walk-bn 1.2s ease-in-out infinite; transform-origin: 30px 36px; }
          .anim-sw-bf { animation: sil-walk-bf 1.2s ease-in-out infinite; transform-origin: 32px 35px; }
          .anim-sw-tail { animation: sil-walk-tail 0.9s ease-in-out infinite; transform-origin: 21px 28px; }
          .anim-sw-beard { animation: sil-walk-beard 1.2s ease-in-out infinite; transform-origin: 74px 34px; }

          .anim-ss-breathe { animation: sil-sit-breathe 2.6s ease-in-out infinite; transform-origin: 45px 50px; }
          .anim-ss-ear { animation: sil-sit-ear 3.4s ease-in-out infinite; transform-origin: 58px 25px; }
          .anim-ss-tail { animation: sil-sit-tail 3.0s ease-in-out infinite; transform-origin: 20px 42px; }

          .anim-sr-torso { animation: sil-run-torso 0.42s ease-in-out infinite; transform-origin: 46px 36px; }
          .anim-sr-fn { animation: sil-run-fn 0.42s ease-in-out infinite; transform-origin: 58px 38px; }
          .anim-sr-ff { animation: sil-run-ff 0.42s ease-in-out infinite; transform-origin: 56px 37px; }
          .anim-sr-bn { animation: sil-run-bn 0.42s ease-in-out infinite; transform-origin: 30px 36px; }
          .anim-sr-bf { animation: sil-run-bf 0.42s ease-in-out infinite; transform-origin: 32px 35px; }
          .anim-sr-beard { animation: sil-run-beard 0.42s ease-in-out infinite; transform-origin: 74px 34px; }
          .anim-sr-tail { animation: sil-run-tail 0.35s ease-in-out infinite; transform-origin: 21px 28px; }
          .anim-sr-dust { animation: sil-run-dust 0.38s linear infinite; }
        `}</style>

        {/* ======================================================================
            TƯ THẾ 1: ĐI BỘ (WALKING SILHOUETTE)
            ====================================================================== */}
        {(pose === 'walk' || pose === 'auto') && (
          <g className={`sil-pose-walk ${pose === 'auto' ? 'anim-sil-walk' : ''}`}>
            {/* Lớp chân xa (Phía sau) */}
            <g className="anim-sw-ff">
              <path
                d="M 55 37 C 56 42 55 48 53 54 L 56 61 L 53 62 L 50 54 C 52 48 53 42 52 37 Z"
                fill="url(#goat-sil-far)"
              />
              {/* Móng guốc xa */}
              <path d="M 53 60 L 56.5 61.5 L 53 62.5 Z" fill="#020408" />
            </g>
            <g className="anim-sw-bf">
              <path
                d="M 33 35 C 31 41 27 47 26 51 L 33 60 L 30 62 L 23 52 C 24 47 28 41 30 35 Z"
                fill="url(#goat-sil-far)"
              />
              {/* Móng guốc xa */}
              <path d="M 30 60 L 33.5 61.5 L 30 62.5 Z" fill="#020408" />
            </g>

            {/* Sừng phía sau */}
            <path
              d="M 59 17 C 55 7 42 5 29 11 C 36 13 47 15 56 20 Z"
              fill="url(#goat-sil-far)"
            />

            {/* Khối thân thể + Đầu đi bộ */}
            <g className="anim-sw-torso">
              {/* Đuôi cộc vểnh lên trên */}
              <g className="anim-sw-tail">
                <path
                  d="M 22 28 C 17 24 15 19 18 17 C 20 18 22 22 24 27 Z"
                  fill="url(#goat-sil-main)"
                />
              </g>

              {/* Thân mình hữu cơ liền khối chuẩn giải phẫu (Organic Torso) */}
              <path
                d="M 23 29 C 27 27 38 27 48 29 C 55 31 63 36 65 44 C 64 50 56 50 48 48 C 38 46 28 44 23 37 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Cổ vươn cao và ngực nở */}
              <path
                d="M 46 29 L 55 19 L 63 21 L 62 38 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Đầu dê có sống mũi gồ nhẹ (Roman profile) và mõm thuôn dài */}
              <path
                d="M 54 20 L 59 15 L 68 21 L 80 28 L 79 32 L 72 34 L 59 28 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Chóp mũi & Môi */}
              <circle cx="79.5" cy="29" r="1.2" fill="#020408" />

              {/* Chòm râu cằm dài buông lơi (Goatee beard) */}
              <g className="anim-sw-beard">
                <path
                  d="M 73 34 C 77 41 76 50 71 52 C 69 47 70 40 71 34 Z"
                  fill="url(#goat-sil-main)"
                />
              </g>

              {/* Đôi tai lá mít chúc ngang mềm mại */}
              <path
                d="M 56 20 C 50 19 44 21 41 24 C 44 25 51 24 56 21 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Sừng trước dài cong vút hình lưỡi liềm uy nghi */}
              <path
                d="M 62 18 C 58 5 43 3 28 9 C 36 12 49 14 59 21 Z"
                fill="url(#goat-sil-main)"
              />
              {/* Các khía đốt trên sống sừng dê thật */}
              <line x1="57" y1="13" x2="58" y2="16" stroke="#475569" strokeWidth="0.8" />
              <line x1="49" y1="8" x2="50" y2="11" stroke="#475569" strokeWidth="0.8" />
              <line x1="41" y1="5.5" x2="42" y2="8.5" stroke="#475569" strokeWidth="0.8" />
              <line x1="33" y1="6" x2="34" y2="8.5" stroke="#475569" strokeWidth="0.8" />
            </g>

            {/* Lớp chân gần (Phía trước) */}
            <g className="anim-sw-fn">
              <path
                d="M 58 38 C 60 44 61 50 59 55 L 63 61 L 60 62 L 56 55 C 57 49 56 43 55 38 Z"
                fill="url(#goat-sil-main)"
              />
              {/* Móng guốc trước */}
              <path d="M 60 60 L 63.5 61.5 L 60 62.5 Z" fill="#020408" />
            </g>
            <g className="anim-sw-bn">
              <path
                d="M 30 36 C 27 41 23 46 22 51 L 28 60 L 25 62 L 19 52 C 20 46 24 41 27 36 Z"
                fill="url(#goat-sil-main)"
              />
              {/* Móng guốc sau */}
              <path d="M 25 60 L 28.5 61.5 L 25 62.5 Z" fill="#020408" />
            </g>
          </g>
        )}

        {/* ======================================================================
            TƯ THẾ 2: NGỒI NGHỈ (SITTING SILHOUETTE)
            ====================================================================== */}
        {(pose === 'sit' || pose === 'auto') && (
          <g className={`sil-pose-sit ${pose === 'auto' ? 'anim-sil-sit' : ''}`}>
            {/* Toàn bộ khối bóng dáng chú dê ngồi sát mặt đất */}
            <g className="anim-ss-breathe">
              {/* Sừng sau */}
              <path
                d="M 59 27 C 55 17 42 15 29 21 C 36 23 47 25 56 30 Z"
                fill="url(#goat-sil-far)"
              />

              {/* Đuôi cộc ngồi vểnh ngoe nguẩy */}
              <g className="anim-ss-tail">
                <path
                  d="M 20 38 C 15 34 13 29 16 27 C 18 28 20 32 22 37 Z"
                  fill="url(#goat-sil-main)"
                />
              </g>

              {/* Khối thân chú dê ngồi êm ái sát đất */}
              <path
                d="M 21 39 C 25 35 38 35 48 37 C 56 40 60 48 57 56 C 50 61 32 62 21 57 C 17 52 17 44 21 39 Z"
                fill="url(#goat-sil-main)"
              />

              {/* 4 Chân gập sát bên sườn và dưới ngực khi ngồi */}
              {/* Chân sau gập áp sát đùi */}
              <path
                d="M 23 47 C 18 53 19 59 34 60 C 35 57 31 52 26 48 Z"
                fill="url(#goat-sil-far)"
              />
              <path d="M 31 59 L 34.5 60.5 L 31 61.5 Z" fill="#020408" />

              {/* Chân trước gập khuỷu về sau */}
              <path
                d="M 55 44 L 62 55 L 49 58 L 50 60.5 L 65 57 L 58 44 Z"
                fill="url(#goat-sil-main)"
              />
              <path d="M 48 58 L 51 59.5 L 48 60.5 Z" fill="#020408" />

              {/* Cổ vươn cao & Ngực ngẩng uy nghiêm */}
              <path
                d="M 45 37 L 55 27 L 63 29 L 61 46 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Đầu dê ngẩng cao */}
              <path
                d="M 54 28 L 59 23 L 68 29 L 80 36 L 79 40 L 72 42 L 59 36 Z"
                fill="url(#goat-sil-main)"
              />
              <circle cx="79.5" cy="37" r="1.2" fill="#020408" />

              {/* Râu cằm buông rủ êm ái */}
              <path
                d="M 73 42 C 77 48 76 57 71 59 C 69 54 70 47 71 42 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Tai vểnh nghe ngóng khi ngồi */}
              <g className="anim-ss-ear">
                <path
                  d="M 56 28 C 50 27 44 29 41 32 C 44 33 51 32 56 29 Z"
                  fill="url(#goat-sil-main)"
                />
              </g>

              {/* Sừng trước uy nghiêm */}
              <path
                d="M 62 26 C 58 13 43 11 28 17 C 36 20 49 22 59 29 Z"
                fill="url(#goat-sil-main)"
              />
              <line x1="57" y1="21" x2="58" y2="24" stroke="#475569" strokeWidth="0.8" />
              <line x1="49" y1="16" x2="50" y2="19" stroke="#475569" strokeWidth="0.8" />
              <line x1="41" y1="13.5" x2="42" y2="16.5" stroke="#475569" strokeWidth="0.8" />
              <line x1="33" y1="14" x2="34" y2="16.5" stroke="#475569" strokeWidth="0.8" />
            </g>
          </g>
        )}

        {/* ======================================================================
            TƯ THẾ 3: CHẠY PHI NƯỚC ĐẠI (RUNNING SILHOUETTE)
            ====================================================================== */}
        {(pose === 'run' || pose === 'auto') && (
          <g className={`sil-pose-run ${pose === 'auto' ? 'anim-sil-run' : ''}`}>
            {/* Vệt bụi tốc độ bay về sau */}
            <g opacity="0.6">
              <line x1="26" y1="58" x2="10" y2="58" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" className="anim-sr-dust" />
              <line x1="34" y1="61" x2="14" y2="61" stroke="#0284C7" strokeWidth="1.6" strokeLinecap="round" className="anim-sr-dust" />
              <circle cx="18" cy="57" r="1.2" fill="#64748B" className="anim-sr-dust" />
              <circle cx="12" cy="60" r="1.4" fill="#0284C7" className="anim-sr-dust" />
            </g>

            {/* Chân xa chạy */}
            <g className="anim-sr-ff">
              <path
                d="M 56 36 C 58 42 61 48 57 54 L 62 61 L 59 62 L 53 54 C 55 48 54 42 53 36 Z"
                fill="url(#goat-sil-far)"
              />
              <path d="M 59 60 L 62.5 61.5 L 59 62.5 Z" fill="#020408" />
            </g>
            <g className="anim-sr-bf">
              <path
                d="M 33 34 C 30 40 24 45 22 50 L 30 59 L 27 61 L 18 51 C 20 45 25 40 29 34 Z"
                fill="url(#goat-sil-far)"
              />
              <path d="M 27 59 L 30.5 60.5 L 27 61.5 Z" fill="#020408" />
            </g>

            {/* Sừng sau chạy */}
            <path
              d="M 58 15 C 54 5 41 3 28 9 C 35 11 46 13 55 18 Z"
              fill="url(#goat-sil-far)"
            />

            {/* Thân mình chú dê phi nước đại */}
            <g className="anim-sr-torso">
              {/* Đuôi bay theo gió */}
              <g className="anim-sr-tail">
                <path
                  d="M 23 27 C 18 23 16 18 19 16 C 21 17 23 21 25 26 Z"
                  fill="url(#goat-sil-main)"
                />
              </g>

              {/* Thân mình thon gọn, dũng mãnh */}
              <path
                d="M 24 28 C 28 26 39 26 49 28 C 56 30 63 35 64 43 C 62 49 54 49 46 47 C 36 45 27 43 23 36 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Cổ vươn chúc về trước đón gió */}
              <path
                d="M 46 28 L 56 17 L 64 19 L 61 36 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Đầu lao về phía trước */}
              <path
                d="M 54 18 L 60 13 L 69 19 L 81 26 L 80 30 L 73 32 L 60 26 Z"
                fill="url(#goat-sil-main)"
              />
              <circle cx="80.5" cy="27" r="1.2" fill="#020408" />

              {/* Râu cằm bay tít ra sau */}
              <g className="anim-sr-beard">
                <path
                  d="M 74 32 C 78 37 77 46 70 48 C 69 43 71 37 72 32 Z"
                  fill="url(#goat-sil-main)"
                />
              </g>

              {/* Tai ép sát ra sau */}
              <path
                d="M 56 18 C 50 17 44 19 41 22 C 44 23 51 22 56 19 Z"
                fill="url(#goat-sil-main)"
              />

              {/* Sừng trước cong vút lướt gió */}
              <path
                d="M 61 16 C 57 3 42 1 27 7 C 35 10 48 12 58 19 Z"
                fill="url(#goat-sil-main)"
              />
              <line x1="56" y1="11" x2="57" y2="14" stroke="#475569" strokeWidth="0.8" />
              <line x1="48" y1="6" x2="49" y2="9" stroke="#475569" strokeWidth="0.8" />
              <line x1="40" y1="3.5" x2="41" y2="6.5" stroke="#475569" strokeWidth="0.8" />
              <line x1="32" y1="4" x2="33" y2="6.5" stroke="#475569" strokeWidth="0.8" />
            </g>

            {/* Chân gần chạy */}
            <g className="anim-sr-fn">
              <path
                d="M 58 37 C 62 44 67 51 63 56 L 68 61 L 65 62 L 59 55 C 59 49 57 43 55 37 Z"
                fill="url(#goat-sil-main)"
              />
              <path d="M 65 60 L 68.5 61.5 L 65 62.5 Z" fill="#020408" />
            </g>
            <g className="anim-sr-bn">
              <path
                d="M 31 35 C 28 41 22 47 20 52 L 27 60 L 24 62 L 15 52 C 18 46 23 41 28 35 Z"
                fill="url(#goat-sil-main)"
              />
              <path d="M 24 60 L 27.5 61.5 L 24 62.5 Z" fill="#020408" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * 🏃‍♂️ CHÚ DÊ ĐEN SILHOUETTE DI CHUYỂN TRONG HỘP LỚN BẢO MẬT (ĐI -> NGỒI -> CHẠY)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TỔNG HỢP: 14 GIÂY ĐẦY ĐỦ (ĐI BỘ -> NGỒI NGHỈ -> CHẠY PHI NƯỚC ĐẠI) */
        @keyframes goat-grand-sil-traverse {
          /* PHA 1: ĐI BỘ (0s -> 4.3s = 0% -> 31%) */
          0% {
            left: -76px;
            opacity: 0;
          }
          3% {
            opacity: 0.96;
          }
          31% {
            left: calc(50% - 32px);
            opacity: 0.96;
          }

          /* PHA 2: DỪNG LẠI & NGỒI NGHỈ (4.3s -> 8.5s = 31% -> 61%) */
          31.5% {
            left: calc(50% - 32px);
            opacity: 0.96;
          }
          60.5% {
            left: calc(50% - 32px);
            opacity: 0.96;
          }

          /* PHA 3: ĐỨNG LÊN VÀ CHẠY PHI NƯỚC ĐẠI (8.5s -> 13.5s = 61% -> 96%) */
          61% {
            left: calc(50% - 32px);
            opacity: 0.96;
          }
          96% {
            left: 104%;
            opacity: 0.96;
          }
          97.5% {
            left: 104%;
            opacity: 0;
          }
          99% {
            left: -76px;
            opacity: 0;
          }
          100% {
            left: -76px;
            opacity: 0;
          }
        }

        /* ẨN HIỆN CHÍNH XÁC TỪNG TƯ THẾ SILHOUETTE */
        @keyframes sil-walk-toggle {
          0%, 31% { opacity: 1; visibility: visible; }
          31.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes sil-sit-toggle {
          0%, 30.9% { opacity: 0; visibility: hidden; }
          31.1%, 60.9% { opacity: 1; visibility: visible; }
          61%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes sil-run-toggle {
          0%, 60.9% { opacity: 0; visibility: hidden; }
          61%, 97% { opacity: 1; visibility: visible; }
          97.1%, 100% { opacity: 0; visibility: hidden; }
        }

        .anim-goat-sil-track {
          position: absolute;
          bottom: 1px;
          animation: goat-grand-sil-traverse 14s linear infinite;
          will-change: left;
        }

        .group:hover .anim-goat-sil-track {
          /* Khi hover vào hộp: chu kỳ tăng tốc nhẹ linh hoạt */
          animation-duration: 9.5s;
        }

        .anim-sil-walk {
          animation: sil-walk-toggle 14s step-end infinite;
        }
        .anim-sil-sit {
          animation: sil-sit-toggle 14s step-end infinite;
        }
        .anim-sil-run {
          animation: sil-run-toggle 14s step-end infinite;
        }

        .group:hover .anim-sil-walk,
        .group:hover .anim-sil-sit,
        .group:hover .anim-sil-run {
          animation-duration: 9.5s;
        }
      `}</style>

      {/* Đường chạy laser bảo mật tinh tế ở sàn hộp lớn */}
      <div className="absolute bottom-2 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/40 to-transparent" />

      {/* Chú dê đen Silhouette tuần tra di chuyển trong hộp lớn */}
      <div className="anim-goat-sil-track flex items-center">
        <SecurityGoat pose="auto" className="w-14 h-10 sm:w-15 sm:h-10.5 opacity-95 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
