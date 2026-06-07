'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectItems } from '@/data/projects/items';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function ProjectShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-[#0a0f11]">
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 pt-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em]">
            Scroll to Explore
          </span>
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-[#0065AC]" />
            <svg className="w-4 h-4 text-[#0065AC] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="flex items-center h-full gap-8 px-6 md:px-12">
        {projectItems.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] relative group"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="45vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute top-6 left-6 z-10">
                <span className="text-white/20 text-7xl md:text-8xl font-bold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                <span className="inline-block px-3 py-1 bg-[#0065AC]/20 text-[#0065AC] text-xs font-medium rounded-full border border-[#0065AC]/30 uppercase tracking-wider mb-4">
                  {project.category}
                </span>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  {project.name}
                </h3>
                <p className="text-white/70 text-lg max-w-lg mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  {project.description}
                </p>
                <div className="flex items-center gap-6 text-white/50 text-sm">
                  {project.area && <span>{project.area}</span>}
                  {project.year && <span>• {project.year}</span>}
                </div>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span
                    className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#0a0f11] font-medium rounded-full hover:bg-[#0065AC] hover:text-white transition-all duration-300 group/btn"
                    style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
                  >
                    View Project
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});
