import React, { useEffect, useRef } from 'react';
import AOS from 'aos';

const Testimonials = ({ backgroundColor }) => {
  const headerColor = backgroundColor === 'bg-gray-100' ? 'text-black/50' : 'text-white';

  const Testimony = [
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

  const carouselRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Infinite auto-scroll effect
  useEffect(() => {
    const carousel = carouselRef.current;
    let animationFrame;
    let scrollAmount = 0.5; // speed

    function scroll() {
      if (carousel) {
        carousel.scrollLeft += scrollAmount;
        // Loop back to start for infinite effect
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    }
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate testimonials for seamless infinite scroll
  const testimonialsToShow = [...Testimony, ...Testimony];

  return (
    <div className="p-3 relative">
      <section id="testimonials" className="mb-20">
        <h3 data-aos="fade-left" className={`text-3xl font-bold ${headerColor} mb-6`}>
          Testimonials
        </h3>
        <div className="relative max-w-4xl mx-auto">
          {/* Blur edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 z-20"
            style={{ background: 'linear-gradient(to right, #18181b 70%, transparent)' }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 z-20"
            style={{ background: 'linear-gradient(to left, #18181b 70%, transparent)' }}
          />
          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-hidden scroll-smooth py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {testimonialsToShow.map((data, idx) => (
              <div
                key={idx}
                className="min-w-[320px] max-w-xs nav-color p-6 rounded-2xl shadow border-1 button-color flex-shrink-0 transition-transform duration-300 hover:scale-105"
                style={{ opacity: 0.95 }}
              >
                <p className="text-gray-300 italic text-lg">"{data.info}"</p>
                <p className="mt-4 font-bold button-color text-base">
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
