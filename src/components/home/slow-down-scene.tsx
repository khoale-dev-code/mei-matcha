"use client";

import Link from "next/link";
import styles from "./slow-down-scene.module.css";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

type RitualSlide = {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  note: string;
};

const RITUAL_SLIDES: RitualSlide[] = [
  {
    id: "01",
    eyebrow: "Select the profile",
    title: "Choose",
    accent: "floral · nutty · umami",
    copy:
      "Chọn profile hợp khẩu vị — nhẹ hoa cỏ, béo bùi hay đậm umami — để bắt đầu đúng nhịp với chén matcha của bạn.",
    note: "Start with what feels easy to love.",
  },
  {
    id: "02",
    eyebrow: "Whisk by hand",
    title: "Whisk",
    accent: "chasen · texture · foam",
    copy:
      "Mỗi chén được đánh bằng chasen để bột trà hòa mịn, lớp bọt lên đẹp và hậu vị mở ra tròn hơn, mềm hơn.",
    note: "Texture first, then aroma, then depth.",
  },
  {
    id: "03",
    eyebrow: "Stay with the cup",
    title: "Slow",
    accent: "linger · soften · notice",
    copy:
      "Dành một nhịp chậm để nhìn màu xanh, cảm texture mịn và để vị trà đi từ êm dịu sang hậu ngọt rõ ràng hơn.",
    note: "The quiet moment is part of the drink.",
  },
];

function getStepIndex(progress: number) {
  if (progress < 0.34) return 0;
  if (progress < 0.68) return 1;
  return 2;
}

function StoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21.5v-15Z" />
      <path d="M5 6.5v15" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  );
}

function ScrollIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="8" y="3" width="8" height="14" rx="4" />
      <path d="M12 6v3" />
      <path d="m9.5 19 2.5 2 2.5-2" />
    </svg>
  );
}


