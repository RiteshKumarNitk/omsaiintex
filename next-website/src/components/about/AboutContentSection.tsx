"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContentBlockProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imagePosition: 'left' | 'right';
  idx: number;
}

function ContentBlock({ title, subtitle, imageSrc, imagePosition, idx }: ContentBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(blockRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: blockRef.current, start: "top 80%" }
        }
      );
    }, blockRef);
    return () => ctx.revert();
  }, []);

  const textContent = (
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl md:text-5xl lg:text-[60px] font-normal text-white leading-[1.2] mb-6">
        {title}
      </h2>
      <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );

  const imageContent = (
    <div className="relative overflow-hidden rounded-xl group">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
        <div className="text-gray-600 text-center p-8">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image: {imageSrc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={blockRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {imagePosition === 'left' ? (
        <>{imageContent}{textContent}</>
      ) : (
        <>{textContent}{imageContent}</>
      )}
    </div>
  );
}

const sections = [
  {
    title: "From 2003 till date, we have worked on numerous commercial, industrial, IT & corporate & interior fit-out projects.",
    subtitle: "The goal? —To leave a lasting engineering heritage that changes how people experience an office and help office-goers rise to their best potential. All these years we continued to work hard and earn invaluable market & on ground experience that eventually laid the foundation for OSIPL to be born.",
    imageSrc: "about-1.jpg",
    imagePosition: 'right' as const,
  },
  {
    title: "Our Visionary Leaders",
    subtitle: "Four visionary leaders with decades of combined experience in the construction and interior design industry. Their expertise spans across multiple domains including project management, design innovation, and sustainable construction practices.",
    imageSrc: "about-2.jpg",
    imagePosition: 'left' as const,
  },
];

export default function AboutContentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 space-y-24">
        {sections.map((section, idx) => (
          <ContentBlock key={idx} {...section} idx={idx} />
        ))}
      </div>
    </section>
  );
}
