import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import AOS from 'aos';
import api from '../components/api';
import { FaSignOutAlt, FaUser, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import video from '../assets/motion.mp4';
import { ResetContext } from '../context/ResetPasswordContext';
import { notifyError, notifySuccess } from '../utils/toastHelpers';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../components/ui/input-otp';

const VerifyCode = () => {
  const { email, setCode, setIsVerified } = useContext(ResetContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Protect route: if email is not set, redirect to forgot-password
    if (!email) {
      notifyError("Email missing. Start from 'Forgot Password'");
      setTimeout(() => navigate('/forgot-password'));
      // navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!inputCode) {
      notifyError('Enter the code');
      setLoading(false);
      return;
    }

    try {
      console.log('Verifying with:', { email, code: inputCode });

      await api.post('/auth/verify-reset-code', { email, code: inputCode });
      setCode(inputCode);
      setIsVerified(true);
      localStorage.setItem('reset_email', email);
      localStorage.setItem('reset_code', inputCode);

      notifySuccess('Code verified');
      setTimeout(() => navigate('/reset-password'), 1200);
      setCode('');
    } catch (error) {
      if (error.response) {
        const { status, detail } = error.response;
        if (status === 400 && detail.includes('code')) {
          notifyError('Invalid or expired code!');
        } else {
          notifyError(`${detail} 😥`);
        }
      } else {
        notifyError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Toaster position="top-center" richColors />
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
        autoPlay
        muted
        loop
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 }}
        onSubmit={handleVerify}
        className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-7 border border-blue-100 z-20 relative"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-blue-100 p-4 rounded-full mb-2 shadow">
            <FaCode className="text-blue-500 text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1">Verify Code</h2>
          <p className="text-gray-500 text-base text-center">
            Enter the 6-digit code you received in your email
          </p>
        </div>

        {/* <input
          type="text"
          placeholder="6-digit code"
          className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        /> */}

        <InputOTP maxLength={6} value={inputCode} onChange={setInputCode}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-xl my-2 cursor-pointer transition duration-200 shadow-md hover:from-blue-600 hover:to-blue-800 hover:scale-105 active:scale-95"
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying Code...
            </div>
          ) : (
            'Verify Code'
          )}
        </button>

        <div className="w-full flex flex-col items-center gap-2">
          <h4 className="text-gray-500 text-sm">
            Remembered your password?{' '}
            <Link to="/login" className="underline text-blue-600 font-semibold">
              Login
            </Link>
          </h4>
          <Link
            to="/"
            className="text-blue-500 flex gap-2 items-center justify-center text-sm font-medium hover:underline"
          >
            Back to Home
            <FaSignOutAlt />
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default VerifyCode;
