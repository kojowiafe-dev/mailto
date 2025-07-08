import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import api from '../components/api';
import { motion } from 'framer-motion';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { useNavigate } from 'react-router-dom';
import { Meteors } from '@/components/magicui/meteors';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/forgot-password', { email });
      if (res.data && res.data.message) {
        setSuccess(res.data.message);
      } else {
        setSuccess('If your email exists, a reset link has been sent.');
      }
    } catch {
      setError('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex items-center justify-center w-full"
      >
        <Card className="w-full max-w-2xl h-100 flex justify-center shadow-2xl border-1 bg-black/90 backdrop-blur-xl">
          <CardHeader className="text-center mb-8">
            <CardTitle className="text-3xl font-extrabold tracking-tight drop-shadow-lg text-white">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
