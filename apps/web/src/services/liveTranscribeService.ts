/**
 * AVG One Live Speech-to-Text & Transcribe Service (Phase 1 PoC)
 * Supports:
 * - Native Browser Speech Recognition (vi-VN) with real-time interim results
 * - WebSocket Streaming Gateway integration for collaborative live transcripts
 * - Domain Keyword Normalizer for AVG enterprise terms (B5.1, #K2T, 2.1, AV, AVG, VBKL...)
 * - Web Audio API Volume Meter for live Waveform visualizer
 */

export interface TranscriptItem {
  id: string;
  speaker: string;
  speakerRole?: string;
  text: string;
  isFinal: boolean;
  timestamp: string;
  isFlagged?: boolean;
  notes?: string;
}

export type TranscribeStatus = 'idle' | 'recording' | 'paused' | 'error';

// Custom Dictionary for Domain Keyword Boosting in AVG One
const AVG_KEYWORD_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Personnel & Code names
  { pattern: /\b(bê\s*5\s*chấm\s*1|b5\.1|b\s*năm\s*chấm\s*một)\b/gi, replacement: 'B5.1' },
  { pattern: /\b(5\.1\s*t|năm\s*chấm\s*một\s*tê)\b/gi, replacement: '5.1T' },
  { pattern: /\b(2\.1|hai\s*chấm\s*một)\b/gi, replacement: '2.1' },
  { pattern: /\b(3\.1|ba\s*chấm\s*một)\b/gi, replacement: '3.1 - RDI' },
  { pattern: /\b(ca\s*2\s*tê|k2t|k\s*hai\s*tê)\b/gi, replacement: '#K2T' },
  { pattern: /\b(ca\s*1|k1|k\s*một)\b/gi, replacement: '#K1' },
  { pattern: /\b(ca\s*2\s*bê|k2b|k\s*hai\s*bê)\b/gi, replacement: '#K2B' },
  { pattern: /\b(bà\s*bích|chị\s*bích)\b/gi, replacement: 'bà Bích' },
  { pattern: /\b(bà\s*trang|chị\s*trang)\b/gi, replacement: 'bà Trang' },
  { pattern: /\b(ông\s*trịnh|anh\s*trịnh)\b/gi, replacement: 'ông Trịnh' },

  // Entity & Systems
  { pattern: /\b(a\s*vê\s*gờ|ây\s*vi\s*gi|avg\s*one)\b/gi, replacement: 'AVG One' },
  { pattern: /\b(a\s*vê|ây\s*vi)\b/gi, replacement: 'AV' },
  { pattern: /\b(đoàn\s*huy|pháp\s*nhân\s*dh|d\s*hát)\b/gi, replacement: 'DH' },
  { pattern: /\b(vê\s*bê\s*ca\s*lờ|vbkl)\b/gi, replacement: 'VBKL' },
  { pattern: /\b(văn\s*bản\s*kết\s*luận)\b/gi, replacement: 'Văn bản kết luận (VBKL)' },
  { pattern: /\b(lệnh\s*sản\s*xuất)\b/gi, replacement: 'Lệnh sản xuất' },
  { pattern: /\b(quản\s*lý\s*thuế)\b/gi, replacement: 'Quản lý thuế' },
  { pattern: /\b(xuất\s*kho)\b/gi, replacement: 'Xuất kho' },
  { pattern: /\b(đăng\s*ký\s*bản\s*quyền|sở\s*hữu\s*trí\s*tuệ|shtt)\b/gi, replacement: 'Đăng ký SHTT' },
  { pattern: /\b(mẫu\s*h\s*1|mẫu\s*h1)\b/gi, replacement: 'mẫu H1' },
  { pattern: /\b(mẫu\s*h\s*2|mẫu\s*h2)\b/gi, replacement: 'mẫu H2' }
];

export function normalizeAvgText(text: string): string {
  let normalized = text;
  for (const rule of AVG_KEYWORD_RULES) {
    normalized = normalized.replace(rule.pattern, rule.replacement);
  }
  return normalized;
}

