import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for the authentication token in local storage
  const token = localStorage.getItem('token');

  // If the token doesn't exist, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the token exists, render the child component (the protected page)
  return children;
};

export default ProtectedRoute;