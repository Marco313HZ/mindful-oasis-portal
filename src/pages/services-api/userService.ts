import axios from 'axios';

// Use local API for development
const API_BASE = 'http://localhost:3000/api';

export const getUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};

export const getUserById = async (id: string | number) => {
  const res = await axios.get(`${API_BASE}/users/${id}`);
  return res.data;
};

export const createUser = async (data: any) => {
  const res = await axios.post(`${API_BASE}/users`, data);
  return res.data;
};

export const updateUser = async (id: string | number, data: any) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string | number) => {
  const res = await axios.delete(`${API_BASE}/users/${id}`);
  return res.data;
};
