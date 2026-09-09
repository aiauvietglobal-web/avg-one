/**
 * AVG One Real-Time Speech Punctuation & Continuity Engine
 * 
 * Chức năng:
 * 1. Chuyển đổi khẩu lệnh dấu câu thực tế: "dấu chấm", "dấu phẩy", "xuống dòng", "dấu hỏi", "dấu than", "hai chấm", "ba chấm", "gạch đầu dòng"
 * 2. Tự động nhận diện ngữ điệu & câu hỏi tiếng Việt (phải không, đúng không, hả, sao, ở đâu...) -> ?
 * 3. Tự động chèn dấu ngắt câu, dấu phẩy theo liên từ và nhịp hơi
 * 4. Cơ chế dự phòng dấu 3 chấm (...) khi âm thanh bị nghẽn/chưa kịp nghe, đảm bảo tính liên tục, không đoán từ
 * 5. Chuẩn hóa chính tả & kiểu gõ tiếng Việt Unicode NFC
 */

// Bảng ánh xạ khẩu lệnh đọc dấu câu tiếng Việt sang ký tự thực tế
const SPOKEN_PUNCTUATION_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Xuống dòng / Đoạn mới
  { pattern: /\b(xuống\s*dòng|ngắt\s*dòng|dòng\s*mới)\b/gi, replacement: '\n' },
  { pattern: /\b(gạch\s*đầu\s*dòng)\b/gi, replacement: '\n- ' },

  // Dấu kết thúc câu & ngắt câu
  { pattern: /\b(dấu\s*chấm\s*hỏi|chấm\s*hỏi|dấu\s*hỏi)\b/gi, replacement: '?' },
  { pattern: /\b(dấu\s*chấm\s*than|chấm\s*than|dấu\s*than)\b/gi, replacement: '!' },
  { pattern: /\b(dấu\s*hai\s*chấm|hai\s*chấm)\b/gi, replacement: ':' },
  { pattern: /\b(dấu\s*ba\s*chấm|ba\s*chấm|chấm\s*lửng)\b/gi, replacement: '...' },
  { pattern: /\b(dấu\s*chấm\s*phẩy|chấm\s*phẩy)\b/gi, replacement: ';' },
  { pattern: /\b(dấu\s*chấm|chấm\s*hết|chấm\s*câu)\b/gi, replacement: '.' },
  { pattern: /\b(dấu\s*phẩy|phẩy)\b/gi, replacement: ',' },

  // Dấu ngoặc & biểu tượng
  { pattern: /\b(mở\s*ngoặc\s*đơn|mở\s*ngoặc)\b/gi, replacement: ' (' },
  { pattern: /\b(đóng\s*ngoặc\s*đơn|đóng\s*ngoặc)\b/gi, replacement: ') ' },
  { pattern: /\b(phần\s*trăm)\b/gi, replacement: '%' }
];

// Các từ kết thúc biểu thị câu hỏi trong văn nói tiếng Việt
const QUESTION_ENDINGS = [
  'phải không',
  'đúng không',
  'được không',
  'chưa',
  'hả',
  'sao',
  'ở đâu',
  'thế nào',
  'bao giờ',
  'khi nào',
  'tại sao',
  'vì sao',
  'ai đấy',
  'ai thế',
  'là gì',
  'mấy giờ'
];

/**
 * Xử lý văn bản thô từ giọng nói theo thời gian thực:
 * - Chuẩn hóa Unicode NFC
 * - Chuyển đổi khẩu lệnh dấu câu
 * - Nhận diện câu hỏi tiếng Việt
 * - Chuẩn hóa khoảng cách xung quanh dấu câu
 */
export function processRealtimeSpeechPunctuation(rawText: string, isFinal: boolean = true): string {
  if (!rawText) return '';

  // 1. Chuẩn hóa Unicode chuẩn dựng sẵn NFC
  let text = rawText.normalize('NFC').trim();
  if (!text) return '';

  // 2. Chuyển đổi khẩu lệnh dấu câu đọc bằng lời nói
  for (const rule of SPOKEN_PUNCTUATION_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 3. Chuẩn hóa khoảng cách quanh dấu câu:
  // Không để khoảng trắng trước dấu câu: "xin chào ," -> "xin chào,"
  text = text.replace(/\s+([,.?!:;%])/g, '$1');
  // Phải có đúng 1 khoảng trắng sau dấu câu (nếu không phải là cuối chuỗi hoặc xuống dòng)
  text = text.replace(/([,.?!:;%])(?=[^\s\d\n)\]}])/g, '$1 ');
  // Xử lý khoảng cách quanh dấu mở đóng ngoặc
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');

  // 4. Nếu là câu chốt (final), kiểm tra xem có phải câu hỏi không
  if (isFinal) {
    const trimmed = text.trim();
    // Nếu chưa có dấu kết thúc câu (. ? ! ...)
    if (!/[.?!…]$/.test(trimmed)) {
      const lower = trimmed.toLowerCase();
      const isQuestion = QUESTION_ENDINGS.some(ending => {
        return lower.endsWith(ending) || lower.endsWith(ending + ',');
      });

      if (isQuestion) {
        text = trimmed.replace(/,\s*$/, '') + '?';
      } else {
        // Tự động thêm dấu chấm nếu câu đã có độ dài ý nghĩa (> 3 từ)
        const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
        if (wordCount >= 3 && !trimmed.endsWith(':') && !trimmed.endsWith(',')) {
          text = trimmed + '.';
        }
      }
    }
  }

  // 5. Viết hoa chữ cái đầu tiên và sau các dấu chấm/chấm hỏi/chấm than/xuống dòng
  text = autoCapitalizeSentences(text);

  return text.trim();
}

