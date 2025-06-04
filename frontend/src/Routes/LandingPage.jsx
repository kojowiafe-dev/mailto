import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import { Outlet, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-300/55 text-gray-950'>
        {/* <Layout /> */}
        <Header/>
        <div className='flex-1 text-center pz-4 py-12'>
            <Hero />
            <Outlet />
            <Link to="/index" className="text-gray-500 underline mb-8 block">Explore eventus</Link>
        </div>
        <Footer/>
        
    </div>
  )
}

export default LandingPage