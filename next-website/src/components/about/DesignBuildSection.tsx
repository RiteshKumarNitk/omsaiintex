import React from 'react';

export default React.memo(function DesignBuildSection() {
  return (
    <section className="py-20 md:py-28 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Design<br />&amp; Build
            </h2>
          </div>
          <div className="space-y-4">
            <p
              className="text-[#A7A7A7] text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              We offer interior design &amp; visualization, furniture sourcing + delivery among other interior fit-out solutions.
            </p>
            <p
              className="text-[#A7A7A7] text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Our process incorporates the transformative design philosophy, providing precise results at exceptional speed and cost-effective prices through best-in-class technology &amp; tools.
            </p>
            <p
              className="text-[#A7A7A7] text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
            >
              Our in-house corporate interior designers, project managers, architects &amp; quantity surveyors come with many years of work-ex, ultimately delivering the best results you can find. We also undertake projects involving the improvement of existing office designs &mdash; we stay true to the original layout and identify the right enhancements to make your workspace shine the brightest in its league.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
