import React from 'react';
import { useRoutes } from 'react-router-dom';
import LandingPage from './Routes/LandingPage';
import Features from './Routes/Features';
import Industries from './Routes/Industries';
import Demo from './Routes/Demo';
import GetStarted from './Routes/GetStarted';
import { Spotlight } from './components/ui/spotlight';
// import { SparklesCore } from './components/ui/spotlight';
import { Toaster } from 'sonner';
import Footer from './Routes/Footer';
import Contact from './Routes/Contact';
import Header from './Routes/Header';

function CustomRoutes() {
  const element = useRoutes([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/features',
      element: <Features />,
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
      path: '/footer',
      element: <Footer />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
  ]);
  return element;
}

const App = () => {
  return (
    <div className="min-h-screen flex flex-col background-color text-gray-950 overflow-visible">
      <Toaster position="top-center" richColors />
      <Spotlight className="absolute inset-0 z-0" />
      <Header />

      <CustomRoutes />
    </div>
  );
};

export default App;
