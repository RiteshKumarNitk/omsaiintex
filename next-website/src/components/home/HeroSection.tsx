"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MovingStars() {
  const starsRef = useRef<any>(null);
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0005;
      starsRef.current.rotation.y += 0.0005;
    }
  });
  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(headingRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo(subRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.6 }
      );

      // Scroll Parallax Animation
      gsap.to(headingRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <MovingStars />
        </Canvas>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <p ref={subRef} className="text-gray-400 uppercase tracking-[0.3em] mb-6 text-sm font-semibold">
          Transforming Creativity
        </p>
        <h1 ref={headingRef} className="text-7xl md:text-9xl font-extrabold text-white tracking-tighter leading-tight">
          Into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Reality.
          </span>
        </h1>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </div>
    </section>
  );
}
