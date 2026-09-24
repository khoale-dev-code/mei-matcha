"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "journey", label: "Taste journey" },
  { id: "profile", label: "Profile" },
  { id: "house", label: "Tea house" },
  { id: "compare", label: "Compare" },
] as const;

export function ProductDetailSectionNav() {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const sections = ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((item): item is HTMLElement => Boolean(item));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );

        const next = visible[0]?.target.id;

        if (next) {
          setActiveId(next);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-24 z-30 border-y border-[#17351b]/10 bg-[#f6f1e6]/95 backdrop-blur-xl">
      <nav
        aria-label="Product detail sections"
        className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12"
      >
        {ITEMS.map((item, index) => {
          const active = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              className={[
                "group inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71854b]",
                active
                  ? "!border-[#17351b] !bg-[#17351b] !text-[#fffaf0]"
                  : "border-[#17351b]/12 bg-[#fffaf0]/72 text-[#17351b]/70 hover:-translate-y-0.5 hover:border-[#71854b]/35 hover:bg-white hover:text-[#17351b]",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[9px] tabular-nums",
                  active
                    ? "!text-[#d3f08b]"
                    : "text-[#71854b]",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={
                  active
                    ? "!text-[#fffaf0]"
                    : "text-current"
                }
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
