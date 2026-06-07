"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;
    if (!cursor || !follower) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0, ease: 'none' });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' });
    };

    const onHoverIn = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const isLg = target.dataset.cursorSize === 'lg';

      gsap.to(follower, {
        x: centerX,
        y: centerY,
        scale: isLg ? 5 : 3,
        borderColor: 'rgba(255,255,255,0.8)',
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(cursor, { scale: 0, duration: 0.2, ease: 'power2.out' });
      if (label) gsap.set(label, { display: 'block', opacity: 1 });
    };

    const onHoverOut = () => {
      gsap.to(follower, {
        x: posRef.current.x,
        y: posRef.current.y,
        scale: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      if (label) gsap.set(label, { display: 'none', opacity: 0 });
    };

    const selectors = 'a, button, [data-cursor], .project-card, input, textarea, select';

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(selectors).forEach(el => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    addListeners();
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(selectors).forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
    }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 border border-white rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'difference' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'difference' }}
      >
        <span ref={labelRef} className="hidden text-[8px] font-bold uppercase tracking-[0.2em] text-white select-none">View</span>
      </div>
    </>
  );
}
