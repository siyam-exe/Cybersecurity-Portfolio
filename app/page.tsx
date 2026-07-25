import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  ExternalLink,
  FileText,
  FlaskConical,
  Github,
  Linkedin,
  Mail,
  Search,
  ShieldCheck,
} from "lucide-react"
import { CenteredIntro } from "@/components/centered-intro"
import { JsonLd } from "@/components/json-ld"
import { projects } from "@/lib/content"
import { createPageMetadata, siteLinks } from "@/lib/site"
import { homeSchema } from "@/lib/structured-data"
import { writeups } from "@/lib/writeups"

export const metadata = createPageMetadata({
  title: "Alif Abedin Siyam | SOC Analyst & Security Researcher",
  description:
    "Cybersecurity portfolio of Alif Abedin Siyam, featuring SOC experience, a documented Wazuh homelab, and technical security writeups.",
  path: "/",
  keywords: ["Alif Abedin Siyam", "SOC analyst", "security researcher", "cybersecurity portfolio"],
})

const featuredWriteupSlugs = [
  "cache-me-outside",
  "introduction-to-cryptohack",
  "linux-privilege-escalation",
  "n0s4n1ty-1",
] as const

const featuredWriteups = featuredWriteupSlugs.map((slug) => {
  const writeup = writeups.find((item) => item.slug === slug)
  if (!writeup) throw new Error(`Missing featured writeup: ${slug}`)
  return writeup
})

function getHomelab() {
  const project = projects.find((item) => item.slug === "cybersecurity-homelab")
  if (!project) throw new Error("Missing Cybersecurity Homelab project")
  return project
}

const homelab = getHomelab()

const socialLinks = [
  { icon: Github, href: siteLinks.github, label: "GitHub", external: true },
  { icon: Linkedin, href: siteLinks.linkedin, label: "LinkedIn", external: true },
  { icon: BookOpen, href: siteLinks.medium, label: "Medium", external: true },
  { icon: Mail, href: siteLinks.email, label: "Email", external: false },
]

const researchLoop = [
  { icon: Eye, step: "01", title: "Observe", description: "Notice the details hiding in plain sight." },
  { icon: Search, step: "02", title: "Question", description: "Challenge the first and easiest explanation." },
  { icon: FlaskConical, step: "03", title: "Test", description: "Turn assumptions into controlled evidence." },
  { icon: FileText, step: "04", title: "Explain", description: "Make the result clear and useful to others." },
]

