// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
