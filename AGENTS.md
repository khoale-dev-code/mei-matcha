# Agent Instructions — MIE MATCHA

Use `skills/project-rules.md` as the authoritative local development convention.

Validate significant changes with:

```powershell
npm run typecheck
npm run lint
npm run build
```

Do not introduce hydration-unstable rendering (`Math.random()`, `Date.now()`, browser locale formatting in SSR output).
