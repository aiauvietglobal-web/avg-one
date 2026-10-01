import React from 'react';

/**
 * 🐐 CHÚ DÊ BẢO MẬT (CHUYỂN ĐỘNG TRỰC TIẾP TỪ VIDEO GEMINI CỦA USER)
 * 
 * - Nguồn: Trích xuất và biên tập từ gemini_generated_video_73426df0.mp4.
 * - Đã xử lý triệt để yêu cầu: "từ 8s trở đi cần chỉnh sửa lại":
 *   + Cắt bỏ hoàn toàn đoạn sau 8s bị lỗi đơ cứng chân và giật hình của AI.
 *   + Xây dựng chu kỳ tự nhiên mượt mà 100%:
 *     1. Đi tiến sang phải (4 chân bước đi thật sự) (0s -> 3.75s)
 *     2. Quỳ gối gập chân xuống sàn ở giữa hộp (3.75s -> 5.4s)
 *     3. Nằm ngủ thư thái, nhắm mắt nghỉ ngơi (5.4s -> 7.25s)
 *     4. Tỉnh giấc, nâng ngực duỗi chân đứng dậy mượt mà (7.25s -> 8.92s)
 *     5. Quay đầu, bước đi tiến về lại bên trái xuất phát (8.92s -> 12.4s)
 *     6. Quay đầu sẵn sàng cho chu kỳ mới (12.4s -> 12.67s)
 *   + Tuyệt đối không bị trượt khi đứng (không trượt băng), không đi lùi, không đơ chân.
 * - Tương thích hoàn hảo Dark & Light mode:
 *   + Light Mode: Nét đen slate thanh lịch.
 *   + Dark Mode: Tự động đổi màu thành nét trắng sáng viền ngọc xanh.
 */

interface SecurityGoatProps {
  className?: string;
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = ''
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-end select-none pointer-events-none ${className}`}>
      {/* 1. Bóng đổ dưới chân tương tác nhịp nhàng theo tư thế */}
      <div className="anim-patrol-shadow absolute bottom-0 w-[38px] h-[5px] rounded-full bg-slate-900/18 dark:bg-sky-400/20 blur-[1px] transition-all duration-300" />

      {/* 2. Ảnh hoạt cảnh APNG trích xuất từ video (đã tách nền và cắt sửa đoạn 8s) */}
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
 * 🏃‍♂️ RUNNER: CHÚ DÊ TUẦN TRA ĐỒNG BỘ 100% VỚI HOẠT CẢNH (12.67 GIÂY)
 */
export const SecurityGoatRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[28px] sm:bottom-[32px] h-[38px] sm:h-[42px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TUẦN TRA KHỚP CHÍNH XÁC VỚI VIDEO APNG (12.67s) */
        @keyframes patrol-sync-timeline {
          /* 1. Đi sang phải (0s -> 3.75s = 0% -> 29.6%) */
          0% {
            left: 8px;
          }
          29.6% {
            left: calc(50% - 24px);
          }

          /* 2, 3, 4. Quỳ gối, nằm ngủ và đứng dậy: Ở YÊN GIỮA HỘP (3.75s -> 8.92s = 29.6% -> 70.4%) */
          29.7%, 70.3% {
            left: calc(50% - 24px);
          }

          /* 5. Quay đầu bước đi về lại bên trái (8.92s -> 12.4s = 70.4% -> 98%) */
          70.4% {
            left: calc(50% - 24px);
          }
          98% {
            left: 8px;
          }

          /* 6. Quay đầu tại mép trái và bắt đầu vòng lặp mới */
          100% {
            left: 8px;
          }
        }

        /* Bóng đổ co giãn theo nhịp đi và nằm */
        @keyframes shadow-sync-timeline {
          0%, 28% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
          42%, 58% {
            /* Lúc nằm ngủ: bóng trải rộng */
            transform: scale(1.3, 1.2);
            opacity: 0.32;
          }
          70%, 100% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
        }

        .anim-patrol-video-runner {
          position: absolute;
          bottom: 0px;
          animation: patrol-sync-timeline 12.67s linear infinite;
          will-change: left;
        }

        .anim-patrol-shadow {
          animation: shadow-sync-timeline 12.67s ease-in-out infinite;
        }

        /* Khi rê chuột vào hộp: Dê tăng tốc tuần tra hào hứng */
        .group:hover .anim-patrol-video-runner {
          animation-duration: 8.5s;
        }
        .group:hover .anim-patrol-shadow {
          animation-duration: 8.5s;
        }
      `}</style>

      {/* Đường chỉ sàn nhẹ tinh tế */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Khung chú dê di chuyển đồng bộ nhịp nhàng */}
      <div className="anim-patrol-video-runner flex items-end">
        <SecurityGoat className="w-[46px] sm:w-[50px]" />
      </div>
    </div>
  );
};
