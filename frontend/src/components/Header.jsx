import React from 'react'
import UseWindowResize from './use-window-resize'
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Menu from './Menu'
import { motion } from 'framer-motion'

const Header = () => {

  // const handleClick = () => {
  //   return <Menu />
  // }

  // const windowSize = UseWindowResize();
  return (
    <div className='sticky top-0 z-9999'>
      <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.2 }} className='pr-5 pl-5 p-6 flex justify-between items-center bg-gray-900/70 shadow-lg text-gray-300 backdrop-blur-md'>
        <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.3 }} className='text-2xl font-bold text-yellow-300'>eventus</motion.h1>
        {/* <GiHamburgerMenu style={{display: windowSize.width < 800 ? 'block' : 'none'}} className='cursor-pointer'/> */}
        <motion.nav initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.3 }} className='space-x-3 flex justify-between items-center' >
          <FaLinkedin href="#features" className='text-yellow-300 cursor-pointer hover:scale-125 transition duration-200' size={27} />
          <FaInstagram href="#testimonial" className='text-yellow-300 cursor-pointer hover:scale-125 transition duration-200' size={27} />
          <FaTwitter href="#pricing" className='text-yellow-300 cursor-pointer hover:scale-125 transition duration-200' size={27} />
        </motion.nav>
      </motion.header>
    </div>
  )
}

export default Header