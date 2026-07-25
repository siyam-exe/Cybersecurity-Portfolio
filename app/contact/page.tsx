import {
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Check,
  Clock3,
  Github,
  Linkedin,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { EmailActions } from "@/components/email-actions"
import { JsonLd } from "@/components/json-ld"
import { TerminalBox } from "@/components/terminal-box"
import { createPageMetadata, siteLinks } from "@/lib/site"
import { pageSchema } from "@/lib/structured-data"

const contactDescription =
  "Contact Alif Abedin Siyam about cybersecurity roles, security research, technical projects, writeups, or professional collaboration."

export const metadata = createPageMetadata({
  title: "Contact Alif Abedin Siyam",
  description: contactDescription,
  path: "/contact",
})

const socialLinks = [
  { icon: Github, href: siteLinks.github, label: "GitHub", detail: "Projects & source code" },
  { icon: Linkedin, href: siteLinks.linkedin, label: "LinkedIn", detail: "Professional profile" },
  { icon: BookOpenText, href: siteLinks.medium, label: "Medium", detail: "Security writeups" },
]

const conversationTopics = [
  "SOC and security operations roles",
  "Junior penetration testing opportunities",
  "Security research and technical collaboration",
  "Questions about my projects or writeups",
]

export default function ContactPage() {
  return (
    <div className="contact-page page-enter">
      <JsonLd
        data={pageSchema({
          type: "ContactPage",
          name: "Contact Alif Abedin Siyam",
          description: contactDescription,
          path: "/contact",
        })}
      />
      <div className="container mx-auto px-4 py-16 md:py-20">
        <header className="contact-heading max-w-3xl">
          <p className="contact-eyebrow">SECURE COMMUNICATION CHANNEL</p>
          <h1>
            <span aria-hidden="true">{">"}</span> Let&apos;s start a conversation<span className="text-primary">.</span>
          </h1>
          <p>
            Whether you&apos;re hiring for a security role, want to discuss a project or writeup, or simply have a thoughtful question, my inbox is open.
          </p>
        </header>

        <div className="contact-layout">
          <div className="contact-sidebar section-enter" style={{ animationDelay: "120ms" }}>
            <TerminalBox title="channel_status.log" className="contact-status-card overflow-hidden">
              <div className="contact-status-line">
                <span aria-hidden="true" />
                <p>CHANNEL STATUS: OPEN</p>
              </div>
              <h2>Good conversations start with context.</h2>
              <p className="contact-status-copy">
                A short introduction, the reason you&apos;re reaching out, and any useful links will help me give you a better reply.
              </p>

              <div className="contact-topic-list" aria-label="Good reasons to get in touch">
                {conversationTopics.map((topic) => (
                  <div key={topic}>
                    <Check aria-hidden="true" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>

              <EmailActions address={siteLinks.emailAddress} href={siteLinks.email} />
            </TerminalBox>

            <div className="contact-social-grid" aria-label="Professional profiles">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link section-enter"
                  style={{ animationDelay: `${260 + index * 80}ms` }}
                  aria-label={`${link.label}: ${link.detail}`}
                >
                  <link.icon aria-hidden="true" />
                  <span>
                    <strong>{link.label}</strong>
                    <small>{link.detail}</small>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="contact-response-note section-enter" style={{ animationDelay: "520ms" }}>
              <Clock3 aria-hidden="true" />
              <div>
                <p><span>{">"}</span> Response time: Usually within 24-48 hours</p>
                <p><span>{">"}</span> For urgent matters, please reach out via email directly</p>
              </div>
            </div>
          </div>

          <div className="section-enter" style={{ animationDelay: "220ms" }}>
            <TerminalBox title="compose_message.sh" className="contact-form-card overflow-hidden">
              <div className="contact-form-intro">
                <div>
                  <MessageSquareText aria-hidden="true" />
                  <div>
                    <p>NEW MESSAGE</p>
                    <h2>Send me a message</h2>
                  </div>
                </div>
                <span>All fields required</span>
              </div>
              <p className="contact-form-copy">Share enough detail for a useful response. Your message goes directly to my inbox.</p>

              <div className="contact-delivery-flow" aria-label="Message protection process">
                <span><ShieldCheck aria-hidden="true" /> Validate</span>
                <i aria-hidden="true" />
                <span><LockKeyhole aria-hidden="true" /> Verify</span>
                <i aria-hidden="true" />
                <span><BriefcaseBusiness aria-hidden="true" /> Deliver</span>
              </div>

              <ContactForm />
            </TerminalBox>
          </div>
        </div>
      </div>
    </div>
  )
}
