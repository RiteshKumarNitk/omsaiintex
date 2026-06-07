'use client';

import React, { useRef } from 'react';
import { statItems } from '@/data/home/stats';
import StatCard from '@/components/ui/StatCard';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: containerRef,
    selector: 'div',
    stagger: 0.15,
    start: 'top 85%',
  });

  return (
    <section
      className="relative py-20 md:py-28 bg-[#121B1D] overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/images/2023/05/square-bg.png)',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#060707]/70" />
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {statItems.map((st, i) => (
            <StatCard key={i} stat={st} />
          ))}
        </div>
      </div>
    </section>
  );
});
