/**
 * AVG One Real-Time Speech Punctuation, Acoustic Normalization, Domain Adaptation & Continuity Engine
 * 
 * Các trụ cột nâng cấp chuyên sâu:
 * 1. Khẩu lệnh dấu câu thực tế: "dấu chấm", "dấu phẩy", "xuống dòng", "dấu hỏi", "dấu than", "hai chấm", "ba chấm", "gạch đầu dòng"
 * 2. Tự động nhận diện ngữ điệu & câu hỏi tiếng Việt (phải không, đúng không, hả, sao, ở đâu...) -> ?
 * 3. Chuẩn hóa số, ngày tháng, phần trăm theo chuẩn hành chính (Inverse Text Normalization - ITN)
 * 4. Chuẩn hóa từ mượn tiếng Anh / thuật ngữ công sở (check mail, deadline, feedback, PO, VAT, OKR, KPI...)
 * 5. Khử lỗi phát âm nói nhanh, dính chữ (thế lày -> thế này, lăng suất -> năng suất, khi lào -> khi nào...)
 * 6. Cơ chế dự phòng dấu 3 chấm (...) khi âm thanh bị nghẽn/chưa kịp nghe, đảm bảo tính liên tục, không suy đoán từ
 * 7. Chuẩn hóa chính tả & kiểu gõ tiếng Việt Unicode NFC
 * 8. HỌC & CHUYỂN ĐỔI NGÔN NGỮ CHUYÊN NGÀNH:
 *    - Kinh tế - Tài chính - Kinh doanh: GDP, CPI, VN-Index, IPO, EBITDA, ROE, ROI, Margin, Call Margin, T+2, M&A...
 *    - Pháp luật - Hành chính - Tố tụng: HĐXX, Thẩm phán, Nguyên đơn, Bị đơn, VIAC, NDA, Giám đốc thẩm, ERC, IRC...
 *    - Đời sống - Xã hội - Tiêu dùng: CCCD, VNeID, BHYT, BHXH, VssID, Quét mã QR, NAPAS 24/7, CT Scanner, MRI...
 * 9. BỘ LỌC TỪ NGỮ NHẠY CẢM TỰ ĐỘNG (SENSITIVE & PROFANITY MASKING WITH ***):
 *    - Tự động nhận diện từ ngữ thô tục, chửi thề, lăng mạ tiếng Việt & tiếng Anh
 *    - Che giấu an toàn bằng dấu hoa thị `***` (hoặc `[***]`) giữ gìn văn hóa công sở và môi trường làm việc chuẩn mực
 */

export type DomainMode = 'all' | 'economy' | 'legal' | 'life';

export interface PunctuationEngineOptions {
  isFinal?: boolean;
  maskSensitive?: boolean;
  sensitiveMaskStyle?: 'asterisks' | 'bracket_asterisks';
  domainMode?: DomainMode;
}

export interface SensitiveMaskOptions {
  replacement?: string;
  style?: 'asterisks' | 'bracket_asterisks';
}

export interface DomainGlossaryItem {
  term: string;
  domain: 'economy' | 'legal' | 'life';
  domainLabel: string;
  meaning: string;
  spokenExamples: string[];
}

// 1. Bảng ánh xạ khẩu lệnh đọc dấu câu tiếng Việt sang ký tự thực tế
const SPOKEN_PUNCTUATION_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Xuống dòng / Đoạn mới
  { pattern: /\b(ngắt\s*đoạn|sang\s*đoạn\s*mới|đoạn\s*mới|xuống\s*đoạn)\b/gi, replacement: '\n\n' },
  { pattern: /\b(xuống\s*dòng|ngắt\s*dòng|dòng\s*mới|sang\s*dòng\s*mới|xuống\s*hàng|ngắt\s*hàng|hàng\s*mới)\b/gi, replacement: '\n' },
  { pattern: /\b(gạch\s*đầu\s*dòng|gạch\s*ngang\s*đầu\s*dòng)\b/gi, replacement: '\n- ' },
  { pattern: /\b(dấu\s*cộng\s*đầu\s*dòng|cộng\s*đầu\s*dòng)\b/gi, replacement: '\n+ ' },

  // Dấu kết thúc câu & ngắt câu
  { pattern: /\b(dấu\s*chấm\s*hỏi|chấm\s*hỏi|dấu\s*hỏi)\b/gi, replacement: '?' },
  { pattern: /\b(dấu\s*chấm\s*than|chấm\s*than|dấu\s*than|dấu\s*cảm\s*thán)\b/gi, replacement: '!' },
  { pattern: /\b(dấu\s*hai\s*chấm|hai\s*chấm)\b/gi, replacement: ':' },
  { pattern: /\b(dấu\s*chấm\s*phẩy|chấm\s*phẩy)\b/gi, replacement: ';' },
  { pattern: /\b(chấm\s*hết\s*câu|chấm\s*hết|dấu\s*chấm|chấm\s*câu)\b/gi, replacement: '.' },
  { pattern: /\b(dấu\s*phẩy|ngắt\s*phẩy|phẩy)\b/gi, replacement: ',' },
  { pattern: /\b(dấu\s*ba\s*chấm|ba\s*chấm|dấu\s*chấm\s*lửng|chấm\s*lửng)\b/gi, replacement: ' ... ' },

  // Dấu ngoặc & biểu tượng
  { pattern: /\b(mở\s*ngoặc\s*đơn|mở\s*ngoặc)\b/gi, replacement: ' (' },
  { pattern: /\b(đóng\s*ngoặc\s*đơn|đóng\s*ngoặc)\b/gi, replacement: ') ' },
  { pattern: /\b(mở\s*ngoặc\s*kép|mở\s*kép)\b/gi, replacement: ' "' },
  { pattern: /\b(đóng\s*ngoặc\s*kép|đóng\s*kép)\b/gi, replacement: '" ' },
  { pattern: /\b(mở\s*ngoặc\s*vuông)\b/gi, replacement: ' [' },
  { pattern: /\b(đóng\s*ngoặc\s*vuông)\b/gi, replacement: '] ' },
  { pattern: /\b(dấu\s*phần\s*trăm|phần\s*trăm)\b/gi, replacement: '%' }
];

// 2. Chuyển đổi từ mượn Tiếng Anh & Thuật ngữ điều hành doanh nghiệp khi người Việt phát âm bồi thực tế
const LOANWORD_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\b(chếch\s*meo|chếch\s*mail|check\s*meo)\b/gi, replacement: 'check mail' },
  { pattern: /\b(đét\s*lai|đét\s*line|đết\s*lai)\b/gi, replacement: 'deadline' },
  { pattern: /\b(phi\s*đơ\s*bách|phít\s*bách|phít\s*bắc|phít\s*back)\b/gi, replacement: 'feedback' },
  { pattern: /\b(mít\s*ting|mít\s*tinh|mít\s*tin)\b/gi, replacement: 'meeting' },
  { pattern: /\b(súp\s*pót|su\s*pót|súp\s*po)\b/gi, replacement: 'support' },
  { pattern: /\b(ấp\s*đết|áp\s*đết|úp\s*đết|ắp\s*đết)\b/gi, replacement: 'update' },
  { pattern: /\b(rì\s*pót|ri\s*pót)\b/gi, replacement: 'report' },
  { pattern: /\b(sét\s*úp|xét\s*úp|set\s*úp)\b/gi, replacement: 'setup' },
  { pattern: /\b(bách\s*úp|bắc\s*úp)\b/gi, replacement: 'backup' },
  { pattern: /\b(ki\s*bi\s*ai)\b/gi, replacement: 'KPI' },
  { pattern: /\b(ô\s*ca\s*rờ)\b/gi, replacement: 'OKR' },
  { pattern: /\b(pi\s*ô)\b/gi, replacement: 'PO' },
  { pattern: /\b(vát\s*thuế|vê\s*a\s*tê)\b/gi, replacement: 'thuế VAT' },
  { pattern: /\b(phai\s*đính\s*kèm|phay\s*đính\s*kèm)\b/gi, replacement: 'file đính kèm' },
  { pattern: /\b(phai\s*uốt|phai\s*word|tài\s*liệu\s*uốt)\b/gi, replacement: 'file Word' },
  { pattern: /\b(phai\s*ích\s*xen|phai\s*excel|bảng\s*ích\s*xen)\b/gi, replacement: 'file Excel' },
  { pattern: /\b(phai\s*pê\s*đê\s*ép|phai\s*pdf|tài\s*liệu\s*pdf)\b/gi, replacement: 'file PDF' },
  { pattern: /\b(phai\s*bao\s*vơ\s*poi|powerpoint|bản\s*thuyết\s*trình\s*poi)\b/gi, replacement: 'PowerPoint' },
  { pattern: /\b(gúc\s*gồ\s*mít|gúc\s*gồ\s*meet)\b/gi, replacement: 'Google Meet' },
  { pattern: /\b(gúc\s*gồ)\b/gi, replacement: 'Google' },
  { pattern: /\b(gia\s*lô)\b/gi, replacement: 'Zalo' },
  { pattern: /\b(phây\s*búc|phây\s*s\s*búc)\b/gi, replacement: 'Facebook' },
  { pattern: /\b(du\s*túp|diu\s*túp)\b/gi, replacement: 'YouTube' },
  { pattern: /\b(sét\s*tanh|xét\s*ting|xét\s*tinh)\b/gi, replacement: 'setting' },
  { pattern: /\b(xíp\s*hàng|xíp\s*pinh)\b/gi, replacement: 'ship hàng' },
  { pattern: /\b(con\s*phơm|công\s*phơm)\b/gi, replacement: 'confirm' },
  { pattern: /\b(ken\s*xồ|can\s*xồ)\b/gi, replacement: 'cancel' },
  { pattern: /\b(on\s*lai)\b/gi, replacement: 'online' },
  { pattern: /\b(ọp\s*lai)\b/gi, replacement: 'offline' },
  { pattern: /\b(lai\s*trym|lai\s*trim)\b/gi, replacement: 'livestream' },
  { pattern: /\b(sờ\s*ken|quét\s*ken)\b/gi, replacement: 'scan' },
  { pattern: /\b(áp\s*láp|úp\s*láp|úp\s*load)\b/gi, replacement: 'upload' },
  { pattern: /\b(đao\s*loát|đao\s*load)\b/gi, replacement: 'download' },
  { pattern: /\b(in\s*bốc|in\s*box)\b/gi, replacement: 'inbox' },
  { pattern: /\b(xe\s*màn\s*hình)\b/gi, replacement: 'share màn hình' },
  { pattern: /\b(xơ\s*vơ|xét\s*vơ)\b/gi, replacement: 'server' },
  { pattern: /\b(đa\s*ta\s*bây|đê\s*ta\s*bét)\b/gi, replacement: 'database' },
  { pattern: /\b(giao\s*diện\s*du\s*ai|du\s*ai)\b/gi, replacement: 'giao diện UI' },
  { pattern: /\b(du\s*ích)\b/gi, replacement: 'UX' },
  { pattern: /\b(pờ\s*ro\s*dếch|dự\s*án\s*dếch)\b/gi, replacement: 'project' },
  { pattern: /\b(sờ\s*mát\s*phôn)\b/gi, replacement: 'smartphone' },
  { pattern: /\b(láp\s*tóp)\b/gi, replacement: 'laptop' }
];

