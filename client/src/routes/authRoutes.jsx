// src/routes/authRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Registration from '../pages/Register/Register';

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/patient/register" element={<Registration />} />
    </>
  );
};

export default AuthRoutes;
