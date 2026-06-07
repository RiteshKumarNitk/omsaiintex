import React from 'react';

export default function WorkspaceSection() {
  return (
    <section className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-white/60 text-lg"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Skilled Professionals
            </p>
            <p
              className="text-white text-xl md:text-2xl font-light tracking-wider"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Open high-end corporate offices, hybrid agile offices or creative hubs. The team has created bespoke functional workspaces that simulates togetherness, creativity and collaboration.

            </p>
          </div>
          <div className="text-right">
            <h2
              className="text-[3rem] md:text-[6rem] lg:text-[8rem] font-bold leading-[1] text-outline-2 mb-6 select-none"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}
            >
              30,000 +
            </h2>
            <p
              className="text-white/60 text-lg"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Skilled Professionals
            </p>
            <p
              className="text-white mt-6 text-lg leading-relaxed max-w-md ml-auto"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Housing a top-of-the-line CNC-enabled production line to fulfill clients&apos; custom manufacturing or modular needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
