---
name: react-best-practices
description: Performance and rendering guardrails for this React/Next.js project.
---

# React Best Practices — MIE MATCHA

## Critical

- Avoid request waterfalls; use `Promise.all()` for independent async work.
- Avoid broad barrel imports from heavy libraries.
- Lazy-load non-critical heavy UI if introduced later.
- Use Suspense intentionally for future data sections.

## Rendering

- Keep SSR deterministic.
- Keep server/client boundary narrow.
- Hoist static data outside component render.
- Use explicit conditional rendering.
- Animate wrappers/transforms instead of expensive SVG/layout properties.

## GSAP integration

- Use `@gsap/react` / `useGSAP`.
- Register ScrollTrigger.
- Cleanup through GSAP context/matchMedia revert.
- `invalidateOnRefresh` for size-dependent horizontal scroll.
- Respect `prefers-reduced-motion`.
