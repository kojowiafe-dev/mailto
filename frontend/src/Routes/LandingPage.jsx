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
    const handleScroll = (latest) => {
      const featuresSection = document.getElementById('features')
      const contactSection = document.getElementById('contact')

      if (contactSection && latest >= contactSection.offsetTop - 100) {
        setBackgroundColor('bg-white')
      } else if (featuresSection && latest >= featuresSection.offsetTop - 100) {
        setBackgroundColor('bg-black')
      } else {
        setBackgroundColor('bg-transparent')
      }
    }

    return scrollY.onChange(handleScroll)
  }, [scrollY])

  return (
    <motion.div 
      className={`flex-1 text-center p-4 py-12 scroll-smooth overflow-hidden transition-colors duration-300 ${backgroundColor} min-h-screen flex flex-col`}
    >
      <Hero />
      <div id='features'>
        <Features />
      </div>
      <Testimonials />
      <Pricing />
      <div id='contact'>
        <Contact backgroundColor={backgroundColor} />
      </div>
    </motion.div>
  )
}

export default LandingPage
