import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import InteriorInspiration from './InteriorInspiration';

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-brand-bg">
      <div className="grain-overlay" />
      <Navbar />
      <main className="relative z-10 pt-12 md:pt-20">
        <InteriorInspiration />
      </main>
      <Footer />
    </div>
  );
}
