import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const source = path.resolve(process.argv[2] ?? "")

if (!process.argv[2]) throw new Error("Usage: node scripts/import-writeups.mjs <source-directory>")

const catalog = JSON.parse(await readFile(path.join(root, "content", "writeups", "catalog.json"), "utf8"))
const contentRoot = path.join(root, "content", "writeups", "articles")
const assetRoot = path.join(root, "public", "writeups", "assets")

const categorySlugs = {
  "Cryptography": "cryptography",
  "OSINT": "osint",
  "Forensics": "forensics",
  "Privilege Escalation": "privilege-escalation",
  "Web Exploitation": "web-exploitation",
  "Binary Exploitation": "binary-exploitation",
  "Reverse Engineering": "reverse-engineering",
}

const replacements = new Map([
  ["I originally started this CTF writeup series back in November, but I had to stop after Day 7 due to personal reasons. I still wanted to complete what I started, so I’m restarting the series from today with a more consistent plan.", "This writeup documents my return to CryptoHack through its introductory challenges and the foundational techniques they reinforce."],
  ["This post marks Day 1 of my 30-day CTF writeup series. I’m starting again with **Introduction to CryptoHack**, where I walk through the beginner challenges and document my first steps back into the platform. The plan is simple: solve at least one challenge every day, take notes, and build a process I can trust when the puzzles get tougher.", "This walkthrough covers **Introduction to CryptoHack**, documenting each beginner challenge, the reasoning behind the solution, and the techniques that carry into harder cryptography problems."],
  ["Day 1 was all about getting comfortable with the basics and finding a good rhythm again. I wanted to capture everything from the start, so this writeup includes what I saw on each challenge, what I tried, where I got stuck or got lazy, the screenshots I’ll add, the Python scripts I ran, and the flags I uncovered.", "The focus is getting comfortable with the basics. This writeup includes the challenge observations, attempted approaches, useful screenshots, Python scripts, and recovered flags."],
  ["This is not meant to be a perfect tutorial. It is a detailed record of me getting back into the CTF mindset, rebuilding consistency, and finishing the series properly this time.", "This is a detailed learning record rather than a perfect tutorial: it preserves the decisions, mistakes, and working solutions behind each result."],
  ["And that concludes my day 1 with Introduction To CryptoHack writeup. The challenges weren’t too hard, but they hit all the right notes getting me to think about encoding, XOR, and how small clues can lead to big reveals. I bounced between Python and CyberChef depending on my mood, and it worked out fine. More than anything, I’m starting to find a rhythm for how I solve and write these up. If the rest of the month keeps this pace, it’s going to be a fun ride. See you tomorrow folks.", "That concludes Introduction to CryptoHack. The challenges were approachable, but they reinforced the value of understanding encodings, XOR, and how small clues can lead to larger discoveries. Moving between Python and CyberChef also showed where quick visual experimentation helps and where a reproducible script is the better choice."],
  ["Day 4 and I wanted something crisp and satisfying.", "I wanted something crisp and satisfying."],
  ["Day 4 of the 31-day series reminded me that simple algebra with XOR can be more powerful than long oracle probing.", "The challenge reinforced that simple algebra with XOR can be more powerful than long oracle probing."],
  ["Today was Day 5 of my crypto journey, and this time I stepped away from CryptoHack and picked up a real CTF challenge: AlexCTF CR2 — Many Time Secrets.", "For this challenge, I stepped away from CryptoHack and worked through AlexCTF CR2 — Many Time Secrets."],
  ["## Final Thoughts for Day 5", "## Final Thoughts"],
  ["Today was Day 6 of my cryptography journey, and I wanted to try something simple but still realistic.", "I wanted to try a cryptography challenge that was simple but still realistic."],
  ["Today’s challenge is Sakura from TryHackMe, and this is also the start of the OSINT part of my CTF writeup series.", "This writeup covers Sakura from TryHackMe, a multi-stage OSINT investigation."],
  ["Sakura was a great first OSINT challenge for this part of the series.", "Sakura was a strong introduction to a longer OSINT investigation."],
  ["For today’s CTF, we are moving into forensics.", "This writeup moves into digital forensics."],
  ["From Day 11 until Day 14, I will be focusing on forensic challenges.", "The focus here is forensic reasoning: identifying file structure, extracting embedded data, and validating each discovery."],
  ["So Day 11 started with me being extremely unsure about forensics.", "I started this challenge unsure about the forensic workflow."],
  ["Day 12 also taught me that fixing a file does not always reward you immediately.", "The challenge also taught me that fixing a file does not always reward you immediately."],
  ["For Day 29, we are doing **split** from ROP Emporium, x86_64.", "This writeup covers **split** from ROP Emporium on x86_64."],
  ["The final challenge of my 30-day CTF series, where the binary said nothing, but Ghidra and GDB caught it building the flag anyway.", "A reverse-engineering challenge where the binary said nothing, but Ghidra and GDB caught it building the flag anyway."],
  ["Today we are tackling **FactCheck**, the last CTF for my 30-day CTF series.", "This writeup tackles **FactCheck**, a picoCTF reverse-engineering challenge."],
  ["Well, technically this is Day 32.\n\nSo yes, my 30-day series became more than 30 days.", "The challenge provides a useful closing exercise in combining static and dynamic analysis."],
  ["Since this was the final challenge of the series, I was kind of hoping picoCTF would be sentimental and give me a simple goodbye flag.", "I was hoping picoCTF would be generous and provide a simple flag."],
  ["This was a good final challenge for the series.", "This was a strong challenge for reinforcing the workflow."],
  ["Series complete.", "Investigation complete."],
])

await rm(contentRoot, { recursive: true, force: true })
await rm(assetRoot, { recursive: true, force: true })

for (const item of catalog) {
  const sourcePath = path.join(source, "writeups", item.sourceFile)
  const originalAssetName = item.sourceFile.replace(/\.md$/, "")
  const categorySlug = categorySlugs[item.category]
  let markdown = await readFile(sourcePath, "utf8")

  markdown = markdown.replace(/^# Day \d+: .*\r?\n+/, "")
  markdown = markdown.replaceAll(`../assets/${originalAssetName}/`, `/writeups/assets/${item.slug}/`)
  markdown = markdown.replace(/^\[\]\(https:\/\/medium\.com\/write\?[^\n]+\)\r?\n?/gm, "")

  for (const [before, after] of replacements) markdown = markdown.replaceAll(before, after)

  const destinationDirectory = path.join(contentRoot, categorySlug)
  await mkdir(destinationDirectory, { recursive: true })
  await writeFile(path.join(destinationDirectory, `${item.slug}.md`), markdown.trimStart(), "utf8")

  await cp(path.join(source, "assets", originalAssetName), path.join(assetRoot, item.slug), {
    recursive: true,
  })
}

console.log(`Imported ${catalog.length} completed writeups into category-based portfolio content.`)
