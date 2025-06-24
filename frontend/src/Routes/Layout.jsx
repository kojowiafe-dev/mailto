// import React, { useEffect, useState } from 'react'
// import Hero from '../components/Hero'
// import Features from '../components/Features'
// import Testimonials from '../components/Testimonials'
// import Pricing from '../components/Pricing'
// import Contact from '../components/Contact'
// import Register from './Register'
// import Menu from '../components/Menu'
// import { motion, useScroll } from 'framer-motion'

// const Layout = () => {
//   const { scrollY } = useScroll()
//   const [backgroundColor, setBackgroundColor] = useState('bg-transparent')

//   useEffect(() => {
//     return scrollY.onChange((latest) => {
//       // Get the Features section position
//       const featuresSection = document.getElementById('features')
//       if (featuresSection) {
//         const featuresTop = featuresSection.offsetTop
//         if (latest >= featuresTop - 100) {
//           setBackgroundColor('bg-gray-900')
//         } else {
//           setBackgroundColor('bg-transparent')
//         }
//       }
//     })
//   }, [scrollY])

//   return (
//     <motion.div
//       className={`flex-1 text-center p-4 py-12 scroll-smooth overflow-hidden transition-colors duration-300 ${backgroundColor} min-h-screen flex flex-col`}
//     >
//         {/* <Hero /> */}
//         <div id="features">
//           <Features />
//         </div>
//         <Testimonials />
//         {/* <Menu /> */}
//         <Pricing />
//         <Contact />
//         {/* <Register /> */}
//     </motion.div>
//   )
// }

// export default Layout
