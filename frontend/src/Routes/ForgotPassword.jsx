import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AOS from 'aos';
import api from '../components/api';
import { FaSignOutAlt } from 'react-icons/fa';

const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/forgot-password', { email });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [email, setEmail] = useState('');

  return (
    <div className="p-3" data-aos="fade-up">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email) {
            toast.error('Input your email', {
              style: {
                background: '#000',
                color: '#fff',
                transition: 'all 0.3s ease-in-out',
              },
            });
            return;
          } else {
            try {
              handleSubmit();
              toast.success('OTP sent to email', {
                style: {
                  background: '#000',
                  color: '#fff',
                  transition: 'all 0.3s ease-in-out',
                },
              });
              navigate('/verify-email');
              setEmail('');
            } catch (error) {
              if (error.response) {
                const status = error.response.status;
                const detail = error.response.data.detail;

                if (status === 400 && detail.includes('Email')) {
                  toast.error('Email not found!', {
                    style: {
                      background: '#000',
                      color: '#fff',
                    },
                  });
                } else {
                  toast.error('OTP not sent😥', {
                    style: {
                      background: '#000',
                      color: '#fff',
                    },
                  });
                }
              } else {
                console.log('Unknown error: ', error);
                toast.error('Something went wrong', {
                  style: {
                    background: '#000',
                    color: '#fff',
                  },
                });
              }
            }
          }
        }}
        action=""
        className="space-y-8 max-w-md mx-auto nav-color border-1 border-gray-600 p-6 rounded-2xl shadow flex flex-col items-center"
      >
        <h2 className="button-color text-2xl">Forgot Password</h2>

        <input
          type="email"
          placeholder="Email"
          className="border-b w-full p-3 rounded-md button-color"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-button-color text-white font-bold py-2 px-4 rounded-xl my-2 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Send Code
        </button>
        <Link
          to="/login"
          className="button-color flex gap-2 items-center justify-center hover:gap-3 transition-all duration-300 ease-in-out hover:scale-105 group self-center pl-6"
        >
          Go to Login
          <FaSignOutAlt className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
        </Link>
      </form>

      <ToastContainer
        position="top-right"
        transition={Bounce}
        autoClose={2000}
        theme="dark"
        toastClassName={() =>
          'bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in'
        }
        bodyClassName={() => 'text-sm font-medium'}
        style={{ zIndex: 99999, position: 'fixed' }}
      />
    </div>
  );
};

export default ForgotPassword;
