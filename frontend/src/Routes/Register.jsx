import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AuthContext } from '../context/AuthContext';
import api from '../components/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { Meteors } from '@/components/magicui/meteors';
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from '../utils/toastHelpers';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  // const { setUser } = useContext(AuthContext);
  // const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!username || !email || !password) {
      notifyError('Please fill out all the required fields');
      setLoading(false);
      return;
    }
    if (password.length > 0 && password.length < 8) {
      notifyError('Password too short');
      setLoading(false);
      return;
    } else {
      try {
        const response = await api.post('/register', { username, email, password });
        notifySuccess('Registration successful');
        navigate('/login');
        setUserName('');
        setEmail('');
        setPassword('');
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const detail = error.response.data.detail;

          if (status === 400 && detail.includes('Username')) {
            notifyError('User already exists! Login😊');
            setLoading(false);
            return;
          } else if (status === 400 && detail.includes('Email')) {
            notifySuccess('Email already registered!');
          } else {
            notifyError('Registration failed😥');
          }
        } else {
          console.log('Unknown error: ', error);
          notifyError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
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
              Create an account
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Sign up to access your account and start using our services.
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="text-base text-white hover:bg-gradient-to-r from-purple-600 to-pink-500 hover:text-transparent bg-clip-text cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
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
                    {...register('username', { required: true, minLength: 0 })}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400 h-15"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    {...register('email', { required: true })}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-pink-400 h-15"
                    required
                  />
                </div>
                <div className="grid gap-2 relative">
                  <Input
                    {...register('password', { required: true, minLength: 8 })}
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
              {errors.password && errors.password.type === 'minLength'
                ? notifyError('Password too short')
                : null}

              <div className="grid grid-cols-3 gap-2">
                <InteractiveHoverButton
                  type="submit"
                  className="shadow-xl col-span-1 font-bold border-2 border-white/10"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </InteractiveHoverButton>
                <InteractiveHoverButton variant="outline" className="col-span-2">
                  SIgn Up with Google
                </InteractiveHoverButton>
              </div>
              {/* <ShimmerButton className="shadow-2xl w-full">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Log In
                </span>
              </ShimmerButton> */}
            </form>
          </CardContent>
          <CardFooter></CardFooter>
          <div className="text-gray-300 text-base text-center">
            Already have an account?{' '}
            <span
              className="text-pink-300 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
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

export default Register;
