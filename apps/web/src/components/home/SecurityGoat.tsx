import React from 'react';

/**
 * 🐐 CHÚ DÊ CÔNG NGHỆ BẢO MẬT (CHUẨN 100% THEO HÌNH VẼ MẪU CỦA USER)
 * 
 * - Đúng chuẩn 100% hình ảnh minh họa:
 *   + Sử dụng chính xác hình ảnh chú dê mẫu của user với nền trong suốt (transparent).
 *   + Hướng đầu và hướng di chuyển chuẩn xác: Đi tiến về phía trước, TUYỆT ĐỐI KHÔNG ĐI LÙI!
 *   + Đầy đủ 3 trạng thái chuyển động tự nhiên:
 *     1. ĐI BỘ (Walk): Bước đi tới nhịp nhàng, thân nhún tự nhiên theo nhịp chân.
 *     2. ĐỨNG (Stand): Dừng lại ở tư thế đứng uy nghiêm chuẩn như hình vẽ, thở phập phồng, quan sát.
 *     3. NẰM (Lie down): Từ từ gập chân nằm nghỉ thư thái sát sàn hộp.
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
      <style>{`
        /* =========================================================
           1. CHUYỂN ĐỘNG ĐI BỘ TIẾN VỀ PHÍA TRƯỚC (WALK)
           ========================================================= */
        @keyframes goat-step-cadence {
          0%, 100% {
            transform: scaleX(-1) translateY(0px) rotate(0deg);
          }
          25% {
            transform: scaleX(-1) translateY(-2px) rotate(-1.5deg);
          }
          50% {
            transform: scaleX(-1) translateY(0.5px) rotate(1deg);
          }
          75% {
            transform: scaleX(-1) translateY(-1.2px) rotate(-0.8deg);
          }
        }

        /* =========================================================
           2. CHUYỂN ĐỘNG ĐỨNG THỞ & CẢNH GIỚI (STAND)
           ========================================================= */
        @keyframes goat-stand-breath {
          0%, 100% {
            transform: scaleX(-1) scale(1) translateY(0px);
          }
          50% {
            transform: scaleX(-1) scale(1.025, 1.018) translateY(-0.8px);
          }
        }

        /* =========================================================
           3. CHUYỂN ĐỘNG NẰM NGHỈ SÁT SÀN (LIE DOWN)
           ========================================================= */
        @keyframes goat-lie-breath {
          0%, 100% {
            transform: scaleX(-1) translateY(10px) scaleY(0.82) scaleX(1.02);
          }
          50% {
            transform: scaleX(-1) translateY(9.2px) scaleY(0.835) scaleX(1.03);
          }
        }

        .anim-goat-act-walk {
          animation: goat-step-cadence 1.1s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .anim-goat-act-stand {
          animation: goat-stand-breath 2.6s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .anim-goat-act-lie {
          animation: goat-lie-breath 2.8s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Chú dê chuẩn 100% theo hình vẽ mẫu của user */}
      <img
        src="/assets/goat-stand.png"
        alt="Chú Dê Bảo Mật"
        className={`w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] ${
          pose === 'walk' ? 'anim-goat-act-walk' :
          pose === 'stand' ? 'anim-goat-act-stand' :
          pose === 'lie' ? 'anim-goat-act-lie' : ''
        }`}
      />
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHU KỲ CHUYỂN ĐỘNG HOÀN CHỈNH TRONG HỘP BẢO MẬT
 * - Hướng mặt: Quay sang PHẢI (scaleX(-1)), di chuyển sang PHẢI -> ĐI TIẾN TỰ NHIÊN!
 * - Chu kỳ 16 giây: ĐI VÀO -> ĐỨNG BẢO VỆ -> NẰM NGHỈ -> ĐỨNG LÊN BƯỚC TIẾP
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TỔNG HỢP: 16 GIÂY (ĐI TIẾN -> ĐỨNG -> NẰM -> ĐI TIẾP) */
        @keyframes goat-traverse-forward {
          /* PHA 1: ĐI TIẾN VÀO GIỮA HỘP (0s -> 5s = 0% -> 31%) */
          0% {
            left: -70px;
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

          /* PHA 4: ĐỨNG LÊN VÀ ĐI TIẾP RA NGOÀI (13s -> 16s = 81% -> 96%) */
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
            left: -70px;
            opacity: 0;
          }
          100% {
            left: -70px;
            opacity: 0;
          }
        }

        /* ẨN HIỆN CHÍNH XÁC TỪNG TRẠNG THÁI (ĐI -> ĐỨNG -> NẰM) */
        @keyframes state-walk-visible {
          0%, 31% { opacity: 1; visibility: visible; }
          31.1%, 81.9% { opacity: 0; visibility: hidden; }
          82%, 96.5% { opacity: 1; visibility: visible; }
          96.6%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes state-stand-visible {
          0%, 31% { opacity: 0; visibility: hidden; }
          31.1%, 56.5% { opacity: 1; visibility: visible; }
          56.6%, 100% { opacity: 0; visibility: hidden; }
        }

        @keyframes state-lie-visible {
          0%, 56.5% { opacity: 0; visibility: hidden; }
          56.6%, 81.9% { opacity: 1; visibility: visible; }
          82%, 100% { opacity: 0; visibility: hidden; }
        }

        .anim-goat-track-forward {
          position: absolute;
          bottom: 2px;
          animation: goat-traverse-forward 16s linear infinite;
          will-change: left;
        }

        .group:hover .anim-goat-track-forward {
          /* Khi hover vào hộp: bước nhanh hơn */
          animation-duration: 10.5s;
        }

        .track-walk-state {
          animation: state-walk-visible 16s step-end infinite;
        }
        .track-stand-state {
          animation: state-stand-visible 16s step-end infinite;
        }
        .track-lie-state {
          animation: state-lie-visible 16s step-end infinite;
        }

        .group:hover .track-walk-state,
        .group:hover .track-stand-state,
        .group:hover .track-lie-state {
          animation-duration: 10.5s;
        }
      `}</style>

      {/* Đường nền sàn mờ nhẹ tinh tế */}
      <div className="absolute bottom-2 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-sky-300/40 dark:via-sky-600/30 to-transparent" />

      {/* Container di chuyển tiến về phía trước theo chu kỳ */}
      <div className="anim-goat-track-forward flex items-center">
        {/* 1. Trạng thái ĐI (Walk) */}
        <div className="track-walk-state">
          <SecurityGoat pose="walk" className="w-13 h-10 sm:w-14 sm:h-11" />
        </div>

        {/* 2. Trạng thái ĐỨNG (Stand) */}
        <div className="track-stand-state absolute inset-0">
          <SecurityGoat pose="stand" className="w-13 h-10 sm:w-14 sm:h-11" />
        </div>

        {/* 3. Trạng thái NẰM (Lie down) */}
        <div className="track-lie-state absolute inset-0">
          <SecurityGoat pose="lie" className="w-13 h-10 sm:w-14 sm:h-11" />
        </div>
      </div>
    </div>
  );
};
