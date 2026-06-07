'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSlideShowOptions {
  /** Total number of slides */
  totalSlides: number;
  /** Auto-advance interval in milliseconds */
  interval?: number;
}

export function useSlideShow({ totalSlides, interval = 5000 }: UseSlideShowOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, interval);
    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return { currentIndex, goToSlide };
}