// 3. Chuẩn hóa thuật ngữ đặc thù doanh nghiệp & hệ thống AVG One
const ENTERPRISE_TERMS_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\b(a\s*vê\s*gờ\s*oăn|avg\s*oăn|a\s*v\s*g\s*one)\b/gi, replacement: 'AVG One' },
  { pattern: /\b(a\s*vê\s*gờ|a\s*v\s*g|á\s*âu\s*việt|á\s*âu\s*việt\s*gờ\s*lô\s*bồ)\b/gi, replacement: 'Á Âu Việt Global' },
  { pattern: /\b(e\s*rờ\s*pê|e\s*r\s*p)\b/gi, replacement: 'ERP' },
  { pattern: /\b(xê\s*rờ\s*mờ|c\s*r\s*m)\b/gi, replacement: 'CRM' },
  { pattern: /\b(hát\s*rờ\s*mờ|h\s*r\s*m)\b/gi, replacement: 'HRM' },
  { pattern: /\b(bê\s*ô\s*em|b\s*o\s*m)\b/gi, replacement: 'BOM' },
  { pattern: /\b(pi\s*ô|đơn\s*hàng\s*po)\b/gi, replacement: 'PO' },
  { pattern: /\b(pi\s*rờ|báo\s*chí\s*pr)\b/gi, replacement: 'PR' },
  { pattern: /\b(ét\s*ô|đơn\s*bán\s*so)\b/gi, replacement: 'SO' },
  { pattern: /\b(ét\s*ô\s*pi|s\s*o\s*p)\b/gi, replacement: 'SOP' },
  { pattern: /\b(ai\s*ét\s*ô|i\s*s\s*o)\b/gi, replacement: 'ISO' },
  { pattern: /\b(quy\s*a\s*quy\s*xê|k\s*c\s*s|qa\s*qc)\b/gi, replacement: 'QA/QC' },
  { pattern: /\b(u\s*n\s*c|ủy\s*nhiệm\s*chi)\b/gi, replacement: 'ủy nhiệm chi' },
  { pattern: /\b(b\s*2\s*b)\b/gi, replacement: 'B2B' },
  { pattern: /\b(b\s*2\s*c)\b/gi, replacement: 'B2C' },
  { pattern: /\b(c\s*e\s*o|xi\s*i\s*ô)\b/gi, replacement: 'CEO' },
  { pattern: /\b(c\s*f\s*o|xi\s*ép\s*ô)\b/gi, replacement: 'CFO' },
  { pattern: /\b(c\s*o\s*o|xi\s*ô\s*ô)\b/gi, replacement: 'COO' },

  // Văn bản & nghiệp vụ sản xuất - kho - kế toán
  { pattern: /\b(lệnh\s*sản\s*xuất|lệnh\s*xản\s*xuất)\b/gi, replacement: 'lệnh sản xuất' },
  { pattern: /\b(kế\s*hoạch\s*sản\s*xuất)\b/gi, replacement: 'kế hoạch sản xuất' },
  { pattern: /\b(phiếu\s*xuất\s*kho)\b/gi, replacement: 'phiếu xuất kho' },
  { pattern: /\b(phiếu\s*nhập\s*kho)\b/gi, replacement: 'phiếu nhập kho' },
  { pattern: /\b(biên\s*bản\s*bàn\s*giao)\b/gi, replacement: 'biên bản bàn giao' },
  { pattern: /\b(biên\s*bản\s*nghiệm\s*thu|nghiệm\s*thu\s*công\s*trình)\b/gi, replacement: 'biên bản nghiệm thu' },
  { pattern: /\b(hóa\s*đơn\s*điện\s*tử)\b/gi, replacement: 'hóa đơn điện tử' },
  { pattern: /\b(hóa\s*đơn\s*đỏ|hóa\s*đơn\s*vat)\b/gi, replacement: 'hóa đơn VAT' },
  { pattern: /\b(báo\s*cáo\s*tài\s*chính)\b/gi, replacement: 'báo cáo tài chính' },
  { pattern: /\b(quản\s*lý\s*thuế)\b/gi, replacement: 'quản lý thuế' },
  { pattern: /\b(đối\s*soát\s*công\s*nợ|đối\s*chiếu\s*công\s*nợ)\b/gi, replacement: 'đối soát công nợ' },
  { pattern: /\b(tiêu\s*chuẩn\s*chất\s*lượng)\b/gi, replacement: 'tiêu chuẩn chất lượng' },
  { pattern: /\b(thông\s*số\s*kỹ\s*thuật)\b/gi, replacement: 'thông số kỹ thuật' }
];

// ============================================================================
// 4A. HỌC & CHUYỂN ĐỔI NGÔN NGỮ KINH TẾ - TÀI CHÍNH - CHỨNG KHOÁN (ECONOMY)
// ============================================================================
const ECONOMY_FINANCE_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Các chỉ số vĩ mô & chính sách tiền tệ
  { pattern: /(?<=^|[^\p{L}\p{N}])(xi\s*pi\s*ai|xê\s*pê\s*i|c\s*p\s*i)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'CPI' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(di\s*đi\s*pi|d\s*d\s*p|g\s*d\s*p)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'GDP' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(g\s*n\s*p|gi\s*en\s*pi)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'GNP' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(p\s*m\s*i|pê\s*em\s*i)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'PMI' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(ép\s*đê\s*i|f\s*d\s*i|nguồn\s*vốn\s*fdi)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'FDI' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(ô\s*đê\s*a|o\s*d\s*a)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ODA' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(f\s*i\s*i|ép\s*ai\s*ai)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'FII' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(v[eê]\s*n[oờơ]\s*in\s*đ[eêếé][ct]h?|vn\s*in\s*dex|vi\s*en\s*in\s*đếch)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'VN-Index' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(h[aá]t\s*en\s*[ií]ch|h[aá]t\s*n[oờơ]\s*[ií]ch|hnx\s*in\s*dex)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'HNX-Index' },
  { pattern: /(?<=^|[^\p{L}\p{N}])([uú]p\s*com|[aắ]p\s*com|up\s*com)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'UPCoM' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lạm\s*fát)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lạm phát' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(giảm\s*fát)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'giảm phát' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(nghiệp\s*vụ\s*o\s*m\s*o|thị\s*trường\s*mở\s*omo)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'nghiệp vụ OMO' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lãi\s*suất\s*tái\s*cấp\s*vốn)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lãi suất tái cấp vốn' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lãi\s*suất\s*chiết\s*khấu)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lãi suất chiết khấu' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(tỷ\s*giá\s*trung\s*tâm)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'tỷ giá trung tâm' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(dự\s*trữ\s*ngoại\s*hối)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'dự trữ ngoại hối' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(cán\s*cân\s*thanh\s*toán)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'cán cân thanh toán' },

  // Tài chính doanh nghiệp & Báo cáo tài chính
  { pattern: /(?<=^|[^\p{L}\p{N}])(ai\s*pi\s*ô|ai\s*bi\s*ô|i\s*p\s*o)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'IPO' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(e\s*bít\s*đa|e\s*bít\s*đát|ebit\s*da|e\s*b\s*i\s*t\s*d\s*a)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'EBITDA' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(e\s*bít|e\s*b\s*i\s*t)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'EBIT' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(rốt\s*e|rờ\s*o\s*e|r\s*o\s*e)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ROE' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(rốt\s*ai|rờ\s*o\s*i|r\s*o\s*i)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ROI' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(rốt\s*a|rờ\s*o\s*a|r\s*o\s*a)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ROA' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(rốt\s*ét|rờ\s*o\s*s|r\s*o\s*s)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ROS' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(e\s*pê\s*ét|e\s*p\s*s|e\s*pờ\s*ét)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'EPS' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(pi\s*trên\s*e|pi\s*e|p\s*e)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'P/E' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(pi\s*trên\s*bi|pi\s*bi|p\s*b)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'P/B' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(na\s*vờ|n\s*a\s*v)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'NAV' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(em\s*en\s*a|mờ\s*en\s*a|m\s*&\s*a|sáp\s*nhập\s*m\s*a)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'M&A' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(e\s*xốp|e\s*xóp|e\s*s\s*o\s*p)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ESOP' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(cát\s*phờ\s*lâu|két\s*phờ\s*lâu|cash\s*lâu)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Cash Flow' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đê\s*xê\s*ép|d\s*c\s*f)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'DCF' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(vê\s*xê|v\s*c|quỹ\s*vc)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'VC' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(pê\s*e|p\s*e|quỹ\s*pe)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'quỹ PE' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bích\s*pho|bíc\s*pho|big\s*four)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Big 4' },

  // Giao dịch chứng khoán & Thị trường vốn
  { pattern: /(?<=^|[^\p{L}\p{N}])(mắc\s*gin|ma\s*gin|mác\s*din|mar\s*gin)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'margin' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(côn\s*mắc\s*gin|côn\s*ma\s*gin|call\s*ma\s*gin)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'call margin' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(tê\s*cộng\s*hai\s*phẩy\s*năm|t\s*cộng\s*2\.5)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'T+2.5' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(tê\s*cộng\s*hai|t\s*cộng\s*2)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'T+2' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(tê\s*cộng\s*một|t\s*cộng\s*1)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'T+1' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(áp\s*tren|úp\s*tren|up\s*trend)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'uptrend' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đao\s*tren|đao\s*ren|down\s*trend)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'downtrend' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(sai\s*oay|xai\s*oay|side\s*way)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'sideway' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lệnh\s*a\s*t\s*c|lệnh\s*át\s*c)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lệnh ATC' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lệnh\s*a\s*t\s*o|lệnh\s*át\s*ô)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lệnh ATO' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lệnh\s*m\s*p|lệnh\s*em\s*pi)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lệnh MP' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(lệnh\s*l\s*o|lệnh\s*en\s*ô)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'lệnh LO' },


  // Quản trị doanh nghiệp
  { pattern: /(?<=^|[^\p{L}\p{N}])(đ\s*h\s*đ\s*c\s*đ)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ĐHĐCĐ' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(h\s*đ\s*q\s*t)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'HĐQT' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(b\s*k\s*s)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'BKS' }
];

