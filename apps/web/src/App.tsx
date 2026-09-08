"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  FileText, Plus, RefreshCw, Clock, Users, ChevronDown, ChevronUp, Search, BarChart3, ArrowLeft,
  Bell, LogIn, MessageSquare, Newspaper, MapPin, Sun, Moon,
  PanelLeftOpen, Package, Calendar as CalendarIcon, Scale, Home, Share2, X, Menu, Monitor,
  Building2, Compass, Navigation, Hash, Warehouse, Cpu, Palette, Box, Send, Pin, Target, PenTool, UserCheck, AlertTriangle, Hourglass, Play, Square, Phone, Video, Info, Paperclip, Smile, ThumbsUp, Heart, Maximize2, Minimize2, Image, Contact, Scissors, Type, Zap, CreditCard, MoreHorizontal, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Undo, Redo, Eraser,
  FileSpreadsheet, LayoutGrid, Table, Globe, ShieldCheck, Layers, Trash2, CheckCircle2, Mail, Copy, Briefcase, Filter, AlertCircle, ExternalLink, Eye, QrCode, ArrowRight
} from 'lucide-react';
import { WORKFLOW_13_STEPS, HUB_MAP, HubKey } from './services/workflow13';
import { Workflow13Visualizer } from './components/Workflow13Visualizer';
import { HubWorkspaceComponent } from './components/HubWorkspaceComponent';
import { TaskItem, User, fetchUsersFromCloud, fetchTasks } from './services/api';
import {
  fetchDiscussionEventsFromGoogleSheet, saveLocalDiscussionEvent, deleteLocalDiscussionEvent,
  syncDiscussionEventToGoogleSheet, getGoogleSheetWebhookUrl, setGoogleSheetWebhookUrl,
  DEFAULT_GOOGLE_APPS_SCRIPT_CODE, getDeletedDiscussionEvents, moveToTrashDiscussionEvent,
  restoreDiscussionEventFromTrash, purgeDiscussionEventPermanently, emptyTrashDiscussionEvents,
  DeletedDiscussionEvent, DiscussionEvent as SheetDiscussionEvent
} from './services/googleSheetSync';
import logoLightImg from './assets/logo.png';
import logoDarkImg from './assets/avg-logo-dark.png';
import { AppShell } from './components/layout/AppShell';
import { AppModuleId } from './components/layout/AppLauncherModal';
import { InsideModule } from './modules/inside/InsideModule';
import { GoalModule } from './modules/goal/GoalModule';
import { DashboardModule } from './modules/dashboard/DashboardModule';
import { SystemModule } from './modules/system/SystemModule';
import { AdminModule } from './modules/admin/AdminModule';
import { OdooHomeAppGrid } from './components/home/OdooHomeAppGrid';
import { WeworkModule } from './modules/wework/WeworkModule';
import { RequestModule } from './modules/request/RequestModule';
import { WorkflowModule } from './modules/workflow/WorkflowModule';
import { HRModule } from './modules/hr/HRModule';
import { CalendarModule } from './modules/calendar/CalendarModule';
import { AppsModule } from './modules/apps/AppsModule';

interface DiscussionEvent {
  id: string;
  stt?: number;
  dayOfWeek?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  plannedStartTime?: string;
  plannedEndTime?: string;
  title: string;
  content?: string;
  attendees?: string;
  scope?: string;
  chairperson?: string;
  secretary?: string;
  notes?: string;
  legalEntity?: string;
  status?: string;
  conclusionDocUrl?: string;
  durationMinutes?: number;
  actualStartTime?: string;
  actualEndTime?: string;
}

export interface ExecutiveSheetMessage {
  id: string;
  year: string;
  month: string;
  dayOfWeek: string;
  date: string;
  time: string;
  senderHub: string;
  targetHub: string;
  category: 'TRỰC TIẾP' | 'GIÁN TIẾP' | 'CHƯA XÁC NHẬN';
  content: string;
  notes?: string;
  attachmentUrl?: string;
}

// Helper to get current Date object in Vietnam Timezone (Asia/Ho_Chi_Minh - UTC+7)
export function getVietnamNow(): Date {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const parts = formatter.formatToParts(now);
  let day = 1, month = 1, year = 1970, hour = 0, minute = 0, second = 0;
  for (const p of parts) {
    if (p.type === 'day') day = parseInt(p.value, 10);
    if (p.type === 'month') month = parseInt(p.value, 10);
    if (p.type === 'year') year = parseInt(p.value, 10);
    if (p.type === 'hour') hour = parseInt(p.value, 10);
    if (p.type === 'minute') minute = parseInt(p.value, 10);
    if (p.type === 'second') second = parseInt(p.value, 10);
  }
  return new Date(year, month - 1, day, hour, minute, second);
}

// Synthesized "Ting Ting" Chime Sound Generator using Web Audio API
export function playTingTingSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // First "Ting" (higher pitch 987.77Hz - B5 note)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, ctx.currentTime);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.35);

    // Second "Ting" (brighter pitch 1318.51Hz - E6 note, 120ms delay)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.12);
    gain2.gain.setValueAtTime(0.4, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log('Audio playback error:', e);
  }
}

export interface HrStaff {
  id: string;
  name: string;
  department: string;
  initials: string;
  avatarBg: string;
  hubs: string[];
  email: string;
  phone: string;
  dob: string;
  workDuration: string;
  bankName: string;
  bankAccount: string;
  status: string;
  role?: string;
  position?: string;
}

export const INITIAL_HR_STAFF: HrStaff[] = [
  {
    id: 'hr-1',
    name: 'Lê Trần Thiện Tâm',
    department: 'INTERWRITE',
    initials: 'TT',
    avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    hubs: ['5.1T', 'KIẾN'],
    email: 'cambridgeorg.209@gmail.com',
    phone: '0354126398',
    dob: '20/09/2002',
    workDuration: '1 Năm 10 Tháng 18 Ngày',
    bankName: 'Vietinbank',
    bankAccount: '106879222277',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-2',
    name: 'Đinh Hoàng Ngọc Hân',
    department: 'INTERWRITE',
    initials: 'NH',
    avatarBg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    hubs: ['2.2', '5.1B'],
    email: 'trolitct@gmail.com',
    phone: '0869413365',
    dob: '28/10/2002',
    workDuration: '1 Năm 11 Tháng 18 Ngày',
    bankName: 'VPBank',
    bankAccount: '0869413365',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-3',
    name: 'Nguyễn Văn Quản Lý',
    department: 'AVG GLOBAL',
    initials: 'QL',
    avatarBg: 'linear-gradient(135deg, #0284c7, #2563eb)',
    hubs: ['HUB_0', 'GIÁM ĐỐC'],
    email: 'admin.ceo@auvietglobal.com',
    phone: '0901234567',
    dob: '15/04/1988',
    workDuration: '5 Năm 0 Tháng 10 Ngày',
    bankName: 'Techcombank',
    bankAccount: '1903456789012',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-4',
    name: 'Trần Thị Trưởng Phòng',
    department: 'AVG GLOBAL',
    initials: 'TP',
    avatarBg: 'linear-gradient(135deg, #10b981, #059669)',
    hubs: ['HUB_1', 'HR_MGR'],
    email: 'manager.hr@auvietglobal.com',
    phone: '0912345678',
    dob: '22/08/1992',
    workDuration: '3 Năm 4 Tháng 12 Ngày',
    bankName: 'MBBank',
    bankAccount: '9990123456789',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-5',
    name: 'Lê Văn Nhân Viên',
    department: 'AVG GLOBAL',
    initials: 'NV',
    avatarBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    hubs: ['3.1', 'RDI'],
    email: 'staff.dev@auvietglobal.com',
    phone: '0923456789',
    dob: '10/11/1996',
    workDuration: '2 Năm 1 Tháng 05 Ngày',
    bankName: 'Vietcombank',
    bankAccount: '0071001234567',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-6',
    name: 'Phạm Minh Tuấn',
    department: 'AVG GLOBAL',
    initials: 'MT',
    avatarBg: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    hubs: ['3.2', 'THIẾT KẾ'],
    email: 'tuan.pm@auvietglobal.com',
    phone: '0934567890',
    dob: '05/01/1995',
    workDuration: '1 Năm 8 Tháng 20 Ngày',
    bankName: 'BIDV',
    bankAccount: '1231000456789',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-7',
    name: 'Vũ Quốc Huy',
    department: 'RDI CENTER',
    initials: 'QH',
    avatarBg: 'linear-gradient(135deg, #f97316, #ea580c)',
    hubs: ['2.1', 'SẢN XUẤT'],
    email: 'huy.vq@auvietglobal.com',
    phone: '0945678901',
    dob: '18/06/1994',
    workDuration: '2 Năm 5 Tháng 15 Ngày',
    bankName: 'Agribank',
    bankAccount: '1500205123456',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-8',
    name: 'Bùi Hoàng Nam',
    department: 'RDI CENTER',
    initials: 'HN',
    avatarBg: 'linear-gradient(135deg, #64748b, #475569)',
    hubs: ['HUB_6', 'QC'],
    email: 'nam.bh@auvietglobal.com',
    phone: '0956789012',
    dob: '12/12/1997',
    workDuration: '1 Năm 2 Tháng 10 Ngày',
    bankName: 'TPBank',
    bankAccount: '00001234567',
    status: 'CHÍNH THỨC'
  },
  {
    id: 'hr-9',
    name: 'Đỗ Thùy Trang',
    department: 'RDI CENTER',
    initials: 'TT',
    avatarBg: 'linear-gradient(135deg, #a855f7, #9333ea)',
    hubs: ['HASH', 'TRỢ LÝ'],
    email: 'trang.dt@auvietglobal.com',
    phone: '0967890123',
    dob: '03/03/1999',
    workDuration: '0 Năm 9 Tháng 14 Ngày',
    bankName: 'ACB',
    bankAccount: '246813579',
    status: 'CHÍNH THỨC'
  }
];

export function formatTimeWithoutSeconds(tStr?: string): string {
  if (!tStr) return '';
  return tStr.trim().replace(/(\b\d{1,2}:\d{2}):\d{2}\b/g, '$1');
}

export function parseTimeStr(tStr?: string, defaultH = 17, defaultM = 0) {
  if (!tStr) return { h: defaultH, m: defaultM };
  const str = tStr.trim().toUpperCase();
  const isPM = str.includes('PM');
  const isAM = str.includes('AM');
  const clean = str.replace('PM', '').replace('AM', '').replace('H', ':').trim();
  
  if (clean.includes(':')) {
    const parts = clean.split(':').map(p => parseInt(p.trim(), 10));
    let h = isNaN(parts[0]) ? defaultH : parts[0];
    let m = isNaN(parts[1]) ? defaultM : parts[1];
    
    if (isPM && h < 12) h += 12;
    if (isAM && h === 12) h = 0;
    
    return { h, m };
  }
  return { h: defaultH, m: defaultM };
}

