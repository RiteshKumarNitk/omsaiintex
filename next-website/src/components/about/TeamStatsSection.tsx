'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamStats } from '@/data/about/stats';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function TeamStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = sectionRef.current?.querySelectorAll('.stat-block');
      if (children && children.length > 0) {
        gsap.fromTo(children,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-[#0F0F0F] overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: 'url(/assets/images/2023/05/square-bg.png)',
          backgroundSize: 'auto',
        }}
      />
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-[12vw] md:text-[100px] font-bold text-outline leading-[1em]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {teamStats.map((stat, idx) => (
            <div key={idx} className="stat-block text-center text-white">
              <div
                className="text-[70px] leading-[1em] font-bold mb-0"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {stat.value}
              </div>
              <div
                className="text-lg leading-[36px] capitalize tracking-[0.8px]"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
