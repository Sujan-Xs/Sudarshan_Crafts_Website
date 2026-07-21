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
          <div className="max-w-[900px] mx-auto space-y-8">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center justify-center space-x-2 text-[10px] md:text-xs tracking-[0.25em] text-brand-bronze uppercase">
                <span className="w-1 h-1 rounded-full bg-brand-bronze" />
                <span>Pioneer</span>
                <span className="w-1 h-1 rounded-full bg-brand-bronze" />
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-charcoal">
                Shri Sudarshan Sahoo
              </h2>

              <div className="h-[1px] w-24 bg-brand-bronze/30 mx-auto" />
            </div>

            <div className="text-sm md:text-base text-brand-grey font-light leading-relaxed space-y-6 text-justify">
              <p>
                He is a traditional Master Craftsman working in stone, wood, and other media. At the age of 13, he was initiated into the craft of stone carving by his teachers and gurus, Late Shri Kunia Moharana and Late Shri Bhubaneswar Mahapatra of Puri. He has been practicing this craft for more than seven decades, acquiring exceptional skill and mastery in carving statues of deities for temples as well as decorative artifacts. He is also well-versed in ancient scriptures, particularly Hindu and Buddhist literature.
              </p>

              <p>
                In 1971, he carved the Jataka stories of Lord Buddha at the Dhauli Peace Pagoda near Bhubaneswar. Thereafter, he visited Japan several times at the invitation of the Japan Buddha Sangha, where he created stone statues and murals for Buddhist temples and stupas. In 1980, along with his students, he visited England at the invitation of Buddha Sangha, London, and carved the Jataka Tales at the Buddhist Pagoda in Milton Keynes. In 1992, he created life-story panels of Buddha in stone and fiberglass for the Darjeeling Peace Pagoda. In 1993, he installed fiberglass statues at Wardha Peace Pagoda, inaugurated by the Hon'ble President of India. In 1994, he completed the beautification of the Hanaokayama Pagoda in Japan. In 1996, he created gold-plated fiberglass statues for Buddhist temples in Delhi and the Vaishali (Bihar) Stupa. In 1998, he constructed a monumental stone gate measuring 36 ft x 36 ft at Barunei, Odisha. A granite monolith statue of Bhagwan Parasnath, which took seven years to complete, was installed at Pushpagiri Vihar, Madhya Pradesh, earning appreciation from religious preachers and art connoisseurs. Recently, a 101-foot-long Buddha Jataka Story mural project was completed at a spiritual park near Mumbai. His artworks have also adorned numerous public and private spaces, including temples, homes, offices, museums, airports, and community centers in India and abroad.
              </p>

              <p>
                To promote the craft, he established a training-cum-production center named Sudarshan Crafts Museum in 1977 at Puri. The center produces stone and wood carvings, paintings, and fiberglass statues. It provides training to students from traditional artist communities, economically weaker sections, and individuals with special abilities. A group of skilled craftsmen trained under him continues to work there. In 1985, a Buddhist temple was established within the center and decorated with gold-plated wood carvings, attracting many visitors.
              </p>

              <p>
                In 1991, he founded Sudarshan Art & Crafts Village in Bhubaneswar, based on the Guru–Shishya tradition, where teachers and students live and work together. The center includes an art gallery, showroom, training center, research center, library, and hostel facilities. Each year, 10 students are trained free of cost, with plans to expand to 50. Special emphasis is given to empowering economically disadvantaged individuals and people with special abilities. He continues to reside at the Crafts Village, developing it gradually. Many of his students have received national and state awards and continue to work alongside him.
              </p>

              <p>
                He has participated in numerous demonstrations, lectures, skill development programs, and exhibitions in India and abroad, including the Festival of India in the USA in 1986. His solo exhibitions at Jehangir Art Gallery, Mumbai, were widely appreciated. His works were also exhibited at Ravindra Bharathi, Hyderabad (1996), Karnataka Chitrakala Parishath, Bangalore (1997), and Bal Gandharva Kala Mandir, Pune (1999). A group exhibition with his sons, Rabi and Surya, at Jehangir Art Gallery in 2011 received critical acclaim. To promote traditional art globally, he launched the website <a href="http://www.sudarshancrafts.com" target="_blank" rel="noopener noreferrer" className="text-brand-bronze hover:underline">www.sudarshancrafts.com</a>.
              </p>

              <p>
                His contributions have been widely recognized. In 1976, he was honored with Shreekhetra Shree by the people of Puri. In 1981, he received the National Award for Stone Carving from the President of India. In 1986, he was presented the Liberty Bell by the Mayor of Philadelphia, USA. In 1988, he was awarded the Padma Shri by the President of India for his outstanding contribution to Indian art and crafts. In 2003, he received the Kamaladevi Chattopadhyay Award and the Shilpguru Award from the Vice-President of India. In 2011, Utkal University of Culture conferred upon him an honorary D.Litt degree. In 2012, he was honored with the Priya Odia title by ETV and selected for the Dharmapada Award by Odisha Lalit Kala Akademi. In 2018, he was appointed Chairman of the Odisha Handloom and Handicrafts Development and Promotion Council. A pictorial biography titled "Sudarshan Sahoo – A Legacy Set in Stone" was published the same year. In 2021, he was conferred with the Padma Vibhushan by the President of India for his lifelong contribution to art and crafts.
              </p>

              <p>
                Over the past seven decades, he has trained more than 400 students and continues to promote this art form among future generations. Along with his students, he regularly conducts demonstrations and lectures to popularize traditional craftsmanship globally. He remains dedicated to preserving and advancing the heritage of art and crafts, inspiring students, family members, and fellow artists to uphold and restore traditional artistic practices for generations to come.
              </p>

              <p className="text-center font-medium mt-10 text-brand-charcoal italic">
                May this rich heritage continue to flourish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
