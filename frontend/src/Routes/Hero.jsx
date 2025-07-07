// Hero.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div
      id="hero"
      className="min-h-screen flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200"
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 flex-1 pt-24 pb-20">
        {/* Left Content */}
        <div className="max-w-2xl space-y-6 text-center md:text-left" data-aos="fade-right">
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
            <Button
              variant="ghost"
              size="lg"
              className="text-lg"
              onClick={() => navigate('/features')}
            >
              Explore Solutions
            </Button>
          </motion.div>
        </div>

        {/* Right Animation */}
        <div className="hidden md:block w-full max-w-xl" data-aos="fade-left">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* <Lottie animationData={aiAnimation} loop autoplay className="w-full h-auto" /> */}
          </motion.div>
        </div>
      </div>

      {/* Scrollable Features Section */}
      <div id="features" className="bg-white text-black py-12 px-4 md:px-16">
        <div className="max-w-5xl mx-auto text-center space-y-6" data-aos="zoom-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Why Choose Eventus?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Eventus empowers your business with next-generation AI automation, robust web systems,
            and actionable analytics. Our solutions are designed to scale, adapt, and deliver
            measurable results for organizations of all sizes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div
              className="rounded-xl shadow-lg p-6 bg-gray-50 border border-gray-200"
              data-aos="fade-up"
            >
              <h3 className="font-semibold text-xl mb-2 text-purple-700">AI Automation</h3>
              <p className="text-gray-600">
                Automate repetitive tasks, streamline workflows, and boost productivity with
                intelligent agents tailored to your needs.
              </p>
            </div>
            <div
              className="rounded-xl shadow-lg p-6 bg-gray-50 border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="font-semibold text-xl mb-2 text-pink-600">Web Systems</h3>
              <p className="text-gray-600">
                Modern, secure, and scalable web platforms that power your digital transformation
                and customer engagement.
              </p>
            </div>
            <div
              className="rounded-xl shadow-lg p-6 bg-gray-50 border border-gray-200"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="font-semibold text-xl mb-2 text-blue-600">Data Analytics</h3>
              <p className="text-gray-600">
                Unlock insights from your data to drive smarter decisions and uncover new
                opportunities for growth.
              </p>
            </div>
          </div>

          <div
            className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6"
            data-aos="zoom-in"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-purple-700 text-2xl">99.9%</span>
              <span className="text-gray-700">Uptime Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-pink-600 text-2xl">24/7</span>
              <span className="text-gray-700">Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-600 text-2xl">1000+</span>
              <span className="text-gray-700">Projects Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 z-50"
      >
        ↑
      </button>
    </div>
  );
};

export default Hero;
