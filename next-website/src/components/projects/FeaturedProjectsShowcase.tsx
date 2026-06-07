'use client';

import React, { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectItems } from '@/data/projects/items';

function ProjectShowcaseCard({ project, index }: { project: typeof projectItems[0]; index: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Use gallery images, repeating if fewer than 3 to enable scrolling
  const rawImages = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];

  const images = rawImages.length < 3
    ? Array.from({ length: Math.max(3, rawImages.length * 2) }, (_, i) => rawImages[i % rawImages.length])
    : rawImages;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add('no-snap');
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove('no-snap');
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove('no-snap');
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add('no-snap');
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove('no-snap');
  }, []);

  return (
    <div className="py-12 md:py-16">
      {/* Company Name */}
      <div className="container mx-auto px-6 md:px-12 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-white/20 text-6xl md:text-8xl font-bold" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {project.name}
            </h3>
            <p className="text-[#0065AC] text-sm uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              {project.category}
            </p>
          </div>
        </div>
      </div>

      {/* Drag-to-scroll Images */}
      <div className="relative group/scroll">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#121B1D] to-transparent z-10 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#121B1D] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 px-6 md:px-12 select-none cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((img, imgIdx) => (
            <div
              key={imgIdx}
              className="flex-shrink-0 w-[75vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] relative rounded-2xl overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={img}
                alt={`${project.name} office interior ${(imgIdx % rawImages.length) + 1}`}
                fill
                className="object-cover transition-transform duration-700"
                draggable={false}
                sizes="(max-width: 768px) 75vw, (max-width: 1024px) 45vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Description & Know More */}
      <div className="container mx-auto px-6 md:px-12 mt-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              {project.description}
            </p>
            {project.area && (
              <p className="text-white/40 text-sm mt-3" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                {project.area} {project.year && `• ${project.year}`}
              </p>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-[#0065AC] hover:border-[#0065AC] transition-all duration-300 group whitespace-nowrap"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Know More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Divider */}
      {index < projectItems.length - 1 && (
        <div className="container mx-auto px-6 md:px-12 mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default React.memo(function FeaturedProjectsShowcase() {
  return (
    <section className="py-16 md:py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          Featured <span className="text-[#0065AC]">Projects</span>
        </h2>
        <p className="text-[#A7A7A7] text-lg mt-4 max-w-2xl" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
          Explore our portfolio of transformative workspaces designed for leading brands
        </p>
      </div>

      {projectItems.map((project, idx) => (
        <ProjectShowcaseCard key={idx} project={project} index={idx} />
      ))}
    </section>
  );
});
