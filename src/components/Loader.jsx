import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg text-brand-charcoal px-6"
        >
          {/* Background overlay texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center text-center max-w-lg">
            
            {/* Elegant Sacred Geometric Logo Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 flex items-center justify-center mb-8 relative text-brand-bronze"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outermost elegant square rotated 45 */}
                <rect x="50" y="8" width="59.4" height="59.4" transform="rotate(45 50 8)" stroke="currentColor" strokeWidth="0.75" />
                {/* Concentric circles */}
                <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
                <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.75" />
                {/* Lotus Petals / Ray lines */}
                <line x1="50" y1="20" x2="50" y2="30" stroke="currentColor" strokeWidth="0.75" />
                <line x1="50" y1="70" x2="50" y2="80" stroke="currentColor" strokeWidth="0.75" />
                <line x1="20" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="0.75" />
                <line x1="70" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.75" />
                {/* Diagonal ray lines */}
                <line x1="28.8" y1="28.8" x2="35.8" y2="35.8" stroke="currentColor" strokeWidth="0.75" />
                <line x1="64.2" y1="64.2" x2="71.2" y2="71.2" stroke="currentColor" strokeWidth="0.75" />
                <line x1="71.2" y1="28.8" x2="64.2" y2="35.8" stroke="currentColor" strokeWidth="0.75" />
                <line x1="35.8" y1="64.2" x2="28.8" y2="71.2" stroke="currentColor" strokeWidth="0.75" />
                {/* Center Bindu (spiritual spark dot) */}
                <circle cx="50" cy="50" r="3.5" fill="currentColor" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.25em] uppercase text-brand-charcoal"
            >
              Sudarshan Crafts
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[10px] tracking-[0.35em] font-sans font-light uppercase text-brand-grey mt-3"
            >
              Sacred Deity Sculpture Atelier
            </motion.p>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
              className="h-[1px] bg-brand-bronze/45 my-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-xs md:text-sm font-serif italic text-brand-bronze tracking-[0.1em] max-w-sm"
            >
              "Sacred Stone Art Crafted for Timeless Spaces"
            </motion.p>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-brand-grey/50">
              Entering Exhibition
            </span>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="w-32 h-[1px] bg-brand-bronze/40 mt-2 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
