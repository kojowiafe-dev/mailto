import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Label } from '@/components/ui/label';
import { AuthContext } from '../context/AuthContext';
import api from '../components/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { Meteors } from '@/components/magicui/meteors';
import { notifyError, notifySuccess } from '../utils/toastHelpers';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  // const { setUser } = useContext(AuthContext);
  // const [form, setForm] = useState({ username: '', password: '' });
  const { setAuth } = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!username || !password) {
      notifyError('Please fill out all the required fields');
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

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      setAuth({
        token: data.access_token,
        user: data.user,
      });

      console.log(response);

      notifySuccess(response.message || 'Login successfully!');
      setTimeout(() => {
        navigate('/ai-mail-compose');
      }, 3000);
      setUserName('');
      setPassword('');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.detail) {
        notifyError(error.response.data.detail);
      } else {
        notifyError(error.message || 'Login failed');
      }
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
        <Card className="w-full max-w-2xl h-150 flex justify-center shadow-2xl border-1 bg-black/90 backdrop-blur-xl">
          <CardHeader className="text-center mb-8">
            <CardTitle className="text-3xl font-extrabold tracking-tight drop-shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="text-base text-white hover:bg-gradient-to-r from-purple-600 to-pink-500 hover:text-transparent bg-clip-text cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className="p-4">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex-col items-center justify-center"
            >
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  {/* <Label htmlFor="email" className="text-white">
                    Email
                  </Label> */}
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400 h-15"
                    required
                  />
                </div>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center">
                    <Button
                      onClick={() => navigate('/forgot-password')}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-white hover:bg-gradient-to-r from-purple-600 to-pink-500 hover:text-transparent bg-clip-text"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-pink-400 h-15"
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
              </div>

              <div className="grid grid-cols-3 gap-2">
                <InteractiveHoverButton
                  type="submit"
                  className="shadow-xl col-span-1 font-bold border-2 border-white/10"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </InteractiveHoverButton>
                <InteractiveHoverButton variant="outline" className="col-span-2">
                  Login with Google
                </InteractiveHoverButton>
              </div>
            </form>
          </CardContent>
          <div className="text-gray-300 text-base text-center mt-4">
            Don't have an account?{' '}
            <span
              className="text-pink-300 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </div>
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

export default Login;
