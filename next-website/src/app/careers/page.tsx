"use client";

import React from 'react';
import CareersHeroSection from '@/components/careers/CareersHeroSection';
import CareersIntroSection from '@/components/careers/CareersIntroSection';
import JobOpeningsSection from '@/components/careers/JobOpeningsSection';
import CareersFormSection from '@/components/careers/CareersFormSection';
import PageCTASection from '@/components/shared/PageCTASection';

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full bg-[#121B1D]">
      <CareersHeroSection />
      <CareersIntroSection />
      <JobOpeningsSection />
      <CareersFormSection />
      <PageCTASection />
    </div>
  );
}
