"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { teaHouses } from "@/data/tea-houses";

export function TeaHouseShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProfiles = teaHouses.reduce(
    (total, house) => total + house.teas.length,
    0,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const chapters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-house-chapter]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!current) return;

        setActiveIndex(
          Number(
            (current.target as HTMLElement).dataset.houseIndex ?? 0,
          ),
        );
      },
      {
        root: null,
        rootMargin: "-22% 0px -42% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    chapters.forEach((chapter) => observer.observe(chapter));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-[#10200f] px-5 pb-28 pt-20 text-[#f5f0e7] sm:px-8 sm:pb-36 sm:pt-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        <header className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:pb-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9cc78]">
              Tea house selection
            </p>

            <h1 className="mt-4 max-w-5xl font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.82] tracking-[-0.06em]">
              From Japan,
              <span className="block italic text-[#cadb8a]">
                with depth.
              </span>
            </h1>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-xl text-sm leading-7 text-[#d8dfcf]/70 sm:text-base">
              Thay vì ép người xem cuộn ngang, Tea Houses dùng native vertical
              scroll. Mỗi nhà trà là một chapter riêng, dễ đọc, dễ quay lại và
              vẫn giữ cảm giác editorial.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10">
              <div className="bg-[#172815] p-4">
                <p className="font-serif text-2xl">{teaHouses.length}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/40">
                  Tea houses
                </p>
              </div>

              <div className="bg-[#172815] p-4">
                <p className="font-serif text-2xl">{totalProfiles}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/40">
                  Profiles
                </p>
              </div>

              <div className="bg-[#172815] p-4">
                <p className="font-serif text-2xl">JP</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/40">
                  Selected
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)] xl:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#172815]/80 p-3 backdrop-blur-xl">
              <p className="px-3 pb-4 pt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#aebf75]">
                Tea chapters
              </p>

              <nav className="space-y-1" aria-label="Danh sách nhà trà">
                {teaHouses.map((house, index) => {
                  const active = index === activeIndex;

                  return (
                    <a
                      key={house.id}
                      href={`#house-${house.id}`}
                      className={`flex items-center gap-3 rounded-[1.05rem] px-3 py-3.5 transition-all duration-300 ${
                        active
                          ? "bg-[#c6d781] text-[#172314]"
                          : "text-[#f7f2e7]/58 hover:bg-white/[0.055] hover:text-white"
                      }`}
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full border text-[8px] font-bold ${
                          active
                            ? "border-[#172314]/15"
                            : "border-white/12"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate font-serif text-base">
                          {house.name}
                        </span>

                        <span
                          className={`mt-1 block truncate text-[8px] uppercase tracking-[0.14em] ${
                            active
                              ? "text-[#35492d]/66"
                              : "text-white/28"
                          }`}
                        >
                          {house.region}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-10 sm:space-y-14">
            {teaHouses.map((house, index) => (
              <article
                id={`house-${house.id}`}
                key={house.id}
                data-house-chapter
                data-house-index={index}
                className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#182817] shadow-[0_35px_110px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem]"
              >
                <div className="grid xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="group relative min-h-[410px] overflow-hidden sm:min-h-[520px] xl:min-h-full">
                    <Image
                      src={house.image}
                      alt={house.imageAlt}
                      fill
                      sizes="(max-width: 1280px) 100vw, 43vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,6,0.03)_32%,rgba(7,15,6,0.74)_100%)] xl:bg-[linear-gradient(90deg,rgba(7,15,6,0.02)_38%,rgba(7,15,6,0.38)_100%)]" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/18 bg-black/18 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md sm:left-6 sm:top-6">
                      {String(index + 1).padStart(2, "0")}
                      {" / "}
                      {String(teaHouses.length).padStart(2, "0")}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 xl:hidden">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d5e09e]">
                        {house.region}
                      </p>

                      <h2 className="mt-2 font-serif text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                        {house.name}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 xl:p-10 2xl:p-12">
                    <div className="hidden xl:block">
                      <div className="flex flex-wrap items-center gap-4">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#aec171]">
                          {house.region}
                        </p>

                        {house.japanese ? (
                          <span className="text-xs text-white/30">
                            {house.japanese}
                          </span>
                        ) : null}
                      </div>

                      <h2 className="mt-3 font-serif text-5xl leading-[0.9] tracking-[-0.05em] 2xl:text-6xl">
                        {house.name}
                      </h2>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[#dce3d5]/68">
                      {house.description}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {house.teas.map((tea) => (
                        <div
                          key={`${house.id}-${tea.name}`}
                          className="rounded-[1.35rem] border border-white/[0.075] bg-white/[0.035] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c6d57f]/25 hover:bg-white/[0.06] sm:p-5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-serif text-[1.65rem] leading-none tracking-[-0.035em]">
                              {tea.name}
                            </h3>

                            {tea.japanese ? (
                              <span className="shrink-0 text-[11px] text-white/30">
                                {tea.japanese}
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-4 text-xs leading-6 text-[#eef1e8]/76">
                            {tea.vietnamese}
                          </p>

                          <p className="mt-2 text-[10px] italic leading-5 text-[#b9c2b2]/50">
                            {tea.english}
                          </p>

                          {tea.notes?.length ? (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {tea.notes.map((note) => (
                                <span
                                  key={note}
                                  className="rounded-full border border-[#bed06f]/15 bg-[#bed06f]/[0.06] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#cadb92]"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="grid gap-7 rounded-[2rem] border border-white/10 bg-[#c6d781] p-7 text-[#172314] sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#52683f]">
                  Need a recommendation?
                </p>

                <p className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                  Chọn theo cảm giác bạn muốn uống hôm nay.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#405136]/78">
                  Floral, nutty, creamy hay umami dày — ghé MIE và tụi mình sẽ
                  gợi ý profile phù hợp.
                </p>
              </div>

              <Link
                href="/visit"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#172314] px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f8f3e8]"
              >
                Visit MIE ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
