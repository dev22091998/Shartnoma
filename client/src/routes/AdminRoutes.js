import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';
import AddContract from '../pages/AddContract';
// import AddUser from '../pages/AddUser';
import AddDepartmentForm from '../components/AddDepartmentForm';
import AddUserForm from '../pages/AddUserForm';
// import AccountPage from '../pages/AccountPage'; // mavjud bo‘lsa

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/add-contract" element={<AddContract />} />
      <Route path="/admin/add-user" element={<AddUserForm />} />
      <Route path="/admin/add-department" element={<AddDepartmentForm />} />
      {/* <Route path="/admin/account" element={<AccountPage />} /> */}
    </Routes>
  );
};

export default AdminRoutes;
