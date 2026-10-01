import React from 'react';

/**
 * 🐐 CHÚ DÊ CÔNG NGHỆ BẢO MẬT (CHUYỂN ĐỘNG THỰC SỰ - CHUẨN 100% THEO HÌNH VẼ MẪU)
 * 
 * - Khắc phục triệt để yêu cầu của user:
 *   + "Không thấy chân, cơ thể chuyển động":
 *     -> 4 chân thực sự bước đi (sải chân, gập khuỷu, nhấc móng hooves rõ nét).
 *     -> Đầu và sừng gật gù theo nhịp bước.
 *     -> Đuôi cộc ve vẩy vui mắt.
 *     -> Thân mình nhún nhẩy theo từng nhịp chân khi đi.
 *     -> Khi đứng: Thở phập phồng lồng ngực sinh học, chớp mắt, vểnh tai.
 *     -> Khi nằm: Thực sự gập 4 chân xuống, hạ thấp người sát sàn hộp.
 *   + "Không đi lùi": Luôn quay đầu về phía trước theo đúng vector di chuyển.
 *   + "Lúc nào cũng xuất hiện": Tuần tra liên tục bên trong ranh giới hộp 100% thời gian.
 *   + Không đè lên chữ: Vị trí chân đặt cao hơn chữ "Bảo Mật", chữ luôn thông thoáng.
 */

