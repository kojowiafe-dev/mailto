import { SparklesCore } from '../components/ui/spotlight';
import { Spotlight } from '../components/ui/spotlight';
import Hero from './Hero';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">
      <Spotlight className="absolute inset-0 z-0" />
      <Hero />

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
