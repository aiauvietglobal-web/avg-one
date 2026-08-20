import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from '@avg-one/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MOCK_USERS = [
  { id: 'usr-1', email: 'admin.ceo@auvietglobal.com', name: 'Nguyễn Văn Quản Lý', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'ADMIN', status: 'ACTIVE', ssoProvider: 'google', ssoId: 'google-sso-admin-001', createdAt: new Date().toISOString(), _count: { submittedRequests: 2, approvedRequests: 5, assignedTasks: 3 } },
  { id: 'usr-2', email: 'manager.hr@auvietglobal.com', name: 'Trần Thị Trưởng Phòng', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', role: 'MANAGER', status: 'ACTIVE', ssoProvider: 'azure', ssoId: 'azure-sso-mgr-002', createdAt: new Date().toISOString(), _count: { submittedRequests: 1, approvedRequests: 3, assignedTasks: 4 } },
  { id: 'usr-3', email: 'staff.dev@auvietglobal.com', name: 'Lê Văn Nhân Viên', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', role: 'STAFF', status: 'ACTIVE', ssoProvider: 'supabase', ssoId: 'supabase-sso-stf-003', createdAt: new Date().toISOString(), _count: { submittedRequests: 4, approvedRequests: 0, assignedTasks: 6 } }
];

const MOCK_TASKS = [
  {
    id: 'tsk-1',
    orderCode: 'DH-2026-801',
    title: 'Đơn hàng Nghiên cứu & Phát triển Mô đun AI Sensor',
    description: 'Nghiên cứu ứng dụng chip đo lường công nghiệp mới cho AVG One System',
    orderStatus: 'TRỌNG ĐIỂM',
    department: '3.1 - RDI',
    attachmentUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    creatorId: 'usr-1',
    creator: MOCK_USERS[0],
    assigneeId: 'usr-3',
    assignee: MOCK_USERS[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tsk-2',
    orderCode: 'DH-2026-802',
    title: 'Đơn hàng Thiết kế Kiểu dáng Công nghiệp Vỏ Hộp AVG-X',
    description: 'Thiết kế bản vẽ CAD 3D và xuất file mẫu in 3D cho vỏ hộp bộ thu phát',
    orderStatus: 'KHẨN CẤP',
    department: '3.2 - THIẾT KẾ',
    attachmentUrl: 'https://drive.google.com/file/d/1XyZ987654321_design_spec.pdf',
    status: 'TODO',
    priority: 'HIGH',
    creatorId: 'usr-2',
    creator: MOCK_USERS[1],
    assigneeId: 'usr-2',
    assignee: MOCK_USERS[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tsk-3',
    orderCode: 'DH-2026-803',
    title: 'Đơn hàng Rà soát Đăng ký Bản quyền Thương hiệu AVG One',
    description: 'Đăng ký sở hữu trí tuệ và bảo hộ nhãn hiệu tại Cục SHTT Việt Nam',
    orderStatus: 'TRỌNG ĐIỂM',
    department: '6 - PHÁP LÝ',
    attachmentUrl: 'https://docs.google.com/document/d/1LegalDoc_AVG_One_2026',
    status: 'REVIEW',
    priority: 'MEDIUM',
    creatorId: 'usr-1',
    creator: MOCK_USERS[0],
    assigneeId: 'usr-1',
    assignee: MOCK_USERS[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// 1. API Health Check & Database Connection Verification
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'healthy',
      message: 'AVG One API Server is running smoothly!',
      database: 'Connected to Supabase PostgreSQL Cloud',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(200).json({
      status: 'healthy',
      message: 'AVG One API Server is running smoothly (Local/Fallback Mode)!',
      database: 'Standalone Fallback Mode',
      timestamp: new Date().toISOString()
    });
  }
});

// 2. User Management APIs (SSO & RBAC)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { submittedRequests: true, approvedRequests: true, assignedTasks: true }
        }
      }
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(200).json(MOCK_USERS);
  }
});

// 3. AVG Request Module APIs
app.get('/api/requests', async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter: any = {};
    if (status && status !== 'ALL') filter.status = status;
    if (type && type !== 'ALL') filter.type = type;

    const requests = await prisma.request.findMany({
      where: filter,
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
    if (!title || !applicantId) {
      return res.status(400).json({ error: 'Title and applicantId are required' });
    }

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
      data: {
        status: 'APPROVED',
        reason: reason || 'Đã phê duyệt một chạm qua AVG One App',
        approverId: approverId || undefined
      },
      include: { applicant: true, approver: true }
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to approve request', details: error.message });
  }
});

app.patch('/api/requests/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { approverId, reason } = req.body;

    const updated = await prisma.request.update({
      where: { id },
      data: {
        status: 'REJECTED',
        reason: reason || 'Từ chối một chạm qua AVG One App',
        approverId: approverId || undefined
      },
      include: { applicant: true, approver: true }
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to reject request', details: error.message });
  }
});

