import React from 'react';

export default function IntroSection() {
  return (
    <section className="py-20 md:py-28 bg-[#121B1D] border-b border-[#5A5A5A]/30">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Delivering Cohesive offices from{' '}
              <span className="text-[#0065AC]">conception to completion</span>
            </h2>
          </div>
          <div>
            <p
              className="text-[#A7A7A7] text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Open high-end corporate offices, hybrid agile offices or creative hubs. The team has created bespoke
              functional workspaces that stimulates togetherness, creativity and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
