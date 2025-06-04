import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Register from './Register'
import Menu from '../components/Menu'

const Layout = () => {
  
  return (
    <div className='flex-1 text-center pz-4 py-12 scroll-smooth overflow-hidden'>
        {/* <Hero /> */}
        <Features />
        <Testimonials />
        {/* <Menu /> */}
        <Pricing />
        <Contact />
        {/* <Register /> */}
    </div>
  )
}

export default Layout