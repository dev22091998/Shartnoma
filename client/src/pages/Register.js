import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 💡 qo‘shilishi kerak
import { getDepartments } from '../api/departmentApi';
import { loginUser, registerUser } from '../api/userApi';

const Register = () => {
  const [form, setForm] = useState({ name: '', department: '', username: '', password: '', role: '' });
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState('');

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
    try {
      // await axios.post('http://localhost:5000/api/auth/register', form);
      await registerUser(form);
      // const loginRes = await axios.post('http://localhost:5000/api/auth/login', form);
    const loginRes = await loginUser(form);
    login(loginRes.data.token);
    navigate('/admin');
    //   alert('Admin ro‘yxatdan o‘tdi');
    } catch (err) {
      alert('Xatolik: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card body>
        <h3 className="mb-4">📝 Ro‘yxatdan o‘tish</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Foydalanuvchi Ismi</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} required />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Foydalanuvchi Bo'limi</Form.Label>
            <Form.Select type="text" name="department" onChange={handleChange} required >
              {departments.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
            </Form.Select>
          </Form.Group> */}
          <Form.Group className="mb-3">
  <Form.Label>Foydalanuvchi Bo'limi</Form.Label>
  <Form.Select name="department" onChange={handleChange} required>
    <option value="">Bo‘lim tanlang</option> {/* 👈 Bu qo‘shiladi */}
    {departments.map((dept) => (
      <option key={dept._id} value={dept.name}>
        {dept.name}
      </option>
    ))}
  </Form.Select>
</Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Foydalanuvchi nomi</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Parol</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Foydalanuvchi roli</Form.Label>
            <Form.Select type="text" name="role" onChange={handleChange} required >
              <option value="user">User</option>
            <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary">Ro‘yxatdan o‘tish</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
