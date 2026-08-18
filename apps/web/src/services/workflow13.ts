export interface WorkflowStep {
  stepNumber: number; // 1 to 13
  code: string;
  name: string;
  defaultHub: HubKey;
  description: string;
  deliverable: string;
  icon: string;
}

export type HubKey = '5.1B' | 'KIEN' | 'HASH' | 'NHASAN_3.1' | 'NHASAN_3.2' | 'NHASAN_6' | 'HUB_1' | '5.1T' | 'HUB_0' | 'HUB_8' | 'HUB_9' | 'HUB_2.2' | 'HUB_2.1' | 'HUB_K2' | 'HUB_K1' | 'ALL';

export interface HubMeta {
  code: HubKey;
  name: string;
  shortName: string;
  icon: string;
  badgeBg: string;
  leader: string;
  description: string;
  roleIn13Steps: string;
}

export const WORKFLOW_13_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    code: 'B1_TIEP_NHAN',
    name: 'Bước 1: Tiếp Nhận & Khởi Tạo Đơn Hàng',
    defaultHub: '5.1B',
    description: 'Tiếp nhận nhu cầu, khảo sát sơ bộ, phát hành mã Đơn hàng (DH-YYYY-XXX)',
    deliverable: 'Mã Đơn hàng & Hồ sơ đề xuất ban đầu',
    icon: '📥'
  },
  {
    stepNumber: 2,
    code: 'B2_PHE_DUYET',
    name: 'Bước 2: Phê Duyệt Sub-Project & Cấp Ngân Sách',
    defaultHub: 'KIEN',
    description: 'Đánh giá tính khả thi, phân bổ đầu mối chủ trì và duyệt cấp hạn mức ngân sách',
    deliverable: 'Quyết định phê duyệt chủ trương',
    icon: '📑'
  },
  {
    stepNumber: 3,
    code: 'B3_KHAO_SAT_KY_THUAT',
    name: 'Bước 3: Khảo Sát & Phương Án Kỹ Thuật',
    defaultHub: 'HASH',
    description: 'Khảo sát thực địa/hiện trạng, xây dựng thông số kỹ thuật chi tiết',
    deliverable: 'Bản đề xuất thông số kỹ thuật (Spec)',
    icon: '⚡'
  },
  {
    stepNumber: 4,
    code: 'B4_NGHIEN_CUU_RDI',
    name: 'Bước 4: Nghiên Cứu & Thiết Kế R&D',
    defaultHub: 'NHASAN_3.1',
    description: 'Nghiên cứu nguyên lý, mạch điện tử, firmware và thuật toán điều khiển',
    deliverable: 'Mạch R&D thử nghiệm & thuật toán cốt lõi',
    icon: '🧪'
  },
  {
    stepNumber: 5,
    code: 'B5_THIET_KE_3D',
    name: 'Bước 5: Thiết Kế Kiểu Dáng & Tạo Mẫu CAD/3D',
    defaultHub: 'NHASAN_3.2',
    description: 'Vẽ thiết kế 3D công nghiệp, mô phỏng kết cấu và in mẫu thử 3D',
    deliverable: 'Bản vẽ CAD 3D & Mẫu in 3D vỏ hộp',
    icon: '🎨'
  },
  {
    stepNumber: 6,
    code: 'B6_THAM_DINH_PHAP_LY',
    name: 'Bước 6: Thẩm Định Pháp Lý & Sở Hữu Trí Tuệ',
    defaultHub: 'NHASAN_6',
    description: 'Rà soát hợp đồng sản xuất, đăng ký bản quyền thương hiệu & sở hữu trí tuệ',
    deliverable: 'Văn bản thẩm định pháp lý & Hồ sơ đăng ký SHTT',
    icon: '⚖️'
  },
  {
    stepNumber: 7,
    code: 'B7_DUYET_MAU_CHE_TAO',
    name: 'Bước 7: Thẩm Định Chi Phí & Duyệt Mẫu Sản Xuất',
    defaultHub: 'KIEN',
    description: 'Duyệt bảng định mức dự toán chi phí sản xuất và chốt mẫu nguyên mẫu',
    deliverable: 'Biên bản duyệt mẫu & Dự toán sản xuất',
    icon: '💎'
  },
  {
    stepNumber: 8,
    code: 'B8_CHUAN_BI_VAT_TU',
    name: 'Bước 8: Chuẩn Bị Vật Tư & Kiểm Kê Tồn Kho',
    defaultHub: 'HUB_1',
    description: 'Kiểm tra tồn kho linh kiện, đặt hàng linh kiện còn thiếu (1.T & 1.C)',
    deliverable: 'Bảng tổng hợp vật tư sẵn sàng sản xuất',
    icon: '📦'
  },
  {
    stepNumber: 9,
    code: 'B9_GIA_CONG_SAN_XUAT',
    name: 'Bước 9: Gia Công & Lắp Ráp Sản Xuất',
    defaultHub: 'HUB_1',
    description: 'Hàn mạch SMT, lắp ráp linh kiện, gia công cơ khí hoàn thiện sản phẩm',
    deliverable: 'Lô sản phẩm hoàn thiện sản xuất',
    icon: '🏭'
  },
  {
    stepNumber: 10,
    code: 'B10_KIEM_DINH_QC',
    name: 'Bước 10: Thử Nghiệm & Kiểm Định QA/QC',
    defaultHub: 'HASH',
    description: 'Kiểm tra môi trường, đo đạc sai số, thử tải và kiểm định chất lượng',
    deliverable: 'Chứng nhận QA/QC & Biên bản thử nghiệm',
    icon: '🛡️'
  },
  {
    stepNumber: 11,
    code: 'B11_DONG_GOI_BAN_GIAO',
    name: 'Bước 11: Đóng Gói & Bàn Giao Triển Khai',
    defaultHub: '5.1T',
    description: 'Đóng gói chuẩn quy cách, lập bộ tài liệu hướng dẫn bàn giao',
    deliverable: 'Bộ kiện đóng gói & Biên bản xuất kho',
    icon: '🚚'
  },
  {
    stepNumber: 12,
    code: 'B12_NGHIEM_THU_VAN_HANH',
    name: 'Bước 12: Nghiệm Thu Thực Địa & Đưa Vào Vận Hành',
    defaultHub: '5.1T',
    description: 'Lắp đặt tại công trình/đơn vị thụ hưởng, chạy thử nghiệm tế và ký nghiệm thu',
    deliverable: 'Biên bản nghiệm thu thực địa & Vận hành',
    icon: '🚀'
  },
  {
    stepNumber: 13,
    code: 'B13_DONG_DON_HANG',
    name: 'Bước 13: Đóng Đơn Hàng & Lưu Trữ Hồ Sơ VBKL',
    defaultHub: '5.1B',
    description: 'Đóng hồ sơ đơn hàng, tổng kết lạm phát thời lượng và lưu link VBKL Google Sheet',
    deliverable: 'Báo cáo tổng kết đơn hàng & Document Link VBKL',
    icon: '🏁'
  }
];

