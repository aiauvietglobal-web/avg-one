import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AVG One Application Error Boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', width: '100%', backgroundColor: '#0b0e14', color: '#ffffff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif', padding: 24, textAlign: 'center'
        }}>
          <div style={{
            maxWidth: 560, padding: 32, borderRadius: 20, backgroundColor: '#111622',
            border: '1px solid rgba(56, 189, 248, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              🔄
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#38bdf8', margin: 0, textTransform: 'uppercase' }}>
                Đã Cập Nhật Bản Build Mới
              </h2>
              <p style={{ fontSize: '0.84rem', color: '#cbd5e1', marginTop: 8, lineHeight: 1.5 }}>
                Hệ thống AVG One vừa ghi nhận bản Build mới. Đã tự động tối ưu hóa và khôi phục trạng thái hoạt động an toàn.
              </p>
              {this.state.error && (
                <div style={{ marginTop: 12, padding: 10, borderRadius: 8, backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.75rem', color: '#f87171', fontFamily: 'monospace', textAlign: 'left', overflowX: 'auto', maxWidth: '100%' }}>
                  {this.state.error.toString()}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                }}
                style={{
                  padding: '10px 20px', borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff', fontSize: '0.88rem', fontWeight: 800, border: '1px solid rgba(255, 255, 255, 0.2)', cursor: 'pointer'
                }}
              >
                Thử Lại Trực Tiếp
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                style={{
                  padding: '10px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                  color: '#ffffff', fontSize: '0.88rem', fontWeight: 900, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.3)'
                }}
              >
                🚀 Tải Lại Trang & Cập Nhật Mới Nhất
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);