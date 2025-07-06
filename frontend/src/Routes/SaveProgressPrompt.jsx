import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AuthContext } from '../context/AuthContext';
import api from '../components/api';
import { motion, AnimatePresence } from 'framer-motion';

const SaveProgressPrompt = ({ email, submissionId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLink = useCallback(async () => {
    if (!user) return;
    setLinking(true);
    setError('');
    setSuccess(false);
    try {
      const res = await api.post(
        '/get-started/link-to-user',
        {
          email,
          user_id: user.id,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.data && res.data.submission_id) {
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1200);
      } else {
        setError(res.data?.message || 'Failed to link submission.');
      }
    } catch (err) {
      setError('Failed to link submission.');
    } finally {
      setLinking(false);
    }
  }, [user, email, navigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-slate-900/90 p-10 rounded-3xl text-white text-center mt-16 shadow-2xl backdrop-blur-xl border-4 border-purple-500/40 max-w-lg mx-auto relative z-20"
        style={{ boxShadow: '0 8px 40px 0 rgba(120,0,180,0.25)' }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-4 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Save your progress?
        </motion.h2>
        <motion.p
          className="mb-7 text-lg text-gray-200 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create an account or log in to save and continue your submission later.
          <br />
          <span className="text-pink-300 font-semibold">Continue as guest</span> if you don&apos;t
          want to save.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-5 mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl hover:from-purple-700 hover:to-pink-700 text-lg font-bold px-7 py-3 rounded-xl border-2 border-white/10"
            style={{ minWidth: 140 }}
          >
            Create Account
          </Button>
          <Button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-pink-600 to-purple-600 shadow-xl hover:from-pink-700 hover:to-purple-700 text-lg font-bold px-7 py-3 rounded-xl border-2 border-white/10"
            style={{ minWidth: 140 }}
          >
            Log In
          </Button>
          {user && (
            <Button
              onClick={handleLink}
              disabled={linking || success}
              className={`bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl border-2 border-white/10 text-lg font-bold px-7 py-3 rounded-xl ${linking ? 'opacity-70' : ''}`}
              style={{ minWidth: 170 }}
            >
              {linking ? 'Linking...' : success ? 'Linked!' : 'Link to My Account'}
            </Button>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-gray-200 hover:bg-white/10 text-base font-semibold px-6 py-2"
          >
            Continue as Guest
          </Button>
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.div
              className="text-red-400 mt-4 animate-pulse font-bold text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              className="text-green-400 mt-4 animate-bounce font-bold text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Submission linked! Redirecting...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SaveProgressPrompt;
