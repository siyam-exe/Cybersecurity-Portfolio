# Categorized Website Backlog

This is the execution view of the complete audit. The numbered items refer to `problem-backlog.md`, which remains the master record. Fix the overall foundations first; then work through one route at a time.

## Current batch

The overall/site-wide code batch, technical SEO/discoverability pass, and repository README are complete, merged, deployed, and verified as of 2026-07-25. See `overall-status.md` and `final-qa.md` for evidence. EmailJS, Turnstile, Upstash, production security headers, the full CTF path, tamper rejection, Speed Insights ingestion, Search Console ownership, and zero-open-alert Dependabot state are verified. The public résumé, billing-blocked hosted GitHub checks, genuine CTF expiry, Google sitemap reprocessing, and post-quota indexing requests remain.

## 1. Overall general problems — shared by the website

**Status: Verified locally.** No known shared code defect from this category remains. Production service activation and monitoring checks are listed in `overall-status.md` and `operations.md`.

### 1.1 Security, dependencies, installation, and imports

These affect the application regardless of which page is open.

- **P0 security upgrades:** 1–5. Re-audit and patch Next.js, React, PostCSS, Lodash, and all other vulnerable dependency paths.
- **Broken installation/import surface:** 14–18, 198–199. Replace deprecated lint setup, choose one lockfile/package manager, pin its version, resolve React/type compatibility, and document install-script requirements.
- **Unused imports/modules/dependencies:** 155–159, 190–197. Remove unreferenced UI primitives, data modules, assets, providers, and packages only after import tracing confirms they are unused.
- **Data/import architecture:** 184–190, 213–216. Establish one typed source for projects, writeups, and social links; validate it; and make active pages import it.
- **Build/runtime reliability:** 13, 205–207, 211–212. Stop ignoring type errors, add error/loading boundaries, clean delayed navigation timers, and bound terminal history.

### 1.2 Shared security, privacy, and HTTP hardening

- **Contact abuse controls:** 8–10, 168–174, 208–210. Add server-side validation, length limits, honeypot/CAPTCHA or an equivalent control, rate limiting, privacy/consent copy, safe EmailJS initialization, useful error logging, and a fallback path.
- **Response security headers:** 164–167, 181–183. Add CSP, clickjacking protection, Referrer-Policy, Permissions-Policy, automated header tests, dependency auditing, secret scanning, and code scanning.
- **Public-data exposure:** 175–180. Reduce résumé/contact scraping exposure, document the intentionally client-side Easter-egg flag, and remove unnecessary `dangerouslySetInnerHTML`.
- **Link correctness:** 6–7, 50–51, 202. Centralize social URLs and add automated link checks so bad imports or links cannot recur.

### 1.3 Shared navigation, layout, terminal, and accessibility

- **Responsive shell:** 95–97, 140. Add a mobile menu and correct shared header/footer height and spacing without changing the cyber aesthetic.
- **Navigation semantics:** 109–112, 117–118, 130. Add `aria-current`, explicit icon labels, skip navigation, strong focus-visible styles, and framework links.
- **Terminal behavior:** 98–108, 133–139, 211–212. Make the terminal reachable on mobile, implement real dialog semantics/focus trap/scroll lock/focus restore, guard the shortcut while typing, make CTF state global, report failed flags, handle clipboard errors, preserve echo casing, and clean timers/history.
- **Motion accessibility:** 119–126. Respect `prefers-reduced-motion` across Binary Rain, typewriter, cursor, button pulses, cards, and page transitions; keep normal-motion animation intact.
- **Decorative/feedback semantics:** 113–116, 114–115. Fix live regions, duplicate IDs, decorative canvas hiding, and progress-bar semantics.

### 1.4 Shared performance and visual-system implementation

- **Binary Rain:** 143–148. Move to `requestAnimationFrame`, pause when hidden/offscreen, handle DPR and resize, and retain the recognizable effect.
- **Images and client JavaScript:** 149–154, 162–163. Re-enable suitable image optimization, size the avatar correctly, move static content toward server components, reduce hydration, and measure Web Vitals.
- **Global styling/animation:** 160–161. Scope transitions and replace infinite pulses with interaction-driven effects.
- **Design consistency:** apply `design-guardrails.md`; no visual-system replacement is implied by these fixes.

