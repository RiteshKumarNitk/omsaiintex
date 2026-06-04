"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

export default function CareersHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const [words] = splitTextToWords(headingRef.current);
        animateWordsIn(words, {
          from: { y: 60, opacity: 0, rotateX: -30 },
          to: { duration: 1.2, stagger: 0.03, ease: 'power4.out' },
        });
      }
      gsap.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[60vh] flex items-center justify-center bg-black overflow-hidden pt-28">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-black/50" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <p ref={subRef} className="text-emerald-400 uppercase tracking-[0.3em] text-sm font-semibold mb-6 opacity-0">Join Our Team</p>
        <h1 ref={headingRef} className="text-5xl md:text-7xl lg:text-[90px] font-bold text-white leading-tight" style={{ perspective: '1000px' }}>
          <span className="text-gradient">Careers</span>
        </h1>
        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Join a team of passionate professionals building the future of workspaces.
        </p>
      </div>
    </section>
  );
}
