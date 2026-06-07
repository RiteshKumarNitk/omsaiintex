'use client';

import React, { useRef } from 'react';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function JobOpeningsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    selector: '.job-card',
    stagger: 0.12,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          Would you like to<br />
          <span className="text-[#0065AC]">work with us?</span>
        </h2>
        <h3 className="text-2xl font-bold text-white mt-12 mb-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          Current Openings
        </h3>
        <div className="job-card border border-white/10 rounded-xl p-8 bg-white/[0.02]">
          <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            COSTING - Products
          </h4>
          <p className="text-[#A7A7A7]/60 text-sm mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            (Upto 3 years relevant exp) | Engineers / Sr. Engineers
          </p>
          <p className="text-[#A7A7A7] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            The role involves day-to-day tasks related to product costing, analysis, and pricing strategies to
            optimize cost efficiency and profitability. The candidate will collaborate with internal teams &amp;
            develop cost estimates, identify cost-saving opportunities, and ensure accurate product pricing.
          </p>
          <p className="text-[#A7A7A7] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Candidates must be proficient in AutoCAD 2D with good communication skills both verbal and written.
            &amp; Diploma / BE Civil Engineers preferred. MS Office proficiency.
          </p>
          <p className="text-[#A7A7A7] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Work Location: Bangalore HO.
          </p>
          <p className="text-[#A7A7A7] leading-relaxed mb-6" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Interested candidates may mail their cv&apos;s to{' '}
            <a href="mailto:hr@omsaiintex.com" className="text-[#0065AC] hover:underline">hr@omsaiintex.com</a>.
          </p>
          <span className="inline-block px-4 py-2 bg-[#0065AC]/20 text-[#0065AC] text-sm font-medium rounded">
            Apply for Job Here
          </span>
        </div>
      </div>
    </section>
  );
});
