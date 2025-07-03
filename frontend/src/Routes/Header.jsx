import React from 'react';
import { Button } from '../components/ui/button';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-20 py-4 flex justify-between items-center bg-transparent backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white">Eventus</h1>
        <nav className="hidden md:flex space-x-8 text-sm text-white/90">
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? 'text-indigo-400 font-bold border-b-2 border-indigo-400 pb-1'
                : 'hover:text-white transition'
            }
          >
            Solutions
          </NavLink>
          <NavLink
            to="/industries"
            className={({ isActive }) =>
              isActive
                ? 'text-indigo-400 font-bold border-b-2 border-indigo-400 pb-1'
                : 'hover:text-white transition'
            }
          >
            Industries
          </NavLink>
          <NavLink
            to="/demo"
            className={({ isActive }) =>
              isActive
                ? 'text-indigo-400 font-bold border-b-2 border-indigo-400 pb-1'
                : 'hover:text-white transition'
            }
          >
            Demo
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-indigo-400 font-bold border-b-2 border-indigo-400 pb-1'
                : 'hover:text-white transition'
            }
          >
            Contact
          </NavLink>
        </nav>
        <Button size="sm" className="text-sm font-medium" onClick={handleGetStarted}>
          Get Started
        </Button>
      </header>
    </div>
  );
};

export default Header;
