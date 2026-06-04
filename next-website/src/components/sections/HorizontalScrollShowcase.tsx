"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Corporate HQ', category: 'Interior Fit-out', color: '#4f8cf7', size: 'lg' },
  { title: 'Tech Campus', category: 'IT & Corporate', color: '#34d399', size: 'sm' },
  { title: 'Industrial Park', category: 'Industrial', color: '#818cf8', size: 'md' },
  { title: 'Luxury Retail', category: 'Commercial', color: '#f472b6', size: 'lg' },
  { title: 'Office Tower', category: 'Interior Fit-out', color: '#60a5fa', size: 'md' },
  { title: 'Design Studio', category: 'Commercial', color: '#a78bfa', size: 'sm' },
];

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
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Projects</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-8">Scroll horizontally to explore our portfolio</p>
      </div>

      <div
        ref={containerRef}
        className="flex gap-8 px-6 md:px-12 pb-24"
        style={{ width: 'max-content' }}
      >
        {projects.map((project, idx) => (
          <Link
            key={idx}
            href="/projects"
            className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
            style={{
              width: project.size === 'lg' ? 480 : project.size === 'md' ? 380 : 320,
              height: project.size === 'lg' ? 520 : project.size === 'md' ? 440 : 380,
            }}
          >
            {/* Card Background */}
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
              }}
            />
            
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: project.color }}>
                {project.category}
              </p>
              <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
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
              style={{ fontFamily: 'serif' }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
