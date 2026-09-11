/**
 * AVG ONE - AI SIGN LANGUAGE DICTIONARY & GESTURE SYSTEM
 * Bộ từ điển Ngôn ngữ Ký hiệu Việt Nam (VSL) & Đánh vần ngón tay (Fingerspelling)
 * Tích hợp chuẩn 21 điểm Hand Landmarks (MediaPipe Hands standard)
 */

export interface HandLandmarkPoint {
  x: number; // 0..100 (tọa độ phần trăm ngang)
  y: number; // 0..100 (tọa độ phần trăm dọc)
  z?: number; // chiều sâu tương đối
}

export interface HandPose {
  // 21 điểm cho mỗi bàn tay: 0: Wrist, 1-4: Thumb, 5-8: Index, 9-12: Middle, 13-16: Ring, 17-20: Pinky
  landmarks: HandLandmarkPoint[];
  wristPosition: { x: number; y: number };
  rotation: number; // Góc xoay cổ tay theo độ
  armAngle?: number; // Góc cẳng tay
}

export interface SignGesture {
  id: string;
  word: string;
  category: 'greeting' | 'common' | 'work' | 'emotion' | 'letters' | 'numbers';
  description: string;
  durationMs: number; // Thời gian diễn hoạt cử chỉ (ms)
  leftHand: HandPose;
  rightHand: HandPose;
  facialExpression?: 'neutral' | 'smile' | 'question' | 'nod' | 'alert';
  isTwoHanded: boolean;
}

// ============================================================================
// HÀM HELPER TẠO POSE BÀN TAY TIÊU CHUẨN (21 LANDMARKS MEDIA-PIPE STYLE)
// ============================================================================
function createBaseHand(wristX: number, wristY: number, config: {
  thumbExtended?: boolean;
  indexExtended?: boolean;
  middleExtended?: boolean;
  ringExtended?: boolean;
  pinkyExtended?: boolean;
  handOpen?: boolean;
  fist?: boolean;
  point?: boolean;
  peace?: boolean;
  thumbsUp?: boolean;
  openPalm?: boolean;
  pinch?: boolean;
  tiltAngle?: number;
}): HandPose {
  const rotation = config.tiltAngle || 0;
  const isLeft = wristX < 50;
  const dir = isLeft ? -1 : 1;

  // Điểm 0: Cổ tay (Wrist)
  const lm: HandLandmarkPoint[] = [{ x: wristX, y: wristY }];

  const open = config.openPalm || config.handOpen;
  const fist = config.fist;
  const point = config.point;
  const peace = config.peace;
  const thumbsUp = config.thumbsUp;
  const pinch = config.pinch;

  const tExt = thumbsUp || open || config.thumbExtended || false;
  const iExt = point || peace || open || config.indexExtended || false;
  const mExt = peace || open || config.middleExtended || false;
  const rExt = open || config.ringExtended || false;
  const pExt = open || config.pinkyExtended || false;

  // 1-4: Ngón cái (Thumb)
  const thumbBaseX = wristX + dir * 5;
  const thumbBaseY = wristY - 3;
  lm.push({ x: thumbBaseX, y: thumbBaseY });
  lm.push({ x: thumbBaseX + dir * 4, y: thumbBaseY - 4 });
  lm.push({ x: thumbBaseX + dir * 6, y: thumbBaseY - 8 });
  lm.push({
    x: tExt ? (thumbBaseX + dir * 8) : (thumbBaseX + dir * 2),
    y: tExt ? (thumbBaseY - (thumbsUp ? 14 : 10)) : (thumbBaseY - 3)
  });

  // Helper hàm sinh ngón (4 đốt: MCP, PIP, DIP, TIP)
  const makeFinger = (offsetX: number, extended: boolean, length: number) => {
    const mcpX = wristX + dir * offsetX;
    const mcpY = wristY - 10;
    lm.push({ x: mcpX, y: mcpY }); // MCP
    if (extended) {
      lm.push({ x: mcpX + dir * (offsetX * 0.1), y: mcpY - length * 0.4 }); // PIP
      lm.push({ x: mcpX + dir * (offsetX * 0.15), y: mcpY - length * 0.75 }); // DIP
      lm.push({ x: mcpX + dir * (offsetX * 0.2), y: mcpY - length }); // TIP
    } else {
      // Co lại dạng nắm đấm
      lm.push({ x: mcpX, y: mcpY - 4 });
      lm.push({ x: mcpX - dir * 1, y: mcpY - 2 });
      lm.push({ x: mcpX - dir * 2, y: mcpY + 1 });
    }
  };

  // 5-8: Ngón trỏ (Index)
  makeFinger(4, iExt, pinch ? 8 : 16);

  // 9-12: Ngón giữa (Middle)
  makeFinger(1, mExt, 18);

  // 13-16: Ngón áp út (Ring)
  makeFinger(-2, rExt, 15);

  // 17-20: Ngón út (Pinky)
  makeFinger(-5, pExt, 12);

  return {
    landmarks: lm,
    wristPosition: { x: wristX, y: wristY },
    rotation,
    armAngle: isLeft ? -25 : 25
  };
}

