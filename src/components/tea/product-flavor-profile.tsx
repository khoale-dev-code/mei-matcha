"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  FLAVOR_LABELS,
  type FlavorProfile,
} from "@/data/matcha-catalog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProductFlavorProfileProps = {
  profile: FlavorProfile;
};

export function ProductFlavorProfile({
  profile,
}: ProductFlavorProfileProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-profile-card]",
          {
            y: 28,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.07,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          "[data-profile-fill]",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            stagger: 0.035,
            duration: 0.62,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 79%",
              once: true,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-profile-card], [data-profile-fill]", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="grid gap-4 sm:grid-cols-2">
      {FLAVOR_LABELS.map((item, itemIndex) => {
        const value = profile[item.key];
        const isLast = itemIndex === FLAVOR_LABELS.length - 1;

        return (
          <article
            key={item.key}
            data-profile-card
            className={[
              "group rounded-[1.55rem] border border-[#17351b]/10 bg-[#fffaf0]/72 p-5 shadow-[0_8px_28px_rgba(23,53,27,0.04)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#fffaf0] hover:shadow-[0_16px_38px_rgba(23,53,27,0.08)] sm:p-6",
              isLast ? "sm:col-span-2" : "",
            ].join(" ")}
          >
            <div
              className={[
                "grid gap-5",
                isLast
                  ? "sm:grid-cols-[1fr_auto] sm:items-start"
                  : "",
              ].join(" ")}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#71854b]">
                      Taste axis {String(itemIndex + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 font-serif text-[2rem] leading-none tracking-[-0.02em] text-[#17351b]">
                      {item.label}
                    </h3>
                  </div>

                  {!isLast ? (
                    <span className="shrink-0 rounded-full border border-[#17351b]/10 bg-[#f6f1e6] px-3 py-1.5 text-[10px] font-extrabold tabular-nums text-[#17351b]/60">
                      {value}/5
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-7 text-[#17351b]/68">
                  {item.helper}
                </p>
              </div>

              {isLast ? (
                <span className="w-fit shrink-0 rounded-full border border-[#17351b]/10 bg-[#f6f1e6] px-3 py-1.5 text-[10px] font-extrabold tabular-nums text-[#17351b]/60">
                  {value}/5
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className="h-2 overflow-hidden rounded-full bg-[#17351b]/10"
                >
                  <span
                    data-profile-fill={index < value ? "" : undefined}
                    className={[
                      "block h-full w-full rounded-full",
                      index < value
                        ? "bg-[#71854b]"
                        : "bg-transparent",
                    ].join(" ")}
                  />
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
