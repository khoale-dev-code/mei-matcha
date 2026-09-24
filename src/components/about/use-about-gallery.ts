"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const INTERVAL_MS = 4200;

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

function motionSnapshot() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

function serverMotionSnapshot() {
  return true;
}

export function useAboutGallery(count: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    serverMotionSnapshot,
  );

  const playing = count > 1 && visible && !reducedMotion;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panel = root.closest<HTMLElement>("[data-story-panel]");
    let intersecting = false;

    const updateVisibility = () => {
      setVisible(
        intersecting &&
          !document.hidden &&
          !panel?.inert &&
          panel?.getAttribute("aria-hidden") !== "true",
      );
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        updateVisibility();
      },
      { threshold: [0, 0.25] },
    );

    intersection.observe(root);

    const mutation = new MutationObserver(updateVisibility);

    if (panel) {
      mutation.observe(panel, {
        attributes: true,
        attributeFilter: ["inert", "aria-hidden"],
      });
    }

    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      intersection.disconnect();
      mutation.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || count < 2) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % count);
    }, INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [index, playing, count]);

  function select(next: number) {
    if (count < 1) return;
    setIndex(((next % count) + count) % count);
  }

  return {
    rootRef,
    index,
    playing,
    select,
  };
}
