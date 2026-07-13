export interface Link {
  label: string;
  href: string;
}

export interface Entry {
  org: string;
  role: string;
  dates: string;
  detail?: string;
}

export const identity = {
  name: 'Jarrod Perez',
  tagline: 'Full Stack Product Engineer',
};

export const meta = {
  title: 'Jarrod Perez — Full Stack Product Engineer',
  description:
    'Founding engineer at Summer. Product engineer with design roots who leads front-end teams and ships AI-native software end to end.',
};

export const intro: string[] = [
  "I'm a founding engineer at Summer, where I build and lead the front end. That covers our web apps, our public APIs, and the MCP apps that let AI agents use our products. Making software that works for people and AI agents alike is the most interesting problem I've found in nearly twenty years of building for the web.",
  'I started in design, spent years as a UX engineer at PlayStation, and moved deeper into engineering leading front-end teams at Infura and now Summer. I still work across both, from prototyping to production.',
];

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/jarrodjperez' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jarrodperez' },
  { label: 'Email', href: 'mailto:perez.jarrod@gmail.com' },
];

export const experience: Entry[] = [
  {
    org: 'Summer',
    role: 'Founding Engineer',
    dates: '2022–present',
    detail: 'Leads front end across web apps, public APIs, and MCP apps.',
  },
  { org: 'Infura', role: 'Front End Lead', dates: '2019–2022' },
  { org: 'Sony PlayStation', role: 'Senior UX Engineer', dates: '2012–2019' },
  { org: 'Markit on Demand', role: 'Senior Software Engineer', dates: '2008–2012' },
  {
    org: 'Full Sail University',
    role: 'B.S. Digital Arts & Design',
    dates: '2006',
  },
];
