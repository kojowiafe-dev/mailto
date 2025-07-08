import React, { useState, useContext } from 'react';
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
import { Label } from '@/components/ui/label';
import { AuthContext } from '../context/AuthContext';
import api from '../components/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/login', form);
      if (res.data && res.data.user) {
        setUser(res.data.user);
        navigate('/profile');
      } else {
        setError(res.data?.message || 'Invalid credentials');
      }
    } catch (err) {
      console.log(err);

      setError('Login failed.');
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
            <CardTitle className="text-3xl font-extrabold tracking-tight drop-shadow-lg text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" className="text-base text-white">
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
                    value={form.username}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400 h-15"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    {/* <Label htmlFor="password" className="text-gray-400">
                      Password
                    </Label> */}
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-pink-400 h-15"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full  shadow-xl text-lg font-bold px-7 py-3 rounded-xl border-2 border-white/10"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
              <ShimmerButton className="shadow-2xl w-full">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Log In
                </span>
              </ShimmerButton>
            </form>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
          <div className="text-gray-300 text-base text-center">
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
