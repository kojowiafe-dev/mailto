import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../components/api';
import { notifyError } from '../utils/toastHelpers';

const GmailStatusBadge = () => {
  const [gmailLinked, setGmailLinked] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/email/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGmailLinked(res.data.gmail_linked);
        setShowToast(true);
      } catch (err) {
        console.error(err);
        notifyError('Error checking Gmail connection');
        setGmailLinked(false);
        setShowToast(true);
      }
    };

    fetchStatus();

    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <AnimatePresence>
        {showToast && gmailLinked !== null && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg shadow-lg px-6 py-4 w-80 text-white relative ${
              gmailLinked ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-1 right-2 text-xl font-bold"
            >
              ×
            </button>
            <h4 className="font-semibold">
              {gmailLinked ? '✅ Gmail Connected' : '❌ Gmail Not Connected'}
            </h4>
            <p className="text-sm mt-1">
              {gmailLinked
                ? 'You can now log in and send emails.'
                : 'Please connect Gmail to send emails.'}
            </p>
            {!gmailLinked && (
              <button
                className="mt-3 text-sm underline"
                onClick={() => (window.location.href = 'http://localhost:8000/auth/google/')}
              >
                Connect Gmail
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GmailStatusBadge;
