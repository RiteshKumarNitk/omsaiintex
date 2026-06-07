"use client";

import React from 'react';
import ProjectsHeroSection from '@/components/projects/ProjectsHeroSection';
import ProjectsIntroSection from '@/components/projects/ProjectsIntroSection';
import ProjectStatsSection from '@/components/projects/ProjectStatsSection';
import FeaturedProjectsShowcase from '@/components/projects/FeaturedProjectsShowcase';
import PageCTASection from '@/components/shared/PageCTASection';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full bg-[#121B1D]">
      <ProjectsHeroSection />
      <ProjectsIntroSection />
      <FeaturedProjectsShowcase />
      <ProjectStatsSection />
      <PageCTASection title="Looking to build a great workspace?" />
    </div>
  );
}
