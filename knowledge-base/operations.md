# Operations and Security Configuration

The application uses Node.js 20.9 or newer and the pinned pnpm version in `package.json`. Use `pnpm install --frozen-lockfile`; do not add a second lockfile.

## Required production variables

Copy `.env.example` to a local, untracked environment file and configure:

- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` for server-side message delivery.
- `EMAILJS_PRIVATE_KEY` when the EmailJS account supports private API authentication.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` for Cloudflare Turnstile.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for the durable contact-form rate limit.
- `RATE_LIMIT_SALT` with a long random value used only to hash client identifiers.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with the HTML-tag verification token from Google Search Console. This value is public by design.
- `CTF_SIGNING_SECRET` with a long random value for signing short-lived challenge sessions.
- `CTF_RUNE_WORD` for the repeating-key XOR/rune step. Keep it server-only and do not prefix it with `NEXT_PUBLIC_`. Existing local environments may temporarily use the legacy `CTF_UNLOCK_ANSWER` fallback.

Production contact requests fail closed when CAPTCHA, durable rate limiting, or the hashing salt is unavailable. Development uses an in-memory rate-limit fallback. The public form never receives the EmailJS private key or the rate-limit credentials.

## Verification

Run these checks before deployment:

```text
pnpm install --frozen-lockfile
pnpm audit
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

CI repeats the audit, type, lint, build, route, header, link, accessibility, terminal, CTF, and contact-endpoint checks. Dependabot monitors npm and GitHub Actions dependencies. CodeQL and Gitleaks provide code and secret scanning.

## Privacy and logging

The contact endpoint validates length and format, checks same-origin browser requests, verifies Turnstile, rate-limits a salted hash of the client address, and sends the accepted message to EmailJS. Application logs record failure categories and service status only; they do not intentionally log names, email addresses, message bodies, CAPTCHA tokens, or raw client addresses.

The current résumé must not remain publicly linked in the next release. The 2026-07-25 QA review found private contact/location information and outdated claims that conflict with the approved public profile. Replace it with an owner-approved public version or temporarily remove the résumé link and file.

## Easter egg

The Last Peel of Sunroot Grove is a recreational five-chapter challenge, not an authentication or authorization boundary. It runs through the shared terminal and evidence embedded into existing writeup/project routes; there is no standalone CTF page. Progress, guardian-proof validation, mismatch correction, and final Peelrune verification stay server-authoritative through short-lived HMAC-signed state in `sessionStorage` plus an HttpOnly same-site cookie for the robots-discovered endpoint. Evidence responses are no-store, state-changing requests require same-origin JSON, and tampered supplied sessions are rejected. The challenge must never protect real data, administrative functions, or privileged access.

## Deployment checks

EmailJS delivery, Turnstile rejection, the live Upstash-backed contact path, production security headers, the complete CTF solve, and CTF tamper rejection have been verified.

Before release:

1. Replace or temporarily remove the current public résumé.
2. Commit and push the reviewed working tree.
3. Confirm hosted CI, Gitleaks, CodeQL, and Dependabot on that commit.
4. Verify a genuinely expired production CTF session or use a controlled short-TTL staging test.
5. Confirm production traffic in the signed-in Vercel Speed Insights dashboard.
6. Add the Google Search Console verification value, deploy it, submit the sitemap, and request priority indexing.

See `final-qa.md` for the complete evidence and limitations.
