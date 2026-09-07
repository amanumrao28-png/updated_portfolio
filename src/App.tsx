import emailjs from '@emailjs/browser'
import profilePhoto from './assets/profile.jpeg'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Command,
  Download,
  FileText,
  FolderGit2,
  Globe,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Network,
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
import {  type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

import {
  achievements,
  avatarFallback,
  contactLinks,
  educationTimeline,
  githubUsername,
  heroStats,
  introHighlights,
  navItems,
  profiles,
  projects,
  quickFacts,
  resume,
  skillGroups,
  techUniverse,
} from './data/portfolio'
import './App.css'

type ThemeMode = 'light' | 'dark'
type ToastTone = 'success' | 'info' | 'error'

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark'

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
  'AI/ML Developer',
  'Full Stack MERN Developer',
  'AI Application Builder',
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

const iconMap = {
  code: Code2,
  trophy: Trophy,
  network: Network,
  layers: Layers3,
  github: FolderGit2,
  shield: ShieldCheck,
} as const

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

const techGraphEdges = techUniverse.flatMap((node, sourceIndex) =>
  node.links
    .filter((link) => {
      const targetIndex = techUniverse.findIndex((entry) => entry.name === link)
      return sourceIndex < targetIndex
    })
    .map((link) => {
      const target = techUniverse.find((entry) => entry.name === link)
      if (!target) return null
      return {
        key: `${node.name}-${target.name}`,
        source: node.name,
        target: target.name,
        sourceLinks: node.links,
        targetLinks: target.links,
        style: lineForLink(node.x, node.y, target.x, target.y),
      }
    })
    .filter((edge): edge is NonNullable<typeof edge> => edge !== null),
)

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem('aman-theme')
      if (isThemeMode(raw)) return raw
    }
    return 'dark'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null)
  const [booted, setBooted] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [githubSnapshot, setGithubSnapshot] = useState<GitHubSnapshot | null>(null)
  const [githubUnavailable, setGithubUnavailable] = useState(false)
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const resumeIframeRef = useRef<HTMLIFrameElement | null>(null)
  const typingTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const rawStoredTheme = window.localStorage.getItem('aman-theme')
    const storedTheme = isThemeMode(rawStoredTheme) ? rawStoredTheme : null
    const preferredTheme: ThemeMode = storedTheme ?? 'dark'
    setTheme(preferredTheme)
    document.documentElement.dataset.theme = preferredTheme
    document.body.dataset.theme = preferredTheme
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

  const commandPaletteRef = useRef<HTMLDivElement | null>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (commandOpen) {
      lastActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      const firstButton = commandPaletteRef.current?.querySelector('button')
      firstButton?.focus()
    } else if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus()
    }
  }, [commandOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setCommandOpen(false)
        setMenuOpen(false)
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
      if (spotlightRef.current) {
        const x = (event.clientX / window.innerWidth) * 100
        const y = (event.clientY / window.innerHeight) * 100
        spotlightRef.current.style.left = `${x}%`
        spotlightRef.current.style.top = `${y}%`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

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
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
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
          signal: controller.signal,
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

        if (!controller.signal.aborted) {
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
        }
      } catch {
        if (!controller.signal.aborted) {
          setGithubSnapshot(verifiedFallback)
          setGithubUnavailable(true)
        }
      }
    }

    loadGitHub()

    return () => {
      controller.abort()
    }
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

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === selectedCategory),
    [selectedCategory],
  )

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
    const link = document.createElement('a')

    link.href = resume
    link.download = 'Aman_Umrao_Resume.pdf'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setMessage('Resume downloaded successfully.', 'success')
  }

  const printResume = () => {
    try {
      if (resumeIframeRef.current?.contentWindow) {
        resumeIframeRef.current.contentWindow.focus()
        resumeIframeRef.current.contentWindow.print()
        return
      }
    } catch {
      // Fall back to window.open if iframe printing is restricted
    }

    const printWindow = window.open(resume, '_blank')

    if (!printWindow) {
      setMessage('Please allow pop-ups to print the resume.', 'error')
      return
    }

    printWindow.onload = () => {
      printWindow.print()
    }
  }

  const handleFormSubmit = async (event: any) => {
  event.preventDefault()

  const form = event.currentTarget

  try {
    await emailjs.sendForm(
      'service_7af7gxk',
      'template_cojyapi',
      form,
      {
        publicKey: 'iYGyT_jOQcDwJEeC9',
      }
    )

    form.reset()
    setMessage(
      'Message sent successfully! I will get back to you soon.',
      'success'
    )
  } catch (error) {
    console.error('Email sending failed:', error)

     if (error && typeof error === 'object') {
    console.error('Status:', (error as { status?: number }).status)
    console.error('Text:', (error as { text?: string }).text)
  }

    setMessage(
      'Failed to send message. Please try again.',
      'error'
    )
  }
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
          <button className="icon-button desktop-only" onClick={() => setCommandOpen(true)} aria-label="Open command palette" aria-haspopup="dialog" aria-expanded={commandOpen}>
            <Command size={18} />
          </button>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen((current) => !current)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main>
        <motion.section
          id="home"
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
              AI/ML & Full-Stack Developer and Problem Solver focused on building intelligent applications using Machine Learning, RAG, LLMs, and modern full-stack technologies.
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
                <strong>
                  AI/ML & Full-Stack
                  Development
                </strong>
              </div>

              <div className="mini-stat">
                <span>Tech Stack</span>
                <strong>
                  React • Node.js • Express
                  <br />
                  MongoDB • Python
                </strong>
              </div>

              <div className="mini-stat">
                <span>Work Style</span>
                <strong>
                  Problem Solving,
                  <br />
                  Analytical Thinking,
                  <br />
                  Continuous Improvement
                </strong>
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
                <div className="profile-photo-wrapper">
                  <img
                    src={profilePhoto}
                    alt="Aman Umrao"
                    className="profile-photo"
                  />
                </div>
                <div>
                  <strong>Building Intelligent AI Applications</strong>
                  <p>
                    AI/ML & Full-Stack Developer building practical applications with Machine Learning, RAG, LLMs, and modern web technologies.
                  </p>
                </div>
              </div>

              <div className="dashboard-grid">
                {heroStats.map((metric, index) => (
                  <motion.article
                    key={metric.label}
                    className={`dashboard-card ${index === 0 ? 'tall' : ''}`}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.1 * index, duration: prefersReducedMotion ? 0 : 0.45 }}
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
                  animate={prefersReducedMotion ? { y: 0 } : { y: [0, -6, 0] }}
                  transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                >
                  <Radar size={16} />
                  <span>Open for Internship</span>
                </motion.div>
                <motion.div
                  className="note-card note-right"
                  animate={prefersReducedMotion ? { y: 0 } : { y: [0, -6, 0] }}
                  transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.8 }}
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
                whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
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
                  I focus on writing clean, maintainable code and building reusable
                  components. I approach problems systematically, prioritize usability,
                  and continuously improve my solutions through feedback and iteration.
                </p>
              </details>
              <details className="mission-accordion">
                <summary>
                  <span>What I&apos;m learning next</span>
                  <ChevronRight size={18} />
                </summary>
                <p>
                  Deepening my knowledge of Machine Learning, RAG and LLM applications,
                  while improving full-stack architecture, AWS deployment and Docker
                  workflows.
                </p>
              </details>
              <details className="mission-accordion">
                <summary>
                  <span>Why this portfolio looks different</span>
                  <ChevronRight size={18} />
                </summary>
                <p>
                  I designed this portfolio to showcase more than just technologies.
                  It highlights my projects, problem-solving journey, technical skills
                  and practical work in a way that is easy for recruiters to explore.
                </p>
              </details>
            </div>
          </div>

          <div className="timeline-panel glass-card">
            <div className="section-subhead">
              <span>Education Journey</span>
              <strong>Academic Background</strong>
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
                  whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }}
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
              <h3 className="universe-title">Technology Stack</h3>

              <div className="tech-universe" onMouseLeave={() => setActiveTech(null)}>
                {techGraphEdges.map((edge) => {
                  const highlighted = Boolean(
                    activeTech &&
                    (activeTech === edge.source ||
                      activeTech === edge.target ||
                      edge.sourceLinks.some((link) => link === activeTech) ||
                      edge.targetLinks.some((link) => link === activeTech)),
                  )

                  return (
                    <div
                      key={edge.key}
                      className={`tech-line ${highlighted ? 'active' : ''}`}
                      style={edge.style}
                      aria-hidden="true"
                    />
                  )
                })}

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
                  <span>
                    AI +<br />Full-Stack
                  </span>
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
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
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

        <SectionShell id="achievements" label="Achievement Vault" title="Achievements" description="Milestones that reflect my problem-solving, technical growth and hands-on experience." icon={<Trophy size={16} />}>
          <div className="achievement-grid">
            {achievements.map((item) => {
              const Icon = iconMap[item.iconKey]
              return (
                <motion.article
                  key={item.label}
                  className="glass-card achievement-card"
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
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

        <SectionShell
          id="experience"
          label="Professional Experience"
          title="Experience"
          description="Hands-on experience in technical coordination, AWS workshops and collaborative learning."
          icon={<BriefcaseBusiness size={16} />}
        >
          <motion.div
            className="experience-card glass-card"
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="experience-timeline">
              <div className="timeline-marker experience-marker" />

              <div>
                <div className="experience-header">
                  <div>
                    <h3>Tech Coordinator</h3>
                    <p>AWS Builder Group · ABES Engineering College</p>
                  </div>

                  <span className="experience-date">
                    Sep 2026 - Present
                  </span>
                </div>

                <p>
                  Coordinating technical workshops and hands-on AWS sessions for
                  students while collaborating with the core team to organize
                  technical events and promote peer learning.
                </p>

                <div className="chip-row wrap">
                  <span className="skill-chip">AWS</span>
                  <span className="skill-chip">Technical Workshops</span>
                  <span className="skill-chip">Event Coordination</span>
                  <span className="skill-chip">Peer Learning</span>
                </div>
              </div>
            </div>
          </motion.div>
        </SectionShell>

        <SectionShell
          id="resume"
          label="My Resume"
          title="Resume"
          description="Explore my technical profile, projects, skills and career highlights."
          icon={<FileText size={16} />}
        >
          <div className="resume-grid">
            <div className="resume-preview glass-card">
              <div className="resume-header">
                <div>
                  <span>Aman Umrao — Resume</span>
                  <h3>Aman Umrao</h3>
                </div>

                <span className="resume-badge">Internship Ready</span>
              </div>

              <div className="resume-stamp">
                <iframe
                  ref={resumeIframeRef}
                  src={`${resume}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Aman Umrao Resume"
                  className="resume-pdf"
                />
              </div>

              <div className="resume-list">
                <div>
                  <span>Focus</span>
                  <strong>AI/ML, Full-Stack Development & Problem Solving</strong>
                </div>

                <div>
                  <span>Core Stack</span>
                  <strong>React, Node.js, Express.js, MongoDB, Python & AWS</strong>
                </div>

                <div>
                  <span>Career Goal</span>
                  <strong>Software Development / AI-ML Internship</strong>
                </div>
              </div>

              <div className="resume-actions">
                <button className="primary-button" onClick={downloadResume}>
                  <Download size={16} /> Download Resume
                </button>

                <button className="secondary-button" onClick={printResume}>
                  <Printer size={16} /> Print Resume
                </button>
              </div>
            </div>

            <div className="resume-aside glass-card">
              <h3>Resume Highlights</h3>

              <ul className="resume-highlights">
                <li>
                  <BadgeCheck size={16} />
                  900+ coding problems solved across competitive programming platforms
                </li>

                <li>
                  <BadgeCheck size={16} />
                  Hands-on experience in AI/ML and full-stack development
                </li>

                <li>
                  <BadgeCheck size={16} />
                  Backend development using Node.js, Express.js, MongoDB and REST APIs
                </li>

                <li>
                  <BadgeCheck size={16} />
                  Experience with AWS, Docker and modern developer tools
                </li>

                <li>
                  <BadgeCheck size={16} />
                  Tech Coordinator at AWS Builder Group
                </li>
              </ul>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="intel" label="Developer Intelligence" title="GitHub Activity" description="A live snapshot of my development activity, repositories and open-source work." icon={<Activity size={16} />}>
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
                          transition={{ duration: prefersReducedMotion ? 0 : 0.65 }}
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
                <span>Contribution Activity</span>
                <strong>
                  View GitHub contributions
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
                  <span>Featured Repositories</span>
                  <strong>My most relevant projects on GitHub</strong>
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
              <motion.a
                key={profile.name}
                className="glass-card profile-card"
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.015 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.a>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="contact" label="Communication Channel" title="Get In Touch" description="Have an opportunity, project idea, or just want to connect? Feel free to reach out." icon={<Mail size={16} />}>
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
                  <MapPin size={16} /> {contactLinks.location}
                </span>
              </div>
              <div className="contact-note">
                <Globe size={16} /> Contact details are kept concise here for privacy; email and social channels are live.
              </div>
            </div>

            <form  id="contact-form" className="glass-card contact-form" onSubmit={handleFormSubmit}>
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
                <input id="subject" name="title" type="text" placeholder=" " required />
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
          <p>AI/ML • Full-Stack Development • Problem Solving</p>
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
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setCommandOpen(false)
              }
            }}
          >
            <motion.div
              ref={commandPaletteRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="command-palette-title"
              className="command-palette glass-card"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
            >
              <div className="command-head">
                <div>
                  <span id="command-palette-title">Command Palette</span>
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
        {toast ? (
          <motion.div
            role="status"
            aria-live="polite"
            className={`toast ${toast.tone}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {toast.tone === 'success' ? (
              <CheckCircle2 size={18} style={{ color: '#22c55e', flexShrink: 0 }} />
            ) : toast.tone === 'error' ? (
              <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
            ) : (
              <Sparkles size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            )}
            <span>{toast.message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div ref={spotlightRef} className="cursor-spotlight" style={{ left: '50%', top: '30%' }} aria-hidden="true" />
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
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className="section-shell"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
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