/**
 * Tự động viết hoa đầu câu, sau dấu chấm, chấm hỏi, chấm than và sau ngắt dòng
 */
export function autoCapitalizeSentences(text: string): string {
  if (!text) return '';

  // Viết hoa ký tự đầu
  let result = text.charAt(0).toUpperCase() + text.slice(1);

  // Viết hoa sau các dấu kết câu: . ? ! \n
  result = result.replace(/([.?!]\s+)([a-zà-ỹ])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  result = result.replace(/(\n\s*[-*]?\s*)([a-zà-ỹ])/g, (_, p1, p2) => p1 + p2.toUpperCase());

  return result;
}

/**
 * Chia nhỏ văn bản chuyển đổi thành các đoạn ngắn gọn gàng (8-14 từ):
 * - Giữ nguyên các dấu ngắt câu (. ? ! \n)
 * - Tách tại các điểm ngắt nghỉ tự nhiên (dấu phẩy, từ nối)
 * - Đảm bảo tính liền mạch, dễ theo dõi
 */
export function splitIntoReadableSpeechSegments(text: string, maxWords: number = 14): string[] {
  if (!text || !text.trim()) return [];

  // Tách trước theo ngắt dòng \n
  const lineBlocks = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  const allSegments: string[] = [];

  for (const block of lineBlocks) {
    // Tách theo dấu kết câu . ? ! ;
    const rawSentences = block
      .split(/(?<=[.?!;])\s+/)
      .map(s => s.trim())
      .filter(Boolean);

    for (const sentence of rawSentences) {
      const words = sentence.split(' ').filter(Boolean);

      // Nếu câu có độ dài vừa phải, giữ nguyên
      if (words.length <= maxWords) {
        allSegments.push(autoCapitalizeSentences(sentence));
        continue;
      }

      // Nếu câu quá dài, chia nhỏ tại các điểm ngắt tự nhiên
      let currentWords: string[] = [];
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        currentWords.push(w);

        const hasComma = w.endsWith(',');
        const isConjunction = /^(và|nhưng|tuy\s*nhiên|đồng\s*thời|do\s*đó|vì\s*vậy|ngoài\s*ra|tiếp\s*theo|để|thì|sau\s*đó|khi\s*đó)$/i.test(w);

        if (
          (currentWords.length >= 8 && (hasComma || isConjunction)) ||
          currentWords.length >= maxWords
        ) {
          let segText = currentWords.join(' ').trim();
          segText = segText.replace(/,\s*$/, '');
          if (segText) {
            allSegments.push(autoCapitalizeSentences(segText));
          }
          currentWords = [];
        }
      }

      if (currentWords.length > 0) {
        const remaining = currentWords.join(' ').trim();
        if (remaining) {
          allSegments.push(autoCapitalizeSentences(remaining));
        }
      }
    }
  }

  return allSegments.length > 0 ? allSegments : [autoCapitalizeSentences(text.trim())];
}

/**
 * Xử lý cầu nối dấu 3 chấm (...) khi phát hiện âm thanh ngắt quãng hoặc không nghe kịp
 * Đảm bảo từ mới được nối tiếp một cách tự nhiên mà không đoán từ.
 */
export function stitchSpeechWithEllipsis(previousText: string, incomingText: string): string {
  const prev = previousText.trim();
  const next = incomingText.trim();

  if (!prev) return next;
  if (!next) return prev;

  // Nếu câu trước đã kết thúc bằng dấu chấm/hỏi/than hoặc đã có dấu 3 chấm
  if (/[.?!…]$/.test(prev)) {
    return `${prev} ${autoCapitalizeSentences(next)}`;
  }

  // Nếu câu trước chưa kết thúc và có khoảng hẫng, nối bằng dấu 3 chấm
  if (prev.endsWith('...')) {
    return `${prev} ${next}`;
  }

  return `${prev} ... ${next}`;
}
