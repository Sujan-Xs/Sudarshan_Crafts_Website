import React from 'react';
import { motion } from 'framer-motion';

const collaborationsList = [
  {
    quote: "The monumental Dhyana Shiva basalt sculpture commissioned for our primary courtyard has completely redefined our arrival experience. The craftsmanship is of absolute heritage grade.",
    author: "Elena Rostov",
    title: "Chief Architectural Director",
    institution: "Aman Resorts & Lodges",
    id: "01 // RESORTS"
  },
  {
    quote: "Sudarshan's unique understanding of sacred geometry, spatial energy, and structural stone mass is truly peerless. Their deity sculptures harmonize perfectly with modern high-end architecture.",
    author: "Matteo Galli",
    title: "Lead Principal Architect",
    institution: "Studio A+D Milan",
    id: "02 // COLLABORATION"
  },
  {
    quote: "For our Bel Air sanctuary project, Sudarshan Atelier sculpted a monumental Ganesha in pure Makrana White Marble that radiates tranquil energy and captures light with poetic grace.",
    author: "Sarah Sterling",
    title: "Executive Creative Director",
    institution: "Sterling Interiors Group",
    id: "03 // LUXURY RESIDENCES"
  }
];

export default function Testimonials() {
  return (
    <section 
      id="collaborations" 
      className="py-24 md:py-32 bg-brand-bg relative border-t border-b luxury-divider overflow-hidden"
    >
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-sand/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase font-light">
            06 // PROVENANCE & SYNERGY
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-charcoal">
            Atelier Collaborations
          </h2>
          <div className="w-10 h-[1px] bg-brand-bronze my-4" />
          <p className="text-xs text-brand-grey font-light leading-relaxed">
            Collaborating with leading global architects, designers, and curators to elevate monumental and residential architectural interiors.
          </p>
        </div>

        {/* Minimal Monochrome Card Deck Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collaborationsList.map((collab, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              key={collab.author}
              className="border border-brand-bronze/10 p-8 flex flex-col justify-between relative bg-brand-bg/50 backdrop-blur-sm group hover:border-brand-bronze/30 transition-colors duration-500 shadow-sm"
            >
              {/* Corner fine line markings */}
              <div className="absolute top-3 left-3 right-3 bottom-3 border border-brand-bronze/5 pointer-events-none transition-colors duration-500 group-hover:border-brand-bronze/10" />

              {/* Tag / Category */}
              <span className="text-[8px] tracking-[0.2em] uppercase text-brand-grey/60 font-light block pb-4 border-b luxury-divider">
                {collab.id}
              </span>

              {/* Quote Body */}
              <blockquote className="my-8">
                <p className="text-sm font-serif italic text-brand-charcoal/90 leading-relaxed text-luxury-serif">
                  “{collab.quote}”
                </p>
              </blockquote>

              {/* Author metadata */}
              <div className="border-t luxury-divider pt-4 flex flex-col">
                <span className="text-xs uppercase tracking-[0.15em] font-medium text-brand-charcoal">
                  {collab.author}
                </span>
                <span className="text-[10px] tracking-[0.1em] text-brand-bronze font-light mt-0.5">
                  {collab.title}
                </span>
                <span className="text-[9px] tracking-[0.15em] text-brand-grey uppercase font-light mt-1">
                  {collab.institution}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Collaborator strip */}
        <div className="mt-20 pt-10 border-t luxury-divider flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 hover:opacity-60 transition-opacity duration-500">
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-charcoal font-light">AMAN RESORTS</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-charcoal font-light">MILAN STUDIO D'ARTE</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-charcoal font-light">HYATT LUXURY</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-charcoal font-light">STERLING GUILD</span>
        </div>

      </div>
    </section>
  );
}
