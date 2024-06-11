import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from '../utils/auth';

// Certain routes are only accessible if the user is logged in
const ProtectedRoute = ({ children }) => {
  // The `Auth` utility to check if the user is logged in
  if (!Auth.loggedIn()) {
    // If the user is not logged in, they are redirected to the login page
    return <Navigate to="/login" replace />;
  }
  // Or else children components / Outlet are shown
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
