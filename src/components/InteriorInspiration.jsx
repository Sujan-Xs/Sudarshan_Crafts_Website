import React, { useState } from 'react';
import { Eye, Map } from 'lucide-react';
import { usePhotos } from '../hooks/usePhotos';
import { bulkGalleryItems } from '../gallery_data';

const inspirationItems = [
  {
    id: 1,
    title: "Bel Air Luxury Sanctuary Foyer",
    description: "Our monumental Vinayaka in pure White Makrana Marble stands as a breathtaking centerpiece under a grand 6-meter skylit foyer.",
    location: "Los Angeles, CA",
    statueName: "Vinayaka in White Makrana Marble",
    material: "Makrana Marble",
    placeholderClass: "stone-placeholder-marble",
    heightClass: "h-[360px]",
    category: "Stone Sculpture"
  },
  {
    id: 2,
    title: "Kyoto Zen Reflection Courtyard",
    description: "A dark basalt Dhyana Shiva sculpture integrated within a minimalist dry stone and moss garden, invoking profound cosmic stillness.",
    location: "Kyoto, Japan",
    statueName: "Dhyana Shiva in Dark Basalt",
    material: "Dark Basalt",
    placeholderClass: "stone-placeholder-granite",
    heightClass: "h-[460px]",
    category: "Stone Sculpture"
  },
  {
    id: 3,
    title: "Zurich Wellness Resort Lobby",
    description: "A bespoke backlit Alabaster custom installation casting warm, tranquil geometric shadow patterns across an elite alpine spa lobby.",
    location: "Zurich, Switzerland",
    statueName: "Backlit Alabaster Mandala",
    material: "Alabaster",
    placeholderClass: "stone-placeholder-dark",
    heightClass: "h-[300px]",
    category: "Stone Sculpture"
  },
  {
    id: 4,
    title: "Udaipur Heritage Villa Courtyard",
    description: "An intricate Gaja Lakshmi pink sandstone sculpture framing a heritage archway, set next to a quiet water-reflection pool.",
    location: "Rajasthan, India",
    statueName: "Gaja Lakshmi in Pink Sandstone",
    material: "Pink Sandstone",
    placeholderClass: "stone-placeholder-sandstone",
    heightClass: "h-[380px]",
    category: "Stone Sculpture"
  },
  {
    id: 5,
    title: "New Delhi Penthouse Puja Atrium",
    description: "A gorgeous Radha Krishna sandstone relief situated in a spiritual corner of a modern penthouse, interacting with daylong soft natural light.",
    location: "New Delhi, India",
    statueName: "Radha Krishna Sandstone Relief",
    material: "Sandstone",
    placeholderClass: "stone-placeholder-sandstone",
    heightClass: "h-[420px]",
    category: "Stone Sculpture"
  },
  {
    id: 6,
    title: "Mallorca Meditation Pavilion",
    description: "A serene beige sandstone Nirvana Buddha placed under an open-air stone pavilion, overlooking the infinite calm of the Mediterranean Sea.",
    location: "Mallorca, Spain",
    statueName: "Nirvana Buddha in Beige Sandstone",
    material: "Beige Sandstone",
    placeholderClass: "stone-placeholder-marble",
    heightClass: "h-[330px]",
    category: "Stone Sculpture"
  },
  {
    id: 7,
    title: "Bali Tropical Estate Veranda",
    description: "A deeply textured Neem wood carving depicting heritage motifs, effortlessly blending with the lush tropical surroundings of an open-air veranda.",
    location: "Bali, Indonesia",
    statueName: "Neem Wood Heritage Carving",
    material: "Neem Wood",
    placeholderClass: "stone-placeholder-sandstone",
    heightClass: "h-[320px]",
    category: "Wooden Sculpture"
  },
  {
    id: 8,
    title: "Dubai Skyline Penthouse",
    description: "A gleaming bronze monumental casting that catches the golden hour light, reflecting the opulent surroundings of a modern desert metropolis.",
    location: "Dubai, UAE",
    statueName: "Bronze Monumental Casting",
    material: "Bronze",
    placeholderClass: "stone-placeholder-granite",
    heightClass: "h-[400px]",
    category: "Metal Work"
  }
];

const categories = ['All', 'Stone Sculpture', 'Wooden Sculpture', 'Metal Work', 'Fiber Glass', 'Paintings'];

export default function InteriorInspiration() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { statues: customStatues } = usePhotos();

  // Map custom statues to match the inspirationItems schema
  const mappedCustomStatues = customStatues.map((statue, idx) => ({
    id: `custom-${statue.id}`,
    statueName: statue.statueName,
    material: statue.material || "Custom Material",
    description: statue.description,
    image: statue.image,
    title: "Custom Placement",
    location: "Gallery Collection",
    placeholderClass: "stone-placeholder-marble", // default fallback
    heightClass: idx % 2 === 0 ? "h-[380px]" : "h-[460px]",
    category: "Stone Sculpture" // Default to stone sculpture so it shows up in a category
  }));

  // Safely integrate bulk items if they exist
  const safeBulkItems = typeof bulkGalleryItems !== 'undefined' ? bulkGalleryItems : [];

  const allItems = [...safeBulkItems, ...mappedCustomStatues];

  const filteredItems = allItems.filter(item =>
    activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section
      id="inspirations"
      className="pt-12 md:pt-16 pb-24 md:pb-36 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end border-b luxury-divider pb-12 mb-16">
        <div className="max-w-xl space-y-4">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#6E4A2E] italic"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Sculptural Archive
          </h2>
          <p className="text-sm text-[#6E4A2E]/90 font-light leading-relaxed">
            Venture into our archive, home to numerous pieces of bespoke artistry.
          </p>
        </div>
      </div>



      {/* Modern Pinterest Masonry Column Grid or Empty State */}
      {filteredItems.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 min-h-[400px]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden w-full ${!item.image ? (item.heightClass || 'h-[400px]') : ''} ${!item.image ? item.placeholderClass : ''} break-inside-avoid border border-brand-bronze/10 bg-brand-sand/15 transition-all duration-500 hover:border-brand-bronze/35 hover:shadow-lg`}
            >
              {/* Fine boundary borders */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 pointer-events-none transition-all duration-500 group-hover:border-brand-bronze/15 z-20" />

              {/* Content Area */}
              <div className="relative overflow-hidden flex items-center justify-center">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.statueName || item.title}
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-auto block transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                  />
                ) : (
                  <div className={`w-full h-full ${item.heightClass} transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/25 via-transparent to-white/15 pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <div className="w-14 h-14 border border-brand-bronze/15 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 border border-brand-bronze/20 rounded-md rotate-12" />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Caption beneath images */}
              <div className="p-5 border-t border-brand-bronze/10 bg-brand-bg/50 flex flex-col space-y-3">
                <h4 className="text-xs uppercase tracking-[0.15em] font-medium text-brand-charcoal pr-4">
                  {item.statueName}
                </h4>
                <div className="w-8 h-[1px] bg-brand-bronze" />
                <p className="text-[11px] text-brand-grey font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-32 border border-brand-bronze/10 bg-brand-sand/5">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-bronze mb-4">Collection Update</span>
          <p className="text-brand-charcoal font-light italic max-w-md leading-relaxed text-sm">
            Explore our exquisite custom formations for this <br className="hidden sm:block" /> category in our physical gallery.
          </p>
        </div>
      )}
    </section>
  );
}
