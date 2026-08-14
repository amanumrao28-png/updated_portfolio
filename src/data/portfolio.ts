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
  { label: 'Projects', value: '5+', detail: 'MERN and Cybersecurity Projects' },
  { label: 'Skills', value: '20+', detail: 'Frontend, backend, cybersecurity and tooling' },
  { label: 'Technologies', value: '18+', detail: 'React, Express, Git, Linux, and Burp Suite' },
  { label: 'Problems Solved', value: '700+', detail: '200+ LeetCode and 400+ CodeChef problems solved' },
  { label: 'Certifications', value: '7+', detail: 'CCNA Introduction to Networks and Professional Development Certifications' },
] as const

export const introHighlights = [
  {
    title: 'Who I Am',
    text: 'I m a B.Tech Computer Science student and MERN Stack Developer passionate about building responsive, scalable and secure web applications while exploring cybersecurity.',
  },
  {
    title: 'My Mission',
    text: 'To develop impactful web applications, strengthen my full-stack development skills and build a successful career in software engineering and cybersecurity.',
  },
  {
    title: 'My Vision',
    text: 'To become a skilled software engineer who creates secure, high-performance applications that solve real-world problems.',
  },
  {
    title: 'What Drives Me',
    text: 'Continuous learning, solving challenging problems, writing clean code and improving user experiences motivate me every day.',
  },
  {
    title: 'Learning Journey',
    text: 'Exploring MERN, secure coding, networking, system design and practical developer tooling through hands-on projects.',
  },
  {
    title: 'Career Goals',
    text: 'Earn an internship in software development or cybersecurity and keep raising the bar on engineering craft.',
  },
] as const

export const quickFacts = [
  { label: 'Location', value: 'Ghaziabad, Uttar Pradesh' },
  { label: 'Education', value: 'B.Tech Computer Science Engineering' },
  { label: 'Languages', value: 'English, Hindi' },
  { label: 'Availability', value: 'Open for internships' },
  { label: 'Email', value: 'aman.umrao.dev@gmail.com' },
  { label: 'College', value: 'ABES Engineering College' },
  { label: 'Degree', value: 'Computer Science Engineering' },
] as const

export const educationTimeline = [
  {
    title: 'Bachelor of Technology (B.Tech)',
    domain: 'Computer Science & Engineering',
    period: '2024 - 2028',
    description: 'Focused on full-stack development, problem solving and cybersecurity while building practical projects and strengthening core computer science concepts.',
    courses: [
      'Operating Systems',
      'DBMS',
      'Computer Networks',
      'DSA',
      'OOP',
      'Git & GitHub',
      'Web Development',
      'Cyber Security',
    ],
  },
] as const

