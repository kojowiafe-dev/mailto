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

const Contact = ({ backgroundColor }) => {
  const bgColor = backgroundColor === 'bg-gray-100' ? 'bg-black' : 'bg-white';
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
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
        className="w-full max-w-sm z-20 overflow-hidden max-w-md mb-8"
      >
        <Card className={`w-full max-w-sm z-20 ${bgColor}`}>
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
