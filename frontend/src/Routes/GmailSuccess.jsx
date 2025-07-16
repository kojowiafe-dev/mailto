import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../components/api';
import { notifySuccess, notifyError } from '../utils/toastHelpers';

const GmailSuccess = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const finalizeAuth = async () => {
      try {
        const token = auth?.token || JSON.parse(localStorage.getItem('auth'))?.token;
        if (!token) {
          notifyError('Token missing. Please log in again.');
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        const res = await api.get('/email/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.gmail_linked) {
          setAuth({ token }); // properly store token in context
          notifySuccess('Gmail successfully connected!');
          setTimeout(() => navigate('/ai-mail-compose'), 2000);
        } else {
          notifyError('Gmail not connected. Please try again.');
          setTimeout(() => navigate('/'), 2000);
        }
      } catch (err) {
        console.error('Error finalizing Gmail auth:', err);
        notifyError('Error finalizing Gmail authentication');
        setTimeout(() => navigate('/'), 2000);
      }
    };

    finalizeAuth();
  }, []);

  return null;
};

export default GmailSuccess;