/**
 * Chia nhỏ văn bản thành các phân đoạn/câu ngắn gọn (10-14 từ)
 * giúp người dùng dễ theo dõi trực tiếp và nắm bắt ý nhanh chóng.
 */
export function splitIntoCleanSegments(text: string, maxWordsPerSegment: number = 14): string[] {
  if (!text || !text.trim()) return [];
  const clean = text.trim().replace(/\s+/g, ' ');

  // 1. Tách theo dấu ngắt câu chuẩn (. ? ! ; hoặc xuống dòng)
  const rawSentences = clean
    .split(/(?<=[.?!;\n])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  const finalSegments: string[] = [];

  for (const sentence of rawSentences) {
    const words = sentence.split(' ').filter(Boolean);
    if (words.length <= maxWordsPerSegment) {
      finalSegments.push(formatSegment(sentence));
      continue;
    }

    // 2. Chia nhỏ câu quá dài tại điểm ngắt nghỉ tự nhiên
    let currentChunk: string[] = [];
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      currentChunk.push(w);

      const hasComma = w.endsWith(',');
      const isConjunction = /^(và|nhưng|tuy\s*nhiên|đồng\s*thời|do\s*đó|vì\s*vậy|ngoài\s*ra|tiếp\s*theo|để|thì|sau\s*đó)$/i.test(w);

      if (
        (currentChunk.length >= 8 && (hasComma || isConjunction)) ||
        currentChunk.length >= maxWordsPerSegment
      ) {
        let chunkStr = currentChunk.join(' ').trim().replace(/,\s*$/, '');
        if (chunkStr) {
          finalSegments.push(formatSegment(chunkStr));
        }
        currentChunk = [];
      }
    }

    if (currentChunk.length > 0) {
      const rem = currentChunk.join(' ').trim();
      if (rem) {
        finalSegments.push(formatSegment(rem));
      }
    }
  }

  return finalSegments.length > 0 ? finalSegments : [formatSegment(clean)];
}

