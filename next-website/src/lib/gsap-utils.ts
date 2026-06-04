import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Split text into words wrapped in spans for word-by-word animation
 */
export function splitTextToWords(element: HTMLElement): HTMLSpanElement[][] {
  const text = element.textContent || '';
  element.textContent = '';
  
  const words = text.split(' ');
  const wordSpans: HTMLSpanElement[] = [];
  
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word + (i < words.length - 1 ? '\u00A0' : '');
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
    wordSpans.push(span);
  });
  
  return [wordSpans];
}

/**
 * Split text into characters wrapped in spans for character-by-character animation
 */
export function splitTextToChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  
  const charSpans: HTMLSpanElement[] = [];
  
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
    charSpans.push(span);
  }
  
  return charSpans;
}

/**
 * Animate words in with a stagger effect
 */
export function animateWordsIn(
  elements: HTMLSpanElement[],
  options?: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  return gsap.fromTo(
    elements,
    { y: 60, opacity: 0, rotateX: -45, ...options?.from },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: 'power4.out',
      ...options?.to,
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Animate characters in with a stagger effect
 */
export function animateCharsIn(
  elements: HTMLSpanElement[],
  options?: {
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  return gsap.fromTo(
    elements,
    { y: '100%', opacity: 0, rotation: 15 },
    {
      y: '0%',
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      stagger: options?.stagger || 0.02,
      ease: 'power3.out',
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Create a parallax effect on an element
 */
export function createParallax(
  element: HTMLElement,
  speed: number = 0.5
) {
  return gsap.to(element, {
    y: () => (typeof window !== 'undefined' ? window.innerHeight * speed * -1 : 100),
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Image reveal animation - clips from bottom
 */
export function imageReveal(
  element: HTMLElement,
  options?: {
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  const direction = options?.direction || 'up';
  const fromVars: gsap.TweenVars = {};
  const clipMap: Record<string, string> = {
    up: 'rect(100% 100% 0% 0%)',
    down: 'rect(0% 100% 100% 0%)',
    left: 'rect(0% 0% 100% 0%)',
    right: 'rect(0% 100% 100% 100%)',
  };
  
  fromVars.clip = clipMap[direction];
  
  return gsap.fromTo(
    element,
    fromVars,
    {
      clip: 'rect(0% 100% 100% 0%)',
      duration: options?.duration || 1.5,
      ease: 'power4.inOut',
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Smooth scroll setup using Lenis
 */
export function setupSmoothScroll() {
  // Dynamic import for Lenis
  return import('lenis').then((mod) => {
    const Lenis = mod.default;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    (lenis as any).on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  });
}

/**
 * Counter animation
 */
export function animateCounter(
  element: HTMLElement,
  start: number,
  end: number,
  options?: {
    duration?: number;
    suffix?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) {
  const duration = options?.duration || 2;
  const suffix = options?.suffix || '';
  
  const obj = { val: start };
  
  return gsap.to(obj, {
    val: end,
    duration,
    ease: 'power2.out',
    scrollTrigger: options?.scrollTrigger || { trigger: element, start: 'top 85%' },
    onUpdate: () => {
      element.textContent = Math.round(obj.val).toString() + suffix;
    },
  });
}

/**
 * Horizontal scroll animation for project showcase
 */
export function horizontalScroll(
  container: HTMLElement,
  sections: HTMLElement[],
  options?: {
    scrollAmount?: number;
    scrub?: number;
  }
) {
  const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
  const scrollAmount = options?.scrollAmount || totalWidth;

  return gsap.to(container, {
    x: () => -(scrollAmount - (typeof window !== 'undefined' ? window.innerWidth : 0)),
    ease: 'none',
    scrollTrigger: {
      trigger: container.parentElement || container,
      pin: true,
      start: 'top top',
      end: () => `+=${scrollAmount}`,
      scrub: options?.scrub || 1,
      invalidateOnRefresh: true,
    },
  });
}
