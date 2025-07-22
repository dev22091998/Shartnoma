import axios from 'axios';
import { BASE_URL } from './config';

// const API_URL = 'http://localhost:5000/api/contracts';
const API_URL = `${BASE_URL}/api/contracts`;

// ✅ Barcha shartnomalarni olish
export const getContracts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Yangi shartnoma qo‘shish
export const createContract = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ✅ Shartnomani yangilash
export const updateContract = async (id, formData) => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ✅ Shartnomani o‘chirish
export const deleteContract = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 🔽 Qo‘shing bu qismini:
export const getContractsByDepartment = async (departmentId) => {
  const res = await axios.get(`${API_URL}/department/${departmentId}`);
  return res.data;
};
