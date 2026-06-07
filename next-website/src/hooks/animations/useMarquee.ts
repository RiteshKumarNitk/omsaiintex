'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';

interface MarqueeOptions {
  /** The track element to animate */
  trackRef: RefObject<HTMLElement | null>;
  /** Duration of one full cycle in seconds */
  duration?: number;
  /** Whether to pause on mouse hover */
  pauseOnHover?: boolean;
}

export function useMarquee({
  trackRef,
  duration = 45,
  pauseOnHover = false,
}: MarqueeOptions) {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration,
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [trackRef, duration]);

  // Handle pause-on-hover with proper cleanup
  useEffect(() => {
    if (!pauseOnHover || !trackRef.current) return;

    const el = trackRef.current;
    const onEnter = () => tweenRef.current?.pause();
    const onLeave = () => tweenRef.current?.resume();

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [pauseOnHover, trackRef]);
}
