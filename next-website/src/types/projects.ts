export interface ProjectItem {
  name: string;
  image: string;
  category: string;
  description: string;
  area?: string;
  year?: string;
  slug: string;
  client?: string;
  location?: string;
  services?: string[];
  gallery?: string[];
  heroImage?: string;
  challenge?: string;
  solution?: string;
  result?: string;
}

export interface ProjectDetailProps {
  params: { slug: string };
}