function MobileSlowDownScene() {
  return (
    <section
      className="relative bg-[var(--mie-washi)] px-5 pb-24 pt-20 text-[var(--mie-ink)] sm:px-8 lg:hidden"
      aria-labelledby="slow-down-mobile-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="border-b border-[var(--mie-ink)]/10 pb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--mie-moss)]/70">
            Japanese tea · Tây Ninh
          </p>

          <h2
            id="slow-down-mobile-heading"
            className="mt-5 max-w-[7.2ch] font-serif text-[clamp(4rem,17vw,6.7rem)] leading-[0.84] tracking-[-0.06em]"
          >
            Slow down.
            <span className="mt-2 block">
              with{" "}
              <em className="italic text-[var(--mie-matcha-deep)]">MIE.</em>
            </span>
          </h2>

          <p className="mt-8 max-w-[34rem] text-base leading-8 text-[var(--mie-ink)]/70 sm:text-lg">
            Một phần matcha ngon không chỉ nằm ở chất lượng trà, mà còn ở cách
            bạn bước chậm lại — chọn vị, nhìn màu xanh mở ra và ở cùng chiếc
            cốc thêm một nhịp.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href="/visit"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#17351b] px-5 text-[10px] font-extrabold uppercase tracking-[0.18em] !text-[#fffaf0]"
            >
              Visit MIE
            </Link>

            <Link
              href="/about"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#172314]/12 bg-[#fffaf0] px-5 text-[10px] font-extrabold uppercase tracking-[0.18em] !text-[#172314]"
            >
              <StoryIcon />
              Our story
            </Link>
          </div>
        </div>

        <div className="pt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--mie-moss)]/58">
                The MIE ritual
              </p>
              <h3 className="mt-2 max-w-[13ch] font-serif text-[clamp(2.3rem,10vw,3.8rem)] leading-[0.95] tracking-[-0.045em]">
                Three steps.
                <span className="block italic text-[var(--mie-matcha-deep)]">
                  One quiet cup.
                </span>
              </h3>
            </div>

            <span className="shrink-0 rounded-full border border-[var(--mie-matcha-deep)]/18 bg-[var(--mie-matcha)]/14 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--mie-matcha-deep)]">
              03 steps
            </span>
          </div>

          <div className="mt-7 grid gap-4">
            {RITUAL_SLIDES.map((slide) => (
              <article
                key={slide.id}
                className="overflow-hidden rounded-[1.6rem] border border-[var(--mie-ink)]/10 bg-[var(--mie-ivory)]/78 p-5 shadow-[0_18px_48px_rgba(32,43,28,0.07)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--mie-matcha-deep)]">
                      {slide.id} · {slide.eyebrow}
                    </p>
                    <h4 className="mt-3 font-serif text-[2.45rem] leading-none tracking-[-0.045em]">
                      {slide.title}
                    </h4>
                  </div>

                  <p className="max-w-[11rem] text-right text-[9px] font-bold uppercase leading-5 tracking-[0.15em] text-[var(--mie-ink)]/44">
                    {slide.accent}
                  </p>
                </div>

                <p className="mt-5 text-[15px] leading-7 text-[var(--mie-ink)]/70">
                  {slide.copy}
                </p>

                <div className="mt-5 rounded-[1.15rem] border border-[var(--mie-ink)]/8 bg-[var(--mie-washi)]/80 px-4 py-3.5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--mie-moss)]/45">
                    Why this matters
                  </p>
                  <p className="mt-1.5 font-serif text-lg italic leading-6 text-[var(--mie-matcha-deep)]">
                    {slide.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SlowDownScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStep = getStepIndex(latest);

    setActiveStep((current) =>
      current === nextStep ? current : nextStep,
    );
  });

  const headingY = useTransform(scrollYProgress, [0.04, 0.24], [72, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.02, 0.16], [0.2, 1]);
  const lineTwoY = useTransform(scrollYProgress, [0.08, 0.28], [94, 0]);
  const introCopyY = useTransform(scrollYProgress, [0.18, 0.4], [30, 0]);
  const introCopyOpacity = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0.14, 0.34], [68, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0.1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.34, 0.58], [28, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.46], [0, 1]);
  const progressScale = useTransform(scrollYProgress, [0.04, 0.92], [0, 1]);

  const activeSlide = RITUAL_SLIDES[activeStep];

  return (
    <>
      <MobileSlowDownScene />

      <section
        ref={sectionRef}
        className="relative hidden h-[260vh] bg-[var(--mie-washi)] text-[var(--mie-ink)] lg:block"
        aria-labelledby="slow-down-heading"
      >
      <div className={`sticky top-0 h-[100svh] overflow-hidden ${styles.stage}`}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-[var(--mie-ink)]/8" />
          <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[var(--mie-matcha)]/16 blur-3xl" />
          <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-[var(--mie-moss)]/6 blur-3xl" />
          <div className="absolute bottom-[-6rem] left-1/3 h-64 w-64 rounded-full bg-[var(--mie-matcha-deep)]/6 blur-3xl" />
        </div>

        <div className={`relative mx-auto flex h-full max-w-[1520px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-9 ${styles.shell}`}>
          <div className={`flex items-center justify-between border-b border-[var(--mie-ink)]/10 pb-5 ${styles.topBar}`}>
            <div className="flex items-center gap-4">
              <div className="grid size-11 place-items-center rounded-full border border-[var(--mie-ink)]/12 bg-white/26 text-[10px] font-bold tracking-[0.12em] text-[var(--mie-ink)]/78">
                01
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--mie-moss)]/78">
                  MIE philosophy
                </p>
                <p className="mt-1 text-sm text-[var(--mie-ink)]/54">
                  Chậm hơn để cảm trà rõ hơn.
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--mie-ink)]/40">
                Scroll to move the scene
              </span>

              <div className="h-px w-28 overflow-hidden bg-[var(--mie-ink)]/10">
                <motion.div
                  className="mie-slide-motion h-full origin-left bg-[var(--mie-matcha-deep)]"
                  style={{ scaleX: progressScale }}
                />
              </div>
            </div>
          </div>

          <div className={`grid flex-1 items-center gap-12 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-10 ${styles.bodyGrid}`}>
            <motion.div
              className={`mie-slide-motion min-w-0 ${styles.intro}`}
              style={{ y: headingY, opacity: headingOpacity }}
            >
              <p className={`mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--mie-moss)]/58 ${styles.introKicker}`}>
                Japanese tea · Tây Ninh
              </p>

              <h2
                id="slow-down-heading"
                className={`max-w-[8ch] font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.84] tracking-[-0.06em] text-[var(--mie-ink)] ${styles.title}`}
              >
                <span className="block overflow-hidden">
                  <motion.span className="mie-slide-motion block" style={{ y: headingY }}>
                    Slow down.
                  </motion.span>
                </span>

                <span className="mt-2 block overflow-hidden sm:mt-3">
                  <motion.span className="mie-slide-motion block" style={{ y: lineTwoY }}>
                    with{" "}
                    <em className="italic text-[var(--mie-matcha-deep)]">
                      MIE.
                    </em>
                  </motion.span>
                </span>
              </h2>

              <motion.p
                className={`mie-slide-motion mt-8 max-w-xl text-lg leading-9 text-[var(--mie-ink)]/68 sm:mt-10 ${styles.description}`}
                style={{ y: introCopyY, opacity: introCopyOpacity }}
              >
                Một phần matcha ngon không chỉ nằm ở chất lượng trà, mà còn ở
                cách bạn bước chậm lại — chọn vị, nhìn màu xanh mở ra và ở cùng
                chiếc cốc thêm một nhịp.
              </motion.p>

              <motion.div
                className={`mie-slide-motion mt-8 flex flex-wrap items-center gap-3 sm:mt-10 ${styles.actions}`}
                style={{ y: ctaY, opacity: ctaOpacity }}
              >
                <Link
                  href="/visit"
                  aria-label="Ghé MIE MATCHA"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#29452c] bg-[#17351b] px-6 py-3 !text-[#fffaf0] shadow-[0_14px_34px_rgba(20,34,18,0.22)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#214a25] hover:shadow-[0_18px_42px_rgba(20,34,18,0.28)] active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d914e] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mie-washi)] motion-reduce:transform-none motion-reduce:transition-none"
                  style={{ color: "#fffaf0" }}
                >

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#fffaf0]">
                    Visit MIE
                  </span>
                </Link>

                <Link
                  href="/about"
                  aria-label="Đọc câu chuyện MIE"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#172314]/16 bg-[#fffaf0] px-6 py-3 !text-[#172314] shadow-[0_10px_24px_rgba(32,43,28,0.07)] transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#7d914e]/34 hover:bg-[#fbf7ec] hover:shadow-[0_16px_32px_rgba(32,43,28,0.11)] active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d914e] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mie-washi)] motion-reduce:transform-none motion-reduce:transition-none"
                  style={{ color: "#172314" }}
                >
                  <span className="grid size-7 place-items-center rounded-full border border-[#172314]/10 bg-[#edf0df] text-[#172314] transition-transform duration-200 group-hover:-rotate-3 motion-reduce:transform-none">
                    <StoryIcon />
                  </span>

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#172314]">
                    Our story
                  </span>
                </Link>

                <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#172314]/10 bg-white/24 px-4 text-[#52604d]">
                  <ScrollIcon />

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
                    Cuộn để đổi bước
                  </span>

                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#7d914e]" />

                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#6e8345]">
                    {activeSlide.title}
                  </span>
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className={`mie-slide-motion relative ${styles.panelWrap}`}
              style={{ y: panelY, opacity: panelOpacity }}
            >
              <div className="absolute -inset-5 rounded-[2.25rem] bg-[radial-gradient(circle_at_top_left,rgba(200,220,122,0.14),transparent_42%)] blur-2xl" />

              <div className={`relative overflow-hidden rounded-[2.2rem] border border-[var(--mie-ink)]/10 bg-[var(--mie-ivory)]/78 shadow-[0_28px_90px_rgba(32,43,28,0.1)] backdrop-blur-md ${styles.panel}`}>
                <div className={`border-b border-[var(--mie-ink)]/8 px-6 py-5 sm:px-8 sm:py-6 ${styles.panelHeader}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--mie-moss)]/56">
                        The MIE ritual
                      </p>

                      <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-[2rem]">
                        Three steps. One quiet cup.
                      </h3>
                    </div>

                    <div className="rounded-full border border-[var(--mie-matcha-deep)]/18 bg-[var(--mie-matcha)]/14 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--mie-matcha-deep)]">
                      {activeSlide.id} / 03
                    </div>
                  </div>
                </div>

                <div className={`grid gap-4 p-4 sm:p-5 lg:grid-cols-[11rem_1fr] lg:gap-5 lg:p-6 ${styles.panelBody}`}>
                  <div className={`grid gap-3 ${styles.steps}`}>
                    {RITUAL_SLIDES.map((slide, index) => {
                      const active = index === activeStep;

                      return (
                        <div
                          key={slide.id}
                          className={[
                            styles.stepCard, "rounded-[1.25rem] border px-4 py-4 transition-all duration-300",
                            active
                              ? "border-[var(--mie-matcha-deep)]/20 bg-[var(--mie-matcha)]/18 shadow-[0_12px_34px_rgba(125,145,78,0.12)]"
                              : "border-[var(--mie-ink)]/8 bg-white/36",
                          ].join(" ")}
                        >
                          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--mie-matcha-deep)]/84">
                            {slide.id}
                          </p>

                          <p className="mt-2 font-serif text-2xl tracking-[-0.03em] text-[var(--mie-ink)]">
                            {slide.title}
                          </p>

                          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--mie-ink)]/42">
                            {slide.accent}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className={`relative min-h-[23rem] overflow-hidden rounded-[1.5rem] border border-[var(--mie-ink)]/8 bg-white/42 p-5 sm:min-h-[24rem] sm:p-7 ${styles.detail}`}>
                    <div className="absolute inset-x-0 top-0 h-1 bg-[var(--mie-ink)]/5">
                      <motion.div
                        className="mie-slide-motion h-full origin-left bg-[var(--mie-matcha-deep)]"
                        style={{ scaleX: progressScale }}
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide.id}
                        initial={{ opacity: 0, y: 58 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -40,
                          transition: {
                            duration: 0.28,
                            ease: "easeOut",
                          },
                        }}
                        className={`mie-slide-motion flex min-h-[19rem] flex-col justify-between ${styles.detailInner}`}
                      >
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--mie-moss)]/55">
                            {activeSlide.eyebrow}
                          </p>

                          <div className="mt-5 flex flex-wrap items-end gap-3">
                            <span className="font-serif text-6xl leading-none tracking-[-0.06em] text-[var(--mie-ink)] sm:text-7xl">
                              {activeSlide.id}
                            </span>

                            <div className="pb-2">
                              <h4 className="font-serif text-4xl tracking-[-0.04em] text-[var(--mie-ink)] sm:text-5xl">
                                {activeSlide.title}
                              </h4>

                              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--mie-matcha-deep)]">
                                {activeSlide.accent}
                              </p>
                            </div>
                          </div>

                          <p className="mt-8 max-w-[38ch] text-base leading-8 text-[var(--mie-ink)]/68 sm:text-lg sm:leading-9">
                            {activeSlide.copy}
                          </p>
                        </div>

                        <div className="mt-6 rounded-[1.25rem] border border-[var(--mie-ink)]/8 bg-[var(--mie-washi)]/84 px-4 py-4">
                          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--mie-moss)]/42">
                            Why this matters
                          </p>

                          <p className="mt-2 font-serif text-xl italic tracking-[-0.025em] text-[var(--mie-matcha-deep)]">
                            {activeSlide.note}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className={`flex flex-wrap items-center justify-between gap-4 border-t border-[var(--mie-ink)]/8 px-6 py-4 sm:px-8 ${styles.panelFooter}`}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--mie-moss)]/42">
                    MIE MATCHA · TÂY NINH
                  </p>

                  <p className="text-[10px] text-[var(--mie-ink)]/44">
                    Cuộn để card đổi như một slide trình chiếu.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className={`flex items-center justify-between border-t border-[var(--mie-ink)]/10 pt-5 ${styles.sectionFooter}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mie-ink)]/34">
              Presentation-style scroll · clear CTA
            </p>

            <div className="hidden items-center gap-3 sm:flex">
              {RITUAL_SLIDES.map((slide, index) => (
                <span
                  key={slide.id}
                  className={[
                    "h-1.5 rounded-full transition-all duration-300",
                    index === activeStep
                      ? "w-10 bg-[var(--mie-matcha-deep)]"
                      : "w-4 bg-[var(--mie-ink)]/12",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
