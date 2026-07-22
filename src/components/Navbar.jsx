import React, { useState, useEffect } from 'react';

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
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === '/gallery' || id === 'gallery') {
      navigate('/gallery');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + (id === 'home' ? '' : '#' + id));
      return;
    }

    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#E0D3C3] font-navbar ${isScrolled
          ? 'py-2 shadow-sm border-b luxury-divider'
          : 'py-3 md:py-4'
          }`}
        style={{ fontFamily: '"Source Serif 4", serif' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={(e) => handleScrollTo(e, 'home')} role="button" tabIndex="0" aria-label="Go to home">
            <img src="/images/scm-logo.avif" alt="Sudarshan Crafts Museum Logo" className="h-10 w-auto object-contain" fetchPriority="high" loading="eager" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href.substring(1))}
                className="text-xs uppercase tracking-[0.2em] text-[#694125] hover:text-brand-bronze transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-bronze after:transition-all after:duration-300 hover:after:w-full font-bold font-navbar"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Logo (SACV) */}
          <div className="hidden lg:flex items-center space-x-3 text-right cursor-pointer" onClick={(e) => handleScrollTo(e, 'home')} role="button" tabIndex="0" aria-label="Go to home (Art & Crafts Village)">
            <img src="/images/sacv-logo.avif" alt="Sudarshan Arts and Crafts Village Logo" className="h-10 w-auto object-contain" fetchPriority="high" loading="eager" />
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-[#694125] hover:text-brand-bronze transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[1.25]" />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-brand-bg/98 backdrop-blur-lg flex flex-col justify-between p-8 md:p-16 lg:hidden"
        >
          {/* Header in Mobile Menu */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => handleScrollTo(e, 'home')} role="button" tabIndex="0" aria-label="Go to home">
              <img src="/images/scm-logo.avif" alt="Sudarshan Crafts Museum Logo" className="h-10 w-auto object-contain" fetchPriority="high" loading="eager" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#694125] hover:text-brand-bronze transition-colors border border-brand-bronze/10 rounded-full"
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
              <div
                key={link.name}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href.substring(1))}
                  className="text-3xl md:text-4xl font-navbar font-bold text-[#694125] hover:text-brand-bronze transition-colors duration-300 block py-1"
                >
                  {link.name}
                </a>
              </div>
            ))}

            <div
              className="pt-4 flex items-center space-x-3 cursor-pointer"
              onClick={(e) => handleScrollTo(e, 'home')}
              role="button"
              tabIndex="0"
              aria-label="Go to home (Art & Crafts Village)"
            >
              <img src="/images/sacv-logo.avif" alt="Sudarshan Arts and Crafts Village Logo" className="h-10 w-auto object-contain" fetchPriority="high" loading="eager" />
            </div>
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

        </div>
      )}
    </>
  );
}
