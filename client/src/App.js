import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import AddContract from './pages/AddContract';
import Contracts from './pages/Contracts';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import Departments from './pages/Departments';
import { useAuth } from './context/AuthContext';
import AdminRoutes from './routes/AdminRoutes';
import { useNavigate } from 'react-router-dom';
import ContractForm from './components/ContractForm';
import AddContractUser from './pages/AddContractUser';




function AppWrapper() {
  const {token, userRole} = useAuth()
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(token, userRole)

  // SESSIONGA EDI BUSIZ XAM ISHLADI 
  //   useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [token]);

  // Login va Register sahifasida navbarni yashirish
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navigation />}
      {/* <Navigation /> */}

      {/* Sahifa kontenti */}
      <div className=" mt-4">
        <Routes>
          <Route path='/login' element={<Login/>} />
            <Route path="/register" element={<Register />} />
          
          <Route path="/" element={token ? <Home /> : <Navigate to='/login'/>} />
          <Route path="/add" element={token ? <AddContractUser /> : <Navigate to='/login'/>} />
          {/* <Route path="/add" element={token ? <ContractForm /> : <Navigate to='/login'/>} /> */}
            {/* <Route path="/contracts" element={token ? <Contracts /> : <Navigate to="/login" />} /> */}
          {/* <Route 
            path="/admin/*"
            element={ 
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }/> */}
            <Route 
            path="/admin/*"
            element={ 
              <ProtectedRoute role={userRole}>
                <AdminPanel />
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace />} />
            

            {/* <Route
              path="/admin/*"
              element={token && userRole === 'admin' ? <AdminPanel /> : <Navigate to="/" />}
            /> */}


            {/* <Route path="/departments" element={token ? <Departments /> : <Navigate to="/login" />} /> */}
        </Routes>
      </div>
    </>
  );
}
// Asosiy App component — Router ni shu yerda o'rab olish kerak
   function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
export default App;

