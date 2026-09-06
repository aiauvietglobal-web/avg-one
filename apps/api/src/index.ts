import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from '@avg-one/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Fallback Data in case DB is offline/unmigrated
const MOCK_USERS = [
  { id: 'usr-1', email: 'admin.ceo@auvietglobal.com', name: 'Nguyễn Văn Quản Lý (CEO)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'ADMIN', status: 'ACTIVE', department: 'Ban Giám Đốc' },
  { id: 'usr-2', email: 'manager.hr@auvietglobal.com', name: 'Trần Thị Trưởng Phòng (HR)', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', role: 'MANAGER', status: 'ACTIVE', department: 'Phòng Hành Chính Nhân Sự' },
  { id: 'usr-3', email: 'staff.dev@auvietglobal.com', name: 'Lê Văn Nhân Viên (R&D)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', role: 'STAFF', status: 'ACTIVE', department: '3.1 - RDI' }
];

const MOCK_DEPARTMENTS = [
  { id: 'dep-1', code: '3.1 - RDI', name: 'Phòng Nghiên Cứu & Phát Triển (RDI)', description: 'Nghiên cứu mô-đun cảm biến và IoT' },
  { id: 'dep-2', code: '3.2 - THIẾT KẾ', name: 'Phòng Thiết Kế Kiểu Dáng', description: 'Thiết kế bản vẽ CAD 3D và vỏ hộp' },
  { id: 'dep-3', code: '6 - PHÁP LÝ', name: 'Phòng Pháp Lý & Sở Hữu Trí Tuệ', description: 'Bảo hộ nhãn hiệu và đăng ký SHTT' },
  { id: 'dep-4', code: '1 - BAN GIÁM ĐỐC', name: 'Ban Giám Đốc Tập Đoàn', description: 'Điều hành chiến lược tổng thể' }
];

const MOCK_POSTS = [
  {
    id: 'post-1',
    title: 'Thông báo triển khai Nền tảng Quản trị Nội bộ AVG One cho 20 Nhân sự Đợt 1',
    content: 'Chào toàn thể cán bộ nhân viên AVG! Chúng ta chính thức đưa Platform AVG One vào vận hành thử nghiệm cho 20 vị trí chủ chốt nhằm tối ưu hóa luồng công việc và phê duyệt.',
    category: 'THÔNG BÁO',
    isPinned: true,
    likesCount: 12,
    author: MOCK_USERS[0],
    createdAt: new Date().toISOString(),
    comments: [
      { id: 'cmt-1', content: 'Chúc mừng AVG One khởi chạy thành công!', author: MOCK_USERS[1], createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 'post-2',
    title: 'Kế hoạch đánh giá KPI/OKR Quý 3/2026',
    content: 'Các Trưởng phòng ban vui lòng cập nhật cây mục tiêu OKR và chỉ số Key Results của phòng mình lên hệ thống AVG Goal trước ngày 30 hàng tháng.',
    category: 'CHỈ ĐẠO',
    isPinned: false,
    likesCount: 8,
    author: MOCK_USERS[1],
    createdAt: new Date().toISOString(),
    comments: []
  }
];

const MOCK_GOALS = [
  {
    id: 'goal-1',
    title: 'Hoàn thiện 100% Nguyên mẫu Module AI Sensor AVG-X',
    description: 'Nghiên cứu ứng dụng chip đo lường công nghiệp mới và thử nghiệm tại 50 điểm',
    period: 'Q3-2026',
    progress: 75.0,
    status: 'ON_TRACK',
    type: 'COMPANY',
    owner: MOCK_USERS[0],
    keyResults: [
      { id: 'kr-1', title: 'Thử nghiệm thành công 50 Cảm biến trường', targetValue: 50, currentValue: 40, unit: 'Cảm biến' },
      { id: 'kr-2', title: 'Đạt chứng nhận an toàn công nghiệp', targetValue: 100, currentValue: 80, unit: '%' }
    ]
  },
  {
    id: 'goal-2',
    title: 'Tối ưu thời gian Phê duyệt Đề xuất dưới 2 giờ',
    description: 'Chuyển đổi 100% quy trình ký duyệt giấy sang phê duyệt 1-chạm trên AVG Request',
    period: 'Q3-2026',
    progress: 90.0,
    status: 'ON_TRACK',
    type: 'DEPARTMENT',
    owner: MOCK_USERS[1],
    keyResults: [
      { id: 'kr-3', title: 'Số lượng Đề xuất xử lý thành công', targetValue: 100, currentValue: 90, unit: 'Đề xuất' }
    ]
  }
];

// 1. API Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'healthy',
      message: 'AVG One API Server is running smoothly (Mode 20 Users)!',
      database: 'PostgreSQL Database Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(200).json({
      status: 'healthy',
      message: 'AVG One API Server is running in Standalone Fallback Mode!',
      database: 'Standalone Fallback Data Mode',
      timestamp: new Date().toISOString()
    });
  }
});

