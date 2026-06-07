'use client';

import React, { useRef } from 'react';
import { historyItems } from '@/data/about/history';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function HistorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    selector: '.history-card',
    stagger: 0.15,
    duration: 0.7,
    start: 'top 85%',
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-[12vw] md:text-[100px] font-bold text-outline leading-[110px] tracking-tighter"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}
          >
            OSIPL History
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {historyItems.map((item, idx) => (
            <div key={idx} className="history-card border border-white/10 rounded-xl p-6 hover:border-[#0065AC]/30 transition-all duration-500 bg-white/[0.02]">
              <div className="text-4xl font-bold text-[#0065AC] mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                {item.year}
              </div>
              <p className="text-[#A7A7A7] leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
