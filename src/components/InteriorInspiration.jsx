import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Map } from 'lucide-react';

const inspirationItems = [
  {
    id: 1,
    title: "Bel Air Luxury Sanctuary Foyer",
    description: "Our monumental Vinayaka in pure White Makrana Marble stands as a breathtaking centerpiece under a grand 6-meter skylit foyer.",
    location: "Los Angeles, CA",
    image: "/images/ganesha.png",
    placeholderClass: "stone-placeholder-marble",
    heightClass: "h-[360px]"
  },
  {
    id: 2,
    title: "Kyoto Zen Reflection Courtyard",
    description: "A dark basalt Dhyana Shiva sculpture integrated within a minimalist dry stone and moss garden, invoking profound cosmic stillness.",
    location: "Kyoto, Japan",
    image: "/images/shiva.png",
    placeholderClass: "stone-placeholder-granite",
    heightClass: "h-[460px]"
  },
  {
    id: 3,
    title: "Zurich Wellness Resort Lobby",
    description: "A bespoke backlit Alabaster custom installation casting warm, tranquil geometric shadow patterns across an elite alpine spa lobby.",
    location: "Zurich, Switzerland",
    placeholderClass: "stone-placeholder-dark",
    heightClass: "h-[300px]"
  },
  {
    id: 4,
    title: "Udaipur Heritage Villa Courtyard",
    description: "An intricate Gaja Lakshmi pink sandstone sculpture framing a heritage archway, set next to a quiet water-reflection pool.",
    location: "Rajasthan, India",
    placeholderClass: "stone-placeholder-sandstone",
    heightClass: "h-[380px]"
  },
  {
    id: 5,
    title: "New Delhi Penthouse Puja Atrium",
    description: "A gorgeous Radha Krishna sandstone relief situated in a spiritual corner of a modern penthouse, interacting with daylong soft natural light.",
    location: "New Delhi, India",
    image: "/images/radha_krishna.png",
    placeholderClass: "stone-placeholder-sandstone",
    heightClass: "h-[420px]"
  },
  {
    id: 6,
    title: "Mallorca Meditation Pavilion",
    description: "A serene beige sandstone Nirvana Buddha placed under an open-air stone pavilion, overlooking the infinite calm of the Mediterranean Sea.",
    location: "Mallorca, Spain",
    placeholderClass: "stone-placeholder-marble",
    heightClass: "h-[330px]"
  }
];

export default function InteriorInspiration() {
  return (
    <section 
      id="inspirations" 
      className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end border-b luxury-divider pb-12 mb-16">
        <div className="max-w-xl space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase block font-light">
            05 // SPATIAL ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-brand-charcoal">
            Sculptural Inspirations
          </h2>
          <p className="text-sm text-brand-grey font-light leading-relaxed">
            Witness how our bespoke creations inhabit premier architecture worldwide. We collaborate with designers to integrate heavy stone sculpture as a central design element.
          </p>
        </div>
        <div className="mt-6 lg:mt-0">
          <span className="text-xs uppercase tracking-[0.2em] font-light text-brand-grey block">
            GALLERY DOCUMENTATION
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] font-light text-brand-bronze block mt-1 italic">
            Architectural Placements
          </span>
        </div>
      </div>

      {/* Modern Pinterest Masonry Column Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {inspirationItems.map((item) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            key={item.id}
            className="break-inside-avoid group relative border border-brand-bronze/10 overflow-hidden bg-brand-sand/15 transition-all duration-500 hover:border-brand-bronze/35 hover:shadow-lg flex flex-col"
          >
            {/* Fine boundary borders */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 pointer-events-none transition-all duration-500 group-hover:border-brand-bronze/15 z-20" />

            {/* Content Area with specified heights */}
            <div className={`w-full ${item.heightClass} relative overflow-hidden flex items-center justify-center`}>
              
              {/* Stone themed textured container or actual image */}
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                />
              ) : (
                <div className={`w-full h-full ${item.placeholderClass} transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103`}>
                  {/* Visual shadow / lighting map */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/25 via-transparent to-white/15 pointer-events-none" />
                  
                  {/* Minimal abstract sculptural line indicators */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-14 h-14 border border-brand-bronze/15 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border border-brand-bronze/20 rounded-md rotate-12" />
                    </div>
                  </div>
                </div>
              )}

              {/* Luxury Blur Overlay with Editorial Narrative */}
              <div className="absolute inset-0 bg-brand-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-8 z-10">
                
                {/* Header in Overlay */}
                <div className="flex justify-between items-start text-[8px] tracking-[0.25em] text-brand-bronze uppercase">
                  <span>Placements Spec</span>
                  <span className="flex items-center">
                    <Map className="w-2.5 h-2.5 mr-1" />
                    {item.location}
                  </span>
                </div>

                {/* Body details in Overlay */}
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-white font-light">
                    {item.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-brand-bronze" />
                  <p className="text-[11px] text-brand-sand/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer in Overlay */}
                <div className="text-[8px] tracking-[0.2em] uppercase text-white/50 border-t border-white/10 pt-2 flex items-center space-x-1.5 self-start">
                  <Eye className="w-3.5 h-3.5 text-brand-bronze" />
                  <span>Inspect Space Layout</span>
                </div>

              </div>
            </div>

            {/* Caption beneath images when not hovered (for mobile & screen completeness) */}
            <div className="p-5 border-t border-brand-bronze/10 flex justify-between items-center bg-brand-bg/50">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal">
                  {item.title}
                </h4>
                <p className="text-[10px] text-brand-grey font-light mt-0.5">{item.location}</p>
              </div>
              <span className="text-[9px] tracking-[0.1em] text-brand-bronze italic font-serif">
                0{item.id}
              </span>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
