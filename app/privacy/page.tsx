import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { TerminalBox } from "@/components/terminal-box"
import { createPageMetadata, siteLinks } from "@/lib/site"
import { pageSchema } from "@/lib/structured-data"

const privacyDescription =
  "Privacy information for the Alif Abedin Siyam cybersecurity portfolio contact form, including data handling, CAPTCHA, and rate limiting."

export const metadata = createPageMetadata({
  title: "Privacy | Alif Abedin Siyam",
  description: privacyDescription,
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20">
      <JsonLd
        data={pageSchema({
          type: "WebPage",
          name: "Privacy | Alif Abedin Siyam",
          description: privacyDescription,
          path: "/privacy",
        })}
      />
      <h1 className="mb-8 text-4xl font-bold text-primary neon-glow"><span className="text-secondary">{">"}</span> Privacy</h1>
      <TerminalBox title="privacy.txt">
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>The contact form collects the name, email address, and message you choose to provide.</p>
          <p>The data is sent through EmailJS solely so Alif Abedin Siyam can read and respond to your request. CAPTCHA verification is handled by Cloudflare Turnstile. Rate-limit records use a one-way hash of the requester&apos;s IP address and are retained only for the rate-limit window.</p>
          <p>Do not submit passwords, access tokens, confidential client information, or other sensitive data through the form.</p>
          <p>To request deletion of a submitted message, email <a href={siteLinks.email} className="text-secondary hover:text-primary">{siteLinks.emailAddress}</a>.</p>
          <Link href="/contact" className="inline-flex text-primary hover:text-secondary">← Return to contact</Link>
        </div>
      </TerminalBox>
    </div>
  )
}
