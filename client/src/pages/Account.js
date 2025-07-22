import React, { useState } from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  // const {userInfo}= useAuth()
    const {  userBek } = useAuth();  
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userData, setUserData] = useState({
    username: 'admin',
    email: 'admin@example.com',
    fullName: 'Admin Foydalanuvchi'
  });
  
  //  console.log('userName:', userName);
  console.log('username:', userBek);

  const [formData, setFormData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveChanges = () => {
    // TODO: Ma'lumotlarni serverga yuborish
    setUserData({ ...formData });
    setShowModal(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Yangi parollar mos emas");
      return;
    }
    // TODO: Parolni serverga yuborish
    console.log("Parol o'zgartirildi:", passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordModal(false);
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">👤 Foydalanuvchi ma'lumotlari</h2>

      <Card className="p-3">
        <p><strong>F.I.O:</strong> {userData.fullName}</p>
        <p><strong>Login:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>

        <div className="d-flex gap-2 mt-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>✏️ Ma'lumotlarni o‘zgartirish</Button>
          <Button variant="warning" onClick={() => setShowPasswordModal(true)}>🔒 Parolni o‘zgartirish</Button>
        </div>
      </Card>

      {/* --- Ma'lumotlarni tahrirlash modal --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Ma'lumotlarni o‘zgartirish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>F.I.O</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Bekor qilish</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Saqlash</Button>
        </Modal.Footer>
      </Modal>

      {/* --- Parolni o‘zgartirish modal --- */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔒 Parolni o‘zgartirish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Joriy parol</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Yangi parol</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Yangi parolni tasdiqlang</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Bekor qilish</Button>
          <Button variant="warning" onClick={handlePasswordChange}>Parolni o‘zgartirish</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Account;
