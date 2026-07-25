import "server-only"
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"
import type { CtfStage } from "@/lib/ctf"

interface SessionPayload {
  stage: CtfStage
  issuedAt: number
  nonce: string
  hintTier: number
  hintStage: CtfStage
}

export const ctfCookieName = "damonke_quest"
const projectMarker = "ROOT"
const copiedProjectMarker = "RO0T"
const hazelFragment = "RESEED"

function getConfig() {
  const signingSecret = process.env.CTF_SIGNING_SECRET
  const runeWord = process.env.CTF_RUNE_WORD || process.env.CTF_UNLOCK_ANSWER
  if (!signingSecret || !runeWord) return null
  return { signingSecret, runeWord: runeWord.trim().toLowerCase() }
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url")
}

export function createCtfSession(stage: CtfStage, hintTier = 0, hintStage = stage) {
  const config = getConfig()
  if (!config) return null
  const value: SessionPayload = { stage, issuedAt: Date.now(), nonce: randomBytes(8).toString("hex"), hintTier, hintStage }
  const payload = Buffer.from(JSON.stringify(value)).toString("base64url")
  return `${payload}.${sign(payload, config.signingSecret)}`
}

export function readCtfSession(token: string | null) {
  const config = getConfig()
  if (!config || !token) return null
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null
  const expected = Buffer.from(sign(payload, config.signingSecret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null

  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionPayload
    if (!Number.isInteger(value.stage) || value.stage < 1 || value.stage > 7) return null
    if (Date.now() - value.issuedAt > 2 * 60 * 60 * 1000) return null
    return value
  } catch {
    return null
  }
}

export function getRuneCarrier() {
  const rune = getConfig()?.runeWord
  if (!rune) return null
  return Buffer.from(rune, "utf8")
    .toString("binary")
    .split("")
    .map((byte) => byte.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("")
    .replaceAll("0", "\u200b")
    .replaceAll("1", "\u200c")
}

export function getProjectEvidence() {
  const ordered = [
    { committedAt: "2026-07-17T10:19:17+08:00", hash: "2518409", subject: "Initial cybersecurity homelab documentation", marker: "R" },
    { committedAt: "2026-07-17T10:30:40+08:00", hash: "af209b1", subject: "Refine README project framing", marker: "O" },
    { committedAt: "2026-07-17T10:58:18+08:00", hash: "555d288", subject: "Update homelab architecture diagram", marker: "0" },
    { committedAt: "2026-07-17T13:06:16+08:00", hash: "56ea516", subject: "Improve README title for search visibility", marker: "T" },
  ]
  return {
    records: [ordered[2], ordered[0], ordered[3], ordered[1]],
    dialogue: "Cindermaw: \"Show me the order you made these in. The real one, not the tidy version people invent afterward.\"",
  }
}

export function getVerifiedProjectMarker() {
  return {
    hash: "555d288",
    position: 3,
    copied: "0",
    verified: "O",
    dialogue: "Thistle wipes soot from the third mark. It was the letter O, not a zero. Cindermaw did say to copy it carefully.",
  }
}

export function getHazelCipher() {
  const rune = getConfig()?.runeWord
  if (!rune) return null
  const text = `Hazel Thorne: "You found the door. That's the part people skip. Here, you earned the rest without another test." HAZEL_FRAGMENT=${hazelFragment}. Lay it after Grum's word and Cindermaw's sequence. If an edge refuses to fit, check the smoke-darkened third mark against the original record.`
  const input = Buffer.from(text, "utf8")
  const key = Buffer.from(rune, "utf8")
  return Buffer.from(input.map((byte, index) => byte ^ key[index % key.length])).toString("hex")
}

export function getFlagFormat() {
  const rune = getConfig()?.runeWord
  return rune ? `DAMONKE{${rune}_${projectMarker.toLowerCase()}_${hazelFragment.toLowerCase()}}` : null
}

export function isFlag(value: string) {
  const expected = getFlagFormat()
  return Boolean(expected && value.trim().toLowerCase() === expected.toLowerCase())
}

export function isRune(value: string) {
  const rune = getConfig()?.runeWord
  return Boolean(rune && value.trim().toLowerCase() === rune)
}

export function isCopiedProjectMarker(value: string) {
  return value.trim().toUpperCase() === copiedProjectMarker
}

export function isHazelFragment(value: string) {
  return value.trim().toUpperCase() === hazelFragment
}

const hints: Record<number, string[]> = {
  1: ["Thistle: \"The note has more edges than paper.\"", "Thistle: \"Responses wear headers. Read this one's.\"", "Thistle: \"Inspect `ctf look note`, then decode the route header.\""],
  2: ["Thistle: \"Grum asked for something you found, not something printed for you.\"", "Thistle: \"Read the ECB explanation until the paragraph beginning ‘Here’s the clever part.’\"", "Thistle: \"Trace its spacing, map the two zero-width characters to bits, then submit the word.\""],
  3: ["Thistle: \"Dragons trust timestamps more than speeches. Sensible.\"", "Thistle: \"Open the homelab report and request the real build record.\"", "Thistle: \"Sort all four commits by time, join the marks exactly as shown, and submit the sequence.\""],
  4: ["Thistle: \"Hazel is private, not invisible. Polite crawlers know where not to go.\"", "Thistle: \"Read robots.txt and visit its unusual disallowed endpoint in this browser.\"", "Thistle: \"XOR the returned hex with Grum's word, then submit Hazel's named fragment.\""],
  5: ["Thistle: \"One edge is shaped like a typo.\"", "Thistle: \"The dragon's third mark was copied through smoke.\"", "Thistle: \"Return to the project report and verify the soot-darkened record once.\""],
  6: ["Thistle: \"Three guardians, three lowercase pieces, same travel order.\"", "Thistle: \"Grum first. Cindermaw second. Hazel third.\"", "Thistle: \"Format the reconstructed Peelrune as DAMONKE{grum_cindermaw_hazel}.\""],
}

export function getNextHint(session: SessionPayload) {
  const currentTier = session.hintStage === session.stage ? session.hintTier : 0
  const tier = Math.min(currentTier + 1, 3)
  const hint = hints[session.stage]?.[tier - 1] ?? "The wizard has nothing useful to add."
  return { hint, tier, session: createCtfSession(session.stage, tier, session.stage) }
}

export function isCtfConfigured() {
  return Boolean(getConfig())
}
