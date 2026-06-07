'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  /** The trigger element ref */
  trigger: RefObject<HTMLElement | null>;
  /** CSS selector for elements to animate, or use direct children */
  selector?: string;
  /** Direction of animation */
  direction?: 'up' | 'scale';
  /** Stagger delay between elements */
  stagger?: number;
  /** Animation duration */
  duration?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Animation delay */
  delay?: number;
}

export function useScrollReveal({
  trigger,
  selector,
  direction = 'up',
  stagger = 0.15,
  duration = 0.8,
  start = 'top 80%',
  delay = 0,
}: ScrollRevealOptions) {
  useEffect(() => {
    if (!trigger.current) return;

    const ctx = gsap.context(() => {
      const elements = selector
        ? trigger.current!.querySelectorAll(selector)
        : trigger.current!.children;

      if (!elements || elements.length === 0) return;

      const fromVars = direction === 'scale'
        ? { scale: 0.85, opacity: 0 }
        : { y: 40, opacity: 0 };

      const toVars = direction === 'scale'
        ? { scale: 1, opacity: 1 }
        : { y: 0, opacity: 1 };

      gsap.fromTo(elements, fromVars, {
        ...toVars,
        duration,
        stagger,
        ease: direction === 'scale' ? 'back.out(1.7)' : 'power3.out',
        delay,
        scrollTrigger: {
          trigger: trigger.current!,
          start,
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, [trigger, selector, direction, stagger, duration, start, delay]);
}