// ============================================================================
// 4B. HỌC & CHUYỂN ĐỔI NGÔN NGỮ PHÁP LUẬT - HÀNH CHÍNH - TỐ TỤNG (LEGAL)
// ============================================================================
const LEGAL_ADMIN_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Cơ quan tư pháp, chức danh tố tụng
  { pattern: /(?<=^|[^\p{L}\p{N}])(hát\s*đê\s*ích\s*ích|h\s*đ\s*x\s*x)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'HĐXX' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(vi\s*ác|vê\s*y\s*a\s*xê|v\s*i\s*a\s*c)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'VIAC' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(v\s*k\s*s\s*n\s*d)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'VKSND' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(t\s*a\s*n\s*d)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'TAND' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(t\s*h\s*a\s*d\s*s)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'THADS' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thẩm\s*phán\s*chủ\s*tọa)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Thẩm phán chủ tọa' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(hội\s*thẩm\s*nhân\s*dân)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Hội thẩm nhân dân' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(kiểm\s*sát\s*viên)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Kiểm sát viên' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thư\s*ký\s*phiên\s*tòa)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Thư ký phiên tòa' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*sư\s*bào\s*chữa)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật sư bào chữa' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(người\s*bảo\s*vệ\s*quyền\s*và\s*lợi\s*ích\s*hợp\s*pháp)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'người bảo vệ quyền và lợi ích hợp pháp' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(người\s*đại\s*diện\s*theo\s*pháp\s*luật)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'người đại diện theo pháp luật' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(người\s*đại\s*diện\s*theo\s*ủy\s*quyền)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'người đại diện theo ủy quyền' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(người\s*có\s*quyền\s*lợi\s*(?:và\s*)?nghĩa\s*vụ\s*liên\s*quan)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'người có quyền lợi, nghĩa vụ liên quan' },

  // Giai đoạn tố tụng & Phán quyết
  { pattern: /(?<=^|[^\p{L}\p{N}])(bản\s*án\s*sơ\s*thẩm)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'bản án sơ thẩm' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bản\s*án\s*phúc\s*thẩm)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'bản án phúc thẩm' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thủ\s*tục\s*giám\s*đốc\s*thẩm)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'thủ tục giám đốc thẩm' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thủ\s*tục\s*tái\s*thẩm)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'thủ tục tái thẩm' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(kháng\s*cáo\s*bản\s*án)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'kháng cáo bản án' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(kháng\s*nghị\s*bản\s*án)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'kháng nghị bản án' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đình\s*chỉ\s*giải\s*quyết\s*vụ\s*án)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'đình chỉ giải quyết vụ án' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(tạm\s*đình\s*chỉ\s*vụ\s*án)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'tạm đình chỉ vụ án' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(biện\s*pháp\s*khẩn\s*cấp\s*tạm\s*thời)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'biện pháp khẩn cấp tạm thời' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(phán\s*quyết\s*trọng\s*tài)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'phán quyết trọng tài' },

  // Văn bản pháp luật chuyên ngành
  { pattern: /(?<=^|[^\p{L}\p{N}])(bộ\s*luật\s*dân\s*sự)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Bộ luật Dân sự' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bộ\s*luật\s*hình\s*sự)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Bộ luật Hình sự' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bộ\s*luật\s*lao\s*động)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Bộ luật Lao động' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bộ\s*luật\s*tố\s*tụng\s*dân\s*sự)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Bộ luật Tố tụng Dân sự' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bộ\s*luật\s*tố\s*tụng\s*hình\s*sự)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Bộ luật Tố tụng Hình sự' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*doanh\s*nghiệp)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Doanh nghiệp' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*đầu\s*tư)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Đầu tư' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*thương\s*mại)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Thương mại' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*đất\s*đai)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Đất đai' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*nhà\s*ở)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Nhà ở' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*sở\s*hữu\s*trí\s*tuệ)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Sở hữu trí tuệ' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*quản\s*lý\s*thuế)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Quản lý thuế' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*chứng\s*khoán)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Chứng khoán' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(luật\s*đấu\s*thầu)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Luật Đấu thầu' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(t\s*c\s*v\s*n|tiêu\s*chuẩn\s*quốc\s*gia)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'TCVN' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(q\s*c\s*v\s*n|quy\s*chuẩn\s*quốc\s*gia)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'QCVN' },

  // Hợp đồng & Doanh nghiệp
  { pattern: /(?<=^|[^\p{L}\p{N}])(en\s*đi\s*a|n\s*d\s*a)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'NDA' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(e\s*r\s*c|e\s*rờ\s*xê)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ERC' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(i\s*r\s*c|i\s*rờ\s*xê)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'IRC' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(mã\s*số\s*thuế|m\s*s\s*t)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'mã số thuế' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(điều\s*khoản\s*bất\s*khả\s*kháng|phốt\s*ma\s*dơ)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'điều khoản bất khả kháng' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(phạt\s*vi\s*phạm\s*hợp\s*đồng)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'phạt vi phạm hợp đồng' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đơn\s*phương\s*chấm\s*dứt\s*hợp\s*đồng)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'đơn phương chấm dứt hợp đồng' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bồi\s*thường\s*thiệt\s*hại)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'bồi thường thiệt hại' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(hợp\s*đồng\s*vô\s*hiệu)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'hợp đồng vô hiệu' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(hợp\s*đồng\s*nguyên\s*tắc)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'hợp đồng nguyên tắc' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(công\s*chứng\s*viên)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'công chứng viên' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(sao\s*y\s*bản\s*chính)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'sao y bản chính' }
];

// ============================================================================
// 4C. HỌC & CHUYỂN ĐỔI NGÔN NGỮ ĐỜI SỐNG - XÃ HỘI - DỊCH VỤ (LIFE)
// ============================================================================
const LIFE_SOCIAL_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Hành chính công & Định danh điện tử
    { pattern: /(?<=^|[^\p{L}\p{N}])(v[eê]\s*n[eê]\s*y\s*đ[eê]|v\s*n\s*e\s*i\s*d|vi\s*en\s*e\s*i\s*di)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'VNeID' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(c[eê]\s*c[eê]\s*c[eê]\s*đ[eê]|c\s*c\s*c\s*d)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'CCCD' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(c[eê]\s*c[eê]\s*c[eê]\s*đ[eê]\s*gắn\s*(?:chíp|chip)|c\s*c\s*c\s*d\s*gắn\s*(?:chíp|chip))(?=[^\p{L}\p{N}]|$)/giu, replacement: 'CCCD gắn chip' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(định\s*danh\s*điện\s*tử\s*mức\s*(?:hai|2))(?=[^\p{L}\p{N}]|$)/giu, replacement: 'định danh điện tử mức 2' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(định\s*danh\s*điện\s*tử\s*mức\s*(?:một|1))(?=[^\p{L}\p{N}]|$)/giu, replacement: 'định danh điện tử mức 1' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(cổng\s*dịch\s*vụ\s*công\s*quốc\s*gia)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Cổng Dịch vụ công Quốc gia' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bằng\s*lái\s*xe\s*a\s*(?:một|1))(?=[^\p{L}\p{N}]|$)/giu, replacement: 'bằng lái xe A1' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bằng\s*lái\s*xe\s*b\s*(?:hai|2))(?=[^\p{L}\p{N}]|$)/giu, replacement: 'bằng lái xe B2' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bằng\s*lái\s*xe\s*b\s*(?:một|1))(?=[^\p{L}\p{N}]|$)/giu, replacement: 'bằng lái xe B1' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đăng\s*kiểm\s*xe\s*cơ\s*giới)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'đăng kiểm xe cơ giới' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(phạt\s*nguội\s*giao\s*thông|phạt\s*nguội)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'phạt nguội' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đăng\s*ký\s*tạm\s*trú)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'đăng ký tạm trú' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(đăng\s*ký\s*thường\s*trú)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'đăng ký thường trú' },

  // Y tế, Sức khỏe & Bảo hiểm
  { pattern: /(?<=^|[^\p{L}\p{N}])(bê\s*hát\s*y\s*tê|b\s*h\s*y\s*t)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'BHYT' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bê\s*hát\s*ích\s*hát|b\s*h\s*x\s*h)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'BHXH' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(bê\s*hát\s*tê\s*en|b\s*h\s*t\s*n)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'BHTN' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(vê\s*ét\s*ét\s*y\s*đê|v\s*s\s*s\s*i\s*d)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'VssID' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(chụp\s*em\s*rờ\s*ai|chụp\s*em\s*rờ\s*y|m\s*r\s*i)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'chụp MRI' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(chụp\s*xi\s*ti|c\s*t\s*scan\w*)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'chụp CT Scanner' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(siêu\s*âm\s*đốp\s*lơ|siêu\s*âm\s*dop\w*)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'siêu âm Doppler' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(giấy\s*chuyển\s*tuyến\s*bảo\s*hiểm|giấy\s*chuyển\s*viện)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'giấy chuyển viện' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(chỉ\s*số\s*đường\s*huyết)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'chỉ số đường huyết' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(huyết\s*áp\s*tâm\s*thu)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'huyết áp tâm thu' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(huyết\s*áp\s*tâm\s*trương)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'huyết áp tâm trương' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(toa\s*thuốc\s*điện\s*tử)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'toa thuốc điện tử' },

  // Thanh toán, Tiêu dùng, Công nghệ số
  { pattern: /(?<=^|[^\p{L}\p{N}])(quét\s*mã\s*k[ií]u\s*r[oờơ]|quét\s*k[ií]u\s*r[oờơ]|quét\s*mã\s*q\s*r|mã\s*k[ií]u\s*r[oờơ])(?=[^\p{L}\p{N}]|$)/giu, replacement: 'quét mã QR' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(na\s*pát\s*hai\s*tư\s*bảy|na\s*pát\s*24\s*7|n\s*a\s*p\s*a\s*s)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'NAPAS 24/7' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(áp\s*bồ\s*pay|apple\s*pay)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Apple Pay' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(gúc\s*gồ\s*oắt\s*lét|gúc\s*gồ\s*woa\s*lét|google\s*wallet)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'Google Wallet' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(mô\s*mô|ví\s*mo\s*mo)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'MoMo' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(gia\s*lô\s*pay|da\s*lô\s*pay|zalo\s*pay)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ZaloPay' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(su\s*pi\s*pay|sô\s*pi\s*pay|shopee\s*pay)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ShopeePay' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(b\s*n\s*p\s*l)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'BNPL' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thẻ\s*tín\s*dụng\s*quốc\s*tế)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'thẻ tín dụng quốc tế' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thẻ\s*ghi\s*nợ)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'thẻ ghi nợ' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(trả\s*góp\s*không\s*phần\s*trăm|trả\s*góp\s*0\s*phần\s*trăm)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'trả góp 0%' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(giao\s*hàng\s*hỏa\s*tốc)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'giao hàng hỏa tốc' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(thanh\s*toán\s*không\s*tiền\s*mặt)(?=[^\p{L}\p{N}]|$)/giu, replacement: 'thanh toán không tiền mặt' }
];

