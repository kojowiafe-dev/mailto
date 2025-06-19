import React, { useEffect, useState } from 'react';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AOS from 'aos';
import api from './api';

const Contact = ({ backgroundColor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const textColor = backgroundColor === 'bg-white' ? 'text-gray-900' : 'text-gray-300';
  const inputColor = backgroundColor === 'bg-white' ? 'bg-gray-100' : 'bg-gray-800';
  const formColor = backgroundColor === 'bg-white' ? 'bg-white' : 'bg-gray-900';
  const headerColor = backgroundColor === 'bg-white' ? 'text-gray-900' : 'text-white';
  const borderColor = backgroundColor === 'bg-white' ? 'border-gray-300' : 'border-gray-600';
  const placeholderColor =
    backgroundColor === 'bg-white' ? 'placeholder-gray-500' : 'placeholder-gray-400';

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="fade-up">
      <section id="contact">
        <h3 className={`text-3xl font-bold ${headerColor} mb-6`}>Contact Us</h3>

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
          className={`max-w-xl mx-auto ${formColor} p-6 rounded-2xl shadow space-y-4 border-1 ${borderColor}`}
        >
          <input
            type="text"
            placeholder="Your Name"
            className={`border-b w-full p-3 rounded-md ${inputColor} ${textColor} ${placeholderColor} outline-0 focus:border-blue-500 transition-colors duration-300`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your Email"
            className={`border-b w-full p-3 rounded-md ${inputColor} ${textColor} ${placeholderColor} outline-0 focus:border-blue-500 transition-colors duration-300`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className={`border-b w-full p-3 rounded-md ${inputColor} ${textColor} ${placeholderColor} outline-0 focus:border-blue-500 transition-colors duration-300`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="bg-button-color text-btn-color hover:bg-gray-800 font-bold py-2 px-4 rounded-xl border-gray-600 border-1 cursor-pointer transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
      <ToastContainer
        position="top-center"
        transition={Bounce}
        autoClose={2000}
        theme="dark"
        toastClassName={() =>
          'bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in'
        }
        bodyClassName={() => 'text-sm font-medium'}
        className="toastContainer"
      />
      <style>{`
          .toastContainer {
            top: 0 !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
            z-index: 9999 !important;
            position: fixed !important;
            width: auto !important;
            pointer-events: none;
          }
        `}</style>
    </div>
  );
};

export default Contact;
