import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../components/api'; // your axios instance
import { notifySuccess, notifyError } from '../utils/toastHelpers';

const GmailSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const finalizeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          notifyError('Token missing. Please log in again.');
          navigate('/');
          return;
        }

        // ✅ Include token in request
        const res = await api.get('/email/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.gmail_linked) {
          login(token); // sets context
          notifySuccess('Gmail successfully connected!');
          navigate('/ai-mail-compose');
        } else {
          notifyError('Gmail not connected. Please try again.');
          navigate('/');
        }
      } catch (err) {
        console.error('Error finalizing Gmail auth:', err);
        notifyError('Error finalizing Gmail authentication');
        navigate('/');
      }
    };

    finalizeAuth();
  }, []);

  return null; // or a loader
};

export default GmailSuccess;
