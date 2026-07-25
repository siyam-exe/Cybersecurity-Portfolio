# Complete Problem Backlog

This is the complete ordered audit backlog captured before the repository reset. Findings are grouped by urgency. Status is tracked in `remediation-plan.md`; no item is considered verified until its acceptance check passes.

## P0 — Fix before the next production deployment

1. **Next.js 15.5.4 has critical security vulnerabilities**, including a React Flight protocol RCE. Upgrade to an audit-approved patched version.
2. **React 19.1.0 is included in affected React Flight versions.** Upgrade `react` and `react-dom` to a patched, Next-compatible version.
3. **The production dependency audit currently fails** with critical, high, and moderate vulnerable entries.
4. **Transitive Lodash 4.17.21 has a high-severity code-injection advisory.** Upgrade or replace the parent dependencies that introduce it.
5. **Next.js contains a vulnerable PostCSS version.** Updating Next should also update its bundled PostCSS.
6. **The contact-page GitHub link is broken.** It points to `github.com/1tsD@M0nk3` instead of the owner’s account, `siyam-exe`.
7. **The same broken GitHub link exists in unused shared data**, creating another future failure point.
8. **The contact form has no serious abuse prevention:** no CAPTCHA, honeypot, rate limiting, server validation, or meaningful input-length limit.
9. **EmailJS configuration is hardcoded into the client bundle.** Public keys are designed to be public, but IDs plus no abuse controls increase spam/quota risk.
10. **The contact form sends personal data to EmailJS without a privacy notice or consent explanation.**
11. **Unknown writeup URLs return HTTP 200 with generic content**, creating soft 404s and duplicate pages.
12. **There is no `notFound()` handling for nonexistent writeup slugs.**
13. **Production builds ignore TypeScript errors**, allowing broken types to ship later.
14. **Linting is not configured:** `npm run lint` invokes deprecated `next lint` and opens an interactive prompt.
15. **`npm ci` cannot install the committed dependency set** because `vaul@0.9.9` declares React support only through React 18 while React 19 is pinned.
16. **Two competing lockfiles are committed:** `package-lock.json` and `pnpm-lock.yaml` do not provide the same installation path.
17. **No package-manager version is pinned.** Add a `packageManager` field.
18. **pnpm blocks Sharp’s install script unless approved.** Document the installation requirement or remove the dependency path.

## P1 — Credibility and portfolio-content problems

19. **Every visible project is “Coming soon.”** A portfolio needs completed evidence, not only a backlog.
20. **The four projects appear hypothetical rather than demonstrably completed:** VulnScan, ForensicAnalyzer, MyCTFPlatform, and CryptoBreaker.
21. **Neither displayed writeup is real.** They are explicitly example TryHackMe and HackTheBox rooms.
22. **Writeup detail pages openly state that they are placeholders.**
23. **The portfolio omits real work already available**, including Bakabot, Cybersecurity Homelab, and the 30-day CTF writeup repository.
24. **The résumé showcases Bakabot, but the website does not.**
25. **The website shows hypothetical projects instead of stronger real repositories.**
26. **The résumé says the website contains writeups and achievements**, but the deployed site has placeholders and no achievements section.
27. **There is no achievements page or meaningful achievement section.**
28. **The site claims findings are documented, but genuine findings are not presented.**
29. **The site claims security tools are built, but no completed security tool is linked.**
30. **Project cards lack screenshots, architecture diagrams, technical decisions, challenges, outcomes, and lessons learned.**
31. **Projects contain no source-code links.**
32. **Projects contain no working demo links.**
33. **Project link code is broken for future links:** truthy `project.github` still renders disabled buttons.
34. **Project descriptions sound polished but cannot be verified**, which can read as aspirational or generated.
35. **Writeups have no real dates.** They display “Coming Soon.”
36. **Writeups lack author, publication/update dates, methodology, screenshots, commands, remediation, and lessons learned.**
37. **No TryHackMe or Hack The Box profile is visibly used as credibility evidence.**
38. **TryHackMe and Hack The Box badge images are unused.**
39. **Skill percentages are arbitrary and unverifiable.**
40. **Skills are not connected to projects or outcomes.**
41. **Planned certifications are presented prominently.** A planned certification is not a credential.
42. **In-progress certifications have no completion estimates, credential pages, or evidence.**
43. **The site lacks a focused professional value proposition.**
44. **The homepage does not quickly communicate strongest domains** such as homelab engineering, CTF research, incident response, web security, or security operations.
45. **The alias `1tsD@M0nk3` is more prominent than the searchable professional identity.**
46. **The alias is not the GitHub username**, causing identity inconsistency and broken links.
47. **The illustrated hacker avatar may reduce professional trust** compared with the résumé photograph.
48. **The avatar creates inconsistent branding between website and résumé.**
49. **Avatar alt text calls the illustration “Alif Abedin Siyam,”** although it is not a photo of him.
50. **Social profile URLs are inconsistent across homepage, contact page, README, and data files.**
51. **Different LinkedIn URLs are used in different files.** Use one canonical URL.
52. **The footer says © 2025 even though the current year is 2026.**
53. **The footer says “Last updated: October 2025,” making the site look abandoned.**
54. **There is no visible indication of what is currently being learned, built, or sought.**
55. **There is no explicit recruiter CTA.**
56. **The contact page claims a 24–48-hour response time without a mechanism to ensure or measure it.**

