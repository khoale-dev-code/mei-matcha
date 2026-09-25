"use client";

import { useRef } from "react";

import { HeroMatchaSeal } from "@/components/home/hero-matcha-seal";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const FRAME_COUNT = 192;
const CACHE_LIMIT = 24;
const PRELOAD_RADIUS = 10;
const MOBILE_QUERY = "(max-width: 1023px)";

function getFrameUrl(index: number) {
  const safeIndex = Math.min(Math.max(index + 1, 1), FRAME_COUNT);

  return `/hero-frames/frame-${String(safeIndex).padStart(4, "0")}.webp`;
}

export function HeroScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const progress = progressRef.current;
      const content = contentRef.current;

      if (!section || !canvas || !progress || !content) {
        return;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      const isMobileViewport = window.matchMedia(MOBILE_QUERY).matches;
      const initialViewportHeight =
        window.visualViewport?.height ?? window.innerHeight;
      let lastViewportWidth = window.innerWidth;

      const frameCache = new Map<number, HTMLImageElement>();
      const loadingFrames = new Set<number>();

      let currentFrame = 0;
      let lastDirection = 1;
      let destroyed = false;

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
      };

      const drawImage = (image: HTMLImageElement) => {
        resizeCanvas();

        const scale = Math.max(
          canvas.width / image.naturalWidth,
          canvas.height / image.naturalHeight,
        );

        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
          image,
          (canvas.width - width) / 2,
          (canvas.height - height) / 2,
          width,
          height,
        );
      };

      const evictOldFrames = () => {
        if (frameCache.size <= CACHE_LIMIT) {
          return;
        }

        const candidates = [...frameCache.keys()]
          .filter(
            (index) =>
              index !== currentFrame &&
              Math.abs(index - currentFrame) > PRELOAD_RADIUS,
          )
          .sort(
            (a, b) =>
              Math.abs(b - currentFrame) -
              Math.abs(a - currentFrame),
          );

        while (frameCache.size > CACHE_LIMIT && candidates.length) {
          const index = candidates.shift();

          if (index === undefined) break;

          const image = frameCache.get(index);

          if (image) {
            image.onload = null;
            image.onerror = null;
            image.src = "";
          }

          frameCache.delete(index);
        }
      };

      const loadFrame = (index: number, shouldRender = false) => {
        if (index < 0 || index >= FRAME_COUNT || destroyed) {
          return;
        }

        const cached = frameCache.get(index);

        if (cached && cached.complete && cached.naturalWidth) {
          if (shouldRender) {
            drawImage(cached);
          }

          return;
        }

        if (loadingFrames.has(index)) {
          return;
        }

        loadingFrames.add(index);

        const image = new Image();
        image.decoding = "async";

        if (index <= 4) {
          image.fetchPriority = "high";
        }

        image.onload = () => {
          loadingFrames.delete(index);

          if (destroyed) return;

          frameCache.set(index, image);

          if (shouldRender || index === currentFrame) {
            drawImage(image);
          }

          evictOldFrames();
        };

        image.onerror = () => {
          loadingFrames.delete(index);
        };

        image.src = getFrameUrl(index);
      };

      const preloadAround = (index: number) => {
        loadFrame(index, true);

        for (let offset = 1; offset <= PRELOAD_RADIUS; offset += 1) {
          const preferred = index + offset * lastDirection;
          const opposite = index - offset * lastDirection;

          loadFrame(preferred);
          loadFrame(opposite);
        }
      };

      const setFrame = (nextFrame: number) => {
        const safeFrame = Math.min(FRAME_COUNT - 1, Math.max(0, nextFrame));

        if (safeFrame > currentFrame) {
          lastDirection = 1;
        } else if (safeFrame < currentFrame) {
          lastDirection = -1;
        }

        currentFrame = safeFrame;

        const image = frameCache.get(safeFrame);

        if (image && image.complete && image.naturalWidth) {
          drawImage(image);
        } else {
          loadFrame(safeFrame, true);
        }

        preloadAround(safeFrame);
      };

      const releaseFrames = (keepIndex: number) => {
        const keep = frameCache.get(keepIndex);

        frameCache.forEach((image, index) => {
          if (index === keepIndex) return;

          image.onload = null;
          image.onerror = null;
          image.src = "";
        });

        frameCache.clear();

        if (keep && keep.complete && keep.naturalWidth) {
          frameCache.set(keepIndex, keep);
        }

        loadingFrames.clear();
      };

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .from("[data-hero-kicker]", {
          opacity: 0,
          y: 16,
          duration: 0.7,
        })
        .from(
          "[data-hero-line]",
          {
            opacity: 0,
            yPercent: 110,
            stagger: 0.08,
            duration: 0.95,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          "[data-hero-description]",
          {
            opacity: 0,
            y: 18,
            duration: 0.75,
          },
          "-=0.4",
        )
        .from(
          ".mie-float-soft",
          {
            opacity: 0,
            y: 18,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.42",
        );

      loadFrame(0, true);

      for (let index = 1; index <= 14; index += 1) {
        loadFrame(index);
      }

      const scrollDistance = () => {
        if (isMobileViewport) {
          return Math.round(
            Math.min(3400, Math.max(2500, initialViewportHeight * 3.15)),
          );
        }

        return Math.round(
          Math.min(3900, Math.max(2900, window.innerHeight * 3.5)),
        );
      };

      const trigger = ScrollTrigger.create({
        id: "mie-hero-sequence",
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * (FRAME_COUNT - 1));
          setFrame(frame);

          gsap.set(progress, {
            scaleX: self.progress,
            transformOrigin: "left center",
          });

          const fadeStart = isMobileViewport ? 0.58 : 0.14;
          const fadeDuration = isMobileViewport ? 0.3 : 0.48;
          const maxFade = isMobileViewport ? 0.56 : 0.76;
          const translateY = isMobileViewport ? -2 : -5;
          const fade = gsap.utils.clamp(
            0,
            1,
            (self.progress - fadeStart) / fadeDuration,
          );

          gsap.set(content, {
            opacity: 1 - fade * maxFade,
            yPercent: translateY * fade,
          });
        },
        onLeave: () => {
          currentFrame = FRAME_COUNT - 1;
          loadFrame(FRAME_COUNT - 1, true);

          window.setTimeout(() => {
            if (!destroyed) {
              releaseFrames(FRAME_COUNT - 1);
            }
          }, 80);
        },
        onEnterBack: (self) => {
          const frame = Math.round(self.progress * (FRAME_COUNT - 1));

          currentFrame = frame;
          preloadAround(frame);
        },
        onLeaveBack: () => {
          currentFrame = 0;

          loadFrame(0, true);
          preloadAround(0);

          gsap.set(content, {
            opacity: 1,
            yPercent: 0,
          });

          gsap.set(progress, {
            scaleX: 0,
          });
        },
      });

      const handleResize = () => {
        const image = frameCache.get(currentFrame);

        if (image) {
          drawImage(image);
        }

        const nextWidth = window.innerWidth;
        const widthChanged = Math.abs(nextWidth - lastViewportWidth) > 8;

        // iOS Safari fires resize while its browser chrome expands/collapses.
        // Avoid refreshing the pinned sequence for height-only viewport changes.
        if (!isMobileViewport || widthChanged) {
          lastViewportWidth = nextWidth;
          ScrollTrigger.refresh();
        }
      };

      window.addEventListener("resize", handleResize, {
        passive: true,
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        destroyed = true;
        trigger.kill();

        window.removeEventListener("resize", handleResize);

        frameCache.forEach((image) => {
          image.onload = null;
          image.onerror = null;
          image.src = "";
        });

        frameCache.clear();
        loadingFrames.clear();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate h-[100dvh] min-h-[100svh] overflow-hidden bg-[#0c130b] text-[#f7f2e7]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,6,0.14)_0%,rgba(7,12,6,0.02)_38%,rgba(7,12,6,0.66)_100%)]" />

      <HeroMatchaSeal />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-28 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.55fr] lg:items-end lg:gap-16">
          <div>
            <p
              data-hero-kicker
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#dbe7b1] sm:text-xs"
            >
              Japanese Tea · Tây Ninh
            </p>

            <h1 className="max-w-[7.8ch] font-serif text-[clamp(4.2rem,12vw,10rem)] leading-[0.78] tracking-[-0.065em] text-[#fffbf1]/84">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  MIE
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.12em]">
                <span
                  data-hero-line
                  className="block italic text-[#d5e28b]/88"
                >
                  MATCHA
                </span>
              </span>
            </h1>
          </div>

          <div data-hero-description className="max-w-md rounded-[1.35rem] border border-white/0 bg-transparent lg:max-w-[34rem] lg:-translate-y-24 lg:border-white/8 lg:bg-[#112010]/14 lg:px-5 lg:py-4 lg:pb-4 lg:backdrop-blur-[2px] xl:-translate-y-28">
            <p className="text-sm leading-7 text-[#f5f5ea]/90 sm:text-[15px] lg:leading-8">
              Một góc nhỏ dành cho những người yêu matcha,
              nơi mỗi chén trà được đánh bằng chasen và
              thưởng thức theo một nhịp chậm hơn.
            </p>

            <div className="mt-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#e2ecb8]">
              <span>Scroll to whisk</span>
              <span className="h-px flex-1 bg-[#dce7ba]/35" />
              <span>01</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/55">
          <span>Scroll</span>
          <span>↓</span>
          <span className="hidden sm:inline">
            Scroll controls every frame
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[#c7d87f]"
        />
      </div>
    </section>
  );
}
