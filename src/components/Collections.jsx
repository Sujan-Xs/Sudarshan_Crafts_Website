import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Ruler, Sparkles, HelpCircle, Compass, Calendar, ChevronRight } from 'lucide-react';

const collectionsList = [
  {
    id: "01",
    title: "Ganesha Sculptures",
    shortDesc: "The embodiment of wisdom, auspicious beginnings, and the obstacle-remover, sculpted in pristine marble and sandstone.",
    placeholderClass: "stone-placeholder-marble",
    image: "/images/ganesha.png",
    aspect: "aspect-[3/4]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4",
    material: "Makrana Alabaster & Sandstone",
    size: "Atelier Curated",
    masterworks: [
      {
        name: "Vinayaka in Makrana Marble",
        material: "Pure White Makrana Marble",
        dimensions: "120 x 75 x 50 cm",
        weight: "280 kg",
        craftsmanship: "100% Hand-carved using traditional iron chisels, diamond dust hand-polish.",
        significance: "Depicts Ganesha in a state of tranquil contemplation (Dhyana Vinayaka). The smooth, light-reflective white marble represents purity of consciousness, while the pristine, minimal carving lines represent modern spiritual aesthetics.",
        description: "A museum-grade masterpiece sculpted from a single block of high-grade Makrana marble, the same stone used in the Taj Mahal. The soft contour lines and pristine hand-polished finish allow light to wrap elegantly around the deity's form.",
        image: "/images/ganesha.png"
      },
      {
        name: "Vighnaharta in Dholpur Stone",
        material: "Warm Beige Dholpur Sandstone",
        dimensions: "150 x 90 x 45 cm",
        weight: "390 kg",
        craftsmanship: "Intricate deep-relief chiseling with deliberate natural texture left on key structural boundaries.",
        significance: "Stands as the guardian of space, removing spiritual obstacles. The warm sandstone connects the space to ancient Indian temple architecture, grounding the surrounding interior.",
        description: "Exhibiting beautiful natural variegation of ochre and sand tones. The texture is intentionally left slightly coarse in parts to showcase the dialogue between the raw tectonic stone and the master's smooth refine."
      }
    ]
  },
  {
    id: "02",
    title: "Shiva Sculptures",
    shortDesc: "Monumental expressions of cosmic silence, absolute consciousness, and deep meditative stillness in absolute dark granite.",
    placeholderClass: "stone-placeholder-granite",
    image: "/images/shiva.png",
    aspect: "aspect-[4/5]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:translate-y-12",
    material: "Absolute Dark Granite & Basalt",
    size: "Sanctum Monoliths",
    masterworks: [
      {
        name: "Dhyana Shiva in Absolute Granite",
        material: "Absolute Dark Basalt Granite",
        dimensions: "220 x 110 x 60 cm",
        weight: "820 kg",
        craftsmanship: "Monolithic chiseling with high-gloss diamond polished details contrasted against raw, split-face granite textures.",
        significance: "Represents the supreme yogi in deep Samadhi. The absolute black stone absorbs all light, symbolizing the infinite void (Shunya) from which all creation emerges and into which it dissolves.",
        description: "An awe-inspiring monolithic sculpture that anchors any space with profound spiritual gravity. Crafted from one single block of basalt, the facial features emit an aura of supreme, timeless serenity.",
        image: "/images/shiva.png"
      }
    ]
  },
  {
    id: "03",
    title: "Radha Krishna Sculptures",
    shortDesc: "Capturing the cosmic play of divine love, eternal devotion, and spiritual union, carved in warm heritage sandstone.",
    placeholderClass: "stone-placeholder-sandstone",
    image: "/images/radha_krishna.png",
    aspect: "aspect-[3/4]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4",
    material: "Warm Beige Sandstone",
    size: "Private Estates",
    masterworks: [
      {
        name: "Yugal Sarkar in Beige Sandstone",
        material: "Premium Bansi Paharpur Sandstone",
        dimensions: "180 x 110 x 55 cm",
        weight: "620 kg",
        craftsmanship: "Fine high-relief detailing, hand-smoothed with sandstone powder and oil.",
        significance: "Expresses 'Yugal Sarkar'—the ultimate union of the individual soul (Radha) with the supreme consciousness (Krishna). The soft golden sandstone tones glow warmly in natural sunlight.",
        description: "Placed beautifully by a water body or in an elegant modern sanctum, this sculpture exhibits unmatched grace. The flowing drapery and intricate ornaments are carved with extreme delicacy.",
        image: "/images/radha_krishna.png"
      }
    ]
  },
  {
    id: "04",
    title: "Krishna Sculptures",
    shortDesc: "The divine flute player, evoking cosmic harmony, spiritual playfulness, and transcendental bliss in fine marble.",
    placeholderClass: "stone-placeholder-marble",
    aspect: "aspect-[4/5]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:mt-6",
    material: "Alabaster & Statuario Marble",
    size: "Fine Art Galleries",
    masterworks: [
      {
        name: "Muralidhara in White Alabaster",
        material: "Pure White Alabaster",
        dimensions: "140 x 60 x 40 cm",
        weight: "220 kg",
        craftsmanship: "Exquisite micro-chiseling for ornaments, translucent hand-burnished finish.",
        significance: "Krishna playing his divine flute, whose melody draws all beings toward spiritual awakening. The semi-translucent alabaster glows ethereal under soft lighting.",
        description: "Crafted with elegant posture, showcasing a modern, minimal aesthetic that fits seamlessly into high-end contemporary home design while preserving classical proportions."
      }
    ]
  },
  {
    id: "05",
    title: "Buddha Sculptures",
    shortDesc: "Tranquil monumental carvings in deep meditation, radiating absolute mindfulness, balance, and quietude.",
    placeholderClass: "stone-placeholder-dark",
    aspect: "aspect-[3/4]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:translate-y-16",
    material: "Grey Granite & Ochre Sandstone",
    size: "Zen Sanctuaries",
    masterworks: [
      {
        name: "Nirvana Buddha in Ochre Sandstone",
        material: "Beige & Ochre Sandstone",
        dimensions: "160 x 120 x 70 cm",
        weight: "510 kg",
        craftsmanship: "Broad classical chiseling inspired by Gandhara art, smooth matte finish.",
        significance: "The Dhyana Mudra Buddha represents absolute inner peace and mindfulness. The earthy, porous texture of the sandstone evokes an ancient, timeless monastic quality.",
        description: "Ideal for modern meditation gardens, wellness suites, or absolute minimalist architectural spaces, this piece radiates calm and timelessness."
      }
    ]
  },
  {
    id: "06",
    title: "Lakshmi Sculptures",
    shortDesc: "The goddess of spiritual and material abundance, carved in luxurious pink sandstone and marble.",
    placeholderClass: "stone-placeholder-sandstone",
    aspect: "aspect-[4/5]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:mt-6",
    material: "Pink Sandstone & White Marble",
    size: "Bespoke Sanctums",
    masterworks: [
      {
        name: "Gaja Lakshmi in Pink Sandstone",
        material: "Pink Bansi Paharpur Sandstone",
        dimensions: "150 x 95 x 45 cm",
        weight: "440 kg",
        craftsmanship: "Exquisite low-relief and high-relief carving, traditional oil finish.",
        significance: "Represents spiritual prosperity and divine grace. Lakshmi is flanked by two elephants showering her with sacred water, invoking pure abundance and positive spatial energy.",
        description: "Carved with soft, fluid contours, this sandstone piece glows with a warm, subtle pink-orange tone, perfect for elegant formal entryways or spiritual spaces."
      }
    ]
  },
  {
    id: "07",
    title: "Saraswati Sculptures",
    shortDesc: "The embodiment of wisdom, sacred arts, and universal flow, sculpted in pristine Carrara-grade marble.",
    placeholderClass: "stone-placeholder-marble",
    aspect: "aspect-[3/4]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:translate-y-6",
    material: "Pure Carrara & Makrana Marble",
    size: "Private Libraries",
    masterworks: [
      {
        name: "Sharda Devi in Carrara Marble",
        material: "Premium Carrara Statuario Marble",
        dimensions: "135 x 70 x 50 cm",
        weight: "260 kg",
        craftsmanship: "Super-fine detail chiseling on the Veena and crown, silk-matte hand polish.",
        significance: "The goddess of learning, music, and cosmic sound. The purity of white marble represents transparent wisdom, untouched by worldly noise.",
        description: "A striking exhibition piece featuring an incredibly fine-carved Veena and delicate drapery. Perfect for private libraries, luxury home study suites, or premium institutional spaces."
      }
    ]
  },
  {
    id: "08",
    title: "Hanuman Sculptures",
    shortDesc: "Icons of infinite devotion, immense inner power, and protection, sculpted in absolute dark granite monoliths.",
    placeholderClass: "stone-placeholder-granite",
    aspect: "aspect-[4/5]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:mt-12",
    material: "Absolute Black & Grey Granite",
    size: "Grand Courtyards",
    masterworks: [
      {
        name: "Vira Hanuman in Grey Granite",
        material: "Bespoke Monolithic Grey Granite",
        dimensions: "190 x 85 x 55 cm",
        weight: "680 kg",
        craftsmanship: "Bold chiseled planes, highly structural modern muscle lines, fine chiseling on the mace (Gada).",
        significance: "The epitome of selfless service (Seva) and absolute courage. The dense, eternal granite monolith reflects unyielding strength and protection.",
        description: "A monumental masterwork designed as an imposing guardian for private estate entryways or grand outdoor courtyards. Weatherproof and eternal."
      }
    ]
  },
  {
    id: "09",
    title: "Nandi Sculptures",
    shortDesc: "The gatekeeper of Kailash, symbolizing patience, strength, and unwavering devotion, carved in dark granite.",
    placeholderClass: "stone-placeholder-dark",
    aspect: "aspect-[16/10]",
    gridClass: "col-span-1 md:col-span-12 lg:col-span-8 lg:mt-6",
    material: "Absolute Black Polish Granite",
    size: "Temple & Foyer Placements",
    masterworks: [
      {
        name: "Dharma Nandi in Polished Black Granite",
        material: "Absolute Dark Monolithic Granite",
        dimensions: "90 x 120 x 60 cm",
        weight: "480 kg",
        craftsmanship: "Highly stylized geometric body contours, deep hand burnishing to achieve a rich metallic sheen.",
        significance: "Symbolizes patient concentration and cosmic order (Dharma). The mirror-polished black granite body reflects surrounding architecture beautifully, blending art with space.",
        description: "Designed in an elegant, stylized silhouette that bridges heritage craftsmanship with contemporary Indian design, capturing Nandi's majestic strength."
      }
    ]
  },
  {
    id: "10",
    title: "Temple Architectural Carvings",
    shortDesc: "Intricate sandstone pillars, custom arches, and sacred structural relief carvings for high-end luxury temples.",
    placeholderClass: "stone-placeholder-sandstone",
    aspect: "aspect-[4/5]",
    gridClass: "col-span-1 md:col-span-6 lg:col-span-4 lg:translate-y-6",
    material: "Pink Bansi & Dholpur Sandstone",
    size: "Architectural Commissions",
    masterworks: [
      {
        name: "Sanctum Mandapam Relief Panels",
        material: "Warm Dholpur Sandstone",
        dimensions: "245 x 120 x 30 cm (Per Panel)",
        weight: "720 kg",
        craftsmanship: "Deep three-dimensional hand carving with intricate mandala floral geometry.",
        significance: "Architectural portals designed to separate the mundane world from the sacred space. Built on sacred math and classical Shilpa Shastra ratios.",
        description: "Bespoke architectural carvings designed in close collaboration with luxury architects to integrate seamlessly as focal accent walls in residential temples or luxury villas."
      }
    ]
  },
  {
    id: "11",
    title: "Custom Spiritual Installations",
    shortDesc: "Tailored sacred geometry, modern mandalas, and backlit spiritual art installations for elite residences.",
    placeholderClass: "stone-placeholder-marble",
    aspect: "aspect-[16/10]",
    gridClass: "col-span-1 md:col-span-12 lg:col-span-8 lg:mt-12",
    material: "Semi-precious Alabaster & Granite",
    size: "Bespoke Projects",
    masterworks: [
      {
        name: "Sahasrara Mandala Lit Wall",
        material: "Translucent White Alabaster & Granite Frame",
        dimensions: "200 x 200 x 15 cm",
        weight: "580 kg",
        craftsmanship: "Precise water-jet cut boundary combined with intricate manual relief chiseling, backlit channel integration.",
        significance: "Represents the crown chakra (Sahasrara) and cosmic unity. Softly backlit stone creates an ethereal glow, turning an entire lobby or meditation hall into a spiritual art gallery.",
        description: "Our hallmark architectural installation that combines semi-precious stone craft with modern luxury lighting design. Fully customized to spatial requirements."
      }
    ]
  }
];

