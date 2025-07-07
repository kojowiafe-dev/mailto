// Hero.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import aiAnimation from '@/assets/lottie/ai-agent.json'; // optional

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
      className="min-h-screen flex flex-col scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 overflow-y-auto"
    >
      {/* Hero Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 flex-1 pt-24 pb-20">
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

        <div className="hidden md:block w-full max-w-xl" data-aos="fade-left">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Lottie animation placeholder */}
            {/* <Lottie animationData={aiAnimation} loop autoplay className="w-full h-auto" /> */}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white text-black py-20 px-4 md:px-16">
        <div className="max-w-6xl mx-auto text-center space-y-6" data-aos="zoom-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Why Choose Eventus?
          </h2>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Eventus empowers your business with next-generation AI automation, robust web systems,
            and actionable analytics. Our solutions are designed to scale, adapt, and deliver
            measurable results for organizations of all sizes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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

          {/* Guarantee stats section */}
          <div
            className="mt-14 flex flex-col md:flex-row items-center justify-center gap-6"
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

      {/* More Content Section */}
      <section className="bg-black text-white py-20 px-4 md:px-16">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-indigo-400">AI Use Cases</h3>
            <ul className="space-y-4 text-lg text-gray-200 list-disc list-inside">
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Automated Email & Workflow Management
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Smart Data Extraction & Document Processing
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Conversational AI for Customer Support
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Predictive Analytics for Business Insights
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Custom AI Integrations for Your Stack
              </motion.li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-pink-400">What Sets Us Apart?</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </span>
                <div>
                  <span className="font-semibold">End-to-End Delivery:</span> From ideation to
                  deployment, we handle it all.
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </span>
                <div>
                  <span className="font-semibold">Human-Centric Design:</span> Solutions built for
                  real users, not just technology.
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </span>
                <div>
                  <span className="font-semibold">Security & Privacy:</span> Enterprise-grade
                  protection for your data and users.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h4 className="text-2xl font-semibold mb-2 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Ready to transform your business with AI?
          </h4>
          <p className="text-lg text-gray-300 mb-6">
            Contact us for a free consultation or try our onboarding to see how Eventus can help you
            automate, analyze, and accelerate your growth.
          </p>
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold px-8 py-3"
            onClick={handleGetStarted}
          >
            Get Started with Eventus
          </Button>
        </motion.div>
      </section>

      {/* Sophisticated Footer */}
      <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 px-4 md:px-20 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <span className="text-2xl font-bold text-indigo-400">Eventus</span>
            <p className="mt-3 text-gray-400 text-sm">
              AI Automation & Web Solutions for the Future.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-indigo-400" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 1.997 1.397 3.872 3.448 4.29a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a href="#" className="hover:text-pink-400" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg">Solutions</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-indigo-400">
                  AI Automation
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-pink-400">
                  Web Systems
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400">
                  Data Analytics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg">Contact</h5>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{' '}
                <a href="mailto:info@eventus.com" className="hover:text-indigo-400">
                  info@eventus.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+1234567890" className="hover:text-pink-400">
                  +1 234 567 890
                </a>
              </li>
              <li>Accra, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Eventus. All rights reserved.
        </div>
      </footer>

      {/* Scroll to top */}
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