## P2 — SEO and discoverability problems

57. **The homepage has no `<h1>`.**
58. **The name is rendered as an animated `<p>` instead of the primary heading.**
59. **The complete visible name is initially absent from server-rendered content** because it is typed after hydration.
60. **The name repeatedly disappears and changes to the alias**, weakening semantic stability.
61. **Every route uses the same page title.**
62. **Every route uses the same meta description.**
63. **Projects, About, Contact, Writeups, and writeup detail pages lack route-specific metadata.**
64. **The title leads with leetspeak instead of the real name and role.**
65. **No canonical URL is declared.**
66. **No `metadataBase` is configured.**
67. **No Open Graph image is defined.**
68. **The `/opengraph-image` endpoint returns 404.**
69. **No meaningful Twitter image/card configuration exists.**
70. **The `/twitter-image` endpoint returns 404.**
71. **Open Graph metadata has no production URL.**
72. **Open Graph metadata has no `siteName`.**
73. **Open Graph metadata has no locale.**
74. **The site has no Person structured data.**
75. **The site has no WebSite structured data.**
76. **Projects have no CreativeWork or SoftwareApplication structured data.**
77. **Writeups have no Article structured data.**
78. **`robots.txt` returns 404 in production.**
79. **`sitemap.xml` returns 404 in production.**
80. **There is no web-app manifest.**
81. **Placeholder projects and writeups are indexable instead of completed, removed, or marked `noindex`.**
82. **Arbitrary writeup slugs produce duplicate generic pages with 200 responses.**
83. **Individual writeup pages have generic titles rather than content-derived titles.**
84. **There are no real article publication or modification dates for search engines.**
85. **There is little indexable long-form cybersecurity content.**
86. **A public `site:` search did not surface the website during the audit.**
87. **The site relies on a Vercel subdomain instead of a custom professional domain.**
88. **The metadata `keywords` array adds little SEO value** while fundamentals are missing.
89. **No custom 404 page exists to preserve branding and navigation.**
90. **Default dynamic writeup behavior prevents proper 404 indexing signals.**
91. **There is no breadcrumb navigation or breadcrumb structured data on writeups.**
92. **There are no meaningful internal links from the homepage to featured projects or writeups.**
93. **There are no external backlinks or profile references directed toward specific portfolio content.**
94. **The README does not prominently link to the live deployment.**

## P3 — Mobile, UX, and accessibility problems

95. **There is no mobile navigation menu.**
96. **Logo plus four navigation links may compress or overflow on narrow screens.**
97. **Navigation labels become visually cramped on small widths.**
98. **The homepage intentionally hides the floating terminal button.**
99. **Mobile users do not have a practical `~` key**, making the terminal feature inaccessible from the homepage.
100. **The global `~` shortcut fires while users type in fields**, including the contact form.
101. **The terminal behaves like a modal but has no `role="dialog"`.**
102. **The terminal has no `aria-modal="true"`.**
103. **The terminal has no accessible heading associated with the dialog.**
104. **The terminal does not trap keyboard focus.**
105. **Focus is not restored to the opening button after closing.**
106. **The underlying page remains keyboard-accessible while the terminal is open.**
107. **Page scrolling is not locked while the full-screen terminal is open.**
108. **Terminal input has no `<label>` or explicit accessible name.**
109. **Active navigation lacks `aria-current="page"`.**
110. **Active navigation is communicated only visually through color and glow.**
111. **Social icon links rely mainly on `title` rather than explicit `aria-label`.**
112. **Icon-only links may have weak or empty accessible names.**
113. **Contact success/error messages are not in an `aria-live` region.**
114. **Duplicate `id="ctf-announcement"` creates invalid HTML on the writeups page.**
115. **Binary Rain is decorative but is not explicitly `aria-hidden="true"`.**
116. **Skill bars lack progress-bar roles and `aria-valuenow`.**
117. **There is no skip-to-content link.**
118. **Custom navigation and social links lack consistent strong `focus-visible` styles.**
119. **Reduced-motion support is incomplete.**
120. **Binary Rain ignores `prefers-reduced-motion`.**
121. **The looping typewriter ignores `prefers-reduced-motion`.**
122. **The blinking navbar cursor ignores `prefers-reduced-motion`.**
123. **Infinitely pulsing homepage buttons ignore `prefers-reduced-motion`.**
124. **Card hover animations are not disabled for reduced motion.**
125. **Most Framer Motion page transitions ignore reduced-motion preferences.**
126. **The homepage name continuously changes and disappears**, which can distract users.
127. **The homepage composition uses a large amount of empty first-screen space.**
128. **Typewriter animation delays identification.**
129. **Calls to action appear after the animated identity block rather than immediately.**
130. **The homepage About link uses a normal anchor instead of Next.js `Link`.**
131. **“Download CV” lacks the `download` attribute.**
132. **The homepage email link opens `mailto:` in a new tab unnecessarily.**
133. **The CTF only validates the flag while the writeups listing page is mounted.**
134. **Submitting the correct flag from another page never completes the challenge.**
135. **Submitting an incorrect flag gives no final failure result.**
136. **The console `startCTF()` helper only exists on the writeups listing page.**
137. **Floating terminal tooltip timeout cleanup is returned from an event handler**, so React does not use it.
138. **Terminal clipboard command assumes clipboard access succeeds** and reports success without handling rejection.
139. **The `echo` command lowercases user text** because it parses the lowercased command string.
140. **Homepage/main/footer height choices create unnecessary scrolling** when the hero is intended to fill a viewport.
141. **The contact form has no no-JavaScript fallback.**
142. **There is no useful fallback when EmailJS is blocked** beyond a generic error.

