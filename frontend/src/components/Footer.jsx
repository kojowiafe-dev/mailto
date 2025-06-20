import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="nav-color backdrop-blur-md text-white px-6 py-10 md:px-20 sticky mb-0">
      <div className="grid md:grid-cols-3 gap-10 pt-6 border-t border-gray-700">
        {/* Branding */}
        <div>
          <h1 className="text-3xl font-extrabold button-color">eventus</h1>
          <p className="mt-4 text-gray-400">
            Elevating businesses with bold, vibrant branding that leaves a lasting impression.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:button-color">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:button-color">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:button-color">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:button-color">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="inline-block p-2">
            <marquee behavior="" direction="">
              <ul className="flex space-x-4 text-2xl">
                <li className="button-color cursor-pointer hover:scale-125 transition duration-200">
                  <FaFacebookF />
                </li>
                <li className="button-color cursor-pointer hover:scale-125 transition duration-200">
                  <FaTwitter />
                </li>
                <li className="button-color cursor-pointer hover:scale-125 transition duration-200">
                  <FaLinkedinIn />
                </li>
                <li className="button-color cursor-pointer hover:scale-125 transition duration-200">
                  <FaInstagram />
                </li>
              </ul>
            </marquee>
            {/* <a
              href="#"
              className="button-color cursor-pointer hover:scale-125 transition duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="button-color cursor-pointer hover:scale-125 transition duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="button-color cursor-pointer hover:scale-125 transition duration-200"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="button-color cursor-pointer hover:scale-125 transition duration-200"
            >
              <FaInstagram />
            </a> */}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Eventus. All rights reserved.
      </div>
    </footer>
  );
}
