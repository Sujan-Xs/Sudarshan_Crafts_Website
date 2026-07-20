import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const categories = [
    {
      title: "Stone Sculpture",
      items: [
        "Odisha Red Stone",
        "Odisha Green Stone",
        "Odisha White Stone",
        "Odisha Sand Stone",
        "Odisha Black Stone",
        "Soft Green Stone",
        "Tenali Stone",
        "Rajasthan Red & White Stone"
      ]
    },
    {
      title: "Wooden Sculpture",
      items: [
        "Gamvar Wood",
        "Tike Wood",
        "Neem Wood"
      ]
    },
    {
      title: "Metal Work",
      items: [
        "Brass Work",
        "Bronze work"
      ]
    },
    {
      title: "Fiber Glass",
      items: []
    },
    {
      title: "Paintings",
      items: [
        "Silk Panting",
        "Patta Painting"
      ]
    }
  ];

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 relative overflow-hidden bg-brand-secondary/30">
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 text-[10px] tracking-[0.25em] text-brand-bronze uppercase mb-4">
            <span className="w-1 h-1 rounded-full bg-brand-bronze" />
            <span>Masterpieces</span>
            <span className="w-1 h-1 rounded-full bg-brand-bronze" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-charcoal">
            The Collections Gallery
          </h2>
        </div>

        {/* Gallery Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, idx) => (
            <div
              key={category.title}
              className="bg-brand-bg border border-brand-bronze/20 p-8 hover:shadow-[0_10px_30px_rgba(154,118,82,0.1)] transition-shadow duration-500 flex flex-col"
            >
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-brand-bronze/20">
                <span className="text-2xl font-serif font-light text-brand-bronze">0{idx + 1}.</span>
                <h3 className="text-xl font-serif font-medium text-brand-charcoal">{category.title}</h3>
              </div>
              
              {category.items.length > 0 ? (
                <ul className="space-y-4 flex-grow">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start space-x-3 text-brand-grey">
                      <span className="text-brand-bronze text-[10px] uppercase tracking-wider font-medium mt-1">
                        {String.fromCharCode(65 + itemIdx)}.
                      </span>
                      <span className="text-sm font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex-grow flex items-center text-sm font-light text-brand-grey italic">
                  Explore our exquisite custom fiber glass formations in our physical gallery.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action for Visual Gallery */}
        <div
          className="mt-20 text-center"
        >
          <Link
            to="/gallery"
            className="inline-block py-4 px-10 border border-brand-bronze/50 text-brand-charcoal hover:bg-brand-bronze hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light shadow-sm"
          >
            Explore Visual Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}
