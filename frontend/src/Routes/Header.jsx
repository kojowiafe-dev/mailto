import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-20 py-4 flex justify-between items-center bg-transparent backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white">Eventus</h1>
        <nav className="hidden md:flex space-x-8 text-sm text-white/90">
          <Link to="/features" className="hover:text-white transition">
            Solutions
          </Link>
          <Link to="/industries" className="hover:text-white transition">
            Industries
          </Link>
          <Link to="/demo" className="hover:text-white transition">
            Demo
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </nav>
        <Button size="sm" className="text-sm font-medium">
          Get Started
        </Button>
      </header>
    </div>
  );
};

export default Header;
