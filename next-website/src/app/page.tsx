"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';
import HeroThreeScene from '@/components/three/HeroThreeScene';

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────

const slides = [
  { image: "/assets/images/2023/06/banner-1.jpg", title: "Transforming", subtitle: "Creativity Into Reality." },
  { image: "/assets/images/2023/06/banner-2.jpg", title: "Building Inspiring", subtitle: "Workspaces Since 2003." },
  { image: "/assets/images/2023/06/banner-3.jpg", title: "Reinventing Offices", subtitle: "To Enable Functionality" },
  { image: "/assets/images/2023/06/banner-4.jpg", title: "Extraordinary Workspaces", subtitle: "For High-Achievers" },
  { image: "/assets/images/2023/06/banner-5.jpg", title: "India's Leading", subtitle: "Design-Build Firm" },
];

const statItems = [
  { value: "40M+", label: "sq. ft delivered" },
  { value: "1400+", label: "projects delivered" },
  { value: "39M+", label: "sq. ft ongoing" },
  { value: "20+", label: "years of experience" },
];

const teamMembers = [
  { name: "Venkatesh Venugopal", role: "Director", image: "/assets/images/2023/06/Venkatesh-V2.jpg" },
  { name: "Illavarasan V", role: "Director", image: "/assets/images/2023/06/Illavarasan-V2.jpg" },
  { name: "Nanjundaraje Urs A", role: "Director", image: "/assets/images/2023/06/team-image3.jpg" },
  { name: "Prakash Srinivas", role: "Director", image: "/assets/images/2023/06/Prakash-S2.jpg" },
];

const clientLogos = [
  { src: "/assets/images/2023/05/americanexpress.png", alt: "American Express" },
  { src: "/assets/images/2023/05/astrazenca.png", alt: "AstraZeneca" },
  { src: "/assets/images/2023/05/barclays.png", alt: "Barclays" },
  { src: "/assets/images/2023/05/danske.png", alt: "Danske" },
  { src: "/assets/images/2023/05/dell.png", alt: "Dell" },
  { src: "/assets/images/2023/05/fidility.png", alt: "Fidelity" },
  { src: "/assets/images/2023/05/hewlett.png", alt: "Hewlett Packard" },
  { src: "/assets/images/2023/05/hp.png", alt: "HP" },
  { src: "/assets/images/2023/05/jpmorgan.png", alt: "JPMorgan" },
  { src: "/assets/images/2023/05/pwc.png", alt: "PwC" },
  { src: "/assets/images/2023/05/schieder.png", alt: "Schneider" },
  { src: "/assets/images/2023/05/standardchartered.png", alt: "Standard Chartered" },
  { src: "/assets/images/2023/05/tcs.png", alt: "TCS" },
  { src: "/assets/images/2023/05/vmware.png", alt: "VMware" },
  { src: "/assets/images/2023/05/yahoo.png", alt: "Yahoo" },
];

const projects = [
  { title: "INTEL PROJECT", desc: "Fully furnished 1,40,000 sq. ft. headquarters.", image: "/assets/images/2023/06/intel-1.jpg" },
  { title: "SERVICENOW", desc: "Cutting-edge workspace for a global tech leader.", image: "/assets/images/2023/06/servicenow-1.jpg" },
  { title: "VISA", desc: "High-end corporate interiors for a financial giant.", image: "/assets/images/2023/06/visa-1.jpg" },
  { title: "ACCENTURE", desc: "Large-scale design-build project.", image: "/assets/images/2023/06/accenture-1.jpg" },
];

