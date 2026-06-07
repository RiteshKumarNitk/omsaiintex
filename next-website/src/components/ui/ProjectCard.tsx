import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/home';

interface ProjectCardProps {
  project: Project;
}

export default React.memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card relative overflow-hidden shadow-lg shadow-black/5 flex-shrink-0 w-[280px] md:w-[320px]">
      <div className="aspect-[3/4] relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          sizes="320px"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h4
          className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {project.title}
        </h4>
        <Link
          href="/projects"
          className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-all duration-300"
        >
          View Details
          <svg className="w-2.5 h-2.5 ml-1 hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
});
