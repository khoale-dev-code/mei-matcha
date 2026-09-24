#Requires -Version 5.1
[CmdletBinding()]
param([string]$ProjectRoot = "")

$ErrorActionPreference = "Stop"

$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot "manifest.json") -Raw | ConvertFrom-Json

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    $ProjectRoot = $manifest.ProjectRoot
}

foreach ($entry in $manifest.Files) {
    $target = Join-Path $ProjectRoot $entry.Path
    $source = Join-Path $PSScriptRoot $entry.Backup

    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $target) | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Force
}

Write-Host "Original Home files restored." -ForegroundColor Green