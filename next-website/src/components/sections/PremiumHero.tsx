"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeScene from '@/components/three/PremiumThreeScene';
import { animateWordsIn, splitTextToWords } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlay reveal
      gsap.to(overlayRef.current, {
        height: '0%',
        duration: 1.5,
        ease: 'power4.inOut',
        delay: 0.2,
      });

      // Word-by-word heading animation
      if (headingRef.current) {
        const [words] = splitTextToWords(headingRef.current);
        animateWordsIn(words, {
          from: { y: 80, opacity: 0, rotateX: -45 },
          to: {
            duration: 1.5,
            stagger: 0.03,
            ease: 'power4.out',
            delay: 0.8,
          },
        });
      }

      // Subtitle fade up
      gsap.fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.5 }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Three.js Interactive Background */}
      <ThreeScene />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

      {/* Reveal Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-20 origin-top"
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <p
          ref={subRef}
          className="text-blue-400 uppercase tracking-[0.3em] mb-6 text-sm font-semibold opacity-0"
        >
          Premium Interior Design &amp; Turnkey Solutions
        </p>

        <h1
          ref={headingRef}
          className="text-6xl md:text-8xl lg:text-[120px] font-extrabold text-white tracking-tighter leading-[0.9] mb-8"
          style={{ perspective: '1000px' }}
        >
          Turning Vision Into Reality
        </h1>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="/projects"
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 text-lg"
          >
            View Our Work
          </a>
          <a
            href="/contact"
            className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 opacity-0 animate-pulse">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-blue-400/60 to-transparent" />
      </div>
    </section>
  );
}
