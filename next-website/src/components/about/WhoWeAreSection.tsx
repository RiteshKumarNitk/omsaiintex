'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function WhoWeAreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = "Who we are".split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (wordEls.length > 0) {
        gsap.fromTo(wordEls,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[1000px] flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0 bg-cover bg-top"
        style={{
          backgroundImage: 'url(/assets/images/2023/06/team-image3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80 z-10" />

      <div className="relative z-20 w-full px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-[12vw] md:text-[100px] font-bold text-outline-hover leading-[1em]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordsRef.current[i] = el; }}
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {word}{i < words.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-24">
          <div className="md:pr-[30px]">
            <h3
              className="text-3xl md:text-[46px] font-bold text-white leading-[1.2em]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Elevating Businesses<br />
              <span className="text-[#0065AC]">by Transforming Workspaces.</span>
            </h3>
          </div>
          <div className="md:pl-[30px]">
            <p
              className="text-white text-lg md:text-xl leading-[1.2em]"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              We offer top-notch office design-build solutions, complete with general contracting services, as we aspire to become India&apos;s best, most trusted corporate office design-build company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
