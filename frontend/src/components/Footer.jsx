import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900/70 backdrop-blur-md text-white px-6 py-10 md:px-20">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <h1 className="text-3xl font-extrabold text-amber-500">eventus</h1>
          <p className="mt-4 text-gray-400">
            Elevating businesses with bold, vibrant branding that leaves a lasting impression.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-amber-500">Home</a></li>
            <li><a href="#" className="hover:text-amber-500">Services</a></li>
            <li><a href="#" className="hover:text-amber-500">About</a></li>
            <li><a href="#" className="hover:text-amber-500">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-pink-500 text-2xl">
            <a href="#" className="text-amber-500"><FaFacebookF /></a>
            <a href="#" className="text-amber-500"><FaTwitter /></a>
            <a href="#" className="text-amber-500"><FaLinkedinIn /></a>
            <a href="#" className="text-amber-500"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Eventus. All rights reserved.
      </div>
    </footer>
  );
}
