# Remediation Plan

This is the implementation sequence for the backlog. It is intentionally incremental: every stage should leave the site runnable and should not replace the current visual language.

The practical work order is: **overall/site-wide foundations → one page at a time → SEO and crawl verification → documentation and résumé alignment**. See `categorized-backlog.md` for the page-by-page issue map.

## Stage 0 — Baseline and change control

1. Keep the clean GitHub clone as the baseline.
2. Create a branch or checkpoint before each bounded batch.
3. Re-run the dependency audit, build, type-check, and link checks so version-sensitive findings are current.
4. Record screenshots and route behavior before changing UI.

**Exit criteria:** baseline build is reproducible; current routes and visual identity are documented.

## Stage 1 — P0 production blockers

Address dependency vulnerabilities and installation consistency first: upgrade Next/React and vulnerable transitive packages, choose one package manager, pin its version, remove incompatible packages, restore type-checking, configure real linting, fix broken GitHub URLs, harden the contact form, add privacy disclosure, and return real 404s for unknown writeup slugs.

**Exit criteria:** clean install from documented commands, build/type-check/lint pass, dependency audit is reviewed, contact abuse controls are tested, and invalid writeups return 404.

## Stage 2 — Credible content

Replace hypothetical cards and example writeups with only verified work. Start with the Cybersecurity Homelab and other repositories the owner confirms. Remove unbuilt projects, keep an explicitly labelled coming-soon placeholder only when useful, and add evidence such as source links, screenshots, architecture, methods, outcomes, and lessons learned.

**Exit criteria:** every public claim has supporting evidence or is clearly labelled in progress/planned.

## Stage 3 — SEO foundation

Add semantic headings, route-specific metadata, canonical URLs, `metadataBase`, Open Graph/Twitter images, robots, sitemap, manifest, structured data, verified article dates when the source exposes them, breadcrumbs, internal links, and a branded 404. Keep placeholders out of structured search results.

**Exit criteria:** metadata and crawl endpoints return the intended values for every public route; invalid dynamic routes return proper 404 signals.

## Stage 4 — Mobile, UX, accessibility

Add responsive navigation, skip link, keyboard-safe terminal behavior, focus management, dialog semantics, live regions, `aria-current`, accessible icon labels, valid IDs, reduced-motion support, and mobile-friendly CTA layout. Preserve the normal-motion visual treatment.

**Exit criteria:** keyboard-only, screen-reader, reduced-motion, and narrow-viewport checks pass without losing the established theme.

## Stage 5 — Performance

Optimize Binary Rain with `requestAnimationFrame`, visibility/offscreen pausing, device-pixel-ratio handling, resize recalculation, and reduced-motion behavior. Re-enable appropriate image optimization, resize avatar assets, reduce unnecessary client components/dependencies, and replace global transitions with scoped interaction styles.

**Exit criteria:** visual effects remain recognizable, CPU/background-tab behavior is bounded, and route performance is measured.

## Stage 6 — Security hardening and privacy

Add CSP, frame-ancestors/X-Frame-Options, Referrer-Policy, Permissions-Policy, server-side validation, honeypot/rate limits, logging/monitoring boundaries, privacy page, safer résumé exposure, and documented client-side CTF limitations. Add automated header and secret/dependency checks.

**Exit criteria:** headers, form abuse controls, privacy copy, and security checks are verified in production-like conditions.

## Stage 7 — Architecture and testing

Create one typed content source, validate it, remove unused modules/assets/dependencies, align React types, replace uncontrolled versions, add error/loading boundaries, and add route, accessibility, link, SEO, terminal, CTF, and contact-form tests. Add CI for the same checks.

**Exit criteria:** one source of truth, no known dead code that matters to the site, and CI blocks regressions.

## Stage 8 — Documentation and résumé alignment

Rewrite the README with the correct clone URL, live link, screenshots, feature-status table, setup/deployment/privacy/testing/security guidance, and honest placeholder notes. Align résumé wording, degree name, links, project evidence, metadata, contact exposure, and update/version information.