export default function Collections() {
  const [activeCollection, setActiveCollection] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleOpenCollection = (collection) => {
    setActiveCollection(collection);
    setActiveTab(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCollection = () => {
    setActiveCollection(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section 
      id="collections" 
      className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden bg-brand-bg"
    >
      {/* Editorial Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end border-b luxury-divider pb-12 mb-16">
        <div className="max-w-xl space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase block font-light">
            01 // THE SACRED EXHIBITION
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-brand-charcoal leading-tight">
            Curated Deity Collections
          </h2>
          <p className="text-sm text-brand-grey font-light leading-relaxed">
            A museum-grade presentation of premium hand-carved Hindu deities and spiritual art. Sculpted from absolute stone monoliths, reflecting raw natural texture alongside exquisite, refined details.
          </p>
        </div>
        <div className="mt-6 lg:mt-0 flex flex-col items-start lg:items-end">
          <span className="text-xs uppercase tracking-[0.2em] font-light text-brand-charcoal block">
            SACRED ARTISTRY ATELIER
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] font-light text-brand-bronze block mt-1 italic">
            Museum-Grade Sculptures
          </span>
        </div>
      </div>

      {/* Asymmetric Grid Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12"
      >
        {collectionsList.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            onClick={() => handleOpenCollection(item)}
            className={`${item.gridClass} group flex flex-col cursor-pointer`}
          >
            {/* Visual Card Container */}
            <div className="relative overflow-hidden w-full h-full border border-brand-bronze/10 shadow-sm bg-brand-secondary/30 transition-all duration-700 group-hover:border-brand-bronze/35 group-hover:shadow-md">
              
              {/* Outer boundary padding line */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 z-20 pointer-events-none transition-all duration-500 group-hover:border-brand-bronze/20" />
              
              {/* Luxury Metadata overlay */}
              <div className="absolute top-6 left-6 z-20 flex justify-between right-6 text-[8px] tracking-[0.25em] uppercase text-brand-charcoal/60 font-light pointer-events-none">
                <span>ARCHIVE {item.id}</span>
                <span className="text-brand-bronze font-medium tracking-luxury">{item.size}</span>
              </div>

              {/* Main Image Aspect Container */}
              <div className={`${item.aspect} w-full overflow-hidden relative bg-brand-secondary`}>
                
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full ${item.placeholderClass} transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 flex items-center justify-center`}>
                    {/* Minimal geometric sculpture-like wireframe */}
                    <div className="w-20 h-20 border border-brand-bronze/15 rounded-full flex items-center justify-center opacity-65 group-hover:opacity-90 transition-opacity duration-700 relative">
                      <div className="w-12 h-12 border border-brand-bronze/25 rounded-md rotate-45" />
                    </div>
                  </div>
                )}

                {/* Subtle lighting / texture gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 via-brand-charcoal/10 to-transparent opacity-65 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                {/* Immersive overlay on hover */}
                <div className="absolute inset-0 bg-brand-dark/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-brand-sandstone font-medium mb-1">
                    ATELIER CATALOGUE
                  </span>
                  <p className="text-xs text-white/95 uppercase tracking-[0.2em] font-light leading-relaxed mb-4">
                    {item.material}
                  </p>
                  
                  <div className="w-full h-[1px] bg-brand-bronze/35 mb-3" />
                  
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white font-light flex items-center justify-between">
                    <span>View Exhibition Catalog</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-bronze transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Typography block below cards for high-end editorial look */}
            <div className="mt-6 px-1 flex justify-between items-start">
              <div className="max-w-[85%]">
                <h3 className="text-lg md:text-xl font-serif text-brand-charcoal font-medium tracking-wide group-hover:text-brand-bronze transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-grey font-light mt-1.5 leading-relaxed line-clamp-2">
                  {item.shortDesc}
                </p>
              </div>
              <span className="text-xs font-serif font-light text-brand-bronze italic pt-0.5 select-none">
                {item.id}
              </span>
            </div>
            
          </motion.div>
        ))}
      </motion.div>

      {/* FULLSCREEN EXHIBITION DIGITAL CATALOG OVERLAY (Detail Catalog Page) */}
      <AnimatePresence>
        {activeCollection && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md overflow-y-auto px-4 py-8 md:p-12 flex justify-center"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-brand-bg max-w-5xl w-full border border-brand-bronze/20 shadow-2xl relative flex flex-col my-auto"
            >
              {/* Subtle visual grain */}
              <div className="grain-overlay pointer-events-none opacity-[0.015]" />
              
              {/* Close Button */}
              <button 
                onClick={handleCloseCollection}
                className="absolute top-6 right-6 p-2 text-brand-charcoal hover:text-brand-bronze transition-colors border border-brand-bronze/10 hover:border-brand-bronze/30 rounded-full z-50 bg-brand-bg/80 backdrop-blur-sm"
                aria-label="Close Catalogue"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Museum Catalogue Header */}
              <div className="p-8 md:p-12 border-b border-brand-bronze/15 flex flex-col md:flex-row md:justify-between md:items-end space-y-4 md:space-y-0">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-[0.35em] text-brand-bronze uppercase block font-medium">
                    ARCHIVE COLLECTION // DEITY SERIES
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-charcoal">
                    {activeCollection.title}
                  </h2>
                </div>
                <div className="text-[10px] tracking-[0.25em] text-brand-grey uppercase font-light">
                  ATELIER ARCHIVE NO. {activeCollection.id}
                </div>
              </div>

              {/* Masterworks Exhibition Showcase */}
              <div className="p-8 md:p-12 flex-grow">
                {/* Tabs to select masterworks in the collection */}
                {activeCollection.masterworks.length > 1 && (
                  <div className="flex space-x-6 border-b border-brand-bronze/10 pb-4 mb-8">
                    {activeCollection.masterworks.map((work, idx) => (
                      <button
                        key={work.name}
                        onClick={() => setActiveTab(idx)}
                        className={`text-xs uppercase tracking-[0.2em] font-light pb-2 transition-all duration-300 relative ${
                          activeTab === idx 
                            ? 'text-brand-bronze font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-brand-bronze' 
                            : 'text-brand-grey hover:text-brand-charcoal'
                        }`}
                      >
                        {work.name.split(' in ')[0]}
                      </button>
                    ))}
                  </div>
                )}

                {/* Display Active Masterwork Details */}
                {(() => {
                  const work = activeCollection.masterworks[activeTab] || activeCollection.masterworks[0];
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      
                      {/* Left: Large Immersive Image Visual */}
                      <div className="lg:col-span-6 relative group border border-brand-bronze/15 bg-brand-secondary/40 aspect-[3/4] overflow-hidden">
                        
                        {work.image || activeCollection.image ? (
                          <img 
                            src={work.image || activeCollection.image} 
                            alt={work.name} 
                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-103"
                          />
                        ) : (
                          <div className={`w-full h-full ${activeCollection.placeholderClass} flex items-center justify-center`}>
                            <div className="w-24 h-24 border border-brand-bronze/15 rounded-full flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-brand-bronze/35" />
                            </div>
                          </div>
                        )}

                        {/* Shadows for visual depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-transparent opacity-50 pointer-events-none" />
                        
                        <div className="absolute bottom-6 left-6 text-left pointer-events-none">
                          <p className="text-[8px] tracking-[0.25em] text-white/60 uppercase">MATERIAL SPECIFICATION</p>
                          <p className="text-xs text-brand-sandstone font-serif mt-0.5">{work.material}</p>
                        </div>
                      </div>

                      {/* Right: Technical specifications and storytelling */}
                      <div className="lg:col-span-6 flex flex-col space-y-6">
                        <div>
                          <h4 className="text-xl font-serif text-brand-charcoal font-medium">
                            {work.name}
                          </h4>
                          <span className="text-[10px] tracking-[0.25em] text-brand-bronze uppercase block font-light mt-1.5">
                            {work.material}
                          </span>
                        </div>

                        {/* Technical Data Grid */}
                        <div className="grid grid-cols-2 gap-4 border-t border-b border-brand-bronze/15 py-4 text-xs font-light text-brand-grey leading-relaxed">
                          <div>
                            <span className="block text-[8px] tracking-[0.25em] text-brand-bronze uppercase font-medium">DIMENSIONS</span>
                            <span className="text-brand-charcoal font-medium flex items-center mt-1">
                              <Ruler className="w-3.5 h-3.5 mr-1.5 text-brand-bronze stroke-[1.25]" />
                              {work.dimensions}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[8px] tracking-[0.25em] text-brand-bronze uppercase font-medium">NET WEIGHT</span>
                            <span className="text-brand-charcoal font-medium mt-1 block">~ {work.weight}</span>
                          </div>
                        </div>

                        {/* Storytelling Content */}
                        <div className="space-y-4 text-xs text-brand-grey font-light leading-relaxed">
                          <div>
                            <span className="block text-[8px] tracking-[0.25em] text-brand-bronze uppercase font-medium mb-1">
                              SACRED SYMBOLISM & SIGNIFICANCE
                            </span>
                            <p className="text-brand-charcoal/90 italic font-serif bg-brand-secondary/40 p-3 border-l-2 border-brand-bronze">
                              {work.significance}
                            </p>
                          </div>
                          <div>
                            <span className="block text-[8px] tracking-[0.25em] text-brand-bronze uppercase font-medium mb-1">
                              CRAFTSMANSHIP AND TECHNIQUE
                            </span>
                            <p>{work.craftsmanship}</p>
                          </div>
                          <div>
                            <span className="block text-[8px] tracking-[0.25em] text-brand-bronze uppercase font-medium mb-1">
                              EXHIBIT DESCRIPTION
                            </span>
                            <p>{work.description}</p>
                          </div>
                        </div>

                        {/* Custom Commission Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                          <a
                            href="#inquire"
                            onClick={(e) => {
                              handleCloseCollection();
                              const element = document.getElementById('inquire');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="flex-1 py-3 text-center bg-brand-bronze text-brand-bg hover:bg-brand-deepbrown transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light shadow-md"
                          >
                            Commission Sacred Art
                          </a>
                          <a
                            href="#inquire"
                            onClick={(e) => {
                              handleCloseCollection();
                              const element = document.getElementById('inquire');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="flex-grow py-3 text-center border border-brand-bronze/35 text-brand-charcoal hover:bg-brand-secondary transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light"
                          >
                            Acquire Private Catalogue
                          </a>
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Catalogue Footer */}
              <div className="p-6 md:px-12 border-t border-brand-bronze/10 text-[8px] tracking-[0.25em] uppercase text-brand-grey font-light flex justify-between items-center bg-brand-secondary/20">
                <span>Sudarshan Crafts Luxury Sculpture Atelier</span>
                <span className="hidden sm:inline">Handcrafted In India // Exhibited Globally</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
