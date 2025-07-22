// src/components/ContractFormAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getDepartments } from '../api/departmentApi';
import { createContract } from '../api/contractApi';

const ContractFormAdmin = ({ onAdd, redirectTo = '/' }) => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    number: '',
    department: '',
    company: '',
    validUntil: '',
    person: '',
    file: null,
  });

  const navigate = useNavigate();

  // 🔄 Bo‘limlar ro‘yxatini olish
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // const res = await axios.get('http://localhost:5000/api/departments');
        const res = await getDepartments()
        setDepartments(res.data);
      } catch (error) {
        console.error('Bo‘limlar olinmadi:', error);
      }
    };
    fetchDepartments();
  }, []);

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

    try {
      // const res = await axios.post('http://localhost:5000/api/contracts', formData);
      const res = await createContract(formData)
      
      onAdd(res.data);
      e.target.reset();
      setForm({ number: '', department: '', company: '', validUntil: '', person: '', file: null });
      navigate(redirectTo);
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
            <Form.Control type="text" name="number" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Kontragent nomi</Form.Label>
            <Form.Control type="text" name="company" onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Amal qilish muddati</Form.Label>
            <Form.Control type="date" name="validUntil" onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mas’ul shaxs</Form.Label>
            <Form.Control type="text" name="person" onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mas’ul Bo‘lim</Form.Label>
            <Form.Select name="department" onChange={handleChange} required>
              <option value="">Bo‘lim tanlang</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>PDF fayl</Form.Label>
            <Form.Control type="file" name="file" accept=".pdf" onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">Shartnomani Yuklash</Button>
    </Form>
  );
};

export default ContractFormAdmin;
