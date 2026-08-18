import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: 'ADMIN' | 'MANAGER' | 'STAFF' | 'GUEST';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  ssoProvider: string | null;
  ssoId: string | null;
  createdAt: string;
}

export interface RequestItem {
  id: string;
  title: string;
  type: 'LEAVE' | 'EXPENSE' | 'EQUIPMENT' | 'OTHER';
  description: string | null;
  amount: number | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  reason: string | null;
  applicantId: string;
  applicant: User;
  approverId: string | null;
  approver: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string | null;
  orderCode: string | null;
  orderStatus: 'THƯỜNG XUYÊN' | 'KHẨN CẤP' | 'TRỌNG ĐIỂM' | 'TỒN' | 'TIỂU DỰ ÁN' | string;
  department: '3.1 - RDI' | '3.2 - THIẾT KẾ' | '6 - PHÁP LÝ' | string;
  attachmentUrl: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string | null;
  assigneeId: string | null;
  assignee: User | null;
  creatorId: string;
  creator: User;
  createdAt: string;
  updatedAt: string;
}

export const checkApiHealth = async () => {
  const response = await axios.get(`${API_BASE_URL}/health`);
  return response.data;
};

export const fetchUsersFromCloud = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const fetchRequests = async (statusFilter?: string, typeFilter?: string) => {
  const params: any = {};
  if (statusFilter && statusFilter !== 'ALL') params.status = statusFilter;
  if (typeFilter && typeFilter !== 'ALL') params.type = typeFilter;
  const response = await axios.get(`${API_BASE_URL}/requests`, { params });
  return response.data;
};

export const createRequest = async (data: {
  title: string;
  type: string;
  description?: string;
  amount?: number;
  applicantId: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/requests`, data);
  return response.data;
};

export const approveRequest = async (id: string, approverId?: string, reason?: string) => {
  const response = await axios.patch(`${API_BASE_URL}/requests/${id}/approve`, { approverId, reason });
  return response.data;
};

export const rejectRequest = async (id: string, approverId?: string, reason?: string) => {
  const response = await axios.patch(`${API_BASE_URL}/requests/${id}/reject`, { approverId, reason });
  return response.data;
};

// Task / Order Management APIs (AVG Wework)
export const fetchTasks = async (statusFilter?: string, orderStatusFilter?: string, departmentFilter?: string) => {
  const params: any = {};
  if (statusFilter && statusFilter !== 'ALL') params.status = statusFilter;
  if (orderStatusFilter && orderStatusFilter !== 'ALL') params.orderStatus = orderStatusFilter;
  if (departmentFilter && departmentFilter !== 'ALL') params.department = departmentFilter;
  const response = await axios.get(`${API_BASE_URL}/tasks`, { params });
  return response.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
  orderCode?: string;
  orderStatus?: string;
  department?: string;
  attachmentUrl?: string;
  priority?: string;
  dueDate?: string;
  assigneeId?: string;
  creatorId: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, data);
  return response.data;
};

export const updateTaskStatus = async (id: string, status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE') => {
  const response = await axios.patch(`${API_BASE_URL}/tasks/${id}/status`, { status });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};

export const seedDatabase = async () => {
  const response = await axios.post(`${API_BASE_URL}/seed`);
  return response.data;
};
