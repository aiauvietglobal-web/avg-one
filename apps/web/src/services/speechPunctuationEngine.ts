/**
 * AVG One Real-Time Speech Punctuation, Acoustic Normalization & Continuity Engine
 * 
 * Các trụ cột nâng cấp chuyên sâu:
 * 1. Khẩu lệnh dấu câu thực tế: "dấu chấm", "dấu phẩy", "xuống dòng", "dấu hỏi", "dấu than", "hai chấm", "ba chấm", "gạch đầu dòng"
 * 2. Tự động nhận diện ngữ điệu & câu hỏi tiếng Việt (phải không, đúng không, hả, sao, ở đâu...) -> ?
 * 3. Chuẩn hóa số, ngày tháng, phần trăm theo chuẩn hành chính (Inverse Text Normalization - ITN)
 * 4. Chuẩn hóa từ mượn tiếng Anh / thuật ngữ công sở (check mail, deadline, feedback, PO, VAT, OKR, KPI...)
 * 5. Khử lỗi phát âm nói nhanh, dính chữ (thế lày -> thế này, lăng suất -> năng suất, khi lào -> khi nào...)
 * 6. Cơ chế dự phòng dấu 3 chấm (...) khi âm thanh bị nghẽn/chưa kịp nghe, đảm bảo tính liên tục, không suy đoán từ
 * 7. Chuẩn hóa chính tả & kiểu gõ tiếng Việt Unicode NFC
 */

// 1. Bảng ánh xạ khẩu lệnh đọc dấu câu tiếng Việt sang ký tự thực tế
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

// 2. Chuyển đổi từ mượn Tiếng Anh & Thuật ngữ điều hành doanh nghiệp khi người Việt phát âm
const LOANWORD_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\b(chếch\s*meo|chếch\s*mail|check\s*meo)\b/gi, replacement: 'check mail' },
  { pattern: /\b(đét\s*lai|đét\s*line|đết\s*lai)\b/gi, replacement: 'deadline' },
  { pattern: /\b(phi\s*đơ\s*bách|phít\s*bách|phít\s*bắc|phít\s*back)\b/gi, replacement: 'feedback' },
  { pattern: /\b(mít\s*ting|mít\s*tinh)\b/gi, replacement: 'meeting' },
  { pattern: /\b(súp\s*pót|su\s*pót)\b/gi, replacement: 'support' },
  { pattern: /\b(ấp\s*đết|áp\s*đết|úp\s*đết)\b/gi, replacement: 'update' },
  { pattern: /\b(rì\s*pót|ri\s*pót)\b/gi, replacement: 'report' },
  { pattern: /\b(sét\s*úp|xét\s*úp)\b/gi, replacement: 'setup' },
  { pattern: /\b(bách\s*úp|bắc\s*úp)\b/gi, replacement: 'backup' },
  { pattern: /\b(ki\s*bi\s*ai)\b/gi, replacement: 'KPI' },
  { pattern: /\b(ô\s*ca\s*rờ)\b/gi, replacement: 'OKR' },
  { pattern: /\b(pi\s*ô)\b/gi, replacement: 'PO' },
  { pattern: /\b(vát\s*thuế|vê\s*a\s*tê)\b/gi, replacement: 'thuế VAT' },
  { pattern: /\b(phai\s*đính\s*kèm|phay\s*đính\s*kèm)\b/gi, replacement: 'file đính kèm' },
  { pattern: /\b(sét\s*tanh|xét\s*ting)\b/gi, replacement: 'setting' },
  { pattern: /\b(xíp\s*hàng|xíp\s*pinh)\b/gi, replacement: 'ship hàng' }
];

