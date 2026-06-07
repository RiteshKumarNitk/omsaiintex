'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import OutlineHeading from '@/components/ui/OutlineHeading';
import { testimonials } from '@/data/home/testimonials';

export default React.memo(function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const currentRef = useRef(0);

  // Keep ref in sync
  currentRef.current = current;

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (isAnimatingRef.current || index === currentRef.current) return;
      setDirection(dir);
      isAnimatingRef.current = true;
      setIsAnimating(true);
      setCurrent(index);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, 500);
    },
    [],
  );

  const nextSlide = useCallback(() => {
    const nextIndex = (currentRef.current + 1) % testimonials.length;
    goTo(nextIndex, 'right');
  }, [goTo]);

  const prev = useCallback(() => {
    const prevIndex = (currentRef.current - 1 + testimonials.length) % testimonials.length;
    goTo(prevIndex, 'left');
  }, [goTo]);

  // Stable auto-play — interval never restarts on state changes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) nextSlide();
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, [nextSlide]);

  // Pause / resume on hover
  const pauseAutoplay = () => {
    isPausedRef.current = true;
  };
  const resumeAutoplay = () => {
    isPausedRef.current = false;
  };

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 bg-[#121B1D] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <OutlineHeading className="testimonials-title">Testimonials</OutlineHeading>
        </div>

        {/* Slider */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Quote content — centered between arrows */}
          <div className="text-center min-h-[240px] flex flex-col items-center justify-center px-14 md:px-24">
            <svg
              key={`icon-${current}`}
              className={`w-10 h-10 text-[#0065AC]/30 mb-6 flex-shrink-0 ${
                direction === 'right'
                  ? 'animate-slide-in-right'
                  : 'animate-slide-in-left'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p
              key={current}
              className={`text-white/80 text-lg md:text-xl leading-relaxed text-center max-w-2xl transition-all duration-500 ${
                direction === 'right'
                  ? 'animate-slide-in-right'
                  : 'animate-slide-in-left'
              }`}
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            <div
              key={`author-${current}`}
              className={`mt-8 text-center transition-all duration-500 delay-100 ${
                direction === 'right'
                  ? 'animate-slide-in-right'
                  : 'animate-slide-in-left'
              }`}
            >
              <p
                className="text-white font-semibold text-lg"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {t.author}
              </p>
              <p
                className="text-white/40 text-sm mt-1"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                {t.role}
              </p>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-[#0065AC]/50 transition-all duration-300 group z-10"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-[#0065AC]/50 transition-all duration-300 group z-10"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-[#0065AC]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
