'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1400, suffix: '+', label: 'Projects Completed' },
  { value: 40, suffix: 'M+', label: 'Sq Ft Delivered' },
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 3000, suffix: '+', label: 'Team Members' },
];

function AnimatedCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (counterRef.current) {
            const numEl = counterRef.current.querySelector('.counter-num');
            if (numEl) {
              numEl.textContent = Math.round(obj.val).toLocaleString() + suffix;
            }
          }
        },
      });
    }, counterRef);
    return () => ctx.revert();
  }, [value, suffix, delay]);

  return (
    <div ref={counterRef} className="text-center">
      <div
        className="counter-num text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        0{suffix}
      </div>
      <p className="text-white/50 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
        {label}
      </p>
    </div>
  );
}

export default React.memo(function ProjectStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#121B1D] relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <AnimatedCounter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
