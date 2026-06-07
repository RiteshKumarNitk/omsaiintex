"use client";

import React from 'react';
import ProjectsHeroSection from '@/components/projects/ProjectsHeroSection';
import ProjectShowcaseSection from '@/components/projects/ProjectShowcaseSection';
import ProjectsIntroSection from '@/components/projects/ProjectsIntroSection';
import ProjectStatsSection from '@/components/projects/ProjectStatsSection';
import ProjectsGridSection from '@/components/projects/ProjectsGridSection';
import HorizontalScrollShowcase from '@/components/sections/HorizontalScrollShowcase';
import PageCTASection from '@/components/shared/PageCTASection';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full bg-[#121B1D]">
      <ProjectsHeroSection />
      <ProjectsIntroSection />
      <ProjectShowcaseSection />
      <HorizontalScrollShowcase />
      <ProjectStatsSection />
      <ProjectsGridSection />
      <PageCTASection title="Looking to build a great workspace?" />
    </div>
  );
}
