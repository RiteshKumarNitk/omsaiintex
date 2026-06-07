import React from 'react';
import Link from 'next/link';

export default React.memo(function PageCTASection({ title }: { title?: string }) {
  return (
    <section className="py-10 md:py-16" style={{ backgroundColor: '#0065AC' }}>
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2
          className="text-2xl md:text-[26px] font-semibold text-white text-center md:text-left"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {title || "Elevate your workspace today"}
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center text-white font-normal text-xl border border-white rounded hover:bg-white hover:text-[#0065AC] transition-all duration-300"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif', width: '178px', padding: '10px' }}
        >
          Contact us
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
});
