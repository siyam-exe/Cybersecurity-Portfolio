# Cybersecurity Portfolio Knowledge Base

This folder is the working source of truth for the portfolio audit and rebuild. It records what is wrong, why it matters, and what should happen next.

## Current baseline

- Repository: `siyam-exe/Cybersecurity-Portfolio`
- Baseline commit: `dc0bbca` (`Update page.tsx`)
- Working rule: address one bounded item or section at a time, verify it, then record the result here.
- Visual rule: preserve the existing Binary Rain / terminal-inspired identity unless a change is explicitly approved as a design change.

## Files

- [problem-backlog.md](./problem-backlog.md) — complete ordered audit findings, P0 through P8.
- [categorized-backlog.md](./categorized-backlog.md) — working view split into overall/site-wide issues, page issues, SEO, and external artifacts.
- [remediation-plan.md](./remediation-plan.md) — grouped implementation sequence, acceptance criteria, and status.
- [design-guardrails.md](./design-guardrails.md) — what must remain visually consistent and what changes are allowed when fixing UX.
- [operations.md](./operations.md) — package policy, required environment variables, security controls, verification, and deployment checks.
- [overall-status.md](./overall-status.md) — completed shared work, verification evidence, deployment prerequisites, and what belongs to later categories.
- [final-qa.md](./final-qa.md) — final code, dependency, privacy, asset, production-integration, and release-readiness audit.

## Priority meanings

- **P0:** security, deployment, or correctness blockers before production.
- **P1:** credibility and portfolio-content blockers.
- **P2:** SEO and discoverability foundations.
- **P3:** mobile, UX, and accessibility.
- **P4:** performance.
- **P5:** security hardening and privacy.
- **P6:** architecture and maintainability.
- **P7:** README/documentation.
- **P8:** résumé alignment.

## Status vocabulary

Use `Not started`, `In progress`, `Blocked`, `Verified`, or `Deferred`. Do not mark an item complete until the relevant test, screenshot, audit, or content review has passed.

## Important scope note

The backlog contains audit findings, recommendations, and content decisions. Some items overlap or depend on information that can change, especially dependency advisories. Re-run security and dependency checks immediately before implementing those items.

## How to use the categorized view

Fix site-wide foundations before page-specific content. A page is not considered complete until its shared navigation, terminal, responsive, accessibility, security, and metadata contracts also pass. The numbered master backlog remains the complete audit record; the categorized view is an execution aid and deliberately references the original item numbers.
