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



          {/* SCM Contact Info */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 md:pl-10">
              <span className="text-[11px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Sudarshan Crafts Museum</span>
              <ul className="space-y-2 text-xs font-light text-brand-grey">
                <li><span className="block text-brand-charcoal/80">Station Road,</span></li>
                <li><span className="block text-brand-charcoal/80"><b>Puri</b>, Odisha,</span></li>
                <li><span className="block text-brand-charcoal/80">India-752 002</span></li>
                <li className="pt-2"><span className="block text-brand-charcoal/80">M: +91 94370 72474</span></li>
                <li>
                  <a href="mailto:sudarshancrafts@gmail.com" className="hover:text-brand-bronze transition-colors text-brand-charcoal/80">
                    E-mail: sudarshancrafts@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full h-40 md:h-full min-h-[160px] bg-brand-bronze/10 rounded overflow-hidden shadow-sm grayscale hover:grayscale-0 transition-all duration-500">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sudarshan%20Crafts%20Museum,%20Puri,%20Odisha+(Sudarshan%20Crafts%20Museum)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Sudarshan Crafts Museum Map"
              ></iframe>
            </div>
          </div>

          {/* SACV Contact Info */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 md:pl-10">
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
            <div className="w-full h-40 md:h-full min-h-[160px] bg-brand-bronze/10 rounded overflow-hidden shadow-sm grayscale hover:grayscale-0 transition-all duration-500">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sudarshan%20Art%20and%20Crafts%20Village,%20Bhubaneswar,%20Odisha+(Sudarshan%20Art%20and%20Crafts%20Village)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Sudarshan Art & Crafts Village Map"
              ></iframe>
            </div>
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
