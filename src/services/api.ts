
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('authToken');

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

// Auth API - matching your exact backend routes
export const authAPI = {
  signupAdmin: (data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
  }) => apiRequest('/auth/signup/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  signupDoctor: (data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    specialization?: string;
    license_number?: string;
  }) => apiRequest('/auth/signup/doctor', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  signupPatient: (data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
  }) => apiRequest('/auth/signup/patient', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (email: string, password: string) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  
  verifyEmail: (email: string, code: string) => apiRequest('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  }),
};

// Contact API - matching your backend
export const contactAPI = {
  sendMessage: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    reason?: string;
  }) => apiRequest('/contact-messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getMessages: () => apiRequest('/contact-messages'),
  
  getContactInfo: () => apiRequest('/contact-us'),
  
  updateContactInfo: (data: {
    address?: string;
    phone?: string;
    email?: string;
    working_hours?: string;
    emergency_contact?: string;
  }) => apiRequest('/contact-us', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Chat API - matching your backend
export const chatAPI = {
  createSession: () => apiRequest('/chat/sessions', { method: 'POST' }),
  
  getSessions: () => apiRequest('/chat/sessions'),
  
  sendMessage: (sessionId: string, message: string) => apiRequest('/chat/messages', {
    method: 'POST',
    body: JSON.stringify({ sessionId, message }),
  }),
  
  getMessages: (sessionId: string) => apiRequest(`/chat/sessions/${sessionId}/messages`),
  
  sendAnonymousMessage: (message: string) => apiRequest('/chat/anonymous', {
    method: 'POST',
    body: JSON.stringify({ message }),
  }),
};

// Forum API - matching your backend
export const forumAPI = {
  getPosts: () => apiRequest('/forum/posts'),
  
  createPost: (data: {
    title: string;
    content: string;
    category?: string;
  }) => apiRequest('/forum/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getPost: (id: string) => apiRequest(`/forum/posts/${id}`),
  
  createReply: (postId: string, content: string) => apiRequest(`/forum/posts/${postId}/replies`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }),
};

// CRUD APIs - matching your exact backend structure
export const doctorsAPI = {
  getAll: () => apiRequest('/doctors'),
  getById: (id: string) => apiRequest(`/doctors/${id}`),
  create: (data: {
    full_name: string;
    email: string;
    phone?: string;
    specialization?: string;
    license_number?: string;
    bio?: string;
    experience_years?: number;
  }) => apiRequest('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/doctors/${id}`, { method: 'DELETE' }),
};

export const patientsAPI = {
  getAll: () => apiRequest('/patients'),
  getById: (id: string) => apiRequest(`/patients/${id}`),
  create: (data: {
    full_name: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    emergency_contact?: string;
  }) => apiRequest('/patients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/patients/${id}`, { method: 'DELETE' }),
};

export const appointmentsAPI = {
  getAll: () => apiRequest('/appointments'),
  getById: (id: string) => apiRequest(`/appointments/${id}`),
  create: (data: {
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    reason?: string;
    status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
    notes?: string;
  }) => apiRequest('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/appointments/${id}`, { method: 'DELETE' }),
};

export const treatmentsAPI = {
  getAll: () => apiRequest('/treatments'),
  getById: (id: string) => apiRequest(`/treatments/${id}`),
  create: (data: {
    patient_id: number;
    doctor_id: number;
    treatment_type: string;
    description?: string;
    start_date: string;
    end_date?: string;
    status?: 'active' | 'completed' | 'discontinued';
    notes?: string;
  }) => apiRequest('/treatments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/treatments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/treatments/${id}`, { method: 'DELETE' }),
};

export const medicationsAPI = {
  getAll: () => apiRequest('/medications'),
  getById: (id: string) => apiRequest(`/medications/${id}`),
  create: (data: {
    name: string;
    dosage?: string;
    frequency?: string;
    side_effects?: string;
    contraindications?: string;
    description?: string;
  }) => apiRequest('/medications', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/medications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/medications/${id}`, { method: 'DELETE' }),
};

export const articlesAPI = {
  getAll: () => apiRequest('/articles'),
  create: (data: {
    title: string;
    content: string;
    author_id?: number;
    category?: string;
    published?: boolean;
  }) => apiRequest('/articles', { method: 'POST', body: JSON.stringify(data) }),
};

export const feedbackAPI = {
  getAll: () => apiRequest('/feedback'),
  create: (data: {
    patient_id?: number;
    rating: number;
    comments?: string;
    service_type?: string;
  }) => apiRequest('/feedback', { method: 'POST', body: JSON.stringify(data) }),
};

// Admin APIs
export const superAdminsAPI = {
  getAll: () => apiRequest('/super-admins'),
  create: (data: any) => apiRequest('/super-admins', { method: 'POST', body: JSON.stringify(data) }),
};

export const rolesAPI = {
  getAll: () => apiRequest('/roles'),
  create: (data: any) => apiRequest('/roles', { method: 'POST', body: JSON.stringify(data) }),
};

export const permissionsAPI = {
  getAll: () => apiRequest('/permissions'),
  create: (data: any) => apiRequest('/permissions', { method: 'POST', body: JSON.stringify(data) }),
};

export const rolePermissionsAPI = {
  getAll: () => apiRequest('/role-permissions'),
  create: (data: any) => apiRequest('/role-permissions', { method: 'POST', body: JSON.stringify(data) }),
};
