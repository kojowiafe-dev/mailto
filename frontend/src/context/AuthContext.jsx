import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      const token = parsed?.token;

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const isExpired = Date.now() >= decoded.exp * 1000;

          if (isExpired) {
            logout();
          } else {
            setAuth(parsed); // still valid
          }
        } catch (e) {
          console.error('Invalid token:', e);
          logout();
        }
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const user = { token, user_id: decoded.user_id };
      setAuth(user);
    } catch (e) {
      console.error('Failed to decode and login:', e);
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, login }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
