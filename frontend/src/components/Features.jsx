import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import {gsap, ScrollTrigger} from 'gsap'

const Features = ({ backgroundColor }) => {
  console.log('Features backgroundColor:', backgroundColor); // Debug log

  const headerColor = backgroundColor === 'bg-transparent' ? 'text-black' : 'text-white';
  console.log('headerColor:', headerColor); // Debug log

  useEffect(() => {
    AOS.init({duration: 1000})

  }, [])
  return (
    <div className='p-3 scroll-mt-24 relative z-0'>
        <section id='features' className='mb-20 pt-10'>
          <h3 data-aos="fade-left" className={`text-3xl font-bold ${headerColor} mb-6`}>Features</h3>
          <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
            <div data-aos="fade-up" className='bg-gray-200 p-6 rounded-2xl shadow'>
              <h4 className='text-color text-xl font-semibold mb-2'>Bold Design</h4>
              <p className='text-gray-500'>Eye-catching layouts that command attention and elevate your brand image.</p>
            </div>
            <div data-aos="fade-right" className='nav-color p-6 rounded-2xl shadow border-1 button-color'>
              <h4 className='button-color text-xl font-semibold mb-2'>Custom Branding</h4>
              <p className='text-gray-50'>Tailored branding solutions to match your unique vision and voice.</p>
            </div>
            <div data-aos="fade-left" className='bg-gray-200 p-6 rounded-2xl shadow'>
              <h4 className='text-color text-xl font-semibold mb-2'>Marketing Tools</h4>
              <p className='text-gray-500'>Integrated tools to help you reach and grow your audience with ease.</p>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Features