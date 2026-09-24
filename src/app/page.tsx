import { HeroScrollVideo } from "@/components/home/hero-scroll-video";
import { MieTextScrollAnimation } from "@/components/ui/text-scroll-animation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="overflow-x-clip">
        <HeroScrollVideo />
        <MieTextScrollAnimation />
      </main>

      <SiteFooter />
    </>
  );
}
