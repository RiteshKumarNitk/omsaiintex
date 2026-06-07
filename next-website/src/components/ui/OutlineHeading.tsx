import React from 'react';

interface OutlineHeadingProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'alt';
}

export default function OutlineHeading({
  children,
  className = '',
  variant = 'default',
}: OutlineHeadingProps) {
  const baseClass = variant === 'default'
    ? 'text-[3rem] md:text-[6.25rem] font-bold leading-[1.1] text-outline select-none'
    : 'text-[3rem] md:text-[6rem] lg:text-[8rem] font-bold leading-[1] text-outline-2 mb-6 select-none';

  return (
    <h2
      className={`${baseClass} ${className}`}
      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
    >
      {children}
    </h2>
  );
}
