'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import HeroThreeScene from '@/components/three/HeroThreeScene';
import { useHeroAnimation } from '@/hooks/animations/useHeroAnimation';
import { useSlideShow } from '@/hooks/animations/useSlideShow';
import { slides } from '@/data/home/slides';

export default React.memo(function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);

  const { currentIndex: slideIdx, goToSlide } = useSlideShow({ totalSlides: slides.length });

  useHeroAnimation({ overlayRef, heroContentRef, heroTitleRef, heroButtonsRef, heroRef });

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide absolute inset-0 z-[1] transition-all duration-1000 ease-in-out ${
            i === slideIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />
      {/* Curtain overlay for entrance */}
      <div ref={overlayRef} className="absolute inset-0 bg-black z-20 origin-top" />

      {/* Hero content */}
      <div ref={heroContentRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
        <p
          className="hero-tagline text-white/60 text-sm md:text-base uppercase tracking-[0.25em] mb-4 font-light"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Om Sai Intex — Premium Turnkey Solutions
        </p>
        <div ref={heroTitleRef}>
          <h1
            className="text-[3rem] md:text-[6.25rem] font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', perspective: '1200px' }}
          >
            <span className="text-outline">{slides[slideIdx].title}</span><br />
            <span className="text-[#0065AC]">{slides[slideIdx].subtitle}</span>
          </h1>
        </div>
        <p
          className="hero-subtitle mt-6 text-white/70 text-lg md:text-xl max-w-xl font-light"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Creating spatially exciting workspaces tuned to its people
        </p>
        <div ref={heroButtonsRef} className="mt-10 flex gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-3.5 bg-[#0065AC] text-white font-medium rounded hover:bg-[#00508A] transition-all duration-300 text-base"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Explore Our Work
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-all duration-300 text-base"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Three.js background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <HeroThreeScene />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-500 rounded-full ${
              i === slideIdx ? 'w-10 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
});
