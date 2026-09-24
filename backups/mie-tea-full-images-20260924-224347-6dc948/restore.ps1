#Requires -Version 5.1
[CmdletBinding()]
param([string]$ProjectRoot = '')
$ErrorActionPreference = 'Stop'
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
if ([string]::IsNullOrWhiteSpace($ProjectRoot)) { $ProjectRoot = $manifest.ProjectRoot }
$projectPath = (Resolve-Path -LiteralPath $ProjectRoot).Path
foreach ($entry in $manifest.Files) {
    $target = Join-Path $projectPath $entry.Path
    if ($entry.Existed) {
        New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
        Copy-Item -LiteralPath (Join-Path $PSScriptRoot $entry.Backup) -Destination $target -Force
    } elseif (Test-Path -LiteralPath $target -PathType Leaf) {
        Remove-Item -LiteralPath $target -Force
    }
}
Write-Host 'Original Tea Houses image layouts restored.' -ForegroundColor Green
