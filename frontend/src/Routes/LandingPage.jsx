import { useEffect } from 'react';
import Hero from './Hero';

export default function HeroSection() {
  useEffect(() => {
    // This effect runs once when the component mounts
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // You can also perform any other setup here if needed
  }, []);

  return (
    <section className="flex flex-col min-h-screen overflow-hidden scroll-smooth bg-black text-white">
      <Hero />
    </section>
  );
}
