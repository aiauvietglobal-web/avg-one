import React, { useState, useMemo } from 'react';
import {
  Sparkles, Search, Clock, FileText, CheckCircle2,
  Copy, Check, LayoutGrid, FileCode, AlertTriangle,
  DollarSign, Briefcase, BookOpen, ShoppingBag, Factory,
  Cpu, UserCheck, Award, Wrench, ArrowRight
} from 'lucide-react';

export interface TaskGroupDetailLine {
  type: 'heading-num' | 'dash' | 'plus' | 'bullet' | 'square' | 'text' | 'deadline' | 'flow';
  text: string;
  indent: number; // 0, 1, 2, 3
  isBold?: boolean;
}

export interface TaskGroupItem {
  id: number;
  roman: string;
  title: string;
  rawHeader: string;
  category: string;
  pillBg: string;
  statusText: string;
  statusColor: string;
  boxTheme: string;
  deadline?: string;
  leads?: string[];
  icon: React.ReactNode;
  contentLines: TaskGroupDetailLine[];
  rawText: string;
}

export const TASK_GROUPS: TaskGroupItem[] = [
  {
    id: 1,
    roman: 'I',
    title: 'Giải phóng hàng tồn (Rất bức thiết)',
    rawHeader: 'I. Nhóm 1: Giải phóng hàng tồn (Rất bức thiết):',
    category: 'Giải phóng hàng tồn',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Rất Bức Thiết',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: '28/02/2026',
    leads: ['Bà Trang (Thương mại)'],
    icon: <AlertTriangle className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'heading-num', text: '1. Các nhóm hàng tồn:', indent: 0, isBold: true },
      { type: 'dash', text: 'Nguyên liệu (Bán thành phẩm, Đơn Nguyên và Đa nguyên);', indent: 1 },
      { type: 'dash', text: 'Vật liệu; vật tư;', indent: 1 },
      { type: 'dash', text: 'Hàng thành phẩm tại các kho;', indent: 1 },
      { type: 'dash', text: 'Máy móc, trang thiết bị, …', indent: 1 },
      { type: 'heading-num', text: '2. Deadline: 28/02/2026;', indent: 0, isBold: true },
      { type: 'heading-num', text: '3. Đối tượng: Giải phóng hàng tồn thông qua chủ thể chính là thương mại (bà Trang), nếu không thương mại được thì phải tiêu hủy.', indent: 0, isBold: true }
    ],
    rawText: `I. Nhóm 1: Giải phóng hàng tồn (Rất bức thiết):
1. Các nhóm hàng tồn:
- Nguyên liệu (Bán thành phẩm, Đơn Nguyên và Đa nguyên);
- Vật liệu; vật tư;
- Hàng thành phẩm tại các kho;
- Máy móc, trang thiết bị, …
2. Deadline: 28/02/2026;
3. Đối tượng: Giải phóng hàng tồn thông qua chủ thể chính là thương mại (bà Trang), nếu không thương mại được thì phải tiêu hủy.`
  },
  {
    id: 2,
    roman: 'II',
    title: 'Thiết lập cấu trúc chi cho Âu Việt, mở rộng ra cấu trúc chi cho toàn bộ',
    rawHeader: 'II. Nhóm 2: Thiết lập cấu trúc chi cho Âu Việt, mở rộng ra cấu trúc chi cho toàn bộ.',
    category: 'Cấu trúc chi',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Hạn: 15/01/2026',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: '15/01/2026',
    leads: ['Bà Chiều', 'Người chịu trách nhiệm pháp nhân cũ'],
    icon: <DollarSign className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      {
        type: 'flow',
        text: 'Thiết lập cấu trúc chi → Tháo gỡ, giảm tải nghiệp vụ cho bà Chiều → Giảm tải nghiệp vụ cho người chịu trách nhiệm pháp nhân cũ về Chi thường xuyên bắt buộc và chi bắt buộc.',
        indent: 0
      },
      { type: 'deadline', text: 'Deadline: 15/01/2026.', indent: 0, isBold: true }
    ],
    rawText: `II. Nhóm 2: Thiết lập cấu trúc chi cho Âu Việt, mở rộng ra cấu trúc chi cho toàn bộ.
Thiết lập cấu trúc chi → Tháo gỡ, giảm tải nghiệp vụ cho bà Chiều → Giảm tải nghiệp vụ cho người chịu trách nhiệm pháp nhân cũ về Chi thường xuyên bắt buộc và chi bắt buộc.
Deadline: 15/01/2026.`
  },
  {
    id: 3,
    roman: 'III',
    title: '07 đối tác lớn của Âu Việt, tìm mọi cách để nuôi được nó',
    rawHeader: 'III. Nhóm 3: 07 đối tác lớn của Âu Việt, tìm mọi cách để nuôi được nó.',
    category: 'Đối tác lớn',
    pillBg: 'bg-[#0284C7]',
    statusText: '07 Đối Tác Lớn',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Tháng 01 & 02/2026',
    leads: ['Bà Trang', 'Bà Bích', 'Bà Mây'],
    icon: <Briefcase className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Trong Thương mại: Nắm (tìm để hiểu) được kế hoạch thương mại của họ, thấu hiểu để phục vụ.', indent: 0, isBold: true },
      { type: 'dash', text: 'Chủ thể: Bà Trang:', indent: 0, isBold: true },
      { type: 'plus', text: 'Chỉ mặt đặt tên, sắp xếp, định hình rõ con người, nhóm nghiệp vụ, …', indent: 1 },
      { type: 'plus', text: 'Làm công tác đối ngoại, trực tiếp lấy thông tin thị trường; chuyển tiếp thông tin từ Âu Việt sang AVG, thông qua 2 đầu mối thương mại của Âu Việt (bà Bích và bà Mây).', indent: 1 },
      { type: 'dash', text: 'Đi vào nghiệp vụ:', indent: 0, isBold: true },
      { type: 'plus', text: 'Thông tin kỹ thuật: Liệt kê, thống kê nhãn hàng, nhãn hiệu; chủ động chỉnh sửa trước. Deadline: Hết tháng 01/2026;', indent: 1 },
      { type: 'plus', text: 'Thông tin pháp lý: Deadline: Trước và trong tháng 02/2026;', indent: 1 },
      { type: 'plus', text: 'Thông tin dữ liệu hàng hóa;', indent: 1 },
      { type: 'plus', text: 'Thông tin dữ liệu tài chính, tiền tệ.', indent: 1 }
    ],
    rawText: `III. Nhóm 3: 07 đối tác lớn của Âu Việt, tìm mọi cách để nuôi được nó.
- Trong Thương mại: Nắm (tìm để hiểu) được kế hoạch thương mại của họ, thấu hiểu để phục vụ.
- Chủ thể: Bà Trang:
+ Chỉ mặt đặt tên, sắp xếp, định hình rõ con người, nhóm nghiệp vụ, …
+ Làm công tác đối ngoại, trực tiếp lấy thông tin thị trường; chuyển tiếp thông tin từ Âu Việt sang AVG, thông qua 2 đầu mối thương mại của Âu Việt (bà Bích và bà Mây).
- Đi vào nghiệp vụ:
+ Thông tin kỹ thuật: Liệt kê, thống kê nhãn hàng, nhãn hiệu; chủ động chỉnh sửa trước. Deadline: Hết tháng 01/2026;
+ Thông tin pháp lý: Deadline: Trước và trong tháng 02/2026;
+ Thông tin dữ liệu hàng hóa;
+ Thông tin dữ liệu tài chính, tiền tệ.`
  },
  {
    id: 4,
    roman: 'IV',
    title: 'Xây dựng nội quy, quy chế công ty',
    rawHeader: 'IV. Nhóm 4: Xây dựng nội quy, quy chế công ty',
    category: 'Nội quy & Quy chế',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Hạn: Hết Q2/2026',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Hết quý 2 năm 2026',
    leads: ['Ban Xây dựng Quy chế'],
    icon: <BookOpen className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Tổng hợp từ nhóm I, II, III, IV sẽ ra:', indent: 0, isBold: true },
      { type: 'plus', text: 'Quy chế chung;', indent: 1 },
      { type: 'plus', text: 'Quy chế nghiệp vụ;', indent: 1 },
      { type: 'plus', text: 'Quy chế nhân sự;', indent: 1 },
      { type: 'dash', text: 'Nội dung: Tập trung vào nội dung Chi, Thu, liên quan đến xác lập nguồn chi; làm từng bước, khi cần sẽ mở rộng, bổ sung;', indent: 0 },
      { type: 'deadline', text: 'Deadline: Hết quý 2 năm 2026.', indent: 0, isBold: true }
    ],
    rawText: `IV. Nhóm 4: Xây dựng nội quy, quy chế công ty
- Tổng hợp từ nhóm I, II, III, IV sẽ ra:
+ Quy chế chung;
+ Quy chế nghiệp vụ;
+ Quy chế nhân sự;
- Nội dung: Tập trung vào nội dung Chi, Thu, liên quan đến xác lập nguồn chi; làm từng bước, khi cần sẽ mở rộng, bổ sung;
- Deadline: Hết quý 2 năm 2026.`
  },
  {
    id: 5,
    roman: 'V',
    title: 'Thương mại',
    rawHeader: 'V. Nhóm 5: Thương mại',
    category: 'Thương mại',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Enzyme & Bán thành phẩm',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Ban Thương mại'],
    icon: <ShoppingBag className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Lõi:', indent: 0, isBold: true },
      { type: 'plus', text: 'Không gia tăng áp lực cho nhà máy Âu Việt;', indent: 1 },
      { type: 'plus', text: 'Nhánh Chiến lược:', indent: 1, isBold: true },
      { type: 'bullet', text: 'Phát triển thương mại: Enzyme;', indent: 2, isBold: true },
      { type: 'square', text: 'Bán Sản phẩm có Enzyme: Xu hướng tiêu dùng xanh;', indent: 3 },
      { type: 'square', text: 'Bán Enzyme cho các đối tác sản xuất tại Việt Nam;', indent: 3 },
      { type: 'bullet', text: 'Phát triển thương mại: Bán Bán thành phẩm.', indent: 2, isBold: true }
    ],
    rawText: `V. Nhóm 5: Thương mại
- Lõi:
+ Không gia tăng áp lực cho nhà máy Âu Việt;
+ Nhánh Chiến lược:
● Phát triển thương mại: Enzyme;
  □ Bán Sản phẩm có Enzyme: Xu hướng tiêu dùng xanh;
  □ Bán Enzyme cho các đối tác sản xuất tại Việt Nam;
● Phát triển thương mại: Bán Bán thành phẩm.`
  },
  {
    id: 6,
    roman: 'VI',
    title: 'Thiết lập cấu trúc sản xuất',
    rawHeader: 'VI. Nhóm 6: Thiết lập cấu trúc sản xuất',
    category: 'Cấu trúc sản xuất',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Neo Vào 3 Kho',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Nhà máy Âu Việt'],
    icon: <Factory className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Tổng hợp từ I, II, III, IV và neo vào 3 Kho:', indent: 0, isBold: true },
      { type: 'plus', text: 'Kho đầu vào;', indent: 1 },
      { type: 'plus', text: 'Kho thương phẩm;', indent: 1 },
      { type: 'plus', text: 'Kho lưu chuyển.', indent: 1 },
      { type: 'dash', text: 'Khi Âu Việt giải quyết xong các vấn đề bức thiết, cấp thiết, … thì có thể sử dụng một số nguyên tắc của nhà máy mới.', indent: 0 }
    ],
    rawText: `VI. Nhóm 6: Thiết lập cấu trúc sản xuất
- Tổng hợp từ I, II, III, IV và neo vào 3 Kho:
+ Kho đầu vào;
+ Kho thương phẩm;
+ Kho lưu chuyển.
- Khi Âu Việt giải quyết xong các vấn đề bức thiết, cấp thiết, … thì có thể sử dụng một số nguyên tắc của nhà máy mới.`
  },
  {
    id: 7,
    roman: 'VII',
    title: 'RDI',
    rawHeader: 'VII. Nhóm 7: RDI',
    category: 'RDI',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Nghiên Cứu RDI',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Phòng RDI'],
    icon: <Sparkles className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Thúc đẩy sớm (phụ thuộc hoàn toàn vào kế hoạch thương mại): H1, H2 (lưu ý làm khi cần đẩy hàng tồn); tạo ra HPHT;', indent: 0 },
      { type: 'dash', text: 'Liên quan enzyme:', indent: 0, isBold: true },
      { type: 'plus', text: 'Hiểu, làm chủ được thông tin kỹ thuật của nguyên liệu Enzyme;', indent: 1 },
      { type: 'plus', text: 'Chú trọng vào H1, H2 của những cái có nguyên liệu Enzyme;', indent: 1 },
      { type: 'plus', text: 'Phải chuẩn hóa được dung môi hay tổ hợp dung môi; Đầu tư khai thác trọng tâm trọng điểm pH và liên quan đến Enzyme.', indent: 1 },
      { type: 'dash', text: 'Hương: Không được lan man vào hương liệu.', indent: 0, isBold: true },
      { type: 'dash', text: 'Nhiệt độ: Làm chủ dung sai biến nhiệt của H1, H2; Đồng bộ dung sai biến nhiệt trong sản xuất, đặc biệt liên quan đến enzyme.', indent: 0, isBold: true }
    ],
    rawText: `VII. Nhóm 7: RDI
- Thúc đẩy sớm (phụ thuộc hoàn toàn vào kế hoạch thương mại): H1, H2 (lưu ý làm khi cần đẩy hàng tồn); tạo ra HPHT;
- Liên quan enzyme:
+ Hiểu, làm chủ được thông tin kỹ thuật của nguyên liệu Enzyme;
+ Chú trọng vào H1, H2 của những cái có nguyên liệu Enzyme;
+ Phải chuẩn hóa được dung môi hay tổ hợp dung môi; Đầu tư khai thác trọng tâm trọng điểm pH và liên quan đến Enzyme.
- Hương: Không được lan man vào hương liệu.
- Nhiệt độ: Làm chủ dung sai biến nhiệt của H1, H2; Đồng bộ dung sai biến nhiệt trong sản xuất, đặc biệt liên quan đến enzyme.`
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'Thiết lập nghiệp vụ hệ thống, phục vụ 07 nhóm nhiệm vụ trên',
    rawHeader: 'VIII. Nhóm 8: Thiết lập nghiệp vụ hệ thống, phục vụ 07 nhóm nhiệm vụ trên.',
    category: 'Nghiệp vụ hệ thống',
    pillBg: 'bg-[#0284C7]',
    statusText: 'AVG Dẫn Dắt & Liên Kết',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['AVG', 'DH tạm thời AVG'],
    icon: <Cpu className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Sau đó, thực hiện liên kết hệ thống; năm 2026: Lấy AVG để dẫn dắt, liên kết.', indent: 0 },
      { type: 'dash', text: 'Chủ thể: AVG; DH tạm thời AVG chịu trách nhiệm;', indent: 0, isBold: true }
    ],
    rawText: `VIII. Nhóm 8: Thiết lập nghiệp vụ hệ thống, phục vụ 07 nhóm nhiệm vụ trên.
- Sau đó, thực hiện liên kết hệ thống; năm 2026: Lấy AVG để dẫn dắt, liên kết.
- Chủ thể: AVG; DH tạm thời AVG chịu trách nhiệm;`
  },
  {
    id: 9,
    roman: 'XIX',
    title: 'Nhân sự, con người',
    rawHeader: 'XIX. Nhóm 9: Nhân sự, con người',
    category: 'Nhân sự, con người',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Thu Nhập Cơ Sở +8%',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: '2026 - 2027',
    leads: ['DH', 'Ban Nhân sự'],
    icon: <UserCheck className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Năm 2026:', indent: 0, isBold: true },
      { type: 'plus', text: 'Tiếp tục tập trung phát triển năng lực của các đầu mối, năng lực con người; Không tăng thêm người;', indent: 1 },
      { type: 'plus', text: 'Tiếp tục duy trì gói sức khỏe tinh thần;', indent: 1 },
      { type: 'plus', text: 'DH cam kết mức thu nhập cơ sở tăng 8% so với năm 2025;', indent: 1, isBold: true },
      { type: 'dash', text: 'Năm 2027: Gói Sức khỏe tinh thần sẽ là cái tên khác nhưng gốc vẫn là đầu tư vào sức khoẻ tinh thần.', indent: 0 }
    ],
    rawText: `XIX. Nhóm 9: Nhân sự, con người
- Năm 2026:
+ Tiếp tục tập trung phát triển năng lực của các đầu mối, năng lực con người; Không tăng thêm người;
+ Tiếp tục duy trì gói sức khỏe tinh thần;
+ DH cam kết mức thu nhập cơ sở tăng 8% so với năm 2025;
- Năm 2027: Gói Sức khỏe tinh thần sẽ là cái tên khác nhưng gốc vẫn là đầu tư vào sức khoẻ tinh thần.`
  },
  {
    id: 10,
    roman: 'X',
    title: 'Xây dựng Hồ sơ năng lực',
    rawHeader: 'X. Nhóm 10: Xây dựng Hồ sơ năng lực',
    category: 'Hồ sơ năng lực',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Hồ Sơ Năng Lực',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Ban Xây dựng Hồ sơ'],
    icon: <Award className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Đi từ lõi nghiệp vụ, theo sát cả 9 nhóm nhiệm vụ trước;', indent: 0 },
      { type: 'dash', text: 'Tổng hợp, đưa vào quy chế, sau đó đưa vào hồ sơ năng lực.', indent: 0 }
    ],
    rawText: `X. Nhóm 10: Xây dựng Hồ sơ năng lực
- Đi từ lõi nghiệp vụ, theo sát cả 9 nhóm nhiệm vụ trước;
- Tổng hợp, đưa vào quy chế, sau đó đưa vào hồ sơ năng lực.`
  },
  {
    id: 11,
    roman: 'XI',
    title: 'Đầu tư công cụ (gia tăng năng suất)',
    rawHeader: 'XI. Nhóm 11: Đầu tư công cụ (gia tăng năng suất)',
    category: 'Đầu tư công cụ',
    pillBg: 'bg-[#0284C7]',
    statusText: 'Công Cụ Số & RDI',
    statusColor: 'text-[#0284C7] dark:text-sky-400',
    boxTheme: 'border-[#0284C7]/35 dark:border-sky-800/80 bg-sky-50/70 dark:bg-sky-950/40 hover:border-[#0284C7]',
    deadline: 'Năm 2026',
    leads: ['Công nghệ IT & RDI'],
    icon: <Wrench className="w-4 h-4 text-[#0284C7]" />,
    contentLines: [
      { type: 'dash', text: 'Có 03 loại công cụ:', indent: 0, isBold: true },
      { type: 'plus', text: 'Công cụ Kết (công cụ trong nội bộ);', indent: 1 },
      { type: 'plus', text: 'Công cụ Nối (công cụ có tỷ trọng nội bộ lớn hơn, sau đó thông ra ngoài);', indent: 1 },
      { type: 'plus', text: 'Công cụ Kết Nối: Web và Showroom;', indent: 1 },
      { type: 'dash', text: 'Đầu tư trọng điểm vào công cụ số, nhưng không bỏ qua công cụ thiết yếu phục vụ RDI).', indent: 0 }
    ],
    rawText: `XI. Nhóm 11: Đầu tư công cụ (gia tăng năng suất)
- Có 03 loại công cụ:
+ Công cụ Kết (công cụ trong nội bộ);
+ Công cụ Nối (công cụ có tỷ trọng nội bộ lớn hơn, sau đó thông ra ngoài);
+ Công cụ Kết Nối: Web và Showroom;
- Đầu tư trọng điểm vào công cụ số, nhưng không bỏ qua công cụ thiết yếu phục vụ RDI).`
  }
];