// Tư thế nghỉ của 2 bàn tay (Rest Pose)
export const REST_POSE: { left: HandPose; right: HandPose } = {
  left: createBaseHand(34, 76, { handOpen: false, fist: true, tiltAngle: 15 }),
  right: createBaseHand(66, 76, { handOpen: false, fist: true, tiltAngle: -15 })
};

// ============================================================================
// TỪ ĐIỂN CỬ CHỈ NGÔN NGỮ KÝ HIỆU THÔNG DỤNG (VIETNAMESE SIGN LANGUAGE)
// ============================================================================
export const SIGN_DICTIONARY: Record<string, SignGesture> = {
  'chao': {
    id: 'chao',
    word: 'Xin chào',
    category: 'greeting',
    description: 'Bàn tay phải mở thẳng áp lên thái dương rồi vẫy nhẹ hướng về phía trước thể hiện lời chào trân trọng',
    durationMs: 1400,
    facialExpression: 'smile',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(64, 38, { openPalm: true, tiltAngle: -15 })
  },
  'camon': {
    id: 'camon',
    word: 'Cảm ơn',
    category: 'greeting',
    description: 'Hai bàn tay chắp hoặc đặt đầu ngón tay chạm môi rồi đưa nhẹ ra phía trước kèm nụ cười biết ơn',
    durationMs: 1300,
    facialExpression: 'smile',
    isTwoHanded: true,
    leftHand: createBaseHand(44, 46, { openPalm: true, tiltAngle: 25 }),
    rightHand: createBaseHand(56, 46, { openPalm: true, tiltAngle: -25 })
  },
  'tambiet': {
    id: 'tambiet',
    word: 'Tạm biệt',
    category: 'greeting',
    description: 'Bàn tay phải mở ngang vai, vẫy qua lại nhịp nhàng',
    durationMs: 1200,
    facialExpression: 'smile',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(70, 36, { openPalm: true, tiltAngle: 10 })
  },
  'dongy': {
    id: 'dongy',
    word: 'Đồng ý',
    category: 'common',
    description: 'Bàn tay phải nắm, giơ ngón tay cái hướng lên (thumbs up) và gật đầu xác nhận',
    durationMs: 1200,
    facialExpression: 'nod',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(60, 48, { thumbsUp: true, tiltAngle: 0 })
  },
  'khong': {
    id: 'khong',
    word: 'Không',
    category: 'common',
    description: 'Bàn tay phải giơ ngón trỏ lắc nhẹ qua lại biểu thị sự phủ định hoặc không đồng ý',
    durationMs: 1100,
    facialExpression: 'neutral',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(62, 44, { point: true, tiltAngle: 5 })
  },
  'hieuroi': {
    id: 'hieuroi',
    word: 'Tôi hiểu rồi',
    category: 'common',
    description: 'Bàn tay phải đặt nhẹ lên ngực rồi mở lòng bàn tay hướng về phía trước thể hiện đã tiếp nhận rõ',
    durationMs: 1300,
    facialExpression: 'nod',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(54, 42, { openPalm: true, tiltAngle: -10 })
  },
  'khiemthinh': {
    id: 'khiemthinh',
    word: 'Khiếm thính',
    category: 'common',
    description: 'Ngón trỏ tay phải chạm nhẹ vào tai rồi đưa về phía miệng biểu thị ngôn ngữ của cộng đồng người điếc',
    durationMs: 1500,
    facialExpression: 'neutral',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(65, 34, { point: true, tiltAngle: -20 })
  },
  'hop': {
    id: 'hop',
    word: 'Cuộc họp',
    category: 'work',
    description: 'Hai bàn tay mở đối xứng khép dần lại vào giữa biểu thị mọi người cùng hội tụ họp bàn',
    durationMs: 1400,
    facialExpression: 'neutral',
    isTwoHanded: true,
    leftHand: createBaseHand(42, 50, { openPalm: true, tiltAngle: 40 }),
    rightHand: createBaseHand(58, 50, { openPalm: true, tiltAngle: -40 })
  },
  'congviec': {
    id: 'congviec',
    word: 'Công việc',
    category: 'work',
    description: 'Hai bàn tay nắm lại, cổ tay phải gõ nhẹ lên mu bàn tay trái nhịp nhàng',
    durationMs: 1300,
    facialExpression: 'neutral',
    isTwoHanded: true,
    leftHand: createBaseHand(45, 52, { fist: true, tiltAngle: 15 }),
    rightHand: createBaseHand(55, 48, { fist: true, tiltAngle: -15 })
  },
  'baocao': {
    id: 'baocao',
    word: 'Báo cáo',
    category: 'work',
    description: 'Bàn tay trái xòe ngửa làm trang tài liệu, các đầu ngón tay phải miết nhẹ biểu thị trình bày báo cáo',
    durationMs: 1400,
    facialExpression: 'neutral',
    isTwoHanded: true,
    leftHand: createBaseHand(42, 54, { openPalm: true, tiltAngle: 45 }),
    rightHand: createBaseHand(56, 46, { point: true, tiltAngle: -30 })
  },
  'giupdo': {
    id: 'giupdo',
    word: 'Giúp đỡ',
    category: 'common',
    description: 'Lòng bàn tay trái nâng dưới nắm tay phải, cả hai tay cùng đưa lên thể hiện sự hỗ trợ tương trợ',
    durationMs: 1350,
    facialExpression: 'smile',
    isTwoHanded: true,
    leftHand: createBaseHand(46, 56, { openPalm: true, tiltAngle: 20 }),
    rightHand: createBaseHand(54, 48, { thumbsUp: true, tiltAngle: 0 })
  },
  'tot': {
    id: 'tot',
    word: 'Tốt / Xuất sắc',
    category: 'emotion',
    description: 'Hai ngón tay cái giơ cao, khuôn mặt rạng rỡ biểu thị sự khen ngợi và hài lòng',
    durationMs: 1200,
    facialExpression: 'smile',
    isTwoHanded: true,
    leftHand: createBaseHand(38, 46, { thumbsUp: true, tiltAngle: 10 }),
    rightHand: createBaseHand(62, 46, { thumbsUp: true, tiltAngle: -10 })
  },
  'avgone': {
    id: 'avgone',
    word: 'AVG One',
    category: 'work',
    description: 'Ký hiệu số 1 vươn cao với vòng tròn công nghệ kết nối biểu thị nền tảng số AVG One hợp nhất',
    durationMs: 1500,
    facialExpression: 'smile',
    isTwoHanded: true,
    leftHand: createBaseHand(42, 50, { openPalm: true, tiltAngle: 30 }),
    rightHand: createBaseHand(58, 38, { point: true, tiltAngle: 0 })
  },
  'langnghe': {
    id: 'langnghe',
    word: 'Lắng nghe',
    category: 'common',
    description: 'Bàn tay phải khum nhẹ áp gần vành tai chú ý lắng nghe lời đối thoại',
    durationMs: 1250,
    facialExpression: 'alert',
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(66, 36, { openPalm: true, tiltAngle: -35 })
  },
  'cham': {
    id: 'cham',
    word: 'Nói chậm lại',
    category: 'common',
    description: 'Hai bàn tay mở song song úp xuống đưa từ từ từ trên xuống dưới biểu thị làm chậm nhịp độ',
    durationMs: 1300,
    facialExpression: 'neutral',
    isTwoHanded: true,
    leftHand: createBaseHand(42, 54, { openPalm: true, tiltAngle: 10 }),
    rightHand: createBaseHand(58, 54, { openPalm: true, tiltAngle: -10 })
  }
};

