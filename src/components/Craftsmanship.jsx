import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Landmark, Award } from 'lucide-react';

export default function Craftsmanship() {
  const stats = [
    { number: "30+", label: "Years of Heritage", desc: "Fine stone carving artistry" },
    { number: "04", label: "Generations of Masters", desc: "Ancestral sculpting lineages" },
    { number: "1.2k+", label: "Sculptures Created", desc: "Housed in luxury estates globally" }
  ];

  return (
    <section 
      id="craftsmanship" 
      className="py-24 md:py-36 bg-brand-sand/40 relative overflow-hidden"
    >
      {/* Visual stone texture layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-bronze/10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Workshop Representation / Asymmetric Visuals */}
        <div className="lg:col-span-6 relative">
          
          {/* Main textured container acting as "Artisan Workshop Space" */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] stone-placeholder-sandstone border border-brand-bronze/25 p-8 flex flex-col justify-between shadow-lg relative group"
          >
            {/* Texture graphic elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/15 via-transparent to-white/20" />
            
            {/* Fine border structure overlay */}
            <div className="absolute top-6 left-6 right-6 bottom-6 border border-brand-bronze/10 pointer-events-none flex flex-col justify-between p-4 z-10">
              <div className="flex justify-between items-start">
                <span className="text-[9px] tracking-[0.25em] text-brand-charcoal/60 uppercase">ATELIER WORKSHOP</span>
                <span className="text-[9px] tracking-[0.25em] text-brand-charcoal/60 uppercase">RAW MONOLITHS</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[9px] tracking-[0.25em] text-brand-charcoal/60 uppercase">SUDARSHAN CRAFTS</span>
                <span className="text-[9px] tracking-[0.25em] text-brand-charcoal/60 uppercase">STAGE: BLOCK CHISELING</span>
              </div>
            </div>

            {/* Inner aesthetic wireframe block representing raw stone */}
            <div className="my-auto mx-auto w-48 h-48 border border-brand-bronze/15 bg-white/25 backdrop-blur-[2px] rotate-12 flex items-center justify-center relative shadow-sm transition-transform duration-700 group-hover:rotate-6">
              <div className="w-40 h-40 border border-brand-bronze/20 absolute -rotate-6" />
              <div className="w-32 h-32 border border-brand-bronze/30 absolute rotate-45" />
              
              <div className="z-10 flex flex-col items-center">
                <Hammer className="w-8 h-8 text-brand-bronze stroke-[1.25] mb-2" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-brand-charcoal font-light">HAND CRAFTED</span>
              </div>
            </div>

            {/* Overlay metadata */}
            <div className="bg-brand-bg/95 border border-brand-bronze/20 p-6 shadow-md max-w-sm z-10 self-start">
              <span className="text-[9px] tracking-[0.25em] text-brand-bronze uppercase block font-medium mb-1">
                The Sculptor's Touch
              </span>
              <p className="text-xs text-brand-charcoal/90 font-light leading-relaxed">
                "Our chisel marks are left deliberate on key areas, documenting the intense physical dialogue between sculptor and stone."
              </p>
              <span className="text-[10px] italic font-serif text-brand-bronze block mt-2">
                — Master Craftsman K. Sudarshan
              </span>
            </div>

          </motion.div>

          {/* Floater background card */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-brand-bronze/10 bg-brand-bg/40 backdrop-blur-sm -z-10 pointer-events-none hidden md:block" />
        </div>

        {/* Right Column: Editorial Narrative & Statistics */}
        <div className="lg:col-span-6 flex flex-col space-y-10">
          
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase block font-light">
              02 // METICULOUS ARTISTRY
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-brand-charcoal">
              Where Geological Time <br />Meets Human Artistry
            </h2>
            <div className="w-12 h-[1px] bg-brand-bronze my-6" />
          </div>

          {/* Editorial storytelling blocks */}
          <div className="space-y-6 text-sm text-brand-grey font-light leading-relaxed">
            <p>
              Every stone sculpture is a conversation with time. We journey to historical quarries across India, selecting blocks of Makrana marble, sandstone, and monolithic granites that have formed over hundreds of millions of years. 
            </p>
            <p>
              Unlike mass-produced modern carvings, our atelier works exclusively with traditional hand tools. From rough layout sketches directly on the stone block to the final smooth polish using diamond dust, every incision is made by a human hand, rendering each artwork a unique, unrepeatable masterpiece.
            </p>
          </div>

          {/* High-end statistics layout */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-bronze/20">
            {stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                key={stat.label}
                className="space-y-1"
              >
                <span className="block text-2xl md:text-3xl font-serif text-brand-bronze font-light">
                  {stat.number}
                </span>
                <span className="block text-[9px] tracking-[0.15em] uppercase text-brand-charcoal font-medium">
                  {stat.label}
                </span>
                <span className="block text-[8px] text-brand-grey leading-tight font-light">
                  {stat.desc}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Craft features listing */}
          <div className="flex flex-col space-y-4 pt-4">
            <div className="flex items-start space-x-3">
              <Landmark className="w-4 h-4 text-brand-bronze stroke-[1.5] mt-0.5" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-brand-charcoal font-medium">Heritage Sourcing</h4>
                <p className="text-[11px] text-brand-grey font-light mt-0.5 leading-relaxed">Sourcing only premium-grade blocks with structural integrity for generations of exhibition.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="w-4 h-4 text-brand-bronze stroke-[1.5] mt-0.5" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-brand-charcoal font-medium">Bespoke Architectural Commissions</h4>
                <p className="text-[11px] text-brand-grey font-light mt-0.5 leading-relaxed">Collaborating intimately with luxury architects to scale and position heavy stone carvings.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
