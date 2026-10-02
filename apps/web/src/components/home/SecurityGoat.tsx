import React from 'react';

/**
 * 🐐 CHÚ DÊ BẢO MẬT (CHUYỂN ĐỘNG 24FPS SIÊU MƯỢT TỪ GIÂY ĐẦU TIÊN ĐẾN HẾT CHU KỲ)
 * 
 * - Chu kỳ 13.25 giây chuẩn điện ảnh 24fps (318 frames mượt mà):
 *   1. [0s - 3.38s | 0% - 25.5%]: Đi 4 chân tự nhiên từ mép trái tới giữa hộp.
 *   2. [3.38s - 5.25s | 25.5% - 39.6%]: Quỳ gối gập chân xuống sàn ở giữa hộp.
 *   3. [5.25s - 7.33s | 39.6% - 55.3%]: Nằm ngủ thư thái, nhắm mắt yên bình.
 *   4. [7.33s - 9.21s | 55.3% - 69.5%]: Tỉnh giấc, nâng lồng ngực duỗi chân đứng dậy mượt mà.
 *   5. [9.21s - 9.54s | 69.5% - 72.0%]: Xoay người 3D tại chỗ chuyển hướng sang trái.
 *   6. [9.54s - 12.92s | 72.0% - 97.5%]: 4 chân sải bước đi tiến về lại mép trái xuất phát.
 *   7. [12.92s - 13.25s | 97.5% - 100%]: Xoay người tại chỗ chuẩn bị cho chu kỳ tiếp theo.
 * - Khắc phục triệt để:
 *   + Không trượt băng trên sàn (vị trí khóa chặt khi quỳ, nằm ngủ và đứng dậy).
 *   + Không giật lật hướng (xoay người chuyển cảnh mượt mà).
 *   + Tách nền trong suốt 100%, nét vẽ đen tinh tế ở Light Mode, phát sáng dịu ngọc ở Dark Mode.
 */

interface SecurityGoatProps {
  className?: string;
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = ''
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-end select-none pointer-events-none ${className}`}>
      {/* 1. Bóng đổ dưới chân tương tác nhịp nhàng theo chuyển động */}
      <div className="anim-patrol-shadow absolute bottom-0 w-[38px] h-[5px] rounded-full bg-slate-900/18 dark:bg-sky-400/20 blur-[1px] transition-all duration-300" />

      {/* 2. Ảnh hoạt cảnh APNG 24fps siêu mượt (đã tách nền sạch 100%) */}
      <div className="relative w-full flex items-end justify-center">
        <img
          src="/assets/goat_patrol.png"
          alt="Security Mascot"
          className="w-full h-auto object-contain select-none pointer-events-none dark:invert dark:brightness-125 dark:drop-shadow-[0_0_3px_rgba(56,189,248,0.4)]"
          draggable={false}
        />
      </div>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHÚ DÊ TUẦN TRA ĐỒNG BỘ 100% VỚI CHU KỲ 24FPS (13.25 GIÂY)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[28px] sm:bottom-[32px] h-[38px] sm:h-[42px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TUẦN TRA 24FPS SIÊU MƯỢT (13.25s) */
        @keyframes patrol-smooth-24fps {
          /* 1. Đi sang phải (0s -> 3.38s) */
          0% {
            left: 8px;
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          }
          25.5% {
            left: calc(50% - 24px);
            animation-timing-function: step-end;
          }

          /* 2, 3, 4, 5. Quỳ gối, nằm ngủ, đứng dậy và xoay người: Ở YÊN GIỮA HỘP KHÔNG TRƯỢT (3.38s -> 9.54s) */
          72.0% {
            left: calc(50% - 24px);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          }

          /* 6. Đi về lại mép trái (9.54s -> 12.92s) */
          97.5% {
            left: 8px;
            animation-timing-function: step-end;
          }

          /* 7. Xoay người tại chỗ và bắt đầu vòng lặp mới */
          100% {
            left: 8px;
          }
        }

        /* Bóng đổ mở rộng khi nằm ngủ và thu gọn khi bước đi */
        @keyframes shadow-smooth-24fps {
          0%, 25.5% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
          39.6%, 55.3% {
            /* Lúc nằm ngủ: bóng trải rộng êm ái */
            transform: scale(1.3, 1.2);
            opacity: 0.32;
          }
          69.5%, 100% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
        }

        .anim-patrol-video-runner {
          position: absolute;
          bottom: 0px;
          animation: patrol-smooth-24fps 13.25s infinite;
          will-change: left;
        }

        .anim-patrol-shadow {
          animation: shadow-smooth-24fps 13.25s ease-in-out infinite;
        }

        /* Khi rê chuột vào hộp: Tăng tốc nhẹ nhàng */
        .group:hover .anim-patrol-video-runner {
          animation-duration: 9.5s;
        }
        .group:hover .anim-patrol-shadow {
          animation-duration: 9.5s;
        }
      `}</style>

      {/* Đường chỉ sàn nhẹ tinh tế */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Khung chú dê di chuyển mượt mà 24fps */}
      <div className="anim-patrol-video-runner flex items-end">
        <SecurityGoat className="w-[46px] sm:w-[50px]" />
      </div>
    </div>
  );
};
