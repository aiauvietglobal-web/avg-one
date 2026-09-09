/**
 * AVG One Live Speech-to-Text & Transcribe Service (Upgraded Engine)
 * 
 * Tính năng nâng cấp:
 * 1. Chuyển đổi khẩu lệnh dấu câu thực tế ("dấu chấm", "dấu phẩy", "xuống dòng", "dấu hỏi", "hai chấm", "ba chấm")
 * 2. Tự động chấm câu, ngắt câu, đặt dấu hỏi theo ngữ điệu & từ nghi vấn tiếng Việt ở thời gian thực
 * 3. Cơ chế dự phòng dấu 3 chấm (...) khi phát hiện âm thanh nói vào mic nhưng chưa kịp nhận diện (không đoán từ)
 * 4. Phát hiện ngắt nghỉ hơi theo thời gian thực (Silence Pause Detector) để chốt câu tức thì
 * 5. Bộ giám sát luồng liên tục (Continuous Watchdog) tự động phục hồi ngay lập tức, không để bị ngắt quãng
 * 6. Nắn chỉnh từ ngữ doanh nghiệp AVG One (Keyword Boosting)
 */

import {
  processRealtimeSpeechPunctuation,
  splitIntoReadableSpeechSegments,
  stitchSpeechWithEllipsis
} from './speechPunctuationEngine';

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
  { pattern: /\b(5\.1\s*t|5\.1t|năm\s*chấm\s*một\s*tê)\b/gi, replacement: '5.1T' },
  { pattern: /\b(2\.1|hai\s*chấm\s*một)\b/gi, replacement: '2.1' },
  { pattern: /\b(3\.1|ba\s*chấm\s*một)\b/gi, replacement: '3.1 - RDI' },
  { pattern: /\b(rê\s*đê\s*i|r\s*d\s*i)\b/gi, replacement: 'RDI' },
  { pattern: /\b(ca\s*2\s*tê|k2t|k\s*hai\s*tê|k\s*2\s*t)\b/gi, replacement: '#K2T' },
  { pattern: /\b(ca\s*1|k1|k\s*một)\b/gi, replacement: '#K1' },
  { pattern: /\b(ca\s*2\s*bê|k2b|k\s*hai\s*bê|k\s*2\s*b)\b/gi, replacement: '#K2B' },
  { pattern: /\b(áp\s*1|áp\s*một|ác\s*1|ác\s*một)\b/gi, replacement: 'AC1' },
  { pattern: /\b(áp\s*2|áp\s*hai|ác\s*2|ác\s*hai)\b/gi, replacement: 'AC2' },
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
  { pattern: /\b(nhập\s*kho)\b/gi, replacement: 'Nhập kho' },
  { pattern: /\b(hợp\s*đồng\s*kinh\s*tế)\b/gi, replacement: 'Hợp đồng kinh tế' },
  { pattern: /\b(biên\s*bản\s*nghiệm\s*thu)\b/gi, replacement: 'Biên bản nghiệm thu' },
  { pattern: /\b(báo\s*cáo\s*tài\s*chính)\b/gi, replacement: 'Báo cáo tài chính' },
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

