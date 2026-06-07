import React from 'react';
import { StatItem } from '@/types/home';

interface StatCardProps {
  stat: StatItem;
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        {stat.value}
      </span>
      <span
        className="text-white/60 text-sm md:text-base uppercase tracking-[0.05em] max-w-[180px]"
        style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
      >
        {stat.label}
      </span>
    </div>
  );
}
