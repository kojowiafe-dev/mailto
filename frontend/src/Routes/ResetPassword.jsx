import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AOS from 'aos';
import api from '../components/api';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import video from '../assets/motion.mp4';
import { ResetContext } from '../context/ResetPasswordContext';

const ResetPassword = () => {
  const { email, setEmail, code, setCode, isVerified } = useContext(ResetContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Load from localStorage if context lost
    if (!email || !code) {
      const storedEmail = localStorage.getItem('reset_email');
      const storedCode = localStorage.getItem('reset_code');
      if (storedEmail && storedCode) {
        setEmail?.(storedEmail);
        setCode?.(storedCode);
      } else {
        toast.error('Reset session expired. Please try again.', toastStyle);
        navigate('/forgot-password');
      }
    }
  }, []);

  const toastStyle = {
    style: { background: '#000', color: '#fff' },
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isVerified) {
      toast.error('Please verify the code first.', toastStyle);
      setLoading(false);
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Both password fields are required.', toastStyle);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.', toastStyle);
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/reset-password', {
        email,
        code,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      toast.success('Password reset successful ✅', toastStyle);
      localStorage.removeItem('reset_email');
      localStorage.removeItem('reset_code');
      localStorage.removeItem('reset_verified');
      navigate('/login');
    } catch (error) {
      const detail = error?.response?.data?.detail || 'Something went wrong';
      toast.error(`${detail}`, toastStyle);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
        autoPlay
        muted
        loop
      >
        <source src={video} type="video/mp4" />
      </video>

      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 }}
        onSubmit={handleReset}
        className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-7 border border-blue-100 z-20 relative"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-blue-100 p-4 rounded-full mb-2 shadow">
            <FaUser className="text-blue-500 text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1">Reset Password</h2>
          <p className="text-gray-500 text-base text-center">Enter your new password</p>
        </div>

        <input
          type="password"
          placeholder="New Password"
          className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

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
              Resetting Password...
            </div>
          ) : (
            'Reset Password'
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

      <ToastContainer
        position="top-right"
        transition={Bounce}
        autoClose={1200}
        theme="dark"
        toastClassName={() =>
          'bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in'
        }
        bodyClassName={() => 'text-sm font-medium'}
        style={{ zIndex: 2147483647, position: 'fixed' }}
      />
    </div>
  );
};

export default ResetPassword;
