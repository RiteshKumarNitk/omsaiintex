import React from 'react';

interface QualityChipProps {
  label: string;
}

export default function QualityChip({ label }: QualityChipProps) {
  return (
    <div className="quality-chip border border-white/10 rounded-lg py-8 px-4 bg-white/[0.02] hover:border-[#0065AC]/40 hover:bg-[#0065AC]/5 transition-all duration-300">
      <span
        className="text-lg font-bold text-white tracking-wider"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        {label}
      </span>
    </div>
  );
}
