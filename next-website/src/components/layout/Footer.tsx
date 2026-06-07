'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[420px] z-0 pointer-events-none">
      {/* Grid background — visible behind and through the footer */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Footer content — semi-transparent so grid shows through */}
      <div className="relative pointer-events-auto bg-[#0a0a0a]/75 backdrop-blur-sm border-t border-gray-800 py-14 h-full overflow-y-auto">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-white tracking-tighter">MDS.</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium office interior design, turnkey solutions, and commercial fit-out services in Bangalore and across India.
            </p>
          </div>

          {/* Head Office */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Head Office</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              #9, 2nd floor, 10th main road, <br />
              Bangalore - 560075, Karnataka, India
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Manufacturing Unit', href: '/manufacturing-unit' },
                { label: 'Projects', href: '/projects' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Send a Message</h3>
              <a href="mailto:mail@mdsinterior.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                mail@mdsinterior.com
              </a>
            </div>

            <div className="pt-4 space-y-2">
              <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Follow Us</h3>
              <div className="flex flex-col space-y-1.5">
                {['Linkedin', 'Facebook', 'Youtube'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="container mx-auto px-6 md:px-12 mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            Copyright &copy; {new Date().getFullYear()} MDS Interior Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
