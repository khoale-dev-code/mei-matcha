import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "MIE MATCHA · Tây Ninh",
  description:
    "MIE MATCHA — matcha Nhật Bản tuyển chọn, được đánh thủ công bằng chasen tại Tây Ninh.",
  openGraph: {
    title: "MIE MATCHA · Tây Ninh",
    description:
      "Một góc nhỏ ở Tây Ninh dành cho những người yêu matcha.",
    images: ["/images/mie-hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#142012",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
