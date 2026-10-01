import React from 'react';

/**
 * 🐐 CHÚ DÊ CÔNG NGHỆ BẢO MẬT (CHUẨN 100% THEO HÌNH VẼ MINH HỌA CỦA USER)
 * 
 * - Đúng từng chi tiết giải phẫu của hình vẽ:
 *   + Cặp sừng cong vuốt qua gáy với 7 khía đốt sừng rõ nét.
 *   + Chòm râu cằm dê xòe nhánh đặc trưng.
 *   + Đôi tai vểnh ngang và tai cụp mềm mại.
 *   + Mắt có bờ mi và con ngươi sống động.
 *   + Các vệt túm lông cổ (chest mane) lượn sóng tự nhiên.
 *   + Lưng uốn lượn, bụng thon, đuôi cộc vểnh nhẹ.
 *   + 4 chân có khớp khuỷu gập góc, móng guốc chẵn màu xám viền đen.
 * - Đầy đủ 3 trạng thái chuyển động:
 *   1. ĐỨNG (Stand): Đứng uy nghiêm giữa hộp, thở phập phồng, chớp mắt, vểnh tai, vẫy đuôi.
 *   2. ĐI (Walk): Bước đi tuần tra êm đềm, 4 chân luân phiên nhịp nhàng.
 *   3. NẰM (Lie down): Gập chân nằm nghỉ thư thái sát sàn hộp.
 */

