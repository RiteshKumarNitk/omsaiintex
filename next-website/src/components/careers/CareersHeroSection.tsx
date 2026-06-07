'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

export default React.memo(function CareersHeroSection() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        height: '0%', duration: 1.5, ease: 'power4.inOut',
      });

      if (headingRef.current) {
        const [words] = splitTextToWords(headingRef.current);
        animateWordsIn(words, {
          from: { y: 60, opacity: 0, rotateX: -30 },
          to: { duration: 1.2, stagger: 0.03, ease: 'power4.out', delay: 0.6 },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/2023/04/career-banner.png"
          alt="Career with us"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div ref={overlayRef} className="absolute inset-0 bg-black z-20 origin-top" />
      <div className="relative z-30 text-center px-6">
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-white leading-tight"
          style={{ perspective: '1200px', fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Career with us
        </h1>
      </div>
    </section>
  );
});
