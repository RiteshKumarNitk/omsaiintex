import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import VisionariesSection from '@/components/home/VisionariesSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-black">
      <HeroSection />
      <StatsSection />
      <VisionariesSection />
      {/* Additional sections like Clients, Marquee, Manufacturing Unit teaser would go here */}
    </div>
  );
}
