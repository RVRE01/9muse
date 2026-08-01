export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type ServiceNavigationItem = NavigationItem & {
  icon: string;
};

export type ServiceChapter = {
  id: 'detailing' | 'wrap-tint' | 'bodywork-paint-restoration' | 'performance-dyno';
  index: string;
  shortLabel: string;
  eyebrow: string;
  headline: string;
  paragraphs: readonly string[];
  details: readonly string[];
  image: string;
  imageAlt: string;
  treatment: 'carbon' | 'studio' | 'leather';
  imagePosition?: string;
  qualification?: string;
};

export type GalleryStudy = {
  label: string;
  category: string;
  image: string;
  alt: string;
  family: string;
  layout: 'wide' | 'standard' | 'tall';
  imagePosition?: string;
};

export const primaryNavigation: readonly NavigationItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
];

export const serviceNavigation: readonly ServiceNavigationItem[] = [
  {
    label: 'Detailing',
    href: '#detailing',
    icon: '/Imgs/9muse-service-detailing-emblem.png',
  },
  {
    label: 'Wrap / Tint',
    href: '#wrap-tint',
    icon: '/Imgs/9muse-service-wrap-tint-emblem.png',
  },
  {
    label: 'Bodywork / Paint',
    href: '#bodywork-paint-restoration',
    icon: '/Imgs/9muse-service-bodywork-emblem.png',
  },
  {
    label: 'Performance / Dyno',
    href: '#performance-dyno',
    icon: '/Imgs/9muse-service-performance-emblem.png',
  },
];

export const capabilities = [
  'Detailing',
  'Wrap / Tint',
  'Bodywork / Paint / Restoration',
  'Performance / Dyno Packages',
] as const;

export const services: readonly ServiceChapter[] = [
  {
    id: 'detailing',
    index: '01',
    shortLabel: 'Detailing',
    eyebrow: 'Detailing / PPF / Interior / Exterior',
    headline: 'The finish is where the build becomes undeniable.',
    paragraphs: [
      '9 Muse detailing is the quiet discipline behind a vehicle that looks considered from every angle. Paint correction, surface refinement, interior care, and presentation prep are brought together around the condition and character of the car.',
      'Paint protection film can be scoped for the surfaces that take the most abuse. Subtle ceramic and maintenance treatments are considered when they support the finish rather than become another layer of noise.',
    ],
    details: [
      'Paint correction and finish refinement',
      'Paint protection film for high-impact surfaces',
      'Exterior detailing and presentation preparation',
      'Interior leather, trim, and surface restoration',
    ],
    image: '/Imgs/9muse-detailing-parallax-v2.png',
    imageAlt:
      'Graphite performance coupe being refined in a premium detailing studio with water beading across the corrected paint',
    treatment: 'leather',
    imagePosition: '58% center',
  },
  {
    id: 'wrap-tint',
    index: '02',
    shortLabel: 'Wrap / Tint',
    eyebrow: 'Wrap / Tint / Finish Direction',
    headline: 'Change the light. Keep the lines.',
    paragraphs: [
      'Wrap and tint work can change the entire read of a vehicle without asking the body to become something it is not. Color, sheen, contrast, and glass tone are selected to sharpen the original design language.',
      'Full or partial wraps, restrained accents, trim changes, and window tint are scoped as one finish system. The result should feel intentional at ten feet and resolved up close.',
    ],
    details: [
      'Full and partial color-change wraps',
      'Roof, mirror, trim, and accent treatments',
      'Window tint and glass-tone coordination',
      'Finish planning around existing paint and aero',
    ],
    image: '/Imgs/9muse-wrap-tint-parallax-v2.png',
    imageAlt:
      'Silver-grey widebody performance coupe with a satin finish, smoked glass, and black aero in a dark studio',
    treatment: 'studio',
    imagePosition: '54% center',
  },
  {
    id: 'bodywork-paint-restoration',
    index: '03',
    shortLabel: 'Bodywork / Paint',
    eyebrow: 'Bodywork / Paint / Restoration',
    headline: 'Restore the form before adding the finish.',
    paragraphs: [
      'Premium paint only matters when the shape beneath it is right. Bodywork and refinishing begin with alignment, proportion, and the honest condition of the vehicle before color or gloss enters the conversation.',
      'From a focused correction to a broader restoration direction, the work is paced around the platform, the materials, and the level of finish the commission deserves. Every transition should disappear into the whole car.',
    ],
    details: [
      'Panel correction, alignment, and fitment',
      'Paint preparation, refinishing, and blending',
      'Surface repair and restoration direction',
      'Finish coordination across the complete vehicle',
    ],
    image: '/Imgs/9muse-bodywork-paint-parallax-v2.png',
    imageAlt:
      'Deep copper-bronze performance SUV with corrected bodywork and refinished panels under controlled studio lighting',
    treatment: 'studio',
    imagePosition: '48% center',
  },
  {
    id: 'performance-dyno',
    index: '04',
    shortLabel: 'Performance / Dyno',
    eyebrow: 'Performance / Dyno Packages',
    headline: 'Make the number earned, then make it repeatable.',
    paragraphs: [
      'Performance begins with a baseline, a use case, and a clear understanding of the platform. Engine and transmission calibration, intake and exhaust flow, cooling, fueling, suspension, and braking are considered as supporting systems rather than isolated upgrades.',
      'Dyno packages create a measured conversation around the car. The target is usable, repeatable performance with the hardware and calibration required to make the change coherent on the road and at the driver’s command.',
    ],
    details: [
      'ECU and TCU calibration strategy',
      'Forced-induction, intake, exhaust, cooling, and fueling systems',
      'Suspension, brake, and chassis support packages',
      'Baseline, final, and diagnostic dyno sessions',
    ],
    image: '/Imgs/9muse-performance-parallax-v2.png',
    imageAlt:
      'Metallic ultraviolet performance coupe secured on a dyno with carbon aero and illuminated red tail lamps',
    treatment: 'carbon',
    imagePosition: '58% center',
    qualification:
      'Final output, road legality, emissions compliance, and available calibration depend on the platform, configuration, fuel, vehicle condition, and jurisdiction.',
  },
];

