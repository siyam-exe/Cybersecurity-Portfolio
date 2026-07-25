import Link from "next/link"
import { TerminalBox } from "@/components/terminal-box"

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-24">
      <TerminalBox title="404.log">
        <p className="text-sm text-secondary">ERROR 404</p>
        <h1 className="mt-2 text-3xl font-bold text-primary">Page not found</h1>
        <p className="mt-4 text-muted-foreground">The requested route does not exist or is no longer available.</p>
        <Link href="/" className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-background hover:bg-primary/90">Return home</Link>
      </TerminalBox>
    </div>
  )
}