export class LiveTranscribeController {
  private recognition: any = null;
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  // Watchdog & Timing Control
  private watchdogTimer: any = null;
  private silenceTimer: any = null;
  private lastAudioEnergyTime: number = 0;
  private lastTextEmissionTime: number = 0;
  private pendingAudioGap: boolean = false;
  private lastInterimChunk: string = '';
  private restartRetries: number = 0;

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
    this.startWatchdog();
  }

  private initSpeechRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'vi-VN';
      this.recognition.maxAlternatives = 3;

      // 0. Nạp danh mục ngữ pháp JSGF ưu tiên từ vựng điều hành AVG One
      const SpeechGrammarListObj = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;
      if (SpeechGrammarListObj) {
        try {
          const grammarList = new SpeechGrammarListObj();
          const grammar = `#JSGF V1.0; grammar avgTerms; public <term> = AVG | AV | DH | B5.1 | 5.1T | 2.1 | 3.1 | RDI | VBKL | AC1 | AC2 | #K1 | #K2T | #K2B | lệnh sản xuất | xuất kho | nhập kho | hợp đồng kinh tế | biên bản nghiệm thu | báo cáo tài chính | quản lý thuế | mẫu H1 | mẫu H2 | đăng ký SHTT | bà Bích | bà Trang | ông Trịnh | deadline | check mail | feedback | OKR | KPI | PO | VAT ;`;
          grammarList.addFromString(grammar, 1.0);
          this.recognition.grammars = grammarList;
        } catch (e) {}
      }

      this.recognition.onstart = () => {
        this.restartRetries = 0;
        this.lastTextEmissionTime = Date.now();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        this.lastTextEmissionTime = Date.now();

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (!res) continue;

          // Chọn candidate tối ưu nhất trong các alternatives (ưu tiên từ vựng AVG One)
          let bestChunk = res[0]?.transcript || '';
          if (res.length > 1) {
            for (let a = 1; a < res.length; a++) {
              const altText = res[a]?.transcript || '';
              if (/B5\.1|5\.1T|#K2T|#K1|#K2B|AC1|AC2|2\.1|3\.1|DH|AV|AVG|VBKL|lệnh sản xuất|quản lý thuế|xuất kho|nhập kho|nghiệm thu/i.test(altText)) {
                bestChunk = altText;
                break;
              }
            }
          }

          if (res.isFinal) {
            finalTranscript += bestChunk;
          } else {
            interimTranscript += bestChunk;
          }
        }

        // 1. Xử lý kết quả tạm thời (Interim)
        if (interimTranscript.trim()) {
          this.lastInterimChunk = interimTranscript.trim();
          let processedInterim = normalizeAvgText(interimTranscript);
          processedInterim = processRealtimeSpeechPunctuation(processedInterim, false);

          // Nếu trước đó có khoảng khuyết âm thanh chưa kịp nghe, đệm ...
          if (this.pendingAudioGap) {
            processedInterim = '... ' + processedInterim;
          }

          this.onInterim(processedInterim);
          this.sendWsInterim(processedInterim);

          // Hẹn giờ phát hiện ngắt nghỉ hơi (Silence Pause Detector):
          // Nếu người nói dừng hơi > 850ms mà trình duyệt chưa chốt final -> tự động chốt câu
          if (this.silenceTimer) clearTimeout(this.silenceTimer);
          this.silenceTimer = setTimeout(() => {
            if (this.status === 'recording' && this.lastInterimChunk.trim()) {
              this.commitSegmentDirectly(this.lastInterimChunk);
              this.lastInterimChunk = '';
              this.onInterim('');
            }
          }, 850);
        }

        // 2. Xử lý kết quả chính thức (Final)
        if (finalTranscript.trim()) {
          if (this.silenceTimer) clearTimeout(this.silenceTimer);
          this.commitSegmentDirectly(finalTranscript);
          this.lastInterimChunk = '';
          this.onInterim(''); // Clear interim
        }
      };

      this.recognition.onerror = (event: any) => {
        if (event.error === 'aborted') return;
        console.warn('🎙️ SpeechRecognition notice:', event.error);

        if (event.error === 'not-allowed') {
          this.onError('Trình duyệt chưa được cấp quyền truy cập Microphone. Vui lòng bật quyền mic.');
          this.setStatus('error');
        } else if (this.status === 'recording') {
          // Lỗi tạm thời -> tự động kết nối lại liền mạch
          this.restartRecognitionWithBackoff();
        }
      };

      this.recognition.onend = () => {
        // Tự động chốt phần interim còn sót nếu engine bị ngắt đột ngột
        if (this.lastInterimChunk.trim()) {
          this.commitSegmentDirectly(this.lastInterimChunk);
          this.lastInterimChunk = '';
          this.onInterim('');
        }

        // Tự động duy trì luồng thu âm liên tục không để bị ngắt quãng
        if (this.status === 'recording') {
          this.restartRecognitionWithBackoff();
        }
      };
    }
  }

  /**
   * Chốt một đoạn phát biểu:
   * - Nối dấu 3 chấm nếu phát hiện có khoảng hẫng âm thanh không kịp nghe
   * - Chuẩn hóa từ vựng doanh nghiệp AVG One
   * - Chuyển đổi khẩu lệnh dấu câu thực tế và tự động chấm câu
   * - Chia nhỏ thành các phân đoạn ngắn gọn 8-14 từ dễ theo dõi
   */
  private commitSegmentDirectly(rawChunk: string) {
    let text = rawChunk.trim();
    if (!text) return;

    // Nếu trước đó có khoảng khuyết âm thanh chưa kịp nghe, đệm ... để nối tiếp
    if (this.pendingAudioGap) {
      text = '... ' + text;
      this.pendingAudioGap = false;
    }

    // 1. Nắn từ khóa doanh nghiệp AVG
    let processed = normalizeAvgText(text);

    // 2. Chuyển đổi dấu câu khẩu lệnh & tự động gắn dấu câu/dấu hỏi
    processed = processRealtimeSpeechPunctuation(processed, true);

    // 3. Chia nhỏ thành các câu/mệnh đề ngắn gọn
    const segments = splitIntoReadableSpeechSegments(processed, 13);

    segments.forEach((seg, idx) => {
      if (!seg.trim()) return;
      const entry: TranscriptItem = {
        id: `tr-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        speaker: this.currentSpeaker,
        speakerRole: this.currentRole,
        text: seg.trim(),
        isFinal: true,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false })
      };

      this.onFinal(entry);
      this.sendWsFinal(entry);
    });
  }

  /**
   * Khởi động lại engine với thuật toán backoff, đảm bảo tính liên tục 100%
   */
  private restartRecognitionWithBackoff() {
    if (!this.recognition || this.status !== 'recording') return;

    const delay = Math.min(1000, 80 + this.restartRetries * 120);
    this.restartRetries++;

    setTimeout(() => {
      if (this.status === 'recording') {
        try {
          this.recognition.start();
        } catch (err: any) {
          if (err.name !== 'InvalidStateError') {
            // Tiếp tục thử lại nếu chưa thành công
            this.restartRecognitionWithBackoff();
          }
        }
      }
    }, delay);
  }

  /**
   * Bộ giám sát nhịp tim (Heartbeat Watchdog):
   * Đảm bảo luồng không bao giờ bị tắt khi đang trong trạng thái 'recording'
   */
  private startWatchdog() {
    if (this.watchdogTimer) clearInterval(this.watchdogTimer);
    this.watchdogTimer = setInterval(() => {
      if (this.status === 'recording' && this.recognition) {
        try {
          this.recognition.start();
        } catch (e) {
          // Normal state: already running
        }
      }
    }, 2500);
  }

  public connectWebSocket(meetingId: string) {
    this.meetingId = meetingId;
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.hostname;
      const wsUrl = `${protocol}//${host}:5000/api/ws/transcribe`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
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
            if (data.entry.speaker !== this.currentSpeaker) {
              this.onFinal(data.entry);
            }
          }
        } catch (e) {}
      };

      this.ws.onerror = () => {
        // Fallback gracefully in standalone browser mode
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
    this.pendingAudioGap = false;
    this.lastInterimChunk = '';

    this.connectWebSocket(meetingId);

    // 1. Khởi động Web Audio API visualizer & bộ theo dõi âm lượng
    await this.startAudioMeter();

    // 2. Khởi động Speech Recognition
    if (this.recognition) {
      try {
        this.recognition.start();
        this.setStatus('recording');
        this.lastTextEmissionTime = Date.now();
      } catch (err: any) {
        if (err.name !== 'InvalidStateError') {
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
      if (this.silenceTimer) clearTimeout(this.silenceTimer);
      if (this.lastInterimChunk.trim()) {
        this.commitSegmentDirectly(this.lastInterimChunk);
        this.lastInterimChunk = '';
        this.onInterim('');
      }
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
      this.lastTextEmissionTime = Date.now();
      if (this.recognition) {
        try {
          this.recognition.start();
        } catch (e) {}
      }
    }
  }

  public stop() {
    this.setStatus('idle');
    if (this.silenceTimer) clearTimeout(this.silenceTimer);
    if (this.lastInterimChunk.trim()) {
      this.commitSegmentDirectly(this.lastInterimChunk);
      this.lastInterimChunk = '';
      this.onInterim('');
    }
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
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { ideal: true },
          noiseSuppression: { ideal: true },
          autoGainControl: { ideal: true },
          channelCount: { ideal: 1 },
          sampleRate: { ideal: 48000 }
        }
      });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      const ctx = this.audioContext;
      const source = ctx.createMediaStreamSource(this.mediaStream);

      // DSP 1: Sub-bass High-pass filter at 40Hz (removes low rumbling without affecting speech fundamentals)
      const highpassFilter = ctx.createBiquadFilter();
      highpassFilter.type = 'highpass';
      highpassFilter.frequency.setValueAtTime(40, ctx.currentTime);

      // DSP 2: Precise 50Hz Electrical Hum Notch Filter (removes AC line hum)
      const notch50 = ctx.createBiquadFilter();
      notch50.type = 'notch';
      notch50.frequency.setValueAtTime(50, ctx.currentTime);
      notch50.Q.setValueAtTime(10.0, ctx.currentTime);

      // DSP 3: Precise 60Hz Power Supply Hum Notch Filter
      const notch60 = ctx.createBiquadFilter();
      notch60.type = 'notch';
      notch60.frequency.setValueAtTime(60, ctx.currentTime);
      notch60.Q.setValueAtTime(10.0, ctx.currentTime);

      // DSP 4: High-frequency static hiss low-shelf at 14kHz
      const notchRF = ctx.createBiquadFilter();
      notchRF.type = 'lowshelf';
      notchRF.frequency.setValueAtTime(14000, ctx.currentTime);
      notchRF.gain.setValueAtTime(-6, ctx.currentTime);

      // DSP 5: Peaking Equalizer (+3.5dB at 2.4kHz) to elevate Vietnamese vocal consonants & tone clarity
      const presenceEq = ctx.createBiquadFilter();
      presenceEq.type = 'peaking';
      presenceEq.frequency.setValueAtTime(2400, ctx.currentTime);
      presenceEq.gain.setValueAtTime(3.5, ctx.currentTime);
      presenceEq.Q.setValueAtTime(1.0, ctx.currentTime);

      // DSP 6: Dynamics Compressor to even out soft vs loud speaking levels
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-22, ctx.currentTime);
      compressor.knee.setValueAtTime(20, ctx.currentTime);
      compressor.ratio.setValueAtTime(10, ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      compressor.release.setValueAtTime(0.15, ctx.currentTime);

      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 64;

      source.connect(highpassFilter);
      highpassFilter.connect(notch50);
      notch50.connect(notch60);
      notch60.connect(notchRF);
      notchRF.connect(presenceEq);
      presenceEq.connect(compressor);
      compressor.connect(this.analyser);

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

        const now = Date.now();
        // Nếu có tiếng nói rõ rệt vào micro (âm lượng > 15%)
        if (normalizedVolume > 15) {
          this.lastAudioEnergyTime = now;

          // CƠ CHẾ PHÁT HIỆN KHOẢNG KHUYẾT ÂM THANH (GAP DETECTION):
          // Nếu có âm thanh nói liên tục > 1.2 giây nhưng engine chưa trả về text kịp
          if (this.lastTextEmissionTime > 0 && (now - this.lastTextEmissionTime) > 1200) {
            this.pendingAudioGap = true;
          }
        }

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
