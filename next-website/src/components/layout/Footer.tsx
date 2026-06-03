import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-16 mt-20">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tighter">OSIPL.</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover top notch office design building solution & general contracting services today.
          </p>
        </div>

        {/* Head Office */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Head Office</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            #9, 2nd floor, 10th main road, <br />
            Bangalore - 560075, Karnataka, India
          </p>
        </div>

        {/* Company Links */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Company</h3>
          <ul className="space-y-3">
            {['Home', 'About Us', 'Manufacturing Unit', 'Projects', 'Careers', 'Contact Us'].map((link) => (
              <li key={link}>
                <Link 
                  href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Send a Message</h3>
            <a href="mailto:mail@omsaiintex.com" className="text-gray-400 text-sm hover:text-white transition-colors">
              mail@omsaiintex.com
            </a>
          </div>
          
          <div className="pt-6 space-y-3">
            <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Follow Us</h3>
            <div className="flex flex-col space-y-2">
              {['Linkedin', 'Facebook', 'Youtube'].map((social) => (
                <a key={social} href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          Copyright &copy; {new Date().getFullYear()} Om Sai Intex Pvt. Ltd.
        </p>
      </div>
    </footer>
  );
}
