"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { splitTextToWords, animateWordsIn } from '@/lib/gsap-utils';

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your application! We will review it and get back to you.');
    setFormData({ name: '', email: '', phone: '', position: '', resume: null });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        height: '0%', duration: 1.5, ease: 'power4.inOut',
      });

      if (headingRef.current) {
        const [words] = splitTextToWords(headingRef.current);
        animateWordsIn(words, {
          from: { y: 60, opacity: 0, rotateX: -30 },
          to: { duration: 1.2, stagger: 0.03, ease: 'power4.out', delay: 0.6 },
        });
      }

      const introChildren = introRef.current?.children;
      if (introChildren && introChildren.length > 0) {
        gsap.fromTo(introChildren,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: introRef.current, start: 'top 85%' } }
        );
      }

      const jobsChildren = jobsRef.current?.children;
      if (jobsChildren && jobsChildren.length > 0) {
        gsap.fromTo(jobsChildren,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: jobsRef.current, start: 'top 80%' } }
        );
      }

      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col w-full bg-[#121B1D]">

      {/* ════════════════════════════════════════════
          HERO - Image with overlay text "Career with us"
          Original: lqd-iot image text overlay, career-banner.png
         ════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/2023/04/career-banner.png"
            alt="Career with us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div ref={overlayRef} className="absolute inset-0 bg-black z-20 origin-top" />
        <div className="relative z-30 text-center px-6">
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{ perspective: '1200px', fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Career with us
          </h1>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INTRO SECTION - Two columns
          Original: Left "Reinventing Offices since 2003." + desc,
          Right: "OSIPL is ready to scale faster... Are you a professional..."
         ════════════════════════════════════════════ */}
      <section ref={introRef} className="py-16 md:py-24 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Reinventing Offices <br />since 2003.
              </h2>
              <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Through a unique combination of engineering, construction and design disciplines and expertise
              </p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-[#FFFFFF33] pl-0 md:pl-8 pt-6 md:pt-0">
              <p className="text-[#A7A7A7] text-lg leading-relaxed" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                OSIPL is ready to scale faster and extend its reach across other parts of the country. To reach our goal,
                we are actively looking for ambitious and creative professionals to fulfill our purpose.
              </p>
              <p className="text-[#A7A7A7] text-lg leading-relaxed mt-6" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Are you a professional in our field and looking for employment opportunities? Reach out with a message here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CURRENT OPENINGS SECTION
          Original: "Would you like to work with us?"
          "Current Openings" -> "COSTING - Products"
         ════════════════════════════════════════════ */}
      <section ref={jobsRef} className="py-16 md:py-24 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Would you like to<br />
            <span className="text-[#0065AC]">work with us?</span>
          </h2>

          <h3 className="text-2xl font-bold text-white mt-12 mb-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Current Openings
          </h3>

          <div className="border border-white/10 rounded-xl p-8 bg-white/[0.02]">
            <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              COSTING - Products
            </h4>
            <p className="text-[#A7A7A7]/60 text-sm mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              (Upto 3 years relevant exp) | Engineers / Sr. Engineers
            </p>
            <p className="text-[#A7A7A7] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              The role involves day-to-day tasks related to product costing, analysis, and pricing strategies to
              optimize cost efficiency and profitability. The candidate will collaborate with internal teams &amp;
              develop cost estimates, identify cost-saving opportunities, and ensure accurate product pricing.
            </p>
            <p className="text-[#A7A7A7] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Candidates must be proficient in AutoCAD 2D with good communication skills both verbal and written.
              &amp; Diploma / BE Civil Engineers preferred. MS Office proficiency.
            </p>
            <p className="text-[#A7A7A7] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Work Location: Bangalore HO.
            </p>
            <p className="text-[#A7A7A7] leading-relaxed mb-6" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Interested candidates may mail their cv&apos;s to{' '}
              <a href="mailto:hr@omsaiintex.com" className="text-[#0065AC] hover:underline">hr@omsaiintex.com</a>.
            </p>
            <span className="inline-block px-4 py-2 bg-[#0065AC]/20 text-[#0065AC] text-sm font-medium rounded">
              Apply for Job Here
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          APPLICATION FORM SECTION
          Original: "How can we reach you", "Which post would you like to apply for"
          Fields: name, email, phone, position, resume upload
         ════════════════════════════════════════════ */}
      <section ref={formRef} className="py-16 md:py-24 bg-[#121B1D]">
        <div className="container mx-auto px-6 md:px-12 max-w-2xl">
          <div className="border border-white/10 rounded-xl p-8 md:p-10 bg-white/[0.02]">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              How can we <span className="text-[#0065AC]">reach you</span>
            </h2>
            <p className="text-[#A7A7A7] mb-8" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Which post would you like to apply for
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  Nice to meet you
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0065AC] transition-colors"
                  placeholder="Your name"
                  style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0065AC] transition-colors"
                  placeholder="Your email"
                  style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  How can we reach you
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0065AC] transition-colors"
                  placeholder="Your phone number"
                  style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  Select position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#0065AC] transition-colors"
                  style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
                >
                  <option value="" className="bg-[#121B1D]">Select position</option>
                  <option value="manager-drafting" className="bg-[#121B1D]">Manager - Drafting and Costing</option>
                  <option value="project-manager" className="bg-[#121B1D]">Project Manager</option>
                  <option value="sr-engineer" className="bg-[#121B1D]">Sr. Engineers</option>
                  <option value="engineer-costing" className="bg-[#121B1D]">Engineer / Sr. Engineer Costing - Products</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                  Upload your Resume/ CV/ Portfolio{' '}
                  <span className="text-[#A7A7A7]/50">(Optional)</span>
                </label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-[#0065AC]/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <svg className="w-8 h-8 mx-auto mb-2 text-[#A7A7A7]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-[#A7A7A7]/50 text-sm" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                      Click to upload or drag and drop
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white font-normal py-3 px-6 rounded transition-all duration-300 text-lg border border-white hover:bg-white hover:text-[#0065AC]"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA SECTION - #0065AC
          Original: "Elevate your workspace today" + "Contact us"
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
          </Link>
        </div>
      </section>
    </div>
  );
}