export default function HomePage() {
  return (
    <div className="home-page">
      <JsonLd data={homeSchema()} />
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-grid" aria-hidden="true" />

        <div className="home-hero-content relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-10 pt-12 text-center md:pb-14 md:pt-16">
          <CenteredIntro headingId="home-title" />

          <div className="section-enter mt-7 w-full max-w-5xl" style={{ animationDelay: "700ms" }}>
            <p className="home-role-line mx-auto text-sm leading-7 text-foreground/80 md:text-lg">
              <strong>SOC Analyst</strong> <span>|</span> <strong>Security Researcher</strong> <span>|</span> <strong>Aspiring Penetration Tester</strong>
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
              Your friendly neighbourhood security researcher—curious about how systems work, why they fail, and what the evidence reveals when something goes wrong. I learn by exploring deeply, testing responsibly, documenting honestly, and sharing what I discover along the way.
            </p>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link href="/about" className="home-action home-action-primary">
                About me <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="/docs/Alif Abedin Siyam Resume.pdf" target="_blank" rel="noreferrer" className="home-action home-action-secondary">
                View CV <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/contact" className="home-action home-action-quiet">
                Contact <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 flex justify-center gap-5">
              {socialLinks.map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="social-scale rounded-md p-2 text-foreground/55 transition-colors hover:text-secondary focus-visible:text-secondary"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <a href="#overview" className="home-scroll-cue" aria-label="Scroll to overview">
            <span>Explore</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="overview" className="home-section home-reveal" aria-labelledby="overview-title">
        <div className="home-section-heading">
          <p>01 / Profile</p>
          <h2 id="overview-title"><span>{">"}</span> Overview</h2>
        </div>

        <div className="home-overview-grid">
          <div className="home-overview-story">
            <p className="home-overview-kicker">Curiosity is the job description.</p>
            <h3>I like finding the story hidden inside the noise.</h3>
            <p>
              Cybersecurity makes the most sense to me when defensive thinking and offensive curiosity inform each other. I enjoy following the details, questioning assumptions, and understanding how separate clues become one clear picture.
            </p>
            <p>
              I&apos;m building a career around that mindset: stay curious, test responsibly, communicate clearly, and never pretend the evidence says more than it does.
            </p>
            <Link href="/about" className="home-inline-link">Meet the person behind the terminal <ArrowRight aria-hidden="true" /></Link>

            <div className="home-evidence-strip" aria-label="Portfolio at a glance">
              <div><strong>{writeups.length}</strong><span>Published writeups</span></div>
              <div><strong>100+</strong><span>Alerts triaged weekly</span></div>
              <div><strong>1</strong><span>Documented project</span></div>
            </div>
          </div>

          <div className="home-method-map">
            <div className="home-method-heading">
              <div>
                <span className="home-live-dot" aria-hidden="true" />
                <p>research_loop.sys</p>
              </div>
              <span>Repeatable by design</span>
            </div>
            <div className="home-method-core" aria-hidden="true">
              <span>security</span>
              <strong>mindset</strong>
            </div>
            <div className="home-method-grid">
              {researchLoop.map(({ icon: Icon, step, title, description }) => (
                <div key={title} className="home-method-step">
                  <div><Icon aria-hidden="true" /><span>{step}</span></div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-reveal" aria-labelledby="writeups-title">
        <div className="home-section-heading home-section-heading-row">
          <div>
            <p>02 / Selected research</p>
            <h2 id="writeups-title"><span>{">"}</span> Featured Writeups</h2>
          </div>
          <Link href="/writeups" className="home-inline-link">Browse all 30 <ArrowRight aria-hidden="true" /></Link>
        </div>

        <div className="home-writeup-grid">
          {featuredWriteups.map((writeup, index) => (
            <Link
              key={writeup.slug}
              href={`/writeups/${writeup.slug}`}
              className={`home-writeup-card ${index === 0 ? "home-writeup-feature" : ""}`}
            >
              <div className="home-card-index" aria-hidden="true">0{index + 1}</div>
              <div className="relative z-10">
                <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded border border-secondary/35 bg-secondary/5 px-2 py-1 text-secondary">{writeup.category}</span>
                  <span className="text-muted-foreground">{writeup.platform}</span>
                </div>
                <h3>{writeup.title}</h3>
                <p>{writeup.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {writeup.tags.slice(0, 3).map((tag) => <span key={tag} className="home-tag">{tag}</span>)}
                </div>
              </div>
              <span className="home-card-arrow" aria-hidden="true"><ArrowRight /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-reveal" aria-labelledby="project-title">
        <div className="home-section-heading">
          <p>03 / Featured project</p>
          <h2 id="project-title"><span>{">"}</span> Cybersecurity Homelab</h2>
        </div>

        <div className="home-project-card">
          <div className="home-project-copy">
            <div className="mb-5 flex items-center gap-3">
              <span className="home-live-dot" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.22em] text-primary">Documented project</span>
            </div>
            <p className="text-lg leading-8 text-foreground/85">{homelab.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {homelab.tags.map((tag) => <span key={tag} className="home-tag">{tag}</span>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="home-action home-action-primary">Explore project <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              {homelab.github && (
                <a href={homelab.github} target="_blank" rel="noreferrer" className="home-action home-action-quiet">
                  GitHub <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="home-project-flow" aria-label="Homelab investigation workflow">
            {homelab.details?.workflow.map((step, index) => (
              <div key={step} className="home-flow-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
                {index < (homelab.details?.workflow.length ?? 0) - 1 && <ArrowDown aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-reveal" aria-labelledby="credentials-title">
        <div className="home-section-heading">
          <p>04 / Credentials</p>
          <h2 id="credentials-title"><span>{">"}</span> Certifications</h2>
        </div>

        <div className="home-status-grid home-credential-grid">
          <div className="home-status-card">
            <span className="home-status-icon"><CheckCircle2 aria-hidden="true" /></span>
            <p className="home-status-label">Earned · 2025</p>
            <h3>Google Cybersecurity Professional Certificate</h3>
            <p>Completed professional training across security operations, networks, Linux, SQL, Python, detection, and incident response.</p>
          </div>
          <div className="home-status-card">
            <span className="home-status-icon"><ShieldCheck aria-hidden="true" /></span>
            <p className="home-status-label">Planned · 2026</p>
            <h3>Microsoft Security Operations Analyst (SC-200)</h3>
            <p>My next planned certification goal, aligned with security operations analysis and Microsoft&apos;s security ecosystem.</p>
          </div>
        </div>

        <div className="home-credentials-footer">
          <p>Education, experience, tools, and additional completed training are kept in the full profile.</p>
          <Link href="/about" className="home-inline-link">View full profile <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-section home-reveal pb-24 md:pb-32" aria-labelledby="contact-title">
        <div className="home-cta">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-secondary">05 / Connect</p>
            <h2 id="contact-title">Let&apos;s start a conversation<span className="text-primary">.</span></h2>
            <p>I&apos;m open to SOC Analyst, junior penetration testing, security engineering, and general cybersecurity opportunities.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="home-action home-action-primary">Contact me <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a href="/docs/Alif Abedin Siyam Resume.pdf" download className="home-action home-action-secondary">Download CV <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </div>
  )
}
