import React from 'react';
import { useRoutes } from 'react-router-dom';
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
      path: '/ai-mail-compose',
      element: <AIMailCompose />,
    },
    {
      path: '/footer',
      element: <Footer />,
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
      path: '/profile',
      element: <Profile />,
    },
  ]);
  return element;
}

const App = () => {
  return (
    // <div className="min-h-screen flex flex-col background-color text-gray-950 overflow-visible">
    <div className="relative h-screen w-full bg-black text-white overflow-visible">
      <Toaster position="top-center" richColors />
      <Spotlight className="absolute inset-0 z-0" />
      <Header />

      <CustomRoutes />
    </div>
  );
};

export default App;
