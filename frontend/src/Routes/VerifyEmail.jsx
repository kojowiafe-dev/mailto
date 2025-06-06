import React, { useEffect, useState } from 'react'
import api from '../components/api';

const VerifyEmail = () => {

    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        if (token) {
            api.get(`/verify-email?token=${token}`).then(res => setMessage(res.data.message)).catch(err => setMessage(err.response?.data?.detail || "Verification failed"));
        } else {
            setMessage("No token provided");
        }
    }, [])
  return (
    <div>
      <h2>{message}</h2>
    </div>
  )
}

export default VerifyEmail
