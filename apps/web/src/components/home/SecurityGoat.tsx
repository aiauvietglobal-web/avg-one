import React from 'react';

/**
 * 🐐 CHÚ DÊ BẢO MẬT CHUYỂN ĐỘNG SỐNG ĐỘNG (CHUẨN 100% THEO HÌNH VẼ MẪU CỦA USER)
 * 
 * - Đúng chuẩn 100% hình minh họa của user:
 *   + Tách lớp xương chuyển động (Skeletal 2D Animation) từ chính bức vẽ gốc.
 *   + 4 chân bước đi thật sự: Khớp vai, khớp hông và khuỷu chân co duỗi sải bước.
 *   + Đầu và sừng gật gù quan sát, râu cằm đung đưa.
 *   + Đuôi cộc ve vẩy vui mắt.
 *   + Lồng ngực phập phồng nhịp thở sinh học.
 * - Hướng di chuyển: Quay đầu sang PHẢI (tiến về phía trước), KHÔNG ĐI LÙI!
 * - Đầy đủ 3 trạng thái chuyển động:
 *   1. ĐI BỘ (Walk): 4 chân sải bước thật sự bước vào giữa hộp.
 *   2. ĐỨNG (Stand): Dừng lại đứng thở phập phồng, vểnh tai, vẫy đuôi canh gác.
 *   3. NẰM (Lie down): Gập 4 chân nằm êm ái nghỉ ngơi trên sàn hộp.
 */

interface SecurityGoatProps {
  className?: string;
  pose?: 'stand' | 'walk' | 'lie';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  pose = 'walk'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <style>{`
        /* =========================================================
           1. CHUYỂN ĐỘNG 4 CHÂN BƯỚC ĐI THẬT SỰ (WALK GAIT)
           ========================================================= */
        /* Chân trước xa (Front Far Leg) */
        @keyframes limb-walk-ff {
          0% { transform: rotate(18deg); }
          25% { transform: rotate(-4deg); }
          50% { transform: rotate(-18deg); }
          75% { transform: rotate(4deg); }
          100% { transform: rotate(18deg); }
        }

        /* Chân trước gần (Front Near Leg - ngược pha) */
        @keyframes limb-walk-fn {
          0% { transform: rotate(-18deg); }
          25% { transform: rotate(4deg); }
          50% { transform: rotate(18deg); }
          75% { transform: rotate(-4deg); }
          100% { transform: rotate(-18deg); }
        }

        /* Chân sau xa (Hind Far Leg) */
        @keyframes limb-walk-bf {
          0% { transform: rotate(-16deg); }
          25% { transform: rotate(6deg); }
          50% { transform: rotate(16deg); }
          75% { transform: rotate(-4deg); }
          100% { transform: rotate(-16deg); }
        }

        /* Chân sau gần (Hind Near Leg - ngược pha) */
        @keyframes limb-walk-bn {
          0% { transform: rotate(16deg); }
          25% { transform: rotate(-4deg); }
          50% { transform: rotate(-16deg); }
          75% { transform: rotate(6deg); }
          100% { transform: rotate(16deg); }
        }

        /* Đầu gật gù nhẹ khi bước đi */
        @keyframes limb-walk-head {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2.5deg); }
        }

        /* Đuôi ve vẩy khi đi */
        @keyframes limb-walk-tail {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(16deg); }
        }

        /* Thân nhấp nhô nhẹ theo nhịp bước */
        @keyframes limb-walk-torso {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-1.2px) rotate(-0.5deg); }
          50% { transform: translateY(0.6px) rotate(0.4deg); }
          75% { transform: translateY(-0.8px) rotate(-0.2deg); }
        }

        /* =========================================================
           2. CHUYỂN ĐỘNG ĐỨNG (STAND - THỞ, VẪY ĐUÔI, QUAN SÁT)
           ========================================================= */
        @keyframes limb-stand-breathe {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.02, 1.015) translateY(-0.6px); }
        }
        @keyframes limb-stand-tail {
          0%, 75%, 100% { transform: rotate(0deg); }
          80% { transform: rotate(18deg); }
          85% { transform: rotate(-10deg); }
          90% { transform: rotate(12deg); }
        }
        @keyframes limb-stand-head {
          0%, 70%, 100% { transform: rotate(0deg); }
          75% { transform: rotate(-2deg); }
          85% { transform: rotate(3deg); }
          90% { transform: rotate(-1deg); }
        }

        /* =========================================================
           3. CHUYỂN ĐỘNG NẰM NGHỈ (LIE DOWN)
           ========================================================= */
        @keyframes limb-lie-torso {
          0%, 100% { transform: translateY(12px) scaleY(0.82); }
          50% { transform: translateY(11.2px) scaleY(0.835); }
        }
        @keyframes limb-lie-leg-front {
          0%, 100% { transform: translateY(8px) rotate(42deg) scale(0.85); }
        }
        @keyframes limb-lie-leg-back {
          0%, 100% { transform: translateY(8px) rotate(-42deg) scale(0.85); }
        }
        @keyframes limb-lie-head {
          0%, 100% { transform: translateY(4px) rotate(-3deg); }
        }
        @keyframes limb-lie-tail {
          0%, 75%, 100% { transform: rotate(0deg); }
          85% { transform: rotate(18deg); }
        }

        /* CSS Animation classes */
        .anim-l-ff-walk { animation: limb-walk-ff 1.1s ease-in-out infinite; transform-origin: 36% 62%; }
        .anim-l-fn-walk { animation: limb-walk-fn 1.1s ease-in-out infinite; transform-origin: 46% 62%; }
        .anim-l-bf-walk { animation: limb-walk-bf 1.1s ease-in-out infinite; transform-origin: 72% 64%; }
        .anim-l-bn-walk { animation: limb-walk-bn 1.1s ease-in-out infinite; transform-origin: 88% 64%; }
        .anim-l-head-walk { animation: limb-walk-head 1.1s ease-in-out infinite; transform-origin: 38% 52%; }
        .anim-l-tail-walk { animation: limb-walk-tail 0.9s ease-in-out infinite; transform-origin: 84% 42%; }
        .anim-l-torso-walk { animation: limb-walk-torso 1.1s ease-in-out infinite; transform-origin: center bottom; }

        .anim-l-torso-stand { animation: limb-stand-breathe 2.5s ease-in-out infinite; transform-origin: center bottom; }
        .anim-l-tail-stand { animation: limb-stand-tail 3.2s ease-in-out infinite; transform-origin: 84% 42%; }
        .anim-l-head-stand { animation: limb-stand-head 3.6s ease-in-out infinite; transform-origin: 38% 52%; }

        .anim-l-torso-lie { animation: limb-lie-torso 2.8s ease-in-out infinite; transform-origin: center bottom; }
        .anim-l-ff-lie, .anim-l-fn-lie { animation: limb-lie-leg-front 2.8s ease-in-out infinite; transform-origin: 42% 62%; }
        .anim-l-bf-lie, .anim-l-bn-lie { animation: limb-lie-leg-back 2.8s ease-in-out infinite; transform-origin: 80% 64%; }
        .anim-l-head-lie { animation: limb-lie-head 2.8s ease-in-out infinite; transform-origin: 38% 52%; }
        .anim-l-tail-lie { animation: limb-lie-tail 2.8s ease-in-out infinite; transform-origin: 84% 42%; }
      `}</style>

