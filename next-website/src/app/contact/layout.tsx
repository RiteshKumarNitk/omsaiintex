import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Om Sai Intex',
  description:
    'Get in touch with Om Sai Intex. Call us at 080-41154454 or email mail@omsaiintex.com. Located in Bangalore, Karnataka.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
