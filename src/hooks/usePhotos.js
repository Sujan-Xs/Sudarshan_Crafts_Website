import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const defaultSliderImages = [];

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

      if (statuesRes.data) {
        const mappedStatues = statuesRes.data.map(s => ({
          ...s,
          statueName: s.statuename // Map database 'statuename' to frontend 'statueName'
        }));
        setStatues(mappedStatues);
      }
      
      if (sliderRes.data && sliderRes.data.length > 0) setSliderImages(sliderRes.data);
      if (mobileSliderRes.data && mobileSliderRes.data.length > 0) setMobileSliderImages(mobileSliderRes.data);
    } catch (e) {
      console.error('Failed to load from Supabase', e);
    }
    setIsLoaded(true);
  };

  const addStatue = async (statue) => {
    const id = Date.now().toString();
    const optimisticStatue = { ...statue, id };
    setStatues(prev => [...prev, optimisticStatue]);
    
    const dbPayload = {
      id,
      statuename: statue.statueName, // Map frontend 'statueName' to database 'statuename'
      material: statue.material,
      description: statue.description,
      image: statue.image
    };

    const { data, error } = await supabase.from('custom_statues').insert([dbPayload]).select();
    
    if (error) {
      console.error("Error inserting statue:", error);
      setStatues(prev => prev.filter(s => s.id !== id));
      alert("Failed to save to database: " + error.message);
    } else if (data && data.length > 0) {
      const mapped = { ...data[0], statueName: data[0].statuename };
      setStatues(prev => prev.map(s => s.id === id ? mapped : s));
    }
  };

  const removeStatue = async (id) => {
    setStatues(prev => prev.filter(s => s.id !== id));
    await supabase.from('custom_statues').delete().eq('id', id);
  };

  const addSliderImage = async (image) => {
    const id = Date.now().toString();
    const optimisticItem = { image, id };
    setSliderImages(prev => [...prev.filter(img => !img.id.startsWith('default_')), optimisticItem]);
    
    const { data, error } = await supabase.from('slider_images').insert([{ id, image }]).select();
    if (error) {
      console.error("Error inserting slider image:", error);
      setSliderImages(prev => prev.filter(s => s.id !== id));
      alert("Failed to save to database: " + error.message);
    } else if (data && data.length > 0) {
      setSliderImages(prev => prev.map(s => s.id === id ? data[0] : s));
    }
  };

  const removeSliderImage = async (id) => {
    setSliderImages(prev => prev.filter(s => s.id !== id));
    await supabase.from('slider_images').delete().eq('id', id);
  };

  const addMobileSliderImage = async (image) => {
    const id = Date.now().toString();
    const optimisticItem = { image, id };
    setMobileSliderImages(prev => [...prev.filter(img => !img.id.startsWith('default_')), optimisticItem]);
    
    const { data, error } = await supabase.from('mobile_slider_images').insert([{ id, image }]).select();
    if (error) {
      console.error("Error inserting mobile slider image:", error);
      setMobileSliderImages(prev => prev.filter(s => s.id !== id));
      alert("Failed to save to database: " + error.message);
    } else if (data && data.length > 0) {
      setMobileSliderImages(prev => prev.map(s => s.id === id ? data[0] : s));
    }
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
