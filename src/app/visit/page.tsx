import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { VisitExperience } from "@/components/visit/visit-experience";

export const metadata: Metadata = {
  title: "Visit · MIE MATCHA",
  description:
    "Ghé MIE MATCHA tại 25 Nguyễn Tri Phương, phường Long Hoa, Tây Ninh để khám phá matcha Nhật tuyển chọn và tìm profile hợp khẩu vị.",
};

export default function VisitPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen overflow-x-clip bg-[#ecefdd] pt-20 sm:pt-24">
        <VisitExperience />
      </main>

      <SiteFooter />
    </>
  );
}
