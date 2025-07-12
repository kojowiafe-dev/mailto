import React from 'react';
import { Link } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { FlipText } from '@/components/magicui/flip-text';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

// export function FlipTextDemo() {
//   return (
//     <FlipText className="text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]">
//       Flip Text
//     </FlipText>
//   );
// }

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Set background color based on route
  let bgColor = 'bg-transparent';
  if (location.pathname === '/solutions') bgColor = 'bg-transparent';
  else if (location.pathname === '/') bgColor = 'bg-black/60';
  else if (location.pathname === '/industries') bgColor = 'bg-blue-950/80';
  else if (location.pathname === '/demo') bgColor = 'bg-indigo-950/80';
  else if (location.pathname === '/get-started')
    bgColor = 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
  else if (location.pathname === '/login' || location.pathname === '/register')
    bgColor = 'bg-black';
  else if (location.pathname === '/ai-mail-compose') bgColor = 'bg-transparent';
  // Add more as needed

  let buttonText = 'login';
  if (location.pathname === '/login') buttonText = 'Register';

  let textNavigate = '/login';
  if (buttonText === 'Register') textNavigate = '/register';
  return (
    <div
      className={`sticky top-0 z-50 ${bgColor} backdrop-blur-md shadow-md transition-colors duration-300`}
    >
      <header className="flex justify-between items-center px-6 md:px-20 py-4 bg-transparent text-white">
        <FlipText
          className="text-4xl text-white group-hover:text-indigo-500 font-bold -tracking-widest dark:text-white md:text-4xl md:leading-[5rem]"
          onClick={() => navigate('/')}
        >
          Eventus
        </FlipText>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li>
            <Link
              onClick={() => navigate('/')}
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
          <li>
            <Link
              to="ai-mail-compose"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="text-indigo-400 border-b-2 border-indigo-400"
              className="cursor-pointer transition-colors hover:text-indigo-300"
            >
              Demo
            </Link>
          </li>
        </ul>
        <InteractiveHoverButton
          className="font-semibold text-black"
          onClick={() => navigate(`${textNavigate}`)}
        >
          {buttonText}
        </InteractiveHoverButton>
        <div className="md:hidden">{/* Add mobile menu toggle here if needed */}</div>
      </header>
    </div>
  );
};

export default Header;
