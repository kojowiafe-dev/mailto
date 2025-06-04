import React, { useEffect } from 'react'
import AOS from 'aos';

const Testimonials = () => {

  const Testimony = [
    {
      id: 1,
      info: "Eventus completely transformed our business presence online. Highly recommended!",
      name: "Alex Johnson",
      position: "CEO of TechWave",
      fade: "fade-up"
    },
    {
      id: 2,
      info: "Our customers love the fresh look and feel. It's been a game changer for us.",
      name: "Maria Lopez",
      position: "Founder of Bloom & Co.",
      fade: "fade-right"
    }
  ]

  useEffect(() => {
    AOS.init({duration: 1000})
  }, [])
  return (
    <div className='p-3'>
        <section id='testimonials' className='mb-20'>
          <h3 data-aos="fade-left" className='text-3xl font-bold text-gray-900 mb-6'>Testimonials</h3>
          <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            {Testimony.map((data) => (
              <div key={data.id} data-aos={data.fade} className='bg-gray-800 p-6 rounded-2xl shadow'>
                <p className='text-gray-300 italic'>"{data.info}"</p>
                <p className='mt-4 font-bold text-yellow-300'>- {data.name}, {data.position}</p>
              </div>
            ))}
            {/* <div data-aos="fade-up" className='bg-gray-800 p-6 rounded-2xl shadow'>
              <p className='text-gray-300 italic'>"Eventus completely transformed our business presence online. Highly recommended!"</p>
              <p className='mt-4 font-bold text-yellow-300'>- Alex Johnson, CEO of TechWave</p>
            </div>
            <div data-aos="fade-right" className='bg-gray-800 p-6 rounded-2xl shadow'>
              <p className='text-gray-300 italic'>"Our customers love the fresh look and feel. It's been a game changer for us."</p>
              <p className='mt-4 font-bold text-yellow-300'>- Maria Lopez, Founder of Bloom & Co.</p>
            </div> */}
          </div>
        </section>
    </div>
  )
}

export default Testimonials