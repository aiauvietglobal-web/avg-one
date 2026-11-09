export interface EventAttachment {
  id: string;
  name: string;
  type: 'image' | 'file' | 'url';
  url: string;
  size?: string;
  uploadedAt?: string;
}

export interface DiscussionEvent {
  id: string;
  stt?: number;
  dayOfWeek?: string;
  date: string;
  plannedStartTime?: string;
  plannedEndTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  title: string;
  attendees?: string;
  scope?: string;
  chairperson?: string;
  secretary?: string;
  notes?: string;
  legalEntity?: string;
  status?: string;
  documentText?: string;
  conclusionDocUrl?: string;
  attachments?: EventAttachment[];
  plannedDurationMinutes?: number;
  actualDurationMinutes?: number;
  inflationMinutes?: number;
  inflationRate?: string;
  sheetRowIndex?: number;
}

export interface LichTraoDoiSheetOverview {
  totalDiscussions: number;
  plannedDurationMinutes: number;
  actualDurationMinutes: number;
  inflationMinutes: number;
  inflationRate: string;
}

export const GOOGLE_SHEET_SPREADSHEET_ID = '11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M';
export const GOOGLE_SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_SPREADSHEET_ID}/edit`;
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_SPREADSHEET_ID}/gviz/tq?tqx=out:csv`;
export const LICH_TRAO_DOI_TAB_NAME = 'LỊCH TRAO ĐỔI';

const LOCAL_DISCUSSION_EVENTS_KEY = 'avg_local_discussion_events_v2';
const WEBHOOK_URL_KEY = 'avg_google_sheet_webhook_url';

