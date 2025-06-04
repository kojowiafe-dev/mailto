import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useForm } from 'react-hook-form'
import AOS from 'aos';
import api from '../components/api';

const Register = () => {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmitForm = (data) => {
    console.log(data);
    
  }

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    

  return (
    <div className='p-3' data-aos="fade-up">
        <form onSubmit={async(e) => {
          e.preventDefault();
          if (!username || !email || !password) {
            toast.error("Please fill out all the required fields", {
              style: {
                background: "#000",
                color: "#fff",
                transition: "all 0.3s ease-in-out"
              }
            });
            return;
          }
          if (password.length > 0 && password.length < 8) {
            toast.error("Password too short", {
              style: {
                background: "#000",
                color: "#fff",
                transition: "all 0.3s ease-in-out"
              }
            })
          } else {
            try {
              const response = await api.post('/register', { username, email, password });
              toast.success("Registration successful", {
                  style: {
                    background: "#000",
                    color: "#fff",
                    transition: "all 0.3s ease-in-out"
                  }
              })
              navigate('/login')
              setUserName("");
              setEmail("");
              setPassword("");
              console.log(response.data);
              
            } catch (error) {
              if (error.response) {
                const status = error.response.status;
                const detail = error.response.data.detail;

                if (status === 400 && detail.includes("Username")) {
                  toast.error("User already exists! Login😊", {
                    style: {
                      background: "#000",
                      color: "#fff",
                      transition: "all 0.3s ease-in-out"
                    }
                  })
                } else if (status === 400 && detail.includes("Email")) {
                  toast.error("Email already registered!", {
                    style: {
                      background: "#000",
                      color: "#fff",
                    }
                  });
                } else {
                  toast.error("Registration failed😥", {
                    style: {
                      background: "#000",
                      color: "#fff",
                    }
                  })
                }
              } else {
                console.log("Unknown error: ", error);
                toast.error("Something went wrong", {
                  style: {
                    background: "#000",
                    color: "#fff",
                  }
                })
              }
            }
          }
        }} action='' className='space-y-8 max-w-xl mx-auto bg-gray-900 p-6 rounded-2xl shadow flex flex-col items-center'>
        <h2 className='text-yellow-300 text-2xl' onSubmit={handleSubmit(onSubmitForm)}>Welcome to eventus!</h2>
        
        <input {...register('username', { required: true, minLength: 0 })} type="text" placeholder='Username' className='w-full p-3 rounded-md text-yellow-300' value={username} onChange={(e) => setUserName(e.target.value)} />
    
        <input {...register('email', { required: true })} type="email" placeholder='Email' className='w-full p-3 rounded-md text-yellow-300' value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <input {...register('password', { required: true, minLength: 8 })} type='password' placeholder='Password' rows='4' className='w-full p-3 rounded-md text-yellow-300' value={password} onChange={(e) => setPassword(e.target.value)} />
        {
          errors.password && errors.password.type === 'minLength' ? toast.error('Password too short') : null
        }

        <button type='submit' className='bg-gray-50 hover:bg-gray-800 hover:text-yellow-300 text-gray-600 font-bold py-2 px-4 rounded-xl border-gray-600 border-1 my-2 cursor-pointer transition duration-200'>Register</button>

        {/* <a href='#' className='text-gray-200 text-sm underline my-2'>Forgot Password?</a> */}
        <h4 className='text-gray-200'>Already have an account? <Link to="/login" className='underline text-yellow-300'>Login</Link></h4>
    </form>
    <ToastContainer position='top-right' transition={Bounce} autoClose={2000} theme='dark' toastClassName={() => "bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in"} bodyClassName={() => "text-sm font-medium"}/>
    </div>
  )
}

export default Register