"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { TerminalBox } from "@/components/terminal-box"
import { SkillBar } from "@/components/skill-bar"
import { Shield, Code, Search, Brain, TerminalIcon } from "lucide-react"

const skills = [
  { name: "OSINT", level: 85, icon: Shield },
  { name: "Web Exploitation", level: 80, icon: Code },
  { name: "Reverse Engineering", level: 70, icon: Search },
  { name: "Threat Intelligence", level: 75, icon: Brain },
  { name: "Python / Bash / Linux", level: 90, icon: TerminalIcon },
]

const tools = [
  "Nmap",
  "Burp Suite",
  "Wireshark",
  "Metasploit",
  "ffuf",
  "John The Ripper",
  "Hydra",
  "SQLMap",
  "Ghidra",
  "IDA Pro",
]

const certifications = [
  { name: "Google Cybersecurity Professional Certificate", status: "In Progress", icon: "🔐" },
  { name: "IBM Cybersecurity Fundamentals", status: "In Progress", icon: "🛡️" },
  { name: "CompTIA Security+", status: "Planned", icon: "📋" },
]

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-20"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 neon-glow">
          <span className="text-secondary">{">"}</span> whoami
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <TerminalBox className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full border-2 border-primary neon-border mb-4 overflow-hidden bg-muted">
                  <Image
                    src="/images/design-mode/cybersecurity-hacker-avatar.jpg"
                    alt="Alif Abedin Siyam"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">Alif Abedin Siyam</h2>
                <p className="text-secondary mb-1">1tsD@M0nk3</p>
                <p className="text-sm text-muted-foreground">siyam.exe@gmail.com</p>
              </div>
            </TerminalBox>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <TerminalBox title="bio.txt">
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  <span className="text-primary">{">"}</span> Cybersecurity student at{" "}
                  <span className="text-secondary">Asia Pacific University (APU)</span> passionate about ethical
                  hacking, penetration testing, and threat intelligence.
                </p>
                <p className="leading-relaxed">
                  <span className="text-primary">{">"}</span> I spend my time hunting vulnerabilities, solving CTF
                  challenges, and expanding my knowledge in offensive security. My goal is to contribute to making the
                  digital world more secure.
                </p>
                <p className="leading-relaxed">
                  <span className="text-primary">{">"}</span> When I'm not breaking things (ethically), you'll find me
                  documenting my findings, building security tools, or exploring the latest attack vectors and defense
                  mechanisms.
                </p>
              </div>
            </TerminalBox>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-3xl font-bold text-primary mb-6">
            <span className="text-secondary">{">"}</span> Education
          </h2>
          <TerminalBox title="education.log">
            <div className="space-y-2">
              <p className="text-lg">
                <span className="text-primary font-bold">BSc in Cyber Security</span>
              </p>
              <p className="text-muted-foreground">Asia Pacific University (APU)</p>
              <p className="text-sm text-secondary">2024 - Present</p>
            </div>
          </TerminalBox>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">
            <span className="text-secondary">{">"}</span> Certifications
          </h2>
          <TerminalBox title="certs.sh">
            <div className="grid md:grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded border border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
                >
                  <span className="text-2xl">{cert.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{cert.name}</p>
                    <p
                      className={`text-sm ${cert.status === "In Progress" ? "text-secondary" : cert.status === "Planned" ? "text-accent" : "text-primary"}`}
                    >
                      {cert.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TerminalBox>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">
            <span className="text-secondary">{">"}</span> Skills
          </h2>
          <TerminalBox title="skills.sh">
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <SkillBar name={skill.name} level={skill.level} icon={skill.icon} />
                </motion.div>
              ))}
            </div>
          </TerminalBox>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">
            <span className="text-secondary">{">"}</span> Favorite Tools
          </h2>
          <TerminalBox title="tools.conf">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.05 }}
                  className="bg-muted/50 border border-primary/30 rounded px-4 py-3 text-center hover:border-primary hover:bg-primary/10 transition-all cursor-default"
                >
                  <span className="text-sm text-foreground">{tool}</span>
                </motion.div>
              ))}
            </div>
          </TerminalBox>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