## P4 — Performance problems

143. **Binary Rain redraws the entire viewport every 50 ms**, approximately 20 FPS.
144. **Binary Rain uses `setInterval` instead of `requestAnimationFrame`.**
145. **Binary Rain keeps running in background tabs.**
146. **Binary Rain does not pause when offscreen or when the document is hidden.**
147. **Binary Rain does not account for device-pixel ratio**, causing blur on high-DPI screens.
148. **Resizing changes canvas dimensions without recalculating columns/drops**, leaving missing columns.
149. **Image optimization is globally disabled.**
150. **The 1080×1080 avatar is served for a roughly 192×192 visual area.**
151. **The same oversized avatar is used in multiple places.**
152. **Most route components are client components primarily for animations.**
153. **Mostly static content unnecessarily requires hydration and Framer Motion.**
154. **Main routes deliver roughly 147–154 KB of first-load JavaScript**, unnecessarily high for a small portfolio.
155. **Fifty UI component files exist while only five UI primitives are imported by active pages.**
156. **There are 54 declared runtime dependencies for a small static portfolio.**
157. **Unused dependencies increase install time, security-audit surface, and update burden.**
158. **`@vercel/analytics` is installed but not rendered.**
159. **Large chart, carousel, calendar, form, drawer, and menu libraries appear unused.**
160. **Global CSS transitions apply to every element**, causing unnecessary style work.
161. **Buttons use infinite neon pulse animations rather than interaction-driven effects.**
162. **Important homepage content depends on hydration and animation timing.**
163. **There is no Web Vitals or performance monitoring implementation.**

## P5 — Security hardening and privacy problems

164. **No Content Security Policy is set.**
165. **There is no `frame-ancestors` policy or `X-Frame-Options` protection.**
166. **No explicit Referrer Policy is set.**
167. **No Permissions Policy is set.**
168. **The contact form has only browser-level required/email validation.**
169. **There is no server-side validation because there is no server endpoint.**
170. **Name, email, and message fields have no `maxLength`.**
171. **There is no spam honeypot.**
172. **There is no per-IP or per-session submission limit.**
173. **There is no submission logging or abuse monitoring.**
174. **There is no privacy page explaining EmailJS processing.**
175. **The résumé publishes a phone number for automated scraping.**
176. **The résumé publishes a detailed residential address.**
177. **The contact email is repeated in static HTML and the PDF**, making scraping easy.
178. **The CTF flag is hardcoded in the client bundle.** This is acceptable only for an Easter egg.
179. **Flag verification is entirely client-side.**
180. **`dangerouslySetInnerHTML` is used unnecessarily for the hidden CTF comment.**
181. **No automated security-headers test exists.**
182. **No dependency-audit or Dependabot workflow is visible.**
183. **No secret-scanning or code-scanning workflow is configured.**

## P6 — Code architecture and maintainability problems

