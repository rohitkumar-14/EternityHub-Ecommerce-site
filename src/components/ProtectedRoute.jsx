import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, role }) => {
  const user = isAuthenticated() ? JSON.parse(localStorage.getItem('user')) : null;

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && (!user || user.role !== role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
