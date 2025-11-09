import { TerminalBox } from "@/components/terminal-box"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// This would normally fetch from MDX files
export default function WriteupPage({ params }: { params: { slug: string } }) {
  // Placeholder - in production this would load actual MDX content
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link
        href="/writeups"
        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Writeups
      </Link>

      <TerminalBox title={`${params.slug}.md`}>
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-primary mb-4">Writeup Title</h1>

          <div className="flex gap-2 mb-6">
            <Badge>Platform</Badge>
            <Badge variant="secondary">Difficulty</Badge>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              <span className="text-primary">{">"}</span> This is a placeholder for MDX content. In production, this
              would render the actual writeup with syntax highlighting, images, and interactive elements.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Reconnaissance</h2>
            <p>Writeup content would go here...</p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Exploitation</h2>
            <p>More content...</p>

            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Privilege Escalation</h2>
            <p>Final steps...</p>
          </div>
        </div>
      </TerminalBox>
    </div>
  )
}
