import resumeFile from '../assets/Resume.pdf'
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
] as const

export const heroStats = [
  {
    label: 'Projects',
    value: '5+',
    detail: 'AI/ML & Full-Stack Projects',
  },
  {
    label: 'Skills',
    value: '20+',
    detail: 'AI/ML, Full-Stack & Problem Solving',
  },
  {
    label: 'Technologies',
    value: '20+',
    detail: 'Python, React, Node.js, AWS & Docker',
  },
  {
    label: 'Problems Solved',
    value: '900+',
    detail: 'LeetCode and CodeChef problems solved',
  },
  {
    label: 'Certifications',
    value: '7+',
    detail: 'Professional Development Certifications',
  },
] as const
export const introHighlights = [
  {
    title: 'Who I Am',
    text: 'I’m a B.Tech Computer Science student and AI/ML & Full-Stack Developer focused on building practical, scalable and intelligent applications.',
  },
  {
    title: 'My Mission',
    text: 'To build impactful applications by combining Machine Learning, modern web technologies and strong problem-solving skills.',
  },
  {
    title: 'My Vision',
    text: 'To become a skilled software engineer who builds intelligent, reliable and user-focused solutions for real-world problems.',
  },
  {
    title: 'What Drives Me',
    text: 'I enjoy solving challenging problems, learning new technologies and turning ideas into clean, functional applications.',
  },
  {
    title: 'Learning Journey',
    text: 'Currently strengthening my skills in Machine Learning, RAG, LLMs, MERN development, AWS and Docker through hands-on projects.',
  },
  {
    title: 'Career Goals',
    text: 'Looking for an internship where I can contribute to real-world projects, grow as an engineer and gain experience building production-ready applications.',
  },
] as const

export const quickFacts = [
  { label: 'Location', value: 'Ghaziabad, Uttar Pradesh' },
  { label: 'Education', value: 'B.Tech CSE • 2024–2028' },
  { label: 'Focus', value: 'AI/ML & Full-Stack Development' },
  { label: 'Availability', value: 'Open for Internships' },
  { label: 'Email', value: 'amanumrao28@gmail.com' },
  { label: 'College', value: 'ABES Engineering College' },
] as const

export const educationTimeline = [
  {
    title: 'Bachelor of Technology (B.Tech)',
    domain: 'ABES Engineering College, Ghaziabad',
    period: 'Aug 2024 - Present',
    description:
      'Pursuing Computer Science and Engineering at ABES Engineering College with a current SGPA of 8.5. Focused on AI/ML, full-stack development, problem solving and modern software technologies.',
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'Web Development',
      'Git & GitHub',
    ],
  },

  {
    title: 'School Education',
    domain: 'M D B L Inter College, Umri, Kanpur Nagar',
    period: '2021 - 2023',
    description:
      'Completed senior secondary education with 93.4% in Class XII and 92.5% in Class X, building a strong academic foundation for higher studies in Computer Science.',
    courses: [
      'Class XII — 93.4%',
      'Class X — 92.5%',
    ],
  },
] as const

export const skillGroups = [
  {
    name: 'Programming',
    items: ['C++', 'Python', 'JavaScript', 'TypeScript'],
  },

  {
    name: 'AI / Machine Learning',
    items: [
      'Scikit-learn',
      'LLMs',
      'RAG',
      'LangChain',
      'LangGraph',
      'AI Agents',
      'FastAPI',
    ],
  },

  {
    name: 'Frontend',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React.js',
      'Tailwind CSS',
      'TypeScript',
    ],
  },

  {
    name: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'RBAC',
      'MVC Architecture',
    ],
  },

  {
    name: 'Database',
    items: ['MongoDB', 'Mongoose','PostgreSQL'],
  },

  {
    name: 'AWS & Docker',
    items: [
      'AWS',
      'EC2',
      'EBS',
      'S3',
      'IAM',
      'VPC',
      'Docker',
    ],
  },

  {
    name: 'Developer Tools',
    items: [
      'Git',
      'GitHub',
      'Postman',
      'Jupyter Notebook',
      'VS Code',
      'Kaggle',
    ],
  },
] as const

export const techUniverse = [
  {
    name: 'Python',
    x: 14,
    y: 28,
    links: ['Machine Learning', 'LLMs', 'RAG', 'Tailwind CSS', 'AWS'],
  },
  {
    name: 'Machine Learning',
    x: 26,
    y: 12,
    links: ['Python', 'TypeScript', 'LLMs', 'RAG'],
  },
  {
    name: 'TypeScript',
    x: 50,
    y: 12,
    links: ['Machine Learning', 'React', 'Node.js', 'Tailwind CSS'],
  },
  {
    name: 'Node.js',
    x: 74,
    y: 12,
    links: ['TypeScript', 'React', 'Express.js', 'MongoDB', 'Docker'],
  },
  {
    name: 'React',
    x: 86,
    y: 28,
    links: ['TypeScript', 'Tailwind CSS', 'Node.js'],
  },
  {
    name: 'Tailwind CSS',
    x: 15,
    y: 50,
    links: ['React', 'TypeScript', 'Python'],
  },
  {
    name: 'Express.js',
    x: 85,
    y: 50,
    links: ['Node.js', 'MongoDB'],
  },
  {
    name: 'LLMs',
    x: 18,
    y: 70,
    links: ['Python', 'Machine Learning', 'RAG'],
  },
  {
    name: 'Docker',
    x: 82,
    y: 70,
    links: ['Node.js', 'AWS'],
  },
  {
    name: 'AWS',
    x: 30,
    y: 84,
    links: ['Docker', 'MongoDB', 'Python'],
  },
  {
    name: 'MongoDB',
    x: 50,
    y: 84,
    links: ['Node.js', 'Express.js', 'RAG', 'AWS'],
  },
  {
    name: 'RAG',
    x: 70,
    y: 84,
    links: ['Python', 'Machine Learning', 'LLMs', 'MongoDB'],
  },
] as const

