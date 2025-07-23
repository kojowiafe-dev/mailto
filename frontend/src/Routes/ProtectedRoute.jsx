import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // install if not already: npm install jwt-decode

const ProtectedRoute = React.memo(({ children }) => {
  const { auth, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      logout(); // clears auth context
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (isExpired) {
        logout();
      }
    } catch (error) {
      console.error('Token decode error:', error);
      logout();
    }
  }, []);

  if (!auth || !auth.token) {
    return <Navigate to="/" replace />;
  }

  return children;
});

export default ProtectedRoute;
