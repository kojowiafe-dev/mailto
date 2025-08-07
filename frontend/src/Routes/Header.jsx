import React from "react";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { FlipText } from "@/components/magicui/flip-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const Header = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  // Set background color based on route
  let bgColor = "bg-transparent";
  if (location.pathname === "/solutions") bgColor = "bg-transparent";
  else if (location.pathname === "/") bgColor = "bg-black/60";
  else if (location.pathname === "/industries") bgColor = "bg-blue-950/80";
  else if (location.pathname === "/demo") bgColor = "bg-indigo-950/80";
  else if (location.pathname === "/get-started")
    bgColor = "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";
  else if (location.pathname === "/login" || location.pathname === "/register")
    bgColor = "bg-black";
  else if (location.pathname === "/ai-mail-compose") bgColor = "bg-transparent";
  // Add more as needed

  let buttonText = "login";
  if (location.pathname === "/login") buttonText = "Register";

  let textNavigate = "/login";
  if (buttonText === "Register") textNavigate = "/register";
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${bgColor} backdrop-blur-md shadow-md transition-colors duration-300 flex justify-between items-center px-4 md:px-20 py-3 text-white`}
    >
      <FlipText
        className="text-2xl md:text-4xl text-white group-hover:text-indigo-500 font-bold -tracking-widest dark:text-white md:leading-[5rem] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Eventus
      </FlipText>
      <ul className="flex items-center justify-around gap-6 text-sm font-medium">
        <li>
          <Link
            onClick={() => navigate("/")}
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
        className="font-semibold text-black px-4 py-2 text-xs md:text-base"
        onClick={() => navigate(`${textNavigate}`)}
      >
        {buttonText}
      </InteractiveHoverButton>
    </header>
  );
});

export default Header;
