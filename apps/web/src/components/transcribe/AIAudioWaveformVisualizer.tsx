import React, { useEffect, useRef, useState } from 'react';
import { Activity, Zap, Radio, Volume2, ShieldCheck, Cpu } from 'lucide-react';

interface AIAudioWaveformVisualizerProps {
  isActive: boolean; // Đang thu âm hoặc phát âm thanh
  audioLevel?: number; // Mức âm lượng (0..100)
  className?: string;
  showAiDspInfo?: boolean;
}

export const AIAudioWaveformVisualizer: React.FC<AIAudioWaveformVisualizerProps> = ({
  isActive,
  audioLevel = 0,
  className = '',
  showAiDspInfo = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bars, setBars] = useState<number[]>(Array(32).fill(4));

  // Animation giả lập hoặc lấy dữ liệu phổ tần số AI
  useEffect(() => {
    let animId: number;
    let phase = 0;

    const render = () => {
      phase += 0.12;
      const numBars = 32;
      const newBars: number[] = [];

      for (let i = 0; i < numBars; i++) {
        if (isActive) {
          // Tạo hiệu ứng sóng âm kết hợp tần số đa hài bậc cao (multi-harmonic sine wave)
          const baseHeight = Math.sin(phase + i * 0.28) * 18 + Math.cos(phase * 1.5 + i * 0.15) * 12;
          const noise = (Math.random() - 0.5) * 10;
          const levelMultiplier = Math.max(0.3, (audioLevel || 40) / 70);
          const h = Math.max(4, Math.min(46, (baseHeight + 24 + noise) * levelMultiplier));
          newBars.push(h);
        } else {
          // Trạng thái chờ (Idle breathing wave)
          const idleH = Math.sin(phase * 0.5 + i * 0.3) * 3 + 4;
          newBars.push(Math.max(2, idleH));
        }
      }

      setBars(newBars);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isActive, audioLevel]);

  return (
    <div className={`flex flex-col bg-slate-900/90 border border-cyan-500/30 rounded-xl p-2.5 backdrop-blur-md shadow-lg ${className}`}>
      
      {/* Waveform Bars Container */}
      <div className="relative h-12 w-full flex items-center justify-between gap-0.5 sm:gap-1 px-1 overflow-hidden">
        {/* Cyber Grid Lines Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:0.75rem_0.75rem] pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20 pointer-events-none" />

        {bars.map((height, idx) => {
          // Gradient màu từ Cyan sang Emerald và Orange ở đỉnh phổ
          const isHigh = height > 34;
          const isMid = height > 20;
          const barColor = isHigh
            ? 'from-amber-400 to-[#F15A24]'
            : isMid
            ? 'from-cyan-400 to-[#00A8E8]'
            : 'from-emerald-400 to-teal-500';

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-center h-full"
            >
              <div
                style={{ height: `${height}px` }}
                className={`w-full max-w-[5px] rounded-full bg-gradient-to-t ${barColor} transition-all duration-75 shadow-xs ${
                  isActive ? 'opacity-95 drop-shadow-[0_0_4px_rgba(0,240,255,0.7)]' : 'opacity-35'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* AI DSP Indicators */}
      {showAiDspInfo && (
        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
            <span className={isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
              {isActive ? 'AI BEAMFORMING ACTIVE' : 'AI STANDBY'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300">
              NOISE: -24dB
            </span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
              48kHz • 16-BIT
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
