# Final QA and Release Readiness

Last audited: **2026-07-25**

## Release verdict

The rebuilt application is merged and deployed to production. Installation is reproducible, the dependency audit is clean, all static checks pass, the production build succeeds, all 39 browser tests pass, and the production routes were rechecked against the merged commit.

One owner-content issue prevents an unconditional release approval:

1. The currently public résumé conflicts with the approved privacy and credibility rules.

PR #1 was merged into `master` as `bae257d9b10b7f89ecbaa5172319c0a491eaee4e`, and Vercel successfully deployed that exact commit. Production EmailJS, Turnstile, Upstash, security headers, Google verification, crawl endpoints, and the CTF's normal and tamper-rejection paths have been verified. External checks that remain unavailable or pending are recorded below rather than treated as complete.

## Automated QA evidence

| Check | Result | Notes |
|---|---|---|
| Frozen dependency install | **Passed** | `pnpm install --frozen-lockfile` |
| Dependency vulnerability audit | **Passed** | `pnpm audit` reports no known vulnerabilities |
| TypeScript | **Passed** | `pnpm typecheck` |
| ESLint | **Passed** | `pnpm lint` |
| Production build | **Passed** | 45 static pages generated |
| Browser/regression suite | **Passed** | 39 of 39 Playwright tests |
| Import graph | **Passed** | 57 source files, no unresolved local imports, no unused non-entry source modules |
| CSS usage | **Passed** | No known unused custom selectors after removing obsolete CTF and component styles |
| Dependency usage | **Passed** | All runtime dependencies are justified; React DOM remains as the required framework peer |
| Writeup integrity | **Passed** | 30 unique slugs, 286 image references, no missing references, no orphan writeup images |
| Public assets | **Passed** | All tool logos are referenced; unused badges were removed |
| Secret scan | **Passed** | No production credentials, private keys, or provider tokens found in tracked source |
| Local Gitleaks 8.30.1 | **Passed** | Five educational JWT/CryptoHack false positives were reviewed and fingerprint-ignored; the full six-commit scan reports no leaks |
| Public image metadata | **Passed** | 293 raster assets checked; no GPS/location, identity, email, local-path, or private-IP metadata found |
| HTTP hardening | **Passed in production** | CSP, HSTS, frame denial, referrer, permissions, and content-type protections present; framework signature header absent |
| Crawl endpoints | **Passed in production** | `robots.txt` and the 36-URL sitemap respond correctly |

The included CI workflow also repeats install, audit, type-check, lint, build, browser tests, and secret scanning. PR #1 and the merge commit triggered all workflows, but GitHub refused to start the CI, Gitleaks, and CodeQL jobs because the account is locked for billing. No hosted step executed, so these red checks are infrastructure failures rather than test failures. The matching local audit, type-check, lint, build, Playwright, and Gitleaks checks passed.

## Cleanup completed

- Removed unused generated UI primitives, hooks, providers, data modules, assets, and duplicate global CSS.
- Removed the remaining unused `confetti` and `skill-bar` components.
- Removed obsolete standalone-CTF selectors and animations that no longer had consumers.
- Reduced the application to one pnpm lockfile and pinned the package manager.
- Confirmed every remaining runtime package has a real application or framework role.
- Added local agent documentation, lock metadata, and QA temporary output to `.gitignore`.
- Confirmed there are no application `TODO`, `FIXME`, `HACK`, `debugger`, or debug-console remnants.

## KISS and maintainability assessment

The current structure is appropriately simple for this portfolio:

- Content is centralized and typed instead of duplicated across pages.
- Shared site behavior is implemented once through layout, navigation, terminal, content, security, and structured-data modules.
- The app retains only the small UI primitive set it actually imports.
- There is one package manager, one lockfile, one test runner, and one documented verification command sequence.
- The terminal and project showcase are larger modules because they represent cohesive interactive experiences. Splitting them only to reduce line count would add indirection without improving reliability.

No broad refactor is recommended immediately before release. Future changes should remain evidence-driven and avoid adding packages for behavior that can be expressed clearly with the existing stack.

## Release blockers and next actions

### P0 — Replace or temporarily remove the public résumé

The deployed résumé visibly includes private contact/location information and outdated content that conflicts with the approved website profile, including excluded experience, GPA, skills, and unsupported project claims.

