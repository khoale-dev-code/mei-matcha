---
name: mie-matcha-project-rules
description: Local conventions for future MIE MATCHA development and PowerShell-first handoff.
---

# MIE MATCHA Project Rules

## Mandatory conventions

1. Clean code: data, UI, animation logic và types tách riêng.
2. Server Component mặc định; chỉ thêm `"use client"` khi có browser state/GSAP/event logic.
3. Không dùng `Date.now()`, `Math.random()`, browser locale hoặc `typeof window` để quyết định JSX server-rendered.
4. Mọi ScrollTrigger phải cleanup/revert khi component unmount.
5. Animation phải có reduced-motion fallback.
6. Không hotlink ảnh Google Drive trong production; copy asset vào `public/`.
7. Responsive từ mobile lên desktop; không “desktop rồi scale xuống”.
8. Ảnh dùng `next/image` nếu là image content thông thường.
9. Data tea house nằm ở `src/data/tea-houses.ts`.
10. Trước khi kết thúc thay đổi lớn: chạy `npm run typecheck`, `npm run lint`, `npm run build`.

## PowerShell-first workflow

Khi ChatGPT hướng dẫn sửa dự án này về sau, ưu tiên lệnh PowerShell chạy được trên Windows, ví dụ:

```powershell
Set-Location .\mie-matcha
Copy-Item .\source.jpg .\public\images\target.jpg -Force
npm run typecheck
```

Khi thay toàn bộ nội dung file, dùng here-string + `Set-Content -Encoding UTF8`.

```powershell
@'
...file content...
'@ | Set-Content -Path .\src\example.tsx -Encoding UTF8
```
