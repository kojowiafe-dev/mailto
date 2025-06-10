import React, { useEffect, useRef, useState } from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import { Outlet, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { gsap } from 'gsap'

const LandingPage = () => {
  const textRef = useRef(null);
  const [linkClicked, setLinkClicked] = useState(false); // 👈 Track click state

  useEffect(() => {
    if (!linkClicked) {
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );

      gsap.to(textRef.current, {
        scale: 1.05,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [linkClicked]); // 👈 re-run GSAP only if not clicked

  const handleLinkClick = () => {
    setLinkClicked(true); // 👈 hide the link
  };

  return (
    <div>
      {/* <Header /> */}
      <div className='flex-1 text-center px-4 py-12'>
        <Hero />
        <Outlet />
        
        {!linkClicked && ( // 👈 show link only if not clicked
          <Link to="/index" className="mb-8 inline-block" onClick={handleLinkClick} ref={textRef}>
            <span
              className='cursor-pointer button-color text-base font-medium transition-all duration-500 tracking-wide'
            >
              Explore eventus ↓
            </span>
          </Link>
        )}
        
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default LandingPage
