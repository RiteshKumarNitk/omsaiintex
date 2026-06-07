import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | MDS Interior Pvt. Ltd. — Bangalore Office',
  description:
    'Get in touch with MDS Interior for premium office interior design and turnkey solutions. Call 080-41154454 or email mail@mdsinterior.com. Located in Bangalore, Karnataka.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
