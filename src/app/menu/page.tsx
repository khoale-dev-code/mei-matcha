import type { Metadata } from "next";

import { MenuExperience } from "@/components/menu/menu-experience";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Menu nhà Mie · MIE MATCHA",
  description:
    "Menu điện tử MIE MATCHA tại Tây Ninh: Premium/Ceremonial, Classic, Hojicha và Fusion với tùy chọn size, sữa, độ ngọt và topping.",
};

export default function MenuPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen overflow-x-clip bg-[#f8f5e9] pt-20 sm:pt-24">
        <MenuExperience />
      </main>
      <SiteFooter />
    </>
  );
}
