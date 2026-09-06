import React, { useState } from 'react';
import { Target, TrendingUp, CheckCircle, Plus, AlertCircle, ChevronRight, Award, BarChart2 } from 'lucide-react';

interface KeyResult {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  period: string;
  progress: number;
  status: 'ON_TRACK' | 'AT_RISK' | 'BEHIND' | 'COMPLETED';
  type: 'COMPANY' | 'DEPARTMENT' | 'INDIVIDUAL';
  ownerName: string;
  keyResults: KeyResult[];
}

const DEMO_GOALS: Goal[] = [
  {
    id: 'goal-1',
    title: 'Hoàn thiện 100% Nguyên mẫu Module AI Sensor AVG-X',
    description: 'Nghiên cứu ứng dụng chip đo lường công nghiệp mới và thử nghiệm thành công',
    period: 'Q3-2026',
    progress: 80,
    status: 'ON_TRACK',
    type: 'COMPANY',
    ownerName: 'Nguyễn Văn Quản Lý (CEO)',
    keyResults: [
      { id: 'kr-1', title: 'Thử nghiệm thành công 50 Cảm biến trường', targetValue: 50, currentValue: 40, unit: 'Cảm biến' },
      { id: 'kr-2', title: 'Đạt chứng nhận an toàn công nghiệp', targetValue: 100, currentValue: 80, unit: '%' }
    ]
  },
  {
    id: 'goal-2',
    title: 'Số hóa 100% Quy trình Phê duyệt Đề xuất Nội bộ',
    description: 'Tối ưu thời gian duyệt đơn từ 2 ngày xuống còn dưới 2 giờ trên AVG Request',
    period: 'Q3-2026',
    progress: 90,
    status: 'ON_TRACK',
    type: 'DEPARTMENT',
    ownerName: 'Trần Thị Trưởng Phòng (HR)',
    keyResults: [
      { id: 'kr-3', title: 'Số Đề xuất xử lý thành công trên App', targetValue: 100, currentValue: 90, unit: 'Đề xuất' }
    ]
  },
  {
    id: 'goal-3',
    title: 'Đăng ký Sở hữu Trí tuệ Bản quyền Thương hiệu AVG One',
    description: 'Nộp hồ sơ bảo hộ nhãn hiệu tại Cục Sở hữu Trí tuệ Việt Nam',
    period: 'Q3-2026',
    progress: 50,
    status: 'AT_RISK',
    type: 'DEPARTMENT',
    ownerName: 'Phòng Pháp Lý (P.6)',
    keyResults: [
      { id: 'kr-4', title: 'Hoàn thành hồ sơ pháp lý & lệ phí', targetValue: 100, currentValue: 50, unit: '%' }
    ]
  }
];

export const GoalModule: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(DEMO_GOALS);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'COMPANY' | 'DEPARTMENT'>('ALL');

  const filteredGoals = goals.filter(g => selectedFilter === 'ALL' || g.type === selectedFilter);

  const getStatusBadge = (status: Goal['status']) => {
    switch (status) {
      case 'ON_TRACK':
        return <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Đúng Tiến Độ</span>;
      case 'AT_RISK':
        return <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[11px] font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Cần Chú Ý</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-[11px] font-bold border border-sky-200 dark:border-sky-800 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Hoàn Thành</span>;
      default:
        return null;
    }
  };

  return (
    <div className="goal-module-container w-full h-full flex-1 min-h-0 overflow-hidden bg-slate-50/60 dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans p-3 sm:p-4 relative flex flex-col justify-between">
      
      {/* 🌐 GRID LINES PATTERN BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:2.5rem_2.5rem] opacity-45 pointer-events-none -z-0" />

      {/* 🎨 AMBIENT GLOW ORBS */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#0284C7]/15 dark:bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />
      <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#F15A24]/15 dark:bg-[#F15A24]/20 rounded-full blur-[130px] pointer-events-none -z-0 animate-pulse duration-1000" />

      {/* MAIN CONTAINER CONTENT */}
      <div className="w-full h-full flex flex-col space-y-3.5 relative z-10 overflow-hidden">

        {/* 🔮 TOP BANNER EXECUTIVE DASHBOARD WITH SLOGAN BOX BADGE & BRUSH STROKE */}
        <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Slogan Badge Box */}
            <div className="space-y-2 text-left">
              <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="goal-slogan-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="35%" stopColor="#00A8E8" />
                      <stop offset="70%" stopColor="#FF7043" />
                      <stop offset="100%" stopColor="#F15A24" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="8"
                    ry="8"
                    fill="none"
                    stroke="url(#goal-slogan-border-gradient)"
                    strokeWidth="1.5"
                    className="animate-slogan-box-border"
                  />
                </svg>
                <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  <Target className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>AVG GOALS & OKR MANAGEMENT</span>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2 flex-wrap">
                  <span>QUẢN TRỊ</span>
                  <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#F15A24] to-amber-500">
                    <span className="relative z-10">MỤC TIÊU & KPIS</span>
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                    </svg>
                  </span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Cây mục tiêu chiến lược AVG — Liên kết Công ty, Phòng ban & Key Results
                </p>
              </div>
            </div>

            {/* Overall Progress Stat Box */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-2xl text-center shadow-2xs">
                <div className="text-2xl font-black text-[#F15A24]">73%</div>
                <div className="text-[10px] uppercase font-extrabold text-slate-500 dark:text-slate-400">Tiến độ Q3/2026</div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex-shrink-0 flex items-center justify-between bg-white/90 dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex gap-1">
            {[
              { id: 'ALL', label: 'Tất cả Mục tiêu' },
              { id: 'COMPANY', label: 'Mục tiêu Công ty' },
              { id: 'DEPARTMENT', label: 'Mục tiêu Phòng ban' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                  selectedFilter === tab.id
                    ? 'bg-[#F15A24] text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 font-semibold px-3">
            Hiển thị {filteredGoals.length} Mục tiêu chiến lược
          </span>
        </div>

        {/* Goals Cards List (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {filteredGoals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                    {goal.period}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {goal.type === 'COMPANY' ? 'Cấp Công ty' : 'Cấp Phòng ban'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {goal.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Chủ trì: <span className="font-semibold text-slate-700 dark:text-slate-200">{goal.ownerName}</span> — {goal.description}
                </p>
              </div>
              <div>{getStatusBadge(goal.status)}</div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Mức độ hoàn thành</span>
                <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">{goal.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            {/* Key Results Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-amber-500" /> Kết quả Then chốt (Key Results - KRs)
              </h4>
              {goal.keyResults.map((kr) => {
                const krPercent = Math.min(100, Math.round((kr.currentValue / kr.targetValue) * 100));
                return (
                  <div key={kr.id} className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{kr.title}</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold text-slate-600 dark:text-slate-300">
                      <span>{kr.currentValue} / {kr.targetValue} {kr.unit}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[11px]">
                        {krPercent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
