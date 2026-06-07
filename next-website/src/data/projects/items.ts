import { ProjectItem } from '@/types/projects';

export const projectItems: ProjectItem[] = [
  {
    name: "Intel",
    slug: "intel",
    image: "/assets/images/2018/08/IN504142.jpg",
    heroImage: "/assets/images/2018/08/IN504142.jpg",
    category: "Corporate Office",
    description: "Fully furnished 1,40,000 sq. ft. headquarters with modern workspace design.",
    area: "1,40,000 sq ft",
    year: "2018",
    client: "Intel Corporation",
    location: "Bangalore, India",
    services: ["Interior Design", "Fit-Out", "Furniture", "MEP"],
    challenge: "Creating a world-class headquarters that reflected Intel's innovative culture while accommodating 2000+ employees across multiple floors.",
    solution: "Designed open collaborative zones, private focus rooms, and activity-based workspaces with cutting-edge technology integration throughout.",
    result: "A flagship workspace that increased employee satisfaction by 40% and became a benchmark for tech office design in India.",
    gallery: [
      "/assets/images/2018/08/IN504142.jpg",
      "/assets/images/2023/06/intel-1.jpg",
    ],
  },
  {
    name: "City Marks",
    slug: "city-marks",
    image: "/assets/images/2023/05/project-banner-3.png",
    heroImage: "/assets/images/2023/05/project-banner-3.png",
    category: "Commercial Interior",
    description: "Premium commercial space with innovative design solutions.",
    area: "85,000 sq ft",
    year: "2023",
    client: "City Marks Group",
    location: "Mumbai, India",
    services: ["Design-Build", "Interior Design", "Project Management"],
    challenge: "Transforming a conventional commercial building into a modern, inspiring workspace that attracts top talent.",
    solution: "Implemented biophilic design elements, flexible work zones, and branded environments that tell the company's story.",
    result: "A stunning commercial space that won the Best Interior Design Award at the India Design Festival 2023.",
    gallery: [
      "/assets/images/2023/05/project-banner-3.png",
    ],
  },
  {
    name: "Servicenow",
    slug: "servicenow",
    image: "/assets/images/2023/04/service-now-1.jpg",
    heroImage: "/assets/images/2023/04/service-now-1.jpg",
    category: "Tech Workspace",
    description: "Cutting-edge workspace for a global tech leader.",
    area: "1,20,000 sq ft",
    year: "2023",
    client: "ServiceNow",
    location: "Bangalore, India",
    services: ["Design-Build", "Interior Design", "Technology Integration", "Furniture"],
    challenge: "Designing a future-ready campus that supports hybrid work models and fosters innovation.",
    solution: "Created smart floors with IoT-enabled room booking, acoustically optimized zones, and collaboration hubs.",
    result: "A tech-forward workspace that reduced real estate costs by 25% while improving employee productivity.",
    gallery: [
      "/assets/images/2023/04/service-now-1.jpg",
    ],
  },
  {
    name: "Visa",
    slug: "visa",
    image: "/assets/images/2023/04/visa2.jpg",
    heroImage: "/assets/images/2023/04/visa2.jpg",
    category: "Financial Interior",
    description: "High-end corporate interiors for a financial giant.",
    area: "95,000 sq ft",
    year: "2023",
    client: "Visa Inc.",
    location: "Bangalore, India",
    services: ["Interior Design", "Fit-Out", "Security Integration"],
    challenge: "Creating a secure yet welcoming environment that balances corporate prestige with employee comfort.",
    solution: "Designed themed floors representing different global markets, with premium finishes and integrated security systems.",
    result: "A prestigious headquarters that strengthened Visa's employer brand and attracted top financial talent.",
    gallery: [
      "/assets/images/2023/04/visa2.jpg",
    ],
  },
  {
    name: "Accenture",
    slug: "accenture",
    image: "/assets/images/2023/04/HM8A4437.jpg",
    heroImage: "/assets/images/2023/04/HM8A4437.jpg",
    category: "Design-Build",
    description: "Large-scale design-build project with sustainable solutions.",
    area: "2,00,000 sq ft",
    year: "2023",
    client: "Accenture",
    location: "Pune, India",
    services: ["Design-Build", "Sustainability", "Project Management", "MEP"],
    challenge: "Delivering a LEED Platinum certified workspace at scale while meeting aggressive timelines.",
    solution: "Implemented sustainable materials, energy-efficient systems, and biophilic design throughout the campus.",
    result: "India's largest LEED Platinum certified corporate campus, reducing carbon footprint by 60%.",
    gallery: [
      "/assets/images/2023/04/HM8A4437.jpg",
    ],
  },
  {
    name: "Keyloop",
    slug: "keyloop",
    image: "/assets/images/2023/04/DSC08099.jpg",
    heroImage: "/assets/images/2023/04/DSC08099.jpg",
    category: "Creative Hub",
    description: "Innovative workspace fostering creativity and collaboration.",
    area: "45,000 sq ft",
    year: "2023",
    client: "Keyloop",
    location: "Bangalore, India",
    services: ["Interior Design", "Creative Spaces", "Furniture"],
    challenge: "Designing a workspace that breaks traditional office norms and inspires creative thinking.",
    solution: "Created themed neighborhoods, maker spaces, and informal meeting zones with vibrant colors and textures.",
    result: "A creative hub that increased cross-team collaboration by 60% and became a model for innovation centers.",
    gallery: [
      "/assets/images/2023/04/DSC08099.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectItems.find(p => p.slug === slug);
}

export function getNextProject(currentSlug: string): ProjectItem | undefined {
  const currentIdx = projectItems.findIndex(p => p.slug === currentSlug);
  const nextIdx = (currentIdx + 1) % projectItems.length;
  return projectItems[nextIdx];
}
