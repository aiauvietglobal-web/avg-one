import React from 'react';

/**
 * 🐐 CHÚ DÊ CÔNG NGHỆ BẢO MẬT (GIỮ NGUYÊN 100% HÌNH ẢNH GỐC CỦA USER)
 * 
 * Đáp ứng chính xác yêu cầu của user:
 * - "giữ nguyên hình ảnh con vật tôi gửi": Dùng trực tiếp ảnh gốc /assets/goat-stand.png sắc nét, chuẩn 100%.
 * - "tạo thêm chuyển động linh hoạt là được":
 *   + Đi (Walk): Bước đi nhún nhảy linh hoạt (squash & stretch, nhún nâng hạ, nghiêng nhịp sải bước, bóng nhấp nhô).
 *   + Đứng (Stand): Lồng ngực thở phập phồng, quan sát canh gác, bóng thở êm dịu.
 *   + Nằm (Lie): Hạ người áp sát sàn hộp, gập chân nằm nghỉ thư thái, nhịp thở sâu.
 * - "Không đi lùi": Sang phải quay đầu sang phải, sang trái quay đầu sang trái.
 * - "Lúc nào cũng xuất hiện trong hộp": Tuần tra liên tục, không bao giờ biến mất ra ngoài.
 * - Vị trí: Đặt cao hơn chữ "Bảo Mật", không che chữ hay che icon khiên.
 */

