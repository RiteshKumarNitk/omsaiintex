'use client';

import React, { useRef } from 'react';
import QualityChip from '@/components/ui/QualityChip';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

const qualities = [
  "BESPOKE", "CREATIVE", "STIMULATING", "HUMANISTIC",
  "FUNCTIONAL", "INSPIRING", "DYNAMIC", "HOLISTIC",
];

export default function QualitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    selector: '.quality-chip',
    direction: 'scale',
    stagger: 0.08,
    duration: 0.5,
    start: 'top 85%',
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p
          className="text-[#A7A7A7] text-lg mb-2 uppercase tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Why Choose OSIPL
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-16"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Qualities of <span className="text-[#0065AC]">OSIPL Office</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {qualities.map((q, i) => (
            <QualityChip key={i} label={q} />
          ))}
        </div>
      </div>
    </section>
  );
}
