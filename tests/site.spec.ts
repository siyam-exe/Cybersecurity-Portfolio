import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

const publicRoutes = ["/", "/about", "/writeups", "/projects", "/contact", "/privacy"]
const canonicalBase = "https://alifabedinsiyam.vercel.app"

for (const route of publicRoutes) {
  test(`${route} loads with security headers`, async ({ page }) => {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    expect(response?.headers()["content-security-policy"]).toContain("frame-ancestors 'none'")
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff")
    await expect(page.locator("main")).toBeVisible()
    await expect(page).toHaveTitle(/\S/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/)
  })

  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(route)
    const results = await new AxeBuilder({ page }).analyze()
    const violations = results.violations.filter(({ impact }) => impact === "critical" || impact === "serious")
    expect(violations).toEqual([])
  })

  test(`${route} exposes canonical and social metadata`, async ({ page }) => {
    await page.goto(route)
    const canonical = route === "/" ? canonicalBase : `${canonicalBase}${route}`

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical)
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Alif Abedin Siyam")
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${canonicalBase}/og.png`)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image")
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", `${canonicalBase}/og.png`)
  })
}

test("crawl files expose every public page and no private API routes", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml")
  expect(sitemap.status()).toBe(200)
  const sitemapBody = await sitemap.text()

  for (const route of publicRoutes) {
    const canonical = route === "/" ? `${canonicalBase}/` : `${canonicalBase}${route}`
    expect(sitemapBody).toContain(`<loc>${canonical}</loc>`)
  }
  expect((sitemapBody.match(/<loc>/g) ?? []).length).toBe(36)
  expect(sitemapBody).toContain(`${canonicalBase}/writeups/lazy-cbc`)
  expect(sitemapBody).not.toContain("/api/")
  expect(sitemapBody).not.toContain("next-project")

  const robots = await request.get("/robots.txt")
  expect(robots.status()).toBe(200)
  const robotsBody = await robots.text()
  expect(robotsBody).toContain("Disallow: /api/")
  expect(robotsBody).toContain("Disallow: /api/eldersap")
  expect(robotsBody).toContain(`Host: ${canonicalBase}`)
  expect(robotsBody).toContain(`Sitemap: ${canonicalBase}/sitemap.xml`)
})

test("manifest carries the portfolio identity and install colors", async ({ request }) => {
  const response = await request.get("/manifest.webmanifest")
  expect(response.status()).toBe(200)
  expect(await response.json()).toMatchObject({
    name: "Alif Abedin Siyam — Cybersecurity Portfolio",
    short_name: "1tsD@M0nk3",
    start_url: "/",
    display: "standalone",
    background_color: "#020806",
    theme_color: "#020806",
  })
})

test("structured data describes the visible person, collections, project, and article", async ({ page }) => {
  const readSchema = async () => {
    const values = await page.locator('script[type="application/ld+json"]').allTextContents()
    return values.map((value) => JSON.parse(value) as Record<string, unknown>)
  }

  await page.goto("/")
  expect(JSON.stringify(await readSchema())).toContain('"@type":"WebSite"')
  expect(JSON.stringify(await readSchema())).toContain('"@type":"Person"')

  await page.goto("/about")
  const about = JSON.stringify(await readSchema())
  expect(about).toContain('"@type":"ProfilePage"')
  expect(about).toContain('"name":"Alif Abedin Siyam"')

  await page.goto("/projects")
  const projects = JSON.stringify(await readSchema())
  expect(projects).toContain('"@type":"CollectionPage"')
  expect(projects).toContain('"name":"Cybersecurity Homelab"')
  expect(projects).not.toContain('"name":"Next Project"')

  await page.goto("/writeups")
  const writeups = JSON.stringify(await readSchema())
  expect(writeups).toContain('"numberOfItems":30')
  expect(writeups).toContain(`${canonicalBase}/writeups/lazy-cbc`)

  await page.goto("/writeups/lazy-cbc")
  const article = JSON.stringify(await readSchema())
  expect(article).toContain('"@type":"TechArticle"')
  expect(article).toContain('"@type":"BreadcrumbList"')
  expect(article).toContain('"headline":"Lazy CBC"')
})

test("writeup detail exposes self-canonical article metadata", async ({ page }) => {
  await page.goto("/writeups/lazy-cbc")
  await expect(page).toHaveTitle("Lazy CBC | CryptoHack Writeup")
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${canonicalBase}/writeups/lazy-cbc`,
  )
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article")
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    `${canonicalBase}/writeups/lazy-cbc`,
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/)
})

