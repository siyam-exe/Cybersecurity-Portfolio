import { JsonLd } from "@/components/json-ld"
import { ProjectShowcase } from "@/components/project-showcase"
import { projects } from "@/lib/content"
import { createPageMetadata } from "@/lib/site"
import { projectsSchema } from "@/lib/structured-data"

export const metadata = createPageMetadata({
  title: "Cybersecurity Projects | Alif Abedin Siyam",
  description:
    "Explore Alif Abedin Siyam's documented cybersecurity homelab, including Wazuh SIEM architecture, detection engineering, SOC investigation, and secure operations.",
  path: "/projects",
  keywords: ["cybersecurity homelab", "Wazuh SIEM", "SOC investigation", "detection engineering"],
})

export default function ProjectsPage() {
  return (
    <div className="page-enter container mx-auto px-4 py-20">
      <JsonLd data={projectsSchema(projects)} />
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 neon-glow">
          <span className="text-secondary">{">"}</span> Projects
        </h1>
        <p className="text-muted-foreground mb-12">Documented security work with architecture, detection evidence, sanitized configurations, and reproducible technical decisions.</p>

        <ProjectShowcase projects={projects} />
      </div>
    </div>
  )
}
