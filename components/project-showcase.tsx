"use client"

import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react"
import {
  Activity,
  AlertTriangle,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Network,
  Server,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react"
import type { Project } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { TerminalBox } from "@/components/terminal-box"
import { ProjectSequenceClue } from "@/components/ctf-evidence"

export function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setSelectedProject(project)
  }

  const closeProject = () => setSelectedProject(null)

  const trapDialogFocus = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    if (!selectedProject) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeProject()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [selectedProject])

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div key={project.slug} className="section-enter" style={{ animationDelay: `${index * 100}ms` }}>
            <TerminalBox className={`group relative h-full overflow-hidden transition-colors ${project.details ? "card-popup hover:border-primary" : "opacity-80"}`}>
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-primary/15 bg-primary/5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-3 top-10 h-14 w-14 rotate-45 border border-secondary/15" aria-hidden="true" />

              {project.details && (
                <button
                  type="button"
                  onClick={(event) => openProject(project, event.currentTarget)}
                  className="absolute inset-0 z-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  aria-label={`Open ${project.title} project report`}
                />
              )}

              <div className="relative flex h-full flex-col space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary" aria-hidden="true">
                      <Server className="h-4 w-4" />
                    </span>
                    <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">{project.title}</h2>
                  </div>
                  <Badge variant="outline" className="relative z-20 text-xs">{project.status}</Badge>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                )}

                {project.details ? (
                  <div className="flex items-center justify-between gap-3 border-t border-primary/20 pt-4">
                    <span className="flex items-center gap-2 text-xs font-medium text-primary" aria-hidden="true">
                      <Activity className="h-4 w-4" /> Click card to open the full report <span>→</span>
                    </span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 inline-flex h-8 items-center gap-2 rounded-md border border-secondary/60 bg-background/80 px-3 text-xs text-secondary transition-colors hover:border-secondary hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" /> GitHub <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="border-t border-primary/15 pt-4 text-xs italic text-muted-foreground">Only completed, tested, and documented work will be added.</p>
                )}
              </div>
            </TerminalBox>
          </div>
        ))}
      </div>

      {selectedProject?.details && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-8" role="presentation">
          <button type="button" className="terminal-overlay-enter absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={closeProject} aria-label="Close project details" />
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onKeyDown={trapDialogFocus}
            className="terminal-dialog-enter terminal-container relative z-10 flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-primary bg-background/95 shadow-[0_0_35px_rgba(0,221,136,0.25)]"
          >
            <header className="flex items-center justify-between border-b border-primary/30 bg-muted/40 px-4 py-3 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="hidden gap-1.5 sm:flex" aria-hidden="true"><span className="h-3 w-3 rounded-full bg-destructive" /><span className="h-3 w-3 rounded-full bg-accent" /><span className="h-3 w-3 rounded-full bg-primary" /></div>
                <span className="truncate text-sm font-bold text-primary">projects/{selectedProject.slug}.md</span>
              </div>
              <button ref={closeButtonRef} type="button" onClick={closeProject} className="rounded-md border border-primary/30 p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close project details"><X className="h-5 w-5" aria-hidden="true" /></button>
            </header>

            <div className="overflow-y-auto px-4 py-6 md:px-8 md:py-8">
              <div className="mx-auto max-w-5xl space-y-12">
                <section className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 md:p-8">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-primary/20" aria-hidden="true" />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rotate-45 border border-secondary/20" aria-hidden="true" />
                  <div className="relative">
                    <p className="mb-2 text-xs tracking-widest text-secondary">FEATURED PROJECT // PRIVATE SOC LAB</p>
                    <h2 id="project-dialog-title" className="text-3xl font-bold text-primary neon-glow md:text-5xl">{selectedProject.title}</h2>
                    <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground md:text-base">{selectedProject.details.overview}</p>
                    <div className="mt-6 flex flex-wrap gap-2">{selectedProject.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">Grafana/Loki/Alloy → Wazuh</span>
                      <span className="rounded-full border border-secondary/30 bg-secondary/5 px-3 py-1.5">Private and on-demand</span>
                      <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">Evidence-led investigation</span>
                    </div>
                  </div>
                </section>

                <ProjectSection title="Workflow" icon={Network}>
                  <div className="grid gap-3 md:grid-cols-5">
                    {selectedProject.details.workflow.map((step, index) => (
                      <div key={step} className="relative flex min-h-28 flex-col items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-b from-primary/10 to-muted/20 p-4 text-center text-sm text-foreground transition-colors hover:border-primary">
                        <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-secondary/50 text-[11px] text-secondary">{index + 1}</span>
                        {step}
                        {index < selectedProject.details!.workflow.length - 1 && <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background px-1 text-primary md:block" aria-hidden="true">→</span>}
                      </div>
                    ))}
                  </div>
                </ProjectSection>

                <ProjectSection title="Environment" icon={Server}>
                  <dl className="overflow-hidden rounded-xl border border-primary/25 bg-muted/20">
                    {selectedProject.details.environment.map((item, index) => (
                      <div key={item.layer} className={`grid gap-2 p-4 transition-colors hover:bg-primary/5 md:grid-cols-[15rem_1fr] md:gap-6 ${index ? "border-t border-primary/15" : ""}`}>
                        <dt className="font-medium text-primary">{item.layer}</dt>
                        <dd className="text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </ProjectSection>

                <ProjectSection title="What I Built" icon={Code2}>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedProject.details.implementations.map((item, index) => (
                      <div key={item.title} className="group/feature relative overflow-hidden rounded-xl border border-primary/25 bg-muted/20 p-5 transition-colors hover:border-primary/70">
                        <span className="absolute right-4 top-3 text-4xl font-bold text-primary/[0.06]" aria-hidden="true">0{index + 1}</span>
                        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary" aria-hidden="true">
                          {[Database, Server, Activity, FileText].map((Icon, iconIndex) => iconIndex === index ? <Icon key={Icon.displayName ?? iconIndex} className="h-4 w-4" /> : null)}
                        </div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </ProjectSection>

                <ProjectSection title="Detection Coverage" icon={ShieldCheck}>
                  <div className="flex flex-wrap gap-2">{selectedProject.details.detections.map((item) => <span key={item} className="rounded-full border border-secondary/30 bg-secondary/5 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-secondary hover:text-foreground">{item}</span>)}</div>
                </ProjectSection>

                <ProjectSection title="Dashboard Evidence" icon={Activity}>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedProject.details.dashboards.map((dashboard, index) => (
                      <div key={dashboard.title} className="relative overflow-hidden rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 to-secondary/5 p-5">
                        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-secondary/20" aria-hidden="true" />
                        <span className="text-xs text-secondary">DASHBOARD 0{index + 1}</span>
                        <h4 className="mt-2 font-bold text-foreground">{dashboard.title}</h4>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{dashboard.purpose}</p>
                      </div>
                    ))}
                  </div>
                </ProjectSection>

                <ProjectSection title="Architecture Notes" icon={ShieldCheck}>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {selectedProject.details.security.map((item) => <li key={item} className="flex gap-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-4 text-sm leading-6 text-muted-foreground"><span className="mt-1 text-primary" aria-hidden="true">◆</span>{item}</li>)}
                  </ul>
                </ProjectSection>

                <ProjectSection title="Limitations & Lessons Learned" icon={AlertTriangle}>
                  <div className="overflow-hidden rounded-xl border border-amber-400/35 bg-amber-400/[0.04]">
                    <div className="flex items-center gap-3 border-b border-amber-400/20 px-5 py-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-300" aria-hidden="true"><AlertTriangle className="h-4 w-4" /></span>
                      <div><p className="text-xs text-amber-300">MIGRATION INCIDENT</p><h4 className="font-bold text-foreground">{selectedProject.details.incident.title}</h4></div>
                    </div>
                    <div className="grid gap-px bg-amber-400/15 lg:grid-cols-3">
                      {[{ label: "Problem", text: selectedProject.details.incident.problem }, { label: "Resolution", text: selectedProject.details.incident.resolution }, { label: "Verification", text: selectedProject.details.incident.verification }].map((item) => (
                        <div key={item.label} className="bg-background/95 p-5"><p className="mb-2 text-xs font-bold tracking-wider text-amber-300">{item.label.toUpperCase()}</p><p className="text-sm leading-6 text-muted-foreground">{item.text}</p></div>
                      ))}
                    </div>
                  </div>
                  <ol className="mt-5 grid gap-4 md:grid-cols-2">
                    {selectedProject.details.lessons.map((lesson, index) => <li key={lesson} className="rounded-xl border border-primary/20 bg-muted/20 p-4 text-sm leading-6 text-muted-foreground"><span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 text-xs text-primary">{index + 1}</span>{lesson}</li>)}
                  </ol>
                </ProjectSection>

                <ProjectSection title="Repository Evidence" icon={Github}>
                  <div className="grid gap-3 md:grid-cols-2">{selectedProject.details.repository.map((item) => <div key={item} className="flex gap-3 rounded-lg border border-secondary/20 p-4 text-sm leading-6 text-muted-foreground"><span className="text-secondary" aria-hidden="true">→</span>{item}</div>)}</div>
                  <ProjectSequenceClue />
                </ProjectSection>

                {selectedProject.github && (
                  <div className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 p-6 text-center">
                    <p className="mb-5 text-sm text-muted-foreground">Explore the complete documentation, diagrams, sanitized configurations, dashboards, and test evidence.</p>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-bold text-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"><Github className="h-5 w-5" aria-hidden="true" />View repository on GitHub<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  )
}

function ProjectSection({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary" aria-hidden="true"><Icon className="h-4 w-4" /></span>
        <h3 className="text-xl font-bold text-primary md:text-2xl"><span className="mr-2 text-secondary" aria-hidden="true">{">"}</span>{title}</h3>
        <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" aria-hidden="true" />
      </div>
      {children}
    </section>
  )
}
