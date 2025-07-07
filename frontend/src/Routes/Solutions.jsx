// Solutions.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { motion } from 'framer-motion';
import {
  LucideBot,
  LucideBrainCircuit,
  LucideChartBar,
  LucideCode2,
  Zap,
  Shield,
  Users,
} from 'lucide-react';

const features = [
  {
    title: 'Autonomous AI Agents',
    description:
      'Deploy intelligent, conversational agents that automate workflows, handle tasks, and make decisions in real-time.',
    icon: LucideBot,
  },
  {
    title: 'Machine Learning Models',
    description:
      'Leverage predictive modeling, NLP, and deep learning to forecast trends and drive innovation.',
    icon: LucideBrainCircuit,
  },
  {
    title: 'Data Analytics',
    description:
      'Gain actionable insights through advanced analytics, dashboards, and decision intelligence.',
    icon: LucideChartBar,
  },
  {
    title: 'Custom Web Solutions',
    description:
      'Build scalable, elegant platforms tailored to your business needs—from MVPs to enterprise-grade apps.',
    icon: LucideCode2,
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="w-full min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white py-24 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-white"
        >
          Why Choose <span className="text-blue-600">Eventus</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg max-w-3xl mx-auto text-gray-300"
        >
          We combine AI innovation, intuitive software design, and data-driven strategies to deliver
          breakthrough outcomes across industries.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card className="bg-gray-900 text-white transition-colors duration-300 shadow-lg rounded-2xl p-6 text-left border border-gray-800">
                <CardHeader className="flex items-center gap-3">
                  {React.createElement(icon, { className: 'w-10 h-10 text-indigo-500' })}
                  <CardTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300 pt-2">{description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-125 duration-300">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-400">Get your AI solutions up and running in record time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-125 duration-300">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-white mb-2">
              Enterprise Security
            </h3>
            <p className="text-gray-400">Bank-grade security for your most sensitive data</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-125 duration-300">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-white mb-2">
              Expert Support
            </h3>
            <p className="text-gray-400">24/7 support from our team of AI specialists</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// bg-gradient-to-r from-purple-600 to-pink-500
