"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';
import ManufacturingIntroSection from '@/components/manufacturing/ManufacturingIntroSection';
import ManufacturingContentSection from '@/components/manufacturing/ManufacturingContentSection';
import PageCTASection from '@/components/shared/PageCTASection';

gsap.registerPlugin(ScrollTrigger);

export default function ManufacturingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLParagraphElement>(null);

  const slides = [
    { src: '/assets/images/2023/05/factory-banner-1.jpg', alt: 'Factory exterior' },
    { src: '/assets/images/2023/05/DJI_0047.jpg', alt: 'Factory aerial view' },
    { src: '/assets/images/2023/05/manufacturing-block4.jpg', alt: 'Manufacturing block' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, { height: '0%', duration: 1.5, ease: 'power4.inOut' });
      const heroH1 = heroRef.current?.querySelector('h1');
      if (heroH1) {
        const [words] = splitTextToWords(heroH1);
        animateWordsIn(words, { from: { y: 60, opacity: 0, rotateX: -30 }, to: { duration: 1.2, stagger: 0.03, ease: 'power4.out', delay: 0.6 } });
      }
      gsap.fromTo(scrollRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5 });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col w-full bg-[#121B1D]">
      <section className="relative w-full overflow-hidden bg-black" style={{ padding: '150px 0px 70px 0px' }}>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ paddingTop: '40%' }}>
            {slides.map((slide, idx) => (
              <div key={idx} className="absolute inset-0 bg-cover bg-center slideshow-fade" style={{ backgroundImage: `url(${slide.src})`, animationDelay: `${idx * 5}s` }} />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10" />
        <div ref={overlayRef} className="absolute inset-0 bg-black z-20 origin-top" />
        <div className="relative z-30 text-center px-6 max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
          <h1 ref={heroRef} className="text-[10vw] md:text-[72px] font-bold text-white leading-[1em]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            The Secret To<br className="hidden md:inline" /> Our Success
          </h1>
        </div>
        <p ref={scrollRef} className="absolute left-1/2 -translate-x-1/2 z-30 text-white text-sm font-normal flex flex-col items-center gap-1" style={{ bottom: '9px', fontFamily: 'var(--font-red-hat), sans-serif' }}>
          Scroll<br />↓
        </p>
      </section>
      <ManufacturingIntroSection />
      <ManufacturingContentSection />
      <PageCTASection />
    </div>
  );
}
