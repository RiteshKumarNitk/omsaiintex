import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | MDS Interior Pvt. Ltd. — Join Our Team',
  description:
    "Explore career opportunities at MDS Interior — India's leading office interior fit-out company. Join 3000+ skilled professionals shaping modern workspaces across the country.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
