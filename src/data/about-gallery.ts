export type AboutGalleryImage = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  position: string;
};

// Add another entry here after copying its photo into public/images/about/.
export const aboutGallery: readonly AboutGalleryImage[] = [
  {
    src: "/images/about/mie-counter.jpg",
    alt: "Quầy trà MIE với những hộp matcha Nhật Bản và dụng cụ pha trà",
    title: "Một góc trà, rất MIE.",
    caption: "Những dòng trà được chọn, những chén trà được chăm.",
    position: "50% 62%",
  },
  {
    src: "/images/products/marukyu/marukyu-koyamaen.jpg",
    alt: "Những hộp matcha Marukyu Koyamaen trong bộ sưu tập của MIE",
    title: "Tuyển chọn từ Nhật Bản.",
    caption: "Mỗi dòng matcha mang một sắc thái hương vị riêng.",
    position: "50% 50%",
  },
];
