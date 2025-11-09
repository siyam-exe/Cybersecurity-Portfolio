export interface Project {
  title: string
  description: string
  tags: string[]
  status: "Public" | "Coming soon" | "In Development"
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: "VulnScan",
    description: "Advanced Python-based port scanner with service detection and vulnerability assessment capabilities.",
    tags: ["Python", "Networking", "Security"],
    status: "Coming soon",
  },
  {
    title: "ForensicAnalyzer",
    description: "Automated metadata extraction tool for digital forensics investigations and OSINT operations.",
    tags: ["Python", "Forensics", "Automation"],
    status: "Coming soon",
  },
  {
    title: "MyCTFPlatform",
    description: "Self-hosted CTF practice environment with Docker-based vulnerable machines and challenges.",
    tags: ["Docker", "Web", "Infrastructure"],
    status: "Coming soon",
  },
]
