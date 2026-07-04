import React, { useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Craftsmanship from './components/Craftsmanship';
import SignaturePieces from './components/SignaturePieces';
import AboutBrand from './components/AboutBrand';
import InteriorInspiration from './components/InteriorInspiration';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 1. Museum Loader Intro */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Main website wrappers - rendered under opacity fade once loading is complete */}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        
        {/* 2. Global Stone-Grain Noise Overlay (Adds authentic museum grit) */}
        <div className="grain-overlay" />

        {/* 3. Sticky Luxury Navbar */}
        <Navbar />

        {/* 4. Main Exhibition Spatials */}
        <main className="relative z-10">
          {/* Hero Fold */}
          <Hero />
          
          {/* Asymmetrical Collections Grid */}
          <Collections />
          
          {/* Craft & Artisanship Storytelling */}
          <Craftsmanship />
          
          {/* Horizontal Signature Gallery */}
          <SignaturePieces />
          
          {/* Atelier Core Credo & Philosophy */}
          <AboutBrand />
          
          {/* Spatial Architecture Masonry Placements */}
          <InteriorInspiration />
          
          {/* Proof of Provenance & Testimonials */}
          <Testimonials />
          
          {/* Dark luxury Acquisitions Inquiries Form */}
          <ContactForm />
        </main>

        {/* 5. Directory Footer */}
        <Footer />
        
      </div>
    </>
  );
}
