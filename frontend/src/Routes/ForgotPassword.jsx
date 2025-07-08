import React, { useState, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import api from '../components/api';
import { motion } from 'framer-motion';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { useNavigate } from 'react-router-dom';
import { Meteors } from '@/components/magicui/meteors';
import { notifyError, notifySuccess } from '../utils/toastHelpers';
import { ResetContext } from '../context/ResetPasswordContext';

const ForgotPassword = () => {
  const { setEmail } = useContext(ResetContext);
  const [inputEmail, setInputEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!inputEmail) {
      notifyError('Input your email');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/forgot-password', { email: inputEmail });

      setEmail(inputEmail);
      notifySuccess('OTP sent to email');
      setSuccess('OTP sent to email');

      setTimeout(() => navigate('/verify-reset-code'), 1200);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const detail = error.response.data.detail;

        if (status === 404 && detail.includes('Email')) {
          notifyError('Email not found!');
          setError('Email not found');
        } else {
          notifyError('OTP not sent 😥');
          setError('OTP not sent 😥');
        }
      } else {
        notifyError('Something went wrong');
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Meteors number={30} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex items-center justify-center w-full"
      >
        <Card className="w-full max-w-2xl h-100 flex justify-center shadow-2xl border-1 bg-black/90 backdrop-blur-xl">
          <CardHeader className="text-center mb-8">
            <CardTitle className="text-3xl font-extrabold tracking-tight drop-shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex-col items-center justify-center"
            >
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="placeholder:text-xl text-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400 h-15"
                    required
                  />
                </div>
              </div>
              <InteractiveHoverButton
                type="submit"
                className="shadow-xl col-span-1 font-bold border-2 border-white/10"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </InteractiveHoverButton>
            </form>
          </CardContent>
          <div className="text-gray-300 text-base text-center">
            Remembered your password?{' '}
            <span
              className="text-pink-300 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </div>
          {success && (
            <div className="text-green-400 mt-4 animate-pulse font-bold text-lg text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="text-red-400 mt-4 animate-pulse font-bold text-lg text-center">
              {error}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