test("internal page links resolve", async ({ page, request }) => {
  const links = new Set<string>()
  for (const route of publicRoutes) {
    await page.goto(route)
    for (const href of await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")))) {
      if (href?.startsWith("/") && !href.startsWith("//")) links.add(href.split("#")[0] || "/")
    }
  }

  const results = await Promise.all([...links].map(async (href) => ({ href, response: await request.get(href) })))
  for (const { href, response } of results) expect(response.status(), `${href} returned ${response.status()}`).toBeLessThan(400)
})

test("unknown writeup slugs return a real 404", async ({ request }) => {
  const response = await request.get("/writeups/does-not-exist")
  expect(response.status()).toBe(404)
})

test("shared layout prevents elastic vertical overscroll", async ({ page }) => {
  await page.goto("/writeups")
  const behavior = await page.locator("html").evaluate((element) => getComputedStyle(element).overscrollBehaviorY)
  expect(behavior).toBe("none")
  await expect(page.locator(".refresh-indicator")).toHaveCount(1)
})

test("homepage presents verified work and clear recruiter paths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "Alif Abedin Siyam", level: 1 })).toBeVisible()
  await expect(page.getByText(/SOC Analyst.*Security Researcher.*Aspiring Penetration Tester/)).toBeVisible()
  await expect(page.getByRole("heading", { name: "> Overview" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "I like finding the story hidden inside the noise." })).toBeVisible()
  await expect(page.getByText("100+")).toBeVisible()
  await expect(page.getByText("Alerts triaged weekly")).toBeVisible()
  await expect(page.getByRole("region", { name: "> Overview" }).getByText("Documented project")).toBeVisible()
  await expect(page.getByRole("heading", { name: "> Featured Writeups" })).toBeVisible()
  for (const slug of ["cache-me-outside", "introduction-to-cryptohack", "linux-privilege-escalation", "n0s4n1ty-1"]) {
    await expect(page.locator(`a[href="/writeups/${slug}"]`)).toHaveCount(1)
  }
  await expect(page.getByRole("heading", { name: "> Cybersecurity Homelab" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "> Certifications" })).toBeVisible()
  await expect(page.getByText("Google Cybersecurity Professional Certificate")).toBeVisible()
  await expect(page.getByText("Microsoft Security Operations Analyst (SC-200)")).toBeVisible()
  await expect(page.locator("main")).not.toContainText(/Current focus|Learning & Credentials/)
  await expect(page.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "/contact")
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute("download", "")
})

