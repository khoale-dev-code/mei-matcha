"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        targets.forEach((target) => {
          gsap.fromTo(
            target,
            {
              y: 38,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: {
                trigger: target,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        const staggerGroups =
          gsap.utils.toArray<HTMLElement>("[data-stagger]");

        staggerGroups.forEach((group) => {
          const children = Array.from(
            group.children,
          ) as HTMLElement[];

          gsap.fromTo(
            children,
            {
              y: 28,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.08,
              duration: 0.62,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 84%",
                once: true,
              },
            },
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-stagger] > *", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
