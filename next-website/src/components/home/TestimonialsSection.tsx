'use client';

import React, { useRef } from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { testimonials } from '@/data/home/testimonials';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    selector: '.testimonial-card',
    stagger: 0.15,
    start: 'top 80%',
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p
            className="text-[#A7A7A7] text-lg mb-2 uppercase tracking-[0.15em]"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            What Our Clients Say
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            <span className="text-[#0065AC]">Testimonials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
});
