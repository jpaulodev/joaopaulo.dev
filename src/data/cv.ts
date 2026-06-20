// Single source of truth for the CV content.
// Mirrors the printed résumé so the site and the PDF never drift apart.

export const profile = {
  name: 'João Paulo da Silva',
  role: 'Senior Full-Stack Engineer',
  tagline:
    'I build scalable web apps, APIs and distributed systems. TypeScript on the backend, Vue.js on the frontend, with a focus on clean, reliable, maintainable architecture.',
  summary:
    'Software engineer with 15+ years building scalable web applications, APIs and distributed systems. Working 100% remotely with international teams since 2017, shipping production systems used at scale. Today my focus is TypeScript on the backend and Vue.js on the frontend, designing clean and maintainable architectures with solid experience in API development, system integrations and microservices, always optimizing for reliability, performance and long-term maintainability.',
  email: 'hi@joaopaulo.dev',
  location: 'São José do Rio Preto, BR',
  timezone: 'UTC-3',
  links: {
    linkedin: 'https://www.linkedin.com/in/jpaulodev',
    github: 'https://github.com/jpaulodev',
  },
} as const

export interface QuickFact {
  value: string
  label: string
  suffix?: string
}

// Hero stat band. `countTo` drives the count-up animation when numeric.
export const quickFacts: QuickFact[] = [
  { value: '15', suffix: '+', label: 'Years building software' },
  { value: '2017', label: 'Working fully remote since' },
  { value: '100', suffix: '%', label: 'Unit-test coverage shipped' },
  { value: '4', suffix: 'M+', label: 'App downloads led' },
]

export interface StackGroup {
  label: string
  items: string[]
}

export const stackGroups: StackGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'Go', 'Python'] },
  { label: 'Frontend', items: ['Vue.js', 'React', 'AngularJS', 'jQuery', 'CSS', 'Sass'] },
  {
    label: 'Backend & Architecture',
    items: [
      'Node.js',
      'NestJS',
      'Koa',
      'Express',
      'Restify',
      'Microservices',
      'Clean Architecture',
      'Inversify / DI',
      'Serverless',
    ],
  },
  { label: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Elasticsearch', 'Redis'] },
  {
    label: 'Cloud & DevOps',
    items: [
      'AWS',
      'EC2',
      'S3',
      'Lambda',
      'Docker',
      'GitHub Actions',
      'Nginx',
      'CI/CD',
    ],
  },
  {
    label: 'Testing',
    items: ['Jest', 'Mocha', 'Chai', 'Sinon', 'Jasmine', 'Karma', '100% coverage'],
  },
  {
    label: 'Integrations',
    items: ['Stripe', 'Braintree', 'Swagger / OpenAPI'],
  },
]

// Mapping to Simple Icons slugs for the logo marquee. Only brands with a clean,
// recognizable mark are included - the rest live as text chips in the grid above.
export interface TechLogo {
  name: string
  slug: string
}

