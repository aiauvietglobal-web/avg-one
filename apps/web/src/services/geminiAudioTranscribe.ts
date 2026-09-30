import { AudioSegment, TranscribedFile } from '../modules/apps/FileTranscribeModule';
import {
  processRealtimeSpeechPunctuation,
  DomainMode,
  maskSensitiveWords
} from './speechPunctuationEngine';

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export interface GeminiTranscribeOptions {
  domainMode?: DomainMode;
  maskSensitive?: boolean;
}

export async function transcribeAudioWithGemini(
  file: File,
  apiKey: string,
  onProgress?: (stage: string, progress: number) => void,
  options?: GeminiTranscribeOptions
): Promise<{ segments: AudioSegment[]; summary: TranscribedFile['summary'] }> {
  if (!apiKey) {
    throw new Error('Vui lòng nhập Google Gemini API Key để thực hiện giải mã âm thanh thực tế.');
  }

  const maskSensitive = options?.maskSensitive !== false;
  const domainMode = options?.domainMode || 'all';

  onProgress?.('Đang đọc dữ liệu tệp âm thanh binary...', 15);
  const arrayBuffer = await file.arrayBuffer();

  onProgress?.('Đang mã hóa Base64 tệp âm thanh...', 35);
  const base64Data = arrayBufferToBase64(arrayBuffer);

  const mimeType = file.type || (file.name.endsWith('.mp3') ? 'audio/mp3' : file.name.endsWith('.m4a') ? 'audio/m4a' : 'audio/wav');

  onProgress?.('Đang gửi âm thanh tới Google Gemini 2.5 Flash Speech Engine...', 60);

  const promptText = `Bạn là chuyên gia bóc tách băng ghi âm tiếng Việt chuyên nghiệp thuộc phân hệ chuyển đổi thông minh AVG One. Hãy nghe toàn bộ âm thanh trong tệp và trích xuất TOÀN BỘ nội dung phát biểu thực tế của các nhân vật.

QUY TẮC BẮT BUỘC ĐỐI VỚI VĂN BẢN CHUYỂN ĐỔI:
1. ĐÚNG 100% THỰC TẾ LỜI THOẠI:
   - Trích xuất chính xác tuyệt đối từng câu, từng từ mà nhân vật thực sự nói ra trong file audio.
   - TUYỆT ĐỐI KHÔNG BIÊN SOẠN LINH TINH, không tự ý sửa đổi, trau chuốt, tóm lược hay bịa đặt thêm bớt câu từ.
2. TUYỆT ĐỐI KHÔNG BỎ THÔNG TIN:
   - Mọi thông tin, con số (ví dụ: "8 tỷ 260", "25%", "báo cáo tài chính"), câu xác nhận ngắn ("Vâng", "Dạ", "Đúng rồi", "Ok chưa?") đều phải được ghi nhận đầy đủ vào đúng timeline.
3. BẮT BUỘC THỂ HIỆN DẤU BA CHẤM (...) KHI:
   - Người nói ngập ngừng, dừng lại suy nghĩ, ngắt nghỉ giữa câu (ví dụ: "người phải ... ký", "theo ... quy định").
   - Lặp từ ngắc ngứ (ví dụ: "cái này ... cái này", "những cái ... những cái").
   - Câu nói lửng lơ, chưa kết thúc hoặc bị đứt quãng ở cuối (ví dụ: "chấp nhận này một là ...", "để mình xác định ...", "chứng từ với ...").
   - Âm thanh bị nhiễu, nghẽn hoặc khuyết thông tin. Không được bỏ qua mà phải thể hiện bằng dấu '...'.
4. Áp dụng chuẩn xác thuật ngữ chuyên ngành và mã hóa:
   - Kinh tế & Tài chính: GDP, CPI, EBITDA, ROE, ROI, VN-Index, IPO, M&A, margin, call margin, nợ xấu nhóm 1-5, ĐHĐCĐ, HĐQT...
   - Pháp luật & Hành chính: TAND, VKSND, HĐXX, VIAC, NDA, Bộ luật Dân sự, Bộ luật Hình sự, nguyên đơn, bị đơn, kháng cáo, giám đốc thẩm, Luật Doanh nghiệp...
   - AVG One: #K1, #K2T, #K2B, B5.1, 5.1T, 2.1, 3.1, 1.C, 1.T, 4.T, 9; 6, DH, AV, AVG One, VBKL, KCS...
5. LƯU Ý BẢO VỆ TỪ NGỮ NHẠY CẢM:
   - Nếu trong lời nói có từ ngữ thô tục, chửi thề, BẮT BUỘC ẩn bằng dấu ba sao: *** để đảm bảo chuẩn mực công sở.
6. Trả về JSON thuần túy (KHÔNG bọc trong markdown \`\`\`json):
{
  "summary": {
    "executive": "Tóm tắt ngắn gọn nội dung thực tế cuộc họp...",
    "keyDecisions": ["Kết luận 1 thực tế", "Kết luận 2 thực tế"],
    "actionItems": [
      { "task": "Nhiệm vụ 1", "assignee": "Người phụ trách", "deadline": "Hạn chót", "priority": "Cao" }
    ]
  },
  "segments": [
    {
      "startTime": 0,
      "endTime": 30,
      "speakerId": "spk-1",
      "speakerName": "Tên hoặc Người nói 1",
      "speakerRole": "Chủ trì / Diễn giả",
      "text": "Nội dung câu nói thực tế trích từ file audio..."
    }
  ]
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inline_data: { mime_type: mimeType, data: base64Data } },
              { text: promptText }
            ]
          }
        ]
      })
    }
  );

  onProgress?.('Đang nhận diện ngữ âm & phân tích mốc thời gian...', 85);

  if (!response.ok) {
    const errorErr = await response.json().catch(() => ({}));
    const msg = errorErr.error?.message || `Lỗi HTTP ${response.status}`;
    throw new Error(`Lỗi từ Gemini ASR API: ${msg}`);
  }

  const resJson = await response.json();
  const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';

  onProgress?.('Hoàn tất giải mã AI! Đang xuất bản kết quả...', 98);

  let cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  const rawSegments: any[] = parsed.segments || [];
  const segments: AudioSegment[] = rawSegments.map((s, idx) => {
    // Áp dụng bộ lọc ngôn ngữ chuyên ngành và từ nhạy cảm
    let processedText = s.text || '';
    processedText = processRealtimeSpeechPunctuation(processedText, {
      isFinal: true,
      maskSensitive,
      domainMode
    });

    if (maskSensitive) {
      processedText = maskSensitiveWords(processedText);
    }

    return {
      id: `seg-gemini-${Date.now()}-${idx}`,
      startTime: Number(s.startTime) || 0,
      endTime: Number(s.endTime) || (Number(s.startTime) || 0) + 15,
      speakerId: s.speakerId || `spk-${(idx % 3) + 1}`,
      speakerName: s.speakerName || `Người phát biểu ${(idx % 3) + 1}`,
      speakerColor: `spk-${(idx % 4) + 1}`,
      speakerRole: s.speakerRole || 'Diễn giả',
      text: processedText,
      confidence: 0.99
    };
  });

  let executiveSummary = parsed.summary?.executive || 'Đã bóc tách nội dung thực tế từ Gemini AI.';
  if (maskSensitive) {
    executiveSummary = maskSensitiveWords(executiveSummary);
  }

  return {
    segments,
    summary: {
      executive: executiveSummary,
      keyDecisions: (parsed.summary?.keyDecisions || []).map((kd: string) =>
        maskSensitive ? maskSensitiveWords(kd) : kd
      ),
      actionItems: (parsed.summary?.actionItems || []).map((act: any) => ({
        ...act,
        task: maskSensitive ? maskSensitiveWords(act.task || '') : (act.task || '')
      }))
    }
  };
}
