import React from 'react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

const Footer = React.memo(function Footer() {
  return (
    <>
      {/* Final Call to Action */}
      <section className="w-full bg-white text-black py-24 px-6 md:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Let’s Build the <span className="text-black underline">Future</span> Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-black/90 max-w-3xl mx-auto mb-8"
        >
          Whether you're a startup or an enterprise, our AI-powered solutions are ready to transform
          your workflows. Partner with Eventus today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          <InteractiveHoverButton size="lg" className="text-lg font-semibold">
            Contact Us
          </InteractiveHoverButton>
          <InteractiveHoverButton variant="ghost" size="lg" className="text-lg text-black bg-white">
            Explore More
          </InteractiveHoverButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Eventus</h3>
            <p className="text-gray-400">
              Intelligent agents. Data-driven solutions. A smarter tomorrow.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Quick Links</h4>
            <ul className="text-gray-400 space-y-1">
              <li>
                <a href="#">Solutions</a>
              </li>
              <li>
                <a href="#">AI Agents</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:info@eventus.ai" className="text-gray-400 hover:text-white">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eventus. All rights reserved.
        </div>
      </footer>
    </>
    // <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 px-4 md:px-20 mt-auto border-t border-gray-800">
    //     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    //       <div>
    //         <span className="text-2xl font-bold text-indigo-400">Eventus</span>
    //         <p className="mt-3 text-gray-400 text-sm">
    //           AI Automation & Web Solutions for the Future.
    //         </p>
    //         <div className="flex gap-3 mt-4">
    //           <a href="#" className="hover:text-indigo-400" aria-label="Twitter">
    //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //               <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 1.997 1.397 3.872 3.448 4.29a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
    //             </svg>
    //           </a>
    //           <a href="#" className="hover:text-pink-400" aria-label="LinkedIn">
    //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
    //             </svg>
    //           </a>
    //           <a href="#" className="hover:text-blue-400" aria-label="GitHub">
    //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //               <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    //             </svg>
    //           </a>
    //         </div>
    //       </div>
    //       <div>
    //         <h5 className="font-semibold mb-3 text-lg">Solutions</h5>
    //         <ul className="space-y-2 text-sm">
    //           <li>
    //             <a href="#features" className="hover:text-indigo-400">
    //               AI Automation
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#features" className="hover:text-pink-400">
    //               Web Systems
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#features" className="hover:text-blue-400">
    //               Data Analytics
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h5 className="font-semibold mb-3 text-lg">Company</h5>
    //         <ul className="space-y-2 text-sm">
    //           <li>
    //             <a href="#" className="hover:text-indigo-400">
    //               About Us
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="hover:text-pink-400">
    //               Careers
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="hover:text-blue-400">
    //               Contact
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h5 className="font-semibold mb-3 text-lg">Contact</h5>
    //         <ul className="space-y-2 text-sm">
    //           <li>
    //             Email:{' '}
    //             <a href="mailto:info@eventus.com" className="hover:text-indigo-400">
    //               info@eventus.com
    //             </a>
    //           </li>
    //           <li>
    //             Phone:{' '}
    //             <a href="tel:+1234567890" className="hover:text-pink-400">
    //               +1 234 567 890
    //             </a>
    //           </li>
    //           <li>Accra, Ghana</li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
    //       &copy; {new Date().getFullYear()} Eventus. All rights reserved.
    //     </div>
    //   </footer>
  );
});

export default Footer;
