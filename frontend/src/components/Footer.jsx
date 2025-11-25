import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';
import logo from '../assets/lostify-logo.jpg';

export default function Footer() {
  const [showContact, setShowContact] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-navy dark:bg-navy text-lightGray dark:text-lightGray mt-auto py-8 sm:py-12 border-t border-white/10 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <img
                src={logo}
                alt="Lostify Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <h3 className="text-base sm:text-lg font-heading font-bold text-accent mb-2">About</h3>
            <p className="text-lightGray/90 text-sm leading-relaxed">
              Lostify is a secure Lost & Found portal for the Scaler School of Technology community.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-base">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="text-lightGray/80 hover:text-accent transition-colors inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  onClick={scrollToTop}
                  className="text-lightGray/80 hover:text-accent transition-colors inline-block"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  onClick={scrollToTop}
                  className="text-lightGray/80 hover:text-accent transition-colors inline-block"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  onClick={scrollToTop}
                  className="text-lightGray/80 hover:text-accent transition-colors inline-block"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    scrollToTop();
                    setShowContact(true);
                  }}
                  className="text-lightGray/80 hover:text-accent transition-colors text-left"
                >
                  Feedback & Support
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-base">Disclaimer</h4>
            <p className="text-lightGray/80 text-sm leading-relaxed">
              This platform is a convenience project created for SST students.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-lightGray/60 text-sm mb-2">
            © {new Date().getFullYear()} Lostify. All rights reserved.
          </p>
          <p className="text-accent text-xs font-medium">
            Designed & Developed by Deepak and Kartik
          </p>
        </div>
      </div>
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </motion.footer>
  );
}
