
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

// Auth API
export const authAPI = {
  signupAdmin: (data: any) => apiRequest('/auth/signup/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  signupDoctor: (data: any) => apiRequest('/auth/signup/doctor', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  signupPatient: (data: any) => apiRequest('/auth/signup/patient', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (email: string, password: string) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  
  verifyEmail: (token: string) => apiRequest('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  }),
};

// Contact API
export const contactAPI = {
  sendMessage: (data: any) => apiRequest('/contact-messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getMessages: () => apiRequest('/contact-messages'),
  
  getContactInfo: () => apiRequest('/contact-us'),
  
  updateContactInfo: (data: any) => apiRequest('/contact-us', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Chat API
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

// Forum API
export const forumAPI = {
  getPosts: () => apiRequest('/forum/posts'),
  
  createPost: (data: any) => apiRequest('/forum/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getPost: (id: string) => apiRequest(`/forum/posts/${id}`),
  
  createReply: (postId: string, content: string) => apiRequest(`/forum/posts/${postId}/replies`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }),
};

// CRUD APIs
export const doctorsAPI = {
  getAll: () => apiRequest('/doctors'),
  getById: (id: string) => apiRequest(`/doctors/${id}`),
  create: (data: any) => apiRequest('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/doctors/${id}`, { method: 'DELETE' }),
};

export const patientsAPI = {
  getAll: () => apiRequest('/patients'),
  getById: (id: string) => apiRequest(`/patients/${id}`),
  create: (data: any) => apiRequest('/patients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/patients/${id}`, { method: 'DELETE' }),
};

export const appointmentsAPI = {
  getAll: () => apiRequest('/appointments'),
  getById: (id: string) => apiRequest(`/appointments/${id}`),
  create: (data: any) => apiRequest('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/appointments/${id}`, { method: 'DELETE' }),
};

export const treatmentsAPI = {
  getAll: () => apiRequest('/treatments'),
  getById: (id: string) => apiRequest(`/treatments/${id}`),
  create: (data: any) => apiRequest('/treatments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/treatments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/treatments/${id}`, { method: 'DELETE' }),
};

export const medicationsAPI = {
  getAll: () => apiRequest('/medications'),
  getById: (id: string) => apiRequest(`/medications/${id}`),
  create: (data: any) => apiRequest('/medications', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/medications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/medications/${id}`, { method: 'DELETE' }),
};

export const articlesAPI = {
  getAll: () => apiRequest('/articles'),
  create: (data: any) => apiRequest('/articles', { method: 'POST', body: JSON.stringify(data) }),
};

export const feedbackAPI = {
  getAll: () => apiRequest('/feedback'),
  create: (data: any) => apiRequest('/feedback', { method: 'POST', body: JSON.stringify(data) }),
};
