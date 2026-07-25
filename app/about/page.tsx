import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Clapperboard,
  CookingPot,
  Crosshair,
  FileSearch,
  Gamepad2,
  Network,
  Radar,
  ScanSearch,
  ShieldCheck,
} from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { TerminalBox } from "@/components/terminal-box"
import { createPageMetadata } from "@/lib/site"
import { aboutSchema } from "@/lib/structured-data"

export const metadata = createPageMetadata({
  title: "About Alif Abedin Siyam | Cybersecurity Profile",
  description:
    "Experience, education, certifications, security capabilities, tools, and interests of SOC analyst and security researcher Alif Abedin Siyam.",
  path: "/about",
  keywords: ["Alif Abedin Siyam", "SOC analyst", "security researcher", "cybersecurity experience"],
})

const experience = {
  role: "SOC Analyst Trainee (Tier 1)",
  organization: "APU SOC Lab",
  period: "Dec 2025 — Mar 2026",
  points: [
    "Triaged more than 100 security alerts per week using MSSGuard SIEM.",
    "Investigated events, escalated confirmed incidents, and produced clear case documentation.",
    "Correlated threat intelligence with SIEM activity to identify indicators of compromise and attacker behavior.",
    "Managed investigations through a structured incident lifecycle and case-management workflow.",
  ],
}

const capabilities = [
  { title: "Security monitoring", detail: "Alert triage, event correlation, and incident escalation", icon: ShieldCheck },
  { title: "Log analysis", detail: "Host, network, web, and SIEM telemetry investigation", icon: FileSearch },
  { title: "Network analysis", detail: "Traffic inspection and suspicious-activity identification", icon: Network },
  { title: "Web security", detail: "Authorized application testing and vulnerability analysis", icon: ScanSearch },
  { title: "Reconnaissance", detail: "Service discovery, enumeration, and attack-surface mapping", icon: Radar },
  { title: "Digital forensics", detail: "Artifact review, timeline analysis, and evidence handling", icon: Crosshair },
]

const toolGroups = [
  {
    title: "SOC & network",
    description: "Monitoring, telemetry, and investigation",
    tools: [
      { name: "Wazuh", label: "SIEM & XDR", logo: "/images/tools/wazuh.svg" },
      { name: "Suricata", label: "Network IDS", logo: "/images/tools/suricata.png" },
      { name: "Wireshark", label: "Traffic analysis", logo: "/images/tools/wireshark.png" },
    ],
  },
  {
    title: "Offensive security",
    description: "Reconnaissance and authorized testing",
    tools: [
      { name: "Nmap", label: "Network mapping", logo: "/images/tools/nmap.png" },
      { name: "Burp Suite", label: "Web security testing", logo: "/images/tools/burp-suite.svg" },
      { name: "Metasploit", label: "Exploit validation", logo: "/images/tools/metasploit.svg" },
      { name: "Kali Linux", label: "Security platform", logo: "/images/tools/kali-linux.svg" },
    ],
  },
  {
    title: "Forensics & reversing",
    description: "Artifact analysis and binary inspection",
    tools: [
      { name: "Autopsy", label: "Digital forensics", logo: "/images/tools/autopsy.png" },
      { name: "Ghidra", label: "Reverse engineering", logo: "/images/tools/ghidra.png" },
    ],
  },
]

const languages = [
  { name: "Python", logo: "/images/tools/python.svg", detail: "Automation and security scripting" },
  { name: "Bash", logo: "/images/tools/bash.svg", detail: "Linux workflows and task automation" },
  { name: "SQL", logo: "/images/tools/sql.svg", detail: "Querying and data analysis" },
  { name: "Java", logo: "/images/tools/java.svg", detail: "Object-oriented programming" },
]

const certifications = [
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    detail: "Nine-course professional certificate",
    status: "Earned",
    year: "2025",
  },
  {
    name: "Red Hat System Administration I (RH124)",
    issuer: "Red Hat Academy",
    detail: "Certificate of attendance · 40 hours",
    status: "Completed",
    year: "2025",
  },
  {
    name: "Red Hat System Administration II (RH134)",
    issuer: "Red Hat Academy",
    detail: "Certificate of attendance · 40 hours",
    status: "Completed",
    year: "2025",
  },
  {
    name: "Microsoft Security Operations Analyst (SC-200)",
    issuer: "Microsoft",
    detail: "Planned certification goal",
    status: "Planned",
    year: "2026",
  },
]

