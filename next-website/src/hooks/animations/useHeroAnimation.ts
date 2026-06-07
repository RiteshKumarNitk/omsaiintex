'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

interface HeroAnimationRefs {
  overlayRef: RefObject<HTMLDivElement | null>;
  heroContentRef: RefObject<HTMLDivElement | null>;
  heroTitleRef: RefObject<HTMLHeadingElement | null>;
  heroButtonsRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
}

export function useHeroAnimation(refs: HeroAnimationRefs) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const { overlayRef, heroContentRef, heroTitleRef, heroButtonsRef, heroRef } = refs;

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
    });

    return () => ctx.revert();
  }, []);
}
