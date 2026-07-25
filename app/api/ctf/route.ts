import { NextResponse } from "next/server"
import {
  createCtfSession,
  ctfCookieName,
  getNextHint,
  getProjectEvidence,
  getRuneCarrier,
  getVerifiedProjectMarker,
  isCtfConfigured,
  isCopiedProjectMarker,
  isFlag,
  isHazelFragment,
  isRune,
  readCtfSession,
} from "@/lib/ctf-server"
import type { CtfStage } from "@/lib/ctf"

export const runtime = "nodejs"

function cookieToken(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  return decodeURIComponent(cookie.match(new RegExp(`(?:^|;\\s*)${ctfCookieName}=([^;]+)`))?.[1] || "")
}

function response(body: Record<string, unknown>, status = 200, headers?: HeadersInit, session?: string | null, clear = false) {
  const result = NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } })
  if (session) result.cookies.set(ctfCookieName, session, { httpOnly: true, sameSite: "lax", maxAge: 7200, path: "/" })
  if (clear) result.cookies.set(ctfCookieName, "", { httpOnly: true, sameSite: "lax", maxAge: 0, path: "/" })
  return result
}

function isSameOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site")
  if (fetchSite && fetchSite !== "same-origin") return false
  const origin = request.headers.get("origin")
  if (!origin) return true
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
  try { return new URL(origin).host === host } catch { return false }
}

function activeSession(request: Request, supplied?: string) {
  const bodySession = readCtfSession(supplied || null)
  const cookieSession = readCtfSession(cookieToken(request))
  if (supplied !== undefined && !bodySession) return null
  if (!bodySession) return cookieSession
  if (!cookieSession) return bodySession
  return cookieSession.stage > bodySession.stage ? cookieSession : bodySession
}

