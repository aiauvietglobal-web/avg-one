import React from 'react';

/**
 * 🌐 TECH 3D MONOLITHIC DATA PLATFORM (AVG ONE INTEGRATED ISOMETRIC ARCHITECTURE - LEFT SIDE)
 * 
 * Bố cục khối hộp 3D nguyên khối có chiều sâu thực thụ (True 3D Monolithic Depth):
 * - Đã sửa lỗi văng vị trí: Khối lập phương nằm chuẩn xác tại trọng tâm (X=260, Y=115), gắn kết với bệ máy.
 * - Khối lập phương lượng tử đỉnh (Top Quantum Cube) gối trực tiếp lên Bệ khối hộp 3D vững chãi.
 * - Hai khối module cánh (Side Data Blocks) mở rộng không gian 3 chiều đối xứng.
 * - Trọng tâm Y chuẩn xác (75 -> 295), căn giữa hoàn hảo với Slogan AVG One, không bao giờ bị cắt mép.
 */

interface TechHologramDataCoreProps {
  className?: string;
}

export const TechHologramDataCore: React.FC<TechHologramDataCoreProps> = ({ className = '' }) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* ========================================================================= */}
        {/* 1. KHỐI BỆ HỘP 3D NỀN TẢNG (INTEGRATED ISOMETRIC BASE SLAB)                 */}
        {/* ========================================================================= */}
        <g id="base-monolith">
          {/* Mặt trái bệ chính */}
          <polygon
            points="170,215 260,258 260,298 170,255"
            stroke="#0284C7"
            strokeWidth="2"
            className="fill-sky-100/90 dark:fill-slate-950/95"
          />
          {/* Mặt phải bệ chính */}
          <polygon
            points="260,258 350,215 350,255 260,298"
            stroke="#0284C7"
            strokeWidth="2"
            className="fill-sky-200/80 dark:fill-slate-800/90"
          />
          {/* Mặt trên bệ chính (Top Face) */}
          <polygon
            points="260,172 350,215 260,258 170,215"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-white/95 dark:fill-slate-900/95"
          />

          {/* Đường gân cấu trúc âm bản trên mặt bệ (Recessed Isometric Inset) */}
          <polygon
            points="260,186 332,215 260,244 188,215"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="5 3"
            fill="none"
            className="opacity-75"
          />

          {/* Đế cắm chân trụ khối lập phương (Docking Base) */}
          <polygon
            points="260,195 290,210 260,225 230,210"
            stroke="#0284C7"
            strokeWidth="1.4"
            className="fill-sky-50 dark:fill-slate-950"
          />
          {/* Trục liên kết dữ liệu thẳng đứng nối từ đế bệ lên đáy khối lập phương */}
          <line x1="260" y1="210" x2="260" y2="162" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 2" />
        </g>

        {/* ========================================================================= */}
        {/* 2. HAI KHỐI MODULE CÁNH 3D (INTEGRATED SIDE MODULE BLOCKS)                */}
        {/* ========================================================================= */}
        
        {/* KHỐI CÁNH TRÁI: BẢO MẬT & AN NINH (CYBER SHIELD) */}
        <g id="left-wing-module" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
          {/* Chân nối từ bệ chính sang khối cánh */}
          <polygon points="170,230 140,245 140,255 170,240" stroke="#0284C7" strokeWidth="1.2" className="fill-sky-100/60 dark:fill-slate-900/60" />
          
          <g transform="translate(130, 225)">
            {/* Mặt trên */}
            <polygon points="0,-18 22,-7 0,4 -22,-7" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            {/* Mặt trái */}
            <polygon points="-22,-7 0,4 0,26 -22,15" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/90 dark:fill-slate-950" />
            {/* Mặt phải */}
            <polygon points="0,4 22,-7 22,15 0,26" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-200/80 dark:fill-slate-800" />
            {/* Icon Shield Line */}
            <g transform="translate(0, -7) scale(0.9)">
              <path
                d="M 0 -8 L 6 -5 L 6 0 C 6 4.5 3.5 8 0 9.5 C -3.5 8 -6 4.5 -6 0 L -6 -5 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-white dark:fill-slate-900"
              />
              <path d="M -2 0 L -0.5 1.8 L 3 -2" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>
        </g>

        {/* KHỐI CÁNH PHẢI: ĐÁM MÂY DỮ LIỆU (CLOUD ARCHITECTURE) */}
        <g id="right-wing-module" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
          {/* Chân nối từ bệ chính sang khối cánh */}
          <polygon points="350,230 380,245 380,255 350,240" stroke="#0284C7" strokeWidth="1.2" className="fill-sky-100/60 dark:fill-slate-900/60" />
          
          <g transform="translate(390, 225)">
            {/* Mặt trên */}
            <polygon points="0,-18 22,-7 0,4 -22,-7" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
            {/* Mặt trái */}
            <polygon points="-22,-7 0,4 0,26 -22,15" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/90 dark:fill-slate-950" />
            {/* Mặt phải */}
            <polygon points="0,4 22,-7 22,15 0,26" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-200/80 dark:fill-slate-800" />
            {/* Icon Cloud Line */}
            <g transform="translate(0, -7) scale(0.9)">
              <path
                d="M -5 3 L 5 3 C 6.5 3 7.5 2 7.5 0.5 C 7.5 -1 6.5 -2 5 -2 C 4.8 -2 4.5 -2 4.3 -1.8 C 4 -3.8 2 -5 0 -5 C -1.8 -5 -3.3 -4 -3.8 -2.3 C -4.2 -2.5 -4.6 -2.5 -5 -2.5 C -6.7 -2.5 -8 -1.2 -8 0.5 C -8 2 -6.7 3 -5 3 Z"
                stroke="#0284C7"
                strokeWidth="1.3"
                className="fill-white dark:fill-slate-900"
              />
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. KHỐI LẬP PHƯƠNG LƯỢNG TỬ ĐỈNH (TOP QUANTUM CUBE) - VỊ TRÍ CHUẨN XÁC     */}
        {/* ========================================================================= */}
        {/* Định vị tuyệt đối tại X=260, Y=115, TUYỆT ĐỐI KHÔNG DÙNG animateTransform đè vị trí! */}
        <g id="top-quantum-cube" transform="translate(260, 115)">
          
          {/* MẶT TRÊN KHỐI LẬP PHƯƠNG (Top Face - Sáng nhất) */}
          <polygon
            points="0,-48 46,-24 0,0 -46,-24"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-white/95 dark:fill-slate-900/95"
          />
          {/* MẶT TRÁI KHỐI LẬP PHƯƠNG (Left Face - Trung gian) */}
          <polygon
            points="-46,-24 0,0 0,48 -46,24"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-sky-50/95 dark:fill-slate-950/95"
          />
          {/* MẶT PHẢI KHỐI LẬP PHƯƠNG (Right Face - Tối hơn tạo khối) */}
          <polygon
            points="0,0 46,-24 46,24 0,48"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-sky-100/90 dark:fill-slate-800/90"
          />

          {/* Các đường gân kỹ thuật isometric bên trong mặt phẳng */}
          <line x1="0" y1="-24" x2="23" y2="-12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="0" y1="-24" x2="-23" y2="-12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="0" y1="24" x2="23" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="0" y1="24" x2="-23" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* KHỐI LẬP PHƯƠNG LỒNG NỘI TẠI (Inner Nested Tesseract Cube Line) */}
          <polygon
            points="0,-24 23,-12 0,0 -23,-12"
            stroke="#0284C7"
            strokeWidth="1.5"
            className="fill-sky-100/80 dark:fill-sky-900/80"
          />
          <polygon
            points="-23,-12 0,0 0,24 -23,12"
            stroke="#0284C7"
            strokeWidth="1.5"
            className="fill-sky-200/70 dark:fill-sky-950/70"
          />
          <polygon
            points="0,0 23,-12 23,12 0,24"
            stroke="#0284C7"
            strokeWidth="1.5"
            className="fill-sky-300/60 dark:fill-sky-800/60"
          />

          {/* Lõi tâm vi mạch số đồng tâm */}
          <circle cx="0" cy="0" r="9" stroke="#0284C7" strokeWidth="1.8" className="fill-white dark:fill-slate-900" />
          <circle cx="0" cy="0" r="4.5" stroke="#38BDF8" strokeWidth="1.2" className="fill-sky-50 dark:fill-sky-950" />
          <circle cx="0" cy="0" r="1.8" className="fill-[#0284C7]" />
        </g>
      </svg>
    </div>
  );
};