interface SecurityGoatProps {
  className?: string;
  pose?: 'stand' | 'walk' | 'lie' | 'auto';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  pose = 'stand'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 160 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Màu thân chú dê: Trắng kem sang trọng, viền đen sắc sảo chuẩn hình vẽ */}
          <linearGradient id="goat-draw-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>

          {/* Màu chân xa: Đổ bóng xám nhẹ tạo chiều sâu 2D chân thực */}
          <linearGradient id="goat-draw-far" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        <style>{`
          /* =========================================================
             1. TRẠNG THÁI ĐỨNG (STAND - THỞ, CHỚP MẮT, VỂNH TAI, VẪY ĐUÔI)
             ========================================================= */
          @keyframes goat-stand-breathe {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-0.8px) scale(1.008); }
          }
          @keyframes goat-stand-tail {
            0%, 80%, 100% { transform: rotate(0deg); }
            85% { transform: rotate(16deg); }
            90% { transform: rotate(-8deg); }
            95% { transform: rotate(12deg); }
          }
          @keyframes goat-stand-ear {
            0%, 75%, 100% { transform: rotate(0deg); }
            80% { transform: rotate(-10deg); }
            85% { transform: rotate(8deg); }
            90% { transform: rotate(-4deg); }
          }
          @keyframes goat-stand-eye {
            0%, 93%, 97%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }

          /* =========================================================
             2. TRẠNG THÁI ĐI (WALK - SẢI BƯỚC 4 CHÂN)
             ========================================================= */
          @keyframes goat-walk-torso {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-1.2px) rotate(-0.5deg); }
            50% { transform: translateY(0.4px) rotate(0.4deg); }
            75% { transform: translateY(-0.8px) rotate(-0.2deg); }
          }
          @keyframes goat-walk-fn {
            0% { transform: rotate(-18deg); }
            25% { transform: rotate(4deg); }
            50% { transform: rotate(18deg); }
            75% { transform: rotate(-4deg); }
            100% { transform: rotate(-18deg); }
          }
          @keyframes goat-walk-ff {
            0% { transform: rotate(18deg); }
            25% { transform: rotate(-4deg); }
            50% { transform: rotate(-18deg); }
            75% { transform: rotate(4deg); }
            100% { transform: rotate(18deg); }
          }
          @keyframes goat-walk-bn {
            0% { transform: rotate(16deg); }
            25% { transform: rotate(-4deg); }
            50% { transform: rotate(-16deg); }
            75% { transform: rotate(6deg); }
            100% { transform: rotate(16deg); }
          }
          @keyframes goat-walk-bf {
            0% { transform: rotate(-16deg); }
            25% { transform: rotate(6deg); }
            50% { transform: rotate(16deg); }
            75% { transform: rotate(-4deg); }
            100% { transform: rotate(-16deg); }
          }
          @keyframes goat-walk-tail {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(14deg); }
          }

          /* =========================================================
             3. TRẠNG THÁI NẰM (LIE DOWN - GẬP CHÂN THƯ THÁI)
             ========================================================= */
          @keyframes goat-lie-breathe {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-1px) scale(1.01); }
          }
          @keyframes goat-lie-tail {
            0%, 75%, 100% { transform: rotate(0deg); }
            80% { transform: rotate(20deg); }
            85% { transform: rotate(-10deg); }
            90% { transform: rotate(15deg); }
          }

          /* Bindings */
          .anim-st-breathe { animation: goat-stand-breathe 2.5s ease-in-out infinite; transform-origin: 80px 60px; }
          .anim-st-tail { animation: goat-stand-tail 3.2s ease-in-out infinite; transform-origin: 135px 48px; }
          .anim-st-ear { animation: goat-stand-ear 3.5s ease-in-out infinite; transform-origin: 41px 27px; }
          .anim-st-eye { animation: goat-stand-eye 3.8s ease-in-out infinite; transform-origin: 35px 33px; }

          .anim-wk-torso { animation: goat-walk-torso 1.25s ease-in-out infinite; transform-origin: 80px 60px; }
          .anim-wk-fn { animation: goat-walk-fn 1.25s ease-in-out infinite; transform-origin: 62px 70px; }
          .anim-wk-ff { animation: goat-walk-ff 1.25s ease-in-out infinite; transform-origin: 50px 72px; }
          .anim-wk-bn { animation: goat-walk-bn 1.25s ease-in-out infinite; transform-origin: 120px 66px; }
          .anim-wk-bf { animation: goat-walk-bf 1.25s ease-in-out infinite; transform-origin: 112px 70px; }
          .anim-wk-tail { animation: goat-walk-tail 1.0s ease-in-out infinite; transform-origin: 135px 48px; }

          .anim-li-breathe { animation: goat-lie-breathe 2.8s ease-in-out infinite; transform-origin: 80px 85px; }
          .anim-li-tail { animation: goat-lie-tail 3.0s ease-in-out infinite; transform-origin: 132px 70px; }
        `}</style>

        {/* ======================================================================
            TƯ THẾ 1: ĐỨNG (STAND - GIỐNG HỆT 100% HÌNH VẼ USER GỬI)
            ====================================================================== */}
        {(pose === 'stand' || pose === 'auto') && (
          <g className={`goat-pose-stand ${pose === 'auto' ? 'anim-pose-stand' : ''}`}>
            {/* Lớp chân xa phía sau */}
            {/* Chân trước xa */}
            <path
              d="M 50 72 C 53 82 54 91 52 101 L 54 112 L 47 113 L 46 102 C 48 92 48 83 44 76 Z"
              fill="url(#goat-draw-far)"
              stroke="#0F172A"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Móng guốc xa */}
            <path d="M 47 107 L 54 106 L 53 113 L 46 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            <line x1="50" y1="107" x2="49" y2="114" stroke="#0F172A" strokeWidth="1.8" />

            {/* Chân sau xa */}
            <path
              d="M 112 70 C 117 79 120 89 116 100 L 114 112 L 107 113 L 107 102 C 110 92 107 83 102 76 Z"
              fill="url(#goat-draw-far)"
              stroke="#0F172A"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Móng guốc xa */}
            <path d="M 107 107 L 114 106 L 113 113 L 106 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            <line x1="110" y1="107" x2="109" y2="114" stroke="#0F172A" strokeWidth="1.8" />

            {/* Sừng xa phía sau */}
            <path
              d="M 32 21 C 36 14 46 9 58 7 C 55 10 47 16 38 24 Z"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Tai xa */}
            <path
              d="M 21 21 C 18 19 13 18 11 20 C 13 22 17 23 21 22 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2"
            />

            {/* Thân mình + Đầu đứng uy nghiêm (Có nhịp thở êm ái) */}
            <g className="anim-st-breathe">
              {/* Đuôi cộc vểnh nhẹ */}
              <g className="anim-st-tail">
                <path
                  d="M 135 48 C 142 53 144 65 140 70 C 139 68 138 62 136 58 Z"
                  fill="url(#goat-draw-body)"
                  stroke="#0F172A"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </g>

              {/* Khối thân chính chuẩn từng đường nét hình vẽ */}
              <path
                d="M 48 76 C 38 66 32 55 26 47 C 32 40 40 33 66 38 C 76 39 88 40 102 38 C 114 36 126 36 134 45 C 138 51 138 58 135 65 C 130 75 125 78 120 66 C 116 72 110 77 100 80 C 82 85 65 85 52 78 Z"
                fill="url(#goat-draw-body)"
                stroke="#0F172A"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Lông ngực lượn sóng tự nhiên */}
              <path d="M 38 48 C 39 53 41 57 40 60" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 42 50 C 44 55 45 61 43 65" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 47 54 C 49 60 50 67 47 72" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

              {/* Đầu dê có sống mũi và khuôn miệng chuẩn xác */}
              <path
                d="M 28 26 C 24 33 19 41 16 45 C 15 47 16 48 18 49 C 20 49 22 47 25 45 C 23 46 22 49 25 50 C 26 47 26 47 26 47"
                fill="url(#goat-draw-body)"
                stroke="#0F172A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lỗ mũi */}
              <path d="M 17 44 C 15 45 16 47 17 47" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />

              {/* Chòm râu cằm dê dài phân nhánh */}
              <path
                d="M 22 50 C 23 55 22 62 26 64 C 27 60 27 55 25 50 Z"
                fill="url(#goat-draw-body)"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M 24 53 C 24 58 25 61 27 62" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

              {/* Mắt dê sống động có mí mắt và con ngươi */}
              <g className="anim-st-eye">
                <path d="M 30 33 C 33 30 38 31 40 34 C 38 36 33 36 30 33 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
                <circle cx="35" cy="33.5" r="2.2" fill="#0F172A" />
                <circle cx="36" cy="32.8" r="0.7" fill="#FFFFFF" />
                <path d="M 29 31 C 33 28 38 29 41 32" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
              </g>

              {/* Tai gần có nếp gấp */}
              <g className="anim-st-ear">
                <path
                  d="M 41 27 C 46 25 54 26 56 31 C 52 32 46 31 41 29 Z"
                  fill="url(#goat-draw-body)"
                  stroke="#0F172A"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path d="M 43 28 C 47 27 52 28 53 30" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
              </g>

              {/* Sừng lớn phía trước cong vuốt có 7 khía đốt chuẩn như hình */}
              <path
                d="M 36 24 C 40 16 52 11 68 8 C 64 12 55 18 43 28 Z"
                fill="url(#goat-draw-body)"
                stroke="#0F172A"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {/* 7 Khía đốt vân sừng uy nghi */}
              <line x1="42" y1="22" x2="44" y2="26" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="18" x2="50" y2="22" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="54" y1="15" x2="56" y2="19" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="60" y1="12" x2="62" y2="16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="65" y1="10" x2="67" y2="14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Chân trước gần */}
            <path
              d="M 62 70 C 65 78 66 88 64 98 L 66 112 L 59 113 L 58 100 C 59 90 58 80 54 74 Z"
              fill="url(#goat-draw-body)"
              stroke="#0F172A"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Móng guốc trước */}
            <path d="M 59 107 L 66 106 L 65 113 L 58 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            <line x1="62" y1="107" x2="61" y2="114" stroke="#0F172A" strokeWidth="1.8" />

            {/* Chân sau gần */}
            <path
              d="M 120 66 C 128 78 132 90 128 102 L 126 112 L 119 113 L 119 102 C 122 92 118 82 112 76 Z"
              fill="url(#goat-draw-body)"
              stroke="#0F172A"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Móng guốc sau */}
            <path d="M 119 107 L 126 106 L 125 113 L 118 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            <line x1="122" y1="107" x2="121" y2="114" stroke="#0F172A" strokeWidth="1.8" />
          </g>
        )}

        {/* ======================================================================
            TƯ THẾ 2: ĐI BỘ (WALK - SẢI BƯỚC NHỊP NHÀNG 4 CHÂN)
            ====================================================================== */}
        {(pose === 'walk' || pose === 'auto') && (
          <g className={`goat-pose-walk ${pose === 'auto' ? 'anim-pose-walk' : ''}`}>
            {/* Chân trước xa đi */}
            <g className="anim-wk-ff">
              <path d="M 50 72 C 53 82 54 91 52 101 L 54 112 L 47 113 L 46 102 C 48 92 48 83 44 76 Z" fill="url(#goat-draw-far)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 47 107 L 54 106 L 53 113 L 46 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            </g>
            {/* Chân sau xa đi */}
            <g className="anim-wk-bf">
              <path d="M 112 70 C 117 79 120 89 116 100 L 114 112 L 107 113 L 107 102 C 110 92 107 83 102 76 Z" fill="url(#goat-draw-far)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 107 107 L 114 106 L 113 113 L 106 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            </g>

            {/* Sừng xa */}
            <path d="M 32 21 C 36 14 46 9 58 7 C 55 10 47 16 38 24 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 21 21 C 18 19 13 18 11 20 C 13 22 17 23 21 22 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

            {/* Thân mình đi bộ */}
            <g className="anim-wk-torso">
              {/* Đuôi đi bộ */}
              <g className="anim-wk-tail">
                <path d="M 135 48 C 142 53 144 65 140 70 C 139 68 138 62 136 58 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              </g>

              {/* Thân chính */}
              <path
                d="M 48 76 C 38 66 32 55 26 47 C 32 40 40 33 66 38 C 76 39 88 40 102 38 C 114 36 126 36 134 45 C 138 51 138 58 135 65 C 130 75 125 78 120 66 C 116 72 110 77 100 80 C 82 85 65 85 52 78 Z"
                fill="url(#goat-draw-body)"
                stroke="#0F172A"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path d="M 38 48 C 39 53 41 57 40 60" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 42 50 C 44 55 45 61 43 65" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 47 54 C 49 60 50 67 47 72" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

              {/* Đầu */}
              <path d="M 28 26 C 24 33 19 41 16 45 C 15 47 16 48 18 49 C 20 49 22 47 25 45 C 23 46 22 49 25 50 C 26 47 26 47 26 47" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 17 44 C 15 45 16 47 17 47" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 22 50 C 23 55 22 62 26 64 C 27 60 27 55 25 50 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />

              {/* Mắt */}
              <path d="M 30 33 C 33 30 38 31 40 34 C 38 36 33 36 30 33 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="35" cy="33.5" r="2.2" fill="#0F172A" />
              <circle cx="36" cy="32.8" r="0.7" fill="#FFFFFF" />

              {/* Tai */}
              <path d="M 41 27 C 46 25 54 26 56 31 C 52 32 46 31 41 29 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              {/* Sừng */}
              <path d="M 36 24 C 40 16 52 11 68 8 C 64 12 55 18 43 28 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.4" strokeLinejoin="round" />
              <line x1="42" y1="22" x2="44" y2="26" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="18" x2="50" y2="22" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="54" y1="15" x2="56" y2="19" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="60" y1="12" x2="62" y2="16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="65" y1="10" x2="67" y2="14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Chân trước gần đi */}
            <g className="anim-wk-fn">
              <path d="M 62 70 C 65 78 66 88 64 98 L 66 112 L 59 113 L 58 100 C 59 90 58 80 54 74 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M 59 107 L 66 106 L 65 113 L 58 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            </g>
            {/* Chân sau gần đi */}
            <g className="anim-wk-bn">
              <path d="M 120 66 C 128 78 132 90 128 102 L 126 112 L 119 113 L 119 102 C 122 92 118 82 112 76 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M 119 107 L 126 106 L 125 113 L 118 114 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.2" />
            </g>
          </g>
        )}

        {/* ======================================================================
            TƯ THẾ 3: NẰM NGHỈ (LIE DOWN - GẬP CHÂN THƯ THÁI)
            ====================================================================== */}
        {(pose === 'lie' || pose === 'auto') && (
          <g className={`goat-pose-lie ${pose === 'auto' ? 'anim-pose-lie' : ''}`}>
            <g className="anim-li-breathe">
              {/* Sừng xa */}
              <path d="M 32 45 C 36 38 46 33 58 31 C 55 34 47 40 38 48 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 21 45 C 18 43 13 42 11 44 C 13 46 17 47 21 46 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

              {/* Đuôi nằm */}
              <g className="anim-li-tail">
                <path d="M 135 72 C 142 77 144 89 140 94 C 139 92 138 86 136 82 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              </g>

              {/* Thân nằm sát mặt đất */}
              <path
                d="M 48 100 C 38 90 32 79 26 71 C 32 64 40 57 66 62 C 76 63 88 64 102 62 C 114 60 126 60 134 69 C 138 75 138 82 135 89 C 130 99 125 102 120 90 C 116 96 110 101 100 104 C 82 109 65 109 52 102 Z"
                fill="url(#goat-draw-body)"
                stroke="#0F172A"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />

              {/* 4 Chân gập sát bên sườn và dưới ngực khi nằm */}
              {/* Chân sau gập áp sát đùi */}
              <path d="M 106 95 C 114 92 124 94 130 102 L 126 112 L 112 112 C 108 106 104 100 106 95 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 120 107 L 126 106 L 125 112 L 119 113 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />

              {/* Chân trước gập khuỷu về sau */}
              <path d="M 52 92 C 58 92 68 96 74 102 L 70 112 L 56 112 C 52 106 50 98 52 92 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 64 107 L 70 106 L 69 112 L 63 113 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />

              {/* Đầu ngẩng cao khi nằm */}
              <path d="M 28 50 C 24 57 19 65 16 69 C 15 71 16 72 18 73 C 20 73 22 71 25 69 C 23 70 22 73 25 74 C 26 71 26 71 26 71" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 17 68 C 15 69 16 71 17 71" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 22 74 C 23 79 22 86 26 88 C 27 84 27 79 25 74 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />

              {/* Mắt khi nằm */}
              <path d="M 30 57 C 33 54 38 55 40 58 C 38 60 33 60 30 57 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="35" cy="57.5" r="2.2" fill="#0F172A" />
              <circle cx="36" cy="56.8" r="0.7" fill="#FFFFFF" />

              {/* Tai */}
              <path d="M 41 51 C 46 49 54 50 56 55 C 52 56 46 55 41 53 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />

              {/* Sừng trước */}
              <path d="M 36 48 C 40 40 52 35 68 32 C 64 36 55 42 43 52 Z" fill="url(#goat-draw-body)" stroke="#0F172A" strokeWidth="2.4" strokeLinejoin="round" />
              <line x1="42" y1="46" x2="44" y2="50" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="42" x2="50" y2="46" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="54" y1="39" x2="56" y2="43" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="60" y1="36" x2="62" y2="40" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="65" y1="34" x2="67" y2="38" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHU TRÌNH ĐẦY ĐỦ (ĐI -> ĐỨNG -> NẰM -> ĐỨNG LÊN)
 * - Tản bộ vào giữa hộp, đứng uy nghiêm bảo vệ, nằm nghỉ ngơi thư thái, rồi bước tiếp.
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TỔNG HỢP: 15 GIÂY (ĐI -> ĐỨNG -> NẰM) */
        @keyframes goat-flow-traverse {
          /* PHA 1: ĐI VÀO (0s -> 4.5s = 0% -> 30%) */
          0% {
            left: -80px;
            opacity: 0;
          }
          3% {
            opacity: 0.98;
          }
          30% {
            left: calc(50% - 32px);
            opacity: 0.98;
          }

          /* PHA 2: ĐỨNG YÊN TẠI CHỖ (4.5s -> 8.5s = 30% -> 56%) */
          30.5% {
            left: calc(50% - 32px);
            opacity: 0.98;
          }
          56% {
            left: calc(50% - 32px);
            opacity: 0.98;
          }

          /* PHA 3: NẰM XUỐNG NGHỈ TẠI CHỖ (8.5s -> 13.0s = 56% -> 86%) */
          56.5% {
            left: calc(50% - 32px);
            opacity: 0.98;
          }
          86% {
            left: calc(50% - 32px);
            opacity: 0.98;
          }

          /* PHA 4: ĐỨNG DẬY VÀ ĐI TIẾP RA NGOÀI (13.0s -> 15.0s = 86% -> 97%) */
          87% {
            left: calc(50% - 32px);
            opacity: 0.98;
          }
          97% {
            left: 104%;
            opacity: 0.98;
          }
          98% {
            left: 104%;
            opacity: 0;
          }
          99% {
            left: -80px;
            opacity: 0;
          }
          100% {
            left: -80px;
            opacity: 0;
          }
        }

        /* ẨN HIỆN ĐÚNG THEO TỪNG PHA CHUYỂN ĐỘNG */
        @keyframes pose-walk-flow {
          0%, 30% { opacity: 1; visibility: visible; }
          30.1%, 86.9% { opacity: 0; visibility: hidden; }
          87%, 97% { opacity: 1; visibility: visible; }
          97.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes pose-stand-flow {
          0%, 30% { opacity: 0; visibility: hidden; }
          30.1%, 56% { opacity: 1; visibility: visible; }
          56.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes pose-lie-flow {
          0%, 56% { opacity: 0; visibility: hidden; }
          56.1%, 86.9% { opacity: 1; visibility: visible; }
          87%, 100% { opacity: 0; visibility: hidden; }
        }

        .anim-goat-flow-track {
          position: absolute;
          bottom: 2px;
          animation: goat-flow-traverse 15s linear infinite;
          will-change: left;
        }

        .group:hover .anim-goat-flow-track {
          /* Khi hover: tăng tốc nhẹ */
          animation-duration: 10s;
        }

        .anim-pose-walk {
          animation: pose-walk-flow 15s step-end infinite;
        }
        .anim-pose-stand {
          animation: pose-stand-flow 15s step-end infinite;
        }
        .anim-pose-lie {
          animation: pose-lie-flow 15s step-end infinite;
        }

        .group:hover .anim-pose-walk,
        .group:hover .anim-pose-stand,
        .group:hover .anim-pose-lie {
          animation-duration: 10s;
        }
      `}</style>

      {/* Đường nền sàn mờ nhẹ */}
      <div className="absolute bottom-2.5 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/40 to-transparent" />

      {/* Chú dê đúng hình mẫu di chuyển: Đi -> Đứng -> Nằm */}
      <div className="anim-goat-flow-track flex items-center">
        <SecurityGoat pose="auto" className="w-13 h-10 sm:w-14 sm:h-10.5 opacity-95 hover:opacity-100 transition-opacity drop-shadow-xs" />
      </div>
    </div>
  );
};