// ============================================================================
// BỘ ĐÁNH VẦN CHỮ CÁI NGÓN TAY (FINGER-SPELLING ALPHABET A-Z)
// ============================================================================
export const FINGERSPELLING_ALPHABET: Record<string, SignGesture> = {
  A: {
    id: 'letter-a',
    word: 'A',
    category: 'letters',
    description: 'Nắm đấm bàn tay với ngón cái áp sát bên ngón trỏ hướng lên',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 48, { fist: true, thumbExtended: true, tiltAngle: 0 })
  },
  B: {
    id: 'letter-b',
    word: 'B',
    category: 'letters',
    description: 'Bốn ngón tay duỗi thẳng khép vào nhau, ngón cái gập ngang lòng bàn tay',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 44, { indexExtended: true, middleExtended: true, ringExtended: true, pinkyExtended: true, tiltAngle: 0 })
  },
  C: {
    id: 'letter-c',
    word: 'C',
    category: 'letters',
    description: 'Các ngón tay khum cong tạo thành hình chữ C',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 46, { openPalm: false, pinch: true, tiltAngle: -20 })
  },
  D: {
    id: 'letter-d',
    word: 'D',
    category: 'letters',
    description: 'Ngón trỏ duỗi thẳng, các ngón còn lại chạm vào ngón cái tạo hình chữ D',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 44, { point: true, tiltAngle: 0 })
  },
  E: {
    id: 'letter-e',
    word: 'E',
    category: 'letters',
    description: 'Năm ngón tay co cong các đầu ngón tay tỳ lên ngón cái',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 48, { fist: true, tiltAngle: 0 })
  },
  O: {
    id: 'letter-o',
    word: 'O',
    category: 'letters',
    description: 'Tất cả các đầu ngón tay chạm vào ngón cái tạo thành hình tròn chữ O',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 46, { pinch: true, tiltAngle: -10 })
  },
  V: {
    id: 'letter-v',
    word: 'V',
    category: 'letters',
    description: 'Ngón trỏ và ngón giữa duỗi xòe tạo hình chữ V (Victory)',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 44, { peace: true, tiltAngle: 0 })
  },
  Y: {
    id: 'letter-y',
    word: 'Y',
    category: 'letters',
    description: 'Ngón cái và ngón út xòe rộng, ba ngón giữa gập vào trong',
    durationMs: 650,
    isTwoHanded: false,
    leftHand: REST_POSE.left,
    rightHand: createBaseHand(58, 46, { thumbExtended: true, pinkyExtended: true, tiltAngle: 0 })
  }
};

