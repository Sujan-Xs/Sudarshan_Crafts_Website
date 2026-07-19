import { useState, useEffect } from 'react';

// Default custom statues to use if localStorage is empty
const defaultStatues = [];

export function usePhotos() {
  const [statues, setStatues] = useState(defaultStatues);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sudarshan_statues');
      if (stored) {
        setStatues(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load statues from local storage', e);
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

  return { statues, addStatue, removeStatue, isLoaded };
}
