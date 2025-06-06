import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import { motion } from "framer-motion";
import UseWindowResize from './use-window-resize';

const Hero = () => {

  useEffect(() => {
      AOS.init({duration: 1000})
      // AOS.refresh()
  }, [])

  const windowSize = UseWindowResize();
  const navigate = useNavigate();
  
  return (
    <div className='p-3 mt-10'>
        <section className='mb-10 relative'>
          
          <motion.h2 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.5 }} className='text-4xl md:text-6xl font-extrabold text-gray-800 mb-4'>
            Stand out with eventus
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.7 }} 
            className='scale-150 font-bold text-gray-400/15 select-none z-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none' 
            style={{ 
              fontSize: windowSize.width < 800 ? '80px' : '180px',
              writingMode: windowSize.width < 800 ? 'vertical-rl' : 'horizontal-tb',
              textOrientation: windowSize.width < 800 ? 'mixed' : 'mixed'
            }}
          >
            EVENTUS
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.6 }} className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8'>
            Elevate your business with vibrant, bold branding that leaves a lasting impression.
          </motion.p>

          <motion.button initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 1.2 }} onClick={() => navigate('/register')} className='bg-gray-50 hover:bg-gray-800 hover:text-yellow-300 text-gray-600 font-bold py-3 px-6 rounded-2xl shadow-md hover:transition duration-200 border-gray-600 border-1 cursor-pointer'>Get Started</motion.button>
        </section>
    </div>
  )
}

export default Hero