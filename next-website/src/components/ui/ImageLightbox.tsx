'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface ImageLightboxProps {
  images: string[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
  alt?: string;
}

export default React.memo(function ImageLightbox({ images, isOpen, initialIndex, onClose, alt = '' }: ImageLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    // Animate in
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(contentRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
    );

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = direction === 'next'
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;

    gsap.to(contentRef.current, {
      x: direction === 'next' ? -50 : 50,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.fromTo(contentRef.current,
          { x: direction === 'next' ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
        );
      }
    });
  }, [currentIndex, images.length, isAnimating]);

  const handleClose = useCallback(() => {
    gsap.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.out', delay: 0.1,
      onComplete: onClose
    });
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, navigate]);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 'next' : 'prev');
    }
  }, [navigate]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={handleClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-50 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
        <span className="text-white/70 text-sm font-mono">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('next'); }}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image */}
      <div
        ref={contentRef}
        className="relative w-[90vw] h-[80vh] max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-16 h-12 relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                idx === currentIndex ? 'border-[#0065AC] scale-110' : 'border-white/20 opacity-50 hover:opacity-75'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
