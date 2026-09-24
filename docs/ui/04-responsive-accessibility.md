# Responsive + Accessibility

## Breakpoints

- Mobile: < 640px
- Tablet: 640–1023px
- Desktop: >= 1024px

## Responsive rules

- Không có fixed width làm tràn màn hình.
- Card tea house mobile dùng gần full viewport; desktop dùng ~74vw để thấy “peek” card kế tiếp.
- Header ẩn menu text trên mobile nhưng giữ brand + call CTA.
- Hero title dùng `clamp()`.
- Ảnh dùng Next/Image + `sizes`.

## Accessibility

- Semantic `header`, `nav`, `main`, `section`, `article`, `footer`.
- `aria-label` cho brand link/nav.
- Video decorative: `aria-hidden`.
- CTA touch target >= 44px.
- Contrast ưu tiên dark moss/ivory.
- Reduced motion có fallback.
- Không render dữ liệu phụ thuộc browser/locale ở server.
