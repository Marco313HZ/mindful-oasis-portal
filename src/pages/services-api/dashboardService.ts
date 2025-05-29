import axios from 'axios';

// Use local API for development
const API_BASE = 'http://localhost:3000/api';

export const getAdminDashboardStats = async () => {
  const res = await axios.get(`${API_BASE}/admin/dashboard-stats`);
  return res.data;
};

export const getDoctorDashboardStats = async (doctorId: string | number) => {
  const res = await axios.get(`${API_BASE}/doctors/${doctorId}/dashboard-stats`);
  return res.data;
};

// Add more as needed for dashboard widgets