// ============================================================================
// 4D. BỘ LỌC TỪ NGỮ NHẠY CẢM (SENSITIVE & PROFANITY MASKING WITH ***)
// ============================================================================
/**
 * Danh sách các mẫu regex nhận diện từ ngữ thô tục, bậy bạ, xúc phạm, lăng mạ
 * Tiếng Việt (kể cả viết tắt đm, vcl, cl, l*, c*...) và Tiếng Anh thông dụng.
 * Sử dụng Unicode boundary chuẩn xác để nhận diện mọi ký tự tiếng Việt có dấu.
 */
const SENSITIVE_WORD_PATTERNS: RegExp[] = [
  // Chửi thề đ* / đệ* / đụ / địt
  /(?<=^|[^\p{L}\p{N}])(địt\s*mẹ|địt\s*mợ|địt\s*con\s*mẹ|địt\s*cụ|địt\s*bà|địt\s*nhau|địt)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(đụ\s*má|đụ\s*mẹ|đụ\s*mợ|đụ\s*moẹ|đù\s*má|đù\s*mẹ|đệt\s*mợ|đệt\s*mẹ|đụ)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(đéo|đél|đếch|đách|mịa|mọe|bỏ\s*mẹ|bỏ\s*mợ)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(đ[íìị]t\s*m[ẹéè]|đ[íìị]t|đ[ụù]\s*m[áàẹéè]|đ[ụù])(?=[^\p{L}\p{N}]|$)/giu,

  // Viết tắt chửi bậy: đm, đmm, dkm, đkm, vcl, vkl, vcc, vl...
  /(?<=^|[^\p{L}\p{N}])(đ\.?m\.?m|đ\.?m|d\.?k\.?m|đ\.?k\.?m|d\.?m\.?m|d\.?m|đ\.?c\.?l\.?m|d\.?c\.?l\.?m)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(v\.?c\.?l|v\.?k\.?l|v\.?c\.?c|vl|đbrr|dbrr)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(c\.?m\.?n|c\.?m\.?n\.?r)(?=[^\p{L}\p{N}]|$)/giu,

  // Bộ phận nhạy cảm dùng làm từ chửi thề
  /(?<=^|[^\p{L}\p{N}])(cặc|con\s*cặc|cặk|buồi|con\s*buồi|đầu\s*buồi|dái|bìu\s*dái)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(lồn|lồ̀n|con\s*lồn|lồz|hãm\s*lồn|ngu\s*lồn|mặt\s*lồn)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(vãi\s*lồn|vãi\s*cặc|vãi\s*đái|vãi\s*cứt|vãi\s*lol|vãi\s*cả\s*lồn)(?=[^\p{L}\p{N}]|$)/giu,

  // Lăng mạ, xúc phạm nhân phẩm nặng nề
  /(?<=^|[^\p{L}\p{N}])(mẹ\s*kiếp|chó\s*chết|chó\s*đẻ|đồ\s*chó|đồ\s*khốn|khốn\s*nạn|khốn\s*khiếp)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(súc\s*vật|óc\s*chó|óc\s*lợn|ngu\s*như\s*chó|ngu\s*như\s*bò|mất\s*dạy)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(đĩ|con\s*đĩ|đĩ\s*thõa|đĩ\s*điếm|cave|gái\s*bao|dâm\s*đãng|dâm\s*tặc|ấu\s*dâm)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(bố\s*mày|mẹ\s*mày|tiên\s*sư\s*bố|mả\s*mẹ|mả\s*cha)(?=[^\p{L}\p{N}]|$)/giu,

  // Biến thể lách bộ lọc dùng dấu sao hoặc chấm: đ*m, c*c, l*n...
  /(?<=^|[^\p{L}\p{N}])([đd]\*+[mkt]|[vc]\*+[lc]|[cl]\*+[nc]|b\*+[ui])(?=[^\p{L}\p{N}]|$)/giu,

  // Tiếng Anh thông dụng
  /(?<=^|[^\p{L}\p{N}])(mother\s*fucker|motherfucker|fucker|fucking|fuck|f\*ck)(?=[^\p{L}\p{N}]|$)/giu,
  /(?<=^|[^\p{L}\p{N}])(bullshit|shit|bitch|bastard|asshole|dick|pussy|cunt)(?=[^\p{L}\p{N}]|$)/giu
];

/**
 * Che từ ngữ nhạy cảm bằng dấu hoa thị `***` hoặc `[***]`
 */
export function maskSensitiveWords(text: string, options: SensitiveMaskOptions = {}): string {
  if (!text) return '';
  const repl = options.style === 'bracket_asterisks' ? '[***]' : (options.replacement || '***');
  let result = text;
  for (const pattern of SENSITIVE_WORD_PATTERNS) {
    result = result.replace(pattern, repl);
  }
  return result;
}

/**
 * Kiểm tra xem chuỗi văn bản có chứa từ ngữ nhạy cảm hay không
 */
export function hasSensitiveWords(text: string): boolean {
  if (!text) return false;
  return SENSITIVE_WORD_PATTERNS.some(pat => pat.test(text));
}

/**
 * Phát hiện danh sách các từ ngữ nhạy cảm trong văn bản (dùng cho thanh tra / kiểm duyệt)
 */
export function detectSensitiveWords(text: string): Array<{ word: string; index: number }> {
  if (!text) return [];
  const found: Array<{ word: string; index: number }> = [];
  for (const pattern of SENSITIVE_WORD_PATTERNS) {
    const rx = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = rx.exec(text)) !== null) {
      found.push({ word: match[0], index: match.index });
    }
  }
  return found;
}

