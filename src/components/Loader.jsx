import React, { useEffect, useState } from 'react';


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
    {show && (
        <div
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
            <div
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
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.25em] uppercase text-brand-charcoal"
            >
              Sudarshan Crafts
            </h1>
            
            <p
              className="text-[10px] tracking-[0.35em] font-sans font-light uppercase text-brand-grey mt-3"
            >
              Sacred Deity Sculpture
            </p>

            <div
              className="h-[1px] bg-brand-bronze/45 my-6"
            />

            <p
              className="text-xs md:text-sm font-serif italic text-brand-bronze tracking-[0.1em] max-w-sm"
            >
              "Sacred Stone Art Crafted for Timeless Spaces"
            </p>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-brand-grey/50">
              Entering Exhibition
            </span>
            <div
              className="w-32 h-[1px] bg-brand-bronze/40 mt-2 origin-left"
            />
          </div>
        </div>
      )}
    );
}
