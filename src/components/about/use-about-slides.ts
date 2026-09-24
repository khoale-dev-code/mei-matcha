"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const DESKTOP = "(min-width: 1024px) and (min-height: 760px)";
const TAIL_HOLD = 0.55;

export function useAboutSlides(rootRef: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>("[data-story-stage]");
    if (!root || !stage) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-story-panel]"));
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-chapter-link]"));
    const counter = root.querySelector<HTMLElement>("[data-story-count]");
    const progress = root.querySelector<HTMLElement>("[data-story-progress]");
    const mm = gsap.matchMedia();

    const reset = () => {
      delete root.dataset.aboutMode;
      panels.forEach(panel => {
        panel.inert = false;
        panel.removeAttribute("aria-hidden");
      });
      links.forEach(link => link.removeAttribute("aria-current"));
      if (progress) progress.style.removeProperty("transform");
    };

    mm.add({
      desktop: DESKTOP,
      motion: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, context => {
      reset();
      if (context.conditions?.reduced) return reset;

      let active = -1;
      const activate = (index: number, exclusive = false) => {
        if (index === active) return;
        active = index;
        links.forEach((link, i) => {
          if (i === index) link.setAttribute("aria-current", "step");
          else link.removeAttribute("aria-current");
        });
        if (counter) counter.textContent = String(index + 1).padStart(2, "0");
        if (exclusive) {
          panels.forEach((panel, i) => {
            // Never leave keyboard focus inside a slide being hidden.
            if (i !== index && panel.contains(document.activeElement)) {
              links[index]?.focus({ preventScroll: true });
            }
            panel.inert = i !== index;
            if (i === index) panel.removeAttribute("aria-hidden");
            else panel.setAttribute("aria-hidden", "true");
          });
        }
      };

      const setupFlow = () => {
        root.dataset.aboutMode = "flow";
        panels.forEach((panel, index) => {
          gsap.fromTo(panel.querySelectorAll("[data-story-reveal]"),
            { y: 24, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 88%", once: true },
            },
          );
          ScrollTrigger.create({
            trigger: panel, start: "top 55%", end: "bottom 55%",
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
          });
        });
      };

      if (!context.conditions?.desktop) {
        setupFlow();
        return reset;
      }

      // Progressive enhancement: all slides remain readable without JS.
      root.dataset.aboutMode = "deck";
      const contentFits = () => panels.every(panel => panel.scrollHeight <= panel.clientHeight + 2);
      if (!contentFits()) {
        setupFlow();
        return reset;
      }

      activate(0, true);
      const deckContext = gsap.context(() => {
        gsap.set(panels, { autoAlpha: 0, yPercent: 8, scale: 0.985 });
        gsap.set(panels[0], { autoAlpha: 1, yPercent: 0, scale: 1 });
      }, root);

      let trigger: ScrollTrigger | undefined;
      let timeline: gsap.core.Timeline;
      deckContext.add(() => {
        timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onUpdate: () => {
            const index = Math.min(panels.length - 1, Math.floor(timeline.time() + 0.22));
            activate(index, true);
            if (progress) progress.style.transform = `scaleX(${timeline.progress()})`;
          },
        });
        panels.forEach((panel, index) => {
          timeline.addLabel(panel.id, index);
          if (!index) return;
          timeline
            .to(panels[index - 1], { autoAlpha: 0, yPercent: -6, scale: 0.975, duration: 0.45 }, index - 0.45)
            .to(panel, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.45 }, index - 0.45);
        });
        timeline.to(panels[panels.length - 1], { opacity: 1, duration: TAIL_HOLD }, panels.length - 1);
        trigger = ScrollTrigger.create({
          id: "mie-about-story",
          trigger: stage,
          animation: timeline,
          start: () => `top ${Number.parseFloat(getComputedStyle(root).getPropertyValue("--story-top")) || 108}px`,
          end: () => `+=${Math.max(window.innerHeight, 760) * (panels.length - 1 + TAIL_HOLD)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });

      const scrollToChapter = (index: number, behavior: ScrollBehavior = "smooth") => {
        if (!trigger || !timeline) return;
        const fraction = index / timeline.duration();
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * fraction + 1, behavior });
      };
      const onChapterClick = (event: MouseEvent) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("[data-chapter-link]") : null;
        const index = target ? links.indexOf(target) : -1;
        if (index < 0 || root.dataset.aboutMode !== "deck") return;
        event.preventDefault();
        scrollToChapter(index);
        window.history.replaceState(window.history.state, "", `#${panels[index].id}`);
      };
      root.addEventListener("click", onChapterClick);

      const initialHash = panels.findIndex(panel => `#${panel.id}` === window.location.hash);
      const frame = initialHash > 0 ? requestAnimationFrame(() => scrollToChapter(initialHash, "instant")) : null;

      // If font sizing or a same-breakpoint resize makes content too tall, show the full page.
      // Reverting only this context also removes its pin spacer and inline transforms.
      const resizeObserver = new ResizeObserver(() => {
        if (root.dataset.aboutMode === "deck" && !contentFits()) {
          deckContext.revert();
          reset();
          root.dataset.aboutMode = "static";
        }
      });
      panels.forEach(panel => resizeObserver.observe(panel));
      root.querySelectorAll<HTMLElement>("[data-story-reveal]").forEach(element => resizeObserver.observe(element));

      return () => {
        resizeObserver.disconnect();
        if (frame !== null) cancelAnimationFrame(frame);
        root.removeEventListener("click", onChapterClick);
        deckContext.revert();
        reset();
      };
    }, root);

    return () => { mm.revert(); reset(); };
  }, { scope: rootRef });
}
