import React, { createContext, useState, useEffect } from 'react';

export const ResetContext = createContext();

const ResetProvider = ({ children }) => {
  // Initialize from localStorage
  const [email, setEmail] = useState(() => localStorage.getItem('reset_email') || '');
  const [code, setCode] = useState(() => localStorage.getItem('reset_code') || '');
  const [isVerified, setIsVerified] = useState(
    () => localStorage.getItem('reset_verified') === 'true'
  );

  // Save to localStorage when updated
  useEffect(() => {
    if (email) localStorage.setItem('reset_email', email);
  }, [email]);

  useEffect(() => {
    if (code) localStorage.setItem('reset_code', code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem('reset_verified', isVerified.toString());
  }, [isVerified]);

  return (
    <ResetContext.Provider value={{ email, setEmail, code, setCode, isVerified, setIsVerified }}>
      {children}
    </ResetContext.Provider>
  );
};

export default ResetProvider;
