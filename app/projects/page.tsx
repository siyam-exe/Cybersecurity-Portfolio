"use client"

import { motion } from "framer-motion"
import { TerminalBox } from "@/components/terminal-box"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code2 } from "lucide-react"

const projects = [
  {
    title: "VulnScan",
    description: "Advanced Python-based port scanner with service detection and vulnerability assessment capabilities.",
    tags: ["Python", "Networking", "Security"],
    status: "Coming soon",
    github: null,
  },
  {
    title: "ForensicAnalyzer",
    description: "Automated metadata extraction tool for digital forensics investigations and OSINT operations.",
    tags: ["Python", "Forensics", "Automation"],
    status: "Coming soon",
    github: null,
  },
  {
    title: "MyCTFPlatform",
    description: "Self-hosted CTF practice environment with Docker-based vulnerable machines and challenges.",
    tags: ["Docker", "Web", "Infrastructure"],
    status: "Coming soon",
    github: null,
  },
  {
    title: "CryptoBreaker",
    description: "Collection of cryptographic attack implementations for educational purposes and CTF challenges.",
    tags: ["Python", "Cryptography", "CTF"],
    status: "Coming soon",
    github: null,
  },
]

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-20"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 neon-glow">
          <span className="text-secondary">{">"}</span> Projects
        </h1>
        <p className="text-muted-foreground mb-12">
          Security tools and projects I'm building to automate tasks and enhance my pentesting workflow.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalBox className="h-full hover:border-primary transition-all group card-popup">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.github ? (
                      <>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent" disabled>
                          <Github className="h-4 w-4" />
                          View Code
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent" disabled>
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Button>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">Repository will be public soon</p>
                    )}
                  </div>
                </div>
              </TerminalBox>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
