import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import TextTransition, { presets } from 'react-text-transition';
import video from '../assets/motion.mp4';

const Hero = () => {
  const [prefix] = useState('to');
  const [wordIndex, setWordIndex] = useState(0);
  const navigate = useNavigate();

  const words = ['optimise processes', 'drive innovation', 'deliver data-driven insights'];

  // Rotate words every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax Y movement of video
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Scroll-triggered animations: fade + translate
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: '-100px' });

  return (
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Foreground Content */}
      <section
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Stand out with{' '}
          <span className="text-[#61dafb]">
            <a href="/index">eventus</a>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8"
        >
          Transform your business with our cutting-edge AI/ML solutions, designed {prefix}{' '}
          <div className="m-3 flex justify-center items-center" aria-live="polite">
            <TextTransition springConfig={presets.wobbly} inline className="text-3xl font-bold">
              <span className="text-xl text-[#61dafb]">{words[wordIndex]}</span>
            </TextTransition>
          </div>
          for a smarter, more efficient future.
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          onClick={() => navigate('/register')}
          className="mt-6 bg-[#61dafb] text-black text-lg font-bold py-3 px-6 rounded-2xl shadow-md hover:bg-white hover:text-black transition duration-300"
        >
          Book Us Now
        </motion.button>
      </section>
    </div>
  );
};

export default Hero;
