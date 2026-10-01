import React from 'react';

/**
 * 🐐 2D ANIMATED SECURITY GOAT (CHÚ DÊ CÔNG NGHỆ 2D CHẠY TRONG HỘP BẢO MẬT)
 * 
 * - Hình dáng con dê dạng 2D sắc nét, tỉ mỉ theo phong cách công nghệ cao:
 *   + Cặp sừng cong đặc trưng (Curved Golden Horns) màu vàng hoàng gia.
 *   + Râu cằm dê (Goatee beard) ngộ nghĩnh, thông minh.
 *   + 4 chân khớp động học chạy phi nước đại (Galloping legs) luân phiên mượt mà.
 *   + Thân nhấp nhô theo nhịp chạy (Body gallop bobbing).
 *   + Đuôi vểnh nhỏ ve vẩy vui mắt.
 *   + Khiên bảo mật công nghệ phát quang hộ tống.
 */

interface SecurityGoatProps {
  className?: string;
  variant?: 'badge' | 'runner';
}

export const SecurityGoat: React.FC<SecurityGoatProps> = ({ 
  className = '',
  variant = 'badge'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 72 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradient Sừng Dê Vàng Hổ Phách */}
          <linearGradient id="goat-horn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Gradient Sừng Dê Sau */}
          <linearGradient id="goat-horn-back-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Gradient Thân Dê Xanh Công Nghệ AVG */}
          <linearGradient id="goat-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="45%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Gradient Chân Sau Thân (Tối hơn tạo độ sâu 2D) */}
          <linearGradient id="goat-leg-back-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          {/* Khiên bảo mật Cyan phía sau */}
          <linearGradient id="goat-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <style>{`
          /* Di chuyển tiến lùi tự nhiên trong hộp khi chạy phi nước đại */
          @keyframes goat-stride-traverse {
            0% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            100% { transform: translateX(-4px); }
          }

          /* Nhịp chạy nhấp nhô của toàn bộ thân chú dê */
          @keyframes goat-body-gallop {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-2.5px) rotate(-1.5deg); }
            50% { transform: translateY(1px) rotate(1deg); }
            75% { transform: translateY(-1.5px) rotate(-0.5deg); }
          }

          /* Chân trước gần (Front Near Leg) */
          @keyframes goat-front-near-leg {
            0% { transform: rotate(-32deg); }
            35% { transform: rotate(26deg); }
            70% { transform: rotate(-10deg); }
            100% { transform: rotate(-32deg); }
          }

          /* Chân trước xa (Front Far Leg - ngược pha) */
          @keyframes goat-front-far-leg {
            0% { transform: rotate(25deg); }
            35% { transform: rotate(-26deg); }
            70% { transform: rotate(12deg); }
            100% { transform: rotate(25deg); }
          }

          /* Chân sau gần (Back Near Leg) */
          @keyframes goat-back-near-leg {
            0% { transform: rotate(32deg); }
            35% { transform: rotate(-24deg); }
            70% { transform: rotate(8deg); }
            100% { transform: rotate(32deg); }
          }

          /* Chân sau xa (Back Far Leg - ngược pha) */
          @keyframes goat-back-far-leg {
            0% { transform: rotate(-24deg); }
            35% { transform: rotate(30deg); }
            70% { transform: rotate(-10deg); }
            100% { transform: rotate(-24deg); }
          }

          /* Đuôi ve vẩy */
          @keyframes goat-tail-wag {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(20deg); }
          }

          /* Râu cằm nhấp nhô trong gió */
          @keyframes goat-beard-flutter {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-18deg); }
          }

          /* Vệt bụi tốc độ bay về sau */
          @keyframes dust-stream-1 {
            0% { transform: translateX(0px); opacity: 0.8; }
            100% { transform: translateX(-16px); opacity: 0; }
          }
          @keyframes dust-stream-2 {
            0% { transform: translateX(0px); opacity: 0.8; }
            100% { transform: translateX(-22px); opacity: 0; }
          }

          .anim-goat-traverse { animation: goat-stride-traverse 1.8s ease-in-out infinite; }
          .anim-goat-body { animation: goat-body-gallop 0.42s ease-in-out infinite; transform-origin: 32px 28px; }
          .anim-front-near { animation: goat-front-near-leg 0.42s ease-in-out infinite; transform-origin: 43px 29px; }
          .anim-front-far { animation: goat-front-far-leg 0.42s ease-in-out infinite; transform-origin: 44px 28px; }
          .anim-back-near { animation: goat-back-near-leg 0.42s ease-in-out infinite; transform-origin: 25px 28px; }
          .anim-back-far { animation: goat-back-far-leg 0.42s ease-in-out infinite; transform-origin: 26px 27px; }
          .anim-goat-tail { animation: goat-tail-wag 0.3s ease-in-out infinite; transform-origin: 19px 23px; }
          .anim-goat-beard { animation: goat-beard-flutter 0.35s ease-in-out infinite; transform-origin: 52px 24px; }
          .anim-dust-1 { animation: dust-stream-1 0.42s linear infinite; }
          .anim-dust-2 { animation: dust-stream-2 0.35s linear infinite; }
        `}</style>

        {/* 🛡️ BIỂU TƯỢNG KHIÊN BẢO MẬT NỀN (SECURITY SHIELD BACKDROP) */}
        <g opacity="0.35" transform="translate(36, 26)">
          <path
            d="M 0 -18 L 16 -12 C 16 4 9 16 0 20 C -9 16 -16 4 -16 -12 Z"
            fill="url(#goat-shield-grad)"
            stroke="#0284C7"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />
        </g>

        {/* 💨 VỆT TỐC ĐỘ DƯỚI CHÂN CHÚ DÊ */}
        <g opacity="0.7">
          <line x1="22" y1="46" x2="10" y2="46" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" className="anim-dust-1" />
          <line x1="28" y1="48" x2="14" y2="48" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" className="anim-dust-2" />
          <circle cx="16" cy="45" r="1" fill="#38BDF8" className="anim-dust-1" />
          <circle cx="12" cy="47" r="1.2" fill="#0284C7" className="anim-dust-2" />
        </g>

        {/* 🐐 CHÚ DÊ CÔNG NGHỆ 2D ĐANG CHẠY PHI NƯỚC ĐẠI & DI CHUYỂN */}
        <g className="anim-goat-traverse">
          {/* CHÂN XA (LỚP NẰM SAU THÂN) */}
          {/* 1. Chân trước xa */}
          <g className="anim-front-far">
            <path
              d="M 44 28 L 47 37 L 43 43 L 45 44 L 48 37 L 46 28 Z"
              fill="url(#goat-leg-back-grad)"
            />
            {/* Móng guốc xa */}
            <path d="M 42.5 42.5 L 45 44 L 43 44.5 Z" fill="#0F172A" />
          </g>

          {/* 2. Chân sau xa */}
          <g className="anim-back-far">
            <path
              d="M 26 27 L 22 34 L 28 41 L 26 43 L 20 34 L 24 27 Z"
              fill="url(#goat-leg-back-grad)"
            />
            {/* Móng guốc xa */}
            <path d="M 26 41.5 L 28 42.5 L 25.5 43.5 Z" fill="#0F172A" />
          </g>

          {/* SỪNG SAU (NẰM SAU ĐẦU) */}
          <path
            d="M 45 14 C 41 6 32 3 24 6 C 29 8 36 10 42 16 Z"
            fill="url(#goat-horn-back-grad)"
            stroke="#B45309"
            strokeWidth="0.5"
          />

          {/* THÂN THỂ + ĐẦU + CỔ (NHẤP NHÔ THEO NHỊP CHẠY) */}
          <g className="anim-goat-body">
            
            {/* Đuôi ve vẩy */}
            <g className="anim-goat-tail">
              <path
                d="M 20 23 C 15 20 14 16 16 15 C 18 16 19 19 21 22 Z"
                fill="#38BDF8"
                stroke="#0284C7"
                strokeWidth="0.8"
              />
            </g>

            {/* Khối thân chú dê (Thon gọn, cơ bắp, dũng mãnh) */}
            <path
              d="M 21 23 C 24 21 34 21 42 24 L 44 29 C 38 33 26 33 21 29 Z"
              fill="url(#goat-body-grad)"
              stroke="#0284C7"
              strokeWidth="1"
            />

            {/* Cơ ngực & cổ vươn cao về phía trước */}
            <path
              d="M 38 23 L 44 16 L 49 18 L 45 28 Z"
              fill="url(#goat-body-grad)"
            />

            {/* Đầu chú dê */}
            <path
              d="M 43 17 L 47 13 L 53 17 L 55 21 L 51 24 L 44 22 Z"
              fill="url(#goat-body-grad)"
              stroke="#0284C7"
              strokeWidth="0.8"
            />

            {/* Mõm & Mũi */}
            <path d="M 53 17 L 55 20 L 53 21 Z" fill="#0F172A" />
            
            {/* Râu dê đặc trưng (Goatee Beard) bay trong gió */}
            <g className="anim-goat-beard">
              <path
                d="M 52 23 C 53 26 56 29 55 31 C 52 29 50 26 51 24 Z"
                fill="#FDE68A"
                stroke="#F59E0B"
                strokeWidth="0.6"
              />
            </g>

            {/* Tai dê nhọn vểnh */}
            <path
              d="M 44 16 C 41 15 39 17 38 19 C 41 18 43 17 44 16 Z"
              fill="#BAE6FD"
              stroke="#0284C7"
              strokeWidth="0.6"
            />

            {/* Mắt công nghệ sáng thông minh */}
            <circle cx="48" cy="17" r="1.5" fill="#FFFFFF" />
            <circle cx="48.5" cy="17" r="0.8" fill="#0F172A" />
            <circle cx="48.8" cy="16.7" r="0.3" fill="#38BDF8" />

            {/* SỪNG TRƯỚC (VÀNG HOÀNG GIA - CONG VÚT QUYẾN RŨ) */}
            <path
              d="M 46 14 C 43 5 33 2 25 5 C 31 7 38 9 44 16 Z"
              fill="url(#goat-horn-grad)"
              stroke="#D97706"
              strokeWidth="0.7"
            />
            {/* Khía đốt trên sừng dê */}
            <line x1="38" y1="11" x2="39" y2="13" stroke="#FFFBEB" strokeWidth="0.8" />
            <line x1="33" y1="8" x2="34" y2="10" stroke="#FFFBEB" strokeWidth="0.8" />
            <line x1="28" y1="6" x2="29" y2="8" stroke="#FFFBEB" strokeWidth="0.8" />
          </g>

          {/* CHÂN GẦN (LỚP NẰM TRƯỚC THÂN) */}
          {/* 3. Chân trước gần */}
          <g className="anim-front-near">
            <path
              d="M 43 29 L 45 37 L 50 43 L 48 44.5 L 43 38 L 41 29 Z"
              fill="url(#goat-body-grad)"
              stroke="#0284C7"
              strokeWidth="0.8"
            />
            {/* Móng guốc trước */}
            <path d="M 48 43 L 50.5 44.5 L 48 45 Z" fill="#0F172A" />
          </g>

          {/* 4. Chân sau gần (Bắp đùi cơ bắp phi nước đại) */}
          <g className="anim-back-near">
            <path
              d="M 25 28 C 22 30 19 33 20 37 L 14 43 L 16 44.5 L 22 38 L 24 33 L 27 28 Z"
              fill="url(#goat-body-grad)"
              stroke="#0284C7"
              strokeWidth="0.8"
            />
            {/* Móng guốc sau */}
            <path d="M 13.5 42.5 L 15.5 44.5 L 13 44.5 Z" fill="#0F172A" />
          </g>
        </g>
      </svg>
    </div>
  );
};
