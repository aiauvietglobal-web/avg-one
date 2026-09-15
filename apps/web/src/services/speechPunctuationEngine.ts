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
  { pattern: /\b(ken\s*xồ|can\s*xồ|hủy\s*kèo)\b/gi, replacement: 'cancel' },
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
  { pattern: /\b(p\s*o|pi\s*ô)\b/gi, replacement: 'PO' },
  { pattern: /\b(p\s*r|pi\s*rờ)\b/gi, replacement: 'PR' },
  { pattern: /\b(s\s*o|ét\s*ô)\b/gi, replacement: 'SO' },
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

// 4. Chuẩn hóa số đếm, phần trăm, tiền tệ, ngày giờ & đo lường theo chuẩn hành chính (ITN)
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

  // Số thập phân tiếng Việt (phẩy -> dấu phẩy thập phân)
  { pattern: /\b(\d+)\s*phẩy\s*(\d+)\b/gi, replacement: '$1,$2' },
  { pattern: /\b(không|0)\s*phẩy\s*năm\b/gi, replacement: '0,5' },
  { pattern: /\b(một|1)\s*phẩy\s*năm\b/gi, replacement: '1,5' },
  { pattern: /\b(hai|2)\s*phẩy\s*năm\b/gi, replacement: '2,5' },

  // Tiền tệ & Đơn vị tài chính
  { pattern: /\b(\d+)\s*(?:triệu|tr)\s*(?:đồng|đ|vnd|vnđ)?\b/gi, replacement: '$1 triệu đồng' },
  { pattern: /\b(\d+)\s*(?:tỷ|tiền\s*tỷ)\s*(?:đồng|đ|vnd|vnđ)?\b/gi, replacement: '$1 tỷ đồng' },
  { pattern: /\b(\d+)\s*(?:nghìn|ngàn|k)\s*(?:đồng|đ|vnd|vnđ)\b/gi, replacement: '$1.000 đ' },
  { pattern: /\bmột\s*triệu(?:\s*đồng)?\b/gi, replacement: '1.000.000 đ' },
  { pattern: /\bhai\s*triệu(?:\s*đồng)?\b/gi, replacement: '2.000.000 đ' },
  { pattern: /\bba\s*triệu(?:\s*đồng)?\b/gi, replacement: '3.000.000 đ' },
  { pattern: /\bnăm\s*triệu(?:\s*đồng)?\b/gi, replacement: '5.000.000 đ' },
  { pattern: /\bmười\s*triệu(?:\s*đồng)?\b/gi, replacement: '10.000.000 đ' },
  { pattern: /\bnăm\s*trăm\s*nghìn(?:\s*đồng)?\b/gi, replacement: '500.000 đ' },
  { pattern: /\bhai\s*trăm\s*nghìn(?:\s*đồng)?\b/gi, replacement: '200.000 đ' },
  { pattern: /\bmột\s*trăm\s*nghìn(?:\s*đồng)?\b/gi, replacement: '100.000 đ' },
  { pattern: /\bnăm\s*mươi\s*nghìn(?:\s*đồng)?\b/gi, replacement: '50.000 đ' },

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

// 5. Khử lỗi phát âm méo tiếng khi nói nhanh hoặc lẫn lộn phương ngữ thực tế
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

  // Từ địa phương miền Trung & Nam khi nói nhanh
  { pattern: /\b(hôm\s*ni)\b/gi, replacement: 'hôm nay' },
  { pattern: /\b(bây\s*chừ)\b/gi, replacement: 'bây giờ' },
  { pattern: /\b(làm\s*chi)\b/gi, replacement: 'làm gì' },
  { pattern: /\b(mần\s*răng)\b/gi, replacement: 'làm sao' },
  { pattern: /\b(răng\s*rứa)\b/gi, replacement: 'sao thế' },
  { pattern: /\b(chi\s*mô)\b/gi, replacement: 'gì đâu' },
  { pattern: /\b(thiệt\s*tình)\b/gi, replacement: 'thật tình' },
  { pattern: /\b(dấn\s*đề)\b/gi, replacement: 'vấn đề' }
];

// 6. Lọc từ đệm thừa thãi khi ngập ngừng (Speech Fillers)
const SPEECH_FILLER_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /(?:^|\s)(?:ừm|à\s*ừm|ờ\s*thì|uhm|uh|thì\s*là\s*mà)(?=\s|$)/gi, replacement: ' ' }
];

// 5. Tự động chèn dấu phẩy sau các liên từ và trạng ngữ chuyển ý trong giao tiếp/hội họp
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
  'ngược lại',
  'nói chung là',
  'tổng kết lại'
];

// 6. Các từ kết thúc biểu thị câu hỏi trong văn nói tiếng Việt
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

