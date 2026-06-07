'use client';

import React, { useRef } from 'react';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function AwardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    selector: '.anim-block',
    stagger: 0.15,
    duration: 0.7,
    start: 'top 85%',
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2
            className="anim-block text-[12vw] md:text-[100px] font-bold text-outline leading-[110px] mb-4 tracking-tighter"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}
          >
            Awards &amp;<br />
            Recognition
          </h2>
          <p
            className="anim-block text-[#A7A7A7] text-lg md:text-xl leading-[30px] mx-auto"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Every award in our name proves our daily dedication to providing high-quality products and services.
            Our focus is on strengthening our integrated management systems, improving our environmental performance,
            and continuing to serve the best office fit-out solutions to clients in pan-India.
          </p>
        </div>
      </div>
    </section>
  );
});
