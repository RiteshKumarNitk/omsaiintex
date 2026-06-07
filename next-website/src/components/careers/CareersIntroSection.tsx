'use client';

import React, { useRef } from 'react';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function CareersIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    stagger: 0.15,
    start: 'top 85%',
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Reinventing Offices <br />since 2003.
            </h2>
            <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Through a unique combination of engineering, construction and design disciplines and expertise
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-[#FFFFFF33] pl-0 md:pl-8 pt-6 md:pt-0">
            <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              MDS Interior is scaling rapidly and expanding its footprint across India. To reach our goal,
              we are actively looking for ambitious and creative professionals to join our growing team.
            </p>
            <p className="text-[#A7A7A7] text-lg leading-relaxed mt-6" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Are you a professional in our field and looking for employment opportunities? Reach out with a message here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
