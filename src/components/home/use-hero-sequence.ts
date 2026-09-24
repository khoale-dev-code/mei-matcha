"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const FRAME_COUNT = 192;
const DESKTOP_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const MOBILE_QUERY =
  "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

type SequenceConfig = {
  cacheLimit: number;
  dprCap: number;
  preloadAhead: number;
  preloadBehind: number;
  end: () => string;
};

export function useHeroSequence(
  sectionRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  progressRef: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      const mountSequence = ({
        cacheLimit,
        dprCap,
        preloadAhead,
        preloadBehind,
        end,
      }: SequenceConfig) => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        const progress = progressRef.current;

        if (!section || !canvas || !progress) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        ScrollTrigger.getById("mie-hero-sequence")?.kill();

        const cache = new Map<number, HTMLImageElement>();
        const playhead = { frame: 0 };

        let currentFrame = 0;
        let destroyed = false;

        const frameSrc = (index: number) =>
          `/hero-frames/frame-${String(index + 1).padStart(4, "0")}.webp`;

        const disposeImage = (image: HTMLImageElement) => {
          image.onload = null;
          image.onerror = null;
          image.removeAttribute("src");
        };

        const resizeCanvas = () => {
          const rect = canvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
          const width = Math.max(1, Math.round(rect.width * dpr));
          const height = Math.max(1, Math.round(rect.height * dpr));

          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }

          return { width, height };
        };

        const draw = (image: HTMLImageElement) => {
          if (
            destroyed ||
            !image.complete ||
            image.naturalWidth === 0 ||
            image.naturalHeight === 0
          ) {
            return;
          }

          const { width, height } = resizeCanvas();
          const scale = Math.max(
            width / image.naturalWidth,
            height / image.naturalHeight,
          );

          const renderedWidth = image.naturalWidth * scale;
          const renderedHeight = image.naturalHeight * scale;

          context.clearRect(0, 0, width, height);
          context.drawImage(
            image,
            (width - renderedWidth) / 2,
            (height - renderedHeight) / 2,
            renderedWidth,
            renderedHeight,
          );
        };

        const pruneCache = () => {
          if (cache.size < cacheLimit) return;

          const removable = [...cache.keys()]
            .filter((index) => index !== currentFrame)
            .sort(
              (a, b) =>
                Math.abs(b - currentFrame) - Math.abs(a - currentFrame),
            )[0];

          if (removable === undefined) return;

          const image = cache.get(removable);
          if (image) disposeImage(image);
          cache.delete(removable);
        };

        const load = (index: number) => {
          if (destroyed || index < 0 || index >= FRAME_COUNT) return;

          const existing = cache.get(index);
          if (existing) {
            if (index === currentFrame) draw(existing);
            return;
          }

          pruneCache();

          const image = new Image();
          image.decoding = "async";
          cache.set(index, image);

          image.onload = () => {
            if (
              !destroyed &&
              cache.get(index) === image &&
              index === currentFrame
            ) {
              draw(image);
            }
          };

          image.onerror = () => {
            if (cache.get(index) === image) {
              cache.delete(index);
            }
          };

          image.src = frameSrc(index);
        };

        const render = (index: number) => {
          const next = Math.max(0, Math.min(FRAME_COUNT - 1, index));
          const direction = next >= currentFrame ? 1 : -1;

          currentFrame = next;
          load(next);

          for (let offset = 1; offset <= preloadAhead; offset += 1) {
            load(next + offset * direction);
          }

          for (let offset = 1; offset <= preloadBehind; offset += 1) {
            load(next - offset * direction);
          }
        };

        render(0);

        const tween = gsap.to(playhead, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          onUpdate: () => {
            render(Math.round(playhead.frame));
          },
          scrollTrigger: {
            id: "mie-hero-sequence",
            trigger: section,
            start: "top top",
            end,
            pin: true,
            pinSpacing: true,
            scrub: 0.18,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
            onUpdate: (self) => {
              progress.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        const resizeObserver = new ResizeObserver(() => {
          const image = cache.get(currentFrame);
          if (image) draw(image);
        });

        resizeObserver.observe(section);

        const refreshFrame = requestAnimationFrame(() => {
          const image = cache.get(currentFrame);
          if (image) draw(image);
          ScrollTrigger.refresh();
        });

        return () => {
          destroyed = true;

          cancelAnimationFrame(refreshFrame);
          resizeObserver.disconnect();

          tween.scrollTrigger?.kill();
          tween.kill();

          cache.forEach(disposeImage);
          cache.clear();

          context.clearRect(0, 0, canvas.width, canvas.height);
          progress.style.removeProperty("transform");
        };
      };

      media.add(DESKTOP_QUERY, () =>
        mountSequence({
          cacheLimit: 28,
          dprCap: 2,
          preloadAhead: 7,
          preloadBehind: 4,

          // Restore the earlier long-form hero scrub.
          end: () => "+=4200",
        }),
      );

      media.add(MOBILE_QUERY, () =>
        mountSequence({
          cacheLimit: 18,
          dprCap: 1.5,
          preloadAhead: 4,
          preloadBehind: 2,

          // Same scroll-controlled sequence, shorter runway for touch screens.
          end: () => {
            const distance = Math.round(window.innerHeight * 3);
            return `+=${Math.max(1900, Math.min(3000, distance))}`;
          },
        }),
      );

      media.add(REDUCED_QUERY, () => {
        const progress = progressRef.current;
        progress?.style.removeProperty("transform");

        return () => {
          progress?.style.removeProperty("transform");
        };
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );
}