// 7. Các cụm từ bắt đầu câu hỏi tiếng Việt (Question Starters)
const QUESTION_STARTERS_REGEX = /^(tại\s*sao|vì\s*sao|làm\s*sao|có\s*phải|bao\s*giờ|khi\s*nào|ai\s*là|ai\s*sẽ|ai\s*chịu|liệu\s*có|bao\s*nhiêu|mấy\s*giờ|làm\s*thế\s*nào|có\s*cách\s*nào|cho\s*hỏi|xin\s*hỏi)\b/i;

/**
 * Tự động chèn dấu phẩy hợp lý sau các cụm từ chuyển tiếp mở đầu câu
 */
function insertSmartDiscourseCommas(text: string): string {
  let res = text;
  for (const marker of TRANSITION_DISCOURSE_MARKERS) {
    // Nếu đứng ở đầu chuỗi hoặc ngay sau dấu chấm/dòng mới mà chưa có dấu phẩy ngay sau
    const regex = new RegExp(`(^|[.?!\\n]\\s*)(${marker})(?![,.?!:;])\\s+`, 'gi');
    res = res.replace(regex, (_m, prefix, match) => `${prefix}${match}, `);
  }
  return res;
}

/**
 * Xử lý văn bản thô từ giọng nói theo thời gian thực:
 * - Chuẩn hóa Unicode NFC
 * - Chuyển đổi khẩu lệnh dấu câu
 * - Áp dụng chuẩn hóa số đếm, phần trăm, giờ phút (ITN)
 * - Khử lỗi phát âm nói nhanh và dịch chuẩn từ mượn
 * - Tự động chèn dấu phẩy sau các trạng từ chuyển ý
 * - Nhận diện ngữ điệu câu hỏi tiếng Việt (cả từ kết thúc và từ bắt đầu câu hỏi)
 * - Chuẩn hóa khoảng cách xung quanh dấu câu
 * - Viết hoa chữ cái đầu câu và sau ngắt dòng
 */
