import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { SparklesCore } from '../components/ui/spotlight'; // Optional: animated background
import { Spotlight } from '../components/ui/spotlight';
// import Lottie from 'lottie-react';
// import aiAnimation from "@/assets/lottie/ai-agent.json";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Header Navigation */}
      <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-20 py-4 flex justify-between items-center bg-black/60 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white">Eventus</h1>
        <nav className="hidden md:flex space-x-8 text-sm text-white/90">
          <a href="/features" className="hover:text-white transition">
            Solutions
          </a>
          <a href="/industries" className="hover:text-white transition">
            Industries
          </a>
          <a href="/demo" className="hover:text-white transition">
            Demo
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
        </nav>
        <Button size="sm" className="text-sm font-medium">
          Get Started
        </Button>
      </header>

      <Spotlight className="absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 h-full pt-16">
        {/* Left Content */}
        <div className="max-w-2xl space-y-6 text-center md:text-left">
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
            <Button size="lg" className="text-lg font-semibold">
              Get Started
            </Button>
            <Button variant="ghost" size="lg" className="text-lg">
              Explore Solutions
            </Button>
          </motion.div>
        </div>

        {/* Right Animation */}
        <div className="hidden md:block w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* <Lottie animationData={aiAnimation} loop autoplay className="w-full h-auto" /> */}
          </motion.div>
        </div>
      </div>

      {/* Optional: sparkles background */}
      <SparklesCore
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        className="absolute inset-0 z-0"
        particleDensity={60}
        particleColor="#ffffff"
      />
    </section>
  );
}
