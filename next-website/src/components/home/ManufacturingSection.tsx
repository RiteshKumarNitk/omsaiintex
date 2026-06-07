import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default React.memo(function ManufacturingSection() {
  return (
    <section className="relative h-[72vh] min-h-[500px] overflow-hidden">
      <Image
        src="/assets/images/2023/06/manufacturing-unit.jpg"
        alt="Manufacturing Unit"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #00000000 0%, #000000 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
        <div className="container mx-auto px-6 md:px-12">
          <p
            className="text-white/50 text-sm uppercase tracking-[0.25em] mb-2"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Our Manufacturing Unit

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