export const FULL_DOCUMENT_TEXT = `11 NHÓM NHIỆM VỤ TRONG KẾ HOẠCH 2026

I. Nhóm 1: Giải phóng hàng tồn (Rất bức thiết):
1. Các nhóm hàng tồn:
- Nguyên liệu (Bán thành phẩm, Đơn Nguyên và Đa nguyên);
- Vật liệu; vật tư;
- Hàng thành phẩm tại các kho;
- Máy móc, trang thiết bị, …
2. Deadline: 28/02/2026;
3. Đối tượng: Giải phóng hàng tồn thông qua chủ thể chính là thương mại (bà Trang), nếu không thương mại được thì phải tiêu hủy.

II. Nhóm 2: Thiết lập cấu trúc chi cho Âu Việt, mở rộng ra cấu trúc chi cho toàn bộ.
Thiết lập cấu trúc chi → Tháo gỡ, giảm tải nghiệp vụ cho bà Chiều → Giảm tải nghiệp vụ cho người chịu trách nhiệm pháp nhân cũ về Chi thường xuyên bắt buộc và chi bắt buộc.
Deadline: 15/01/2026.

III. Nhóm 3: 07 đối tác lớn của Âu Việt, tìm mọi cách để nuôi được nó.
- Trong Thương mại: Nắm (tìm để hiểu) được kế hoạch thương mại của họ, thấu hiểu để phục vụ.
- Chủ thể: Bà Trang:
+ Chỉ mặt đặt tên, sắp xếp, định hình rõ con người, nhóm nghiệp vụ, …
+ Làm công tác đối ngoại, trực tiếp lấy thông tin thị trường; chuyển tiếp thông tin từ Âu Việt sang AVG, thông qua 2 đầu mối thương mại của Âu Việt (bà Bích và bà Mây).
- Đi vào nghiệp vụ:
+ Thông tin kỹ thuật: Liệt kê, thống kê nhãn hàng, nhãn hiệu; chủ động chỉnh sửa trước. Deadline: Hết tháng 01/2026;
+ Thông tin pháp lý: Deadline: Trước và trong tháng 02/2026;
+ Thông tin dữ liệu hàng hóa;
+ Thông tin dữ liệu tài chính, tiền tệ.

IV. Nhóm 4: Xây dựng nội quy, quy chế công ty
- Tổng hợp từ nhóm I, II, III, IV sẽ ra:
+ Quy chế chung;
+ Quy chế nghiệp vụ;
+ Quy chế nhân sự;
- Nội dung: Tập trung vào nội dung Chi, Thu, liên quan đến xác lập nguồn chi; làm từng bước, khi cần sẽ mở rộng, bổ sung;
- Deadline: Hết quý 2 năm 2026.

V. Nhóm 5: Thương mại
- Lõi:
+ Không gia tăng áp lực cho nhà máy Âu Việt;
+ Nhánh Chiến lược:
● Phát triển thương mại: Enzyme;
  □ Bán Sản phẩm có Enzyme: Xu hướng tiêu dùng xanh;
  □ Bán Enzyme cho các đối tác sản xuất tại Việt Nam;
● Phát triển thương mại: Bán Bán thành phẩm.

VI. Nhóm 6: Thiết lập cấu trúc sản xuất
- Tổng hợp từ I, II, III, IV và neo vào 3 Kho:
+ Kho đầu vào;
+ Kho thương phẩm;
+ Kho lưu chuyển.
- Khi Âu Việt giải quyết xong các vấn đề bức thiết, cấp thiết, … thì có thể sử dụng một số nguyên tắc của nhà máy mới.

VII. Nhóm 7: RDI
- Thúc đẩy sớm (phụ thuộc hoàn toàn vào kế hoạch thương mại): H1, H2 (lưu ý làm khi cần đẩy hàng tồn); tạo ra HPHT;
- Liên quan enzyme:
+ Hiểu, làm chủ được thông tin kỹ thuật của nguyên liệu Enzyme;
+ Chú trọng vào H1, H2 của những cái có nguyên liệu Enzyme;
+ Phải chuẩn hóa được dung môi hay tổ hợp dung môi; Đầu tư khai thác trọng tâm trọng điểm pH và liên quan đến Enzyme.
- Hương: Không được lan man vào hương liệu.
- Nhiệt độ: Làm chủ dung sai biến nhiệt của H1, H2; Đồng bộ dung sai biến nhiệt trong sản xuất, đặc biệt liên quan đến enzyme.

VIII. Nhóm 8: Thiết lập nghiệp vụ hệ thống, phục vụ 07 nhóm nhiệm vụ trên.
- Sau đó, thực hiện liên kết hệ thống; năm 2026: Lấy AVG để dẫn dắt, liên kết.
- Chủ thể: AVG; DH tạm thời AVG chịu trách nhiệm;

XIX. Nhóm 9: Nhân sự, con người
- Năm 2026:
+ Tiếp tục tập trung phát triển năng lực của các đầu mối, năng lực con người; Không tăng thêm người;
+ Tiếp tục duy trì gói sức khỏe tinh thần;
+ DH cam kết mức thu nhập cơ sở tăng 8% so với năm 2025;
- Năm 2027: Gói Sức khỏe tinh thần sẽ là cái tên khác nhưng gốc vẫn là đầu tư vào sức khoẻ tinh thần.

X. Nhóm 10: Xây dựng Hồ sơ năng lực
- Đi từ lõi nghiệp vụ, theo sát cả 9 nhóm nhiệm vụ trước;
- Tổng hợp, đưa vào quy chế, sau đó đưa vào hồ sơ năng lực.

XI. Nhóm 11: Đầu tư công cụ (gia tăng năng suất)
- Có 03 loại công cụ:
+ Công cụ Kết (công cụ trong nội bộ);
+ Công cụ Nối (công cụ có tỷ trọng nội bộ lớn hơn, sau đó thông ra ngoài);
+ Công cụ Kết Nối: Web và Showroom;
- Đầu tư trọng điểm vào công cụ số, nhưng không bỏ qua công cụ thiết yếu phục vụ RDI).`;

