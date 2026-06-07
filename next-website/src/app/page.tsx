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
const RoomVisualizer = dynamic(() => import('@/components/three/RoomVisualizer'), { ssr: false });

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <IntroSection />
      <StatsSection />
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-[#0a0a14]">
        <RoomVisualizer />
        {/* Gradient overlays for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121B1D] via-transparent to-[#121B1D] z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121B1D]/50 via-transparent to-[#121B1D]/50 z-[1] pointer-events-none" />
        {/* Content overlay */}
        {/* <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <div className="text-center px-6">
            <p className="text-[#4f8cf7] text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Interactive 3D Experience
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Move your mouse to explore
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Experience our premium workspace designs in an interactive 3D environment
            </p>
          </div>
        </div> */}
      </section>
      <VisionariesSection />
      <ClientsSection />
      <ProjectsSection />
      {/* <CTASection title="Let's build your next workspace" buttonText="Let's Talk" buttonLink="/contact" /> */}
      {/* <QualitiesSection /> */}
      <WorkspaceSection />
      <ManufacturingSection />
      <TestimonialsSection />
      <CTASection title="Have a project in mind?" buttonText="Let's Talk" buttonLink="/contact" />
      {/* <CareersSection /> */}
    </div>
  );
}