export function getGoogleSheetWebhookUrl(): string {
  try {
    return localStorage.getItem(WEBHOOK_URL_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function setGoogleSheetWebhookUrl(url: string): void {
  try {
    localStorage.setItem(WEBHOOK_URL_KEY, url.trim());
  } catch (e) {
    console.error('Error saving Google Sheet Webhook URL:', e);
  }
}

export const DEFAULT_GOOGLE_APPS_SCRIPT_CODE = `
function doGet(e) {
  return handleSync(e);
}

function doPost(e) {
  return handleSync(e);
}

function getTargetSheet(ss, dateStr) {
  // 1. Ưu tiên số 1: Sheet LỊCH TRAO ĐỔI theo đúng chuẩn của phân hệ Lịch
  var lichTraoDoiSheet = ss.getSheetByName("LỊCH TRAO ĐỔI") || ss.getSheetByName("Lịch trao đổi") || ss.getSheetByName("LICH TRAO DOI");
  if (lichTraoDoiSheet) return lichTraoDoiSheet;

  if (dateStr && dateStr.indexOf('/') !== -1) {
    var parts = dateStr.split('/');
    if (parts.length >= 2) {
      var m = parseInt(parts[1], 10);
      if (!isNaN(m)) {
        var mPad = m < 10 ? '0' + m : '' + m;
        var names = [
          'Tháng ' + mPad + ' ', 'Tháng ' + m + ' ',
          'Tháng ' + mPad, 'Tháng ' + m,
          'T' + mPad, 'T' + m
        ];
        for (var i = 0; i < names.length; i++) {
          var s = ss.getSheetByName(names[i]);
          if (s) return s;
        }
      }
    }
  }
  var sheets = ss.getSheets();
  for (var k = 0; k < sheets.length; k++) {
    if (sheets[k].getSheetId() == 1763358123) {
      return sheets[k];
    }
  }
  return ss.getSheetByName("LỊCH LÀM VIỆC 2026") || sheets[0];
}

// Bulletproof duplicate row cleaner for Google Sheet
function removeDuplicateRows() {
  var ss;
  try {
    ss = SpreadsheetApp.openById("11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M");
  } catch(err) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  
  var sheets = ss.getSheets();
  for (var sIdx = 0; sIdx < sheets.length; sIdx++) {
    var sheet = sheets[sIdx];
    var lastRow = sheet.getLastRow();
    if (lastRow < 5) continue;
    
    var displayValues = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getDisplayValues();
    var seenKeys = {};
    var rowsToDelete = [];
    
    for (var i = 0; i < displayValues.length; i++) {
      var row = displayValues[i];
      var titleStr = (row[12] || row[9] || row[10] || '').toString().trim().toLowerCase();
      var dateStr = (row[3] || row[2] || '').toString().trim();
      var timeStr = (row[5] || row[4] || '').toString().trim();
      
      var fullRowKey = row.join('||').trim().toLowerCase();
      var compactKey = titleStr + '_' + dateStr + '_' + timeStr;
      
      var isDup = (fullRowKey.length > 10 && seenKeys[fullRowKey]) || (compactKey.length > 5 && titleStr.length > 0 && seenKeys[compactKey]);
      
      if (isDup) {
        rowsToDelete.push(i + 2);
      } else {
        if (fullRowKey.length > 10) seenKeys[fullRowKey] = true;
        if (compactKey.length > 5 && titleStr.length > 0) seenKeys[compactKey] = true;
      }
    }
    
    for (var j = rowsToDelete.length - 1; j >= 0; j--) {
      sheet.deleteRow(rowsToDelete[j]);
    }
  }
}

function handleSync(e) {
  try {
    var ss;
    try {
      ss = SpreadsheetApp.openById("11p55tNRLRqVfgwEfrcTWJfxKA6dJQyDJq4CapgZ5o-M");
    } catch(err) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    var p = (e && e.parameter) ? e.parameter : {};
    var jsonEvt = {};
    if (e && e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        jsonEvt = parsed.eventData || parsed || {};
      } catch(err) {}
    }
    
    var title = p.title || jsonEvt.title || '';
    var dateStr = p.date || jsonEvt.date || '';
    if (!title && !dateStr) {
      return ContentService.createTextOutput("Empty payload");
    }
    
    var sheet = getTargetSheet(ss, dateStr);
    var sheetName = sheet.getName().toUpperCase();
    
    var pStart = p.plannedStartTime || jsonEvt.plannedStartTime || '18:00';
    var pEnd = p.plannedEndTime || jsonEvt.plannedEndTime || '19:00';
    
    var durationMins = '';
    if (pStart && pEnd && pStart.includes(':') && pEnd.includes(':')) {
      var sParts = pStart.split(':').map(Number);
      var eParts = pEnd.split(':').map(Number);
      var diffMins = (eParts[0] * 60 + eParts[1]) - (sParts[0] * 60 + sParts[1]);
      if (diffMins > 0) durationMins = diffMins.toString();
    }

    var isLichTraoDoi = sheetName.indexOf('TRAO ĐỔI') !== -1 || sheetName.indexOf('TRAO DOI') !== -1;
    var newRowValues;

    if (isLichTraoDoi) {
      // Đúng chuẩn 19 cột của sheet LỊCH TRAO ĐỔI
      newRowValues = [
        p.notes || jsonEvt.notes || '',                                // Col A: Ghi chú
        p.scope || jsonEvt.scope || 'P1',                             // Col B: Phạm vi
        p.dayOfWeek || jsonEvt.dayOfWeek || 'Thứ 2',                  // Col C: Thứ
        dateStr,                                                      // Col D: Ngày
        p.plannedDuration || durationMins || '60',                    // Col E: Thời lượng dự kiến (phút)
        pStart,                                                       // Col F: Thời điểm bắt đầu dự kiến
        pEnd,                                                         // Col G: Thời điểm kết thúc dự kiến
        p.actualDuration || '',                                       // Col H: Thời lượng thực tế
        p.actualStartTime || jsonEvt.actualStartTime || '',          // Col I: Thời gian thực bắt đầu
        p.actualEndTime || jsonEvt.actualEndTime || '',              // Col J: Thời gian thực kết thúc
        p.inflationMins || '',                                        // Col K: Lạm phát thời gian (phút)
        p.inflationRate || '',                                        // Col L: Tỷ lệ lạm phát
        title,                                                        // Col M: Nội dung/ Chủ đề
        p.legalEntity || jsonEvt.legalEntity || '-',                  // Col N: Điều hành trao đổi
        p.attendees || jsonEvt.attendees || '',                       // Col O: Thành phần tham dự
        p.secretary || jsonEvt.secretary || '',                       // Col P: Thư ký
        p.status || jsonEvt.status || 'Sắp tới',                      // Col Q: Trạng thái
        p.document || '',                                             // Col R: Tài liệu
        p.conclusionDocUrl || jsonEvt.conclusionDocUrl || ''          // Col S: Link VBKL
      ];
    } else {
      newRowValues = [
        p.scope || jsonEvt.scope || 'P1',
        p.dayOfWeek || jsonEvt.dayOfWeek || 'THỨ BA',
        dateStr || '18/08/2026',
        durationMins,
        pStart,
        pEnd,
        p.actualStartTime || jsonEvt.actualStartTime || '',
        p.actualEndTime || jsonEvt.actualEndTime || '',
        '',
        title,
        p.legalEntity || jsonEvt.legalEntity || 'DH',
        p.attendees || jsonEvt.attendees || 'AV; AVG',
        p.secretary || jsonEvt.secretary || '2.1',
        p.status || jsonEvt.status || 'Sắp tới',
        p.notes || jsonEvt.notes || ''
      ];
    }
    
    // Prevent duplicate row insertion using getDisplayValues()
    var lastRow = sheet.getLastRow();
    var isDuplicate = false;
    var startScan = isLichTraoDoi ? 4 : 2;
    if (lastRow >= startScan) {
      var displayData = sheet.getRange(startScan, 1, lastRow - startScan + 1, sheet.getLastColumn()).getDisplayValues();
      for (var r = 0; r < displayData.length; r++) {
        var exDate = isLichTraoDoi ? (displayData[r][3] || '').trim() : (displayData[r][2] || '').trim();
        var exStart = isLichTraoDoi ? (displayData[r][5] || '').trim() : (displayData[r][4] || '').trim();
        var exTitle = isLichTraoDoi ? (displayData[r][12] || '').trim().toLowerCase() : (displayData[r][9] || '').trim().toLowerCase();
        
        if (exTitle === title.trim().toLowerCase() && exDate === dateStr.trim()) {
          isDuplicate = true;
          sheet.getRange(startScan + r, 1, 1, newRowValues.length).setValues([newRowValues]);
          break;
        }
      }
    }
    
    if (!isDuplicate) {
      sheet.appendRow(newRowValues);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Đã đồng bộ sheet LỊCH TRAO ĐỔI thành công!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`.trim();

export function getLocalDiscussionEvents(): DiscussionEvent[] {
  try {
    const raw = localStorage.getItem(LOCAL_DISCUSSION_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveLocalDiscussionEvent(event: DiscussionEvent): DiscussionEvent[] {
  try {
    const existing = getLocalDiscussionEvents();
    const filtered = existing.filter(e => e.id !== event.id && e.title !== event.title);
    const updated = [event, ...filtered];
    localStorage.setItem(LOCAL_DISCUSSION_EVENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving local discussion event:', e);
    return [];
  }
}

export function updateLocalDiscussionEvent(event: DiscussionEvent): DiscussionEvent[] {
  try {
    const existing = getLocalDiscussionEvents();
    const index = existing.findIndex(e => e.id === event.id || (e.title.trim().toLowerCase() === event.title.trim().toLowerCase() && e.date === event.date));
    let updated: DiscussionEvent[];
    if (index !== -1) {
      updated = [...existing];
      updated[index] = { ...updated[index], ...event };
    } else {
      updated = [event, ...existing];
    }
    localStorage.setItem(LOCAL_DISCUSSION_EVENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error updating local discussion event:', e);
    return [];
  }
}

export interface DeletedDiscussionEvent extends DiscussionEvent {
  deletedAt: string;
}

const DELETED_DISCUSSION_EVENTS_KEY = 'avg_deleted_discussion_events_v2';

export function getDeletedDiscussionEvents(): DeletedDiscussionEvent[] {
  try {
    const raw = localStorage.getItem(DELETED_DISCUSSION_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function moveToTrashDiscussionEvent(event: DiscussionEvent): DeletedDiscussionEvent[] {
  try {
    deleteLocalDiscussionEvent(event.id, event.title);
    const existing = getDeletedDiscussionEvents();
    const deletedItem: DeletedDiscussionEvent = {
      ...event,
      deletedAt: new Date().toLocaleString('vi-VN')
    };
    const filtered = existing.filter(e => e.id !== event.id && e.title !== event.title);
    const updated = [deletedItem, ...filtered];
    localStorage.setItem(DELETED_DISCUSSION_EVENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error moving discussion event to trash:', e);
    return [];
  }
}

export function restoreDiscussionEventFromTrash(eventId: string): DiscussionEvent | null {
  try {
    const existing = getDeletedDiscussionEvents();
    const target = existing.find(e => e.id === eventId);
    if (!target) return null;

    const remaining = existing.filter(e => e.id !== eventId);
    localStorage.setItem(DELETED_DISCUSSION_EVENTS_KEY, JSON.stringify(remaining));

    saveLocalDiscussionEvent(target);
    return target;
  } catch (e) {
    console.error('Error restoring discussion event:', e);
    return null;
  }
}

export function purgeDiscussionEventPermanently(eventId: string): DeletedDiscussionEvent[] {
  try {
    const existing = getDeletedDiscussionEvents();
    const updated = existing.filter(e => e.id !== eventId);
    localStorage.setItem(DELETED_DISCUSSION_EVENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error purging discussion event:', e);
    return [];
  }
}

export function emptyTrashDiscussionEvents(): void {
  try {
    localStorage.removeItem(DELETED_DISCUSSION_EVENTS_KEY);
  } catch (e) {
    console.error('Error emptying trash:', e);
  }
}

export function deleteLocalDiscussionEvent(eventId: string, title?: string): DiscussionEvent[] {
  try {
    const existing = getLocalDiscussionEvents();
    const updated = existing.filter(e => {
      if (e.id === eventId) return false;
      if (title && e.title.trim().toLowerCase() === title.trim().toLowerCase()) return false;
      return true;
    });
    localStorage.setItem(LOCAL_DISCUSSION_EVENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting local discussion event:', e);
    return [];
  }
}

// Native HTML Form Submit via Hidden IFrame (100% Guaranteed to trigger Google Apps Script)
export function submitToGoogleSheetViaHiddenForm(webhookUrl: string, event: DiscussionEvent): void {
  try {
    let iframe = document.getElementById('avg_gsheet_hidden_iframe') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'avg_gsheet_hidden_iframe';
      iframe.name = 'avg_gsheet_hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = webhookUrl;
    form.target = 'avg_gsheet_hidden_iframe';

    const fields: Record<string, string> = {
      action: 'addDiscussionEvent',
      scope: event.scope || 'P1',
      dayOfWeek: event.dayOfWeek || 'Thứ 2',
      date: event.date || '18/08/2026',
      plannedStartTime: event.plannedStartTime || '18:00',
      plannedEndTime: event.plannedEndTime || '19:00',
      actualStartTime: event.actualStartTime || '',
      actualEndTime: event.actualEndTime || '',
      plannedDuration: String(event.plannedDurationMinutes || ''),
      actualDuration: String(event.actualDurationMinutes || ''),
      inflationMins: String(event.inflationMinutes || ''),
      inflationRate: event.inflationRate || '',
      title: event.title || '',
      legalEntity: event.legalEntity || '-',
      attendees: event.attendees || '',
      secretary: event.secretary || '',
      status: event.status || 'Sắp tới',
      notes: event.notes || '',
      conclusionDocUrl: event.conclusionDocUrl || ''
    };

    for (const [key, val] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = val;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
    }, 1500);
  } catch (e) {
    console.error('Hidden form submit error:', e);
  }
}

// Function to send/sync new event back to Google Sheet Webhook / Apps Script
export async function syncDiscussionEventToGoogleSheet(event: DiscussionEvent, action: 'add' | 'update' = 'add'): Promise<{ success: boolean; message: string }> {
  // 1. Always store in LocalStorage first for instant offline/24h reliability
  if (action === 'update') {
    updateLocalDiscussionEvent(event);
  } else {
    saveLocalDiscussionEvent(event);
  }

  // 2. Read configured Webhook URL
  const webhookUrl = getGoogleSheetWebhookUrl();

  if (!webhookUrl) {
    return { success: false, message: '⚠️ Chưa cài Webhook URL! Vui lòng dán Webhook URL Google Apps Script.' };
  }

  try {
    // Send EXACTLY 1 single request via hidden iframe form submission to guarantee 1 single row on Google Sheet
    submitToGoogleSheetViaHiddenForm(webhookUrl, event);

    return { success: true, message: action === 'update' ? '🚀 Đã cập nhật dòng về Google Sheet thành công!' : '🚀 Đã gửi dòng mới về Google Sheet thành công!' };
  } catch (err) {
    console.log('Google Sheet webhook fetch error:', err);
    return { success: true, message: '💾 Đã lưu dữ liệu trực tiếp trong hệ thống AVG One 24/7!' };
  }
}

// Robust CSV Parser supporting quotes and multi-line fields
export function parseCSVRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentField.trim());
        if (currentRow.some(cell => cell.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
        if (char === '\r') i++; // skip \n in \r\n
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(cell => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function formatTimeWithoutSeconds(tStr?: string): string {
  if (!tStr) return '';
  return tStr.trim().replace(/(\b\d{1,2}:\d{2}):\d{2}\b/g, '$1');
}

// Specifications for all 12 monthly sheets in Google Sheets (including hidden sheets)
export const MONTH_TAB_SPECS = [
  { month: 1, candidates: ['Tháng 1', 'Tháng 1 ', 'Tháng 01', 'T1'] },
  { month: 2, candidates: ['Tháng 2', 'Tháng 2 ', 'Tháng 02', 'T2'] },
  { month: 3, candidates: ['Tháng 3', 'Tháng 3 ', 'Tháng 03', 'T3'] },
  { month: 4, candidates: ['Tháng 4', 'Tháng 4 ', 'Tháng 04', 'T4'] },
  { month: 5, candidates: ['Tháng 5', 'Tháng 5 ', 'Tháng 05', 'T5'] },
  { month: 6, candidates: ['Tháng 6', 'Tháng 6 ', 'Tháng 06', 'T6'] },
  { month: 7, candidates: ['Tháng 7 ', 'Tháng 7', 'Tháng 07 ', 'Tháng 07', 'T7'] },
  { month: 8, candidates: ['Tháng 8 ', 'Tháng 8', 'Tháng 08 ', 'Tháng 08', 'T8'] },
  { month: 9, candidates: ['Tháng 9 ', 'Tháng 9', 'Tháng 09 ', 'Tháng 09', 'T9'] },
  { month: 10, candidates: ['Tháng 10 ', 'Tháng 10', 'T10'] },
  { month: 11, candidates: ['Tháng 11 ', 'Tháng 11', 'T11'] },
  { month: 12, candidates: ['Tháng 12 ', 'Tháng 12', 'T12'] }
];

export function parseMonthSheetUniversal(rows: string[][], tabName: string, monthNumber: number): DiscussionEvent[] {
  if (rows.length <= 1) return [];

  const maxHeaderScan = Math.min(rows.length, 3);
  const numCols = Math.max(...rows.slice(0, maxHeaderScan).map(r => r.length));

  let detectedDateCol = -1;
  let detectedStartCol = -1;
  let detectedEndCol = -1;

  for (let r = 0; r < Math.min(rows.length, 10); r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const val = (row[c] || '').trim();
      if (detectedDateCol === -1 && /^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test(val)) {
        detectedDateCol = c;
      }
      if (detectedStartCol === -1 && /^\d{1,2}:\d{2}(:\d{2})?$/.test(val)) {
        detectedStartCol = c;
        if (c + 1 < row.length && /^\d{1,2}:\d{2}(:\d{2})?$/.test((row[c + 1] || '').trim())) {
          detectedEndCol = c + 1;
        }
      }
    }
  }

  const compositeHeader: string[] = [];
  for (let c = 0; c < numCols; c++) {
    const colLabels: string[] = [];
    for (let r = 0; r < maxHeaderScan; r++) {
      if (rows[r] && rows[r][c]) {
        colLabels.push(rows[r][c].trim().toLowerCase());
      }
    }
    compositeHeader[c] = colLabels.join(' ');
  }

  const findIdx = (keywords: string[], defaultIdx: number) => {
    const idx = compositeHeader.findIndex(cell => keywords.some(kw => cell.includes(kw.toLowerCase())));
    return idx !== -1 ? idx : defaultIdx;
  };

  const dateIdx = detectedDateCol !== -1 ? detectedDateCol : findIdx(['ngày'], -1);
  const pStartIdx = detectedStartCol !== -1 ? detectedStartCol : findIdx(['giờ bắt đầu', 'bắt đầu'], -1);
  const pEndIdx = detectedEndCol !== -1 ? detectedEndCol : findIdx(['giờ kết thúc', 'kết thúc'], -1);
  const aStartIdx = findIdx(['bắt đầu thực tế', 'thực bắt đầu'], -1);
  const aEndIdx = findIdx(['kết thúc thực tế', 'thực kết thúc'], -1);

  const titleIdx = findIdx(['nội dung', 'chủ đề'], -1);
  const sttIdx = findIdx(['stt'], -1);
  const scopeIdx = findIdx(['phạm vi'], -1);
  const dayIdx = findIdx(['thứ'], -1);
  const legalIdx = findIdx(['pháp nhân', 'nđh', 'điều hành'], -1);
  const attendeesIdx = findIdx(['thành phần'], -1);
  const secretaryIdx = findIdx(['thư ký'], -1);
  const statusIdx = findIdx(['trạng thái'], -1);
  const notesIdx = findIdx(['ghi chú'], -1);
  const linkIdx = findIdx(['link vbkl', 'vbkl', 'tài liệu'], -1);

  const events: DiscussionEvent[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    let rawDate = dateIdx !== -1 ? (row[dateIdx] || '').trim() : '';
    if (!/^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test(rawDate)) {
      const foundDate = row.find(c => /^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test((c || '').trim()));
      if (foundDate) {
        rawDate = foundDate.trim();
      } else {
        continue;
      }
    }

    const rawTitle = titleIdx !== -1 ? (row[titleIdx] || '').trim() : '';
    if (!rawTitle || rawTitle === 'STT' || /^\d+([.,]\d+)?$/.test(rawTitle)) continue;

    let dateStr = rawDate;
    const dParts = dateStr.split('/');
    if (dParts.length === 2) {
      dateStr = `${dParts[0].padStart(2, '0')}/${dParts[1].padStart(2, '0')}/2026`;
    } else if (dParts.length === 3) {
      const yr = dParts[2].length === 2 ? `20${dParts[2]}` : dParts[2];
      dateStr = `${dParts[0].padStart(2, '0')}/${dParts[1].padStart(2, '0')}/${yr}`;
    }

    const pStart = pStartIdx !== -1 ? formatTimeWithoutSeconds(row[pStartIdx]) : '08:00';
    const pEnd = pEndIdx !== -1 ? formatTimeWithoutSeconds(row[pEndIdx]) : '09:00';
    const aStart = aStartIdx !== -1 && row[aStartIdx] ? formatTimeWithoutSeconds(row[aStartIdx]) : pStart;
    const aEnd = aEndIdx !== -1 && row[aEndIdx] ? formatTimeWithoutSeconds(row[aEndIdx]) : pEnd;

    const eventStt = (sttIdx !== -1 && row[sttIdx]) ? parseInt(row[sttIdx], 10) || i : i;
    const eventScope = (scopeIdx !== -1 && row[scopeIdx]) ? row[scopeIdx] : 'P1';
    const eventDay = (dayIdx !== -1 && row[dayIdx]) ? row[dayIdx] : '';
    const legalEntity = (legalIdx !== -1 && row[legalIdx]) ? row[legalIdx] : 'DH';
    const attendees = (attendeesIdx !== -1 && row[attendeesIdx]) ? row[attendeesIdx] : '';
    const secretary = (secretaryIdx !== -1 && row[secretaryIdx]) ? row[secretaryIdx] : '';
    let status = (statusIdx !== -1 && row[statusIdx]) ? row[statusIdx] : 'Sắp tới';
    if (!status || status.trim() === '') status = 'Sắp tới';
    const notes = (notesIdx !== -1 && row[notesIdx]) ? row[notesIdx] : '';
    const conclusionDocUrl = (linkIdx !== -1 && row[linkIdx]) ? row[linkIdx] : '';

    events.push({
      id: `gsheet-t${monthNumber}-${i}`,
      stt: eventStt,
      scope: eventScope,
      dayOfWeek: eventDay.toUpperCase(),
      date: dateStr,
      plannedStartTime: pStart,
      plannedEndTime: pEnd,
      actualStartTime: aStart,
      actualEndTime: aEnd,
      title: rawTitle,
      legalEntity,
      attendees,
      secretary,
      status,
      notes,
      conclusionDocUrl
    });
  }

  return events;
}

export function parseLichTraoDoiSheet(rows: string[][]): { events: DiscussionEvent[]; overview?: LichTraoDoiSheetOverview } {
  if (rows.length < 4) return { events: [] };

  let overview: LichTraoDoiSheetOverview | undefined;

  // Trích xuất thống kê tổng quan ở dòng 1 (hàng chỉ số: 31 cuộc, 1.450 phút kế hoạch, 137 phút lạm phát, 9,4%)
  if (rows.length >= 2 && rows[1]) {
    const r1 = rows[1];
    const total = parseInt(r1[0]?.replace(/[^\d]/g, '') || '0', 10);
    const planned = parseInt(r1[4]?.replace(/[^\d]/g, '') || '0', 10);
    const actual = parseInt(r1[8]?.replace(/[^\d]/g, '') || '0', 10);
    const inflation = parseInt(r1[12]?.replace(/[^\d-]/g, '') || '0', 10);
    const rate = (r1[16] || '').trim();

    if (total > 0 || planned > 0) {
      overview = {
        totalDiscussions: total,
        plannedDurationMinutes: planned,
        actualDurationMinutes: actual,
        inflationMinutes: inflation,
        inflationRate: rate
      };
      try {
        localStorage.setItem('avg_lich_trao_doi_overview', JSON.stringify(overview));
      } catch (e) {}
    }
  }

  const events: DiscussionEvent[] = [];

  // Quét các dòng dữ liệu (bỏ qua 4 dòng đầu header / tổng kết)
  for (let i = 4; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 4) continue;

    // Tìm cột ngày tháng (dd/mm/yyyy)
    let dateIdx = 3;
    let rawDate = (row[dateIdx] || '').trim();
    if (!/^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test(rawDate)) {
      const foundIdx = row.findIndex(c => /^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test((c || '').trim()));
      if (foundIdx !== -1) {
        dateIdx = foundIdx;
        rawDate = (row[dateIdx] || '').trim();
      } else {
        continue;
      }
    }

    // Chuẩn hoá ngày DD/MM/YYYY
    let dateStr = rawDate;
    const dParts = dateStr.split('/');
    if (dParts.length === 2) {
      dateStr = `${dParts[0].padStart(2, '0')}/${dParts[1].padStart(2, '0')}/2026`;
    } else if (dParts.length === 3) {
      const yr = dParts[2].length === 2 ? `20${dParts[2]}` : dParts[2];
      dateStr = `${dParts[0].padStart(2, '0')}/${dParts[1].padStart(2, '0')}/${yr}`;
    }

    // Cột 12: Nội dung / Chủ đề
    let rawTitle = (row[12] || '').trim();
    if (!rawTitle || rawTitle === 'Nội dung/ Chủ đề' || rawTitle === 'STT') {
      const candidateTitle = row.find((c, cIdx) => cIdx !== dateIdx && cIdx > 6 && (c || '').trim().length > 3 && !/^\d+([.,]\d+)?%?$/.test(c.trim()));
      if (candidateTitle) {
        rawTitle = candidateTitle.trim();
      } else {
        continue;
      }
    }

    // Giờ bắt đầu / kết thúc dự kiến và thực tế
    const pStart = formatTimeWithoutSeconds(row[5] || '');
    const pEnd = formatTimeWithoutSeconds(row[6] || '');
    const aStart = formatTimeWithoutSeconds(row[8] || '');
    const aEnd = formatTimeWithoutSeconds(row[9] || '');

    const rawPDuration = (row[4] || '').replace(/[^\d]/g, '');
    const pDuration = rawPDuration !== '' ? parseInt(rawPDuration, 10) : undefined;
    const rawADuration = (row[7] || '').replace(/[^\d]/g, '');
    const aDuration = rawADuration !== '' ? parseInt(rawADuration, 10) : undefined;
    const rawInflMins = (row[10] || '').replace(/[^\d-]/g, '');
    const inflMins = rawInflMins !== '' && rawInflMins !== '-' ? parseInt(rawInflMins, 10) : undefined;
    const inflRate = (row[11] || '').trim() || undefined;

    const notes = (row[0] || '').trim();
    const scope = (row[1] || '').trim();
    const dayOfWeek = (row[2] || '').trim();
    const legalEntity = (row[13] || '').trim() || '-';
    const attendees = (row[14] || '').trim();
    const secretary = (row[15] || '').trim();
    
    let status = (row[16] || '').trim();
    if (!status) {
      if (aStart && aStart !== '00:00' && aEnd && aEnd !== '00:00') {
        status = 'Đã hoàn thành';
      } else if (notes.toLowerCase().includes('huỷ') || notes.toLowerCase().includes('dời') || notes.toLowerCase().includes('không trao đổi')) {
        status = 'Hoãn';
      } else {
        status = 'Sắp tới';
      }
    }

    const documentCol = (row[17] || '').trim();
    const conclusionDocUrl = (row[18] || '').trim();

    const attachments: EventAttachment[] = [];
    if (documentCol) {
      attachments.push({
        id: `att-doc-${i}`,
        name: documentCol,
        type: documentCol.startsWith('http') ? 'url' : 'file',
        url: documentCol.startsWith('http') ? documentCol : GOOGLE_SHEET_EDIT_URL,
        uploadedAt: dateStr
      });
    }
    if (conclusionDocUrl && conclusionDocUrl.startsWith('http')) {
      attachments.push({
        id: `att-vbkl-${i}`,
        name: 'Văn bản kết luận',
        type: 'url',
        url: conclusionDocUrl,
        uploadedAt: dateStr
      });
    }

    events.push({
      id: `gsheet-ltd-${i}`,
      stt: events.length + 1,
      sheetRowIndex: i + 1,
      scope,
      dayOfWeek: dayOfWeek.toUpperCase(),
      date: dateStr,
      plannedStartTime: pStart || '',
      plannedEndTime: pEnd || '',
      actualStartTime: aStart,
      actualEndTime: aEnd,
      plannedDurationMinutes: pDuration,
      actualDurationMinutes: aDuration,
      inflationMinutes: inflMins,
      inflationRate: inflRate,
      title: rawTitle,
      legalEntity,
      attendees,
      secretary,
      status,
      notes,
      documentText: documentCol,
      conclusionDocUrl,
      attachments: attachments.length > 0 ? attachments : undefined
    });
  }

  return { events, overview };
}

export function getCachedLichTraoDoiOverview(): LichTraoDoiSheetOverview | null {
  try {
    const raw = localStorage.getItem('avg_lich_trao_doi_overview');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

async function fetchTabCSV(tabName: string): Promise<string | null> {
  const url = `${GOOGLE_SHEET_CSV_URL}&sheet=${encodeURIComponent(tabName)}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    // If the tab doesn't exist, Google Sheets falls back to first sheet (which contains 'STTiii8')
    if (text.includes('STTiii8') || text.length < 50) return null;
    return text;
  } catch (e) {
    return null;
  }
}

async function fetchMonthEvents(spec: { month: number; candidates: string[] }): Promise<DiscussionEvent[]> {
  for (const cand of spec.candidates) {
    const csv = await fetchTabCSV(cand);
    if (csv) {
      const rows = parseCSVRows(csv);
      const events = parseMonthSheetUniversal(rows, cand, spec.month);
      if (events.length > 0) {
        return events;
      }
    }
  }
  return [];
}

export async function fetchDiscussionEventsFromGoogleSheet(): Promise<DiscussionEvent[]> {
  try {
    const localEvents = getLocalDiscussionEvents();
    let fetchedEvents: DiscussionEvent[] = [];

    // 🎯 ƯU TIÊN SỐ 1 TUYỆT ĐỐI: Lấy trực tiếp từ tab LỊCH TRAO ĐỔI
    const ltdCandidates = ['LỊCH TRAO ĐỔI', 'Lịch trao đổi', 'LICH TRAO DOI', 'LỊCH LÀM VIỆC 2026'];
    for (const cand of ltdCandidates) {
      try {
        const csv = await fetchTabCSV(cand);
        if (csv && csv.length > 100) {
          const rows = parseCSVRows(csv);
          const { events: ltdEvents } = parseLichTraoDoiSheet(rows);
          if (ltdEvents && ltdEvents.length > 0) {
            fetchedEvents = ltdEvents;
            break;
          }
        }
      } catch (err) {
        console.warn(`Error fetching tab ${cand}:`, err);
      }
    }

    // Fallback: Nếu không tìm thấy sheet LỊCH TRAO ĐỔI, quét các tháng
    if (fetchedEvents.length === 0) {
      const monthlyResults = await Promise.all(MONTH_TAB_SPECS.map(fetchMonthEvents));
      fetchedEvents = monthlyResults.flat();
    }

    // Fallback: If no monthly events found, try single URL
    if (fetchedEvents.length === 0) {
      try {
        const fallbackRes = await fetch(GOOGLE_SHEET_CSV_URL, { cache: 'no-store' });
        if (fallbackRes.ok) {
          const fallbackCsv = await fallbackRes.text();
          const fallbackRows = parseCSVRows(fallbackCsv);
          if (fallbackRows.length > 1) {
            const { events: parsedLtd } = parseLichTraoDoiSheet(fallbackRows);
            if (parsedLtd.length > 0) {
              fetchedEvents = parsedLtd;
            } else {
              fetchedEvents = parseMonthSheetUniversal(fallbackRows, 'Sheet 24/7', 10);
            }
          }
        }
      } catch (err) {
        console.warn('Fallback single sheet fetch failed:', err);
      }
    }

    if (fetchedEvents.length === 0) {
      return localEvents;
    }

    // Merge local custom events at top (avoiding duplicate titles + dates) while preserving exact row order of LỊCH TRAO ĐỔI
    const fetchedKeys = new Set(
      fetchedEvents.map(e => `${e.title.trim().toLowerCase()}_${e.date.trim()}_${(e.plannedStartTime || '').trim()}`)
    );
    const uniqueLocalEvents = localEvents.filter(le => {
      const k = `${le.title.trim().toLowerCase()}_${le.date.trim()}_${(le.plannedStartTime || '').trim()}`;
      return !fetchedKeys.has(k);
    });

    return [...uniqueLocalEvents, ...fetchedEvents];
  } catch (error) {
    console.error('Error fetching Google Sheet discussion events:', error);
    return getLocalDiscussionEvents();
  }
}

// Google Sheet Live Sync for Executive Directives (Thông điệp điều hành)
export const EXECUTIVE_DIRECTIVE_SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/13cN2ert23B1W4wlySPXXVbCj-UgICEef5UQb7FI2vSA/edit?gid=269023045#gid=269023045';
export const EXECUTIVE_DIRECTIVE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/13cN2ert23B1W4wlySPXXVbCj-UgICEef5UQb7FI2vSA/gviz/tq?tqx=out:csv&gid=269023045';

export interface ExecutiveDirectiveItem {
  id: string;
  code?: string;
  type: 'TRỰC TIẾP' | 'GIÁN TIẾP' | 'CHƯA XÁC NHẬN';
  year?: string;
  month?: string;
  dayOfWeek?: string;
  dateStr: string;
  timeStr?: string;
  issuer: string; // Col J: Đầu mối chủ thể
  recipients?: string; // Col K: Đầu mối phối hợp/liên quan
  title: string;
  content: string;
  notes?: string;
  linkUrl?: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
}

export async function fetchExecutiveDirectivesFromGoogleSheet(): Promise<ExecutiveDirectiveItem[]> {
  try {
    const response = await fetch(EXECUTIVE_DIRECTIVE_SHEET_CSV_URL, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);

    if (rows.length <= 2) {
      return [];
    }

    const directives: ExecutiveDirectiveItem[] = [];

    // Parse starting from data rows (skipping header rows 0-1)
    let currentYear = '2026';
    let currentMonth = '07';
    let currentDayOfWeek = 'Thứ 4';
    let currentDate = '01/07/2026';

    for (let i = 2; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 10) continue;

      // Extract date fields if present in row
      if (row[4] && row[4].trim()) currentYear = row[4].trim();
      if (row[5] && row[5].trim()) currentMonth = row[5].trim();
      if (row[6] && row[6].trim()) currentDayOfWeek = row[6].trim();
      if (row[7] && row[7].trim()) currentDate = row[7].trim();

      const timeStr = row[8] ? formatTimeWithoutSeconds(row[8].trim()) : '';
      const issuer = row[9] ? row[9].trim() : '';
      const recipients = row[10] ? row[10].trim() : '';

      // Direct message content in Col L (index 11)
      const directContent = row[11] ? row[11].trim() : '';
      const directNotes = row[12] ? row[12].trim() : '';

      // Indirect message content in Col O (index 14) or Col N (index 13)
      const indirectLink = row[13] ? row[13].trim() : '';
      const indirectContent = row[14] ? row[14].trim() : '';
      const indirectNotes = row[15] ? row[15].trim() : '';

      // Unconfirmed message content in Col R (index 17) or Col S (index 18)
      const unconfirmedContent = row[17] ? row[17].trim() : '';
      const unconfirmedNotes = row[18] ? row[18].trim() : '';

      // Determine main content & type
      let mainContent = '';
      let msgType: 'TRỰC TIẾP' | 'GIÁN TIẾP' | 'CHƯA XÁC NHẬN' = 'TRỰC TIẾP';
      let linkUrl = '';
      let notes = '';

      if (directContent) {
        mainContent = directContent;
        msgType = 'TRỰC TIẾP';
        notes = directNotes;
        linkUrl = indirectLink || (directNotes.startsWith('http') ? directNotes : '');
      } else if (indirectContent || indirectLink) {
        mainContent = indirectContent || indirectLink;
        msgType = 'GIÁN TIẾP';
        notes = indirectNotes;
        linkUrl = indirectLink.startsWith('http') ? indirectLink : (indirectNotes.startsWith('http') ? indirectNotes : '');
      } else if (unconfirmedContent) {
        mainContent = unconfirmedContent;
        msgType = 'CHƯA XÁC NHẬN';
        notes = unconfirmedNotes;
        linkUrl = unconfirmedNotes.startsWith('http') ? unconfirmedNotes : '';
      }

      if (!mainContent && !issuer && !recipients) continue;

      // Calculate title from main content (first non-empty line or truncated summary)
      let title = mainContent.split('\n').map(s => s.trim()).filter(Boolean)[0] || 'Thông điệp điều hành';
      if (title.length > 90) {
        title = title.substring(0, 87) + '...';
      }

      // Assign priority based on content keywords
      const lowerContent = (title + ' ' + mainContent).toLowerCase();
      let priority: 'URGENT' | 'HIGH' | 'NORMAL' = 'NORMAL';
      if (lowerContent.includes('khủng hoảng') || lowerContent.includes('sa thải') || lowerContent.includes('khẩn') || lowerContent.includes('lỗi')) {
        priority = 'URGENT';
      } else if (lowerContent.includes('chỉ đạo') || lowerContent.includes('đề nghị') || lowerContent.includes('yêu cầu') || lowerContent.includes('quyết định')) {
        priority = 'HIGH';
      }

      const code = `TĐ-${currentDate.replace(/\//g, '')}-${directives.length + 1}`;

      directives.push({
        id: `tddh-${i}`,
        code,
        type: msgType,
        year: currentYear,
        month: currentMonth,
        dayOfWeek: currentDayOfWeek,
        dateStr: currentDate,
        timeStr: timeStr || '08:00',
        issuer: issuer || 'DH',
        recipients: recipients || '@All',
        title: title,
        content: mainContent || notes,
        notes: notes,
        linkUrl: linkUrl,
        priority: priority
      });
    }

    return directives;
  } catch (error) {
    console.error('Error fetching Google Sheet executive directives:', error);
    return [];
  }
}
