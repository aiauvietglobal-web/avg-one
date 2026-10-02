import React from 'react';

/**
 * 🐕 CHÚ CHÓ TRUNG THÀNH - HỒ SƠ NĂNG LỰC
 * 
 * - Nguồn: Trích xuất và tách nền 100% từ gemini_generated_video_94ee3817.mp4.
 * - Chu kỳ 20 giây chuẩn 20fps hoàn chỉnh:
 *   1. [0s - 3.5s]: 4 chân sải bước đi tiến (Walk)
 *   2. [3.5s - 6.0s]: Ngồi uy nghiêm, trung thành (Sit)
 *   3. [6.0s - 8.0s]: Nằm áp sát sàn hộp nghỉ ngơi (Lie down)
 *   4. [8.0s - 11.0s]: Ngồi dậy, giơ chân trước chào đón (Loyal Paw)
 *   5. [11.0s - 13.0s]: Đứng thẳng dậy và xoay người 3D chuyển hướng
 *   6. [13.0s - 18.0s]: Bước đi tiến theo hướng ngược lại
 *   7. [18.0s - 20.0s]: Dừng lại đứng canh gác và lặp lại chu kỳ
 * - Tương thích Dark & Light Mode:
 *   + Light Mode: Nét đen slate thanh thoát.
 *   + Dark Mode: Nét trắng sáng dịu ngọc viền cyan sang trọng.
 */

interface ProfileDogProps {
  className?: string;
}

export const ProfileDog: React.FC<ProfileDogProps> = ({ 
  className = ''
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-end select-none pointer-events-none ${className}`}>
      {/* 1. Bóng đổ dưới chân mềm mại tương tác với sàn hộp */}
      <div className="anim-dog-shadow absolute bottom-0 w-[40px] h-[5px] rounded-full bg-slate-900/18 dark:bg-sky-400/20 blur-[1px] transition-all duration-300" />

      {/* 2. Ảnh hoạt cảnh APNG chú chó đã tách nền sạch 100% */}
      <div className="relative w-full flex items-end justify-center">
        <img
          src="/assets/dog_profile_patrol.png"
          alt="Profile Dog Mascot"
          className="w-full h-auto object-contain select-none pointer-events-none dark:invert dark:brightness-125 dark:drop-shadow-[0_0_3px_rgba(56,189,248,0.4)]"
          draggable={false}
        />
      </div>
    </div>
  );
};

/**
 * 🏃‍♂️ RUNNER: CHÚ CHÓ TUẦN TRA TRONG HỘP "HỒ SƠ NĂNG LỰC" (CHU KỲ 20 GIÂY)
 */
export const ProfileDogRunner: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[28px] sm:bottom-[32px] h-[38px] sm:h-[42px] pointer-events-none overflow-hidden z-0">
      <style>{`
        /* CHU TRÌNH TUẦN TRA ĐỒNG BỘ 20S CỦA CHÚ CHÓ */
        @keyframes dog-patrol-timeline {
          /* 1. Đi sang trái từ phải vào giữa (0s -> 3.5s = 0% -> 17.5%) */
          0% {
            left: calc(100% - 52px);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          }
          17.5% {
            left: calc(50% - 24px);
            animation-timing-function: step-end;
          }

          /* 2, 3, 4, 5. Ngồi, nằm, ngồi dậy, xoay người: Ở YÊN GIỮA HỘP KHÔNG TRƯỢT (3.5s -> 13.0s = 17.5% -> 65.0%) */
          65.0% {
            left: calc(50% - 24px);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          }

          /* 6. Đi tiếp sang phải (13.0s -> 18.0s = 65.0% -> 90.0%) */
          90.0% {
            left: calc(100% - 52px);
            animation-timing-function: step-end;
          }

          /* 7. Đứng canh gác và chuẩn bị lặp lại chu kỳ mới */
          100% {
            left: calc(100% - 52px);
          }
        }

        /* Bóng đổ mở rộng khi ngồi và nằm, thu gọn khi bước đi */
        @keyframes dog-shadow-timeline {
          0%, 17.5% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
          18%, 30% {
            /* Lúc ngồi: bóng tròn gọn */
            transform: scale(1.1, 1.1);
            opacity: 0.26;
          }
          30.5%, 45% {
            /* Lúc nằm: bóng trải dài êm ái */
            transform: scale(1.35, 1.25);
            opacity: 0.32;
          }
          45.5%, 65% {
            /* Lúc ngồi dậy và xoay */
            transform: scale(1.15, 1.1);
            opacity: 0.26;
          }
          65.5%, 100% {
            transform: scale(1, 1);
            opacity: 0.22;
          }
        }

        .anim-dog-runner-box {
          position: absolute;
          bottom: 0px;
          animation: dog-patrol-timeline 20s infinite;
          will-change: left;
        }

        .anim-dog-shadow {
          animation: dog-shadow-timeline 20s ease-in-out infinite;
        }

        /* Khi rê chuột vào hộp: Tăng tốc hào hứng */
        .group:hover .anim-dog-runner-box {
          animation-duration: 14s;
        }
        .group:hover .anim-dog-shadow {
          animation-duration: 14s;
        }
      `}</style>

      {/* Đường chỉ sàn mờ nhẹ tinh tế */}
      <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-sky-300/35 dark:via-sky-600/25 to-transparent" />

      {/* Khung chú chó di chuyển mượt mà */}
      <div className="anim-dog-runner-box flex items-end">
        <ProfileDog className="w-[46px] sm:w-[50px]" />
      </div>
    </div>
  );
};
