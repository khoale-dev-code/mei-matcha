$ErrorActionPreference = "Stop"

Write-Host "[MIE MATCHA] Checking Node.js..." -ForegroundColor Green
$nodeVersion = node --version
if (-not $nodeVersion) {
  throw "Node.js not found. Install Node.js 20.9+ (Node 22 LTS recommended)."
}
Write-Host "Node: $nodeVersion"

Write-Host "[MIE MATCHA] Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "[MIE MATCHA] Running typecheck..." -ForegroundColor Green
npm run typecheck

Write-Host "Setup complete. Run .\\scripts\\dev.ps1" -ForegroundColor Cyan
