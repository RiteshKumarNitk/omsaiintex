import React from 'react';
import { Testimonial } from '@/types/home';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:border-[#0065AC]/20 transition-all duration-500 flex flex-col">
      <svg className="w-8 h-8 text-[#0065AC]/20 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p
        className="text-[#A7A7A7] leading-relaxed mb-6 flex-grow text-sm"
        style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="border-t border-white/5 pt-4">
        <p
          className="text-white font-semibold"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {testimonial.author}
        </p>
        <p
          className="text-white/40 text-sm"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}