// Helper to parse event date and start/end time into Date objects
export function parseEventTimes(item: DiscussionEvent) {
  let day = 1, month = 1, year = 2026;
  if (item.date) {
    if (item.date.includes('/')) {
      const parts = item.date.split('/').map(p => parseInt(p.trim(), 10));
      if (parts.length === 3) {
        day = parts[0];
        month = parts[1];
        year = parts[2];
      }
    } else if (item.date.includes('-')) {
      const parts = item.date.split('-').map(p => parseInt(p.trim(), 10));
      if (parts.length === 3) {
        if (parts[0] > 1000) {
          year = parts[0];
          month = parts[1];
          day = parts[2];
        } else {
          day = parts[0];
          month = parts[1];
          year = parts[2];
        }
      }
    }
  }

  const startTimeStr = (item as any).actualStartTime || item.plannedStartTime || '17:00';
  const endTimeStr = (item as any).actualEndTime || item.plannedEndTime || '18:00';

  const sTime = parseTimeStr(startTimeStr, 17, 0);
  const eTime = parseTimeStr(endTimeStr, 18, 0);

  const startDateTime = new Date(year, month - 1, day, sTime.h, sTime.m, 0);
  const endDateTime = new Date(year, month - 1, day, eTime.h, eTime.m, 0);

  return { startDateTime, endDateTime };
}

export function parseDateParts(dStr?: string) {
  if (!dStr) return { day: 0, month: 0, year: 0, quarter: 0, weekStr: 'ALL' };
  let day = 0, month = 0, year = 0;
  if (dStr.includes('/')) {
    const p = dStr.split('/').map(Number);
    if (p.length === 3) { day = p[0]; month = p[1]; year = p[2]; }
  } else if (dStr.includes('-')) {
    const p = dStr.split('-').map(Number);
    if (p.length === 3) {
      if (p[0] > 1000) { year = p[0]; month = p[1]; day = p[2]; }
      else { day = p[0]; month = p[1]; year = p[2]; }
    }
  }
  const quarter = Math.ceil(month / 3);
  const weekStr = day <= 7 ? 'W1' : day <= 14 ? 'W2' : day <= 21 ? 'W3' : day <= 28 ? 'W4' : 'W5';
  return { day, month, year, quarter, weekStr };
}

// Helper to auto-calculate Day of Week in Vietnamese from Date string
export function getDayOfWeekFromDateStr(dateStr?: string): string {
  if (!dateStr) return 'THỨ NĂM';
  let day = 1, month = 1, year = 2026;
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/').map(p => parseInt(p.trim(), 10));
    if (parts.length === 3) {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    }
  } else if (dateStr.includes('-')) {
    const parts = dateStr.split('-').map(p => parseInt(p.trim(), 10));
    if (parts.length === 3) {
      if (parts[0] > 1000) { year = parts[0]; month = parts[1]; day = parts[2]; }
      else { day = parts[0]; month = parts[1]; year = parts[2]; }
    }
  }

  const dateObj = new Date(year, month - 1, day);
  const dayIdx = dateObj.getDay();
  const daysInVi = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
  return daysInVi[dayIdx] || 'THỨ NĂM';
}

export function ddmmyyyyToYyyymmdd(str?: string): string {
  if (!str) return '2026-08-13';
  if (str.includes('/')) {
    const p = str.split('/').map(s => s.trim());
    if (p.length === 3) return `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
  }
  return str;
}

export function yyyymmddToDdmmyyyy(str?: string): string {
  if (!str) return '13/08/2026';
  if (str.includes('-')) {
    const p = str.split('-').map(s => s.trim());
    if (p.length === 3 && p[0].length === 4) return `${p[2].padStart(2, '0')}/${p[1].padStart(2, '0')}/${p[0]}`;
  }
  return str;
}

const ACTUAL_TIMES_STORAGE_KEY = 'avg_discussion_actual_times_v1';

export function getSavedActualTimes(): Record<string, { actualStartTime?: string; actualEndTime?: string }> {
  try {
    const raw = localStorage.getItem(ACTUAL_TIMES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveActualTime(eventId: string, key: 'actualStartTime' | 'actualEndTime', val: string) {
  try {
    const saved = getSavedActualTimes();
    if (!saved[eventId]) saved[eventId] = {};
    saved[eventId][key] = val;
    localStorage.setItem(ACTUAL_TIMES_STORAGE_KEY, JSON.stringify(saved));
  } catch (e) {
    console.error('Failed to save actual time to localStorage:', e);
  }
}

// Function to calculate live status based on Vietnam timezone
export function getLiveDiscussionStatus(item: DiscussionEvent, nowVn: Date = getVietnamNow()): string {
  const manualStatuses = ['Đã dời', 'Đã hủy', 'Huỷ lịch', 'Đã hoãn'];
  if (item.status && manualStatuses.includes(item.status)) {
    return item.status;
  }

  const { startDateTime, endDateTime } = parseEventTimes(item);
  const nowMs = nowVn.getTime();
  const startMs = startDateTime.getTime();
  const endMs = endDateTime.getTime();

  if (nowMs < startMs) {
    return 'Sắp tới';
  } else if (nowMs >= startMs && nowMs <= endMs) {
    return 'Đang diễn ra';
  } else {
    return 'Đã diễn ra';
  }
}

// Custom Vietnamese Date Picker Component
export const VietnameseDatePicker: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Parse value "DD/MM/YYYY" to view year & month
  let initialDay = 13, initialMonth = 8, initialYear = 2026;
  if (value && value.includes('/')) {
    const p = value.split('/').map(n => parseInt(n.trim(), 10));
    if (p.length === 3) {
      initialDay = p[0] || 13;
      initialMonth = p[1] || 8;
      initialYear = p[2] || 2026;
    }
  }

  const [viewMonth, setViewMonth] = useState(initialMonth); // 1-12
  const [viewYear, setViewYear] = useState(initialYear); // 2026

  useEffect(() => {
    if (value && value.includes('/')) {
      const p = value.split('/').map(n => parseInt(n.trim(), 10));
      if (p.length === 3 && p[1] && p[2]) {
        setViewMonth(p[1]);
        setViewYear(p[2]);
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(viewMonth).padStart(2, '0');
    const yearStr = String(viewYear);
    onChange(`${dayStr}/${monthStr}/${yearStr}`);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const now = getVietnamNow();
    const dayStr = String(now.getDate()).padStart(2, '0');
    const monthStr = String(now.getMonth() + 1).padStart(2, '0');
    const yearStr = String(now.getFullYear());
    onChange(`${dayStr}/${monthStr}/${yearStr}`);
    setViewMonth(now.getMonth() + 1);
    setViewYear(now.getFullYear());
    setIsOpen(false);
  };

  // Generate calendar grid
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0 = Sun
  const startOffset = (firstDayOfWeek + 6) % 7; // Mon=0

  const daysGrid: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysGrid.push(d);
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Input Display Field */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          readOnly
          value={value || '13/08/2026'}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px 9px 38px',
            fontSize: '0.88rem', fontWeight: 700, outline: 'none', cursor: 'pointer'
          }}
        />
        <CalendarIcon
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: 16, height: 16, color: '#38bdf8', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
        />
      </div>

      {/* Vietnamese Calendar Popover */}
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 6, zIndex: 300,
          backgroundColor: '#161b26', border: '1px solid #38bdf8', borderRadius: 14,
          padding: 14, boxShadow: '0 16px 40px rgba(0, 0, 0, 0.9)', width: 280
        }}>
          {/* Header Month / Year Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <button
              type="button"
              onClick={handlePrevMonth}
              style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.08)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', cursor: 'pointer', fontWeight: 800 }}
            >
              ◀
            </button>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>
              Tháng {String(viewMonth).padStart(2, '0')} năm {viewYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.08)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', cursor: 'pointer', fontWeight: 800 }}
            >
              ▶
            </button>
          </div>

          {/* Weekday Labels (Vietnamese) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 8, fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8' }}>
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {daysGrid.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} />;
              }
              const isSelected = initialDay === day && initialMonth === viewMonth && initialYear === viewYear;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  style={{
                    padding: '6px 0', borderRadius: 6, fontSize: '0.78rem', fontWeight: isSelected ? 900 : 600,
                    backgroundColor: isSelected ? '#0284c7' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    border: isSelected ? '1px solid #38bdf8' : '1px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer Shortcuts */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              type="button"
              onClick={handleSelectToday}
              style={{ padding: '4px 12px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800, backgroundColor: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', cursor: 'pointer' }}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ padding: '4px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Non-Looping 24-Hour Time Picker Component (Không bị vòng lặp AM/PM)
export const VietnameseTimePicker: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  // Generate list of 24h timeslots at 15-minute intervals (00:00 to 23:45)
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      slots.push(`${hh}:${mm}`);
    }
  }

  // Ensure current value is included if not in standard 15-min slots
  let formattedVal = '17:00';
  if (value && value.includes(':')) {
    const parts = value.split(':').map(s => s.trim());
    if (parts.length >= 2) {
      formattedVal = `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
    }
  }

  if (formattedVal && !slots.includes(formattedVal)) {
    slots.push(formattedVal);
    slots.sort();
  }

  return (
    <select
      value={formattedVal}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 8,
        padding: '9px 12px',
        fontSize: '0.84rem',
        fontWeight: 800,
        outline: 'none',
        cursor: 'pointer'
      }}
    >
      {slots.map(t => {
        const hourNum = parseInt(t.split(':')[0], 10);
        const periodTag = hourNum >= 18 ? '🌙 Tối' : hourNum >= 12 ? '☀️ Chiều' : hourNum >= 6 ? '🌅 Sáng' : '🌃 Đêm';
        return (
          <option key={t} value={t} style={{ backgroundColor: '#161b26', color: '#ffffff' }}>
            {t} ({periodTag})
          </option>
        );
      })}
    </select>
  );
};

