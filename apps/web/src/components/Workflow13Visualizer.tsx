import React from 'react';
import { WORKFLOW_13_STEPS, HUB_MAP, HubKey } from '../services/workflow13';
import { TaskItem } from '../services/api';
import { ChevronRight, ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Props {
  orders: TaskItem[];
  selectedStep: number | null;
  onSelectStep: (stepNumber: number | null) => void;
  onAdvanceOrderStep?: (orderId: string, currentStep: number) => void;
}

export const Workflow13Visualizer: React.FC<Props> = ({
  orders,
  selectedStep,
  onSelectStep,
}) => {
  // Count orders at each step
  const getOrdersCountAtStep = (stepNumber: number) => {
    return orders.filter(o => (o as any).currentStep === stepNumber || (!((o as any).currentStep) && stepNumber === 1)).length;
  };

  return (
    <div style={{
      backgroundColor: '#111827',
      borderRadius: 16,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: 20,
      marginBottom: 24,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.3rem' }}>🌐</span> CHUỖI 13 BƯỚC VIỆC LIÊN THÔNG CÁC ĐẦU MỐI
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>
            Sơ đồ luồng tiến độ tự động kết nối và chuyển giao giữa 8 Đầu Mối chuyên biệt
          </p>
        </div>

        {selectedStep !== null && (
          <button
            onClick={() => onSelectStep(null)}
            style={{
              padding: '6px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            <span>Hiển thị tất cả 13 bước</span>
          </button>
        )}
      </div>

      {/* Horizontal Step Process Timeline (Interactive scroll) */}
      <div style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        paddingBottom: 12,
        scrollbarWidth: 'thin'
      }}>
        {WORKFLOW_13_STEPS.map((step) => {
          const count = getOrdersCountAtStep(step.stepNumber);
          const isSelected = selectedStep === step.stepNumber;
          const hubInfo = HUB_MAP[step.defaultHub as HubKey] || HUB_MAP.ALL;

          return (
            <div
              key={step.stepNumber}
              onClick={() => onSelectStep(isSelected ? null : step.stepNumber)}
              style={{
                minWidth: 190,
                maxWidth: 210,
                flexShrink: 0,
                padding: 12,
                borderRadius: 12,
                backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Step badge & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: 12,
                    backgroundColor: isSelected ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                    color: isSelected ? '#000' : '#cbd5e1'
                  }}>
                    Bước {step.stepNumber}/13
                  </span>
                  <span style={{ fontSize: '1.2rem' }}>{step.icon}</span>
                </div>

                {/* Step Name */}
                <div style={{
                  fontSize: '0.82rem', fontWeight: 700, color: isSelected ? '#38bdf8' : '#ffffff',
                  marginBottom: 6, lineHeight: 1.35, height: 38, overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {step.name.replace(`Bước ${step.stepNumber}: `, '')}
                </div>

                {/* Responsible Hub Tag */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontWeight: 700,
                  color: '#94a3b8', backgroundColor: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: 6,
                  marginBottom: 8
                }}>
                  <span>{hubInfo.icon}</span>
                  <span>{hubInfo.shortName}</span>
                </div>
              </div>

              {/* Step Footer: Active Orders Counter */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Đang ở bước này:</span>
                <span style={{
                  fontSize: '0.82rem', fontWeight: 900,
                  color: count > 0 ? '#ff7043' : '#64748b',
                  backgroundColor: count > 0 ? 'rgba(255, 112, 67, 0.15)' : 'transparent',
                  padding: '2px 8px', borderRadius: 10
                }}>
                  {count} đơn
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
