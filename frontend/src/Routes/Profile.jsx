import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useContext(useAuth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-slate-900/90 p-10 rounded-3xl text-white text-center mt-20 shadow-2xl backdrop-blur-xl border-4 border-purple-500/40 max-w-lg mx-auto relative z-20"
    >
      <h2 className="text-3xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
        Welcome, {user?.username || 'User'}!
      </h2>
      <div className="text-lg text-gray-200 mb-6">
        <div>
          <span className="font-bold text-pink-300">Email:</span> {user?.email}
        </div>
        <div>
          <span className="font-bold text-purple-300">Username:</span> {user?.username}
        </div>
      </div>
      <div className="mt-8 text-base text-gray-300">
        This is your profile page. You can add more features here, such as editing your info,
        viewing your submissions, or logging out.
      </div>
    </motion.div>
  );
};

export default Profile;
