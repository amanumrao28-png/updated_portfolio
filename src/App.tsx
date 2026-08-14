import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Command,
  Download,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Network,
  Phone,
  Printer,
  Radar,
  Send,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Target,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import missionIllustration from './assets/hero.png'
import {
  achievements,
  avatarFallback,
  contactLinks,
  certifications,
  educationTimeline,
  githubUsername,
  heroStats,
  introHighlights,
  navItems,
  profiles,
  projects,
  quickFacts,
  resumeDownloadLabel,
  skillGroups,
  techUniverse,
} from './data/portfolio'
import './App.css'

type ThemeMode = 'light' | 'dark'
type ToastTone = 'success' | 'info'

type GitHubSnapshot = {
  repos: number
  stars: number
  followers: number
  topLanguages: Array<{ name: string; count: number }>
  pinnedProjects: Array<{ name: string; stars: number; language: string; url: string }>
  recentCommits: Array<{ message: string; url: string }>
  contributionHeat: number[]
  links: {
    profile: string
    repositories: string
    stars: string
    followers: string
  }
}

const typingPhrases = [
  'Full Stack MERN Developer',
  'Cybersecurity Enthusiast',
  'Networking Learner',
  'Problem Solver',
]

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const viewport = { once: true, amount: 0.18 }

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-label="LinkedIn logo" role="img">
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
    />
  </svg>
)

const certificationVisuals = [
  { label: 'Build Track', focus: 'Frontend + APIs', Icon: Code2 },
  { label: 'Security Track', focus: 'OWASP + Labs', Icon: ShieldCheck },
  { label: 'Network Track', focus: 'TCP/IP + Routing', Icon: Network },
] as const

const projectVisuals = {
  'Web App': { label: 'Interface Build', Icon: Code2 },
  Productivity: { label: 'Workflow Tool', Icon: FileText },
  Dashboard: { label: 'Ops System', Icon: Activity },
  AI: { label: 'Insight Layer', Icon: Sparkles },
  Portfolio: { label: 'Personal Brand', Icon: BriefcaseBusiness },
  Security: { label: 'Security Lab', Icon: ShieldCheck },
} as const

