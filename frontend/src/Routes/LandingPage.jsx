import { useEffect } from 'react';
import Hero from './Hero';
import { Toaster } from 'sonner';
import { Spotlight } from '../components/ui/spotlight';
import Header from './Header';
import Footer from './Footer';

export default function HeroSection() {
  useEffect(() => {
    // This effect runs once when the component mounts
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // You can also perform any other setup here if needed
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-visible">
      <Toaster position="top-center" richColors />
      <Spotlight className="absolute inset-0 z-0" />
      <Header />
      <section className="flex flex-col min-h-screen overflow-hidden scroll-smooth bg-black text-white">
        <Hero />
      </section>
      <Footer />
    </div>
  );
}