export const skillGroups = [
  {
    name: 'Programming',
    items: ['C++', 'Java', 'Python', 'JavaScript'],
  },
  {
    name: 'Frontend',
    items: ['HTML', 'CSS', 'React', 'Tailwind', 'Bootstrap'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express.js'],
  },
  {
    name: 'Database',
    items: ['MongoDB', 'MySQL'],
  },
  {
    name: 'Cybersecurity',
    items: ['Burp Suite', 'Nmap', 'Wireshark', 'Linux', 'OWASP Top 10'],
  },
  {
    name: 'Networking',
    items: ['CCNA', 'TCP/IP', 'DNS', 'HTTP', 'Routing', 'Switching'],
  },
  {
    name: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman'],
  },
] as const

export const techUniverse = [
  { name: 'React', x: 14, y: 30, links: ['TypeScript', 'Tailwind', 'Node.js'] },
  { name: 'TypeScript', x: 26, y: 15, links: ['React', 'Node.js', 'Git'] },
  { name: 'Node.js', x: 50, y: 12, links: ['Express.js', 'MongoDB', 'Docker'] },
  { name: 'Express.js', x: 71, y: 34, links: ['Node.js', 'MongoDB', 'Postman'] },
  { name: 'MongoDB', x: 52, y: 74, links: ['Express.js', 'React', 'Postman'] },
  { name: 'Tailwind', x: 28, y: 43, links: ['React', 'CSS', 'Framer Motion'] },
  { name: 'Git', x: 12, y: 58, links: ['GitHub', 'Docker', 'VS Code'] },
  { name: 'Docker', x: 24, y: 74, links: ['Node.js', 'Git', 'Linux'] },
  { name: 'Linux', x: 84, y: 70, links: ['Docker', 'Wireshark', 'Nmap'] },
  { name: 'Cybersecurity', x: 53, y: 88, links: ['Burp Suite', 'Nmap', 'OWASP Top 10'] },
  { name: 'Networking', x: 77, y: 17, links: ['TCP/IP', 'DNS', 'HTTP'] },
  { name: 'Security', x: 84, y: 49, links: ['Cybersecurity', 'Networking', 'Linux'] },
] as const

export const projects = [
  {
    title: 'Netflix Clone',
    category: 'Web App',
    description: 'Streaming UI with responsive browsing and clean media cards.',
    problem: 'Create a familiar entertainment UI that still feels fast, premium and easy to navigate.',
    solution: 'Designed a modular layout with strong visual hierarchy and reusable media cards.',
    technology: ['React', 'Tailwind', 'API Integration'],
    features: ['Hero banner', 'Category rails', 'Responsive cards', 'Trailer-ready structure'],
    challenges: ['Balancing visual density with readability', 'Keeping interactions lightweight'],
    github: 'https://github.com/amanumrao28-png/netflix-clone',
    demo: 'https://amanumrao.dev/netflix-clone',
  },
  {
    title: 'Resume Builder',
    category: 'Productivity',
    description: 'Resume editor with live preview and export-focused flow.',
    problem: 'Make resume creation approachable without sacrificing polish or control.',
    solution: 'Used guided sections and preview-first workflows to reduce friction.',
    technology: ['React', 'Node.js', 'PDF Export'],
    features: ['Live preview', 'Section control', 'Template guidance', 'Export flow'],
    challenges: ['Supporting a flexible content model', 'Keeping the layout print-friendly'],
    github: 'https://github.com/amanumrao28-png/resume-builder',
    demo: 'https://amanumrao.dev/resume-builder',
  },
  {
    title: 'Complaint Management Portal',
    category: 'Dashboard',
    description: 'Complaint tracking dashboard with ownership and status clarity.',
    problem: 'Teams need an organized intake system that avoids lost requests and unclear responsibility.',
    solution: 'Built status-based workflows, searchable records and quick action pathways.',
    technology: ['MERN Stack', 'Role-based Access', 'MongoDB'],
    features: ['Case tracking', 'Role views', 'Status filters', 'Audit-friendly records'],
    challenges: ['Designing a scalable workflow model', 'Keeping status transitions obvious'],
    github: 'https://github.com/amanumrao28-png/complaint-portal',
    demo: 'https://amanumrao.dev/complaint-portal',
  },
  {
    title: 'AI Fitness Tracker',
    category: 'AI',
    description: 'Fitness dashboard for goals, progress and daily insights.',
    problem: 'Make health tracking useful instead of noisy or overwhelming.',
    solution: 'Focused on high-signal metrics, simple nudges and an encouraging visual rhythm.',
    technology: ['React', 'Charts', 'AI Concepts'],
    features: ['Progress insights', 'Daily goal cards', 'Habit focus', 'Friendly feedback'],
    challenges: ['Visualizing progress in a compact layout', 'Keeping the interface motivating'],
    github: 'https://github.com/amanumrao28-png/ai-fitness-tracker',
    demo: 'https://amanumrao.dev/ai-fitness-tracker',
  },
  {
    title: 'Portfolio Website',
    category: 'Portfolio',
    description: 'Modern portfolio with recruiter-focused sections and motion.',
    problem: 'Present technical depth without feeling generic or overcrowded.',
    solution: 'Created a dashboard-style narrative with modular sections and refined interactions.',
    technology: ['React', 'Motion', 'Design Systems'],
    features: ['Glass navbar', 'Animated sections', 'Mission modules', 'Responsive system'],
    challenges: ['Making the design feel premium while remaining fast'],
    github: 'https://github.com/amanumrao28-png/portfolio-website',
    demo: 'https://amanumrao.dev',
  },
  {
    title: 'Bug Bounty Toolkit',
    category: 'Security',
    description: 'Security workflow toolkit for recon, notes and triage.',
    problem: 'Security work needs structure, speed and repeatable note capture.',
    solution: 'Organized common recon tasks into a streamlined and reusable toolkit.',
    technology: ['Burp Suite', 'Nmap', 'Linux'],
    features: ['Recon checklists', 'Triage notes', 'Tool shortcuts', 'Session logging'],
    challenges: ['Balancing depth with speed of use', 'Keeping the interface distraction-free'],
    github: 'https://github.com/amanumrao28-png/bug-bounty-toolkit',
    demo: 'https://amanumrao.dev/bug-bounty-toolkit',
  },
] as const

export const achievements = [
  { label: 'LeetCode Problems', value: 150, suffix: '+', iconKey: 'code' },
  { label: 'CodeChef Problems', value: 450, suffix: '+', iconKey: 'trophy' },
  { label: 'CCNA Completed', value: 1, suffix: '', iconKey: 'network' },
  { label: 'MERN Stack Projects', value: 6, suffix: '+', iconKey: 'layers' },
  { label: 'Open Source Learning', value: 12, suffix: '+', iconKey: 'github' },
  { label: 'Cybersecurity Labs', value: 20, suffix: '+', iconKey: 'shield' },
] as const

export const certifications = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Self-led / Project Based',
    summary: 'Hands-on exploration across frontend architecture, backend APIs and deployment thinking.',
    fileName: 'full-stack-learning-preview.pdf',
  },
  {
    title: 'Cybersecurity Foundations',
    issuer: 'Security Lab Practice',
    summary: 'Practiced scanning, interception, OWASP awareness and disciplined remediation workflows.',
    fileName: 'cybersecurity-foundations-preview.pdf',
  },
  {
    title: 'Networking Fundamentals',
    issuer: 'CCNA Track',
    summary: 'Studied TCP/IP, routing, switching, DNS and HTTP through structured network learning.',
    fileName: 'networking-fundamentals-preview.pdf',
  },
] as const

