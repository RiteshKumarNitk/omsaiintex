'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactInfo } from '@/data/contact/info';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function ContactInfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = sectionRef.current?.children;
      if (children && children.length > 0) {
        gsap.fromTo(children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.5 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full mx-auto px-6 md:px-10 pb-24" style={{ maxWidth: '970px' }}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Have a project in mind?
          </h2>
        </div>
        {contactInfo.map((info, i) => (
          <div key={i}>
            <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {info.label}
            </h3>
            <p className="text-[#A7A7A7] text-base">{info.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
