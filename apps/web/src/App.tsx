"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  FileText, Plus, RefreshCw, Clock, Users, ChevronDown, Search, BarChart3, ArrowLeft,
  Bell, LogIn, MessageSquare, Newspaper, MapPin, Sun, Moon,
  PanelLeftOpen, Package, Calendar as CalendarIcon, Scale, Home, Share2, X, Menu, Monitor,
  Building2, Compass, Navigation, Hash, Warehouse, Cpu, Palette, Box, Send, Pin, Target, PenTool, UserCheck, AlertTriangle, Hourglass, Play, Square, Phone, Video, Info, Paperclip, Smile, ThumbsUp, Heart, Maximize2, Minimize2, Image, Contact, Scissors, Type, Zap, CreditCard, MoreHorizontal, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Undo, Redo, Eraser,
  FileSpreadsheet, LayoutGrid, Table, Globe, ShieldCheck, Layers, Trash2, CheckCircle2, Mail, Copy, Briefcase, Filter, AlertCircle, ExternalLink, Eye
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

interface DiscussionEvent {
  id: string;
  stt?: number;
  dayOfWeek?: string;
  date: string;
  plannedStartTime?: string;
  plannedEndTime?: string;
  title: string;
  attendees?: string;
  scope?: string;
  secretary?: string;
  notes?: string;
  legalEntity?: string;
  status?: string;
  conclusionDocUrl?: string;
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<string>('calendar-talk');

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
      showToast('🔄 Đang Reset hệ thống và cập nhật bản Build mới nhất...');
      await handleSyncGoogleSheet(false);
      setTimeout(() => {
        showToast('✅ Đã Reset hệ thống và cập nhật thành công bản Build v1.0.4!');
        setIsResetting(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      setIsResetting(false);
      showToast('⚠️ Reset hoàn tất!');
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
    <div
      suppressHydrationWarning
      className={`app-main-layout ${isMobileMode ? 'force-mobile-mode' : ''}`}
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0b0e14',
        color: '#f8fafc',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 100,
          backgroundColor: '#131b2a', color: '#fff', padding: '12px 20px',
          borderRadius: 12, border: '1px solid #38bdf8', boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
        }}>
          {toastMessage}
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`sidebar-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        style={{
          width: isSidebarCollapsed ? 76 : 260,
          backgroundColor: '#0d1017',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          flexShrink: 0,
          transition: 'width 0.2s'
        }}
      >
        {/* LOGO BRAND */}
        <div style={{ height: 96, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <img
            src="/logo.png"
            alt="AVG ONE Logo"
            style={{
              height: isSidebarCollapsed ? 28 : 36,
              maxWidth: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              margin: isSidebarCollapsed ? '0 auto' : '0'
            }}
          />
          <button
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              padding: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#94a3b8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            aria-label="Close mobile menu"
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* MENU ITEMS */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', fontSize: '0.8rem', fontWeight: 700 }}>
          {/* NÚT QUAY LẠI GIAO DIỆN MÁY TÍNH (ẨN Ở CHẾ ĐỘ MOBILE) */}
          <button
            type="button"
            className="hide-on-mobile"
            onClick={() => {
              setIsMobileMode(false);
              setIsMobileMenuOpen(false);
              showToast('💻 Đã trở về Giao diện Máy tính (Desktop)');
            }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12,
              backgroundColor: 'rgba(56, 189, 248, 0.18)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              cursor: 'pointer', textAlign: 'left', fontWeight: 800, fontSize: '0.8rem',
              marginBottom: 8, transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            title="Quay lại Giao diện Máy tính"
          >
            <Monitor style={{ width: 17, height: 17, color: '#38bdf8' }} />
            {!isSidebarCollapsed && <span style={{ fontWeight: 800, letterSpacing: '0.03em' }}>💻 VỀ GIAO DIỆN MÁY TÍNH</span>}
          </button>

          {/* 1. TRANG CHỦ */}
          <button
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12,
              backgroundColor: activeTab === 'home' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
              color: activeTab === 'home' ? '#ff7043' : '#94a3b8',
              border: activeTab === 'home' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Home style={{ width: 17, height: 17, color: activeTab === 'home' ? '#ff7043' : 'inherit' }} />
            {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>TRANG CHỦ</span>}
          </button>

          {/* 2. BẢNG TIN NỘI BỘ */}
          <button
            onClick={() => { setActiveTab('news'); setIsMobileMenuOpen(false); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12,
              backgroundColor: activeTab === 'news' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
              color: activeTab === 'news' ? '#ff7043' : '#94a3b8',
              border: activeTab === 'news' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Newspaper style={{ width: 17, height: 17, color: activeTab === 'news' ? '#ff7043' : 'inherit' }} />
            {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>BẢNG TIN NỘI BỘ</span>}
          </button>

          {/* 3. HỆ THỐNG MENU (ĐẦU MỤC LỚN) */}
          <div>
            <button
              onClick={() => {
                setIsSystemOpen(!isSystemOpen);
                if (activeTab !== 'system' && activeTab !== 'system-annual-plan' && activeTab !== 'system-executive-message') {
                  setActiveTab('system');
                }
              }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
                backgroundColor: (activeTab === 'system' || activeTab === 'system-annual-plan' || activeTab === 'system-executive-message') ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
                color: (activeTab === 'system' || activeTab === 'system-annual-plan' || activeTab === 'system-executive-message') ? '#ff7043' : '#94a3b8',
                border: (activeTab === 'system' || activeTab === 'system-annual-plan' || activeTab === 'system-executive-message') ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <BarChart3 style={{ width: 17, height: 17, color: (activeTab === 'system' || activeTab === 'system-annual-plan' || activeTab === 'system-executive-message') ? '#ff7043' : 'inherit' }} />
                {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>HỆ THỐNG</span>}
              </div>
              {!isSidebarCollapsed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    backgroundColor: (activeTab === 'system' || activeTab === 'system-annual-plan' || activeTab === 'system-executive-message') ? 'rgba(255, 87, 34, 0.3)' : '#1e293b',
                    color: (activeTab === 'system' || activeTab === 'system-annual-plan' || activeTab === 'system-executive-message') ? '#ffccbc' : '#94a3b8',
                    fontSize: '0.68rem', padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', fontWeight: 700
                  }}>3</span>
                  <ChevronDown style={{ width: 14, height: 14, transform: isSystemOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>
              )}
            </button>

            {/* ĐẦU MỤC NHỎ TRONG HỆ THỐNG (ẢN CHỈ SỐ CỦA CÁC ĐẦU MỤC NHỎ) */}
            {isSystemOpen && !isSidebarCollapsed && (
              <div style={{ marginLeft: 20, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '1px solid rgba(255, 87, 34, 0.4)', paddingLeft: 12 }}>
                {/* 1. CẤU TRÚC (VỊ TRÍ ĐẦU TIÊN) */}
                <button
                  onClick={() => { setActiveTab('system'); setIsMobileMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: activeTab === 'system' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activeTab === 'system' ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: activeTab === 'system' ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Share2 style={{ width: 14, height: 14, color: '#38bdf8' }} />
                    Cấu trúc
                  </span>
                </button>

                {/* 2. KẾ HOẠCH NĂM */}
                <button
                  onClick={() => { setActiveTab('system-annual-plan'); setIsMobileMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: activeTab === 'system-annual-plan' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activeTab === 'system-annual-plan' ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: activeTab === 'system-annual-plan' ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Target style={{ width: 14, height: 14, color: '#38bdf8' }} />
                    Kế hoạch năm
                  </span>
                </button>

                {/* 3. THÔNG ĐIỆP ĐIỀU HÀNH */}
                <button
                  onClick={() => { setActiveTab('system-executive-message'); setIsMobileMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: activeTab === 'system-executive-message' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activeTab === 'system-executive-message' ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: activeTab === 'system-executive-message' ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Zap style={{ width: 14, height: 14, color: '#38bdf8' }} />
                    Thông điệp điều hành
                  </span>
                </button>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <div style={{ paddingTop: 16, paddingBottom: 6, paddingLeft: 12, fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              QUẢN LÝ – VẬN HÀNH
            </div>
          )}

          {/* MENU NHÂN SỰ (ĐẦU MỤC LỚN - CÓ 2 MỤC NHỎ CON) */}
          <div>
            <button
              onClick={() => {
                setIsHrMenuOpen(!isHrMenuOpen);
                if (activeTab !== 'hr-management') {
                  setActiveTab('hr-management');
                }
              }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
                backgroundColor: activeTab === 'hr-management' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
                color: activeTab === 'hr-management' ? '#ff7043' : '#94a3b8',
                border: activeTab === 'hr-management' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Users style={{ width: 17, height: 17, color: activeTab === 'hr-management' ? '#ff7043' : 'inherit' }} />
                {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>NHÂN SỰ</span>}
              </div>
              {!isSidebarCollapsed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    backgroundColor: activeTab === 'hr-management' ? 'rgba(255, 87, 34, 0.3)' : '#1e293b',
                    color: activeTab === 'hr-management' ? '#ffccbc' : '#94a3b8',
                    fontSize: '0.68rem', padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', fontWeight: 700
                  }}>2</span>
                  <ChevronDown style={{ width: 14, height: 14, transform: isHrMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>
              )}
            </button>

            {/* 2 MỤC NHỎ TRONG NHÂN SỰ */}
            {isHrMenuOpen && !isSidebarCollapsed && (
              <div style={{ marginLeft: 20, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '1px solid rgba(255, 87, 34, 0.4)', paddingLeft: 12 }}>

                {/* MỤC NHỎ 1: QUẢN LÝ NHÂN SỰ */}
                <button
                  onClick={() => { setActiveTab('hr-management'); setHrSubTab('staff-list'); setIsMobileMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (activeTab === 'hr-management' && hrSubTab === 'staff-list') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (activeTab === 'hr-management' && hrSubTab === 'staff-list') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (activeTab === 'hr-management' && hrSubTab === 'staff-list') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <UserCheck style={{ width: 14, height: 14, color: '#38bdf8' }} />
                    Quản lý nhân sự
                  </span>
                </button>

                {/* MỤC NHỎ 2: THỜI GIAN LÀM VIỆC (CÓ 2 ĐẦU MỤC CON: HÀNH CHÍNH & NGOÀI GIỜ) */}
                <div>
                  <button
                    onClick={() => {
                      setIsWorkTimeMenuOpen(!isWorkTimeMenuOpen);
                      if (activeTab !== 'hr-management' || hrSubTab !== 'work-time') {
                        setActiveTab('hr-management');
                        setHrSubTab('work-time');
                      }
                    }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', borderRadius: 8,
                      border: '1px solid transparent',
                      backgroundColor: (activeTab === 'hr-management' && hrSubTab === 'work-time') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      color: (activeTab === 'hr-management' && hrSubTab === 'work-time') ? '#38bdf8' : '#94a3b8',
                      fontSize: '0.78rem', fontWeight: (activeTab === 'hr-management' && hrSubTab === 'work-time') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Clock style={{ width: 14, height: 14, color: '#38bdf8' }} />
                      Thời gian làm việc
                    </span>
                    <ChevronDown style={{ width: 13, height: 13, transform: isWorkTimeMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>

                  {/* 2 ĐẦU MỤC CON CỦA THỜI GIAN LÀM VIỆC */}
                  {isWorkTimeMenuOpen && (
                    <div style={{ marginLeft: 16, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3, borderLeft: '1px solid rgba(56, 189, 248, 0.3)', paddingLeft: 10 }}>
                      <button
                        onClick={() => { setActiveTab('hr-management'); setHrSubTab('work-time'); setWorkTimeType('admin'); setIsMobileMenuOpen(false); }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (activeTab === 'hr-management' && hrSubTab === 'work-time' && workTimeType === 'admin') ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                          color: (activeTab === 'hr-management' && hrSubTab === 'work-time' && workTimeType === 'admin') ? '#38bdf8' : '#cbd5e1',
                          fontSize: '0.74rem', fontWeight: (activeTab === 'hr-management' && hrSubTab === 'work-time' && workTimeType === 'admin') ? 800 : 400, cursor: 'pointer'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Building2 style={{ width: 13, height: 13, color: '#38bdf8' }} />
                          Hành chính
                        </span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('hr-management'); setHrSubTab('work-time'); setWorkTimeType('ot'); setIsMobileMenuOpen(false); }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (activeTab === 'hr-management' && hrSubTab === 'work-time' && workTimeType === 'ot') ? 'rgba(251, 146, 60, 0.2)' : 'transparent',
                          color: (activeTab === 'hr-management' && hrSubTab === 'work-time' && workTimeType === 'ot') ? '#fb923c' : '#cbd5e1',
                          fontSize: '0.74rem', fontWeight: (activeTab === 'hr-management' && hrSubTab === 'work-time' && workTimeType === 'ot') ? 800 : 400, cursor: 'pointer'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Moon style={{ width: 13, height: 13, color: '#fb923c' }} />
                          Ngoài giờ
                        </span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* 4. LỊCH MENU (ĐẦU MỤC LỚN - MÀU CAM KHI CHỌN) */}
          <div>
            <button
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
                if (activeTab !== 'calendar-talk') {
                  setActiveTab('calendar-talk');
                }
              }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
                backgroundColor: activeTab === 'calendar-talk' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
                color: activeTab === 'calendar-talk' ? '#ff7043' : '#94a3b8',
                border: activeTab === 'calendar-talk' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CalendarIcon style={{ width: 17, height: 17, color: activeTab === 'calendar-talk' ? '#ff7043' : 'inherit' }} />
                {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>LỊCH</span>}
              </div>
              {!isSidebarCollapsed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    backgroundColor: activeTab === 'calendar-talk' ? 'rgba(255, 87, 34, 0.3)' : '#1e293b',
                    color: activeTab === 'calendar-talk' ? '#ffccbc' : '#94a3b8',
                    fontSize: '0.68rem', padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', fontWeight: 700
                  }}>3</span>
                  <ChevronDown style={{ width: 14, height: 14, transform: isCalendarOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>
              )}
            </button>

            {/* ĐẦU MỤC NHỎ TRONG LỊCH (ẨN CHỈ SỐ) */}
            {isCalendarOpen && !isSidebarCollapsed && (
              <div style={{ marginLeft: 20, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '1px solid rgba(255, 87, 34, 0.4)', paddingLeft: 12 }}>
                <button
                  onClick={() => { setActiveTab('calendar-talk'); setIsMobileMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: activeTab === 'calendar-talk' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activeTab === 'calendar-talk' ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: activeTab === 'calendar-talk' ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MessageSquare style={{ width: 14, height: 14, color: '#38bdf8' }} />
                    Lịch trao đổi
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* 5. ĐƠN HÀNG MENU (ĐẦU MỤC LỚN - MÀU CAM KHI CHỌN) */}
          <div>
            <button
              onClick={() => {
                setIsOrdersOpen(!isOrdersOpen);
                setSelectedHub('ALL');
                setActiveTab('orders');
              }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
                backgroundColor: activeTab === 'orders' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
                color: activeTab === 'orders' ? '#ff7043' : '#94a3b8',
                border: activeTab === 'orders' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Package style={{ width: 17, height: 17, color: activeTab === 'orders' ? '#ff7043' : 'inherit' }} />
                {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>ĐƠN HÀNG</span>}
              </div>
              {!isSidebarCollapsed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    backgroundColor: activeTab === 'orders' ? 'rgba(255, 87, 34, 0.3)' : '#1e293b',
                    color: activeTab === 'orders' ? '#ffccbc' : '#94a3b8',
                    fontSize: '0.68rem', padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', fontWeight: 700
                  }}>{orders.length}</span>
                  <ChevronDown style={{ width: 14, height: 14, transform: isOrdersOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>
              )}
            </button>

            {isOrdersOpen && !isSidebarCollapsed && (
              <div style={{ marginLeft: 20, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '1px solid rgba(255, 87, 34, 0.4)', paddingLeft: 12 }}>
                {/* 1. CỤM ĐẦU MỐI TĂNG CƯỜNG (LÊN TRÊN CÙNG) */}
                <div>
                  <button
                    onClick={() => setIsDauMoiTangCuongOpen(!isDauMoiTangCuongOpen)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', borderRadius: 8, border: '1px solid transparent',
                      backgroundColor: 'transparent', color: '#ff7043', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.03em' }}>
                      <ShieldCheck style={{ width: 14, height: 14, color: '#38bdf8' }} /> TĂNG CƯỜNG
                    </span>
                    <ChevronDown style={{ width: 12, height: 12, color: '#ff7043', transform: isDauMoiTangCuongOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                  {isDauMoiTangCuongOpen && (
                    <div style={{ marginLeft: 10, marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2, borderLeft: '1px solid rgba(56, 189, 248, 0.4)', paddingLeft: 8, fontSize: '0.74rem' }}>
                      {/* Đầu Mối 0 */}
                      <button
                        onClick={() => handleSelectHubFromSidebar('HUB_0')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'HUB_0' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'HUB_0' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'HUB_0' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ShieldCheck style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 0
                        </span>
                      </button>

                      {/* Đầu Mối 8 */}
                      <button
                        onClick={() => handleSelectHubFromSidebar('HUB_8')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'HUB_8' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'HUB_8' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'HUB_8' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Zap style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 8
                        </span>
                      </button>

                      {/* Đầu Mối 9 */}
                      <button
                        onClick={() => handleSelectHubFromSidebar('HUB_9')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'HUB_9' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'HUB_9' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'HUB_9' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Layers style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 9
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Đầu mối 2.2 (Phụ trách hạ tầng cứng & máy móc thiết bị - Vị trí trên Đầu mối 5.1B) */}
                <button
                  onClick={() => handleSelectHubFromSidebar('HUB_2.2')}
                  title="Đầu Mối 2.2: Phụ trách về hạ tầng cứng, máy móc thiết bị để phục vụ các đầu mối khác"
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (selectedHub === 'HUB_2.2' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (selectedHub === 'HUB_2.2' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (selectedHub === 'HUB_2.2' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Building2 style={{ width: 14, height: 14, color: '#38bdf8' }} /> Đầu mối 2.2
                  </span>
                </button>

                {/* 3. Đầu mối 5.1B */}
                <button
                  onClick={() => handleSelectHubFromSidebar('5.1B')}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (selectedHub === '5.1B' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (selectedHub === '5.1B' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (selectedHub === '5.1B' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin style={{ width: 14, height: 14, color: '#38bdf8' }} /> Đầu mối 5.1B
                  </span>
                </button>

                {/* 3. Đầu mối Kiến */}
                <button
                  onClick={() => handleSelectHubFromSidebar('KIEN')}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (selectedHub === 'KIEN' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (selectedHub === 'KIEN' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (selectedHub === 'KIEN' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Navigation style={{ width: 14, height: 14, color: '#38bdf8' }} /> Đầu mối Kiến
                  </span>
                </button>

                {/* 4. Đầu mối # */}
                <button
                  onClick={() => handleSelectHubFromSidebar('HASH')}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (selectedHub === 'HASH' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (selectedHub === 'HASH' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (selectedHub === 'HASH' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Hash style={{ width: 14, height: 14, color: '#38bdf8' }} /> Đầu mối #
                  </span>
                </button>

                {/* 5. Cụm Đầu Mối Nhà Sản (Accordion Nhánh Con) */}
                <div>
                  <button
                    onClick={() => setIsNhaSanOpen(!isNhaSanOpen)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', borderRadius: 8, border: '1px solid transparent',
                      backgroundColor: 'transparent', color: '#ff7043', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.03em' }}>
                      <Warehouse style={{ width: 14, height: 14, color: '#38bdf8' }} /> NHÀ SẢN
                    </span>
                    <ChevronDown style={{ width: 12, height: 12, color: '#ff7043', transform: isNhaSanOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                  {isNhaSanOpen && (
                    <div style={{ marginLeft: 10, marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2, borderLeft: '1px solid rgba(56, 189, 248, 0.4)', paddingLeft: 8, fontSize: '0.74rem' }}>
                      <button
                        onClick={() => handleSelectHubFromSidebar('HUB_2.1')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'HUB_2.1' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'HUB_2.1' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'HUB_2.1' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <PenTool style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 2.1
                        </span>
                      </button>
                      <button
                        onClick={() => handleSelectHubFromSidebar('NHASAN_3.1')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'NHASAN_3.1' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'NHASAN_3.1' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'NHASAN_3.1' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Cpu style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 3.1
                        </span>
                      </button>
                      <button
                        onClick={() => handleSelectHubFromSidebar('NHASAN_3.2')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'NHASAN_3.2' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'NHASAN_3.2' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'NHASAN_3.2' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Palette style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 3.2
                        </span>
                      </button>
                      <button
                        onClick={() => handleSelectHubFromSidebar('NHASAN_6')}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', borderRadius: 6,
                          border: '1px solid transparent',
                          backgroundColor: (selectedHub === 'NHASAN_6' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                          color: (selectedHub === 'NHASAN_6' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                          fontSize: '0.74rem', fontWeight: (selectedHub === 'NHASAN_6' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Scale style={{ width: 13, height: 13, color: '#38bdf8' }} /> Đầu mối 6
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 6. Đầu mối 1 */}
                <button
                  onClick={() => handleSelectHubFromSidebar('HUB_1')}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (selectedHub === 'HUB_1' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (selectedHub === 'HUB_1' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (selectedHub === 'HUB_1' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Box style={{ width: 14, height: 14, color: '#38bdf8' }} /> Đầu mối 1
                  </span>
                </button>

                {/* 7. Đầu mối 5.1T */}
                <button
                  onClick={() => handleSelectHubFromSidebar('5.1T')}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '7px 10px', borderRadius: 8,
                    border: '1px solid transparent',
                    backgroundColor: (selectedHub === '5.1T' && activeTab === 'orders') ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: (selectedHub === '5.1T' && activeTab === 'orders') ? '#38bdf8' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: (selectedHub === '5.1T' && activeTab === 'orders') ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Send style={{ width: 14, height: 14, color: '#38bdf8' }} /> Đầu mối 5.1T
                  </span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => { setActiveTab('documents'); setIsMobileMenuOpen(false); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
              backgroundColor: activeTab === 'documents' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
              color: activeTab === 'documents' ? '#ff7043' : '#94a3b8',
              border: activeTab === 'documents' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileText style={{ width: 17, height: 17, color: activeTab === 'documents' ? '#ff7043' : 'inherit' }} />
              {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>ĐƠN TỪ</span>}
            </div>
            {!isSidebarCollapsed && <span style={{ backgroundColor: activeTab === 'documents' ? 'rgba(255, 87, 34, 0.3)' : '#1e293b', color: activeTab === 'documents' ? '#ffccbc' : '#94a3b8', fontSize: '0.68rem', padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', fontWeight: 700 }}>0</span>}
          </button>

          <button
            onClick={() => { setActiveTab('hr'); setIsMobileMenuOpen(false); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12,
              backgroundColor: activeTab === 'hr' ? 'rgba(255, 87, 34, 0.14)' : 'transparent',
              color: activeTab === 'hr' ? '#ff7043' : '#94a3b8',
              border: activeTab === 'hr' ? '1px solid rgba(255, 87, 34, 0.3)' : '1px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Users style={{ width: 17, height: 17, color: activeTab === 'hr' ? '#ff7043' : 'inherit' }} />
              {!isSidebarCollapsed && <span style={{ fontWeight: 700, letterSpacing: '0.03em' }}>NHÂN SỰ</span>}
            </div>
            {!isSidebarCollapsed && <span style={{ backgroundColor: activeTab === 'hr' ? 'rgba(255, 87, 34, 0.3)' : '#1e293b', color: activeTab === 'hr' ? '#ffccbc' : '#94a3b8', fontSize: '0.68rem', padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', fontWeight: 700 }}>{hrStaffList.length}</span>}
          </button>
        </nav>

        {/* SIDEBAR FOOTER: COLLAPSE BUTTON AT THE BOTTOM */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d1017'
        }}>
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 10,
              backgroundColor: '#161b26',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 700,
              transition: 'all 0.2s ease'
            }}
          >
            <PanelLeftOpen style={{ width: 16, height: 16, transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            {!isSidebarCollapsed && <span>Thu gọn</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div className="main-content-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, backgroundColor: '#0b0e14' }}>
        {/* MOBILE HEADER BAR (CỐ ĐỊNH IMMOVABLE STICKY TOP 0 Z-INDEX 99999) */}
        <div className="mobile-header-bar mobile-only" style={{ position: 'sticky', top: 0, zIndex: 99999, backgroundColor: '#0b0f19', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="mobile-menu-toggle-btn hide-on-mobile"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
            <img src="/logo.png" alt="AVG ONE Logo" style={{ height: 26, objectFit: 'contain', marginLeft: 10 }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* NÚT QUAY LẠI GIAO DIỆN MÁY TÍNH (ẨN Ở CHẾ ĐỘ MOBILE) */}
            <button
              className="hide-on-mobile"
              onClick={() => {
                setIsMobileMode(false);
                setIsMobileMenuOpen(false);
                showToast('💻 Đã trở về Giao diện Máy tính (Desktop)');
              }}
              style={{
                padding: '6px 12px', borderRadius: 8,
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)',
                fontSize: '0.74rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', gap: 6,
                cursor: 'pointer'
              }}
              title="Quay lại Giao diện Máy tính"
            >
              <Monitor style={{ width: 14, height: 14, color: '#38bdf8' }} />
              <span>Máy tính</span>
            </button>

            {/* NÚT RESET / ĐỒNG BỘ HỆ THỐNG TRÊN MOBILE */}
            <button
              onClick={handleResetSystem}
              disabled={isResetting}
              title="Reset hệ thống & Cập nhật bản Build mới nhất"
              style={{
                padding: 7, borderRadius: 8, backgroundColor: '#161b26',
                border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s'
              }}
            >
              <RefreshCw style={{ width: 15, height: 15, opacity: isResetting ? 0.5 : 1, transform: isResetting ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s' }} />
            </button>

            {/* NÚT CHAT TRÊN MOBILE */}
            <button
              onClick={() => {
                if ((!activeConvId || !zaloConversations.some(c => c.id === activeConvId)) && zaloConversations.length > 0) {
                  setActiveConvId(zaloConversations[0].id);
                }
                setIsChatOpen(!isChatOpen);
              }}
              title="Mở cửa sổ Chat AVG One"
              style={{
                padding: '6px 12px', borderRadius: 8,
                backgroundColor: isChatOpen ? '#0284c7' : 'rgba(56, 189, 248, 0.15)',
                color: isChatOpen ? '#ffffff' : '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.74rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <MessageSquare style={{ width: 14, height: 14 }} /> Chat
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                padding: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
              title="Đổi Giao Diện Sáng / Tối"
            >
              {theme === 'dark' ? <Sun style={{ width: 18, height: 18, color: '#f59e0b' }} /> : <Moon style={{ width: 18, height: 18, color: '#38bdf8' }} />}
            </button>
            <button
              onClick={() => showToast('🔔 Bạn không có thông báo mới')}
              style={{
                padding: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer'
              }}
              title="Thông Báo"
            >
              <Bell style={{ width: 18, height: 18, color: '#38bdf8' }} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ff5722' }} />
            </button>
          </div>
        </div>

        {/* DESKTOP HEADER BAR (CỐ ĐỊNH PINNED FIXED TOP 0 Z-INDEX 9999) */}
        <header className="desktop-only" style={{
          height: 64, padding: '0 24px', backgroundColor: '#0b0f19', borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 9999,
          backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 1. TÌM KIẾM CÓ GỢI Ý (SEARCH AUTO-COMPLETE & SUGGESTIONS) */}
            <div style={{ position: 'relative' }}>
              <Search style={{ width: 15, height: 15, color: '#64748b', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng, mã đơn, đầu mối..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: 280, backgroundColor: 'rgba(22, 27, 38, 0.9)', border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: 10, padding: '7px 12px 7px 36px', fontSize: '0.78rem', color: '#fff', outline: 'none'
                }}
              />

              {/* POP-OVER GỢI Ý TÌM KIẾM */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div style={{
                  position: 'absolute', top: 44, left: 0, width: 340, backgroundColor: '#111827',
                  border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: 14, padding: 12,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 8
                }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    🔍 Gợi ý tìm kiếm phù hợp:
                  </div>

                  {orders.filter(o => o.title.toLowerCase().includes(searchQuery.toLowerCase()) || o.orderCode.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(o => (
                    <div
                      key={o.id}
                      onMouseDown={() => {
                        setActiveTab('orders');
                        setSearchQuery(o.orderCode);
                      }}
                      style={{ padding: '6px 10px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span style={{ fontSize: '0.76rem', color: '#fff', fontWeight: 700 }}>📦 {o.orderCode} - {o.title.slice(0, 22)}...</span>
                      <span style={{ fontSize: '0.64rem', color: '#38bdf8', fontWeight: 800 }}>{o.department}</span>
                    </div>
                  ))}

                  {discussionEvents.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(d => (
                    <div
                      key={d.id}
                      onMouseDown={() => {
                        setActiveTab('calendar-talk');
                        setSearchQuery('');
                      }}
                      style={{ padding: '6px 10px', borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span style={{ fontSize: '0.76rem', color: '#fff', fontWeight: 700 }}>🗓️ {d.title.slice(0, 24)}...</span>
                      <span style={{ fontSize: '0.64rem', color: '#34d399', fontWeight: 800 }}>{d.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* 2. NÚT RESET HỆ THỐNG (CHỈ ĐỂ ICON) */}
            <button
              onClick={handleResetSystem}
              disabled={isResetting}
              title="Reset hệ thống & Cập nhật bản Build mới nhất"
              style={{
                padding: 8, borderRadius: 10, backgroundColor: '#161b26',
                border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s'
              }}
            >
              <RefreshCw style={{ width: 16, height: 16, opacity: isResetting ? 0.5 : 1, transform: isResetting ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s' }} />
            </button>

            {/* 3. TÍNH NĂNG CHAT */}
            <button
              onClick={() => {
                if ((!activeConvId || !zaloConversations.some(c => c.id === activeConvId)) && zaloConversations.length > 0) {
                  setActiveConvId(zaloConversations[0].id);
                }
                setIsChatOpen(!isChatOpen);
              }}
              title="Mở cửa sổ Chat AVG One"
              style={{
                padding: '7px 14px', borderRadius: 10,
                backgroundColor: isChatOpen ? '#0284c7' : 'rgba(56, 189, 248, 0.15)',
                color: isChatOpen ? '#ffffff' : '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.78rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <MessageSquare style={{ width: 15, height: 15 }} /> Chat
            </button>

            {/* 3.5. NÚT CHUYỂN ĐỔI CHẾ ĐỘ XEM MOBILE (PREVIEW DIRECTLY ON DESKTOP) */}
            <button
              onClick={() => {
                const nextMode = !isMobileMode;
                setIsMobileMode(nextMode);
                showToast(nextMode ? '📱 Đã kích hoạt Giao diện Mobile Di động' : '💻 Đã về Giao diện Desktop');
              }}
              title="Chuyển đổi trực tiếp giữa Giao diện Mobile và Desktop"
              style={{
                padding: '7px 14px', borderRadius: 10,
                backgroundColor: isMobileMode ? 'rgba(255, 87, 34, 0.25)' : 'rgba(56, 189, 248, 0.15)',
                color: isMobileMode ? '#ff7043' : '#38bdf8',
                border: isMobileMode ? '1px solid #ff7043' : '1px solid rgba(56, 189, 248, 0.4)',
                fontSize: '0.78rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <Phone style={{ width: 15, height: 15 }} />
              <span>{isMobileMode ? '💻 GIỜ LÀ DESKTOP' : '📱 GIAO DIỆN MOBILE'}</span>
            </button>

            {/* 4. THÔNG BÁO LỊCH TRAO ĐỔI & HỆ THỐNG (ĐỒNG BỘ MÀU VỚI HỘP CHAT) */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                title="Xem danh sách thông báo"
                style={{
                  padding: 8, borderRadius: 10,
                  backgroundColor: isNotificationOpen ? '#0284c7' : 'rgba(56, 189, 248, 0.15)',
                  color: isNotificationOpen ? '#ffffff' : '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <Bell style={{ width: 16, height: 16 }} />
                {unreadNotificationsCount > 0 && (
                  <span style={{
                    padding: '1px 5px', borderRadius: 10, backgroundColor: '#ef4444', color: '#fff',
                    fontSize: '0.6rem', fontWeight: 900, position: 'absolute', top: -4, right: -4
                  }}>
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* DROPDOWN POP-OVER THÔNG BÁO (ĐỒNG BỘ MÀU VỚI KHUNG CHAT) */}
              {isNotificationOpen && (
                <div style={{
                  position: 'absolute', top: 44, right: 0, width: 360, backgroundColor: '#0b0f19',
                  border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: 16, padding: 14,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.85), 0 0 20px rgba(56, 189, 248, 0.15)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: 10 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Bell style={{ width: 15, height: 15 }} /> THÔNG BÁO
                    </span>
                    <button
                      onClick={() => {
                        const allRead: Record<string, boolean> = {};
                        calculatedNotifications.forEach(n => allRead[n.id] = true);
                        setReadNotificationIds(allRead);
                        showToast('✅ Đã đánh dấu đọc tất cả thông báo');
                      }}
                      style={{ fontSize: '0.68rem', color: '#38bdf8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontWeight: 700 }}
                    >
                      Đọc tất cả
                    </button>
                  </div>

                  <div style={{ maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {calculatedNotifications.length === 0 ? (
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>
                        🎉 Không có thông báo họp mới trong vòng 24 giờ tới.
                      </div>
                    ) : (
                      calculatedNotifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => setReadNotificationIds(prev => ({ ...prev, [n.id]: true }))}
                          style={{
                            padding: '10px 12px', borderRadius: 10, backgroundColor: n.bgStyle,
                            border: `1px solid ${n.badgeColor}40`, opacity: readNotificationIds[n.id] ? 0.6 : 1,
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.64rem', fontWeight: 900, color: n.badgeColor, backgroundColor: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: 6 }}>
                              {n.badgeLabel}
                            </span>
                            <span style={{ fontSize: '0.66rem', color: '#cbd5e1', fontWeight: 700 }}>
                              {n.dateStr} lúc {n.timeStr}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff' }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
                            {n.timeRemainingText}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button style={{
              padding: '7px 16px', borderRadius: 10, background: 'linear-gradient(135deg, #ea580c, #f97316)', color: '#ffffff',
              fontSize: '0.78rem', fontWeight: 800, border: 'none', boxShadow: '0 4px 14px rgba(249, 115, 22, 0.35)',
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'
            }}>
              <LogIn style={{ width: 15, height: 15 }} /> Đăng Nhập SSO
            </button>
          </div>
        </header>

        {/* WORKSPACE PAGE BODY */}
        <main style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1440, margin: '0 auto', width: '100%' }}>
          {activeTab === 'orders' && (
            <div className="orders-main-container" style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
              
              {/* ========================================================================= */}
              {/* CASE A: GIAO DIỆN TỔNG (SELECTED HUB === 'ALL') */}
              {/* ========================================================================= */}
              {selectedHub === 'ALL' ? (
                <>
                  {/* 1. EXECUTIVE BANNER CARD FOR OVERALL ORDERS MANAGEMENT (ĐỒNG BỘ THEME LỊCH) */}
                  <div className="orders-executive-banner" style={{
                    background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.7), rgba(14, 165, 233, 0.35), rgba(11, 15, 25, 0.95))',
                    borderRadius: 24,
                    padding: '28px 34px',
                    border: '1px solid #38bdf8',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 24
                  }}>
                    {/* LEFT MAIN CONTENT */}
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                      {/* BADGES ROW */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{
                          backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)',
                          color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, padding: '4px 14px', borderRadius: 20,
                          display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.04em'
                        }}>
                          🌐 GIAO DIỆN TỔNG QUẢN LÝ
                        </span>
                        <span style={{
                          backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)',
                          color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, padding: '4px 14px', borderRadius: 20,
                          display: 'flex', alignItems: 'center', gap: 6
                        }}>
                          ⚡ TOÀN BỘ 8 ĐẦU MỐI VẬN HÀNH
                        </span>
                      </div>

                      {/* TITLE & DESCRIPTION */}
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                          AVG ONE GLOBAL DASHBOARD
                        </div>
                        <h1 className="orders-banner-title" style={{ fontSize: '2.3rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.02em', lineHeight: 1.15 }}>
                          GIAO DIỆN TỔNG QUẢN LÝ ĐƠN HÀNG
                        </h1>
                      </div>
                      
                      {/* DESCRIPTION SUB-BOX (GIỐNG HỆT BOX NỘI DUNG MÔ TẢ CỦA LỊCH) */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '6px 14px', borderRadius: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(56, 189, 248, 0.3)',
                        backdropFilter: 'blur(6px)', width: 'fit-content'
                      }}>
                        <span style={{ fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 600, lineHeight: 1.4 }}>
                          Bảng điều hành tổng thể theo dõi, phân luồng và tổng hợp tiến độ xử lý đơn hàng liên thông 13 bước việc trên toàn bộ các Đầu mối.
                        </span>
                      </div>

                      {/* 4 SUMMARY METRIC CARDS FOR GLOBAL VIEW */}
                      <div className="orders-metrics-grid" style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6, flexWrap: 'wrap' }}>
                        {/* CARD 1: TỔNG ĐƠN HÀNG */}
                        <div style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)',
                          backdropFilter: 'blur(10px)', borderRadius: 14, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12
                        }}>
                          <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                            <Package style={{ width: 18, height: 18, color: '#38bdf8' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{orders.length}</div>
                            <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>TỔNG ĐƠN HÀNG</div>
                          </div>
                        </div>

                        {/* CARD 2: KHẨN / TRỌNG ĐIỂM */}
                        <div style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)',
                          backdropFilter: 'blur(10px)', borderRadius: 14, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12
                        }}>
                          <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                            <Zap style={{ width: 18, height: 18, color: '#38bdf8' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                              {orders.filter(o => o.orderStatus === 'TRỌNG ĐIỂM' || o.orderStatus === 'KHẨN CẤP').length}
                            </div>
                            <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>TRỌNG ĐIỂM / KHẨN</div>
                          </div>
                        </div>

                        {/* CARD 3: ĐANG XỬ LÝ */}
                        <div style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)',
                          backdropFilter: 'blur(10px)', borderRadius: 14, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12
                        }}>
                          <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                            <Clock style={{ width: 18, height: 18, color: '#38bdf8' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                              {orders.filter(o => o.status === 'IN_PROGRESS' || o.status === 'REVIEW').length}
                            </div>
                            <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>ĐANG THỰC HIỆN</div>
                          </div>
                        </div>

                        {/* CARD 4: HOÀN THÀNH */}
                        <div style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(52, 211, 153, 0.35)',
                          backdropFilter: 'blur(10px)', borderRadius: 14, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12
                        }}>
                          <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(52, 211, 153, 0.2)' }}>
                            <CheckCircle2 style={{ width: 18, height: 18, color: '#34d399' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                              {orders.filter(o => o.status === 'DONE').length}
                            </div>
                            <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>ĐÃ HOÀN THÀNH</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT GRAPHIC DECORATION */}
                    <div className="orders-graphic-decor" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        width: 130, height: 130, borderRadius: 26,
                        background: 'linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(2,132,199,0.3) 100%)',
                        border: '1px solid #38bdf8', backdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
                      }}>
                        <Globe style={{ width: 52, height: 52, color: '#38bdf8' }} />
                        <div style={{ position: 'absolute', top: -10, right: -10, backgroundColor: '#0284c7', color: '#fff', padding: 8, borderRadius: 12, border: '2px solid #0f172a' }}>
                          <Zap style={{ width: 16, height: 16 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. QUICK HUB SELECTOR FILTER BAR FOR GLOBAL VIEW (STICKY PINNED TOP 64 Z-INDEX 999) */}
                  <div className="orders-hub-selector" style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: 16,
                    padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, overflowX: 'auto',
                    position: 'sticky', top: 64, zIndex: 999, backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                  }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Filter style={{ width: 14, height: 14 }} /> Chuyển Sang Đầu Mối Độc Lập:
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                      {[
                        { key: 'HUB_0', label: '👑 HUB 0 - Ban Giám Đốc' },
                        { key: 'HUB_1', label: '💰 HUB 1 - Tài Chính' },
                        { key: 'HUB_2.1', label: '👥 HUB 2.1 - Nhân Sự' },
                        { key: 'HUB_2.2', label: '🖥️ HUB 2.2 - Hạ Tầng' },
                        { key: '5.1B', label: '📥 5.1B - Đầu Vào' },
                        { key: '5.1T', label: '📤 5.1T - Đầu Ra' },
                        { key: 'HUB_8', label: '🎓 HUB 8 - Cố Vấn' },
                        { key: 'HUB_9', label: '🏛️ HUB 9 - VP HĐQT' }
                      ].map(hubItem => (
                        <button
                          key={hubItem.key}
                          onClick={() => setSelectedHub(hubItem.key as any)}
                          style={{
                            padding: '7px 14px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#94a3b8',
                            border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer', transition: 'all 0.18s ease'
                          }}
                        >
                          {hubItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* ========================================================================= */
                /* CASE B: GIAO DIỆN ĐỘC LẬP CHO TỪNG ĐẦU MỐI CỤ THỂ (SELECTED HUB !== 'ALL') */
                /* ========================================================================= */
                (() => {
                  const hubMeta = HUB_MAP[selectedHub] || HUB_MAP.ALL;
                  const currentHubOrders = orders.filter(o => o.department === selectedHub || o.department?.includes(selectedHub));
                  return (
                    <>
                      {/* TOP ACTION NAV BAR WITH BACK BUTTON */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => { setSelectedHub('ALL'); showToast('🌐 Đã trở về Giao diện Tổng'); }}
                          style={{
                            padding: '10px 20px', borderRadius: 12,
                            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.3) 0%, rgba(14, 165, 233, 0.2) 100%)',
                            color: '#38bdf8', border: '1px solid #38bdf8', fontSize: '0.82rem', fontWeight: 800,
                            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                          }}
                        >
                          ⬅️ Quay Về Giao Diện Tổng
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>Đang xem Giao diện độc lập:</span>
                          <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontSize: '0.74rem', fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>
                            {hubMeta.name}
                          </span>
                        </div>
                      </div>

                      {/* INDEPENDENT SUB-HUB BANNER (ĐỒNG BỘ THEME LỊCH) */}
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.7), rgba(14, 165, 233, 0.35), rgba(11, 15, 25, 0.95))',
                        borderRadius: 24, padding: '28px 34px', border: '1px solid #38bdf8',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)', position: 'relative', overflow: 'hidden',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24
                      }}>
                        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, padding: '4px 14px', borderRadius: 20 }}>
                              🎯 GIAO DIỆN ĐẦU MỐI ĐỘC LẬP
                            </span>
                            <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, padding: '4px 14px', borderRadius: 20 }}>
                              ⚡ {currentHubOrders.length} Đơn Hàng Tại Đầu Mối
                            </span>
                          </div>

                          <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                              SUB-HUB DEDICATED WORKSPACE
                            </div>
                            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.02em' }}>
                              {hubMeta.name.toUpperCase()}
                            </h1>
                          </div>
                          
                          {/* DESCRIPTION SUB-BOX */}
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '6px 14px', borderRadius: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(56, 189, 248, 0.3)',
                            backdropFilter: 'blur(6px)', width: 'fit-content'
                          }}>
                            <span style={{ fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 600, lineHeight: 1.4 }}>
                              {hubMeta.description || 'Giao diện tác nghiệp và quản lý đơn hàng chuyên sâu độc lập dành riêng cho đầu mối.'}
                            </span>
                          </div>

                          {/* 4 DEDICATED SUB-HUB METRIC STAT CARDS */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4, flexWrap: 'wrap' }}>
                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Package style={{ width: 16, height: 16, color: '#38bdf8' }} />
                              <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{currentHubOrders.length}</div>
                                <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>ĐƠN TẠI ĐẦU MỐI</div>
                              </div>
                            </div>

                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Zap style={{ width: 16, height: 16, color: '#38bdf8' }} />
                              <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                  {currentHubOrders.filter(o => o.orderStatus === 'TRỌNG ĐIỂM' || o.orderStatus === 'KHẨN CẤP').length}
                                </div>
                                <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginTop: 2 }}>KHẨN / TRỌNG ĐIỂM</div>
                              </div>
                            </div>

                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Clock style={{ width: 16, height: 16, color: '#38bdf8' }} />
                              <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                  {currentHubOrders.filter(o => o.status === 'IN_PROGRESS' || o.status === 'REVIEW').length}
                                </div>
                                <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>ĐANG THỰC HIỆN</div>
                              </div>
                            </div>

                            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(52, 211, 153, 0.35)', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                              <CheckCircle2 style={{ width: 16, height: 16, color: '#34d399' }} />
                              <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                  {currentHubOrders.filter(o => o.status === 'DONE').length}
                                </div>
                                <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginTop: 2 }}>ĐÃ HOÀN THÀNH</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT GRAPHIC ICON FOR SUB-HUB */}
                        <div style={{
                          width: 110, height: 110, borderRadius: 24,
                          background: 'linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(2,132,199,0.3) 100%)',
                          border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem'
                        }}>
                          {hubMeta.icon}
                        </div>
                      </div>
                    </>
                  );
                })()
              )}

              {/* 3. TOP VISUALIZER BAR: 13 BƯỚC VIỆC LIÊN THÔNG */}
              <Workflow13Visualizer
                orders={orders}
                selectedStep={selectedStepFilter}
                onSelectStep={(stepNum) => setSelectedStepFilter(stepNum)}
              />

              {/* 4. DEDICATED HUB WORKSPACE COMPONENT (KANBAN & TABLE VIEW CHO ĐẦU MỐI) */}
              <HubWorkspaceComponent
                hubKey={selectedHub}
                orders={selectedStepFilter !== null ? orders.filter(o => ((o as any).currentStep || 1) === selectedStepFilter) : orders}
                users={users}
                onCreateOrderClick={() => {
                  setNewOrderDepartment(selectedHub === 'ALL' ? '5.1B' : selectedHub);
                  setIsOrderModalOpen(true);
                }}
                onTransferOrderClick={handleOpenTransferModal}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onDeleteOrder={handleDeleteOrder}
                onAdvanceStep={handleAdvanceStep}
                onUpdateDocumentUrl={handleUpdateOrderDocUrl}
              />

            </div>
          )}

          {/* TAB 2: LỊCH TRAO ĐỔI & LỊCH LÀM THÊM */}
          {(activeTab === 'calendar-talk' || activeTab === 'calendar-ot') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* BANNER GLASS PANEL (TONE MÀU NEON GLOW CHUẨN MẶC ĐỊNH, ẨN TOÀN BỘ NÚT CHỌN PHƯƠNG ÁN MÀU) */}
              {(() => {
                const neonGrad = {
                  bg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.7), rgba(14, 165, 233, 0.35), rgba(11, 15, 25, 0.95))',
                  border: '1px solid #38bdf8',
                  subBoxBg: 'linear-gradient(135deg, #0f172a, #0b0f19)',
                  subBoxBorder: '1px solid rgba(56, 189, 248, 0.35)'
                };

                return (
                  <div className="calendar-banner-header" style={{
                    background: neonGrad.bg,
                    border: neonGrad.border, borderRadius: 24, padding: 24,
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16,
                    textAlign: 'center', backdropFilter: 'blur(16px)', transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', width: '100%' }}>
                        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.02em', margin: 0, textTransform: 'uppercase', textAlign: 'center' }}>
                          LỊCH TRAO ĐỔI
                        </h1>
                      </div>

                      {/* 1. HỘP NHỎ CHO NỘI DUNG MÔ TẢ */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '8px 16px', borderRadius: 12,
                        backgroundColor: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(56, 189, 248, 0.35)',
                        backdropFilter: 'blur(6px)', width: 'fit-content', textAlign: 'center'
                      }}>
                        <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, lineHeight: 1.4, textAlign: 'center' }}>
                          Quản lý và theo dõi các cuộc trao đổi công việc một cách hiệu quả theo thời gian thực.
                        </span>
                      </div>
                    </div>

                    {/* ĐƯỜNG LINE NGANG PHÁT SÁNG NGĂN CÁCH TRONG HỘP TO BANNER */}
                    <div style={{
                      width: '100%', height: 1,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.35) 20%, rgba(56, 189, 248, 0.85) 50%, rgba(56, 189, 248, 0.35) 80%, transparent 100%)',
                      margin: '2px 0'
                    }} />

                    {/* 3 STAT KPI BOXES (NỀN TỐI TẬP TRUNG LÀM NỔI BẬT MÀU CHỮ & CHỈ SỐ) */}
                    {(() => {
                      const monthEvents = discussionEvents.filter(e => {
                        if (selectedFilterMonth === 0) return true;
                        if (!e.date) return true;
                        let m = 8, y = 2026;
                        if (e.date.includes('/')) { const p = e.date.split('/').map(Number); if (p.length === 3) { m = p[1]; y = p[2]; } }
                        return m === selectedFilterMonth && (selectedFilterYear === 0 || y === selectedFilterYear);
                      });

                      const ongoingCount = monthEvents.filter(e => getLiveDiscussionStatus(e, vnNow) === 'Đang diễn ra').length;
                      const upcomingCount = monthEvents.filter(e => getLiveDiscussionStatus(e, vnNow) === 'Sắp tới').length;
                      const completedCount = monthEvents.filter(e => {
                        const st = getLiveDiscussionStatus(e, vnNow);
                        return st === 'Đã diễn ra' || st === 'Đã xong' || st === 'Hoàn thành';
                      }).length;

                      return (
                        <div className="calendar-kpi-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="calendar-kpi-box" style={{ width: 110, padding: '12px 0', background: neonGrad.subBoxBg, border: neonGrad.subBoxBorder, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>{ongoingCount}</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#34d399', letterSpacing: '0.04em' }}>● ĐANG DIỄN RA</span>
                          </div>
                          <div className="calendar-kpi-box" style={{ width: 110, padding: '12px 0', background: neonGrad.subBoxBg, border: neonGrad.subBoxBorder, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>{upcomingCount}</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.04em' }}>● SẮP TỚI</span>
                          </div>
                          <div className="calendar-kpi-box" style={{ width: 110, padding: '12px 0', background: neonGrad.subBoxBg, border: neonGrad.subBoxBorder, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>{completedCount}</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#ff3344', letterSpacing: '0.04em' }}>● ĐÃ DIỄN RA</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}

              {/* ACCORDION BAR: THỐNG KÊ DỮ LIỆU TRAO ĐỔI (LẤY Ý TƯỞNG TỪ BIỂU ĐỒ CHỨNG KHOÁN) */}
              <div
                onClick={() => setIsAnalyticsExpanded(!isAnalyticsExpanded)}
                style={{
                  padding: '14px 20px', borderRadius: isAnalyticsExpanded ? '16px 16px 0 0' : 16,
                  backgroundColor: 'rgba(16, 27, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                  transition: 'all 0.2s ease', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                    <BarChart3 style={{ width: 20, height: 20, color: '#38bdf8' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                      THỐNG KÊ DỮ LIỆU TRAO ĐỔI
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2 }}>Phân tích xu hướng biến động thời gian & đối sánh Kế hoạch vs Thực tế 24/7</div>
                  </div>
                </div>

                {/* Mũi tên ẩn hiện chi tiết */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#38bdf8', fontSize: '0.85rem', fontWeight: 900 }}>
                  <span>{isAnalyticsExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* ANALYTICS EXPANDED PANEL - STOCK MARKET CANDLESTICK & VOLUME VISUALIZER */}
              {isAnalyticsExpanded && (() => {
                const filteredAnalyticsEvents = discussionEvents.filter(ev => {
                  if (!ev.date) return true;
                  let day = 1, month = 8, year = 2026;
                  if (ev.date.includes('/')) {
                    const parts = ev.date.split('/').map(p => parseInt(p.trim(), 10));
                    if (parts.length === 3) { day = parts[0]; month = parts[1]; year = parts[2]; }
                  }

                  if (analyticsPeriodType === 'month') {
                    if (analyticsMonth !== 0 && month !== analyticsMonth) return false;
                    if (analyticsYear !== 0 && year !== analyticsYear) return false;
                  } else if (analyticsPeriodType === 'quarter') {
                    const q = Math.ceil(month / 3);
                    if (analyticsQuarter !== 0 && q !== analyticsQuarter) return false;
                    if (analyticsYear !== 0 && year !== analyticsYear) return false;
                  } else if (analyticsPeriodType === 'year') {
                    if (analyticsYear !== 0 && year !== analyticsYear) return false;
                  }
                  return true;
                });

                let totalPlannedMinutes = 0;
                let totalActualMinutes = 0;
                let totalInflationMinutes = 0;
                let completedCount = 0;
                let ongoingCount = 0;
                let upcomingCount = 0;

                filteredAnalyticsEvents.forEach(item => {
                  const status = getLiveDiscussionStatus(item, vnNow);
                  if (status === 'Đang diễn ra') ongoingCount++;
                  else if (status === 'Sắp tới') upcomingCount++;
                  else completedCount++;

                  const planS = parseTimeStr(item.plannedStartTime, 17, 0);
                  const planE = parseTimeStr(item.plannedEndTime, 18, 0);
                  const plannedDuration = (planE.h * 60 + planE.m) - (planS.h * 60 + planS.m);
                  const validPlanned = isNaN(plannedDuration) || plannedDuration <= 0 ? 60 : plannedDuration;

                  const actSStr = (item as any).actualStartTime || item.plannedStartTime || '17:30';
                  const actEStr = (item as any).actualEndTime || item.plannedEndTime || '19:00';
                  const actS = parseTimeStr(actSStr, planS.h, planS.m);
                  const actE = parseTimeStr(actEStr, planE.h, planE.m);
                  const actDiff = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
                  const actualDuration = (!isNaN(actDiff) && actDiff >= 0) ? actDiff : validPlanned;

                  const inflation = actualDuration - validPlanned;

                  totalPlannedMinutes += validPlanned;
                  totalActualMinutes += actualDuration;
                  totalInflationMinutes += inflation;
                });

                const formatHoursMinutes = (minutes: number) => {
                  const h = Math.floor(Math.abs(minutes) / 60);
                  const m = Math.abs(minutes) % 60;
                  if (h === 0) return `${m} phút`;
                  return `${h} giờ ${m > 0 ? `${m} phút` : ''}`;
                };

                return (
                  <div style={{
                    backgroundColor: 'rgba(13, 16, 23, 0.95)', border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderTop: 'none', borderRadius: '0 0 16px 16px', padding: 20,
                    display: 'flex', flexDirection: 'column', gap: 18, boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    marginBottom: 10
                  }}>
                    {/* FILTER CONTROLS & STOCK TICKER BAR */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingBottom: 14, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      {/* Mode Selector Buttons (ĐỒNG BỘ BỎ CHỮ THEO & DÙNG ICON CHUẨN) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#161b26', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
                        <button
                          type="button"
                          onClick={() => setAnalyticsPeriodType('month')}
                          style={{
                            padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                            backgroundColor: analyticsPeriodType === 'month' ? '#0284c7' : 'transparent',
                            color: analyticsPeriodType === 'month' ? '#ffffff' : '#94a3b8',
                            display: 'flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <CalendarIcon style={{ width: 14, height: 14, color: analyticsPeriodType === 'month' ? '#ffffff' : '#38bdf8' }} /> Tháng
                        </button>
                        <button
                          type="button"
                          onClick={() => setAnalyticsPeriodType('quarter')}
                          style={{
                            padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                            backgroundColor: analyticsPeriodType === 'quarter' ? '#0284c7' : 'transparent',
                            color: analyticsPeriodType === 'quarter' ? '#ffffff' : '#94a3b8',
                            display: 'flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <CalendarIcon style={{ width: 14, height: 14, color: analyticsPeriodType === 'quarter' ? '#ffffff' : '#38bdf8' }} /> Quý
                        </button>
                        <button
                          type="button"
                          onClick={() => setAnalyticsPeriodType('year')}
                          style={{
                            padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                            backgroundColor: analyticsPeriodType === 'year' ? '#0284c7' : 'transparent',
                            color: analyticsPeriodType === 'year' ? '#ffffff' : '#94a3b8',
                            display: 'flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <CalendarIcon style={{ width: 14, height: 14, color: analyticsPeriodType === 'year' ? '#ffffff' : '#38bdf8' }} /> Năm
                        </button>
                        <button
                          type="button"
                          onClick={() => setAnalyticsPeriodType('all')}
                          style={{
                            padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                            backgroundColor: analyticsPeriodType === 'all' ? '#0284c7' : 'transparent',
                            color: analyticsPeriodType === 'all' ? '#ffffff' : '#94a3b8',
                            display: 'flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <Globe style={{ width: 14, height: 14, color: analyticsPeriodType === 'all' ? '#ffffff' : '#38bdf8' }} /> Tất Cả
                        </button>
                      </div>

                      {/* Specific Period Dropdown Selectors */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {analyticsPeriodType === 'month' && (
                          <select
                            value={analyticsMonth}
                            onChange={e => setAnalyticsMonth(parseInt(e.target.value, 10))}
                            style={{ backgroundColor: '#161b26', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800, outline: 'none', cursor: 'pointer' }}
                          >
                            <option value={0}>Tất cả các tháng</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                              <option key={m} value={m}>Tháng {String(m).padStart(2, '0')}</option>
                            ))}
                          </select>
                        )}

                        {analyticsPeriodType === 'quarter' && (
                          <select
                            value={analyticsQuarter}
                            onChange={e => setAnalyticsQuarter(parseInt(e.target.value, 10))}
                            style={{ backgroundColor: '#161b26', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800, outline: 'none', cursor: 'pointer' }}
                          >
                            <option value={0}>Tất cả các quý</option>
                            <option value={1}>Quý 1 (Tháng 1 - 3)</option>
                            <option value={2}>Quý 2 (Tháng 4 - 6)</option>
                            <option value={3}>Quý 3 (Tháng 7 - 9)</option>
                            <option value={4}>Quý 4 (Tháng 10 - 12)</option>
                          </select>
                        )}

                        {(analyticsPeriodType === 'month' || analyticsPeriodType === 'quarter' || analyticsPeriodType === 'year') && (
                          <select
                            value={analyticsYear}
                            onChange={e => setAnalyticsYear(parseInt(e.target.value, 10))}
                            style={{ backgroundColor: '#161b26', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800, outline: 'none', cursor: 'pointer' }}
                          >
                            <option value={2026}>Năm 2026</option>
                            <option value={2025}>Năm 2025</option>
                            <option value={0}>Tất cả các năm</option>
                          </select>
                        )}
                      </div>
                    </div>

                    {/* 3 METRIC KPI CARDS - STOCK TICKER STYLE WITH CENTERED INNER BOXES */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                      {/* CARD 1: SỐ CUỘC TRAO ĐỔI */}
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ padding: 5, borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)' }}>
                            <CalendarIcon style={{ width: 14, height: 14, color: '#38bdf8' }} />
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            SỐ CUỘC TRAO ĐỔI
                          </span>
                        </div>

                        {/* Hộp nhỏ bao quanh số liệu */}
                        <div style={{
                          backgroundColor: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)',
                          borderRadius: 12, padding: '6px 20px', display: 'inline-flex', alignItems: 'center', gap: 6
                        }}>
                          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                            {filteredAnalyticsEvents.length}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1' }}>cuộc họp</span>
                        </div>
                      </div>

                      {/* CARD 2: TỔNG LƯỢNG THỜI GIAN (VOLUME) */}
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ padding: 5, borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)' }}>
                            <Clock style={{ width: 14, height: 14, color: '#38bdf8' }} />
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            TỔNG LƯỢNG THỜI GIAN
                          </span>
                        </div>

                        {/* Hộp nhỏ bao quanh số liệu */}
                        <div style={{
                          backgroundColor: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)',
                          borderRadius: 12, padding: '6px 20px', display: 'inline-flex', alignItems: 'center', gap: 6
                        }}>
                          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                            {totalActualMinutes}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1' }}>(phút)</span>
                        </div>

                        <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 700 }}>
                          ⏳ Tương đương: <span style={{ color: '#ffffff' }}>{formatHoursMinutes(totalActualMinutes)}</span>
                        </div>
                      </div>

                      {/* CARD 3: TỔNG THỜI GIAN LẠM PHÁT */}
                      <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        border: `1px solid ${totalInflationMinutes > 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(52, 211, 153, 0.4)'}`,
                        borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ padding: 5, borderRadius: 8, backgroundColor: totalInflationMinutes > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(52, 211, 153, 0.15)' }}>
                            <AlertTriangle style={{ width: 14, height: 14, color: totalInflationMinutes > 0 ? '#ef4444' : '#34d399' }} />
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: totalInflationMinutes > 0 ? '#ef4444' : '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            THỜI GIAN LẠM PHÁT
                          </span>
                        </div>

                        {/* Hộp nhỏ bao quanh số liệu */}
                        <div style={{
                          backgroundColor: totalInflationMinutes > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(52, 211, 153, 0.08)',
                          border: `1px solid ${totalInflationMinutes > 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(52, 211, 153, 0.3)'}`,
                          borderRadius: 12, padding: '6px 24px', display: 'inline-flex', alignItems: 'center', gap: 6
                        }}>
                          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: totalInflationMinutes > 0 ? '#ef4444' : '#34d399', lineHeight: 1 }}>
                            {Math.abs(totalInflationMinutes)}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: totalInflationMinutes > 0 ? '#ff3344' : '#34d399' }}>(phút)</span>
                        </div>
                      </div>
                    </div>

                    {/* STOCK MARKET LINE CHART (BIỂU ĐỒ ĐƯỜNG LINE XU HƯỚNG SẮC NÉT & CÁC CHẾ ĐỘ XEM) */}
                    {(() => {
                      const actualLineColor = totalInflationMinutes > 0 ? '#ef4444' : '#34d399';

                      // Pre-process data based on chartViewMode: 'detail' | 'day' | 'week' | 'month' | 'year'
                      let rawChartList: Array<{
                        date: string;
                        planned: number;
                        act: number;
                        isInflated: boolean;
                        inflation: number;
                      }> = [];

                      if (chartViewMode === 'detail') {
                        rawChartList = filteredAnalyticsEvents.map((ev, idx) => {
                          const planS = parseTimeStr(ev.plannedStartTime, 17, 0);
                          const planE = parseTimeStr(ev.plannedEndTime, 18, 0);
                          const planned = Math.max(0, (planE.h * 60 + planE.m) - (planS.h * 60 + planS.m));

                          const actS = parseTimeStr((ev as any).actualStartTime || ev.plannedStartTime, planS.h, planS.m);
                          const actE = parseTimeStr((ev as any).actualEndTime || ev.plannedEndTime, planE.h, planE.m);
                          const actDiff = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
                          const act = (!isNaN(actDiff) && actDiff >= 0) ? actDiff : planned;

                          return {
                            date: ev.date ? ev.date.slice(0, 5) : `Lịch #${idx + 1}`,
                            planned,
                            act,
                            isInflated: act > planned,
                            inflation: act - planned
                          };
                        });
                      } else if (chartViewMode === 'day') {
                        // Aggregate total planned and actual minutes per day
                        const dayMap = new Map<string, { planned: number; act: number }>();
                        filteredAnalyticsEvents.forEach(ev => {
                          const d = ev.date ? ev.date.slice(0, 5) : 'Khác';
                          const planS = parseTimeStr(ev.plannedStartTime, 17, 0);
                          const planE = parseTimeStr(ev.plannedEndTime, 18, 0);
                          const planned = Math.max(0, (planE.h * 60 + planE.m) - (planS.h * 60 + planS.m));

                          const actS = parseTimeStr((ev as any).actualStartTime || ev.plannedStartTime, planS.h, planS.m);
                          const actE = parseTimeStr((ev as any).actualEndTime || ev.plannedEndTime, planE.h, planE.m);
                          const actDiff = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
                          const act = (!isNaN(actDiff) && actDiff >= 0) ? actDiff : planned;

                          const cur = dayMap.get(d) || { planned: 0, act: 0 };
                          dayMap.set(d, { planned: cur.planned + planned, act: cur.act + act });
                        });

                        rawChartList = Array.from(dayMap.entries()).map(([d, val]) => ({
                          date: d,
                          planned: val.planned,
                          act: val.act,
                          isInflated: val.act > val.planned,
                          inflation: val.act - val.planned
                        }));
                      } else if (chartViewMode === 'week') {
                        // Aggregate total planned and actual minutes per week
                        const weekMap = new Map<string, { planned: number; act: number }>();
                        filteredAnalyticsEvents.forEach(ev => {
                          const dp = parseDateParts(ev.date);
                          const wKey = dp.month > 0 ? `Tuần ${dp.weekStr.replace('W', '')} (T${dp.month < 10 ? '0' + dp.month : dp.month})` : 'Khác';
                          const planS = parseTimeStr(ev.plannedStartTime, 17, 0);
                          const planE = parseTimeStr(ev.plannedEndTime, 18, 0);
                          const planned = Math.max(0, (planE.h * 60 + planE.m) - (planS.h * 60 + planS.m));

                          const actS = parseTimeStr((ev as any).actualStartTime || ev.plannedStartTime, planS.h, planS.m);
                          const actE = parseTimeStr((ev as any).actualEndTime || ev.plannedEndTime, planE.h, planE.m);
                          const actDiff = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
                          const act = (!isNaN(actDiff) && actDiff >= 0) ? actDiff : planned;

                          const cur = weekMap.get(wKey) || { planned: 0, act: 0 };
                          weekMap.set(wKey, { planned: cur.planned + planned, act: cur.act + act });
                        });

                        rawChartList = Array.from(weekMap.entries()).map(([wKey, val]) => ({
                          date: wKey,
                          planned: val.planned,
                          act: val.act,
                          isInflated: val.act > val.planned,
                          inflation: val.act - val.planned
                        }));
                      } else if (chartViewMode === 'month') {
                        // Aggregate total planned and actual minutes per month
                        const monthMap = new Map<string, { planned: number; act: number }>();
                        filteredAnalyticsEvents.forEach(ev => {
                          const dp = parseDateParts(ev.date);
                          const mKey = dp.month > 0 ? `Tháng ${dp.month < 10 ? '0' + dp.month : dp.month}` : 'Khác';
                          const planS = parseTimeStr(ev.plannedStartTime, 17, 0);
                          const planE = parseTimeStr(ev.plannedEndTime, 18, 0);
                          const planned = Math.max(0, (planE.h * 60 + planE.m) - (planS.h * 60 + planS.m));

                          const actS = parseTimeStr((ev as any).actualStartTime || ev.plannedStartTime, planS.h, planS.m);
                          const actE = parseTimeStr((ev as any).actualEndTime || ev.plannedEndTime, planE.h, planE.m);
                          const actDiff = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
                          const act = (!isNaN(actDiff) && actDiff >= 0) ? actDiff : planned;

                          const cur = monthMap.get(mKey) || { planned: 0, act: 0 };
                          monthMap.set(mKey, { planned: cur.planned + planned, act: cur.act + act });
                        });

                        rawChartList = Array.from(monthMap.entries()).map(([mKey, val]) => ({
                          date: mKey,
                          planned: val.planned,
                          act: val.act,
                          isInflated: val.act > val.planned,
                          inflation: val.act - val.planned
                        }));
                      } else if (chartViewMode === 'year') {
                        // Aggregate total planned and actual minutes per year
                        const yearMap = new Map<string, { planned: number; act: number }>();
                        filteredAnalyticsEvents.forEach(ev => {
                          const dp = parseDateParts(ev.date);
                          const yKey = dp.year > 0 ? `Năm ${dp.year}` : 'Năm 2026';
                          const planS = parseTimeStr(ev.plannedStartTime, 17, 0);
                          const planE = parseTimeStr(ev.plannedEndTime, 18, 0);
                          const planned = Math.max(0, (planE.h * 60 + planE.m) - (planS.h * 60 + planS.m));

                          const actS = parseTimeStr((ev as any).actualStartTime || ev.plannedStartTime, planS.h, planS.m);
                          const actE = parseTimeStr((ev as any).actualEndTime || ev.plannedEndTime, planE.h, planE.m);
                          const actDiff = (actE.h * 60 + actE.m) - (actS.h * 60 + actS.m);
                          const act = (!isNaN(actDiff) && actDiff >= 0) ? actDiff : planned;

                          const cur = yearMap.get(yKey) || { planned: 0, act: 0 };
                          yearMap.set(yKey, { planned: cur.planned + planned, act: cur.act + act });
                        });

                        rawChartList = Array.from(yearMap.entries()).map(([yKey, val]) => ({
                          date: yKey,
                          planned: val.planned,
                          act: val.act,
                          isInflated: val.act > val.planned,
                          inflation: val.act - val.planned
                        }));
                      }

                      // Apply pagination and limits
                      const totalChartItems = rawChartList.length;
                      let displayedChartList = rawChartList;
                      if (chartRangeLimit > 0) {
                        displayedChartList = rawChartList.slice(chartPageOffset, chartPageOffset + chartRangeLimit);
                      }

                      return (
                        <div style={{
                          backgroundColor: '#090d16', borderRadius: 14, padding: '18px 20px',
                          border: '1px solid rgba(56, 189, 248, 0.25)', display: 'flex', flexDirection: 'column', gap: 16
                        }}>
                          {/* CHART TOOLBAR HEADER: CHÚ THÍCH NÚT BIỂU ĐỒ */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            {/* CHÚ THÍCH ĐƯỜNG LINE */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.72rem', fontWeight: 700 }}>
                              <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 12, height: 2, backgroundColor: '#38bdf8', borderRadius: 2 }} /> Dự Kiến
                              </span>
                              <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 12, height: 2, backgroundColor: '#34d399', borderRadius: 2 }} /> Đạt Kế Hoạch
                              </span>
                              <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 12, height: 2, backgroundColor: '#ef4444', borderRadius: 2 }} /> Thực Tế (Lạm Phát)
                              </span>
                            </div>
                          </div>

                          {/* SVG LINE CHART VIEW VỚI HỖ TRỢ DỮ LIỆU LỚN & ĐIỀU HƯỚNG */}
                          {(() => {
                            const list = displayedChartList;
                            const calculatedMax = Math.max(180, ...list.map(ev => Math.max(ev.planned, ev.act)));
                            // Làm tròn maxVal lên mốc bội số của 30 (0, 30, 60, 90, 120, 150, 180...)
                            const maxVal = Math.ceil(calculatedMax / 30) * 30;

                            const width = chartRangeLimit === 0 ? Math.max(1000, list.length * 55) : 1000;
                            const height = 300;
                            const paddingLeft = 55;
                            const paddingRight = 35;
                            const paddingTop = 30;
                            const paddingBottom = 42;

                            const chartW = width - paddingLeft - paddingRight;
                            const chartH = height - paddingTop - paddingBottom;

                            // Đơn vị đo thời gian trục Y cố định theo nấc 30 phút: 0, 30, 60, 90, 120, 150, 180...
                            const tickStep = 30;
                            const yTicks: number[] = [];
                            for (let v = 0; v <= maxVal; v += tickStep) {
                              yTicks.push(v);
                            }
                            yTicks.reverse();

                            const points = list.map((ev, idx) => {
                              const x = list.length === 1 ? paddingLeft + chartW / 2 : paddingLeft + (idx / (list.length - 1)) * chartW;
                              const plannedY = height - paddingBottom - (ev.planned / maxVal) * chartH;
                              const actY = height - paddingBottom - (ev.act / maxVal) * chartH;

                              return {
                                x, plannedY, actY, planned: ev.planned, act: ev.act,
                                date: ev.date,
                                isInflated: ev.isInflated,
                                inflation: ev.inflation
                              };
                            });

                            const plannedPathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.plannedY}`).join(' ');
                            const actPathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.actY}`).join(' ');
                            const areaPathD = points.length > 0 ? `${actPathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z` : '';

                            return (
                              <div style={{
                                position: 'relative', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12,
                                padding: '18px 20px', border: '1px solid rgba(255,255,255,0.06)',
                                overflowX: chartRangeLimit === 0 ? 'auto' : 'hidden'
                              }}>
                                <svg viewBox={`0 0 ${width} ${height}`} style={{ width: chartRangeLimit === 0 ? width : '100%', height: 320, overflow: 'visible' }}>
                                  <defs>
                                    <linearGradient id="actAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor={actualLineColor} stopOpacity="0.25" />
                                      <stop offset="100%" stopColor={actualLineColor} stopOpacity="0.0" />
                                    </linearGradient>
                                  </defs>

                                  {/* THƯỚC ĐO CỘT ĐỨNG Y-AXIS */}
                                  {yTicks.map(val => {
                                    const yPos = height - paddingBottom - (val / maxVal) * chartH;
                                    return (
                                      <g key={val}>
                                        <line x1={paddingLeft} y1={yPos} x2={width - paddingRight} y2={yPos} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                                        <line x1={paddingLeft - 6} y1={yPos} x2={paddingLeft} y2={yPos} stroke="#38bdf8" strokeWidth="1.5" />
                                        <text x={paddingLeft - 9} y={yPos + 4} textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="700">
                                          {val}'
                                        </text>
                                      </g>
                                    );
                                  })}
                                  <line x1={paddingLeft} y1={paddingTop - 5} x2={paddingLeft} y2={height - paddingBottom} stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />

                                  {/* THƯỚC ĐO CỘT NGANG X-AXIS */}
                                  <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight + 5} y2={height - paddingBottom} stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />

                                  {areaPathD && <path d={areaPathD} fill="url(#actAreaGrad)" />}
                                  {plannedPathD && <path d={plannedPathD} stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.8" />}

                                  {points.map((p, i) => {
                                    if (i === 0) return null;
                                    const prevP = points[i - 1];
                                    const isSegmentInflated = p.isInflated || prevP.isInflated;
                                    const segColor = isSegmentInflated ? '#ef4444' : '#34d399';
                                    return (
                                      <line
                                        key={`seg-${i}`}
                                        x1={prevP.x}
                                        y1={prevP.actY}
                                        x2={p.x}
                                        y2={p.actY}
                                        stroke={segColor}
                                        strokeWidth="2"
                                        style={{ filter: `drop-shadow(0 0 5px ${segColor}70)` }}
                                      />
                                    );
                                  })}

                                  {points.map((p, idx) => {
                                    const nodeColor = p.isInflated ? '#ef4444' : '#34d399';
                                    const isFirstOfDate = chartViewMode !== 'detail' || idx === 0 || points[idx - 1].date !== p.date;

                                    return (
                                      <g key={idx}>
                                        <line x1={p.x} y1={paddingTop} x2={p.x} y2={height - paddingBottom} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />
                                        <circle cx={p.x} cy={p.plannedY} r="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                                        <circle cx={p.x} cy={p.actY} r="4.5" fill={nodeColor} stroke="#ffffff" strokeWidth="1.8" style={{ filter: `drop-shadow(0 0 8px ${nodeColor}90)` }} />
                                        <line x1={p.x} y1={height - paddingBottom} x2={p.x} y2={height - paddingBottom + 5} stroke="#38bdf8" strokeWidth="1.2" />

                                        {isFirstOfDate && (
                                          <text x={p.x} y={height - paddingBottom + 18} textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="800">
                                            {p.date}
                                          </text>
                                        )}
                                      </g>
                                    );
                                  })}
                                </svg>
                              </div>
                            );
                          })()}

                          {/* THANH PHÂN TRANG & THÔNG TIN ĐIỀU HƯỚNG KHI DỮ LIỆU NHIỀU */}
                          {chartRangeLimit > 0 && totalChartItems > chartRangeLimit && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                              <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>
                                📌 Hiển thị <strong style={{ color: '#ffffff' }}>{chartPageOffset + 1} – {Math.min(totalChartItems, chartPageOffset + chartRangeLimit)}</strong> trên tổng số <strong style={{ color: '#38bdf8' }}>{totalChartItems}</strong> điểm dữ liệu
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button
                                  type="button"
                                  disabled={chartPageOffset === 0}
                                  onClick={() => setChartPageOffset(prev => Math.max(0, prev - chartRangeLimit))}
                                  style={{
                                    padding: '4px 12px', borderRadius: 6, fontSize: '0.74rem', fontWeight: 700,
                                    backgroundColor: chartPageOffset === 0 ? 'rgba(255,255,255,0.05)' : '#1e293b',
                                    color: chartPageOffset === 0 ? '#475569' : '#38bdf8',
                                    border: '1px solid rgba(56, 189, 248, 0.3)', cursor: chartPageOffset === 0 ? 'not-allowed' : 'pointer'
                                  }}
                                >
                                  ◀ Trang Trước
                                </button>
                                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#ffffff' }}>
                                  Trang {Math.floor(chartPageOffset / chartRangeLimit) + 1} / {Math.ceil(totalChartItems / chartRangeLimit)}
                                </span>
                                <button
                                  type="button"
                                  disabled={chartPageOffset + chartRangeLimit >= totalChartItems}
                                  onClick={() => setChartPageOffset(prev => prev + chartRangeLimit)}
                                  style={{
                                    padding: '4px 12px', borderRadius: 6, fontSize: '0.74rem', fontWeight: 700,
                                    backgroundColor: chartPageOffset + chartRangeLimit >= totalChartItems ? 'rgba(255,255,255,0.05)' : '#1e293b',
                                    color: chartPageOffset + chartRangeLimit >= totalChartItems ? '#475569' : '#38bdf8',
                                    border: '1px solid rgba(56, 189, 248, 0.3)', cursor: chartPageOffset + chartRangeLimit >= totalChartItems ? 'not-allowed' : 'pointer'
                                  }}
                                >
                                  Trang Sau ▶
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
              </div>
            );
          })()}

              {/* ACTION TOOLBAR & VIEW TOGGLES */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {/* HỘP BỘ LỌC LIÊN THÔNG BÀN GIAO THEO THỨ TỰ TỪ TRÁI SANG PHẢI: 1. NĂM ➜ 2. QUÝ ➜ 3. THÁNG ➜ 4. TUẦN ➜ 5. NGÀY */}
                  {(() => {
                    // Dynamically calculate available dates for the NGÀY dropdown based on active Year, Quarter, Month, and Week
                    const availableDayEvents = discussionEvents.filter(e => {
                      if (!e.date) return false;
                      const { month, year, quarter, weekStr } = parseDateParts(e.date);
                      if (selectedFilterYear !== 0 && year !== selectedFilterYear) return false;
                      if (selectedFilterQuarter !== 0 && quarter !== selectedFilterQuarter) return false;
                      if (selectedFilterMonth !== 0 && month !== selectedFilterMonth) return false;
                      if (selectedSpecificWeek !== 'ALL' && weekStr !== selectedSpecificWeek) return false;
                      return true;
                    });

                    const availableDayDates = Array.from(new Set(availableDayEvents.map(e => e.date).filter(Boolean)))
                      .sort((a, b) => {
                        const pA = parseDateParts(a);
                        const pB = parseDateParts(b);
                        return new Date(pA.year, pA.month - 1, pA.day).getTime() - new Date(pB.year, pB.month - 1, pB.day).getTime();
                      });

                    return (
                      <div className="calendar-filter-container" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'nowrap' }}>

                        {/* HỘP 1: NĂM */}
                        <div className="calendar-filter-box" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          backgroundColor: '#161b26', padding: '8px 14px', borderRadius: 12,
                          border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8',
                          minWidth: 0
                        }}>
                          <CalendarIcon style={{ width: 15, height: 15, color: '#38bdf8', flexShrink: 0 }} />
                          <select
                            value={selectedFilterYear}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSelectedFilterYear(val);
                              setSelectedSpecificDayDate('');
                              showToast(val === 0 ? 'Đang xem tất cả các Năm' : `Đã lọc theo Năm ${val}`);
                            }}
                            style={{ padding: '4px 2px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 800, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#38bdf8', outline: 'none', textAlign: 'center' }}
                          >
                            <option value={2026} style={{ backgroundColor: '#161b26', color: '#ffffff' }}>Năm 2026</option>
                            <option value={2025} style={{ backgroundColor: '#161b26', color: '#ffffff' }}>Năm 2025</option>
                            <option value={0} style={{ backgroundColor: '#161b26', color: '#ffffff' }}>Tất cả các năm</option>
                          </select>
                        </div>

                        {/* HỘP 2: THÁNG */}
                        <div className="calendar-filter-box" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          backgroundColor: '#161b26', padding: '8px 14px', borderRadius: 12,
                          border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8',
                          minWidth: 0
                        }}>
                          <CalendarIcon style={{ width: 15, height: 15, color: '#38bdf8', flexShrink: 0 }} />
                          <select
                            value={selectedFilterMonth}
                            onChange={(e) => {
                              const mNum = Number(e.target.value);
                              setSelectedFilterMonth(mNum);
                              if (mNum !== 0) {
                                const autoQ = Math.ceil(mNum / 3);
                                setSelectedFilterQuarter(autoQ);
                              }
                              setCalendarViewMode('month');
                              setSelectedSpecificDayDate('');
                              showToast(mNum === 0 ? 'Đang xem tất cả các Tháng' : `Đã lọc xem Tháng ${String(mNum).padStart(2, '0')}/${selectedFilterYear || 2026}`);
                            }}
                            style={{ padding: '4px 2px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 800, border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: '#38bdf8', outline: 'none', textAlign: 'center' }}
                          >
                            <option value={0} style={{ backgroundColor: '#161b26', color: '#ffffff' }}>Tất cả các Tháng</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                              <option key={m} value={m} style={{ backgroundColor: '#161b26', color: '#ffffff' }}>Tháng {String(m).padStart(2, '0')}</option>
                            ))}
                          </select>
                        </div>

                      </div>
                    );
                  })()}

                  {/* HỘP BÊN TRÁI: THẺ VÀ LƯỚI NGANG HÀNG VỚI CÁC NÚT THAO TÁC */}
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#161b26', padding: 4, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.78rem', fontWeight: 700 }}>
                    <button
                      onClick={() => setTalkViewMode('card')}
                      style={{
                        padding: '5px 12px', borderRadius: 8,
                        backgroundColor: talkViewMode === 'card' ? '#0284c7' : 'transparent',
                        color: talkViewMode === 'card' ? '#ffffff' : '#94a3b8',
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                      }}
                    >
                      <LayoutGrid style={{ width: 14, height: 14 }} /> Thẻ
                    </button>
                    <button
                      onClick={() => setTalkViewMode('grid')}
                      style={{
                        padding: '5px 12px', borderRadius: 8,
                        backgroundColor: talkViewMode === 'grid' ? '#0284c7' : 'transparent',
                        color: talkViewMode === 'grid' ? '#ffffff' : '#94a3b8',
                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                      }}
                    >
                      <Table style={{ width: 14, height: 14 }} /> Lưới
                    </button>
                  </div>

                  {/* NÚT THAO TÁC BÊN PHẢI */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      onClick={() => {
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
                        showToast(`Đã trở về ${curDayStr}`);
                      }}
                      title="Về ngày hiện tại (Múi giờ Việt Nam)"
                      style={{
                        padding: '10px 12px', borderRadius: 12, backgroundColor: '#161b26',
                        border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.15s ease'
                      }}
                    >
                      <CalendarIcon style={{ width: 18, height: 18, color: '#38bdf8' }} />
                    </button>
                    <button
                      onClick={() => window.open('https://docs.google.com/spreadsheets/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M/edit?gid=1382803197#gid=1382803197', '_blank')}
                      title="Mở Google Sheet Trực Tiếp"
                      style={{
                        padding: '10px 12px', borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.15s ease'
                      }}
                    >
                      <FileSpreadsheet style={{ width: 18, height: 18, color: '#34d399' }} />
                    </button>
                    <button
                      className="hide-on-mobile"
                      onClick={() => {
                        setWebhookUrlInput(getGoogleSheetWebhookUrl());
                        setIsWebhookModalOpen(true);
                      }}
                      title="Cấu hình Đồng bộ 2-Chiều với Google Sheet"
                      style={{
                        padding: '10px 12px', borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.15s ease'
                      }}
                    >
                      <RefreshCw style={{ width: 18, height: 18, color: '#38bdf8' }} />
                    </button>
                    {/* NÚT THÙNG RÁC TẠM LƯU TRỮ (ẨN Ở CHẾ ĐỘ MOBILE) */}
                    <button
                      className="hide-on-mobile"
                      onClick={() => {
                        setTrashEvents(getDeletedDiscussionEvents());
                        setIsTrashModalOpen(true);
                      }}
                      title="Thùng Rác Tạm Lưu Trữ Các Lịch Đã Xóa"
                      style={{
                        padding: '10px 14px', borderRadius: 12, backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171',
                        display: 'flex', alignItems: 'center', gap: 6,
                        cursor: 'pointer', transition: 'all 0.15s ease'
                      }}
                    >
                      <Trash2 style={{ width: 18, height: 18, color: '#f87171' }} />
                      <span style={{ fontSize: '0.78rem', fontWeight: 900 }}>Thùng Rác</span>
                      {trashEvents.length > 0 && (
                        <span style={{
                          padding: '1px 6px', borderRadius: 10, backgroundColor: '#ef4444',
                          color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, marginLeft: 2
                        }}>
                          {trashEvents.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setIsAddTalkModalOpen(true)}
                      title="Thêm Lịch Trao Đổi Mới"
                      style={{
                        padding: '10px 12px', borderRadius: 12, backgroundColor: '#161b26',
                        border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Plus style={{ width: 18, height: 18, color: '#38bdf8' }} />
                    </button>
                  </div>
                </div>
              </div>


              {/* CARDS LIST CONTAINER (HỖ TRỢ XEM THEO NGÀY / TUẦN / THÁNG + TỰ ĐỘNG CHUYỂN NGÀY) */}
              {(() => {
                // Helper to parse "DD/MM/YYYY" or "YYYY-MM-DD" to timestamp ms
                const parseDateMs = (dStr?: string) => {
                  if (!dStr) return 0;
                  if (dStr.includes('/')) {
                    const p = dStr.split('/').map(Number);
                    if (p.length === 3) return new Date(p[2], p[1] - 1, p[0]).getTime();
                  } else if (dStr.includes('-')) {
                    const p = dStr.split('-').map(Number);
                    if (p.length === 3) {
                      if (p[0] > 1000) return new Date(p[0], p[1] - 1, p[2]).getTime();
                      return new Date(p[2], p[1] - 1, p[0]).getTime();
                    }
                  }
                  return 0;
                };

                // Helper to get month, year, quarter from date string
                const getEventMonthYear = (dStr?: string) => {
                  if (!dStr) return { m: 0, y: 0, q: 0 };
                  let m = 0, y = 0;
                  if (dStr.includes('/')) {
                    const p = dStr.split('/').map(Number);
                    if (p.length === 3) { m = p[1]; y = p[2]; }
                  } else if (dStr.includes('-')) {
                    const p = dStr.split('-').map(Number);
                    if (p.length === 3) {
                      if (p[0] > 1000) { y = p[0]; m = p[1]; }
                      else { m = p[1]; y = p[2]; }
                    }
                  }
                  const q = Math.ceil(m / 3);
                  return { m, y, q };
                };

                // Hierarchical filtering: 1. Year -> 2. Quarter -> 3. Month
                const scopeEvents = discussionEvents.filter(item => {
                  if (!item.date) return true;
                  const { m, y, q } = getEventMonthYear(item.date);
                  if (selectedFilterYear !== 0 && y !== selectedFilterYear) return false;
                  if (selectedFilterQuarter !== 0 && q !== selectedFilterQuarter) return false;
                  if (selectedFilterMonth !== 0 && m !== selectedFilterMonth) return false;
                  return true;
                });

                const sortedDates = Array.from(new Set(scopeEvents.map(e => e.date).filter(Boolean)))
                  .sort((a, b) => parseDateMs(a) - parseDateMs(b));

                const curVnDateStr = `${String(vnNow.getDate()).padStart(2, '0')}/${String(vnNow.getMonth() + 1).padStart(2, '0')}/${vnNow.getFullYear()}`;
                const curVnMs = parseDateMs(curVnDateStr);

                let autoTargetDate = curVnDateStr;

                const todayEvs = scopeEvents.filter(e => e.date === curVnDateStr);
                if (todayEvs.length > 0) {
                  const allTodayFinished = todayEvs.every(e => {
                    const st = getLiveDiscussionStatus(e, vnNow);
                    return st === 'Đã diễn ra' || st === 'Đã xong' || st === 'Hoàn thành';
                  });
                  if (allTodayFinished) {
                    const nextDate = sortedDates.find(d => parseDateMs(d) > curVnMs);
                    autoTargetDate = nextDate || sortedDates[0] || curVnDateStr;
                  } else {
                    autoTargetDate = curVnDateStr;
                  }
                } else {
                  const nextDate = sortedDates.find(d => parseDateMs(d) >= curVnMs);
                  autoTargetDate = nextDate || sortedDates[0] || curVnDateStr;
                }

                // Filter events based on active calendarViewMode and specific selections
                let displayedEvents: DiscussionEvent[] = [];

                if (calendarViewMode === 'day') {
                  const targetDay = selectedSpecificDayDate || autoTargetDate;
                  displayedEvents = scopeEvents.filter(e => e.date === targetDay);
                  if (displayedEvents.length === 0 && scopeEvents.length > 0) {
                    displayedEvents = [scopeEvents[0]];
                  }
                } else if (calendarViewMode === 'week') {
                  if (selectedSpecificWeek !== 'ALL') {
                    displayedEvents = scopeEvents.filter(e => {
                      if (!e.date) return false;
                      const { weekStr } = parseDateParts(e.date);
                      return weekStr === selectedSpecificWeek;
                    });
                  } else {
                    const refMs = parseDateMs(autoTargetDate) || curVnMs;
                    const refDate = new Date(refMs);
                    const dayOfWeek = refDate.getDay();
                    const diffToMon = refDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
                    const monDate = new Date(refDate.setDate(diffToMon));
                    monDate.setHours(0, 0, 0, 0);
                    const sunDate = new Date(monDate);
                    sunDate.setDate(monDate.getDate() + 6);
                    sunDate.setHours(23, 59, 59, 999);

                    displayedEvents = scopeEvents.filter(e => {
                      const eMs = parseDateMs(e.date);
                      return eMs >= monDate.getTime() && eMs <= sunDate.getTime();
                    });
                  }
                } else {
                  displayedEvents = scopeEvents;
                }

                // Strictly sort events chronologically by Date and Start Time (asc: early to late)
                displayedEvents = [...displayedEvents].sort((a, b) => {
                  const dateA = parseDateMs(a.date);
                  const dateB = parseDateMs(b.date);
                  if (dateA !== dateB) return dateA - dateB;

                  const getStartMins = (e: DiscussionEvent) => {
                    const tStr = e.plannedStartTime || '17:00';
                    const parsed = parseTimeStr(tStr, 17, 0);
                    return parsed.h * 60 + parsed.m;
                  };

                  return getStartMins(a) - getStartMins(b);
                });

                if (displayedEvents.length === 0) {
                  return (
                    <div style={{
                      padding: '40px 20px', textAlign: 'center', backgroundColor: 'rgba(16, 27, 42, 0.6)',
                      border: '1px dashed rgba(56, 189, 248, 0.3)', borderRadius: 20, display: 'flex',
                      flexDirection: 'column', alignItems: 'center', gap: 12
                    }}>
                      <CalendarIcon style={{ width: 36, height: 36, color: '#38bdf8' }} />
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                        Không có lịch trao đổi nào trong chế độ {calendarViewMode === 'day' ? 'Ngày' : calendarViewMode === 'week' ? 'Tuần' : 'Tháng'}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                        Bạn có thể thêm lịch mới hoặc chuyển sang xem theo Ngày / Tuần / Tháng ở menu thanh công cụ.
                      </p>
                      <button
                        onClick={() => {
                          setCalendarViewMode('day');
                          const now = getVietnamNow();
                          setSelectedFilterMonth(now.getMonth() + 1);
                          setSelectedFilterYear(now.getFullYear());
                        }}
                        style={{
                          padding: '8px 18px', borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', fontSize: '0.78rem',
                          fontWeight: 800, cursor: 'pointer', marginTop: 4
                        }}
                      >
                        Về Chế độ Ngày Mặc định
                      </button>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {displayedEvents.map((item, index) => {
                      // Check same date continuity
                      const hasPrevSameDate = index > 0 && displayedEvents[index - 1].date === item.date;
                      const hasNextSameDate = index < displayedEvents.length - 1 && displayedEvents[index + 1].date === item.date;

                      // Dynamic fallback calculation to eliminate any "#REF!" or invalid strings
                      const computeDayName = (dStr?: string, raw?: string) => {
                        if (raw && !raw.includes('#REF') && raw.trim() !== '') return raw;
                        if (!dStr) return 'THỨ TƯ';
                        const parts = dStr.split('/');
                        if (parts.length < 3) return 'THỨ TƯ';
                        const [d, m, y] = parts.map(Number);
                        const dateObj = new Date(y, m - 1, d);
                        const dayIndex = dateObj.getDay();
                        const daysMap = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
                        return daysMap[dayIndex] || 'THỨ TƯ';
                      };

                      const safeDayOfWeek = computeDayName(item.date, item.dayOfWeek);

                      // Tính toán màu sắc đồng bộ hoàn toàn theo Trạng Thái Cuộc Trao Đổi
                      const st = getLiveDiscussionStatus(item, vnNow);
                      const isFinished = st === 'Đã diễn ra' || st === 'Đã xong' || st === 'Hoàn thành';
                      const isRealTimeExpanded = !!expandedRealTimeMap[item.id];

                      const isToday = (() => {
                        if (!item.date) return false;
                        const now = getVietnamNow();
                        const curDayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
                        return item.date.trim() === curDayStr;
                      })();

                      let statusToneColor = '#f97316'; // Màu Cam (Sắp tới)
                      let statusToneBg = 'rgba(249, 115, 22, 0.15)';
                      let statusToneBorder = '1px solid rgba(249, 115, 22, 0.35)';
                      let statusBoxBg = 'linear-gradient(180deg, #c2410c, #7c2d12)'; // Cam đậm

                      // Hộp ngày luôn sử dụng tone màu xanh Cyan hệ thống (#0284c7 / #38bdf8)
                      const statusOuterBoxBg = 'linear-gradient(135deg, #0284c7, #0369a1)';
                      const statusOuterBorder = '1px solid #38bdf8';
                      const statusOuterShadow = 'none';

                      if (st === 'Đang diễn ra') {
                        statusToneColor = '#34d399'; // Màu Xanh lá
                        statusToneBg = 'rgba(16, 185, 129, 0.15)';
                        statusToneBorder = '1px solid rgba(52, 211, 153, 0.35)';
                        statusBoxBg = 'linear-gradient(180deg, #047857, #064e3b)'; // Xanh lá đậm
                      } else if (isFinished) {
                        statusToneColor = '#ff3344'; // Màu Đỏ (Đã diễn ra)
                        statusToneBg = 'rgba(239, 68, 68, 0.15)';
                        statusToneBorder = '1px solid rgba(239, 68, 68, 0.35)';
                        statusBoxBg = 'linear-gradient(180deg, #991b1b, #7f1d1d)'; // Đỏ đậm
                      } else if (st === 'Đã dời' || st === 'Đã hủy' || st === 'Huỷ lịch') {
                        statusToneColor = '#c084fc'; // Màu Tím (Đã dời/hủy)
                        statusToneBg = 'rgba(168, 85, 247, 0.15)';
                        statusToneBorder = '1px solid rgba(192, 132, 252, 0.35)';
                        statusBoxBg = 'linear-gradient(180deg, #7e22ce, #581c87)'; // Tím đậm
                      }

                      return (
                        <React.Fragment key={item.id}>
                          <div className="discussion-event-item" style={{ display: 'flex', alignItems: 'stretch', gap: 0, position: 'relative' }}>
                          {/* ĐƯỜNG LINE NỐI DỌC PHÁT SÁNG CÁN TOÀN BỘ DANH SÁCH CÁC HỘP CUỘC TRAO ĐỔI */}
                          {index > 0 && (
                            <div className="connector-vertical-line" style={{
                              position: 'absolute', left: 104, top: -20, height: 'calc(50% + 20px)', width: 2,
                              backgroundColor: '#38bdf8', boxShadow: '0 0 10px #38bdf8', zIndex: 1, opacity: 0.95
                            }} />
                          )}
                          {index < displayedEvents.length - 1 && (
                            <div className="connector-vertical-line" style={{
                              position: 'absolute', left: 104, top: '50%', height: 'calc(50% + 20px)', width: 2,
                              backgroundColor: '#38bdf8', boxShadow: '0 0 10px #38bdf8', zIndex: 1, opacity: 0.95
                            }} />
                          )}

                          {/* NODE BÊN TRÁI: HỘP THỨ NGÀY THÁNG CÓ ĐƯỜNG LINE LIÊN KẾT NỐI TRỰC TIẾP SANG HỘP NỘI DUNG */}
                          <div className={`date-node-container ${hasPrevSameDate ? 'date-node-spacer-container' : ''}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, position: 'relative' }}>
                            {/* 1. KHUNG HỘP THỨ NGÀY THÁNG (LUÔN ĐỂ MÀU XANH CYAN HỆ THỐNG) */}
                            {!hasPrevSameDate ? (
                              <div
                                className="date-box-inner"
                                title="Cuộn chuột hoặc lướt lên/xuống để đổi ngày"
                                onWheel={(e) => {
                                  e.stopPropagation();
                                  if (e.deltaY < 0) {
                                    handleShiftDate(-1, item.date);
                                  } else if (e.deltaY > 0) {
                                    handleShiftDate(1, item.date);
                                  }
                                }}
                                onTouchStart={(e) => {
                                  touchStartPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                                }}
                                onTouchEnd={(e) => {
                                  if (!touchStartPosRef.current) return;
                                  const deltaY = e.changedTouches[0].clientY - touchStartPosRef.current.y;
                                  const deltaX = e.changedTouches[0].clientX - touchStartPosRef.current.x;

                                  if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 15) {
                                    if (deltaY < 0) {
                                      handleShiftDate(1, item.date);
                                    } else {
                                      handleShiftDate(-1, item.date);
                                    }
                                  } else if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 15) {
                                    if (deltaX < 0) {
                                      handleShiftDate(1, item.date);
                                    } else {
                                      handleShiftDate(-1, item.date);
                                    }
                                  }
                                  touchStartPosRef.current = null;
                                }}
                                style={{
                                  width: 84, padding: '6px 0', borderRadius: 16,
                                  background: statusOuterBoxBg,
                                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4,
                                  boxShadow: 'none', border: statusOuterBorder,
                                  backdropFilter: 'blur(8px)', zIndex: 2, cursor: 'ns-resize', userSelect: 'none'
                                }}
                              >
                                {/* NÚT LÊN / NGÀY TRƯỚC (CỐ ĐỊNH PHÍA TRÁI / TRÊN, KÍCH THƯỚC LỚN) */}
                                <button
                                  type="button"
                                  className="date-arrow-btn date-arrow-left"
                                  onClick={(e) => { e.stopPropagation(); handleShiftDate(-1, item.date); }}
                                  title="Ngày trước (-1 ngày)"
                                  style={{
                                    background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#ffffff',
                                    borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', padding: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem',
                                    fontWeight: 900, transition: 'all 0.15s ease', boxShadow: 'none'
                                  }}
                                >
                                  ▲
                                </button>

                                {/* THỨ TRONG TUẦN (CHỮ TRẮNG TO ĐẬM) */}
                                <span className="date-day-name" style={{ fontSize: '0.88rem', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ffffff' }}>
                                  {safeDayOfWeek}
                                </span>

                                {/* HỘP NHỎ SỐ NGÀY (CĂN GIỮA TUYỆT ĐỐI) */}
                                <div className="date-number-box" style={{
                                  padding: '4px 14px', borderRadius: 10,
                                  background: 'rgba(0, 0, 0, 0.35)',
                                  border: '1px solid rgba(255, 255, 255, 0.35)',
                                  boxShadow: 'none',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                  <span style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                                    {item.date ? item.date.split('/')[0] : '18'}
                                  </span>
                                </div>

                                {/* THÁNG (CHỮ TRẮNG TO ĐẬM IN HOA) */}
                                <span className="date-month-name" style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                  THÁNG {item.date ? item.date.split('/')[1] : '08'}
                                </span>

                                {/* NÚT XUỐNG / NGÀY SAU (CỐ ĐỊNH PHÍA PHẢI / DƯỚI, KÍCH THƯỚC LỚN) */}
                                <button
                                  type="button"
                                  className="date-arrow-btn date-arrow-right"
                                  onClick={(e) => { e.stopPropagation(); handleShiftDate(1, item.date); }}
                                  title="Ngày sau (+1 ngày)"
                                  style={{
                                    background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#ffffff',
                                    borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', padding: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem',
                                    fontWeight: 900, transition: 'all 0.15s ease', boxShadow: 'none'
                                  }}
                                >
                                  ▼
                                </button>
                                {/* 2 ĐIỂM TRÒN GẮN TRỰC TIẾP TRÊN VIỀN ĐÁY HỘP NGÀY (TÂM NẰM TRÊN VIỀN 100%, HIỂN THỊ TRÊN CÙNG) */}
                                <div className="mobile-node-dot" style={{ display: 'none', position: 'absolute', left: '10%', bottom: -5, transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #38bdf8', boxShadow: '0 0 12px #38bdf8', zIndex: 30 }} />
                                <div className="mobile-node-dot" style={{ display: 'none', position: 'absolute', right: '10%', bottom: -5, transform: 'translateX(50%)', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #38bdf8', boxShadow: '0 0 12px #38bdf8', zIndex: 30 }} />
                              </div>
                            ) : (
                                /* KHOẢNG TRỐNG THAY THẾ CHO CÁC LỊCH CÙNG NGÀY TIẾP THEO */
                                <div className="date-box-spacer" style={{ width: 84, flexShrink: 0 }} />
                              )}

                            {/* 2. ĐƯỜNG LINE NỐI TỪ HỘP ĐẾN CHẤM TRÒN */}
                            <div className="connector-line" style={{ width: 14, height: 2, backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8', opacity: !hasPrevSameDate ? 0.9 : 0 }} />

                            {/* 3. CHẤM TRÒN NỐI TRỤC PHÁT SÁNG */}
                            <div className="connector-dot" style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #38bdf8', backgroundColor: '#ffffff', boxShadow: '0 0 10px #38bdf8', flexShrink: 0, zIndex: 2 }} />

                            {/* 4. ĐƯỜNG LINE LIÊN KẾT NỐI TỪ CHẤM TRÒN SANG TRỰC TIẾP ME THẺ NỘI DUNG BÊN CẠNH */}
                            <div className="connector-line" style={{ width: 18, height: 2, backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8', opacity: 0.9 }} />
                          </div>

                    {/* KHUNG BỔ SUNG: CHIA THÀNH 2 HỘP NỘI DUNG */}
                    <div className="discussion-card-inner" style={{
                      flex: 1, backgroundColor: '#161922', border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 18, padding: 14, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                      display: 'flex', gap: 14, alignItems: 'stretch', position: 'relative'
                    }}>
                      {/* 2 LINE NÉT LIỀN SOLID NỐI THẲNG TỪ ĐỈNH HỘP NÀY LÊN TÂM ĐIỂM TRÒN HỘP TRÊN (zIndex: 1 NẰM CHÌM DƯỚI ĐIỂM TRÒN) */}
                      <div className="mobile-solid-connect-line" style={{ display: 'none', position: 'absolute', left: '10%', top: -24, transform: 'translateX(-50%)', width: 2, height: 24, backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8', zIndex: 1 }} />
                      <div className="mobile-solid-connect-line" style={{ display: 'none', position: 'absolute', right: '10%', top: -24, transform: 'translateX(50%)', width: 2, height: 24, backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8', zIndex: 1 }} />

                      {/* 2 ĐIỂM TRÒN GẮN TRÊN ĐƯỜNG VIỀN ĐỈNH HỘP LỊCH (HIỂN THỊ TRÊN CÙNG zIndex: 50) */}
                      <div className="mobile-node-dot" style={{ display: 'none', position: 'absolute', left: '10%', top: -5, transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #38bdf8', boxShadow: '0 0 12px #38bdf8', zIndex: 50 }} />
                      <div className="mobile-node-dot" style={{ display: 'none', position: 'absolute', right: '10%', top: -5, transform: 'translateX(50%)', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #38bdf8', boxShadow: '0 0 12px #38bdf8', zIndex: 50 }} />

                      {/* 2 ĐIỂM TRÒN GẮN TRÊN ĐƯỜNG VIỀN ĐÁY HỘP LỊCH (HIỂN THỊ TRÊN CÙNG zIndex: 50, NẾU CHƯA PHẢI HỘP CUỐI CÙNG) */}
                      {index < displayedEvents.length - 1 && (
                        <>
                          <div className="mobile-node-dot" style={{ display: 'none', position: 'absolute', left: '10%', bottom: -5, transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #38bdf8', boxShadow: '0 0 12px #38bdf8', zIndex: 50 }} />
                          <div className="mobile-node-dot" style={{ display: 'none', position: 'absolute', right: '10%', bottom: -5, transform: 'translateX(50%)', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #38bdf8', boxShadow: '0 0 12px #38bdf8', zIndex: 50 }} />
                        </>
                      )}
                      {/* 1. HỘP BÊN TRÁI RỘNG HƠN (HOẶC TOÀN BỘ CHIỀU RỘNG NẾU CHƯA ĐÃ DIỄN RA HOẶC CHƯA MỞ SỔ THỜI GIAN THỰC TẾ) */}
                      <div className="discussion-card-box" style={{
                        flex: (isFinished && isRealTimeExpanded) ? '7 1 0%' : '1 1 100%', backgroundColor: 'rgba(11, 14, 20, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12
                      }}>
                        <div>
                          {/* TOP BAR: THỜI GIAN DỰ KIẾN (KÍCH THƯỚC NHỎ GỌN TINH TẾ) */}
                          {(() => {
                            let headerBg = 'linear-gradient(135deg, rgba(234, 88, 12, 0.68), rgba(249, 115, 22, 0.45))';
                            let headerBorder = '1px solid rgba(251, 146, 60, 0.6)';
                            let headerShadow = '0 4px 16px rgba(234, 88, 12, 0.28)';
                            let badgeBorder = '1px solid rgba(251, 146, 60, 0.75)';

                            let color = '#f59e0b';
                            let dotBg = '#fbbf24';

                            if (st === 'Đang diễn ra') {
                              headerBg = 'linear-gradient(135deg, rgba(16, 185, 129, 0.65), rgba(52, 211, 153, 0.45))';
                              headerBorder = '1px solid rgba(52, 211, 153, 0.6)';
                              headerShadow = '0 4px 16px rgba(16, 185, 129, 0.28)';
                              badgeBorder = '1px solid rgba(52, 211, 153, 0.75)';
                              color = '#34d399';
                              dotBg = '#10b981';
                            } else if (isFinished) {
                              headerBg = 'linear-gradient(135deg, rgba(220, 38, 38, 0.65), rgba(239, 68, 68, 0.45))';
                              headerBorder = '1px solid rgba(239, 68, 68, 0.6)';
                              headerShadow = '0 4px 16px rgba(220, 38, 38, 0.28)';
                              badgeBorder = '1px solid rgba(255, 51, 68, 0.75)';
                              color = '#ff3344';
                              dotBg = '#ff1a2d';
                            } else if (st === 'Đã dời' || st === 'Đã hủy' || st === 'Huỷ lịch') {
                              headerBg = 'linear-gradient(135deg, rgba(147, 51, 234, 0.65), rgba(192, 132, 252, 0.45))';
                              headerBorder = '1px solid rgba(192, 132, 252, 0.6)';
                              headerShadow = '0 4px 16px rgba(147, 51, 234, 0.28)';
                              badgeBorder = '1px solid rgba(192, 132, 252, 0.75)';
                              color = '#c084fc';
                              dotBg = '#a855f7';
                            }

                            const getMins = (t?: string) => {
                              if (!t || !t.includes(':')) return 0;
                              const [h, m] = t.split(':').map(Number);
                              return (h || 0) * 60 + (m || 0);
                            };
                            const pStart = formatTimeWithoutSeconds(item.plannedStartTime || '17:00');
                            const pEnd = formatTimeWithoutSeconds(item.plannedEndTime || '18:00');
                            const plannedMins = Math.max(0, getMins(pEnd) - getMins(pStart));

                            return (
                              <div style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
                                gap: 10, padding: '10px 14px', background: headerBg,
                                borderRadius: 14, border: headerBorder,
                                boxShadow: headerShadow,
                                marginBottom: 12, textAlign: 'center'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                                  {/* THỜI GIAN DỰ KIẾN (KÍCH THƯỚC LỚN HƠN) */}
                                  <span style={{
                                    fontSize: '0.95rem', fontWeight: 900, color: '#ffffff',
                                    display: 'inline-flex', alignItems: 'center', gap: 6
                                  }}>
                                    <Clock style={{ width: 16, height: 16, color: '#ffffff' }} />
                                    DỰ KIẾN: {pStart} – {pEnd}
                                  </span>

                                  {/* LINE NGĂN CÁCH MỎNG */}
                                  <div style={{ height: 14, width: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', margin: '0 2px' }} />

                                  {/* THỜI LƯỢNG PHÚT */}
                                  <span style={{
                                    fontSize: '0.88rem', fontWeight: 900, color: '#ffffff',
                                    display: 'inline-flex', alignItems: 'center', gap: 6
                                  }}>
                                    <Hourglass style={{ width: 14, height: 14, color: '#ffffff' }} />
                                    {plannedMins} phút
                                  </span>
                                </div>

                                {/* HỘP TRẠNG THÁI (CĂN GIỮA & CÓ THỂ XUỐNG DÒNG RÕ RÀNG) */}
                                <div style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '4px 12px', borderRadius: 16,
                                  backgroundColor: '#161b26', border: badgeBorder,
                                  fontSize: '0.78rem', fontWeight: 900, color, flexShrink: 0
                                }}>
                                  <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: dotBg }} />
                                  <span>{st}</span>
                                </div>
                              </div>
                            );
                          })()}

                          {/* ĐẦU MỤC NỘI DUNG/ CHỦ ĐỀ ĐỂ MÀU XANH CYAN (#38bdf8) */}
                          <div style={{ marginTop: 0, marginBottom: 6, fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FileText style={{ width: 13, height: 13, color: '#38bdf8' }} /> NỘI DUNG/ CHỦ ĐỀ
                          </div>

                          {/* 1. NỘI DUNG FONT CHỮ MỎNG HƠN (fontWeight: 600) */}
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', marginBottom: 14, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                            {item.title}
                          </h3>

                          {/* THÀNH PHẦN & CỤM BADGES */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                              <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Users style={{ width: 13, height: 13, color: '#38bdf8' }} /> THÀNH PHẦN
                              </div>
                              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 8, padding: '7px 10px', fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 500 }}>
                                {item.attendees || 'AV; AVG'}
                              </div>
                            </div>

                            {/* 3. CỤM BADGES ĐỒNG BỘ HOÀN TOÀN THEO TONE MÀU TRẠNG THÁI (ĐIỀU HÀNH, THƯ KÝ, PHẠM VI) */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              {/* 1. Điều hành */}
                              <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 700, backgroundColor: statusToneBg, color: statusToneColor, border: statusToneBorder, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <UserCheck style={{ width: 13, height: 13, color: statusToneColor }} /> Điều hành: {item.legalEntity || 'DH'}
                              </span>

                              {/* 2. Thư ký */}
                              <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 700, backgroundColor: statusToneBg, color: statusToneColor, border: statusToneBorder, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <PenTool style={{ width: 13, height: 13, color: statusToneColor }} /> Thư ký: {item.secretary || '2.1'}
                              </span>

                              {/* 3. Phạm vi */}
                              <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 700, backgroundColor: statusToneBg, color: statusToneColor, border: statusToneBorder, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <MapPin style={{ width: 13, height: 13, color: statusToneColor }} /> {item.scope || 'P1'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* ROW DƯỚI CÙNG: GHI CHÚ BÊN TRÁI + CHỮ VBKL & THỜI GIAN THỰC TẾ BẤM SỔ BÊN PHẢI */}
                        <div style={{ paddingTop: 8, borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                          {/* 1. Nhãn Ghi chú để màu xanh Cyan (#38bdf8) */}
                          <div style={{ fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontWeight: 800, color: '#38bdf8' }}>💬 Ghi chú:</span>
                            <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>{item.notes || 'B5.1; bà Bích; 5.1T; 2.1; #K2T online'}</span>
                          </div>

                          {/* 2. CỤM NÚT BÊN PHẢI: VBKL + NÚT SỔ/ẨN THỜI GIAN THỰC TẾ + THÙNG RÁC */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            {item.conclusionDocUrl ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <a
                                  href={item.conclusionDocUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Nhấp để mở Văn Bản Kết Luận cuộc trao đổi"
                                  style={{
                                    padding: '4px 12px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 500, fontStyle: 'italic',
                                    backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)',
                                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
                                  }}
                                >
                                  <Plus style={{ width: 14, height: 14, color: '#38bdf8' }} /> VBKL cuộc trao đổi
                                </a>
                                <button
                                  onClick={() => {
                                    setSelectedVbklEvent(item);
                                    setVbklUrl(item.conclusionDocUrl || '');
                                    setIsVbklModalOpen(true);
                                  }}
                                  title="Tải tệp mới hoặc đổi link VBKL"
                                  style={{
                                    padding: '4px 8px', borderRadius: 8, fontSize: '0.7rem', fontWeight: 700,
                                    backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.1)',
                                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4
                                  }}
                                >
                                  <PenTool style={{ width: 11, height: 11 }} /> Sửa
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedVbklEvent(item);
                                  setVbklUrl('');
                                  setVbklFileName('');
                                  setIsVbklModalOpen(true);
                                }}
                                title="Nhấp để tải Tệp hoặc dán Link Văn Bản Kết Luận sau cuộc trao đổi"
                                style={{
                                  padding: '4px 12px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 500, fontStyle: 'italic',
                                  backgroundColor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px dashed rgba(56, 189, 248, 0.5)',
                                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
                                }}
                              >
                                <Plus style={{ width: 14, height: 14, color: '#38bdf8' }} /> VBKL cuộc trao đổi
                              </button>
                            )}

                            {/* NÚT SỔ / ẨN THỜI GIAN THỰC TẾ (CỐ ĐỊNH Ở VỊ TRÍ BÊN PHẢI, DƯỚI CÙNG HỘP) */}
                            {isFinished && (
                              <button
                                type="button"
                                onClick={() => toggleRealTimeExpand(item.id)}
                                title="Nhấp để xem/sổ chi tiết Thời gian thực tế"
                                style={{
                                  padding: '5px 10px', borderRadius: 8, fontSize: '0.74rem', fontWeight: 700,
                                  backgroundColor: isRealTimeExpanded ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.12)',
                                  color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.35)',
                                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'all 0.15s ease'
                                }}
                              >
                                <Clock style={{ width: 13, height: 13, color: '#34d399' }} />
                                <span>{isRealTimeExpanded ? 'Thu gọn Thực tế ▲' : 'Thời gian Thực tế ▼'}</span>
                              </button>
                            )}

                            {/* NÚT ICON THÙNG RÁC XÓA LỊCH */}
                            <button
                              type="button"
                              onClick={() => handleDeleteDiscussionEvent(item.id, item.title)}
                              title="Xóa lịch trao đổi này khỏi hệ thống & bộ nhớ"
                              style={{
                                padding: '5px 8px', borderRadius: 8,
                                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#f87171', cursor: 'pointer',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <Trash2 style={{ width: 14, height: 14, color: '#f87171' }} />
                            </button>
                          </div>
                        </div>
                      </div>

                          {/* 2. HỘP BÊN PHẢI (THỜI GIAN THỰC TẾ - CHỈ HIỂN THỊ KHI ĐƯỢC BẤM SỔ MỞ RA) */}
                          {isFinished && isRealTimeExpanded && (() => {
                            const actS = formatTimeWithoutSeconds((item as any).actualStartTime || item.plannedStartTime || '17:00');
                            const actE = formatTimeWithoutSeconds((item as any).actualEndTime || item.plannedEndTime || '18:00');
                            const pStart = formatTimeWithoutSeconds(item.plannedStartTime || '17:00');
                            const pEnd = formatTimeWithoutSeconds(item.plannedEndTime || '18:00');

                            const getMins = (t?: string) => {
                              if (!t || !t.includes(':')) return 0;
                              const [h, m] = t.split(':').map(Number);
                              return (h || 0) * 60 + (m || 0);
                            };

                            const actMins = Math.max(0, getMins(actE) - getMins(actS));
                            const planMins = Math.max(0, getMins(pEnd) - getMins(pStart));
                            const inflationMins = actMins - planMins;
                            const isOvertime = inflationMins > 0;

                            const headerBg = isOvertime
                              ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.65), rgba(239, 68, 68, 0.45))'
                              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.65), rgba(52, 211, 153, 0.45))';
                            const headerBorder = isOvertime
                              ? '1px solid rgba(239, 68, 68, 0.6)'
                              : '1px solid rgba(52, 211, 153, 0.6)';
                            const headerShadow = isOvertime
                              ? '0 4px 16px rgba(220, 38, 38, 0.28)'
                              : '0 4px 16px rgba(16, 185, 129, 0.28)';

                            const boxBg = isOvertime
                              ? 'rgba(239, 68, 68, 0.04)'
                              : 'rgba(16, 185, 129, 0.04)';
                            const boxBorder = isOvertime
                              ? '1px solid rgba(239, 68, 68, 0.35)'
                              : '1px solid rgba(52, 211, 153, 0.35)';

                            return (
                              <div className="discussion-card-box" style={{
                                flex: '3.2 1 0%', backgroundColor: boxBg, border: boxBorder,
                                borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10
                              }}>
                                <div>
                                  {/* 1. THỜI GIAN THỰC TẾ HEADER */}
                                  <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '10px 12px', background: headerBg,
                                    borderRadius: 14, border: headerBorder,
                                    boxShadow: headerShadow,
                                    marginBottom: 12
                                  }}>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                                      {/* THỰC TẾ: HH:MM - HH:MM */}
                                      <span style={{
                                        fontSize: '0.82rem', fontWeight: 900, color: '#ffffff',
                                        display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap'
                                      }}>
                                        <Clock style={{ width: 15, height: 15, color: '#ffffff' }} />
                                        THỰC TẾ: {actS} – {actE}
                                      </span>

                                      {/* LINE NGĂN CÁCH MỎNG */}
                                      <div style={{ height: 14, width: 1, backgroundColor: 'rgba(255, 255, 255, 0.35)', margin: '0 2px' }} />

                                      {/* THỜI LƯỢNG THỰC TẾ PHÚT */}
                                      <span style={{
                                        fontSize: '0.82rem', fontWeight: 900, color: '#ffffff',
                                        display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap'
                                      }}>
                                        <Hourglass style={{ width: 14, height: 14, color: '#ffffff' }} />
                                        {actMins} phút
                                      </span>
                                    </div>
                                  </div>

                                  {/* 2, 3. BẮT ĐẦU & KẾT THÚC CÓ TÍNH NĂNG CẬP NHẬT & CHỈNH SỬA LINH HOẠT */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {/* Ô 1: BẮT ĐẦU */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                          <Play style={{ width: 10, height: 10, color: '#38bdf8', fill: '#38bdf8' }} /> BẮT ĐẦU:
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const now = getVietnamNow();
                                            const hh = String(now.getHours()).padStart(2, '0');
                                            const mm = String(now.getMinutes()).padStart(2, '0');
                                            const currentVnStr = `${hh}:${mm}`;
                                            const curVal = (item as any).actualStartTime || item.plannedStartTime || currentVnStr;

                                            const inputVal = window.prompt(
                                              `✍️ Cập nhật Giờ BẮT ĐẦU thực tế (Định dạng HH:mm):\n(Nhấn OK để lấy giờ hiện tại Việt Nam: ${currentVnStr} hoặc tự nhập giờ tùy chỉnh)`,
                                              curVal
                                            );
                                            if (inputVal !== null && inputVal.trim()) {
                                              handleUpdateActualTime(item.id, 'actualStartTime', inputVal.trim());
                                              showToast(`💾 Đã LƯU thành công giờ BẮT ĐẦU thực tế: ${formatTimeWithoutSeconds(inputVal.trim())}`);
                                            }
                                          }}
                                          title="Nhấp để cập nhật giờ BẮT ĐẦU thực tế"
                                          style={{
                                            padding: '4px 6px', borderRadius: 6,
                                            backgroundColor: 'rgba(56, 189, 248, 0.18)', border: '1px solid rgba(56, 189, 248, 0.4)',
                                            color: '#38bdf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.15s ease', boxShadow: '0 2px 8px rgba(56, 189, 248, 0.2)'
                                          }}
                                        >
                                          <Plus style={{ width: 12, height: 12, color: '#38bdf8' }} />
                                        </button>
                                      </div>
                                      <input
                                        type="time"
                                        value={formatTimeWithoutSeconds((item as any).actualStartTime || item.plannedStartTime || '17:00')}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          if (val) {
                                            handleUpdateActualTime(item.id, 'actualStartTime', val);
                                            showToast(`💾 Đã LƯU thành công giờ BẮT ĐẦU thực tế: ${formatTimeWithoutSeconds(val)}`);
                                          }
                                        }}
                                        style={{
                                          backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontSize: '1.05rem',
                                          fontWeight: 900, fontFamily: 'monospace', outline: 'none', cursor: 'pointer', width: '100%',
                                          colorScheme: 'dark'
                                        }}
                                      />
                                    </div>

                                    {/* Ô 2: KẾT THÚC */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                          <Square style={{ width: 10, height: 10, color: '#38bdf8', fill: '#38bdf8' }} /> KẾT THÚC:
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const now = getVietnamNow();
                                            const hh = String(now.getHours()).padStart(2, '0');
                                            const mm = String(now.getMinutes()).padStart(2, '0');
                                            const currentVnStr = `${hh}:${mm}`;
                                            const curVal = (item as any).actualEndTime || item.plannedEndTime || currentVnStr;

                                            const inputVal = window.prompt(
                                              `✍️ Cập nhật Giờ KẾT THÚC thực tế (Định dạng HH:mm):\n(Nhấn OK để lấy giờ hiện tại Việt Nam: ${currentVnStr} hoặc tự nhập giờ tùy chỉnh)`,
                                              curVal
                                            );
                                            if (inputVal !== null && inputVal.trim()) {
                                              handleUpdateActualTime(item.id, 'actualEndTime', inputVal.trim());
                                              showToast(`💾 Đã LƯU thành công giờ KẾT THÚC thực tế: ${formatTimeWithoutSeconds(inputVal.trim())}`);
                                            }
                                          }}
                                          title="Nhấp để cập nhật giờ KẾT THÚC thực tế"
                                          style={{
                                            padding: '4px 6px', borderRadius: 6,
                                            backgroundColor: 'rgba(56, 189, 248, 0.18)', border: '1px solid rgba(56, 189, 248, 0.4)',
                                            color: '#38bdf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.15s ease', boxShadow: '0 2px 8px rgba(56, 189, 248, 0.2)'
                                          }}
                                        >
                                          <Plus style={{ width: 12, height: 12, color: '#38bdf8' }} />
                                        </button>
                                      </div>
                                      <input
                                        type="time"
                                        value={formatTimeWithoutSeconds((item as any).actualEndTime || item.plannedEndTime || '18:00')}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          if (val) {
                                            handleUpdateActualTime(item.id, 'actualEndTime', val);
                                            showToast(`💾 Đã LƯU thành công giờ KẾT THÚC thực tế: ${formatTimeWithoutSeconds(val)}`);
                                          }
                                        }}
                                        style={{
                                          backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontSize: '1.05rem',
                                          fontWeight: 900, fontFamily: 'monospace', outline: 'none', cursor: 'pointer', width: '100%',
                                          colorScheme: 'dark'
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* 3 & 4. TỔNG THỜI LƯỢNG & LẠM PHÁT SUMMARY */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                                  {/* TỔNG THỜI LƯỢNG */}
                                  <div style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(56, 189, 248, 0.3)',
                                    borderRadius: 10, padding: '8px 10px', fontSize: '0.76rem', textAlign: 'center',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                                  }}>
                                    <Clock style={{ width: 14, height: 14, color: '#38bdf8' }} />
                                    <span style={{ color: '#38bdf8', fontWeight: 800 }}>TỔNG THỜI LƯỢNG:</span>
                                    <span style={{ color: '#ffffff', fontWeight: 900 }}>{actMins} phút</span>
                                  </div>

                                  {/* LẠM PHÁT */}
                                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <div style={{
                                      width: '100%', padding: '8px 10px', borderRadius: 10,
                                      backgroundColor: isOvertime ? 'rgba(239, 68, 68, 0.18)' : 'rgba(16, 185, 129, 0.18)',
                                      border: isOvertime ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(52, 211, 153, 0.4)',
                                      fontSize: '0.76rem', textAlign: 'center',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                                    }}>
                                      <AlertTriangle style={{ width: 14, height: 14, color: isOvertime ? '#ef4444' : '#34d399' }} />
                                      <span style={{ color: isOvertime ? '#ef4444' : '#34d399', fontWeight: 800 }}>LẠM PHÁT:</span>
                                      <span style={{ color: isOvertime ? '#ff3344' : '#34d399', fontWeight: 900 }}>
                                        {inflationMins > 0 ? `+${inflationMins} phút` : '0 phút'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                  </div>

                 </React.Fragment>
              );
            })}
              </div>
            );
          })()}
            </div>
          )}

          {/* TAB 3.1: KẾ HOẠCH NĂM */}
          {activeTab === 'system-annual-plan' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* HEADER BANNER FOR ANNUAL PLAN TAB */}
              <div style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(255, 112, 67, 0.25) 0%, rgba(15, 23, 42, 0.95) 75%), linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                border: '1px solid rgba(255, 112, 67, 0.4)', borderRadius: 24, padding: '24px 32px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
                backdropFilter: 'blur(16px)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ padding: 8, borderRadius: 12, backgroundColor: 'rgba(255, 112, 67, 0.15)', border: '1px solid rgba(255, 112, 67, 0.3)' }}>
                      <Target style={{ width: 22, height: 22, color: '#ff7043' }} />
                    </div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase' }}>
                      KẾ HOẠCH NĂM 2026 & MỤC TIÊU CHIẾN LƯỢC AVG ONE
                    </h1>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#cbd5e1', margin: 0, maxWidth: 760, lineHeight: 1.5, fontWeight: 500 }}>
                    Bảng tổng hợp chỉ tiêu OKRs, cột mốc trọng yếu 4 quý, phân bổ nguồn lực và lộ trình số hóa liên thông 8 Đầu Mối.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => showToast('📊 Đã làm mới dữ liệu Kế hoạch năm 2026!')}
                    style={{
                      padding: '10px 18px', borderRadius: 12, backgroundColor: 'rgba(255, 112, 67, 0.15)',
                      color: '#ff7043', border: '1px solid rgba(255, 112, 67, 0.4)', fontSize: '0.78rem',
                      fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                    }}
                  >
                    <RefreshCw style={{ width: 15, height: 15 }} /> Làm Mới Chỉ Tiêu
                  </button>
                </div>
              </div>

              {/* 4 OVERVIEW STAT CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div style={{ backgroundColor: '#111624', border: '1px solid rgba(255, 112, 67, 0.3)', borderRadius: 16, padding: '18px 20px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ff7043', textTransform: 'uppercase', marginBottom: 6 }}>CHỈ TIÊU OKRs 2026</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>100% Hoàn Thành</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 4 }}>Chuỗi 13 bước việc liên thông</div>
                </div>
                <div style={{ backgroundColor: '#111624', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 16, padding: '18px 20px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6 }}>CỘT MỐC Q1 - Q4</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>4/4 Quý Vượt Mức</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 4 }}>Tối ưu thời gian sản xuất</div>
                </div>
                <div style={{ backgroundColor: '#111624', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 16, padding: '18px 20px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: 6 }}>NĂNG LỰC SẢN XUẤT</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>15,000 Đơn / Năm</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 4 }}>Cụm Nhà sản 3.1 & 3.2</div>
                </div>
                <div style={{ backgroundColor: '#111624', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: 16, padding: '18px 20px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginBottom: 6 }}>TIẾN ĐỘ THỰC HIỆN</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>78.5% Đạt Target</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 4 }}>Cập nhật tự động Realtime</div>
                </div>
              </div>

              {/* ROADMAP GRID 4 QUARTERS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {/* Q1 */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(52, 211, 153, 0.4)', borderRadius: 18, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#34d399' }}>QUÝ 1 / 2026</span>
                    <span style={{ padding: '3px 8px', borderRadius: 6, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: '0.7rem', fontWeight: 800 }}>100% ĐÃ XONG</span>
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Số Hóa 100% 8 Đầu Mối Vận Hành</h4>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Triển khai chuẩn hóa luồng công việc liên thông 13 bước, tích hợp bảng điều khiển phê duyệt một chạm qua AVG One App.
                  </p>
                </div>

                {/* Q2 */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(52, 211, 153, 0.4)', borderRadius: 18, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#34d399' }}>QUÝ 2 / 2026</span>
                    <span style={{ padding: '3px 8px', borderRadius: 6, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: '0.7rem', fontWeight: 800 }}>95% ĐÃ XONG</span>
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Giải Trình Dữ Liệu Tự Động Với Thuế</h4>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Xử lý khớp nối nhật ký Lệnh Sản Xuất & Xuất Kho cùng 1 ngày, kiểm kê tồn kho bo mạch tồn và hóa đơn liên thông.
                  </p>
                </div>

                {/* Q3 */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.5)', borderRadius: 18, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#38bdf8' }}>QUÝ 3 / 2026</span>
                    <span style={{ padding: '3px 8px', borderRadius: 6, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800 }}>75% ĐANG TIẾN HÀNH</span>
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Mô Đun AI Sensor & Đồng Bộ 24/7</h4>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Nghiên cứu chip đo lường công nghiệp mới tại Cụm 3.1 & tự động hóa đồng bộ 24/7 dữ liệu với Google Sheet.
                  </p>
                </div>

                {/* Q4 */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(249, 115, 22, 0.4)', borderRadius: 18, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#f97316' }}>QUÝ 4 / 2026</span>
                    <span style={{ padding: '3px 8px', borderRadius: 6, backgroundColor: 'rgba(249, 115, 22, 0.15)', color: '#f97316', fontSize: '0.7rem', fontWeight: 800 }}>40% KẾ HOẠCH</span>
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Mở Rộng Hệ Thống Nhà Sản Phụ Trợ</h4>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Liên thông 100% đối tác nhà sản phụ trợ bên ngoài, tích hợp module cảnh báo lạm phát thời gian thực tế.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3.2: THÔNG ĐIỆP ĐIỀU HÀNH 24/7 (ĐỒNG BỘ 100% THEO GOOGLE SHEET VÀ TONE MÀU LỊCH) */}
          {activeTab === 'system-executive-message' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
              
              {/* 1. HEADER BANNER (ĐỒNG BỘ HOÀN TOÀN VỚI TONE MÀU TAB LỊCH TRAO ĐỔI HÀNG NGÀY) */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.7), rgba(14, 165, 233, 0.35), rgba(11, 15, 25, 0.95))',
                border: '1px solid #38bdf8', borderRadius: 24, padding: '28px 34px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
                backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.02em', lineHeight: 1.15 }}>
                    THÔNG ĐIỆP & NGHỊ QUYẾT ĐIỀU HÀNH
                  </h1>

                  {/* DESCRIPTION SUB-BOX (GIỐNG HỆT BOX NỘI DUNG MÔ TẢ CỦA LỊCH) */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 14px', borderRadius: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(56, 189, 248, 0.3)',
                    backdropFilter: 'blur(6px)', width: 'fit-content'
                  }}>
                    <span style={{ fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 600, lineHeight: 1.4 }}>
                      Kênh tổng hợp, giám sát và phân loại dữ liệu Thông Điệp Điều Hành 24/7 từ Google Sheet chính thức của tập đoàn AVG.
                    </span>
                  </div>
                </div>

                {/* TOP ACTION BUTTONS */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <a
                    href="https://docs.google.com/spreadsheets/d/13cN2ert23B1W4wlySPXXVbCj-UgICEef5UQb7FI2vSA/edit?gid=269023045#gid=269023045"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '11px 20px', borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.82rem',
                      fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.2s ease'
                    }}
                  >
                    <Globe style={{ width: 16, height: 16 }} /> Xem Google Sheet Gốc
                  </a>
                </div>
              </div>

              {/* 2. 4 EXECUTIVE STATS KPI OVERVIEW CARDS (KHU VỰC THỐNG KÊ KHOA HỌC TỔNG SỐ 798) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {/* CARD 1: TỔNG TĐĐH */}
                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      TỔNG THÔNG ĐIỆP & THÔNG TIN
                    </span>
                    <div style={{ padding: 6, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                      <Zap style={{ width: 18, height: 18, color: '#38bdf8' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                    798 <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>Thông điệp</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                    Tỷ lệ bao phủ: <strong style={{ color: '#38bdf8' }}>100%</strong> toàn bộ hệ thống
                  </div>
                </div>

                {/* CARD 2: TĐĐH TRỰC TIẾP */}
                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      TĐĐH TRỰC TIẾP (CHỈ ĐẠO LÕI)
                    </span>
                    <div style={{ padding: 6, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                      <CheckCircle2 style={{ width: 18, height: 18, color: '#38bdf8' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                    386 <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>~ 48,37%</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                    Chỉ đạo trực tiếp có giá trị pháp lý & bắt buộc
                  </div>
                </div>

                {/* CARD 3: TĐĐH GIÁN TIẾP */}
                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(192, 132, 252, 0.4)',
                  borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      TĐĐH GIÁN TIẾP (THAM KHẢO)
                    </span>
                    <div style={{ padding: 6, borderRadius: 10, backgroundColor: 'rgba(192, 132, 252, 0.2)' }}>
                      <Share2 style={{ width: 18, height: 18, color: '#c084fc' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                    129 <span style={{ fontSize: '0.85rem', color: '#c084fc', fontWeight: 700 }}>~ 16,17%</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                    Nhóm thông tin truyền thông & tham khảo kỹ thuật
                  </div>
                </div>

                {/* CARD 4: TĐĐH CHƯA/KHÔNG XÁC NHẬN */}
                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: 18, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      TĐĐH CHƯA / KHÔNG XÁC NHẬN
                    </span>
                    <div style={{ padding: 6, borderRadius: 10, backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                      <AlertCircle style={{ width: 18, height: 18, color: '#f59e0b' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                    283 <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 700 }}>~ 35,46%</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                    Điểm nóng khủng hoảng & đề xuất cần tháo gỡ
                  </div>
                </div>
              </div>

              {/* 3. MULTI-DIMENSIONAL TOOLBAR: SEARCH & CATEGORY FILTERS & SENDER HUBS */}
              <div style={{
                backgroundColor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 14,
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
              }}>
                {/* ROW 1: SEARCH & VIEW MODE SWITCHER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                  {/* Search Input */}
                  <div style={{ position: 'relative', flex: '1 1 340px' }}>
                    <Search style={{ width: 18, height: 18, color: '#64748b', position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Tìm kiếm thông điệp, nội dung chỉ đạo, đầu mối phát đi, ghi chú hoặc link..."
                      value={directiveSearchQuery}
                      onChange={e => setDirectiveSearchQuery(e.target.value)}
                      style={{
                        width: '100%', backgroundColor: '#0b0f19', border: '1px solid rgba(56, 189, 248, 0.35)',
                        borderRadius: 12, padding: '11px 16px 11px 44px', fontSize: '0.84rem', color: '#ffffff', outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
                      }}
                    />
                    {directiveSearchQuery && (
                      <button
                        onClick={() => setDirectiveSearchQuery('')}
                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                      >
                        <X style={{ width: 16, height: 16 }} />
                      </button>
                    )}
                  </div>

                  {/* View Mode Toggle Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#0b0f19', padding: 4, borderRadius: 12, border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                    {[
                      { key: 'table', label: 'BẢNG DỮ LIỆU KHOA HỌC', icon: <Table style={{ width: 14, height: 14 }} /> },
                      { key: 'timeline', label: 'DÒNG THỜI GIAN 24/7', icon: <Clock style={{ width: 14, height: 14 }} /> },
                      { key: 'crisis', label: 'ĐIỂM NÓNG KHỦNG HOẢNG', icon: <AlertTriangle style={{ width: 14, height: 14 }} /> }
                    ].map(mode => (
                      <button
                        key={mode.key}
                        type="button"
                        onClick={() => setDirectiveViewMode(mode.key as any)}
                        style={{
                          padding: '8px 14px', borderRadius: 9, fontSize: '0.75rem', fontWeight: 800,
                          backgroundColor: directiveViewMode === mode.key ? '#0284c7' : 'transparent',
                          color: directiveViewMode === mode.key ? '#ffffff' : '#94a3b8',
                          border: directiveViewMode === mode.key ? '1px solid #38bdf8' : '1px solid transparent',
                          cursor: 'pointer', transition: 'all 0.18s ease', display: 'flex', alignItems: 'center', gap: 6
                        }}
                      >
                        {mode.icon}
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ROW 2: CATEGORY PILLS & SENDER HUB SELECT */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid rgba(56, 189, 248, 0.15)', paddingTop: 12 }}>
                  {/* Category Filter Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Filter style={{ width: 14, height: 14 }} /> Phân Loại TĐĐH:
                    </span>
                    {[
                      { key: 'ALL', label: 'Tất Cả (798)', icon: <Layers style={{ width: 13, height: 13 }} /> },
                      { key: 'TRỰC TIẾP', label: 'Trực Tiếp (386)', icon: <Zap style={{ width: 13, height: 13 }} /> },
                      { key: 'GIÁN TIẾP', label: 'Gián Tiếp (129)', icon: <Share2 style={{ width: 13, height: 13 }} /> },
                      { key: 'CHƯA XÁC NHẬN', label: 'Chưa Xác Nhận (283)', icon: <AlertCircle style={{ width: 13, height: 13 }} /> }
                    ].map(cat => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setDirectiveFilterCategory(cat.key)}
                        style={{
                          padding: '6px 14px', borderRadius: 10, fontSize: '0.76rem', fontWeight: 800,
                          backgroundColor: directiveFilterCategory === cat.key ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.04)',
                          color: directiveFilterCategory === cat.key ? '#38bdf8' : '#94a3b8',
                          border: directiveFilterCategory === cat.key ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer', transition: 'all 0.18s ease', display: 'inline-flex', alignItems: 'center', gap: 6
                        }}
                      >
                        {cat.icon}
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Sender Hub Select */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8' }}>Đầu Mối Phát Đi:</span>
                    <select
                      value={directiveFilterSender}
                      onChange={e => setDirectiveFilterSender(e.target.value)}
                      style={{
                        backgroundColor: '#0b0f19', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)',
                        borderRadius: 10, padding: '6px 12px', fontSize: '0.76rem', fontWeight: 800, outline: 'none', cursor: 'pointer'
                      }}
                    >
                      <option value="ALL">Tất cả Đầu mối Chủ thể</option>
                      <option value="DH H&J">Điều Hành H&J</option>
                      <option value="DH AVG">Điều Hành AVG</option>
                      <option value="#K1">#K1 (Cố Vấn KTS)</option>
                      <option value="Kiến">Đầu Mối Kiến</option>
                      <option value="1">Đầu Mối 1 (Tài Chính)</option>
                      <option value="2.1">Đầu Mối 2.1 (Nhân Sự)</option>
                      <option value="2.2">Đầu Mối 2.2 (Hạ Tầng)</option>
                      <option value="3.1">Đầu Mối 3.1 (R&D)</option>
                      <option value="3.2">Đầu Mối 3.2 (Thiết Kế)</option>
                      <option value="4.T">Đầu Mối 4.T (Truyền Thông)</option>
                      <option value="5.1B">Đầu Mối 5.1B (Đầu Vào)</option>
                      <option value="5.1T">Đầu Mối 5.1T (Đầu Ra)</option>
                      <option value="#">Đầu Mối # (Sản Xuất)</option>
                      <option value="0">Đầu Mối 0</option>
                      <option value="8">Đầu Mối 8</option>
                      <option value="9">Đầu Mối 9</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. MAIN DISPLAY AREA: TABLE VIEW / TIMELINE VIEW / CRISIS VIEW */}
              {(() => {
                // Filter messages
                const filteredMsgs = executiveSheetMessages.filter(msg => {
                  if (directiveFilterCategory !== 'ALL' && msg.category !== directiveFilterCategory) return false;
                  if (directiveFilterSender !== 'ALL' && !msg.senderHub.includes(directiveFilterSender)) return false;
                  if (directiveSearchQuery) {
                    const q = directiveSearchQuery.toLowerCase();
                    return msg.content.toLowerCase().includes(q) ||
                           msg.senderHub.toLowerCase().includes(q) ||
                           msg.targetHub.toLowerCase().includes(q) ||
                           (msg.notes && msg.notes.toLowerCase().includes(q)) ||
                           (msg.attachmentUrl && msg.attachmentUrl.toLowerCase().includes(q));
                  }
                  return true;
                });

                if (filteredMsgs.length === 0) {
                  return (
                    <div style={{ padding: 48, textAlign: 'center', backgroundColor: '#0f172a', borderRadius: 20, border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                      <Zap style={{ width: 44, height: 44, color: '#64748b', marginBottom: 12 }} />
                      <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem' }}>Không tìm thấy thông điệp phù hợp</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.84rem', marginTop: 4 }}>Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc phân loại khác</div>
                    </div>
                  );
                }

                // VIEW MODE 1: BẢNG DỮ LIỆU KHOA HỌC (SCIENTIFIC TABLE VIEW)
                if (directiveViewMode === 'table') {
                  return (
                    <div style={{ backgroundColor: '#0b0f19', borderRadius: 20, border: '1px solid rgba(56, 189, 248, 0.35)', overflow: 'hidden', boxShadow: '0 12px 35px rgba(0,0,0,0.6)' }}>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                              <th style={{ padding: '14px 16px', width: 140 }}>Thời gian</th>
                              <th style={{ padding: '14px 16px', width: 130 }}>Chủ thể phát</th>
                              <th style={{ padding: '14px 16px', width: 160 }}>Đầu mối phối hợp</th>
                              <th style={{ padding: '14px 16px', width: 150 }}>Phân loại TĐĐH</th>
                              <th style={{ padding: '14px 16px' }}>Nội dung thông điệp chỉ đạo</th>
                              <th style={{ padding: '14px 16px', width: 180 }}>Ghi chú / Chuyển tiếp</th>
                              <th style={{ padding: '14px 16px', width: 120, textAlign: 'center' }}>Đính kèm</th>
                              <th style={{ padding: '14px 16px', width: 90, textAlign: 'center' }}>Chi tiết</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredMsgs.map((msg, idx) => {
                              const isDirect = msg.category === 'TRỰC TIẾP';
                              const isIndirect = msg.category === 'GIÁN TIẾP';
                              const isPending = msg.category === 'CHƯA XÁC NHẬN';

                              const categoryBadgeBg = isDirect ? 'rgba(56, 189, 248, 0.15)' : isIndirect ? 'rgba(192, 132, 252, 0.15)' : 'rgba(245, 158, 11, 0.15)';
                              const categoryBadgeColor = isDirect ? '#38bdf8' : isIndirect ? '#c084fc' : '#f59e0b';
                              const categoryBorder = isDirect ? 'rgba(56, 189, 248, 0.4)' : isIndirect ? 'rgba(192, 132, 252, 0.4)' : 'rgba(245, 158, 11, 0.4)';

                              return (
                                <tr
                                  key={msg.id}
                                  style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent',
                                    transition: 'background-color 0.18s ease'
                                  }}
                                >
                                  {/* THỜI GIAN */}
                                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                                    <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.84rem' }}>{msg.date}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, marginTop: 2 }}>{msg.dayOfWeek} • {msg.time}</div>
                                  </td>

                                  {/* CHỦ THỂ PHÁT */}
                                  <td style={{ padding: '14px 16px' }}>
                                    <span style={{
                                      backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)',
                                      color: '#38bdf8', fontSize: '0.74rem', fontWeight: 900, padding: '3px 10px', borderRadius: 8,
                                      display: 'inline-block'
                                    }}>
                                      {msg.senderHub}
                                    </span>
                                  </td>

                                  {/* ĐẦU MỐI PHỐI HỢP */}
                                  <td style={{ padding: '14px 16px' }}>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.76rem', fontWeight: 600 }}>
                                      {msg.targetHub || '—'}
                                    </span>
                                  </td>

                                  {/* PHÂN LOẠI TĐĐH */}
                                  <td style={{ padding: '14px 16px' }}>
                                    <span style={{
                                      backgroundColor: categoryBadgeBg, border: `1px solid ${categoryBorder}`,
                                      color: categoryBadgeColor, fontSize: '0.7rem', fontWeight: 900, padding: '4px 10px', borderRadius: 12,
                                      whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5
                                    }}>
                                      {isDirect && <Zap style={{ width: 12, height: 12 }} />}
                                      {isIndirect && <Share2 style={{ width: 12, height: 12 }} />}
                                      {isPending && <AlertCircle style={{ width: 12, height: 12 }} />}
                                      {msg.category}
                                    </span>
                                  </td>

                                  {/* NỘI DUNG CHÍNH */}
                                  <td style={{ padding: '14px 16px', color: '#e2e8f0', lineHeight: 1.5, fontWeight: 500 }}>
                                    <div style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {msg.content}
                                    </div>
                                  </td>

                                  {/* GHI CHÚ / CHUYỂN TIẾP */}
                                  <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.76rem', lineHeight: 1.4 }}>
                                    {msg.notes ? (
                                      <div style={{ fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        <MessageSquare style={{ width: 12, height: 12, display: 'inline', verticalAlign: 'middle', marginRight: 4, color: '#38bdf8' }} /> {msg.notes}
                                      </div>
                                    ) : (
                                      <span style={{ color: '#475569' }}>—</span>
                                    )}
                                  </td>

                                  {/* ĐÍNH KÈM */}
                                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                    {msg.attachmentUrl ? (
                                      <a
                                        href={msg.attachmentUrl.startsWith('http') ? msg.attachmentUrl : `https://drive.google.com/drive/my-drive`}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                          padding: '5px 10px', borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                          color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', fontSize: '0.72rem',
                                          fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4
                                        }}
                                      >
                                        <Paperclip style={{ width: 12, height: 12 }} /> File
                                      </a>
                                    ) : (
                                      <span style={{ color: '#475569', fontSize: '0.72rem' }}>Không có</span>
                                    )}
                                  </td>

                                  {/* CHI TIẾT */}
                                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedSheetMsg(msg)}
                                      style={{
                                        padding: '5px 12px', borderRadius: 8, backgroundColor: '#0284c7',
                                        color: '#ffffff', border: 'none', fontSize: '0.72rem', fontWeight: 800,
                                        cursor: 'pointer', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.4)',
                                        display: 'inline-flex', alignItems: 'center', gap: 4
                                      }}
                                    >
                                      <Eye style={{ width: 12, height: 12 }} /> Xem
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }

                // VIEW MODE 2: DÒNG THỜI GIAN 24/7 (CHRONOLOGICAL TIMELINE)
                if (directiveViewMode === 'timeline') {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', paddingLeft: 20, borderLeft: '2px dashed rgba(56, 189, 248, 0.4)' }}>
                      {filteredMsgs.map((msg) => (
                        <div
                          key={msg.id}
                          style={{
                            backgroundColor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: 18, padding: 20, boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                            position: 'relative', display: 'flex', flexDirection: 'column', gap: 12
                          }}
                        >
                          {/* TIMELINE NODE DOT */}
                          <div style={{
                            position: 'absolute', left: -29, top: 22, width: 16, height: 16, borderRadius: '50%',
                            backgroundColor: '#0284c7', border: '3px solid #0b0f19', boxShadow: '0 0 10px #38bdf8'
                          }} />

                          {/* HEADER */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ fontSize: '0.86rem', fontWeight: 900, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Clock style={{ width: 14, height: 14 }} /> {msg.date} • {msg.time}
                              </span>
                              <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 10px', borderRadius: 8, fontSize: '0.72rem', fontWeight: 900, border: '1px solid rgba(56, 189, 248, 0.35)' }}>
                                {msg.senderHub}
                              </span>
                              <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>➔ {msg.targetHub}</span>
                            </div>

                            <span style={{
                              padding: '3px 10px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 900,
                              backgroundColor: msg.category === 'TRỰC TIẾP' ? 'rgba(56, 189, 248, 0.15)' : msg.category === 'GIÁN TIẾP' ? 'rgba(192, 132, 252, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: msg.category === 'TRỰC TIẾP' ? '#38bdf8' : msg.category === 'GIÁN TIẾP' ? '#c084fc' : '#f59e0b',
                              border: `1px solid ${msg.category === 'TRỰC TIẾP' ? '#38bdf8' : msg.category === 'GIÁN TIẾP' ? '#c084fc' : '#f59e0b'}`,
                              display: 'inline-flex', alignItems: 'center', gap: 4
                            }}>
                              {msg.category === 'TRỰC TIẾP' && <Zap style={{ width: 12, height: 12 }} />}
                              {msg.category === 'GIÁN TIẾP' && <Share2 style={{ width: 12, height: 12 }} />}
                              {msg.category === 'CHƯA XÁC NHẬN' && <AlertCircle style={{ width: 12, height: 12 }} />}
                              {msg.category}
                            </span>
                          </div>

                          {/* BODY CONTENT */}
                          <div style={{ backgroundColor: '#0b0f19', borderRadius: 12, padding: 14, border: '1px solid rgba(255,255,255,0.06)', color: '#e2e8f0', fontSize: '0.86rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                            {msg.content}
                          </div>

                          {/* FOOTER NOTES & ATTACHMENT */}
                          {(msg.notes || msg.attachmentUrl) && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, fontSize: '0.76rem', color: '#94a3b8' }}>
                              {msg.notes && <div>💬 Ghi chú: <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>{msg.notes}</span></div>}
                              {msg.attachmentUrl && (
                                <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <Paperclip style={{ width: 12, height: 12 }} /> Xem tài liệu đính kèm
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                }

                // VIEW MODE 3: ĐIỂM NÓNG KHỦNG HOẢNG (CRISIS TRACKER)
                const crisisMsgs = filteredMsgs.filter(m => m.category === 'CHƯA XÁC NHẬN' || m.content.toLowerCase().includes('khủng hoảng') || m.content.toLowerCase().includes('lỗi') || m.content.toLowerCase().includes('sa thải'));

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 16, padding: '14px 20px', color: '#f59e0b', fontSize: '0.84rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <AlertTriangle style={{ width: 20, height: 20, color: '#f59e0b' }} />
                      <span>Danh sách các Điểm nóng Khủng hoảng, Đề xuất cần tháo gỡ cấp thiết và Thông điệp Chưa/Không xác nhận ({crisisMsgs.length} điểm nóng)</span>
                    </div>

                    {crisisMsgs.map(msg => (
                      <div
                        key={msg.id}
                        style={{
                          backgroundColor: '#0f172a', border: '1px solid rgba(245, 158, 11, 0.4)',
                          borderRadius: 18, padding: 22, boxShadow: '0 8px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: 14
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 12px', borderRadius: 8, fontSize: '0.76rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <AlertCircle style={{ width: 14, height: 14 }} /> ĐIỂM NÓNG CẦN THÁO GỠ
                            </span>
                            <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.85rem' }}>{msg.date} • {msg.time}</span>
                          </div>
                          <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.78rem' }}>Phát đi từ: {msg.senderHub} ➔ {msg.targetHub}</span>
                        </div>

                        <div style={{ backgroundColor: '#0b0f19', borderRadius: 12, padding: 16, border: '1px solid rgba(245, 158, 11, 0.2)', color: '#ffffff', fontSize: '0.86rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                          {msg.content}
                        </div>

                        {msg.notes && (
                          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: 10, fontSize: '0.78rem', color: '#cbd5e1' }}>
                            <strong style={{ color: '#f59e0b' }}>Ghi chú xử lý:</strong> {msg.notes}
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, paddingTop: 6 }}>
                          {msg.attachmentUrl ? (
                            <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', fontSize: '0.76rem', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Paperclip style={{ width: 14, height: 14 }} /> Văn bản / Hình ảnh minh chứng
                            </a>
                          ) : <div />}

                          <button
                            type="button"
                            onClick={() => {
                              showToast(`✅ Đã ghi nhận tháo gỡ điểm nóng phát đi từ ${msg.senderHub}!`);
                            }}
                            style={{ padding: '8px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#ffffff', border: 'none', fontSize: '0.78rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                          >
                            <Zap style={{ width: 14, height: 14 }} /> Tiếp Nhận & Tháo Gỡ Ngay
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* 5. INSPECTOR MODAL / DRAWER (CHI TIẾT THÔNG ĐIỆP ĐIỀU HÀNH) */}
              {selectedSheetMsg && (
                <div style={{
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)',
                  zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
                }}>
                  <div style={{
                    backgroundColor: '#0f172a', border: '1px solid #38bdf8', borderRadius: 24,
                    width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto', padding: 28,
                    boxShadow: '0 25px 70px rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', gap: 20
                  }}>
                    {/* MODAL HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(56, 189, 248, 0.25)', paddingBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                          EXECUTIVE MESSAGE INSPECTOR
                        </div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                          CHI TIẾT THÔNG ĐIỆP ĐIỀU HÀNH
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedSheetMsg(null)}
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', borderRadius: 10, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X style={{ width: 18, height: 18 }} />
                      </button>
                    </div>

                    {/* METADATA GRID */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      <div style={{ backgroundColor: '#0b0f19', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>THỜI GIAN</div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#ffffff', marginTop: 2 }}>{selectedSheetMsg.date} ({selectedSheetMsg.time})</div>
                      </div>

                      <div style={{ backgroundColor: '#0b0f19', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>ĐẦU MỐI CHỦ THỂ</div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#38bdf8', marginTop: 2 }}>{selectedSheetMsg.senderHub}</div>
                      </div>

                      <div style={{ backgroundColor: '#0b0f19', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>PHÂN LOẠI</div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 900, color: selectedSheetMsg.category === 'TRỰC TIẾP' ? '#38bdf8' : selectedSheetMsg.category === 'GIÁN TIẾP' ? '#c084fc' : '#f59e0b', marginTop: 2 }}>
                          {selectedSheetMsg.category}
                        </div>
                      </div>
                    </div>

                    {/* FULL CONTENT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase' }}>NỘI DUNG NGHỊ QUYẾT / THÔNG ĐIỆP CHÍNH THỨC:</div>
                      <div style={{ backgroundColor: '#0b0f19', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 14, padding: 18, color: '#ffffff', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {selectedSheetMsg.content}
                      </div>
                    </div>

                    {/* NOTES */}
                    {selectedSheetMsg.notes && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase' }}>GHI CHÚ CHUYỂN TIẾP & BÁN GIAO:</div>
                        <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 12, padding: 14, color: '#e2e8f0', fontSize: '0.82rem', lineHeight: 1.5 }}>
                          {selectedSheetMsg.notes}
                        </div>
                      </div>
                    )}

                    {/* FOOTER ACTIONS */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      {selectedSheetMsg.attachmentUrl ? (
                        <a
                          href={selectedSheetMsg.attachmentUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '9px 18px', borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8', border: '1px solid #38bdf8', fontSize: '0.78rem', fontWeight: 800,
                            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <ExternalLink style={{ width: 14, height: 14 }} /> Mở File Google Drive Đính Kèm
                        </a>
                      ) : <div />}

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedSheetMsg.content);
                          showToast('📋 Đã sao chép nội dung thông điệp điều hành');
                        }}
                        style={{ padding: '9px 18px', borderRadius: 10, backgroundColor: '#0284c7', color: '#ffffff', border: 'none', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        📋 Sao Chép Nội Dung
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3.3: HỆ THỐNG - SƠ ĐỒ CƠ CẤU TỔ CHỨC ĐỒNG BỘ 100% THEO HÌNH MẪU media_1786812688118 */}
          {activeTab === 'system' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* HEADER BANNER FOR SYSTEM TAB */}
              <div style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.25) 0%, rgba(15, 23, 42, 0.95) 75%), linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: 24, padding: '24px 32px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
                backdropFilter: 'blur(16px)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ padding: 8, borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      <Share2 style={{ width: 22, height: 22, color: '#38bdf8' }} />
                    </div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase' }}>
                      CẤU TRÚC HỆ THỐNG AVG ONE
                    </h1>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#cbd5e1', margin: 0, maxWidth: 760, lineHeight: 1.5, fontWeight: 500 }}>
                    Sơ đồ cây phân cấp thẩm quyền điều hành, ban giám đốc và luồng thông tin tác nghiệp liên thông 8 Đầu Mối.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => showToast('📊 Đã tải toàn bộ sơ đồ cấu trúc hệ thống AVG One')}
                    style={{
                      padding: '10px 18px', borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.78rem',
                      fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                    }}
                  >
                    <RefreshCw style={{ width: 15, height: 15 }} /> Làm Mới Sơ Đồ
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                      padding: '10px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                      color: '#ffffff', border: 'none', fontSize: '0.78rem', fontWeight: 900,
                      boxShadow: '0 4px 16px rgba(56, 189, 248, 0.35)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                    }}
                  >
                    <Package style={{ width: 15, height: 15 }} /> Quản Lý Đơn Hàng
                  </button>
                </div>
              </div>

              {/* ORGANIZATIONAL TREE DIAGRAM CANVAS CONTAINER (CẤU TRÚC 5 TẦNG AVG ONE) */}
              <div style={{
                position: 'relative', width: '100%', minHeight: 820, backgroundColor: '#070a11',
                borderRadius: 24, border: '1px solid rgba(56, 189, 248, 0.3)', padding: '36px 24px',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)', overflowX: 'auto',
                backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px)',
                backgroundSize: '28px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0
              }}>
                {/* TẦNG 1 (MÀU VÀNG GOLD ĐỒNG BỘ 100%) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#eab308', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#eab308', boxShadow: '0 0 8px #eab308' }} />
                    TẦNG 1
                  </div>
                  <div
                    onClick={() => showToast('Đã chọn: TẦNG 1 - CHỦ ĐẦU TƯ')}
                    style={{
                      padding: '14px 56px', borderRadius: 30,
                      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.28), rgba(15, 23, 42, 0.96))',
                      border: '1.5px solid #eab308', color: '#ffffff', fontSize: '1.05rem',
                      fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase',
                      boxShadow: '0 8px 30px rgba(234, 179, 8, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                      cursor: 'pointer', transition: 'all 0.25s ease', backdropFilter: 'blur(12px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                    }}
                  >
                    CHỦ ĐẦU TƯ
                  </div>

                  {/* HIGH-TECH STEM CONNECTOR TO TẦNG 2 (TĂNG KHOẢNG CÁCH) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '14px 0 6px 0' }}>
                    <div style={{ width: 2, height: 38, background: 'linear-gradient(to bottom, #eab308, #ff7043)', boxShadow: '0 0 10px rgba(255, 112, 67, 0.8)' }} />
                    <div style={{ fontSize: '0.65rem', color: '#ff7043', fontWeight: 900, marginTop: -6, textShadow: '0 0 6px #ff7043' }}>▼</div>
                  </div>
                </div>

                {/* TẦNG 2 (MÀU CAM FLAME ORANGE ĐỒNG BỘ 100%) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#ff7043', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ff7043', boxShadow: '0 0 8px #ff7043' }} />
                    TẦNG 2
                  </div>
                  <div
                    onClick={() => showToast('Đã chọn: TẦNG 2 - ĐIỀU HÀNH')}
                    style={{
                      width: 520, padding: '16px 36px', borderRadius: 22,
                      background: 'linear-gradient(135deg, rgba(255, 112, 67, 0.26), rgba(15, 23, 42, 0.96))',
                      border: '1.5px solid #ff7043',
                      boxShadow: '0 8px 30px rgba(255, 112, 67, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                      position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(12px)'
                    }}
                  >
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.08em', textAlign: 'center' }}>
                      ĐIỀU HÀNH
                    </h2>
                  </div>

                  {/* HIGH-TECH BRANCHING TREE CONNECTOR TO TẦNG 3 (TĂNG KHOẢNG CÁCH SPREADS TO 4 COLUMNS) */}
                  <div style={{ position: 'relative', width: '100%', maxWidth: 1100, height: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0 16px 0' }}>
                    <div style={{ width: 2, height: 26, background: 'linear-gradient(to bottom, #ff7043, #c084fc)', boxShadow: '0 0 10px rgba(192, 132, 252, 0.8)' }} />
                    <div style={{ width: '75%', height: 2, backgroundColor: '#c084fc', boxShadow: '0 0 12px #c084fc', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '0%', top: 0, width: 2, height: 26, backgroundColor: '#c084fc' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#c084fc', fontWeight: 900, textShadow: '0 0 6px #c084fc' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '33.33%', top: 0, width: 2, height: 26, backgroundColor: '#c084fc' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#c084fc', fontWeight: 900, textShadow: '0 0 6px #c084fc' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '66.66%', top: 0, width: 2, height: 26, backgroundColor: '#c084fc' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#c084fc', fontWeight: 900, textShadow: '0 0 6px #c084fc' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '100%', top: 0, width: 2, height: 26, backgroundColor: '#c084fc' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#c084fc', fontWeight: 900, textShadow: '0 0 6px #c084fc' }}>▼</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TẦNG 3 (MÀU TÍM ĐỒNG BỘ 100%) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#c084fc', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#c084fc', boxShadow: '0 0 8px #c084fc' }} />
                    <span>TẦNG 3</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%', position: 'relative' }}>
                    {/* KIẾN */}
                    <div
                      onClick={() => { setSelectedHub('KIEN'); setActiveTab('orders'); showToast('Đã chọn Cụm KIẾN'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(192, 132, 252, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(192, 132, 252, 0.6)', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#ffffff', textAlign: 'center' }}>KIẾN</div>
                    </div>

                    {/* # */}
                    <div
                      onClick={() => { setSelectedHub('HASH'); setActiveTab('orders'); showToast('Đã chọn Cụm #'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(192, 132, 252, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(192, 132, 252, 0.6)', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#ffffff', textAlign: 'center' }}>#</div>
                    </div>

                    {/* #K2 */}
                    <div
                      onClick={() => { setSelectedHub('HUB_K2'); setActiveTab('orders'); showToast('Đã chọn Cụm #K2'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(192, 132, 252, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(192, 132, 252, 0.6)', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#ffffff', textAlign: 'center' }}>#K2</div>
                    </div>

                    {/* #K1 */}
                    <div
                      onClick={() => { setSelectedHub('HUB_K1'); setActiveTab('orders'); showToast('Đã chọn Cụm #K1'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(192, 132, 252, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(192, 132, 252, 0.6)', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#ffffff', textAlign: 'center' }}>#K1</div>
                    </div>
                  </div>

                  {/* BRANCHING TREE CONNECTOR TO TẦNG 4 (TĂNG KHOẢNG CÁCH SPREADS TO 3 COLUMNS) */}
                  <div style={{ position: 'relative', width: '100%', maxWidth: 1100, height: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0 16px 0' }}>
                    <div style={{ width: 2, height: 26, background: 'linear-gradient(to bottom, #c084fc, #f43f5e)', boxShadow: '0 0 10px rgba(244, 63, 94, 0.8)' }} />
                    <div style={{ width: '66.67%', height: 2, backgroundColor: '#f43f5e', boxShadow: '0 0 12px #f43f5e', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '0%', top: 0, width: 2, height: 26, backgroundColor: '#f43f5e' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#f43f5e', fontWeight: 900, textShadow: '0 0 6px #f43f5e' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: 26, backgroundColor: '#f43f5e' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#f43f5e', fontWeight: 900, textShadow: '0 0 6px #f43f5e' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '100%', top: 0, width: 2, height: 26, backgroundColor: '#f43f5e' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#f43f5e', fontWeight: 900, textShadow: '0 0 6px #f43f5e' }}>▼</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TẦNG 4: 0 - BẢO, 8 - THÔNG, 9 - HỒ SƠ NĂNG LỰC (MÀU ĐỎ CRIMSON ĐỒNG BỘ 100%) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#f43f5e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f43f5e', boxShadow: '0 0 8px #f43f5e' }} />
                    <span>TẦNG 4</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, width: '100%' }}>
                    {/* 0 - BẢO */}
                    <div
                      onClick={() => { setSelectedHub('HUB_0'); setActiveTab('orders'); showToast('Đã chọn: 0 - BẢO'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(244, 63, 94, 0.6)', cursor: 'pointer', boxShadow: '0 8px 25px rgba(244, 63, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.96rem', fontWeight: 900, color: '#f43f5e', textAlign: 'center' }}>0 - BẢO</div>
                    </div>

                    {/* 8 - THÔNG */}
                    <div
                      onClick={() => { setSelectedHub('HUB_8'); setActiveTab('orders'); showToast('Đã chọn: 8 - THÔNG'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(244, 63, 94, 0.6)', cursor: 'pointer', boxShadow: '0 8px 25px rgba(244, 63, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.96rem', fontWeight: 900, color: '#f43f5e', textAlign: 'center' }}>8 - THÔNG</div>
                    </div>

                    {/* 9 - HỒ SƠ NĂNG LỰC */}
                    <div
                      onClick={() => { setSelectedHub('HUB_9'); setActiveTab('orders'); showToast('Đã chọn: 9 - HỒ SƠ NĂNG LỰC'); }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(244, 63, 94, 0.6)', cursor: 'pointer', boxShadow: '0 8px 25px rgba(244, 63, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.96rem', fontWeight: 900, color: '#f43f5e', textAlign: 'center' }}>9 - HỒ SƠ NĂNG LỰC</div>
                    </div>
                  </div>

                  {/* BRANCHING TREE CONNECTOR TO TẦNG 5 (TĂNG KHOẢNG CÁCH SPREADS TO 4 COLUMNS) */}
                  <div style={{ position: 'relative', width: '100%', maxWidth: 1100, height: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0 16px 0' }}>
                    <div style={{ width: 2, height: 26, background: 'linear-gradient(to bottom, #f43f5e, #38bdf8)', boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)' }} />
                    <div style={{ width: '75%', height: 2, backgroundColor: '#38bdf8', boxShadow: '0 0 12px #38bdf8', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '0%', top: 0, width: 2, height: 26, backgroundColor: '#38bdf8' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#38bdf8', fontWeight: 900, textShadow: '0 0 6px #38bdf8' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '33.33%', top: 0, width: 2, height: 26, backgroundColor: '#38bdf8' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#38bdf8', fontWeight: 900, textShadow: '0 0 6px #38bdf8' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '66.66%', top: 0, width: 2, height: 26, backgroundColor: '#38bdf8' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#38bdf8', fontWeight: 900, textShadow: '0 0 6px #38bdf8' }}>▼</div>
                      </div>
                      <div style={{ position: 'absolute', left: '100%', top: 0, width: 2, height: 26, backgroundColor: '#38bdf8' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: -3.5, fontSize: '0.65rem', color: '#38bdf8', fontWeight: 900, textShadow: '0 0 6px #38bdf8' }}>▼</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TẦNG 5: CÁC ĐẦU MỐI VẬN HÀNH LIÊN THÔNG (MÀU XANH DƯƠNG CYAN ĐỒNG BỘ 100%) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }} />
                    TẦNG 5
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, width: '100%' }}>
                    {/* 2.2 - HẠ TẦNG */}
                    <div
                      onClick={() => { setSelectedHub('HUB_2.2'); setActiveTab('orders'); showToast('Đã chọn: 2.2 - HẠ TẦNG'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>2.2 - HẠ TẦNG</div>
                    </div>

                    {/* 5.1B - ĐẦU VÀO */}
                    <div
                      onClick={() => { setSelectedHub('5.1B'); setActiveTab('orders'); showToast('Đã chọn: 5.1B - ĐẦU VÀO'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>5.1B - ĐẦU VÀO</div>
                    </div>

                    {/* 5.1T - ĐẦU RA */}
                    <div
                      onClick={() => { setSelectedHub('5.1T'); setActiveTab('orders'); showToast('Đã chọn: 5.1T - ĐẦU RA'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>5.1T - ĐẦU RA</div>
                    </div>

                    {/* 1 - TÀI CHÍNH */}
                    <div
                      onClick={() => { setSelectedHub('HUB_1'); setActiveTab('orders'); showToast('Đã chọn: 1 - TÀI CHÍNH'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>1 - TÀI CHÍNH</div>
                    </div>

                    {/* 2.1 - NHÂN SỰ */}
                    <div
                      onClick={() => { setSelectedHub('HUB_2.1'); setActiveTab('orders'); showToast('Đã chọn: 2.1 - NHÂN SỰ'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>2.1 - NHÂN SỰ</div>
                    </div>

                    {/* 3.1 - NGHIÊN CỨU & PHÁT TRIỂN */}
                    <div
                      onClick={() => { setSelectedHub('NHASAN_3.1'); setActiveTab('orders'); showToast('Đã chọn: 3.1 - NGHIÊN CỨU & PHÁT TRIỂN'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>3.1 - NGHIÊN CỨU & PHÁT TRIỂN</div>
                    </div>

                    {/* 3.2 - THIẾT KẾ */}
                    <div
                      onClick={() => { setSelectedHub('NHASAN_3.2'); setActiveTab('orders'); showToast('Đã chọn: 3.2 - THIẾT KẾ'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>3.2 - THIẾT KẾ</div>
                    </div>

                    {/* 6 - PHÁP LÝ */}
                    <div
                      onClick={() => { setSelectedHub('NHASAN_6'); setActiveTab('orders'); showToast('Đã chọn: 6 - PHÁP LÝ'); }}
                      style={{ padding: '16px 18px', borderRadius: 14, background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.96))', border: '1px solid rgba(56, 189, 248, 0.55)', cursor: 'pointer', boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8', textAlign: 'center' }}>6 - PHÁP LÝ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: QUẢN LÝ NHÂN SỰ (MÀU ĐỒNG BỘ 100% VỚI TAB LỊCH) */}
          {activeTab === 'hr' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
              
              {/* 1. TOP HEADER BANNER CARD (ĐỒNG BỘ THEME LỊCH) */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.7), rgba(14, 165, 233, 0.35), rgba(11, 15, 25, 0.95))',
                borderRadius: 24,
                padding: '32px 36px',
                border: '1px solid #38bdf8',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24
              }}>
                {/* LEFT CONTENT */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* BADGES ROW */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{
                      backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, padding: '4px 14px', borderRadius: 20,
                      display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.04em'
                    }}>
                      ✨ HUMAN RESOURCES
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, padding: '4px 14px', borderRadius: 20,
                      display: 'flex', alignItems: 'center', gap: 6
                    }}>
                      ⚡ {hrStaffList.length} nhân sự
                    </span>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                      HR MANAGEMENT SYSTEM
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.02em', lineHeight: 1.15 }}>
                      QUẢN LÝ NHÂN SỰ
                    </h1>
                  </div>

                  {/* DESCRIPTION SUB-BOX (GIỐNG HỆT BOX NỘI DUNG MÔ TẢ CỦA LỊCH) */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 14px', borderRadius: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(56, 189, 248, 0.3)',
                    backdropFilter: 'blur(6px)', width: 'fit-content'
                  }}>
                    <span style={{ fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 600, lineHeight: 1.4 }}>
                      Quản lý hồ sơ, thông tin nhân viên và phân quyền hệ thống. Tích hợp gửi email mời và tạo tài khoản tự động.
                    </span>
                  </div>

                  {/* SUMMARY STATS BOXES */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6, flexWrap: 'wrap' }}>
                    <div style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)',
                      backdropFilter: 'blur(10px)', borderRadius: 16, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12
                    }}>
                      <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                        <Users style={{ width: 18, height: 18, color: '#38bdf8' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{hrStaffList.length}</div>
                        <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>TỔNG NHÂN SỰ</div>
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.35)',
                      backdropFilter: 'blur(10px)', borderRadius: 16, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12
                    }}>
                      <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                        <CheckCircle2 style={{ width: 18, height: 18, color: '#38bdf8' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{hrStaffList.filter(s => s.status === 'CHÍNH THỨC').length}</div>
                        <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>CHÍNH THỨC</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT GRAPHIC DECORATION CARD */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: 140, height: 140, borderRadius: 28,
                    background: 'linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(2,132,199,0.3) 100%)',
                    border: '1px solid #38bdf8', backdropFilter: 'blur(12px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
                  }}>
                    <Briefcase style={{ width: 54, height: 54, color: '#38bdf8' }} />
                    <div style={{ position: 'absolute', top: -10, right: -10, backgroundColor: '#0284c7', color: '#fff', padding: 8, borderRadius: 12, border: '2px solid #0f172a' }}>
                      <Zap style={{ width: 16, height: 16 }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: -10, left: -10, backgroundColor: '#0284c7', color: '#fff', padding: 8, borderRadius: 12, border: '2px solid #0f172a' }}>
                      <Users style={{ width: 16, height: 16 }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SEARCH & ACTION TOOLBAR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                {/* SEARCH INPUT */}
                <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
                  <Search style={{ width: 18, height: 18, color: '#64748b', position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm nhân sự theo tên, email..."
                    value={hrSearchQuery}
                    onChange={(e) => setHrSearchQuery(e.target.value)}
                    style={{
                      width: '100%', backgroundColor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: 14, padding: '12px 16px 12px 46px', fontSize: '0.86rem', color: '#ffffff', outline: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.2s ease'
                    }}
                  />
                  {hrSearchQuery && (
                    <button
                      onClick={() => setHrSearchQuery('')}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    >
                      <X style={{ width: 16, height: 16 }} />
                    </button>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setIsInviteHrModalOpen(true)}
                    style={{
                      padding: '11px 20px', borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.84rem', fontWeight: 800,
                      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.2s ease'
                    }}
                  >
                    <Mail style={{ width: 16, height: 16, color: '#38bdf8' }} /> Gửi mời
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddHrModalOpen(true)}
                    style={{
                      padding: '11px 22px', borderRadius: 12, background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                      color: '#ffffff', border: 'none', fontSize: '0.84rem', fontWeight: 800,
                      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(56, 189, 248, 0.35)', transition: 'all 0.2s ease'
                    }}
                  >
                    <Plus style={{ width: 17, height: 17 }} /> Thêm Nhân Sự
                  </button>
                </div>
              </div>

              {/* 3. DEPARTMENT GROUPS & CARDS GRID */}
              {(() => {
                const filteredStaff = hrStaffList.filter(s =>
                  s.name.toLowerCase().includes(hrSearchQuery.toLowerCase()) ||
                  s.email.toLowerCase().includes(hrSearchQuery.toLowerCase()) ||
                  s.phone.includes(hrSearchQuery) ||
                  s.department.toLowerCase().includes(hrSearchQuery.toLowerCase())
                );

                // Group by department
                const deptMap = new Map<string, HrStaff[]>();
                filteredStaff.forEach(s => {
                  const list = deptMap.get(s.department) || [];
                  list.push(s);
                  deptMap.set(s.department, list);
                });

                if (filteredStaff.length === 0) {
                  return (
                    <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#0f172a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <Users style={{ width: 40, height: 40, color: '#64748b', marginBottom: 12 }} />
                      <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>Không tìm thấy nhân sự phù hợp</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: 4 }}>Thử gõ từ khóa tìm kiếm khác hoặc thêm nhân sự mới</div>
                    </div>
                  );
                }

                return Array.from(deptMap.entries()).map(([deptName, staffMembers]) => (
                  <div key={deptName} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* DEPARTMENT HEADER BAR */}
                    <div style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12
                    }}>
                      <div style={{ width: 8, height: 18, backgroundColor: '#38bdf8', borderRadius: 4 }} />
                      <h2 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.04em' }}>
                        {deptName}
                      </h2>
                      <span style={{
                        backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8',
                        fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: 20
                      }}>
                        {staffMembers.length} MEMBERS
                      </span>
                    </div>

                    {/* STAFF CARDS GRID */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 20 }}>
                      {staffMembers.map(staff => (
                        <div
                          key={staff.id}
                          style={{
                            backgroundColor: '#0d1322', border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden'
                          }}
                        >
                          {/* CARD TOP MAIN INFO */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
                            {/* AVATAR + NAME + CONTACT */}
                            <div style={{ display: 'flex', gap: 14, flex: 1, minWidth: 0 }}>
                              {/* INITIALS AVATAR CIRCLE */}
                              <div style={{
                                width: 58, height: 58, borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#ffffff', fontSize: '1.25rem', fontWeight: 900, flexShrink: 0,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.2)'
                              }}>
                                {staff.initials}
                              </div>

                              {/* NAME & CONTACT DETAILS */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {staff.name}
                                </div>

                                {/* HUBS / ROLES BADGES */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                  <span style={{
                                    backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)',
                                    color: '#38bdf8', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: 8
                                  }}>
                                    {staff.hubs.join('; ')}
                                  </span>
                                </div>

                                {/* CONTACT EMAIL & PHONE */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4, fontSize: '0.75rem', color: '#94a3b8' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Mail style={{ width: 13, height: 13, color: '#38bdf8' }} />
                                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{staff.email}</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Phone style={{ width: 13, height: 13, color: '#38bdf8' }} />
                                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{staff.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* RIGHT VIETQR CARD */}
                            <div style={{
                              backgroundColor: '#ffffff', borderRadius: 14, padding: 8, width: 84,
                              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0,
                              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                            }}>
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=STK:${staff.bankAccount}-NH:${staff.bankName}`}
                                alt="VietQR Code"
                                style={{ width: 68, height: 68, objectFit: 'contain' }}
                              />
                              <button
                                type="button"
                                onClick={() => setSelectedQrStaff(staff)}
                                style={{
                                  backgroundColor: 'transparent', border: 'none', color: '#0284c7',
                                  fontSize: '0.62rem', fontWeight: 900, cursor: 'pointer', padding: 0, textTransform: 'uppercase'
                                }}
                              >
                                PHÓNG TO
                              </button>
                            </div>
                          </div>

                          {/* CARD BOTTOM 3 INFO BOXES */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
                            {/* BOX 1: BIRTHDAY */}
                            <div style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)',
                              borderRadius: 12, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2
                            }}>
                              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 4 }}>
                                🎂 NGÀY SINH
                              </div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#ffffff' }}>
                                {staff.dob}
                              </div>
                            </div>

                            {/* BOX 2: WORK DURATION */}
                            <div style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)',
                              borderRadius: 12, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2
                            }}>
                              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 4 }}>
                                🧰 THỜI GIAN LÀM VIỆC
                              </div>
                              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {staff.workDuration}
                              </div>
                            </div>

                            {/* BOX 3: BANK ACCOUNT */}
                            <div style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)',
                              borderRadius: 12, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2
                            }}>
                              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 4 }}>
                                💳 TÀI KHOẢN
                              </div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#ffffff' }}>
                                {staff.bankName}
                              </div>
                              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>
                                {staff.bankAccount}
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}

              {/* FLOATING ACTION BUTTON: TRỢ LÝ PHÁP LUẬT */}
              <button
                type="button"
                onClick={() => showToast('⚖️ Đã kết nối với Trợ Lý Pháp Luật & Quy Định HR')}
                style={{
                  position: 'fixed', bottom: 28, right: 28, zIndex: 90,
                  background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                  color: '#ffffff', padding: '12px 22px', borderRadius: 30,
                  display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(2, 132, 199, 0.5), 0 0 0 1px rgba(255,255,255,0.2)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s ease'
                }}
              >
                <Scale style={{ width: 18, height: 18 }} /> Trợ lý Pháp luật
              </button>

            </div>
          )}

          {/* TAB 4: TRANG CHỦ / BẢNG TIN KHÁC */}
          {activeTab === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 840, margin: '0 auto', width: '100%' }}>

              {/* HỘP 1: LỜI CHÀO NĂNG LƯỢNG & HIỆU QUẢ (ĐỒNG BỘ MÀU HOÀN HẢO VỚI HỘP 2 LỊCH TRAO ĐỔI) */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 22,
                padding: '20px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.4rem' }}>👋</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>AVG ONE SYSTEM</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                    {(() => {
                      const now = getVietnamNow();
                      const daysMap = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
                      return `${daysMap[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
                    })()}
                  </div>
                </div>

                <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', marginBottom: 6, letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                  AVG One xin chào,
                </h2>
                <p style={{ color: '#e2e8f0', fontSize: '0.98rem', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                  Chúc bạn có một ngày làm việc thật năng lượng và hiệu quả! 🚀✨
                </p>
              </div>

              {/* HỘP 2: BẠN CÓ LỊCH TRAO ĐỔI HÔM NAY ĐÓ + HỘP NỘI DUNG TRAO ĐỔI (MẶC ĐỊNH HIỆN 1 LỊCH + NÚT MŨI TÊN ẨN/HIỆN) */}
              {(() => {
                const now = getVietnamNow();
                const curDayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
                const todayEvents = discussionEvents.filter(item => item.date && item.date.trim() === curDayStr);
                const targetList = todayEvents.length > 0 ? todayEvents : discussionEvents;
                const isTodayList = todayEvents.length > 0;
                
                // Mặc định hiện 1 lịch, khi bấm nút mũi tên mới hiện các lịch còn lại
                const displayEvents = isTodayListExpanded ? targetList : targetList.slice(0, 1);
                const remainingCount = targetList.length - 1;

                return (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 22,
                    padding: '20px',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
                  }}>
                    {/* THÔNG BÁO TẮT NHẮC LỊCH */}
                    <div style={{
                      backgroundColor: isTodayList ? 'rgba(234, 88, 12, 0.18)' : 'rgba(56, 189, 248, 0.12)',
                      border: isTodayList ? '1px solid rgba(249, 115, 22, 0.45)' : '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: 16,
                      padding: '14px 16px',
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
                    }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: isTodayList ? 'rgba(249, 115, 22, 0.3)' : 'rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CalendarIcon style={{ width: 20, height: 20, color: isTodayList ? '#f97316' : '#38bdf8' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 900, color: isTodayList ? '#ffedd5' : '#e0f2fe', lineHeight: 1.4 }}>
                          {isTodayList
                            ? 'Bạn có lịch trao đổi hôm nay đó, nhớ sắp xếp tham gia đúng giờ nha! ⏰'
                            : 'Hôm nay bạn không có lịch trao đổi nào, dưới đây là các cuộc trao đổi tiếp theo 📋'}
                        </div>
                      </div>
                    </div>

                    {/* DANH SÁCH HỘP NỘI DUNG TRAO ĐỔI */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {displayEvents.map((item) => {
                        const st = getLiveDiscussionStatus(item, vnNow);
                        const isFinished = st === 'Đã diễn ra' || st === 'Đã xong' || st === 'Hoàn thành';

                        return (
                          <div key={item.id} className="discussion-card-inner" style={{
                            backgroundColor: '#161922', border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: 18, padding: 16, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                            display: 'flex', flexDirection: 'column', gap: 12
                          }}>
                            {/* HEADER TIME & STATUS BADGE */}
                            <div style={{
                              background: st === 'Đang diễn ra' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.65), rgba(52, 211, 153, 0.45))' : isFinished ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.65), rgba(239, 68, 68, 0.45))' : 'linear-gradient(135deg, rgba(234, 88, 12, 0.68), rgba(249, 115, 22, 0.45))',
                              border: st === 'Đang diễn ra' ? '1px solid rgba(52, 211, 153, 0.6)' : isFinished ? '1px solid rgba(239, 68, 68, 0.6)' : '1px solid rgba(251, 146, 60, 0.6)',
                              borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ffffff', fontWeight: 800, fontSize: '0.85rem' }}>
                                <Clock style={{ width: 14, height: 14 }} />
                                <span>DỰ KIẾN: {item.plannedStartTime || '08:30'} – {item.plannedEndTime || '10:30'}</span>
                                <span style={{ opacity: 0.6 }}>|</span>
                                <span>⌛ 90 phút</span>
                              </div>
                              <div style={{
                                padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 900,
                                backgroundColor: 'rgba(0,0,0,0.3)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)'
                              }}>
                                ● {st}
                              </div>
                            </div>

                            {/* TITLE */}
                            <div>
                              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 2 }}>NỘI DUNG/ CHỦ ĐỀ</div>
                              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35 }}>{item.title}</div>
                            </div>

                            {/* PARTICIPANTS */}
                            {item.attendees && (
                              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', borderRadius: 10, padding: 10, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 4 }}>THÀNH PHẦN PARTICIPANTS</div>
                                <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, lineHeight: 1.4 }}>{item.attendees}</div>
                              </div>
                            )}

                            {/* ACTION BUTTON */}
                            <button
                              onClick={() => setActiveTab('calendar-talk')}
                              style={{
                                width: '100%', padding: '10px 14px', borderRadius: 12, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', fontWeight: 800, fontSize: '0.82rem',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.15s ease'
                              }}
                            >
                              <CalendarIcon style={{ width: 15, height: 15 }} /> Xem Chi Tiết Trên Sơ Đồ Lịch
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* NÚT MŨI TÊN MỞ RỘNG / THU GỌN CÁC LỊCH CÒN LẠI TRONG NGÀY */}
                    {targetList.length > 1 && (
                      <button
                        onClick={() => setIsTodayListExpanded(!isTodayListExpanded)}
                        style={{
                          marginTop: 14,
                          width: '100%',
                          padding: '11px 16px',
                          borderRadius: 14,
                          background: isTodayListExpanded
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(2, 132, 199, 0.18))',
                          border: isTodayListExpanded
                            ? '1px solid rgba(255, 255, 255, 0.15)'
                            : '1px solid rgba(56, 189, 248, 0.45)',
                          color: '#38bdf8',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '0.9rem' }}>{isTodayListExpanded ? '▲' : '▼'}</span>
                        <span>
                          {isTodayListExpanded
                            ? 'Thu gọn bớt lịch'
                            : `Xem thêm ${remainingCount} lịch trao đổi còn lại trong ngày`}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* HỘP 3: CÁC THÔNG TIN MỚI CẬP NHẬT MỚI... */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 22,
                padding: '20px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
              }}>
                {/* SECTION HEADER */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bell style={{ width: 18, height: 18, color: '#f59e0b' }} />
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff' }}>Các Thông Tin Mới Cập Nhật</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: 14, border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                    Mới nhất
                  </span>
                </div>

                {/* LIST OF NEWS / UPDATES */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* UPDATE ITEM 1 */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: 14, padding: 14, transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: 10 }}>
                        HỆ THỐNG AVG ONE 2.0
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Hôm nay</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', marginBottom: 4, lineHeight: 1.35 }}>
                      🚀 Cập nhật giao diện Sơ đồ Lịch & Quản lý Đơn hàng liên thông trên Mobile
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      Tối ưu hóa hiển thị trục thời gian, các điểm tròn docking phát sáng và tính năng xem Thời gian thực tế cực kỳ mượt mà.
                    </div>
                  </div>

                  {/* UPDATE ITEM 2 */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(251, 146, 60, 0.25)',
                    borderRadius: 14, padding: 14, transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#fb923c', backgroundColor: 'rgba(251, 146, 60, 0.15)', padding: '2px 8px', borderRadius: 10 }}>
                        ĐIỀU HÀNH REALTIME
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Hôm qua</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', marginBottom: 4, lineHeight: 1.35 }}>
                      ⚡ Đồng bộ dữ liệu Thời gian thực tế giữa các Hub điều hành (Hub 0, Hub 8, Hub 9)
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      Tự động ghi chép nhật ký, tính toán thời lượng diễn ra thực tế và lưu trữ hình ảnh biên bản họp liên thông.
                    </div>
                  </div>

                  {/* UPDATE ITEM 3 */}
                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(52, 211, 153, 0.25)',
                    borderRadius: 14, padding: 14, transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '2px 8px', borderRadius: 10 }}>
                        THÔNG BÁO NỘI BỘ
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>19/08/2026</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', marginBottom: 4, lineHeight: 1.35 }}>
                      🎯 Khẩu hiệu hành động năm 2026: Tăng tốc phát triển - Tối ưu hiệu quả - Kết nối liên thông
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      Toàn thể CBNV AVG sẵn sàng cho các chiến dịch cao điểm quý III và quý IV năm 2026.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'news' && (
            <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#111827', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                📰 Bảng Tin Nội Bộ AVG
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Theo dõi các thông tin thông báo, sự kiện và tài liệu hướng dẫn mới nhất của AVG.</p>
            </div>
          )}

          {/* TAB 5: QUẢN LÝ NHÂN SỰ MOBILE & DESKTOP (HR MANAGEMENT & WORK TIME) */}
          {activeTab === 'hr-management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 840, margin: '0 auto', width: '100%', paddingBottom: 40 }}>

              {/* 0. HEADER SUB-NAV SWITCHER BAR (STICKY PINNED TOP 64 Z-INDEX 999) */}
              <div style={{
                display: 'flex', gap: 8, padding: 4, backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.15)',
                position: 'sticky', top: 64, zIndex: 999, backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
              }}>
                <button
                  onClick={() => setHrSubTab('staff-list')}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 12,
                    backgroundColor: hrSubTab === 'staff-list' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                    color: hrSubTab === 'staff-list' ? '#38bdf8' : '#94a3b8',
                    border: hrSubTab === 'staff-list' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                    fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s'
                  }}
                >
                  <UserCheck style={{ width: 16, height: 16 }} /> Quản Lý Nhân Sự
                </button>
                <button
                  onClick={() => setHrSubTab('work-time')}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 12,
                    backgroundColor: hrSubTab === 'work-time' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                    color: hrSubTab === 'work-time' ? '#38bdf8' : '#94a3b8',
                    border: hrSubTab === 'work-time' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                    fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s'
                  }}
                >
                  <Clock style={{ width: 16, height: 16 }} /> Thời Gian Làm Việc
                </button>
              </div>

              {/* MỤC 1: QUẢN LÝ NHÂN SỰ (DANH SÁCH CÁN BỘ & MA VIETQR) */}
              {hrSubTab === 'staff-list' && (
                <>
                  {/* 1. EXECUTIVE HR BANNER CARD */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 22,
                    padding: '20px',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Users style={{ width: 18, height: 18, color: '#38bdf8' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>QUẢN LÝ NHÂN SỰ</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '4px 10px', borderRadius: 16, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                        {hrStaffList.length} Nhân Sự
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', marginBottom: 6, letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                      THÔNG TIN NHÂN SỰ
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.4, margin: '0 0 16px 0' }}>
                      Tổng hợp và theo dõi thông tin chi tiết về từng nhân sự trong hệ thống AVG One.
                    </p>

                    {/* 4 STAT METRICS GRID 2x2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Users style={{ width: 16, height: 16, color: '#38bdf8' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{hrStaffList.length}</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>TỔNG NHÂN SỰ</div>
                        </div>
                      </div>

                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(251, 146, 60, 0.25)', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(251, 146, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UserCheck style={{ width: 16, height: 16, color: '#fb923c' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>8</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#fb923c', textTransform: 'uppercase', marginTop: 2 }}>CHỦ TRÌ ĐẦU MỐI</div>
                        </div>
                      </div>

                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(52, 211, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle2 style={{ width: 16, height: 16, color: '#34d399' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                            {hrStaffList.filter(s => s.status === 'Đang làm việc').length}
                          </div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginTop: 2 }}>ĐANG LÀM VIỆC</div>
                        </div>
                      </div>

                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CreditCard style={{ width: 16, height: 16, color: '#c084fc' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{hrStaffList.filter(s => s.bankAccount).length}</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginTop: 2 }}>ĐÃ CÓ VIETQR</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. QUICK ACTION BAR */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setIsAddHrModalOpen(true)}
                      style={{
                        flex: 1, minWidth: 160, padding: '12px 16px', borderRadius: 14,
                        background: 'linear-gradient(135deg, #ff5722, #ea580c)', color: '#ffffff',
                        border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: '0 4px 14px rgba(255, 87, 34, 0.4)'
                      }}
                    >
                      <Plus style={{ width: 18, height: 18 }} /> + Thêm Nhân Sự Mới
                    </button>

                    <button
                      onClick={() => showToast('📊 Đã xuất báo cáo danh sách nhân sự toàn hệ thống')}
                      style={{
                        padding: '12px 16px', borderRadius: 14,
                        backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.35)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                      }}
                    >
                      <FileText style={{ width: 16, height: 16 }} /> Xuất Báo Cáo
                    </button>
                  </div>

                  {/* 3. STAFF LIST CARDS STREAM */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 22,
                    padding: '20px',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff' }}>Thông Tin Nhân Sự</div>
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 700 }}>{hrStaffList.length} Cán bộ</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {hrStaffList.map((staff) => (
                        <div key={staff.id} style={{
                          backgroundColor: '#161922', border: '1px solid rgba(56, 189, 248, 0.2)',
                          borderRadius: 16, padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                          display: 'flex', flexDirection: 'column', gap: 10
                        }}>
                          {/* TOP ROW: AVATAR + NAME + STATUS */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{
                                width: 42, height: 42, borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(2, 132, 199, 0.4))',
                                border: '1.5px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1rem', fontWeight: 900, color: '#ffffff', flexShrink: 0
                              }}>
                                {staff.name ? staff.name.charAt(0).toUpperCase() : 'N'}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>
                                  {staff.name}
                                </div>
                                <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700, marginTop: 2 }}>
                                  {staff.role} • {staff.department}
                                </div>
                              </div>
                            </div>

                            <span style={{
                              fontSize: '0.68rem', fontWeight: 900, padding: '3px 8px', borderRadius: 10,
                              backgroundColor: staff.status === 'Đang làm việc' ? 'rgba(52, 211, 153, 0.18)' : 'rgba(245, 158, 11, 0.18)',
                              color: staff.status === 'Đang làm việc' ? '#34d399' : '#f59e0b',
                              border: staff.status === 'Đang làm việc' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)'
                            }}>
                              ● {staff.status || 'Hoạt động'}
                            </span>
                          </div>

                          {/* INFO DETAILS ROW */}
                          <div style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 12, padding: '10px 12px',
                            display: 'flex', flexDirection: 'column', gap: 6, border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}>
                            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Mail style={{ width: 13, height: 13, color: '#38bdf8' }} />
                              <a href={`mailto:${staff.email}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{staff.email}</a>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Phone style={{ width: 13, height: 13, color: '#34d399' }} />
                              <a href={`tel:${staff.phone}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{staff.phone}</a>
                            </div>
                            {staff.bankAccount && (
                              <div style={{ fontSize: '0.78rem', color: '#fb923c', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <CreditCard style={{ width: 13, height: 13, color: '#fb923c' }} />
                                <span>{staff.bankName}: </span>
                                <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{staff.bankAccount}</span>
                              </div>
                            )}
                          </div>

                          {/* ACTION BUTTONS ROW */}
                          {staff.bankAccount && (
                            <button
                              onClick={() => setSelectedQrStaff(staff)}
                              style={{
                                width: '100%', padding: '9px 12px', borderRadius: 10,
                                backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)',
                                color: '#38bdf8', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s ease'
                              }}
                            >
                              <CreditCard style={{ width: 14, height: 14 }} /> Xem Mã VietQR Chuyển Khoản Nhanh
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* MỤC 2: THỜI GIAN LÀM VIỆC (HÀNH CHÍNH & NGOÀI GIỜ) */}
              {hrSubTab === 'work-time' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* BANNER THỜI GIAN LÀM VIỆC */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 22,
                    padding: '20px',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Clock style={{ width: 18, height: 18, color: '#38bdf8' }} />
                        </div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                          THỜI GIAN LÀM VIỆC
                        </span>
                      </div>
                    </div>

                    <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', marginBottom: 6, letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                      QUẢN LÝ THỜI GIAN LÀM VIỆC
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.4, margin: '0 0 16px 0' }}>
                      Theo dõi ca làm việc Hành chính và đăng ký ca Ngoài giờ (OT) của các Đầu mối liên thông.
                    </p>

                    {/* SUB-TOGGLE: HÀNH CHÍNH VS NGOÀI GIỜ */}
                    <div style={{ display: 'flex', gap: 8, backgroundColor: '#0d1017', padding: '6px 8px', borderRadius: 14, border: '1px solid rgba(56, 189, 248, 0.3)', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setWorkTimeType('admin')}
                        style={{
                          flex: 1, minWidth: 140, padding: '9px 14px', borderRadius: 10,
                          backgroundColor: workTimeType === 'admin' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                          color: workTimeType === 'admin' ? '#38bdf8' : '#94a3b8',
                          border: workTimeType === 'admin' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                          fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                        }}
                      >
                        <Building2 style={{ width: 15, height: 15 }} /> Hành Chính (08:00 - 17:30)
                      </button>
                      <button
                        onClick={() => setWorkTimeType('ot')}
                        style={{
                          flex: 1, minWidth: 140, padding: '9px 14px', borderRadius: 10,
                          backgroundColor: workTimeType === 'ot' ? 'rgba(251, 146, 60, 0.25)' : 'transparent',
                          color: workTimeType === 'ot' ? '#fb923c' : '#94a3b8',
                          border: workTimeType === 'ot' ? '1px solid rgba(251, 146, 60, 0.5)' : '1px solid transparent',
                          fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                        }}
                      >
                        <Moon style={{ width: 15, height: 15 }} /> Ngoài Giờ (Tăng Ca / OT)
                      </button>
                    </div>
                  </div>

                  {/* LOẠI 1: HÀNH CHÍNH */}
                  {workTimeType === 'admin' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {/* METRICS GRID HÀNH CHÍNH */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 14, padding: '10px 12px' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>08:00 - 17:30</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginTop: 2 }}>KHUNG GIỜ CHUẨN</div>
                        </div>
                        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: 14, padding: '10px 12px' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>24 / 24</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginTop: 2 }}>ĐÃ ĐIỂM DÀNH HÀNH CHÍNH</div>
                        </div>
                      </div>

                      {/* QUICK ACTION */}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          onClick={() => showToast('⏱️ Đã mở cửa sổ điểm danh ca Hành chính')}
                          style={{
                            flex: 1, padding: '12px 16px', borderRadius: 14,
                            background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: '#ffffff',
                            border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                          }}
                        >
                          + Ghi Nhận Ca Hành Chính
                        </button>
                      </div>

                      {/* DANH SÁCH CA HÀNH CHÍNH */}
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                        border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 22, padding: '20px',
                        display: 'flex', flexDirection: 'column', gap: 12
                      }}>
                        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>Lịch Ca Làm Việc Hành Chính Các Đầu Mối</div>

                        {[
                          { title: 'Ca Hành Chính • Thư Ký 2.1 & Ban Điều Hành', time: '08:00 - 17:30 (T2 - T6)', staff: 'Thư ký 2.1; Ban Điều Hành AVG', note: 'Chấm công GPS & máy vân tay tự động' },
                          { title: 'Ca Hành Chính • Đầu Mối 5.1B & 5.1T (Tiếp Nhận & Triển Khai)', time: '08:00 - 17:30 (T2 - T7)', staff: 'Bà Bích; Phụ trách 5.1T', note: 'Trực ca khảo sát & giao nhận đơn hàng' },
                          { title: 'Ca Hành Chính • Đầu Mối 1 (Phụ Trách Sản Xuất 1.T/1.C)', time: '08:00 - 17:30 (T2 - T6)', staff: 'Quản lý Sản xuất 1.T/1.C', note: 'Vận hành xưởng máy SMT & gia công cơ khí' },
                          { title: 'Ca Hành Chính • Đầu Mối 3.1 & 3.2 (R&D & Thiết Kế)', time: '08:00 - 17:30 (T2 - T6)', staff: 'Nhóm R&D 3.1; Thiết kế 3.2', note: 'Đo kiểm Spec kỹ thuật & phát hành bản vẽ' }
                        ].map((item, idx) => (
                          <div key={idx} style={{ backgroundColor: '#161922', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff' }}>{item.title}</span>
                              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '3px 8px', borderRadius: 8 }}>{item.time}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>👤 Nhân sự trực: <strong style={{ color: '#cbd5e1' }}>{item.staff}</strong></div>
                            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>📌 Ghi chú: {item.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LOẠI 2: NGOÀI GIỜ (OT) */}
                  {workTimeType === 'ot' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {/* METRICS GRID NGOÀI GIỜ */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(251, 146, 60, 0.25)', borderRadius: 14, padding: '10px 12px' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fb923c' }}>148 Giờ</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>TỔNG GIỜ OT THÁNG NÀY</div>
                        </div>
                        <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: 14, padding: '10px 12px' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#c084fc' }}>1.5x - 3.0x</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginTop: 2 }}>HỆ SỐ LƯƠNG TĂNG CA</div>
                        </div>
                      </div>

                      {/* QUICK ACTION */}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          onClick={() => showToast('🌙 Đã mở mẫu đăng ký ca làm việc Ngoài giờ (OT)')}
                          style={{
                            flex: 1, padding: '12px 16px', borderRadius: 14,
                            background: 'linear-gradient(135deg, #ea580c, #c2410c)', color: '#ffffff',
                            border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                          }}
                        >
                          + Đăng Ký Ca OT Ngoài Giờ
                        </button>
                      </div>

                      {/* DANH SÁCH CA NGOÀI GIỜ */}
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                        border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 22, padding: '20px',
                        display: 'flex', flexDirection: 'column', gap: 12
                      }}>
                        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>Nhật Ký & Ca Tăng Ca Ngoài Giờ (OT)</div>

                        {[
                          { title: '🌙 OT Đêm • Đầu Mối 0 (Bảo Mật & Hạ Tầng Server)', time: '18:00 - 22:00 (Tối nay)', staff: 'Chủ trì Đầu Mối 0', coef: 'Hệ số 1.5x', approver: 'Ban Giám Đốc' },
                          { title: '🛠️ OT Hàn Lắp Mạch Urgent • Đầu Mối 1 (Xưởng SMT 1.T)', time: '18:00 - 21:30 (19/08)', staff: 'Quản lý Sản xuất 1.T; KTV Hàn', coef: 'Hệ số 1.5x', approver: 'Trưởng ban Kiên' },
                          { title: '📑 OT Thư Ký 2.1 • Tổng Hợp VBKL & Báo Cáo Lạm Phát', time: '17:30 - 20:00 (Hàng tuần)', staff: 'Thư ký 2.1', coef: 'Hệ số 1.5x', approver: 'Thư ký 2.1' }
                        ].map((item, idx) => (
                          <div key={idx} style={{ backgroundColor: '#161922', border: '1px solid rgba(251, 146, 60, 0.25)', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff' }}>{item.title}</span>
                              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fb923c', backgroundColor: 'rgba(251, 146, 60, 0.15)', padding: '3px 8px', borderRadius: 8 }}>{item.time}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>👤 Đăng ký bởi: <strong style={{ color: '#cbd5e1' }}>{item.staff}</strong> • <span style={{ color: '#c084fc', fontWeight: 800 }}>{item.coef}</span></div>
                            <div style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 700 }}>✅ Cán bộ phê duyệt: {item.approver}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}
        </main>
      </div>



      {/* MODAL: PHÓNG TO VIETQR */}
      {selectedQrStaff && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 120, backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 420, padding: 24, border: '1px solid #38bdf8', borderRadius: 24, backgroundColor: '#0f172a', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>Mã QR Chuyển Khoản</div>
              <button onClick={() => setSelectedQrStaff(null)} style={{ padding: 6, borderRadius: 8, backgroundColor: '#1e293b', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: 20, padding: 16, display: 'inline-block', marginBottom: 16 }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=STK:${selectedQrStaff.bankAccount}-NH:${selectedQrStaff.bankName}`}
                alt="VietQR Large"
                style={{ width: 220, height: 220, objectFit: 'contain' }}
              />
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>{selectedQrStaff.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 800 }}>Ngân hàng {selectedQrStaff.bankName}</div>
            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', margin: '6px 0 16px 0' }}>{selectedQrStaff.bankAccount}</div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedQrStaff.bankAccount);
                showToast(`Đã sao chép số tài khoản ${selectedQrStaff.bankAccount}`);
              }}
              style={{
                width: '100%', padding: '12px 0', borderRadius: 12, backgroundColor: '#0284c7', color: '#fff',
                fontWeight: 800, fontSize: '0.88rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              <Copy style={{ width: 16, height: 16 }} /> Sao Chép Số Tài Khoản
            </button>
          </div>
        </div>
      )}

      {/* MODAL: THÊM NHÂN SỰ MỚI */}
      {isAddHrModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 120, backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 520, padding: 24, border: '1px solid #38bdf8', borderRadius: 24, backgroundColor: '#0f172a', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Users style={{ width: 22, height: 22, color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>Thêm Nhân Sự Mới</h3>
              </div>
              <button onClick={() => setIsAddHrModalOpen(false)} style={{ padding: 6, borderRadius: 8, backgroundColor: '#1e293b', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newHrName.trim()) return;
              const initials = newHrName.split(' ').map(p => p[0]).join('').slice(-2).toUpperCase() || 'NV';
              const colors = ['linear-gradient(135deg, #f59e0b, #d97706)', 'linear-gradient(135deg, #0284c7, #2563eb)', 'linear-gradient(135deg, #10b981, #059669)', 'linear-gradient(135deg, #ec4899, #f43f5e)'];
              const avatarBg = colors[Math.floor(Math.random() * colors.length)];
              const newStaff: HrStaff = {
                id: `hr-${Date.now()}`,
                name: newHrName,
                department: newHrDept,
                initials,
                avatarBg,
                hubs: newHrHubs.split(';').map(h => h.trim()).filter(Boolean),
                email: newHrEmail || 'nhansu@avg.vn',
                phone: newHrPhone || '0900000000',
                dob: newHrDob || '01/01/2000',
                workDuration: 'Mới nhận việc',
                bankName: newHrBankName,
                bankAccount: newHrBankAccount || '123456789',
                status: 'CHÍNH THỨC'
              };
              setHrStaffList(prev => [newStaff, ...prev]);
              setIsAddHrModalOpen(false);
              setNewHrName(''); setNewHrEmail(''); setNewHrPhone(''); setNewHrBankAccount('');
              showToast(`Đã thêm nhân sự thành công: ${newStaff.name}`);
            }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Họ và Tên Nhân Viên (*):</label>
                <input type="text" required placeholder="Nhập họ và tên đầy đủ..." value={newHrName} onChange={e => setNewHrName(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Phòng Ban / Đơn Vị:</label>
                  <select value={newHrDept} onChange={e => setNewHrDept(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }}>
                    <option value="INTERWRITE">INTERWRITE</option>
                    <option value="AVG GLOBAL">AVG GLOBAL</option>
                    <option value="RDI CENTER">RDI CENTER</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Đầu Mối / Vai Trò:</label>
                  <input type="text" placeholder="Ví dụ: 5.1T; KIẾN" value={newHrHubs} onChange={e => setNewHrHubs(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Email liên hệ:</label>
                  <input type="email" placeholder="example@gmail.com" value={newHrEmail} onChange={e => setNewHrEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Số điện thoại:</label>
                  <input type="text" placeholder="09xxxxxxxx" value={newHrPhone} onChange={e => setNewHrPhone(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Ngân hàng:</label>
                  <select value={newHrBankName} onChange={e => setNewHrBankName(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }}>
                    <option value="Vietinbank">Vietinbank</option>
                    <option value="VPBank">VPBank</option>
                    <option value="Techcombank">Techcombank</option>
                    <option value="MBBank">MBBank</option>
                    <option value="Vietcombank">Vietcombank</option>
                    <option value="BIDV">BIDV</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Số tài khoản:</label>
                  <input type="text" placeholder="Số tài khoản nhận lương..." value={newHrBankAccount} onChange={e => setNewHrBankAccount(e.target.value)} style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setIsAddHrModalOpen(false)} style={{ padding: '10px 18px', borderRadius: 10, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>Hủy Bỏ</button>
                <button type="submit" style={{ padding: '10px 22px', borderRadius: 10, backgroundColor: '#0284c7', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Lưu Nhân Sự Mới</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GỬI THƯ MỜI KHỚP TÀI KHOẢN */}
      {isInviteHrModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 120, backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 480, padding: 24, border: '1px solid #38bdf8', borderRadius: 24, backgroundColor: '#0f172a', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail style={{ width: 20, height: 20, color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>Gửi Thư Mời Gia Nhập</h3>
              </div>
              <button onClick={() => setIsInviteHrModalOpen(false)} style={{ padding: 6, borderRadius: 8, backgroundColor: '#1e293b', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 16 }}>
              Tự động khởi tạo mã kích hoạt tài khoản và gửi email hướng dẫn tạo tài khoản AVG One tới nhân sự mới.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Nhập Email Nhân Sự:</label>
                <input type="email" placeholder="nhansu.moi@gmail.com..." style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none' }} />
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsInviteHrModalOpen(false);
                  showToast('✉️ Đã gửi email thư mời kích hoạt tài khoản thành công!');
                }}
                style={{
                  marginTop: 10, padding: '12px 0', borderRadius: 12, backgroundColor: '#0284c7', color: '#fff',
                  fontWeight: 800, fontSize: '0.88rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                <Send style={{ width: 16, height: 16 }} /> Gửi Email Thư Mời Tuần Tự
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CẬP NHẬT VĂN BẢN KẾT LUẬN (VBKL) CUỘC TRAO ĐỔI */}
      {isVbklModalOpen && selectedVbklEvent && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 110, backgroundColor: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 540, padding: 24, border: '1px solid #38bdf8', borderRadius: 20, backgroundColor: '#0f172a', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Share2 style={{ width: 20, height: 20, color: '#38bdf8' }} />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Cập Nhật Văn Bản Kết Luận (VBKL)</h3>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>{selectedVbklEvent.title}</div>
                </div>
              </div>
              <button onClick={() => setIsVbklModalOpen(false)} style={{ padding: 6, borderRadius: 8, backgroundColor: '#1e293b', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* PHƯƠNG THỨC: LINK HOẶC FILE */}
              <div style={{ display: 'flex', backgroundColor: '#1e293b', padding: 4, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                  onClick={() => setVbklInputType('link')}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800,
                    backgroundColor: vbklInputType === 'link' ? '#0284c7' : 'transparent',
                    color: vbklInputType === 'link' ? '#ffffff' : '#94a3b8', border: 'none', cursor: 'pointer'
                  }}
                >
                  🔗 Dán Link URL (Google Docs/Drive/Web)
                </button>
                <button
                  onClick={() => setVbklInputType('file')}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800,
                    backgroundColor: vbklInputType === 'file' ? '#0284c7' : 'transparent',
                    color: vbklInputType === 'file' ? '#ffffff' : '#94a3b8', border: 'none', cursor: 'pointer'
                  }}
                >
                  📁 Tải Tệp Lên (PDF/Word/Excel)
                </button>
              </div>

              {vbklInputType === 'link' ? (
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Đường dẫn Văn Bản Kết Luận (URL):
                  </label>
                  <input
                    type="text"
                    placeholder="https://docs.google.com/document/d/... Hoặc link file lưu trữ"
                    value={vbklUrl}
                    onChange={(e) => setVbklUrl(e.target.value)}
                    style={{
                      width: '100%', backgroundColor: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 10, padding: '10px 14px', fontSize: '0.82rem', color: '#ffffff', outline: 'none'
                    }}
                  />
                  <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => setVbklUrl('https://docs.google.com/spreadsheets/d/11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M/edit?gid=1382803197#gid=1382803197')}
                      style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 6, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', cursor: 'pointer' }}
                    >
                      ⚡ Mẫu: Google Doc VBKL
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Chọn tệp Văn Bản Kết Luận từ máy tính:
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setVbklFileName(file.name);
                        setVbklUrl(URL.createObjectURL(file));
                      }
                    }}
                    style={{
                      width: '100%', backgroundColor: '#1e293b', border: '1px dashed #38bdf8',
                      borderRadius: 10, padding: '14px', fontSize: '0.8rem', color: '#cbd5e1', cursor: 'pointer'
                    }}
                  />
                  {vbklFileName && (
                    <div style={{ marginTop: 8, fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                      ✅ Đã chọn tệp: {vbklFileName}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  onClick={() => setIsVbklModalOpen(false)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 10, backgroundColor: '#1e293b', color: '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    if (!vbklUrl) {
                      alert('Vui lòng dán đường link hoặc tải tệp VBKL lên!');
                      return;
                    }
                    setDiscussionEvents(prev => prev.map(ev => ev.id === selectedVbklEvent.id ? { ...ev, conclusionDocUrl: vbklUrl } : ev));
                    setIsVbklModalOpen(false);
                    showToast('✅ Đã cập nhật Văn bản kết luận (VBKL) cuộc trao đổi thành công!');
                  }}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 10, background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: '#ffffff', border: 'none', fontWeight: 900, fontSize: '0.82rem', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)', cursor: 'pointer' }}
                >
                  💾 Lưu Văn Bản Kết Luận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KHỞI TẠO ĐƠN HÀNG MỚI CHO ĐẦU MỐI */}
      {isOrderModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 620, padding: 28, border: '1px solid #38bdf8', borderRadius: 20, maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Package style={{ width: 22, height: 22, color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>Khởi Tạo Đơn Hàng Mới Cho Đầu Mối</h3>
              </div>
              <button onClick={() => setIsOrderModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 22, height: 22 }} />
              </button>
            </div>

            <form onSubmit={handleCreateNewOrder} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>
                  Mã Đơn Hàng (Tự động hoặc tự nhập):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: DH-2026-901"
                  value={newOrderCode}
                  onChange={e => setNewOrderCode(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                  Tên Đơn Hàng *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đơn hàng Sản xuất & Thử nghiệm Module AI Cảm biến P1"
                  value={newOrderTitle}
                  onChange={e => setNewOrderTitle(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Đầu Mối Phụ Trách *
                  </label>
                  <select
                    value={newOrderDepartment}
                    onChange={e => setNewOrderDepartment(e.target.value as HubKey)}
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  >
                    {(Object.keys(HUB_MAP) as HubKey[]).filter(k => k !== 'ALL').map(key => (
                      <option key={key} value={key}>{HUB_MAP[key].icon} {HUB_MAP[key].name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Bước Tiến Độ Khởi Tạo *
                  </label>
                  <select
                    value={newOrderStep}
                    onChange={e => setNewOrderStep(parseInt(e.target.value, 10))}
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  >
                    {WORKFLOW_13_STEPS.map(step => (
                      <option key={step.stepNumber} value={step.stepNumber}>
                        {step.icon} Bước {step.stepNumber}: {step.name.replace(`Bước ${step.stepNumber}: `, '')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Phân Loại Đơn Hàng
                  </label>
                  <select
                    value={newOrderStatusType}
                    onChange={e => setNewOrderStatusType(e.target.value)}
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  >
                    <option value="TRỌNG ĐIỂM">🔥 TRỌNG ĐIỂM</option>
                    <option value="KHẨN CẤP">⚡ KHẨN CẤP</option>
                    <option value="THƯỜNG XUYÊN">🔹 THƯỜNG XUYÊN</option>
                    <option value="TỒN">📦 TỒN</option>
                    <option value="TIỂU DỰ ÁN">💎 TIỂU DỰ ÁN</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Link VBKL / Google Sheet
                  </label>
                  <input
                    type="text"
                    placeholder="https://docs.google.com/..."
                    value={newOrderAttachmentUrl}
                    onChange={e => setNewOrderAttachmentUrl(e.target.value)}
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                  Mô Tả Yêu Cầu / Nội Dung Chi Tiết
                </label>
                <textarea
                  rows={3}
                  placeholder="Ghi chú chi tiết mục tiêu, yêu cầu kỹ thuật..."
                  value={newOrderDesc}
                  onChange={e => setNewOrderDesc(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', borderRadius: 8, background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Tạo Đơn Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* MODAL: THÊM LỊCH TRAO ĐỔI MỚI */}
      {isAddTalkModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 580, padding: 26, border: '1px solid #38bdf8', borderRadius: 20, backgroundColor: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarIcon style={{ width: 20, height: 20, color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0, textTransform: 'uppercase' }}>THÊM LỊCH TRAO ĐỔI</h3>
              </div>
              <button onClick={() => setIsAddTalkModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <form onSubmit={handleCreateNewTalk} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>
                  Nội Dung / Chủ Đề Trao Đổi *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập nội dung chủ đề cuộc họp/trao đổi..."
                  value={newTalkTitle}
                  onChange={e => setNewTalkTitle(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>
                    Ngày Dự Kiến *
                  </label>
                  <VietnameseDatePicker
                    value={newTalkDate}
                    onChange={(val) => setNewTalkDate(val)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>
                    Giờ Bắt Đầu (Dự kiến) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 17:00"
                    value={newTalkPlannedStartTime}
                    onChange={e => setNewTalkPlannedStartTime(e.target.value)}
                    style={{
                      width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px',
                      fontSize: '0.84rem', outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>
                    Giờ Kết Thúc (Dự kiến) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 18:00"
                    value={newTalkPlannedEndTime}
                    onChange={e => setNewTalkPlannedEndTime(e.target.value)}
                    style={{
                      width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px',
                      fontSize: '0.84rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Phạm vi
                  </label>
                  <input
                    type="text"
                    value={newTalkScope}
                    onChange={e => setNewTalkScope(e.target.value)}
                    placeholder="P1 / Phòng bà Trang..."
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Thư ký
                  </label>
                  <input
                    type="text"
                    value={newTalkSecretary}
                    onChange={e => setNewTalkSecretary(e.target.value)}
                    placeholder="2.1 / 6 / 8..."
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                    Pháp nhân điều hành
                  </label>
                  <input
                    type="text"
                    value={newTalkLegalEntity}
                    onChange={e => setNewTalkLegalEntity(e.target.value)}
                    placeholder="DH / #K1..."
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                  Ghi chú bổ sung
                </label>
                <input
                  type="text"
                  value={newTalkNotes}
                  onChange={e => setNewTalkNotes(e.target.value)}
                  placeholder="B5.1; bà Bích; #K2T online..."
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.84rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setIsAddTalkModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: 8, background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  Tạo Lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CẤU HÌNH ĐỒNG BỘ 2-CHIỀU GOOGLE SHEET */}
      {isWebhookModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 110, backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', padding: 26, border: '1px solid #34d399', borderRadius: 24, backgroundColor: '#0f172a', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileSpreadsheet style={{ width: 22, height: 22, color: '#34d399' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', margin: 0, textTransform: 'uppercase' }}>
                  ĐỒNG BỘ 2-CHIỀU VỀ GOOGLE SHEET
                </h3>
              </div>
              <button onClick={() => setIsWebhookModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 14, padding: 14, fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: 6 }}>📌 Hướng dẫn 3 bước kết nối ghi trực tiếp vào Google Sheet:</div>
                <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <li>Mở file Google Sheet ➔ Chọn menu <b>Tiện ích mở rộng (Extensions)</b> ➔ <b>Apps Script</b>.</li>
                  <li>Dán đoạn mã bên dưới vào Google Apps Script ➔ Bấm <b>Lưu (Save)</b>.</li>
                  <li>Bấm <b>Triển khai (Deploy)</b> ➔ <b>Triển khai dưới dạng ứng dụng web (Web App)</b> ➔ Đặt <i>"Quyền truy cập"</i> là <b>Bất kỳ ai (Anyone)</b> ➔ Dán WebApp URL thu được vào ô bên dưới.</li>
                </ol>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399' }}>
                    📜 Mã Google Apps Script (doPost):
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(DEFAULT_GOOGLE_APPS_SCRIPT_CODE);
                      showToast('📋 Đã sao chép mã Google Apps Script vào bộ nhớ tạm!');
                    }}
                    style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.35)', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    📋 Sao Chép Mã Apps Script
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={8}
                  value={DEFAULT_GOOGLE_APPS_SCRIPT_CODE}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 10, padding: '10px 12px', fontSize: '0.75rem', fontFamily: 'monospace', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', marginBottom: 6 }}>
                  🔗 WebApp Webhook URL (Dán URL sau khi Deploy vào đây):
                </label>
                <input
                  type="text"
                  placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                  value={webhookUrlInput}
                  onChange={e => setWebhookUrlInput(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#ffffff', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setIsWebhookModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: 10, backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const cleanUrl = webhookUrlInput.trim();
                    if (!cleanUrl) {
                      showToast('⚠️ Vui lòng dán Webhook URL trước khi thử!');
                      return;
                    }
                    if (cleanUrl.includes('docs.google.com/spreadsheets')) {
                      alert('❌ BẠN ĐANG NHẬP NHẦM LINK GOOGLE SHEET!\n\nLink ô này phải là WebApp URL thu được từ Google Apps Script (bắt đầu bằng: https://script.google.com/macros/s/.../exec).\n\nVui lòng xem 3 bước hướng dẫn chi tiết bên trên.');
                      return;
                    }
                    if (!cleanUrl.includes('script.google.com/macros/s/')) {
                      alert('⚠️ Đường link không hợp lệ! Link Webhook phải có dạng:\nhttps://script.google.com/macros/s/.../exec');
                      return;
                    }
                    setGoogleSheetWebhookUrl(cleanUrl);
                    const testEvt: DiscussionEvent = {
                      id: `test-${Date.now()}`,
                      title: 'Kiểm Tra Đồng Bộ AVG One',
                      date: '18/08/2026',
                      dayOfWeek: 'THỨ BA',
                      plannedStartTime: '18:00',
                      plannedEndTime: '19:00',
                      scope: 'P1',
                      legalEntity: 'DH',
                      attendees: 'AV; AVG',
                      secretary: '2.1',
                      status: 'Sắp tới',
                      notes: 'Dòng thử nghiệm tự động từ AVG One'
                    };
                    await syncDiscussionEventToGoogleSheet(testEvt);
                    showToast('🚀 Đã gửi dòng thử nghiệm về Google Sheet! Vui lòng kiểm tra cuối tệp Google Sheet.');
                  }}
                  style={{
                    padding: '9px 16px', borderRadius: 10, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.82rem',
                    fontWeight: 800, cursor: 'pointer'
                  }}
                >
                  🧪 Thử Đồng Bộ Mẫu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cleanUrl = webhookUrlInput.trim();
                    if (cleanUrl && cleanUrl.includes('docs.google.com/spreadsheets')) {
                      alert('❌ BẠN ĐANG NHẬP NHẦM LINK GOOGLE SHEET!\n\nLink ô này phải là WebApp URL thu được từ Google Apps Script (bắt đầu bằng: https://script.google.com/macros/s/.../exec).\n\nVui lòng xem 3 bước hướng dẫn chi tiết bên trên.');
                      return;
                    }
                    setGoogleSheetWebhookUrl(cleanUrl);
                    setIsWebhookModalOpen(false);
                    showToast('🚀 Đã lưu cấu hình Google Sheet Webhook URL thành công!');
                  }}
                  style={{ padding: '9px 22px', borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #34d399)', color: '#ffffff', border: 'none', fontWeight: 900, fontSize: '0.82rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(52, 211, 153, 0.4)' }}
                >
                  Lưu Cấu Hình Webhook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: THÙNG RÁC TẠM LƯU TRỮ CÁC LỊCH ĐÃ XÓA */}
      {isTrashModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 110, backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{
            width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto', padding: 26,
            border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 24, backgroundColor: '#0f172a',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', gap: 20
          }}>
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Trash2 style={{ width: 24, height: 24, color: '#f87171' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: 0, textTransform: 'uppercase' }}>
                    THÙNG RÁC TẠM LƯU TRỮ ({trashEvents.length})
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: 2 }}>
                    Các cuộc trao đổi bị xóa sẽ tạm lưu tại đây. Bạn có thể khôi phục lại bất kỳ lúc nào.
                  </div>
                </div>
              </div>
              <button onClick={() => setIsTrashModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* ACTION BAR */}
            {trashEvents.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={handleEmptyTrash}
                  style={{
                    padding: '6px 14px', borderRadius: 8, backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)', color: '#f87171',
                    fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  <Trash2 style={{ width: 14, height: 14 }} /> Dọn Sạch Thùng Rác
                </button>
              </div>
            )}

            {/* LIST OF TRASH ITEMS */}
            {trashEvents.length === 0 ? (
              <div style={{
                padding: '40px 20px', textAlign: 'center', backgroundColor: 'rgba(16, 27, 42, 0.5)',
                border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: 16, display: 'flex',
                flexDirection: 'column', alignItems: 'center', gap: 10
              }}>
                <Trash2 style={{ width: 36, height: 36, color: '#64748b' }} />
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#94a3b8' }}>
                  Thùng rác hiện đang trống
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Chưa có cuộc trao đổi nào bị xóa.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {trashEvents.map(item => (
                  <div
                    key={item.id}
                    style={{
                      padding: 16, borderRadius: 14, backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(239, 68, 68, 0.25)', display: 'flex',
                      flexDirection: 'column', gap: 10
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                          🗓️ Ngày {item.date} ({item.plannedStartTime} – {item.plannedEndTime}) • Đã xóa: {item.deletedAt || 'Vừa xong'}
                        </div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>
                          {item.title}
                        </div>
                      </div>

                      {/* RESTORE AND PURGE BUTTONS */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => handleRestoreFromTrash(item.id, item.title)}
                          title="Khôi phục về Lịch Trao Đổi"
                          style={{
                            padding: '6px 14px', borderRadius: 8, backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            border: '1px solid rgba(16, 185, 129, 0.5)', color: '#34d399',
                            fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6
                          }}
                        >
                          <Undo style={{ width: 14, height: 14 }} /> Khôi Phục
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePurgeFromTrash(item.id, item.title)}
                          title="Xóa Vĩnh Viễn Không Thể Khôi Phục"
                          style={{
                            padding: '6px 12px', borderRadius: 8, backgroundColor: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.5)', color: '#f87171',
                            fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4
                          }}
                        >
                          <X style={{ width: 14, height: 14 }} /> Xóa Hẳn
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, fontSize: '0.74rem', color: '#94a3b8', flexWrap: 'wrap' }}>
                      <span>Thành phần: <b>{item.attendees || 'AV; AVG'}</b></span>
                      <span>•</span>
                      <span>Pháp nhân: <b>{item.legalEntity || 'DH'}</b></span>
                      <span>•</span>
                      <span>Phạm vi: <b>{item.scope || 'P1'}</b></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setIsTrashModalOpen(false)}
                style={{ padding: '9px 20px', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BÀN GIAO ĐƠN HÀNG GIỮA CÁC ĐẦU MỐI */}
      {isTransferModalOpen && transferTargetOrder && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ width: '100%', maxWidth: 540, padding: 26, border: '1px solid #38bdf8', borderRadius: 20, backgroundColor: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Share2 style={{ width: 20, height: 20, color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>Bàn Giao Đơn Hàng Sang Đầu Mối Khác</h3>
              </div>
              <button onClick={() => setIsTransferModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <form onSubmit={handleConfirmTransfer} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 12, backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: 10, border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>ĐƠN HÀNG ĐƯỢC BÀN GIAO:</div>
                <div style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 800, marginTop: 2 }}>
                  {transferTargetOrder.orderCode || 'DH-2026-XXX'}: {transferTargetOrder.title}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                  Chọn Đầu Mối Tiếp Nhận Mới *
                </label>
                <select
                  value={targetDestinationHub}
                  onChange={e => setTargetDestinationHub(e.target.value as HubKey)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 12px', fontSize: '0.88rem', outline: 'none' }}
                >
                  {(Object.keys(HUB_MAP) as HubKey[]).filter(k => k !== 'ALL').map(key => (
                    <option key={key} value={key}>{HUB_MAP[key].icon} {HUB_MAP[key].name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                  Chuyển Đến Bước Tiến Độ *
                </label>
                <select
                  value={targetDestinationStep}
                  onChange={e => setTargetDestinationStep(parseInt(e.target.value, 10))}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 12px', fontSize: '0.88rem', outline: 'none' }}
                >
                  {WORKFLOW_13_STEPS.map(step => (
                    <option key={step.stepNumber} value={step.stepNumber}>
                      {step.icon} Bước {step.stepNumber}: {step.name.replace(`Bước ${step.stepNumber}: `, '')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 6 }}>
                  Ghi Chú Chuyển Giao / Yêu Cầu Cho Đầu Mối Mới
                </label>
                <textarea
                  rows={3}
                  placeholder="Ghi chú nội dung bàn giao, nghiệm thu chuyển tiếp..."
                  value={transferNote}
                  onChange={e => setTransferNote(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', borderRadius: 8, background: 'linear-gradient(135deg, #ff5722, #ea580c)', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  Xác Nhận Bàn Giao
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. AUTHENTIC ZALO PC DESKTOP & MOBILE FULL FEATURE CHAT SYSTEM */}
      {isChatOpen && (
        <div className="zalo-chat-modal-overlay" style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div className="zalo-chat-modal-container" style={{
            width: '100%', maxWidth: isChatExpanded ? '96vw' : (isZaloInfoOpen ? 1100 : 960), height: isChatExpanded ? '92vh' : 680, backgroundColor: '#090d16',
            border: '1px solid rgba(56, 189, 248, 0.45)', borderRadius: 20,
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95)', display: 'flex', overflow: 'hidden',
            fontFamily: 'var(--font-primary)', transition: 'all 0.25s ease'
          }}>

            {/* COLUMN 0: ZALO PC LEFT NAV BAR (WIDTH: 64px) */}
            <div className="zalo-chat-left-col desktop-only" style={{
              width: 64, backgroundColor: '#090d16', borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0', flexShrink: 0
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                {/* User Avatar */}
                <div
                  title="Tài khoản AVG One"
                  style={{
                    width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)', cursor: 'pointer'
                  }}
                >
                  👨‍💼
                </div>

                {/* Nav Tabs */}
                <button
                  onClick={() => setZaloNavTab('messages')}
                  title="Nhắn tin hội thoại (💬)"
                  style={{
                    width: 42, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer',
                    backgroundColor: zaloNavTab === 'messages' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: zaloNavTab === 'messages' ? '#38bdf8' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}
                >
                  <MessageSquare style={{ width: 20, height: 20 }} />
                </button>

                <button
                  onClick={() => setZaloNavTab('contacts')}
                  title="Danh bạ đồng nghiệp & Khách mời (👤)"
                  style={{
                    width: 42, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer',
                    backgroundColor: zaloNavTab === 'contacts' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: zaloNavTab === 'contacts' ? '#38bdf8' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}
                >
                  <Users style={{ width: 20, height: 20 }} />
                </button>

                <button
                  onClick={() => setZaloNavTab('tasks')}
                  title="Zalo Giao việc & 13 Bước Tiến độ (✅)"
                  style={{
                    width: 42, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer',
                    backgroundColor: zaloNavTab === 'tasks' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: zaloNavTab === 'tasks' ? '#38bdf8' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}
                >
                  <Target style={{ width: 20, height: 20 }} />
                </button>

                <button
                  onClick={() => setZaloNavTab('cloud')}
                  title="Cloud Truyền File / Kho lưu trữ VBKL (☁️)"
                  style={{
                    width: 42, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer',
                    backgroundColor: zaloNavTab === 'cloud' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: zaloNavTab === 'cloud' ? '#38bdf8' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}
                >
                  <Package style={{ width: 20, height: 20 }} />
                </button>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => showToast('⚙️ Cài đặt tiện ích Zalo PC AVG One')}
                  title="Cài đặt tiện ích"
                  style={{
                    width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
                    backgroundColor: 'transparent', color: '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Cpu style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>

            {/* MAIN VIEW MODE ROUTER: MESSAGES vs CONTACTS vs CLOUD vs TASKS */}
            {zaloNavTab === 'contacts' && (
              <div style={{ flex: 1, backgroundColor: '#0b0e14', display: 'flex', flexDirection: 'column', padding: 24, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0068ff', display: 'flex', alignItems: 'center', gap: 10 }}>
                    👤 DANH BẠ AVG ONE & KHÁCH MỜI
                  </div>
                  <button onClick={() => setZaloNavTab('messages')} style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: '#0068ff', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}>
                    💬 Quay lại nhắn tin
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {/* Danh sách bạn bè / Đồng nghiệp */}
                  <div style={{ backgroundColor: '#111622', borderRadius: 14, padding: 18, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#38bdf8', marginBottom: 14 }}>
                      🏢 ĐỒNG NGHIỆP AVG ONE (NỘI BỘ)
                    </div>
                    {zaloConversations.filter(c => c.type === 'internal').map(c => (
                      <div key={c.id} onClick={() => { setActiveConvId(c.id); setZaloNavTab('messages'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 8, cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.2rem' }}>{c.avatar}</span>
                          <div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>{c.name}</div>
                            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>● {c.status}</div>
                          </div>
                        </div>
                        <button style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'rgba(0,104,255,0.2)', color: '#0068ff', border: '1px solid rgba(0,104,255,0.4)', fontSize: '0.7rem', fontWeight: 800 }}>Nhắn tin</button>
                      </div>
                    ))}
                  </div>

                  {/* Danh sách Khách mời ngoài */}
                  <div style={{ backgroundColor: '#111622', borderRadius: 14, padding: 18, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#f97316', marginBottom: 14 }}>
                      🌐 KHÁCH MỜI ĐỐI TÁC NGOÀI
                    </div>
                    {zaloConversations.filter(c => c.type === 'guest').map(c => (
                      <div key={c.id} onClick={() => { setActiveConvId(c.id); setZaloNavTab('messages'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 8, cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.2rem' }}>{c.avatar}</span>
                          <div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>{c.name}</div>
                            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>● {c.status}</div>
                          </div>
                        </div>
                        <button style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'rgba(249,115,22,0.2)', color: '#f97316', border: '1px solid rgba(249,115,22,0.4)', fontSize: '0.7rem', fontWeight: 800 }}>Nhắn tin</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {zaloNavTab === 'cloud' && (
              <div style={{ flex: 1, backgroundColor: '#0b0e14', display: 'flex', flexDirection: 'column', padding: 24, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0068ff', display: 'flex', alignItems: 'center', gap: 10 }}>
                    ☁️ TRUYỀN FILE / CLOUD CỦA TÔI (AVG ONE STORAGE)
                  </div>
                  <button onClick={() => setZaloNavTab('messages')} style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: '#0068ff', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}>
                    💬 Quay lại nhắn tin
                  </button>
                </div>

                <div style={{ padding: 20, backgroundColor: '#111622', borderRadius: 14, border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                    📂 KHO LƯU TRỮ VĂN BẢN KẾT LUẬN (VBKL) & FILE ĐÃ LƯU
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { name: 'VBKL_GiaiTrinh_Thue_B5.1.pdf', size: '2.4 MB', time: '17:45 - 15/08/2026', type: 'PDF' },
                      { name: 'Khung_SanXuat_AVG_One_Spec.docx', size: '1.8 MB', time: '14:20 - 15/08/2026', type: 'DOCX' },
                      { name: 'BaoCao_TaiChinh_LoiNhuan_Q3.xlsx', size: '4.1 MB', time: '10:15 - 14/08/2026', type: 'XLSX' }
                    ].map((file, idx) => (
                      <div key={idx} style={{ padding: '12px 16px', borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <FileText style={{ width: 22, height: 22, color: '#38bdf8' }} />
                          <div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>{file.name}</div>
                            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{file.size} • {file.time}</div>
                          </div>
                        </div>
                        <button onClick={() => showToast(`📥 Đã tải tệp ${file.name} từ Cloud!`)} style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: '#0068ff', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.74rem', cursor: 'pointer' }}>
                          Tải về Cloud
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {zaloNavTab === 'tasks' && (
              <div style={{ flex: 1, backgroundColor: '#0b0e14', display: 'flex', flexDirection: 'column', padding: 24, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#34d399', display: 'flex', alignItems: 'center', gap: 10 }}>
                    ✅ ZALO GIAO VIỆC & TIẾN ĐỘ 13 BƯỚC (TO-DO)
                  </div>
                  <button onClick={() => setZaloNavTab('messages')} style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: '#0068ff', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}>
                    💬 Quay lại nhắn tin
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {orders.slice(0, 4).map(ord => (
                    <div key={ord.id} style={{ padding: 16, borderRadius: 14, backgroundColor: '#111622', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 800 }}>📦 {ord.orderCode} • {ord.department}</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#fff', marginTop: 3 }}>{ord.title}</div>
                        <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: 4, fontWeight: 700 }}>● Đang tiến hành Bước {ord.currentStep}/13</div>
                      </div>
                      <button onClick={() => { setActiveTab('orders'); setIsChatOpen(false); }} style={{ padding: '8px 16px', borderRadius: 8, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.4)', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer' }}>
                        Xem tiến độ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {zaloNavTab === 'messages' && (
              <>
                {/* COLUMN 1: CONVERSATIONS LIST & SEARCH (WIDTH: 310px) */}
                <div className={`zalo-chat-col-list ${mobileChatScreen === 'room' ? 'mobile-hidden' : ''}`} style={{
                  width: 310, backgroundColor: '#0f1422', borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex', flexDirection: 'column', flexShrink: 0
                }}>
                  {/* Header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 900, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MessageSquare style={{ width: 18, height: 18 }} /> AVG ONE CHAT
                    </div>
                    <button
                      className="mobile-only"
                      onClick={() => setIsChatOpen(false)}
                      style={{ padding: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.08)', color: '#94a3b8', border: 'none', cursor: 'pointer' }}
                      title="Đóng Chat"
                    >
                      <X style={{ width: 18, height: 18 }} />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ position: 'relative' }}>
                      <Search style={{ width: 14, height: 14, color: '#64748b', position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Tìm kiếm hội thoại, khách mời..."
                        value={zaloSearchQuery}
                        onChange={e => setZaloSearchQuery(e.target.value)}
                        style={{
                          width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 8, padding: '6px 10px 6px 30px', fontSize: '0.74rem', color: '#fff', outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Category Tabs */}
                  <div style={{ display: 'flex', padding: '6px 8px', gap: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    {[
                      { key: 'all', label: 'Tất cả' },
                      { key: 'internal', label: '🏢 Nội bộ' },
                      { key: 'guest', label: '🌐 Khách mời' },
                      { key: 'group', label: '👥 Nhóm' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setZaloFilterTab(tab.key as any)}
                        style={{
                          flex: 1, padding: '5px 0', borderRadius: 6, fontSize: '0.67rem', fontWeight: 800,
                          backgroundColor: zaloFilterTab === tab.key ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                          color: zaloFilterTab === tab.key ? '#38bdf8' : '#94a3b8', border: 'none', cursor: 'pointer'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Conversation List */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {zaloConversations
                      .filter(c => {
                        if (zaloFilterTab !== 'all' && c.type !== zaloFilterTab) return false;
                        if (zaloSearchQuery.trim()) {
                          return c.name.toLowerCase().includes(zaloSearchQuery.toLowerCase()) || c.lastMessage.toLowerCase().includes(zaloSearchQuery.toLowerCase());
                        }
                        return true;
                      })
                      .map(conv => (
                        <div
                          key={conv.id}
                          onClick={() => {
                            setActiveConvId(conv.id);
                            setMobileChatScreen('room');
                            setZaloConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                          }}
                          style={{
                            padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                            backgroundColor: activeConvId === conv.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                            borderLeft: activeConvId === conv.id ? '4px solid #38bdf8' : '4px solid transparent',
                            cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center', transition: 'all 0.15s'
                          }}
                        >
                          {/* Avatar with Status Dot */}
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{
                              width: 42, height: 42, borderRadius: '50%', backgroundColor: '#1e293b',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                              border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                              {conv.avatar}
                            </div>
                            <span style={{
                              width: 10, height: 10, borderRadius: '50%',
                              backgroundColor: conv.status.includes('Online') ? '#34d399' : '#94a3b8',
                              position: 'absolute', bottom: 0, right: 0, border: '2px solid #0f1422'
                            }} />
                          </div>

                          {/* Name & Last Msg */}
                          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {conv.name}
                              </span>
                              <span style={{ fontSize: '0.62rem', color: '#64748b' }}>{conv.lastTime}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{
                                fontSize: '0.58rem', fontWeight: 900, color: conv.roleColor,
                                backgroundColor: `${conv.roleColor}20`, padding: '1px 5px', borderRadius: 4
                              }}>
                                {conv.roleTag}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                                {conv.lastMessage}
                              </span>
                              {conv.unreadCount > 0 && (
                                <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#fff', backgroundColor: '#ef4444', padding: '1px 6px', borderRadius: 10 }}>
                                  {conv.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* MOBILE CHAT BOTTOM NAVIGATION BAR */}
                  <div className="mobile-chat-bottom-nav mobile-only" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                    padding: '8px 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#090d16'
                  }}>
                    <button
                      onClick={() => setZaloNavTab('messages')}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', color: zaloNavTab === 'messages' ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
                    >
                      <MessageSquare style={{ width: 18, height: 18 }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Tin nhắn</span>
                    </button>
                    <button
                      onClick={() => setZaloNavTab('contacts')}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', color: zaloNavTab === 'contacts' ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
                    >
                      <Users style={{ width: 18, height: 18 }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Danh bạ</span>
                    </button>
                    <button
                      onClick={() => setZaloNavTab('tasks')}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', color: zaloNavTab === 'tasks' ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
                    >
                      <Target style={{ width: 18, height: 18 }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Giao việc</span>
                    </button>
                    <button
                      onClick={() => setZaloNavTab('cloud')}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', color: zaloNavTab === 'cloud' ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
                    >
                      <Package style={{ width: 18, height: 18 }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>Cloud</span>
                    </button>
                  </div>
                </div>

                {/* COLUMN 2: MAIN ZALO CHAT STREAM & TOOLBAR (FLEX: 1) */}
                {(() => {
                  const activeConv = zaloConversations.find(c => c.id === activeConvId) || zaloConversations[0] || {
                    id: 'fallback',
                    name: 'Bà Bích (Quản lý Thuế)',
                    avatar: '👩‍💼',
                    type: 'guest',
                    roleTag: 'KHÁCH MỜI NGOÀI',
                    roleColor: '#f97316',
                    status: 'Online',
                    unreadCount: 0,
                    lastMessage: '',
                    lastTime: '',
                    messages: []
                  };

                  return (
                    <div className={`zalo-chat-col-room ${mobileChatScreen === 'list' ? 'mobile-hidden' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#090d16' }}>
                      {/* Active Zalo Header Bar */}
                      <div style={{
                        padding: '12px 18px', backgroundColor: '#0f1422', borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {/* NÚT QUAY LẠI DANH SÁCH CHÁT TRÊN MOBILE */}
                          <button
                            className="mobile-only"
                            onClick={() => setMobileChatScreen('list')}
                            style={{
                              padding: '6px 10px', borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)',
                              color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: 5, fontWeight: 800, fontSize: '0.74rem'
                            }}
                            title="Quay lại danh sách hội thoại"
                          >
                            <ArrowLeft style={{ width: 15, height: 15 }} />
                            <span>Quay lại</span>
                          </button>

                          <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                            {activeConv.avatar}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ffffff' }}>
                              {activeConv.name}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 700, marginTop: 1 }}>
                              ● {activeConv.status}
                            </div>
                          </div>
                        </div>

                        {/* Zalo PC Action Buttons (CHỈ HIỂN THỊ ICON ĐỒNG BỘ MÀU XANH / CAM HỆ THỐNG) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            onClick={() => showToast(`📞 Đang thực hiện cuộc gọi thoại Zalo với ${activeConv.name}...`)}
                            title="Gọi thoại"
                            style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Phone style={{ width: 16, height: 16 }} />
                          </button>
                          <button
                            onClick={() => showToast(`📹 Đang khởi tạo phòng gọi Video HD với ${activeConv.name}...`)}
                            title="Gọi video HD"
                            style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Video style={{ width: 16, height: 16 }} />
                          </button>
                          <button
                            onClick={() => setIsZaloInfoOpen(!isZaloInfoOpen)}
                            title="Thông tin hội thoại"
                            style={{ padding: 8, borderRadius: 8, backgroundColor: isZaloInfoOpen ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.06)', color: isZaloInfoOpen ? '#38bdf8' : '#cbd5e1', border: isZaloInfoOpen ? '1px solid rgba(56, 189, 248, 0.4)' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Info style={{ width: 16, height: 16 }} />
                          </button>
                          <button
                            onClick={() => setIsChatExpanded(!isChatExpanded)}
                            title={isChatExpanded ? "Thu nhỏ vùng Chat" : "Mở rộng giao diện Chat (Toàn màn hình)"}
                            style={{ padding: 8, borderRadius: 8, backgroundColor: isChatExpanded ? 'rgba(56, 189, 248, 0.25)' : 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            {isChatExpanded ? <Minimize2 style={{ width: 16, height: 16 }} /> : <Maximize2 style={{ width: 16, height: 16 }} />}
                          </button>
                          <button
                            onClick={() => setIsChatOpen(false)}
                            title="Đóng cửa sổ Chat"
                            style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <X style={{ width: 16, height: 16 }} />
                          </button>
                        </div>
                      </div>

                      {/* Zalo Chat Message Stream */}
                      <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ textTransform: 'uppercase', fontSize: '0.64rem', color: '#64748b', fontWeight: 800, textAlign: 'center', margin: '4px 0' }}>
                          ──────── HÔM NAY, 15 THÁNG 08 NĂM 2026 ────────
                        </div>

                        {(activeConv?.messages || []).map(m => (
                          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.isMe ? 'flex-end' : 'flex-start', position: 'relative' }}>
                            {!m.isMe && (
                              <span style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 800, marginBottom: 3, marginLeft: 4 }}>
                                {m.senderName}
                              </span>
                            )}
                            <div style={{
                              maxWidth: '75%', padding: '10px 16px', borderRadius: m.isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                              background: m.isMe ? 'linear-gradient(135deg, #0284c7, #0068ff)' : '#1a2234',
                              border: m.isMe ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                              color: '#ffffff', fontSize: '0.84rem', lineHeight: 1.5, fontWeight: 500,
                              boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                            }}>
                              {m.text}

                              {/* File Attachment Card (Zalo PC Style) */}
                              {m.attachmentName && (
                                <div style={{
                                  marginTop: 10, padding: '10px 14px', borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.35)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.76rem', fontWeight: 800, color: '#38bdf8' }}>
                                    <FileText style={{ width: 16, height: 16, color: '#38bdf8' }} /> {m.attachmentName}
                                  </div>
                                  <button
                                    onClick={() => showToast(`📥 Đã tải tệp ${m.attachmentName}`)}
                                    style={{ fontSize: '0.68rem', color: '#ffffff', backgroundColor: '#0284c7', border: 'none', padding: '4px 10px', borderRadius: 6, fontWeight: 800, cursor: 'pointer' }}
                                  >
                                    Tải về
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* PER-MESSAGE REACTION BAR (THẢ VÀ THU HỒI CẢM XÚC TỪNG TIN NHẮN) */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                              {/* Active Reaction Pills */}
                              {m.reactions && Object.entries(m.reactions).map(([emoji, count]) => {
                                const isMyReaction = (m.userReactions || []).includes(emoji);
                                return (
                                  <button
                                    key={emoji}
                                    onClick={() => handleToggleReaction(m.id, emoji)}
                                    title={isMyReaction ? `Thu hồi cảm xúc ${emoji}` : `Thả cảm xúc ${emoji}`}
                                    style={{
                                      padding: '2px 7px', borderRadius: 12,
                                      backgroundColor: isMyReaction ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                                      border: isMyReaction ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                                      color: '#ffffff', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3
                                    }}
                                  >
                                    <span>{emoji}</span> <span style={{ fontSize: '0.65rem', fontWeight: 800, color: isMyReaction ? '#38bdf8' : '#94a3b8' }}>{count}</span>
                                  </button>
                                );
                              })}

                              {/* Quick Reaction Quick Pick bar on each message */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 2, backgroundColor: 'rgba(15, 20, 34, 0.9)', padding: '2px 6px', borderRadius: 14, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                {['👍', '❤️', '😄', '😮', '😢', '😡'].map(emoji => (
                                  <button
                                    key={emoji}
                                    onClick={() => handleToggleReaction(m.id, emoji)}
                                    title={`Thả / Thu hồi cảm xúc ${emoji}`}
                                    style={{
                                      padding: '2px 4px', borderRadius: 6, backgroundColor: 'transparent',
                                      border: 'none', cursor: 'pointer', fontSize: '0.78rem', transition: 'transform 0.15s'
                                    }}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Message Time & Delivery Status */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, padding: '0 4px' }}>
                              <span style={{ fontSize: '0.62rem', color: '#64748b' }}>{m.time}</span>
                              {m.isMe && <span style={{ fontSize: '0.62rem', color: '#34d399', fontWeight: 800 }}>✓✓ Đã gửi</span>}
                            </div>
                          </div>
                        ))}
                        <div ref={chatMessagesEndRef} />
                      </div>

                      {/* Zalo PC Main Utility Toolbar (Mô phỏng 100% Tiện ích Zalo PC theo hình media_1786810815410) */}
                      <div style={{
                        padding: '6px 14px', backgroundColor: '#0f1422', borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button onClick={() => handleSendZaloMessage('😊')} title="Thẻ Biểu cảm / Emoji" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <Smile style={{ width: 17, height: 17 }} />
                          </button>
                          <button onClick={() => handleSendZaloMessage('🖼️ Đã gửi hình ảnh mới.')} title="Gửi hình ảnh" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <Image style={{ width: 17, height: 17 }} />
                          </button>
                          <button onClick={() => handleSendZaloMessage('📎 Đã chia sẻ tệp tài liệu mới.')} title="Gửi tệp đính kèm" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <Paperclip style={{ width: 17, height: 17 }} />
                          </button>
                          <button onClick={() => handleSendZaloMessage('🎴 Đã gửi danh thiếp liên hệ.')} title="Gửi danh thiếp" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <Contact style={{ width: 17, height: 17 }} />
                          </button>
                          <button onClick={() => showToast('✂️ Đã chụp vùng màn hình và dán vào Chat!')} title="Chụp màn hình" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <Scissors style={{ width: 17, height: 17 }} />
                          </button>

                          <div style={{ height: 14, width: 1, backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

                          {/* Nút A✎ Định dạng tin nhắn (Ctrl + Shift + X) */}
                          <button
                            onClick={() => setIsRichTextOpen(!isRichTextOpen)}
                            title="Định dạng tin nhắn (Ctrl + Shift + X)"
                            style={{
                              padding: '4px 8px', borderRadius: 8,
                              backgroundColor: isRichTextOpen ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                              color: isRichTextOpen ? '#38bdf8' : '#94a3b8',
                              border: isRichTextOpen ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                              fontSize: '0.78rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                            }}
                          >
                            <Type style={{ width: 15, height: 15 }} /> A✎
                          </button>

                          <button onClick={() => handleSendZaloMessage('⚡ Cảm ơn chị, bên em đang xử lý ngay.')} title="Tin nhắn nhanh" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <Zap style={{ width: 17, height: 17 }} />
                          </button>
                          <button onClick={() => showToast('💳 Khởi tạo nhắc hẹn & giao việc Zalo')} title="Giao việc / Nhắc hẹn" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <CreditCard style={{ width: 17, height: 17 }} />
                          </button>
                          <button onClick={() => showToast('... Xem thêm tiện ích Zalo PC')} title="Xem thêm tiện ích" style={{ padding: 6, borderRadius: 8, backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
                            <MoreHorizontal style={{ width: 17, height: 17 }} />
                          </button>
                        </div>
                      </div>

                      {/* Zalo PC Rich Text Toolbar (Hiển thị khi bật A✎ định dạng tin nhắn) */}
                      {isRichTextOpen && (
                        <div style={{
                          padding: '6px 14px', backgroundColor: '#090d16', borderTop: '1px solid rgba(56, 189, 248, 0.2)',
                          display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)'
                        }}>
                          <button onClick={() => setZaloMessageInput(prev => `${prev} **in đậm**`)} title="In đậm (Bold)" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', cursor: 'pointer' }}><Bold style={{ width: 14, height: 14 }} /></button>
                          <button onClick={() => setZaloMessageInput(prev => `${prev} *in nghiêng*`)} title="In nghiêng (Italic)" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', cursor: 'pointer' }}><Italic style={{ width: 14, height: 14 }} /></button>
                          <button onClick={() => setZaloMessageInput(prev => `${prev} <u>gạch chân</u>`)} title="Gạch chân (Underline)" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', cursor: 'pointer' }}><Underline style={{ width: 14, height: 14 }} /></button>
                          <button onClick={() => setZaloMessageInput(prev => `${prev} ~~gạch ngang~~`)} title="Gạch ngang (Strikethrough)" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', cursor: 'pointer' }}><Strikethrough style={{ width: 14, height: 14 }} /></button>
                          <button onClick={() => setZaloMessageInput(prev => `${prev}\n• `)} title="Danh sách đầu dòng" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', cursor: 'pointer' }}><List style={{ width: 14, height: 14 }} /></button>
                          <button onClick={() => setZaloMessageInput(prev => `${prev}\n1. `)} title="Danh sách số" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', cursor: 'pointer' }}><ListOrdered style={{ width: 14, height: 14 }} /></button>
                          <button onClick={() => setZaloMessageInput('')} title="Xóa định dạng" style={{ padding: 4, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: 'none', cursor: 'pointer' }}><Eraser style={{ width: 14, height: 14 }} /></button>
                          <span style={{ fontSize: '0.64rem', color: '#38bdf8', fontWeight: 700, marginLeft: 'auto' }}>Nhấn Ctrl + Shift + X để định dạng tin nhắn</span>
                        </div>
                      )}

                      {/* Zalo PC Input Form (HỖ TRỢ MỞ RỘNG NHIỀU DÒNG & PHÍM TẮT ENTER / SHIFT+ENTER) */}
                      <form
                        onSubmit={(e) => { e.preventDefault(); handleSendZaloMessage(); }}
                        style={{
                          padding: 12, backgroundColor: '#0f1422', borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex', flexDirection: 'column', gap: 6
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: isInputExpanded ? 'flex-start' : 'center', gap: 8 }}>
                          {isInputExpanded ? (
                            <textarea
                              rows={4}
                              placeholder="Nhập tin nhắn..."
                              value={zaloMessageInput}
                              onChange={e => setZaloMessageInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendZaloMessage();
                                }
                              }}
                              style={{
                                flex: 1, backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.4)',
                                borderRadius: 12, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none',
                                resize: 'none', fontFamily: 'inherit', lineHeight: 1.5
                              }}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Nhập tin nhắn..."
                              value={zaloMessageInput}
                              onChange={e => setZaloMessageInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.shiftKey) {
                                  e.preventDefault();
                                  setIsInputExpanded(true);
                                } else if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSendZaloMessage();
                                }
                              }}
                              style={{
                                flex: 1, backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.4)',
                                borderRadius: 12, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none'
                              }}
                            />
                          )}

                          <div style={{ display: 'flex', flexDirection: isInputExpanded ? 'column' : 'row', gap: 6, alignItems: 'center' }}>
                            <button
                              type="button"
                              onClick={() => setIsInputExpanded(!isInputExpanded)}
                              title={isInputExpanded ? "Thu nhỏ ô nhập (1 dòng)" : "Mở rộng ô nhập tin nhắn (Nhiều dòng)"}
                              style={{
                                padding: 7, borderRadius: 8, backgroundColor: isInputExpanded ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.06)',
                                color: isInputExpanded ? '#38bdf8' : '#94a3b8', border: '1px solid rgba(56, 189, 248, 0.3)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}
                            >
                              {isInputExpanded ? <Minimize2 style={{ width: 14, height: 14 }} /> : <Maximize2 style={{ width: 14, height: 14 }} />}
                            </button>

                            <button
                              type="submit"
                              title="Gửi tin nhắn (Enter)"
                              style={{
                                padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(135deg, #0284c7, #0068ff)',
                                color: '#ffffff', border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}
                            >
                              <Send style={{ width: 16, height: 16 }} />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  );
                })()}

                {/* COLUMN 3: ZALO PC RIGHT INFO SIDEBAR (WHEN TOGGLED ℹ️) */}
                {isZaloInfoOpen && (() => {
                  const activeConv = zaloConversations.find(c => c.id === activeConvId) || zaloConversations[0] || {
                    id: 'fallback',
                    name: 'Bà Bích (Quản lý Thuế)',
                    avatar: '👩‍💼',
                    type: 'guest',
                    roleTag: 'KHÁCH MỜI NGOÀI',
                    roleColor: '#f97316',
                    status: 'Online',
                    unreadCount: 0,
                    lastMessage: '',
                    lastTime: '',
                    messages: []
                  };
                  return (
                    <div style={{ width: 250, backgroundColor: '#0b0f19', borderLeft: '1px solid rgba(255, 255, 255, 0.08)', padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', flexShrink: 0 }}>
                      <div style={{ textAlign: 'center', paddingBottom: 14, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div style={{ width: 54, height: 54, borderRadius: '50%', backgroundColor: '#1e293b', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                          {activeConv.avatar}
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#fff' }}>{activeConv.name}</div>
                      </div>

                      {/* Quick Zalo Info Actions (CHỈ HIỂN THỊ ICON ĐỒNG BỘ MÀU XANH / CAM HỆ THỐNG) */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <button onClick={() => showToast('📌 Đã ghim hội thoại Zalo lên đầu!')} title="Ghim hội thoại" style={{ padding: 10, borderRadius: 8, backgroundColor: 'rgba(255, 87, 34, 0.15)', color: '#ff5722', border: '1px solid rgba(255, 87, 34, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Pin style={{ width: 16, height: 16 }} />
                        </button>
                        <button onClick={() => showToast('🔔 Đã bật/tắt thông báo cuộc trò chuyện')} title="Thông báo" style={{ padding: 10, borderRadius: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Bell style={{ width: 16, height: 16 }} />
                        </button>
                      </div>

                      {/* File storage in Info Panel */}
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', marginBottom: 8 }}>📁 TỆP ĐÃ KẾT NỐI (2)</div>
                        <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.72rem', color: '#fff', marginBottom: 6 }}>
                          📄 VBKL_GiaiTrinh_Thue_B5.1.pdf
                        </div>
                        <div style={{ padding: 8, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.72rem', color: '#fff' }}>
                          📄 Spec_AVG_One_2026.docx
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}
      {/* MODAL BAN HÀNH THÔNG ĐIỆP / QUYẾT ĐỊNH ĐIỀU HÀNH MỚI */}
      {isAddDirectiveModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 300,
          backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            backgroundColor: '#111624', border: '1px solid rgba(255, 87, 34, 0.5)',
            borderRadius: 24, padding: 30, width: '100%', maxWidth: 650,
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 87, 34, 0.2)',
            display: 'flex', flexDirection: 'column', gap: 20, maxHeight: '90vh', overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ padding: 8, borderRadius: 10, backgroundColor: 'rgba(255, 87, 34, 0.2)' }}>
                  <Zap style={{ width: 20, height: 20, color: '#ff7043' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: 0, textTransform: 'uppercase' }}>
                  BAN HÀNH THÔNG ĐIỆP / QUYẾT ĐỊNH ĐIỀU HÀNH MỚI
                </h2>
              </div>
              <button
                onClick={() => setIsAddDirectiveModalOpen(false)}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateNewDirective} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Tiêu đề */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>
                  TIÊU ĐỀ THÔNG ĐIỆP / QUYẾT ĐỊNH ĐIỀU HÀNH (*)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Chỉ đạo tháo gỡ vướng mắc dữ liệu kế toán kho & hải quan..."
                  value={newDirectiveTitle}
                  onChange={e => setNewDirectiveTitle(e.target.value)}
                  style={{
                    width: '100%', backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none'
                  }}
                />
              </div>

              {/* Lĩnh vực & Cấp độ */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>
                    LĨNH VỰC THÁO GỠ / ĐỊNH HƯỚNG
                  </label>
                  <select
                    value={newDirectiveCategory}
                    onChange={e => setNewDirectiveCategory(e.target.value as any)}
                    style={{
                      width: '100%', backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none'
                    }}
                  >
                    <option value="Tháo gỡ vận hành">Tháo gỡ vận hành</option>
                    <option value="Định hướng chiến lược">Định hướng chiến lược</option>
                    <option value="Kỹ thuật - Hệ thống">Kỹ thuật - Hệ thống</option>
                    <option value="Nhân sự - Tổ chức">Nhân sự - Tổ chức</option>
                    <option value="Sản xuất - Vận hành">Sản xuất - Vận hành</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>
                    CẤP ĐỘ ƯU TIÊN / MỨC ĐỘ KHẨN
                  </label>
                  <select
                    value={newDirectivePriority}
                    onChange={e => setNewDirectivePriority(e.target.value as any)}
                    style={{
                      width: '100%', backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none'
                    }}
                  >
                    <option value="TỐI KHẨN">🚨 TỐI KHẨN</option>
                    <option value="KHẨN CẤP">⚡ KHẨN CẤP</option>
                    <option value="TRỌNG ĐIỂM">🔥 TRỌNG ĐIỂM</option>
                    <option value="THƯỜNG XUYÊN">📋 THƯỜNG XUYÊN</option>
                  </select>
                </div>
              </div>

              {/* Phạm vi áp dụng */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>
                  PHẠM VI ÁP DỤNG / ĐẦU MỐI CHỊU TRÁCH NHIỆM
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Toàn Hệ Thống, Đầu Mối 5.1B, Cụm 3.1..."
                  value={newDirectiveScope}
                  onChange={e => setNewDirectiveScope(e.target.value)}
                  style={{
                    width: '100%', backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none'
                  }}
                />
              </div>

              {/* Nội dung chỉ đạo */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>
                  NỘI DUNG CHỈ ĐẠO & GIẢI PHÁP THÁO GỠ CHI TIẾT (*)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Nhập nội dung thông điệp chỉ đạo trực tiếp từ Ban Điều Hành..."
                  value={newDirectiveContent}
                  onChange={e => setNewDirectiveContent(e.target.value)}
                  style={{
                    width: '100%', backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none',
                    fontFamily: 'inherit', resize: 'vertical'
                  }}
                />
              </div>

              {/* Link VBKL đính kèm */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>
                  LINK VĂN BẢN KẾT LUẬN / GOOGLE SHEET 24/7 (ĐÍNH KÈM)
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/document/d/... hoặc Google Sheet Link"
                  value={newDirectiveDocUrl}
                  onChange={e => setNewDirectiveDocUrl(e.target.value)}
                  style={{
                    width: '100%', backgroundColor: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#fff', outline: 'none'
                  }}
                />
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsAddDirectiveModalOpen(false)}
                  style={{
                    padding: '10px 20px', borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#cbd5e1', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.8rem',
                    fontWeight: 800, cursor: 'pointer'
                  }}
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #ff5722, #ff7043)',
                    color: '#ffffff', border: 'none', fontSize: '0.8rem', fontWeight: 900,
                    boxShadow: '0 4px 16px rgba(255, 87, 34, 0.4)', cursor: 'pointer'
                  }}
                >
                  📢 Ban Hành Thông Điệp 24/7
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM HEADER BAR */}
      <nav className="mobile-bottom-header-bar mobile-only">
        <button
          type="button"
          className={`mobile-bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
        >
          <Home style={{ width: 20, height: 20 }} />
          <span>Trang chủ</span>
        </button>
        <button
          type="button"
          className={`mobile-bottom-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => { setSelectedHub('ALL'); setActiveTab('orders'); setIsMobileMenuOpen(false); }}
        >
          <Package style={{ width: 20, height: 20 }} />
          <span>Đơn hàng</span>
        </button>
        <button
          type="button"
          className={`mobile-bottom-nav-item ${(activeTab === 'calendar-talk' || activeTab === 'calendar-ot') ? 'active' : ''}`}
          onClick={() => { setActiveTab('calendar-talk'); setIsMobileMenuOpen(false); }}
        >
          <CalendarIcon style={{ width: 20, height: 20 }} />
          <span>Lịch trao đổi</span>
        </button>
        <button
          type="button"
          className={`mobile-bottom-nav-item ${activeTab === 'hr-management' ? 'active' : ''}`}
          onClick={() => { setActiveTab('hr-management'); setIsMobileMenuOpen(false); }}
        >
          <Users style={{ width: 20, height: 20 }} />
          <span>Nhân sự</span>
        </button>
        <button
          type="button"
          className={`mobile-bottom-nav-item ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu style={{ width: 20, height: 20 }} />
          <span>Menu</span>
        </button>
      </nav>
    </div>
  );
}