export const techLogos: TechLogo[] = [
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Vue.js', slug: 'vuedotjs' },
  { name: 'NestJS', slug: 'nestjs' },
  { name: 'React', slug: 'react' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Elasticsearch', slug: 'elasticsearch' },
  { name: 'Docker', slug: 'docker' },
  { name: 'AWS', slug: 'amazonwebservices' },
  { name: 'GitHub Actions', slug: 'githubactions' },
  { name: 'Nginx', slug: 'nginx' },
  { name: 'Jest', slug: 'jest' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Go', slug: 'go' },
  { name: 'Python', slug: 'python' },
  { name: 'PHP', slug: 'php' },
  { name: 'Sass', slug: 'sass' },
]

export interface Role {
  company: string
  title: string
  period: string
  start: string
  context: string
  bullets: string[]
  stack: string[]
}

export const experience: Role[] = [
  {
    company: 'BairesDev',
    title: 'Software Engineer',
    period: 'Apr 2021 - Present',
    start: '2021',
    context: 'Remote',
    bullets: [
      'Maintain and evolve a high-traffic e-commerce platform, ensuring stability, performance and SEO health across desktop and mobile.',
      'Build and maintain NestJS / TypeScript microservices following clean architecture; apply dependency inversion with Inversify for modular, testable code.',
      'Achieve and maintain 100% unit-test coverage with Jest, raising reliability and deployment confidence.',
      'Integrate critical third-party services including Stripe and Braintree payment gateways.',
      'Lead frontend improvements in Vue.js + TypeScript with a strong focus on CSS quality.',
    ],
    stack: ['TypeScript', 'Vue.js', 'NestJS', 'Inversify', 'Jest', 'Stripe', 'Braintree'],
  },
  {
    company: 'Planhat',
    title: 'Software Engineer',
    period: 'Aug 2020 - Apr 2021',
    start: '2020',
    context: 'Remote',
    bullets: [
      'Built a Google Slides-like application letting users create presentations and reports from customizable widgets, with real-time data visualization and sharing.',
      'Developed features across the core product (Node.js; AngularJS 1.5, Vue.js, jQuery) backed by MongoDB for dynamic, real-time data.',
      'Collaborated asynchronously with a fully remote, globally distributed team across time zones.',
    ],
    stack: ['Node.js', 'Vue.js', 'AngularJS', 'jQuery', 'MongoDB'],
  },
  {
    company: 'Hoss',
    title: 'Software Engineer',
    period: 'May 2020 - Aug 2020',
    start: '2020',
    context: 'Remote',
    bullets: [
      'Built a Node.js SDK to capture outbound HTTP requests from customer apps and feed dashboards with third-party API latency and reliability metrics, with 100% test coverage.',
      'Built a Docker-based test-driver framework running suites across Node.js, Python and C# SDKs.',
      'Developed backend on the Serverless Framework with PostgreSQL; automated build/deploy pipelines with GitHub Actions.',
    ],
    stack: ['Node.js', 'Serverless', 'Docker', 'PostgreSQL', 'GitHub Actions'],
  },
  {
    company: 'Kenoby',
    title: 'Senior Software Engineer',
    period: 'Dec 2017 - Apr 2020',
    start: '2017',
    context: 'Remote',
    bullets: [
      'Built and scaled Node.js backend services for a high-traffic SaaS (ATS) platform, working across PostgreSQL, MongoDB, Elasticsearch and Redis for varied workloads.',
      'Built frontends in React and AngularJS (Sass, Bootstrap); designed APIs in Koa documented with Swagger.',
      'Designed and maintained AWS infrastructure (EC2, S3, Nginx); built CI/CD with Codeship and added APM for backend performance.',
      'Raised engineering standards through code reviews and testing with Jest, Mocha, Chai and Sinon.',
    ],
    stack: ['Node.js', 'React', 'Koa', 'PostgreSQL', 'Elasticsearch', 'Redis', 'AWS'],
  },
  {
    company: 'Command Alkon Brasil',
    title: 'Full-Stack Developer',
    period: 'Apr 2016 - Dec 2017',
    start: '2016',
    context: 'US team · Remote',
    bullets: [
      'Built backend services in Node.js and Go for business-critical systems; REST APIs with Express and Restify, documented via Swagger.',
      'Developed web and mobile interfaces with AngularJS and Ionic; built AWS Lambda functions for event-driven workloads.',
      'Wrote unit and integration tests (Mocha, Jasmine, Karma, Protractor); supported CI/CD with Jenkins.',
    ],
    stack: ['Node.js', 'Go', 'Express', 'AngularJS', 'Ionic', 'AWS Lambda'],
  },
  {
    company: 'Kboing Networks do Brasil',
    title: 'Full-Stack Developer',
    period: 'Jul 2011 - Mar 2016',
    start: '2011',
    context: 'On-site · Brazil',
    bullets: [
      'Built and maintained large-scale web platforms (internet and intranet) for high traffic; backend in PHP and Python integrating internal and third-party systems.',
      'Led development of an Android app with 4M+ downloads (Cordova), supporting large-scale usage and long-term maintenance.',
      'Worked with MySQL and MongoDB; built service integrations using Node.js.',
    ],
    stack: ['PHP', 'Python', 'JavaScript', 'Cordova', 'MySQL', 'MongoDB'],
  },
]

export interface Language {
  name: string
  level: string
  proficiency: number
}

export const languages: Language[] = [
  { name: 'Portuguese', level: 'Native / Bilingual', proficiency: 100 },
  { name: 'English', level: 'Full Professional', proficiency: 90 },
]

export const education = {
  degree: 'Technologist in Information Technology',
  school: 'FATEC, Faculdade de Tecnologia do Estado de São Paulo',
  period: '2009 - 2011',
} as const
