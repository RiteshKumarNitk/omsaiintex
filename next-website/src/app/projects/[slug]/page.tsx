"use client";

import React, { useRef, useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug, getNextProject } from '@/data/projects/items';
import ImageLightbox from '@/components/ui/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(slug);

  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine hero + gallery images for lightbox
  const allImages = project
    ? [project.heroImage || project.image, ...(project.gallery || [])]
    : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline();
      heroTimeline
        .fromTo(heroRef.current,
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power4.inOut' }
        )
        .fromTo('.hero-title',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-meta',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        );

      const sections = contentRef.current?.querySelectorAll('.content-section');
      if (sections && sections.length > 0) {
        gsap.fromTo(sections,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 70%' } }
        );
      }

      const galleryItems = document.querySelectorAll('.gallery-item');
      if (galleryItems.length > 0) {
        gsap.fromTo(galleryItems,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 40 },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0,
            duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.gallery-grid', start: 'top 75%' } }
        );
      }

      if (nextProject) {
        gsap.fromTo('.next-project-image',
          { scale: 1.2 },
          { scale: 1, ease: 'none',
            scrollTrigger: { trigger: '.next-project-section', start: 'top bottom', end: 'bottom top', scrub: 1 } }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, [project, nextProject]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121B1D]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Project Not Found
          </h1>
          <Link href="/projects" className="text-[#0065AC] hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="flex flex-col w-full bg-[#121B1D]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[80vh] md:h-screen overflow-hidden cursor-pointer" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} onClick={() => openLightbox(0)}>
        <Image src={project.heroImage || project.image} alt={project.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
          <Link href="/projects" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm text-white/80 text-sm rounded-full border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            All Projects
          </Link>
        </div>

        {/* Expand icon */}
        <div className="absolute top-6 right-6 md:top-8 md:right-12 z-20 flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-sm text-white/60 text-xs rounded-full border border-white/10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          <span className="hidden md:inline" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>View Fullscreen</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
          <div className="max-w-7xl mx-auto">
            <span className="hero-meta inline-block px-3 py-1 bg-[#0065AC]/20 text-[#0065AC] text-xs font-medium rounded-full border border-[#0065AC]/30 uppercase tracking-wider mb-4 opacity-0">{project.category}</span>
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 opacity-0" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{project.name}</h1>
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              {project.client && <div className="hero-meta opacity-0"><span className="text-white/50 text-xs uppercase tracking-wider block mb-1">Client</span><span className="text-white text-lg" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.client}</span></div>}
              {project.location && <div className="hero-meta opacity-0"><span className="text-white/50 text-xs uppercase tracking-wider block mb-1">Location</span><span className="text-white text-lg" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.location}</span></div>}
              {project.area && <div className="hero-meta opacity-0"><span className="text-white/50 text-xs uppercase tracking-wider block mb-1">Area</span><span className="text-white text-lg" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.area}</span></div>}
              {project.year && <div className="hero-meta opacity-0"><span className="text-white/50 text-xs uppercase tracking-wider block mb-1">Year</span><span className="text-white text-lg" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.year}</span></div>}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="content-section mb-20">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-4xl" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.description}</p>
          </div>

          {project.challenge && (
            <div className="content-section grid md:grid-cols-2 gap-12 mb-20">
              <div><span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-4 block">The Challenge</span><h3 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>What We Faced</h3></div>
              <div><p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.challenge}</p></div>
            </div>
          )}

          {project.solution && (
            <div className="content-section grid md:grid-cols-2 gap-12 mb-20">
              <div><span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-4 block">Our Approach</span><h3 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>The Solution</h3></div>
              <div><p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.solution}</p></div>
            </div>
          )}

          {project.result && (
            <div className="content-section grid md:grid-cols-2 gap-12 mb-20">
              <div><span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-4 block">The Impact</span><h3 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Results</h3></div>
              <div><p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{project.result}</p></div>
            </div>
          )}

          {project.services && project.services.length > 0 && (
            <div className="content-section mb-20">
              <span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-6 block">Services</span>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, idx) => (
                  <span key={idx} className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full text-white/70 text-sm hover:border-[#0065AC]/30 hover:text-white transition-all duration-300" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{service}</span>
                ))}
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="content-section gallery-grid">
              <span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-6 block">Gallery</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="gallery-item relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group" onClick={() => openLightbox(idx + 1)}>
                    <Image src={img} alt={`${project.name} - Image ${idx + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {nextProject && (
        <section className="next-project-section relative w-full h-[70vh] overflow-hidden">
          <Link href={`/projects/${nextProject.slug}`} className="block w-full h-full">
            <div className="next-project-image absolute inset-0"><Image src={nextProject.image} alt={nextProject.name} fill className="object-cover" sizes="100vw" /></div>
            <div className="absolute inset-0 bg-black/60 hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-4">Next Project</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{nextProject.name}</h2>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0f11] font-medium rounded-full hover:bg-[#0065AC] hover:text-white transition-all duration-300 group" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                View Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="py-16 md:py-24 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-[#0065AC]/10 hover:border-[#0065AC]/50 transition-all duration-300 group" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to All Projects
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox images={allImages} isOpen={lightboxOpen} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} alt={project.name} />
    </div>
  );
}
