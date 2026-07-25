# Overall General Problems — Completion Status

Last verified: **2026-07-25**

This file tracks the shared, site-wide category in `categorized-backlog.md`, the completed technical SEO pass, and the rewritten repository README. It does not mark final owner content approval or résumé replacement as complete.

## Status by category

| Overall category | Status | Work completed | What remains |
|---|---|---|---|
| Security, dependencies, installation, and imports | **Verified** | One pinned pnpm lockfile; controlled Node/package versions; patched Next/React/PostCSS; Sharp pinned to 0.35.3 after the July 2026 libvips advisory; `brace-expansion` pinned to 5.0.8 after its July 2026 denial-of-service advisory; zero known audit findings; unused dependencies, UI files, providers, assets, data modules, and duplicate CSS removed; type-check and ESLint restored; typed project/writeup/link sources added; error, loading, and 404 states added; terminal timers/history bounded. | No known shared code issue. Re-run the audit whenever dependencies change. |
| Shared security, privacy, and HTTP hardening | **Verified in code and production** | Server contact endpoint; server validation and field limits; origin/content-type/body-size checks; honeypot; Turnstile verification; salted client-identifier hashing; durable Upstash rate-limit path with production fail-closed behavior; server-side EmailJS delivery; consent and privacy page; no-PII error logging; CSP, clickjacking, referrer, permissions, and content-type headers; automated header/link checks; Dependabot, CodeQL, and Gitleaks workflows; server-only CTF configuration and HMAC-signed progress sessions. Production EmailJS delivery, Turnstile rejection, Upstash route operation, CTF completion, tamper rejection, and security headers have been verified. | Replace or temporarily remove the public résumé. Verify genuine CTF session expiry. |
| Shared navigation, layout, terminal, and accessibility | **Verified** | Responsive menu; active-route semantics; labelled home/menu/icon controls; skip link; focus-visible behavior; terminal available on mobile and every route; dialog semantics, dynamic focus trap, body scroll lock, focus restoration, keyboard guard, preserved echo casing, cleaned timers, bounded history, responsive command-center presentation, code-generated animated ASCII torus and system readout, structured shortcut menu, synchronized challenge status, dedicated browser investigation workspace, stage-aware feedback, reduced-motion behavior, decorative canvas semantics, and progress semantics. | No known shared terminal/accessibility issue. Re-run focused tests when commands or challenge stages change. |
| Shared performance and visual implementation | **Verified** | Binary Rain uses `requestAnimationFrame`, pauses when hidden/offscreen, respects reduced motion, handles DPR and resize; image optimization is enabled and avatar sizing is declared; infinite button pulses changed to interaction-driven effects; static route shells render as server components; Framer Motion was removed and CSS retains the entrance/hover animation; the homepage real name is present in server-rendered HTML. Vercel Speed Insights is enabled on Hobby and receiving production data; verification showed 22 data points and a desktop Real Experience Score of 99. | Monitor route-level metrics as more real traffic arrives. |
| Testing, CI, and operational quality | **Verified locally and deployed; hosted jobs externally blocked** | PR #1 is merged into `master`, Vercel deployed merge commit `bae257d9`, and the production routes were rechecked. Playwright and axe cover public routes, security headers, exact canonical/social metadata, crawl files, structured data, manifest, links, accessibility, mobile navigation, terminal, CTF, contact rejection paths, and unknown writeup 404s. Final QA confirms a clean audit, import graph, justified dependencies, no known dead custom CSS, complete writeup assets, clean public-image metadata, no tracked production secrets, and a clean local Gitleaks 8.30.1 history scan. Dependabot is enabled and reports zero open alerts after recalculating the merged default branch. | GitHub created CI, Gitleaks, and CodeQL jobs but started no steps because the account is billing-locked. Keep the passing local evidence unless GitHub later removes that external restriction. |
| SEO and discoverability foundation | **Verified locally and deployed** | Real-name-first titles; unique route descriptions; production `metadataBase`; self-canonicals; complete Open Graph and Twitter cards; branded social image; WebSite, Person, ProfilePage, CollectionPage, CreativeWork, TechArticle, ContactPage, and BreadcrumbList data matching visible content; sitemap covering six public routes and all 30 writeups; robots host/sitemap declarations while preserving the intentional CTF clue; manifest; proper writeup 404s; unfinished project excluded from structured data; automated regression assertions. Production robots and the 36-URL sitemap respond correctly. Google Search Console ownership is verified through the deployed meta tag. | The sitemap was submitted, but Google's first processing result is `Couldn't fetch` although independent Googlebot/HTTP/XML checks pass. Recheck later. Manual indexing hit the daily quota before queuing; retry priority pages after reset. Search engines control crawl timing and ranking. |

## Verification evidence

- `pnpm install --frozen-lockfile` — passes.
- `pnpm audit` — no known vulnerabilities.
- `pnpm typecheck` — passes.
- `pnpm lint` — passes.
- `pnpm build` — passes with type and lint validation enabled.
- `pnpm test:e2e` — **39 production-mode tests**, including exact canonical/social metadata, sitemap/robots/manifest/schema coverage, the complete terminal/writeup/project/robots/verification Sunroot Grove solve path, mobile terminal layout, tampered-session rejection, and cross-site request rejection.
- Production build first-load JavaScript: Home 113 KB, About 111 KB, Contact 120 KB, Projects 117 KB, Writeups 116 KB, and writeup detail 114 KB. The original main-route range was approximately 147–154 KB.

## Deployment activation checklist

The application configuration is active and verified for EmailJS, Turnstile, Upstash, and the normal CTF path. Remaining release and owner actions are:

1. Replace or temporarily remove the public résumé before the next release.
2. Keep local CI/Gitleaks evidence while GitHub's billing lock blocks hosted CI, Gitleaks, and CodeQL.
3. Verify a genuinely expired CTF production session.
4. Recheck Google sitemap processing and retry manual indexing for `/`, `/about`, `/projects`, and `/writeups` after the daily quota resets.

See `final-qa.md` for evidence, limitations, and the ordered release checklist.

## Work intentionally left for later categories

- Home, About, Writeups, Projects, and Contact copy/evidence decisions.
- Search Console ownership verification, sitemap submission, and post-deployment index monitoring.
- Final visual/content approval for the imported writeup library and detailed project report.
- Résumé/profile alignment. The repository README is complete; the current public résumé remains a release blocker, not an accepted exception.

No visual-system replacement was performed. Binary Rain, terminal styling, neon palette, typography, card language, hover behavior, and the hacker avatar remain intact.
