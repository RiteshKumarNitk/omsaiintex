'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function ManufacturingIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = sectionRef.current?.querySelectorAll('.anim-block');
      if (!blocks || blocks.length === 0) return;
      gsap.fromTo(blocks,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" style={{ marginTop: '150px', marginBottom: '70px' }}>
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="anim-block">
            <h2 className="text-[30px] md:text-[36px] text-white leading-[50px] font-bold" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Set up in 2008, covering 80,000 sq. ft. built to support<br />CNC-enabled production
            </h2>
          </div>
          <div className="anim-block">
            <p className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px]" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Our factory Sleekline Modular Solutions caters to fulfill clients&apos; custom manufacturing demands and interior design requirements swiftly.
            </p>
          </div>
        </div>
        <div className="anim-block mt-10 md:mt-16 overflow-hidden rounded-lg relative" style={{ height: '486px' }}>
          <Image
            src="/assets/images/2023/05/factory-banner-1.jpg"
            alt="Sleekline Modular Solutions factory"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 72rem"
          />
        </div>
      </div>
    </section>
  );
});