export const profiles = [
  {
    name: 'GitHub',
    handle: 'amanumrao28-png',
    href: 'https://github.com/amanumrao28-png',
    logo: 'https://cdn.simpleicons.org/github/181717',
    stats: 'Public repos, code experiments and project history',
  },
  {
    name: 'LeetCode',
    handle: 'amanumrao',
    href: 'https://leetcode.com/u/amanumrao/',
    logo: 'https://cdn.simpleicons.org/leetcode/F89F1B',
    stats: 'DSA practice and problem solving rhythm',
  },
  {
    name: 'CodeChef',
    handle: 'amanumrao',
    href: 'https://www.codechef.com/users/amanumrao',
    logo: 'https://cdn.simpleicons.org/codechef/5B4638',
    stats: 'Competitive programming progress',
  },
  {
    name: 'LinkedIn',
    handle: 'aman-umrao',
    href: 'https://www.linkedin.com/in/aman-umrao/',
    logo: 'https://cdn.simpleicons.org/linkedin/0A66C2',
    stats: 'Professional updates and internship readiness',
  },
  {
    name: 'TryHackMe',
    handle: 'amanumrao',
    href: 'https://tryhackme.com/p/amanumrao',
    logo: 'https://cdn.simpleicons.org/tryhackme/212C42',
    stats: 'Security labs and defensive learning',
  },
  {
    name: 'Hack The Box',
    handle: 'amanumrao',
    href: 'https://www.hackthebox.com/',
    logo: 'https://cdn.simpleicons.org/hackthebox/9FEF00',
    stats: 'Hands-on security exploration',
  },
] as const

export const contactLinks = {
  email: 'aman.umrao.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aman-umrao/',
  github: 'https://github.com/amanumrao28-png',
  phone: 'Available on request',
  location: 'Ghaziabad, Uttar Pradesh',
} as const

// Replace these with the real headshot, resume file and live profile URLs when final assets are ready.
export const avatarFallback = 'AU'
export const resumeDownloadLabel = 'Aman_Umrao_Resume.txt'
export const githubUsername = 'amanumrao28-png'
