"use client";

import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useId } from "react";

import { siteNavigation, sitePhone } from "@/data/site-navigation";
import { routeIsActive } from "@/lib/navigation";
import { HeaderBrand } from "./header-brand";
import { useMobileDialog } from "./use-mobile-dialog";
import styles from "./site-header.module.css";

export function MobileNavigation({ pathname }: { pathname: string | null }) {
  const id = useId();
  const { dialogRef, openDialog, closeDialog } = useMobileDialog();

  return (
    <div className={styles.mobileOnly}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label="Mở menu điều hướng"
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={openDialog}
      >
        <Menu size={21} strokeWidth={1.7} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id={id}
        className={styles.dialog}
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right ||
              event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
        }}
      >
        <div className={styles.dialogHeader}>
          <HeaderBrand onNavigate={closeDialog} />
          <button className={styles.closeButton} type="button" onClick={closeDialog} aria-label="Đóng menu">
            <X size={22} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.dialogBody} data-lenis-prevent>
          <p id={`${id}-title`} className={styles.menuEyebrow}>Khám phá MIE</p>
          <nav aria-label="Điều hướng di động" className={styles.mobileNav}>
            {siteNavigation.map((item, index) => (
              <Link
                key={item.url}
                href={item.url}
                aria-current={routeIsActive(pathname, item.url) ? "page" : undefined}
                className={styles.mobileLink}
                onClick={closeDialog}
              >
                <span className={styles.linkNumber} aria-hidden="true">0{index + 1}</span>
                <span className={styles.mobileLinkCopy}>
                  <span className={styles.mobileLinkTitle}>{item.name}</span>
                  <span className={styles.mobileLinkDescription}>{item.description}</span>
                </span>
                <ArrowUpRight className={styles.linkArrow} size={20} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <p className={styles.menuNote}>Một chút chậm, một ngụm trà.</p>
            <Link href="/visit" className={styles.visitButton} onClick={closeDialog}>
              Ghé MIE hôm nay <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={sitePhone.href} className={styles.menuPhone} onClick={closeDialog} aria-label={`Gọi MIE MATCHA: ${sitePhone.label}`}>
              <Phone size={16} strokeWidth={1.8} aria-hidden="true" />
              {sitePhone.label}
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
