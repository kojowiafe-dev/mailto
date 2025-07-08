import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import { MarqueeDemo } from './ReviewCard';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { Meteors } from '@/components/magicui/meteors';
import { Globe } from '@/components/magicui/globe';

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
      className="min-h-screen flex flex-col scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 overflow-y-auto overflow-x-hidden pt-4 sm:pt-6"
    >
      <Meteors number={30} />

      {/* Hero Header */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 flex-1 pb-8 lg:pb-10 gap-8 lg:gap-0">
        <div
          className="w-full max-w-2xl space-y-4 sm:space-y-6 text-center lg:text-left"
          data-aos="fade-right"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            viewport={{ once: true, amount: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            <motion.span
              initial={{ color: '#fff' }}
              whileInView={{ color: '#6366f1' }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-indigo-500"
            >
              Build the Future
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className=""
            >
              with
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.7, type: 'spring', bounce: 0.4 }}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
            >
              AI-Powered Automation Agents
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 px-2 sm:px-0"
          >
            Eventus designs intelligent agents, web systems, and data-driven solutions that drive
            performance, unlock insights, and reimagine what's possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0"
          >
            <InteractiveHoverButton
              size="lg"
              className="text-base sm:text-lg font-semibold text-black w-full sm:w-auto"
              onClick={handleGetStarted}
            >
              Get Started
            </InteractiveHoverButton>
            <InteractiveHoverButton
              variant="ghost"
              size="lg"
              className="text-base sm:text-lg text-black w-full sm:w-auto"
              onClick={() => navigate('/solutions')}
            >
              Explore Solutions
            </InteractiveHoverButton>
          </motion.div>
        </div>

        <div
          className="w-full flex justify-center lg:block lg:w-full max-w-sm sm:max-w-md lg:max-w-xl mt-6 lg:mt-0"
          data-aos="fade-left"
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative flex w-full max-w-xs sm:max-w-md lg:max-w-lg items-center justify-center overflow-hidden rounded-lg px-2 sm:px-4 lg:px-10 xl:px-40 pb-6 sm:pb-10 pt-4 sm:pt-8 lg:pb-40 lg:pt-8">
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Globe
              </span>
              <Globe className="top-16 sm:top-20 lg:top-28" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="bg-white text-black py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto text-center space-y-4 sm:space-y-6" data-aos="zoom-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 px-2">
            Why Choose Eventus?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
            Eventus empowers your business with next-generation AI automation, robust web systems,
            and actionable analytics. Our solutions are designed to scale, adapt, and deliver
            measurable results for organizations of all sizes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            <div
              className="rounded-xl shadow-lg p-4 sm:p-6 bg-gray-50 border border-gray-200 mx-2 sm:mx-0"
              data-aos="fade-up"
            >
              <h3 className="font-semibold text-lg sm:text-xl mb-2 text-purple-700">
                AI Automation
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Automate repetitive tasks, streamline workflows, and boost productivity with
                intelligent agents tailored to your needs.
              </p>
            </div>
            <div
              className="rounded-xl shadow-lg p-4 sm:p-6 bg-gray-50 border border-gray-200 mx-2 sm:mx-0"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="font-semibold text-lg sm:text-xl mb-2 text-pink-600">Web Systems</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Modern, secure, and scalable web platforms that power your digital transformation
                and customer engagement.
              </p>
            </div>
            <div
              className="rounded-xl shadow-lg p-4 sm:p-6 bg-gray-50 border border-gray-200 mx-2 sm:mx-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="font-semibold text-lg sm:text-xl mb-2 text-blue-600">
                Data Analytics
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Unlock insights from your data to drive smarter decisions and uncover new
                opportunities for growth.
              </p>
            </div>
          </div>

          {/* Guarantee stats section */}
          <div
            className="mt-8 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
            data-aos="zoom-in"
          >
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="font-bold text-purple-700 text-xl sm:text-2xl">99.9%</span>
              <span className="text-sm sm:text-base text-gray-700">Uptime Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="font-bold text-pink-600 text-xl sm:text-2xl">24/7</span>
              <span className="text-sm sm:text-base text-gray-700">Support</span>
            </div>
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="font-bold text-blue-600 text-xl sm:text-2xl">1000+</span>
              <span className="text-sm sm:text-base text-gray-700">Projects Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* More Content Section */}
      <section className="bg-black text-white py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start"
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
            className="w-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-indigo-400">AI Use Cases</h3>
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-200">
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2"
              >
                <span className="text-indigo-400 mt-1">•</span>
                <span>Automated Email & Workflow Management</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-2"
              >
                <span className="text-indigo-400 mt-1">•</span>
                <span>Smart Data Extraction & Document Processing</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-2"
              >
                <span className="text-indigo-400 mt-1">•</span>
                <span>Conversational AI for Customer Support</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-2"
              >
                <span className="text-indigo-400 mt-1">•</span>
                <span>Predictive Analytics for Business Insights</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-2"
              >
                <span className="text-indigo-400 mt-1">•</span>
                <span>Custom AI Integrations for Your Stack</span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-pink-400">
              What Sets Us Apart?
            </h3>
            <div className="space-y-4 sm:space-y-4">
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                  1
                </span>
                <div className="text-sm sm:text-base">
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
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                  2
                </span>
                <div className="text-sm sm:text-base">
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
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                  3
                </span>
                <div className="text-sm sm:text-base">
                  <span className="font-semibold">Security & Privacy:</span> Enterprise-grade
                  protection for your data and users.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 max-w-4xl mx-auto text-center px-2 sm:px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h4 className="text-xl sm:text-2xl font-semibold mb-2 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Ready to transform your business with AI?
          </h4>
          <p className="text-base sm:text-lg text-gray-300 mb-6 px-2">
            Contact us for a free consultation or try our onboarding to see how Eventus can help you
            automate, analyze, and accelerate your growth.
          </p>
          <InteractiveHoverButton
            size="lg"
            className="bg-white text-black text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 w-full sm:w-auto"
            onClick={handleGetStarted}
          >
            Get Started with Eventus
          </InteractiveHoverButton>
        </motion.div>
      </section>

      <MarqueeDemo />

      {/* Sophisticated Footer */}
      {/* <Footer /> */}

      {/* Scroll to top - Mobile optimized */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-indigo-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-indigo-700 z-50 text-sm sm:text-base"
      >
        ↑
      </button>
    </div>
  );
};

export default Hero;
