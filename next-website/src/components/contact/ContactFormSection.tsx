'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactFormData } from '@/types/contact';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function ContactFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', phone: '', subject: '', message: '',
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
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      }
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputClass = 'w-full bg-transparent border-0 border-b border-white/20 text-[#BAB6B6] text-lg py-3 px-0 focus:outline-none focus:text-white focus:border-white/40 transition-all duration-300 placeholder-[#BAB6B6]/60';
  const selectClass = 'w-full bg-[#172427] border border-[#172427] text-[#FFFFFFA8] text-lg py-3 px-4 rounded focus:outline-none focus:text-white transition-all duration-300 appearance-none';

  return (
    <section ref={sectionRef} className="w-full mx-auto px-6 md:px-10" style={{ padding: '100px 0px', maxWidth: '970px' }}>
      <h1 ref={headingRef} className="text-[10vw] md:text-[72px] font-bold text-white text-center leading-[1.2em] mb-16" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        Nice to meet you
      </h1>
      <div ref={formRef} className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div><input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="What&rsquo;s your name?" /></div>
          <div><input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Enter your email address" /></div>
          <div><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Your phone number" /></div>
          <div className="relative">
            <select name="subject" value={formData.subject} onChange={handleChange} required className={selectClass} style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>
              <option value="" disabled>Select position</option>
              <option value="civil-interiors">Civil and Interiors</option>
              <option value="gc">GC (Turn key contracting)</option>
              <option value="design-build">Design and build</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFFFFFA8] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} placeholder="would you like to say something about yourself" /></div>
          <div>
            <label className="block text-[#BAB6B6] text-base mb-2" style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}>Upload your Resume / CV</label>
            <input type="file" accept=".pdf,.doc,.docx" className="w-full text-[#BAB6B6] text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all duration-300" />
          </div>
          <div>
            <button type="submit" className="w-full text-base font-normal py-4 px-6 transition-all duration-300 hover:opacity-90" style={{ backgroundColor: '#FFFFFF', color: '#1D2023', fontFamily: 'var(--font-red-hat), sans-serif' }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});
