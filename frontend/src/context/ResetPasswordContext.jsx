import React, { createContext, useState } from 'react';

export const ResetContext = createContext();

const ResetProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  return (
    <ResetContext.Provider value={{ email, setEmail, code, setCode, isVerified, setIsVerified }}>
      {children}
    </ResetContext.Provider>
  );
};

export default ResetProvider;
