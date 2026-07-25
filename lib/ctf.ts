export type CtfStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface CtfResponse {
  ok: boolean
  message: string
  session?: string
  stage?: CtfStage
  evidence?: string[]
  hint?: string
}

export const ctfStorageKey = "portfolio-damonke-ctf"
