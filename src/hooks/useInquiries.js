import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setInquiries(data);
      }
    } catch (e) {
      console.error('Failed to load inquiries from Supabase', e);
    }
    setIsLoaded(true);
  };

  const addInquiry = async (inquiryData) => {
    const newInquiry = { ...inquiryData, created_at: new Date().toISOString() };
    
    // Optimistically update UI
    setInquiries(prev => [newInquiry, ...prev]);
    
    const { error } = await supabase.from('inquiries').insert([newInquiry]);
    if (error) {
      console.error("Error inserting inquiry:", error);
      throw error;
    }
  };

  const removeInquiry = async (id) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    await supabase.from('inquiries').delete().eq('id', id);
  };

  return { 
    inquiries, 
    addInquiry, 
    removeInquiry,
    isLoaded 
  };
}
