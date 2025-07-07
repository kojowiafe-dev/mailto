import React from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent bg-opacity-80 backdrop-blur-md shadow-md">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4 text-white">
        <div className="text-2xl font-bold text-indigo-500">Eventus</div>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="text-indigo-400 border-b-2 border-indigo-400"
              className="cursor-pointer transition-colors hover:text-indigo-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="features"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="text-indigo-400 border-b-2 border-indigo-400"
              className="cursor-pointer transition-colors hover:text-indigo-300"
            >
              Features
            </Link>
          </li>
        </ul>
        <div className="md:hidden">{/* Add mobile menu toggle here if needed */}</div>
      </nav>
    </header>
  );
};

export default Header;
