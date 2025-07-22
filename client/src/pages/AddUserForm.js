import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 💡 qo‘shilishi kerak
import { getDepartments } from '../api/departmentApi';
import { registerUser } from '../api/userApi';

const AddUserForm = () => {
  const [form, setForm] = useState({ name: '', department: '', username: '', password: '', role: 'user' });
  const [departments, setDepartments] = useState([]);
  
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(''); // 'success' yoki 'danger'

  const navigate = useNavigate(); // 💡 kerak
  const { login } = useAuth();    // 💡 kerak

    useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Bo‘limlarni olishda xatolik:", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const { name, department, username, password, role } = form;
  // 🔒 1. Bo‘sh maydonlar tekshiruvi
  if (!name || !department || !username || !password || !role) {
    setVariant('danger');
    setMessage('❌ Iltimos, barcha maydonlarni to‘ldiring!');
    return;
  }// 🔒 2. Parol uzunligi tekshiruvi
  if (password.length < 4 || username < 4) {
    setVariant('danger');
    setMessage('❌ Parol kamida 4 ta belgidan iborat bo‘lishi kerak!');
    return;
  }
    try {
      await registerUser(form)
    setVariant('success');
    setMessage('✅ Foydalanuvchi muvaffaqiyatli qo‘shildi!');
    // navigate('/admin');
    setTimeout(() => {
      navigate('/admin/users');
    }, 1500);
    } catch (err) {
      setVariant('danger');
      setMessage('❌ Xatolik: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h4>👤 Foydalanuvchi qo‘shish</h4>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Ismi</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>

         <Form.Group className="mb-3">
          <Form.Label>Bo‘lim</Form.Label>
          <Form.Select
            name="department"
            onChange={handleChange}
            required
            autoComplete="off"
          >
            <option value="">Tanlang...</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Rol</Form.Label>
          <Form.Select name="role" onChange={handleChange} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Login (username)</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Parol</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

       

        

        <Button type="submit" variant="primary">
          Qo‘shish
        </Button>
      </Form>
    </div>
  );
};

export default AddUserForm;
