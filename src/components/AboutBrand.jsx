import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function AboutBrand() {
  return (
    <section 
      id="about" 
      className="py-24 md:py-36 px-6 md:px-12 bg-brand-sand/10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-bronze/10" />

      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Editorial Subheading */}
        <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase block font-light mb-8 text-center">
          04 // THE PHILOSOPHY
        </span>

        {/* Elegant Centered Blockquote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl relative px-4 md:px-8 mb-20"
        >
          {/* Subtle bronze quote graphic */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-[0.07] text-brand-bronze">
            <Quote className="w-16 h-16 stroke-[1]" />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-brand-charcoal leading-snug text-center text-luxury-serif">
            “Every stone block holds a silent, millions-of-years-old narrative. Our role is not to impose a shape, but to chisel away the noise and reveal the sacred form sleeping within.”
          </h3>

          <div className="w-16 h-[1px] bg-brand-bronze mx-auto my-8" />
          
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-light text-brand-bronze">
            SUDARSHAN CREDO
          </span>
        </motion.div>

        {/* Triple-Column Editorial Spread */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-brand-bronze/15 pt-16 w-full">
          
          {/* Column 1: Tectonic Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="space-y-4"
          >
            <span className="text-[9px] tracking-[0.25em] text-brand-bronze uppercase font-medium block">
              I. GEOLOGICAL HARMONY
            </span>
            <h4 className="text-xl font-serif text-brand-charcoal font-medium">
              Respecting the Stone
            </h4>
            <p className="text-xs text-brand-grey font-light leading-relaxed">
              We approach raw stone with geological humility. Our sculptors study the grain, the fissures, and the density of each block for weeks before making the first strike. This slow process ensures we honor the material's innate weight and character.
            </p>
          </motion.div>

          {/* Column 2: Pristine Sourcing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25 }}
            className="space-y-4"
          >
            <span className="text-[9px] tracking-[0.25em] text-brand-bronze uppercase font-medium block">
              II. HERITAGE QUARRIES
            </span>
            <h4 className="text-xl font-serif text-brand-charcoal font-medium">
              Curated Materials
            </h4>
            <p className="text-xs text-brand-grey font-light leading-relaxed">
              Our materials are hand-selected from heritage quarries worldwide. From pristine Makrana white marble (the marble of the Taj Mahal) to dense regional sandstones and deep dark volcanic granites, only 5% of quarried blocks meet our artistic standards.
            </p>
          </motion.div>

          {/* Column 3: Space Integration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-4"
          >
            <span className="text-[9px] tracking-[0.25em] text-brand-bronze uppercase font-medium block">
              III. ARCHITECTURAL SYNERGY
            </span>
            <h4 className="text-xl font-serif text-brand-charcoal font-medium">
              Architectural Scale
            </h4>
            <p className="text-xs text-brand-grey font-light leading-relaxed">
              We design sculptures to inhabit spaces permanently. Collaborating with interior designers, landscape architects, and hotel collectors, we ensure each piece is positioned to harness shifting natural light, shadow, and architectural breathing room.
            </p>
          </motion.div>

        </div>

        {/* Decorative thin bronze accent line */}
        <div className="w-full flex justify-between items-center text-[8px] tracking-[0.3em] uppercase text-brand-grey/50 font-light mt-20 pt-6 border-t luxury-divider">
          <span>MATERIAL SELECTION CERTIFICATE</span>
          <span>BESPOKE ARTISANAL GUARANTEE</span>
        </div>

      </div>
    </section>
  );
}
