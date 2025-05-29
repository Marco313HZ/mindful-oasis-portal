import axios from 'axios';

// Use local API for development
const API_BASE = 'http://localhost:3000/api';

export const getDoctorAppointments = async (doctorId: string | number) => {
  const res = await axios.get(`${API_BASE}/appointments`, { params: { doctorId } });
  return res.data;
};

export const getPatientAppointments = async (patientId: string | number) => {
  const res = await axios.get(`${API_BASE}/appointments`, { params: { patientId } });
  return res.data;
};

// Optionally, add more doctor-specific APIs as needed
