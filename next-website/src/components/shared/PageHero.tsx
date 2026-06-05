"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface PageHeroProps {
  /** The heading text (can include JSX like <br/>) */
  heading: React.ReactNode;
  /** Background image URL for the mask-slider area */
  backgroundImage: string;
  /** Optional additional background images for slideshow effect */
  backgroundImages?: string[];
  /** Whether to show the "Scroll ↓" indicator (default: true) */
  showScroll?: boolean;
  /** Optional custom padding class */
  paddingClass?: string;
}

/**
 * Common hero section used on all inner pages (About, Careers, Manufacturing, etc.)
 */
export default function PageHero({
  heading,
  backgroundImage,
  backgroundImages,
  showScroll = true,
  paddingClass = "pt-[100px] md:pt-[150px] pb-[70px] ",
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Combine primary image with any additional images
  const allImages = backgroundImages
    ? [backgroundImage, ...backgroundImages]
    : [backgroundImage];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curtain reveal
      gsap.to(overlayRef.current, {
        height: '0%',
        duration: 1.5,
        ease: 'power4.inOut',
      });

      // Heading fade-in
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
        );
      }

      // Scroll indicator
      if (scrollRef.current) {
        gsap.fromTo(
          scrollRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.5 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden p-10 bg-black ${paddingClass}`}
    >
      {/* ── Curtain overlay (animates away) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-20 origin-top"
      />

      {/* ── Dark gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* ── Centered heading ── */}
      <div className="relative z-30 text-center px-6 max-w-6xl mx-auto">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-[72px] font-bold text-white leading-tight md:leading-[1em] mb-4 md:mb-6 opacity-0"
          style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
          }}
        >
          {heading}
        </h1>
      </div>

      {/* ── Mask-slider image area ── */}
      <div
        className="relative z-[1] w-full overflow-hidden"
        style={{ marginTop: '-50px' }}
      >
        {allImages.length === 1 ? (
          /* Single image */
          <div
            className="w-full bg-cover bg-center"
            style={{
              paddingTop: '37%',
              backgroundImage: `url(${allImages[0]})`,
            }}
          />
        ) : (
          /* Multiple images — simple crossfade slideshow */
          <div className="relative w-full" style={{ paddingTop: '37%' }}>
            {allImages.map((src, idx) => (
              <div
                key={idx}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${src})`,
                  animation: `heroSlideshow ${allImages.length * 5}s ${idx * 5}s infinite`,
                  opacity: idx === 0 ? 1 : 0,
                }}
              />
            ))}
          </div>
        )}

        {/* ── Scroll indicator ── */}
        {showScroll && (
          <div
            ref={scrollRef}
            className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
          >
            <span
              className="text-white text-sm font-normal text-center"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Scroll
              <br />
              <span className="inline-block animate-bounce mt-1 text-lg">↓</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
