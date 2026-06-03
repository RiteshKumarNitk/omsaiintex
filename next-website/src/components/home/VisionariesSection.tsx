"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionariesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(textRef.current?.children as unknown as HTMLElement[],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-black text-white flex flex-col items-center justify-center relative">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <h2 
          ref={titleRef} 
          className="text-6xl md:text-8xl font-bold mb-16 tracking-tighter"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
        >
          Our <br />
          <span className="text-white" style={{ WebkitTextStroke: "0px" }}>Visionaries</span>
        </h2>
        
        <div ref={textRef} className="space-y-8 text-gray-400 text-lg leading-relaxed">
          <p>
            From 2003 till date, these four visionary leaders have worked on numerous commercial, industrial, IT & corporate & interior fit-out projects.
          </p>
          <p>
            The goal? —To leave a lasting engineering heritage that changes how people experience an office and help office-goers rise to their best potential. All these years they continued to work hard and earn invaluable market & on ground experience that eventually laid the foundation for OSIPL to be born.
          </p>
        </div>
      </div>
    </section>
  );
}
