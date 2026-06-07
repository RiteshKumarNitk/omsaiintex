export interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface ClientLogo {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  desc: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
