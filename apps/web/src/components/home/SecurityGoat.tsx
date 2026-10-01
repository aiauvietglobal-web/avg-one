import React from 'react';

/**
 * 🐐 CHÚ DÊ CÔNG NGHỆ BẢO MẬT (CHUẨN 100% THEO HÌNH VẼ MẪU CỦA USER)
 * 
 * - Đúng chuẩn 100% hình minh họa của user:
 *   + Sử dụng trọn vẹn hình ảnh nét vẽ gốc nguyên vẹn (không cắt ghép lỗi, không đứt đoạn).
 *   + Luôn xuất hiện trong hộp 100% thời gian ("lúc nào cũng xuất hiện"), không biến mất ra ngoài lề.
 *   + Hoạt động tuần tra linh hoạt bên trong hộp ("hoạt động trong hộp"):
 *     1. ĐI BỘ (Walk): Đi tiến tự nhiên từ trái sang giữa hộp (quay đầu đúng hướng di chuyển).
 *     2. ĐỨNG (Stand): Đứng uy nghiêm giữa hộp, lồng ngực phập phồng thở, quan sát canh gác.
 *     3. NẰM (Lie down): Hạ mình nằm nghỉ êm ái sát sàn hộp thư thái.
 *     4. BƯỚC TIẾP & QUAY ĐẦU: Đi tiếp sang phải, quay đầu bước lại tuần tra liên tục.
 *   + Bố cục hoàn hảo: Nằm ở khoảng giữa hộp, KHÔNG ĐÈ LÊN CHỮ "Bảo Mật".
 */

