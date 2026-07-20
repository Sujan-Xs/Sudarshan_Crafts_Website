import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const defaultSliderImages = [
  { id: 'default_1', image: "/images/gallery_custom_1.avif" },
  { id: 'default_2', image: "/images/gallery_custom_2.avif" },
  { id: 'default_3', image: "/images/gallery_custom_3.avif" },
  { id: 'default_4', image: "/images/gallery_custom_4.avif" }
];

export function usePhotos() {
  const [statues, setStatues] = useState([]);
  const [sliderImages, setSliderImages] = useState(defaultSliderImages);
  const [mobileSliderImages, setMobileSliderImages] = useState(defaultSliderImages);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statuesRes, sliderRes, mobileSliderRes] = await Promise.all([
        supabase.from('custom_statues').select('*').order('created_at', { ascending: true }),
        supabase.from('slider_images').select('*').order('created_at', { ascending: true }),
        supabase.from('mobile_slider_images').select('*').order('created_at', { ascending: true }),
      ]);

      if (statuesRes.data) setStatues(statuesRes.data);
      
      if (sliderRes.data && sliderRes.data.length > 0) setSliderImages(sliderRes.data);
      if (mobileSliderRes.data && mobileSliderRes.data.length > 0) setMobileSliderImages(mobileSliderRes.data);
    } catch (e) {
      console.error('Failed to load from Supabase', e);
    }
    setIsLoaded(true);
  };

  const addStatue = async (statue) => {
    const newStatue = { ...statue, id: Date.now().toString() };
    setStatues(prev => [...prev, newStatue]);
    const { error } = await supabase.from('custom_statues').insert([newStatue]);
    if (error) console.error("Error inserting statue:", error);
  };

  const removeStatue = async (id) => {
    setStatues(prev => prev.filter(s => s.id !== id));
    await supabase.from('custom_statues').delete().eq('id', id);
  };

  const addSliderImage = async (image) => {
    const newItem = { image, id: Date.now().toString() };
    setSliderImages(prev => [...prev.filter(img => !img.id.startsWith('default_')), newItem]);
    await supabase.from('slider_images').insert([newItem]);
  };

  const removeSliderImage = async (id) => {
    setSliderImages(prev => prev.filter(s => s.id !== id));
    await supabase.from('slider_images').delete().eq('id', id);
  };

  const addMobileSliderImage = async (image) => {
    const newItem = { image, id: Date.now().toString() };
    setMobileSliderImages(prev => [...prev.filter(img => !img.id.startsWith('default_')), newItem]);
    await supabase.from('mobile_slider_images').insert([newItem]);
  };

  const removeMobileSliderImage = async (id) => {
    setMobileSliderImages(prev => prev.filter(s => s.id !== id));
    await supabase.from('mobile_slider_images').delete().eq('id', id);
  };

  return { 
    statues, addStatue, removeStatue, 
    sliderImages, addSliderImage, removeSliderImage,
    mobileSliderImages, addMobileSliderImage, removeMobileSliderImage,
    isLoaded 
  };
}
