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


function CustomRoutes () {

  const element = useRoutes([
    {
      path : '/', element : <LandingPage />,
      children : [
        {path : 'register', element : <Register />},
        {path : 'login', element : <Login />},
        {path : 'index', element : <Layout />}
      ]
    },
    {
      path : '*', element : <NotFoundPage />
    },
  ]);
  return element
}

const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path='/home' element={<LandingPage />}>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='index' element={<Layout />}/>
        </Route>
      </Routes> */}
      <CustomRoutes />

    </div>
  )
}

export default App