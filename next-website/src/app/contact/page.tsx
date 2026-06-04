"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function ContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
      }

      // Animate form
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Animate info section
      const infoChildren = infoRef.current?.children;
      if (infoChildren && infoChildren.length > 0) {
        gsap.fromTo(
          infoChildren,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            delay: 0.5,
          }
        );
      }
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const inputClass =
    'w-full bg-transparent border-0 border-b border-white/20 text-[#BAB6B6] text-lg py-3 px-0 focus:outline-none focus:text-white focus:border-white/40 transition-all duration-300 placeholder-[#BAB6B6]/60';

  const selectClass =
    'w-full bg-[#172427] border border-[#172427] text-[#FFFFFFA8] text-lg py-3 px-4 rounded focus:outline-none focus:text-white transition-all duration-300 appearance-none';

  return (
    <div ref={mainRef} className="flex flex-col w-full bg-[#121B1D]">
      {/* ════════════════════════════════════════════
          MAIN CONTENT - padding: 100px 0px, max-width: 970px
          Heading: "Nice to meet you" 72px Montserrat centered
          Contact form with inputs 18px #BAB6B6
          Submit button: #FFFFFF bg, #1D2023 text, 16px
         ════════════════════════════════════════════ */}
      <section
        className="w-full mx-auto px-6 md:px-10"
        style={{ padding: '100px 0px', maxWidth: '970px' }}
      >
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-[10vw] md:text-[72px] font-bold text-white text-center leading-[1.2em] mb-16"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Nice to meet you
        </h1>

        {/* Contact Form */}
        <div ref={formRef} className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="What&rsquo;s your name?"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your phone number"
              />
            </div>

            <div className="relative">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={selectClass}
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                <option value="" disabled>Select position</option>
                <option value="civil-interiors">Civil and Interiors</option>
                <option value="gc">GC (Turn key contracting)</option>
                <option value="design-build">Design and build</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFFFFFA8] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="would you like to say something about yourself"
              />
            </div>

            {/* File upload field — from original CF7 file-347 */}
            <div>
              <label className="block text-[#BAB6B6] text-base mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Upload your Resume / CV
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full text-[#BAB6B6] text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all duration-300"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full text-base font-normal py-4 px-6 transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1D2023',
                  fontFamily: 'var(--font-red-hat), sans-serif',
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT INFO SECTION
          "Have a project in mind?", "Call our office", "Send a message"
         ════════════════════════════════════════════ */}
      <section
        ref={infoRef}
        className="w-full mx-auto px-6 md:px-10 pb-24"
        style={{ maxWidth: '970px' }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2
              className="text-lg font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Have a project in mind?
            </h2>
          </div>
          <div>
            <h3
              className="text-base font-bold text-white mb-1"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Call our office
            </h3>
            <p className="text-[#A7A7A7] text-base">
              080 - 41154454, 41256666, 25272579.
            </p>
          </div>
          <div>
            <h3
              className="text-base font-bold text-white mb-1"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Send a message
            </h3>
            <p className="text-[#A7A7A7] text-base">
              mail@omsaiintex.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