const interests = [
  { name: "Gaming", icon: Gamepad2 },
  { name: "Movies & documentaries", icon: Clapperboard },
  { name: "Books", icon: BookOpen },
  { name: "Cooking", icon: CookingPot },
]

function SectionHeading({ index, title, intro }: { index: string; title: string; intro?: string }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-secondary">{index} · profile</p>
      <h2 className="text-3xl font-bold text-primary md:text-4xl">
        <span className="text-secondary">{">"}</span> {title}
      </h2>
      {intro && <p className="mt-3 leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="page-enter container mx-auto overflow-hidden px-4 py-16 md:py-20">
      <JsonLd data={aboutSchema()} />
      <section className="relative mb-24">
        <div className="about-shape about-shape-one" aria-hidden="true" />
        <div className="about-shape about-shape-two" aria-hidden="true" />

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-secondary">Identity // Background</p>
          <h1 className="text-4xl font-bold text-primary neon-glow md:text-6xl">
            <span className="text-secondary">{">"}</span> About
          </h1>
        </div>

        <TerminalBox title="profile.sys" className="about-profile-card overflow-hidden p-0">
          <div className="grid lg:grid-cols-[19rem_1fr]">
            <div className="relative flex min-h-80 items-center justify-center border-b border-primary/20 p-8 lg:border-b-0 lg:border-r">
              <div className="about-avatar-orbit" aria-hidden="true" />
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-primary bg-muted shadow-[0_0_35px_rgba(0,221,136,0.18)]">
                <Image
                  src="/images/design-mode/cybersecurity-hacker-avatar.jpg"
                  alt="Hacker-style avatar used by Alif Abedin Siyam"
                  width={192}
                  height={192}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <p className="mb-2 text-sm text-secondary">alif@portfolio:~$ whoami</p>
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">Alif Abedin Siyam</h2>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-primary md:text-lg">
                SOC Analyst <span className="text-muted-foreground">|</span> Security Researcher{" "}
                <span className="text-muted-foreground">|</span> Aspiring Penetration Tester
              </p>
              <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
                I am a cybersecurity student with hands-on SOC experience investigating alerts, documenting incidents,
                and connecting technical findings to clear next steps. I am developing deeper skills in security research,
                web application security, penetration testing, and bug bounty methodology.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/docs/Alif%20Abedin%20Siyam%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-neon-primary interactive-scale inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  View CV <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact"
                  className="interactive-scale inline-flex items-center gap-2 rounded-md border border-primary/50 px-5 py-3 font-bold text-foreground transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Contact <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </TerminalBox>
      </section>

      <section className="section-enter mb-24" style={{ animationDelay: "120ms" }}>
        <SectionHeading
          index="01"
          title="Experience"
          intro="Professional cybersecurity experience focused on alert handling, investigation, escalation, and reliable documentation."
        />
        <TerminalBox title="experience.log" className="about-hover-card overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
            <div>
              <span className="inline-flex rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Security operations
              </span>
              <h3 className="mt-5 text-2xl font-bold text-foreground">{experience.role}</h3>
              <p className="mt-2 text-secondary">{experience.organization}</p>
              <p className="mt-1 text-sm text-muted-foreground">{experience.period}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {experience.points.map((point, index) => (
                <li key={point} className="rounded-lg border border-primary/15 bg-black/20 p-4 leading-6 text-muted-foreground transition-colors hover:border-primary/45 hover:text-foreground">
                  <span className="mb-3 block text-xs font-bold text-secondary">0{index + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </TerminalBox>
      </section>

      <section className="section-enter mb-24" style={{ animationDelay: "180ms" }}>
        <SectionHeading
          index="02"
          title="Capabilities"
          intro="A focused view of the work I can discuss, demonstrate, and continue developing."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <article
              key={capability.title}
              className="about-hover-card group relative overflow-hidden rounded-xl border border-primary/25 bg-card/70 p-6 backdrop-blur"
              style={{ animationDelay: `${220 + index * 50}ms` }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-transform group-hover:-rotate-3 group-hover:scale-110">
                <capability.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary">{capability.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{capability.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-enter mb-24" style={{ animationDelay: "240ms" }}>
        <SectionHeading
          index="03"
          title="Tools & Programming Languages"
          intro="Security platforms and tools selected for the SOC, penetration-testing, and security-research work I am pursuing—organized by purpose instead of presented as a software inventory."
        />
        <div className="space-y-6">
          <TerminalBox title="security_tools.conf">
            <div className="space-y-7">
              {toolGroups.map((group) => (
                <div key={group.title}>
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-primary/15 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{group.title}</h3>
                    <p className="text-xs text-muted-foreground">{group.description}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.tools.map((tool) => (
                      <div key={tool.name} className="about-tool group flex min-h-24 items-center gap-4 rounded-lg border border-primary/15 bg-black/20 p-4">
                        <div className="about-tool-mark flex h-14 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/95 p-2 shadow-[inset_0_0_18px_rgba(0,0,0,0.05)]">
                          <Image
                            src={tool.logo}
                            alt={`${tool.name} logo`}
                            width={72}
                            height={56}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground transition-colors group-hover:text-primary">{tool.name}</h4>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">{tool.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TerminalBox>

          <TerminalBox title="languages.dev">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-secondary/15 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">Programming languages</h3>
              <p className="text-xs text-muted-foreground">Scripting, automation, querying, and software foundations</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {languages.map((language) => (
                <div key={language.name} className="about-tool group flex min-h-28 items-center gap-4 rounded-lg border border-secondary/20 bg-black/20 p-4">
                  <span className="about-tool-mark flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/95 p-2.5 shadow-[inset_0_0_18px_rgba(0,0,0,0.05)]">
                    <Image
                      src={language.logo}
                      alt={`${language.name} logo`}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-secondary">{language.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{language.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </TerminalBox>
        </div>
      </section>

      <section className="section-enter mb-24" style={{ animationDelay: "300ms" }}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading index="04" title="Education" />
            <TerminalBox title="education.log" className="about-hover-card h-[calc(100%-5rem)]">
              <div className="flex h-full flex-col">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-secondary/35 bg-secondary/10">
                  <BookOpen className="h-6 w-6 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold leading-snug text-foreground">
                  BSc (Hons) Computer Science (Cyber Security)
                </h3>
                <p className="mt-3 text-primary">Asia Pacific University (APU)</p>
                <p className="mt-auto pt-8 text-sm text-muted-foreground">July 2024 — Present</p>
              </div>
            </TerminalBox>
          </div>

          <div>
            <SectionHeading index="05" title="Certifications" />
            <TerminalBox title="certifications.log">
              <div className="space-y-3">
                {certifications.map((certification, index) => {
                  const planned = certification.status === "Planned"
                  return (
                    <article key={certification.name} className="about-cert group grid gap-4 rounded-lg border border-primary/15 bg-black/20 p-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-xs font-black text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-bold leading-snug text-foreground group-hover:text-primary">{certification.name}</h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {certification.issuer} · {certification.detail}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${planned ? "border-accent/50 bg-accent/10 text-purple-300" : "border-primary/35 bg-primary/10 text-primary"}`}>
                          {certification.status}
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground">{certification.year}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </TerminalBox>
          </div>
        </div>
      </section>

      <section className="section-enter mb-16" style={{ animationDelay: "360ms" }}>
        <SectionHeading
          index="06"
          title="Beyond the terminal"
          intro="Security is a major part of what I do, but it is not the whole profile."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {interests.map((interest) => (
            <div key={interest.name} className="about-interest group relative overflow-hidden rounded-xl border border-primary/20 bg-card/70 p-5 text-center">
              <interest.icon className="mx-auto h-7 w-7 text-secondary transition-transform group-hover:-translate-y-1 group-hover:rotate-3" aria-hidden="true" />
              <p className="mt-4 text-sm font-bold text-foreground group-hover:text-primary">{interest.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-enter" style={{ animationDelay: "420ms" }}>
        <TerminalBox className="overflow-hidden">
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="absolute -right-8 -top-10 h-32 w-32 rotate-45 border border-primary/10" aria-hidden="true" />
            <div>
              <p className="text-sm text-secondary">alif@portfolio:~$ connect --open</p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">Interested in working together?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                I am open to SOC analyst, junior penetration testing, security engineering, and broader cybersecurity opportunities.
              </p>
            </div>
            <Link href="/contact" className="button-neon-primary interactive-scale inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold text-black">
              Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </TerminalBox>
      </section>
    </div>
  )
}