**Exit criteria:** README, résumé, website, and public profiles make the same supportable claims.

## Working status

## Verified overall/site-wide batch — 2026-07-20

The shared code category is complete. The work includes dependency and dead-code cleanup, one typed content source, build/type/lint restoration, server-side contact validation and delivery, Turnstile, durable rate-limit support, privacy disclosure, security headers, responsive and accessible shared navigation, global terminal/CTF behavior, reduced-motion handling, optimized Binary Rain and static-route hydration, shared error/loading/404 states, performance monitoring, CI/browser/accessibility/link/security coverage, dependency/code/secret scanning, operational documentation, and licensing.

Verification passed: frozen install, audit with no known vulnerabilities, type-check, lint, production build, and production-mode browser tests. Exact details and deployment prerequisites are in `overall-status.md`.

Still pending by design: résumé replacement, final owner approval/PR merge, Google sitemap reprocessing and post-quota indexing requests, hosted CI/CodeQL availability, and genuine CTF-expiry verification. The repository README is rewritten; Search Console ownership is verified; the sitemap is submitted; local Gitleaks passes; Dependabot is enabled; and Speed Insights is receiving real production data. Production EmailJS, Turnstile, Upstash, security headers, and the CTF normal/tamper paths are active and verified.

| Stage | Status | Notes |
|---|---|---|
| 0. Baseline | Verified | Fresh clone and shared foundation checks pass |
| 1. P0 blockers | Verified | Shared dependency, contact, route, and configuration blockers pass locally |
| 2. Credible content | In progress | Verified homelab, writeup library, About profile, evidence-linked Home page, and recruiter-focused Contact page added; completed pages await final owner approval |
| 3. SEO | In progress | Technical implementation and Search Console ownership verified; sitemap submitted but first Google processing reports `Couldn't fetch`; indexing requests are daily-quota blocked |
| 4. UX/accessibility | In progress | Shared contracts verified; page-specific content/layout passes remain |
| 5. Performance | Verified | Shared effects, images, hydration, and monitoring implementation complete |
| 6. Hardening/privacy | In progress | Code and production services verified; the current public résumé violates the approved privacy/content rules and must be replaced or temporarily removed |
| 7. Architecture/tests | Verified locally | Shared architecture, browser, accessibility, link, audit, build, and local Gitleaks checks pass; GitHub-hosted jobs are account-billing blocked before execution |
| 8. README/résumé | In progress | README verified; résumé replacement requires an owner-approved revised document |

## Current page-by-page queue — 2026-07-22

1. **Contact — verified locally and in production:** page-specific copy, layout, canonical channels, responsive behavior, accessibility, privacy presentation, and secure-form regression checks are complete. EmailJS delivery was received; invalid Turnstile input was rejected; and the production request reached the durable Upstash-backed path without a fail-closed service error.
2. **Terminal experience — verified locally:** responsive command-center interface, lightweight animated ASCII-torus boot art, compact system readout, visible CTF entry point, structured menu, useful commands, synchronized case state, keyboard behavior, focus handling, reduced-motion fallback, and mobile layout completed.
3. **Secret CTF Easter egg — verified locally:** single five-chapter **Last Peel of Sunroot Grove** quest driven by the terminal and scattered across the real ECB Oracle writeup, Homelab report, robots discovery, and signed XOR endpoint; Grum, Cindermaw, and Hazel guardian proofs; Thistle's tiered hints; deliberate smoke-darkened `0/O` transcription mismatch; branded Peelrune submission; and automated solve/tamper coverage completed.
4. **SEO and final regression — verified locally:** crawl metadata, social preview, schemas, sitemap, robots, manifest, proper dynamic 404 behavior, and 39 production-mode regression checks pass. Production robots and sitemap checks pass. Search Console ownership, sitemap submission, hosted GitHub checks, genuine CTF-expiry verification, Speed Insights dashboard confirmation, and résumé replacement remain.

The complete final QA evidence and ordered release blockers are maintained in `final-qa.md`.
