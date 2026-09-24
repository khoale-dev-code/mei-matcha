import Link from "next/link";

import styles from "./site-header.module.css";

export function HeaderBrand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" className={styles.brand} aria-label="MIE MATCHA — Trang chủ" onClick={onNavigate}>
      <span className={styles.brandMark} aria-hidden="true">MIE</span>
      <span className={styles.brandText} aria-hidden="true">
        <span className={styles.brandName}>MATCHA</span>
        <span className={styles.brandCaption}>JAPANESE TEA</span>
      </span>
    </Link>
  );
}