export const projects = [
  {
    title: 'Bank Transaction System',
    category: 'Backend',
    description:
      'Secure banking backend supporting accounts, fund transfers and transaction history through RESTful APIs.',
    problem:
      'Build a reliable backend for managing accounts, transfers and transaction records while maintaining secure authentication and data consistency.',
    solution:
      'Developed a modular Node.js and Express.js backend with JWT authentication, RESTful APIs and MongoDB/Mongoose data models.',
    technology: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'REST API',
    ],
    features: [
      '4+ backend modules',
      '15+ RESTful endpoints',
      'JWT authentication',
      'Transaction history',
      'MVC architecture',
    ],
    challenges: [
      'Maintaining data consistency during fund transfers',
      'Designing a modular backend architecture',
    ],
    github: 'https://github.com/amanumrao28-png/Bank_Transaction_System.git',
    demo: '',
  },

  {
    title: 'Spotify Backend',
    category: 'Backend',
    description:
      'Scalable music backend with authentication, role-based access and RESTful APIs for music management.',
    problem:
      'Create a backend system that supports different user roles and provides structured management of users, albums and songs.',
    solution:
      'Built a Node.js and Express.js backend using JWT authentication, RBAC, MongoDB and Mongoose schema relationships.',
    technology: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'RBAC',
      'Multer',
    ],
    features: [
      'JWT authentication',
      'Admin & user roles',
      '10+ RESTful endpoints',
      'CRUD APIs',
      'Audio & cover uploads',
    ],
    challenges: [
      'Implementing role-based access control',
      'Managing relationships between users, albums and songs',
    ],
    github: 'https://github.com/amanumrao28-png/Spotify-Backend.git',
    demo: '',
  },

  {
    title: 'Netflix Clone',
    category: 'Frontend',
    description:
      'Responsive Netflix-inspired interface featuring structured navigation, hero content and movie carousels.',
    problem:
      'Recreate a familiar streaming interface while maintaining responsive layouts across different screen sizes.',
    solution:
      'Built a responsive frontend using HTML5, CSS3 and JavaScript with CSS Grid, Flexbox and media queries.',
    technology: [
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    features: [
      'Responsive navbar',
      'Hero banner',
      'Movie carousels',
      'Responsive layout',
      'Mobile, tablet & desktop support',
    ],
    challenges: [
      'Maintaining consistent layouts across breakpoints',
      'Building a responsive streaming-style interface',
    ],
    github: 'https://github.com/amanumrao28-png/Netflix-Clone.git',
    demo: '',
  },
] as const
export const achievements = [
  {
    label: 'LeetCode Problems',
    value: 350,
    suffix: '+',
    iconKey: 'code',
  },
  {
    label: 'Coding Problems Solved',
    value: 900,
    suffix: '+',
    iconKey: 'trophy',
  },
  {
    label: 'CodeChef Rating',
    value: 1,
    suffix: '★',
    iconKey: 'trophy',
  },
  {
    label: 'HackerRank Rating',
    value: 5,
    suffix: '★',
    iconKey: 'code',
  },
  {
    label: 'Hackathons Participated',
    value: 4,
    suffix: '+',
    iconKey: 'layers',
  },
  {
    label: 'AWS Builder Group',
    value: 1,
    suffix: '',
    iconKey: 'github',
  },
] as const

export const profiles = [
  {
    name: 'GitHub',
    handle: 'amanumrao28-png',
    href: 'https://github.com/amanumrao28-png',
    logo: 'https://cdn.simpleicons.org/github/181717',
    stats: 'Projects, open-source work and development activity',
  },
  {
    name: 'LeetCode',
    handle: 'EKv6KzwO7V',
    href: 'https://leetcode.com/u/EKv6KzwO7V/',
    logo: 'https://cdn.simpleicons.org/leetcode/F89F1B',
    stats: 'DSA practice and problem solving',
  },
  {
    name: 'CodeChef',
    handle: 'soon_otters_83',
    href: 'https://www.codechef.com/users/soon_otters_83',
    logo: 'https://cdn.simpleicons.org/codechef/5B4638',
    stats: 'Competitive programming and algorithmic practice',
  },
  {
    name: 'HackerRank',
    handle: 'amanumrao28',
    href: 'https://www.hackerrank.com/profile/amanumrao28',
    logo: 'https://cdn.simpleicons.org/hackerrank/00EA64',
    stats: 'Programming practice and technical skill development',
  },
  {
    name: 'LinkedIn',
    handle: 'aman-umrao',
    href: 'https://www.linkedin.com/in/aman-umrao/',
    logo: 'https://cdn.simpleicons.org/linkedin/0A66C2',
    stats: 'Professional updates and career opportunities',
  },
  {
    name: 'Kaggle',
    handle: 'amanumrao',
    href: 'https://www.kaggle.com/amanumrao',
    logo: 'https://cdn.simpleicons.org/kaggle/20BEFF',
    stats: 'Machine Learning, datasets and AI/ML practice',
  },
] as const

export const contactLinks = {
  email: 'amanumrao28@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aman-umrao/',
  github: 'https://github.com/amanumrao28-png',
  location: 'Ghaziabad, Uttar Pradesh',
} as const

export const avatarFallback = 'AU'
export const resume = resumeFile
export const githubUsername = 'amanumrao28-png'
