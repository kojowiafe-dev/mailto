import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { AuthContext } from '../context/AuthContext';
import api from '../components/api';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/register', form);
      if (res.data && res.data.user) {
        setUser(res.data.user);
        navigate('/profile');
      } else {
        setError(res.data?.detail || 'Registration failed');
      }
    } catch (err) {
      console.log(err);
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-slate-900/90"
        // style={{ overflow: 'hidden' }}
      >
        <Card className="w-full max-w-md shadow-2xl border-purple-500/40 border-4 bg-white/10 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold tracking-tight drop-shadow-lg text-white mb-2">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Sign up to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400"
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-pink-400"
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-purple-400"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl hover:from-purple-700 hover:to-pink-700 text-lg font-bold px-7 py-3 rounded-xl border-2 border-white/10"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
            <div className="mt-6 text-gray-300 text-base text-center">
              Already have an account?{' '}
              <span
                className="text-pink-300 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate('/login')}
              >
                Log In
              </span>
            </div>
            {error && (
              <div className="text-red-400 mt-4 animate-pulse font-bold text-lg text-center">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
