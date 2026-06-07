import React from 'react';
import Link from 'next/link';

export default function CareersSection() {
  return (
    <section className="py-20 md:py-24 bg-[#121B1D] text-center border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <p
          className="text-6xl md:text-8xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          3000<span className="text-[#0065AC]">+</span>
        </p>
        <p
          className="text-white/50 text-sm uppercase tracking-[0.15em] mb-8"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Skilled Professionals
        </p>
        <p
          className="text-[#A7A7A7] text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Join our team of specialists to make a difference with your skills
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center px-8 py-3.5 bg-[#0065AC] text-white font-medium rounded hover:bg-[#00508A] transition-all duration-300"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Join us
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
