'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectItems } from '@/data/projects/items';

function ProjectCard({ project, index }: { project: typeof projectItems[0]; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="project-card group relative overflow-hidden rounded-2xl bg-[#0a0f11] border border-white/5 hover:border-[#0065AC]/30 transition-colors duration-500">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white/80 text-xs font-medium rounded-full border border-white/10 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Project Number */}
          <div className="absolute top-4 right-4 z-10">
            <span className="text-white/30 text-sm font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Hover Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <p className="text-white/90 text-sm leading-relaxed mb-3" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              {project.description}
            </p>
            <div className="flex items-center gap-4 text-white/50 text-xs">
              {project.area && <span>{project.area}</span>}
              {project.year && <span>• {project.year}</span>}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 relative">
          <div className="flex items-center justify-between">
            <h3
              className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-[#0065AC] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {project.name}
            </h3>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:border-[#0065AC]/50 group-hover:bg-[#0065AC]/10 transition-all duration-300">
              <svg
                className="w-4 h-4 text-white/50 group-hover:text-[#0065AC] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#0065AC]/0 to-transparent group-hover:via-[#0065AC]/30 transition-all duration-500" />
        </div>
      </div>
    </Link>
  );
}

export default React.memo(function ProjectsGridSection() {
  return (
    <section className="py-20 md:py-32 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#0065AC] text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Featured <span className="text-[#0065AC]">Projects</span>
          </h2>
          <p className="text-[#A7A7A7] text-lg mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
            Explore our portfolio of transformative workspaces designed for leading brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {projectItems.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});
