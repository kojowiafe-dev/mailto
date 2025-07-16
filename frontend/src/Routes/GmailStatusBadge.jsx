import React, { useEffect, useState } from 'react';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import api from '../components/api';
import { notifyError } from '../utils/toastHelpers';

const GmailStatusBadge = () => {
  const [gmailLinked, setGmailLinked] = useState(null); // null = loading

  useEffect(() => {
    const fetchGmailStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/email/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGmailLinked(res.data.gmail_linked);
      } catch (err) {
        console.log(err);
        notifyError('Error checking Gmail connection');
        setGmailLinked(false);
      }
    };

    fetchGmailStatus();
  }, []);

  if (gmailLinked === null) {
    return (
      <div className="mt-4 text-center text-sm text-gray-300 animate-pulse">
        Checking Gmail status...
      </div>
    );
  }

  return (
    <div className="mt-4 text-center">
      {gmailLinked ? (
        <span className="px-4 py-2 bg-green-600 text-white rounded-full font-medium shadow-md">
          ✅ Gmail Connected
        </span>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <span className="px-4 py-2 bg-red-600 text-white rounded-full font-medium shadow-md">
            ❌ Gmail Not Connected
          </span>
          <InteractiveHoverButton
            onClick={() => {
              window.location.href = 'http://localhost:8000/auth/google/';
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
          >
            Connect Gmail to send emails
          </InteractiveHoverButton>
        </div>
      )}
    </div>
  );
};

export default GmailStatusBadge;
