import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
