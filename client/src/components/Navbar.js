// import React from 'react';
// import { Navbar, Container, Button } from 'react-bootstrap';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import logo from '../assets/logo.jpg';

// const Navigation = () => {
//   const { token, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <Navbar bg="light" expand="lg" className="shadow-sm">
//       <Container fluid className="d-flex justify-content-between align-items-center">
//         {/* Chap burchak: logo + loyiha nomi (Link bilan) */}
//         <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
//           <img
//             src={logo}
//             alt="Logo"
//             style={{ height: '40px', marginRight: '10px' }}
//           />
//           {/* <span className="fs-5 fw-bold">Shartnoma Tizimi</span> */}
//         </Link>

//         {/* Ong burchak: tugmalar */}
//         <div>
//             {token ? (
//                 location.pathname.startsWith('/admin') ? (
//               // ✅ Agar admin sahifasida bo‘lsa → faqat Logout tugmasi
//               <Button variant="danger" onClick={handleLogout}>
//                 Logout
//               </Button>
//                 ) : (
//               // ✅ Login bo‘lsa va admin sahifasida bo‘lmasa → Admin Panel tugmasi
//               <Button variant="primary" onClick={() => navigate('/admin')}>
//                 Admin Panel
//               </Button>
//                 )
//             ) : (
//               // ❌ Login qilinmagan bo‘lsa → Login va Register tugmalari
//             <>
//               <Button
//                 variant="outline-primary"
//                 className="me-2"
//                 onClick={() => navigate('/login')}
//               >
//                 Login
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={() => navigate('/register')}
//               >
//                 Register
//               </Button>
//             </>
//             )}
          
//           {/* <Button
//             variant="outline-secondary"
//             className="me-2"
//             onClick={() => navigate('/admin')}
//           >
//             Admin Panel
//           </Button> */}
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;


import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // sizdagi logo manzili
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { token, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Chap: Logo + Tizim nomi */}
        <Link
          to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
        >
          <img src={logo}
             alt="Logo"
             style={{ height: '40px', marginRight: '10px' }}/>
          {/* <span className="fs-5 fw-bold">Shartnoma Tizimi</span> */}
        </Link>
        
        

        {/* O'ng: Tugmalar */}
        <div>
          {token ? (
            <>
              {/* Admin bo‘lsa va admin panelda bo‘lmasa → Admin Panel tugmasi */}
              {userRole === 'admin' && !location.pathname.startsWith('/admin') && (
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate('/admin')}
                >
                  Admin Panel
                </Button>
              )}

              {/* Logout har doim ko‘rsatiladi */}
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;

