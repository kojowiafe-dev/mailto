import React from 'react'
import Header from './components/Header'
// import Features from './components/Features'
// import Hero from './components/Hero'
// import Testimonials from './components/Testimonials'
// import Pricing from './components/Pricing'
// import Contact from './components/Contact'
import Login from './Routes/Login'
import Register from './Routes/Register'
import { useRoutes } from 'react-router-dom'
import LandingPage from './Routes/LandingPage'
import NotFoundPage from './Routes/NotFoundPage'
import Footer from './components/Footer'
import Layout from './Routes/Layout'
import VerifyEmail from './Routes/VerifyEmail'
import Hero from './components/Hero'
import UseWindowResize from './components/use-window-resize'
import { motion } from 'framer-motion'


function CustomRoutes () {

  const element = useRoutes([
    // {
    //   path: '/home', element: <Hero />
    // },
    {
      path : '/', element : <LandingPage />,
      children : [
        // {path: 'home', element: <Hero />},
        {path : 'register', element : <Register />},
        {path : 'login', element : <Login />},
        {path : 'index', element : <Layout />},
      ]
    },
    {
      path: 'verify-email', element: <VerifyEmail />
    },
    {
      path : '*', element : <NotFoundPage />
    },
  ]);
  return element
}

const App = () => {

  const windowSize = UseWindowResize();
  return (
    <div className='min-h-screen flex flex-col bg-gray-300/55 text-gray-950'>
      <Header />
      <motion.h1 
        initial={{ opacity: 0, x: 100 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ type: 'spring', stiffness: 100 , damping: 10, delay: 0.7 }} 
        className='scale-150 font-bold text-gray-400/15 select-none z-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none' 
        style={{ 
          fontSize: windowSize.width < 800 ? '80px' : '180px',
          writingMode: windowSize.width < 800 ? 'vertical-rl' : 'horizontal-tb',
          textOrientation: windowSize.width < 800 ? 'mixed' : 'mixed'
        }}
      >
        EVENTUS
      </motion.h1>
      {/* <Hero /> */}
      {/* <Routes>
        <Route path='/home' element={<LandingPage />}>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='index' element={<Layout />}/>
        </Route>
      </Routes> */}
      <CustomRoutes />

      <Footer />
    </div>
  )
}

export default App