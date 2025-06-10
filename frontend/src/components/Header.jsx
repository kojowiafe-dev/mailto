import React from 'react'
import UseWindowResize from './use-window-resize'
import { FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import Menu from './Menu'
import { motion } from 'framer-motion'

const Header = () => {

  return (
    <div className='sticky top-0 z-9999'>
      <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.2 }} className='pr-5 pl-5 p-6 flex justify-between items-center nav-color shadow-2xl text-gray-300 backdrop-blur-md'>
        <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.3 }} className='text-2xl font-bold button-color'>eventus</motion.h1>

        <motion.nav initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.3 }} className='space-x-3 flex justify-between items-center' >

          <FiLinkedin href="#features" className='button-color cursor-pointer hover:scale-125 transition duration-200' size={20} />
          <FiInstagram href="#testimonial" className='button-color cursor-pointer hover:scale-125 transition duration-200' size={20} />
          <FiTwitter href="#pricing" className='button-color cursor-pointer hover:scale-125 transition duration-200' size={20} />

        </motion.nav>
      </motion.header>
    </div>
  )
}

export default Header