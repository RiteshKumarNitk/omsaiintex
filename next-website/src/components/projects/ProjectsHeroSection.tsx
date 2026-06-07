'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProjectsThreeScene = dynamic(
  () => import('@/components/three/ProjectsThreeScene'),
  { ssr: false },
);

export default React.memo(function ProjectsHeroSection() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Three.js animated background */}
      <Suspense fallback={null}>
        <ProjectsThreeScene />
      </Suspense>

      {/* Gradient overlay — subtle so Three.js images show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 md:px-12 max-w-6xl mx-auto py-24 md:py-32">
        <h1 className="text-5xl md:text-[6.875rem] font-bold text-white leading-[1em] tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          Our
        </h1>
        <h2 className="text-5xl md:text-[6.875rem] font-bold text-outline-hover leading-[1em] tracking-tight mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          Projects
        </h2>
        <p className="mt-8 text-[#A7A7A7] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
          Many have trusted us, and our exhaustive list of notable clients demonstrates our ability to bring great ideas to life.
        </p>
      </div>
    </section>
  );
});
