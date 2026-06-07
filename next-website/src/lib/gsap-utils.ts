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
 * Image reveal animation - clips from a direction
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
  const clipMap: Record<string, string> = {
    up: 'rect(100% 100% 0% 0%)',
    down: 'rect(0% 100% 100% 0%)',
    left: 'rect(0% 0% 100% 0%)',
    right: 'rect(0% 100% 100% 100%)',
  };
  
  return gsap.fromTo(
    element,
    { clip: clipMap[direction] },
    {
      clip: 'rect(0% 100% 100% 0%)',
      duration: options?.duration || 1.5,
      ease: 'power4.inOut',
      scrollTrigger: options?.scrollTrigger,
    }
  );
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
