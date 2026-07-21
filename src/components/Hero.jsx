import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePhotos } from '../hooks/usePhotos';

export default function Hero() {
  const { sliderImages, mobileSliderImages } = usePhotos();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPioneerExpanded, setIsPioneerExpanded] = useState(false);
  const photos = {}; // Removed dynamic photos since admin panel now only manages gallery statues

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSliderImages = isMobile && mobileSliderImages.length > 0 ? mobileSliderImages : sliderImages;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      if (activeSliderImages.length > 0) {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % activeSliderImages.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, activeSliderImages.length]);

  const nextSlide = () => {
    if (activeSliderImages.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeSliderImages.length);
  };

  const prevSlide = () => {
    if (activeSliderImages.length === 0 || isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeSliderImages.length) % activeSliderImages.length);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    const swipeConfidenceThreshold = 10000;
    if (swipe < -swipeConfidenceThreshold) {
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      prevSlide();
    }
  };



  const handleNavigateToGallery = (e) => {
    e.preventDefault();
    window.location.href = '/gallery';
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
    <>
      {/* Full Screen Image Slider (Below Navbar) */}
      <section className="relative w-full mt-[72px] h-[calc(100vh-72px)] overflow-hidden bg-brand-bg">
        <AnimatePresence initial={false} custom={direction}>
          {activeSliderImages.length > 0 && (
            <motion.img
              key={currentIndex}
              src={activeSliderImages[currentIndex]?.image}
              alt={`Slide ${currentIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: [0.4, 0, 0.2, 1], duration: 0.8 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              onAnimationComplete={() => setIsAnimating(false)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ willChange: "transform" }}
              draggable={false}
              loading="eager"
              fetchpriority="high"
            />
          )}
        </AnimatePresence>

        {/* Manual Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-brand-bronze hover:border-brand-bronze transition-all backdrop-blur-md bg-black/30 group"
        >
          <ChevronLeft className="w-5 h-5 pr-[2px] group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 md:right-12 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-brand-bronze hover:border-brand-bronze transition-all backdrop-blur-md bg-black/30 group"
        >
          <ChevronRight className="w-5 h-5 pl-[2px] group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      <section id="home" className="flex flex-col relative overflow-hidden bg-brand-bg">
        {/* Background elegant gradient elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-brand-sand/20 blur-[150px] pointer-events-none" />

        {/* Main Hero Fold */}
        <div className="flex flex-col justify-center pt-6 md:pt-5 pb-16 px-6 md:px-12 relative z-10">
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mt-[30px]">

            {/* Left Column: Heading and Story */}
            <div className="lg:col-span-6 flex flex-col">


              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-navbar font-light leading-[1.1] text-brand-charcoal mb-6"
                style={{ fontFamily: '"Source Serif 4", serif' }}
              >
                Welcome to<br />
                <span className="italic text-brand-bronze pr-2" style={{ fontFamily: '"Playfair Custom", serif' }}>Sudarshan Crafts</span>
              </h1>

              <p
                className="text-sm md:text-base text-brand-grey font-light max-w-xl leading-loose mb-8"
              >
                Now we usher you into the most exotic surroundings that has recreated the ambience of the hoary past of Odisha Temple architectures and sculptures. The various statues of Gods & Goddesses, Natas (MALE DANCERS) & Natis (FEMALE DANCERS), Their smiles & moods and posture, tell you the history of the great stone crafts of Odisha and the people responsible for giving life to the stone and writing poetry on the temple walls.
              </p>

              {/* Premium Primary & Secondary Buttons */}
              <div
                className="flex flex-wrap gap-4"
              >
                <a
                  href="/gallery"
                  onClick={handleNavigateToGallery}
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
              </div>
            </div>

            {/* Right Column: 2 Photos Grid */}
            <div className="lg:col-span-6 relative mt-12 lg:mt-2">
              <div
                className={`grid grid-cols-2 gap-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* Photo 1 */}
                <div className="aspect-[2/3] bg-brand-secondary/50 border border-brand-bronze/20 flex flex-col items-center justify-center p-4 text-center group overflow-hidden relative">
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
                <div className="aspect-[2/3] bg-brand-secondary/50 border border-brand-bronze/20 flex flex-col items-center justify-center p-4 text-center group overflow-hidden relative translate-y-12">
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
              </div>
            </div>
          </div>
        </div>

        {/* Pioneer Section */}
        <div className="bg-brand-secondary/30 py-20 px-6 md:px-12 border-t border-b border-brand-bronze/10 mt-12 relative z-10">
          <div className="max-w-[1000px] mx-auto space-y-8">
            <div className="text-left space-y-6 mb-8">
              <div className="inline-flex items-center justify-start space-x-2 text-[10px] md:text-xs tracking-[0.25em] text-brand-bronze uppercase">
                <span className="w-1 h-1 rounded-full bg-brand-bronze" />
                <span>Pioneer</span>
                <span className="w-1 h-1 rounded-full bg-brand-bronze" />
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-charcoal">
                Shri Sudarshan Sahoo
              </h2>

              <div className="h-[1px] w-24 bg-brand-bronze/30" />
            </div>

            <div className="text-sm md:text-base text-brand-grey font-light leading-relaxed space-y-6 text-justify">

              {/* Floated Photo Container */}
              <div className="float-none lg:float-right w-full lg:w-[360px] lg:ml-12 mb-8 lg:mb-4 relative group clear-both lg:clear-none">
                <div className="aspect-[3/4] w-full relative">
                  <div className="absolute -inset-3 border border-brand-bronze/20 z-0 pointer-events-none" />
                  <div className="absolute inset-0 bg-brand-sand/30 flex items-center justify-center z-10 overflow-hidden border border-brand-bronze/10">
                    <img
                      src="/images/sudarshan-sahoo.avif"
                      alt="Shri Sudarshan Sahoo - Founder and Master Craftsman"
                      width="360"
                      height="480"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex-col items-center justify-center text-brand-charcoal/50 hidden text-center px-4">
                      <span className="text-xs uppercase tracking-[0.2em] mb-2 font-medium block">Photo Placement</span>
                      <span className="text-[10px] font-light">Add 'sudarshan-sahoo.avif' to public/images</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center lg:text-center">
                  <span className="text-[9px] tracking-[0.15em] text-brand-bronze/80 uppercase font-light">
                    Founder & Master Craftsman
                  </span>
                </div>
              </div>

              <p>
                Sudarshan Sahoo is a renowned sculptor, master craftsman who works on Stone and Wood. At the age of thirteen he was initiated to the craft of stone carving by his Guru Late Shri Kunia Moharana and Late Shri Bhubaneswar Mahapatra of Puri. He has been practicing the craft for more than seven decades and has acquired skill and mastery in carving statues of deities for temples in Kalingan style of temple architecture. He is an erudite in scriptures of lore, especially in Hindu & Buddhist mythology.
              </p>

              <p>
                In 1971, he had carved scenes from Jataka tales of Lord Buddha at Dhauli Peace Pagoda. He went to Japan several times at the invitation of Japan Buddha Sangha and has carved stone statues and murals for the Buddhist Temples and Stupas. In the year 1980, he along with his assisting students visited England at the invitation of Buddha Sangha, London and carved the Jataka Tales at the Buddhist Pagoda at Milton Keynes. He carved life story panels of Buddha in Stone and Fiber Glass for Darjeeling Peace Pagoda in 1992, and installed Fiberglass statues at Wardha Peace Pagoda in 1993, which was inaugurated by the Hon’ble President of India. In 1994, he completed the beautification of Hanaokayama Pagoda of Japan. In 1996, he completed gold plated fiberglass statues for Buddhist Temples in Delhi and Vaishali (Bihar) Stupa. In 1998, he created a Monumental Stone Gate at Barunei, Odisha. A granite monolith statue of Bhagwan Parshwanath which took 10 years was installed at Pushpagiri Vihar, Madhya Pradesh.
              </p>

              <AnimatePresence>
                {isPioneerExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-6 overflow-hidden origin-top"
                  >
                    <p>
                      For further development of this craft, a training-cum-production centre named SUDARSHAN CRAFTS MUSEUM was set up in the year 1977 at Puri. Practioners of this art including people from traditional artist communities, young people with a zeal to learn, students from economically weaker sections and people with special abilities are imparted training as per their interest. In 1985, we constructed a Japanese Buddhist Temple on the Nipponzan Myohoji philosophy at this centre and decorated it with gold plated wood carvings which draws lot of tourists to this artistic monument.
                    </p>

                    <div className="flex justify-center text-brand-bronze text-sm py-4">
                      - 02 -
                    </div>

                    <p>
                      In 1991, Mr Sahoo set up SUDARSHAN ART & CRAFTS VILLAGE in Bhubaneswar. He conceived an idea of a village where new learners were trained by skilled artisans in ancient Guru–Shishya parampara style. The centre consists of a research and training centre, art gallery, showroom & hostel for artists. Several of Mr Sahoo’s students have received National Awards, State Awards and other citations.
                    </p>

                    <p>
                      Sudarshan Sahoo attended demonstrations, lectures, skill development programmes and exhibitions across India and beyond including the Festival of India in the U.S.A. in 1986. He also held solo exhibitions at the Jehangir Art Gallery, Mumbai which attracts art lovers from the city. Apart from that, exhibitions were conducted in 1996 at Ravindra Bharathi, Hyderabad, in 1997 at Karnataka Chitrakala Parishath, Bangalore and in 1999, at Bal Gandharva Kala Mandir, Pune. To spread the age-old we have a website <a href="http://www.sudarshancrafts.com" target="_blank" rel="noopener noreferrer" className="text-brand-bronze hover:underline">www.sudarshancrafts.com</a> for the art lovers where different aspects of our creations are displayed.
                    </p>

                    <p>
                      In the year 1976, people of Puri conferred Shreekhetra Shree and in 1981, President of India presented National Award for Stone Carving. Mayor of Philadelphia, USA presented Liberty Bell in 1986. For our outstanding contribution towards art and crafts of India in 1988, President of India awarded Padmashree. In the year 2003 Kamaladevi Chottopadhya Award was presented on her birth centenary. The Vice-President of India has conferred on me the Shilpguru Award for the year 2003. In the year 2011 Utkal University of Culture, Bhubaneswar conferred the Honorary D.Litt degree. He has been felicitated with Priya Odia (most adorable Odia) title for the year 2012 by ETV channel. He has been selected for prestigious Dharmapada Award by Odisha Lalit Kala Akademi for the year 2012. In 2018 he was appointed Chairman of Odisha Handloom and Handicrafts Development and Promotion Council. A pictorial biogaphy “Sudarshan Sahoo – a legacy set in stone” was published in the year 2018 which depicts his life and work in a visual form. In 2021 he was conferred with the Padma Vibhushan award by the President of India for his lifelong contribution towards art & crafts of India.
                    </p>

                    <p>
                      In last seven decades, He has trained more than 400 students and He is trying his best to popularise this art among the future generation. Along with him his students are regularly offering craft demonstrations and lectures to popularise this art form globally. For keeping the heritage of art and crafts alive, he is trying and inspiring his students, family members and artists to be fine craftsmen to keep alive and develop our art and crafts and to restore our old temples and art objects for centuries to come.
                    </p>

                    <p className="text-center font-medium mt-10 text-brand-charcoal italic clear-both">
                      May this rich heritage flourish.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center pt-8 clear-both">
                <button
                  onClick={() => setIsPioneerExpanded(!isPioneerExpanded)}
                  className="px-6 py-2 border border-brand-bronze/50 text-brand-bronze text-xs uppercase tracking-[0.2em] hover:bg-brand-bronze hover:text-white transition-colors duration-300"
                >
                  {isPioneerExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
