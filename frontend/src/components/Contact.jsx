import React, { useEffect, useState } from 'react';
import { Bounce, Slide, Zoom } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AOS from 'aos';
import api from './api';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Link } from 'react-router-dom';
import { notifyError, notifySuccess } from '../utils/toastHelpers';
import { Toaster } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      notifyError('Please fill out all the required fields');
      return;
    }
    try {
      const response = await api.post('/message', { name, email, message });
      if (response.status === 201) {
        notifySuccess('Message sent successfully');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        notifyError('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      notifyError('An error occurred while sending the message');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden z-20"
      >*/}
      {/* Blue accent bar */}
      {/*<div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 w-full" />
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
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
        className="w-full max-w-sm z-20 overflow-hidden max-w-md mb-8"
      >
        <Card className="w-full max-w-sm z-20">
          <CardHeader>
            <CardTitle className="font-extrabold text-blue-700">Message Us</CardTitle>
            <CardDescription>
              We'd love to hear from you! Fill out the form below and our team will get back to you
              soon.
            </CardDescription>
            <CardAction>
              <Link to="/register">
                <Button variant="link" className="hover:text-blue-700 cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Kwame"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Message</Label>
                  </div>
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 font-bold text-white"
                  type="submit"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="link" className="font-bold text-blue-700">
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default Contact;
