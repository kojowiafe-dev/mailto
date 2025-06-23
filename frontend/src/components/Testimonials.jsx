import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = ({ backgroundColor }) => {
  const headerColor = backgroundColor === 'bg-gray-100' ? 'text-black/50' : 'text-white';
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      info: 'Eventus completely transformed our business presence online. Highly recommended!',
      name: 'Alex Johnson',
      position: 'CEO of TechWave',
    },
    {
      id: 2,
      info: "Our customers love the fresh look and feel. It's been a game changer for us.",
      name: 'Maria Lopez',
      position: 'Founder of Bloom & Co.',
    },
    {
      id: 3,
      info: 'The support team is fantastic and the platform is super intuitive.',
      name: 'Samuel Green',
      position: 'Product Manager at Nova',
    },
    {
      id: 4,
      info: 'We saw a 40% increase in engagement after switching to Eventus.',
      name: 'Priya Singh',
      position: 'Marketing Lead at Zenith',
    },
    {
      id: 5,
      info: 'Sleek, modern, and effective. Our brand has never looked better.',
      name: 'Liam Chen',
      position: 'Creative Director at PixelForge',
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = 0.5;

    const startScrolling = () => {
      intervalRef.current = setInterval(() => {
        if (!carousel || isHovered) return;

        carousel.scrollLeft += scrollAmount;
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }, 16); // ~60 FPS
    };

    startScrolling();

    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  return (
    <div className="p-4 relative">
      <section id="testimonials" className="mb-20">
        <h3 data-aos="fade-left" className={`text-3xl font-bold ${headerColor} mb-6`}>
          Testimonials
        </h3>
        <div className="relative max-w-6xl mx-auto">
          {/* Blur edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-24 z-20"
            style={{ background: 'linear-gradient(to right, rgba(24,24,27,1), rgba(24,24,27,0))' }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-24 z-20"
            style={{ background: 'linear-gradient(to left, rgba(24,24,27,1), rgba(24,24,27,0))' }}
          />

          {/* Carousel */}
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex space-x-6 overflow-x-hidden scroll-smooth py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {duplicatedTestimonials.map((data, idx) => (
              <div
                key={idx}
                className="min-w-[320px] max-w-xs bg-neutral-800 p-6 rounded-2xl shadow-md border border-neutral-700 flex-shrink-0 transform transition-transform duration-300 hover:scale-105"
                style={{ opacity: 0.95 }}
              >
                <p className="text-gray-300 italic text-lg">"{data.info}"</p>
                <p className="mt-4 font-bold text-sm text-gray-200">
                  - {data.name}, {data.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
