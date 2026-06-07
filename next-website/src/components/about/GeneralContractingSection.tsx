import React from 'react';

export default React.memo(function GeneralContractingSection() {
  return (
    <section className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              General<br />Contracting
            </h2>
          </div>
          <div className="space-y-4">
            <p
              className="text-[#A7A7A7] text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              From planning + design to complete construction, our office fit-out contractors create workplaces that reflect creativity &amp; innovation.
            </p>
            <p
              className="text-[#A7A7A7] text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              We offer end-to-end solutions to create deeply intuitive and aesthetically pleasing workspaces. What makes us unique is how we actively collaborate, discuss and work with our clients + leading construction professionals worldwide to ensure our outcome exceeds clients&apos; expectations.
            </p>
            <p
              className="text-[#A7A7A7] text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Currently, our focus is on integrating sustainable solutions to complete projects. In the end, what you get is a state-of-the-art workspace that reflects your brand&apos;s true essence and promotes your staff&apos;s overall well-being. Some of the world&apos;s most recognizable brands have workspaces we have designed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
