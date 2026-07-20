import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + (id === 'home' ? '' : '#' + id));
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#C9BBA6] ${isScrolled
          ? 'py-2 shadow-sm border-b luxury-divider'
          : 'py-3 md:py-4'
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
            <div className="w-10 h-10 transition-transform duration-500 group-hover:scale-105 flex-shrink-0">
              <img src="/images/scm-logo.avif" alt="Sudarshan Crafts Museum Logo" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs md:text-sm font-serif font-light tracking-[0.2em] uppercase text-brand-charcoal transition-colors duration-300 group-hover:text-brand-bronze leading-none">
                Sudarshan Crafts
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-sans font-light uppercase text-brand-grey transition-colors duration-300 group-hover:text-brand-charcoal mt-1.5">
                Museum
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

          {/* Right Logo (SACV) */}
          <div className="hidden lg:flex items-center space-x-3 text-right">
            <div className="flex flex-col items-end justify-center">
              <span className="text-xs md:text-sm font-serif font-light tracking-[0.2em] uppercase text-brand-charcoal leading-none">
                Sudarshan Art &
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-sans font-light uppercase text-brand-grey mt-1.5">
                Crafts Village
              </span>
            </div>
            <div className="w-10 h-10 flex-shrink-0">
              <img src="/images/sacv-logo.avif" alt="Sudarshan Art & Crafts Village Logo" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
            </div>
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
                <div className="w-10 h-10 flex-shrink-0">
                  <img src="/images/scm-logo.avif" alt="Sudarshan Crafts Museum Logo" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-serif font-light tracking-[0.2em] uppercase text-brand-charcoal leading-none">
                    Sudarshan Crafts
                  </span>
                  <span className="text-[10px] tracking-[0.3em] font-sans font-light uppercase text-brand-grey mt-1.5">
                    Museum
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
                className="pt-4 flex items-center space-x-3"
              >
                <div className="w-10 h-10 flex-shrink-0">
                  <img src="/images/sacv-logo.avif" alt="Sudarshan Art & Crafts Village Logo" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-serif font-light tracking-[0.2em] uppercase text-brand-charcoal leading-none">
                    Sudarshan Art &
                  </span>
                  <span className="text-[10px] tracking-[0.3em] font-sans font-light uppercase text-brand-grey mt-1.5">
                    Crafts Village
                  </span>
                </div>
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
