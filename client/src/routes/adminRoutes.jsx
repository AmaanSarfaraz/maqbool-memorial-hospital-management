// src/routes/adminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterAdmin from '../pages/adminDashboard/RegisterAdmin.jsx';
import Dashboard from '../pages/adminDashboard/Dashboard.jsx';
import PrivateRoute from '../context/admin/privateRoute.js';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  );
};

export default AdminRoutes;