export const AnnualPlanView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'document'>('cards');
  const [copiedGroup, setCopiedGroup] = useState<number | null>(null);
  const [copiedFullDoc, setCopiedFullDoc] = useState<boolean>(false);

  const handleCopyText = (text: string, groupId?: number) => {
    navigator.clipboard.writeText(text);
    if (groupId !== undefined) {
      setCopiedGroup(groupId);
      setTimeout(() => setCopiedGroup(null), 2000);
    } else {
      setCopiedFullDoc(true);
      setTimeout(() => setCopiedFullDoc(null as any), 2000);
    }
  };

  const filteredTaskGroups = useMemo(() => {
    return TASK_GROUPS.filter(group => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || (
        group.rawHeader.toLowerCase().includes(q) ||
        group.rawText.toLowerCase().includes(q) ||
        group.category.toLowerCase().includes(q) ||
        (group.deadline && group.deadline.toLowerCase().includes(q)) ||
        (group.leads || []).some(l => l.toLowerCase().includes(q))
      );

      let matchesCategory = true;
      if (selectedFilter !== 'ALL') {
        matchesCategory = group.category === selectedFilter;
      }

      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedFilter]);

  const categories = useMemo(() => {
    const cats = new Set(TASK_GROUPS.map(g => g.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 🔮 HERO BANNER HỆ THỐNG: KẾ HOẠCH NĂM 2026 - AVG ONE EXECUTIVE STYLE */}
      <div className="flex-shrink-0 bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 rounded-[24px] p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Title & Animated Slogan Box Badge */}
          <div className="space-y-2 text-left flex-shrink-0">
            {/* Animated Slogan Badge */}
            <div className="relative inline-block p-0.5 rounded-xl transition-all duration-300">
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="system-annual-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="35%" stopColor="#00A8E8" />
                    <stop offset="70%" stopColor="#FF7043" />
                    <stop offset="100%" stopColor="#F15A24" />
                  </linearGradient>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="8"
                  ry="8"
                  fill="none"
                  stroke="url(#system-annual-border-gradient)"
                  strokeWidth="1.5"
                  className="animate-slogan-box-border"
                />
              </svg>
              <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-transparent text-xs font-extrabold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>AVG SYSTEM & ANNUAL STRATEGY 2026</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#231F20] dark:text-white tracking-tight flex items-baseline gap-2.5 flex-wrap">
                <span>11 NHÓM NHIỆM VỤ TRONG</span>
                <span className="relative inline-block px-1 font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0284C7] via-[#00A8E8] to-[#F15A24]">
                  <span className="relative z-10">KẾ HOẠCH 2026</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3.5 text-[#F15A24] opacity-50 -z-0 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M 0,10 Q 100,2 200,12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw-line-3" />
                  </svg>
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                Văn bản gốc ban hành chuẩn y nguyên 100% — Toàn diện các nhóm nhiệm vụ bức thiết & chiến lược 2026
              </p>
            </div>
          </div>

          {/* Right: Quick Navigation 11 Task Groups Grid */}
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Truy cập nhanh 11 nhóm nhiệm vụ:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 w-full">
              {TASK_GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setViewMode('cards');
                    setTimeout(() => {
                      const el = document.getElementById(`task-group-${g.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 50);
                  }}
                  className="bg-slate-100/90 dark:bg-slate-800/90 hover:bg-sky-50 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all duration-150 shadow-2xs hover:border-[#0284C7] group text-left"
                  title={g.rawHeader}
                >
                  <span className="w-4 h-4 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {g.id}
                  </span>
                  <span className="truncate text-[11px] font-semibold">{g.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 📌 SECTION 2: VIEW CONTROLS & CONTENT WRAPPER */}
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>📋 NỘI DUNG KẾ HOẠCH NĂM 2026</span>
              </h2>
              <span className="px-2.5 py-0.5 bg-[#00A8E8]/10 text-[#00A8E8] rounded-md text-xs font-extrabold border border-[#00A8E8]/30">
                11 Nhóm Chuẩn Y Nguyên
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Nội dung chuẩn chỉnh nguyên văn bản PDF: Chi tiết từng nhóm hàng tồn, cấu trúc chi, đối tác, quy chế, thương mại, sản xuất, RDI, hệ thống, nhân sự, hồ sơ năng lực và công cụ.
            </p>
          </div>

          {/* Mode Switcher & Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-[#0284C7] dark:text-sky-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Dạng Thẻ</span>
              </button>
              <button
                onClick={() => setViewMode('document')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'document'
                    ? 'bg-white dark:bg-slate-700 text-[#0284C7] dark:text-sky-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Toàn Văn Nguyên Gốc</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm kiếm nội dung, đầu mối..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/40 font-medium"
              />
            </div>

            {/* Filter by Category */}
            {viewMode === 'cards' && (
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold cursor-pointer"
              >
                <option value="ALL">Tất cả nhóm</option>
                {categories.filter(c => c !== 'ALL').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            {/* Copy Full Document Button */}
            <button
              onClick={() => handleCopyText(FULL_DOCUMENT_TEXT)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
              title="Sao chép toàn văn bản gốc 11 nhóm nhiệm vụ"
            >
              {copiedFullDoc ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sao chép văn bản</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 🌟 VIEW 1: DẠNG THẺ CHI TIẾT 11 NHÓM NHIỆM VỤ (CARD GRID VIEW) */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredTaskGroups.map((group) => {
              const isCopied = copiedGroup === group.id;

              return (
                <div
                  key={group.id}
                  id={`task-group-${group.id}`}
                  className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md space-y-4 flex flex-col justify-between scroll-mt-6 ${group.boxTheme}`}
                >
                  {/* Card Header: Roman Numeral Pill, Category, Copy button, Status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200/50 dark:border-slate-800/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-white text-[11px] font-black rounded-lg uppercase tracking-wide shadow-xs ${group.pillBg}`}>
                        NHÓM {group.id} ({group.roman})
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {group.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(group.rawText, group.id)}
                        className="p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        title="Sao chép nội dung nhóm này"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <div className="flex items-center gap-1.5 text-xs font-extrabold">
                        {group.icon}
                        <span className={group.statusColor}>
                          {group.statusText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Title (Exact Raw Header from Document) */}
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug">
                      {group.rawHeader}
                    </h3>
                  </div>

                  {/* Verbatim Content Lines with hierarchical indentation & clean typography */}
                  <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed flex-1 bg-white/70 dark:bg-slate-900/60 rounded-xl p-3.5 border border-slate-200/50 dark:border-slate-800/50">
                    {group.contentLines.map((line, idx) => {
                      // Formatting based on type
                      return (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 ${
                            line.indent === 1 ? 'ml-4 sm:ml-5' :
                            line.indent === 2 ? 'ml-8 sm:ml-9' :
                            line.indent === 3 ? 'ml-12 sm:ml-13' : 'ml-0'
                          } ${line.isBold ? 'font-bold text-slate-900 dark:text-white' : 'font-normal text-slate-700 dark:text-slate-300'}`}
                        >
                          {/* Prefix Marker */}
                          {line.type === 'dash' && (
                            <span className="text-[#0284C7] font-black select-none mt-0.5">-</span>
                          )}
                          {line.type === 'plus' && (
                            <span className="text-amber-500 font-black select-none mt-0.5">+</span>
                          )}
                          {line.type === 'bullet' && (
                            <span className="text-[#F15A24] select-none text-[10px] mt-1">●</span>
                          )}
                          {line.type === 'square' && (
                            <span className="text-emerald-500 select-none text-[11px] mt-0.5">□</span>
                          )}
                          {line.type === 'flow' && (
                            <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] flex-shrink-0 mt-0.5" />
                          )}
                          {line.type === 'deadline' && (
                            <Clock className="w-3.5 h-3.5 text-[#F15A24] flex-shrink-0 mt-0.5" />
                          )}

                          {/* Text content */}
                          <div className="flex-1">
                            {line.type === 'deadline' ? (
                              <span className="text-[#F15A24] font-black">{line.text}</span>
                            ) : (
                              <span>{line.text}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Footer: Metadata (Deadline & Leads) */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] gap-2 flex-wrap">
                    {group.deadline && (
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#00A8E8]" />
                        <span>Deadline: <strong className="text-[#0284C7] dark:text-sky-400 font-extrabold">{group.deadline}</strong></span>
                      </div>
                    )}

                    {group.leads && group.leads.length > 0 && (
                      <div className="text-slate-600 dark:text-slate-300 font-semibold truncate max-w-[260px]">
                        Đầu mối: <strong className="text-slate-900 dark:text-white font-bold">{group.leads.join(', ')}</strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 🌟 VIEW 2: DẠNG TOÀN VĂN NGUYÊN GỐC (FULL VERBATIM DOCUMENT VIEW) */}
        {viewMode === 'document' && (
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 font-serif">
            
            {/* Document Header */}
            <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs uppercase tracking-widest font-sans font-bold text-slate-500">
                TẬP ĐOÀN AVG • VĂN BẢN ĐIỀU HÀNH KẾ HOẠCH NĂM 2026
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
                11 NHÓM NHIỆM VỤ TRONG KẾ HOẠCH 2026
              </h2>
              <div className="text-xs font-sans text-slate-400">
                (Ban hành và lưu hành nội bộ — Đúng nguyên văn theo tài liệu chỉ đạo)
              </div>
            </div>

            {/* Document Body (verbatim from PDF) */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
              
              {/* Nhóm 1 */}
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">
                  I. Nhóm 1: Giải phóng hàng tồn (Rất bức thiết):
                </p>
                <p className="pl-4 font-semibold">1. Các nhóm hàng tồn:</p>
                <p className="pl-8">- Nguyên liệu (Bán thành phẩm, Đơn Nguyên và Đa nguyên);</p>
                <p className="pl-8">- Vật liệu; vật tư;</p>
                <p className="pl-8">- Hàng thành phẩm tại các kho;</p>
                <p className="pl-8">- Máy móc, trang thiết bị, …</p>
                <p className="pl-4 font-semibold">2. Deadline: 28/02/2026;</p>
                <p className="pl-4 font-semibold">
                  3. Đối tượng: Giải phóng hàng tồn thông qua chủ thể chính là thương mại (bà Trang), nếu không thương mại được thì phải tiêu hủy.
                </p>
              </div>

              {/* Nhóm 2 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  II. Nhóm 2: Thiết lập cấu trúc chi cho Âu Việt, mở rộng ra cấu trúc chi cho toàn bộ.
                </p>
                <p className="pl-4">
                  Thiết lập cấu trúc chi → Tháo gỡ, giảm tải nghiệp vụ cho bà Chiều → Giảm tải nghiệp vụ cho người chịu trách nhiệm pháp nhân cũ về Chi thường xuyên bắt buộc và chi bắt buộc.
                </p>
                <p className="pl-4 font-semibold text-rose-600 dark:text-rose-400">
                  Deadline: 15/01/2026.
                </p>
              </div>

              {/* Nhóm 3 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  III. Nhóm 3: 07 đối tác lớn của Âu Việt, tìm mọi cách để nuôi được nó.
                </p>
                <p className="pl-4">- Trong Thương mại: Nắm (tìm để hiểu) được kế hoạch thương mại của họ, thấu hiểu để phục vụ.</p>
                <p className="pl-4">- Chủ thể: Bà Trang:</p>
                <p className="pl-8">+ Chỉ mặt đặt tên, sắp xếp, định hình rõ con người, nhóm nghiệp vụ, …</p>
                <p className="pl-8">
                  + Làm công tác đối ngoại, trực tiếp lấy thông tin thị trường; chuyển tiếp thông tin từ Âu Việt sang AVG, thông qua 2 đầu mối thương mại của Âu Việt (bà Bích và bà Mây).
                </p>
                <p className="pl-4">- Đi vào nghiệp vụ:</p>
                <p className="pl-8">
                  + Thông tin kỹ thuật: Liệt kê, thống kê nhãn hàng, nhãn hiệu; chủ động chỉnh sửa trước. <span className="font-semibold text-rose-600 dark:text-rose-400">Deadline: Hết tháng 01/2026;</span>
                </p>
                <p className="pl-8">
                  + Thông tin pháp lý: <span className="font-semibold text-rose-600 dark:text-rose-400">Deadline: Trước và trong tháng 02/2026;</span>
                </p>
                <p className="pl-8">+ Thông tin dữ liệu hàng hóa;</p>
                <p className="pl-8">+ Thông tin dữ liệu tài chính, tiền tệ.</p>
              </div>

              {/* Nhóm 4 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  IV. Nhóm 4: Xây dựng nội quy, quy chế công ty
                </p>
                <p className="pl-4">- Tổng hợp từ nhóm I, II, III, IV sẽ ra:</p>
                <p className="pl-8">+ Quy chế chung;</p>
                <p className="pl-8">+ Quy chế nghiệp vụ;</p>
                <p className="pl-8">+ Quy chế nhân sự;</p>
                <p className="pl-4">
                  - Nội dung: Tập trung vào nội dung Chi, Thu, liên quan đến xác lập nguồn chi; làm từng bước, khi cần sẽ mở rộng, bổ sung;
                </p>
                <p className="pl-4 font-semibold text-rose-600 dark:text-rose-400">
                  - Deadline: Hết quý 2 năm 2026.
                </p>
              </div>

              {/* Nhóm 5 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  V. Nhóm 5: Thương mại
                </p>
                <p className="pl-4">- Lõi:</p>
                <p className="pl-8">+ Không gia tăng áp lực cho nhà máy Âu Việt;</p>
                <p className="pl-8">+ Nhánh Chiến lược:</p>
                <p className="pl-12 font-semibold">● Phát triển thương mại: Enzyme;</p>
                <p className="pl-16">□ Bán Sản phẩm có Enzyme: Xu hướng tiêu dùng xanh;</p>
                <p className="pl-16">□ Bán Enzyme cho các đối tác sản xuất tại Việt Nam;</p>
                <p className="pl-12 font-semibold">● Phát triển thương mại: Bán Bán thành phẩm.</p>
              </div>

              {/* Nhóm 6 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  VI. Nhóm 6: Thiết lập cấu trúc sản xuất
                </p>
                <p className="pl-4">- Tổng hợp từ I, II, III, IV và neo vào 3 Kho:</p>
                <p className="pl-8">+ Kho đầu vào;</p>
                <p className="pl-8">+ Kho thương phẩm;</p>
                <p className="pl-8">+ Kho lưu chuyển.</p>
                <p className="pl-4">
                  - Khi Âu Việt giải quyết xong các vấn đề bức thiết, cấp thiết, … thì có thể sử dụng một số nguyên tắc của nhà máy mới.
                </p>
              </div>

              {/* Nhóm 7 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  VII. Nhóm 7: RDI
                </p>
                <p className="pl-4">
                  - Thúc đẩy sớm (phụ thuộc hoàn toàn vào kế hoạch thương mại): H1, H2 (lưu ý làm khi cần đẩy hàng tồn); tạo ra HPHT;
                </p>
                <p className="pl-4">- Liên quan enzyme:</p>
                <p className="pl-8">+ Hiểu, làm chủ được thông tin kỹ thuật của nguyên liệu Enzyme;</p>
                <p className="pl-8">+ Chú trọng vào H1, H2 của những cái có nguyên liệu Enzyme;</p>
                <p className="pl-8">
                  + Phải chuẩn hóa được dung môi hay tổ hợp dung môi; Đầu tư khai thác trọng tâm trọng điểm pH và liên quan đến Enzyme.
                </p>
                <p className="pl-4">- Hương: Không được lan man vào hương liệu.</p>
                <p className="pl-4">
                  - Nhiệt độ: Làm chủ dung sai biến nhiệt của H1, H2; Đồng bộ dung sai biến nhiệt trong sản xuất, đặc biệt liên quan đến enzyme.
                </p>
              </div>

              {/* Nhóm 8 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  VIII. Nhóm 8: Thiết lập nghiệp vụ hệ thống, phục vụ 07 nhóm nhiệm vụ trên.
                </p>
                <p className="pl-4">- Sau đó, thực hiện liên kết hệ thống; năm 2026: Lấy AVG để dẫn dắt, liên kết.</p>
                <p className="pl-4">- Chủ thể: AVG; DH tạm thời AVG chịu trách nhiệm;</p>
              </div>

              {/* Nhóm 9 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  XIX. Nhóm 9: Nhân sự, con người
                </p>
                <p className="pl-4">- Năm 2026:</p>
                <p className="pl-8">+ Tiếp tục tập trung phát triển năng lực của các đầu mối, năng lực con người; Không tăng thêm người;</p>
                <p className="pl-8">+ Tiếp tục duy trì gói sức khỏe tinh thần;</p>
                <p className="pl-8 font-semibold text-emerald-600 dark:text-emerald-400">
                  + DH cam kết mức thu nhập cơ sở tăng 8% so với năm 2025;
                </p>
                <p className="pl-4">
                  - Năm 2027: Gói Sức khỏe tinh thần sẽ là cái tên khác nhưng gốc vẫn là đầu tư vào sức khoẻ tinh thần.
                </p>
              </div>

              {/* Nhóm 10 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  X. Nhóm 10: Xây dựng Hồ sơ năng lực
                </p>
                <p className="pl-4">- Đi từ lõi nghiệp vụ, theo sát cả 9 nhóm nhiệm vụ trước;</p>
                <p className="pl-4">- Tổng hợp, đưa vào quy chế, sau đó đưa vào hồ sơ năng lực.</p>
              </div>

              {/* Nhóm 11 */}
              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  XI. Nhóm 11: Đầu tư công cụ (gia tăng năng suất)
                </p>
                <p className="pl-4">- Có 03 loại công cụ:</p>
                <p className="pl-8">+ Công cụ Kết (công cụ trong nội bộ);</p>
                <p className="pl-8">+ Công cụ Nối (công cụ có tỷ trọng nội bộ lớn hơn, sau đó thông ra ngoài);</p>
                <p className="pl-8">+ Công cụ Kết Nối: Web và Showroom;</p>
                <p className="pl-4">
                  - Đầu tư trọng điểm vào công cụ số, nhưng không bỏ qua công cụ thiết yếu phục vụ RDI).
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
