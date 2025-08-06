import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import React from 'react';
import {
  LucideBanknote,
  LucideHospital,
  LucideGraduationCap,
  LucideShoppingCart,
  LucidePlane,
  LucideShieldCheck,
} from 'lucide-react';

const industries = [
  {
    title: 'Finance',
    description:
      'Automate fraud detection, optimize lending, and deliver personalized financial insights.',
    icon: LucideBanknote,
  },
  {
    title: 'Healthcare',
    description: 'AI-powered diagnostics, patient engagement tools, and predictive care workflows.',
    icon: LucideHospital,
  },
  {
    title: 'Education',
    description:
      'Build smart learning platforms, automate grading, and improve student outcomes with ML.',
    icon: LucideGraduationCap,
  },
  {
    title: 'E-commerce',
    description:
      'Personalize product recommendations, automate support, and optimize inventory management.',
    icon: LucideShoppingCart,
  },
  {
    title: 'Travel & Hospitality',
    description:
      'Intelligent booking systems, sentiment analysis, and AI concierges for guest engagement.',
    icon: LucidePlane,
  },
  {
    title: 'Security',
    description: 'Real-time threat detection, smart surveillance, and AI-enhanced cybersecurity.',
    icon: LucideShieldCheck,
  },
];

const IndustryCard = React.memo(function IndustryCard({ title, description, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300 shadow-md rounded-2xl p-6 text-left">
        <CardHeader className="flex items-center gap-3">
          {React.createElement(icon, { className: 'w-8 h-8 text-blue-500' })}
          <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-400 pt-2">{description}</CardContent>
      </Card>
    </motion.div>
  );
});

export default function IndustriesSection() {
  return (
    <section className="w-full bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Solutions Built for <span className="text-blue-500">Your Industry</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-white max-w-3xl mx-auto"
        >
          Eventus delivers tailored, AI-powered solutions for sectors where performance, precision,
          and personalization matter.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <IndustryCard key={industry.title} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
