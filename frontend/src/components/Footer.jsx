import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="nav-color backdrop-blur-md text-white px-6 py-10 md:px-20">
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
            <li><a href="#" className="hover:button-color">Home</a></li>
            <li><a href="#" className="hover:button-color">Services</a></li>
            <li><a href="#" className="hover:button-color">About</a></li>
            <li><a href="#" className="hover:button-color">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="button-color"><FaFacebookF /></a>
            <a href="#" className="button-color"><FaTwitter /></a>
            <a href="#" className="button-color"><FaLinkedinIn /></a>
            <a href="#" className="button-color"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Eventus. All rights reserved.
      </div>
    </footer>
  );
}
