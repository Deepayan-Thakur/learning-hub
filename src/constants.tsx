import { Code2, Palette, FlaskConical, Languages, GraduationCap, Briefcase, Zap, Keyboard, Globe, BookOpen } from 'lucide-react';
import React from 'react';

export interface Resource {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  resources: Resource[];
  accentColor: string; // Tailwind color class or hex
}

export const CATEGORIES: Category[] = [
  {
    id: 'programming',
    name: 'Programming & Tech',
    icon: <Code2 className="w-5 h-5" />,
    accentColor: 'indigo',
    resources: [
      {
        title: 'CS50 - Harvard',
        url: 'https://www.edx.org/cs50',
        description: 'The legendary introduction to computer science and the art of programming.',
        icon: <Code2 />,
        tags: ['Computer Science', 'Beginner', 'Harvard']
      },
      {
        title: 'Learn Git Branching',
        url: 'https://learngitbranching.js.org/',
        description: 'The most visual and interactive way to learn Git on the web.',
        icon: <Zap />,
        tags: ['Git', 'Interactive', 'CLI']
      },
      {
        title: 'CSSBattle',
        url: 'https://cssbattle.dev/',
        description: 'Gamify your CSS skills by styling targets with the least amount of code.',
        icon: <Palette />,
        tags: ['CSS', 'Game', 'Frontend']
      },
      {
        title: 'Making Software',
        url: 'https://www.makingsoftware.com/',
        description: 'Deep dives into software engineering practices and patterns.',
        icon: <BookOpen />,
        tags: ['Engineering', 'Design Patterns']
      }
    ]
  },
  {
    id: 'science',
    name: 'Science & Interactive',
    icon: <FlaskConical className="w-5 h-5" />,
    accentColor: 'rose',
    resources: [
      {
        title: 'Human BioDigital',
        url: 'https://human.biodigital.com/',
        description: 'The most comprehensive 3D virtual body platform for health and medicine.',
        icon: <FlaskConical />,
        tags: ['Biology', '3D', 'Medical']
      },
      {
        title: 'PhET Simulations',
        url: 'https://phet.colorado.edu/',
        description: 'Interactive simulations for science and math from University of Colorado.',
        icon: <Zap />,
        tags: ['Science', 'Simulations', 'Physics']
      },
      {
        title: 'Periodic Table',
        url: 'https://ptable.com/#',
        description: 'Interactive periodic table with properties, isotopes, and orbitals.',
        icon: <BookOpen />,
        tags: ['Chemistry', 'Reference']
      },
      {
        title: 'Photoskop',
        url: 'https://photoskop.com/',
        description: 'Interactive photography primer to learn lens, shutter, and light.',
        icon: <Palette />,
        tags: ['Photography', 'Light', 'Optics']
      },
      {
        title: 'Seeing Theory',
        url: 'https://seeing-theory.brown.edu/index.html',
        description: 'A visual introduction to probability and statistics.',
        icon: <Zap />,
        tags: ['Math', 'Statistics', 'Visual']
      }
    ]
  },
  {
    id: 'ai-design',
    name: 'AI, Data & Design',
    icon: <Palette className="w-5 h-5" />,
    accentColor: 'violet',
    resources: [
      {
        title: 'ML Visualized',
        url: 'https://ml-visualized.com/index.html#',
        description: 'Intuitive explanations of complex machine learning concepts.',
        icon: <Zap />,
        tags: ['AI', 'Visual', 'Machine Learning']
      },
      {
        title: 'Anthropic Academy',
        url: 'https://anthropic.skilljar.com/',
        description: 'Official courses on AI safety, alignment, and model usage.',
        icon: <FlaskConical />,
        tags: ['AI', 'Ethics', 'Official']
      },
      {
        title: 'Laws of UX',
        url: 'https://lawsofux.com/',
        description: 'A collection of best practices that designers can consider when building user interfaces.',
        icon: <Palette />,
        tags: ['UX', 'Design', 'Psychology']
      },
      {
        title: 'Daily UI',
        url: 'https://www.dailyui.co/',
        description: 'Design challenge to help you become a better designer in 100 days.',
        icon: <Palette />,
        tags: ['UI', 'Challenge', 'Design']
      }
    ]
  },
  {
    id: 'certifications',
    name: 'Certifications & Career',
    icon: <GraduationCap className="w-5 h-5" />,
    accentColor: 'emerald',
    resources: [
      {
        title: 'McKinsey Forward',
        url: 'https://www.mckinsey.org/our-programs/forward/overview',
        description: 'Free learning program for young professionals early in their careers.',
        icon: <Briefcase />,
        tags: ['Career', 'Business', 'Leadership']
      },
      {
        title: 'Oracle Certification',
        url: 'https://www.oracle.com/in/education/certification/',
        description: 'Industry-standard cloud and database certifications.',
        icon: <GraduationCap />,
        tags: ['Cloud', 'Database', 'Official']
      },
      {
        title: 'HubSpot Academy',
        url: 'https://academy.hubspot.com/',
        description: 'Comprehensive courses on inbound marketing, sales, and service.',
        icon: <GraduationCap />,
        tags: ['Marketing', 'Sales', 'Business']
      },
      {
        title: 'The Forage',
        url: 'https://www.theforage.com/',
        description: 'Virtual work experience programs from top companies like J.P. Morgan.',
        icon: <Briefcase />,
        tags: ['Internship', 'Corporate', 'Experience']
      },
      {
        title: 'Class Central',
        url: 'https://www.classcentral.com/',
        description: 'A search engine and reviews for free online courses worldwide.',
        icon: <Globe />,
        tags: ['Search', 'MOOC', 'Reviews']
      }
    ]
  },
  {
    id: 'languages-skills',
    name: 'Languages & Skills',
    icon: <Languages className="w-5 h-5" />,
    accentColor: 'amber',
    resources: [
      {
        title: 'LingoHut',
        url: 'https://www.lingohut.com/en',
        description: 'Language learning for everyone with 50+ languages.',
        icon: <Languages />,
        tags: ['Language', 'Interactive', 'Free']
      },
      {
        title: 'Loecsen',
        url: 'https://www.loecsen.com/',
        description: 'Online language courses with practical phrasebooks and audio.',
        icon: <Languages />,
        tags: ['Language', 'Travel', 'Audio']
      },
      {
        title: 'Typing.com',
        url: 'https://www.typing.com/student/lessons',
        description: 'Learn to touch type with interactive lessons and games.',
        icon: <Keyboard />,
        tags: ['Typing', 'Skill', 'Productivity']
      },
      {
        title: 'With Diode',
        url: 'https://www.withdiode.com/',
        description: 'Modern infrastructure for decentralized collaboration.',
        icon: <Zap />,
        tags: ['Web3', 'Decentralized', 'Tech']
      }
    ]
  }
];
