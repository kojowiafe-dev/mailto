import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function FinalCTAAndFooter() {
  return (
    <>
      {/* Final Call to Action */}
      <section className="w-full bg-gradient-to-br from-indigo-600 to-blue-800 text-white py-24 px-6 md:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Let’s Build the <span className="text-white underline">Future</span> Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/90 max-w-3xl mx-auto mb-8"
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
          <Button size="lg" className="text-lg font-semibold">
            Contact Us
          </Button>
          <Button variant="ghost" size="lg" className="text-lg text-white border-white border">
            Explore More
          </Button>
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
  );
}
