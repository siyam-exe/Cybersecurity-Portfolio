export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
  turnstileToken: { max: 2048 },
} as const

export interface ContactMessage {
  name: string
  email: string
  message: string
  turnstileToken: string
  website: string
}

type ValidationResult =
  | { success: true; data: ContactMessage }
  | { success: false; error: string }

export function validateContactMessage(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") return { success: false, error: "Invalid request." }

  const value = input as Record<string, unknown>
  const name = typeof value.name === "string" ? value.name.trim() : ""
  const email = typeof value.email === "string" ? value.email.trim() : ""
  const message = typeof value.message === "string" ? value.message.trim() : ""
  const turnstileToken = typeof value.turnstileToken === "string" ? value.turnstileToken : ""
  const website = typeof value.website === "string" ? value.website.trim() : ""

  if (value.consent !== true) return { success: false, error: "Consent is required." }
  if (name.length < contactLimits.name.min || name.length > contactLimits.name.max) return { success: false, error: "Enter a valid name." }
  if (email.length > contactLimits.email.max || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: "Enter a valid email address." }
  if (message.length < contactLimits.message.min || message.length > contactLimits.message.max) return { success: false, error: "Enter a message between 10 and 2,000 characters." }
  if (turnstileToken.length > contactLimits.turnstileToken.max) return { success: false, error: "Invalid CAPTCHA response." }

  return { success: true, data: { name, email, message, turnstileToken, website } }
}
