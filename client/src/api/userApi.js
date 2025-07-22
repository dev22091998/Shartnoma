import axios from 'axios';
import { BASE_URL } from './config';

// const API_URL = 'http://localhost:5000/api/users';
// const AUTH_API_URL = 'http://localhost:5000/api/auth';
const API_URL = `${BASE_URL}/api/users`;
const AUTH_API_URL = `${BASE_URL}/api/auth`;

export const getUsers = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUser = async (id, data) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Yangi foydalanuvchini ro‘yxatdan o‘tkazish
export const registerUser = async (form) => {
  const res = await axios.post(`${AUTH_API_URL}/register`, form);
  return res.data;
};

// ✅ Yangi foydalanuvchini ro‘yxatdan o‘tkazish
export const loginUser = async (form) => {
  const res = await axios.post(`${AUTH_API_URL}/login`, form);
  return res.data;
};