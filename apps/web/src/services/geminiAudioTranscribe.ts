import { AudioSegment, TranscribedFile } from '../modules/apps/FileTranscribeModule';

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export async function transcribeAudioWithGemini(
  file: File,
  apiKey: string,
  onProgress?: (stage: string, progress: number) => void
): Promise<{ segments: AudioSegment[]; summary: TranscribedFile['summary'] }> {
  if (!apiKey) {
    throw new Error('Vui lòng nhập Google Gemini API Key để thực hiện giải mã âm thanh thực tế.');
  }

  onProgress?.('Đang đọc dữ liệu tệp âm thanh binary...', 15);
  const arrayBuffer = await file.arrayBuffer();

  onProgress?.('Đang mã hóa Base64 tệp âm thanh...', 35);
  const base64Data = arrayBufferToBase64(arrayBuffer);

  const mimeType = file.type || (file.name.endsWith('.mp3') ? 'audio/mp3' : file.name.endsWith('.m4a') ? 'audio/m4a' : 'audio/wav');

  onProgress?.('Đang gửi âm thanh tới Google Gemini 2.5 Flash Speech Engine...', 60);

  const promptText = `Bạn là chuyên gia bóc tách băng ghi âm tiếng Việt chuyên nghiệp. Hãy nghe toàn bộ âm thanh trong tệp và trích xuất TOÀN BỘ nội dung phát biểu thực tế của các nhân vật.

YÊU CẦU BẮT BUỘC:
1. Giải mã 100% chính xác lời nói tiếng Việt thực tế từ file âm thanh. KHÔNG tự nghĩ ra hay tạo câu mẫu giả định.
2. Trả về JSON thuần túy (KHÔNG bọc trong markdown \`\`\`json):
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
  const segments: AudioSegment[] = rawSegments.map((s, idx) => ({
    id: `seg-gemini-${Date.now()}-${idx}`,
    startTime: Number(s.startTime) || 0,
    endTime: Number(s.endTime) || (Number(s.startTime) || 0) + 15,
    speakerId: s.speakerId || `spk-${(idx % 3) + 1}`,
    speakerName: s.speakerName || `Người phát biểu ${(idx % 3) + 1}`,
    speakerColor: `spk-${(idx % 4) + 1}`,
    speakerRole: s.speakerRole || 'Diễn giả',
    text: s.text || '',
    confidence: 0.99
  }));

  return {
    segments,
    summary: parsed.summary || {
      executive: 'Đã bóc tách nội dung thực tế từ Gemini AI.',
      keyDecisions: [],
      actionItems: []
    }
  };
}
