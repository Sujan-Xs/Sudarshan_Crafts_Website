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
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center space-x-3 group">
              {/* Elegant Sacred Geometric Logo Icon */}
              <div className="w-8 h-8 text-brand-bronze transition-transform duration-500 group-hover:rotate-12">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="8" width="59.4" height="59.4" transform="rotate(45 50 8)" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
                  <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-light tracking-[0.15em] uppercase text-brand-charcoal leading-none">
                  Sudarshan Crafts
                </span>
                <span className="text-[7px] tracking-[0.25em] font-sans font-light uppercase text-brand-grey mt-1">
                  Sacred Stone Atelier
                </span>
              </div>
            </div>
            <p className="text-xs text-brand-grey font-light leading-relaxed">
              Crafting timeless stone sculptures for luxury interiors and architectural spaces.
            </p>
            <div className="flex space-x-6 text-[10px] tracking-[0.2em] uppercase font-light pt-2">
              <a href="#instagram" className="hover:text-brand-bronze transition-colors flex items-center">
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
              <a href="#pinterest" className="hover:text-brand-bronze transition-colors flex items-center">
                <span>Pinterest</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Directory Column 1: Navigation */}
          <div className="lg:col-span-2 lg:col-start-5 space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Directory</span>
            <ul className="space-y-2 text-xs font-light text-brand-grey">
              <li><a href="#home" className="hover:text-brand-bronze transition-colors">Home Landing</a></li>
              <li><a href="#collections" className="hover:text-brand-bronze transition-colors">Collections Grid</a></li>
              <li><a href="#craftsmanship" className="hover:text-brand-bronze transition-colors">Artisanship Story</a></li>
              <li><a href="#signature" className="hover:text-brand-bronze transition-colors">Signature Pieces</a></li>
              <li><a href="#about" className="hover:text-brand-bronze transition-colors">Atelier Credo</a></li>
              <li><a href="#inspirations" className="hover:text-brand-bronze transition-colors">Spatials Inspiration</a></li>
            </ul>
          </div>

          {/* Directory Column 2: Materials */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Stone Materials</span>
            <ul className="space-y-2 text-xs font-light text-brand-grey">
              <li><span className="block text-brand-charcoal/80">Makrana White Marble</span></li>
              <li><span className="block text-brand-charcoal/80">Carrara Statuario Marble</span></li>
              <li><span className="block text-brand-charcoal/80">Rajasthan Beige Sandstone</span></li>
              <li><span className="block text-brand-charcoal/80">Dholpur Ochre Sandstone</span></li>
              <li><span className="block text-brand-charcoal/80">Absolute Dark Granite</span></li>
              <li><span className="block text-brand-charcoal/80">Premium Alabaster Stones</span></li>
            </ul>
          </div>

          {/* Directory Column 3: Services */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Curatorial Services</span>
            <ul className="space-y-2 text-xs font-light text-brand-grey">
              <li><a href="#inquire" className="hover:text-brand-bronze transition-colors">Custom Spatial Commissioning</a></li>
              <li><a href="#inquire" className="hover:text-brand-bronze transition-colors">Site Dimension Consultations</a></li>
              <li><a href="#inquire" className="hover:text-brand-bronze transition-colors">Corporate Architecture Curations</a></li>
              <li><a href="#inquire" className="hover:text-brand-bronze transition-colors">Bespoke Monolith Sculpting</a></li>
              <li><a href="#inquire" className="hover:text-brand-bronze transition-colors">Global Freight & Weight Rigging</a></li>
            </ul>
          </div>

          {/* Directory Column 4: Newsletter Inquiry Area */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze font-medium">Newsletter & Updates</span>
            <p className="text-xs text-brand-grey font-light leading-relaxed">
              Subscribe to receive private updates on new collections, press exhibitions, and exclusive atelier invitations.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry subscription registered.'); }} className="flex flex-col space-y-2 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="bg-transparent border-b border-brand-charcoal/20 focus:border-brand-bronze focus:outline-none pb-1.5 text-xs text-brand-charcoal font-light transition-colors placeholder:text-brand-grey/50"
              />
              <button
                type="submit"
                className="self-start text-[9px] uppercase tracking-[0.2em] text-brand-bronze hover:text-brand-charcoal transition-colors pt-1 border-b border-brand-bronze/40 pb-0.5 hover:border-brand-charcoal font-light cursor-pointer"
              >
                Join Private Guild
              </button>
            </form>
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
