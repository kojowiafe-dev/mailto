import { useState } from 'react';
import api from '../components/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/forgot-password', { email });
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    
    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword;