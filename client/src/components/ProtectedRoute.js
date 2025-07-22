import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children, userRole }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null); // null orniga ""
    const accessAdmin = jwtDecode(token)
    console.log(accessAdmin.role)
  
  // const { token } = useAuth();

  // return localStorage.getItem('role') === 'admin' ? children : <Navigate to="/" />;
  return accessAdmin.role === 'admin' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