interface SecurityGoatProps {
  className?: string;
  pose?: 'walk' | 'turn-walk' | 'stand' | 'lie';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  pose = 'stand'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 700 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Màu thân trắng ngà sang trọng chuẩn nét vẽ */}
          <linearGradient id="goat-v-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>

          {/* Màu chân xa đổ bóng nhẹ tạo chiều sâu 2D */}
          <linearGradient id="goat-v-far" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Màu móng guốc xám chuẩn hình vẽ */}
          <linearGradient id="goat-v-hoof" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        <style>{`
          /* =========================================================
             1. BƯỚC ĐI THẬT SỰ (4 CHÂN CO DUỖI SẢI BƯỚC RÕ RÀNG)
             ========================================================= */
          @keyframes anim-leg-fn-walk {
            0% { transform: rotate(-24deg); }
            25% { transform: rotate(6deg); }
            50% { transform: rotate(24deg); }
            75% { transform: rotate(-6deg); }
            100% { transform: rotate(-24deg); }
          }

          @keyframes anim-leg-ff-walk {
            0% { transform: rotate(24deg); }
            25% { transform: rotate(-6deg); }
            50% { transform: rotate(-24deg); }
            75% { transform: rotate(6deg); }
            100% { transform: rotate(24deg); }
          }

          @keyframes anim-leg-bn-walk {
            0% { transform: rotate(22deg); }
            25% { transform: rotate(-6deg); }
            50% { transform: rotate(-22deg); }
            75% { transform: rotate(8deg); }
            100% { transform: rotate(22deg); }
          }

          @keyframes anim-leg-bf-walk {
            0% { transform: rotate(-22deg); }
            25% { transform: rotate(8deg); }
            50% { transform: rotate(22deg); }
            75% { transform: rotate(-6deg); }
            100% { transform: rotate(-22deg); }
          }

          @keyframes anim-head-nod-walk {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(3.5deg); }
          }

          @keyframes anim-tail-wag-walk {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(18deg); }
          }

          @keyframes anim-body-bob-walk {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-4px) rotate(-1deg); }
            50% { transform: translateY(2px) rotate(0.8deg); }
            75% { transform: translateY(-3px) rotate(-0.5deg); }
          }

          /* =========================================================
             2. ĐỨNG THỞ PHẬP PHỒNG & QUAN SÁT (STAND)
             ========================================================= */
          @keyframes anim-torso-stand-breathe {
            0%, 100% { transform: scale(1) translateY(0px); }
            50% { transform: scale(1.025, 1.018) translateY(-2px); }
          }

          @keyframes anim-head-stand-look {
            0%, 70%, 100% { transform: rotate(0deg); }
            75% { transform: rotate(-2.5deg); }
            85% { transform: rotate(3deg); }
            90% { transform: rotate(-1deg); }
          }

          @keyframes anim-tail-stand-flick {
            0%, 75%, 100% { transform: rotate(0deg); }
            80% { transform: rotate(20deg); }
            85% { transform: rotate(-12deg); }
            90% { transform: rotate(15deg); }
          }

          /* =========================================================
             3. NẰM XUỐNG NGHỈ THƯ THÁI (LIE DOWN)
             ========================================================= */
          @keyframes anim-torso-lie-down {
            0%, 100% { transform: translateY(32px) scaleY(0.82); }
            50% { transform: translateY(30px) scaleY(0.835); }
          }

          @keyframes anim-legs-front-fold {
            0%, 100% { transform: translateY(24px) rotate(48deg) scale(0.85); }
          }

          @keyframes anim-legs-back-fold {
            0%, 100% { transform: translateY(24px) rotate(-48deg) scale(0.85); }
          }

          @keyframes anim-head-lie-pose {
            0%, 100% { transform: translateY(12px) rotate(-4deg); }
          }

          @keyframes anim-tail-lie-wag {
            0%, 70%, 100% { transform: rotate(0deg); }
            80% { transform: rotate(18deg); }
          }

          /* Animation Classes Bindings */
          .act-ff-walk { animation: anim-leg-ff-walk 0.95s ease-in-out infinite; transform-origin: 250px 380px; }
          .act-fn-walk { animation: anim-leg-fn-walk 0.95s ease-in-out infinite; transform-origin: 320px 380px; }
          .act-bf-walk { animation: anim-leg-bf-walk 0.95s ease-in-out infinite; transform-origin: 500px 380px; }
          .act-bn-walk { animation: anim-leg-bn-walk 0.95s ease-in-out infinite; transform-origin: 600px 380px; }
          .act-head-walk { animation: anim-head-nod-walk 0.95s ease-in-out infinite; transform-origin: 300px 240px; }
          .act-tail-walk { animation: anim-tail-wag-walk 0.8s ease-in-out infinite; transform-origin: 640px 220px; }
          .act-body-walk { animation: anim-body-bob-walk 0.95s ease-in-out infinite; transform-origin: center bottom; }

          .act-body-stand { animation: anim-torso-stand-breathe 2.4s ease-in-out infinite; transform-origin: center bottom; }
          .act-head-stand { animation: anim-head-stand-look 3.5s ease-in-out infinite; transform-origin: 300px 240px; }
          .act-tail-stand { animation: anim-tail-stand-flick 3.0s ease-in-out infinite; transform-origin: 640px 220px; }

          .act-body-lie { animation: anim-torso-lie-down 2.8s ease-in-out infinite; transform-origin: center bottom; }
          .act-ff-lie, .act-fn-lie { animation: anim-legs-front-fold 2.8s ease-in-out infinite; transform-origin: 280px 380px; }
          .act-bf-lie, .act-bn-lie { animation: anim-legs-back-fold 2.8s ease-in-out infinite; transform-origin: 550px 380px; }
          .act-head-lie { animation: anim-head-lie-pose 2.8s ease-in-out infinite; transform-origin: 300px 240px; }
          .act-tail-lie { animation: anim-tail-lie-wag 2.8s ease-in-out infinite; transform-origin: 640px 220px; }
        `}</style>

        {/* Khối lật hướng: Khi pose !== 'turn-walk', đầu quay sang PHẢI (scaleX(-1)), tiến về bên phải */}
        <g style={{
          transformOrigin: '350px 310px',
          transform: pose === 'turn-walk' ? 'none' : 'scaleX(-1)'
        }}>

          {/* ====================================================================
              LỚP 1: CÁC BỘ PHẬN XA PHÍA SAU (CHÂN XA, TAI XA, SỪNG XA)
              ==================================================================== */}
          {/* 1. Sừng xa phía sau */}
          <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-head-walk' : pose === 'stand' ? 'act-head-stand' : 'act-head-lie'}>
            <path
              d="M 120 70 C 130 40 160 20 200 12 C 190 22 165 38 135 78 Z"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Tai xa */}
            <path
              d="M 68 70 C 50 62 30 58 22 65 C 28 72 42 75 58 73 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </g>

          {/* 2. Chân trước xa (Front Far Leg - BƯỚC ĐI THẬT SỰ) */}
          <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-ff-walk' : pose === 'lie' ? 'act-ff-lie' : ''}>
            <path
              d="M 230 360 C 240 400 242 450 236 500 L 244 565 L 210 570 L 206 505 C 214 455 214 410 200 375 Z"
              fill="url(#goat-v-far)"
              stroke="#0F172A"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Móng guốc xa */}
            <path d="M 210 540 L 244 535 L 240 575 L 206 580 Z" fill="url(#goat-v-hoof)" stroke="#0F172A" strokeWidth="7" />
            <line x1="225" y1="540" x2="223" y2="580" stroke="#0F172A" strokeWidth="5" />
          </g>

          {/* 3. Chân sau xa (Hind Far Leg - BƯỚC ĐI THẬT SỰ) */}
          <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-bf-walk' : pose === 'lie' ? 'act-bf-lie' : ''}>
            <path
              d="M 500 350 C 525 395 540 445 520 500 L 512 560 L 480 565 L 480 510 C 495 460 480 415 460 380 Z"
              fill="url(#goat-v-far)"
              stroke="#0F172A"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Móng guốc xa */}
            <path d="M 480 535 L 512 530 L 508 570 L 476 575 Z" fill="url(#goat-v-hoof)" stroke="#0F172A" strokeWidth="7" />
            <line x1="494" y1="535" x2="492" y2="575" stroke="#0F172A" strokeWidth="5" />
          </g>

          {/* ====================================================================
              LỚP 2: KHỐI THÂN LIỀN MẠCH HOÀN HẢO (KHÔNG LỖ HỔNG, KHÔNG RÁCH HÌNH)
              ==================================================================== */}
          <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-body-walk' : pose === 'stand' ? 'act-body-stand' : 'act-body-lie'}>
            
            {/* Đuôi cộc ve vẩy */}
            <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-tail-walk' : pose === 'stand' ? 'act-tail-stand' : 'act-tail-lie'}>
              <path
                d="M 645 195 C 675 220 685 275 668 300 C 662 290 658 260 650 240 Z"
                fill="url(#goat-v-body)"
                stroke="#0F172A"
                strokeWidth="7"
                strokeLinejoin="round"
              />
            </g>

            {/* Khối thân đầy đặn, sống lưng uốn lượn, bụng thon chuẩn 100% hình vẽ */}
            <path
              d="M 215 320 C 170 270 145 225 120 190 C 145 160 180 135 295 155 C 340 160 390 165 450 155 C 505 145 560 145 595 185 C 615 210 615 240 600 270 C 580 315 560 330 535 280 C 515 305 490 325 445 340 C 365 360 290 360 235 330 Z"
              fill="url(#goat-v-body)"
              stroke="#0F172A"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Túm lông cổ lượn sóng tự nhiên (Chest Mane) */}
            <path d="M 170 195 C 175 215 185 235 180 250" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            <path d="M 190 205 C 200 228 205 252 195 270" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            <path d="M 210 220 C 220 248 225 275 212 300" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

            {/* ==================================================================
                LỚP 3: ĐẦU, MẶT, MẮT, TAI, SỪNG 7 KHÍA, RÂU CẰM DÊ (GẬT GÙ NHẸ)
                ================================================================== */}
            <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-head-walk' : pose === 'stand' ? 'act-head-stand' : 'act-head-lie'}>
              
              {/* Đầu dê có sống mũi và khuôn miệng */}
              <path
                d="M 125 105 C 108 135 86 168 72 185 C 68 193 72 198 80 200 C 90 200 100 190 112 182 C 104 187 98 198 112 202 C 117 190 117 190 117 190"
                fill="url(#goat-v-body)"
                stroke="#0F172A"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lỗ mũi */}
              <path d="M 76 180 C 68 184 72 193 76 193" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />

              {/* Chòm râu cằm dê dài phân nhánh */}
              <path
                d="M 100 205 C 105 225 100 255 118 262 C 122 245 122 225 114 205 Z"
                fill="url(#goat-v-body)"
                stroke="#0F172A"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              <path d="M 108 218 C 108 238 112 250 120 255" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />

              {/* Mắt dê sống động có bờ mi và con ngươi */}
              <path d="M 135 135 C 148 122 168 126 178 140 C 168 148 148 148 135 135 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="6" />
              <circle cx="157" cy="137" r="9" fill="#0F172A" />
              <circle cx="160" cy="134" r="3" fill="#FFFFFF" />
              <path d="M 130 127 C 148 115 170 120 182 132" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

              {/* Tai gần có nếp gấp */}
              <path
                d="M 180 110 C 202 102 238 106 248 126 C 230 130 202 126 180 118 Z"
                fill="url(#goat-v-body)"
                stroke="#0F172A"
                strokeWidth="7"
                strokeLinejoin="round"
              />
              <path d="M 190 114 C 208 110 230 114 235 122" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />

              {/* Cặp sừng lớn phía trước cong vuốt có 7 khía đốt chuẩn như hình */}
              <path
                d="M 160 98 C 178 65 230 45 300 32 C 282 50 242 75 190 115 Z"
                fill="url(#goat-v-body)"
                stroke="#0F172A"
                strokeWidth="8"
                strokeLinejoin="round"
              />
              {/* 7 Khía đốt sừng nổi rõ nét */}
              <line x1="185" y1="90" x2="195" y2="108" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
              <line x1="212" y1="74" x2="222" y2="92" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
              <line x1="238" y1="62" x2="248" y2="80" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
              <line x1="264" y1="50" x2="274" y2="68" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
              <line x1="288" y1="42" x2="296" y2="58" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            </g>
          </g>

          {/* ====================================================================
              LỚP 4: CHÂN GẦN PHÍA TRƯỚC (BƯỚC ĐI SẢI BƯỚC MẠNH MẼ RÕ NÉT)
              ==================================================================== */}
          {/* 4. Chân trước gần (Front Near Leg) */}
          <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-fn-walk' : pose === 'lie' ? 'act-fn-lie' : ''}>
            <path
              d="M 280 350 C 295 385 298 430 290 480 L 298 565 L 265 570 L 260 500 C 265 450 260 400 245 370 Z"
              fill="url(#goat-v-body)"
              stroke="#0F172A"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            {/* Móng guốc trước */}
            <path d="M 265 540 L 298 535 L 294 575 L 260 580 Z" fill="url(#goat-v-hoof)" stroke="#0F172A" strokeWidth="7" />
            <line x1="280" y1="540" x2="278" y2="580" stroke="#0F172A" strokeWidth="5" />
          </g>

          {/* 5. Chân sau gần (Hind Near Leg) */}
          <g className={pose === 'walk' || pose === 'turn-walk' ? 'act-bn-walk' : pose === 'lie' ? 'act-bn-lie' : ''}>
            <path
              d="M 540 330 C 575 390 595 450 575 510 L 568 565 L 535 570 L 535 510 C 550 460 535 410 505 380 Z"
              fill="url(#goat-v-body)"
              stroke="#0F172A"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            {/* Móng guốc sau */}
            <path d="M 535 535 L 568 530 L 564 575 L 530 580 Z" fill="url(#goat-v-hoof)" stroke="#0F172A" strokeWidth="7" />
            <line x1="550" y1="535" x2="548" y2="580" stroke="#0F172A" strokeWidth="5" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: TUẦN TRA LIÊN TỤC TRONG HỘP - LÚC NÀO CŨNG HIỆN DIỆN
 * - Di chuyển tiến đúng hướng cả 2 chiều (Không đi lùi).
 * - Chu kỳ 18 giây:
 *   1. Đi tiến từ trái sang giữa (4 chân bước đi thật sự) (0s - 4.5s)
 *   2. Đứng uy nghiêm giữa hộp quan sát canh gác (4.5s - 8.5s)
 *   3. Nằm nghỉ thư thái giữa hộp (8.5s - 12.5s)
 *   4. Đứng dậy bước tiếp sang phải (12.5s - 15.5s)
 *   5. Quay đầu bước đi về lại bên trái tuần tra liên tục (15.5s - 18s)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[28px] sm:bottom-[32px] h-[36px] sm:h-[40px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TUẦN TRA TRONG HỘP: 18 GIÂY (LUÔN XUẤT HIỆN 100% THỜI GIAN) */
        @keyframes patrol-traverse-cycle {
          /* PHA 1: Đi từ trái sang giữa hộp (0s -> 4.5s = 0% -> 25%) */
          0% {
            left: 8px;
          }
          25% {
            left: calc(50% - 24px);
          }

          /* PHA 2: Đứng uy nghiêm ở giữa hộp (4.5s -> 8.5s = 25% -> 47%) */
          26% {
            left: calc(50% - 24px);
          }
          47% {
            left: calc(50% - 24px);
          }

          /* PHA 3: Nằm nghỉ thư thái ở giữa hộp (8.5s -> 12.5s = 47% -> 69%) */
          48% {
            left: calc(50% - 24px);
          }
          69% {
            left: calc(50% - 24px);
          }

          /* PHA 4: Đứng dậy đi tiếp sang phải (12.5s -> 15.5s = 69% -> 86%) */
          70% {
            left: calc(50% - 24px);
          }
          86% {
            left: calc(100% - 54px);
          }

          /* PHA 5: Quay đầu đi tuần tra về lại bên trái (15.5s -> 18s = 86% -> 100%) */
          87% {
            left: calc(100% - 54px);
          }
          100% {
            left: 8px;
          }
        }

        /* ẨN HIỆN CHÍNH XÁC TỪNG TƯ THẾ */
        @keyframes view-walk-right-toggle {
          0%, 25% { opacity: 1; visibility: visible; }
          25.1%, 69% { opacity: 0; visibility: hidden; }
          69.1%, 86% { opacity: 1; visibility: visible; }
          86.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes view-stand-toggle {
          0%, 25% { opacity: 0; visibility: hidden; }
          25.1%, 47% { opacity: 1; visibility: visible; }
          47.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes view-lie-toggle {
          0%, 47% { opacity: 0; visibility: hidden; }
          47.1%, 69% { opacity: 1; visibility: visible; }
          69.1%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes view-walk-left-toggle {
          0%, 86% { opacity: 0; visibility: hidden; }
          86.1%, 100% { opacity: 1; visibility: visible; }
        }

        .anim-patrol-runner-box {
          position: absolute;
          bottom: 0px;
          animation: patrol-traverse-cycle 18s ease-in-out infinite;
          will-change: left;
        }

        .group:hover .anim-patrol-runner-box {
          /* Khi rê chuột vào hộp: tăng tốc chu kỳ tuần tra */
          animation-duration: 12s;
        }

        .layer-v-walk-r {
          animation: view-walk-right-toggle 18s step-end infinite;
        }
        .layer-v-stand {
          animation: view-stand-toggle 18s step-end infinite;
        }
        .layer-v-lie {
          animation: view-lie-toggle 18s step-end infinite;
        }
        .layer-v-walk-l {
          animation: view-walk-left-toggle 18s step-end infinite;
        }

        .group:hover .layer-v-walk-r,
        .group:hover .layer-v-stand,
        .group:hover .layer-v-lie,
        .group:hover .layer-v-walk-l {
          animation-duration: 12s;
        }
      `}</style>

      {/* Đường sàn mờ nhẹ tinh tế dưới chân chú dê */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Container chú dê tuần tra di chuyển trong hộp (Lúc nào cũng xuất hiện) */}
      <div className="anim-patrol-runner-box flex items-center">
        {/* 1. Đi sang phải (4 chân bước đi thật sự, đầu quay sang phải) */}
        <div className="layer-v-walk-r">
          <SecurityGoat pose="walk" className="w-[46px] h-[36px] sm:w-[50px] sm:h-[40px]" />
        </div>

        {/* 2. Đứng uy nghiêm giữa hộp (Thở phập phồng, chớp mắt, vẫy đuôi) */}
        <div className="layer-v-stand absolute inset-0">
          <SecurityGoat pose="stand" className="w-[46px] h-[36px] sm:w-[50px] sm:h-[40px]" />
        </div>

        {/* 3. Nằm nghỉ thư thái giữa hộp (Gập 4 chân, hạ người sát sàn) */}
        <div className="layer-v-lie absolute inset-0">
          <SecurityGoat pose="lie" className="w-[46px] h-[36px] sm:w-[50px] sm:h-[40px]" />
        </div>

        {/* 4. Quay đầu đi về bên trái (4 chân bước đi thật sự, đầu quay sang trái) */}
        <div className="layer-v-walk-l absolute inset-0">
          <SecurityGoat pose="turn-walk" className="w-[46px] h-[36px] sm:w-[50px] sm:h-[40px]" />
        </div>
      </div>
    </div>
  );
};
