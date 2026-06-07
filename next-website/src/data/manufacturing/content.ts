export interface ManufacturingContent {
  image: string;
  imageAlt: string;
  imageHeight: string;
  title: string;
  paragraphs: string[];
  imageFirst: boolean;
}

export const manufacturingContent: ManufacturingContent[] = [
  {
    image: '/assets/images/2023/05/DJI_0047.jpg',
    imageAlt: 'Origins of Sleekline',
    imageHeight: '360px',
    title: 'Origins of\nSleekline Modular Solutions',
    paragraphs: [
      'The genesis of Sleekline Modular Solutions is the output of four civil engineers and visionaries. Set up in 2008, these four men brought 100+ man-hours of experience coupled with strengths like being actively involved in projects, in-depth technical knowledge, and a high degree of reliability & commitment.',
      'Their collective experience assisted in manufacturing interior products and setting up an expansive network of suppliers, helping MDS Interior become an enterprise synonymous with quality and excellence.',
    ],
    imageFirst: true,
  },
  {
    image: '/assets/images/2023/05/interiors-2.png',
    imageAlt: 'Why Sleekline was set up',
    imageHeight: '441px',
    title: 'Why Was Sleekline\nSet Up?',
    paragraphs: [
      'We understand why clients need customization — to enhance the appeal of a workspace and replicate a stunning finish in every corner. To fulfill custom requirements, we set up our first facility Sleekline Modular Solutions at Hennur, Bangalore.',
      'We brought the latest technology, machinery, and equipment to handle what our clients wanted. Our workforce comprises highly skilled technical supervisors and a design team, who collectively ensure a smooth and non-stop supply of products while maintaining quality standards.',
    ],
    imageFirst: false,
  },
  {
    image: '/assets/images/2023/05/manufacturing-block4.jpg',
    imageAlt: 'Manufacturing reliability',
    imageHeight: '451px',
    title: 'What Makes Us\nReliable?',
    paragraphs: [
      'The offsite procurement, cost estimation, and administration teams form our backbone.',
      'Unsurprisingly, all team members bring vast experience to MDS Interior.',
      'MDS Interior comprises highly experienced project team managers, among other onsite team members. All team members have experience in successfully dealing with dynamic work circumstances and clients.',
    ],
    imageFirst: true,
  },
];
