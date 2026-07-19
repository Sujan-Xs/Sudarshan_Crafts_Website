import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-brand-bg text-brand-charcoal pt-20 pb-12 border-t border-brand-bronze/20 relative overflow-hidden">

      {/* Decorative large brand mark watermark under lay */}
      <div className="absolute -bottom-16 -right-16 text-[12vw] font-serif font-black text-brand-charcoal/[0.012] select-none tracking-[0.25em] pointer-events-none uppercase">
        Sudarshan Crafts
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-brand-bronze/10">

          {/* Logo & Brand Statement Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 transition-transform duration-500 group-hover:scale-105 flex-shrink-0">
                <img src="/images/scm-logo.avif" alt="Sudarshan Crafts Museum Logo" className="w-full h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-serif font-light tracking-[0.15em] uppercase text-brand-charcoal leading-none">
                  Sudarshan Crafts
                </span>
                <span className="text-[10px] tracking-[0.25em] font-sans font-light uppercase text-brand-grey mt-1.5">
                  Museum
                </span>
              </div>
            </div>
            <p className="text-xs text-brand-grey font-light leading-relaxed">
              Preserving and creating the most exquisite traditional stone architectures and sculptures of Odisha.
            </p>
            <div className="flex space-x-6 text-[10px] tracking-[0.2em] uppercase font-light pt-2">
              <a href="#instagram" className="hover:text-brand-bronze transition-colors flex items-center">
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
              <a href="#facebook" className="hover:text-brand-bronze transition-colors flex items-center">
                <span>Facebook</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* SCM Contact Info */}
          <div className="lg:col-span-4 space-y-4 md:pl-10">
            <span className="text-[11px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Sudarshan Crafts Museum</span>
            <ul className="space-y-2 text-xs font-light text-brand-grey">
              <li><span className="block text-brand-charcoal/80">Station Road,</span></li>
              <li><span className="block text-brand-charcoal/80">Puri, Odisha,</span></li>
              <li><span className="block text-brand-charcoal/80">India-752 002</span></li>
              <li className="pt-2"><span className="block text-brand-charcoal/80">M: +91 94370 72474</span></li>
              <li>
                <a href="mailto:sudarshancrafts@gmail.com" className="hover:text-brand-bronze transition-colors text-brand-charcoal/80">
                  E-mail: sudarshancrafts@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* SACV Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Sudarshan Art & Crafts Village</span>
            <ul className="space-y-2 text-xs font-light text-brand-grey">
              <li><span className="block text-brand-charcoal/80">CB-5, Jayadev Vihar</span></li>
              <li><span className="block text-brand-charcoal/80"><b>Bhubaneswar</b>, Odisha,</span></li>
              <li><span className="block text-brand-charcoal/80">India-751 013</span></li>
              <li className="pt-2"><span className="block text-brand-charcoal/80">M: +91 94370 36161</span></li>
              <li>
                <a href="https://www.sudarshancrafts.com" target="_blank" rel="noreferrer" className="hover:text-brand-bronze transition-colors text-brand-charcoal/80">
                  www.sudarshancrafts.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Copyright Base */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-8 text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">

          <div className="flex flex-wrap gap-4 md:gap-8 order-2 md:order-1 mt-6 md:mt-0">
            <span>© 2026 Sudarshan Crafts. All rights reserved.</span>
            <a href="#privacy" className="hover:text-brand-bronze transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-brand-bronze transition-colors">Terms of Fine Art</a>
          </div>

          {/* Scroll to Top Circle button */}
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="w-10 h-10 border border-brand-bronze/20 hover:border-brand-bronze text-brand-charcoal hover:text-brand-bronze transition-all rounded-full flex items-center justify-center bg-brand-bg hover:-translate-y-1 shadow-sm order-1 md:order-2 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 stroke-[1.25]" />
          </a>

        </div>

      </div>
    </footer>
  );
}
