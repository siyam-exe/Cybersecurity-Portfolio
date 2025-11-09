"use client"

import { motion } from "framer-motion"
import { TerminalBox } from "@/components/terminal-box"
import { ContactForm } from "@/components/contact-form"
import { Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/1tsD@M0nk3",
    label: "GitHub",
    username: "@1tsD@M0nk3",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/alif-abedin-siyam",
    label: "LinkedIn",
    username: "Alif Abedin Siyam",
  },
  {
    icon: Mail,
    href: "mailto:siyam.exe@gmail.com",
    label: "Email",
    username: "siyam.exe@gmail.com",
  },
]

export default function ContactPage() {
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
          <span className="text-secondary">{">"}</span> Get in Touch
        </h1>
        <p className="text-muted-foreground mb-12">
          Have a question or want to collaborate? Feel free to reach out through any of these channels.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <TerminalBox title="send_message.sh" className="h-full">
              <div className="mb-4">
                <p className="text-sm text-primary mb-2">
                  <span className="text-secondary">{">"}</span> Send a message to Siyam.exe
                </p>
              </div>
              <ContactForm />
            </TerminalBox>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <TerminalBox title="social_links.conf" className="h-full">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="text-primary">{">"}</span> Connect with me on these platforms
                </p>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{link.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </TerminalBox>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <TerminalBox>
            <div className="text-center text-sm text-muted-foreground">
              <p>
                <span className="text-primary">{">"}</span> Response time: Usually within 24-48 hours
              </p>
              <p className="mt-2">
                <span className="text-primary">{">"}</span> For urgent matters, please reach out via email directly
              </p>
            </div>
          </TerminalBox>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
