"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "State-of-the-Art Machinery",
    description: "Our manufacturing unit is equipped with the latest CNC machines, automated cutting systems, and precision tools that ensure every component meets the highest quality standards.",
    imageSide: "right" as const,
  },
  {
    title: "Skilled Workforce",
    description: "Our team of experienced craftsmen, engineers, and technicians bring decades of expertise to every project. Continuous training ensures they stay updated with the latest techniques.",
    imageSide: "left" as const,
  },
  {
    title: "Quality Control",
    description: "Rigorous quality checks at every stage of production ensure that every product leaving our facility meets the exact specifications and quality standards our clients expect.",
    imageSide: "right" as const,
  },
  {
    title: "Sustainable Practices",
    description: "We employ eco-friendly manufacturing processes, optimize material usage to minimize waste, and use energy-efficient equipment to reduce our environmental footprint.",
    imageSide: "left" as const,
  },
];

export default function ManufacturingGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feature-block").forEach((block) => {
        gsap.fromTo(block,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 80%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 space-y-24">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="feature-block grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {feature.imageSide === 'left' ? (
              <>
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-800">
                  <div className="text-gray-600 text-center p-8">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p className="text-sm text-gray-700">Manufacturing image {idx + 1}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-[36px] font-semibold text-white leading-[1.3] mb-6">
                    {feature.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-[36px] font-semibold text-white leading-[1.3] mb-6">
                    {feature.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-800">
                  <div className="text-gray-600 text-center p-8">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p className="text-sm text-gray-700">Manufacturing image {idx + 1}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
