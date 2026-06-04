"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function ManufacturingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const reliableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero overlay animation
      gsap.to(overlayRef.current, {
        height: '0%', duration: 1.5, ease: 'power4.inOut',
      });

      // Heading word split animation
      const heroH1 = heroRef.current?.querySelector('h1');
      if (heroH1) {
        const [words] = splitTextToWords(heroH1);
        animateWordsIn(words, {
          from: { y: 60, opacity: 0, rotateX: -30 },
          to: { duration: 1.2, stagger: 0.03, ease: 'power4.out', delay: 0.6 },
        });
      }

      // Scroll text fade in
      gsap.fromTo(scrollRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5 }
      );

      // Animate sections on scroll
      const sections = [
        { ref: introRef, stagger: 0.15 },
        { ref: originRef, stagger: 0.2 },
        { ref: whyRef, stagger: 0.2 },
        { ref: reliableRef, stagger: 0.2 },
      ];

      sections.forEach(({ ref, stagger }) => {
        const blocks = ref.current?.querySelectorAll('.anim-block');
        if (!blocks || blocks.length === 0) return;
        gsap.fromTo(
          blocks,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%' },
          }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const slides = [
    { src: '/assets/images/2023/05/factory-banner-1.jpg', alt: 'Factory exterior' },
    { src: '/assets/images/2023/05/DJI_0047.jpg', alt: 'Factory aerial view' },
    { src: '/assets/images/2023/05/manufacturing-block4.jpg', alt: 'Manufacturing block' },
  ];

  return (
    <div ref={mainRef} className="flex flex-col w-full bg-[#121B1D]">

      {/* ════════════════════════════════════════════
          HERO - padding: 150px 0px 70px 0px
          72px Montserrat heading centered
          Mask slider with padding-top: 40%
          "Scroll ↓" at bottom
         ════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-black"
        style={{ padding: '150px 0px 70px 0px' }}
      >
        {/* Background mask slider carousel */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ paddingTop: '40%' }}>
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="absolute inset-0 bg-cover bg-center slideshow-fade"
                style={{
                  backgroundImage: `url(${slide.src})`,
                  animationDelay: `${idx * 5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10" />

        {/* Curtain overlay for initial animation */}
        <div ref={overlayRef} className="absolute inset-0 bg-black z-20 origin-top" />

        {/* Centered heading */}
        <div className="relative z-30 text-center px-6 max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
          <h1
            ref={heroRef}
            className="text-[10vw] md:text-[72px] font-bold text-white leading-[1em]"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            The Secret To<br className="hidden md:inline" /> Our Success
          </h1>
        </div>

        {/* Scroll indicator */}
        <p
          ref={scrollRef}
          className="absolute left-1/2 -translate-x-1/2 z-30 text-white text-sm font-normal flex flex-col items-center gap-1"
          style={{ bottom: '9px', fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          Scroll
          <br />
          ↓
        </p>
      </section>

      {/* ════════════════════════════════════════════
          INTRODUCTION - margin-top: 150px, margin-bottom: 70px
          Two columns: left heading 36px Montserrat, right text 20px #A7A7A7
          Image below: height 486px, object-fit cover
         ════════════════════════════════════════════ */}
      <section
        ref={introRef}
        className="w-full"
        style={{ marginTop: '150px', marginBottom: '70px' }}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="anim-block">
              <h2
                className="text-[30px] md:text-[36px] text-white leading-[50px] font-bold"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {/* Heading text — from original elementor-9143 */}
                Set up in 2008, covering 80,000 sq. ft. built to support<br />
                CNC-enabled production
              </h2>
            </div>
            <div className="anim-block">
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px]"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                Our factory Sleekline Modular Solutions caters to fulfill clients&apos; custom
                manufacturing demands and interior design requirements swiftly.
              </p>
            </div>
          </div>

          {/* Full-width image - 486px height */}
          <div className="anim-block mt-10 md:mt-16 overflow-hidden rounded-lg">
            <img
              src="/assets/images/2023/05/factory-banner-1.jpg"
              alt="Sleekline Modular Solutions factory"
              className="w-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ height: '486px' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ORIGINS OF SLEEKLINE - Image 360px + text
         ════════════════════════════════════════════ */}
      <section ref={originRef} className="w-full" style={{ marginTop: '60px', marginBottom: '60px' }}>
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="anim-block overflow-hidden rounded-lg">
              <img
                src="/assets/images/2023/05/DJI_0047.jpg"
                alt="Origins of Sleekline"
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: '360px' }}
              />
            </div>
            <div className="anim-block">
              <h2
                className="text-[30px] md:text-[36px] text-white leading-[50px] font-bold mb-4"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Origins of<br />
                Sleekline Modular Solutions
              </h2>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px]"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                The genesis of Sleekline Modular Solutions is the output of four civil engineers and
                visionaries. Set up in 2008, these four men brought 100+ man-hours of experience
                coupled with strengths like being actively involved in projects, in-depth technical
                knowledge, and a high degree of reliability &amp; commitment.
              </p>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px] mt-6"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                Their collective experience assisted in manufacturing interior products and setting up
                an expansive network of suppliers, helping OSIPL become an enterprise synonymous with
                quality and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHY WAS SLEEKLINE SET UP? - Image 441px + text
         ════════════════════════════════════════════ */}
      <section ref={whyRef} className="w-full" style={{ marginTop: '60px', marginBottom: '60px' }}>
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="anim-block order-2 md:order-1">
              <h2
                className="text-[30px] md:text-[36px] text-white leading-[50px] font-bold mb-4"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Why Was Sleekline<br />
                Set Up?
              </h2>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px]"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                We understand why clients need customization &mdash; to enhance the appeal of a workspace
                and replicate a stunning finish in every corner. To fulfill custom requirements, we set
                up our first facility Sleekline Modular Solutions at Hennur, Bangalore.
              </p>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px] mt-6"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                We brought the latest technology, machinery, and equipment to handle what our clients
                wanted. Our workforce comprises highly skilled technical supervisors and a design team,
                who collectively ensure a smooth and non-stop supply of products while maintaining
                quality standards.
              </p>
            </div>
            <div className="anim-block order-1 md:order-2 overflow-hidden rounded-lg">
              <img
                src="/assets/images/2023/05/interiors-2.png"
                alt="Why Sleekline was set up"
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: '441px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHAT MAKES US RELIABLE? - Image 451px + text
         ════════════════════════════════════════════ */}
      <section ref={reliableRef} className="w-full" style={{ marginTop: '60px', marginBottom: '60px' }}>
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="anim-block overflow-hidden rounded-lg">
              <img
                src="/assets/images/2023/05/manufacturing-block4.jpg"
                alt="Manufacturing reliability"
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: '451px' }}
              />
            </div>
            <div className="anim-block">
              <h2
                className="text-[30px] md:text-[36px] text-white leading-[50px] font-bold mb-4"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                What Makes Us<br />
                Reliable?
              </h2>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px]"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                The offsite procurement, cost estimation, and administration teams form our backbone.
              </p>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px] mt-6"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                Unsurprisingly, all team members bring vast experience to Om Sai Intex.
              </p>
              <p
                className="text-[#A7A7A7] text-lg md:text-[20px] leading-[28px] mt-6"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                Om Sai Intex comprises highly experienced project team managers, among other onsite team
                members. All team members have experience in successfully dealing with dynamic work
                circumstances and clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA - background: #0065AC, padding: 10px 0px
          26px Montserrat heading, border-style button 178px
         ════════════════════════════════════════════ */}
      <section
        className="w-full"
        style={{ backgroundColor: '#0065AC', padding: '10px 0px' }}
      >
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2
            className="text-2xl md:text-[26px] font-semibold text-white text-center md:text-left"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Elevate your workspace today
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-white font-normal text-xl border border-solid border-white rounded hover:bg-white hover:text-[#0065AC] transition-all duration-300"
            style={{
              fontFamily: 'var(--font-red-hat), sans-serif',
              width: '178px',
              padding: '10px',
            }}
          >
            Contact us
          </Link>
        </div>
      </section>


    </div>
  );
}