interface SecurityGoatProps {
  className?: string;
  pose?: 'stand' | 'walk' | 'lie' | 'turn-walk';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  pose = 'stand'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <style>{`
        /* =========================================================
           1. ĐI TIẾN SANG PHẢI (HEAD RIGHT, MOVE RIGHT)
           ========================================================= */
        @keyframes goat-step-right {
          0%, 100% {
            transform: scaleX(-1) translateY(0px) rotate(0deg);
          }
          25% {
            transform: scaleX(-1) translateY(-2.5px) rotate(-1.5deg);
          }
          50% {
            transform: scaleX(-1) translateY(0.8px) rotate(1deg);
          }
          75% {
            transform: scaleX(-1) translateY(-1.5px) rotate(-0.8deg);
          }
        }

        /* =========================================================
           2. ĐI TIẾN SANG TRÁI (HEAD LEFT, MOVE LEFT)
           ========================================================= */
        @keyframes goat-step-left {
          0%, 100% {
            transform: scaleX(1) translateY(0px) rotate(0deg);
          }
          25% {
            transform: scaleX(1) translateY(-2.5px) rotate(1.5deg);
          }
          50% {
            transform: scaleX(1) translateY(0.8px) rotate(-1deg);
          }
          75% {
            transform: scaleX(1) translateY(-1.5px) rotate(0.8deg);
          }
        }

        /* =========================================================
           3. ĐỨNG UY NGHIÊM THỞ & CANH GÁC (STAND)
           ========================================================= */
        @keyframes goat-stand-breathing {
          0%, 100% {
            transform: scaleX(-1) scale(1) translateY(0px);
          }
          50% {
            transform: scaleX(-1) scale(1.025, 1.018) translateY(-0.8px);
          }
        }

        /* =========================================================
           4. NẰM NGHỈ THƯ THÁI (LIE DOWN)
           ========================================================= */
        @keyframes goat-lie-resting {
          0%, 100% {
            transform: scaleX(-1) translateY(7px) scale(1.03, 0.82);
          }
          50% {
            transform: scaleX(-1) translateY(6.4px) scale(1.04, 0.835);
          }
        }

        .anim-g-walk-right {
          animation: goat-step-right 1.05s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .anim-g-walk-left {
          animation: goat-step-left 1.05s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .anim-g-stand {
          animation: goat-stand-breathing 2.6s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .anim-g-lie {
          animation: goat-lie-resting 2.8s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Hình ảnh chú dê gốc nguyên vẹn chuẩn 100% hình vẽ mẫu */}
      <img
        src="/assets/goat-stand.png"
        alt="Chú Dê Bảo Mật"
        className={`w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${
          pose === 'walk' ? 'anim-g-walk-right' :
          pose === 'turn-walk' ? 'anim-g-walk-left' :
          pose === 'stand' ? 'anim-g-stand' :
          pose === 'lie' ? 'anim-g-lie' : ''
        }`}
      />
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: HOẠT ĐỘNG LIÊN TỤC TRONG HỘP - LÚC NÀO CŨNG XUẤT HIỆN
 * - Không bao giờ biến mất ra ngoài lề (Always visible inside box boundaries).
 * - Chu kỳ 18 giây:
 *   1. Đi tiến từ trái vào giữa hộp (0s - 4.5s)
 *   2. Đứng uy nghiêm giữa hộp quan sát canh gác (4.5s - 8.5s)
 *   3. Nằm nghỉ thư thái giữa sàn (8.5s - 12.5s)
 *   4. Đứng dậy bước tiếp sang phải (12.5s - 15.5s)
 *   5. Quay đầu bước đi tuần tra về lại bên trái (15.5s - 18s)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[22px] sm:bottom-[24px] h-[36px] sm:h-[40px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TUẦN TRA TRONG HỘP: 18 GIÂY (LUÔN XUẤT HIỆN 100% THỜI GIAN) */
        @keyframes goat-patrol-in-box {
          /* PHA 1: Đi từ trái sang giữa hộp (0s -> 4.5s = 0% -> 25%) */
          0% {
            left: 6px;
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
            left: calc(100% - 52px);
          }

          /* PHA 5: Quay đầu đi tuần tra về lại bên trái (15.5s -> 18s = 86% -> 100%) */
          87% {
            left: calc(100% - 52px);
          }
          100% {
            left: 6px;
          }
        }

        /* ẨN HIỆN ĐÚNG TRẠNG THÁI CHUYỂN ĐỘNG TRONG CHU TRÌNH */
        /* Trạng thái 1: Đi sang phải */
        @keyframes state-walk-right-view {
          0%, 25% { opacity: 1; visibility: visible; }
          25.1%, 69% { opacity: 0; visibility: hidden; }
          69.1%, 86% { opacity: 1; visibility: visible; }
          86.1%, 100% { opacity: 0; visibility: hidden; }
        }

        /* Trạng thái 2: Đứng thở & quan sát */
        @keyframes state-stand-view {
          0%, 25% { opacity: 0; visibility: hidden; }
          25.1%, 47% { opacity: 1; visibility: visible; }
          47.1%, 100% { opacity: 0; visibility: hidden; }
        }

        /* Trạng thái 3: Nằm nghỉ */
        @keyframes state-lie-view {
          0%, 47% { opacity: 0; visibility: hidden; }
          47.1%, 69% { opacity: 1; visibility: visible; }
          69.1%, 100% { opacity: 0; visibility: hidden; }
        }

        /* Trạng thái 4: Đi tuần tra về bên trái (quay đầu sang trái) */
        @keyframes state-walk-left-view {
          0%, 86% { opacity: 0; visibility: hidden; }
          86.1%, 100% { opacity: 1; visibility: visible; }
        }

        .anim-in-box-patrol {
          position: absolute;
          bottom: 0px;
          animation: goat-patrol-in-box 18s ease-in-out infinite;
          will-change: left;
        }

        .group:hover .anim-in-box-patrol {
          /* Khi hover vào hộp: chu kỳ tuần tra nhanh nhẹn hơn */
          animation-duration: 12s;
        }

        .view-walk-r {
          animation: state-walk-right-view 18s step-end infinite;
        }
        .view-stand {
          animation: state-stand-view 18s step-end infinite;
        }
        .view-lie {
          animation: state-lie-view 18s step-end infinite;
        }
        .view-walk-l {
          animation: state-walk-left-view 18s step-end infinite;
        }

        .group:hover .view-walk-r,
        .group:hover .view-stand,
        .group:hover .view-lie,
        .group:hover .view-walk-l {
          animation-duration: 12s;
        }
      `}</style>

      {/* Đường sàn mờ nhẹ tinh tế dưới chân chú dê */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Khối chú dê tuần tra di chuyển trong hộp (Lúc nào cũng xuất hiện) */}
      <div className="anim-in-box-patrol flex items-center">
        {/* 1. Đi sang phải (Quay mặt sang phải, đi tiến) */}
        <div className="view-walk-r">
          <SecurityGoat pose="walk" className="w-[46px] h-[34px] sm:w-[50px] sm:h-[38px]" />
        </div>

        {/* 2. Đứng uy nghiêm giữa hộp */}
        <div className="view-stand absolute inset-0">
          <SecurityGoat pose="stand" className="w-[46px] h-[34px] sm:w-[50px] sm:h-[38px]" />
        </div>

        {/* 3. Nằm nghỉ thư thái giữa hộp */}
        <div className="view-lie absolute inset-0">
          <SecurityGoat pose="lie" className="w-[46px] h-[34px] sm:w-[50px] sm:h-[38px]" />
        </div>

        {/* 4. Quay đầu đi về bên trái (Quay mặt sang trái, đi tiến) */}
        <div className="view-walk-l absolute inset-0">
          <SecurityGoat pose="turn-walk" className="w-[46px] h-[34px] sm:w-[50px] sm:h-[38px]" />
        </div>
      </div>
    </div>
  );
};
