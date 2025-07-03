import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 h-full pt-16">
        {/* Left Content */}
        <div className="max-w-2xl space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Build the <span className="text-indigo-500">Future</span> with <br />
            AI-Powered <span className="text-blue-400">Automation Agents</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Eventus designs intelligent agents, web systems, and data-driven solutions that drive
            performance, unlock insights, and reimagine what's possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
          >
            <Button size="lg" className="text-lg font-semibold" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Button variant="ghost" size="lg" className="text-lg">
              Explore Solutions
            </Button>
          </motion.div>
        </div>

        {/* Right Animation */}
        <div className="hidden md:block w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* <Lottie animationData={aiAnimation} loop autoplay className="w-full h-auto" /> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
