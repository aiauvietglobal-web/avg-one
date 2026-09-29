import React from 'react';

/**
 * 🌐 TECH 3D ARCHITECTURAL PLATFORM CUBES (AVG ONE 3D DEPTH ISOMETRIC - LEFT SIDE)
 * 
 * Bố cục phân tầng không gian 3D có chiều sâu kiến trúc (Layered 3D Depth Composition):
 * - Tầng 1 (Đế móng - Foundation Base Slab): Bệ khối 3D dày dặn, vững chãi ("Một nền tảng Vững chắc!").
 * - Tầng 2 (Các khối Module kết nối - Modular Service Blocks): 3 khối hộp chức năng (Shield, Cloud, Analytics) gối lên bệ.
 * - Tầng 3 (Lõi Lập Phương Lượng Tử - Central Quantum AI Cube): Khối lập phương 3D nổi bật ở đỉnh với các trục liên kết dữ liệu dọc.
 * - Chiều sâu phối cảnh 3D sắc nét nhờ phân cấp sáng/tối 3 mặt phẳng và nét line phân lớp (Không dùng shadow mờ).
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
        {/* TẦNG 1: BỆ ĐẾ MÓNG KHỐI HỘP 3D DÀY DẶN (THICK FOUNDATION SLAB)             */}
        {/* ========================================================================= */}
        <g id="layer-1-foundation-slab">
          {/* Mặt đáy trước-trái của bệ móng */}
          <polygon
            points="140,265 260,325 260,350 140,290"
            stroke="#0284C7"
            strokeWidth="1.8"
            className="fill-sky-100/90 dark:fill-slate-900/95"
          />
          {/* Mặt đáy trước-phải của bệ móng */}
          <polygon
            points="260,325 380,265 380,290 260,350"
            stroke="#0284C7"
            strokeWidth="1.8"
            className="fill-sky-200/80 dark:fill-slate-800/90"
          />
          {/* Mặt trên bệ móng (Top Face of Foundation) */}
          <polygon
            points="260,205 380,265 260,325 140,265"
            stroke="#0284C7"
            strokeWidth="2.2"
            className="fill-white/95 dark:fill-slate-950/95"
          />

          {/* Đường gân cấu trúc bên trong mặt bệ (Structural Grid Inset) */}
          <polygon
            points="260,218 362,265 260,312 158,265"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            fill="none"
            className="opacity-70"
          />

          {/* Khe rãnh công nghệ trung tâm (Center Docking Channel) */}
          <polygon
            points="260,240 310,265 260,290 210,265"
            stroke="#0284C7"
            strokeWidth="1.4"
            className="fill-sky-50 dark:fill-slate-900"
          />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 2: CÁC KHỐI MODULE CHỨC NĂNG GẮN KẾT VÀO BỆ (MODULAR SERVICE BLOCKS)   */}
        {/* ========================================================================= */}
        <g id="layer-2-modular-blocks">
          
          {/* ------------------------------------------------------------- */}
          {/* MODULE 1 (TRÁI): BẢO MẬT & AN NINH MẠNG (SECURITY SHIELD)     */}
          {/* ------------------------------------------------------------- */}
          <g id="block-shield" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
            {/* Khối hộp 3D đặt gối trên mép trái bệ móng */}
            <g transform="translate(180, 240)">
              {/* Mặt trên */}
              <polygon points="0,-22 26,-9 0,4 -26,-9" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Mặt trái */}
              <polygon points="-26,-9 0,4 0,30 -26,17" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/90 dark:fill-slate-950" />
              {/* Mặt phải */}
              <polygon points="0,4 26,-9 26,17 0,30" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-200/80 dark:fill-slate-800" />
              {/* Icon Shield dạng Line */}
              <g transform="translate(0, -9) scale(0.95)">
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

          {/* ------------------------------------------------------------- */}
          {/* MODULE 2 (PHẢI): ĐÁM MÂY DỮ LIỆU (CLOUD ARCHITECTURE)         */}
          {/* ------------------------------------------------------------- */}
          <g id="block-cloud" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
            {/* Khối hộp 3D đặt gối trên mép phải bệ móng */}
            <g transform="translate(340, 240)">
              {/* Mặt trên */}
              <polygon points="0,-22 26,-9 0,4 -26,-9" stroke="#0284C7" strokeWidth="1.6" className="fill-white dark:fill-slate-900" />
              {/* Mặt trái */}
              <polygon points="-26,-9 0,4 0,30 -26,17" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-100/90 dark:fill-slate-950" />
              {/* Mặt phải */}
              <polygon points="0,4 26,-9 26,17 0,30" stroke="#0284C7" strokeWidth="1.6" className="fill-sky-200/80 dark:fill-slate-800" />
              {/* Icon Cloud dạng Line */}
              <g transform="translate(0, -9) scale(0.95)">
                <path
                  d="M -5 3 L 5 3 C 6.5 3 7.5 2 7.5 0.5 C 7.5 -1 6.5 -2 5 -2 C 4.8 -2 4.5 -2 4.3 -1.8 C 4 -3.8 2 -5 0 -5 C -1.8 -5 -3.3 -4 -3.8 -2.3 C -4.2 -2.5 -4.6 -2.5 -5 -2.5 C -6.7 -2.5 -8 -1.2 -8 0.5 C -8 2 -6.7 3 -5 3 Z"
                  stroke="#0284C7"
                  strokeWidth="1.3"
                  className="fill-white dark:fill-slate-900"
                />
              </g>
            </g>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* MODULE 3 (TRƯỚC): PHÂN TÍCH DỮ LIỆU THÔNG MINH (ANALYTICS)   */}
          {/* ------------------------------------------------------------- */}
          <g id="block-analytics" className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
            {/* Khối hộp bậc thang phía trước bệ móng */}
            <g transform="translate(260, 280)">
              <polygon points="0,-18 22,-7 0,4 -22,-7" stroke="#0284C7" strokeWidth="1.5" className="fill-white dark:fill-slate-900" />
              <polygon points="-22,-7 0,4 0,24 -22,13" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-100/90 dark:fill-slate-950" />
              <polygon points="0,4 22,-7 22,13 0,24" stroke="#0284C7" strokeWidth="1.5" className="fill-sky-200/80 dark:fill-slate-800" />
              {/* Icon Chart Line */}
              <g transform="translate(0, -7) scale(0.9)">
                <rect x="-5" y="-1" width="2.2" height="6" rx="0.5" stroke="#0284C7" strokeWidth="1" className="fill-white dark:fill-slate-900" />
                <rect x="-1" y="-4" width="2.2" height="9" rx="0.5" stroke="#0284C7" strokeWidth="1" className="fill-sky-100 dark:fill-sky-900" />
                <rect x="3" y="-7" width="2.2" height="12" rx="0.5" stroke="#0284C7" strokeWidth="1" className="fill-sky-200 dark:fill-sky-800" />
                <path d="M -6 -2 L -1 -5 L 4 -8" stroke="#38BDF8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TRỤ DẪN DỮ LIỆU ĐỨNG (VERTICAL DATA TRANSMISSION PILLARS)                 */}
        {/* ========================================================================= */}
        <g id="data-vertical-pillars" stroke="#0284C7" strokeWidth="1.5" className="opacity-75 dark:opacity-60">
          {/* Trục chính giữa từ bệ móng lên đáy khối lập phương */}
          <line x1="260" y1="240" x2="260" y2="175" strokeDasharray="4 3" />
          <line x1="210" y1="215" x2="225" y2="155" strokeDasharray="3 3" />
          <line x1="310" y1="215" x2="295" y2="155" strokeDasharray="3 3" />
        </g>

        {/* ========================================================================= */}
        {/* TẦNG 3: LÕI LẬP PHƯƠNG LƯỢNG TỬ TRUNG TÂM (CENTRAL QUANTUM AI CUBE)       */}
        {/* ========================================================================= */}
        <g id="layer-3-quantum-cube">
          {/* Đặt ở vị trí trung tâm hoàn hảo: X=260, Y=115 (Không bao giờ bị tràn đỉnh!) */}
          <g transform="translate(260, 115)">
            
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

            {/* Các đường vân kỹ thuật isometric bên trong mặt phẳng */}
            <line x1="0" y1="-24" x2="23" y2="-12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="-24" x2="-23" y2="-12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="24" x2="23" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="24" x2="-23" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* KHỐI LẬP PHƯƠNG CON LỒNG BÊN TRONG (Inner Nested Tesseract Cube) */}
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

            {/* Hoạt họa bồng bềnh êm ái */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,-4; 0,4; 0,-4"
              dur="4s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* 2 Khối hộp vệ tinh nhỏ cân bằng không gian ở tầng cao (Upper Satellite Pods) */}
        <g id="upper-satellites" transform="translate(0, -5)">
          {/* Vệ tinh trên-trái: CPU Core */}
          <g transform="translate(140, 100) scale(0.75)" className="opacity-85">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#0284C7" strokeWidth="1.4" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-100 dark:fill-slate-800" />
            <line x1="20" y1="2" x2="65" y2="20" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" />
          </g>

          {/* Vệ tinh trên-phải: Global IoT */}
          <g transform="translate(380, 100) scale(0.75)" className="opacity-85">
            <polygon points="0,-18 20,-8 0,2 -20,-8" stroke="#0284C7" strokeWidth="1.4" className="fill-white dark:fill-slate-900" />
            <polygon points="-20,-8 0,2 0,22 -20,12" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-50 dark:fill-slate-950" />
            <polygon points="0,2 20,-8 20,12 0,22" stroke="#0284C7" strokeWidth="1.4" className="fill-sky-100 dark:fill-slate-800" />
            <line x1="-20" y1="2" x2="-65" y2="20" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-50" />
          </g>
        </g>
      </svg>
    </div>
  );
};
