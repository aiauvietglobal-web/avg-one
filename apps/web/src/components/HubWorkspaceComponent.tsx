import React, { useState } from 'react';
import { TaskItem, User } from '../services/api';
import { HUB_MAP, WORKFLOW_13_STEPS, HubKey } from '../services/workflow13';
import {
  FileText, CheckCircle2, Clock, ArrowRight, Plus, ExternalLink,
  Paperclip, RefreshCw, Send, AlertTriangle, ShieldCheck, UserCheck,
  Building2, Layers, Filter, Search, Check, ChevronRight, Share2, Zap
} from 'lucide-react';

interface Props {
  hubKey: HubKey;
  orders: TaskItem[];
  users: User[];
  onCreateOrderClick: () => void;
  onTransferOrderClick: (order: TaskItem) => void;
  onUpdateOrderStatus: (orderId: string, status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE') => void;
  onDeleteOrder: (orderId: string) => void;
  onAdvanceStep: (order: TaskItem) => void;
  onUpdateDocumentUrl: (orderId: string, currentUrl?: string) => void;
}

export const HubWorkspaceComponent: React.FC<Props> = ({
  hubKey,
  orders,
  users,
  onCreateOrderClick,
  onTransferOrderClick,
  onUpdateOrderStatus,
  onDeleteOrder,
  onAdvanceStep,
  onUpdateDocumentUrl
}) => {
  const [workspaceTab, setWorkspaceTab] = useState<'kanban' | 'steps' | 'log'>('kanban');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const hubMeta = HUB_MAP[hubKey] || HUB_MAP.ALL;

  // Filter orders assigned to this Hub (or all if hubKey === 'ALL')
  const hubOrders = orders.filter(order => {
    const matchesHub = hubKey === 'ALL' || order.department === hubKey || order.department?.includes(hubKey);
    const matchesSearch = !searchTerm || 
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (order.orderCode && order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'ALL' || order.orderStatus === typeFilter;
    return matchesHub && matchesSearch && matchesType;
  });

  // Categorize by Kanban Status
  const todoOrders = hubOrders.filter(o => o.status === 'TODO');
  const inProgressOrders = hubOrders.filter(o => o.status === 'IN_PROGRESS');
  const reviewOrders = hubOrders.filter(o => o.status === 'REVIEW');
  const doneOrders = hubOrders.filter(o => o.status === 'DONE');

  const getStepInfo = (stepNum?: number) => {
    const num = stepNum || 1;
    return WORKFLOW_13_STEPS.find(s => s.stepNumber === num) || WORKFLOW_13_STEPS[0];
  };

  const getOrderStatusBadge = (type?: string) => {
    switch (type) {
      case 'TRỌNG ĐIỂM':
        return { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.4)', label: '🔥 TRỌNG ĐIỂM' };
      case 'KHẨN CẤP':
        return { bg: 'rgba(249, 115, 22, 0.2)', text: '#f97316', border: 'rgba(249, 115, 22, 0.4)', label: '⚡ KHẨN CẤP' };
      case 'TỒN':
        return { bg: 'rgba(168, 85, 247, 0.2)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.4)', label: '📦 TỒN' };
      case 'TIỂU DỰ ÁN':
        return { bg: 'rgba(56, 189, 248, 0.2)', text: '#38bdf8', border: 'rgba(56, 189, 248, 0.4)', label: '💎 TIỂU DỰ ÁN' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.2)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.4)', label: '🔹 THƯỜNG XUYÊN' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. WORKSPACE HEADER / BANNER */}
      <div style={{
        padding: 24,
        borderRadius: 20,
        backgroundColor: '#0f172a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              backgroundColor: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
            }}>
              {hubMeta.icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {hubMeta.name}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${hubMeta.badgeBg} border`}>
                  {hubMeta.code}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: 4, maxWidth: 720, lineHeight: 1.4 }}>
                {hubMeta.description}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={onCreateOrderClick}
              style={{
                padding: '10px 18px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #ff5722, #ea580c)', color: '#fff', border: 'none',
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 87, 34, 0.4)'
              }}
            >
              <Plus style={{ width: 16, height: 16 }} /> + Đơn Hàng Mới Cho Đầu Mối
            </button>
          </div>
        </div>

        {/* Hub Info Bar & Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
          paddingTop: 16,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Metric 1 */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>CÁN BỘ CHỦ TRÌ</div>
            <div style={{ fontSize: '0.92rem', color: '#38bdf8', fontWeight: 800, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <UserCheck style={{ width: 16, height: 16 }} /> {hubMeta.leader}
            </div>
          </div>

          {/* Metric 2 */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>TỔNG ĐƠN HÀNG TẠI ĐẦU MỐI</div>
            <div style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 900, marginTop: 2 }}>
              {hubOrders.length} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>đơn hàng</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>ĐANG XỬ LÝ (IN PROGRESS)</div>
            <div style={{ fontSize: '1.2rem', color: '#f59e0b', fontWeight: 900, marginTop: 2 }}>
              {inProgressOrders.length} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>đơn</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>VAI TRÒ TRONG 13 BƯỚC</div>
            <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700, marginTop: 4 }}>
              {hubMeta.roleIn13Steps}
            </div>
          </div>
        </div>
      </div>

      {/* KHUNG THÔNG TIN CÁC ĐẦU MỐI TĂNG CƯỜNG (0, 8, 9) */}
      {(hubKey === 'ALL' || hubKey === 'HUB_0' || hubKey === 'HUB_8' || hubKey === 'HUB_9') && (
        <div style={{
          backgroundColor: '#0b1120',
          borderRadius: 18,
          padding: 20,
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.02em' }}>
              <span style={{ padding: '4px 10px', borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.78rem', fontWeight: 900 }}>
                ⚡ CHỈ ĐẠO ĐẶC BIỆT
              </span>
              TĂNG CƯỜNG (ĐẦU MỐI 0 • ĐẦU MỐI 8 • ĐẦU MỐI 9)
            </div>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>
              3 Đầu mối hỗ trợ tháo gỡ điểm nghẽn & chuẩn hóa toàn hệ thống
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {/* ĐẦU MỐI 0 */}
            <div style={{
              backgroundColor: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck style={{ width: 18, height: 18, color: '#38bdf8' }} /> ĐẦU MỐI 0
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: 6, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  BẢO MẬT & NỀN TẢNG
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                Phụ trách về vấn đề bảo mật và phát triển công cụ nền tảng.
              </p>
            </div>

            {/* ĐẦU MỐI 8 */}
            <div style={{
              backgroundColor: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Zap style={{ width: 18, height: 18, color: '#38bdf8' }} /> ĐẦU MỐI 8
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: 6, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  THÔNG TẮC NGHẼN & THƯƠNG NGOẠI
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                Phụ trách về vấn đề thông những cái tắc nghẽn trong hệ thống và giao thoa với phần thương ngoại, kết nối từ trong ra ngoài.
              </p>
            </div>

            {/* ĐẦU MỐI 9 */}
            <div style={{
              backgroundColor: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Layers style={{ width: 18, height: 18, color: '#38bdf8' }} /> ĐẦU MỐI 9
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: 6, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  TỔNG THỂ & HỒ SƠ NĂNG LỰC
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                Phụ trách về tổng thể, hồ sơ năng lực từ tổng thể đến chi tiết.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOOLBAR & SUB-TABS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, backgroundColor: 'rgba(0,0,0,0.4)', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setWorkspaceTab('kanban')}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700, border: 'none', cursor: 'pointer',
              backgroundColor: workspaceTab === 'kanban' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: workspaceTab === 'kanban' ? '#38bdf8' : '#94a3b8'
            }}
          >
            📋 Bảng Kanban Đơn Hàng ({hubOrders.length})
          </button>
          <button
            onClick={() => setWorkspaceTab('steps')}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700, border: 'none', cursor: 'pointer',
              backgroundColor: workspaceTab === 'steps' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: workspaceTab === 'steps' ? '#38bdf8' : '#94a3b8'
            }}
          >
            🔗 Ma Trận 13 Bước Tiến Độ
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', width: 220 }}>
            <Search style={{ width: 14, height: 14, position: 'absolute', left: 12, top: 10, color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Tìm mã / tên đơn hàng..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 12px 7px 32px',
                fontSize: '0.8rem', outline: 'none'
              }}
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 12px',
              fontSize: '0.8rem', outline: 'none'
            }}
          >
            <option value="ALL">Tất cả loại đơn hàng</option>
            <option value="TRỌNG ĐIỂM">🔥 Trọng điểm</option>
            <option value="KHẨN CẤP">⚡ Khẩn cấp</option>
            <option value="THƯỜNG XUYÊN">🔹 Thường xuyên</option>
            <option value="TỒN">📦 Tồn</option>
            <option value="TIỂU DỰ ÁN">💎 Tiểu dự án</option>
          </select>
        </div>
      </div>

      {/* 3. WORKSPACE MAIN CONTENT VIEWS */}
      {workspaceTab === 'kanban' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'start' }}>
          {/* Column: TODO */}
          <div style={{ backgroundColor: '#111827', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock style={{ width: 14, height: 14 }} /> CHỜ XỬ LÝ (TODO)
              </span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800 }}>
                {todoOrders.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {todoOrders.map(order => renderOrderCard(order))}
              {todoOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: 24, color: '#64748b', fontSize: '0.78rem' }}>Chưa có đơn hàng nào chờ xử lý</div>
              )}
            </div>
          </div>

          {/* Column: IN_PROGRESS */}
          <div style={{ backgroundColor: '#111827', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6 }}>
                <RefreshCw style={{ width: 14, height: 14 }} /> ĐANG THỰC HIỆN (IN PROGRESS)
              </span>
              <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800 }}>
                {inProgressOrders.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {inProgressOrders.map(order => renderOrderCard(order))}
              {inProgressOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: 24, color: '#64748b', fontSize: '0.78rem' }}>Không có đơn hàng đang thực hiện</div>
              )}
            </div>
          </div>

          {/* Column: REVIEW */}
          <div style={{ backgroundColor: '#111827', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck style={{ width: 14, height: 14 }} /> RÀ SOÁT / QA QC (REVIEW)
              </span>
              <span style={{ backgroundColor: 'rgba(192, 132, 252, 0.2)', color: '#c084fc', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800 }}>
                {reviewOrders.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {reviewOrders.map(order => renderOrderCard(order))}
              {reviewOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: 24, color: '#64748b', fontSize: '0.78rem' }}>Không có đơn hàng đang rà soát</div>
              )}
            </div>
          </div>

          {/* Column: DONE */}
          <div style={{ backgroundColor: '#111827', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 style={{ width: 14, height: 14 }} /> HOÀN THÀNH (DONE)
              </span>
              <span style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800 }}>
                {doneOrders.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {doneOrders.map(order => renderOrderCard(order))}
              {doneOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: 24, color: '#64748b', fontSize: '0.78rem' }}>Chưa có đơn hàng nào hoàn thành</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. WORKSPACE STEPS MATRIX VIEW */}
      {workspaceTab === 'steps' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {WORKFLOW_13_STEPS.map(step => {
            const stepOrders = hubOrders.filter(o => ((o as any).currentStep || 1) === step.stepNumber);
            const defaultHub = HUB_MAP[step.defaultHub as HubKey] || HUB_MAP.ALL;

            return (
              <div
                key={step.stepNumber}
                style={{
                  backgroundColor: '#111827', borderRadius: 14, padding: 16,
                  border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 12
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
                        {step.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: 2 }}>
                        Sản phẩm đầu ra: <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{step.deliverable}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Đầu mối mặc định:</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.12)', padding: '2px 8px', borderRadius: 6 }}>
                      {defaultHub.icon} {defaultHub.shortName}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#ff7043', backgroundColor: 'rgba(255, 112, 67, 0.15)', padding: '2px 10px', borderRadius: 12, marginLeft: 8 }}>
                      {stepOrders.length} đơn
                    </span>
                  </div>
                </div>

                {/* Orders list at this step */}
                {stepOrders.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12, marginTop: 8 }}>
                    {stepOrders.map(order => renderOrderCard(order, true))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.76rem', color: '#475569', fontStyle: 'italic', padding: '6px 0' }}>
                    Chưa có đơn hàng nào thuộc Đầu mối đang dừng tại bước này.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Helper render for individual order card inside workspace
  function renderOrderCard(order: TaskItem, isStepView = false) {
    const curStepNum = (order as any).currentStep || 1;
    const curStepObj = getStepInfo(curStepNum);
    const orderTypeObj = getOrderStatusBadge(order.orderStatus);

    return (
      <div
        key={order.id}
        style={{
          backgroundColor: '#1a2234',
          borderRadius: 12,
          padding: 14,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          position: 'relative'
        }}
      >
        {/* Top Header: Code & Type */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.04em' }}>
            {order.orderCode || `DH-${order.id.slice(0, 6)}`}
          </span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: 6,
            backgroundColor: orderTypeObj.bg, color: orderTypeObj.text, border: `1px solid ${orderTypeObj.border}`
          }}>
            {orderTypeObj.label}
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35 }}>
          {order.title}
        </div>

        {/* Description */}
        {order.description && (
          <div style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {order.description}
          </div>
        )}

        {/* Current Step Tracker Badge */}
        <div style={{
          backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.9rem' }}>{curStepObj.icon}</span>
            <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#38bdf8' }}>
              Bước {curStepObj.stepNumber}/13: {curStepObj.name.replace(`Bước ${curStepObj.stepNumber}: `, '')}
            </span>
          </div>
        </div>

        {/* Document Link / VBKL */}
        {order.attachmentUrl ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <a
              href={order.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                backgroundColor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 6,
                padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700, textDecoration: 'none'
              }}
            >
              <Paperclip style={{ width: 12, height: 12 }} />
              <span>Link Tài Liệu / VBKL</span>
              <ExternalLink style={{ width: 10, height: 10 }} />
            </a>
            <button
              onClick={() => onUpdateDocumentUrl(order.id, order.attachmentUrl || '')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Sửa
            </button>
          </div>
        ) : (
          <div
            onClick={() => onUpdateDocumentUrl(order.id, '')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.03)', color: '#94a3b8',
              border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: 6,
              padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', width: 'fit-content'
            }}
          >
            <Paperclip style={{ width: 12, height: 12, color: '#38bdf8' }} />
            <span>+ Đính kèm Link VBKL</span>
          </div>
        )}

        {/* Action Controls */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6,
          paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          {/* Quick status change dropdown */}
          <select
            value={order.status}
            onChange={e => onUpdateOrderStatus(order.id, e.target.value as any)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)', color: '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
              padding: '3px 8px', fontSize: '0.72rem', outline: 'none'
            }}
          >
            <option value="TODO">⌛ TODO</option>
            <option value="IN_PROGRESS">🔄 IN PROGRESS</option>
            <option value="REVIEW">🛡️ REVIEW</option>
            <option value="DONE">✅ DONE</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Advance 1 Step */}
            {curStepNum < 13 && (
              <button
                onClick={() => onAdvanceStep(order)}
                title="Tự động tiến 1 bước và chuyển giao sang Đầu Mối trách nhiệm tiếp theo"
                style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800,
                  backgroundColor: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.35)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4
                }}
              >
                <span>Chuyển Bước {curStepNum + 1}</span>
                <ArrowRight style={{ width: 12, height: 12 }} />
              </button>
            )}

            {/* Transfer to any Hub */}
            <button
              onClick={() => onTransferOrderClick(order)}
              title="Bàn giao đơn hàng sang Đầu Mối khác"
              style={{
                padding: '4px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700,
                backgroundColor: 'rgba(255, 112, 67, 0.15)', color: '#ff7043',
                border: '1px solid rgba(255, 112, 67, 0.3)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4
              }}
            >
              <Share2 style={{ width: 11, height: 11 }} />
              <span>Bàn giao</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};
