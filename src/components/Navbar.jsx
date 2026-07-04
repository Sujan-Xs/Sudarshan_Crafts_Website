import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Signature Pieces', href: '#signature' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#inspirations' },
    { name: 'Contact', href: '#inquire' },
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for sticky navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-brand-bg/95 backdrop-blur-md py-4 shadow-sm border-b luxury-divider' 
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Brand Logo & Name */}
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, 'home')}
            className="flex items-center space-x-3 group"
          >
            {/* Elegant Sacred Geometric Logo Icon */}
            <div className="w-9 h-9 text-brand-bronze transition-transform duration-500 group-hover:rotate-12">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="8" width="59.4" height="59.4" transform="rotate(45 50 8)" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
                <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="70" x2="50" y2="80" stroke="currentColor" strokeWidth="1" />
                <line x1="20" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="1" />
                <line x1="70" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif font-light tracking-[0.2em] uppercase text-brand-charcoal transition-colors duration-300 group-hover:text-brand-bronze leading-none">
                Sudarshan Crafts
              </span>
              <span className="text-[7px] tracking-[0.25em] font-sans font-light uppercase text-brand-grey transition-colors duration-300 group-hover:text-brand-charcoal mt-1">
                Sacred Stone Atelier
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href.substring(1))}
                className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/80 hover:text-brand-bronze transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-bronze after:transition-all after:duration-300 hover:after:w-full font-light"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Inquiry Action Button */}
          <div className="hidden lg:block">
            <a
              href="#inquire"
              onClick={(e) => handleScrollTo(e, 'inquire')}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-light text-brand-bronze border border-brand-bronze/30 px-6 py-2.5 hover:bg-brand-bronze hover:text-white transition-all duration-300 group"
            >
              <span>Acquire & Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-brand-charcoal hover:text-brand-bronze transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[1.25]" />
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-brand-bg/98 backdrop-blur-lg flex flex-col justify-between p-8 md:p-16 lg:hidden"
          >
            {/* Header in Mobile Menu */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 text-brand-bronze">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="8" width="59.4" height="59.4" transform="rotate(45 50 8)" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
                    <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-serif font-light tracking-[0.2em] uppercase text-brand-charcoal leading-none">
                    Sudarshan Crafts
                  </span>
                  <span className="text-[7px] tracking-[0.25em] font-sans font-light uppercase text-brand-grey mt-0.5">
                    Sacred Stone Atelier
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-brand-charcoal hover:text-brand-bronze transition-colors border border-brand-bronze/10 rounded-full"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6 stroke-[1.25]" />
              </button>
            </div>

            {/* Navigation links - vertical with large typography */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8 my-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase text-brand-grey/60 font-light border-b luxury-divider pb-2 w-1/4">
                Explore Menu
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  key={link.name}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href.substring(1))}
                    className="text-3xl md:text-4xl font-serif font-light text-brand-charcoal hover:text-brand-bronze transition-colors duration-300 block py-1"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: navLinks.length * 0.08 }}
                className="pt-4"
              >
                <a
                  href="#inquire"
                  onClick={(e) => handleScrollTo(e, 'inquire')}
                  className="inline-flex items-center space-x-2 text-sm uppercase tracking-[0.2em] text-brand-bronze border-b border-brand-bronze/40 pb-1 hover:border-brand-bronze transition-colors font-light"
                >
                  <span>Acquire & Inquire</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Footer in Mobile Menu */}
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 border-t luxury-divider pt-6 text-[10px] tracking-[0.25em] uppercase text-brand-grey font-light">
              <div>
                <span>Architectural & Fine Art</span>
              </div>
              <div className="flex space-x-6">
                <a href="#instagram" className="hover:text-brand-bronze transition-colors">Instagram</a>
                <a href="#pinterest" className="hover:text-brand-bronze transition-colors">Pinterest</a>
                <a href="#catalogue" className="hover:text-brand-bronze transition-colors">Catalogue</a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
