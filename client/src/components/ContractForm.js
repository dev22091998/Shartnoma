import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // qo‘shish
import { createContract } from '../api/contractApi';


const ContractForm = ({ onAdd, redirectTo = '/' }) => {
  const { userDepartment } = useAuth(); // contextdan olish

  const [form, setForm] = useState({
    number: '',
    // department: '',
    company: '',
    validUntil: '',
    person: '',
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
      // 👇 Faqat kontekstdan departmentni qo‘shamiz
    formData.append('department', userDepartment);
    try {
      // const res = await axios.post('http://localhost:5000/api/contracts',
      const res = await createContract(formData); // 🔄 axios o‘rniga shu formData);
      onAdd(res.data);
      e.target.reset();
      setForm({ number: '', department: '', company: '', validUntil: '', person: '', file: null });

      // 🔁 Asosiy sahifaga qaytish
      navigate('/');
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 container">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Shartnoma raqami</Form.Label>
            <Form.Control type="text" name="number" onChange={handleChange} required autoComplete="off" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Kontragent nomi</Form.Label>
            <Form.Control type="text" name="company" onChange={handleChange} required autoComplete="off"/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Amal qilish muddati</Form.Label>
            <Form.Control type="date" name="validUntil" onChange={handleChange} required autoComplete="off"/>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mas’ul shaxs</Form.Label>
            <Form.Control type="text" name="person" onChange={handleChange} required autoComplete="off"/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mas’ul Bo‘lim</Form.Label>
            <Form.Control type="text" value={userDepartment} readOnly />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Mas’ul Bo'lim</Form.Label>
            <Form.Control type="text" name="department" onChange={handleChange} required />
          </Form.Group> */}
        </Col>
        <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>PDF fayl</Form.Label>
        <Form.Control type="file" name="file" accept=".pdf" onChange={handleChange} required />
      </Form.Group>
        </Col>
       
      </Row>
      <Button variant="primary" type="submit">Shartnomani Yuklash</Button>
    </Form>
  );
};

export default ContractForm;

