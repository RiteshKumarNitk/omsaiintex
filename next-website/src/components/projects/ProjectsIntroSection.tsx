'use client';

import React, { useRef } from 'react';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function ProjectsIntroSection() {
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
          <div className="md:ml-[15%]">
            <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Every project reflects our inexhaustible ability to transform offices from mundane to creative,
              flourishing spaces and our prowess to turn your creative vision into reality.
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/20 pl-0 md:pl-8 pt-6 md:pt-0">
            <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Our portfolio spans across multiple industries and scales, from intimate creative studios to
              large-scale corporate headquarters spanning lakhs of square feet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
