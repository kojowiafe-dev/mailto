import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = ({ backgroundColor }) => {
  const headerColor = backgroundColor === 'bg-gray-100' ? 'text-black/50' : 'text-white';
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const modalRef = useRef(null); // ref for modal content

  const testimonials = [
    {
      id: 1,
      info: 'Eventus completely transformed our business presence online. Highly recommended!',
      name: 'Alex Johnson',
      position: 'CEO of TechWave',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
    },
    {
      id: 2,
      info: "Our customers love the fresh look and feel. It's been a game changer for us.",
      name: 'Maria Lopez',
      position: 'Founder of Bloom & Co.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
    },
    {
      id: 3,
      info: 'The support team is fantastic and the platform is super intuitive.',
      name: 'Samuel Green',
      position: 'Product Manager at Nova',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      rating: 5,
    },
    {
      id: 4,
      info: 'We saw a 40% increase in engagement after switching to Eventus.',
      name: 'Priya Singh',
      position: 'Marketing Lead at Zenith',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 4,
    },
    {
      id: 5,
      info: 'Sleek, modern, and effective. Our brand has never looked better.',
      name: 'Liam Chen',
      position: 'Creative Director at PixelForge',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = 2.0;

    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startScrolling = () => {
      intervalRef.current = setInterval(() => {
        if (!carousel || isHovered) return;
        carousel.scrollLeft += scrollAmount;
        // Calculate the width of one set of testimonials
        const singleSetWidth = carousel.scrollWidth / 2;
        if (carousel.scrollLeft >= singleSetWidth) {
          // Reset to the equivalent position in the first set for seamless looping
          carousel.scrollLeft -= singleSetWidth;
        }
      }, 16);
    };

    startScrolling();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActiveTestimonial(null);
      }
    };

    if (activeTestimonial) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeTestimonial]);

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < count ? 'text-yellow-400' : 'text-gray-600'} />
    ));

  return (
    <div className="p-4 relative">
      <section id="testimonials" className="mb-20">
        <h3 data-aos="fade-left" className={`text-3xl font-bold ${headerColor} mb-6`}>
          Testimonials
        </h3>
        <div className="relative max-w-6xl mx-auto">
          {/* Transparent edge blur */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-5 md:w-28 z-20 bg-gradient-to-r from-neutral-900 via-transparent to-transparent backdrop-blur-sm" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-5 md:w-28 z-20 bg-gradient-to-l from-neutral-900 via-transparent to-transparent backdrop-blur-sm" />

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
                onClick={() => setActiveTestimonial(data)}
                className="min-w-[320px] max-w-xs bg-neutral-800 p-6 rounded-2xl shadow-md border border-neutral-700 flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
                style={{ opacity: 0.95 }}
              >
                <p className="text-gray-300 italic text-lg mb-3 line-clamp-3">"{data.info}"</p>
                <div className="flex space-x-1 mb-2">{renderStars(data.rating)}</div>
                <div className="flex items-center space-x-3 mt-2">
                  <img
                    src={data.avatar}
                    alt={data.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-100">{data.name}</p>
                    <p className="text-xs text-gray-400">{data.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeTestimonial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-neutral-900 max-w-md w-full rounded-2xl p-6 relative text-white shadow-xl border border-gray-700"
              >
                <button
                  onClick={() => setActiveTestimonial(null)}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-400 text-2xl"
                >
                  &times;
                </button>
                <div className="flex items-center mb-4 space-x-4">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-12 h-12 rounded-full border border-gray-500"
                  />
                  <div>
                    <p className="font-bold text-lg">{activeTestimonial.name}</p>
                    <p className="text-sm text-gray-400">{activeTestimonial.position}</p>
                    <div className="flex mt-1">{renderStars(activeTestimonial.rating)}</div>
                  </div>
                </div>
                <p className="italic text-gray-300 leading-relaxed">"{activeTestimonial.info}"</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Testimonials;
