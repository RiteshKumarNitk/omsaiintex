"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { projectItems } from '@/data/projects/items';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Horizontal scroll
      const container = containerRef.current;
      if (!container) return;

      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = -(totalWidth - viewportWidth);

      gsap.to(container, {
        x: maxScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 pt-24 pb-8">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-8" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>Scroll horizontally to explore our portfolio</p>
      </div>

      <div
        ref={containerRef}
        className="flex gap-8 px-6 md:px-12 pb-24"
        style={{ width: 'max-content' }}
      >
        {projectItems.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
            style={{
              width: idx % 3 === 0 ? 480 : idx % 3 === 1 ? 380 : 320,
              height: idx % 3 === 0 ? 520 : idx % 3 === 1 ? 440 : 380,
            }}
          >
            {/* Card Background */}
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#4f8cf7' : '#34d399'}22, ${idx % 2 === 0 ? '#4f8cf7' : '#34d399'}44)`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 text-[#0065AC]">
                {project.category}
              </p>
              <h3 className="text-3xl font-bold text-white mb-2">{project.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Project</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Index Number */}
            <span
              className="absolute top-6 right-6 text-6xl font-bold opacity-10 text-white"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
