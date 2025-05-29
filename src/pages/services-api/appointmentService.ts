// src/pages/services-api/appointmentService.ts
import axios from 'axios';

// Use local API for development
const API_BASE = 'http://localhost:3000/api';

export const getAppointments = async (params?: any) => {
  const res = await axios.get(`${API_BASE}/appointments`, { params });
  return res.data;
};

export const getAppointmentById = async (id: string | number) => {
  const res = await axios.get(`${API_BASE}/appointments/${id}`);
  return res.data;
};

export const createAppointment = async (data: any) => {
  const res = await axios.post(`${API_BASE}/appointments`, data);
  return res.data;
};

export const updateAppointment = async (id: string | number, data: any) => {
  const res = await axios.put(`${API_BASE}/appointments/${id}`, data);
  return res.data;
};

export const deleteAppointment = async (id: string | number) => {
  const res = await axios.delete(`${API_BASE}/appointments/${id}`);
  return res.data;
};

// Doctor and patient fetching for admin
export const getDoctors = async () => {
  const res = await axios.get(`${API_BASE}/doctors`);
  return res.data;
};

export const getPatients = async () => {
  const res = await axios.get(`${API_BASE}/patients`);
  return res.data;
};
