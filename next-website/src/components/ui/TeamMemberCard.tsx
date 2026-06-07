import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types/home';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default React.memo(function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="vision-card group relative overflow-hidden rounded-lg">
      <div className="aspect-[3/4] relative">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, #000000CC 0%, #00000000 77%)',
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="text-lg font-bold text-white"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {member.name}
        </h3>
        <p
          className="text-sm text-white/60"
          style={{ fontFamily: 'var(--font-red-hat), sans-serif' }}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
});
