import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const photos = {}; // Removed dynamic photos since admin panel now only manages gallery statues

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollToGallery = (e) => {
    e.preventDefault();
    const element = document.getElementById('gallery');
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

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="flex flex-col relative overflow-hidden bg-brand-bg">
      {/* Background elegant gradient elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-brand-sand/20 blur-[150px] pointer-events-none" />

      {/* Main Hero Fold */}
      <div className="min-h-[85vh] flex flex-col justify-center pt-32 pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="flex items-center space-x-2 text-[10px] md:text-xs tracking-[0.25em] text-brand-bronze uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-bronze" />
              <span>SUDARSHAN CRAFTS MUSEUM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] text-brand-charcoal">
              Welcome to the <br />
              <span className="italic text-brand-bronze pr-2">Sudarshan Crafts Museum</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.6, scaleX: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center space-x-4 py-2"
            >
              <div className="h-[1px] bg-brand-bronze/45 w-16" />
              <span className="text-[10px] tracking-[0.3em] font-serif text-brand-bronze uppercase select-none">
                शान्तिः
              </span>
              <div className="h-[1px] bg-brand-bronze/45 w-16" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-sm md:text-base text-brand-grey font-light max-w-xl leading-loose"
            >
              Now we usher you into the most exotic surroundings that has recreated the ambience of the hoary past of Odisha Temple architectures and sculptures. The various statues of Gods & Goddesses, Natas (MALE DANCERS) & Natis (FEMALE DANCERS), Their smiles & moods and posture, tell you the history of the great stone crafts of Odisha and the people responsible for giving life to the stone and writing poetry on the temple walls.
            </motion.p>

            {/* Premium Primary & Secondary Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#gallery"
                onClick={handleScrollToGallery}
                className="px-8 py-3.5 bg-brand-bronze text-brand-bg hover:bg-brand-deepbrown transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light shadow-md hover:shadow-[0_0_20px_rgba(154,118,82,0.35)] cursor-pointer"
              >
                Explore Gallery
              </a>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="px-8 py-3.5 border border-brand-bronze text-brand-charcoal hover:bg-brand-bronze hover:text-white transition-all duration-500 text-xs uppercase tracking-[0.2em] font-light cursor-pointer"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right Column: 4 Photos Grid */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-2 gap-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Photo 1 */}
              <div className="aspect-[4/5] bg-brand-secondary/50 border border-brand-bronze/20 flex flex-col items-center justify-center p-4 text-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-bronze/5 transition-opacity group-hover:opacity-100 opacity-0 z-20 pointer-events-none" />
                {photos.hero_bust ? (
                  <img src={photos.hero_bust} alt="Photo of PSS (Bust)" className="absolute inset-0 w-full h-full object-cover z-10" />
                ) : (
                  <>
                    <span className="text-xs font-serif italic text-brand-charcoal/60 relative z-10">Photo of PSS (Bust)</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-bronze mt-2 relative z-10">Placeholder</span>
                  </>
                )}
              </div>
              
              {/* Photo 2 */}
              <div className="aspect-[4/5] bg-brand-secondary/50 border border-brand-bronze/20 flex flex-col items-center justify-center p-4 text-center group overflow-hidden relative translate-y-8">
                <div className="absolute inset-0 bg-brand-bronze/5 transition-opacity group-hover:opacity-100 opacity-0 z-20 pointer-events-none" />
                {photos.hero_na ? (
                  <img src={photos.hero_na} alt="Photo of PSS N/A" className="absolute inset-0 w-full h-full object-cover z-10" />
                ) : (
                  <>
                    <span className="text-xs font-serif italic text-brand-charcoal/60 relative z-10">Photo of PSS N/A</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-bronze mt-2 relative z-10">Placeholder</span>
                  </>
                )}
              </div>

              {/* Photo 3 */}
              <div className="aspect-[4/5] bg-brand-secondary/50 border border-brand-bronze/20 flex flex-col items-center justify-center p-4 text-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-bronze/5 transition-opacity group-hover:opacity-100 opacity-0 z-20 pointer-events-none" />
                {photos.hero_pa ? (
                  <img src={photos.hero_pa} alt="Photo of PSS P/A" className="absolute inset-0 w-full h-full object-cover z-10" />
                ) : (
                  <>
                    <span className="text-xs font-serif italic text-brand-charcoal/60 relative z-10">Photo of PSS P/A</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-bronze mt-2 relative z-10">Placeholder</span>
                  </>
                )}
              </div>

              {/* Photo 4 */}
              <div className="aspect-[4/5] bg-brand-secondary/50 border border-brand-bronze/20 flex flex-col items-center justify-center p-4 text-center group overflow-hidden relative translate-y-8">
                <div className="absolute inset-0 bg-brand-bronze/5 transition-opacity group-hover:opacity-100 opacity-0 z-20 pointer-events-none" />
                {photos.hero_sga ? (
                  <img src={photos.hero_sga} alt="Photo of PSS S/G/A" className="absolute inset-0 w-full h-full object-cover z-10" />
                ) : (
                  <>
                    <span className="text-xs font-serif italic text-brand-charcoal/60 relative z-10">Photo of PSS S/G/A</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-bronze mt-2 relative z-10">Placeholder</span>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pioneer Section */}
      <div className="bg-brand-secondary/30 py-20 px-6 md:px-12 border-t border-b border-brand-bronze/10 mt-12 relative z-10">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center space-x-2 text-[10px] md:text-xs tracking-[0.25em] text-brand-bronze uppercase">
            <span className="w-1 h-1 rounded-full bg-brand-bronze" />
            <span>Pioneer</span>
            <span className="w-1 h-1 rounded-full bg-brand-bronze" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-charcoal">
            Shri Sudarshan Sahoo
          </h2>
          
          <div className="h-[1px] w-24 bg-brand-bronze/30 mx-auto" />
          
          <p className="text-sm md:text-base text-brand-grey font-light leading-relaxed">
            Born on 11th March 1939 at Puri Town Odisha, India. Acquired the artistic skill of traditional sculpting under the tutelage of Guru Late Sri Bhubaneswar Mohapatra and Late Sri Kunia Moharana of Puri Town.
          </p>
        </div>
      </div>
    </section>
  );
}
