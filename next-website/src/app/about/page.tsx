"use client";

import React, { useRef } from 'react';
import PageHero from '@/components/shared/PageHero';
import SplitTextSection from '@/components/shared/SplitTextSection';
import FullWidthImageSection from '@/components/about/FullWidthImageSection';
import WhoWeAreSection from '@/components/about/WhoWeAreSection';
import TeamStatsSection from '@/components/about/TeamStatsSection';
import AwardsSection from '@/components/about/AwardsSection';
import HistorySection from '@/components/about/HistorySection';
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider';
import PageCTASection from '@/components/shared/PageCTASection';

export default function AboutPage() {
  const designBuildRef = useRef<HTMLElement>(null);
  const generalContractingRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-col w-full bg-[#121B1D]">
      <PageHero
        heading={<>We are a corporate Interior<br className="hidden md:inline" /> fit out &amp; design build firm</>}
        backgroundImage="/assets/images/2023/06/about-banner.jpg"
        paddingClass="pt-[150px] md:pt-[250px] pb-[70px]"
      />
      <SplitTextSection
        ref={designBuildRef}
        heading={<>Design<br />&amp; Build</>}
        content={
          <>
            <p>We offer interior design &amp; visualization, furniture sourcing + delivery among other interior fit-out solutions.</p>
            <p>Our process incorporates the transformative design philosophy, providing precise results at exceptional speed and cost-effective prices through best-in-class technology &amp; tools.</p>
            <p>Our in-house corporate interior designers, project managers, architects &amp; quantity surveyors come with many years of work-ex, ultimately delivering the best results you can find.</p>
          </>
        }
      />
      <SplitTextSection
        ref={generalContractingRef}
        heading={<>General<br />Contracting</>}
        content={
          <>
            <p>From planning + design to complete construction, our office fit-out contractors create workplaces that reflect creativity &amp; innovation.</p>
            <p>We offer end-to-end solutions to create deeply intuitive and aesthetically pleasing workspaces. What makes us unique is how we actively collaborate, discuss and work with our clients.</p>
            <p>Currently, our focus is on integrating sustainable solutions to complete projects.</p>
          </>
        }
      />
      <FullWidthImageSection />
      <WhoWeAreSection />
      <TeamStatsSection />
      <BeforeAfterSlider />
      <AwardsSection />
      <HistorySection />
      <PageCTASection />
    </div>
  );
}
