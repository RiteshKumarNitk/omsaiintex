import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Om Sai Intex',
  description:
    "Join our team of ambitious and creative professionals. Explore career opportunities at OSIPL and be part of India's leading interior fit-out company.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