// 3. Chuẩn hóa số đếm, phần trăm & thời gian theo chuẩn hành chính (ITN)
const ITN_RULES: Array<{ pattern: RegExp; replacement: string | ((...args: any[]) => string) }> = [
  // Phần trăm
  { pattern: /\b(một\s*trăm|100)\s*phần\s*trăm\b/gi, replacement: '100%' },
  { pattern: /\b(chín\s*mươi|90)\s*phần\s*trăm\b/gi, replacement: '90%' },
  { pattern: /\b(tám\s*mươi|80)\s*phần\s*trăm\b/gi, replacement: '80%' },
  { pattern: /\b(bảy\s*mươi|70)\s*phần\s*trăm\b/gi, replacement: '70%' },
  { pattern: /\b(sáu\s*mươi|60)\s*phần\s*trăm\b/gi, replacement: '60%' },
  { pattern: /\b(năm\s*mươi|50)\s*phần\s*trăm\b/gi, replacement: '50%' },
  { pattern: /\b(bốn\s*mươi|40)\s*phần\s*trăm\b/gi, replacement: '40%' },
  { pattern: /\b(ba\s*mươi|30)\s*phần\s*trăm\b/gi, replacement: '30%' },
  { pattern: /\b(hai\s*(?:mươi\s*)?(?:lăm|nhăm)|25)\s*phần\s*trăm\b/gi, replacement: '25%' },
  { pattern: /\b(hai\s*mươi|20)\s*phần\s*trăm\b/gi, replacement: '20%' },
  { pattern: /\b(mười\s*(?:lăm|nhăm)|15)\s*phần\s*trăm\b/gi, replacement: '15%' },
  { pattern: /\b(mười|10)\s*phần\s*trăm\b/gi, replacement: '10%' },
  { pattern: /\b(năm|5)\s*phần\s*trăm\b/gi, replacement: '5%' },

  // Thời gian giờ phút
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(30|ba\s*mươi)\s*(?:phút)?\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:30` },
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(15|mười\s*lăm)\s*(?:phút)?\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:15` },
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(45|bốn\s*lăm)\s*(?:phút)?\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:45` },

  // Bước 1, Bước 2...
  { pattern: /\bbước\s*(?:một|1)\b/gi, replacement: 'Bước 1' },
  { pattern: /\bbước\s*(?:hai|2)\b/gi, replacement: 'Bước 2' },
  { pattern: /\bbước\s*(?:ba|3)\b/gi, replacement: 'Bước 3' },
  { pattern: /\bbước\s*(?:bốn|4)\b/gi, replacement: 'Bước 4' },
  { pattern: /\bbước\s*(?:năm|5)\b/gi, replacement: 'Bước 5' },
  { pattern: /\bbước\s*(?:sáu|6)\b/gi, replacement: 'Bước 6' },
  { pattern: /\bbước\s*(?:bảy|7)\b/gi, replacement: 'Bước 7' },
  { pattern: /\bbước\s*(?:tám|8)\b/gi, replacement: 'Bước 8' },
  { pattern: /\bbước\s*(?:chín|9)\b/gi, replacement: 'Bước 9' },
  { pattern: /\bbước\s*(?:mười|10)\b/gi, replacement: 'Bước 10' }
];

// 4. Khử lỗi phát âm méo tiếng khi nói nhanh trong giao tiếp thực tế
const SPOKEN_COLLOQUIAL_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\b(thế\s*này\s*này|thế\s*lày)\b/gi, replacement: 'thế này' },
  { pattern: /\b(khi\s*lào)\b/gi, replacement: 'khi nào' },
  { pattern: /\b(lăng\s*suất)\b/gi, replacement: 'năng suất' },
  { pattern: /\b(lăng\s*lượng)\b/gi, replacement: 'năng lượng' },
  { pattern: /\b(lói\s*chung)\b/gi, replacement: 'nói chung' },
  { pattern: /\b(làm\s*chi)\b/gi, replacement: 'làm gì' },
  { pattern: /\b(bây\s*chừ)\b/gi, replacement: 'bây giờ' },
  { pattern: /\b(hôm\s*ni)\b/gi, replacement: 'hôm nay' }
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
 * - Áp dụng chuẩn hóa số đếm, phần trăm, giờ phút (ITN)
 * - Khử lỗi phát âm nói nhanh và dịch chuẩn từ mượn
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

  // 3. Chuẩn hóa từ mượn tiếng Anh công sở
  for (const rule of LOANWORD_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 4. Chuẩn hóa số, ngày tháng, phần trăm (ITN)
  for (const rule of ITN_RULES) {
    text = text.replace(rule.pattern, rule.replacement as any);
  }

  // 5. Khử lỗi nói nhanh méo chữ
  for (const rule of SPOKEN_COLLOQUIAL_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 6. Chuẩn hóa khoảng cách quanh dấu câu:
  // Không để khoảng trắng trước dấu câu: "xin chào ," -> "xin chào,"
  text = text.replace(/\s+([,.?!:;%])/g, '$1');
  // Phải có đúng 1 khoảng trắng sau dấu câu (nếu không phải là cuối chuỗi hoặc xuống dòng)
  text = text.replace(/([,.?!:;%])(?=[^\s\d\n)\]}])/g, '$1 ');
  // Xử lý khoảng cách quanh dấu mở đóng ngoặc
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');

  // 7. Nếu là câu chốt (final), kiểm tra xem có phải câu hỏi không
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

  // 8. Viết hoa chữ cái đầu tiên và sau các dấu chấm/chấm hỏi/chấm than/xuống dòng
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
