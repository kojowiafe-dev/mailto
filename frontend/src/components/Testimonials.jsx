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
          <h3 data-aos="fade-left" className='text-3xl font-bold text-btn-color mb-6'>Testimonials</h3>
          <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            {Testimony.map((data) => (
              <div key={data.id} data-aos={data.fade} className='nav-color p-6 rounded-2xl shadow border-1 button-color'>
                <p className='text-gray-300 italic'>"{data.info}"</p>
                <p className='mt-4 font-bold button-color'>- {data.name}, {data.position}</p>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default Testimonials