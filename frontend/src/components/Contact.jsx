import React, { useEffect, useState } from 'react'
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import AOS from 'aos';
import api from './api';

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
      AOS.init({ duration: 1000 })
    }, [])


  return (
    <div data-aos="fade-up">
        <section id='contact'>
          <h3 className='text-3xl font-bold text-color mb-6'>Contact Us</h3>

          <form onSubmit={async(e) => {
            e.preventDefault();
            if (!name || !email || !message) {
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
              const response = await api.post('/message', { name, email, message });
              if (response.status === 201) {
                toast.success("Message sent successfully", {
                  style: {
                    background: "#000",
                    color: "#fff",
                    transition: "all 0.3s ease-in-out"
                  }
                })
                setName("");
                setEmail("");
                setMessage("");
              } else {
                toast.error("Failed to send message", {
                  style: {
                    background: "#000",
                    color: "#fff",
                    transition: "all 0.3s ease-in-out"
                  }
                })
              }
            } catch (error) {
              console.error("Error sending message:", error);
              toast.error("An error occurred while sending the message", {
                style: {
                  background: "#000",
                  color: "#fff",
                  transition: "all 0.3s ease-in-out"
                }
              })
            }
          }} action="" className='max-w-xl mx-auto nav-color p-6 rounded-2xl shadow space-y-4 border-1 border-gray-600'>

            <input type="text" placeholder='Your Name' className='border-b w-full p-3 rounded-md button-color outline-0' value={name} onChange={(e) => setName(e.target.value)} />

            <input type="email" placeholder='Your Email' className='border-b w-full p-3 rounded-md button-color outline-0' value={email} onChange={(e) => setEmail(e.target.value)} />

            <textarea placeholder='Your Message' rows='4' className='border-b w-full p-3 rounded-md button-color outline-0' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

            <button type='submit' className='bg-button-color text-btn-color hover:bg-gray-800 font-bold py-2 px-4 rounded-xl border-gray-600 border-1 cursor-pointer'>Send Message</button>
          </form>
        </section>
        <ToastContainer position='top-right' transition={Bounce} autoClose={2000} theme='dark' toastClassName={() => "bg-slate-800 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-in"} bodyClassName={() => "text-sm font-medium"}/>
    </div>
  )
}

export default Contact