test("homepage remains usable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "Alif Abedin Siyam", level: 1 })).toBeVisible()
  await expect(page.getByRole("link", { name: "About me" })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test("writeups are presented as a category-based technical library", async ({ page }) => {
  await page.goto("/writeups")
  await expect(page.getByRole("heading", { name: "> Writeups" })).toBeVisible()
  await expect(page.getByText("30 completed writeups")).toBeVisible()
  await expect(page.getByRole("button", { name: /Cryptography 7/ })).toBeVisible()
  await expect(page.getByRole("button", { name: /Reverse Engineering 3/ })).toBeVisible()
  await expect(page.getByText(/Day \d+:/)).toHaveCount(0)

  await page.getByLabel("Search writeups").fill("Lazy CBC")
  await expect(page.getByRole("link", { name: /Lazy CBC/ })).toBeVisible()
  await expect(page.getByRole("link", { name: /Sakura/ })).toHaveCount(0)
})

test("about page presents a verified and focused professional profile", async ({ page }) => {
  await page.goto("/about")

  await expect(page.getByRole("heading", { name: "Alif Abedin Siyam" })).toBeVisible()
  await expect(page.getByText(/SOC Analyst.*Security Researcher.*Aspiring Penetration Tester/)).toBeVisible()
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible()
  await expect(page.getByText("SOC Analyst Trainee (Tier 1)")).toBeVisible()
  await expect(page.getByText("APU SOC Lab")).toBeVisible()

  await expect(page.getByRole("heading", { name: "Education" })).toBeVisible()
  await expect(page.getByText("BSc (Hons) Computer Science (Cyber Security)")).toBeVisible()
  await expect(page.getByRole("heading", { name: "Certifications" })).toBeVisible()
  await expect(page.getByText("Google Cybersecurity Professional Certificate")).toBeVisible()
  await expect(page.getByText("Microsoft Security Operations Analyst (SC-200)")).toBeVisible()
  await expect(page.getByText("Planned", { exact: true })).toBeVisible()
  for (const tool of ["Wazuh", "Suricata", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "Kali Linux", "Autopsy", "Ghidra"]) {
    await expect(page.getByRole("img", { name: `${tool} logo` })).toBeVisible()
  }
  for (const language of ["Python", "Bash", "SQL", "Java"]) {
    await expect(page.getByRole("img", { name: `${language} logo` })).toBeVisible()
  }

  const main = page.locator("main")
  await expect(main).not.toContainText(/GPA|VirtualBox|Security\+|IBM Cybersecurity|CySA\+|sales/i)
  await expect(main.locator('[role="progressbar"]')).toHaveCount(0)
})

test("about page remains usable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/about")

  await expect(page.getByRole("heading", { name: "Alif Abedin Siyam" })).toBeVisible()
  await expect(page.getByRole("link", { name: "View CV" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Certifications" })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test("a complete writeup renders local evidence and article navigation", async ({ page }) => {
  await page.goto("/writeups/lazy-cbc")
  await expect(page.getByRole("heading", { name: "Lazy CBC", level: 1 })).toBeVisible()
  await expect(page.getByText("Full solution · spoilers visible")).toBeVisible()
  await expect(page.getByRole("link", { name: "Writeup evidence screenshot" }).first()).toBeVisible()
  await expect(page.getByRole("link", { name: "Source on GitHub" })).toHaveAttribute("href", /github\.com\/siyam-exe/)
  await expect(page.getByRole("navigation", { name: "Article contents" })).toBeVisible()
})

test("terminal drives the five-chapter Sunroot Grove quest", async ({ page }) => {
  await page.goto("/")
  const opener = page.getByRole("button", { name: "Open terminal and CTF challenge" })
  await opener.click()
  const dialog = page.getByRole("dialog", { name: "1tsD@M0nk3 Control Node" })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("img", { name: "Animated ASCII torus and portfolio system information" })).toBeVisible()
  await expect(dialog.getByText("ZERO ASSET LOAD")).toBeVisible()
  await expect(dialog.getByText("THE LAST PEEL", { exact: true })).toBeVisible()
  await expect(dialog.getByRole("button", { name: "Start journey" })).toBeVisible()

  const input = dialog.getByLabel("Terminal command")
  await input.fill("ctf start")
  await input.press("Enter")
  await expect(dialog).toContainText("Elderbanana Tree has stopped growing")
  await input.fill("ctf accuse gribbet")
  await input.press("Enter")
  await expect(dialog).toContainText("Nobody stole it")
  await input.fill("ctf look note")
  await input.press("Enter")
  await expect(dialog).toContainText("X-Thistle-Route:")
  const terminalText = await dialog.textContent() || ""
  const encodedPath = terminalText.match(/X-Thistle-Route:\s*([A-Za-z0-9+/=]+)/)?.[1]
  expect(encodedPath).toBeTruthy()
  expect(Buffer.from(encodedPath!, "base64").toString("utf8")).toBe("/writeups/ecb-oracle#how-the-challenge-actually-works")

  await input.fill("ctf resume")
  await input.press("Enter")
  await expect(page).toHaveURL(/\/writeups\/ecb-oracle/)
  const runeClue = page.getByLabel("Sunroot Grove CTF writeup evidence")
  await expect(runeClue).toBeVisible()
  await runeClue.getByRole("button", { name: "Inspect the unusual spacing" }).click()
  const carrier = await runeClue.locator("[data-rune-carrier]").getAttribute("data-rune-carrier") || ""
  const bits = [...carrier].map((character) => character === "\u200b" ? "0" : "1").join("")
  const rune = Buffer.from(bits.match(/.{8}/g)!.map((byte) => Number.parseInt(byte, 2))).toString("utf8")
  expect(rune.length).toBeGreaterThan(2)

  await page.getByRole("button", { name: "Open terminal and CTF challenge" }).click()
  await input.fill(`ctf submit ${rune}`)
  await input.press("Enter")
  await expect(dialog).toContainText("Grum accepts the proof")
  await input.fill("ctf resume")
  await input.press("Enter")
  await expect(page).toHaveURL(/\/projects$/)
  await page.getByRole("button", { name: "Open Cybersecurity Homelab project report" }).click()
  const projectDialog = page.getByRole("dialog", { name: "Cybersecurity Homelab" })
  await projectDialog.getByRole("button", { name: "Request the build record" }).click()
  await expect(projectDialog).toContainText("Cindermaw")
  const commitRecords = projectDialog.locator(".ctf-commit-trail > div")
  await expect(commitRecords).toHaveCount(4)
  const records = await commitRecords.evaluateAll((elements) => elements.map((element) => ({
    time: element.querySelector("code")?.textContent || "",
    marker: element.getAttribute("data-marker") || "",
  })))
  const copiedMarkerWord = records.sort((a, b) => a.time.localeCompare(b.time)).map((record) => record.marker).join("")
  expect(copiedMarkerWord).toBe("RO0T")

  await projectDialog.getByRole("button", { name: "Close project details" }).click()
  await page.getByRole("button", { name: "Open terminal and CTF challenge" }).click()
  await input.fill(`ctf submit ${copiedMarkerWord}`)
  await input.press("Enter")
  await expect(dialog).toContainText("Cindermaw accepts the sequence")
  await input.fill("ctf resume")
  await input.press("Enter")
  await expect(page).toHaveURL(/\/robots\.txt$/)
  await expect(page.locator("body")).toContainText("Disallow: /api/eldersap")
  const hazelResponse = await page.goto("/api/eldersap")
  expect(hazelResponse?.status()).toBe(200)
  const hazelBody = JSON.parse(await page.locator("body").innerText()) as { ciphertext: string }
  const cipherBytes = Buffer.from(hazelBody.ciphertext, "hex")
  const keyBytes = Buffer.from(rune)
  const hazelMessage = Buffer.from(cipherBytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length])).toString("utf8")
  const hazelFragment = hazelMessage.match(/HAZEL_FRAGMENT=([A-Z]+)/)?.[1] || ""
  expect(hazelMessage).toContain("Hazel Thorne")
  expect(hazelFragment).toBe("RESEED")

  await page.goto("/")
  await page.getByRole("button", { name: "Open terminal and CTF challenge" }).click()
  await input.fill(`ctf submit ${hazelFragment}`)
  await input.press("Enter")
  await expect(dialog).toContainText("three Peelrune edges do not align")
  await input.fill("ctf resume")
  await input.press("Enter")
  await expect(page).toHaveURL(/\/projects$/)
  await page.getByRole("button", { name: "Open Cybersecurity Homelab project report" }).click()
  const verificationDialog = page.getByRole("dialog", { name: "Cybersecurity Homelab" })
  await verificationDialog.getByRole("button", { name: "Verify the soot-darkened mark" }).click()
  const correction = verificationDialog.locator("[data-verified-marker]")
  const markerPosition = Number(await correction.getAttribute("data-marker-position"))
  const verifiedMarker = await correction.getAttribute("data-verified-marker") || ""
  const correctedMarkerWord = copiedMarkerWord.split("").map((marker, index) => index === markerPosition - 1 ? verifiedMarker : marker).join("")
  expect(correctedMarkerWord).toBe("ROOT")

  await verificationDialog.getByRole("button", { name: "Close project details" }).click()
  await page.getByRole("button", { name: "Open terminal and CTF challenge" }).click()
  await input.fill(`ctf submit DAMONKE{${rune}_${correctedMarkerWord.toLowerCase()}_${hazelFragment.toLowerCase()}}`)
  await input.press("Enter")
  await expect(dialog).toContainText("Elderbanana Tree produces one new leaf")
  await expect(dialog).toContainText("PEELRUNE RESTORED")
})

