'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function CareersFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: '', resume: null as File | null,
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
      gsap.fromTo(sectionRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">
        <div className="border border-white/10 rounded-xl p-8 md:p-10 bg-white/[0.02]">
          <h2
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            How can we <span className="text-[#0065AC]">reach you</span>
          </h2>
          <p
            className="text-[#A7A7A7] mb-8"
            style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
          >
            Which post would you like to apply for
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>Nice to meet you</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0065AC] transition-colors"
                placeholder="Your name" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }} />
            </div>
            <div>
              <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>Email address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0065AC] transition-colors"
                placeholder="Your email" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }} />
            </div>
            <div>
              <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>How can we reach you</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0065AC] transition-colors"
                placeholder="Your phone number" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }} />
            </div>
            <div>
              <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>Select position</label>
              <select name="position" value={formData.position} onChange={handleChange} required
                className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#0065AC] transition-colors"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                <option value="" className="bg-[#121B1D]">Select position</option>
                <option value="manager-drafting" className="bg-[#121B1D]">Manager - Drafting and Costing</option>
                <option value="project-manager" className="bg-[#121B1D]">Project Manager</option>
                <option value="sr-engineer" className="bg-[#121B1D]">Sr. Engineers</option>
                <option value="engineer-costing" className="bg-[#121B1D]">Engineer / Sr. Engineer Costing - Products</option>
              </select>
            </div>
            <div>
              <label className="block text-[#A7A7A7] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                Upload your Resume/ CV/ Portfolio <span className="text-[#A7A7A7]/50">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-[#0065AC]/50 transition-colors cursor-pointer">
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" id="resume-upload-careers" />
                <label htmlFor="resume-upload-careers" className="cursor-pointer">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#A7A7A7]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-[#A7A7A7]/50 text-sm" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
                    Click to upload or drag and drop
                  </p>
                </label>
              </div>
            </div>
            <button type="submit"
              className="w-full text-white font-normal py-3 px-6 rounded transition-all duration-300 text-lg border border-white hover:bg-white hover:text-[#0065AC]"
              style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});
