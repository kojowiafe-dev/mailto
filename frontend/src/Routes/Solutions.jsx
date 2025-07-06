import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { motion } from 'framer-motion';
import { LucideBot, LucideBrainCircuit, LucideChartBar, LucideCode2 } from 'lucide-react';
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield, Users } from 'lucide-react';

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
    <section className="w-full h-full">
      <div className="bg-red-950 text-white py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Why Choose <span className="text-indigo-500">Eventus</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white max-w-3xl mx-auto"
          >
            We combine AI innovation, intuitive software design, and data-driven strategies to
            deliver breakthrough outcomes across industries.
          </motion.p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ title, description, icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300 shadow-lg rounded-2xl p-6 text-left">
                  <CardHeader className="flex items-center gap-3">
                    {React.createElement(icon, { className: 'w-10 h-10 text-indigo-500' })}
                    <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-400 pt-2">{description}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        {/* <h2 className="text-2xl font-bold text-white mb-8">Why Choose Eventus?</h2> */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-300">Get your AI solutions up and running in record time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Enterprise Security</h3>
            <p className="text-gray-300">Bank-grade security for your most sensitive data</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
            <p className="text-gray-300">24/7 support from our team of AI specialists</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
