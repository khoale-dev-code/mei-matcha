"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, MapPin, Navigation, Phone, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { AboutMieContent } from "@/data/about-mie";
import styles from "./visit-mie-section.module.css";

gsap.registerPlugin(ScrollTrigger);

type VisitMieSectionProps = {
  visit: AboutMieContent["visit"];
};

export function VisitMieSection({ visit }: VisitMieSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          section.querySelectorAll(
            "[data-visit-reveal], [data-visit-card], [data-visit-cta]",
          ),
          { clearProps: "all", opacity: 1 },
        );
      });

      mm.add(
        {
          mobile: "(max-width: 767px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          desktop: "(min-width: 1024px)",
          motionOK: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions;
          if (!conditions?.motionOK) return;

          const isDesktop = Boolean(conditions.desktop);
          const isMobile = Boolean(conditions.mobile);

          const revealItems = section.querySelectorAll("[data-visit-reveal]");
          const infoCards = section.querySelectorAll("[data-visit-card]");
          const ctaItems = section.querySelectorAll("[data-visit-cta]");

          gsap.set(revealItems, {
            y: isMobile ? 24 : 38,
            opacity: 0,
          });

          gsap.set(infoCards, {
            y: isMobile ? 18 : 26,
            opacity: 0,
          });

          gsap.set(ctaItems, {
            x: isDesktop ? 28 : 0,
            y: isDesktop ? 0 : 18,
            opacity: 0,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: isMobile ? "top 92%" : "top 86%",
              once: true,
            },
            defaults: { ease: "power3.out" },
          });

          timeline
            .to(revealItems, {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.52 : 0.68,
              stagger: isMobile ? 0.05 : 0.07,
            })
            .to(
              infoCards,
              {
                y: 0,
                opacity: 1,
                duration: isMobile ? 0.48 : 0.6,
                stagger: 0.06,
              },
              "-=0.28",
            )
            .to(
              ctaItems,
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: isMobile ? 0.48 : 0.62,
                stagger: 0.06,
              },
              "-=0.3",
            );

          if (isDesktop) {
            const glowA =
              section.querySelector<HTMLElement>("[data-glow-a]");
            const glowB =
              section.querySelector<HTMLElement>("[data-glow-b]");

            if (glowA) {
              gsap.to(glowA, {
                x: 24,
                y: -16,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              });
            }

            if (glowB) {
              gsap.to(glowB, {
                x: -18,
                y: 14,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              });
            }
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      lang="vi"
      className={`${styles.root} relative mt-16 overflow-hidden rounded-[1.6rem] border border-[#17351b]/10 bg-[linear-gradient(135deg,#123719_0%,#15461f_55%,#123719_100%)] px-4 py-6 text-[#fffaf0] shadow-[0_24px_64px_rgba(23,53,27,0.14)] sm:mt-20 sm:rounded-[2rem] sm:px-7 sm:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-12`}
    >
      <div
        data-glow-a
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 size-64 -translate-y-1/2 rounded-full bg-[#d3f08b]/10 blur-3xl sm:size-80"
      />
      <div
        data-glow-b
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 size-56 rounded-full bg-[#fffaf0]/[0.045] blur-3xl sm:size-72"
      />

      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] lg:items-end lg:gap-9 xl:gap-12">
        <div className="min-w-0">
          <div
            data-visit-reveal
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2"
          >
            <Sparkles
              className="size-3.5 text-[#d3f08b]"
              aria-hidden="true"
            />
            <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#d3f08b] sm:text-[10px]">
              Visit MIE Matcha
            </p>
          </div>

          <h2
            data-visit-reveal
            className={`${styles.serif} mt-5 max-w-[12ch] text-[clamp(2.35rem,5.2vw,4.9rem)] leading-[0.98] text-[#fffaf0]`}
          >
            Một góc nhỏ ở Tây Ninh dành cho những người yêu matcha.
          </h2>

          <p
            data-visit-reveal
            className={`${styles.body} mt-5 max-w-[60ch] text-[0.94rem] leading-7 text-[#fffaf0]/78 sm:text-base sm:leading-8`}
          >
            Ghé MIE để hiểu rõ hơn về profile vị, chọn đúng chén matcha hợp gu
            và bắt đầu hành trình uống trà theo cách chậm hơn, rõ hơn.
          </p>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            <div
              data-visit-card
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.085] sm:p-5"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#d3f08b]/12 text-[#d3f08b] ring-1 ring-[#d3f08b]/10">
                  <MapPin className="size-[1.05rem]" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#fffaf0]/56">
                    Địa chỉ
                  </p>
                  <p className={`${styles.body} mt-1 break-words text-sm leading-6 text-[#fffaf0]/92 sm:text-[0.96rem]`}>
                    {visit.address}
                  </p>
                </div>
              </div>
            </div>

            <a
              data-visit-card
              href={`tel:${visit.phone}`}
              aria-label={`Gọi MIE MATCHA theo số ${visit.phone}`}
              className="group flex min-h-[7.75rem] items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur-sm outline-none transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.085] focus-visible:ring-2 focus-visible:ring-[#d3f08b] sm:p-5"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d3f08b]/12 text-[#d3f08b] ring-1 ring-[#d3f08b]/10 transition-transform duration-300 group-hover:rotate-[-8deg]">
                  <Phone className="size-[1.1rem]" aria-hidden="true" />
                </span>

                <div className="min-w-0 text-left">
                  <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#fffaf0]/56">
                    Hotline
                  </p>
                  <p className={`${styles.body} mt-1 whitespace-nowrap text-[1.02rem] font-bold leading-6 tracking-[0.02em] text-[#fffaf0] sm:text-[1.08rem]`}>
                    0966 204 426
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <aside
          data-visit-cta
          className="rounded-[1.5rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-md sm:p-6 lg:p-7"
        >
          <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#d3f08b]">
            Start here
          </p>

          <h3 className={`${styles.serif} mt-3 max-w-[15ch] text-[clamp(1.75rem,3vw,2.65rem)] leading-[1.04] text-[#fffaf0]`}>
            Chọn đúng profile,
            <span className={`${styles.serifItalic} block text-[#d3f08b]`}>
              dễ uống ngay từ lần đầu.
            </span>
          </h3>

          <p className={`${styles.body} mt-4 text-sm leading-7 text-[#fffaf0]/74 sm:text-[0.96rem]`}>
            Nếu chưa biết nên bắt đầu từ đâu, xem tea profiles hoặc ghé MIE để
            tụi mình gợi ý theo floral, creamy, umami hay mức đắng bạn thích.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Link
              href="/tea-houses"
              data-visit-cta
              className={`${styles.primaryCta} group inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d7f18d] px-5 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.105em] shadow-[0_12px_30px_rgba(215,241,141,0.14)] outline-none transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#e2f6a9] hover:shadow-[0_16px_34px_rgba(215,241,141,0.22)] focus-visible:ring-2 focus-visible:ring-[#fffaf0]`}
            >
              Khám phá tea profiles
              <ArrowRight
                className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/visit"
              data-visit-cta
              className={`${styles.secondaryCta} group inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/24 bg-[#0c2913]/72 px-5 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.105em] outline-none transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/38 hover:bg-[#0a2410]/90 focus-visible:ring-2 focus-visible:ring-[#fffaf0]`}
            >
              <Navigation
                className="mr-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              Xem đường đi
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