test("terminal remains usable on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/about")
  await page.getByRole("button", { name: "Open terminal and CTF challenge" }).click()

  const dialog = page.getByRole("dialog", { name: "1tsD@M0nk3 Control Node" })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("img", { name: "Animated ASCII torus and portfolio system information" })).toBeVisible()
  await expect(dialog.getByLabel("Terminal command")).toBeVisible()
  await expect(dialog.getByRole("button", { name: "CTF challenge ctf" })).toBeVisible()
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
})

test("CTF API rejects tampered sessions and cross-site actions", async ({ request }) => {
  const start = await request.post("/api/ctf", { data: { action: "start" } })
  expect(start.status()).toBe(200)
  const body = await start.json() as { session: string }

  const briefing = await request.get("/api/ctf?resource=note", { headers: { "X-CTF-Session": body.session } })
  expect(briefing.status()).toBe(200)
  expect(briefing.headers()["x-thistle-route"]).toBeTruthy()

  const tampered = await request.get("/api/ctf?resource=note", { headers: { "X-CTF-Session": `${body.session}x` } })
  expect(tampered.status()).toBe(401)

  const crossSite = await request.post("/api/ctf", {
    headers: { Origin: "https://attacker.example" },
    data: { action: "start" },
  })
  expect(crossSite.status()).toBe(403)
})