interface SecurityGoatProps {
  className?: string;
  pose?: 'walk' | 'stand' | 'lie' | 'walk-left';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  pose = 'stand'
}) => {
  // Ảnh gốc của user hướng mặt sang TRÁI.
  // Khi di chuyển sang phải (walk, stand, lie): lật ngang scaleX(-1) để đầu hướng sang phải.
  // Khi di chuyển sang trái (walk-left): giữ nguyên scaleX(1) để đầu hướng sang trái.
  const isFacingLeft = pose === 'walk-left';

  return (
    <div className={`relative flex flex-col items-center justify-end select-none pointer-events-none ${className}`}>
      {/* 1. Bóng đổ dưới chân tương tác nhịp nhàng theo từng bước đi và tư thế */}
      <div 
        className={`rounded-full bg-slate-900/18 dark:bg-black/35 blur-[0.5px] transition-all duration-300 ${
          pose === 'walk' || pose === 'walk-left'
            ? 'anim-shadow-walk w-[75%] h-[4.5px]'
            : pose === 'lie'
            ? 'anim-shadow-lie w-[88%] h-[5.5px]'
            : 'anim-shadow-stand w-[70%] h-[4px]'
        }`}
      />

      {/* 2. Khung hình chú dê gốc với chuyển động nhún nhảy, uốn lượn linh hoạt */}
      <div 
        className={`w-full flex items-end justify-center ${
          pose === 'walk' || pose === 'walk-left'
            ? 'anim-goat-trot-walk'
            : pose === 'lie'
            ? 'anim-goat-pose-lie'
            : 'anim-goat-pose-stand'
        }`}
        style={{
          transformOrigin: '50% 92%',
        }}
      >
        <img
          src="/assets/goat-stand.png"
          alt="Security Mascot"
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
          style={{
            transform: isFacingLeft ? 'scaleX(1)' : 'scaleX(-1)',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHÚ DÊ TUẦN TRA TRONG HỘP BẢO MẬT (100% HIỆN DIỆN, ĐỦ ĐI - ĐỨNG - NẰM)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[28px] sm:bottom-[32px] h-[36px] sm:h-[40px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* =========================================================
           1. HOẠT CẢNH BƯỚC ĐI NHÚN NHẢY LINH HOẠT (TROT / WALK)
           ========================================================= */
        @keyframes goat-trot-cycle {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1, 1) skewX(0deg);
          }
          20% {
            /* Nhấc chân tiến bước: nâng cao thân, nghiêng nhẹ về phía trước */
            transform: translateY(-4.5px) rotate(3deg) scale(0.97, 1.04) skewX(-2.5deg);
          }
          45% {
            /* Tiếp đất nén nhún (squash): tạo cảm giác chạm chân thật sự */
            transform: translateY(1.2px) rotate(-1.5deg) scale(1.04, 0.96) skewX(1.8deg);
          }
          70% {
            /* Đẩy chân sau: bật nảy nhẹ */
            transform: translateY(-3.8px) rotate(2.2deg) scale(0.98, 1.03) skewX(-1.5deg);
          }
          90% {
            /* Tiếp đất bước tiếp theo */
            transform: translateY(1px) rotate(-1.8deg) scale(1.03, 0.97) skewX(1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg) scale(1, 1) skewX(0deg);
          }
        }

        /* Bóng đổ co giãn theo nhịp bước chân */
        @keyframes goat-shadow-walk-cycle {
          0%, 100% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
          20%, 70% {
            transform: scale(0.82, 0.8);
            opacity: 0.12;
          }
          45%, 90% {
            transform: scale(1.15, 1.1);
            opacity: 0.28;
          }
        }

        /* =========================================================
           2. HOẠT CẢNH ĐỨNG THỞ PHẬP PHỒNG & QUAN SÁT (STAND)
           ========================================================= */
        @keyframes goat-stand-breathe {
          0%, 100% {
            transform: translateY(0px) scale(1, 1) rotate(0deg);
          }
          30% {
            /* Hít vào phập phồng lồng ngực */
            transform: translateY(-1.2px) scale(1.025, 1.02) rotate(1deg);
          }
          55% {
            /* Thở ra, nhìn quanh quan sát */
            transform: translateY(0px) scale(1, 0.99) rotate(-1.2deg);
          }
          80% {
            /* Đứng cảnh giác */
            transform: translateY(-0.8px) scale(1.015, 1.01) rotate(0.4deg);
          }
        }

        @keyframes goat-shadow-stand-cycle {
          0%, 100% { transform: scale(1, 1); opacity: 0.22; }
          30% { transform: scale(0.95, 0.95); opacity: 0.18; }
          55% { transform: scale(1.03, 1.03); opacity: 0.24; }
        }

        /* =========================================================
           3. HOẠT CẢNH NẰM NGHỈ THƯ THÁI (LIE DOWN)
           ========================================================= */
        @keyframes goat-lie-down {
          0%, 100% {
            /* Hạ sát mặt sàn, cơ thể co dẹp ngang như nằm gấp chân */
            transform: translateY(11px) scale(1.08, 0.68) rotate(0deg);
          }
          50% {
            /* Thở sâu êm dịu lúc nghỉ ngơi */
            transform: translateY(10px) scale(1.10, 0.71) rotate(0.6deg);
          }
        }

        @keyframes goat-shadow-lie-cycle {
          0%, 100% { transform: scale(1.25, 1.2); opacity: 0.28; }
          50% { transform: scale(1.30, 1.25); opacity: 0.32; }
        }

        /* Áp dụng class animation linh hoạt */
        .anim-goat-trot-walk {
          animation: goat-trot-cycle 0.52s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .anim-shadow-walk {
          animation: goat-shadow-walk-cycle 0.52s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        .anim-goat-pose-stand {
          animation: goat-stand-breathe 2.4s ease-in-out infinite;
        }
        .anim-shadow-stand {
          animation: goat-shadow-stand-cycle 2.4s ease-in-out infinite;
        }

        .anim-goat-pose-lie {
          animation: goat-lie-down 2.8s ease-in-out infinite;
        }
        .anim-shadow-lie {
          animation: goat-shadow-lie-cycle 2.8s ease-in-out infinite;
        }

        /* =========================================================
           4. CHU TRÌNH TUẦN TRA TRONG HỘP: 18 GIÂY (LUÔN XUẤT HIỆN 100%)
           ========================================================= */
        @keyframes patrol-traverse-cycle {
          /* PHA 1: Đi từ trái sang giữa (0s -> 4.5s = 0% -> 25%) */
          0% {
            left: 6px;
          }
          25% {
            left: calc(50% - 22px);
          }

          /* PHA 2: Đứng uy nghiêm giữa hộp quan sát (4.5s -> 8.5s = 25% -> 47%) */
          26% {
            left: calc(50% - 22px);
          }
          47% {
            left: calc(50% - 22px);
          }

          /* PHA 3: Nằm nghỉ thư thái giữa sàn hộp (8.5s -> 12.5s = 47% -> 69%) */
          48% {
            left: calc(50% - 22px);
          }
          69% {
            left: calc(50% - 22px);
          }

          /* PHA 4: Đứng dậy đi tiếp sang phải (12.5s -> 15.5s = 69% -> 86%) */
          70% {
            left: calc(50% - 22px);
          }
          86% {
            left: calc(100% - 48px);
          }

          /* PHA 5: Quay đầu đi tuần tra về lại bên trái (15.5s -> 18s = 86% -> 100%) */
          87% {
            left: calc(100% - 48px);
          }
          100% {
            left: 6px;
          }
        }

        /* Chuyển đổi chính xác 4 trạng thái tư thế */
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

        /* Rê chuột vào hộp: Dê hào hứng bước nhanh hơn */
        .group:hover .anim-patrol-runner-box {
          animation-duration: 11s;
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
          animation-duration: 11s;
        }
      `}</style>

      {/* Đường vệt sàn nhẹ tinh tế trong hộp bảo mật */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Chú Dê tuần tra (Luôn xuất hiện bên trong hộp) */}
      <div className="anim-patrol-runner-box flex items-end">
        {/* 1. Đi sang phải (đầu hướng sang phải, nhún nhảy linh hoạt) */}
        <div className="layer-v-walk-r">
          <SecurityGoat pose="walk" className="w-[42px] sm:w-[46px]" />
        </div>

        {/* 2. Đứng canh gác giữa hộp (thở phập phồng, quan sát) */}
        <div className="layer-v-stand absolute inset-0 flex items-end">
          <SecurityGoat pose="stand" className="w-[42px] sm:w-[46px]" />
        </div>

        {/* 3. Nằm nghỉ thư thái giữa sàn hộp (áp sát sàn, thở sâu) */}
        <div className="layer-v-lie absolute inset-0 flex items-end">
          <SecurityGoat pose="lie" className="w-[42px] sm:w-[46px]" />
        </div>

        {/* 4. Đi về lại bên trái (quay đầu sang trái, nhún nhảy linh hoạt) */}
        <div className="layer-v-walk-l absolute inset-0 flex items-end">
          <SecurityGoat pose="walk-left" className="w-[42px] sm:w-[46px]" />
        </div>
      </div>
    </div>
  );
};
