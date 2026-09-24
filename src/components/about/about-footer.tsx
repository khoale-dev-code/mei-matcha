import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./about-mie-experience.module.css";

export function AboutFooter({ address, phone }: { address: string; phone: string }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div><Link href="/" className={styles.footerBrand}>MIE MATCHA <ArrowUpRight size={15} aria-hidden="true" /></Link><p>{address}</p></div>
        <nav aria-label="Liên kết cuối trang About"><Link href="/tea-houses">Tea Houses</Link><Link href="/tea-houses#hojicha">Hojicha</Link><Link href="/visit">Visit</Link><a href={`tel:${phone}`}>Gọi MIE</a></nav>
        <span className={styles.copyright}>© 2026 MIE MATCHA</span>
      </div>
    </footer>
  );
}

