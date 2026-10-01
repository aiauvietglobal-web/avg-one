import React from 'react';

/**
 * 🐐 2D ANIMATED BLACK SECURITY GOAT (CHÚ DÊ ĐEN CÔNG NGHỆ 2D THỰC THỤ)
 * 
 * - Đúng chuẩn giải phẫu loài dê (Goat Anatomy):
 *   + Cặp sừng cong vuốt ra sau (Scimitar-curved Horns) có khía đốt vân nổi rõ nét.
 *   + Mõm thuôn dài, sống mũi gồ nhẹ (Roman profile), khóe miệng và lỗ mũi dê.
 *   + Chòm râu cằm dê đen (Goatee beard) dài, bay bổng đặc trưng.
 *   + Đôi tai chúc ngang hình lá mít (Leaf-shaped ears) vểnh nghe ngóng.
 *   + Mắt dê con ngươi ngang (Horizontal pupil) ánh xanh cyan thông minh.
 *   + Đuôi cộc vểnh ngược lên trên (Upturned perky tail - đặc điểm phân biệt rõ với cừu).
 *   + Khớp khuỷu chân sau gập góc, móng guốc chẵn (Cloven hooves) sắc nét.
 * - Đầy đủ các pha chuyển động:
 *   1. Đi (Walk): Bước đi tuần tra khoan thai, 4 chân luân phiên nhịp nhàng.
 *   2. Ngồi (Sit): Gập 4 chân ngồi nghỉ uy nghiêm giữa hộp, chớp mắt, vểnh tai, thở êm ái, vẫy đuôi.
 *   3. Chạy (Run): Đứng dậy phi nước đại thần tốc, sải chân dài, vệt bụi tốc độ bứt phá.
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
        viewBox="0 0 76 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradient Sừng Dê Đen Kim Loại (Obsidian Black) */}
          <linearGradient id="goat-real-horn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          {/* Gradient Sừng Dê Sau */}
          <linearGradient id="goat-real-horn-back-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Gradient Thân Dê Đen Tuyền Cơ Bắp (Deep Obsidian Black) */}
          <linearGradient id="goat-real-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="45%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Gradient Chân Xa (Tông than sẫm phân biệt 2D depth) */}
          <linearGradient id="goat-real-leg-far-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Khiên bảo mật Cyan mờ phía sau */}
          <linearGradient id="goat-real-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <style>{`
          /* === 1. ĐI BỘ (WALK CYCLE) === */
          @keyframes goat-walk-body {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-1.5px) rotate(-1deg); }
          }
          @keyframes goat-walk-fn {
            0%, 100% { transform: rotate(-18deg); }
            50% { transform: rotate(18deg); }
          }
          @keyframes goat-walk-ff {
            0%, 100% { transform: rotate(18deg); }
            50% { transform: rotate(-18deg); }
          }
          @keyframes goat-walk-bn {
            0%, 100% { transform: rotate(16deg); }
            50% { transform: rotate(-16deg); }
          }
          @keyframes goat-walk-bf {
            0%, 100% { transform: rotate(-16deg); }
            50% { transform: rotate(16deg); }
          }
          @keyframes goat-walk-tail {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(18deg); }
          }
          @keyframes goat-walk-beard {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(8deg); }
          }

          /* === 2. CHẠY PHI NƯỚC ĐẠI (RUN / GALLOP CYCLE) === */
          @keyframes goat-run-body {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-3px) rotate(-2deg); }
            50% { transform: translateY(1px) rotate(1deg); }
            75% { transform: translateY(-2px) rotate(-1deg); }
          }
          @keyframes goat-run-fn {
            0% { transform: rotate(-32deg); }
            35% { transform: rotate(26deg); }
            70% { transform: rotate(-10deg); }
            100% { transform: rotate(-32deg); }
          }
          @keyframes goat-run-ff {
            0% { transform: rotate(25deg); }
            35% { transform: rotate(-26deg); }
            70% { transform: rotate(12deg); }
            100% { transform: rotate(25deg); }
          }
          @keyframes goat-run-bn {
            0% { transform: rotate(32deg); }
            35% { transform: rotate(-24deg); }
            70% { transform: rotate(8deg); }
            100% { transform: rotate(32deg); }
          }
          @keyframes goat-run-bf {
            0% { transform: rotate(-24deg); }
            35% { transform: rotate(30deg); }
            70% { transform: rotate(-10deg); }
            100% { transform: rotate(-24deg); }
          }
          @keyframes goat-run-tail {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(22deg); }
          }
          @keyframes goat-run-beard {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-18deg); }
          }
          @keyframes goat-dust-stream {
            0% { transform: translateX(0px); opacity: 0.8; }
            100% { transform: translateX(-20px); opacity: 0; }
          }

          /* === 3. NGỒI NGHỈ & CẢNH GIỚI (SIT / REST CYCLE) === */
          @keyframes goat-sit-breathe {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-0.8px) scale(1.01); }
          }
          @keyframes goat-sit-ear-twitch {
            0%, 75%, 100% { transform: rotate(0deg); }
            80% { transform: rotate(-12deg); }
            85% { transform: rotate(10deg); }
            90% { transform: rotate(-6deg); }
          }
          @keyframes goat-sit-tail-flick {
            0%, 80%, 100% { transform: rotate(0deg); }
            85% { transform: rotate(25deg); }
            90% { transform: rotate(-10deg); }
            95% { transform: rotate(15deg); }
          }
          @keyframes goat-sit-eye-blink {
            0%, 93%, 97%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }

          /* Class bindings */
          .anim-walk-torso { animation: goat-walk-body 1.1s ease-in-out infinite; transform-origin: 34px 28px; }
          .anim-walk-leg-fn { animation: goat-walk-fn 1.1s ease-in-out infinite; transform-origin: 45px 30px; }
          .anim-walk-leg-ff { animation: goat-walk-ff 1.1s ease-in-out infinite; transform-origin: 46px 29px; }
          .anim-walk-leg-bn { animation: goat-walk-bn 1.1s ease-in-out infinite; transform-origin: 24px 29px; }
          .anim-walk-leg-bf { animation: goat-walk-bf 1.1s ease-in-out infinite; transform-origin: 25px 28px; }
          .anim-walk-tail-w { animation: goat-walk-tail 0.8s ease-in-out infinite; transform-origin: 17px 24px; }
          .anim-walk-beard-w { animation: goat-walk-beard 1.1s ease-in-out infinite; transform-origin: 58px 27px; }

          .anim-run-torso { animation: goat-run-body 0.4s ease-in-out infinite; transform-origin: 34px 28px; }
          .anim-run-leg-fn { animation: goat-run-fn 0.4s ease-in-out infinite; transform-origin: 45px 30px; }
          .anim-run-leg-ff { animation: goat-run-ff 0.4s ease-in-out infinite; transform-origin: 46px 29px; }
          .anim-run-leg-bn { animation: goat-run-bn 0.4s ease-in-out infinite; transform-origin: 24px 29px; }
          .anim-run-leg-bf { animation: goat-run-bf 0.4s ease-in-out infinite; transform-origin: 25px 28px; }
          .anim-run-tail-r { animation: goat-run-tail 0.3s ease-in-out infinite; transform-origin: 17px 24px; }
          .anim-run-beard-r { animation: goat-run-beard 0.35s ease-in-out infinite; transform-origin: 58px 27px; }
          .anim-run-dust { animation: goat-dust-stream 0.35s linear infinite; }

          .anim-sit-breathe { animation: goat-sit-breathe 2.4s ease-in-out infinite; transform-origin: 35px 40px; }
          .anim-sit-ear { animation: goat-sit-ear-twitch 3.2s ease-in-out infinite; transform-origin: 46px 18px; }
          .anim-sit-tail { animation: goat-sit-tail-flick 2.8s ease-in-out infinite; transform-origin: 15px 32px; }
          .anim-sit-eye { animation: goat-sit-eye-blink 3.5s ease-in-out infinite; transform-origin: 51px 18px; }
        `}</style>

        {/* 🛡️ BIỂU TƯỢNG KHIÊN BẢO MẬT NỀN */}
        <g opacity="0.35" transform="translate(36, 26)">
          <path
            d="M 0 -19 L 16 -13 C 16 5 9 17 0 21 C -9 17 -16 5 -16 -13 Z"
            fill="url(#goat-real-shield-grad)"
            stroke="#0284C7"
            strokeWidth="1.1"
            strokeDasharray="4 2"
          />
        </g>

        {/* ======================================================================
            POSE 1: ĐI BỘ (WALK POSE)
            ====================================================================== */}
        {(pose === 'walk' || pose === 'auto') && (
          <g className={`goat-pose-walk ${pose === 'auto' ? 'anim-pose-walk' : ''}`}>
            {/* Chân xa (Front far + Back far) */}
            <g className="anim-walk-leg-ff">
              <path d="M 46 29 L 47 38 L 43 45 L 45 47 L 49 39 L 48 29 Z" fill="url(#goat-real-leg-far-grad)" stroke="#1E293B" strokeWidth="0.5" />
              <path d="M 42 45 L 45 47 L 42 47.5 Z" fill="#000000" />
            </g>
            <g className="anim-walk-leg-bf">
              <path d="M 25 28 L 20 37 L 27 45 L 25 47 L 18 37 L 23 28 Z" fill="url(#goat-real-leg-far-grad)" stroke="#1E293B" strokeWidth="0.5" />
              <path d="M 25 45 L 27 46.5 L 24 47 Z" fill="#000000" />
            </g>

            {/* Sừng sau */}
            <path d="M 46 16 C 43 1, 26 -1, 13 6 C 20 8, 33 10, 42 18 Z" fill="url(#goat-real-horn-back-grad)" stroke="#1E293B" strokeWidth="0.6" />

            {/* Thân + Đầu đi bộ */}
            <g className="anim-walk-torso">
              {/* Đuôi cộc vểnh lên */}
              <g className="anim-walk-tail-w">
                <path d="M 18 24 C 13 21 12 17 15 15 C 17 16 18 19 20 23 Z" fill="#0F172A" stroke="#334155" strokeWidth="0.7" />
              </g>

              {/* Khối thân chú dê (vai gồ cao, bụng thon) */}
              <path d="M 19 24 C 23 22 34 22 43 25 L 45 30 C 39 34 25 34 19 29 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.8" />
              {/* Ức và cổ vươn cao */}
              <path d="M 37 24 L 45 16 L 51 18 L 46 29 Z" fill="url(#goat-real-body-grad)" />
              {/* Đầu dê có sống mũi gồ nhẹ (Roman profile) */}
              <path d="M 44 17 L 48 13 L 56 18 L 65 24 L 64 27 L 57 28 L 47 24 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.8" />
              {/* Khóe miệng & Lỗ mũi */}
              <path d="M 64 24 L 63 26 L 60 26.5" stroke="#000000" strokeWidth="0.9" strokeLinecap="round" />
              {/* Chòm râu cằm dê dài đặc trưng */}
              <g className="anim-walk-beard-w">
                <path d="M 58 28 C 61 34 60 41 55 43 C 54 39 55 33 56 28 Z" fill="#090D16" stroke="#475569" strokeWidth="0.7" />
              </g>
              {/* Đôi tai lá mít chúc ngang */}
              <path d="M 45 17 C 40 16 34 18 32 21 C 35 21 41 20 45 18 Z" fill="#1E293B" stroke="#475569" strokeWidth="0.7" />
              <path d="M 43 18 C 39 17 35 19 34 20 C 36 20 40 19 43 18 Z" fill="#334155" />
              {/* Mắt dê con ngươi ngang thông minh */}
              <ellipse cx="51" cy="18" rx="1.6" ry="1.3" fill="#38BDF8" />
              <rect x="50" y="17.5" width="2" height="0.8" rx="0.4" fill="#090D16" />
              <circle cx="51.6" cy="17.4" r="0.35" fill="#FFFFFF" />

              {/* Sừng cong lớn phía trước với các khía đốt uy nghi */}
              <path d="M 48 18 C 45 3, 28 1, 15 8 C 22 10, 36 12, 45 20 Z" fill="url(#goat-real-horn-grad)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="43" y1="13" x2="44" y2="15.5" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="36" y1="8" x2="37" y2="10.5" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="29" y1="5.5" x2="30" y2="8" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="22" y1="5.5" x2="23" y2="7.5" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="16" y1="7.5" x2="17" y2="9.5" stroke="#94A3B8" strokeWidth="0.8" />
            </g>

            {/* Chân gần (Front near + Back near) */}
            <g className="anim-walk-leg-fn">
              <path d="M 44 29 L 47 38 L 51 45 L 49 47 L 44 39 L 42 29 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.7" />
              <path d="M 49 45 L 51.5 46.5 L 48.5 47 Z" fill="#000000" />
            </g>
            <g className="anim-walk-leg-bn">
              <path d="M 24 28 C 21 30 18 33 19 38 L 13 45 L 15 47 L 22 39 L 24 33 L 26 28 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.7" />
              <path d="M 12.5 44.5 L 15 46.5 L 12 47 Z" fill="#000000" />
            </g>
          </g>
        )}

        {/* ======================================================================
            POSE 2: NGỒI NGHỈ & CẢNH GIỚI (SIT / REST POSE)
            ====================================================================== */}
        {(pose === 'sit' || pose === 'auto') && (
          <g className={`goat-pose-sit ${pose === 'auto' ? 'anim-pose-sit' : ''}`}>
            {/* Toàn bộ tư thế ngồi xếp chân uy nghiêm */}
            <g className="anim-sit-breathe">
              {/* Sừng sau */}
              <path d="M 46 25 C 43 10, 26 8, 13 15 C 20 17, 33 19, 42 27 Z" fill="url(#goat-real-horn-back-grad)" stroke="#1E293B" strokeWidth="0.6" />

              {/* Đuôi cộc ngồi vẫy */}
              <g className="anim-sit-tail">
                <path d="M 16 32 C 11 29 10 25 13 23 C 15 24 16 27 18 31 Z" fill="#0F172A" stroke="#334155" strokeWidth="0.7" />
              </g>

              {/* Thân chú dê ngồi sát mặt đất */}
              <path d="M 16 32 C 20 28 34 28 44 32 C 48 35 48 44 42 45 C 32 46 22 46 16 42 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.8" />
              
              {/* 4 Chân gập sát bên sườn và dưới ngực khi ngồi */}
              {/* Chân sau gập áp sát đùi */}
              <path d="M 18 36 C 14 41 15 45 26 45 C 27 43 24 40 20 37 Z" fill="url(#goat-real-leg-far-grad)" stroke="#1E293B" strokeWidth="0.6" />
              <path d="M 23 44 L 26 45 L 24 45.5 Z" fill="#000000" />
              {/* Chân trước gập khuỷu về sau */}
              <path d="M 44 34 L 49 42 L 40 44 L 41 45.5 L 51 43 L 46 34 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.7" />
              <path d="M 39 44 L 41.5 45 L 39.5 45.5 Z" fill="#000000" />

              {/* Ức & Cổ vươn cao cảnh giác */}
              <path d="M 36 32 L 45 24 L 51 26 L 46 36 Z" fill="url(#goat-real-body-grad)" />
              {/* Đầu dê ngẩng cao */}
              <path d="M 44 25 L 48 21 L 56 26 L 65 32 L 64 35 L 57 36 L 47 32 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.8" />
              <path d="M 64 32 L 63 34 L 60 34.5" stroke="#000000" strokeWidth="0.9" strokeLinecap="round" />
              
              {/* Chòm râu cằm dài buông rủ êm ái */}
              <path d="M 58 36 C 61 41 60 47 55 49 C 54 45 55 40 56 36 Z" fill="#090D16" stroke="#475569" strokeWidth="0.7" />

              {/* Tai vểnh nghe ngóng khi ngồi */}
              <g className="anim-sit-ear">
                <path d="M 45 25 C 40 24 34 26 32 29 C 35 29 41 28 45 26 Z" fill="#1E293B" stroke="#475569" strokeWidth="0.7" />
                <path d="M 43 26 C 39 25 35 27 34 28 C 36 28 40 27 43 26 Z" fill="#334155" />
              </g>

              {/* Mắt chớp mềm mại */}
              <g className="anim-sit-eye">
                <ellipse cx="51" cy="26" rx="1.6" ry="1.3" fill="#38BDF8" />
                <rect x="50" y="25.5" width="2" height="0.8" rx="0.4" fill="#090D16" />
                <circle cx="51.6" cy="25.4" r="0.35" fill="#FFFFFF" />
              </g>

              {/* Sừng trước uy nghiêm */}
              <path d="M 48 26 C 45 11, 28 9, 15 16 C 22 18, 36 20, 45 28 Z" fill="url(#goat-real-horn-grad)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="43" y1="21" x2="44" y2="23.5" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="36" y1="16" x2="37" y2="18.5" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="29" y1="13.5" x2="30" y2="16" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="22" y1="13.5" x2="23" y2="15.5" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="16" y1="15.5" x2="17" y2="17.5" stroke="#94A3B8" strokeWidth="0.8" />
            </g>
          </g>
        )}

        {/* ======================================================================
            POSE 3: CHẠY PHI NƯỚC ĐẠI (RUN / GALLOP POSE)
            ====================================================================== */}
        {(pose === 'run' || pose === 'auto') && (
          <g className={`goat-pose-run ${pose === 'auto' ? 'anim-pose-run' : ''}`}>
            {/* Vệt bụi tốc độ bay về sau */}
            <g opacity="0.7">
              <line x1="20" y1="46" x2="6" y2="46" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" className="anim-run-dust" />
              <line x1="26" y1="48" x2="10" y2="48" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" className="anim-run-dust" />
              <circle cx="14" cy="45" r="1" fill="#64748B" className="anim-run-dust" />
              <circle cx="9" cy="47" r="1.2" fill="#0284C7" className="anim-run-dust" />
            </g>

            {/* Chân xa chạy */}
            <g className="anim-run-leg-ff">
              <path d="M 45 28 L 48 37 L 44 43 L 46 44 L 49 37 L 47 28 Z" fill="url(#goat-real-leg-far-grad)" stroke="#1E293B" strokeWidth="0.5" />
              <path d="M 43.5 42.5 L 46 44 L 44 44.5 Z" fill="#000000" />
            </g>
            <g className="anim-run-leg-bf">
              <path d="M 26 27 L 22 34 L 28 41 L 26 43 L 20 34 L 24 27 Z" fill="url(#goat-real-leg-far-grad)" stroke="#1E293B" strokeWidth="0.5" />
              <path d="M 26 41.5 L 28 42.5 L 25.5 43.5 Z" fill="#000000" />
            </g>

            {/* Sừng sau chạy */}
            <path d="M 45 14 C 41 6 32 3 24 6 C 29 8 36 10 42 16 Z" fill="url(#goat-real-horn-back-grad)" stroke="#1E293B" strokeWidth="0.6" />

            {/* Thân thể + Đầu chạy phi nước đại */}
            <g className="anim-run-torso">
              {/* Đuôi bay trong gió */}
              <g className="anim-run-tail-r">
                <path d="M 20 23 C 15 20 14 16 16 15 C 18 16 19 19 21 22 Z" fill="#0F172A" stroke="#334155" strokeWidth="0.7" />
              </g>

              {/* Thân mình chú dê căng tràn sức mạnh */}
              <path d="M 21 23 C 24 21 34 21 42 24 L 44 29 C 38 33 26 33 21 29 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.8" />
              <path d="M 38 23 L 44 16 L 49 18 L 45 28 Z" fill="url(#goat-real-body-grad)" />

              {/* Đầu chú dê vươn về phía trước */}
              <path d="M 43 17 L 47 13 L 55 18 L 64 23 L 63 26 L 56 27 L 46 23 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.8" />
              <path d="M 64 23 L 63 25 L 60 25.5" stroke="#000000" strokeWidth="0.9" strokeLinecap="round" />

              {/* Râu cằm dê đen tung bay tít về sau */}
              <g className="anim-run-beard-r">
                <path d="M 57 27 C 60 31 59 38 54 40 C 53 36 54 31 55 27 Z" fill="#090D16" stroke="#475569" strokeWidth="0.7" />
              </g>

              {/* Tai dê áp sát ra sau đón gió */}
              <path d="M 44 16 C 39 15 33 17 31 20 C 34 20 40 19 44 17 Z" fill="#1E293B" stroke="#475569" strokeWidth="0.7" />
              <path d="M 42 17 C 38 16 34 18 33 19 C 35 19 39 18 42 17 Z" fill="#334155" />

              {/* Mắt công nghệ sáng thông minh */}
              <ellipse cx="50" cy="17" rx="1.6" ry="1.3" fill="#38BDF8" />
              <rect x="49" y="16.5" width="2" height="0.8" rx="0.4" fill="#090D16" />
              <circle cx="50.6" cy="16.4" r="0.35" fill="#FFFFFF" />

              {/* Sừng trước cong vuốt */}
              <path d="M 46 14 C 43 5 33 2 25 5 C 31 7 38 9 44 16 Z" fill="url(#goat-real-horn-grad)" stroke="#64748B" strokeWidth="0.8" />
              <line x1="38" y1="11" x2="39" y2="13" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="33" y1="8" x2="34" y2="10" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="28" y1="6" x2="29" y2="8" stroke="#94A3B8" strokeWidth="0.8" />
            </g>

            {/* Chân gần chạy */}
            <g className="anim-run-leg-fn">
              <path d="M 43 29 L 45 37 L 50 43 L 48 44.5 L 43 38 L 41 29 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.7" />
              <path d="M 48 43 L 50.5 44.5 L 48 45 Z" fill="#000000" />
            </g>
            <g className="anim-run-leg-bn">
              <path d="M 25 28 C 22 30 19 33 20 37 L 14 43 L 16 44.5 L 22 38 L 24 33 L 27 28 Z" fill="url(#goat-real-body-grad)" stroke="#334155" strokeWidth="0.7" />
              <path d="M 13.5 42.5 L 15.5 44.5 L 13 44.5 Z" fill="#000000" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * 🏃‍♂️ CHÚ DÊ ĐEN DI CHUYỂN TRONG HỘP LỚN (ĐẦY ĐỦ CÁC PHA: ĐI -> NGỒI -> CHẠY)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TỔNG HỢP: 14 GIÂY ĐẦY ĐỦ (ĐI -> NGỒI -> CHẠY) */
        @keyframes goat-grand-traverse {
          /* PHA 1: ĐI BỘ (0s -> 4.3s = 0% -> 31%) */
          0% {
            left: -68px;
            opacity: 0;
          }
          3% {
            opacity: 0.95;
          }
          31% {
            left: calc(50% - 28px);
            opacity: 0.95;
          }

          /* PHA 2: DỪNG LẠI & NGỒI NGHỈ (4.3s -> 8.5s = 31% -> 61%) */
          32% {
            left: calc(50% - 28px);
            opacity: 0.95;
          }
          60.5% {
            left: calc(50% - 28px);
            opacity: 0.95;
          }

          /* PHA 3: ĐỨNG LÊN VÀ CHẠY PHI NƯỚC ĐẠI (8.5s -> 13.4s = 61% -> 96%) */
          61% {
            left: calc(50% - 28px);
            opacity: 0.95;
          }
          96% {
            left: 104%;
            opacity: 0.95;
          }
          97.5% {
            left: 104%;
            opacity: 0;
          }
          99% {
            left: -68px;
            opacity: 0;
          }
          100% {
            left: -68px;
            opacity: 0;
          }
        }

        /* ẨN HIỆN CHÍNH XÁC TỪNG TƯ THẾ */
        @keyframes pose-walk-toggle {
          0%, 31% { opacity: 1; visibility: visible; }
          31.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes pose-sit-toggle {
          0%, 30.9% { opacity: 0; visibility: hidden; }
          31.1%, 60.9% { opacity: 1; visibility: visible; }
          61%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes pose-run-toggle {
          0%, 60.9% { opacity: 0; visibility: hidden; }
          61%, 97% { opacity: 1; visibility: visible; }
          97.1%, 100% { opacity: 0; visibility: hidden; }
        }

        .anim-goat-grand-track {
          position: absolute;
          bottom: 2px;
          animation: goat-grand-traverse 14s linear infinite;
          will-change: left;
        }

        .group:hover .anim-goat-grand-track {
          /* Khi hover vào hộp: tăng tốc chu kỳ tuần tra */
          animation-duration: 9s;
        }

        .anim-pose-walk {
          animation: pose-walk-toggle 14s step-end infinite;
        }
        .anim-pose-sit {
          animation: pose-sit-toggle 14s step-end infinite;
        }
        .anim-pose-run {
          animation: pose-run-toggle 14s step-end infinite;
        }

        .group:hover .anim-pose-walk,
        .group:hover .anim-pose-sit,
        .group:hover .anim-pose-run {
          animation-duration: 9s;
        }
      `}</style>

      {/* Đường chạy laser bảo mật tinh tế ở sàn hộp */}
      <div className="absolute bottom-2.5 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/40 to-transparent" />

      {/* Chú dê đen tuần tra di chuyển trong hộp lớn */}
      <div className="anim-goat-grand-track flex items-center">
        <SecurityGoat pose="auto" className="w-13 h-9.5 sm:w-14 sm:h-10 opacity-90 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
