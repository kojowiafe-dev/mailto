import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import AOS from 'aos';
import api from '../components/api';
// import api from '../components/api';
import { } from 'recharts'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  return (
    <div className='p-3' data-aos="fade-up">
        <form onSubmit={async(e) => {
          e.preventDefault();
          if (!username || !password) {
            toast.error("Please fill out all the required fields", {
              style: {
                background: "#000",
                color: "#fff",
                transition: "all 0.3s ease-in-out"
              }
            })
            return;
          }
          try {
            const response = await api.post('/auth/login', { username, password }, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            
            console.log(response)

            toast.success(response.message || "Login successfully!", {
              style: {
                background: "#000"
              },
              progressClassName: "bg-gray-400",
            })
          } catch (error) {
            console.log(error);
            
            toast.error(error.message || "Login failed", {
              style: {
                background: "#000",
                color: "#fff",
              },
            })
          }
        }} action='' className='space-y-8 max-w-xl mx-auto bg-gray-900 p-6 rounded-2xl shadow flex flex-col items-center'>
        <h2 className='text-yellow-300 text-2xl'>Welcome Back</h2>

        <input type="text" placeholder='Username' className='w-full p-3 rounded-md text-yellow-300' value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <input type='password' placeholder='Password' rows='4' className='w-full p-3 rounded-md text-yellow-300' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type='submit' className='bg-gray-50 hover:bg-gray-800 hover:text-yellow-300 text-gray-600 font-bold py-2 px-4 rounded-xl border-gray-600 border-1 my-2 cursor-pointer transition duration-200'>Login</button>

        <a href='#' className='text-gray-200 text-sm underline my-2'>Forgot Password?</a>
        <h4 className='text-gray-200'>Don't have an account? <Link to='/register' className='underline text-yellow-300'>Register</Link></h4>
    </form>
    <ToastContainer position='top-right' transition={Bounce} autoClose={2000} theme='dark' toastClassName={() => "bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in"} bodyClassName={() => "text-sm font-medium"}/>
    </div>
  )
}

export default Login