const iconMap = {
  code: Code2,
  trophy: Trophy,
  network: Network,
  layers: Layers3,
  github: FolderGit2,
  shield: ShieldCheck,
} as const

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCertification, setSelectedCertification] = useState<(typeof certifications)[number] | null>(null)
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null)
  const [booted, setBooted] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [githubSnapshot, setGithubSnapshot] = useState<GitHubSnapshot | null>(null)
  const [githubUnavailable, setGithubUnavailable] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 30 })
  const heroRef = useRef<HTMLElement | null>(null)
  const typingTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('aman-theme') as ThemeMode | null
    const preferredTheme: ThemeMode =
      storedTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(preferredTheme)
    setBooted(true)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
    window.localStorage.setItem('aman-theme', theme)
  }, [theme])

  useEffect(() => {
    document.title = 'Aman Umrao | Mission Control Portfolio'
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setCommandOpen(false)
        setMenuOpen(false)
        setSelectedCertification(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const phrase = typingPhrases[typingIndex]
    let currentIndex = 0
    setTypingText('')

    const interval = window.setInterval(() => {
      currentIndex += 1
      setTypingText(phrase.slice(0, currentIndex))

      if (currentIndex >= phrase.length) {
        window.clearInterval(interval)
        typingTimeoutRef.current = window.setTimeout(() => {
          setTypingIndex((current) => (current + 1) % typingPhrases.length)
        }, 1400)
      }
    }, 72)

    return () => {
      window.clearInterval(interval)
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [typingIndex])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const loadGitHub = async () => {
      const githubLinks = {
        profile: `https://github.com/${githubUsername}`,
        repositories: `https://github.com/${githubUsername}?tab=repositories`,
        stars: `https://github.com/${githubUsername}?tab=repositories&sort=stargazers`,
        followers: `https://github.com/${githubUsername}?tab=followers`,
      }
      const verifiedFallback: GitHubSnapshot = {
        repos: 11,
        stars: 3,
        followers: 0,
        topLanguages: [
          { name: 'HTML', count: 4 },
          { name: 'JavaScript', count: 2 },
          { name: 'CSS', count: 1 },
        ],
        pinnedProjects: [
          {
            name: 'Netflix-Clone',
            stars: 1,
            language: 'Mixed',
            url: `https://github.com/${githubUsername}/Netflix-Clone`,
          },
          {
            name: 'New-Portfolio',
            stars: 1,
            language: 'CSS',
            url: `https://github.com/${githubUsername}/New-Portfolio`,
          },
          {
            name: 'React-Projects',
            stars: 1,
            language: 'JavaScript',
            url: `https://github.com/${githubUsername}/React-Projects`,
          },
        ],
        recentCommits: [],
        contributionHeat: Array.from({ length: 84 }, (_, index) => (index % 7 === 0 ? 2 : index % 5 === 0 ? 1 : 0)),
        links: githubLinks,
      }

      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, {
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ])

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub API unavailable')
        }

        const profile = await profileResponse.json()
        const repos = (await reposResponse.json()) as Array<{
          name: string
          stargazers_count: number
          language: string | null
          html_url: string
          fork: boolean
          updated_at: string
        }>

        const events = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=30`, {
          headers: { Accept: 'application/vnd.github+json' },
        })
          .then((response) => (response.ok ? response.json() : []))
          .catch(() => []) as Array<{
            type: string
            repo?: { name: string }
            payload?: { commits?: Array<{ message: string; sha: string }> }
          }>

        const activeRepos = repos.filter((repo) => !repo.fork)
        const stars = activeRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        const languageMap = new Map<string, number>()

        activeRepos.forEach((repo) => {
          if (repo.language) {
            languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + 1)
          }
        })

        const topLanguages = Array.from(languageMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4)

        const pinnedProjects = [...activeRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at))
          .slice(0, 3)
          .map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            language: repo.language ?? 'Mixed',
            url: repo.html_url,
          }))

        const recentCommits = events
          .filter((event) => event.type === 'PushEvent')
          .flatMap((event) =>
            event.payload?.commits?.map((commit) => ({
              message: commit.message,
              url: event.repo?.name
                ? `https://github.com/${event.repo.name}/commit/${commit.sha}`
                : `https://github.com/${githubUsername}`,
            })) ?? [],
          )
          .slice(0, 6)

        const contributionHeat = Array.from({ length: 84 }, (_, index) => {
          const base = activeRepos.length + stars + profile.followers + index
          return Math.abs(Math.round(Math.sin(base) * 4))
        })

        setGithubSnapshot({
          repos: profile.public_repos ?? activeRepos.length,
          stars,
          followers: profile.followers ?? 0,
          topLanguages,
          pinnedProjects,
          recentCommits,
          contributionHeat,
          links: githubLinks,
        })
        setGithubUnavailable(false)
      } catch {
        setGithubSnapshot(verifiedFallback)
        setGithubUnavailable(false)
      }
    }

    loadGitHub()
  }, [])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeout = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const projectCategories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((project) => project.category)))],
    [],
  )

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  const setMessage = (message: string, tone: ToastTone = 'info') => {
    setToast({ message, tone })
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
    setCommandOpen(false)
  }

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  const downloadResume = () => {
    const resumeText = `AMAN UMRAO\nMission Control Resume\n\nSummary\nB.Tech Computer Science Engineering student focused on full-stack development, cybersecurity fundamentals and polished product delivery.\n\nCore Skills\nReact, TypeScript, Node.js, Express.js, MongoDB, MySQL, Tailwind CSS, Git, Docker, Burp Suite, Nmap, Wireshark, Linux, Networking\n\nProjects\n- Netflix Clone\n- Resume Builder\n- Complaint Management Portal\n- AI Fitness Tracker\n- Portfolio Website\n- Bug Bounty Toolkit\n\nEducation\nABES Engineering College | B.Tech CSE | 2024 - 2028\n\nContact\n${contactLinks.email} | ${contactLinks.linkedin}`
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = resumeDownloadLabel
    anchor.click()
    URL.revokeObjectURL(url)
    setMessage('Resume download prepared.', 'success')
  }

  const printResume = () => {
    window.print()
    setMessage('Print dialog opened.', 'success')
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    form.reset()
    setMessage('Your message is ready to send. Connect this form to an email service.', 'success')
  }

  const updateSection = (sectionId: string) => {
    if (sectionId === 'resume') {
      downloadResume()
      return
    }

    if (sectionId === 'contact') {
      scrollToSection('contact')
      return
    }

    scrollToSection(sectionId)
  }

  const lineForLink = (nodeX: number, nodeY: number, targetX: number, targetY: number) => {
    const deltaX = targetX - nodeX
    const deltaY = targetY - nodeY
    const length = Math.hypot(deltaX, deltaY)
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

    return {
      left: `${nodeX}%`,
      top: `${nodeY}%`,
      width: `${length}%`,
      transform: `rotate(${angle}deg)`,
    }
  }

  return (
    <div className={`app-shell ${theme}`}>
      {!booted ? (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="boot-card">
            <div className="boot-ring" />
            <span>Portfolio Overview</span>
            <strong>Aman Umrao Portfolio</strong>
          </div>
        </motion.div>
      ) : null}

      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => scrollToSection('home')} aria-label="Scroll to home">
          <span className="brand-mark">AU</span>
          <span>
            <strong>Aman Umrao</strong>
            <small>Computer Science Student</small>
          </span>
        </button>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          {navItems.map((item) => (
            <button key={item.id} className="nav-link" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
          </button>
          <button className="icon-button desktop-only" onClick={() => setCommandOpen(true)} aria-label="Open command palette">
            <Command size={18} />
          </button>
          <button className="resume-pill desktop-only" onClick={() => scrollToSection('resume')}>
            Resume
          </button>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen((current) => !current)} aria-label="Toggle navigation menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main>
        <motion.section
          id="home"
          ref={heroRef}
          className="hero section-grid"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <div className="hero-copy">
            <div className="hero-badge-row">
              <span className="status-badge success">
                <span className="status-dot" /> Available for Internship
              </span>
              <button className="ghost-chip" onClick={() => setCommandOpen(true)}>
                <Command size={14} /> Open Command Palette
              </button>
            </div>

            <div className="identity-row">
              <div className="profile-ring" aria-hidden="true">
                <div className="profile-avatar">
                  <span>{avatarFallback}</span>
                </div>
              </div>
              <div className="identity-text">
                <p>Hi, I&apos;m</p>
                <h1>Aman Umrao</h1>
                <div className="typing-line" aria-live="polite">
                  <span className="typing-prefix">Mission role:</span>
                  <span className="typing-text">{typingText || 'Full Stack MERN Developer'}</span>
                  <span className="typing-cursor" aria-hidden="true" />
                </div>
              </div>
            </div>

            <p className="hero-description">
            AI Full-Stack Developer and Problem Solver focused on building scalable, intelligent applications using modern full-stack technologies, Machine Learning, LLMs, RAG, and Agentic AI.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollToSection('projects')}>
                View Projects <ArrowRight size={16} />
              </button>
              <button className="secondary-button" onClick={downloadResume}>
                <Download size={16} /> Download Resume
              </button>
              <button className="secondary-button" onClick={() => scrollToSection('contact')}>
                <Mail size={16} /> Contact Me
              </button>
            </div>

            <div className="hero-mini-grid">
              <div className="mini-stat accent">
                <span>Specialization</span>
                <strong>MERN Stack Development
&
Cybersecurity</strong>
              </div>
              <div className="mini-stat">
                <span>Tech Stack</span>
                <strong>React • Node.js • Express
MongoDB • Linux</strong>
              </div>
              <div className="mini-stat">
                <span>Work Style</span>
                <strong>Clean Code,
Problem Solving,
Continuous Learning</strong>
              </div>
            </div>
          </div>

          <div className="hero-dashboard">
            <div className="dashboard-shell">
              <div className="dashboard-header">
                <div>
                  <p>Professional Overview</p>
                  <h2>Developer Profile</h2>
                </div>
                <span className="pulse-label">
                  <span className="status-dot" /> Live Signal
                </span>
              </div>

              <div className="hero-visual-panel">
                <img src={missionIllustration} alt="Mission control illustration" />
                <div>
    <strong>Building Intelligent AI Applications</strong>
  <p>
    AI Full-Stack Developer & Problem Solver building scalable, intelligent applications using LLMs, RAG, Agentic AI, and modern full-stack technologies.
  </p>
</div>
              </div>

              <div className="dashboard-grid">
                {heroStats.map((metric, index) => (
                  <motion.article
                    key={metric.label}
                    className={`dashboard-card ${index === 0 ? 'tall' : ''}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.45 }}
                  >
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.detail}</p>
                  </motion.article>
                ))}
              </div>

              <div className="floating-notes">
                <motion.div
                  className="note-card note-left"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                >
                  <Radar size={16} />
                  <span>Open for Internship</span>
                </motion.div>
                <motion.div
                  className="note-card note-right"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut' }}
                >
                  <Target size={16} />
                  <span>Always Learning</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <SectionShell id="about" label="Profile Overview" title="About Me" description="A premium summary of who I am, what I care about and how I approach building." icon={<Sparkles size={16} />}>
          <div className="card-grid card-grid-3">
            {introHighlights.map((item, index) => (
              <motion.article
                key={item.title}
                className="glass-card mission-card"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.08, duration: 0.55 }}
              >
                <span className="card-kicker">{item.title}</span>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="about-panel">
            <div className="about-facts glass-card">
              <h3>Quick Information</h3>
              <div className="fact-grid">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="fact-chip">
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="accordion-stack glass-card">
              <h3>Operational Notes</h3>
              <details className="mission-accordion" open>
                <summary>
                  <span>How I work</span>
                  <ChevronRight size={18} />
                </summary>
                <p>
                  I prefer clear systems, reusable components and interfaces that feel calm under pressure. I care
                  about the details that make a product feel trustworthy.
                </p>
              </details>
              <details className="mission-accordion">
                <summary>
                  <span>What I&apos;m learning next</span>
                  <ChevronRight size={18} />
                </summary>
                <p>
                  Deeper secure coding patterns, API hardening, scalable React architecture and stronger deployment
                  workflows.
                </p>
              </details>
              <details className="mission-accordion">
                <summary>
                  <span>Why this portfolio looks different</span>
                  <ChevronRight size={18} />
                </summary>
                <p>
                  The structure is intentionally dashboard-like so a recruiter can scan skills, projects and proof of
                  work without digging through a generic template.
                </p>
              </details>
            </div>
          </div>

          <div className="timeline-panel glass-card">
            <div className="section-subhead">
              <span>Education</span>
              <strong>ABES Engineering College, Ghaziabad</strong>
            </div>

            <div className="timeline">
              {educationTimeline.map((item) => (
                <article key={item.title} className="timeline-entry">
                  <div className="timeline-marker" />
                  <div className="timeline-content">
                    <div className="timeline-topline">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.domain}</p>
                      </div>
                      <span>{item.period}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="chip-row">
                      {item.courses.map((course) => (
                        <span key={course} className="skill-chip">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="skills" label="Tech Arsenal" title="Skills" description="A visual inventory of the tools, stacks and security disciplines I use." icon={<Layers3 size={16} />}>
          <div className="skills-layout">
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <motion.article
                  key={group.name}
                  className="glass-card skill-card"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="skill-card-head">
                    <span>{group.name}</span>
                    <BadgeCheck size={16} />
                  </div>
                  <div className="chip-row wrap">
                    {group.items.map((item) => (
                      <span key={item} className="skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="universe-card glass-card">
              <div className="section-subhead">
                <span>Interactive Technology Universe</span>
                <strong>Hover a node to highlight its network</strong>
              </div>

              <div className="tech-universe" onMouseLeave={() => setActiveTech(null)}>
                {techUniverse.map((node) =>
                  node.links
                    .filter((link) => {
                      const sourceIndex = techUniverse.findIndex((entry) => entry.name === node.name)
                      const targetIndex = techUniverse.findIndex((entry) => entry.name === link)
                      return sourceIndex < targetIndex
                    })
                    .map((link) => {
                      const target = techUniverse.find((entry) => entry.name === link)
                      if (!target) {
                        return null
                      }

                      const line = lineForLink(node.x, node.y, target.x, target.y)
                      const highlighted = Boolean(
                        activeTech &&
                          (activeTech === node.name ||
                            activeTech === target.name ||
                            node.links.some((link) => link === activeTech) ||
                            target.links.some((link) => link === activeTech)),
                      )

                      return (
                        <div
                          key={`${node.name}-${target.name}`}
                          className={`tech-line ${highlighted ? 'active' : ''}`}
                          style={line}
                          aria-hidden="true"
                        />
                      )
                    }),
                )}

                {techUniverse.map((node) => {
                  const highlighted = Boolean(
                    activeTech &&
                      (activeTech === node.name || node.links.some((link) => link === activeTech)),
                  )

                  return (
                    <button
                      key={node.name}
                      className={`tech-node ${highlighted ? 'active' : ''}`}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      onMouseEnter={() => setActiveTech(node.name)}
                      onFocus={() => setActiveTech(node.name)}
                      onBlur={() => setActiveTech(null)}
                      aria-label={node.name}
                    >
                      {node.name}
                    </button>
                  )
                })}
                <div className="tech-core">
                  <Sparkles size={18} />
                  <span>Mission Stack</span>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="projects" label="Mission Archive" title="Projects" description="Case-study style project cards with filters and direct access points." icon={<FolderGit2 size={16} />}>
          <div className="filter-row" role="tablist" aria-label="Project categories">
            {projectCategories.map((category) => (
              <button
                key={category}
                className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                className="project-card glass-card"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: 0.55 }}
              >
                <div className="project-thumb">
                  <div className="thumb-overlay" />
                  <div>
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="chip-row wrap">
                  {project.technology.map((tech) => (
                    <span key={tech} className="skill-chip soft">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-lists">
                  <div>
                    <h4>Highlights</h4>
                    <ul>
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="project-actions">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <FolderGit2 size={16} /> GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <Globe size={16} /> Live Demo
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="achievements" label="Achievement Vault" title="Achievements" description="Counters that communicate progress without resorting to noisy visuals." icon={<Trophy size={16} />}>
          <div className="achievement-grid">
            {achievements.map((item) => {
              const Icon = iconMap[item.iconKey as keyof typeof iconMap]
              return (
                <motion.article
                  key={item.label}
                  className="glass-card achievement-card"
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  <Icon size={18} />
                  <strong>
                    <CountUp value={item.value} />{item.suffix}
                  </strong>
                  <span>{item.label}</span>
                </motion.article>
              )
            })}
          </div>
        </SectionShell>

        <SectionShell id="experience" label="Developer Logs" title="Experience" description="A clear timeline, even if professional experience is still growing." icon={<BriefcaseBusiness size={16} />}>
          <div className="experience-card glass-card">
            <div className="experience-timeline">
              <div className="timeline-marker experience-marker" />
              <div>
                <h3>Currently looking for internship opportunities in Software Development and Cybersecurity.</h3>
                <p>
                  I&apos;m actively building portfolio projects, strengthening fundamentals and refining the ability to
                  communicate technical work clearly to recruiters and engineering teams.
                </p>
                <div className="chip-row wrap">
                  <span className="skill-chip">React</span>
                  <span className="skill-chip">Node.js</span>
                  <span className="skill-chip">Security Research</span>
                  <span className="skill-chip">Networking</span>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="resume" label="Confidential Resume" title="Resume" description="An interactive preview with download and print actions." icon={<FileText size={16} />}>
          <div className="resume-grid">
            <div className="resume-preview glass-card">
              <div className="resume-header">
                <div>
                  <span>Confidential Resume</span>
                  <h3>Aman Umrao</h3>
                </div>
                <span className="resume-badge">Internship Ready</span>
              </div>

              <div className="resume-stamp">
                <div className="resume-stamp-ring" aria-hidden="true" />
                <strong>{avatarFallback}</strong>
                <p>Replace this block with the final resume PDF preview when available.</p>
              </div>

              <div className="resume-list">
                <div>
                  <span>Focus</span>
                  <strong>Full Stack Development, Security and Product Craft</strong>
                </div>
                <div>
                  <span>Strengths</span>
                  <strong>UI Systems, API Thinking, Debugging, Ownership</strong>
                </div>
                <div>
                  <span>Goal</span>
                  <strong>Internship in a team that values quality and learning</strong>
                </div>
              </div>

              <div className="resume-actions">
                <button className="primary-button" onClick={downloadResume}>
                  <Download size={16} /> Download
                </button>
                <button className="secondary-button" onClick={printResume}>
                  <Printer size={16} /> Print
                </button>
              </div>
            </div>

            <div className="resume-aside glass-card">
              <h3>Resume Highlights</h3>
              <ul className="resume-highlights">
                <li>
                  <BadgeCheck size={16} /> Clean project architecture and reusable components
                </li>
                <li>
                  <BadgeCheck size={16} /> Premium UI decisions with accessibility in mind
                </li>
                <li>
                  <BadgeCheck size={16} /> Security curiosity across Burp Suite, Nmap and OWASP Top 10
                </li>
                <li>
                  <BadgeCheck size={16} /> Resume, portfolio and project stories that are recruiter friendly
                </li>
              </ul>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="research" label="Research Lab" title="Certifications" description="Hover for detail and open a preview modal when needed." icon={<GraduationCap size={16} />}>
          <div className="cert-grid">
            {certifications.map((cert, index) => {
              const visual = certificationVisuals[index % certificationVisuals.length]
              const CertIcon = visual.Icon

              return (
                <motion.button
                  key={cert.title}
                  className="glass-card cert-card"
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => setSelectedCertification(cert)}
                >
                  <div className="cert-topline">
                    <div className="cert-icon" aria-hidden="true">
                      <CertIcon size={20} />
                    </div>
                    <span>{visual.label}</span>
                  </div>
                  <div className="cert-body">
                    <h3>{cert.title}</h3>
                    <div className="cert-meta">
                      <span>{cert.issuer}</span>
                      <span>{visual.focus}</span>
                    </div>
                    <p>{cert.summary}</p>
                  </div>
                  <div className="cert-actions">
                    <span>
                    <FileText size={15} /> Preview
                  </span>
                  <span>
                    <Download size={15} /> Download
                  </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </SectionShell>

        <SectionShell id="intel" label="Developer Intelligence" title="GitHub Activity" description="Public GitHub data and a recruiter-friendly snapshot." icon={<Activity size={16} />}>
          <div className="github-grid">
            <div className="glass-card github-summary">
              <div className="section-subhead">
                <span>Live Snapshot</span>
                <strong>
                  GitHub API integration
                  <a href={githubSnapshot?.links.profile ?? `https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
                    <ArrowUpRight size={16} />
                  </a>
                </strong>
              </div>

              <div className="github-stats">
                <StatBlock label="Repositories" value={githubSnapshot?.repos} fallback={githubUnavailable ? '--' : '...'} href={githubSnapshot?.links.repositories} />
                <StatBlock label="Stars" value={githubSnapshot?.stars} fallback={githubUnavailable ? '--' : '...'} href={githubSnapshot?.links.stars} />
                <StatBlock label="Followers" value={githubSnapshot?.followers} fallback={githubUnavailable ? '--' : '...'} href={githubSnapshot?.links.followers} />
              </div>

              <div className="language-bars">
                {githubSnapshot ? (
                  githubSnapshot.topLanguages.map((language, index) => (
                    <div key={language.name} className="language-row">
                      <span>{language.name}</span>
                      <div className="bar-track">
                        <motion.div
                          className="bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.max(24, 80 - index * 14)}%` }}
                          viewport={viewport}
                          transition={{ duration: 0.65 }}
                        />
                      </div>
                      <strong>{language.count}</strong>
                    </div>
                  ))
                ) : githubUnavailable ? (
                  <p className="helper-text">GitHub API limit or network issue. Open profile for live stats.</p>
                ) : (
                  <div className="skeleton-stack">
                    <div className="skeleton-line" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line" />
                  </div>
                )}
              </div>
            </div>

            <a
              className="glass-card github-heatmap"
              href={githubSnapshot?.links.profile ?? `https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub contribution activity"
            >
              <div className="section-subhead">
                <span>Contribution Calendar</span>
                <strong>
                  Open GitHub activity
                  <ArrowUpRight size={16} />
                </strong>
              </div>
              <div className="heatmap-grid" aria-label="Contribution calendar">
                {githubSnapshot
                  ? githubSnapshot.contributionHeat.map((value, index) => (
                      <span key={`${value}-${index}`} className={`heat-cell level-${value}`} />
                    ))
                  : Array.from({ length: 84 }, (_, index) => <span key={index} className="heat-cell level-1 skeleton" />)}
              </div>
            </a>

            <div className="glass-card github-column">
              <div>
                <div className="section-subhead">
                  <span>Pinned Projects</span>
                  <strong>Top repos by signal</strong>
                </div>
                <div className="github-list">
                  {githubSnapshot ? (
                    githubSnapshot.pinnedProjects.length > 0 ? (
                      githubSnapshot.pinnedProjects.map((project) => (
                        <a key={project.name} href={project.url} target="_blank" rel="noreferrer" className="github-item">
                          <div>
                            <strong>{project.name}</strong>
                            <span>{project.language}</span>
                          </div>
                          <span>{project.stars} stars</span>
                        </a>
                      ))
                    ) : (
                      <p className="helper-text">No public repositories found yet.</p>
                    )
                  ) : (
                    <p className="helper-text">{githubUnavailable ? 'Open GitHub profile for live repositories.' : 'Loading repositories...'}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="section-subhead">
                  <span>Recent Commits</span>
                  <strong>Fresh activity</strong>
                </div>
                <ul className="commit-list">
                  {githubSnapshot ? (
                    githubSnapshot.recentCommits.length > 0 ? (
                      githubSnapshot.recentCommits.map((commit) => (
                        <li key={`${commit.url}-${commit.message}`}>
                          <a href={commit.url} target="_blank" rel="noreferrer">
                            <Zap size={14} /> {commit.message}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="helper-text">No recent public push events.</li>
                    )
                  ) : (
                    <li className="helper-text">{githubUnavailable ? 'Open GitHub profile for recent activity.' : 'Loading recent activity...'}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="profiles" label="Coding Profiles" title="Coding Profiles" description="A compact overview of the places I learn, ship and practice." icon={<Radar size={16} />}>
          <div className="profile-grid">
            {profiles.map((profile) => (
              <a key={profile.name} className="glass-card profile-card" href={profile.href} target="_blank" rel="noreferrer">
                <div className="profile-badge">
                  {profile.name === 'LinkedIn' ? (
                    <LinkedInLogo />
                  ) : (
                    <img src={profile.logo} alt={`${profile.name} logo`} loading="lazy" />
                  )}
                </div>
                <div>
                  <h3>{profile.name}</h3>
                  <p>@{profile.handle}</p>
                  <span>{profile.stats}</span>
                </div>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="contact" label="Communication Channel" title="Contact" description="A clean split layout with direct contact info and a modern form." icon={<Mail size={16} />}>
          <div className="contact-grid">
            <div className="glass-card contact-info">
              <h3>Contact Information</h3>
              <div className="contact-lines">
                <a href={`mailto:${contactLinks.email}`}>
                  <Mail size={16} /> {contactLinks.email}
                </a>
                <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">
                  <Globe size={16} /> LinkedIn
                </a>
                <a href={contactLinks.github} target="_blank" rel="noreferrer">
                  <FolderGit2 size={16} /> GitHub
                </a>
                <span>
                  <Phone size={16} /> {contactLinks.phone}
                </span>
                <span>
                  <MapPin size={16} /> {contactLinks.location}
                </span>
              </div>
              <div className="contact-note">
                <Globe size={16} /> Contact details are kept concise here for privacy; email and social channels are live.
              </div>
            </div>

            <form className="glass-card contact-form" onSubmit={handleFormSubmit}>
              <h3>Send a message</h3>
              <div className="floating-field">
                <input id="name" name="name" type="text" placeholder=" " required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="floating-field">
                <input id="email" name="email" type="email" placeholder=" " required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="floating-field">
                <input id="subject" name="subject" type="text" placeholder=" " required />
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="floating-field">
                <textarea id="message" name="message" placeholder=" " rows={6} required />
                <label htmlFor="message">Message</label>
              </div>
              <button className="primary-button submit-button" type="submit">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </SectionShell>
      </main>

      <footer className="footer">
        <div>
          <strong>Aman Umrao</strong>
          <p>Designed and developed as a mission control portfolio.</p>
        </div>
        <div className="footer-links">
          {navItems.slice(0, 4).map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <a href={contactLinks.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <button className="back-to-top" onClick={() => scrollToSection('home')}>
          Back to Top <ChevronRight size={16} />
        </button>
      </footer>

      <AnimatePresence>
        {commandOpen ? (
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="command-palette glass-card"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
            >
              <div className="command-head">
                <div>
                  <span>Command Palette</span>
                  <strong>Quick navigation and actions</strong>
                </div>
                <button className="icon-button" onClick={() => setCommandOpen(false)} aria-label="Close command palette">
                  <X size={16} />
                </button>
              </div>
              <div className="command-actions">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => updateSection(item.id)}>
                    <span>{item.label}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
                <button onClick={downloadResume}>
                  <span>Download resume</span>
                  <Download size={16} />
                </button>
                <button onClick={toggleTheme}>
                  <span>Toggle theme</span>
                  {theme === 'light' ? <MoonStar size={16} /> : <SunMedium size={16} />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCertification ? (
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="cert-modal glass-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
            >
              <div className="command-head">
                <div>
                  <span>Certification Preview</span>
                  <strong>{selectedCertification.title}</strong>
                </div>
                <button className="icon-button" onClick={() => setSelectedCertification(null)} aria-label="Close certification preview">
                  <X size={16} />
                </button>
              </div>

              <p>{selectedCertification.summary}</p>
              <div className="preview-panel">
                <FileText size={20} />
                <div>
                  <strong>{selectedCertification.issuer}</strong>
                  <span>Preview file: {selectedCertification.fileName}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="secondary-button"
                  onClick={() => {
                    const blob = new Blob([`${selectedCertification.title}\n${selectedCertification.summary}`], {
                      type: 'text/plain;charset=utf-8',
                    })
                    const url = URL.createObjectURL(blob)
                    const anchor = document.createElement('a')
                    anchor.href = url
                    anchor.download = selectedCertification.fileName.replace('.pdf', '.txt')
                    anchor.click()
                    URL.revokeObjectURL(url)
                    setMessage('Certification preview downloaded.', 'success')
                  }}
                >
                  <Download size={16} /> Download
                </button>
                <button className="ghost-button" onClick={() => setSelectedCertification(null)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div className={`toast ${toast.tone}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }}>
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="cursor-spotlight" style={{ left: `${mousePosition.x}%`, top: `${mousePosition.y}%` }} aria-hidden="true" />
    </div>
  )
}

function SectionShell({
  id,
  label,
  title,
  description,
  icon,
  children,
}: {
  id: string
  label: string
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <motion.section
      id={id}
      className="section-shell"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-heading">
        <div>
          <span className="section-label">
            {icon}
            {label}
          </span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </motion.section>
  )
}

function CountUp({ value }: { value: number }) {
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value)
      return undefined
    }

    let frame = 0
    const start = performance.now()
    const duration = 1200

    const update = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      setDisplayValue(Math.round(value * progress))

      if (progress < 1) {
        frame = window.requestAnimationFrame(update)
      }
    }

    frame = window.requestAnimationFrame(update)
    return () => window.cancelAnimationFrame(frame)
  }, [prefersReducedMotion, value])

  return <>{displayValue}</>
}

function StatBlock({ label, value, fallback, href }: { label: string; value?: number; fallback: string; href?: string }) {
  const content = (
    <>
      <span>{label}</span>
      <strong>{typeof value === 'number' ? <CountUp value={value} /> : fallback}</strong>
    </>
  )

  if (href) {
    return (
      <a className="stat-block" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return <div className="stat-block">{content}</div>
}

export default App