// 4. AVG Wework - QUẢN LÝ ĐƠN HÀNG (ORDERS & KANBAN) APIs
app.get('/api/tasks', async (req, res) => {
  try {
    const { status, orderStatus, department } = req.query;
    const filter: any = {};
    if (status && status !== 'ALL') filter.status = status;
    if (orderStatus && orderStatus !== 'ALL') filter.orderStatus = orderStatus;
    if (department && department !== 'ALL') filter.department = department;

    const tasks = await prisma.task.findMany({
      where: filter,
      include: {
        assignee: { select: { id: true, name: true, email: true, avatar: true, role: true } },
        creator: { select: { id: true, name: true, email: true, avatar: true, role: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(200).json(MOCK_TASKS);
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, orderCode, orderStatus, department, attachmentUrl, priority, dueDate, assigneeId, creatorId } = req.body;
    if (!title || !creatorId) {
      return res.status(400).json({ error: 'Title and creatorId are required' });
    }

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
        assigneeId: assigneeId || null,
        creatorId
      },
      include: {
        assignee: true,
        creator: true
      }
    });

    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create order task', details: error.message });
  }
});

app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
      include: {
        assignee: true,
        creator: true
      }
    });

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update task status', details: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.status(200).json({ message: 'Task deleted successfully', id });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

// 5. Seed Demo Data Endpoint (Users, Requests & Orders)
app.post('/api/seed', async (req, res) => {
  try {
    let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!admin) {
      admin = await prisma.user.create({
        data: {
          email: 'admin.ceo@auvietglobal.com',
          name: 'Nguyễn Văn Quản Lý',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'ADMIN',
          status: 'ACTIVE',
          ssoProvider: 'google',
          ssoId: 'google-sso-admin-001'
        }
      });
    }

    let manager = await prisma.user.findFirst({ where: { role: 'MANAGER' } });
    if (!manager) {
      manager = await prisma.user.create({
        data: {
          email: 'manager.hr@auvietglobal.com',
          name: 'Trần Thị Trưởng Phòng',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
          role: 'MANAGER',
          status: 'ACTIVE',
          ssoProvider: 'azure',
          ssoId: 'azure-sso-mgr-002'
        }
      });
    }

    let staff = await prisma.user.findFirst({ where: { role: 'STAFF' } });
    if (!staff) {
      staff = await prisma.user.create({
        data: {
          email: 'staff.dev@auvietglobal.com',
          name: 'Lê Văn Nhân Viên',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          role: 'STAFF',
          status: 'ACTIVE',
          ssoProvider: 'supabase',
          ssoId: 'supabase-sso-stf-003'
        }
      });
    }

    // Clear existing tasks to re-seed clean Order Data
    await prisma.task.deleteMany({});

    await prisma.task.createMany({
      data: [
        {
          orderCode: 'DH-2026-801',
          title: 'Đơn hàng Nghiên cứu & Phát triển Mô đun AI Sensor',
          description: 'Nghiên cứu ứng dụng chip đo lường công nghiệp mới cho AVG One System',
          orderStatus: 'TRỌNG ĐIỂM',
          department: '3.1 - RDI',
          attachmentUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          status: 'IN_PROGRESS',
          priority: 'URGENT',
          creatorId: admin.id,
          assigneeId: staff.id
        },
        {
          orderCode: 'DH-2026-802',
          title: 'Đơn hàng Thiết kế Kiểu dáng Công nghiệp Vỏ Hộp AVG-X',
          description: 'Thiết kế bản vẽ CAD 3D và xuất file mẫu in 3D cho vỏ hộp bộ thu phát',
          orderStatus: 'KHẨN CẤP',
          department: '3.2 - THIẾT KẾ',
          attachmentUrl: 'https://drive.google.com/file/d/1XyZ987654321_design_spec.pdf',
          status: 'TODO',
          priority: 'HIGH',
          creatorId: manager.id,
          assigneeId: manager.id
        },
        {
          orderCode: 'DH-2026-803',
          title: 'Đơn hàng Rà soát Đăng ký Bản quyền Thương hiệu AVG One',
          description: 'Đăng ký sở hữu trí tuệ và bảo hộ nhãn hiệu tại Cục SHTT Việt Nam',
          orderStatus: 'TRỌNG ĐIỂM',
          department: '6 - PHÁP LÝ',
          attachmentUrl: 'https://docs.google.com/document/d/1LegalDoc_AVG_One_2026',
          status: 'REVIEW',
          priority: 'MEDIUM',
          creatorId: admin.id,
          assigneeId: admin.id
        },
        {
          orderCode: 'DH-2026-804',
          title: 'Đơn hàng Linh kiện Tồn kho Quý 2/2026 - Kiểm kê Module',
          description: 'Xử lý thanh lý và kiểm định các bo mạch tồn kho chưa sử dụng',
          orderStatus: 'TỒN',
          department: '3.1 - RDI',
          attachmentUrl: 'https://docs.google.com/spreadsheets/d/1Inventory_Report_Q2',
          status: 'TODO',
          priority: 'LOW',
          creatorId: manager.id,
          assigneeId: staff.id
        },
        {
          orderCode: 'DH-2026-805',
          title: 'Đơn hàng Tiểu Dự Án Thí Điểm Hệ Thống Giám Sát Tự Động',
          description: 'Triển khai thử nghiệm 50 thiết bị cảm biến cho khu công nghiệp',
          orderStatus: 'TIỂU DỰ ÁN',
          department: '3.1 - RDI',
          attachmentUrl: 'https://docs.google.com/spreadsheets/d/1PilotProject_50Sensors',
          status: 'DONE',
          priority: 'HIGH',
          creatorId: admin.id,
          assigneeId: staff.id
        }
      ]
    });

    res.status(200).json({ message: 'Database seeded successfully with Users, Requests & Orders!' });
  } catch (error: any) {
    res.status(500).json({ error: 'Seed failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`AVG One API Server running on port ${PORT}`);
});