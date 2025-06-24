// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResetProvider from './context/ResetPasswordContext.jsx';

const CLIENT_ID = '90556896493-0h3c63u12aopg87ugr3jrbbtvv89m875.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ResetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ResetProvider>
  </GoogleOAuthProvider>
);
