import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg'; // sizdagi logo manzili
import { loginUser } from '../api/userApi';


const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // const res = await axios.post('http://localhost:5000/api/auth/login', form);
  //     const res = await loginUser(form); // form = { username, password }
  //     localStorage.setItem('token', res.data.token);
  //     localStorage.setItem('role', res.data.user.role)
  //     login(res.data.token);
  //     navigate('/'); // admin panelga yo‘naltirish
  //   } catch (err) {
  //     alert('Login xatosi: ' + err.response?.data?.message || err.message);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser(form); // res to‘g‘ridan-to‘g‘ri ma'lumotlar obyekti
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.user.role);
    login(res.token);
    navigate('/'); // admin panelga yo‘naltirish
  } catch (err) {
    alert('Login xatosi: ' + (err.response?.data?.message || err.message));
  }
};


  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card body>
        <img
      src={logo}
      alt="Logo"
      className="d-block mx-auto mb-3"
      style={{ height: '60px' }}
    />

    {/* Sarlavha */}
    {/* <h5 className="mb-4 fw-semibold"><i>SHARTNOMALAR TIZIMI</i> </h5> */}
    <h5 className="mb-3 text-secondary" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <i>SHARTNOMALAR TIZIMI</i>
    </h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            {/* <Form.Label>Foydalanuvchi nomi</Form.Label> */}
            <Form.Control type="text" name="username" onChange={handleChange} required placeholder='username' />
          </Form.Group>
          <Form.Group className="mb-3">
            {/* <Form.Label>Parol</Form.Label> */}
            <Form.Control type="password" name="password" onChange={handleChange} required placeholder='password' />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100 mt-2">Kirish</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
