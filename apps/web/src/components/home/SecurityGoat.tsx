import React from 'react';

/**
 * 🐐 CHÚ DÊ BẢO MẬT (CHUYỂN ĐỘNG TRỰC TIẾP TỪ VIDEO GEMINI CỦA USER)
 * 
 * - Nguồn: Trích xuất trực tiếp từ gemini_generated_video_73426df0.mp4.
 * - Tách nền sạch 100% (Sub-pixel Alpha Transparency):
 *   + Nền trắng đã được loại bỏ hoàn toàn, mượt mà không vỡ hạt (anti-aliased).
 *   + Đường gạch sàn màu đen ở đáy video đã được crop chuẩn xác.
 *   + Giữ nguyên toàn bộ 100% chuyển động thực tế từ video:
 *     * Đi 4 chân tự nhiên (Walk)
 *     * Quỳ gối gập chân
 *     * Nằm ngủ thư thái áp sát sàn (Lie down / Sleep)
 *     * Đứng dậy tiếp tục tuần tra (Stand up)
 * - Tương thích Dark / Light Mode:
 *   + Light Mode: Nét vẽ đen slate thanh lịch, sắc nét.
 *   + Dark Mode: Tự động đảo màu thành nét trắng ngà phát sáng dịu nhẹ trên nền hộp tối.
 * - Không đi lùi: Tự động xoay hướng theo chiều di chuyển.
 * - Luôn xuất hiện trong hộp 100% thời gian, vị trí thoáng trên chữ "Bảo Mật".
 */

interface SecurityGoatProps {
  className?: string;
  isFacingLeft?: boolean;
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  isFacingLeft = false
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-end select-none pointer-events-none ${className}`}>
      {/* 1. Bóng đổ dưới chân mềm mại tương tác với sàn hộp */}
      <div className="anim-patrol-shadow absolute bottom-0 w-[38px] h-[5px] rounded-full bg-slate-900/18 dark:bg-sky-400/20 blur-[1px] transition-all duration-300" />

      {/* 2. Ảnh hoạt cảnh APNG trích xuất từ video của user (đã tách nền) */}
      <div 
        className="relative w-full flex items-end justify-center"
        style={{
          transform: isFacingLeft ? 'scaleX(-1)' : 'none',
          transformOrigin: 'center bottom',
          transition: 'transform 0.4s ease-in-out',
        }}
      >
        <img
          src="/assets/goat_patrol.png"
          alt="Security Goat Patrol"
          className="w-full h-auto object-contain select-none pointer-events-none dark:invert dark:brightness-125 dark:drop-shadow-[0_0_3px_rgba(56,189,248,0.4)]"
          draggable={false}
        />
      </div>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHÚ DÊ TUẦN TRA LIÊN TỤC TRONG HỘP BẢO MẬT
 * - Đồng bộ với chu kỳ video 10 giây:
 *   + 0s - 4s: Đi tuần tra từ mép trái sang giữa hộp (hướng mặt sang phải)
 *   + 4s - 8s: Dừng giữa hộp, quỳ gối nằm nghỉ ngơi thư thái
 *   + 8s - 10s: Đứng dậy, quay đầu sẵn sàng cho chu kỳ mới
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[28px] sm:bottom-[32px] h-[38px] sm:h-[42px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TUẦN TRA ĐỒNG BỘ VIDEO: 20 GIÂY (2 LẦN LẶP VIDEO 10S) */
        @keyframes patrol-traverse-video-cycle {
          /* LẦN 1: Tiến sang phải (0s -> 4s) */
          0% {
            left: 8px;
            transform: scaleX(1);
          }
          20% {
            left: calc(50% - 24px);
            transform: scaleX(1);
          }

          /* Nằm nghỉ giữa hộp (4s -> 8s) */
          21%, 40% {
            left: calc(50% - 24px);
            transform: scaleX(1);
          }

          /* Đứng dậy đi tiếp sang mép phải (8s -> 10s) */
          41% {
            left: calc(50% - 24px);
            transform: scaleX(1);
          }
          50% {
            left: calc(100% - 54px);
            transform: scaleX(1);
          }

          /* LẬT MẶT SANG TRÁI VÀ ĐI TIẾN VỀ BÊN TRÁI (10s -> 14s) */
          51% {
            left: calc(100% - 54px);
            transform: scaleX(-1);
          }
          70% {
            left: calc(50% - 24px);
            transform: scaleX(-1);
          }

          /* Nằm nghỉ giữa hộp lần 2 (14s -> 18s) */
          71%, 90% {
            left: calc(50% - 24px);
            transform: scaleX(-1);
          }

          /* Đứng dậy đi về mép trái xuất phát (18s -> 20s) */
          91% {
            left: calc(50% - 24px);
            transform: scaleX(-1);
          }
          100% {
            left: 8px;
            transform: scaleX(-1);
          }
        }

        /* Bóng đổ co giãn theo nhịp đi và nằm */
        @keyframes shadow-breathe-cycle {
          0%, 15%, 50%, 65% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.22;
          }
          20%, 40%, 70%, 90% {
            /* Lúc nằm: bóng trải rộng hơn */
            transform: scaleX(1.3) scaleY(1.2);
            opacity: 0.32;
          }
        }

        .anim-patrol-video-runner {
          position: absolute;
          bottom: 0px;
          animation: patrol-traverse-video-cycle 20s ease-in-out infinite;
          will-change: left, transform;
        }

        .anim-patrol-shadow {
          animation: shadow-breathe-cycle 20s ease-in-out infinite;
        }

        /* Rê chuột vào hộp: Tăng tốc tuần tra hào hứng */
        .group:hover .anim-patrol-video-runner {
          animation-duration: 12s;
        }
        .group:hover .anim-patrol-shadow {
          animation-duration: 12s;
        }
      `}</style>

      {/* Đường chỉ sàn nhẹ tinh tế */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Khung chú dê di chuyển (100% từ video đã tách nền) */}
      <div className="anim-patrol-video-runner flex items-end">
        <SecurityGoat className="w-[46px] sm:w-[50px]" />
      </div>
    </div>
  );
};
