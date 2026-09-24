# Tea Houses và Home responsive

## Hướng thiết kế

Tea Houses là nơi khách tìm và so sánh trà. Ảnh thật, tên dòng trà và mô tả vị
là nội dung chính. Trang dùng nền men sứ liên tục, chữ rêu và một vùng màu nâu
nhạt riêng cho Hojicha. Không có số thứ tự trang trí hay nội dung bị giấu chờ cuộn.

| Token | Màu | Vai trò |
| --- | --- | --- |
| Ivory | #F7F8F1 | Nền trang |
| Washi | #E6E9DB | Nền ảnh và trạng thái tương tác |
| Moss | #233B2B | Chữ chính, nút chính |
| Matcha | #7C9457 | Điểm nhấn, viền |
| Hojicha | #805637 | Nhận diện trà rang |

Aptos/Segoe UI dùng cho nội dung và tiêu đề nhà trà; Palatino/Georgia dùng cho
nhãn sản phẩm và tiêu đề Home. Nội dung chính 16–19 px, dòng cao 1.75–1.8.
Toàn bộ nội dung căn trái; không nhấn riêng một từ trong tiêu đề.

## Responsive

| Thành phần | Mobile <640 px | Tablet 640–1199 px | Desktop ≥1200 px |
| --- | --- | --- | --- |
| Hero Tea Houses | Chữ trước, ảnh sau | Một cột; từ 900 px chia hai | Hai cột |
| Mục chọn nhà trà | Vuốt ngang tự nhiên | Vuốt ngang; từ 900 px bám dưới header | Bám dưới header |
| Danh sách sản phẩm | Một cột | Hai cột | Ba cột; nhà có hai sản phẩm giữ hai cột |
| Nhà có một sản phẩm | Ảnh trên, chữ dưới | Ảnh và chữ cạnh nhau | Ảnh và chữ cạnh nhau |
| Hojicha | Ảnh rồi đến nội dung | Một cột; từ 900 px chia hai | Hai cột |
| Home: nghi thức | Ba bước theo chiều dọc | Ba cột | Ba cột |
| Home: nhà trà | Danh sách vuốt ngang | Danh sách vuốt ngang | Trình chiếu trên màn hình phù hợp; nếu không, dùng danh sách vuốt |

Home chỉ dùng trình chiếu cuộn khi rộng ít nhất 1024 px, cao ít nhất 900 px,
có con trỏ chính xác và không bật giảm chuyển động. Màn hình thấp, thiết bị cảm
ứng và chế độ giảm chuyển động dùng nội dung theo luồng trang tự nhiên.
Không khóa chiều cao nội dung theo một khung màn hình trên điện thoại.

Ảnh sản phẩm dùng Next/Image, kích thước `sizes` theo số cột. Ảnh hộp Marukyu
dùng contain để không cắt nắp/nhãn; ảnh bối cảnh dùng cover. Không thêm ảnh mới
hay phụ thuộc thư viện. Các đường dẫn ảnh gốc của dự án được giữ lại.

## Cấu trúc và tương tác

- Tea Houses và các phần tĩnh Home là Server Component.
- Data danh mục hiện tại trong `src/data/matcha-catalog.ts` không bị thay đổi.
  Nội dung giải thích vị trà nằm trong `src/data/tea-houses.ts`.
- Nội dung Home nằm trong `src/data/home-content.ts`; UI ở `home-flow.tsx`;
  hiệu ứng hero ở `use-hero-sequence.ts`.
- Hero giữ sequence 192 frame trên desktop phù hợp. Cache tối đa 24 ảnh, bao gồm
  ảnh đang tải. Thiết bị cảm ứng dùng ảnh tĩnh đầu sequence.
- GSAP dùng useGSAP/matchMedia và revert khi đổi chế độ hoặc rời trang.
  ResizeObserver, requestAnimationFrame và callback ảnh được cleanup.
- Danh sách vuốt hỗ trợ chạm, bàn phím và tab đến từng nhà trà.
- Các sản phẩm dẫn đến trang chi tiết hiện có; Hojicha nằm tại /tea-houses#hojicha.
- Nút/liên kết chính cao ít nhất 44 px, có trạng thái focus nhìn thấy.
- Header, các thay đổi About và gallery trong snapshot mới được giữ nguyên.

## Kiểm tra và giới hạn

Chạy từ thư mục dự án trên PowerShell:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Môi trường kiểm tra có bản source trong file Repomix mới nhất. Các binary ảnh
sản phẩm và 192 frame không đi kèm, nên kiểm tra ảnh bị giới hạn. Cần xem lại
crop và chất lượng ảnh khi chạy bản vá trong dự án có đủ `public/`.

Bản vá PowerShell sao lưu toàn bộ file chịu tác động trước khi ghi; hỗ trợ phục
hồi bằng `restore.ps1` trong thư mục backup. Bản vá không thay đổi execution
policy của Windows và không cài thêm package.
