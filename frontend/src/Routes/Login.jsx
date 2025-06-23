import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AOS from 'aos';
import api from '../components/api';
import { GoogleLogin } from '@react-oauth/google';
import { FaEye, FaEyeSlash, FaHome, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import video from '../assets/motion.mp4';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
        autoPlay
        muted
        loop
      >
        <source src={video} type="video/mp4" />
      </video>
      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" /> */}
      {/* Form content */}
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 }}
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          if (!username || !password) {
            toast.error('Please fill out all the required fields', {
              style: {
                background: '#000',
                color: '#fff',
                transition: 'all 0.3s ease-in-out',
              },
            });
            setLoading(false);
            return;
          }
          try {
            const response = await api.post(
              '/auth/login',
              { username, password },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            console.log(response);

            toast.success(response.message || 'Login successfully!', {
              style: {
                background: '#000',
              },
              progressClassName: 'bg-gray-400',
            });
          } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.detail) {
              toast.error(error.response.data.detail, {
                style: {
                  background: '#000',
                  color: '#fff',
                },
              });
            } else {
              toast.error(error.message || 'Login failed', {
                style: {
                  background: '#000',
                  color: '#fff',
                },
              });
            }
          } finally {
            setLoading(false);
          }
        }}
        action=""
        className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-7 border border-blue-100 z-20 relative"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-blue-100 p-4 rounded-full mb-2 shadow">
            <FaUser className="text-blue-500 text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-base">Log in to your Eventus account</p>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
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
              Logging in...
            </div>
          ) : (
            'Login'
          )}
        </button>
        <div className="w-full flex flex-col items-center gap-2">
          <GoogleLogin
            theme="filled_blue"
            text="login_with"
            shape="pill"
            size="large"
            width="250"
            height="50"
            logo_alignment="right"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <Link to="/forgot-password" className="text-blue-500 text-sm underline my-2">
            Forgot Password?
          </Link>
          <h4 className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="underline text-blue-600 font-semibold">
              Register
            </Link>
          </h4>
          <Link
            to="/"
            className="text-blue-500 flex gap-2 items-center justify-center text-sm font-medium hover:underline"
          >
            Explore Eventus
            <FaHome />
          </Link>
        </div>
      </motion.form>
      <ToastContainer
        position="top-right"
        transition={Bounce}
        autoClose={1200}
        theme="light"
        toastClassName={() =>
          'bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in'
        }
        bodyClassName={() => 'text-sm font-medium'}
        style={{ zIndex: 2147483647, position: 'fixed' }}
      />
    </div>
  );
};

export default Login;