Do not publish the next release with that PDF linked. Choose one of these actions:

1. Upload a revised résumé that follows the approved public-content rules, then restore the link.
2. Temporarily remove the résumé link and public PDF until the replacement is ready.

The résumé was reviewed only for release risk; it was not edited.

### Release deployment — completed

The complete rebuild was reviewed through PR #1 and merged into `master` as `bae257d9b10b7f89ecbaa5172319c0a491eaee4e`. Vercel reported a successful deployment for that commit, and the local checkout is synchronized with `origin/master`.

Keep the complete local QA and Gitleaks evidence while the GitHub billing lock prevents hosted CI and CodeQL. Retry those hosted workflows only if GitHub removes the account lock; paying for Actions is not required for the site to remain deployed.

Dependabot vulnerability alerts and security updates are enabled. Before the merge, activation exposed 72 alerts on the obsolete default-branch lockfiles. After the rebuilt dependency tree reached `master`, GitHub recalculated the repository to **zero open Dependabot alerts**. The production tree also reports no known vulnerabilities through `pnpm audit`.

### P1 — Finish external production verification

- **CTF expiry:** the complete production solve and tampered-session rejection passed. Genuine two-hour expiry remains unproven because the local and production signing secrets differ; an old production token cannot distinguish expiry from a signature mismatch. Verify with a controlled short-TTL staging configuration or wait for a real production session to expire and resume it.
- **Speed Insights:** enabled on the Vercel Hobby project and receiving production traffic. The dashboard reported 22 data points, a desktop Real Experience Score of 99, and route-level data during verification.
- **Google Search Console:** ownership is verified through the deployed meta tag and `/sitemap.xml` was submitted. Google accepted the submission but its first processing result is `Couldn't fetch`, despite repeated public and Googlebot HTTP 200 responses, valid XML, and 36 well-formed HTTPS URLs. Recheck after Google processes the new property. Manual homepage indexing hit the daily quota before it could be queued; retry the homepage, About, Projects, and Writeups after the quota resets.

### P2 — Résumé and profile alignment

- The repository README is rewritten for the current architecture, commands, security controls, deployment process, content status, and live URL.
- Align the revised résumé and public profiles with the same verified project, credential, role, and privacy claims.

## Production integration status

| Integration | Status | Evidence |
|---|---|---|
| EmailJS | **Verified** | Authenticated production send returned success and the owner received the message |
| Cloudflare Turnstile | **Verified** | Deliberately invalid production token was rejected with a CAPTCHA-specific response and no email was sent |
| Upstash rate limiting | **Verified through live route** | Production request reached CAPTCHA only after the durable Redis rate-limit pipeline completed; fail-closed error paths were not triggered |
| CTF normal flow | **Verified** | Full server-authoritative flow completed and the derived final submission was accepted |
| CTF tamper rejection | **Verified** | Modified session state was rejected with an unauthorized response |
| CTF genuine expiry | **Pending** | Requires a real expired production session or controlled short-TTL staging test |
| Vercel Speed Insights client | **Verified** | Production script and vitals endpoint respond |
| Vercel Speed Insights dashboard ingestion | **Verified** | Enabled on Hobby and receiving production route/metric data |
| GitHub hosted CI/Gitleaks/CodeQL | **Blocked externally** | PR jobs were created but GitHub did not start any steps because of an account billing lock |
| Local Gitleaks | **Verified** | Full history scan passes after fingerprint-specific educational false-positive review |
| Dependabot | **Verified** | Alerts and security updates are enabled; GitHub recalculated the merged `master` dependency tree to zero open alerts |
| Google Search Console ownership | **Verified** | Production verification meta is live and ownership auto-verified |
| Google sitemap processing | **Submitted; recheck required** | Google currently reports `Couldn't fetch`; independent HTTP/XML/URL validation passes |
| Manual indexing requests | **Quota blocked** | Search Console daily quota prevented the homepage request; retry priority URLs after reset |

## Residual, non-blocking notes

- The CSP retains the inline-script allowances currently required by the Next.js deployment. A nonce-based policy can be evaluated later, but should not be introduced as an untested release refactor.
- The expected framework log produced while testing an unknown writeup route accompanies a passing 404 test and is not an application failure.
- Re-run the complete verification sequence after changing dependencies, environment configuration, the résumé, or challenge logic.