export async function GET(request: Request) {
  if (!isCtfConfigured()) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
  const session = activeSession(request, request.headers.get("x-ctf-session") || undefined)
  if (!session) return response({ ok: false, message: "Run ctf start before following evidence." }, 401)
  const resource = new URL(request.url).searchParams.get("resource")

  if (resource === "note") {
    if (session.stage < 1) return response({ ok: false, message: "The tree has not been examined yet." }, 403)
    const next = createCtfSession(Math.max(session.stage, 2) as CtfStage)
    const path = Buffer.from("/writeups/ecb-oracle#how-the-challenge-actually-works").toString("base64")
    return response({
      ok: true,
      stage: Math.max(session.stage, 2),
      session: next,
      message: "Fenwick unfolds a route note that has spent too long in his pocket.",
      evidence: [
        "Fenwick: \"Ninebridge Fen first. Grum wants proof, not introductions.\"",
        "Thistle taps the page. \"He also forgot to write where. Typical.\"",
        "The paper is unhelpful. Its response metadata is less so.",
      ],
    }, 200, { "X-Thistle-Route": path }, next)
  }

  if (resource === "rune") {
    if (session.stage < 2) return response({ ok: false, message: "Fenwick's route has not led you here yet." }, 403)
    const carrier = getRuneCarrier()
    const next = createCtfSession(session.stage)
    if (!carrier || !next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
    return response({
      ok: true,
      stage: session.stage,
      session: next,
      message: "Grum points at the sentence. \"Something true is hiding between those letters. Bring me the word.\"",
      carrier,
      mapping: "U+200B=0, U+200C=1; group into eight-bit UTF-8 bytes",
    }, 200, undefined, next)
  }

  if (resource === "sequence") {
    if (session.stage < 3) return response({ ok: false, message: "Grum has not let you cross Ninebridge Fen yet." }, 403)
    const next = createCtfSession(session.stage)
    if (!next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
    return response({
      ok: true,
      stage: session.stage,
      session: next,
      message: "Cindermaw pushes four genuine repository records across the stone. One mark is dark with soot.",
      ...getProjectEvidence(),
    }, 200, undefined, next)
  }

  if (resource === "verify-marker") {
    if (session.stage < 5) return response({ ok: false, message: "Nothing looks wrong yet. Finish Hazel's fragment before checking your work." }, 409)
    const next = createCtfSession(Math.max(session.stage, 6) as CtfStage)
    if (!next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
    return response({
      ok: true,
      stage: Math.max(session.stage, 6),
      session: next,
      message: "The original record resolves the mismatch.",
      correction: getVerifiedProjectMarker(),
    }, 200, undefined, next)
  }

  return response({ ok: false, message: "Resource not found." }, 404)
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return response({ ok: false, message: "Request origin is not allowed." }, 403)
  if (!request.headers.get("content-type")?.includes("application/json")) return response({ ok: false, message: "Content type must be application/json." }, 415)
  if (!isCtfConfigured()) return response({ ok: false, message: "Challenge service is unavailable." }, 503)

  let input: Record<string, unknown>
  try {
    const text = await request.text()
    if (text.length > 4000) return response({ ok: false, message: "Request is too large." }, 413)
    input = JSON.parse(text) as Record<string, unknown>
  } catch {
    return response({ ok: false, message: "Invalid request." }, 400)
  }

  const action = typeof input.action === "string" ? input.action : ""
  const answer = typeof input.answer === "string" ? input.answer.trim() : ""

  if (action === "start") {
    const session = createCtfSession(1)
    if (!session) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
    return response({
      ok: true, stage: 1, session,
      message: "The Elderbanana Tree has stopped growing.",
      evidence: [
        "Its Suncore Peel is gone—not stolen, simply unravelled with the spell that held its seed together.",
        "Fenwick Barkspindle arrives after dark. Thistle, his owl, handles most of the useful explanation.",
        "The Peelrune broke into three pieces. Monke has no destiny, just a dying tree and a trip to make.",
        "Run: ctf look note",
      ],
    }, 200, undefined, session)
  }

  if (action === "reset") return response({ ok: true, stage: 0, message: "The Sunroot Grove journey has been reset." }, 200, undefined, null, true)

  const session = activeSession(request, typeof input.session === "string" ? input.session : undefined)
  if (!session) return response({ ok: false, message: "Challenge session expired. Run ctf start." }, 401)

  if (action === "hint") {
    const next = getNextHint(session)
    if (!next.session) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
    return response({ ok: true, stage: session.stage, session: next.session, message: "Thistle opens one eye.", hint: next.hint }, 200, undefined, next.session)
  }

  if (action === "accuse") {
    return response({
      ok: false,
      stage: session.stage,
      message: `Thistle: "Nobody stole it${answer ? `, including ${answer}` : ""}. The spell frayed. Try solving the problem you have."`,
    }, 400)
  }

  if (action === "verify") {
    if (session.stage === 1) return response({ ok: false, stage: 1, message: "Fenwick has not even shown you the route yet. Run ctf look note." }, 409)
    if (session.stage === 2) {
      if (!isRune(answer)) return response({ ok: false, stage: 2, message: "Grum: \"That is something you guessed. I asked for the word you actually found.\"" }, 400)
      const next = createCtfSession(3)
      if (!next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
      return response({
        ok: true,
        stage: 3,
        session: next,
        message: "Grum accepts the proof and hands over the first Peelrune fragment.",
        evidence: ["Grum: \"Not much of a riddle, but it is more than most bring me. Cross before I reconsider.\""],
      }, 200, undefined, next)
    }
    if (session.stage === 3) {
      if (!isCopiedProjectMarker(answer)) return response({ ok: false, stage: 3, message: "Cindermaw: \"Those records have timestamps. Use them. I have slept through better guesses.\"" }, 400)
      const next = createCtfSession(4)
      if (!next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
      return response({
        ok: true,
        stage: 4,
        session: next,
        message: "Cindermaw accepts the sequence. Monke copies the second fragment through a thin curtain of smoke.",
        evidence: ["Cindermaw: \"Finished, ordered, and real. Keep it. I was not using it for anything.\""],
      }, 200, undefined, next)
    }
    if (session.stage === 4) {
      if (!isHazelFragment(answer)) return response({ ok: false, stage: 4, message: "Hazel: \"That is not what the cipher says. The door was the difficult part; do not invent a new one.\"" }, 400)
      const next = createCtfSession(5)
      if (!next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
      return response({
        ok: true,
        stage: 5,
        session: next,
        message: "Hazel's fragment is correct, but the three Peelrune edges do not align.",
        evidence: [
          "Fenwick turns the pieces twice. \"One mark was copied wrongly. Nothing mystical about it.\"",
          "Thistle: \"The dragon's third mark. Smoke is poor typography. Check the original once.\"",
        ],
      }, 200, undefined, next)
    }
    if (session.stage === 5) return response({ ok: false, stage: 5, message: "The fragments still mismatch. Return to Cindermaw's project record and verify the soot-darkened mark." }, 409)
    if (session.stage < 6) return response({ ok: false, stage: session.stage, message: "The Peelrune is still incomplete." }, 409)
    if (!isFlag(answer)) return response({ ok: false, stage: session.stage, message: "The three edges still do not join. Use Grum's word, Cindermaw's corrected sequence, then Hazel's fragment." }, 400)
    const next = createCtfSession(7)
    if (!next) return response({ ok: false, message: "Challenge service is unavailable." }, 503)
    return response({
      ok: true,
      stage: 7,
      session: next,
      message: "Fenwick reads the Peelrune. The Elderbanana Tree produces one new leaf, and Monke plants the reseed.",
      evidence: ["Everyone is relieved. Nobody organizes a parade."],
    }, 200, undefined, next)
  }

  return response({ ok: false, message: "Unknown challenge action." }, 400)
}
