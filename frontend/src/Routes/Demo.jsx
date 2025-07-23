import React, { useRef } from 'react';
import { Button } from '../components/ui/button';
import { motion, useInView } from 'framer-motion';
// import Lottie from 'lottie-react';
import { Users, ThumbsUp, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

const StatCard = React.memo(function StatCard({ icon: Icon, value, label, inView, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-gray-900 rounded-xl p-6 shadow-md"
      ref={props.ref}
    >
      <Icon className={props.iconClass} />
      <p className="text-3xl font-semibold mt-4">{inView && value}</p>
      <p className="text-gray-400 mt-2">{label}</p>
    </motion.div>
  );
});

export default function AIDemoAndTestimonials() {
  const navigate = useNavigate();

  const usersRef = useRef(null);
  const thumbsRef = useRef(null);
  const growthRef = useRef(null);

  const usersInView = useInView(usersRef, { once: false, amount: 0.5 });
  const thumbsInView = useInView(thumbsRef, { once: false, amount: 0.5 });
  const growthInView = useInView(growthRef, { once: false, amount: 0.5 });

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
          <Button
            size="lg"
            className="text-lg font-semibold"
            onClick={() => navigate('/ai-mail-compose')}
          >
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
          <StatCard
            icon={Users}
            iconClass="text-indigo-500 w-8 h-8 mx-auto"
            value={<CountUp end={12000} duration={3} separator="," prefix="+" />}
            label="Users reached via automation"
            inView={usersInView}
            ref={usersRef}
          />
          <StatCard
            icon={ThumbsUp}
            iconClass="text-green-400 w-8 h-8 mx-auto"
            value={<CountUp end={96} duration={2} suffix="%" />}
            label="Customer satisfaction rate"
            inView={thumbsInView}
            ref={thumbsRef}
          />
          <StatCard
            icon={TrendingUp}
            iconClass="text-blue-400 w-8 h-8 mx-auto"
            value={<CountUp end={43} duration={2} suffix="%" prefix="+" />}
            label="Efficiency increase across clients"
            inView={growthInView}
            ref={growthRef}
          />
        </div>
      </div>
    </section>
  );
}
