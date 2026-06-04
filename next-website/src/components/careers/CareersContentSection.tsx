"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const positions = [
  {
    title: "Senior Project Manager",
    type: "Full Time",
    location: "Bangalore",
    description: "Lead and manage construction projects from conception to completion, ensuring timely delivery and quality standards."
  },
  {
    title: "Interior Designer",
    type: "Full Time",
    location: "Bangalore",
    description: "Create innovative and functional interior spaces that align with client vision and our design philosophy."
  },
  {
    title: "Site Engineer",
    type: "Full Time",
    location: "Bangalore",
    description: "Oversee on-site construction activities, coordinate with contractors, and ensure adherence to project specifications."
  },
  {
    title: "Business Development Executive",
    type: "Full Time",
    location: "Bangalore",
    description: "Drive business growth by identifying new opportunities and building strong client relationships."
  },
];

export default function CareersContentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
      gsap.fromTo(cardsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Current Openings</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            We're always looking for talented individuals to join our team. Check out our current openings below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {positions.map((pos, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">{pos.title}</h3>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">{pos.type}</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{pos.location}</p>
              <p className="text-gray-400 leading-relaxed">{pos.description}</p>
              <button className="mt-6 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors inline-flex items-center gap-1 group/btn">
                Apply Now
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