const INITIAL_DEMO_ORDERS: TaskItem[] = [
  {
    id: 'ord-1',
    orderCode: 'DH-2026-801',
    title: 'Đơn hàng Nghiên cứu Mô đun AI Sensor',
    description: 'Nghiên cứu ứng dụng chip đo lường công nghiệp mới cho AVG One System',
    orderStatus: 'TRỌNG ĐIỂM',
    department: 'NHASAN_3.1',
    currentStep: 4,
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    attachmentUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    creatorId: 'u1',
    assigneeId: 'u2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-2',
    orderCode: 'DH-2026-802',
    title: 'Đơn hàng Thiết kế Vỏ Hộp AVG-X',
    description: 'Thiết kế bản vẽ CAD 3D và xuất file mẫu in 3D cho vỏ hộp bộ thu phát',
    orderStatus: 'KHẨN CẤP',
    department: 'NHASAN_3.2',
    currentStep: 5,
    status: 'TODO',
    priority: 'HIGH',
    attachmentUrl: 'https://drive.google.com/file/d/1XyZ987654321_design_spec.pdf',
    creatorId: 'u1',
    assigneeId: 'u2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Trần Thị Trưởng Phòng', email: 'manager@auvietglobal.com', avatar: null, role: 'MANAGER', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-3',
    orderCode: 'DH-2026-803',
    title: 'Đơn hàng Thẩm định Bản quyền Thương hiệu AVG One',
    description: 'Đăng ký sở hữu trí tuệ và bảo hộ nhãn hiệu tại Cục SHTT Việt Nam',
    orderStatus: 'TRỌNG ĐIỂM',
    department: 'NHASAN_6',
    currentStep: 6,
    status: 'REVIEW',
    priority: 'MEDIUM',
    attachmentUrl: 'https://docs.google.com/document/d/1LegalDoc_AVG_One_2026',
    creatorId: 'u1',
    assigneeId: 'u1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-4',
    orderCode: 'DH-2026-804',
    title: 'Đơn hàng Linh kiện Tồn kho Quý 3/2026 - Kiểm kê Board',
    description: 'Xử lý thanh lý và kiểm định các bo mạch tồn kho chưa sử dụng',
    orderStatus: 'TỒN',
    department: 'HUB_1',
    currentStep: 8,
    status: 'TODO',
    priority: 'LOW',
    attachmentUrl: 'https://docs.google.com/spreadsheets/d/1Inventory_Report_Q3',
    creatorId: 'u2',
    assigneeId: 'u3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u2', name: 'Trần Thị Trưởng Phòng', email: 'manager@auvietglobal.com', avatar: null, role: 'MANAGER', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-5',
    orderCode: 'DH-2026-805',
    title: 'Đơn hàng Tiểu Dự Án Thí Điểm Hệ Thống Giám Sát Tự Động',
    description: 'Triển khai thử nghiệm 50 thiết bị cảm biến cho khu công nghiệp',
    orderStatus: 'TIỂU DỰ ÁN',
    department: '5.1T',
    currentStep: 12,
    status: 'DONE',
    priority: 'HIGH',
    attachmentUrl: 'https://docs.google.com/spreadsheets/d/1PilotProject_50Sensors',
    creatorId: 'u1',
    assigneeId: 'u3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-6',
    orderCode: 'DH-2026-806',
    title: 'Đơn hàng Khởi tạo Đề xuất Thí điểm Sensor P1',
    description: 'Khởi tạo tiếp nhận đơn hàng đề xuất thử nghiệm tại cụm 5.1B',
    orderStatus: 'THƯỜNG XUYÊN',
    department: '5.1B',
    currentStep: 1,
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    attachmentUrl: 'https://docs.google.com/document/d/1Proposal_51B_2026',
    creatorId: 'u1',
    assigneeId: 'u2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-7',
    orderCode: 'DH-2026-807',
    title: 'Đơn hàng Kiểm duyệt Bảo mật & Chuẩn hóa Nền tảng Core System',
    description: 'Chỉ đạo Đầu mối 0: Rà soát toàn bộ lỗ hổng bảo mật và phát triển bộ công cụ nền tảng 24/7',
    orderStatus: 'TRỌNG ĐIỂM',
    department: 'HUB_0',
    currentStep: 3,
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    attachmentUrl: 'https://docs.google.com/document/d/1Security_Platform_Core_2026',
    creatorId: 'u1',
    assigneeId: 'u1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-8',
    orderCode: 'DH-2026-808',
    title: 'Đơn hàng Tháo gỡ Nút thắt Vận hành & Giao thoa Thương ngoại',
    description: 'Chỉ đạo Đầu mối 8: Xử lý điểm nghẽn chuỗi cung ứng, kết nối thương ngoại từ trong ra ngoài',
    orderStatus: 'KHẨN CẤP',
    department: 'HUB_8',
    currentStep: 8,
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    attachmentUrl: 'https://docs.google.com/document/d/1Unblock_Bottleneck_2026',
    creatorId: 'u1',
    assigneeId: 'u2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-9',
    orderCode: 'DH-2026-809',
    title: 'Đơn hàng Tổng hợp Hồ sơ Năng lực AVG One từ Tổng thể đến Chi tiết',
    description: 'Chỉ đạo Đầu mối 9: Phụ trách bức tranh tổng thể và hoàn thiện bộ Hồ sơ Năng lực liên thông',
    orderStatus: 'TRỌNG ĐIỂM',
    department: 'HUB_9',
    currentStep: 13,
    status: 'REVIEW',
    priority: 'HIGH',
    attachmentUrl: 'https://docs.google.com/document/d/1Capability_Profile_AVG_One_2026',
    creatorId: 'u1',
    assigneeId: 'u3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any,
  {
    id: 'ord-22',
    orderCode: 'DH-2026-822',
    title: 'Đơn hàng Quản lý & Nâng cấp Máy móc Thiết bị Hạ tầng Cứng 2.2',
    description: 'Chỉ đạo Đầu mối 2.2: Phụ trách bảo trì hạ tầng cứng và máy móc thiết bị phục vụ liên thông các đầu mối khác',
    orderStatus: 'TRỌNG ĐIỂM',
    department: 'HUB_2.2',
    currentStep: 2,
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    attachmentUrl: 'https://docs.google.com/document/d/1Hardware_Infrastructure_22_2026',
    creatorId: 'u1',
    assigneeId: 'u1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@auvietglobal.com', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
  } as any
];

export interface ZaloMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  attachmentName?: string;
  time: string;
  isMe: boolean;
  reactions?: Record<string, number>;
  userReactions?: any;
}

export interface ZaloConversation {
  id: string;
  name: string;
  avatar: string;
  type: 'internal' | 'guest' | 'group';
  roleTag: string;
  roleColor: string;
  status: string;
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  messages: ZaloMessage[];
}

