'use client';

import React, { useRef } from 'react';
import OutlineHeading from '@/components/ui/OutlineHeading';
import TeamMemberCard from '@/components/ui/TeamMemberCard';
import { teamMembers } from '@/data/home/team';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function VisionariesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: headingRef,
    selector: '.vision-title',
    duration: 1,
    start: 'top 80%',
  });

  useScrollReveal({
    trigger: cardsRef,
    selector: '.vision-card',
    stagger: 0.15,
    start: 'top 75%',
  });

  return (
    <section className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headingRef} className="text-center mb-6">
          <OutlineHeading className="vision-title">Our Visionaries</OutlineHeading>
        </div>
        <p
          className="text-center text-[#A7A7A7] text-lg leading-relaxed max-w-4xl mx-auto mb-16"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          From 2003 till date, these four visionary leaders have worked on numerous commercial, industrial,
          IT &amp; corporate &amp; interior fit-out projects. The goal? — To leave a lasting engineering heritage
          that changes how people experience an office and help office-goers rise to their best potential.
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((m, i) => (
            <TeamMemberCard key={i} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
});
