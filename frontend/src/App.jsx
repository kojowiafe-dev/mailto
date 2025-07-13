import React, { useState } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import LandingPage from './Routes/LandingPage';
import Solutions from './Routes/Solutions';
import Industries from './Routes/Industries';
import Demo from './Routes/Demo';
import GetStarted from './Routes/GetStarted';
import AIMailCompose from './Routes/AIMailCompose';
import { Spotlight } from './components/ui/spotlight';
// import { SparklesCore } from './components/ui/spotlight';
import SaveProgressPrompt from './Routes/SaveProgressPrompt';
import { Toaster } from 'sonner';
import Footer from './Routes/Footer';
import Contact from './Routes/Contact';
import Header from './Routes/Header';
import Login from './Routes/Login';
import Register from './Routes/Register';
import Profile from './Routes/Profile';
import ForgotPassword from './Routes/ForgotPassword';
import ResetPassword from './Routes/ResetPassword';
import VerifyResetCode from './Routes/VerifyResetCode';
import ProtectedRoute from './Routes/ProtectedRoute';

function CustomRoutes() {
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/solutions',
      element: <Solutions />,
    },
    {
      path: '/industries',
      element: <Industries />,
    },
    {
      path: '/demo',
      element: <Demo />,
    },
    {
      path: '/get-started',
      element: <GetStarted />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '/save-progress-prompt',
      element: <SaveProgressPrompt />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/verify-reset-code',
      element: <VerifyResetCode />,
    },
  ]);
  return element;
}

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/*" element={<CustomRoutes />} />
      <Route
        path="/ai-mail-compose"
        element={
          <ProtectedRoute>
            <AIMailCompose />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
