# Motion / GSAP Specification

## Hero scrub

`ScrollTrigger` pin section từ `top top` đến `+=300%`.

`progress 0 → 1` map trực tiếp tới `video.currentTime 0 → duration`.

- Không autoplay timeline độc lập.
- Scroll chính là input điều khiển video.
- Khi progress đạt 1, pin hết và browser tiếp tục scroll xuống section sau.
- Progress bar cập nhật theo cùng progress.
- Copy giảm opacity dần ở phần giữa để ưu tiên hình ảnh cuối video.

## Tea house horizontal section

Chỉ bật ở `min-width: 1024px` + `prefers-reduced-motion: no-preference`.

Khoảng scroll được tính từ `track.scrollWidth - viewportWidth`, dùng `invalidateOnRefresh` để resize vẫn đúng.

## Reveal

Dùng component `Reveal`:

- opacity 0 → 1
- y 34px → 0
- `power3.out`
- trigger tại khoảng 88% viewport
- once

## Accessibility

Nếu `prefers-reduced-motion: reduce`:

- Bỏ pin/scrub.
- Không animate reveal.
- Hero vẫn hiển thị poster/video frame đầu.
