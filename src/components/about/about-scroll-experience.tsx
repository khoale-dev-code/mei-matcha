"use client";

import { useRef, type ReactNode } from "react";
import { useAboutSlides } from "./use-about-slides";
import styles from "./about-mie-experience.module.css";

export function AboutScrollExperience({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useAboutSlides(rootRef);

  return <div ref={rootRef} className={styles.experience}>{children}</div>;
}
