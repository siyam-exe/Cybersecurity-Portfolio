import { NextResponse } from "next/server"
import { createCtfSession, ctfCookieName, getHazelCipher, readCtfSession } from "@/lib/ctf-server"

export const runtime = "nodejs"

export function GET(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  const token = decodeURIComponent(cookie.match(new RegExp(`(?:^|;\\s*)${ctfCookieName}=([^;]+)`))?.[1] || "")
  const session = readCtfSession(token)
  if (!session || session.stage < 4) {
    return NextResponse.json({ error: "Hollow's Reach is not on your route yet." }, { status: 401, headers: { "Cache-Control": "no-store" } })
  }
  const cipher = getHazelCipher()
  const next = createCtfSession(session.stage)
  if (!cipher || !next) return NextResponse.json({ error: "Challenge service is unavailable." }, { status: 503 })
  const result = NextResponse.json({
    cipher: "repeating-key XOR",
    encoding: "hex",
    key: "the word Grum accepted at Ninebridge Fen",
    ciphertext: cipher,
  }, { headers: { "Cache-Control": "no-store" } })
  result.cookies.set(ctfCookieName, next, { httpOnly: true, sameSite: "lax", maxAge: 7200, path: "/" })
  return result
}
