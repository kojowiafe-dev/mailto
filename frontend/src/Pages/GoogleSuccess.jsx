// /pages/GoogleSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifySuccess } from '../utils/toastHelpers';

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    notifySuccess('Gmail linked successfully!');
    setTimeout(() => {
      navigate('/ai-mail-compose');
    }, 3000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-xl font-bold">
      Gmail account linked! Redirecting...
    </div>
  );
};

export default GoogleSuccess;
