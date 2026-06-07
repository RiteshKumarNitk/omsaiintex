'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const ManufacturingThreeScene = dynamic(
  () => import('@/components/three/ManufacturingThreeScene'),
  { ssr: false },
);

export default React.memo(function ManufacturingSection() {
  return (
    <section className="relative h-[72vh] min-h-[500px] overflow-hidden bg-[#0a0a14]">
      {/* Three.js animated background */}
      <Suspense
        fallback={
          <Image
            src="/assets/images/2023/06/manufacturing-unit.jpg"
            alt="Manufacturing Unit"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        }
      >
        <ManufacturingThreeScene />
      </Suspense>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #00000000 0%, #000000 100%)',
        }}
      />
      <div className="absolute inset-0 bg-[#0a0a14]/30 z-[1] pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 z-[2]">
        <div className="container mx-auto px-6 md:px-12">
          <p
            className="text-white/50 text-sm uppercase tracking-[0.25em] mb-2"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Our Facility
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Sleekline Modular Solutions
          </h2>
          <p
            className="text-white/70 text-lg md:text-xl max-w-xl"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            State-of-the-art 80,000 sq. ft manufacturing facility
          </p>
          <Link
            href="/manufacturing-unit"
            className="inline-flex items-center mt-6 px-8 py-3 bg-[#0065AC] text-white font-medium rounded hover:bg-[#00508A] transition-all duration-300"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Explore Facility
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});
