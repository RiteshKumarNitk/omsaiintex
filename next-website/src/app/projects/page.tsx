"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

const projectItems = [
  {
    name: "Intel",
    image: "/assets/images/2018/08/IN504142.jpg",
  },
  {
    name: "City Marks",
    image: "/assets/images/2023/05/project-banner-3.png",
  },
  {
    name: "Servicenow",
    image: "/assets/images/2023/04/service-now-1.jpg",
  },
  {
    name: "Visa",
    image: "/assets/images/2023/04/visa2.jpg",
  },
  {
    name: "Accenture",
    image: "/assets/images/2023/04/HM8A4437.jpg",
  },
  {
    name: "Keyloop",
    image: "/assets/images/2023/04/DSC08099.jpg",
  },
];

export default function ProjectsPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero overlay entrance
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          height: '0%', duration: 1.5, ease: 'power4.inOut',
        });
      }

      // Heading split animation
      if (headingRef.current) {
        const [words] = splitTextToWords(headingRef.current);
        animateWordsIn(words, {
          from: { y: 60, opacity: 0 },
          to: { duration: 1, stagger: 0.04, ease: 'power4.out', delay: 0.6 },
        });
      }

      // Sub heading
      gsap.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.0 }
      );

      // Description
      gsap.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 }
      );

      // Intro section
      gsap.fromTo(introRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 85%' } }
      );

      // Project items
      gsap.fromTo('.project-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: projectsRef.current, start: 'top 80%' } }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col w-full bg-[#121B1D]">

      {/* ════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Floating decorative images */}
        <div className="absolute inset-0 z-[1] overflow-hidden">
          {/* Image 1 - office sketch, left side */}
          <div className="absolute" style={{
            width: 'min(425px, 60vw)',
            top: '-8vw',
            left: '0%',
          }}>
            <img
              src="/assets/custom/office_sketch.png"
              alt=""
              className="float-img w-full h-auto opacity-30 md:opacity-60"
            />
          </div>
          {/* Image 2 - project banner, center */}
          <div className="absolute hidden md:block" style={{
            width: '225px',
            top: '-11.5vw',
            left: '41.5%',
          }}>
            <img
              src="/assets/images/2023/05/project-banner-1.png"
              alt=""
              className="float-img w-full h-auto opacity-40"
            />
          </div>
          {/* Image 3 - project banner, right side */}
          <div className="absolute" style={{
            width: 'min(350px, 48vw)',
            top: '-3.5vw',
            right: '1%',
          }}>
            <img
              src="/assets/images/2023/05/project-banner-2.png"
              alt=""
              className="float-img w-full h-auto opacity-30 md:opacity-60"
            />
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 z-[2]" />
        {/* Curtain */}
        <div ref={overlayRef} className="absolute inset-0 bg-black z-[4] origin-top" />

        {/* Content */}
        <div className="relative z-[3] text-center px-6 md:px-12 max-w-6xl mx-auto py-32 md:py-40">
          <h1
            ref={headingRef}
            className="text-5xl md:text-[6.875rem] font-bold text-white leading-[1em] tracking-tight"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif', perspective: '1200px' }}
          >
            Our
          </h1>

          {/* "Our Pride" in text-stroke - Poppins 110px, fills white on hover */}
          <h2
            className="text-5xl md:text-[6.875rem] font-bold text-outline-hover leading-[1em] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Our Pride
          </h2>

          <p ref={descRef} className="mt-8 text-[#A7A7A7] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Many have trusted us, and our exhaustive list of notable clients demonstrates our ability to bring great ideas to life.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INTRODUCTION SECTION
         ════════════════════════════════════════════ */}
      <section ref={introRef} className="py-16 md:py-24 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
            <div className="md:ml-[15%]">
              <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Every project reflects our inexhaustible ability to transform offices from mundane to creative,
                flourishing spaces and our prowess to turn your creative vision into reality.
              </p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-white/20 pl-0 md:pl-8 pt-6 md:pt-0">
              <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Our portfolio spans across multiple industries and scales, from intimate creative studios to
                large-scale corporate headquarters spanning lakhs of square feet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROJECTS GRID
         ════════════════════════════════════════════ */}
      <section ref={projectsRef} className="py-16 md:py-24 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projectItems.map((project, idx) => (
              <div
                key={idx}
                className="project-card group bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-[#0065AC]/20 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/50">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-[30px] font-bold text-white uppercase leading-[30px]"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  >
                    {project.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA SECTION - #0065AC background as original
         ════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#0065AC' }}>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center md:text-left" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Looking to build a great workspace?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-3.5 text-white font-normal text-xl border border-white rounded hover:bg-white hover:text-[#0065AC] transition-all duration-300"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif', width: '178px' }}
          >
            Contact us
          </Link>
        </div>
      </section>

    </div>
  );
}
