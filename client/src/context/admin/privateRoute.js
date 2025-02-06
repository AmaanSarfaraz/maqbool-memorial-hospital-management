import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminContext from "./adminContext.js";
const PrivateRoute = ({ children }) => {
  const { isAdminAuthenticated } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/login");
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) {
    return null; // Optionally, render a loading indicator or nothing while navigating
  }

  return children;
};

export default PrivateRoute;
