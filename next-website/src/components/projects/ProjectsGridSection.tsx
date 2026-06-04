"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Commercial", "Industrial", "IT & Corporate", "Interior Fit-out"];

const projects = [
  { title: "Corporate Office Interior", category: "Interior Fit-out", location: "Bangalore", image: "project-1.jpg" },
  { title: "IT Park Development", category: "IT & Corporate", location: "Bangalore", image: "project-2.jpg" },
  { title: "Industrial Warehouse", category: "Industrial", location: "Bangalore", image: "project-3.jpg" },
  { title: "Commercial Complex", category: "Commercial", location: "Bangalore", image: "project-4.jpg" },
  { title: "Tech Campus", category: "IT & Corporate", location: "Bangalore", image: "project-5.jpg" },
  { title: "Luxury Retail Space", category: "Commercial", location: "Bangalore", image: "project-6.jpg" },
  { title: "Factory Building", category: "Industrial", location: "Bangalore", image: "project-7.jpg" },
  { title: "Corporate HQ", category: "Interior Fit-out", location: "Bangalore", image: "project-8.jpg" },
];

export default function ProjectsGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".project-card", 
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className="py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={`${project.title}-${idx}`}
              className="project-card group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-blue-500/30 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-gray-600 text-center p-6">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-700">{project.image}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <div>
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">{project.category}</p>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
