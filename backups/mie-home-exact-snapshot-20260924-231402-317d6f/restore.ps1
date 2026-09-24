#Requires -Version 5.1
[CmdletBinding()]
param([string]$ProjectRoot = "")

$ErrorActionPreference = "Stop"
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot "manifest.json") -Raw | ConvertFrom-Json

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    $ProjectRoot = $manifest.ProjectRoot
}

$root = (Resolve-Path -LiteralPath $ProjectRoot).Path

foreach ($entry in $manifest.Files) {
    $target = Join-Path $root $entry.Path

    if ($entry.Existed) {
        $source = Join-Path $PSScriptRoot $entry.Backup
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $target) | Out-Null
        Copy-Item -LiteralPath $source -Destination $target -Force
    }
    elseif (Test-Path -LiteralPath $target -PathType Leaf) {
        Remove-Item -LiteralPath $target -Force
    }
}

Write-Host "Pre-rollback Home files restored." -ForegroundColor Green