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
import Hero from './Routes/Hero';

// function CustomRoutes() {
//   const element = useRoutes([
//     {
//       path: '/',
//       element: <LandingPage />,
//     }
//   ]);
//   return element;
// }

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/*" element={<CustomRoutes />} /> */}
      <Route element={<LandingPage />}>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/google-linked-success" element={<GoogleSuccess />} />
      </Route>
      {/* <Route path="/" element={<LandingPage />} /> */}
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
