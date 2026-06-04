"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
    if (clipRef.current) {
      clipRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }
    if (sliderRef.current) {
      sliderRef.current.style.left = `${percent}%`;
    }
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleMove]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Before &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">After</span>
          </h2>
          <p className="text-gray-400 text-lg">Drag the slider to see the transformation</p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-xl overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchMove={(e) => {
            handleMove(e.touches[0].clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Before Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-600 text-center">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-semibold opacity-40">Before</span>
            </div>
          </div>

          {/* After Image (Clipped) */}
          <div
            ref={clipRef}
            className="absolute inset-0"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-emerald-900/50 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-20 h-20 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg font-semibold opacity-60">After</span>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white z-10"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform ${isDragging ? 'scale-110' : ''}`}
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">Before</span>
          <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">After</span>
        </div>
      </div>
    </section>
  );
}
