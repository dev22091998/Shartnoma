import axios from 'axios';
import { BASE_URL } from './config';

// const API_URL = 'http://localhost:5000/api/departments';
const API_URL = `${BASE_URL}/api/departments`;

export const getDepartments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addDepartment = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
