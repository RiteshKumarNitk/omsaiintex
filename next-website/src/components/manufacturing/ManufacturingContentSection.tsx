'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manufacturingContent } from '@/data/manufacturing/content';

gsap.registerPlugin(ScrollTrigger);

function ContentBlockComponent({ block }: { block: typeof manufacturingContent[0] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = sectionRef.current?.querySelectorAll('.anim-block');
      if (!blocks || blocks.length === 0) return;
      gsap.fromTo(blocks,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" style={{ marginTop: '60px', marginBottom: '60px' }}>
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className={`anim-block overflow-hidden rounded-lg relative ${block.imageFirst ? '' : 'order-2 md:order-1'}`} style={{ height: block.imageHeight }}>
            <Image
              src={block.image}
              alt={block.imageAlt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={`anim-block ${block.imageFirst ? '' : 'order-1 md:order-2'}`}>
            <h2 className="text-[30px] md:text-[36px] text-white leading-[50px] font-bold mb-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {block.title}
            </h2>
            {block.paragraphs.map((p, i) => (
              <p key={i} className={`text-[#A7A7A7] text-lg md:text-[20px] leading-[28px] ${i > 0 ? 'mt-6' : ''}`} style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(function ManufacturingContentSection() {
  return (
    <>
      {manufacturingContent.map((block, i) => (
        <ContentBlockComponent key={i} block={block} />
      ))}
    </>
  );
});