// 5. Chuẩn hóa số đếm, phần trăm, tiền tệ, ngày giờ & đo lường theo chuẩn hành chính (ITN)
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
  { pattern: /\b(\d+)\s*phần\s*trăm\b/gi, replacement: '$1%' },

  // Số thập phân tiếng Việt (phẩy / dấu phẩy -> số thập phân, ví dụ: sáu phẩy năm -> 6,5)
  {
    pattern: /(?<=^|[^\p{L}\p{N}])(không|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|\d+)\s*(?:phẩy|,)\s*(không|một|hai|ba|bốn|năm|sáu|bảy|tám|chín|\d+)(?=[^\p{L}\p{N}]|$)/giu,
    replacement: (_match: string, a: string, b: string) => {
      const numMap: Record<string, string> = {
        'không': '0', 'một': '1', 'hai': '2', 'ba': '3', 'bốn': '4',
        'năm': '5', 'sáu': '6', 'bảy': '7', 'tám': '8', 'chín': '9'
      };
      const left = numMap[a.toLowerCase()] || a;
      const right = numMap[b.toLowerCase()] || b;
      return `${left},${right}`;
    }
  },

  // Tiền tệ & Đơn vị tài chính
  // Tách dính chữ sau đơn vị tiền tệ TRƯỚC (ví dụ: 'đồngnhé', 'triệunhé', 'tỷnhé')
  { pattern: /(đồng|triệu|tỷ)(nhé|nha|nhỉ|đấy|đó|rồi|ạ|này)(?=[^\p{L}\p{N}]|$)/giu, replacement: '$1 $2' },

  // Tỷ viết bằng chữ
  {
    pattern: /(?<=^|[^\p{L}\p{N}])(một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười)\s*tỷ(?:\s*(?:đồng|đ|vnd|vnđ))?(?=[^\p{L}\p{N}]|$)/giu,
    replacement: (_: string, num: string) => {
      const map: Record<string, string> = {
        'một': '1', 'hai': '2', 'ba': '3', 'bốn': '4', 'năm': '5',
        'sáu': '6', 'bảy': '7', 'tám': '8', 'chín': '9', 'mười': '10'
      };
      return `${map[num.toLowerCase()] || num} tỷ đồng`;
    }
  },

  // Tiền tệ dạng số (khắc phục triệt để lỗi nuốt khoảng trắng dính chữ 'đồngnhé')
  { pattern: /(?<=^|[^\p{L}\p{N}])(\d+)\s*(?:triệu|tr)(?:\s*(?:đồng|đ|vnd|vnđ))?(?=[^\p{L}\p{N}]|$)/giu, replacement: '$1 triệu đồng' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(\d+)\s*(?:tỷ|tiền\s*tỷ)(?:\s*(?:đồng|đ|vnd|vnđ))?(?=[^\p{L}\p{N}]|$)/giu, replacement: '$1 tỷ đồng' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(\d+)\s*(?:nghìn|ngàn|k)(?:\s*(?:đồng|đ|vnd|vnđ))(?=[^\p{L}\p{N}]|$)/giu, replacement: '$1.000 đ' },
  { pattern: /\bmột\s*triệu(?:\s*đồng)?\b/gi, replacement: '1.000.000 đ' },
  { pattern: /\bhai\s*triệu(?:\s*đồng)?\b/gi, replacement: '2.000.000 đ' },
  { pattern: /\bba\s*triệu(?:\s*đồng)?\b/gi, replacement: '3.000.000 đ' },
  { pattern: /\bnăm\s*triệu(?:\s*đồng)?\b/gi, replacement: '5.000.000 đ' },
  { pattern: /\bmười\s*triệu(?:\s*đồng)?\b/gi, replacement: '10.000.000 đ' },
  { pattern: /\bnăm\s*trăm\s*nghìn(?:\s*đồng)?\b/gi, replacement: '500.000 đ' },
  { pattern: /\bhai\s*trăm\s*nghìn(?:\s*đồng)?\b/gi, replacement: '200.000 đ' },
  { pattern: /\bmột\s*trăm\s*nghìn(?:\s*đồng)?\b/gi, replacement: '100.000 đ' },
  { pattern: /\bnăm\s*mươi\s*nghìn(?:\s*đồng)?\b/gi, replacement: '50.000 đ' },

  // Ngày tháng: tháng 05 -> tháng 5, ngày 05 -> ngày 5
  { pattern: /(?<=^|[^\p{L}\p{N}])tháng\s*0([1-9])(?=[^\p{L}\p{N}]|$)/giu, replacement: 'tháng $1' },
  { pattern: /(?<=^|[^\p{L}\p{N}])ngày\s*0([1-9])(?=[^\p{L}\p{N}]|$)/giu, replacement: 'ngày $1' },

  // Đơn vị đo lường kỹ thuật
  { pattern: /\b(\d+)\s*(?:mét\s*vuông|m\s*vuông)\b/gi, replacement: '$1 m²' },
  { pattern: /\b(\d+)\s*(?:mét\s*khối|m\s*khối)\b/gi, replacement: '$1 m³' },
  { pattern: /\b(\d+)\s*(?:ki\s*lô\s*gam|ki\s*lô|kí|cân)\b/gi, replacement: '$1 kg' },
  { pattern: /\b(\d+)\s*(?:ki\s*lô\s*mét|cây\s*số)\b/gi, replacement: '$1 km' },
  { pattern: /\b(\d+)\s*(?:mi\s*li\s*mét)\b/gi, replacement: '$1 mm' },
  { pattern: /\b(\d+)\s*(?:xen\s*ti\s*mét|phân)\b/gi, replacement: '$1 cm' },
  { pattern: /\b(\d+)\s*(tấn|tạ|yến|lít)\b/gi, replacement: '$1 $2' },

  // Năm
  { pattern: /\bnăm\s*(?:hai\s*nghìn\s*không\s*trăm\s*hai\s*mươi\s*sáu|hai\s*không\s*hai\s*sáu|hai\s*mươi\s*hai\s*sáu)\b/gi, replacement: 'năm 2026' },
  { pattern: /\bnăm\s*(?:hai\s*nghìn\s*không\s*trăm\s*hai\s*mươi\s*lăm|hai\s*không\s*hai\s*lăm)\b/gi, replacement: 'năm 2025' },
  { pattern: /\bnăm\s*(?:hai\s*nghìn\s*không\s*trăm\s*hai\s*mươi\s*bốn|hai\s*không\s*hai\s*bốn)\b/gi, replacement: 'năm 2024' },

  // Thời gian giờ phút
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(?:rưỡi|30|ba\s*mươi)\s*(?:phút)?\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:30` },
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(15|mười\s*lăm)\s*(?:phút)?\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:15` },
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(45|bốn\s*(?:mươi\s*)?lăm)\s*(?:phút)?\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:45` },
  { pattern: /\b(0?[1-9]|1[0-9]|2[0-3])\s*giờ\s*(?:đúng|tròn)\b/gi, 
    replacement: (_: any, h: string) => `${String(h).padStart(2, '0')}:00` },

  // Quý trong năm
  { pattern: /\bquý\s*(?:một|1|i)\b/gi, replacement: 'Quý I' },
  { pattern: /\bquý\s*(?:hai|2|ii)\b/gi, replacement: 'Quý II' },
  { pattern: /\bquý\s*(?:ba|3|iii)\b/gi, replacement: 'Quý III' },
  { pattern: /\bquý\s*(?:bốn|4|iv)\b/gi, replacement: 'Quý IV' },

  // Điều, Khoản, Mục
  { pattern: /\bđiều\s*(\d+)\b/gi, replacement: 'Điều $1' },
  { pattern: /\bkhoản\s*(\d+)\b/gi, replacement: 'Khoản $1' },
  { pattern: /\bmục\s*(\d+)\b/gi, replacement: 'Mục $1' },
  { pattern: /\bphần\s*(\d+)\b/gi, replacement: 'Phần $1' },

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

// 6. Khử lỗi phát âm méo tiếng khi nói nhanh hoặc lẫn lộn phương ngữ thực tế
const SPOKEN_COLLOQUIAL_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Lỗi l/n miền Bắc
  { pattern: /\b(thế\s*này\s*này|thế\s*lày)\b/gi, replacement: 'thế này' },
  { pattern: /\b(như\s*lày)\b/gi, replacement: 'như này' },
  { pattern: /\b(khi\s*lào)\b/gi, replacement: 'khi nào' },
  { pattern: /\b(lăng\s*suất)\b/gi, replacement: 'năng suất' },
  { pattern: /\b(lăng\s*lượng)\b/gi, replacement: 'năng lượng' },
  { pattern: /\b(lói\s*chung)\b/gi, replacement: 'nói chung' },
  { pattern: /\b(lói\s*chuyện)\b/gi, replacement: 'nói chuyện' },
  { pattern: /\b(lăm\s*nay)\b/gi, replacement: 'năm nay' },
  { pattern: /\b(lăm\s*ngoái)\b/gi, replacement: 'năm ngoái' },
  { pattern: /\b(nàm\s*sao)\b/gi, replacement: 'làm sao' },
  { pattern: /\b(nàm\s*gì)\b/gi, replacement: 'làm gì' },
  { pattern: /\b(liên\s*nạc)\b/gi, replacement: 'liên lạc' },

  // Lỗi chính tả âm học phụ âm đầu thường gặp
  { pattern: /\b(sử\s*lý)\b/gi, replacement: 'xử lý' },
  { pattern: /\b(xản\s*xuất)\b/gi, replacement: 'sản xuất' },
  { pattern: /\b(sơ\s*xuất|xơ\s*suất)\b/gi, replacement: 'sơ suất' },
  { pattern: /\b(chính\s*xách)\b/gi, replacement: 'chính sách' },
  { pattern: /\b(chách\s*nhiệm)\b/gi, replacement: 'trách nhiệm' },
  { pattern: /\b(chuyển\s*khai)\b/gi, replacement: 'triển khai' },
  { pattern: /\b(dõ\s*ràng)\b/gi, replacement: 'rõ ràng' },
  { pattern: /\b(rải\s*quyết)\b/gi, replacement: 'giải quyết' },
  { pattern: /\b(dán\s*tiếp)\b/gi, replacement: 'gián tiếp' },
  { pattern: /\b(dấn\s*đề)\b/gi, replacement: 'vấn đề' },
];

// 7. Từ đệm khi nói (được giữ nguyên để phản ánh trung thực lời nói của người dùng)
const SPEECH_FILLER_RULES: Array<{ pattern: RegExp; replacement: string }> = [];

// 7B. Nhận diện các điểm khuyết âm, âm thanh bị nghẽn/không rõ nghĩa hoặc gián đoạn giữa các ý -> chèn dấu ba chấm (...)
const INAUDIBLE_OR_GAP_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\b(nghe\s*không\s*rõ|không\s*nghe\s*rõ|chỗ\s*này\s*không\s*rõ|chưa\s*nghe\s*rõ|không\s*rõ\s*tiếng)\b/gi, replacement: ' ... ' },
  { pattern: /(?:\[\s*(?:unclear|inaudible|không\s*rõ|nhiễu)\s*\]|\(\s*(?:unclear|inaudible|không\s*rõ)\s*\)|\?{3,})/gi, replacement: ' ... ' },
  { pattern: /%hesitation%/gi, replacement: ' ... ' },
  // Lặp từ ngắc ngứ (Stuttering / Repetition): "cái này cái này" -> "cái này ... cái này"
  { pattern: /(?<=^|[^\p{L}\p{N}])(cái\s*này)\s+(cái\s*này)(?=[^\p{L}\p{N}]|$)/giu, replacement: '$1 ... $2' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(cái|thì|là|này|đang|tôi|mình)\s+\1(?=[^\p{L}\p{N}]|$)/giu, replacement: '$1 ... $1' },
  { pattern: /(?<=^|[^\p{L}\p{N}])(ờ|ừm|à\s*thì|ờm|ơ\s*kìa|ừ\s*thì)(?=[^\p{L}\p{N}]|$)/giu, replacement: ' ... ' }
];

// 8. Tự động chèn dấu phẩy sau các liên từ và trạng ngữ chuyển ý trong giao tiếp/hội họp
const TRANSITION_DISCOURSE_MARKERS = [
  'tuy nhiên',
  'vì vậy',
  'do đó',
  'cho nên',
  'ngoài ra',
  'hơn nữa',
  'mặt khác',
  'tóm lại',
  'kết luận là',
  'thứ nhất',
  'thứ hai',
  'thứ ba',
  'thứ tư',
  'thứ năm',
  'ví dụ như',
  'chẳng hạn như',
  'cụ thể là',
  'theo tôi',
  'theo em',
  'theo anh',
  'trước hết',
  'đồng thời',
  'hình như',
  'ngược lại',
  'nói chung là',
  'tổng kết lại'
];

// 9. Các từ kết thúc biểu thị câu hỏi trong văn nói tiếng Việt
const QUESTION_ENDINGS = [
  'phải không',
  'đúng không',
  'được không',
  'được chưa',
  'xong chưa',
  'chuẩn chưa',
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
  'ai vậy',
  'là gì',
  'cái gì',
  'mấy giờ',
  'mấy cái',
  'bao nhiêu',
  'bao lâu',
  'bao xa',
  'làm sao',
  'ra sao',
  'thế nào rồi',
  'như thế nào',
  'ổn không',
  'được chứ',
  'phải chăng',
  'có không',
  'biết không',
  'ok không',
  'được ko',
  'phải ko',
  'đúng ko'
];

// 10. Các cụm từ bắt đầu câu hỏi tiếng Việt (Question Starters)
const QUESTION_STARTERS_REGEX = /^(tại\s*sao|vì\s*sao|làm\s*sao|có\s*phải|bao\s*giờ|khi\s*nào|ai\s*là|ai\s*sẽ|ai\s*chịu|liệu\s*có|bao\s*nhiêu|mấy\s*giờ|làm\s*thế\s*nào|có\s*cách\s*nào|cho\s*hỏi|xin\s*hỏi)\b/i;

/**
 * Tự động chèn dấu phẩy hợp lý sau các cụm từ chuyển tiếp mở đầu câu
 */
function insertSmartDiscourseCommas(text: string): string {
  let res = text;
  for (const marker of TRANSITION_DISCOURSE_MARKERS) {
    const regex = new RegExp(`(^|[.?!\\n]\\s*)(${marker})(?![,.?!:;])\\s+`, 'gi');
    res = res.replace(regex, (_m, prefix, match) => `${prefix}${match}, `);
  }
  return res;
}

/**
 * Tự động chèn dấu câu tự nhiên cho văn bản thoại tiếng Việt
 * Tôn trọng 100% nguyên văn lời nói, không tự ý sửa từ ngữ hay cắt xén nội dung
 */
export function insertNaturalVietnamesePunctuation(text: string): string {
  if (!text) return '';
  let res = text;

  // 1. Nhận diện các câu hỏi giữa dòng (Mid-sentence Questions)
  // Khi gặp các cụm từ nghi vấn hỏi lựa chọn hoặc thắc mắc:
  // "nên lấy cái nào", "chọn cái nào", "ở đâu", "như thế nào", "làm sao bây giờ", "để làm gì", "nghĩa là gì"...
  res = res.replace(
    /(?<=^|[^\p{L}\p{N}])(nên\s*lấy\s*cái\s*nào|chọn\s*cái\s*nào|lấy\s*cái\s*nào|ở\s*đâu|như\s*thế\s*nào|làm\s*sao\s*bây\s*giờ|để\s*làm\s*gì|nghĩa\s*là\s*gì)\s+([a-zA-ZÀ-ỹ])/giu,
    '$1? $2'
  );

  // Nhận diện tiểu từ nghi vấn băn khoăn: "ý nhỉ", "nhỉ", "sao nhỉ", "thế nhỉ", "hả"
  res = res.replace(
    /(?<=^|[^\p{L}\p{N}])(ý\s*nhỉ|nhỉ|sao\s*nhỉ|thế\s*nhỉ|hả\s*(?:anh|chị|em|bạn)?)\s+([a-zA-ZÀ-ỹ])/giu,
    '$1? $2'
  );

  // 2. Nhận diện câu hỏi đuôi (Tag questions) ở cuối câu hoặc giữa chừng
  // "...kia, đúng không?" / "..., phải không?"
  res = res.replace(/(?<=^|[^\p{L}\p{N}])(đúng\s*không|phải\s*không|được\s*không|phải\s*chăng)\s*\??$/giu, ', $1?');
  res = res.replace(/(?<=^|[^\p{L}\p{N}])(đúng\s*không|phải\s*không|được\s*không)\s+([a-zA-ZÀ-ỹ])/giu, ', $1? $2');

  // 3. Tự động chèn dấu chấm (.) sau các tiểu từ kết thúc ý câu khi đứng trước một ý mới
  // Khi người nói dùng "nhé", "nha", "đấy", "đó", "rồi", "xong", "luôn", "ạ"
  // và từ tiếp theo là khởi đầu của một mệnh đề hoặc chủ ngữ mới
  const nextThoughtStarters = 'Thứ\\s*(?:nhất|hai|ba|tư|năm)|Lúc|Khi|Hiện\\s*tại|Bây\\s*giờ|Mặt\\s*khác|Hình\\s*như|Chúng\\s*tôi|Chúng\\s*ta|Tôi|Mình|Anh|Chị|Em|Tất\\s*cả|Văn\\s*bản|Hợp\\s*đồng|Báo\\s*cáo|[A-ZÀ-Ỹ]';
  res = res.replace(new RegExp(`(?<=^|[^\\p{L}\\p{N}])(nhé|nha|nhớ|ạ)\\s+(${nextThoughtStarters})`, 'gu'), '$1. $2');
  res = res.replace(new RegExp(`(?<=^|[^\\p{L}\\p{N}])(đấy|đó)\\s+(${nextThoughtStarters})`, 'gu'), '$1. $2');
  res = res.replace(new RegExp(`(?<=^|[^\\p{L}\\p{N}])(rồi|xong)\\s+(${nextThoughtStarters})`, 'gu'), '$1. $2');
  res = res.replace(new RegExp(`(?<=^|[^\\p{L}\\p{N}])(luôn)\\s+(${nextThoughtStarters})`, 'gu'), '$1. $2');

  // 4. Tự động chèn dấu phẩy (,) trước các liên từ liên kết câu / vế khi mệnh đề trước có >= 3 từ
  res = res.replace(/(\b[\p{L}\p{N}]+\s+[\p{L}\p{N}]+\s+[\p{L}\p{N}]+)\s+(nhưng|tuy\s*nhiên|song)\s+/giu, '$1, $2 ');
  res = res.replace(/(\b[\p{L}\p{N}]+\s+[\p{L}\p{N}]+\s+[\p{L}\p{N}]+)\s+(vì\s*vậy|do\s*đó|cho\s*nên|đồng\s*thời|ngoài\s*ra|hơn\s*nữa|mặt\s*khác)\s+/giu, '$1, $2 ');
  res = res.replace(/(\b[\p{L}\p{N}]+\s+[\p{L}\p{N}]+\s+[\p{L}\p{N}]+)\s+(bây\s*giờ|hiện\s*tại)\s+([a-zA-ZÀ-ỹ]+)/giu, '$1, $2 $3');

  return res;
}

/**
 * Xử lý văn bản thô từ giọng nói theo thời gian thực:
 * - Chuẩn hóa Unicode NFC
 * - Chuyển đổi khẩu lệnh dấu câu
 * - Áp dụng từ điển Kinh tế, Pháp luật, Đời sống theo chuyên ngành lựa chọn
 * - Áp dụng chuẩn hóa số đếm, phần trăm, giờ phút (ITN)
 * - Khử lỗi phát âm nói nhanh và dịch chuẩn từ mượn
 * - Lọc & che dấu từ ngữ nhạy cảm bằng `***` (nếu bật maskSensitive)
 * - Tự động nhận diện ranh giới mệnh đề và câu hỏi giữa dòng
 * - Tự động chèn dấu phẩy sau các trạng từ chuyển ý
 * - Nhận diện ngữ điệu câu hỏi tiếng Việt (cả từ kết thúc và từ bắt đầu câu hỏi)
 * - Chuẩn hóa khoảng cách xung quanh dấu câu và dấu ba chấm (...)
 * - Viết hoa chữ cái đầu câu và sau ngắt dòng
 */
export function processRealtimeSpeechPunctuation(
  rawText: string,
  optionsOrIsFinal: boolean | PunctuationEngineOptions = true
): string {
  if (!rawText) return '';

  const opts: PunctuationEngineOptions = typeof optionsOrIsFinal === 'boolean'
    ? { isFinal: optionsOrIsFinal, maskSensitive: true, domainMode: 'all' }
    : { isFinal: true, maskSensitive: true, domainMode: 'all', ...optionsOrIsFinal };

  // 1. Chuẩn hóa Unicode chuẩn dựng sẵn NFC
  let text = rawText.normalize('NFC').trim();
  if (!text) return '';

  // 2. Chuyển đổi khẩu lệnh dấu câu đọc bằng lời nói thực tế (chấm, phẩy, xuống dòng...)
  for (const rule of SPOKEN_PUNCTUATION_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 3. Khử lỗi phát âm méo tiếng khi nói nhanh hoặc lẫn lộn l/n, phụ âm đầu, phương ngữ
  for (const rule of SPOKEN_COLLOQUIAL_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 4. Chuẩn hóa từ mượn tiếng Anh công sở / công nghệ
  for (const rule of LOANWORD_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 5. Chuẩn hóa thuật ngữ đặc thù doanh nghiệp AVG One
  for (const rule of ENTERPRISE_TERMS_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 6. Học & Chuyển đổi ngôn ngữ chuyên ngành: Kinh tế, Pháp luật, Đời sống
  const dMode = opts.domainMode || 'all';

  if (dMode === 'all' || dMode === 'economy') {
    for (const rule of ECONOMY_FINANCE_RULES) {
      text = text.replace(rule.pattern, rule.replacement);
    }
  }

  if (dMode === 'all' || dMode === 'legal') {
    for (const rule of LEGAL_ADMIN_RULES) {
      text = text.replace(rule.pattern, rule.replacement);
    }
  }

  if (dMode === 'all' || dMode === 'life') {
    for (const rule of LIFE_SOCIAL_RULES) {
      text = text.replace(rule.pattern, rule.replacement);
    }
  }

  // 7. Chuẩn hóa số đếm, phần trăm, tiền tệ, ngày giờ, đơn vị đo lường (ITN)
  for (const rule of ITN_RULES) {
    text = typeof rule.replacement === 'function'
      ? text.replace(rule.pattern, rule.replacement as any)
      : text.replace(rule.pattern, rule.replacement);
  }

  // 8. Lọc các từ đệm ngập ngừng thừa thãi
  for (const rule of SPEECH_FILLER_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 8B. Xử lý các điểm âm thanh nghẽn, khuyết thông tin hoặc đứt quãng -> chèn dấu ba chấm (...)
  for (const rule of INAUDIBLE_OR_GAP_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 9. Lọc từ ngữ nhạy cảm nếu tính năng được bật (mặc định BẬT)
  if (opts.maskSensitive !== false) {
    text = maskSensitiveWords(text, { style: opts.sensitiveMaskStyle || 'asterisks' });
  }

  // 10. Tự động nhận diện ranh giới câu, ngữ điệu câu hỏi giữa dòng và liên từ chuyển tiếp
  text = insertNaturalVietnamesePunctuation(text);
  text = insertSmartDiscourseCommas(text);

  // 11. Chuẩn hóa khoảng cách quanh dấu câu và dấu ba chấm:
  text = text.replace(/\s*\.{3,}\s*/g, ' ... ');
  text = text.replace(/\s*…\s*/g, ' ... ');
  text = text.replace(/\s+([,?!:;%])/g, '$1');
  text = text.replace(/\s+(?<!\.)\.(?!\.)/g, '.');
  text = text.replace(/([,?!:;%]|(?<!\.)\.(?!\.))(?=[^\s\d\n)\]}])/g, '$1 ');
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  text = text.replace(/"\s+/g, '"').replace(/\s+"/g, '"');
  text = text.replace(/\s{2,}/g, ' ');

  // 12. Nếu là câu chốt (final), kiểm tra xem có phải câu hỏi không
  if (opts.isFinal) {
    const trimmed = text.trim();
    if (!/[.?!…]$/.test(trimmed) && !trimmed.endsWith('...')) {
      const lower = trimmed.toLowerCase();
      const hasQuestionEnding = QUESTION_ENDINGS.some(ending => {
        return lower.endsWith(ending) || lower.endsWith(ending + ',');
      });
      const hasQuestionStarter = QUESTION_STARTERS_REGEX.test(lower);

      if (hasQuestionEnding || hasQuestionStarter) {
        text = trimmed.replace(/,\s*$/, '') + '?';
      } else {
        const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
        if (wordCount >= 3 && !trimmed.endsWith(':') && !trimmed.endsWith(',')) {
          text = trimmed + '.';
        }
      }
    }
  }

  // 13. Viết hoa chữ cái đầu tiên và sau các dấu chấm/chấm hỏi/chấm than/xuống dòng
  text = autoCapitalizeSentences(text);

  // 14. Tự động tách đoạn nếu chứa các ý dài hoàn chỉnh (Paragraph Segmentation)
  if (opts.isFinal) {
    text = formatParagraphSegmentation(text, 28);
  }

  // Đảm bảo sau khi viết hoa các từ nhạy cảm vẫn được ẩn sạch sẽ
  if (opts.maskSensitive !== false) {
    text = maskSensitiveWords(text, { style: opts.sensitiveMaskStyle || 'asterisks' });
  }

  return text.trim();
}

/**
 * Tự động phân đoạn văn bản (Paragraph Segmentation):
 * - Giữ nguyên các điểm ngắt đoạn do khẩu lệnh ("xuống đoạn", "ngắt đoạn", "đoạn mới" -> \n\n)
 * - Tự động tách đoạn khi một ý/câu hoàn chỉnh (. ? !) đạt độ dài phù hợp (25-35 từ)
 * - Bảo toàn nguyên vẹn dấu ba chấm (...) giữa câu không bị tách vụn
 * giúp văn bản trình bày rõ ràng, khoa học, dễ đọc như phụ đề trực tiếp
 */
export function formatParagraphSegmentation(text: string, wordsPerParagraph: number = 28): string {
  if (!text) return '';

  const paragraphs = text.split(/\n\s*\n/);
  const formattedParagraphs: string[] = [];

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;

    // Không tách đoạn ở giữa dấu ba chấm (...)
    const sentences = trimmedPara.split(/(?<=(?<!\.)[.?!])\s+/).filter(Boolean);
    if (sentences.length <= 1) {
      formattedParagraphs.push(trimmedPara);
      continue;
    }

    let currentChunk: string[] = [];
    let currentWordCount = 0;

    for (const sent of sentences) {
      const sentWords = sent.split(/\s+/).filter(Boolean).length;
      if (currentChunk.length > 0 && (currentWordCount + sentWords > wordsPerParagraph)) {
        formattedParagraphs.push(currentChunk.join(' '));
        currentChunk = [sent];
        currentWordCount = sentWords;
      } else {
        currentChunk.push(sent);
        currentWordCount += sentWords;
      }
    }

    if (currentChunk.length > 0) {
      formattedParagraphs.push(currentChunk.join(' '));
    }
  }

  return formattedParagraphs.join('\n\n');
}

/**
 * Tự động viết hoa đầu câu, sau dấu chấm, chấm hỏi, chấm than và sau ngắt dòng
 * Không viết hoa sau dấu ba chấm (...) giữa chừng
 */
export function autoCapitalizeSentences(text: string): string {
  if (!text) return '';

  let result = text.charAt(0).toUpperCase() + text.slice(1);

  result = result.replace(/(^|(?<!\.)[.?!]\s+)([a-zà-ỹ])/gu, (_, p1, p2) => p1 + p2.toUpperCase());
  result = result.replace(/(\n\s*[-*]?\s*)([a-zà-ỹ])/gu, (_, p1, p2) => p1 + p2.toUpperCase());

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

  const lineBlocks = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  const allSegments: string[] = [];

  for (const block of lineBlocks) {
    const rawSentences = block
      .split(/(?<=[.?!;])\s+/)
      .map(s => s.trim())
      .filter(Boolean);

    for (const sentence of rawSentences) {
      const words = sentence.split(' ').filter(Boolean);

      if (words.length <= maxWords) {
        allSegments.push(autoCapitalizeSentences(sentence));
        continue;
      }

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
 * Ghép nối hai đoạn văn bản liên tiếp mà không bị lặp từ / lặp câu (Deduplication & Overlap Merging)
 */
export function mergeSpeechWithoutOverlap(prevText: string, newText: string): string {
  const prev = prevText.trim();
  const next = newText.trim();

  if (!prev) return next;
  if (!next) return prev;

  const stripPunct = (s: string) =>
    s.toLowerCase().replace(/[,.?!:;…"'\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  const prevNorm = stripPunct(prev);
  const nextNorm = stripPunct(next);

  // Nội dung hoàn toàn giống nhau -> giữ prev
  if (prevNorm === nextNorm) {
    return prev;
  }

  // Câu mới là bản mở rộng bắt đầu bằng câu cũ -> nhận câu mới
  if (nextNorm.startsWith(prevNorm) && prevNorm.length >= 4) {
    return next;
  }

  // Đuôi câu cũ giống hệt câu mới và câu mới chỉ có 1 từ ngắn (hiện tượng dội âm)
  if (prevNorm.endsWith(nextNorm) && nextNorm.split(' ').length <= 1) {
    return prev;
  }

  // Kiểm tra overlap giữa đuôi câu trước và đầu câu sau (từ 2 đến 15 từ)
  const prevWords = prev.split(/\s+/);
  const nextWords = next.split(/\s+/);
  const prevNormWords = prevWords.map(w => stripPunct(w)).filter(Boolean);
  const nextNormWords = nextWords.map(w => stripPunct(w)).filter(Boolean);

  let maxOverlap = 0;
  const maxCheck = Math.min(prevNormWords.length, nextNormWords.length, 15);

  for (let k = maxCheck; k >= 2; k--) {
    const prevSuffix = prevNormWords.slice(prevNormWords.length - k).join(' ');
    const nextPrefix = nextNormWords.slice(0, k).join(' ');
    if (prevSuffix === nextPrefix && prevSuffix.length >= 6) {
      maxOverlap = k;
      break;
    }
  }

  if (maxOverlap > 0) {
    const remainingWords = nextWords.slice(maxOverlap).join(' ').trim();
    if (!remainingWords) return prev;
    const separator = prev.endsWith('\n') ? '' : ' ';
    return `${prev}${separator}${remainingWords}`;
  }

  // Nếu câu trước kết thúc bằng dấu ngắt câu hoàn chỉnh (. ? !)
  if (/[.?!]$/.test(prev)) {
    return `${prev} ${next}`;
  }

  // Nếu câu trước đã có dấu 3 chấm hoặc chấm lửng ở đuôi
  if (/(?:\.{3,}|…)$/.test(prev)) {
    return `${prev} ${next}`;
  }

  // Nếu câu trước kết thúc bằng dấu ngắt dòng hoặc hai chấm
  if (prev.endsWith('\n') || prev.endsWith(':')) {
    return `${prev} ${next}`;
  }

  // Nếu câu trước có dấu phẩy hoặc chấm phẩy ở cuối
  if (/[,;]$/.test(prev)) {
    const cleanPrev = prev.replace(/[,;]$/, '');
    return `${cleanPrev} ... ${next}`;
  }

  // Nếu câu trước chưa kết thúc hoàn chỉnh (bị xót thông tin, âm thanh nghẽn, ngắt quãng):
  // Tự động chèn dấu ... thể hiện chỗ gián đoạn theo đúng yêu cầu người dùng
  return `${prev} ... ${next}`;
}

/**
 * Khử phần tiền tố bị trùng lặp của câu mới nếu đầu câu mới trùng với đuôi câu trước
 */
export function stripPrefixOverlap(existingText: string, incomingText: string): string {
  const exist = existingText.trim();
  const incoming = incomingText.trim();
  if (!exist || !incoming) return incoming;

  const stripPunct = (s: string) =>
    s.toLowerCase().replace(/[,.?!:;…"'\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  const existWords = exist.split(/\s+/).map(w => stripPunct(w)).filter(Boolean);
  const incomingWords = incoming.split(/\s+/);
  const incomingNormWords = incomingWords.map(w => stripPunct(w)).filter(Boolean);

  let maxOverlap = 0;
  const maxCheck = Math.min(existWords.length, incomingNormWords.length, 60);

  for (let k = maxCheck; k >= 2; k--) {
    const existSuffix = existWords.slice(existWords.length - k).join(' ');
    const incomingPrefix = incomingNormWords.slice(0, k).join(' ');
    if (existSuffix === incomingPrefix && existSuffix.length >= 5) {
      maxOverlap = k;
      break;
    }
  }

  if (maxOverlap === 0 && maxCheck >= 1) {
    const lastExistWord = existWords[existWords.length - 1];
    const firstIncWord = incomingNormWords[0];
    if (lastExistWord === firstIncWord && lastExistWord.length >= 6) {
      maxOverlap = 1;
    }
  }

  if (maxOverlap > 0) {
    const remaining = incomingWords.slice(maxOverlap).join(' ').trim();
    return remaining ? autoCapitalizeSentences(remaining) : '';
  }

  return incoming;
}

/**
 * Kiểm tra xem 2 câu có phải gần như trùng lặp (Near-Duplicate) hay không (độ tương đồng từ >= 85%)
 */
export function isNearDuplicateUtterance(textA: string, textB: string): boolean {
  if (!textA || !textB) return false;
  const clean = (s: string) => s.toLowerCase().replace(/[,.?!:;…"'\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  const normA = clean(textA);
  const normB = clean(textB);
  if (!normA || !normB) return false;

  if (normA === normB) return true;
  if (normA.includes(normB) || normB.includes(normA)) return true;

  const wordsA = normA.split(' ').filter(Boolean);
  const wordsB = normB.split(' ').filter(Boolean);
  if (wordsA.length === 0 || wordsB.length === 0) return false;

  const setA = new Set(wordsA);
  let common = 0;
  for (const w of wordsB) {
    if (setA.has(w)) common++;
  }

  const similarity = (2 * common) / (wordsA.length + wordsB.length);
  return similarity >= 0.85;
}

// ============================================================================
// 11. BẢNG TỪ ĐIỂN THUẬT NGỮ CHUYÊN NGÀNH (DOMAIN GLOSSARY)
// ============================================================================
export const DOMAIN_GLOSSARY: DomainGlossaryItem[] = [
  // Kinh tế - Tài chính
  {
    term: 'GDP / CPI / PMI',
    domain: 'economy',
    domainLabel: 'Kinh tế & Vĩ mô',
    meaning: 'Các chỉ số vĩ mô cốt lõi: Tổng sản phẩm nội địa, Chỉ số giá tiêu dùng, Chỉ số nhà quản trị mua hàng.',
    spokenExamples: ['di đi pi', 'xi pi ai', 'pê em i']
  },
  {
    term: 'VN-Index / HNX-Index',
    domain: 'economy',
    domainLabel: 'Chứng khoán',
    meaning: 'Chỉ số biến động thị trường chứng khoán cơ sở tại HOSE và HNX.',
    spokenExamples: ['vê nờ in đếch', 'hát en ích']
  },
  {
    term: 'EBITDA / ROE / ROI',
    domain: 'economy',
    domainLabel: 'Tài chính doanh nghiệp',
    meaning: 'Lợi nhuận trước lãi vay, thuế, khấu hao; Tỷ suất sinh lời trên vốn chủ sở hữu và trên đầu tư.',
    spokenExamples: ['e bít đa', 'rốt e', 'rốt ai']
  },
  {
    term: 'M&A / IPO / ESOP',
    domain: 'economy',
    domainLabel: 'Đầu tư & Vốn',
    meaning: 'Sáp nhập và mua lại; Chào bán cổ phiếu lần đầu ra công chúng; Phát hành cổ phiếu thưởng cho nhân sự.',
    spokenExamples: ['em en a', 'ai pi ô', 'e xốp']
  },
  {
    term: 'Margin / Call Margin',
    domain: 'economy',
    domainLabel: 'Giao dịch tài chính',
    meaning: 'Đòn bẩy tài chính ký quỹ và yêu cầu bổ sung ký quỹ bắt buộc.',
    spokenExamples: ['ma gin', 'mắc gin', 'côn ma gin']
  },
  {
    term: 'T+2 / T+2.5',
    domain: 'economy',
    domainLabel: 'Chu kỳ thanh toán',
    meaning: 'Thời gian hoàn tất bù trừ và chuyển quyền sở hữu cổ phiếu tại Trung tâm lưu ký VSD.',
    spokenExamples: ['tê cộng hai', 'tê cộng hai phẩy năm']
  },

  // Pháp luật - Hành chính
  {
    term: 'HĐXX / VKSND / TAND',
    domain: 'legal',
    domainLabel: 'Cơ quan tố tụng',
    meaning: 'Hội đồng xét xử, Viện kiểm sát nhân dân, Tòa án nhân dân các cấp.',
    spokenExamples: ['hát đê ích ích', 'viện kiểm sát', 'tòa án']
  },
  {
    term: 'VIAC',
    domain: 'legal',
    domainLabel: 'Trọng tài thương mại',
    meaning: 'Trung tâm Trọng tài Quốc tế Việt Nam - cơ quan giải quyết tranh chấp kinh doanh thương mại.',
    spokenExamples: ['vi ác', 'vê y a xê', 'trọng tài']
  },
  {
    term: 'Nguyên đơn / Bị đơn',
    domain: 'legal',
    domainLabel: 'Đương sự tố tụng',
    meaning: 'Người khởi kiện yêu cầu Tòa bảo vệ quyền lợi và người bị kiện trong vụ án dân sự, thương mại.',
    spokenExamples: ['nguyên đơn', 'bị đơn', 'đương sự']
  },
  {
    term: 'NDA',
    domain: 'legal',
    domainLabel: 'Hợp đồng bảo mật',
    meaning: 'Thỏa thuận bảo mật thông tin kinh doanh, kỹ thuật giữa các đối tác thương mại.',
    spokenExamples: ['en đi a', 'thỏa thuận bảo mật']
  },
  {
    term: 'Bất khả kháng (Force Majeure)',
    domain: 'legal',
    domainLabel: 'Nghiệp vụ hợp đồng',
    meaning: 'Sự kiện khách quan không lường trước được dẫn đến miễn trừ nghĩa vụ bồi thường vi phạm.',
    spokenExamples: ['bất khả kháng', 'phốt ma dơ']
  },
  {
    term: 'Giám đốc thẩm / Tái thẩm',
    domain: 'legal',
    domainLabel: 'Tố tụng đặc biệt',
    meaning: 'Xem xét lại bản án, quyết định đã có hiệu lực pháp luật khi phát hiện vi phạm pháp luật hoặc tình tiết mới.',
    spokenExamples: ['giám đốc thẩm', 'tái thẩm']
  },

  // Đời sống - Xã hội
  {
    term: 'CCCD / VNeID mức 2',
    domain: 'life',
    domainLabel: 'Định danh công dân',
    meaning: 'Thẻ Căn cước công dân gắn chip và Tài khoản Định danh điện tử tích hợp dịch vụ công quốc gia.',
    spokenExamples: ['cê cê cê đê', 'vê nê y đê', 'định danh mức hai']
  },
  {
    term: 'BHYT / BHXH / VssID',
    domain: 'life',
    domainLabel: 'An sinh & Y tế',
    meaning: 'Bảo hiểm y tế, Bảo hiểm xã hội và Ứng dụng số BHXH trên thiết bị di động.',
    spokenExamples: ['bê hát y tê', 'bê hát ích hát', 'vê ét ét y đê']
  },
  {
    term: 'Quét mã QR / NAPAS 24/7',
    domain: 'life',
    domainLabel: 'Thanh toán đời sống',
    meaning: 'Thanh toán tiêu dùng không tiền mặt thông qua mã QR và mạng lưới chuyển mạch quốc gia.',
    spokenExamples: ['quét kiu rờ', 'na pát hai tư bảy']
  },
  {
    term: 'MRI / CT Scanner / Doppler',
    domain: 'life',
    domainLabel: 'Chăm sóc sức khỏe',
    meaning: 'Các kỹ thuật chẩn đoán hình ảnh y khoa hiện đại: cộng hưởng từ, cắt lớp vi tính, siêu âm màu.',
    spokenExamples: ['em rờ ai', 'xi ti', 'đốp lơ']
  },
  {
    term: 'Apple Pay / Google Wallet / MoMo',
    domain: 'life',
    domainLabel: 'Ví & Thẻ số',
    meaning: 'Công nghệ thanh toán chạm một chạm không tiếp xúc và ví điện tử tiêu dùng phổ biến.',
    spokenExamples: ['áp bồ pay', 'gúc gồ oắt lét', 'mô mô', 'gia lô pay']
  }
];

/**
 * Lấy danh sách thuật ngữ chuyên ngành theo phân hệ
 */
export function getDomainGlossary(domain: DomainMode = 'all'): DomainGlossaryItem[] {
  if (domain === 'all') return DOMAIN_GLOSSARY;
  return DOMAIN_GLOSSARY.filter(item => item.domain === domain);
}
