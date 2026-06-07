import React from 'react';
import Image from 'next/image';
import { ClientLogo } from '@/types/home';

interface ClientLogoCardProps {
  logo: ClientLogo;
}

export default React.memo(function ClientLogoCard({ logo }: ClientLogoCardProps) {
  return (
    <div className="flex-shrink-0 w-[150px] md:w-[200px] flex items-center justify-center p-4 aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-500">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={200}
        height={150}
        className="max-w-full max-h-full object-contain"
        unoptimized
      />
    </div>
  );
});
