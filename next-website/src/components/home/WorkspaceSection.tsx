import React from 'react';

export default function WorkspaceSection() {
  return (
    <section className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-[3rem] md:text-[6rem] lg:text-[8rem] font-bold leading-[1] text-outline-2 mb-6 select-none"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}
            >
              Creating spatially exciting workspaces
            </h2>
            <p
              className="text-white text-xl md:text-2xl font-light tracking-wider"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              tuned to its people
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-5xl md:text-7xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              80,000
            </p>
            <p
              className="text-white/60 text-lg"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              sq. ft state-of-the-art manufacturing facility
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
