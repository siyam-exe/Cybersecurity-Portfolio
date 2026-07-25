# Design Guardrails

## Preserve by default

- Black/near-black background with neon green and cyan accents.
- Binary Rain as a restrained decorative layer.
- Terminal-inspired navigation, labels, and Easter egg.
- Hacker avatar unless the owner explicitly chooses a different identity asset.
- Monospace-forward typography and the existing cyberpunk/console mood.
- Hover states, page transitions, and interactive cards when they remain accessible and performant.
- Existing high-level route structure: Home, About, Writeups, Projects, Contact.

## Allowed refinements

- Change copy, headings, metadata, card content, and information hierarchy.
- Add real projects, writeups, evidence, privacy, 404, and SEO endpoints.
- Add a responsive mobile menu and clearer recruiter CTAs.
- Add focus rings, reduced-motion behavior, dialog semantics, and screen-reader text.
- Adjust spacing, grid breakpoints, and content height to correct alignment or usability issues.
- Optimize animation implementation without removing the recognizable effect.

## Requires explicit approval

- Replacing the Binary Rain/terminal concept.
- Switching to a different visual theme or typography system.
- Replacing the avatar with a photograph or another identity direction.
- Rebuilding the site around a new page architecture unrelated to the current routes.
- Publishing claims, projects, credentials, phone/location data, or writeups that the owner has not confirmed.

## Review rule

Every UI-affecting batch must be checked at desktop and mobile widths, with reduced motion enabled, before it is marked verified.