export const galleryStudies: readonly GalleryStudy[] = [
  {
    label: 'Detailing',
    category: '01 / Surface and cabin finish',
    image: '/Imgs/9muse-bespoke-oxblood-interior.png',
    alt: 'Bespoke oxblood leather and black Alcantara sports-car cabin with ivory piping, red stitching, and carbon-fiber trim',
    family: 'Finish refinement / PPF / interior / exterior',
    layout: 'wide',
    imagePosition: '58% center',
  },
  {
    label: 'Wrap / Tint',
    category: '02 / Color and glass direction',
    image: '/Imgs/magnific_create-a-premium-closeup-_5xhCjiLKxe.png',
    alt: 'Graphite widebody sports coupe with exposed carbon aero and black wheels',
    family: 'Wrap, tint, and restrained accent work',
    layout: 'standard',
    imagePosition: '48% center',
  },
  {
    label: 'Bodywork / Paint / Restoration',
    category: '03 / Form and refinishing',
    image: '/Imgs/9muse-specialized-copper-suv.png',
    alt: 'Copper-bronze luxury performance SUV with black carbon details in a dark studio',
    family: 'Panel correction, paint, and restoration',
    layout: 'standard',
    imagePosition: '48% center',
  },
  {
    label: 'Performance / Dyno Packages',
    category: '04 / Measured output and support systems',
    image: '/Imgs/magnific_create-a-premium-closeup-_Uy5rPHSwny.png',
    alt: 'Ultraviolet metallic sports coupe rear quarter with carbon trim and red tail lamp',
    family: 'Calibration, hardware, and dyno validation',
    layout: 'wide',
    imagePosition: '62% center',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'Private Brief',
    body: 'We define the vehicle, intended use, aesthetic direction, location, investment range, and desired completion window.',
  },
  {
    index: '02',
    title: 'Concept and Scope',
    body: 'The service package, material language, technical requirements, and preliminary build sequence are resolved.',
  },
  {
    index: '03',
    title: 'Engineering and Sourcing',
    body: 'Compatibility is confirmed, selected components are sourced, and supporting requirements are added to the build plan.',
  },
  {
    index: '04',
    title: 'Build and Refinement',
    body: 'Installation, fabrication, calibration, upholstery, fitment, finishing, and quality review follow the approved scope.',
  },
  {
    index: '05',
    title: 'Delivery or Transport',
    body: 'Handoff is coordinated locally or enclosed transportation is planned for qualifying out-of-region projects.',
  },
] as const;

export const faqItems = [
  {
    question: 'Which areas does 9 Muse Customs serve?',
    answer:
      '9 Muse Customs is focused on clients across New York, New Jersey, and Pennsylvania. Qualifying commissions are also available throughout the United States through coordinated enclosed vehicle transportation.',
  },
  {
    question:
      'Can I commission a build from outside New York, New Jersey, or Pennsylvania?',
    answer:
      'Yes. The brief and scope can begin remotely. Vehicle arrival and return may be planned through an approved or client-selected enclosed carrier, with timing, insurance, inspection, and delivery requirements confirmed before transport.',
  },
  {
    question: 'Which vehicles and platforms do you work with?',
    answer:
      'The atelier considers luxury, exotic, performance, SUV, grand-touring, and enthusiast platforms, along with selected motorcycle and specialty cabin projects. Compatibility and scope are reviewed for every request.',
  },
  {
    question: 'Can I request only one service, such as detailing or tint?',
    answer:
      'Yes. A commission may focus on one category or combine detailing, wrap and tint, bodywork and paint, and performance into a complete program.',
  },
  {
    question: 'How long does a custom build take?',
    answer:
      'Timing depends on the platform, component availability, fabrication, calibration, upholstery, finish requirements, and transport. A preliminary sequence is defined after the brief and compatibility review.',
  },
  {
    question: 'How are performance targets determined?',
    answer:
      'Targets are based on the platform, vehicle condition, intended use, fuel, supporting systems, legal requirements, and the client goal. No output figure is treated as guaranteed before inspection and final calibration.',
  },
  {
    question: 'Do you coordinate enclosed vehicle transport?',
    answer:
      'For qualifying projects, planning can include an approved or client-selected enclosed carrier. 9 Muse does not represent that it owns a transport fleet.',
  },
] as const;

export const siteDescription =
  '9 Muse Customs creates premium automotive finishes and performance programs across NY, NJ, and PA, with nationwide access for detailing, wraps, paint, restoration, and dyno packages.';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
