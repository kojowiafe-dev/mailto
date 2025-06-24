import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { motion } from 'framer-motion';
import TextTransition, { presets } from 'react-text-transition';
import video from '../assets/motion.mp4';

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
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover opacity-0.9" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        {/* <div className="absolute inset-0 bg-black/20" /> */}
      </div>

      {/* Foreground Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
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
          className="text-lg md:text-xl text-color max-w-2xl mx-auto mb-8"
        >
          Transform your business with our cutting-edge AI/ML solutions, designed {prefix}{' '}
          <div className="m-3 flex justify-center items-center" aria-live="polite">
            <TextTransition springConfig={presets.wobbly} inline className="text-3xl font-bold">
              <span className="text-xl button-color">{words[wordIndex]}</span>
            </TextTransition>
          </div>
          for a smarter, more efficient future.
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.8 }}
          onClick={() => navigate('/register')}
          className="mt-6 bg-blue-400 cursor-pointer text-black text-lg font-bold py-3 px-6 rounded-2xl shadow-md hover:bg-white hover:text-blue-400 hover:scale-105 transition duration-300"
        >
          Book Us Now
        </motion.button>
      </section>
    </div>
  );
};

export default Hero;
