"use client"

import type React from "react"

import { useState } from "react"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, XCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    emailjs.init('UHNlwpKOICgAMKEjk')

    try {
      await emailjs.send(
        'service_profile',
        'template_t9h6o5y',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'UHNlwpKOICgAMKEjk'
      )

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to send message. Please try again or contact via email directly.")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm text-foreground">
          Name: <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="bg-muted/50 border-primary/30 focus:border-primary"
          disabled={status === "sending"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm text-foreground">
          Email: <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className="bg-muted/50 border-primary/30 focus:border-primary"
          disabled={status === "sending"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm text-foreground">
          Message: <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message here..."
          rows={6}
          className="bg-muted/50 border-primary/30 focus:border-primary resize-none"
          disabled={status === "sending"}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-background hover:bg-primary/90 neon-border"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <span className="animate-pulse">Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/20 border border-primary text-primary text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/20 border border-destructive text-destructive text-sm">
          <XCircle className="h-4 w-4" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  )
}
