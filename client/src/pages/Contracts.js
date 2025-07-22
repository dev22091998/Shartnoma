import React, { useEffect, useState } from 'react';
import { deleteContract, getContracts, updateContract } from '../api/contractApi';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getDepartments } from '../api/departmentApi';
import "./Contracts.css"; // Jadval uchun stil fayli
import Swal from 'sweetalert2';
import { BASE_URL } from '../api/config';


const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState('');
  const [departments, setDepartments] = useState([]);
  const [editingContract, setEditingContract] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchContracts();
    // fetchDepartments();
  }, []);

  const fetchContracts = async () => {
    try {
      const data = await getContracts()
      setContracts(data);
    } catch (err) {
      console.error(("Shartnomalar olishda xatolik:", err));
    } 
  }

  useEffect(()=>{
    fetchDepartments();
  }, [])

    const fetchDepartments = async () => {
    try {
      const data = await getDepartments()
      setDepartments(data);
    } catch (err) {
      console.error(("Bo'limlar olishda xatolik:", err));
    }
  }
  console.log(departments)

  const handleEditClick = (contract) => {
    setEditingContract(contract);
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
  });

  if (result.isConfirmed) {
    try {
      await deleteContract(id);
      await fetchContracts(); // yangilangan ro'yxatni olib kelish
      Swal.fire({
        title: 'O‘chirildi!',
        text: 'Shartnoma muvaffaqiyatli o‘chirildi.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
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
    setEditingContract({ ...editingContract, [e.target.name]: e.target.value });
  };  

  const handleSaveChanges = async () => {    
  const { number, company, validUntil, person, department } = editingContract;
     // 🔒 Bo'sh maydonlar uchun tekshiruv
  if (!number || !company || !validUntil || !person || !department) {
    alert("Iltimos, barcha maydonlarni to‘ldiring!");
    return;
  }
  try {
    await updateContract(editingContract._id, editingContract);
    setShowEditModal(false);
    fetchContracts();
  } catch (error) {
    console.error("Xatolik:", error);
    alert("Ma'lumotni saqlashda xatolik yuz berdi");    
  }
  };
  console.log(editingContract)
  

   // Faqat mos tushadigan shartnomalarni ko‘rsatish
  const filteredContracts = contracts.filter((contract) => {
    const term = search.toLowerCase();
    return (
      contract.number?.toLowerCase().includes(term) ||
      contract.company?.toLowerCase().includes(term) ||
      contract.person?.toLowerCase().includes(term) ||
      contract.fileName?.toLowerCase().includes(term)
    );
  });
  
  // 📄 Pagination hisob-kitob
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContracts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  console.log(contracts)

  return (
    <div>
      <div className="container mt-4">
          <h2>📄 Shartnomalar ro‘yxati</h2>
           {/* 🔍 Qidiruv inputi */}
            <Form.Control
              type="text"
              placeholder="🔍 Qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3 w-50"
            />
          <Table striped bordered hover className="product-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Shartnoma raqami</th>
                <th>Kontragent</th>
                <th>Amal qilish muddati</th>
                <th>Mas’ul shaxs</th>
                <th>Mas’ul bo'lim</th>
                <th>PDF fayl</th>
                <th className="action-column">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{`${u.number}`}</td>
                  <td>{u.company}</td>
                  <td>{u.validUntil}</td>
                  <td>{u.person}</td>
                  <td>{u.department}</td>
                  <td>
                    <a href={`${BASE_URL}/${u.filePath}`} target="_blank" rel="noreferrer">
                      {u.fileName}
                    </a>
                  </td>
                  <td className="action-column">
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
          {/* 🔢 Pagination tugmalari */}
          {totalPages > 1 && (
            <div className="pagination-container text-center mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? 'primary' : 'outline-primary'}
                  onClick={() => setCurrentPage(index + 1)}
                  className="mx-1"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Shartnomalarni tahrirlash</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Shartnoma raqami</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={editingContract?.number || ''}
                    onChange={handleEditChange}
                    required
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Kontragent nomi</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={editingContract?.company || ''}
                    onChange={handleEditChange}
                    required
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Amal qilish muddati</Form.Label>
                  <Form.Control
                    type="text"
                    name="validUntil"
                    value={editingContract?.validUntil || ''}
                    onChange={handleEditChange}
                    required
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Mas'ul shaxs</Form.Label>
                  <Form.Control
                    type="text"
                    name="person"
                    value={editingContract?.person || ''}
                    onChange={handleEditChange}
                    required
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Bo‘lim</Form.Label>
                <Form.Select
                  name="department"
                  value={editingContract?.department || ''}
                  required
                  onChange={handleEditChange}
                >
                  <option value="">Tanlang...</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </Form.Select>
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


    </div>
  );
};

export default Contracts;