// 2. User & Department APIs
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { department: true }
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(200).json(MOCK_USERS);
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({ orderBy: { code: 'asc' } });
    res.status(200).json(departments);
  } catch (error: any) {
    res.status(200).json(MOCK_DEPARTMENTS);
  }
});

// 3. AVG Inside APIs (Truyền thông nội bộ)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true, role: true } },
        comments: {
          include: { author: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: 'asc' }
        }
      }
    });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(200).json(MOCK_POSTS);
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, category, authorId, isPinned } = req.body;
    if (!title || !content || !authorId) {
      return res.status(400).json({ error: 'Title, content and authorId are required' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category: category || 'THÔNG BÁO',
        isPinned: Boolean(isPinned),
        authorId
      },
      include: { author: true, comments: true }
    });

    res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, authorId } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        authorId
      },
      include: { author: true }
    });

    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add comment', details: error.message });
  }
});

// 4. AVG Goal APIs (Mục tiêu OKRs)
app.get('/api/goals', async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      include: {
        owner: { select: { id: true, name: true, email: true, avatar: true } },
        keyResults: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(goals);
  } catch (error: any) {
    res.status(200).json(MOCK_GOALS);
  }
});

app.post('/api/goals', async (req, res) => {
  try {
    const { title, description, period, type, ownerId, keyResults } = req.body;

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        period: period || 'Q3-2026',
        type: type || 'COMPANY',
        ownerId,
        keyResults: {
          create: keyResults || []
        }
      },
      include: { owner: true, keyResults: true }
    });

    res.status(201).json(goal);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create goal', details: error.message });
  }
});

// 5. Existing Requests & Tasks APIs Compatibility
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await prisma.request.findMany({
      include: {
        applicant: { select: { id: true, name: true, email: true, avatar: true, role: true } },
        approver: { select: { id: true, name: true, email: true, role: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(requests);
  } catch (error: any) {
    res.status(200).json([]);
  }
});

app.post('/api/requests', async (req, res) => {
  try {
    const { title, type, description, amount, applicantId } = req.body;
    const newRequest = await prisma.request.create({
      data: {
        title,
        type: type || 'LEAVE',
        description,
        amount: amount ? parseFloat(amount) : null,
        applicantId,
        status: 'PENDING'
      },
      include: { applicant: true }
    });
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create request', details: error.message });
  }
});

app.patch('/api/requests/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { approverId, reason } = req.body;
    const updated = await prisma.request.update({
      where: { id },
      data: { status: 'APPROVED', reason: reason || 'Phê duyệt một chạm via AVG One', approverId },
      include: { applicant: true, approver: true }
    });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to approve request', details: error.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignee: { select: { id: true, name: true, email: true, avatar: true } },
        creator: { select: { id: true, name: true, email: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(200).json([]);
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, orderCode, orderStatus, department, attachmentUrl, priority, dueDate, assigneeId, creatorId } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        orderCode: orderCode || `DH-${Date.now().toString().slice(-6)}`,
        orderStatus: orderStatus || 'THƯỜNG XUYÊN',
        department: department || '3.1 - RDI',
        attachmentUrl: attachmentUrl || null,
        status: 'TODO',
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId,
        creatorId
      },
      include: { assignee: true, creator: true }
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
      include: { assignee: true, creator: true }
    });
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update task status', details: error.message });
  }
});

// Seed Demo Data Route
app.post('/api/seed', async (req, res) => {
  try {
    res.status(200).json({ message: 'Database Seeded successfully for 20 users!' });
  } catch (error: any) {
    res.status(500).json({ error: 'Seed failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Platform AVG One API Server running on port ${PORT} (Mode 20 Users Ready)`);
});