  import React, {useEffect, useState }from 'react';
  import "./ContractTable.css"; // Jadval uchun stil fayli
  import { useNavigate } from 'react-router-dom';
  import { Row, Col, Button, Form, Alert, Table } from 'react-bootstrap';
  import { getContracts } from './../api/contractApi';
  import { useAuth } from '../context/AuthContext'; // 👈 Qo‘shamiz 
import { BASE_URL } from '../api/config';


  const ContractTable = () => {
    const [contracts, setContracts] = useState([])
    const [search, setSearch] = useState('');
    const { userDepartment } = useAuth(); // 👈 Kontekstdan bo‘limni olamiz
      // ✅ Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
      
      const navigate = useNavigate();

    useEffect(() => {
      fetchContracts()
    }, [])
    
    const fetchContracts = async () => {
      try {
        const data = await getContracts();
        setContracts(data);
      } catch (err) {
        console.err("Shartnomalar olishda xatolik")
      }
    }
    console.log(userDepartment)

      // 🧠 Faqat userning o‘z bo‘limiga tegishli shartnomalar
  const departmentContracts = contracts.filter(
    (contract) => contract.department === userDepartment
  );

      // Faqat mos tushadigan shartnomalarni ko‘rsatish
    const filteredContracts = departmentContracts.filter((contract) => {
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

    return (
      <>

      {/* <Form.Control
  type="text"
  placeholder="🔍 Qidiruv..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-3 w-50 mx-auto"
/> */}
<Row className="mb-3 align-items-center">
  <Col xs={12} md={6}>
    <Form.Control
      type="text"
      placeholder="🔍 Qidiruv..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </Col>
  <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
    <Button variant="primary" onClick={() => navigate('/add')}>
      Shartnoma qo‘shish
    </Button>
  </Col>
</Row>


        
      <table  className="product-table">
          <thead>
              <tr>
                  <th>№</th>
                  <th>Shartnoma raqami</th>
                  <th>Kontragent</th>
                  <th>Amal qilish muddati</th>
                  <th>Mas’ul shaxs</th>
                  <th>Mas’ul bo'lim</th>
                  <th>PDF fayl</th>
              </tr>
          </thead>
          <tbody>
                  {currentItems.map((c, i) => (
                          <tr key={c._id}>
                              <td>{ i + 1}</td>
                              <td>{c.number}</td>
                              <td>{c.company}</td>
                              <td>{c.validUntil}</td>
                              <td>{c.person}</td>
                              <td>{c.department}</td>
                              <td>
                              <a href={`${BASE_URL}/${c.filePath}`} target="_blank" rel="noreferrer">
                                  {c.fileName}
                              </a>
                              </td>
                          </tr>
                      
                  ))}
                  {filteredContracts.length === 0 && (
                      <tr>
                      <td colSpan="6" className="text-center text-muted">
                          Hech qanday mos shartnoma topilmadi.
                      </td>
                      </tr>
                  )}
          </tbody>
      </table>
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
      </>
    );
  };

  export default ContractTable;
