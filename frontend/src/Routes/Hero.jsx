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
      className="min-h-screen flex flex-col scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 overflow-y-auto pt-10"
    >
      <Meteors number={30} />
      {/* Hero Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 flex-1 pb-20">
        <div className="max-w-2xl space-y-6 text-center md:text-left" data-aos="fade-right">
          <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            viewport={{ once: true, amount: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
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
            <InteractiveHoverButton
              size="lg"
              className="text-lg font-semibold text-black"
              onClick={handleGetStarted}
            >
              Get Started
            </InteractiveHoverButton>
            <InteractiveHoverButton
              variant="ghost"
              size="lg"
              className="text-lg text-black"
              featsouresfeatsoures
              onClick={() => navigate('/solutions')}
            >
              Explore Solutions
            </InteractiveHoverButton>
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
          <InteractiveHoverButton
            size="lg"
            className="bg-white text-black text-lg font-semibold px-8 py-3"
            onClick={handleGetStarted}
          >
            Get Started with Eventus
          </InteractiveHoverButton>
        </motion.div>
      </section>

      <MarqueeDemo />

      {/* Sophisticated Footer */}
      {/* <Footer /> */}
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