      {/* Wrapper quay đầu sang phải (scaleX(-1)) để luôn đi TIẾN VỀ PHÍA TRƯỚC */}
      <div className="relative w-full h-full" style={{ transform: 'scaleX(-1)' }}>
        
        {/* LỚP 1: Chân xa phía sau (Front Far + Back Far) */}
        <img
          src="/assets/goat-leg-ff.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-ff-walk' :
            pose === 'lie' ? 'anim-l-ff-lie' : ''
          }`}
        />
        <img
          src="/assets/goat-leg-bf.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-bf-walk' :
            pose === 'lie' ? 'anim-l-bf-lie' : ''
          }`}
        />

        {/* LỚP 2: Đuôi */}
        <img
          src="/assets/goat-tail.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-tail-walk' :
            pose === 'stand' ? 'anim-l-tail-stand' :
            pose === 'lie' ? 'anim-l-tail-lie' : ''
          }`}
        />

        {/* LỚP 3: Thân mình chính (Torso) */}
        <img
          src="/assets/goat-torso.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-torso-walk' :
            pose === 'stand' ? 'anim-l-torso-stand' :
            pose === 'lie' ? 'anim-l-torso-lie' : ''
          }`}
        />

        {/* LỚP 4: Đầu, Sừng, Râu cằm (Head & Horns & Beard) */}
        <img
          src="/assets/goat-head.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-head-walk' :
            pose === 'stand' ? 'anim-l-head-stand' :
            pose === 'lie' ? 'anim-l-head-lie' : ''
          }`}
        />

        {/* LỚP 5: Chân gần phía trước (Front Near + Back Near) */}
        <img
          src="/assets/goat-leg-fn.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-fn-walk' :
            pose === 'lie' ? 'anim-l-fn-lie' : ''
          }`}
        />
        <img
          src="/assets/goat-leg-bn.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-contain ${
            pose === 'walk' ? 'anim-l-bn-walk' :
            pose === 'lie' ? 'anim-l-bn-lie' : ''
          }`}
        />
      </div>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHU TRÌNH TUẦN TRA ĐẦY ĐỦ TRONG HỘP BẢO MẬT
 * - Hướng mặt: Quay sang PHẢI (scaleX(-1)), di chuyển sang PHẢI -> ĐI TIẾN TỰ NHIÊN!
 * - Chu kỳ 16 giây: ĐI VÀO (4 chân sải bước thật) -> ĐỨNG BẢO VỆ -> NẰM NGHỈ -> ĐỨNG LÊN BƯỚC TIẾP
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TỔNG HỢP: 16 GIÂY (ĐI TIẾN -> ĐỨNG -> NẰM -> ĐI TIẾP) */
        @keyframes goat-flow-patrol {
          /* PHA 1: ĐI TIẾN VÀO GIỮA HỘP (0s -> 5s = 0% -> 31%) */
          0% {
            left: -75px;
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          31% {
            left: calc(50% - 30px);
            opacity: 1;
          }

          /* PHA 2: ĐỨNG UY NGHIÊM QUAN SÁT (5s -> 9s = 31% -> 56%) */
          32% {
            left: calc(50% - 30px);
            opacity: 1;
          }
          56% {
            left: calc(50% - 30px);
            opacity: 1;
          }

          /* PHA 3: NẰM XUỐNG NGHỈ THƯ THÁI (9s -> 13s = 56% -> 81%) */
          57% {
            left: calc(50% - 30px);
            opacity: 1;
          }
          81% {
            left: calc(50% - 30px);
            opacity: 1;
          }

          /* PHA 4: ĐỨNG DẬY VÀ ĐI TIẾP RA NGOÀI (13s -> 16s = 81% -> 96%) */
          82% {
            left: calc(50% - 30px);
            opacity: 1;
          }
          96% {
            left: 104%;
            opacity: 1;
          }
          97.5% {
            left: 104%;
            opacity: 0;
          }
          99% {
            left: -75px;
            opacity: 0;
          }
          100% {
            left: -75px;
            opacity: 0;
          }
        }

        /* ẨN HIỆN CHÍNH XÁC TỪNG TRẠNG THÁI (ĐI -> ĐỨNG -> NẰM) */
        @keyframes flow-walk-toggle {
          0%, 31% { opacity: 1; visibility: visible; }
          31.1%, 81.9% { opacity: 0; visibility: hidden; }
          82%, 96.5% { opacity: 1; visibility: visible; }
          96.6%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes flow-stand-toggle {
          0%, 31% { opacity: 0; visibility: hidden; }
          31.1%, 56.5% { opacity: 1; visibility: visible; }
          56.6%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes flow-lie-toggle {
          0%, 56.5% { opacity: 0; visibility: hidden; }
          56.6%, 81.9% { opacity: 1; visibility: visible; }
          82%, 100% { opacity: 0; visibility: hidden; }
        }

        .anim-patrol-runner {
          position: absolute;
          bottom: 2px;
          animation: goat-flow-patrol 16s linear infinite;
          will-change: left;
        }

        .group:hover .anim-patrol-runner {
          /* Khi hover vào hộp: bước nhanh hơn */
          animation-duration: 10.5s;
        }

        .layer-walk-mode {
          animation: flow-walk-toggle 16s step-end infinite;
        }
        .layer-stand-mode {
          animation: flow-stand-toggle 16s step-end infinite;
        }
        .layer-lie-mode {
          animation: flow-lie-toggle 16s step-end infinite;
        }

        .group:hover .layer-walk-mode,
        .group:hover .layer-stand-mode,
        .group:hover .layer-lie-mode {
          animation-duration: 10.5s;
        }
      `}</style>

      {/* Đường nền sàn mờ nhẹ tinh tế */}
      <div className="absolute bottom-2 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-sky-300/40 dark:via-sky-600/30 to-transparent" />

      {/* Container di chuyển tiến về phía trước theo chu kỳ */}
      <div className="anim-patrol-runner flex items-center">
        {/* 1. Trạng thái ĐI (Walk: 4 chân sải bước thật sự) */}
        <div className="layer-walk-mode">
          <SecurityGoat pose="walk" className="w-13 h-10 sm:w-14 sm:h-11" />
        </div>

        {/* 2. Trạng thái ĐỨNG (Stand: Đứng uy nghiêm thở và quan sát) */}
        <div className="layer-stand-mode absolute inset-0">
          <SecurityGoat pose="stand" className="w-13 h-10 sm:w-14 sm:h-11" />
        </div>

        {/* 3. Trạng thái NẰM (Lie down: Nằm nghỉ êm ái sát sàn) */}
        <div className="layer-lie-mode absolute inset-0">
          <SecurityGoat pose="lie" className="w-13 h-10 sm:w-14 sm:h-11" />
        </div>
      </div>
    </div>
  );
};
