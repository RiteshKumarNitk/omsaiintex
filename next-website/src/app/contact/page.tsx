"use client";

import React from 'react';
import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactInfoSection from '@/components/contact/ContactInfoSection';

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-[#121B1D]">
      <ContactFormSection />
      <ContactInfoSection />
    </div>
  );
}
