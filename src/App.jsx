import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import GalleryPage from './components/GalleryPage';
import SEO from './components/SEO';

function MainWebsite() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="relative">
      <SEO 
        title="Sudarshan Crafts | Custom Stone Sculptures & Premium Hindu Deity Idols"
        description="Discover Sudarshan Crafts by Master Sculptor Shri Sudarshan Sahoo. We create premium handcrafted Hindu deity stone sculptures and custom statues in marble, sandstone, and granite, preserving traditional Odisha temple architecture."
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://www.sudarshancrafts.com/#localbusiness",
              "name": "Sudarshan Crafts",
              "image": "https://www.sudarshancrafts.com/images/sudarshan-sahoo.avif",
              "url": "https://www.sudarshancrafts.com/",
              "description": "Premium handcrafted Hindu deity stone sculptures and traditional Odisha stone carvings by Padma Vibhushan Master Craftsman Shri Sudarshan Sahoo.",
              "founder": {
                "@type": "Person",
                "name": "Shri Sudarshan Sahoo"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhubaneswar",
                "addressRegion": "Odisha",
                "addressCountry": "IN"
              }
            },
            {
              "@type": "WebPage",
              "@id": "https://www.sudarshancrafts.com/#webpage",
              "url": "https://www.sudarshancrafts.com/",
              "name": "Sudarshan Crafts | Custom Stone Sculptures & Premium Hindu Deity Idols",
              "isPartOf": {
                "@id": "https://www.sudarshancrafts.com/#website"
              }
            },
            {
              "@type": "Website",
              "@id": "https://www.sudarshancrafts.com/#website",
              "url": "https://www.sudarshancrafts.com/",
              "name": "Sudarshan Crafts"
            }
          ]
        }}
      />
      <div className="grain-overlay" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainWebsite />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}
