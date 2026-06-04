"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Founder & CEO", role: "Leadership", initials: "RK" },
  { name: "COO", role: "Operations", initials: "SM" },
  { name: "CTO", role: "Technology", initials: "AP" },
  { name: "CFO", role: "Finance", initials: "VK" },
];

export default function AboutTeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
      gsap.fromTo(cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#121B1D] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-[100px] font-bold mb-20 text-center tracking-tighter"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
        >
          Our <br className="md:hidden" />
          <span className="text-white" style={{ WebkitTextStroke: "0px" }}>Team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="aspect-[3/4] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center border border-gray-700">
                  <span className="text-3xl font-bold text-gray-400">{member.initials}</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
