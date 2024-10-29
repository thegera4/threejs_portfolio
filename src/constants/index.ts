
import {NavLinks, CalculateSizesReturnType, CalculateSizesArgsType, Project, CalculateSizesType, WorkExperiencesType
  /*ClientReviewsType,*/} from '../types'

export const navLinks: NavLinks = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'About', href: '#about' },
  { id: 3, name: 'Projects', href: '#projects' },
  { id: 4, name: 'Work', href: '#work' },
  { id: 5, name: 'Contact', href: '#contact' },
]

/*export const clientReviews: ClientReviewsType = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Gerardo was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      'Gerardo’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      'I can’t say enough good things about Gerardo. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Gerardo was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
  },
]*/

export const myProjects: Project[] = [
  {
    title: 'SQLite Viewer-Browser',
    desc: 'This extension allows you to view (browse) SQLite databases and perform basic operations like update, delete and insert data. ' +
      'You can install the extension from the Visual Studio Code marketplace by clicking the "Check Demo" button or from the "Extensions" option in the side menu in your VSCode editor.',
    subdesc:
      ' I made this application as a personal tool to work with SQLite databases. It was made with HTML, CSS and Javascript.',
    href: 'https://marketplace.visualstudio.com/items?itemName=JuanGerardoMedellinIbarra.sqlite-viewer-browser',
    texture: '/textures/project/sqlite-browser.mp4',
    logo: '/assets/sqlite_viewer_logo.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'Javascript',
        path: '/assets/javascript-logo.png',
      },
      {
        id: 2,
        name: 'HTML',
        path: 'assets/html-logo.png',
      },
      {
        id: 3,
        name: 'CSS',
        path: '/assets/css.png',
      },
    ],
  },
  {
    title: 'Admin Dashboard',
    desc: 'This Full Stack web application is an Admin Dashboard template that includes a custom Auth API as well as Google Authentication. It uses the GetX library for a complete solution in navigation, http requests and state management and MongoDB for database.',
    subdesc:
      'The demo data comes from different dummy APIs. The Front End was made with Dart and Flutter. The Back End was made with Typescript, NodeJS and Express.',
    href: 'https://web-admin-dashboard-flutter.vercel.app/#/auth',
    texture: '/textures/project/admin-dashboard.mp4',
    logo: '/assets/dashboard-logo.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      {
        id: 1,
        name: 'Dart',
        path: '/assets/dart-logo.png',
      },
      {
        id: 2,
        name: 'Flutter',
        path: 'assets/flutter-logo.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'NodeJS',
        path: '/assets/node-logo.png',
      },
      {
        id: 5,
        name: 'Express',
        path: '/assets/ex-logo.png',
      },
      {
        id: 6,
        name: 'Mongo',
        path: '/assets/mongo-logo.png',
      },
    ],
  },
  {
    title: 'CarePulse - Health Management System',
    desc: 'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
    subdesc:
      'With a focus on efficiency, CarePulse integrantes complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.',
    href: 'https://www.youtube.com/watch?v=lEflo_sc82g',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
  {
    title: 'Horizon - Online Banking Platform',
    desc: 'Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.',
    subdesc:
      'Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.',
    href: 'https://www.youtube.com/watch?v=PuOVqP_cjkE',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
  {
    title: 'Imaginify - AI Photo Manipulation App',
    desc: 'Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.',
    subdesc:
      'Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.',
    href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
]

export const calculateSizes: CalculateSizesType = (args: CalculateSizesArgsType): CalculateSizesReturnType => {
  return {
    deskScale: args.isSmall ? 0.05 : args.isMobile ? 0.06 : 0.065,
    deskPosition: args.isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    pythonLogoPosition: args.isSmall ? [4, -5, 0] : args.isMobile ? [5, -5, 0] : args.isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: args.isSmall ? [3, 4, 0] : args.isMobile ? [5, 4, 0] : args.isTablet ? [5, 4, 0] : [10, 3, 0],
    javaLogoPosition: args.isSmall ? [-5, 7, 0] : args.isMobile ? [-10, 10, 0] : args.isTablet ? [-12, 10, 0] : [-10, 3, 0],
    jsLogoPosition: args.isSmall ? [-5, -10, -10] : args.isMobile ? [-9, -10, -10] : args.isTablet ? [-11, -7, -10] : [-13, -11, -10]
  }
}

export const workExperiences: WorkExperiencesType = [
  {
    id: 1,
    name: 'Financiera Independencia',
    pos: 'Front End Developer',
    duration: '2022 - Current',
    title: "I'm responsible for developing and maintaining several web apps. I work closely with the product team to create engaging user experiences and ensure the technical feasibility of UI/UX designs. I also collaborate with backend developers to integrate APIs and improve app performance.",
    icon: '/assets/findep.webp',
    animation: 'clapping',
  },
  {
    id: 2,
    name: 'Manufacturing',
    pos: 'Different Engineering Positions',
    duration: '2011 - 2022',
    title: "I worked in various engineering roles in several manufacturing industries, where I gained valuable experience in process optimization, quality control, and project management. I developed a strong foundation in engineering principles.",
    icon: '/assets/manufacture.svg',
    animation: 'salute',
  },
]