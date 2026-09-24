$ErrorActionPreference = "Stop"

Write-Host "[1/3] TypeScript" -ForegroundColor Green
npm run typecheck

Write-Host "[2/3] ESLint" -ForegroundColor Green
npm run lint

Write-Host "[3/3] Production build" -ForegroundColor Green
npm run build

Write-Host "All checks passed." -ForegroundColor Cyan
