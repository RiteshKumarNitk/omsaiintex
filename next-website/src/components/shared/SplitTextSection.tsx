import React, { forwardRef } from 'react';

interface SplitTextSectionProps {
  /** The large heading on the left side */
  heading: React.ReactNode;
  /** The paragraph content on the right side */
  content: React.ReactNode;
  /** Additional classes for the section */
  className?: string;
}

/**
 * A reusable section component featuring a 2-column layout.
 * Left side: Large heading with a subtle left border.
 * Right side: Paragraph text.
 * Matches the original Elementor "Design & Build" / "General Contracting" pattern.
 */
const SplitTextSection = forwardRef<HTMLElement, SplitTextSectionProps>(
  ({ heading, content, className = '' }, ref) => {
    return (
      <section ref={ref} className={`py-12 md:py-20 bg-[#121B1D] w-full ${className}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 max-w-6xl mx-auto items-center">
            {/* ── Left Column: Heading ── */}
            <div className="w-full md:w-[40%] flex justify-center md:justify-start">
              <div className="border-l-1 border-white/10 pl-6 md:pl-10 py-2 transition-all duration-500 hover:border-white/40">
                <h2
                  className="text-4xl text-center md:text-left md:text-[60px] font-normal text-white leading-tight md:leading-[1.1] m-0"
                >
                  {heading}
                </h2>
              </div>
            </div>

            {/* ── Right Column: Content ── */}
            <div className="w-full md:w-[60%]">
              <div
                className="text-[#B0B0B0] text-base md:text-[20px] leading-[1.8] font-light space-y-6"
                style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
              >
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

SplitTextSection.displayName = 'SplitTextSection';
export default SplitTextSection;
