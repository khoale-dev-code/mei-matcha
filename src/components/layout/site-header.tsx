"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { useScroll } from "@/components/ui/use-scroll";
import { siteNavigation, sitePhone } from "@/data/site-navigation";
import { HeaderBrand } from "./header-brand";
import { MobileNavigation } from "./mobile-navigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScroll(12);

  return (
    <header className={styles.header} data-scrolled={scrolled ? "true" : "false"}>
      <div className={styles.shell}>
        <HeaderBrand />
        <div className={styles.desktopNav}>
          <NavBar items={siteNavigation} />
        </div>
        <div className={styles.actions}>
          <a href={sitePhone.href} className={styles.callButton} aria-label={`Gọi MIE MATCHA: ${sitePhone.label}`}>
            <Phone size={17} strokeWidth={1.8} aria-hidden="true" />
            <span className={styles.phoneLabel}>{sitePhone.label}</span>
          </a>
          {/* Remount closes the dialog on browser history or other route changes. */}
          <MobileNavigation key={pathname ?? "/"} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