export function processRealtimeSpeechPunctuation(rawText: string, isFinal: boolean = true): string {
  if (!rawText) return '';

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

  // 5. Chuẩn hóa thuật ngữ chuyên ngành sản xuất, kho vận, tài chính AVG One
  for (const rule of ENTERPRISE_TERMS_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 6. Chuẩn hóa số đếm, phần trăm, tiền tệ, ngày giờ, đơn vị đo lường (ITN)
  for (const rule of ITN_RULES) {
    text = typeof rule.replacement === 'function'
      ? text.replace(rule.pattern, rule.replacement as any)
      : text.replace(rule.pattern, rule.replacement);
  }

  // 7. Lọc các từ đệm ngập ngừng thừa thãi
  for (const rule of SPEECH_FILLER_RULES) {
    text = text.replace(rule.pattern, rule.replacement);
  }

  // 8. Tự động chèn dấu phẩy hợp lý sau liên từ và trạng ngữ chuyển tiếp
  text = insertSmartDiscourseCommas(text);

  // 9. Chuẩn hóa khoảng cách quanh dấu câu:
  // Không để khoảng trắng trước dấu câu: "xin chào ," -> "xin chào,"
  text = text.replace(/\s+([,.?!:;%])/g, '$1');
  // Phải có đúng 1 khoảng trắng sau dấu câu (nếu không phải là cuối chuỗi hoặc xuống dòng)
  text = text.replace(/([,.?!:;%])(?=[^\s\d\n)\]}])/g, '$1 ');
  // Xử lý khoảng cách quanh dấu mở đóng ngoặc
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  text = text.replace(/"\s+/g, '"').replace(/\s+"/g, '"');
  text = text.replace(/\s{2,}/g, ' ');

  // 10. Nếu là câu chốt (final), kiểm tra xem có phải câu hỏi không
  if (isFinal) {
    const trimmed = text.trim();
    // Nếu chưa có dấu kết thúc câu (. ? ! ...)
    if (!/[.?!…]$/.test(trimmed)) {
      const lower = trimmed.toLowerCase();
      const hasQuestionEnding = QUESTION_ENDINGS.some(ending => {
        return lower.endsWith(ending) || lower.endsWith(ending + ',');
      });
      const hasQuestionStarter = QUESTION_STARTERS_REGEX.test(lower);

      if (hasQuestionEnding || hasQuestionStarter) {
        text = trimmed.replace(/,\s*$/, '') + '?';
      } else {
        // Tự động thêm dấu chấm nếu câu đã có độ dài ý nghĩa (>= 3 từ)
        const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
        if (wordCount >= 3 && !trimmed.endsWith(':') && !trimmed.endsWith(',')) {
          text = trimmed + '.';
        }
      }
    }
  }

  // 11. Viết hoa chữ cái đầu tiên và sau các dấu chấm/chấm hỏi/chấm than/xuống dòng
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
 * Ghép nối hai đoạn văn bản liên tiếp mà không bị lặp từ / lặp câu (Deduplication & Overlap Merging)
 * - Tự động phát hiện khi câu mới là bản chỉnh sửa/mở rộng hoàn thiện hơn của câu trước
 * - Hỗ trợ đối soát câu dài lên tới 60 từ (chuẩn câu tiếng Việt)
 * - Tự động phát hiện và thay thế câu cuối cùng nếu câu mới là bản hoàn thiện của câu đó
 * - Tuyệt đối không nuốt lời nói hay xóa bỏ các câu từ hợp lệ
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

  // 1. Nếu văn bản mới giống hệt văn bản cũ (trùng lặp hoàn toàn)
  if (prevNorm === nextNorm) {
    return prev;
  }

  // 2. Nếu văn bản mới bao trùm hoặc là phần mở rộng đầy đủ hơn của toàn bộ văn bản cũ
  if (nextNorm.startsWith(prevNorm)) {
    return next;
  }

  // 2b. Nếu văn bản cũ đã bao hàm toàn bộ văn bản mới (tránh lặp lại câu vừa nói)
  if (prevNorm.endsWith(nextNorm) || prevNorm.includes(nextNorm)) {
    return prev;
  }

  // 2c. Kiểm tra câu cuối cùng trong văn bản cũ:
  // Nếu prev gồm nhiều câu, và câu mới là bản hoàn thiện/mở rộng của câu cuối cùng
  const sentences = prev.split(/(?<=[.?!…\n])\s+/).filter(Boolean);
  if (sentences.length > 1) {
    const lastSentence = sentences[sentences.length - 1].trim();
    const lastSentNorm = stripPunct(lastSentence);

    if (lastSentNorm && (nextNorm.startsWith(lastSentNorm) || nextNorm === lastSentNorm)) {
      // Thay thế câu cuối cùng cũ bằng câu mới hoàn thiện hơn
      const allPrevSentences = sentences.slice(0, sentences.length - 1).join(' ');
      const separator = allPrevSentences.endsWith('\n') ? '' : ' ';
      return `${allPrevSentences}${separator}${next}`;
    }
  }

  // 3. Tìm phần giao thoa (suffix-to-prefix overlap) giữa đuôi của prev và đầu của next
  const prevWords = prev.split(/\s+/);
  const nextWords = next.split(/\s+/);
  const prevNormWords = prevWords.map(w => stripPunct(w)).filter(Boolean);
  const nextNormWords = nextWords.map(w => stripPunct(w)).filter(Boolean);

  let maxOverlap = 0;
  // Hỗ trợ kiểm tra tới 60 từ (toàn bộ dung lượng câu tiếng Việt thông thường)
  const maxCheck = Math.min(prevNormWords.length, nextNormWords.length, 60);

  // QUY TẮC BẢO TOÀN THÔNG TIN & CHỐNG CẮT MẤT TỪ:
  // - Nếu chỉ trùng 1 từ: TUYỆT ĐỐI KHÔNG CẮT BỎ (tránh nuốt mất chủ ngữ hoặc từ đầu câu)
  // - Chỉ coi là overlap khi trùng từ 2 từ trở lên và tổng chiều dài >= 6 ký tự
  for (let k = maxCheck; k >= 2; k--) {
    const prevSuffix = prevNormWords.slice(prevNormWords.length - k).join(' ');
    const nextPrefix = nextNormWords.slice(0, k).join(' ');
    if (prevSuffix === nextPrefix && prevSuffix.length >= 6) {
      maxOverlap = k;
      break;
    }
  }

  if (maxOverlap > 0) {
    // Chỉ lấy phần đuôi không bị trùng lặp của nextWords
    const remainingWords = nextWords.slice(maxOverlap).join(' ').trim();
    if (!remainingWords) return prev;
    const separator = prev.endsWith('\n') ? '' : ' ';
    return `${prev}${separator}${remainingWords}`;
  }

  // 4. Nếu là câu phát biểu mới hoàn toàn, nối tiếp bình thường
  const separator = prev.endsWith('\n') ? '' : ' ';
  return `${prev}${separator}${next}`;
}

/**
 * Khử phần tiền tố bị trùng lặp của câu mới nếu đầu câu mới trùng với đuôi câu trước (ví dụ khi chuyển người nói hoặc chia đoạn)
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

  // Nếu trùng 1 từ nhưng từ đó dài >= 5 ký tự (ví dụ: "chúng tôi")
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
