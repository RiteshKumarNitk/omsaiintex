'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

export default React.memo(function ProjectsHeroSection() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { height: '0%', duration: 1.5, ease: 'power4.inOut' });
      }
      if (headingRef.current) {
        const [words] = splitTextToWords(headingRef.current);
        animateWordsIn(words, { from: { y: 60, opacity: 0 }, to: { duration: 1, stagger: 0.04, ease: 'power4.out', delay: 0.6 } });
      }
      gsap.fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute" style={{ width: 'min(425px, 60vw)', top: '-8vw', left: '0%' }}>
          <Image src="/assets/custom/office_sketch.png" alt="" width={425} height={600} className="float-img w-full h-auto opacity-30 md:opacity-60" unoptimized />
        </div>
        <div className="absolute hidden md:block" style={{ width: '225px', top: '-11.5vw', left: '41.5%' }}>
          <Image src="/assets/images/2023/05/project-banner-1.png" alt="" width={225} height={300} className="float-img w-full h-auto opacity-40" unoptimized />
        </div>
        <div className="absolute" style={{ width: 'min(350px, 48vw)', top: '-3.5vw', right: '1%' }}>
          <Image src="/assets/images/2023/05/project-banner-2.png" alt="" width={350} height={500} className="float-img w-full h-auto opacity-30 md:opacity-60" unoptimized />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 z-[2]" />
      <div ref={overlayRef} className="absolute inset-0 bg-black z-[4] origin-top" />
      <div className="relative z-[3] text-center px-6 md:px-12 max-w-6xl mx-auto py-32 md:py-40">
        <h1 ref={headingRef} className="text-5xl md:text-[6.875rem] font-bold text-white leading-[1em] tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif', perspective: '1200px' }}>
          Our
        </h1>
        <h2 className="text-5xl md:text-[6.875rem] font-bold text-outline-hover leading-[1em] tracking-tight mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          Our Pride
        </h2>
        <p ref={descRef} className="mt-8 text-[#A7A7A7] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
          Many have trusted us, and our exhaustive list of notable clients demonstrates our ability to bring great ideas to life.
        </p>
      </div>
    </section>
  );
});