export const HUB_MAP: Record<HubKey, HubMeta> = {
  ALL: {
    code: 'ALL',
    name: 'Tất Cả Đầu Mối (Tổng Quan Hệ Thống)',
    shortName: 'Tất cả',
    icon: '🏢',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    leader: 'Ban Điều Hành AVG',
    description: 'Tổng quan không gian tất cả các đơn hàng thuộc 8 đầu mối liên thông và 3 đầu mối tăng cường',
    roleIn13Steps: 'Giám sát toàn bộ chuỗi 13 bước việc & Các đầu mối tăng cường'
  },
  '5.1B': {
    code: '5.1B',
    name: 'Đầu Mối 5.1B (Thí Điểm & Đóng Đơn)',
    shortName: '5.1B Thí Điểm',
    icon: '📍',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    leader: 'Phụ trách B5.1 (Bà Bích)',
    description: 'Đầu mối khởi tạo đề xuất thí điểm (Bước 1) và nghiệm thu kết thúc tổng kết VBKL (Bước 13)',
    roleIn13Steps: 'Chủ trì Bước 1 & Bước 13'
  },
  'KIEN': {
    code: 'KIEN',
    name: 'Đầu Mối Kiên (Điều Hành & Duyệt Cấp)',
    shortName: 'Đầu Mối Kiên',
    icon: '🏗️',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    leader: 'Trưởng ban Kiên',
    description: 'Phê duyệt chủ trương, cấp hạn mức ngân sách (Bước 2) và chốt mẫu chi phí sản xuất (Bước 7)',
    roleIn13Steps: 'Chủ trì Bước 2 & Bước 7'
  },
  'HASH': {
    code: 'HASH',
    name: 'Đầu Mối # (Khảo Sát Kỹ Thuật & QA/QC)',
    shortName: 'Đầu Mối #',
    icon: '⚡',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    leader: 'Phụ trách Kỹ Thuật #',
    description: 'Khảo sát lập thông số kỹ thuật (Bước 3) và đo đạc kiểm định QA/QC chất lượng (Bước 10)',
    roleIn13Steps: 'Chủ trì Bước 3 & Bước 10'
  },
  'NHASAN_3.1': {
    code: 'NHASAN_3.1',
    name: 'Đầu Mối Nhà Sản - 3.1 RDI (Nghiên Cứu & Phát Triển)',
    shortName: '3.1 RDI',
    icon: '🧪',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    leader: 'GĐ Trung Tâm RDI 3.1',
    description: 'Nghiên cứu nguyên lý, vi mạch điện tử, firmware và phần mềm nhúng (Bước 4)',
    roleIn13Steps: 'Chủ trì Bước 4 (R&D Core)'
  },
  'NHASAN_3.2': {
    code: 'NHASAN_3.2',
    name: 'Đầu Mối Nhà Sản - 3.2 Thiết Kế (Tạo Mẫu Công Nghiệp)',
    shortName: '3.2 Thiết Kế',
    icon: '🎨',
    badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    leader: 'Trưởng phòng Thiết Kế 3.2',
    description: 'Thiết kế kiểu dáng 3D công nghiệp, mô phỏng kết cấu vỏ hộp và in 3D mẫu (Bước 5)',
    roleIn13Steps: 'Chủ trì Bước 5 (3D CAD & Modeling)'
  },
  'NHASAN_6': {
    code: 'NHASAN_6',
    name: 'Đầu Mối Nhà Sản - 6 Pháp Lý (Thẩm Định & Bản Quyền)',
    shortName: '6 Pháp Lý',
    icon: '⚖️',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    leader: 'Trưởng ban Pháp Lý 6',
    description: 'Thẩm định hợp đồng, rà soát bản quyền thương hiệu & thủ tục sở hữu trí tuệ (Bước 6)',
    roleIn13Steps: 'Chủ trì Bước 6 (Legal & IP)'
  },
  'HUB_1': {
    code: 'HUB_1',
    name: 'Đầu Mối 1 (Phụ Trách Sản Xuất 1.T & 1.C)',
    shortName: '1.T & 1.C Sản Xuất',
    icon: '🏭',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    leader: 'Quản lý Sản xuất 1.T & 1.C',
    description: 'Chuẩn bị vật tư linh kiện tồn kho (Bước 8) và điều hành lắp ráp gia công sản xuất (Bước 9)',
    roleIn13Steps: 'Chủ trì Bước 8 & Bước 9'
  },
  '5.1T': {
    code: '5.1T',
    name: 'Đầu Mối 5.1T (Triển Khai & Nghiệm Thu)',
    shortName: '5.1T Triển Khai',
    icon: '🚀',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    leader: 'Phụ trách Triển khai 5.1T',
    description: 'Đóng gói vận chuyển (Bước 11) và nghiệm thu thực địa bàn giao vận hành (Bước 12)',
    roleIn13Steps: 'Chủ trì Bước 11 & Bước 12'
  },
  'HUB_0': {
    code: 'HUB_0',
    name: 'Đầu Mối 0 (Bảo Mật & Phát Triển Nền Tảng)',
    shortName: 'Đầu Mối 0',
    icon: '🛡️',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30',
    leader: 'Đầu Mối Tăng Cường 0 (Bảo Mật)',
    description: 'Phụ trách về vấn đề bảo mật và phát triển công cụ nền tảng',
    roleIn13Steps: 'Bảo mật hệ thống & Phát triển công cụ nền tảng 24/7'
  },
  'HUB_8': {
    code: 'HUB_8',
    name: 'Đầu Mối 8 (Thông Tắc Nghẽn & Thương Ngoại)',
    shortName: 'Đầu Mối 8',
    icon: '⚡',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    leader: 'Đầu Mối Tăng Cường 8 (Thương Ngoại)',
    description: 'Phụ trách về vấn đề thông những cái tắc nghẽn trong hệ thống và giao thoa với phần thương ngoại, kết nối từ trong ra ngoài',
    roleIn13Steps: 'Tháo gỡ nút thắt hệ thống & Kết nối thương ngoại'
  },
  'HUB_9': {
    code: 'HUB_9',
    name: 'Đầu Mối 9 (Tổng Thể & Hồ Sơ Năng Lực)',
    shortName: 'Đầu Mối 9',
    icon: '👑',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    leader: 'Đầu Mối Tăng Cường 9 (Tổng Thể)',
    description: 'Phụ trách về tổng thể, hồ sơ năng lực từ tổng thể đến chi tiết',
    roleIn13Steps: 'Điều hành tổng thể & Quản lý Hồ sơ năng lực'
  },
  'HUB_2.2': {
    code: 'HUB_2.2',
    name: 'Đầu Mối 2.2 (Hạ Tầng Cứng & Máy Móc Thiết Bị)',
    shortName: 'Đầu Mối 2.2',
    icon: '⚙️',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    leader: 'Đầu Mối 2.2 (Hạ Tầng & Thiết Bị)',
    description: 'Phụ trách về hạ tầng cứng, máy móc thiết bị để phục vụ các đầu mối khác',
    roleIn13Steps: 'Cung cấp & Quản lý Hạ tầng cứng, Máy móc thiết bị 24/7'
  },
  'HUB_2.1': {
    code: 'HUB_2.1',
    name: 'Đầu Mối 2.1 (Nhân Sự & Điều Hành Thư Ký)',
    shortName: '2.1 Nhân Sự',
    icon: '📝',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    leader: 'Thư ký 2.1 (Nhân Sự)',
    description: 'Phụ trách công tác nhân sự, ghi chép biên bản cuộc họp & điều hành thư ký',
    roleIn13Steps: 'Quản lý Nhân sự & Tổng hợp Biên bản Thư ký 2.1'
  },
  'HUB_K2': {
    code: 'HUB_K2',
    name: 'Cụm #K2 (Điều Hành Thực Thi #K2)',
    shortName: 'Cụm #K2',
    icon: '💠',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    leader: 'Trưởng ban Cụm #K2',
    description: 'Phụ trách trực thuộc Cụm #K điều hành thực thi dự án',
    roleIn13Steps: 'Điều hành trực tiếp Cụm #K2'
  },
  'HUB_K1': {
    code: 'HUB_K1',
    name: 'Cụm #K1 (Điều Hành Thực Thi #K1)',
    shortName: 'Cụm #K1',
    icon: '🔰',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    leader: 'Trưởng ban Cụm #K1',
    description: 'Phụ trách trực thuộc Cụm #K điều hành thực thi dự án',
    roleIn13Steps: 'Điều hành trực tiếp Cụm #K1'
  }
};
