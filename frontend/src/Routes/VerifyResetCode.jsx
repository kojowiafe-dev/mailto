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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../components/ui/input-otp';

const VerifyResetCode = () => {
  const { email, setCode, setIsVerified } = useContext(ResetContext);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Protect route: if email is not set, redirect to forgot-password
    if (!email) {
      notifyError("Email missing. Start from 'Forgot Password'");
      setTimeout(() => navigate('/auth/forgot-password'));
      // navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!inputCode) {
      notifyError('Enter the code');
      setSuccess('Enter the code');
      setLoading(false);
      return;
    }

    try {
      console.log('Verifying with:', { email, code: inputCode });

      await api.post('/auth/verify-reset-code', { email, code: inputCode });
      setCode(inputCode);
      setIsVerified(true);
      localStorage.setItem('reset_email', email);
      localStorage.setItem('reset_code', inputCode);

      notifySuccess('Code verified');
      setTimeout(() => navigate('/reset-password'), 1200);
      setCode('');
    } catch (error) {
      if (error.response) {
        const { status, detail } = error.response;
        if (status === 400 && detail.includes('code')) {
          notifyError('Invalid or expired code!');
        } else {
          notifyError(`${detail} 😥`);
        }
      } else {
        notifyError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-sm">
      <Meteors number={30} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex items-center justify-center w-full"
      >
        <Card className="w-full max-w-lg h-80 flex justify-center shadow-xl border bg-black/90 backdrop-blur-xl">
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-xl font-bold tracking-tight drop-shadow text-white">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-300 text-xs">
              Enter your new password and confirm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleVerify}
              className="space-y-4 flex flex-col items-center justify-center text-white"
            >
              <InputOTP maxLength={6} value={inputCode} onChange={setInputCode} className="gap-2">
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-10 h-10 text-lg rounded border border-gray-700 bg-gray-900 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-14 h-16 text-3xl rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={2}
                    className="w-14 h-16 text-3xl rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-14 h-16 text-3xl rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={4}
                    className="w-14 h-16 text-3xl rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-14 h-16 text-3xl rounded-lg border-2 border-gray-700 bg-gray-900 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  />
                </InputOTPGroup>
              </InputOTP>
              <InteractiveHoverButton
                type="submit"
                className="shadow col-span-1 font-bold border border-white/10 text-black text-xs"
                disabled={loading}
              >
                {loading ? 'Confirming Code...' : 'Confirm Code'}
              </InteractiveHoverButton>
            </form>
          </CardContent>
          <div className="text-gray-300 text-xs text-center">
            Remembered your password?{' '}
            <span
              className="text-pink-300 font-semibold cursor-pointer hover:underline text-xs"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </div>
          {success && (
            <div className="text-green-400 mt-2 animate-pulse font-bold text-base text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="text-red-400 mt-2 animate-pulse font-bold text-base text-center">
              {error}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyResetCode;
