"use client"

import { useEffect, useState } from "react"
import { Clock3, Search, ShieldCheck } from "lucide-react"
import { ctfStorageKey, type CtfStage } from "@/lib/ctf"

interface StoredQuest {
  session: string
  stage: CtfStage
}

interface CommitRecord {
  committedAt: string
  hash: string
  subject: string
  marker: string
}

interface MarkerCorrection {
  hash: string
  position: number
  copied: string
  verified: string
  dialogue: string
}

function readQuest() {
  try {
    const value = JSON.parse(sessionStorage.getItem(ctfStorageKey) || "null") as StoredQuest | null
    return value?.session ? value : null
  } catch {
    return null
  }
}

function saveQuest(session: string, stage: CtfStage) {
  const next = { session, stage }
  sessionStorage.setItem(ctfStorageKey, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent("portfolio:ctf-state", { detail: next }))
}

async function fetchEvidence(resource: string, quest: StoredQuest) {
  const response = await fetch(`/api/ctf?resource=${resource}`, { headers: { "X-CTF-Session": quest.session } })
  const body = await response.json() as Record<string, unknown>
  if (!response.ok) throw new Error(String(body.message || "Evidence request failed."))
  if (typeof body.session === "string" && typeof body.stage === "number") saveQuest(body.session, body.stage as CtfStage)
  return body
}

export function WriteupRuneClue() {
  const [quest, setQuest] = useState<StoredQuest | null>(null)
  const [carrier, setCarrier] = useState("")
  const [mapping, setMapping] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => setQuest(readQuest()), [])
  if (!quest || quest.stage < 2) return null

  const inspect = async () => {
    try {
      const body = await fetchEvidence("rune", quest)
      setCarrier(String(body.carrier || ""))
      setMapping(String(body.mapping || ""))
      setMessage(String(body.message || ""))
      setQuest(readQuest())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The spacing trace failed.")
    }
  }

  return (
    <aside className="ctf-inline-clue" aria-label="Sunroot Grove CTF writeup evidence">
      <div><Search aria-hidden="true" /><strong>GRUM&apos;S TEST</strong></div>
      <p><strong>Grum:</strong> &ldquo;Tell me something true you actually figured out, not something you were told.&rdquo;</p>
      <p>Read the paragraph above, then inspect what changes inside the sentence below.</p>
      <button type="button" onClick={() => void inspect()}>Inspect the unusual spacing</button>
      {carrier && (
        <>
          <p className="ctf-rune-sentence">Identical blocks preserve structure<span data-rune-carrier={carrier}>{carrier}</span>, but unusual spacing can preserve a name.</p>
          <code>{mapping}</code>
        </>
      )}
      {message && <small role="status">{message}</small>}
    </aside>
  )
}

export function ProjectSequenceClue() {
  const [quest, setQuest] = useState<StoredQuest | null>(null)
  const [records, setRecords] = useState<CommitRecord[]>([])
  const [dialogue, setDialogue] = useState("")
  const [correction, setCorrection] = useState<MarkerCorrection | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => setQuest(readQuest()), [])
  if (!quest || quest.stage < 3) return null

  const inspect = async () => {
    try {
      const body = await fetchEvidence("sequence", quest)
      setRecords(Array.isArray(body.records) ? body.records as CommitRecord[] : [])
      setDialogue(String(body.dialogue || ""))
      setMessage(String(body.message || ""))
      setQuest(readQuest())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The repository trail failed.")
    }
  }

  const verifyMarker = async () => {
    try {
      const body = await fetchEvidence("verify-marker", quest)
      setCorrection(body.correction as unknown as MarkerCorrection)
      setMessage(String(body.message || ""))
      setQuest(readQuest())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The original record could not be verified.")
    }
  }

  return (
    <div className="ctf-project-clue">
      <div><Clock3 aria-hidden="true" /><div><small>SUNROOT GROVE · CINDERMAW&apos;S LEDGE</small><h4>Prove the project was built in a real sequence</h4></div></div>
      <p><strong>Cindermaw:</strong> &ldquo;Show me the order you made these in. Not the order you would like me to believe. The real one.&rdquo;</p>
      <p>Request the genuine Homelab commit record, sort it by timestamp, and join the four marks exactly as they appear.</p>
      <button type="button" onClick={() => void inspect()}>Request the build record</button>
      {records.length > 0 && (
        <div className="ctf-commit-trail">
          {records.map((record) => (
            <div key={record.hash} data-marker={record.marker}>
              <code>{record.committedAt}</code><strong>{record.hash} · {record.subject}</strong><span>marker={record.marker}</span>
            </div>
          ))}
        </div>
      )}
      {dialogue && <p className="ctf-alibi"><ShieldCheck aria-hidden="true" />{dialogue}</p>}
      {quest.stage === 5 && (
        <div className="ctf-marker-check">
          <p>One Peelrune edge does not fit. Thistle wants the smoke-darkened third record checked against the original.</p>
          <button type="button" onClick={() => void verifyMarker()}>Verify the soot-darkened mark</button>
        </div>
      )}
      {correction && (
        <p
          className="ctf-alibi"
          data-copied-marker={correction.copied}
          data-verified-marker={correction.verified}
          data-marker-position={correction.position}
        >
          <ShieldCheck aria-hidden="true" />
          <span><strong>{correction.hash}: {correction.copied} → {correction.verified}</strong><br />{correction.dialogue}</span>
        </p>
      )}
      {quest.stage >= 6 && !correction && <p className="ctf-alibi"><ShieldCheck aria-hidden="true" />The corrected mark is stored in the signed quest record.</p>}
      {message && <small role="status">{message}</small>}
    </div>
  )
}
