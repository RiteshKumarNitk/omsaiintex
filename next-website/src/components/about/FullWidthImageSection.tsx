import React from 'react';
import Image from 'next/image';

export default React.memo(function FullWidthImageSection() {
  return (
    <section className="w-full bg-[#121B1D]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="w-full overflow-hidden rounded-lg group">
          <Image
            src="/assets/images/2023/06/who-we-are-image.jpg"
            alt="About Om Sai Intex"
            width={1200}
            height={354}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ height: '354px' }}
          />
        </div>
      </div>
    </section>
  );
});