### 1.5 Testing, CI, and operational quality

- **Automated coverage:** 200–204. Add route, terminal, CTF, contact-form, accessibility, link, and SEO tests; run build, type-check, lint, audit, and tests in CI.
- **Operational docs and quality gates:** 17–18, 216–217. Document environment variables, package policy, deployment assumptions, error behavior, and licensing.

## 2. Page-specific problems

Page work should use the shared fixes above instead of reimplementing them inside each route.

### 2.1 Landing page / Home (`/`)

- **Current implementation status:** Verified locally on 2026-07-22. The original centered hacker-avatar, binary-rain, terminal, neon palette, and typewriter identity are preserved. The desktop hero alignment fits its actions at 1280 × 720 and scales without horizontal overflow at 390 × 844. The page continues into a redesigned profile overview, four selected writeups, the documented Cybersecurity Homelab, two honest certification states, and recruiter-oriented contact/CV actions. Scroll reveals, the research-loop presentation, card depth, keyboard focus, and reduced-motion fallbacks are implemented. The two large decorative hero-orbit animations were removed by owner request so Binary Rain and glow remain the dominant background effects. Final owner visual/content approval remains.
- **Professional positioning:** The hero uses the exact owner-approved line `SOC Analyst | Security Researcher | Aspiring Penetration Tester`, with all three roles emphasized equally. Its revised “friendly neighbourhood security researcher” summary stays broad while emphasizing curiosity, responsible testing, honest documentation, and sharing. Overview explains the Observe → Question → Test → Explain mindset and shows 30 published writeups, 100+ alerts triaged weekly during SOC training, and one documented project.
- **Credential scope:** The homepage certification preview contains only Google Cybersecurity Professional Certificate — earned 2025 — and Microsoft Security Operations Analyst (SC-200) — planned 2026. University education, current learning topics, tools, and other training remain on the About page instead of being mixed into the homepage credential section.
- **Featured-story selection:** `Cache Me Outside`, `Introduction to CryptoHack`, `Linux Privilege Escalation`, and `n0s4n1ty 1` were selected from the supplied Medium performance data. Together they combine the strongest recent/lifetime reader response with OSINT, cryptography, Linux privilege escalation, and web-exploitation breadth. The homepage does not expose volatile traffic numbers.
- **Identity and semantic structure:** 43–46, 57–60, 64. Lead with the real name, role, and focused value proposition; use a real server-rendered `<h1>` while preserving the typewriter look as decoration.
- **Homepage content and conversion:** 44, 54–55, 92. Add a concise overview, current focus, verified capabilities, recruiter CTA, and meaningful links to selected projects/writeups.
- **Hero usability:** 98–99, 127–132, 140, 162. Make CTAs available immediately, reduce empty space, preserve the terminal on mobile, use `Link`, and make CV behavior explicit.
- **Branding and metadata:** 47–49, 61–73. Use accurate avatar alternative text and route-specific metadata while preserving the chosen avatar direction unless explicitly changed.

### 2.2 About (`/about`)

- **Current implementation status:** Verified locally on 2026-07-22. The page uses the confirmed role line, CV-backed SOC experience, nine locally hosted branded security tools grouped into SOC/network, offensive security, and forensics/reversing, plus a separate full-width programming-language panel with recognizable Python, Bash, SQL, and Java marks. Education and certifications remain separate; three supplied training certificates are shown as completed and SC-200 is clearly planned for 2026. Personal interests, one recruiter-friendly View CV action, Contact, restrained interactive motion, and route-specific metadata are included. The duplicate Download CV action was removed. Sales experience, GPA, public location, phone number, percentage skill bars, unsupported certifications, virtualization software, and inventory-style tool clutter are excluded. Final owner visual/content approval remains.
- **Role consistency:** Keep `SOC Analyst`, `Security Researcher`, and `Aspiring Penetration Tester` consistent with the confirmed homepage positioning.
- **Professional identity consistency:** 43–46, 50–56, 251–252. Use the confirmed degree name, target roles, current learning/building status, standardized skills, canonical profile links, and honest availability/response language.
- **Evidence and credentials:** 26–29, 37–42, 54. Completed for the currently supplied CV and certificates. Keep future additions verified and keep planned certifications clearly planned.
- **Accessibility/layout:** 109–126, 127–129. Ensure the page works with keyboard and reduced motion and does not depend on animations to reveal identity.

