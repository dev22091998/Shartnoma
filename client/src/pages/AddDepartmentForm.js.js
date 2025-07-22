import React, { useState } from 'react';
import { addDepartment } from '../api/departmentApi';
import { useNavigate } from 'react-router-dom';

const AddDepartmentForm = () => {
  const [name, setName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // 💡 kerak
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDepartment({ name, responsible }); // 🔁 Ikkala maydon yuboriladi
      setMessage('✅ Bo‘lim muvaffaqiyatli qo‘shildi!');
      setName('');
      setResponsible('');
    setTimeout(() => {
      navigate('/admin/departments');
    }, 1500);
    } catch (error) {
      console.error(error);
      setMessage('❌ Bo‘lim qo‘shishda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">🏢 Yangi bo‘lim qo‘shish</h4>

      {message && (
        <div className={`alert ${message.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Bo‘lim nomi */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Bo‘lim nomi</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // placeholder="Masalan: IT, Marketing"
            required
            autoComplete="off"
          />
        </div>

        {/* Mas’ul shaxs */}
        <div className="mb-3">
          <label htmlFor="responsible" className="form-label">Bo'lim boshlig'i</label>
          <input
            type="text"
            id="responsible"
            className="form-control"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            // placeholder="Masalan: Alisher Qodirov"
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Yuklanmoqda...' : 'Qo‘shish'}
        </button>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
