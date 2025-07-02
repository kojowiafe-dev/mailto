import React from 'react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
// import demoAnimation from '../assets/lottie/ai-demo.json';
import { Users, ThumbsUp, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AIDemoAndTestimonials() {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-950 text-white py-24 px-6 md:px-20 space-y-32">
      {/* AI Agent Demo Section */}
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          See Our <span className="text-indigo-500">AI Agents</span> in Action
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto"
        >
          From onboarding users to closing sales, Eventus AI agents are redefining real-time
          business automation. Preview our agent's capabilities below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl bg-black"
        >
          {/* <Lottie animationData={demoAnimation} loop autoplay className="w-full h-auto" /> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Button size="lg" className="text-lg font-semibold" onClick={() => navigate('/demo')}>
            Try a Live Demo
          </Button>
        </motion.div>
      </div>

      {/* Testimonials / Stats Section */}
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Trusted by <span className="text-blue-500">Innovators Worldwide</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-6 shadow-md"
          >
            <Users className="text-indigo-500 w-8 h-8 mx-auto" />
            <p className="text-3xl font-semibold mt-4">+12,000</p>
            <p className="text-gray-400 mt-2">Users reached via automation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 rounded-xl p-6 shadow-md"
          >
            <ThumbsUp className="text-green-400 w-8 h-8 mx-auto" />
            <p className="text-3xl font-semibold mt-4">96%</p>
            <p className="text-gray-400 mt-2">Customer satisfaction rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900 rounded-xl p-6 shadow-md"
          >
            <TrendingUp className="text-blue-400 w-8 h-8 mx-auto" />
            <p className="text-3xl font-semibold mt-4">+43%</p>
            <p className="text-gray-400 mt-2">Efficiency increase across clients</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