### 2.3 Writeups listing (`/writeups`)

- **Current implementation status:** Verified in code; final owner content/visual approval remains. The two fictional examples have been removed. Thirty completed writeups and 285 local evidence images are imported from the confirmed local repository, while the two unfinished placeholders are excluded. Public titles, URLs, copy, filters, and navigation use seven technical categories without day numbers, streak language, or publication dates. Search, whole-card links, GitHub/Medium references, responsive covers, static article routes, self-canonicals, social metadata, sitemap discovery, CollectionPage/ItemList data, and automated assertions are implemented. Article-level Medium URL mapping remains optional future work.
- **Real content:** 21–23, 26, 28, 35–38, 85. Completed for the current confirmed source. Keep future additions evidence-based and exclude placeholders until their walkthroughs are complete.
- **CTF behavior:** 133–139. Make the Easter egg state available from the intended shell, provide clear success/failure feedback, preserve command casing, and handle clipboard errors.
- **Structure and SEO:** 77, 81–84, 90–92. Descriptive metadata, clean slugs, breadcrumbs, category navigation, internal links, real 404 behavior, canonical URLs, TechArticle/Breadcrumb data, and sitemap coverage are implemented and tested. Dates remain intentionally omitted because the public content model does not expose verified publication dates.

### 2.4 Individual writeup (`/writeups/[slug]`)

- **Routing correctness:** 11–12, 82–83, 89–90. Completed and tested across 30 statically generated routes; unknown slugs return a real 404.
- **Article quality:** 22, 35–36, 77, 84–85, 91. Markdown now renders as styled articles with headings, tables, commands, local screenshots, tags, visible spoiler status, desktop contents navigation, source links, and previous/next navigation. Final copy review, image-caption refinement, and Article schema remain.
- **Duplicate/placeholder control:** 81–82. Completed. Only confirmed completed content is generated; both source placeholders are excluded.

### 2.5 Projects (`/projects`)

- **Current implementation status:** Verified in code; final owner visual/content approval remains. The page presents the verified Cybersecurity Homelab, its canonical GitHub repository, a detailed terminal-style project report popup, and one neutral future-project placeholder. The four fictional project cards have been removed. Route metadata, self-canonical, social preview, CollectionPage/CreativeWork data, sitemap discovery, and placeholder exclusion from structured data are implemented and tested.
- **Credibility:** 19–20, 23–34. Replace hypothetical projects with confirmed repositories, keep only honest coming-soon placeholders, and add source/demo links, screenshots, architecture, decisions, challenges, outcomes, and lessons.
- **Links and data:** 31–33, 184–185. Use one project dataset and make verified GitHub/demo links actual links rather than disabled buttons.
- **Structured content:** 76, 81, 92. Add suitable project metadata/schema and homepage links for selected evidence.

### 2.6 Contact (`/contact`)

- **Current implementation status:** Verified locally and in production. The page leads with a direct recruiter/collaborator message, explains useful reasons to get in touch, includes the canonical GitHub, LinkedIn, Medium, and email paths, and preserves the owner-approved 24–48 hour response and urgent-email copy. The form has a clearer composition flow, responsive two-column layout, visible character limit, accessible labels and feedback, privacy consent, no-JavaScript/failure fallback, and restrained hover/status motion with a reduced-motion fallback. Server-side validation, origin/content-type/body-size checks, honeypot, Turnstile verification, hashed durable rate limiting, and EmailJS delivery are active. The owner received the production test email, invalid CAPTCHA input was rejected, and the live durable-rate-limit path did not fail closed. Final owner visual/content approval remains.
- **Correct identity links:** 6–7, 50–51. Use centralized, verified GitHub/LinkedIn/Medium URLs.
- **Form security and privacy:** 8–10, 168–177, 208–210. Add validation, limits, abuse controls, privacy notice, consent explanation, safe EmailJS configuration, diagnostics, and contact-data minimization.
- **UX/accessibility:** 100, 108, 113, 141–142. Prevent terminal shortcut interference, label fields, expose feedback to assistive technology, and provide a useful failure/no-JavaScript path.
- **Trust copy:** 54–56. Keep response-time language only if it reflects an actual workflow; otherwise use honest availability wording.

