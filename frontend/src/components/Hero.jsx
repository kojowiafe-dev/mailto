import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { motion } from 'framer-motion';
import UseWindowResize from './use-window-resize';
import TextTransition, { presets } from 'react-text-transition';
// import video from '../assets/motion.mp4';

const Hero = () => {
  const [prefix] = useState('to');
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['optimise processes', 'drive innovation', 'deliver data-driven insights'];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // AOS.refresh()
  }, []);

  // const windowSize = UseWindowResize();
  const navigate = useNavigate();

  return (
    <div className="p-3 mt-10 overflow-hidden z-10 relative">
      <section className="mb-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-color mb-4"
        >
          Stand out with{' '}
          <span className="button-color">
            <a href="/index">eventus</a>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 text-wrap"
        >
          {/* Elevate your business with vibrant, bold branding that leaves a lasting impression. */}
          Transform your business with our cutting-edge AI/ML solutions, designed {prefix}{' '}
          <div className="m-3 flex justify-center items-center">
            <TextTransition springConfig={presets.wobbly} inline className="text-3xl font-bold">
              <span aria-live="polite" className="text-xl button-color">
                {words[wordIndex]}
              </span>
            </TextTransition>
          </div>
          for a smarter, more efficient future.
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
          onClick={() => navigate('/register')}
          className="m-10 bg-button-color text-btn-color text-lg font-bold py-3 px-6 rounded-2xl shadow-md hover:transition duration-200 border-gray-600 border-0 cursor-pointer"
        >
          Book Us Now
        </motion.button>
      </section>
    </div>
  );
};

export default Hero;
