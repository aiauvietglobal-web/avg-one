import React from 'react';
import { Workflow, CheckCircle2 } from 'lucide-react';

/**
 * ⚙️ ENTERPRISE PRO SUITE: KINETIC WORKFLOW ENGINE (RIGHT HERO MODULE)
 * 
 * Thiết kế Chuẩn Mực Doanh Nghiệp Cao Cấp (Apple Pro / Linear Enterprise Standard):
 * - Đồng bộ tuyệt đối 100% với Cửa sổ AI Neural Stream bên trái: Cùng kích thước, cùng khung vỏ kính mờ, cùng tiêu đề hệ thống.
 * - Thanh tiêu đề cửa sổ hệ điều hành: Window traffic lights, Module ID: AVG-ONE // KINETIC.OPS, Status: 60FPS SYNC.
 * - Cỗ máy 3 Bánh răng vi cơ khí 3D vận hành êm ái 60fps trên nền khoang máy sâu thẳm, đổ bóng sắc nét.
 * - Thông tin phụ đề chuẩn Enterprise: Vận Hành & Tự Động Hóa • 20 Nhân Sự Lõi • Tác Chiến Độc Lập.
 */

interface TechHologramGearEcosystemProps {
  className?: string;
}

export const TechHologramGearEcosystem: React.FC<TechHologramGearEcosystemProps> = ({ className = '' }) => {
  // SVG Path cho bánh răng vi cơ khí 12 răng chuẩn kỹ thuật (Pitch R = 32, Outer R = 36.5, Root R = 28, Hole R = 14)
  const proGearPath = 
    "M 28.00 0.00 L 27.81 3.22 L 35.40 6.56 L 33.94 12.02 L 25.70 11.12 " +
    "L 24.25 14.00 L 22.48 16.60 L 27.38 23.38 L 23.38 27.38 L 16.60 22.48 " +
    "L 14.00 24.25 L 11.12 25.70 L 12.02 33.94 L 6.56 35.40 L 3.22 27.81 " +
    "L 0.00 28.00 L -3.22 27.81 L -6.56 35.40 L -12.02 33.94 L -11.12 25.70 " +
    "L -14.00 24.25 L -16.60 22.48 L -23.38 27.38 L -27.38 23.38 L -22.48 16.60 " +
    "L -24.25 14.00 L -25.70 11.12 L -33.94 12.02 L -35.40 6.56 L -27.81 3.22 " +
    "L -28.00 0.00 L -27.81 -3.22 L -35.40 -6.56 L -33.94 -12.02 L -25.70 -11.12 " +
    "L -24.25 -14.00 L -22.48 -16.60 L -27.38 -23.38 L -23.38 -27.38 L -16.60 -22.48 " +
    "L -14.00 -24.25 L -11.12 -25.70 L -12.02 -33.94 L -6.56 -35.40 L -3.22 -27.81 " +
    "L -0.00 -28.00 L 3.22 -27.81 L 6.56 -35.40 L 12.02 -33.94 L 11.12 -25.70 " +
    "L 14.00 -24.25 L 16.60 -22.48 L 23.38 -27.38 L 27.38 -23.38 L 22.48 -16.60 " +
    "L 24.25 -14.00 L 25.70 -11.12 L 33.94 -12.02 L 35.40 -6.56 L 27.81 -3.22 Z " +
    "M 14 0 A 14 14 0 1 0 -14 0 A 14 14 0 1 0 14 0 Z";

  return (
    <div className={`relative select-none ${className}`}>
      {/* KHUNG CỬA SỔ ENTERPRISE PRO VIEWPORT */}
      <div className="relative w-full aspect-[16/10.5] max-h-[235px] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.15),0_0_0_1px_rgba(255,255,255,0.8)_inset] overflow-hidden flex flex-col group/viewport transition-all duration-300">
        
        {/* ========================================================================= */}
        {/* THANH TIÊU ĐỀ HỆ ĐIỀU HÀNH CHUYÊN NGHIỆP (PRO WINDOW HEADER)             */}
        {/* ========================================================================= */}
        <div className="h-7.5 px-3 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 dark:bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 dark:bg-emerald-500/60" />
            <span className="ml-2 font-mono text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              AVG-ONE // KINETIC.OPS
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-[8.5px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
              60FPS SYNC
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MÀN HÌNH CHÍNH HIỂN THỊ CỖ MÁY ĐỘNG LỰC HỌC                               */}
        {/* ========================================================================= */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          
          <svg
            viewBox="0 0 360 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-contain"
          >
            <defs>
              {/* Nền khoang máy sâu thẳm */}
              <radialGradient id="pro-engine-bg" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0B2A4A" />
                <stop offset="50%" stopColor="#051529" />
                <stop offset="100%" stopColor="#020813" />
              </radialGradient>

              {/* Hào quang trung tâm */}
              <radialGradient id="pro-engine-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#0284C7" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
              </radialGradient>

              {/* Bánh răng Vàng Hổ Phách */}
              <linearGradient id="pro-gear-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#FEF08A" />
                <stop offset="55%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#9A3412" />
              </linearGradient>

              {/* Bánh răng Lam Ngọc & Bạch Kim */}
              <linearGradient id="pro-gear-sapphire" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#E0F2FE" />
                <stop offset="55%" stopColor="#38BDF8" />
                <stop offset="85%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              {/* Viền vát kim cương phản quang ánh sáng trắng */}
              <linearGradient id="pro-gear-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
              </linearGradient>

              {/* Chân kính Ruby đính tâm */}
              <radialGradient id="pro-ruby-jewel" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FECDD3" />
                <stop offset="40%" stopColor="#F43F5E" />
                <stop offset="80%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#4C0519" />
              </radialGradient>

              <filter id="pro-gear-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.6" />
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.3" />
              </filter>
            </defs>

            <style>{`
              @keyframes pro-gear-float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-4px); }
              }
              .anim-pro-gears { animation: pro-gear-float 5s ease-in-out infinite; }
            `}</style>

            {/* Nền khoang máy & Lưới tọa độ kỹ thuật */}
            <rect width="360" height="210" fill="url(#pro-engine-bg)" />
            
            <g opacity="0.18">
              <line x1="0" y1="52" x2="360" y2="52" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="105" x2="360" y2="105" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="158" x2="360" y2="158" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="90" y1="0" x2="90" y2="210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="180" y1="0" x2="180" y2="210" stroke="#38BDF8" strokeWidth="0.8" />
              <line x1="270" y1="0" x2="270" y2="210" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
            </g>

            {/* Hào quang trung tâm */}
            <circle cx="180" cy="100" r="75" fill="url(#pro-engine-glow)" />

            {/* CỤM 3 BÁNH RĂNG VI CƠ KHÍ XOAY CHÍNH XÁC */}
            <g className="anim-pro-gears" filter="url(#pro-gear-shadow)">
              
              {/* Vòng đai quỹ đạo */}
              <ellipse
                cx="180"
                cy="100"
                rx="82"
                ry="32"
                stroke="#0284C7"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="35 12 18 12"
                opacity="0.5"
                transform="rotate(-15, 180, 100)"
              />

              {/* BÁNH RĂNG 1: TRÊN ĐỈNH (180, 70) */}
              <g transform="translate(180, 70)">
                <g>
                  <g transform="translate(0, 3)">
                    <path d={proGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
                  </g>
                  <path d={proGearPath} fill="url(#pro-gear-amber)" stroke="#F59E0B" strokeWidth="0.9" fillRule="evenodd" />
                  <circle cx="0" cy="0" r="21.5" stroke="url(#pro-gear-edge)" strokeWidth="1" fill="none" />
                  <circle cx="0" cy="0" r="20" stroke="#7C2D12" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />
                  
                  <line x1="-14" y1="0" x2="-21" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="14" y1="0" x2="21" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="-14" x2="0" y2="-21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="14" x2="0" y2="21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

                  <circle cx="0" cy="0" r="6" fill="#451A03" stroke="#F59E0B" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="4.2" fill="url(#pro-ruby-jewel)" stroke="#FFFFFF" strokeWidth="0.7" />
                  <circle cx="-1.3" cy="-1.3" r="1.1" fill="#FFFFFF" opacity="0.95" />

                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
                </g>
              </g>

              {/* BÁNH RĂNG 2: DƯỚI TRÁI (135, 115) */}
              <g transform="translate(135, 115)">
                <g>
                  <g transform="translate(0, 3)">
                    <path d={proGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
                  </g>
                  <path d={proGearPath} fill="url(#pro-gear-sapphire)" stroke="#0284C7" strokeWidth="0.9" fillRule="evenodd" />
                  <circle cx="0" cy="0" r="21.5" stroke="url(#pro-gear-edge)" strokeWidth="1" fill="none" />
                  <circle cx="0" cy="0" r="20" stroke="#0F172A" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

                  <line x1="-14" y1="0" x2="-21" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="14" y1="0" x2="21" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="-14" x2="0" y2="-21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="14" x2="0" y2="21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

                  <circle cx="0" cy="0" r="6" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="4.2" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.7" />
                  <circle cx="-1.3" cy="-1.3" r="1.1" fill="#FFFFFF" opacity="0.95" />

                  <animateTransform attributeName="transform" type="rotate" from="-15 0 0" to="-375 0 0" dur="15s" repeatCount="indefinite" />
                </g>
              </g>

              {/* BÁNH RĂNG 3: DƯỚI PHẢI (225, 115) */}
              <g transform="translate(225, 115)">
                <g>
                  <g transform="translate(0, 3)">
                    <path d={proGearPath} fill="#050B14" fillRule="evenodd" opacity="0.9" />
                  </g>
                  <path d={proGearPath} fill="url(#pro-gear-sapphire)" stroke="#0284C7" strokeWidth="0.9" fillRule="evenodd" />
                  <circle cx="0" cy="0" r="21.5" stroke="url(#pro-gear-edge)" strokeWidth="1" fill="none" />
                  <circle cx="0" cy="0" r="20" stroke="#0F172A" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" opacity="0.6" />

                  <line x1="-14" y1="0" x2="-21" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="14" y1="0" x2="21" y2="0" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="-14" x2="0" y2="-21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  <line x1="0" y1="14" x2="0" y2="21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

                  <circle cx="0" cy="0" r="6" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="4.2" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.7" />
                  <circle cx="-1.3" cy="-1.3" r="1.1" fill="#FFFFFF" opacity="0.95" />

                  <animateTransform attributeName="transform" type="rotate" from="15 0 0" to="-345 0 0" dur="15s" repeatCount="indefinite" />
                </g>
              </g>
            </g>
          </svg>

          {/* Lớp phủ chuyển sắc mềm mại ở đáy để hiển thị nhãn phụ đề thanh lịch */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20 pointer-events-none z-10" />

          {/* ========================================================================= */}
          {/* THÔNG TIN CHUYÊN NGHIỆP Ở ĐÁY CỬA SỔ (ENTERPRISE FOOTER OVERLAY)          */}
          {/* ========================================================================= */}
          <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between z-20 pointer-events-none">
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-white text-[11px] font-bold tracking-tight">
                <Workflow size={12} className="text-amber-400" />
                <span>Vận Hành & Tự Động Hóa</span>
              </div>
              <div className="text-[9px] font-medium text-slate-300 dark:text-slate-400">
                20 Nhân sự lõi • Hiệp đồng tác chiến
              </div>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[8.5px] font-mono text-emerald-400">
              <CheckCircle2 size={10} className="text-emerald-400" />
              <span>99.9% UPTIME</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