// ============================================================================
// HÀM BÓC TÁCH VĂN BẢN THÀNH CHUỖI CỬ CHỈ KÝ HIỆU (VOICE-TO-SIGN TRANSLATOR)
// ============================================================================
export interface SignSequenceStep {
  gesture: SignGesture;
  sourceText: string;
  isFingerspelling: boolean;
}

/**
 * Phân tích câu nói/văn bản thành chuỗi cử chỉ tay:
 * - Ưu tiên nhận diện cụm từ hoàn chỉnh (Xin chào, Cảm ơn, Cuộc họp, Báo cáo, Khiếm thính...)
 * - Nếu không có cụm từ, tách thành từng từ khóa hoặc đánh vần từng ký tự ngón tay.
 */
export function parseTextToSignSequence(rawText: string): SignSequenceStep[] {
  if (!rawText || !rawText.trim()) return [];

  const normalized = rawText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^\w\s]/g, ' ')
    .trim();

  const originalWords = rawText.trim().split(/\s+/);
  const sequence: SignSequenceStep[] = [];

  // Từ khóa mapping
  const keywordMap: Array<{ keys: string[]; gestureKey: string; label: string }> = [
    { keys: ['xin chao', 'chao', 'hi', 'hello', 'alo'], gestureKey: 'chao', label: 'Xin chào' },
    { keys: ['cam on', 'thank', 'cam ta'], gestureKey: 'camon', label: 'Cảm ơn' },
    { keys: ['tam biet', 'bye', 'chao tam biet'], gestureKey: 'tambiet', label: 'Tạm biệt' },
    { keys: ['dong y', 'ok', 'duyet', 'nhat tri', 'chinh xac', 'dung roi'], gestureKey: 'dongy', label: 'Đồng ý' },
    { keys: ['khong', 'khong dong y', 'tu choi', 'chua duoc'], gestureKey: 'khong', label: 'Không' },
    { keys: ['hieu roi', 'toi hieu', 'da hieu', 'ro roi'], gestureKey: 'hieuroi', label: 'Tôi hiểu rồi' },
    { keys: ['khiem thinh', 'nguoi diec', 'nghe kem'], gestureKey: 'khiemthinh', label: 'Khiếm thính' },
    { keys: ['hop', 'cuoc hop', 'hop ban', 'giao ban'], gestureKey: 'hop', label: 'Cuộc họp' },
    { keys: ['cong viec', 'lam viec', 'nhiem vu', 'tac vu'], gestureKey: 'congviec', label: 'Công việc' },
    { keys: ['baocao', 'bao cao', 'trinh bay', 'ke hoach', 'tai lieu'], gestureKey: 'baocao', label: 'Báo cáo' },
    { keys: ['giup do', 'ho tro', 'giup', 'support'], gestureKey: 'giupdo', label: 'Giúp đỡ' },
    { keys: ['tot', 'tuyet voi', 'xuat sac', 'ok', 'good'], gestureKey: 'tot', label: 'Tốt' },
    { keys: ['avg one', 'avg', 'he thong'], gestureKey: 'avgone', label: 'AVG One' },
    { keys: ['lang nghe', 'nghe', 'chu y'], gestureKey: 'langnghe', label: 'Lắng nghe' },
    { keys: ['cham', 'noi cham', 'tu tu'], gestureKey: 'cham', label: 'Nói chậm lại' }
  ];

  // Kiểm tra cụm từ khóa có trong câu
  for (const item of keywordMap) {
    for (const k of item.keys) {
      if (normalized.includes(k)) {
        const gesture = SIGN_DICTIONARY[item.gestureKey];
        if (gesture) {
          sequence.push({
            gesture,
            sourceText: item.label,
            isFingerspelling: false
          });
        }
        break;
      }
    }
  }

  // Nếu không khớp cụm từ nào, lấy các từ vựng tiêu biểu hoặc chuyển qua đánh vần ngón tay
  if (sequence.length === 0) {
    const firstWord = originalWords[0] || '';
    const cleanWord = firstWord.toUpperCase().replace(/[^A-Z]/g, '');

    if (cleanWord.length > 0) {
      for (const char of cleanWord.slice(0, 5)) {
        const letterGesture = FINGERSPELLING_ALPHABET[char] || FINGERSPELLING_ALPHABET['A'];
        sequence.push({
          gesture: {
            ...letterGesture,
            word: char
          },
          sourceText: char,
          isFingerspelling: true
        });
      }
    } else {
      // Fallback mặc định chào mừng
      sequence.push({
        gesture: SIGN_DICTIONARY['chao'],
        sourceText: rawText,
        isFingerspelling: false
      });
    }
  }

  return sequence;
}