test("mobile navigation exposes every primary route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Open navigation menu" }).click()
  await expect(page.getByRole("link", { name: "Home", exact: true })).toBeVisible()
  const menu = page.locator("#primary-navigation")
  for (const name of ["About", "Writeups", "Projects", "Contact"]) {
    await expect(menu.getByRole("link", { name, exact: true })).toBeVisible()
  }
})

test("project card opens a detailed report and exposes the verified repository", async ({ page }) => {
  await page.goto("/projects")
  const repository = page.getByRole("link", { name: /GitHub/ }).first()
  await expect(repository).toHaveAttribute("href", "https://github.com/siyam-exe/cybersecurity-homelab")

  const trigger = page.getByRole("button", { name: "Open Cybersecurity Homelab project report" })
  await trigger.click()
  const dialog = page.getByRole("dialog", { name: "Cybersecurity Homelab" })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText("Workflow")
  await expect(dialog).toContainText("Dashboard Evidence")
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

test("contact page provides clear professional paths and a protected form", async ({ page }) => {
  await page.goto("/contact")

  await expect(page.getByRole("heading", { name: "Let's start a conversation." })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Good conversations start with context." })).toBeVisible()
  await expect(page.getByText("SOC and security operations roles")).toBeVisible()
  await expect(page.getByText("Junior penetration testing opportunities")).toBeVisible()
  await page.getByRole("button", { name: /Copy email address/ }).click()
  await expect(page.getByText("Email address copied to your clipboard.")).toBeVisible()
  await expect(page.getByRole("link", { name: "Open email app" })).toHaveAttribute("href", "mailto:siyam.exe@gmail.com")
  await expect(page.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/siyam-exe")
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/alif-abedin-siyam/")
  await expect(page.getByRole("link", { name: /Medium/ })).toHaveAttribute("href", "https://medium.com/@siyam.exe")
  await expect(page.getByText("Response time: Usually within 24-48 hours")).toBeVisible()
  await expect(page.getByText("For urgent matters, please reach out via email directly")).toBeVisible()

  await expect(page.getByLabel("Name *")).toBeVisible()
  await expect(page.getByLabel("Email *")).toBeVisible()
  await expect(page.getByLabel("Message *")).toBeVisible()
  await expect(page.getByRole("link", { name: "privacy notice" })).toHaveAttribute("href", "/privacy")
  await expect(page.locator('[aria-label="CAPTCHA verification"], [role="alert"]').first()).toBeVisible()
  await expect(page.getByRole("button", { name: "Send Message" })).toBeEnabled({ timeout: 15_000 })
})

test("contact page remains usable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/contact")

  await expect(page.getByRole("heading", { name: "Let's start a conversation." })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Send me a message" })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test("contact endpoint rejects malformed and cross-site requests", async ({ request }) => {
  const malformed = await request.post("/api/contact", { headers: { "Content-Type": "application/json" }, data: "{" })
  expect(malformed.status()).toBe(400)

  const crossSite = await request.post("/api/contact", {
    headers: { "Content-Type": "application/json", Origin: "https://attacker.example" },
    data: {},
  })
  expect(crossSite.status()).toBe(403)
})
