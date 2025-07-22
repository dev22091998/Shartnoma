import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getUsers, updateUser, deleteUser } from '../api/userApi';
import { getDepartments } from '../api/departmentApi';
import Swal from 'sweetalert2';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Foydalanuvchilarni olishda xatolik:', err);
    }
  };


useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const res = await getDepartments(); // Bu sizda `departmentApi.js` da mavjud bo‘lishi kerak
      setDepartments(res);
    } catch (error) {
      console.error("Bo‘limlarni olishda xatolik:", error);
    }
  };

  fetchDepartments();
}, []);


  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
    title: 'Ishonchingiz komilmi?',
    text: 'Shartnomani o‘chirishni istaysizmi?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ha, o‘chirilsin!',
    cancelButtonText: 'Bekor qilish'
    })
    if(result.isConfirmed) {
      try {
        await deleteUser(id);
        await fetchUsers(); //yangilangan ro'yhatni olib kelish
        Swal.fire({
        title: 'O‘chirildi!',
        text: 'Shartnoma muvaffaqiyatli o‘chirildi.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
        })
      } catch (err) {
            console.error("Shartnomani o‘chirishda xatolik:", err);
            Swal.fire({
              title: 'Xatolik!',
              text: 'Shartnomani o‘chirishda muammo yuz berdi.',
              icon: 'error'
            });
      }
    }
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const {name, username, department, role } = editingUser;
    if(!name || !username || !department || !role) {
    alert("Iltimos, barcha maydonlarni to‘ldiring!");
    return;      
    }
    const userToSend = {...editingUser};
     // Agar parol bo‘sh bo‘lsa, uni yubormaymiz
  if (!userToSend.password) {
    delete userToSend.password;
  }
  try {
    await updateUser(editingUser._id, editingUser);
    setShowEditModal(false);
    fetchUsers();
  } catch(err) {    
    console.error("Foydalanuvchini yangilashda xatolik:", err);
  }
  };

  return (
    <div className="container mt-4">
      <h4>👥 Foydalanuvchilar ro‘yxati</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ismi</th>
            <th>Login</th>
            <th>Bo‘lim</th>
            <th>Rol</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{`${u.name}`}</td>
              <td>{u.username}</td>
              <td>{u.department}</td>
              <td>{u.role}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => handleEditClick(u)}>
                  ✏️
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(u._id)}>
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Foydalanuvchini tahrirlash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Ism</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editingUser?.name || ''}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editingUser?.username || ''}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Bo‘lim</Form.Label>
              <Form.Select
                name="department"
                value={editingUser?.department || ''}
                onChange={handleEditChange}
                required
              >
                <option value="">Tanlang...</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="role"
                value={editingUser?.role || ''}
                onChange={handleEditChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Yangi parol (agar o‘zgartirilsa)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Yangi parol"
                value={editingUser?.password || ''}
                onChange={handleEditChange}
              />
            </Form.Group>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Bekor qilish
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Saqlash
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;


