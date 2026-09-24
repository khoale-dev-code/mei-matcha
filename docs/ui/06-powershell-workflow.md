# PowerShell-first Editing Workflow

Future patches for this project should be easy to apply on Windows.

## Replace a file

```powershell
@'
<full file content>
'@ | Set-Content -Path .\src\path\file.tsx -Encoding UTF8
```

## Copy an asset

```powershell
Copy-Item .\assets\new-photo.jpg .\public\images\new-photo.jpg -Force
```

## Check after changes

```powershell
.\scripts\check.ps1
```

## Development

```powershell
.\scripts\dev.ps1
```
