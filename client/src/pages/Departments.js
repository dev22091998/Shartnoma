import React, { useEffect, useState } from "react";
import {
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentApi";
import { Card, Row, Col, Spinner, ButtonGroup, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { Table, Modal, Form } from 'react-bootstrap';
import DepartmentContracts from "../components/DepartmentContracts";




const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loading, setLoading] = useState(true); 
  const [selectedDepartment, setSelectedDepartment] = useState(null);   //YANGI NARSA

  
  const location = useLocation();
  const navigate = useNavigate();

    const fetchDepartments = async () => {
    try{
      const data = await getDepartments();
      setDepartments(data)
    } catch (err) {
      console.error('Bo\'limlar olishda xatolik')
    } setLoading(false)
  } 


  useEffect(() => {
    fetchDepartments();
  }, []);
  
  console.log(departments)

  const handleEditClick = (department) => {
    setEditingDepartment(department) 
    setShowEditModal(true)
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
    title: 'Ishonchingiz komilmi?',
    text: 'Bu bo‘limni o‘chirishni istaysizmi?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ha, o‘chirilsin!',
    cancelButtonText: 'Bekor qilish'
  });
    if (result.isConfirmed){
      try {
        await deleteDepartment(id);
        setDepartments((prev) => prev.filter((d) => d._id !== id));
        Swal.fire({
        title: 'O‘chirildi!',
        text: 'Bo‘lim muvaffaqiyatli o‘chirildi.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      } catch (err) {
        console.error("O‘chirishda xatolik:", err);
         Swal.fire({
        title: 'Xatolik!',
        text: 'Bo‘limni o‘chirishda muammo yuz berdi.',
        icon: 'error'
      });
      }
    }
  };

  const handleEditChange = (e) => {
    setEditingDepartment({...editingDepartment, [e.target.name]: e.target.value})
  }

  const handleSaveChanges = async () => {
    const {name, responsible} = editingDepartment;
    if(!name || !responsible) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    await updateDepartment(editingDepartment._id, editingDepartment)
    setShowEditModal(false)
    fetchDepartments();
  }
  

  // const handleViewContracts = (departmentId, di) => {
  //   navigate(`/contracts/department/${departmentId}`);
  //   console.log(di)
  // };

//   const handleViewContracts = (department) => {   //BU HAM YANGI NARSA
//   setSelectedDepartment({
//     id: department._id,
//     name: department.name
//   });
// }; // URL asosida tanlangan bo‘limni o‘rnatish

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const departmentId = queryParams.get('department');

    if (departmentId && departments.length > 0) {
      const found = departments.find(dept => dept._id === departmentId);
      if (found) {
        setSelectedDepartment({
          id: found._id,
          name: found.name
        });
      }
    }else {
    // ❗️Query yo‘q bo‘lsa — tozalaymiz
    setSelectedDepartment(null);
  }
  }, [location.search, departments]);

const handleViewContracts = (department) => {
  setSelectedDepartment({
    id: department._id,
    name: department.name
  });
  navigate(`?department=${department._id}`);
};


  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div>
      {selectedDepartment ? (
  <DepartmentContracts
    departmentId={selectedDepartment.id}
    departmentName={selectedDepartment.name}
  />
) : (
  <Row>
      <h3>🏢 Bo‘limlar</h3>
    {departments.map((dept) => (
      <Col key={dept._id} md={4} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>{dept.name}</Card.Title>
            <Card.Text>
              Bo'lim boshlig'i: {dept.responsible || "Noma'lum"}<br />
              Tavsif: {dept.description || "Tavsif mavjud emas"}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <ButtonGroup className="w-100 d-flex justify-content-between">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(dept._id)}
              >
                🗑️
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleEditClick(dept)}
              >
                ✏️
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleViewContracts(dept)}
              >
                📄
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Col>
    ))}
  </Row>
)}

      {/* Edit Modal  */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bo'limlarni tahrirlash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Bo'lim nomi</Form.Label>
              <Form.Control type="text" name="name" value={editingDepartment?.name || ''} onChange={handleEditChange} autoComplete="off" required/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Bo'lim boshlig'i</Form.Label>
              <Form.Control type="text" name="responsible" value={editingDepartment?.responsible || ''} onChange={handleEditChange} autoComplete="off" required/>
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

export default Departments;

