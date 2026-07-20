import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Ruler, MapPin } from 'lucide-react';

const signaturePieces = [
  {
    no: "01 / ARCHIVE",
    title: "Dhyana Shiva",
    material: "Absolute Black Granite",
    dimensions: "220 x 110 x 60 cm",
    weight: "820 kg",
    desc: "A monumental expression of cosmic silence and absolute meditative absorption. Features highly refined contours contrasted against raw, split-face geological granite.",

    placeholderClass: "stone-placeholder-granite",
    location: "Exhibition Hall, Jaipur"
  },
  {
    no: "02 / ARCHIVE",
    title: "Vinayaka Masterpiece",
    material: "Makrana Alabaster Marble",
    dimensions: "120 x 75 x 50 cm",
    weight: "280 kg",
    desc: "Sculpted from a single block of high-grade Makrana marble. The light-reflective, fluid contour lines allow shadows to wrap gently around the deity's peaceful form.",

    placeholderClass: "stone-placeholder-marble",
    location: "Private Collector, Milan"
  },
  {
    no: "03 / ARCHIVE",
    title: "Yugal Sarkar Relief",
    material: "Pink Bansi Sandstone",
    dimensions: "180 x 110 x 55 cm",
    weight: "620 kg",
    desc: "Capturing the eternal spiritual union of Radha and Krishna. Carved in deep, high-relief grace, the soft sand textures radiate a warm, gold-orange glow in sunlight.",

    placeholderClass: "stone-placeholder-sandstone",
    location: "Private Estate, Udaipur"
  },
  {
    no: "04 / ARCHIVE",
    title: "Sharda Devi (Saraswati)",
    material: "Carrara Statuario Marble",
    dimensions: "135 x 70 x 50 cm",
    weight: "260 kg",
    desc: "The embodiment of universal wisdom and musical resonance. Features fine, precise chiseling on the sacred Veena, finished in an ultra-luxurious silk-matte polish.",
    placeholderClass: "stone-placeholder-marble",
    location: "Design Showroom, New Delhi"
  }
];

export default function SignaturePieces() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="signature" 
      className="py-24 md:py-36 bg-brand-bg relative overflow-hidden border-t border-b luxury-divider"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Editorial Title Block */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase block font-light">
              03 // MASTER ARCHIVES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-brand-charcoal">
              Signature Masterpieces
            </h2>
            <p className="text-sm text-brand-grey font-light max-w-md leading-relaxed">
              A curated exhibition of our highly sought-after one-of-a-kind stone sculptures, currently exhibited in premium galleries and luxury estates.
            </p>
          </div>
          
          {/* Custom refined navigation buttons */}
          <div className="flex items-center space-x-4 self-end">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 border border-brand-bronze/20 hover:border-brand-bronze text-brand-charcoal hover:text-brand-bronze transition-all flex items-center justify-center rounded-full bg-brand-bg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.25]" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 border border-brand-bronze/20 hover:border-brand-bronze text-brand-charcoal hover:text-brand-bronze transition-all flex items-center justify-center rounded-full bg-brand-bg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-8 md:space-x-12 overflow-x-auto pb-12 pt-4 hide-scrollbar snap-x snap-mandatory px-2"
        >
          {signaturePieces.map((piece, index) => (
            <div 
              key={piece.title}
              className="flex-shrink-0 w-[85vw] sm:w-[65vw] lg:w-[48vw] xl:w-[42vw] snap-start"
            >
              {/* Card visual container with layered shadows */}
              <div className="flex flex-col h-full bg-brand-sand/10 border border-brand-bronze/10 p-6 md:p-8 relative group shadow-sm hover:shadow-xl transition-all duration-700 hover:border-brand-bronze/30">
                
                {/* Thin overlay visual accents */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 pointer-events-none transition-all duration-500 group-hover:border-brand-bronze/15" />

                <div className="flex justify-between items-start text-[9px] tracking-[0.25em] text-brand-grey uppercase pb-4 border-b luxury-divider">
                  <span>{piece.no}</span>
                  <span className="text-brand-bronze font-medium flex items-center space-x-1">
                    <MapPin className="w-2.5 h-2.5 mr-0.5" />
                    <span>{piece.location}</span>
                  </span>
                </div>

                {/* Main Large Image Display */}
                <div className="w-full aspect-[16/10] overflow-hidden my-6 border border-brand-bronze/10 relative bg-brand-secondary">
                  {piece.image ? (
                    <img 
                      src={piece.image} 
                      alt={piece.title} 
                      className="w-full h-full object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                    />
                  ) : (
                    <div className={`w-full h-full ${piece.placeholderClass} transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103 flex items-center justify-center`}>
                      {/* Sculpture shape symbol */}
                      <div className="w-16 h-16 border border-brand-bronze/15 rounded-full flex items-center justify-center">
                        <div className="w-12 h-6 border-b border-brand-bronze/35 rounded-full rotate-12" />
                      </div>
                    </div>
                  )}
                  {/* Lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/25 via-transparent to-white/10 pointer-events-none" />
                  
                  {/* Museum annotation */}
                  <div className="absolute top-4 left-4 text-[7px] tracking-widest text-brand-charcoal/50 uppercase">
                    EXHIBIT REF: SC-PREMIUM-{index+1}
                  </div>
                </div>

                {/* Typography metadata section */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-2xl font-serif text-brand-charcoal font-medium">
                      {piece.title}
                    </h3>
                    <span className="text-[10px] tracking-widest uppercase text-brand-bronze">
                      {piece.material}
                    </span>
                  </div>

                  <p className="text-xs text-brand-grey font-light leading-relaxed">
                    {piece.desc}
                  </p>

                  <div className="h-[1px] bg-brand-bronze/10 pt-2" />

                  {/* Dimension Specifications grid */}
                  <div className="flex justify-between items-center text-[10px] tracking-[0.15em] text-brand-grey uppercase">
                    <div className="flex items-center space-x-1.5">
                      <Ruler className="w-3.5 h-3.5 stroke-[1.25] text-brand-bronze" />
                      <span>{piece.dimensions}</span>
                    </div>
                    <div>
                      <span>Net Weight: </span>
                      <span className="text-brand-charcoal font-medium">{piece.weight}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