function formatSegment(s: string): string {
  if (!s) return '';
  const trimmed = s.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export class LiveTranscribeController {
  private recognition: any = null;
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  public status: TranscribeStatus = 'idle';
  public meetingId: string = 'general-meeting';
  public currentSpeaker: string = '2.1';
  public currentRole: string = 'Thư ký cuộc họp';

  // Callbacks
  public onInterim: (text: string) => void = () => {};
  public onFinal: (entry: TranscriptItem) => void = () => {};
  public onStatusChange: (status: TranscribeStatus) => void = () => {};
  public onAudioLevel: (level: number) => void = () => {};
  public onError: (errorMsg: string) => void = () => {};

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'vi-VN';
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            interimTranscript += transcriptChunk;
          }
        }

        if (interimTranscript.trim()) {
          const normalizedInterim = normalizeAvgText(interimTranscript);
          this.onInterim(normalizedInterim);
          this.sendWsInterim(normalizedInterim);
        }

        if (finalTranscript.trim()) {
          const normalizedFinal = normalizeAvgText(finalTranscript);
          const segments = splitIntoCleanSegments(normalizedFinal);

          segments.forEach((seg, idx) => {
            const entry: TranscriptItem = {
              id: `tr-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
              speaker: this.currentSpeaker,
              speakerRole: this.currentRole,
              text: seg,
              isFinal: true,
              timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false })
            };

            this.onFinal(entry);
            this.sendWsFinal(entry);
          });

          this.onInterim(''); // Clear interim
        }
      };

      this.recognition.onerror = (event: any) => {
        // Ignore aborted error when stopping intentionally
        if (event.error === 'aborted') return;
        console.warn('🎙️ SpeechRecognition warning:', event.error);
        if (event.error === 'not-allowed') {
          this.onError('Trình duyệt chưa được cấp quyền truy cập Microphone. Vui lòng bật quyền mic.');
          this.setStatus('error');
        }
      };

      this.recognition.onend = () => {
        // Auto-restart if we are still in recording mode (browser stops recognition on pauses)
        if (this.status === 'recording') {
          try {
            this.recognition.start();
          } catch (e) {
            // Already started or restarting
          }
        }
      };
    }
  }

  public connectWebSocket(meetingId: string) {
    this.meetingId = meetingId;
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.hostname;
      // In dev mode, API server runs on port 5000
      const wsUrl = `${protocol}//${host}:5000/api/ws/transcribe`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('🎙️ [LiveTranscribe] Connected to WebSocket Gateway at', wsUrl);
        this.ws?.send(JSON.stringify({
          type: 'JOIN_MEETING',
          meetingId: this.meetingId,
          speaker: this.currentSpeaker,
          speakerRole: this.currentRole
        }));
      };

      this.ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (data.type === 'TRANSCRIPT_FINAL' && data.entry) {
            // Incoming broadcast from another client in the same meeting
            if (data.entry.speaker !== this.currentSpeaker) {
              this.onFinal(data.entry);
            }
          }
        } catch (e) {
          // Non-json message
        }
      };

      this.ws.onerror = () => {
        console.log('🎙️ [LiveTranscribe] WebSocket gateway offline (running in Standalone Browser Engine Mode)');
      };
    } catch (err) {
      console.warn('🎙️ [LiveTranscribe] WebSocket init skipped:', err);
    }
  }

  private sendWsInterim(text: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'TRANSCRIPT_INTERIM',
        meetingId: this.meetingId,
        speaker: this.currentSpeaker,
        text
      }));
    }
  }

  private sendWsFinal(entry: TranscriptItem) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'TRANSCRIPT_FINAL',
        meetingId: this.meetingId,
        ...entry
      }));
    }
  }

  public async start(meetingId: string, speaker: string, role: string) {
    this.meetingId = meetingId;
    this.currentSpeaker = speaker;
    this.currentRole = role;

    this.connectWebSocket(meetingId);

    // 1. Start audio visualizer (Web Audio API)
    await this.startAudioMeter();

    // 2. Start Speech Recognition
    if (this.recognition) {
      try {
        this.recognition.start();
        this.setStatus('recording');
      } catch (err: any) {
        if (err.name !== 'InvalidStateError') {
          console.error('Error starting recognition:', err);
          this.onError('Không thể khởi động bộ nhận diện giọng nói: ' + err.message);
          this.setStatus('error');
          return;
        }
        this.setStatus('recording');
      }
    } else {
      this.onError('Trình duyệt hiện tại không hỗ trợ Web Speech API. Vui lòng sử dụng Google Chrome hoặc Microsoft Edge.');
      this.setStatus('error');
    }
  }

  public pause() {
    if (this.status === 'recording') {
      this.setStatus('paused');
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }
    }
  }

  public resume() {
    if (this.status === 'paused') {
      this.setStatus('recording');
      if (this.recognition) {
        try {
          this.recognition.start();
        } catch (e) {}
      }
    }
  }

  public stop() {
    this.setStatus('idle');
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.stopAudioMeter();
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {}
      this.ws = null;
    }
  }

  public setSpeaker(speaker: string, role?: string) {
    this.currentSpeaker = speaker;
    if (role) this.currentRole = role;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'CHANGE_SPEAKER',
        speaker: this.currentSpeaker,
        speakerRole: this.currentRole
      }));
    }
  }

  private setStatus(newStatus: TranscribeStatus) {
    this.status = newStatus;
    this.onStatusChange(newStatus);
  }

  private async startAudioMeter() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateMeter = () => {
        if (!this.analyser || this.status !== 'recording') {
          this.onAudioLevel(0);
          this.animFrameId = requestAnimationFrame(updateMeter);
          return;
        }

        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalizedVolume = Math.min(100, Math.round((average / 128) * 100));
        this.onAudioLevel(normalizedVolume);

        this.animFrameId = requestAnimationFrame(updateMeter);
      };

      updateMeter();
    } catch (err) {
      console.warn('🎙️ Audio meter microphone access error:', err);
    }
  }

  private stopAudioMeter() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (e) {}
      this.audioContext = null;
    }
    this.analyser = null;
    this.onAudioLevel(0);
  }
}