184. **Project data is duplicated between the page and `data/projects.ts`.**
185. **The two project datasets disagree:** the page has four projects while the data file has three.
186. **Writeup data is duplicated between the page and `data/writeups.ts`.**
187. **Shared writeup data is empty while the page defines two placeholders.**
188. **Social links are duplicated across homepage, contact page, README, and `data/links.ts`.**
189. **Duplicated social links disagree with one another.**
190. **None of the `data/` modules are imported by active pages.**
191. **`FlagProvider` is unused**, while separate event-based CTF state exists elsewhere.
192. **`InteractiveButton` appears unused.**
193. **`ThemeProvider` appears unused.**
194. **Unused `styles/globals.css` contains a second conflicting theme definition.**
195. **Unused badge assets remain in `public/`.**
196. **Many unused UI modules remain in `components/ui/`.**
197. **Many direct dependencies exist only for unused UI modules.**
198. **React 19 is paired with React 18 type packages.**
199. **Some dependencies use `latest` instead of a controlled version range.**
200. **No automated tests exist for routes, terminal commands, CTF behavior, or contact form.**
201. **No accessibility tests exist.**
202. **No link-checking test exists**, allowing broken URLs to ship.
203. **No SEO metadata test exists.**
204. **No CI workflow runs build, type-check, lint, audit, or tests on pull requests.**
205. **There is no custom error boundary.**
206. **There is no route-level loading UI.**
207. **There is no purposeful branded 404 page.**
208. **The contact-form catch discards the original error**, making diagnosis difficult.
209. **EmailJS is initialized inside every submission** instead of once in configuration.
210. **The same EmailJS public key is supplied through both `init()` and `send()`.**
211. **Terminal navigation uses delayed `setTimeout` calls without cleanup.**
212. **Terminal history grows indefinitely for the page session.**
213. **No content-management approach exists for adding real writeups.**
214. **Comments mention future MDX support, but no MDX system is implemented.**
215. **There is no validation schema for project or writeup data despite Zod being installed.**
216. **There is no documented environment-variable schema.**
217. **There is no project license.**

## P7 — README problems

218. **Several README headings contain corrupted `�` characters.**
219. **The clone command uses the wrong repository name:** `siyam-exe/portfolio.git` instead of `Cybersecurity-Portfolio.git`.
220. **The README does not prominently link to the live website.**
221. **There are no screenshots.**
222. **There is no animated demo of the terminal or CTF.**
223. **There is no feature-status table separating completed and planned features.**
224. **“Coming soon” features are emphasized more than actual implementation.**
225. **There is no project-directory explanation.**
226. **There are no EmailJS configuration instructions.**
227. **There are no environment-variable instructions.**
228. **There are no deployment instructions.**
229. **There is no contact-form privacy/data-processing explanation.**
230. **There is no explanation that the CTF flag is intentionally client-side.**
231. **There is no testing section.**
232. **There is no linting section.**
233. **There is no security-reporting section.**
234. **There is no dependency/package-manager policy.**
235. **There is no license section.**
236. **The README promises writeups, challenges, and functionality that do not consistently work.**
237. **The README does not warn that `startCTF()` only exists on the writeups listing page.**
238. **The README does not explain current placeholder content.**

## P8 — Résumé problems

239. **The PDF metadata title is “Blue and Gray Simple Professional CV Resume,” exposing the Canva template name.**
240. **The “REFERENCE” section is not a reference section;** it contains Wireshark, Burp Suite, Metasploit, Nmap, and other tools.
241. **The two-column layout causes extracted text to interleave sections**, reducing ATS parsing accuracy.
242. **ATS extraction produces corrupted `�` characters** where typographic dashes appear.
243. **“Vibe Coding” is likely to weaken a cybersecurity application.**
244. **The résumé claims the portfolio has writeups and achievements** that are absent or placeholders.
245. **The résumé highlights Bakabot while the website does not.**
246. **Résumé projects have no clickable GitHub links.**
247. **Résumé projects have no live-demo links.**
248. **GitHub is listed as a tool rather than as a professional profile URL.**
249. **LinkedIn is not clearly linked in the résumé.**
250. **Website avatar and résumé photograph create inconsistent branding.**
251. **The website says “BSc in Cyber Security,” while the résumé says “Bachelor of Science in Computer Science (Cybersecurity).”** Use the exact official degree name everywhere.
252. **The website emphasizes Python/Bash/Linux while the résumé says Python & Java.** Standardize skills and support them with evidence.
253. **The keylogger-removal claim is strong but may invite skepticism** without a sanitized case study or clearer context.
254. **“Achieved 12% of company sales within 40 days” is ambiguous.** Clarify what the percentage measures.
255. **The résumé contains a detailed home address unnecessary for most applications.**
256. **The résumé exposes a personal phone number in a permanently downloadable public file.**
257. **The PDF is not optimized**, although its 243 KB size is reasonable.
258. **There is no version or update date in the filename**, making currentness difficult to identify.

## Highest-return sequence

**Security upgrade → real evidence/content → broken links and soft 404s → SEO foundation → mobile/accessibility → performance → code cleanup → README and résumé alignment.**

