"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import SplitTextSection from '@/components/shared/SplitTextSection';

gsap.registerPlugin(ScrollTrigger);

const teamStats = [
  { value: "425+", label: "Technical & administrative staff" },
  { value: "2700+", label: "Skilled professionals" },
];

const whoWeAreWords = "Who we are".split(' ');

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const designBuildRef = useRef<HTMLDivElement>(null);
  const generalContractingRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const whoWeAreWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Design & Build section
      const dbChildren = designBuildRef.current?.children;
      if (dbChildren && dbChildren.length > 0) {
        gsap.fromTo(dbChildren,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: designBuildRef.current, start: 'top 85%' }
          }
        );
      }

      // General Contracting section
      const gcChildren = generalContractingRef.current?.children;
      if (gcChildren && gcChildren.length > 0) {
        gsap.fromTo(gcChildren,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: generalContractingRef.current, start: 'top 85%' }
          }
        );
      }

      // Who We Are section word animation
      const whoWeAreWordEls = whoWeAreWordsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (whoWeAreWordEls.length > 0) {
        gsap.fromTo(whoWeAreWordEls,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power4.out',
            scrollTrigger: { trigger: whoWeAreRef.current, start: 'top 75%' }
          }
        );
      }

      // Stats counters
      const statsChildren = statsRef.current?.children;
      if (statsChildren && statsChildren.length > 0) {
        gsap.fromTo(statsChildren,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
          }
        );
      }

      // Awards section
      const awardsChildren = awardsRef.current?.children;
      if (awardsChildren && awardsChildren.length > 0) {
        gsap.fromTo(awardsChildren,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: awardsRef.current, start: 'top 85%' }
          }
        );
      }

      // History section
      const historyChildren = historyRef.current?.children;
      if (historyChildren && historyChildren.length > 0) {
        gsap.fromTo(historyChildren,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: historyRef.current, start: 'top 85%' }
          }
        );
      }
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex  flex-col w-full bg-[#121B1D]">
      <PageHero
        heading={<>We are a corporate Interior<br className="hidden md:inline" /> fit out &amp; design build firm</>}
        backgroundImage="/assets/images/2023/06/about-banner.jpg"
        paddingClass="pt-[150px] md:pt-[250px] pb-[70px]"
      />
      {/* ════════════════════════════════════════════
          DESIGN & BUILD SECTION
         ════════════════════════════════════════════ */}
      <SplitTextSection
        ref={designBuildRef as any}
        heading={<>Design<br />&amp; Build</>}
        content={
          <>
            <p>
              We offer interior design &amp; visualization, furniture sourcing + delivery among other interior fit-out solutions.
            </p>
            <p>
              Our process incorporates the transformative design philosophy, providing precise results at exceptional speed and cost-effective prices through best-in-class technology &amp; tools.
            </p>
            <p>
              Our in-house corporate interior designers, project managers, architects &amp; quantity surveyors come with many years of work-ex, ultimately delivering the best results you can find. We also undertake projects involving the improvement of existing office designs &mdash; we stay true to the original layout and identify the right enhancements to make your workspace shine the brightest in its league.
            </p>
          </>
        }
      />

      <SplitTextSection
        ref={generalContractingRef as any}
        heading={<>General<br />Contracting</>}
        content={
          <>
            <p>
              From planning + design to complete construction, our office fit-out contractors create workplaces that reflect creativity &amp; innovation.
            </p>
            <p>
              We offer end-to-end solutions to create deeply intuitive and aesthetically pleasing workspaces. What makes us unique is how we actively collaborate, discuss and work with our clients + leading construction professionals worldwide to ensure our outcome exceeds clients&apos; expectations.
            </p>
            <p>
              Currently, our focus is on integrating sustainable solutions to complete projects. In the end, what you get is a state-of-the-art workspace that reflects your brand&apos;s true essence and promotes your staff&apos;s overall well-being. Some of the world&apos;s most recognizable brands have workspaces we have designed.
            </p>
          </>
        }
      />
      {/* ════════════════════════════════════════════
          FULL-WIDTH IMAGE
          Original: 354px height, object-fit cover, hover scale(1.05)
         ════════════════════════════════════════════ */}
      <section className="w-full bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="w-full overflow-hidden rounded-lg group">
            <img
              src="/assets/images/2023/06/who-we-are-image.jpg"
              alt="About Om Sai Intex"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ height: '354px' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GENERAL CONTRACTING SECTION
         ════════════════════════════════════════════ */}


      {/* ════════════════════════════════════════════
          WHO WE ARE SECTION
          Original: min-height 1000px, background slideshow,
          "Who we are" poppins 100px text-stroke (fills on hover),
          "Elevating Businesses" 46px Montserrat
         ════════════════════════════════════════════ */}
      <section ref={whoWeAreRef} className="relative w-full min-h-[1000px] flex items-center justify-center overflow-hidden bg-black">
        {/* Background slideshow style */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-top"
          style={{
            backgroundImage: 'url(/assets/images/2023/06/team-image3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80 z-10" />

        <div className="relative z-20 w-full px-6 md:px-12 max-w-6xl mx-auto">
          {/* "Who we are" in text-stroke - Poppins 100px, fills white on hover */}
          <div className="text-center mb-16">
            <h2
              className="text-[12vw] md:text-[100px] font-bold text-outline-hover leading-[1em]"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {whoWeAreWords.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { whoWeAreWordsRef.current[i] = el; }}
                  style={{ display: 'inline-block', opacity: 0 }}
                >
                  {word}{i < whoWeAreWords.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </h2>
          </div>

          {/* Two-column content below */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-24">
            <div className="md:pr-[30px]">
              <h3 className="text-3xl md:text-[46px] font-bold text-white leading-[1.2em]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Elevating Businesses<br />
                <span className="text-[#0065AC]">by Transforming Workspaces.</span>
              </h3>
            </div>
            <div className="md:pl-[30px]">
              <p className="text-white text-lg md:text-xl leading-[1.2em]" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                We offer top-notch office design-build solutions, complete with general contracting services, as we aspire to become India&apos;s best, most trusted corporate office design-build company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          OUR TEAM SECTION
          Original: #0F0F0F bg, square-bg.png overlay, text-stroke heading,
          2 counters (425+, 2700+) with 70px value, 18px label
         ════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="relative py-16 md:py-20 bg-[#0F0F0F] overflow-hidden"
      >
        {/* Square pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: 'url(/assets/images/2023/05/square-bg.png)',
            backgroundSize: 'auto',
          }}
        />
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          {/* "Our Team" heading in text-stroke */}
          <div className="text-center mb-16">
            <h2
              className="text-[12vw] md:text-[100px] font-bold text-outline leading-[1em]"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Our Team
            </h2>
          </div>

          {/* Two counters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {teamStats.map((stat, idx) => (
              <div key={idx} className="text-center text-white">
                <div className="text-[70px] leading-[1em] font-bold mb-0" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-lg leading-[36px] capitalize tracking-[0.8px]" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          AWARDS & RECOGNITION SECTION
          Original: "Awards & Recognition" poppins 100px text-stroke,
          description, carousel 4 items per view
         ════════════════════════════════════════════ */}
      <section ref={awardsRef} className="py-16 md:py-24 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h2
              className="text-[12vw] md:text-[100px] font-bold text-outline leading-[110px] mb-4 tracking-tighter"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}
            >
              Awards &amp;<br />
              Recognition
            </h2>
            <p className="text-[#A7A7A7] text-lg md:text-xl leading-[30px] mx-auto" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Every award in our name proves our daily dedication to providing high-quality products and services.
              Our focus is on strengthening our integrated management systems, improving our environmental performance,
              and continuing to serve the best office fit-out solutions to clients in pan-India.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          OSIPL HISTORY SECTION
          Original: "OSIPL History" poppins 100px text-stroke,
          carousel 3 items per view (timeline images)
         ════════════════════════════════════════════ */}
      <section ref={historyRef} className="py-16 md:py-24 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-[12vw] md:text-[100px] font-bold text-outline leading-[110px] tracking-tighter"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-2px' }}
            >
              OSIPL History
            </h2>
          </div>

          {/* Timeline grid - 3 columns matching original carousel items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { year: '2003', text: 'Foundation of Om Sai Intex with a vision to transform commercial spaces.' },
              { year: '2008', text: 'Established Sleekline Modular Solutions manufacturing facility at Hennur, Bangalore.' },
              { year: '2010', text: 'Expanded operations across Karnataka with a diverse portfolio of projects.' },
              { year: '2015', text: 'Crossed 500+ projects milestone with growing team of skilled professionals.' },
              { year: '2018', text: 'Expanded to pan-India operations with offices in multiple states.' },
              { year: '2020+', text: 'Completed 1400+ projects with 40M+ sq ft of built-up area delivered.' },
            ].map((item, idx) => (
              <div key={idx} className="border border-white/10 rounded-xl p-6 hover:border-[#0065AC]/30 transition-all duration-500 bg-white/[0.02]">
                <div className="text-4xl font-bold text-[#0065AC] mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  {item.year}
                </div>
                <p className="text-[#A7A7A7] leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA SECTION - #0065AC background
          Original: "Elevate your workspace today" montserrat 26px,
          "Contact us" button 178px, red hat display 20px
         ════════════════════════════════════════════ */}
      <section className="py-10 md:py-16" style={{ backgroundColor: '#0065AC' }}>
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-[26px] font-semibold text-white text-center md:text-left" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Elevate your workspace today
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

    </div>
  );
}
