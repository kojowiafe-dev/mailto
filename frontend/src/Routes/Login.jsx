import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import AOS from 'aos';
import api from '../components/api';
import { GoogleLogin } from '@react-oauth/google';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

        <input type="text" placeholder='Username' className='border-b w-full p-3 rounded-md text-yellow-300' value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <div className='relative w-full'>
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' rows='4' className='border-b w-full p-3 rounded-md text-yellow-300' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash/> : <FaEye />}
          </button>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <button type='submit' className='bg-gray-50 hover:bg-gray-800 hover:text-yellow-300 text-gray-600 font-bold py-2 px-4 rounded-xl border-gray-600 border-1 my-2 cursor-pointer transition duration-200'>Login</button>
          <GoogleLogin
            theme='filled_blue'
            text='login_with'
            shape='pill'
            size='large'
            width='250'
            height='50'
            logo_alignment='right'
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <a href='#' className='text-gray-200 text-sm underline my-2'>Forgot Password?</a>
        <h4 className='text-gray-200'>Don't have an account? <Link to='/register' className='underline text-yellow-300'>Register</Link></h4>
    </form>
    <ToastContainer position='top-right' transition={Bounce} autoClose={2000} theme='dark' toastClassName={() => "bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in"} bodyClassName={() => "text-sm font-medium"}/>
    </div>
  )
}

export default Login