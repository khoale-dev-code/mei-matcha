"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routeIsActive } from "@/lib/navigation";
import styles from "@/components/layout/site-header.module.css";

export type TubelightNavItem = {
  name: string;
  url: string;
  icon?: LucideIcon;
};

type NavBarProps = {
  items: readonly TubelightNavItem[];
  className?: string;
  compact?: boolean;
};

export function NavBar({ items, className, compact = false }: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Điều hướng chính" className={[styles.nav, className].filter(Boolean).join(" ")} data-compact={compact || undefined}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.url}
            href={item.url}
            className={styles.navLink}
            aria-current={routeIsActive(pathname, item.url) ? "page" : undefined}
          >
            {Icon ? <Icon className={styles.navIcon} size={17} aria-hidden="true" /> : null}
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
