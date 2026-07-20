import { useState, useEffect } from 'react';

// Default custom statues to use if localStorage is empty
const defaultStatues = [];
const defaultSliderImages = [
  { id: 'default_1', image: "/images/gallery_custom_1.avif" },
  { id: 'default_2', image: "/images/gallery_custom_2.avif" },
  { id: 'default_3', image: "/images/gallery_custom_3.avif" },
  { id: 'default_4', image: "/images/gallery_custom_4.avif" }
];

export function usePhotos() {
  const [statues, setStatues] = useState(defaultStatues);
  const [sliderImages, setSliderImages] = useState(defaultSliderImages);
  const [mobileSliderImages, setMobileSliderImages] = useState(defaultSliderImages);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedStatues = localStorage.getItem('sudarshan_statues');
      if (storedStatues) {
        setStatues(JSON.parse(storedStatues));
      }
      
      const storedSlider = localStorage.getItem('sudarshan_slider_images');
      if (storedSlider) {
        setSliderImages(JSON.parse(storedSlider));
      }

      const storedMobileSlider = localStorage.getItem('sudarshan_mobile_slider_images');
      if (storedMobileSlider) {
        setMobileSliderImages(JSON.parse(storedMobileSlider));
      }
    } catch (e) {
      console.error('Failed to load from local storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever statues change
  const addStatue = (statue) => {
    const newStatues = [...statues, { ...statue, id: Date.now().toString() }];
    setStatues(newStatues);
    localStorage.setItem('sudarshan_statues', JSON.stringify(newStatues));
  };

  const removeStatue = (id) => {
    const newStatues = statues.filter(s => s.id !== id);
    setStatues(newStatues);
    localStorage.setItem('sudarshan_statues', JSON.stringify(newStatues));
  };

  const addSliderImage = (image) => {
    const newSliderImages = [...sliderImages, { image, id: Date.now().toString() }];
    setSliderImages(newSliderImages);
    localStorage.setItem('sudarshan_slider_images', JSON.stringify(newSliderImages));
  };

  const removeSliderImage = (id) => {
    const newSliderImages = sliderImages.filter(s => s.id !== id);
    setSliderImages(newSliderImages);
    localStorage.setItem('sudarshan_slider_images', JSON.stringify(newSliderImages));
  };

  const addMobileSliderImage = (image) => {
    const newImages = [...mobileSliderImages, { image, id: Date.now().toString() }];
    setMobileSliderImages(newImages);
    localStorage.setItem('sudarshan_mobile_slider_images', JSON.stringify(newImages));
  };

  const removeMobileSliderImage = (id) => {
    const newImages = mobileSliderImages.filter(s => s.id !== id);
    setMobileSliderImages(newImages);
    localStorage.setItem('sudarshan_mobile_slider_images', JSON.stringify(newImages));
  };

  return { 
    statues, addStatue, removeStatue, 
    sliderImages, addSliderImage, removeSliderImage,
    mobileSliderImages, addMobileSliderImage, removeMobileSliderImage,
    isLoaded 
  };
}