### 2.7 Shared shell: navbar, footer, avatar, Binary Rain, terminal

- **Navbar:** 95–97, 109–112, 118, 122. Responsive menu, current-page semantics, labels, focus, and reduced motion.
- **Footer:** 52–53, 188–189. Correct year/update language and centralize links.
- **Avatar:** 47–49, 150–151, 250. Optimize delivery and use accurate alt text; any identity-direction change requires approval.
- **Binary Rain:** 115, 120, 143–148. Decorative semantics, motion preference, efficient rendering, visibility pausing, DPR, and resize handling.
- **Live terminal:** 98–108, 133–139, 211–212. The functional/accessibility baseline and dedicated experience pass are verified: mobile access, dialog/focus behavior, command correctness, synchronized global state, bounded history, a responsive command-center layout, an animated code-generated ASCII torus, a compact system readout, a structured shortcut menu, visible challenge status, and useful portfolio/navigation commands.

### 2.8 Terminal experience

- **Status:** Verified locally on 2026-07-23. The floating control advertises the terminal and optional CTF. The opened terminal uses a responsive command-center layout with a shortcut sidebar, challenge card, stage indicator, output animation, processing feedback, command suggestions, keyboard history, and clear mobile presentation. Its boot screen now renders an animated 3D ASCII torus with a neofetch-style identity readout entirely in code, so it adds no image request and stops rendering when closed.
- **Commands:** Portfolio navigation, professional links, profile/status output, `ls`, `pwd`, `date`, case-preserving `echo`, `ctf start/status/resume/reset/look/accuse/submit`, the tiered `ask wizard` hint command, clear, and exit. The terminal drives the story and validates each guardian proof plus the branded `DAMONKE{...}` Peelrune; real site pages provide the evidence. `ctf accuse` remains command-compatible but Thistle rejects its premise because no theft occurred.
- **Preserved contracts:** Dialog semantics, dynamic focus trap and restoration, scroll lock, shortcut guards while typing, clipboard failure handling, cleaned timers, bounded history, reduced-motion behavior, and global availability.
- **Verification:** Desktop visual inspection plus production Playwright coverage for open/close behavior, focus restoration, command casing, mobile sizing, navigation, and the full challenge workflow.

### 2.9 Secret CTF Easter egg

- **Status:** Reframed locally on 2026-07-25 as **The Last Peel of Sunroot Grove**. There is still one five-chapter terminal-driven CTF and no standalone challenge page. Monke is restoring the Elderbanana Tree's frayed Peelrune, not solving a theft. Fenwick Barkspindle provides the route and Thistle voices the concise tiered hints.
- **Solve structure:** Inspect the `X-Thistle-Route` response header from `ctf look note`; follow it to the genuine ECB Oracle writeup; activate and decode Grum's zero-width proof word; submit it in the terminal; open the real Homelab report and chronologically order four genuine GitHub commits for Cindermaw; submit the smoke-obscured sequence; discover Hazel's endpoint through `robots.txt`; XOR its hex response with Grum's word; submit Hazel's fragment; notice that the three edges mismatch; perform one signed verification of the smoke-darkened project marker; and submit `DAMONKE{grum_cindermaw_hazel}`.
- **Implementation:** Challenge configuration, contextual guardian-answer validation, staged Thistle hints, mismatch correction, and final Peelrune verification live in a server-only module. Progress uses short-lived HMAC-signed sessions mirrored to a secure HttpOnly same-site cookie for the recon endpoint. Page clues require an active signed stage and a user action, responses are no-store, state-changing requests are same-origin JSON with body limits, and no private or privileged data is connected to the challenge.
- **Verification:** Production browser coverage independently decodes the route header, zero-width word, genuine commit chronology, and XOR-protected Hazel fragment; catches and corrects the deliberate `0/O` transcription mismatch; submits all proofs and the final Peelrune through the terminal; checks mobile usability; and rejects tampered sessions and cross-site actions.

