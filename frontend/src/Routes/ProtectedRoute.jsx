import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import jwt_decode from 'jwt-decode'; // install if not already: npm install jwt-decode

const ProtectedRoute = ({ children }) => {
  const { auth, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      logout(); // clears auth context
      return;
    }

    try {
      const decoded = jwt_decode(token);
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
};

export default ProtectedRoute;
