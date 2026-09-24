# MIE MATCHA — Starter Homepage

Starter frontend cho **MIE MATCHA** với định hướng premium Japanese tea / modern editorial.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript strict
- Tailwind CSS v4
- GSAP 3 + ScrollTrigger + `@gsap/react`
- Next/Image cho ảnh sản phẩm
- Không dùng random/time/locale-dependent rendering trong SSR để hạn chế hydration mismatch

## Homepage hiện có

1. **Hero scroll-video**: video MP4 được pin; cuộn trang sẽ scrub theo timeline video. Khi scrub hết, trang tự nhiên unpin và tiếp tục xuống nội dung bên dưới.
2. **About MIE**: câu chuyện thương hiệu + ảnh từ Google Drive.
3. **Tea House Showcase**: desktop dùng horizontal pinned scroll; mobile/tablet hiển thị dọc để thao tác tự nhiên.
4. **Hojicha Feature**: section màu rang ấm để tạo nhịp tương phản.
5. **Visit MIE**: địa chỉ, số điện thoại và CTA mở Google Maps.

## Chạy dự án

### PowerShell

```powershell
cd .\mie-matcha
.\scripts\setup.ps1
.\scripts\dev.ps1
```

Hoặc chạy trực tiếp:

```powershell
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Kiểm tra trước khi deploy

```powershell
.\scripts\check.ps1
```

Script chạy lần lượt: `typecheck` → `lint` → `build`.

## Hero video

File demo nằm tại:

```text
public/videos/hero-matcha.mp4
```

Bạn có thể thay bằng MP4 thật, giữ nguyên tên file để không cần sửa code. Khuyến nghị:

- H.264 MP4
- 1920×1080 hoặc 1280×720
- 6–12 giây
- 24/30 fps
- `faststart`
- dung lượng mục tiêu dưới 8–12 MB cho homepage

Logic scrub nằm ở `src/components/home/hero-scroll-video.tsx`.

## Ảnh

Ảnh starter được lấy từ folder Google Drive mà chủ dự án cung cấp và copy vào `public/images/` để website không phụ thuộc hotlink Drive khi chạy production.

Xem `docs/ui/05-content-assets.md` để biết mapping ảnh.

## Quy tắc sửa code về sau

Đọc `skills/project-rules.md`. Khi ChatGPT hỗ trợ sửa dự án này, ưu tiên trả về **PowerShell commands** để người dùng chạy trực tiếp trên Windows.
