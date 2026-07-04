import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const handleScrollToCollections = (e) => {
    e.preventDefault();
    const element = document.getElementById('collections');
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

  const handleScrollToInquire = (e) => {
    e.preventDefault();
    const element = document.getElementById('inquire');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background elegant gradient elements */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-brand-sand/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] rounded-full bg-white/40 blur-[100px] pointer-events-none" />

      {/* Top Metadata Strip */}
      <div className="max-w-[1400px] w-full mx-auto flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-brand-grey font-light border-b luxury-divider pb-4">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 3 }}
        >
          Fine Art Exhibition
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="hidden md:inline"
        >
          Atelier Collection 2026
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 3.4 }}
        >
          Latitude: 20.2961° N
        </motion.span>
      </div>

      {/* Main Content Area: Editorial Grid */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto items-center">
        
        {/* Left Column: Heading and Story */}
        <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 z-10">
          
          <div className="flex items-center space-x-2 text-[10px] md:text-xs tracking-[0.25em] text-brand-bronze uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-bronze" />
            <span>SUDARSHAN CRAFTS ATELIER</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-serif font-light leading-[1.05] text-brand-charcoal">
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Sacred Stone Art
              </motion.span>
            </span>
            <span className="block overflow-hidden italic text-brand-bronze">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                className="block animate-pulse-subtle"
              >
                Crafted for
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
                className="block font-medium"
              >
                Timeless Spaces
              </motion.span>
            </span>
          </h1>

          {/* Sanskrit Inspired Subtle Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.6, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 3.5 }}
            className="flex items-center space-x-4 py-1"
          >
            <div className="h-[1px] bg-brand-bronze/45 w-16" />
            <span className="text-[10px] tracking-[0.3em] font-serif text-brand-bronze uppercase select-none">
              शान्तिः
            </span>
            <div className="h-[1px] bg-brand-bronze/45 w-16" />
          </motion.div>

          {/* Refined Luxury Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3.5 }}
            className="text-lg md:text-xl font-serif italic text-brand-deepbrown tracking-[0.05em]"
          >
            Fine Spiritual Sculptures for Elevated Architecture
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3.6 }}
            className="text-sm md:text-base text-brand-grey font-light max-w-md leading-relaxed"
          >
            Hand-carved by heritage master artisans, our deity stone sculptures harmonize raw, ancient granite and marble with contemporary interior design. Housed in premium luxury villas, private sanctuaries, and world-class meditative spaces.
          </motion.p>

          {/* Premium Primary & Secondary Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3.8 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#collections"
              onClick={handleScrollToCollections}
              className="px-8 py-3.5 bg-brand-bronze text-brand-bg hover:bg-brand-deepbrown transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light shadow-md hover:shadow-[0_0_20px_rgba(154,118,82,0.35)] cursor-pointer"
            >
              Explore Collections
            </a>
            
            <a
              href="#inquire"
              onClick={handleScrollToInquire}
              className="px-8 py-3.5 border border-brand-bronze text-brand-charcoal hover:bg-brand-bronze hover:text-white transition-all duration-500 text-xs uppercase tracking-[0.2em] font-light cursor-pointer"
            >
              Commission a Masterpiece
            </a>
          </motion.div>
        </div>

        {/* Right Column: Monumental Shiva Sculpture */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px] aspect-[3/4] relative group"
          >
            {/* Outlining border card */}
            <div className="absolute -inset-2 border border-brand-bronze/10 scale-98 transition-transform duration-700 group-hover:scale-100 pointer-events-none" />

            {/* Inner elegant placeholder with custom texture and overlay */}
            <div className="w-full h-full overflow-hidden border border-brand-bronze/20 shadow-2xl flex items-center justify-center relative bg-brand-secondary">
              
              {/* Actual Monumental Sculpture Image */}
              <img 
                src="/images/shiva.png" 
                alt="Dhyana Shiva Sculpture in Absolute Granite"
                className="w-full h-full object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
              />

              {/* Dramatic atmospheric shadows & lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-bg/5 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-dark/15 to-brand-dark/35 pointer-events-none" />
              
              {/* Subtle inner lines */}
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/10 pointer-events-none flex flex-col justify-between p-4">
                <span className="text-[8px] tracking-[0.25em] uppercase text-white/50">MUSEUM ARCHIVE // NO. 0108</span>
                <span className="text-[8px] tracking-[0.25em] uppercase text-white/50 self-end">SUDARSHAN ATELIER</span>
              </div>

              {/* Label overlay on hover */}
              <div className="absolute bottom-6 left-6 text-left">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">ATELIER MASTERPIECE</p>
                <p className="text-base font-serif italic text-brand-sandstone mt-1">"Dhyana Shiva" in Absolute Black Granite</p>
              </div>

              {/* Visual aspect tags */}
              <div className="absolute top-6 right-6">
                <span className="px-2 py-1 border border-brand-bronze/35 text-[8px] tracking-[0.2em] uppercase text-brand-bronze font-light bg-brand-dark/85">
                  1 of 1 COMMISSION
                </span>
              </div>
            </div>

            {/* Float details */}
            <div className="absolute -bottom-4 -left-4 bg-brand-bg border border-brand-bronze/20 px-4 py-3 shadow-lg hidden sm:block">
              <span className="block text-[8px] tracking-[0.2em] uppercase text-brand-grey">Material</span>
              <span className="block text-xs font-serif font-medium text-brand-charcoal">Absolute Dark Basalt</span>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-brand-bg border border-brand-bronze/20 px-4 py-3 shadow-lg hidden sm:block">
              <span className="block text-[8px] tracking-[0.2em] uppercase text-brand-grey">Height</span>
              <span className="block text-xs font-serif font-medium text-brand-charcoal">220 cm (Monolithic)</span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Scroll Indicator & Exhibition location */}
      <div className="max-w-[1400px] w-full mx-auto flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-brand-grey pt-6 border-t luxury-divider">
        <a 
          href="#collections"
          onClick={handleScrollToCollections}
          className="flex items-center space-x-2 text-brand-charcoal/70 hover:text-brand-bronze transition-colors duration-300 group"
        >
          <span className="font-light">Explore Masterpieces</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
        </a>
        <div className="flex space-x-8 font-light text-[9px]">
          <span className="hover:text-brand-charcoal transition-colors">PARIS DESIGN WEEK</span>
          <span className="hover:text-brand-charcoal transition-colors">MILAN SALONE</span>
        </div>
      </div>
    </section>
  );
}
