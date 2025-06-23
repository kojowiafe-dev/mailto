import React, { useEffect, useState } from 'react';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AOS from 'aos';
import api from './api';
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-2">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
        className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 p-0 overflow-hidden z-99"
      >
        {/* Blue accent bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 w-full mb-0" />
        <div className="p-8 flex flex-col items-center">
          <h3 className="text-3xl font-extrabold text-blue-700 mb-1">Contact Us</h3>
          <p className="text-gray-500 text-base mb-6 text-center">
            We'd love to hear from you! Fill out the form below and our team will get back to you
            soon.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!name || !email || !message) {
                toast.error('Please fill out all the required fields', {
                  style: {
                    background: '#000',
                    color: '#fff',
                    transition: 'all 0.3s ease-in-out',
                  },
                });
                return;
              }
              try {
                const response = await api.post('/message', { name, email, message });
                if (response.status === 201) {
                  toast.success('Message sent successfully', {
                    style: {
                      background: '#000',
                      color: '#fff',
                      transition: 'all 0.3s ease-in-out',
                    },
                  });
                  setName('');
                  setEmail('');
                  setMessage('');
                } else {
                  toast.error('Failed to send message', {
                    style: {
                      background: '#000',
                      color: '#fff',
                      transition: 'all 0.3s ease-in-out',
                    },
                  });
                }
              } catch (error) {
                console.error('Error sending message:', error);
                toast.error('An error occurred while sending the message', {
                  style: {
                    background: '#000',
                    color: '#fff',
                    transition: 'all 0.3s ease-in-out',
                  },
                });
              }
            }}
            action=""
            className="w-full space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="border border-blue-200 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-blue-50 text-gray-900 placeholder-gray-400 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-xl cursor-pointer transition duration-200 shadow-md hover:from-blue-600 hover:to-blue-800 hover:scale-105 active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
      <ToastContainer
        position="top-center"
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

export default Contact;
