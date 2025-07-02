import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export function Spotlight() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      animate={{
        background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.1), transparent 200px)`,
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
    ></motion.div>
  );
}

export function SparklesCore() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setScore((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mt-20 text-4xl font-bold text-yellow-400 animate-pulse">
      🌟 Sparkle Score: {score}%
    </div>
  );
}
