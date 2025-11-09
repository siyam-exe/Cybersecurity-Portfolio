export interface Writeup {
  slug: string
  title: string
  platform: "TryHackMe" | "HackTheBox" | "PicoCTF" | "OverTheWire"
  difficulty: "Easy" | "Medium" | "Hard" | "Insane"
  summary: string
  date: string
  tags: string[]
  content?: string
}

// Placeholder data - replace with actual writeups
export const writeups: Writeup[] = []
