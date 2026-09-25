"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const INTERVAL_MS = 1000;

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
  const [rotationChoice, setRotationChoice] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    serverMotionSnapshot,
  );

  const rotationRequested = rotationChoice ?? !reducedMotion;
  const playing = count > 1 && rotationRequested && !hovered;

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
    rotationRequested,
    setRotationChoice,
    setHovered,
    select,
  };
}
