import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { validateContactMessage } from "@/lib/contact"
import { checkContactRateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"

function response(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } })
}

function getClientIp(request: Request) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
}

function isSameOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site")
  if (fetchSite && fetchSite !== "same-origin") return false
  const origin = request.headers.get("origin")
  if (!origin) return true
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret || !token) return false
  const body = new URLSearchParams({ secret, response: token, remoteip: ip })
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    cache: "no-store",
  })
  if (!result.ok) return false
  const data = await result.json() as { success?: boolean }
  return data.success === true
}

async function deliverMessage(name: string, email: string, message: string) {
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) throw new Error("Email service is not configured")

  const privateKey = process.env.EMAILJS_PRIVATE_KEY
  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: { from_name: name, from_email: email, message },
  }
  if (privateKey) payload.accessToken = privateKey

  const result = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  })
  if (!result.ok) throw new Error(`Email delivery failed with status ${result.status}`)
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return response({ error: "Request origin is not allowed." }, 403)
  if (!request.headers.get("content-type")?.includes("application/json")) return response({ error: "Content type must be application/json." }, 415)

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 10_000) return response({ error: "Request is too large." }, 413)

  let input: unknown
  try {
    const text = await request.text()
    if (text.length > 10_000) return response({ error: "Request is too large." }, 413)
    input = JSON.parse(text)
  } catch {
    return response({ error: "Invalid JSON." }, 400)
  }

  const validation = validateContactMessage(input)
  if (!validation.success) return response({ error: validation.error }, 400)
  if (validation.data.website) return response({ ok: true }, 200)

  const ip = getClientIp(request)
  const salt = process.env.RATE_LIMIT_SALT
  if (!salt && process.env.NODE_ENV === "production") return response({ error: "Contact service is not configured." }, 503)
  const identifier = createHash("sha256").update(`${salt || "development"}:${ip}`).digest("hex")

  try {
    const rateLimit = await checkContactRateLimit(identifier)
    if (!rateLimit.durable && process.env.NODE_ENV === "production") return response({ error: "Contact service is not configured." }, 503)
    if (!rateLimit.allowed) return response({ error: "Too many messages. Please try again later." }, 429, { "Retry-After": String(rateLimit.retryAfter), "X-RateLimit-Remaining": "0" })

    const captchaValid = await verifyTurnstile(validation.data.turnstileToken, ip)
    if (!captchaValid) return response({ error: "CAPTCHA verification failed." }, 400, { "X-RateLimit-Remaining": String(rateLimit.remaining) })

    await deliverMessage(validation.data.name, validation.data.email, validation.data.message)
    return response({ ok: true }, 200, { "X-RateLimit-Remaining": String(rateLimit.remaining) })
  } catch (error) {
    console.error("Contact request failed", error instanceof Error ? error.message : "Unknown error")
    return response({ error: "Message delivery is temporarily unavailable." }, 502)
  }
}
