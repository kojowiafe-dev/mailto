import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import { motion, useScroll } from 'framer-motion'

const LandingPage = () => {

  const { scrollY } = useScroll()
  const [backgroundColor, setBackgroundColor] = useState('bg-transparent')

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Get the Features section position
      const featuresSection = document.getElementById('features')
      if (featuresSection) {
        const featuresTop = featuresSection.offsetTop
        if (latest >= featuresTop - 100) {
          setBackgroundColor('bg-black')
        } else {
          setBackgroundColor('bg-transparent')
        }
      }
    })
  }, [scrollY])

  return (
    <div>
      
      <motion.div className={`flex-1 text-center p-4 py-12 scroll-smooth overflow-hidden transition-colors duration-300 ${backgroundColor} min-h-screen flex flex-col`}>
        <Hero />
      
        <div id='features'>
          <Features />
        </div>
        
        <Testimonials />

        <Pricing />

        <Contact />
        
      </motion.div>
      {/* <Footer /> */}
    </div>
  )
}

export default LandingPage
