"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import StatsSection from '@/components/home/StatsSection';
import VisionariesSection from '@/components/home/VisionariesSection';
import ClientsSection from '@/components/home/ClientsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import CTASection from '@/components/shared/CTASection';

// Lazy-load non-critical below-the-fold sections for performance
const QualitiesSection = dynamic(() => import('@/components/home/QualitiesSection'), { ssr: false });
const WorkspaceSection = dynamic(() => import('@/components/home/WorkspaceSection'), { ssr: false });
const ManufacturingSection = dynamic(() => import('@/components/home/ManufacturingSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), { ssr: false });
const CareersSection = dynamic(() => import('@/components/home/CareersSection'), { ssr: false });

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <IntroSection />
      <StatsSection />
      <VisionariesSection />
      <ClientsSection />
      <ProjectsSection />
      <CTASection title="Let's build your next workspace" buttonText="Let's Talk" buttonLink="/contact" />      <QualitiesSection />
      <WorkspaceSection />
      <ManufacturingSection />
      <TestimonialsSection />
      <CTASection title="Have a project in mind?" buttonText="Let's Talk" buttonLink="/contact" />
      <CareersSection />
    </div>
  );
}
