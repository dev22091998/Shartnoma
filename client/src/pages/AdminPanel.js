import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ButtonGroup, Button, Container, Row, Col, Form } from 'react-bootstrap';
import ContractTable from '../components/ContractTable';
import { getContracts } from '../api/contractApi';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Departments from './Departments';
import Users from './Users';
import AddContract from './AddContract';
// import AddUser from './AddUser';
import Account from './Account';
import AddDepartmentForm from './AddDepartmentForm.js';
import AddUserForm from './AddUserForm.js';
import Contracts from './Contracts.js';



const AdminPanel = () => {
  const [contracts, setContracts] = useState([]);
  // const [activeCategory, setActiveCategory] = useState('contracts');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

    const activePath = location.pathname;

   // URLga qarab activeCategory ni aniqlash
  const path = location.pathname;
  // const activeCategory =
  //   path.includes("/users")
  //     ? "users"
  //     : path.includes("/departments")
  //     ? "departments"
  //     : "contracts";
  const activeCategory =
  path === "/admin/users"
    ? "users"
    : path === "/admin/departments"
    ? "departments"
    : path === "/admin/add-contract"
    ? "add-contract"
    : path === "/admin/add-user"
    ? "add-user"
    : path === "/admin/add-department"
    ? "add-department"
    : path === "/admin/account"
    ? "account"
    : path === "/admin"
    ? "contracts"
    : "";

  // const activeCategory =
  // path.includes("/users")
  //   ? "users"
  //   : path.includes("/departments")
  //   ? "departments"
  //   : path.includes("/add-contract")
  //   ? "add-contract"
  //   : path.includes("/add-user")
  //   ? "add-user"
  //   : path.includes("/add-department")
  //   ? "add-department"
  //   : path.includes("/account") 
  //   ? "account"
  //   : "contracts";

    console.log(activeCategory)

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getContracts();
          setContracts(data);
        } catch (error) {
          console.error('Xatolik:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="d-flex">
      <Sidebar activeCategory={activeCategory} isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="main-content px-3"
        style={{
          marginLeft: sidebarOpen ? '250px' : '60px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
        }}>
        {/* 🔘 3ta kategoriya tugmasi */}
        <Container className="text-center mb-4">
          <ButtonGroup>
            <Button
              variant={activeCategory === "contracts" ? "primary" : "outline-primary"}
              onClick={() => navigate("/admin")}
            >
              📄 Shartnomalar
              {/* <Department/> */}
            </Button>
            <Button
  variant={activeCategory === "departments" ? "primary" : "outline-primary"}
  onClick={() => {
    const cleanPath = "/admin/departments";
    if (location.pathname === "/admin/departments" && location.search) {
      // Agar query param bor bo‘lsa, tozalaymiz
      navigate(cleanPath);
    } else if (location.pathname !== cleanPath) {
      // Asosiy departments sahifasiga yo‘naltiramiz
      navigate(cleanPath);
    }
    // Aks holda hech nima qilmaydi (ya'ni siz already /admin/departments dasiz va query ham yo'q)
  }}
>
  🏢 Bo‘limlar
</Button>

            {/* <Button
                variant={activeCategory === "departments" ? "primary" : "outline-primary"}
                onClick={() => {
                  if (path === "/admin/departments") {
                    // Sahifani qayta yuklashga o‘xshash effekt: scroll to top
                    navigate("/admin/departments", { replace: true });
                  } else {
                    // Bo‘limlar sahifasiga o‘tish
                    navigate("/admin/departments");
                  }
                }}>
                🏢 Bo‘limlar
              </Button> */}

             {/* <Button
                variant={activeCategory === "departments" ? "primary" : "outline-primary"}
                onClick={() => navigate("/admin/departments")}
              >
                🏢 Bo‘limlar
              </Button> */}
            <Button
              variant={activeCategory === "users" ? "primary" : "outline-primary"}
              onClick={() => navigate("/admin/users")}
            >
              👤 Foydalanuvchilar
            </Button>
          </ButtonGroup>
        </Container>

        {activeCategory === 'contracts' && (
          
      // <ContractTable contracts={contracts} />
      <Contracts/>
        )}
        {activeCategory === 'departments' && (
          <Departments/>
        )}
        {activeCategory === 'users' && (
          <div>
            <Users/>
          </div>
        )}
        {activeCategory === 'add-contract' && (
            <AddContract/>
        )}
        {activeCategory === 'add-user' && (
            <AddUserForm/>
        )}
        {activeCategory === 'add-department' && (
            <AddDepartmentForm/>
        )}
        {activeCategory === 'account' && (
            <Account/>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
