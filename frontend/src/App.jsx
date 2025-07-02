import React from 'react';
import { useRoutes } from 'react-router-dom';
import LandingPage from './Routes/LandingPage';
import Features from './Routes/Features';
import Industries from './Routes/Industries';
import Demo from './Routes/Demo';
// import UseWindowResize from './components/use-window-resize';
// import { motion, useScroll, useTransform } from 'framer-motion';
import { Toaster } from 'sonner';
import Footer from './Routes/Footer';

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
      path: '/footer',
      element: <Footer />,
    },
  ]);
  return element;
}

const App = () => {
  // const windowSize = UseWindowResize();
  // const { scrollY } = useScroll();

  // // How far to move right before starting to move up
  // const moveRightDistance = windowSize.width < 800 ? 200 : 500;
  // // How far from the bottom to start moving up
  // const moveUpStart = document.body.scrollHeight - window.innerHeight - 200; // 200px above the bottom
  // const moveUpEnd = document.body.scrollHeight - window.innerHeight; // At the bottom

  // x: move right as you scroll, then stay
  // const x = useTransform(
  //   scrollY,
  //   [0, moveUpStart, moveUpEnd],
  //   [0, moveRightDistance, moveRightDistance]
  // );
  // // y: stay, then move up as you approach the footer
  // const y = useTransform(
  //   scrollY,
  //   [0, moveUpStart, moveUpEnd],
  //   [0, 0, -320] // Move up by 200px (adjust as needed)
  // );

  return (
    <div className="min-h-screen flex flex-col background-color text-gray-950 overflow-visible">
      <Toaster position="top-center" richColors />
      {/* <motion.h1
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.7 }}
        className="fixed z-0 pointer-events-none select-none font-bold text-gray-400/70"
        style={{
          x,
          y,
          top: windowSize.width < 800 ? '20%' : '60%',
          left: '0%',
          transform: 'translate(-50%, -50%)',
          fontSize: windowSize.width < 800 ? '120px' : '180px',
          writingMode: windowSize.width < 800 ? 'vertical-rl' : 'horizontal-tb',
          textOrientation: 'mixed',
        }}
      >
        EVENTUS
      </motion.h1> */}

      <CustomRoutes />
    </div>
  );
};

export default App;