## 3. SEO and discoverability

**Status: Verified locally and deployed on 2026-07-25.** The technical foundation is complete, Search Console ownership is verified, and real-world index monitoring remains.

- **Semantic content:** 57–60, 64, 85. The real name, role, overview, documented project, credentials, and long-form writeups are server rendered and internally linked.
- **Route metadata:** 61–73, 83–84. All six public routes and 30 writeup routes have unique titles/descriptions, production self-canonicals, shared `metadataBase`, complete Open Graph/Twitter cards, the branded `og.png`, site name, locale, and large-image preview directives.
- **Structured data:** 74–77, 91. WebSite, Person, ProfilePage, CollectionPage, ItemList, CreativeWork, TechArticle, ContactPage, and BreadcrumbList data match visible claims. No unverified dates, ratings, locations, phone numbers, or credentials were invented.
- **Crawl/index controls:** 78–82, 89–90. `robots.txt`, a 36-URL sitemap, manifest, branded 404, and proper dynamic-route 404s are present. Private APIs are excluded from the sitemap; the unfinished project is omitted from project schema.
- **Internal/external discovery:** 86, 92–94. Homepage evidence links, global navigation, article breadcrumbs, related-writeup navigation, verified GitHub/LinkedIn/Medium links, and a real-name-first repository README with the live portfolio link are in place.
- **Brand/search strategy:** 43–46, 87–88. Titles lead with or clearly include “Alif Abedin Siyam” and target-role context. A custom domain remains optional.
- **Deployment follow-up:** Ownership verification and sitemap submission are complete. Recheck Google's initial `Couldn't fetch` processing result, retry priority indexing after the daily quota resets, and monitor Page Indexing and canonical reports. Rankings and crawl timing cannot be guaranteed by code.

## 4. External artifacts and consistency

### README and repository documentation

**Status: Verified locally on 2026-07-25.** Items 218–238 were addressed with corrected encoding and clone URL; the live site and canonical profiles; a social preview; accurate feature/project/writeup/CTF descriptions; requirements and frozen installation; environment-variable exposure guidance; verification commands; content import notes; security and privacy boundaries; GitHub/Vercel deployment behavior; an honest status table; knowledge-base links; and the all-rights-reserved license. Obsolete commands, removed dependencies, outdated profiles, unsupported future features, and the résumé link were removed.

### Résumé and public profile alignment

Items 239–258. Clean PDF metadata and ATS layout, remove weak/ambiguous claims, add clickable profile/project links, standardize degree and skills, reduce address/phone exposure, align portfolio claims, and add a version/update convention.

## 5. Recommended execution order

1. **Overall foundation:** dependency/install/import/build/lint, broken shared links, security headers, form architecture, shared accessibility contracts.
2. **Home:** semantic identity, overview, CTA, and shared-shell behavior.
3. **About:** verified professional profile, skills, training, and evidence.
4. **Writeups listing and detail:** real content, routing, CTF, article structure, and safe indexing.
5. **Projects:** verified projects, evidence, links, and schema.
6. **Contact:** validated form, privacy, abuse controls, and honest trust copy.
7. **Terminal experience — complete:** focused command, layout, interaction, and presentation pass.
8. **Secret CTF Easter egg — complete:** credible multi-step challenge, feedback, state, tests, and honest limitations.
9. **SEO pass — complete and deployed:** crawl endpoints, metadata, structured data, social card, links, Google ownership verification, sitemap submission, and regression assertions. Sitemap reprocessing and post-quota indexing remain external follow-ups.
10. **Performance/accessibility regression pass:** desktop, mobile, keyboard, screen reader, and reduced motion.
11. **README complete; résumé pending:** repository documentation now describes only the implemented site. Replace or temporarily remove the public résumé before release.

## 6. Definition of done for each page

- Shared shell and security contracts pass.
- The page has verified content and no placeholder claims presented as completed work.
- Desktop and mobile layouts are checked.
- Keyboard, focus, screen-reader labels, and reduced-motion behavior are checked.
- Route metadata, internal links, and crawl behavior are checked.
- Build, type-check, lint, and relevant tests pass.
- The result is recorded in `remediation-plan.md` before moving to the next page.
