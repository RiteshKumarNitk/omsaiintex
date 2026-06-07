'use client';

import React, { useRef } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/home/projects';
import { useMarquee } from '@/hooks/animations/useMarquee';
import { useScrollReveal } from '@/hooks/animations/useScrollReveal';

export default React.memo(function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    selector: '.project-card',
    stagger: 0.12,
    duration: 0.7,
    start: 'top 80%',
  });

  useMarquee({
    trackRef,
    duration: 45,
    pauseOnHover: true,
  });

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div ref={trackRef} className="flex w-max">
            {[...projects, ...projects].map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