const testimonials = [
  {
    quote: "We highly recommend Om Sai Intex for any project where quality and time are of importance.",
    author: "Lalit kumar Gupta", role: "Adobe, Head-India facilities"
  },
  {
    quote: "We find Om Sai Intex resourceful, dedicated and capable of delivering good quality. They have a dedicated team who deliver on time.",
    author: "P.S. Prasad", role: "HP, Corporate Manager (Facilities)"
  },
  {
    quote: "The team working on the project was knowledgeable and very co-operative in fixing problems and meeting critical deadlines.",
    author: "B.R. Ravi", role: "iGATE, Head-India facilities"
  },
  {
    quote: "We are very pleased with their civil and interior works and greatly appreciate their commitment to our Bangalore project.",
    author: "Jayanth Joseph", role: "Oracle, Vice President - RE&F India"
  },
  {
    quote: "We hereby acknowledge & recognise your Outstanding Performance with High Safety & Quality Standards of Microsoft Bangalore.",
    author: "Arvind Prakash Ayyaswamy", role: "Microsoft, Real Estate Portfolio Manager"
  },
];

// ── Component ─────────────────────────────────

export default function HomePage() {
  const [slideIdx, setSlideIdx] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const qualitiesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const clientsTrackRef = useRef<HTMLDivElement>(null);

  /* ── slide rotation ── */
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  /* ── GSAP ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero overlay curtain
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          height: '0%', duration: 1.5, ease: 'power4.inOut', delay: 0.2,
        });
      }

      // Hero tagline
      const tagline = heroContentRef.current?.querySelector('.hero-tagline');
      if (tagline) {
        gsap.fromTo(tagline,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
        );
      }

      // Hero heading split
      if (heroTitleRef.current) {
        const els = heroTitleRef.current.querySelectorAll('h1');
        els.forEach(el => {
          const [words] = splitTextToWords(el);
          animateWordsIn(words, {
            from: { y: 80, opacity: 0, rotateX: -25 },
            to: { duration: 1, stagger: 0.04, ease: 'power4.out', delay: 1 },
          });
        });
      }

      // Hero subtitle
      const subtitle = heroContentRef.current?.querySelector('.hero-subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.4 }
        );
      }

      // Hero buttons
      if (heroButtonsRef.current) {
        gsap.fromTo(heroButtonsRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 1.7 }
        );
      }

      // Slides parallax on scroll
      if (heroRef.current) {
        gsap.to(heroRef.current.querySelectorAll('.hero-slide'), {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Stats
      const statChildren = statsRef.current?.children;
      if (statChildren && statChildren.length > 0) {
        gsap.fromTo(statChildren,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current?.parentElement, start: 'top 85%' }
          }
        );
      }

      // Visionaries heading
      gsap.fromTo('.vision-title',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: visionRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.vision-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: visionRef.current, start: 'top 75%' }
        }
      );

      // Qualities
      gsap.fromTo('.quality-chip',
        { scale: 0.85, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: qualitiesRef.current, start: 'top 85%' }
        }
      );

      // Projects - scroll-triggered fade in
      gsap.fromTo('.project-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: projectsRef.current, start: 'top 80%' }
        }
      );

      // Project track - auto scroll marquee
      if (projectTrackRef.current) {
        const tween = gsap.to(projectTrackRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 45,
          repeat: -1,
        });
        projectTrackRef.current.addEventListener('mouseenter', () => tween.pause());
        projectTrackRef.current.addEventListener('mouseleave', () => tween.resume());
      }

      // Clients Slider Marquee
      if (clientsTrackRef.current) {
        gsap.to(clientsTrackRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 35, // Slider speed
          repeat: -1,
        });
      }

      // Testimonials
      gsap.fromTo('.testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: testimonialRef.current, start: 'top 80%' }
        }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  /* ── slide nav ── */
  const goSlide = useCallback((i: number) => setSlideIdx(i), []);

  return (
    <div ref={mainRef} className="flex flex-col w-full">

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO SLIDESHOW CAROUSEL
         ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black">
        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`hero-slide absolute inset-0 z-[1] transition-all duration-1000 ease-in-out ${i === slideIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Overlay gradient - lighter for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />
        {/* Curtain overlay for entrance */}
        <div ref={overlayRef} className="absolute inset-0 bg-black z-20 origin-top" />

        {/* Hero content */}
        <div ref={heroContentRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
          <p className="hero-tagline text-white/60 text-sm md:text-base uppercase tracking-[0.25em] mb-4 font-light" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Om Sai Intex — Premium Turnkey Solutions
          </p>
          <div ref={heroTitleRef}>
            <h1 className="text-[3rem] md:text-[6.25rem] font-bold leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif', perspective: '1200px' }}>
              <span className="text-outline">{slides[slideIdx].title}</span><br />
              <span className="text-[#0065AC]">{slides[slideIdx].subtitle}</span>
            </h1>
          </div>
          <p className="hero-subtitle mt-6 text-white/70 text-lg md:text-xl max-w-xl font-light" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Creating spatially exciting workspaces tuned to its people
          </p>
          <div ref={heroButtonsRef} className="mt-10 flex gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-3.5 bg-[#0065AC] text-white font-medium rounded hover:bg-[#00508A] transition-all duration-300 text-base"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Explore Our Work
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-all duration-300 text-base"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Three.js background - behind everything */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <HeroThreeScene />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goSlide(i)}
              className={`transition-all duration-500 rounded-full ${i === slideIdx ? 'w-10 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — DELIVERING COHESIVE OFFICES
         ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#121B1D] border-b border-[#5A5A5A]/30">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Delivering Cohesive offices from <span className="text-[#0065AC]">conception to completion</span>
              </h2>
            </div>
            <div>
              <p className="text-[#A7A7A7] text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Open high-end corporate offices, hybrid agile offices or creative hubs. The team has created bespoke
                functional workspaces that stimulates togetherness, creativity and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — STATS COUNTERS
         ════════════════════════════════════════════ */}
      <section
        className="relative py-20 md:py-28 bg-[#121B1D] overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/images/2023/05/square-bg.png)',
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#060707]/70" />
        <div ref={statsRef} className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {statItems.map((st, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  {st.value}
                </span>
                <span className="text-white/60 text-sm md:text-base uppercase tracking-[0.05em] max-w-[180px]" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — OUR VISIONARIES
         ════════════════════════════════════════════ */}
      <section ref={visionRef} className="py-20 md:py-28 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          {/* Large outline heading */}
          <div className="text-center mb-6">
            <h2 className="vision-title text-[3rem] md:text-[6.25rem] font-bold leading-[1.1] text-outline select-none" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Our Visionaries
            </h2>
          </div>
          <p className="text-center text-[#A7A7A7] text-lg leading-relaxed max-w-4xl mx-auto mb-16" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            From 2003 till date, these four visionary leaders have worked on numerous commercial, industrial,
            IT &amp; corporate &amp; interior fit-out projects. The goal? — To leave a lasting engineering heritage
            that changes how people experience an office and help office-goers rise to their best potential.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((m, i) => (
              <div key={i} className="vision-card group relative overflow-hidden rounded-lg">
                <div className="aspect-[3/4] relative">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {/* Gradient overlay from original: linear-gradient(0deg, #000000CC 0%, #00000000 77%) */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(0deg, #000000CC 0%, #00000000 77%)',
                  }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{m.name}</h3>
                  <p className="text-sm text-white/60" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — CLIENTS & PARTNERS
         ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#252525] mb-12" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Clients &amp; Partners
          </h2>

          {/* Client logos slider */}
          <div className="relative max-w-6xl mx-auto overflow-hidden">
            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div ref={clientsTrackRef} className="flex gap-8 items-center w-max">
              {[...clientLogos, ...clientLogos].map((cl, i) => (
                <div key={i} className="flex-shrink-0 w-[150px] md:w-[200px] flex items-center justify-center p-4 aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={cl.src} alt={cl.alt} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6 — FEATURED PROJECTS
         ════════════════════════════════════════════ */}
      <section ref={projectsRef} className=" bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative max-w-6xl mx-auto overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div ref={projectTrackRef} className="flex w-max">
              {[...projects, ...projects].map((p, i) => (
                <div key={i} className="project-card relative overflow-hidden shadow-lg shadow-black/5 flex-shrink-0 w-[280px] md:w-[320px]">
                  <div className="aspect-[3/4]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      {p.title}
                    </h4>
                    <Link
                      href="/projects"
                      className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-all duration-300"
                    >
                      View Details
                      <svg className="w-2.5 h-2.5 ml-1 hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 7 — BLUE CTA
         ════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#0065AC' }}>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center md:text-left" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Let&apos;s build your next workspace
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-3.5 bg-white text-[#0065AC] font-medium rounded hover:bg-gray-100 transition-all duration-300 text-lg"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Let&apos;s Talk
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 8 — QUALITIES OF OSIPL OFFICE
         ════════════════════════════════════════════ */}
      <section ref={qualitiesRef} className="py-20 md:py-28 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-[#A7A7A7] text-lg mb-2 uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Why Choose OSIPL
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Qualities of <span className="text-[#0065AC]">OSIPL Office</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["BESPOKE", "CREATIVE", "STIMULATING", "HUMANISTIC",
              "FUNCTIONAL", "INSPIRING", "DYNAMIC", "HOLISTIC"].map((q, i) => (
                <div
                  key={i}
                  className="quality-chip border border-white/10 rounded-lg py-8 px-4 bg-white/[0.02] hover:border-[#0065AC]/40 hover:bg-[#0065AC]/5 transition-all duration-300"
                >
                  <span className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {q}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 9 — CREATING SPATIALLY EXCITING WORKSPACES
         ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[3rem] md:text-[6rem] lg:text-[8rem] font-bold leading-[1] text-outline-2 mb-6 select-none" style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}>
                Creating spatially exciting workspaces
              </h2>
              <p className="text-white text-xl md:text-2xl font-light tracking-wider" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                tuned to its people
              </p>
            </div>
            <div className="text-right">
              <p className="text-5xl md:text-7xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                80,000
              </p>
              <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                sq. ft state-of-the-art manufacturing facility
              </p>
              <p className="text-white mt-6 text-lg leading-relaxed max-w-md ml-auto" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Housing a top-of-the-line CNC-enabled production line to fulfill clients&apos; custom manufacturing or modular needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 10 — MANUFACTURING UNIT BANNER
         ════════════════════════════════════════════ */}
      <section className="relative h-[72vh] min-h-[500px] overflow-hidden">
        <img
          src="/assets/images/2023/06/manufacturing-unit.jpg"
          alt="Manufacturing Unit"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #00000000 0%, #000000 100%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-white/50 text-sm uppercase tracking-[0.25em] mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Our Facility
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Sleekline Modular Solutions
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-xl" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              State-of-the-art 80,000 sq. ft manufacturing facility
            </p>
            <Link
              href="/manufacturing-unit"
              className="inline-flex items-center mt-6 px-8 py-3 bg-[#0065AC] text-white font-medium rounded hover:bg-[#00508A] transition-all duration-300"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Explore Facility
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 11 — TESTIMONIALS
         ════════════════════════════════════════════ */}
      <section ref={testimonialRef} className="py-20 md:py-28 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[#A7A7A7] text-lg mb-2 uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              What Our Clients Say
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              <span className="text-[#0065AC]">Testimonials</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:border-[#0065AC]/20 transition-all duration-500 flex flex-col">
                {/* Quote icon */}
                <svg className="w-8 h-8 text-[#0065AC]/20 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[#A7A7A7] leading-relaxed mb-6 flex-grow text-sm" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/5 pt-4">
                  <p className="text-white font-semibold" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{t.author}</p>
                  <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 12 — BOTTOM CTA
         ════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#0065AC' }}>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center md:text-left" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Have a project in mind?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-3.5 bg-white text-[#0065AC] font-medium rounded hover:bg-gray-100 transition-all duration-300 text-lg"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Let&apos;s Talk
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 13 — 3000+ STAT + CTA
         ════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-[#121B1D] text-center border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-6xl md:text-8xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            3000<span className="text-[#0065AC]">+</span>
          </p>
          <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-8" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Skilled Professionals
          </p>
          <p className="text-[#A7A7A7] text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Join our team of specialists to make a difference with your skills
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center px-8 py-3.5 bg-[#0065AC] text-white font-medium rounded hover:bg-[#00508A] transition-all duration-300"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Join us
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
