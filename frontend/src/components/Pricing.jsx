import React, { useEffect } from 'react'
import AOS from 'aos';

const Pricing = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div className='p-3'>
        <section id='pricing' className='mb-20'>
          <h3 data-aos="fade-left" className='text-3xl font-bold text-amber-500 mb-6'>Pricing</h3>
          <div className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
            <div data-aos="fade-up" className='bg-gray-50 p-6 rounded-2xl shadow border-1 border-gray-600'>
              <h4 className='text-gray-700 text-xl font-bold mb-2'>Starter</h4>
              <p className='text-gray-600 text-2xl font-extrabold mb-4'>$29/mo</p>
              <ul className='space-y-2 text-gray-800'>
                <li>Basic Branding kit</li>
                <li>1 revision</li>
                <li>Email Support</li>
              </ul>
            </div>
            <div data-aos="fade-right" className='bg-gray-800 p-6 rounded-2xl shadow-lg'>
              <h4 className='text-gray-300 text-xl font-bold mb-2'>Pro</h4>
              <p className='text-amber-500 text-2xl font-extrabold mb-4'>$59/mo</p>
              <ul className='text-gray-50 space-y-2'>
                <li>Full branding suite</li>
                <li>3 revisions</li>
                <li>Priority support</li>
              </ul>
            </div>
            <div data-aos="fade-right" className='bg-gray-50 border-1 border-gray-600 p-6 rounded-2xl shadow text-gray-900'>
              <h4 className='text-gray-700 text-xl font-bold mb-2'>Enterprise</h4>
              <p className='text-gray-600 text-2xl font-extrabold mb-4'>Custom</p>
              <ul className='text-gray-800 space-y-2'>
                <li>Custom solutions</li>
                <li>Unlimited revisions</li>
                <li>Dedicated support</li>
              </ul>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Pricing