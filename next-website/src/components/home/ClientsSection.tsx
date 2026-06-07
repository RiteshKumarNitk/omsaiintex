'use client';

import React, { useRef } from 'react';
import ClientLogoCard from '@/components/ui/ClientLogoCard';
import { clientLogos } from '@/data/home/clients';
import { useMarquee } from '@/hooks/animations/useMarquee';

export default React.memo(function ClientsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useMarquee({
    trackRef,
    duration: 35,
  });

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2
          className="text-4xl md:text-6xl font-bold text-[#252525] mb-12"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Clients &amp; Partners
        </h2>

        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div ref={trackRef} className="flex gap-8 items-center w-max">
            {[...clientLogos, ...clientLogos].map((cl, i) => (
              <ClientLogoCard key={i} logo={cl} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
