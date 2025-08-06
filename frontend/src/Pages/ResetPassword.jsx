import React, { useState, useContext, useEffect } from 'react';
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
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const { email, setEmail, code, setCode, isVerified } = useContext(ResetContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //   const [success, setSuccess] = useState('');
  //   const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !code) {
      const storedEmail = localStorage.getItem('reset_email');
      const storedCode = localStorage.getItem('reset_code');
      if (storedEmail && storedCode) {
        setEmail?.(storedEmail);
        setCode?.(storedCode);
      } else {
        notifyError('Reset session expired. Please try again.');
        setTimeout(() => navigate('/forgot-password'), 1200);
      }
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isVerified) {
      notifyError('Please verify the code first.');
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      notifyError('Both password fields are required.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      notifyError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/reset-password', {
        email,
        code,
        new_password: password,
        confirm_password: confirmPassword,
      });

      notifySuccess('Password reset successful ✅');
      localStorage.removeItem('reset_email');
      localStorage.removeItem('reset_code');
      localStorage.removeItem('reset_verified');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      const detail = error?.response?.data?.detail || 'Something went wrong';
      notifyError(`${detail}`);
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Enter your new password and confirm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReset} className="space-y-4 flex-col items-center justify-center">
              <div className="flex flex-col gap-2">
                <div className="grid gap-2 relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder:text-xl text-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400 h-15"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-600"
                  >
                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2 relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="placeholder:text-xl text-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400 h-15"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-600"
                  >
                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>
              </div>
              <InteractiveHoverButton
                type="submit"
                className="shadow-xl col-span-1 font-bold border-2 border-white/10"
                disabled={loading}
              >
                {loading ? 'Confirming Password...' : 'Confirm Password'}
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
          {/* {success && (
            <div className="text-green-400 mt-4 animate-pulse font-bold text-lg text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="text-red-400 mt-4 animate-pulse font-bold text-lg text-center">
              {error}
            </div>
          )} */}
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
