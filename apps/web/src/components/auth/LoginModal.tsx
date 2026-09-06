import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, Check, Loader2, ShieldCheck, Building2, UserCheck, Sparkles } from 'lucide-react';
import avgOfficialLogo from '../../assets/avg-one-official-logo.png';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl?: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const SAMPLE_USERS: UserProfile[] = [
  {
    id: 'user-01',
    name: 'Nguyễn Văn Quản Lý',
    email: 'admin.ceo@auvietglobal.com',
    role: 'Tổng Giám Đốc (CEO)',
    department: 'Ban Điều Hành'
  },
  {
    id: 'user-02',
    name: 'Trần Thị Thu Thảo',
    email: 'hr.lead@auvietglobal.com',
    role: 'Trưởng Phòng Nhân Sự',
    department: 'Phòng Hành Chính Nhân Sự'
  },
  {
    id: 'user-03',
    name: 'Lê Hoàng Nam',
    email: 'nam.le@auvietglobal.com',
    role: 'Kỹ Sư Trưởng Nhà Máy',
    department: 'Nhà Máy SX Âu Việt'
  }
];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin.ceo@auvietglobal.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'internal' | 'sso'>('internal');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập Email hoặc Mã nhân viên');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const matched = SAMPLE_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase()) || {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email: email.trim(),
        role: 'Nhân viên hệ thống',
        department: 'AVG One Corporation'
      };

      onLoginSuccess(matched);
      onClose();
    }, 600);
  };

  const handleQuickSelect = (user: UserProfile) => {
    setEmail(user.email);
    setPassword('••••••••••••');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all scale-100">
        
        {/* Header - Sáng sạch đồng bộ thương hiệu AVG One (Căn giữa) */}
        <div className="bg-white dark:bg-slate-900 p-5 border-b border-slate-100 dark:border-slate-800 relative flex flex-col items-center justify-center text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition cursor-pointer"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center mb-2">
            <img src={avgOfficialLogo} alt="AVG One Logo" className="h-7 sm:h-8 object-contain" />
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-wide text-center">
            Đăng nhập tài khoản
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">

          {/* Quick SSO Selector Tabs */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('internal')}
              className={`flex-1 py-2 text-center rounded-lg transition cursor-pointer ${
                activeTab === 'internal'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Tài khoản Nội bộ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sso')}
              className={`flex-1 py-2 text-center rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'sso'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F15A24]" /> Đăng nhập SSO
            </button>
          </div>

          {activeTab === 'internal' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Email / Username field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email công ty / Mã nhân viên
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VD: admin.ceo@auvietglobal.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#F15A24]/40 focus:outline-none transition font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Vui lòng liên hệ IT Admin (admin.ceo@auvietglobal.com) để đặt lại mật khẩu.')}
                    className="text-[11px] font-semibold text-[#F15A24] hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-9 pr-9 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#F15A24]/40 focus:outline-none transition font-medium text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkbox Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#F15A24] bg-slate-100 border-slate-300 rounded focus:ring-[#F15A24] cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                  Ghi nhớ phiên đăng nhập trên thiết bị này
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#F15A24] hover:bg-[#d94e1f] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang xác thực hệ thống...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Đăng nhập hệ thống</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Fast SSO Section */
            <div className="space-y-3 py-1">
              <button
                type="button"
                onClick={() => handleQuickSelect(SAMPLE_USERS[0])}
                className="w-full py-2.5 px-3 border border-slate-200 dark:border-slate-700 hover:border-[#F15A24] dark:hover:border-[#F15A24] rounded-xl flex items-center justify-between text-xs font-semibold transition bg-slate-50 dark:bg-slate-800/40 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    M365
                  </div>
                  <div className="text-left">
                    <div className="text-slate-800 dark:text-slate-100 font-bold">Microsoft 365 Azure AD</div>
                    <div className="text-[10px] text-slate-400">Xác thực SSO doanh nghiệp</div>
                  </div>
                </div>
                <Check className="w-4 h-4 text-[#F15A24]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect(SAMPLE_USERS[1])}
                className="w-full py-2.5 px-3 border border-slate-200 dark:border-slate-700 hover:border-[#F15A24] dark:hover:border-[#F15A24] rounded-xl flex items-center justify-between text-xs font-semibold transition bg-slate-50 dark:bg-slate-800/40 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div className="text-left">
                    <div className="text-slate-800 dark:text-slate-100 font-bold">Google Workspace AVG</div>
                    <div className="text-[10px] text-slate-400">@auvietglobal.com</div>
                  </div>
                </div>
                <Check className="w-4 h-4 text-[#F15A24]" />
              </button>
            </div>
          )}

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#F15A24]" /> Đăng nhập mẫu nhanh:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {SAMPLE_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickSelect(user)}
                  className="p-2 text-left rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition cursor-pointer border border-transparent hover:border-[#F15A24]/40"
                  title={`Đăng nhập làm ${user.name}`}
                >
                  <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate">{user.name}</div>
                  <div className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">{user.role}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex justify-end items-center text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-emerald-500" /> Bản quyền © AVG One
          </span>
        </div>

      </div>
    </div>
  );
};