const INITIAL_ZALO_CONVERSATIONS: ZaloConversation[] = [
  {
    id: 'conv-guest-1',
    name: 'Bà Bích (Quản lý Thuế)',
    avatar: '👩‍💼',
    type: 'guest',
    roleTag: 'KHÁCH MỜI NGOÀI',
    roleColor: '#f97316',
    status: 'Online',
    unreadCount: 2,
    lastMessage: 'Đã nhận được văn bản giải trình chuỗi sản xuất AV.',
    lastTime: '17:45',
    messages: [
      {
        id: 'm-10',
        senderId: 'guest-1',
        senderName: 'Bà Bích (Thuế)',
        text: 'Chào bên AVG, bên mình đã cập nhật xong phương án giải trình lệnh sản xuất và xuất kho cùng ngày chưa?',
        time: '17:30',
        isMe: false
      },
      {
        id: 'm-11',
        senderId: 'me',
        senderName: 'Tôi (AVG)',
        text: 'Dạ chào chị Bích, bên em đã đưa vào Văn Bản Kết Luận họp B5.1 và đính kèm đường link VBKL lên hệ thống rồi ạ.',
        time: '17:40',
        isMe: true
      },
      {
        id: 'm-12',
        senderId: 'guest-1',
        senderName: 'Bà Bích (Thuế)',
        text: 'Cảm ơn em. Chị đã tải văn bản giải trình chuỗi sản xuất AV để soát xét.',
        attachmentName: 'VBKL_GiaiTrinh_Thue_B5.1.pdf',
        time: '17:45',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-ai',
    name: '🤖 Trợ Lý AI AVG One',
    avatar: '🤖',
    type: 'internal',
    roleTag: 'TRỢ LÝ NỘI BỘ',
    roleColor: '#38bdf8',
    status: 'Online 24/7',
    unreadCount: 0,
    lastMessage: 'Sẵn sàng hỗ trợ tra cứu lịch họp và đơn hàng liên thông.',
    lastTime: 'Mới xong',
    messages: [
      {
        id: 'm-1',
        senderId: 'ai',
        senderName: 'Trợ Lý AI AVG',
        text: '👋 Xin chào! Tôi là Trợ Lý AI AVG One. Bạn cần tôi hỗ trợ tra cứu Đơn hàng, Lịch trao đổi hay Báo cáo lạm phát thời gian?',
        time: '18:00',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-group-1',
    name: 'Nhóm Điều Hành 5.1B & Kiên',
    avatar: '🏢',
    type: 'group',
    roleTag: 'NHÓM LIÊN THÔNG',
    roleColor: '#34d399',
    status: '5 thành viên',
    unreadCount: 1,
    lastMessage: 'Nguyễn Văn Quản Lý: Đơn đề xuất thí điểm Sensor P1 đã duyệt!',
    lastTime: '16:20',
    messages: [
      {
        id: 'm-20',
        senderId: 'u1',
        senderName: 'Nguyễn Văn Quản Lý',
        text: 'Đơn DH-2026-806 đề xuất thử nghiệm Sensor P1 đã hoàn thành Bước 1 và bàn giao cho Đầu mối Kiên!',
        time: '16:20',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-guest-2',
    name: 'Khách Mời Danko Coffee',
    avatar: '☕',
    type: 'guest',
    roleTag: 'KHÁCH MỜI NGOÀI',
    roleColor: '#f97316',
    status: 'Offline',
    unreadCount: 0,
    lastMessage: 'Xác nhận dời lịch tập trung sang chiều Thứ Bảy.',
    lastTime: '15/08',
    messages: [
      {
        id: 'm-30',
        senderId: 'guest-2',
        senderName: 'Danko Partner',
        text: 'Xác nhận dời lịch tập trung sang chiều Thứ Bảy.',
        time: '15/08',
        isMe: false
      }
    ]
  }
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('avg_theme', theme);
  }, [theme]);

  const [activeModule, setActiveModule] = useState<AppModuleId>('home');
  const [activeTab, setActiveTab] = useState<string>('calendar-talk');
  const [orgViewMode, setOrgViewMode] = useState<'modern-departments' | '5-levels'>('modern-departments');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([]);

  const [discussionEvents, setDiscussionEvents] = useState<DiscussionEvent[]>([
    {
      id: 'd16',
      stt: 1,
      dayOfWeek: 'CHỦ NHẬT',
      date: '16/08/2026',
      plannedStartTime: '08:30',
      plannedEndTime: '10:00',
      title: 'Họp rà soát & Tổng kết kế hoạch trọng điểm Tuần 1',
      attendees: 'AV; AVG',
      scope: 'P1',
      secretary: '2.1',
      notes: 'Trọng điểm tuần 1; xem xét tiến độ',
      legalEntity: 'AVG',
      status: 'Sắp tới',
      conclusionDocUrl: ''
    },
    {
      id: 'd1',
      stt: 2,
      dayOfWeek: 'THỨ NĂM',
      date: '13/08/2026',
      plannedStartTime: '17:00',
      plannedEndTime: '18:00',
      title: 'Việc trọng điểm T9 AV:\n1. Xử lý định hình chuỗi sản AV để giải thích với quản lý thuế;\n2. Giải trình sử dụng dữ liệu ở lệnh sản xuất và xuất kho cùng 1 ngày với quản lý thuế.',
      attendees: 'AV; AVG',
      scope: 'P1',
      secretary: '2.1',
      notes: 'B5.1; bà Bích; 5.1T; 2.1; #K2T online',
      legalEntity: 'DH',
      status: 'Sắp tới',
      conclusionDocUrl: ''
    },
    {
      id: 'd2',
      stt: 2,
      dayOfWeek: 'THỨ SÁU',
      date: '14/08/2026',
      plannedStartTime: '11:30',
      plannedEndTime: '12:00',
      title: 'Tổng kết công việc thường ngày',
      attendees: 'AV; AVG',
      scope: 'Phòng bà Trang',
      secretary: '6',
      notes: '30P để xử lý tiếp tục nội dung định hình nghiệp vụ mẫu H1; H2',
      legalEntity: '#K1',
      status: 'Sắp tới',
      conclusionDocUrl: ''
    },
    {
      id: 'd3',
      stt: 3,
      dayOfWeek: 'THỨ BẢY',
      date: '15/08/2026',
      plannedStartTime: '17:00',
      plannedEndTime: '18:00',
      title: 'Việc trọng điểm T9 AV',
      attendees: 'AV; AVG',
      scope: 'Danko coffe',
      secretary: '8',
      notes: 'Huỷ lịch do 3.1 nghỉ, dời sang lịch tập trung buổi chiều',
      legalEntity: '2.1',
      status: 'Đã dời',
      conclusionDocUrl: ''
    },
    {
      id: 'd4',
      stt: 4,
      dayOfWeek: 'CHỦ NHẬT',
      date: '20/09/2026',
      plannedStartTime: '17:00',
      plannedEndTime: '18:00',
      title: '#K1 tư vấn cách trình bày các loại văn bản; hợp đồng;..',
      attendees: 'AV; AVG',
      scope: 'Chưa xếp',
      secretary: '1',
      notes: 'Gia hạn thêm 30p',
      legalEntity: '0',
      status: 'Sắp tới',
      conclusionDocUrl: ''
    }
  ]);
  const [selectedFilterMonth, setSelectedFilterMonth] = useState<number>(8); // Mặc định Tháng 8 (Hiện tại)
  const [selectedFilterQuarter, setSelectedFilterQuarter] = useState<number>(3); // Mặc định Quý 3 (Hiện tại)
  const [selectedFilterYear, setSelectedFilterYear] = useState<number>(2026); // Mặc định Năm 2026 (Hiện tại)
  const [calendarViewMode, setCalendarViewMode] = useState<'day' | 'week' | 'month'>('day'); // Mặc định Chế độ Xem Theo Ngày
  const [selectedSpecificDayDate, setSelectedSpecificDayDate] = useState<string>('18/08/2026'); // Mặc định Ngày 18 (18/08/2026)
  const [selectedSpecificWeek, setSelectedSpecificWeek] = useState<string>('W3'); // Mặc định Tuần 3 (17/08 - 23/08)
  const [talkViewMode, setTalkViewMode] = useState<'card' | 'grid'>('card'); // Chế độ xem Thẻ / Lưới
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  // Quản lý trạng thái Ẩn / Sổ mở rộng Thời gian thực tế của các thẻ Lịch
  const [expandedRealTimeMap, setExpandedRealTimeMap] = useState<Record<string, boolean>>({});
  // Quản lý trạng thái Mở rộng / Thu gọn danh sách Lịch hôm nay trên Trang chủ Mobile
  const [isTodayListExpanded, setIsTodayListExpanded] = useState<boolean>(false);
  const toggleRealTimeExpand = (id: string) => {
    setExpandedRealTimeMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Shift Selected Date (+1 or -1 day) for Mouse Wheel & Swipe Up/Down on Date Node Box
  const handleShiftDate = (offsetDays: number, baseDateStr?: string) => {
    let dateObj = getVietnamNow();
    const targetStr = baseDateStr || selectedSpecificDayDate;
    if (targetStr && targetStr.includes('/')) {
      const parts = targetStr.split('/').map(p => parseInt(p.trim(), 10));
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }

    dateObj.setDate(dateObj.getDate() + offsetDays);

    const newDay = dateObj.getDate();
    const newMonth = dateObj.getMonth() + 1;
    const newYear = dateObj.getFullYear();
    const newQuarter = Math.ceil(newMonth / 3);
    const newWeek = newDay <= 7 ? 'W1' : newDay <= 14 ? 'W2' : newDay <= 21 ? 'W3' : 'W4';
    const newDayStr = `${String(newDay).padStart(2, '0')}/${String(newMonth).padStart(2, '0')}/${newYear}`;

    setSelectedFilterYear(newYear);
    setSelectedFilterQuarter(newQuarter);
    setSelectedFilterMonth(newMonth);
    setSelectedSpecificWeek(newWeek);
    setSelectedSpecificDayDate(newDayStr);
    setCalendarViewMode('day');
    showToast(`Đã trở về ${newDayStr}`);
  };

  // Realtime Vietnam Timezone (Asia/Ho_Chi_Minh UTC+7) Clock State
  const [vnNow, setVnNow] = useState<Date>(getVietnamNow());

  useEffect(() => {
    const tickTimer = setInterval(() => {
      setVnNow(getVietnamNow());
    }, 5000);
    return () => clearInterval(tickTimer);
  }, []);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(true);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(true);
  const [isNhaSanOpen, setIsNhaSanOpen] = useState<boolean>(true);
  const [isDauMoiTangCuongOpen, setIsDauMoiTangCuongOpen] = useState<boolean>(true);
  const [isSystemOpen, setIsSystemOpen] = useState<boolean>(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [selectedHub, setSelectedHub] = useState<HubKey>('ALL');
  const [selectedStepFilter, setSelectedStepFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastSyncedTime, setLastSyncedTime] = useState<string>(new Date().toLocaleTimeString('vi-VN'));
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // HR Personnel Management State
  const [hrStaffList, setHrStaffList] = useState<HrStaff[]>(INITIAL_HR_STAFF);
  const [hrSearchQuery, setHrSearchQuery] = useState<string>('');
  const [selectedQrStaff, setSelectedQrStaff] = useState<HrStaff | null>(null);
  const [isAddHrModalOpen, setIsAddHrModalOpen] = useState<boolean>(false);
  const [isInviteHrModalOpen, setIsInviteHrModalOpen] = useState<boolean>(false);
  const [hrSubTab, setHrSubTab] = useState<'staff-list' | 'work-time'>('staff-list');
  const [workTimeType, setWorkTimeType] = useState<'admin' | 'ot'>('admin');
  const [isHrMenuOpen, setIsHrMenuOpen] = useState<boolean>(true);
  const [isWorkTimeMenuOpen, setIsWorkTimeMenuOpen] = useState<boolean>(true);

  // New Staff Form State
  const [newHrName, setNewHrName] = useState<string>('');
  const [newHrDept, setNewHrDept] = useState<string>('INTERWRITE');
  const [newHrHubs, setNewHrHubs] = useState<string>('5.1T; KIẾN');
  const [newHrEmail, setNewHrEmail] = useState<string>('');
  const [newHrPhone, setNewHrPhone] = useState<string>('');
  const [newHrDob, setNewHrDob] = useState<string>('');
  const [newHrBankName, setNewHrBankName] = useState<string>('Vietinbank');
  const [newHrBankAccount, setNewHrBankAccount] = useState<string>('');

  // Chart View Mode Controls State (Chế độ xem & Phạm vi hiển thị khi dữ liệu lớn)
  const [chartViewMode, setChartViewMode] = useState<'detail' | 'day' | 'week' | 'month' | 'year'>('detail');
  const [chartRangeLimit, setChartRangeLimit] = useState<number>(0);
  const [chartPageOffset, setChartPageOffset] = useState<number>(0);

  // Executive Directives & Messages 24/7 State
  const [executiveDirectives, setExecutiveDirectives] = useState<Array<{
    id: string;
    code: string;
    title: string;
    category: 'Tháo gỡ vận hành' | 'Định hướng chiến lược' | 'Kỹ thuật - Hệ thống' | 'Nhân sự - Tổ chức' | 'Sản xuất - Vận hành';
    priority: 'TỐI KHẨN' | 'KHẨN CẤP' | 'TRỌNG ĐIỂM' | 'THƯỜNG XUYÊN';
    author: string;
    scope: string;
    content: string;
    solutionDocUrl?: string;
    status: 'ĐANG HIỆU LỰC' | 'ĐANG THÁO GỠ' | 'ĐÃ HOÀN THÀNH';
    date: string;
  }>>([
    {
      id: 'ed-1',
      code: 'TĐ-2026-001',
      title: 'Thông điệp Tháo gỡ Nút thắt Giải trình Dữ liệu Lệnh Sản Xuất & Xuất Kho Trùng Ngày đối với Cơ quan Thuế',
      category: 'Tháo gỡ vận hành',
      priority: 'TỐI KHẨN',
      author: 'CEO / BAN ĐIỀU HÀNH AVG ONE',
      scope: 'Đầu mối 5.1B & Pháp lý 6 & Cụm Nhà sản 3.1',
      content: 'Chỉ đạo trực tiếp: Yêu cầu Thư ký 2.1 phối hợp Đầu mối 5.1B xuất toàn bộ nhật ký ghi nhận trên AVG One System. Đồng bộ dữ liệu 24/7 sang Google Sheet để làm việc trực tiếp với Cơ quan Thuế. Mọi vướng mắc về chứng từ phát sinh phải được báo cáo trực tiếp cho Ban Điều Hành trong 2 tiếng.',
      solutionDocUrl: 'https://docs.google.com/document/d/1Executive_Directive_Tax_Fix_2026',
      status: 'ĐANG HIỆU LỰC',
      date: '16/08/2026'
    },
    {
      id: 'ed-2',
      code: 'TĐ-2026-002',
      title: 'Định hướng Chiến lược Triển khai Mô đun Cảm biến AI Sensor cho Cụm Nhà sản 3.1',
      category: 'Định hướng chiến lược',
      priority: 'TRỌNG ĐIỂM',
      author: 'CEO / FOUNDER AVG ONE',
      scope: 'Cụm Nhà sản 3.1 & RDI 3.2',
      content: 'Định hướng chiến lược Q3/2026: Ưu tiên nguồn lực thử nghiệm 50 bộ cảm biến công nghiệp tự động hóa tại Cụm 3.1. Giao Giám đốc Sản xuất chuẩn hóa quy trình thử nghiệm và nghiệm thu theo Quy trình 13 Bước.',
      solutionDocUrl: 'https://docs.google.com/spreadsheets/d/1AI_Sensor_Roadmap_2026',
      status: 'ĐANG THÁO GỠ',
      date: '15/08/2026'
    },
    {
      id: 'ed-3',
      code: 'TĐ-2026-003',
      title: 'Quyết định Chuẩn hóa Chuỗi Điều phối Giao vận Liên thông giữa Kế hoạch 5.1B và Đầu mối 5.1T',
      category: 'Kỹ thuật - Hệ thống',
      priority: 'KHẨN CẤP',
      author: 'BAN ĐIỀU HÀNH VẬN HÀNH',
      scope: 'Đầu mối 5.1B & Đầu mối 5.1T',
      content: 'Chỉ đạo vận hành: Tất cả đơn hàng chuyển giao từ Bước 5 sang Bước 6 phải có xác nhận số lượng tồn kho tự động qua mã QR code. Nghiêm cấm bàn giao đơn hàng thủ công không qua hệ thống AVG One.',
      solutionDocUrl: 'https://docs.google.com/document/d/1Transport_Process_Spec',
      status: 'ĐÃ HOÀN THÀNH',
      date: '14/08/2026'
    }
  ]);
  const [directiveFilterCategory, setDirectiveFilterCategory] = useState<string>('ALL');
  const [directiveSearchQuery, setDirectiveSearchQuery] = useState<string>('');
  const [directiveViewMode, setDirectiveViewMode] = useState<'table' | 'timeline' | 'crisis'>('table');
  const [directiveFilterSender, setDirectiveFilterSender] = useState<string>('ALL');
  const [selectedSheetMsg, setSelectedSheetMsg] = useState<ExecutiveSheetMessage | null>(null);
  const [executiveSheetMessages, setExecutiveSheetMessages] = useState<ExecutiveSheetMessage[]>([
    {
      id: 'sheet-msg-1',
      year: '2026', month: '07', dayOfWeek: 'Thứ 4', date: '01/07/2026', time: '08:22',
      senderHub: '1', targetHub: '5.1; @All', category: 'TRỰC TIẾP',
      content: '1. Cập Nhật và lưu ý. Hiệu lực bắt đầu từ 01/07/2026;\n2. Phổ cập đến các đầu mối; mở rộng phổ cập đến người AV làm chuyên môn kế toán. Đảm bảo nhận thức cơ bản đúng; đồng bộ để phối hợp nghiệp vụ.',
      attachmentUrl: 'https://drive.google.com/file/d/1KjaIzp98MOFfZ2yZmVM-XY9ssSj_b-0m/view?usp=sharing'
    },
    {
      id: 'sheet-msg-2',
      year: '2026', month: '07', dayOfWeek: 'Thứ 4', date: '01/07/2026', time: '08:26',
      senderHub: 'Kiến', targetHub: '5.1; 0; 8; 9; @All', category: 'GIÁN TIẾP',
      content: '1. Coi đây là thông tin cần thiết tham khảo, định hình thành “nhóm thông tin tham khảo”, đưa vào kế hoạch truyền thông;\n2. Định hình (1) là một cấu phần kỹ thuật trong tiến trình số hoá, công nghệ hóa.',
      notes: 'Kế hoạch truyền thông liên thông 8 đầu mối tác nghiệp.'
    },
    {
      id: 'sheet-msg-3',
      year: '2026', month: '07', dayOfWeek: 'Thứ 4', date: '01/07/2026', time: '09:35',
      senderHub: '2.2', targetHub: '@All', category: 'CHƯA XÁC NHẬN',
      content: 'Đề nghị từ DH:\nXem xét nghiêm túc hoạt động truyền thông. Tại sao vẫn lặp lại sai lầm NƯỚC ĐẾN LỖ MŨI MỚI NHẢY?',
      attachmentUrl: 'https://drive.google.com/file/d/1ykZOAuOK8uqIVl1wwE7Cw8nR7Vjc2AwU/view?usp=sharing',
      notes: 'Yêu cầu 2.2 làm rõ nguyên nhân chậm trễ báo cáo truyền thông nội dung Âu Việt.'
    },
    {
      id: 'sheet-msg-4',
      year: '2026', month: '07', dayOfWeek: 'Thứ 4', date: '01/07/2026', time: '17:56',
      senderHub: '9', targetHub: 'Kiến; DH; @All', category: 'TRỰC TIẾP',
      content: '9 cập Nhật tình hình:\nA. Dữ liệu AV: Tiếp tục tách dữ liệu đơn vị đo hợp phần trong tổ hợp phẩm đầu ra. Dữ liệu dòng hàng sức lao động: tập hợp dữ liệu theo kế hoạch; Xác thực dữ liệu hàng vật chất thông qua dòng tiền (Đã xử lý 17% tổng khối lượng);\nB. Pháp lý AV: Chưa có vấn đề phát sinh;\nC. Tình hình số hóa, công nghệ hóa;\nD. Lịch làm việc: Cập nhật qua bảng.',
      attachmentUrl: 'https://drive.google.com/file/d/1WoNmmnv2SFvNQuO_sXI4Iqfbqvz7SNCa/view?usp=sharing'
    },
    {
      id: 'sheet-msg-5',
      year: '2026', month: '07', dayOfWeek: 'Thứ 4', date: '01/07/2026', time: '23:37',
      senderHub: 'Kiến', targetHub: '#K2; #K1; DH; @All', category: 'CHƯA XÁC NHẬN',
      content: 'Kiến cập nhật khủng hoảng: về việc thông tin kỹ thuật trên nhãn NRC gạo của nhãn ECONOVA:\n- Lỗi từ phía nhà sản 3.2 trong quá trình sản xuất thứ cấp không chỉnh sửa TPKT;\n- Đề xuất 2 PA: PA1 đàm phán in tem sửa lỗi dán đè tại kho đối tác, PA2 thu hồi 600 chai NRC gạo về kho AV để in lại toàn bộ nhãn.',
      notes: 'Khủng hoảng nhãn Econova 1.3kg gạo. Cần tháo gỡ gấp trong đêm.',
      attachmentUrl: 'https://drive.google.com/drive/folders/1QOe3PSsDkhxQGGBLolBKLlvO0gZNyiee?usp=sharing'
    },
    {
      id: 'sheet-msg-6',
      year: '2026', month: '07', dayOfWeek: 'Thứ 5', date: '02/07/2026', time: '10:47',
      senderHub: '5.1', targetHub: 'Kiến; #K2; #K1; DH', category: 'CHƯA XÁC NHẬN',
      content: '5.1 cập nhật tình hình Phía đối tác Âu Việt: Lúc 22h59 ngày 01/07 bà Bích thông tin lại 4.T ra thông điệp phụ trách rà soát lại công thức, thành phần lô sản xuất NRC Gạo Econova bị lỗi nhãn.',
      notes: 'Bà Trang (4.T) làm việc trực tiếp với sếp Econova.'
    },
    {
      id: 'sheet-msg-7',
      year: '2026', month: '07', dayOfWeek: 'Thứ 5', date: '02/07/2026', time: '12:04',
      senderHub: '4.T', targetHub: '@Ngọc Hân; DH; Econova', category: 'CHƯA XÁC NHẬN',
      content: '4.T xin phép gửi lại thông điệp tháo gỡ:\n1. Phương án 1: In decan TPKT đúng và thực hiện dán sửa lỗi gần nhất/ dễ quan sát nhất. Cần dựng 3D ngay để chủ nhãn xem xét thẩm mỹ;\n2. Phương án 2: In lại nhãn mới bóc nhãn cũ dán thay thế.',
      notes: 'Dựng mockup 3D vị trí dán decal sửa lỗi.'
    },
    {
      id: 'sheet-msg-8',
      year: '2026', month: '07', dayOfWeek: 'Thứ 5', date: '02/07/2026', time: '19:04',
      senderHub: '9', targetHub: 'Kiến; DH; @All', category: 'TRỰC TIẾP',
      content: '9 cập Nhật tình hình:\n1. Giải quyết vấn đề khủng hoảng Lỗi thành phần kỹ thuật nhãn NRC Gạo Econova: Đã có 2 giải pháp, đảm bảo chất lượng;\n2. Dữ liệu AV: Tập hợp đơn vị đo khối lượng;\n3. Pháp lý AV: Tồn kho vật tư ECO ~64tr/131tr tổng nợ.',
      attachmentUrl: 'https://drive.google.com/file/d/1_BotrzOIumEq4LLrf1M9AdUS19J5TqJy/view?usp=sharing'
    },
    {
      id: 'sheet-msg-9',
      year: '2026', month: '07', dayOfWeek: 'Thứ 5', date: '02/07/2026', time: '19:14',
      senderHub: '5.1B', targetHub: 'Kiến; #K2; #K1; @All', category: 'CHƯA XÁC NHẬN',
      content: '5.1B cập nhật phản hồi của Econova: Đặt hàng #K1 tư vấn chọn tên kỹ thuật cho Tem sửa lỗi in sai. Đề xuất cụm từ: 1. THÔNG TIN THÀNH PHẦN BỔ SUNG; 2. ĐÍNH CHÍNH THÔNG TIN BAO BÌ; 3. ĐIỀU CHỈNH, BỔ SUNG THÀNH PHẦN; 4. THÔNG TIN CẬP NHẬT.',
      notes: 'Điều hành chỉ định chọn Phương án (2) ĐÍNH CHÍNH THÔNG TIN BAO BÌ.'
    },
    {
      id: 'sheet-msg-10',
      year: '2026', month: '07', dayOfWeek: 'Thứ 6', date: '03/07/2026', time: '10:55',
      senderHub: 'DH H&J', targetHub: 'CĐT H&J; Các CĐT; Nhân sự H&J; Nguyễn Mạnh Thành', category: 'TRỰC TIẾP',
      content: 'DH H&J gửi thông báo:\n1. Quyết định sa thải ngay lập tức bà Lê Thị Nga;\n2. Ủy nhiệm cho ông Nguyễn Mạnh Thành làm chủ thể phối hợp thực hiện hồ sơ sa thải;\n3. Tất cả mọi hậu quả/thiệt hại, DH H&J hoàn toàn chịu trách nhiệm.',
      notes: 'Nguyên nhân: Không đáp ứng tiêu chuẩn tối thiểu của người lao động.'
    },
    {
      id: 'sheet-msg-11',
      year: '2026', month: '07', dayOfWeek: 'Thứ 6', date: '03/07/2026', time: '11:21',
      senderHub: 'DH H&J', targetHub: 'Hân; Lưu; DH AVG', category: 'TRỰC TIẾP',
      content: 'DH H&J thống nhất cùng DH AVG chỉ định:\n1. Bà Hân tiếp nhận nhiệm vụ chuyên môn của đầu mối 2.1 (tạm thời đến hết tháng 7/2026);\n2. Ông Lưu tiếp nhận nhiệm vụ chuyên môn của đầu mối 6 (tạm thời đến hết tháng 7/2026);\n3. Đảm bảo không đứt gãy công việc phục vụ hệ thống.',
      notes: 'Bàn giao chuyển giao công việc liên thông.'
    },
    {
      id: 'sheet-msg-12',
      year: '2026', month: '07', dayOfWeek: 'Thứ 6', date: '03/07/2026', time: '15:01',
      senderHub: '1', targetHub: '@All', category: 'CHƯA XÁC NHẬN',
      content: 'Theo ủy nhiệm từ điều hành, 1 xin gửi quyết định cho thôi việc Bà Lê Thị Nga.',
      attachmentUrl: 'https://drive.google.com/file/d/1Jfn6rjf-b5azgqCmEN8ArBPsS1DwksdS/view?usp=sharing'
    },
    {
      id: 'sheet-msg-13',
      year: '2026', month: '07', dayOfWeek: 'Thứ 6', date: '03/07/2026', time: '15:50',
      senderHub: '0', targetHub: '0; 8; 9; @All', category: 'TRỰC TIẾP',
      content: 'Với những việc thường xuyên có yêu cầu bảo mật thấp, phối hợp cùng các đầu mối để rà soát, lên kế hoạch, rõ lộ trình và thúc đẩy quyết liệt tiến trình số hoá; công nghệ hoá.',
      attachmentUrl: 'https://drive.google.com/file/d/1rMHc4Yp6sUZp1DGnqHW2KZzjGd26aMV6/view?usp=sharing'
    },
    {
      id: 'sheet-msg-14',
      year: '2026', month: '07', dayOfWeek: 'Thứ 7', date: '04/07/2026', time: '14:17',
      senderHub: 'Kiến', targetHub: 'DH; 2.1; 6', category: 'GIÁN TIẾP',
      content: 'Kiến cập nhật tình hình bàn giao 2.1 và 6:\n- Đầu việc 2.1: Bảng lương H&J, AV, giờ làm thêm bàn giao chiều 03/07;\n- Đầu việc 6: 7 bộ chứng thư pháp lý và xử lý tồn đọng BiboMart, Eco.',
      notes: 'Bàn giao dữ liệu lên Datahub Pháp lý.'
    },
    {
      id: 'sheet-msg-15',
      year: '2026', month: '07', dayOfWeek: 'Thứ 7', date: '04/07/2026', time: '18:57',
      senderHub: '2.1 tạm thời', targetHub: 'DH H&J; DH AVG; @All', category: 'GIÁN TIẾP',
      content: '2.1 Tạm thời báo cáo: Toàn thể nhân sự H&J đồng thuận 100% với các thông điệp điều hành thanh lọc nhân sự qua 2 hàng rào kỹ thuật. Không có bất kỳ sự mất niềm tin nào và 0% nhân sự nghỉ việc.',
      notes: 'Báo cáo cam kết nhân sự hệ thống H&J.'
    }
  ]);
  const [isAddDirectiveModalOpen, setIsAddDirectiveModalOpen] = useState<boolean>(false);

  // New Directive Form State
  const [newDirectiveTitle, setNewDirectiveTitle] = useState<string>('');
  const [newDirectiveCategory, setNewDirectiveCategory] = useState<'Tháo gỡ vận hành' | 'Định hướng chiến lược' | 'Kỹ thuật - Hệ thống' | 'Nhân sự - Tổ chức' | 'Sản xuất - Vận hành'>('Tháo gỡ vận hành');
  const [newDirectivePriority, setNewDirectivePriority] = useState<'TỐI KHẨN' | 'KHẨN CẤP' | 'TRỌNG ĐIỂM' | 'THƯỜNG XUYÊN'>('TỐI KHẨN');
  const [newDirectiveScope, setNewDirectiveScope] = useState<string>('Toàn Hệ Thống AVG One');
  const [newDirectiveContent, setNewDirectiveContent] = useState<string>('');
  const [newDirectiveDocUrl, setNewDirectiveDocUrl] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Analytics Dashboard States
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = useState<boolean>(false);
  const [analyticsPeriodType, setAnalyticsPeriodType] = useState<'month' | 'quarter' | 'year' | 'all'>('month');
  const [analyticsMonth, setAnalyticsMonth] = useState<number>(8);
  const [analyticsQuarter, setAnalyticsQuarter] = useState<number>(3);
  const [analyticsYear, setAnalyticsYear] = useState<number>(2026);

  // 1. Search Auto-complete state
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // 2. System Reset state
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // 3. Zalo-style AVG Chat state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [zaloConversations, setZaloConversations] = useState<ZaloConversation[]>(INITIAL_ZALO_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv-guest-1');
  const [zaloFilterTab, setZaloFilterTab] = useState<'all' | 'internal' | 'guest' | 'group'>('all');
  const [zaloSearchQuery, setZaloSearchQuery] = useState<string>('');
  const [zaloMessageInput, setZaloMessageInput] = useState<string>('');
  const [zaloNavTab, setZaloNavTab] = useState<'messages' | 'contacts' | 'cloud' | 'tasks'>('messages');
  const [isZaloInfoOpen, setIsZaloInfoOpen] = useState<boolean>(false);
  const [isChatExpanded, setIsChatExpanded] = useState<boolean>(false);
  const [mobileChatScreen, setMobileChatScreen] = useState<'list' | 'room'>('list');
  const [isInputExpanded, setIsInputExpanded] = useState<boolean>(false);
  const [isRichTextOpen, setIsRichTextOpen] = useState<boolean>(false);
  const [bannerGradientStyle, setBannerGradientStyle] = useState<'aurora' | 'ocean' | 'neon'>('aurora');

  // Header Dropdown Menus state
  const [isHeaderSystemOpen, setIsHeaderSystemOpen] = useState<boolean>(false);
  const [isHeaderHROpen, setIsHeaderHROpen] = useState<boolean>(false);
  const [isHeaderOrdersOpen, setIsHeaderOrdersOpen] = useState<boolean>(false);

  // Toggle or Revoke per-message reactions (Thả cảm xúc / Thu hồi cảm xúc)
  const handleToggleReaction = (msgId: string, emoji: string) => {
    setZaloConversations(prev => prev.map(conv => {
      if (conv.id !== activeConvId) return conv;
      const updatedMessages = conv.messages.map(msg => {
        if (msg.id !== msgId) return msg;
        const currentReactions = { ...(msg.reactions || {}) };
        const currentUserReactions = [...(msg.userReactions || [])];
        const hasReacted = currentUserReactions.includes(emoji);

        if (hasReacted) {
          // Thu hồi cảm xúc (Revoke reaction)
          const newCount = (currentReactions[emoji] || 1) - 1;
          if (newCount <= 0) {
            delete currentReactions[emoji];
          } else {
            currentReactions[emoji] = newCount;
          }
          const newUserReactions = currentUserReactions.filter(e => e !== emoji);
          return { ...msg, reactions: currentReactions, userReactions: newUserReactions };
        } else {
          // Thả cảm xúc mới (Add reaction)
          currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
          currentUserReactions.push(emoji);
          return { ...msg, reactions: currentReactions, userReactions: currentUserReactions };
        }
      });
      return { ...conv, messages: updatedMessages };
    }));
  };

  useEffect(() => {
    if (!isChatOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsChatOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'x' || e.key === 'X')) {
        e.preventDefault();
        setIsRichTextOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen]);

  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    try {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch {
      // Safe fallback
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [activeConvId, zaloConversations, isChatOpen]);

  const handleSendZaloMessage = (textToSend?: string) => {
    const text = (textToSend || zaloMessageInput).trim();
    if (!text) return;

    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ZaloMessage = {
      id: `m-${Date.now()}`,
      senderId: 'me',
      senderName: 'Tôi (AVG)',
      text: text,
      time: nowStr,
      isMe: true
    };

    setZaloConversations(prev => prev.map(conv => {
      if (conv.id === activeConvId) {
        return {
          ...conv,
          lastMessage: text,
          lastTime: nowStr,
          unreadCount: 0,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));

    if (!textToSend) setZaloMessageInput('');

    setTimeout(() => {
      playTingTingSound();
      setZaloConversations(prev => prev.map(conv => {
        if (conv.id === activeConvId) {
          let replyText = 'Đã nhận tin nhắn từ bạn!';
          if (conv.type === 'guest') {
            replyText = `Cảm ơn em. Chị đã nhận được phản hồi và lưu vết thông tin trao đổi!`;
          } else if (conv.id === 'conv-ai') {
            replyText = `🤖 AI AVG One đã ghi nhận câu hỏi "${text}". Hệ thống sẵn sàng kết nối đơn hàng liên thông!`;
          } else {
            replyText = `Cả nhóm đã nhận được cập nhật mới nhất từ bạn.`;
          }

          const replyMsg: ZaloMessage = {
            id: `m-${Date.now() + 1}`,
            senderId: conv.id,
            senderName: conv.name,
            text: replyText,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            isMe: false
          };

          showToast(`🔔 [Ting Ting!] Tin nhắn mới từ ${conv.name}`);

          return {
            ...conv,
            lastMessage: replyText,
            lastTime: replyMsg.time,
            messages: [...conv.messages, replyMsg]
          };
        }
        return conv;
      }));
    }, 450);
  };

  const handleInviteNewGuest = () => {
    const guestName = window.prompt('✉️ Nhập tên hoặc Email khách mời mới (Quản lý Thuế, Đối Tác...):');
    if (guestName && guestName.trim()) {
      const inviteLink = `https://one.auvietglobal.com/chat/invite?token=GUEST-${Date.now()}`;
      const newConv: ZaloConversation = {
        id: `conv-guest-${Date.now()}`,
        name: guestName.trim(),
        avatar: '🌐',
        type: 'guest',
        roleTag: 'KHÁCH MỜI NGOÀI',
        roleColor: '#f97316',
        status: 'Online',
        unreadCount: 0,
        lastMessage: 'Đã gửi lời mời tham gia trò chuyện',
        lastTime: 'Vừa xong',
        messages: [
          {
            id: `m-init-${Date.now()}`,
            senderId: 'system',
            senderName: 'Hệ thống AVG',
            text: `🎉 Lời mời đã được tạo thành công! Link truy cập trực tiếp cho khách mời: ${inviteLink}`,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            isMe: false
          }
        ]
      };
      setZaloConversations(prev => [newConv, ...prev]);
      setActiveConvId(newConv.id);
      showToast(`✉️ Đã tạo phòng Chat & Link mời cho khách mời: ${guestName.trim()}`);
    }
  };

  // 4. Notifications state (24h, 1h, 10m alerts)
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [readNotificationIds, setReadNotificationIds] = useState<Record<string, boolean>>({});

  const handleResetSystem = async () => {
    try {
      setIsResetting(true);
      showToast('🔄 Đang Reset hệ thống và tải bản Build mới nhất...');
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const key of keys) {
          await caches.delete(key);
        }
      }
      await handleSyncGoogleSheet(false);
      setTimeout(() => {
        showToast('✅ Đã Reset hệ thống và cập nhật bản Build v1.0.5!');
        setIsResetting(false);
        window.location.reload();
      }, 800);
    } catch (err) {
      setIsResetting(false);
      window.location.reload();
    }
  };

  const handleSendChatMessage = (textToSend?: string) => {
    const msg = (textToSend || chatInput).trim();
    if (!msg) return;

    const nowTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsgObj = { sender: 'user' as const, text: msg, time: nowTime };

    setChatMessages(prev => [...prev, userMsgObj]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let reply = '';
      const lower = msg.toLowerCase();
      if (lower.includes('lịch') || lower.includes('họp') || lower.includes('trao đổi')) {
        reply = `🗓️ Hiện có ${discussionEvents.length} cuộc họp trao đổi trong hệ thống. Màn hình tự động nhắc báo trước 24h, 1h và 10 phút!`;
      } else if (lower.includes('đơn') || lower.includes('mã') || lower.includes('5.1b')) {
        reply = `📦 Bạn đang có ${orders.length} đơn hàng trong chuỗi 13 bước việc liên thông.`;
      } else if (lower.includes('lạm phát') || lower.includes('thời gian') || lower.includes('thống kê')) {
        reply = `📊 Bảng Thống Kê Biểu Đồ sẵn sàng cho bạn đối sánh Kế hoạch vs Thực tế & Lạm phát thời gian!`;
      } else {
        reply = `🤖 Đã tiếp nhận ghi nhận "${msg}". Hệ thống AVG One sẽ tự động xử lý và lưu vết!`;
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 400);
  };

  // Notification Engine for 24h, 1h, 10m Alerts
  const calculatedNotifications = useMemo(() => {
    const alerts: Array<{
      id: string;
      eventId: string;
      title: string;
      alertType: '24H' | '1H' | '10M';
      badgeLabel: string;
      badgeColor: string;
      bgStyle: string;
      timeRemainingText: string;
      dateStr: string;
      timeStr: string;
    }> = [];

    discussionEvents.forEach(item => {
      const times = parseEventTimes(item);
      const diffMs = times.startDateTime.getTime() - vnNow.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));

      // 1. Alert 24h before (within 24 hours: 60 to 1440 mins)
      if (diffMins > 60 && diffMins <= 1440) {
        const hoursLeft = Math.floor(diffMins / 60);
        const minsLeft = diffMins % 60;
        alerts.push({
          id: `${item.id}-24h`,
          eventId: item.id,
          title: item.title,
          alertType: '24H',
          badgeLabel: 'BÁO TRƯỚC 24 GIỜ',
          badgeColor: '#38bdf8',
          bgStyle: 'rgba(56, 189, 248, 0.12)',
          timeRemainingText: `Diễn ra trong khoảng ${hoursLeft}h ${minsLeft}p tới`,
          dateStr: item.date,
          timeStr: item.plannedStartTime || '17:00'
        });
      }

      // 2. Alert 1 hour before (within 10 to 60 mins)
      if (diffMins > 10 && diffMins <= 60) {
        alerts.push({
          id: `${item.id}-1h`,
          eventId: item.id,
          title: item.title,
          alertType: '1H',
          badgeLabel: 'BÁO TRƯỚC 1 TIẾNG',
          badgeColor: '#f59e0b',
          bgStyle: 'rgba(245, 158, 11, 0.15)',
          timeRemainingText: `Sắp bắt đầu sau ${diffMins} phút nữa!`,
          dateStr: item.date,
          timeStr: item.plannedStartTime || '17:00'
        });
      }

      // 3. Alert 10 mins before (within 0 to 10 mins)
      if (diffMins >= 0 && diffMins <= 10) {
        alerts.push({
          id: `${item.id}-10m`,
          eventId: item.id,
          title: item.title,
          alertType: '10M',
          badgeLabel: 'BÁO TRƯỚC 10 PHÚT (KHẨN)',
          badgeColor: '#ef4444',
          bgStyle: 'rgba(239, 68, 68, 0.18)',
          timeRemainingText: `🚨 CHỈ CÒN ${diffMins} PHÚT! Chuẩn bị tham gia họp.`,
          dateStr: item.date,
          timeStr: item.plannedStartTime || '17:00'
        });
      }
    });

    return alerts;
  }, [discussionEvents, vnNow]);

  const unreadNotificationsCount = calculatedNotifications.filter(n => !readNotificationIds[n.id]).length;

  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<TaskItem[]>(INITIAL_DEMO_ORDERS);

  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isAddTalkModalOpen, setIsAddTalkModalOpen] = useState<boolean>(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
  const [transferTargetOrder, setTransferTargetOrder] = useState<TaskItem | null>(null);
  const [targetDestinationHub, setTargetDestinationHub] = useState<HubKey>('5.1B');
  const [targetDestinationStep, setTargetDestinationStep] = useState<number>(1);
  const [transferNote, setTransferNote] = useState<string>('');

  // New Order Form State
  const [newOrderCode, setNewOrderCode] = useState<string>('');
  const [newOrderTitle, setNewOrderTitle] = useState<string>('');
  const [newOrderDesc, setNewOrderDesc] = useState<string>('');
  const [newOrderStatusType, setNewOrderStatusType] = useState<string>('TRỌNG ĐIỂM');
  const [newOrderDepartment, setNewOrderDepartment] = useState<HubKey>('5.1B');
  const [newOrderStep, setNewOrderStep] = useState<number>(1);
  const [newOrderAttachmentUrl, setNewOrderAttachmentUrl] = useState<string>('');

  // New Talk Form State
  const [newTalkTitle, setNewTalkTitle] = useState<string>('');
  const [newTalkScope, setNewTalkScope] = useState<string>('P1');
  const [newTalkDayOfWeek, setNewTalkDayOfWeek] = useState<string>('Thứ năm');
  const [newTalkDate, setNewTalkDate] = useState<string>('18/08/2026');
  const [newTalkPlannedStartTime, setNewTalkPlannedStartTime] = useState<string>('17:00');
  const [newTalkPlannedEndTime, setNewTalkPlannedEndTime] = useState<string>('18:00');
  const [newTalkLegalEntity, setNewTalkLegalEntity] = useState<string>('DH');
  const [newTalkAttendees, setNewTalkAttendees] = useState<string>('AV; AVG');
  const [newTalkSecretary, setNewTalkSecretary] = useState<string>('2.1');
  const [newTalkNotes, setNewTalkNotes] = useState<string>('');

  const [isVbklModalOpen, setIsVbklModalOpen] = useState(false);
  const [selectedVbklEvent, setSelectedVbklEvent] = useState<DiscussionEvent | null>(null);
  const [vbklInputType, setVbklInputType] = useState<'link' | 'file'>('link');
  const [vbklUrl, setVbklUrl] = useState('');
  const [vbklFileName, setVbklFileName] = useState('');

  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState(getGoogleSheetWebhookUrl());
  const [isCurrentDateMenuOpen, setIsCurrentDateMenuOpen] = useState(false);

  const handleGoToCurrentDay = () => {
    const now = getVietnamNow();
    const curDay = now.getDate();
    const curMonth = now.getMonth() + 1;
    const curYear = now.getFullYear();
    const curQuarter = Math.ceil(curMonth / 3);
    const curWeek = curDay <= 7 ? 'W1' : curDay <= 14 ? 'W2' : curDay <= 21 ? 'W3' : 'W4';
    const curDayStr = `${String(curDay).padStart(2, '0')}/${String(curMonth).padStart(2, '0')}/${curYear}`;

    setSelectedFilterYear(curYear);
    setSelectedFilterQuarter(curQuarter);
    setSelectedFilterMonth(curMonth);
    setSelectedSpecificWeek(curWeek);
    setSelectedSpecificDayDate(curDayStr);
    setCalendarViewMode('day');
    showToast(`📅 Đã xem Ngày hiện tại (${curDayStr})!`);
  };

  const handleGoToCurrentMonth = () => {
    const now = getVietnamNow();
    const curMonth = now.getMonth() + 1;
    const curYear = now.getFullYear();

    setSelectedFilterYear(curYear);
    setSelectedFilterQuarter(Math.ceil(curMonth / 3));
    setSelectedFilterMonth(curMonth);
    setSelectedSpecificWeek('ALL');
    setSelectedSpecificDayDate('');
    setCalendarViewMode('month');
    showToast(`🗓️ Đã xem Tháng hiện tại (Tháng ${String(curMonth).padStart(2, '0')}/${curYear})!`);
  };

  const closeAllHeaderDropdowns = () => {
    setIsHeaderSystemOpen(false);
    setIsHeaderHROpen(false);
    setIsHeaderOrdersOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideNavbar = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('.main-header-navbar')) {
        closeAllHeaderDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutsideNavbar);
    return () => document.removeEventListener('mousedown', handleClickOutsideNavbar);
  }, []);

  const handleUpdateActualTime = (eventId: string, key: 'actualStartTime' | 'actualEndTime', val: string) => {
    const cleanVal = formatTimeWithoutSeconds(val);
    saveActualTime(eventId, key, cleanVal);
    setDiscussionEvents(prev => {
      const updated = prev.map(ev => ev.id === eventId ? { ...ev, [key]: cleanVal } as any : ev);
      const targetEv = updated.find(ev => ev.id === eventId);
      if (targetEv) {
        const times = parseEventTimes(targetEv);
        const plannedMins = Math.round((times.endDateTime.getTime() - times.startDateTime.getTime()) / (1000 * 60)) || 60;
        const actS = parseTimeStr((targetEv as any).actualStartTime || targetEv.plannedStartTime);
        const actE = parseTimeStr((targetEv as any).actualEndTime || targetEv.plannedEndTime);
        const actMins = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
        if (!isNaN(actMins) && actMins >= 0) {
          const inflation = actMins - plannedMins;
          const infStr = inflation > 0 ? `+${inflation} phút (⚠️ Lạm phát)` : inflation === 0 ? '0 phút (✅ Đúng kế hoạch)' : `🎉 Tiết kiệm ${Math.abs(inflation)} phút`;
          showToast(`⚡ [Realtime 24/7] Cập nhật thời gian thực tế ➔ Tổng: ${actMins} phút | ${infStr}`);
          playTingTingSound();
        }
      }
      return updated;
    });
  };

  const handleSyncGoogleSheet = async (showNotification = false) => {
    try {
      setIsSyncing(true);
      const fetchedEvents = await fetchDiscussionEventsFromGoogleSheet();
      if (fetchedEvents && fetchedEvents.length > 0) {
        const savedActualTimes = getSavedActualTimes();
        const mergedEvents = fetchedEvents.map(ev => {
          const saved = savedActualTimes[ev.id];
          if (saved) {
            return {
              ...ev,
              actualStartTime: saved.actualStartTime || ev.actualStartTime,
              actualEndTime: saved.actualEndTime || ev.actualEndTime
            };
          }
          return ev;
        });
        setDiscussionEvents(mergedEvents);
        const nowStr = new Date().toLocaleTimeString('vi-VN');
        setLastSyncedTime(nowStr);
        if (showNotification) {
          showToast(`🔄 Đã đồng bộ thành công ${fetchedEvents.length} lịch trao đổi từ Google Sheet 24/7 lúc ${nowStr}!`);
        }
      }
    } catch (err) {
      console.error('Google Sheet 24/7 Sync error:', err);
      if (showNotification) {
        showToast('⚠️ Đã tự động dùng bộ dữ liệu 24/7 trong bộ nhớ!');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Sync immediately on app startup
    handleSyncGoogleSheet(false);

    // 24/7 Auto-sync interval polling every 15 seconds
    const interval = setInterval(() => {
      handleSyncGoogleSheet(false);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || (activeEl as HTMLElement).isContentEditable)) {
        return;
      }
      if (e.key === 'd' || e.key === 'D') {
        handleGoToCurrentDay();
      } else if (e.key === 'm' || e.key === 'M') {
        handleGoToCurrentMonth();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreateNewTalk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTalkTitle.trim()) return;

    const eventDateStr = newTalkDate.trim() || '18/08/2026';
    const computedDayOfWeek = getDayOfWeekFromDateStr(eventDateStr);
    const { month, year, quarter, weekStr } = parseDateParts(eventDateStr);

    const newEvt: DiscussionEvent = {
      id: `d-${Date.now()}`,
      stt: discussionEvents.length + 1,
      dayOfWeek: computedDayOfWeek,
      date: eventDateStr,
      plannedStartTime: newTalkPlannedStartTime.trim() || '18:00',
      plannedEndTime: newTalkPlannedEndTime.trim() || '19:00',
      actualStartTime: newTalkPlannedStartTime.trim() || '18:00',
      actualEndTime: newTalkPlannedEndTime.trim() || '19:00',
      title: newTalkTitle.trim(),
      attendees: newTalkAttendees || 'AV; AVG',
      scope: newTalkScope.trim() || 'P1',
      secretary: newTalkSecretary.trim() || '8',
      notes: newTalkNotes.trim() || '--',
      legalEntity: newTalkLegalEntity.trim() || 'DH',
      status: 'Sắp tới',
      conclusionDocUrl: ''
    };

    // 1. Save locally to localStorage FIRST for instant 24/7 persistence
    saveLocalDiscussionEvent(newEvt);

    // 2. Prepend to discussionEvents state immediately
    setDiscussionEvents(prev => {
      const filtered = prev.filter(p => p.id !== newEvt.id && p.title !== newEvt.title);
      return [newEvt, ...filtered];
    });

    // 3. Update all date filters so event is 100% GUARANTEED TO BE VISIBLE ON UI
    if (year > 0) setSelectedFilterYear(year);
    if (month > 0) setSelectedFilterMonth(month);
    if (quarter > 0) setSelectedFilterQuarter(quarter);
    setSelectedSpecificDayDate(eventDateStr);
    if (weekStr && weekStr !== 'ALL') setSelectedSpecificWeek(weekStr);
    setCalendarViewMode('day');

    // 4. Reverse sync to Google Sheet 24/7
    const syncRes = await syncDiscussionEventToGoogleSheet(newEvt);

    // 5. Close modal and reset form
    setIsAddTalkModalOpen(false);
    setNewTalkTitle('');
    setNewTalkNotes('');
    playTingTingSound();

    if (!syncRes.success) {
      setTimeout(() => {
        setIsWebhookModalOpen(true);
      }, 1000);
      showToast(`⚠️ Lịch đã hiển thị trên AVG One! Để tự động chèn dòng mới về Google Sheet, vui lòng dán Webhook URL trong cửa sổ!`);
    } else {
      showToast(`✨ Đã thêm lịch "${newEvt.title}" (${eventDateStr}) - Đã gửi ghi về Google Sheet!`);
    }
  };

  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [trashEvents, setTrashEvents] = useState<DeletedDiscussionEvent[]>(getDeletedDiscussionEvents());

  const handleDeleteDiscussionEvent = (eventId: string, title: string) => {
    if (!window.confirm(`❓ Bạn có chắc chắn muốn CHUYỂN VÀO THÙNG RÁC cuộc trao đổi:\n"${title}"?`)) return;

    const targetEv = discussionEvents.find(e => e.id === eventId);
    if (targetEv) {
      const updatedTrash = moveToTrashDiscussionEvent(targetEv);
      setTrashEvents(updatedTrash);
    } else {
      deleteLocalDiscussionEvent(eventId, title);
    }

    setDiscussionEvents(prev => prev.filter(e => e.id !== eventId && e.title.trim().toLowerCase() !== title.trim().toLowerCase()));

    playTingTingSound();
    showToast(`🗑️ Đã chuyển cuộc trao đổi "${title}" vào Thùng Rác tạm lưu trữ!`);
  };

  const handleRestoreFromTrash = (eventId: string, title: string) => {
    const restored = restoreDiscussionEventFromTrash(eventId);
    if (restored) {
      setTrashEvents(getDeletedDiscussionEvents());
      setDiscussionEvents(prev => [restored as any, ...prev.filter(e => e.id !== eventId)]);
      playTingTingSound();
      showToast(`♻️ Đã khôi phục cuộc trao đổi "${title}" về Lịch Trao Đổi!`);
    }
  };

  const handlePurgeFromTrash = (eventId: string, title: string) => {
    if (!window.confirm(`⚠️ XÓA VĨNH VIỄN: Bạn có chắc chắn muốn xóa hẳn cuộc trao đổi "${title}"? Dữ liệu không thể khôi phục sau khi xóa.`)) return;
    const updated = purgeDiscussionEventPermanently(eventId);
    setTrashEvents(updated);
    playTingTingSound();
    showToast(`🔥 Đã xóa vĩnh viễn cuộc trao đổi "${title}" khỏi hệ thống!`);
  };

  const handleEmptyTrash = () => {
    if (!window.confirm(`⚠️ XÓA TẤT CẢ: Bạn có chắc chắn muốn DỌN SẠCH Thùng Rác? Toàn bộ cuộc trao đổi trong thùng rác sẽ mất vĩnh viễn.`)) return;
    emptyTrashDiscussionEvents();
    setTrashEvents([]);
    playTingTingSound();
    showToast(`🧹 Đã dọn sạch Thùng Rác thành công!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectHubFromSidebar = (hubKey: HubKey) => {
    setSelectedHub(hubKey);
    setActiveTab('orders');
    setIsMobileMenuOpen(false);
    showToast(`🏢 Đã chuyển sang Đầu Mối: ${HUB_MAP[hubKey].name}`);
  };

  const handleAdvanceStep = (order: TaskItem) => {
    const curStepNum = (order as any).currentStep || 1;
    if (curStepNum >= 13) {
      showToast('🎉 Đơn hàng đã hoàn thành Bước 13!');
      return;
    }
    const nextStepNum = curStepNum + 1;
    const nextStepObj = WORKFLOW_13_STEPS.find(s => s.stepNumber === nextStepNum) || WORKFLOW_13_STEPS[12];
    const nextHubKey = nextStepObj.defaultHub;

    setOrders(prev => prev.map(o => {
      if (o.id === order.id) {
        return {
          ...o,
          currentStep: nextStepNum,
          department: nextHubKey,
          status: nextStepNum === 13 ? 'DONE' : 'IN_PROGRESS'
        };
      }
      return o;
    }));
    showToast(`⚡ Chuyển đơn hàng sang Bước ${nextStepNum}: ${nextStepObj.name} (${HUB_MAP[nextHubKey].shortName})`);
  };

  const handleOpenTransferModal = (order: TaskItem) => {
    setTransferTargetOrder(order);
    const curStep = (order as any).currentStep || 1;
    setTargetDestinationStep(curStep < 13 ? curStep + 1 : 13);
    const stepObj = WORKFLOW_13_STEPS.find(s => s.stepNumber === (curStep < 13 ? curStep + 1 : 13));
    setTargetDestinationHub(stepObj ? stepObj.defaultHub : '5.1B');
    setIsTransferModalOpen(true);
  };

  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferTargetOrder) return;

    setOrders(prev => prev.map(o => {
      if (o.id === transferTargetOrder.id) {
        return {
          ...o,
          department: targetDestinationHub,
          currentStep: targetDestinationStep,
          status: targetDestinationStep === 13 ? 'DONE' : 'IN_PROGRESS'
        };
      }
      return o;
    }));

    setIsTransferModalOpen(false);
    showToast(`➡️ Đã chuyển giao đơn hàng ${transferTargetOrder.orderCode || ''} sang ${HUB_MAP[targetDestinationHub].name} (Bước ${targetDestinationStep})`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    showToast(`📦 Đã cập nhật trạng thái đơn hàng sang: ${newStatus}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast('🗑️ Đã xóa đơn hàng thành công!');
  };

  const handleUpdateOrderDocUrl = (orderId: string, currentUrl?: string) => {
    const inputUrl = window.prompt('📎 Nhập Link VBKL / Document Google Sheet:', currentUrl || '');
    if (inputUrl !== null) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, attachmentUrl: inputUrl.trim() } : o));
      showToast('✅ Đã cập nhật Link VBKL thành công!');
    }
  };

  const handleCreateNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderTitle.trim()) return;

    const newCode = newOrderCode.trim() || `DH-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrd: TaskItem = {
      id: Date.now().toString(),
      orderCode: newCode,
      title: newOrderTitle.trim(),
      description: newOrderDesc.trim(),
      orderStatus: newOrderStatusType,
      department: newOrderDepartment,
      currentStep: newOrderStep,
      status: newOrderStep === 13 ? 'DONE' : 'IN_PROGRESS',
      priority: 'HIGH',
      attachmentUrl: newOrderAttachmentUrl.trim() || undefined,
      creatorId: 'u1',
      assigneeId: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: { id: 'u1', name: 'Nguyễn Văn Quản Lý', email: 'admin@avg.vn', avatar: null, role: 'ADMIN', status: 'ACTIVE', ssoProvider: null, ssoId: null, createdAt: '' }
    } as any;

    setOrders(prev => [newOrd, ...prev]);
    setIsOrderModalOpen(false);
    setNewOrderCode('');
    setNewOrderTitle('');
    setNewOrderDesc('');
    showToast(`🎉 Đã khởi tạo đơn hàng mới: ${newCode} tại ${HUB_MAP[newOrderDepartment].shortName}`);
  };

  const handleCreateNewDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirectiveTitle.trim()) return;

    const newCode = `TĐ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const nowStr = new Date().toLocaleDateString('vi-VN');

    const newDirective = {
      id: `ed-${Date.now()}`,
      code: newCode,
      title: newDirectiveTitle.trim(),
      category: newDirectiveCategory,
      priority: newDirectivePriority,
      author: 'CEO / BAN ĐIỀU HÀNH AVG ONE',
      scope: newDirectiveScope.trim() || 'Toàn Hệ Thống AVG One',
      content: newDirectiveContent.trim(),
      solutionDocUrl: newDirectiveDocUrl.trim() || undefined,
      status: 'ĐANG HIỆU LỰC' as const,
      date: nowStr
    };

    setExecutiveDirectives(prev => [newDirective, ...prev]);
    setIsAddDirectiveModalOpen(false);
    setNewDirectiveTitle('');
    setNewDirectiveContent('');
    setNewDirectiveDocUrl('');
    playTingTingSound();
    showToast(`📢 Đã ban hành Thông Điệp / Quyết Định Điều Hành mới: ${newCode}! Dữ liệu đã đồng bộ 24/7.`);
  };

  return (
    <AppShell
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      darkMode={theme === 'dark'}
      onToggleDarkMode={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
    >
      {activeModule === 'home' ? (
        <OdooHomeAppGrid onSelectModule={setActiveModule} />
      ) : activeModule === 'system' || activeModule === 'admin' ? (
        <SystemModule />
      ) : activeModule === 'inside' ? (
        <InsideModule />
      ) : activeModule === 'calendar' ? (
        <CalendarModule />
      ) : activeModule === 'orders' || activeModule === 'wework' ? (
        <WeworkModule />
      ) : activeModule === 'hr' || activeModule === 'goal' ? (
        <HRModule />
      ) : activeModule === 'legal' ? (
        <RequestModule />
      ) : activeModule === 'finance' || activeModule === 'request' ? (
        <RequestModule />
      ) : activeModule === 'rd' || activeModule === 'workflow' ? (
        <WorkflowModule />
      ) : activeModule === 'apps' ? (
        <AppsModule />
      ) : activeModule === 'dashboard' ? (
        <DashboardModule />
      ) : (
        <OdooHomeAppGrid onSelectModule={setActiveModule} />
      )}
    </AppShell>
  );
}