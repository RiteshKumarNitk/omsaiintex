import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manufacturing Unit | Om Sai Intex',
  description:
    "Om Sai Intex's 80,000 sq. ft. manufacturing unit — Sleekline Modular Solutions. CNC-enabled production facility for custom interior products.",
};

export default function ManufacturingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
