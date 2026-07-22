import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import InteriorInspiration from './InteriorInspiration';
import SEO from './SEO';

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-brand-bg">
      <SEO 
        title="Sudarshan Crafts Gallery | Custom Hindu God Statues & Masterpiece Sculptures"
        description="Explore our exclusive gallery of premium handcrafted stone sculptures and custom Hindu God statues. From majestic Ganesha idols to intricate traditional art, crafted by Odisha's master artisans."
        url="https://www.sudarshancrafts.com/gallery"
        schema={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Sudarshan Crafts Sculpture Gallery",
          "description": "Gallery of premium handcrafted Hindu deity stone sculptures and traditional Odisha stone carvings.",
          "url": "https://www.sudarshancrafts.com/gallery"
        }}
      />
      <div className="grain-overlay" />
      <Navbar />
      <main className="relative z-10 pt-12 md:pt-20">
        <InteriorInspiration />
      </main>
      <Footer />
    </div>
  );
}
