import type { Metadata } from "next";

import { AboutMieExperience } from "@/components/about/about-mie-experience";
import { AboutFooter } from "@/components/about/about-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { aboutMieContent } from "@/data/about-mie";
import styles from "@/components/about/about-mie-experience.module.css";

export const metadata: Metadata = {
  title: "About | MIE MATCHA",
  description:
    "Câu chuyện về MIE MATCHA — một góc nhỏ ở Tây Ninh dành cho những người yêu matcha.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="about-main" className={styles.main}>
        <AboutMieExperience content={aboutMieContent} />
      </main>
      <AboutFooter address={aboutMieContent.visit.address} phone={aboutMieContent.visit.phone} />
    </>
  );
}
