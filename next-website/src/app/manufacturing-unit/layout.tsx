import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manufacturing Unit | MDS Interior — Sleekline Modular Solutions',
  description:
    "MDS Interior's 80,000 sq. ft. CNC-enabled manufacturing facility — Sleekline Modular Solutions. State-of-the-art production for custom interior fit-out products in Bangalore.",
};

export default function ManufacturingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
